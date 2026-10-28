// Guard against publishing a campus homepage with broken local course links.
// Run with: node --test tests/campus-navigation-integrity.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, statSync} from 'node:fs';
import {resolve, sep} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const campus = resolve(root, 'campus');
const home = readFileSync(resolve(campus, 'index.html'), 'utf8');

function attributes(tag) {
  const result = new Map();
  for (const match of tag.matchAll(/([\w-]+)\s*=\s*(["'])(.*?)\2/gis))
    result.set(match[1].toLowerCase(), match[3]);
  return result;
}
function localTarget(value) {
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return null;
  const url = new URL(value, 'https://campus.invalid/campus/index.html');
  const path = decodeURIComponent(url.pathname);
  assert.ok(path.startsWith('/campus/'), 'Local link escapes published campus: ' + value);
  const target = resolve(campus, '.' + path.slice('/campus'.length));
  assert.ok(target === campus || target.startsWith(campus + sep), 'Path escapes campus: ' + value);
  return target;
}
function assertValidQuiz(data, source) {
  assert.ok(Array.isArray(data) && data.length > 0 && data.length <= 50,
    'Quiz must contain 1–50 questions: ' + source);
  for (const [index, question] of data.entries()) {
    const label = source + ' question ' + (index + 1);
    assert.ok(question && typeof question === 'object' && !Array.isArray(question), label + ' must be an object');
    assert.ok(typeof question.pregunta === 'string' && question.pregunta.trim(), label + ' missing question');
    assert.ok(Array.isArray(question.opciones) && question.opciones.length >= 2 && question.opciones.length <= 6 &&
      question.opciones.every(option => typeof option === 'string' && option.trim()), label + ' invalid options');
    assert.ok(Number.isInteger(question.correcta) && question.correcta >= 0 &&
      question.correcta < question.opciones.length, label + ' invalid correct answer');
    assert.ok(typeof question.explicacion === 'string' && question.explicacion.trim(), label + ' missing explanation');
  }
}

test('local links cannot silently leave the published campus', () => {
  for (const href of ['../not-published.html', '/not-published.html', '%2e%2e/not-published.html'])
    assert.throws(() => localTarget(href), /Local link escapes published campus/);
  assert.equal(localTarget('https://example.com/course'), null);
});

test('quiz schema gate rejects syntactically valid but unusable payloads', () => {
  const question = { pregunta: '¿Pregunta?', opciones: ['Sí', 'No'], correcta: 0, explicacion: 'Motivo' };
  assert.doesNotThrow(() => assertValidQuiz([question], 'valid'));
  for (const invalid of [{}, [], [{ ...question, opciones: [] }], [{ ...question, correcta: 3 }],
    [{ ...question, explicacion: '' }]])
    assert.throws(() => assertValidQuiz(invalid, 'invalid'), /Quiz must|invalid|missing/);
});

test('homepage local document links resolve to published files', () => {
  const failures = [];
  for (const match of home.matchAll(/<a\b[^>]*>/gi)) {
    const href = attributes(match[0]).get('href');
    if (!href || href.startsWith('#')) continue;
    const target = localTarget(href);
    if (target && (!existsSync(target) || !statSync(target).isFile())) failures.push(href);
  }
  assert.deepEqual(failures, [], 'Broken campus links');
});
test('all homepage fragment links point to existing section IDs', () => {
  const ids = new Set([...home.matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)].map(x => x[2]));
  const missing = [...home.matchAll(/<a\b[^>]*>/gi)]
    .map(x => attributes(x[0]).get('href')).filter(x => x?.startsWith('#') && x.length > 1)
    .filter(x => !ids.has(decodeURIComponent(x.slice(1))));
  assert.deepEqual(missing, [], 'Broken fragment links');
});
test('every quiz selector source exists and contains valid JSON', () => {
  const sources = [...home.matchAll(/<option\b[^>]*value\s*=\s*(["'])([^"']+\.json)\1/gi)].map(x=>x[2]);
  assert.ok(sources.length >= 3, 'Expected the three course quiz choices');
  for (const source of sources) {
    const target = localTarget(source);
    assert.ok(target && existsSync(target), 'Missing quiz: ' + source);
    const data = JSON.parse(readFileSync(target, 'utf8'));
    assertValidQuiz(data, source);
  }
});
