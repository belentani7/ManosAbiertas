# Revisión de exportaciones Qwen aplicadas a Manos Abiertas

Fecha: 2026-10-31.

## Exportaciones recuperadas

Se leyeron íntegramente estos cuatro archivos de conversación guardados en la Library:

- `chat-Bellacore Automatización Integral.txt`
- `chat-Desarrollo Web El Racó.txt`
- `chat-Motor de Extracción Leads con Visor Web (2).txt`
- `chat-Universal Project Integration.txt`

El archivo conserva referencias y fragmentos, pero las búsquedas de Library no localizaron los ZIP mencionados dentro de los chats. Por tanto, no se afirma haber recuperado ni instalado esos binarios.

## Mejoras aplicadas en este repositorio

- Separar currículo fuente y publicación generada. Las 832 lecciones HTML salen de Markdown versionado y mantienen la identidad verde y papel cálido ya existente.
- Añadir entradas al catálogo desde la portada y el campus, con pruebas para la ruta pública real.
- Añadir pruebas de foco visible, enlace para saltar al contenido, movimiento reducido e impresión.
- Reducir permisos de GitHub Actions al trabajo que los necesita, desactivar persistencia de credenciales en checkouts de solo lectura y fijar las Actions a commits completos verificados.
- Registrar reglas de Cursor específicas del currículo, límites de producto y requisitos de accesibilidad.

## Ideas retenidas para otros repositorios

El chat de integración universal pide desacoplar un flujo reutilizable de creación de un producto concreto. Se trasladará a una herramienta de scaffolding en el repositorio local-agent/open-manus, manteniendo cada salida independiente y sin instalar dependencias ni abrir puertos por sorpresa.

El contenido de Bellacore/MarketLeads propone deduplicación, cuotas y exportación CSV con BOM, pero mezcla fragmentos simulados con objetivos de API real. No se aplica a Manos Abiertas: no es una función educativa ni una fuente de contenidos del currículo.

El chat de El Racó contiene referencias a un panel autenticado y a copias de seguridad locales. No se reutilizan credenciales ni se realizan cambios en esa tienda desde un transcript.

## Ideas excluidas

- Evasión de CAPTCHA, rotación de proxies o simulación de comportamiento para evitar controles de una plataforma.
- Scraping de Google Maps en lugar de una API autorizada.
- Datos de leads inventados presentados como resultados reales, secretos de API en el navegador o un coste de API descrito como cero sin evidencia.
- Copia de imágenes, audio, marca o código de proyectos ajenos al currículo.

## Evidencia verificable

- Fuente: `public/contenido/curriculum/`
- Generador: `scripts/generate-curriculum-html.mjs`
- Pruebas: `tests/core/curriculum-html-publication.test.mjs`
- CI ejecuta `scripts/publish-campus.mjs` antes de los tests, para validar la publicación generada y sus enlaces.
