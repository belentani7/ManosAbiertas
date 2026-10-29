import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The canonical campus is copied into public/campus during the build.
// Keep the /campus/ entry stable while the actual reader serves from index.html.
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/campus/index.html', request.url), 307);
}
