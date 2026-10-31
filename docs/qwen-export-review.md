# Revisión de exportaciones Qwen para Manos Abiertas

Fecha: 2026-10-31.

## Material revisado
- `BELENTANI-THE-ARTIST-HTML-CSS-JS-WEBGL-2026-10-26.zip`
- `BELENTANI-JUDAS-HTML-CSS-JS-WEBGL-RAIN-2026-10-26.zip`
- `BELENTANI-MUSIC-HTML-CSS-JS-WEBGL-2026-10-26.zip`

Estas exportaciones describen experiencias artísticas separadas. No son currículo de Manos Abiertas ni autorizan copiar sus imágenes, audio, shaders, scripts, CSS o texto.

## Mejoras compatibles aplicadas aquí
- Mantener la identidad educativa existente (verde pino, papel cálido y el CSS canónico del currículo), sin trasladar estilos de los proyectos artísticos.
- Mantener una fuente de contenido por lección y generar desde esa fuente las 832 páginas traducidas.
- Exponer la biblioteca desde dos entradas ya existentes: inicio institucional y campus.
- Hacer explícitos los límites de cada entrega: material educativo abierto; no equivale a certificación.

## Evidencia técnica
- `scripts/generate-curriculum-html.mjs`
- `tests/core/curriculum-html-publication.test.mjs`
- `public/contenido/curriculum/curriculum-pages.css`

Se conserva solo el aprendizaje de proceso (separación de productos, procedencia y alcance veraz); no se importan activos de Qwen.
