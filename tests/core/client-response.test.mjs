import assert from 'node:assert/strict';
import test from 'node:test';
import {
  communityFeedFromPayload,
  communityPostsFromPayload,
  healthFromPayload,
  publishedCommunityPostFromPayload,
  studyQuestionsFromPayload,
} from '../../src/lib/client-response.ts';

const post = { id: 'abc', title: 'Una pregunta válida', category: 'tips', replies: 0, createdAt: '2026-08-13T10:00:00.000Z' };

test('study questions accept bounded JSON and safe plain-text fallback', () => {
  assert.deepEqual(
    studyQuestionsFromPayload({ text: JSON.stringify({ questions: [{ question: '¿Qué aprendiste?', hint: 'Repasa el texto.' }] }) }),
    [{ question: '¿Qué aprendiste?', hint: 'Repasa el texto.' }],
  );
  assert.deepEqual(studyQuestionsFromPayload({ text: '1. Primera\n2. Segunda' }), [
    { question: 'Primera', hint: '' },
    { question: 'Segunda', hint: '' },
  ]);
  assert.equal(studyQuestionsFromPayload({ text: { bad: true } }), null);
});

test('community response contracts reject partial or excessive shared data', () => {
  assert.deepEqual(communityPostsFromPayload({ ok: true, mode: 'shared', posts: [post] }), [post]);
  assert.equal(communityPostsFromPayload({ ok: true, mode: 'shared', posts: [{ ...post, category: 'admin' }] }), null);
  assert.equal(communityPostsFromPayload({ ok: true, mode: 'shared', posts: Array(101).fill(post) }), null);
  assert.deepEqual(publishedCommunityPostFromPayload({ ok: true, mode: 'shared', published: true, post }), post);
  assert.equal(publishedCommunityPostFromPayload({ ok: true, mode: 'shared', published: false, post }), null);
  assert.deepEqual(
    communityFeedFromPayload({ ok: true, mode: 'shared', posts: [post] }),
    { mode: 'shared', posts: [post] },
  );
  assert.deepEqual(
    communityFeedFromPayload({ ok: true, mode: 'local', degraded: true, posts: [] }),
    { mode: 'local', posts: [] },
  );
  assert.equal(communityFeedFromPayload({ ok: true, mode: 'local', degraded: false, posts: [] }), null);
});

test('health response requires a bounded provider and capability list', () => {
  assert.deepEqual(healthFromPayload({ ok: true, provider: 'local', capabilities: ['pwa'] }), { ok: true, provider: 'local', capabilities: ['pwa'] });
  assert.equal(healthFromPayload({ ok: 'yes', provider: 'local', capabilities: [] }), null);
  assert.equal(healthFromPayload({ ok: true, provider: {}, capabilities: [] }), null);
  assert.equal(healthFromPayload({ ok: true, provider: 'local', capabilities: Array(51).fill('x') }), null);
});
