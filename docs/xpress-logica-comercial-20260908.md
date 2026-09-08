# Registro y membresías de exámenes

## Registro

Al crear la cuenta, la persona elige una ruta:

1. **Estudiante WeLearn:** escoge el idioma y continúa con la inscripción de clases que ya existe.
2. **Estudiante de examen:** escoge un examen y uno de los dos planes mensuales.

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
- Una selección guardada durante el registro expresa intención de compra; nunca concede acceso pago.
- Un pago anulado o revertido revoca el acceso futuro y conserva todo el historial financiero.

## Persistencia necesaria para el cobro

- Perfil: ruta elegida, idioma, examen y plan seleccionado.
- Pedido inmutable: persona, examen, oferta, versión, precio, moneda y aceptación de condiciones.
- Transacción: referencia Wompi, historial de eventos y estado verificado.
- Membresía: examen, plan, inicio, final, cambio programado y causa de revocación.
- Revisión docente: entrega, fecha límite, estado, responsable y fecha de entrega.
- Cola de recuperación para pagos, acceso, correos y revisiones que fallen temporalmente.

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
