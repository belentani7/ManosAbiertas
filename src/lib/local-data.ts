import { isPlainRecord, parseStoredJson } from './safe-content.ts';

const MAX_STORED_DOCUMENT_CHARS = 500_000;

export function getLocalStorageItem(key: string) {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function boundedString(value: unknown, maxLength: number) {
  return typeof value === 'string' && value.length <= maxLength ? value : '';
}

function boundedStrings(value: unknown, maxItems: number, maxLength: number) {
  return Array.isArray(value)
    ? value.slice(0, maxItems).filter((item): item is string => typeof item === 'string' && item.length <= maxLength)
    : [];
}

function validDateTime(value: unknown) {
  if (typeof value !== 'string' || value.length > 40) return '';
  return Number.isNaN(Date.parse(value)) ? '' : value;
}

export interface StoredExperience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface StoredEducation {
  id: string;
  title: string;
  institution: string;
  year: string;
  description: string;
}

export interface StoredCV {
  template: string;
  fullName: string;
  profession: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experiences: StoredExperience[];
  education: StoredEducation[];
  skills: string[];
  languages: string[];
  savedAt: string;
}

function normalizeExperiences(value: unknown): StoredExperience[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 20).flatMap((item) => {
    if (!isPlainRecord(item)) return [];
    const id = boundedString(item.id, 128);
    if (!id) return [];
    return [{
      id,
      position: boundedString(item.position, 200),
      company: boundedString(item.company, 200),
      startDate: boundedString(item.startDate, 40),
      endDate: boundedString(item.endDate, 40),
      description: boundedString(item.description, 3_000),
    }];
  });
}

function normalizeEducation(value: unknown): StoredEducation[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 20).flatMap((item) => {
    if (!isPlainRecord(item)) return [];
    const id = boundedString(item.id, 128);
    if (!id) return [];
    return [{
      id,
      title: boundedString(item.title, 200),
      institution: boundedString(item.institution, 200),
      year: boundedString(item.year, 40),
      description: boundedString(item.description, 2_000),
    }];
  });
}

export function readStoredCV(raw: string | null): StoredCV | null {
  const value = parseStoredJson(raw, null, isPlainRecord, MAX_STORED_DOCUMENT_CHARS);
  if (!value) return null;
  return {
    template: boundedString(value.template, 128),
    fullName: boundedString(value.fullName, 200),
    profession: boundedString(value.profession, 200),
    email: boundedString(value.email, 500),
    phone: boundedString(value.phone, 200),
    address: boundedString(value.address, 2_000),
    summary: boundedString(value.summary, 4_000),
    experiences: normalizeExperiences(value.experiences),
    education: normalizeEducation(value.education),
    skills: boundedStrings(value.skills, 30, 100),
    languages: boundedStrings(value.languages, 20, 80),
    savedAt: validDateTime(value.savedAt),
  };
}

export interface StoredCoverLetter {
  fullName: string;
  profession: string;
  companyName: string;
  jobTitle: string;
  experience: string;
  skills: string[];
  tone: 'formal' | 'friendly' | 'direct';
  letter: string;
  savedAt: string;
}

export function readStoredCoverLetter(raw: string | null): StoredCoverLetter | null {
  const value = parseStoredJson(raw, null, isPlainRecord, MAX_STORED_DOCUMENT_CHARS);
  if (!value) return null;
  return {
    fullName: boundedString(value.fullName, 120),
    profession: boundedString(value.profession, 160),
    companyName: boundedString(value.companyName, 160),
    jobTitle: boundedString(value.jobTitle, 160),
    experience: boundedString(value.experience, 4_000),
    skills: boundedStrings(value.skills, 20, 100),
    tone: value.tone === 'friendly' || value.tone === 'direct' ? value.tone : 'formal',
    letter: boundedString(value.letter, 50_000),
    savedAt: validDateTime(value.savedAt),
  };
}

export interface StoredChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function readStoredChat(raw: string | null): StoredChatMessage[] {
  const values = parseStoredJson(raw, [], (value): value is unknown[] => Array.isArray(value), 200_000);
  return values.slice(-20).filter((message): message is StoredChatMessage => (
    isPlainRecord(message)
      && typeof message.id === 'string'
      && message.id.length <= 128
      && (message.role === 'user' || message.role === 'assistant')
      && typeof message.content === 'string'
      && message.content.length <= 12_000
      && typeof message.timestamp === 'number'
      && Number.isFinite(message.timestamp)
      && message.timestamp >= 0
  ));
}

export function readStringSet(raw: string | null, maxItems = 1_000) {
  return new Set(parseStoredJson(raw, [], (value): value is string[] => (
    Array.isArray(value)
    && value.length <= maxItems
    && value.every((item) => typeof item === 'string' && item.length <= 256)
  )));
}

const LOCAL_DATA_PREFIXES = ['manos-abiertas-', 'manosabiertas-'];
const MAX_BACKUP_ENTRIES = 100;
const MAX_BACKUP_VALUE_CHARS = 500_000;

export function isAppLocalDataKey(key: string) {
  return key.length <= 128 && LOCAL_DATA_PREFIXES.some((prefix) => key.startsWith(prefix));
}

export function parseLocalDataBackup(value: unknown): Array<[string, string]> | null {
  if (!isPlainRecord(value)) return null;
  if ('version' in value && value.version !== 1) return null;
  const data = 'data' in value ? value.data : value;
  if (!isPlainRecord(data)) return null;
  const entries = Object.entries(data).filter(([key]) => isAppLocalDataKey(key));
  if (entries.length === 0 || entries.length > MAX_BACKUP_ENTRIES) return null;
  if (entries.some(([, item]) => typeof item !== 'string' || item.length > MAX_BACKUP_VALUE_CHARS)) return null;
  return entries as Array<[string, string]>;
}

type KeyValueStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function restoreLocalData(storage: KeyValueStorage, entries: Array<[string, string]>) {
  const previous = entries.map(([key]) => [key, storage.getItem(key)] as const);
  try {
    for (const [key, value] of entries) storage.setItem(key, value);
    return 'restored' as const;
  } catch {
    try {
      for (const [key] of entries) storage.removeItem(key);
      for (const [key, value] of previous) if (value !== null) storage.setItem(key, value);
      return 'rolled-back' as const;
    } catch {
      return 'rollback-failed' as const;
    }
  }
}
