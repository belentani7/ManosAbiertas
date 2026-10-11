# DEPENDENCIAS.md — Justificación de cada librería

Contrato mandato: **ninguna dependencia sin justificación**. Este documento es
el inventario vivo del proyecto. Regla de oro: si una dependencia no aporta un
valor medible (seguridad, accesibilidad, productividad verificada), se elimina.

Actualizado: Ciclo 2 (Fase B4/G12). `package.json` nunca cambia de nombre
(`manosabiertas`).

---

## 1. Plataforma (runtime del producto)

| Dependencia | Justificación | Nota |
|---|---|---|
| `next` | Framework del producto (App Router, Route Handlers, i18n routing) | decisión arquitectónica; ver ADR/auditoría base |
| `react`, `react-dom` | Motor de UI de Next | par obligado |
| `@prisma/client`, `prisma` (dev) | Persistencia SQLite (community/messages) — único sistema de datos del servidor | esquema mínimo |
| `zod` | Validación de TODAS las peticiones API y de los argumentos de herramientas MAIA (allowlist tool-calling) | contrato de seguridad central (`src/lib/api-request-schemas.ts`, `src/lib/maia-tools.ts`) |
| `zustand` | Estado cliente (perfil, ruta personal, PWA install) con persistencia localStorage | sin registro; ver `src/stores/app-store.ts` |
| `next-intl` | i18n PT>ES>EN>CA + 39 locales (25 diccionarios completos) | prioridad lingüística del mandato |
| `next-themes` | Tema claro/oscuro persistido, accesible (sin flash) | |

## 2. Asistente MAIA / IA (cliente multi-proveedor)

| Dependencia | Justificación | Nota |
|---|---|---|
| `geist` | Fuentes Geist/Geist Mono **autoalojadas** (woff2 incluidos) | sustituye a `next/font/google`: build hermético sin red (Fase H3). Mismas familias que antes |

El cliente IA (`src/lib/ai-provider.ts`) usa `fetch` nativo contra OpenAI /
Anthropic / Google / Mistral / Groq — sin SDKs de proveedor (mandato: cliente
multi-proveedor propio, respetado).

## 3. UI — primitivas (shadcn/ui, Radix)

Todas las de `@radix-ui/react-*` (accordion, alert-dialog, aspect-ratio, avatar,
checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, label,
menubar, navigation-menu, popover, progress, radio-group, scroll-area, select,
separator, slider, slot, switch, tabs, toast, toggle, toggle-group, tooltip):
componentes accesibles sin reimplementar roles/focus (contrato WCAG). Se usan
vía `src/components/ui/*`. Estandarización pendiente en Fase H4.

| Dependencia | Justificación |
|---|---|
| `class-variance-authority`, `clsx`, `tailwind-merge` | Sistema de variantes + clases seguras (patrón shadcn) |
| `lucide-react` | Iconografía accesible (SVG, aria-hidden) |
| `framer-motion` | Micro-interacciones (entradas, hovers) con respeto a `prefers-reduced-motion` |
| `cmdk` | Paleta de comandos accesible (⌘K) |
| `vaul` | Sheet/drawer accesible (móvil) |
| `input-otp` | Campo OTP accesible |
| `embla-carousel-react` | Carrusel accesible (testimonios) |
| `react-resizable-panels` | Paneles redimensionables accesibles (lab) |
| `react-day-picker` | Selector de fechas accesible (forms) |
| `sonner` | Toasts accesibles (contraste/roles) |
| `tailwindcss` (dev), `@tailwindcss/postcss` (dev), `tailwindcss-animate`, `tw-animate-css` | Estilos + animaciones del sistema |

## 4. Formularios y datos

| Dependencia | Justificación |
|---|---|
| `react-hook-form`, `@hookform/resolvers` | Formularios accesibles (CV, mensajes, settings) con validación vía Zod |
| `recharts` | Gráficas de resultados (dashboard, CV analysis) con SVG accesible |
| `date-fns` | *(retirada Ciclo 2 — 0 usos)* | 
| `@tanstack/react-table` | *(retirada Ciclo 2 — 0 usos)* |
| `react-markdown` | *(retirada Ciclo 2 — 0 usos)* |

## 5. Infraestructura de despliegue / build

| Dependencia | Justificación |
|---|---|
| `sharp` | Generación de iconos PWA (`scripts/build-pwa-icons.js`) |
| `@netlify/blobs` | Cache de embeddings/enriquecidos en servidor (opcional; sin él, LRU en memoria) |
| `@netlify/plugin-nextjs` (dev) | Adapter de build para Netlify (`netlify.toml`) |
| `typescript` (dev), `@types/react`, `@types/react-dom`, `@types/node` (dev) | Tipos estrictos (`npm run typecheck` = gate) |
| `eslint` (dev), `eslint-config-next` (dev) | Gate de estilo (`npm run lint` = 0 errores, gate desde Ciclo 2) |
| `prisma` (dev) | Generación del cliente y migraciones |

## 6. Calidad / tests (dev)

| Dependencia | Justificación |
|---|---|
| `jsdom` | DOM real para tests de accesibilidad sobre componentes renderizados (Fase B3) |
| `axe-core` | Auditoría WCAG automatizada (reglas axe) sobre el HTML real de React (Fase B3) |
| `esbuild` | Transformación TS/TSX en los tests node:test (render de componentes) y utilidades de build |

---

## Retiradas / expulsadas (histórico de decisiones)

| Dependencia | Motivo de retirada | Ciclo |
|---|---|---|
| `uuid`, `@reactuses/core`, `date-fns`, `react-markdown`, `@tanstack/react-table` | **0 usos** en código (verificado por grep de imports); expulsadas en G12 | Ciclo 2 |
| `bun-types` | 0 usos; además ocultaba la falta de `@types/node` (tipado de `process`) | Ciclo 2 |

## Reglas para el futuro (inviolables)

1. Toda dependencia nueva exige entrada aquí **antes** de instalarse, con
   justificación medible (qué gana el usuario final o la seguridad).
2. Prohibidas por defecto sin justificación arquitectónica documentada:
   Kubernetes, Redis, colas, GraphQL, vector DB (mandato §16).
3. Cada `npm audit --omit=dev` debe cerrar en 0 vulnerabilidades (gate G9).
4. Las dependencias con 0 usos se expulsan en el siguiente ciclo (G12).
