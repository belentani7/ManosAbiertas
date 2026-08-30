# Manos Abiertas · estado del proyecto

## Actualización 2026-08-30 — currículo completo publicado

- Contenido didáctico íntegro en el repo y servido por la web: `public/contenido/curriculum/` con los 8 módulos de IA (m01–m08), 26 niveles por módulo en ES, PT, CA y EN (832 archivos) + documentación del currículo en `_docs`.
- Visor público del currículo: `/{locale}/curriculum` (índice) y `/{locale}/curriculum/{modulo}` (lector de niveles con selector de idioma, anterior/siguiente, progreso guardado localmente y marcado de nivel completado).
- Banner de acceso al currículo añadido en `/{locale}/cursos`.
- Componentes didácticos reutilizables en `src/components/manos-abiertas/course-ui/` (CourseLayout, FlashCard, GamificationPanel, QuizQuestion, useCourseProgress, useGamification).
- Snapshots internos preservados fuera de la carpeta pública: `contenido/curriculum-interno/preserved-20260819`.
- Revisión de privacidad del material antes de publicarlo: sin claves, sin datos personales (solo ejemplos didácticos).

## Identidad

Manos Abiertas es una experiencia de aprendizaje y orientación de NOIACORE, el ecosistema madre de Belentani. Está dirigida a comunidades latinoamericanas, brasileñas, migrantes y personas que necesitan aprender tecnología, preparar su vida laboral y encontrar información fiable en España.

Contacto operativo: `belentani7studio@proton.me`.

## Plataforma

- Next.js 16, React 19, TypeScript, Tailwind y Zustand.
- Netlify como despliegue público y GitHub como control de versiones.
- PWA, service worker y tutor local para continuar sin conexión.
- Progreso, CV, carta, favoritos, recordatorios, chat y ruta personal guardados localmente.
- Foro compartido con Netlify Blobs y fallback local.
- 39 idiomas y banco de descubrimiento de información, libros/audio, vídeo y material abierto.
- Directorio de chats externos sin API propia y servicios de imagen/ilustración para futuras integraciones.
- Diagnóstico interno en `/api/health` y monitor visible de estado.

## Ruta personal

La página de inicio ahora convierte el contenido en una secuencia guiada: empleo, alfabetización digital, trámites o comunidad. Cada persona puede elegir una meta, abrir el siguiente recurso, marcar pasos y continuar en el mismo dispositivo.

## Chat y autogestión

Orden de proveedores: Groq, NVIDIA NIM, Z.ai y modo local. Groq y NVIDIA usan modelos ligeros configurables. Un error de red o proveedor no debe dejar la plataforma inutilizable: el navegador usa `offline-tutor.ts`.

La capa de diagnóstico informa del proveedor configurado sin exponer claves, comprueba conectividad y mantiene el modo local como capacidad principal de recuperación.

## Verificación realizada

- `bun run lint`: correcto.
- `bunx tsc --noEmit --skipLibCheck`: correcto.
- `bun run build`: correcto.
- `/api/health` local: HTTP 200 y proveedor Groq detectado con las variables del perfil de Windows.
- La API directa de Groq respondió con el modelo ligero `llama-3.1-8b-instant`.

## Pendiente de producto

- La ruta `/api/chat` ya devuelve una respuesta local HTTP 200 cuando un proveedor remoto falla; el proveedor remoto queda identificado en `provider` cuando responde correctamente.
- Añadir moderación y autenticación opcional al foro.
- Añadir calendario exportable, notificaciones opt-in y pruebas E2E.
- Revisar enlaces vivos y licencias por país antes de presentarlos como recomendación legal.
