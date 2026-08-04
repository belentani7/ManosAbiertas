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
  resources_subtitle: 'Más de 3000 enlaces verificados: gobierno, ONGs, empleo, sanidad y más',
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

  footer_madeWith: 'Hecho con cariño para la comunidad inmigrante',
  footer_disclaimer: 'Información verificada de fuentes oficiales. No es asesoramiento legal.',
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
  resources_subtitle: 'Over 3000 verified links: government, NGOs, jobs, health and more',
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

  footer_madeWith: 'Made with love for the immigrant community',
  footer_disclaimer: 'Verified information from official sources. Not legal advice.',
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

export const translations: Record<string, UITranslations> = {
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
};

export function getTranslation(lang: LanguageCode): UITranslations {
  return translations[lang] || translations[lang.split('-')[0]] || es;
}
