'use client';

import { motion } from 'framer-motion';
import { BadgeEuro, Check, HeartHandshake, LifeBuoy, ServerCog, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/stores/app-store';

const PLANS = [
  {
    id: 'base',
    icon: HeartHandshake,
    name: 'Base abierta',
    price: '0 €',
    period: 'siempre',
    desc: 'La plataforma educativa completa, gratuita y de código abierto.',
    features: [
      'Cursos de IA y ofimática',
      'Creador de currículum y herramientas',
      'Guías y recursos comunitarios',
      'Sin cuenta y sin coste',
    ],
    cta: 'Abrir la plataforma',
    featured: false,
  },
  {
    id: 'soporte',
    icon: LifeBuoy,
    name: 'Soporte',
    price: '89 €',
    period: '/mes',
    desc: 'Asistencia técnica prioritaria para equipos que ya usan la plataforma.',
    features: [
      'Ayuda técnica prioritaria',
      'Canal de soporte acordado',
      'SLA definido por escrito antes de contratar',
      'La plataforma educativa sigue siendo gratuita',
    ],
    cta: 'Solicitar soporte',
    featured: true,
  },
  {
    id: 'gestionado',
    icon: ServerCog,
    name: 'Gestionado',
    price: '149 €',
    period: '/mes',
    desc: 'Despliegue y mantenimiento para equipos que quieren delegar la operación.',
    features: [
      'Preparación del despliegue',
      'Mantenimiento acordado para el entorno',
      'Alcance y responsabilidades por escrito',
      'Sin bloqueo de proveedor: código abierto',
    ],
    cta: 'Solicitar gestión',
    featured: false,
  },
  {
    id: 'consultoria',
    icon: Wrench,
    name: 'Consultoría',
    price: '89 €',
    period: '/hora',
    desc: 'Integración, adaptación y personalización técnica del producto.',
    features: [
      'Trabajo técnico por alcance acordado',
      'Estimación previa cuando el trabajo lo permita',
      'Factura según las horas realizadas',
      'El núcleo abierto se mantiene gratuito',
    ],
    cta: 'Consultar disponibilidad',
    featured: false,
  },
];

export function PricingSection() {
  const { setActiveSection } = useAppStore();
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <BadgeEuro className="h-3 w-3" />
          Precios públicos · servicios opcionales
        </Badge>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Educación abierta. Ayuda cuando la necesitas.</h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
          Todos los cursos y herramientas educativas siguen siendo gratuitos. Los precios siguientes
          corresponden a servicios técnicos opcionales para equipos y organizaciones.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
              <Card className={plan.featured ? 'relative h-full border-primary/50 shadow-lg' : 'h-full'}>
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                    ATENCIÓN PRIORITARIA
                  </span>
                )}
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <div className="gradient-brand flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold leading-tight">{plan.name}</h2>
                      <p className="text-xs text-muted-foreground">{plan.period}</p>
                    </div>
                  </div>
                  <p className="mt-3 font-display text-4xl font-bold">{plan.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.id === 'base' ? (
                    <Button className="mt-6 w-full" variant="outline" onClick={() => setActiveSection('home')}>
                      {plan.cta}
                    </Button>
                  ) : (
                    <Button className="mt-6 w-full" variant={plan.featured ? 'default' : 'outline'} asChild>
                      <a href={`mailto:planes@manos-abiertas.es?subject=${encodeURIComponent(`Consulta: ${plan.name} — Manos Abiertas`)}&body=${encodeURIComponent(`Hola,\n\nMe interesa el servicio ${plan.name} (${plan.price}${plan.period}).\n\nMi organización y necesidad:\n`)}`}>
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
        La contratación se acuerda por escrito y se factura. No se bloquean funciones educativas por plan.
        Los impuestos aplicables y el alcance del servicio se confirmarán en la propuesta antes de aceptar.
      </p>
    </div>
  );
}
