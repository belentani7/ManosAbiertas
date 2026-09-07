'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, Sparkles, FileText, BookOpen, Database, Shield, Phone, Globe,
  Heart, Users, GraduationCap, ChevronRight, Wrench, Calendar, CheckCircle2,
  Smartphone, ShieldCheck, Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore, type SectionId } from '@/stores/app-store';
import { getTranslation } from '@/i18n/translations';
import { LANGUAGE_COUNT } from '@/i18n/languages';
import { RESOURCES } from '@/data/resources';
import { AI_COURSES } from '@/data/ai-courses';
import { OFFICE_MODULES } from '@/data/office-course';
import { FAQSection, TestimonialsSection } from './faq-testimonials';
import { ProgressDashboard } from './progress-dashboard';
import { FirstSteps } from './first-steps';
import { AnimatedCounter } from './animated-counter';
import { RecentlyViewed } from './recently-viewed';
import { PersonalRoute } from './personal-route';

type CategoryFilter = 'all' | 'ai' | 'employment' | 'digital' | 'rights' | 'community';

interface CourseCard {
  id: SectionId;
  emoji: string;
  icon: typeof Sparkles;
  title: string;
  desc: string;
  gradient: string;
  category: CategoryFilter;
  lessonCount: number;
  level: string;
  popular?: boolean;
}

export function HomeSection() {
  const { language, setActiveSection } = useAppStore();
  const t = getTranslation(language);
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const totalLessons = AI_COURSES.reduce((acc, c) => acc + c.lessons.length, 0)
    + OFFICE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: t.home_all_categories },
    { id: 'ai', label: t.home_category_ai },
    { id: 'employment', label: t.home_category_employment },
    { id: 'digital', label: t.home_category_digital },
    { id: 'rights', label: t.home_category_rights },
    { id: 'community', label: t.home_category_community },
  ];

  const courseCards: CourseCard[] = [
    {
      id: 'learn-ai',
      emoji: '🤖',
      icon: Sparkles,
      title: t.nav_learnAI,
      desc: t.home_desc_ai,
      gradient: 'from-orange-400 to-red-500',
      category: 'ai',
      lessonCount: AI_COURSES.reduce((acc, c) => acc + c.lessons.length, 0),
      level: t.level_beginner,
      popular: true,
    },
    {
      id: 'cv',
      emoji: '📝',
      icon: FileText,
      title: t.nav_cv,
      desc: t.home_desc_cv,
      gradient: 'from-amber-400 to-orange-500',
      category: 'employment',
      lessonCount: 5,
      level: t.level_beginner,
      popular: true,
    },
    {
      id: 'office',
      emoji: '📊',
      icon: BookOpen,
      title: t.nav_office,
      desc: t.home_desc_office,
      gradient: 'from-yellow-400 to-amber-500',
      category: 'digital',
      lessonCount: OFFICE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
      level: t.level_beginner,
    },
    {
      id: 'resources',
      emoji: '📚',
      icon: Database,
      title: t.nav_resources,
      desc: `${RESOURCES.length.toLocaleString()} ${t.home_resources_reviewed.replace('{n}', String(RESOURCES.filter((r) => r.verifiedAt).length))}`,
      gradient: 'from-teal-400 to-emerald-500',
      category: 'community',
      lessonCount: RESOURCES.length,
      level: t.level_beginner,
    },
    {
      id: 'rights',
      emoji: '⚖️',
      icon: Shield,
      title: t.nav_rights,
      desc: t.home_desc_rights,
      gradient: 'from-rose-400 to-pink-500',
      category: 'rights',
      lessonCount: 12,
      level: t.level_beginner,
      popular: true,
    },
    {
      id: 'tools',
      emoji: '🛠️',
      icon: Wrench,
      title: t.home_title_tools,
      desc: t.home_desc_tools,
      gradient: 'from-cyan-400 to-blue-500',
      category: 'digital',
      lessonCount: 8,
      level: t.level_beginner,
    },
    {
      id: 'events',
      emoji: '📅',
      icon: Calendar,
      title: t.home_title_events,
      desc: t.home_desc_events,
      gradient: 'from-pink-400 to-rose-500',
      category: 'community',
      lessonCount: 0,
      level: t.level_beginner,
    },
    {
      id: 'courses',
      emoji: '🎓',
      icon: GraduationCap,
      title: t.home_title_courses,
      desc: t.home_desc_courses,
      gradient: 'from-blue-400 to-indigo-500',
      category: 'digital',
      lessonCount: totalLessons,
      level: t.level_beginner,
    },
    {
      id: 'contacts',
      emoji: '📞',
      icon: Phone,
      title: t.nav_contacts,
      desc: t.home_desc_contacts,
      gradient: 'from-violet-400 to-purple-500',
      category: 'community',
      lessonCount: 0,
      level: t.level_beginner,
    },
  ];

  const filtered = activeCategory === 'all'
    ? courseCards
    : courseCards.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* ── HERO ── Clean Coursera-style header */}
      <section className="bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto max-w-7xl px-4 pt-14 pb-10 md:pt-20 md:pb-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="gradient-text">{t.hero_title}</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t.hero_subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => setActiveSection('learn-ai')}
                className="gradient-brand text-white shadow-md gap-2 h-11 px-6"
              >
                <Play className="h-4 w-4" />
                {t.hero_cta_learn}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveSection('cv')}
                className="gap-2 h-11 px-6"
              >
                <FileText className="h-4 w-4" />
                {t.hero_cta_start}
              </Button>
            </div>

            {/* Trust badges — inline, compact */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-primary" />
                {LANGUAGE_COUNT} {t.cv_languages.toLowerCase()}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                {t.home_trusted_sources}
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5 text-primary" />
                {t.home_works_mobile}
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
                100% {t.free.toLowerCase()}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRESS DASHBOARD ── (shows only if user has progress) */}
      <ProgressDashboard />

      {/* ── RECENTLY VIEWED ── */}
      <RecentlyViewed />

      {/* ── PERSONAL ROUTE ── */}
      <PersonalRoute />

      {/* ── COURSE CATALOG ── Coursera-style grid */}
      <section className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{t.home_explore_catalog}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t.home_choose_start}</p>
          </div>
          <div className="text-sm text-muted-foreground tabular-nums">
            {totalLessons} {t.footer_lessons.toLowerCase()} · {RESOURCES.length.toLocaleString()} {t.nav_resources.toLowerCase()}
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : { delay: i * 0.04 }}
                onClick={() => setActiveSection(card.id)}
                className="group text-left"
              >
                <Card className="h-full overflow-hidden border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-200">
                  {/* Color accent strip */}
                  <div className={`h-1.5 bg-gradient-to-r ${card.gradient}`} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-xl shadow-sm`}>
                        {card.emoji}
                      </div>
                      {card.popular && (
                        <Badge variant="secondary" className="text-[10px] gap-1 px-2 py-0.5">
                          <Sparkles className="h-3 w-3" /> {t.home_popular_now}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-base mb-1 flex items-center gap-1.5">
                      {card.title}
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{card.desc}</p>

                    {/* Bottom metadata */}
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-3">
                        {card.lessonCount > 0 && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {t.home_lessons_count.replace('{n}', String(card.lessonCount))}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {card.level}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        {t.free}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── AI MODELS STRIP ── compact row */}
      <section className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">{t.home_ai_explained}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection('learn-ai')}
            className="gap-1 text-xs"
          >
            {t.viewAll} <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {AI_COURSES.map((course) => (
            <button
              key={course.id}
              onClick={() => setActiveSection('learn-ai')}
              className="group p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-1">{course.logo}</div>
              <div className="text-[11px] font-medium truncate text-muted-foreground group-hover:text-foreground">
                {course.model}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FIRST STEPS ── */}
      <FirstSteps />

      {/* ── MISSION ── Simplified, Coursera-style value prop */}
      <section className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge variant="secondary" className="gap-1.5">
              <Heart className="h-3 w-3 text-primary fill-primary" />
              {t.home_mission}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-balance">{t.home_mission_text}</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">{t.home_forWho_text}</p>
          </div>

          <Card className="overflow-hidden border-border/60">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{t.home_for_who_question}</h3>
              </div>
              <div className="space-y-2">
                {[
                  { emoji: '🌍', text: t.home_for_who_1 },
                  { emoji: '💼', text: t.home_for_who_2 },
                  { emoji: '🎓', text: t.home_for_who_3 },
                  { emoji: '👵', text: t.home_for_who_4 },
                  { emoji: '⚖️', text: t.home_for_who_5 },
                  { emoji: '🗣️', text: t.home_for_who_6 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/40 transition-colors"
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── CTA ── */}
      <section className="container mx-auto max-w-7xl px-4 pb-4">
        <Card className="overflow-hidden border-0 gradient-brand">
          <CardContent className="p-8 md:p-12 text-center text-white">
            <GraduationCap className="h-9 w-9 mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.home_start_today}</h2>
            <p className="text-white/90 max-w-xl mx-auto mb-5 text-sm md:text-base">
              {t.home_no_prior_knowledge}
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setActiveSection('learn-ai')}
              className="gap-2"
            >
              <Sparkles className="h-5 w-5" />
              {t.hero_cta_learn}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
