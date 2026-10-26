import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  PORTAL_COPY,
  PORTAL_GOALS,
  PORTAL_LANGUAGES,
  isPortalGoalId,
  normalizePortalLanguage,
} from '../../src/data/portal.ts';
import {
  parseOnboardingRequest,
  resolveOnboardingPlan,
} from '../../src/lib/onboarding.ts';
import { APP_VERSION } from '../../src/lib/version.ts';

const packageJson = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../package.json', import.meta.url)), 'utf8')
    .replace(/^\uFEFF/, ''),
);

const VALID_SECTIONS = new Set([
  'home', 'learn-ai', 'cv', 'office', 'resources', 'rights',
  'contacts', 'tools', 'events', 'courses', 'community', 'pricing', 'datos',
]);

test('la versión del portal coincide con package.json', () => {
  assert.equal(APP_VERSION, '2.2.2');
  assert.equal(packageJson.version, APP_VERSION);
});

test('el portal ofrece cinco situaciones reales y cuatro idiomas prioritarios', () => {
  assert.equal(PORTAL_GOALS.length, 5);
  assert.equal(new Set(PORTAL_GOALS.map((goal) => goal.id)).size, PORTAL_GOALS.length);
  assert.deepEqual(PORTAL_LANGUAGES.map((language) => language.code), ['es', 'pt', 'en', 'ca']);
  for (const goal of PORTAL_GOALS) {
    assert.equal(goal.steps.length, 3, `${goal.id} debe tener tres pasos`);
    assert.ok(VALID_SECTIONS.has(goal.steps[0].section), `${goal.id} con sección inicial inválida`);
  }
});

test('cada combinación de objetivo e idioma produce un plan de tres pasos sin PII', () => {
  for (const goal of PORTAL_GOALS) {
    for (const language of PORTAL_LANGUAGES) {
      const plan = resolveOnboardingPlan(goal.id, language.code);
      assert.ok(plan, `${goal.id}/${language.code} no debe ser null`);
      assert.equal(plan.version, APP_VERSION);
      assert.equal(plan.language, language.code);
      assert.equal(plan.steps.length, 3);
      assert.equal(plan.goal.id, goal.id);
      assert.ok(plan.journey.id);
      assert.ok(plan.journey.title.length > 0);
      assert.ok(plan.journey.objective.length > 0);
      assert.ok(VALID_SECTIONS.has(plan.entrySection));
      for (const step of plan.steps) {
        assert.ok(VALID_SECTIONS.has(step.section), `${goal.id}/${language.code} con sección inválida`);
        assert.ok(step.title.length > 0);
      }
      const serialized = JSON.stringify(plan);
      for (const privateKey of ['email', 'phone', 'fullName', 'documento', 'nie']) {
        assert.equal(serialized.includes(`"${privateKey}"`), false, `${goal.id}/${language.code} filtra ${privateKey}`);
      }
    }
  }
});

test('las cuatro lenguas tienen copy completo y diferenciado', () => {
  for (const language of PORTAL_LANGUAGES) {
    const copy = PORTAL_COPY[language.code];
    assert.ok(copy.hero.title.length > 0);
    assert.ok(copy.hero.accent.length > 0);
    assert.ok(copy.menu.title.length > 0);
    assert.ok(copy.plan.enter.length > 0);
    for (const step of copy.method.steps) {
      assert.ok(step.title.length > 0 && step.body.length > 0 && step.proof.length > 0);
    }
  }
  const spanish = resolveOnboardingPlan('work', 'es');
  const portuguese = resolveOnboardingPlan('work', 'pt');
  const english = resolveOnboardingPlan('work', 'en');
  const catalan = resolveOnboardingPlan('work', 'ca');
  assert.notEqual(spanish.journey.title, english.journey.title);
  assert.notEqual(spanish.journey.title, portuguese.journey.title);
  assert.notEqual(spanish.journey.title, catalan.journey.title);
});

test('normalización de idioma y validación del contrato de API', () => {
  assert.equal(normalizePortalLanguage('pt-BR'), 'pt');
  assert.equal(normalizePortalLanguage('pt'), 'pt');
  assert.equal(normalizePortalLanguage('ca-ES'), 'ca');
  assert.equal(normalizePortalLanguage('en-US'), 'en');
  assert.equal(normalizePortalLanguage('zh'), 'es');
  assert.equal(normalizePortalLanguage(null), 'es');
  assert.equal(isPortalGoalId('work'), true);
  assert.equal(isPortalGoalId('inventado'), false);

  assert.deepEqual(parseOnboardingRequest({ goal: 'work', language: 'pt-BR' }), {
    goal: 'work',
    language: 'pt',
  });
  assert.deepEqual(parseOnboardingRequest({ goal: 'papers' }), {
    goal: 'papers',
    language: 'es',
  });
  assert.equal(parseOnboardingRequest(null), null);
  assert.equal(parseOnboardingRequest([]), null);
  assert.equal(parseOnboardingRequest({ goal: 'inventado' }), null);
  assert.equal(parseOnboardingRequest({ goal: 'work', language: 42 }), null);
  assert.equal(resolveOnboardingPlan('inventado', 'es'), null);
});

test('la API de onboarding está registrada en middleware e índice público', () => {
  const middleware = readFileSync(fileURLToPath(new URL('../../middleware.ts', import.meta.url)), 'utf8');
  assert.match(middleware, /'\/api\/onboarding'/);
  const apiIndex = readFileSync(fileURLToPath(new URL('../../src/app/api/route.ts', import.meta.url)), 'utf8');
  assert.match(apiIndex, /\/api\/onboarding/);
});
