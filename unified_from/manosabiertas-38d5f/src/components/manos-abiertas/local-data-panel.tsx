'use client';

import { useRef, useState } from 'react';
import { Download, FileUp, HardDrive, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { downloadLocalData, getLocalProgressSummary, restoreLocalData } from '@/lib/local-data';

type ProgressSummary = ReturnType<typeof getLocalProgressSummary>;

export function LocalDataPanel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [summary, setSummary] = useState<ProgressSummary>(() => getLocalProgressSummary());
  const [status, setStatus] = useState('Tus datos se guardan en este dispositivo.');

  const refresh = () => setSummary(getLocalProgressSummary());

  const sharePlan = async () => {
    const text = [
      'Mi plan en Manos Abiertas',
      `IA: ${summary.aiLessons} lecciones · Office: ${summary.officeLessons} lecciones`,
      `CV: ${summary.hasCV ? 'preparado' : 'pendiente'} · Favoritos: ${summary.favorites}`,
      'Seguimos avanzando juntos: https://manos-abiertas.es',
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Mi plan en Manos Abiertas', text });
        setStatus('Plan compartido.');
      } else {
        await navigator.clipboard.writeText(text);
        setStatus('Plan copiado. Puedes enviarlo por WhatsApp, Telegram o correo.');
      }
    } catch {
      setStatus('No se pudo compartir ahora. Puedes exportar el progreso.');
    }
  };

  const importFile = async (file: File) => {
    try {
      const payload = JSON.parse(await file.text());
      const restored = restoreLocalData(payload);
      refresh();
      setStatus(`${restored} bloques restaurados. Recargando para aplicar el progreso.`);
      window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Archivo no válido.');
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <HardDrive className="h-5 w-5 text-primary" />
          Tu espacio local
          <Badge variant="secondary" className="ml-auto text-[10px]">Sin cuenta</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Aprende sin servidor y lleva tu progreso contigo. Exporta un archivo para cambiar de dispositivo.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
          <Summary label="Lecciones IA" value={summary.aiLessons} />
          <Summary label="Lecciones Office" value={summary.officeLessons} />
          <Summary label="Favoritos" value={summary.favorites} />
          <Summary label="Recordatorios" value={summary.reminders} />
          <Summary label="CV" value={summary.hasCV ? 'Listo' : 'Pendiente'} />
          <Summary label="Carta" value={summary.hasCoverLetter ? 'Lista' : 'Pendiente'} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={downloadLocalData} size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Exportar progreso
          </Button>
          <Button onClick={() => inputRef.current?.click()} size="sm" variant="outline" className="gap-2">
            <FileUp className="h-4 w-4" /> Importar progreso
          </Button>
          <Button onClick={sharePlan} size="sm" variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" /> Compartir plan
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importFile(file);
              event.target.value = '';
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground" role="status">{status}</p>
      </CardContent>
    </Card>
  );
}

function Summary({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-2">
      <div className="font-semibold text-sm">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
