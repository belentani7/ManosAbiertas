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

  const [isOpen, setIsOpen] = useState(false);
  const [chatLog, setChatLog] = useState<{role: 'user' | 'agent', text: string}[]>([{
    role: 'agent', text: 'Soy el Agente IA Potente de Manos Abiertas. ¿En qué puedo ayudarte hoy?'
  }]);
  const [inputValue, setInputValue] = useState('');

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
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = 60;
      const centerY = 60;
      const radius = 50;

      // Anillo exterior pulsante
      const pulse = Math.sin(Date.now() / 500) * 5;
      ctx.strokeStyle = '#3b82f6'; // Azul más tecnológico
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#3b82f6';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Anillo interior
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 10, 0, Math.PI * 2);
      ctx.stroke();

      // Núcleo
      const gradient = ctx.createRadialGradient(60, 60, 0, 60, 60, 30);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#020617');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(60, 60, 30, 0, Math.PI * 2);
      ctx.fill();

      // Ojo que sigue al cursor
      const dx = mousePos.x - position.x - 60;
      const dy = mousePos.y - position.y - 60;
      const angle = Math.atan2(dy, dx);
      
      const pupilX = 60 + Math.cos(angle) * Math.min(8, Math.sqrt(dx * dx + dy * dy) / 50);
      const pupilY = 60 + Math.sin(angle) * Math.min(8, Math.sqrt(dx * dx + dy * dy) / 50);

      // Iris azul
      ctx.fillStyle = '#3b82f6';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#3b82f6';
      ctx.beginPath();
      ctx.arc(60, 60, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Pupila
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(pupilX, pupilY, 6, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, [mousePos, position]);

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
    const handleMouseUp = () => setIsDragging(false);

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

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    setIsOpen(!isOpen);
    setPhrase("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newLog = [...chatLog, { role: 'user' as const, text: inputValue }];
    setChatLog(newLog);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      setChatLog([...newLog, { 
        role: 'agent', 
        text: 'Soy un agente integrado en tu plataforma. Todavía estoy en entrenamiento, pero pronto podré guiarte por tus cursos de Office, trámites y herramientas HTML.' 
      }]);
    }, 1000);
  };

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
        onClick={handleCanvasClick}
        tabIndex={0}
        role="button"
        aria-label="Agente IA Potente"
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: 120,
          height: 120,
          cursor: isDragging ? 'grabbing' : 'pointer',
          zIndex: zIndex + 1,
        }}
      />
      
      {isOpen && (
        <div style={{
          position: 'fixed',
          left: position.x - 300,
          top: position.y - 320,
          width: 350,
          height: 400,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(59, 130, 246, 0.5)',
          borderRadius: '16px',
          zIndex: zIndex,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.2s ease',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
            <span>Agente IA Potente</span>
            <button onClick={() => setIsOpen(false)} style={{ color: '#aaa', cursor: 'pointer', background: 'transparent', border: 'none' }}>✕</button>
          </div>
          
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatLog.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? '#3b82f6' : '#334155',
                color: '#fff',
                padding: '10px 14px',
                borderRadius: '12px',
                maxWidth: '85%',
                fontSize: '0.9rem'
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pregúntame algo..." 
              style={{ flex: 1, background: '#1e293b', border: '1px solid #475569', borderRadius: '8px', padding: '8px 12px', color: '#fff', outline: 'none' }}
            />
            <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold' }}>
              Enviar
            </button>
          </form>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}