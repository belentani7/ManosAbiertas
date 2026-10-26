import type { SectionId } from '../stores/app-store.ts';

export type PortalLanguage = 'es' | 'pt' | 'en' | 'ca';
export type PortalGoalId = 'first-days' | 'work' | 'papers' | 'language' | 'digital';
export type PortalIcon = 'compass' | 'briefcase' | 'shield' | 'languages' | 'sparkles';

type Localized = Record<PortalLanguage, string>;

const l = (es: string, pt: string, en: string, ca: string): Localized => ({ es, pt, en, ca });

export const PORTAL_LANGUAGES: Array<{ code: PortalLanguage; label: string; short: string }> = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ca', label: 'Català', short: 'CA' },
];

export function normalizePortalLanguage(value: unknown): PortalLanguage {
  if (typeof value !== 'string') return 'es';
  const normalized = value.trim().toLowerCase();
  if (normalized.startsWith('pt')) return 'pt';
  if (normalized.startsWith('ca')) return 'ca';
  if (normalized.startsWith('en')) return 'en';
  return 'es';
}

const PORTAL_GOAL_IDS = new Set<string>(['first-days', 'work', 'papers', 'language', 'digital']);

export function isPortalGoalId(value: unknown): value is PortalGoalId {
  return typeof value === 'string' && PORTAL_GOAL_IDS.has(value);
}

export interface PortalCopy {
  languageLabel: string;
  skip: string;
  brandTagline: string;
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    primary: string;
    secondary: string;
    meta: string[];
  };
  progress: { label: string; intro: string; method: string; firstStep: string };
  method: {
    eyebrow: string;
    title: string;
    body: string;
    steps: Array<{ title: string; body: string; proof: string }>;
    trust: string[];
    cta: string;
    back: string;
  };
  menu: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    back: string;
    loading: string;
    error: string;
    offline: string;
  };
  plan: {
    eyebrow: string;
    title: string;
    body: string;
    step: string;
    enter: string;
    change: string;
    privacy: string;
    back: string;
    objective: string;
    outcome: string;
  };
  footer: { made: string; privacy: string };
  a11y: { progress: string; selectGoal: string; language: string; back: string };
}

export const PORTAL_COPY: Record<PortalLanguage, PortalCopy> = {
  es: {
    languageLabel: 'Idioma',
    skip: 'Saltar introducción',
    brandTagline: 'Escuela abierta para autonomía digital y laboral',
    hero: {
      eyebrow: 'Plataforma educativa abierta · v2.2.2',
      title: 'No entras a un curso.',
      accent: 'Entras en tu próxima etapa.',
      body: 'Una ruta guiada de 10 minutos para aprender IA, Office, CV y derechos. Gratis, sin cuenta y en tu idioma.',
      primary: 'Empezar el recorrido',
      secondary: 'Ya conozco la plataforma',
      meta: ['Gratis', 'Sin registro', '39 idiomas'],
    },
    progress: { label: 'Progreso de la introducción', intro: 'Introducción', method: 'Método', firstStep: 'Primer paso' },
    method: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos. Cero barreras.',
      body: 'No te pedimos papeles ni datos personales. Empiezas por lo que necesitas hoy y avanzas a tu ritmo.',
      steps: [
        { title: 'Llegas', body: 'Elige tu situación. Encontramos el primer paso que sí puedes hacer hoy.', proof: '5 rutas reales' },
        { title: 'Aprendes', body: 'Lecciones cortas, ejemplos prácticos y ayuda en tu idioma.', proof: '39 idiomas' },
        { title: 'Haces', body: 'Terminas con un CV, un trámite entendido o una ruta clara.', proof: 'Progreso local' },
      ],
      trust: ['Sin cuenta', 'Funciona offline', 'Fuentes verificadas'],
      cta: 'Elegir mi primer paso',
      back: 'Volver',
    },
    menu: {
      eyebrow: 'Tu primer paso',
      title: '¿Qué necesitas en los próximos 10 minutos?',
      body: 'Elige una situación. Te damos tres pasos reales, no una lista infinita.',
      cta: 'Ver mi ruta',
      back: 'Volver al método',
      loading: 'Preparando tu ruta...',
      error: 'No pudimos conectar con el servidor. Usamos tu recomendación local.',
      offline: 'Recomendación preparada en tu dispositivo.',
    },
    plan: {
      eyebrow: 'Tu ruta',
      title: '10 minutos que sí sirven.',
      body: 'Tres pasos cortos. Sin cuenta. Tu progreso se queda en este dispositivo.',
      step: 'Paso',
      enter: 'Entrar en la plataforma',
      change: 'Cambiar objetivo',
      privacy: 'Guardamos solo tu elección en este dispositivo. No pedimos nombre, teléfono ni documentos.',
      back: 'Volver a las situaciones',
      objective: 'Objetivo',
      outcome: 'Al terminar',
    },
    footer: { made: 'Hecho para personas, no para algoritmos.', privacy: 'Gratis · Sin registro · Sin rastreo publicitario' },
    a11y: { progress: 'Progreso de la introducción', selectGoal: 'Seleccionar objetivo', language: 'Elegir idioma', back: 'Volver' },
  },
  pt: {
    languageLabel: 'Idioma',
    skip: 'Pular introdução',
    brandTagline: 'Escola aberta para autonomia digital e profissional',
    hero: {
      eyebrow: 'Plataforma educativa aberta · v2.2.2',
      title: 'Você não entra num curso.',
      accent: 'Entra na sua próxima etapa.',
      body: 'Uma rota guiada de 10 minutos para aprender IA, Office, CV e direitos. Grátis, sem conta e no seu idioma.',
      primary: 'Começar o percurso',
      secondary: 'Já conheço a plataforma',
      meta: ['Grátis', 'Sem cadastro', '39 idiomas'],
    },
    progress: { label: 'Progresso da introdução', intro: 'Introdução', method: 'Método', firstStep: 'Primeiro passo' },
    method: {
      eyebrow: 'Como funciona',
      title: 'Três passos. Zero barreiras.',
      body: 'Não pedimos documentos nem dados pessoais. Você começa pelo que precisa hoje e avança no seu ritmo.',
      steps: [
        { title: 'Chega', body: 'Escolha sua situação. Encontramos o primeiro passo que você pode dar hoje.', proof: '5 rotas reais' },
        { title: 'Aprende', body: 'Lições curtas, exemplos práticos e ajuda no seu idioma.', proof: '39 idiomas' },
        { title: 'Faz', body: 'Você termina com um CV, um trâmite entendido ou uma rota clara.', proof: 'Progresso local' },
      ],
      trust: ['Sem conta', 'Funciona offline', 'Fontes verificadas'],
      cta: 'Escolher meu primeiro passo',
      back: 'Voltar',
    },
    menu: {
      eyebrow: 'Seu primeiro passo',
      title: 'O que você precisa nos próximos 10 minutos?',
      body: 'Escolha uma situação. Damos três passos reais, não uma lista infinita.',
      cta: 'Ver minha rota',
      back: 'Voltar ao método',
      loading: 'Preparando sua rota...',
      error: 'Não conseguimos conectar ao servidor. Usamos sua recomendação local.',
      offline: 'Recomendação preparada no seu dispositivo.',
    },
    plan: {
      eyebrow: 'Sua rota',
      title: '10 minutos que valem a pena.',
      body: 'Três passos curtos. Sem conta. Seu progresso fica neste dispositivo.',
      step: 'Passo',
      enter: 'Entrar na plataforma',
      change: 'Mudar objetivo',
      privacy: 'Guardamos apenas sua escolha neste dispositivo. Não pedimos nome, telefone nem documentos.',
      back: 'Voltar às situações',
      objective: 'Objetivo',
      outcome: 'Ao terminar',
    },
    footer: { made: 'Feito para pessoas, não para algoritmos.', privacy: 'Grátis · Sem cadastro · Sem rastreamento publicitário' },
    a11y: { progress: 'Progresso da introdução', selectGoal: 'Selecionar objetivo', language: 'Escolher idioma', back: 'Voltar' },
  },
  en: {
    languageLabel: 'Language',
    skip: 'Skip introduction',
    brandTagline: 'An open school for digital and working autonomy',
    hero: {
      eyebrow: 'Open learning platform · v2.2.2',
      title: 'You are not entering a course.',
      accent: 'You are entering your next chapter.',
      body: 'A guided 10-minute route to learn AI, Office, CV and rights. Free, no account, in your language.',
      primary: 'Start the journey',
      secondary: 'I already know the platform',
      meta: ['Free', 'No account', '39 languages'],
    },
    progress: { label: 'Introduction progress', intro: 'Introduction', method: 'Method', firstStep: 'First step' },
    method: {
      eyebrow: 'How it works',
      title: 'Three steps. Zero barriers.',
      body: 'We do not ask for documents or personal data. You start with what you need today and move at your own pace.',
      steps: [
        { title: 'You arrive', body: 'Choose your situation. We find the first step you can take today.', proof: '5 real routes' },
        { title: 'You learn', body: 'Short lessons, practical examples and help in your language.', proof: '39 languages' },
        { title: 'You do', body: 'You leave with a CV, a document you understand or a clear route.', proof: 'Local progress' },
      ],
      trust: ['No account', 'Works offline', 'Verified sources'],
      cta: 'Choose my first step',
      back: 'Back',
    },
    menu: {
      eyebrow: 'Your first step',
      title: 'What do you need in the next 10 minutes?',
      body: 'Choose a situation. We give you three real steps, not an endless list.',
      cta: 'See my route',
      back: 'Back to the method',
      loading: 'Preparing your route...',
      error: 'We could not reach the server. Using your local recommendation.',
      offline: 'Recommendation prepared on your device.',
    },
    plan: {
      eyebrow: 'Your route',
      title: '10 minutes that actually help.',
      body: 'Three short steps. No account. Your progress stays on this device.',
      step: 'Step',
      enter: 'Enter the platform',
      change: 'Change goal',
      privacy: 'We only store your choice on this device. We do not ask for your name, phone or documents.',
      back: 'Back to situations',
      objective: 'Goal',
      outcome: 'When you finish',
    },
    footer: { made: 'Built for people, not algorithms.', privacy: 'Free · No account · No ad tracking' },
    a11y: { progress: 'Introduction progress', selectGoal: 'Select a goal', language: 'Choose language', back: 'Back' },
  },
  ca: {
    languageLabel: 'Idioma',
    skip: "Saltar la introducció",
    brandTagline: "Escola oberta per a autonomia digital i laboral",
    hero: {
      eyebrow: 'Plataforma educativa oberta · v2.2.2',
      title: 'No entres en un curs.',
      accent: 'Entres a la teva propera etapa.',
      body: 'Una ruta guiada de 10 minuts per aprendre IA, Office, CV i drets. Gratuït, sense compte i en la teva llengua.',
      primary: 'Comença el recorregut',
      secondary: 'Ja conec la plataforma',
      meta: ['Gratuït', 'Sense registre', '39 idiomes'],
    },
    progress: { label: 'Progrés de la introducció', intro: 'Introducció', method: 'Mètode', firstStep: 'Primer pas' },
    method: {
      eyebrow: 'Com funciona',
      title: 'Tres passos. Zero barreres.',
      body: "No et demanem papers ni dades personals. Comences pel que necessites avui i avances al teu ritme.",
      steps: [
        { title: 'Arribes', body: 'Tria la teva situació. Trobem el primer pas que sí pots fer avui.', proof: '5 rutes reals' },
        { title: 'Aprens', body: 'Lliçons curtes, exemples pràctics i ajuda en la teva llengua.', proof: '39 idiomes' },
        { title: 'Fas', body: 'Acabes amb un CV, un tràmit entès o una ruta clara.', proof: 'Progrés local' },
      ],
      trust: ['Sense compte', 'Funciona offline', 'Fonts verificades'],
      cta: 'Triar el meu primer pas',
      back: 'Tornar',
    },
    menu: {
      eyebrow: 'El teu primer pas',
      title: 'Què necessites en els pròxims 10 minuts?',
      body: 'Tria una situació. Et donem tres passos reals, no una llista infinita.',
      cta: 'Veure la meva ruta',
      back: 'Tornar al mètode',
      loading: 'Preparant la teva ruta...',
      error: 'No hem pogut connectar amb el servidor. Fem servir la recomanació local.',
      offline: 'Recomanació preparada al teu dispositiu.',
    },
    plan: {
      eyebrow: 'La teva ruta',
      title: '10 minuts que sí serveixen.',
      body: 'Tres passos curts. Sense compte. El teu progrés es queda en aquest dispositiu.',
      step: 'Pas',
      enter: 'Entrar a la plataforma',
      change: 'Canviar objectiu',
      privacy: "Guardem només la teva elecció en aquest dispositiu. No demanem nom, telèfon ni documents.",
      back: 'Tornar a les situacions',
      objective: 'Objectiu',
      outcome: 'En acabar',
    },
    footer: { made: 'Fet per a persones, no per a algoritmes.', privacy: 'Gratuït · Sense registre · Sense rastreig publicitari' },
    a11y: { progress: 'Progrés de la introducció', selectGoal: 'Seleccionar objectiu', language: 'Triar idioma', back: 'Tornar' },
  },
};

export interface PortalGoal {
  id: PortalGoalId;
  journeyId: string;
  icon: PortalIcon;
  accent: string;
  title: Localized;
  description: Localized;
  steps: Array<{ title: Localized; section: SectionId }>;
}

export const PORTAL_GOALS: PortalGoal[] = [
  {
    id: 'first-days',
    journeyId: 'primeras-24h',
    icon: 'compass',
    accent: '#ff8a3d',
    title: l('Llegué hace poco', 'Cheguei há pouco', 'I just arrived', "Acabo d'arribar"),
    description: l(
      'Lo urgente primero: contactos, trámites y ayuda cerca de ti.',
      'O urgente primeiro: contactos, trâmites e ajuda perto de você.',
      'The urgent first: contacts, paperwork and help near you.',
      'El més urgent primer: contactes, tràmits i ajuda a prop.',
    ),
    steps: [
      {
        title: l(
          'Guarda los teléfonos de emergencia',
          'Guarde os telefones de emergência',
          'Save emergency numbers',
          "Desa els telèfons d'emergència",
        ),
        section: 'contacts',
      },
      {
        title: l(
          'Anota tus 3 trámites prioritarios',
          'Anote seus 3 trâmites prioritários',
          'Note your 3 priority procedures',
          'Anota els teus 3 tràmits prioritaris',
        ),
        section: 'rights',
      },
      {
        title: l(
          'Encuentra ayuda cerca de ti',
          'Encontre ajuda perto de você',
          'Find help near you',
          'Troba ajuda a prop',
        ),
        section: 'resources',
      },
    ],
  },
  {
    id: 'work',
    journeyId: 'primera-candidatura',
    icon: 'briefcase',
    accent: '#ffb35c',
    title: l('Busco trabajo', 'Procuro trabalho', 'I am looking for work', 'Busco feina'),
    description: l(
      'CV, carta y primeras ofertas, sin experiencia previa.',
      'CV, carta e primeiras ofertas, sem experiência prévia.',
      'CV, cover letter and first offers, even without experience.',
      'CV, carta i primeres ofertes, sense experiència prèvia.',
    ),
    steps: [
      {
        title: l('Crea tu CV', 'Crie seu CV', 'Create your CV', 'Crea el teu CV'),
        section: 'cv',
      },
      {
        title: l(
          'Escribe tu carta de presentación',
          'Escreva sua carta de apresentação',
          'Write your cover letter',
          'Escriu la teva carta de presentació',
        ),
        section: 'cv',
      },
      {
        title: l(
          'Prepara tu primera candidatura',
          'Prepare sua primeira candidatura',
          'Prepare your first application',
          'Prepara la teva primera candidatura',
        ),
        section: 'courses',
      },
    ],
  },
  {
    id: 'papers',
    journeyId: 'entender-documentos',
    icon: 'shield',
    accent: '#7dd3a8',
    title: l('Tengo un trámite', 'Tenho um trâmite', 'I have paperwork', 'Tinc un tràmit'),
    description: l(
      'Entiende la carta, los plazos y dónde resolverla.',
      'Entenda a carta, os prazos e onde resolver.',
      'Understand the letter, deadlines and where to resolve it.',
      'Entén la carta, els terminis i on resoldre-ho.',
    ),
    steps: [
      {
        title: l(
          'Entiende la carta o el trámite',
          'Entenda a carta ou o trâmite',
          'Understand the letter or procedure',
          'Entén la carta o el tràmit',
        ),
        section: 'rights',
      },
      {
        title: l(
          'Prepara tu carpeta de documentos',
          'Prepare sua pasta de documentos',
          'Prepare your document folder',
          'Prepara la teva carpeta de documents',
        ),
        section: 'tools',
      },
      {
        title: l(
          'Consulta el canal oficial',
          'Consulte o canal oficial',
          'Check the official channel',
          'Consulta el canal oficial',
        ),
        section: 'contacts',
      },
    ],
  },
  {
    id: 'language',
    journeyId: 'catalan-100',
    icon: 'languages',
    accent: '#7cc7ff',
    title: l('Quiero aprender idioma', 'Quero aprender idioma', 'I want to learn a language', 'Vull aprendre idioma'),
    description: l(
      'Frases y palabras para el día a día, sin vergüenza.',
      'Frases e palavras para o dia a dia, sem vergonha.',
      'Everyday phrases and words, without embarrassment.',
      'Frases i paraules per al dia a dia, sense vergonya.',
    ),
    steps: [
      {
        title: l(
          'Aprende 100 palabras esenciales',
          'Aprenda 100 palavras essenciais',
          'Learn 100 essential words',
          'Aprèn 100 paraules essencials',
        ),
        section: 'courses',
      },
      {
        title: l(
          'Practica una conversación real',
          'Pratique uma conversa real',
          'Practise a real conversation',
          'Practica una conversa real',
        ),
        section: 'tools',
      },
      {
        title: l(
          'Sigue con el campus abierto',
          'Continue no campus aberto',
          'Continue with the open campus',
          'Continua amb el campus obert',
        ),
        section: 'courses',
      },
    ],
  },
  {
    id: 'digital',
    journeyId: 'independencia-digital',
    icon: 'sparkles',
    accent: '#c4a7ff',
    title: l(
      'Quiero aprender IA y Office',
      'Quero aprender IA e Office',
      'I want to learn AI and Office',
      'Vull aprendre IA i Office',
    ),
    description: l(
      'Empieza desde cero, sin miedo y a tu ritmo.',
      'Comece do zero, sem medo e no seu ritmo.',
      'Start from zero, without fear and at your own pace.',
      'Comença des de zero, sense por i al teu ritme.',
    ),
    steps: [
      {
        title: l(
          'Empieza con Office sin miedo',
          'Comece com Office sem medo',
          'Start with Office without fear',
          'Comença amb Office sense por',
        ),
        section: 'office',
      },
      {
        title: l(
          'Haz tu primera pregunta útil a la IA',
          'Faça sua primeira pergunta útil à IA',
          'Ask AI your first useful question',
          'Fes la teva primera pregunta útil a la IA',
        ),
        section: 'learn-ai',
      },
      {
        title: l(
          'Elige un proyecto pequeño',
          'Escolha um projeto pequeno',
          'Choose a small project',
          'Tria un projecte petit',
        ),
        section: 'courses',
      },
    ],
  },
];

export function getPortalGoal(id: string): PortalGoal | undefined {
  return PORTAL_GOALS.find((goal) => goal.id === id);
}
