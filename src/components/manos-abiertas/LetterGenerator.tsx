'use client';

import { useState } from 'react';

type TemplateType = 'empadronamiento' | 'motivacion' | 'solicitud' | 'presentacion';

const templateConfigs: Record<TemplateType, { label: string; icon: string; subject: string; template: (data: any) => string; fields: string[] }> = {
  empadronamiento: {
    label: 'Empadronamiento',
    icon: '🏠',
    subject: 'Solicitud de Empadronamiento',
    fields: ['nombre', 'dni', 'direccion', 'direccion_completa', 'ciudad', 'fecha_llegada', 'fecha'],
    template: (data: any) => `
SOLICITUD DE EMPADRONAMIENTO

AYUNTAMIENTO DE ${data.ciudad || '[CIUDAD]'}

D./Dña. ${data.nombre || ''}, mayor de edad, con DNI/NIE nº ${data.dni || ''}, con domicilio en ${data.direccion || ''},

EXPONE:

Que, con fecha ${data.fecha_llegada || ''}, estableció su residencia habitual en el domicilio situado en ${data.direccion_completa || ''}, en el municipio de ${data.ciudad || ''}.

Por lo expuesto,

SOLICITA:
Que se sirva acordar su inscripción en el Padrón Municipal de Habitantes de este municipio, con los efectos legales oportunos.

Acompaña la siguiente documentación:
- Fotocopia DNI/NIE/Pasaporte
- Contrato de alquiler / Escritura de propiedad / Autorización del propietario
- Fotocopia DNI/NIE de todos los convivientes

En ${data.ciudad || ''}, a ${data.fecha || ''}.

Fdo.: ${data.nombre || ''}
`,
  },
  motivacion: {
    label: 'Carta Motivación',
    icon: '💼',
    subject: 'Carta de Motivación',
    fields: ['nombre_receptor', 'puesto', 'empresa', 'fuente', 'cuerpo', 'nombre', 'telefono', 'email'],
    template: (data: any) => `
Estimado/a ${data.nombre_receptor || ''}:

Por medio de la presente, le dirijo mi candidatura para el puesto de ${data.puesto || ''} en ${data.empresa || ''}, publicada en ${data.fuente || ''}.

${data.cuerpo || ''}

Quedo a su disposición para concertar una entrevista en la que poder ampliar la información que aquí se resume.

Atentamente,
${data.nombre || ''}
${data.telefono || ''}
${data.email || ''}
`,
  },
  solicitud: {
    label: 'Solicitud Genérica',
    icon: '📝',
    subject: 'Solicitud Genérica',
    fields: ['TIPO_SOLICITUD', 'ORGANISMO', 'NOMBRE', 'DNI', 'DIRECCION', 'HECHOS', 'CIUDAD', 'FECHA'],
    template: (data: any) => `
SOLICITUD DE ${data.TIPO_SOLICITUD || ''}

A LA ATENCIÓN DE: ${data.ORGANISMO || ''}

D./Dña. ${data.NOMBRE || ''}, mayor de edad, con DNI/NIE nº ${data.DNI || ''}, con domicilio en ${data.DIRECCION || ''},

EXPONE:

Que, por medio de la presente, vengo a solicitar ${data.TIPO_SOLICITUD || ''} ante este organismo, fundamentando mi petición en los siguientes hechos:

${data.HECHOS || ''}

Por lo expuesto,

SOLICITA: Que tenga a bien admitir la presente solicitud y, en su virtud, dicte resolución por la que se acceda a lo solicitado, con expresa imposición de costas si procediera.

En ${data.CIUDAD || ''}, a ${data.FECHA || ''}.

Fdo.: ${data.NOMBRE || ''}
`,
  },
  presentacion: {
    label: 'Presentación',
    icon: '👋',
    subject: 'Carta de Presentación',
    fields: ['nombre_contacto', 'nombre', 'motivo', 'cuerpo', 'telefono', 'email'],
    template: (data: any) => `
Hola ${data.nombre_contacto || ''}:

Mi nombre es ${data.nombre || ''} y me pongo en contacto contigo porque ${data.motivo || ''}.

${data.cuerpo || ''}

Quedo a la espera de tu respuesta.

Un saludo,

${data.nombre || ''}
${data.telefono || ''}
${data.email || ''}
`,
  },
};

export default function LetterGenerator() {
  const [template, setTemplate] = useState<TemplateType>('solicitud');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState<string>('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generate = () => {
    const config = templateConfigs[template];
    if (!config) return;
    try {
      const result = config.template(formData);
      setGenerated(result);
    } catch (e) {
      console.error('Error generating letter:', e);
    }
  };

  const currentFields = templateConfigs[template].fields;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Generador de Cartas y Documentos</h3>
      <p className="text-sm text-gray-600 mb-4">Rellena los campos y genera tu documento automáticamente.</p>

      <div className="flex gap-4 mb-6 flex-wrap">
        {(Object.keys(templateConfigs) as TemplateType[]).map(t => (
          <button
            key={t}
            onClick={() => setTemplate(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              template === t
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            {templateConfigs[t].icon} {templateConfigs[t].label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentFields.map(field => (
          <div key={field} className="col-span-1 md:col-span-1 lg:col-span-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">{field}</label>
            <input
              type="text"
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Escribe ${field.toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
            />
          </div>
        ))}

        <div className="flex gap-3 mt-4">
          <button
            onClick={generate}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Generar Documento
          </button>
          <button
            onClick={() => setFormData({})}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Limpiar
          </button>
        </div>

        {generated && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Documento Generado</h3>
              <button
                onClick={() => navigator.clipboard.writeText(generated).then(() => alert('Copiado al portapapeles'))}
                className="text-sm text-red-600 hover:underline"
              >
                Copiar al portapapeles
              </button>
            </div>
            <textarea
              readOnly
              value={generated}
              className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm resize-y focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}