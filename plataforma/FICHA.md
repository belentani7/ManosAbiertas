

<!-- repo-forge:plataforma-ficha:inicio -->
# Ficha — Manos Abiertas (`ManosAbiertas`)

> Generada por repo-forge el 2026-11-10 desde el árbol real. Cada cifra tiene su fuente en
> [`docs/FUENTES.md`](../docs/FUENTES.md).

## 1. Identidad

| Campo | Valor |
|---|---|
| Repositorio | `belentani7/ManosAbiertas` |
| Tipo de plataforma | aplicación web con build (Next/Vite/Expo) |
| Modelo de producto | plataforma educativa abierta (cursos + CV + derechos) |
| Público | personas recién llegadas a España/Brasil, sin presupuesto y con poca familiaridad digital |
| Stack medido | Markdown 59.0%, TypeScript 19.0%, JSON 8.5%, HTML 6.0%, JavaScript 3.2%, YAML 2.6% |
| Tamaño | 1523 archivos · 190577 líneas · 16.5 MB |

## 2. Máximo potencial

academia pública de referencia para migración digital: 832 lecciones ya escritas convertidas en rutas con certificación verificable, empleabilidad medida y espejo offline para aulas y bibliotecas

Ese es el techo, no el estado. Lo que hoy existe es lo del apartado 3.

## 3. Lo que hay hoy

- Páginas HTML: 102
- Tests: 56
- CI: sí
- Licencia: sí
- README: sí (117 líneas)
- Cumplimiento de reglas: **36/37** (97.3%)

## 4. Diseño de plataforma que la promesa exige

| Módulo | Por qué | Estado |
|---|---|---|
| Rutas por objetivo (empleo, oficina, trámites) | La promesa lo exige | hecho — `ruta.html` con 8 módulos y 208 niveles reales, generado por `plataforma/build_ruta.py` |
| Lector de lecciones con progreso local | La promesa lo exige | parcial — progreso en `localStorage`; el lector del campus ya existía |
| Creador de CV exportable | La promesa lo exige | pendiente |
| Guías de derechos con fecha de vigencia | La promesa lo exige | pendiente |
| Puente lingüístico PT↔ES | La promesa lo exige | existente — el currículo ya está en ES/PT/CA/EN |
| Modo aula para entidades sociales | La promesa lo exige | pendiente |

Datos: currículo en public/contenido, progreso en el navegador, catálogo de recursos.
Integraciones: estático sin backend, PDF/print, lector offline PWA.

## 5. Brechas

Reglas en rojo: `DEV-06`.

Cada una tiene su corrección en `CAMBIOS.md` o queda declarada como pendiente.

## 6. Esfuerzo para llegar al techo

| Fase | Contenido | Días-persona |
|---|---|---|
| 1 | Cerrar reglas en rojo y dejar el gate en verde | 1 |
| 2 | Módulos 1–2 del diseño, con prueba | 18 |
| 3 | Módulos restantes y contenido real | 30 |
| 4 | Pulido, accesibilidad auditada y publicación | 12 |

Supuestos: una persona con contexto del stack, sin bloqueos externos, y sin contar
dependencias de terceros que hoy no estén instaladas.

## 7. Lo que este repositorio no va a hacer

cobrar al alumno, pedir registro obligatorio, certificar sin entidad

<!-- repo-forge:ficha -->
<!-- repo-forge:plataforma-ficha:fin -->
