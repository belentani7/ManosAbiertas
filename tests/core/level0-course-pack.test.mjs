import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLevel0CoursePackHtml, coursePackFilename } from '../../src/lib/level0-lesson-export.ts';
import { LEVEL0_COURSES } from '../../src/data/level0-courses.ts';

test('el pack offline incluye todas las lecciones con índice navegable', () => {
  for (const course of LEVEL0_COURSES) {
    const html = buildLevel0CoursePackHtml(course);
    assert.ok(html.startsWith('<!doctype html>'), course.id + ': doctype');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, course.id + ': un único h1');
    const sections = (html.match(/<section id="leccion-\d+">/g) || []).length;
    assert.equal(sections, course.lessons.length, course.id + ': todas las lecciones');
    for (const lesson of course.lessons) {
      assert.ok(html.includes(escapeHtml(lesson.title)), course.id + ': título de ' + lesson.id);
      assert.ok(html.includes(escapeHtml(lesson.tip)), course.id + ': consejo de ' + lesson.id);
    }
    assert.ok(html.toLowerCase().includes('sin internet'), 'nota offline');
    assert.ok(!html.match(/<script|javascript:/i), course.id + ': sin scripts ejecutables');
  }
});

test('el contenido con caracteres peligrosos queda escapado', () => {
  const course = {
    id: 'test-xss',
    emoji: '🧪',
    title: 'Curso <script>alert(1)</script>',
    description: 'Prueba & comillas "directas"',
    level: 0,
    duration: '1 h',
    targetAge: 'adultos',
    color: '',
    lessons: [
      {
        id: 'l1',
        title: 'Lección <b>negrita</b>',
        duration: '5 min',
        content: 'Texto con <img src=x onerror=alert(1)>',
        steps: ['Paso con & y <'],
        tip: 'Consejo "con comillas"',
        encouragement: 'Ánimo',
        practice: '',
      },
    ],
  };
  const html = buildLevel0CoursePackHtml(course);
  assert.ok(!html.includes('<script>alert'), 'script neutralizado');
  assert.ok(!html.includes('<img src=x'), 'img inyectada neutralizada');
  assert.ok(html.includes('&lt;script&gt;'), 'escape visible');
});

test('coursePackFilename produce nombres seguros', () => {
  assert.match(coursePackFilename('Office sin Miedo!'), /^manos-abiertas-pack-[a-z0-9-]+\.html$/);
  assert.ok(coursePackFilename('').endsWith('.html'));
});

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
