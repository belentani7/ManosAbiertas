import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fromRoot } from './helpers.mjs';

const PUBLIC_COPY_FILES = [
  'src/app/[locale]/(sections)/contactos/page.tsx',
  'src/app/[locale]/(sections)/cursos/page.tsx',
  'src/app/[locale]/(sections)/derechos/page.tsx',
  'src/components/manos-abiertas/command-palette.tsx',
  'src/components/manos-abiertas/community-section.tsx',
  'src/components/manos-abiertas/faq-testimonials.tsx',
  'src/components/manos-abiertas/footer.tsx',
  'src/components/manos-abiertas/home-section.tsx',
  'src/components/manos-abiertas/rights-section.tsx',
  'src/components/seo/static-home-fallback.tsx',
  'src/data/home-content.ts',
];

function readPublicCopy() {
  return PUBLIC_COPY_FILES.map((path) => readFileSync(fromRoot(path), 'utf8')).join('\n');
}

test('public copy does not present the whole catalog as verified', () => {
  const source = readPublicCopy();
  assert.doesNotMatch(source, /(?:3686|RESOURCES\.length)[^\n]{0,50}(?:enlaces|recursos)[^\n]{0,30}verificad/i);
  assert.match(source, /revisión fechada/);
  assert.match(source, /confirma la vigencia/i);
  assert.doesNotMatch(source, /(?:contactos|cursos|artículos|guías)[^\n]{0,40}verificad/i);
});

test('illustrative profiles and editorial topics are disclosed', () => {
  const source = readPublicCopy();
  assert.doesNotMatch(source, /Historias reales/i);
  assert.match(source, /no son testimonios de usuarios/i);
  assert.match(source, /No representan personas ni resultados reales/i);
  assert.match(source, /Ejemplo editorial/);
  assert.match(source, /Sin actividad real/);
});

test('privacy copy reflects local persistence and optional remote AI', () => {
  const source = readPublicCopy();
  assert.doesNotMatch(source, /No recogemos tus datos personales/i);
  assert.doesNotMatch(source, /Cuando cierras la página, los datos se borran/i);
  assert.match(source, /consentimiento explícito/i);
  assert.match(source, /puede persistir/i);
});
