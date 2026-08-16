import { LANGUAGES, type LanguageCode } from '../i18n/languages.ts';

const LANGUAGE_NAMES = new Map(LANGUAGES.map((language) => [language.code, language.englishName]));

export function aiLanguageInstruction(code: LanguageCode, formal = false) {
  const language = LANGUAGE_NAMES.get(code);
  if (!language) throw new Error('Unsupported language');
  return formal
    ? `Write in ${language}. Use natural, formal, and approachable language.`
    : `Respond in ${language}. Use natural, simple, and clear language.`;
}
