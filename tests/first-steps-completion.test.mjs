import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/components/manos-abiertas/first-steps.tsx', import.meta.url), 'utf8');

test('the introductory route has at most three actionable, completable steps', () => {
  const steps = source.split('const STEPS: Step[] = [')[1].split('\n];')[0];
  assert.ok((steps.match(/id: 'step-/g) ?? []).length <= 3);
  assert.doesNotMatch(steps, /check:\s*\(\)\s*=>\s*false/);
});

test('completed introduction hides when every displayed step is done', () => {
  assert.match(source, /completedCount\s*>=\s*STEPS\.length/);
});
