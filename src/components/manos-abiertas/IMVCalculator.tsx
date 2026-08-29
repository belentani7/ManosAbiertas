'use client';

import { useState } from 'react';

interface IMVResult {
  rentaReferencia: number;
  limiteIngresos: number;
  cumple: boolean;
  mensaje: string;
}

const IPREM_2024 = 600;

const FAMILY_SIZES = [
  { label: '1 adulto', adultos: 1, menores: 0, monoparental: false },
  { label: '1 adulto + 1 menor', adultos: 1, menores: 1, monoparental: false },
  { label: '1 adulto monoparental + 1 menor', adultos: 1, menores: 1, monoparental: true },
  { label: '2 adultos', adultos: 2, menores: 0, monoparental: false },
  { label: '2 adultos + 1 menor', adultos: 2, menores: 1, monoparental: false },
  { label: '2 adultos + 2 menores', adultos: 2, menores: 2, monoparental: false },
  { label: '1 adulto monoparental + 2 menores', adultos: 1, menores: 2, monoparental: true },
];

export default function IMVCalculator() {
  const [familyType, setFamilyType] = useState(0);
  const [ingresos, setIngresos] = useState('');
  const [resultado, setResultado] = useState<IMVResult | null>(null);

  const calculate = () => {
    const family = FAMILY_SIZES[familyType];
    const { adultos, menores, monoparental } = family;

    // Fórmula oficial IMV 2024
    // Renta de referencia = IPREM * (1 + 0.3*(adultos-1) + 0.2*menores + (monoparental?0.22:0))
    let coeficiente = 1;
    coeficiente += (adultos - 1) * 0.3;
    coeficiente += menores * 0.2;
    coeficiente += monoparental ? 0.22 : 0;

    const rentaReferencia = Math.round(IPREM_2024 * coeficiente);
    const limiteIngresos = Math.round(rentaReferencia * 1.5);

    const ingresosNum = parseFloat(ingresos) || 0;
    const cumple = ingresosNum <= limiteIngresos;

    const mensaje = `Renta de referencia: ${rentaReferencia}€/mes (${rentaReferencia * 12}€/año)
Límite de ingresos: ${limiteIngresos}€/mes (${limiteIngresos * 12}€/año)
Tus ingresos: ${ingresosNum}€/mes

${cumple ? '✅ Cumples el requisito de ingresos' : '❌ Superas el límite de ingresos permitidos'}`;

    setResultado({
      rentaReferencia,
      limiteIngresos,
      cumple,
      mensaje,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Calculadora IMV 2024</h3>
      <p className="text-sm text-gray-600 mb-4">
        Calcula si cumples los requisitos de ingresos para el Ingreso Mínimo Vital 2024.
        La renta de referencia se calcula según tu unidad de convivencia.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de unidad familiar</label>
          <select
            value={familyType}
            onChange={(e) => setFamilyType(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
          >
            {FAMILY_SIZES.map((f, i) => (
              <option key={i} value={i}>{f.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ingresos mensuales netos (€)</label>
          <input
            type="number"
            value={ingresos}
            onChange={(e) => setIngresos(e.target.value)}
            placeholder="Ej: 800"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Calcular elegibilidad
        </button>
      </div>

      {resultado && (
        <div className={`mt-6 p-4 rounded-lg border ${resultado.cumple ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <h3 className="font-semibold mb-2">{resultado.cumple ? '✅ Cumples los requisitos' : '❌ No cumples los requisitos'}</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{resultado.mensaje}</pre>
        </div>
      )}
    </div>
  );
}