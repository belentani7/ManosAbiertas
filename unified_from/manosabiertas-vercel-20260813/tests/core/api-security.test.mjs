import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { join } from 'node:path';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'next/server') return nextResolve('next/server.js', context);
    return nextResolve(specifier, context);
  },
});

const {
  apiJson,
  communityContentRisk,
  enforceRateLimit,
  hasRemoteAIConsent,
  readJsonBody,
} = await import('../../src/lib/api-security.ts');

test('remote AI consent requires an explicit true boolean', () => {
  assert.equal(hasRemoteAIConsent({ consentToRemoteAI: true }), true);
  assert.equal(hasRemoteAIConsent({ consentToRemoteAI: false }), false);
  assert.equal(hasRemoteAIConsent({ consentToRemoteAI: 'true' }), false);
  assert.equal(hasRemoteAIConsent(null), false);
  assert.equal(hasRemoteAIConsent(Object.create({ consentToRemoteAI: true })), false);
});

test('JSON reader enforces media type, syntax and byte limits', async () => {
  const valid = await readJsonBody(new Request('http://local.test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: 'ok' }),
  }), 100);
  assert.equal(valid.ok, true);

  const wrongType = await readJsonBody(new Request('http://local.test', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: '{}',
  }), 100);
  assert.equal(wrongType.ok, false);
  assert.equal(wrongType.response.status, 415);

  const invalid = await readJsonBody(new Request('http://local.test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{',
  }), 100);
  assert.equal(invalid.ok, false);
  assert.equal(invalid.response.status, 400);

  const oversized = await readJsonBody(new Request('http://local.test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: 'demasiado largo' }),
  }), 8);
  assert.equal(oversized.ok, false);
  assert.equal(oversized.response.status, 413);

  const invalidLength = await readJsonBody(new Request('http://local.test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': '-1' },
    body: '{}',
  }), 100);
  assert.equal(invalidLength.ok, false);
  assert.equal(invalidLength.response.status, 400);

  const safeFallbackLimit = await readJsonBody(new Request('http://local.test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  }), Number.NaN);
  assert.equal(safeFallbackLimit.ok, true);
});

test('JSON reader cancels an oversized request stream before reading its tail', async () => {
  let cancelled = false;
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"value":"'));
      controller.enqueue(new TextEncoder().encode('x'.repeat(200)));
    },
    cancel() {
      cancelled = true;
    },
  });
  const result = await readJsonBody(new Request('http://local.test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: stream,
    duplex: 'half',
  }), 32);
  assert.equal(result.ok, false);
  assert.equal(result.response.status, 413);
  assert.equal(cancelled, true);
});

test('API JSON responses carry a private non-executable header baseline', () => {
  const response = apiJson({ ok: true });
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(response.headers.get('content-security-policy'), /default-src 'none'/);
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
});

test('rate limiter isolates endpoint scopes and returns Retry-After', async () => {
  const request = new Request('http://local.test', {
    headers: { 'x-forwarded-for': '203.0.113.42' },
  });
  const scope = `test-${crypto.randomUUID()}`;
  assert.equal(await enforceRateLimit(request, scope, { limit: 1, windowMs: 60_000 }), null);
  const blocked = await enforceRateLimit(request, scope, { limit: 1, windowMs: 60_000 });
  assert.ok(blocked);
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get('retry-after')) >= 1);
  assert.equal(blocked.headers.get('ratelimit-limit'), '1');
  assert.equal(blocked.headers.get('ratelimit-remaining'), '0');
  assert.ok(Number(blocked.headers.get('ratelimit-reset')) >= 1);
  assert.equal(await enforceRateLimit(request, `${scope}-other`, { limit: 1, windowMs: 60_000 }), null);
});

test('rate limiter prefers a valid Vercel address and normalizes unsafe options', async () => {
  const scope = `vercel-${crypto.randomUUID()}`;
  const first = new Request('http://local.test', {
    headers: { 'x-vercel-forwarded-for': '203.0.113.9', 'x-forwarded-for': '198.51.100.1' },
  });
  const sameVercelClient = new Request('http://local.test', {
    headers: { 'x-vercel-forwarded-for': '203.0.113.9', 'x-forwarded-for': '198.51.100.2' },
  });
  assert.equal(await enforceRateLimit(first, scope, { limit: 0, windowMs: Number.NaN }), null);
  assert.equal((await enforceRateLimit(sameVercelClient, scope, { limit: 0, windowMs: Number.NaN }))?.status, 429);

  const anonymousScope = `anonymous-${crypto.randomUUID()}`;
  const malformed = new Request('http://local.test', { headers: { 'x-forwarded-for': 'not-an-ip' } });
  assert.equal(await enforceRateLimit(malformed, anonymousScope, { limit: 1, windowMs: 1_000 }), null);
  assert.equal((await enforceRateLimit(malformed, anonymousScope, { limit: 1, windowMs: 1_000 }))?.status, 429);
});

test('community filter blocks direct PII, links and active markup', () => {
  assert.equal(communityContentRisk('Busco grupo de estudio', 'Ana'), null);
  assert.equal(communityContentRisk('Escríbeme a ana@example.com', 'Ana'), 'personal-data');
  assert.equal(communityContentRisk('Mira https://example.com', 'Ana'), 'external-link');
  assert.equal(communityContentRisk('<script>alert(1)</script>', 'Ana'), 'active-markup');
  assert.equal(communityContentRisk('Oferta\u202Etxt.exe', 'Ana'), 'active-markup');
});

test('API index, health and community fallback retain their public contracts', () => {
  const read = (path) => readFileSync(join(PROJECT_ROOT, path), 'utf8');
  const security = read('src/lib/api-security.ts');
  const nextConfig = read('next.config.ts');
  const middleware = read('middleware.ts');
  const index = read('src/app/api/route.ts');
  const health = read('src/app/api/health/route.ts');
  const community = read('src/app/api/community/route.ts');
  const communityClient = read('src/components/manos-abiertas/community-section.tsx');
  assert.doesNotMatch(security, /rateLimits\.clear\(\)/);
  assert.match(middleware, /pathname === '\/api'/);
  assert.match(nextConfig, /source: "\/api"/);
  assert.match(nextConfig, /source: "\/api\/:path\*"/);
  assert.match(nextConfig, /default-src 'none'; base-uri 'none'; frame-ancestors 'none'/);
  assert.match(index, /apiVersion: 'v1'/);
  assert.doesNotMatch(index, /Hello, world!/);
  assert.match(health, /apiJson\(/);
  assert.doesNotMatch(health, /NextResponse/);
  assert.match(community, /ok: true,[\s\S]*mode: 'local',[\s\S]*degraded: true/);
  assert.match(community, /published: false/);
  assert.match(communityClient, /La publicación compartida no está disponible ahora\./);
  assert.doesNotMatch(communityClient, /Se publicará cuando Netlify esté conectado\./);
});
