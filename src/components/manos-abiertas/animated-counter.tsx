'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  format = (n) => Math.round(n).toString(),
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => format(latest));
  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration, ease: 'easeOut' });
      const unsub = rounded.on('change', (v) => setDisplay(v));
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [isInView, value, duration, count, rounded]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
