const JSON_CONTENT_TYPE = /^application\/(?:[a-z0-9.+-]+\+)?json(?:\s*;|$)/i;

function boundedNumber(value: number | undefined, fallback: number, min: number, max: number) {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(min, Math.min(value, max))
    : fallback;
}

export class JsonRequestError extends Error {
  readonly code: 'HTTP_ERROR' | 'INVALID_CONTENT_TYPE' | 'RESPONSE_TOO_LARGE' | 'INVALID_JSON';
  readonly status: number;

  constructor(
    code: 'HTTP_ERROR' | 'INVALID_CONTENT_TYPE' | 'RESPONSE_TOO_LARGE' | 'INVALID_JSON',
    status: number,
  ) {
    super(code);
    this.name = 'JsonRequestError';
    this.code = code;
    this.status = status;
  }
}

async function readBoundedText(response: Response, byteLimit: number) {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  let exceeded = false;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > byteLimit) {
        exceeded = true;
        throw new JsonRequestError('RESPONSE_TOO_LARGE', response.status);
      }
      chunks.push(value);
    }
  } finally {
    if (exceeded) await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export async function readBoundedJson(response: Response, maxBytes: number): Promise<unknown> {
  const byteLimit = boundedNumber(maxBytes, 256_000, 1, 2_000_000);
  const contentType = response.headers.get('content-type') || '';
  if (!JSON_CONTENT_TYPE.test(contentType)) {
    throw new JsonRequestError('INVALID_CONTENT_TYPE', response.status);
  }

  const declaredLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > byteLimit) {
    throw new JsonRequestError('RESPONSE_TOO_LARGE', response.status);
  }

  const text = await readBoundedText(response, byteLimit);

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new JsonRequestError('INVALID_JSON', response.status);
  }
}

type JsonRequestOptions = {
  timeoutMs?: number;
  maxResponseBytes?: number;
  fetcher?: typeof fetch;
};

export async function requestJson(
  input: RequestInfo | URL,
  init: RequestInit = {},
  options: JsonRequestOptions = {},
) {
  const timeoutMs = boundedNumber(options.timeoutMs, 10_000, 250, 60_000);
  const maxResponseBytes = boundedNumber(options.maxResponseBytes, 256_000, 1_024, 2_000_000);
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const signal = init.signal ? AbortSignal.any([init.signal, timeoutSignal]) : timeoutSignal;
  const headers = new Headers(init.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  const response = await (options.fetcher ?? fetch)(input, { ...init, headers, signal });
  const data = await readBoundedJson(response, maxResponseBytes);
  if (!response.ok) throw new JsonRequestError('HTTP_ERROR', response.status);
  return data;
}
