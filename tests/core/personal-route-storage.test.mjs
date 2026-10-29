import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  PERSONAL_ROUTE_STORAGE_KEY,
  persistPersonalRoute,
} from '../../src/lib/personal-route-storage.ts';
import { parseSavedRoute } from '../../src/data/journeys.ts';

function fakeStorage() {
  const data = new Map();
  return {
    getItem(key) { return data.get(key) ?? null; },
    setItem(key, value) { data.set(key, value); },
    removeItem(key) { data.delete(key); },
  };
}

test('a learner can change goals without restoring the abandoned goal on reload', () => {
  const storage = fakeStorage();
  const firstRoute = { goal: 'primer-cv', completed: ['cv-plantilla'] };
  assert.equal(persistPersonalRoute(firstRoute, () => storage), true);
  assert.equal(parseSavedRoute(storage.getItem(PERSONAL_ROUTE_STORAGE_KEY))?.goal, 'primer-cv');

  // "Cambiar meta" removes the previous saved choice as well as React state.
  assert.equal(persistPersonalRoute(null, () => storage), true);
  assert.equal(storage.getItem(PERSONAL_ROUTE_STORAGE_KEY), null);
  assert.equal(parseSavedRoute(storage.getItem(PERSONAL_ROUTE_STORAGE_KEY)), null);

  const nextRoute = { goal: 'primeras-24h', completed: [] };
  assert.equal(persistPersonalRoute(nextRoute, () => storage), true);
  assert.equal(parseSavedRoute(storage.getItem(PERSONAL_ROUTE_STORAGE_KEY))?.goal, nextRoute.goal);
});

test('privacy settings and storage quota errors never crash the learning interface', () => {
  const route = { goal: 'primer-cv', completed: [] };
  assert.equal(persistPersonalRoute(route, () => { throw new Error('SecurityError'); }), false);
  assert.equal(persistPersonalRoute(route, () => ({
    setItem() { throw new Error('QuotaExceededError'); },
    removeItem() { throw new Error('SecurityError'); },
  })), false);
  assert.equal(persistPersonalRoute(null, () => ({
    setItem() { throw new Error('SecurityError'); },
    removeItem() { throw new Error('SecurityError'); },
  })), false);
});

test('the UI wires goal clearing and external Continuar to real actions', () => {
  const source = readFileSync(fileURLToPath(
    new URL('../../src/components/manos-abiertas/personal-route.tsx', import.meta.url),
  ), 'utf8');
  assert.match(source, /persistPersonalRoute\(null, \(\) => window\.localStorage\)/);
  assert.match(source, /persistPersonalRoute\(route, \(\) => window\.localStorage\)/);
  assert.match(source, /href=\{next\.href\} target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(source, /next\.section && setActiveSection\(next\.section\)/);
});
