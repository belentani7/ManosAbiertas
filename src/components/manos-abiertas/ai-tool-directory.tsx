'use client';

import { ExternalLink, Image, MessageCircle, ShieldCheck, Sparkles, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AI_TOOLS, type AIAccess, type AIToolKind } from '@/data/ai-tools';

const KIND_LABELS: Record<AIToolKind, string> = { chat: 'Chat', image: 'Imagen', media: 'Material abierto' };
const ACCESS_LABELS: Record<AIAccess, string> = { 'no-account': 'Sin cuenta', 'optional-account': 'Cuenta opcional', 'account-or-api': 'Cuenta o API' };
const KIND_ICONS: Record<AIToolKind, typeof MessageCircle> = { chat: MessageCircle, image: Image, media: Video };

export function AIToolDirectory() {
  return (
    <section className="mb-10" aria-labelledby="ai-world-title">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
        <CardContent className="p-5 md:p-7">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-2 gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Mundo de herramientas</Badge>
              <h2 id="ai-world-title" className="text-2xl font-bold md:text-3xl">Aprende con la herramienta adecuada</h2>
              <p className="mt-2 text-sm text-muted-foreground">No necesitas una API para empezar. Abre un servicio externo, prueba una tarea y vuelve aquí para entender qué has aprendido. NOIACORE orienta; cada plataforma mantiene su propia cuenta y condiciones.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-emerald-600" /> No guardamos tus conversaciones externas</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AI_TOOLS.map((tool) => {
              const Icon = KIND_ICONS[tool.kind];
              return <Card key={tool.id} className="border-border/70 bg-card/80 shadow-none transition-colors hover:border-primary/40">
                <CardContent className="flex h-full flex-col p-4">
                  <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span><div><h3 className="font-semibold leading-tight">{tool.name}</h3><p className="text-[11px] text-muted-foreground">{tool.provider}</p></div></div><Badge variant="outline" className="shrink-0 text-[10px]">{ACCESS_LABELS[tool.access]}</Badge></div>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{tool.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">{tool.tags.map((tag) => <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{tag}</span>)}</div>
                  <p className="mt-3 border-t border-border/60 pt-3 text-[11px] leading-relaxed text-muted-foreground">{tool.note}</p>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="mt-3"><Button size="sm" variant="outline" className="w-full gap-2">Abrir {tool.name}<ExternalLink className="h-3.5 w-3.5" /></Button></a>
                </CardContent>
              </Card>;
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
