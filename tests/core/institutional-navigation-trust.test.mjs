import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = (path) => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');

test('global Next.js layout has no fixed glossary overlay covering small screens', () => {
  const layout = read('src/app/layout.tsx');
  assert.doesNotMatch(layout, /📖 Conceptos de Manos Abiertas/);
  assert.doesNotMatch(layout, /zIndex:\s*9999/);
});

test('footer points to the canonical repository and exposes the glossary as an accessible link', () => {
  const footer = read('src/components/manos-abiertas/footer.tsx');
  assert.match(footer, /https:\/\/github\.com\/belentani7\/ManosAbiertas/);
  assert.doesNotMatch(footer, /github\.com\/belentani7\/manosabiertas-vercel/);
  assert.match(footer, /href="\/conceptos\/index\.html"/);
  assert.match(footer, /min-h-11/);
  assert.ok(existsSync(new URL('../../public/conceptos/index.html', import.meta.url)));
});

test('course directory keeps glossary available with language-appropriate text', () => {
  const courses = read('src/app/[locale]/(sections)/cursos/page.tsx');
  assert.match(courses, /href="\/conceptos\/index\.html"/);
  for (const text of ['Consultar conceptos básicos', 'Consultar conceitos básicos', 'Consulta conceptes bàsics', 'Explore key concepts'])
    assert.ok(courses.includes(text));
});
