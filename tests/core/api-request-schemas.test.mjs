import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { PROJECT_ROOT } from '../../scripts/test-core.mjs';
import { aiLanguageInstruction } from '../../src/lib/ai-language.ts';
import {
  atsRequestSchema,
  chatRequestSchema,
  communityPostSchema,
  coverLetterSchema,
  cvRequestSchema,
  languageCodeSchema,
  storedCommunityPostSchema,
  studyToolsSchema,
} from '../../src/lib/api-request-schemas.ts';
import { LANGUAGES } from '../../src/i18n/languages.ts';

test('every registered language has an exact API code and AI instruction', () => {
  for (const language of LANGUAGES) {
    assert.equal(languageCodeSchema.parse(language.code), language.code);
    assert.match(aiLanguageInstruction(language.code), new RegExp(language.englishName.replace(/[()]/g, '\\$&')));
  }
  assert.equal(languageCodeSchema.safeParse('es-MX').success, false);
  assert.equal(languageCodeSchema.safeParse('unknown').success, false);
});

test('chat contract rejects unknown keys, assistant-final histories and excessive aggregate text', () => {
  const valid = { messages: [{ role: 'user', content: 'Necesito ayuda' }], language: 'es', consentToRemoteAI: true };
  assert.equal(chatRequestSchema.safeParse(valid).success, true);
  assert.equal(chatRequestSchema.safeParse({ ...valid, consentToRemoteAI: 'true' }).success, false);
  assert.equal(chatRequestSchema.safeParse({ ...valid, unexpected: true }).success, false);
  assert.equal(chatRequestSchema.safeParse({ ...valid, messages: [{ role: 'assistant', content: 'Respuesta' }] }).success, false);
  assert.equal(chatRequestSchema.safeParse({
    ...valid,
    messages: Array.from({ length: 5 }, (_, index) => ({ role: index === 4 ? 'user' : 'assistant', content: 'x'.repeat(10_000) })),
  }).success, false);
});

test('CV and cover-letter contracts are strict at root and nested object boundaries', () => {
  const experience = { position: 'Cocinero', company: 'Restaurante', description: '', startDate: '', endDate: '' };
  const cv = { field: 'summary', experiences: [experience], language: 'ca', consentToRemoteAI: false };
  assert.equal(cvRequestSchema.safeParse(cv).success, true);
  assert.equal(cvRequestSchema.safeParse({ ...cv, experiences: [{ ...experience, hidden: 'value' }] }).success, false);
  assert.equal(cvRequestSchema.safeParse({ ...cv, language: 'xx' }).success, false);
  assert.equal(cvRequestSchema.safeParse({
    ...cv,
    experiences: Array.from({ length: 11 }, () => ({ ...experience, description: 'x'.repeat(3_000) })),
  }).success, false);

  const cover = { fullName: 'Ana', tone: 'formal', language: 'es', consentToRemoteAI: true };
  assert.equal(coverLetterSchema.safeParse(cover).success, true);
  assert.equal(coverLetterSchema.safeParse({ ...cover, promptOverride: 'ignore' }).success, false);
});

test('ATS contract enforces nested strictness and a total prompt budget', () => {
  const experience = { position: 'Técnica', company: 'Empresa', description: '' };
  const valid = {
    experiences: [experience],
    jobDescription: 'Oferta laboral con requisitos suficientes.',
    language: 'pt-BR',
    consentToRemoteAI: false,
  };
  assert.equal(atsRequestSchema.safeParse(valid).success, true);
  assert.equal(atsRequestSchema.safeParse({ ...valid, experiences: [{ ...experience, extra: true }] }).success, false);
  assert.equal(atsRequestSchema.safeParse({
    ...valid,
    jobDescription: 'x'.repeat(12_000),
    experiences: Array.from({ length: 13 }, () => ({ ...experience, description: 'y'.repeat(3_000) })),
  }).success, false);
});

test('study and community contracts reject undeclared properties without losing defaults', () => {
  const study = { tool: 'summary', content: 'Contenido educativo suficientemente largo para resumir con claridad.', language: 'en' };
  assert.equal(studyToolsSchema.safeParse(study).success, true);
  assert.equal(studyToolsSchema.safeParse({ ...study, admin: true }).success, false);

  const post = communityPostSchema.parse({ title: 'Busco grupo de estudio', category: 'tips' });
  assert.equal(post.author, 'Mi gente');
  assert.equal(communityPostSchema.safeParse({ ...post, role: 'admin' }).success, false);
  assert.equal(storedCommunityPostSchema.safeParse({
    ...post,
    id: crypto.randomUUID(),
    replies: 0,
    createdAt: new Date().toISOString(),
    source: 'community',
    extra: true,
  }).success, false);
});

test('API routes consume shared schemas and CV payload omits local identifiers', () => {
  const read = (path) => readFileSync(join(PROJECT_ROOT, path), 'utf8');
  const routes = [
    'src/app/api/chat/route.ts',
    'src/app/api/community/route.ts',
    'src/app/api/cover-letter/route.ts',
    'src/app/api/cv/ats/route.ts',
    'src/app/api/cv/generate/route.ts',
    'src/app/api/study-tools/route.ts',
  ];
  for (const route of routes) {
    const source = read(route);
    assert.match(source, /@\/lib\/api-request-schemas/);
    assert.doesNotMatch(source, /from 'zod'/);
  }
  for (const route of routes.filter((route) => route !== 'src/app/api/community/route.ts')) {
    assert.match(read(route), /aiLanguageInstruction/);
  }
  const cvClient = read('src/components/manos-abiertas/cv-section.tsx');
  assert.match(cvClient, /\.map\(\(\{ position, company, description, startDate, endDate \}\)/);
  assert.match(cvClient, /\.map\(\(\{ title, institution, year, description \}\)/);
});
