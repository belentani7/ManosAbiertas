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
