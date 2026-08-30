"use client";

import { useState, useEffect, useCallback } from "react";

interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  lastAccessed: string;
  startedAt: string;
}

export function useCourseProgress(courseId: string, totalLessons: number) {
  const [progress, setProgress] = useState<CourseProgress>({
    courseId,
    completedLessons: [],
    lastAccessed: new Date().toISOString(),
    startedAt: new Date().toISOString(),
  });

  const storageKey = `course-progress-${courseId}`;

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, [storageKey]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // Storage full
    }
  }, [storageKey, progress]);

  const markCompleted = useCallback((lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: Array.from(new Set([...prev.completedLessons, lessonId])),
      lastAccessed: new Date().toISOString(),
    }));
  }, []);

  const isCompleted = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  );

  const completionPercentage = Math.round(
    (progress.completedLessons.length / totalLessons) * 100
  );

  const resetProgress = useCallback(() => {
    setProgress({
      courseId,
      completedLessons: [],
      lastAccessed: new Date().toISOString(),
      startedAt: new Date().toISOString(),
    });
  }, [courseId]);

  return {
    progress,
    markCompleted,
    isCompleted,
    completionPercentage,
    totalCompleted: progress.completedLessons.length,
    resetProgress,
  };
}
