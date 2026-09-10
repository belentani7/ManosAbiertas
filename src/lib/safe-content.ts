const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => HTML_ENTITIES[character]);
}

export function safeHttpUrl(value: unknown) {
  if (typeof value !== 'string' || value.length > 2048) return null;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function safeDownloadFilename(value: unknown, fallback = 'archivo') {
  const normalized = String(value ?? '')
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}._-]+/gu, '-')
    .replace(/^[.-]+|[.-]+$/g, '')
    .slice(0, 80);
  return normalized || fallback;
}

export function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

export function isBoundedStringArray(value: unknown): value is string[] {
  return Array.isArray(value)
    && value.length <= 1_000
    && value.every((item) => typeof item === 'string' && item.length <= 256);
}

export function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function parseStoredJson<T>(
  raw: string | null,
  fallback: T,
  isValid: (value: unknown) => value is T,
  maxChars = 250_000,
) {
  if (raw === null || raw.length > maxChars) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function readApiText(value: unknown, maxChars: number) {
  if (!isPlainRecord(value) || typeof value.text !== 'string') return null;
  const text = value.text.trim();
  return text && text.length <= maxChars ? text : null;
}

export function buildPrintableTextHtml(title: unknown, content: unknown) {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">
<title>${escapeHtml(title)}</title>
<style>body{font-family:Georgia,serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.6;white-space:pre-wrap;color:#1f2937}</style>
</head><body>${escapeHtml(content)}</body></html>`;
}
