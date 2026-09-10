'use client';

import { useState } from 'react';

const GRADE_SYSTEMS = {
  spain: { name: 'España (0-10)', min: 0, max: 10, passing: 5 },
  usa: { name: 'EE.UU. (A-F)', grades: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'], passing: 'C' },
  france: { name: 'Francia (0-20)', min: 0, max: 20, passing: 10 },
  uk: { name: 'Reino Unido (A*-G)', grades: ['A*', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], passing: 'C' },
  germany: { name: 'Alemania (1-6)', min: 1, max: 6, passing: 4, reverse: true },
  mexico: { name: 'México (0-100)', min: 0, max: 100, passing: 60 },
  colombia: { name: 'Colombia (0-5)', min: 0, max: 5, passing: 3.0 },
  peru: { name: 'Perú (0-20)', min: 0, max: 20, passing: 11 },
  argentina: { name: 'Argentina (1-10)', min: 1, max: 10, passing: 6 },
  chile: { name: 'Chile (1.0-7.0)', min: 1.0, max: 7.0, passing: 4.0, step: 0.1 },
};

export default function GradeConverter() {
  const [fromSystem, setFromSystem] = useState<keyof typeof GRADE_SYSTEMS>('spain');
  const [toSystem, setToSystem] = useState<keyof typeof GRADE_SYSTEMS>('usa');
  const [inputGrade, setInputGrade] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    const from = GRADE_SYSTEMS[fromSystem];
    const to = GRADE_SYSTEMS[toSystem];
    const input = parseFloat(inputGrade);

    if (isNaN(input)) {
      setResult('Por favor, introduce una nota válida');
      return;
    }

    // Normalize to 0-1 scale based on source system
    let normalized: number;
    if ('grades' in from) {
      // Letter grade system (US, UK, Germany)
      const idx = from.grades.indexOf(inputGrade.toUpperCase());
      if (idx === -1) {
        setResult('Nota no válida para este sistema');
        return;
      }
      normalized = 1 - idx / (from.grades.length - 1);
    } else {
      // Numeric system
      normalized = (input - from.min) / (from.max - from.min);
    }

    // Convert to target system
    let result: string;
    if ('grades' in to) {
      const idx = Math.round((1 - normalized) * (to.grades.length - 1));
      result = to.grades[Math.max(0, Math.min(idx, to.grades.length - 1))];
    } else {
      const value = to.min + normalized * (to.max - to.min);
      const step = 'step' in to ? to.step : 1;
      result = Math.round(value / step) * step + '';
      if ('reverse' in to && to.reverse) {
        // Germany: 1 is best, 6 is worst
      }
    }

    setResult(
      `${from.name} → ${to.name}\n` +
      `${inputGrade} → ${result}\n\n` +
      `Escala origen: ${from.name} (${'min' in from ? `${from.min}-${from.max}` : from.grades.join(', ')})\n` +
      `Escala destino: ${to.name} (${'grades' in to ? to.grades.join(', ') : `${to.min}-${to.max}`})`
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Conversor de Notas Internacional</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Sistema de origen</label>
          <select
            value={fromSystem}
            onChange={(e) => setFromSystem(e.target.value as keyof typeof GRADE_SYSTEMS)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
          >
            {Object.entries(GRADE_SYSTEMS).map(([key, sys]) => (
              <option key={key} value={key}>{sys.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sistema de destino</label>
          <select
            value={toSystem}
            onChange={(e) => setToSystem(e.target.value as keyof typeof GRADE_SYSTEMS)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
          >
            {Object.entries(GRADE_SYSTEMS).map(([key, sys]) => (
              <option key={key} value={key}>{sys.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nota a convertir</label>
          <input
            type="text"
            value={inputGrade}
            onChange={(e) => setInputGrade(e.target.value)}
            placeholder="Ej: 7.5, 85, B+, 14/20..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={convert}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Convertir
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Resultado</h3>
          <pre className="whitespace-pre-wrap text-sm font-mono text-green-900">{result}</pre>
        </div>
      )}
    </div>
  );
}