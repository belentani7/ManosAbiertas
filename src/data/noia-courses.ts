// Manos Abiertas - NO.IA_CORE Academy Courses
// Cursos extraídos del ecosistema NO.IA_CORE by Pedro Belentani
// Estética: Lujo Tecnológico (Obsidiana, Titanio, Ámbar Núcleo)

export interface NoiaCourse {
  id: string;
  title: string;
  description: string;
  module: string;
  level: 'foundation' | 'intermediate' | 'advanced' | 'master';
  duration: string;
  emoji: string;
  color: string; // gradient classes
  topics: string[];
  source: string; // which uploaded file
  skills: string[];
  premium: boolean;
}

export const NOIA_MODULES = [
  { id: 'prompt-engineering', label: 'Ingeniería de Prompts', emoji: '⚡', color: 'from-amber-500 to-orange-600' },
  { id: 'design-theory', label: 'Teoría del Diseño Premium', emoji: '🎨', color: 'from-violet-500 to-purple-600' },
  { id: 'neuroscience', label: 'Neurociencia y Percepción', emoji: '🧠', color: 'from-rose-500 to-pink-600' },
  { id: 'web-architecture', label: 'Arquitectura Web Autónoma', emoji: '🌐', color: 'from-cyan-500 to-blue-600' },
  { id: 'generative-art', label: 'Arte Generativo', emoji: '✨', color: 'from-teal-500 to-emerald-600' },
  { id: 'community', label: 'Comunidad y Impacto', emoji: '🤝', color: 'from-indigo-500 to-violet-600' },
] as const;

export const NOIA_COURSES: NoiaCourse[] = [
  // === INGENIERÍA DE PROMPTS (del archivo "Mejores Prácticas en Ingeniería de Prompts") ===
  {
    id: 'noia-1',
    title: 'Fundamentos de Prompt Engineering',
    description: 'Domina la comunicación con IA: claridad, especificidad, estructura jerárquica y técnicas avanzadas. De "háblame de X" a prompts quirúrgicos.',
    module: 'prompt-engineering',
    level: 'foundation',
    duration: '3 horas',
    emoji: '⚡',
    color: 'from-amber-500 to-orange-600',
    topics: ['Claridad y especificidad', 'Contexto suficiente', 'Alcance definido', 'Instrucciones explícitas', 'Ejemplos comparativos'],
    source: 'Mejores Prácticas en Ingeniería de Prompts',
    skills: ['Prompt design', 'Context engineering', 'AI communication'],
    premium: false,
  },
  {
    id: 'noia-2',
    title: 'Estructura Jerárquica de Prompts',
    description: 'Los 7 componentes estructurales: Rol, Objetivo, Contexto, Restricciones, Formato, Few-shot, Criterios de evaluación.',
    module: 'prompt-engineering',
    level: 'intermediate',
    duration: '4 horas',
    emoji: '🏗️',
    color: 'from-amber-500 to-orange-600',
    topics: ['Rol/Persona', 'Objetivo', 'Contexto', 'Restricciones', 'Formato de salida', 'Few-shot', 'Criterios de éxito'],
    source: 'Mejores Prácticas en Ingeniería de Prompts',
    skills: ['Prompt architecture', 'Few-shot prompting', 'Output formatting'],
    premium: false,
  },
  {
    id: 'noia-3',
    title: 'Técnicas Avanzadas: Chain-of-Thought y Tree-of-Thought',
    description: 'Razonamiento paso a paso, árboles de pensamiento, self-consistency y decomposición de problemas complejos.',
    module: 'prompt-engineering',
    level: 'advanced',
    duration: '5 horas',
    emoji: '🌳',
    color: 'from-amber-500 to-orange-600',
    topics: ['Chain-of-Thought (CoT)', 'Tree-of-Thought (ToT)', 'Self-consistency', 'Decomposición', 'Reflexión iterativa'],
    source: 'Mejores Prácticas en Ingeniería de Prompts',
    skills: ['Complex reasoning', 'Multi-step prompting', 'Self-reflection'],
    premium: true,
  },
  {
    id: 'noia-4',
    title: 'Prompting Multimodal y Nichos Especializados',
    description: 'Prompts para imágenes, código, datos, legal, médico, financiero. Vocabulario técnico por industria.',
    module: 'prompt-engineering',
    level: 'master',
    duration: '6 horas',
    emoji: '🎯',
    color: 'from-amber-500 to-orange-600',
    topics: ['Image generation prompts', 'Code prompts', 'Data analysis', 'Legal prompts', 'Medical prompts', 'Financial prompts'],
    source: 'Mejores Prácticas en Ingeniería de Prompts',
    skills: ['Multimodal prompting', 'Domain-specific vocabulary', 'Cross-industry application'],
    premium: true,
  },

  // === TEORÍA DEL DISEÑO (del archivo "Estética Corporativa Premium NO.IA_CORE") ===
  {
    id: 'noia-5',
    title: 'Teoría de la Armonía y Proporción Áurea',
    description: 'Aplicación de Phi (φ) en diseño: hexágono truncado, estructura monolítica, composición asimétrica y espacio negativo extremo.',
    module: 'design-theory',
    level: 'intermediate',
    duration: '4 horas',
    emoji: '📐',
    color: 'from-violet-500 to-purple-600',
    topics: ['Proporción áurea (Phi)', 'Geometría universal', 'Hexágono truncado', 'Composición asimétrica', 'Espacio negativo'],
    source: 'Estética Corporativa Premium NO.IA_CORE',
    skills: ['Harmonic design', 'Golden ratio application', 'Spatial composition'],
    premium: true,
  },
  {
    id: 'noia-6',
    title: 'Teoría del Color: Lujo Tecnológico',
    description: 'Paleta de quiet luxury: Obsidiana (negro absoluto), Titanio (gris metalizado), Ámbar Núcleo (acento cálido). Evitar clichés de IA.',
    module: 'design-theory',
    level: 'intermediate',
    duration: '3 horas',
    emoji: '🎨',
    color: 'from-violet-500 to-purple-600',
    topics: ['Color obsidiana', 'Color titanio', 'Ámbar núcleo', 'Quiet luxury', 'Psicología del color premium', 'Contraste cromático'],
    source: 'Estética Corporativa Premium NO.IA_CORE',
    skills: ['Color theory', 'Premium palette design', 'Brand chromatics'],
    premium: true,
  },
  {
    id: 'noia-7',
    title: 'Escaparatismo y Visual Merchandising Digital',
    description: 'Composición claroscuro, iluminación dramática, exposición como alta joyería. La marca como pieza arquitectónica.',
    module: 'design-theory',
    level: 'advanced',
    duration: '4 horas',
    emoji: '💎',
    color: 'from-violet-500 to-purple-600',
    topics: ['Claroscuro digital', 'Iluminación dramática', 'Exposición arquitectónica', 'Papelería táctil', 'Display espacial'],
    source: 'Estética Corporativa Premium NO.IA_CORE',
    skills: ['Visual merchandising', 'Digital staging', 'Brand presentation'],
    premium: true,
  },
  {
    id: 'noia-8',
    title: 'Iconografía y Teoría Fonética del Lenguaje de Marca',
    description: 'Análisis fonético de nombres de marca, cadencia percusiva, teoría de iconos universales y simbolismo geométrico.',
    module: 'design-theory',
    level: 'master',
    duration: '5 horas',
    emoji: '🔤',
    color: 'from-violet-500 to-purple-600',
    topics: ['Fonética de marca', 'Cadencia silábica', 'Iconografía universal', 'Simbolismo geométrico', 'Semántica de marca'],
    source: 'Estética Corporativa Premium NO.IA_CORE',
    skills: ['Brand phonetics', 'Icon design', 'Symbolic geometry'],
    premium: true,
  },

  // === NEUROCIENCIA (del archivo "Ilusiones Ópticas y Límites Mentales") ===
  {
    id: 'noia-9',
    title: 'Procesamiento Cerebral: Sensación vs Percepción',
    description: 'No vemos con los ojos, sino con el cerebro. Procesamiento predictivo, autocompletado y jerarquía visual.',
    module: 'neuroscience',
    level: 'foundation',
    duration: '3 horas',
    emoji: '👁️',
    color: 'from-rose-500 to-pink-600',
    topics: ['Sensación vs percepción', 'Procesamiento predictivo', 'Jerarquía visual', 'Campos receptivos', 'Inhibición lateral'],
    source: 'Ilusiones Ópticas y Límites Mentales',
    skills: ['Cognitive science', 'Visual processing', 'Predictive coding'],
    premium: false,
  },
  {
    id: 'noia-10',
    title: 'Sistema Visual Dual y Codificación Dispersa',
    description: 'Vía dorsal ("dónde") y vía ventral ("qué"). Redes neuronales distribuidas y limitaciones estructurales.',
    module: 'neuroscience',
    level: 'intermediate',
    duration: '4 horas',
    emoji: '🧠',
    color: 'from-rose-500 to-pink-600',
    topics: ['Vía dorsal', 'Vía ventral', 'Codificación dispersa', 'Visión periférica', 'Movimientos sacádicos'],
    source: 'Ilusiones Ópticas y Límites Mentales',
    skills: ['Neuroanatomy', 'Dual-stream hypothesis', 'Neural encoding'],
    premium: true,
  },
  {
    id: 'noia-11',
    title: 'Constancias Perceptivas y Heurísticas Cognitivas',
    description: 'Constancia de tamaño, color y forma. Cómo el cerebro "descuenta" el contexto y aplica atajos cognitivos.',
    module: 'neuroscience',
    level: 'intermediate',
    duration: '3 horas',
    emoji: '🔄',
    color: 'from-rose-500 to-pink-600',
    topics: ['Constancia de tamaño', 'Constancia de color', 'Constancia de forma', 'Descuento de contexto', 'Heurísticas'],
    source: 'Ilusiones Ópticas y Límites Mentales',
    skills: ['Perceptual constancy', 'Cognitive heuristics', 'Context processing'],
    premium: false,
  },
  {
    id: 'noia-12',
    title: 'Aplicaciones Prácticas: Diseño Basado en Neurociencia',
    description: 'Cómo aplicar descubrimientos neurocientíficos al diseño UX/UI, marketing y educación.',
    module: 'neuroscience',
    level: 'advanced',
    duration: '5 horas',
    emoji: '💡',
    color: 'from-rose-500 to-pink-600',
    topics: ['Neurodesign', 'UX basado en neurociencia', 'Atención visual', 'Eye tracking', 'Neuromarketing'],
    source: 'Ilusiones Ópticas y Límites Mentales',
    skills: ['Neurodesign', 'UX neuroscience', 'Neuromarketing'],
    premium: true,
  },

  // === ARQUITECTURA WEB (del archivo "1000 Self-Managed Traffic-Generating Websites") ===
  {
    id: 'noia-13',
    title: 'Programmatic SEO: Tráfico Autónomo',
    description: '10 modelos de arquitectura web que generan tráfico solo: calculadoras, directorios, dashboards, conversores.',
    module: 'web-architecture',
    level: 'intermediate',
    duration: '6 horas',
    emoji: '🌐',
    color: 'from-cyan-500 to-blue-600',
    topics: ['Programmatic SEO', 'Long-tail search', 'Calculadoras de nicho', 'Directorios programáticos', 'Dashboards de datos abiertos'],
    source: '1000 Self-Managed Traffic-Generating Websites',
    skills: ['Programmatic SEO', 'Automated content', 'API aggregation'],
    premium: true,
  },
  {
    id: 'noia-14',
    title: 'Herramientas Web para Windows 11',
    description: 'Codex completo: winget, herramientas forenses, recursos visuales gratuitos y auditoría de sistema.',
    module: 'web-architecture',
    level: 'foundation',
    duration: '4 horas',
    emoji: '🪟',
    color: 'from-cyan-500 to-blue-600',
    topics: ['Winget commands', 'PowerShell para web', 'Auditoría forense', 'Recursos visuales free', 'Node.js en Windows'],
    source: 'Web Development Tools for Windows 11',
    skills: ['Windows development', 'PowerShell', 'Tool auditing'],
    premium: false,
  },
  {
    id: 'noia-15',
    title: 'Edición Web Offline: Herramientas sin API',
    description: 'Capa universal de conexión, extensiones de navegador, modelos abiertos online y funcionalidad offline.',
    module: 'web-architecture',
    level: 'advanced',
    duration: '5 horas',
    emoji: '🔌',
    color: 'from-cyan-500 to-blue-600',
    topics: ['Extensiones de navegador', 'Modelos abiertos', 'Capa universal', 'Funcionalidad offline', 'APIs locales'],
    source: 'Herramienta de Edición Web Offline',
    skills: ['Browser extensions', 'Offline-first architecture', 'Local AI models'],
    premium: true,
  },
  {
    id: 'noia-16',
    title: 'Matriz Combinatoria: 1000 Webs Automatizadas',
    description: 'Cruza 10 modelos de arquitectura con 100 verticales de datos para generar 1000+ micro-sites viables.',
    module: 'web-architecture',
    level: 'master',
    duration: '8 horas',
    emoji: '🔀',
    color: 'from-cyan-500 to-blue-600',
    topics: ['Modelos de arquitectura', 'Verticales de nicho', 'Matriz combinatoria', 'Micro-sites', 'Set & Forget'],
    source: '1000 Self-Managed Traffic-Generating Websites',
    skills: ['Combinatorial thinking', 'Niche identification', 'Automated site generation'],
    premium: true,
  },

  // === ARTE GENERATIVO (del archivo "Laboratorio de Arte Generativo Noiacore") ===
  {
    id: 'noia-17',
    title: 'Shaders WebGL: Silk, Plasma, Grid-Warp',
    description: 'Motor armónico real con 6 shaders compilados en vivo. Intervalos justos, ángulo áureo y hash multiplicativo.',
    module: 'generative-art',
    level: 'advanced',
    duration: '6 horas',
    emoji: '🌊',
    color: 'from-teal-500 to-emerald-600',
    topics: ['Shaders WebGL', 'Silk effect', 'Plasma rendering', 'Grid-warp', 'Noise-flow', 'Vortex', 'Aurora'],
    source: 'Laboratorio de Arte Generativo Noiacore',
    skills: ['WebGL', 'GLSL shaders', 'Generative algorithms'],
    premium: true,
  },
  {
    id: 'noia-18',
    title: 'Motor Armónico: 13 Intervalos Justos',
    description: 'Sistema de generación basado en armonía musical: intervalos justos aplicados a arte visual y paletas HSL.',
    module: 'generative-art',
    level: 'master',
    duration: '5 horas',
    emoji: '🎵',
    color: 'from-teal-500 to-emerald-600',
    topics: ['Intervalos justos', 'Ángulo áureo', 'Hash multiplicativo', 'Paletas HSL', 'Generación autónoma'],
    source: 'Laboratorio de Arte Generativo Noiacore',
    skills: ['Harmonic generation', 'HSL color systems', 'Autonomous art'],
    premium: true,
  },

  // === COMUNIDAD (del archivo "Aumentar Participación Comunitaria") ===
  {
    id: 'noia-19',
    title: 'Banco de Habilidades Vecinal',
    description: 'Sistema de intercambio no monetario: catálogo de habilidades, micro-proyectos de 30 días, reciprocidad vecinal.',
    module: 'community',
    level: 'foundation',
    duration: '3 horas',
    emoji: '🤝',
    color: 'from-indigo-500 to-violet-600',
    topics: ['Intercambio no monetario', 'Mapeo de habilidades', 'Micro-proyectos', 'Ciclos de 30 días', 'Reciprocidad'],
    source: 'Aumentar Participación Comunitaria',
    skills: ['Community building', 'Skill banking', 'Project management'],
    premium: false,
  },
  {
    id: 'noia-20',
    title: 'OMNICORE: Arquitectura de Sistema Total',
    description: 'Sistema integral: identidad, seguridad, productividad, automatización. Blueprint completo del ecosistema.',
    module: 'community',
    level: 'master',
    duration: '10 horas',
    emoji: '🔮',
    color: 'from-indigo-500 to-violet-600',
    topics: ['Arquitectura de sistema', 'Identidad de marca', 'Seguridad', 'Automatización', 'Productividad', 'Escalabilidad'],
    source: 'OMNICORE Sistema Total',
    skills: ['System architecture', 'Brand identity', 'Automation design'],
    premium: true,
  },
];

export function getNoiaStats() {
  const byModule: Record<string, number> = {};
  const byLevel: Record<string, number> = { foundation: 0, intermediate: 0, advanced: 0, master: 0 };
  let premium = 0;
  NOIA_COURSES.forEach((c) => {
    byModule[c.module] = (byModule[c.module] || 0) + 1;
    byLevel[c.level]++;
    if (c.premium) premium++;
  });
  return { total: NOIA_COURSES.length, byModule, byLevel, premium };
}

console.log('NO.IA_CORE courses:', NOIA_COURSES.length);
