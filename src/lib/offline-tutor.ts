const TOPICS: Array<{ words: string[]; reply: string }> = [
  {
    words: ['chatgpt', 'gemini', 'copilot', 'ia', 'prompt'],
    reply: 'Modo local: empieza con una tarea pequeña. Escribe el objetivo, añade el contexto, pide un formato concreto y revisa el resultado. Prueba: «Explícame este texto en 5 pasos sencillos y dame un ejemplo». Después abre Aprende IA para practicar.',
  },
  {
    words: ['cv', 'curriculum', 'currículum', 'trabajo', 'empleo'],
    reply: 'Modo local: reúne tus datos de contacto, experiencia, formación y 3 logros medibles. Adapta el CV a cada oferta y revisa fechas, teléfono y correo. Abre CV para completarlo y exportarlo.',
  },
  {
    words: ['nie', 'residencia', 'papeles', 'documentos', 'tramite', 'trámite'],
    reply: 'Modo local: identifica el trámite exacto, guarda la fuente oficial, prepara una carpeta con documentos y confirma cita, tasas y requisitos antes de acudir. Abre Derechos y Herramientas; la app no sustituye asesoramiento jurídico.',
  },
  {
    words: ['alquiler', 'vivienda', 'casa', 'piso'],
    reply: 'Modo local: compara el coste total, pide contrato y recibos, no entregues dinero sin justificante y conserva todas las comunicaciones. Busca apoyo en Recursos y Contactos de tu zona.',
  },
  {
    words: ['español', 'idioma', 'aprender', 'curso'],
    reply: 'Modo local: estudia 15 minutos al día, aprende frases para una situación real y repítelas en voz alta. En Recursos puedes filtrar cursos gratuitos y abiertos.',
  },
];

export function getOfflineTutorReply(question: string, language: string) {
  if (language !== 'es') {
    return 'Modo local disponible. Puedo ayudarte con IA, CV, trámites, vivienda, cursos y recursos. Escribe una pregunta breve en español o conecta la IA remota cuando tengas internet.';
  }

  const normalized = question.toLocaleLowerCase('es');
  const topic = TOPICS.find(({ words }) => words.some((word) => normalized.includes(word)));
  if (topic) return topic.reply;

  return 'Modo local: convierte tu duda en un objetivo concreto. 1) ¿Qué necesitas conseguir? 2) ¿Qué información tienes? 3) ¿Qué te falta? 4) ¿Cuál es el siguiente paso de 15 minutos? Puedo orientarte sobre Aprende IA, CV, Derechos, Recursos y Herramientas sin guardar tus datos fuera de este dispositivo.';
}
