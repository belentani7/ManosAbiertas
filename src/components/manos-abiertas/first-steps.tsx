'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore, type SectionId } from '@/stores/app-store';
import { useProgress } from '@/hooks/use-progress';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  section: SectionId;
  check: (stats: ReturnType<typeof useProgress>['stats']) => boolean;
  color: string;
}

const STEPS: Step[] = [
  {
    id: 'step-1',
    emoji: '📍',
    title: 'Conoce la plataforma',
    desc: 'Explora las 7 secciones disponibles para inmigrantes',
    section: 'home',
    check: () => false, // Always show as not completed (encourages exploration)
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 'step-2',
    emoji: '🤖',
    title: 'Aprende tu primera IA',
    desc: 'Empieza con ChatGPT o Copilot, los más fáciles',
    section: 'learn-ai',
    check: (s) => s.aiCompleted >= 1,
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'step-3',
    emoji: '📝',
    title: 'Crea tu currículum',
    desc: 'Genera un CV profesional con ayuda de IA',
    section: 'cv',
    check: (s) => s.hasCV,
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'step-4',
    emoji: '📊',
    title: 'Aprende Office',
    desc: 'Word y Excel son clave para trabajar',
    section: 'office',
    check: (s) => s.officeCompleted >= 1,
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'step-5',
    emoji: '⚖️',
    title: 'Conoce tus derechos',
    desc: 'NIE, sanidad, vivienda, trabajo... infórmate',
    section: 'rights',
    check: () => false,
    color: 'from-teal-400 to-emerald-500',
  },
];

export function FirstSteps() {
  const { setActiveSection } = useAppStore();
  const { stats } = useProgress();

  const completedCount = STEPS.filter((s) => s.check(stats)).length;
  const percent = Math.round((completedCount / STEPS.length) * 100);

  // Hide if user has completed most steps
  if (completedCount >= 4) return null;

  return (
    <section className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-6">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <MapPin className="h-3 w-3" />
          Tu ruta en España
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-1">Primeros pasos recomendados</h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Si es tu primera vez, sigue esta ruta. Te guiará por lo más importante, paso a paso.
        </p>
      </div>

      <Card className="border-border/60 overflow-hidden">
        <CardContent className="p-0">
          {/* Progress header */}
          <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso de tu ruta</span>
              <span className="text-sm font-bold text-primary">{completedCount}/{STEPS.length}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-brand rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="divide-y divide-border">
            {STEPS.map((step, i) => {
              const done = step.check(stats);
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={cn(
                    'flex items-center gap-4 p-4 transition-colors',
                    done ? 'bg-emerald-50/50 dark:bg-emerald-950/10' : 'hover:bg-accent/20'
                  )}
                >
                  {/* Step number / check */}
                  <div className="flex-shrink-0 relative">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all',
                      done
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-border bg-card text-muted-foreground'
                    )}>
                      {done ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    {/* Connector line */}
                    {i < STEPS.length - 1 && (
                      <div className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4',
                        done ? 'bg-emerald-400' : 'bg-border'
                      )} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{step.emoji}</span>
                      <h3 className={cn('font-semibold text-sm', done && 'line-through text-muted-foreground')}>
                        {step.title}
                      </h3>
                      {done && (
                        <Badge variant="outline" className="text-[9px] py-0 h-4 border-emerald-400 text-emerald-600">
                          ✓ Hecho
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>

                  {/* Action */}
                  {!done && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveSection(step.section)}
                      className="flex-shrink-0 gap-1"
                    >
                      Empezar
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
