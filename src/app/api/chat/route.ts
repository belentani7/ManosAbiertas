import { NextRequest } from 'next/server';
import { invokeAIText } from '@/lib/ai-provider';
import { aiLanguageInstruction } from '@/lib/ai-language';
import { chatRequestSchema, type ChatRequest } from '@/lib/api-request-schemas';
import { apiError, apiJson, enforceRateLimit, hasRemoteAIConsent, readJsonBody, reportServerError } from '@/lib/api-security';
import { getOfflineTutorReply } from '@/lib/offline-tutor';
import type { LanguageCode } from '@/i18n/languages';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_BODY_BYTES = 256_000;
const RATE_LIMIT = { limit: 12, windowMs: 5 * 60_000 };

const SYSTEM_PROMPT = `Eres el asistente virtual de "Manos Abiertas", una plataforma gratuita para personas inmigrantes en España.

Tu propósito: ayudar a personas inmigrantes a:
1. Aprender a usar inteligencia artificial (ChatGPT, Gemini, Copilot, DeepSeek, etc.)
2. Crear su currículum vitae (CV)
3. Conocer sus derechos y los recursos disponibles en España
4. Sobrevivir y integrarse en la sociedad española

CARACTERÍSTICAS DEL PÚBLICO:
- Personas adultas, muchas mayores, con baja alfabetización digital
- Hablan diversos idiomas (la plataforma soporta 39)
- Recién llegadas a España o en proceso de integración
- Muchas solo saben usar WhatsApp y Google

INSTRUCCIONES:
- Sé cálido, amable y paciente. Trata al usuario con dignidad.
- Usa lenguaje sencillo, sin tecnicismos. Si usas una palabra técnica, explícala.
- Da respuestas breves y accionables (máximo 3-4 párrafos).
- Cuando sea relevante, menciona que en la web hay cursos, recursos o secciones específicas.
- Para temas legales, recomienda SIEMPRE consultar con un abogado o la fuente oficial.
- Para emergencias, recomienda llamar al 112 (gratis, 24h, multilingüe).
- NO inventes datos específicos (cantías de ayudas, teléfonos) si no estás seguro. Di "consulta la sección Derechos y Ayudas para datos verificados".
- Si preguntan por NIE, extranjería, asilo, etc., sugiere la sección "Derechos y Ayudas".
- Si preguntan por empleo o CV, sugiere la sección "Crea tu CV".
- Si preguntan por IA, sugiere la sección "Aprende IA".

Eres parte de una plataforma con:
- 8 cursos de IA (ChatGPT, Gemini, Copilot, Claude, DeepSeek, Qwen, Perplexity, Meta AI)
- Constructor de CV con IA
- Curso completo de Office (Word, Excel, PowerPoint)
- 3.686 recursos con fuente y estado de revisión visible
- 61 artículos sobre derechos
- 41 contactos de emergencia`;

export async function POST(req: NextRequest) {
  let fallbackQuestion = '';
  let fallbackLanguage: LanguageCode = 'es';
  try {
    const limited = await enforceRateLimit(req, 'ai-chat', RATE_LIMIT);
    if (limited) return limited;

    const json = await readJsonBody(req, MAX_BODY_BYTES);
    if (!json.ok) return json.response;

    const remoteConsent = hasRemoteAIConsent(json.data);
    const parsed = chatRequestSchema.safeParse(json.data);
    if (!parsed.success) return apiError('VALIDATION_ERROR', 'Solicitud no válida', 400);
    const body: ChatRequest = parsed.data;
    const lang = body.language || 'es';
    fallbackQuestion = body.messages.at(-1)?.content || '';
    fallbackLanguage = lang;
    const langInstruction = aiLanguageInstruction(lang);

    const messages = [
      { role: 'system' as const, content: `${SYSTEM_PROMPT}\n\n${langInstruction}${body.context ? `\n\nContexto actual: ${body.context}` : ''}` },
      ...body.messages.slice(-10), // Keep last 10 messages for context
    ];

    const systemPrompt = messages[0].content;
    const userPrompt = messages.slice(1).map((m) => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`).join('\n\n');

    const result = remoteConsent
      ? await invokeAIText(systemPrompt, userPrompt, {
        offline: () => getOfflineTutorReply(fallbackQuestion, fallbackLanguage),
      })
      : {
        text: getOfflineTutorReply(fallbackQuestion, fallbackLanguage),
        provider: 'offline' as const,
      };

    if (!result.text) {
      return apiJson({ ok: true, degraded: true, provider: 'local', text: getOfflineTutorReply(fallbackQuestion, fallbackLanguage) });
    }

    return apiJson({
      text: result.text,
      ok: true,
      provider: result.provider === 'offline' ? 'local' : result.provider,
      degraded: result.provider === 'offline',
    });
  } catch (error: unknown) {
    reportServerError('chat-api', error);
    return apiJson({ ok: true, degraded: true, provider: 'local', text: getOfflineTutorReply(fallbackQuestion, fallbackLanguage) });
  }
}
