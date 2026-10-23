'use client';

import { useState, useCallback, useRef } from 'react';
import { selectSpeechVoice } from '@/lib/speech-locale';
export { getSpeechLang, selectSpeechVoice } from '@/lib/speech-locale';

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
