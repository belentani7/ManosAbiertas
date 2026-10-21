# Campus Manos Abiertas — lector de contenidos reales

Este campus está en el repositorio **manosabiertas** existente. Integra la
lectura de documentos curriculares ya versionados en `campus/cursos/`.
No crea lecciones ficticias ni depende de una API externa de generación.

## Qué se entrega en esta rama

- Una portada de tres cursos con acceso a su programa, semanas y recursos.
- Lector accesible dentro del campus: los documentos Markdown se presentan
  como estructura HTML creada con `textContent`, sin ejecutar HTML del curso.
- Navegación por las semanas y acceso al quiz del curso seleccionado.
- Tres cuestionarios reales: feedback inmediato, puntuación y opción de repetir.
- Un resultado de quiz guardado localmente cuando el navegador lo permite;
  no es certificación, ni evaluación oficial, ni sincronización entre dispositivos.
- Cache offline de HTML, CSS, JS, todos los documentos/quiz existentes
  y cuatro archivos de voz de bienvenida. La instalación inicial **requiere red**.
- Respuestas de error de contenido y offline que no sustituyen JS/JSON/MP3
  por una falsa portada HTML.

## Ejecutar y validar

Desde el directorio raíz:

```bash
python3 -m http.server 8080
# navegar a http://localhost:8080/campus/
node --test tests/campus-offline.test.mjs
```

La caché del service worker depende de origen HTTPS o localhost y de que el
navegador acepte su instalación. Para probar de verdad el modo offline:
abrir la portada una vez conectado, esperar a la activación del service worker,
desconectar, volver a abrir y comprobar un syllabus, una semana, su quiz y
el audio en cada idioma.

## Alcance / veracidad

Es material educativo de práctica; no se afirma que el quiz acredite
competencias o niveles ni que los agentes estén activos permanentemente.
La automatización editorial depende de GitHub Actions y no se presume operativa
si sus jobs no se ejecutan. La guía y la información legal se deben actualizar
contra fuentes oficiales antes de publicar como asesoramiento.

Se mantiene todo el contenido de los cursos; no se borran archivos de origen.
