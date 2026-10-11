# ANALISIS_ORIGINAL.md — Contrato de funcionalidades

> **Fase 0 — Análisis y Compromiso** · Fecha de análisis: **2026-10-11**
> Repositorio analizado: [`belentani7/ManosAbiertas`](https://github.com/belentani7/ManosAbiertas)
> Commit analizado: `fd66b3f` (`tutor-ia: capsula didactica 2026-10-10 [pt]`) · Historial completo: **135 commits** · Tag: `v1.0` (2026-09-20)
> Licencia del repositorio: **MIT** — Copyright (c) 2026 Pedro Belentani

Este documento es el **contrato inmutable**: la recreación/elevación del proyecto DEBE conservar cada
funcionalidad aquí listada. Cualquier propuesta de eliminación debe justificarse explícitamente y ser
aprobada antes de implementarse.

---

## 1. Promesas funcionales (contrato inmutable)

### 1.1 Promesas explícitas del README original

| # | Funcionalidad prometida (texto del README) | Verificada en el código |
|---|---|---|
| 1 | Plataforma educativa **gratuita** | ✅ Sin registro, sin coste; `pricing-section` declara gratuidad |
| 2 | **Cursos de IA** | ✅ `learn-ai-section`, `ai-courses.ts`, `cursos/[slug]`, currículum m01–m08, campus `alfabetizacion-ia` |
| 3 | **Cursos de Office** | ✅ `office-section`, `office-course.ts`, campus `office-sin-miedo` |
| 4 | **Creador de currículums** | ✅ `cv-section`, `cv-templates.ts`, `api/cv/generate`, `api/cv/ats`, `cover-letter-builder` |
| 5 | **Guías de derechos** | ✅ `rights-section`, `rights-guide.ts`, `legal-glossary`, `plazos-calculator` |
| 6 | **Recursos para comunidades migrantes** | ✅ `resources-section` (840 recursos), `office-map`, `contacts-section`, `IMV-calculator`, `language-resource-bank` |
| 7 | Sin registro, sin coste, sin barreras innecesarias | ✅ Sin auth obligatoria; `onboarding-wizard` opcional; datos locales |
| 8 | **Accesibilidad como objetivo**, no como extra | ✅ `accessibility-panel`, `reading-mode-toggle`, `tts-button`, `docs/A11Y-CHECKLIST.md`, audits en `docs/world-class/` |
| 9 | Soporte multilingüe con prioridad **PT > ES > EN > CA** | ⚠️ 39 idiomas soportados (i18n), pero cobertura real: ES/EN 100 %, PT 62 %, CA 13 % (ver deuda #11) |
| 10 | Despliegue en línea (Vercel + GitHub Pages) | ✅ `deploy.yml` (Netlify/Vercel), `output: standalone/export`, PWA |
| 11 | Pertenencia al **índice educativo Belentani / NOIACORE** con enlace al nodo central | ✅ Sección del README + `INDICE-EDUCATIVO.md`, `UNIVERSO-EDUCATIVO.md` |

### 1.2 Capacidades implementadas verificadas (promesas de producto)

El producto real ofrece, además, todas estas capacidades al usuario final. **Ninguna puede eliminarse**
en la recreación (son "las MISMAS capacidades prometidas al usuario final" más allá del texto del README):

**A. Secciones de la aplicación (SPA con 13 secciones + rutas dedicadas)**

| # | Sección / ruta | Qué hace |
|---|---|---|
| 12 | `home` | Portada: bienvenida, primeros pasos, accesos rápidos, testimonios/FAQ |
| 13 | `learn-ai` / `/ia` | Formación en IA aplicada: cursos de ChatGPT/Gemini, prompts, privacidad |
| 14 | `cv` / `/cv` | **Creador de CV** completo: plantillas, previsualización, generación con IA (con modo offline), analizador **ATS** (score, keywords, sugerencias), **carta de presentación**, generador de cartas, checklist de documentos, plantillas de documentos |
| 15 | `office` / `/office` | Curso de ofimática (documentos, hojas de cálculo, presentaciones), oficinas y trámites |
| 16 | `resources` / `/recursos` | **Banco de recursos**: 840 recursos con ciclo de vida de verificación ("confianza"), envío de recursos por la comunidad, mapa de oficinas, directorio telefónico |
| 17 | `rights` / `/derechos` | **Guías de derechos**, glosario legal, calculadora de plazos, infografías de procesos, recursos de discapacidad |
| 18 | `tools` / `/herramientas` | Herramientas prácticas: calculadora IMV, conversor de notas, coste de vida, checklists, recordatorios, temporizador Pomodoro, generadores, **paleta de comandos** |
| 19 | `events` / `/eventos` | Calendario de eventos para la comunidad |
| 20 | `courses` / `/cursos` | Biblioteca de cursos: IA, ofimática, academias (Level 0, NOIACORE), cursos externos, cursos generados, lecciones navegables `/cursos/[slug]/leccion/[lessonId]` |
| 21 | `community` / `/comunidad` | Foro ligero de comunidad (posts persistidos, categorías legal/trabajo/ciudades/consejos) con **modo compartido y fallback local** |
| 22 | `pricing` / `/planes` | Planes y precios (transparencia: la plataforma es gratuita) |
| 23 | `contacts` / `/contactos` | Directorio de contactos útiles y trámites |
| 24 | `datos` | Panel de **datos abiertos** en vivo (World Bank, Eurostat, CountriesNow, PubMed) con gráficas |
| 25 | `/curriculum` + `/curriculum/[modulo]` | Currículum estructurado en **8 módulos (m01–m08)** con ~25 niveles cada uno |
| 26 | `/dashboard` | Progreso local del alumno (sin registro) |
| 27 | `/herramientas` | Ruta dedicada de herramientas |

**B. Asistente de IA (con contrato API propio)**

| # | Capacidad | Detalle |
|---|---|---|
| 28 | **Chat/tutor IA** (`POST /api/chat`) | Chat con contexto de sección, herramientas (function calling), streaming, **tutor offline** de fallback, ubicación opcional |
| 29 | **Herramientas de estudio** (`POST /api/study-tools`) | Preguntas de comprensión, resúmenes y flashcards sobre contenido |
| 30 | **Generación de CV** (`POST /api/cv/generate`) | Textos de CV asistidos por IA con **generador offline** de respaldo |
| 31 | **Analizador ATS** (`POST /api/cv/ats`) | Puntuación 0–100, keywords detectadas/faltantes, fortalezas, sugerencias |
| 32 | **Carta de presentación** (`POST /api/cover-letter`) | Redacción asistida con plantilla offline |
| 33 | **Comunidad** (`GET/POST /api/community`) | Posts compartidos con rate-limit y filtrado de contenido |
| 34 | **Salud** (`GET /api/health`) | Estado del producto, proveedor IA y capacidades |
| 35 | **Multi-proveedor IA** | Cadena de proveedores (Groq, NVIDIA, Qwen, ZAI, OpenAI, Anthropic, OpenRouter, local…) con límites de seguridad por proveedor |
| 36 | **Consentimiento IA remota** | El usuario controla si se envía contenido a IA externa (`remote-ai-consent`); modo offline siempre disponible |
| 37 | **Reconocimiento de voz y TTS** | Entrada por voz y lectura en voz alta de contenidos |

**C. Seguridad y robustez del API (comportamiento que debe preservarse)**

| # | Comportamiento |
|---|---|
| 38 | Validación de payloads con **Zod** en todos los endpoints |
| 39 | **Rate limiting** por endpoint (p. ej. chat 12/5 min, posts 3/h) |
| 40 | Límite de tamaño de body por endpoint (12 KB–256 KB) |
| 41 | Whitelist JSON-only de `/api/*` en middleware (404 JSON para rutas no registradas) |
| 42 | Cabeceras de seguridad: CSP estricta, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy |
| 43 | Fallbacks offline en todos los flujos de IA (tutor, CV, cartas) |

**D. Campus educativo (PWA estática `campus/`, motor compartido del ecosistema)**

| # | Capacidad |
|---|---|
| 44 | **PWA offline-first** (`sw.js`, `manifest.webmanifest`): funciona sin conexión |
| 45 | **3 cursos modulares**: `alfabetizacion-ia`, `office-sin-miedo`, `falsos-amigos-pt-es` (syllabus, semanas, quizzes, recursos) |
| 46 | **5 juegos educativos en Python**: catalán, falsos amigos PT-ES, matemáticas (escape), súper quiz, trilingüe |
| 47 | **33 cápsulas didácticas** diarias (2026-09-08 → 2026-10-10) generadas por el agente tutor |
| 48 | **Agente tutor** (`campus/agente/tutor.py`): genera cápsulas diarias y responde issues con etiqueta `tutor` (workflow `tutor-ia.yml`) |
| 49 | **Bienvenidas de voz en 4 idiomas** (CA, EN, ES, PT) |
| 50 | Cuadernos de quiz interactivos por curso (`quiz.json`) |

**E. Contenido, datos y accesibilidad**

| # | Capacidad |
|---|---|
| 51 | **i18n de 39 idiomas** (incluye RTL: árabe, persa, urdu) con prioridad PT > ES > EN > CA |
| 52 | **PWA principal**: `public/manifest.json`, `sw.js`, iconos, `og.png`, screenshots |
| 53 | **Datos abiertos**: `open-data/` + `public/open-data` + `public/datos` con registro de fuentes global |
| 54 | **Guías one-page**: 6 guías A4 premium + generador de 5000 guías de herramientas |
| 55 | **Panel de accesibilidad**: tamaño de texto, alto contraste, modo lectura, TTS |
| 56 | **Modo oscuro nativo** (next-themes) |
| 57 | **SEO**: metadata dinámica por locale, `sitemap.ts`, `robots.ts`, Open Graph, JSON-LD |
| 58 | **Progreso local** (localStorage) sin cuenta de usuario |
| 59 | **Trayectoria personal** (`personal-route`), recordatorios inteligentes, "recién vistos" |
| 60 | **Hub open source**, directorio de herramientas IA, biblioteca de banco de idiomas |

**F. Comunidad, gobernanza y ecosistema**

| # | Capacidad |
|---|---|
| 61 | Documentación comunitaria: CONTRIBUTING (Conventional Commits), CODE_OF_CONDUCT, SECURITY (private reporting), CITATION.cff, CHANGELOG, plantillas de issues/PR |
| 62 | Dependabot configurado (actualizaciones automáticas) |
| 63 | Integración con el **índice educativo NOIACORE** (tabla de plataformas hermanas) |
| 64 | Verificadores de integridad del proyecto: `i18n:verify`, `trust:verify`, `accessibility:verify`, `improvements:verify`, `strategy:verify`, `tools:verify`, `guides:verify` |

---

## 2. Stack original detectado

| Capa | Tecnología detectada | Versión |
|---|---|---|
| **Frontend** | Next.js **16** (App Router, rutas `[locale]` dinámicas) | `^16.3.5` |
| UI | React **19** + Radix UI / shadcn (48 componentes `src/components/ui`) | `^19.0.0` |
| Estilos | **Tailwind CSS v4** (`@tailwindcss/postcss`, `tw-animate-css`) | `^4` |
| Lenguaje | TypeScript 5 (`strict: true`, pero `noImplicitAny: false`) | `^5` |
| Estado | **Zustand** + hooks propios (`src/stores`, `src/hooks`) | `^5.0.6` |
| Formularios | **React Hook Form** + **Zod v4** (esquemas compartidos en `src/lib/api-request-schemas.ts`) | `7.88 / 4.0.2` |
| i18n | Sistema propio (`src/i18n`, 39 idiomas) + `next-intl` en dependencias | `^4.3.4` |
| Animación / gráficas | framer-motion 12, Recharts 2 | — |
| **Backend** | **Next.js API Routes** (`src/app/api/*`, runtime Node) | — |
| IA | Cliente multi-proveedor propio (`src/lib/ai-provider.ts`): Groq, NVIDIA, Qwen, ZAI, OpenAI, Anthropic, OpenRouter, local + function calling + RAG (`rag-engine.ts`) | — |
| Persistencia | **Prisma 6 + SQLite** (`prisma/schema.prisma`: User, Course, Lesson, Enrollment, LessonProgress, Certificate) | `^6.11.1` |
| Almacenamiento comunidad | **Netlify Blobs** (`@netlify/blobs`, store `manos-abiertas-community`) | `9.1.5` |
| Imágenes | sharp | `^0.35.3` |
| **Infra / deploy** | Vercel, Netlify (`@netlify/plugin-nextjs`), GitHub Pages (export estático) según `NEXT_OUTPUT_MODE` | — |
| Monorepo | pnpm-workspace + Turborepo (uso mínimo: `packages/dashboard` stub, `apps/manos-abiertas` casi vacío) | turbo |
| **CI/CD** | GitHub Actions: `ci.yml` (Node build+lint, Python lint), `deploy.yml` (Netlify), `build.yml` (stub), `tutor-ia.yml` (cápsula diaria + bot de issues) | — |
| PWA | Service worker + manifest (app principal y `campus/`) | — |
| **Tests** | Runner propio sobre **node:test** (`tests/core/*.test.mjs`, 18 ficheros, 69 tests) + scripts de verificación (i18n, a11y estática, confianza de recursos, mejoras) | — |
| Python | `campus/juegos/*.py` (5 juegos), `campus/agente/tutor.py`, `scripts/refresh-open-data.py` | 3.11–3.12 |
| Docs | README, INDICE-EDUCATIVO, UNIVERSO-EDUCATIVO, docs/world-class (auditorías a11y, backlog 3000 casos, registro de datos globales) | — |

**Línea base de calidad medida hoy (2026-10-11):**

- `npm run typecheck` → **0 errores**
- `npm run test:core` → **67 pass / 0 fail / 2 cancelados** (los 2 cancelados son tests de red del sandbox `network-json`, no del producto)
- `python -m compileall campus/` → OK
- `npm run lint` → **ROTO** (sin flat config de ESLint 9) — ver deuda #1
- `npm audit` → **37 vulnerabilidades** (3 críticas, 18 high) — ver sección 4
- Verificadores propios: `i18n:verify` OK (con parciales), `trust:verify` OK, `accessibility:verify` OK con avisos manuales

---

## 3. Deudas técnicas identificadas

| # | Deuda | Evidencia / impacto |
|---|---|---|
| 1 | **`npm run lint` roto**: no existe `eslint.config.*` (flat config de ESLint 9) | El CI ejecuta `npm run lint --if-present` y fallaría; el proyecto no tiene gate de estilo real |
| 2 | **Licencia inconsistente**: `package.json` declara `"license": "AGPL-3.0-only"` mientras `LICENSE`, README y GitHub dicen **MIT** | Riesgo legal de interpretación; debe unificarse a MIT (la del LICENSE y del repo) |
| 3 | **Doble lockfile** (`package-lock.json` + `pnpm-lock.yaml`) | Derivas entre gestores; CI usa `npm ci` pero el workspace es pnpm; elegir uno |
| 4 | `turbo.json` usa la clave obsoleta `pipeline` (Turborepo moderno usa `tasks`) | Warnings/rotura al actualizar turbo |
| 5 | `strict: true` anulado a medias con `noImplicitAny: false` y `target: ES2017` | TypeScript menos estricto de lo que aparenta; subir a `noImplicitAny: true` es trabajo real |
| 6 | **`prisma/dev.db` (binario SQLite) versionado en Git** | Historial que crece, datos de desarrollo en el repo |
| 7 | **Dependencias declaradas sin uso en el código**: `omniroute` (¡crítico en audit!), `z-ai-web-dev-sdk`, `next-auth`, `@dnd-kit/*`, `@tanstack/react-query` | Superficie de ataque y peso de instalación sin beneficio |
| 8 | `build.yml` es un stub (solo `actions/checkout@v3`, job llamado "Build" sin build) | Falsa sensación de CI |
| 9 | `deploy.yml`: título "Netlify & Vercel" pero solo despliega Netlify; Node 22 vs Node 20 del CI; `netlify/actions/cli@master` sin pin | Deploy frágil e inconsistente |
| 10 | Estructura muerta: `apps/manos-abiertas` (solo .gitignore/.vscode), `packages/dashboard` (stub), `mini-services/` vacío, `neon-mantra/NeonMantra.java` huérfano, `campus.html`/`ecosistema.html`/`index.html` sueltos en raíz | Confusión sobre cuál es la app real |
| 11 | **Cobertura i18n desigual**: de 39 idiomas, solo ES/EN completos (100 %); PT 62 %, CA 13 %, 24 parciales, 13 en beta con fallback a ES | El README promete prioridad **PT > ES > EN > CA** que la cobertura real no cumple aún |
| 12 | **Ciclo de vida de confianza de recursos**: 39/3686 recursos verificados (`verifiedAt`); 3647 pendientes | El trust:verify lo advierte como no bloqueante, pero es deuda de mantenimiento de datos |
| 13 | Tests: runner propio `node:test` sin cobertura medida, sin tests E2E (Playwright), sin axe-core automatizado (solo verificador estático casero) | No se puede demostrar el ≥80 % de cobertura ni Lighthouse ≥95 |
| 14 | Sin husky/lint-staged/commitlint (CONVENCIONAL commits solo por convención documentada), sin bundle-analyzer, sin Storybook, sin Docker Compose, sin `.github/workflows` de Lighthouse CI | DX por debajo del estándar 2026 propuesto |
| 15 | Trabajo pendiente documentado en **issue #2**: ramas de `ManosAbiertas-backup-v1` sin portar (`feat/tool-simulators-cv-studio-oss-hub`, `ui/omega-visual-overhaul`) y PR #8 (docs auditoría) sin resolver | Decidir portar o descartar explícitamente |
| 16 | PRs de Dependabot acumulados (6 abiertos), incluido el bump de `next` 16.3.5→16.3.6 relevante para seguridad | Mantener al día o cerrar con criterio |
| 17 | Recharts 2 deprecado (aviso de npm), ESLint 9.39 deprecado según lockfile | Actualizaciones pendientes |
| 18 | `test:core` exige generar artefactos (`generate-platform-tools`…) antes de ejecutarse; los artefactos generados viven en el repo y pueden desincronizarse | Fragilidad del pipeline de tests |

---

## 4. Dependencias vulnerables / obsoletas (`npm audit`, 2026-10-11)

**Totales: 37 vulnerabilidades — 3 críticas · 18 high · 10 moderadas · 6 bajas.**

### Críticas

| Paquete | Rango afectado | Advisory |
|---|---|---|
| `next` | 16.0.0 – 16.3.7 | RCE no autenticado en servidores Windows + RCE en Image Optimization API con AVIF |
| `omniroute` | todas | Encadena múltiples dependencias vulnerables (next, http-proxy-middleware, mermaid, monaco-editor, onnxruntime-node…) — **además no se usa en el código** |
| `proxy-addr` | 1.1.0 – 2.0.7 | IP spoofing con subredes IPv4-mapped IPv6 |

### High (selección)

| Paquete | Motivo |
|---|---|
| `sharp` ≤0.35.5-rc.1 | CVEs en libvips/libheif (CVE-2026-33327/33328/35590/35591…) |
| `@modelcontextprotocol/sdk` 1.12–1.30.1 | El cliente OAuth podría enviar credenciales al authorization server que elija el servidor MCP |
| `undici` 8.0–8.10.1 | Múltiples DoS y cache poisoning (11 advisories) |
| `adm-zip` ≤0.6.0 | Extracción vía symlinks → sobrescritura arbitraria; asignación de 4 GB |
| `onnxruntime-node` / `@huggingface/transformers` | Heredan adm-zip/global-agent/sharp |
| `micromatch`/`braces`/`fast-glob`/`source-map-js`/`deepmerge-ts`/`fast-uri`/`brace-expansion` | DoS por CPU/stack, inyección de autoridad en URIs |

**Observación:** los PRs de Dependabot #9 (`next` 16.3.6), #12 (`sharp` + `@huggingface/transformers`), #11 (`@modelcontextprotocol/sdk` 1.32.1) y #10 (`source-map-js`) atacan parte de este catálogo; `omniroute`, `z-ai-web-dev-sdk`, `next-auth`, `@dnd-kit/*` y `@tanstack/react-query` se pueden **eliminar por no usarse** (ver deuda #7).

---

## 5. Casos de uso críticos que NO pueden romperse

1. **Crear un currículum completo** (formularios, plantillas, vista previa, exportación/impresión) sin cuenta de usuario.
2. **Analizar un CV contra una oferta (ATS)** y obtener score + sugerencias, con respuesta **offline válida** si no hay IA.
3. **Generar carta de presentación** y textos de CV, con fallback offline siempre disponible.
4. **Consultar guías de derechos** y glosario legal en el idioma del usuario.
5. **Buscar recursos para migrantes** (840 recursos) y localizar oficinas/contactos de utilidad.
6. **Seguir cursos** (IA, ofimática, campus) con lecciones, quizzes y progreso local persistente.
7. **Usar el chat/tutor IA** con consentimiento explícito para IA remota y modo offline funcional.
8. **Funcionar sin conexión** (PWA + campus offline-first + fallbacks locales): público con datos móviles limitados.
9. **Accesibilidad operativa**: navegación por teclado, lector de pantalla, TTS, contraste, tamaño de texto, RTL (árabe/persa/urdu).
10. **Cambiar de idioma** (39 idiomas, prioridad PT > ES > EN > CA) sin perder la ruta activa ni el contenido.
11. **Comunidad**: leer y publicar posts con rate-limit, filtrado de contenido y modo local cuando Netlify Blobs no está disponible.
12. **Datos abiertos** del panel `/datos` con fuentes con procedencia documentada.
13. **Contrato API `/api/*`** (endpoints, códigos HTTP, esquemas Zod, rate limits, whitelist JSON-only del middleware).
14. **Cápsulas diarias del agente tutor** (workflow `tutor-ia.yml`) y respuesta a issues etiquetados `tutor`.
15. **Verificadores del proyecto** (`i18n:verify`, `trust:verify`, `accessibility:verify`, `tools:verify`, `guides:verify`, `strategy:verify`) en verde.

---

## 6. Estado del repositorio GitHub (contexto)

- **Issues abiertos**: 1 — [#2 "Reposicion ManosAbiertas: hilo unico de seguimiento"](https://github.com/belentani7/ManosAbiertas/issues/2) (consolidación de repos de respaldo; define el trabajo pendiente de portar).
- **PRs abiertos**: 7 — 6 de Dependabot (deps) + 1 de documentación (#8, "docs: auditoria completa al 100%").
- **Ramas del backup** mencionadas en #2 y sin decidir: `feat/tool-simulators-cv-studio-oss-hub`, `ui/omega-visual-overhaul`.
- **Workflow `tutor-ia.yml`** activo: commit diario automático de cápsulas (último: 2026-10-10 [pt]).

---

## 7. Resoluciones de validación (Fase 0 — paso 4) ✅

**Validado por el usuario el 2026-10-11.** Decisiones que rigen la ejecución:

1. **Contrato aceptado**: la lista de funcionalidades de las secciones 1.1 y 1.2 (n.º 1–64) es el
   contrato inmutable de desarrollo. ✅
2. **Licencia**: la fuente de verdad es **MIT** (Opción A). `package.json` corregido a
   `"license": "MIT"`; la atribución a Pedro Belentani en `README.md` se preserva intacta. ✅
3. **Sin trabajos pendientes**: las ramas del issue #2 (`feat/tool-simulators-cv-studio-oss-hub`,
   `ui/omega-visual-overhaul`) quedan **descartadas explícitamente**. El foco es compactar y
   asegurar el código actual con inversión cero y autonomía a largo plazo. ✅
4. **Dependencias**: `omniroute` (vulnerabilidad crítica) eliminada del ecosistema; igualmente
   `z-ai-web-dev-sdk`, `next-auth`, `@dnd-kit/core`/`sortable`/`utilities` y
   `@tanstack/react-query` (confirmadas sin uso). Auditoría parcheada (ver CHANGELOG). ✅
5. **Núcleo preservado**: arquitectura de Next.js Route Handlers y cliente multi-proveedor por
   `fetch`, con los límites y fronteras de seguridad por proveedor inviolables. ✅
6. **Contactos**: el flujo principal dirige de forma estática e infalible a los contactos de
   instituciones reales con seguimiento humano (`src/data/main-contacts.ts` + test de integridad). ✅
