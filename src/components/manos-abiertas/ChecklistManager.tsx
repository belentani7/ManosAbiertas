'use client';

import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  category: string;
}

const checklists: Record<string, ChecklistItem[]> = {
  'arraigo-social': [
    { id: 'as-1', text: 'Certificado de empadronamiento colectivo (últimos 3 años)', done: false, category: 'Documentos' },
    { id: 'as-2', text: 'Certificados de empadronamiento históricos (3 años)', done: false, category: 'Documentos' },
    { id: 'as-3', text: 'Contrato de trabajo (1 año mínimo) / Informe de vida laboral', done: false, category: 'Empleo' },
    { id: 'as-4', text: 'Informe de inserción social (servicios sociales)', done: false, category: 'Informes' },
    { id: 'as-5', text: 'Pasaporte / NIE / TIE en vigor', done: false, category: 'Documentos' },
    { id: 'as-6', text: 'Certificado de antecedentes penales (España y país origen)', done: false, category: 'Documentos' },
    { id: 'as-7', text: 'Medios de vida propios (IPREM x 1.5) o contrato de trabajo', done: false, category: 'Económicos' },
  ],
  'arraigo-laboral': [
    { id: 'al-1', text: 'Contrato de trabajo de 1 año mínimo (6 meses si cotización alta)', done: false, category: 'Empleo' },
    { id: 'al-2', text: '2 años de residencia continuada en España', done: false, category: 'Residencia' },
    { id: 'al-3', text: 'Contrato de trabajo vigente (6 meses mínimo)', done: false, category: 'Empleo' },
    { id: 'al-4', text: 'Vida laboral actualizada (últimos 2 años)', done: false, category: 'Empleo' },
    { id: 'al-5', text: 'Cotizaciones mínimas (6 meses en últimos 2 años)', done: false, category: 'Empleo' },
    { id: 'al-6', text: 'Sin antecedentes penales (España y país origen)', done: false, category: 'Documentos' },
  ],
  'arraigo-familiar': [
    { id: 'af-1', text: 'Ser familiar de ciudadano español (cónyuge, hijos <21, padres >65)', done: false, category: 'Familia' },
    { id: 'af-2', text: 'Certificado de matrimonio / unión de hecho registrada', done: false, category: 'Documentos' },
    { id: 'af-3', text: 'Certificados de nacimiento / libro de familia', done: false, category: 'Documentos' },
    { id: 'af-4', text: 'Medios de vida del familiar reagrupante (IPREM x 1.5)', done: false, category: 'Económicos' },
    { id: 'af-5', text: 'Vivienda adecuada (informe técnico)', done: false, category: 'Vivienda' },
    { id: 'af-6', text: 'Certificado de antecedentes penales', done: false, category: 'Documentos' },
  ],
  'nacionalidad': [
    { id: 'nat-1', text: 'Residencia legal continuada (10 años / 2 años iberoamericanos)', done: false, category: 'Residencia' },
    { id: 'nat-2', text: 'Prueba CCSE (conocimientos constitucionales) aprobada', done: false, category: 'Exámenes' },
    { id: 'nat-3', text: 'Prueba DELE A2 (si no tienes título ESO español)', done: false, category: 'Exámenes' },
    { id: 'nat-4', text: 'Buena conducta cívica (certificado antecedentes penales)', done: false, category: 'Documentos' },
    { id: 'nat-5', text: 'Jura de fidelidad al Rey y Constitución', done: false, category: 'Trámites' },
  ],
  'visado-estudios': [
    { id: 've-1', text: 'Carta de admisión en centro autorizado (curso completo)', done: false, category: 'Estudios' },
    { id: 've-2', text: 'Medios económicos (IPREM x 100% mensual)', done: false, category: 'Económicos' },
    { id: 've-3', text: 'Seguro médico completo (sin copagos)', done: false, category: 'Salud' },
    { id: 've-4', text: 'Certificado de antecedentes penales (país origen + España)', done: false, category: 'Documentos' },
    { id: 've-5', text: 'Pasaporte vigente (vigencia > estancia)', done: false, category: 'Documentos' },
  ],
  'reagrupacion-familiar': [
    { id: 'rf-1', text: 'Residencia legal del reagrupante (1 año + renovación)', done: false, category: 'Residencia' },
    { id: 'rf-2', text: 'Vivienda adecuada (informe técnico)', done: false, category: 'Vivienda' },
    { id: 'rf-3', text: 'Medios económicos (IPREM x 1.5 + 50% por familiar)', done: false, category: 'Económicos' },
    { id: 'rf-4', text: 'Seguro médico público o privado (sin copagos)', done: false, category: 'Salud' },
    { id: 'rf-5', text: 'Certificados nacimiento / matrimonio (legalizados y apostillados)', done: false, category: 'Documentos' },
    { id: 'rf-6', text: 'Certificado antecedentes penales (país origen + España)', done: false, category: 'Documentos' },
  ],
};

export default function ChecklistManager() {
  const [activeTab, setActiveTab] = useState<'arraigo-social' | 'arraigo-laboral' | 'arraigo-familiar' | 'nacionalidad' | 'visado-estudios' | 'reagrupacion-familiar'>('arraigo-social');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const tabs = [
    { id: 'arraigo-social', label: 'Arraigo Social', icon: '🏠' },
    { id: 'arraigo-laboral', label: 'Arraigo Laboral', icon: '💼' },
    { id: 'arraigo-familiar', label: 'Arraigo Familiar', icon: '👨‍👩‍👧‍👦' },
    { id: 'nacionalidad', label: 'Nacionalidad', icon: '🇪🇸' },
    { id: 'visado-estudios', label: 'Visado Estudios', icon: '🎓' },
    { id: 'reagrupacion-familiar', label: 'Reagrupación', icon: '👨‍👩‍👧‍👦' },
  ] as const;

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progress = () => {
    const items = checklists[activeTab] || [];
    const done = Object.entries(checkedItems).filter(([_, v]) => v).length;
    const total = checklists[activeTab].length;
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const progressData = progress();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(checklists).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            {key.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Checklist: {activeTab.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{progressData.done} / {progressData.total} completados</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${progressData.percent}%` }}
              />
            </div>
            <span className="font-semibold text-green-600">{progressData.percent}%</span>
          </div>
        </div>

        <div className="space-y-3">
          {checklists[activeTab].map((item) => (
            <label
              key={item.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                checkedItems[item.id] ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'
              } border`}
              onClick={() => toggleItem(item.id)}
            >
              <input
                type="checkbox"
                checked={checkedItems[item.id] || false}
                onChange={() => toggleItem(item.id)}
                className="mt-1 h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-2 focus:ring-red-500 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${checkedItems[item.id] ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {item.text}
                </p>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0 ml-2">
                  {item.category}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}