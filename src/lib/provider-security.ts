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
