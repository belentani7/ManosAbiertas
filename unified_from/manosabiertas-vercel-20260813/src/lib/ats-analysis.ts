import { z } from 'zod';

const rawATSAnalysisSchema = z.object({
  score: z.number().finite(),
  matchedKeywords: z.array(z.string().trim().min(1).max(200)).max(100),
  missingKeywords: z.array(z.string().trim().min(1).max(200)).max(100),
  strengths: z.array(z.string().trim().min(1).max(1_000)).max(20),
  suggestions: z.array(z.string().trim().min(1).max(1_000)).max(20),
  summary: z.string().trim().max(4_000),
});

export interface ATSAnalysis {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
  summary: string;
}

export function normalizeATSAnalysis(value: unknown): ATSAnalysis | null {
  const parsed = rawATSAnalysisSchema.safeParse(value);
  if (!parsed.success) return null;
  return {
    score: Math.max(0, Math.min(100, Math.round(parsed.data.score))),
    matchedKeywords: parsed.data.matchedKeywords.slice(0, 30),
    missingKeywords: parsed.data.missingKeywords.slice(0, 30),
    strengths: parsed.data.strengths.slice(0, 5),
    suggestions: parsed.data.suggestions.slice(0, 6),
    summary: parsed.data.summary,
  };
}

export function parseATSAnalysisText(text: string): ATSAnalysis | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return normalizeATSAnalysis(JSON.parse(candidate.slice(start, end + 1)) as unknown);
  } catch {
    return null;
  }
}
