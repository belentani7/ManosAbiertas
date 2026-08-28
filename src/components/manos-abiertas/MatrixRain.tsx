'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  zIndex?: number;
  opacity?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコ';

export default function MatrixRain({ zIndex = 1, opacity = 0.4 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let columns = Math.floor(canvas.width / 14);
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const updateColumns = () => {
      columns = Math.floor(canvas.width / 14);
      if (drops.length !== columns) {
        const newDrops = Array(Math.floor(columns)).fill(1);
        const minLen = Math.min(drops.length, newDrops.length);
        for (let i = 0; i < minLen; i++) newDrops[i] = drops[i];
        drops.length = 0;
        drops.push(...newDrops);
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 6, 11, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px "Space Mono", "JetBrains Mono", monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * 14;
        const yPos = drops[i] * 14;

        const intensity = Math.random();
        if (intensity > 0.95) {
          ctx.fillStyle = '#ff1a4a';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#ff1a4a';
        } else if (intensity > 0.7) {
          ctx.fillStyle = '#0aff9e';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#0aff9e';
        } else {
          ctx.fillStyle = 'rgba(255, 26, 74, 0.6)';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          i * 14,
          drops[i] * 14
        );
        ctx.shadowBlur = 0;

        if (yPos > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: zIndex,
        opacity: opacity,
      }}
      aria-hidden="true"
    />
  );
}