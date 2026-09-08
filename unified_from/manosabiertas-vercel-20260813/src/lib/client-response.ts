import { isPlainRecord, readApiText } from './safe-content.ts';

export interface StudyQuestion {
  question: string;
  hint: string;
}

function isStudyQuestion(value: unknown): value is StudyQuestion {
  return isPlainRecord(value)
    && typeof value.question === 'string'
    && value.question.length > 0
    && value.question.length <= 1_000
    && typeof value.hint === 'string'
    && value.hint.length <= 1_000;
}

export function studyQuestionsFromPayload(value: unknown) {
  const text = readApiText(value, 20_000);
  if (!text) return null;
  try {
    const parsed: unknown = JSON.parse(text);
    if (isPlainRecord(parsed) && Array.isArray(parsed.questions)) {
      const questions = parsed.questions.slice(0, 3).filter(isStudyQuestion);
      if (questions.length > 0) return questions;
    }
  } catch { /* use plain-text fallback */ }
  const questions = text.split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((question) => ({ question: question.replace(/^\d+\.\s*/, '').slice(0, 1_000), hint: '' }));
  return questions.length > 0 ? questions : null;
}

export type CommunityCategory = 'legal' | 'work' | 'cities' | 'tips';
export type SharedCommunityPost = {
  id: string;
  title: string;
  category: CommunityCategory;
  replies: number;
  createdAt: string;
};

function isCommunityPost(value: unknown): value is SharedCommunityPost {
  return isPlainRecord(value)
    && typeof value.id === 'string'
    && value.id.length <= 128
    && typeof value.title === 'string'
    && value.title.length >= 5
    && value.title.length <= 140
    && ['legal', 'work', 'cities', 'tips'].includes(String(value.category))
    && typeof value.replies === 'number'
    && Number.isInteger(value.replies)
    && value.replies >= 0
    && typeof value.createdAt === 'string'
    && !Number.isNaN(Date.parse(value.createdAt));
}

export function communityPostsFromPayload(value: unknown) {
  if (!isPlainRecord(value) || value.ok !== true || value.mode !== 'shared' || !Array.isArray(value.posts)) return null;
  if (value.posts.length > 100 || !value.posts.every(isCommunityPost)) return null;
  return value.posts;
}

export function communityFeedFromPayload(value: unknown) {
  if (!isPlainRecord(value) || value.ok !== true || !Array.isArray(value.posts)) return null;
  if (value.mode === 'local' && value.degraded === true && value.posts.length === 0) {
    return { mode: 'local' as const, posts: [] as SharedCommunityPost[] };
  }
  const posts = communityPostsFromPayload(value);
  return posts ? { mode: 'shared' as const, posts } : null;
}

export function publishedCommunityPostFromPayload(value: unknown) {
  if (!isPlainRecord(value) || value.ok !== true || value.mode !== 'shared' || value.published !== true) return null;
  return isCommunityPost(value.post) ? value.post : null;
}

export type HealthStatus = { ok: true; provider: string; capabilities: string[] };

export function healthFromPayload(value: unknown): HealthStatus | null {
  if (!isPlainRecord(value) || value.ok !== true) return null;
  if (typeof value.provider !== 'string' || value.provider.length > 100) return null;
  if (!Array.isArray(value.capabilities) || value.capabilities.length > 50) return null;
  if (!value.capabilities.every((item) => typeof item === 'string' && item.length <= 100)) return null;
  return { ok: true, provider: value.provider, capabilities: value.capabilities };
}
