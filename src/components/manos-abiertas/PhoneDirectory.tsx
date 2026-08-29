'use client';

import { useState } from 'react';

interface Contact {
  nombre: string;
  telefono: string;
  descripcion: string;
  categoria: string;
  disponible24h: boolean;
}

const contacts: Contact[] = [
  { nombre: 'Emergencias (112)', telefono: '112', descripcion: 'Emergencias generales (gratis, 24h, multilingüe)', categoria: 'Emergencias', disponible24h: true },
  { nombre: 'Violencia de Género (016)', telefono: '016', descripcion: 'Atención a víctimas (gratis, 24h, no deja rastro en factura)', categoria: 'Violencia de Género', disponible24h: true },
  { nombre: 'Salud Mental / Prevención Suicidio (024)', telefono: '024', descripcion: 'Línea de atención (gratis, 24h, confidencial)', categoria: 'Salud Mental', disponible24h: true },
  { nombre: 'Tratamiento Adicciones', telefono: '900 200 200', descripcion: 'Información y derivación (gratis)', categoria: 'Salud Mental', disponible24h: true },
  { nombre: 'Guardia Civil', telefono: '062', descripcion: 'Seguridad ciudadana, denuncias', categoria: 'Seguridad', disponible24h: true },
  { nombre: 'Policía Nacional', telefono: '091', descripcion: 'Seguridad ciudadana, denuncias', categoria: 'Seguridad', disponible24h: true },
  { nombre: 'Policía Local (Madrid)', telefono: '092', descripcion: 'Seguridad municipal', categoria: 'Seguridad', disponible24h: true },
  { nombre: 'Bomberos', telefono: '080', descripcion: 'Incendios, rescates, emergencias', categoria: 'Emergencias', disponible24h: true },
  { nombre: 'Protección Civil', telefono: '112', descripcion: 'Emergencias y catástrofes', categoria: 'Emergencias', disponible24h: true },
  { nombre: 'INSS - Seguridad Social', telefono: '901 16 65 65', descripcion: 'Información prestaciones, pensiones, afiliación', categoria: 'Seguridad Social', disponible24h: false },
  { nombre: 'SEPE - Empleo', telefono: '060', descripcion: 'Prestaciones por desempleo, cursos', categoria: 'Empleo', disponible24h: false },
  { nombre: 'Agencia Tributaria', telefono: '060 / 901 200 345', descripcion: 'Impuestos, declaraciones, certificados', categoria: 'Hacienda', disponible24h: false },
  { nombre: 'Extranjería - Cita Previa', telefono: '060', descripcion: 'Cita previa extranjería (cita previa obligatoria)', categoria: 'Extranjería', disponible24h: false },
  { nombre: 'Oficina de Extranjería (Madrid)', telefono: '915 801 810', descripcion: 'Trámites extranjería - Madrid', categoria: 'Extranjería', disponible24h: false },
  { nombre: 'Oficina de Extranjería (Barcelona)', telefono: '933 043 500', descripcion: 'Trámites extranjería - Barcelona', categoria: 'Extranjería', disponible24h: false },
  { nombre: 'Oficina de Extranjería (Valencia)', telefono: '963 420 000', descripcion: 'Trámites extranjería - Valencia', categoria: 'Extranjería', disponible24h: false },
  { nombre: 'Oficina de Extranjería (Sevilla)', telefono: '954 507 000', descripcion: 'Trámites extranjería - Sevilla', categoria: 'Extranjería', disponible24h: false },
  { nombre: 'SAE - Servicio Andaluz Empleo', telefono: '955 045 000', descripcion: 'Empleo y formación - Andalucía', categoria: 'Empleo', disponible24h: false },
  { nombre: 'SOC - Servei d\'Ocupació Catalunya', telefono: '012', descripcion: 'Empleo y formación - Cataluña', categoria: 'Empleo', disponible24h: false },
  { nombre: 'Lanbide - Servicio Vasco Empleo', telefono: '945 160 600', descripcion: 'Empleo y formación - País Vasco', categoria: 'Empleo', disponible24h: false },
];

export default function PhoneDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [show24hOnly, setShow24hOnly] = useState(false);

  const categories = ['Todas', ...new Set(contacts.map(c => c.categoria))];

  const filtered = contacts.filter(contact => {
    const matchesSearch = contact.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.telefono.includes(searchTerm) ||
                          contact.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || contact.categoria === categoryFilter;
    const matches24h = !show24hOnly || contact.disponible24h;
    return matchesSearch && matchesCategory && matches24h;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono, descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat === 'Todas' ? 'all' : cat}>{cat}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={show24hOnly}
            onChange={(e) => setShow24hOnly(e.target.checked)}
            className="w-4 h-4 text-red-600 border-red-600 rounded focus:ring-red-500"
          />
          Solo 24h
        </label>
      </div>

      <div className="grid gap-3">
        {filtered.length > 0 ? (
          filtered.map((contact, index) => (
            <div
              key={`${contact.telefono}-${index}`}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow hover:border-red-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{contact.disponible24h ? '🟢' : '🕐'}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.nombre}</h3>
                      <p className="text-sm text-gray-500">{contact.categoria}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="font-mono text-lg font-bold text-gray-900">{contact.telefono}</p>
                    <p className="text-xs text-gray-500">{contact.disponible24h ? 'Disponible 24h' : 'Horario laboral'}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(contact.telefono)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 rounded-lg transition-colors"
                  >
                    Copiar
                  </button>
                  <a
                    href={`tel:${contact.telefono.replace(/\s/g, '')}`}
                    className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Llamar
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 col-span-full">
            <p>No se encontraron resultados para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}