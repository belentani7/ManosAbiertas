'use client';

import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function PWAStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    const frame = window.requestAnimationFrame(() => setOnline(navigator.onLine));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-2 bg-amber-100 px-4 py-2 text-center text-xs text-amber-950 shadow-sm dark:bg-amber-950 dark:text-amber-100" role="status">
      <WifiOff className="h-3.5 w-3.5" />
      Sin conexión: Manos Abiertas sigue disponible en modo local.
    </div>
  );
}
