// Guard against publishing a campus homepage with broken local course links.
// Run with: node --test tests/campus-navigation-integrity.test.mjs
import test from 'node:test';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, statSync} from 'node:fs';
import {resolve, sep} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const campus = resolve(root, 'campus');
const home = readFileSync(resolve(campus, 'index.html'), 'utf8');

function attributes(tag) {
  const result = new Map();
  for (const match of tag.matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+))/gi)) {
    const name = match[1].toLowerCase();
    // Browsers use the first occurrence of a duplicated HTML attribute.
    if (!result.has(name)) result.set(name, match[2] ?? match[3] ?? match[4]);
  }
  return result;
}
function localTarget(value) {
  if (!value) return null;
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) {
    assert.match(value, /^(?:https?:|mailto:|tel:|\/\/)/i, 'Unsafe external URL: ' + value);
    return null;
  }
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

test('campus links reject executable and opaque URL schemes', () => {
  for (const value of [
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'file:///etc/passwd',
    'blob:https://example.com/id',
  ]) assert.throws(() => localTarget(value), /Unsafe external URL/);
  for (const value of ['https://example.com', 'mailto:info@example.com', 'tel:+34123456789', '//cdn.example.com/a.css'])
    assert.equal(localTarget(value), null);
});

test('general CI runs campus navigation integrity gate', () => {
  const workflow = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf8');
  assert.match(workflow, /node --test tests\/campus-navigation-integrity\.test\.mjs/);
});

test('HTML attribute parser includes unquoted references and preserves first duplicate', () => {
  assert.equal(attributes('<a href=../not-published.html>').get('href'), '../not-published.html');
  assert.equal(attributes('<option value=cursos/missing.json>').get('value'), 'cursos/missing.json');
  assert.equal(attributes('<section id=cursos>').get('id'), 'cursos');
  assert.equal(attributes('<a href=missing.html href="valid.html">').get('href'), 'missing.html');
});

test('quiz schema gate rejects syntactically valid but unusable payloads', () => {
  const question = { pregunta: '¿Pregunta?', opciones: ['Sí', 'No'], correcta: 0, explicacion: 'Motivo' };
  assert.doesNotThrow(() => assertValidQuiz([question], 'valid'));
  for (const invalid of [{}, [], [{ ...question, opciones: [] }], [{ ...question, correcta: 3 }],
    [{ ...question, explicacion: '' }]])
    assert.throws(() => assertValidQuiz(invalid, 'invalid'), /Quiz must|invalid|missing/);
});

test('rejected quiz routes clear stale answers and controls', () => {
  // Execute the actual browser quiz loader with a minimal DOM fixture.
  // No network call or external DOM dependency is needed for rejected URLs.
  const script = readFileSync(resolve(campus, 'app.js'), 'utf8');
  const start = script.indexOf('const $ =');
  const boundary = script.indexOf('// stagger');
  assert.ok(start >= 0 && boundary > start, 'Quiz loader must precede visual effects');
  const oldAnswers = [{disabled: false}];
  const ui = {
    '.quiz-titulo': {textContent: 'Pregunta anterior'},
    '.opciones': {children: oldAnswers, replaceChildren() {this.children = [];}},
    '.feedback': {textContent: 'Correcto'},
    '.marcador': {textContent: 'Aciertos: 1'},
    '.quiz-siguiente': {hidden: false},
  };
  const box = {querySelector(selector) {return ui[selector];}};
  runInNewContext(script.slice(start, boundary) + "\nloadQuiz('javascript:alert(1)', box);",
    {box, AbortController});
  assert.equal(ui['.quiz-titulo'].textContent, 'Ruta del cuestionario no permitida');
  assert.equal(ui['.opciones'].children.length, 0, 'Previous answer buttons must disappear');
  assert.equal(ui['.feedback'].textContent, '', 'Previous answer feedback must disappear');
  assert.equal(ui['.marcador'].textContent, '', 'Previous score must disappear');
  assert.equal(ui['.quiz-siguiente'].hidden, true, 'Previous next button must be disabled');
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
test('homepage local stylesheet, script and media references resolve to published files', () => {
  const failures = [];
  for (const match of home.matchAll(/<(?:link|script|img|source)\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const ref = attrs.get('src') ?? attrs.get('href');
    if (!ref || ref.startsWith('#')) continue;
    const target = localTarget(ref);
    if (target && (!existsSync(target) || !statSync(target).isFile())) failures.push(ref);
  }
  assert.deepEqual(failures, [], 'Missing campus assets');
});
test('all homepage fragment links point to existing section IDs', () => {
  const ids = new Set([...home.matchAll(/<[\w:-]+\b[^>]*>/gi)]
    .map(x => attributes(x[0]).get('id')).filter(Boolean));
  const missing = [...home.matchAll(/<a\b[^>]*>/gi)]
    .map(x => attributes(x[0]).get('href')).filter(x => x?.startsWith('#') && x.length > 1)
    .filter(x => !ids.has(decodeURIComponent(x.slice(1))));
  assert.deepEqual(missing, [], 'Broken fragment links');
});
test('every quiz selector source exists and contains valid JSON', () => {
  const sources = [...home.matchAll(/<option\b[^>]*>/gi)]
    .map(x => attributes(x[0]).get('value'))
    .filter(value => value && /\.json(?:[?#]|$)/i.test(value));
  assert.ok(sources.length >= 3, 'Expected the three course quiz choices');
  for (const source of sources) {
    const target = localTarget(source);
    assert.ok(target && existsSync(target), 'Missing quiz: ' + source);
    const data = JSON.parse(readFileSync(target, 'utf8'));
    assertValidQuiz(data, source);
  }
});
