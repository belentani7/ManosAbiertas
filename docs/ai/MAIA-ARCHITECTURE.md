# MAIA-ARCHITECTURE.md — Manos Abiertas Intelligent Assistant

> **Ciclo 1 · 2026-10-11** · Implementación: [`src/lib/maia.ts`](../../src/lib/maia.ts), [`/api/chat`](../../src/app/api/chat/route.ts), [`ai-assistant.tsx`](../../src/components/manos-abiertas/ai-assistant.tsx) · Tests: `tests/core/maia.test.mjs`

## Qué es MAIA (y qué no)

MAIA es el asistente conversacional de Manos Abiertas, integrado con los **recursos verificados** de la plataforma. **No es un chatbot decorativo**: cada respuesta de recursos cita fuentes reales del catálogo con etiqueta de confianza; cuando la IA no está disponible (o no hace falta), el sistema sigue siendo útil.

## Flujo completo implementado (v1) — Descubrimiento de recursos con citas

```
 Pregunta del usuario
        │
        ├─(1) Búsqueda DETERMINISTA en el catálogo verificado (sin IA, sin red)
        │     searchVerifiedResources() → fuentes con etiqueta de confianza
        │
        ├─(2) ¿Consentimiento IA remota? ──NO──▶ respuesta local:
        │     tutor offline + recursos citados (degraded:true, provider:'local')
        │
        ├─(3) ¿Presupuesto diario disponible? (cliente 30/día · servidor 48/día)
        │     ──NO──▶ respuesta determinista con recursos (budgetExhausted)
        │
        └─(4) Inferencia IA (multi-proveedor, con las fuentes inyectadas en el
              prompt con reglas de cita) → respuesta + fuentes (sources[])
              · consume 1 unidad de presupuesto solo si hubo inferencia real
```

## Etiquetas de confianza (obligatorias en toda cita)

| Etiqueta | Cuándo se usa |
|---|---|
| `OFFICIAL SOURCE` | Recurso con `source` oficial y ciclo de vida `verified` |
| `REVIEWED COMMUNITY RESOURCE` | Recurso verificado sin fuente oficial explícita |
| `VERIFICATION REQUIRED` | Recurso `pending`/caducado: **nunca se presenta como consejo vigente** |

Reglas del prompt (inyectadas por `maiaSourcesPromptBlock`): citar las fuentes usadas, **no inventar URLs ni beneficios públicos**, señalar dudas y distinguir información oficial de orientación generada por IA.

## Consumo y límites (presupuesto)

| Capa | Límite | Comportamiento al agotarse |
|---|---|---|
| Cliente (`maia.ts`, localStorage `manos-abiertas-maia-budget`) | **30 consultas IA/día** | MAIA responde con búsqueda local + tutor offline (sin red) |
| Servidor (`/api/chat`, `ai-chat-daily`) | **48 consultas IA/día por cliente** | Respuesta 200 determinista con recursos (`budgetExhausted: true`) |
| Ráfaga (preexistente) | 12 / 5 min (`ai-chat`) | 429 → el cliente degrada a modo local |
| Presupuesto por mensaje | 256 KB body · 20 mensajes · 48 000 caracteres (Zod) | 400 `VALIDATION_ERROR` |

El presupuesto **solo se consume cuando hubo inferencia IA real** (`degraded: false` + consentimiento). Las respuestas deterministas son gratuitas e ilimitadas (salvo límite de ráfaga).

## Seguridad y privacidad

- Claves de proveedor **solo en servidor** (env); nunca en el bundle.
- Consentimiento remoto explícito (`remote-ai-consent`) antes de enviar texto a terceros.
- Las fuentes que llegan por red se **re-validan contra el catálogo local** (`maiaSourcesFromPayload` descarta URLs desconocidas y etiquetas manipuladas).
- Sin PII en métricas; historial de chat solo en localStorage del dispositivo (últimos 20 mensajes).

## Arquitectura de proveedores (preexistente, preservada)

`ai-provider.ts`: registro multi-proveedor (Groq, NVIDIA, Qwen, ZAI, OpenAI, Anthropic, OpenRouter, local/Ollama-compatible) con cadena de fallback, límites por proveedor (`provider-security.ts`) y modo streaming. **Fronteras inviolables por mandato.** El routing avanzado por coste/latencia (§5 del mandato) es Fase D2 del roadmap.

## Honestidad de estado

| Capacidades del mandato §5 | Estado |
|---|---|
| 9. Public-resource discovery | ✅ v1 (este ciclo) |
| 16. Sources and citations | ✅ v1 (este ciclo) |
| 18. Low-bandwidth alternatives | ✅ v1 (determinista/local) |
| 20. Human-support escalation | ✅ v1 (itinerarios → sección Contactos con instituciones reales) |
| 1. Multilingüe | ⚠️ respuestas en idioma del usuario vía prompt; UI del chat ES (patrón actual) |
| 2–8, 10–15, 17, 19 (tutoría, CV, entrevistas, voz, documentos…) | 📋 Fase D2–E: flujos guiados sobre herramientas existentes; **la base ya existe** (study-tools, cv/generate, cover-letter, ats, TTS/STT) |
| Tool-calling real (loop de `chat-engine`) | ⚠️ placeholder en el código — se ejecutará en Fase D2 con herramientas allowlistadas (schema tipado, permisos, timeouts, audit log) |

## Próximos pasos (Fase D2)

1. Conectar el loop de herramientas de `chat-engine` con un registro tipado allowlistado (buscar curso, buscar recurso, redactar CV, generar checklist) — eliminar el placeholder.
2. Routing por coste/latencia con modelo pequeño para tareas simples y presupuestos por proveedor.
3. Explicador de documentos con procesamiento local-first y borrado inmediato (§10 del mandato).
4. Reforzar citas en respuestas de tutoría educativa (no solo recursos).

---

## Tool-calling real (Ciclo 2 — roadmap D1) ✅

El placeholder de `chat-engine` (tools simuladas sin efecto) se sustituyó por un
executor real, determinista y allowlistado. **Ninguna herramienta toca red, DB
ni sistema de ficheros**: todo responde sobre catálogos locales.

### Allowlist (5 herramientas, `src/lib/maia-tools.ts`)

| Tool | Entrada (Zod estricto) | Salida | Fuente |
|---|---|---|---|
| `search_verified_resources` | `{query: 2–160, type?, location?}` | resultados con `trust` | `src/data/resources.ts` (3686) |
| `find_courses` | `{topic?}` | cursos + nº lecciones | `ai-courses`, `office-course`, `journeys` |
| `list_journeys` | `{}` | los 11 itinerarios (PT/ES/EN/CA) | `src/data/journeys.ts` |
| `get_journey` | `{journeyId}` | actividades reales del journey | `src/data/journeys.ts` |
| `list_emergency_contacts` | `{}` | los 8 servicios con `tel:` | `src/data/main-contacts.ts` |

### Garantías

1. **Allowlist por nombre**: las tools que el cliente envía se filtran contra el
   registro; nada fuera del allowlist se ejecuta (defensa de prompt injection).
2. **Validación doble**: `safeParse` Zod (schemas con `additionalProperties:false`)
   → sin parámetros extra; errores tipados `VALIDATION_ERROR` / `UNKNOWN_TOOL` /
   `TIMEOUT_TOOL` / `TOOL_ERROR` — nunca crashea la petición.
3. **Tool output = dato no confiable**: el system prompt lo declara y obliga a
   citar; el executor nunca concatena salida de tools al prompt del sistema.
4. **Timeout 1500 ms** por herramienta; aunque sean cálculos locales.
5. **Audit log**: cada ejecución (éxito o error) queda en un ring buffer de 50
   con nombre, duración y ok/ko; `/api/chat` lo devuelve en `toolAudit[]`.
6. **Sin ejecutor → error honesto**: `TOOL_NOT_EXECUTED` (el placeholder que
   devolvía `tool_used` falso fue eliminado).
7. **Contrato de emergencia**: `list_emergency_contacts` expone los 8 teléfonos
   con IDs estables (`emergencias-112`, …); un test impide que desaparezcan.

### Estado de los 5 pilares de calidad del tool-calling

- Allowlist y schemas cerrados ✅ · timeouts ✅ · audit ✅ · output no confiable ✅ · tests (9) ✅
- Pendiente (Fase D2/E3): routing por coste, herramientas con escritura
  (application tracker), simulador de entrevistas.
