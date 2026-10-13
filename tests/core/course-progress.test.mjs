import assert from 'node:assert/strict';
import test from 'node:test';
import { courseCompletionPercentage, courseProgressKey, emptyCourseProgress, parseCourseProgress } from '../../src/lib/course-progress.ts';
import { isAppLocalDataKey, parseLocalDataBackup } from '../../src/lib/local-data.ts';

test('progress storage survives reloads and rejects another course, corrupt JSON and oversized data', () => {
  const initial = { ...emptyCourseProgress('ai-101'), completedLessons: ['a', 'b', 'a'] };
  const raw = JSON.stringify(initial);
  assert.deepEqual(parseCourseProgress(raw, 'ai-101')?.completedLessons, ['a', 'b']);
  assert.equal(parseCourseProgress(raw, 'other-course'), null);
  assert.equal(parseCourseProgress('{broken', 'ai-101'), null);
  assert.equal(parseCourseProgress(JSON.stringify({ ...initial, completedLessons: null }), 'ai-101'), null);
  assert.equal(parseCourseProgress('x'.repeat(120_001), 'ai-101'), null);
});

test('malformed values are discarded without crashing React consumers', () => {
  const original = { courseId: 'ai-101', completedLessons: ['', 42, 'ok', 'ok', 'x'.repeat(129)], startedAt: {}, lastAccessed: null };
  const cleaned = parseCourseProgress(JSON.stringify(original), 'ai-101');
  assert.deepEqual(cleaned?.completedLessons, ['ok']);
  assert.ok(cleaned?.startedAt && Number.isFinite(Date.parse(cleaned.startedAt)));
});

test('completion is never negative, above 100%, infinite or NaN', () => {
  assert.equal(courseCompletionPercentage(0, 0), 0);
  assert.equal(courseCompletionPercentage(9, 3), 100);
  assert.equal(courseCompletionPercentage(-2, 4), 0);
  assert.equal(courseCompletionPercentage(1, 4), 25);
  assert.equal(courseCompletionPercentage(3, Number.NaN), 0);
});

test("course progress is included in the user backup, restore and erase key scope", () => {
  const key = courseProgressKey('ai-101');
  assert.equal(isAppLocalDataKey(key), true);
  assert.deepEqual(parseLocalDataBackup({ version: 1, data: { [key]: '{"courseId":"ai-101"}' } }), [[key, '{"courseId":"ai-101"}']]);
  assert.equal(isAppLocalDataKey('unrelated-app-progress'), false);
});
