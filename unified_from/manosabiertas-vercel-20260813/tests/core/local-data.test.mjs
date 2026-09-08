import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';
import {
  parseLocalDataBackup,
  getLocalStorageItem,
  readStoredCV,
  readStoredChat,
  readStoredCoverLetter,
  readStringSet,
  restoreLocalData,
} from '../../src/lib/local-data.ts';

test('stored CV keeps bounded typed fields and rejects malformed collections', () => {
  assert.equal(getLocalStorageItem('missing-on-server'), null);
  const cv = readStoredCV(JSON.stringify({
    template: 'classic-europass',
    fullName: 'Ada Lovelace',
    profession: 'Programadora',
    experiences: [
      { id: '1', position: 'Analista', company: 'Babbage', startDate: '1842', endDate: '1843', description: 'Algoritmos' },
      { id: '', position: 'invalid' },
      'invalid',
    ],
    education: [{ id: 'e1', title: 'Matemáticas', institution: 'Casa', year: '1840', description: '' }],
    skills: ['Cálculo', 42, 'Máquinas'],
    languages: ['Inglés'],
    savedAt: '2026-08-13T10:00:00.000Z',
  }));

  assert.equal(cv?.fullName, 'Ada Lovelace');
  assert.equal(cv?.experiences.length, 1);
  assert.equal(cv?.education.length, 1);
  assert.deepEqual(cv?.skills, ['Cálculo', 'Máquinas']);
  assert.equal(readStoredCV('{bad'), null);
  assert.equal(readStoredCV(JSON.stringify({ fullName: 'x'.repeat(501) }))?.fullName, '');
  assert.equal(readStoredCV(JSON.stringify({ skills: Array.from({ length: 31 }, (_, index) => `skill-${index}`) }))?.skills.length, 30);
});

test('cover letters and chat history restore only supported values', () => {
  const letter = readStoredCoverLetter(JSON.stringify({
    fullName: 'Ada',
    profession: 'Programadora',
    tone: 'hostile',
    skills: ['Cálculo', { bad: true }],
    letter: 'Carta',
    savedAt: 'not-a-date',
  }));
  assert.equal(letter?.tone, 'formal');
  assert.deepEqual(letter?.skills, ['Cálculo']);
  assert.equal(letter?.savedAt, '');

  const validChat = [{ id: '1', role: 'user', content: 'Hola', timestamp: 1 }];
  assert.deepEqual(readStoredChat(JSON.stringify(validChat)), validChat);
  assert.deepEqual(readStoredChat(JSON.stringify([{ ...validChat[0], role: 'system' }])), []);
  assert.deepEqual(readStoredChat(JSON.stringify([{ ...validChat[0], content: {} }])), []);
  const longChat = Array.from({ length: 21 }, (_, index) => ({ ...validChat[0], id: String(index), timestamp: index }));
  assert.equal(readStoredChat(JSON.stringify(longChat))[0]?.id, '1');
  assert.deepEqual([...readStringSet('["a","b"]')], ['a', 'b']);
  assert.deepEqual([...readStringSet('{"bad":true}')], []);
});

test('backup parser accepts version 1 app data and enforces structural limits', () => {
  assert.deepEqual(
    parseLocalDataBackup({ version: 1, data: { 'manos-abiertas-chat': '[]', unrelated: 'ignored' } }),
    [['manos-abiertas-chat', '[]']],
  );
  assert.equal(parseLocalDataBackup({ version: 2, data: {} }), null);
  assert.equal(parseLocalDataBackup({ version: 1, data: { unrelated: 'ignored' } }), null);
  assert.equal(parseLocalDataBackup({ version: 1, data: [] }), null);
  assert.equal(parseLocalDataBackup({ version: 1, data: { 'manos-abiertas-chat': 42 } }), null);
  const tooMany = Object.fromEntries(Array.from({ length: 101 }, (_, index) => [`manos-abiertas-${index}`, 'x']));
  assert.equal(parseLocalDataBackup({ version: 1, data: tooMany }), null);
});

test('backup restoration rolls back every key when a write fails', () => {
  const values = new Map([['manos-abiertas-a', 'before']]);
  let failOnce = true;
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      if (key === 'manos-abiertas-b' && failOnce) {
        failOnce = false;
        throw new Error('quota');
      }
      values.set(key, value);
    },
    removeItem: (key) => values.delete(key),
  };

  assert.equal(restoreLocalData(storage, [['manos-abiertas-a', 'after'], ['manos-abiertas-b', 'new']]), 'rolled-back');
  assert.equal(values.get('manos-abiertas-a'), 'before');
  assert.equal(values.has('manos-abiertas-b'), false);

  const blockedStorage = {
    getItem: () => 'before',
    setItem: () => { throw new Error('blocked'); },
    removeItem: () => { throw new Error('blocked'); },
  };
  assert.equal(restoreLocalData(blockedStorage, [['manos-abiertas-a', 'after']]), 'rollback-failed');
});

test('personal-data consumers and ATS retain their validation boundaries', () => {
  const read = (path) => readFileSync(join(PROJECT_ROOT, path), 'utf8');
  const consumers = [
    'src/components/manos-abiertas/ai-assistant.tsx',
    'src/components/manos-abiertas/ats-analyzer.tsx',
    'src/components/manos-abiertas/cover-letter-builder.tsx',
    'src/components/manos-abiertas/cv-section.tsx',
    'src/components/manos-abiertas/local-data-panel.tsx',
    'src/components/manos-abiertas/personal-route.tsx',
    'src/hooks/use-progress.ts',
  ].map(read).join('\n');
  const atsRoute = read('src/app/api/cv/ats/route.ts');
  const gitignore = read('.gitignore');

  assert.doesNotMatch(consumers, /JSON\.parse\(localStorage\.getItem/);
  assert.doesNotMatch(read('src/components/manos-abiertas/ats-analyzer.tsx'), /\bany\b/);
  assert.match(consumers, /readStoredCV/);
  assert.match(consumers, /parseLocalDataBackup/);
  assert.match(atsRoute, /parseATSAnalysisText/);
  assert.match(read('src/components/manos-abiertas/ats-analyzer.tsx'), /normalizeATSAnalysis/);
  assert.match(gitignore, /^\/local-\*$/m);
  assert.doesNotMatch(gitignore, /^local-\*$/m);
});
