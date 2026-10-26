'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Volume2, Square, Pause, Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/app-store';
import { useSpeech, getSpeechLang } from '@/hooks/use-speech';
import { getSpeechPlaybackAction } from '@/lib/speech-locale';
import { cn } from '@/lib/utils';

// Deterministic visualizer bars avoid hydration mismatch and layout jitter.
const WAVE_HEIGHTS = [5, 10, 7, 14, 9, 12, 6, 15, 8, 11, 5, 13, 7, 10, 14, 6, 12, 9, 15, 8] as const;

interface TTSButtonProps {
  text: string;
  label?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  className?: string;
}

export function TTSButton({
  text,
  label = 'Escuchar',
  size = 'sm',
  variant = 'outline',
  className,
}: TTSButtonProps) {
  const { language } = useAppStore();
  const { speak, stop, pause, resume, speaking, paused, supported, error } = useSpeech();
  const [loading, setLoading] = useState(false);

  if (!supported) return null;

  function handleClick() {
    if (speaking) {
      if (paused) {
        resume();
      } else {
        pause();
      }
    } else {
      setLoading(true);
      // Small delay to show loading state
      setTimeout(() => {
        speak(text, { lang: getSpeechLang(language), rate: 0.9 });
        setLoading(false);
      }, 200);
    }
  }

  return (
    <>
    <Button
      onClick={handleClick}
      size={size}
      variant={speaking ? 'default' : variant}
      className={cn('gap-1.5', speaking && 'gradient-brand text-white', className)}
      aria-label={speaking ? (paused ? 'Reanudar lectura' : 'Pausar lectura') : 'Escuchar en voz alta'}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : speaking ? (
        paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
      <span className="hidden sm:inline">
        {speaking ? (paused ? 'Reanudar' : 'Pausar') : label}
      </span>
      {speaking && !paused && (
        <span className="flex items-end gap-0.5 ml-1">
          <span className="w-0.5 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
          <span className="w-0.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
        </span>
      )}
    </Button>
    {error && <span role="alert" className="text-xs text-destructive max-w-xs">{error}</span>}
    </>
  );
}

/**
 * Full TTS player with stop button - for longer content like lessons
 */
export function TTSPlayer({ text, title }: { text: string; title?: string }) {
  const { language } = useAppStore();
  const { speak, stop, pause, speaking, paused, resume, supported, error } = useSpeech();
  const reduceMotion = useReducedMotion();

  if (!supported) return null;

  function handlePlay() {
    const action = getSpeechPlaybackAction(speaking, paused);
    if (action === 'pause') pause();
    else if (action === 'resume') resume();
    else speak(text, { lang: getSpeechLang(language), rate: 0.9 });
  }

  return (
    <>
    {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
    <AnimatePresence>
      {speaking && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={reduceMotion ? { duration: 0 } : undefined}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-20 sm:w-80 z-40 bg-card border border-border rounded-xl shadow-2xl p-3 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center flex-shrink-0">
            <Volume2 className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">
              {title || 'Reproduciendo contenido...'}
            </div>
            <div className="flex items-center gap-0.5 mt-1" aria-hidden="true">
              {WAVE_HEIGHTS.map((height, i) => (
                <span
                  key={i}
                  className={cn('w-0.5 bg-primary rounded-full', !reduceMotion && 'animate-pulse')}
                  style={{
                    height: `${height}px`,
                    animationDelay: reduceMotion ? undefined : `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <Button
              size="icon"
              variant="ghost"
              onClick={handlePlay}
              className="h-11 w-11"
              aria-label={paused ? 'Reanudar' : 'Pausar'}
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={stop}
              className="h-11 w-11 text-destructive hover:text-destructive"
              aria-label="Detener"
            >
              <Square className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
