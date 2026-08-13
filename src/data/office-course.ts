// ============================================================
// Manos Abiertas — Curso Completo de Office Pack
// Word, Excel, PowerPoint + Google Docs, Sheets, Slides, Gmail/Outlook
// Para personas inmigrantes en España con baja alfabetización digital
// Idioma: Español
// ============================================================

export interface OfficeLesson {
  id: string;
  title: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  content: string; // markdown
  steps?: string[];
  tips?: string[];
  exercise?: string;
}

export interface OfficeModule {
  id: string;
  app: 'word' | 'excel' | 'powerpoint' | 'google-docs' | 'google-sheets' | 'google-slides' | 'outlook' | 'gmail';
  title: string;
  icon: string; // emoji
  color: string; // tailwind gradient
  description: string;
  freeAlternative: string;
  lessons: OfficeLesson[];
}

// ------------------------------------------------------------
// MÓDULO 1: MICROSOFT WORD
// ------------------------------------------------------------
const wordModule: OfficeModule = {
  id: 'word',
  app: 'word',
  title: 'Microsoft Word',
  icon: '📝',
  color: 'from-blue-600 to-blue-800',
  description:
    'Aprende a crear documentos profesionales: currículums, cartas, oficios, solicitudes. Word es el procesador de texto más usado del mundo.',
  freeAlternative: 'Google Docs (docs.google.com) — Gratis con cuenta de Gmail.',
  lessons: [
    {
      id: 'word-01',
      title: 'Conocer la pantalla de Word',
      duration: '10 min',
      level: 'beginner',
      content: `## Tu primer documento en Word

Microsoft Word es el programa para escribir documentos: cartas, currículums, oficios.

### Cómo abrir Word

1. En tu ordenador: botón **Inicio** → escribe "Word" → pulsa Enter.
2. Selecciona **"Documento en blanco"**.

### Partes de la pantalla

- **Cinta de opciones (arriba):** todos los botones y herramientas.
- **Página blanca (centro):** donde escribes.
- **Barra de estado (abajo):** número de página, palabras, idioma.

### Pestañas principales

- **Inicio:** tipos de letra, negrita, copiar/pegar.
- **Insertar:** tablas, imágenes, símbolos.
- **Diseño:** márgenes, orientación.
- **Revisar:** ortografía, traducir.
- **Vista:** cómo se ve la página.

### Escribir tu primer texto

1. Haces clic en la página blanca.
2. Escribes: "Hola, este es mi primer documento en Word."
3. Verás un cursor parpadeando: eso indica dónde escribes.

### Guardar el documento

1. **Archivo → Guardar como**.
2. Elige dónde (Escritorio, Documentos).
3. Pon un nombre: "Mi primer documento".
4. Pulsa **Guardar**.`,
      steps: [
        'Abre Word desde el menú Inicio.',
        'Selecciona "Documento en blanco".',
        'Escribe un texto de prueba.',
        'Pulsa "Archivo → Guardar como".',
        'Elige carpeta, pon nombre, pulsa "Guardar".',
      ],
      tips: [
        'Word guarda en formato .docx (predeterminado).',
        'Para versiones antiguas, guarda como .doc.',
        'Guarda cada pocos minutos: Ctrl + S.',
      ],
      exercise: 'Crea un documento nuevo. Escribe 3 líneas sobre ti. Guárdalo como "Sobre mí".',
    },
    {
      id: 'word-02',
      title: 'Dar formato al texto',
      duration: '15 min',
      level: 'beginner',
      content: `## Letras bonitas y claras

El formato hace que tu documento sea fácil de leer y profesional.

### Seleccionar texto

1. Haz clic al inicio del texto.
2. Mantén pulsado y arrastra hasta el final.
3. Suelta. El texto aparecerá **resaltado en azul**.

> **Atajo:** Ctrl + E (selecciona todo el documento).

### Pestaña "Inicio"

**Tipos de letra:**
- Despliega el menú de fuentes (donde dice "Calibri").
- Prueba: Arial, Times New Roman, Verdana.
- Recomendado: **Arial 11 o 12** para documentos formales.

**Tamaños:**
- Despliega el número al lado de la fuente.
- 10-12: texto normal.
- 14-16: subtítulos.
- 18-24: títulos.

**Estilos:**
- **B** (negrita): resalta lo importante.
- **I** (cursiva): para títulos de libros, énfasis.
- **S** (subrayado): para enlaces o destacar.

**Color:**
- Botón **A con color** → elige color.
- Para documentos formales: usa **negro**.

### Alineación

- **Izquierda** (predeterminado).
- **Centro** (títulos).
- **Derecha** (fechas, firmas).
- **Justificado** (alinea ambos lados: profesional).

### Listas

- **Viñetas:** puntos • para listas.
- **Numeración:** 1, 2, 3 para pasos.

### Copiar formato

Botón **brochita** (Copiar formato):
1. Selecciona texto con formato bonito.
2. Pulsa la brochita.
3. Pulsa en otro texto: copia el formato.`,
      steps: [
        'Selecciona el texto arrastrando el ratón.',
        'Cambia fuente a Arial 12.',
        'Pon el título en negrita y centro.',
        'Justifica el cuerpo del texto.',
        'Crea una lista con viñetas.',
      ],
      tips: [
        'Arial 11-12 es el estándar profesional.',
        'No uses más de 2 fuentes en un documento.',
        'Para títulos, usa negrita en vez de subrayado.',
      ],
      exercise: 'Escribe un párrafo. Cámbialo a Arial 12, justificado. Pon un título en negrita centrado.',
    },
    {
      id: 'word-03',
      title: 'Crear tu currículum en Word',
      duration: '20 min',
      level: 'beginner',
      content: `## Tu CV profesional paso a paso

Word es la herramienta perfecta para crear tu CV.

### Usar una plantilla

1. Abre Word → **Nuevo**.
2. Busca "Currículum" o "CV" en la búsqueda.
3. Verás varias plantillas gratuitas.
4. Elige una y pulsa **Crear**.
5. Solo tienes que cambiar el texto por tus datos.

### Estructura del CV

**1. Datos personales (arriba):**
- Nombre y apellidos (grande).
- Teléfono.
- Correo electrónico.
- Ciudad.
- LinkedIn (si tienes).

**2. Perfil profesional (1 párrafo):**
Ejemplo: "Profesional con 5 años de experiencia en atención al cliente, especializado en sector hostelería. Busco oportunidades en Madrid."

**3. Experiencia laboral:**
- Puesto (negrita) | Empresa | Fechas
- 3-5 viñetas con logros.

Ejemplo:
> **Camarero** | Restaurante La Parrilla, Lima | 2020-2023
> - Atención a 100+ clientes diarios.
> - Coordinación de equipo de 5 personas.
> - Incremento de propinas en 20%.

**4. Formación:**
- Título | Centro | Año

**5. Idiomas:**
- Español (nativo)
- Inglés (B1)
- Francés (A2)

**6. Habilidades:**
- Viñetas con tus habilidades.

### Guardar como PDF

Para enviarlo por email:
1. **Archivo → Guardar como**.
2. Tipo: **PDF**.
3. Guardar.

> **Importante:** Los CVs siempre se envían en PDF, no en Word. Así nadie puede modificarlos.`,
      steps: [
        'Abre Word → Nuevo → busca "Currículum".',
        'Elige una plantilla y pulsa Crear.',
        'Rellena datos personales, experiencia, formación.',
        'Pon experiencia en viñetas con verbos de acción.',
        'Guarda como PDF para enviarlo.',
      ],
      tips: [
        'Mantén tu CV en 1-2 páginas máximo.',
        'Usa verbos de acción: "coordiné", "gestioné", "implementé".',
        'Guarda siempre una versión PDF para enviar.',
      ],
      exercise: 'Crea tu CV usando una plantilla de Word. Guárdalo como PDF.',
    },
    {
      id: 'word-04',
      title: 'Tablas y listas',
      duration: '15 min',
      level: 'intermediate',
      content: `## Organizar información con tablas

Las tablas hacen que la información sea clara y ordenada.

### Insertar una tabla

1. Pestaña **Insertar** → **Tabla**.
2. Selecciona cuántas filas y columnas (ej: 3x3).
3. Aparecerá una cuadrícula en tu documento.

### Escribir en la tabla

- Haz clic en una celda.
- Escribe tu texto.
- Pulsa **Tab** para pasar a la siguiente celda.

### Ejemplo: horario semanal

| Hora | Lunes | Martes | Miércoles |
|---|---|---|---|
| 9:00 | Trabajo | Trabajo | Trabajo |
| 14:00 | Comida | Comida | Comida |
| 17:00 | Libre | Clases español | Libre |
| 20:00 | Cena | Cena | Cena |

### Modificar la tabla

**Añadir fila/columna:**
- Pulsa fuera de la tabla (derecha o abajo).
- Pestaña **Disposición** → Insertar debajo / Insertar a la derecha.

**Borrar fila/columna:**
- Selecciona la fila/columna.
- Click derecho → **Eliminar filas**.

**Cambiar tamaño:**
- Arrastra las líneas de la cuadrícula.

**Estilos de tabla:**
- Pestaña **Diseño de tabla**.
- Elige un estilo con colores.

### Listas numeradas y con viñetas

**Viñetas:**
1. Pestaña **Inicio** → botón de viñetas (tres puntos).
2. Escribe un ítem.
3. Pulsa Enter para siguiente.
4. Pulsa Enter dos veces para terminar.

**Numeración:**
1. Pestaña **Inicio** → botón 1.2.3.
2. Escribe pasos.
3. Word numera automáticamente.

### Lista de varios niveles

Para documentos complejos:
1. Pestaña **Inicio** → botón multilista.
2. Cada Enter baja un nivel.
3. Tab sube de nivel.`,
      steps: [
        'Insertar → Tabla → 3x3.',
        'Escribe en cada celda (usa Tab para moverte).',
        'Añade filas con Disposición → Insertar debajo.',
        'Aplica un estilo de tabla.',
        'Crea una lista con viñetas debajo.',
      ],
      tips: [
        'Usa Tab para moverte rápido entre celdas.',
        'Para tablas grandes, usa encabezados en negrita.',
        'Las listas numeradas son ideales para instrucciones.',
      ],
      exercise: 'Crea una tabla con tu horario semanal. Debajo, haz una lista numerada de tareas.',
    },
    {
      id: 'word-05',
      title: 'Cartas y oficios formales',
      duration: '15 min',
      level: 'intermediate',
      content: `## Escribir cartas oficiales

Las cartas formales siguen una estructura clara en España.

### Estructura de una carta formal

**1. Lugar y fecha (arriba derecha):**
> Madrid, 15 de marzo de 2024

**2. Destinatario (abajo de la fecha, izquierda):**
> Sr. Director
> Ayuntamiento de Madrid
> Plaza de la Villa, 1
> 28005 Madrid

**3. Saludo:**
> Estimado Sr. Director:

**4. Cuerpo (lo que quieres decir):**
> Por medio de la presente, solicito...

**5. Despedida:**
> Atentamente,
> [Firma]
> [Tu nombre completo]
> [Tu DNI/NIE]

### Plantilla: solicitud de cita

> Madrid, 15 de marzo de 2024
>
> **Al Ilustre Ayuntamiento de Madrid**
> Departamento de Atención al Ciudadano
>
> **Asunto:** Solicitud de cita para empadronamiento
>
> Estimados señores:
>
> Por medio de la presente, solicito cita previa para realizar el empadronamiento en este municipio. Mi situación es la siguiente:
>
> - Nombre completo: [tu nombre]
> - DNI/NIE: [tu número]
> - Dirección actual: [tu dirección]
> - Fecha de llegada a España: [fecha]
>
> Agradeceré me sea concedida cita en la mayor brevedad posible.
>
> Atentamente,
>
> *(firma)*
>
> [Tu nombre]
> [Tu teléfono]
> [Tu email]

### Insertar símbolos

- Pestaña **Insertar → Símbolo**.
- Útil para: €, ©, ®, °, µ, etc.

### Insertar fecha automática

- Pestaña **Insertar → Fecha y hora**.
- Elige formato: "15 de marzo de 2024".
- Word la actualiza automáticamente.

### Guardar como plantilla

Si usas cartas similares:
1. Crea el documento base.
2. **Archivo → Guardar como**.
3. Tipo: **Plantilla de Word (.dotx)**.
4. La próxima vez: **Nuevo → Personal → tu plantilla**.`,
      steps: [
        'Abre un documento nuevo.',
        'Escribe fecha (Insertar → Fecha y hora).',
        'Escribe destinatario, saludo, cuerpo, despedida.',
        'Guarda como plantilla para reutilizar.',
      ],
      tips: [
        'Usa "Estimado/a" para formal, "Hola" para informal.',
        'Siempre firma y pon tus datos de contacto.',
        'Para ayuntamientos, busca la plantilla oficial en su web.',
      ],
      exercise: 'Redacta una carta formal solicitando cita para empadronarte. Guárdala como plantilla.',
    },
    {
      id: 'word-06',
      title: 'Imágenes, encabezados y pies de página',
      duration: '15 min',
      level: 'intermediate',
      content: `## Documentos más profesionales

Añade imágenes, logos y encabezados para destacar.

### Insertar una imagen

1. Pestaña **Insertar → Imágenes**.
2. Selecciona una imagen de tu ordenador.
3. La imagen aparece en el documento.

### Ajustar la imagen

- Pulsa sobre la imagen.
- Aparece el botón **Opciones de diseño** (junto a la imagen).
- Elige cómo se ajusta:
  - **En línea con el texto:** como una letra más.
  - **Cuadrado:** el texto la rodea.
  - **Centrado:** imagen sola en la línea.
  - **Detrás del texto:** imagen de fondo.

### Cambiar tamaño

- Pulsa sobre la imagen.
- Arrastra las **esquinas** (mantén proporción).
- No arrastres los lados (deforma).

### Insertar encabezado

1. Pestaña **Insertar → Encabezado**.
2. Elige un diseño.
3. Escribe: tu nombre, título del documento, etc.
4. Aparece en todas las páginas.

### Insertar pie de página

1. Pestaña **Insertar → Pie de página**.
2. Elige diseño.
3. Útil para: número de página, fecha, contacto.

### Número de página

1. Pestaña **Insertar → Número de página**.
2. Elige posición (arriba/abajo) y alineación.
3. Aparece automáticamente en todas las páginas.

### WordArt (títulos vistosos)

1. Pestaña **Insertar → WordArt**.
2. Elige un estilo.
3. Escribe tu título.

> **Aviso:** No abuses de WordArt en documentos formales.

### Formas y símbolos

- Pestaña **Insertar → Formas**.
- Flechas, cuadros, círculos, líneas.
- Útil para esquemas y diagramas.`,
      steps: [
        'Inserta una imagen (Insertar → Imágenes).',
        'Cambia el tamaño arrastrando esquinas.',
        'Inserta encabezado con tu nombre.',
        'Inserta pie de página con número de página.',
      ],
      tips: [
        'Para CVs: usa encabezado con tu nombre y contacto.',
        'No pongas imágenes en cartas formales (salvo logo empresa).',
        'Los números de página son útiles en documentos largos.',
      ],
      exercise: 'Crea un documento con encabezado, imagen, pie de página y número de página.',
    },
    {
      id: 'word-07',
      title: 'Corregir ortografía y traducir',
      duration: '12 min',
      level: 'beginner',
      content: `## Textos sin errores

Word corrige automáticamente tus errores mientras escribes.

### Subrayados importantes

Mientras escribes, verás:

- **Subrayado rojo:** palabra mal escrita.
- **Subrayado azul:** error gramatical.
- **Subrayado doble:** posible error de estilo.

### Corregir una palabra

1. Click **derecho** sobre la palabra subrayada.
2. Word te da sugerencias.
3. Elige la correcta.

### Revisión completa

1. Pestaña **Revisar → Ortografía y gramática**.
2. Word revisa todo el documento paso a paso.
3. Para cada error: **Cambiar** o **Omitir**.

### Idioma del documento

1. Selecciona todo (Ctrl + E).
2. Pestaña **Revisar → Idioma → Establecer idioma de corrección**.
3. Elige: Español (España).

### Sinónimos

1. Click derecho sobre una palabra.
2. **Sinónimos** → elige alternativa.
3. Útil para no repetir palabras.

### Traducir texto

1. Selecciona el texto.
2. Pestaña **Revisar → Traducir → Traducir selección**.
3. Elige idioma destino.
4. Word traduce usando Microsoft Translator.

### Contar palabras

- Pestaña **Revisar → Contar palabras**.
- O mira abajo a la izquierda: "X palabras".

### Leer en voz alta

1. Pestaña **Revisar → Leer en voz alta**.
2. Word lee tu documento.
3. Útil para repasar y detectar errores.

> **Truco:** Si no estás seguro de cómo suena tu documento, haz que Word te lo lea. Detectarás errores que no ves al leer.`,
      steps: [
        'Escribe un texto con errores a propósito.',
        'Click derecho sobre palabras subrayadas para corregir.',
        'Pestaña Revisar → Ortografía y gramática.',
        'Cambia el idioma a Español (España).',
        'Prueba Leer en voz alta.',
      ],
      tips: [
        'Revisa siempre antes de enviar/imprimir.',
        'Cambia el idioma de corrección si escribes en otro idioma.',
        'Lee en voz alta para detectar errores de estilo.',
      ],
      exercise: 'Escribe 5 líneas con errores. Corrígelo con la herramienta de ortografía. Léelo en voz alta.',
    },
    {
      id: 'word-08',
      title: 'Imprimir y exportar a PDF',
      duration: '10 min',
      level: 'beginner',
      content: `## Tu documento listo para entregar

Aprende a imprimir y crear PDFs, los formatos más usados.

### Imprimir el documento

1. **Archivo → Imprimir** (o Ctrl + P).
2. Revisa la vista previa.
3. Configura:
   - **Copias:** número de ejemplares.
   - **Impresora:** selecciona la tuya.
   - **Páginas:** todas o algunas (ej: "1-3").
   - **Color o blanco y negro.**
   - **Una o dos caras.**
4. Pulsa **Imprimir**.

### Configurar página antes de imprimir

1. Pestaña **Disposición** (o Diseño).
2. **Márgenes:** Normal, Estrecho, Ancho.
3. **Orientación:** Vertical (predeterminado) u Horizontal.
4. **Tamaño:** A4 (predeterminado en España).

### Vista previa de impresión

Antes de imprimir, siempre revisa:

- ¿Caben todas las páginas?
- ¿Hay líneas cortadas?
- ¿Los márgenes son correctos?

### Exportar a PDF

**Método 1:**
1. **Archivo → Guardar como**.
2. Tipo: **PDF**.
3. Elige carpeta.
4. Guardar.

**Método 2:**
1. **Archivo → Exportar → Crear PDF/XPS**.

### Por qué PDF

- **No se puede modificar** (ideal para CVs, contratos).
- **Se ve igual** en cualquier ordenador o móvil.
- **Más profesional** que Word.
- **Ocupa menos** que el .docx.

### Enviar por email

1. Abre tu correo (Gmail, Outlook).
2. **Redactar** → **Adjuntar archivo**.
3. Selecciona el PDF.
4. Envía.

### Imprimir varias páginas en una hoja

1. Archivo → Imprimir.
2. **1 página por hoja** → cambia a **2 páginas por hoja**.
3. Ahorra papel al imprimir borradores.`,
      steps: [
        'Abre un documento existente.',
        'Archivo → Imprimir → revisa vista previa.',
        'Cierra sin imprimir.',
        'Archivo → Guardar como → PDF.',
        'Abre tu correo y adjunta el PDF.',
      ],
      tips: [
        'Para CVs y documentos formales, envía siempre PDF.',
        'Revisa la vista previa antes de imprimir.',
        'Imprime a doble cara para ahorrar papel.',
      ],
      exercise: 'Convierte un documento Word a PDF. Ábrelo para comprobar que se ve bien.',
    },
  ],
};

// ------------------------------------------------------------
// MÓDULO 2: MICROSOFT EXCEL
// ------------------------------------------------------------
const excelModule: OfficeModule = {
  id: 'excel',
  app: 'excel',
  title: 'Microsoft Excel',
  icon: '📊',
  color: 'from-green-600 to-emerald-700',
  description:
    'La herramienta reina para organizar datos, hacer presupuestos y cálculos. Aprende fórmulas esenciales: SUMA, PROMEDIO, SI, BUSCARV y gráficos.',
  freeAlternative: 'Google Sheets (sheets.google.com) — Gratis con cuenta de Gmail.',
  lessons: [
    {
      id: 'excel-01',
      title: 'Conocer Excel: celdas, filas y columnas',
      duration: '12 min',
      level: 'beginner',
      content: `## Tu primera hoja de cálculo

Excel organiza la información en **celdas**. Cada celda tiene una dirección única.

### Abrir Excel

1. Botón Inicio → escribe "Excel".
2. Selecciona **"Libro en blanco"**.

### Partes de la pantalla

- **Columnas (letras A, B, C...):** verticales.
- **Filas (números 1, 2, 3...):** horizontales.
- **Celdas:** cada cuadrito. Dirección: A1, B5, C10, etc.
- **Barra de fórmulas (arriba):** donde ves/escribes fórmulas.
- **Pestañas:** Inicio, Insertar, Fórmulas, Datos.

### Escribir en una celda

1. Haz clic en una celda (ej: A1).
2. Escribe: "Nombre".
3. Pulsa **Enter** (baja a la siguiente fila) o **Tab** (pasa a la siguiente columna).

### Ejemplo: tabla de contactos

| A | B | C |
|---|---|---|
| Nombre | Teléfono | Email |
| María | 600123456 | maria@email.com |
| José | 600987654 | jose@email.com |

### Seleccionar celdas

- **Una celda:** clic.
- **Varias seguidas:** clic y arrastra.
- **Columna completa:** clic en la letra (A, B, C).
- **Fila completa:** clic en el número (1, 2, 3).
- **Todo:** cuadrito arriba a la izquierda (entre A y 1).

### Modificar celdas

- **Borrar:** selecciona + tecla Supr.
- **Editar:** doble clic o F2.
- **Copiar:** Ctrl + C.
- **Pegar:** Ctrl + V.
- **Cortar:** Ctrl + X.

### Guardar el archivo

1. Archivo → Guardar como.
2. Nombre: "Mis contactos".
3. Carpeta: Documentos.
4. Guardar.

> **Formato:** .xlsx (predeterminado). Para versiones antiguas: .xls.`,
      steps: [
        'Abre Excel → Libro en blanco.',
        'En A1 escribe "Nombre", B1 "Teléfono", C1 "Email".',
        'Rellena 3 filas con datos inventados.',
        'Guarda como "Mis contactos".',
      ],
      tips: [
        'Las celdas se identifican por columna+fila: A1, B5, etc.',
        'Enter baja a la siguiente fila, Tab pasa a la siguiente columna.',
        'Guarda con frecuencia: Ctrl + S.',
      ],
      exercise: 'Crea una tabla con 5 contactos (nombre, teléfono, email). Guárdala.',
    },
    {
      id: 'excel-02',
      title: 'Formato de celdas y números',
      duration: '15 min',
      level: 'beginner',
      content: `## Datos bonitos y claros

El formato hace que tu tabla sea fácil de leer.

### Formato de texto

Selecciona celdas → pestaña **Inicio**:

- **Negrita, cursiva, subrayado.**
- **Color de fuente.**
- **Color de relleno** (fondo).
- **Bordes** (líneas alrededor).

### Formato de números

Excel distingue texto, números, fechas, moneda.

**Moneda (€):**
1. Selecciona celdas con números.
2. Pestaña Inicio → botón **€**.
3. Aparece: 1.000,00 €.

**Porcentaje (%):**
1. Selecciona celdas.
2. Botón **%**.
3. Aparece: 50%.

**Fecha:**
1. Escribe: 15/03/2024.
2. Excel lo reconoce como fecha.

**Decimales:**
1. Botones **.0 → .00** para añadir/quitar decimales.

### Alinear texto

- **Izquierda, centro, derecha.**
- **Arriba, medio, abajo.**

### Ajustar ancho de columnas

1. Coloca el cursor entre dos letras (ej: entre A y B).
2. Aparece una flecha doble.
3. Arrastra para ensanchar/estrechar.

**Autoajustar:**
- Doble clic en la línea entre columnas.
- Excel ajusta al contenido más ancho.

### Altura de filas

Igual que columnas, pero entre números.

### Combinar celdas

1. Selecciona varias celdas.
2. Pestaña Inicio → **Combinar y centrar**.
3. Las celdas se vuelven una sola.

> Útil para títulos.

### Estilos de celda

- Pestaña Inicio → **Estilos de celda**.
- Elige colores predefinidos.

### Formato como tabla

1. Selecciona toda tu tabla.
2. Pestaña Inicio → **Dar formato como tabla**.
3. Elige un estilo.
4. Marca "La tabla tiene encabezados".

Beneficios:
- Filtros automáticos.
- Colores alternos.
- Más profesional.`,
      steps: [
        'Selecciona los encabezados y ponlos en negrita con color de fondo.',
        'Cambia números a moneda (€).',
        'Autoajusta el ancho de columnas (doble clic).',
        'Aplica formato como tabla.',
      ],
      tips: [
        'Los encabezados siempre en negrita.',
        'Usa colores de fondo claros (no muy fuertes).',
        'Las cifras en euros deben tener formato €.',
      ],
      exercise: 'Crea una tabla de gastos. Pon números en €, encabezados en negrita, formato de tabla.',
    },
    {
      id: 'excel-03',
      title: 'Tu primer presupuesto familiar',
      duration: '20 min',
      level: 'beginner',
      content: `## Caso práctico: presupuesto mensual

Aprende creando un presupuesto real para tu familia.

### Paso 1: estructura

Crea estas columnas:

| A | B | C |
|---|---|---|
| Concepto | Categoría | Importe |

### Paso 2: ingresos

| Concepto | Categoría | Importe |
|---|---|---|
| Mi sueldo | Ingreso | 1400 |
| Sueldo pareja | Ingreso | 1100 |
| Ayuda hijos | Ingreso | 250 |

### Paso 3: gastos

| Concepto | Categoría | Importe |
|---|---|---|
| Alquiler | Gasto | 800 |
| Comida | Gasto | 400 |
| Luz | Gasto | 60 |
| Agua | Gasto | 30 |
| Gas | Gasto | 40 |
| Internet | Gasto | 35 |
| Móvil | Gasto | 25 |
| Transporte | Gasto | 100 |
| Ocio | Gasto | 80 |
| Ropa | Gasto | 60 |
| Farmacia | Gasto | 40 |
| Colegio hijos | Gasto | 50 |

### Paso 4: total de ingresos

1. En la celda debajo del último ingreso, escribe:
   \`=SUMA(C2:C4)\`
   (cambia C2:C4 por el rango de tus ingresos)
2. Pulsa Enter.
3. Excel suma automáticamente: **2.750 €**.

### Paso 5: total de gastos

En otra celda:
\`=SUMA(C5:C16)\`
Resultado: **1.720 €**.

### Paso 6: saldo (lo que sobra)

\`=TOTAL_INGRESOS - TOTAL_GASTOS\`
\`=2750 - 1720 = 1030 €\`

### Paso 7: formato

- Importes en formato €.
- Encabezados en negrita.
- Ingresos en verde, gastos en rojo.
- Total en negrita grande.

### Guardar y reutilizar

1. Guarda como "Presupuesto mensual".
2. Cada mes: Archivo → Guardar como → "Presupuesto marzo 2024".
3. Actualiza los números.

> **Consejo:** Si el saldo es negativo, ¡tienes que reducir gastos! Identifica qué categorías reducir.`,
      steps: [
        'Crea 3 columnas: Concepto, Categoría, Importe.',
        'Lista tus ingresos y gastos.',
        'Usa =SUMA() para totales.',
        'Calcula saldo: ingresos - gastos.',
        'Formatea con €, colores y negritas.',
      ],
      tips: [
        'Revisa tu presupuesto cada mes.',
        'Ahorra al menos 10% de tus ingresos.',
        'Si el saldo es negativo, recorta gastos opcionales.',
      ],
      exercise: 'Crea tu presupuesto mensual real. Calcula cuánto ahorras (o gastas de más).',
    },
    {
      id: 'excel-04',
      title: 'Fórmulas esenciales: SUMA, PROMEDIO, MAX, MIN',
      duration: '20 min',
      level: 'intermediate',
      content: `## Las fórmulas más útiles

Las fórmulas empiezan siempre con **=** (igual).

### SUMA

Suma varios números.

**Sintaxis:**
\`=SUMA(número1; número2; ...)\`
\`=SUMA(rango)\`

**Ejemplos:**
- \`=SUMA(10; 20; 30)\` → 60
- \`=SUMA(A1:A10)\` → suma todas las celdas de A1 a A10
- \`=SUMA(A1; A5; A10)\` → suma celdas concretas

### PROMEDIO (AVERAGE)

Calcula la media.

**Sintaxis:**
\`=PROMEDIO(rango)\`

**Ejemplo:**
- \`=PROMEDIO(B2:B6)\` → media de B2 a B6
- Si tienes 5, 8, 10, 7, 9: resultado = 7,8

### MAX y MIN

Encuentran el mayor y el menor.

**Sintaxis:**
\`=MAX(rango)\` → el mayor
\`=MIN(rango)\` → el menor

**Ejemplo:**
- \`=MAX(B2:B6)\` → el valor más alto
- \`=MIN(B2:B6)\` → el valor más bajo

### CONTAR y CONTARA

- \`=CONTAR(rango)\` → cuenta cuántas celdas tienen números.
- \`=CONTARA(rango)\` → cuenta cuántas celdas NO están vacías (texto o números).

**Ejemplo:**
- \`=CONTARA(A2:A100)\` → cuántos nombres tienes en la lista.

### HOY y AHORA

- \`=HOY()\` → fecha de hoy.
- \`=AHORA()\` → fecha y hora actuales.

### Ejercicio: notas de clase

| A | B |
|---|---|
| Alumno | Nota |
| María | 8 |
| José | 6 |
| Ana | 9 |
| Luis | 7 |
| Elena | 8 |

**Estadísticas:**
- Suma total: \`=SUMA(B2:B6)\` → 38
- Promedio: \`=PROMEDIO(B2:B6)\` → 7,6
- Nota máxima: \`=MAX(B2:B6)\` → 9
- Nota mínima: \`=MIN(B2:B6)\` → 6
- Número de alumnos: \`=CONTARA(A2:A6)\` → 5

### Atajos para escribir fórmulas

- Pulsa **=** en una celda vacía.
- Escribe "SUMA" → Excel te sugiere.
- Pulsa **Tab** para aceptar.
- Selecciona el rango con el ratón.
- Pulsa **Enter**.

### Autocompletar

Si escribes la misma fórmula en celdas adyacentes:
1. Selecciona la celda con la fórmula.
2. Arrastra el **cuadrito verde** de la esquina inferior derecha.
3. Excel copia la fórmula y ajusta automáticamente.`,
      steps: [
        'Crea una tabla con 5 notas.',
        'En otra celda: =SUMA(B2:B6).',
        'En otra: =PROMEDIO(B2:B6).',
        'En otra: =MAX(B2:B6).',
        'En otra: =MIN(B2:B6).',
      ],
      tips: [
        'Todas las fórmulas empiezan con =.',
        'Usa ":" para rangos (A1:A10) y ";" para celdas sueltas.',
        'Arrastra el cuadrito verde para copiar fórmulas.',
      ],
      exercise: 'Crea una tabla con 5 productos y precios. Calcula: total, promedio, máximo, mínimo.',
    },
    {
      id: 'excel-05',
      title: 'Función SI (IF): decisiones en Excel',
      duration: '20 min',
      level: 'intermediate',
      content: `## La función más poderosa

La función **SI** toma decisiones según una condición.

### Sintaxis

\`=SI(condición; valor_si_verdadero; valor_si_falso)\`

### Ejemplo simple

En A1 tienes la edad. Quieres saber si es mayor de edad:

\`=SI(A1>=18; "Mayor de edad"; "Menor de edad")\`

- Si A1 = 20 → "Mayor de edad"
- Si A1 = 15 → "Menor de edad"

### Ejemplo práctico: notas

| A | B | C |
|---|---|---|
| Alumno | Nota | Resultado |
| María | 8 | (fórmula) |
| José | 4 | (fórmula) |

En C2 escribe:

\`=SI(B2>=5; "Aprobado"; "Suspenso")\`

Arrastra hacia abajo para aplicar a todos.

### Ejemplo: presupuesto

Quieres saber si gastas mucho en una categoría:

\`=SI(B2>500; "CUIDADO: gasto alto"; "Gasto normal")\`

### Múltiples condiciones: SI anidados

Puedes combinar varios SI:

\`=SI(B2>=9; "Excelente"; SI(B2>=7; "Notable"; SI(B2>=5; "Aprobado"; "Suspenso")))\`

### Operadores de comparación

- **=** igual a
- **<>** distinto de
- **>** mayor que
- **<** menor que
- **>=** mayor o igual que
- **<=** menor o igual que

### Operadores lógicos

**Y (AND):** todas las condiciones deben cumplirse.

\`=SI(Y(B2>=5; C2>=5); "Aprobado en todo"; "Tiene suspensos")\`

**O (OR):** basta con que una se cumpla.

\`=SI(O(B2>=9; C2>=9); "Tiene una nota excelente"; "Ninguna excelente")\`

### Ejercicio completo

Tabla de alumnos con 2 notas:

| Alumno | Nota1 | Nota2 | Media | Estado |
|---|---|---|---|---|
| María | 8 | 9 | =PROMEDIO(B2:C2) | =SI(D2>=5; "Aprobado"; "Suspenso") |
| José | 4 | 5 | =PROMEDIO(B3:C3) | =SI(D3>=5; "Aprobado"; "Suspenso") |

### Funciones útiles relacionadas

- **=CONTAR.SI(rango; criterio):** cuenta celdas que cumplen una condición.
  - \`=CONTAR.SI(D2:D10; "Aprobado")\` → cuántos aprobados.
- **=SUMAR.SI(rango; criterio; suma):** suma celdas que cumplen condición.
  - \`=SUMAR.SI(B:B; "Gasto"; C:C)\` → suma de todos los gastos.`,
      steps: [
        'Crea una tabla con alumnos y notas.',
        'Calcula media con =PROMEDIO.',
        'Añade columna Estado con =SI.',
        'Cuenta aprobados con =CONTAR.SI.',
      ],
      tips: [
        'Las comillas " " son obligatorias para texto.',
        'Anida SI para varias condiciones.',
        'Usa Y/O para combinar condiciones.',
      ],
      exercise: 'Crea una tabla con tus gastos. Usa SI para marcar cuáles son "gasto alto" (>100€).',
    },
    {
      id: 'excel-06',
      title: 'BUSCARV (VLOOKUP): buscar datos',
      duration: '25 min',
      level: 'intermediate',
      content: `## La función más útil del mundo laboral

**BUSCARV** busca un valor en una tabla y devuelve información relacionada.

### Sintaxis

\`=BUSCARV(valor_buscado; tabla; columna; [coincidencia])\`

- **valor_buscado:** qué quieres buscar.
- **tabla:** dónde buscarlo.
- **columna:** qué columna devolver (1, 2, 3...).
- **coincidencia:** FALSO (exacta) o VERDADERO (aproximada).

### Ejemplo práctico

Tienes una tabla de productos:

| A | B | C |
|---|---|---|
| Código | Nombre | Precio |
| 001 | Manzanas | 2,50 |
| 002 | Pan | 1,20 |
| 003 | Leche | 1,10 |
| 004 | Huevos | 2,80 |

Quieres que al escribir un código, aparezca el precio automáticamente.

**En otra celda, escribe:**
\`=BUSCARV("002"; A1:C4; 3; FALSO)\`

- Busca "002" en la tabla A1:C4.
- Devuelve el valor de la columna 3 (Precio).
- Resultado: **1,20**.

### Ejemplo con referencia a celda

Si en E1 escribes "003", en F1 pones:

\`=BUSCARV(E1; A1:C4; 3; FALSO)\`

Resultado: **1,10** (precio de la leche).

### Ejemplo: nómina con tipo de IRPF

Tabla de tipos de IRPF (en Hoja2):

| A | B |
|---|---|
| Tramo | Tipo IRPF |
| 1500 | 19% |
| 2000 | 24% |
| 3000 | 30% |

En tu hoja principal, escribes salario (ej: 1800) y BUSCARV te da el tipo:

\`=BUSCARV(A1; Hoja2!A1:B3; 2; VERDADERO)\`

> Con **VERDADERO** busca el tramo aproximado.

### Errores comunes

**#N/A:** no encuentra el valor. Verifica:
- ¿El valor existe en la primera columna?
- ¿Está bien escrito?
- ¿Usaste FALSO para coincidencia exacta?

**#¡REF!:** la columna indicada no existe. Si pones columna 5 pero tu tabla solo tiene 3 columnas.

### Consejos

1. **Fija la tabla con $**: si vas a copiar la fórmula.
   - \`=BUSCARV(E1; $A$1:$C$4; 3; FALSO)\`
2. **Coincidencia exacta:** usa FALSO (0).
3. **Datos ordenados:** para búsquedas aproximadas, ordena la columna ascendente.

### BUSCARX (más moderna)

En Excel 365/2021, existe **BUSCARX** (XLOOKUP):

\`=BUSCARX(E1; A1:A4; C1:C4)\`

Más potente: busca en cualquier dirección, no requiere orden.

### Ejercicio: inventario de tienda

1. Crea una tabla con 10 productos: código, nombre, precio, stock.
2. En otra zona, escribe un código.
3. Usa BUSCARV para mostrar nombre y precio automáticamente.
4. Prueba con varios códigos.`,
      steps: [
        'Crea una tabla de productos (código, nombre, precio).',
        'En otra celda escribe un código a buscar.',
        'Usa =BUSCARV(código; tabla; columna; FALSO).',
        'Fija la tabla con $ para copiar la fórmula.',
      ],
      tips: [
        'Usa FALSO (0) para coincidencia exacta.',
        'Fija rangos con $ para evitar errores al copiar.',
        'BUSCARV busca siempre en la PRIMERA columna de la tabla.',
      ],
      exercise: 'Crea un inventario. Usa BUSCARV para que al escribir un código aparezca el precio.',
    },
    {
      id: 'excel-07',
      title: 'Gráficos y visualización',
      duration: '20 min',
      level: 'intermediate',
      content: `## Convierte datos en imágenes

Los gráficos hacen que tus datos sean fáciles de entender.

### Crear un gráfico básico

1. Selecciona los datos (incluyendo encabezados).
2. Pestaña **Insertar**.
3. Elige tipo de gráfico:
   - **Columnas:** comparar categorías.
   - **Barras:** como columnas pero horizontales.
   - **Líneas:** evolución en el tiempo.
   - **Circular (tarta):** porcentajes de un total.
   - **Dispersión:** relación entre 2 variables.

### Ejemplo: gráfico de gastos

Tu presupuesto:

| Categoría | Importe |
|---|---|
| Alquiler | 800 |
| Comida | 400 |
| Transporte | 100 |
| Ocio | 80 |
| Otros | 240 |

**Gráfico circular:**
1. Selecciona A1:B5.
2. Insertar → Circular.
3. Aparece el gráfico.
4. Muestra los porcentajes de cada gasto.

**Gráfico de columnas:**
1. Selecciona A1:B5.
2. Insertar → Columnas.
3. Compara visualmente cada categoría.

### Modificar el gráfico

**Título:**
- Doble clic en el título.
- Escribe: "Mis gastos mensuales".

**Etiquetas de datos:**
- Click derecho en el gráfico → **Agregar etiquetas de datos**.
- Aparece el valor en cada barra/sector.

**Cambiar colores:**
- Selecciona el gráfico.
- Pestaña **Diseño de gráfico** → Cambiar colores.
- O pestaña **Formato** → relleno.

**Leyenda:**
- Click + (arriba derecha del gráfico).
- Marca/desmarca "Leyenda".

### Tipos de gráficos recomendados

**Para presupuestos:**
- Circular: porcentajes.
- Columnas: comparar categorías.

**Para evolución temporal:**
- Líneas: ventas mensuales.
- Área: acumulado.

**Para comparar 2 series:**
- Columnas agrupadas.
- Líneas con 2 series.

### Gráfico combinado

Útil para mostrar 2 cosas distintas (ej: ingresos y gastos):

1. Selecciona los datos.
2. Insertar → Gráfico combinado.
3. Una serie en columnas, otra en línea.
4. Marca "Eje secundario" si los valores son muy distintos.

### Diseño rápido

Pestaña **Diseño de gráfico** → Diseños rápidos:
- Elige un diseño predefinido con títulos, etiquetas, etc.

### Mover y redimensionar

- Arrastra el gráfico a otra posición.
- Arrastra las esquinas para cambiar tamaño.

### Copiar gráfico a Word

1. Click derecho sobre el gráfico → Copiar.
2. Abre Word.
3. Click derecho → Pegar.
4. Opción: "Imagen" (no se modifica) o "Gráfico de Excel" (editable).`,
      steps: [
        'Crea una tabla de gastos por categoría.',
        'Selecciona los datos.',
        'Insertar → Circular.',
        'Añade etiquetas de datos y título.',
        'Cambia los colores.',
      ],
      tips: [
        'Circular: máximo 5-7 categorías para que se entienda.',
        'Líneas: ideal para mostrar evolución en el tiempo.',
        'Copia tus gráficos a Word para informes profesionales.',
      ],
      exercise: 'Crea un gráfico circular de tus gastos mensuales. Pon título y etiquetas.',
    },
    {
      id: 'excel-08',
      title: 'Filtros, ordenar y formato condicional',
      duration: '20 min',
      level: 'intermediate',
      content: `## Analizar grandes tablas

Cuando tienes muchos datos, necesitas filtrar y resaltar.

### Ordenar datos

1. Selecciona tu tabla.
2. Pestaña **Datos → Ordenar**.
3. Elige:
   - Columna por la que ordenar.
   - Ordenar por: valor, color de celda, etc.
   - De A a Z / De Z a A.
   - De menor a mayor / mayor a menor.

**Ejemplo:** ordena tus gastos por importe (de mayor a menor) para ver los más caros.

### Filtros

1. Selecciona los encabezados.
2. Pestaña **Datos → Filtro**.
3. Aparecen flechas ▼ junto a cada encabezado.
4. Pulsa una flecha para filtrar.

**Filtrar por valor:**
- Marca/desmarca valores que quieras ver.

**Filtrar por condición:**
- Números: "mayor que", "menor que", "entre"...
- Texto: "contiene", "empieza por"...
- Fechas: "este mes", "este año"...

**Ejemplo:** filtra tus gastos para ver solo los superiores a 100€.

### Quitar filtro

- Pulsa la flecha → **Borrar filtro**.
- O pestaña Datos → Quitar (el embudo tachado).

### Formato condicional

Resalta celdas según su valor.

1. Selecciona las celdas.
2. Pestaña **Inicio → Formato condicional**.
3. Elige una regla:

**Reglas más usadas:**

- **Resaltar celdas:**
  - Mayor que...
  - Menor que...
  - Entre...
  - Igual a...

- **Superior/inferior:**
  - 10 valores más altos.
  - 10% inferior.

- **Barras de datos:**
  - Barra horizontal en cada celda según el valor.

- **Escalas de color:**
  - Verde para alto, rojo para bajo.

- **Conjuntos de iconos:**
  - Flechas, semáforos, estrellas.

**Ejemplo práctico:**

1. Selecciona columna "Importe" de tus gastos.
2. Formato condicional → Resaltar celdas → Mayor que...
3. Escribe: 200.
4. Elige color: rojo.
5. Todos los gastos >200€ se ponen en rojo.

### Validación de datos

Evita errores al escribir:

1. Selecciona celdas.
2. Pestaña **Datos → Validación de datos**.
3. Permitir: Lista, Número, Fecha...
4. Ejemplo: lista desplegable con "Ingreso" y "Gasto".

### Buscar y reemplazar

- **Ctrl + B** (Buscar).
- **Ctrl + L** (Reemplazar).
- Ejemplo: reemplazar "Madrid" por "Madrid (España)".

### Inmovilizar paneles

Para tablas grandes:

1. Selecciona la celda debajo de los encabezados.
2. Pestaña **Vista → Inmovilizar paneles**.
3. Los encabezados se quedan fijos al hacer scroll.

### Agrupar y subtotal

Para tablas con categorías:

1. Ordena por categoría.
2. Pestaña **Datos → Subtotal**.
3. Para cada cambio en "Categoría", usa "Suma" sobre "Importe".
4. Excel crea totales por categoría automáticamente.`,
      steps: [
        'Aplica Filtro a tus encabezados.',
        'Filtra para ver solo gastos >100€.',
        'Aplica formato condicional: resaltar >200€ en rojo.',
        'Inmoviliza la primera fila.',
      ],
      tips: [
        'Los filtros no borran datos, solo los ocultan.',
        'El formato condicional ayuda a ver patrones.',
        'Inmoviliza paneles en tablas grandes para no perder encabezados.',
      ],
      exercise: 'Filtra tu presupuesto para ver solo gastos >100€. Resalta en rojo los >200€.',
    },
    {
      id: 'excel-09',
      title: 'Imprimir y configurar página',
      duration: '15 min',
      level: 'beginner',
      content: `## Tu hoja lista para papel

Imprimir en Excel tiene sus trucos para que salga bien.

### Vista previa

Siempre antes de imprimir:

1. **Archivo → Imprimir** (o Ctrl + P).
2. Mira la vista previa a la derecha.
3. Verifica que todo cabe.

### Configurar página

Pestaña **Disposición de página**:

**Márgenes:**
- Normal, Estrecho, Ancho, Personalizado.

**Orientación:**
- Vertical: pocas columnas.
- Horizontal: muchas columnas.

**Tamaño:**
- A4 (predeterminado España).

**Escala:**
- "Ajustar a: 1 página de ancho" — para que quepa todo.

### Área de impresión

Para imprimir solo una parte:

1. Selecciona el rango que quieres imprimir.
2. Pestaña Disposición de página → **Área de impresión → Establecer**.

### Repetir encabezados

Si tu tabla ocupa varias páginas:

1. Disposición de página → **Imprimir títulos**.
2. Filas que repetir arriba: selecciona la fila 1 (encabezados).
3. En cada página aparecerán los encabezados.

### Centrar en la página

1. Disposición de página → margen → **Personalizado**.
2. Marca "Centrar en la página: horizontalmente" y "verticalmente".

### Encabezado y pie de página

1. Pestaña **Insertar → Encabezado y pie de página**.
2. Encabezado: título, fecha.
3. Pie de página: número de página, autor.

### Insertar saltos de página

Para forzar que una sección empiece en página nueva:

1. Selecciona la celda donde quieres el salto.
2. Pestaña Disposición de página → **Saltos → Insertar salto de página**.

### Quitar líneas de cuadrícula al imprimir

Por defecto, las cuadrículas NO se imprimen. Si quieres que sí:

1. Pestaña Diseño de página → marca "Imprimir" bajo "Cuadrículas".

### Exportar a PDF

1. Archivo → Exportar → Crear PDF/XPS.
2. O Guardar como → PDF.

### Configuración rápida de impresión

En Archivo → Imprimir:

- **Imprimir selección activa:** solo lo seleccionado.
- **Imprimir libro activo:** todas las hojas.
- **Imprimir tabla:** solo la tabla seleccionada.

### Ejercicio práctico

1. Crea tu presupuesto mensual.
2. Configura: orientación horizontal, márgenes estrechos.
3. Repite encabezados en todas las páginas.
4. Añade pie de página con número de página.
5. Exporta a PDF.

### Errores comunes al imprimir

- **Una columna se queda corta:** ajusta ancho o escala.
- **Sale en muchas páginas:** reduce escala a 80%.
- **No se ven las cuadrículas:** aplica bordes a las celdas.`,
      steps: [
        'Abre tu presupuesto.',
        'Disposición de página → Orientación horizontal.',
        'Imprimir títulos → repetir fila de encabezados.',
        'Archivo → Imprimir → revisa vista previa.',
        'Exporta a PDF.',
      ],
      tips: [
        'Revisa siempre la vista previa antes de imprimir.',
        'Usa "Ajustar a 1 página de ancho" para tablas anchas.',
        'Repite encabezados en tablas largas.',
      ],
      exercise: 'Configura tu presupuesto para imprimir. Exporta a PDF y comprueba que se ve bien.',
    },
    {
      id: 'excel-10',
      title: 'Trucos avanzados: tablas dinámicas',
      duration: '25 min',
      level: 'advanced',
      content: `## Análisis profesional de datos

Las **tablas dinámicas** son la herramienta más potente de Excel.

### Qué son

Permiten resumir y analizar grandes cantidades de datos en segundos.

### Crear una tabla dinámica

1. Selecciona tus datos (con encabezados).
2. Pestaña **Insertar → Tabla dinámica**.
3. Confirma el rango.
4. Elige: "Nueva hoja de cálculo".
5. Pulsa Aceptar.

### Ejemplo: ventas por categoría

Imagina que tienes esta tabla (100+ filas):

| Fecha | Categoría | Producto | Importe |
|---|---|---|---|
| 01/03 | Comida | Manzanas | 5 |
| 02/03 | Limpieza | Jabón | 3 |
| 02/03 | Comida | Pan | 2 |
| ... | ... | ... | ... |

**Quieres ver total por categoría.**

1. Inserta tabla dinámica.
2. En el panel derecho:
   - Arrastra **Categoría** a "Filas".
   - Arrastra **Importe** a "Valores".
3. Aparece:

| Categoría | Suma de Importe |
|---|---|
| Comida | 245 |
| Limpieza | 87 |
| Transporte | 60 |
| Otros | 35 |
| **Total general** | **427** |

### Cambiar la función

Por defecto, SUMA. Puedes cambiar a:
- Promedio
- Contar
- Máximo
- Mínimo

1. Click en "Suma de Importe".
2. Configuración del campo.
3. Elige la función.

### Agrupar por fechas

Si tienes fechas:

1. Click derecho en una fecha de la tabla dinámica.
2. **Agrupar**.
3. Elige: meses, trimestres, años.

Resultado: ventas por mes, por trimestre, por año.

### Añadir más dimensiones

Arrastra **Categoría** a Filas y **Producto** a Filas debajo. Aparece jerarquía:

> Comida
>   Manzanas
>   Pan
>   Leche
> Limpieza
>   Jabón
>   ...

### Segmentación de datos (filtros visuales)

1. Selecciona la tabla dinámica.
2. Pestaña **Analizar → Insertar segmentación de datos**.
3. Marca: Categoría, Mes.
4. Aparecen botones grandes para filtrar visualmente.

### Gráfico dinámico

1. Selecciona la tabla dinámica.
2. Pestaña Analizar → Gráfico dinámico.
3. Elige tipo de gráfico.
4. Se actualiza con la tabla.

### Actualizar datos

Si cambias tus datos originales:

1. Click derecho en la tabla dinámica.
2. **Actualizar**.

### Ejercicio práctico: control de gastos anual

1. Crea una tabla con todos tus gastos del año: fecha, categoría, importe, descripción.
2. Inserta tabla dinámica.
3. Analiza:
   - Gasto total por mes.
   - Gasto por categoría.
   - Gasto promedio mensual.
   - Categoría con más gasto.
4. Crea un gráfico dinámico.

### Consejos

- Siempre con encabezados claros.
- No dejes filas vacías en los datos originales.
- Actualiza la tabla cuando cambien los datos.
- Usa segmentación para filtrar fácil.`,
      steps: [
        'Crea una tabla con 20+ filas de datos.',
        'Insertar → Tabla dinámica.',
        'Arrastra campos a Filas y Valores.',
        'Cambia función (suma, promedio).',
        'Inserta un gráfico dinámico.',
      ],
      tips: [
        'Las tablas dinámicas son ideales para >100 filas.',
        'Usa segmentación para filtros visuales.',
        'Actualiza la tabla cuando cambien tus datos.',
      ],
      exercise: 'Crea una tabla con tus gastos de 3 meses. Haz una tabla dinámica por categoría y mes.',
    },
  ],
};

// ------------------------------------------------------------
// MÓDULO 3: MICROSOFT POWERPOINT
// ------------------------------------------------------------
const powerpointModule: OfficeModule = {
  id: 'powerpoint',
  app: 'powerpoint',
  title: 'Microsoft PowerPoint',
  icon: '📽️',
  color: 'from-orange-500 to-red-600',
  description:
    'Crea presentaciones impactantes para entrevistas, clases o reuniones. Aprende diseño, animaciones y exposición.',
  freeAlternative: 'Google Slides (slides.google.com) — Gratis con cuenta de Gmail.',
  lessons: [
    {
      id: 'ppt-01',
      title: 'Tu primera presentación',
      duration: '15 min',
      level: 'beginner',
      content: `## Empezar con PowerPoint

PowerPoint crea presentaciones con diapositivas ("slides").

### Abrir PowerPoint

1. Botón Inicio → escribe "PowerPoint".
2. Selecciona **"Presentación en blanco"**.

### Partes de la pantalla

- **Diapositiva actual (centro):** lo que estás editando.
- **Panel izquierdo:** miniaturas de todas las diapositivas.
- **Cinta de opciones (arriba):** herramientas.
- **Notas (abajo):** tus apuntes para exponer.

### Pestañas principales

- **Inicio:** texto, fuentes, nuevas diapositivas.
- **Insertar:** imágenes, tablas, formas.
- **Diseño:** temas y variantes.
- **Transiciones:** efectos entre diapositivas.
- **Animaciones:** movimiento de elementos.
- **Presentación:** cómo se ve al exponer.

### Añadir una nueva diapositiva

1. Pestaña Inicio → **Nueva diapositiva**.
2. O: Ctrl + M.
3. Elige un diseño (título, contenido, dos columnas...).

### Escribir texto

1. Haz clic en un cuadro de texto.
2. Escribe.
3. Pulsa fuera del cuadro para terminar.

### Tu primera presentación: 3 diapositivas

**Diapositiva 1: Título**
- Título: "Hola, soy [tu nombre]"
- Subtítulo: "Inmigrante emprendedor en España"

**Diapositiva 2: Sobre mí**
- "Soy de [país]"
- "Llevo en España [X] años"
- "Trabajo como [profesión]"
- "Mi sueño es [objetivo]"

**Diapositiva 3: Gracias**
- "¡Gracias por su atención!"
- "[tu email]"

### Guardar

1. Archivo → Guardar como.
2. Nombre: "Mi primera presentación".
3. Formato: .pptx.`,
      steps: [
        'Abre PowerPoint → Presentación en blanco.',
        'Crea 3 diapositivas (Ctrl+M).',
        'Escribe título, contenido y despedida.',
        'Guarda con nombre claro.',
      ],
      tips: [
        'Una idea por diapositiva.',
        'Usa frases cortas, no párrafos.',
        'Las primeras presentaciones: mantén simples.',
      ],
      exercise: 'Crea una presentación de 3 diapositivas presentándote.',
    },
    {
      id: 'ppt-02',
      title: 'Diseño y temas profesionales',
      duration: '20 min',
      level: 'beginner',
      content: `## Presentaciones bonitas y profesionales

El diseño comunica tanto como las palabras.

### Aplicar un tema

1. Pestaña **Diseño**.
2. Elige un tema de la galería.
3. Se aplica a todas las diapositivas.

**Temas recomendados:**
- **Estilo mínimo:** para empresa.
- **Colorido:** para educación o eventos.
- **Serio oscuro:** para presentaciones profesionales.

### Variantes de color

Cada tema tiene variantes. Pulsa el botón "Variante" para cambiar colores.

### Diseño de diapositivas

Cada diapositiva puede tener un diseño distinto:

- **Título:** solo título y subtítulo.
- **Título y contenido:** título + texto/viñetas.
- **Sección:** separador entre temas.
- **Dos contenidos:** comparar 2 cosas.
- **Imagen con título:** foto + título.

### Cambiar fondo

1. Click derecho en el fondo → **Dar formato al fondo**.
2. Elige:
   - Color sólido.
   - Degradado.
   - Imagen (de archivo o de internet).

### Fuentes recomendadas

- **Títulos:** Arial, Calibri, Montserrat (24-44 pt).
- **Texto:** Arial, Calibri, Open Sans (18-24 pt).
- Evita: Comic Sans, fuentes muy decorativas.

### Colores que combinan

**Fórmula 60-30-10:**
- 60% color principal (fondo).
- 30% color secundario (textos).
- 10% color de acento (resaltar).

**Combinaciones seguras:**
- Blanco + azul + naranja.
- Blanco + verde + marrón.
- Negro + blanco + dorado.

### Plantillas gratuitas

Descarga plantillas profesionales gratuitas:

- **slidesgo.com** (miles de plantillas).
- **Canva.com** (diseños modernos).
- **Microsoft Office Online** (plantillas oficiales).

### Diseña tu CV visual

Para una entrevista, crea una presentación con:

1. **Diapositiva 1:** Tu nombre y foto.
2. **Diapositiva 2:** Perfil profesional.
3. **Diapositiva 3:** Experiencia laboral.
4. **Diapositiva 4:** Formación.
5. **Diapositiva 5:** Habilidades.
6. **Diapositiva 6:** Proyectos destacados.
7. **Diapositiva 7:** Contacto y "gracias".`,
      steps: [
        'Aplica un tema de la galería Diseño.',
        'Cambia la variante de color.',
        'Crea 5 diapositivas con distintos diseños.',
        'Cambia fuentes a Arial.',
      ],
      tips: [
        'No uses más de 2-3 colores por diapositiva.',
        'Tamaño mínimo de fuente: 18 pt.',
        'Descarga plantillas gratuitas en slidesgo.com.',
      ],
      exercise: 'Aplica un tema profesional a tu presentación. Cambia colores y fuentes.',
    },
    {
      id: 'ppt-03',
      title: 'Imágenes, formas y elementos visuales',
      duration: '20 min',
      level: 'intermediate',
      content: `## Diapositivas atractivas

Las imágenes transmiten más que el texto.

### Insertar imágenes

1. Pestaña **Insertar → Imágenes**.
2. Elige: Desde archivo / En línea / Iconos.

**Bancos de imágenes gratuitos:**
- **unsplash.com** (fotos profesionales).
- **pexels.com** (fotos y vídeos).
- **pixabay.com** (fotos, ilustraciones, iconos).
- **flaticon.com** (iconos).

### Insertar iconos

1. Pestaña Insertar → **Iconos**.
2. Busca por categoría (negocio, tecnología...).
3. Selecciona → Insertar.
4. Puedes cambiar color y tamaño.

### Insertar formas

1. Pestaña Insertar → **Formas**.
2. Elige: rectángulo, flecha, círculo, estrella...
3. Dibuja en la diapositiva.

**Útil para:**
- Diagramas de flujo.
- Resaltar información.
- Botones (con texto dentro).

### SmartArt

Diagramas profesionales automáticos:

1. Pestaña Insertar → **SmartArt**.
2. Elige: lista, proceso, jerarquía, ciclo...
3. Escribe texto en el panel izquierdo.
4. PowerPoint crea el diagrama automáticamente.

### Insertar tabla

1. Pestaña Insertar → **Tabla**.
2. Selecciona filas y columnas.
3. Escribe tus datos.

### Insertar gráfico

1. Pestaña Insertar → **Gráfico**.
2. Elige tipo (columnas, líneas, circular...).
3. Edita los datos en la mini-hoja de Excel que aparece.
4. El gráfico se actualiza.

### Captura de pantalla

1. Pestaña Insertar → **Captura de pantalla**.
2. Elige ventana abierta o "Recorte de pantalla".
3. La imagen se inserta en la diapositiva.

### Editar imágenes

Selecciona la imagen → pestaña **Formato de imagen**:

- **Recortar:** quitar partes.
- **Quitar fondo:** eliminar fondo automáticamente.
- **Corrección de color:** brillo, contraste.
- **Estilos:** marcos, sombras, reflejos.
- **Comprimir:** reducir tamaño del archivo.

### Alinear elementos

1. Selecciona varios elementos (con Ctrl).
2. Pestaña Formato → **Alinear**.
3. Elige: alinear a la izquierda, centrar, distribuir...

> **Truco profesional:** Alinear elementos hace que la diapositiva se vea cuidada y profesional.

### Agrupar elementos

1. Selecciona varios elementos (Ctrl + clic).
2. Click derecho → **Agrupar**.
3. Se mueven juntos como uno solo.`,
      steps: [
        'Inserta una imagen desde Unsplash.',
        'Inserta 3 iconos relacionados.',
        'Crea un SmartArt de proceso.',
        'Alinea todos los elementos al centro.',
      ],
      tips: [
        'Usa imágenes de alta calidad (Unsplash, Pexels).',
        'Alinea elementos para un aspecto profesional.',
        'No recargues: 1 imagen principal por diapositiva.',
      ],
      exercise: 'Crea una diapositiva con imagen, iconos y un SmartArt sobre tu trayectoria.',
    },
    {
      id: 'ppt-04',
      title: 'Transiciones y animaciones',
      duration: '20 min',
      level: 'intermediate',
      content: `## Movimiento que comunica

Las animaciones guían la atención del público.

### Transiciones entre diapositivas

Efecto al cambiar de una diapositiva a otra.

1. Selecciona una diapositiva (panel izquierdo).
2. Pestaña **Transiciones**.
3. Elige un efecto:
   - **Sutil:** fundido, empuje.
   - **Espectacular:** cubo, escaparate.
   - **Dinámico:** giro, vuelo.

**Configurar:**
- Duración: 1-2 segundos.
- Avance: al hacer clic o automático (cada X segundos).

### Aplicar a todas

Botón **Aplicar a todas** → misma transición en toda la presentación.

> **Recomendación:** usa la MISMA transición en toda la presentación. Evita mezclar.

### Animaciones de elementos

Movimiento de elementos DENTRO de una diapositiva.

1. Selecciona un elemento (texto, imagen).
2. Pestaña **Animaciones**.
3. Elige tipo:

**Entrada:** cómo aparece.
- Aparecer, Fundir, Volar, Zoom, Botar.

**Énfasis:** resaltar.
- Girar, Latir, Cambiar color.

**Salida:** cómo desaparece.
- Fundir, Volar fuera.

**Trayectoria:** movimiento libre.

### Panel de animaciones

1. Pestaña Animaciones → **Panel de animaciones**.
2. Ve todas las animaciones de la diapositiva.
3. Arrastra para reordenar.
4. Click derecho → opciones avanzadas.

### Cuándo usar animaciones

**Sí:**
- Aparecer viñetas una a una.
- Resaltar una gráfica.
- Mostrar pasos de un proceso.

**No:**
- En cada palabra.
- Efectos llamativos en presentaciones serias.
- Animaciones que distraen.

### Configurar inicio

- **Al hacer clic:** tú controlas.
- **Con anterior:** automático, después de la anterior.
- **Después de la anterior:** espera X segundos.

### Ejercicio: presentación animada

1. Crea 3 diapositivas.
2. Aplica transición "Fundido" a todas.
3. En la diapositiva 2: anima las viñetas para aparecer una a una.
4. En la diapositiva 3: anima una imagen con "Zoom".

### Presentar con notas

1. Pestaña Vista → **Notas**.
2. Escribe tus apuntes bajo cada diapositiva.
3. En presentación: tus notas aparecen en tu pantalla (no en la proyección).

### Modo presentador

Durante la presentación:
- Pulsa **F5** para empezar desde el principio.
- Pulsa **Shift + F5** para empezar desde la diapositiva actual.
- **B** pantalla negra (pausa).
- **W** pantalla blanca.
- **Esc** salir.`,
      steps: [
        'Aplica transición "Fundido" a todas las diapositivas.',
        'Selecciona una lista con viñetas.',
        'Aplica animación "Aparecer" a cada viñeta.',
        'Configura: "Con anterior" para que se vean en secuencia.',
      ],
      tips: [
        'Usa la MISMA transición en toda la presentación.',
        'Anima elementos para guiar al espectador.',
        'No abuses de animaciones en presentaciones serias.',
      ],
      exercise: 'Crea una presentación con transiciones y animaciones en viñetas.',
    },
    {
      id: 'ppt-05',
      title: 'Presentación para entrevista de trabajo',
      duration: '25 min',
      level: 'intermediate',
      content: `## Tu momento de brillar

Algunas entrevistas piden una presentación sobre ti. Aquí te enseñamos a hacerla.

### Estructura recomendada (5-7 diapositivas)

**Diapositiva 1: Portada**
- Tu nombre.
- Puesto al que aspiras.
- Foto profesional (opcional).

**Diapositiva 2: Quién soy**
- 1 frase potente: "Soy [profesión] con X años de experiencia en [sector]".
- Origen y trayectoria breve.

**Diapositiva 3: Experiencia relevante**
- 3 trabajos más relevantes.
- Para cada uno: puesto, empresa, 1 logro clave.
- Ejemplo: "Camarero en Hotel X (2020-2023) - Incrementé satisfacción del cliente en 25%".

**Diapositiva 4: Formación**
- Títulos principales.
- Cursos relevantes.
- Idiomas.

**Diapositiva 5: Habilidades**
- Hard skills (técnicas): Excel, idiomas, herramientas.
- Soft skills (blandas): liderazgo, comunicación, adaptabilidad.

**Diapositiva 6: Por qué esta empresa**
- Investiga la empresa antes.
- Conecta tus valores con los suyos.
- "Admiro vuestro compromiso con [valor de la empresa]".

**Diapositiva 7: Mis próximos pasos**
- "En los primeros 90 días, me propongo..."
- Compromiso con resultados.

**Diapositiva 8: Gracias + contacto**
- "¡Gracias por su tiempo!"
- Email, teléfono, LinkedIn.

### Consejos de diseño

- **Colores:** usa colores de la empresa (muestra investigación).
- **Imágenes:** fotos profesionales, no selfies.
- **Texto:** mínimo, grande, claro.
- **Datos:** si puedes, muestra cifras concretas (%, €, +).

### Ensayar

1. Pestaña **Presentación → Ensayar intervalos**.
2. PowerPoint cronometra cada diapositiva.
3. Practica hasta que cada diapositiva tome 1-2 minutos.

### Tiempos recomendados

- Presentación 5-7 min: 5-7 diapositivas.
- Cada diapositiva: 45-90 segundos.
- Deja 2-3 min para preguntas.

### Notas del orador

Escribe en las notas lo que vas a decir. NO leas las diapositivas: explica y amplía.

### Exportar a PDF

Para enviar antes de la entrevista:

1. Archivo → Exportar → Crear PDF.
2. Se ve igual en cualquier ordenador.

### Guardar como vídeo

1. Archivo → Exportar → Crear vídeo.
2. Calidad: HD o Full HD.
3. Usa intervalos grabados o segundos por diapositiva.

### Errores comunes

- **Demasiado texto:** las diapositivas no son para leer.
- **Muchas animaciones:** distraen.
- **Fuentes pequeñas:** se ven mal de lejos.
- **Poco ensayo:** nerves te jugarán en contra.

### Ejercicio final

Crea una presentación de 7 diapositivas sobre ti para una entrevista imaginaria. Practica 5 veces en voz alta.`,
      steps: [
        'Crea 7 diapositivas siguiendo la estructura.',
        'Aplica colores de la empresa (investiga).',
        'Escribe notas del orador en cada diapositiva.',
        'Ensaya 5 veces con cronómetro (objetivo: 5-7 min).',
        'Exporta a PDF para enviar.',
      ],
      tips: [
        'Una idea por diapositiva.',
        'Cifras concretas: %, €, números.',
        'Ensaya 5+ veces en voz alta.',
      ],
      exercise: 'Crea una presentación de 7 diapositivas para una entrevista. Practica en voz alta.',
    },
    {
      id: 'ppt-06',
      title: 'Imprimir y exportar',
      duration: '10 min',
      level: 'beginner',
      content: `## Comparte tu presentación

Aprende a imprimir, exportar y compartir.

### Imprimir diapositivas

1. **Archivo → Imprimir** (o Ctrl + P).
2. Configura:
   - **Copias.**
   - **Impresora.**
   - **Diapositivas:** todas o algunas (ej: "1-5").
3. **Diseño de impresión:**
   - Diapositivas completas (1 por página).
   - 2, 3, 4, 6 o 9 diapositivas por página.
   - Páginas de notas (con tus apuntes).
   - Esquema (solo texto).

### Imprimir páginas de notas

Ideal para llevar apuntes al exponer:

1. Archivo → Imprimir.
2. Diseño: **Páginas de notas**.
3. Cada página tiene 1 diapositiva + tus notas debajo.

### Imprimir 3 diapositivas con líneas

Para repartir al público:

1. Diseño: **3 diapositivas con líneas**.
2. Cada página tiene 3 diapositivas + líneas para escribir.

### Exportar a PDF

Para enviar por email:

1. Archivo → Guardar como → PDF.
2. O: Archivo → Exportar → Crear PDF/XPS.

> **Ventaja:** el PDF se ve igual en cualquier dispositivo. Nadie puede modificarlo.

### Exportar como imágenes

1. Archivo → Guardar como.
2. Tipo: JPEG o PNG.
3. Elige: todas las diapositivas o solo la actual.

Cada diapositiva se guarda como imagen separada.

### Exportar como vídeo

1. Archivo → Exportar → Crear vídeo.
2. Calidad: HD (720p) o Full HD (1080p).
3. Tiempo por diapositiva (si no tiene narración).
4. Pulsa "Crear vídeo".

Útil para subir a YouTube o enviar por WhatsApp.

### Empaquetar para CD/USB

Para llevar tu presentación a otro ordenador:

1. Archivo → Exportar → **Empaquetar para CD**.
2. "Empaquetar para USB".
3. Copia todas las imágenes, fuentes y archivos relacionados.

> Garantiza que tu presentación se vea igual en cualquier ordenador.

### Compartir online

**OneDrive:**
1. Archivo → Compartir.
2. Sube a OneDrive (gratis con cuenta Microsoft).
3. Genera enlace para compartir.

**Google Drive (alternativa):**
1. Sube el .pptx a Google Drive.
2. Click derecho → Abrir con → Google Slides.
3. Comparte el enlace.

### Comprimir imágenes

Si el archivo es muy grande:

1. Selecciona una imagen.
2. Pestaña Formato → **Comprimir imágenes**.
3. Desmarca "Solo a esta imagen" (aplica a todas).
4. Resolución: "Web (150 ppi)" o "Correo (96 ppi)".
5. Pulsa Aceptar.
6. Guarda el archivo (ahora pesa menos).`,
      steps: [
        'Abre Archivo → Imprimir.',
        'Cambia el diseño a "3 diapositivas con líneas".',
        'Cierra sin imprimir.',
        'Exporta a PDF.',
        'Sube el PDF a Google Drive o OneDrive.',
      ],
      tips: [
        'Para enviar por email: PDF.',
        'Para que nadie modifique: PDF.',
        'Para presentar en otro PC: empaqueta para USB.',
      ],
      exercise: 'Exporta tu presentación a PDF. Compártela contigo mismo por email.',
    },
  ],
};

// ------------------------------------------------------------
// MÓDULO 4: GOOGLE DOCS
// ------------------------------------------------------------
const googleDocsModule: OfficeModule = {
  id: 'google-docs',
  app: 'google-docs',
  title: 'Google Docs',
  icon: '📄',
  color: 'from-blue-500 to-indigo-600',
  description:
    'La alternativa gratuita a Word. Trabaja desde cualquier dispositivo, comparte y colabora en tiempo real. Solo necesitas Gmail.',
  freeAlternative: '¡Es 100% gratis! Solo necesitas una cuenta de Gmail.',
  lessons: [
    {
      id: 'gdoc-01',
      title: 'Empezar con Google Docs',
      duration: '8 min',
      level: 'beginner',
      content: `## Tu Word gratis en internet

Google Docs es gratuito y funciona en cualquier dispositivo con internet.

### Acceder

1. Entra en **docs.google.com**.
2. Inicia sesión con tu cuenta de Gmail.
3. Pulsa **"+"** o **"Documento en blanco"**.

> **Si no tienes Gmail:** créalo gratis en gmail.com (5 minutos).

### App móvil

Descarga **"Google Docs"** en Google Play o App Store.

### Diferencias con Word

| Word | Google Docs |
|---|---|
| Pago (Office 365) | Gratis |
| En tu ordenador | En internet (nube) |
| Un usuario | Varios a la vez |
| Auto-guardado manual | Auto-guardado automático |
| Archivo .docx | Enlace o .docx |

### Crear tu primer documento

1. Pulsa "Documento en blanco".
2. Escribe en la página.
3. **Se guarda automáticamente** cada pocos segundos.

### Renombrar

1. Arriba a la izquierda, pulsa "Documento sin título".
2. Escribe el nombre: "Mi primer documento".
3. Pulsa Enter.

### Partes de la pantalla

- **Barra de menús:** Archivo, Editar, Ver, Insertar, Formato...
- **Barra de herramientas:** botones rápidos.
- **Página central:** donde escribes.
- **Botones arriba a la derecha:** Comentarios, Compartir, Historial.

### Cerrar y volver a abrir

Tus documentos se guardan en **Google Drive** (drive.google.com).

- Para volver: docs.google.com → "Documentos recientes".
- O drive.google.com → busca tu archivo.`,
      steps: [
        'Entra en docs.google.com.',
        'Inicia sesión con Gmail.',
        'Pulsa "Documento en blanco".',
        'Escribe algo.',
        'Renombra el documento.',
      ],
      tips: [
        'Google Docs se guarda automáticamente.',
        'Tus documentos están en Google Drive.',
        'Funciona en móvil, tablet y ordenador.',
      ],
      exercise: 'Crea tu primer documento en Google Docs. Renómbralo y comprueba que se guarda solo.',
    },
    {
      id: 'gdoc-02',
      title: 'Formato y plantillas',
      duration: '12 min',
      level: 'beginner',
      content: `## Documentos bonitos en segundos

Google Docs tiene plantillas gratuitas listas para usar.

### Usar plantillas

En la pantalla principal de docs.google.com:

1. Arriba verás una galería de plantillas.
2. Categorías:
   - **CVs (Currículums).**
   - **Cartas de presentación.**
   - **Oficios.**
   - **Cartas formales.**
   - **Notas.**
   - **Proyectos.**
3. Elige una → se crea el documento con el diseño.

Solo tienes que sustituir el texto por tus datos.

### Formato de texto

Selecciona texto → barra de herramientas:

- **Fuente:** Arial, Times, Roboto (predeterminado).
- **Tamaño:** 11 pt (normal), 16-24 (títulos).
- **Negrita, cursiva, subrayado.**
- **Color de texto.**
- **Color de resaltado.**

### Estilos de párrafo

- **Normal:** texto normal.
- **Título:** grande, negrita.
- **Subtítulo:** mediano.
- **Encabezado 1, 2, 3:** jerarquía.

Cambia en el menú desplegable de estilos.

### Alineación

- Izquierda, centro, derecha, justificado.

### Listas

- Viñetas: botón con puntos.
- Numeradas: botón 1.2.3.
- Lista de tareas: botón con cuadrito.

### Insertar elementos

Menú **Insertar**:

- **Imagen:** desde tu ordenador, web, Google Drive.
- **Tabla:** filas × columnas.
- **Enlace:** Ctrl + K.
- **Comentario:** Ctrl + Alt + M.
- **Encabezado y pie de página.**
- **Número de página.**
- **Salto de página.**

### Bordes y sombreado

Menú Formato → Estilos de párrafo → Bordes y sombreado:
- Añade bordes a párrafos.
- Color de fondo.

### Limpiar formato

Si el texto está desordenado:
1. Selecciona el texto.
2. Botón "Borrar formato" (Tx en la barra).

### Ejercicio: CV con plantilla

1. En docs.google.com → galería de plantillas.
2. Elige un CV.
3. Sustituye por tus datos.
4. Personaliza colores.
5. Descarga como PDF.`,
      steps: [
        'En docs.google.com, mira la galería de plantillas.',
        'Elige una plantilla de CV.',
        'Sustituye el texto por tus datos.',
        'Cambia colores y fuentes.',
        'Descarga como PDF.',
      ],
      tips: [
        'Usa plantillas: ahorran tiempo.',
        'Roboto y Arial son las fuentes más legibles.',
        'Descarga siempre como PDF para enviar.',
      ],
      exercise: 'Crea tu CV usando una plantilla de Google Docs. Descárgalo como PDF.',
    },
    {
      id: 'gdoc-03',
      title: 'Colaborar y compartir',
      duration: '15 min',
      level: 'intermediate',
      content: `## Trabajar en equipo

La mayor ventaja de Google Docs: **varias personas pueden editar a la vez**.

### Compartir un documento

1. Botón **"Compartir"** (arriba derecha).
2. Añade correos de las personas.
3. Elige permiso:
   - **Editor:** puede editar.
   - **Comentar:** solo comentarios.
   - **Lector:** solo leer.
4. Pulsa **Enviar**.

### Enlace para compartir

1. Botón Compartir.
2. "Cambiar a cualquiera con el enlace".
3. Copia el enlace.
4. Pégalo en un correo, WhatsApp, etc.

### Editar a la vez

Si varias personas editan simultáneamente:

- Cada persona tiene un **color de cursor** distinto.
- Vemos su foto de Google en la esquina.
- Los cambios aparecen en tiempo real.

> Útil para: hacer un CV con ayuda de un amigo, redactar una carta entre dos, etc.

### Comentarios

1. Selecciona texto.
2. Botón **Comentar** (o Ctrl + Alt + M).
3. Escribe tu comentario.
4. Pulsa **Comentar**.

Para responder:
1. Escribe en el cuadro del comentario.
2. Pulsa Responder.

Para resolver:
- Botón **Resolver** (el comentario desaparece pero queda en el historial).

### Sugerencias

Si no quieres editar directamente, sugiere cambios:

1. Arriba derecha: cambia de "Editar" a **"Sugerir"**.
2. Escribe como si editaras.
3. Aparece como sugerencia (en verde).
4. El dueño puede **Aceptar** o **Rechazar**.

### Historial de versiones

1. Menú **Archivo → Historial de versiones → Ver historial**.
2. Ve todas las versiones anteriores.
3. Restaura una versión anterior si hace falta.

### Ver cambios recientes

- Botón "Ver todos los cambios" (arriba).
- O pulsa el botón con líneas de colores.

### Descargar como Word/PDF

Menú **Archivo → Descargar**:
- Microsoft Word (.docx)
- PDF (.pdf)
- Texto plano (.txt)
- HTML
- EPUB

### Publicar en la web

1. Archivo → Compartir → Publicar en la web.
2. Genera un enlace público.
3. Cualquiera puede leerlo (sin cuenta Google).

### Imprimir

- Archivo → Imprimir (Ctrl + P).
- Configura como en Word.`,
      steps: [
        'Pulsa el botón "Compartir".',
        'Añade el email de un amigo.',
        'Pon permiso de "Comentar".',
        'Pide que te deje comentarios en tu documento.',
      ],
      tips: [
        'Varios pueden editar a la vez: aprovecha para pedir ayuda.',
        'Usa "Sugerir" para proponer cambios sin imponer.',
        'Revisa el historial si algo se borró por accidente.',
      ],
      exercise: 'Comparte un documento con un amigo. Pídele que te deje un comentario.',
    },
    {
      id: 'gdoc-04',
      title: 'IA en Google Docs (Gemini)',
      duration: '15 min',
      level: 'intermediate',
      content: `## Escribe con ayuda de IA

Google Docs integra **Gemini** para ayudarte a escribir.

### Función "Ayúdame a escribir"

1. Abre un documento.
2. Si tienes Gemini Advanced: verás un botón con **estrella** ✨.
3. Pulsa "Ayúdame a escribir".
4. Escribe lo que quieres.

**Ejemplos:**

- "Redacta una carta de presentación para un puesto de camarero en Madrid."
- "Escribe un correo formal a mi casero pidiéndole que arregle la nevera."
- "Resume este artículo: [pega el texto]."
- "Haz un borrador de CV para administrativo."

Gemini genera el texto. Tú decides si lo aceptas o lo editas.

### Refinar texto

Selecciona un texto existente y pide a Gemini:

- "Hazlo más formal."
- "Hazlo más corto."
- "Cambia el tono a amistoso."
- "Corrige la gramática."
- "Tradúcelo al inglés."

### Generar imágenes

Gemini puede generar imágenes dentro del documento:

1. Insertar → Imagen → **Generar imagen**.
2. Describe lo que quieres.
3. Aparecen 4 opciones.
4. Elige una.

### Resumir documentos largos

Si tienes un texto largo:
1. Selecciona todo.
2. Pide a Gemini: "Resume en 5 puntos clave".

### Notas:

> La función completa de IA en Google Docs requiere **Google Workspace** o **Gemini Advanced** (suscripción de pago).

> Alternativa gratuita: usa **gemini.google.com** y copia el texto a Google Docs.

### Voice typing (Dictado por voz)

Sin IA, pero muy útil:

1. Menú Herramientas → **Escritura por voz**.
2. Aparece un micrófono a la izquierda.
3. Habla: Google transcribe.
4. Comandos: "punto", "coma", "nueva línea", "borrar".

### Traducir el documento

1. Herramientas → **Traducir documento**.
2. Elige idioma destino.
3. Se crea una copia traducida.

### Ortografía

- Se subraya en rojo lo incorrecto.
- Click derecho para corregir.
- Herramientas → Revisión ortográfica y gramatical.

### Buscar en internet sin salir

1. Herramientas → **Explorar** (o Ctrl + Alt + Shift + I).
2. Aparece un panel derecho.
3. Busca información sin abandonar el documento.

### Ejercicio

1. Abre un documento.
2. Usa "Ayúdame a escribir" (si tienes Gemini) o dicta por voz.
3. Genera una carta de presentación.
4. Tradúcela al inglés.
5. Descarga como PDF.`,
      steps: [
        'Abre un documento en Google Docs.',
        'Usa "Ayúdame a escribir" o escritura por voz.',
        'Genera una carta de presentación.',
        'Tradúcela al inglés.',
        'Descarga como PDF.',
      ],
      tips: [
        'Gemini en Google Docs requiere Gemini Advanced.',
        'Si no lo tienes, usa gemini.google.com y copia el texto.',
        'El dictado por voz es gratis y muy útil.',
      ],
      exercise: 'Usa el dictado por voz o Gemini para escribir una carta. Tradúcela y descárgala como PDF.',
    },
    {
      id: 'gdoc-05',
      title: 'Trucos avanzados: índice y secciones',
      duration: '12 min',
      level: 'advanced',
      content: `## Documentos profesionales largos

Para informes, tesis o documentos extensos.

### Encabezados

Usa los estilos de encabezado:

- **Título 1** (H1): secciones principales.
- **Título 2** (H2): subsecciones.
- **Título 3** (H3): sub-subsecciones.

1. Selecciona un texto.
2. Menú de estilos → Título 1.

### Índice automático

1. Coloca el cursor donde quieres el índice (al principio).
2. Menú **Insertar → Índice**.
3. Elige con números de página o sin ellos.
4. Aparece el índice generado a partir de tus Títulos 1, 2, 3.

**Actualizar índice:**
- Click sobre el índice → botón **Actualizar**.

### Numeración de páginas

1. Insertar → **Números de página**.
2. Elige posición (arriba/abajo) y alineación.
3. Para no numerar la primera: "Mostrar en la primera página" (desmarca).

### Encabezado y pie de página

1. Insertar → **Encabezados y pies de página**.
2. Encabezado: título, autor, fecha.
3. Pie de página: número de página, contacto.

### Notas al pie

1. Coloca el cursor donde quieres el número.
2. Insertar → **Nota al pie** (o Ctrl + Alt + F).
3. Escribe la nota al final de la página.

Útil para citas y referencias.

### Marcadores y enlaces internos

**Crear marcador:**
1. Selecciona un texto.
2. Insertar → **Marcador**.

**Enlazar al marcador:**
1. Selecciona otro texto.
2. Insertar → Enlace (Ctrl + K).
3. Elige "Marcadores" → tu marcador.

### Tabla de contenidos con enlaces

Cuando insertas un índice, los elementos son **clicables**. Al pulsar, saltan a esa sección.

### Documento con viñetas automáticas

1. Escribe con viñetas.
2. Indenta con Tab (subir de nivel).
3. Shift + Tab para bajar de nivel.

### Insertar imágenes y flotar texto

1. Inserta una imagen.
2. Selecciona la imagen.
3. Botón de opciones (debajo de la imagen).
4. Elige: "En línea", "Ajustar texto", "Separar texto", "Detrás del texto", "Delante del texto".

### Insertar gráfico de Google Sheets

1. Menú Insertar → **Gráfico**.
2. Elige tipo.
3. Edita datos en la mini-hoja.
4. Para actualizar: vínculo con Google Sheets.

### Atajos útiles

- **Ctrl + K:** insertar enlace.
- **Ctrl + Alt + 1, 2, 3:** aplicar Título 1, 2, 3.
- **Ctrl + Alt + M:** comentario.
- **Ctrl + Alt + F:** nota al pie.
- **Ctrl + Shift + C:** contar palabras.

### Descargar como PDF/Word

Archivo → Descargar:
- PDF
- Word (.docx)
- EPUB (para libros electrónicos)
- HTML

### Ejercicio: informe profesional

1. Crea un documento de 5 páginas.
2. Usa Títulos 1 y 2 para estructurar.
3. Inserta un índice al inicio.
4. Numeración de páginas.
5. Encabezado con tu nombre.
6. Inserta una imagen flotante.
7. Descarga como PDF.`,
      steps: [
        'Crea un documento con Títulos 1 y 2.',
        'Inserta un índice automático.',
        'Añade numeración de páginas y encabezado.',
        'Inserta una imagen con texto flotante.',
        'Descarga como PDF.',
      ],
      tips: [
        'Usa Títulos 1, 2, 3 para generar índices automáticos.',
        'Los índices son clicables: útiles para documentos largos.',
        'Conecta con Google Sheets para gráficos actualizables.',
      ],
      exercise: 'Crea un informe de 3 páginas con índice, numeración, encabezados e imagen. Descárgalo como PDF.',
    },
  ],
};

// ------------------------------------------------------------
// MÓDULO 5: GOOGLE SHEETS
// ------------------------------------------------------------
const googleSheetsModule: OfficeModule = {
  id: 'google-sheets',
  app: 'google-sheets',
  title: 'Google Sheets',
  icon: '📈',
  color: 'from-green-500 to-emerald-600',
  description:
    'La alternativa gratuita a Excel. Perfecta para presupuestos, listas y cálculos colaborativos en tiempo real.',
  freeAlternative: '¡Es 100% gratis! Solo necesitas una cuenta de Gmail.',
  lessons: [
    {
      id: 'gsheet-01',
      title: 'Empezar con Google Sheets',
      duration: '8 min',
      level: 'beginner',
      content: `## Tu Excel gratis en internet

Google Sheets es gratuito y funciona como Excel.

### Acceder

1. Entra en **sheets.google.com**.
2. Inicia sesión con Gmail.
3. Pulsa **"+"** o **"Hoja de cálculo en blanco"**.

### App móvil

Descarga **"Google Sheets"** en Google Play o App Store.

### Diferencias con Excel

| Excel | Google Sheets |
|---|---|
| Pago | Gratis |
| En tu ordenador | En la nube |
| Colaboración limitada | Tiempo real |
| Funciones avanzadas | Funciones básicas suficientes |
| Tablas dinámicas potentes | Tablas dinámicas simples |

### Crear tu primera hoja

1. Pulsa "+" → Hoja en blanco.
2. Se abre con filas (1, 2, 3...) y columnas (A, B, C...).
3. **Se guarda automáticamente.**

### Renombrar

1. Arriba a la izquierda: "Hoja de cálculo sin título".
2. Escribe: "Mi presupuesto".
3. Enter.

### Añadir hojas (pestañas)

Abajo a la izquierda:
- Botón **+** para añadir hoja nueva.
- Cada pestaña es una hoja distinta.
- Click derecho en pestaña: renombrar, duplicar, eliminar.

### Partes de la pantalla

- **Barra de menús:** Archivo, Editar, Ver, Insertar, Formato, Datos...
- **Barra de herramientas:** botones rápidos.
- **Celda activa:** con borde azul.
- **Barra de fórmulas:** muestra la fórmula de la celda activa.
- **Pestañas de hoja:** abajo.

### Escribir y editar

- Clic en celda → escribe → Enter (baja) o Tab (derecha).
- Doble clic para editar.
- Supr para borrar contenido.`,
      steps: [
        'Entra en sheets.google.com.',
        'Inicia sesión con Gmail.',
        'Crea una hoja en blanco.',
        'Escribe en celdas.',
        'Renombra la hoja.',
      ],
      tips: [
        'Google Sheets se guarda automáticamente.',
        'Cada pestaña abajo es una hoja distinta.',
        'Funciona igual que Excel para lo básico.',
      ],
      exercise: 'Crea tu primera hoja en Google Sheets. Escribe una tabla de 5 filas.',
    },
    {
      id: 'gsheet-02',
      title: 'Formato y datos básicos',
      duration: '12 min',
      level: 'beginner',
      content: `## Hojas bonitas y claras

Aprende a dar formato a tus datos.

### Formato de números

Selecciona celdas → menú **Formato → Número**:

- **Número:** 1.000,50
- **Moneda:** 1.000,50 €
- **Porcentaje:** 50%
- **Fecha:** 15/03/2024
- **Hora:** 14:30:00

### Formato de texto

Barra de herramientas:
- Negrita, cursiva, subrayado.
- Color de texto.
- Color de fondo.
- Alineación (izquierda, centro, derecha).
- Combinar celdas.

### Bordes

1. Selecciona celdas.
2. Botón **Bordes** (cuadrito).
3. Elige: todos, solo exteriores, ninguno.
4. Color y estilo de línea.

### Tamaños de columnas/filas

- Arrastra la línea entre letras (columnas) o números (filas).
- Doble clic en la línea → autoajustar.

### Estilos de celda

No hay tantos como en Excel, pero puedes:

- Aplicar colores de fondo.
- Combinar celdas.
- Aplicar bordes.

### Formato condicional

1. Selecciona celdas.
2. Formato → **Formato condicional**.
3. Panel derecho: define reglas.
4. Ejemplo: "Mayor que 100" → color rojo.

### Alternar colores

1. Formato → **Alternar colores**.
2. Cada fila alterna su color de fondo.
3. Muy útil para tablas largas.

### Inmovilizar paneles

1. Menú Ver → **Inmovilizar**.
2. 1 fila, 2 filas, o hasta la fila actual.

### Filtros

1. Selecciona encabezados.
2. Botón **Filtro** (embudo).
3. Aparecen flechas ▼ en cada encabezado.

### Ejercicio: presupuesto básico

Crea esta tabla:

| A | B |
|---|---|
| Concepto | Importe |
| Alquiler | 800 |
| Comida | 400 |
| Transporte | 100 |

Aplica:
- Encabezados en negrita con fondo azul.
- Importes en €.
- Bordes a todas las celdas.
- Colores alternos.`,
      steps: [
        'Crea una tabla simple.',
        'Selecciona encabezados y ponlos en negrita.',
        'Cambia números a € (Formato → Número → Moneda).',
        'Aplica bordes y colores alternos.',
      ],
      tips: [
        'Usa Formato → Número → Moneda para €.',
        'Los colores alternos facilitan la lectura.',
        'Inmoviliza encabezados en tablas largas.',
      ],
      exercise: 'Crea una tabla de gastos con formato profesional: €, negritas, bordes, colores alternos.',
    },
    {
      id: 'gsheet-03',
      title: 'Fórmulas esenciales',
      duration: '20 min',
      level: 'intermediate',
      content: `## Las mismas fórmulas que Excel

Google Sheets usa las mismas fórmulas que Excel. Algunas con nombres en inglés también funcionan.

### SUMA / SUM

- \`=SUMA(B2:B10)\` → suma el rango.
- \`=SUM(B2:B10)\` → también funciona (inglés).

### PROMEDIO / AVERAGE

- \`=PROMEDIO(B2:B10)\` → media.
- \`=AVERAGE(B2:B10)\` → inglés.

### MAX y MIN

- \`=MAX(B2:B10)\` → mayor valor.
- \`=MIN(B2:B10)\` → menor valor.

### CONTAR / COUNT

- \`=CONTAR(B2:B10)\` → cuenta números.
- \`=CONTARA(B2:B10)\` → cuenta celdas no vacías.
- \`=COUNTA(B2:B10)\` → inglés.

### SI / IF

\`=SI(B2>=5; "Aprobado"; "Suspenso")\`

También: \`=IF(B2>=5; "Aprobado"; "Suspenso")\`

### BUSCARV / VLOOKUP

\`=BUSCARV(A2; Hoja2!A:B; 2; FALSO)\`

También: \`=VLOOKUP(A2; Hoja2!A:B; 2; FALSE)\`

### HOY / TODAY

- \`=HOY()\` → fecha de hoy.
- \`=TODAY()\` → inglés.

### SUMAR.SI / SUMIF

\`=SUMAR.SI(B:B; "Gasto"; C:C)\`

Suma de C donde B = "Gasto".

### CONTAR.SI / COUNTIF

\`=CONTAR.SI(B:B; "Gasto")\`

Cuenta celdas con "Gasto".

### Funciones exclusivas o útiles en Sheets

**IMPORTRANGE:** importa datos de otra hoja.
\`=IMPORTRANGE("url_otra_hoja"; "Hoja1!A1:Z100")\`

**GOOGLETRANSLATE:** traduce texto.
\`=GOOGLETRANSLATE(A1; "es"; "en")\`

**DETECTLANGUAGE:** detecta idioma.
\`=DETECTLANGUAGE(A1)\`

**SPARKLINE:** mini-gráfico en una celda.
\`=SPARKLINE(B2:B10)\`

**QUERY:** consultas tipo SQL.
\`=QUERY(A1:D100; "SELECT A, B WHERE D > 100")\`

### Autocompletar

Cuando escribes "=". Sheets sugiere funciones.

### Ayuda de fórmulas

Al escribir una fórmula, verás:
- Sintaxis.
- Argumentos que faltan.
- Documentación (botón "Aprende más").

### Ejercicio

Crea una tabla de notas:
| Alumno | Nota1 | Nota2 | Media | Estado |
|---|---|---|---|---|

- Media: \`=PROMEDIO(B2:C2)\`
- Estado: \`=SI(D2>=5; "Aprobado"; "Suspenso")\`
- Promedio general: \`=PROMEDIO(D2:D10)\`
- Contar aprobados: \`=CONTAR.SI(E2:E10; "Aprobado")\`

### GOOGLETRANSLATE: práctica

1. En A1: "Hola, ¿cómo estás?"
2. En B1: \`=GOOGLETRANSLATE(A1; "es"; "en")\`
3. Resultado: "Hello, how are you?"`,
      steps: [
        'Crea una tabla de notas.',
        'Calcula media con =PROMEDIO.',
        'Estado con =SI.',
        'Cuenta aprobados con =CONTAR.SI.',
        'Prueba =GOOGLETRANSLATE para traducir una frase.',
      ],
      tips: [
        'Funciones en español e inglés funcionan igual.',
        'GOOGLETRANSLATE es exclusiva de Sheets y muy útil.',
        'SPARKLINE crea mini-gráficos en una celda.',
      ],
      exercise: 'Crea una tabla de notas. Calcula medias, estados y traduce frases con GOOGLETRANSLATE.',
    },
    {
      id: 'gsheet-04',
      title: 'Gráficos en Google Sheets',
      duration: '15 min',
      level: 'intermediate',
      content: `## Visualiza tus datos

Crear gráficos en Sheets es muy sencillo.

### Insertar un gráfico

1. Selecciona los datos (con encabezados).
2. Menú **Insertar → Gráfico**.
3. Aparece un gráfico automático + panel de edición.

### Tipos de gráficos

En el panel derecho, despliega "Tipo de gráfico":

- **Columna:** comparar categorías.
- **Barra:** como columna, horizontal.
- **Línea:** evolución temporal.
- **Circular:** porcentajes.
- **Área:** acumulado temporal.
- **Dispersión:** correlación.
- **Mapa de calor:** tabla con colores.
- **Candelabro:** finanzas.
- **Mapa:** datos geográficos.

### Personalizar el gráfico

Panel derecho → pestaña **Personalizar**:

**General:**
- Tamaño del gráfico.
- Color de fondo.

**Título del gráfico:**
- Texto.
- Fuente, tamaño, color.

**Series:**
- Color de cada serie.
- Etiquetas de datos.

**Ejes:**
- Título horizontal y vertical.
- Rango de números.

**Leyenda:**
- Posición (arriba, abajo, derecha, izquierda).
- Formato.

### Mover y redimensionar

- Arrastra el gráfico dentro de la hoja.
- Arrastra esquinas para cambiar tamaño.

### Gráfico en documento de Google Docs

1. En Google Docs: Insertar → Gráfico → **De Sheets**.
2. Pega el enlace de tu hoja.
3. Elige el gráfico.
4. Se inserta vinculado.

**Actualizar:**
- Si cambias datos en Sheets, en Docs: botón "Actualizar".

### Gráfico en presentación de Google Slides

1. En Google Slides: Insertar → Gráfico → **De Sheets**.
2. Elige la hoja y el gráfico.

### Gráfico como imagen

1. Click en el gráfico (3 puntos arriba a la derecha).
2. **Descargar** → PNG, SVG, PDF.

### Gráfico dinámico con datos externos

Sheets puede conectarse a fuentes externas:

- **=IMPORTFEED(url):** importa feeds RSS.
- **=IMPORTHTML(url; "table"; 1):** importa tablas de webs.
- **=IMPORTXML(url; query):** datos de webs.
- **=IMPORTDATA(url):** CSV desde URL.

**Ejemplo práctico:**
Tipos de cambio desde una web:
\`=IMPORTHTML("https://es.wikipedia.org/wiki/Anexo:Monedas_del_mundo"; "table"; 1)\`

### Ejercicio: gráfico de gastos

1. Crea una tabla con tus gastos por categoría.
2. Inserta un gráfico circular.
3. Personaliza: título, colores, etiquetas.
4. Pégalo en un Google Doc.`,
      steps: [
        'Crea tabla de gastos por categoría.',
        'Insertar → Gráfico (circular).',
        'Personaliza: título, etiquetas, colores.',
        'Cópialo a un Google Doc.',
      ],
      tips: [
        'Circular: máximo 5-7 categorías.',
        'Líneas: ideal para evolución temporal.',
        'Vincula el gráfico en Google Docs para que se actualice.',
      ],
      exercise: 'Crea un gráfico circular de tus gastos. Personalízalo y pégalo en un Google Doc.',
    },
    {
      id: 'gsheet-05',
      title: 'Compartir y colaborar',
      duration: '12 min',
      level: 'intermediate',
      content: `## Trabajo en equipo

La mayor ventaja de Google Sheets: colaboración en tiempo real.

### Compartir la hoja

1. Botón **"Compartir"** (arriba derecha).
2. Añade correos.
3. Elige permiso:
   - **Editor:** edita.
   - **Comentar:** solo comentarios.
   - **Lector:** solo lee.
4. Enviar.

### Enlace para compartir

1. Botón Compartir.
2. "Cambiar a cualquiera con el enlace".
3. Copia el enlace.
4. Compártelo por WhatsApp, email, etc.

### Editar a la vez

Si varias personas editan simultáneamente:

- Cada persona tiene color de cursor.
- Vemos su foto en la esquina.
- Cambios en tiempo real.

### Comentarios en celdas

1. Selecciona una celda.
2. Click derecho → **Comentar** (o Ctrl + Alt + M).
3. Escribe el comentario.
4. Pulsa Comentar.

Para resolver:
- Botón **Resolver**.

### Notas (no comentarios)

- Click derecho → **Insertar nota**.
- Aparece un triángulo amarillo en la celda.
- Útil para recordatorios privados.

### Proteger rangos

Para que ciertas celdas no se puedan modificar:

1. Menú Datos → **Proteger hojas y rangos**.
2. Añade una regla.
3. Selecciona el rango.
4. Elige quién puede editar (solo tú, etc.).

### Historial de versiones

1. Archivo → Historial de versiones → Ver historial.
2. Ve versiones anteriores.
3. Restaura si hace falta.

### Notificaciones de cambios

1. Menú Herramientas → **Reglas de notificación**.
2. Elige: cuando se hagan cambios, cuando se envíe formulario, etc.

### Descargar como Excel

Archivo → Descargar:
- Microsoft Excel (.xlsx)
- CSV (.csv)
- PDF
- HTML

### Publicar en la web

Archivo → Compartir → Publicar en la web:
- Genera un enlace público.
- Cualquiera puede ver (no editar).

### Formularios vinculados

1. Menú Herramientas → **Crear un formulario**.
2. Crea un Google Forms.
3. Las respuestas van a tu hoja automáticamente.

Útil para: encuestas, registros, listas de asistencia.`,
      steps: [
        'Pulsa "Compartir".',
        'Añade el email de un amigo.',
        'Ponle permiso de "Editor".',
        'Edite a la vez y observa los cambios en tiempo real.',
      ],
      tips: [
        'Varios pueden editar a la vez.',
        'Protege rangos importantes para evitar errores.',
        'Conecta con Google Forms para recoger datos.',
      ],
      exercise: 'Comparte una hoja con un amigo. Editad a la vez y observad los cambios en tiempo real.',
    },
    {
      id: 'gsheet-06',
      title: 'Trucos avanzados: Apps Script y macros',
      duration: '15 min',
      level: 'advanced',
      content: `## Automatiza tareas repetitivas

Google Sheets permite automatizar tareas con macros y scripts.

### Macros (sin programar)

Una macro graba tus acciones y las repite.

**Crear una macro:**

1. Menú Extensiones → **Macros → Grabar macro**.
2. Realiza las acciones (ej: aplicar formato).
3. Detén la grabación.
4. Ponle nombre y atajo (Ctrl + Alt + Shift + 1).

**Usar la macro:**
- Extensiones → Macros → tu macro.
- O pulsa el atajo.

### Ejemplo de macro útil

**Macro "Formatear presupuesto":**
1. Empieza a grabar.
2. Aplica bordes a la tabla.
3. Encabezados en negrita.
4. Importes en €.
5. Detén grabación.

Cada vez que crees un presupuesto, ejecuta la macro en 1 segundo.

### Apps Script (con programación)

Para automatizaciones avanzadas:

1. Menú Extensiones → **Apps Script**.
2. Se abre un editor de código (JavaScript).
3. Escribe funciones personalizadas.

**Ejemplo simple:**

\`\`\`javascript
function saludar() {
  SpreadsheetApp.getActiveSheet().getRange('A1').setValue('Hola desde Apps Script');
}
\`\`\`

Guarda → ejecuta → verás "Hola..." en A1.

### Ejemplo útil: enviar email desde Sheets

\`\`\`javascript
function enviarEmail() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var email = sheet.getRange('B1').getValue();
  var asunto = sheet.getRange('B2').getValue();
  var mensaje = sheet.getRange('B3').getValue();
  MailApp.sendEmail(email, asunto, mensaje);
}
\`\`\`

Esta función envía un email con los datos de tu hoja.

### Funciones personalizadas

Puedes crear tus propias fórmulas:

\`\`\`javascript
function DOBLESUMA(a, b) {
  return (a + b) * 2;
}
\`\`\`

Úsala en una celda: \`=DOBLESUMA(5; 3)\` → 16.

### Complementos (Add-ons)

1. Menú Extensiones → **Complementos → Obtener complementos**.
2. Busca por categoría.
3. Instala gratis o de pago.

**Complementos útiles:**

- **Remove Duplicate Sheets:** elimina duplicados.
- **Yet Another Mail Merge:** envío masivo de emails.
- **Power Tools:** herramientas avanzadas.
- **Form Publisher:** genera documentos a partir de respuestas.

### Conectar con servicios externos

- **Zapier:** conecta Sheets con 5000+ apps.
- **IFTTT:** automatizaciones simples.
- **Make (Integromat):** automatizaciones visuales.

**Ejemplo:** cada vez que recibes un email con un adjunto, se guarda en Drive y se registra en Sheets.

### Atajos de teclado útiles

- **Ctrl + ;:** inserta fecha actual.
- **Ctrl + Shift + ;:** inserta hora actual.
- **Ctrl + Enter:** salto de línea dentro de celda.
- **Alt + Shift + 1:** alinea arriba.
- **Ctrl + Alt + Shift + 1 (a 9):** aplica estilos de número.

### Ejercicio: automatiza tu presupuesto

1. Crea una macro que aplique formato profesional.
2. Asigna un atajo de teclado.
3. Prueba con una tabla nueva.`,
      steps: [
        'Menú Extensiones → Macros → Grabar macro.',
        'Aplica formato a una tabla.',
        'Detén grabación, ponle nombre.',
        'Crea una tabla nueva y ejecuta la macro.',
      ],
      tips: [
        'Las macros ahorran tiempo en tareas repetitivas.',
        'Apps Script permite automatizaciones avanzadas.',
        'Los complementos añaden funcionalidades extra.',
      ],
      exercise: 'Crea una macro que aplique formato profesional a una tabla. Úsala en una nueva hoja.',
    },
  ],
};

// ------------------------------------------------------------
// MÓDULO 6: GOOGLE SLIDES
// ------------------------------------------------------------
const googleSlidesModule: OfficeModule = {
  id: 'google-slides',
  app: 'google-slides',
  title: 'Google Slides',
  icon: '🎞️',
  color: 'from-yellow-500 to-orange-600',
  description:
    'La alternativa gratuita a PowerPoint. Crea presentaciones, colabora en tiempo real y presenta desde cualquier dispositivo.',
  freeAlternative: '¡Es 100% gratis! Solo necesitas una cuenta de Gmail.',
  lessons: [
    {
      id: 'gslide-01',
      title: 'Empezar con Google Slides',
      duration: '8 min',
      level: 'beginner',
      content: `## Tu PowerPoint gratis en internet

Google Slides es gratuito y colaborativo.

### Acceder

1. Entra en **slides.google.com**.
2. Inicia sesión con Gmail.
3. Pulsa **"+"** o **"Presentación en blanco"**.

### Plantillas gratuitas

En la pantalla principal, arriba:
- Galería de plantillas.
- Categorías: educación, negocio, personal, etc.
- Elige una → se crea la presentación con el diseño.

### App móvil

Descarga **"Google Slides"** en Google Play o App Store.

### Partes de la pantalla

- **Diapositiva actual (centro).**
- **Panel izquierdo:** miniaturas de diapositivas.
- **Barra de menús:** Archivo, Editar, Ver, Insertar, Formato...
- **Barra de herramientas:** botones rápidos.

### Crear tu primera presentación

1. Pulsa "Presentación en blanco".
2. Aparece 1 diapositiva con título y subtítulo.
3. Escribe en los cuadros.
4. **Se guarda automáticamente.**

### Añadir diapositiva

- Botón **"+"** arriba a la izquierda.
- O: menú Diapositiva → Nueva diapositiva.
- Atajo: Ctrl + M.

### Renombrar la presentación

1. Arriba a la izquierda: "Presentación sin título".
2. Escribe: "Mi presentación".
3. Enter.

### Diferencias con PowerPoint

| PowerPoint | Google Slides |
|---|---|
| Pago | Gratis |
| En tu PC | En la nube |
| Animaciones avanzadas | Animaciones básicas |
| Colaboración limitada | Tiempo real |
| Plantillas locales | Plantillas online |`,
      steps: [
        'Entra en slides.google.com.',
        'Inicia sesión con Gmail.',
        'Crea una presentación en blanco.',
        'Añade 3 diapositivas.',
        'Renómbrala.',
      ],
      tips: [
        'Google Slides se guarda automáticamente.',
        'Usa plantillas de la galería para empezar rápido.',
        'Funciona en cualquier dispositivo con internet.',
      ],
      exercise: 'Crea una presentación de 3 diapositivas en Google Slides.',
    },
    {
      id: 'gslide-02',
      title: 'Temas y diseño',
      duration: '12 min',
      level: 'beginner',
      content: `## Presentaciones bonitas

Aplica temas y diseña diapositivas profesionales.

### Aplicar un tema

1. Menú **Diapositiva → Aplicar tema**.
2. Panel derecho: elige tema.
3. Se aplica a todas las diapositivas.

### Cambiar diseño de una diapositiva

1. Selecciona una diapositiva (panel izquierdo).
2. Menú Diapositiva → **Aplicar diseño**.
3. Elige: Título, Título y cuerpo, Sección, Dos columnas, etc.

### Color de fondo

1. Click derecho en el fondo.
2. **Cambiar fondo**.
3. Color sólido, degradado o imagen.

### Plantillas de terceros

**Slidesgo (slidesgo.com):**
1. Busca entre miles de plantillas gratuitas.
2. Descarga en formato Google Slides.
3. Sube a tu Google Drive.
4. Ábrela y personaliza.

**Canva (canva.com):**
1. Crea presentaciones en Canva.
2. Exporta como PowerPoint o PDF.

### Insertar imágenes

Menú Insertar → Imagen:
- Desde tu ordenador.
- Desde Google Drive.
- Desde la web (búsqueda integrada).
- Cámara (foto directa).

**Bancos gratuitos:**
- Unsplash.com
- Pexels.com
- Pixabay.com

### Insertar formas

Menú Insertar → Forma:
- Flechas, cuadrados, círculos.
- Llamadas (bocadillos).
- Estrellas.

### Insertar tabla

Menú Insertar → Tabla:
- Selecciona filas × columnas.
- Edita como en Docs.

### Insertar gráfico

1. Insertar → Gráfico.
2. Elige tipo: columna, barra, línea, circular.
3. Edita datos en la mini-hoja de Sheets.
4. O: importa un gráfico existente de Google Sheets.

### Editar texto

- Tamaño: 24-44 pt para títulos, 18-24 para cuerpo.
- Fuentes: Roboto, Arial, Open Sans (más legibles).
- Color: alto contraste con el fondo.
- Negrita para resaltar.

### Alinear elementos

- Selecciona varios elementos con Shift + clic.
- Menú Organizar → Alinear (izquierda, centro, derecha).
- O: Organizar → Distribuir (espaciado uniforme).`,
      steps: [
        'Aplica un tema a tu presentación.',
        'Cambia el diseño de una diapositiva.',
        'Inserta una imagen desde la web.',
        'Inserta una forma y escribe dentro.',
        'Alinea varios elementos.',
      ],
      tips: [
        'Usa plantillas de Slidesgo para diseños profesionales.',
        'Mantén 2-3 colores por diapositiva.',
        'Tamaño mínimo de fuente: 18 pt.',
      ],
      exercise: 'Aplica un tema. Crea 3 diapositivas con imágenes y formas alineadas.',
    },
    {
      id: 'gslide-03',
      title: 'Transiciones y animaciones',
      duration: '12 min',
      level: 'intermediate',
      content: `## Movimiento en tus presentaciones

Google Slides tiene animaciones más simples que PowerPoint, pero suficientes.

### Transiciones

1. Selecciona una diapositiva (panel izquierdo).
2. Menú **Diapositiva → Transición**.
3. Panel derecho: elige efecto.
   - **Fundido** (predeterminado).
   - **Deslizar desde abajo.**
   - **Deslizar desde la derecha.**
   - **Girar.**
   - **Voltear.**
   - **Aparecer.**
4. Velocidad: lenta, media, rápida.

**Aplicar a todas:**
- Pulsa **"Aplicar a todas las diapositivas"**.

### Animaciones de elementos

1. Selecciona un elemento (texto, imagen).
2. Menú **Insertar → Animación**.
3. Panel derecho: configura.
   - **Tipo:** Aparecer, Desaparecer, Fundir.
   - **Al hacer clic** o **Después de la anterior.**
   - **Duración y retardo.**

### Animaciones múltiples

Puedes animar varios elementos en la misma diapositiva:

1. Selecciona elemento 1 → Insertar → Animación.
2. Selecciona elemento 2 → Insertar → Animación.
3. Configura el orden en el panel derecho.

### Orden de animaciones

En el panel derecho verás la lista de animaciones.

- Arrastra para reordenar.
- Click en una para editar.

### Presentar

1. Botón **"Presentar"** (arriba derecha).
2. O: menú Ver → Presentar.
3. Atajo: **Ctrl + F5**.

**Durante la presentación:**
- **Clic / Espacio / →:** siguiente.
- **←:** anterior.
- **Esc:** salir.
- **P:** pantalla negra (pausa).

### Modo presentador

1. Al presentar, mira la esquina inferior izquierda.
2. Pulsa el ícono de herramientas.
3. Activa **"Vista del orador"**.

Verás:
- Diapositiva actual.
- Próxima diapositiva.
- Tus notas.
- Cronómetro.

### Notas del orador

1. Selecciona una diapositiva.
2. Área inferior: **"Haz clic para añadir notas"**.
3. Escribe tus apuntes.

### Vídeos insertados

1. Insertar → Vídeo.
2. Busca en YouTube o pega URL.
3. El vídeo se reproduce dentro de la diapositiva.

**Configurar:**
- Tamaño y posición.
- Reproducción automática o al hacer clic.
- Inicio y fin (recortar).

### Enlaces a otras diapositivas

1. Selecciona un elemento (texto, imagen).
2. Click derecho → **Enlace** (o Ctrl + K).
3. Elige "Diapositiva en esta presentación".
4. Selecciona la diapositiva destino.

Útil para menús interactivos.

### Ejercicio

1. Crea 4 diapositivas.
2. Aplica transición "Fundido" a todas.
3. En la diapositiva 3: anima 3 viñetas para aparecer una a una.
4. Añade notas del orador en cada diapositiva.
5. Presenta en modo "Vista del orador".`,
      steps: [
        'Aplica transición a todas las diapositivas.',
        'Anima viñetas para aparecer en secuencia.',
        'Añade notas del orador.',
        'Presenta en modo Vista del orador.',
      ],
      tips: [
        'Usa la misma transición en toda la presentación.',
        'Anima elementos para guiar la atención.',
        'Las notas del orador se ven solo en tu pantalla.',
      ],
      exercise: 'Crea una presentación animada. Practica con el modo presentador.',
    },
    {
      id: 'gslide-04',
      title: 'Compartir, presentar y exportar',
      duration: '10 min',
      level: 'beginner',
      content: `## Comparte tu trabajo

Google Slides facilita compartir y presentar.

### Compartir con personas

1. Botón **"Compartir"** (arriba derecha).
2. Añade correos.
3. Permiso: Editor, Comentar, Lector.
4. Enviar.

### Enlace para compartir

1. Botón Compartir.
2. "Cambiar a cualquiera con el enlace".
3. Copia y comparte por WhatsApp, email.

### Editar a la vez

- Cada persona tiene cursor de color.
- Vemos su foto en la esquina.
- Cambios en tiempo real.

### Comentarios

1. Selecciona un elemento.
2. Botón **Comentar** (o Ctrl + Alt + M).
3. Escribe y envía.

### Publicar en la web

1. Archivo → Compartir → **Publicar en la web**.
2. Elige: tamaño, velocidad de avance automático.
3. Genera enlace o código para insertar (HTML).

Ideal para blogs, webs, intranets.

### Presentar en directo (Google Meet)

Si tienes reunión en Google Meet:

1. Inicia Meet.
2. En Slides: botón **"Presentar ahora"**.
3. Elige: "Una ventana" o "Una pestaña".
4. Selecciona tu presentación.
5. Los participantes verán tus diapositivas.

### Preguntas del público

1. Menú Ver → Presentar.
2. En la presentación: botón "Preguntas y respuestas".
3. Genera un enlace para que el público haga preguntas.
4. Aparecen en tu pantalla.

### Descargar como PowerPoint

Archivo → Descargar:
- **Microsoft PowerPoint (.pptx)**: editable en PowerPoint.
- **PDF:** para enviar.
- **Imágenes:** PNG, JPEG.
- **Texto (.txt).**

### Exportar como vídeo (alternativa)

Google Slides no exporta directamente a vídeo. Para ello:

1. Descarga como PowerPoint (.pptx).
2. Abre en PowerPoint.
3. PowerPoint → Exportar → Crear vídeo.

O usa complementos de terceros.

### Imprimir

1. Archivo → Imprimir (Ctrl + P).
2. Configura:
   - Diapositivas completas (1 por página).
   - 2, 3, 4, 6 o 9 por página.
   - Páginas de notas.
   - Esquema.

### Plantillas colaborativas

Crea una presentación base:
1. Diseña una plantilla.
2. Compártela con "Editor".
3. Tu equipo hace copias para sus presentaciones.

**Crear copia:**
- Archivo → Hacer una copia.

### Versión final congelada

Para que no se modifique más:

1. Descarga como PDF.
2. El PDF no se puede editar.

### Ejercicio

1. Crea una presentación de 5 diapositivas.
2. Compártela con un amigo (permiso Comentar).
3. Pídele comentarios.
4. Presenta en pantalla completa.
5. Descarga como PDF.`,
      steps: [
        'Pulsa "Compartir".',
        'Comparte con un amigo (permiso Comentar).',
        'Presenta en pantalla completa.',
        'Descarga como PDF.',
      ],
      tips: [
        'Comparte con enlace para difundir rápido.',
        'Para versiones finales, descarga como PDF.',
        'Presenta en Google Meet con un clic.',
      ],
      exercise: 'Comparte tu presentación con un amigo. Pídele comentarios. Descarga como PDF.',
    },
  ],
};

// ------------------------------------------------------------
// MÓDULO 7: GMAIL / OUTLOOK
// ------------------------------------------------------------
const gmailModule: OfficeModule = {
  id: 'gmail-outlook',
  app: 'gmail',
  title: 'Gmail y Outlook',
  icon: '📧',
  color: 'from-red-500 to-rose-600',
  description:
    'Tu correo electrónico es tu identidad digital. Aprende a redactar correos formales, organizar la bandeja y evitar spam. Para trámites y búsqueda de empleo es esencial.',
  freeAlternative: 'Ambos son gratuitos: Gmail (Google) y Outlook (Microsoft).',
  lessons: [
    {
      id: 'mail-01',
      title: 'Crear tu correo electrónico',
      duration: '10 min',
      level: 'beginner',
      content: `## Tu identidad digital

En España, sin correo electrónico no puedes: buscar trabajo, hacer trámites, recibir notificaciones del banco, etc.

### Crear Gmail (recomendado)

1. Entra en **gmail.com**.
2. Pulsa **"Crear cuenta"**.
3. Elige: "Para uso personal".
4. Datos:
   - Nombre y apellidos.
   - Fecha de nacimiento.
5. Elige tu dirección:
   - Ej: maria.gonzalez.2024@gmail.com
   - Si está ocupado, prueba variaciones.
6. Contraseña:
   - Mínimo 8 caracteres.
   - Letras + números + símbolos.
   - Ejemplo: Madrid2024!Segura
7. Añade teléfono de recuperación (muy importante).
8. Añade correo de recuperación.
9. Acepta términos.

### Crear Outlook (alternativa)

1. Entra en **outlook.com**.
2. Pulsa **"Crear cuenta gratuita"**.
3. Elige dirección: tu.nombre@outlook.com.
4. Contraseña segura.
5. Verificación.

### Cuál elegir

**Gmail:**
- Más usado en España.
- Te da acceso a Google Drive, Docs, Sheets gratis.
- Mejor detección de spam.

**Outlook:**
- Te da acceso a Office Online gratis.
- Integrado con Windows y Xbox.
- Más usado en empresas.

> **Recomendación:** Crea Gmail como principal y Outlook como secundario.

### Dirección profesional

Para buscar trabajo, usa una dirección seria:

- ✅ maria.gonzalez.2024@gmail.com
- ✅ jose.perez.work@gmail.com
- ❌ supermaria99@gmail.com
- ❌ xx_latinpower_xx@gmail.com

### Contraseña segura

- Mínimo 12 caracteres.
- Mayúsculas y minúsculas.
- Números.
- Símbolos (!@#$%).
- No uses tu fecha de nacimiento.
- No la reutilices en varios sitios.

### Recuperación

Configura SIEMPRE:
- Teléfono de recuperación.
- Correo de recuperación.

Si pierdes la contraseña, con estos podrás recuperarla.`,
      steps: [
        'Entra en gmail.com.',
        'Pulsa "Crear cuenta".',
        'Elige una dirección profesional.',
        'Crea contraseña segura.',
        'Añade teléfono y correo de recuperación.',
      ],
      tips: [
        'Usa una dirección profesional (nombre.apellido).',
        'Contraseñas de 12+ caracteres.',
        'Siempre configura recuperación.',
      ],
      exercise: 'Crea tu cuenta de Gmail con dirección profesional y contraseña segura.',
    },
    {
      id: 'mail-02',
      title: 'Redactar y enviar tu primer correo',
      duration: '12 min',
      level: 'beginner',
      content: `## Correos claros y formales

Aprende la estructura de un correo bien hecho.

### Redactar en Gmail

1. Pulsa **"Redactar"** (arriba a la izquierda).
2. Se abre una ventana abajo a la derecha.

### Campos del correo

**Para:** email del destinatario.
- Ejemplo: casero@gmail.com

**CC:** copia (otras personas que deben enterarse).

**CCO:** copia oculta (los destinatarios no se ven entre sí).

**Asunto:** tema del correo (¡muy importante!).
- ✅ "Solicitud de cita para empadronamiento"
- ✅ "Correo sobre la caldera - Piso Calle Mayor 5"
- ❌ "Hola"
- ❌ (vacío)

### Cuerpo del correo

**Estructura formal:**

1. **Saludo:**
   - "Estimado Sr. García:"
   - "Hola, María:"
   - "Buenos días:"

2. **Cuerpo:**
   - Primera línea: motivo del correo.
   - Desarrollo: detalles.
   - Pedir acción clara.

3. **Despedida:**
   - "Atentamente,"
   - "Un cordial saludo,"
   - "Gracias,"

4. **Firma:**
   - Tu nombre completo.
   - Tu teléfono.
   - Tu email.

### Ejemplo completo

> **Para:** casero@inmobiliaria.com
> **Asunto:** Reparación caldera - Piso Calle Mayor 5, 3ºB
>
> Estimado Sr. Martínez:
>
> Le escribo para informarle que la caldera del piso que ocupo (Calle Mayor 5, 3ºB) no funciona desde ayer por la noche. Hemos seguido los pasos del manual pero sigue sin encender.
>
> Podría enviar a un técnico lo antes posible? Tenemos dos niños pequeños y necesitamos agua caliente.
>
> Quedo a la espera de su respuesta.
>
> Atentamente,
>
> María González
> Tel: 600 123 456
> Email: maria.gonzalez.2024@gmail.com

### Negrita y formato

En Gmail puedes usar:
- Negrita, cursiva, subrayado.
- Tamaños de fuente.
- Viñetas y listas numeradas.
- Color de texto.

> No abuses: el correo formal se mantiene simple.

### Adjuntar archivos

1. Pulsa icono **clip** 📎.
2. Selecciona archivo(s).
3. Espera a que se carguen (verás barra de progreso).

> Para CVs y documentos importantes, usa siempre **PDF** (no Word).

### Enviar

1. Revisa TODO antes de enviar.
2. Pulsa **"Enviar"**.

### Atajos útiles

- **Ctrl + Enter:** enviar.
- **Ctrl + Shift + C:** añadir CC.
- **Ctrl + Shift + B:** añadir CCO.`,
      steps: [
        'Pulsa "Redactar" en Gmail.',
        'Escribe destinatario, asunto y cuerpo.',
        'Usa estructura formal: saludo, cuerpo, despedida, firma.',
        'Adjunta un PDF si hace falta.',
        'Revisa y envía.',
      ],
      tips: [
        'Asunto claro y descriptivo siempre.',
        'Saludo formal: "Estimado/a" o "Hola" + nombre.',
        'Despídete con "Atentamente" o "Un cordial saludo".',
        'Envía documentos importantes en PDF.',
      ],
      exercise: 'Redacta un correo formal a tu casero pidiendo que arregle algo del piso. Envíatelo a ti mismo primero para revisar.',
    },
    {
      id: 'mail-03',
      title: 'Organizar tu bandeja de entrada',
      duration: '12 min',
      level: 'intermediate',
      content: `## No te ahogues en correos

Si no organizas, perderás correos importantes entre spam y publicidad.

### Pestañas de Gmail

Gmail organiza automáticamente en pestañas:

- **Principal:** correos personales y de trabajo.
- **Promociones:** newsletters, ofertas.
- **Social:** redes sociales.
- **Notificaciones:** recibos, cuentas.

> Si no ves un correo, busca en las otras pestañas.

### Marcar como importante

- Pulsa la **estrella** ⭐ junto a un correo.
- Aparece en "Destacados".
- Para verlos: menú izquierdo → Destacados.

### Etiquetas (carpetas)

Gmail usa **etiquetas** en vez de carpetas.

**Crear etiqueta:**
1. Menú izquierdo → scroll abajo → **"Más"**.
2. **"+ Crear nueva etiqueta"**.
3. Nombre: "Trabajo", "Casero", "Banco", "Trámites"...
4. Pulsa Crear.

**Aplicar etiqueta:**
1. Selecciona uno o varios correos.
2. Icono **etiqueta** (parece una etiqueta).
3. Marca las etiquetas a aplicar.

### Filtros automáticos

Haz que Gmail organice por ti:

1. Busca un correo del remitente.
2. Menú (3 puntos) → **"Filtrar mensajes como estos"**.
3. Configura: de quién, con qué asunto, etc.
4. "Crear filtro".
5. Acción: aplicar etiqueta, marcar como leído, etc.

**Ejemplo:**
- Todos los correos del casero → etiqueta "Casero" + estrella.

### Archivar (no borrar)

**Archivar** quita el correo de la bandeja pero lo guarda.

- Selecciona → icono **archivador** (caja).
- Para encontrar: busca por palabras.

> **Archiva, no borres.** Los correos archivados se pueden recuperar siempre.

### Borrar correos

- Selecciona → icono **papelera**.
- Se va a Papelera (se borra a los 30 días).

### Buscar correos

Barra de búsqueda superior:
- "from:maria" → correos de María.
- "subject:alquiler" → asuntos con "alquiler".
- "has:attachment" → correos con adjuntos.
- "is:unread" → no leídos.
- "after:2024/01/01" → después de fecha.

### Posponer correos

Para recordar un correo más tarde:

1. Selecciona un correo.
2. Icono **reloj** (Posponer).
3. Elige: mañana, próximo lunes, fecha personalizada.
4. Aparecerá arriba a la fecha indicada.

### Programar envío

Para enviar más tarde:

1. Redacta correo.
2. Botón "Enviar" → flecha → **"Programar envío"**.
3. Elige fecha y hora.
4. Se enviará automáticamente.

### Marcar como no leído

Si quieres recordar leer un correo:

1. Selecciona.
2. Menú → "Marcar como no leído".

### Ejercicio práctico

1. Crea 5 etiquetas: Trabajo, Casero, Banco, Familia, Trámites.
2. Aplica etiquetas a tus últimos 20 correos.
3. Crea un filtro automático para tu casero.
4. Archiva los correos ya gestionados.`,
      steps: [
        'Crea 5 etiquetas.',
        'Aplica etiquetas a tus últimos correos.',
        'Crea un filtro automático.',
        'Archiva los correos ya gestionados.',
      ],
      tips: [
        'Archiva en vez de borrar.',
        'Crea filtros automáticos para remitentes frecuentes.',
        'Usa la búsqueda avanzada para encontrar correos.',
      ],
      exercise: 'Crea 5 etiquetas y organiza tus últimos 20 correos. Crea 1 filtro automático.',
    },
    {
      id: 'mail-04',
      title: 'Spam, estafas y seguridad',
      duration: '15 min',
      level: 'intermediate',
      content: `## Cuidado con las estafas

Por email circulan muchas estafas, sobre todo dirigidas a inmigrantes.

### Reconocer phishing (estafas)

**Señales de alarma:**

- ✉️ Remitente sospechoso (no oficial).
- ⚠️ Te pide datos personales o bancarios.
- ⏰ Urgencia: "responde en 24 horas o...".
- 🎁 Premios o herencias inesperadas.
- 🔗 Enlaces extraños.
- 📎 Adjuntos sospechosos.
- ❌ Errores ortográficos.

### Ejemplos de estafas comunes

**1. "Banco" pidiendo verificar cuenta:**
> "Su cuenta ha sido bloqueada. Haga clic aquí para verificar."

✋ **Tu banco NUNCA te pide datos por email.**

**2. "Trabajo fácil" en el extranjero:**
> "Gana 5.000€ desde casa, sin experiencia."

✋ Si suena demasiado bueno, es estafa.

**3. "Hacienda" pidiendo dinero:**
> "Tiene una deuda con Hacienda. Pague ahora."

✋ Hacienda notifica por carta oficial o sede electrónica, no por email.

**4. "Paquete retenido":**
> "Su paquete de Correos está retenido. Pague 2€ para liberarlo."

✋ Correos no cobra por liberar paquetes por email.

**5. "Falso familiar" pidiendo dinero:**
> "Soy tu primo, he tenido un problema, envía dinero urgente."

✋ Llama por teléfono para verificar.

### Qué hacer si recibes un correo sospechoso

1. **NO respondas.**
2. **NO hagas clic en enlaces.**
3. **NO abras adjuntos.**
4. **NO des ningún dato.**
5. Marca como spam (icono spam).
6. Elimina definitivamente.

### Verificar si es legítimo

Si dudas:
- Llama a la empresa/oficina por teléfono oficial (busca en Google).
- Visita la web oficial escribiendo la URL (no haciendo clic).
- Pregunta a alguien de confianza.

### Configurar seguridad

**Verificación en 2 pasos (imprescindible):**

1. En Gmail: Google Account → Seguridad.
2. "Verificación en 2 pasos" → Activar.
3. Cada vez que entres, recibirás código en el móvil.

> Esto protege tu cuenta aunque alguien sepa tu contraseña.

### Revisar actividad sospechosa

1. Gmail → abajo a la derecha: "Última actividad de la cuenta".
2. "Detalles" → ve inicios de sesión.
3. Si ves algo raro: "Cerrar todas las demás sesiones".

### Antivirus

- Windows Defender (gratis en Windows 11) es suficiente.
- No instales antivirus desconocidos.
- No abras .exe de remitentes desconocidos.

### Contraseñas únicas

- NO uses la misma contraseña en varios sitios.
- Usa un gestor de contraseñas:
  - **Bitwarden** (gratis).
  - **1Password** (pago).
  - **KeePass** (gratis, local).

### Reportar estafas

Si has sido víctima:

- **Policía:** denunciar en comisaría o en denuncias.policia.es
- **Banco:** contacta inmediatamente.
- **Correo:** cambia contraseñas.

### Ejercicio

1. Revisa tu carpeta de Spam.
2. Identifica 3 correos sospechosos.
3. Activa verificación en 2 pasos en tu Gmail.`,
      steps: [
        'Activa verificación en 2 pasos en tu Gmail.',
        'Revisa tu carpeta de Spam.',
        'Identifica 3 correos sospechosos y elimínalos.',
        'Anota el teléfono oficial de tu banco para verificar.',
      ],
      tips: [
        'Tu banco NUNCA pide datos por email.',
        'Activa siempre la verificación en 2 pasos.',
        'Si dudas, llama por teléfono a la empresa oficial.',
      ],
      exercise: 'Activa verificación en 2 pasos. Revisa tu spam e identifica 3 correos sospechosos.',
    },
    {
      id: 'mail-05',
      title: 'Plantillas y firmas profesionales',
      duration: '12 min',
      level: 'intermediate',
      content: `## Ahorra tiempo y muestra profesionalidad

Crea plantillas y firmas para tus correos habituales.

### Crear una firma

La firma aparece automáticamente al final de tus correos.

**En Gmail:**

1. Click **engranaje** (arriba derecha) → Ver todos los ajustes.
2. Pestaña **General** → busca "Firma".
3. Pulsa **"Crear nueva"**.
4. Nombre: "Profesional".
5. Escribe tu firma:

\`\`\`
María González Pérez
Camarera | Atención al cliente
📞 +34 600 123 456
✉️ maria.gonzalez.2024@gmail.com
📍 Madrid, España
\`\`\`

6. Formato: fuente, tamaño, color.
7. Selecciona esta firma para nuevas respuestas.
8. Guardar cambios (abajo).

### Firmas para distintos contextos

Crea varias:
- **Profesional:** para trabajo y trámites.
- **Personal:** para amigos y familia.
- **Búsqueda de empleo:** con LinkedIn.

### Insertar imagen en la firma

Puedes añadir:
- **Foto tuya** (cara, profesional).
- **Logo de tu empresa**.
- **Icono de LinkedIn** con enlace.

> No abuses: 1 imagen pequeña es suficiente.

### Plantillas de correos

Si escribes correos similares a menudo, créalas como plantillas.

**Activar plantillas en Gmail:**

1. Ajustes → Ver todos los ajustes → pestaña **Avanzado**.
2. "Plantillas" → Habilitar.
3. Guardar cambios.

**Crear plantilla:**

1. Redacta un correo completo.
2. Menú (3 puntos) → **Plantillas → Guardar borrador como plantilla**.
3. Ponle nombre: "Correo casero".
4. Guardar.

**Usar plantilla:**

1. Redacta correo nuevo.
2. Menú (3 puntos) → Plantillas → tu plantilla.
3. Ajusta destinatario y detalles.
4. Envía.

### Ejemplos de plantillas útiles

**1. Solicitar cita:**
> Estimado/a [nombre]:
> Me gustaría solicitar cita para [motivo] el próximo [día] si es posible.
> Mis datos:
> - Nombre completo: [tu nombre]
> - DNI/NIE: [tu número]
> - Teléfono: [tu teléfono]
> Quedo a la espera de su confirmación.
> Atentamente, [tu firma]

**2. Confirmar entrevista:**
> Estimado/a [nombre]:
> Confirmo mi asistencia a la entrevista del [fecha] a las [hora] en [lugar].
> Llevaré: [documentos].
> Muchas gracias por la oportunidad.
> Un cordial saludo, [tu firma]

**3. Carta de presentación:**
> Estimado/a:
> Le escribo en respuesta a la oferta de [puesto] publicada en [lugar].
> [Cuerpo de presentación]
> Adjunto mi CV para su revisión.
> Atentamente, [tu firma]

### Envío masivo (mail merge)

Para enviar el mismo correo a muchas personas con datos personalizados:

**Usa complementos gratuitos:**
- **Yet Another Mail Merge** (en Sheets).
- **GMass** (extensión de Chrome).

> Cada destinatario recibe el correo personalizado con su nombre, etc.

### Responder a todos

- Botón **"Responder a todos"** en vez de "Responder".
- Útil cuando quieres que todos se enteren.

### Reenviar

- Botón **"Reenviar"**.
- Añade destinatario.
- Edita si quieres añadir comentario.

### Recordatorios de respuesta

Si enviaste un correo importante y no te responden:

- **Boomerang** (extensión): recuerda seguir correos sin respuesta.
- O configura un recordatorio con la función "Posponer".

### Ejercicio

1. Crea tu firma profesional.
2. Activa plantillas en Gmail.
3. Crea 3 plantillas: cita, entrevista, carta de presentación.
4. Usa una plantilla para enviar un correo de prueba.`,
      steps: [
        'Ajustes → General → Firma → Crear nueva.',
        'Escribe tu firma profesional con datos de contacto.',
        'Activa plantillas (Ajustes → Avanzado).',
        'Crea 3 plantillas: cita, entrevista, carta de presentación.',
      ],
      tips: [
        'Crea firmas profesionales con datos de contacto.',
        'Usa plantillas para correos habituales.',
        'Para envíos masivos, usa Yet Another Mail Merge.',
      ],
      exercise: 'Crea tu firma profesional y 3 plantillas de correos frecuentes.',
    },
  ],
};

// ------------------------------------------------------------
// EXPORT
// ------------------------------------------------------------
export const OFFICE_MODULES: OfficeModule[] = [
  wordModule,
  excelModule,
  powerpointModule,
  googleDocsModule,
  googleSheetsModule,
  googleSlidesModule,
  gmailModule,
];

console.log('Office modules:', OFFICE_MODULES.length);
