import { ToolDefinition } from './ai-provider';

export interface FunctionContext {
  userId?: string;
  sessionId?: string;
  locale: string;
  userLocation?: { lat: number; lng: number; city?: string; country?: string };
  permissions: string[];
  metadata: Record<string, any>;
}

export function createFunctionContext(overrides: Partial<FunctionContext> = {}): FunctionContext {
  return {
    locale: 'es',
    permissions: ['read', 'write', 'search', 'cv', 'cv-create', 'cv-export', 'resources', 'rights', 'tools', 'ia'],
    metadata: {},
    ...overrides
  };
}

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
      default?: any;
      maximum?: number;
      minimum?: number;
      properties?: Record<string, any>;
      required?: string[];
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

  async execute(name: string, args: Record<string, any>, context: FunctionContext): Promise<FunctionResult> {
    const fn = this.functions.get(name);
    if (!fn) throw new Error(`Function not found: ${name}`);

    for (const mw of this.middleware) {
      await mw(name, args, context);
    }

    return fn.handler(args, context);
  }

  getToolsForAI(): any[] {
    return this.getAllDefinitions().map(def => ({
      type: 'function',
      function: def
    }));
  }
}

export const functionRegistry = new FunctionRegistry();

functionRegistry.addMiddleware(async (name, args, context) => {
  console.log(`[Function] ${name} called with:`, JSON.stringify(args));
});

// --- Built-in Functions ---

functionRegistry.register(
  {
    name: 'search_resources',
    description: 'Busca recursos verificados (cursos, ONGs, oficinas, teléfonos, webs) por categoría, ciudad, idioma o palabra clave.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Palabras clave de búsqueda' },
        category: { type: 'string', description: 'Categoría del recurso' },
        city: { type: 'string', description: 'Ciudad o municipio' },
        language: { type: 'string', description: 'Idioma del recurso' },
        lat: { type: 'number', description: 'Latitud para búsqueda por proximidad' },
        lng: { type: 'number', description: 'Longitud para búsqueda por proximidad' },
        radiusKm: { type: 'number', description: 'Radio en kilómetros', default: 10 },
        limit: { type: 'number', description: 'Máximo número de resultados', default: 10, maximum: 50 }
      },
      required: []
    }
  },
  async (args, context) => {
    return { success: true, result: [], metadata: { query: args.query, total: 0 } };
  }
);

functionRegistry.register(
  {
    name: 'search_rights',
    description: 'Busca guías de derechos y trámites (NIE, arraigo, asilo, vivienda, ayudas).',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Tema o pregunta sobre derechos' },
        topic: { type: 'string', description: 'Tema específico de derechos' },
        limit: { type: 'number', description: 'Máximo número de resultados', default: 5, maximum: 20 }
      },
      required: []
    }
  },
  async (args, context) => {
    return { success: true, result: [], metadata: { query: args.query, total: 0 } };
  }
);

functionRegistry.register(
  {
    name: 'generate_cv',
    description: 'Genera un CV profesional en formato Europass/ATS con IA.',
    parameters: {
      type: 'object',
      properties: {
        personalData: {
          type: 'object',
          description: 'Datos personales del candidato',
          properties: {
            fullName: { type: 'string', description: 'Nombre completo' },
            email: { type: 'string', description: 'Email de contacto' },
            phone: { type: 'string', description: 'Teléfono de contacto' }
          },
          required: ['fullName', 'email']
        },
        experience: {
          type: 'array',
          description: 'Experiencia laboral',
          items: {
            type: 'object',
            properties: {
              company: { type: 'string', description: 'Nombre de la empresa' },
              position: { type: 'string', description: 'Puesto de trabajo' },
              startDate: { type: 'string', description: 'Fecha de inicio' },
              endDate: { type: 'string', description: 'Fecha de fin' },
              current: { type: 'boolean', description: 'Trabajo actual' },
              description: { type: 'string', description: 'Descripción del puesto' }
            }
          }
        },
        education: {
          type: 'array',
          description: 'Formación académica',
          items: {
            type: 'object',
            properties: {
              institution: { type: 'string', description: 'Institución educativa' },
              degree: { type: 'string', description: 'Título obtenido' },
              field: { type: 'string', description: 'Área de estudio' }
            }
          }
        },
        skills: {
          type: 'array',
          description: 'Habilidades y competencias',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Nombre de la habilidad' },
              level: { type: 'string', description: 'Nivel de dominio' }
            },
            required: ['name']
          }
        },
        languages: {
          type: 'array',
          description: 'Idiomas',
          items: {
            type: 'object',
            properties: {
              language: { type: 'string', description: 'Idioma' },
              level: { type: 'string', description: 'Nivel (A1-C2)' }
            },
            required: ['language', 'level']
          }
        },
        template: { type: 'string', description: 'Plantilla de CV', enum: ['europass', 'modern', 'minimal', 'creative', 'ats'], default: 'europass' },
        language: { type: 'string', description: 'Idioma del CV', default: 'es' }
      },
      required: ['personalData']
    }
  },
  async (args, context) => {
    return { success: true, result: { cvText: 'CV generado', template: args.template || 'europass', language: args.language || 'es' }, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'generate_cover_letter',
    description: 'Genera una carta de presentación personalizada.',
    parameters: {
      type: 'object',
      properties: {
        jobTitle: { type: 'string', description: 'Título del puesto' },
        company: { type: 'string', description: 'Nombre de la empresa' },
        jobDescription: { type: 'string', description: 'Descripción del puesto' },
        candidateProfile: { type: 'string', description: 'Perfil del candidato' },
        language: { type: 'string', description: 'Idioma de la carta', default: 'es' },
        tone: { type: 'string', description: 'Tono de la carta', enum: ['formal', 'professional', 'enthusiastic', 'creative'], default: 'professional' }
      },
      required: ['jobTitle', 'company', 'jobDescription', 'candidateProfile']
    }
  },
  async (args, context) => {
    return { success: true, result: { coverLetter: 'Carta generada', language: args.language || 'es' }, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'analyze_cv_ats',
    description: 'Analiza un CV contra una oferta de empleo y calcula compatibilidad ATS.',
    parameters: {
      type: 'object',
      properties: {
        cvText: { type: 'string', description: 'Texto completo del CV' },
        jobDescription: { type: 'string', description: 'Descripción de la oferta de empleo' },
        language: { type: 'string', description: 'Idioma del análisis', default: 'es' }
      },
      required: ['cvText', 'jobDescription']
    }
  },
  async (args, context) => {
    return { success: true, result: { analysis: 'Análisis ATS' }, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'get_nearby_offices',
    description: 'Busca oficinas de extranjería, SEPE, ayuntamientos, ONGs cercanas.',
    parameters: {
      type: 'object',
      properties: {
        lat: { type: 'number', description: 'Latitud' },
        lng: { type: 'number', description: 'Longitud' },
        radiusKm: { type: 'number', description: 'Radio de búsqueda en km', default: 10 },
        type: { type: 'string', description: 'Tipo de oficina', enum: ['extranjeria', 'sepe', 'ayuntamiento', 'ong', 'salud', 'educacion', 'vivienda', 'todos'], default: 'todos' },
        limit: { type: 'number', description: 'Máximo número de resultados', default: 10, maximum: 50 }
      },
      required: ['lat', 'lng']
    }
  },
  async (args, context) => {
    return { success: true, result: [], metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'calculate_cost_of_life',
    description: 'Calcula el coste de vida estimado en una ciudad española.',
    parameters: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'Ciudad' },
        householdSize: { type: 'number', description: 'Tamaño del hogar', default: 1 },
        lifestyle: { type: 'string', description: 'Estilo de vida', enum: ['economico', 'moderado', 'confortable'], default: 'moderado' }
      },
      required: ['city']
    }
  },
  async (args, context) => {
    return { success: true, result: { analysis: 'Coste de vida calculado' }, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'check_document_validity',
    description: 'Verifica si un documento (NIE, TIE, pasaporte, DNI) está vigente.',
    parameters: {
      type: 'object',
      properties: {
        documentType: { type: 'string', description: 'Tipo de documento', enum: ['NIE', 'TIE', 'pasaporte', 'DNI', 'permiso_trabajo'] },
        expiryDate: { type: 'string', description: 'Fecha de expiración (YYYY-MM-DD)' },
        nationality: { type: 'string', description: 'Nacionalidad del titular' }
      },
      required: ['documentType', 'expiryDate']
    }
  },
  async (args, context) => {
    return { success: true, result: { analysis: 'Documento verificado' }, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'translate_text',
    description: 'Traduce texto entre los 39 idiomas soportados.',
    parameters: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Texto a traducir' },
        targetLanguage: { type: 'string', description: 'Idioma destino' },
        sourceLanguage: { type: 'string', description: 'Idioma origen (auto-detecta si se omite)' }
      },
      required: ['text', 'targetLanguage']
    }
  },
  async (args, context) => {
    return { success: true, result: { translatedText: 'Texto traducido', targetLanguage: args.targetLanguage }, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'get_legal_guide',
    description: 'Obtiene una guía legal paso a paso para un trámite específico.',
    parameters: {
      type: 'object',
      properties: {
        procedure: { type: 'string', description: 'Trámite para la guía', enum: ['nie_primera_vez', 'nie_renovacion', 'arraigo_familiar', 'asilo', 'nacionalidad', 'empadronamiento', 'tarjeta_sanitaria', 'permiso_trabajo'] },
        city: { type: 'string', description: 'Ciudad donde se realiza el trámite' },
        language: { type: 'string', description: 'Idioma de la guía', default: 'es' }
      },
      required: ['procedure']
    }
  },
  async (args, context) => {
    return { success: true, result: { guide: 'Guía legal generada' }, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'create_checklist',
    description: 'Crea una checklist personalizada para un trámite o objetivo.',
    parameters: {
      type: 'object',
      properties: {
        goal: { type: 'string', description: 'Objetivo' },
        timeline: { type: 'string', description: 'Plazo para completar', enum: ['urgente', '1_semana', '1_mes', '3_meses', 'flexible'], default: 'flexible' },
        language: { type: 'string', description: 'Idioma de la checklist', default: 'es' }
      },
      required: ['goal']
    }
  },
  async (args, context) => {
    return { success: true, result: { checklist: 'Checklist generada' }, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'get_emergency_contacts',
    description: 'Obtiene contactos de emergencia (112, 016, 061, embajadas, consulados, ONGs).',
    parameters: {
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Tipo de contacto', enum: ['emergencia', 'violencia_genero', 'salud_mental', 'denuncia', 'embajada', 'consulado', 'ong_apoyo', 'todos'], default: 'todos' },
        country: { type: 'string', description: 'País', default: 'España' },
        city: { type: 'string', description: 'Ciudad' }
      },
      required: []
    }
  },
  async (args, context) => {
    const contacts = {
      emergencia: { nombre: 'Emergencias', telefono: '112', descripcion: 'Emergencias generales' },
      violencia_genero: { nombre: 'Violencia de Género', telefono: '016', descripcion: 'Atención a víctimas' },
      salud_mental: { nombre: 'Salud Mental', telefono: '024', descripcion: 'Línea de atención' }
    };
    return { success: true, result: contacts[args.type || 'todos'] || contacts, metadata: {} };
  }
);

functionRegistry.register(
  {
    name: 'search_courses',
    description: 'Busca cursos disponibles (IA, Office, Nivel 0, externos) por tema, nivel, idioma o duración.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Palabras clave de búsqueda' },
        category: { type: 'string', description: 'Categoría del curso', enum: ['ia', 'office', 'nivel0', 'externos', 'idiomas', 'tecnologia', 'marketing', 'diseño', 'negocios'] },
        level: { type: 'string', description: 'Nivel del curso', enum: ['basico', 'intermedio', 'avanzado'] },
        language: { type: 'string', description: 'Idioma del curso' },
        maxDuration: { type: 'number', description: 'Duración máxima en horas' },
        freeOnly: { type: 'boolean', description: 'Solo cursos gratuitos', default: true }
      },
      required: []
    }
  },
  async (args, context) => {
    return { success: true, result: [], metadata: { total: 0 } };
  }
);

functionRegistry.register(
  {
    name: 'get_ai_course_content',
    description: 'Obtiene el contenido completo de una lección de un curso de IA.',
    parameters: {
      type: 'object',
      properties: {
        courseId: { type: 'string', description: 'ID del curso' },
        lessonId: { type: 'string', description: 'ID de la lección' },
        language: { type: 'string', description: 'Idioma del contenido', default: 'es' }
      },
      required: ['courseId', 'lessonId']
    }
  },
  async (args, context) => {
    return { success: true, result: { content: 'Contenido del curso' }, metadata: {} };
  }
);

export const functions = functionRegistry;