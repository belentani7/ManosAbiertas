import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const data = readFileSync(resolve(root, 'src/data/external-courses.ts'), 'utf8');
const ui = readFileSync(resolve(root, 'src/components/manos-abiertas/courses-library-section.tsx'), 'utf8');

test('marketing course is linked to its current Google Skillshop collection', () => {
  assert.match(data, /g\('gc-1', 'Fundamentos de Marketing Digital'.*https:\/\/skillshop\.exceedlms\.com\/student\/collection\/1830727-fundamentos-de-marketing-digital/);
  assert.doesNotMatch(data, /learndigital\.withgoogle\.com\/activate\/course\/digital-marketing/);
});

test('retired Actívate paths never strand learners at the generic Grow homepage', () => {
  assert.match(ui, /const LEGACY_ACTIVATE_COURSE_PREFIX = 'https:\/\/learndigital\.withgoogle\.com\/activate\/course\/'/);
  assert.match(ui, /const ACTIVATE_SKILLSHOP_CATALOG = 'https:\/\/skillshop\.exceedlms\.com\/student\/catalog\/list\?category_ids=7880-google-activate&locale=es'/);
  assert.match(ui, /course\.url\.startsWith\(LEGACY_ACTIVATE_COURSE_PREFIX\)/);
  assert.match(ui, /const courseHref = needsCatalogSearch \? ACTIVATE_SKILLSHOP_CATALOG : course\.url/);
  assert.equal((ui.match(/href=\{courseHref\}/g) ?? []).length, 2);
  assert.match(ui, /Este enlace abre el catálogo, no una inscripción directa/);
  assert.match(ui, /'Buscar en Skillshop'/);
  assert.match(ui, /rel="noopener noreferrer"/);
});
