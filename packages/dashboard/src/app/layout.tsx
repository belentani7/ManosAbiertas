import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Inter({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BELENTANI ECOSYSTEM | Unified Creative OS',
  description: 'Unified dashboard: UX Academy, Manos Abiertas, Belentani Judas Experience, AI Lab',
  keywords: ['Belentani', 'UX Academy', 'Manos Abiertas', 'Judas Experience', 'AI', 'Creative OS'],
  openGraph: {
    title: 'BELENTANI ECOSYSTEM',
    description: 'Unified Creative Operating System',
    type: 'website',
  },
  robots: 'index, follow',
};

export const viewport: Viewport = {
  themeColor: '#030002',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} antialiased`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@300;400;700&family=Playfair+Display:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}