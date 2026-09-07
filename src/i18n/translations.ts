import type { LanguageCode } from './languages';

// UI translation keys
export interface UITranslations {
  // Navigation
  nav_home: string;
  nav_learnAI: string;
  nav_cv: string;
  nav_office: string;
  nav_resources: string;
  nav_rights: string;
  nav_contacts: string;

  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_cta_start: string;
  hero_cta_learn: string;

  // Common
  search: string;
  search_placeholder: string;
  loading: string;
  noResults: string;
  viewAll: string;
  learnMore: string;
  getStarted: string;
  backToTop: string;
  close: string;
  save: string;
  export: string;
  download: string;
  print: string;
  next: string;
  previous: string;
  of: string;
  step: string;
  lesson: string;
  course: string;
  duration: string;
  level: string;
  level_beginner: string;
  level_intermediate: string;
  level_advanced: string;
  free: string;

  // Sections
  home_welcome: string;
  home_mission: string;
  home_mission_text: string;
  home_forWho: string;
  home_forWho_text: string;

  // AI Learning
  ai_title: string;
  ai_subtitle: string;
  ai_chooseModel: string;
  ai_whatYouLearn: string;
  ai_practicalExercises: string;

  // CV Builder
  cv_title: string;
  cv_subtitle: string;
  cv_personalInfo: string;
  cv_experience: string;
  cv_education: string;
  cv_skills: string;
  cv_languages: string;
  cv_summary: string;
  cv_template: string;
  cv_aiAssist: string;
  cv_aiAssist_desc: string;
  cv_generate: string;
  cv_fullName: string;
  cv_email: string;
  cv_phone: string;
  cv_address: string;
  cv_profession: string;
  cv_addExperience: string;
  cv_addEducation: string;
  cv_addSkill: string;
  cv_preview: string;

  // Office
  office_title: string;
  office_subtitle: string;
  office_word: string;
  office_excel: string;
  office_powerpoint: string;

  // Resources
  resources_title: string;
  resources_subtitle: string;
  resources_filterCategory: string;
  resources_filterRegion: string;
  resources_total: string;

  // Rights
  rights_title: string;
  rights_subtitle: string;
  rights_legal: string;
  rights_health: string;
  rights_housing: string;
  rights_work: string;
  rights_education: string;
  rights_emergency: string;

  // Home extras (were hardcoded ES)
  home_desc_ai: string;
  home_desc_cv: string;
  home_desc_office: string;
  home_desc_rights: string;
  home_desc_tools: string;
  home_title_tools: string;
  home_desc_events: string;
  home_title_events: string;
  home_title_courses: string;
  home_desc_courses: string;
  home_desc_contacts: string;
  home_choose_start: string;
  home_generated_ai: string;
  home_ai_available: string;
  home_cv_minutes: string;
  home_ai_explained: string;
  home_ai_free_practical: string;
  home_start_today: string;
  home_no_prior_knowledge: string;
  home_ai_typing: string;
  home_ai_assistant_label: string;
  home_for_who_question: string;
  home_for_who_1: string;
  home_for_who_2: string;
  home_for_who_3: string;
  home_for_who_4: string;
  home_for_who_5: string;
  home_for_who_6: string;
  home_resources_reviewed: string;

  // Progress dashboard
  progress_title: string;
  progress_continue: string;
  progress_saved_auto: string;
  progress_completed: string;
  progress_of_lessons: string;
  progress_finished: string;
  progress_cv_created: string;
  progress_cv_none: string;
  progress_achievements: string;
  progress_unlocked: string;
  progress_keep_learning: string;
  progress_loading: string;
  progress_continue_ai: string;
  progress_continue_office: string;
  achievement_first_step: string;
  achievement_first_step_desc: string;
  achievement_ai_explorer: string;
  achievement_ai_explorer_desc: string;
  achievement_cv_created: string;
  achievement_cv_created_desc: string;
  achievement_ai_master: string;
  achievement_ai_master_desc: string;
  achievement_office_pro: string;
  achievement_office_pro_desc: string;

  // Home Coursera-style keys
  home_explore_catalog: string;
  home_all_categories: string;
  home_lessons_count: string;
  home_continue_learning: string;
  home_popular_now: string;
  home_category_ai: string;
  home_category_employment: string;
  home_category_digital: string;
  home_category_rights: string;
  home_category_community: string;
  home_start_course: string;
  home_trusted_sources: string;
  home_no_signup: string;
  home_works_mobile: string;

  // Footer extras (were hardcoded ES)
  footer_stats_title: string;
  footer_lessons: string;
  footer_guarantees: string;
  footer_official_sources: string;
  footer_no_registration: string;
  footer_free_access: string;
  footer_source_code: string;
  footer_help: string;
  footer_shortcuts: string;
  footer_shortcuts_title: string;
  footer_need_help: string;
  footer_community: string;
  footer_shortcut_search: string;
  footer_shortcut_close: string;
  footer_shortcut_navigate: string;
  footer_shortcut_select: string;
  footer_shortcut_tip: string;

  // Footer
  footer_madeWith: string;
  footer_disclaimer: string;
  footer_rights: string;
}

const es: UITranslations = {
  nav_home: 'Inicio',
  nav_learnAI: 'Aprende IA',
  nav_cv: 'Crea tu CV',
  nav_office: 'Office Pack',
  nav_resources: 'Recursos',
  nav_rights: 'Derechos y Ayudas',
  nav_contacts: 'Contactos',

  hero_title: 'Manos Abiertas',
  hero_subtitle: 'Tu puente hacia la inteligencia artificial, el empleo y tus derechos en España',
  hero_cta_start: 'Crear mi CV',
  hero_cta_learn: 'Aprender IA gratis',

  search: 'Buscar',
  search_placeholder: 'Buscar recursos, cursos, ayudas...',
  loading: 'Cargando...',
  noResults: 'Sin resultados',
  viewAll: 'Ver todo',
  learnMore: 'Saber más',
  getStarted: 'Empezar ahora',
  backToTop: 'Volver arriba',
  close: 'Cerrar',
  save: 'Guardar',
  export: 'Exportar',
  download: 'Descargar',
  print: 'Imprimir',
  next: 'Siguiente',
  previous: 'Anterior',
  of: 'de',
  step: 'Paso',
  lesson: 'Lección',
  course: 'Curso',
  duration: 'Duración',
  level: 'Nivel',
  level_beginner: 'Principiante',
  level_intermediate: 'Intermedio',
  level_advanced: 'Avanzado',
  free: 'Gratis',

  home_welcome: 'Bienvenido a Manos Abiertas',
  home_mission: 'Nuestra Misión',
  home_mission_text: 'Ayudamos a las personas inmigrantes en España a aprovechar la inteligencia artificial, crear un currículum profesional y conocer sus derechos y los recursos disponibles. Todo en tu idioma, de forma sencilla y gratuita.',
  home_forWho: '¿Para quién es?',
  home_forWho_text: 'Para todas las personas que llegan a España y quieren aprender, trabajar y conocer sus derechos. No necesitas conocimientos previos: si sabes usar WhatsApp, puedes usar esta web.',

  ai_title: 'Aprende Inteligencia Artificial',
  ai_subtitle: 'Cursos prácticos y gratuitos para usar las mejores IA: ChatGPT, Gemini, Qwen, Copilot, DeepSeek y más',
  ai_chooseModel: 'Elige tu IA',
  ai_whatYouLearn: 'Qué aprenderás',
  ai_practicalExercises: 'Ejercicios prácticos',

  cv_title: 'Crea tu Currículum con IA',
  cv_subtitle: 'Genera un CV profesional en minutos con ayuda de inteligencia artificial',
  cv_personalInfo: 'Información personal',
  cv_experience: 'Experiencia laboral',
  cv_education: 'Educación',
  cv_skills: 'Habilidades',
  cv_languages: 'Idiomas',
  cv_summary: 'Resumen profesional',
  cv_template: 'Plantilla',
  cv_aiAssist: 'Asistente IA',
  cv_aiAssist_desc: 'La IA te ayuda a mejorar tus textos, resumir experiencia y encontrar las palabras correctas',
  cv_generate: 'Generar con IA',
  cv_fullName: 'Nombre completo',
  cv_email: 'Correo electrónico',
  cv_phone: 'Teléfono',
  cv_address: 'Dirección',
  cv_profession: 'Profesión',
  cv_addExperience: 'Añadir experiencia',
  cv_addEducation: 'Añadir educación',
  cv_addSkill: 'Añadir habilidad',
  cv_preview: 'Vista previa',

  office_title: 'Curso Completo de Office',
  office_subtitle: 'Domina Word, Excel y PowerPoint desde cero',
  office_word: 'Microsoft Word',
  office_excel: 'Microsoft Excel',
  office_powerpoint: 'PowerPoint',

  resources_title: 'Directorio de Recursos',
  resources_subtitle: 'Catálogo con fuentes y estado de revisión visible: gobierno, ONGs, empleo, sanidad y más',
  resources_filterCategory: 'Categoría',
  resources_filterRegion: 'Comunidad Autónoma',
  resources_total: 'recursos disponibles',

  rights_title: 'Derechos y Ayudas',
  rights_subtitle: 'Todo lo que necesitas saber para vivir en España con dignidad',
  rights_legal: 'Legal y Documentación',
  rights_health: 'Salud',
  rights_housing: 'Vivienda',
  rights_work: 'Trabajo',
  rights_education: 'Educación',
  rights_emergency: 'Emergencias',

  home_desc_ai: 'ChatGPT, Gemini, Copilot, DeepSeek y más',
  home_desc_cv: 'CV profesional con IA en minutos',
  home_desc_office: 'Word, Excel, PowerPoint desde cero',
  home_desc_rights: 'Derechos, ayudas y supervivencia',
  home_desc_tools: 'Checklist trámites, coste de vida, conversor',
  home_title_tools: 'Herramientas',
  home_desc_events: 'Ferias de empleo, jornadas, cursos',
  home_title_events: 'Eventos',
  home_title_courses: 'Biblioteca de Cursos',
  home_desc_courses: '115+ cursos gratuitos online con certificado',
  home_desc_contacts: 'Emergencias, ONGs, embajadas',
  home_choose_start: 'Elige dónde empezar',
  home_generated_ai: 'Generado con IA',
  home_ai_available: 'IA disponibles',
  home_cv_minutes: 'CV en 5 minutos',
  home_ai_explained: 'Las mejores IA, explicadas paso a paso',
  home_ai_free_practical: 'Gratis, en tu idioma, con ejemplos prácticos',
  home_start_today: 'Empieza hoy tu camino',
  home_no_prior_knowledge: 'No necesitas conocimientos previos. Si sabes usar WhatsApp, puedes usar esta web. Todo es gratis.',
  home_ai_typing: 'IA escribiendo...',
  home_ai_assistant_label: 'Asistente IA',
  home_for_who_question: '¿Para quién es Manos Abiertas?',
  home_for_who_1: 'Personas recién llegadas a España',
  home_for_who_2: 'Quienes buscan empleo o mejor trabajo',
  home_for_who_3: 'Adultos que quieren aprender IA y Office',
  home_for_who_4: 'Personas mayores que se inician en lo digital',
  home_for_who_5: 'Quienes necesitan conocer sus derechos',
  home_for_who_6: 'Personas que prefieren su idioma materno',
  home_resources_reviewed: 'fichas · {n} con revisión fechada',

  progress_title: 'Tu progreso',
  progress_continue: 'Continúa donde lo dejaste',
  progress_saved_auto: 'Tu avance se guarda automáticamente en este dispositivo',
  progress_completed: 'completado',
  progress_of_lessons: 'de {total} lecciones',
  progress_finished: 'Completados',
  progress_cv_created: '✓ Creado',
  progress_cv_none: 'Sin crear',
  progress_achievements: 'Logros',
  progress_unlocked: 'Logros desbloqueados',
  progress_keep_learning: 'Sigue aprendiendo para desbloquear más logros',
  progress_loading: 'Cargando progreso...',
  progress_continue_ai: 'Continuar IA',
  progress_continue_office: 'Continuar Office',
  achievement_first_step: 'Primer paso',
  achievement_first_step_desc: 'Completa tu primera lección',
  achievement_ai_explorer: 'Explorador IA',
  achievement_ai_explorer_desc: 'Empieza un curso de IA',
  achievement_cv_created: 'CV Creado',
  achievement_cv_created_desc: 'Crea tu currículum',
  achievement_ai_master: 'Maestro IA',
  achievement_ai_master_desc: 'Completa un curso de IA entero',
  achievement_office_pro: 'Office Pro',
  achievement_office_pro_desc: 'Completa un módulo de Office entero',

  home_explore_catalog: 'Explora el catálogo',
  home_all_categories: 'Todas',
  home_lessons_count: '{n} lecciones',
  home_continue_learning: 'Continúa aprendiendo',
  home_popular_now: 'Popular ahora',
  home_category_ai: 'Inteligencia artificial',
  home_category_employment: 'Empleo',
  home_category_digital: 'Habilidades digitales',
  home_category_rights: 'Derechos y ayudas',
  home_category_community: 'Comunidad',
  home_start_course: 'Empezar',
  home_trusted_sources: 'Fuentes oficiales verificadas',
  home_no_signup: 'Sin registro',
  home_works_mobile: 'Funciona en móvil',

  footer_stats_title: 'En cifras',
  footer_lessons: 'Lecciones',
  footer_guarantees: 'Garantías',
  footer_official_sources: 'Fuentes oficiales',
  footer_no_registration: 'Sin registro',
  footer_free_access: 'Acceso libre',
  footer_source_code: 'Código de Manos Abiertas',
  footer_help: 'Ayuda',
  footer_shortcuts: 'Atajos',
  footer_shortcuts_title: 'Atajos de teclado',
  footer_need_help: '¿Necesitas ayuda? Consulta el directorio y confirma la vigencia antes de llamar.',
  footer_community: 'Hecho con {heart} para las comunidades latinoamericanas y migrantes en España',
  footer_shortcut_search: 'Abrir búsqueda rápida',
  footer_shortcut_close: 'Cerrar diálogo / búsqueda',
  footer_shortcut_navigate: 'Navegar en listas',
  footer_shortcut_select: 'Seleccionar elemento',
  footer_shortcut_tip: 'Usa {keys} en cualquier momento para buscar rápidamente entre secciones, cursos, recursos y artículos de derechos.',

  footer_madeWith: 'Hecho con cariño para la comunidad inmigrante',
  footer_disclaimer: 'Cada ficha indica fuente y fecha cuando existen. No es asesoramiento legal.',
  footer_rights: 'Manos Abiertas © 2025 · Acceso libre y gratuito',
};

const en: UITranslations = {
  nav_home: 'Home',
  nav_learnAI: 'Learn AI',
  nav_cv: 'Build your CV',
  nav_office: 'Office Pack',
  nav_resources: 'Resources',
  nav_rights: 'Rights & Aid',
  nav_contacts: 'Contacts',

  hero_title: 'Open Hands',
  hero_subtitle: 'Your bridge to artificial intelligence, employment and your rights in Spain',
  hero_cta_start: 'Build my CV',
  hero_cta_learn: 'Learn AI for free',

  search: 'Search',
  search_placeholder: 'Search resources, courses, aid...',
  loading: 'Loading...',
  noResults: 'No results',
  viewAll: 'View all',
  learnMore: 'Learn more',
  getStarted: 'Get started',
  backToTop: 'Back to top',
  close: 'Close',
  save: 'Save',
  export: 'Export',
  download: 'Download',
  print: 'Print',
  next: 'Next',
  previous: 'Previous',
  of: 'of',
  step: 'Step',
  lesson: 'Lesson',
  course: 'Course',
  duration: 'Duration',
  level: 'Level',
  level_beginner: 'Beginner',
  level_intermediate: 'Intermediate',
  level_advanced: 'Advanced',
  free: 'Free',

  home_welcome: 'Welcome to Manos Abiertas',
  home_mission: 'Our Mission',
  home_mission_text: 'We help immigrant people in Spain to leverage artificial intelligence, create a professional CV, and know their rights and available resources. All in your language, simply and for free.',
  home_forWho: 'Who is it for?',
  home_forWho_text: 'For everyone arriving in Spain who wants to learn, work, and know their rights. No prior knowledge needed: if you can use WhatsApp, you can use this website.',

  ai_title: 'Learn Artificial Intelligence',
  ai_subtitle: 'Free, practical courses to use the best AIs: ChatGPT, Gemini, Qwen, Copilot, DeepSeek and more',
  ai_chooseModel: 'Choose your AI',
  ai_whatYouLearn: 'What you will learn',
  ai_practicalExercises: 'Practical exercises',

  cv_title: 'Build your CV with AI',
  cv_subtitle: 'Generate a professional CV in minutes with AI assistance',
  cv_personalInfo: 'Personal information',
  cv_experience: 'Work experience',
  cv_education: 'Education',
  cv_skills: 'Skills',
  cv_languages: 'Languages',
  cv_summary: 'Professional summary',
  cv_template: 'Template',
  cv_aiAssist: 'AI Assistant',
  cv_aiAssist_desc: 'AI helps you improve your texts, summarize experience, and find the right words',
  cv_generate: 'Generate with AI',
  cv_fullName: 'Full name',
  cv_email: 'Email',
  cv_phone: 'Phone',
  cv_address: 'Address',
  cv_profession: 'Profession',
  cv_addExperience: 'Add experience',
  cv_addEducation: 'Add education',
  cv_addSkill: 'Add skill',
  cv_preview: 'Preview',

  office_title: 'Complete Office Course',
  office_subtitle: 'Master Word, Excel and PowerPoint from scratch',
  office_word: 'Microsoft Word',
  office_excel: 'Microsoft Excel',
  office_powerpoint: 'PowerPoint',

  resources_title: 'Resources Directory',
  resources_subtitle: 'Resource catalogue with sources and visible review status: government, NGOs, jobs, health and more',
  resources_filterCategory: 'Category',
  resources_filterRegion: 'Autonomous Community',
  resources_total: 'resources available',

  rights_title: 'Rights & Aid',
  rights_subtitle: 'Everything you need to know to live in Spain with dignity',
  rights_legal: 'Legal & Documents',
  rights_health: 'Health',
  rights_housing: 'Housing',
  rights_work: 'Work',
  rights_education: 'Education',
  rights_emergency: 'Emergencies',

  home_desc_ai: 'ChatGPT, Gemini, Copilot, DeepSeek and more',
  home_desc_cv: 'Professional CV with AI in minutes',
  home_desc_office: 'Word, Excel, PowerPoint from scratch',
  home_desc_rights: 'Rights, aid and survival',
  home_desc_tools: 'Procedure checklist, cost of living, converter',
  home_title_tools: 'Tools',
  home_desc_events: 'Job fairs, workshops, courses',
  home_title_events: 'Events',
  home_title_courses: 'Course Library',
  home_desc_courses: '115+ free online courses with certificate',
  home_desc_contacts: 'Emergencies, NGOs, embassies',
  home_choose_start: 'Choose where to start',
  home_generated_ai: 'Generated with AI',
  home_ai_available: 'AIs available',
  home_cv_minutes: 'CV in 5 minutes',
  home_ai_explained: 'The best AIs, explained step by step',
  home_ai_free_practical: 'Free, in your language, with practical examples',
  home_start_today: 'Start your journey today',
  home_no_prior_knowledge: 'No prior knowledge needed. If you can use WhatsApp, you can use this website. Everything is free.',
  home_ai_typing: 'AI typing...',
  home_ai_assistant_label: 'AI Assistant',
  home_for_who_question: 'Who is Manos Abiertas for?',
  home_for_who_1: 'People who recently arrived in Spain',
  home_for_who_2: 'Those looking for a job or better work',
  home_for_who_3: 'Adults who want to learn AI and Office',
  home_for_who_4: 'Older adults getting started with digital',
  home_for_who_5: 'Those who need to know their rights',
  home_for_who_6: 'People who prefer their native language',
  home_resources_reviewed: 'entries · {n} with dated review',

  progress_title: 'Your progress',
  progress_continue: 'Pick up where you left off',
  progress_saved_auto: 'Your progress is saved automatically on this device',
  progress_completed: 'completed',
  progress_of_lessons: 'of {total} lessons',
  progress_finished: 'Completed',
  progress_cv_created: '✓ Created',
  progress_cv_none: 'Not created',
  progress_achievements: 'Achievements',
  progress_unlocked: 'Achievements unlocked',
  progress_keep_learning: 'Keep learning to unlock more achievements',
  progress_loading: 'Loading progress...',
  progress_continue_ai: 'Continue AI',
  progress_continue_office: 'Continue Office',
  achievement_first_step: 'First step',
  achievement_first_step_desc: 'Complete your first lesson',
  achievement_ai_explorer: 'AI Explorer',
  achievement_ai_explorer_desc: 'Start an AI course',
  achievement_cv_created: 'CV Created',
  achievement_cv_created_desc: 'Create your CV',
  achievement_ai_master: 'AI Master',
  achievement_ai_master_desc: 'Complete a full AI course',
  achievement_office_pro: 'Office Pro',
  achievement_office_pro_desc: 'Complete a full Office module',

  home_explore_catalog: 'Explore the catalog',
  home_all_categories: 'All',
  home_lessons_count: '{n} lessons',
  home_continue_learning: 'Continue learning',
  home_popular_now: 'Popular now',
  home_category_ai: 'Artificial intelligence',
  home_category_employment: 'Employment',
  home_category_digital: 'Digital skills',
  home_category_rights: 'Rights & support',
  home_category_community: 'Community',
  home_start_course: 'Start',
  home_trusted_sources: 'Verified official sources',
  home_no_signup: 'No sign-up',
  home_works_mobile: 'Works on mobile',

  footer_stats_title: 'In numbers',
  footer_lessons: 'Lessons',
  footer_guarantees: 'Guarantees',
  footer_official_sources: 'Official sources',
  footer_no_registration: 'No sign-up',
  footer_free_access: 'Free access',
  footer_source_code: 'Manos Abiertas source code',
  footer_help: 'Help',
  footer_shortcuts: 'Shortcuts',
  footer_shortcuts_title: 'Keyboard shortcuts',
  footer_need_help: 'Need help? Check the directory and verify availability before calling.',
  footer_community: 'Made with {heart} for Latin American and migrant communities in Spain',
  footer_shortcut_search: 'Open quick search',
  footer_shortcut_close: 'Close dialog / search',
  footer_shortcut_navigate: 'Navigate lists',
  footer_shortcut_select: 'Select item',
  footer_shortcut_tip: 'Use {keys} any time to quickly search sections, courses, resources and rights articles.',

  footer_madeWith: 'Made with love for the immigrant community',
  footer_disclaimer: 'Each entry shows its source and date when available. Not legal advice.',
  footer_rights: 'Manos Abiertas © 2025 · Free and open access',
};

const ca: UITranslations = {
  ...es,
  nav_home: 'Inici',
  nav_learnAI: 'Aprèn IA',
  nav_cv: 'Crea el teu CV',
  nav_office: 'Office Pack',
  nav_resources: 'Recursos',
  nav_rights: 'Drets i Ajudes',
  nav_contacts: 'Contactes',
  hero_title: 'Mans Obertes',
  hero_subtitle: 'El teu pont cap a la intel·ligència artificial, la feina i els teus drets a Espanya',
  hero_cta_start: 'Crear el meu CV',
  hero_cta_learn: 'Aprendre IA gratis',
  home_welcome: 'Benvingut a Mans Obertes',
  home_mission: 'La nostra missió',
  home_mission_text: 'Ajudem les persones immigrants a Espanya a aprofitar la intel·ligència artificial, crear un currículum professional i conèixer els seus drets i els recursos disponibles. Tot en el teu idioma, de forma senzilla i gratuïta.',
  home_forWho: 'Per a qui és?',
  home_forWho_text: 'Per a totes les persones que arriben a Espanya i volen aprendre, treballar i conèixer els seus drets. No necessites coneixements previs: si saps fer servir WhatsApp, pots fer servir aquesta web.',
  ai_title: 'Aprèn Intel·ligència Artificial',
  ai_subtitle: 'Cursos pràctics i gratuïts per usar les millors IA: ChatGPT, Gemini, Qwen, Copilot, DeepSeek i més',
  cv_title: 'Crea el teu Currículum amb IA',
  cv_subtitle: 'Genera un CV professional en minuts amb ajuda d\'intel·ligència artificial',
  office_title: 'Curs complet d\'Office',
  office_subtitle: 'Domina Word, Excel i PowerPoint des de zero',
  resources_title: 'Directori de Recursos',
  rights_title: 'Drets i Ajudes',
};

const ptBR: UITranslations = {
  ...en,
  nav_home: 'Início',
  nav_learnAI: 'Aprenda IA',
  nav_cv: 'Crie seu CV',
  nav_office: 'Office Pack',
  nav_resources: 'Recursos',
  nav_rights: 'Direitos e Ajuda',
  nav_contacts: 'Contatos',
  hero_title: 'Mãos Abertas',
  hero_subtitle: 'Sua ponte para a inteligência artificial, emprego e seus direitos na Espanha',
  hero_cta_start: 'Criar meu CV',
  hero_cta_learn: 'Aprender IA grátis',
  home_welcome: 'Bem-vindo a Mãos Abertas',
  home_mission: 'Nossa missão',
  home_mission_text: 'Ajudamos as pessoas imigrantes na Espanha a aproveitar a inteligência artificial, criar um currículo profissional e conhecer seus direitos e os recursos disponíveis. Tudo no seu idioma, de forma simples e gratuita.',
  home_forWho: 'Para quem é?',
  home_forWho_text: 'Para todas as pessoas que chegam à Espanha e querem aprender, trabalhar e conhecer seus direitos. Não precisa conhecimento prévio: se você sabe usar WhatsApp, pode usar este site.',
  ai_title: 'Aprenda Inteligência Artificial',
  ai_subtitle: 'Cursos práticos e gratuitos para usar as melhores IAs: ChatGPT, Gemini, Qwen, Copilot, DeepSeek e mais',
  cv_title: 'Crie seu Currículo com IA',
  cv_subtitle: 'Gere um CV profissional em minutos com ajuda da inteligência artificial',
  office_title: 'Curso Completo de Office',
  office_subtitle: 'Domine Word, Excel e PowerPoint do zero',
  resources_title: 'Diretório de Recursos',
  rights_title: 'Direitos e Ajuda',

  home_desc_ai: 'ChatGPT, Gemini, Copilot, DeepSeek e mais',
  home_desc_cv: 'CV profissional com IA em minutos',
  home_desc_office: 'Word, Excel, PowerPoint do zero',
  home_desc_rights: 'Direitos, ajuda e sobrevivência',
  home_desc_tools: 'Checklist trâmites, custo de vida, conversor',
  home_title_tools: 'Ferramentas',
  home_desc_events: 'Feiras de emprego, jornadas, cursos',
  home_title_events: 'Eventos',
  home_title_courses: 'Biblioteca de Cursos',
  home_desc_courses: '115+ cursos gratuitos online com certificado',
  home_desc_contacts: 'Emergências, ONGs, embaixadas',
  home_choose_start: 'Escolha por onde começar',
  home_generated_ai: 'Gerado com IA',
  home_ai_available: 'IAs disponíveis',
  home_cv_minutes: 'CV em 5 minutos',
  home_ai_explained: 'As melhores IAs, explicadas passo a passo',
  home_ai_free_practical: 'Grátis, no seu idioma, com exemplos práticos',
  home_start_today: 'Comece hoje seu caminho',
  home_no_prior_knowledge: 'Não precisa de conhecimentos prévios. Se você sabe usar WhatsApp, pode usar este site. Tudo é grátis.',
  home_ai_typing: 'IA escrevendo...',
  home_ai_assistant_label: 'Assistente IA',
  home_for_who_question: 'Para quem é Manos Abiertas?',
  home_for_who_1: 'Pessoas recém-chegadas à Espanha',
  home_for_who_2: 'Quem busca emprego ou trabalho melhor',
  home_for_who_3: 'Adultos que querem aprender IA e Office',
  home_for_who_4: 'Pessoas mais velhas iniciando no digital',
  home_for_who_5: 'Quem precisa conhecer seus direitos',
  home_for_who_6: 'Pessoas que preferem seu idioma materno',
  home_resources_reviewed: 'fichas · {n} com revisão datada',

  progress_title: 'Seu progresso',
  progress_continue: 'Continue de onde parou',
  progress_saved_auto: 'Seu progresso é salvo automaticamente neste dispositivo',
  progress_completed: 'concluído',
  progress_of_lessons: 'de {total} lições',
  progress_finished: 'Concluídos',
  progress_cv_created: '✓ Criado',
  progress_cv_none: 'Não criado',
  progress_achievements: 'Conquistas',
  progress_unlocked: 'Conquistas desbloqueadas',
  progress_keep_learning: 'Continue aprendendo para desbloquear mais conquistas',
  progress_loading: 'Carregando progresso...',
  progress_continue_ai: 'Continuar IA',
  progress_continue_office: 'Continuar Office',
  achievement_first_step: 'Primeiro passo',
  achievement_first_step_desc: 'Complete sua primeira lição',
  achievement_ai_explorer: 'Explorador IA',
  achievement_ai_explorer_desc: 'Comece um curso de IA',
  achievement_cv_created: 'Currículo criado',
  achievement_cv_created_desc: 'Crie seu currículo',
  achievement_ai_master: 'Mestre IA',
  achievement_ai_master_desc: 'Complete um curso de IA inteiro',
  achievement_office_pro: 'Office Pro',
  achievement_office_pro_desc: 'Complete um módulo de Office inteiro',

  home_explore_catalog: 'Explore o catálogo',
  home_all_categories: 'Todas',
  home_lessons_count: '{n} lições',
  home_continue_learning: 'Continue aprendendo',
  home_popular_now: 'Popular agora',
  home_category_ai: 'Inteligência artificial',
  home_category_employment: 'Emprego',
  home_category_digital: 'Habilidades digitais',
  home_category_rights: 'Direitos e apoio',
  home_category_community: 'Comunidade',
  home_start_course: 'Começar',
  home_trusted_sources: 'Fontes oficiais verificadas',
  home_no_signup: 'Sem cadastro',
  home_works_mobile: 'Funciona no celular',

  footer_stats_title: 'Em números',
  footer_lessons: 'Lições',
  footer_guarantees: 'Garantias',
  footer_official_sources: 'Fontes oficiais',
  footer_no_registration: 'Sem cadastro',
  footer_free_access: 'Acesso livre',
  footer_source_code: 'Código de Manos Abiertas',
  footer_help: 'Ajuda',
  footer_shortcuts: 'Atalhos',
  footer_shortcuts_title: 'Atalhos de teclado',
  footer_need_help: 'Precisa de ajuda? Consulte o diretório e confirme a disponibilidade antes de ligar.',
  footer_community: 'Feito com {heart} para as comunidades latino-americanas e migrantes na Espanha',
  footer_shortcut_search: 'Abrir busca rápida',
  footer_shortcut_close: 'Fechar diálogo / busca',
  footer_shortcut_navigate: 'Navegar em listas',
  footer_shortcut_select: 'Selecionar item',
  footer_shortcut_tip: 'Use {keys} a qualquer momento para buscar rapidamente entre seções, cursos, recursos e artigos de direitos.',
};

const fr: UITranslations = {
  ...en,
  nav_home: 'Accueil',
  nav_learnAI: 'Apprendre l\'IA',
  nav_cv: 'Crée ton CV',
  nav_office: 'Office Pack',
  nav_resources: 'Ressources',
  nav_rights: 'Droits & Aide',
  nav_contacts: 'Contacts',
  hero_title: 'Mains Ouvertes',
  hero_subtitle: 'Votre pont vers l\'intelligence artificielle, l\'emploi et vos droits en Espagne',
  hero_cta_start: 'Créer mon CV',
  hero_cta_learn: 'Apprendre l\'IA gratuitement',
  home_welcome: 'Bienvenue à Manos Abiertas',
  home_mission: 'Notre mission',
  home_mission_text: 'Nous aidons les personnes immigrantes en Espagne à tirer parti de l\'intelligence artificielle, à créer un CV professionnel et à connaître leurs droits et les ressources disponibles. Tout dans votre langue, simplement et gratuitement.',
  ai_title: 'Apprendre l\'Intelligence Artificielle',
  cv_title: 'Créez votre CV avec l\'IA',
  office_title: 'Cours Complet Office',
  resources_title: 'Annuaire de Ressources',
  rights_title: 'Droits & Aide',
};

const ar: UITranslations = {
  ...en,
  nav_home: 'الرئيسية',
  nav_learnAI: 'تعلم الذكاء الاصطناعي',
  nav_cv: 'أنشئ سيرتك الذاتية',
  nav_office: 'حزمة أوفيس',
  nav_resources: 'الموارد',
  nav_rights: 'الحقوق والمساعدات',
  nav_contacts: 'جهات الاتصال',
  hero_title: 'أيدٍ مفتوحة',
  hero_subtitle: 'جسرك نحو الذكاء الاصطناعي والعمل وحقوقك في إسبانيا',
  hero_cta_start: 'أنشئ سيرتي الذاتية',
  hero_cta_learn: 'تعلم الذكاء الاصطناعي مجاناً',
  home_welcome: 'مرحباً بك في Manos Abiertas',
  home_mission: 'مهمتنا',
  home_mission_text: 'نساعد المهاجرين في إسبانيا على الاستفادة من الذكاء الاصطناعي وإنشاء سيرة ذاتية احترافية ومعرفة حقوقهم والموارد المتاحة. كل ذلك بلغتك، بطريقة بسيطة ومجانية.',
  ai_title: 'تعلم الذكاء الاصطناعي',
  cv_title: 'أنشئ سيرتك الذاتية بالذكاء الاصطناعي',
  office_title: 'دورة أوفيس الكاملة',
  resources_title: 'دليل الموارد',
  rights_title: 'الحقوق والمساعدات',
};

const zh: UITranslations = {
  ...en,
  nav_home: '首页',
  nav_learnAI: '学习AI',
  nav_cv: '制作简历',
  nav_office: 'Office课程',
  nav_resources: '资源',
  nav_rights: '权利与援助',
  nav_contacts: '联系方式',
  hero_title: '张开双手',
  hero_subtitle: '您通往人工智能、就业和在西班牙权利的桥梁',
  hero_cta_start: '制作我的简历',
  hero_cta_learn: '免费学习AI',
  home_welcome: '欢迎来到Manos Abiertas',
  home_mission: '我们的使命',
  home_mission_text: '我们帮助西班牙的移民利用人工智能、创建专业简历并了解自己的权利和可用资源。全部使用您的语言，简单且免费。',
  ai_title: '学习人工智能',
  cv_title: '用AI制作简历',
  office_title: 'Office完整课程',
  resources_title: '资源目录',
  rights_title: '权利与援助',
};

const hi: UITranslations = {
  ...en,
  nav_home: 'होम',
  nav_learnAI: 'एआई सीखें',
  nav_cv: 'अपना सीवी बनाएं',
  nav_office: 'ऑफिस पैक',
  nav_resources: 'संसाधन',
  nav_rights: 'अधिकार और सहायता',
  nav_contacts: 'संपर्क',
  hero_title: 'खुले हाथ',
  hero_subtitle: 'स्पेन में आर्टिफिशियल इंटेलिजेंस, रोजगार और आपके अधिकारों के लिए आपका पुल',
  hero_cta_start: 'मेरा सीवी बनाएं',
  hero_cta_learn: 'मुफ्त में एआई सीखें',
  home_welcome: 'Manos Abiertas में आपका स्वागत है',
  home_mission: 'हमारा मिशन',
  home_mission_text: 'हम स्पेन में प्रवासी लोगों को आर्टिफिशियल इंटेलिजेंस का उपयोग करने, पेशेवर सीवी बनाने और अपने अधिकारों और उपलब्ध संसाधनों को जानने में मदद करते हैं। सब कुछ आपकी भाषा में, सरल और मुफ्त।',
  ai_title: 'आर्टिफिशियल इंटेलिजेंस सीखें',
  cv_title: 'एआई के साथ अपना सीवी बनाएं',
  office_title: 'संपूर्ण ऑफिस कोर्स',
  resources_title: 'संसाधन निर्देशिका',
  rights_title: 'अधिकार और सहायता',
};

const qu: UITranslations = {
  ...es,
  nav_home: 'Qallariy',
  nav_learnAI: 'AI yachay',
  nav_cv: 'CV ruray',
  nav_office: 'Office Pack',
  nav_resources: 'Imaynakuna',
  nav_rights: 'Hayñikuna yanapakuykuna',
  nav_contacts: 'Rimapuykuna',
  hero_title: 'Makis Kichasqa',
  hero_subtitle: 'Ispañapi sunqu illa yachay, llamkay hayñikunaman puqtun',
  hero_cta_start: 'CV niyta ruray',
  hero_cta_learn: 'AI gratis yachay',
  home_welcome: 'Manos Abiertas nisqaman allin hamusqa',
  home_mission: 'Misionninchik',
  home_mission_text: 'Ispañapi runa migrante nisqakunata yanapayku sunqu illa yachayta llamk\'achiyta, profesional CV rurayta, hayñinkunata y imaynakunata yachayta. Llank\'aypi simiykipi, aslla llank\'awan, gratis.',
  ai_title: 'Sunqu Illa Yachay Yachay',
  cv_title: 'AI nisqawan CV ruray',
  office_title: 'Office Hunt\'a Yachay',
  resources_title: 'Imaynakuna Pusana',
  rights_title: 'Hayñikuna Yanapakuykuna',
};

const ro: UITranslations = {
  ...en,
  nav_home: 'Acasă',
  nav_learnAI: 'Învață IA',
  nav_cv: 'Fă-ți CV',
  nav_office: 'Office Pack',
  nav_resources: 'Resurse',
  nav_rights: 'Drepturi și Ajutor',
  nav_contacts: 'Contacte',
  hero_title: 'Mâini Deschise',
  hero_subtitle: 'Podul tău către inteligența artificială, locul de muncă și drepturile tale în Spania',
  hero_cta_start: 'Creează-mi CV',
  hero_cta_learn: 'Învață IA gratuit',
  home_welcome: 'Bun venit la Manos Abiertas',
  home_mission: 'Misiunea noastră',
  ai_title: 'Învață Inteligență Artificială',
  cv_title: 'Fă-ți CV cu IA',
  office_title: 'Curs Complet Office',
  resources_title: 'Director de Resurse',
  rights_title: 'Drepturi și Ajutor',
};

const uk: UITranslations = {
  ...en,
  nav_home: 'Головна',
  nav_learnAI: 'Вивчай ШІ',
  nav_cv: 'Створи резюме',
  nav_office: 'Office Pack',
  nav_resources: 'Ресурси',
  nav_rights: 'Права та допомога',
  nav_contacts: 'Контакти',
  hero_title: 'Відкриті Долоні',
  hero_subtitle: 'Ваш міст до штучного інтелекту, роботи та ваших прав в Іспанії',
  hero_cta_start: 'Створити резюме',
  hero_cta_learn: 'Вивчати ШІ безкоштовно',
  home_welcome: 'Ласкаво просимо до Manos Abiertas',
  home_mission: 'Наша місія',
  ai_title: 'Вивчай Штучний Інтелект',
  cv_title: 'Створи резюме зі ШІ',
  office_title: 'Повний курс Office',
  resources_title: 'Каталог ресурсів',
  rights_title: 'Права та допомога',
};

const de: UITranslations = {
  ...en,
  nav_home: 'Startseite',
  nav_learnAI: 'KI lernen',
  nav_cv: 'Lebenslauf erstellen',
  nav_office: 'Office Pack',
  nav_resources: 'Ressourcen',
  nav_rights: 'Rechte & Hilfe',
  nav_contacts: 'Kontakte',
  hero_title: 'Offene Hände',
  hero_subtitle: 'Deine Brücke zu künstlicher Intelligenz, Arbeit und deinen Rechten in Spanien',
  hero_cta_start: 'Meinen Lebenslauf erstellen',
  hero_cta_learn: 'KI kostenlos lernen',
  home_welcome: 'Willkommen bei Manos Abiertas',
  home_mission: 'Unsere Mission',
  home_mission_text: 'Wir helfen eingewanderten Menschen in Spanien, künstliche Intelligenz zu nutzen, einen professionellen Lebenslauf zu erstellen und ihre Rechte und verfügbaren Ressourcen kennenzulernen. Alles in deiner Sprache, einfach und kostenlos.',
  home_forWho: 'Für wen ist das?',
  home_forWho_text: 'Für alle Menschen, die nach Spanien kommen und lernen, arbeiten und ihre Rechte kennenlernen möchten. Du brauchst keine Vorkenntnisse: Wenn du WhatsApp benutzen kannst, kannst du auch diese Website nutzen.',
  ai_title: 'Künstliche Intelligenz lernen',
  ai_subtitle: 'Kostenlose praktische Kurse, um die besten KIs zu nutzen: ChatGPT, Gemini, Qwen, Copilot, DeepSeek und mehr',
  cv_title: 'Lebenslauf mit KI erstellen',
  cv_subtitle: 'Erstelle in Minuten einen professionellen Lebenslauf mit KI-Unterstützung',
  office_title: 'Kompletter Office-Kurs',
  office_subtitle: 'Beherrsche Word, Excel und PowerPoint von Grund auf',
  resources_title: 'Ressourcenverzeichnis',
  resources_subtitle: 'Ressourcenkatalog mit Quellenangaben und sichtbarem Prüfstatus',
  rights_title: 'Rechte & Hilfe',
  rights_subtitle: 'Alles, was du wissen musst, um in Spanien in Würde zu leben',
  footer_madeWith: 'Mit Liebe für die Migrantengemeinschaft gemacht',
  footer_disclaimer: 'Jeder Eintrag nennt Quelle und Datum, sofern vorhanden. Keine Rechtsberatung.',
  footer_rights: 'Manos Abiertas © 2025 · Frei und kostenlos zugänglich',
};

const it: UITranslations = {
  ...en,
  nav_home: 'Home',
  nav_learnAI: 'Impara l\'IA',
  nav_cv: 'Crea il tuo CV',
  nav_office: 'Office Pack',
  nav_resources: 'Risorse',
  nav_rights: 'Diritti & Aiuti',
  nav_contacts: 'Contatti',
  hero_title: 'Mani Aperte',
  hero_subtitle: 'Il tuo ponte verso l\'intelligenza artificiale, il lavoro e i tuoi diritti in Spagna',
  hero_cta_start: 'Crea il mio CV',
  hero_cta_learn: 'Impara l\'IA gratis',
  home_welcome: 'Benvenuto a Manos Abiertas',
  home_mission: 'La nostra missione',
  home_mission_text: 'Aiutiamo le persone immigrate in Spagna a sfruttare l\'intelligenza artificiale, creare un curriculum professionale e conoscere i propri diritti e le risorse disponibili. Tutto nella tua lingua, in modo semplice e gratuito.',
  home_forWho: 'A chi è rivolto?',
  home_forWho_text: 'A tutte le persone che arrivano in Spagna e vogliono imparare, lavorare e conoscere i propri diritti. Non servono conoscenze pregresse: se sai usare WhatsApp, puoi usare questo sito.',
  ai_title: 'Impara l\'Intelligenza Artificiale',
  ai_subtitle: 'Corsi pratici e gratuiti per usare le migliori IA: ChatGPT, Gemini, Qwen, Copilot, DeepSeek e altre',
  cv_title: 'Crea il tuo CV con l\'IA',
  cv_subtitle: 'Genera un CV professionale in pochi minuti con l\'aiuto dell\'intelligenza artificiale',
  office_title: 'Corso completo di Office',
  office_subtitle: 'Padroneggia Word, Excel e PowerPoint da zero',
  resources_title: 'Elenco risorse',
  resources_subtitle: 'Catalogo di risorse con fonti e stato di revisione visibile',
  rights_title: 'Diritti & Aiuti',
  rights_subtitle: 'Tutto quello che devi sapere per vivere in Spagna con dignità',
  footer_madeWith: 'Fatto con amore per la comunità immigrata',
  footer_disclaimer: 'Ogni scheda indica fonte e data quando disponibili. Non è consulenza legale.',
  footer_rights: 'Manos Abiertas © 2025 · Accesso libero e gratuito',
};

const ru: UITranslations = {
  ...en,
  nav_home: 'Главная',
  nav_learnAI: 'Учить ИИ',
  nav_cv: 'Создать резюме',
  nav_office: 'Office Pack',
  nav_resources: 'Ресурсы',
  nav_rights: 'Права и помощь',
  nav_contacts: 'Контакты',
  hero_title: 'Открытые руки',
  hero_subtitle: 'Ваш мост к искусственному интеллекту, работе и вашим правам в Испании',
  hero_cta_start: 'Создать моё резюме',
  hero_cta_learn: 'Учить ИИ бесплатно',
  home_welcome: 'Добро пожаловать в Manos Abiertas',
  home_mission: 'Наша миссия',
  home_mission_text: 'Мы помогаем иммигрантам в Испании использовать искусственный интеллект, создавать профессиональное резюме и узнавать свои права и доступные ресурсы. Всё на вашем языке, просто и бесплатно.',
  home_forWho: 'Для кого это?',
  home_forWho_text: 'Для всех, кто приезжает в Испанию и хочет учиться, работать и знать свои права. Не нужно никаких знаний: если вы умеете пользоваться WhatsApp, вы сможете пользоваться этим сайтом.',
  ai_title: 'Учите искусственный интеллект',
  ai_subtitle: 'Бесплатные практические курсы по лучшим ИИ: ChatGPT, Gemini, Qwen, Copilot, DeepSeek и другие',
  cv_title: 'Создайте резюме с помощью ИИ',
  cv_subtitle: 'Создайте профессиональное резюме за минуты с помощью ИИ',
  office_title: 'Полный курс Office',
  office_subtitle: 'Освойте Word, Excel и PowerPoint с нуля',
  resources_title: 'Каталог ресурсов',
  resources_subtitle: 'Каталог ресурсов с источниками и видимым статусом проверки',
  rights_title: 'Права и помощь',
  rights_subtitle: 'Всё, что нужно знать, чтобы жить в Испании с достоинством',
  footer_madeWith: 'Сделано с любовью для сообщества иммигрантов',
  footer_disclaimer: 'Каждая запись указывает источник и дату, если они доступны. Это не юридическая консультация.',
  footer_rights: 'Manos Abiertas © 2025 · Свободный и бесплатный доступ',
};

const pl: UITranslations = {
  ...en,
  nav_home: 'Strona główna',
  nav_learnAI: 'Ucz się AI',
  nav_cv: 'Utwórz CV',
  nav_office: 'Office Pack',
  nav_resources: 'Zasoby',
  nav_rights: 'Prawa i pomoc',
  nav_contacts: 'Kontakty',
  hero_title: 'Otwarte dłonie',
  hero_subtitle: 'Twój most do sztucznej inteligencji, pracy i Twoich praw w Hiszpanii',
  hero_cta_start: 'Utwórz moje CV',
  hero_cta_learn: 'Ucz się AI za darmo',
  home_welcome: 'Witamy w Manos Abiertas',
  home_mission: 'Nasza misja',
  home_mission_text: 'Pomagamy osobom imigranckim w Hiszpanii korzystać ze sztucznej inteligencji, tworzyć profesjonalne CV i poznawać swoje prawa oraz dostępne zasoby. Wszystko w Twoim języku, prosto i za darmo.',
  home_forWho: 'Dla kogo to jest?',
  home_forWho_text: 'Dla wszystkich osób przyjeżdżających do Hiszpanii, które chcą się uczyć, pracować i znać swoje prawa. Nie potrzebujesz żadnej wiedzy: jeśli umiesz używać WhatsApp, poradzisz sobie z tą stroną.',
  ai_title: 'Naucz się sztucznej inteligencji',
  ai_subtitle: 'Bezpłatne praktyczne kursy, aby korzystać z najlepszych AI: ChatGPT, Gemini, Qwen, Copilot, DeepSeek i więcej',
  cv_title: 'Utwórz CV z AI',
  cv_subtitle: 'Wygeneruj profesjonalne CV w kilka minut z pomocą sztucznej inteligencji',
  office_title: 'Kompletny kurs Office',
  office_subtitle: 'Opanuj Word, Excel i PowerPoint od podstaw',
  resources_title: 'Katalog zasobów',
  resources_subtitle: 'Katalog zasobów ze źródłami i widocznym statusem weryfikacji',
  rights_title: 'Prawa i pomoc',
  rights_subtitle: 'Wszystko, co musisz wiedzieć, aby godnie żyć w Hiszpanii',
  footer_madeWith: 'Zrobione z miłością dla społeczności imigranckiej',
  footer_disclaimer: 'Każdy wpis podaje źródło i datę, jeśli są dostępne. To nie jest porada prawna.',
  footer_rights: 'Manos Abiertas © 2025 · Darmowy i otwarty dostęp',
};

const bg: UITranslations = {
  ...en,
  nav_home: 'Начало',
  nav_learnAI: 'Учи ИИ',
  nav_cv: 'Създай CV',
  nav_office: 'Office Pack',
  nav_resources: 'Ресурси',
  nav_rights: 'Права и помощ',
  nav_contacts: 'Контакти',
  hero_title: 'Отворени ръце',
  hero_subtitle: 'Вашият мост към изкуствения интелект, работата и вашите права в Испания',
  hero_cta_start: 'Създай моето CV',
  hero_cta_learn: 'Учи ИИ безплатно',
  home_welcome: 'Добре дошли в Manos Abiertas',
  home_mission: 'Нашата мисия',
  home_mission_text: 'Помагаме на имигранти в Испания да използват изкуствения интелект, да създадат професионално CV и да научат правата си и наличните ресурси. Всичко на вашия език, лесно и безплатно.',
  home_forWho: 'За кого е?',
  home_forWho_text: 'За всички хора, които пристигат в Испания и искат да се учат, работят и знаят правата си. Не са нужни предварителни знания: ако можете да използвате WhatsApp, можете да използвате и този сайт.',
  ai_title: 'Учете изкуствен интелект',
  ai_subtitle: 'Безплатни практически курсове за най-добрите ИИ: ChatGPT, Gemini, Qwen, Copilot, DeepSeek и други',
  cv_title: 'Създайте CV с ИИ',
  cv_subtitle: 'Създайте професионално CV за минути с помощта на изкуствения интелект',
  office_title: 'Пълен курс по Office',
  office_subtitle: 'Овладейте Word, Excel и PowerPoint от нулата',
  resources_title: 'Каталог с ресурси',
  resources_subtitle: 'Каталог с ресурси, източници и видим статус на проверка',
  rights_title: 'Права и помощ',
  rights_subtitle: 'Всичко, което трябва да знаете, за да живеете в Испания с достойнство',
  footer_madeWith: 'Направено с любов за имигрантската общност',
  footer_disclaimer: 'Всеки запис посочва източник и дата, когато са налични. Не е правен съвет.',
  footer_rights: 'Manos Abiertas © 2025 · Свободен и безплатен достъп',
};

const nl: UITranslations = {
  ...en,
  nav_home: 'Home',
  nav_learnAI: 'AI leren',
  nav_cv: 'CV maken',
  nav_office: 'Office Pack',
  nav_resources: 'Bronnen',
  nav_rights: 'Rechten & hulp',
  nav_contacts: 'Contacten',
  hero_title: 'Open handen',
  hero_subtitle: 'Jouw brug naar kunstmatige intelligentie, werk en jouw rechten in Spanje',
  hero_cta_start: 'Mijn CV maken',
  hero_cta_learn: 'Gratis AI leren',
  home_welcome: 'Welkom bij Manos Abiertas',
  home_mission: 'Onze missie',
  home_mission_text: 'We helpen immigranten in Spanje om kunstmatige intelligentie te gebruiken, een professioneel CV te maken en hun rechten en beschikbare middelen te leren kennen. Alles in jouw taal, eenvoudig en gratis.',
  home_forWho: 'Voor wie is dit?',
  home_forWho_text: 'Voor iedereen die naar Spanje komt en wil leren, werken en zijn rechten kennen. Je hebt geen voorkennis nodig: als je WhatsApp kunt gebruiken, kun je deze website ook gebruiken.',
  ai_title: 'Leer kunstmatige intelligentie',
  ai_subtitle: 'Gratis praktische cursussen om de beste AI\'s te gebruiken: ChatGPT, Gemini, Qwen, Copilot, DeepSeek en meer',
  cv_title: 'Maak je CV met AI',
  cv_subtitle: 'Genereer in minuten een professioneel CV met behulp van kunstmatige intelligentie',
  office_title: 'Complete Office-cursus',
  office_subtitle: 'Beheers Word, Excel en PowerPoint vanaf nul',
  resources_title: 'Bronnenmap',
  resources_subtitle: 'Catalogus met bronnen en zichtbare beoordelingsstatus',
  rights_title: 'Rechten & hulp',
  rights_subtitle: 'Alles wat je moet weten om waardig in Spanje te leven',
  footer_madeWith: 'Gemaakt met liefde voor de migrantengemeenschap',
  footer_disclaimer: 'Elke vermelding toont bron en datum indien beschikbaar. Geen juridisch advies.',
  footer_rights: 'Manos Abiertas © 2025 · Vrij en gratis toegankelijk',
};

const el: UITranslations = {
  ...en,
  nav_home: 'Αρχική',
  nav_learnAI: 'Μάθε AI',
  nav_cv: 'Δημιούργησε βιογραφικό',
  nav_office: 'Office Pack',
  nav_resources: 'Πόροι',
  nav_rights: 'Δικαιώματα & βοήθεια',
  nav_contacts: 'Επαφές',
  hero_title: 'Ανοιχτά χέρια',
  hero_subtitle: 'Η γέφυρά σου προς την τεχνητή νοημοσύνη, την εργασία και τα δικαιώματά σου στην Ισπανία',
  hero_cta_start: 'Δημιούργησε το βιογραφικό μου',
  hero_cta_learn: 'Μάθε AI δωρεάν',
  home_welcome: 'Καλώς ήρθες στο Manos Abiertas',
  home_mission: 'Η αποστολή μας',
  home_mission_text: 'Βοηθάμε μετανάστες στην Ισπανία να αξιοποιήσουν την τεχνητή νοημοσύνη, να δημιουργήσουν επαγγελματικό βιογραφικό και να γνωρίσουν τα δικαιώματα και τους διαθέσιμους πόρους. Όλα στη γλώσσα σου, απλά και δωρεάν.',
  home_forWho: 'Σε ποιους απευθύνεται;',
  home_forWho_text: 'Σε όλους όσους έρχονται στην Ισπανία και θέλουν να μάθουν, να εργαστούν και να γνωρίσουν τα δικαιώματά τους. Δεν χρειάζονται προηγούμενες γνώσεις: αν ξέρεις να χρησιμοποιείς το WhatsApp, μπορείς να χρησιμοποιήσεις και αυτόν τον ιστότοπο.',
  ai_title: 'Μάθε Τεχνητή Νοημοσύνη',
  ai_subtitle: 'Δωρεάν πρακτικά μαθήματα για τις καλύτερες AI: ChatGPT, Gemini, Qwen, Copilot, DeepSeek και άλλα',
  cv_title: 'Δημιούργησε βιογραφικό με AI',
  cv_subtitle: 'Δημιούργησε επαγγελματικό βιογραφικό σε λίγα λεπτά με τη βοήθεια τεχνητής νοημοσύνης',
  office_title: 'Πλήρες μάθημα Office',
  office_subtitle: 'Κατέκτησε Word, Excel και PowerPoint από το μηδέν',
  resources_title: 'Κατάλογος πόρων',
  resources_subtitle: 'Κατάλογος πόρων με πηγές και ορατή κατάσταση ελέγχου',
  rights_title: 'Δικαιώματα & βοήθεια',
  rights_subtitle: 'Όλα όσα πρέπει να ξέρεις για να ζήσεις στην Ισπανία με αξιοπρέπεια',
  footer_madeWith: 'Φτιαγμένο με αγάπη για τη μεταναστευτική κοινότητα',
  footer_disclaimer: 'Κάθε καταχώριση δείχνει πηγή και ημερομηνία όταν υπάρχουν. Δεν αποτελεί νομική συμβουλή.',
  footer_rights: 'Manos Abiertas © 2025 · Ελεύθερη και δωρεάν πρόσβαση',
};

const tr: UITranslations = {
  ...en,
  nav_home: 'Ana Sayfa',
  nav_learnAI: 'Yapay Zekâ Öğren',
  nav_cv: 'CV Oluştur',
  nav_office: 'Office Paketi',
  nav_resources: 'Kaynaklar',
  nav_rights: 'Haklar ve Yardım',
  nav_contacts: 'İletişim',
  hero_title: 'Açık Eller',
  hero_subtitle: 'İspanya\'da yapay zekâya, işe ve haklarına açılan köprün',
  hero_cta_start: 'CV\'mi oluştur',
  hero_cta_learn: 'Yapay zekâyı ücretsiz öğren',
  home_welcome: 'Manos Abiertas\'a hoş geldin',
  home_mission: 'Misyonumuz',
  home_mission_text: 'İspanya\'daki göçmenlerin yapay zekâdan yararlanmasına, profesyonel CV oluşturmasına ve haklarını ve mevcut kaynakları öğrenmesine yardımcı oluyoruz. Her şey senin dilinde, basit ve ücretsiz.',
  home_forWho: 'Kimler için?',
  home_forWho_text: 'İspanya\'ya gelip öğrenmek, çalışmak ve haklarını bilmek isteyen herkes için. Ön bilgi gerekmez: WhatsApp kullanabiliyorsan, bu siteyi de kullanabilirsin.',
  ai_title: 'Yapay Zekâyı Öğren',
  ai_subtitle: 'En iyi yapay zekâları kullanmak için ücretsiz pratik kurslar: ChatGPT, Gemini, Qwen, Copilot, DeepSeek ve daha fazlası',
  cv_title: 'Yapay Zekâ ile CV Oluştur',
  cv_subtitle: 'Yapay zekâ yardımıyla dakikalar içinde profesyonel CV oluştur',
  office_title: 'Kapsamlı Office Kursu',
  office_subtitle: 'Word, Excel ve PowerPoint\'i sıfırdan öğren',
  resources_title: 'Kaynak Rehberi',
  resources_subtitle: 'Kaynakları ve görünür inceleme durumu olan kaynak kataloğu',
  rights_title: 'Haklar ve Yardım',
  rights_subtitle: 'İspanya\'da onurlu bir şekilde yaşamak için bilmen gereken her şey',
  footer_madeWith: 'Göçmen topluluğu için sevgiyle yapıldı',
  footer_disclaimer: 'Her kayıt, mevcut olduğunda kaynak ve tarih gösterir. Hukuki tavsiye değildir.',
  footer_rights: 'Manos Abiertas © 2025 · Ücretsiz ve açık erişim',
};

const ur: UITranslations = {
  ...en,
  nav_home: 'ہوم',
  nav_learnAI: 'AI سیکھیں',
  nav_cv: 'CV بنائیں',
  nav_office: 'آفس پیک',
  nav_resources: 'وسائل',
  nav_rights: 'حقوق اور امداد',
  nav_contacts: 'رابطے',
  hero_title: 'کھلے ہاتھ',
  hero_subtitle: 'اسپین میں مصنوعی ذہانت، روزگار اور آپ کے حقوق تک آپ کا پل',
  hero_cta_start: 'میرا CV بنائیں',
  hero_cta_learn: 'مفت AI سیکھیں',
  home_welcome: 'Manos Abiertas میں خوش آمدید',
  home_mission: 'ہماری مشن',
  home_mission_text: 'ہم اسپین میں تارکین وطن کی مدد کرتے ہیں کہ وہ مصنوعی ذہانت سے فائدہ اٹھائیں، پیشہ ورانہ CV بنائیں اور اپنے حقوق اور دستیاب وسائل جانیں۔ سب کچھ آپ کی زبان میں، آسان اور مفت۔',
  home_forWho: 'یہ کس کے لیے ہے؟',
  home_forWho_text: 'ان تمام لوگوں کے لیے جو اسپین آتے ہیں اور سیکھنا، کام کرنا اور اپنے حقوق جاننا چاہتے ہیں۔ پہلے سے علم کی ضرورت نہیں: اگر آپ WhatsApp استعمال کر سکتے ہیں، تو آپ یہ ویب سائٹ بھی استعمال کر سکتے ہیں۔',
  ai_title: 'مصنوعی ذہانت سیکھیں',
  ai_subtitle: 'بہترین AIs استعمال کرنے کے لیے مفت عملی کورسز: ChatGPT، Gemini، Qwen، Copilot، DeepSeek اور مزید',
  cv_title: 'AI کے ساتھ CV بنائیں',
  cv_subtitle: 'مصنوعی ذہانت کی مدد سے منٹوں میں پیشہ ورانہ CV بنائیں',
  office_title: 'مکمل آفس کورس',
  office_subtitle: 'Word، Excel اور PowerPoint کو شروع سے سیکھیں',
  resources_title: 'وسائل کی ڈائرکٹری',
  resources_subtitle: 'ذرائع اور واضح جائزہ حیثیت کے ساتھ وسائل کی فہرست',
  rights_title: 'حقوق اور امداد',
  rights_subtitle: 'اسپین میں عزت کے ساتھ رہنے کے لیے آپ کو جاننے کی ضرورت ہے',
  footer_madeWith: 'تارکین وطن کی کمیونٹی کے لیے محبت سے بنایا گیا',
  footer_disclaimer: 'ہر اندراج میں دستیاب ہونے پر ذریعہ اور تاریخ دکھائی جاتی ہے۔ یہ قانونی مشورہ نہیں ہے۔',
  footer_rights: 'Manos Abiertas © 2025 · مفت اور کھلی رسائی',
};

const fa: UITranslations = {
  ...en,
  nav_home: 'خانه',
  nav_learnAI: 'یادگیری هوش مصنوعی',
  nav_cv: 'ساخت رزومه',
  nav_office: 'بسته آفیس',
  nav_resources: 'منابع',
  nav_rights: 'حقوق و کمک',
  nav_contacts: 'تماس‌ها',
  hero_title: 'دست‌های باز',
  hero_subtitle: 'پل شما به هوش مصنوعی، کار و حقوقتان در اسپانیا',
  hero_cta_start: 'رزومه من را بساز',
  hero_cta_learn: 'یادگیری رایگان هوش مصنوعی',
  home_welcome: 'به Manos Abiertas خوش آمدید',
  home_mission: 'ماموریت ما',
  home_mission_text: 'ما به مهاجران در اسپانیا کمک می‌کنیم از هوش مصنوعی بهره ببرند، رزومه حرفه‌ای بسازند و حقوق و منابع موجود را بشناسند. همه چیز به زبان شما، ساده و رایگان.',
  home_forWho: 'برای چه کسانی است؟',
  home_forWho_text: 'برای همه افرادی که به اسپانیا می‌آیند و می‌خواهند یاد بگیرند، کار کنند و حقوق خود را بدانند. دانش قبلی لازم نیست: اگر می‌توانید از واتس‌اپ استفاده کنید، می‌توانید از این وب‌سایت هم استفاده کنید.',
  ai_title: 'هوش مصنوعی را بیاموزید',
  ai_subtitle: 'دوره‌های رایگان و عملی برای استفاده از بهترین هوش مصنوعی‌ها: ChatGPT، Gemini، Qwen، Copilot، DeepSeek و بیشتر',
  cv_title: 'رزومه را با هوش مصنوعی بسازید',
  cv_subtitle: 'در چند دقیقه با کمک هوش مصنوعی رزومه حرفه‌ای بسازید',
  office_title: 'دوره کامل آفیس',
  office_subtitle: 'Word، Excel و PowerPoint را از صفر بیاموزید',
  resources_title: 'فهرست منابع',
  resources_subtitle: 'فهرست منابع با ذکر منبع و وضعیت بازبینی قابل مشاهده',
  rights_title: 'حقوق و کمک',
  rights_subtitle: 'هر آنچه برای زندگی با عزت در اسپانیا باید بدانید',
  footer_madeWith: 'با عشق برای جامعه مهاجر ساخته شده',
  footer_disclaimer: 'هر مورد در صورت وجود، منبع و تاریخ را نشان می‌دهد. این مشاوره حقوقی نیست.',
  footer_rights: 'Manos Abiertas © 2025 · دسترسی آزاد و رایگان',
};

const bn: UITranslations = {
  ...en,
  nav_home: 'হোম',
  nav_learnAI: 'AI শিখুন',
  nav_cv: 'সিভি তৈরি করুন',
  nav_office: 'অফিস প্যাক',
  nav_resources: 'সম্পদ',
  nav_rights: 'অধিকার ও সহায়তা',
  nav_contacts: 'যোগাযোগ',
  hero_title: 'খোলা হাত',
  hero_subtitle: 'স্পেনে কৃত্রিম বুদ্ধিমত্তা, চাকরি এবং আপনার অধিকারের সেতু',
  hero_cta_start: 'আমার সিভি তৈরি করুন',
  hero_cta_learn: 'বিনামূল্যে AI শিখুন',
  home_welcome: 'Manos Abiertas-এ স্বাগতম',
  home_mission: 'আমাদের লক্ষ্য',
  home_mission_text: 'আমরা স্পেনের অভিবাসীদের কৃত্রিম বুদ্ধিমত্তা ব্যবহার করতে, পেশাদার সিভি তৈরি করতে এবং তাদের অধিকার ও উপলব্ধ সম্পদ জানতে সাহায্য করি। সবকিছু আপনার ভাষায়, সহজ এবং বিনামূল্যে।',
  home_forWho: 'এটি কার জন্য?',
  home_forWho_text: 'সবাই যারা স্পেনে এসে শিখতে, কাজ করতে এবং তাদের অধিকার জানতে চান তাদের জন্য। পূর্ব জ্ঞানের প্রয়োজন নেই: আপনি যদি WhatsApp ব্যবহার করতে পারেন, আপনি এই ওয়েবসাইটও ব্যবহার করতে পারবেন।',
  ai_title: 'কৃত্রিম বুদ্ধিমত্তা শিখুন',
  ai_subtitle: 'সেরা AI ব্যবহারের জন্য বিনামূল্যে ব্যবহারিক কোর্স: ChatGPT, Gemini, Qwen, Copilot, DeepSeek এবং আরও',
  cv_title: 'AI দিয়ে সিভি তৈরি করুন',
  cv_subtitle: 'কৃত্রিম বুদ্ধিমত্তার সাহায্যে মিনিটে পেশাদার সিভি তৈরি করুন',
  office_title: 'সম্পূর্ণ অফিস কোর্স',
  office_subtitle: 'Word, Excel এবং PowerPoint শুরু থেকে শিখুন',
  resources_title: 'সম্পদ ডিরেক্টরি',
  resources_subtitle: 'উৎস ও দৃশ্যমান পর্যালোচনা অবস্থাসহ রিসোর্স ক্যাটালগ',
  rights_title: 'অধিকার ও সহায়তা',
  rights_subtitle: 'স্পেনে মর্যাদার সাথে বাঁচতে যা জানা দরকার',
  footer_madeWith: 'অভিবাসী সম্প্রদায়ের জন্য ভালোবাসা দিয়ে তৈরি',
  footer_disclaimer: 'প্রতিটি এন্ট্রিতে উপলভ্য থাকলে উৎস ও তারিখ দেখানো হয়। এটি আইনি পরামর্শ নয়।',
  footer_rights: 'Manos Abiertas © 2025 · মুক্ত ও বিনামূল্যে প্রবেশাধিকার',
};

const vi: UITranslations = {
  ...en,
  nav_home: 'Trang chủ',
  nav_learnAI: 'Học AI',
  nav_cv: 'Tạo CV',
  nav_office: 'Office Pack',
  nav_resources: 'Tài nguyên',
  nav_rights: 'Quyền lợi & Trợ giúp',
  nav_contacts: 'Liên hệ',
  hero_title: 'Vòng tay mở rộng',
  hero_subtitle: 'Cầu nối của bạn đến trí tuệ nhân tạo, việc làm và quyền lợi của bạn tại Tây Ban Nha',
  hero_cta_start: 'Tạo CV của tôi',
  hero_cta_learn: 'Học AI miễn phí',
  home_welcome: 'Chào mừng đến với Manos Abiertas',
  home_mission: 'Sứ mệnh của chúng tôi',
  home_mission_text: 'Chúng tôi giúp người nhập cư ở Tây Ban Nha sử dụng trí tuệ nhân tạo, tạo CV chuyên nghiệp và biết quyền lợi cũng như các nguồn lực sẵn có. Tất cả bằng ngôn ngữ của bạn, đơn giản và miễn phí.',
  home_forWho: 'Dành cho ai?',
  home_forWho_text: 'Dành cho tất cả những người đến Tây Ban Nha và muốn học tập, làm việc và biết quyền lợi của mình. Bạn không cần kiến thức trước: nếu bạn biết dùng WhatsApp, bạn có thể dùng trang web này.',
  ai_title: 'Học Trí tuệ nhân tạo',
  ai_subtitle: 'Các khóa học thực hành miễn phí để sử dụng những AI tốt nhất: ChatGPT, Gemini, Qwen, Copilot, DeepSeek và hơn thế nữa',
  cv_title: 'Tạo CV với AI',
  cv_subtitle: 'Tạo CV chuyên nghiệp trong vài phút với sự trợ giúp của trí tuệ nhân tạo',
  office_title: 'Khóa học Office đầy đủ',
  office_subtitle: 'Làm chủ Word, Excel và PowerPoint từ con số không',
  resources_title: 'Danh mục tài nguyên',
  resources_subtitle: 'Danh mục tài nguyên có nguồn và trạng thái đánh giá hiển thị',
  rights_title: 'Quyền lợi & Trợ giúp',
  rights_subtitle: 'Mọi điều bạn cần biết để sống ở Tây Ban Nha với phẩm giá',
  footer_madeWith: 'Được tạo bằng tình yêu cho cộng đồng người nhập cư',
  footer_disclaimer: 'Mỗi mục hiển thị nguồn và ngày khi có. Không phải là tư vấn pháp lý.',
  footer_rights: 'Manos Abiertas © 2025 · Truy cập miễn phí và mở',
};

const tl: UITranslations = {
  ...en,
  nav_home: 'Tahanan',
  nav_learnAI: 'Matuto ng AI',
  nav_cv: 'Gumawa ng CV',
  nav_office: 'Office Pack',
  nav_resources: 'Mga mapagkukunan',
  nav_rights: 'Karapatan at Tulong',
  nav_contacts: 'Mga contact',
  hero_title: 'Bukas na mga kamay',
  hero_subtitle: 'Ang iyong tulay patungo sa artificial intelligence, trabaho at iyong mga karapatan sa Espanya',
  hero_cta_start: 'Gawin ang aking CV',
  hero_cta_learn: 'Matuto ng AI nang libre',
  home_welcome: 'Maligayang pagdating sa Manos Abiertas',
  home_mission: 'Ang aming misyon',
  home_mission_text: 'Tumutulong kami sa mga imigrante sa Espanya na magamit ang artificial intelligence, gumawa ng propesyonal na CV at malaman ang kanilang mga karapatan at magagamit na mapagkukunan. Lahat sa iyong wika, simple at libre.',
  home_forWho: 'Para kanino ito?',
  home_forWho_text: 'Para sa lahat ng dumarating sa Espanya at gustong matuto, magtrabaho at malaman ang kanilang mga karapatan. Hindi mo kailangan ng dating kaalaman: kung marunong kang gumamit ng WhatsApp, magagamit mo ang website na ito.',
  ai_title: 'Matuto ng Artipisyal na Katalinuhan',
  ai_subtitle: 'Libreng praktikal na kurso upang gamitin ang pinakamahusay na AI: ChatGPT, Gemini, Qwen, Copilot, DeepSeek at iba pa',
  cv_title: 'Gumawa ng CV gamit ang AI',
  cv_subtitle: 'Gumawa ng propesyonal na CV sa ilang minuto sa tulong ng artificial intelligence',
  office_title: 'Kumpletong kurso sa Office',
  office_subtitle: 'Alamin ang Word, Excel at PowerPoint mula sa simula',
  resources_title: 'Direktoryo ng mapagkukunan',
  resources_subtitle: 'Katalogo ng mga mapagkukunan na may pinagmulan at nakikitang estado ng pagsusuri',
  rights_title: 'Karapatan at Tulong',
  rights_subtitle: 'Lahat ng kailangan mong malaman upang mabuhay nang may dignidad sa Espanya',
  footer_madeWith: 'Ginawa nang may pagmamahal para sa komunidad ng mga imigrante',
  footer_disclaimer: 'Ipinapakita ng bawat tala ang pinagmulan at petsa kapag mayroon. Hindi ito legal na payo.',
  footer_rights: 'Manos Abiertas © 2025 · Libre at bukas na pag-access',
};

const sw: UITranslations = {
  ...en,
  nav_home: 'Nyumbani',
  nav_learnAI: 'Jifunze AI',
  nav_cv: 'Unda CV',
  nav_office: 'Office Pack',
  nav_resources: 'Rasilimali',
  nav_rights: 'Haki na Msaada',
  nav_contacts: 'Wasiliana',
  hero_title: 'Mikono wazi',
  hero_subtitle: 'Daraja lako kwenda akili ya bandia, ajira na haki zako nchini Uhispania',
  hero_cta_start: 'Unda CV yangu',
  hero_cta_learn: 'Jifunze AI bila malipo',
  home_welcome: 'Karibu Manos Abiertas',
  home_mission: 'Dhamira yetu',
  home_mission_text: 'Tunasaidia wahamiaji nchini Uhispania kutumia akili ya bandia, kuunda CV ya kitaalamu na kujua haki zao na rasilimali zilizopo. Yote kwa lugha yako, kwa urahisi na bila malipo.',
  home_forWho: 'Ni kwa ajili ya nani?',
  home_forWho_text: 'Kwa kila mtu anayefika Uhispania na anataka kujifunza, kufanya kazi na kujua haki zake. Huna haja ya maarifa ya awali: ukiweza kutumia WhatsApp, unaweza kutumia tovuti hii pia.',
  ai_title: 'Jifunze Akili ya Bandia',
  ai_subtitle: 'Kozi za bure za vitendo za kutumia AI bora: ChatGPT, Gemini, Qwen, Copilot, DeepSeek na zaidi',
  cv_title: 'Unda CV kwa AI',
  cv_subtitle: 'Unda CV ya kitaalamu kwa dakika chache kwa msaada wa akili ya bandia',
  office_title: 'Kozi kamili ya Office',
  office_subtitle: 'Jifunze Word, Excel na PowerPoint kutoka mwanzo',
  resources_title: 'Saraka ya rasilimali',
  resources_subtitle: 'Orodha ya rasilimali yenye vyanzo na hali ya ukaguzi inayoonekana',
  rights_title: 'Haki na Msaada',
  rights_subtitle: 'Kila unachohitaji kujua ili kuishi Uhispania kwa heshima',
  footer_madeWith: 'Imefanywa kwa upendo kwa jamii ya wahamiaji',
  footer_disclaimer: 'Kila ingizo huonyesha chanzo na tarehe vinapopatikana. Sio ushauri wa kisheria.',
  footer_rights: 'Manos Abiertas © 2025 · Upatikanaji wa bure na wazi',
};

export const translations: Partial<Record<LanguageCode, UITranslations>> = {
  es,
  en,
  ca,
  'pt-BR': ptBR,
  pt: ptBR,
  fr,
  ar,
  zh,
  hi,
  qu,
  ro,
  uk,
  de,
  it,
  ru,
  pl,
  bg,
  nl,
  el,
  tr,
  ur,
  fa,
  bn,
  vi,
  tl,
  sw,
};

export type TranslationStatus = 'complete' | 'partial' | 'beta';

export interface TranslationCoverage {
  code: LanguageCode;
  status: TranslationStatus;
  dictionaryAvailable: boolean;
  translatedKeyCount: number;
  totalKeyCount: number;
  percentage: number;
  fallbackCode: 'es' | 'en' | null;
}

const SPANISH_BASED_DICTIONARIES = new Set<LanguageCode>(['ca', 'qu']);

function getFallbackCode(lang: LanguageCode): 'es' | 'en' {
  return SPANISH_BASED_DICTIONARIES.has(lang) || !translations[lang] ? 'es' : 'en';
}

export function getTranslationCoverage(lang: LanguageCode): TranslationCoverage {
  const totalKeyCount = Object.keys(es).length;

  if (lang === 'es' || lang === 'en') {
    return {
      code: lang,
      status: 'complete',
      dictionaryAvailable: true,
      translatedKeyCount: totalKeyCount,
      totalKeyCount,
      percentage: 100,
      fallbackCode: null,
    };
  }

  const dictionary = translations[lang];
  const fallbackCode = getFallbackCode(lang);
  if (!dictionary) {
    return {
      code: lang,
      status: 'beta',
      dictionaryAvailable: false,
      translatedKeyCount: 0,
      totalKeyCount,
      percentage: 0,
      fallbackCode,
    };
  }

  const fallback = fallbackCode === 'es' ? es : en;
  const translatedKeyCount = (Object.keys(es) as Array<keyof UITranslations>)
    .filter((key) => dictionary[key] !== fallback[key]).length;

  return {
    code: lang,
    status: 'partial',
    dictionaryAvailable: true,
    translatedKeyCount,
    totalKeyCount,
    percentage: Math.round((translatedKeyCount / totalKeyCount) * 100),
    fallbackCode,
  };
}

export function getTranslation(lang: LanguageCode): UITranslations {
  return translations[lang] ?? es;
}
