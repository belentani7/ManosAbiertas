import { describe, expect, test } from 'bun:test';
import { getOfflineTutorReply } from '../src/lib/offline-tutor';

describe('offline tutor', () => {
  test('routes a Spanish CV question to the CV guidance', () => {
    expect(getOfflineTutorReply('Necesito mejorar mi currículum', 'es')).toContain('Adapta el CV');
  });

  test('returns the language fallback outside Spanish', () => {
    expect(getOfflineTutorReply('I need a course', 'en')).toContain('pregunta breve en español');
  });

  test('returns deterministic general guidance for an unknown topic', () => {
    expect(getOfflineTutorReply('algo distinto', 'es')).toContain('siguiente paso de 15 minutos');
  });
});
