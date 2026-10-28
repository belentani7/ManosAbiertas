import { isPlainRecord } from './safe-content.ts';

export function safeProviderEndpoint(baseUrl: string, production = process.env.NODE_ENV === 'production') {
  if (baseUrl.length > 2_048) return null;
  try {
    const url = new URL(baseUrl);
    const localDevelopment = !production
      && url.protocol === 'http:'
      && (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1');
    if ((url.protocol !== 'https:' && !localDevelopment) || url.username || url.password || url.search || url.hash) return null;
    url.pathname = `${url.pathname.replace(/\/$/, '')}/chat/completions`;
    return url.href;
  } catch {
    return null;
  }
}

export function safeProviderModel(value: string) {
  const model = value.trim();
// eslint-disable-next-line no-control-regex -- valid Unicode control chars for model sanitization
  return model && model.length <= 200 && !/[\u0000-\u001f\u007f]/.test(model) ? model : null;
}

export function safeMaxTokens(value: number) {
  return Number.isFinite(value) ? Math.max(1, Math.min(4_096, Math.round(value))) : 900;
}

export function providerTextFromPayload(value: unknown, maxChars: number) {
  if (!isPlainRecord(value) || !Array.isArray(value.choices)) return null;
  const first = value.choices[0];
  if (!isPlainRecord(first) || !isPlainRecord(first.message) || typeof first.message.content !== 'string') return null;
  const text = first.message.content.trim();
  return text && text.length <= maxChars ? text : null;
}

export function boundedProviderText(value: unknown, maxTokens: number) {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  const maxChars = Math.min(65_536, safeMaxTokens(maxTokens) * 16);
  return text && text.length <= maxChars ? text : null;
}

/**
 * Build the actual OpenAI-compatible wire payload once for streaming and non-streaming.
 * Keep optional tool and structured-output fields intact when serializing.
 */
export function buildProviderBody(
  request: {
    messages: readonly { role: string; content: string; tool_calls?: unknown; tool_call_id?: string; name?: string }[];
    systemPrompt?: string;
    temperature?: number;
    topP?: number;
    tools?: readonly unknown[];
    toolChoice?: unknown;
    responseFormat?: unknown;
  },
  model: { name: string; maxTokens: number; supportsTools: boolean },
  maxTokens: number,
  stream: boolean,
): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model: model.name,
    messages: [
      ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
      ...request.messages,
    ],
    max_completion_tokens: Math.min(maxTokens, model.maxTokens),
    temperature: request.temperature ?? 0.7,
    top_p: request.topP ?? 0.95,
    stream,
  };
  if (model.supportsTools && request.tools?.length) {
    body.tools = request.tools;
    if (request.toolChoice) body.tool_choice = request.toolChoice;
  }
  if (request.responseFormat) body.response_format = request.responseFormat;
  return body;
}

/** Split complete SSE lines while preserving a partial UTF-8-decoded frame. */
export function takeSseLines(buffer: string): { lines: string[]; remainder: string } {
  const parts = buffer.split('\n');
  const remainder = parts.pop() ?? '';
  // Prevent an upstream provider from growing a never-terminated event forever.
  if (remainder.length > 131_072) throw new Error('Provider SSE event exceeds size limit');
  return { lines: parts.map(line => line.endsWith('\r') ? line.slice(0, -1) : line), remainder };
}
