# SRS -- ManosAbiertas
Fecha: 2026-09-25 | Estado: Draft | Traza a: PRD prd-manosabiertas.md

## Requisitos funcionales

| ID | Requisito | Traza PRD | Prioridad |
|---|---|---|---|
| FR-001 | El sistema implementa: Open edX | F1 | Must |
| FR-002 | El sistema implementa: Moodle | F2 | Must |
| FR-003 | El sistema implementa: Kolibri | F3 | Must |
| FR-004 | El sistema implementa: Oppia | F4 | Must |
| FR-005 | El sistema implementa: Sugar Labs | F5 | Must |

## Requisitos no funcionales

| ID | Requisito | Metrica | Traza |
|---|---|---|---|
| NFR-001 | Build reproducible | `build` pasa en CI | todos |
| NFR-002 | Calidad estatica | lint + typecheck sin errores | todos |
| NFR-003 | Seguridad | 0 secretos; validacion de entrada | FR-001 |
| NFR-004 | Observabilidad | logs estructurados y errores claros | todos |
| NFR-005 | Accesibilidad (si hay UI) | WCAG 2.1 AA | FR-001 |
| NFR-006 | CI verde | workflow en cada PR | todos |

## Trazabilidad

`PRD -> FR/NFR -> tests -> verificacion`. Todo cambio actualiza la documentacion
en el mismo PR y debe pasar la suite antes de fusionar.
