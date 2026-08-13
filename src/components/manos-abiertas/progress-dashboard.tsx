'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, FileText, Trophy, TrendingUp, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/hooks/use-progress';
import { useAppStore, type SectionId } from '@/stores/app-store';
import { AI_COURSES } from '@/data/ai-courses';
import { OFFICE_MODULES } from '@/data/office-course';
import { cn } from '@/lib/utils';

export function ProgressDashboard() {
  const { stats, ready } = useProgress();
  const { setActiveSection } = useAppStore();

  // Don't show dashboard if user has no progress at all
  const hasAnyProgress = stats.aiCompleted > 0 || stats.officeCompleted > 0 || stats.hasCV;
  if (!hasAnyProgress) return null;

  const achievements = getAchievements(stats);

  return (
    <section className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-6">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <TrendingUp className="h-3 w-3" />
          Tu progreso
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-1">Continúa donde lo dejaste</h2>
        <p className="text-muted-foreground text-sm">Tu avance se guarda automáticamente en este dispositivo</p>
      </div>

      <Card className="border-border/60 overflow-hidden">
        <CardContent className="p-0">
          {/* Overall progress bar */}
          <div className="p-5 bg-gradient-to-br from-primary/5 to-transparent border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">{stats.totalPercent}% completado</div>
                  <div className="text-xs text-muted-foreground">
                    {stats.aiCompleted + stats.officeCompleted} de {stats.aiTotal + stats.officeTotal} lecciones
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">{stats.coursesCompleted + stats.modulesCompleted}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Completados</div>
              </div>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-brand rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.totalPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            <StatCard
              icon={Sparkles}
              label="Cursos IA"
              value={`${stats.aiCompleted}/${stats.aiTotal}`}
              percent={stats.aiPercent}
              color="text-fuchsia-600"
              bg="bg-fuchsia-50 dark:bg-fuchsia-950/30"
              onClick={() => setActiveSection('learn-ai')}
            />
            <StatCard
              icon={BookOpen}
              label="Office Pack"
              value={`${stats.officeCompleted}/${stats.officeTotal}`}
              percent={stats.officePercent}
              color="text-indigo-600"
              bg="bg-indigo-50 dark:bg-indigo-950/30"
              onClick={() => setActiveSection('office')}
            />
            <StatCard
              icon={FileText}
              label="Tu CV"
              value={stats.hasCV ? '✓ Creado' : 'Sin crear'}
              percent={stats.hasCV ? 100 : 0}
              color="text-amber-600"
              bg="bg-amber-50 dark:bg-amber-950/30"
              onClick={() => setActiveSection('cv')}
            />
            <StatCard
              icon={Target}
              label="Logros"
              value={`${achievements.filter((a) => a.earned).length}/${achievements.length}`}
              percent={Math.round((achievements.filter((a) => a.earned).length / achievements.length) * 100)}
              color="text-emerald-600"
              bg="bg-emerald-50 dark:bg-emerald-950/30"
            />
          </div>

          {/* Achievements row */}
          <div className="p-4 border-t border-border bg-muted/20">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-amber-500" />
              Logros desbloqueados
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    'flex items-center gap-2 p-2 rounded-lg border text-xs',
                    a.earned
                      ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800'
                      : 'border-border bg-muted/40 opacity-60'
                  )}
                  title={a.description}
                >
                  <span className="text-lg">{a.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{a.title}</div>
                    {a.earned && (
                      <div className="text-[9px] text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        Desbloqueado
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Continue learning CTA */}
          <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              {ready ? 'Sigue aprendiendo para desbloquear más logros' : 'Cargando progreso...'}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setActiveSection('learn-ai')} className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Continuar IA
                <ArrowRight className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setActiveSection('office')} className="gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                Continuar Office
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  percent,
  color,
  bg,
  onClick,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
  percent: number;
  color: string;
  bg: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        'p-4 text-left transition-colors',
        onClick && 'hover:bg-accent/30 cursor-pointer'
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', bg)}>
          <Icon className={cn('h-4 w-4', color)} />
        </div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="text-lg font-bold mb-1.5">{value}</div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color.replace('text-', 'bg-'))}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{percent}%</div>
    </button>
  );
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  earned: boolean;
}

function getAchievements(stats: ProgressStats): Achievement[] {
  return [
    {
      id: 'first-step',
      title: 'Primer paso',
      description: 'Completa tu primera lección',
      emoji: '👣',
      earned: stats.aiCompleted + stats.officeCompleted >= 1,
    },
    {
      id: 'ai-explorer',
      title: 'Explorador IA',
      description: 'Empieza un curso de IA',
      emoji: '🤖',
      earned: stats.coursesStarted >= 1,
    },
    {
      id: 'cv-created',
      title: 'CV Creado',
      description: 'Crea tu currículum',
      emoji: '📝',
      earned: stats.hasCV,
    },
    {
      id: 'ai-master',
      title: 'Maestro IA',
      description: 'Completa un curso de IA entero',
      emoji: '🎓',
      earned: stats.coursesCompleted >= 1,
    },
    {
      id: 'office-pro',
      title: 'Office Pro',
      description: 'Completa un módulo de Office entero',
      emoji: '🏆',
      earned: stats.modulesCompleted >= 1,
    },
  ];
}

type ProgressStats = {
  aiCompleted: number;
  aiTotal: number;
  officeCompleted: number;
  officeTotal: number;
  coursesStarted: number;
  coursesCompleted: number;
  modulesStarted: number;
  modulesCompleted: number;
  hasCV: boolean;
};
