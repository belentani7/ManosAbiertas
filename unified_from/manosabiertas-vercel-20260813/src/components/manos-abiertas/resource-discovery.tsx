'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  FileText,
  Scales,
  Users,
  GraduationCap,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const QUICK_LINKS = [
  {
    id: 'courses',
    icon: BookOpen,
    label: 'Cursos',
    desc: 'Aprende IA, Excel, idiomas',
    color: 'from-blue-500 to-cyan-500',
    link: '#courses',
  },
  {
    id: 'cv',
    icon: FileText,
    label: 'CV & Cartas',
    desc: 'Crea documentos profesionales',
    color: 'from-emerald-500 to-teal-500',
    link: '#cv',
  },
  {
    id: 'legal',
    icon: Scales,
    label: 'Derechos',
    desc: 'Guías legales y trámites',
    color: 'from-amber-500 to-orange-500',
    link: '#legal',
  },
  {
    id: 'community',
    icon: Users,
    label: 'Comunidad',
    desc: 'Conecta con otros migrantes',
    color: 'from-pink-500 to-rose-500',
    link: '#community',
  },
  {
    id: 'mentor',
    icon: GraduationCap,
    label: 'Mentor',
    desc: 'Recibe orientación personalizada',
    color: 'from-purple-500 to-indigo-500',
    link: '#mentor',
  },
  {
    id: 'explore',
    icon: Sparkles,
    label: 'Explorar',
    desc: 'Descubre recursos verificados',
    color: 'from-orange-500 to-yellow-500',
    link: '#explore',
  },
];

const TRENDING = [
  { title: 'Excel desde cero', level: 'Aprendiz', views: '2.3k' },
  { title: 'Primeros pasos en España', level: 'Rápido', views: '1.8k' },
  { title: 'CV para tech', level: 'Maestro', views: '945' },
];

export function ResourceDiscovery() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);

  const filtered = QUICK_LINKS.filter((link) =>
    link.label.toLowerCase().includes(search.toLowerCase()) ||
    link.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="overflow-hidden border-t-2 border-t-brand-warm bg-gradient-to-br from-white to-brand-saffron/5 dark:from-slate-950 dark:to-slate-900">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-brand-warm w-5 h-5" />
            <h3 className="text-lg font-bold">🔍 ¿Qué necesitas?</h3>
          </div>

          {/* Search */}
          <Input
            placeholder="Busca recursos, cursos, guías..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 bg-white/50 dark:bg-slate-800/50 border-brand-warm/30"
          />

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.link}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-lg p-3 cursor-pointer transition-all"
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                  <div className="relative space-y-2">
                    <Icon className="w-5 h-5 text-brand-warm group-hover:text-brand-saffron transition-colors" />
                    <div>
                      <p className="font-semibold text-sm text-foreground group-hover:text-brand-warm transition-colors">
                        {link.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{link.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-brand-warm" />
                  </div>

                  {/* Border highlight */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-brand-warm/20 transition-colors pointer-events-none" />
                </motion.a>
              );
            })}
          </div>

          {/* Trending Section */}
          <div className="pt-4 border-t border-brand-warm/10 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-warm" />
              <p className="text-sm font-semibold">📈 Tendencias ahora</p>
            </div>

            <div className="space-y-2">
              {TRENDING.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-brand-saffron/5 hover:bg-brand-saffron/10 transition-colors cursor-pointer group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate text-foreground group-hover:text-brand-warm transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.views} explorando</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-brand-warm/10 text-brand-warm ml-2 flex-shrink-0">
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-3 border-t border-brand-warm/10">
            <Button
              className="w-full bg-gradient-to-r from-brand-warm to-brand-saffron hover:from-brand-warm/90 hover:to-brand-saffron/90 text-white"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Colapsar' : 'Ver todo'} →
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
