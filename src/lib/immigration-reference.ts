/**
 * Solamente hitos temporales orientativos. No prueban permanencia continuada,
 * requisitos de residencia, antecedentes, contratos, integración ni expedientes.
 * Fuente oficial actualizada en abril 2026: Ministerio de Inclusión.
 */
export const ARRAIGO_GUIDES = [
  {
    id: "social",
    label: "Arraigo social",
    years: 2,
    source: "https://www.inclusion.gob.es/es/web/migraciones/w/autorizacion-residencia-temporal-por-circunstancias-excepcionales.-arraigo-social",
    important: "Además de la permanencia, se valoran vínculos familiares o integración social y otras condiciones.",
  },
  {
    id: "sociolaboral",
    label: "Arraigo sociolaboral",
    years: 2,
    source: "https://www.inclusion.gob.es/es/web/migraciones/w/29.-autorizacion-de-residencia-temporal-por-circunstancias-excepcionales.-arraigo-sociolaboral.",
    important: "Además de la permanencia, se necesitan contratos y demás requisitos previstos por la normativa.",
  },
] as const;
export type ArraigoGuideId = (typeof ARRAIGO_GUIDES)[number]["id"];
export const NATIONALITY_INFORMATION_URL =
  "https://www.mjusticia.gob.es/es/AreaTematica/DocumentacionPublicaciones/InstListDownload/Codigo_Civil.PDF";

function strictDate(value: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new RangeError("invalid_date");
  const date = new Date(value + "T00:00:00.000Z");
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new RangeError("invalid_date");
  }
  return date;
}

export function compareArraigoTwoYearMilestone(
  guideId: ArraigoGuideId, startIsoDate: string, nowIsoDate: string,
) {
  const guide = ARRAIGO_GUIDES.find(item => item.id === guideId);
  if (!guide) throw new RangeError("unknown_guide");
  const start = strictDate(startIsoDate);
  const now = strictDate(nowIsoDate);
  if (start.getTime() > now.getTime()) throw new RangeError("future_start");
  const milestone = new Date(Date.UTC(
    start.getUTCFullYear() + guide.years, start.getUTCMonth(), start.getUTCDate(),
  ));
  const remainingDays = Math.max(0, Math.ceil((milestone.getTime() - now.getTime()) / 86_400_000));
  return {
    referenceDate: milestone.toISOString().slice(0, 10),
    remainingDays,
    referenceDateReached: remainingDays === 0,
    source: guide.source,
  };
}
