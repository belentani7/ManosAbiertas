import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';
import {
  boundedProviderText,
  providerTextFromPayload,
  safeMaxTokens,
  safeProviderEndpoint,
  safeProviderModel,
} from '../../src/lib/provider-security.ts';

test('provider endpoints require HTTPS without credentials in production', () => {
  assert.equal(safeProviderEndpoint('https://api.example.com/v1', true), 'https://api.example.com/v1/chat/completions');
  assert.equal(safeProviderEndpoint('http://api.example.com/v1', true), null);
  assert.equal(safeProviderEndpoint('https://user:pass@api.example.com/v1', true), null);
  assert.equal(safeProviderEndpoint('https://api.example.com/v1?redirect=other', true), null);
  assert.equal(safeProviderEndpoint('https://api.example.com/v1#fragment', true), null);
  assert.equal(safeProviderEndpoint('http://127.0.0.1:8080/v1', false), 'http://127.0.0.1:8080/v1/chat/completions');
  assert.equal(safeProviderEndpoint('not-a-url', true), null);
});

test('provider model, token and output limits reject unsafe values', () => {
  assert.equal(safeProviderModel(' model/name '), 'model/name');
  assert.equal(safeProviderModel('bad\nmodel'), null);
  assert.equal(safeProviderModel('x'.repeat(201)), null);
  assert.equal(safeMaxTokens(Number.NaN), 900);
  assert.equal(safeMaxTokens(-10), 1);
  assert.equal(safeMaxTokens(99_999), 4_096);
  assert.equal(boundedProviderText(' respuesta ', 10), 'respuesta');
  assert.equal(boundedProviderText('x'.repeat(161), 10), null);
});

test('compatible provider payload requires the expected nested string', () => {
  assert.equal(providerTextFromPayload({ choices: [{ message: { content: ' hola ' } }] }, 20), 'hola');
  assert.equal(providerTextFromPayload({ choices: [{ message: { content: { bad: true } } }] }, 20), null);
  assert.equal(providerTextFromPayload({ choices: [] }, 20), null);
  assert.equal(providerTextFromPayload({ choices: [{ message: { content: 'x'.repeat(21) } }] }, 20), null);
});

test('AI provider retains endpoint, token, response-size and log-sanitization boundaries', () => {
  const source = readFileSync(join(PROJECT_ROOT, 'src/lib/ai-provider.ts'), 'utf8');
  assert.match(source, /safeProviderEndpoint/);
  assert.match(source, /safeMaxTokens/);
  assert.match(source, /readBoundedJson\(response, 1_000_000\)/);
  assert.match(source, /boundedProviderText/);
  assert.doesNotMatch(source, /response\.json\(/);
  assert.doesNotMatch(source, /console\.warn\([^\n]*,\s*error/);
});
