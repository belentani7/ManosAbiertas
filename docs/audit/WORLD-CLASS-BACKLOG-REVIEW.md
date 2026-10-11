# WORLD-CLASS-BACKLOG-REVIEW.md — Depuración del trabajo previo

> **2026-10-11** · Insumos: `docs/world-class/improvements-3000.jsonl`, `docs/world-class/github-repositories-200.json`, `docs/world-class/APPLIED-IMPROVEMENTS.md`, `docs/world-class/global-data-sources.json`
> Mandato: evaluar este trabajo previo, **depurarlo y convertirlo en decisiones de ingeniería**, en lugar de generar otras miles de sugerencias.

## 1. Qué es realmente `improvements-3000.jsonl`

3000 entradas generadas **combinatoriamente**:

```
30 superficies × 10 contextos de usuario × 10 lentes de calidad = 3000
```

| Dimensión | Valores (conteo) |
|---|---|
| `priority` | P1: 1290 · P2: 924 · **P0: 786** |
| `layer` | experience 500, learning 500, data/api/platform/content 300 c/u, community 200, location/employment/ai/accessibility/localization/design 100 c/u |
| `qualityLens` | 10 lentes × 300 c/u (utility, accessibility, i18n, performance, privacy, resilience, trust, observability, testing, maintainability) |
| `userContext` | 10 × 300 (first-72h, low-literacy, screen-reader, motor-disability, limited-connectivity, non-spanish, urgent-rights, job-seeker, learner, support-worker) |
| `status` | **3000 × `proposed`** (ninguna implementada ni triada) |

**Diagnóstico:** es una matriz de intenciones de calidad, no un backlog de tareas. Cada celda (superficie × lente) produce prosa genérica con aceptación igualmente genérica. Ejecutarlo literalmente o volver a generarlo sería inflar el proyecto sin valor humano (viola el principio "no confundir cantidad con impacto").

## 2. Política de depuración (decisión de ingeniería)

1. **No se generan nuevas entradas masivas.** El backlog vivo es [`IMPLEMENTATION-ROADMAP.md`](../roadmap/IMPLEMENTATION-ROADMAP.md) (unidades verticales con criterios de aceptación verificables).
2. **Las 10 lentes se convierten en quality gates permanentes** (Definition of Done, Fase H del mandato): toda feature se valida contra utility, a11y, i18n, performance, privacy, resilience, trust, observability, testing y maintainability. Así el trabajo previo **sigue vivo como contrato de calidad**, no como fichero de 3000 líneas.
3. **Los 10 `userContext` se adoptan como lentes de revisión de UX** en el diseño de itinerarios y MAIA (ya presentes: first-72h → itinerario `primeras-24h`; low-literacy → lenguaje claro; limited-connectivity → modo determinista/offline; non-spanish → PT>ES>EN>CA; job-seeker → `primera-candidatura`; etc.).
4. **Selección P0 por impacto humano directo** (13 decisiones adoptadas del backlog, ver §3); el resto queda **archivado como referencia**, con estado `archived-backlog` implícito: no se borra el fichero (evidencia histórica), pero deja de ser una lista de trabajo.

## 3. Decisiones adoptadas (del backlog → roadmap/este ciclo)

| Origen (celda de la matriz) | Decisión de ingeniería | Estado |
|---|---|---|
| home × first-72h × utility | Itinerarios con objetivo claro desde la portada (`PersonalRoute` → motor de journeys) | ✅ este ciclo |
| home × first-72h × trust | Fuentes y fechas visibles en toda cita (etiquetas OFFICIAL SOURCE / REVIEWED / VERIFICATION REQUIRED) | ✅ este ciclo (MAIA) |
| chat/ai × low-literacy × utility | Respuesta determinista con recursos cuando la IA no está disponible o no hace falta | ✅ este ciclo (MAIA) |
| chat/ai × limited-connectivity × resilience | Presupuesto/local-first: MAIA funciona sin red (catálogo empaquetado) | ✅ este ciclo |
| resources × urgent-rights × trust | Ciclo de vida de verificación ya existente (`getResourceTrust`) — mantenerlo como gate | ✅ verificado |
| global × non-spanish × i18n | Contenido nuevo del motor de itinerarios publicado en PT/ES/EN/CA | ✅ este ciclo |
| global × any × testing | Tests de integridad para journeys y MAIA (14 tests nuevos) | ✅ este ciclo |
| platform × any × maintainability | Eliminar dependencias muertas y código sin referencias | ✅ deps; código muerto → P1 |
| api × any × privacy | Presupuestos y consentimiento de IA ya existentes — extenderlos a todo flujo IA nuevo | ✅ este ciclo (30/48 al día) |
| courses × learner × observability | Métricas de impacto educativo sin PII (Fase G/H) | 📋 roadmap |
| civic/location × support-worker × utility | Navegador de servicios por territorio (BCN/L'Hospitalet) sobre el catálogo verificado | 📋 roadmap (Fase F) |
| employment × job-seeker × utility | Employment Studio (CV ya existe; carta + ATS ya existen; falta tracker de candidaturas) | 📋 roadmap (Fase E) |
| any × screen-reader/motor-disability × accessibility | Auditoría a11y automatizada (axe + teclado) y revisión manual | 📋 roadmap (Fase H) |

## 4. `github-repositories-200.json` y `global-data-sources.json`

- **Catálogo de 200 repos de referencia** (investigación de ecosistema, sección §20 del mandato): útil como **insumo de federación** (Fase G), no como TODO. Se conserva como dato de investigación curado (`github-repositories-curated-200.csv` ya existe).
- **52 fuentes de datos globales**: insumo para el navegador cívico/datos abiertos; requiere revisión de licencia y robots antes de cualquier ingesta (principio §6 del mandato). Estado: **archivo de referencia, sin ingesta automática**.

## 5. Qué NO se hace (explícitamente)

- ❌ Regenerar `improvements-3000.jsonl` u otro fichero de miles de entradas.
- ❌ Marcar entradas del fichero como "completadas" una a una (falsa métrica).
- ❌ Convertir la matriz en sprints: la unidad de trabajo es la mejora vertical con criterio de aceptación.
