import { NextResponse } from 'next/server';
import { configuredProvider } from '@/lib/ai-provider';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    product: 'Manos Abiertas',
    ecosystem: 'NOIACORE',
    provider: configuredProvider(),
    capabilities: ['offline-tutor', 'local-progress', 'pwa', 'community-fallback'],
    checkedAt: new Date().toISOString(),
  }, { headers: { 'Cache-Control': 'no-store' } });
}
