import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCvDocx, buildEuropassText } from '../../src/lib/cv-docx-export.ts';

const MODEL = {
  fullName: 'Ana & <Silva>',
  profession: 'Camarera',
  email: 'ana@example.com',
  phone: '+34 600 000 000',
  address: 'Lisboa',
  summary: 'Experiencia en hostelería.',
  experiences: [
    { position: 'Jefa de sala', company: 'Café Central', startDate: '2024', endDate: '2026', description: 'Coordiné un equipo de 5 personas.' },
  ],
  education: [
    { title: 'Secundaria', institution: 'Escola X', year: '2020', description: '' },
  ],
  skills: ['Trabajo en equipo'],
  languages: ['Portugués (nativo)', 'Español (B2)'],
};

test('el .docx generado es un ZIP OOXML válido y con XML escapado', () => {
  const bytes = buildCvDocx(MODEL);
  assert.ok(bytes[0] === 0x50 && bytes[1] === 0x4b, 'firma PK del ZIP');
  const text = new TextDecoder().decode(bytes);
  assert.ok(text.includes('[Content_Types].xml'), 'content types presente');
  assert.ok(text.includes('word/document.xml'), 'documento principal presente');
  assert.ok(text.includes('Ana &amp; &lt;Silva&gt;'), 'texto con XML peligroso escapado');
  assert.ok(text.includes('Coordin'), 'contenido de experiencia incluido');
});

test('el texto Europass contiene todas las secciones y no pierde datos', () => {
  const text = buildEuropassText(MODEL);
  for (const expected of [
    'MODELO EUROPASS', 'INFORMACIÓN PERSONAL', 'Ana & <Silva>',
    'EXPERIENCIA LABORAL', 'Café Central', 'Jefa de sala', '+34 600 000 000',
    'EDUCACIÓN Y FORMACIÓN', 'Escola X', 'IDIOMAS', 'Español (B2)',
    'COMPETENCIAS PERSONALES', 'Trabajo en equipo',
  ]) {
    assert.ok(text.includes(expected), 'falta: ' + expected);
  }
});

test('Europass con CV vacío no rompe y sigue teniendo la estructura mínima', () => {
  const empty = {
    fullName: '', profession: '', email: '', phone: '', address: '', summary: '',
    experiences: [], education: [], skills: [], languages: [],
  };
  const text = buildEuropassText(empty);
  assert.ok(text.includes('INFORMACIÓN PERSONAL'));
  assert.ok(!text.includes('EXPERIENCIA LABORAL'), 'sin experiencia no imprime la sección');
});
