import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTrustedStateChangeRequest } from './src/lib/request-origin';

// Whitelist of served API routes. New routes must be registered here to keep /api/* as JSON-only.
const API_ROUTES = new Set([
  '/api/health',
  '/api/onboarding',
  '/api/chat',
  '/api/study-tools',
  '/api/cv/generate',
  '/api/cv/ats',
  '/api/cover-letter',
  '/api/community',
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoot = pathname === '/api' || pathname === '/api/';
  if (!isApiRoot && !API_ROUTES.has(pathname)) {
    return NextResponse.json(
      { ok: false, error: 'Not Found', code: 'NOT_FOUND' },
      { status: 404, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  if (!isTrustedStateChangeRequest(request)) {
    return NextResponse.json(
      { ok: false, error: 'Cross-origin mutation blocked', code: 'ORIGIN_FORBIDDEN' },
      { status: 403, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } },
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};