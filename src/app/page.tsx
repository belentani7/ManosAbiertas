import { redirect } from 'next/navigation';

/**
 * Vercel runs Next.js, not the root-level GitHub Pages files.
 * Send the public entry point to the bundled institutional HTML.
 * Locale routes like /es/cursos and /pt remain served by Next.js.
 */
export default function RootPage() {
  redirect('/index.html');
}
