'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface FloatingAgentProps {
  zIndex?: number;
}

const PHRASES = [
  '🫢 Pedro anoche quemó el pan...',
  '🤫 Creo que Pedro habla solo frente al espejo...',
  '😈 El artefacto late más fuerte esta noche...',
  '👁️ Vigilo. Siempre vigilo.',
  '⚡ Energía: estable. Por ahora.',
  '🤖 Detectando patrones en el caos...',
  '🔮 El futuro se escribe en rojo.',
  '🌙 La noche susurra códigos.',
  '⚔️ El guerrero y el ángel danzan.',
  '🔑 La llave gira en la cerradura.',
];

export default function FloatingAgent({ zIndex = 9999 }: FloatingAgentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastIdxRef = useRef(0);

  const [position, setPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth - 150 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight - 150 : 0,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [phrase, setPhrase] = useState('');

  // Initialize lastIdxRef from localStorage on mount
  useEffect(() => {
    try {
      lastIdxRef.current = parseInt(localStorage.getItem('belentani_agent_idx') || '0', 10);
    } catch {
      lastIdxRef.current = 0;
    }
  }, []);

  const getRandomPhrase = useCallback(() => {
    let idx = Math.floor(Math.random() * PHRASES.length);
    if (idx === lastIdxRef.current) idx = (idx + 1) % PHRASES.length;
    lastIdxRef.current = idx;
    localStorage.setItem('belentani_agent_idx', idx.toString());
    return PHRASES[idx];
  }, []);

  const showPhrase = useCallback(() => {
    setPhrase('🤖 AI Gent: ' + getRandomPhrase());
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => setPhrase(''), 6000);
  }, [getRandomPhrase]);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    canvas.width = 120;
    canvas.height = 120;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = 60;
      const centerY = 60;
      const radius = 50;

      // Anillo exterior pulsante
      const pulse = Math.sin(Date.now() / 500) * 5;
      ctx.strokeStyle = '#ff1a4a';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ff1a4a';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Anillo interior
      ctx.strokeStyle = 'rgba(255, 26, 74, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 10, 0, Math.PI * 2);
      ctx.stroke();

      // Núcleo oscuro
      const gradient = ctx.createRadialGradient(60, 60, 0, 60, 60, 30);
      gradient.addColorStop(0, '#1a0008');
      gradient.addColorStop(1, '#0a0003');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(60, 60, 30, 0, Math.PI * 2);
      ctx.fill();

      // Ojo que sigue al cursor
      const eyeX = 60;
      const eyeY = 60;

      const dx = mousePos.x - position.x - 60;
      const dy = mousePos.y - position.y - 60;
      const angle = Math.atan2(dy, dx);
      const pupilOffset = Math.min(8, Math.sqrt(dx * dx + dy * dy) / 50);

      const pupilX = eyeX + Math.cos(angle) * Math.min(8, Math.sqrt(dx * dx + dy * dy) / 50);
      const pupilY = eyeY + Math.sin(angle) * Math.min(8, Math.sqrt(dx * dx + dy * dy) / 50);

      // Iris rojo
      ctx.fillStyle = '#ff1a4a';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff1a4a';
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Pupila
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(pupilX, pupilY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Brillo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(pupilX - 3, pupilY - 3, 3, 0, Math.PI * 2);
      ctx.fill();

      // Líneas de escaneo rotantes
      const scanAngle = Date.now() / 1000;
      for (let i = 0; i < 3; i++) {
        const lineAngle = scanAngle + (i * Math.PI * 2) / 3;
        const lineX1 = 60 + Math.cos(lineAngle) * 20;
        const lineY1 = 60 + Math.sin(lineAngle) * 20;
        const lineX2 = 60 + Math.cos(lineAngle) * 35;
        const lineY2 = 60 + Math.sin(lineAngle) * 35;

        ctx.strokeStyle = 'rgba(255, 26, 74, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lineX1, lineY1);
        ctx.lineTo(lineX2, lineY2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, [mousePos, position]);

  // Mouse tracking & drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showPhrase();
    } else if (e.key === 'Escape') {
      setPhrase('');
    }
  }, [showPhrase]);

  // Auto-speak
  useEffect(() => {
    const interval = setInterval(() => {
      if (!phrase) showPhrase();
    }, 38000);
    return () => clearInterval(interval);
  }, [phrase, showPhrase]);

  // Initial phrase
  useEffect(() => {
    showPhrase();
  }, [showPhrase]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Agente Belentani - Click para frase, arrastra para mover, Enter para hablar"
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: 120,
          height: 120,
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: zIndex,
        }}
      />
      {phrase && (
        <div
          id="agent-bubble"
          style={{
            position: 'fixed',
            bottom: 150,
            right: 30,
            maxWidth: 280,
            padding: '12px 16px',
            background: 'rgba(8, 5, 10, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 26, 74, 0.6)',
            borderRadius: '16px',
            color: '#fff',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.85rem',
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(255, 26, 74, 0.3)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {phrase}
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}