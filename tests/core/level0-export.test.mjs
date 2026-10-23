import assert from 'node:assert/strict';
import test from 'node:test';
import { buildLevel0LessonText, lessonFilename } from '../../src/lib/level0-lesson-export.ts';

const mockLesson = {
  id: 'lesson-01',
  title: 'Encender un ordenador',
  emoji: '🖥️',
  duration: '15 minutos',
  content: 'Aprende a encender y apagar el equipo.',
  steps: ['Comprueba que está conectado.', 'Pulsa el botón de encendido.'],
  tip: 'No mantengas pulsado el botón innecesariamente.',
  encouragement: 'Puedes repetir la actividad con calma.',
  practice: 'Repite el encendido y el apagado con ayuda.',
};

test('offline lesson includes the actual theory, complete steps and exercise', () => {
  const content = buildLevel0LessonText({ title: 'Mi primer ordenador' }, mockLesson);
  assert.match(content, /Mi primer ordenador/);
  assert.match(content, /Encender un ordenador/);
  assert.match(content, /PASO A PASO\n\n1\. Comprueba/);
  assert.match(content, /2\. Pulsa el botón/);
  assert.match(content, /PRÁCTICA/);
  assert.match(content, /Repite el encendido/);
  assert.match(content, /No incluye datos del estudiante/);
});

test('export works for lessons without optional practice', () => {
  const { practice: _practice, ...withoutPractice } = mockLesson;
  const content = buildLevel0LessonText({ title: 'Prueba' }, withoutPractice);
  assert.doesNotMatch(content, /PRÁCTICA/);
  assert.match(content, /CONTENIDO/);
});

test('file names stay local, deterministic and path-safe', () => {
  assert.equal(lessonFilename('nivel0-ordenador', 'lesson-01'), 'manos-abiertas-nivel0-ordenador-lesson-01.txt');
  assert.doesNotMatch(lessonFilename('../../sensitive', '../secrets'), /[/\\]/);
});
