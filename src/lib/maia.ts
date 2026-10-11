// MAIA — Manos Abiertas Intelligent Assistant.
// Núcleo determinista del primer flujo completo: descubrimiento de recursos
// verificables con atribución de fuente y presupuesto diario de consumo de IA.
//
// Principios (docs/ai/MAIA-ARCHITECTURE.md):
// - Respuesta determinista si es suficiente: la búsqueda NO usa IA ni red.
// - Todo recurso citado existe en el catálogo verificado (nunca se inventan URLs).
// - Etiquetas de confianza visibles: OFFICIAL SOURCE / REVIEWED COMMUNITY
//   RESOURCE / VERIFICATION REQUIRED.
// - El presupuesto de IA es local y por día; agotado el presupuesto la
//   plataforma sigue siendo útil (búsqueda + tutor offline).
import { RESOURCES, getResourceTrust, type Resource } from '../data/resources.ts';

export type MaiaTrustLabel =
  | 'OFFICIAL SOURCE'
  | 'REVIEWED COMMUNITY RESOURCE'
  | 'VERIFICATION REQUIRED';

export interface MaiaSource {
  id: string;
  title: string;
  url: string;
  category: string;
  region: string;
  label: MaiaTrustLabel;
  source?: string;
  verifiedAt?: string;
}

export const MAIA_DAILY_AI_BUDGET = 30;

const STOPWORDS = new Set([
  'para', 'como', 'una', 'que', 'del', 'las', 'los', 'con', 'por', 'sin', 'sobre', 'este', 'esta',
  'the', 'and', 'for', 'with', 'how', 'what', 'where', 'can', 'need', 'want', 'help', 'como',
  'com', 'uma', 'dos', 'das', 'para', 'preciso', 'quero', 'ajuda', 'em', 'de', 'da', 'do',
  'un', 'una', 'amb', 'per', 'necessito', 'vull', 'ajuda',
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= 3 && !STOPWORDS.has(token));
}

export function maiaTrustLabel(resource: Resource): MaiaTrustLabel {
  const trust = getResourceTrust(resource);
  if (trust.status === 'verified') {
    return trust.source ? 'OFFICIAL SOURCE' : 'REVIEWED COMMUNITY RESOURCE';
  }
  return 'VERIFICATION REQUIRED';
}

function toSource(resource: Resource): MaiaSource {
  const trust = getResourceTrust(resource);
  return {
    id: resource.id,
    title: resource.title,
    url: resource.url,
    category: resource.category,
    region: resource.region,
    label: maiaTrustLabel(resource),
    source: trust.source,
    verifiedAt: trust.verifiedAt,
  };
}

/**
 * Búsqueda determinista en el catálogo verificado. Orden estable:
 * coincidencias en título > etiquetas > descripción, con preferencia por
 * recursos verificados. Nunca produce resultados fuera del catálogo.
 */
export function searchVerifiedResources(query: string, opts: { limit?: number } = {}): MaiaSource[] {
  const limit = Math.max(1, Math.min(opts.limit ?? 5, 10));
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored: Array<{ resource: Resource; score: number }> = [];
  for (const resource of RESOURCES as Resource[]) {
    const title = normalize(resource.title);
    const description = normalize(resource.description);
    const tags = normalize((resource.tags ?? []).join(' '));
    let score = 0;
    for (const token of tokens) {
      if (title.includes(token)) score += 3;
      if (tags.includes(token)) score += 2;
      if (description.includes(token)) score += 1;
    }
    if (score > 0 && maiaTrustLabel(resource) !== 'VERIFICATION REQUIRED') score += 1;
    if (score > 0) scored.push({ resource, score });
  }

  scored.sort((a, b) => b.score - a.score || a.resource.title.localeCompare(b.resource.title));
  return scored.slice(0, limit).map((entry) => toSource(entry.resource));
}

const LABELS: Record<'es' | 'pt' | 'en' | 'ca', { intro: string; empty: string }> = {
  es: {
    intro: 'He encontrado estos recursos verificados que pueden ayudarte (comprueba siempre la fuente):',
    empty: 'No he encontrado recursos verificados para eso. Prueba con otras palabras o consulta la sección de Recursos.',
  },
  pt: {
    intro: 'Encontrei estes recursos verificados que podem ajudar-te (confirma sempre a fonte):',
    empty: 'Não encontrei recursos verificados para isso. Tenta outras palavras ou consulta a secção de Recursos.',
  },
  en: {
    intro: 'I found these verified resources that may help you (always check the source):',
    empty: 'I found no verified resources for that. Try other words or check the Resources section.',
  },
  ca: {
    intro: 'He trobat aquests recursos verificats que et poden ajudar (comprova sempre la font):',
    empty: 'No he trobat recursos verificats per a això. Prova amb altres paraules o consulta la secció de Recursos.',
  },
};

function labelsFor(language: string) {
  const lang = language.replace('_', '-');
  if (lang.startsWith('pt')) return LABELS.pt;
  if (lang === 'ca') return LABELS.ca;
  if (lang === 'en') return LABELS.en;
  return LABELS.es;
}

/** Composición determinista de respuesta con citas (sin IA). */
export function composeResourceAnswer(sources: MaiaSource[], language: string): string {
  const labels = labelsFor(language);
  if (sources.length === 0) return labels.empty;
  const lines = sources.map((s, i) => {
    const meta = [s.label, s.source, s.verifiedAt ? `(${s.verifiedAt})` : ''].filter(Boolean).join(' · ');
    return `${i + 1}. ${s.title} — ${meta}\n   ${s.url}`;
  });
  return `${labels.intro}\n\n${lines.join('\n')}`;
}

/** Bloque de contexto con fuentes verificadas para el prompt del modelo (no datos de confianza plena: el modelo debe citarlos, no ampliarlos). */
export function maiaSourcesPromptBlock(sources: MaiaSource[]): string {
  if (sources.length === 0) return '';
  const lines = sources.map((s) => `- ${s.title} [${s.label}] (${s.url})`);
  return [
    'FUENTES VERIFICADAS CONSULTADAS EN EL CATÁLOGO DE MANOS ABIERTAS:',
    ...lines,
    'Reglas: cita estas fuentes cuando las uses; no inventes URLs ni beneficios públicos;',
    'señala dudas con claridad; distingue información oficial de orientación generada por IA.',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Presupuesto diario de consultas IA (local, sin registro).
// ---------------------------------------------------------------------------

export interface MaiaBudgetState {
  date: string;
  used: number;
}

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const MAIA_BUDGET_STORAGE_KEY = 'manos-abiertas-maia-budget';

function dayKey(now: Date): string {
  return now.toISOString().slice(0, 10);
}

export function readMaiaBudget(store: KeyValueStore | null | undefined, now: Date): MaiaBudgetState {
  const empty: MaiaBudgetState = { date: dayKey(now), used: 0 };
  if (!store) return empty;
  try {
    const raw = store.getItem(MAIA_BUDGET_STORAGE_KEY);
    if (!raw) return empty;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return empty;
    const record = parsed as Record<string, unknown>;
    const date = typeof record.date === 'string' ? record.date : '';
    const used = typeof record.used === 'number' && Number.isInteger(record.used) && record.used >= 0 ? record.used : 0;
    // Nuevo día: el presupuesto se reinicia.
    return date === dayKey(now) ? { date, used } : empty;
  } catch {
    return empty;
  }
}

export function maiaBudgetRemaining(state: MaiaBudgetState, budget = MAIA_DAILY_AI_BUDGET): number {
  return Math.max(0, budget - state.used);
}

export function canUseMaiaAI(state: MaiaBudgetState, budget = MAIA_DAILY_AI_BUDGET): boolean {
  return maiaBudgetRemaining(state, budget) > 0;
}

export function consumeMaiaAI(state: MaiaBudgetState, now: Date): MaiaBudgetState {
  return { date: dayKey(now), used: state.date === dayKey(now) ? state.used + 1 : 1 };
}

export function writeMaiaBudget(store: KeyValueStore | null | undefined, state: MaiaBudgetState): void {
  if (!store) return;
  try {
    store.setItem(MAIA_BUDGET_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* almacenamiento no disponible: el presupuesto se aplica solo en memoria */
  }
}

// ---------------------------------------------------------------------------
// Validación defensiva de fuentes en respuestas del API (nunca confiar en red).
// ---------------------------------------------------------------------------

const VALID_LABELS = new Set<string>(['OFFICIAL SOURCE', 'REVIEWED COMMUNITY RESOURCE', 'VERIFICATION REQUIRED']);
const KNOWN_URLS = new Set<string>(RESOURCES.map((r) => r.url));

export function maiaSourcesFromPayload(value: unknown, limit = 5): MaiaSource[] {
  if (!Array.isArray(value)) return [];
  const out: MaiaSource[] = [];
  for (const item of value) {
    if (out.length >= limit) break;
    if (typeof item !== 'object' || item === null) continue;
    const record = item as Record<string, unknown>;
    const { id, title, url, category, region, label } = record;
    if (typeof id !== 'string' || typeof title !== 'string' || typeof url !== 'string') continue;
    // Defensa: solo URLs presentes en el catálogo local.
    if (!KNOWN_URLS.has(url)) continue;
    if (typeof label !== 'string' || !VALID_LABELS.has(label)) continue;
    out.push({
      id,
      title: title.slice(0, 200),
      url,
      category: typeof category === 'string' ? category : '',
      region: typeof region === 'string' ? region : '',
      label: label as MaiaTrustLabel,
      source: typeof record.source === 'string' ? record.source.slice(0, 200) : undefined,
      verifiedAt: typeof record.verifiedAt === 'string' ? record.verifiedAt.slice(0, 32) : undefined,
    });
  }
  return out;
}
