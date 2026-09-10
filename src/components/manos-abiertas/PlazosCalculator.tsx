'use client';

import { useState } from 'react';

export function PlazosCalculator() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [tipoTramite, setTipoTramite] = useState<'arraigo-social' | 'arraigo-laboral' | 'arraigo-familiar' | 'nacionalidad'>('arraigo-social');
  const [resultado, setResultado] = useState<string | null>(null);

  const plazos: Record<string, { dias: number; descripcion: string }> = {
    'arraigo-social': { dias: 1095, descripcion: '3 años de residencia continuada + contrato de trabajo o medios de vida' },
    'arraigo-laboral': { dias: 730, descripcion: '2 años de residencia + relación laboral de 6 meses mínimo' },
    'arraigo-familiar': { dias: 0, descripcion: 'Sin requisito de tiempo si hay vínculo familiar directo con español/comunitario' },
    'nacionalidad': { dias: 3650, descripcion: '10 años residencia legal (2 años para iberoamericanos/sefardíes)' },
  };

  const calcular = () => {
    if (!fechaInicio) return;
    const inicio = new Date(fechaInicio);
    const hoy = new Date();
    const diffDias = Math.floor((hoy.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    const tramite = plazos[tipoTramite];
    const diasRestantes = Math.max(0, tramite.dias - diffDias);
    const años = Math.floor(diffDias / 365);
    const meses = Math.floor((diffDias % 365) / 30);
    const dias = diffDias % 30;

    let mensaje = `Días transcurridos: ${diffDias} (${años} años, ${meses} meses, ${dias} días)\n\n`;
    mensaje += `Trámite: ${tipoTramite.replace('-', ' ').toUpperCase()}\n`;
    mensaje += `Requisito: ${tramite.descripcion}\n\n`;

    if (diffDias >= tramite.dias) {
      mensaje += '✅ ¡Ya cumples el requisito de tiempo! Puedes iniciar el trámite.';
    } else {
      mensaje += `⏳ Te faltan ${diasRestantes} días (${Math.ceil(diasRestantes/30)} meses aprox).`;
    }
    setResultado(mensaje);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Calculadora de Plazos de Extranjería</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Fecha de llegada a España</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de trámite</label>
          <select
            value={tipoTramite}
            onChange={(e) => setTipoTramite(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
          >
            <option value="arraigo-social">Arraigo Social</option>
            <option value="arraigo-laboral">Arraigo Laboral</option>
            <option value="arraigo-familiar">Arraigo Familiar</option>
            <option value="nacionalidad">Nacionalidad Española</option>
          </select>
        </div>
        <button
          onClick={calcular}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Calcular plazos
        </button>
        {resultado && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
            <pre className="whitespace-pre-wrap">{resultado}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlazosCalculator;