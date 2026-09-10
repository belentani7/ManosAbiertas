'use client';

import { useEffect, useRef } from 'react';

interface WaterRainProps {
  zIndex?: number;
  opacity?: number;
}

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

const DROP_COUNT = 800;

export default function WaterRain({ zIndex = 2, opacity = 0.7 }: WaterRainProps) {
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

    const drops: Drop[] = [];

    for (let i = 0; i < 800; i++) {
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 8 + 6,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        ctx.strokeStyle = `rgba(200, 230, 255, ${drop.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(draw);

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