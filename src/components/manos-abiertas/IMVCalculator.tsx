"use client";
import { useState, type FormEvent } from "react";
import {
  IMV_2026_HOUSEHOLDS, IMV_OFFICIAL_INFORMATION_URL,
  IMV_OFFICIAL_SIMULATOR_URL, compareImvReference2026,
  type ImvComparison, type ImvHouseholdId,
} from "@/lib/imv-reference";

const euros = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

/**
 * Orientación de lectura fácil: no solicita datos identificativos, no usa API,
 * no calcula prestación ni declara si existe derecho al Ingreso Mínimo Vital.
 */
export default function IMVCalculator() {
  const [household, setHousehold] = useState<ImvHouseholdId>("one-adult");
  const [annualIncome, setAnnualIncome] = useState("");
  const [comparison, setComparison] = useState<ImvComparison | null>(null);
  const [error, setError] = useState("");

  function handleCalculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setComparison(null);
    if (annualIncome.trim() === "") {
      setError("Introduce los ingresos computables anuales estimados del hogar.");
      return;
    }
    try {
      setComparison(compareImvReference2026(household, Number(annualIncome)));
    } catch {
      setError("Introduce un importe anual válido, igual o superior a cero.");
    }
  }

  return (
    <section className="space-y-5" aria-labelledby="imv-title">
      <h3 id="imv-title" className="text-lg font-semibold">IMV · Consulta orientativa 2026</h3>
      <p className="text-sm text-gray-700">
        Consulta una referencia económica oficial de 2026 según el tipo de hogar.
        La comparación <strong>no verifica requisitos, no calcula una prestación y no confirma ni descarta el derecho al IMV</strong>.
        La Seguridad Social valora ingresos computables, patrimonio, residencia y situación familiar.
      </p>
      <p className="text-sm text-gray-600" id="imv-privacy">
        Los datos introducidos se procesan en este navegador. Esta herramienta no solicita DNI, nombre ni dirección.
        Introduce ingresos anuales aproximados de 2025 sólo para orientarte; la Administración utiliza sus propias reglas de cómputo.
      </p>
      <form onSubmit={handleCalculate} className="space-y-4" noValidate>
        <div>
          <label htmlFor="imv-household" className="block text-sm font-medium mb-2">Tipo de unidad de convivencia</label>
          <select id="imv-household" value={household}
            onChange={(e) => { setHousehold(e.target.value as ImvHouseholdId); setComparison(null); setError(""); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg">
            {IMV_2026_HOUSEHOLDS.map(group =>
              <option key={group.id} value={group.id}>{group.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="imv-annual-income" className="block text-sm font-medium mb-2">
            Ingresos anuales aproximados del hogar en 2025 (€)
          </label>
          <input id="imv-annual-income" type="number" inputMode="decimal"
            min="0" max="100000000" step="0.01" required value={annualIncome}
            aria-describedby="imv-privacy"
            onChange={(e) => { setAnnualIncome(e.target.value); setComparison(null); setError(""); }}
            placeholder="Ejemplo: 8000" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
        </div>
        <button type="submit"
          className="w-full bg-red-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-800">
          Comparar con referencia oficial 2026
        </button>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </form>
      {comparison && <div role="status" aria-live="polite" className="rounded-lg border border-gray-300 p-4 space-y-2">
        <h4 className="font-semibold">Resultado de comparación, no de elegibilidad</h4>
        <p>Referencia mensual publicada para este hogar: <strong>{euros(comparison.monthlyReference)}</strong>.</p>
        <p>Referencia anual: {euros(comparison.annualReference)}.</p>
        <p>Promedio de los ingresos anuales que has introducido: {euros(comparison.monthlyIncomeAverage)} al mes.</p>
        <p className="font-medium">
          {comparison.position === "below"
            ? "El promedio introducido queda por debajo de la referencia. Esto no garantiza que puedas cobrar el IMV."
            : comparison.position === "above"
              ? "El promedio introducido queda por encima de la referencia. Esto no equivale a una resolución oficial."
              : "El promedio introducido coincide aproximadamente con la referencia. Consulta el caso concreto con la Administración."}
        </p>
      </div>}
      <div className="text-sm space-y-2">
        <p><strong>Comprobación necesaria:</strong> el patrimonio, los ingresos computables y otros requisitos pueden modificar el resultado. Existen reglas específicas y complementos, incluido el de ayuda a la infancia.</p>
        <p>
          <a href={IMV_OFFICIAL_SIMULATOR_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
            Abrir el servicio oficial del IMV
          </a>{" · "}
          <a href={IMV_OFFICIAL_INFORMATION_URL} target="_blank" rel="noopener noreferrer" className="underline">
            Consultar las cuantías y requisitos oficiales de 2026
          </a>
        </p>
      </div>
    </section>
  );
}
