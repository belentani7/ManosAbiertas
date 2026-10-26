'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Compass,
  Heart,
  Languages,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  PORTAL_COPY,
  PORTAL_GOALS,
  PORTAL_LANGUAGES,
  normalizePortalLanguage,
  type PortalGoal,
  type PortalGoalId,
  type PortalLanguage,
} from '@/data/portal';
import { resolveOnboardingPlan, type OnboardingPlan } from '@/lib/onboarding';
import { APP_VERSION, PORTAL_STORAGE_KEY } from '@/lib/version';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';

type Stage = 0 | 1 | 2 | 3;

const GOAL_ICONS = {
  compass: Compass,
  briefcase: BriefcaseBusiness,
  shield: ShieldCheck,
  languages: Languages,
  sparkles: Sparkles,
} as const;

function isPlan(value: unknown): value is OnboardingPlan {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return (
    record.ok === true
    && typeof record.version === 'string'
    && typeof record.entrySection === 'string'
    && typeof record.goal === 'object'
    && record.goal !== null
    && typeof record.journey === 'object'
    && record.journey !== null
    && Array.isArray(record.steps)
    && record.steps.length > 0
  );
}

export function WelcomePortal({
  onEnter,
  onSkip,
}: {
  onEnter: () => void;
  onSkip: () => void;
}) {
  const languageCode = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const language = normalizePortalLanguage(languageCode);
  const copy = PORTAL_COPY[language];
  const reduceMotion = useReducedMotion() ?? false;

  const [stage, setStage] = useState<Stage>(0);
  const [selected, setSelected] = useState<PortalGoalId | null>(null);
  const [plan, setPlan] = useState<OnboardingPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    document.body.dataset.portal = 'true';
    return () => {
      delete document.body.dataset.portal;
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (stage > 0) headingRef.current?.focus();
  }, [stage]);

  const goTo = useCallback((next: Stage) => {
    setStage(next);
  }, []);

  const loadPlan = useCallback(async (goalId: PortalGoalId, lang: PortalLanguage) => {
    const localPlan = resolveOnboardingPlan(goalId, lang);
    const requestId = ++requestRef.current;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setServerError(false);

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: goalId, language: lang }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('onboarding-unavailable');
      const data: unknown = await response.json();
      if (requestId !== requestRef.current) return;
      if (!isPlan(data)) throw new Error('invalid-plan');
      setPlan(data);
    } catch {
      if (controller.signal.aborted || requestId !== requestRef.current) return;
      setPlan(localPlan);
      setServerError(true);
    } finally {
      if (requestId === requestRef.current) setLoading(false);
    }

    if (requestId === requestRef.current) setStage(3);
  }, []);

  function chooseGoal(goal: PortalGoal) {
    if (loading) return;
    setSelected(goal.id);
    setPlan(null);
    setServerError(false);
  }

  function chooseLanguage(next: PortalLanguage) {
    setLanguage(next);
    if (plan && selected) {
      setPlan(resolveOnboardingPlan(selected, next));
    }
  }

  function finish() {
    try {
      localStorage.setItem(PORTAL_STORAGE_KEY, JSON.stringify({
        version: APP_VERSION,
        goal: selected,
        language,
        completed: true,
        savedAt: new Date().toISOString(),
      }));
      if (plan) {
        localStorage.setItem('manos-abiertas-personal-route', JSON.stringify({
          goal: plan.journey.id,
          completed: [],
        }));
      }
    } catch {
      /* El portal sigue siendo útil aunque el navegador bloquee el almacenamiento. */
    }
    onEnter();
  }

  function skip() {
    try {
      localStorage.setItem(PORTAL_STORAGE_KEY, JSON.stringify({
        version: APP_VERSION,
        skipped: true,
        savedAt: new Date().toISOString(),
      }));
    } catch {
      /* Sin almacenamiento, la sesión actual sigue funcionando. */
    }
    onSkip();
  }

  const progressIndex = stage === 0 ? 0 : stage === 1 ? 1 : 2;
  const progressLabels = [copy.progress.intro, copy.progress.method, copy.progress.firstStep];
  const motionProps = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <main className="portal-shell" aria-labelledby="portal-title">
      <div className="portal-aura" aria-hidden="true" />
      <div className="portal-grid-lines" aria-hidden="true" />

      <header className="portal-header">
        <div className="portal-brand">
          <span className="portal-mark" aria-hidden="true">
            <Heart className="h-5 w-5" />
          </span>
          <span className="portal-brand-copy">
            <strong>Manos Abiertas</strong>
            <span>{copy.brandTagline}</span>
          </span>
        </div>

        <div className="portal-controls">
          <div className="portal-langs" role="group" aria-label={copy.a11y.language}>
            {PORTAL_LANGUAGES.map((option) => (
              <button
                key={option.code}
                type="button"
                lang={option.code}
                aria-pressed={language === option.code}
                aria-label={option.label}
                onClick={() => chooseLanguage(option.code)}
                className={cn('portal-lang', language === option.code && 'is-active')}
              >
                {option.short}
              </button>
            ))}
          </div>
          <button type="button" className="portal-skip" onClick={skip}>
            {copy.skip}
          </button>
        </div>
      </header>

      <div className="portal-content">
        <nav className="portal-progress" aria-label={copy.progress.label}>
          {progressLabels.map((label, index) => (
            <button
              key={label}
              type="button"
              disabled={index > progressIndex}
              aria-current={progressIndex === index ? 'step' : undefined}
              onClick={() => goTo(index as Stage)}
              className={cn(
                'portal-progress-step',
                progressIndex === index && 'is-active',
                index < progressIndex && 'is-done',
              )}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {label}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait" initial={false}>
          {stage === 0 && (
            <motion.section key="hero" className="portal-stage" {...motionProps}>
              <div className="portal-hero">
                <div>
                  <p className="portal-eyebrow">{copy.hero.eyebrow}</p>
                  <h1 id="portal-title" ref={headingRef} tabIndex={-1} className="portal-display portal-hero-title">
                    {copy.hero.title}
                    <em>{copy.hero.accent}</em>
                  </h1>
                  <p className="portal-hero-copy">{copy.hero.body}</p>
                  <div className="portal-actions">
                    <button type="button" className="portal-button portal-button--primary" onClick={() => goTo(1)}>
                      {copy.hero.primary}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button type="button" className="portal-button portal-button--ghost" onClick={skip}>
                      {copy.hero.secondary}
                    </button>
                  </div>
                  <ul className="portal-meta" aria-label={copy.hero.meta.join(' · ')}>
                    {copy.hero.meta.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className="portal-visual" aria-hidden="true">
                  <div className="portal-orbit portal-orbit--one" />
                  <div className="portal-orbit portal-orbit--two" />
                  <div className="portal-orbit portal-orbit--three" />
                  <div className="portal-visual-card">
                    <span className="portal-visual-kicker">2026 / {APP_VERSION}</span>
                    <span className="portal-display portal-visual-title">{copy.progress.firstStep}</span>
                    <div className="portal-visual-list">
                      {copy.method.steps.map((step, index) => (
                        <span key={step.title}>
                          <b>0{index + 1}</b>
                          {step.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {stage === 1 && (
            <motion.section key="method" className="portal-stage" {...motionProps}>
              <p className="portal-eyebrow">{copy.method.eyebrow}</p>
              <h2 id="portal-title" ref={headingRef} tabIndex={-1} className="portal-display portal-section-title">
                {copy.method.title}
              </h2>
              <p className="portal-section-copy">{copy.method.body}</p>

              <div className="portal-method-grid">
                {copy.method.steps.map((step, index) => (
                  <article key={step.title} className="portal-card portal-method-card">
                    <span className="portal-step-index">0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <span className="portal-proof">{step.proof}</span>
                  </article>
                ))}
              </div>

              <ul className="portal-trust" aria-label={copy.method.trust.join(' · ')}>
                {copy.method.trust.map((item) => <li key={item}>{item}</li>)}
              </ul>

              <div className="portal-actions">
                <button type="button" className="portal-button portal-button--primary" onClick={() => goTo(2)}>
                  {copy.method.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" className="portal-button portal-button--ghost" onClick={() => goTo(0)}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {copy.method.back}
                </button>
              </div>
            </motion.section>
          )}

          {stage === 2 && (
            <motion.section key="menu" className="portal-stage" {...motionProps}>
              <p className="portal-eyebrow">{copy.menu.eyebrow}</p>
              <h2 id="portal-title" ref={headingRef} tabIndex={-1} className="portal-display portal-section-title">
                {copy.menu.title}
              </h2>
              <p className="portal-section-copy">{copy.menu.body}</p>

              <div className="portal-goal-grid" role="group" aria-label={copy.a11y.selectGoal}>
                {PORTAL_GOALS.map((goal) => {
                  const Icon = GOAL_ICONS[goal.icon];
                  const active = selected === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      aria-pressed={active}
                      disabled={loading}
                      onClick={() => chooseGoal(goal)}
                      className={cn('portal-goal', active && 'is-selected')}
                      style={{ '--goal-accent': goal.accent } as CSSProperties}
                    >
                      <span className="portal-goal-icon" aria-hidden="true"><Icon className="h-5 w-5" /></span>
                      <span className="portal-goal-copy">
                        <strong>{goal.title[language]}</strong>
                        <span>{goal.description[language]}</span>
                      </span>
                      <ChevronRight className="portal-goal-arrow h-4 w-4" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              {serverError && <p className="portal-note" role="status">{copy.menu.error}</p>}

              <div className="portal-actions">
                <button
                  type="button"
                  className="portal-button portal-button--primary"
                  disabled={!selected || loading}
                  aria-busy={loading}
                  onClick={() => selected && void loadPlan(selected, language)}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {copy.menu.loading}
                    </>
                  ) : (
                    <>
                      {copy.menu.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
                <button type="button" className="portal-button portal-button--ghost" onClick={() => goTo(1)}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {copy.menu.back}
                </button>
              </div>
            </motion.section>
          )}

          {stage === 3 && (
            <motion.section key="plan" className="portal-stage" {...motionProps}>
              {plan ? (
                <>
                  <div className="portal-plan-grid">
                    <div>
                      <p className="portal-eyebrow">{copy.plan.eyebrow}</p>
                      <h2 id="portal-title" ref={headingRef} tabIndex={-1} className="portal-display portal-section-title">
                        {plan.journey.title}
                      </h2>
                      <p className="portal-section-copy">{plan.journey.objective}</p>
                      <dl className="portal-plan-meta">
                        <div>
                          <dt>{copy.plan.objective}</dt>
                          <dd>{plan.goal.title}</dd>
                        </div>
                        <div>
                          <dt>{copy.plan.outcome}</dt>
                          <dd>{plan.journey.outcome}</dd>
                        </div>
                      </dl>
                    </div>

                    <ol className="portal-plan-steps">
                      {plan.steps.map((step) => (
                        <li key={step.id}>
                          <span className="portal-step-index">0{step.position}</span>
                          <div>
                            <span className="portal-step-label">{copy.plan.step} {step.position}</span>
                            <strong>{step.title}</strong>
                          </div>
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </li>
                      ))}
                    </ol>
                  </div>

                  {serverError && <p className="portal-note" role="status">{copy.menu.error}</p>}

                  <div className="portal-actions">
                    <button type="button" className="portal-button portal-button--primary" onClick={finish}>
                      {copy.plan.enter}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button type="button" className="portal-button portal-button--ghost" onClick={() => goTo(2)}>
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      {copy.plan.change}
                    </button>
                  </div>

                  <p className="portal-privacy">
                    <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                    {copy.plan.privacy}
                  </p>
                </>
              ) : (
                <>
                  <h2 id="portal-title" ref={headingRef} tabIndex={-1} className="portal-display portal-section-title">
                    {copy.plan.title}
                  </h2>
                  <p className="portal-note" role="alert">{copy.menu.error}</p>
                  <button type="button" className="portal-button portal-button--primary" onClick={() => goTo(2)}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {copy.plan.back}
                  </button>
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <footer className="portal-footer">
        <span>{copy.footer.made}</span>
        <span>v{APP_VERSION} · {copy.footer.privacy}</span>
      </footer>
    </main>
  );
}
