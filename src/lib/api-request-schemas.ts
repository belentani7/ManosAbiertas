import { z } from 'zod';
import { isLanguageCode, type LanguageCode } from '../i18n/languages.ts';

const optionalConsent = z.boolean().optional();
const shortText = z.string().trim().max(200);

export const languageCodeSchema = z.string()
  .trim()
  .refine(isLanguageCode, { message: 'Unsupported language' })
  .transform((value) => value as LanguageCode);

function textLength(value: unknown): number {
  if (typeof value === 'string') return value.length;
  if (Array.isArray(value)) return value.reduce((total, item) => total + textLength(item), 0);
  if (value && typeof value === 'object') {
    return Object.values(value).reduce<number>((total, item) => total + textLength(item), 0);
  }
  return 0;
}

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(12_000),
}).strict();

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(20),
  language: languageCodeSchema.optional(),
  context: z.string().trim().max(4_000).optional(),
  consentToRemoteAI: optionalConsent,
  userLocation: z.object({
    lat: z.number(),
    lng: z.number(),
    city: z.string().optional()
  }).optional(),
  tools: z.array(z.string()).optional(),
  stream: z.boolean().optional(),
  model: z.string().optional(),
  maxTokens: z.number().optional(),
  temperature: z.number().min(0).max(2).optional(),
  topP: z.number().min(0).max(1).optional(),
  toolChoice: z.union([
    z.enum(['auto', 'none', 'required']),
    z.object({ type: z.literal('function'), function: z.object({ name: z.string() }) })
  ]).optional()
}).strict().superRefine((value, context) => {
  if (value.messages.at(-1)?.role !== 'user') {
    context.addIssue({ code: 'custom', path: ['messages'], message: 'Last message must be from the user' });
  }
  if (textLength(value.messages) + textLength(value.context || '') > 48_000) {
    context.addIssue({ code: 'custom', path: ['messages'], message: 'Conversation text budget exceeded' });
  }
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const coverLetterSchema = z.object({
  fullName: z.string().trim().max(120).optional(),
  profession: z.string().trim().max(160).optional(),
  companyName: z.string().trim().max(160).optional(),
  jobTitle: z.string().trim().max(160).optional(),
  experience: z.string().trim().max(4_000).optional(),
  skills: z.array(z.string().trim().min(1).max(100)).max(20).optional(),
  language: languageCodeSchema.optional(),
  tone: z.enum(['formal', 'friendly', 'direct']).optional(),
  consentToRemoteAI: optionalConsent,
}).strict();

export type CoverLetterRequest = z.infer<typeof coverLetterSchema>;

const cvExperienceSchema = z.object({
  position: shortText,
  company: shortText,
  description: z.string().trim().max(3_000),
  startDate: z.string().trim().max(40),
  endDate: z.string().trim().max(40),
}).strict();

const cvEducationSchema = z.object({
  title: shortText,
  institution: shortText,
  year: z.string().trim().max(40),
  description: z.string().trim().max(2_000),
}).strict();

export const cvRequestSchema = z.object({
  field: z.enum(['summary', 'experience']),
  fullName: shortText.optional(),
  profession: shortText.optional(),
  experiences: z.array(cvExperienceSchema).max(20).optional(),
  education: z.array(cvEducationSchema).max(20).optional(),
  skills: z.array(z.string().trim().min(1).max(100)).max(30).optional(),
  language: languageCodeSchema.optional(),
  consentToRemoteAI: optionalConsent,
}).strict().superRefine((value, context) => {
  if (textLength(value) > 32_000) {
    context.addIssue({ code: 'custom', message: 'CV text budget exceeded' });
  }
});

export type CVRequest = z.infer<typeof cvRequestSchema>;

const atsExperienceSchema = z.object({
  position: shortText,
  company: shortText,
  description: z.string().trim().max(3_000),
}).strict();

const atsEducationSchema = z.object({
  title: shortText,
  institution: shortText,
  year: z.string().trim().max(40),
}).strict();

export const atsRequestSchema = z.object({
  fullName: shortText.optional(),
  profession: shortText.optional(),
  summary: z.string().trim().max(4_000).optional(),
  experiences: z.array(atsExperienceSchema).max(20).optional(),
  education: z.array(atsEducationSchema).max(20).optional(),
  skills: z.array(z.string().trim().min(1).max(100)).max(30).optional(),
  languages: z.array(z.string().trim().min(1).max(80)).max(20).optional(),
  jobDescription: z.string().trim().min(20).max(12_000),
  language: languageCodeSchema.optional(),
  consentToRemoteAI: optionalConsent,
}).strict().superRefine((value, context) => {
  if (textLength(value) > 48_000) {
    context.addIssue({ code: 'custom', message: 'ATS text budget exceeded' });
  }
});

export type ATSRequest = z.infer<typeof atsRequestSchema>;

export const studyToolsSchema = z.object({
  tool: z.enum(['questions', 'summary']),
  content: z.string().trim().min(50).max(5_000),
  title: z.string().trim().max(200).optional(),
  language: languageCodeSchema.optional(),
  consentToRemoteAI: optionalConsent,
}).strict();

export type StudyToolsRequest = z.infer<typeof studyToolsSchema>;

export const communityPostSchema = z.object({
  title: z.string().trim().min(5).max(140),
  category: z.enum(['legal', 'work', 'cities', 'tips']),
  author: z.string().trim().min(2).max(40).default('Mi gente'),
}).strict();

export const storedCommunityPostSchema = communityPostSchema.extend({
  id: z.string().uuid(),
  replies: z.number().int().min(0),
  createdAt: z.string().datetime(),
  source: z.literal('community'),
}).strict();
