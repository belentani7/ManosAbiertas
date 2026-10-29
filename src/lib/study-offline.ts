import type { LanguageCode } from '../i18n/languages.ts';

/**
 * Locally generated, extractive exercises. They do not call a provider or
 * invent facts. Untranslated locales use a language-neutral cloze based on
 * the supplied text rather than falling back to Spanish.
 */
const COPY: Partial<Record<LanguageCode, readonly [string, string]>> = {
  es: ['Completa la frase', 'Encuentra las palabras que faltan en el texto.'],
  ca: ['Completa la frase', 'Busca les paraules que falten al text.'],
  pt: ['Complete a frase', 'Procure as palavras que faltam no texto.'],
  'pt-BR': ['Complete a frase', 'Procure as palavras que faltam no texto.'],
  en: ['Complete the sentence', 'Find the missing words in the text.'],
  fr: ['Complétez la phrase', 'Retrouvez les mots manquants dans le texte.'],
  de: ['Vervollständige den Satz', 'Finde die fehlenden Wörter im Text.'],
  it: ['Completa la frase', 'Trova le parole mancanti nel testo.'],
  zh: ['补全句子', '在原文中找到缺失的词语。'],
  hi: ['वाक्य पूरा करें', 'पाठ में छूटे हुए शब्द खोजें।'],
  ar: ['أكمل الجملة', 'ابحث عن الكلمات الناقصة في النص.'],
  ru: ['Дополните предложение', 'Найдите пропущенные слова в тексте.'],
  uk: ['Доповніть речення', 'Знайдіть пропущені слова в тексті.'],
  nl: ['Maak de zin af', 'Zoek de ontbrekende woorden in de tekst.'],
  ja: ['文を完成させてください', '本文から抜けている言葉を探してください。'],
  ko: ['문장을 완성하세요', '본문에서 빠진 단어를 찾으세요.'],
};

function extractSentences(content: string, language: LanguageCode): string[] {
  const text = content.replace(/\s+/gu, ' ').trim().slice(0, 5_000);
  if (!text) return [];
  const sentences = Array.from(
    new Intl.Segmenter(language, { granularity: 'sentence' }).segment(text),
    (part) => part.segment.trim(),
  ).filter((part) => Array.from(part).length >= 8);
  // The API accepts text without punctuation, so still produce useful output.
  return [...new Set(sentences.length ? sentences : [text])].slice(0, 5);
}

function cloze(sentence: string): string {
  const chars = Array.from(sentence).slice(0, 180);
  const text = chars.join('');
  const word = [...text.matchAll(/[\p{L}\p{N}]+/gu)]
    .find((match) => Array.from(match[0]).length >= 5 && Array.from(match[0]).length <= 18);
  if (word && word.index !== undefined) {
    return text.slice(0, word.index) + '______' + text.slice(word.index + word[0].length);
  }
  // Chinese, Japanese, Thai and other scripts need no spaces between words.
  const middle = Math.max(1, Math.floor(chars.length / 2) - 1);
  chars.splice(middle, Math.min(2, chars.length - middle), '______');
  return chars.join('');
}

/** Return offline material in the existing study-tools API wire format. */
export function offlineStudyText(
  content: string,
  language: LanguageCode,
  tool: 'questions' | 'summary',
): string {
  const sentences = extractSentences(content, language);
  if (!sentences.length) return '';
  if (tool === 'summary') {
    // Extractive, not an AI-written summary. Keep the source language.
    return sentences.map((sentence, i) => `${i + 1}. ${Array.from(sentence).slice(0, 160).join('')}`).join('\n');
  }
  const copy = COPY[language];
  return JSON.stringify({
    questions: sentences.slice(0, 3).map((sentence) => ({
      question: `${copy ? copy[0] + ': ' : ''}${cloze(sentence)}`,
      hint: copy?.[1] ?? '',
    })),
  });
}
