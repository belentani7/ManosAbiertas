# Manos Abiertas — capa institucional HTML (29-10-2026)

La capa institucional funciona como sitio estático de presentación y orientación. **No reemplaza la aplicación Next.js** (`src/`) ni el campus existente (`campus/`).

## Arquitectura

- `index.html`: propuesta de valor y selección por necesidades.
- `orientacion.html`: selector local de rutas, sin servidor ni cuenta.
- `programas.html`: catálogo que conduce a syllabus existentes.
- `empleo.html`: práctica inicial y archivo TXT de CV editable.
- `recursos.html`: fuentes oficiales y filtro por temática.
- `proyecto.html`: misión, límites y transparencia.
- `assets/brand.css`: sistema visual responsive y estados de foco/reduced motion.
- `assets/site.js`: menú, selector de rutas y filtro; sin dependencias.
- `tests/core/landing-a11y.test.mjs`: contrato de metadatos, enlaces y seguridad de rutas.

**Posicionamiento**: “Educación para avanzar”. Público principal: personas recién llegadas y adultos que quieren habilidades digitales, empleo e idiomas con cero presión de registro. Voz: digna, útil, calmada; no paternalista, sin cifras de impacto inventadas. CTA principal: elegir objetivo y comenzar en materiales existentes.

## Identidad

- Papel `#faf7f1`, tinta `#142c27`, verde institucional `#16463e`, terracota `#b94f2e`, salvia `#dfebe2`.
- Tipografía progresiva: Manrope / DM Sans, con fallback de sistema. La disponibilidad de Google Fonts **no condiciona la legibilidad**.
- Símbolo: dos trazos abiertos como manos + punto de posibilidad, SVG propio sin imágenes de terceros.
- Hero: ilustración SVG original embebida, sin derechos externos ni estadísticas inventadas.

## Reglas editoriales y operativas

- Enlaces externos a organismos públicos no implican afiliación ni validación institucional de Manos Abiertas.
- Revisar periódicamente fuentes oficiales y la fecha de la revisión.
- La base estática no promete exportar PDF, certificados, asesoramiento legal, colocación laboral ni cuentas de usuario.
- La aplicación Next.js tiene funciones propias: su privacidad y disponibilidad deben evaluarse de forma separada.
- Para publicar GitHub Pages, comprobar base path y que el hosting sirva archivos estáticos de raíz; para publicar Next.js usar su configuración existente.

## Validación

`node --test tests/core/landing-a11y.test.mjs`

Después, ejecutar las comprobaciones generales y un recorrido manual móvil, desktop, teclado, enlaces y campus antes de declarar un despliegue completo.
