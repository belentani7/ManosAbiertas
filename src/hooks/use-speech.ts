'use client';

import { useState, useCallback, useRef } from 'react';

interface UseSpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

interface UseSpeechReturn {
  speak: (text: string, options?: UseSpeechOptions) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  speaking: boolean;
  paused: boolean;
  supported: boolean;
}

/**
 * Hook for text-to-speech using the Web Speech API.
 * Falls back gracefully if not supported.
 */
export function useSpeech(): UseSpeechReturn {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  });
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, options?: UseSpeechOptions) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Strip markdown for cleaner speech
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = options?.lang || 'es-ES';
    utterance.rate = options?.rate || 0.9;
    utterance.pitch = options?.pitch || 1;

    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.resume();
    setPaused(false);
  }, []);

  return { speak, stop, pause, resume, speaking, paused, supported };
}

// Map app language codes to BCP-47 speech language codes
export function getSpeechLang(lang: string): string {
  const map: Record<string, string> = {
    es: 'es-ES',
    en: 'en-US',
    ca: 'ca-ES',
    'pt-BR': 'pt-BR',
    pt: 'pt-PT',
    fr: 'fr-FR',
    ar: 'ar-SA',
    zh: 'zh-CN',
    hi: 'hi-IN',
    ro: 'ro-RO',
    uk: 'uk-UA',
    ru: 'ru-RU',
    de: 'de-DE',
    it: 'it-IT',
    pl: 'pl-PL',
    tr: 'tr-TR',
    ur: 'ur-PK',
    fa: 'fa-IR',
    bn: 'bn-IN',
    pa: 'pa-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
    sw: 'sw-KE',
    am: 'am-ET',
    tl: 'fil-PH',
    vi: 'vi-VN',
    ja: 'ja-JP',
    ko: 'ko-KR',
  };
  return map[lang] || map[lang.split('-')[0]] || 'es-ES';
}
