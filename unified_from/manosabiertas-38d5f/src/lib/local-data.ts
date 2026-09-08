export const LOCAL_DATA_KEYS = [
  'manos-abiertas-store',
  'manos-abiertas-ai-progress',
  'manos-abiertas-office-progress',
  'manos-abiertas-cv',
  'manos-abiertas-cover-letter',
  'manos-abiertas-checklist',
  'manos-abiertas-favorites',
  'manos-abiertas-reminders',
  'manos-abiertas-recent',
  'manos-abiertas-chat',
  'manos-abiertas-community-drafts',
  'manos-accessibility',
  'manos-abiertas-onboarding',
  'manos-abiertas-personal-route',
] as const;

const EXPORT_VERSION = 1;

export type LocalDataExport = {
  app: 'manos-abiertas';
  version: number;
  exportedAt: string;
  data: Record<string, unknown>;
};

export function readLocalData(): Record<string, unknown> {
  if (typeof window === 'undefined') return {};

  return LOCAL_DATA_KEYS.reduce<Record<string, unknown>>((data, key) => {
    const value = localStorage.getItem(key);
    if (!value) return data;

    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value;
    }

    return data;
  }, {});
}

export function createLocalDataExport(): LocalDataExport {
  return {
    app: 'manos-abiertas',
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    data: readLocalData(),
  };
}

export function restoreLocalData(payload: unknown): number {
  if (typeof window === 'undefined' || !payload || typeof payload !== 'object') {
    throw new Error('Archivo de progreso no válido');
  }

  const candidate = payload as Partial<LocalDataExport>;
  if (candidate.app !== 'manos-abiertas' || !candidate.data || typeof candidate.data !== 'object') {
    throw new Error('El archivo no pertenece a Manos Abiertas');
  }

  let restored = 0;
  for (const key of LOCAL_DATA_KEYS) {
    if (!(key in candidate.data)) continue;
    const value = candidate.data[key];
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
    restored += 1;
  }

  return restored;
}

export function getLocalProgressSummary() {
  const data = readLocalData();
  const asArray = (key: string) => Array.isArray(data[key]) ? data[key] : [];

  return {
    aiLessons: asArray('manos-abiertas-ai-progress').length,
    officeLessons: asArray('manos-abiertas-office-progress').length,
    favorites: asArray('manos-abiertas-favorites').length,
    hasCV: Boolean(data['manos-abiertas-cv']),
    hasCoverLetter: Boolean(data['manos-abiertas-cover-letter']),
    reminders: asArray('manos-abiertas-reminders').length,
  };
}

export function downloadLocalData() {
  const blob = new Blob([JSON.stringify(createLocalDataExport(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `manos-abiertas-progreso-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
