import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';
import {
  boundedProviderText,
  buildProviderBody,
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

test('provider wire body retains tool calls, tool choice and structured JSON output', () => {
  const tools = [{ type: 'function', function: { name: 'find_course', description: 'Lookup', parameters: { type: 'object' } } }];
  const request = {
    systemPrompt: 'Be helpful',
    messages: [{ role: 'user', content: 'Encuentra un curso' }],
    tools,
    toolChoice: 'required',
    responseFormat: { type: 'json_object' },
    temperature: 0,
    topP: 0.2,
  };
  const model = { name: 'test-model', maxTokens: 256, supportsTools: true };
  for (const stream of [false, true]) {
    const wire = JSON.parse(JSON.stringify(buildProviderBody(request, model, 500, stream)));
    assert.equal(wire.model, 'test-model');
    assert.equal(wire.stream, stream);
    assert.deepEqual(wire.messages, [
      { role: 'system', content: 'Be helpful' },
      { role: 'user', content: 'Encuentra un curso' },
    ]);
    assert.equal(wire.max_completion_tokens, 256);
    assert.equal(wire.temperature, 0);
    assert.equal(wire.top_p, 0.2);
    assert.deepEqual(wire.tools, tools);
    assert.equal(wire.tool_choice, 'required');
    assert.deepEqual(wire.response_format, { type: 'json_object' });
  }
});

test('unsupported tool models do not send tools or orphan tool_choice', () => {
  const wire = buildProviderBody({
    messages: [{ role: 'user', content: 'Hola' }],
    tools: [{ type: 'function' }],
    toolChoice: 'required',
    responseFormat: { type: 'json_schema', json_schema: { name: 'result' } },
  }, { name: 'text-only', maxTokens: 100, supportsTools: false }, 90, false);
  assert.equal(Object.hasOwn(wire, 'tools'), false);
  assert.equal(Object.hasOwn(wire, 'tool_choice'), false);
  assert.deepEqual(wire.response_format, { type: 'json_schema', json_schema: { name: 'result' } });
});

test('both provider fetch paths serialize the same verified body builder', () => {
  const source = readFileSync(join(PROJECT_ROOT, 'src/lib/ai-provider.ts'), 'utf8');
  assert.match(source, /body:\s*JSON\.stringify\(body\)/);
  assert.match(source, /body:\s*JSON\.stringify\(buildProviderBody\(/);
  assert.doesNotMatch(source, /body:\s*JSON\.stringify\(\{/);
});
