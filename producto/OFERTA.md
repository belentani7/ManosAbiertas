# Oferta — Manos Abiertas

> Documento comercial. Todo lo que aquí se afirma sobre el producto está medido en el
> repositorio y se puede comprobar abriendo la ruta indicada. Nada de clientes, cifras de
> uso ni testimonios: no hay ninguno todavía y no se inventa.

## Qué se vende

**Una cohorte patrocinada**: 25 plazas de la ruta completa de Manos Abiertas, puestas a
disposición de las personas que atiende una entidad, más el kit para usarla en aula y el
acompañamiento de arranque.

No se vende el contenido —el contenido es abierto y seguirá siéndolo—. Se vende **poner la
ruta a funcionar** en una entidad concreta: instalación offline en sus equipos, ruta
impresa para el aula, dos sesiones de arranque y un informe de cierre.

Qué incluye exactamente:

| Pieza | Qué es | Dónde está en el repositorio |
|---|---|---|
| Ruta completa | 8 módulos, 208 niveles, 832 documentos, 575,0 horas estimadas, en ES/PT/CA/EN | `ruta.html` (datos generados por `plataforma/build_ruta.py`) |
| Uso sin registro | El alumno no crea cuenta: su progreso vive en su navegador | `ruta.html` (progreso en `localStorage`) |
| Kit offline | Sitio instalable que funciona sin conexión tras la primera carga | `campus/sw.js`, `campus/manifest.webmanifest` |
| Ruta impresa | Versión imprimible de los niveles para trabajar en papel | `assets/print.css`, `ruta.html` |
| Arranque acompañado | 2 sesiones de 90 minutos con el autor de la ruta | Servicio humano, se agenda tras el cobro |
| Informe de cierre | Plantilla de recuento de niveles completados, sin datos personales | Se entrega en la sesión 2 |

## A quién

Entidades que ya acompañan a personas recién llegadas y quieren darles una ruta formativa
ordenada sin montar un campus propio:

1. **Entidades sociales y fundaciones** con aula de acogida o programa de empleabilidad.
2. **Bibliotecas y centros cívicos** con ordenadores públicos y talleres de competencias digitales.
3. **Departamentos de RSC de empresas** que financian inserción y quieren una acción concreta y medible.

Perfil de comprador: una persona con presupuesto de formación o de acción social y con
capacidad de convocar a 25 participantes. No se vende a alumnos: **el alumno nunca paga**.

## Precio

| Plan | Plazas | Precio (sin IVA) | IVA 21 % | Total |
|---|---|---|---|---|
| Cohorte 25 | 25 | 1.900 € | 399 € | **2.299 €** |
| Cohorte 60 | 60 | 3.900 € | 819 € | **4.719 €** |

Pago único por cohorte. Sin cuota mensual, sin coste por alumno, sin renovación automática.
Precio de lanzamiento: válido para las tres primeras cohortes y revisable después. El
detalle de límites está en [`precios.json`](precios.json).

Las dos sesiones de arranque son presenciales en Barcelona o por videollamada; el
desplazamiento fuera del área metropolitana se presupuesta aparte y se dice antes de firmar.

## Garantía

**30 días desde el pago o desde la primera sesión, lo que ocurra después, con devolución
íntegra del importe si la entidad no ha llegado a usar el kit con su grupo.**

No se pide justificación: se devuelve y se cierra. Motivo de la garantía: el riesgo real de
este producto no es la calidad del contenido —está escrito y es verificable— sino que la
entidad no llegue a arrancar. Ese riesgo lo asume quien vende, no quien compra.

## Objeciones

### «Si el contenido es gratis, ¿por qué pago?»

Porque el contenido gratis ya está publicado y no es lo que se compra. Se paga la puesta en
marcha: instalar el kit en equipos que no son tuyos, imprimir la ruta, convocar y arrancar
dos sesiones, y cerrar con un recuento. Una entidad que prefiera hacerlo por su cuenta puede
hacerlo hoy mismo, gratis, abriendo `ruta.html`; esta oferta es para quien no tiene a nadie
que lo haga.

### «¿Esto certifica? ¿Vale para un currículum?»

No. Manos Abiertas **no certifica** y la ficha del repositorio lo declara fuera de alcance
(`plataforma/FICHA.md`, «lo que este repositorio no va a hacer»: certificar sin entidad). Lo
que se entrega es constancia interna de la entidad con los niveles completados. Si la
entidad es una entidad certificadora, puede emitir su propio documento; nosotros no ponemos
nuestro sello detrás de una evaluación que no hacemos.

### «Nuestros participantes no saben usar un ordenador y la conexión es mala»

Es el caso para el que está hecho: no hay registro, no hay contraseña, no hay servidor. La
primera carga se hace una vez con la conexión de la entidad y después el kit funciona sin
red (`campus/sw.js`). La ruta impresa cubre a quien no quiera pantalla. Lo que no hay
todavía es un modo aula con panel de gestión: eso figura como **pendiente** en
`plataforma/FICHA.md` y no se incluye en esta oferta.

## Lo que no se vende (y por qué)

- **Acceso al alumno.** El muro es cero por diseño (`plataforma/PAYWALL.md`, regla dura).
- **Modo aula con panel de gestión.** Pendiente de construir; venderlo sería vender lo que no hay.
- **Certificación.** Requiere una entidad certificadora; no la tenemos.
- **Datos de los participantes.** No se recogen, no se venden, no se ceden.
