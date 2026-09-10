'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ChevronLeft, ChevronRight, CheckCircle2, Lightbulb, Target, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OFFICE_MODULES, type OfficeModule, type OfficeLesson } from '@/data/office-course';
import { useAppStore } from '@/stores/app-store';
import { getTranslation } from '@/i18n/translations';
import { SimpleMarkdown as SharedMarkdown } from './simple-markdown';
import { cn } from '@/lib/utils';
import { isBoundedStringArray, parseStoredJson } from '@/lib/safe-content';

export function OfficeSection() {
  const { language } = useAppStore();
  const t = getTranslation(language);
  const [selectedModule, setSelectedModule] = useState<OfficeModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<OfficeLesson | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    return new Set(parseStoredJson(localStorage.getItem('manos-abiertas-office-progress'), [], isBoundedStringArray));
  });

  // Persist completed lessons
  useEffect(() => {
    try {
      localStorage.setItem('manos-abiertas-office-progress', JSON.stringify([...completed]));
    } catch { /* ignore */ }
  }, [completed]);

  if (selectedLesson && selectedModule) {
    const idx = selectedModule.lessons.findIndex((l) => l.id === selectedLesson.id);
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <button onClick={() => setSelectedLesson(null)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4" />
          {selectedModule.title}
        </button>

        <div className={cn('rounded-2xl p-5 mb-5 bg-gradient-to-br', selectedModule.color)}>
          <div className="flex items-center gap-3 text-white">
            <div className="text-3xl">{selectedModule.icon}</div>
            <div>
              <div className="text-xs opacity-90">{selectedModule.title} · {t.lesson} {idx + 1} {t.of} {selectedModule.lessons.length}</div>
              <h1 className="text-xl md:text-2xl font-bold">{selectedLesson.title}</h1>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <Clock className="h-3 w-3" />
                {selectedLesson.duration}
                <span>·</span>
                <span className="capitalize">{selectedLesson.level}</span>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <ScrollArea className="h-[55vh] pr-4">
              <article className="prose prose-sm dark:prose-invert max-w-none">
                <SharedMarkdown content={selectedLesson.content} />
              </article>

              {selectedLesson.steps && selectedLesson.steps.length > 0 && (
                <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-semibold">Pasos</span>
                  </div>
                  <ol className="space-y-2">
                    {selectedLesson.steps.map((step, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {selectedLesson.tips && selectedLesson.tips.length > 0 && (
                <div className="mt-4 rounded-xl border border-amber-300/40 bg-amber-50 dark:bg-amber-950/20 p-4">
                  <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400">
                    <Lightbulb className="h-4 w-4" />
                    <span className="text-sm font-semibold">Consejos</span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedLesson.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedLesson.exercise && (
                <div className="mt-4 rounded-xl border border-teal-400/40 bg-teal-50 dark:bg-teal-950/20 p-4">
                  <div className="flex items-center gap-2 mb-2 text-teal-700 dark:text-teal-400">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-semibold">Ejercicio</span>
                  </div>
                  <p className="text-sm">{selectedLesson.exercise}</p>
                </div>
              )}
            </ScrollArea>

            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedLesson(selectedModule.lessons[idx - 1])} disabled={idx === 0} className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                {t.previous}
              </Button>
              <Button
                size="sm"
                variant={completed.has(selectedLesson.id) ? 'secondary' : 'default'}
                onClick={() => {
                  const next = new Set(completed);
                  if (next.has(selectedLesson.id)) {
                    next.delete(selectedLesson.id);
                  } else {
                    next.add(selectedLesson.id);
                  }
                  setCompleted(next);
                }}
                className="gap-1"
              >
                <CheckCircle2 className="h-4 w-4" />
                {completed.has(selectedLesson.id) ? 'Completado' : 'Marcar completado'}
              </Button>
              <Button size="sm" onClick={() => setSelectedLesson(selectedModule.lessons[idx + 1])} disabled={idx === selectedModule.lessons.length - 1} className="gap-1">
                {t.next}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedModule) {
    const done = selectedModule.lessons.filter((l) => completed.has(l.id)).length;
    const progress = Math.round((done / selectedModule.lessons.length) * 100);

    return (
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <button onClick={() => setSelectedModule(null)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4" />
          {t.nav_office}
        </button>

        <div className={cn('rounded-2xl p-6 mb-6 bg-gradient-to-br', selectedModule.color)}>
          <div className="flex items-start gap-4 text-white">
            <div className="text-5xl">{selectedModule.icon}</div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{selectedModule.title}</h1>
              <p className="text-white/90 text-sm mt-1">{selectedModule.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="gap-1"><BookOpen className="h-3 w-3" />{selectedModule.lessons.length} {t.lesson}s</Badge>
                <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />{progress}% completado</Badge>
              </div>
              <div className="mt-3 bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {selectedModule.lessons.map((lesson, i) => {
            const isDone = completed.has(lesson.id);
            return (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedLesson(lesson)}
                className="group text-left"
              >
                <Card className="card-hover border-border/60 hover:border-primary/40 h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0',
                      isDone ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                    )}>
                      {isDone ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{lesson.title}</div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {lesson.duration}
                        <span>·</span>
                        <span className="capitalize">{lesson.level}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </CardContent>
                </Card>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <BookOpen className="h-3 w-3" /> Curso completo
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.office_title}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">{t.office_subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OFFICE_MODULES.map((mod, i) => {
          const done = mod.lessons.filter((l) => completed.has(l.id)).length;
          const progress = Math.round((done / mod.lessons.length) * 100);
          return (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedModule(mod)}
              className="group text-left"
            >
              <Card className="card-hover overflow-hidden h-full border-border/60 hover:border-primary/40">
                <div className={cn('h-20 bg-gradient-to-br p-4 flex items-center gap-3', mod.color)}>
                  <span className="text-4xl">{mod.icon}</span>
                  <div className="text-white">
                    <div className="font-bold text-base">{mod.title}</div>
                    <div className="text-xs opacity-90">{mod.lessons.length} {t.lesson}s</div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{mod.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Alternativa gratis:</span>
                    <Badge variant="outline" className="text-[10px] gap-1">
                      <ExternalLink className="h-2.5 w-2.5" />
                      {mod.freeAlternative}
                    </Badge>
                  </div>
                  {progress > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{progress}%</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// SimpleMarkdown now uses the shared component from './simple-markdown'
