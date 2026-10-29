'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, Baby, BriefcaseBusiness, Check, Circle, Compass, FileText, GraduationCap,
  HeartHandshake, Languages, RotateCcw, ShieldCheck, Sparkles, Wrench,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/stores/app-store';
import { getLocalStorageItem } from '@/lib/local-data';
import { PERSONAL_ROUTE_STORAGE_KEY, persistPersonalRoute } from '@/lib/personal-route-storage';
import {
  JOURNEYS, type Journey, type SavedRoute,
  parseSavedRoute, pickPair, pickText,
} from '@/data/journeys';

const JOURNEY_ICONS: Record<string, typeof Compass> = {
  'primeras-24h': Baby,
  'independencia-digital': GraduationCap,
  'primera-candidatura': BriefcaseBusiness,
  'primer-cv': FileText,
  'catalan-100': Languages,
  'digital-cero': Compass,
  'office-ia-empleo': Wrench,
  'reskilling-tech': Sparkles,
  'entender-documentos': ShieldCheck,
  'negocio-propio': BriefcaseBusiness,
  'comunidad': HeartHandshake,
};

function readRoute(): SavedRoute | null {
  return parseSavedRoute(getLocalStorageItem(PERSONAL_ROUTE_STORAGE_KEY));
}

export function PersonalRoute() {
  const { setActiveSection, language } = useAppStore();
  const [route, setRoute] = useState<SavedRoute | null>(() => (typeof window === 'undefined' ? null : readRoute()));

  useEffect(() => {
    persistPersonalRoute(route, () => window.localStorage);
  }, [route]);

  const goal: Journey | null = useMemo(
    () => JOURNEYS.find((item) => item.id === route?.goal) ?? null,
    [route],
  );
  const completed = route?.completed ?? [];
  const done = goal?.activities.filter((a) => completed.includes(a.id)).length ?? 0;
  const next = goal?.activities.find((a) => !completed.includes(a.id));
  const percent = goal ? Math.round((done / goal.activities.length) * 100) : 0;

  if (!goal || !route) {
    return (
      <section className="container mx-auto max-w-7xl px-4" aria-labelledby="personal-route-title">
        <Card className="overflow-hidden border-primary/20 bg-card/80">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-3 gap-1.5"><Compass className="h-3.5 w-3.5" /> Tu punto de partida</Badge>
                <h2 id="personal-route-title" className="text-2xl font-bold md:text-3xl">Elige un objetivo y avanza a tu ritmo.</h2>
                <p className="mt-2 text-muted-foreground">
                  Rutas cortas con actividades reales de la plataforma. Sin registro: tu avance se guarda solo en este dispositivo.
                </p>
              </div>
              <div
                className="grid max-h-[22rem] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 md:w-[32rem]"
                role="list"
                aria-label="Objetivos disponibles"
              >
                {JOURNEYS.map((item) => {
                  const Icon = JOURNEY_ICONS[item.id] ?? Compass;
                  return (
                    <Button
                      key={item.id}
                      role="listitem"
                      variant="outline"
                      className="h-auto min-w-0 justify-start gap-3 whitespace-normal p-3 text-left"
                      onClick={() => setRoute({ goal: item.id, completed: [] })}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block font-semibold">{pickText(item.title, language)}</span>
                        <span className="block text-xs font-normal text-muted-foreground">{pickText(item.effort, language)}</span>
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  const GoalIcon = JOURNEY_ICONS[goal.id] ?? Compass;
  return (
    <section className="container mx-auto max-w-7xl px-4" aria-labelledby="route-progress-title">
      <Card className="overflow-hidden border-primary/20">
        <CardHeader className="border-b border-border/70 bg-gradient-to-r from-primary/10 via-card to-card pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge variant="secondary" className="mb-2 gap-1.5"><GoalIcon className="h-3.5 w-3.5" /> Ruta activa</Badge>
              <CardTitle id="route-progress-title" className="text-2xl">{pickText(goal.title, language)}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{pickText(goal.objective, language)}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">{pickText(goal.effort, language)}</Badge>
                <Badge variant="outline">{pickText(goal.prerequisites, language)}</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 self-start" onClick={() => {
              persistPersonalRoute(null, () => window.localStorage);
              setRoute(null);
            }}>
              <RotateCcw className="h-4 w-4" /> Cambiar meta
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Progress value={percent} className="h-2" aria-label={`${percent}% completado`} />
            <span className="min-w-12 text-right text-sm font-semibold tabular-nums">{percent}%</span>
          </div>
        </CardHeader>
        <CardContent className="p-5 md:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            {goal.activities.map((activity, index) => {
              const isDone = completed.includes(activity.id);
              const isNext = !isDone && activity.id === next?.id;
              const title = pickPair(activity.title, language);
              return (
                <div
                  key={activity.id}
                  className={`rounded-xl border p-4 transition-colors ${isNext ? 'border-primary bg-primary/5 shadow-sm' : 'border-border/70 bg-card'}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Paso {index + 1}</span>
                    {isDone ? <Check className="h-5 w-5 text-emerald-600" aria-label="Completado" /> : <Circle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 min-h-10 text-sm text-muted-foreground">{pickPair(activity.description, language)}</p>
                  {activity.verifiedRefs && activity.verifiedRefs.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {activity.verifiedRefs.map((ref) => (
                        <li key={ref.url}>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            ↗ {ref.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex gap-2">
                    {activity.section ? (
                      <Button
                        size="sm"
                        className="flex-1 gap-1.5"
                        variant={isNext ? 'default' : 'outline'}
                        onClick={() => activity.section && setActiveSection(activity.section)}
                      >
                        {isDone ? 'Revisar' : 'Abrir'} <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1 gap-1.5" variant={isNext ? 'default' : 'outline'} asChild>
                        <a href={activity.href} target="_blank" rel="noopener noreferrer">
                          {isDone ? 'Revisar' : 'Abrir'} <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant={isDone ? 'secondary' : 'ghost'}
                      onClick={() =>
                        setRoute({
                          ...route,
                          completed: isDone
                            ? completed.filter((id) => id !== activity.id)
                            : [...completed, activity.id],
                        })
                      }
                      aria-label={isDone ? `Marcar ${title} como pendiente` : `Marcar ${title} como completado`}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm">
                <strong>{next ? `Siguiente: ${pickPair(next.title, language)}` : 'Ruta completada'}</strong>
                <span className="block text-muted-foreground">
                  {next
                    ? 'Haz solo este paso ahora. Después volverás aquí.'
                    : pickText(goal.outcome, language)}
                </span>
              </p>
            </div>
            {next && (next.section ? (
              <Button
                variant="secondary"
                className="gap-2"
                onClick={() => setActiveSection(next.section!)}
              >
                Continuar <ArrowRight className="h-4 w-4" />
              </Button>
            ) : next.href ? (
              <Button variant="secondary" className="gap-2" asChild>
                <a href={next.href} target="_blank" rel="noopener noreferrer">
                  Continuar <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            ) : null)}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
