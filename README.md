# Manos Abiertas

Plataforma web gratuita para personas inmigrantes en España. Enseña inteligencia artificial y Office, ayuda a preparar el CV, orienta sobre trámites y derechos, reúne recursos verificados y ofrece herramientas prácticas.

## Incluye

- Cursos de IA y Office con progreso local.
- CV, carta de presentación y plantillas.
- Guías de derechos, documentos y procesos.
- Biblioteca de recursos educativos y sociales de todo el mundo.
- Comunidad, eventos, recordatorios y favoritos.
- Asistente IA con respuesta local cuando no hay conexión o API.
- PWA instalable y soporte offline después de la primera visita.
- Exportación e importación del progreso en JSON, sin cuenta obligatoria.

## Desarrollo local

```bash
bun install --frozen-lockfile
bun run dev
```

Verificaciones:

```bash
bun run lint
bunx tsc --noEmit --skipLibCheck
bun run build
```

## Netlify

El proyecto está preparado para desplegarse desde GitHub con `netlify.toml`:

- Build command: `bun run build`
- Publish directory: `.next`
- Node: `22`
- Bun: `1.3.14`

Netlify soporta el App Router de Next.js y ejecuta las rutas `/api/*` como funciones serverless. La aplicación sigue siendo útil sin configurar IA remota porque el tutor local, los cursos y el progreso funcionan en el navegador.

## Datos y privacidad

El progreso personal se guarda en el dispositivo. No se incluyen `.env`, base de datos local ni exportaciones de escritorio en el repositorio. La sincronización multiusuario, perfiles y chat público requieren configurar almacenamiento y autenticación serverless.
