import { readBoundedJson } from './network-json';
import {
  boundedProviderText,
  buildProviderBody,
  providerTextFromPayload,
  safeMaxTokens,
  safeProviderEndpoint,
  safeProviderModel,
  takeSseLines
} from './provider-security';

export type ProviderMessage = { role: 'system' | 'user' | 'assistant' | 'tool'; content: string; tool_calls?: ToolCall[]; tool_call_id?: string; name?: string };

export interface ToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface AIModelConfig {
  id: string;
  name: string;
  provider: 'groq' | 'nvidia' | 'qwen' | 'zai' | 'openai' | 'anthropic' | 'openai-compatible' | 'local' | 'xiaomi' | 'openrouter';
  baseUrl: string;
  model: string;
  apiKeyEnv: string;
  maxTokens: number;
  supportsStreaming: boolean;
  supportsTools: boolean;
  supportsVision: boolean;
  supportsAudio: boolean;
  modalities: { text: boolean; image?: boolean; audio?: boolean; video?: boolean };
  pricing?: { inputPer1k: number; outputPer1k: number };
}

export interface AIProviderConfig {
  models: AIModelConfig[];
  fallbackChain: string[];
  defaultModel: string;
  maxRetries: number;
  retryDelay: number;
  timeout: number;
}

export interface AIRequest {
  messages: ProviderMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  tools?: ToolDefinition[];
  toolChoice?: 'auto' | 'none' | 'required' | { type: 'function'; function: { name: string } };
  stream?: boolean;
  responseFormat?: { type: 'text' | 'json_object' | 'json_schema'; json_schema?: Record<string, unknown> };
  systemPrompt?: string;
}

export interface AIResponse {
  text: string;
  provider: string;
  model: string;
  usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
  toolCalls?: ToolCall[];
  finishReason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'error';
  latencyMs: number;
}

export interface StreamChunk {
  text: string;
  toolCalls?: ToolCall[];
  finishReason?: 'stop' | 'length' | 'tool_calls' | 'content_filter';
  done: boolean;
}

export interface AIProvider {
  id: string;
  name: string;
  models: AIModelConfig[];
  chat(request: AIRequest): Promise<AIResponse>;
  streamChat(request: AIRequest): AsyncGenerator<StreamChunk, void, unknown>;
  isAvailable(): Promise<boolean>;
  getCapabilities(modelId: string): AIModelConfig | undefined;
}

const DEFAULT_CONFIG: AIProviderConfig = {
  models: [
    {
      id: 'qwen3.8-max',
      name: 'Qwen 3.8 Max',
      provider: 'qwen',
      baseUrl: 'https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1',
      model: 'qwen3.8-max',
      apiKeyEnv: 'QWEN_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: true, image: true },
      pricing: { inputPer1k: 0.0004, outputPer1k: 0.0012 }
    },
    {
      id: 'qwen3.7-plus',
      name: 'Qwen 3.7 Plus',
      provider: 'qwen',
      baseUrl: 'https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1',
      model: 'qwen3.7-plus',
      apiKeyEnv: 'QWEN_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: true, image: true },
      pricing: { inputPer1k: 0.0002, outputPer1k: 0.0008 }
    },
    {
      id: 'qwen3.7-max',
      name: 'Qwen 3.7 Max',
      provider: 'qwen',
      baseUrl: 'https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1',
      model: 'qwen3.7-max',
      apiKeyEnv: 'QWEN_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: true, image: true },
      pricing: { inputPer1k: 0.0008, outputPer1k: 0.0024 }
    },
    {
      id: 'qwen3.8-flash',
      name: 'Qwen 3.8 Flash',
      provider: 'qwen',
      baseUrl: 'https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1',
      model: 'qwen3.8-flash',
      apiKeyEnv: 'QWEN_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: true, image: true },
      pricing: { inputPer1k: 0.0001, outputPer1k: 0.0004 }
    },
    {
      id: 'deepseek-v4-flash',
      name: 'DeepSeek V4 Flash',
      provider: 'qwen',
      baseUrl: 'https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1',
      model: 'deepseek-v4-flash-0731',
      apiKeyEnv: 'QWEN_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: false,
      supportsAudio: false,
      modalities: { text: true },
      pricing: { inputPer1k: 0.00005, outputPer1k: 0.0002 }
    },
    {
      id: 'kimi-k2.7-code',
      name: 'Kimi K2.7 Code',
      provider: 'qwen',
      baseUrl: 'https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1',
      model: 'kimi-k2.7-code',
      apiKeyEnv: 'QWEN_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: false,
      supportsAudio: false,
      modalities: { text: true },
      pricing: { inputPer1k: 0.00015, outputPer1k: 0.0006 }
    },
    {
      id: 'glm-5.2',
      name: 'GLM 5.2',
      provider: 'qwen',
      baseUrl: 'https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1',
      model: 'glm-5.2',
      apiKeyEnv: 'QWEN_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: false,
      supportsAudio: false,
      modalities: { text: true },
      pricing: { inputPer1k: 0.0001, outputPer1k: 0.0004 }
    },
    {
      id: 'qwen3.7-plus-workspace',
      name: 'Qwen 3.7 Plus (Workspace)',
      provider: 'qwen',
      baseUrl: 'https://ws-81qds5hitox4iqnx.cn-beijing.maas.aliyuncs.com/compatible-mode/v1',
      model: 'qwen3.7-plus',
      apiKeyEnv: 'QWEN_WORKSPACE_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: true, image: true }
    },
    {
      id: 'qwen3.8-max-workspace',
      name: 'Qwen 3.8 Max (Workspace)',
      provider: 'qwen',
      baseUrl: 'https://ws-81qds5hitox4iqnx.cn-beijing.maas.aliyuncs.com/compatible-mode/v1',
      model: 'qwen3.8-max',
      apiKeyEnv: 'QWEN_WORKSPACE_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: true, image: true }
    },
    {
      id: 'groq-llama-3.1-8b',
      name: 'Llama 3.1 8B (Groq)',
      provider: 'groq',
      baseUrl: 'https://api.groq.com/openai/v1',
      model: 'llama-3.1-8b-instant',
      apiKeyEnv: 'GROQ_API_KEY',
      maxTokens: 8192,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: false,
      supportsAudio: false,
      modalities: { text: true },
      pricing: { inputPer1k: 0.00005, outputPer1k: 0.00008 }
    },
    {
      id: 'groq-llama-3.3-70b',
      name: 'Llama 3.3 70B (Groq)',
      provider: 'groq',
      baseUrl: 'https://api.groq.com/openai/v1',
      model: 'llama-3.3-70b-versatile',
      apiKeyEnv: 'GROQ_API_KEY',
      maxTokens: 8192,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: false,
      supportsAudio: false,
      modalities: { text: true },
      pricing: { inputPer1k: 0.00027, outputPer1k: 0.00035 }
    },
    {
      id: 'nvidia-llama-3.3-70b',
      name: 'Llama 3.3 70B (NVIDIA)',
      provider: 'nvidia',
      baseUrl: 'https://integrate.api.nvidia.com/v1',
      model: 'meta/llama-3.3-70b-instruct',
      apiKeyEnv: 'NVIDIA_API_KEY',
      maxTokens: 8192,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: false,
      supportsAudio: false,
      modalities: { text: true },
      pricing: { inputPer1k: 0.0002, outputPer1k: 0.0003 }
    },
    {
      id: 'local-sd-cpp',
      name: 'Local SD.cpp (Image)',
      provider: 'local',
      baseUrl: 'http://localhost:8080',
      model: 'sd-cpp',
      apiKeyEnv: '',
      maxTokens: 4096,
      supportsStreaming: false,
      supportsTools: false,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: false, image: true },
      pricing: { inputPer1k: 0, outputPer1k: 0 }
    },
    {
      id: 'local-wan2gp',
      name: 'Local Wan2GP (Video)',
      provider: 'local',
      baseUrl: 'http://localhost:7860',
      model: 'wan2gp',
      apiKeyEnv: '',
      maxTokens: 8192,
      supportsStreaming: false,
      supportsTools: false,
      supportsVision: false,
      supportsAudio: false,
      modalities: { text: false, video: true },
      pricing: { inputPer1k: 0, outputPer1k: 0 }
    },
    {
      id: 'xiaomi-mix-4b',
      name: 'Xiaomi Mixture 4B',
      provider: 'xiaomi',
      baseUrl: 'https://api.mi.com/v1',
      model: 'xiaomi-mix-4b',
      apiKeyEnv: 'XIAOMI_API_KEY',
      maxTokens: 8192,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: true, image: true },
      pricing: { inputPer1k: 0.0001, outputPer1k: 0.0002 }
    },
    {
      id: 'xiaomi-mix-8b',
      name: 'Xiaomi Mixture 8B',
      provider: 'xiaomi',
      baseUrl: 'https://api.mi.com/v1',
      model: 'xiaomi-mix-8b',
      apiKeyEnv: 'XIAOMI_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: false,
      modalities: { text: true, image: true },
      pricing: { inputPer1k: 0.00015, outputPer1k: 0.0003 }
    },
    {
      id: 'xiaomi-mix-32b',
      name: 'Xiaomi Mixture 32B',
      provider: 'xiaomi',
      baseUrl: 'https://api.mi.com/v1',
      model: 'xiaomi-mix-32b',
      apiKeyEnv: 'XIAOMI_API_KEY',
      maxTokens: 32768,
      supportsStreaming: true,
      supportsTools: true,
      supportsVision: true,
      supportsAudio: true,
      modalities: { text: true, image: true, audio: true },
      pricing: { inputPer1k: 0.0003, outputPer1k: 0.0006 }
    }
  ],
  fallbackChain: [
    'openrouter-claude-3.5-sonnet',
    'openrouter-gpt-4o',
    'openrouter-gpt-4o-mini',
    'openrouter-llama-3.1-405b',
    'openrouter-llama-3.1-70b',
    'openrouter-qwen2.5-72b',
    'openrouter-deepseek-v3',
    'openrouter-deepseek-r1',
    'openrouter-gemini-2.0-flash',
    'openrouter-gemma-2-27b',
    'xiaomi-mix-32b',
    'xiaomi-mix-8b',
    'xiaomi-mix-4b',
    'qwen3.8-max',
    'qwen3.7-plus',
    'qwen3.8-flash',
    'qwen3.7-max',
    'deepseek-v4-flash',
    'kimi-k2.7-code',
    'glm-5.2',
    'groq-llama-3.3-70b',
    'nvidia-llama-3.3-70b',
    'qwen3.7-plus-workspace',
    'qwen3.8-max-workspace'
  ],
  defaultModel: 'qwen3.8-max',
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 60000
};

export class AIProviderRegistry {
  private config: AIProviderConfig;
  private modelMap: Map<string, AIModelConfig>;
  private providerInstances: Map<string, AIProvider> = new Map();

  constructor(config: AIProviderConfig = DEFAULT_CONFIG) {
    this.config = config;
    this.modelMap = new Map(config.models.map(m => [m.id, m]));
  }

  getModel(id: string): AIModelConfig | undefined {
    return this.modelMap.get(id);
  }

  getModels(): AIModelConfig[] {
    return this.config.models;
  }

  getFallbackChain(): string[] {
    return this.config.fallbackChain;
  }

  getDefaultModel(): string {
    return this.config.defaultModel;
  }

  registerProvider(provider: AIProvider) {
    this.providerInstances.set(provider.id, provider);
  }

  getProvider(id: string): AIProvider | undefined {
    return this.providerInstances.get(id);
  }

  async chat(request: AIRequest): Promise<{ text: string; provider: string; model: string; usage?: any; toolCalls?: ToolCall[]; finishReason: string; latencyMs: number }> {
    const startTime = Date.now();
    const model = this.modelMap.get(request.model || this.config.defaultModel);

    if (!model) {
      throw new Error(`Model not found: ${request.model || this.config.defaultModel}`);
    }

    const attemptModel = async (modelId: string): Promise<any> => {
      const model = this.modelMap.get(modelId);
      if (!model) throw new Error(`Model not found: ${modelId}`);
      const endpoint = safeProviderEndpoint(model.baseUrl);
      const providerModel = safeProviderModel(model.model);
      if (!endpoint || !providerModel) throw new Error(`Unsafe provider configuration: ${modelId}`);
      const maxTokens = safeMaxTokens(request.maxTokens ?? 900);

      const body = buildProviderBody(request, {
        name: providerModel, maxTokens: model.maxTokens, supportsTools: model.supportsTools
      }, maxTokens, false);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getApiKey(model.apiKeyEnv) || ''}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(DEFAULT_CONFIG.timeout)
      });

      // Non-2xx JSON error envelopes are not successful chat completions.
      // Throw so the provider fallback chain can try the next configured model.
      if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);

      const payload = await readBoundedJson(response, 1_000_000) as {
        choices?: { message?: { content?: string; tool_calls?: ToolCall[] }; finish_reason?: string }[];         usage?: Record<string, number>;       };
      const text = boundedProviderText(
        providerTextFromPayload(payload, Math.min(65_536, maxTokens * 16)),
        maxTokens
      ) || '';
      const toolCalls = payload.choices?.[0]?.message?.tool_calls;
      const finishReason = payload.choices?.[0]?.finish_reason || 'stop';

      return {
        text,
        provider: model.provider,
        model: model.id,
        usage: payload.usage,
        toolCalls,
        finishReason,
        latencyMs: Date.now() - startTime
      };
    }

    const modelsToTry = request.model ? [request.model] : [this.config.defaultModel, ...this.config.fallbackChain.filter(m => m !== this.config.defaultModel)];

    for (const modelId of modelsToTry) {
      try {
        const result = await attemptModel(modelId);
        return { ...result, latencyMs: Date.now() - startTime };
      } catch (error) {
        console.warn(`Model ${modelId} failed: ${error instanceof Error ? error.message : String(error)}`);
        continue;
      }
    }

    throw new Error('All models in fallback chain failed');
  }

  async *streamChat(request: AIRequest): AsyncGenerator<any, void, unknown> {
    const model = this.modelMap.get(request.model || this.config.defaultModel);
    if (!model) throw new Error(`Model not found: ${request.model || this.config.defaultModel}`);
    const endpoint = safeProviderEndpoint(model.baseUrl);
    const providerModel = safeProviderModel(model.model);
    if (!endpoint || !providerModel) throw new Error(`Unsafe provider configuration: ${model.id}`);
    const maxTokens = safeMaxTokens(request.maxTokens ?? 900);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getApiKey(model.apiKeyEnv) || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buildProviderBody(request, {
        name: providerModel, maxTokens: model.maxTokens, supportsTools: model.supportsTools
      }, maxTokens, true)),
      signal: AbortSignal.timeout(DEFAULT_CONFIG.timeout)
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

        const frame = takeSseLines(buffer + decoder.decode(value, { stream: true }));
        buffer = frame.remainder;
        for (const line of frame.lines) {
          if (!line.startsWith('data:')) continue;
          const data = line.slice(5).trim();
          if (data === '[DONE]') {
            yield { text: '', done: true, finishReason: 'stop' };
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            const text = boundedProviderText(delta?.content, maxTokens);
            if (text) yield { text, done: false };
            if (parsed.choices?.[0]?.finish_reason) {
              yield { text: '', done: true, finishReason: parsed.choices[0].finish_reason };
              return;
            }
          } catch {
            // Invalid provider events are ignored; a partial event is buffered above.
          }
        }
      }
    } finally {
      reader?.releaseLock();
    }
  }

  async checkAvailability(modelId: string): Promise<boolean> {
    const model = this.modelMap.get(modelId);
    if (!model || model.provider === 'local') return true;
    return !!getApiKey(model.apiKeyEnv);
  }
}

export const aiRegistry = new AIProviderRegistry();

export function getAIRegistry(): AIProviderRegistry {
  return aiRegistry;
}

export async function invokeAIText(
  systemPrompt: string,
  userPrompt: string,
  options: { maxTokens?: number; model?: string; temperature?: number; stream?: boolean; tools?: ToolDefinition[]; offline?: () => string } = {}
): Promise<{ text: string; provider: string; model: string; usage?: any; toolCalls?: ToolCall[]; finishReason: string }> {
  try {
    return await aiRegistry.chat({
      systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
      ...options
    });
  } catch (error) {
    if (options.offline) {
      return { text: options.offline(), provider: 'offline', model: 'fallback', finishReason: 'stop' };
    }
    throw error;
  }
}

export async function* invokeAIStream(
  systemPrompt: string,
  userPrompt: string,
  options: { maxTokens?: number; model?: string; temperature?: number; tools?: ToolDefinition[] } = {}
): AsyncGenerator<any, void, unknown> {
  yield* aiRegistry.streamChat({
    systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
    ...options
  });
}

export function configuredProvider(): string {
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY || process.env.NVIDIA_ALT_KEY) return 'nvidia';
  if (process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY) return 'qwen';
  if (process.env.XIAOMI_API_KEY) return 'xiaomi';
  if (process.env.OPENROUTER_API_KEY) return 'openrouter';
  if (process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY) return 'zai';
  return 'local';
}

export function getApiKey(envKey: string): string | undefined {
  return process.env[envKey];
}
