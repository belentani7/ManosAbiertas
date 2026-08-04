'use client';

import { useState, useCallback } from 'react';

const RECENT_KEY = 'manos-abiertas-recent';
const MAX_RECENT = 8;

export interface RecentItem {
  id: string;
  type: 'resource' | 'lesson' | 'article' | 'event';
  title: string;
  subtitle?: string;
  section: string;
  emoji: string;
  url?: string;
  timestamp: number;
}

function loadRecent(): RecentItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function saveRecent(items: RecentItem[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(items));
  } catch { /* ignore */ }
}

export function useRecentItems() {
  const [recent, setRecent] = useState<RecentItem[]>(loadRecent);

  const addRecent = useCallback((item: Omit<RecentItem, 'timestamp'>) => {
    setRecent((prev) => {
      // Remove if already exists (avoid duplicates)
      const filtered = prev.filter((r) => !(r.type === item.type && r.id === item.id));
      // Add to beginning
      const newItem: RecentItem = { ...item, timestamp: Date.now() };
      const next = [newItem, ...filtered].slice(0, MAX_RECENT);
      saveRecent(next);
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    saveRecent([]);
  }, []);

  return { recent, addRecent, clearRecent };
}
