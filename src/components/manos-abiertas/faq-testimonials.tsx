'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Quote, Heart, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FAQ_ITEMS, TESTIMONIALS } from '@/data/home-content';
import { cn } from '@/lib/utils';

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  general: { label: 'General', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
  ai: { label: 'IA', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' },
  cv: { label: 'CV', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  rights: { label: 'Derechos', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
  technical: { label: 'Técnico', color: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
};

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === filter);
  const categories = Array.from(new Set(FAQ_ITEMS.map((f) => f.category)));

  return (
    <section className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <HelpCircle className="h-3 w-3" />
          Preguntas frecuentes
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">¿Tienes dudas? Tenemos respuestas</h2>
        <p className="text-muted-foreground text-sm">Las preguntas más comunes de quienes usan Manos Abiertas</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'text-xs px-3 py-1 rounded-full border transition-colors',
            filter === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'
          )}
        >
          Todas ({FAQ_ITEMS.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'text-xs px-3 py-1 rounded-full border transition-colors',
              filter === cat ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'
            )}
          >
            {CATEGORY_LABELS[cat]?.label} ({FAQ_ITEMS.filter((f) => f.category === cat).length})
          </button>
        ))}
      </div>

      {/* FAQ items */}
      <div className="space-y-2">
        {filtered.map((item, i) => {
          const isOpen = openId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className={cn('overflow-hidden border-border/60 transition-colors', isOpen && 'border-primary/40')}>
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full text-left p-4 flex items-start gap-3 hover:bg-accent/30 transition-colors"
                >
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 mt-0.5', CATEGORY_LABELS[item.category]?.color)}>
                    {CATEGORY_LABELS[item.category]?.label}
                  </span>
                  <h3 className="font-medium text-sm flex-1 leading-snug">{item.question}</h3>
                  <ChevronDown className={cn('h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform', isOpen && 'rotate-180')} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed pl-12">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-2 gap-1.5">
          <Heart className="h-3 w-3 text-primary fill-primary" />
          Casos ilustrativos
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Ejemplos de rutas posibles</h2>
        <p className="text-muted-foreground text-sm">Perfiles ficticios creados para explicar usos de la plataforma; no son testimonios de usuarios.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="card-hover border-border/60 hover:border-primary/40 h-full overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-saffron/30 to-brand-warm/30 flex items-center justify-center text-2xl">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-1.5">
                        {t.name}
                        <span className="text-base">{t.flag}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{t.role} · ejemplo ficticio</div>
                    </div>
                  </div>
                  <Quote className="h-5 w-5 text-primary/30 flex-shrink-0" />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed italic">"{t.story}"</p>

                {/* Outcome badge */}
                {t.outcome && (
                  <div className="mt-3 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="font-medium">Meta ilustrativa: {t.outcome}</span>
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>Desde <span className="font-medium">{t.origin}</span></span>
                  <div className="flex items-center gap-2">
                    {t.timeline && (
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3" />
                        {t.timeline}
                      </span>
                    )}
                    {t.section && (
                      <Badge variant="outline" className="text-[9px] py-0 h-4">
                        {t.section}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
