# Changelog

Todos los cambios relevantes de este proyecto se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Added
- Archivos de comunidad: código de conducta, cita, plantillas de issues y PR, Dependabot.
- `ANALISIS_ORIGINAL.md`: contrato inmutable de funcionalidades validado (Fase 0).
- `src/data/main-contacts.ts`: fuente única de contactos de instituciones reales con seguimiento humano.
- `tests/core/main-contacts.test.mjs`: test de integridad del flujo de contactos (los 8 servicios de emergencia, ONGs y embajadas no pueden desaparecer).
- **Motor de itinerarios personales** (`src/data/journeys.ts` + `personal-route.tsx`): 11 journeys (objetivo → actividades reales → progreso) sin registro, con metadatos (prerrequisitos, esfuerzo, resultado), fuentes verificadas y contenido en PT>ES>EN>CA. Migración sin pérdida del formato legado.
- **MAIA v1** (`src/lib/maia.ts` + `/api/chat` + `ai-assistant.tsx`): asistente con búsqueda determinista sobre el catálogo verificado, citas con etiquetas de confianza (OFFICIAL SOURCE / REVIEWED COMMUNITY RESOURCE / VERIFICATION REQUIRED), presupuesto diario de IA (30/día cliente, 48/día servidor) y modo sin IA útil (offline).
- `tests/core/journeys.test.mjs` + `tests/core/maia.test.mjs`: 14 tests de integridad (itinerarios, idiomas, migración, URLs, presupuesto, defensa de payloads).
- Documentación de producto e ingeniería: `docs/audit/BASELINE-TECHNICAL-AUDIT.md`, `docs/audit/WORLD-CLASS-BACKLOG-REVIEW.md`, `docs/product/USER-JOURNEYS.md`, `docs/ai/MAIA-ARCHITECTURE.md`, `docs/roadmap/IMPLEMENTATION-ROADMAP.md`, `docs/roadmap/EXECUTION-LOG.md`.

### Changed
- `package.json` declara `"license": "MIT"` (fuente de verdad: `LICENSE`), eliminando la inconsistencia con AGPL-3.0-only.
- La sección de contactos muestra siempre el acceso principal de emergencias (selección por id estable, no por coincidencia de texto) y usa HTML válido sin enlaces anidados.
- `prisma` (CLI) pasa a `devDependencies`: solo se usa en build (`prisma generate`), no en runtime.

### Fixed
- Tipos de `params` async en `src/app/[locale]/cursos/[slug]` y `.../leccion/[lessonId]` (Next 16 `PageProps`): `next build` volvía a pasar su gate de TypeScript.
- `npm audit`: de 37 vulnerabilidades (3 críticas, 18 high) a 0 críticas y 3 high en tooling (transitivas de Prisma sin fix compatible); 0 en runtime puro.

### Removed
- Dependencias sin uso confirmadas en el código: `omniroute` (vulnerabilidad crítica), `z-ai-web-dev-sdk`, `next-auth`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `@tanstack/react-query` (~820 paquetes fuera del árbol de nodos).

### Security
- Eliminación de `omniroute` (RCE/DoS transitivos críticos vía next, http-proxy-middleware, onnxruntime-node, etc.).
- Override de `deepmerge-ts@^8.0.2` (corrige el DoS por stack exhaustion heredado por la cadena de Prisma).
