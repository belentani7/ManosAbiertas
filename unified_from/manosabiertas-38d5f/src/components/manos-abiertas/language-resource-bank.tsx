'use client';

import { BookOpen, Database, ExternalLink, Globe2, Image, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/stores/app-store';
import { LANGUAGE_RESOURCE_BANK, type LanguageResourceHub } from '@/lib/language-resource-bank';

const LINKS: Array<{ key: keyof Pick<LanguageResourceHub, 'knowledgeUrl' | 'booksUrl' | 'videoUrl' | 'openMediaUrl'>; label: string; description: string; icon: typeof Globe2 }> = [
  { key: 'knowledgeUrl', label: 'Información', description: 'Enciclopedia y contexto', icon: Globe2 },
  { key: 'booksUrl', label: 'Libros y audio', description: 'Biblioteca y archivo', icon: BookOpen },
  { key: 'videoUrl', label: 'Vídeos', description: 'Tutoriales y clases', icon: PlayCircle },
  { key: 'openMediaUrl', label: 'Material abierto', description: 'Imágenes y multimedia', icon: Image },
];

export function LanguageResourceBank() {
  const { language, setLanguage } = useAppStore();
  const selected = LANGUAGE_RESOURCE_BANK.find((item) => item.code === language) ?? LANGUAGE_RESOURCE_BANK[0];

  return (
    <section className="mb-6" aria-labelledby="language-bank-title">
      <Card className="border-teal-200/70 bg-teal-50/30 dark:border-teal-900/70 dark:bg-teal-950/10">
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-2 gap-1.5"><Database className="h-3.5 w-3.5" /> Banco mundial de materiales</Badge>
              <h2 id="language-bank-title" className="text-xl font-bold md:text-2xl">Aprende en tu idioma: {selected.flag} {selected.name}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">Puertas de entrada a información, libros, audio, vídeos y material abierto. Son enlaces a plataformas externas: revisa siempre la fuente, la fecha y la licencia antes de reutilizar un material.</p>
            </div>
            <Select value={selected.code} onValueChange={(value) => setLanguage(value as typeof language)}>
              <SelectTrigger className="w-full md:w-56" aria-label="Idioma del banco de materiales"><SelectValue /></SelectTrigger>
              <SelectContent>{LANGUAGE_RESOURCE_BANK.map((item) => <SelectItem key={item.code} value={item.code}>{item.flag} {item.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((link) => {
              const Icon = link.icon;
              return <a key={link.key} href={selected[link.key]} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border/70 bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent/30"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /><span className="font-semibold text-sm">{link.label}</span><ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" /></div><p className="mt-1 text-xs text-muted-foreground">{link.description}</p></a>;
            })}
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground">39 idiomas · selección inicial de plataformas públicas · {selected.name} mantiene la interfaz local, mientras las plataformas enlazadas tienen sus propias reglas.</p>
        </CardContent>
      </Card>
    </section>
  );
}
