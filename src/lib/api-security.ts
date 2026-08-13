import { NextResponse } from 'next/server';
import { isIP } from 'node:net';

type JsonObject = Record<string, unknown>;

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type JsonReadResult =
  | { ok: true; data: unknown }
  | { ok: false; response: NextResponse };

const JSON_CONTENT_TYPE = /^application\/(?:[a-z0-9.+-]+\+)?json(?:\s*;|$)/i;
const RATE_LIMIT_STORE_KEY = '__manos_abiertas_rate_limits__';
const MAX_RATE_LIMIT_ENTRIES = 10_000;

const globalRateLimit = globalThis as typeof globalThis & {
  [RATE_LIMIT_STORE_KEY]?: Map<string, RateLimitEntry>;
};

const rateLimits = globalRateLimit[RATE_LIMIT_STORE_KEY]
  ?? (globalRateLimit[RATE_LIMIT_STORE_KEY] = new Map<string, RateLimitEntry>());

const RESPONSE_HEADERS = {
  'Cache-Control': 'no-store',
  'Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

function boundedInteger(value: number, fallback: number, min: number, max: number) {
  return Number.isFinite(value)
    ? Math.max(min, Math.min(max, Math.floor(value)))
    : fallback;
}

async function readBoundedRequestText(request: Request, maxBytes: number) {
  if (!request.body) return { ok: true as const, text: '' };
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { ok: false as const, tooLarge: true as const };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false as const, tooLarge: false as const };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { ok: true as const, text: new TextDecoder().decode(bytes) };
}

export function apiJson(data: unknown, status = 200, headers: HeadersInit = {}) {
  return NextResponse.json(data, {
    status,
    headers: { ...RESPONSE_HEADERS, ...Object.fromEntries(new Headers(headers)) },
  });
}

export function apiError(
  code: string,
  message: string,
  status: number,
  extra: JsonObject = {},
) {
  return apiJson({ ok: false, error: message, code, ...extra }, status);
}

export async function readJsonBody(request: Request, maxBytes: number): Promise<JsonReadResult> {
  const byteLimit = boundedInteger(maxBytes, 256_000, 1, 2_000_000);
  const contentType = request.headers.get('content-type') || '';
  if (!JSON_CONTENT_TYPE.test(contentType)) {
    return {
      ok: false,
      response: apiError('UNSUPPORTED_MEDIA_TYPE', 'El contenido debe enviarse como JSON.', 415),
    };
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength !== null && !/^\d+$/.test(contentLength)) {
    return {
      ok: false,
      response: apiError('INVALID_CONTENT_LENGTH', 'La longitud declarada no es válida.', 400),
    };
  }
  const declaredLength = contentLength === null ? null : Number(contentLength);
  if (declaredLength !== null && (!Number.isSafeInteger(declaredLength) || declaredLength > byteLimit)) {
    return {
      ok: false,
      response: apiError('PAYLOAD_TOO_LARGE', 'La solicitud es demasiado grande.', 413),
    };
  }

  const body = await readBoundedRequestText(request, byteLimit);
  if (!body.ok) {
    return {
      ok: false,
      response: body.tooLarge
        ? apiError('PAYLOAD_TOO_LARGE', 'La solicitud es demasiado grande.', 413)
        : apiError('INVALID_BODY', 'No se pudo leer la solicitud.', 400),
    };
  }
  const { text } = body;

  if (!text.trim()) {
    return {
      ok: false,
      response: apiError('INVALID_JSON', 'El cuerpo JSON está vacío.', 400),
    };
  }

  try {
    return { ok: true, data: JSON.parse(text) as unknown };
  } catch {
    return {
      ok: false,
      response: apiError('INVALID_JSON', 'El cuerpo JSON no es válido.', 400),
    };
  }
}

function firstValidAddress(value: string | null) {
  if (!value) return null;
  for (const part of value.split(',')) {
    const candidate = part.trim();
    if (candidate.length <= 45 && isIP(candidate)) return candidate;
  }
  return null;
}

function clientAddress(request: Request) {
  const headers = [
    'x-vercel-forwarded-for',
    'x-nf-client-connection-ip',
    'cf-connecting-ip',
    'x-real-ip',
    'x-forwarded-for',
  ];
  for (const header of headers) {
    const address = firstValidAddress(request.headers.get(header));
    if (address) return address;
  }
  return 'anonymous';
}

async function rateLimitKey(request: Request, scope: string) {
  const source = new TextEncoder().encode(`${scope}:${clientAddress(request)}`);
  const digest = await crypto.subtle.digest('SHA-256', source);
  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

function removeExpiredRateLimits(now: number) {
  if (rateLimits.size < MAX_RATE_LIMIT_ENTRIES) return;
  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(key);
  }
  while (rateLimits.size >= MAX_RATE_LIMIT_ENTRIES) {
    const oldestKey = rateLimits.keys().next().value;
    if (!oldestKey) break;
    rateLimits.delete(oldestKey);
  }
}

export async function enforceRateLimit(
  request: Request,
  scope: string,
  options: RateLimitOptions,
): Promise<NextResponse | null> {
  const now = Date.now();
  removeExpiredRateLimits(now);
  const limit = boundedInteger(options.limit, 60, 1, 1_000);
  const windowMs = boundedInteger(options.windowMs, 60_000, 1_000, 86_400_000);

  const key = await rateLimitKey(request, scope);
  const current = rateLimits.get(key);
  const entry = !current || current.resetAt <= now
    ? { count: 0, resetAt: now + windowMs }
    : current;

  entry.count += 1;
  rateLimits.set(key, entry);

  if (entry.count <= limit) return null;

  const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  return NextResponse.json(
    {
      ok: false,
      error: 'Has realizado demasiadas solicitudes. Inténtalo de nuevo más tarde.',
      code: 'RATE_LIMITED',
    },
    {
      status: 429,
      headers: {
        ...RESPONSE_HEADERS,
        'RateLimit-Limit': String(limit),
        'RateLimit-Remaining': '0',
        'RateLimit-Reset': String(retryAfter),
        'Retry-After': String(retryAfter),
      },
    },
  );
}

export function hasRemoteAIConsent(data: unknown) {
  return Boolean(
    data
    && typeof data === 'object'
    && Object.hasOwn(data, 'consentToRemoteAI')
    && (data as Record<string, unknown>).consentToRemoteAI === true,
  );
}

export function reportServerError(scope: string, error: unknown) {
  const kind = error instanceof Error ? error.name : 'UnknownError';
  console.error(`[${scope}] request failed (${kind})`);
}

const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE_PATTERN = /(?:\+?\d[\s().-]*){9,}/;
const ID_PATTERN = /\b(?:[XYZ]\d{7}[A-Z]|\d{8}[A-Z])\b/i;
const URL_PATTERN = /(?:https?:\/\/|www\.)\S+/i;
const MARKUP_PATTERN = /<\/?[a-z][^>]*>|javascript:|[\u0000-\u0008\u000B\u000C\u000E-\u001F\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/i;
const THREAT_PATTERN = /\b(?:matar|muerte|amenaza|arma|kill|weapon|bomb|bomba)\b/i;

export function communityContentRisk(title: string, author: string) {
  const content = `${title}\n${author}`;
  if (EMAIL_PATTERN.test(content) || PHONE_PATTERN.test(content) || ID_PATTERN.test(content)) return 'personal-data';
  if (URL_PATTERN.test(content)) return 'external-link';
  if (MARKUP_PATTERN.test(content)) return 'active-markup';
  if (THREAT_PATTERN.test(content)) return 'unsafe-content';
  return null;
}
