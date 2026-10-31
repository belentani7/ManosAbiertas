# Manos Abiertas: aplicación de documentación oficial

Fecha: 2026-10-31. Esta guía se aplica exclusivamente a este repositorio.

## Cursor
`.cursor/rules/manosabiertas-curriculum.mdc` define las fuentes curriculares, la salida generada, los límites de producto y las validaciones. La regla distingue los 832 HTML traducidos de cursos nuevos o certificaciones.

## GitHub Actions
- Cada acción externa se fija a un SHA completo verificado desde la referencia oficial del repositorio de la acción.
- El workflow CI solo recibe `contents: read`; CodeQL conserva `security-events: write` solo en su job.
- `tutor-ia.yml` asigna `contents: write` y `pull-requests: write` únicamente a la cápsula que crea una rama y PR; el job que responde issues recibe solo `contents: read` y `issues: write`.
- Checkout no persiste credenciales salvo el job de cápsula, que debe empujar una rama de revisión; la rama protegida `main` no se escribe directamente.
- Los deploys Vercel/Netlify siguen siendo manuales y seleccionan el entorno; este cambio no convierte una CI verde en un despliegue de producción.

## Microsoft Edge: accesibilidad
La verificación de 832 páginas comprueba idioma correcto, un solo título principal, enlace para saltar, landmark `main), navegación por páginas, texto íntegro y rutas locales. El test adicional exige foco visible, foco en el enlace de salto, movimiento reducido e impresión. El contenido mantiene cuatro idiomas y no depende de color o animación para expresar estados.

## Exportaciones Qwen
Las exportaciones artista/Judas/música se documentan por separado en `docs/qwen-export-review.md`. Sus activos no se mezclan con esta plataforma; se aplican únicamente las prácticas de procedencia, alcance veraz y separación de producto.

## Validación asociada
- `node --test tests/core/curriculum-html-publication.test.mjs`
- `pnpm test:core`
- `pnpm accessibility:verify`
- `pnpm build`
- `node scripts/verify-production-routes.mjs` en el servidor de producción

## Documentación oficial
- Cursor Project Rules: https://docs.cursor.com/context/rules-for-ai
- GitHub Actions Secure Use: https://docs.github.com/en/actions/reference/security/secure-use
- GitHub Actions dependency lockfiles: https://docs.github.com/en/actions/concepts/security/workflow-dependency-lockfiles
- Microsoft Edge accessibility build guidance: https://learn.microsoft.com/en-us/microsoft-edge/accessibility/build/
- Microsoft Edge reduced-motion testing: https://learn.microsoft.com/es-es/microsoft-edge/devtools/accessibility/test-reduced-ui-motion
- Microsoft Edge keyboard testing: https://learn.microsoft.com/en-us/microsoft-edge/devtools/accessibility/test-tab-enter-keys
