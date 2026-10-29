import { NextRequest } from 'next/server';
import { invokeAIText } from '@/lib/ai-provider';
import { aiLanguageInstruction } from '@/lib/ai-language';
import { offlineStudyText } from '@/lib/study-offline';
import { studyToolsSchema, type StudyToolsRequest } from '@/lib/api-request-schemas';
import { apiError, apiJson, enforceRateLimit, hasRemoteAIConsent, readJsonBody, reportServerError } from '@/lib/api-security';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_BODY_BYTES = 16_000;
const RATE_LIMIT = { limit: 12, windowMs: 5 * 60_000 };

export async function POST(req: NextRequest) {
  try {
    const limited = await enforceRateLimit(req, 'ai-study-tools', RATE_LIMIT);
    if (limited) return limited;

    const json = await readJsonBody(req, MAX_BODY_BYTES);
    if (!json.ok) return json.response;

    const remoteConsent = hasRemoteAIConsent(json.data);
    const parsed = studyToolsSchema.safeParse(json.data);
    if (!parsed.success) {
      return apiError('VALIDATION_ERROR', 'Solicitud no válida', 400, { text: '' });
    }
    const body: StudyToolsRequest = parsed.data;
    const lang = body.language || 'es';

    const content = body.content;
    const langInstruction = aiLanguageInstruction(lang);

    let systemPrompt = '';
    let userPrompt = '';

    if (body.tool === 'questions') {
      systemPrompt = `Eres un profesor experto que crea preguntas de comprensión lectora para adultos. Las preguntas deben ser claras, prácticas y ayudar a retener la información. ${langInstruction}`;

      userPrompt = `Basándote en el siguiente contenido, genera 3 preguntas de comprensión lectora. Las preguntas deben cubrir los puntos más importantes del texto.

Título del contenido: ${body.title || 'Contenido educativo'}

Contenido:
${content}

Formato de respuesta (devuelve SOLO el JSON, sin markdown):
{
  "questions": [
    { "question": "...", "hint": "Pista breve para responder" },
    { "question": "...", "hint": "..." },
    { "question": "...", "hint": "..." }
  ]
}`;
    } else if (body.tool === 'summary') {
      systemPrompt = `Eres un experto en síntesis de información para adultos. Creas resúmenes claros y concisos que capturan las ideas principales. ${langInstruction}`;

      userPrompt = `Resume el siguiente contenido en máximo 5 puntos clave. Cada punto debe ser una frase corta y accionable.

Título: ${body.title || 'Contenido'}

Contenido:
${content}

Formato: lista numerada, cada punto en una línea, máximo 15 palabras por punto.`;
    }

    const offline = () => offlineStudyText(content, lang, body.tool);

    const result = remoteConsent
      ? await invokeAIText(systemPrompt, userPrompt, { offline })
      : { text: offline(), provider: 'offline' as const };

    // Providers can return HTTP 200 with an empty completion. Keep the
    // exercise usable without claiming that remote AI generated a result.
    const effective = result.text
      ? result
      : { text: offline(), provider: 'offline' as const };
    if (!effective.text) {
      return apiError('AI_UNAVAILABLE', 'El servicio de estudio no está disponible.', 503, { text: '' });
    }

    return apiJson({ text: effective.text, ok: true, tool: body.tool, provider: effective.provider, degraded: effective.provider === 'offline' });
  } catch (error: unknown) {
    reportServerError('study-tools-api', error);
    return apiError('INTERNAL_ERROR', 'No se pudo procesar la solicitud.', 500, { text: '' });
  }
}
