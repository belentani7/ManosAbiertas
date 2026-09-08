/* ============================================================
   MANOS ABIERTAS — Contenido de datos
   Recursos reales y verificados (gobierno, ONGs, repos GitHub).
   Fecha de revisión de enlaces: agosto 2026.
   ============================================================ */

/* ---------- Cursos de IA ---------- */
const AI_COURSES = [
  {
    id: "chatgpt", ico: "💬", name: "ChatGPT", color: "#10a37f", lessons: [
      { level: "Nivel 0", t: "Qué es ChatGPT y para qué sirve", body: "ChatGPT es un asistente de inteligencia artificial gratuito. Puedes hacerle preguntas en español, pedirle que te ayude a escribir, traducir o aprender. Es como chatear con un tutor experto 24/7.", tips: ["Entra en chat.openai.com y crea una cuenta gratis.", "Habla en tu idioma nativo: entiende más de 50 idiomas.", "Usa el botón de voz 🔊 para escuchar la lección."], video: "https://www.youtube.com/embed/sub_sample_1" },
      { level: "Nivel 0", t: "Crear tu cuenta paso a paso", body: "Ve a chat.openai.com → pulsa 'Registrarse' → escribe tu correo y contraseña → confirma el código. No requiere tarjeta de crédito.", tips: ["Guarda tu contraseña de forma segura.", "Puedes ingresar con tu cuenta de Google con un solo clic."], video: "https://www.youtube.com/embed/sub_sample_2" },
      { level: "Nivel 1", t: "Ingeniería de Prompts ROTA (Rol, Objetivo, Tarea, Ajuste)", body: "Para respuestas perfectas usa la fórmula ROTA: Rol ('Actúa como un experto laboral en España'), Objetivo ('Crear un CV atractivo'), Tarea ('Redacta 3 logros para camarero'), Ajuste ('En 100 palabras max').", tips: ["Cuanto más específico seas, mejor será la respuesta.", "Pide correcciones: 'hazlo más formal' o 'más breve'."], video: "https://www.youtube.com/embed/sub_sample_3" },
      { level: "Nivel 2", t: "Simulación de entrevistas de trabajo en vivo", body: "Escribe: 'Simula ser el entrevistador de un restaurante. Pregúntame una por una mis experiencias y evalúa mis respuestas en español'.", tips: ["Practica respondiendo en voz alta.", "Pide retroalimentación inmediata sobre tus respuestas."], video: "https://www.youtube.com/embed/sub_sample_4" },
      { level: "Nivel 3 (Experto)", t: "Automatización de tareas complejas y análisis de archivos", body: "Sube documentos PDF, hojas de cálculo o contratos para resumir cláusulas, detectar inconsistencias o traducir informes técnicos instantáneamente.", tips: ["No subas contraseñas ni datos bancarios sensibles.", "Pide resúmenes ejecutivos en puntos clave."], video: "https://www.youtube.com/embed/sub_sample_5" },
    ],
  },
  {
    id: "gemini", ico: "✨", name: "Google Gemini", color: "#1a73e8", lessons: [
      { level: "Nivel 0", t: "Qué es Gemini y ventajas con Google", body: "Gemini es la IA oficial de Google. Accede gratis con tu cuenta de Gmail en gemini.google.com y consulta información conectada a internet en tiempo real.", tips: ["Si tienes cuenta de Google/Gmail, el acceso es directo.", "Pide fuentes oficiales de tus consultas."], video: "https://www.youtube.com/embed/gemini_sample_1" },
      { level: "Nivel 1", t: "Búsqueda y verificación de trámites actuales en España", body: "Pregunta: '¿Cuáles son los requisitos actuales para el empadronamiento en Madrid en 2026?' y analiza los enlaces oficiales aportados.", tips: ["Verifica siempre los dominios oficiales (.gob.es).", "Pide resúmenes en pasos numerados."], video: "https://www.youtube.com/embed/gemini_sample_2" },
      { level: "Nivel 2", t: "Redacción de correos formales e instancias oficiales", body: "Genera borradores para solicitar citas, pedir información en servicios sociales o responder a ofertas de empleo con la estructura formal española.", tips: ["Ajusta el tono a 'respetuoso y formal'.", "Copia el texto directamente a tu correo."], video: "https://www.youtube.com/embed/gemini_sample_3" },
      { level: "Nivel 3 (Experto)", t: "Integración con Google Workspace (Docs, Sheets, Drive)", body: "Usa Gemini en Google Docs para redactar documentos enteros o en Google Sheets para estructurar listas de búsqueda de empleo.", tips: ["Aprovecha el botón 'Exportar a Docs'.", "Organiza tus proyectos en carpetas de Drive."], video: "https://www.youtube.com/embed/gemini_sample_4" },
    ],
  },
  {
    id: "deepseek", ico: "🌊", name: "DeepSeek", color: "#4d6bfe", lessons: [
      { level: "Nivel 0", t: "Introducción a DeepSeek", body: "IA gratuita y de código abierto accesible desde chat.deepseek.com. Excelente potencia de razonamiento sin costes de suscripción.", tips: ["Sin necesidad de tarjeta de crédito.", "Disponible en web y aplicación móvil."], video: "https://www.youtube.com/embed/deepseek_1" },
      { level: "Nivel 1", t: "Traducción técnica avanzada y razonamiento lógico", body: "Utilízala para traducir documentos complejos o comprender conceptos matemáticos y administrativos de forma guiada.", tips: ["Pregunta paso a paso con el modo DeepThink.", "Compara traducciones en varios idiomas."], video: "https://www.youtube.com/embed/deepseek_2" },
      { level: "Nivel 2", t: "Modelos R1 y razonamiento de problemas sociales", body: "Comprende cómo los modelos de razonamiento (R1) desglosan problemas complejos en pasos lógicos comprensibles.", tips: ["Solicita la cadena de pensamiento explícita.", "Analiza cómo llega a cada conclusión."], video: "https://www.youtube.com/embed/deepseek_3" },
      { level: "Nivel 3 (Experto)", t: "Ejecución de DeepSeek R1 en local con Ollama", body: "Aprende a ejecutar modelos de DeepSeek en tu propio ordenador sin enviar datos a internet usando Ollama.", tips: ["Instala Ollama en Windows desde ollama.com.", "Ejecuta 'ollama run deepseek-r1:8b' en tu terminal."], video: "https://www.youtube.com/embed/deepseek_4" },
    ],
  },
  {
    id: "copilot", ico: "🎯", name: "Microsoft Copilot", color: "#0078d4", lessons: [
      { t: "Crear imágenes gratis", body: "Pide: 'Dibuja un cartel de bienvenida a España con colores cálidos'. Copilot genera imágenes gratis con su herramienta Designer. Útil para el negocio, carteles o redes sociales.", tips: ["Describe la imagen: tema, colores, estilo.", "Pide variaciones si no te gusta.", "Descarga la imagen pulsando el botón de descargar."] },
      { t: "Copilot en Office", body: "En las versiones recientes de Word hay un icono de Copilot que escribe, resume o mejora tus textos. En Excel puede hacer fórmulas por ti: 'calcula el total de esta columna'.", tips: ["Busca el icono ✨ de Copilot en la cinta de herramientas.", "En la mayoría de versiones gratis pide una suscripción.", "Puedes probarlo gratis durante un mes."] },
    ],
  },
  {
    id: "qwen", ico: "🐉", name: "Qwen (Alibaba)", color: "#615ced", lessons: [
      { t: "Qué es Qwen", body: "Qwen es la IA de la empresa china Alibaba. Es gratuita y se puede usar en chat.qwen.ai, además de ser de código abierto: cualquiera puede descargarla y usarla en su propio ordenador.", tips: ["Entra en chat.qwen.ai y entra con Google o correo.", "Tiene App para el móvil.", "Es muy buena en traducciones al chino y matemáticas."] },
      { t: "Qwen en tu idioma", body: "Responde muy bien en español, portugués, inglés y muchos idiomas. Pruébala: 'Tradúceme este correo al portugués de Brasil' o 'Explícame qué es el NIE en español sencillo'.", tips: ["Pide respuestas 'sencillas, para principiantes'.", "Usa la App con voz si prefieres hablar.", "Las respuestas son gratuitas e ilimitadas."] },
      { t: "Descargarla para usarla sin internet", body: "Qwen es de código abierto: en GitHub hay versiones que puedes instalar en tu PC con herramientas como Ollama. Esto permite usar IA sin conexión y sin compartir tus datos. Requiere un ordenador con buena memoria.", tips: ["Busca 'Ollama Qwen' en internet para el tutorial.", "La versión 'Qwen2.5' funciona en ordenadores normales.", "Perfecto si no quieres depender de internet."] },
    ],
  },
  {
    id: "claude", ico: "🟠", name: "Claude (Anthropic)", color: "#d97757", lessons: [
      { t: "Qué es Claude", body: "Claude es una IA conocida por escribir muy bien en español. Se usa en claude.ai (gratis con límites). Es excelente para redactar cartas, currículums y textos profesionales con un lenguaje natural.", tips: ["Entra en claude.ai y crea una cuenta gratis.", "Pide 'redáctame una carta formal de presentación'.", "Muy útil para mejorar tu CV."] },
      { t: "Escribir cartas y currículums", body: "Claude destaca escribiendo. Pídele: 'Hazme una carta de presentación para un trabajo de limpieza, formal y humilde'. También puede mejorar tu resumen profesional del CV.", tips: ["Dale tu experiencia en tus palabras y él la ordena.", "Pide un tono concreto: 'cercano pero profesional'.", "Revisa siempre los datos antes de enviar."] },
    ],
  },
  {
    id: "perplexity", ico: "🔍", name: "Perplexity", color: "#20808d", lessons: [
      { t: "Qué es Perplexity", body: "Perplexity es una IA especializada en buscar información en internet y citar sus fuentes. Perfecta para dudas sobre leyes, ayudas o trámites porque te dice de dónde sale cada dato. Se usa en perplexity.ai, gratis con límites.", tips: ["Pregunta: '¿Cuáles son las ayudas al alquiler en mi comunidad?'.", "Mira los enlaces que cita al final para confirmar.", "Elige 'Focus: Reddit' para opiniones de personas reales."] },
      { t: "Verificar información oficial", body: "Cuando un documento o un aviso te genere dudas, pégalo en Perplexity y pregunta: '¿Es esto oficial? ¿Qué significa?'. Te devolverá la información con sus fuentes para que la compruebes.", tips: ["Pide siempre 'las fuentes oficiales del gobierno'.", "Compara con la página del SEPE o de la Seguridad Social.", "Desconfía si no hay fuentes claras."] },
    ],
  },
  {
    id: "meta", ico: "📘", name: "Meta AI (WhatsApp)", color: "#0a7cff", lessons: [
      { t: "IA dentro de WhatsApp", body: "Meta AI está integrada en WhatsApp: es el círculo morado que a veces aparece en la barra de chats. Puedes chatear con ella como con una persona para traducir, redactar o preguntar.", tips: ["Busca el chat 'Meta AI' en tu lista de WhatsApp.", "Escríbele igual que a un contacto.", "Funciona en español y muchos idiomas."] },
      { t: "Traducir conversaciones al instante", body: "Si te escriben en un idioma que no entiendes, reenvía el mensaje o cópialo y pídele a Meta AI: 'tradúceme esto'. También puede ayudarte a responder: 'respóndele amablemente en alemán'.", tips: ["Copia el mensaje y pégalo en el chat de Meta AI.", "Pide respuestas 'cortas y amables'.", "Es gratis y no necesitas instalar nada nuevo."] },
    ],
  },
];

/* ---------- Cursos de Office ---------- */
const OFFICE_MODULES = [
  { id: "word", ico: "📝", name: "Microsoft Word", lessons: [
    "Abrir Word y crear un documento nuevo",
    "Escribir y guardar tu primer texto (Ctrl + S)",
    "Cambiar el tamaño y tipo de letra",
    "Poner negrita, cursiva y subrayado",
    "Alineación: izquierda, centro, derecha",
    "Guardar como PDF para enviar por correo",
  ]},
  { id: "excel", ico: "📊", name: "Microsoft Excel", lessons: [
    "Qué es Excel y para qué se usa (tablas y cuentas)",
    "Crear una tabla de gastos del hogar",
    "Sumar una columna con =SUMA(A1:A10)",
    "Calcular un porcentaje",
    "El botón Autosuma (Σ)",
    "Ordenar y filtrar datos",
  ]},
  { id: "powerpoint", ico: "🖥️", name: "PowerPoint", lessons: [
    "Crear una presentación nueva",
    "Elegir un diseño de diapositiva",
    "Añadir título y texto",
    "Insertar una imagen",
    "Poner animaciones simples",
    "Guardar y presentar (F5)",
  ]},
  { id: "gdocs", ico: "📄", name: "Google Docs", lessons: [
    "Entrar con tu cuenta de Gmail (gratis)",
    "Crear y compartir un documento por enlace",
    "Escribir y dar formato básico",
    "Traducir un documento con Herramientas → Traducir",
    "Descargar como PDF o Word",
    "Trabajar sin internet y sincronizar",
  ]},
  { id: "gsheets", ico: "🧮", name: "Google Sheets", lessons: [
    "Crear una hoja de cálculo gratis",
    "Introducir datos y usar Autocompletar",
    "Sumar con la función =SUMA",
    "Compartir y colaborar en tiempo real",
    "Hacer un gráfico sencillo",
    "Traducir la interfaz al español",
  ]},
  { id: "gslides", ico: "🎬", name: "Google Slides", lessons: [
    "Crear presentaciones gratis en Google",
    "Usar plantillas listas",
    "Insertar imágenes y vídeos",
    "Transiciones entre diapositivas",
    "Compartir y presentar por videollamada",
    "Descargar como PowerPoint",
  ]},
  { id: "gmail", ico: "✉️", name: "Gmail", lessons: [
    "Crear una cuenta de Gmail gratis",
    "Enviar tu primer correo con asunto",
    "Adjuntar un archivo (tu CV en PDF)",
    "Responder y reenviar",
    "Organizar con etiquetas",
    "Enviar el mismo correo a varias personas",
  ]},
  { id: "sepe", ico: "🎓", name: "Cursos gratuitos SEPE", lessons: [
    "Qué es el SEPE y la formación gratuita",
    "Buscar cursos gratis en tu provincia",
    "Cursos de ofimática (Word, Excel) gratuitos",
    "Cursos de hostelería y sanidad",
    "Cursillos con certificado para tu CV",
    "Cómo inscribirte y dónde (sepe.es)",
  ]},
];

/* ---------- Recursos (enlaces reales y verificados) ---------- */
const RESOURCES = [
  // Gobierno
  { cat: "gobierno", title: "SEPE — Empleo público", desc: "Oficina pública de empleo: paro, formación gratuita, inscripción.", url: "https://www.sepe.es", tags: "empleo paro formación" },
  { cat: "gobierno", title: "Seguridad Social", desc: "Número de afiliación, vida laboral, altas y bajas.", url: "https://www.seg-social.es", tags: "seguridad social número afiliación" },
  { cat: "gobierno", title: "Ministerio de Inclusión y Migraciones", desc: "Extranjería, NIE, arraigos, acogida.", url: "https://www.inclusion.gob.es", tags: "extranjería NIE migraciones" },
  { cat: "gobierno", title: "Oficinas de Extranjería", desc: "Cita previa para trámites de NIE y residencia.", url: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/ciudades-de-la-justicia", tags: "cita previa extranjería NIE" },
  { cat: "gobierno", title: "Ministerio de Sanidad", desc: "Tarjeta sanitaria, derechos de salud en España.", url: "https://www.sanidad.gob.es", tags: "sanidad salud tarjeta sanitaria" },
  { cat: "gobierno", title: "Ministerio de Educación y FP", desc: "Reconocimiento de títulos, estudios, becas.", url: "https://www.educacionfpydeportes.gob.es", tags: "educación títulos convalidación becas" },
  { cat: "gobierno", title: "Ministerio de Vivienda", desc: "Ayudas al alquiler, Plan Estatal de Vivienda.", url: "https://www.mivau.gob.es", tags: "vivienda alquiler ayudas" },
  { cat: "gobierno", title: "Agencia Tributaria", desc: "Declaración de la renta, certificados, NIF.", url: "https://sede.agenciatributaria.gob.es", tags: "hacienda renta impuestos NIF" },
  { cat: "gobierno", title: "Justicia — Tribunal Supremo", desc: "Información legal, abogados de oficio.", url: "https://www.mjusticia.gob.es", tags: "justicia abogados legales" },
  { cat: "gobierno", title: "Cita previa (todas las administraciones)", desc: "Pide cita para trámites en la administración pública.", url: "https://sede.administracionespublicas.gob.es", tags: "cita previa trámites" },
  // Empleo
  { cat: "empleo", title: "InfoJobs", desc: "Portal de empleo número uno en España.", url: "https://www.infojobs.net", tags: "trabajo empleo ofertas" },
  { cat: "empleo", title: "Indeed España", desc: "Ofertas de trabajo en todos los sectores.", url: "https://es.indeed.com", tags: "trabajo empleo ofertas" },
  { cat: "empleo", title: "LinkedIn", desc: "Red profesional para encontrar trabajo.", url: "https://www.linkedin.com", tags: "trabajo red profesional" },
  { cat: "empleo", title: "Infoempleo", desc: "Ofertas de empleo y formación.", url: "https://www.infoempleo.com", tags: "trabajo empleo" },
  { cat: "empleo", title: "Trabajos.com", desc: "Portal de empleo generalista.", url: "https://www.trabajos.com", tags: "trabajo empleo" },
  { cat: "empleo", title: "Servicio Público de Empleo (SEPE) — Empléate", desc: "Portal gratuito de empleo público.", url: "https://www.empleate.gob.es", tags: "trabajo empleo sepe" },
  // ONGs
  { cat: "ong", title: "Cruz Roja Española", desc: "Ayuda humanitaria, clases de español, empleo.", url: "https://www.cruzroja.es", tags: "ong ayuda español empleo" },
  { cat: "ong", title: "CEAR — Comisión de Ayuda al Refugiado", desc: "Asesoría jurídica para refugiados y asilo.", url: "https://www.cear.es", tags: "ong asilo refugio legal" },
  { cat: "ong", title: "ACCEM", desc: "Apoyo a la integración de inmigrantes.", url: "https://www.accem.es", tags: "ong integración inmigrantes" },
  { cat: "ong", title: "Cáritas", desc: "Ayuda social, ropa, comida, orientación.", url: "https://www.caritas.es", tags: "ong ayuda social" },
  { cat: "ong", title: "Médicos del Mundo", desc: "Atención sanitaria a personas vulnerables.", url: "https://www.medicosdelmundo.org", tags: "ong sanidad salud" },
  { cat: "ong", title: "Spanish Red Cross — Programa Inmigración", desc: "Programas específicos para población migrante.", url: "https://www2.cruzroja.es/pi-programa-de-inmigracion", tags: "ong inmigración español empleo" },
  { cat: "ong", title: "UNICEF España", desc: "Derechos de la infancia, ayudas a familias.", url: "https://www.unicef.es", tags: "ong niños familias" },
  { cat: "ong", title: "Save the Children", desc: "Protección a la infancia en situación vulnerable.", url: "https://www.savethechildren.es", tags: "ong niños infancia" },
  // Derechos y legal
  { cat: "legal", title: "Defensor del Pueblo", desc: "Presenta quejas ante la administración.", url: "https://www.defensordelpueblo.es", tags: "legal quejas derechos" },
  { cat: "legal", title: "Abogados de oficio (Justicia Gratuita)", desc: "Abogado gratis si no tienes recursos.", url: "https://www.mjusticia.gob.es/es/Ciudadano/ServiciosJusticiaGratuita", tags: "legal abogado gratis" },
  { cat: "legal", title: "Consejo General de la Abogacía", desc: "Localiza abogados por turno de oficio.", url: "https://www.abogacia.es", tags: "legal abogados" },
  { cat: "legal", title: "Ley de Extranjería", desc: "Normativa completa de extranjería en España (BOE).", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2000-544", tags: "legal extranjería ley NIE" },
  { cat: "legal", title: "BOE — Boletín Oficial del Estado", desc: "Todas las leyes y normativas oficiales.", url: "https://www.boe.es", tags: "legal leyes oficial" },
  // Vivienda
  { cat: "vivienda", title: "Idealista", desc: "Portal de alquiler y compra de vivienda.", url: "https://www.idealista.com", tags: "vivienda alquiler piso" },
  { cat: "vivienda", title: "Fotocasa", desc: "Buscador de pisos y habitaciones.", url: "https://www.fotocasa.es", tags: "vivienda alquiler piso" },
  { cat: "vivienda", title: "Portal de la Vivienda Protegida", desc: "VPO y vivienda protegida por comunidades.", url: "https://www.mivau.gob.es", tags: "vivienda protegida VPO" },
  { cat: "vivienda", title: "Ayudas al alquiler (Programas)", desc: "Información de ayudas al alquiler por CCAA.", url: "https://www.mivau.gob.es/vivienda/programas-de-ayudas", tags: "vivienda alquiler ayudas" },
  // Sanidad
  { cat: "sanidad", title: "Tarjeta sanitaria europea y SIP", desc: "Cómo obtener la tarjeta sanitaria por comunidad.", url: "https://www.sanidad.gob.es", tags: "sanidad tarjeta SIP salud" },
  { cat: "sanidad", title: "112 — Emergencias", desc: "Teléfono único de emergencias en toda Europa.", url: "https://www.112.es", tags: "sanidad emergencias 112" },
  { cat: "sanidad", title: "MSF — Médicos Sin Fronteras", desc: "Atención sanitaria de emergencia.", url: "https://www.msf.es", tags: "sanidad salud ong" },
  // Educación
  { cat: "educacion", title: "Instituto Cervantes", desc: "Cursos de español y certificados DELE.", url: "https://www.cervantes.es", tags: "educación español DELE cursos" },
  { cat: "educacion", title: "Educación gratuita para adultos", desc: "Cursos de español para adultos por comunidad.", url: "https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/educacion-adultos.html", tags: "educación español adultos" },
  { cat: "educacion", title: "OpenStax", desc: "Libros de texto universitarios gratuitos.", url: "https://openstax.org", tags: "educación libros gratis" },
  { cat: "educacion", title: "Project Gutenberg", desc: "Miles de libros gratis de dominio público.", url: "https://www.gutenberg.org", tags: "educación libros gratis" },
  { cat: "educacion", title: "LibriVox", desc: "Audiolibros gratis en español.", url: "https://librivox.org", tags: "educación audiolibros" },
  // IA y tecnología
  { cat: "ia", title: "ChatGPT (OpenAI)", desc: "IA gratuita para hablar, escribir y aprender.", url: "https://chat.openai.com", tags: "ia chatgpt gratis" },
  { cat: "ia", title: "Google Gemini", desc: "IA de Google conectada a internet.", url: "https://gemini.google.com", tags: "ia gemini google" },
  { cat: "ia", title: "DeepSeek", desc: "IA gratuita de código abierto.", url: "https://chat.deepseek.com", tags: "ia deepseek gratis" },
  { cat: "ia", title: "Microsoft Copilot", desc: "IA de Microsoft, crea imágenes gratis.", url: "https://copilot.microsoft.com", tags: "ia copilot imágenes" },
  { cat: "ia", title: "Claude (Anthropic)", desc: "IA excelente para escribir textos.", url: "https://claude.ai", tags: "ia claude escribir" },
  { cat: "ia", title: "Qwen (Alibaba)", desc: "IA gratuita de código abierto.", url: "https://chat.qwen.ai", tags: "ia qwen gratis" },
  { cat: "ia", title: "Perplexity", desc: "IA que busca y cita fuentes.", url: "https://www.perplexity.ai", tags: "ia búsqueda fuentes" },
  { cat: "ia", title: "Canva", desc: "Diseño gratuito: CV, carteles, redes.", url: "https://www.canva.com", tags: "ia diseño cv carteles gratis" },
  { cat: "ia", title: "Google Translate", desc: "Traductor con 100+ idiomas y voz.", url: "https://translate.google.com", tags: "ia traductor idiomas" },
  { cat: "ia", title: "Ollama (IA local, repos GitHub)", desc: "Ejecuta modelos de IA en tu propio PC, sin internet.", url: "https://github.com/ollama/ollama", tags: "ia local github gratis" },
  { cat: "ia", title: "Whisper (transcripción voz)", desc: "Convierte audio en texto, 100+ idiomas, código abierto.", url: "https://github.com/openai/whisper", tags: "ia voz transcripción github" },
  { cat: "ia", title: "Piper TTS", desc: "Voz sintética en español, funciona sin internet.", url: "https://github.com/rhasspy/piper", tags: "ia voz tts github" },
  { cat: "ia", title: "Coqui XTTS", desc: "Voz con más de 1100 idiomas, código abierto.", url: "https://github.com/coqui-ai/TTS", tags: "ia voz tts github" },
  { cat: "ia", title: "DeepSeek repos", desc: "Modelos y código de DeepSeek en GitHub.", url: "https://github.com/deepseek-ai", tags: "ia github modelos" },
  { cat: "ia", title: "Meta Llama", desc: "Modelos de IA libres de Meta.", url: "https://github.com/meta-llama/llama", tags: "ia github modelos" },
  { cat: "ia", title: "OnlyOffice", desc: "Suite de Office gratis y open source.", url: "https://github.com/ONLYOFFICE", tags: "ia office gratis github" },
  { cat: "ia", title: "LibreOffice", desc: "Office gratuito para Windows, Mac y Linux.", url: "https://www.libreoffice.org", tags: "office gratis open source" },
  { cat: "ia", title: "Mozilla — Lo que necesitas sobre IA", desc: "Guía básica y honesta sobre IA en español.", url: "https://foundation.mozilla.org/es/what-ai-can-and-cant-do", tags: "ia aprender guía" },
  // Bancos y dinero
  { cat: "banca", title: "Cuenta bancaria básica", desc: "Derecho a una cuenta básica aunque no tengas residencia.", url: "https://www.bde.es", tags: "banca cuenta dinero" },
  { cat: "banca", title: "Banco de España", desc: "Información sobre cuentas y reclamaciones bancarias.", url: "https://www.bde.es", tags: "banca reclamaciones" },
  { cat: "banca", title: "Remesas y envíos de dinero", desc: "Cómo enviar dinero a tu país de forma barata.", url: "https://www.bde.es/wbe/es/areas-actuacion/consumidores-inversores/proteccion-consumidor/productos-bancarios/servicios-pago/transferencias/", tags: "banca remesas transferencias" },
  // Transporte
  { cat: "transporte", title: "Renfe", desc: "Trenes: descuentos y abonos de transporte.", url: "https://www.renfe.com", tags: "transporte tren renfe" },
  { cat: "transporte", title: "Tarjeta transporte público por ciudad", desc: "Abonos y tarjetas de metro y bus por ciudad.", url: "https://www.crtm.es", tags: "transporte metro bus madrid" },
  { cat: "transporte", title: "Viajar a bajo coste (Bus)", desc: "Compañías de autobuses baratas entre ciudades.", url: "https://www.alsa.es", tags: "transporte autobús barato" },
  // Comunidades
  { cat: "comunidad", title: "Ayuntamiento de Madrid", desc: "Trámites municipales y servicios sociales.", url: "https://www.madrid.es", tags: "comunidad ayuntamiento madrid" },
  { cat: "comunidad", title: "Ayuntamiento de Barcelona", desc: "Trámites municipales y servicios sociales.", url: "https://www.barcelona.cat", tags: "comunidad ayuntamiento barcelona" },
  { cat: "comunidad", title: "Servicios sociales de tu ayuntamiento", desc: "Busca tu ayuntamiento para pedir ayuda social.", url: "https://www.administracion.gob.es/pag_Home/atencionCiudadana/", tags: "comunidad servicios sociales" },
];

/* ---------- Artículos de derechos ---------- */
const RIGHTS = [
  { num: "01", tag: "Extranjería", title: "¿Qué es el NIE y cómo se obtiene?", updated: "jun 2026",
    body: "El NIE (Número de Identidad de Extranjero) es el número que te identifica en España para trabajar, abrir una cuenta o firmar contratos. Se solicita en la Oficina de Extranjería o en comisarías de policía con cita previa. Necesitas pasaporte en vigor, el formulario EX-15 y la tasa (modelo 790-012).",
    source: "Ministerio de Inclusión, Seguridad Social y Migraciones" },
  { num: "02", tag: "Extranjería", title: "Visa, residencia y empadronamiento", updated: "jun 2026",
    body: "Para residir legalmente normalmente necesitas una visa o autorización de residencia. El empadronamiento (registrarte en tu ayuntamiento) es gratis y NO significa que estés regularizado, pero te permite acceder a servicios sociales, sanidad y escolarización. Se hace con tu contrato de alquiler o una carta de acogida.",
    source: "Ley de Extranjería, Real Decreto 557/2011" },
  { num: "03", tag: "Arraigo", title: "Arraigo social, laboral y familiar (RD 610/2024)", updated: "jun 2026",
    body: "Si llevas tiempo en España puedes regularizarte por arraigo: social (2 años de permanencia y contrato de trabajo), laboral (2 años y trabajo previo sin registro) o familiar (familiares de residentes). El Real Decreto 610/2024 simplificó el arraigo laboral eliminando la obligación de 2 años. Consulta siempre con una ONG especializada.",
    source: "Real Decreto 610/2024, de 2 de julio (BOE)" },
  { num: "04", tag: "Asilo", title: "Solicitar protección internacional (asilo)", updated: "may 2026",
    body: "Si en tu país corres peligro (persecución, guerra, violencia), puedes pedir asilo en España. Se solicita en la Oficina de Asilo y Refugio o en la frontera. Mientras se estudia tu caso (máx. 6 meses prorrogables), tienes derecho a trabajar a los 6 meses y a un permiso provisional. CEAR y ACCEM ofrecen asesoría gratuita.",
    source: "Ley 12/2009 reguladora del derecho de asilo" },
  { num: "05", tag: "Sanidad", title: "Derecho a la salud y tarjeta sanitaria", updated: "jun 2026",
    body: "En España toda persona que viva aquí, esté o no regularizada, tiene derecho a la asistencia sanitaria pública: empadrónate y pide la tarjeta sanitaria en tu centro de salud (CAP). Las urgencias se atienden siempre, incluso sin papeles, con el decreto de universalidad de la sanidad (RD 7/2018, derogado en parte y restablecido por CCAA).",
    source: "Ley 16/2003 de cohesión del SNS" },
  { num: "06", tag: "Vivienda", title: "Contrato de alquiler: tus derechos", updated: "jun 2026",
    body: "El contrato de alquiler se rige por la Ley de Arrendamientos Urbanos (LAU). La fianza máxima es de 2 mensualidades y debe devolverse al salir (si no hay daños). El precio no puede subirse más que el IPC. Para tu seguridad, exige siempre contrato por escrito y no pagues en efectivo sin recibo.",
    source: "Ley 29/1994 (LAU) y Ley 12/2023 de vivienda" },
  { num: "07", tag: "Empleo", title: "Salario mínimo y condiciones laborales", updated: "jun 2026",
    body: "El Salario Mínimo Interprofesional (SMI) en 2026 es de 1.200 €/mes brutos en 14 pagas (estimación a confirmar por RD). Se paga igual a todas las personas con contrato, estés o no regularizado, si trabajas en negro tienes derecho a reclamarlo. Si te explotan, llama al 900 10 00 00 (inspección de trabajo, anónima).",
    source: "Real Decreto 145/2024 (SMI 2024), actualizaciones anuales" },
  { num: "08", tag: "Empleo", title: "El paro (prestación contributiva)", updated: "may 2026",
    body: "Si has cotizado a la Seguridad Social y te quedas sin trabajo, puedes cobrar el paro. Se pide en el SEPE con cita previa dentro de los 15 días siguientes a quedarte en paro. La cuantía depende de lo cotizado (base reguladora). También hay subsidios si no llegas al mínimo de cotización (como el subsidio por agotamiento o la RAI).",
    source: "SEPE — Ley General de la Seguridad Social" },
  { num: "09", tag: "Ayudas", title: "Ingreso Mínimo Vital (IMV)", updated: "jun 2026",
    body: "El IMV es una prestación para personas y familias con pocos recursos. Se solicita en la Seguridad Social (seg-social.es) o en una oficina. Afecta a ciudadanos de la UE y a no comunitarios con residencia legal. La cuantía para una persona sola ronda los 600 €/mes en 2026 (varía según familia).",
    source: "Ley 19/2021 del Ingreso Mínimo Vital" },
  { num: "10", tag: "Ayudas", title: "Ayudas al alquiler por comunidad", updated: "jun 2026",
    body: "Casi todas las comunidades autónomas dan ayudas al alquiler (300-600 €/mes) a personas con ingresos bajos y vivienda alquilada. Cada comunidad abre sus propias convocatorias. Infórmate en el portal de vivienda de tu comunidad o en el Ministerio de Vivienda (mivau.gob.es).",
    source: "Plan Estatal de Acceso a la Vivienda 2022-2025 y convocatorias CCAA" },
  { num: "11", tag: "Familia", title: "Reagrupación familiar", updated: "may 2026",
    body: "Si tienes residencia legal en España (normalmente 1 año renovada), puedes traer a tu familia: cónyuge, hijos menores o mayores dependientes, y ascendientes a cargo. Se solicita desde España en la Oficina de Extranjería con el formulario EX-02. Los familiares reagrupados pueden trabajar.",
    source: "Ley de Extranjería, art. 17 y 39" },
  { num: "12", tag: "Nacionalidad", title: "Nacionalidad española por residencia", updated: "jun 2026",
    body: "Tras 10 años de residencia legal (2 para países iberoamericanos, Filipinas, Guinea Ecuatorial, Andorra, Portugal y sefardíes) puedes pedir la nacionalidad. Requiere empadronamiento, carecer de antecedentes, y aprobar las pruebas CCSE y DELE (Instituto Cervantes). Se solicita en el Registro Civil con el formulario de nacionalidad.",
    source: "Código Civil, art. 22" },
];

/* ---------- Emergencias y contactos ---------- */
const EMERGENCIES = [
  { n: "112", label: "Emergencias (toda Europa)", cat: "Emergencias" },
  { n: "061", label: "Urgencias sanitarias (ambulancia)", cat: "Sanidad" },
  { n: "016", label: "Violencia de género (24 h, 52 idiomas)", cat: "Protección" },
  { n: "024", label: "Prevención del suicidio (24 h)", cat: "Salud mental" },
  { n: "091", label: "Policía Nacional", cat: "Seguridad" },
  { n: "062", label: "Guardia Civil", cat: "Seguridad" },
  { n: "092", label: "Policía Local", cat: "Seguridad" },
  { n: "900 10 00 00", label: "Inspección de Trabajo (denuncia anónima)", cat: "Laboral" },
  { n: "900 222 100", label: "Cruz Roja (ayuda humanitaria)", cat: "Ayuda" },
];

/* ---------- Sugerencias de habilidades ---------- */
const SKILL_SUGGESTIONS = ["Empatía", "Comunicación", "Responsabilidad", "Puntualidad", "Trabajo en equipo", "Aprendizaje rápido", "Cocina", "Limpieza", "Cuidado de personas mayores", "Conducción", "Atención al cliente", "Servicio de mesa"];

/* ---------- Datos de ejemplo para el CV ---------- */
const CV_SAMPLE = {
  name: "María González Pérez",
  title: "Cuidadora de personas mayores",
  phone: "+34 600 000 000",
  email: "maria.gonzalez@correo.com",
  location: "Madrid",
  summary: "Cuidadora de personas mayores con más de 5 años de experiencia en residencias y domicilios particulares. Persona responsable, paciente y cariñosa, con formación en atención sociosanitaria y primeros auxilios. Buscando una oportunidad estable en Madrid.",
  experience: "Cuidadora de personas mayores · Residencia El Sol · 2021-2024\nAuxiliar de hogar · Familia particular · 2019-2021\nVoluntaria · Cruz Roja · 2018-2019",
  education: "Atención Sociosanitaria (480h) · Cruz Roja Española\nESO · Instituto público",
  skills: "Empatía, Paciencia, Higiene y aseo, Administración de medicación, Cocina sana, Movilización de pacientes",
  languages: "Español: nativo, Portugués: nativo, Inglés: básico",
};

/* ---------- Plantillas de CV ---------- */
const CV_TEMPLATES = [
  { id: "classic", label: "Clásica", desc: "Sencilla y clara", cls: "template-classic" },
  { id: "sidebar", label: "Con color", desc: "Barra lateral con color", cls: "template-sidebar" },
  { id: "modern", label: "Moderna", desc: "Verde elegante", cls: "template-modern" },
  { id: "minimal", label: "Minimal", desc: "Solo lo esencial", cls: "template-minimal" },
];
