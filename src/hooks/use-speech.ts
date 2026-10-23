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
  error: string | null;
}

/**
 * Hook for text-to-speech using the Web Speech API.
 * Falls back gracefully if not supported.
 */
export function useSpeech(): UseSpeechReturn {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supported] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  });
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, options?: UseSpeechOptions) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Stop any current speech
    window.speechSynthesis.cancel();
    setError(null);

    // Strip markdown for cleaner speech
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const locale = options?.lang || 'es-ES';
    const voice = selectSpeechVoice(window.speechSynthesis.getVoices(), locale);
    if (!voice) {
      setError('No hay una voz de ' + locale + ' disponible. Instálala en el dispositivo; no usaremos otra lengua o región.');
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = locale;
    utterance.voice = voice;
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
      setError('No se pudo reproducir la voz seleccionada. Puedes seguir leyendo.');
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

  return { speak, stop, pause, resume, speaking, paused, supported, error };
}

/** Locale fidelity is mandatory. A browser "natural" voice in another
 * language/region must never outrank the intended lesson locale.
 */
export function selectSpeechVoice(
  voices: ReadonlyArray<SpeechSynthesisVoice>,
  locale: string,
): SpeechSynthesisVoice | undefined {
  if (!locale || locale === 'und') return undefined;
  const requested = locale.replace(/_/g, '-').toLowerCase();
  const matching = voices.filter(
    (voice) => voice.lang.replace(/_/g, '-').toLowerCase() === requested,
  );
  return matching.find((voice) => /natural|premium|neural|enhanced/i.test(voice.name))
    || matching[0];
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
    bg: 'bg-BG',
    nl: 'nl-NL',
    sv: 'sv-SE',
    da: 'da-DK',
    fi: 'fi-FI',
    no: 'nb-NO',
    el: 'el-GR',
    qu: 'qu-PE',
    ber: 'zgh-MA',
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
  // Unknown language codes must not be pronounced as Spanish by default.
  // 'und' is intentionally unvoiced until a real regional voice is configured.
  return map[lang] || 'und';
}
