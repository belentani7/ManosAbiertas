'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Crown, Clock, BookOpen, ChevronDown, ChevronUp, Sparkles, Award, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NOIA_COURSES, NOIA_MODULES, getNoiaStats, type NoiaCourse } from '@/data/noia-courses';
import { cn } from '@/lib/utils';

const LEVEL_LABELS = {
  foundation: { label: 'Fundamentos', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
  intermediate: { label: 'Intermedio', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  advanced: { label: 'Avanzado', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
  master: { label: 'Maestría', color: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300' },
};

export function NoiaCoreAcademy() {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const stats = useMemo(() => getNoiaStats(), []);

  const filtered = useMemo(() => {
    if (selectedModule === 'all') return NOIA_COURSES;
    return NOIA_COURSES.filter((c) => c.module === selectedModule);
  }, [selectedModule]);

  return (
    <div className="space-y-4">
      {/* Premium Header */}
      <div className="noia-card-premium noia-claroscuro rounded-2xl overflow-hidden noia-shadow-monolith">
        <div className="p-6 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Crown className="h-5 w-5 noia-text-amber" />
            <span className="text-xs font-semibold uppercase tracking-widest noia-text-amber">NO.IA_CORE Academy</span>
            <Crown className="h-5 w-5 noia-text-amber" />
          </div>
          <h2 className="text-3xl font-bold noia-text-gradient mb-2">
            Ecosistema de Aprendizaje Premium
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Cursos extraídos del ecosistema NO.IA_CORE by Pedro Belentani.
            Ingeniería de prompts, diseño premium, neurociencia, arquitectura web y arte generativo.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div>
              <div className="text-2xl font-bold noia-text-amber">{stats.total}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Cursos</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-2xl font-bold noia-text-amber">{stats.premium}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Premium</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-2xl font-bold noia-text-amber">{NOIA_MODULES.length}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Módulos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Module filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedModule('all')}
          className={cn(
            'text-xs px-3 py-1.5 rounded-full border transition-all',
            selectedModule === 'all'
              ? 'noia-badge-premium border-transparent'
              : 'border-border hover:border-primary/40'
          )}
        >
          Todos ({stats.total})
        </button>
        {NOIA_MODULES.map((m) => {
          const count = stats.byModule[m.id] || 0;
          const active = selectedModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModule(m.id)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1',
                active ? 'noia-badge-premium border-transparent' : 'border-border hover:border-primary/40'
              )}
            >
              <span>{m.emoji}</span>
              {m.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Courses grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((course, i) => (
          <NoiaCourseCard
            key={course.id}
            course={course}
            isExpanded={expandedId === course.id}
            onExpand={() => setExpandedId(expandedId === course.id ? null : course.id)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

function NoiaCourseCard({
  course,
  isExpanded,
  onExpand,
  index,
}: {
  course: NoiaCourse;
  isExpanded: boolean;
  onExpand: () => void;
  index: number;
}) {
  const moduleInfo = NOIA_MODULES.find((m) => m.id === course.module);
  const levelInfo = LEVEL_LABELS[course.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
    >
      <Card className={cn(
        'border-border/60 hover:border-primary/40 overflow-hidden h-full',
        course.premium && 'noia-card-premium noia-claroscuro'
      )}>
        {/* Premium gradient header */}
        <div className={cn('h-1.5 w-full bg-gradient-to-r', course.color)} />

        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{course.emoji}</span>
              <div>
                <Badge variant="outline" className={cn('text-[9px] py-0 h-4', levelInfo.color)}>
                  {levelInfo.label}
                </Badge>
              </div>
            </div>
            {course.premium && (
              <Badge className="noia-badge-premium text-[9px] py-0 h-4 gap-0.5">
                <Crown className="h-2.5 w-2.5" />
                Premium
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm leading-tight mb-1">{course.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{course.description}</p>

          {/* Meta */}
          <div className="flex items-center gap-2 flex-wrap text-[10px] text-muted-foreground mb-2">
            <span className="flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-0.5">
              <BookOpen className="h-2.5 w-2.5" />
              {course.topics.length} temas
            </span>
            {moduleInfo && (
              <Badge variant="outline" className="text-[9px] py-0 h-4">
                {moduleInfo.emoji} {moduleInfo.label}
              </Badge>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {course.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="text-[9px] px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">
                {skill}
              </span>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={onExpand}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            {isExpanded ? 'Ocultar temas' : 'Ver temas del curso'}
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {/* Expanded topics */}
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="overflow-hidden mt-2"
            >
              <div className="pt-2 border-t border-border">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Contenido del curso
                </div>
                <ol className="space-y-1">
                  {course.topics.map((topic, i) => (
                    <li key={i} className="text-xs flex items-start gap-2">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/15 text-primary text-[9px] flex items-center justify-center font-semibold">
                        {i + 1}
                      </span>
                      {topic}
                    </li>
                  ))}
                </ol>
                <div className="mt-2 pt-2 border-t border-border text-[10px] text-muted-foreground">
                  <span className="font-medium">Fuente:</span> {course.source}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
