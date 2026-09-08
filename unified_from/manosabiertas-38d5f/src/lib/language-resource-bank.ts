import { LANGUAGES, type LanguageCode } from '@/i18n/languages';

const WIKI_CODES: Partial<Record<LanguageCode, string>> = { 'pt-BR': 'pt' };

export type LanguageResourceHub = {
  code: LanguageCode;
  name: string;
  flag: string;
  knowledgeUrl: string;
  booksUrl: string;
  videoUrl: string;
  openMediaUrl: string;
};

export const LANGUAGE_RESOURCE_BANK: LanguageResourceHub[] = LANGUAGES.map((language) => {
  const wikiCode = WIKI_CODES[language.code] ?? language.code;
  const query = encodeURIComponent(`aprender ${language.englishName}`);
  return {
    code: language.code,
    name: language.name,
    flag: language.flag,
    knowledgeUrl: `https://${wikiCode}.wikipedia.org/`,
    booksUrl: `https://archive.org/search?query=${encodeURIComponent(`language:${language.englishName}`)}`,
    videoUrl: `https://www.youtube.com/results?search_query=${query}`,
    openMediaUrl: 'https://commons.wikimedia.org/wiki/Main_Page',
  };
});
