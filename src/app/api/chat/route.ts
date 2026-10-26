import { NextRequest } from 'next/server';
import { chatCompletionStream, createSystemPrompt } from '@/lib/chat-engine';
import { aiLanguageInstruction } from '@/lib/ai-language';
import { chatRequestSchema, type ChatRequest } from '@/lib/api-request-schemas';
import { apiError, apiJson, apiStream, enforceRateLimit, hasRemoteAIConsent, readJsonBody, reportServerError } from '@/lib/api-security';
import { getOfflineTutorReply } from '@/lib/offline-tutor';
import { composeResourceAnswer, maiaSourcesPromptBlock, searchVerifiedResources } from '@/lib/maia';
import type { LanguageCode } from '@/i18n/languages';

export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_BODY_BYTES = 256_000;
const RATE_LIMIT = { limit: 12, windowMs: 5 * 60_000 };
// Presupuesto de consumo de IA por cliente y día (capa servidor; el cliente
// tiene además su propio presupuesto local en src/lib/maia.ts).
const DAILY_AI_LIMIT = { limit: 48, windowMs: 24 * 60 * 60_000 };

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

    // MAIA — flujo determinista: fuentes del catálogo verificado para la
    // última pregunta. Sin IA, sin red, sin invención de datos.
    const sources = searchVerifiedResources(fallbackQuestion, { limit: 5 });

    const systemPrompt = [
      aiLanguageInstruction(lang),
      createSystemPrompt({
        locale: lang,
        section: body.context,
        userLocation: body.userLocation,
        availableTools: body.tools
      }),
      maiaSourcesPromptBlock(sources),
    ].filter(Boolean).join('\n\n');

    if (!remoteConsent) {
      const offlineText = getOfflineTutorReply(fallbackQuestion, fallbackLanguage);
      const resourceText = composeResourceAnswer(sources, fallbackLanguage);
      return apiJson({
        ok: true,
        degraded: true,
        provider: 'local',
        text: sources.length > 0 ? `${offlineText}\n\n${resourceText}` : offlineText,
        sources,
      });
    }

    // Límite diario de consumo de IA: agotado, se responde con recursos
    // verificados de forma determinista (la plataforma sigue siendo útil).
    const dailyLimited = await enforceRateLimit(req, 'ai-chat-daily', DAILY_AI_LIMIT);
    if (dailyLimited) {
      return apiJson({
        ok: true,
        degraded: true,
        provider: 'local',
        budgetExhausted: true,
        text: composeResourceAnswer(sources, fallbackLanguage) || getOfflineTutorReply(fallbackQuestion, fallbackLanguage),
        sources,
      });
    }

    const isStream = body.stream === true;

    if (isStream) {
      const stream = chatCompletionStream({
        messages: [
          { role: 'system', content: systemPrompt },
          ...body.messages.slice(-10)
        ],
        model: body.model,
        maxTokens: body.maxTokens,
        temperature: body.temperature,
        topP: body.topP,
        tools: body.tools,
        toolChoice: body.toolChoice,
        stream: true,
        context: { locale: lang }
      });

      return apiStream(stream);
    }

    const result = await (await import('@/lib/chat-engine')).chatCompletion({
      messages: [
        { role: 'system', content: systemPrompt },
        ...body.messages.slice(-10)
      ],
      model: body.model,
      maxTokens: body.maxTokens,
      temperature: body.temperature,
      topP: body.topP,
      tools: body.tools,
      toolChoice: body.toolChoice,
      context: { locale: lang }
    });

    if (!result.message.content && (!result.toolCalls || result.toolCalls.length === 0)) {
      const offlineText = getOfflineTutorReply(fallbackQuestion, fallbackLanguage);
      return apiJson({
        ok: true,
        degraded: true,
        provider: 'local',
        text: sources.length > 0 ? `${offlineText}\n\n${composeResourceAnswer(sources, fallbackLanguage)}` : offlineText,
        sources,
      });
    }

    return apiJson({
      ok: true,
      message: result.message,
      provider: result.provider,
      model: result.model,
      usage: result.usage,
      toolCalls: result.toolCalls,
      finishReason: result.finishReason,
      latencyMs: result.latencyMs,
      degraded: false,
      sources,
    });
  } catch (error: unknown) {
    reportServerError('chat-api', error);
    const offlineText = getOfflineTutorReply(fallbackQuestion, fallbackLanguage);
    return apiJson({
      ok: true,
      degraded: true,
      provider: 'local',
      text: offlineText
    });
  }
}
