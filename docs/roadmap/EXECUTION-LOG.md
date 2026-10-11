# EXECUTION-LOG.md — Registro de ejecución

Formato por ciclo: **QUÉ SE ENCONTRÓ · QUÉ SE CAMBIÓ · QUÉ FUNCIONA · QUÉ FALLÓ · QUÉ QUEDA · IMPACTO EN RECURSOS · EVIDENCIA**.

---

## Ciclo 1 — Baseline + Itinerarios + MAIA v1 (2026-10-11)

Rama: `arena/7c0760e5-manosabiertas` · Alcance: primera ejecución recomendada (auditoría → verificación → objetivo/ruta/progreso sin registro → primer flujo MAIA → PR con evidencias).

### QUÉ SE ENCONTRÓ

1. **`personal-route.tsx` ya implementaba** objetivo → pasos → progreso en localStorage (4 metas × 3 pasos), pero sin prerrequisitos, esfuerzo, fuentes ni resultados, solo en español y con datos frágiles (validación por nombres de texto en contactos, etc.).
2. **Bug real en contactos**: el filtro de "Emergencias principales" buscaba nombres inexistentes (`'112 - Emergencias'` vs `'112 Emergencias'`) → **la cuadrícula de emergencias salía vacía** (corregido y blindado con tests en el ciclo previo de esta misma rama).
3. **Código muerto confirmado por grafo de imports**: `DigitalInsects.tsx`, `MatrixRain.tsx`, `SpaceShipTrail.tsx`, `WaterRain.tsx`, `FloatingAgent.tsx`, `accessibility-panel.tsx` (cero referencias).
4. **`chat-engine.ts` ejecuta herramientas como placeholder** (`{ result: 'Tool execution placeholder' }`) y `agent-registry.ts` (705 líneas) duplica interfaces de chat con tipos `any`.
5. **`improvements-3000.jsonl` es una matriz combinatoria** (30 superficies × 10 contextos × 10 lentes) con 3000 entradas `proposed` sin triaje: backlog inflado, no plan de trabajo.
6. **Sin fuentes citadas ni límites de consumo** en el asistente IA; sin marca MAIA; el chat funcionaba con IA o tutor offline pero sin contenido verificable.
7. **Build requiere red en build-time** (Geist de Google Fonts, engines de Prisma): funciona en CI/deploy real; el sandbox necesita mocks (limitación ambiental documentada).
8. **`npm audit` de la base heredada**: 37 vulnerabilidades (3 críticas) — ya resuelto en commits previos de esta rama a 0 en runtime.

### QUÉ SE CAMBIÓ

1. **`src/data/journeys.ts`** (nuevo): motor de itinerarios con 11 journeys (A–J del mandato + comunidad), metadatos completos (objetivo, prerrequisitos, esfuerzo, resultado), actividades reales con deep-links a secciones existentes, `verifiedRefs` con URLs reales, contenido en **PT>ES>EN>CA** y migración del formato legado sin pérdida de progreso.
2. **`src/components/manos-abiertas/personal-route.tsx`**: consume el motor, UI con esfuerzo/prerrequisitos/resultado, enlaces de fuentes verificadas, selección de meta por idioma del usuario.
3. **`src/lib/maia.ts`** (nuevo): búsqueda determinista sobre el catálogo verificado (3686 recursos, insensible a acentos, PT/ES/EN/CA), etiquetas de confianza (OFFICIAL SOURCE / REVIEWED COMMUNITY RESOURCE / VERIFICATION REQUIRED), composición de respuestas citadas en 4 idiomas, presupuesto diario local (30/día) y validación defensiva de fuentes de red.
4. **`src/app/api/chat/route.ts`**: fuentes verificadas en todas las respuestas (incluidas degraded), bloque de fuentes con reglas de cita en el prompt, límite diario de IA (48/día) con degradación elegante a respuesta determinista (nunca rompe la utilidad).
5. **`src/components/manos-abiertas/ai-assistant.tsx`**: marca **MAIA**, chips de fuentes citadas (título, etiqueta, fecha), indicador de presupuesto diario, modo sin IA explícito y fallback local con recursos (funciona sin red).
6. **Tests**: `tests/core/journeys.test.mjs` (7) + `tests/core/maia.test.mjs` (7) — integridad de catálogo, migración de progreso, idiomas, URLs, presupuesto y defensa contra payloads manipulados.
7. **Documentación**: `docs/audit/BASELINE-TECHNICAL-AUDIT.md`, `docs/audit/WORLD-CLASS-BACKLOG-REVIEW.md`, `docs/product/USER-JOURNEYS.md`, `docs/ai/MAIA-ARCHITECTURE.md`, `docs/roadmap/IMPLEMENTATION-ROADMAP.md`, este log.

### QUÉ AHORA FUNCIONA (verificado de extremo a extremo)

- ✅ Una persona **elige un objetivo** (11 opciones), **sigue un itinerario** con actividades que abren funcionalidad real y **guarda su progreso sin registrarse** (localStorage, con migración del formato anterior).
- ✅ **MAIA responde con recursos verificados citados** (fuente + etiqueta + fecha), en las 4 lenguas prioritarias, **sin IA y sin red** cuando hace falta; con IA cuando hay consentimiento y presupuesto.
- ✅ **Presupuesto de consumo de IA** en dos capas (30/día cliente, 48/día servidor) con degradación elegante y saldo nunca negativo.
- ✅ La plataforma sigue siendo útil sin IA disponible (búsqueda del catálogo empaquetado + tutor offline).

### QUÉ FALLÓ / LIMITACIONES CONOCIDAS

- ⚠️ 2 tests de red (`network-json`) se **cancelan** en el sandbox (política de red): idéntico a la línea base, no son regresiones.
- ⚠️ El build completo en sandbox exige mock de Google Fonts y engines de Prisma pre-generados; **compilación y gate TypeScript sí pasan** (`next build --webpack` + `tsc`); la generación estática llega a 653/871 páginas hasta requerir el query engine.
- ⚠️ Tool-calling del chat sigue siendo placeholder (Fase D1) — no se ha prometido como funcional.
- ⚠️ Chrome de la UI nueva (itinerarios/MAIA) en español, al patrón del resto de secciones (localización completa en Fase B2).

### QUÉ QUEDA (priorizado)

Ver [`IMPLEMENTATION-ROADMAP.md`](IMPLEMENTATION-ROADMAP.md). Siguientes P1: B1 (lint operativo), B3 (axe/Playwright), D1 (tool-calling real allowlistado), D3 (explicador de documentos), E1 (DOCX/Europass), F1–F2 (navegador cívico territorial), H1 (E2E de flujos críticos).

### IMPACTO EN RECURSOS

- **Dependencias nuevas: 0** (todo con las existentes: zustand/localStorage, catálogo estático, fetch existente).
- **Coste operativo: 0 adicional** — el flujo MAIA v1 es determinista; la inferencia IA sigue acotada por consentimiento + presupuestos + rate limits.
- **Complejidad: −820 paquetes** (ciclo previo) y +2 módulos propios pequeños (`journeys.ts`, `maia.ts`) con tests.
- **Infraestructura: sin cambios** (mismo monolito Next.js, mismos despliegues).

### EVIDENCIA

| Qué | Dónde |
|---|---|
| Contrato validado | `ANALISIS_ORIGINAL.md` (64 capacidades + resoluciones) |
| Commits de este ciclo | rama `arena/7c0760e5-manosabiertas` (mensajes `fix(contacts)`, `feat(journeys)`, `feat(maia)`, `docs(audit)`) |
| Tests | `npm run test:core` → **89 tests, 87 pass, 0 fail** (2 cancelados de red) |
| Typecheck | `npm run typecheck` → 0 errores |
| Verificadores | `verify-i18n` I18N_OK · `verify-resource-trust` OK · `verify-accessibility-static` OK · `tools/guides:verify` OK |
| Seguridad | `npm audit --omit=dev` → **0 vulnerabilities** |
| Itinerarios | `tests/core/journeys.test.mjs`, `docs/product/USER-JOURNEYS.md` |
| MAIA | `tests/core/maia.test.mjs`, `docs/ai/MAIA-ARCHITECTURE.md` |
| Auditoría | `docs/audit/BASELINE-TECHNICAL-AUDIT.md`, `docs/audit/WORLD-CLASS-BACKLOG-REVIEW.md` |
