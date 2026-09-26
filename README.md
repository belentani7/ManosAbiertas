[![Open in VS Code](https://img.shields.io/badge/Open_in-VS_Code-007ACC?logo=visualstudiocode&logoColor=white)](https://github.dev/belentani7/ManosAbiertas)

# ManosAbiertas

Proyecto ManosAbiertas del ecosistema Belentani.

## Estado

| Campo | Valor |
|---|---|
| Stack | `next` |
| Creado | 2026-09-07 |
| Autor | Pedro Belentani |
| Licencia | MIT |

## Instalacion

```bash
npm install
```

## Uso

```bash
npm run dev
```

## Tests

```bash
npm test
```

## Estructura

```
.claude, .github, backend, contenido, data, docs, download, drive-extracted
```

## Variables de entorno

Copia `.env.example` a `.env` y rellena los valores. Nunca comitees `.env`.

## Licencia

MIT - ver [LICENSE](LICENSE).

## Datos abiertos

El directorio [open-data/](open-data/) ya trae un portal de datos abiertos
(temas, fuentes y licencias en open-data/topics.json). Se regenera con
`python enrich_portals.py <portal>` en el proyecto `edu-open-data`.

Ver [open-data/README.md](open-data/README.md).

## Proyectos open similares

- [Open edX](https://github.com/openedx/openedx-platform)
- [Moodle](https://github.com/moodle/moodle)
- [Kolibri](https://github.com/learningequality/kolibri)
- [Oppia](https://github.com/oppia/oppia)
- [Sugar Labs](https://github.com/sugarlabs)