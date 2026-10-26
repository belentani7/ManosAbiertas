import { getJourney, pickText } from '../data/journeys.ts';
import {
  getPortalGoal,
  isPortalGoalId,
  normalizePortalLanguage,
  type PortalGoalId,
  type PortalLanguage,
} from '../data/portal.ts';
import type { SectionId } from '../stores/app-store.ts';
import { APP_VERSION } from './version.ts';

export interface OnboardingStep {
  id: string;
  position: number;
  title: string;
  section: SectionId;
}

export interface OnboardingPlan {
  ok: true;
  version: string;
  language: PortalLanguage;
  goal: { id: PortalGoalId; title: string; description: string };
  journey: { id: string; title: string; objective: string; outcome: string };
  steps: OnboardingStep[];
  entrySection: SectionId;
}

export interface OnboardingRequest {
  goal: PortalGoalId;
  language: PortalLanguage;
}

/**
 * Construye una ruta de 10 minutos a partir de datos locales verificados.
 * No recibe ni devuelve datos personales; el progreso se guarda en el cliente.
 */
export function resolveOnboardingPlan(goalId: string, languageInput: unknown): OnboardingPlan | null {
  if (!isPortalGoalId(goalId)) return null;
  const goal = getPortalGoal(goalId);
  if (!goal) return null;
  const journey = getJourney(goal.journeyId);
  if (!journey) return null;

  const language = normalizePortalLanguage(languageInput);
  return {
    ok: true,
    version: APP_VERSION,
    language,
    goal: {
      id: goal.id,
      title: pickText(goal.title, language),
      description: pickText(goal.description, language),
    },
    journey: {
      id: journey.id,
      title: pickText(journey.title, language),
      objective: pickText(journey.objective, language),
      outcome: pickText(journey.outcome, language),
    },
    steps: goal.steps.map((step, index) => ({
      id: `${goal.id}-${index + 1}`,
      position: index + 1,
      title: pickText(step.title, language),
      section: step.section,
    })),
    entrySection: goal.steps[0]?.section ?? 'home',
  };
}

/** Valida el contrato de la API sin aceptar datos personales ni campos libres. */
export function parseOnboardingRequest(value: unknown): OnboardingRequest | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (!isPortalGoalId(record.goal)) return null;
  if (record.language !== undefined && typeof record.language !== 'string') return null;
  return {
    goal: record.goal,
    language: normalizePortalLanguage(record.language),
  };
}

