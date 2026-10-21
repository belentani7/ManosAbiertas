# ManosAbiertas

Plataforma educativa gratuita: cursos de IA y Office, creador de CV y recursos para migrantes.

## Qué es

Formación **gratuita y práctica** para personas que llegan y necesitan herramientas concretas:
ofimática, inteligencia artificial aplicada, un currículum que funcione. Sin registro, sin
coste, sin barreras innecesarias.

En línea: <https://manos-abiertas-psi.vercel.app>

## Qué incluye

- Cursos de IA y Office
- Creador de currículums
- Guías de derechos
- Recursos para comunidades migrantes

## Accesibilidad

Es parte del objetivo, no un extra: el público incluye personas con poca familiaridad digital
y distintas lenguas. **PT > ES > EN > CA.**

## Licencia

MIT (ver [`LICENSE`](LICENSE)).

---

## Parte del indice educativo

Esta plataforma forma parte del conjunto educativo de **Belentani / NOIACORE**:
formacion gratuita y abierta. El indice completo, con material y estado de cada una,
vive en el nodo central:

**<https://github.com/belentani7/open-school/blob/main/INDICE-EDUCATIVO.md>**

| Plataforma | Que ensena | Enlace |
|---|---|---|
| Open School | Instituto digital universal | https://open-school-gamma.vercel.app |
| ManosAbiertas | IA y ofimatica para recien llegados | https://belentani7.github.io/ManosAbiertas/ |
| WILLIAMSCHOOL | Escuela comunitaria (curriculo Nepal) | https://williamschool.vercel.app |
| UX Academy | Diseno UX/Producto, trilingue | https://ux-academy-professional.vercel.app |
| Aprende Brasil | Educacion para Brasil | https://aprende-brasil.vercel.app/ |
| Lingua Aberta | Idiomas, progresion CEFR | https://belentani7.github.io/lingua-aberta-empresa/ |
| Cruzando el Charco | Acogida y arraigo | https://belentani7.github.io/Cruzando-el-charco/ |
| secure-t | Ciberseguridad e IA | https://belentani7.github.io/secure-t/ |

**PT > ES > EN > CA.** Gratuito, accesible (WCAG) y conectado.

## Reconciliación del campus y Nivel 0 — 22 octubre 2026

Esta rama reúne sobre la configuración original Next.js recuperada, **sin sustituirla**:
el lector seguro de tres cursos complementarios, evaluación y progreso local,
precarga offline delimitada, y exportación de lecciones de Nivel 0 a TXT.
Se preservan las cinco familias de contenido original, las lecciones, voces,
juegos, guías y el resto de la aplicación.

Verificación adicional en el workflow real `CI`: las pruebas `pnpm test:core`
(que descubren los casos `tests/core/*.test.mjs`) siguen existiendo; añadidas
verificaciones específicas de smishing y estructura de los cursos generados.
El workflow complementario `campus-course.yml` comprueba materiales, navegación,
módulos del lector y paquete precargado.

**Límites:** la ruta `campus/` y el frontend Next.js son interfaces distintas
dentro del mismo proyecto, no un segundo producto. La existencia de archivos
en el repositorio no garantiza que el host Next.js exponga `/campus/`. Es
imprescindible comprobar las rutas públicas, construir Next.js, instalar el SW
bajo HTTPS y verificar la funcionalidad sin conexión en móvil/escritorio.
No se prometen certificados, tutor autónomo, almacenamiento remoto ni asistencia
jurídica personalizada. El despliegue de esta candidata sigue pendiente.
