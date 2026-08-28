interface Topic {
  words: string[];
  replies: { es: string; en: string; pt: string };
}

const TOPICS: Topic[] = [
  {
    words: ['chatgpt', 'gemini', 'copilot', 'ia', 'prompt', 'ai', 'inteligencia'],
    replies: {
      es: 'Modo local: empieza con una tarea pequeña. Escribe el objetivo, añade el contexto, pide un formato concreto y revisa el resultado. Prueba: «Explícame este texto en 5 pasos sencillos y dame un ejemplo». Después abre Aprende IA para practicar.',
      en: 'Local mode: start with a small task. Write your goal, add context, ask for a specific format and review the result. Try: "Explain this text in 5 simple steps and give me an example". Then open Learn AI to practice.',
      pt: 'Modo local: comece com uma tarefa pequena. Escreva o objetivo, adicione o contexto, peça um formato específico e revise o resultado. Tente: «Explique este texto em 5 passos simples e me dê um exemplo». Depois abra Aprenda IA para praticar.',
    },
  },
  {
    words: ['cv', 'curriculum', 'curriculo', 'trabajo', 'trabalho', 'empleo', 'job', 'resume'],
    replies: {
      es: 'Modo local: reúne tus datos de contacto, experiencia, formación y 3 logros medibles. Adapta el CV a cada oferta y revisa fechas, teléfono y correo. Abre CV para completarlo y exportarlo.',
      en: 'Local mode: gather your contact details, experience, education and 3 measurable achievements. Adapt the CV to each job and check dates, phone and email. Open CV to complete and export it.',
      pt: 'Modo local: reúna seus contatos, experiência, formação e 3 conquistas mensuráveis. Adapte o currículo a cada vaga e revise datas, telefone e e-mail. Abra Currículo para preencher e exportar.',
    },
  },
  {
    words: ['nie', 'residencia', 'papeles', 'documentos', 'tramite', 'trámite', 'trámite', 'residency', 'papers'],
    replies: {
      es: 'Modo local: identifica el trámite exacto, guarda la fuente oficial, prepara una carpeta con documentos y confirma cita, tasas y requisitos antes de acudir. Abre Derechos y Herramientas; la app no sustituye asesoramiento jurídico.',
      en: 'Local mode: identify the exact procedure, save the official source, prepare a folder with your documents and confirm appointment, fees and requirements before going. Open Rights and Tools; the app is not a substitute for legal advice.',
      pt: 'Modo local: identifique o procedimento exato, salve a fonte oficial, prepare uma pasta com documentos e confirme agendamento, taxas e requisitos antes de ir. Abra Direitos e Ferramentas; o app não substitui orientação jurídica.',
    },
  },
  {
    words: ['alquiler', 'vivienda', 'casa', 'piso', 'rent', 'housing'],
    replies: {
      es: 'Modo local: compara el coste total, pide contrato y recibos, no entregues dinero sin justificante y conserva todas las comunicaciones. Busca apoyo en Recursos y Contactos de tu zona.',
      en: 'Local mode: compare the total cost, ask for the contract and receipts, never hand over money without proof and keep every message. Find support in Resources and Contacts in your area.',
      pt: 'Modo local: compare o custo total, peça contrato e recibos, nunca entregue dinheiro sem comprovante e guarde todas as mensagens. Busque apoio em Recursos e Contatos da sua região.',
    },
  },
  {
    words: ['español', 'espanol', 'idioma', 'aprender', 'aprenda', 'curso', 'learn', 'language'],
    replies: {
      es: 'Modo local: estudia 15 minutos al día, aprende frases para una situación real y repítelas en voz alta. En Recursos puedes filtrar cursos gratuitos y abiertos.',
      en: 'Local mode: study 15 minutes a day, learn phrases for a real situation and repeat them out loud. In Resources you can filter free and open courses.',
      pt: 'Modo local: estude 15 minutos por dia, aprenda frases para uma situação real e repita em voz alta. Em Recursos você pode filtrar cursos gratuitos e abertos.',
    },
  },
];

export function getOfflineTutorReply(question: string, language: string) {
  const lang: 'es' | 'en' | 'pt' = language === 'en' ? 'en' : (language === 'pt' || language === 'pt-BR' ? 'pt' : 'es');
  const normalized = question.toLocaleLowerCase('es');
  const topic = TOPICS.find(({ words }) => words.some((word) => normalized.includes(word)));

  if (topic) return topic.replies[lang];

  if (lang === 'en') {
    return 'Local mode: turn your question into a concrete goal. 1) What do you need to achieve? 2) What information do you have? 3) What are you missing? 4) What is your next 15-minute step? I can guide you on Learn AI, CV, Rights, Resources and Tools without storing your data outside this device.';
  }
  if (lang === 'pt') {
    return 'Modo local: transforme sua dúvida em um objetivo concreto. 1) O que você precisa alcançar? 2) Que informação você tem? 3) O que está faltando? 4) Qual é o próximo passo de 15 minutos? Posso orientar sobre Aprenda IA, Currículo, Direitos, Recursos e Ferramentas sem guardar seus dados fora deste dispositivo.';
  }
  return 'Modo local: convierte tu duda en un objetivo concreto. 1) ¿Qué necesitas conseguir? 2) ¿Qué información tienes? 3) ¿Qué te falta? 4) ¿Cuál es el siguiente paso de 15 minutos? Puedo orientarte sobre Aprende IA, CV, Derechos, Recursos y Herramientas sin guardar tus datos fuera de este dispositivo.';
}
