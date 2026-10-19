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
  const [dirtyKey, setDirtyKey] = useState<string | null>(null);

  // Read first. The old implementation saved the empty initial state during
  // the same mount cycle, potentially overwriting a learner's saved lessons.
  useEffect(() => {
    const reload = () => {
      let stored: CourseProgressState | null = null;
      try {
        stored = parseCourseProgress(window.localStorage.getItem(storageKey), courseId);
      } catch {
        // Blocked storage: the current session can still operate in memory.
      }
      // Importing or erasing data must not trigger an automatic re-save.
      setDirtyKey(null);
      setProgress(stored ?? emptyCourseProgress(courseId));
      setLoadedKey(storageKey);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) reload();
    };
    reload();
    window.addEventListener("storage", onStorage);
    window.addEventListener("manos-abiertas-local-data-change", reload);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("manos-abiertas-local-data-change", reload);
    };
  }, [storageKey, courseId]);

  useEffect(() => {
    // Never save before hydration, or save the previous course under a new ID.
    if (loadedKey !== storageKey || progress.courseId !== courseId || dirtyKey !== storageKey) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // Private browsing, blocked storage and quota failure are non-fatal.
    }
  }, [storageKey, loadedKey, progress, courseId, dirtyKey]);

  const markCompleted = useCallback((lessonId: string) => {
    if (loadedKey !== storageKey || progress.courseId !== courseId || !lessonId || lessonId.length > 128) return;
    setDirtyKey(storageKey);
    setProgress((previous) => {
      if (previous.courseId !== courseId || previous.completedLessons.includes(lessonId)) return previous;
      return {
        ...previous,
        completedLessons: [...previous.completedLessons, lessonId],
        lastAccessed: new Date().toISOString(),
      };
    });
  }, [courseId, loadedKey, storageKey, progress.courseId]);

  const ready = loadedKey === storageKey && progress.courseId === courseId;
  const completedLessons = ready ? progress.completedLessons : [];

  const isCompleted = useCallback(
    (lessonId: string) => ready && completedLessons.includes(lessonId),
    [ready, completedLessons]
  );

  const completionPercentage = courseCompletionPercentage(completedLessons.length, totalLessons);

  const resetProgress = useCallback(() => {
    if (!ready) return;
    setDirtyKey(storageKey);
    setProgress(emptyCourseProgress(courseId));
  }, [ready, courseId, storageKey]);

  return {
    ready,
    progress: ready ? progress : emptyCourseProgress(courseId),
    markCompleted,
    isCompleted,
    completionPercentage,
    totalCompleted: Math.min(Math.max(0, totalLessons), completedLessons.length),
    resetProgress,
  };
}
