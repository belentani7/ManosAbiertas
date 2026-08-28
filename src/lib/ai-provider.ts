import { readBoundedJson } from './network-json';
import { boundedProviderText, providerTextFromPayload, safeMaxTokens, safeProviderEndpoint, safeProviderModel } from './provider-security';

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
  provider: 'groq' | 'nvidia' | 'qwen' | 'zai' | 'openai' | 'anthropic' | 'openai-compatible' | 'local';
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
    }
  ],
  fallbackChain: [
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

function getApiKey(envKey: string): string | undefined {
  return process.env[envKey];
}

function buildHeaders(apiKey: string): Record<string, string> {
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}

async function callProvider(
  provider: AIModelConfig,
  messages: ProviderMessage[],
  options: {
    maxTokens: number;
    temperature?: number;
    topP?: number;
    tools?: ToolDefinition[];
    toolChoice?: AIRequest['toolChoice'];
    stream?: boolean;
    responseFormat?: AIRequest['responseFormat'];
    signal?: AbortSignal;
  }
): Promise<Response> {
  const apiKey = getApiKey(provider.apiKeyEnv);
  if (!apiKey && provider.provider !== 'local') {
    throw new Error(`API key not found for ${provider.id} (env: ${provider.apiKeyEnv})`);
  }

  const endpoint = `${provider.baseUrl.replace(/\/+$/, '')}/chat/completions`;
  const safeModel = provider.model;

  const body: Record<string, unknown> = {
    model: safeModel,
    messages,
    max_completion_tokens: Math.min(options.maxTokens, provider.maxTokens),
    temperature: options.temperature ?? 0.7,
    top_p: options.topP ?? 0.95,
    stream: options.stream ?? false
  };

  if (options.tools && options.tools.length > 0 && provider.supportsTools) {
    body.tools = options.tools;
    if (options.toolChoice) body.tool_choice = options.toolChoice;
  }

  if (options.responseFormat) {
    body.response_format = options.responseFormat;
  }

  const response = await fetch(provider.baseUrl.replace(/\/+$/, '') + '/chat/completions', {
    method: 'POST',
    headers: buildHeaders(getApiKey(provider.apiKeyEnv) || ''),
    body: JSON.stringify(body),
    signal: options.signal || AbortSignal.timeout(DEFAULT_CONFIG.timeout)
  });

  return response;
}

async function* streamResponse(
  provider: AIModelConfig,
  messages: ProviderMessage[],
  options: {
    maxTokens: number;
    temperature?: number;
    topP?: number;
    tools?: ToolDefinition[];
    toolChoice?: AIRequest['toolChoice'];
    responseFormat?: AIRequest['responseFormat'];
    signal?: AbortSignal;
  }
): AsyncGenerator<StreamChunk, void, unknown> {
  const response = await callProvider(provider, messages, { ...options, stream: true });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`${provider.id} HTTP ${response.status}: ${errorText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
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

          const chunk: StreamChunk = {
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
          // Ignore parse errors for partial chunks
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

async function executeWithRetry<T>(
  fn: () => Promise<T>,
  retries: number,
  delay: number
): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, delay * Math.pow(2, attempt)));
      }
    }
  }
  throw lastError!;
}

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
    const modelId = request.model || this.config.defaultModel;
    const model = this.modelMap.get(request.model || this.config.defaultModel);

    if (!model) {
      throw new Error(`Model not found: ${request.model || this.config.defaultModel}`);
    }

    const messages: ProviderMessage[] = [
      ...(request.systemPrompt ? [{ role: 'system' as const, content: request.systemPrompt }] : []),
      ...request.messages
    ];

    const attemptModel = async (modelId: string): Promise<any> => {
      const model = this.modelMap.get(modelId);
      if (!model) throw new Error(`Model not found: ${modelId}`);

      const maxTokens = Math.min(request.maxTokens || 900, model.maxTokens);
      const temperature = request.temperature ?? 0.7;
      const topP = request.topP ?? 0.95;

      const body: Record<string, unknown> = {
        model: model.model,
        messages: [
          ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
          ...request.messages
        ],
        max_completion_tokens: Math.min(request.maxTokens || 900, model.maxTokens),
        temperature: request.temperature ?? 0.7,
        top_p: request.topP ?? 0.95,
        stream: false
      };

      if (request.tools && request.tools.length > 0 && model.supportsTools) {
        (body as any).tools = request.tools;
        if (request.toolChoice) (body as any).tool_choice = request.toolChoice;
      }

      if (request.responseFormat) {
        (body as any).response_format = request.responseFormat;
      }

      const response = await fetch(`${model.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getApiKey(model.apiKeyEnv) || ''}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model.model,
          messages: [
            ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
            ...request.messages
          ],
          max_completion_tokens: Math.min(request.maxTokens || 900, model.maxTokens),
          temperature: request.temperature ?? 0.7,
          top_p: request.topP ?? 0.95,
          stream: false
        }),
        signal: AbortSignal.timeout(DEFAULT_CONFIG.timeout)
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const payload = await response.json();
      const text = payload.choices?.[0]?.message?.content || '';
      const toolCalls = payload.choices?.[0]?.message?.tool_calls;
      const finishReason = payload.choices?.[0]?.finish_reason || 'stop';

      return {
        text,
        provider: model.provider,
        model: model.id,
        usage: payload.usage,
        toolCalls,
        finishReason,
        latencyMs: 0
      };
    }

    const fallbackChain = this.config.fallbackChain;
    const modelsToTry = request.model ? [request.model] : [this.config.defaultModel, ...this.config.fallbackChain.filter(m => m !== this.config.defaultModel)];

    let lastError: Error | null = null;
    for (const modelId of modelsToTry) {
      try {
        const result = await attemptModel(modelId);
        return { ...result, latencyMs: Date.now() - Date.now() };
      } catch (error) {
        console.warn(`Model ${modelId} failed:`, error);
        continue;
      }
    }

    throw new Error('All models in fallback chain failed');
  }

  async *streamChat(request: AIRequest): AsyncGenerator<any, void, unknown> {
    const model = this.modelMap.get(request.model || this.config.defaultModel);
    if (!model) throw new Error(`Model not found: ${request.model || this.config.defaultModel}`);

    const messages: any[] = [
      ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
      ...request.messages
    ];

    const response = await fetch(`${model.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getApiKey(model.apiKeyEnv) || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model.model,
        messages: [
          ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
          ...request.messages
        ],
        max_completion_tokens: Math.min(request.maxTokens || 900, model.maxTokens),
        temperature: request.temperature ?? 0.7,
        top_p: request.topP ?? 0.95,
        stream: true
      }),
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

        const chunk = decoder.decode(value, { stream: true });
        for (const line of (buffer + chunk).split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            yield { text: '', done: true, finishReason: 'stop' };
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            if (delta?.content) {
              yield { text: delta.content, done: false };
            }
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
  options: { maxTokens?: number; model?: string; temperature?: number; stream?: boolean; tools?: ToolDefinition[] } = {}
): Promise<{ text: string; provider: string; model: string; usage?: any; toolCalls?: ToolCall[]; finishReason: string }> {
  return aiRegistry.chat({
    systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
    ...options
  });
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
  if (process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY) return 'zai';
  return 'local';
}