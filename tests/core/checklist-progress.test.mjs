import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateChecklistProgress } from '../../src/lib/checklist-progress.ts';

const social = [{id:'as-1'}, {id:'as-2'}, {id:'as-3'}];
const study = [{id:'ve-1'}, {id:'ve-2'}];

test('empty and untouched lists start at zero', () => {
  assert.deepEqual(calculateChecklistProgress([], {}), { done:0, total:0, percent:0 });
  assert.deepEqual(calculateChecklistProgress(social, {}), { done:0, total:3, percent:0 });
});

test('marks in other categories never inflate the visible progress', () => {
  const checks = {'as-1':true, 'as-2':true, 've-1':true, 've-2':true};
  assert.deepEqual(calculateChecklistProgress(social, checks), {done:2, total:3, percent:67});
  assert.deepEqual(calculateChecklistProgress(study, checks), {done:2, total:2, percent:100});
});

test('ignores stale, false and unknown marks and cannot exceed 100%', () => {
  const checks = {'as-1':true, 'as-2':false, 'as-3':true, 'unknown':true, 've-1':true};
  assert.deepEqual(calculateChecklistProgress(social, checks), {done:2, total:3, percent:67});
  assert.deepEqual(calculateChecklistProgress([{id:'as-1'},{id:'as-1'}], checks), {done:1,total:1,percent:100});
});

test('progress updates precisely for both checking and unchecking', () => {
  const checks = {'as-1':true, 'as-2':true};
  assert.equal(calculateChecklistProgress(social, checks).done, 2);
  checks['as-2'] = false;
  assert.equal(calculateChecklistProgress(social, checks).done, 1);
  checks['as-1'] = false;
  assert.equal(calculateChecklistProgress(social, checks).percent, 0);
});
