import { aiRegistry, ToolDefinition, ToolCall } from './ai-provider';
import { ragEngine, SearchResult } from './rag-engine';

export interface FunctionDefinition {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, {
      type: 'string' | 'number' | 'boolean' | 'array' | 'object';
      description: string;
      enum?: string[];
      items?: any;
    }>;
    required: string[];
  };
}

export interface FunctionResult {
  success: boolean;
  result: any;
  error?: string;
  metadata?: Record<string, any>;
}

type FunctionHandler = (args: Record<string, any>, context: FunctionContext) => Promise<FunctionResult>;

export interface FunctionContext {
  userId?: string;
  sessionId?: string;
  locale: string;
  userLocation?: { lat: number; lng: number; city?: string; country?: string };
  permissions: string[];
  metadata: Record<string, any>;
}

class FunctionRegistry {
  private functions: Map<string, { definition: FunctionDefinition; handler: FunctionHandler }> = new Map();
  private middleware: Array<(name: string, args: any, context: FunctionContext) => Promise<void>> = [];

  register(definition: FunctionDefinition, handler: FunctionHandler) {
    this.functions.set(definition.name, { definition, handler });
  }

  unregister(name: string) {
    this.functions.delete(name);
  }

  getDefinition(name: string): FunctionDefinition | undefined {
    return this.functions.get(name)?.definition;
  }

  getAllDefinitions(): FunctionDefinition[] {
    return Array.from(this.functions.values()).map(f => f.definition);
  }

  addMiddleware(fn: (name: string, args: any, context: FunctionContext) => Promise<void>) {
    this.middleware.push(fn);
  }

  async execute(name: string, args: Record<string, any>, context: FunctionContext): Promise<any> {
    const fn = this.functions.get(name);
    if (!fn) throw new Error(`Function not found: ${name}`);

    for (const mw of this.middleware) {
      await mw(name, args, context);
    }

    return fn.handler(args, context);
  }

  getToolsForAI(): FunctionDefinition[] {
    return this.getAllDefinitions();
  }
}

export const functionRegistry = new FunctionRegistry();

function createFunctionContext(overrides: Partial<FunctionContext> = {}): FunctionContext {
  return {
    locale: 'es',
    permissions: ['read', 'write', 'search', 'cv', 'cv-create', 'cv-export', 'resources', 'rights', 'tools', 'ia'],
    metadata: {},
    ...overrides
  };
}

functionRegistry.addMiddleware(async (name, args, context) => {
  console.log(`[Function] ${name} called with:`, JSON.stringify(args));
});

functionRegistry.register(
  {
    name: 'search_resources',
    description: 'Busca recursos verificados (cursos, ONGs, oficinas, teléfonos, webs) por categoría, ciudad, idioma o palabra clave. Devuelve recursos con fuente, verificación y contacto.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Palabras clave de búsqueda (ej: "curso español gratis Madrid")' },
        category: { type: 'string', enum: ['educacion', 'empleo', 'vivienda', 'salud', 'legal', 'infancia', 'mujeres', 'lgbtq', 'emergencias', 'documentacion', 'ayudas', 'tramites', 'comunidad', 'idiomas', 'tecnologia', 'cultura', 'transporte', 'alimentacion', 'psicologia', 'dinero', 'otros'], description: 'Categoría del recurso' },
        city: { type: 'string', description: 'Ciudad o municipio (ej: Madrid, Barcelona, Valencia)' },
        language: { type: 'string', description: 'Idioma del recurso (es, en, pt, fr, ar, zh, etc.)' },
        lat: { type: 'number', description: 'Latitud para búsqueda por proximidad' },
        lng: { type: 'number', description: 'Longitud para búsqueda por proximidad' },
        radiusKm: { type: 'number', description: 'Radio en kilómetros para búsqueda por proximidad', default: 10 },
        limit: { type: 'number', description: 'Máximo número de resultados', default: 10, maximum: 50 }
      },
      required: []
    }
  },
  async (args, context) => {
    const results = await ragEngine.search(args.query || '', {
      topK: args.limit || 10,
      filter: {
        ...(args.category && { category: args.category }),
        ...(args.city && { city: args.city }),
        ...(args.language && { language: args.language })
      },
      minScore: 0.6
    });

    return {
      success: true,
      result: results.map(r => ({
        id: r.chunk.metadata.resourceId,
        title: r.chunk.metadata.title,
        description: r.chunk.content.slice(0, 300),
        category: r.chunk.metadata.category,
        city: r.chunk.metadata.location?.city,
        language: r.chunk.metadata.language,
        verifiedAt: r.chunk.metadata.verifiedAt,
        url: r.chunk.metadata.url,
        score: Math.round(r.score * 100)
      }),
      metadata: { query: args.query, total: results.length }
    };
  }
);

functionRegistry.register(
  {
    name: 'search_rights',
    description: 'Busca guías de derechos y trámites (NIE, arraigo, asilo, vivienda, ayudas, SMI, violencia de género, trata). Devuelve guías paso a paso con infografías y checklists.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Tema o pregunta sobre derechos (ej: "cómo renovar NIE", "arraigo familiar")' },
        topic: { type: 'string', enum: ['nie', 'arraigo', 'asilo', 'nacionalidad', 'vivienda', 'smi', 'prestaciones', 'violencia-genero', 'trata', 'empleo', 'salud', 'educacion', 'documentacion'], description: 'Tema específico de derechos' },
        limit: { type: 'number', default: 5, maximum: 20 }
      },
      required: []
    }
  },
  async (args, context) => {
    const results = await ragEngine.search(args.query || '', {
      topK: args.limit || 5,
      filter: { category: 'rights-guide', ...(args.topic && { topic: args.topic }) },
      minScore: 0.5
    });

    return {
      success: true,
      result: results.map(r => ({
        title: r.chunk.metadata.title,
        content: r.chunk.content.slice(0, 500),
        category: r.chunk.metadata.category,
        tags: r.chunk.metadata.tags,
        section: r.chunk.metadata.section
      }),
      metadata: { query: args.query, total: results.length }
    };
  }
);

functionRegistry.register(
  {
    name: 'generate_cv',
    description: 'Genera un CV profesional en formato Europass/ATS con IA. Requiere datos personales, experiencia, formación y habilidades. Devuelve JSON estructurado y opciones de exportación.',
    parameters: {
      type: 'object',
      properties: {
        personalData: {
          type: 'object',
          properties: {
            fullName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            address: { type: 'string' },
            linkedin: { type: 'string' },
            portfolio: { type: 'string' },
            nationality: { type: 'string' },
            birthDate: { type: 'string' }
          },
          required: ['fullName', 'email']
        },
        experience: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              company: { type: 'string' },
              position: { type: 'string' },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
              current: { type: 'boolean' },
              description: { type: 'string' },
              achievements: { type: 'array', items: { type: 'string' } },
              location: { type: 'string' }
            },
            required: ['company', 'position', 'startDate']
          }
        },
        education: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              institution: { type: 'string' },
              degree: { type: 'string' },
              field: { type: 'string' },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
              current: { type: 'boolean' },
              grade: { type: 'string' },
              location: { type: 'string' }
            },
            required: ['institution', 'degree']
          }
        },
        skills: {
          type: 'array',
          items: { type: 'object', properties: { name: { type: 'string' }, level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'expert'] }, category: { type: 'string' } }, required: ['name'] }
        },
        languages: {
          type: 'array',
          items: { type: 'object', properties: { language: { type: 'string' }, level: { type: 'string', enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'native'] } }, required: ['language', 'level'] }
        },
        template: { type: 'string', enum: ['europass', 'modern', 'minimal', 'creative', 'ats'], default: 'europass' },
        language: { type: 'string', default: 'es' }
      },
      required: ['personalData']
    }
  },
  async (args, context) => {
    const { invokeAIText } = await import('./ai-provider');

    const prompt = `Genera un CV profesional en formato ${args.template || 'europass'} en ${args.language || 'es'}.
Datos personales: ${JSON.stringify(args.personalData, null, 2)}
Experiencia: ${JSON.stringify(args.experience || [], null, 2)}
Educación: ${JSON.stringify(args.education || [], null, 2)}
Habilidades: ${JSON.stringify(args.skills || [], null, 2)}
Idiomas: ${JSON.stringify(args.languages || [], null, 2)}

Requisitos:
- Formato Europass estándar europeo / compatible ATS
- Palabras clave para ATS (InfoJobs, LinkedIn)
- Verbos de acción, logros cuantificables
- Estructura: Datos personales > Perfil > Experiencia > Educación > Habilidades > Idiomas > Referencias
- Longitud: 1-2 páginas máximo`;

    const result = await invokeAIText(
      'Eres un experto en RRHH y creación de CVs profesionales. Generas CVs optimizados para ATS y formato Europass.',
      prompt
    );

    return {
      success: true,
      result: {
        cvText: result.text,
        template: args.template || 'europass',
        language: args.language || 'es',
        exportFormats: ['pdf', 'json', 'txt', 'docx']
      },
      metadata: { provider: result.provider, model: result.model }
    };
  }
);

functionRegistry.register(
  {
    name: 'generate_cover_letter',
    description: 'Genera una carta de presentación personalizada para una oferta de empleo específica.',
    parameters: {
      type: 'object',
      properties: {
        jobTitle: { type: 'string' },
        company: { type: 'string' },
        jobDescription: { type: 'string' },
        candidateProfile: { type: 'string' },
        language: { type: 'string', default: 'es' },
        tone: { type: 'string', enum: ['formal', 'professional', 'enthusiastic', 'creative'], default: 'professional' }
      },
      required: ['jobTitle', 'company', 'candidateProfile']
    }
  },
  async (args, context) => {
    const { invokeAIText } = await import('./ai-provider');

    const prompt = `Escribe una carta de presentación en ${args.language || 'es'} con tono ${args.tone || 'professional'} para:
Puesto: ${args.jobTitle}
Empresa: ${args.company}
Descripción del puesto: ${args.jobDescription || 'No proporcionada'}
Perfil del candidato: ${args.candidateProfile}

Estructura: Saludo > Motivación > Aporte de valor (3 logros clave) > Cierre > Despedida.
Longitud: 250-400 palabras.`;

    const result = await invokeAIText(
      'Eres un experto en cartas de presentación profesionales. Escribes cartas persuasivas, personalizadas y sin plantillas genéricas.',
      prompt
    );

    return {
      success: true,
      result: { coverLetter: result.text, language: args.language || 'es', tone: args.tone || 'professional' },
      metadata: { provider: result.provider, model: result.model }
    };
  }
);

functionRegistry.register(
  {
    name: 'analyze_cv_ats',
    description: 'Analiza un CV contra una oferta de empleo y calcula compatibilidad ATS. Devuelve puntuación, palabras clave faltantes y recomendaciones.',
    parameters: {
      type: 'object',
      properties: {
        cvText: { type: 'string', description: 'Texto completo del CV' },
        jobDescription: { type: 'string', description: 'Descripción de la oferta de empleo' },
        language: { type: 'string', default: 'es' }
      },
      required: ['cvText', 'jobDescription']
    }
  },
  async (args, context) => {
    const { invokeAIText } = await import('./ai-provider');

    const prompt = `Analiza la compatibilidad ATS entre este CV y la oferta de empleo.

CV:
${args.cvText}

OFERTA:
${args.jobDescription}

Devuelve JSON con:
{
  "score": 0-100,
  "matchedKeywords": [],
  "missingKeywords": [],
  "recommendations": [],
  "formatIssues": [],
  "strengths": []
}`;

    const result = await invokeAIText(
      'Eres un experto en ATS (Applicant Tracking Systems) y optimización de CVs. Analizas compatibilidad y das recomendaciones accionables.',
      prompt
    );

    return {
      success: true,
      result: { analysis: result.text },
      metadata: { provider: result.provider, model: result.model }
    };
  }
);

functionRegistry.register(
  {
    name: 'get_course_progress',
    description: 'Obtiene el progreso del usuario en un curso específico (IA, Office, Nivel 0).',
    parameters: {
      type: 'object',
      properties: {
        courseId: { type: 'string', description: 'ID del curso (ej: chatgpt-basico, excel-basico, nivel0-modulo-1)' },
        userId: { type: 'string' }
      },
      required: ['courseId']
    }
  },
  async (args, context) => {
    // This would integrate with the actual progress store
    return {
      success: true,
      result: { progress: 0, completedLessons: [], lastAccessed: null },
      metadata: { note: 'Integrar con store de progreso real' }
    };
  }
);

functionRegistry.register(
  {
    name: 'get_user_progress',
    description: 'Obtiene el progreso global del usuario en todos los cursos.',
    parameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' }
      },
      required: ['userId']
    }
  },
  async (args, context) => {
    return {
      success: true,
      result: { courses: [], totalProgress: 0, streak: 0 },
      metadata: { note: 'Integrar con store de progreso real' }
    };
  }
);

functionRegistry.register(
  {
    name: 'get_nearby_offices',
    description: 'Busca oficinas de extranjería, SEPE, ayuntamientos, ONGs cercanas a una ubicación.',
    parameters: {
      type: 'object',
      properties: {
        lat: { type: 'number', description: 'Latitud' },
        lng: { type: 'number', description: 'Longitud' },
        radiusKm: { type: 'number', default: 10 },
        type: { type: 'string', enum: ['extranjeria', 'sepe', 'ayuntamiento', 'ong', 'salud', 'educacion', 'vivienda', 'todos'], default: 'todos' },
        limit: { type: 'number', default: 10, maximum: 50 }
      },
      required: ['lat', 'lng']
    }
  },
  async (args, context) => {
    const results = await ragEngine.search('', {
      topK: args.limit || 10,
      filter: {
        category: args.type !== 'todos' ? args.type : undefined,
        location: { lat: args.lat, lng: args.lng }
      },
      minScore: 0.3
    });

    return {
      success: true,
      result: results.map(r => ({
        name: r.chunk.metadata.title,
        type: r.chunk.metadata.category,
        address: r.chunk.metadata.location,
        distance: r.chunk.metadata.distance,
        phone: r.chunk.metadata.phone,
        email: r.chunk.metadata.email,
        hours: r.chunk.metadata.hours,
        url: r.chunk.metadata.url
      })),
      metadata: { location: { lat: args.lat, lng: args.lng }, radius: args.radiusKm }
    };
  }
);

functionRegistry.register(
  {
    name: 'calculate_cost_of_life',
    description: 'Calcula el coste de vida estimado en una ciudad española (alquiler, comida, transporte, ocio).',
    parameters: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'Ciudad (Madrid, Barcelona, Valencia, etc.)' },
        householdSize: { type: 'number', default: 1 },
        lifestyle: { type: 'string', enum: ['economico', 'moderado', 'confortable'], default: 'moderado' }
      },
      required: ['city']
    }
  },
  async (args, context) => {
    const { invokeAIText } = await import('./ai-provider');

    const result = await invokeAIText(
      'Eres un experto en coste de vida en España. Proporciona estimaciones realistas y desglosadas.',
      `Calcula el coste de vida mensual estimado en ${args.city} para ${args.householdSize} persona(s) con estilo de vida ${args.lifestyle || 'moderado'}.
Desglosa: Alquiler (habitación/piso), Comida, Transporte, Servicios, Ocio, Imprevistos.
Da rangos (mín-máx) y total. Indica fuentes si es posible.`
    );

    return {
      success: true,
      result: { analysis: result.text, city: args.city },
      metadata: { provider: result.provider }
    };
  }
);

functionRegistry.register(
  {
    name: 'check_document_validity',
    description: 'Verifica si un documento (NIE, TIE, pasaporte, DNI, permiso trabajo) está vigente y qué se necesita para renovarlo.',
    parameters: {
      type: 'object',
      properties: {
        documentType: { type: 'string', enum: ['NIE', 'TIE', 'pasaporte', 'DNI', 'permiso_trabajo', 'empadronamiento', 'tarjeta_sanitaria'], description: 'Tipo de documento' },
        expiryDate: { type: 'string', description: 'Fecha de caducidad (YYYY-MM-DD)' },
        nationality: { type: 'string' }
      },
      required: ['documentType', 'expiryDate']
    }
  },
  async (args, context) => {
    const { invokeAIText } = await import('./ai-provider');

    const result = await invokeAIText(
      'Eres un experto en documentación de extranjería en España. Proporcionas información precisa y actualizada.',
      `Documento: ${args.documentType}
Caducidad: ${args.expiryDate}
Nacionalidad: ${args.nationality || 'No especificada'}

Indica: 1) Si está vigente o caducado 2) Días para caducar 3) Pasos para renovar 4) Documentos necesarios 5) Tasas 6) Dónde tramitar 7) Plazos 8) Enlaces oficiales`
    );

    return {
      success: true,
      result: { analysis: result.text },
      metadata: { provider: result.provider }
    };
  }
);

functionRegistry.register(
  {
    name: 'translate_text',
    description: 'Traduce texto entre los 39 idiomas soportados por la plataforma.',
    parameters: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Texto a traducir' },
        targetLanguage: { type: 'string', description: 'Código de idioma destino (es, en, pt, fr, ar, zh, etc.)' },
        sourceLanguage: { type: 'string', description: 'Idioma origen (auto-detect si se omite)' }
      },
      required: ['text', 'targetLanguage']
    }
  },
  async (args, context) => {
    const { invokeAIText } = await import('./ai-provider');

    const result = await invokeAIText(
      `Eres un traductor profesional. Traduce al ${args.targetLanguage} manteniendo el tono, formato y terminología técnica. No añadas explicaciones.`,
      args.text
    );

    return {
      success: true,
      result: { translatedText: result.text, targetLanguage: args.targetLanguage },
      metadata: { provider: result.provider }
    };
  }
);

functionRegistry.register(
  {
    name: 'get_legal_guide',
    description: 'Obtiene una guía legal paso a paso para un trámite específico (NIE, arraigo, asilo, nacionalidad, vivienda, ayudas).',
    parameters: {
      type: 'object',
      properties: {
        procedure: { type: 'string', enum: ['nie_primera_vez', 'nie_renovacion', 'arraigo_familiar', 'arraigo_laboral', 'arraigo_social', 'asilo', 'nacionalidad_residencia', 'nacionalidad_origen', 'empadronamiento', 'tarjeta_sanitaria', 'permiso_trabajo', 'reagrupacion_familiar', 'ayuda_vivienda', 'imv', 'rai', 'beca_mec', 'cita_previa_extranjeria'], description: 'Trámite específico' },
        city: { type: 'string', description: 'Ciudad para info local' },
        language: { type: 'string', default: 'es' }
      },
      required: ['procedure']
    }
  },
  async (args, context) => {
    const { invokeAIText } = await import('./ai-provider');

    const result = await invokeAIText(
      `Eres un gestor administrativo experto en trámites de extranjería en España. Proporcionas guías paso a paso, formularios, tasas, plazos y enlaces oficiales.`,
      `Genera una guía completa para: ${args.procedure}
${args.city ? `Ciudad: ${args.city}` : ''}
Idioma: ${args.language || 'es'}

Incluye: 1) Requisitos 2) Documentos necesarios 3) Pasos detallados 4) Tasas 5) Plazos 6) Dónde presentar 7) Citas previas 8) Problemas comunes 9) Recursos de ayuda 10) Enlaces oficiales`
    );

    return {
      success: true,
      result: { guide: result.text, procedure: args.procedure },
      metadata: { provider: result.provider }
    };
  }
);

functionRegistry.register(
  {
    name: 'create_checklist',
    description: 'Crea una checklist personalizada para un trámite o objetivo.',
    parameters: {
      type: 'object',
      properties: {
        goal: { type: 'string', description: 'Objetivo (ej: renovar NIE, buscar trabajo, alquilar piso)' },
        timeline: { type: 'string', enum: ['urgente', '1_semana', '1_mes', '3_meses', 'flexible'], default: 'flexible' },
        language: { type: 'string', default: 'es' }
      },
      required: ['goal']
    }
  },
  async (args, context) => {
    const { invokeAIText } = await import('./ai-provider');

    const result = await invokeAIText(
      'Eres un coach de productividad. Creas checklists accionables, priorizadas y con plazos realistas.',
      `Crea una checklist para: ${args.goal}
Plazo: ${args.timeline || 'flexible'}
Idioma: ${args.language || 'es'}

Formato: Checklist numerada con prioridad (Alta/Media/Baja), plazo estimado, recursos necesarios, y casilla de verificación.`
    );

    return {
      success: true,
      result: { checklist: result.text },
      metadata: { provider: result.provider }
    };
  }
);

functionRegistry.register(
  {
    name: 'get_emergency_contacts',
    description: 'Obtiene contactos de emergencia (112, 016, 061, embajadas, consulados, ONGs de apoyo).',
    parameters: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['emergencia', 'violencia_genero', 'tratamiento_adicciones', 'salud_mental', 'denuncia', 'embajada', 'consulado', 'ong_apoyo', 'todos'], default: 'todos' },
        country: { type: 'string', default: 'España' },
        city: { type: 'string' }
      },
      required: []
    }
  },
  async (args, context) => {
    const contacts = {
      emergencia: { nombre: 'Emergencias', telefono: '112', descripcion: 'Emergencias generales (gratis, 24h, multilingüe)' },
      violencia_genero: { nombre: 'Violencia de Género', telefono: '016', descripcion: 'Atención a víctimas (gratis, 24h, no deja rastro en factura)' },
      salud_mental: { nombre: 'Salud Mental / Prevención Suicidio', telefono: '024', descripcion: 'Línea de atención (gratis, 24h, confidencial)' },
      tratamiento_adicciones: { nombre: 'Adicciones', telefono: '900 200 200', descripcion: 'Información y derivación (gratis)' },
      denuncia: { nombre: 'Guardia Civil / Policía', telefono: '062 / 091', descripcion: 'Denuncias y emergencias seguridad' },
      embajada: { nombre: 'Embajada/Consulado', telefono: 'Consultar web', descripcion: 'Buscar en https://www.exteriores.gob.es' },
      ong_apoyo: { nombre: 'ONGs Apoyo Migrantes', telefono: 'Varía', descripcion: 'CEAR, Cruz Roja, ACCEM, Cáritas, Fundación Secretariado Gitano' }
    };

    if (args.type && args.type !== 'todos') {
      return { success: true, result: { [args.type]: contacts[args.type as keyof typeof contacts] } };
    }
    return { success: true, result: contacts };
  }
);

functionRegistry.register(
  {
    name: 'search_courses',
    description: 'Busca cursos disponibles (IA, Office, Nivel 0, externos) por tema, nivel, idioma o duración.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        category: { type: 'string', enum: ['ia', 'office', 'nivel0', 'externos', 'idiomas', 'tecnologia', 'marketing', 'diseño', 'negocios'] },
        level: { type: 'string', enum: ['basico', 'intermedio', 'avanzado'] },
        language: { type: 'string' },
        maxDuration: { type: 'number' },
        freeOnly: { type: 'boolean', default: true }
      },
      required: []
    }
  },
  async (args, context) => {
    const results = await ragEngine.search(args.query || '', {
      topK: 15,
      filter: {
        category: args.category ? { $in: [args.category] } : undefined,
        level: args.level,
        language: args.language,
        free: args.freeOnly
      },
      minScore: 0.5
    });

    return {
      success: true,
      result: results.map(r => ({
        id: r.chunk.metadata.resourceId,
        title: r.chunk.metadata.title,
        description: r.chunk.content.slice(0, 200),
        category: r.chunk.metadata.category,
        level: r.chunk.metadata.level,
        duration: r.chunk.metadata.duration,
        language: r.chunk.metadata.language,
        free: r.chunk.metadata.free,
        url: r.chunk.metadata.url
      })),
      metadata: { total: results.length }
    };
  }
);

functionRegistry.register(
  {
    name: 'get_ai_course_content',
    description: 'Obtiene el contenido completo de una lección de un curso de IA (ChatGPT, Gemini, Copilot, etc.).',
    parameters: {
      type: 'object',
      properties: {
        courseId: { type: 'string', description: 'ID del curso (chatgpt-basico, gemini-avanzado, etc.)' },
        lessonId: { type: 'string', description: 'ID de la lección' },
        language: { type: 'string', default: 'es' }
      },
      required: ['courseId', 'lessonId']
    }
  },
  async (args, context) => {
    return {
      success: true,
      result: { content: 'Integrar con store de cursos real', courseId: args.courseId, lessonId: args.lessonId },
      metadata: { note: 'Integrar con data/ai-courses.ts' }
    };
  }
);

export const functions = functionRegistry;
export { createFunctionContext };