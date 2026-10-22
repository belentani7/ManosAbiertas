/**
 * Datos públicos del IMV para 2026. Fuente oficial:
 * https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8d06-4645-bde7-05374ee42ac7/serviciossobreimv?changeLanguage=es
 *
 * La renta garantizada es una cifra de referencia, NO una prueba de acceso.
 * Faltan revisión de ingresos computables, patrimonio, residencia, convivencia
 * y las excepciones de la normativa. Nunca inferir elegibilidad desde este módulo.
 */
export const IMV_OFFICIAL_INFORMATION_URL =
  "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8d06-4645-bde7-05374ee42ac7/serviciossobreimv?changeLanguage=es";
export const IMV_OFFICIAL_SIMULATOR_URL = "https://imv.seg-social.es/";

export const IMV_2026_HOUSEHOLDS = [
  { id: "one-adult", label: "Un adulto", monthlyReference: 733.60 },
  { id: "one-adult-one-child", label: "Un adulto y un menor", monthlyReference: 953.68 },
  { id: "one-adult-two-children", label: "Un adulto y dos menores", monthlyReference: 1173.76 },
  { id: "one-adult-single-parent-one-child", label: "Unidad monoparental reconocida: un adulto y un menor", monthlyReference: 1115.07 },
  { id: "one-adult-single-parent-two-children", label: "Unidad monoparental reconocida: un adulto y dos menores", monthlyReference: 1335.15 },
  { id: "two-adults", label: "Dos adultos", monthlyReference: 953.68 },
  { id: "two-adults-one-child", label: "Dos adultos y un menor", monthlyReference: 1173.76 },
  { id: "two-adults-two-children", label: "Dos adultos y dos menores", monthlyReference: 1393.84 },
  // Additional household rows published by the Seguridad Social for 2026.
  { id: "one-adult-three-children", label: "Un adulto y tres menores", monthlyReference: 1393.84 },
  { id: "one-adult-four-plus-children", label: "Un adulto y cuatro o más menores", monthlyReference: 1613.92 },
  { id: "two-adults-three-plus-children", label: "Dos adultos y tres o más menores", monthlyReference: 1613.92 },
  { id: "three-adults", label: "Tres adultos", monthlyReference: 1173.76 },
  { id: "three-adults-one-child", label: "Tres adultos y un menor", monthlyReference: 1393.84 },
  { id: "three-adults-two-plus-children", label: "Tres adultos y dos o más menores", monthlyReference: 1613.92 },
  { id: "four-adults", label: "Cuatro adultos", monthlyReference: 1393.84 },
  { id: "four-adults-one-child", label: "Cuatro adultos y un menor", monthlyReference: 1613.92 },
  { id: "one-adult-single-parent-three-children", label: "Unidad monoparental reconocida: un adulto y tres menores", monthlyReference: 1555.23 },
  { id: "one-adult-single-parent-four-plus-children", label: "Unidad monoparental reconocida: un adulto y cuatro o más menores", monthlyReference: 1775.31 },
] as const;

export type ImvHouseholdId = (typeof IMV_2026_HOUSEHOLDS)[number]["id"];
export type ImvComparison = {
  householdId: ImvHouseholdId;
  monthlyReference: number;
  annualReference: number;
  annualIncomeEntered: number;
  monthlyIncomeAverage: number;
  position: "below" | "equal" | "above";
};

/** Sólo comparación numérica con las referencias publicadas, nunca un dictamen. */
export function compareImvReference2026(
  householdId: ImvHouseholdId,
  annualIncome: number,
): ImvComparison {
  const group = IMV_2026_HOUSEHOLDS.find(item => item.id === householdId);
  if (!group) throw new RangeError("unknown_household");
  if (!Number.isFinite(annualIncome) || annualIncome < 0 || annualIncome > 100_000_000) {
    throw new RangeError("invalid_annual_income");
  }
  const average = annualIncome / 12;
  const rounded = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
  const monthlyIncomeAverage = rounded(average);
  const annualReference = rounded(group.monthlyReference * 12);
  const position = average < group.monthlyReference - 0.005 ? "below"
    : average > group.monthlyReference + 0.005 ? "above" : "equal";
  return { householdId, monthlyReference: group.monthlyReference, annualReference,
    annualIncomeEntered: annualIncome, monthlyIncomeAverage, position };
}
