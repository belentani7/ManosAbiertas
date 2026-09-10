'use client';

import { useEffect, useRef } from 'react';

interface SpaceShipTrailProps {
  zIndex?: number;
  opacity?: number;
}

interface Trail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const TRAIL_COLORS = ['#ba55d3', '#ff1a4a', '#00f3ff', '#0aff9e'];
const MAX_TRAILS = 20;

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function SpaceShipTrail({ zIndex = 0, opacity = 0.6 }: SpaceShipTrailProps) {
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

    const trails: Trail[] = [];

    const createTrail = (): Trail => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 2;
      const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 100 + 50,
        color,
      };
    };

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'rgba(3, 6, 11, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.02 && trails.length < 20) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
        
        trails.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.random() * 100 + 50,
          color,
        });
      }

      for (let i = trails.length - 1; i >= 0; i--) {
        const trail = trails[i];
        const alpha = 1 - trail.life / trail.maxLife;

        const gradient = ctx.createLinearGradient(
          trail.x,
          trail.y,
          trail.x - trail.vx * 20,
          trail.y - trail.vy * 20
        );
        gradient.addColorStop(0, hexToRgba(trail.color, alpha));
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = trail.color;
        ctx.beginPath();
        ctx.moveTo(trail.x, trail.y);
        ctx.lineTo(trail.x - trail.vx * 20, trail.y - trail.vy * 20);
        ctx.stroke();
        ctx.shadowBlur = 0;

        trail.x += trail.vx;
        trail.y += trail.vy;
        trail.life++;

        if (trail.life >= trail.maxLife) {
          trails.splice(i, 1);
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