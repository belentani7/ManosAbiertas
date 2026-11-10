

<!-- repo-forge:docs-arquitectura:inicio -->
# Arquitectura

## Tipo

aplicación web con build (Next/Vite/Expo)

## Piezas observadas

| Pieza | Evidencia |
|---|---|
| Lenguajes | Markdown 59.0%, TypeScript 19.0%, JSON 8.5%, HTML 6.0%, JavaScript 3.2%, YAML 2.6% |
| Puntos de entrada | ninguno detectado |
| Páginas HTML | 102 |
| Tests | 56 archivos |
| Dependencias de paquete | 60 |

## Capas propuestas

```text
contenido/      datos y textos versionados
plataforma/     ficha, diseño y contrato del producto
brand/          tokens, marca y activos
scripts/        verificación y operación
tests/          pruebas ejecutables
```

La propuesta no mueve archivos existentes: describe dónde debe vivir lo nuevo para que
el repositorio siga siendo legible.

## Deuda declarada

- Archivos grandes: docs/world-class/improvements-3000.jsonl.
- 6 lenguajes: coste de contexto alto.

<!-- repo-forge:arquitectura -->
<!-- repo-forge:docs-arquitectura:fin -->
