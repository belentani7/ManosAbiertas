import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../campus/app.js', import.meta.url), 'utf8');
const quizUrl = (slug) => 'cursos/' + slug + '/quiz.json';

function fakeElement() {
  return {
    textContent: '', hidden: false, disabled: false, children: [],
    classList: { add() {} },
    handlers: {},
    replaceChildren() { this.children = []; },
    append(node) { this.children.push(node); },
    addEventListener(name, callback) { this.handlers[name] = callback; },
  };
}

function createBrowser() {
  const children = Object.fromEntries(['.quiz-titulo', '.opciones', '.feedback',
    '.marcador', '.quiz-siguiente'].map(name => [name, fakeElement()]));
  const box = { querySelector(name) { return children[name]; } };
  const handlers = {};
  const select = { value: quizUrl('alfabetizacion-ia'),
    addEventListener(name, callback) { handlers[name] = callback; } };
  const document = {
    documentElement: { classList: { add() {} } },
    querySelector(name) { return name === '.quiz-box' ? box : null; },
    getElementById(name) { return name === 'quizCurso' ? select : null; },
    querySelectorAll() { return []; },
    createElement() { return fakeElement(); },
    head: { append() {} },
  };
  const pending = new Map();
  const fetch = (url, { signal }) => new Promise((resolve, reject) => {
    pending.set(url, { resolve, reject, signal });
  });
  runInNewContext(script, {
    document, fetch, navigator: {}, window: {}, AbortController,
    matchMedia() { return { matches: true }; },
    localStorage: { setItem() {} },
  }, { filename: 'campus/app.js' });

  return {
    title: children['.quiz-titulo'],
    pending,
    select(slug) {
      select.value = quizUrl(slug);
      handlers.change();
    },
  };
}

const lesson = (name) => [{ pregunta: name,
  opciones: ['respuesta correcta', 'distractor'],
  correcta: 0, explicacion: 'Explicación real' }];

async function settle() {
  // Flush Promise chains created in the sandboxed browser and .json() step.
  await new Promise(resolve => setImmediate(resolve));
}

test('switching courses aborts previous requests and ignores stale success', async () => {
  const browser = createBrowser();
  const old = browser.pending.get(quizUrl('alfabetizacion-ia'));
  browser.select('office-sin-miedo');
  assert.equal(old.signal.aborted, true);
  browser.pending.get(quizUrl('office-sin-miedo')).resolve({
    ok: true, json: async () => lesson('Quiz actual'),
  });
  await settle();
  assert.match(browser.title.textContent, /Quiz actual/);
  old.resolve({ ok: true, json: async () => lesson('Quiz antiguo') });
  await settle();
  assert.match(browser.title.textContent, /Quiz actual/);
  assert.doesNotMatch(browser.title.textContent, /Quiz antiguo/);
});

test('stale HTTP errors cannot overwrite a newly loaded course', async () => {
  const browser = createBrowser();
  const old = browser.pending.get(quizUrl('alfabetizacion-ia'));
  browser.select('falsos-amigos-pt-es');
  browser.pending.get(quizUrl('falsos-amigos-pt-es')).resolve({
    ok: true, json: async () => lesson('Puente PT-ES'),
  });
  await settle();
  old.reject(new Error('The obsolete request failed'));
  await settle();
  assert.match(browser.title.textContent, /Puente PT-ES/);
  assert.doesNotMatch(browser.title.textContent, /No se pudo cargar/);
});
