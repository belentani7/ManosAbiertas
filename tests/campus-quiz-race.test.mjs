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
    feedback: children['.feedback'],
    score: children['.marcador'],
    answer(index) { children['.opciones'].children[index].handlers.click(); },
    advance() { children['.quiz-siguiente'].onclick(); },
    pending,
    choices: children['.opciones'],
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

test('wrong answers expose correct response and cannot be rescored with another choice',async()=>{
  const browser=createBrowser();
  browser.pending.get(quizUrl('alfabetizacion-ia')).resolve({
    ok:true, json:async()=>lesson('Situación de clase'),
  });
  await settle();
  browser.advance(); // Hidden Next cannot skip the question before answering.
  assert.match(browser.title.textContent, /Situación de clase/);
  browser.answer(1);
  assert.match(browser.feedback.textContent,/Incorrecto\. Respuesta correcta: respuesta correcta/);
  assert.match(browser.score.textContent,/Aciertos: 0/);
  browser.answer(0); // Programmatic stale click; disabled DOM is not enough.
  assert.match(browser.score.textContent,/Aciertos: 0/);
  browser.advance();
  assert.match(browser.title.textContent,/Práctica finalizada: 0\/1/);
});



test('completed practice keeps actionable explanations for every missed question', async () => {
  const browser=createBrowser();
  browser.pending.get(quizUrl('alfabetizacion-ia')).resolve({ok:true,json:async()=>lesson('Identificar fraude')});
  await settle();
  browser.answer(1); browser.advance();
  assert.match(browser.feedback.textContent,/Identificar fraude/);
  assert.match(browser.feedback.textContent,/respuesta correcta/);
  assert.match(browser.feedback.textContent,/Explicación real/);
  browser.advance();
  assert.match(browser.title.textContent,/1\/1/);
  assert.doesNotMatch(browser.feedback.textContent,/Identificar fraude/);
});

test('a detached answer from the prior question cannot answer the next one', async()=>{
  const browser=createBrowser();
  browser.pending.get(quizUrl('alfabetizacion-ia')).resolve({ok:true,json:async()=>[...lesson('Primera'),...lesson('Segunda')]});
  await settle();
  const old=browser.choices.children[0];browser.answer(0);browser.advance();old.handlers.click();
  assert.equal(browser.score.textContent,'Aciertos: 1');
  assert.equal(browser.feedback.textContent,'');
});
