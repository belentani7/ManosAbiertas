# Manos Abiertas en Netlify

## Despliegue

1. Sube esta carpeta a un repositorio GitHub.
2. En Netlify, selecciona **Add new project > Import an existing project**.
3. Usa estos valores:

   - Build command: `bun run build`
   - Publish directory: `.next`
   - Bun: `1.3.14`
   - Node: `22`

4. Publica el sitio.

## Qué funciona sin servidor propio

- Cursos, recursos, derechos, herramientas, CV, recordatorios y progreso local.
- PWA instalable y uso offline después de la primera visita.
- Tutor local para preguntas básicas cuando no hay conexión o no hay API configurada.
- Exportación e importación del progreso en JSON.
- Compartir un plan de avance mediante el sistema de compartir del dispositivo.
- Foro con temas compartidos mediante Netlify Blobs, con respaldo local y límite básico de publicaciones.

## IA remota opcional

Las rutas `/api/*` se ejecutan como funciones serverless de Netlify cuando el adaptador de Next.js está activo. Si no hay credenciales o la función no responde, el asistente usa el tutor local. No se guardan claves en el navegador ni en el repositorio.

## Coordinación de usuarios

El foro compartido usa almacenamiento serverless. Los perfiles, respuestas públicas completas, moderación avanzada y sincronización del progreso personal requieren autenticación y políticas de privacidad antes de abrirse a gran escala.
