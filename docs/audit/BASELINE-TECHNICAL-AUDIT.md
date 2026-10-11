# BASELINE-TECHNICAL-AUDIT.md — Auditoría técnica de línea base

> **Fase A (ciclo 1) · 2026-10-11** · Rama `arena/7c0760e5-manosabiertas` · Base: `fd66b3f`
> Método: inspección dirigida por documentación, grafo de dependencias, entry points, rutas y modelos de datos; verificación ejecutada (tests, typecheck, scripts de verificación, npm audit). No se eliminó nada durante la auditoría.
> Contrato de funcionalidades inmutable: [`ANALISIS_ORIGINAL.md`](../../ANALISIS_ORIGINAL.md) (64 capacidades validadas).

## 1. Arquitectura real (lo que hay, no lo que la documentación promete)

| Frente | Realidad verificada |
|---|---|
| **App principal** | Next.js 16 (App Router, rutas `[locale]` × 39 idiomas) + React 19 + Tailwind 4 + Radix/shadcn. SPA de 13 secciones (`manos-abiertas-app.tsx`) + rutas dedicadas (`/cursos/[slug]`, `/curriculum`, `/dashboard`, `/herramientas`) |
| **Backend** | 8 Route Handlers en `src/app/api/*` (chat, study-tools, cv/generate, cv/ats, cover-letter, community, health, raíz JSON) con Zod, rate limiting, límites de body, CSP y whitelist JSON-only en `middleware.ts` |
| **IA** | Cliente multi-proveedor por `fetch` (`ai-provider.ts`, ~10 proveedores + cadena de fallback), `chat-engine.ts` (loop de tool-calls), `offline-tutor.ts` (fallback determinista), consentimiento remoto (`remote-ai-consent`) |
| **Persistencia** | Prisma 6 + SQLite (`User/Course/Lesson/Enrollment/LessonProgress/Certificate`) usada por `/dashboard` y `/cursos/*`; progreso real del usuario en **localStorage** (cursos, CV, chat, ruta personal) |
| **Comunidad** | Netlify Blobs (`/api/community`) con fallback local y filtrado de contenido |
| **Campus estático** | `campus/` (PWA offline-first, 3 cursos, 5 juegos Python, 33 cápsulas, agente tutor Python) desplegado en GitHub Pages junto a `index.html`, `campus.html`, `ecosistema.html` |
| **Despliegue** | **Dos frontales**: Vercel (app Next: `manos-abiertas-psi.vercel.app`) + GitHub Pages (portada estática + campus: `belentani7.github.io/ManosAbiertas/`). `deploy.yml` → Netlify (parcial); `build.yml` es un stub |
| **Contenido** | `src/data/*` (recursos 3686 con ciclo de vida de confianza, cursos IA/Office, currículum m01–m08, guía de derechos, plantillas CV, eventos), `public/contenido/curriculum/`, `open-data/` |

## 2. Salud verificada (evidencia de este ciclo)

| Comprobación | Resultado | Evidencia |
|---|---|---|
| TypeScript estricto | ✅ 0 errores | `npm run typecheck` |
| Tests core (node:test) | ✅ 87 pass / 0 fail / 2 cancelados¹ | `npm run test:core` (89 tests) |
| i18n | ✅ `I18N_OK` 39 idiomas; cobertura: 2 completos, 24 parciales, 13 beta (fallback ES) | `node scripts/verify-i18n.mjs` |
| Confianza de recursos | ✅ Lifecycle/URLs/IDs OK; 39 verificados, 3647 pendientes (no bloqueante) | `node scripts/verify-resource-trust.mjs` |
| Accesibilidad estática | ✅ con avisos manuales (diálogos Radix) | `node scripts/verify-accessibility-static.mjs` |
| Guías y herramientas | ✅ 5000 guías + 6 A4 verificadas | `tools:verify`, `guides:verify` |
| PWA | ✅ manifest (2 iconos), `sw.js` 14,9 KB, registrado en `pwa-status.tsx` | inspección |
| `npm audit --omit=dev` | ✅ **0 vulnerabilidades en runtime** (previo: 37 con 3 críticas) | `npm audit` |
| Build producción | ⚠️ Compila + gate TS en verde; la generación estática requiere red (fuentes Google + engines de Prisma) — ver §5 | `next build --webpack` |

¹ Los 2 tests cancelados (`network-json` contra hosts externos) fallan por la política de red del sandbox, no por el producto; se cancelan también en la línea base.

## 3. Clasificación de módulos (evidencia por módulo)

| Módulo | Decisión | Evidencia |
|---|---|---|
| `src/app/api/*` (8 rutas) + `api-security.ts` + `api-request-schemas.ts` | **KEEP** | Contrato funcional completo; rate limits, Zod, CSP verificados en tests (`api-security.test.mjs`, `api-request-schemas.test.mjs`) |
| `ai-provider.ts` + `provider-security.ts` | **KEEP** | Multi-proveedor con fronteras de seguridad; núcleo preservado por mandato |
| `offline-tutor.ts` + fallbacks degraded | **KEEP** | La plataforma funciona sin IA (verificado en tests `client-response`, `offline-tutor` de facto) |
| `src/data/resources.ts` + `getResourceTrust` | **KEEP** | 3686 recursos con fuente/fecha; es la base del nuevo flujo MAIA |
| `personal-route.tsx` → **motor de itinerarios** | **IMPROVE** ✅ hecho en este ciclo | Era 4 metas × 3 pasos sin metadatos; ahora `src/data/journeys.ts` (11 itinerarios A–J + comunidad) con objetivo, prerrequisitos, esfuerzo, actividades reales, fuentes verificadas, resultado y migración de datos legados |
| `ai-assistant.tsx` + `/api/chat` → **MAIA** | **IMPROVE** ✅ hecho en este ciclo | Sin marca MAIA, sin citas, sin presupuesto; ahora fuentes verificadas citadas, presupuesto diario (30 cliente / 48 servidor) y degradación elegante |
| `src/i18n` (39 idiomas) | **IMPROVE** | Prioridad PT>ES>EN>CA del README no reflejada en cobertura de UI (CA 13 %, PT 62 %); los nuevos itinerarios sí se publican en las 4 lenguas prioritarias |
| `campus/` + juegos + `agente/tutor.py` | **KEEP** | PWA offline funcional; workflow `tutor-ia.yml` activo (cápsulas diarias) |
| `prisma/` + `/dashboard` + `/cursos/*` | **IMPROVE** | Esquema OK; `/dashboard` hardcodea usuario demo (`student@manosabiertas.org`) y `new PrismaClient()` por módulo (sin pool); candidato a capa de datos tipada |
| `chat-engine.ts` loop de tool-calls | **REFACTOR** | Ejecución de herramientas es un **placeholder** (`{ result: 'Tool execution placeholder' }`); no es un flujo agéntico real aún |
| `agent-registry.ts` (705 líneas) | **REFACTOR/MERGE** | Duplica interfaces `ChatMessage/ChatRequest/ChatResponse` de `chat-engine.ts`; funciones `createAgent(config: any): any`; sin consumidores comprobables en la UI |
| `rag-engine.ts` | **ARCHIVE (evaluar)** | Diseño de embeddings OpenAI (coste, red) que contraviene la restricción de coste; el retrieval determinista del catálogo cubre el primer caso de uso |
| `DigitalInsects.tsx`, `MatrixRain.tsx`, `SpaceShipTrail.tsx`, `WaterRain.tsx`, `FloatingAgent.tsx`, `accessibility-panel.tsx` | **REMOVE (propuesto)** | **Código muerto**: cero referencias en todo `src/` (verificado por grafo de imports) |
| `next.config.ts` cabeceras + CSP | **KEEP** | Seguridad por defecto sólida; `ignoreBuildErrors: false` correcto |
| `packages/dashboard`, `apps/manos-abiertas`, `mini-services/`, `neon-mantra/` | **REMOVE (propuesto)** | Estructura esquelética sin producto (stub Next, .gitignore vacío, .gitkeep, 1 fichero Java huérfano) |
| `index.html`, `campus.html`, `ecosistema.html` (raíz) | **KEEP** | No son duplicados accidentales: son la portada estática de GitHub Pages (PT), distinta de la app Next |
| `docs/world-class/improvements-3000.jsonl` | **MERGE → decisiones** | Backlog combinatorio inflado; ver [WORLD-CLASS-BACKLOG-REVIEW.md](WORLD-CLASS-BACKLOG-REVIEW.md) |
| Scripts de verificación (`scripts/verify-*`, `test-core.mjs`) | **KEEP** | Gates reales del proyecto; mantenidos y extendidos con tests nuevos |
| `middleware.ts` whitelist API | **KEEP** | Superficie de API cerrada por defecto (404 JSON) |

## 4. Inconsistencias y riesgos detectados

1. **Licencia** (resuelta este ciclo): `package.json` declaraba `AGPL-3.0-only` frente a `LICENSE` MIT. Unificado a **MIT** (fuente de verdad: `LICENSE`; atribución a Pedro Belentani intacta).
2. **Dependencias sin uso** (resueltas este ciclo): `omniroute` (crítico), `z-ai-web-dev-sdk`, `next-auth`, `@dnd-kit/*`, `@tanstack/react-query` — ~820 paquetes fuera del árbol.
3. **Doble lockfile**: `package-lock.json` + `pnpm-lock.yaml` (desincronizado). Operativo: npm (CI y deploy usan `npm ci`).
4. **`eslint` sin flat config**: `npm run lint` no ejecuta (ESLint 9 requiere `eslint.config.*`).
5. **Tests E2E/visual/a11y automatizada inexistentes** (Playwright/axe-core): el gate es node:test + verificadores estáticos propios.
6. **Build dependiente de red en build-time**: `next/font/google` (Geist) y `prisma generate` (engines). En despliegue real funciona; limita la autonomía del build.
7. **`/api/chat` tool-loop placeholder** y `agent-registry` duplicado (ver §3).
8. **Pendiente del issue #2** (descartado por decisión del usuario): ramas `tool-simulators` y `omega-visual-overhaul` del repo de respaldo.

## 5. Salud de build, coste y operación

- **Coste actual**: todo estático + serverless. IA solo cuando el usuario da consentimiento (con presupuestos 30/día cliente + 48/día servidor y rate limits por ráfaga). Sin Redis/K8s/colas/BDD vectoriales. Coste marginal ≈ hosting gratuito (Vercel/Netlify/GH Pages) + inferencia IA opcional.
- **Drivers de coste futuros**: inferencia IA (acotada por presupuesto), almacenamiento Netlify Blobs (comunidad), engines Prisma en build.
- **Build script**: `generate-pwa-icons → prisma generate → next build → copy-build` — funciona en CI/deploy con red; el sandbox exige mock de fuentes y engines pre-generados (limitación del entorno, no del producto).

## 6. Precisión de la documentación existente

- `README.md`: correcto y honesto; pendiente sección "qué hay de nuevo" del ciclo (se actualizará en Fase H).
- `UNIVERSO-EDUCATIVO.md`: cifras del 2026-09-30 (inventario, no recuento actual) — aceptable tal como está etiquetado.
- `package.json` `name: nextjs_tailwind_shadcn_ts`: nombre de scaffolding heredado (el nombre del **repositorio** `ManosAbiertas` se preserva; ver REGLA 1).
- `docs/world-class/*`: ver revisión específica en [WORLD-CLASS-BACKLOG-REVIEW.md](WORLD-CLASS-BACKLOG-REVIEW.md).

## 7. Próximos pasos priorizados

Ver [`IMPLEMENTATION-ROADMAP.md`](../roadmap/IMPLEMENTATION-ROADMAP.md). Los ítems P0 de este ciclo están **completados**; el backlog heredado de 3000 propuestas queda curado en la revisión asociada.
