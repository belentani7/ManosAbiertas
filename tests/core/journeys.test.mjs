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
  JOURNEYS, JOURNEY_IDS, LEGACY_ROUTE_MAP,
  getJourney, isActivityId, parseSavedRoute, pickPair, pickText, serializeSavedRoute,
} = await import('../../src/data/journeys.ts');

const VALID_SECTIONS = new Set([
  'home', 'learn-ai', 'cv', 'office', 'resources', 'rights',
  'contacts', 'tools', 'events', 'courses', 'community', 'pricing', 'datos',
]);

test('catálogo de itinerarios: ids únicos y al menos 3 actividades reales por itinerario', () => {
  assert.ok(JOURNEYS.length >= 10, 'el motor debe ofrecer los 10 itinerarios recomendados');
  assert.equal(new Set(JOURNEY_IDS).size, JOURNEYS.length, 'ids de itinerario duplicados');
  for (const journey of JOURNEYS) {
    assert.ok(journey.activities.length >= 3, `${journey.id} necesita >= 3 actividades`);
    assert.equal(new Set(journey.activities.map((a) => a.id)).size, journey.activities.length, `${journey.id} con actividades duplicadas`);
  }
});

test('todo itinerario tiene objetivo, prerrequisitos, esfuerzo y resultado en PT>ES>EN>CA', () => {
  for (const journey of JOURNEYS) {
    for (const field of ['title', 'objective', 'prerequisites', 'effort', 'outcome']) {
      const text = journey[field];
      for (const lang of ['es', 'pt', 'en', 'ca']) {
        assert.ok(text[lang] && text[lang].trim().length > 0, `${journey.id}.${field}.${lang} vacío`);
      }
    }
  }
});

test('cada actividad apunta a funcionalidad real (sección válida o enlace https)', () => {
  for (const journey of JOURNEYS) {
    for (const activity of journey.activities) {
      assert.ok(activity.title.es && activity.title.en, `${activity.id} sin título es/en`);
      assert.ok(activity.description.es && activity.description.en, `${activity.id} sin descripción es/en`);
      const hasSection = activity.section && VALID_SECTIONS.has(activity.section);
      const hasHref = typeof activity.href === 'string' && /^https:\/\//.test(activity.href);
      assert.ok(hasSection || hasHref, `${activity.id} sin sección válida ni enlace https`);
      for (const ref of activity.verifiedRefs ?? []) {
        assert.match(ref.url, /^https:\/\//, `${activity.id} con referencia no https`);
        assert.ok(ref.label.trim().length > 0);
      }
    }
  }
});

test('pickText prioriza el idioma del usuario con fallback a español', () => {
  const sample = JOURNEYS[0].title;
  assert.equal(pickText(sample, 'pt-BR'), sample.pt);
  assert.equal(pickText(sample, 'pt'), sample.pt);
  assert.equal(pickText(sample, 'ca'), sample.ca);
  assert.equal(pickText(sample, 'en'), sample.en);
  assert.equal(pickText(sample, 'es'), sample.es);
  assert.equal(pickText(sample, 'zh'), sample.es);
  assert.equal(pickPair({ es: 'hola', en: 'hi' }, 'en'), 'hi');
  assert.equal(pickPair({ es: 'hola', en: 'hi' }, 'fr'), 'hola');
});

test('parseSavedRoute preserva el progreso del formato legado (4 metas, 12 pasos)', () => {
  for (const [legacyGoal, mapping] of Object.entries(LEGACY_ROUTE_MAP)) {
    assert.ok(getJourney(mapping.journey), `la meta legada ${legacyGoal} debe migrar a un itinerario real`);
    const legacySteps = Object.keys(mapping.steps);
    const raw = JSON.stringify({ goal: legacyGoal, completed: legacySteps });
    const parsed = parseSavedRoute(raw);
    assert.ok(parsed, `no se pudo migrar ${legacyGoal}`);
    assert.equal(parsed.goal, mapping.journey);
    assert.equal(parsed.completed.length, legacySteps.length, `progreso perdido al migrar ${legacyGoal}`);
    for (const id of parsed.completed) assert.ok(isActivityId(parsed.goal, id));
  }
});

test('parseSavedRoute acepta el formato actual y rechaza datos corruptos', () => {
  const current = { goal: 'primer-cv', completed: ['cv-plantilla', 'actividad-inexistente', 'cv-ats'] };
  const parsed = parseSavedRoute(serializeSavedRoute(current));
  assert.ok(parsed);
  assert.equal(parsed.goal, 'primer-cv');
  assert.deepEqual(parsed.completed, ['cv-plantilla', 'cv-ats'], 'las actividades inválidas se descartan sin romper');

  assert.equal(parseSavedRoute(null), null);
  assert.equal(parseSavedRoute('no-json'), null);
  assert.equal(parseSavedRoute('{"goal":"no-existe","completed":[]}'), null);
  assert.equal(parseSavedRoute('{"goal":"primer-cv"}'), null);
  assert.equal(parseSavedRoute('[1,2,3]'), null);
});
