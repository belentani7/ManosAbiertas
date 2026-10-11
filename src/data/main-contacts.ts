// Manos Abiertas — Contactos de instituciones reales con seguimiento humano.
// Fuente única de verdad para la sección de contactos: datos estáticos,
// sin dependencias de red ni de API, verificados por tests/core/main-contacts.test.mjs.
import { EMERGENCY_CONTACTS, type EmergencyContact } from './rights-guide';

/**
 * Servicios de emergencia con atención humana que SIEMPRE deben mostrarse
 * en el acceso principal de la sección de contactos.
 */
export const MAIN_EMERGENCY_IDS = [
  'emergencias-112',
  'urgencias-sanitarias-061',
  'violencia-genero-016',
  'prevencion-suicidio-024',
  'policia-nacional-091',
  'guardia-civil-062',
  'bomberos-080',
  'policia-local-092',
] as const;

export interface NgoContact {
  name: string;
  phone: string;
  desc: string;
  url: string;
  emoji: string;
}

export interface EmbassyContact {
  country: string;
  flag: string;
  phone: string;
  url: string;
}

/** Atención humanitaria y social: ONGs con teléfono y web oficiales. */
export const NGO_CONTACTS: readonly NgoContact[] = [
  { name: 'Cruz Roja Española', phone: '900 222 100', desc: 'Ayuda humanitaria y social', url: 'https://www2.cruzroja.es/', emoji: '🔴' },
  { name: 'CEAR', phone: '91 530 69 69', desc: 'Ayuda a refugiados', url: 'https://www.cear.es/', emoji: '🕊️' },
  { name: 'ACCEM', phone: '91 543 00 00', desc: 'Atención a inmigrantes', url: 'https://www.accem.es/', emoji: '🤝' },
  { name: 'Cáritas Española', phone: '914 440 600', desc: 'Ayuda social', url: 'https://www.caritas.es/', emoji: '✝️' },
  { name: 'Médicos del Mundo', phone: '914 212 012', desc: 'Atención sanitaria', url: 'https://www.medicodelmundo.org/', emoji: '🌍' },
  { name: 'Teléfono de la Esperanza', phone: '717 003 717', desc: 'Apoyo emocional 24h', url: 'https://www.telefonodelaesperanza.org/', emoji: '💛' },
  { name: 'Fundación ANAR', phone: '900 20 20 10', desc: 'Ayuda a niños y adolescentes', url: 'https://www.anar.org/', emoji: '👶' },
  { name: 'SOS Racismo', phone: '915 061 818', desc: 'Lucha contra el racismo', url: 'https://sosracismomadrid.es/', emoji: '✊' },
] as const;

/** Embajadas y consulados en España: canal directo con atención consular humana. */
export const EMBASSY_CONTACTS: readonly EmbassyContact[] = [
  { country: 'Marruecos', flag: '🇲🇦', phone: '+34 913 191 999', url: 'https://www.exteriores.gob.es/Embajados/rabat/' },
  { country: 'Rumanía', flag: '🇷🇴', phone: '+34 914 113 131', url: 'https://www.mae.ro/embajada-madrid' },
  { country: 'Colombia', flag: '🇨🇴', phone: '+34 91 700 73 00', url: 'https://espana.embajada.gov.co/' },
  { country: 'Ecuador', flag: '🇪🇨', phone: '+34 91 519 12 00', url: 'https://www.cancilleria.gob.ec/' },
  { country: 'China', flag: '🇨🇳', phone: '+34 915 194 242', url: 'http://es.china-embassy.gov.cn/' },
  { country: 'India', flag: '🇮🇳', phone: '+34 916 838 333', url: 'https://www.indianembassy.gov.in/' },
  { country: 'Bolivia', flag: '🇧🇴', phone: '+34 913 451 944', url: 'https://www.embol.esp.es/' },
  { country: 'Perú', flag: '🇵🇪', phone: '+34 915 436 124', url: 'https://www.embaperu.es/' },
  { country: 'Argentina', flag: '🇦🇷', phone: '+34 915 560 320', url: 'https://esem.mrecic.gov.ar/' },
  { country: 'Venezuela', flag: '🇻🇪', phone: '+34 914 117 025', url: 'https://www.embaven.es/' },
  { country: 'Ucrania', flag: '🇺🇦', phone: '+34 917 484 620', url: 'https://www.mfa.gov.ua/spain/' },
  { country: 'Brasil', flag: '🇧🇷', phone: '+34 914 266 644', url: 'https://www.gov.br/' },
] as const;

/**
 * Acceso principal a emergencias, derivado SIEMPRE del catálogo verificado
 * de rights-guide por id estable (nunca por coincidencia de texto).
 * El test main-contacts.test.mjs garantiza que los 8 contactos existen;
 * si algún día faltara uno, la UI degrada sin romperse.
 */
export const MAIN_EMERGENCY_CONTACTS: readonly EmergencyContact[] = MAIN_EMERGENCY_IDS.map(
  (id) => EMERGENCY_CONTACTS.find((c) => c.id === id),
).filter((contact): contact is EmergencyContact => contact !== undefined);

/** `tel:` listo para usar en móvil/fijo, sin espacios. */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}

/** Etiqueta corta para tarjetas: elimina el prefijo numérico del nombre. */
export function contactLabel(contact: Pick<EmergencyContact, 'name' | 'phone'>): string {
  const escaped = contact.phone.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const label = contact.name
    .replace(new RegExp(`^${escaped}\\s*[-—–:]?\\s*`), '')
    .trim();
  return label || contact.name;
}
