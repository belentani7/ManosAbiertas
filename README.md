# ManosAbiertas

Plataforma educativa gratuita: cursos de IA y Office, creador de CV y recursos para migrantes.

## Qué es

Formación **gratuita y práctica** para personas que llegan y necesitan herramientas concretas:
ofimática, inteligencia artificial aplicada, un currículum que funcione. Sin registro, sin
coste, sin barreras innecesarias.

Publicación: pendiente. El despliegue en <https://manos-abiertas-psi.vercel.app> no está disponible en este momento; para usar la plataforma en local, consulta «Puesta en marcha» más abajo.

## Qué incluye

- Cursos de IA y Office
- Creador de currículums
- Guías de derechos
- Recursos para comunidades migrantes

## Biblioteca HTML del currículo

La compilación publica **832 páginas de lección** a partir del currículo existente: 8 módulos × 26 niveles × 4 ediciones de idioma (ES, PT, CA, EN). La fuente sigue en `public/contenido/curriculum/`; el lector generado vive en `/curriculum-html/` y no inventa niveles, certificaciones ni progreso.

- Ruta del catálogo en la aplicación: `/curriculum-html/index.html` (se genera durante el build; no es una fuente manual del repositorio).
- Verificación: `pnpm build` y `pnpm test:core` regeneran y comprueban los 832 documentos, sus idiomas, navegación, enlaces, seguridad Markdown y textos no duplicados.
- El enlace también está en el inicio y el campus estático para que se pueda encontrar sin conocer la ruta.

## Accesibilidad

Es parte del objetivo, no un extra: el público incluye personas con poca familiaridad digital
y distintas lenguas. **PT > ES > EN > CA.**

## Puesta en marcha

Requisitos: Node 18+ y pnpm 10.

```bash
pnpm install
pnpm dev        # aplicación Next.js en http://localhost:3000
```

Otros comandos: `pnpm build` (genera contenidos, iconos PWA y cliente Prisma antes de `next build`), `pnpm lint`, `pnpm typecheck`, `pnpm test:core` y los verificadores `pnpm i18n:verify`, `pnpm accessibility:verify`. El campus estático vive en [`campus/`](campus/) (abre `campus/index.html` o sírvelo como archivos estáticos).

## Licencia

MIT (ver [`LICENSE`](LICENSE)).

---

## Parte del indice educativo

Esta plataforma forma parte del conjunto educativo de **Belentani / NOIACORE**:
formacion gratuita y abierta. El indice completo, con material y estado de cada una,
vive en este repositorio: [`INDICE-EDUCATIVO.md`](INDICE-EDUCATIVO.md).

| Plataforma | Que ensena | Enlace |
|---|---|---|
| Open School | Instituto digital universal | publicacion pendiente |
| ManosAbiertas | IA y ofimatica para recien llegados | publicacion pendiente |
| WILLIAMSCHOOL | Escuela comunitaria (curriculo Nepal) | https://williamschool.vercel.app |
| UX Academy | Diseno UX/Producto, trilingue | https://ux-academy-professional.vercel.app |
| Aprende Brasil | Educacion para Brasil | https://aprende-brasil.vercel.app/ |
| Lingua Aberta | Idiomas, progresion CEFR | publicacion pendiente |
| Cruzando el Charco | Acogida y arraigo | publicacion pendiente |
| secure-t | Ciberseguridad e IA | publicacion pendiente |

**PT > ES > EN > CA.** Gratuito, accesible (WCAG) y conectado.

## Campus consolidado — 22 octubre 2026

El repositorio canónico integra el lector de cursos del campus, práctica evaluable con progreso local, precarga offline delimitada y exportación de lecciones de Nivel 0. El campus complementa la aplicación Next.js existente y conserva el contenido educativo original.

La entrega actual incluye unidades ampliadas de **Office sin Miedo**, **Puente PT–ES** y un examen PT–ES de 40 casos con retroalimentación. La CI ejecuta comprobaciones específicas para el contenido de ciberseguridad y para la estructura de los cursos generados, además de los tests del proyecto.

El contenido educativo es material de práctica. No constituye certificación institucional ni asesoramiento jurídico personalizado.


## Uso

Instala dependencias y ejecuta el proyecto:

```powershell
# Dependencias
npm install

# Desarrollo
npm run dev

# Pruebas
npm test

# Construcción de producción
npm run build
```

Consulta `package.json` para la lista completa de scripts disponibles.

<!-- repo-forge:readme:inicio -->
## Qué es

**Manos Abiertas** — plataforma educativa abierta (cursos + CV + derechos).

Convertir conocimiento que ya existe en una ruta que una persona real puede recorrer hoy, sin pagar y sin que le pidan datos.

## Estado medido

| Dato | Valor |
|---|---|
| Lenguajes | Markdown, TypeScript, JSON, HTML, JavaScript, YAML |
| Archivos / líneas | 1523 / 190577 |
| Páginas HTML | 102 |
| Tests detectados | 56 |
| Cumplimiento de reglas | 36/37 (97.3%) |

Todo lo anterior se midió en disco el 2026-11-10; no es una estimación.

## Uso

```bash
npm install
npm run dev
```

## Estructura

```
apps/
assets/
brand/
campus/
data/
docs/
e2e/
mini-services/
neon-mantra/
open-data/
```

## Diseño de plataforma

- Rutas por objetivo (empleo, oficina, trámites)
- Lector de lecciones con progreso local
- Creador de CV exportable
- Guías de derechos con fecha de vigencia
- Puente lingüístico PT↔ES
- Modo aula para entidades sociales

La ficha completa —máximo potencial, marca, fases de monetización y recursos— vive en
[`plataforma/FICHA.md`](plataforma/FICHA.md). Los tokens de marca están en
[`brand/tokens.css`](brand/tokens.css).

## Reglas del proyecto

Este repositorio sigue el catálogo oficial del ecosistema (`GH-*`, `WEB-*`, `ACC-*`,
`SEO-*`, `COH-*`, `DEV-*`). El gate se ejecuta con:

```bash
python scripts/doctor.py
```

## Licencia

MIT. Ver [`LICENSE`](LICENSE).
<!-- repo-forge:readme:fin -->
## Producto comercial

Este repositorio se vende como **cohorte patrocinada**: 25 plazas de la ruta completa para
una entidad, con kit offline, ruta impresa y dos sesiones de arranque. El alumno no paga y no
se registra.

- [`producto/OFERTA.md`](producto/OFERTA.md) — qué se vende, a quién, precio y objeciones
- [`producto/landing.html`](producto/landing.html) — página de venta autocontenida
- [`producto/precios.json`](producto/precios.json) — planes, límites e IVA
- [`producto/COBRO.md`](producto/COBRO.md) — pasarela, datos de facturación y reembolso
- [`producto/ONEPAGER.md`](producto/ONEPAGER.md) — ficha de una página
- [`producto/DEMO.md`](producto/DEMO.md) — guion de demo de 3 minutos
- [`producto/METRICAS.md`](producto/METRICAS.md) — indicadores y objetivos a 30 días

Verificación: `python tools/area_check.py producto --repo ManosAbiertas` desde la raíz del
workspace.

<!-- repo-forge:readme:fin -->
<!-- repo-forge:readme:fin -->
<!-- repo-forge:readme:fin -->
