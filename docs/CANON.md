# CANON — ManosAbiertas

> Estado: VERIFIED / DOCUMENTED ONLY. Observado online el 2026-10-15.

## Misión
Plataforma educativa y de inclusión para personas migrantes en España y Latinoamérica, con aprendizaje de IA y Office, orientación práctica y recorridos formativos.

## Usuarios y journeys
- Persona migrante: descubre un recorrido, consulta una lección, completa una actividad y conserva su progreso.
- Educador/editor: mantiene contenidos, cursos y accesibilidad.
- Operador: verifica salud, privacidad y continuidad.

## Arquitectura observada
Repositorio TypeScript con workspace, Next.js, paquetes compartidos, Prisma, src, apps, packages, campus y tests. Mantener el full-stack modular; no sustituirlo automáticamente por un CMS.

## Estado
- VERIFIED: aplicación, campus, paquetes, Prisma, tests y configuración Next.js.
- DOCUMENTED ONLY: alcance social completo, cifras de usuarios y cobertura real.
- PENDING: journeys end-to-end, persistencia de progreso, auth, migraciones y accesibilidad.

## Seguridad
Seeds sintéticos. Nunca ejecutar db:push con pérdida de datos ni db:reset contra producción. Variables de entorno solo por nombre; secretos fuera del repositorio.

## Gates
Typecheck, lint, tests, build, revisión de migraciones, onboarding y WCAG en las rutas principales.

## Decisión
Producto CORE de educación. Evaluar Moodle o Frappe LMS como capa de contenido futura, no como reemplazo automático.
