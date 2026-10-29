import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';

const pagePath = join(PROJECT_ROOT, 'src/components/manos-abiertas/ai-study-tools.tsx');
const routePath = join(PROJECT_ROOT, 'src/app/api/study-tools/route.ts');

test('study UI distinguishes local content from remote AI for both result types', () => {
  const source = readFileSync(pagePath, 'utf8');
  assert.match(source, /useState<'local' \| 'remote'>\('local'\)/);
  assert.equal(source.match(/resultMode === 'remote' \? 'IA' : 'LOCAL'/g)?.length, 2);
  assert.equal(source.match(/data\.degraded === false/g)?.length, 2);
  assert.match(source, /remoteResult \? 'Preguntas generadas con IA/);
  assert.match(source, /remoteResult \? 'Resumen generado con IA/);
  assert.match(source, /'Fragmentos clave del texto'/);
  assert.doesNotMatch(source, /Resumir con IA/);
});

test('study UI clears stale content before each new request', () => {
  const source = readFileSync(pagePath, 'utf8');
  const questionStart = source.indexOf('async function generateQuestions()');
  const summaryStart = source.indexOf('async function generateSummary()');
  assert.ok(questionStart >= 0 && summaryStart > questionStart);
  const questions = source.slice(questionStart, summaryStart);
  const summary = source.slice(summaryStart, source.indexOf('return (', summaryStart));
  for (const handler of [questions, summary]) {
    assert.match(handler, /setQuestions\(null\)/);
    assert.match(handler, /setSummary\(null\)/);
    assert.match(handler, /setShowResults\(false\)/);
  }
});

test('study server returns actual provider truth and has empty-provider fallback', () => {
  const source = readFileSync(routePath, 'utf8');
  assert.match(source, /const effective = result\.text\s*\? result\s*:\s*\{ text: offline\(\), provider: 'offline' as const \}/);
  assert.match(source, /provider: effective\.provider, degraded: effective\.provider === 'offline'/);
  assert.match(source, /if \(!remoteConsent\)|remoteConsent\s*\?\s*await invokeAIText/);
});
