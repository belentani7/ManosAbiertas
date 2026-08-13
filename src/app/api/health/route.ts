import { configuredProvider } from '@/lib/ai-provider';
import { apiJson } from '@/lib/api-security';

export const runtime = 'nodejs';

export async function GET() {
  return apiJson({
    ok: true,
    product: 'Manos Abiertas',
    ecosystem: 'NOIACORE',
    provider: configuredProvider(),
    capabilities: ['offline-tutor', 'local-progress', 'pwa', 'community-fallback'],
    checkedAt: new Date().toISOString(),
  });
}
