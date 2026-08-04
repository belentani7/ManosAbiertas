// ============================================================
// Manos Abiertas — Plantillas de CV + Guías + Datos de ejemplo
// Para personas inmigrantes en España
// Idioma: Español (es)
// ============================================================

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  color: string; // tailwind
  layout: 'classic' | 'modern' | 'minimal' | 'creative' | 'professional';
  preview: string; // emoji
}

export interface CVGuide {
  id: string;
  title: string;
  content: string; // markdown
  tips: string[];
}

// ------------------------------------------------------------
// PLANTILLAS DE CV
// ------------------------------------------------------------
export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: 'classic-europass',
    name: 'Classic Europass',
    description:
      'Plantilla oficial europea. Estructura clara y reconocida por empresas españolas y de la UE. Ideal para primeros empleos y trámites oficiales.',
    color: 'from-blue-600 to-blue-800',
    layout: 'classic',
    preview: '📋',
  },
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    description:
      'Diseño limpio y moderno con barra lateral. Destaca tus habilidades. Perfecto para profesionales con experiencia en hostelería, comercio y servicios.',
    color: 'from-emerald-500 to-teal-600',
    layout: 'modern',
    preview: '🎯',
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    description:
      'Mínimo, elegante y directo. Una sola columna, sin colores fuertes. Apto para sectores formales: administración, finanzas, jurídico.',
    color: 'from-slate-700 to-slate-900',
    layout: 'minimal',
    preview: '✨',
  },
  {
    id: 'creative-vibrant',
    name: 'Creative Vibrant',
    description:
      'Diseño creativo con colores y secciones destacadas. Para perfiles creativos: diseño, marketing, cocina, arte, fotografía y emprendimiento.',
    color: 'from-pink-500 to-orange-500',
    layout: 'creative',
    preview: '🎨',
  },
  {
    id: 'professional-execute',
    name: 'Professional Executive',
    description:
      'Plantilla ejecutiva para cargos de responsabilidad. Estructura formal con énfasis en logros y métricas. Para dirección, gerencia y consultoría.',
    color: 'from-indigo-700 to-purple-800',
    layout: 'professional',
    preview: '💼',
  },
  {
    id: 'sidebar-photo',
    name: 'Sidebar con Foto',
    description:
      'Plantilla con barra lateral colored y espacio para foto. Ideal para hostelería, cuidados, comercio y atención al cliente. Destaca tu lado humano.',
    color: 'from-teal-600 to-cyan-700',
    layout: 'modern',
    preview: '🧑',
  },
  {
    id: 'two-column-tech',
    name: 'Tech dos columnas',
    description:
      'Diseño de dos columnas para perfiles técnicos y de desarrollo. Secciones de proyectos, habilidades técnicas y lenguajes de programación.',
    color: 'from-orange-700 to-red-800',
    layout: 'creative',
    preview: '💻',
  },
];

// ------------------------------------------------------------
// GUÍAS DE CV
// ------------------------------------------------------------
export const CV_GUIDES: CVGuide[] = [
  {
    id: 'what-is-cv',
    title: '¿Qué es un currículum vitae (CV)?',
    content: `## Tu tarjeta de presentación profesional

Un **currículum vitae (CV)** es un documento que resume tu experiencia laboral, formación, habilidades y datos personales. Es **la primera impresión** que una empresa tiene de ti.

### ¿Para qué sirve?

- ✅ Solicitar empleos.
- ✅ Presentarte a entrevistas.
- ✅ Inscribirte en agencias de empleo (SEPE, InfoJobs).
- ✅ Adjuntar en trámites de homologación.
- ✅ Solicitar becas o prácticas.

### Diferencia entre CV y carta de presentación

| CV | Carta de presentación |
|---|---|
| Datos objetivos: experiencia, formación | Por qué quieres el puesto |
| Estructura fija | Texto libre |
| 1-2 páginas | 1 página |
| Mismo CV para varias ofertas | Personalizada para cada oferta |

### Tipos de CV

**1. Cronológico (más común):**
- Experiencia de lo más reciente a lo más antiguo.
- Fácil de leer.

**2. Funcional:**
- Agrupado por habilidades.
- Útil si tienes huecos en el CV.

**3. Mixto:**
- Combina cronológico y funcional.
- Muestra habilidades y experiencia.

### ¿Cuánto debe medir?

- **1 página:** para <10 años de experiencia.
- **2 páginas:** para experiencia amplia.
- **Nunca más de 2 páginas** (salvo académico).

### Formatos

- **PDF:** el preferido por empresas. No se puede modificar.
- **Word (.docx):** si lo piden explícitamente.
- **Europass:** estándar europeo oficial.

> **En España:** el CV más común es de 1-2 páginas, en español, formato cronológico y PDF.`,
    tips: [
      'Tu CV debe estar siempre actualizado.',
      'Adapta tu CV a cada oferta de trabajo.',
      'Envía SIEMPRE en PDF, no en Word.',
      '1-2 páginas máximo, salvo perfiles académicos.',
    ],
  },
  {
    id: 'cv-parts',
    title: 'Partes de un CV',
    content: `## Estructura de un CV exitoso

Un buen CV tiene **6 secciones clave**:

### 1. Datos personales

- Nombre y apellidos (grande).
- Teléfono (con prefijo +34).
- Email profesional.
- Ciudad (no dirección completa).
- LinkedIn (si tienes).
- Foto (opcional en España; recomendada para hostelería/comercio).

> **NO incluyas:** DNI completo, dirección exacta, estado civil, número de hijos (no es necesario en España).

### 2. Perfil profesional (resumen)

1-3 líneas que resumen quién eres profesionalmente.

**Ejemplo:**
> "Camarera con 5 años de experiencia en hostelería de alto nivel. Especialista en atención al cliente y trabajo en equipo. Busco nuevos retos en Madrid."

### 3. Experiencia laboral

Lista de tus trabajos, **del más reciente al más antiguo**:

**Estructura:**
- Puesto (negrita) | Empresa | Ciudad | Fechas
- 3-5 viñetas con logros y responsabilidades.

**Ejemplo:**
> **Camarera** | Restaurante La Parrilla, Lima (Perú) | 2020-2023
> - Atención a 100+ clientes diarios con satisfacción del 95%.
> - Coordinación de equipo de 5 personas en salón.
> - Manejo de caja y cobros por valor de 2.000€ diarios.

### 4. Formación académica

Títulos oficiales, del más reciente al más antiguo:

**Estructura:**
- Título (negrita) | Centro | Ciudad | Año

**Ejemplo:**
> **Título de Bachillerato** | IES San Isidro, Lima | 2015
> **Curso de Camarero Profesional** | Cámara de Comercio Lima | 2018

### 5. Idiomas

Especifica nivel:

- **Nativo:** tu lengua materna.
- **B2 / C1 / C2:** niveles europeos (Marco Común Europeo).
- Si tienes certificados: DELE, Cambridge, TOEFL.

**Ejemplo:**
> - Español: Nativo
> - Inglés: B2 (Cambridge First Certificate)
> - Quechua: Nativo

### 6. Habilidades y competencias

**Hard skills (técnicas):**
- Ofimática: Word, Excel, PowerPoint.
- Herramientas: TPV, WhatsApp Business.
- Idiomas adicionales.
- Carnet de conducir.

**Soft skills (blandas):**
- Comunicación efectiva.
- Trabajo en equipo.
- Adaptabilidad.
- Resolución de problemas.

### Secciones opcionales

- **Voluntariado:** si has colaborado con ONGs.
- **Cursos y certificaciones.**
- **Publicaciones / proyectos.**
- **Referencias:** "Disponibles bajo petición".

### Orden recomendado

1. Datos personales.
2. Perfil profesional.
3. Experiencia laboral.
4. Formación.
5. Idiomas.
6. Habilidades.

> Si eres recién graduado sin experiencia: pon Formación antes de Experiencia.`,
    tips: [
      'Datos personales: solo lo esencial (sin DNI completo).',
      'Usa verbos de acción en la experiencia: "coordiné", "gestioné".',
      'Cuantifica logros: números, %, € siempre que puedas.',
      'Adapta el orden: recién graduado → Formación primero.',
    ],
  },
  {
    id: 'action-verbs-guide',
    title: 'Verbos de acción para destacar',
    content: `## Palabras que abren puertas

Los **verbos de acción** hacen que tu CV sea dinámico y muestre resultados.

### ¿Por qué usar verbos de acción?

❌ **Sin verbos de acción:**
> "Trabajo en atención al cliente en un restaurante."

✅ **Con verbos de acción:**
> "Atendí a más de 100 clientes diarios, incrementé la satisfacción en un 25% y supervisé un equipo de 5 personas."

La segunda versión es más impactante.

### Estructura recomendada

**Verbo de acción + tarea + resultado/cifra**

Ejemplos:
- "Coordiné equipo de 8 personas, logrando un 20% más de productividad."
- "Implementé nuevo sistema de inventario, reduciendo mermas un 15%."
- "Gestioné presupuesto de 50.000€ anuales sin sobrecostes."

### Categorías de verbos

**Liderazgo:**
- Lideré, dirigí, supervisé, coordiné, gestioné.

**Logros:**
- Alcançé, superé, incrementé, mejoré, optimicé.

**Creación:**
- Creé, diseñé, desarrollé, implementé, fundé.

**Análisis:**
- Analicé, evalué, investigué, identifiqué, diagnosticé.

**Comunicación:**
- Comuniqué, presenté, negocié, persuadí, capacité.

**Organización:**
- Organicé, planifiqué, programé, estructuré, administré.

### Trucos

1. **Empieza cada viñeta con un verbo.**
2. **Usa tiempo pasado** para trabajos anteriores.
3. **Usa presente** para el trabajo actual.
4. **Cuantifica siempre que puedas.**
5. **No repitas verbos** en la misma sección.

### Ejemplos por sector

**Hostelería:**
- Atendí a X clientes diarios.
- Coordiné brigada de X personas.
- Gestioné caja por valor de X € diarios.

**Comercio:**
- Vendí X unidades mensuales.
- Incrementé ventas en X%.
- Fidelicé a X clientes recurrentes.

**Administración:**
- Gestioné agenda de X directivos.
- Procesé X facturas mensuales.
- Implementé sistema que ahorró X horas/semana.

**Construcción:**
- Supervisé obra de X m².
- Coordiné equipo de X operarios.
- Reduje tiempos de entrega en X%.

### Errores a evitar

- ❌ "Responsable de..." (vago).
- ❌ "Me encargaba de..." (pasivo).
- ❌ "Trabajé en..." (sin detalle).
- ❌ Repetir el mismo verbo.

> **Tip:** Mira la sección ACTION_VERBS de esta app para una lista completa por categorías.`,
    tips: [
      'Empieza cada viñeta con un verbo de acción.',
      'Cuantifica siempre: números, %, €, cantidades.',
      'No repitas verbos en la misma sección.',
      'Usa pasado para trabajos anteriores, presente para el actual.',
    ],
  },
  {
    id: 'common-mistakes',
    title: 'Errores comunes que arruinan tu CV',
    content: `## Evita estos 15 errores

Tu CV puede ser descartado en 6 segundos. No falles en lo básico.

### Errores de contenido

**1. ❌ Errores ortográficos y gramaticales**
- 76% de los reclutadores descartan CVs con faltas.
- Usa corrector ortográfico.
- Pide a alguien que lo revise.

**2. ❌ Datos personales excesivos**
- No pongas: DNI completo, dirección exacta, estado civil, hijos.
- Solo: nombre, teléfono, email, ciudad.

**3. ❌ Mentir o exagerar**
- Las mentiras se descubren en entrevistas o verificaciones.
- Pueden causar despido procedente después.

**4. ❌ Información irrelevante**
- No incluyas hobbies si no aportan.
- No pongas trabajos de hace 20 años sin relación con el puesto.

**5. ❌ Huecos sin explicar**
- Si tuviste paréntesis sin trabajo, explícalos:
  - "Año sabático para cuidados familiares".
  - "Formación intensiva en [tema]".

### Errores de formato

**6. ❌ Demasiado largo**
- 1 página para <10 años de experiencia.
- 2 páginas máximo para el resto.

**7. ❌ Tipografía no profesional**
- NO uses: Comic Sans, Papyrus, fuentes decorativas.
- Sí usa: Arial, Calibri, Roboto, Open Sans.

**8. ❌ Tamaños de fuente inconsistentes**
- Cuerpo: 10-12 pt.
- Títulos: 14-16 pt.
- Nombre: 18-24 pt.

**9. ❌ Colores estridentes**
- Para sectores formales: negro y gris.
- Para creativos: 1 color de acento (no más).

**10. ❌ Falta de estructura**
- Usa encabezados claros.
- Viñetas para listar logros.
- Espacios en blanco suficientes.

### Errores de envío

**11. ❌ Enviar en Word**
- Envía SIEMPRE en PDF.
- Word se ve distinto en cada ordenador.

**12. ❌ Nombre del archivo genérico**
- ❌ "cv.pdf"
- ✅ "CV_Maria_Gonzalez_Camarera.pdf"

**13. ❌ Mismo CV para todas las ofertas**
- Adapta tu CV a cada puesto.
- Destaca lo relevante para cada empresa.

**14. ❌ Sin carta de presentación**
- 45% de reclutadores descartan CVs sin carta.
- Una carta breve personalizada multiplica tus opciones.

**15. ❌ Sin LinkedIn**
- En España, 80% de reclutadores buscan en LinkedIn.
- Crea tu perfil y enlázalo en tu CV.

### Lista de comprobación final

Antes de enviar, revisa:

- [ ] Sin faltas de ortografía.
- [ ] 1-2 páginas máximo.
- [ ] Datos personales correctos.
- [ ] Email profesional (no supermaria99@).
- [ ] Formato PDF.
- [ ] Nombre del archivo claro.
- [ ] Adaptado al puesto.
- [ ] Carta de presentación adjunta.
- [ ] Referencias disponibles si las piden.
- [ ] LinkedIn actualizado.

### Si tienes poca experiencia

Si eres recién llegado o sin experiencia laboral:

1. **Pon formación primero.**
2. **Incluye voluntariado.**
3. **Cursos y certificaciones.**
4. **Proyectos personales.**
5. **Habilidades y idiomas.**
6. **Disponibilidad inmediata.**

> Todos empezamos sin experiencia. La actitud y la formación importan tanto como el CV.`,
    tips: [
      'Revisa la ortografía con corrector y un amigo.',
      '1-2 páginas máximo, en PDF con nombre claro.',
      'Adapta el CV a cada oferta: no envíes el mismo siempre.',
      'No mientas: las mentiras se descubren.',
    ],
  },
  {
    id: 'ats-optimization',
    title: 'Optimización ATS: cómo pasar filtros automáticos',
    content: `## El CV que leen las máquinas

El **80% de las empresas grandes** usan sistemas ATS (Applicant Tracking System) que leen CVs automáticamente antes de que los vea un humano.

### ¿Qué es un ATS?

Un software que:
- Lee tu CV en PDF o Word.
- Extrae información clave.
- Compara con la oferta de trabajo.
- Puntúa tu CV.
- Descarta los que no pasan el filtro.

> Si tu CV no pasa el ATS, **un humano nunca lo verá**.

### Cómo optimizar tu CV para ATS

**1. Usa palabras clave de la oferta**

Lee la oferta y usa las mismas palabras en tu CV.

Ejemplo de oferta:
> "Buscamos camarero con experiencia en atención al cliente, conocimiento de vinos y disponibilidad para turnos."

En tu CV, incluye:
- "camarero"
- "atención al cliente"
- "vinos"
- "disponibilidad para turnos"

**2. Formato simple**

- ✅ Una columna.
- ✅ Fuentes estándar (Arial, Calibri).
- ✅ Negrita para destacar.
- ❌ Tablas complejas.
- ❌ Columnas múltiples.
- ❌ Cuadros de texto.
- ❌ Gráficos e imágenes.
- ❌ Encabezados/pies complejos.

**3. Estructura clara**

- Encabezados estándar: "Experiencia", "Formación", "Habilidades".
- Sin títulos creativos ("Mi trayectoria").

**4. Evita abreviaturas raras**

- ✅ "Microsoft Excel"
- ❌ "MS Excel" o "Excel (Office)"
- ✅ "Atención al cliente"
- ❌ "At. cliente"

**5. Fecha en formato estándar**

- ✅ "Enero 2020 - Marzo 2023"
- ✅ "01/2020 - 03/2023"
- ❌ Formatos ambiguos.

**6. Sin caracteres especiales**

- ✅ Letras y números estándar.
- ❌ Símbolos raros, emojis.
- ❌ Logos e imágenes.

**7. Archivo PDF de texto**

- El PDF debe ser seleccionable (poder copiar el texto).
- No envíes PDFs escaneados como imagen.

### Plantillas ATS-friendly

Plantillas ideales para ATS:

- Una sola columna.
- Encabezados claros en orden: datos, experiencia, formación, habilidades.
- Sin colores (o mínimos).
- Sin fotos (algunos ATS no las procesan bien).

> **Importante:** Las plantillas muy creativas (con barras laterales, columnas múltiples) pueden fallar en ATS.

### Dos versiones de CV

Estrategia recomendada:

1. **CV ATS-friendly:** simple, una columna, para portales de empleo (InfoJobs, LinkedIn).
2. **CV creativo:** bonito, con diseño, para envíos directos por email a personas.

### Cómo saber si tu CV pasa el ATS

**Herramientas gratuitas:**

- **Jobscan.co:** compara tu CV con la oferta.
- **CV-Library ATS checker:** revisa tu CV.
- **Resume Worded:** feedback automático.

**Pruebas manuales:**

1. Copia tu CV y pégalo en un bloc de notas.
2. Si el texto sale desordenado, el ATS lo leerá mal.
3. Si sale limpio y legible, está bien estructurado.

### Palabras clave por sector

**Hostelería:**
- camarero, cocinero, atención al cliente, hostelería, restaurante, bar, cocina, TPV, turnos, fines de semana.

**Comercio:**
- vendedor, comercial, ventas, atención al cliente, fidelización, caja, retail, KPIs.

**Administración:**
- administrativo, oficina, Office, Excel, facturación, atención telefónica, agenda, archivo.

**Construcción:**
- peón, albañil, electricista, fontanero, obra, EPIs, seguridad, prevención.

**Limpieza:**
- limpiador, limpieza, conserje, mantenimiento, higiene, desinfección.

### Ejercicio práctico

1. Busca una oferta de tu sector en InfoJobs.
2. Subraya las palabras clave.
3. Asegúrate de que tu CV las incluye (en contexto natural).
4. Usa una plantilla simple de una columna.
5. Guarda en PDF de texto (no escaneado).
6. Sube a Jobscan para verificar puntuación.`,
    tips: [
      'Usa palabras clave de la oferta en tu CV.',
      'Formato simple: una columna, sin tablas complejas.',
      'Encabezados estándar: Experiencia, Formación, Habilidades.',
      'PDF de texto (no escaneado como imagen).',
    ],
  },
  {
    id: 'cover-letter',
    title: 'Carta de presentación',
    content: `## Tu CV con voz

La **carta de presentación** complementa tu CV. Muestra motivación, personalidad y encaje con la empresa.

### ¿Cuándo enviarla?

- ✅ Siempre que la pidan.
- ✅ En envíos directos por email.
- ✅ En ofertas donde se valora especialmente.
- ❌ Si la oferta dice "NO enviar carta".

### Estructura de una carta

**1. Encabezado:**
- Tus datos (arriba derecha).
- Fecha.
- Datos de la empresa (debajo, izquierda).

**2. Saludo:**
- "Estimado/a Sr./Sra. [apellido]:" (si conoces el nombre).
- "Estimados señores:" (si no).

**3. Primer párrafo: motivación**
- Por qué te diriges a ellos.
- Para qué puesto.

**4. Segundo párrafo: tu valor**
- Qué puedes aportar.
- Experiencia relevante (2-3 logros clave).

**5. Tercer párrafo: encaje**
- Por qué esta empresa.
- Conexión con sus valores.

**6. Cierre:**
- Pedir entrevista.
- Disponibilidad.

**7. Despedida:**
- "Atentamente,"
- Tu nombre y firma.

### Ejemplo completo

> María González Pérez
> C/ Gran Vía 25, 3ºB
> 28013 Madrid
> Tel: 600 123 456
> maria.gonzalez.2024@gmail.com
>
> Madrid, 15 de marzo de 2024
>
> Restaurante El Burladero
> Atención: Departamento de RRHH
> C/ Salud 21, Madrid
>
> **Estimados señores:**
>
> Me dirijo a ustedes con gran entusiasmo para presentar mi candidatura al puesto de camarera publicado en InfoJobs el pasado 10 de marzo.
>
> Cuento con 5 años de experiencia en hostelería, incluyendo 3 años en restaurantes de alta gama en Lima. En mi último puesto, atendí a más de 100 clientes diarios con un índice de satisfacción del 95%, y colaboré en la formación de nuevos camareros.
>
> Admiro especialmente el compromiso de El Burladero con la cocina tradicional española y el servicio al cliente. Mi experiencia previa en hostelería latina me permite aportar una atención cálida y profesional, adaptada al cliente español.
>
> Estoy disponible para incorporarme de manera inmediata y flexible para realizar entrevistas en horario que les convenga.
>
> Agradezco de antemano su tiempo y consideración. Quedo a la espera de sus comentarios.
>
> Atentamente,
>
> *(firma)*
>
> María González Pérez

### Consejos

**Sí:**
- 1 página máximo.
- Tono profesional pero con personalidad.
- Personalizada para cada empresa.
- Habla de la empresa (investiga antes).
- Menciona logros concretos.

**No:**
- Copiar y pegar para todas las empresas.
- Repetir lo que ya está en el CV.
- Explicar por qué necesitas el trabajo.
- Más de 4 párrafos.

### Carta por email

Si envías la carta en el cuerpo del email:

- Asunto: "Candidatura - [Puesto] - [Tu nombre]".
- Cuerpo: versión corta de la carta (3 párrafos).
- Adjunta: CV en PDF.

### Carta cuando tienes poca experiencia

Si no tienes experiencia:

1. Destaca tu **formación**.
2. **Actitud** y ganas de aprender.
3. **Habilidades transferibles**: trabajo en equipo, comunicación.
4. **Idiomas**.
5. **Disponibilidad** y flexibilidad.

### Ejemplo para recién llegado

> Estimados señores:
>
> Aunque recientemente llegado a España, cuento con [X] años de experiencia en [sector] en [país]. Mi título de [formación] está en proceso de homologación, pero mi dominio del español y mi experiencia previa me permiten aportar valor inmediato a su equipo.
>
> Mi objetivo es integrarme laboralmente en España y contribuir con mi trabajo y dedicación. Estoy disponible para entrevistas y para comenzar en cuanto sea necesario.

### Errores comunes

- ❌ Carta genérica para todas las empresas.
- ❌ Repetir lo del CV sin aportar nada nuevo.
- ❌ Errores ortográficos.
- ❌ Hablar solo de ti, no de la empresa.
- ❌ Demasiado larga (>1 página).

### Plantillas

Crea plantillas base:
1. Para ofertas formales (banca, administración).
2. Para hostelería y servicios.
3. Para sectores creativos.

Personaliza cada una antes de enviar.`,
    tips: [
      'Personaliza la carta para cada empresa.',
      '1 página máximo, 3-4 párrafos.',
      'Investiga la empresa antes de escribir.',
      'Menciona logros concretos y tu motivación.',
    ],
  },
  {
    id: 'interview-tips',
    title: 'Consejos para la entrevista de trabajo',
    content: `## Convierte la entrevista en tu oferta

Tu CV te consiguió la entrevista. Ahora, conviértela en trabajo.

### Antes de la entrevista

**1. Investiga la empresa:**
- ¿Qué hace?
- ¿Cuántos empleados?
- ¿Valores?
- ¿Noticias recientes?

Herramientas:
- Web oficial.
- LinkedIn (página de la empresa).
- Google News.

**2. Repasa la oferta:**
- ¿Qué piden?
- ¿Cómo encajas tú?
- Prepara ejemplos concretos.

**3. Practica preguntas:**
- "Cuéntame sobre ti."
- "¿Por qué quieres trabajar aquí?"
- "¿Cuáles son tus fortalezas y debilidades?"
- "¿Dónde te ves en 5 años?"

**4. Prepara tu outfit:**
- Acorde al sector (formal / informal).
- Limpio y planchado.
- Sin exceso de accesorios.

**5. Documentos:**
- 2 copias de tu CV en papel.
- Carta de presentación.
- DNI/NIE.
- Certificados relevantes.

**6. Llega puntual:**
- 10-15 minutos antes.
- Si vas a llegar tarde: avisa por teléfono.

### Durante la entrevista

**1. Primeros 30 segundos:**
- Saludo firme.
- Sonrisa sincera.
- Contacto visual.
- Postura abierta.

**2. Lenguaje corporal:**
- Siéntate derecho.
- Manos sobre la mesa (no en los bolsillos).
- No cruces los brazos.
- Asiente para mostrar atención.

**3. Responder preguntas:**

**Técnica STAR:**
- **S**ituación: contexto.
- **T**area: qué tenías que hacer.
- **A**cción: qué hiciste.
- **R**esultado: qué conseguiste.

Ejemplo:
> "En mi anterior trabajo (situación), teníamos un problema con la rotación de clientes (tarea). Implementé un sistema de seguimiento telefónico semanal (acción), lo que redujo la rotación un 30% en 6 meses (resultado)."

**4. Preguntas que YO puedo hacer:**

- "¿Cómo es el equipo con el que trabajaría?"
- "¿Cuáles son los retos del puesto en los primeros 90 días?"
- "¿Qué oportunidades de formación ofrece la empresa?"
- "¿Cómo es el proceso de selección a partir de ahora?"

**NO preguntes:**
- "¿Cuánto se cobra?" (al inicio).
- "¿Cuántos días de vacaciones hay?" (al inicio).
- "¿Tienen problemas con los horarios?"

**5. Manejo de preguntas difíciles:**

**"¿Cuál es tu mayor debilidad?"**
- No digas "perfeccionista" (cliché).
- Di algo real pero con plan de mejora:
  > "A veces me cuesta delegar. He empezado a confiar más en mi equipo y los resultados mejoran."

**"¿Por qué dejaste tu último trabajo?"**
- No hables mal de tu anterior empresa.
- Enfócate en el futuro:
  > "Busco nuevos retos profesionales que me permitan crecer."

**"¿Por qué deberíamos contratarte?"**
- Conecta tus habilidades con lo que piden.
- Da 2-3 ejemplos concretos.

### Tipos de entrevista

**1. Individual:**
- 1 candidato y 1 entrevistador.
- Lo más común.

**2. Panel:**
- 1 candidato y varios entrevistadores.
- Responde a cada uno mirándole.

**3. Grupal:**
- Varios candidatos juntos.
- Se evalúa trabajo en equipo.
- Participa pero no acapares.

**4. Por teléfono/vídeo:**
- Mismo protocolo que presencial.
- Cuida el fondo y la iluminación.
- Usa auriculares.

**5. Prueba técnica:**
- Caso práctico, test, presentación.
- Lee bien las instrucciones.
- Si dudas, pregunta.

### Después de la entrevista

**1. Email de agradecimiento:**
- Dentro de 24 horas.
- 2-3 líneas.
- "Gracias por la entrevista. Quedo a la espera de sus comentarios."

**2. Reflexiona:**
- ¿Qué fue bien?
- ¿Qué mejorar para la próxima?

**3. Si no contestan:**
- Espera 1-2 semanas.
- Email de seguimiento corto.

**4. Si te rechazan:**
- Pide feedback.
- Aprende para la próxima.

### Errores comunes

- ❌ Llegar tarde sin avisar.
- ❌ Hablar mal de empleos anteriores.
- ❌ Mentir.
- ❌ No hacer preguntas.
- ❌ Hablar solo de salario y vacaciones.
- ❌ Vestir inadecuadamente.
- ❌ Mala postura o lenguaje corporal.
- ❌ Respuestas vagas sin ejemplos.

### Preguntas frecuentes para inmigrantes

**"¿Tienes permiso de trabajo?"**
- Ten respuesta preparada:
  > "Sí, tengo permiso de residencia y trabajo en España" (si lo tienes).
  > "Estoy en proceso de renovación, que se resolverá en [mes]" (si renovando).
  > "Tengo autorización para trabajar por cuenta ajena desde [fecha]".

**"¿Por qué viniste a España?"**
- Respuesta profesional, no personal:
  > "Buscaba nuevas oportunidades profesionales en un mercado con mayor crecimiento en mi sector."

**"¿Cuánto tiempo planeas quedarte?"**
- Muestra arraigo:
  > "Mi plan a largo plazo es establecerme en España. Mi familia está aquí."

### Si te ofrecen el puesto

**1. Pide todo por escrito:**
- Salario bruto anual.
- Pagas (12 o 14).
- Condiciones: horario, vacaciones.
- Beneficios sociales.
- Periodo de prueba.

**2. Tómate 24-48 horas:**
- No aceptes inmediatamente.
- Revisa la propuesta.

**3. Negocia si es posible:**
- Salario (si hay margen).
- Beneficios (formación, horario flexible).

**4. Acepta por escrito.**

> **¡Felicidades!** Si llegaste hasta aquí, es porque tu CV y tu carta funcionaron. Sigue aprendiendo para crecer en tu nuevo puesto.`,
    tips: [
      'Investiga la empresa antes de la entrevista.',
      'Practica la técnica STAR para responder con ejemplos.',
      'Prepara 3-5 preguntas para hacer tú.',
      'Envía email de agradecimiento en 24 horas.',
    ],
  },
  {
    id: 'references',
    title: 'Referencias: cuándo y cómo pedirlas',
    content: `## Tu red de respaldo

Las **referencias** son personas que pueden confirmar tu valía profesional. En España no siempre se piden, pero tenerlas preparadas te da ventaja.

### ¿Qué son las referencias?

Personas que han trabajado contigo y pueden hablar positivamente de:
- Tu trabajo.
- Tu responsabilidad.
- Tu carácter.
- Tu rendimiento.

### Tipos de referencias

**1. Profesionales (las más valiosas):**
- Jefes anteriores.
- Compañeros de trabajo.
- Clientes o proveedores.

**2. Académicas:**
- Profesores.
- Tutores de prácticas.
- Directores de centros.

**3. Personales (menos valiosas):**
- Solo si no tienes profesionales.
- Amigos o conocidos respetables.

> **Evita:** familiares directos como referencias.

### ¿Cuándo incluir referencias en el CV?

**En España, normalmente NO se incluyen en el CV.**

Escribe:
> "Referencias disponibles bajo petición."

Cuando te las pidan (suele ser al final del proceso), las proporcionas.

### Cómo pedir una referencia

**1. Elige bien:**
- Alguien que te conoce bien.
- Con el que tengas buena relación.
- Que ocupe un cargo respetable.

**2. Pide permiso:**
- Llama o escribe antes.
- Pregunta si estaría dispuesto.
- No asumas que dirá que sí.

**Email de solicitud:**

> Estimado/a [nombre]:
>
> Espero que estés bien. Te escribo porque estoy en proceso de selección para un puesto de [puesto] en [empresa]. Me gustaría incluirte como referencia profesional si estás de acuerdo.
>
> Trabajamos juntos en [empresa] entre [fechas], donde [describe brevemente el trabajo conjunto].
>
> Si aceptas, te pasaré la información del reclutador en caso de que me contacten. Agradezco mucho tu tiempo y disposición.
>
> Un cordial saludo,
> [Tu nombre]

**3. Pídele que sea específico:**
- Dile para qué puesto.
- Recuérdale logros concretos.
- Pídele que mencione: puntualidad, responsabilidad, etc.

**4. Agradécele:**
- Aunque no te llamen.
- Aunque no consigas el puesto.
- Mantén la relación.

### Cuántas referencias necesitas

- **2-3 referencias** son suficientes.
- Preferiblemente profesionales.
- De distintos trabajos si es posible.

### Cómo presentar tus referencias

En documento aparte, con:

- Nombre completo.
- Cargo.
- Empresa.
- Teléfono.
- Email.
- Relación contigo (ej: "Mi supervisor en [empresa], 2020-2023").

**Ejemplo:**

> ## Referencias profesionales
>
> **Carlos Martínez López**
> Director de Restaurante La Parrilla, Lima
> Tel: +51 999 888 777
> Email: carlos.martinez@laparrilla.pe
> Relación: Mi supervisor directo (2020-2023)
>
> **Ana Rodríguez Pérez**
> Jefa de Sala, Hotel Los Andes
> Tel: +51 999 666 555
> Email: ana.rodriguez@hotelandes.pe
> Relación: Mi mentora profesional (2019-2020)

### Si eres recién llegado sin referencias españolas

Estrategias:

**1. Usa referencias de tu país de origen:**
- Funciona si tienen email y dan permiso.
- Indica la diferencia horaria para llamadas.

**2. Pide referencias de voluntariado:**
- ONGs en España: Cruz Roja, CEAR, ACCEM.
- Profesores de cursos de español.

**3. Referencias académicas:**
- De cursos realizados en España.
- De escuelas de formación profesional.

**4. Cartas de recomendación escritas:**
- Pídelas antes de irte de tu país.
- Traducidas al español si es necesario.
- Con firma y sello.

### Referencias para LinkedIn

LinkedIn tiene sistema de **recomendaciones**:

1. Ve al perfil de la persona.
2. "Más" → "Solicitar recomendación".
3. La persona escribe un texto.
4. Aparece en tu perfil.

> Las recomendaciones de LinkedIn son muy valiosas. Pídelas a antiguos jefes y compañeros.

### Cómo preparar a tus referencias

Antes de que les llamen:

1. **Avísales** que estás en proceso.
2. **Diles para qué puesto**.
3. **Recuérdales** logros concretos.
4. **Pídeles** que destaquen ciertas habilidades.
5. **Agradéceles** su tiempo.

### Errores comunes

- ❌ Poner referencias en el CV sin avisarles.
- ❌ Usar familiares como referencias.
- ❌ Referencias de hace 10 años (mejor recientes).
- ❌ No avisar cuando te las piden.
- ❌ No agradecer.

### Lista de comprobación

- [ ] Tengo 2-3 referencias profesionales.
- [ ] Les he pedido permiso.
- [ ] Tengo sus datos actualizados.
- [ ] Les aviso cuando estoy en procesos.
- [ ] Tengo cartas de recomendación escritas.
- [ ] En LinkedIn tengo 2+ recomendaciones.
- [ ] Agradezco siempre su ayuda.

### Ejercicio

1. Haz lista de 5 personas que podrían ser tus referencias.
2. Elige las 3 mejores.
3. Escríbeles pidiendo permiso.
4. Crea documento de referencias.
5. Pide 2 recomendaciones en LinkedIn.`,
    tips: [
      'Pide permiso antes de poner a alguien como referencia.',
      '2-3 referencias profesionales son suficientes.',
      'Mantén contacto con tus referencias: avísales cuando estés en proceso.',
      'Pide recomendaciones también en LinkedIn.',
    ],
  },
];

// ------------------------------------------------------------
// VERBOS DE ACCIÓN POR CATEGORÍAS
// ------------------------------------------------------------
export const ACTION_VERBS: { category: string; verbs: string[] }[] = [
  {
    category: 'Liderazgo y gestión',
    verbs: [
      'Lideré',
      'Dirigí',
      'Supervisé',
      'Coordiné',
      'Gestioné',
      'Asumí la responsabilidad de',
      'Mentoricé',
      'Capacité',
      'Formé',
      'Delegué',
      'Inspiraé',
      'Motivé',
      'Movilicé',
      'Alineé',
      'Empoderé',
    ],
  },
  {
    category: 'Logros y resultados',
    verbs: [
      'Alcançé',
      'Superé',
      'Incrementé',
      'Mejoré',
      'Optimicé',
      'Aumenté',
      'Reduje',
      'Aceleré',
      'Maximicé',
      'Minimicé',
      'Doblé',
      'Triplicé',
      'Generé',
      'Produje',
      'Conseguí',
    ],
  },
  {
    category: 'Creación e innovación',
    verbs: [
      'Creé',
      'Diseñé',
      'Desarrollé',
      'Implementé',
      'Fundé',
      'Inauguré',
      'Inicié',
      'Establecí',
      'Construí',
      'Programé',
      'Codifiqué',
      'Inventé',
      'Ideé',
      'Conceptualicé',
      'Prototipé',
    ],
  },
  {
    category: 'Análisis y resolución de problemas',
    verbs: [
      'Analicé',
      'Evalué',
      'Investigué',
      'Identifiqué',
      'Diagnosticé',
      'Resolví',
      'Solucioné',
      'Audité',
      'Examiné',
      'Estudié',
      'Revisé',
      'Detecté',
      'Descubrí',
      'Determiné',
      'Valoré',
    ],
  },
  {
    category: 'Comunicación y relaciones',
    verbs: [
      'Comuniqué',
      'Presenté',
      'Negocié',
      'Persuadí',
      'Asesoré',
      'Consulté',
      'Informé',
      'Expuse',
      'Defendí',
      'Convencí',
      'Medié',
      'Facilité',
      'Traduje',
      'Interpreté',
      'Documenté',
    ],
  },
  {
    category: 'Organización y planificación',
    verbs: [
      'Organisé',
      'Planifiqué',
      'Programé',
      'Estructuré',
      'Administré',
      'Coordiné',
      'Gestioné',
      'Controlé',
      'Supervisé',
      'Monitoricé',
      'Programé',
      'Calendaricé',
      'Presupuesté',
      'Distribuí',
      'Asígné',
    ],
  },
  {
    category: 'Atención al cliente',
    verbs: [
      'Atendí',
      'Asistí',
      'Acompañé',
      'Fidelicé',
      'Resolví consultas',
      'Gestioné incidencias',
      'Brindé soporte',
      'Orienté',
      'Escuché activamente',
      'Anticipé necesidades',
      'Personalicé servicios',
      'Recibí',
      'Aconsejé',
      'Gestioné reclamaciones',
      'Seguí up',
    ],
  },
  {
    category: 'Ventas y comerciales',
    verbs: [
      'Vendí',
      'Comercialicé',
      'Promocioné',
      'Negocié contratos',
      'Cerré acuerdos',
      'Prospecté',
      'Conseguí clientes',
      'Expandí mercado',
      'Lancé productos',
      'Investigué mercado',
      'Posicioné marca',
      'Distribuí',
      'Exporté',
      'Importé',
      'Capté leads',
    ],
  },
  {
    category: 'Trabajo en equipo',
    verbs: [
      'Colaboré',
      'Cooperé',
      'Aporté',
      'Compartí',
      'Apoyé',
      'Integré',
      'Participé',
      'Contribuí',
      'Sinergicé',
      'Fomenté cohesión',
      'Medié conflictos',
      'Resolví diferencias',
      'Coordiné esfuerzos',
      'Trabajé conjuntamente',
      'Acompañé al equipo',
    ],
  },
  {
    category: 'Tecnología y ofimática',
    verbs: [
      'Implementé software',
      'Migré datos',
      'Automaté procesos',
      'Digitalicé',
      'Configuré sistemas',
      'Actualicé bases de datos',
      'Programé',
      'Codifiqué',
      'Testé',
      'Depuré código',
      'Optimicé consultas',
      'Diseñé interfaces',
      'Maqueté',
      'Integré APIs',
      'Desplegué aplicaciones',
    ],
  },
  {
    category: 'Hostelería y cocina',
    verbs: [
      'Atendí mesas',
      'Preparé platos',
      'Cociné',
      'Reposté',
      'Serví',
      'Recepcioné',
      'Gestioné reservas',
      'Supervisé brigada',
      'Manipulé alimentos',
      'Cumplí normativa',
      'Controlé stock',
      'Pedí suministros',
      'Limpié y desinfecté',
      'Monté eventos',
      'Cataé y seleccioné',
    ],
  },
  {
    category: 'Construcción y oficios',
    verbs: [
      'Construí',
      'Edifiqué',
      'Reparé',
      'Instalé',
      'Monté',
      'Soldé',
      'Albañilé',
      'Pinté',
      'Alicaté',
      'Enlucí',
      'Fontané',
      'Electricé',
      'Carpinté',
      'Impermeabilicé',
      'Rehabilité',
    ],
  },
];

// ------------------------------------------------------------
// SUGERENCIAS DE HABILIDADES
// ------------------------------------------------------------
export const SKILL_SUGGESTIONS: { category: string; skills: string[] }[] = [
  {
    category: 'Ofimática y software',
    skills: [
      'Microsoft Word',
      'Microsoft Excel',
      'Microsoft PowerPoint',
      'Microsoft Outlook',
      'Google Docs',
      'Google Sheets',
      'Google Slides',
      'Gmail',
      'OneDrive',
      'Google Drive',
      'Paquete Office 365',
      'TPV (Terminal Punto de Venta)',
      'SAP',
      'Salesforce',
      'WordPress',
      'Canva',
      'Trello',
      'Slack',
      'Zoom',
      'Microsoft Teams',
    ],
  },
  {
    category: 'Idiomas',
    skills: [
      'Español nativo',
      'Español C2',
      'Catalán',
      'Euskera',
      'Gallego',
      'Inglés B1',
      'Inglés B2',
      'Inglés C1',
      'Inglés C2',
      'Francés',
      'Alemán',
      'Italiano',
      'Portugués',
      'Árabe',
      'Chino mandarín',
      'Hindi',
      'Rumano',
      'Búlgaro',
      'Ucraniano',
      'Ruso',
      'Wolof',
      'Quechua',
      'Guaraní',
      'DELE B2',
      'Cambridge First Certificate',
      'TOEFL',
    ],
  },
  {
    category: 'Soft skills (habilidades blandas)',
    skills: [
      'Comunicación efectiva',
      'Trabajo en equipo',
      'Liderazgo',
      'Resolución de problemas',
      'Adaptabilidad',
      'Flexibilidad',
      'Creatividad',
      'Pensamiento crítico',
      'Gestión del tiempo',
      'Organización',
      'Atención al detalle',
      'Empatía',
      'Inteligencia emocional',
      'Negociación',
      'Toma de decisiones',
      'Iniciativa',
      'Proactividad',
      'Resiliencia',
      'Manejo del estrés',
      'Orientación al cliente',
      'Capacidad de aprendizaje',
      'Mentoring',
      'Mediación de conflictos',
      'Escucha activa',
    ],
  },
  {
    category: 'Hostelería y restauración',
    skills: [
      'Atención al cliente',
      'Servicio de mesa',
      'Conocimiento de vinos',
      'Cocktaileria',
      'Cafetería',
      'Manipulación de alimentos',
      'Higiene alimentaria (APPCC)',
      'Cocina mediterránea',
      'Cocina internacional',
      'Repostería',
      'Panadería',
      'Gestión de reservas',
      'Manejo de TPV',
      'Cobro y caja',
      'Protocolo de servicio',
      'Banquetes y eventos',
      'Room service',
      'Recepción de hotel',
      'Conserjería',
      'Camarería de piso',
    ],
  },
  {
    category: 'Comercio y ventas',
    skills: [
      'Técnicas de venta',
      'Atención al cliente',
      'Fidelización de clientes',
      'Cobro y caja',
      'Gestión de inventario',
      'Reposición',
      'Escaparatismo',
      'Visual merchandising',
      'Gestión de quejas',
      'CRM',
      'Prospectación',
      'Cierre de ventas',
      'Telemarketing',
      'E-commerce',
      'Marketing digital',
      'Redes sociales',
      'WhatsApp Business',
      'Gestión de tienda',
      'Control de stock',
      'Pedidos a proveedores',
    ],
  },
  {
    category: 'Administración y oficina',
    skills: [
      'Gestión de agenda',
      'Atención telefónica',
      'Atención presencial',
      'Archivo y clasificación',
      'Facturación',
      'Gestión documental',
      'Procesamiento de textos',
      'Hojas de cálculo',
      'Bases de datos',
      'Correo electrónico',
      'Técnicas de mecanografía',
      'Traducción básica',
      'Redacción de oficios',
      'Gestión de proveedores',
      'Conciliación bancaria',
      'Gestión de RRHH',
      'Nóminas y Seguridad Social',
      'Contabilidad básica',
      'FacturaE',
      'Certificado digital',
    ],
  },
  {
    category: 'Construcción y oficios',
    skills: [
      'Albañilería',
      'Electricidad',
      'Fontanería',
      'Carpintería',
      'Pintura',
      'Alicatado y pladur',
      'Soldadura',
      'Impermeabilización',
      'Rehabilitación',
      'Reformas integrales',
      'Lectura de planos',
      'Manejo de maquinaria',
      'Prevención de riesgos laborales',
      'EPIs',
      'Trabajos en altura',
      'Carnet de carretillero',
      'Carnet de manipulador de maquinaria',
      'Herramientas manuales',
      'Herramientas eléctricas',
      'Medición y replanteo',
    ],
  },
  {
    category: 'Limpieza y mantenimiento',
    skills: [
      'Limpieza de oficinas',
      'Limpieza de comunidades',
      'Limpieza industrial',
      'Limpieza de cristales',
      'Limpieza de moquetas',
      'Manejo de maquinaria de limpieza',
      'Productos químicos y dosificación',
      'Desinfección',
      'Higiene alimentaria',
      'Conserjería',
      'Mantenimiento básico',
      'Reparaciones menores',
      'Jardinería básica',
      'Piscinas (mantenimiento)',
      'Gestión de residuos',
      'Reciclaje',
      'Trabajo en equipo',
      'Disponibilidad de turnos',
      'Carnet de manipulador',
      'Prevención de riesgos',
    ],
  },
  {
    category: 'Cuidados y salud',
    skills: [
      'Cuidados de personas mayores',
      'Cuidados infantiles',
      'Apoyo a personas con discapacidad',
      'Auxiliar de enfermería',
      'Auxiliar de ayuda a domicilio',
      'Primeros auxilios',
      'RCP',
      'Higiene y movilización',
      'Administración de medicación',
      'Alimentación asistida',
      'Acompañamiento médico',
      'Lectura de constantes vitales',
      'Cuidados paliativos',
      'Estimulación cognitiva',
      'Fisioterapia básica',
      'Psicología aplicada',
      'Trabajo social básico',
      'Empatía',
      'Paciencia',
      'Manejo de situaciones difíciles',
    ],
  },
  {
    category: 'Transporte y logística',
    skills: [
      'Carnet de conducir B',
      'Carnet de conducir C',
      'Carnet de conducir C+E',
      'Carnet ADR',
      'Carnet de carretillero',
      'Conducción eficiente',
      'Reparto urbano',
      'Rutas de larga distancia',
      'Logística de almacén',
      'Gestión de flotas',
      'Control de stock',
      'Picking y packing',
      'Etiquetas y envíos',
      'Manipulación de mercancías',
      'Carnet CAP',
      'Tarjeta de cualificación',
      'Sistemas GPS',
      'Prevención de riesgos',
      'Trabajo nocturno',
      'Disponibilidad para viajar',
    ],
  },
  {
    category: 'Tecnología y digital',
    skills: [
      'Manejo de redes sociales',
      'Marketing digital',
      'SEO básico',
      'Google Analytics',
      'Facebook Ads',
      'Instagram Ads',
      'TikTok',
      'WhatsApp Business',
      'ChatGPT',
      'Gemini',
      'Claude',
      'Microsoft Copilot',
      'Notion',
      'Slack',
      'Trello',
      'Asana',
      'Figma',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'WordPress',
      'Shopify',
      'HTML básico',
      'Python básico',
      'Excel avanzado',
    ],
  },
  {
    category: 'Educación y formación',
    skills: [
      'Docencia',
      'Tutoría',
      'Diseño de cursos',
      'E-learning',
      'Moodle',
      'Google Classroom',
      'Microsoft Teams',
      'Zoom educativo',
      'Evaluación',
      'Pedagogía',
      'Didáctica',
      'Atención a la diversidad',
      'Educación infantil',
      'Educación primaria',
      'Educación secundaria',
      'Educación de adultos',
      'Educación especial',
      'Animación sociocultural',
      'Ludoteca',
      'Monitor de tiempo libre',
    ],
  },
];

// ------------------------------------------------------------
// EXPORT FINAL
// ------------------------------------------------------------
console.log(
  'CV templates:',
  CV_TEMPLATES.length,
  'CV guides:',
  CV_GUIDES.length,
  'Action verbs categories:',
  ACTION_VERBS.length,
  'Skill categories:',
  SKILL_SUGGESTIONS.length,
);
