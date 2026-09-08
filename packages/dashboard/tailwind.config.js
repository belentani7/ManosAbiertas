/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#030002',
        'void-deep': '#000000',
        'neon-red': '#ff073a',
        'neon-red-bright': '#FF003C',
        'blood-red': '#8B0000',
        'dark-red': '#3a0000',
        'terminal-green': '#00ff41',
        'text-main': '#E5E7EB',
        'text-dim': '#9CA3AF',
        'text-muted': '#6B7280',
        glass: 'rgba(8, 2, 4, 0.75)',
        'glass-border': 'rgba(255, 7, 58, 0.15)',
        sapphire: '#0F52BA',
        gold: '#FFD700',
        ruby: '#9B111E',
        crystal: '#E0FFFF',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 2s infinite',
        'glitch': 'glitchShift 8s infinite',
        'orb-pulse': 'orbPulse 10s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'type-in': 'typeIn 0.3s ease forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        glitchShift: {
          '0%, 92%, 100%': { transform: 'none' },
          '93%': { transform: 'translate(-2px, 1px) skewX(0.5deg)' },
          '94%': { transform: 'translate(2px, -1px)' },
          '95%': { transform: 'translate(-1px, 2px) skewX(-0.5deg)' },
          '96%': { transform: 'none' },
        },
        orbPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.3)', opacity: '0.5' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        typeIn: {
          to: { opacity: '1' },
        },
      },
      clipPath: {
        'neo': 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        'neo-sm': 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
        'gem': 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,7,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,7,58,0.03) 1px, transparent 1px)',
        'scanlines': 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.15) 50%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
        'scanlines': '100% 3px',
      },
    },
  },
  plugins: [],
};