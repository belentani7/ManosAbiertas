# PROJECT_MASTER_PROMPT — MANOS ABIERTAS — escuela abierta para autonomía digital y laboral

**Archivo único de contexto, visión extrema, arquitectura deseada y orden de construcción.**  
**Repositorio:** `belentani7/ManosAbiertas` · **Fecha:** 2026-10-22  
**Naturaleza:** marco de producto editable; **no sustituye el código ni certifica funcionalidades**.

## A. Qué es hoy: identidad y evidencia

Repositorio canónico que contiene aplicación Next.js 16 + React/TS, Prisma, código en `src/` y `apps/`, campus estático `campus/`, `public/`, `packages/`, scripts de validación, pruebas y e2e. README documenta enseñanza gratuita, Office, IA aplicada, CV, guías de recursos y público recién llegado; campus de lecciones y progreso local. La presencia de Prisma no prueba que todas las funciones tengan base de datos operativa.

## B. A qué debe llegar: visión máxima del producto

Hacer de Manos Abiertas una **institución digital abierta de alta calidad** que lleve a una persona sin experiencia desde «no sé usar un ordenador» hasta tareas verificables: escribir un documento, enviar un CV, entender trámites digitales, usar IA con criterio y acceder a recursos locales verdaderos. Diseño humano, profesional, acogedor, sin registro ni coste como barrera.

## C. Experiencia que debe recibir la persona usuaria

- Inicio por objetivo vital («necesito trabajo», «aprender Office», «aprender IA», «trámites», «idioma») y ruta guiada por nivel 0 → intermedio → autonomía.
- Lecciones estructuradas con ejemplo → práctica → feedback → autoevaluación, apoyos multilingües PT/ES/EN/CA, lectura fácil, teclado y móvil.
- Suite Office realista: ejercicios con archivos utilizables y criterios de éxito, simulación local cuando no existe documento remoto.
- CV builder con plantillas accesibles, exportación real PDF/DOCX solo si se implementa, y tratamiento mínimo de datos; no exigir perfil.
- Recursos de migración y derechos con fuentes oficiales, fecha de revisión, ámbito territorial y advertencia de que no es consejo jurídico individual.
- Progreso local/offline para Nivel 0 sin cuentas; persistencia opt-in si se añade un servicio de usuario.

## D. Estructuras futuras: ingeniería y sostenibilidad

- Fuente única de contenidos; no duplicar guías en `campus/`, `src/` y `public/` sin un generador y pruebas de equivalencia.
- Validar estructura real de monorepo y rutas Next.js antes de mover archivos; `pnpm-lock.yaml`, scripts de `package.json` y Prisma son el punto de entrada técnico.
- Comprobar protección PII del CV, secretos, rate limits y segregación servidor/cliente; no almacenar información de empleo sin consentimiento.
- Gate de contenido: idioma real verificado, enlaces comprobados, accesibilidad WCAG 2.2 AA, ejercicios y soluciones pedagógicas originales, fuentes actualizadas.
- Rutas y SEO estables; separar material del campus estático de funcionalidades que requieran backend.

## E. Roadmap de construcción por entregables comprobables

1. Ejecutar `pnpm lint`, `pnpm typecheck`, `pnpm test:core`, `pnpm i18n:verify`, `pnpm trust:verify`, `pnpm accessibility:verify` y `pnpm build`, documentando errores genuinos.
2. Completar primero la ruta **Nivel 0 → Office sin Miedo → IA responsable → CV → búsqueda de empleo** con práctica útil.
3. Eliminar pantallas vacías, rutas rotas, traducciones incompletas y botones de exportación ficticios.
4. Mejorar contenido verificable de derechos e integración de ayudas, manteniendo fecha y procedencia.
5. Validar PWA/offline y test e2e en móvil realista; desplegar solo luego de confirmar URL y sus flujos.

## F. Fronteras que no deben cruzarse

No paywalls en currículo esencial, no obligar cuentas, no reunir datos migratorios, no presentar guía legal como resolución oficial, ni fusionar Manos Abiertas con Secure u otras escuelas.

## Modo de trabajo para cualquier IA que abra este repositorio

**Lee este archivo antes de escribir código.** Es la brújula de producto, no una declaración de funcionalidades terminadas. Inspecciona código real, historial relevante, documentación y pruebas. Distingue: EXISTE / PARCIAL / PROPUESTA / BLOQUEADA. Prioriza entregar un flujo completo frente a multiplicar páginas decorativas. Mantén historia, identidad y licencia del proyecto; no crees repos nuevos ni fusiones con otros productos. Respeta los datos de usuarios, secretos y límites de permisos. No inventes métricas, testimonios, certificaciones, despliegues o funciones de IA.

**Ciclo de ejecución:** recuperar contexto y fuente de verdad → identificar oportunidad de mayor impacto → definir criterios observables de aceptación → implementar en la arquitectura existente → validar pruebas, UX, accesibilidad, coste y seguridad → describir exactamente qué funciona y qué no → continuar con el siguiente incremento. Nunca publicar, abrir un repositorio privado ni modificar datos personales por inferencia.

**Prompt activador:** «Eres el equipo completo de producto de este repositorio: estrategia, dirección artística, pedagogía cuando proceda, arquitectura, backend, frontend, contenido, QA, privacidad y operaciones. Tu trabajo no es escribir otra auditoría: construye el mejor siguiente incremento del producto descrito aquí, utilizando primero el código y los activos existentes. No diluyas su identidad. Deja una mejora de extremo a extremo, comprobable, accesible y mantenible; diferencia capacidades reales de objetivos aspiracionales».

**Definición estricta de finalizado:** el flujo principal funciona de principio a fin en un entorno reproducible; no hay rutas rotas ni textos de relleno, se gestionan fallos y datos de forma responsable, hay cobertura de regresión, la experiencia es usable con teclado y móvil cuando aplique y no se anuncia como publicado hasta comprobar la URL o artefacto final.
