'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, HardDrive, RefreshCw, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PREFIXES = ['manos-abiertas-', 'manosabiertas-'];

function isAppKey(key: string) {
  return PREFIXES.some((prefix) => key.startsWith(prefix));
}

export function LocalDataPanel() {
  const [keys, setKeys] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  const refresh = useCallback(() => {
    if (typeof window === 'undefined') return;
    const next = Object.keys(localStorage).filter(isAppKey).sort();
    setKeys(next);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(refresh, 0);
    window.addEventListener('storage', refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh]);

  const exportPayload = useMemo(() => {
    if (typeof window === 'undefined') return {};
    return keys.reduce<Record<string, string>>((acc, key) => {
      const value = localStorage.getItem(key);
      if (value !== null) acc[key] = value;
      return acc;
    }, {});
  }, [keys]);

  const exportData = () => {
    const blob = new Blob(
      [JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), data: exportPayload }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manos-abiertas-progreso-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus('Copia de seguridad descargada.');
  };

  const importData = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      const data = parsed?.data && typeof parsed.data === 'object' ? parsed.data : parsed;
      let restored = 0;
      for (const [key, value] of Object.entries(data)) {
        if (isAppKey(key) && typeof value === 'string') {
          localStorage.setItem(key, value);
          restored += 1;
        }
      }
      refresh();
      setStatus(`${restored} elementos restaurados correctamente.`);
    } catch {
      setStatus('No se pudo importar el archivo. Comprueba que sea una copia válida de Manos Abiertas.');
    }
  };

  const clearData = () => {
    if (!window.confirm('¿Eliminar el progreso guardado de Manos Abiertas en este dispositivo?')) return;
    Object.keys(localStorage).filter(isAppKey).forEach((key) => localStorage.removeItem(key));
    refresh();
    setStatus('Datos locales eliminados de este dispositivo.');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <HardDrive className="h-6 w-6" />
          Tu progreso y tus datos
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manos Abiertas guarda tu progreso en este dispositivo. Puedes crear una copia, restaurarla o limpiar los datos locales.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-3xl font-bold">{keys.length}</div>
            <div className="text-xs text-muted-foreground mt-1">elementos guardados localmente</div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2">
          <CardContent className="p-4 flex flex-wrap gap-2">
            <Button onClick={exportData} disabled={keys.length === 0} className="gap-2">
              <Download className="h-4 w-4" />
              Descargar copia
            </Button>

            <label className="inline-flex">
              <input
                type="file"
                accept="application/json,.json"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void importData(file);
                  event.currentTarget.value = '';
                }}
              />
              <span className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <Upload className="h-4 w-4" />
                Restaurar copia
              </span>
            </label>

            <Button variant="outline" onClick={refresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </Button>

            <Button variant="destructive" onClick={clearData} disabled={keys.length === 0} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Borrar datos
            </Button>
          </CardContent>
        </Card>
      </div>

      {status && (
        <p className="text-sm rounded-md border bg-muted/40 px-3 py-2" role="status">
          {status}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        Privacidad: esta herramienta trabaja con el almacenamiento local del navegador; no envía estos datos a un servidor al exportarlos o restaurarlos.
      </p>
    </div>
  );
}
