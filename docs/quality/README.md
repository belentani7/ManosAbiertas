# Evidencia local del contrato educativo

La fuente canónica es el [contrato educativo de 200 reglas](https://github.com/belentani7/open-school/blob/main/docs/CONTRATO_EDUCATIVO_200_REGLAS.md). Este directorio conserva únicamente el estado y la evidencia de **ManosAbiertas**.

- `evidence.json` contiene exactamente E001–E200.
- `NO MEDIDO` significa que aún no existe una comprobación reproducible; no significa incumplimiento.
- `VERIFICADO` exige al menos una ruta, URL de prueba, informe o PR en `evidence`.
- `N/A JUSTIFICADO` exige el campo `justification`.

Comprobación:

```bash
node scripts/verify-education-contract.mjs
node --test scripts/verify-education-contract.test.mjs
```

## Verificación de integración — 2026-10-17

Entorno: Node 22.23.3, pnpm 10.4.1. Instalación con lockfile congelado y scripts de dependencias desactivados; Prisma Client se genera explícitamente sin modificar la base de datos.

- TypeScript y ESLint terminan correctamente; ESLint conserva advertencias existentes.
- `pnpm test:core`: 89 tests correctos, sin omitidos.
- Verificadores i18n, confianza y accesibilidad estática: correctos. Sus límites siguen visibles: 2 idiomas completos, 24 parciales y 13 beta; 3647 recursos pendientes de revisión; 16 señales de revisión manual de accesibilidad. No certifican traducción completa, vigencia de enlaces ni conformidad WCAG.
- `pnpm build`: 871 páginas estáticas más rutas dinámicas. Las guías generadas se regeneran también al compilar, sin depender del job de tests.
- Validador educativo: 5 tests correctos; 0/200 reglas verificadas. El ledger no sustituye evidencia de cumplimiento.

Se restauran las versiones mayores de calendario y paneles compatibles con los componentes existentes. No se ejecutaron migraciones, resets ni operaciones de pérdida de datos. Despliegue, revisión visual y recorrido de usuario continúan pendientes.
