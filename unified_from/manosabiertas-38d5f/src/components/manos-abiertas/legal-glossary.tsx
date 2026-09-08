'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, X, Volume2, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, type GlossaryTerm } from '@/data/glossary-data';
import { useAppStore } from '@/stores/app-store';
import { useSpeech, getSpeechLang } from '@/hooks/use-speech';
import { cn } from '@/lib/utils';

export function LegalGlossary({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const { language } = useAppStore();
  const { speak, stop, speaking, supported: ttsSupported } = useSpeech();

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchesQuery = !query ||
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.simpleDefinition.toLowerCase().includes(query.toLowerCase());
      const matchesCat = category === 'all' || t.category === category;
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

  function handleSpeak(term: GlossaryTerm) {
    if (speaking) {
      stop();
    } else {
      const text = `${term.term}. ${term.simpleDefinition}${term.example ? '. Ejemplo: ' + term.example : ''}`;
      speak(text, { lang: getSpeechLang(language) });
    }
  }

  if (compact) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="gap-1.5"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Glosario legal
          <Badge variant="secondary" className="text-[9px] py-0 h-4">{GLOSSARY_TERMS.length}</Badge>
        </Button>
        <GlossaryDialog
          open={open}
          onOpenChange={setOpen}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          filtered={filtered}
          onSelectTerm={setSelectedTerm}
        />
        {selectedTerm && (
          <TermDetailDialog
            term={selectedTerm}
            open={!!selectedTerm}
            onOpenChange={(o) => !o && setSelectedTerm(null)}
            onSpeak={() => handleSpeak(selectedTerm)}
            speaking={speaking}
            ttsSupported={ttsSupported}
          />
        )}
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Glosario Legal
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Explicaciones simples de términos legales y burocráticos en España
        </p>
      </div>

      <Card>
        <CardContent className="p-3 space-y-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar término... (ej: NIE, fianza, paro)"
              className="pl-9"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setCategory('all')}
              className={cn(
                'text-xs px-2.5 py-1 rounded-full border transition-colors',
                category === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'
              )}
            >
              Todos ({GLOSSARY_TERMS.length})
            </button>
            {GLOSSARY_CATEGORIES.map((c) => {
              const count = GLOSSARY_TERMS.filter((t) => t.category === c.value).length;
              return (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={cn(
                    'text-xs px-2.5 py-1 rounded-full border transition-colors flex items-center gap-1',
                    category === c.value ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'
                  )}
                >
                  <span>{c.emoji}</span>
                  {c.label} ({count})
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Terms grid */}
      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Search className="h-10 w-10 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No se encontraron términos</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-2">
          {filtered.map((term, i) => (
            <motion.button
              key={term.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.3) }}
              onClick={() => setSelectedTerm(term)}
              className="group text-left"
            >
              <Card className="card-hover border-border/60 hover:border-primary/40 h-full">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">{term.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{term.term}</div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {term.simpleDefinition}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.button>
          ))}
        </div>
      )}

      {selectedTerm && (
        <TermDetailDialog
          term={selectedTerm}
          open={!!selectedTerm}
          onOpenChange={(o) => !o && setSelectedTerm(null)}
          onSpeak={() => handleSpeak(selectedTerm)}
          speaking={speaking}
          ttsSupported={ttsSupported}
        />
      )}
    </div>
  );
}

function GlossaryDialog({
  open, onOpenChange, query, setQuery, category, setCategory, filtered, onSelectTerm,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
  category: string;
  setCategory: (c: string) => void;
  filtered: GlossaryTerm[];
  onSelectTerm: (t: GlossaryTerm) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Glosario Legal
          </DialogTitle>
        </DialogHeader>
        <div className="p-3 border-b border-border space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar término..."
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setCategory('all')}
              className={cn('text-[10px] px-2 py-0.5 rounded-full border', category === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-border')}
            >
              Todos
            </button>
            {GLOSSARY_CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={cn('text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-0.5', category === c.value ? 'bg-primary text-primary-foreground border-primary' : 'border-border')}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>
        <ScrollArea className="h-[400px] p-2">
          <div className="space-y-1">
            {filtered.map((term) => (
              <button
                key={term.id}
                onClick={() => { onSelectTerm(term); onOpenChange(false); }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/40 transition-colors text-left"
              >
                <span className="text-lg flex-shrink-0">{term.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{term.term}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{term.simpleDefinition}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function TermDetailDialog({
  term, open, onOpenChange, onSpeak, speaking, ttsSupported,
}: {
  term: GlossaryTerm;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSpeak: () => void;
  speaking: boolean;
  ttsSupported: boolean;
}) {
  const related = term.relatedTerms
    ?.map((id) => GLOSSARY_TERMS.find((t) => t.id === id))
    .filter(Boolean) as GlossaryTerm[] | undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{term.emoji}</span>
            {term.term}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Definición simple
            </div>
            <p className="text-sm leading-relaxed">{term.simpleDefinition}</p>
          </div>

          {term.example && (
            <div className="rounded-lg border border-amber-300/40 bg-amber-50 dark:bg-amber-950/20 p-3">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-1">
                <Lightbulb className="h-3.5 w-3.5" />
                Ejemplo
              </div>
              <p className="text-sm text-amber-900 dark:text-amber-200 italic">{term.example}</p>
            </div>
          )}

          {ttsSupported && (
            <Button
              onClick={onSpeak}
              variant={speaking ? 'default' : 'outline'}
              size="sm"
              className={cn('gap-1.5 w-full', speaking && 'gradient-brand text-white')}
            >
              <Volume2 className="h-3.5 w-3.5" />
              {speaking ? 'Detener lectura' : 'Escuchar definición'}
            </Button>
          )}

          {related && related.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Términos relacionados
              </div>
              <div className="flex flex-wrap gap-1.5">
                {related.map((r) => (
                  <Badge key={r.id} variant="outline" className="gap-1">
                    <span>{r.emoji}</span>
                    {r.term}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <Badge variant="secondary" className="text-[10px]">
              {GLOSSARY_CATEGORIES.find((c) => c.value === term.category)?.emoji}{' '}
              {GLOSSARY_CATEGORIES.find((c) => c.value === term.category)?.label}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
