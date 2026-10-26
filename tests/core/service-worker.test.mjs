import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fromRoot } from './helpers.mjs';

test('el service worker es JavaScript válido y no filtra TypeScript al navegador', () => {
  const workerPath = fromRoot('public', 'sw.js');
  const result = spawnSync(process.execPath, ['--check', workerPath], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);

  const source = readFileSync(workerPath, 'utf8');
  assert.match(source, /addEventListener\('install'/);
  assert.match(source, /addEventListener\('activate'/);
  assert.match(source, /addEventListener\('fetch'/);
  assert.match(source, /url\.pathname\.startsWith\('\/api\/'\)/);
  assert.doesNotMatch(source, /\binterface\b/);
});

test('la app registra el worker y mantiene el manifiesto offline', () => {
  const pwa = readFileSync(fromRoot('src', 'components', 'manos-abiertas', 'pwa-status.tsx'), 'utf8');
  assert.match(pwa, /serviceWorker\.register\('\/sw\.js'/);
  assert.match(pwa, /\.catch\(/);
  assert.ok(existsSync(fromRoot('public', 'manifest.json')));
  assert.ok(existsSync(fromRoot('public', 'offline.html')));
});
