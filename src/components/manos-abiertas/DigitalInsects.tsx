'use client';

import { useEffect, useRef } from 'react';

interface DigitalInsectsProps {
  zIndex?: number;
  opacity?: number;
}

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  tailPhase: number;
  tailSpeed: number;
  glowIntensity: number;
  glowPhase: number;
}

const PALETTE = [
  'rgba(59, 130, 246, 0.7)',   // blue
  'rgba(99, 102, 241, 0.6)',   // indigo
  'rgba(139, 92, 246, 0.5)',   // violet
  'rgba(14, 165, 233, 0.6)',   // sky
  'rgba(6, 182, 212, 0.5)',    // cyan
  'rgba(52, 211, 153, 0.4)',   // emerald
];

const FISH_COUNT = 18;

function createFish(w: number, h: number): Fish {
  const speed = 0.3 + Math.random() * 0.8;
  const dir = Math.random() > 0.5 ? 1 : -1;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: dir * speed,
    vy: (Math.random() - 0.5) * 0.4,
    size: 8 + Math.random() * 14,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    tailPhase: Math.random() * Math.PI * 2,
    tailSpeed: 3 + Math.random() * 3,
    glowIntensity: 0.4 + Math.random() * 0.6,
    glowPhase: Math.random() * Math.PI * 2,
  };
}

function drawFish(ctx: CanvasRenderingContext2D, fish: Fish, time: number) {
  const { x, y, size, color, tailPhase, tailSpeed, glowIntensity, glowPhase, vx } = fish;
  const dir = vx >= 0 ? 1 : -1;
  const tailSwing = Math.sin(time * tailSpeed + tailPhase) * size * 0.35;
  const glow = 6 + Math.sin(time * 1.5 + glowPhase) * 4 * glowIntensity;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(dir, 1);

  ctx.shadowBlur = glow;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.strokeStyle = color.replace(/[\d.]+\)$/, '0.9)');
  ctx.lineWidth = 1;

  // Body (ellipse)
  ctx.beginPath();
  ctx.ellipse(0, 0, size, size * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tail fin
  ctx.beginPath();
  ctx.moveTo(-size * 0.85, 0);
  ctx.quadraticCurveTo(-size * 1.1, tailSwing * 0.6, -size * 1.4, tailSwing);
  ctx.quadraticCurveTo(-size * 1.1, 0, -size * 1.4, -tailSwing * 0.7);
  ctx.closePath();
  ctx.fill();

  // Dorsal fin
  ctx.beginPath();
  ctx.moveTo(size * 0.1, -size * 0.35);
  ctx.quadraticCurveTo(-size * 0.1, -size * 0.7, -size * 0.4, -size * 0.35);
  ctx.fill();

  // Eye
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(size * 0.5, -size * 0.05, size * 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.beginPath();
  ctx.arc(size * 0.52, -size * 0.05, size * 0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function DigitalInsects({ zIndex = 3, opacity = 0.5 }: DigitalInsectsProps) {
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

    const fishes: Fish[] = Array.from({ length: FISH_COUNT }, () =>
      createFish(canvas.width, canvas.height)
    );

    const draw = (timestamp: number) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      const t = timestamp / 1000;

      ctx.clearRect(0, 0, w, h);

      for (const fish of fishes) {
        // Gentle sine-wave vertical drift
        fish.vy += (Math.random() - 0.5) * 0.02;
        fish.vy *= 0.98;
        fish.x += fish.vx;
        fish.y += fish.vy;

        // Wrap around edges
        if (fish.x > w + fish.size * 2) fish.x = -fish.size * 2;
        if (fish.x < -fish.size * 2) fish.x = w + fish.size * 2;
        if (fish.y < fish.size) fish.vy += 0.02;
        if (fish.y > h - fish.size) fish.vy -= 0.02;

        drawFish(ctx, fish, t);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
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
        zIndex,
        opacity,
      }}
      aria-hidden="true"
    />
  );
}
