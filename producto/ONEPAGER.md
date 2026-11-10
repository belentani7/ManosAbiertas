# Ficha de venta — Cohorte patrocinada · Manos Abiertas

**Una página para decidir en dos minutos.**

---

## El problema

Cada semana, entidades sociales, bibliotecas y programas de inserción atienden a personas
recién llegadas que necesitan aprender a manejarse con la administración, la ofimática y la
inteligencia artificial básica. Hay materiales gratis en internet y siguen sin usarse, porque
nadie los convierte en un plan con principio, orden y final.

## La promesa

**En cinco días laborables, la entidad tiene una cohorte de 25 personas recorriendo una ruta
de 8 módulos y 208 niveles, sin que ninguna de ellas se registre ni pague, y funcionando
aunque se caiga el wifi.**

No prometemos certificación, ni aprendizaje garantizado, ni transformación de vidas. Prometemos
una ruta arrancada y medible.

## La prueba

Todo esto se puede abrir y comprobar antes de pagar, en el repositorio público:

| Qué se afirma | Dónde se comprueba |
|---|---|
| 8 módulos, 208 niveles, 832 documentos, 575,0 h estimadas | `ruta.html`, bloque JSON generado por `plataforma/build_ruta.py` |
| Cuatro idiomas: ES, PT, CA, EN | Campos `archivos` de cada nivel en `ruta.html` |
| Sin registro y sin servidor | `ruta.html`: el avance se guarda en `localStorage` |
| Funciona sin conexión tras la primera carga | `campus/sw.js` y `campus/app.js` (registro del service worker) |
| Currículo real, lección por lección | `public/contenido/curriculum/m01…m08`, cuatro archivos por nivel |
| Nada de rastreo | Sin analítica en el repositorio; no hay píxeles ni terceros |

Lo que **no** hay, y por eso no se promete: certificación oficial, panel de gestión de aula,
recogida de datos de participantes, ni un solo cliente que pueda dar testimonio. Este
documento no incluye logos ni citas porque no existen.

## El precio

| Plan | Plazas | Sin IVA | Con IVA (21 %) |
|---|---|---|---|
| Cohorte 25 | 25 | 1.900 € | 2.299 € |
| Cohorte 60 | 60 | 3.900 € | 4.719 € |

Pago único. Incluye kit offline para 30 (o 70) equipos, ruta impresa, dos (o tres) sesiones
de arranque y el informe de cierre. Sin coste por alumno, nunca.

**Garantía:** 30 días, devolución íntegra si la cohorte no llega a arrancar.

## El CTA

Escribe a la dirección de contacto con el asunto **«Cohorte»**, indicando entidad, plazas y
fechas deseadas. Recibes dos huecos para una demostración de 45 minutos y, si encaja, la
factura proforma. La demostración no cuesta nada y no pide tarjeta.

## Quién está detrás

El autor del repositorio `ManosAbiertas`: escribe el currículo, genera la ruta y mantiene el
kit offline. No hay empresa intermediaria, ni inversores, ni un equipo comercial: quien
responde al correo es quien ha escrito las 832 lecciones.

## Las tres frases que resumen la oferta

1. El contenido ya es gratis y seguirá siéndolo; lo que se paga es la puesta en marcha.
2. El alumno no se registra, no paga y no deja datos.
3. Si no arranca en 30 días, se devuelve el dinero.
