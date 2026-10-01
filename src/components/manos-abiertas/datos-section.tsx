'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import { useTheme } from 'next-themes';
import { getTranslation } from '@/i18n/translations';
import { useAppStore } from '@/stores/app-store';

/* ─── types ─── */
interface DataRecord {
  fuente?: string;
  indicador?: string;
  pais?: string;
  country?: string;
  year?: number;
  value?: number | null;
  titulo?: string;
  url?: string;
  resumen?: string;
  [key: string]: unknown;
}

/* ─── palette ─── */
const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#d97706', '#7c3aed', '#0891b2', '#be185d', '#65a30d', '#ea580c'];

/* ─── helpers ─── */
function useOpenData(file: string) {
  const [data, setData] = useState<DataRecord[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/datos/${file}`)
      .then((r) => r.json())
      .then((d) => setData(Array.isArray(d) ? d : []))
      .catch(() => setError(true));
  }, [file]);

  return { data, error };
}

/* ─── Loading skeleton ─── */
function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-muted rounded w-1/3" />
      <div className="h-64 bg-muted rounded" />
    </div>
  );
}

/* ─── Empleo chart ─── */
function EmpleoChart({ lang }: { lang: string }) {
  const { data, error } = useOpenData('empleo-y-paro.json');
  if (error) return <p className="text-sm text-muted-foreground">Datos no disponibles</p>;
  if (!data) return <Skeleton />;

  const byCountry = Object.entries(
    data.reduce<Record<string, number[]>>((acc, r) => {
      if (r.value != null && r.pais) {
        acc[r.pais] = acc[r.pais] || [];
        acc[r.pais].push(r.value as number);
      }
      return acc;
    }, {})
  ).map(([pais, vals]) => ({
    pais,
    valor: +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1),
  })).sort((a, b) => b.valor - a.valor);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={byCountry} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
        <XAxis dataKey="pais" tick={{ fontSize: 11 }} angle={-40} textAnchor="end" interval={0} />
        <YAxis unit="%" tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v: number) => [`${v}%`, 'Desempleo medio']} />
        <Bar dataKey="valor" name="Desempleo %" radius={[4, 4, 0, 0]}>
          {byCountry.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─── Educación chart ─── */
function EducacionChart() {
  const { data, error } = useOpenData('educacion-y-formacion.json');
  if (error) return <p className="text-sm text-muted-foreground">Datos no disponibles</p>;
  if (!data) return <Skeleton />;

  const processed = data
    .filter((r) => r.value != null && r.pais && r.year)
    .sort((a, b) => (a.year ?? 0) - (b.year ?? 0))
    .map((r) => ({ pais: r.pais!, año: String(r.year), valor: +(r.value as number).toFixed(1) }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={processed} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
        <XAxis dataKey="pais" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
        <YAxis unit="%" tick={{ fontSize: 11 }} />
        <Tooltip formatter={(v: number) => [`${v}%`, 'Matrícula terciaria']} />
        <Bar dataKey="valor" name="Matrícula %" radius={[4, 4, 0, 0]}>
          {processed.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─── Contexto UE chart ─── */
function ContextoUEChart() {
  const { data, error } = useOpenData('contexto-demografico-ue.json');
  if (error) return <p className="text-sm text-muted-foreground">Datos no disponibles</p>;
  if (!data) return <Skeleton />;

  const populations = data
    .filter((r) => r.indicador === 'Población total' && r.value != null)
    .map((r) => ({
      pais: r.pais ?? r.country ?? 'Desconocido',
      millones: +((r.value as number) / 1_000_000).toFixed(1),
    }))
    .sort((a, b) => b.millones - a.millones)
    .slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={populations} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
        <XAxis type="number" unit="M" tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="pais" tick={{ fontSize: 11 }} width={80} />
        <Tooltip formatter={(v: number) => [`${v} M`, 'Población']} />
        <Bar dataKey="millones" name="Población (M)" radius={[0, 4, 4, 0]}>
          {populations.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─── Salud chart ─── */
function SaludChart() {
  const { data, error } = useOpenData('salud-publica.json');
  if (error) return <p className="text-sm text-muted-foreground">Datos no disponibles</p>;
  if (!data) return <Skeleton />;

  const articles = data.filter((r) => r.fuente === 'PubMed' && r.titulo);
  const worldBank = data
    .filter((r) => r.fuente === 'World Bank' && r.value != null)
    .map((r) => ({ pais: r.pais!, valor: +(r.value as number).toFixed(1), indicador: r.indicador }));

  return (
    <div className="space-y-6">
      {worldBank.length > 0 && (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={worldBank} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
            <XAxis dataKey="pais" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" interval={0} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [v, 'Valor']} />
            <Bar dataKey="valor" name="Indicador" radius={[4, 4, 0, 0]} fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      )}
      {articles.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
            Artículos PubMed recientes
          </h4>
          <ul className="space-y-2">
            {articles.slice(0, 5).map((a, i) => (
              <li key={i} className="text-sm border-l-2 border-primary/30 pl-3">
                {a.url ? (
                  <a href={a.url as string} target="_blank" rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline">
                    {a.titulo}
                  </a>
                ) : (
                  <span className="font-medium">{a.titulo}</span>
                )}
                {a.resumen && <p className="text-muted-foreground mt-0.5 line-clamp-2">{a.resumen as string}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Derechos chart ─── */
function DerechosChart() {
  const { data, error } = useOpenData('derechos-y-asilo.json');
  if (error) return <p className="text-sm text-muted-foreground">Datos no disponibles</p>;
  if (!data) return <Skeleton />;

  const migrant = data.filter((r) => r.indicador?.includes('migrante') && r.value != null);
  const references = data.filter((r) => r.fuente === 'BOE' || r.fuente === 'CURIA');

  return (
    <div className="space-y-6">
      {migrant.length > 0 && (
        <div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={migrant} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis unit="%" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`${(+v).toFixed(2)}%`, 'Stock migrante']} />
              <Bar dataKey="value" name="Stock migrante %" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-1">
            Fuente: World Bank — SM.POP.TOTL.ZS (% pop. internacional en España)
          </p>
        </div>
      )}
      {references.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
            Referencias legales
          </h4>
          <ul className="space-y-2">
            {references.map((r, i) => (
              <li key={i} className="text-sm border-l-2 border-primary/30 pl-3">
                <span className="font-medium text-primary">[{r.fuente}]</span>{' '}
                {r.titulo as string}{' '}
                {r.url && <a href={r.url as string} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:underline">→ ver</a>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Tab definition ─── */
const TABS = [
  { id: 'empleo', label: '💼 Empleo', chart: EmpleoChart, src: 'World Bank', meta: 'Tasa de desempleo por país de origen' },
  { id: 'educacion', label: '🎓 Educación', chart: EducacionChart, src: 'World Bank', meta: 'Matrícula en educación terciaria (%)' },
  { id: 'contexto', label: '🌍 Contexto UE', chart: ContextoUEChart, src: 'Eurostat · CountriesNow', meta: 'Población de principales países de origen' },
  { id: 'salud', label: '🏥 Salud', chart: SaludChart, src: 'World Bank · PubMed', meta: 'Indicadores sanitarios e investigación reciente' },
  { id: 'derechos', label: '⚖️ Derechos', chart: DerechosChart, src: 'World Bank · BOE · CURIA', meta: 'Stock migrante España y normativa' },
] as const;

/* ─── Main section ─── */
export function DatosSection() {
  const { language } = useAppStore();
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('empleo');
  const { resolvedTheme } = useTheme();

  const ActiveTab = TABS.find((t) => t.id === tab)!;
  // Solo EmpleoChart usa lang; el union de TABS se estrecha a la firma comun.
  const Chart: (props: { lang: string }) => ReturnType<typeof EmpleoChart> = ActiveTab.chart;

  return (
    <section id="datos" className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            <span>📊</span>
            <span>Datos Abiertos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Estadísticas para la integración
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Datos en tiempo real de fuentes oficiales: World Bank, Eurostat, PubMed y más.
            Actualizado automáticamente, sin credenciales.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm rounded-t-md font-medium transition-colors
                ${tab === t.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Chart card */}
        <div className="rounded-xl border bg-card shadow-sm p-6 mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{ActiveTab.label.replace(/^[^ ]+ /, '')}</h3>
              <p className="text-sm text-muted-foreground">{ActiveTab.meta}</p>
            </div>
            <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
              {ActiveTab.src}
            </span>
          </div>
          <Chart lang={language} />
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-right">
          Datos cargados en vivo · Zero credenciales ·{' '}
          <a href="https://github.com/belentani7/ManosAbiertas/blob/main/scripts/refresh-open-data.py"
            target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            Ver script de actualización
          </a>
        </p>
      </div>
    </section>
  );
}
