import { readBoundedJson } from './network-json';
import { boundedProviderText, providerTextFromPayload, safeMaxTokens, safeProviderEndpoint, safeProviderModel } from './provider-security';

type ProviderMessage = { role: 'system' | 'user' | 'assistant'; content: string };

type ProviderResult = { text: string; provider: 'groq' | 'nvidia' | 'qwen' | 'zai' | 'offline'; model?: string };

async function callCompatibleProvider(
  provider: 'groq' | 'nvidia' | 'qwen',
  apiKey: string,
  baseUrl: string,
  model: string,
  messages: ProviderMessage[],
  maxTokens = 900,
): Promise<ProviderResult> {
  const endpoint = safeProviderEndpoint(baseUrl);
  const safeModel = safeProviderModel(model);
  if (!endpoint || !safeModel) throw new Error(`${provider} configuration rejected`);
  const tokenLimit = safeMaxTokens(maxTokens);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: safeModel, messages, max_completion_tokens: tokenLimit }),
    signal: AbortSignal.timeout(45000),
  });

  if (!response.ok) throw new Error(`${provider} HTTP ${response.status}`);
  const payload = await readBoundedJson(response, 1_000_000);
  const text = providerTextFromPayload(payload, Math.min(65_536, tokenLimit * 16));
  if (!text) throw new Error(`${provider} returned an empty response`);
  return { text, provider, model: safeModel };
}

export async function callConfiguredProvider(
  messages: ProviderMessage[],
  maxTokens = 900,
): Promise<ProviderResult | null> {
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    return callCompatibleProvider('groq', groqKey, process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1', process.env.GROQ_MODEL || 'llama-3.1-8b-instant', messages, maxTokens);
  }

  const nvidiaKey = process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY || process.env.NVIDIA_ALT_KEY;
  if (nvidiaKey) {
    return callCompatibleProvider('nvidia', nvidiaKey, process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1', process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct', messages, maxTokens);
  }

  const qwenKey = process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY;
  if (qwenKey) {
    return callCompatibleProvider('qwen', qwenKey, process.env.QWEN_BASE_URL || 'https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1', process.env.QWEN_MODEL || 'qwen3.8-max', messages, maxTokens);
  }

  return null;
}

export function configuredProvider(): 'groq' | 'nvidia' | 'qwen' | 'zai' | 'local' {
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY || process.env.NVIDIA_ALT_KEY) return 'nvidia';
  if (process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY) return 'qwen';
  if (process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY) return 'zai';
  return 'local';
}

/**
 * Unified AI invocation with priority:
 * 1. Configured env provider (GROQ_API_KEY / NVIDIA_API_KEY)
 * 2. Z.ai SDK (requires .z-ai-config)
 * 3. Deterministic offline fallback (optional via `offline`)
 *
 * Returns { text, provider } — `text` is '' only if every path failed
 * and no offline fallback was provided.
 */
export async function invokeAIText(
  systemPrompt: string,
  userPrompt: string,
  options: { maxTokens?: number; offline?: () => string } = {},
): Promise<ProviderResult> {
  const messages: ProviderMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];
  const maxTokens = safeMaxTokens(options.maxTokens ?? 900);

  // 1) Env-configured provider (GROQ/NVIDIA)
  try {
    const configured = await callConfiguredProvider(messages, maxTokens);
    if (configured) return configured;
  } catch (error) {
    console.warn(`Configured AI provider unavailable (${error instanceof Error ? error.name : 'UnknownError'})`);
  }

  // 2) Z.ai SDK — may throw when .z-ai-config is missing
  try {
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' },
    });
    const text = boundedProviderText(completion.choices?.[0]?.message?.content, maxTokens) || '';
    if (text) return { text, provider: 'zai' };
  } catch (error) {
    console.warn(`Z.ai provider unavailable (${error instanceof Error ? error.name : 'UnknownError'})`);
  }

  // 3) Offline fallback (deterministic, no external call)
  if (options.offline) {
    return { text: boundedProviderText(options.offline(), maxTokens) || '', provider: 'offline' };
  }

  return { text: '', provider: 'offline' };
}
