// Manos Abiertas - Visual Process Infographics Data
// Step-by-step flowcharts for key immigration processes

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  duration?: string;
  documents?: string[];
  cost?: string;
  tip?: string;
  link?: string;
  warning?: string;
}

export interface ProcessGuide {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'documentation' | 'residence' | 'work' | 'family';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  color: string;
  steps: ProcessStep[];
}

export const PROCESS_GUIDES: ProcessGuide[] = [
  {
    id: 'nie-process',
    title: 'Cómo obtener tu NIE',
    description: 'El Número de Identidad de Extranjero es esencial para todo trámite en España',
    emoji: '🆔',
    category: 'documentation',
    difficulty: 'medium',
    estimatedTime: '2-4 semanas',
    color: 'from-amber-400 to-orange-500',
    steps: [
      {
        id: 'nie-1',
        stepNumber: 1,
        title: 'Descargar formulario EX-15',
        description: 'Entra en la sede electrónica de extranjería y descarga el modelo EX-15. Es gratuito.',
        duration: '10 min',
        documents: ['Pasaporte vigente'],
        tip: 'El EX-15 es para solicitar el NIE. Si ya tienes autorización de residencia, usa el EX-01.',
        link: 'https://sede.administracionpublica.gob.es/icpplus/index.html',
      },
      {
        id: 'nie-2',
        stepNumber: 2,
        title: 'Pagar la tasa 790/012',
        description: 'Descarga el modelo 790/012, llévalo a cualquier banco y paga la tasa (10,71€ en 2024).',
        duration: '1 día',
        cost: '10,71€',
        documents: ['Formulario 790/012', 'Dinero en efectivo o tarjeta'],
        tip: 'Algunos bancos permiten el pago online si tienes cuenta.',
      },
      {
        id: 'nie-3',
        stepNumber: 3,
        title: 'Solicitar cita previa',
        description: 'Entra en la web de cita previa de extranjería y pide cita para "NIE y certificados".',
        duration: '15 min',
        tip: 'Las citas se liberan a las 9:00. Sé rápido, se agotan en minutos.',
        warning: 'Sin cita no te atienden. No vayas sin haberla pedido.',
        link: 'https://sede.administracionpublica.gob.es/icpplus/index.html',
      },
      {
        id: 'nie-4',
        stepNumber: 4,
        title: 'Reunir documentación',
        description: 'Prepara: pasaporte original + fotocopia, formulario EX-15 relleno, justificante de pago 790/012, justificante del motivo (trabajo, estudios, etc.).',
        duration: '1 día',
        documents: ['Pasaporte original + copia', 'EX-15 relleno', 'Justificante 790/012 pagado', 'Justificante del motivo'],
      },
      {
        id: 'nie-5',
        stepNumber: 5,
        title: 'Acudir a la cita',
        description: 'Ve a la oficina de extranjería en la fecha y hora asignada. Entrega la documentación.',
        duration: '30 min - 1h',
        tip: 'Llega 15 minutos antes. Lleva el justificante de cita impreso.',
      },
      {
        id: 'nie-6',
        stepNumber: 6,
        title: 'Recoger tu NIE',
        description: 'Te entregan el certificado con tu NIE en el momento. El NIE es permanente y no caduca.',
        duration: 'Inmediato',
        tip: '¡Guarda el certificado! Lo necesitarás para todo: banco, trabajo, alquiler.',
      },
    ],
  },
  {
    id: 'arraigo-social',
    title: 'Arraigo Social',
    description: 'Permiso de residencia para quienes llevan 3+ años en España',
    emoji: '🌱',
    category: 'residence',
    difficulty: 'hard',
    estimatedTime: '6-12 meses',
    color: 'from-emerald-400 to-teal-500',
    steps: [
      {
        id: 'arr-1',
        stepNumber: 1,
        title: 'Verificar requisitos',
        description: 'Debes llevar 3 años residiendo en España (continuos) y tener vínculos familiares o contrato de trabajo.',
        duration: '1 día',
        documents: ['Empadronamientos históricos (3 años)', 'Pasaporte'],
        warning: 'Los 3 años deben ser continuos. Salidas breves (<90 días) no interrumpen.',
      },
      {
        id: 'arr-2',
        stepNumber: 2,
        title: 'Obtener certificados',
        description: 'Necesitas: certificado de empadronamiento, informe de arraigo del ayuntamiento, y certificado de antecedentes penales de tu país.',
        duration: '2-4 semanas',
        documents: ['Empadronamiento actual + histórico', 'Informe de arraigo social', 'Antecedentes penales del país de origen (legalizados)'],
        tip: 'Los antecedentes penales deben estar legalizados y traducidos si no están en español.',
      },
      {
        id: 'arr-3',
        stepNumber: 3,
        title: 'Conseguir contrato de trabajo',
        description: 'Necesitas un contrato firmado por un empleador con una duración mínima de 1 año.',
        duration: 'Variable',
        documents: ['Contrato de trabajo firmado', 'DNI/NIE del empleador'],
        warning: 'El empleador debe estar al corriente con Seguridad Social y Hacienda.',
        tip: 'Si tienes familia a cargo, el contrato puede ser de menor duración.',
      },
      {
        id: 'arr-4',
        stepNumber: 4,
        title: 'Rellenar EX-10',
        description: 'Descarga y rellena el modelo EX-10 (solicitud de arraigo social).',
        duration: '30 min',
        documents: ['Formulario EX-10'],
        link: 'https://sede.administracionpublica.gob.es/',
      },
      {
        id: 'arr-5',
        stepNumber: 5,
        title: 'Pagar tasa 790/052',
        description: 'Paga la tasa 790/052 en el banco (15,76€ en 2024).',
        duration: '1 día',
        cost: '15,76€',
      },
      {
        id: 'arr-6',
        stepNumber: 6,
        title: 'Presentar solicitud',
        description: 'Presenta toda la documentación en el registro de extranjería o por vía telemática.',
        duration: '2-3 h',
        tip: 'Haz fotocopias de TODO. Lleva el original y la copia.',
      },
      {
        id: 'arr-7',
        stepNumber: 7,
        title: 'Esperar resolución',
        description: 'El plazo legal de resolución es de 3 meses, pero puede tardar 6-12 meses.',
        duration: '3-12 meses',
        warning: 'No puedes trabajar hasta que se resuelva. Pero sí puedes esperar en España.',
      },
      {
        id: 'arr-8',
        stepNumber: 8,
        title: 'Solicitar TIE',
        description: 'Si te lo conceden, tienes 1 mes para solicitar la Tarjeta de Identidad de Extranjero (TIE).',
        duration: '2-4 semanas',
        cost: '15,45€',
      },
    ],
  },
  {
    id: 'empadronamiento',
    title: 'Empadronamiento',
    description: 'Registro en tu ayuntamiento. Esencial para sanidad y ayudas',
    emoji: '🏠',
    category: 'documentation',
    difficulty: 'easy',
    estimatedTime: '1-2 semanas',
    color: 'from-blue-400 to-cyan-500',
    steps: [
      {
        id: 'emp-1',
        stepNumber: 1,
        title: 'Reunir documentos',
        description: 'Necesitas: pasaporte/NIE, y justificante de vivienda (contrato de alquiler o autorización del propietario).',
        duration: '1 día',
        documents: ['Pasaporte o NIE', 'Contrato de alquiler O autorización firmada del propietario + su DNI'],
      },
      {
        id: 'emp-2',
        stepNumber: 2,
        title: 'Pedir cita previa',
        description: 'En la web de tu ayuntamiento, solicita cita para empadronamiento.',
        duration: '10 min',
        tip: 'Algunos ayuntamientos permiten empadronamiento sin cita (ventanilla).',
      },
      {
        id: 'emp-3',
        stepNumber: 3,
        title: 'Rellenar formulario',
        description: 'Descarga el formulario de empadronamiento o rellénalo en el ayuntamiento.',
        duration: '15 min',
        documents: ['Hoja de empadronamiento (varias personas pueden ir en una hoja)'],
      },
      {
        id: 'emp-4',
        stepNumber: 4,
        title: 'Acudir a la cita',
        description: 'Ve con toda la documentación al ayuntamiento en la fecha asignada.',
        duration: '20-40 min',
        tip: 'Si vais varias personas a empadronarse juntas, id todas en la misma cita.',
      },
      {
        id: 'emp-5',
        stepNumber: 5,
        title: 'Recibir volante',
        description: 'Te entregan el volante de empadronamiento. Es válido inmediatamente.',
        duration: 'Inmediato',
        tip: 'El volante caduca a los 3 meses. Pídelo nuevo cuando lo necesites (gratis).',
      },
    ],
  },
  {
    id: 'sanidad',
    title: 'Tarjeta Sanitaria',
    description: 'Acceso a la sanidad pública gratuita en España',
    emoji: '🏥',
    category: 'documentation',
    difficulty: 'easy',
    estimatedTime: '2-3 semanas',
    color: 'from-rose-400 to-pink-500',
    steps: [
      {
        id: 'san-1',
        stepNumber: 1,
        title: 'Tener empadronamiento',
        description: 'Necesitas el certificado de empadronamiento del ayuntamiento donde vives.',
        duration: 'Requisito previo',
        documents: ['Certificado de empadronamiento'],
      },
      {
        id: 'san-2',
        stepNumber: 2,
        title: 'Obtener derecho a sanidad',
        description: 'Si trabajas, tu empresa te da de alta en Seguridad Social. Si no, pide el "documento acreditativo del derecho".',
        duration: '1-2 días',
        documents: ['Número de Seguridad Social O documento acreditativo'],
        tip: 'La sanidad es universal en España. Aunque no trabajes, tienes derecho.',
      },
      {
        id: 'san-3',
        stepNumber: 3,
        title: 'Ir al Centro de Salud',
        description: 'Acude a tu Centro de Salud de referencia (según tu dirección).',
        duration: '30 min',
        documents: ['Empadronamiento', 'NIE/TIE', 'Documento acreditativo sanitario', 'Foto DNI'],
      },
      {
        id: 'san-4',
        stepNumber: 4,
        title: 'Rellenar solicitud',
        description: 'En el Centro de Salud te dan un formulario para solicitar la Tarjeta Sanitaria Individual (TSI).',
        duration: '15 min',
      },
      {
        id: 'san-5',
        stepNumber: 5,
        title: 'Elegir médico',
        description: 'Te asignan un médico de cabecera y pediatra (si tienes hijos).',
        duration: '5 min',
        tip: 'Puedes cambiar de médico si no estás conforme.',
      },
      {
        id: 'san-6',
        stepNumber: 6,
        title: 'Recibir TSI por correo',
        description: 'La tarjeta física llega a tu domicilio en 10-15 días. Mientras, puedes usar el volante.',
        duration: '10-15 días',
        tip: 'Guarda tu número de tarjeta. Lo necesitarás para citas médicas online.',
      },
    ],
  },
];

export const PROCESS_CATEGORIES = [
  { value: 'documentation', label: 'Documentación', emoji: '📄' },
  { value: 'residence', label: 'Residencia', emoji: '🏠' },
  { value: 'work', label: 'Trabajo', emoji: '💼' },
  { value: 'family', label: 'Familia', emoji: '👨‍👩‍👧' },
] as const;
