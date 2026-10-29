# BELENTANI EDUCATION
## Contrato de producto y plan de unificación de las plataformas educativas
**Edición:** 2026-10-29 · **Estado:** programa de ejecución por repositorio, no certificación de lanzamiento global.

### 0. Propósito
Familia de instituciones digitales para personas reales. Unificar experiencia, navegación, marca, lenguaje, accesibilidad y calidad, **sin unificar bases de datos que contienen información diferente ni fusionar historiales de Git**. Cada proyecto conserva identidad, público, currículos y modelo de despliegue. La plataforma no debe aparentar ser más completa de lo que demuestra su código y sus tests.

No se crea un repositorio nuevo. Se reaprovechan paquetes y rutas compatibles ya existentes. La integración entre plataformas se hace mediante enlaces verificados, esquemas compartidos, adaptadores y contratos explícitos, nunca por imports arbitrarios a proyectos separados.

### 1. Matriz de la realidad técnica observada

| Repositorio | Público y experiencia | Evidencia del código | Acción prioritaria |
|---|---|---|---|
| `belentani7/ManosAbiertas` | Migración, vida cotidiana, IA, Office, empleabilidad | Web institucional y campus; programas y talleres complementarios | Mantener lenguaje accesible, completar currículo profundo y datos de recursos locales |
| `belentani7/lingua-aberta` | Idiomas de integración | React Vite y campus estático; 3 paquetes reales/11 unidades; API tRPC remota no completada | Mantener camino offline verificable, mejorar guías, corregir corpus y comprobar comprensión |
| `belentani7/linguaforge` | Idiomas y progresión | Front React, Express/tRPC y Drizzle; entrada estática institucional y práctica introductoria | Consolidar tokens institucionales en cliente y pruebas de SRS/idiomas |
| `belentani7/secure-t` | Ciberseguridad y prácticas SOC | Campus con cursos, simulaciones y laboratorio, build estático con verificación de enlaces | Priorizar currículo, navegación tranquila y separación de datos simulados/reales |
| `belentani7/WILLIAMSCHOOL` | ESO/Bachillerato, competencias y acogida BR-ES | React, AcademicPlan, perfiles y progreso; hero editorial integrado | Validar rutas de competencia, contenidos y su coherencia con datos escolares |
| `belentani7/ux-academy-professional-program` | Product design y UX | React Vite, 17 módulos documentados y portada editorial complementaria | Conectar entrada editorial al despliegue real del frontend y resolver CI preexistente |
| `belentani7/aprende-brasil` | Alfabetización, informática, idiomas, matemáticas | JSON con 205 módulos/5 pasos; rama de reconstrucción del frontend (React ausente en main a fecha de revisión) | Restablecer build, verificar contenido por docentes nativos y evaluación honesta |
| `belentani7/open-school` | Portal federador | Repositorio archivado; un README o índice no equivale a LMS de producción | Decidir reapertura o integración mediante un proyecto activo, sin escribir en archivado |

**Importante:** «205 módulos», «17 módulos» o «11 unidades» describen inventario, no revisión pedagógica independiente. La existencia de archivos Markdown o JSON no verifica rigor, resultados de aprendizaje ni licencias.

### 2. Definición operacional de excelencia
Un producto de nivel institucional cumple **simultáneamente**:
1. Es real: cada CTA tiene un destino publicado y útil; las capacidades indicadas funcionan.
2. Es comprensible: usuario nuevo entiende quién enseña, a quién, qué aprenderá y cómo empezar.
3. Es pedagógico: cada unidad tiene objetivo observable, explicación, ejemplo contextualizado, práctica, retroalimentación y rúbrica.
4. Es accesible: el contenido funciona con teclado, zoom, pantalla pequeña y ayudas técnicas, con evidencia.
5. Es medible: LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1 en P75 de datos reales; los laboratorios confirman con PageSpeed/DevTools pero no sustituyen telemetría de campo.
6. Es seguro: privacidad mínima por defecto, datos personales minimizados, secretos fuera del cliente, entradas validadas, enlaces confiables.
7. Es mantenible: contenido estructurado independiente del renderer, tests, owner definido, versiones y migración reversible.
8. Está publicado y verificado: build + CI + URL pública cargable + enlaces y flujos UI medidos. «PR verde» no es sinónimo de «deploy verde».

### 3. Sistema de diseño compartido
```css
:root {
  --edu-surface: #ffffff;
  --edu-paper: #f7f7f2;
  --edu-ink: #1b352d;
  --edu-muted: #50675a;
  --edu-line: #d4e0d6;
  --edu-accent: #176b62; /* modificar por marca, no por componente */
  --edu-focus: #a46b21;
  --edu-radius: 16px;
  --edu-container: 1280px;
}
```
Estructura visual: **wordmark+símbolo SVG original → navegación → hero con promesa verificable → primer CTA útil → selección de rutas → programa → aula → ejercicio → progreso → fuentes**. Tipografía editorial legible y sistema sans coherente; fuente del sistema como fallback. No imponer glassmorphism o gradientes animados si reducen contraste, lectura o rendimiento. No usar fondos de stock genérico o fotos sin licencia para fingir actividad presencial.

Hero profesional = un solo H1 + mensaje concreto + imagen/vector original con `aria-hidden` o descripción útil + CTA sin callejón sin salida + movimiento respetuoso con `prefers-reduced-motion`. El movimiento reactivo por pointer debe ser progresivo: `requestAnimationFrame`, nunca bloquear pulsación, scroll o teclado. El contenido no desaparece si JavaScript falla.

Variantes: Manos verde bosque y arcilla; Lingua Aberta verde mineral; LinguaForge petróleo; WILLIAMSCHOOL verde pizarra; Secure-T oscuro técnico cuando sea adecuado a la práctica SOC (con idéntica arquitectura semántica); UX Academy índigo editorial; Aprende Brasil verde eucalipto y crema. El sistema es común en geometría, tipografía, estados y componentes; **no son ocho webs idénticas con nombres cambiados**.

### 4. Páginas obligatorias por institución y criterios de aceptación

| Página | Componentes y contenido exigido | Prueba de aceptación |
|---|---|---|
| Inicio | Logo, relato institucional, hero, tres necesidades reales, CTA | 1 H1, CTA útil y accesible, destino en producción |
| Quiénes somos | Misión, público, límites, responsables editoriales, contacto real si existe | Sin testimonios, cifras o acreditaciones inventadas |
| Programas | Catálogo organizado por objetivo, nivel, duración real, idioma, precio real | Todos los programas enlazados existen |
| Itinerario | Prerrequisitos, módulos, competencias, tiempo orientativo, accesibilidad | Navegación lineal y libre, sin bloqueo ficticio |
| Aula | Objetivo, explicación, ejemplos, práctica, descargables permitidos | Nada de «próximamente» disfrazado de lección |
| Evaluación | Preguntas con validación, explicación por respuesta y rúbrica | No dar «superado» por abrir una página |
| Mi progreso | Persistencia mínima, exportación/borrado cuando aplique | Sin fuga de datos a otra cuenta / alumno |
| Recursos | Origen, licencia, idioma, actualización y alternativa accesible | Links 200, revisión legal |
| Accesibilidad y privacidad | Política honesta de datos, límites, contacto si existe | Tests manuales y automatizados; sin sello de certificación falso |
| Estados | Vacío, cargando, sin red, error, sin permisos | Nunca pantalla blanca y sin salida |

Es válido que una plataforma tenga menos páginas si una tarea se resuelve mejor dentro de una aplicación; la exigencia es **cobertura de tareas reales**, no cantidad de documentos HTML como métrica de calidad.

### 5. Contrato común de contenido
Separar contenido, UI y progreso. No mover todo el contenido a un único JSON gigante ni convertir Markdown en HTML mediante interpolación sin sanitización.

```ts
type Locale = "es" | "pt-BR" | "ca" | "en";
type LicenceRecord = {
  name: string; sourceURL?: string; author?: string;
  licenseIdentifier: string; reviewedAt?: string;
};
type EducationalCourse = {
  id: string; slug: string; locale: Locale; ownerRepo: string;
  title: string; description: string; audiences: string[];
  level: string; outcomeIds: string[];
  units: string[]; estimatedMinutes?: number;
  attribution: LicenceRecord[]; status: "draft" | "reviewed" | "published";
  version: string;
};
type EducationalUnit = {
  id: string; courseId: string; goal: string;
  concepts: string[]; examples: string[];
  practicalTask: string; assessmentId?: string;
  rubric: string[]; resourceIds: string[];
  editorialReview: "pending" | "approved";
};
type ProgressRecord = {
  courseId: string; unitId: string; completedAt?: string;
  assessmentScore?: number; schemaVersion: number;
};
```
Los modelos finales deben validarse en runtime con Zod o Pydantic, según stack. Múltiples usuarios o emisión de credenciales requieren identidad, autorización por recurso y persistencia autenticada; **localStorage no sirve como credencial ni certificado**. No almacenar datos de menores, residencia ni salud por defecto.

### 6. Modelo de evaluación y calidad editorial
Cada lección se valida con una rúbrica de seis preguntas: ¿tiene objetivo observable?, ¿el ejemplo es correcto y apropiado para la cultura local?, ¿la actividad exige aplicar algo?, ¿la respuesta puede revisarse?, ¿están acreditados origen y licencia?, ¿hay alternativa inclusiva? `editorialReview=approved` solo tras revisión real de un editor competente. Los materiales generados masivamente con falsos amigos incorrectos, nombres truncados o frases no naturales **no pasan** por tener buena UI.

Mínimos de curso pleno: presentación docente/institucional honesta, índice de módulos, duración y prerequisitos orientativos, lecciones completas, una tarea representativa con ejemplo resuelto por unidad, evaluación con soluciones/explicación, rúbrica de revisión, glosario y accesibilidad alternativa. No inventar certificados, alumnos graduados, testimonios, tutores conectados ni tasas de éxito.

### 7. Estrategia de datos, biblioteca y assets
- **Contenido**: SQLite local y JSON curado como fuentes en Aprende Brasil; Markdown versionado para paquetes offline de Lingua Aberta; tablas/ORM existentes por producto cuando haya backend real. Toda importación conserva IDs, procedencia, derechos y versionado.
- **Recursos abiertos**: UNESCO OER define licencias que autorizan reutilización/adaptación; gratis en web no significa permiso de redistribución. Registrar `author`, `sourceURL`, `licenseIdentifier`, `version`, `locale`, `reviewedAt`; no copiar masivamente contenidos de Khan Academy, YouTube, universidades ni marcas ajenas.
- **Ilustración**: símbolos SVG propios, figuras y diagramas reproducibles, iconos de bibliotecas con licencia, fotos propias o assets con autorización explícita. Compresión, dimensiones y texto alternativo, carga diferida solo por debajo del primer viewport.
- **Offline**: precache restringido a archivos existentes, revisión de cuota, versiones de caché y alcance de service workers (nunca cachés de otros proyectos). No prometer sin conexión si el worker no terminó de instalarse.
- **Traducción**: lenguas ES, PT-BR, CA y EN según soporte real. No declarar siete idiomas solo por crear botones; los recursos, errores y evaluaciones también requieren traducción y revisión.
- **IA**: tutores con proveedores requieren servidor autorizado, límites de costes, rate limiting, mitigación de prompt injection, control de fuentes y supervisión para menores. La búsqueda local de contenidos no se presenta como tutor LLM.

### 8. Interoperabilidad sin sobreingeniería
Investigar **LTI** para conectar herramientas a LMS, **QTI** para importar/exportar evaluaciones, **CASE** para competencias y **Open Badges** para credenciales verificables **solo si se justifican con integraciones reales**. No atribuir certificados 1EdTech sin pasar su proceso formal de conformidad. En repos con solo HTML, empezar por enlaces y export de contenido antes de desplegar un IdP o bus de eventos.

### 9. Seguridad, accesibilidad y rendimiento — gates normativos
- **W3C WCAG 2.2 AA** como objetivo: semántica, jerarquía de títulos, foco visible no oculto, formularios etiquetados, contraste, adaptabilidad 320 px/zoom, teclado y lector de pantalla. `prefers-reduced-motion`; nombres accesibles para iconos. Axe/Lighthouse ayudan pero no sustituyen auditoría manual.
- **OWASP ASVS 5.0.0** como lista de requisitos según nivel/aplicabilidad: autenticación/autorización/gestión de sesiones donde haya backend, CSP, validación server-side, gestión de dependencias y secretos. No prometer «certificado OWASP».
- **Core Web Vitals**: instrumentación y verificación p75 LCP/INP/CLS en producción, presupuestos JS/CSS por ruta, imágenes optimizadas, no 3D pesado ni trackers necesarios para ver un curso.
- **Privacidad**: RGPD/LGPD según jurisdicción y público; minimización, consentimiento cuando corresponda, retención y eliminación, nunca guardar datos sensibles reales en ejercicios o logs. Avisos comprensibles.
- **Pruebas CI**: lint/TypeScript, test unitario de renderers y datos, E2E Playwright en móvil/escritorio, WCAG semiautomática, enlaces/404, accesos y tokens, build, smoke test del sitio desplegado, seguridad. En cada repo terminar y reparar antes de pasar al siguiente.

### 10. Secuencia de ejecución y definición de hecho
**P0 — Publicabilidad**: entradas rotas, build fallido, assets no desplegados, rutas invisibles al usuario, claims fraudulentos; corregir primero.  
**P1 — Pedagogía**: completar curso mínimo viable hasta tareas evaluables, corregir corpus, revisión editorial bilingüe; instrumento con criterios.  
**P2 — Identidad**: unificar hero, información institucional y navegación sin romper componentes nativos.  
**P3 — Mejora LMS**: perfil/acceso e interoperabilidad cuando la demanda y recursos lo justifiquen.  
**P4 — Eficiencia**: pruebas de campo, internacionalización humana y accesibilidad asistida.

Ronda 1: Manos Abiertas (talleres) → Lingua Aberta (rutas y offline) → LinguaForge (portada editorial) → WILLIAMSCHOOL (hero React) → UX Academy (portada, CI pendiente) → Aprende Brasil (React a reconstruir, CI y editorial pendientes). Secure-T ya tiene un campus con hero, laboratorios y validación de enlaces: priorizar contenido y UX de escenarios; Open School está archivado, **no mutarlo automáticamente**.

**Estado verificable por repositorio**:
- `ManosAbiertas` PR 96 fusionada, CI/Security/CodeQL/E2E verdes.
- `lingua-aberta` PR 79 fusionada, build, currículo, Security/CodeQL verdes.
- `linguaforge` PR 69 fusionada, CI/Build/Security verdes; preview Vercel bloqueada por cuota, Pages skipped.
- `WILLIAMSCHOOL` PR 30 fusionada, CI/Security/Build & Deploy Pages verdes; CodeQL workflow independiente falló antes de jobs (también en main).
- `ux-academy-professional-program` PR 19 abierta; CI falla también en main y logs no recuperados.
- `aprende-brasil` PR 18 abierta; CI y Security fallan sin steps/logs disponibles en GitHub Actions; no afirmar validación del build.

### 11. Documentación por repositorio
El README de cada repositorio debe referirse a lo que existe **en esa revisión**, distinguiendo `listo`, `parcial`, `bloqueado`, `planificado`. Mantener estos apartados: problema, usuarios, objetivos comprobables, captura real por viewport (si autorizada), funciones reales por ruta, arquitectura, fuente del curso, permisos/licencias, idiomas, pasos de instalación, tests y salidas reales, despliegues verificables, seguridad, límites y siguiente entrega. No borrar afirmaciones sin conservar trazabilidad en CHANGELOG.

### 12. Fuentes oficiales, documentadas
- W3C Web Content Accessibility Guidelines 2.2: https://www.w3.org/TR/WCAG22/
- W3C WAI ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- Google Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- OWASP ASVS v5.0: https://asvs.owasp.org/
- 1EdTech: https://standards.1edtech.org/
- UNESCO OER: https://www.unesco.org/en/open-educational-resources
- Comisión Europea, Digital Education: https://education.ec.europa.eu/es/focus-topics/digital-education/actions

**Ningún enlace anterior implica certificación, colaboración o aval de esa entidad a los productos de BELENTANI.**
