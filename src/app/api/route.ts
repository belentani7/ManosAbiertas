import { apiJson } from '@/lib/api-security';

export async function GET() {
  return apiJson({
    ok: true,
    product: 'Manos Abiertas',
    apiVersion: 'v1',
    privacy: 'local-first',
    endpoints: ['/api/health', '/api/chat', '/api/study-tools', '/api/cv/generate', '/api/cv/ats', '/api/cover-letter', '/api/community'],
  });
}
