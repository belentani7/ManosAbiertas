'use client';

import { motion } from 'framer-motion';
import { BadgeEuro, Building2, Check, HeartHandshake, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/stores/app-store';

const PLANS = [
  {
    id: 'comunidad',
    icon: HeartHandshake,
    name: 'Comunidad',
    price: '0 €',
    period: 'para siempre',
    desc: 'Todo lo esencial para empezar de cero en España.',
    features: [
      'Cursos de IA, ofimática y CV',
      'Guías de derechos y ayudas',
      'Herramientas (trámites, coste de vida)',
      'Comunidad y eventos',
      'En tu idioma',
    ],
    cta: 'Empezar gratis',
    featured: false,
  },
  {
    id: 'premium',
    icon: Sparkles,
    name: 'Premium',
    price: '9 €',
    period: '/mes · o 49 €/año',
    desc: 'Avanza más rápido con acompañamiento y certificados.',
    features: [
      'Todo lo del plan Comunidad',
      'Certificados verificables de cursos',
      'Talleres en vivo cada mes',
      'Tutor IA prioritario',
      'Plantillas premium de CV y cartas',
      'Sin anuncios',
    ],
    cta: 'Hazte Premium',
    featured: true,
  },
  {
    id: 'organizaciones',
    icon: Building2,
    name: 'Organizaciones',
    price: '199 €',
    period: '/taller',
    desc: 'Para ONGs, ayuntamientos y centros que acompañan.',
    features: [
      'Talleres presenciales u online',
      'Panel de progreso del grupo',
      'Materiales imprimibles',
      'Informe de impacto',
      'Soporte dedicado',
    ],
    cta: 'Pedir propuesta',
    featured: false,
  },
];

export function PricingSection() {
  const { setActiveSection } = useAppStore();
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <BadgeEuro className="h-3 w-3" />
          Precios claros · sin letra pequeña
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Planes para cada momento</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Empieza gratis. Sube de plan cuando te aporte valor. Sin permanencia,
          sin datos innecesarios, cancela cuando quieras.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {PLANS.map((plan, i) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={
                  plan.featured
                    ? 'relative border-primary/50 shadow-lg h-full'
                    : 'h-full'
                }
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                    RECOMENDADO
                  </span>
                )}
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg leading-tight">{plan.name}</h2>
                      <p className="text-xs text-muted-foreground">{plan.period}</p>
                    </div>
                  </div>
                  <p className="mt-3 font-display text-4xl font-bold">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.id === 'comunidad' ? (
                    <Button
                      className="mt-6 w-full"
                      variant={plan.featured ? 'default' : 'outline'}
                      onClick={() => setActiveSection('home')}
                    >
                      {plan.cta}
                    </Button>
                  ) : (
                    <Button
                      className="mt-6 w-full"
                      variant={plan.featured ? 'default' : 'outline'}
                      asChild
                    >
                      <a
                        href={`mailto:planes@manos-abiertas.es?subject=${encodeURIComponent(`Plan ${plan.name} — Manos Abiertas`)}`}
                      >
                        {plan.cta}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Precios orientativos con IVA incluido. El acceso se gestiona por cuenta,
        nunca vendemos ni compartimos tus datos.
      </p>
    </div>
  );
}
