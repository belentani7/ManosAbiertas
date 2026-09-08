'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Plus, Trash2, Calendar, Clock, AlertTriangle, CheckCircle2, X, Edit3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'manos-abiertas-reminders';

interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO date
  category: 'document' | 'appointment' | 'course' | 'event' | 'other';
  priority: 'high' | 'medium' | 'low';
  completed?: boolean;
}

const CATEGORIES = [
  { value: 'document', label: 'Documento', emoji: '📄', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  { value: 'appointment', label: 'Cita', emoji: '📅', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
  { value: 'course', label: 'Curso', emoji: '🎓', color: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300' },
  { value: 'event', label: 'Evento', emoji: '🎪', color: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
  { value: 'other', label: 'Otro', emoji: '📌', color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300' },
] as const;

const PRIORITIES = [
  { value: 'high', label: 'Alta', color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300', dot: 'bg-red-500' },
  { value: 'medium', label: 'Media', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300', dot: 'bg-amber-500' },
  { value: 'low', label: 'Baja', color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300', dot: 'bg-slate-500' },
] as const;

function loadReminders(): Reminder[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export function SmartReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(loadReminders);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Reminder | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    category: 'document' as Reminder['category'],
    priority: 'medium' as Reminder['priority'],
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    } catch { /* ignore */ }
  }, [reminders]);

  // Check for urgent reminders on mount
  useEffect(() => {
    const urgent = reminders.filter((r) => !r.completed && getDaysUntil(r.date) <= 3 && getDaysUntil(r.date) >= 0);
    if (urgent.length > 0 && reminders.length > 0) {
      toast.warning(
        `${urgent.length} recordatorio(s) urgente(s) en los próximos 3 días`,
        { description: urgent[0].title, duration: 5000 }
      );
    }
  }, []);

  function openForm(reminder?: Reminder) {
    if (reminder) {
      setEditing(reminder);
      setForm({
        title: reminder.title,
        description: reminder.description || '',
        date: reminder.date,
        category: reminder.category,
        priority: reminder.priority,
      });
    } else {
      setEditing(null);
      setForm({
        title: '',
        description: '',
        date: '',
        category: 'document',
        priority: 'medium',
      });
    }
    setShowForm(true);
  }

  function saveReminder(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.date) {
      toast.error('Título y fecha son obligatorios');
      return;
    }

    if (editing) {
      setReminders((prev) =>
        prev.map((r) => r.id === editing.id ? { ...r, ...form } : r)
      );
      toast.success('Recordatorio actualizado');
    } else {
      const newReminder: Reminder = {
        id: `rem-${Date.now()}`,
        ...form,
      };
      setReminders((prev) => [...prev, newReminder]);
      toast.success('Recordatorio creado 🔔');
    }
    setShowForm(false);
    setEditing(null);
  }

  function deleteReminder(id: string) {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    toast.success('Recordatorio eliminado');
  }

  function toggleComplete(id: string) {
    setReminders((prev) =>
      prev.map((r) => r.id === id ? { ...r, completed: !r.completed } : r)
    );
  }

  // Sort by date (not completed first, then by date)
  const sortedReminders = useMemo(() => {
    return [...reminders].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.date.localeCompare(b.date);
    });
  }, [reminders]);

  const stats = useMemo(() => {
    const active = reminders.filter((r) => !r.completed);
    const urgent = active.filter((r) => {
      const days = getDaysUntil(r.date);
      return days >= 0 && days <= 7;
    });
    const overdue = active.filter((r) => getDaysUntil(r.date) < 0);
    return { total: reminders.length, active: active.length, urgent: urgent.length, overdue: overdue.length };
  }, [reminders]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Recordatorios
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            No pierdas plazos importantes: citas, renovaciones, eventos
          </p>
        </div>
        <Button onClick={() => openForm()} size="sm" className="gap-1.5 gradient-brand text-white">
          <Plus className="h-4 w-4" />
          Nuevo recordatorio
        </Button>
      </div>

      {/* Stats */}
      {stats.total > 0 && (
        <div className="grid grid-cols-4 gap-2">
          <StatCard label="Total" value={stats.total} icon={Bell} color="text-primary" />
          <StatCard label="Activos" value={stats.active} icon={Clock} color="text-blue-600 dark:text-blue-400" />
          <StatCard label="Próximos (7d)" value={stats.urgent} icon={Calendar} color="text-amber-600 dark:text-amber-400" />
          <StatCard label="Vencidos" value={stats.overdue} icon={AlertTriangle} color="text-red-600 dark:text-red-400" />
        </div>
      )}

      {/* Empty state */}
      {reminders.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Bell className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Sin recordatorios aún</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto mb-4">
              Crea tu primer recordatorio para no olvidar fechas importantes como renovar documentos o asistir a citas
            </p>
            <Button onClick={() => openForm()} size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Crear primer recordatorio
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {sortedReminders.map((reminder, i) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onToggle={() => toggleComplete(reminder.id)}
              onEdit={() => openForm(reminder)}
              onDelete={() => deleteReminder(reminder.id)}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Form dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              {editing ? 'Editar recordatorio' : 'Nuevo recordatorio'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={saveReminder} className="space-y-3">
            <div>
              <Label htmlFor="r-title" className="text-xs">Título *</Label>
              <Input
                id="r-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ej: Renovar TIE"
                className="mt-1 text-sm"
                required
              />
            </div>
            <div>
              <Label htmlFor="r-desc" className="text-xs">Descripción (opcional)</Label>
              <Textarea
                id="r-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Notas, detalles, instrucciones..."
                className="mt-1 text-sm min-h-[60px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="r-date" className="text-xs">Fecha *</Label>
                <Input
                  id="r-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-1 text-sm"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Prioridad</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as Reminder['priority'] })}>
                  <SelectTrigger className="mt-1 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p.value} value={p.value} className="text-sm">
                        <span className={cn('w-2 h-2 rounded-full inline-block mr-1.5', p.dot)} />
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs">Categoría</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Reminder['category'] })}>
                <SelectTrigger className="mt-1 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value} className="text-sm">
                      {c.emoji} {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 gradient-brand text-white">
                {editing ? 'Guardar' : 'Crear'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: typeof Bell; color: string }) {
  return (
    <Card>
      <CardContent className="p-2.5 text-center">
        <Icon className={cn('h-3.5 w-3.5 mx-auto mb-0.5', color)} />
        <div className="text-lg font-bold tabular-nums">{value}</div>
        <div className="text-[9px] text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

function ReminderCard({
  reminder,
  onToggle,
  onEdit,
  onDelete,
  index,
}: {
  reminder: Reminder;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}) {
  const daysUntil = getDaysUntil(reminder.date);
  const cat = CATEGORIES.find((c) => c.value === reminder.category);
  const prio = PRIORITIES.find((p) => p.value === reminder.priority);
  const isOverdue = daysUntil < 0 && !reminder.completed;
  const isUrgent = daysUntil >= 0 && daysUntil <= 3 && !reminder.completed;

  let daysLabel = '';
  let daysColor = 'text-muted-foreground';
  if (reminder.completed) {
    daysLabel = 'Completado';
    daysColor = 'text-emerald-600 dark:text-emerald-400';
  } else if (isOverdue) {
    daysLabel = `Vencido hace ${Math.abs(daysUntil)}d`;
    daysColor = 'text-red-600 dark:text-red-400';
  } else if (daysUntil === 0) {
    daysLabel = '¡Hoy!';
    daysColor = 'text-red-600 dark:text-red-400';
  } else if (daysUntil === 1) {
    daysLabel = 'Mañana';
    daysColor = 'text-amber-600 dark:text-amber-400';
  } else if (daysUntil <= 7) {
    daysLabel = `En ${daysUntil} días`;
    daysColor = 'text-amber-600 dark:text-amber-400';
  } else {
    daysLabel = `En ${daysUntil} días`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.2) }}
    >
      <Card className={cn(
        'transition-colors',
        reminder.completed ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/10' : '',
        isOverdue && 'border-red-300 dark:border-red-800',
        isUrgent && 'border-amber-300 dark:border-amber-800'
      )}>
        <CardContent className="p-3 flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className="mt-0.5 flex-shrink-0"
            aria-label={reminder.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
          >
            {reminder.completed ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950/50" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/40 hover:border-primary transition-colors" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className={cn('font-medium text-sm', reminder.completed && 'line-through text-muted-foreground')}>
                  {reminder.title}
                </h4>
                {reminder.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{reminder.description}</p>
                )}
              </div>
              <div className="flex gap-0.5 flex-shrink-0">
                <button onClick={onEdit} className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-primary transition-colors" aria-label="Editar">
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button onClick={onDelete} className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-destructive transition-colors" aria-label="Eliminar">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-[10px] flex items-center gap-0.5 text-muted-foreground">
                <Calendar className="h-2.5 w-2.5" />
                {formatDate(reminder.date)}
              </span>
              <span className={cn('text-[10px] font-semibold', daysColor)}>
                {daysLabel}
              </span>
              {cat && (
                <Badge variant="outline" className={cn('text-[9px] py-0 h-4', cat.color)}>
                  {cat.emoji} {cat.label}
                </Badge>
              )}
              {prio && !reminder.completed && (
                <Badge variant="outline" className={cn('text-[9px] py-0 h-4 gap-0.5', prio.color)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', prio.dot)} />
                  {prio.label}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
