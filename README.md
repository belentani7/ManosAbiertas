# ManosAbiertas

[![Build](https://github.com/belentani7/ManosAbiertas/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/belentani7/ManosAbiertas/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Parte del ecosistema educativo Belentani / NOIACORE:** [índice de plataformas, material y estado](../INDEX.md).

- Build de GitHub Actions (rama principal; la ejecución más reciente observada pasó el 2026-10-05): [ver workflow](https://github.com/belentani7/ManosAbiertas/actions/workflows/build.yml)
- [Licencia MIT](LICENSE)

Plataforma educativa gratuita: cursos de IA y Office, creador de CV y recursos para migrantes.

> El estado de los badges refleja ejecuciones reales de GitHub Actions; la cobertura educativa y la revisión de fuentes no se presentan como completas hasta verificarlas.

## Empieza a aprender

- [Alfabetización en IA para la Vida Real](campus/cursos/alfabetizacion-ia/syllabus.md) — empieza por el syllabus y sigue las prácticas semanales.
- [Creador de currículum](#qué-incluye) y [cursos de Office](campus/cursos/office-sin-miedo/syllabus.md).
- [Índice de cursos y plataformas de este repo](INDICE-EDUCATIVO.md).

Los cursos buscan ser gratuitos y reutilizables. Antes de adaptar o redistribuir un recurso externo, comprueba su licencia y atribución; una URL pública no significa que tenga licencia abierta.

## Cómo se aprende

Cada módulo debe indicar objetivos observables, explicación accesible, práctica guiada, reto independiente, comprobación con feedback y reflexión. Las evaluaciones son para aprender y demostrar habilidades, no prometen acreditaciones oficiales. Lee [la guía de diseño educativo](docs/GUIA-DISENO-EDUCATIVO.md) antes de añadir un curso.

## Verificación local

Para aprender también cómo validar la guía, empieza por [`docs/GUIA-DISENO-EDUCATIVO.md`](docs/GUIA-DISENO-EDUCATIVO.md). Esta auditoría ejecutó los comandos de abajo en el checkout local; los badges públicos solo se actualizarán cuando los cambios se integren y corran en GitHub Actions.

Requiere Node.js 22 y las dependencias del proyecto (`npm ci`):

```bash
npm run typecheck
npm run test:core
npm run i18n:verify
npm run trust:verify
npm run accessibility:verify
npm run build
```

## Qué es

Formación **gratuita y práctica** para personas que llegan y necesitan herramientas concretas:
ofimática, inteligencia artificial aplicada, un currículum que funcione. Sin registro, sin
coste, sin barreras innecesarias.

En línea: <https://manos-abiertas-psi.vercel.app>

## Qué incluye

- Cursos de IA y Office
- Creador de currículums
- Guías de derechos
- Recursos para comunidades migrantes

## Accesibilidad

Es parte del objetivo, no un extra: el público incluye personas con poca familiaridad digital
y distintas lenguas. **PT > ES > EN > CA.**


