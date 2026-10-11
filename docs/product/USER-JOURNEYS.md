# USER-JOURNEYS.md — Itinerarios humanos (Human Journey Engine)

> **Ciclo 1 · 2026-10-11** · Implementación: [`src/data/journeys.ts`](../../src/data/journeys.ts) + [`personal-route.tsx`](../../src/components/manos-abiertas/personal-route.tsx) · Tests: `tests/core/journeys.test.mjs`

## Principio

Una persona llega, **elige un objetivo** ("necesito trabajo en Barcelona", "acabo de llegar", "no sé usar el ordenador"), sigue una **ruta corta de actividades reales** y **guarda su progreso sin registrarse** (localStorage, este dispositivo). Ninguna actividad es decorativa: cada paso abre una funcionalidad real de la plataforma.

## Journeys publicados (11)

| # | id | Objetivo (resumen) | Actividades | Dónde termina |
|---|---|---|---|---|
| A | `primeras-24h` | Resolver lo urgente al llegar | 4 | Contactos humanos + guía de derechos + recursos |
| B | `independencia-digital` | 30 días de autonomía digital | 4 | Ofimática + IA + herramientas |
| C | `primera-candidatura` | Primera candidatura de empleo | 5 | CV + carta + IA + formación + entrevista |
| D | `primer-cv` | Primer CV profesional exportable | 4 | CV Studio (plantillas, contenido, ATS, PDF) |
| E | `catalan-100` | Primeras 100 palabras de catalán | 4 | Cursos + campus + juegos + simulaciones |
| F | `digital-cero` | Alfabetización digital desde cero | 4 | Móvil/correo/formularios/seguridad |
| G | `office-ia-empleo` | Office e IA para el empleo | 3 | Office + IA aplicada + proyectos |
| H | `reskilling-tech` | Recualificación tecnológica | 3 | Currículum m01–m08 + cursos + comunidad |
| I | `entender-documentos` | Entender documentos administrativos | 4 | Derechos + glosario + checklist + apoyo humano |
| J | `negocio-propio` | Empezar un pequeño negocio | 3 | Trámites + presupuesto + recursos |
| K | `comunidad` | Conectar con la comunidad | 3 | Cursos + comunidad (compartir con privacidad) |

## Metadatos de cada journey (contrato de contenido)

`title · objective · prerequisites · effort · outcome · activities[{id, title, description, section|href, verifiedRefs}]`

- **Localización**: `title/objective/prerequisites/effort/outcome` en **PT > ES > EN > CA** (prioridad del README); actividades en ES+EN con fallback.
- **Actividades reales**: cada una apunta a una `SectionId` existente (navegación interna) o a una URL https publicada (campus/app).
- **Fuentes verificadas**: `verifiedRefs` solo contiene URLs reales y documentadas.
- **Progreso sin registro**: `manos-abiertas-personal-route` en localStorage, validado y migrado por `parseSavedRoute` (acepta el formato legado de 4 metas y **conserva el progreso** de los 12 pasos antiguos).

## Criterios de aceptación (verificados en tests)

1. ≥10 journeys con ≥3 actividades cada uno. ✅
2. Ids únicos (journeys y actividades). ✅
3. Los 4 idiomas prioritarios no tienen textos vacíos a nivel de journey. ✅
4. Toda actividad tiene sección válida o enlace https. ✅
5. Toda `verifiedRefs` es https. ✅
6. Migración legada sin pérdida de progreso (4 metas, 12 pasos). ✅
7. Datos corruptos en localStorage nunca rompen la UI (devuelve null). ✅

## Escenarios de éxito que cubre (mandato §27)

- "Acabo de llegado y no entiendo los trámites" → `primeras-24h` → `entender-documentos`.
- "Necesito trabajo en Barcelona" → `primera-candidatura` (CV → carta → IA → formación → entrevista).
- "Nunca he usado Excel" → `independencia-digital` → `office-ia-empleo`.
- "Quiero aprender catalán para mi primer trabajo" → `catalan-100`.
- "Solo tengo móvil y 20 minutos al día" → todos los journeys declaran `effort` realista y actividades móviles.

## Trabajo pendiente (roadmap Fase B/C)

- Localizar el chrome de la UI de ruta (hoy en español, patrón del resto de secciones) con claves i18n del sistema de 172 claves.
- Descargas offline de materiales por actividad (lesson packs).
- Cuantificación de impacto: journeys completados (métrica anónima local, sin PII).
