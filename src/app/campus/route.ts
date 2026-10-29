import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The static syllabus files are served from /public/campus/cursos.
// The campus homepage itself routes to the existing Next.js course catalog.
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/es/cursos', request.url), 307);
}
