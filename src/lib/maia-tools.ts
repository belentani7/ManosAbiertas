// MAIA — Registro de herramientas allowlistadas (tool-calling real).
// Sustituye el placeholder de chat-engine por ejecución determinista,
// validada, acotada en tiempo y auditada. Principios (mandato §16):
// - Acciones allowlistadas: SOLO estas herramientas; nada de shell/red/filesystem.
// - Schemas tipados (Zod) + JSON Schema para el proveedor.
// - Salida tratada como dato no confiable por el modelo (reglas en el prompt).
// - Timeouts y registro de auditoría de cada invocación.
// - Todas las herramientas son de LECTURA sobre catálogos empaquetados:
//   sin escritura, sin PII, sin coste de red.
import { z } from 'zod';
import { searchVerifiedResources, type MaiaSource } from './maia.ts';
import { JOURNEYS, getJourney, pickText } from '../data/journeys.ts';
import { MAIN_EMERGENCY_CONTACTS, contactLabel, toTelHref } from '../data/main-contacts.ts';
import { AI_COURSES } from '../data/ai-courses.ts';
import { OFFICE_MODULES } from '../data/office-course.ts';

// --- Definiciones -----------------------------------------------------------

export interface MaiaToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    /** JSON Schema (formato OpenAI tools) de los argumentos. */
    parameters: Record<string, unknown>;
  };
}

export interface MaiaToolAuditEntry {
  tool: string;
  ok: boolean;
  at: string;
  durationMs: number;
}

export interface MaiaToolExecution {
  tool: string;
  ok: boolean;
  result?: unknown;
  error?: string;
  durationMs: number;
}

const querySchema = z.string().trim().min(2).max(300);
const limitSchema = z.number().int().min(1).max(10);

const searchResourcesArgs = z.object({
  query: querySchema,
  limit: limitSchema.optional(),
}).strict();

const findCoursesArgs = z.object({
  topic: z.string().trim().min(2).max(200).optional(),
}).strict();

const getJourneyArgs = z.object({
  journeyId: z.string().trim().min(2).max(60),
}).strict();

const noArgs = z.object({}).strict();

// --- Implementaciones (solo lectura de catálogos) ---------------------------

function toolSearchVerifiedResources(args: z.infer<typeof searchResourcesArgs>): { sources: MaiaSource[] } {
  return { sources: searchVerifiedResources(args.query, { limit: args.limit ?? 5 }) };
}

function toolFindCourses(args: z.infer<typeof findCoursesArgs>) {
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const t = norm(args.topic ?? '');
  const all = [
    ...AI_COURSES.map((c) => ({
      id: c.id,
      kind: 'ia' as const,
      title: c.model,
      lessons: c.lessons.length,
      section: 'learn-ai' as const,
    })),
    ...OFFICE_MODULES.map((m) => ({
      id: m.id,
      kind: 'office' as const,
      title: m.title,
      lessons: m.lessons.length,
      section: 'office' as const,
    })),
    ...JOURNEYS.map((j) => ({
      id: j.id,
      kind: 'itinerario' as const,
      title: pickText(j.title, 'es'),
      lessons: j.activities.length,
      section: 'courses' as const,
    })),
  ];
  const matches = t
    ? all.filter((c) => norm(c.title ?? '').includes(t) || norm(c.id).includes(t))
    : all;
  return {
    courses: matches.slice(0, 8),
    total: matches.length,
  };
}

function toolListJourneys() {
  return {
    journeys: JOURNEYS.map((j) => ({
      id: j.id,
      title: pickText(j.title, 'es'),
      objective: pickText(j.objective, 'es'),
      effort: pickText(j.effort, 'es'),
      activities: j.activities.length,
    })),
  };
}

function toolGetJourney(args: z.infer<typeof getJourneyArgs>) {
  const journey = getJourney(args.journeyId);
  if (!journey) return { error: 'JOURNEY_NOT_FOUND', journeyId: args.journeyId };
  return {
    journey: {
      id: journey.id,
      title: pickText(journey.title, 'es'),
      objective: pickText(journey.objective, 'es'),
      prerequisites: pickText(journey.prerequisites, 'es'),
      effort: pickText(journey.effort, 'es'),
      outcome: pickText(journey.outcome, 'es'),
      activities: journey.activities.map((a, i) => ({
        step: i + 1,
        id: a.id,
        title: a.title.es,
        description: a.description.es,
        opens: a.section ?? a.href ?? null,
      })),
    },
  };
}

function toolListEmergencyContacts() {
  return {
    contacts: MAIN_EMERGENCY_CONTACTS.map((c) => ({
      id: c.id,
      name: c.name,
      label: contactLabel(c),
      phone: c.phone,
      tel: toTelHref(c.phone),
      available24h: c.available24h,
    })),
  };
}

// --- Registro allowlistado ---------------------------------------------------

interface MaiaTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  schema: z.ZodTypeAny;
  handler: (args: never) => unknown;
}

const REGISTRY: Record<string, MaiaTool> = {
  search_verified_resources: {
    name: 'search_verified_resources',
    description:
      'Busca recursos públicos verificados (ayudas, trámites, servicios) en el catálogo de Manos Abiertas. Devuelve fuentes con etiqueta de confianza. Úsala antes de responder preguntas sobre servicios o recursos.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Consulta en lenguaje natural (ej. empadronamiento Barcelona)', minLength: 2, maxLength: 300 },
        limit: { type: 'integer', description: 'Máximo de resultados (1-10)', minimum: 1, maximum: 10 },
      },
      required: ['query'],
      additionalProperties: false,
    },
    schema: searchResourcesArgs,
    handler: toolSearchVerifiedResources as (args: never) => unknown,
  },
  find_courses: {
    name: 'find_courses',
    description:
      'Busca cursos y itinerarios de formación gratuitos de la plataforma (IA, ofimática, itinerarios). Úsala cuando la persona quiera aprender o formarse.',
    parameters: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'Tema o palabra clave (ej. excel, cv, catalán)', minLength: 2, maxLength: 200 },
      },
      additionalProperties: false,
    },
    schema: findCoursesArgs,
    handler: toolFindCourses as (args: never) => unknown,
  },
  list_journeys: {
    name: 'list_journeys',
    description:
      'Lista los itinerarios personales disponibles (objetivos paso a paso con progreso guardable). Úsala cuando la persona pida un plan o una guía de aprendizaje.',
    parameters: { type: 'object', properties: {}, additionalProperties: false },
    schema: noArgs,
    handler: toolListJourneys as (args: never) => unknown,
  },
  get_journey: {
    name: 'get_journey',
    description:
      'Devuelve el detalle de un itinerario personal (objetivo, prerrequisitos, esfuerzo y actividades concretas).',
    parameters: {
      type: 'object',
      properties: {
        journeyId: { type: 'string', description: 'Id del itinerario (ej. primeras-24h, primera-candidatura)', minLength: 2, maxLength: 60 },
      },
      required: ['journeyId'],
      additionalProperties: false,
    },
    schema: getJourneyArgs,
    handler: toolGetJourney as (args: never) => unknown,
  },
  list_emergency_contacts: {
    name: 'list_emergency_contacts',
    description:
      'Lista los teléfonos de emergencia y ayuda humanitaria esenciales en España (112, 061, 016, ONGs). Úsala si la persona está en una situación urgente o pide ayuda inmediata.',
    parameters: { type: 'object', properties: {}, additionalProperties: false },
    schema: noArgs,
    handler: toolListEmergencyContacts as (args: never) => unknown,
  },
};

export const MAIA_TOOL_NAMES = Object.keys(REGISTRY);

/** Definiciones OpenAI para el proveedor; `names` opcional restringe el allowlist. */
export function maiaToolDefinitions(names?: string[]): MaiaToolDefinition[] {
  const selected = names && names.length > 0
    ? names.filter((n) => n in REGISTRY)
    : MAIA_TOOL_NAMES;
  return selected.map((n) => ({
    type: 'function' as const,
    function: {
      name: REGISTRY[n].name,
      description: REGISTRY[n].description,
      parameters: REGISTRY[n].parameters,
    },
  }));
}

// --- Ejecución con validación, timeout y auditoría ---------------------------

export const MAIA_TOOL_TIMEOUT_MS = 1_500;
const MAX_AUDIT_ENTRIES = 50;
const auditLog: MaiaToolAuditEntry[] = [];

export function takeToolAudit(): MaiaToolAuditEntry[] {
  return auditLog.splice(0, auditLog.length);
}

function recordAudit(entry: MaiaToolAuditEntry): void {
  auditLog.push(entry);
  if (auditLog.length > MAX_AUDIT_ENTRIES) auditLog.splice(0, auditLog.length - MAX_AUDIT_ENTRIES);
}

export function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`TOOL_TIMEOUT: ${label} (${ms}ms)`)), ms);
    promise.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (error) => { clearTimeout(timer); reject(error); },
    );
  });
}

/**
 * Ejecuta una herramienta allowlistada. Siempre resuelve con un payload
 * JSON-serializable: `{ ok, result | error }` — nunca lanza al llamador.
 */
export async function executeMaiaTool(
  name: string,
  argsJson: string,
  options: { timeoutMs?: number } = {},
): Promise<MaiaToolExecution> {
  const started = Date.now();
  const finish = (ok: boolean, result?: unknown, error?: string): MaiaToolExecution => {
    const durationMs = Date.now() - started;
    recordAudit({ tool: name, ok, at: new Date().toISOString(), durationMs });
    return { tool: name, ok, result, error, durationMs };
  };

  const tool = REGISTRY[name];
  if (!tool) return finish(false, undefined, 'TOOL_NOT_ALLOWED');

  let parsedArgs: unknown;
  try {
    parsedArgs = argsJson.trim() ? JSON.parse(argsJson) : {};
  } catch {
    return finish(false, undefined, 'INVALID_JSON_ARGUMENTS');
  }

  const validated = tool.schema.safeParse(parsedArgs);
  if (!validated.success) {
    return finish(false, undefined, 'VALIDATION_ERROR');
  }

  try {
    const result = await withTimeout(
      Promise.resolve(tool.handler(validated.data as never)),
      options.timeoutMs ?? MAIA_TOOL_TIMEOUT_MS,
      name,
    );
    return finish(true, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'TOOL_ERROR';
    return finish(false, undefined, message.slice(0, 200));
  }
}

/**
 * Adaptador para el loop de chat-engine: devuelve el contenido del mensaje
 * `role: 'tool'` (siempre JSON string).
 */
export function maiaToolExecutor(name: string, argsJson: string): Promise<string> {
  return executeMaiaTool(name, argsJson).then((execution) =>
    JSON.stringify(execution.ok ? { ok: true, result: execution.result } : { ok: false, error: execution.error }),
  );
}
