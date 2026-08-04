// Manos Abiertas - Legal Glossary for immigrants in Spain
// Simple explanations of complex legal/bureaucratic terms

export interface GlossaryTerm {
  id: string;
  term: string;
  simpleDefinition: string;
  example?: string;
  category: 'documentation' | 'work' | 'housing' | 'taxes' | 'legal' | 'health';
  emoji: string;
  relatedTerms?: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Documentation
  {
    id: 'nie',
    term: 'NIE',
    simpleDefinition: 'Número de Identidad de Extranjero. Es un número único que te identifica como extranjero en España. Lo necesitas para casi todo: trabajar, abrir cuenta bancaria, alquilar piso.',
    example: 'Como abrir una cuenta en el banco, te pedirán el NIE.',
    category: 'documentation',
    emoji: '🆔',
    relatedTerms: ['dni', 'tarjeta-residencia'],
  },
  {
    id: 'dni',
    term: 'DNI',
    simpleDefinition: 'Documento Nacional de Identidad. Es el carnet de identidad para ciudadanos españoles. Los extranjeros usan el NIE o la Tarjeta de Residencia.',
    category: 'documentation',
    emoji: '💳',
  },
  {
    id: 'tarjeta-residencia',
    term: 'Tarjeta de Residencia (TIE)',
    simpleDefinition: 'Tarjeta física de plástico que incluye tu foto, NIE y tipo de autorización. Es diferente del NIE (que es solo el número).',
    example: 'La TIE caduca, el NIE no.',
    category: 'documentation',
    emoji: '💳',
    relatedTerms: ['nie'],
  },
  {
    id: 'empadronamiento',
    term: 'Empadronamiento',
    simpleDefinition: 'Registro en el ayuntamiento de donde vives. Es gratuito y obligatorio. Te da derecho a sanidad, ayudas y servicios sociales. No afecta tu situación legal.',
    example: 'Sin empadronarte no puedes pedir cita médica.',
    category: 'documentation',
    emoji: '🏠',
  },
  {
    id: 'arrAIgo',
    term: 'Arraigo',
    simpleDefinition: 'Permiso de residencia para extranjeros que llevan tiempo viviendo en España sin papeles. Hay 3 tipos: arraigo social (3 años), laboral (2 años), familiar.',
    example: 'Si llevas 3 años en España y tienes vínculos familiares, puedes pedir arraigo social.',
    category: 'documentation',
    emoji: '🌱',
  },
  {
    id: 'certificado-digital',
    term: 'Certificado Digital',
    simpleDefinition: 'Como una firma electrónica que te permite hacer trámites por internet sin ir presencial. Lo emite la FNMT gratis.',
    example: 'Con el certificado digital puedes renovar el NIE desde casa.',
    category: 'documentation',
    emoji: '🔐',
  },
  // Work
  {
    id: 'smi',
    term: 'SMI (Salario Mínimo Interprofesional)',
    simpleDefinition: 'La cantidad mínima que debe pagar un empresario por un trabajo a tiempo completo. En 2024 son 1.134€/mes (14 pagas). En 2025 sube a 1.184€.',
    example: 'Si te ofrecen menos de 1.134€ por un trabajo a jornada completa, es ilegal.',
    category: 'work',
    emoji: '💰',
  },
  {
    id: 'contrato-indefinido',
    term: 'Contrato Indefinido',
    simpleDefinition: 'Contrato de trabajo sin fecha de fin. Es el más estable. Después de un periodo de prueba, es difícil que te despidan sin indemnización.',
    category: 'work',
    emoji: '📄',
  },
  {
    id: 'finiquito',
    term: 'Finiquito',
    simpleDefinition: 'Cantidad de dinero que recibes al terminar un trabajo. Incluye los días no disfrutados de vacaciones y la parte proporcional de pagas extras.',
    example: 'Si te vas de la empresa, tienen que pagarte el finiquito.',
    category: 'work',
    emoji: '💵',
  },
  {
    id: 'paro',
    term: 'Paro (Prestación por Desempleo)',
    simpleDefinition: 'Ayuda económica mensual si pierdes el trabajo y has cotizado al menos 360 días en los últimos 6 años. Lo gestiona el SEPE.',
    example: 'Para cobrar paro necesitas estar inscrito como demandante de empleo.',
    category: 'work',
    emoji: '失业',
  },
  {
    id: 'convenio-colectivo',
    term: 'Convenio Colectivo',
    simpleDefinition: 'Acuerdo entre empresarios y sindicatos que fija las condiciones laborales de un sector (hostelería, construcción...). Puede mejorar lo mínimo de la ley: más salario, más vacaciones.',
    example: 'El convenio de hostelería de Madrid fija el salario mínimo del sector.',
    category: 'work',
    emoji: '📋',
  },
  {
    id: 'irpf',
    term: 'IRPF',
    simpleDefinition: 'Impuesto sobre la Renta de las Personas Físicas. Es el impuesto que pagas por tus ingresos del trabajo. Se descuenta de tu nómina cada mes.',
    example: 'Si ganas 1.200€ al mes, tu IRPF puede ser unos 100€.',
    category: 'taxes',
    emoji: '📊',
  },
  {
    id: 'autonomo',
    term: 'Autónomo (RETA)',
    simpleDefinition: 'Persona que trabaja por cuenta propia. Debe darse de alta en el RETA y pagar una cuota mensual (aprox. 290€ en 2024) aunque no gane dinero.',
    example: 'Si tienes una tienda o eres taxista, eres autónomo.',
    category: 'work',
    emoji: '🛠️',
  },
  // Housing
  {
    id: 'fianza',
    term: 'Fianza (alquiler)',
    simpleDefinition: 'Cantidad de dinero (normalmente 1-2 meses de alquiler) que das al propietario al entrar en un piso. Te la devuelven al irte si el piso está en buen estado.',
    example: 'Si el alquiler es 800€, la fianza suele ser 800€ que recuperas al final.',
    category: 'housing',
    emoji: '🔑',
  },
  {
    id: 'lau',
    term: 'LAU (Ley de Arrendamientos Urbanos)',
    simpleDefinition: 'La ley que regula los alquileres de vivienda. Protege al inquilino: el propietario no puede echarte sin causa justa y el contrato dura mínimo 5 años.',
    category: 'housing',
    emoji: '📜',
  },
  {
    id: 'bono-social',
    term: 'Bono Social Eléctrico',
    simpleDefinition: 'Descuento en la factura de la luz para familias con bajos ingresos o vulnerables. Puede ser del 25% al 65% según el caso.',
    example: 'Si cobras el salario mínimo, puedes pedir el bono social.',
    category: 'housing',
    emoji: '💡',
  },
  // Health
  {
    id: 'tsi',
    term: 'TSI (Tarjeta Sanitaria Individual)',
    simpleDefinition: 'Tarjeta que te da acceso a la sanidad pública gratuita. Se pide en el centro de salud con el empadronamiento.',
    example: 'Con la TSI puedes ir al médico de cabecera gratis.',
    category: 'health',
    emoji: '🏥',
  },
  {
    id: 'centro-salud',
    term: 'Centro de Salud',
    simpleDefinition: 'Centro médico público de tu barrio. Atiende medicina general, pediatría y enfermería. Es gratuito con la TSI. Para ir, pides cita previa.',
    category: 'health',
    emoji: '🏥',
  },
  // Legal
  {
    id: 'asilo',
    term: 'Asilo / Protección Internacional',
    simpleDefinition: 'Protección que España da a personas que huyen de su país por persecución (guerra, violencia, ideología). Se pide en la Oficina de Asilo y Refugio.',
    example: 'Si huyes de una guerra, puedes pedir asilo en España.',
    category: 'legal',
    emoji: '🕊️',
  },
  {
    id: 'justicia-gratuita',
    term: 'Justicia Gratuita',
    simpleDefinition: 'Derecho a tener abogado gratis si tus ingresos son bajos. Cubre abogado de oficio para trámites legales, extranjería y otros procesos.',
    example: 'Para pedir asilo tienes derecho a abogado de oficio gratis.',
    category: 'legal',
    emoji: '⚖️',
  },
  {
    id: 'reagrupacion',
    term: 'Reagrupación Familiar',
    simpleDefinition: 'Permiso para traer a tu familia (cónyuge, hijos, padres) a España. Necesitas: residencia legal, ingresos suficientes y vivienda adecuada.',
    example: 'Si tienes NIE y trabajo, puedes pedir traer a tu esposa y hijos.',
    category: 'legal',
    emoji: '👨‍👩‍👧',
  },
  {
    id: 'nacionalidad',
    term: 'Nacionalidad Española',
    simpleDefinition: 'Derecho a ser ciudadano español. Se puede obtener por residencia (10 años, o 2 si eres iberoamericano), por opción o por nacimiento.',
    example: 'Si eres latinoamericano y llevas 2 años residiendo, puedes pedir la nacionalidad.',
    category: 'legal',
    emoji: '🇪🇸',
  },
  {
    id: 'ex-15',
    term: 'Formulario EX-15',
    simpleDefinition: 'Modelo de solicitud para pedir el NIE por primera vez. Se descarga gratis de internet y se presenta en extranjería.',
    category: 'documentation',
    emoji: '📝',
  },
  {
    id: 'ex-01',
    term: 'Formulario EX-01',
    simpleDefinition: 'Modelo de solicitud para autorización de residencia inicial. Se usa para pedir permiso de residencia no comunitario.',
    category: 'documentation',
    emoji: '📝',
  },
];

export const GLOSSARY_CATEGORIES = [
  { value: 'documentation', label: 'Documentación', emoji: '📄' },
  { value: 'work', label: 'Trabajo', emoji: '💼' },
  { value: 'housing', label: 'Vivienda', emoji: '🏠' },
  { value: 'taxes', label: 'Impuestos', emoji: '📊' },
  { value: 'health', label: 'Salud', emoji: '🏥' },
  { value: 'legal', label: 'Legal', emoji: '⚖️' },
] as const;
