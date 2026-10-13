# Evaluación de conformidad y calidad — ManosAbiertas

**Revisión técnica:** 2026-10-13 · **rama de propuesta:** `governance/2026-10-13-product-canon` · **rama base observada:** `main` · **base SHA:** `c7bfee946e6795e06e483590dda970b0b022ddf8`

**Estado:** EVALUACIÓN PARCIAL / NO CERTIFICADO. Este documento registra controles de ingeniería y dudas de aplicabilidad; no acredita conformidad jurídica, no constituye asesoría legal y no sustituye pruebas ejecutadas sobre el despliegue real. Todos los resultados sin ejecución son **NOT RUN**.

## Superficie realmente observada

- El [README](../../README.md) describe formación gratuita, CV y recursos para migrantes **sin registro obligatorio** y el orden lingüístico **PT → ES → EN → CA**.
- [`package.json`](../../package.json) define Next.js, Prisma y comprobaciones de lint, tipo, núcleo, i18n, accesibilidad estática y confiabilidad de recursos. **Disponibilidad de script no equivale a test superado.**
- [`prisma/schema.prisma`](../../prisma/schema.prisma) declara SQLite y modelos `User` (email, passwordHash opcional, role), Course, Enrollment y Certificate. **No se ha verificado** si estas tablas guardan datos de usuarios reales, si existen endpoints públicos de alta o cómo funciona el despliegue.
- Documento histórico de desarrollo consultado: worklog en Drive, septiembre de 2026; registra propuestas de autosave de CV con localStorage y orientación legal, pero **no demuestra su implementación actual**. No se copia aquí contenido personal ni afirmaciones obsoletas.

## Matriz de aplicabilidad preliminar

| Régimen / estándar | Estado | Evidencia disponible | Control de aceptación / trabajo pendiente |
|---|---|---|---|
| RGPD (Reg. UE 2016/679) y LOPDGDD (LO 3/2018) | **Potencialmente aplicable** si el servicio procesa datos identificables | Prisma tiene `User.email`, `passwordHash` y matrículas; el CV puede incluir datos personales | Mapear flujos reales, base jurídica, conservación, destinatarios, seguridad, derechos, backups y política; demostrar si el CV se mantiene solo en el navegador |
| LSSI-CE y cookies/seguimiento | **Por determinar** | No se han inspeccionado cookies, SDK de métricas ni banners | Inventariar solicitudes de terceros y distinguir cookies necesarias de las sujetas a consentimiento |
| Accesibilidad web (RD 193/2023, requisitos aplicables) | **Requiere análisis de alcance y calendario** | Plataforma dirigida a público con necesidades de comprensión y uso móvil | Auditoría teclado/foco/lector de pantalla/zoom/idiomas; WCAG 2.2 AA como objetivo técnico sin asumir automática equivalencia jurídica |
| Directiva (UE) 2019/882 | **Por determinar según servicio cubierto** | Plataforma educativa gratuita; no se presume comercio electrónico | Confirmar si realiza alguna actividad recogida por la Directiva antes de exigir sus deberes específicos |
| Reglamento de IA (UE) 2024/1689 | **Condicional** | El README afirma cursos de IA; enseñar IA no prueba que la plataforma despliegue un sistema de IA | Inventariar chat/agente/modelos, proveedor/deployer, interacción con humanos y contenido sintético; revisar transparencia Art. 50 cuando proceda |
| Información migratoria, ayudas y derechos | **Control editorial obligatorio** (no declaración de asesoría profesional) | Contenido legal/documental anunciado al público | Cada ficha: jurisdicción, organismo oficial, URL, fecha de comprobación, fecha de próxima revisión, idioma, aviso de límites; bloqueo a fuentes caducadas o sin trazabilidad |
| Derechos de autor y licencias | **Aplicabilidad según activos** | MIT declarado para código, sin prueba sobre cada recurso didáctico/multimedia | Libro de procedencia/licencias separado para código, texto, audios, imágenes, fuentes, modelos y datasets |
| Seguridad y resiliencia | **Control de ingeniería prioritario** | `db:push` contiene `--accept-data-loss`; `db:reset` declara reseteo | Nunca ejecutarlos sobre datos reales; revisar autenticación, autorización, SQL injection, XSS, CSRF, retención de CV, secretos y rollback antes de cambios |

## Plan de verificación de producto

| ID | Prueba | Estado actual | Criterio concreto |
|---|---|---|---|
| MA-01 | Navegación pública sin cuenta | NOT RUN | Acceso real a cursos y recursos sin alta forzada |
| MA-02 | CV y privacidad | NOT RUN | Trazar entrada, almacenamiento, exportación, borrado y cualquier transmisión de datos |
| MA-03 | Fuentes para migrantes | NOT RUN | Muestrear 10 contenidos y comprobar organismos, vigencia, región y comprensión |
| MA-04 | Accesibilidad y cuatro idiomas | NOT RUN | Teclado completo, foco visible, lectura correcta, reducción de movimiento, jerarquía y muestras PT/ES/EN/CA |
| MA-05 | Build y calidad | NOT RUN | Registrar salidas reales de `lint`, `typecheck`, `test:core`, `i18n:verify`, `trust:verify`, `accessibility:verify` y `build` |
| MA-06 | Base de datos y despliegue | NOT RUN | Verificar entrypoint y destino SQLite en despliegue, persistencia, migraciones no destructivas y rollback |
| MA-07 | Cookies, analítica e IA | NOT RUN | Inventario de terceros y reglas aplicables por servicio real |
| MA-08 | Material artístico y didáctico | NOT RUN | Identificar licencias y permisos de reutilización antes de distribución pública |

## Condiciones de entrega

**Bloquean una declaración READY:** fallo de ruta principal, fuga de información personal o secretos, migración destructiva sin respaldo, recurso legal de alto riesgo sin procedencia verificable o uso sin autorización de contenidos protegidos. Las incertidumbres jurídicas se elevan a revisión especializada; no se cierran mediante afirmaciones automáticas.

El contrato de producto está en [`docs/CANON.md`](../CANON.md). No se altera aquí runtime, estructura, base de datos, configuración de Vercel ni datos de usuario.

## Referencias oficiales para revisar contra el uso real

- RGPD: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- Principios y privacidad por diseño (Comisión Europea): https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en
- LOPDGDD: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- Ley 34/2002 LSSI-CE: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- Real Decreto 193/2023: https://www.boe.es/buscar/act.php?id=BOE-A-2023-7417
- Directiva (UE) 2019/882: https://eur-lex.europa.eu/eli/dir/2019/882/oj
- AI Act y su aplicación por fases: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

*La aplicabilidad específica y el calendario deben volver a comprobarse al revisar la implementación y antes de publicar una declaración de cumplimiento.*
