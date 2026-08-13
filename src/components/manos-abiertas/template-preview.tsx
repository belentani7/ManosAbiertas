'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CVTemplate } from '@/data/cv-templates';

interface TemplatePreviewProps {
  template: CVTemplate;
  selected: boolean;
  onSelect: () => void;
}

/**
 * Renders a mini visual preview of a CV template layout using SVG.
 * Shows the actual structure (header, columns, sections) so users can
 * see the difference between templates at a glance.
 */
export function TemplatePreview({ template, selected, onSelect }: TemplatePreviewProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className={cn(
        'relative p-2 rounded-lg border-2 text-left transition-all overflow-hidden',
        selected ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/40'
      )}
    >
      {/* Selected checkmark */}
      {selected && (
        <div className="absolute top-1.5 right-1.5 z-10 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* SVG mini-layout preview */}
      <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-border/60 mb-1.5 relative">
        <TemplateLayoutSVG template={template} />
      </div>

      {/* Template name */}
      <div className="text-xs font-medium truncate">{template.name}</div>
      <div className="text-[10px] text-muted-foreground truncate">{template.description.split('.')[0]}.</div>
    </motion.button>
  );
}

function TemplateLayoutSVG({ template }: { template: CVTemplate }) {
  const colors = getTemplateColors(template.id);

  switch (template.layout) {
    case 'classic':
      return <ClassicLayout colors={colors} />;
    case 'modern':
      return <ModernLayout colors={colors} />;
    case 'minimal':
      return <MinimalLayout colors={colors} />;
    case 'creative':
      return <CreativeLayout colors={colors} />;
    case 'professional':
      return <ProfessionalLayout colors={colors} />;
    default:
      return <ClassicLayout colors={colors} />;
  }
}

interface TemplateColors {
  primary: string;
  accent: string;
  text: string;
  light: string;
  border: string;
}

function getTemplateColors(id: string): TemplateColors {
  switch (id) {
    case 'classic-europass':
      return { primary: '#1e40af', accent: '#3b82f6', text: '#1e293b', light: '#dbeafe', border: '#cbd5e1' };
    case 'modern-clean':
      return { primary: '#059669', accent: '#14b8a6', text: '#1e293b', light: '#d1fae5', border: '#cbd5e1' };
    case 'minimal-elegant':
      return { primary: '#334155', accent: '#64748b', text: '#1e293b', light: '#f1f5f9', border: '#e2e8f0' };
    case 'creative-vibrant':
      return { primary: '#ec4899', accent: '#f97316', text: '#1e293b', light: '#fce7f3', border: '#fbcfe8' };
    case 'professional-execute':
      return { primary: '#4338ca', accent: '#7c3aed', text: '#1e293b', light: '#e0e7ff', border: '#c7d2fe' };
    // New templates
    case 'sidebar-photo':
      return { primary: '#0f766e', accent: '#0d9488', text: '#1e293b', light: '#ccfbf1', border: '#99f6e4' };
    case 'two-column-tech':
      return { primary: '#7c2d12', accent: '#c2410c', text: '#1e293b', light: '#fed7aa', border: '#fdba74' };
    default:
      return { primary: '#c2410c', accent: '#f97316', text: '#1e293b', light: '#fed7aa', border: '#fdba74' };
  }
}

// Classic: centered header, single column, traditional
function ClassicLayout({ colors }: { colors: TemplateColors }) {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Header */}
      <rect x="0" y="0" width="120" height="28" fill={colors.light} />
      <text x="60" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill={colors.primary}>Nombre Apellido</text>
      <text x="60" y="22" textAnchor="middle" fontSize="5" fill={colors.text}>Profesión</text>
      <line x1="40" y1="26" x2="80" y2="26" stroke={colors.accent} strokeWidth="1" />
      {/* Contact line */}
      <text x="60" y="36" textAnchor="middle" fontSize="3.5" fill={colors.text}>email · teléfono · dirección</text>
      {/* Sections */}
      <SectionLine y={46} label="Perfil" color={colors.primary} />
      <rect x="12" y="52" width="96" height="3" fill={colors.border} />
      <rect x="12" y="57" width="96" height="3" fill={colors.border} />
      <rect x="12" y="62" width="70" height="3" fill={colors.border} />
      <SectionLine y={73} label="Experiencia" color={colors.primary} />
      <rect x="12" y="79" width="96" height="3" fill={colors.border} />
      <rect x="12" y="84" width="96" height="3" fill={colors.border} />
      <rect x="12" y="89" width="80" height="3" fill={colors.border} />
      <rect x="12" y="96" width="96" height="3" fill={colors.border} />
      <rect x="12" y="101" width="60" height="3" fill={colors.border} />
      <SectionLine y={111} label="Educación" color={colors.primary} />
      <rect x="12" y="117" width="96" height="3" fill={colors.border} />
      <rect x="12" y="122" width="70" height="3" fill={colors.border} />
      <SectionLine y={132} label="Habilidades" color={colors.primary} />
      <rect x="12" y="138" width="30" height="5" fill={colors.light} rx="2" />
      <rect x="45" y="138" width="25" height="5" fill={colors.light} rx="2" />
      <rect x="73" y="138" width="35" height="5" fill={colors.light} rx="2" />
      <rect x="12" y="146" width="28" height="5" fill={colors.light} rx="2" />
      <rect x="43" y="146" width="40" height="5" fill={colors.light} rx="2" />
    </svg>
  );
}

// Modern: left sidebar + main content
function ModernLayout({ colors }: { colors: TemplateColors }) {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Sidebar */}
      <rect x="0" y="0" width="38" height="160" fill={colors.primary} />
      {/* Photo placeholder */}
      <circle cx="19" cy="20" r="11" fill="white" opacity="0.9" />
      <circle cx="19" cy="17" r="4" fill={colors.primary} opacity="0.6" />
      <path d="M 11 28 Q 19 22 27 28 L 27 32 L 11 32 Z" fill={colors.primary} opacity="0.6" />
      {/* Sidebar sections */}
      <text x="19" y="48" textAnchor="middle" fontSize="4" fontWeight="700" fill="white">CONTACTO</text>
      <rect x="6" y="52" width="26" height="2" fill="white" opacity="0.6" />
      <rect x="6" y="56" width="26" height="2" fill="white" opacity="0.6" />
      <rect x="6" y="60" width="20" height="2" fill="white" opacity="0.6" />
      <text x="19" y="74" textAnchor="middle" fontSize="4" fontWeight="700" fill="white">HABILIDADES</text>
      <rect x="6" y="78" width="26" height="2.5" fill="white" opacity="0.7" rx="1" />
      <rect x="6" y="83" width="26" height="2.5" fill="white" opacity="0.5" rx="1" />
      <rect x="6" y="88" width="26" height="2.5" fill="white" opacity="0.7" rx="1" />
      <rect x="6" y="93" width="26" height="2.5" fill="white" opacity="0.4" rx="1" />
      <text x="19" y="107" textAnchor="middle" fontSize="4" fontWeight="700" fill="white">IDIOMAS</text>
      <rect x="6" y="111" width="26" height="2" fill="white" opacity="0.6" />
      <rect x="6" y="115" width="26" height="2" fill="white" opacity="0.6" />
      <text x="19" y="130" textAnchor="middle" fontSize="4" fontWeight="700" fill="white">EDUCACIÓN</text>
      <rect x="6" y="134" width="26" height="2" fill="white" opacity="0.6" />
      <rect x="6" y="138" width="20" height="2" fill="white" opacity="0.6" />
      {/* Main content */}
      <text x="46" y="14" fontSize="8" fontWeight="700" fill={colors.text}>Nombre</text>
      <text x="46" y="21" fontSize="4.5" fill={colors.accent}>Profesión</text>
      <line x1="46" y1="25" x2="112" y2="25" stroke={colors.accent} strokeWidth="0.8" />
      <text x="46" y="35" fontSize="4" fontWeight="700" fill={colors.primary}>PERFIL</text>
      <rect x="46" y="39" width="66" height="2.5" fill={colors.border} />
      <rect x="46" y="43" width="66" height="2.5" fill={colors.border} />
      <rect x="46" y="47" width="50" height="2.5" fill={colors.border} />
      <text x="46" y="58" fontSize="4" fontWeight="700" fill={colors.primary}>EXPERIENCIA</text>
      <rect x="46" y="62" width="40" height="3" fill={colors.light} rx="1" />
      <rect x="46" y="67" width="66" height="2" fill={colors.border} />
      <rect x="46" y="70" width="66" height="2" fill={colors.border} />
      <rect x="46" y="73" width="55" height="2" fill={colors.border} />
      <rect x="46" y="80" width="40" height="3" fill={colors.light} rx="1" />
      <rect x="46" y="85" width="66" height="2" fill={colors.border} />
      <rect x="46" y="88" width="66" height="2" fill={colors.border} />
      <rect x="46" y="91" width="45" height="2" fill={colors.border} />
      <rect x="46" y="98" width="40" height="3" fill={colors.light} rx="1" />
      <rect x="46" y="103" width="66" height="2" fill={colors.border} />
      <rect x="46" y="106" width="60" height="2" fill={colors.border} />
      <rect x="46" y="113" width="40" height="3" fill={colors.light} rx="1" />
      <rect x="46" y="118" width="66" height="2" fill={colors.border} />
      <rect x="46" y="121" width="50" height="2" fill={colors.border} />
      <rect x="46" y="128" width="40" height="3" fill={colors.light} rx="1" />
      <rect x="46" y="133" width="66" height="2" fill={colors.border} />
      <rect x="46" y="136" width="55" height="2" fill={colors.border} />
    </svg>
  );
}

// Minimal: clean, single column, lots of white space
function MinimalLayout({ colors }: { colors: TemplateColors }) {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Lots of top padding */}
      <text x="60" y="22" textAnchor="middle" fontSize="8" fontWeight="300" fill={colors.text} letterSpacing="1">NOMBRE APELLIDO</text>
      <text x="60" y="30" textAnchor="middle" fontSize="4.5" fill={colors.accent} letterSpacing="2">PROFESIÓN</text>
      <text x="60" y="38" textAnchor="middle" fontSize="3" fill={colors.text} opacity="0.6">email · teléfono · ciudad</text>
      {/* Thin divider */}
      <line x1="30" y1="44" x2="90" y2="44" stroke={colors.border} strokeWidth="0.5" />
      {/* Section with lots of space */}
      <text x="60" y="56" textAnchor="middle" fontSize="3.5" fontWeight="600" fill={colors.text} letterSpacing="2">PERFIL</text>
      <rect x="30" y="62" width="60" height="2" fill={colors.border} />
      <rect x="30" y="66" width="60" height="2" fill={colors.border} />
      <rect x="30" y="70" width="45" height="2" fill={colors.border} />
      <text x="60" y="84" textAnchor="middle" fontSize="3.5" fontWeight="600" fill={colors.text} letterSpacing="2">EXPERIENCIA</text>
      <rect x="30" y="90" width="60" height="2" fill={colors.border} />
      <rect x="30" y="94" width="60" height="2" fill={colors.border} />
      <rect x="30" y="98" width="50" height="2" fill={colors.border} />
      <rect x="30" y="105" width="60" height="2" fill={colors.border} />
      <rect x="30" y="109" width="60" height="2" fill={colors.border} />
      <rect x="30" y="113" width="40" height="2" fill={colors.border} />
      <text x="60" y="127" textAnchor="middle" fontSize="3.5" fontWeight="600" fill={colors.text} letterSpacing="2">EDUCACIÓN</text>
      <rect x="30" y="133" width="60" height="2" fill={colors.border} />
      <rect x="30" y="137" width="45" height="2" fill={colors.border} />
      <text x="60" y="151" textAnchor="middle" fontSize="3.5" fontWeight="600" fill={colors.text} letterSpacing="2">HABILIDADES</text>
    </svg>
  );
}

// Creative: colorful header banner, dynamic sections
function CreativeLayout({ colors }: { colors: TemplateColors }) {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`grad-${colors.primary}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.accent} />
        </linearGradient>
      </defs>
      {/* Gradient header */}
      <rect x="0" y="0" width="120" height="34" fill={`url(#grad-${colors.primary})`} />
      {/* Decorative circles */}
      <circle cx="100" cy="8" r="10" fill="white" opacity="0.1" />
      <circle cx="110" cy="20" r="6" fill="white" opacity="0.1" />
      <text x="12" y="16" fontSize="8" fontWeight="800" fill="white">Nombre A.</text>
      <text x="12" y="24" fontSize="4.5" fill="white" opacity="0.9">Profesión Creativa</text>
      <text x="12" y="30" fontSize="3" fill="white" opacity="0.8">email · teléfono</text>
      {/* About with colored pill */}
      <rect x="10" y="42" width="32" height="6" fill={colors.light} rx="3" />
      <text x="26" y="46" textAnchor="middle" fontSize="3.5" fontWeight="700" fill={colors.primary}>SOBRE MÍ</text>
      <rect x="10" y="52" width="100" height="2.5" fill={colors.border} />
      <rect x="10" y="56" width="100" height="2.5" fill={colors.border} />
      <rect x="10" y="60" width="75" height="2.5" fill={colors.border} />
      {/* Experience with colored dots */}
      <rect x="10" y="70" width="40" height="6" fill={colors.light} rx="3" />
      <text x="30" y="74" textAnchor="middle" fontSize="3.5" fontWeight="700" fill={colors.primary}>EXPERIENCIA</text>
      <circle cx="13" cy="82" r="2" fill={colors.primary} />
      <rect x="18" y="80" width="40" height="3" fill={colors.light} rx="1" />
      <rect x="18" y="85" width="92" height="2" fill={colors.border} />
      <rect x="18" y="88" width="92" height="2" fill={colors.border} />
      <circle cx="13" cy="95" r="2" fill={colors.accent} />
      <rect x="18" y="93" width="35" height="3" fill={colors.light} rx="1" />
      <rect x="18" y="98" width="92" height="2" fill={colors.border} />
      <rect x="18" y="101" width="80" height="2" fill={colors.border} />
      <circle cx="13" cy="108" r="2" fill={colors.primary} />
      <rect x="18" y="106" width="38" height="3" fill={colors.light} rx="1" />
      <rect x="18" y="111" width="92" height="2" fill={colors.border} />
      <rect x="18" y="114" width="70" height="2" fill={colors.border} />
      {/* Skills as colorful tags */}
      <rect x="10" y="124" width="30" height="6" fill={colors.light} rx="3" />
      <text x="25" y="128" textAnchor="middle" fontSize="3.5" fontWeight="700" fill={colors.primary}>SKILLS</text>
      <rect x="10" y="134" width="22" height="5" fill={colors.primary} rx="2.5" />
      <rect x="34" y="134" width="18" height="5" fill={colors.accent} rx="2.5" />
      <rect x="54" y="134" width="24" height="5" fill={colors.primary} rx="2.5" />
      <rect x="80" y="134" width="20" height="5" fill={colors.accent} rx="2.5" />
      <rect x="10" y="142" width="26" height="5" fill={colors.accent} rx="2.5" />
      <rect x="38" y="142" width="22" height="5" fill={colors.primary} rx="2.5" />
      <rect x="62" y="142" width="28" height="5" fill={colors.accent} rx="2.5" />
    </svg>
  );
}

// Professional: formal header, structured sections with metrics
function ProfessionalLayout({ colors }: { colors: TemplateColors }) {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Top accent bar */}
      <rect x="0" y="0" width="120" height="4" fill={colors.primary} />
      {/* Header */}
      <rect x="0" y="4" width="120" height="24" fill={colors.light} />
      <text x="12" y="16" fontSize="8" fontWeight="700" fill={colors.primary}>NOMBRE APELLIDO</text>
      <text x="12" y="23" fontSize="4" fill={colors.text}>Cargo Ejecutivo · Especialización</text>
      <text x="108" y="14" textAnchor="end" fontSize="3" fill={colors.text}>email@ejemplo.com</text>
      <text x="108" y="18" textAnchor="end" fontSize="3" fill={colors.text}>+34 600 000 000</text>
      <text x="108" y="22" textAnchor="end" fontSize="3" fill={colors.text}>Madrid, España</text>
      {/* Summary */}
      <SectionHeader y={36} label="RESUMEN EJECUTIVO" color={colors.primary} light={colors.light} />
      <rect x="12" y="42" width="96" height="2.5" fill={colors.border} />
      <rect x="12" y="46" width="96" height="2.5" fill={colors.border} />
      <rect x="12" y="50" width="70" height="2.5" fill={colors.border} />
      {/* Experience with metrics boxes */}
      <SectionHeader y={60} label="EXPERIENCIA PROFESIONAL" color={colors.primary} light={colors.light} />
      <rect x="12" y="66" width="50" height="3.5" fill={colors.primary} rx="1" />
      <text x="14" y="69" fontSize="2.5" fill="white">Empresa · 2020-Presente</text>
      <rect x="12" y="72" width="96" height="2" fill={colors.border} />
      <rect x="12" y="75" width="96" height="2" fill={colors.border} />
      <rect x="12" y="78" width="60" height="2" fill={colors.border} />
      {/* Metric boxes */}
      <rect x="12" y="83" width="20" height="10" fill={colors.light} rx="1" />
      <text x="22" y="89" textAnchor="middle" fontSize="4" fontWeight="700" fill={colors.primary}>+30%</text>
      <text x="22" y="92" textAnchor="middle" fontSize="2" fill={colors.text}>logro</text>
      <rect x="35" y="83" width="20" height="10" fill={colors.light} rx="1" />
      <text x="45" y="89" textAnchor="middle" fontSize="4" fontWeight="700" fill={colors.primary}>15</text>
      <text x="45" y="92" textAnchor="middle" fontSize="2" fill={colors.text}>proyectos</text>
      <rect x="58" y="83" width="20" height="10" fill={colors.light} rx="1" />
      <text x="68" y="89" textAnchor="middle" fontSize="4" fontWeight="700" fill={colors.primary}>5★</text>
      <text x="68" y="92" textAnchor="middle" fontSize="2" fill={colors.text}>rating</text>
      <rect x="12" y="98" width="50" height="3.5" fill={colors.accent} rx="1" />
      <text x="14" y="101" fontSize="2.5" fill="white">Empresa 2 · 2018-2020</text>
      <rect x="12" y="104" width="96" height="2" fill={colors.border} />
      <rect x="12" y="107" width="96" height="2" fill={colors.border} />
      <rect x="12" y="110" width="55" height="2" fill={colors.border} />
      {/* Education */}
      <SectionHeader y={120} label="EDUCACIÓN" color={colors.primary} light={colors.light} />
      <rect x="12" y="126" width="96" height="2.5" fill={colors.border} />
      <rect x="12" y="130" width="60" height="2.5" fill={colors.border} />
      {/* Skills as bars */}
      <SectionHeader y={140} label="COMPETENCIAS" color={colors.primary} light={colors.light} />
      <rect x="12" y="146" width="60" height="2" fill={colors.light} rx="1" />
      <rect x="12" y="146" width="45" height="2" fill={colors.primary} rx="1" />
      <rect x="12" y="150" width="60" height="2" fill={colors.light} rx="1" />
      <rect x="12" y="150" width="50" height="2" fill={colors.accent} rx="1" />
      <rect x="12" y="154" width="60" height="2" fill={colors.light} rx="1" />
      <rect x="12" y="154" width="38" height="2" fill={colors.primary} rx="1" />
    </svg>
  );
}

// Helper: section divider line with label
function SectionLine({ y, label, color }: { y: number; label: string; color: string }) {
  return (
    <>
      <text x="12" y={y} fontSize="4" fontWeight="700" fill={color} letterSpacing="0.5">{label.toUpperCase()}</text>
      <line x1="12" y1={y + 2} x2="108" y2={y + 2} stroke={color} strokeWidth="0.4" opacity="0.4" />
    </>
  );
}

// Helper: section header with background
function SectionHeader({ y, label, color, light }: { y: number; label: string; color: string; light: string }) {
  return (
    <>
      <rect x="8" y={y - 4} width="104" height="6" fill={light} rx="1" />
      <text x="12" y={y} fontSize="3.5" fontWeight="700" fill={color} letterSpacing="0.5">{label}</text>
    </>
  );
}

// New: Sidebar with photo template
function SidebarPhotoLayout({ colors }: { colors: TemplateColors }) {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Left sidebar - colored */}
      <rect x="0" y="0" width="42" height="160" fill={colors.primary} />
      {/* Photo circle */}
      <circle cx="21" cy="24" r="14" fill="white" />
      <circle cx="21" cy="20" r="5" fill={colors.primary} opacity="0.4" />
      <path d="M 12 32 Q 21 25 30 32 L 30 38 L 12 38 Z" fill={colors.primary} opacity="0.4" />
      {/* Sidebar content */}
      <SidebarSection y={50} label="CONTACTO" />
      <rect x="6" y="54" width="30" height="2" fill="white" opacity="0.7" />
      <rect x="6" y="58" width="30" height="2" fill="white" opacity="0.7" />
      <rect x="6" y="62" width="22" height="2" fill="white" opacity="0.7" />
      <SidebarSection y={76} label="HABILIDADES" />
      <SkillBar x={6} y={80} w={30} opacity={0.8} />
      <SkillBar x={6} y={85} w={30} opacity={0.6} />
      <SkillBar x={6} y={90} w={30} opacity={0.9} />
      <SkillBar x={6} y={95} w={30} opacity={0.5} />
      <SidebarSection y={108} label="IDIOMAS" />
      <rect x="6" y="112" width="30" height="3" fill="white" opacity="0.2" rx="1.5" />
      <rect x="6" y="112" width="24" height="3" fill="white" opacity="0.7" rx="1.5" />
      <rect x="6" y="117" width="30" height="3" fill="white" opacity="0.2" rx="1.5" />
      <rect x="6" y="117" width="18" height="3" fill="white" opacity="0.7" rx="1.5" />
      <SidebarSection y={130} label="EDUCACIÓN" />
      <rect x="6" y="134" width="30" height="2" fill="white" opacity="0.7" />
      <rect x="6" y="138" width="30" height="2" fill="white" opacity="0.7" />
      <rect x="6" y="142" width="20" height="2" fill="white" opacity="0.7" />
      {/* Right main content */}
      <text x="50" y="18" fontSize="7" fontWeight="700" fill={colors.text}>Nombre</text>
      <text x="50" y="25" fontSize="4" fill={colors.accent} fontWeight="600">Profesión</text>
      <line x1="50" y1="30" x2="112" y2="30" stroke={colors.accent} strokeWidth="1" />
      <MainSection y={38} label="PERFIL" color={colors.primary} />
      <rect x="50" y="42" width="62" height="2" fill={colors.border} />
      <rect x="50" y="46" width="62" height="2" fill={colors.border} />
      <rect x="50" y="50" width="48" height="2" fill={colors.border} />
      <MainSection y={60} label="EXPERIENCIA" color={colors.primary} />
      <rect x="50" y="64" width="35" height="3" fill={colors.light} rx="1" />
      <rect x="50" y="69" width="62" height="2" fill={colors.border} />
      <rect x="50" y="72" width="62" height="2" fill={colors.border} />
      <rect x="50" y="75" width="50" height="2" fill={colors.border} />
      <rect x="50" y="82" width="35" height="3" fill={colors.light} rx="1" />
      <rect x="50" y="87" width="62" height="2" fill={colors.border} />
      <rect x="50" y="90" width="62" height="2" fill={colors.border} />
      <rect x="50" y="93" width="45" height="2" fill={colors.border} />
      <rect x="50" y="100" width="35" height="3" fill={colors.light} rx="1" />
      <rect x="50" y="105" width="62" height="2" fill={colors.border} />
      <rect x="50" y="108" width="62" height="2" fill={colors.border} />
      <rect x="50" y="111" width="40" height="2" fill={colors.border} />
      <rect x="50" y="118" width="35" height="3" fill={colors.light} rx="1" />
      <rect x="50" y="123" width="62" height="2" fill={colors.border} />
      <rect x="50" y="126" width="55" height="2" fill={colors.border} />
      <rect x="50" y="133" width="35" height="3" fill={colors.light} rx="1" />
      <rect x="50" y="138" width="62" height="2" fill={colors.border} />
      <rect x="50" y="141" width="48" height="2" fill={colors.border} />
    </svg>
  );

  function SidebarSection({ y, label }: { y: number; label: string }) {
    return (
      <>
        <text x="6" y={y} fontSize="3.5" fontWeight="700" fill="white" letterSpacing="0.5">{label}</text>
        <line x1="6" y1={y + 2} x2="36" y2={y + 2} stroke="white" strokeWidth="0.4" opacity="0.5" />
      </>
    );
  }
  function SkillBar({ x, y, w, opacity }: { x: number; y: number; w: number; opacity: number }) {
    return (
      <>
        <rect x={x} y={y} width={w} height="3" fill="white" opacity="0.2" rx="1.5" />
        <rect x={x} y={y} width={w * opacity} height="3" fill="white" opacity={opacity} rx="1.5" />
      </>
    );
  }
  function MainSection({ y, label, color }: { y: number; label: string; color: string }) {
    return (
      <>
        <text x="50" y={y} fontSize="4" fontWeight="700" fill={color} letterSpacing="0.5">{label}</text>
        <line x1="50" y1={y + 2} x2="112" y2={y + 2} stroke={color} strokeWidth="0.4" opacity="0.3" />
      </>
    );
  }
}

// New: Two-column tech template
function TwoColumnTechLayout({ colors }: { colors: TemplateColors }) {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Top bar */}
      <rect x="0" y="0" width="120" height="3" fill={colors.primary} />
      {/* Header - centered */}
      <text x="60" y="14" textAnchor="middle" fontSize="8" fontWeight="700" fill={colors.text}>Nombre Apellido</text>
      <text x="60" y="21" textAnchor="middle" fontSize="4" fill={colors.accent} fontWeight="600">Desarrollador / Tech</text>
      <text x="60" y="27" textAnchor="middle" fontSize="3" fill={colors.text} opacity="0.6">email · teléfono · GitHub · LinkedIn</text>
      {/* Two columns divider */}
      <line x1="60" y1="34" x2="60" y2="155" stroke={colors.border} strokeWidth="0.5" />
      {/* Left column */}
      <text x="8" y="42" fontSize="3.5" fontWeight="700" fill={colors.primary} letterSpacing="0.5">PERFIL</text>
      <line x1="8" y1="44" x2="52" y2="44" stroke={colors.primary} strokeWidth="0.5" />
      <rect x="8" y="48" width="44" height="2" fill={colors.border} />
      <rect x="8" y="52" width="44" height="2" fill={colors.border} />
      <rect x="8" y="56" width="35" height="2" fill={colors.border} />
      <text x="8" y="68" fontSize="3.5" fontWeight="700" fill={colors.primary} letterSpacing="0.5">EXPERIENCIA</text>
      <line x1="8" y1="70" x2="52" y2="70" stroke={colors.primary} strokeWidth="0.5" />
      <rect x="8" y="74" width="30" height="3" fill={colors.light} rx="1" />
      <rect x="8" y="79" width="44" height="2" fill={colors.border} />
      <rect x="8" y="82" width="44" height="2" fill={colors.border} />
      <rect x="8" y="85" width="35" height="2" fill={colors.border} />
      <rect x="8" y="92" width="30" height="3" fill={colors.light} rx="1" />
      <rect x="8" y="97" width="44" height="2" fill={colors.border} />
      <rect x="8" y="100" width="44" height="2" fill={colors.border} />
      <rect x="8" y="103" width="30" height="2" fill={colors.border} />
      <rect x="8" y="110" width="30" height="3" fill={colors.light} rx="1" />
      <rect x="8" y="115" width="44" height="2" fill={colors.border} />
      <rect x="8" y="118" width="44" height="2" fill={colors.border} />
      <rect x="8" y="121" width="38" height="2" fill={colors.border} />
      <text x="8" y="133" fontSize="3.5" fontWeight="700" fill={colors.primary} letterSpacing="0.5">EDUCACIÓN</text>
      <line x1="8" y1="135" x2="52" y2="135" stroke={colors.primary} strokeWidth="0.5" />
      <rect x="8" y="139" width="44" height="2" fill={colors.border} />
      <rect x="8" y="143" width="35" height="2" fill={colors.border} />
      <rect x="8" y="150" width="44" height="2" fill={colors.border} />
      <rect x="8" y="154" width="30" height="2" fill={colors.border} />
      {/* Right column */}
      <text x="68" y="42" fontSize="3.5" fontWeight="700" fill={colors.accent} letterSpacing="0.5">HABILIDADES</text>
      <line x1="68" y1="44" x2="112" y2="44" stroke={colors.accent} strokeWidth="0.5" />
      <TechTag x={68} y={48} w={20} color={colors.primary} />
      <TechTag x={90} y={48} w={16} color={colors.accent} />
      <TechTag x={68} y={54} w={24} color={colors.accent} />
      <TechTag x={94} y={54} w={18} color={colors.primary} />
      <TechTag x={68} y={60} w={18} color={colors.primary} />
      <TechTag x={88} y={60} w={22} color={colors.accent} />
      <TechTag x={68} y={66} w={26} color={colors.accent} />
      <TechTag x={96} y={66} w={16} color={colors.primary} />
      <text x="68" y="80" fontSize="3.5" fontWeight="700" fill={colors.accent} letterSpacing="0.5">PROYECTOS</text>
      <line x1="68" y1="82" x2="112" y2="82" stroke={colors.accent} strokeWidth="0.5" />
      <rect x="68" y="86" width="44" height="3" fill={colors.light} rx="1" />
      <rect x="68" y="91" width="44" height="2" fill={colors.border} />
      <rect x="68" y="94" width="44" height="2" fill={colors.border} />
      <rect x="68" y="97" width="35" height="2" fill={colors.border} />
      <rect x="68" y="104" width="44" height="3" fill={colors.light} rx="1" />
      <rect x="68" y="109" width="44" height="2" fill={colors.border} />
      <rect x="68" y="112" width="44" height="2" fill={colors.border} />
      <rect x="68" y="115" width="30" height="2" fill={colors.border} />
      <text x="68" y="128" fontSize="3.5" fontWeight="700" fill={colors.accent} letterSpacing="0.5">IDIOMAS</text>
      <line x1="68" y1="130" x2="112" y2="130" stroke={colors.accent} strokeWidth="0.5" />
      <rect x="68" y="134" width="44" height="3" fill={colors.light} rx="1.5" />
      <rect x="68" y="134" width="36" height="3" fill={colors.primary} rx="1.5" />
      <rect x="68" y="139" width="44" height="3" fill={colors.light} rx="1.5" />
      <rect x="68" y="139" width="28" height="3" fill={colors.accent} rx="1.5" />
      <rect x="68" y="148" width="44" height="3" fill={colors.light} rx="1.5" />
      <rect x="68" y="148" width="40" height="3" fill={colors.primary} rx="1.5" />
    </svg>
  );

  function TechTag({ x, y, w, color }: { x: number; y: number; w: number; color: string }) {
    return <rect x={x} y={y} width={w} height="4" fill={color} rx="2" opacity="0.8" />;
  }
}
