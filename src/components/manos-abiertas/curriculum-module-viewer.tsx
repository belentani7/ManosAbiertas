"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SimpleMarkdown } from '@/components/manos-abiertas/simple-markdown';
import { useCourseProgress } from '@/components/manos-abiertas/course-ui/useCourseProgress';
import type { CurriculumLang } from '@/data/curriculum-modules';
import { CURRICULUM_LANGS, CURRICULUM_LEVEL_COUNT } from '@/data/curriculum-modules';

interface CurriculumModuleViewerProps {
  locale: string;
  moduleDir: string;
  moduleTitle: string;
  defaultLang: CurriculumLang;
}

const padLevel = (level: number) => String(level).padStart(2, '0');

const LABELS: Record<'es' | 'pt' | 'ca' | 'en', {
  back: string;
  level: string;
  language: string;
  previous: string;
  next: string;
  markCompleted: string;
  completed: string;
  progress: string;
  loading: string;
  missing: string;
  reset: string;
}> = {
  es: {
    back: 'Volver al currículo',
    level: 'Nivel',
    language: 'Idioma',
    previous: '← Nivel anterior',
    next: 'Nivel siguiente →',
    markCompleted: 'Marcar nivel como completado',
    completed: 'Nivel completado ✓',
    progress: 'Progreso del módulo',
    loading: 'Cargando nivel…',
    missing: 'Este nivel todavía no está disponible en este idioma.',
    reset: 'Reiniciar progreso',
  },
  pt: {
    back: 'Voltar ao currículo',
    level: 'Nível',
    language: 'Idioma',
    previous: '← Nível anterior',
    next: 'Próximo nível →',
    markCompleted: 'Marcar nível como concluído',
    completed: 'Nível concluído ✓',
    progress: 'Progresso do módulo',
    loading: 'Carregando nível…',
    missing: 'Este nível ainda não está disponível neste idioma.',
    reset: 'Reiniciar progresso',
  },
  ca: {
    back: 'Torna al currículum',
    level: 'Nivell',
    language: 'Idioma',
    previous: '← Nivell anterior',
    next: 'Nivell següent →',
    markCompleted: 'Marca el nivell com a completat',
    completed: 'Nivell completat ✓',
    progress: 'Progrés del mòdul',
    loading: 'Carregant nivell…',
    missing: 'Aquest nivell encara no està disponible en aquest idioma.',
    reset: 'Reinicia el progrés',
  },
  en: {
    back: 'Back to curriculum',
    level: 'Level',
    language: 'Language',
    previous: '← Previous level',
    next: 'Next level →',
    markCompleted: 'Mark level as completed',
    completed: 'Level completed ✓',
    progress: 'Module progress',
    loading: 'Loading level…',
    missing: 'This level is not available yet in this language.',
    reset: 'Reset progress',
  },
};

const localeKey = (locale: string): 'es' | 'pt' | 'ca' | 'en' => {
  if (locale === 'ca') return 'ca';
  if (locale === 'en') return 'en';
  if (locale === 'pt' || locale === 'pt-BR') return 'pt';
  return 'es';
};

export default function CurriculumModuleViewer({
  locale,
  moduleDir,
  moduleTitle,
  defaultLang,
}: CurriculumModuleViewerProps) {
  const [level, setLevel] = useState(0);
  const [lang, setLang] = useState<CurriculumLang>(defaultLang);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const labels = LABELS[localeKey(locale)];
  const levelId = padLevel(level);
  const courseId = `curriculum-${moduleDir}`;
  const { markCompleted, isCompleted, completionPercentage, totalCompleted, resetProgress } =
    useCourseProgress(courseId, CURRICULUM_LEVEL_COUNT);
  const currentCompleted = isCompleted(levelId);

  const loadLevel = useCallback(async (targetLevel: number, targetLang: CurriculumLang) => {
    setLoading(true);
    setContent(null);
    try {
      const response = await fetch(
        `/contenido/curriculum/${moduleDir}/nivel-${padLevel(targetLevel)}/nivel-${padLevel(targetLevel)}-${targetLang}.md`,
        { cache: 'no-store' }
      );
      if (!response.ok) {
        setContent(null);
      } else {
        setContent(await response.text());
      }
    } catch {
      setContent(null);
    } finally {
      setLoading(false);
    }
  }, [moduleDir]);

  useEffect(() => {
    void loadLevel(level, lang);
  }, [level, lang, loadLevel]);

  const levels = useMemo(() => Array.from({ length: CURRICULUM_LEVEL_COUNT }, (_, index) => index), []);

  return (
    <section aria-label={moduleTitle} className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/${locale}/curriculum`}
          className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-black/15"
        >
          {labels.back}
        </Link>
        <div
          className="flex items-center gap-3 rounded-full border border-black/8 bg-white px-4 py-2 text-sm shadow-sm"
          role="status"
          aria-label={labels.progress}
        >
          <span className="font-semibold">{totalCompleted}/{CURRICULUM_LEVEL_COUNT}</span>
          <span className="h-2 w-28 overflow-hidden rounded-full bg-black/5">
            <span
              className="block h-full rounded-full bg-amber-500 transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </span>
          <button
            type="button"
            onClick={resetProgress}
            className="text-xs text-stone-500 underline-offset-2 hover:underline"
          >
            {labels.reset}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-black/8 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-stone-900">
            {labels.level}
            <select
              value={level}
              onChange={(event) => setLevel(Number(event.target.value))}
              className="rounded-xl border border-black/8 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {levels.map((value) => (
                <option key={value} value={value}>
                  {labels.level} {value}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="flex flex-col gap-1 text-sm font-semibold text-stone-900">
            <legend className="text-sm font-semibold">{labels.language}</legend>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={labels.language}>
              {CURRICULUM_LANGS.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={lang === option}
                  aria-label={`${labels.language} ${option}`}
                  onClick={() => setLang(option)}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    lang === option
                      ? 'bg-stone-900 text-white'
                      : 'border border-black/8 bg-white text-stone-900 hover:border-black/15'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-6 min-h-[280px] rounded-2xl border border-black/5 bg-stone-50 p-4 sm:p-6">
          {loading ? (
            <p className="text-sm text-stone-500">{labels.loading}</p>
          ) : content ? (
            <SimpleMarkdown content={content} />
          ) : (
            <p className="text-sm text-stone-500">{labels.missing}</p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setLevel((value) => Math.max(0, value - 1))}
            disabled={level === 0}
            className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-black/15 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {labels.previous}
          </button>
          <button
            type="button"
            onClick={() => markCompleted(levelId)}
            disabled={currentCompleted}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              currentCompleted
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }`}
          >
            {currentCompleted ? labels.completed : labels.markCompleted}
          </button>
          <button
            type="button"
            onClick={() => setLevel((value) => Math.min(CURRICULUM_LEVEL_COUNT - 1, value + 1))}
            disabled={level === CURRICULUM_LEVEL_COUNT - 1}
            className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-black/15 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {labels.next}
          </button>
        </div>
      </div>
    </section>
  );
}
