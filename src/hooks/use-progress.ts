'use client';

import { useState, useEffect } from 'react';
import { AI_COURSES } from '@/data/ai-courses';
import { OFFICE_MODULES } from '@/data/office-course';

export interface ProgressStats {
  aiCompleted: number;
  aiTotal: number;
  officeCompleted: number;
  officeTotal: number;
  aiPercent: number;
  officePercent: number;
  totalPercent: number;
  coursesStarted: number;
  coursesCompleted: number;
  modulesStarted: number;
  modulesCompleted: number;
  hasCV: boolean;
}

const EMPTY: ProgressStats = {
  aiCompleted: 0,
  aiTotal: 0,
  officeCompleted: 0,
  officeTotal: 0,
  aiPercent: 0,
  officePercent: 0,
  totalPercent: 0,
  coursesStarted: 0,
  coursesCompleted: 0,
  modulesStarted: 0,
  modulesCompleted: 0,
  hasCV: false,
};

export function useProgress() {
  const [stats, setStats] = useState<ProgressStats>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function compute() {
      try {
        const aiStored = localStorage.getItem('manos-abiertas-ai-progress');
        const officeStored = localStorage.getItem('manos-abiertas-office-progress');
        const cvStored = localStorage.getItem('manos-abiertas-cv');

        const aiCompletedSet: Set<string> = aiStored ? new Set(JSON.parse(aiStored)) : new Set();
        const officeCompletedSet: Set<string> = officeStored ? new Set(JSON.parse(officeStored)) : new Set();

        const aiTotal = AI_COURSES.reduce((acc, c) => acc + c.lessons.length, 0);
        const officeTotal = OFFICE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);

        let aiCompleted = 0;
        let coursesStarted = 0;
        let coursesCompleted = 0;

        AI_COURSES.forEach((course) => {
          const done = course.lessons.filter((l) => aiCompletedSet.has(`${course.id}-${l.id}`)).length;
          aiCompleted += done;
          if (done > 0) coursesStarted++;
          if (done === course.lessons.length) coursesCompleted++;
        });

        let officeCompleted = 0;
        let modulesStarted = 0;
        let modulesCompleted = 0;

        OFFICE_MODULES.forEach((module) => {
          const done = module.lessons.filter((l) => officeCompletedSet.has(l.id)).length;
          officeCompleted += done;
          if (done > 0) modulesStarted++;
          if (done === module.lessons.length) modulesCompleted++;
        });

        const aiPercent = aiTotal > 0 ? Math.round((aiCompleted / aiTotal) * 100) : 0;
        const officePercent = officeTotal > 0 ? Math.round((officeCompleted / officeTotal) * 100) : 0;
        const totalPercent = aiTotal + officeTotal > 0 ? Math.round(((aiCompleted + officeCompleted) / (aiTotal + officeTotal)) * 100) : 0;

        let hasCV = false;
        if (cvStored) {
          try {
            const cv = JSON.parse(cvStored);
            hasCV = Boolean(cv.fullName || cv.profession || cv.summary);
          } catch { /* ignore */ }
        }

        setStats({
          aiCompleted,
          aiTotal,
          officeCompleted,
          officeTotal,
          aiPercent,
          officePercent,
          totalPercent,
          coursesStarted,
          coursesCompleted,
          modulesStarted,
          modulesCompleted,
          hasCV,
        });
        setReady(true);
      } catch {
        setStats(EMPTY);
        setReady(true);
      }
    }

    compute();

    // Re-compute when localStorage changes (cross-tab) or every 2s (same tab)
    window.addEventListener('storage', compute);
    const interval = setInterval(compute, 2000);

    return () => {
      window.removeEventListener('storage', compute);
      clearInterval(interval);
    };
  }, []);

  return { stats, ready };
}
