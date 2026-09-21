'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface FloatingAgentProps {
  zIndex?: number;
}

const GREETINGS = [
  '👁️ Escaneando la red... todo en orden.',
  '🔐 Firewall activo. Datos protegidos.',
  '⚡ Sistemas operativos: 100%.',
  '🛡️ Vigilando amenazas digitales 24/7.',
  '🤖 IA cibernética lista para asistirte.',
  '🌐 Conexión segura establecida.',
  '📡 Monitorizando el ecosistema...',
  '🔮 Analizando patrones de navegación.',
];

const AGENT_RESPONSES: Record<string, string> = {
  hola: '¡Hola! Soy el Agente Cibernético de Manos Abiertas. Puedo ayudarte a navegar la plataforma, resolver dudas sobre trámites o explicarte cómo usar las herramientas de IA.',
  ayuda: 'Puedo orientarte en: 🤖 Cursos de IA, 📝 Crear tu CV, ⚖️ Derechos en España, 📚 Recursos oficiales. ¿Qué necesitas?',
  cv: 'Para crear tu CV, ve a la sección "Crea tu CV". Rellena el formulario, elige una plantilla y expórtalo en PDF. ¡La IA te ayuda a mejorar el resumen!',
  nie: 'El NIE es tu número de identidad de extranjero. Se solicita en la Oficina de Extranjería con cita previa. Necesitas: pasaporte, formulario EX-15 y la tasa 790-012.',
  trabajo: 'Consulta InfoJobs, Indeed o LinkedIn. También el SEPE (sepe.es) tiene ofertas públicas y cursos gratuitos con certificado.',
  derechos: 'En España tienes derecho a sanidad (empadrónate), educación, justicia gratuita y el salario mínimo. Ve a la sección Derechos para más info.',
  ia: 'Tenemos cursos de ChatGPT, Gemini, DeepSeek, Copilot, Claude, Qwen y Perplexity. Todos gratuitos y explicados paso a paso.',
};

function findResponse(input: string): string {
  const lower = input.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  for (const [key, val] of Object.entries(AGENT_RESPONSES)) {
    if (lower.includes(key)) return val;
  }
  return 'Entiendo tu pregunta. Te recomiendo explorar las secciones de la plataforma o usar el Asistente IA (botón naranja abajo a la derecha) para una respuesta más completa.';
}

export default function FloatingAgent({ zIndex = 9999 }: FloatingAgentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth - 140 : 0,
    y: typeof window !== 'undefined' ? 80 : 0,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [phrase, setPhrase] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'agent'; text: string }[]>([
    { role: 'agent', text: '🛡️ Agente Cibernético activo. ¿En qué puedo ayudarte?' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const showPhrase = useCallback(() => {
    const idx = Math.floor(Math.random() * GREETINGS.length);
    setPhrase(GREETINGS[idx]);
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => setPhrase(''), 5000);
  }, []);

  // Periodic phrase
  useEffect(() => {
    const interval = setInterval(showPhrase, 25000);
    const initial = setTimeout(showPhrase, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, [showPhrase]);

  // Draw the cybernetic eye
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const SIZE = 80;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    const draw = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      const now = Date.now() / 1000;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // Outer ring with rotation
      const segments = 8;
      for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2 + now * 0.5;
        const gap = 0.08;
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(139, 92, 246, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.beginPath();
        ctx.arc(cx, cy, 34, a + gap, a + Math.PI * 2 / segments - gap);
        ctx.stroke();
      }

      // Inner ring (counter-rotate)
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(14, 165, 233, 0.6)';
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.5)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - now * 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, 24, a + 0.1, a + Math.PI / 3 - 0.1);
        ctx.stroke();
      }

      // Core gradient
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      grad.addColorStop(1, 'rgba(30, 41, 59, 0.9)');
      ctx.shadowBlur = 0;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      // Iris
      const pulse = 0.8 + Math.sin(now * 2) * 0.2;
      const irisGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14);
      irisGrad.addColorStop(0, `rgba(59, 130, 246, ${pulse})`);
      irisGrad.addColorStop(0.6, 'rgba(99, 102, 241, 0.4)');
      irisGrad.addColorStop(1, 'rgba(139, 92, 246, 0.1)');
      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();

      // Pupil tracking cursor
      const dx = mousePos.x - position.x - cx;
      const dy = mousePos.y - position.y - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(5, Math.sqrt(dx * dx + dy * dy) / 80);
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();

      // Scan line
      ctx.shadowBlur = 0;
      const scanY = cy + Math.sin(now * 3) * 14;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 14, scanY);
      ctx.lineTo(cx + 14, scanY);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePos, position]);

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (isDragging) {
        setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
      }
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    },
    [position]
  );

  const handleClick = () => {
    if (isDragging) return;
    setIsOpen((v) => !v);
    setPhrase('');
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newLog = [...chatLog, { role: 'user' as const, text: inputValue }];
    setChatLog(newLog);
    const reply = findResponse(inputValue);
    setInputValue('');
    setTimeout(() => {
      setChatLog((prev) => [...prev, { role: 'agent', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Speech bubble */}
      {phrase && !isOpen && (
        <div
          style={{
            position: 'fixed',
            left: position.x - 180,
            top: position.y + 85,
            maxWidth: 240,
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 12,
            padding: '10px 14px',
            color: '#e2e8f0',
            fontSize: '0.8rem',
            lineHeight: 1.4,
            zIndex,
            animation: 'agentFadeIn 0.3s ease',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {phrase}
        </div>
      )}

      {/* Canvas eye */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        tabIndex={0}
        role="button"
        aria-label="Agente Cibernético"
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: 80,
          height: 80,
          cursor: isDragging ? 'grabbing' : 'pointer',
          zIndex: zIndex + 1,
          filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))',
        }}
      />

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            left: Math.min(position.x - 260, window.innerWidth - 380),
            top: position.y + 90,
            width: 340,
            maxHeight: 420,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 16,
            zIndex,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(59,130,246,0.1)',
            animation: 'agentFadeIn 0.2s ease',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(30, 41, 59, 0.5)',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
              }}
            />
            <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', flex: 1 }}>
              Agente Cibernético
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: '#94a3b8',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                fontSize: '1rem',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: 12,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              maxHeight: 280,
            }}
          >
            {chatLog.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background:
                    msg.role === 'user'
                      ? 'rgba(59, 130, 246, 0.8)'
                      : 'rgba(51, 65, 85, 0.8)',
                  color: '#f1f5f9',
                  padding: '8px 12px',
                  borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  maxWidth: '85%',
                  fontSize: '0.85rem',
                  lineHeight: 1.45,
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            style={{
              padding: 12,
              borderTop: '1px solid rgba(59, 130, 246, 0.15)',
              display: 'flex',
              gap: 8,
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1,
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(71, 85, 105, 0.5)',
                borderRadius: 8,
                padding: '8px 12px',
                color: '#f1f5f9',
                outline: 'none',
                fontSize: '0.85rem',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'rgba(59, 130, 246, 0.8)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 14px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes agentFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
