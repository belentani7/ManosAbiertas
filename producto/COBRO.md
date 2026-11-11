# Cobro — Manos Abiertas

## Qué se cobra y en qué momento

Un pago único por cohorte, **antes** de la entrega del kit y de la primera sesión. No hay
suscripción ni cobro recurrente: no hay nada que cancelar.

| Momento | Qué ocurre | Importe |
|---|---|---|
| Demostración | 45 minutos, sin coste y sin datos de tarjeta | 0 € |
| Reserva | factura proforma y pago | 100 % del plan |
| Entrega | kit, ruta impresa, agenda de sesiones | — |
| Cierre | informe y, si procede, devolución | −100 % si aplica garantía |

## Pasarela elegida

**Stripe Checkout** para entidades privadas y **transferencia con factura** para
administraciones, fundaciones y universidades que no pueden pagar con tarjeta.

Estado real: **Stripe no está configurado en este repositorio**. No hay claves, ni producto
creado, ni webhook. El alta es este trabajo pendiente, en orden:

1. Crear la cuenta de empresa en Stripe con el CIF de la entidad vendedora y la cuenta
   bancaria de abono. Verificación de identidad y de titularidad: 2–5 días.
2. Crear **dos Price** de pago único: `cohorte-25` (1.900 €) y `cohorte-60` (3.900 €), en EUR,
   con el IVA 21 % como tax rate aplicado en el Checkout (Stripe Tax o tipo manual).
3. Activar el enlace de pago y el recibo automático por correo; la factura española se emite
   con el número correlativo de la entidad, no con el identificador de Stripe.
4. Alternativa sin pasarela mientras dure el alta: transferencia SEPA a la cuenta de la
   entidad, con factura proforma previa. Es el camino que se usará con la primera cohorte.

No se pide ni se almacena ningún dato de tarjeta: el cobro ocurre en el dominio de la
pasarela y este repositorio no tiene backend que reciba pagos.

## Qué datos hacen falta para facturar

- Razón social y CIF (o NIF para autónomos).
- Dirección fiscal completa.
- Nombre y correo de la persona que gestiona la factura.
- Número de plazas y plan (cohorte 25 o 60).
- Para entidades sin ánimo de lucro que pidan descuento: estatutos o certificado de la entidad.

Nada más. No se piden datos de los participantes: no se recogen, no se procesan y no se
ceden. La entidad es la única responsable de los datos de su grupo.

## Qué se entrega tras pagar

1. **Factura** en PDF con el IVA desglosado, en 24 horas laborables.
2. **Enlace de descarga del kit** (un archivo comprimido con el sitio estático y las
   instrucciones de instalación en los equipos de la entidad), en 5 días laborables.
3. **Ruta impresa** en PDF lista para imprimir en A4, con los 8 módulos y los 208 niveles.
4. **Calendario de las dos sesiones**, acordado por correo con la entidad.
5. **Plantilla de informe de cierre** y la fecha de la segunda sesión.

La entrega se hace por correo y descarga directa. No hay área de cliente ni panel: sería una
promesa que el producto todavía no cumple.

## Política de reembolso

- **30 días** desde el pago o desde la primera sesión (lo que ocurra después).
- Condición: que el kit no se haya usado con el grupo. Se pregunta una vez, se acepta la
  respuesta y se devuelve.
- Vía: la misma pasarela o transferencia SEPA si el pago fue por transferencia, en un máximo
  de 7 días laborables.
- Si el fallo es nuestro (el kit no funciona en los equipos de la entidad y no se resuelve en
  10 días), la devolución es íntegra sin condición alguna, incluida la parte de sesiones ya
  impartidas.

## Lo que no se cobra

- El acceso del alumno: cero, siempre (`plataforma/PAYWALL.md`).
- La demostración.
- El contenido: quien quiera, lo usa gratis desde el repositorio.

## Pendiente antes de publicar la landing

El correo de contacto de `landing.html` es un marcador (`hola@manosabiertas.example`) y debe
sustituirse por una dirección real con buzón atendido. Hasta que eso ocurra, la landing no se
publica: una página que recoge correos en una dirección que no existe es peor que no tener
página.
