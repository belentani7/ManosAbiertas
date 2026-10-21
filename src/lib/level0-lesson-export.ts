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
