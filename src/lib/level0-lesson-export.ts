import type { Level0Course, Level0Lesson } from '@/data/level0-courses';

/** Produce a standalone, fully offline and printable plain-text lesson. */
export function buildLevel0LessonText(
  course: Pick<Level0Course, 'title'>,
  lesson: Level0Lesson,
): string {
  const blocks = [
    'MANOS ABIERTAS · ESCUELA NIVEL 0',
    course.title.trim(),
    lesson.title.trim() + ' · ' + lesson.duration.trim(),
    'CONTENIDO',
    lesson.content.trim(),
    'PASO A PASO',
    lesson.steps.map((step, index) => String(index + 1) + '. ' + step.trim()).join('\n'),
    'CONSEJO',
    lesson.tip.trim(),
    'ÁNIMO',
    lesson.encouragement.trim(),
    ...(lesson.practice?.trim() ? ['PRÁCTICA', lesson.practice.trim()] : []),
    'Material educativo disponible sin cuenta. No incluye datos del estudiante.',
  ];
  return blocks.filter(Boolean).join('\n\n') + '\n';
}

export function lessonFilename(courseId: string, lessonId: string): string {
  const safe = (value: string) => value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 64) || 'curso';
  return 'manos-abiertas-' + safe(courseId) + '-' + safe(lessonId) + '.txt';
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Pack offline de curso completo: un único archivo HTML autónomo (sin red, sin
 * dependencias, imprimible) con índice navegable y todas las lecciones.
 */
export function buildLevel0CoursePackHtml(course: Level0Course): string {
  const lessons = course.lessons
    .map((lesson, index) => {
      const steps = lesson.steps
        .map((step) => `<li>${escapeHtml(step)}</li>`)
        .join('');
      return `<section id="leccion-${index + 1}">
<h2>${index + 1}. ${escapeHtml(lesson.title)} <small>· ${escapeHtml(lesson.duration)}</small></h2>
${lesson.content.split(/\n{2,}/).map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('')}
<h3>Paso a paso</h3><ol>${steps}</ol>
<p class="tip"><strong>Consejo:</strong> ${escapeHtml(lesson.tip)}</p>
<p class="animo"><strong>Ánimo:</strong> ${escapeHtml(lesson.encouragement)}</p>
${lesson.practice?.trim() ? `<h3>Práctica</h3><p>${escapeHtml(lesson.practice)}</p>` : ''}
</section>`;
    })
    .join('\n');

  const index = course.lessons
    .map((lesson, index) => `<li><a href="#leccion-${index + 1}">${escapeHtml(lesson.title)}</a> (${escapeHtml(lesson.duration)})</li>`)
    .join('');

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(course.title)} — pack sin conexión · Manos Abiertas</title>
<style>
:root{color-scheme:light dark}
body{font-family:system-ui,sans-serif;max-width:46rem;margin:0 auto;padding:1.5rem;line-height:1.6}
h1,h2{line-height:1.2}
h2{margin-top:2.5rem;border-bottom:2px solid currentColor;padding-bottom:.3rem}
h2 small{font-weight:400;font-size:.7em;opacity:.8}
nav ol{padding-left:1.2rem}
.tip,.animo{border-left:4px solid #d97706;padding:.6rem .9rem;background:rgba(217,119,6,.08)}
.animo{border-color:#e11d48;background:rgba(225,29,72,.08)}
footer{margin-top:3rem;font-size:.85rem;opacity:.8;border-top:1px solid currentColor;padding-top:1rem}
@media print{a{color:inherit;text-decoration:none}}
</style>
</head>
<body>
<h1>${escapeHtml(course.emoji)} ${escapeHtml(course.title)}</h1>
<p>${escapeHtml(course.description)} · ${course.lessons.length} lecciones · ${escapeHtml(course.duration)}</p>
<nav aria-label="Índice de lecciones"><ol>${index}</ol></nav>
${lessons}
<footer>Material educativo de Manos Abiertas. Este archivo funciona sin internet: guárdalo en tu dispositivo o imprímelo. No incluye datos del estudiante.</footer>
</body>
</html>
`;
}

export function coursePackFilename(courseId: string): string {
  const safe = courseId.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 64) || 'curso';
  return 'manos-abiertas-pack-' + safe + '.html';
}
