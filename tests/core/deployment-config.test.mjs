import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';

test('Vercel uses managed Next.js output while self-hosting keeps standalone output', () => {
  const config = readFileSync(join(PROJECT_ROOT, 'next.config.ts'), 'utf8');

  assert.match(config, /process\.env\.VERCEL === ["']1["']/);
  assert.match(config, /process\.env\.NEXT_OUTPUT_MODE === ["']netlify["']/);
  assert.match(config, /: ["']standalone["']/);
});
