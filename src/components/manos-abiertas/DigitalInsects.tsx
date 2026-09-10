'use client';

import { useEffect, useRef } from 'react';

interface DigitalInsectsProps {
  zIndex?: number;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const COLORS = ['#ff1a4a', '#0aff9e', '#00f3ff'];
const PARTICLE_COUNT = 150;

export default function DigitalInsects({ zIndex = 3, opacity = 0.8 }: DigitalInsectsProps) {
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

    const particles: Particle[] = [];

    const createParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 3 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 3 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'rgba(3, 6, 11, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;

        if (Math.random() < 0.02) {
          p.vx = (Math.random() - 0.5) * 4;
          p.vy = (Math.random() - 0.5) * 4;
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (
          p.x < -50 ||
          p.x > canvas.width + 50 ||
          p.y < -50 ||
          p.y > canvas.height + 50
        ) {
          particles[i] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 3 + 1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          };
        }
      }

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