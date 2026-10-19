/**
 * Parse untrusted browser storage before it reaches React components.
 * The persistent key is intentionally also recognized by LocalDataPanel's
 * backup/export/erase flow, so users can actually remove course progress.
 */
export interface CourseProgressState {
  courseId: string;
  completedLessons: string[];
  lastAccessed: string;
  startedAt: string;
}

export const courseProgressKey = (courseId: string) => `course-progress-${courseId}`;

export function emptyCourseProgress(courseId: string): CourseProgressState {
  const timestamp = new Date().toISOString();
  return { courseId, completedLessons: [], lastAccessed: timestamp, startedAt: timestamp };
}

export function parseCourseProgress(raw: string | null, courseId: string): CourseProgressState | null {
  if (!raw || raw.length > 120_000) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    const value = parsed as Record<string, unknown>;
    if (value.courseId !== courseId || !Array.isArray(value.completedLessons)) return null;
    const validIds = value.completedLessons.slice(0, 1_000).filter(
      (item): item is string => typeof item === 'string' && item.length > 0 && item.length <= 128
    );
    const completedLessons = Array.from(new Set(validIds));
    const validTime = (time: unknown) =>
      typeof time === 'string' && time.length <= 40 && Number.isFinite(Date.parse(time))
        ? time
        : new Date().toISOString();
    return {
      courseId,
      completedLessons,
      lastAccessed: validTime(value.lastAccessed),
      startedAt: validTime(value.startedAt),
    };
  } catch {
    return null;
  }
}

export function courseCompletionPercentage(completedCount: number, totalLessons: number): number {
  if (!Number.isFinite(totalLessons) || totalLessons <= 0 || !Number.isFinite(completedCount)) return 0;
  return Math.round((Math.min(totalLessons, Math.max(0, completedCount)) / totalLessons) * 100);
}
