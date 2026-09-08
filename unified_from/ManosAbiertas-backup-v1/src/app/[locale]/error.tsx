'use client';

import { useEffect } from 'react';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Manos Abiertas route error:', error);
  }, [error]);

  return (
    <main className="min-h-[60vh] grid place-items-center px-6 py-16">
      <section
        role="alert"
        className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm"
      >
        <p className="mb-2 text-sm font-medium text-primary">Manos Abiertas</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          No hemos podido cargar esta sección
        </h1>
        <p className="mt-3 text-muted-foreground">
          Puedes intentarlo de nuevo. Si el problema continúa, vuelve al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Intentar de nuevo
          </button>
          <a
            href="/es"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Ir al inicio
          </a>
        </div>
      </section>
    </main>
  );
}
