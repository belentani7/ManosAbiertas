import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';
import { JsonRequestError, readBoundedJson, requestJson } from '../../src/lib/network-json.ts';

test('bounded JSON reader enforces MIME, declared size, actual size and syntax', async () => {
  await assert.rejects(
    readBoundedJson(new Response('{}', { headers: { 'content-type': 'text/html' } }), 100),
    (error) => error instanceof JsonRequestError && error.code === 'INVALID_CONTENT_TYPE',
  );
  await assert.rejects(
    readBoundedJson(new Response('{}', { headers: { 'content-type': 'application/json', 'content-length': '101' } }), 100),
    (error) => error instanceof JsonRequestError && error.code === 'RESPONSE_TOO_LARGE',
  );
  await assert.rejects(
    readBoundedJson(new Response(JSON.stringify({ text: 'x'.repeat(100) }), { headers: { 'content-type': 'application/json' } }), 50),
    (error) => error instanceof JsonRequestError && error.code === 'RESPONSE_TOO_LARGE',
  );
  let streamCancelled = false;
  const oversizedStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"text":"'));
      controller.enqueue(new TextEncoder().encode('x'.repeat(100)));
    },
    cancel() {
      streamCancelled = true;
    },
  });
  await assert.rejects(
    readBoundedJson(new Response(oversizedStream, { headers: { 'content-type': 'application/json' } }), 50),
    (error) => error instanceof JsonRequestError && error.code === 'RESPONSE_TOO_LARGE',
  );
  assert.equal(streamCancelled, true);
  await assert.rejects(
    readBoundedJson(new Response('{bad', { headers: { 'content-type': 'application/json' } }), 100),
    (error) => error instanceof JsonRequestError && error.code === 'INVALID_JSON',
  );
  assert.deepEqual(
    await readBoundedJson(new Response('{"ok":true}', { headers: { 'content-type': 'application/json' } }), Number.NaN),
    { ok: true },
  );
});

test('JSON request adds Accept, preserves caller headers and rejects HTTP errors', async () => {
  let received;
  const fetcher = async (_input, init) => {
    received = init;
    return new Response('{"ok":true}', { status: 200, headers: { 'content-type': 'application/json' } });
  };
  assert.deepEqual(
    await requestJson('/api/test', { headers: { 'X-Test': 'yes' } }, { fetcher, timeoutMs: 1_000 }),
    { ok: true },
  );
  assert.equal(received.headers.get('accept'), 'application/json');
  assert.equal(received.headers.get('x-test'), 'yes');
  assert.ok(received.signal instanceof AbortSignal);
  assert.deepEqual(await requestJson('/api/test', {}, { fetcher, timeoutMs: Number.NaN, maxResponseBytes: Number.NaN }), { ok: true });

  await assert.rejects(
    requestJson('/api/test', {}, {
      fetcher: async () => new Response('{"ok":false}', { status: 503, headers: { 'content-type': 'application/json' } }),
    }),
    (error) => error instanceof JsonRequestError && error.code === 'HTTP_ERROR' && error.status === 503,
  );
});

test('JSON request composes caller cancellation with its bounded timeout', async () => {
  const fetcher = (_input, init) => new Promise((_resolve, reject) => {
    init.signal.addEventListener('abort', () => reject(init.signal.reason), { once: true });
  });
  const controller = new AbortController();
  const request = requestJson('/api/test', { signal: controller.signal }, { fetcher, timeoutMs: 60_000 });
  controller.abort(new Error('caller-cancelled'));
  await assert.rejects(request, /caller-cancelled/);

  const startedAt = Date.now();
  await assert.rejects(
    requestJson('/api/test', {}, { fetcher, timeoutMs: 250 }),
    (error) => error?.name === 'TimeoutError',
  );
  assert.ok(Date.now() - startedAt >= 200);
  assert.ok(Date.now() - startedAt < 2_000);
});

test('remote consumers retain the shared bounded JSON boundary', () => {
  const read = (path) => readFileSync(join(PROJECT_ROOT, path), 'utf8');
  const paths = [
    'src/components/manos-abiertas/ai-assistant.tsx',
    'src/components/manos-abiertas/ai-playground.tsx',
    'src/components/manos-abiertas/ai-study-tools.tsx',
    'src/components/manos-abiertas/ats-analyzer.tsx',
    'src/components/manos-abiertas/community-section.tsx',
    'src/components/manos-abiertas/cover-letter-builder.tsx',
    'src/components/manos-abiertas/cv-section.tsx',
    'src/components/manos-abiertas/system-awareness.tsx',
  ];
  const consumers = paths.map(read).join('\n');
  assert.doesNotMatch(consumers, /\bfetch\s*\(/);
  assert.doesNotMatch(consumers, /\.(?:json)\s*\(/);
  for (const path of paths) assert.match(read(path), /requestJson/);
  assert.match(read('src/components/manos-abiertas/ai-assistant.tsx'), /text\.trim\(\)\.slice\(0, 12_000\)/);
  assert.match(read('src/components/manos-abiertas/ai-playground.tsx'), /text\.trim\(\)\.slice\(0, 12_000\)/);
  assert.match(read('src/components/manos-abiertas/ai-study-tools.tsx'), /content\.slice\(0, 5_000\)/);
  assert.match(read('src/components/manos-abiertas/community-section.tsx'), /controller\.abort\(\)/);
});
