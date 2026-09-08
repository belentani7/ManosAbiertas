export default function LocaleLoading() {
  return (
    <main
      className="min-h-[60vh] grid place-items-center px-6"
      aria-busy="true"
      aria-live="polite"
      aria-label="Cargando Manos Abiertas"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">Cargando Manos Abiertas…</p>
      </div>
    </main>
  );
}
