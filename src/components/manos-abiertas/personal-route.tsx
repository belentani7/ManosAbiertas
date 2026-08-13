'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BriefcaseBusiness, Check, Circle, Compass, GraduationCap, HeartHandshake, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAppStore, type SectionId } from '@/stores/app-store';

type GoalId = 'work' | 'digital' | 'rights' | 'community';
type RouteStep = { id: string; title: string; description: string; section: SectionId };
type Goal = { id: GoalId; label: string; description: string; icon: typeof BriefcaseBusiness; steps: RouteStep[] };

const STORAGE_KEY = 'manos-abiertas-personal-route';

const GOALS: Goal[] = [
  { id: 'work', label: 'Encontrar trabajo', description: 'Prepara tu perfil y busca oportunidades con método.', icon: BriefcaseBusiness, steps: [
    { id: 'work-profile', title: 'Crea tu CV', description: 'Pon tu experiencia en una presentación profesional.', section: 'cv' },
    { id: 'work-ai', title: 'Aprende a usar la IA', description: 'Practica cómo pedir ayuda para buscar empleo.', section: 'learn-ai' },
    { id: 'work-courses', title: 'Elige una formación', description: 'Añade una habilidad que puedas demostrar.', section: 'courses' },
  ] },
  { id: 'digital', label: 'Manejarme mejor en internet', description: 'Aprende lo esencial para usar móvil y ordenador con confianza.', icon: GraduationCap, steps: [
    { id: 'digital-basics', title: 'Empieza desde cero', description: 'Correo, archivos, búsquedas y seguridad explicados paso a paso.', section: 'office' },
    { id: 'digital-ai', title: 'Prueba un asistente IA', description: 'Haz tu primera pregunta útil en tu idioma.', section: 'learn-ai' },
    { id: 'digital-tools', title: 'Organiza tus trámites', description: 'Guarda una lista clara de lo que tienes pendiente.', section: 'tools' },
  ] },
  { id: 'rights', label: 'Resolver mis trámites', description: 'Entiende tus derechos y reúne documentos sin perderte.', icon: ShieldCheck, steps: [
    { id: 'rights-guide', title: 'Busca una guía', description: 'Encuentra una explicación sencilla para tu situación.', section: 'rights' },
    { id: 'rights-checklist', title: 'Haz una checklist', description: 'Convierte la información en pasos concretos.', section: 'tools' },
    { id: 'rights-help', title: 'Encuentra apoyo', description: 'Localiza una entidad o servicio cercano.', section: 'contacts' },
  ] },
  { id: 'community', label: 'Conectar con mi gente', description: 'Aprende acompañado y comparte recursos con cuidado.', icon: HeartHandshake, steps: [
    { id: 'community-learn', title: 'Elige algo para aprender', description: 'Una meta pequeña hace más fácil empezar.', section: 'courses' },
    { id: 'community-share', title: 'Lee a la comunidad', description: 'Encuentra experiencias y respuestas de otras personas.', section: 'community' },
    { id: 'community-contribute', title: 'Comparte un recurso', description: 'Ayuda a otra persona sin publicar datos sensibles.', section: 'community' },
  ] },
];

type SavedRoute = { goal: GoalId; completed: string[] };

function readRoute(): SavedRoute | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<SavedRoute>;
    if (!GOALS.some((goal) => goal.id === value.goal) || !Array.isArray(value.completed)) return null;
    return { goal: value.goal as GoalId, completed: value.completed.filter((id): id is string => typeof id === 'string') };
  } catch {
    return null;
  }
}

export function PersonalRoute() {
  const { setActiveSection } = useAppStore();
  const [route, setRoute] = useState<SavedRoute | null>(() => typeof window === 'undefined' ? null : readRoute());

  useEffect(() => {
    if (route) localStorage.setItem(STORAGE_KEY, JSON.stringify(route));
  }, [route]);

  const goal = useMemo(() => GOALS.find((item) => item.id === route?.goal) ?? null, [route]);
  const completed = route?.completed ?? [];
  const done = goal?.steps.filter((step) => completed.includes(step.id)).length ?? 0;
  const next = goal?.steps.find((step) => !completed.includes(step.id));
  const percent = goal ? Math.round((done / goal.steps.length) * 100) : 0;

  if (!goal || !route) {
    return (
      <section className="container mx-auto max-w-7xl px-4" aria-labelledby="personal-route-title">
        <Card className="overflow-hidden border-primary/20 bg-card/80">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-3 gap-1.5"><Compass className="h-3.5 w-3.5" /> Tu punto de partida</Badge>
                <h2 id="personal-route-title" className="text-2xl font-bold md:text-3xl">No tienes que resolverlo todo hoy.</h2>
                <p className="mt-2 text-muted-foreground">Elige una meta y Manos Abiertas ordenará los recursos en una ruta corta. Tu avance se guarda en este dispositivo.</p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:w-[28rem]">
                {GOALS.map((item) => {
                  const Icon = item.icon;
                  return <Button key={item.id} variant="outline" className="h-auto min-w-0 justify-start gap-3 whitespace-normal p-3 text-left" onClick={() => setRoute({ goal: item.id, completed: [] })}>
                    <Icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="min-w-0"><span className="block font-semibold">{item.label}</span><span className="block text-xs font-normal text-muted-foreground">{item.description}</span></span>
                  </Button>;
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  const GoalIcon = goal.icon;
  return (
    <section className="container mx-auto max-w-7xl px-4" aria-labelledby="route-progress-title">
      <Card className="overflow-hidden border-primary/20">
        <CardHeader className="border-b border-border/70 bg-gradient-to-r from-primary/10 via-card to-card pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge variant="secondary" className="mb-2 gap-1.5"><GoalIcon className="h-3.5 w-3.5" /> Ruta activa</Badge>
              <CardTitle id="route-progress-title" className="text-2xl">{goal.label}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{goal.description}</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 self-start" onClick={() => setRoute(null)}><RotateCcw className="h-4 w-4" /> Cambiar meta</Button>
          </div>
          <div className="mt-4 flex items-center gap-3"><Progress value={percent} className="h-2" aria-label={`${percent}% completado`} /><span className="min-w-12 text-right text-sm font-semibold tabular-nums">{percent}%</span></div>
        </CardHeader>
        <CardContent className="p-5 md:p-6">
          <div className="grid gap-3 md:grid-cols-3">
            {goal.steps.map((step, index) => {
              const isDone = completed.includes(step.id);
              const isNext = !isDone && step.id === next?.id;
              return <div key={step.id} className={`rounded-xl border p-4 transition-colors ${isNext ? 'border-primary bg-primary/5 shadow-sm' : 'border-border/70 bg-card'}`}>
                <div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Paso {index + 1}</span>{isDone ? <Check className="h-5 w-5 text-emerald-600" aria-label="Completado" /> : <Circle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}</div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 min-h-10 text-sm text-muted-foreground">{step.description}</p>
                <div className="mt-4 flex gap-2"><Button size="sm" className="flex-1 gap-1.5" variant={isNext ? 'default' : 'outline'} onClick={() => setActiveSection(step.section)}>{isDone ? 'Revisar' : 'Abrir'} <ArrowRight className="h-3.5 w-3.5" /></Button><Button size="icon" variant={isDone ? 'secondary' : 'ghost'} onClick={() => setRoute({ ...route, completed: isDone ? completed.filter((id) => id !== step.id) : [...completed, step.id] })} aria-label={isDone ? `Marcar ${step.title} como pendiente` : `Marcar ${step.title} como completado`}><Check className="h-4 w-4" /></Button></div>
              </div>;
            })}
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="text-sm"><strong>{next ? `Siguiente: ${next.title}` : 'Ruta completada'}</strong><span className="block text-muted-foreground">{next ? 'Haz solo este paso ahora. Después volverás aquí.' : 'Elige otra meta o ayuda a otra persona desde la comunidad.'}</span></p></div>{next && <Button variant="secondary" className="gap-2" onClick={() => setActiveSection(next.section)}>Continuar <ArrowRight className="h-4 w-4" /></Button>}</div>
        </CardContent>
      </Card>
    </section>
  );
}
