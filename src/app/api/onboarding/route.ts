import {
  apiError,
  apiJson,
  enforceRateLimit,
  readJsonBody,
  reportServerError,
} from '@/lib/api-security';
import { parseOnboardingRequest, resolveOnboardingPlan } from '@/lib/onboarding';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 2_048;
const RATE_LIMIT = { limit: 30, windowMs: 60_000 };

export async function POST(request: Request) {
  try {
    const limited = await enforceRateLimit(request, 'onboarding-route', RATE_LIMIT);
    if (limited) return limited;

    const body = await readJsonBody(request, MAX_BODY_BYTES);
    if (!body.ok) return body.response;

    const parsed = parseOnboardingRequest(body.data);
    if (!parsed) {
      return apiError(
        'INVALID_ONBOARDING_REQUEST',
        'Elige un objetivo válido para preparar tu ruta.',
        400,
      );
    }

    const plan = resolveOnboardingPlan(parsed.goal, parsed.language);
    if (!plan) {
      return apiError(
        'ONBOARDING_UNAVAILABLE',
        'La ruta solicitada no está disponible en este momento.',
        503,
      );
    }

    return apiJson({ ...plan, source: 'server' });
  } catch (error) {
    reportServerError('onboarding', error);
    return apiError('INTERNAL_ERROR', 'No se pudo preparar la ruta.', 500);
  }
}

export async function GET() {
  return apiJson(
    { ok: false, error: 'Usa POST para solicitar una ruta.', code: 'METHOD_NOT_ALLOWED' },
    405,
    { Allow: 'POST' },
  );
}
