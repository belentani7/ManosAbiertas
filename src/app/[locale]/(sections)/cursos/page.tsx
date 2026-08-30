import { Metadata } from 'next';
import Link from 'next/link';
import { CoursesLibrarySection } from '@/components/manos-abiertas/courses-library-section';

export const metadata: Metadata = {
  title: 'Cursos Externos',
  description: 'Biblioteca de cursos gratuitos de entidades públicas, ONGs y universidades con procedencia visible. Confirma disponibilidad y condiciones en la fuente.',
  openGraph: {
    title: 'Cursos · Manos Abiertas',
    description: 'Directorio de cursos gratuitos con procedencia visible para personas inmigrantes',
    type: 'website',
  },
};

const CURRICULUM_COPY: Record<'es' | 'pt' | 'ca' | 'en', { title: string; text: string; cta: string }> = {
  es: {
    title: 'Currículo Manos Abiertas',
    text: '8 módulos de IA · 26 niveles por módulo · 4 idiomas, en orden pedagógico.',
    cta: 'Abrir el currículo',
  },
  pt: {
    title: 'Currículo Manos Abertas',
    text: '8 módulos de IA · 26 níveis por módulo · 4 idiomas, em ordem pedagógica.',
    cta: 'Abrir o currículo',
  },
  ca: {
    title: 'Currículum Mans Obertes',
    text: '8 mòduls d’IA · 26 nivells per mòdul · 4 idiomes, en ordre pedagògic.',
    cta: 'Obre el currículum',
  },
  en: {
    title: 'Manos Abiertas Curriculum',
    text: '8 AI modules · 26 levels per module · 4 languages, in pedagogical order.',
    cta: 'Open the curriculum',
  },
};

export default async function CursosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = locale === 'ca' ? 'ca' : locale === 'en' ? 'en' : locale === 'pt' || locale === 'pt-BR' ? 'pt' : 'es';
  const copy = CURRICULUM_COPY[ui];

  return (
    <>
      <section
        aria-label={copy.title}
        className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-amber-500/30 bg-amber-50 p-5 shadow-sm">
          <div className="max-w-xl">
            <h2 className="text-lg font-bold text-stone-900">🧭 {copy.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-700">{copy.text}</p>
          </div>
          <Link
            href={`/${locale}/curriculum`}
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-700"
          >
            {copy.cta} →
          </Link>
        </div>
      </section>
      <CoursesLibrarySection />
    </>
  );
}
