'use client';

import dynamic from 'next/dynamic';

const ManosAbiertasApp = dynamic(
  () => import('@/components/manos-abiertas/manos-abiertas-app').then((m) => m.ManosAbiertasApp),
  { ssr: false, loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-3 animate-pulse">
          <span className="text-2xl">🤝</span>
        </div>
        <p className="text-sm text-muted-foreground">Cargando Manos Abiertas...</p>
      </div>
    </div>
  )}
);

export default function Home() {
  return <ManosAbiertasApp />;
}
