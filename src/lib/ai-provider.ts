type ProviderMessage = { role: 'system' | 'user' | 'assistant'; content: string };

type ProviderResult = { text: string; provider: 'groq' | 'nvidia'; model: string };

async function callCompatibleProvider(
  provider: 'groq' | 'nvidia',
  apiKey: string,
  baseUrl: string,
  model: string,
  messages: ProviderMessage[],
): Promise<ProviderResult> {
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, max_completion_tokens: 900 }),
    signal: AbortSignal.timeout(45000),
  });

  if (!response.ok) throw new Error(`${provider} HTTP ${response.status}`);
  const payload = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  const text = payload.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error(`${provider} returned an empty response`);
  return { text, provider, model };
}

export async function callConfiguredProvider(messages: ProviderMessage[]): Promise<ProviderResult | null> {
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    return callCompatibleProvider('groq', groqKey, process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1', process.env.GROQ_MODEL || 'llama-3.1-8b-instant', messages);
  }

  const nvidiaKey = process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY || process.env.NVIDIA_ALT_KEY;
  if (nvidiaKey) {
    return callCompatibleProvider('nvidia', nvidiaKey, process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1', process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct', messages);
  }

  return null;
}

export function configuredProvider(): 'groq' | 'nvidia' | 'zai' | 'local' {
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY || process.env.NVIDIA_ALT_KEY) return 'nvidia';
  if (process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY) return 'zai';
  return 'local';
}
