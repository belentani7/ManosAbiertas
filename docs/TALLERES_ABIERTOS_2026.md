# Talleres abiertos 2026 — Manos Abiertas

Se incorporan tres microcursos independientes que complementan el contenido ya existente del campus: documentos, criterio IA y puente portugués-español. Cada uno tiene tres unidades explicadas, ejemplo, ejercicio práctico, tres preguntas y retroalimentación determinista. No modifica el catálogo, las evaluaciones ni el almacenamiento del campus.

## Funcionamiento y límites
Se pueden abrir sin usuario ni backend. `assets/workshops.js` no llama a APIs ni recoge datos; guarda el avance solo bajo acción explícita y permite borrarlo. La evaluación es formativa; no hay títulos ni servicios administrativos de esta sección.

## Validación de esta entrega
Comprobar tres enlaces nuevos desde `programas.html`, las rutas entre talleres, contraste, zoom y teclado. Los scripts de la aplicación Next.js y el contenido previo permanecen sin cambios. La CI deberá ejecutar sus gates existentes antes de fusionar.

## Marco y referencias
WCAG 2.2 (W3C), APG (W3C), Core Web Vitals (Google), OWASP ASVS 5.0. Para bancos externos deben anotarse fuente, fecha, atribución y licencia antes de integrarlos. Nunca añadir datos personales reales a ejemplos públicos.
