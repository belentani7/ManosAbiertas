"use client";

import { useState, useEffect, useCallback } from "react";

interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  lastActivityDate: string;
  badges: string[];
  completedCourses: string[];
}

const STORAGE_KEY = "manosabiertas-gamification";
const XP_PER_LESSON = 25;
const XP_PER_COURSE = 100;
const LEVEL_XP_BASE = 100;

function calculateLevel(xp: number): number {
  let level = 1;
  let required = LEVEL_XP_BASE;
  let totalXp = xp;
  while (totalXp >= required) {
    totalXp -= required;
    level++;
    required = Math.floor(required * 1.5);
  }
  return level;
}

function calculateStreak(lastDate: string, currentDate: string): number {
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  const diffMs = current.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays <= 1 ? 1 : 0;
}

export function useGamification() {
  const [state, setState] = useState<GamificationState>({
    xp: 0,
    level: 1,
    streak: 0,
    lastActivityDate: "",
    badges: [],
    completedCourses: [],
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.level = calculateLevel(parsed.xp);
        setState(parsed);
      }
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full
    }
  }, [state]);

  const addXp = useCallback((amount: number) => {
    setState((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = calculateLevel(newXp);
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        lastActivityDate: new Date().toISOString(),
      };
    });
  }, []);

  const completeLesson = useCallback(() => {
    setState((prev) => {
      const newXp = prev.xp + XP_PER_LESSON;
      const newLevel = calculateLevel(newXp);
      const today = new Date().toISOString().split("T")[0];
      const lastDay = prev.lastActivityDate.split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

      let newStreak = prev.streak;
      if (lastDay === yesterday || lastDay === today) {
        if (lastDay !== today) newStreak += 1;
      } else if (lastDay !== today) {
        newStreak = 1;
      }

      const newBadges = [...prev.badges];
      if (newStreak === 7 && !newBadges.includes("streak-7")) {
        newBadges.push("streak-7");
      }
      if (newStreak === 30 && !newBadges.includes("streak-30")) {
        newBadges.push("streak-30");
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        lastActivityDate: new Date().toISOString(),
        badges: newBadges,
      };
    });
  }, []);

  const completeCourse = useCallback(
    (courseId: string) => {
      setState((prev) => {
        if (prev.completedCourses.includes(courseId)) return prev;
        const newXp = prev.xp + XP_PER_COURSE;
        const newLevel = calculateLevel(newXp);
        const newBadges = [...prev.badges];
        if (!newBadges.includes("first-course")) {
          newBadges.push("first-course");
        }
        if (prev.completedCourses.length + 1 >= 5 && !newBadges.includes("five-courses")) {
          newBadges.push("five-courses");
        }
        return {
          ...prev,
          xp: newXp,
          level: newLevel,
          completedCourses: [...prev.completedCourses, courseId],
          badges: newBadges,
          lastActivityDate: new Date().toISOString(),
        };
      });
    },
    []
  );

  const resetGamification = useCallback(() => {
    setState({
      xp: 0,
      level: 1,
      streak: 0,
      lastActivityDate: "",
      badges: [],
      completedCourses: [],
    });
  }, []);

  return {
    ...state,
    addXp,
    completeLesson,
    completeCourse,
    resetGamification,
    xpForNextLevel: LEVEL_XP_BASE * Math.pow(1.5, state.level - 1),
    currentLevelXp: state.xp,
  };
}
