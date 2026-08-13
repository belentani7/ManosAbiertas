// ============================================================
// Manos Abiertas — Cursos de Inteligencia Artificial
// Contenido práctico para personas inmigrantes en España
// Idioma principal: Español (con frases clave traducidas)
// ============================================================

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "10 min"
  content: string; // markdown
  tips?: string[];
  exercise?: string;
}

export interface AICourse {
  id: string;
  model: string; // "ChatGPT", "Gemini", "Claude", "Copilot", "DeepSeek", "Qwen", "Perplexity", "Llama"
  provider: string; // OpenAI, Google, Anthropic, etc.
  logo: string; // emoji
  color: string; // tailwind gradient classes
  tagline: string;
  description: string;
  freeAccess: boolean;
  url: string;
  appAvailable: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
}

// ------------------------------------------------------------
// 1. CHATGPT — OpenAI
// ------------------------------------------------------------
const chatgptCourse: AICourse = {
  id: 'chatgpt',
  model: 'ChatGPT',
  provider: 'OpenAI',
  logo: '💬',
  color: 'from-emerald-500 to-teal-600',
  tagline: 'El asistente más popular del mundo',
  description:
    'ChatGPT es el asistente de IA más usado del mundo. Te ayuda a escribir, traducir, aprender y resolver dudas. La versión gratuita es suficiente para empezar.',
  freeAccess: true,
  url: 'https://chat.openai.com',
  appAvailable: true,
  level: 'beginner',
  lessons: [
    {
      id: 'gpt-01',
      title: 'Crear tu cuenta de ChatGPT',
      duration: '8 min',
      content: `## Cómo crear tu cuenta

1. Entra en **chat.openai.com** desde tu navegador.
2. Pulsa el botón **"Sign up"** (Registrarse).
3. Puedes registrarte con:
   - Correo de Google (botón "Continue with Google")
   - Correo electrónico y contraseña
   - Cuenta de Microsoft o Apple
4. Escribe tu nombre y fecha de nacimiento.
5. Verifica tu correo (te llegará un código de 6 números).
6. Escribe tu teléfono para recibir un código SMS.

> **Importante:** Tu número de teléfono solo se usa una vez para verificar que eres una persona real. No te cobrarán nada.

Una vez dentro verás una pantalla con una caja de texto grande. ¡Ahí es donde escribes tus mensajes a la IA!`,
      tips: [
        'Si pierdes la contraseña, usa "Forgot password" para recuperarla por correo.',
        'Guarda tu sesión para no tener que entrar cada vez.',
        'Puedes usar ChatGPT en el móvil con la app oficial "ChatGPT".',
      ],
      exercise:
        'Entra a chat.openai.com y crea tu cuenta. Cuando veas la caja de texto, escribe "Hola" y pulsa el botón de enviar.',
    },
    {
      id: 'gpt-02',
      title: 'Tu primera conversación',
      duration: '10 min',
      content: `## Cómo hablar con ChatGPT

ChatGPT funciona como un chat de WhatsApp. Escribes un mensaje, y la IA te responde.

**Ejemplo de primer mensaje:**

> Hola, me llamo María y acabo de llegar a España desde Colombia. ¿Puedes ayudarme con trámites?

**La IA te responderá en segundos.** Para seguir hablando, solo escribe otro mensaje en la misma caja.

### Partes de la pantalla

- **Caja de texto** (abajo): donde escribes.
- **Botón de enviar** (flecha hacia arriba): para mandar el mensaje.
- **"New chat"** (Nuevo chat): empieza una conversación nueva.
- **Barra lateral izquierda**: historial de tus conversaciones.

### Truco: sé específico

Cuanto más detalles des, mejor será la respuesta.

- ❌ "Ayúdame con un correo"
- ✅ "Ayúdame a escribir un correo a mi casero para pedirle que arregle la caldera, en español formal"`,
      tips: [
        'Puedes escribir en cualquier idioma: español, inglés, árabe, chino…',
        'Si la respuesta no te gusta, pulsa "Regenerate" para obtener otra.',
        'Puedes pedir "más corto", "más formal" o "con ejemplos".',
      ],
      exercise:
        'Escribe a ChatGPT: "Soy panameño y quiero pedir cita para el TIE. ¿Qué necesito?" Lee la respuesta y haz una pregunta de seguimiento.',
    },
    {
      id: 'gpt-03',
      title: 'Escribir tu CV con ChatGPT',
      duration: '15 min',
      content: `## Cómo crear un currículum

ChatGPT puede ayudarte a redactar tu CV paso a paso.

### Ejemplo de prompt

> Voy a crear mi currículum. Trabajé 5 años como cocinero en un restaurante en Marruecos. Antes, fui ayudante de cocina 2 años. Quiero trabajar en España como cocinero. Redacta un CV profesional en español.

ChatGPT te dará un texto estructurado con: datos personales, experiencia, formación, idiomas y habilidades.

### Pedir mejoras

Después puedes pedir:

- "Hazlo más corto, una sola página"
- "Añade una sección de objetivos profesionales"
- "Tradúcelo también al inglés"
- "Dame 5 verbos de acción para mejorar la descripción de mi trabajo"

### Traducir certificados

Si tienes un título o certificado en otro idioma, pega el texto y pide:

> Traduce este certificado al español con un tono oficial.

> **Privacidad:** No pongas tu número de pasaporte ni datos bancarios. Sí puedes poner nombre, email, teléfono y experiencia.`,
      tips: [
        'Guarda el CV final en un documento de Word o Google Docs.',
        'Pídele a ChatGPT versiones distintas y elige la mejor.',
        'Puedes pedir "formato Europass" para adaptarlo al estándar europeo.',
      ],
      exercise:
        'Pide a ChatGPT que redacte tu CV en español e inglés. Copia el resultado y guárdalo en un documento.',
    },
    {
      id: 'gpt-04',
      title: 'Escribir correos y mensajes',
      duration: '12 min',
      content: `## Correos para trámites diarios

ChatGPT es perfecto para escribir correos formales en español cuando no estás seguro de las palabras.

### Ejemplos prácticos

**1. Al casero (arrendador):**
> Escribe un correo a mi casero para pedirle que arregle la caldera, no funciona desde ayer. Tono formal pero amable.

**2. Al colegio de mis hijos:**
> Escribe un correo al colegio para justificar que mi hijo faltó ayer por enfermedad. En español formal.

**3. Para pedir cita:**
> Escribe un correo para pedir cita en el centro de salud. Indica que tengo dolor de espalda desde hace 3 días.

**4. Carta de presentación:**
> Redacta una carta de presentación para un puesto de camarero en un hotel. Destaca mi experiencia de 3 años y mi disponibilidad inmediata.

### Traducir respuestas

Si recibes un correo oficial en español que no entiendes bien, pégalo en ChatGPT y pide:

> Explícame este correo en palabras sencillas y dime qué tengo que hacer.

También puedes pedir la traducción a tu idioma: "Tradúcelo al árabe / rumano / chino".`,
      tips: [
        'Puedes pegar correos largos enteros sin problema.',
        'Pide siempre el tono: formal, amable, urgente, neutro.',
        'Guarda plantillas de correos que uses mucho.',
      ],
      exercise:
        'Pide a ChatGPT un correo para tu casero pidiendo que arregle una tubería. Copia el resultado y guárdalo.',
    },
    {
      id: 'gpt-05',
      title: 'Traducir documentos y textos',
      duration: '10 min',
      content: `## Traducciones precisas

ChatGPT traduce mejor que Google Translate en muchos casos porque entiende el contexto.

### Tipos de traducción

**1. Documentos personales:**
> Traduce este contrato de alquiler del español al inglés, manteniendo el formato legal.

**2. Cartas oficiales:**
> Traduce esta carta de empadronamiento al rumano para enviársela a mi familia.

**3. Conversaciones informales:**
> ¿Cómo se dice "¿Dónde está la estación de tren?" en inglés, francés y alemán?

**4. Documentos del trabajo:**
> Tengo una nómina en español. Explícame cada apartado en español sencillo y luego tradúcela al inglés.

### Truco profesional

Puedes pedir que la traducción sea:

- "Literal" (palabra por palabra)
- "Natural" (como hablaría un nativo)
- "Formal" (para documentos oficiales)
- "Con pronunciación" (para leerlo en voz alta)

> **Recomendación:** Para documentos legales muy importantes (sentencias, contratos grandes), pide siempre una segunda opinión o un traductor jurado.`,
      tips: [
        'Pega el texto completo de una sola vez, no lo cortes.',
        'Pídele que mantenga el formato: párrafos, listas, negritas.',
        'Si hay errores, dile "corrige y vuelve a traducir".',
      ],
      exercise:
        'Traduce con ChatGPT una frase del español a 3 idiomas que no sepas. Compara las traducciones.',
    },
    {
      id: 'gpt-06',
      title: 'Preguntar sobre tus derechos',
      duration: '15 min',
      content: `## Derechos laborales y sociales

ChatGPT puede orientarte sobre tus derechos en España, aunque **siempre** debes confirmar con un asistente social o abogado.

### Ejemplos útiles

**1. Derechos laborales:**
> Trabajo en un restaurante 10 horas al día, 6 días a la semana, sin contrato. ¿Es legal? ¿Qué puedo hacer?

**2. Salario mínimo:**
> ¿Cuál es el salario mínimo interprofesional en España en 2024? ¿Y las pagas extra?

**3. Vivienda:**
> Mi casero quiere subir el alquiler un 30%. ¿Es legal? ¿Qué dice la ley de arrendamientos urbanos?

**4. Sanidad:**
> Soy inmigrante sin papeles. ¿Tengo derecho a la sanidad pública en España? ¿Cómo obtengo la tarjeta sanitaria?

**5. Educación de hijos:**
> Mis hijos acaban de llegar de Venezuela. ¿Cómo les matriculo en el colegio?

### Pedir fuentes

Para temas importantes, pide a ChatGPT:

> Dame la respuesta y cita las fuentes oficiales del gobierno español donde pueda confirmarlo.

### Tráfico y migración

- "¿Qué necesito para renovar mi permiso de residencia?"
- "¿Cómo funciona el arraigo social?"
- "¿Qué es el padrón municipal y para qué sirve?"`,
      tips: [
        'ChatGPT puede equivocarse. Verifica siempre con fuentes oficiales.',
        'Pídele enlaces: "Dame enlaces oficiales del Ministerio de Inclusión".',
        'Para tu caso concreto, acude a una ONG o asistente social.',
      ],
      exercise:
        'Pregunta a ChatGPT sobre el salario mínimo en España y sobre tus derechos como trabajador. Pídele las fuentes oficiales.',
    },
    {
      id: 'gpt-07',
      title: 'Aprender español y otros idiomas',
      duration: '12 min',
      content: `## Tu profesor particular de idiomas

ChatGPT es un excelente profesor de idiomas. Te explica, corrige y practica contigo.

### Aprender español

**1. Vocabulario por temas:**
> Dame 20 palabras en español sobre el supermercado, con ejemplos de uso.

**2. Corregir errores:**
> Voy a escribir frases en español. Corrígelas y explícame los errores.

**3. Practicar conversación:**
> Hagamos una conversación simulada en español. Tú eres el médico, yo soy el paciente. Empieza tú.

**4. Verbos irregulares:**
> Explícame los verbos "ser" y "estar" con ejemplos prácticos para un hispanohablante de nivel A1.

### Aprender otros idiomas

- "Enseñame 50 frases básicas en inglés para viajar."
- "Quiero practicar catalán para entender las señales en Barcelona."
- "Comparame los saludos formales en francés, inglés y alemán."

### Truco de oro

Pídele que adapte el nivel:

> Explícame el subjuntivo en español, nivel A2, con ejemplos cotidianos.

O:

> Quiero aprender inglés. Mi nivel es cero. Crea un plan de 30 días para mí, 15 minutos al día.`,
      tips: [
        'Pídele ejercicios: "Dame 5 frases para traducir y corrígelas".',
        "Pídele audio describiendo la pronunciación: \"¿Cómo se pronuncia 'through'?\"",
        'Usa la app móvil para practicar en cualquier lugar.',
      ],
      exercise:
        'Pídele a ChatGPT 10 frases útiles en español para ir al médico. Apréndelas y escríbelas de memoria.',
    },
    {
      id: 'gpt-08',
      title: 'Privacidad y seguridad',
      duration: '10 min',
      content: `## Cómo usar ChatGPT de forma segura

### Lo que NO debes compartir

- ❌ Número de pasaporte o DNI completo
- ❌ Número de cuenta bancaria (IBAN)
- ❌ Tarjetas de crédito
- ❌ Contraseñas de tus cuentas
- ❌ Datos médicos sensibles completos
- ❌ Dirección exacta de tu casa

### Lo que SÍ puedes compartir

- ✅ Tu nombre y correo
- ✅ Tu experiencia laboral
- ✅ Preguntas generales sobre trámites
- ✅ Textos de correos para traducir (sin datos sensibles)

### Cuidado con la información falsa

ChatGPT **puede equivocarse**. A veces inventa datos (se llama "alucinación"). Por eso:

1. Verifica siempre información importante (legal, médica, financiera).
2. Pide fuentes y enlaces oficiales.
3. Si es un trámite importante, consulta con un profesional.

### Borrar tu historial

Si quieres privacidad:

1. Ve a **Settings** (Configuración).
2. **Data controls** → desactiva "Improve the model for everyone".
3. Puedes borrar conversaciones una a una o todas desde la barra lateral.

### Cuentas para menores

- Menores de 13 años no pueden usar ChatGPT.
- De 13 a 17 necesitan permiso de padres.

> **Regla de oro:** Si no lo compartirías con un desconocido en la calle, no lo pongas en ChatGPT.`,
      tips: [
        'Crea correos distintos: uno para trámites, otro personal.',
        'Revisa tu historial de vez en cuando y borra lo sensible.',
        'Si dudas, pregunta primero "¿Es seguro compartir X contigo?".',
      ],
      exercise:
        'Revisa tus conversaciones de ChatGPT y borra cualquier dato sensible (números, contraseñas). Activa el modo privado si lo prefieres.',
    },
  ],
};

// ------------------------------------------------------------
// 2. GEMINI — Google
// ------------------------------------------------------------
const geminiCourse: AICourse = {
  id: 'gemini',
  model: 'Gemini',
  provider: 'Google',
  logo: '✨',
  color: 'from-blue-500 to-indigo-600',
  tagline: 'La IA de Google conectada a tus documentos',
  description:
    'Gemini es la IA de Google. Si ya tienes cuenta de Gmail, ¡ya tienes acceso! Se integra con Google Docs, Sheets y Drive. Es ideal para inmigrantes que usan Google.',
  freeAccess: true,
  url: 'https://gemini.google.com',
  appAvailable: true,
  level: 'beginner',
  lessons: [
    {
      id: 'gem-01',
      title: 'Acceder a Gemini con tu cuenta Google',
      duration: '6 min',
      content: `## Acceso fácil con Gmail

Gemini es la IA de Google. **Si ya tienes Gmail, ya tienes Gemini.**

### Pasos

1. Entra en **gemini.google.com**
2. Pulsa **"Iniciar sesión"**
3. Usa tu correo de Gmail y tu contraseña habituales.
4. Acepta los términos de uso.
5. ¡Listo! Ya puedes empezar a chatear.

> **Ventaja:** No necesitas crear una cuenta nueva ni dar tu teléfono si ya estás verificado en Google.

### App móvil

Descarga la app **"Gemini"** en tu móvil desde Google Play (Android) o App Store (iPhone).

### Idioma

Gemini detecta tu idioma automáticamente, pero puedes forzarlo:

> Responde siempre en español, por favor.`,
      tips: [
        'Si usas Chrome, Gemini funciona más rápido.',
        'Puedes acceder también desde la app de Google en el móvil.',
        'Gemini es gratis, pero existe Gemini Advanced de pago (no la necesitas para empezar).',
      ],
      exercise: 'Entra a gemini.google.com con tu cuenta de Gmail. Escribe "Hola" para probar.',
    },
    {
      id: 'gem-02',
      title: 'Tu primer prompt en Gemini',
      duration: '8 min',
      content: `## Cómo empezar

En la caja inferior escribe tu pregunta o solicitud, igual que en WhatsApp.

### Ejemplo práctico

> Soy de Bolivia y vivo en Madrid. Quiero encontrar trabajo como albañil. Dame 5 consejos para empezar mi búsqueda.

Gemini te dará una respuesta en español, con puntos concretos.

### Funciones especiales

Gemini tiene **3 botones importantes** en la caja de texto:

1. **🎤 Micrófono:** hablas en vez de escribir (dictado por voz).
2. **📷 Cámara:** le haces una foto a algo y le preguntas sobre ello.
3. **📎 Archivo:** subes un PDF, foto o documento y Gemini lo lee.

### Ejemplo con foto

Saca una foto a una carta oficial que no entiendes, súbela y di:

> Explícame esta carta en español sencillo.

### Ejemplo con PDF

Sube un contrato en PDF y pide:

> Resume este contrato en 5 puntos clave y dime si hay cláusulas abusivas.`,
      tips: [
        'Puedes subir varios archivos a la vez.',
        'Las fotos se borran de los servidores de Google tras un tiempo.',
        'Si hablas con acento, el dictado por voz funciona igual.',
      ],
      exercise: 'Usa el botón del micrófono para preguntar a Gemini algo en voz alta.',
    },
    {
      id: 'gem-03',
      title: 'Conexión con Gmail y Google Docs',
      duration: '12 min',
      content: `## Tu IA dentro de Google Workspace

Gemini se integra con el ecosistema Google: Docs, Sheets, Drive, Gmail.

### En Google Docs

1. Abre un documento en **docs.google.com**
2. Pulsa **"Ayúdame a escribir"** (botón con estrella).
3. Escribe: "Redacta una carta de presentación para un puesto de limpieza".
4. Gemini escribirá el texto dentro del documento.

### En Gmail

1. Pulsa **"Redactar"**.
2. Botón con estrella ✨ → "Ayúdame a escribir".
3. Escribe: "Correo a mi casero para pedir el recibo del alquiler".
4. Gemini generará el correo. Edita y envía.

### En Google Sheets

Pide fórmulas en lenguaje natural:

> Crea una fórmula para sumar todos los gastos del mes y restarlos de mis ingresos.

### En Google Drive

- Puedes pedir a Gemini: "Busca documentos sobre mi contrato de alquiler".
- Resume correos largos: "Resume los últimos correos importantes sobre mi cita del TIE".

> **Nota:** Estas funciones avanzadas requieren cuenta de Google Workspace o Gemini Advanced (de pago). La versión gratuita de Gemini web sí permite subir documentos.`,
      tips: [
        'Las funciones @docs y @gmail funcionan mejor con Gemini Advanced.',
        'Tú decides si aceptas o no el texto generado: revísalo siempre.',
        'Puedes pedir varios borradores y elegir el mejor.',
      ],
      exercise: 'Abre un Google Doc nuevo y usa Gemini para escribir una carta de presentación.',
    },
    {
      id: 'gem-04',
      title: 'Generar imágenes',
      duration: '10 min',
      content: `## Crear imágenes con Gemini

Gemini puede generar imágenes a partir de texto (usando el modelo Imagen).

### Cómo pedir una imagen

Escribe en Gemini:

> Crea una imagen de un mercado de frutas en Madrid, estilo realista, colores vivos.

En segundos tendrás 4 imágenes para elegir.

### Usos prácticos

**1. Tarjetas de presentación:**
> Diseña una imagen para una tarjeta de presentación de panadería, tonos marrones y dorados.

**2. Logotipo sencillo:**
> Crea un logo minimalista para un servicio de limpieza a domicilio, con una escoba y una casa.

**3. Material para clases:**
> Haz una imagen educativa con las partes del cuerpo humano en español, estilo dibujo animado.

**4. Invitaciones:**
> Diseña una invitación de cumpleaños para niño, tema dinosaurios, en español.

### Descargar la imagen

1. Pulsa sobre la imagen que te guste.
2. Botón **"Descargar"** (ícono de flecha abajo).
3. Se guarda como archivo PNG en tu dispositivo.

> **Importante:** No uses imágenes de personas reales sin su permiso. Y no publiques imágenes generadas por IA como si fueran fotos reales.`,
      tips: [
        'Puedes pedir variaciones: "Haz la misma pero con colores pastel".',
        'Las imágenes con texto a veces tienen errores de ortografía; revísalas.',
        'No uses imágenes de IA para engañar o estafar a nadie.',
      ],
      exercise: 'Pide a Gemini una imagen para tu negocio o proyecto. Descárgala y guárdala.',
    },
    {
      id: 'gem-05',
      title: 'Traducir y resumir documentos',
      duration: '12 min',
      content: `## Trabajar con documentos largos

Gemini puede leer PDFs, fotos y documentos y darte resúmenes y traducciones.

### Subir un documento

1. Pulsa el botón **＋** o **📎** junto a la caja de texto.
2. Selecciona un archivo PDF, Word o imagen.
3. Escribe tu solicitud.

### Ejemplos

**Resumir un contrato de alquiler:**
> (Sube el PDF) Resume este contrato en 8 puntos clave. ¿Hay cláusulas que pueda negociar?

**Traducir una nómina:**
> (Sube la nómina) Explícame cada apartado de esta nómina en español sencillo y tradúcelo al inglés.

**Entender una carta del colegio:**
> (Sube la foto de la carta) Mi hija trajo esta carta del colegio. ¿Qué tengo que hacer?

**Estudiar documentos legales:**
> (Sube el PDF) Resume la ley de extranjería en 10 puntos importantes para un inmigrante recién llegado.

### Límites

- Documentos muy grandes (>50 páginas) pueden dar error.
- No subas documentos con datos muy sensibles (pasaporte, cuenta bancaria).
- Para traducciones oficiales (juradas) necesitas un traductor certificado.

### Truco

Pídele a Gemini que compare documentos:

> Compara estos dos contratos de alquiler y dime las diferencias importantes.`,
      tips: [
        'Puedes subir varias fotos a la vez (de un mismo documento).',
        'Si el documento es confuso, pide "explícamelo como si tuviera 10 años".',
        'Guarda los resúmenes en un Google Doc para tu expediente.',
      ],
      exercise: 'Sube un documento (PDF o foto) a Gemini y pídele un resumen en 5 puntos.',
    },
    {
      id: 'gem-06',
      title: 'Investigar derechos y trámites',
      duration: '15 min',
      content: `## Gemini conectado a la web

A diferencia de otros modelos, Gemini accede a internet en tiempo real para darte información actualizada.

### Preguntas útiles

**1. Trámites de extranjería:**
> ¿Cómo pido cita previa en la oficina de extranjería (Sede Electrónica)? Dame el enlace oficial.

**2. Empadronamiento:**
> ¿Qué documentos necesito para empadronarme en Madrid? ¿Es gratis?

**3. Sanidad:**
> Soy inmigrante sin papeles. ¿Cómo saco la tarjeta sanitaria en Cataluña?

**4. Ayudas sociales:**
> ¿Qué ayudas económicas hay para familias con hijos en la Comunidad de Madrid?

**5. Renta:**
> ¿Tengo que hacer la declaración de la renta? Trabajo por cuenta ajena y cobro 1.400€ al mes.

### Pedir enlaces y fuentes

Gemini te da enlaces clicables. **Púlsalos para verificar.**

> Dame la respuesta y enlaces a fuentes oficiales (.gob.es, .es, organismos públicos).

### Comparar comunidades

España tiene 17 comunidades autónomas con normas distintas:

> Compara los requisitos para arraigo social en Madrid y en Cataluña.

### Pedir paso a paso

Si un trámite es complicado, pide instrucciones detalladas:

> Explícame paso a paso cómo renovar mi permiso de residencia. Incluye qué documentos necesito, dónde entregarlos y cuánto tardan.`,
      tips: [
        'Pide siempre el enlace oficial: ".gob.es" o "sede.gob.es".',
        'Si la info es de hace más de 6 meses, pídela actualizada.',
        'Confirma con la administración antes de actuar.',
      ],
      exercise: 'Pregunta a Gemini cómo pedir cita previa para el TIE en tu ciudad. Toma nota de los enlaces.',
    },
    {
      id: 'gem-07',
      title: 'Aprender español e inglés',
      duration: '10 min',
      content: `## Tu tutor de idiomas

Gemini es excelente para aprender idiomas porque puede corregir, explicar y practicar contigo.

### Aprender español (para principiantes)

**Vocabulario por contextos:**
> Dame 30 palabras y frases en español para ir a la frutería, con ejemplos.

**Conversaciones simuladas:**
> Simula una conversación en una panadería en Madrid. Tú eres el panadero, yo el cliente. Corrígeme si me equivoco.

**Verbos difíciles:**
> Explícame la diferencia entre "ser" y "estar" con 10 ejemplos prácticos cada uno.

### Aprender inglés

**Para principiantes:**
> Crea un plan de 30 días para aprender inglés básico, 15 minutos al día.

**Para entrevistas:**
> Dame 20 preguntas típicas en entrevistas de trabajo en inglés y respuestas modelo.

**Para viajar:**
> Dame 50 frases útiles en inglés para viajar al aeropuerto.

### Practicar catalán, euskera o gallego

Si vives en Cataluña, País Vasco o Galicia:

> Dame 20 frases básicas en catalán para entender señales y carteles en Barcelona.

### Pronunciación

Gemini puede describir cómo pronunciar:

> ¿Cómo se pronuncia "Thanks"? Dame una aproximación en español.

> **Consejo:** Combina Gemini con la app gratuita Duolingo para mejores resultados.`,
      tips: [
        'Pídele ejercicios: "Ponme a prueba con 5 frases para traducir".',
        'Pídele audios en Google Translate para practicar la escucha.',
        'Aprende 1 frase nueva cada día y anótala en una libreta.',
      ],
      exercise: 'Pide a Gemini 10 frases en español útiles para la entrevista de trabajo. Apréndelas.',
    },
    {
      id: 'gem-08',
      title: 'Funciones de voz y consejos finales',
      duration: '10 min',
      content: `## Hablar con Gemini en voz alta

Gemini tiene funciones de voz muy útiles si no te sientes cómodo escribiendo.

### Dictado por voz

1. Pulsa el **micrófono** 🎤 en la caja de texto.
2. Habla con naturalidad.
3. Gemini transcribe lo que dices.

### Leer respuestas en voz alta

- Pulsa el **altavoz** 🔊 sobre la respuesta.
- Gemini leerá el texto en voz alta.

> Útil si tienes problemas de visión o prefieres escuchar.

### Conversación fluida (Gemini Live)

En la app móvil, puedes mantener **conversaciones reales** con Gemini:

1. Abre la app.
2. Pulsa el ícono de ondas 🔊.
3. Habla con Gemini como si fuera una persona.

Puedes interrumpir, cambiar de tema, pedir aclaraciones.

## 10 consejos finales

1. **Sé específico**: cuanta más información, mejor.
2. **Pide ejemplos**: "Dame ejemplos" o "Muéstramelo con un caso real".
3. **Pide paso a paso**: "Explícalo paso a paso".
4. **Corrige el tono**: "más formal", "más amable", "más corto".
5. **Pide fuentes**: para datos importantes.
6. **Itera**: si la primera respuesta no te gusta, sigue pidiendo.
7. **Compara**: pide varias versiones y elige.
8. **Combina con Google**: Docs, Sheets, Drive.
9. **Guarda lo bueno**: copia y pega en un documento.
10. **Verifica siempre** lo importante con fuentes oficiales.`,
      tips: [
        'SiGemini no entiende, repítele en otras palabras.',
        'Puedes pedir "hazlo más simple" cuantas veces necesites.',
        'Comparte conversaciones útiles con tu familia.',
      ],
      exercise: 'Usa Gemini Live (o el dictado) para tener una conversación hablada en español.',
    },
  ],
};

// ------------------------------------------------------------
// 3. COPILOT — Microsoft
// ------------------------------------------------------------
const copilotCourse: AICourse = {
  id: 'copilot',
  model: 'Copilot',
  provider: 'Microsoft',
  logo: '🚀',
  color: 'from-sky-500 to-blue-700',
  tagline: 'La IA de Microsoft integrada en Windows y Office',
  description:
    'Microsoft Copilot es la IA gratuita de Microsoft. Está integrada en Windows 11, Edge, Word y Excel. Si usas Windows, ya la tienes. Es ideal para_productividad diaria.',
  freeAccess: true,
  url: 'https://copilot.microsoft.com',
  appAvailable: true,
  level: 'beginner',
  lessons: [
    {
      id: 'cop-01',
      title: 'Activar Copilot en Windows y navegador',
      duration: '8 min',
      content: `## Dónde encontrar Copilot

Microsoft Copilot está en muchos sitios. **Si usas Windows 11, ya lo tienes.**

### Opción 1: En Windows 11

1. Pulsa la tecla **Windows + C** en tu teclado.
2. Se abre el panel de Copilot a la derecha.
3. O búscalo en el menú Inicio: escribe "Copilot".

### Opción 2: En el navegador Edge

1. Abre **Microsoft Edge**.
2. Arriba a la derecha, pulsa el ícono **Copilot** (un círculo con colores).
3. Se abre un panel lateral.

### Opción 3: En la web

1. Entra en **copilot.microsoft.com**
2. Inicia sesión con tu cuenta Microsoft (Hotmail, Outlook, Xbox…).

### Opción 4: App móvil

Descarga **"Microsoft Copilot"** en Google Play o App Store.

> **Ventaja:** No necesitas suscripción de pago. La versión gratuita usa GPT-4 Turbo, muy potente.`,
      tips: [
        'Si no ves Copilot en Windows, actualiza tu sistema operativo.',
        'Puedes usar Copilot en Chrome o Firefox, pero funciona mejor en Edge.',
        'La cuenta Microsoft es gratuita: créala en outlook.com si no tienes.',
      ],
      exercise: 'Abre Copilot en tu Windows o navegador. Escribe "Hola" para probar.',
    },
    {
      id: 'cop-02',
      title: 'Primer prompt y modos de conversación',
      duration: '10 min',
      content: `## Cómo hablar con Copilot

Copilot funciona igual que ChatGPT o Gemini: escribes, esperas la respuesta, sigues.

### Modos de conversación

Copilot tiene **3 estilos** (en la parte superior):

- **Balanced (Equilibrado):** respuestas normales. Ideal para empezar.
- **Creative (Creativo):** para escribir historias, poemas, ideas.
- **Precise (Preciso):** para datos, fechas, definiciones.

### Ejemplo de primer prompt

> Soy de Perú y quiero alquilar un piso en Valencia. ¿Qué barrios son más económicos y seguros para familias?

### Botones útiles

- **🎤 Micrófono:** dictado por voz.
- **📷 Cámara:** foto y pregunta sobre ella.
- **📎 Adjuntar:** sube archivos (PDF, imágenes, Excel).
- **🖌️ Diseño:** genera imágenes.

### Preguntas sugeridas

Copilot te muestra ejemplos debajo de la caja. Puedes pulsar uno para usarlo.

> **Truco:** Copilot siempre muestra **fuentes** (enlaces) debajo de la respuesta. ¡Úsalas para verificar!`,
      tips: [
        'Cambia de modo según lo que necesites: Creative para escribir, Precise para datos.',
        'Si la respuesta es muy larga, pide "más corto".',
        'Copia con el botón de portapapeles para pegar en Word.',
      ],
      exercise: 'Cambia al modo Precise y pregunta cuál es el salario mínimo en España. Verifica el enlace.',
    },
    {
      id: 'cop-03',
      title: 'Copilot dentro de Word y Excel',
      duration: '15 min',
      content: `## IA dentro de Office

Copilot está **integrado** en Microsoft 365 (Word, Excel, PowerPoint, Outlook). Esto te ahorra muchísimo tiempo.

> **Nota:** Para tenerlo dentro de Word/Excel necesitas suscripción Microsoft 365 Copilot (de pago). La versión web gratuita de Copilot (copilot.microsoft.com) sí es gratis.

### En Word (con Copilot)

1. Abre Word, pulsa el icono Copilot ✨.
2. Escribe: "Crea un currículum para un puesto de administrativo con experiencia en atención al cliente".
3. Copilot generará el documento completo.
4. Puedes pedir: "Hazlo más corto" o "Añade una sección de idiomas".

### En Excel (con Copilot)

Pídele fórmulas en lenguaje natural:

> Tengo una tabla con gastos en la columna B. Crea una fórmula para sumar todos los gastos y mostrarlos en la celda D1.

También puede:

- Crear gráficos automáticamente.
- Analizar tendencias.
- Resaltar datos importantes.

### En PowerPoint

> Crea una presentación de 8 diapositivas sobre "El ciclo del agua" para niños de primaria.

Copilot genera las diapositivas con texto e imágenes.

### En Outlook

> Redacta un correo formal a mi jefe pidiendo un día de libre por motivo médico.

### Alternativa gratuita

Si no tienes Microsoft 365 Copilot, usa la web **copilot.microsoft.com** y copia el texto a Word/Excel manualmente.`,
      tips: [
        'Las funciones avanzadas requieren Microsoft 365 Copilot.',
        'Puedes usar la versión web gratuita para generar textos y pegarlos en Office.',
        'Google Workspace (Docs, Sheets) tiene Gemini gratis para funciones similares.',
      ],
      exercise: 'Genera un currículum en la web de Copilot y pégalo en Word. Ajusta el formato.',
    },
    {
      id: 'cop-04',
      title: 'Investigar en internet con fuentes',
      duration: '12 min',
      content: `## Copilot como buscador inteligente

Copilot combina la conversación con búsquedas en internet en tiempo real. **Te da respuestas con enlaces verificables.**

### Ejemplos prácticos

**1. Trámites oficiales:**
> ¿Cómo solicito la cita previa para extranjería? Dame el enlace oficial del Ministerio.

**2. Comparar productos:**
> Compara los mejores móviles baratos en España por menos de 200€. Con enlaces.

**3. Investigar empresas antes de una entrevista:**
> Información sobre la empresa "El Corte Inglés": qué hace, número de empleados, valores.

**4. Derechos del consumidor:**
> Compré un teléfono hace 10 días y no funciona. ¿Tengo derecho a devolución? Cita la ley.

**5. Cultura española:**
> ¿Cuáles son las festividades nacionales en España? Dame la lista oficial.

### Por qué es mejor que Google

- No abres 10 pestañas: Copilot lee por ti y resume.
- Te da **fuentes** (citas) debajo de cada respuesta.
- Puedes pedir **aclaraciones**: "Profundiza en el punto 2".
- Recuerda la conversación: "¿Y en Madrid, dónde exactamente?".

### Pídele la fecha

> ¿Cuál es la fecha límite para la declaración de la renta 2024? Dame el enlace oficial de la Agencia Tributaria.

Copilot responde con fechas actualizadas.`,
      tips: [
        'Pulsa siempre las fuentes para verificar.',
        'Pregunta "¿Hay alguna novedad reciente?" para información actual.',
        'Compara respuestas de Copilot y Perplexity para temas importantes.',
      ],
      exercise: 'Pregunta a Copilot cómo empadronarte en tu ciudad. Toma nota de los enlaces oficiales.',
    },
    {
      id: 'cop-05',
      title: 'Crear imágenes con Copilot',
      duration: '10 min',
      content: `## Generar imágenes (DALL·E 3)

Copilot incluye **Image Creator (Diseñador)** de Microsoft, basado en DALL·E 3. Es gratis.

### Cómo generar imágenes

1. Entra en **copilot.microsoft.com/images/create** o pulsa "Diseño" en Copilot.
2. Inicia sesión con tu cuenta Microsoft.
3. Escribe una descripción detallada.

### Ejemplos prácticos

**Logotipo para tu negocio:**
> Un logo para una peluquería llamada "Belleza Latina", tonos rosados y dorados, estilo moderno y elegante.

**Tarjeta de presentación:**
> Diseña una tarjeta de presentación para electricista, fondo azul marino, herramientas eléctricas como ícono.

**Material educativo:**
> Ilustración de las partes del cuerpo humano con etiquetas en español, estilo libro de texto.

**Invitación:**
> Invitación de boda elegante, flores blancas y doradas, texto en español "Nos casamos".

### Consejos para mejores imágenes

- **Sé específico**: colores, estilo, materiales, iluminación.
- **Indica el estilo**: "fotografía realista", "dibujo animado", "acuarela".
- **Añade idioma del texto**: "con el texto en español 'Bienvenido'".

### Descargar y editar

- Pulsa sobre la imagen para verla en grande.
- Botón **Descargar** para guardarla.
- Botón **Editar** para ajustar tamaño o quitar fondo (Designer de Microsoft).

> **Límites:** 15 imágenes rápidas al día gratis. Después son más lentas pero siguen siendo gratis.`,
      tips: [
        'Las imágenes a veces tienen texto con errores; revisa siempre.',
        'No uses imágenes de personas reales sin su permiso.',
        'Para textos largos, usa Canva combinado con Copilot.',
      ],
      exercise: 'Genera un logotipo para tu negocio o proyecto personal. Descárgalo.',
    },
    {
      id: 'cop-06',
      title: 'Resumir PDFs y páginas web',
      duration: '12 min',
      content: `## Trabajar con documentos

Copilot puede leer PDFs, páginas web y archivos, y darte resúmenes útiles.

### Resumir una página web

1. Abre Microsoft Edge.
2. Abre el artículo o página que quieres resumir.
3. Pulsa el icono Copilot (arriba derecha).
4. Escribe: **"Resume esta página"**.

Copilot dará un resumen en 5 puntos.

### Subir un PDF

1. En copilot.microsoft.com, pulsa el icono **＋** o 📎.
2. Selecciona tu PDF.
3. Escribe tu pregunta.

**Ejemplos:**

- (Contrato de alquiler) "Resume este contrato en 8 puntos clave y dime si hay cláusulas abusivas."
- (Nómina) "Explícame cada apartado de esta nómina."
- (Carta del colegio) "¿Qué tengo que hacer según esta carta?"
- (Ley) "Resume las partes más importantes para un inmigrante recién llegado."

### Resumir correos largos

En Outlook (con Copilot):

> Resume este hilo de correos y dime qué se me pide.

### Tablas y datos

Puedes subir un Excel y pedir:

> (Archivo Excel) Analiza estos datos y dime cuál fue el mes con más gastos.

### Limitaciones

- Tamaño máximo: 50 MB por archivo.
- No subas documentos muy sensibles (datos bancarios completos).
- Para traducciones oficiales, usa un traductor jurado.`,
      tips: [
        'Puedes subir varios archivos en la misma conversación.',
        'Pide "explicación para alguien que no conoce el tema" para hacerlo más simple.',
        'Guarda los resúmenes en Word o OneNote.',
      ],
      exercise: 'Sube un PDF (un contrato, una nómina o una carta) y pide a Copilot que lo resuma.',
    },
    {
      id: 'cop-07',
      title: 'Escribir correos y cartas',
      duration: '10 min',
      content: `## Redactar correos y cartas con Copilot

Copilot es excelente para escribir textos formales en español, sobre todo si no dominas el idioma.

### Ejemplos prácticos

**1. Al casero:**
> Escribe un correo a mi casero para pedirle que arregle el agua caliente. Tono formal pero amable. Firma con "Atentamente, [mi nombre]".

**2. Carta de presentación para trabajo:**
> Redacta una carta de presentación para un puesto de camarero en un restaurante de Barcelona. Tengo 4 años de experiencia y disponibilidad inmediata.

**3. Justificar ausencia:**
> Escribe un correo al colegio de mi hija para justificar su ausencia de ayer por motivos médicos.

**4. Pedir cita:**
> Redacta un correo para pedir cita en el centro de salud, motivo: revisión médica general.

**5. Reclamación:**
> Escribir una carta de reclamación a una tienda por un producto defectuoso. Tono firme pero respetuoso, citando mis derechos como consumidor.

### Tonos útiles

Puedes pedir:

- "Tono formal" (para trámites)
- "Tono amable" (para conocidos)
- "Tono urgente" (para emergencias)
- "Tono neutro" (general)

### Traducir respuestas

Si recibes un correo que no entiendes, pega el texto y pide:

> Traduce este correo del inglés al español y dime qué tengo que responder.

### Plantillas guardadas

Crea un documento Word con tus plantillas favoritas y reutilízalas cuando necesites.`,
      tips: [
        'Pide siempre "menos de 100 palabras" si quieres algo corto.',
        'Revisa el correo antes de enviarlo: ajusta los detalles personales.',
        'Guarda las plantillas que más uses en OneDrive o en tu móvil.',
      ],
      exercise: 'Pide a Copilot un correo para pedir cita médica. Cópialo y guárdalo.',
    },
    {
      id: 'cop-08',
      title: 'Trucos avanzados y privacidad',
      duration: '12 min',
      content: `## Trucos para sacarle provecho

### 1. Pídele que actúe como experto

> Actúa como un abogado laboralista español. Mi jefe no me paga las horas extras. ¿Qué puedo hacer?

### 2. Pide ejemplos y casos

> Dame 3 ejemplos de cómo negociar el sueldo en una entrevista en España.

### 3. Tablas y comparativas

> Hazme una tabla comparando los bancos más baratos en España para abrir cuenta siendo inmigrante. Columnas: comisiones, requisitos, ventajas.

### 4. Listas y pasos

> Dame un checklist (lista) de documentos que necesito para renovar mi permiso de residencia.

### 5. Resume conversaciones largas

> Resume nuestra conversación en 5 puntos clave.

## Privacidad

### Lo que NO compartas

- ❌ Número de pasaporte o DNI completo
- ❌ IBAN o cuentas bancarias
- ❌ Contraseñas
- ❌ Datos médicos completos

### Configuración

1. Entra en **account.microsoft.com/privacy**.
2. Revisa tu historial de actividad.
3. Puedes borrar conversaciones antiguas.

### Copilot Commercial Data Protection

Si tienes cuenta profesional/educativa de Microsoft, **Copilot no guarda tus datos** para entrenar modelos. Es la opción más privada.

> **Recomendación:** Usa Copilot para tareas diarias, pero nunca para datos muy sensibles. Para esos temas, acude a un profesional de confianza.`,
      tips: [
        'Pídele a Copilot que "actúe como experto" para respuestas más profundas.',
        'Revisa tu historial de Microsoft y borra datos sensibles.',
        'Compara con ChatGPT y Gemini para temas muy importantes.',
      ],
      exercise: 'Pídele a Copilot que actúe como abogado laboralista y resuelve una duda sobre tu trabajo.',
    },
  ],
};

// ------------------------------------------------------------
// 4. CLAUDE — Anthropic
// ------------------------------------------------------------
const claudeCourse: AICourse = {
  id: 'claude',
  model: 'Claude',
  provider: 'Anthropic',
  logo: '🧠',
  color: 'from-orange-500 to-amber-600',
  tagline: 'La IA para textos largos y análisis profundo',
  description:
    'Claude es la IA de Anthropic. Destaca en análisis de documentos largos, escritura cuidada y razonamiento. Ideal para estudiar, escribir y entender contratos.',
  freeAccess: true,
  url: 'https://claude.ai',
  appAvailable: true,
  level: 'intermediate',
  lessons: [
    {
      id: 'cla-01',
      title: 'Crear tu cuenta en Claude',
      duration: '8 min',
      content: `## Cómo registrarse en Claude.ai

Claude es una IA creada por Anthropic. Es gratuita con límites de uso diario.

### Pasos

1. Entra en **claude.ai**
2. Pulsa **"Sign up"** (Registrarse).
3. Introduce tu correo y una contraseña, o usa tu cuenta de Google.
4. Verifica tu correo (código de 6 dígitos).
5. Introduce tu número de teléfono para verificar que eres humano.
6. Acepta los términos.

> **Importante:** Claude está disponible en España y la mayoría de países europeos. Si no entra, prueba con una VPN o usa otro proveedor.

### App móvil

Descarga **"Claude"** desde App Store (iPhone) o Google Play (Android).

### Idiomas

Claude entiende español perfectamente, y también catalán, euskera, gallego, inglés, francés, árabe, chino y muchos más.

### Límites gratuitos

- Unas **30-50 mensajes** cada 8 horas (varía según demanda).
- Si se agotan, espera unas horas y vuelve a intentarlo.
- Versión Pro (de pago): 20$/mes, mensajes ilimitados.`,
      tips: [
        'Si no recibes el código SMS, prueba más tarde o con otro número.',
        'Claude es excelente en español; no necesitas traducir.',
        'Si llegas al límite gratuito, usa ChatGPT o Gemini mientras esperas.',
      ],
      exercise: 'Crea tu cuenta en claude.ai y envía tu primer mensaje: "Hola, ¿qué puedes hacer por mí?".',
    },
    {
      id: 'cla-02',
      title: 'Primer prompt: conversaciones profundas',
      duration: '10 min',
      content: `## Cómo empezar con Claude

Claude se distingue por sus **respuestas largas y bien estructuradas**. Es ideal cuando necesitas pensar con calma.

### Ejemplo de primer prompt

> Soy de Marruecos y llevo 3 meses en Barcelona. No consigo trabajo en mi sector (soy ingeniero). Ayúdame a pensar opciones: ¿qué puedo hacer mientras tanto? Dame un plan a 30, 60 y 90 días.

Claude te dará un plan estructurado, con secciones claras y consejos prácticos.

### Partes de la pantalla

- **Caja de texto** grande en el centro.
- **"New chat"** arriba a la izquierda.
- **Barra lateral** con conversaciones anteriores.
- **Botón 📎** para adjuntar archivos (PDFs, fotos).

### Truco: pide pensamiento detallado

Claude es excelente cuando pides:

- "Analiza esto paso a paso"
- "Dame razones a favor y en contra"
- "Compara estas opciones en una tabla"

### Ejemplo

> Tengo dos ofertas de trabajo: una de 1.400€ en Madrid y otra de 1.600€ en Valencia. Vivir en Madrid cuesta 1.000€/mes, en Valencia 800€. Ayúdame a decidir con análisis detallado.

Claude hará un análisis financiero, estilo de vida, oportunidades laborales, etc.`,
      tips: [
        'Claude es más reflexivo: no esperes respuestas de 1 línea.',
        'Si necesitas algo corto, pídelo: "Respuesta en 3 frases".',
        'Claude recuerda toda tu conversación, así que puedes alargar el tema.',
      ],
      exercise: 'Pide a Claude que te ayude a decidir entre 2 opciones importantes (vivienda, trabajo, estudios).',
    },
    {
      id: 'cla-03',
      title: 'Analizar contratos y documentos legales',
      duration: '15 min',
      content: `## La especialidad de Claude: documentos largos

Claude puede analizar documentos de **hasta 200 páginas**. Es la mejor IA para entender contratos, leyes y documentos complejos.

### Subir un documento

1. Pulsa el icono **📎** o **＋** en la caja de texto.
2. Selecciona tu PDF, Word o foto.
3. Escribe tu pregunta.

### Ejemplos prácticos

**1. Contrato de alquiler:**
> (Sube el contrato) Resume este contrato en 10 puntos clave. Identifica cláusulas que puedan ser abusivas según la ley española de arrendamientos urbanos (LAU).

**2. Contrato de trabajo:**
> (Sube el contrato) Explícame cada cláusula. ¿Hay algo que deba negociar? ¿Está dentro de lo legal según el Estatuto de los Trabajadores?

**3. Carta de despido:**
> (Sube la carta) Analiza esta carta de despido. ¿Es procedente? ¿Tengo derecho a indemnización? ¿Qué pasos debo seguir?

**4. Documento de extranjería:**
> (Sube la resolución) ¿Qué significa esta resolución de extranjería? ¿Es positiva o negativa? ¿Qué tengo que hacer ahora?

**5. Sentencia judicial:**
> (Sube la sentencia) Resume esta sentencia en lenguaje sencillo. ¿Quién ganó? ¿Cuáles son los siguientes pasos?

### Pedir aclaraciones

- "Explícame la cláusula 5 con un ejemplo"
- "¿Qué pasa si incumplo este punto?"
- "¿Puedo negociar algo aquí?"

> **Aviso:** Claude es muy bueno, pero **no es abogado**. Para temas legales serios, consulta con un abogado o con los servicios jurídicos de ONGs (CEAR, ACCEM, Cruz Roja).`,
      tips: [
        'Puedes subir varios PDFs en la misma conversación y compararlos.',
        'Pide siempre "en lenguaje sencillo" si algo no entiendes.',
        'Claude te da los artículos legales relevantes para que un abogado los revise.',
      ],
      exercise: 'Sube un documento largo (contrato, ley, nómina) a Claude y pídele un resumen en 5 puntos.',
    },
    {
      id: 'cla-04',
      title: 'Escribir CV y cartas de presentación cuidadas',
      duration: '15 min',
      content: `## Redacción profesional

Claude destaca por su escritura elegante y profesional. Es ideal para CVs y cartas que necesiten destacar.

### Crear un CV

> Voy a crear mi currículum. Mis datos:
> - Nombre: [tu nombre]
> - Experiencia: 6 años como enfermera en Perú
> - Formación: Título de enfermería homologado en España
> - Idiomas: español nativo, inglés B1, quechua nativo
> - Objetivo: trabajar en hospital público en Madrid
>
> Redacta un CV profesional en formato Europass, en español.

### Carta de presentación

> Redacta una carta de presentación para un puesto de enfermera en el Hospital Universitario 12 de Octubre. Quiero destacar mi experiencia, mi homologación y mi motivación.

### Pedir versiones

Puedes pedir:

- "Haz 3 versiones distintas y dime cuál es mejor para cada caso."
- "Hazlo más corto, una sola página."
- "Tradúcelo al inglés con tono profesional."

### Verbos de acción

> Dame 15 verbos de acción en español para destacar experiencia como enfermera, con ejemplo en cada uno.

### Adaptar a una oferta concreta

Pega la oferta de trabajo y pide:

> (Pega la oferta) Adapta mi CV para que destaque exactamente lo que busca esta empresa. Aquí está mi CV actual: [pega tu CV].

### Entrevistas simuladas

Claude también puede hacer entrevistas:

> Voy a una entrevista para un puesto de enfermera en Madrid. Simula la entrevista, hazme 10 preguntas típicas, y después dame feedback de mis respuestas.`,
      tips: [
        'Claude escribe mejor que otros modelos; aprovéchalo para textos formales.',
        'Pídele que sea "breve pero impactante".',
        'Guarda varias versiones para distintos tipos de empresas.',
      ],
      exercise: 'Pide a Claude que redacte tu CV en formato Europass. Guarda el resultado.',
    },
    {
      id: 'cla-05',
      title: 'Aprender español con explicaciones detalladas',
      duration: '12 min',
      content: `## Claude como tutor personal

Claude explica conceptos con profundidad y paciencia. Es excelente para aprender idiomas y cualquier tema.

### Aprender español

**Explicaciones profundas:**
> Explícame la diferencia entre "por" y "para" con 20 ejemplos prácticos cada uno.

**Verbos irregulares:**
> Dame una lista de los 30 verbos irregulares más usados en español, conjugados en presente, pasado y futuro. Con ejemplos.

**Corrección de errores:**
> Voy a escribir frases en español. Corrígelas y explícame el error y cómo evitarlo.

### Practicar conversación

> Hagamos una conversación simulada en español. Tú eres el funcionario del ayuntamiento, yo soy un inmigrante que quiere empadronarse. Empieza tú. Corrígeme si me equivoco.

### Lectura comprensiva

> Dame un texto corto en español nivel B1 sobre la historia de Madrid. Después, hazme 5 preguntas de comprensión.

### Preparar el examen DELE

> Quiero prepararme para el DELE B1. Dame un plan de estudio de 60 días, 30 minutos al día, con ejercicios prácticos.

### Aprender otros idiomas

- "Enseñame inglés básico con ejercicios prácticos."
- "Quiero aprender catalán: dame 100 frases útiles para Barcelona."
- "Comparame el uso del subjuntivo en español y en francés."

### Para los niños

> Mi hija de 8 años está aprendiendo español. Crea un cuento corto en español nivel A1 sobre un gato que viaja a Madrid, con vocabulario básico y preguntas al final.`,
      tips: [
        'Claude explica conceptos con ejemplos; aprovéchalo.',
        'Pídele "explicación para nivel A1/B1/C1" según tu nivel.',
        'Para pronunciación, combina con audios de Google Translate.',
      ],
      exercise: 'Pídele a Claude que te explique un tema gramatical del español y te ponga un ejercicio.',
    },
    {
      id: 'cla-06',
      title: 'Traducir y comparar textos',
      duration: '10 min',
      content: `## Traducción de calidad

Claude traduce con matices culturales y literarios que otras IAs no captan.

### Tipos de traducción

**1. Documento legal:**
> (Pega el texto) Traduce este contrato del español al inglés con tono legal formal, manteniendo términos jurídicos clave en español entre paréntesis.

**2. Carta personal:**
> (Pega el texto) Traduce esta carta al español. Es para mi familia en Marruecos: hazla natural en árabe dialectal marroquí.

**3. Documento médico:**
> (Pega el texto) Traduce este informe médico al inglés, manteniendo los términos técnicos exactos.

### Comparar traducciones

Pega una traducción automática y pídele a Claude que la revise:

> (Pega el texto traducido) Revisa esta traducción del español al inglés. ¿Es natural? ¿Hay errores? Dame una versión mejorada.

### Múltiples idiomas

> ¿Cómo se dice "Necesito pedir cita para el médico" en inglés, francés, alemán, árabe y chino? Dame la pronunciación aproximada en español.

### Resumen en otro idioma

> Resume este artículo en español (3 párrafos) y luego tradúcelo al inglés.

### Matices culturales

> Estoy escribiendo un correo formal a una empresa en Alemania. ¿Qué fórmulas de cortesía debo usar? Dame 3 ejemplos en alemán y su traducción al español.`,
      tips: [
        'Claude es mejor que otros modelos en textos literarios y matizados.',
        'Pega el texto completo, no lo cortes.',
        'Para traducciones juradas, busca un traductor certificado.',
      ],
      exercise: 'Pega un texto en tu idioma y pídele a Claude que lo traduzca al español formal.',
    },
    {
      id: 'cla-07',
      title: 'Consejos y privacidad',
      duration: '10 min',
      content: `## Trucos avanzados

### 1. Pídele que actúe como experto

> Actúa como un asistente social español con 20 años de experiencia. Mi situación es: [describe tu caso]. ¿Qué pasos debo seguir?

### 2. Pídele listas detalladas

> Dame un checklist completo de documentos para solicitar la nacionalidad española por residencia. Organízalo por categorías.

### 3. Tablas comparativas

> Compara los bancos españoles para abrir cuenta siendo inmigrante recién llegado: comisiones, requisitos, servicios. En tabla.

### 4. Análisis de opciones

> Tengo estas 3 opciones de vivienda: [descripción]. Analiza cada una: precio, ubicación, ventajas, desventajas. Dame una recomendación.

### 5. Pensamiento paso a paso

> Piensa paso a paso antes de responder. ¿Cómo puedo ahorrar 100€ al mes con un sueldo de 1.200€?

## Privacidad

### Lo que NO compartas con Claude

- ❌ Datos bancarios completos
- ❌ Número de pasaporte
- ❌ Contraseñas
- ❌ Historial médico completo

### Configuración de privacidad

1. Entra en **Settings** (Configuración).
2. **Account** → revisa tu historial.
3. **Data Controls** → desactiva el entrenamiento del modelo con tus datos.

### Borrar conversaciones

- Pulsa los 3 puntos junto a una conversación.
- Selecciona **"Delete"**.

> **Consejo final:** Claude es muy bueno, pero no es infalible. Compara respuestas importantes con fuentes oficiales y otros modelos.`,
      tips: [
        'Pídele siempre "piensa paso a paso" para problemas complejos.',
        'Revisa tu configuración de privacidad al empezar.',
        'Combina Claude (texto largo) con ChatGPT (rapidez) y Gemini (Google).',
      ],
      exercise: 'Pídele a Claude que actúe como asistente social y analice tu situación actual.',
    },
  ],
};

// ------------------------------------------------------------
// 5. DEEPSEEK
// ------------------------------------------------------------
const deepseekCourse: AICourse = {
  id: 'deepseek',
  model: 'DeepSeek',
  provider: 'DeepSeek',
  logo: '🐋',
  color: 'from-cyan-500 to-blue-700',
  tagline: 'La IA china potente, gratuita y sin límites',
  description:
    'DeepSeek es una IA china potente y gratuita. Es excelente para matemáticas, programación y razonamiento lógico. No requiere tarjeta de crédito y es muy accesible.',
  freeAccess: true,
  url: 'https://chat.deepseek.com',
  appAvailable: true,
  level: 'intermediate',
  lessons: [
    {
      id: 'dsk-01',
      title: 'Crear cuenta en DeepSeek',
      duration: '6 min',
      content: `## Registro fácil

DeepSeek es gratuita y no pide tarjeta de crédito.

### Pasos

1. Entra en **chat.deepseek.com**
2. Pulsa **"Sign up"** o **"Log in"**.
3. Regístrate con:
   - Correo electrónico + contraseña, o
   - Cuenta de Google ("Continue with Google")
4. Verifica tu correo con el código enviado.

> **Ventaja:** No pide número de teléfono. Más rápido que otras IAs.

### App móvil

Disponible en Google Play y App Store como **"DeepSeek"**.

### Idioma de la interfaz

La interfaz puede estar en inglés o español. Puedes cambiarla en **Settings → Language**.

### Modelos disponibles

- **DeepSeek-V3:** modelo general, rápido y gratuito.
- **DeepSeek-R1:** modelo de razonamiento profundo (piensa antes de responder). Más lento pero mejor para problemas complejos.

> **Consejo:** Para tareas diarias usa V3. Para matemáticas, lógica o análisis profundo, usa R1.`,
      tips: [
        'No necesita tarjeta de crédito para registrarse.',
        'Si la web va lenta, prueba en horas de menor uso (mañana en España).',
        'La app móvil suele ser más estable que la web.',
      ],
      exercise: 'Crea tu cuenta en DeepSeek y prueba enviar "Hola, ¿qué puedes hacer?".',
    },
    {
      id: 'dsk-02',
      title: 'Primer prompt y modos de razonamiento',
      duration: '10 min',
      content: `## Cómo usar DeepSeek

DeepSeek funciona como otros chats de IA, pero tiene **2 modos especiales**.

### Botón "DeepThink" (R1)

Cuando lo activas, DeepSeek **piensa en voz alta** antes de responder. Verás sus razonamientos paso a paso.

- Ideal para: matemáticas, lógica, problemas complejos.
- Más lento pero más preciso.

### Botón "Search" (Búsqueda web)

Activa la búsqueda en internet en tiempo real.

- Ideal para: noticias, datos actualizados, trámites oficiales.

### Ejemplo con DeepThink

> Tengo 1.500€ al mes. Mis gastos son: alquiler 700€, comida 300€, transporte 80€, facturas 150€. ¿Cuánto puedo ahorrar al mes? ¿Y al año? ¿Qué pasaría si ahorro ese dinero al 3% de interés durante 5 años?

DeepSeek pensará paso a paso y te dará el cálculo completo.

### Ejemplo con Search

> ¿Cuál es la última normativa española sobre arraigo social? Dame enlaces oficiales.

DeepSeek buscará en internet y te dará respuestas con fuentes.

### Truco: pide explicaciones detalladas

> Explícame paso a paso, mostrando tus razonamientos, cómo calcular el IRPF de un sueldo de 1.500€ mensuales en España.`,
      tips: [
        'Usa DeepThink para problemas matemáticos y de decisión.',
        'Usa Search para información actualizada.',
        'Si la respuesta es muy larga, pide "en resumen".',
      ],
      exercise: 'Activa DeepThink y pídele un cálculo: cuánto ahorrarías en 1 año si ahorras 50€ al mes.',
    },
    {
      id: 'dsk-03',
      title: 'Presupuestos y matemáticas',
      duration: '12 min',
      content: `## DeepSeek para números

DeepSeek es excelente con matemáticas, presupuestos y cálculos financieros.

### Crear un presupuesto familiar

> Ayúdame a crear un presupuesto familiar mensual. Ingresos:
> - Mi sueldo: 1.400€
> - Sueldo de mi pareja: 1.100€
>
> Gastos fijos:
> - Alquiler: 800€
> - Luz, agua, gas: 150€
> - Internet y móviles: 60€
>
> Gastos variables:
> - Comida: 400€
> - Transporte: 100€
> - Ocio: 80€
>
> Calcula: total de ingresos, total de gastos, dinero disponible para ahorro. Dame un gráfico (texto) con porcentajes.

### Calcular impuestos

> Trabajo por cuenta ajena y cobro 1.600€ brutos al mes, 12 pagas. ¿Cuánto cobraré neto? Calcula IRPF y Seguridad Social según la normativa 2024.

### Comparar ofertas

> Tengo 2 ofertas de trabajo:
> - Empresa A: 1.500€/mes, 14 pagas, en Madrid.
> - Empresa B: 1.700€/mes, 12 pagas, en Barcelona.
>
> ¿Cuál me conviene más económicamente? Considera coste de vida en cada ciudad.

### Calcular ahorro para una meta

> Quiero ahorrar 5.000€ en 2 años para visitar a mi familia en Colombia. ¿Cuánto debo ahorrar al mes? Dame 3 escenarios: fácil, medio, difícil.

### Conversión de divisas

> Tengo 1.000€. ¿Cuánto es en pesos colombianos, soles peruanos y pesos argentinos hoy? Usa el tipo de cambio actual.`,
      tips: [
        'DeepThink da mejores resultados en cálculos complejos.',
        'Pide siempre "muestra tus cálculos paso a paso".',
        'Para tipos de cambio, activa el modo Search.',
      ],
      exercise: 'Pide a DeepSeek un presupuesto mensual para tu familia. Pídele los cálculos detallados.',
    },
    {
      id: 'dsk-04',
      title: 'Escribir CV, correos y cartas',
      duration: '12 min',
      content: `## Redacción práctica

DeepSeek también es excelente escribiendo textos, con la ventaja del razonamiento profundo.

### CV con análisis

> Redacta mi currículum para trabajar como cocinero en España. Mi experiencia: 8 años en restaurante peruano. Quiero que adaptes mi CV para 3 tipos de establecimiento: restaurante tradicional español, cadena de comida rápida y hotel de lujo. Haz 3 versiones.

### Carta de presentación

> Redacta una carta de presentación para el puesto de cocinero en el restaurante "El Burladero" de Madrid. Tengo 8 años de experiencia y soy peruano. Carta profesional en español, 1 página.

### Correos formales

**Al casero:**
> Escribe un correo a mi casero para pedir que arregle el agua caliente. Tono formal.

**Al colegio:**
> Escribe un correo al tutor de mi hijo para pedir reunión. Tono amable.

**Para pedir cita:**
> Escribe un correo para pedir cita en extranjería para renovar mi permiso.

### Análisis crítico

> (Pega tu CV) Analiza mi CV. Dame 5 puntos fuertes y 5 aspectos a mejorar. Después, dame una versión mejorada.

### Cartas de reclamación

> Escribir una carta de reclamación formal a una tienda que me vendió un producto defectuoso. Cita los artículos del Real Decreto Legislativo 1/2007 (ley de consumidores).

DeepSeek usará DeepThink para analizar la ley y citar los artículos correctos.`,
      tips: [
        'Usa DeepThink para análisis críticos de tu CV.',
        'Pide "tono formal pero amable" para correos delicados.',
        'Guarda las versiones en Word para reutilizar.',
      ],
      exercise: 'Pide a DeepSeek que mejore tu CV actual y te dé 5 consejos para mejorarlo.',
    },
    {
      id: 'dsk-05',
      title: 'Traducir documentos complejos',
      duration: '10 min',
      content: `## Traducción con razonamiento

DeepSeek traduce muy bien, especialmente documentos técnicos y legales.

### Documentos legales

> (Pega el texto) Traduce este contrato del español al chino mandarín. Mantén los términos legales clave en español entre paréntesis.

### Documentos técnicos

> (Pega el texto) Traduce este manual técnico al español. Es sobre instalación eléctrica. Mantén los términos técnicos correctos.

### Cartas personales

> (Pega el texto) Traduce esta carta al español. Es para mi familia en China: que sea natural, no literal.

### Múltiples idiomas

> Traduce la frase "Necesito renovar mi permiso de residencia" al inglés, francés, alemán, árabe, chino, ruso y ucraniano. Con pronunciación fonética.

### Comparar traducciones

> (Pega un texto) He recibido 2 traducciones distintas de este texto. ¿Cuál es más precisa? ¿Por qué? Dame una versión mejorada combinando las mejores partes.

### Para trámites en China

Si necesitas traducir documentos para trámites en China:

> (Pega el texto) Traduce este documento del español al chino simplificado. Es para un trámite oficial en China. Usa terminología administrativa china adecuada.`,
      tips: [
        'Para chino y otros idiomas asiáticos, DeepSeek suele ser mejor que otras IAs.',
        'Pega el texto completo de una vez.',
        'Pide "traducción natural" para textos personales.',
      ],
      exercise: 'Traduce con DeepSeek una frase del español a tu idioma nativo y a otros 2 idiomas.',
    },
    {
      id: 'dsk-06',
      title: 'Preguntar sobre derechos y trámites',
      duration: '12 min',
      content: `## DeepSeek como asesor de trámites

DeepSeek con el modo Search puede buscar información actualizada sobre trámites en España.

### Ejemplos prácticos

**1. Trámites de extranjería:**
> (Activa Search) ¿Cómo renuevo mi permiso de residencia no lucrativa? Dame los pasos, documentos necesarios y enlace oficial.

**2. Nacionalidad:**
> (Activa Search) ¿Cuáles son los requisitos para la nacionalidad española por residencia? ¿Cuántos años necesito? Dame enlaces oficiales.

**3. Derechos laborales:**
> Trabajo 10 horas al día sin contrato. ¿Es legal? ¿Qué puedo hacer? Cita artículos del Estatuto de los Trabajadores.

**4. Vivienda:**
> Mi casero quiere subir el alquiler un 30%. ¿Es legal? Cita la Ley de Arrendamientos Urbanos (LAU).

**5. Sanidad:**
> Soy inmigrante sin papeles. ¿Tengo derecho a sanidad? ¿Cómo obtengo la tarjeta sanitaria?

### Pedir análisis legal

DeepSeek puede citar artículos de leyes:

> Actúa como abogado laboralista. Mi jefe no me paga las horas extras. Cita los artículos del Estatuto de los Trabajadores que me protegen y los pasos que debo seguir.

### Comparar normativas

> Compara los requisitos para arraigo social en Madrid y Cataluña. ¿En cuál es más fácil?

### Aviso importante

> **DeepSeek no es abogado.** Sus respuestas son orientativas. Para temas legales serios, acude a:
> - Servicios jurídicos de ONGs (CEAR, ACCEM, Cruz Roja)
> - Colegio de Abogados de tu ciudad (asistencia jurídica gratuita)
> - Oficina de Atención al Inmigrante de tu ayuntamiento`,
      tips: [
        'Activa Search para información actualizada.',
        'Pídele siempre las fuentes (artículos de ley, enlaces).',
        'Confirma con un abogado o asistente social antes de actuar.',
      ],
      exercise: 'Pregunta a DeepSeek sobre tus derechos como trabajador en España. Anota los artículos de ley.',
    },
    {
      id: 'dsk-07',
      title: 'Aprender español y programación',
      duration: '12 min',
      content: `## Tutor de idiomas y más

DeepSeek es excelente aprendiendo idiomas y, especialmente, programación.

### Aprender español

**Vocabulario temático:**
> Dame 30 palabras y frases en español para el banco, con ejemplos.

**Conversaciones simuladas:**
> Simula una conversación en el banco: quiero abrir una cuenta. Tú eres el cajero, yo el cliente. Empieza tú y corrígeme.

**Verbos:**
> Explícame los tiempos pasados en español: pretérito indefinido, imperfecto y perfecto. Con 10 ejemplos cada uno.

### Aprender programación (para adultos)

Si quieres aprender a programar para mejorar tu empleabilidad:

> Soy principiante en programación. Quiero aprender Python desde cero. Crea un plan de 30 días, 30 minutos al día, con ejercicios prácticos.

DeepSeek es excelente generando y explicando código.

### Aprender Excel avanzado

> Explícame cómo funciona BUSCARV (VLOOKUP) en Excel, con 5 ejemplos prácticos para gestión de inventario.

### Aprender matemáticas

> Mi hija tiene 10 años y no entiende las fracciones. Explícaselas con ejemplos visuales y dale 5 ejercicios.

### Estudiar para oposiciones

> Quiero estudiar para las oposiciones de auxiliar administrativo en España. Dame un plan de estudio y los temas principales.

### Preparar entrevistas técnicas

> Tengo entrevista para un puesto de desarrollador web junior. Hazme 15 preguntas técnicas y 5 preguntas de RRHH.`,
      tips: [
        'DeepSeek es muy bueno en programación: pídele código y explicaciones.',
        'Para aprender Excel, pídele fórmulas con ejemplos.',
        'Combina DeepSeek con vídeos de YouTube para mejores resultados.',
      ],
      exercise: 'Pídele a DeepSeek que te enseñe una habilidad nueva (idioma, Excel, programación).',
    },
    {
      id: 'dsk-08',
      title: 'Privacidad y consejos finales',
      duration: '10 min',
      content: `## Privacidad en DeepSeek

### Origen de los datos

DeepSeek es una empresa china. Esto ha generado debate sobre privacidad.

### Qué NO compartir

- ❌ Datos bancarios completos
- ❌ Número de pasaporte o DNI
- ❌ Contraseñas
- ❌ Información médica sensible
- ❌ Direcciones exactas

### Configuración

1. Entra en **Settings**.
2. Revisa tus datos y conversaciones.
3. Puedes borrar conversaciones una a una.

### Comparativa de privacidad

| IA | País | Privacidad |
|---|---|---|
| ChatGPT | USA | Mejorando, opciones de opt-out |
| Gemini | USA | Conectada a Google |
| Claude | USA | Permite opt-out |
| DeepSeek | China | Debate sobre datos |
| Qwen | China | Debate sobre datos |

> **Recomendación:** Para temas muy sensibles (legal, médico), usa Claude o ChatGPT. DeepSeek es excelente para matemáticas, código y razonamiento, pero ten cuidado con datos personales.

## 10 trucos finales

1. **Usa DeepThink** para problemas complejos.
2. **Usa Search** para información actualizada.
3. **Pide paso a paso**: "muestra tus razonamientos".
4. **Compara respuestas** con otros modelos.
5. **Pide tablas** para comparar opciones.
6. **Itera**: si no te gusta, sigue preguntando.
7. **Pide ejemplos** concretos y casos reales.
8. **Guarda lo bueno** en documentos.
9. **No compartas datos sensibles**.
10. **Combina modelos**: cada IA tiene sus puntos fuertes.`,
      tips: [
        'Para temas sensibles, usa Claude o ChatGPT.',
        'Para matemáticas y código, DeepSeek es excelente.',
        'Revisa tu configuración de privacidad regularmente.',
      ],
      exercise: 'Revisa tu configuración de privacidad en DeepSeek. Borra conversaciones sensibles.',
    },
  ],
};

// ------------------------------------------------------------
// 6. QWEN — Alibaba
// ------------------------------------------------------------
const qwenCourse: AICourse = {
  id: 'qwen',
  model: 'Qwen',
  provider: 'Alibaba',
  logo: '🦁',
  color: 'from-purple-500 to-pink-600',
  tagline: 'La IA multilingüe de Alibaba',
  description:
    'Qwen es la IA de Alibaba. Destaca en su soporte multilingüe (especialmente chino, árabe, español e inglés) y en generación de imágenes integrada. Es gratuita.',
  freeAccess: true,
  url: 'https://chat.qwen.ai',
  appAvailable: true,
  level: 'beginner',
  lessons: [
    {
      id: 'qwn-01',
      title: 'Crear cuenta en Qwen',
      duration: '6 min',
      content: `## Acceso a Qwen

Qwen (de Alibaba) es una IA china con excelente soporte para español.

### Pasos

1. Entra en **chat.qwen.ai**
2. Pulsa **"Sign In"** o **"Sign up"**.
3. Regístrate con:
   - Correo electrónico + contraseña
   - Cuenta de Google
4. Verifica tu correo con el código enviado.

> **Importante:** No requiere tarjeta de crédito ni número de teléfono. Muy accesible.

### App móvil

Disponible como **"Qwen"** en Google Play y App Store.

### Idioma de la interfaz

La interfaz puede estar en inglés. Para cambiarla:

1. Settings (engranaje arriba a la derecha).
2. Language → español.

### Funciones disponibles

- **Chat con texto**
- **Generación de imágenes** (Qwen-Image)
- **Análisis de archivos** (PDF, imágenes)
- **Búsqueda web** (modo Search)`,
      tips: [
        'No requiere tarjeta ni teléfono para registrarse.',
        'La interfaz puede estar en inglés; cámbiala en Settings.',
        'Qwen destaca en traducciones con chino y árabe.',
      ],
      exercise: 'Crea tu cuenta en chat.qwen.ai y envía tu primer mensaje.',
    },
    {
      id: 'qwn-02',
      title: 'Primer prompt y funciones',
      duration: '10 min',
      content: `## Cómo usar Qwen

Qwen funciona como otros chats de IA. Escribes, esperas, sigues.

### Funciones destacadas

**1. Modos de chat:**

- **Chat normal:** respuestas rápidas.
- **Modo Search:** busca en internet.

**2. Generación de imágenes:**

- Pulsa el botón de "Image Generation" o escribe "Crea una imagen de...".

**3. Análisis de archivos:**

- Pulsa 📎 para subir PDFs o fotos.

### Ejemplo práctico

> Soy de China y vivo en España desde hace 1 año. Quiero entender mejor la cultura española. Dame 10 consejos prácticos para integrarme.

### Pedir en tu idioma

Qwen es excelente con idiomas:

> Responde en español. Si tengo errores, corrígeme y explícame.

O:

> Habla conmigo en chino mandarín. Estoy aprendiendo.

### Truco: comparar idiomas

> ¿Cómo se dice "Hola, ¿cómo estás?" en 10 idiomas distintos? Dame la pronunciación en español.

### Ejemplo con imagen

> Crea una imagen de un mercado español con frutas y verduras, estilo realista.

Qwen generará 4 imágenes. Pulsa una para verla más grande y descargarla.`,
      tips: [
        'Qwen es muy bueno con traducciones al chino y árabe.',
        'Usa el modo Search para información actualizada.',
        'Las imágenes se generan en segundos.',
      ],
      exercise: 'Pídele a Qwen una imagen para tu negocio. Descárgala.',
    },
    {
      id: 'qwn-03',
      title: 'Traducir entre muchos idiomas',
      duration: '12 min',
      content: `## Qwen, el rey del multilingüismo

Qwen es excelente traduciendo entre idiomas, especialmente:

- 🇨🇳 Chino mandarín ↔ español
- 🇸🇦 Árabe ↔ español
- 🇮🇳 Hindi ↔ español
- 🇧🇷 Portugués ↔ español
- 🇫🇷 Francés ↔ español

### Ejemplos prácticos

**1. Comunicarte con familia:**
> Traduce esta carta del español al chino mandarín (simplificado). Que sea natural, como si la escribiera una persona, no una máquina.

**2. Documento oficial:**
> (Pega el texto) Traduce este contrato del español al árabe. Mantén la terminología legal.

**3. Para trámites:**
> (Pega el texto) Traduce esta resolución de extranjería al inglés. Necesito enviarla a mi empresa.

**4. Aprender idiomas:**
> Quiero aprender español. Mi idioma nativo es el árabe. Dame 50 frases útiles en español con su traducción y pronunciación en árabe.

### Múltiples idiomas

> ¿Cómo se dice "Gracias por su ayuda" en español, inglés, francés, árabe, chino, hindi, ruso, ucraniano, wolof y quechua? Con pronunciación.

### Interpretación cultural

Qwen también explica matices:

> Estoy escribiendo a un socio comercial en China. ¿Qué fórmulas de respeto debo usar? Dame 3 ejemplos.

### Comparar traducciones

> (Pega dos traducciones) Compara estas dos traducciones del español al chino. ¿Cuál es más natural? ¿Por qué?`,
      tips: [
        'Qwen es mejor que otras IAs en chino, árabe e hindi.',
        'Pide "natural, no literal" para textos personales.',
        'Para traducciones juradas, busca un traductor certificado.',
      ],
      exercise: 'Traduce con Qwen una frase del español a tu idioma nativo y a otros 3.',
    },
    {
      id: 'qwn-04',
      title: 'Generar imágenes y contenido visual',
      duration: '10 min',
      content: `## Imágenes con Qwen

Qwen tiene un generador de imágenes integrado muy potente.

### Cómo generar imágenes

1. En la caja de texto, escribe tu descripción.
2. Empieza con: "Crea una imagen de..." o "Dibuja...".
3. Qwen generará 4 imágenes.

### Ejemplos prácticos

**1. Logotipo:**
> Crea un logo para una tienda de ropa latina, tonos vivos, estilo moderno.

**2. Material educativo:**
> Ilustra las partes del cuerpo humano con etiquetas en español, estilo libro de texto.

**3. Tarjeta de presentación:**
> Diseña una tarjeta de presentación para electricista, fondo azul, ícono de enchufe.

**4. Decoración:**
> Crea una imagen de un salón moderno estilo escandinavo, con planta y sofá gris.

**5. Invitaciones:**
> Diseña una invitación de cumpleaños infantil, tema dinosaurios, en español.

### Análisis de imágenes

Qwen también puede **leer imágenes**:

1. Sube una foto (📷 o 📎).
2. Escribe tu pregunta.

**Ejemplos:**

- (Foto de un letrero) "¿Qué dice este letrero en español? Tradúcelo al chino."
- (Foto de una nómina) "Explícame esta nómina paso a paso."
- (Foto de un producto) "¿Qué producto es? ¿Dónde se puede comprar en España?"
- (Foto de un documento) "Resume este documento y dime qué tengo que hacer."

### Edición básica

Puedes pedir variaciones:

- "Haz la misma imagen pero en colores pastel".
- "Cambia el fondo por una playa".
- "Añade el texto 'Bienvenido' en grande".`,
      tips: [
        'Qwen genera 4 imágenes: elige la mejor.',
        'Puedes pedir variaciones de una imagen que te guste.',
        'Las imágenes con texto pueden tener errores; revísalas.',
      ],
      exercise: 'Genera una imagen para tu negocio con Qwen. Descarga tu favorita.',
    },
    {
      id: 'qwn-05',
      title: 'Escribir CV, correos y documentos',
      duration: '12 min',
      content: `## Redacción con Qwen

Qwen escribe textos claros y profesionales, especialmente para comunicación intercultural.

### CV profesional

> Redacta mi currículum para trabajar como traductor español-chino. Tengo 5 años de experiencia y un máster en traducción. Versión en español y en chino.

### Carta de presentación

> Redacta una carta de presentación para una empresa española de importación que busca personal bilingüe español-chino. Tengo experiencia en comercio internacional.

### Correos formales

**Al casero:**
> Escribe un correo a mi casero para pedir que arregle la nevera. Tono formal, en español.

**Al colegio:**
> Escribe un correo al colegio para pedir cita con el tutor de mi hija. Tono amable, en español.

**Para empresas chinas en España:**
> Redacta un correo formal para una empresa china que opera en Madrid. Necesito presentarme como candidato a un puesto. En español y en chino.

### Adaptar textos a culturas

> Voy a enviar un correo formal a una empresa en China. ¿Qué fórmulas de cortesía debo usar? Dame ejemplos en chino y español.

### Revisar y mejorar

> (Pega tu CV) Revisa mi CV en español. Corrige errores y dame una versión mejorada. También dame 5 consejos para destacar más.

### Cartas oficiales

> Redacta una carta formal al Ayuntamiento de Madrid solicitando información sobre ayuda al alquiler. Tono administrativo español.`,
      tips: [
        'Qwen es excelente para textos bilingües español-chino.',
        'Pide siempre el tono: formal, amable, urgente.',
        'Revisa y ajusta antes de enviar.',
      ],
      exercise: 'Pide a Qwen que redacte tu CV en español y en tu idioma nativo.',
    },
    {
      id: 'qwn-06',
      title: 'Aprender español y español para chinos',
      duration: '12 min',
      content: `## Qwen como tutor de español

Qwen es especialmente útil para hispanohablantes que aprenden chino, y para chinos que aprenden español.

### Para chinos que aprenden español

**Vocabulario:**
> Dame 100 palabras esenciales en español para un recién llegado a España. Con traducción al chino y pinyin.

**Frases útiles:**
> Dame 30 frases prácticas en español para ir al supermercado, con audio descripción de pronunciación para sinohablantes.

**Verbos:**
> Explícame los verbos "ser" y "estar" con ejemplos. Para un estudiante chino.

**Cultura:**
> Dame 10 consejos culturales para un chino recién llegado a España: horarios, comida, saludos, etc.

### Para hispanohablantes que aprenden chino

**Frases básicas:**
> Enseñame 50 frases útiles en chino mandarín para viajar a China. Con pinyin y traducción.

**Caracteres:**
> Dame los 100 caracteres chinos más usados, con su significado, pinyin y trazos.

**Conversación:**
> Simula una conversación en chino en un restaurante de Pekín. Tú eres el camarero, yo el cliente. Empieza tú y corrígeme.

### Aprender español general

**Para inmigrantes arabohablantes:**
> Quiero aprender español. Mi idioma es el árabe. Crea un plan de 60 días, 20 minutos al día, con ejercicios.

**Para hispanohablantes que mejoran:**
> Quiero mejorar mi español escrito. Dame 10 ejercicios de escritura con corrección.

### Para hijos en colegios españoles

> Mi hijo de 8 años, chino, va a empezar el colegio en España. Crea un plan de adaptación de 30 días. Incluye vocabulario escolar básico.

### Recursos adicionales

Combina Qwen con:

- **Duolingo** (app gratuita)
- **HelloTalk** (intercambio de idiomas)
- **YouTube** (canales educativos)`,
      tips: [
        'Qwen es el mejor modelo para chino-español.',
        'Pide "con pinyin" para chino y "con pronunciación" para otros idiomas.',
        'Combina Qwen con apps de idiomas para mejores resultados.',
      ],
      exercise: 'Pídele a Qwen 30 frases útiles en tu idioma para recién llegados a España.',
    },
    {
      id: 'qwn-07',
      title: 'Consejos prácticos y privacidad',
      duration: '10 min',
      content: `## Trucos para sacar lo mejor de Qwen

### 1. Pídele que actúe como experto

> Actúa como un asistente social español especializado en inmigración. Mi caso: [descripción]. ¿Qué pasos debo seguir?

### 2. Pide tablas comparativas

> Compara las 5 mejores apps para aprender español: precio, nivel, ventajas, desventajas. En tabla.

### 3. Múltiples versiones

> Dame 3 versiones de esta carta de presentación. Dime cuál es mejor para cada tipo de empresa.

### 4. Análisis paso a paso

> Analiza paso a paso esta oferta de trabajo: [pega la oferta]. ¿Es legítima? ¿Qué señales de alarma hay?

### 5. Listas detalladas

> Dame un checklist completo de documentos para abrir una cuenta bancaria en España siendo inmigrante.

## Privacidad en Qwen

### Origen de los datos

Qwen es de Alibaba (China). Como con DeepSeek, hay debate sobre privacidad.

### Qué NO compartas

- ❌ Datos bancarios completos
- ❌ Número de pasaporte
- ❌ Contraseñas
- ❌ Información médica sensible
- ❌ Direcciones exactas

### Configuración

1. Entra en **Settings** (engranaje).
2. Revisa tu historial de conversaciones.
3. Puedes borrar conversaciones una a una.

### Recomendación final

- **Para matemáticas y código:** DeepSeek o ChatGPT.
- **Para textos largos y legales:** Claude.
- **Para integración con Google:** Gemini.
- **Para integración con Microsoft:** Copilot.
- **Para traducciones chino-árabe-español:** Qwen.
- **Para investigar con fuentes:** Perplexity o Copilot.
- **Para principiantes absolutos:** ChatGPT o Gemini.

> **Idea:** No uses solo una IA. Cada modelo tiene sus puntos fuertes. Prueba varias y elige según tu necesidad.`,
      tips: [
        'Para temas sensibles, prioriza Claude o ChatGPT.',
        'Revisa y borra tu historial regularmente.',
        'Combina varias IAs según la tarea.',
      ],
      exercise: 'Revisa tu configuración de privacidad en Qwen. Prueba también otra IA de la lista.',
    },
  ],
};

// ------------------------------------------------------------
// 7. PERPLEXITY
// ------------------------------------------------------------
const perplexityCourse: AICourse = {
  id: 'perplexity',
  model: 'Perplexity',
  provider: 'Perplexity AI',
  logo: '🔍',
  color: 'from-teal-500 to-cyan-600',
  tagline: 'El buscador inteligente con fuentes verificadas',
  description:
    'Perplexity es un buscador potenciado por IA. Cada respuesta incluye enlaces a fuentes verificables. Es ideal para investigar trámites, derechos y comparar opciones.',
  freeAccess: true,
  url: 'https://perplexity.ai',
  appAvailable: true,
  level: 'beginner',
  lessons: [
    {
      id: 'ppx-01',
      title: 'Empezar con Perplexity',
      duration: '6 min',
      content: `## El buscador del futuro

Perplexity no es un chat normal: es un **buscador con IA** que te da respuestas con **fuentes verificables**.

### Pasos para empezar

1. Entra en **perplexity.ai**
2. No necesitas cuenta para probarlo.
3. Para guardar historial: pulsa "Sign in" y usa Google o correo.

### App móvil

Descarga **"Perplexity AI"** en Google Play o App Store.

### Idioma

Perplexity detecta tu idioma automáticamente. Para forzar español:

> Responde siempre en español.

### Diferencias con Google

| Google | Perplexity |
|---|---|
| Lista de enlaces | Respuesta directa con fuentes |
| Tú lees varias páginas | IA lee por ti |
| Sin contexto | Recuerda la conversación |
| Anuncios | Sin anuncios |

> **Ventaja principal:** Cada respuesta tiene **citas verificables** que puedes pulsar para confirmar.`,
      tips: [
        'No necesitas cuenta para usar Perplexity gratis.',
        'La app móvil es muy rápida y cómoda.',
        'Puedes preguntar en cualquier idioma.',
      ],
      exercise: 'Entra en perplexity.ai y haz una pregunta sobre España sin iniciar sesión.',
    },
    {
      id: 'ppx-02',
      title: 'Buscar trámites oficiales',
      duration: '12 min',
      content: `## Investigación de trámites

Perplexity es **la mejor IA para investigar trámites oficiales** porque te da fuentes verificables.

### Ejemplos prácticos

**1. Cita previa de extranjería:**
> ¿Cómo pido cita previa en la oficina de extranjería? Dame el enlace oficial y los pasos.

Perplexity buscará en internet y te dará:
- Pasos detallados.
- Enlaces oficiales (sede-electronica.gob.es, etc.).
- Documentos necesarios.

**2. Empadronamiento:**
> ¿Cómo me empadrono en Valencia? Documentos necesarios, dónde ir, plazo.

**3. Tarjeta sanitaria:**
> Soy inmigrante sin papeles. ¿Cómo obtengo la tarjeta sanitaria individual (TSI) en Cataluña?

**4. Renovar TIE:**
> Pasos para renovar la tarjeta de identidad de extranjero (TIE) en Madrid. Plazos, documentos, enlace oficial.

**5. Homologación de títulos:**
> ¿Cómo homologo mi título de enfermería de Colombia en España? Dame los pasos y el enlace del Ministerio de Universidades.

### Función "Pro Search"

Perplexity tiene **"Pro Search"** (gratis con límites):

- Hace múltiples búsquedas para responder mejor.
- Te hace preguntas de aclaración.
- Más lento pero más preciso.

### Pídele enlaces

Siempre pide:

> Dame enlaces a fuentes oficiales (.gob.es o .es).

### Verifica

Pulsa siempre los **números [1], [2], [3]** que aparecen en la respuesta para verificar la fuente original.`,
      tips: [
        'Pulsa siempre las fuentes citadas [1] [2] para verificar.',
        'Usa "Pro Search" para trámites importantes.',
        'Pide "enlaces oficiales .gob.es" para evitar páginas falsas.',
      ],
      exercise: 'Pregunta a Perplexity cómo empadronarte en tu ciudad. Anota los enlaces oficiales.',
    },
    {
      id: 'ppx-03',
      title: 'Comparar productos y servicios',
      duration: '10 min',
      content: `## Comparativas inteligentes

Perplexity es excelente para comparar productos y servicios con datos actualizados.

### Ejemplos prácticos

**1. Bancos para inmigrantes:**
> Compara los mejores bancos españoles para abrir cuenta siendo inmigrante recién llegado. Tabla con: comisiones, requisitos, servicios. Con enlaces oficiales.

**2. Compañías de móvil:**
> Comparativa de tarifas de móvil baratas en España, menos de 10€/mes. Con cobertura, datos y enlace oficial.

**3. Seguros de salud:**
> Compara seguros de salud privados en España para una familia de 4 personas, menos de 100€/mes. Tabla con coberturas y precio.

**4. Vuelos baratos:**
> Vuelos baratos de Madrid a Bogotá en noviembre. Compara aerolíneas y precios actuales.

**5. Supermercados:**
> ¿Qué supermercados son más baratos en Madrid? Comparativa de precios de productos básicos.

### Función Focus

Perplexity tiene un botón **Focus** para acotar búsquedas:

- **Web:** búsqueda general.
- **Academic:** artículos académicos.
- **YouTube:** vídeos.
- **Reddit:** opiniones reales de usuarios.

### Ejemplos con Focus

**Opiniones de usuarios:**
> (Focus: Reddit) ¿Qué opinan los usuarios de Bankinter para inmigrantes? Pros y contras.

**Vídeos:**
> (Focus: YouTube) Dame los mejores vídeos para aprender español nivel A1, con enlaces.

### Pedir en tabla

Siempre pide:

> Dame la comparativa en tabla.`,
      tips: [
        'Usa "Focus: Reddit" para opiniones reales de usuarios.',
        'Pide siempre comparativas en tabla.',
        'Verifica precios actuales en los enlaces.',
      ],
      exercise: 'Pídele a Perplexity comparar 3 bancos españoles para inmigrantes. Anota comisiones y enlaces.',
    },
    {
      id: 'ppx-04',
      title: 'Investigar derechos laborales',
      duration: '12 min',
      content: `## Derechos laborales con fuentes

Perplexity es **ideal para temas legales** porque cita fuentes oficiales (leyes, ministerios).

### Ejemplos prácticos

**1. Salario mínimo:**
> ¿Cuál es el salario mínimo interprofesional (SMI) en España 2024? ¿Y las pagas extra? Cita la fuente oficial.

**2. Jornada laboral:**
> ¿Cuántas horas máximas puedo trabajar por semana en España? ¿Y las horas extras? Cita el Estatuto de los Trabajadores.

**3. Vacaciones:**
> ¿Cuántos días de vacaciones pagadas me corresponden por ley en España?

**4. Despido:**
> ¿Cuándo tengo derecho a indemnización por despido? ¿Cuánto me corresponde? Cita el Estatuto de los Trabajadores.

**5. Contratos:**
> Diferencias entre contrato indefinido, temporal y por obra. Ventajas y desventajas para el trabajador.

**6. Trabajo sin contrato:**
> Trabajo sin contrato en España. ¿Es legal? ¿Qué puedo hacer? ¿Cómo denuncio? Cita las fuentes oficiales.

### Función "Copilot" / "Pro Search"

Para temas legales complejos, usa **"Pro Search"**:

1. Escribe tu pregunta.
2. Pulsa "Pro".
3. Perplexity te hará preguntas para entender tu caso.
4. Buscará en múltiples fuentes.
5. Te dará una respuesta detallada con enlaces.

### Ejemplo avanzado

> (Pro Search) Mi jefe no me paga las horas extras. Llevo 6 meses trabajando de camarero sin contrato en Madrid. ¿Qué pasos debo seguir? ¿A quién acudo? ¿Puedo reclamar el dinero? Cita las leyes y enlaces oficiales.

### Pedir artículos de ley

> Cita los artículos del Estatuto de los Trabajadores que protegen mi derecho al salario mínimo.`,
      tips: [
        'Usa "Pro Search" para temas legales complejos.',
        'Pide siempre que cite las leyes y artículos.',
        'Confirma con un abogado o asistente social antes de actuar.',
      ],
      exercise: 'Pregunta a Perplexity sobre el salario mínimo en España. Verifica el enlace oficial.',
    },
    {
      id: 'ppx-05',
      title: 'Buscar trabajo e investigar empresas',
      duration: '12 min',
      content: `## Investigación profesional

Perplexity es excelente para preparar entrevistas y buscar trabajo.

### Investigar empresas

> Información sobre la empresa "Inditex" (Zara): qué hace, número de empleados, sedes en España, valores, beneficios sociales.

Perplexity te dará:

- Historia y misión.
- Datos económicos.
- Sedes y oficinas.
- Cultura laboral (con opiniones de empleados).
- Enlaces oficiales.

### Buscar ofertas de trabajo

> Busca ofertas de trabajo actuales como administrativo en Madrid. Enlaces a InfoJobs, LinkedIn y Indeed.

Perplexity buscará en tiempo real y te dará enlaces directos a las ofertas.

### Preparar entrevistas

> (Pega la oferta) Voy a una entrevista para este puesto. Dame:
> 1. 10 preguntas típicas de entrevista.
> 2. Cómo prepararme para cada una.
> 3. Información sobre la empresa [nombre].
> 4. Preguntas que yo puedo hacer.

### Comparar plataformas de empleo

> Compara InfoJobs, LinkedIn, Indeed y TicTacJobs en España: ventajas, desventajas, mejor para qué sectores.

### Salarios por sector

> ¿Cuál es el salario medio de un camarero en Madrid? ¿Y en Barcelona? Compara con otras ciudades españolas.

### Formación gratuita

> Busca cursos gratuitos con certificado en España para formación profesional. Enlaces oficiales.

### Buscar ONGs y asociaciones

> Lista las ONGs en Madrid que ayudan a inmigrantes a buscar trabajo, con enlaces oficiales.`,
      tips: [
        'Usa Perplexity antes de cada entrevista: investiga la empresa.',
        'Pídele enlaces a InfoJobs, LinkedIn y otras plataformas.',
        'Combina con ChatGPT para preparar respuestas a preguntas de entrevista.',
      ],
      exercise: 'Investiga con Perplexity una empresa donde te gustaría trabajar. Anota 3 datos clave.',
    },
    {
      id: 'ppx-06',
      title: 'Buscar vivienda y comparar alquileres',
      duration: '10 min',
      content: `## Investigación de vivienda

Perplexity puede ayudarte a tomar decisiones informadas sobre vivienda.

### Comparar zonas

> Compara los barrios de Madrid para alquilar piso: precio medio, seguridad, transporte, servicios. En tabla.

### Precios actuales

> ¿Cuál es el precio medio de alquiler en Valencia, Madrid, Barcelona y Sevilla en 2024? Compara con fuentes oficiales (Idealista, Fotocasa, INE).

### Buscar piso

> Busca pisos en alquiler en Madrid centro, menos de 1.000€/mes, 2 habitaciones. Dame enlaces actuales.

Perplexity te dará enlaces directos a Idealista, Fotocasa, Pisos.com.

### Verificar contratos

> ¿Qué cláusulas son abusivas en un contrato de alquiler según la LAU (Ley de Arrendamientos Urbanos)? Lista las más comunes.

### Ayudas al alquiler

> ¿Hay ayudas al alquiler para inmigrantes en España en 2024? Requisitos, cuantía, cómo solicitar.

### Comprar vs alquilar

> Tengo 20.000€ ahorrados. ¿Me conviene comprar o alquilar en Valencia? Análisis con cifras actuales.

### Subvenciones y bonificaciones

> Busca ayudas y subvenciones para primera vivienda en la Comunidad de Madrid. Requisitos y plazos.

### Función Focus para opiniones

> (Focus: Reddit) ¿Qué opiniones hay sobre vivir en Vallecas (Madrid)? Pros y contras reales.`,
      tips: [
        'Usa "Focus: Reddit" para opiniones reales de zonas.',
        'Verifica precios en Idealista, Fotocasa y otros portales.',
        'Compara varias zonas antes de decidir.',
      ],
      exercise: 'Pídele a Perplexity comparar 3 barrios de tu ciudad para vivir. Anota precios y pros/contras.',
    },
    {
      id: 'ppx-07',
      title: 'Estudiar y aprender con fuentes',
      duration: '10 min',
      content: `## Aprendizaje con fuentes confiables

Perplexity es excelente para aprender porque cita fuentes académicas y oficiales.

### Aprender español

**Con fuentes académicas:**
> (Focus: Academic) Dame una explicación académica del subjuntivo en español, con ejemplos y bibliografía.

**Recursos gratuitos:**
> (Focus: YouTube) Busca los mejores canales de YouTube para aprender español nivel A1, con enlaces.

**Cursos gratuitos:**
> Busca cursos gratuitos de español para inmigrantes en España, con certificado. Enlaces oficiales.

### Aprender otras habilidades

**Excel:**
> Busca tutoriales gratuitos de Excel para principiantes en español. Enlaces a YouTube y cursos.

**Programación:**
> Dame recursos gratuitos para aprender Python desde cero, en español. Enlaces a cursos y documentación.

**Cocina española:**
> (Focus: YouTube) Mejores vídeos para aprender cocina española tradicional, con enlaces.

### Estudiar para oposiciones

> ¿Cuáles son las oposiciones más accesibles para inmigrantes en España? Requisitos y temarios. Con enlaces oficiales.

### Investigación para hijos

> Busca colegios públicos en Madrid con buena reputación, con secciones bilingües español-inglés. Enlaces oficiales.

### Becas y ayudas

> Busca becas para estudiar en España para inmigrantes: requisitos, importe, plazos. Enlaces oficiales del Ministerio de Educación.

### Noticias y actualidad

> (Focus: Web) Últimas noticias sobre normativa de extranjería en España 2024. Con enlaces a fuentes oficiales.`,
      tips: [
        'Usa "Focus: Academic" para temas de estudio.',
        'Usa "Focus: YouTube" para encontrar tutoriales.',
        'Combina Perplexity (fuentes) con ChatGPT (profundidad).',
      ],
      exercise: 'Busca con Perplexity un curso gratuito para aprender una habilidad nueva. Anota el enlace.',
    },
    {
      id: 'ppx-08',
      title: 'Privacidad y comparación con otras IAs',
      duration: '10 min',
      content: `## Privacidad en Perplexity

### Cómo maneja tus datos

Perplexity guarda tus conversaciones para mejorar el servicio. Puedes:

1. **Borrar conversaciones** una a una (3 puntos → Delete).
2. **Configurar privacidad** en Settings → Account.
3. **No guardar historial** (modo incógnito).

### Qué NO compartir

- ❌ Datos bancarios
- ❌ Número de pasaporte
- ❌ Contraseñas

### Qué SÍ puedes compartir

- ✅ Preguntas generales sobre trámites
- ✅ Consultas de investigación
- ✅ Búsquedas de productos

## Comparación de IAs

### ¿Cuándo usar cada una?

| IA | Mejor para |
|---|---|
| **ChatGPT** | Tareas generales, conversación natural |
| **Gemini** | Integración con Google, subida de documentos |
| **Copilot** | Integración con Microsoft Office |
| **Claude** | Textos largos, análisis de documentos legales |
| **DeepSeek** | Matemáticas, programación, razonamiento profundo |
| **Qwen** | Traducciones chino-árabe-español, imágenes |
| **Perplexity** | Búsqueda con fuentes verificables, investigación |
| **Meta AI** | Integración con WhatsApp, Instagram, Facebook |

### Combinación recomendada

**Para una entrevista de trabajo:**

1. **Perplexity:** investiga la empresa y la oferta.
2. **Claude:** prepara respuestas a preguntas difíciles.
3. **ChatGPT:** redacta tu carta de presentación.
4. **Qwen:** traduce documentos si los necesitas en otros idiomas.
5. **Gemini:** crea un CV profesional en Google Docs.

### Verificación cruzada

Para temas importantes (legal, médico, financiero), **compara respuestas de 2-3 IAs distintas**. Si coinciden, mayor confianza.

> **Regla de oro:** La IA te ayuda, pero tú decides. Verifica siempre con fuentes oficiales y profesionales.`,
      tips: [
        'Usa Perplexity para investigar, ChatGPT para conversar.',
        'Verifica temas importantes con 2-3 IAs distintas.',
        'Revisa tu configuración de privacidad regularmente.',
      ],
      exercise: 'Compara una misma pregunta en Perplexity y otra IA. Anota las diferencias.',
    },
  ],
};

// ------------------------------------------------------------
// 8. META AI / LLAMA
// ------------------------------------------------------------
const metaAiCourse: AICourse = {
  id: 'meta-ai',
  model: 'Meta AI',
  provider: 'Meta',
  logo: '🔄',
  color: 'from-blue-600 to-purple-700',
  tagline: 'La IA integrada en WhatsApp, Instagram y Facebook',
  description:
    'Meta AI es la IA de Meta, integrada en WhatsApp, Instagram, Facebook y Messenger. No necesitas descargar nada nuevo: ya la tienes en tus apps.',
  freeAccess: true,
  url: 'https://meta.ai',
  appAvailable: true,
  level: 'beginner',
  lessons: [
    {
      id: 'meta-01',
      title: 'Acceder a Meta AI en WhatsApp',
      duration: '8 min',
      content: `## La IA ya está en tu WhatsApp

Meta AI está **integrada en WhatsApp**, Instagram, Facebook y Messenger. Si usas alguna de estas apps, ya la tienes.

### En WhatsApp

1. Abre WhatsApp.
2. Arriba, junto a la lupa de búsqueda, verás un **círculo azul/morado** con una estrella.
3. Púlsalo. Se abre una conversación con "Meta AI".
4. ¡Empieza a chatear!

> **Si no lo ves:** actualiza WhatsApp desde Google Play o App Store. Debería aparecer en días.

### En Instagram

1. Abre Instagram.
2. Ve a tus mensajes (ícono de avión de papel).
3. Arriba, busca "Meta AI" o el círculo con estrella.
4. Empieza a chatear.

### En Facebook Messenger

1. Abre Messenger.
2. Pulsa "Nueva conversación".
3. Busca "Meta AI".

### En la web

Si no usas WhatsApp o prefieres la web: entra en **meta.ai**.

### Idioma

Meta AI detecta tu idioma. Para forzar español:

> Responde siempre en español, por favor.

### Gratis

Meta AI es completamente gratuita. No necesita suscripción.`,
      tips: [
        'Actualiza WhatsApp si no ves Meta AI.',
        'Funciona igual que chatear con un contacto.',
        'También puedes usarla en llamadas de voz en WhatsApp.',
      ],
      exercise: 'Abre WhatsApp y busca el ícono de Meta AI. Envía tu primer mensaje: "Hola".',
    },
    {
      id: 'meta-02',
      title: 'Tu primer chat en WhatsApp',
      duration: '10 min',
      content: `## Cómo hablar con Meta AI

Funciona como cualquier chat de WhatsApp: escribes, envías, esperas respuesta.

### Ejemplos prácticos

**1. Trámites:**
> Oye Meta, ¿cómo empadronarme en Madrid?

**2. Recetas:**
> Dame una receta de paella valenciana fácil, para 4 personas, en menos de 1 hora.

**3. Aprendizaje:**
> Explícame la diferencia entre "ser" y "estar" en español.

**4. Planificación:**
> Estoy en Madrid este fin de semana con mis hijos. Dame un plan de actividades gratuito.

### Funciones especiales en WhatsApp

**1. Imágenes:**
> /imagine un gato astronauta en el espacio, estilo realista

Meta AI generará una imagen en segundos.

**2. Búsqueda web:**
> Busca en internet: ¿cuál es el salario mínimo en España 2024?

**3. Resumir enlaces:**
> Resume este artículo: [pega el enlace]

**4. Stickers y emojis:**
> Crea un sticker de un perro feliz

### Conversaciones de grupo

En un grupo de WhatsApp, puedes invocar a Meta AI:

> @Meta AI, ¿qué hora es en España?

Todos en el grupo verán la respuesta.

> **Importante:** Meta NO usa tus mensajes privados de WhatsApp para entrenar la IA (según su política). Pero los mensajes que envías a Meta AI sí pueden usarse para mejorar el servicio.`,
      tips: [
        'Usa "/imagine" para generar imágenes.',
        'Puedes invocar a Meta AI en grupos con "@Meta AI".',
        'Combina con la función de búsqueda de WhatsApp.',
      ],
      exercise: 'Pídele a Meta AI en WhatsApp un plan para el fin de semana en tu ciudad.',
    },
    {
      id: 'meta-03',
      title: 'Crear imágenes en WhatsApp',
      duration: '10 min',
      content: `## Generación de imágenes

Meta AI puede crear imágenes en el chat de WhatsApp usando el comando **/imagine**.

### Cómo generar imágenes

1. Escribe en el chat: **/imagine** seguido de tu descripción.
2. Ejemplo: **/imagine un mercado de frutas en Madrid al atardecer**
3. Meta AI generará 4 imágenes.
4. Pulsa una para verla más grande.
5. Botón "Compartir" o "Descargar".

### Ejemplos prácticos

**1. Logotipo:**
> /imagine un logo para una peluquería llamada "Belleza Latina", tonos rosados, moderno

**2. Tarjetas de presentación:**
> /imagine tarjeta de presentación para electricista, fondo azul, herramientas

**3. Material educativo:**
> /imagine ilustración de las partes del cuerpo humano en español, estilo libro

**4. Invitaciones:**
> /imagine invitación de cumpleaños infantil, dinosaurios, texto "Cumpleaños de Lucas"

**5. Decoración:**
> /imagine salón moderno estilo escandinavo, sofá gris, planta grande

### Editar imágenes

Después de generar, puedes pedir:

- "Hazlo más oscuro"
- "Cambia el color a rojo"
- "Añade una mesa"

### Stickers personalizados

> /imagine un sticker de un perro con gafas de sol, estilo cartoon

Puedes guardar y usar el sticker en WhatsApp.

### Límites y consejos

- Las imágenes se generan en 5-15 segundos.
- A veces tienen errores en el texto.
- No uses imágenes de personas reales sin permiso.
- No generes contenido ofensivo o ilegal.`,
      tips: [
        'Usa "/imagine" para activar la generación de imágenes.',
        'Sé específico: colores, estilo, materiales, iluminación.',
        'Las imágenes con texto pueden tener errores; revísalas.',
      ],
      exercise: 'Genera una imagen en WhatsApp con "/imagine" para tu negocio o proyecto.',
    },
    {
      id: 'meta-04',
      title: 'Traducir mensajes en WhatsApp',
      duration: '10 min',
      content: `## Traducción en el chat

Meta AI puede traducir mensajes sin salir de WhatsApp.

### Traducir mensajes recibidos

Si recibes un mensaje en otro idioma:

1. Copia el mensaje (mantén pulsado → Copiar).
2. Pégalo en el chat de Meta AI.
3. Escribe: "Traduce al español".

### Traducir para enviar

Antes de enviar un mensaje en otro idioma:

> Traduce al inglés: "Hola, ¿cómo estás? Espero que todo vaya bien."

Meta AI te dará la traducción. Cópiala y pégala en tu chat.

### Traducción a múltiples idiomas

> ¿Cómo se dice "Necesito ayuda, por favor" en inglés, francés, árabe y chino?

### Conversaciones multilingües

Si chateas con personas que hablan otros idiomas:

> Voy a chatear con alguien que habla inglés. Traduce mis mensajes al inglés y sus mensajes al español. ¿Vale?

Meta AI hará de intermediario.

### Documentos y textos largos

Pega un texto largo y pide:

> Traduce este texto del español al inglés. Mantén el tono formal.

### Para trámites

> Traduce esta carta oficial al árabe para que mi familia la entienda.

### Aprender idiomas

> Dame 20 frases útiles en inglés para una entrevista de trabajo, con pronunciación.

### Combinar con Google Translate

Para audios o documentos:
- **Audios:** transcribe con WhatsApp, luego traduce con Meta AI.
- **Documentos:** copia texto, pega en Meta AI para traducir.`,
      tips: [
        'Usa Meta AI para traducir mensajes sin salir de WhatsApp.',
        'Pídele pronunciación: "¿Cómo se pronuncia en español?"',
        'Combina con Google Translate para audios.',
      ],
      exercise: 'Traduce con Meta AI una frase del español a 3 idiomas. Anota las traducciones.',
    },
    {
      id: 'meta-05',
      title: 'Planificar y organizar tu día',
      duration: '10 min',
      content: `## Tu asistente personal en WhatsApp

Meta AI es excelente para organizar tu día, semana o viajes.

### Planificar la semana

> Ayúdame a planificar mi semana. Trabajo de lunes a viernes de 9 a 17h. Los martes y jueves tengo clases de español por la noche (19-21h). Dame un horario con tiempo para: compras, limpieza, familia y descanso.

### Listas de tareas

> Crea una lista de tareas para mañana: 1) pedir cita médica, 2) comprar pan, 3) llamar al casero, 4) recoger a los niños a las 17h.

### Planificar comidas

> Planifica el menú de la semana para mi familia de 4 personas. Presupuesto: 80€. Cocina latina adaptada a ingredientes españoles. Dame la lista de compra.

### Planificar un viaje

> Voy a Sevilla el próximo fin de semana con mi pareja. Presupuesto: 200€. Dame: transporte, alojamiento barato, sitios que visitar, restaurantes económicos. En español.

### Organizar eventos

> Voy a organizar una fiesta de cumpleaños para 15 niños. Tema: dinosaurios. Dame: ideas de decoración, juegos, comida, regalos. Presupuesto: 150€.

### Listas de compras

> Lista de compra para hacer paella para 6 personas. Indica cantidades en gramos y litros.

### Recordatorios

Aunque Meta AI no puede programar alarmas en tu móvil, sí puede darte recordatorios en el chat:

> Recuérdame las tareas importantes de esta semana.

### Estudiar y aprender

> Dame un plan de estudio para aprender español: 30 días, 20 minutos al día, nivel A1.

### Preparar entrevistas

> Mañana tengo una entrevista de trabajo como cocinero. Dame: 10 preguntas típicas, cómo responderlas y 3 preguntas que yo puedo hacer.`,
      tips: [
        'Usa Meta AI como asistente personal en WhatsApp.',
        'Pídele listas detalladas: compras, tareas, planes.',
        'Combina con notas de tu móvil para organizar mejor.',
      ],
      exercise: 'Pídele a Meta AI que planifique tu semana. Guarda el plan en tus notas.',
    },
    {
      id: 'meta-06',
      title: 'Aprender y resolver dudas',
      duration: '12 min',
      content: `## Tutor en WhatsApp

Meta AI puede explicarte conceptos y resolver dudas cotidianas.

### Aprender español

> Explícame la diferencia entre "por" y "para" con 10 ejemplos.

> Dame 30 palabras en español sobre el banco, con ejemplos.

> Hagamos una conversación simulada: tú eres el cajero, yo el cliente. Empieza tú.

### Aprender Excel

> Explícame cómo funciona BUSCARV en Excel, con 5 ejemplos.

### Aprender a cocinar

> Dame la receta tradicional de la tortilla española, paso a paso, para principiantes.

### Resolver dudas cotidianas

**1. Salud:**
> Tengo dolor de cabeza desde hace 2 días. ¿Debería ir al médico? ¿Qué puedo hacer mientras?

> **Aviso:** Meta AI no es médico. Para síntomas serios, acude a un profesional.

**2. Tecnología:**
> Mi móvil no carga. ¿Qué puedo hacer?

**3. Legal:**
> ¿Cuántos días de vacaciones me tocan por ley en España?

**4. Cocina:**
> ¿Cómo sustituyo el huevo en una receta si soy alérgico?

**5. Manualidades:**
> ¿Cómo arreglo un agujero en la pared?

### Para los niños

> Mi hija de 8 años no entiende las fracciones. Explícaselas con ejemplos visuales y dale 5 ejercicios.

> Crea un cuento corto en español sobre un perro viajero, para niños de 6 años.

### Para estudios

> Explícame la historia de España en 10 puntos clave.

> Resumen de "Don Quijote de la Mancha" en español sencillo, 1 página.

### Pedir explicaciones por niveles

> Explícame la fotosíntesis como si tuviera 10 años.

> Explícamelo ahora a nivel universitario.

> **Truco:** Combina Meta AI con YouTube. Pide explicaciones y busca vídeos para complementar.`,
      tips: [
        'Pide explicaciones "como si tuviera 10 años" para temas simples.',
        'Para síntomas médicos, acude siempre a un profesional.',
        'Combina Meta AI con vídeos de YouTube.',
      ],
      exercise: 'Pídele a Meta AI que te explique un tema que no entiendas. Pídele ejemplos prácticos.',
    },
    {
      id: 'meta-07',
      title: 'Escribir mensajes y correos',
      duration: '10 min',
      content: `## Redacción en WhatsApp

Meta AI puede redactar mensajes y correos directamente en tu chat.

### Mensajes formales

> Redacta un mensaje de WhatsApp formal para mi casero pidiéndole que arregle la nevera.

### Correos electrónicos

> Escribe un correo formal a mi jefe pidiendo un día de libre por motivos médicos. Tono profesional.

### Cartas de presentación

> Redacta una carta de presentación para un puesto de camarero en Madrid. Tengo 4 años de experiencia.

### Mensajes para entrevistas

> Redacta un mensaje de WhatsApp para confirmar mi asistencia a una entrevista mañana a las 10h.

### Disculpas y agradecimientos

> Escribe un mensaje para disculparme con un amigo por no ir a su cumpleaños. Tono amable.

> Escribe un mensaje de agradecimiento a una persona que me ayudó a encontrar piso. Tono sincero.

### Cartas oficiales

> Redacta una carta al Ayuntamiento solicitando información sobre ayuda al alquiler. Tono administrativo.

### Invitaciones

> Redacta una invitación de cumpleaños para 20 personas, por WhatsApp. Tono festivo, español.

### Mensajes para vender

> Voy a vender una mesa en Wallapop. Escribe una descripción atractiva, en español, destacando: estado, dimensiones, precio.

### Responder a mensajes difíciles

Si recibes un mensaje y no sabes cómo responder:

> (Pega el mensaje recibido) ¿Cómo debería responder? Dame 3 opciones con distintos tonos.

### Personalizar

Siempre puedes pedir:

- "Más formal"
- "Más amable"
- "Más corto"
- "En otro idioma"`,
      tips: [
        'Pega mensajes recibidos para que Meta AI te ayude a responder.',
        'Pide siempre el tono: formal, amable, urgente.',
        'Guarda plantillas en tus notas para reutilizar.',
      ],
      exercise: 'Pídele a Meta AI que redacte un correo formal para pedir cita médica.',
    },
    {
      id: 'meta-08',
      title: 'Privacidad y límites',
      duration: '10 min',
      content: `## Privacidad en Meta AI

### Cómo maneja Meta tus datos

Meta (Facebook, WhatsApp, Instagram) usa tus interacciones con Meta AI para mejorar el servicio.

### Qué NO debes compartir

- ❌ Datos bancarios
- ❌ Número de pasaporte
- ❌ Contraseñas
- ❌ Información médica sensible
- ❌ Dirección exacta de tu casa

### Mensajes privados vs Meta AI

- **Tus chats privados con personas** NO se usan para entrenar Meta AI (según la política de Meta).
- **Tus chats con Meta AI** SÍ pueden usarse para mejorar el modelo.

### Configuración

1. Entra en **meta.ai** o en la configuración de WhatsApp.
2. Ve a "Meta AI" → "Privacy".
3. Puedes borrar conversaciones.
4. Puedes desactivar el entrenamiento con tus datos (en algunos países).

### Cuidado con la información falsa

Meta AI **puede equivocarse** o inventar datos. Para temas importantes:

1. **Verifica con fuentes oficiales**.
2. **Compara con otras IAs** (ChatGPT, Perplexity).
3. **Consulta con profesionales** (abogados, médicos, asistentes sociales).

### Limitaciones actuales

- No puede programar alarmas en tu móvil.
- No puede enviar emails por ti (solo redactarlos).
- No puede hacer llamadas telefónicas.
- No puede acceder a tu cuenta bancaria.
- No puede verificar documentos legales complejos.

### Cuándo usar Meta AI vs otras IAs

| Tarea | Mejor IA |
|---|---|
| Mensajes rápidos en WhatsApp | Meta AI |
| Análisis de contrato | Claude |
| Investigación con fuentes | Perplexity |
| Cálculos matemáticos | DeepSeek |
| Integración con Google | Gemini |
| Integración con Microsoft | Copilot |
| Traducciones chino-árabe | Qwen |
| Tareas generales | ChatGPT |

> **Recomendación:** Meta AI es excelente para tareas rápidas del día a día. Para temas serios, usa otras IAs especializadas.`,
      tips: [
        'No compartas datos sensibles con Meta AI.',
        'Verifica temas importantes con fuentes oficiales.',
        'Combina Meta AI con otras IAs según la tarea.',
      ],
      exercise: 'Revisa tu configuración de Meta AI en WhatsApp. Borra conversaciones sensibles.',
    },
  ],
};

// ------------------------------------------------------------
// EXPORT
// ------------------------------------------------------------
export const AI_COURSES: AICourse[] = [
  chatgptCourse,
  geminiCourse,
  copilotCourse,
  claudeCourse,
  deepseekCourse,
  qwenCourse,
  perplexityCourse,
  metaAiCourse,
];

console.log('AI courses:', AI_COURSES.length);
