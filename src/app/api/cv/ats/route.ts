import { NextRequest } from 'next/server';
import { invokeAIText } from '@/lib/ai-provider';
import { aiLanguageInstruction } from '@/lib/ai-language';
import { atsRequestSchema, type ATSRequest } from '@/lib/api-request-schemas';
import { apiError, apiJson, enforceRateLimit, hasRemoteAIConsent, readJsonBody, reportServerError } from '@/lib/api-security';
import { parseATSAnalysisText } from '@/lib/ats-analysis';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_BODY_BYTES = 128_000;
const RATE_LIMIT = { limit: 6, windowMs: 10 * 60_000 };

export async function POST(req: NextRequest) {
  try {
    const limited = await enforceRateLimit(req, 'ai-cv-ats', RATE_LIMIT);
    if (limited) return limited;

    const json = await readJsonBody(req, MAX_BODY_BYTES);
    if (!json.ok) return json.response;

    const remoteConsent = hasRemoteAIConsent(json.data);
    const parsed = atsRequestSchema.safeParse(json.data);
    if (!parsed.success) {
      return apiError('VALIDATION_ERROR', 'Solicitud no válida', 400, { data: null });
    }
    const body: ATSRequest = parsed.data;
    const lang = body.language || 'es';
    const langInstruction = aiLanguageInstruction(lang);

    const systemPrompt = `Eres un analizador experto de sistemas ATS (Applicant Tracking Systems) utilizados en España (InfoJobs, LinkedIn, Jobvite, Workday). Comparas el CV de un candidato contra una oferta de trabajo y devuelves una puntuación de compatibilidad, keywords detectadas y sugerencias accionables. ${langInstruction} Debes responder ÚNICAMENTE con un objeto JSON válido con esta forma exacta:
{
  "score": 0-100,
  "matchedKeywords": ["keyword del CV que coincide con la oferta"],
  "missingKeywords": ["keyword de la oferta que NO está en el CV"],
  "strengths": ["2-3 puntos fuertes del CV frente a la oferta"],
  "suggestions": ["3-4 sugerencias concretas para mejorar el CV para esta oferta"],
  "summary": "Resumen de 2-3 frases explicando el resultado"
}
El "score" debe ser objetivo: parte de 100 y resta por cada keyword clave de la oferta ausente del CV, descripciones débiles o genéricas, y falta de datos (teléfono, idiomas, formación). No uses JSON embebido en texto, solo el JSON puro.`;

    const cvSection = [
      `Nombre: ${body.fullName || 'No especificado'}`,
      `Profesión: ${body.profession || 'No especificada'}`,
      `Resumen: ${body.summary || '(vacío)'}`,
      `Experiencia: ${body.experiences?.map((e) => `${e.position} en ${e.company}: ${e.description || ''}`).join(' | ') || 'Sin experiencia'}`,
      `Formación: ${body.education?.map((e) => `${e.title} - ${e.institution} (${e.year || ''})`).join(' | ') || 'No especificada'}`,
      `Habilidades: ${body.skills?.join(', ') || 'No especificadas'}`,
      `Idiomas: ${body.languages?.join(', ') || 'No especificados'}`,
    ].join('\n');

    const userPrompt = `Analiza la compatibilidad de este CV contra la oferta siguiente.

== CV DEL CANDIDATO ==
${cvSection}

== OFERTA DE TRABAJO ==
${body.jobDescription}

Devuelve SOLO el objeto JSON con el análisis ATS.`;

    const offline = () => {
        const cvText = [body.profession, body.summary, ...(body.skills || [])].filter(Boolean).join(' ').toLowerCase();
        const jobWords = (body.jobDescription || '').toLowerCase().split(/[^a-záéíóúñü0-9+]+/).filter((w) => w.length > 3);
        const unique = [...new Set(jobWords)];
        const stop = new Set(['para', 'como', 'requisitos', 'oferta', 'puesto', 'empresa', 'persona', 'trabajo', 'laboral', 'horario', 'salario', 'jornada', 'podra', 'debera', 'tendra', 'disponibilidad', 'contrato', 'ademas', 'tambien', 'funciones', 'experiencia', 'formacion', 'habilidades']);
        const missing = unique.filter((w) => !stop.has(w) && !cvText.includes(w)).slice(0, 12);
        const matched = unique.filter((w) => cvText.includes(w) && !stop.has(w)).slice(0, 12);
        const score = Math.max(15, Math.min(90, 60 - missing.length * 3 + matched.length * 2));
        return JSON.stringify({
          score,
          matchedKeywords: matched,
          missingKeywords: missing,
          strengths: [
            body.profession ? `Perfil orientado a: ${body.profession}.` : 'CV disponible para la candidatura.',
            (body.skills || []).length ? `Menciona ${(body.skills || []).length} habilidades clave.` : 'Incluye apartado de habilidades.',
          ],
          suggestions: [
            missing.length ? `Añade al CV estas palabras clave de la oferta: ${missing.slice(0, 6).join(', ')}.` : 'El CV cubre bien las palabras clave de la oferta.',
            'Usa verbos de acción y logros con cifras concretas en la experiencia laboral.',
            'Adapta el resumen profesional a esta oferta concreta.',
            'Revisa que el CV esté en el idioma de la oferta.',
          ],
          summary: `Puntuación orientativa estimada sin conexión a IA: ${score}/100. Configura GROQ_API_KEY en el entorno para un análisis con IA más preciso.`,
        });
      };

    const result = remoteConsent
      ? await invokeAIText(systemPrompt, userPrompt, { maxTokens: 1200, offline })
      : { text: offline(), provider: 'offline' as const };

    if (!result.text) {
      return apiError('AI_UNAVAILABLE', 'El servicio de análisis no está disponible.', 503, { data: null });
    }

    const analysis = parseATSAnalysisText(result.text);
    if (!analysis) {
      return apiError('INVALID_AI_RESPONSE', 'No se pudo interpretar el análisis ATS.', 502, { data: null });
    }
    return apiJson({ ok: true, data: analysis, provider: result.provider, degraded: result.provider === 'offline' });
  } catch (error: unknown) {
    reportServerError('cv-ats-api', error);
    return apiError('INTERNAL_ERROR', 'No se pudo analizar el CV.', 500, { data: null });
  }
}
