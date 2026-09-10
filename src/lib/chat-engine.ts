import { aiRegistry, AIModelConfig, ToolDefinition, ToolCall, ProviderMessage } from './ai-provider';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
  name?: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  tools?: any[];
  toolChoice?: 'auto' | 'none' | 'required' | { type: 'function'; function: { name: string } };
  stream?: boolean;
  systemPrompt?: string;
  context?: Record<string, unknown>;
}

export interface ChatResponse {
  message: ChatMessage;
  provider: string;
  model: string;
  usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
  toolCalls?: ToolCall[];
  finishReason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'error';
  latencyMs: number;
}

export class ChatEngine {
  private maxIterations: number;

  constructor() {
    this.maxIterations = 10;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const startTime = Date.now();

    const messages: ChatMessage[] = [
      ...(request.systemPrompt ? [{ role: 'system' as const, content: request.systemPrompt }] : []),
      ...request.messages
    ];

    const availableTools = request.tools || [];

    let iterations = 0;
    let currentMessages = [...messages];

    while (iterations < this.maxIterations) {
      iterations++;

      const response = await this.callModel({
        messages: currentMessages,
        model: request.model,
        maxTokens: request.maxTokens,
        temperature: request.temperature,
        topP: request.topP,
        tools: availableTools,
        toolChoice: request.toolChoice
      });

      const assistantMessage = response.message;
      currentMessages.push(assistantMessage);

      if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
        for (const toolCall of assistantMessage.tool_calls) {
          currentMessages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            name: toolCall.function.name,
            content: JSON.stringify({ result: 'Tool execution placeholder' })
          });
        }
        continue;
      }

      return {
        message: assistantMessage,
        provider: response.provider,
        model: response.model,
        usage: response.usage,
        finishReason: (response.finishReason || 'stop') as ChatResponse['finishReason'],
        latencyMs: Date.now() - startTime
      };
    }

    throw new Error('Max iterations reached');
  }

  private async callModel(options: {
    messages: ChatMessage[];
    model?: string;
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    tools?: any[];
    toolChoice?: any;
  }): Promise<{ message: ChatMessage; provider: string; model: string; usage?: any; finishReason?: string }> {
    const modelId = options.model || 'qwen3.6-flash';
    const modelConfig = aiRegistry.getModel(modelId);

    if (!modelConfig) {
      throw new Error(`Model not found: ${modelId}`);
    }

    const body: Record<string, unknown> = {
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

    const apiKey = process.env[modelConfig.apiKeyEnv];

    const response = await fetch(`${modelConfig.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
      finishReason: choice?.finish_reason || 'stop'
    };
  }

  async *streamChat(request: ChatRequest): AsyncGenerator<unknown, void, unknown> {
    const messages: ChatMessage[] = [
      ...(request.systemPrompt ? [{ role: 'system' as const, content: request.systemPrompt }] : []),
      ...request.messages
    ];

    const modelId = request.model || 'qwen3.6-flash';
    const modelConfig = aiRegistry.getModel(modelId);

    if (!modelConfig) throw new Error(`Model not found: ${modelId}`);

    const body: Record<string, unknown> = {
      model: modelConfig.model,
      messages,
      max_completion_tokens: Math.min(request.maxTokens || 900, 32768),
      temperature: request.temperature ?? 0.7,
      top_p: request.topP ?? 0.95,
      stream: true
    };

    if (request.tools && request.tools.length > 0) {
      body.tools = request.tools;
      body.tool_choice = request.toolChoice || 'auto';
    }

    const apiKey = process.env[modelConfig.apiKeyEnv];

    const response = await fetch(`${modelConfig.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60000)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

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

            const chunk: Record<string, unknown> = {
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
          } catch {
            // skip malformed chunks
          }
        }
      }
    } finally {
      reader?.releaseLock();
    }
  }
}

export const chatEngine = new ChatEngine();

export async function chatCompletion(request: ChatRequest): Promise<ChatResponse> {
  return chatEngine.chat(request);
}

export async function* chatCompletionStream(request: ChatRequest): AsyncGenerator<unknown, void, unknown> {
  yield* chatEngine.streamChat(request);
}

export function createSystemPrompt(context: {
  locale: string;
  section?: string;
  userLocation?: { lat: number; lng: number; city?: string };
  availableTools?: string[];
}): string {
  return `Eres Manos Abiertas, una plataforma de apoyo integral para personas inmigrantes en España.

IDIOMA: Responde SIEMPRE en ${context.locale || 'es'}.
TONO: Cálido, empático, paciente, digno. Lenguaje sencillo, sin tecnicismos.
LÍMITE: Respuestas breves y accionables (máx. 3-4 párrafos).

SECCIÓN ACTUAL: ${context.section || 'general'}
${context.userLocation ? `UBICACIÓN USUARIO: ${context.userLocation.city || 'desconocida'}` : ''}

REGLAS DE ORO:
- NUNCA inventes datos (teléfonos, direcciones, tasas).
- Para temas legales: recomienda consultar fuente oficial.
- Emergencias: recomienda 112 (gratis, 24h, multilingüe).
- Mantén contexto de conversación.`;
}
