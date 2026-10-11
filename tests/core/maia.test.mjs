import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { extname } from 'node:path';
import { fileURLToPath } from 'node:url';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL?.endsWith('.ts') && specifier.startsWith('.') && !extname(specifier)) {
      const candidate = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context);
    }
    return nextResolve(specifier, context);
  },
});

const {
  MAIA_BUDGET_STORAGE_KEY, MAIA_DAILY_AI_BUDGET,
  canUseMaiaAI, composeResourceAnswer, consumeMaiaAI, maiaBudgetRemaining,
  maiaSourcesFromPayload, maiaSourcesPromptBlock, maiaTrustLabel,
  readMaiaBudget, searchVerifiedResources, writeMaiaBudget,
} = await import('../../src/lib/maia.ts');
const { RESOURCES } = await import('../../src/data/resources.ts');

const CATALOG_URLS = new Set(RESOURCES.map((r) => r.url));

function fakeStore(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, v),
  };
}

test('búsqueda determinista: resultados solo del catálogo verificable, nunca URLs inventadas', () => {
  const sources = searchVerifiedResources('necesito ayuda con el empadronamiento en Barcelona', { limit: 5 });
  for (const s of sources) {
    assert.ok(CATALOG_URLS.has(s.url), `URL fuera del catálogo: ${s.url}`);
    assert.ok(s.title.length > 0);
    assert.ok(['OFFICIAL SOURCE', 'REVIEWED COMMUNITY RESOURCE', 'VERIFICATION REQUIRED'].includes(s.label));
  }
  assert.ok(sources.length <= 5);
});

test('búsqueda sensible a acentos y en las lenguas prioritarias', () => {
  const withAccent = searchVerifiedResources('trámites de residencia', { limit: 5 });
  const withoutAccent = searchVerifiedResources('tramites de residencia', { limit: 5 });
  assert.ok(withAccent.length > 0, 'debe encontrar recursos para trámites');
  assert.equal(withAccent[0]?.id, withoutAccent[0]?.id, 'la búsqueda debe ser insensible a acentos');
  assert.ok(searchVerifiedResources('preciso de ajuda com o meu currículo', { limit: 5 }).length > 0, 'consulta en portugués');
  assert.ok(searchVerifiedResources('necessito ajuda amb el meu currículum', { limit: 5 }).length > 0, 'consulta en catalán');
});

test('etiquetas de confianza coherentes con el ciclo de vida de recursos', () => {
  const verified = RESOURCES.find((r) => maiaTrustLabel(r) !== 'VERIFICATION REQUIRED');
  const pending = RESOURCES.find((r) => maiaTrustLabel(r) === 'VERIFICATION REQUIRED');
  assert.ok(verified, 'el catálogo debe contener recursos verificados');
  assert.ok(pending, 'el catálogo contiene recursos pendientes y deben etiquetarse como tales');
  assert.ok(['OFFICIAL SOURCE', 'REVIEWED COMMUNITY RESOURCE'].includes(maiaTrustLabel(verified)));
});

test('composeResourceAnswer cita fuentes con etiqueta y funciona en 4 idiomas', () => {
  const sources = searchVerifiedResources('sanidad healthcare', { limit: 3 });
  for (const lang of ['es', 'pt', 'en', 'ca']) {
    const text = composeResourceAnswer(sources, lang);
    assert.ok(text.length > 0);
    if (sources.length > 0) {
      assert.ok(text.includes(sources[0].url), 'la respuesta debe citar la URL de la fuente');
      assert.ok(text.includes(sources[0].label), 'la respuesta debe mostrar la etiqueta de confianza');
    }
  }
  assert.ok(composeResourceAnswer([], 'es').length > 0, 'estado vacío con mensaje claro');
});

test('maiaSourcesPromptBlock instruye al modelo a citar y no inventar', () => {
  const sources = searchVerifiedResources('vivienda alquiler ayuda', { limit: 3 });
  const block = maiaSourcesPromptBlock(sources);
  assert.ok(block.includes('no inventes URLs'));
  assert.ok(block.includes('FUENTES VERIFICADAS'));
  assert.equal(maiaSourcesPromptBlock([]), '');
});

test('maiaSourcesFromPayload rechaza datos manipulados de la red', () => {
  const good = searchVerifiedResources('empleo', { limit: 1 })[0];
  const payload = [
    good,
    { ...good, url: 'https://evil.example.com/phishing' },
    { ...good, label: 'OFFICIAL SOURCE!!!' },
    { id: 123, title: 'x', url: good.url, label: 'OFFICIAL SOURCE' },
    null,
    'string',
  ];
  const parsed = maiaSourcesFromPayload(payload);
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].id, good.id);
  assert.deepEqual(maiaSourcesFromPayload('nope'), []);
  assert.deepEqual(maiaSourcesFromPayload(undefined), []);
});

test('presupuesto diario: 30 consultas IA/día, reinicio diario y sin números negativos', () => {
  const now = new Date('2026-10-11T10:00:00Z');
  const store = fakeStore();
  let state = readMaiaBudget(store, now);
  assert.equal(state.used, 0);
  assert.equal(maiaBudgetRemaining(state), MAIA_DAILY_AI_BUDGET);
  assert.equal(canUseMaiaAI(state), true);

  for (let i = 0; i < MAIA_DAILY_AI_BUDGET; i++) {
    assert.equal(canUseMaiaAI(state), true, `la consulta ${i + 1} debe estar permitida`);
    state = consumeMaiaAI(state, now);
    writeMaiaBudget(store, state);
  }
  assert.equal(canUseMaiaAI(state), false, 'agotado el presupuesto, sin IA');
  assert.equal(maiaBudgetRemaining(state), 0);
  state = consumeMaiaAI(state, now);
  assert.equal(maiaBudgetRemaining(state), 0, 'el saldo nunca queda negativo');

  // Nuevo día: el presupuesto se reinicia solo.
  const tomorrow = new Date('2026-10-12T09:00:00Z');
  const fresh = readMaiaBudget(store, tomorrow);
  assert.equal(fresh.used, 0);
  assert.equal(canUseMaiaAI(fresh), true);
});

test('presupuesto: datos corruptos o sin almacenamiento no rompen el flujo', () => {
  const now = new Date('2026-10-11T10:00:00Z');
  assert.equal(readMaiaBudget(null, now).used, 0);
  const corrupt = fakeStore({ [MAIA_BUDGET_STORAGE_KEY]: 'not-json' });
  assert.equal(readMaiaBudget(corrupt, now).used, 0);
  const badShape = fakeStore({ [MAIA_BUDGET_STORAGE_KEY]: JSON.stringify({ date: 5, used: -3 }) });
  assert.equal(readMaiaBudget(badShape, now).used, 0);
  const readonly = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); } };
  assert.equal(readMaiaBudget(readonly, now).used, 0);
  assert.doesNotThrow(() => writeMaiaBudget(readonly, { date: 'x', used: 1 }));
});
