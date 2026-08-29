'use client';

import { ToolDefinition, ToolCall, ProviderMessage } from './ai-provider';
import { functionRegistry } from './function-calling';
import { ragEngine } from './rag-engine';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
  name?: string;
}

export interface ChatRequest {
  messages: any[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  tools?: any[];
  toolChoice?: 'auto' | 'none' | 'required' | { type: 'function'; function: { name: string } };
  stream?: boolean;
  systemPrompt?: string;
  context?: Partial<any>;
}

export interface ChatResponse {
  message: any;
  provider: string;
  model: string;
  usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
  toolCalls?: ToolCall[];
  finishReason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'error';
  latencyMs: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  description: string;
  goals: string[];
  tools: string[];
  model: string;
  systemPrompt?: string;
  personality: {
    tone: 'empathetic' | 'professional' | 'patient' | 'enthusiastic' | 'authoritative';
    expertise: string[];
    language: string;
  };
  capabilities: {
    rag: boolean;
    tools: boolean;
    vision: boolean;
    audio: boolean;
    video: boolean;
    webSearch: boolean;
    localInference: boolean;
  };
  fallbackModel?: string;
  maxIterations: number;
}

export interface Agent {
  id: string;
  config: any;
  chat(request: any): Promise<any>;
  streamChat(request: any): AsyncGenerator<any, void, unknown>;
}

interface AgentState {
  id: string;
  config: any;
  memory: Map<string, any>;
  conversationHistory: any[];
  lastActive: number;
}

class AgentRegistry {
  private agents: Map<string, any> = new Map();
  private defaultAgent: string | null = null;

  register(config: any): any {
    const state = {
      id: config.id,
      config,
      memory: new Map(),
      conversationHistory: [],
      lastActive: Date.now()
    };
    this.agents.set(config.id, { config, state });
    if (!this.defaultAgent) this.defaultAgent = config.id;
    return this.createAgentProxy(config.id);
  }

  private createAgentProxy(agentId: string): any {
    const agentData = this.agents.get(agentId);
    if (!agentData) throw new Error(`Agent not found: ${agentId}`);
    const config = agentData.config;
    const state = agentData.state;

    return {
      id: agentId,
      config,
      chat: (request: any) => this.chatWithAgent(agentId, request),
      streamChat: (request: any) => this.streamChatWithAgent(agentId, request)
    };
  }

  private async chatWithAgent(agentId: string, request: any): Promise<any> {
    const agentData = this.agents.get(agentId);
    if (!agentData) throw new Error(`Agent not found: ${agentId}`);

    const config = agentData.config;
    const state = agentData.state;

    const { functionRegistry } = await import('./function-calling');
    const { aiRegistry, getApiKey } = await import('./ai-provider');

    const context = { locale: request.context?.locale || config.personality.language };

    const systemPrompt = this.buildSystemPrompt(config);

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...request.messages.slice(-10)
    ];

    const availableTools = this.getAvailableTools(config.tools);

    let iterations = 0;
    const maxIterations = config.maxIterations || 10;
    let currentMessages = [...request.messages.slice(-10)];
    currentMessages.unshift({ role: 'system' as const, content: systemPrompt });

    while (iterations < maxIterations) {
      iterations++;

      const response = await this.callModel({
        messages: currentMessages,
        model: config.model,
        maxTokens: request.maxTokens,
        temperature: request.temperature,
        topP: request.topP,
        tools: availableTools,
        toolChoice: 'auto'
      });

      const assistantMessage = response.message;
      currentMessages.push(assistantMessage);

      if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
        for (const toolCall of assistantMessage.tool_calls) {
          const result = await this.executeToolCall(toolCall, { locale: config.personality.language });
          currentMessages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            name: toolCall.function.name,
            content: JSON.stringify(result)
          });
        }
        continue;
      }

      state.lastActive = Date.now();
      state.conversationHistory.push(
        { role: 'user', content: request.messages.at(-1)?.content },
        { role: 'assistant', content: assistantMessage.content }
      );

      return {
        message: assistantMessage,
        provider: response.provider,
        model: response.model,
        usage: response.usage,
        finishReason: response.finishReason || 'stop',
        latencyMs: response.latencyMs
      };
    }

    throw new Error('Max iterations reached');
  }

  private async *streamChatWithAgent(agentId: string, request: any): AsyncGenerator<any, void, unknown> {
    const agentData = this.agents.get(agentId);
    if (!agentData) throw new Error(`Agent not found: ${agentId}`);

    const config = agentData.config;
    const { aiRegistry, getApiKey } = await import('./ai-provider');
    const { functionRegistry } = await import('./function-calling');

    const systemPrompt = this.buildSystemPrompt(config);

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...request.messages.slice(-10)
    ];

    const availableTools = this.getAvailableTools(request.tools || agentData.config.tools);

    const registry = (await import('./ai-provider')).aiRegistry;
    const modelConfig = registry.getModel(request.model || config.model);

    if (!modelConfig) throw new Error('Model not found');

    const body: any = {
      model: modelConfig.model,
      messages,
      max_completion_tokens: Math.min(request.maxTokens || 900, modelConfig.maxTokens),
      temperature: request.temperature ?? 0.7,
      top_p: request.topP ?? 0.95,
      stream: true
    };

    if (availableTools.length > 0) {
      body.tools = availableTools;
      body.tool_choice = 'auto';
    }

    const response = await fetch(`${modelConfig.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getApiKey(modelConfig.apiKeyEnv) || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60000)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += new TextDecoder().decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            yield { text: '', done: true, finishReason: 'stop' };
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            if (!delta) continue;

            const chunk: any = {
              text: delta.content || '',
              toolCalls: delta.tool_calls,
              finishReason: parsed.choices?.[0]?.finish_reason,
              done: false
            };
            yield chunk;

            if (parsed.choices?.[0]?.finish_reason) {
              yield { text: '', done: true, finishReason: parsed.choices[0].finish_reason };
              return;
            }
          } catch {}
        }
      }
    } finally {
      reader?.releaseLock();
    }
  }

  private buildSystemPrompt(config: any): string {
    const tools = config.tools.join(', ');
    const capabilities: string[] = [];
    if (config.capabilities.rag) capabilities.push('RAG search');
    if (config.capabilities.tools) capabilities.push('Tool calling');
    if (config.capabilities.vision) capabilities.push('Vision');
    if (config.capabilities.audio) capabilities.push('Audio');
    if (config.capabilities.video) capabilities.push('Video');
    if (config.capabilities.webSearch) capabilities.push('Web search');
    if (config.capabilities.localInference) capabilities.push('Local inference');

    return `Eres ${config.name}, un agente ${config.role}.

PERSONALIDAD:
- Tono: ${config.personality.tone}
- Experiencia: ${config.personality.expertise.join(', ')}
- Idioma: ${config.personality.language}

OBJETIVOS:
${config.goals.map(g => `- ${g}`).join('\n')}

CAPACIDADES:
${capabilities.join(', ')}

HERRAMIENTAS DISPONIBLES: ${config.tools.join(', ')}

INSTRUCCIONES:
- Sé ${config.personality.tone}, empático y paciente
- Usa lenguaje sencillo, sin tecnicismos
- Da respuestas breves y accionables (máx. 3-4 párrafos)
- USA HERRAMIENTAS cuando el usuario pida info concreta
- Para saludos/charla: responde directo SIN herramientas
- Para trámites: usa get_legal_guide + create_checklist
- Para búsquedas: usa search_resources / search_rights
- Para CV/empleo: usa generate_cv / analyze_cv_ats
- Adapta al nivel del usuario
- Invita a hacer más preguntas si algo no quedó claro

${config.systemPrompt || ''}`;
  }

  private getAvailableTools(toolNames: string[]): any[] {
    const functionTools = functionRegistry.getAllDefinitions()
      .filter((def) => toolNames.includes(def.name))
      .map((def) => ({
        type: 'function',
        function: def
      }));
    return functionTools;
  }

  private async callModel(options: {
    messages: any[];
    model?: string;
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    tools?: any[];
    toolChoice?: any;
  }) {
    const { aiRegistry, getApiKey } = await import('./ai-provider');
    const modelConfig = aiRegistry.getModel(options.model || 'qwen3.8-max');
    if (!modelConfig) throw new Error(`Model not found`);

    const body: any = {
      model: modelConfig.model,
      messages: options.messages,
      max_completion_tokens: Math.min(options.maxTokens || 900, modelConfig.maxTokens),
      temperature: options.temperature ?? 0.7,
      top_p: options.topP ?? 0.95,
      stream: false
    };

    if (options.tools && options.tools.length > 0) {
      body.tools = options.tools;
      if (options.toolChoice) body.tool_choice = options.toolChoice;
    }

    const response = await fetch(`${modelConfig.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getApiKey(modelConfig.apiKeyEnv) || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60000)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`${modelConfig.id} HTTP ${response.status}: ${errorText}`);
    }

    const payload = await response.json();
    const choice = payload.choices?.[0];
    const message = choice?.message || {};

    return {
      message: {
        role: 'assistant',
        content: message.content || '',
        tool_calls: message.tool_calls,
        tool_call_id: message.tool_call_id,
        name: message.name
      },
      provider: modelConfig.provider,
      model: modelConfig.id,
      usage: payload.usage,
      finishReason: choice?.finish_reason || 'stop',
      latencyMs: 0
    };
  }

  private async executeToolCall(toolCall: any): Promise<any> {
    try {
      const result = await functionRegistry.execute(
        toolCall.function.name,
        JSON.parse(toolCall.function.arguments),
        { locale: 'es', permissions: [], metadata: {} }
      );
      return { success: true, result: result.result, metadata: result.metadata };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  getAgent(id: string): any {
    const agentData = this.agents.get(id);
    if (!agentData) return undefined;
    return this.createAgentProxy(id);
  }

  getAllAgents(): any[] {
    return Array.from(this.agents.values()).map((a: any) => a.config);
  }

  setDefaultAgent(id: string): void {
    if (this.agents.has(id)) this.defaultAgent = id;
  }

  getDefaultAgent(): any {
    return this.defaultAgent ? this.getAgent(this.defaultAgent!) : undefined;
  }

  removeAgent(id: string): boolean {
    if (this.defaultAgent === id) this.defaultAgent = null;
    return this.agents.delete(id);
  }
}

const agentRegistry = new AgentRegistry();

const PREDEFINED_AGENTS = {
  'legal-guide': {
    id: 'legal-guide',
    name: 'Guía Legal',
    role: 'legal-guide',
    description: 'Especialista en trámites de extranjería, derechos laborales, vivienda y ayudas sociales',
    goals: [
      'Guiar trámites NIE/arraigo/asilo',
      'Explicar derechos laborales y vivienda',
      'Ayudar con ayudas sociales (IMV, RAI, becas)',
      'Crear checklists personalizados para trámites'
    ],
    tools: ['search_resources', 'search_rights', 'get_legal_guide', 'create_checklist', 'check_document_validity', 'get_emergency_contacts', 'get_nearby_offices', 'translate_text'],
    model: 'qwen3.8-max',
    personality: {
      tone: 'empathetic',
      expertise: ['extranjeria', 'derecho-laboral', 'vivienda', 'ayudas-sociales', 'asilo'],
      language: 'es'
    },
    capabilities: {
      rag: true,
      tools: true,
      vision: false,
      audio: false,
      video: false,
      webSearch: true,
      localInference: false
    },
    fallbackModel: 'qwen3.7-plus',
    maxIterations: 10
  },
  'cv-builder': {
    id: 'cv-builder',
    name: 'Constructor CV',
    role: 'cv-builder',
    description: 'Especialista en creación de CVs profesionales, optimización ATS y cartas de presentación',
    goals: [
      'Crear CVs profesionales formato Europass/ATS',
      'Optimizar keywords para ATS (InfoJobs, LinkedIn)',
      'Generar cartas de presentación personalizadas',
      'Analizar compatibilidad CV vs oferta'
    ],
    tools: ['generate_cv', 'generate_cover_letter', 'analyze_cv_ats', 'search_resources', 'translate_text'],
    model: 'qwen3.7-plus',
    personality: {
      tone: 'professional',
      expertise: ['recruiting', 'ats-optimization', 'europass-format', 'carta-presentacion'],
      language: 'es'
    },
    capabilities: {
      rag: true,
      tools: true,
      vision: false,
      audio: false,
      video: false,
      webSearch: true,
      localInference: false
    },
    fallbackModel: 'qwen3.8-max',
    maxIterations: 8
  },
  'ia-tutor': {
    id: 'ia-tutor',
    name: 'Tutor IA',
    role: 'ia-tutor',
    description: 'Profesor paciente de IA (ChatGPT, Gemini, Copilot, DeepSeek, Qwen, Perplexity, Meta AI)',
    goals: [
      'Enseñar IA paso a paso desde cero',
      'Ejercicios prácticos con feedback',
      'Adaptar al nivel del usuario',
      'Preguntas de repaso y ejercicios prácticos'
    ],
    tools: ['search_courses', 'get_ai_course_content', 'create_checklist', 'translate_text', 'search_resources'],
    model: 'qwen3.8-flash',
    personality: {
      tone: 'patient',
      expertise: ['ia-fundamentos', 'prompt-engineering', 'chatgpt', 'gemini', 'copilot', 'deepseek', 'qwen', 'perplexity'],
      language: 'es'
    },
    capabilities: {
      rag: true,
      tools: true,
      vision: false,
      audio: false,
      video: false,
      webSearch: true,
      localInference: false
    },
    fallbackModel: 'qwen3.8-max',
    maxIterations: 8
  },
  'resource-finder': {
    id: 'resource-finder',
    name: 'Buscador Recursos',
    role: 'resource-finder',
    description: 'Encuentra recursos verificados (cursos, ONGs, oficinas, teléfonos, webs) por proximidad y categoría',
    goals: [
      'Encontrar recursos cercanos por geolocalización',
      'Filtrar por categoría, idioma, ciudad',
      'Verificar vigencia de recursos',
      'Mostrar contactos y horarios'
    ],
    tools: ['search_resources', 'get_nearby_offices', 'calculate_cost_of_life', 'translate_text', 'get_emergency_contacts'],
    model: 'qwen3.8-max',
    personality: {
      tone: 'helpful',
      expertise: ['recursos-migrantes', 'oficinas-extranjeria', 'sepe', 'ayuntamientos', 'ongs', 'coste-vida'],
      language: 'es'
    },
    capabilities: {
      rag: true,
      tools: true,
      vision: false,
      audio: false,
      video: false,
      webSearch: true,
      localInference: false
    },
    fallbackModel: 'qwen3.7-plus',
    maxIterations: 8
  },
  'ia-creator': {
    id: 'ia-creator',
    name: 'Creador IA',
    role: 'ia-creator',
    description: 'Genera imágenes, videos, audio y lip-sync con modelos avanzados (Wan, Seedance, LTX, Infinite Talk)',
    goals: [
      'Generar imágenes (Flux, Nano Banana, Seedream, Ideogram, Midjourney)',
      'Crear videos (Kling, Sora, Veo, Wan, Seedance, Hailuo)',
      'Lip sync (Infinite Talk, Wan 2.2, LTX, LatentSync)',
      'Body swap / Recast',
      'Audio (TTS, music, voice cloning)'
    ],
    tools: ['search_resources', 'translate_text'],
    model: 'qwen3.8-max',
    personality: {
      tone: 'enthusiastic',
      expertise: ['video-generation', 'image-generation', 'lip-sync', 'audio-generation', 'body-swap'],
      language: 'es'
    },
    capabilities: {
      rag: true,
      tools: true,
      vision: true,
      audio: true,
      video: true,
      webSearch: true,
      localInference: true
    },
    fallbackModel: 'qwen3.8-max',
    maxIterations: 10
  },
  'community-manager': {
    id: 'community-manager',
    name: 'Community Manager',
    role: 'community-manager',
    description: 'Gestiona comunidad, eventos, foro, mentoría y matchmaking',
    goals: [
      'Moderar foro y eventos',
      'Conectar mentores con newcomers',
      'Organizar eventos híbridos',
      'Gestionar reputación y karma'
    ],
    tools: ['search_resources', 'get_emergency_contacts', 'create_checklist', 'translate_text'],
    model: 'qwen3.7-plus',
    personality: {
      tone: 'enthusiastic',
      expertise: ['community-management', 'event-organization', 'mentoring', 'matchmaking'],
      language: 'es'
    },
    capabilities: {
      rag: true,
      tools: true,
      vision: false,
      audio: false,
      video: false,
      webSearch: true,
      localInference: false
    },
    fallbackModel: 'qwen3.8-max',
    maxIterations: 8
  },
  'multilingual-assistant': {
    id: 'multilingual-assistant',
    name: 'Asistente Multilingüe',
    role: 'multilingual-assistant',
    description: 'Asiste en 39 idiomas con traducción, OCR, TTS y STT',
    goals: [
      'Traducir entre 39 idiomas',
      'OCR de documentos',
      'Text-to-speech y speech-to-text',
      'Detección automática de idioma'
    ],
    tools: ['translate_text', 'search_resources', 'get_legal_guide'],
    model: 'qwen3.8-max',
    personality: {
      tone: 'helpful',
      expertise: ['translation', 'ocr', 'tts', 'stt', 'multilingual'],
      language: 'es'
    },
    capabilities: {
      rag: true,
      tools: true,
      vision: true,
      audio: true,
      video: false,
      webSearch: true,
      localInference: true
    },
    fallbackModel: 'qwen3.8-max',
    maxIterations: 8
  }
};

for (const [id, config] of Object.entries(PREDEFINED_AGENTS)) {
  agentRegistry.register(config);
}

export const agentRegistry = new AgentRegistry();

export function createAgent(config: any): any {
  return agentRegistry.register(config);
}

export function getAgent(id: string): any {
  return agentRegistry.getAgent(id);
}

export function getAllAgents(): any[] {
  return agentRegistry.getAllAgents();
}

export function setDefaultAgent(id: string): void {
  agentRegistry.setDefaultAgent(id);
}

export function getDefaultAgent(): any {
  return agentRegistry.getDefaultAgent();
}

export function removeAgent(id: string): boolean {
  return agentRegistry.removeAgent(id);
}

export function createAgentConfig(overrides: any = {}): any {
  return {
    id: overrides.id || `agent-${Date.now()}`,
    name: overrides.name || 'Assistant',
    role: overrides.role || 'assistant',
    description: overrides.description || '',
    goals: overrides.goals || ['Ayudar al usuario de forma útil y precisa'],
    tools: overrides.tools || ['search_resources', 'search_rights', 'get_legal_guide'],
    model: overrides.model || 'qwen3.8-max',
    systemPrompt: overrides.systemPrompt,
    personality: {
      tone: 'empathetic',
      expertise: ['general'],
      language: 'es',
      ...overrides.personality
    },
    capabilities: {
      rag: true,
      tools: true,
      vision: false,
      audio: false,
      video: false,
      webSearch: true,
      localInference: false,
      ...overrides.capabilities
    },
    fallbackModel: overrides.fallbackModel,
    maxIterations: overrides.maxIterations || 10
  };
}

export { agentRegistry, PREDEFINED_AGENTS };
export type { AgentRegistry, Agent, AgentConfig };