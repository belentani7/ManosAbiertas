import { NextRequest } from 'next/server';
import { chatCompletion, chatCompletionStream, createSystemPrompt } from '@/lib/chat-engine';
import { aiLanguageInstruction } from '@/lib/ai-language';
import { chatRequestSchema, type ChatRequest } from '@/lib/api-request-schemas';
import { apiError, apiJson, apiStream, enforceRateLimit, hasRemoteAIConsent, readJsonBody, reportServerError } from '@/lib/api-security';
import { getOfflineTutorReply } from '@/lib/offline-tutor';
import type { LanguageCode } from '@/i18n/languages';

export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_BODY_BYTES = 256_000;
const RATE_LIMIT = { limit: 12, windowMs: 5 * 60_000 };

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

    const systemPrompt = createSystemPrompt({
      locale: lang,
      section: body.context,
      userLocation: body.userLocation,
      availableTools: body.tools
    });

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...body.messages.slice(-10)
    ];

    if (!hasRemoteAIConsent(json.data)) {
      const offlineText = getOfflineTutorReply(fallbackQuestion, fallbackLanguage);
      return apiJson({
        ok: true,
        degraded: true,
        provider: 'local',
        text: offlineText
      });
    }

    const isStream = body.stream === true;

    if (isStream) {
      const stream = chatCompletionStream({
        messages: [
          { role: 'system', content: createSystemPrompt({ locale: lang, section: body.context }) },
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
        { role: 'system', content: createSystemPrompt({ locale: lang, section: body.context }) },
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
        text: offlineText
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
      degraded: false
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