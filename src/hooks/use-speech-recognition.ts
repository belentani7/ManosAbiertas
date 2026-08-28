'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getSpeechLang } from '@/hooks/use-speech';

interface RecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: unknown) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: unknown) => void) | null;
  start: () => void;
  stop: () => void;
}

interface UseSpeechRecognitionReturn {
  supported: boolean;
  listening: boolean;
  start: () => void;
  stop: () => void;
  transcript: string;
  error: string | null;
}

type SRConstructor = new () => RecognitionLike;

function getConstructor(): SRConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function useSpeechRecognition(language: string): UseSpeechRecognitionReturn {
  const [supported] = useState<boolean>(() => getConstructor() !== null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<RecognitionLike | null>(null);

  useEffect(() => {
    if (!supported) return;
    const SR = getConstructor();
    if (!SR) return;
    const rec = new SR();
    rec.lang = getSpeechLang(language);
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onresult = (event: unknown) => {
      const e = event as { results?: ArrayLike<ArrayLike<{ transcript?: string }>> };
      let text = '';
      const results = e.results;
      if (results) {
        for (let i = 0; i < results.length; i++) {
          const alt = results[i]?.[0];
          if (alt?.transcript) text += alt.transcript;
        }
      }
      setTranscript(text);
    };
    rec.onerror = (event: unknown) => {
      const e = event as { error?: string };
      setError(e.error || 'error');
      setListening(false);
    };
    rec.onend = () => {
      setListening(false);
    };

    recRef.current = rec;
    return () => {
      try {
        rec.stop();
      } catch { /* ignore */ }
    };
  }, [supported, language]);

  const start = useCallback(() => {
    const rec = recRef.current;
    if (!rec || listening) return;
    setError(null);
    setTranscript('');
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  }, [listening]);

  const stop = useCallback(() => {
    const rec = recRef.current;
    if (!rec) return;
    try {
      rec.stop();
    } catch { /* ignore */ }
    setListening(false);
  }, []);

  return { supported, listening, start, stop, transcript, error };
}
