'use client';

import { useState } from 'react';
import { Heart, Globe, Shield, ExternalLink, Keyboard, Command, ArrowUp, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAppStore } from '@/stores/app-store';
import { getTranslation } from '@/i18n/translations';
import { ReadingModeToggle } from './reading-mode-toggle';
import { PomodoroTimer } from './pomodoro-timer';
import { LANGUAGE_COUNT } from '@/i18n/languages';
import { RESOURCES } from '@/data/resources';
import { AI_COURSES } from '@/data/ai-courses';
import { OFFICE_MODULES } from '@/data/office-course';

const SHORTCUTS = [
  { keys: ['Cmd', 'K'], action: 'Abrir búsqueda rápida', icon: Search },
  { keys: ['Esc'], action: 'Cerrar diálogo / búsqueda', icon: Command },
  { keys: ['↑', '↓'], action: 'Navegar en listas', icon: ArrowUp },
  { keys: ['Enter'], action: 'Seleccionar elemento', icon: Command },
];

export function Footer() {
  const { language } = useAppStore();
  const t = getTranslation(language);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const totalLessons = AI_COURSES.reduce((acc, c) => acc + c.lessons.length, 0) + OFFICE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <footer className="mt-auto border-t border-border bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg gradient-brand flex items-center justify-center shadow-sm">
                <Heart className="h-5 w-5 text-white fill-white" />
              </div>
              <div>
                <div className="font-bold text-sm gradient-text">Manos Abiertas</div>
                <div className="text-[10px] text-muted-foreground">{t.footer_rights}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/90 leading-relaxed">
              {t.footer_madeWith}.
              <br />
              <span className="text-muted-foreground/70">{t.footer_disclaimer}</span>
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-2 md:col-span-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">En cifras</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-card border border-border p-2.5 text-center">
                <div className="text-lg font-bold text-primary">{LANGUAGE_COUNT}</div>
                <div className="text-[10px] text-muted-foreground">Idiomas</div>
              </div>
              <div className="rounded-lg bg-card border border-border p-2.5 text-center">
                <div className="text-lg font-bold text-primary">{RESOURCES.length.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground">Recursos</div>
              </div>
              <div className="rounded-lg bg-card border border-border p-2.5 text-center">
                <div className="text-lg font-bold text-primary">{totalLessons}</div>
                <div className="text-[10px] text-muted-foreground">Lecciones</div>
              </div>
              <div className="rounded-lg bg-card border border-border p-2.5 text-center">
                <div className="text-lg font-bold text-primary">100%</div>
                <div className="text-[10px] text-muted-foreground">Gratis</div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="space-y-2 md:col-span-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Garantías</div>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] bg-secondary/60 rounded-full px-2 py-1">
                <Globe className="h-3 w-3" /> Fuentes oficiales
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-secondary/60 rounded-full px-2 py-1">
                <Shield className="h-3 w-3" /> Sin registro
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-secondary/60 rounded-full px-2 py-1">
                <Heart className="h-3 w-3" /> Acceso libre
              </span>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3 w-3" /> Proyecto open-source
            </a>
          </div>

          {/* Help & shortcuts */}
          <div className="space-y-2 md:col-span-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ayuda</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setShowShortcuts(true)}
                className="inline-flex items-center gap-1.5 text-[11px] bg-secondary/60 hover:bg-secondary rounded-full px-2 py-1 transition-colors"
              >
                <Keyboard className="h-3 w-3" />
                Atajos
              </button>
              <ReadingModeToggle />
              <PomodoroTimer />
            </div>
            <div className="text-[11px] text-muted-foreground/80 leading-relaxed">
              ¿Necesitas ayuda? Escribe a:<br />
              <a href="mailto:hola@manos-abiertas.es" className="text-primary hover:underline">hola@manos-abiertas.es</a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>© 2025 Manos Abiertas · {t.footer_rights}</div>
          <div className="flex items-center gap-1.5">
            Hecho con <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> para las comunidades latinoamericanas y migrantes en España
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts dialog */}
      <Dialog open={showShortcuts} onOpenChange={setShowShortcuts}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-primary" />
              Atajos de teclado
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {SHORTCUTS.map((sc, i) => {
              const Icon = sc.icon;
              return (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                  <span className="text-sm flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {sc.action}
                  </span>
                  <div className="flex items-center gap-1">
                    {sc.keys.map((key) => (
                      <kbd key={key} className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-background px-1.5 text-xs font-semibold">
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-primary">💡 Consejo:</strong> Usa <kbd className="border border-border rounded px-1 mx-0.5">Cmd</kbd>+<kbd className="border border-border rounded px-1 mx-0.5">K</kbd> en cualquier momento para buscar rápidamente entre secciones, cursos, recursos y artículos de derechos.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
