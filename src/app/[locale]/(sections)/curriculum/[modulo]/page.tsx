import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CurriculumModuleViewer from '@/components/manos-abiertas/curriculum-module-viewer';
import {
  CURRICULUM_MODULES,
  getCurriculumModule,
  resolveCurriculumContentLang,
  resolveCurriculumUiLocale,
} from '@/data/curriculum-modules';

export function generateStaticParams() {
  return CURRICULUM_MODULES.map((module) => ({ modulo: module.dir }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; modulo: string }>;
}): Promise<Metadata> {
  const { modulo } = await params;
  const module = getCurriculumModule(modulo);
  if (!module) return { title: 'Currículo Manos Abiertas' };
  return {
    title: `${module.titles.es} — Currículo Manos Abiertas`,
    description: module.descriptions.es,
  };
}

export default async function CurriculumModulePage({
  params,
}: {
  params: Promise<{ locale: string; modulo: string }>;
}) {
  const { locale, modulo } = await params;
  const module = getCurriculumModule(modulo);
  if (!module) notFound();

  const ui = resolveCurriculumUiLocale(locale);
  const defaultLang = resolveCurriculumContentLang(locale);

  return (
    <section
      aria-label={module.titles[ui]}
      className="mx-auto w-full max-w-6xl px-0 py-10 sm:px-6 sm:py-14"
    >
      <header className="mx-auto mb-8 w-full max-w-4xl px-4 sm:px-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Currículo Manos Abiertas
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          <span aria-hidden="true">{module.icon} </span>
          {module.titles[ui]}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600">
          {module.descriptions[ui]}
        </p>
      </header>
      <CurriculumModuleViewer
        locale={locale}
        moduleDir={module.dir}
        moduleTitle={module.titles[ui]}
        defaultLang={defaultLang}
      />
    </section>
  );
}
