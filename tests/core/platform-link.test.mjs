import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = join(process.cwd(), 'index.html');
const campus = join(process.cwd(), 'campus', 'index.html');

test('public surfaces link back to the unified Belentani platform', () => {
  for (const file of [root, campus]) {
    const html = readFileSync(file, 'utf8');
    assert.match(html, /https:\/\/www\.belentani\.es\//);
    assert.match(html, /Plataforma Belentani/);
  }
});
