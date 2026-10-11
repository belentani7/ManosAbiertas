// Manos Abiertas — Motor de itinerarios personales (Human Journey Engine).
// Catálogo de itinerarios con objetivo, prerrequisitos, esfuerzo, actividades
// con acceso real a secciones/herramientas existentes, fuentes verificadas y
// resultado esperado. El progreso se guarda sin registro en localStorage
// (ver parseSavedRoute / serializeSavedRoute).
// Contenido localizado en las 4 lenguas prioritarias: PT > ES > EN > CA.
import type { SectionId } from '../stores/app-store.ts';

export type LocalizedText = { es: string; pt: string; en: string; ca: string };
export type LocalizedPair = { es: string; en: string };

export type JourneyRef = { label: string; url: string };

export interface JourneyActivity {
  id: string;
  title: LocalizedPair;
  description: LocalizedPair;
  /** Sección de la app a la que lleva la actividad (navegación interna). */
  section?: SectionId;
  /** Enlace externo o ruta directa alternativa a la sección. */
  href?: string;
  /** Material de referencia verificado (URLs oficiales o documentadas). */
  verifiedRefs?: JourneyRef[];
}

export interface Journey {
  id: string;
  title: LocalizedText;
  objective: LocalizedText;
  prerequisites: LocalizedText;
  effort: LocalizedText;
  outcome: LocalizedText;
  activities: JourneyActivity[];
}

const CAMPUS = 'https://belentani7.github.io/ManosAbiertas/campus/';
const APP = 'https://manos-abiertas-psi.vercel.app';

function t(es: string, pt: string, en: string, ca: string): LocalizedText {
  return { es, pt, en, ca };
}

function p(es: string, en: string): LocalizedPair {
  return { es, en };
}

/**
 * Itinerarios recomendados. Cada actividad apunta a funcionalidad REAL de la
 * plataforma (secciones existentes o contenido publicado); ninguna es decorativa.
 */
export const JOURNEYS: Journey[] = [
  {
    id: 'primeras-24h',
    title: t('Primeras 24 horas en un país nuevo', 'Primeiras 24 horas num país novo', 'First 24 hours in a new country', 'Primeres 24 hores en un país nou'),
    objective: t('Resolver lo urgente: contactos, trámites inmediatos y ayuda cerca de ti.', 'Resolver o urgente: contactos, trâmites imediatos e ajuda perto de ti.', 'Handle the urgent stuff: contacts, immediate paperwork and nearby help.', 'Resoldre l’urgent: contactes, tràmits immediats i ajuda a prop.'),
    prerequisites: t('Ninguno. Solo un móvil con conexión (aunque sea lenta).', 'Nenhum. Só um telemóvel com ligação (mesmo lenta).', 'None. Just a phone with a connection (even a slow one).', 'Cap. Només un mòbil amb connexió (encara que sigui lenta).'),
    effort: t('15 minutos por sesión · 1 día', '15 minutos por sessão · 1 dia', '15 minutes per session · 1 day', '15 minuts per sessió · 1 dia'),
    outcome: t('Tendrás guardados los teléfonos de emergencia, una lista de trámites prioritarios y recursos de confianza.', 'Terás guardados os telefones de emergência, uma lista de trâmites prioritários e recursos de confiança.', 'You will have emergency phones saved, a priority paperwork list and trusted resources.', 'Tindràs desats els telèfons d’emergència, una llista de tràmits prioritaris i recursos de confiança.'),
    activities: [
      {
        id: 'h24-contactos',
        title: p('Guarda los teléfonos de emergencia', 'Save emergency phone numbers'),
        description: p('112, sanidad, policía y ONGs con atención humana. Todo funciona con enlaces directos de llamada.', '112, health, police and NGOs with human support. Everything works with direct call links.'),
        section: 'contacts',
        verifiedRefs: [
          { label: 'Emergencias 112 (España)', url: 'https://www.112.es/' },
        ],
      },
      {
        id: 'h24-tramites',
        title: p('Anota tus 3 trámites más urgentes', 'Note down your 3 most urgent procedures'),
        description: p('Empadronamiento, sanidad y permiso de trabajo explicados en lenguaje sencillo.', 'Municipal registration, healthcare and work permit explained in plain language.'),
        section: 'rights',
      },
      {
        id: 'h24-recursos',
        title: p('Busca ayuda cerca de ti', 'Find help near you'),
        description: p('Directorio de recursos con fuente y fecha de verificación visible.', 'Resource directory with visible source and verification date.'),
        section: 'resources',
      },
      {
        id: 'h24-comunidad',
        title: p('Lee cómo lo hicieron otras personas', 'Read how other people did it'),
        description: p('Experiencias de la comunidad para no empezar de cero.', 'Community experiences so you do not start from scratch.'),
        section: 'community',
      },
    ],
  },
  {
    id: 'independencia-digital',
    title: t('Primeros 30 días de independencia digital', 'Primeiros 30 dias de independência digital', 'First 30 days of digital independence', 'Primers 30 dies d’independència digital'),
    objective: t('Usar móvil y ordenador con confianza para trámites, trabajo y comunicación.', 'Usar telemóvel e computador com confiança para trâmites, trabalho e comunicação.', 'Use phone and computer confidently for paperwork, work and communication.', 'Usar mòbil i ordinador amb confiança per a tràmits, feina i comunicació.'),
    prerequisites: t('Acceso a un móvil u ordenador, aunque sea compartido.', 'Acesso a um telemóvel ou computador, mesmo partilhado.', 'Access to a phone or computer, even shared.', 'Accés a un mòbil o ordinador, encara que sigui compartit.'),
    effort: t('20 minutos por día · 4 semanas', '20 minutos por dia · 4 semanas', '20 minutes per day · 4 weeks', '20 minuts per dia · 4 setmanes'),
    outcome: t('Sabrás crear documentos, buscar información fiable, protegerte de estafas y usar asistentes de IA.', 'Saberás criar documentos, procurar informação fiável, proteger-te de burlas e usar assistentes de IA.', 'You will know how to create documents, find reliable information, avoid scams and use AI assistants.', 'Sabràs crear documents, cercar informació fiable, protegir-te d’estafes i usar assistents d’IA.'),
    activities: [
      {
        id: 'digital-esencial',
        title: p('Maneja archivos, correo y búsquedas', 'Handle files, email and searches'),
        description: p('Lo esencial de ofimática explicado paso a paso, desde cero.', 'Office essentials explained step by step, from scratch.'),
        section: 'office',
        verifiedRefs: [{ label: 'Curso Office sin miedo (campus)', url: CAMPUS }],
      },
      {
        id: 'digital-ia',
        title: p('Haz tu primera pregunta útil a una IA', 'Ask your first useful question to an AI'),
        description: p('Aprende a pedir ayuda en tu idioma sin pagar nada.', 'Learn to ask for help in your language without paying anything.'),
        section: 'learn-ai',
      },
      {
        id: 'digital-tramites',
        title: p('Organiza tus trámites con herramientas', 'Organize your paperwork with tools'),
        description: p('Listas, recordatorios y calculadoras que funcionan sin registro.', 'Lists, reminders and calculators that work without registration.'),
        section: 'tools',
      },
      {
        id: 'digital-seguridad',
        title: p('Protégete de estafas y phishing', 'Protect yourself from scams and phishing'),
        description: p('Señales de alerta y qué hacer si sospechas.', 'Warning signs and what to do if you suspect a scam.'),
        section: 'rights',
      },
    ],
  },
  {
    id: 'primera-candidatura',
    title: t('Tu primera candidatura de empleo', 'A tua primeira candidatura de emprego', 'Your first job application', 'La teva primera candidatura de feina'),
    objective: t('Preparar y enviar tu primera candidatura con una presentación profesional.', 'Preparar e enviar a tua primeira candidatura com uma apresentação profissional.', 'Prepare and submit your first application with a professional presentation.', 'Preparar i enviar la teva primera candidatura amb una presentació professional.'),
    prerequisites: t('Saber escribir en tu idioma y tener acceso a internet algunos minutos al día.', 'Saber escrever na tua língua e ter acesso à internet alguns minutos por dia.', 'Be able to write in your language and have internet access a few minutes a day.', 'Saber escriure en la teva llengua i tenir accés a internet uns minuts al dia.'),
    effort: t('30 minutos por día · 2 semanas', '30 minutos por dia · 2 semanas', '30 minutes per day · 2 weeks', '30 minuts per dia · 2 setmanes'),
    outcome: t('Tendrás un CV, una carta de presentación y un método para buscar y presentarte a ofertas.', 'Terás um CV, uma carta de apresentação e um método para procurar e candidatar-te a ofertas.', 'You will have a CV, a cover letter and a method to search and apply for offers.', 'Tindràs un CV, una carta de presentació i un mètode per cercar i presentar-te a ofertes.'),
    activities: [
      {
        id: 'candidatura-cv',
        title: p('Crea tu CV con plantillas', 'Create your CV with templates'),
        description: p('Plantillas gratuitas y guía de contenido que funciona con filtros automáticos (ATS).', 'Free templates and content guidance that works with automatic filters (ATS).'),
        section: 'cv',
      },
      {
        id: 'candidatura-cartas',
        title: p('Escribe tu carta de presentación', 'Write your cover letter'),
        description: p('Generador con ejemplos reales; tú revisas y decides.', 'Generator with real examples; you review and decide.'),
        section: 'cv',
      },
      {
        id: 'candidatura-ia',
        title: p('Usa la IA para buscar ofertas', 'Use AI to search for job offers'),
        description: p('Cómo pedir ayuda a la IA para adaptar tu perfil a cada oferta.', 'How to ask AI for help adapting your profile to each offer.'),
        section: 'learn-ai',
      },
      {
        id: 'candidatura-formacion',
        title: p('Añade una habilidad que puedas demostrar', 'Add a skill you can demonstrate'),
        description: p('Elige una formación corta y termina un proyecto pequeño.', 'Pick a short course and finish a small project.'),
        section: 'courses',
      },
      {
        id: 'candidatura-entrevista',
        title: p('Prepara tu primera entrevista', 'Prepare for your first interview'),
        description: p('Preguntas frecuentes, respuestas y simulacro de práctica.', 'Common questions, answers and a practice run.'),
        section: 'tools',
      },
    ],
  },
  {
    id: 'primer-cv',
    title: t('Tu primer CV profesional', 'O teu primeiro CV profissional', 'Your first professional CV', 'El teu primer CV professional'),
    objective: t('Crear un CV claro, sin errores y listo para enviar desde el móvil.', 'Criar um CV claro, sem erros e pronto a enviar a partir do telemóvel.', 'Create a clear, error-free CV ready to send from your phone.', 'Crear un CV clar, sense errors i llest per enviar des del mòbil.'),
    prerequisites: t('Tus datos básicos de contacto y una idea de tu experiencia (aunque sea poca).', 'Os teus dados básicos de contacto e uma ideia da tua experiência (mesmo pouca).', 'Your basic contact details and an idea of your experience (even if little).', 'Les teves dades bàsiques de contacte i una idea de la teva experiència (encara que sigui poca).'),
    effort: t('30 minutos por día · 1 semana', '30 minutos por dia · 1 semana', '30 minutes per day · 1 week', '30 minuts per dia · 1 setmana'),
    outcome: t('Un CV exportable en PDF, con resumen profesional y descripciones de experiencia basadas en hechos.', 'Um CV exportável em PDF, com resumo profissional e descrições de experiência baseadas em factos.', 'An exportable PDF CV, with a professional summary and fact-based experience descriptions.', 'Un CV exportable en PDF, amb resum professional i descripcions d’experiència basades en fets.'),
    activities: [
      {
        id: 'cv-plantilla',
        title: p('Elige tu plantilla', 'Choose your template'),
        description: p('Plantillas pensadas para lectores automáticos y lectores humanos.', 'Templates designed for both automatic readers and human readers.'),
        section: 'cv',
      },
      {
        id: 'cv-contenido',
        title: p('Escribe tu contenido con ayuda', 'Write your content with help'),
        description: p('Frases y verbos de acción; la IA propone y tú confirmas.', 'Phrases and action verbs; AI drafts and you confirm.'),
        section: 'cv',
      },
      {
        id: 'cv-ats',
        title: p('Analiza tu CV con el verificador ATS', 'Analyze your CV with the ATS checker'),
        description: p('Puntuación, palabras clave faltantes y sugerencias concretas.', 'Score, missing keywords and concrete suggestions.'),
        section: 'cv',
      },
      {
        id: 'cv-exportar',
        title: p('Exporta y comparte tu CV', 'Export and share your CV'),
        description: p('Descarga en PDF lista para enviar por correo o WhatsApp.', 'Download a PDF ready to send by email or WhatsApp.'),
        section: 'cv',
      },
    ],
  },
  {
    id: 'catalan-100',
    title: t('Tus primeras 100 palabras de catalán', 'As tuas primeiras 100 palavras em catalão', 'Your first 100 words of Catalan', 'Les teves primeres 100 paraules de català'),
    objective: t('Entender y usar el catalán básico del día a día en Cataluña.', 'Entender e usar o catalão básico do dia a dia na Catalunha.', 'Understand and use basic everyday Catalan in Catalonia.', 'Entendre i usar el català bàsic del dia a dia a Catalunya.'),
    prerequisites: t('Ninguno. El falsos amigos PT-ES ayuda si hablas portugués.', 'Nenhuma. O falsos amigos PT-ES ajuda se falas português.', 'None. The PT-ES false friends course helps if you speak Portuguese.', 'Cap. El curs de falsos amics PT-ES ajuda si parles portuguès.'),
    effort: t('15 minutos por día · 3 semanas', '15 minutos por dia · 3 semanas', '15 minutes per day · 3 weeks', '15 minuts per dia · 3 setmanes'),
    outcome: t('Un vocabulario práctico para saludar, preguntar y desenvolverte en tiendas, transporte y trabajo.', 'Um vocabulário prático para saudar, perguntar e desenrascas-te em lojas, transporte e trabalho.', 'Practical vocabulary to greet, ask and get by in shops, transport and work.', 'Un vocabulari pràctic per saludar, preguntar i sortir-te bé a botigues, transport i feina.'),
    activities: [
      {
        id: 'cat-vocabulario',
        title: p('Aprende vocabulario esencial', 'Learn essential vocabulary'),
        description: p('Saludos, números, horarios y frases de supervivencia.', 'Greetings, numbers, schedules and survival phrases.'),
        section: 'courses',
        verifiedRefs: [{ label: 'Campus abierto ManosAbiertas', url: CAMPUS }],
      },
      {
        id: 'cat-falsos-amigos',
        title: p('Evita los falsos amigos PT-CAT-ES', 'Avoid PT-CAT-ES false friends'),
        description: p('Palabras que parecen iguales y significan otra cosa.', 'Words that look the same and mean something else.'),
        href: CAMPUS,
        verifiedRefs: [{ label: 'Curso falsos amigos PT-ES', url: CAMPUS }],
      },
      {
        id: 'cat-juego',
        title: p('Practica con el juego de catalán', 'Practice with the Catalan game'),
        description: p('Aprendizaje por juego, sin presión y sin cuenta.', 'Learning through play, no pressure and no account.'),
        href: CAMPUS,
      },
      {
        id: 'cat-trabajo',
        title: p('Simula una conversación de trabajo', 'Simulate a work conversation'),
        description: p('Diálogos prácticos para entrevistas y compañeros.', 'Practical dialogues for interviews and colleagues.'),
        section: 'tools',
      },
    ],
  },
  {
    id: 'digital-cero',
    title: t('Alfabetización digital desde cero', 'Alfabetização digital desde zero', 'Digital literacy from zero', 'Alfabetització digital des de zero'),
    objective: t('Empezar a usar la tecnología sin miedo, aunque nunca hayas tocado un ordenador.', 'Começar a usar a tecnologia sem medo, mesmo que nunca tenhas tocado num computador.', 'Start using technology without fear, even if you have never touched a computer.', 'Començar a usar la tecnologia sense por, encara que no hagis tocat mai un ordinador.'),
    prerequisites: t('Ninguno. Material pensado para personas con poca confianza digital.', 'Nenhum. Material pensado para pessoas com pouca confiança digital.', 'None. Material designed for people with low digital confidence.', 'Cap. Material pensat per a persones amb poca confiança digital.'),
    effort: t('15 minutos por día · 4 semanas', '15 minutos por dia · 4 semanas', '15 minutes per day · 4 weeks', '15 minuts per dia · 4 setmanes'),
    outcome: t('Encender el dispositivo, escribir, abrir el navegador y comunicarte por correo con seguridad.', 'Ligar o dispositivo, escrever, abrir o navegador e comunicar-te por correio com segurança.', 'Turn on the device, type, open the browser and communicate by email safely.', 'Encendre l’escriptori, escriure, obrir el navegador i comunicar-te per correu amb seguretat.'),
    activities: [
      {
        id: 'cero-movil',
        title: p('Conoce tu móvil u ordenador', 'Get to know your phone or computer'),
        description: p('Botones, pantalla, ajustes básicos y cómo no romper nada.', 'Buttons, screen, basic settings and how not to break anything.'),
        section: 'office',
      },
      {
        id: 'cero-correo',
        title: p('Crea y usa tu primer correo', 'Create and use your first email'),
        description: p('Paso a paso, con seguridad y sin letra pequeña.', 'Step by step, with security and no fine print.'),
        section: 'office',
        verifiedRefs: [{ label: 'Curso alfabetización IA (campus)', url: CAMPUS }],
      },
      {
        id: 'cero-formularios',
        title: p('Rellena un formulario en línea', 'Fill in an online form'),
        description: p('Qué significa cada campo y qué no debes rellenar nunca.', 'What each field means and what you should never fill in.'),
        section: 'tools',
      },
      {
        id: 'cero-seguridad',
        title: p('Aprende a no caer en estafas', 'Learn not to fall for scams'),
        description: p('Contraseñas, mensajes sospechosos y privacidad básica.', 'Passwords, suspicious messages and basic privacy.'),
        section: 'rights',
      },
    ],
  },
  {
    id: 'office-ia-empleo',
    title: t('Office e IA para el empleo', 'Office e IA para o emprego', 'Office and AI for employment', 'Office i IA per a la feina'),
    objective: t('Dominar las herramientas que piden las ofertas: documentos, hojas de cálculo y IA.', 'Dominar as ferramentas que as ofertas pedem: documentos, folhas de cálculo e IA.', 'Master the tools jobs ask for: documents, spreadsheets and AI.', 'Dominar les eines que demanen les ofertes: documents, fulls de càlcul i IA.'),
    prerequisites: t('Manejo básico de móvil u ordenador (itinerario de independencia digital).', 'Uso básico de telemóvel ou computador (itinerário de independência digital).', 'Basic use of phone or computer (digital independence journey).', 'Ús bàsic de mòbil o ordinador (itinerari d’independència digital).'),
    effort: t('30 minutos por día · 6 semanas', '30 minutos por dia · 6 semanas', '30 minutes per day · 6 weeks', '30 minuts per dia · 6 setmanes'),
    outcome: t('Un nivel de ofimática e IA suficiente para la mayoría de ofertas administrativas y de atención.', 'Um nível de Office e IA suficiente para a maioria das ofertas administrativas e de atendimento.', 'A level of Office and AI sufficient for most administrative and customer-facing offers.', 'Un nivell d’Office i IA suficient per a la majoria d’ofertes administratives i d’atenció.'),
    activities: [
      {
        id: 'oie-office',
        title: p('Completa el curso de Office', 'Complete the Office course'),
        description: p('Word, Excel y PowerPoint con ejercicios prácticos.', 'Word, Excel and PowerPoint with practical exercises.'),
        section: 'office',
        verifiedRefs: [{ label: 'Curso Office sin miedo (campus)', url: CAMPUS }],
      },
      {
        id: 'oie-ia',
        title: p('Aplica la IA a tareas reales', 'Apply AI to real tasks'),
        description: p('Correos, resúmenes, cálculos y presentaciones con IA responsable.', 'Emails, summaries, calculations and presentations with responsible AI.'),
        section: 'learn-ai',
      },
      {
        id: 'oie-proyectos',
        title: p('Termina 2 proyectos demostrables', 'Finish 2 demonstrable projects'),
        description: p('Un presupuesto y una presentación que puedes enseñar.', 'A budget and a presentation you can show.'),
        section: 'courses',
      },
    ],
  },
  {
    id: 'reskilling-tech',
    title: t('Recualificación tecnológica profesional', 'Recualificação tecnológica profissional', 'Professional technological reskilling', 'Recualificació tecnològica professional'),
    objective: t('Empezar un camino real hacia un empleo tecnológico, paso a paso.', 'Começar um caminho real para um emprego tecnológico, passo a passo.', 'Start a real path toward a tech job, step by step.', 'Començar un camí real cap a una feina tecnològica, pas a pas.'),
    prerequisites: t('Constancia más que conocimientos previos: 30 minutos al día valen más que un fin de semana.', 'Constância mais que conhecimentos prévios: 30 minutos por dia valem mais do que um fim de semana.', 'Consistency over prior knowledge: 30 minutes a day beats one weekend.', 'Constància més que coneixements previs: 30 minuts al dia valen més que un cap de setmana.'),
    effort: t('30-45 minutos por día · 3-6 meses', '30-45 minutos por dia · 3-6 meses', '30-45 minutes per day · 3-6 months', '30-45 minuts per dia · 3-6 mesos'),
    outcome: t('Bases de programación, un primer proyecto público y un plan de estudio concreto.', 'Bases de programação, um primeiro projeto público e um plano de estudo concreto.', 'Programming foundations, a first public project and a concrete study plan.', 'Bases de programació, un primer projecte públic i un pla d’estudi concret.'),
    activities: [
      {
        id: 'tech-curriculum',
        title: p('Sigue el currículum de IA y tecnología', 'Follow the AI and technology curriculum'),
        description: p('8 módulos con niveles, del uso ético a proyectos comunitarios.', '8 modules with levels, from ethical use to community projects.'),
        href: `${APP}/es/curriculum`,
        verifiedRefs: [{ label: 'Currículum m01-m08', url: `${APP}/es/curriculum` }],
      },
      {
        id: 'tech-practica',
        title: p('Practica con cursos guiados', 'Practice with guided courses'),
        description: p('Lecciones cortas con quizzes y progreso guardado.', 'Short lessons with quizzes and saved progress.'),
        section: 'courses',
      },
      {
        id: 'tech-comunidad',
        title: p('Únete a un grupo de estudio', 'Join a study group'),
        description: p('La comunidad comparte recursos, dudas y proyectos.', 'The community shares resources, questions and projects.'),
        section: 'community',
      },
    ],
  },
  {
    id: 'entender-documentos',
    title: t('Entender documentos administrativos', 'Entender documentos administrativos', 'Understand everyday administrative documents', 'Entendre documents administratius'),
    objective: t('Comprender el significado general de una carta o documento oficial y saber a dónde acudir.', 'Compreender o significado geral de uma carta ou documento oficial e saber a quem recorrer.', 'Understand the general meaning of an official letter or document and know where to go.', 'Comprendre el significat general d’una carta o document oficial i saber on adreçar-se.'),
    prerequisites: t('Ninguno. Recomendado tener a mano el documento (sin subirlo si no quieres).', 'Nenhum. Recomendado ter à mão o documento (sem o subir, se não quiseres).', 'None. Recommended to have the document handy (without uploading it if you prefer).', 'Cap. Recomanat tenir el document a mà (sense pujar-lo si no vols).'),
    effort: t('20 minutos por día · 1-2 semanas', '20 minutos por dia · 1-2 semanas', '20 minutes per day · 1-2 weeks', '20 minuts per dia · 1-2 setmanes'),
    outcome: t('Podrás identificar de qué trata un documento, sus fechas clave y el canal oficial donde resolverlo.', 'Poderás identificar do que trata um documento, as suas datas-chave e o canal oficial para o resolver.', 'You will be able to identify what a document is about, its key dates and the official channel to resolve it.', 'Podràs identificar de què tracta un document, les seves dates clau i el canal oficial on resoldre’l.'),
    activities: [
      {
        id: 'docs-guia',
        title: p('Lee la guía de derechos', 'Read the rights guide'),
        description: p('Explicaciones sencillas con fuentes oficiales y fechas de revisión.', 'Simple explanations with official sources and review dates.'),
        section: 'rights',
      },
      {
        id: 'docs-glosario',
        title: p('Consulta el glosario legal', 'Consult the legal glossary'),
        description: p('Palabras difíciles explicadas en lenguaje humano.', 'Difficult words explained in human language.'),
        section: 'rights',
      },
      {
        id: 'docs-checklist',
        title: p('Prepara tu carpeta de documentos', 'Prepare your document folder'),
        description: p('Checklist de documentos y plazos con recordatorios.', 'Document and deadline checklist with reminders.'),
        section: 'tools',
      },
      {
        id: 'docs-apoyo',
        title: p('Acude a apoyo humano', 'Get human support'),
        description: p('Cuando el documento es urgente, contacta con una institución real.', 'When the document is urgent, contact a real institution.'),
        section: 'contacts',
      },
    ],
  },
  {
    id: 'negocio-propio',
    title: t('Empezar un pequeño negocio', 'Começar um pequeno negócio', 'Start a small independent business', 'Començar un petit negoci'),
    objective: t('Dar los primeros pasos para trabajar por cuenta propia con información fiable.', 'Dar os primeiros passos para trabalhar por conta própria com informação fiável.', 'Take the first steps toward self-employment with reliable information.', 'Fer els primers passos per treballar per compte propi amb informació fiable.'),
    prerequisites: t('Una idea de actividad y ganas de ordenar los trámites.', 'Uma ideia de atividade e vontade de organizar os trâmites.', 'An activity idea and willingness to organize the paperwork.', 'Una idea d’activitat i ganes d’ordenar els tràmits.'),
    effort: t('20 minutos por día · 3 semanas', '20 minutos por dia · 3 semanas', '20 minutes per day · 3 weeks', '20 minuts per dia · 3 setmanes'),
    outcome: t('Un plan simple: trámites necesarios, presupuesto inicial y recursos de apoyo verificados.', 'Um plano simples: trâmites necessários, orçamento inicial e recursos de apoio verificados.', 'A simple plan: required paperwork, initial budget and verified support resources.', 'Un pla senzill: tràmits necessaris, pressupost inicial i recursos de suport verificats.'),
    activities: [
      {
        id: 'biz-tramites',
        title: p('Entiende los trámites de autónomo', 'Understand self-employment paperwork'),
        description: p('Qué se necesita y en qué orden, con fuentes oficiales.', 'What is needed and in what order, with official sources.'),
        section: 'rights',
      },
      {
        id: 'biz-presupuesto',
        title: p('Haz tu primer presupuesto', 'Make your first budget'),
        description: p('Herramientas de gastos e ingresos para no perder el control.', 'Expense and income tools to stay in control.'),
        section: 'tools',
      },
      {
        id: 'biz-recursos',
        title: p('Encuentra apoyo y formación', 'Find support and training'),
        description: p('Programas públicos y recursos verificados para emprender.', 'Public programs and verified resources for entrepreneurs.'),
        section: 'resources',
      },
    ],
  },
  {
    id: 'comunidad',
    title: t('Conectar con mi comunidad', 'Ligar-me à minha comunidade', 'Connect with my community', 'Connectar amb la meva comunitat'),
    objective: t('Aprender acompañado y compartir recursos con cuidado.', 'Aprender acompanhado e partilhar recursos com cuidado.', 'Learn with company and share resources carefully.', 'Aprende acompanyat i compartir recursos amb cura.'),
    prerequisites: t('Ninguno. Recomendado respetar la privacidad de todas las personas.', 'Nenhum. Recomendado respeitar a privacidade de todas as pessoas.', 'None. Recommended to respect everyone’s privacy.', 'Cap. Recomanat respectar la privacitat de tothom.'),
    effort: t('15 minutos por día · continuo', '15 minutos por dia · contínuo', '15 minutes per day · ongoing', '15 minuts per dia · continu'),
    outcome: t('Hábito de aprendizaje compartido y una red local de apoyo mutuo.', 'Hábito de aprendizagem partilhada e uma rede local de apoio mútuo.', 'A shared learning habit and a local mutual-support network.', 'Hàbit d’aprenentatge compartit i una xarxa local de suport mutu.'),
    activities: [
      {
        id: 'comunidad-aprender',
        title: p('Elige algo pequeño para aprender', 'Choose something small to learn'),
        description: p('Una meta pequeña hace más fácil empezar.', 'A small goal makes it easier to start.'),
        section: 'courses',
      },
      {
        id: 'comunidad-leer',
        title: p('Lee a la comunidad', 'Read the community'),
        description: p('Experiencias y respuestas de otras personas.', 'Experiences and answers from other people.'),
        section: 'community',
      },
      {
        id: 'comunidad-compartir',
        title: p('Comparte un recurso útil', 'Share a useful resource'),
        description: p('Ayuda a otra persona sin publicar datos sensibles.', 'Help another person without publishing sensitive data.'),
        section: 'community',
      },
    ],
  },
];

export const JOURNEY_IDS = JOURNEYS.map((j) => j.id);

export function getJourney(id: string): Journey | undefined {
  return JOURNEYS.find((j) => j.id === id);
}

/** Texto priorizando el idioma del usuario: PT > ES > EN > CA según disponibilidad. */
export function pickText(text: LocalizedText, language: string): string {
  const lang = language.replace('_', '-');
  if (lang === 'pt-BR' || lang.startsWith('pt')) return text.pt || text.es;
  if (lang === 'ca') return text.ca || text.es;
  if (lang === 'en') return text.en || text.es;
  return text.es;
}

export function pickPair(text: LocalizedPair, language: string): string {
  const lang = language.replace('_', '-');
  if (lang === 'en') return text.en || text.es;
  return text.es;
}

// ---------------------------------------------------------------------------
// Progreso sin registro (localStorage). Compatible con datos previos de
// personal-route (metas work/digital/rights/community y sus pasos).
// ---------------------------------------------------------------------------

export interface SavedRoute {
  goal: string;
  completed: string[];
}

/** Migración del formato antiguo de personal-route (metas y pasos legados). */
export const LEGACY_ROUTE_MAP: Record<string, { journey: string; steps: Record<string, string> }> = {
  work: {
    journey: 'primera-candidatura',
    steps: {
      'work-profile': 'candidatura-cv',
      'work-ai': 'candidatura-ia',
      'work-courses': 'candidatura-formacion',
    },
  },
  digital: {
    journey: 'independencia-digital',
    steps: {
      'digital-basics': 'digital-esencial',
      'digital-ai': 'digital-ia',
      'digital-tools': 'digital-tramites',
    },
  },
  rights: {
    journey: 'entender-documentos',
    steps: {
      'rights-guide': 'docs-guia',
      'rights-checklist': 'docs-checklist',
      'rights-help': 'docs-apoyo',
    },
  },
  community: {
    journey: 'comunidad',
    steps: {
      'community-learn': 'comunidad-aprender',
      'community-share': 'comunidad-leer',
      'community-contribute': 'comunidad-compartir',
    },
  },
};

export function isActivityId(journeyId: string, activityId: string): boolean {
  const journey = getJourney(journeyId);
  return Boolean(journey?.activities.some((a) => a.id === activityId));
}

/**
 * Valida y migra una ruta guardada. Devuelve null si el dato es inservible.
 * Acepta el formato legado y lo traduce sin perder el progreso.
 */
export function parseSavedRoute(raw: string | null | undefined): SavedRoute | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== 'object' || value === null) return null;
  const record = value as Record<string, unknown>;
  if (typeof record.goal !== 'string' || !Array.isArray(record.completed)) return null;

  let goal = record.goal;
  const stepMap: Record<string, string> = {};
  const legacy = LEGACY_ROUTE_MAP[goal];
  if (legacy) {
    goal = legacy.journey;
    Object.assign(stepMap, legacy.steps);
  }

  const journey = getJourney(goal);
  if (!journey) return null;

  const completed = record.completed
    .filter((id): id is string => typeof id === 'string')
    .map((id) => stepMap[id] ?? id)
    .filter((id) => isActivityId(goal, id));

  return { goal, completed: [...new Set(completed)] };
}

export function serializeSavedRoute(route: SavedRoute): string {
  return JSON.stringify(route);
}
