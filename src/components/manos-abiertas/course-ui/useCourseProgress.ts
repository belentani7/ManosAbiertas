"use client";

import { useState, useEffect, useCallback } from "react";
import {
  courseCompletionPercentage,
  courseProgressKey,
  emptyCourseProgress,
  parseCourseProgress,
  type CourseProgressState,
} from "@/lib/course-progress";

export function useCourseProgress(courseId: string, totalLessons: number) {
  const storageKey = courseProgressKey(courseId);
  const [progress, setProgress] = useState<CourseProgressState>(() => emptyCourseProgress(courseId));
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  // Read first. The old implementation saved the empty initial state during
  // the same mount cycle, potentially overwriting a learner's saved lessons.
  useEffect(() => {
    let stored: CourseProgressState | null = null;
    try {
      stored = parseCourseProgress(window.localStorage.getItem(storageKey), courseId);
    } catch {
      // Blocked storage: keep the course usable without claiming persistence.
    }
    setProgress(stored ?? emptyCourseProgress(courseId));
    setLoadedKey(storageKey);
  }, [storageKey, courseId]);

  useEffect(() => {
    // Never save before hydration, or save the previous course under a new ID.
    if (loadedKey !== storageKey || progress.courseId !== courseId) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // Private browsing, blocked storage and quota failure are non-fatal.
    }
  }, [storageKey, loadedKey, progress, courseId]);

  const markCompleted = useCallback((lessonId: string) => {
    if (loadedKey !== storageKey || !lessonId || lessonId.length > 128) return;
    setProgress((previous) => {
      if (previous.courseId !== courseId || previous.completedLessons.includes(lessonId)) return previous;
      return {
        ...previous,
        completedLessons: [...previous.completedLessons, lessonId],
        lastAccessed: new Date().toISOString(),
      };
    });
  }, [courseId, loadedKey, storageKey]);

  const ready = loadedKey === storageKey && progress.courseId === courseId;
  const completedLessons = ready ? progress.completedLessons : [];

  const isCompleted = useCallback(
    (lessonId: string) => ready && completedLessons.includes(lessonId),
    [ready, completedLessons]
  );

  const completionPercentage = courseCompletionPercentage(completedLessons.length, totalLessons);

  const resetProgress = useCallback(() => {
    if (!ready) return;
    setProgress(emptyCourseProgress(courseId));
  }, [ready, courseId]);

  return {
    progress: ready ? progress : emptyCourseProgress(courseId),
    markCompleted,
    isCompleted,
    completionPercentage,
    totalCompleted: Math.min(Math.max(0, totalLessons), completedLessons.length),
    resetProgress,
  };
}
