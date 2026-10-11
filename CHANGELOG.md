# Changelog

Todos los cambios relevantes de este proyecto se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Added
- **Tool-calling real de MAIA (roadmap D1)** (`src/lib/maia-tools.ts`): 5 herramientas allowlistadas sobre catálogos locales (`search_verified_resources`, `find_courses`, `list_journeys`, `get_journey`, `list_emergency_contacts`) con validación Zod estricta, JSON Schema OpenAI, timeout, audit log expuesto en `/api/chat` (`toolAudit[]`) y tratamiento del tool output como dato no confiable. Tests: `tests/core/maia-tools.test.mjs` (9).
- **Accesibilidad automatizada con axe-core** (`tests/core/accessibility-axe.test.mjs`): auditoría WCAG sobre componentes reales renderizados con jsdom (contactos humanos, selector y vista de itinerarios). Detectó y corrigió un bug real (`role="listitem"` ilegal en `<button>`).
- **Lint operativo**: `eslint.config.mjs` (flat config ESLint 9, preset oficial Next 16). `npm run lint` cierra con 0 errores; la deuda legada queda como warnings (ratchet).
- **`DEPENDENCIAS.md`**: inventario completo de dependencias justificadas + reglas de admisión (contrato del mandato).
- **Fuentes autoalojadas** (`geist`): build hermético sin red a Google Fonts.
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
- Errores reales detectados por los nuevos gates: `role="listitem"` ilegal en botones (axe), `Math.random` en render (pureza de hooks), comillas sin escapar en JSX (10), `prefer-const` (5), crash de `find_courses` (campo `model` vs `title` en `AICourse`), formato OpenAI de definiciones de tools.

### Removed
- **Código muerto y stubs (roadmap B4)**: 6 componentes sin consumidores (`DigitalInsects`, `MatrixRain`, `SpaceShipTrail`, `WaterRain`, `FloatingAgent`, `accessibility-panel`) y directorios stub (`apps/`, `packages/dashboard`, `mini-services/`, `neon-mantra/`); referencias obsoletas reparadas en el ledger de mejoras aplicadas y en la matriz world-class.
- Dependencias sin uso confirmadas en el código: `omniroute` (vulnerabilidad crítica), `z-ai-web-dev-sdk`, `next-auth`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `@tanstack/react-query` (~820 paquetes fuera del árbol de nodos).
- **Dependencias con 0 usos (G12)**: `uuid`, `@reactuses/core`, `date-fns`, `react-markdown`, `@tanstack/react-table`, `bun-types` (esta última además ocultaba la falta de `@types/node`). −89 paquetes.

### Security
- Eliminación de `omniroute` (RCE/DoS transitivos críticos vía next, http-proxy-middleware, onnxruntime-node, etc.).
- Override de `deepmerge-ts@^8.0.2` (corrige el DoS por stack exhaustion heredado por la cadena de Prisma).
