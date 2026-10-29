import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '../../src/components/manos-abiertas/courses-library-section.tsx'),
  'utf8',
);

test('external course claims are qualified and linked to the provider', () => {
  assert.match(source, /La disponibilidad, el coste, la duración y la emisión de certificados dependen de cada proveedor/);
  assert.match(source, /Comprueba siempre las condiciones vigentes en la web de origen/);
  assert.match(source, /Certificado indicado/);
  assert.match(source, /Indicados con certificado/);
  assert.match(source, /Consultar en el proveedor/);
  assert.doesNotMatch(source, /Acceder gratis|135 cursos en total|Más la academia premium/);
  assert.match(source, /target="_blank"[\s\S]*?rel="noopener noreferrer"/);
});

test('Google Actívate listings resolve to current official Skillshop courses instead of generic legacy redirects', () => {
  const dataset = readFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), '../../src/data/external-courses.ts'),
    'utf8',
  );
  const googleEntries = [...dataset.matchAll(/^\s+g\('gc-\d+',.+$/gm)].map(match => match[0]);
  assert.equal(googleEntries.length, 15, 'The migration must account for every Google Actívate card');
  assert.ok(googleEntries.every(row => row.includes('https://skillshop.exceedlms.com/student/collection/')));
  assert.ok(googleEntries.every(row => !row.includes('learndigital.withgoogle.com/')));
  assert.match(dataset, /const g = [\s\S]*?certification: false, free: true/);
  assert.match(dataset, /student\/collection\/1830727-fundamentos-de-marketing-digital/);
  assert.match(dataset, /student\/collection\/1435583-domina-la-ia-con-gemini/);
  assert.match(dataset, /student\/collection\/786255-cloud-computing/);
  assert.match(dataset, /student\/collection\/787525-ecommerce/);
  assert.doesNotMatch(dataset, /https:\/\/learndigital\.withgoogle\.com\/activate\/course\//);
});
