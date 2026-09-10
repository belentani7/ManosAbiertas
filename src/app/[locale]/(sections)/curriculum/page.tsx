import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CURRICULUM_LEVEL_COUNT,
  CURRICULUM_MODULES,
  resolveCurriculumUiLocale,
} from '@/data/curriculum-modules';

export const metadata: Metadata = {
  title: 'Currículo Manos Abiertas — 8 módulos de IA',
  description:
    'Currículo completo Manos Abiertas: 8 módulos de IA con 26 niveles cada uno, en español, portugués, catalán e inglés.',
};

const PAGE_COPY: Record<'es' | 'pt' | 'ca' | 'en', {
  kicker: string;
  title: string;
  subtitle: string;
  levels: string;
  languages: string;
  open: string;
  back: string;
}> = {
  es: {
    kicker: 'Currículo oficial · 2026',
    title: 'Currículo Manos Abiertas',
    subtitle:
      '8 módulos de IA en orden pedagógico: desde los primeros pasos hasta ética y futuro. Cada módulo tiene 26 niveles en 4 idiomas.',
    levels: 'niveles por módulo',
    languages: 'ES · PT · CA · EN',
    open: 'Abrir módulo',
    back: 'Volver a cursos',
  },
  pt: {
    kicker: 'Currículo oficial · 2026',
    title: 'Currículo Manos Abertas',
    subtitle:
      '8 módulos de IA em ordem pedagógica: dos primeiros passos até ética e futuro. Cada módulo tem 26 níveis em 4 idiomas.',
    levels: 'níveis por módulo',
    languages: 'ES · PT · CA · EN',
    open: 'Abrir módulo',
    back: 'Voltar a cursos',
  },
  ca: {
    kicker: 'Currículum oficial · 2026',
    title: 'Currículum Mans Obertes',
    subtitle:
      '8 mòduls d’IA en ordre pedagògic: dels primers passos fins a ètica i futur. Cada mòdul té 26 nivells en 4 idiomes.',
    levels: 'nivells per mòdul',
    languages: 'ES · PT · CA · EN',
    open: 'Obre el mòdul',
    back: 'Torna a cursos',
  },
  en: {
    kicker: 'Official curriculum · 2026',
    title: 'Manos Abiertas Curriculum',
    subtitle:
      '8 AI modules in pedagogical order: from first steps to ethics and the future. Each module has 26 levels in 4 languages.',
    levels: 'levels per module',
    languages: 'ES · PT · CA · EN',
    open: 'Open module',
    back: 'Back to courses',
  },
};

export default async function CurriculumIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = resolveCurriculumUiLocale(locale);
  const copy = PAGE_COPY[ui];

  return (
    <section aria-label={copy.title} className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <p className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-stone-600 shadow-sm">
          {copy.kicker}
        </p>
        <Link
          href={`/${locale}/cursos`}
          className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-black/15"
        >
          {copy.back}
        </Link>
      </div>

      <div className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600">{copy.subtitle}</p>
        <p className="mt-2 text-sm font-semibold text-stone-500">
          {CURRICULUM_LEVEL_COUNT} {copy.levels} · {copy.languages}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CURRICULUM_MODULES.map((module, index) => (
          <Link
            key={module.id}
            href={`/${locale}/curriculum/${module.dir}`}
            className="group flex h-full flex-col rounded-3xl border border-black/8 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-black/15 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span aria-hidden="true" className="text-2xl">{module.icon}</span>
              <span className="text-sm font-semibold text-stone-400">
                {String(index + 1).padStart(2, '0')}/0{CURRICULUM_MODULES.length}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-stone-900">
              {module.titles[ui]}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
              {module.descriptions[ui]}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition group-hover:gap-3">
              {copy.open} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
