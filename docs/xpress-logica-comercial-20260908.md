# Registro y membresías de exámenes

> Documento histórico del 8 de septiembre de 2026. Para ICFES, la oferta vigente
> está definida en `docs/icfes-commerce-v1.md`: un crédito humano por membresía y
> objetivo operativo condicional de 12 horas. Las referencias de ICFES a 24 horas
> o a revisión después de cada entrega en este archivo quedaron sustituidas.

## Registro

Al crear la cuenta, la persona elige una ruta:

1. **Estudiante WeLearn:** escoge el idioma y continúa con la inscripción de clases que ya existe.
2. **Estudiante de examen:** escoge un examen y uno de los dos planes mensuales.

Después de confirmar la cuenta, el estudiante de examen llega a `/suscripcion/examenes`. Allí puede pagar la membresía elegida con Wompi o abrir el selector de clases con el idioma y el objetivo del examen ya preparados.

En esta etapa no se vende la práctica general de idiomas como suscripción. El perfil de examen queda vinculado a una sola familia de examen por periodo.

## Planes de examen

| Plan | Precio por 30 días | Incluye |
|---|---:|---|
| Corrección automática | $49.000 | Todos los mocks del examen elegido, reportes automáticos, revisión pregunta por pregunta, historial y áreas de atención |
| Feedback docente | $99.000 | Todo lo anterior y revisión de David o Zhanna entregada dentro de las 24 horas siguientes a cada entrega |

La corrección automática usa las claves y reglas propias de cada examen. No requiere IA para puntuar preguntas objetivas. Writing, Speaking y otras respuestas abiertas solo se presentan como revisión docente cuando exista una rúbrica verificada para ese examen.

## Reglas de operación

- La membresía dura 30 días desde la aprobación del pago y cubre un examen.
- Los mocks son ilimitados para uso personal y solo puede haber un intento activo a la vez.
- En el plan docente solo puede haber una revisión pendiente por estudiante. Al entregar esa revisión se habilita la siguiente solicitud.
- El plazo de 24 horas comienza cuando el mock completo y sus archivos quedan guardados correctamente.
- Cambiar de examen se programa para el siguiente periodo.
- Subir del plan automático al docente cuesta $50.000 y conserva la fecha final del periodo.
- Bajar de plan se programa para el siguiente periodo.
- El servidor calcula el precio y concede acceso únicamente después del webhook firmado de Wompi.
- Las órdenes usan referencias `WX-`, vencen en 20 minutos y se guardan antes de abrir Wompi.
- Solo puede existir una orden de pago abierta por usuario y ambiente. Esto reduce el riesgo de cobros duplicados.
- El webhook guarda primero la referencia y el identificador de Wompi en una cola durable; después consulta la transacción con la llave privada.
- Un evento `PENDING` tardío no puede degradar una transacción ya aprobada y cada orden concede como máximo una membresía.
- Una selección guardada durante el registro expresa intención de compra; nunca concede acceso pago.
- Un pago anulado o revertido revoca el acceso futuro y conserva todo el historial financiero.

## Clases desde la membresía

Las clases son un complemento opcional y no cambian el precio de $49.000 o $99.000. El botón **Comprar clases** abre el flujo real de clases con Wompi y preselecciona el examen cuando existe una equivalencia en el catálogo. Ese flujo conserva su propio reglamento, vigencia y comprobante; de esta forma no se mezclan dos servicios distintos en una sola orden.

## Persistencia necesaria para el cobro

- Perfil: ruta elegida, idioma, examen y plan seleccionado.
- Pedido inmutable: persona, examen, oferta, versión, precio, moneda y aceptación de condiciones.
- Transacción: referencia Wompi, historial de eventos y estado verificado.
- Membresía: examen, plan, inicio, final, cambio programado y causa de revocación.
- Revisión docente: entrega, fecha límite, estado, responsable y fecha de entrega.
- Cola de recuperación para pagos, acceso, correos y revisiones que fallen temporalmente.

Estas piezas están implementadas en las tablas privadas `xpress_orders`, `xpress_payment_transactions`, `xpress_payment_events`, `xpress_memberships`, `xpress_fulfillment_jobs`, `xpress_payment_reconciliation_queue` y `xpress_teacher_reviews`. El navegador no puede leerlas directamente: las rutas del servidor autentican al usuario y usan el cliente administrativo solo después de verificar propiedad.

La tabla heredada `subscriptions` no se reutiliza porque mezcla planes de idiomas y campos de Stripe. Las membresías de examen necesitan registros propios y trazabilidad por examen.

## Renovación

El lanzamiento usa pases de 30 días con renovación manual mediante el Checkout actual. El débito automático se activa después de implementar fuentes de pago tokenizadas de Wompi y probar renovación, cancelación, pago rechazado y reintento en Sandbox.

## Indicadores

- Pagos aprobados / personas que eligieron un plan.
- Miembros que completan al menos dos mocks por periodo.
- Renovaciones al terminar los primeros 30 días.
- Pagos aprobados sin acceso después de 15 minutos; objetivo 0.
- Revisiones docentes entregadas antes de 24 horas.
- Devoluciones, contracargos y trabajos de correo o acceso fallidos.
