import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';
import {
  buildPrintableTextHtml,
  escapeHtml,
  isBoundedStringArray,
  isIsoDate,
  parseStoredJson,
  readApiText,
  safeDownloadFilename,
  safeHttpUrl,
} from '../../src/lib/safe-content.ts';

test('HTML escaping and printable documents keep user text inert', () => {
  assert.equal(escapeHtml(`<script>alert("x")</script> & 'x'`), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;x&#39;');
  const html = buildPrintableTextHtml('</title><script>alert(1)</script>', '<img src=x onerror=alert(1)>');
  assert.doesNotMatch(html, /<script>|<img/i);
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
});

test('download names and external links reject unsafe values', () => {
  assert.equal(safeDownloadFilename('../../ Mi plantilla: 2026?.txt'), 'Mi-plantilla-2026-.txt');
  assert.equal(safeHttpUrl('javascript:alert(1)'), null);
  assert.equal(safeHttpUrl('https://user:pass@example.com/'), null);
  assert.equal(safeHttpUrl('https://example.com/a'), 'https://example.com/a');
});

test('stored JSON requires bounded size and the expected shape', () => {
  assert.deepEqual(parseStoredJson('["a","b"]', [], isBoundedStringArray), ['a', 'b']);
  assert.deepEqual(parseStoredJson('{"unexpected":true}', [], isBoundedStringArray), []);
  assert.deepEqual(parseStoredJson('not-json', [], isBoundedStringArray), []);
  assert.deepEqual(parseStoredJson('["a"]', [], isBoundedStringArray, 2), []);
  assert.equal(isBoundedStringArray(Array.from({ length: 1_001 }, () => 'x')), false);
  assert.equal(isIsoDate('2026-02-28'), true);
  assert.equal(isIsoDate('2026-02-30'), false);
  assert.equal(readApiText({ text: ' respuesta ' }, 20), 'respuesta');
  assert.equal(readApiText({ text: { unsafe: true } }, 20), null);
  assert.equal(readApiText({ text: 'demasiado largo' }, 5), null);
});

test('print, export and local-state consumers retain the safe-content boundary', () => {
  const read = (path) => readFileSync(join(PROJECT_ROOT, path), 'utf8');
  const templates = read('src/components/manos-abiertas/document-templates.tsx');
  const resources = read('src/components/manos-abiertas/resources-section.tsx');
  const localConsumers = [
    'src/components/manos-abiertas/accessibility-panel.tsx',
    'src/components/manos-abiertas/community-section.tsx',
    'src/components/manos-abiertas/courses-library-section.tsx',
    'src/components/manos-abiertas/document-checklist.tsx',
    'src/components/manos-abiertas/learn-ai-section.tsx',
    'src/components/manos-abiertas/level0-academy.tsx',
    'src/components/manos-abiertas/office-section.tsx',
    'src/components/manos-abiertas/resource-submission-form.tsx',
    'src/components/manos-abiertas/smart-reminders.tsx',
    'src/components/manos-abiertas/tools-section.tsx',
    'src/hooks/use-recent-items.ts',
  ].map(read).join('\n');

  assert.match(templates, /buildPrintableTextHtml/);
  assert.doesNotMatch(templates, /editedContent\.replace\([^)]*<br>/);
  assert.match(resources, /escapeHtml\(r\.title\)/);
  assert.match(resources, /Content-Security-Policy/);
  assert.doesNotMatch(localConsumers, /JSON\.parse\(localStorage\.getItem/);
  assert.match(localConsumers, /parseStoredJson/);
});
