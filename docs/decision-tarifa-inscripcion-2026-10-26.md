# Decisión pendiente: tarifa de inscripción de clases

**Registrada el 26 de octubre de 2026. Estado: propuesta guardada; cobro inactivo.**

El propietario propone una **tarifa de inscripción única de $99.000 COP** para clases con tutor. Su finalidad es ayudar a cubrir los costos de procesamiento de Wompi y de operación de la plataforma (incluidos Codex y Vercel). No es una cuota mensual ni una renovación automática. El valor propuesto es una decisión comercial, no un cálculo verificado de esos costos.

La persona que continúa sus clases sin pausa **no vuelve a pagar la tarifa** al comprar su siguiente ciclo. La continuidad debe reconocerse en el servidor a partir de órdenes y ciclos pagados, no de una casilla, un parámetro de URL ni de una afirmación del navegador. Si alguien interrumpe las clases y se inscribe de nuevo, la intención es volver a aplicar la tarifa. La definición objetiva de «pausa» y el tratamiento de ausencias justificadas, reprogramaciones, devoluciones y estudiantes actuales quedan por confirmar antes de activarla.

## Preparación para la implementación futura

1. Versionar una oferta de inscripción independiente del precio de las clases. La primera orden elegible debe desglosar **tarifa $99.000 + ciclo de clases** y mostrar el total antes de abrir Wompi. El importe firmado y verificado en Wompi debe coincidir con ese total; una orden ya creada conserva su precio y versión.
2. Guardar en la base de datos una decisión de elegibilidad auditable: estudiante, último ciclo pagado, fecha de cierre, motivo de cobro o exención, tarifa aplicada y versión de la regla. Protegerla contra modificaciones del cliente y duplicados por reintentos o webhooks repetidos.
3. Para el siguiente ciclo continuo, registrar la exención con importe **$0** de inscripción. Resolver la continuidad con fechas y pagos confirmados por el servidor. No usar el regreso del navegador desde Wompi como prueba de pago.
4. Actualizar el formulario de `/inscripcion`, el resumen de `/precios`, el comprobante, las condiciones comerciales versionadas y la comunicación de bienvenida. Explicar claramente cuándo se cobra de nuevo. Mantener las órdenes antiguas bajo las condiciones y los montos que aceptaron.
5. Probar primera inscripción, compra continua, pausa y regreso, intentos duplicados, cobro rechazado, reembolso y carrera entre dos órdenes. Confirmar en Sandbox el monto y la firma antes de una venta real.
6. Activar únicamente cuando el propietario diga que se incorpore al flujo. Hasta entonces, no crear órdenes por la tarifa, no cambiar los montos actuales, no mostrarla como vigente y no modificar la configuración de Wompi.

**Puntos de integración actuales:** `src/lib/course-pricing/catalog.ts` contiene los planes; `payment.ts` calcula el monto en el servidor; `payments.server.ts` prepara la orden y firma el checkout; `/api/course-orders` crea la inscripción. El flujo vende ciclos de cuatro semanas sin renovación automática, por lo que la regla de continuidad necesita una definición expresa antes de programarse.

**Decisiones pendientes para el día de activación:** plazo máximo entre ciclos que cuenta como continuidad; exenciones de estudiantes inscritos antes del cambio; manejo de pausas acordadas con el tutor; si los $99.000 son reembolsables y cómo se reflejan en el comprobante/factura. La cifra también debe revisarse frente a la tarifa vigente de Wompi y los costos reales de operación.
