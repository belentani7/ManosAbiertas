"use client";
import { useState, type FormEvent } from "react";
import {
  ARRAIGO_GUIDES, compareArraigoTwoYearMilestone,
  NATIONALITY_INFORMATION_URL, type ArraigoGuideId,
} from "@/lib/immigration-reference";

type GuideSelection = ArraigoGuideId | "nationality";

export default function PlazosCalculator() {
  const [track, setTrack] = useState<GuideSelection>("social");
  const [start, setStart] = useState("");
  const [outcome, setOutcome] = useState<ReturnType<typeof compareArraigoTwoYearMilestone> | null>(null);
  const [error, setError] = useState("");
  const guide = ARRAIGO_GUIDES.find(item => item.id === track);
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");

  function compare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(null); setError("");
    if (!guide) return;
    try {
      setOutcome(compareArraigoTwoYearMilestone(guide.id, start, today));
    } catch {
      setError("Introduce una fecha real que no sea posterior a hoy.");
    }
  }

  return (
    <section className="space-y-5" aria-labelledby="arraigo-title">
      <h3 id="arraigo-title" className="text-lg font-semibold">Orientación de extranjería · Normativa 2026</h3>
      <p className="text-sm text-gray-700">
        Esta herramienta señala únicamente un hito temporal de referencia.
        <strong> No verifica la permanencia legalmente computable ni confirma el derecho a solicitar una autorización.</strong>
        La fecha de llegada por sí sola no demuestra continuidad; los periodos de protección internacional y las ausencias pueden afectar al cómputo.
      </p>
      <div>
        <label htmlFor="arraigo-track" className="block text-sm font-medium mb-2">Información que necesitas consultar</label>
        <select id="arraigo-track" value={track}
          onChange={(event) => { setTrack(event.target.value as GuideSelection); setOutcome(null); setError(""); }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg">
          {ARRAIGO_GUIDES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
          <option value="nationality">Nacionalidad española por residencia</option>
        </select>
      </div>
      {guide ? (
        <>
          <p className="text-sm text-gray-700">
            La información oficial de {guide.label.toLowerCase()} señala, como regla general, dos años de permanencia continuada,
            sujetos a requisitos adicionales. {guide.important}
          </p>
          <form className="space-y-3" onSubmit={compare} noValidate>
            <label htmlFor="arraigo-start" className="block text-sm font-medium">
              Fecha orientativa de comienzo de la presencia en España
            </label>
            <input id="arraigo-start" type="date" value={start} max={today} required
              onChange={(event) => { setStart(event.target.value); setOutcome(null); setError(""); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <button type="submit" className="w-full bg-red-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-800">
              Consultar hito temporal aproximado
            </button>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          </form>
          {outcome && <div role="status" aria-live="polite" className="p-4 border border-gray-300 rounded-lg">
            <p>Fecha de referencia de dos años: <strong>{outcome.referenceDate}</strong>.</p>
            <p>{outcome.referenceDateReached
              ? "La fecha de referencia ha transcurrido. Esto no significa que reúnas los requisitos del permiso."
              : `Faltan aproximadamente ${outcome.remainingDays} días naturales hasta esa referencia. No es un plazo oficial de resolución.`}</p>
          </div>}
          <a href={guide.source} target="_blank" rel="noopener noreferrer" className="underline text-sm">
            Consultar la ficha oficial vigente del Ministerio de Migraciones
          </a>
        </>
      ) : (
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            La nacionalidad por residencia depende del inicio y continuidad de la <strong>residencia legal</strong>,
            no simplemente de la llegada a España. Existen plazos distintos (por ejemplo, la regla general
            de 10 años y supuestos de 2 años para determinados países de origen) y requisitos adicionales.
            No se puede calcular una fecha válida sin conocer el expediente.
          </p>
          <a href={NATIONALITY_INFORMATION_URL} target="_blank" rel="noopener noreferrer" className="underline">
            Consultar el artículo 22 del Código Civil en la web del Ministerio de Justicia
          </a>
        </div>
      )}
      <p className="text-xs text-gray-600">
        Servicio informativo gratuito. No se recopilan documentos ni se envían tus fechas a un servidor.
        Antes de presentar una solicitud, confirma la norma vigente y los detalles de tu caso con la administración o un profesional.
      </p>
    </section>
  );
}
