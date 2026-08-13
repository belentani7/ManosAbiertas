// Manos Abiertas - Practical Tools Data

// Document Checklist - trámites para inmigrantes en España
export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category: 'identification' | 'residence' | 'work' | 'health' | 'housing' | 'education' | 'banking';
  priority: 'essential' | 'recommended' | 'optional';
  steps: string[];
  link?: string;
  emoji: string;
}

export const DOCUMENT_CHECKLIST: DocumentItem[] = [
  {
    id: 'nie',
    title: 'NIE - Número de Identidad de Extranjero',
    description: 'Número único que te identifica como extranjero en España. Necesario para casi todo.',
    category: 'identification',
    priority: 'essential',
    emoji: '🆔',
    steps: [
      'Descarga el formulario EX-15 desde la web de extranjería',
      'Reúne: pasaporte vigente + fotocopia + justificante del motivo de la solicitud',
      'Paga la tasa 790/012 (10,71€) en cualquier banco',
      'Solicita cita previa en la Oficina de Extranjería',
      'Acude con toda la documentación en la fecha asignada',
    ],
    link: 'https://sede.administracionpublica.gob.es/icpplus/index.html',
  },
  {
    id: 'empadronamiento',
    title: 'Empadronamiento (Padrón Municipal)',
    description: 'Te registra como residente en tu ayuntamiento. Necesario para sanidad, ayudas y trámites.',
    category: 'identification',
    priority: 'essential',
    emoji: '🏠',
    steps: [
      'Reúne: pasaporte/NIE + contrato de alquiler o autorización del propietario',
      'Pide cita previa en tu ayuntamiento (online o presencial)',
      'Rellena el formulario de empadronamiento',
      'Acude con la documentación a la cita',
      'Recibe el volante de empadronamiento (válido inmediatamente)',
    ],
    link: 'https://sede.administracionpublica.gob.es/',
  },
  {
    id: 'tarjeta-sanitaria',
    title: 'Tarjeta Sanitaria Individual (TSI)',
    description: 'Te da acceso a la sanidad pública gratuita en España.',
    category: 'health',
    priority: 'essential',
    emoji: '🏥',
    steps: [
      'Consigue el certificado de empadronamiento',
      'Obtén el documento acreditativo del derecho a la asistencia sanitaria',
      'Acude a tu Centro de Salud más cercano',
      'Rellena la solicitud de tarjeta sanitaria',
      'Recibe tu TSI por correo en 10-15 días',
    ],
    link: 'https://www.sanidad.gob.es/',
  },
  {
    id: 'cuenta-bancaria',
    title: 'Cuenta Bancaria',
    description: 'Necesaria para cobrar nómina, alquilar, y casi todos los trámites. Hay cuentas sin comisiones.',
    category: 'banking',
    priority: 'essential',
    emoji: '🏦',
    steps: [
      'Reúne: NIE + pasaporte + justificante de domicilio (empadronamiento)',
      'Compara bancos con cuenta sin comisiones (BBVA, ING, Openbank)',
      'Pide cita o acude presencialmente a una sucursal',
      'Si eres no residente: pregunta por la "cuenta básica" (máximo 3€/mes)',
      'Activa la banca online y solicita Bizum',
    ],
    link: 'https://www.bde.es/',
  },
  {
    id: 'seguridad-social',
    title: 'Número de la Seguridad Social',
    description: 'Necesario para trabajar legalmente y cotizar.',
    category: 'work',
    priority: 'essential',
    emoji: '💳',
    steps: [
      'Consigue tu NIE',
      'Rellena el modelo TA-1 (solicitud de afiliación)',
      'Presenta en la Seguridad Social con DNI/NIE y contrato',
      'Recibe tu número de Seguridad Social (permanente)',
    ],
    link: 'https://sede.seg-social.es/',
  },
  {
    id: 'certificado-digital',
    title: 'Certificado Digital',
    description: 'Te permite hacer trámites online sin desplazarte. Muy recomendado.',
    category: 'identification',
    priority: 'recommended',
    emoji: '🔐',
    steps: [
      'Entra en la sede de la FNMT (fábrica nacional de moneda y timbre)',
      'Solicita el certificado de persona física',
      'Acude a una oficina de validación (ayuntamientos, oficinas FNMT)',
      'Descarga e instala el certificado en tu ordenador/navegador',
      'Configura Cl@ve para usar también desde el móvil',
    ],
    link: 'https://www.sede.fnmt.gob.es/',
  },
  {
    id: 'sepe',
    title: 'Inscripción en SEPE (Demandante de empleo)',
    description: 'Te registra como buscador de empleo y da acceso a prestaciones y cursos gratis.',
    category: 'work',
    priority: 'recommended',
    emoji: '💼',
    steps: [
      'Consigue NIE + Seguridad Social + empadronamiento',
      'Solicita cita previa en el SEPE online',
      'Acude con documentación y currículum',
      'Solicita la tarjeta de demandante de empleo',
    ],
    link: 'https://sede.sepe.es/',
  },
  {
    id: 'movil',
    title: 'Línea Móvil (prepago o contrato)',
    description: 'Necesario para recibir citaciones, códigos SMS y estar localizable.',
    category: 'identification',
    priority: 'essential',
    emoji: '📱',
    steps: [
      'Compara operadores low-cost (Digi, Lowi, Finetwork, Simyo)',
      'Elige prepago si no tienes aún nómina',
      'Compra una SIM en cualquier establecimiento o online',
      'Activa con tu NIE y pasaporte',
    ],
  },
];

// Cost of Living by city (monthly, single person, 2024 estimates)
export interface CityCost {
  id: string;
  city: string;
  region: string;
  flag: string;
  rent: number; // habitación en piso compartido
  food: number; // alimentación básica
  transport: number; // abono mensual
  utilities: number; // luz, agua, internet
  total: number; // total mínimo mensual
}

export const CITY_COSTS: CityCost[] = [
  { id: 'madrid', city: 'Madrid', region: 'Comunidad de Madrid', flag: '🏙️', rent: 450, food: 250, transport: 54, utilities: 80, total: 834 },
  { id: 'barcelona', city: 'Barcelona', region: 'Catalunya', flag: '🏖️', rent: 480, food: 260, transport: 40, utilities: 80, total: 860 },
  { id: 'valencia', city: 'Valencia', region: 'Comunitat Valenciana', flag: '🌴', rent: 350, food: 220, transport: 40, utilities: 70, total: 680 },
  { id: 'sevilla', city: 'Sevilla', region: 'Andalucía', flag: '☀️', rent: 320, food: 220, transport: 35, utilities: 70, total: 645 },
  { id: 'malaga', city: 'Málaga', region: 'Andalucía', flag: '🌊', rent: 380, food: 230, transport: 35, utilities: 70, total: 715 },
  { id: 'zaragoza', city: 'Zaragoza', region: 'Aragón', flag: '🌉', rent: 300, food: 200, transport: 35, utilities: 65, total: 600 },
  { id: 'bilbao', city: 'Bilbao', region: 'Euskadi', flag: '⛰️', rent: 380, food: 240, transport: 45, utilities: 75, total: 740 },
  { id: 'murcia', city: 'Murcia', region: 'Región de Murcia', flag: '🍊', rent: 280, food: 200, transport: 30, utilities: 65, total: 575 },
  { id: 'palma', city: 'Palma', region: 'Illes Balears', flag: '🏝️', rent: 450, food: 260, transport: 40, utilities: 75, total: 825 },
  { id: 'granada', city: 'Granada', region: 'Andalucía', flag: '🏔️', rent: 280, food: 200, transport: 35, utilities: 65, total: 580 },
];

// Currency conversion rates (approximate, 2024) - 1 EUR = X
export const CURRENCY_RATES: { code: string; name: string; flag: string; rate: number }[] = [
  { code: 'MAD', name: 'Dirham marroquí', flag: '🇲🇦', rate: 10.85 },
  { code: 'RON', name: 'Leu rumano', flag: '🇷🇴', rate: 4.97 },
  { code: 'CNY', name: 'Yuan chino', flag: '🇨🇳', rate: 7.85 },
  { code: 'INR', name: 'Rupia india', flag: '🇮🇳', rate: 90.5 },
  { code: 'PEN', name: 'Sol peruano', flag: '🇵🇪', rate: 4.05 },
  { code: 'COP', name: 'Peso colombiano', flag: '🇨🇴', rate: 4250 },
  { code: 'BRL', name: 'Real brasileño', flag: '🇧🇷', rate: 5.45 },
  { code: 'ARS', name: 'Peso argentino', flag: '🇦🇷', rate: 950 },
  { code: 'VES', name: 'Bolívar venezolano', flag: '🇻🇪', rate: 40.5 },
  { code: 'UAH', name: 'Grivna ucraniana', flag: '🇺🇦', rate: 42.5 },
  { code: 'RUB', name: 'Rublo ruso', flag: '🇷🇺', rate: 100.5 },
  { code: 'TRY', name: 'Lira turca', flag: '🇹🇷', rate: 35.5 },
  { code: 'DZD', name: 'Dinar argelino', flag: '🇩🇿', rate: 145 },
  { code: 'EGP', name: 'Libra egipcia', flag: '🇪🇬', rate: 51.5 },
  { code: 'MXN', name: 'Peso mexicano', flag: '🇲🇽', rate: 20.5 },
  { code: 'BOB', name: 'Boliviano', flag: '🇧🇴', rate: 7.5 },
  { code: 'HNL', name: 'Lempira hondureño', flag: '🇭🇳', rate: 26.5 },
  { code: 'PKR', name: 'Rupia pakistaní', flag: '🇵🇰', rate: 305 },
  { code: 'NGN', name: 'Naira nigeriana', flag: '🇳🇬', rate: 1650 },
  { code: 'GHS', name: 'Cedi ghanés', flag: '🇬🇭', rate: 16.5 },
];

// Gamification badges
export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  condition: (stats: { lessonsCompleted: number; hasCV: boolean; favoritesCount: number; hasCoverLetter: boolean }) => boolean;
}

export const GAMIFICATION_BADGES: Badge[] = [
  {
    id: 'first-step',
    title: 'Primer paso',
    description: 'Completa tu primera lección',
    emoji: '👣',
    condition: (s) => s.lessonsCompleted >= 1,
  },
  {
    id: 'ai-explorer',
    title: 'Explorador IA',
    description: 'Empieza un curso de IA',
    emoji: '🤖',
    condition: (s) => s.lessonsCompleted >= 1,
  },
  {
    id: 'cv-created',
    title: 'CV Creado',
    description: 'Crea tu currículum',
    emoji: '📝',
    condition: (s) => s.hasCV,
  },
  {
    id: 'letter-written',
    title: 'Carta lista',
    description: 'Genera una carta de presentación',
    emoji: '✉️',
    condition: (s) => s.hasCoverLetter,
  },
  {
    id: 'collector',
    title: 'Coleccionista',
    description: 'Guarda 5 recursos en favoritos',
    emoji: '⭐',
    condition: (s) => s.favoritesCount >= 5,
  },
  {
    id: 'ai-master',
    title: 'Maestro IA',
    description: 'Completa 10 lecciones',
    emoji: '🎓',
    condition: (s) => s.lessonsCompleted >= 10,
  },
  {
    id: 'expert',
    title: 'Experto',
    description: 'Completa 25 lecciones',
    emoji: '🏆',
    condition: (s) => s.lessonsCompleted >= 25,
  },
  {
    id: 'mentor',
    title: 'Mentor',
    description: 'Completa 50 lecciones',
    emoji: '👑',
    condition: (s) => s.lessonsCompleted >= 50,
  },
];
