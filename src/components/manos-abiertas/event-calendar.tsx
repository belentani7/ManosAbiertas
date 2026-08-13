'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Video, Users, ExternalLink, Globe, Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { COMMUNITY_EVENTS, EVENT_CATEGORIES, type CommunityEvent } from '@/data/events-data';
import { REGIONS } from '@/data/resources';
import { cn } from '@/lib/utils';

function formatDate(dateStr: string): { day: string; month: string; weekday: string; full: string } {
  const date = new Date(dateStr + 'T00:00:00');
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const weekdays = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: months[date.getMonth()],
    weekday: weekdays[date.getDay()],
    full: date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

function isUpcoming(dateStr: string): boolean {
  const eventDate = new Date(dateStr + 'T23:59:59');
  return eventDate >= new Date();
}

export function EventCalendar() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [region, setRegion] = useState<string>('all');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  const filtered = useMemo(() => {
    return COMMUNITY_EVENTS
      .filter((e) => isUpcoming(e.date))
      .filter((e) => {
        const matchesQuery = !query ||
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.description.toLowerCase().includes(query.toLowerCase()) ||
          e.city.toLowerCase().includes(query.toLowerCase()) ||
          e.organizer.toLowerCase().includes(query.toLowerCase());
        const matchesCat = category === 'all' || e.category === category;
        const matchesRegion = region === 'all' || e.region === region || (region === 'national' && e.isOnline);
        const matchesOnline = !showOnlineOnly || e.isOnline;
        return matchesQuery && matchesCat && matchesRegion && matchesOnline;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [query, category, region, showOnlineOnly]);

  function resetFilters() {
    setQuery('');
    setCategory('all');
    setRegion('all');
    setShowOnlineOnly(false);
  }

  const hasFilters = query || category !== 'all' || region !== 'all' || showOnlineOnly;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Calendario de Eventos
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Ferias de empleo, jornadas legales, cursos y más
          </p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Users className="h-3 w-3" />
          {filtered.length} próximo{filtered.length !== 1 ? 's' : ''} evento{filtered.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-3 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar evento, ciudad, organizador..."
              className="flex-1"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-44">
                <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorías</SelectItem>
                {EVENT_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.emoji} {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-full sm:w-40">
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toda España</SelectItem>
                <SelectItem value="national">Online/Nacional</SelectItem>
                {REGIONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="rounded"
              />
              <Video className="h-3.5 w-3.5" />
              Solo eventos online
            </label>
            {hasFilters && (
              <button onClick={resetFilters} className="text-xs text-primary hover:underline">
                Limpiar filtros
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Events list */}
      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Calendar className="h-10 w-10 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No se encontraron eventos</p>
            {hasFilters && (
              <Button variant="outline" size="sm" onClick={resetFilters} className="mt-3">
                Ver todos los eventos
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Event detail dialog */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailDialog
            event={selectedEvent}
            open={!!selectedEvent}
            onOpenChange={(o) => !o && setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EventCard({ event, onClick, index }: { event: CommunityEvent; onClick: () => void; index: number }) {
  const date = formatDate(event.date);
  const cat = EVENT_CATEGORIES.find((c) => c.value === event.category);

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      onClick={onClick}
      className="w-full text-left group"
    >
      <Card className="card-hover border-border/60 hover:border-primary/40 overflow-hidden">
        <CardContent className="p-3 flex items-stretch gap-3">
          {/* Date block */}
          <div className="flex-shrink-0 w-14 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex flex-col items-center justify-center">
            <div className="text-[10px] font-medium uppercase text-muted-foreground">{date.weekday}</div>
            <div className="text-xl font-bold text-primary leading-none">{date.day}</div>
            <div className="text-[10px] font-medium uppercase text-muted-foreground">{date.month}</div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1">
              <span className="text-lg flex-shrink-0">{event.emoji}</span>
              <h3 className="font-semibold text-sm leading-snug flex-1 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <Badge variant="outline" className={cn('text-[9px] py-0 h-4 flex-shrink-0', cat?.color)}>
                {cat?.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">{event.description}</p>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                {event.isOnline ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                {event.isOnline ? 'Online' : event.city}
              </span>
              {event.free && (
                <Badge className="text-[9px] py-0 h-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200">
                  Gratis
                </Badge>
              )}
              {event.registrationRequired && (
                <span className="text-amber-600 dark:text-amber-400 text-[10px]">Inscripción requerida</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
}

function EventDetailDialog({ event, open, onOpenChange }: { event: CommunityEvent; open: boolean; onOpenChange: (o: boolean) => void }) {
  const date = formatDate(event.date);
  const cat = EVENT_CATEGORIES.find((c) => c.value === event.category);

  return (
    <Card className="fixed inset-0 z-50 m-4 sm:m-auto sm:max-w-lg sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 shadow-2xl border-2 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="relative gradient-brand p-5 text-white">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 p-1.5 rounded-md bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{event.emoji}</span>
            <div>
              <Badge variant="secondary" className={cn('text-[10px] mb-1', cat?.color)}>
                {cat?.emoji} {cat?.label}
              </Badge>
              <h2 className="text-xl font-bold leading-tight">{event.title}</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-foreground/90 leading-relaxed">{event.description}</p>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoItem icon={Calendar} label="Fecha" value={date.full} />
            <InfoItem icon={Clock} label="Hora" value={event.time} />
            <InfoItem icon={event.isOnline ? Video : MapPin} label="Lugar" value={event.isOnline ? 'Online' : event.location} />
            <InfoItem icon={Users} label="Organiza" value={event.organizer} />
          </div>

          {/* Additional info */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            {event.free && (
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200">
                ✓ Gratuito
              </Badge>
            )}
            {event.registrationRequired && (
              <Badge variant="outline" className="text-amber-600 border-amber-400">
                Inscripción requerida
              </Badge>
            )}
            {event.capacity && (
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                Capacidad: {event.capacity}
              </Badge>
            )}
            {event.languages && event.languages.length > 0 && (
              <Badge variant="outline" className="gap-1">
                <Globe className="h-3 w-3" />
                {event.languages.join(', ')}
              </Badge>
            )}
          </div>

          {/* CTA */}
          {event.url && (
            <a href={event.url} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full gradient-brand text-white gap-1.5">
                <ExternalLink className="h-4 w-4" />
                {event.registrationRequired ? 'Inscribirme' : 'Más información'}
              </Button>
            </a>
          )}
          {!event.url && event.registrationRequired && (
            <div className="text-xs text-muted-foreground text-center p-3 rounded-lg bg-muted/40">
              Contacta con el organizador para inscribirte: <strong>{event.organizer}</strong>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-xs font-medium leading-tight">{value}</div>
      </div>
    </div>
  );
}
