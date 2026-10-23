'use client';

import { useState, useCallback, useRef } from 'react';
import { waitForSpeechVoice } from '@/lib/speech-locale';
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
  const requestRef = useRef(0);

  const speak = useCallback((text: string, options?: UseSpeechOptions) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Stop any current speech and invalidate a request still waiting for voices.
    window.speechSynthesis.cancel();
    const requestId = ++requestRef.current;
    setError(null);

    // Strip markdown for cleaner speech
    const cleanText = text
      .replace(/[#*\`_~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const locale = options?.lang || 'es-ES';
    void waitForSpeechVoice(window.speechSynthesis, locale)
      .then((voice) => {
        if (requestId !== requestRef.current) return;
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
          if (requestId !== requestRef.current) return;
          setSpeaking(true);
          setPaused(false);
        };
        utterance.onend = () => {
          if (requestId !== requestRef.current) return;
          setSpeaking(false);
          setPaused(false);
        };
        utterance.onerror = () => {
          if (requestId !== requestRef.current) return;
          setError('No se pudo reproducir la voz seleccionada. Puedes seguir leyendo.');
          setSpeaking(false);
          setPaused(false);
        };

        if (requestId !== requestRef.current) return;
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      })
      .catch(() => {
        if (requestId !== requestRef.current) return;
        setError('No se pudo preparar la voz seleccionada. Puedes seguir leyendo.');
        setSpeaking(false);
        setPaused(false);
      });
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    requestRef.current += 1;
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
