import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';
import { LANGUAGES } from '../../src/i18n/languages.ts';
import { offlineStudyText } from '../../src/lib/study-offline.ts';

const paragraph = [
  'Aprender habilidades digitales facilita el acceso a nuevas oportunidades profesionales.',
  'Las herramientas gratuitas permiten practicar con autonomía y seguridad.',
  'La privacidad requiere revisar los permisos antes de compartir datos personales.',
].join(' ');

test('every selectable language produces safe offline questions without Spanish-only fallback', () => {
  for (const { code } of LANGUAGES) {
    const result = JSON.parse(offlineStudyText(paragraph, code, 'questions'));
    assert.ok(result.questions.length > 0 && result.questions.length <= 3, code);
    for (const question of result.questions) {
      assert.ok(question.question.includes('______'), code);
      assert.ok(question.question.length <= 1_000, code);
      assert.equal(typeof question.hint, 'string', code);
      assert.ok(question.hint.length <= 1_000, code);
    }
  }
  assert.match(JSON.parse(offlineStudyText(paragraph, 'en', 'questions')).questions[0].question, /^Complete the sentence:/);
  assert.match(JSON.parse(offlineStudyText(paragraph, 'pt-BR', 'questions')).questions[0].question, /^Complete a frase:/);
  assert.match(JSON.parse(offlineStudyText(paragraph, 'ca', 'questions')).questions[0].question, /^Completa la frase:/);
  assert.equal(JSON.parse(offlineStudyText(paragraph, 'qu', 'questions')).questions[0].hint, '');
});

test('offline questions are based on supplied text and never invented external facts', () => {
  const phrase = 'Estudiar informática permite organizar recursos de formación y aprender a buscar ayuda.';
  const one = JSON.parse(offlineStudyText(phrase, 'es', 'questions'));
  assert.equal(one.questions.length, 1);
  assert.match(one.questions[0].question, /formación|informática|organizar|recursos/);
  const cjk = '中文学习工具帮助用户找到学习资源并进行互动练习。学习者可以通过练习提高基础技能。';
  const result = JSON.parse(offlineStudyText(cjk, 'zh', 'questions'));
  assert.ok(result.questions.length >= 1);
  assert.ok(result.questions.every(({ question }) => question.includes('______')));
  assert.equal(offlineStudyText('', 'en', 'questions'), '');
});

test('offline summaries are deterministic, extractive and nonempty without punctuation', () => {
  const summary = offlineStudyText(paragraph, 'en', 'summary');
  assert.match(summary, /^1\. /);
  assert.match(summary, /oportunidades profesionales/);
  assert.ok(summary.split('\n').length <= 5);
  const noPeriods = offlineStudyText('This continuous paragraph contains enough clear information for an offline reading exercise without any full stops', 'en', 'summary');
  assert.ok(noPeriods.startsWith('1. '));
  assert.equal(offlineStudyText('   ', 'pt', 'summary'), '');
});

test('study API uses the local helper only when remote consent is absent or provider fails', () => {
  const route = readFileSync(join(PROJECT_ROOT, 'src/app/api/study-tools/route.ts'), 'utf8');
  assert.match(route, /offlineStudyText\(content, lang, body\.tool\)/);
  assert.match(route, /remoteConsent\s*\?\s*await invokeAIText\(systemPrompt, userPrompt, \{ offline \}\)/);
  assert.match(route, /:\s*\{ text: offline\(\), provider: 'offline' as const \}/);
  assert.doesNotMatch(route, /¿Qué se dice sobre/);
});
