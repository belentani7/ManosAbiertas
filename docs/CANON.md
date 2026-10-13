# Canon de producto — ManosAbiertas

> Estado: **inventario verificado, pruebas pendientes** · 2026-10-13. Este índice no sustituye la documentación histórica; enlaza la implementación actual y registra sus límites.

## Identidad y objetivo
Plataforma educativa gratuita para competencias digitales, IA aplicada, ofimática, preparación laboral y acceso a recursos para personas migrantes. Acceso sin registro obligatorio. Priorización de idiomas: **PT → ES → EN → CA** (según [README](../README.md)). No inventar cifras de cobertura lingüística ni calificar guías jurídicas como vigentes sin fuentes fechadas.

## Fuente de verdad y arquitectura observada
| Área | Evidencia en repositorio | Estado |
| --- | --- | --- |
| Visión pública | [README](../README.md), [índice educativo](../INDICE-EDUCATIVO.md) | Documentado |
| Producto y flujos | [11 itinerarios](./product/USER-JOURNEYS.md), [src/data](../src/data), [src/components](../src/components) | Código existente; funcionamiento no ejecutado en esta auditoría |
| Aplicación | [src/app](../src/app), [apps/manos-abiertas](../apps/manos-abiertas), [next.config.ts](../next.config.ts) | **Pendiente** identificar el entrypoint canónico por configuración de despliegue |
| Infraestructura y paquetes | [package.json](../package.json), [pnpm-workspace.yaml](../pnpm-workspace.yaml), [turbo.json](../turbo.json), [prisma](../prisma) | Next.js/Prisma; rutas y migraciones por verificar |
| Calidad | [tests/core](../tests/core), [scripts](../scripts), [docs/A11Y-CHECKLIST.md](./A11Y-CHECKLIST.md) | Scripts declarados; sin pruebas ejecutadas aquí |
| Fuentes verificables | [open-data](../open-data), [scripts](../scripts) | Revisar trazabilidad y fecha de recursos |

## Jornadas y aceptación del producto
1. Persona recién llegada: consulta orientación útil y fuentes oficiales; debe detectar caducidad de información y advertencias. No publicar asesoría legal como certeza automatizada.
2. Persona que busca empleo: crea y exporta CV y carta, manteniendo confidencialidad de datos.
3. Persona sin formación digital: completa itinerario de alfabetización y recupera progreso local sin registro.
4. Uso móvil y bajo ancho de banda: navegación accesible y sin barreras; acceso visual sin animaciones obligatorias.

**Definición de terminado:** rutas probadas en navegador, controles accesibles, traducciones verificadas, fuentes y fecha revisadas, privacidad probada, build y tests ejecutados con evidencia, preview y rollback verificados. Hasta entonces: **NO CERTIFICADO PARA PRODUCCIÓN**.

## Gates seguros (no ejecutar destructivos)
- Comandos disponibles en [package.json](../package.json): `lint`, `typecheck`, `test:core`, `i18n:verify`, `trust:verify`, `accessibility:verify`, `build`. Su existencia **no implica** que pasen.
- `db:push` contiene `--accept-data-loss`; `db:reset` destruye datos. Prohibidos en datos reales o sin aprobación, copia y rollback.
- La última modificación inspeccionada (`c7bfee9`) añade una cápsula didáctica generada: **no cuenta como prueba de una mejora funcional**.

## Pacto arquitectónico
Mantener el producto centrado en accesibilidad, trazabilidad de fuentes y funcionalidad. No añadir servicios, bases nuevas, autenticación obligatoria o reestructuras masivas por cumplir una plantilla. Antes de mover código, trazar importaciones, rutas, configuración de Vercel y dependencias. Todo cambio en rama/PR con criterios de aceptación y regresión.

## Conformidad, privacidad y derechos
La evaluación preliminar por regímenes y los ocho escenarios de prueba están documentados en [compliance/ASSESSMENT.md](./compliance/ASSESSMENT.md). **Ningún control sin ejecución se considera aprobado.** En particular, verificar si los modelos de usuario de Prisma son usados en producción y si el CV se mantiene localmente antes de afirmar ausencia de tratamiento de datos personales.

## Pendientes de evidencias
- [ ] Ejecutar pruebas, build y Lighthouse sobre preview real.
- [ ] Verificar cuál de `src/app`, `apps/manos-abiertas` y artefactos HTML es el entrypoint canónico.
- [ ] Revisar datos sensibles, consentimiento, licencias y expiración de recursos.
- [ ] Documentar resultado PASS/FAIL/UNTESTED en hoja de auditoría con fecha y SHA.
