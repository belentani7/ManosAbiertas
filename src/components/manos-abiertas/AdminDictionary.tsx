'use client';

import { useState } from 'react';

interface Definition {
  term: string;
  definition: string;
  category: string;
}

const definitions: Definition[] = [
  { term: 'NIE', definition: 'Número de Identidad de Extranjero. Documento que identifica a los extranjeros en España.', category: 'Documentos' },
  { term: 'TIE', definition: 'Tarjeta de Identidad de Extranjero. Documento físico que acredita la estancia legal.', category: 'Documentos' },
  { term: 'Arraigo Social', definition: 'Permiso de residencia por circunstancias excepcionales tras 3 años de residencia continuada en España.', category: 'Extranjería' },
  { term: 'Arraigo Laboral', definition: 'Permiso de residencia por haber trabajado 2 años en España de forma continuada.', category: 'Extranjería' },
  { term: 'Arraigo Familiar', definition: 'Permiso de residencia para familiares de ciudadanos españoles o de la UE.', category: 'Extranjería' },
  { term: 'Arraigo para la Formación', definition: 'Permiso de residencia para quienes se comprometen a formarse en ocupaciones demandadas.', category: 'Extranjería' },
  { term: 'Empadronamiento', definition: 'Inscripción en el padrón municipal. Obligatoria para todos los residentes.', category: 'Trámites' },
  { term: 'Empadronamiento Conjunto', definition: 'Inscripción conjunta de la unidad familiar en el padrón municipal.', category: 'Trámites' },
  { term: 'Tarjeta Sanitaria', definition: 'Documento que acredita el derecho a la asistencia sanitaria pública.', category: 'Salud' },
  { term: 'SIP', definition: 'Sistema de Información Poblacional. Número de identificación en el sistema sanitario.', category: 'Salud' },
  { term: 'INEM / SEPE', definition: 'Servicio Público de Empleo Estatal. Gestión de prestaciones por desempleo.', category: 'Empleo' },
  { term: 'Contrato de Trabajo', definition: 'Acuerdo escrito entre trabajador y empresario. Debe ser por escrito si dura más de 4 semanas.', category: 'Empleo' },
  { term: 'Contrato Indefinido', definition: 'Contrato sin fecha de finalización. Ofrece mayor estabilidad laboral.', category: 'Empleo' },
  { term: 'Contrato Temporal', definition: 'Contrato con fecha de inicio y fin determinados. Máximo 24 meses.', category: 'Empleo' },
  { term: 'Salario Mínimo Interprofesional (SMI)', definition: 'Salario mínimo legal que debe percibir un trabajador. En 2024: 1.134 €/mes en 14 pagas.', category: 'Empleo' },
  { term: 'Seguridad Social', definition: 'Sistema público de protección social. Cubre enfermedad, maternidad, jubilación, desempleo.', category: 'Empleo' },
  { term: 'Alta en Seguridad Social', definition: 'Comunicación obligatoria de la empresa a la TGSS al iniciar una relación laboral.', category: 'Empleo' },
  { term: 'Baja Médica', definition: 'Situación de incapacidad temporal. Derecho a prestación económica por enfermedad común o profesional.', category: 'Salud' },
  { term: 'Certificado de Empadronamiento', definition: 'Documento que acredita la residencia en un municipio.', category: 'Trámites' },
  { term: 'Volante de Empadronamiento', definition: 'Documento informativo con datos del padrón. No tiene validez administrativa.', category: 'Trámites' },
  { term: 'Nacionalidad Española', definition: 'Adquisición de la nacionalidad por residencia (10 años general, 2 años iberoamericanos).', category: 'Nacionalidad' },
  { term: 'Nacionalidad por Opción', definition: 'Para hijos de españoles de origen nacidos en España o hijos de padre/madre español.', category: 'Nacionalidad' },
  { term: 'Nacionalidad por Residencia', definition: '10 años residencia legal (2 años iberoamericanos, 5 años refugiados).', category: 'Nacionalidad' },
  { term: 'Reagrupación Familiar', definition: 'Derecho a traer a familiares (cónyuge, hijos <18 años, padres >65 a cargo).', category: 'Extranjería' },
  { term: 'Autorización de Regreso', definition: 'Permiso para salir y volver a España manteniendo la residencia.', category: 'Extranjería' },
  { term: 'Certificado de Residencia UE', definition: 'Para ciudadanos UE/EEE/Suiza. Válido 5 años. Solicitud en Oficina de Extranjería.', category: 'Extranjería' },
  { term: 'Tarjeta Sanitaria Europea', definition: 'Acceso a sanidad pública en la UE/EEE/Suiza. Gratuita. Válida 2 años.', category: 'Salud' },
];

export default function AdminDictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['Todas', 'Documentos', 'Extranjería', 'Empleo', 'Salud', 'Trámites', 'Nacionalidad'];
  const filtered = definitions.filter(d => {
    const matchesSearch = d.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Extranjería': return '🌍';
      case 'Empleo': return '💼';
      case 'Salud': return '🏥';
      case 'Documentos': return '📄';
      case 'Trámites': return '📋';
      case 'Nacionalidad': return '🇪🇸';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Buscar término..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat.toLowerCase() === 'todas' ? 'all' : cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3">
        {filtered.map((def) => (
          <div key={`${def.term}-${def.category}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getCategoryIcon(def.category)}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{def.term}</h3>
                <p className="text-sm text-gray-600 mt-1">{def.definition}</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium text-white rounded-full bg-red-600">
                  {def.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}