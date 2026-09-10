'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Send, CheckCircle2, ExternalLink, Inbox, Trash2, Lightbulb } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RESOURCE_CATEGORIES, type ResourceCategory } from '@/data/resources';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { isPlainRecord, parseStoredJson, safeHttpUrl } from '@/lib/safe-content';

const STORAGE_KEY = 'manos-abiertas-resource-suggestions';

export interface ResourceSuggestion {
  id: string;
  title: string;
  url: string;
  description: string;
  category: ResourceCategory;
  source: string;
  submittedAt: string;
}

function loadSuggestions(): ResourceSuggestion[] {
  if (typeof window === 'undefined') return [];
  return parseStoredJson(localStorage.getItem(STORAGE_KEY), [], (value): value is ResourceSuggestion[] => (
    Array.isArray(value)
    && value.length <= 100
    && value.every((item) => isPlainRecord(item)
      && typeof item.id === 'string'
      && typeof item.title === 'string'
      && item.title.length <= 140
      && safeHttpUrl(item.url) !== null
      && typeof item.description === 'string'
      && item.description.length <= 2_000
      && RESOURCE_CATEGORIES.some((category) => category.value === item.category)
      && typeof item.source === 'string'
      && typeof item.submittedAt === 'string')
  ));
}

export function ResourceSubmissionForm() {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'list'>('form');
  const [suggestions, setSuggestions] = useState<ResourceSuggestion[]>(loadSuggestions);
  const [form, setForm] = useState({
    title: '',
    url: '',
    description: '',
    category: 'government' as ResourceCategory,
    source: '',
  });

  function persist(next: ResourceSuggestion[]) {
    setSuggestions(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch { /* ignore */ }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) {
      toast.error('Título y URL son obligatorios');
      return;
    }
    // Basic URL validation
    let url = form.url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    const safeUrl = safeHttpUrl(url);
    if (!safeUrl) {
      toast.error('La URL no es válida');
      return;
    }
    const suggestion: ResourceSuggestion = {
      id: `sug-${Date.now()}`,
      title: form.title.trim(),
      url: safeUrl,
      description: form.description.trim() || 'Sin descripción',
      category: form.category,
      source: form.source.trim() || 'Sugerencia de usuario',
      submittedAt: new Date().toISOString(),
    };
    persist([suggestion, ...suggestions]);
    toast.success('¡Gracias! Tu sugerencia fue guardada ✨');
    setForm({ title: '', url: '', description: '', category: 'government', source: '' });
    setViewMode('list');
  }

  function deleteSuggestion(id: string) {
    persist(suggestions.filter((s) => s.id !== id));
    toast.success('Sugerencia eliminada');
  }

  return (
    <>
      <Button
        onClick={() => { setOpen(true); setViewMode('form'); }}
        variant="outline"
        size="sm"
        className="gap-1.5"
      >
        <Plus className="h-3.5 w-3.5" />
        Sugerir recurso
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Sugerir un recurso
            </DialogTitle>
          </DialogHeader>

          {/* Toggle between form and list */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg mb-3">
            <button
              onClick={() => setViewMode('form')}
              className={cn(
                'flex-1 text-xs py-1.5 rounded-md font-medium transition-colors flex items-center justify-center gap-1.5',
                viewMode === 'form' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'
              )}
            >
              <Plus className="h-3 w-3" />
              Nuevo
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'flex-1 text-xs py-1.5 rounded-md font-medium transition-colors flex items-center justify-center gap-1.5',
                viewMode === 'list' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'
              )}
            >
              <Inbox className="h-3 w-3" />
              Mis sugerencias
              {suggestions.length > 0 && (
                <Badge variant="secondary" className="text-[9px] py-0 h-4 ml-0.5">{suggestions.length}</Badge>
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'form' ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                <div>
                  <Label htmlFor="r-title" className="text-xs">Título del recurso *</Label>
                  <Input
                    id="r-title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Ej: Portal de empleo del Ayuntamiento de Madrid"
                    className="mt-1 text-sm"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="r-url" className="text-xs">URL (enlace web) *</Label>
                  <Input
                    id="r-url"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://ejemplo.es"
                    className="mt-1 text-sm"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="r-desc" className="text-xs">Descripción breve</Label>
                  <Textarea
                    id="r-desc"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="¿Qué se puede encontrar en este recurso? ¿A quién ayuda?"
                    className="mt-1 text-sm min-h-[60px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="r-cat" className="text-xs">Categoría</Label>
                    <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as ResourceCategory })}>
                      <SelectTrigger id="r-cat" className="mt-1 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {RESOURCE_CATEGORIES.map((c) => (
                          <SelectItem key={c.value} value={c.value} className="text-sm">
                            {c.icon} {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="r-src" className="text-xs">Fuente/Organización</Label>
                    <Input
                      id="r-src"
                      value={form.source}
                      onChange={(e) => setForm({ ...form, source: e.target.value })}
                      placeholder="Ej: Ayuntamiento de Madrid"
                      className="mt-1 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 gap-1.5 gradient-brand text-white">
                    <Send className="h-3.5 w-3.5" />
                    Enviar sugerencia
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center pt-1">
                  Tu sugerencia se guarda en este dispositivo. Será revisada antes de añadirse al directorio público.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {suggestions.length === 0 ? (
                  <div className="py-10 text-center">
                    <Inbox className="h-10 w-10 mx-auto mb-2 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">Aún no has sugerido ningún recurso</p>
                    <Button onClick={() => setViewMode('form')} variant="outline" size="sm" className="mt-3 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      Sugerir el primero
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {suggestions.length} sugerencia{suggestions.length !== 1 ? 's' : ''} guardada{suggestions.length !== 1 ? 's' : ''}
                    </div>
                    <ScrollArea className="h-[350px] pr-2">
                      <div className="space-y-2">
                        {suggestions.map((s) => {
                          const cat = RESOURCE_CATEGORIES.find((c) => c.value === s.category);
                          return (
                            <div key={s.id} className="p-3 rounded-lg border border-border bg-card">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="text-sm">{cat?.icon}</span>
                                  <Badge variant="outline" className="text-[9px] py-0 h-4">{cat?.label}</Badge>
                                </div>
                                <button
                                  onClick={() => deleteSuggestion(s.id)}
                                  className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                                  aria-label="Eliminar"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <h4 className="font-medium text-sm mb-0.5">{s.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">{s.description}</p>
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                {s.url.replace(/^https?:\/\//, '').slice(0, 40)}
                              </a>
                              <div className="text-[10px] text-muted-foreground mt-1">
                                {s.source} · {new Date(s.submittedAt).toLocaleDateString()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
