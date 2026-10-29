# Entrada Vercel de Manos Abiertas

**Causa identificada** (29-10-2026): el despliegue Next.js no lee automáticamente `index.html` del repositorio raíz; solo sirve las rutas de `src/app` y los recursos de `public/`.

## Solución implementada
- La portada institucional y cinco páginas más se reflejan en `public/`, junto a SVG, CSS, JS y plantilla de CV.
- El punto de entrada Next.js `/` dirige a `/index.html`, alojado en `public/`, sin cambiar rutas existentes `/es`, `/pt`, etc.
- La URL `/campus/` deriva a la sección Next.js `/es/cursos`.
- Los syllabus públicos enlazados se incorporan a `public/campus/cursos/`.
- La prueba `tests/core/vercel-institutional-entry.test.mjs` comprueba que los ficheros que aparecen en GitHub root también se sirven en Next.js, y que los enlaces relativos existen.

**Operación:** el proyecto Vercel accesible `manos-abiertas` figura con producción previa desde la rama del repositorio distinto `belentani7/manos-abiertas` (archivado). Este repositorio actual es `belentani7/ManosAbiertas`. Reconectar Vercel a la fuente canónica o desplegar este commit expresamente; fusionar GitHub no publica en ese proyecto por sí solo.

No declarar arreglado el dominio hasta verificar despliegue READY y acceso HTTP real.
