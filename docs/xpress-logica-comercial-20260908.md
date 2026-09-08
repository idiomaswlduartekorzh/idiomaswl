# Xpress: lógica comercial y de pagos

## Decisión de producto

Xpress conserva un resultado básico gratuito al terminar el examen: puntaje general y resumen por sección. El cobro empieza cuando el estudiante quiere entender sus errores, repetir exámenes sin límites o recibir guía humana.

| Opción | Precio | Qué activa |
|---|---:|---|
| Reporte completo | $12.900 una vez | Un intento: revisión pregunta por pregunta, respuestas correctas y áreas de atención |
| Xpress mensual | $49.900 por 30 días | Todos los exámenes Xpress, todos los reportes, historial, comparación y ruta de estudio |
| Xpress guiado | $149.900 por 30 días | Todo lo anterior y una sesión de 50 minutos con David o Zhanna |

La retroalimentación inicial sale de reglas deterministas: tipo de pregunta, sección, respuesta elegida, respuesta correcta y patrones repetidos. No necesita IA para lanzarse.

## Recorrido comercial

1. Antes de empezar se informa que el puntaje básico es gratuito y que el reporte detallado es pago.
2. El estudiante termina el examen y recibe el puntaje general y el resumen por sección.
3. Se muestran las tres opciones con el reporte completo como compra directa.
4. El servidor calcula el precio. El navegador nunca decide el valor ni concede acceso.
5. Wompi confirma el pago por webhook firmado. La redirección solo informa al estudiante.
6. Un pago aprobado crea el derecho correspondiente de forma idempotente.

## Reglas de cobro y acceso

- Un reporte pertenece a una entrega concreta y no vence.
- Una membresía dura 30 días exactos desde la aprobación.
- “Exámenes ilimitados” significa uso personal, con un solo intento activo a la vez y control de automatización abusiva.
- Si el reporte ya está comprado o hay membresía activa, no se abre otro cobro.
- Si alguien compra el reporte y mejora a una membresía dentro de 7 días, se descuentan los $12.900 completos.
- Pasar de mensual a guiado durante el periodo cuesta $100.000 y conserva la misma fecha de cierre.
- Bajar de guiado a mensual se programa para el siguiente periodo.
- La sesión guiada dura 50 minutos, vence al terminar el periodo y no se acumula.
- Un pago anulado o revertido revoca accesos futuros y abre revisión financiera; no borra la trazabilidad.

## Renovación

La primera versión debe vender pases de 30 días con renovación manual usando el Checkout actual. Para débito automático, Wompi exige fuentes de pago tokenizadas y la activación de 3DS/3RI; esa modalidad debe habilitarse solo después de probar creación, renovación, cancelación, pago rechazado y reintento en Sandbox.

## Datos que deberá guardar la integración

- Pedido inmutable: persona, oferta, versión, precio, moneda, entrega asociada y aceptación de condiciones.
- Historial de eventos y proyección actual de cada transacción Wompi.
- Derecho concedido: entrega o cuenta, fecha de inicio, fecha de cierre y causa de revocación.
- Periodo de membresía y cambio de plan pendiente.
- Crédito de sesión: disponible, reservado, usado o vencido.
- Cola de recuperación y trabajos de correo, acceso y notificación.

La tabla heredada `subscriptions` no se reutiliza: está acoplada a planes de idiomas y campos de Stripe. Xpress necesita registros propios para no mezclar productos ni proveedores.

## Indicadores para decidir si escalar

- Conversión principal: pagos aprobados / personas que vieron el resultado.
- Uso con valor: miembros que completan al menos dos exámenes en 30 días.
- Retención: miembros que renuevan al terminar el primer periodo.
- Protección: pagos aprobados sin acceso después de 15 minutos; objetivo operativo 0.
- Guardas: devoluciones, contracargos, sesiones vencidas sin agenda y correos fallidos.

Los precios son hipótesis iniciales. Se revisan después de las primeras 30 ventas o cuatro semanas, lo que ocurra primero, sin cambiar beneficios ni precios a mitad de un periodo activo.
