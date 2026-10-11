# IMPLEMENTATION-ROADMAP.md — Plan de ingeniería priorizado

> **2026-10-11** · Basado en [`BASELINE-TECHNICAL-AUDIT.md`](../audit/BASELINE-TECHNICAL-AUDIT.md) y la [revisión del backlog](../audit/WORLD-CLASS-BACKLOG-REVIEW.md). Cada ítem: prioridad · beneficio · módulos · complejidad · coste · riesgos · aceptación · verificación · estado.
> Principio rector: *¿esta decisión aumenta la independencia, el conocimiento, la seguridad o la oportunidad de la persona que usa ManosAbiertas?*

## Fase A — Baseline y estabilización ✅ (ciclo 1)

| Ítem | Prioridad | Beneficio | Módulos | Complejidad | Coste | Riesgos | Aceptación | Verificación | Estado |
|---|---|---|---|---|---|---|---|---|---|
| A1. Auditoría de línea base + clasificación de módulos | P0 | Decisiones con evidencia, sin destruir | docs/audit | Baja | 0 | Ninguno | Informe publicado con evidencia | Revisión | ✅ |
| A2. Licencia unificada (MIT) | P0 | Claridad legal para reutilizar/distribuir | package.json | Baja | 0 | Ninguno | `license: MIT` + atribución intacta | typecheck/tests | ✅ |
| A3. Remoción de deps vulnerables/sin uso + audit | P0 | Superficie de ataque y peso: −820 paquetes; 0 vulns runtime | package.json, lockfile | Media | 0 | Rotura de imports (mitigado: 0 referencias) | `npm audit --omit=dev` = 0 | npm audit, tests | ✅ |
| A4. Motor de itinerarios (goal → ruta → progreso sin registro) | P0 | Autonomía personal desde la portada | data/journeys, personal-route | Media | 0 | Pérdida de progreso legado (mitigado con migración) | Ver USER-JOURNEYS.md §Aceptación | tests/core/journeys (7) | ✅ |
| A5. MAIA v1: recursos verificados + citas + presupuesto | P0 | Respuestas útiles con fuentes; funciona sin IA | lib/maia, api/chat, ai-assistant | Media | 0 (determinista) | Invención de datos (mitigado: catálogo cerrado + validación) | Ver MAIA-ARCHITECTURE.md | tests/core/maia (7) | ✅ |
| A6. Revisión del backlog world-class → decisiones | P1 | 3000 entradas → 13 decisiones + quality gates | docs/audit | Baja | 0 | Ninguno | Revisión publicada | Revisión | ✅ |

## Fase B — Sistema de diseño y navegación

| Ítem | Prioridad | Beneficio | Módulos | Complejidad | Coste | Riesgos | Aceptación | Verificación | Estado |
|---|---|---|---|---|---|---|---|---|---|
| B1. ESLint 9 flat config + Prettier (lint operativo) | P1 | DX y gate de calidad real | config | Baja | 0 | Ruido de reglas (tuneo) | `npm run lint` verde | CI | 📋 |
| B2. Localización del chrome nuevo (itinerarios/MAIA) con claves i18n | P1 | PT>ES>EN>CA real en toda la UI | i18n/translations, components | Media | 0 | 25 diccionarios por actualizar | `i18n:verify` sin regresiones | verify-i18n | 📋 |
| B3. Auditoría a11y automatizada (axe-core + teclado) y WCAG 2.2 AA | P1 | Accesibilidad como contrato | global | Media | 0 | Falsos positivos | axe limpio en rutas críticas + revisión manual | Playwright+axe | 📋 |
| B4. Eliminar código muerto y stubs (6 componentes, 4 directorios) | P2 | Compactación | varios | Baja | 0 | Pérdida de artefactos (evidenciado: cero refs) | typecheck+tests verdes | CI | 📋 |

## Fase C — Fundación educativa

| Ítem | Prioridad | Beneficio | Módulos | Complejidad | Coste | Riesgos | Aceptación | Verificación | Estado |
|---|---|---|---|---|---|---|---|---|---|
| C1. Lesson packs descargables (offline) de cursos/campus | P1 | Aprendizaje sin datos móviles | campus, cursos | Media | 0 | Tamaño de bundle | Descarga + uso offline verificado | E2E offline | 📋 |
| C2. Progreso de cursos unificado (localStorage → contrato portable) | P2 | Continuidad entre vistas | use-progress, dashboard | Baja | 0 | Migración de claves | Progreso persiste tras recarga | tests | 📋 |
| C3. Motor de quizzes accesibles reutilizando `quiz.json` | P2 | Evaluación real, no visitas | campus/cursos | Media | 0 | — | Quiz completo + resultado | E2E | 📋 |

## Fase D — MAIA profunda

| Ítem | Prioridad | Beneficio | Módulos | Complejidad | Coste | Riesgos | Aceptación | Verificación | Estado |
|---|---|---|---|---|---|---|---|---|---|
| D1. Tool-calling real allowlistado (sustituir placeholder de chat-engine) | P1 | Flujos guiados reales (buscar curso, CV, checklist) | chat-engine, function-calling | Alta | Baja | Prompt injection (tratar tool output como no confiable) | Herramienta ejecutada + audit log | tests integración | 📋 |
| D2. Routing por coste/latencia + presupuestos por proveedor | P2 | Coste sostenible | ai-provider | Media | Ahorro | — | Presupuesto por proveedor aplicado | tests | 📋 |
| D3. Explicador de documentos (local-first, fechas explícitas, sin inventar) | P1 | Entender cartas administrativas | nueva sección + MAIA | Alta | Baja (OCR local opcional) | Interpretaciones erróneas (marcar incertidumbre obligatoria) | Flujo completo con verificación humana | E2E + revisión | 📋 |

## Fase E — Empleo

| Ítem | Prioridad | Beneficio | Módulos | Complejidad | Coste | Riesgos | Aceptación | Verificación | Estado |
|---|---|---|---|---|---|---|---|---|---|
| E1. Exportación DOCX/Europass del CV (además del PDF actual) | P1 | Compatibilidad con portales | cv | Media | 0 | — | Export válida | tests + apertura manual | 📋 |
| E2. Application tracker (local-first) | P2 | Seguimiento de candidaturas | tools | Baja | 0 | — | CRUD local + recordatorios | tests | 📋 |
| E3. Simulador de entrevistas con MAIA (presupuestado) | P2 | Práctica segura | MAIA + tools | Media | Inferencia acotada | — | Simulacro completo + feedback | E2E | 📋 |

## Fase F — Cívico y empleo territorial

| Ítem | Prioridad | Beneficio | Módulos | Complejidad | Coste | Riesgos | Aceptación | Verificación | Estado |
|---|---|---|---|---|---|---|---|---|---|
| F1. Navegador de servicios por territorio (BCN/L'Hospitalet primero) | P1 | Trámites locales con fuente | resources, office-map | Media | 0 | Datos caducos (ciclo de revisión obligatorio) | Cada ficha con fuente+fecha | trust:verify | 📋 |
| F2. Checklists administrativas guiadas con fuentes oficiales | P1 | Trámites paso a paso | rights, tools | Media | 0 | Información legal no verificada (etiquetado) | Checklist + fuente por paso | revisión editorial | 📋 |

## Fase G — Federación del ecosistema

| Ítem | Prioridad | Beneficio | Módulos | Complejidad | Coste | Riesgos | Aceptación | Verificación | Estado |
|---|---|---|---|---|---|---|---|---|---|
| G1. Manifiesto de curso compartido + descubrimiento federado | P3 | Reutilizar motores hermanos (campus compartido) | docs + content | Media | 0 | Licencias (verificar por repo) | Esquema publicado + 1 curso de ejemplo | validación | 📋 |
| G2. Identificadores portables de progreso del alumno | P3 | Continuidad entre plataformas | data contracts | Alta | 0 | Privacidad | Esquema + export/import local | tests | 📋 |

## Fase H — Calidad de producción

| Ítem | Prioridad | Beneficio | Módulos | Complejidad | Coste | Riesgos | Aceptación | Verificación | Estado |
|---|---|---|---|---|---|---|---|---|---|
| H1. Playwright E2E de flujos críticos (journeys, CV, contactos, MAIA) | P1 | Regresiones imposibles | tests/e2e | Media | 0 | — | Flujos del README cubiertos | CI | 📋 |
| H2. Lighthouse CI ≥90 perf / ≥95 a11y en páginas representativas | P2 | Rendimiento medido | CI | Baja | 0 | — | Presupuesto de rendimiento en CI | Lighthouse CI | 📋 |
| H3. Build hermético (fuentes self-hosted, engines cacheados) | P2 | Build sin red, autonomía | layout, prisma | Baja | 0 | — | `npm run build` offline | CI | 📋 |
| H4. README elevado + ADRs + CHANGELOG vs original | P2 | Onboarding de contribuidores | docs | Baja | 0 | — | Quickstart <5 min | revisión | 📋 |
