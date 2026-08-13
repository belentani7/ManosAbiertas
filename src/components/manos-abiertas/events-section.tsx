'use client';

import { motion } from 'framer-motion';
import { Calendar, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EventCalendar } from './event-calendar';
import { COMMUNITY_EVENTS } from '@/data/events-data';

export function EventsSection() {
  const upcomingCount = COMMUNITY_EVENTS.filter((e) => {
    const eventDate = new Date(e.date + 'T23:59:59');
    return eventDate >= new Date();
  }).length;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="text-center mb-6">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <Bell className="h-3 w-3" />
          {upcomingCount} próximo{upcomingCount !== 1 ? 's' : ''} evento{upcomingCount !== 1 ? 's' : ''}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Calendario de Eventos</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Ferias de empleo, jornadas de legalización, cursos y actividades para inmigrantes en España
        </p>
      </div>

      <EventCalendar />

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1">¿Conoces un evento que debería estar aquí?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Manos Abiertas recopila eventos presenciales y online de toda España. Si organizas una feria de empleo,
              jornada legal o curso para inmigrantes, escríbenos para incluirlo en el calendario.
            </p>
            <a
              href="mailto:eventos@manos-abiertas.es"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
            >
              eventos@manos-abiertas.es
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
