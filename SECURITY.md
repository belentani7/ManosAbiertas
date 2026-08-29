# Seguridad del repositorio

## Configuracion

- Usa `.env.local` para desarrollo y variables del entorno del proveedor para despliegues.
- `.env.example` enumera las variables principales sin credenciales.
- Las bases SQLite bajo `db/` son datos locales y no deben publicarse.

## Incidente de historial

Este cambio retira `.env` y `db/custom.db` del estado actual de Git. Los commits anteriores siguen pudiendo contenerlos.

1. Revisa el `.env` historico de forma privada.
2. Revoca y rota toda credencial que haya estado presente, aunque sea propiedad del mantenedor.
3. Actualiza el gestor de secretos del despliegue con los valores nuevos.
4. Coordina una limpieza de historial con `git filter-repo` si el repositorio fue publico; no la mezcles con este cambio funcional.

No copies valores reales a commits, incidencias, capturas o logs.
