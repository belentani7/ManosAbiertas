// Manos Abiertas - Document Templates Library
// Ready-to-use templates for common documents

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  category: 'employment' | 'legal' | 'housing' | 'official' | 'communication';
  emoji: string;
  content: string; // template text with [PLACEHOLDERS]
  format: 'text' | 'email' | 'form';
  language: string;
  tags: string[];
}

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  // Employment
  {
    id: 'tpl-cv-basic',
    title: 'CV Básico (plantilla texto)',
    description: 'Plantilla de currículum en texto plano para rellenar. Ideal para copiar y pegar en formularios online.',
    category: 'employment',
    emoji: '📝',
    format: 'text',
    language: 'Español',
    tags: ['CV', 'currículum', 'empleo'],
    content: `CURRÍCULUM VITAE

DATOS PERSONALES
Nombre: [TU NOMBRE COMPLETO]
Dirección: [TU DIRECCIÓN]
Teléfono: [+34 TU TELÉFONO]
Email: [TU EMAIL]
NIE: [TU NIE]
Nacionalidad: [TU PAÍS]

PERFIL PROFESIONAL
[Breve descripción de tu experiencia y habilidades. Ej: Profesional con X años de experiencia en...]

EXPERIENCIA LABORAL
1. [PUESTO] | [EMPRESA] | [FECHA INICIO] - [FECHA FIN]
   • [Tarea realizada 1]
   • [Tarea realizada 2]
   • [Logro conseguido]

2. [PUESTO] | [EMPRESA] | [FECHA INICIO] - [FECHA FIN]
   • [Tarea realizada 1]
   • [Tarea realizada 2]

EDUCACIÓN
• [TÍTULO] | [INSTITUCIÓN] | [AÑO]
• [TÍTULO] | [INSTITUCIÓN] | [AÑO]

IDIOMAS
• Español: [Nivel]
• [Otro idioma]: [Nivel]

HABILIDADES
• [Habilidad 1]
• [Habilidad 2]
• [Habilidad 3]`,
  },
  {
    id: 'tpl-cover-email',
    title: 'Email de presentación para empleo',
    description: 'Plantilla de email para enviar tu CV a una empresa. Formal y profesional.',
    category: 'employment',
    emoji: '📧',
    format: 'email',
    language: 'Español',
    tags: ['email', 'carta', 'presentación', 'empleo'],
    content: `Asunto: Candidatura - [PUESTO AL QUE ASPIRAS]

Estimado/a responsable de selección:

Me pongo en contacto con usted para presentar mi candidatura al puesto de [PUESTO] anunciado en [DÓNDE VISTE LA OFERTA].

Soy [TU PROFESIÓN] con [X] años de experiencia en [SECTOR]. En mi trayectoria profesional he destacado en [HABILIDAD PRINCIPAL 1] y [HABILIDAD PRINCIPAL 2], logrando [LOGRO CONCRETO].

Me motiva especialmente la oportunidad de formar parte de [NOMBRE DE LA EMPRESA] porque [RAZÓN POR LA QUE QUIERES TRABAJAR AHÍ].

Adjunto mi currículum vitae para su consideración. Quedo a su disposición para ampliar cualquier información y realizar una entrevista en el momento que consideren oportuno.

Atentamente,

[TU NOMBRE]
[TU TELÉFONO]
[TU EMAIL]`,
  },
  {
    id: 'tpl-interview-thanks',
    title: 'Email de agradecimiento post-entrevista',
    description: 'Email para enviar después de una entrevista. Demuestra profesionalidad e interés.',
    category: 'employment',
    emoji: '🙏',
    format: 'email',
    language: 'Español',
    tags: ['email', 'entrevista', 'agradecimiento'],
    content: `Asunto: Agradecimiento - Entrevista para [PUESTO]

Estimado/a [NOMBRE DEL ENTREVISTADOR]:

Quiero agradecerle el tiempo dedicado a entrevistarme el [FECHA DE LA ENTREVISTA] para el puesto de [PUESTO] en [EMPRESA].

La conversación reforzó mi interés en formar parte de su equipo. Particularmente me interesó [MENCIONA ALGO ESPECÍFICO DE LA ENTREVISTA].

Como comentamos, [MENCIONA UN PUNTO RELEVANTE: experiencia, disponibilidad, documentación].

Quedo a su disposición para cualquier información adicional que necesiten. Agradezco de antemano su tiempo y consideración.

Atentamente,

[TU NOMBRE]
[TU TELÉFONO]`,
  },

  // Legal / Official
  {
    id: 'tpl-rental-complaint',
    title: 'Carta de reclamación al propietario',
    description: 'Para reclamar reparaciones necesarias en tu vivienda alquilada.',
    category: 'legal',
    emoji: '🏠',
    format: 'text',
    language: 'Español',
    tags: ['alquiler', 'reclamación', 'vivienda', 'propietario'],
    content: `[TU NOMBRE]
[TU DIRECCIÓN]
[TU TELÉFONO]
[TU EMAIL]

[NOMBRE DEL PROPIETARIO]
[FECHA]

A LA ATENCIÓN DE [NOMBRE DEL PROPIETARIO]

REF: Reclamación por reparaciones necesarias en la vivienda alquilada
DIRECCIÓN: [DIRECCIÓN DEL PISO ALQUILADO]

Estimado/a [NOMBRE DEL PROPIETARIO]:

Por medio de la presente, le comunico que en la vivienda que ocupo en calidad de inquilino/a en la dirección arriba indicada, se han producido los siguientes desperfectos que requieren reparación urgente:

1. [DESCRIBIR EL PROBLEMA 1 - Ej: La caldera no funciona, no hay agua caliente]
2. [DESCRIBIR EL PROBLEMA 2]
3. [DESCRIBIR EL PROBLEMA 3]

Estos desperfectos afectan a las condiciones de habitabilidad de la vivienda, por lo que, según el artículo 21 de la Ley de Arrendamientos Urbanos (LAU), solicito que se proceda a su reparación en un plazo máximo de [SUGERIR PLAZO: 7/15 días] desde la recepción de esta carta.

En caso de no recibir respuesta o de no procederse a la reparación en el plazo indicado, me veré en la obligación de:
• Acudir al servicio de mediación del Ayuntamiento
• Presentar reclamación ante la Oficina Municipal de Información al Consumidor (OMIC)
• Iniciar las acciones legales correspondientes

Espero su pronta respuesta y colaboración.

Atentamente,

[TU NOMBRE]
[FIRMA]`,
  },
  {
    id: 'tpl-work-complaint',
    title: 'Reclamación laboral (empresa)',
    description: 'Para reclamar pagos pendientes o condiciones laborales ante la empresa.',
    category: 'legal',
    emoji: '💼',
    format: 'text',
    language: 'Español',
    tags: ['trabajo', 'reclamación', 'laboral', 'nómina'],
    content: `[TU NOMBRE]
[TU DIRECCIÓN]
[TU TELÉFONO]
[NIE/DNI]

[NOMBRE DE LA EMPRESA]
A LA ATENCIÓN DE [DEPARTAMENTO DE RRHH / NOMBRE]

[FECHA], en [CIUDAD]

REF: Reclamación laboral

Estimados señores:

Por medio de la presente, pongo en su conocimiento la siguiente reclamación:

DESCRIPCIÓN DE LOS HECHOS:
• [DESCRIBIR: Ej: No se ha abonado la nómina correspondiente a MES]
• [Cantidad pendiente: X€]
• [Fecha en que debió abonarse: FECHA]

FUNDAMENTOS:
Según el Estatuto de los Trabajadores (artículo 29), el salario debe abonarse en la fecha y lugar pactados. El retraso en el pago del salario constituye una falta grave.

SOLICITO:
1. El abono inmediato de la cantidad pendiente: [CANTIDAD]€
2. En caso de no recibirse en un plazo de [7 días], me veré obligado/a a:
   • Presentar papeleta de conciliación ante el SMAC
   • Iniciar demanda en el Juzgado de lo Social
   • Comunicar la situación a la Inspección de Trabajo (tel: 900 100 333)

Espero su pronta resolución.

Atentamente,

[TU NOMBRE]
[FIRMA]`,
  },
  {
    id: 'tpl-cita-previa',
    title: 'Modelo de solicitud genérica',
    description: 'Plantilla base para solicitar información o trámites a administraciones públicas.',
    category: 'official',
    emoji: '📄',
    format: 'form',
    language: 'Español',
    tags: ['solicitud', 'administración', 'trámite'],
    content: `A LA ATENCIÓN DE: [ORGANISMO - Ej: Oficina de Extranjería]

SOLICITUD

DATOS DEL SOLICITANTE:
Nombre y apellidos: [TU NOMBRE COMPLETO]
NIE/DNI: [TU NIE]
Nacionalidad: [TU PAÍS]
Fecha de nacimiento: [FECHA]
Dirección: [TU DIRECCIÓN]
Teléfono: [TU TELÉFONO]
Email: [TU EMAIL]

EXPONE:
Que el/la abajo firmante, con los datos personales indicados, necesita [DESCRIBIR EL TRÁMITE O INFORMACIÓN QUE NECESITAS].

SOLICITA:
1. [Petición concreta 1]
2. [Petición concreta 2]

DOCUMENTACIÓN ADJUNTA:
• [Documento 1 - Ej: Fotocopia del NIE]
• [Documento 2 - Ej: Empadronamiento]
• [Documento 3]

En [CIUDAD], a [FECHA]

Firma:

[TU NOMBRE]`,
  },

  // Housing
  {
    id: 'tpl-tenant-notice',
    title: 'Notificación de abandono de vivienda',
    description: 'Aviso formal al propietario de que vas a dejar el piso alquilado.',
    category: 'housing',
    emoji: '🔑',
    format: 'text',
    language: 'Español',
    tags: ['alquiler', 'abandono', 'notificación', 'vivienda'],
    content: `[TU NOMBRE]
[TU DIRECCIÓN ACTUAL]
[TU TELÉFONO]

[NOMBRE DEL PROPIETARIO]
[FECHA]

REF: Notificación de abandono de vivienda alquilada

Estimado/a [NOMBRE DEL PROPIETARIO]:

Por medio de la presente, le comunico formalmente mi intención de abandonar la vivienda que actualmente ocupo en calidad de inquilino/a, situada en:

[TU DIRECCIÓN ACTUAL]

La fecha prevista de abandono es el [FECHA DE ABANDONO], cumpliendo con el preaviso mínimo de 30 días establecido en el contrato de arrendamiento.

Solicito:
1. Que proceda a la devolución de la fianza depositada (CANTIDAD: [IMPORTE]€) en un plazo de 30 días desde la entrega de llaves.
2. Coordinar una visita para revisar el estado de la vivienda antes de la entrega de llaves.
3. Facilitar un número de cuenta para la devolución de la fianza.

El día de la entrega de llaves, la vivienda estará completamente vacía y limpia, en las mismas condiciones en las que la recibí.

Espero su confirmación de recepción de esta notificación.

Atentamente,

[TU NOMBRE]
[FIRMA]`,
  },

  // Communication
  {
    id: 'tpl-school-absence',
    title: 'Justificante de ausencia escolar',
    description: 'Para justificar la ausencia de tu hijo/a en el colegio.',
    category: 'communication',
    emoji: '🎒',
    format: 'text',
    language: 'Español',
    tags: ['colegio', 'escuela', 'ausencia', 'hijos'],
    content: `JUSTIFICANTE DE AUSENCIA ESCOLAR

Datos del alumno/a:
Nombre: [NOMBRE DEL NIÑO/A]
Curso: [CURSO]
Clase: [CLASE]

Datos del padre/madre/tutor:
Nombre: [TU NOMBRE]
DNI/NIE: [TU NIE]
Teléfono: [TU TELÉFONO]

Motivo de la ausencia:
[ ] Enfermedad
[ ] Cita médica
[ ] Cita oficial/trámite
[ ] Otro: [ESPECIFICAR]

Fechas de ausencia:
Desde: [FECHA INICIO]
Hasta: [FECHA FIN]

Observaciones:
[SI NECESARIO, AÑADIR INFORMACIÓN ADICIONAL]

En [CIUDAD], a [FECHA]

Firma del padre/madre/tutor:

[TU NOMBRE]`,
  },
  {
    id: 'tpl-bank-letter',
    title: 'Carta al banco (solicitud)',
    description: 'Plantilla para solicitar servicios o información a tu banco.',
    category: 'communication',
    emoji: '🏦',
    format: 'text',
    language: 'Español',
    tags: ['banco', 'solicitud', 'cuenta'],
    content: `[TU NOMBRE]
[TU DIRECCIÓN]
[TU TELÉFONO]
[TU EMAIL]
NIE: [TU NIE]

[NOMBRE DEL BANCO]
SUCURSAL: [DIRECCIÓN DE LA SUCURSAL]

[FECHA], en [CIUDAD]

REF: Solicitud de [SERVICIO - Ej: apertura de cuenta / certificado / cancelación]

Estimados señores:

Por medio de la presente, solicito:

[DESCRIBIR CLARAMENTE LO QUE SOLICITAS. Ejemplos:]
• Apertura de cuenta corriente para no residente
• Emisión de certificado de titularidad
• Cancelación de la cuenta número [NÚMERO]
• Activación de Bizum
• Modificación de titulares

Documentación que adjunto:
• Fotocopia del NIE/pasaporte
• [Otra documentación necesaria]

Ruego me confirmen por escrito la recepción de esta solicitud y el plazo estimado de resolución.

Atentamente,

[TU NOMBRE]
[FIRMA]`,
  },
];

export const TEMPLATE_CATEGORIES = [
  { value: 'employment', label: 'Empleo', emoji: '💼', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
  { value: 'legal', label: 'Legal', emoji: '⚖️', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  { value: 'housing', label: 'Vivienda', emoji: '🏠', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' },
  { value: 'official', label: 'Oficial', emoji: '📄', color: 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300' },
  { value: 'communication', label: 'Comunicación', emoji: '✉️', color: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
] as const;
