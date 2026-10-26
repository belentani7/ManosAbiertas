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
