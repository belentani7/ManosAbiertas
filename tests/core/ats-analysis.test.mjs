import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeATSAnalysis, parseATSAnalysisText } from '../../src/lib/ats-analysis.ts';

const valid = {
  score: 72.6,
  matchedKeywords: ['excel'],
  missingKeywords: ['inglés'],
  strengths: ['Experiencia relevante'],
  suggestions: ['Añadir resultados medibles'],
  summary: 'Compatibilidad media.',
};

test('ATS analysis parser accepts fenced JSON and normalizes its public limits', () => {
  const many = Array.from({ length: 40 }, (_, index) => `keyword-${index}`);
  const result = parseATSAnalysisText(`texto\n\`\`\`json\n${JSON.stringify({ ...valid, score: 130, matchedKeywords: many })}\n\`\`\``);
  assert.equal(result?.score, 100);
  assert.equal(result?.matchedKeywords.length, 30);
  assert.equal(result?.summary, valid.summary);
});

test('ATS analysis rejects malformed provider output before it reaches React', () => {
  assert.equal(parseATSAnalysisText('not-json'), null);
  assert.equal(normalizeATSAnalysis({ ...valid, score: Number.NaN }), null);
  assert.equal(normalizeATSAnalysis({ ...valid, suggestions: [{ unsafe: true }] }), null);
  assert.equal(normalizeATSAnalysis({ ...valid, summary: 'x'.repeat(4_001) }), null);
});
