'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Globe, Heart, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LANGUAGES, type LanguageCode } from '@/i18n/languages';
import { useAppStore, type SectionId } from '@/stores/app-store';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'manos-abiertas-onboarded';

const SITUATIONS = [
  { id: 'arrived', emoji: '🛬', label: 'Recién llegado/a', desc: 'Acabo de llegar a España' },
  { id: 'regularizing', emoji: '📄', label: 'Regularizando papeles', desc: 'Tramitando NIE o residencia' },
  { id: 'working', emoji: '💼', label: 'Buscando empleo', desc: 'Quiero trabajar o mejorar mi CV' },
  { id: 'learning', emoji: '🎓', label: 'Aprendiendo', desc: 'Quiero aprender IA y tecnología' },
  { id: 'settled', emoji: '🏠', label: 'Instalado/a', desc: 'Vivo en España y necesito recursos' },
];

const GOALS: { id: SectionId; emoji: string; label: string }[] = [
  { id: 'learn-ai', emoji: '🤖', label: 'Aprender IA' },
  { id: 'cv', emoji: '📝', label: 'Crear mi CV' },
  { id: 'office', emoji: '📊', label: 'Aprender Office' },
  { id: 'resources', emoji: '📚', label: 'Encontrar recursos' },
  { id: 'rights', emoji: '⚖️', label: 'Conocer mis derechos' },
];

export function OnboardingWizard() {
  const { language, setLanguage, setActiveSection } = useAppStore();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(language);
  const [situation, setSituation] = useState<string | null>(null);
  const [goal, setGoal] = useState<SectionId | null>(null);

  // Show onboarding on first visit
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const onboarded = localStorage.getItem(STORAGE_KEY);
      if (!onboarded) {
        // Delay slightly so page loads first
        const timer = setTimeout(() => setOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch { /* ignore */ }
  }, []);

  function finish() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch { /* ignore */ }
    setOpen(false);
    if (selectedLang) setLanguage(selectedLang);
    if (goal) {
      setActiveSection(goal);
      toast.success('¡Bienvenido/a a Manos Abiertas! 🤝', {
        description: goal === 'learn-ai' ? 'Empezamos con IA' : goal === 'cv' ? 'Vamos a crear tu CV' : 'Aquí tienes lo que buscabas',
      });
    } else {
      toast.success('¡Bienvenido/a a Manos Abiertas! 🤝');
    }
  }

  function skip() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch { /* ignore */ }
    setOpen(false);
  }

  const steps = [
    {
      title: '¡Bienvenido/a! 👋',
      subtitle: 'Te ayudamos a empezar en solo 3 pasos',
      icon: Heart,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Manos Abiertas es una plataforma gratuita para personas inmigrantes en España.
            <br />Configurémosla para ti.
          </p>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { emoji: '🌍', label: '39 idiomas' },
              { emoji: '🤖', label: '8 cursos IA' },
              { emoji: '📚', label: '3,647 recursos' },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-lg bg-muted/40">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="text-[11px] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '¿Cuál es tu idioma?',
      subtitle: 'Podrás cambiarlo cuando quieras',
      icon: Globe,
      content: (
        <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
          {LANGUAGES.slice(0, 18).map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={cn(
                'w-full flex items-center gap-3 p-2.5 rounded-lg border transition-colors text-left',
                selectedLang === lang.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent/40'
              )}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{lang.name}</div>
                <div className="text-xs text-muted-foreground">{lang.englishName}</div>
              </div>
              {selectedLang === lang.code && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
          <p className="text-[10px] text-center text-muted-foreground pt-2">
            +{LANGUAGES.length - 18} idiomas más disponibles en el selector superior
          </p>
        </div>
      ),
    },
    {
      title: '¿Cuál es tu situación?',
      subtitle: 'Para mostrarte primero lo más útil',
      icon: Target,
      content: (
        <div className="space-y-2">
          {SITUATIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSituation(s.id)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left',
                situation === s.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent/40'
              )}
            >
              <span className="text-2xl">{s.emoji}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </div>
              {situation === s.id && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: '¿Qué quieres hacer primero?',
      subtitle: 'Te llevamos directamente ahí',
      icon: Sparkles,
      content: (
        <div className="space-y-2">
          {GOALS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left',
                goal === g.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent/40'
              )}
            >
              <span className="text-2xl">{g.emoji}</span>
              <span className="flex-1 font-medium text-sm">{g.label}</span>
              {goal === g.id && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      ),
    },
  ];

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;
  const canAdvance = step === 0 || (step === 1 && selectedLang) || (step === 2 && situation) || (step === 3 && goal);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && skip()}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Configuración inicial de Manos Abiertas</DialogTitle>
          <DialogDescription>Elige idioma, situación y objetivo para personalizar tu ruta.</DialogDescription>
        </DialogHeader>
        {/* Header with gradient */}
        <div className="gradient-brand p-5 text-white relative">
          <button
            onClick={skip}
            className="absolute top-3 right-3 p-1 rounded-md text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{current.title}</h2>
              <p className="text-xs text-white/80">{current.subtitle}</p>
            </div>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5 mt-3">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1 rounded-full transition-all',
                  i === step ? 'bg-white' : i < step ? 'bg-white/60' : 'bg-white/20'
                )}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {current.content}
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-2 mt-5">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                Atrás
              </Button>
            )}
            <Button
              onClick={() => (isLast ? finish() : setStep(step + 1))}
              disabled={!canAdvance}
              className="flex-1 gap-1.5 gradient-brand text-white"
            >
              {isLast ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  ¡Empezar ahora!
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </div>

          {/* Skip link */}
          <button
            onClick={skip}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors"
          >
            Saltar introducción
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
