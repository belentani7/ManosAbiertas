import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manos Abiertas · IA, CV y Derechos para comunidades latinoamericanas",
  description: "Plataforma gratuita multilingüe para personas latinoamericanas y comunidades migrantes en España. Aprende inteligencia artificial, crea tu currículum con IA, estudia Office y encuentra recursos verificados.",
  keywords: ["latinoamericanos en España", "comunidades migrantes", "inteligencia artificial", "ChatGPT", "currículum", "CV", "NIE", "derechos", "recursos", "manos abiertas", "Office", "cursos gratis", "35 idiomas"],
  authors: [{ name: "Manos Abiertas" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Manos Abiertas · IA, CV y Derechos para comunidades latinoamericanas",
    description: "Aprende IA, crea tu CV y conoce tus derechos en España. Gratis y en 35 idiomas.",
    url: "https://manos-abiertas.es",
    siteName: "Manos Abiertas",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manos Abiertas",
    description: "IA, CV y derechos para personas inmigrantes en España",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
          <SonnerToaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
