/**
 * Exportación real del CV a Word (.docx) y Europass (.txt), sin dependencias
 * y sin red: el .docx se construye localmente como OOXML empaquetado en ZIP
 * (almacenado sin compresión) y se descarga como Blob en el navegador.
 */

export interface CvExportExperience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CvExportEducation {
  title: string;
  institution: string;
  year: string;
  description: string;
}

export interface CvExportModel {
  fullName: string;
  profession: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experiences: CvExportExperience[];
  education: CvExportEducation[];
  skills: string[];
  languages: string[];
}

const CONTENT_TYPES = [
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
  '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
  '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
  '<Default Extension="xml" ContentType="application/xml"/>',
  '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>',
  '</Types>',
].join('');

const ROOT_RELS = [
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>',
  '</Relationships>',
].join('');

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function paragraph(text: string, options?: { heading?: boolean; bold?: boolean }): string {
  const safe = escapeXml(text ?? '');
  const runProps = options?.heading
    ? '<w:pPr><w:spacing w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="28"/></w:rPr>'
    : options?.bold
      ? '<w:rPr><w:b/></w:rPr>'
      : '';
  return `<w:p>${runProps ? `<w:r>${runProps}<w:t xml:space="preserve">${safe}</w:t></w:r>` : `<w:r><w:t xml:space="preserve">${safe}</w:t></w:r>`}</w:p>`;
}

function buildDocumentXml(model: CvExportModel): string {
  const blocks: string[] = [];
  blocks.push(paragraph(model.fullName || 'Currículum', { heading: true }));
  if (model.profession) blocks.push(paragraph(model.profession, { bold: true }));
  const contact = [model.email, model.phone, model.address].filter(Boolean).join(' · ');
  if (contact) blocks.push(paragraph(contact));

  if (model.summary) {
    blocks.push(paragraph('Perfil profesional', { heading: true }));
    blocks.push(paragraph(model.summary));
  }
  if (model.experiences.length > 0) {
    blocks.push(paragraph('Experiencia laboral', { heading: true }));
    for (const experience of model.experiences) {
      const dates = [experience.startDate, experience.endDate].filter(Boolean).join(' – ');
      const headline = [experience.position, experience.company].filter(Boolean).join(' | ');
      blocks.push(paragraph(headline + (dates ? ` (${dates})` : ''), { bold: true }));
      if (experience.description) blocks.push(paragraph(experience.description));
    }
  }
  if (model.education.length > 0) {
    blocks.push(paragraph('Educación', { heading: true }));
    for (const item of model.education) {
      const headline = [item.title, item.institution].filter(Boolean).join(' | ');
      blocks.push(paragraph(headline + (item.year ? ` (${item.year})` : ''), { bold: true }));
      if (item.description) blocks.push(paragraph(item.description));
    }
  }
  if (model.skills.length > 0) {
    blocks.push(paragraph('Habilidades', { heading: true }));
    blocks.push(paragraph(model.skills.join(', ')));
  }
  if (model.languages.length > 0) {
    blocks.push(paragraph('Idiomas', { heading: true }));
    blocks.push(paragraph(model.languages.join(', ')));
  }

  return [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">',
    `<w:body>${blocks.join('')}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body>`,
    '</w:document>',
  ].join('');
}

// --- ZIP mínimo (método store, sin compresión) ---

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let value = i;
    for (let bit = 0; bit < 8; bit++) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[i] = value >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

interface ZipEntry {
  name: string;
  data: Uint8Array;
}

function buildZip(entries: ZipEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;

  const u16 = (value: number) => new Uint8Array([value & 0xff, (value >>> 8) & 0xff]);
  const u32 = (value: number) => new Uint8Array([value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff]);

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name);
    const crc = crc32(entry.data);
    const local = [
      u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0),
      u32(crc), u32(entry.data.length), u32(entry.data.length),
      u16(nameBytes.length), u16(0),
    ];
    const central = [
      u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0),
      u32(crc), u32(entry.data.length), u32(entry.data.length),
      u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset),
    ];
    locals.push(...local, nameBytes, entry.data);
    centrals.push(...central, nameBytes);
    offset += local.reduce((sum, part) => sum + part.length, 0) + nameBytes.length + entry.data.length;
  }

  const centralBytes = centrals.flat();
  const end = [
    u32(0x06054b50), u16(0), u16(0), u16(entries.length), u16(entries.length),
    u32(centralBytes.length), u32(offset), u16(0),
  ];
  const all = [...locals, centralBytes, end].flat();
  const out = new Uint8Array(all.reduce((sum, part) => sum + part.length, 0));
  let position = 0;
  for (const part of all) {
    out.set(part, position);
    position += part.length;
  }
  return out;
}

/** CV completo como documento Word válido, generado 100% en local. */
export function buildCvDocx(model: CvExportModel): Uint8Array {
  const encoder = new TextEncoder();
  return buildZip([
    { name: '[Content_Types].xml', data: encoder.encode(CONTENT_TYPES) },
    { name: '_rels/.rels', data: encoder.encode(ROOT_RELS) },
    { name: 'word/document.xml', data: encoder.encode(buildDocumentXml(model)) },
  ]);
}

/** Variante de texto plano con la estructura y etiquetas del Europass. */
export function buildEuropassText(model: CvExportModel): string {
  const lines: string[] = ['CURRÍCULUM VITAE — MODELO EUROPASS', ''];
  lines.push('INFORMACIÓN PERSONAL');
  lines.push(`Nombre: ${model.fullName || ''}`);
  if (model.profession) lines.push(`Puesto deseado: ${model.profession}`);
  if (model.address) lines.push(`Dirección: ${model.address}`);
  if (model.phone) lines.push(`Teléfono: ${model.phone}`);
  if (model.email) lines.push(`Correo electrónico: ${model.email}`);
  if (model.summary) {
    lines.push('', 'PERFIL PROFESIONAL', model.summary);
  }
  if (model.experiences.length > 0) {
    lines.push('', 'EXPERIENCIA LABORAL');
    model.experiences.forEach((experience, index) => {
      lines.push(`— Experiencia ${index + 1}`);
      lines.push(`Fechas: ${experience.startDate || '?'} – ${experience.endDate || 'actualidad'}`);
      lines.push(`Puesto: ${experience.position || ''}`);
      lines.push(`Empleador: ${experience.company || ''}`);
      if (experience.description) lines.push(`Tareas y logros: ${experience.description}`);
    });
  }
  if (model.education.length > 0) {
    lines.push('', 'EDUCACIÓN Y FORMACIÓN');
    model.education.forEach((item, index) => {
      lines.push(`— Formación ${index + 1}`);
      lines.push(`Fechas: ${item.year || '?'}`);
      lines.push(`Título obtenido: ${item.title || ''}`);
      lines.push(`Institución: ${item.institution || ''}`);
      if (item.description) lines.push(`Detalles: ${item.description}`);
    });
  }
  if (model.languages.length > 0) {
    lines.push('', 'IDIOMAS');
    model.languages.forEach((language) => lines.push(`— ${language}`));
  }
  if (model.skills.length > 0) {
    lines.push('', 'COMPETENCIAS PERSONALES');
    model.skills.forEach((skill) => lines.push(`— ${skill}`));
  }
  lines.push('', 'Documento generado localmente por Manos Abiertas. Revisa los datos antes de enviarlo.');
  return lines.join('\n') + '\n';
}

export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCvDocx(model: CvExportModel): void {
  downloadBlob('cv-manos-abiertas.docx', new Blob([buildCvDocx(model) as BlobPart], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }));
}

export function downloadCvEuropass(model: CvExportModel): void {
  downloadBlob('cv-europass-manos-abiertas.txt', new Blob([buildEuropassText(model)], {
    type: 'text/plain;charset=utf-8',
  }));
}
