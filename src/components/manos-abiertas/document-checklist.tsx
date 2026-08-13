'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ExternalLink, RotateCcw, FolderOpen, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { DOCUMENT_CHECKLIST, type DocumentItem } from '@/data/tools-data';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'manos-abiertas-documents';

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  identification: { label: 'Identificación', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  residence: { label: 'Residencia', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
  work: { label: 'Trabajo', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
  health: { label: 'Salud', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
  housing: { label: 'Vivienda', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' },
  education: { label: 'Educación', color: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300' },
  banking: { label: 'Banca', color: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
};

const PRIORITY_LABELS: Record<string, { label: string; color: string }> = {
  essential: { label: 'Esencial', color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' },
  recommended: { label: 'Recomendado', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  optional: { label: 'Opcional', color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300' },
};

function loadCompleted(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch { /* ignore */ }
  return new Set();
}

export function DocumentChecklist() {
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    } catch { /* ignore */ }
  }, [completed]);

  function toggle(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        toast.success('¡Documento marcado como completado! ✅');
      }
      return next;
    });
  }

  function reset() {
    if (confirm('¿Marcar todos los documentos como pendientes?')) {
      setCompleted(new Set());
      toast.success('Lista reiniciada');
    }
  }

  const totalDocs = DOCUMENT_CHECKLIST.length;
  const completedCount = completed.size;
  const percent = Math.round((completedCount / totalDocs) * 100);
  const essentialDocs = DOCUMENT_CHECKLIST.filter((d) => d.priority === 'essential');
  const essentialCompleted = essentialDocs.filter((d) => completed.has(d.id)).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FolderOpen className="h-6 w-6 text-primary" />
            Checklist de Documentos
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Trámites esenciales para regularizar tu situación en España
          </p>
        </div>
        {completedCount > 0 && (
          <Button variant="outline" size="sm" onClick={reset} className="gap-1">
            <RotateCcw className="h-3.5 w-3.5" />
            Reiniciar
          </Button>
        )}
      </div>

      {/* Progress overview */}
      <Card className="border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-3xl font-bold gradient-text">{percent}%</div>
              <div className="text-xs text-muted-foreground">
                {completedCount} de {totalDocs} documentos completados
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                {essentialCompleted}/{essentialDocs.length}
              </div>
              <div className="text-xs text-muted-foreground">esenciales</div>
            </div>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-brand rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {essentialCompleted === essentialDocs.length && essentialDocs.length > 0 && (
            <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              ¡Todos los documentos esenciales completados! 🎉
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document list */}
      <div className="space-y-2">
        {DOCUMENT_CHECKLIST.map((doc, i) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            isCompleted={completed.has(doc.id)}
            isExpanded={expandedId === doc.id}
            onToggle={() => toggle(doc.id)}
            onExpand={() => setExpandedId(expandedId === doc.id ? null : doc.id)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

function DocumentCard({
  doc,
  isCompleted,
  isExpanded,
  onToggle,
  onExpand,
  index,
}: {
  doc: DocumentItem;
  isCompleted: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onExpand: () => void;
  index: number;
}) {
  const cat = CATEGORY_LABELS[doc.category];
  const prio = PRIORITY_LABELS[doc.priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
    >
      <Card className={cn(
        'overflow-hidden transition-colors',
        isCompleted ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/10' : 'border-border hover:border-primary/40'
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <button
              onClick={onToggle}
              className="mt-0.5 flex-shrink-0"
              aria-label={isCompleted ? 'Marcar como pendiente' : 'Marcar como completado'}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950/50" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground/40 hover:text-primary transition-colors" />
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl flex-shrink-0">{doc.emoji}</span>
                  <h3 className={cn('font-semibold text-sm', isCompleted && 'line-through text-muted-foreground')}>
                    {doc.title}
                  </h3>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Badge variant="outline" className={cn('text-[9px] py-0 h-4', cat?.color)}>{cat?.label}</Badge>
                  <Badge variant="outline" className={cn('text-[9px] py-0 h-4', prio?.color)}>{prio?.label}</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{doc.description}</p>

              {/* Expand button */}
              <button
                onClick={onExpand}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                {isExpanded ? 'Ocultar pasos' : `Ver ${doc.steps.length} pasos`}
                <Check className={cn('h-3 w-3 transition-transform', isExpanded && 'rotate-180')} />
              </button>

              {/* Steps (expanded) */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-3 overflow-hidden"
                >
                  <ol className="space-y-1.5">
                    {doc.steps.map((step, i) => (
                      <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/15 text-primary text-[10px] flex items-center justify-center font-semibold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  {doc.link && (
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Abrir trámite oficial
                    </a>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
