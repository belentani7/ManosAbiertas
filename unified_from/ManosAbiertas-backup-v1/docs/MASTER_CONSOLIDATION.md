# Manos Abiertas — consolidación maestra

## Decisión

`belentani7/manosabiertas` es el **repositorio maestro y oficial** de la plataforma comunitaria. La edición técnica `manos-abiertas-autonomous-final` no sustituye a este repositorio; su propio README identifica `belentani7/manosabiertas` como la plataforma comunitaria oficial.

## Qué queda consolidado aquí

### Producto y contenidos
- Currículum y cursos existentes en el repositorio maestro.
- Cursos verificados y cursos generados incorporados durante agosto de 2026.
- Biblioteca de recursos, guías, descargas y contenidos recuperados.
- Datos y manifiestos de recursos soberanos.

### Mejoras técnicas consolidadas como criterio
- Accesibilidad WCAG: teclado, foco, contraste, nombres accesibles, reduced motion y formularios.
- i18n: locale real, canonical/hreflang, idioma/dirección del documento y rutas por locale.
- React/Next.js: hidratación, estado, listeners y errores de ejecución.
- Seguridad: secretos fuera del repositorio, validación de entradas, XSS, CSRF, headers y mínimo privilegio.
- Rendimiento: LCP/INP/CLS, imágenes, fuentes, JavaScript y caché.
- SEO: title, description, canonical, Open Graph, JSON-LD y sitemap.
- UX móvil: 320–430 px, touch targets, overflow y formularios.
- APIs: autenticación, rate limiting, validación, errores y timeouts.
- Dependencias: auditoría y actualización de vulnerabilidades.
- Datos: evitar PII innecesaria, logs mínimos y permisos de mínimo privilegio.

## Regla de integración

No se copia ciegamente código de una edición técnica sobre la plataforma oficial. Antes de integrar una mejora de código se comprueba que no rompa el currículum, los contenidos, las rutas, la i18n, los datos ni la experiencia existente.

## Fuentes históricas

- `manos-abiertas-autonomous-final`: edición técnica independiente y laboratorio.
- `ManosAbiertas-Optimizacion`: auditorías y recomendaciones de rendimiento/accesibilidad/SEO/mejores prácticas.
- `manos-abiertas-static-mini`: **backup histórico** de la mini app estática pre-Next.js. Este backup se conserva y no se usa como fuente de producción.

## Estado

Desde este punto, las nuevas mejoras deben entrar en `manosabiertas`. El backup se conserva intacto como referencia histórica y recuperación.
