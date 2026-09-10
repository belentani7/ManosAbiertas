// Currículo Manos Abiertas · 8 módulos IA (nivel-00 a nivel-25) en ES, PT, CA y EN.
// Contenido en /public/contenido/curriculum/<dir>/nivel-XX-YY.md

export type CurriculumLang = 'ES' | 'PT' | 'CA' | 'EN';
export type CurriculumUiLocale = 'es' | 'pt' | 'ca' | 'en';

export const CURRICULUM_LEVEL_COUNT = 26; // nivel-00 … nivel-25
export const CURRICULUM_LANGS: CurriculumLang[] = ['ES', 'PT', 'CA', 'EN'];

export interface CurriculumModule {
  id: string;
  dir: string;
  icon: string;
  titles: Record<CurriculumUiLocale, string>;
  descriptions: Record<CurriculumUiLocale, string>;
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'm01',
    dir: 'm01-introduccion-ia',
    icon: '🤖',
    titles: {
      es: 'Introducción a la IA',
      pt: 'Introdução à IA',
      ca: 'Introducció a la IA',
      en: 'Introduction to AI',
    },
    descriptions: {
      es: 'Primeros pasos: chat, visión, voz y síntesis para tu vida diaria.',
      pt: 'Primeiros passos: chat, visão, voz e síntese para o dia a dia.',
      ca: 'Primers passos: xat, visió, veu i síntesi per a la vida diària.',
      en: 'First steps: chat, vision, voice and synthesis for daily life.',
    },
  },
  {
    id: 'm02',
    dir: 'm02-herramientas-sin-codigo',
    icon: '🧰',
    titles: {
      es: 'Herramientas sin código',
      pt: 'Ferramentas sem código',
      ca: 'Eines sense codi',
      en: 'No-code tools',
    },
    descriptions: {
      es: 'Crea soluciones digitales completas sin programar.',
      pt: 'Crie soluções digitais completas sem programar.',
      ca: 'Crea solucions digitals completes sense programar.',
      en: 'Build complete digital solutions without programming.',
    },
  },
  {
    id: 'm03',
    dir: 'm03-ia-datos',
    icon: '📊',
    titles: {
      es: 'IA y datos',
      pt: 'IA e dados',
      ca: 'IA i dades',
      en: 'AI and data',
    },
    descriptions: {
      es: 'Entiende y usa datos con IA de forma práctica y segura.',
      pt: 'Entenda e use dados com IA de forma prática e segura.',
      ca: 'Entén i utilitza dades amb IA de manera pràctica i segura.',
      en: 'Understand and use data with AI in a practical, safe way.',
    },
  },
  {
    id: 'm04',
    dir: 'm04-generacion-contenido',
    icon: '✍️',
    titles: {
      es: 'Generación de contenido',
      pt: 'Geração de conteúdo',
      ca: 'Generació de contingut',
      en: 'Content generation',
    },
    descriptions: {
      es: 'Textos, imágenes y vídeo con IA para tus proyectos.',
      pt: 'Textos, imagens e vídeo com IA para seus projetos.',
      ca: 'Textos, imatges i vídeo amb IA per als teus projectes.',
      en: 'Text, images and video with AI for your projects.',
    },
  },
  {
    id: 'm05',
    dir: 'm05-automatizacion',
    icon: '⚙️',
    titles: {
      es: 'Automatización',
      pt: 'Automação',
      ca: 'Automatització',
      en: 'Automation',
    },
    descriptions: {
      es: 'Automatiza tareas repetitivas y ahorra tiempo cada semana.',
      pt: 'Automatize tarefas repetitivas e economize tempo toda semana.',
      ca: 'Automatitza tasques repetitives i estalvia temps cada setmana.',
      en: 'Automate repetitive tasks and save time every week.',
    },
  },
  {
    id: 'm06',
    dir: 'm06-educacion-ia',
    icon: '🎓',
    titles: {
      es: 'Educación e IA',
      pt: 'Educação e IA',
      ca: 'Educació i IA',
      en: 'Education and AI',
    },
    descriptions: {
      es: 'La IA como aliada para aprender y enseñar mejor.',
      pt: 'A IA como aliada para aprender e ensinar melhor.',
      ca: 'La IA com a aliada per aprendre i ensenyar millor.',
      en: 'AI as an ally to learn and teach better.',
    },
  },
  {
    id: 'm07',
    dir: 'm07-proyectos-comunitarios',
    icon: '🤝',
    titles: {
      es: 'Proyectos comunitarios',
      pt: 'Projetos comunitários',
      ca: 'Projectes comunitaris',
      en: 'Community projects',
    },
    descriptions: {
      es: 'Aplica la IA en iniciativas reales de tu comunidad.',
      pt: 'Aplique a IA em iniciativas reais da sua comunidade.',
      ca: 'Aplica la IA en iniciatives reals de la teva comunitat.',
      en: 'Apply AI to real initiatives in your community.',
    },
  },
  {
    id: 'm08',
    dir: 'm08-etica-futuro',
    icon: '🧭',
    titles: {
      es: 'Ética y futuro',
      pt: 'Ética e futuro',
      ca: 'Ètica i futur',
      en: 'Ethics and the future',
    },
    descriptions: {
      es: 'Uso responsable, riesgos y futuro de la IA.',
      pt: 'Uso responsável, riscos e futuro da IA.',
      ca: 'Ús responsable, riscos i futur de la IA.',
      en: 'Responsible use, risks and the future of AI.',
    },
  },
];

export function resolveCurriculumUiLocale(locale: string): CurriculumUiLocale {
  if (locale === 'ca') return 'ca';
  if (locale === 'en') return 'en';
  if (locale === 'pt' || locale === 'pt-BR') return 'pt';
  return 'es';
}

export function resolveCurriculumContentLang(locale: string): CurriculumLang {
  if (locale === 'ca') return 'CA';
  if (locale === 'en') return 'EN';
  if (locale === 'pt' || locale === 'pt-BR') return 'PT';
  return 'ES';
}

export function getCurriculumModule(dir: string): CurriculumModule | undefined {
  return CURRICULUM_MODULES.find((module) => module.dir === dir);
}
