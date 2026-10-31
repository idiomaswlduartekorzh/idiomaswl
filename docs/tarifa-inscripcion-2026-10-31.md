# Tarifa de inscripción de clases

El 31 de octubre de 2026 se sustituyó la propuesta anterior de $99.000 por **$44.200 COP**, tras ajustar al alza una primera propuesta de $19.900. Esta tarifa corresponde al ingreso a clases con tutor, no a la creación gratuita de una cuenta ni a los simulacros. El ciclo de clases conserva su precio.

La preparación para **cualquier examen** suma **$99.000 COP** por acceso a la plataforma de preparación. Es un pago único por estudiante, aunque luego cambie de examen. El programa de idioma general no lleva ese adicional. La primera compra Esencial para un examen queda en $463.200 COP: $320.000 del ciclo, $44.200 de inscripción y $99.000 de plataforma. Los recursos y tipos de corrección disponibles varían según el examen; el cobro no promete que todas las pruebas tengan las mismas herramientas ni una cantidad ilimitada de revisiones humanas.

## Referencias y economía

- La [tabla oficial de Santo Tomás Bucaramanga para 2026](https://secretariageneral.usta.edu.co/media/attachments/2026/01/16/acuerdo-20---deroga-acuerdo-19.-dhos-pecuniarios.-23-12-2025.pdf) fija la inscripción del Instituto de Lenguas en $36.500 (página de «Tarifas del Instituto de Lenguas»). Nuestra tarifa queda $7.700 por encima de esa referencia. No se encontró una tabla pública comparable y vigente para todas las academias locales; no se afirma que sea menor que ellas.
- [Wompi publica](https://wompi.co/es/co/planes-tarifas/) una tarifa estándar de 2,65 % + $700 + IVA sobre la comisión por transacción exitosa. Sobre una primera compra Esencial de $364.200, el costo estimado de Wompi es aproximadamente $12.318. El valor real depende del plan, medio, acuerdo comercial y retenciones. La tarifa de inscripción no cubre necesariamente toda la comisión de compras grandes.
- En la primera compra Esencial para examen de $463.200, la misma fórmula da aproximadamente $15.439 de comisión Wompi. Los dos adicionales suman $143.200 antes de esa comisión y de los demás costos del servicio. Esto no equivale a utilidad neta.
- [Vercel Pro](https://vercel.com/docs/plans/pro-plan) tiene un cargo de plataforma de USD 20 al mes, con crédito de uso incluido, antes de impuestos y consumo adicional. La inscripción puede contribuir a pagarlo; no hay garantía de cobertura mensual sin volumen de ventas ni conciliación de costos.

## Regla versionada

- `enrollment-20261031-v1`: primera orden de clases pagada por el correo del estudiante, $44.200.
- Nuevo ciclo dentro de los 42 días siguientes al último pago aprobado de clases del mismo correo y ambiente: $0.
- Después de 42 días sin otro pago aprobado: $44.200. La fecha se calcula desde la aprobación registrada por el proveedor; una excepción por aplazamiento acordado requerirá atención manual.
- Un pedido pendiente no exime. Una orden abierta del mismo correo impide abrir otra hasta que se pague o expire; sus reintentos usan la misma referencia. Las órdenes anteriores conservan su monto y condiciones. Los estudiantes con un ciclo pagado antes de esta versión reciben continuidad si están dentro del plazo.
- `exam-platform-20261031-v1`: el primer curso de preparación para un examen cobra $99.000. Un curso anterior de examen pagado o una asignación WeLearn activa exime al mismo estudiante. Un curso de idioma general anterior no exime del pago de plataforma cuando el estudiante comienza a preparar un examen. El importe y la razón quedan congelados en la orden. Se usa el correo del estudiante como identidad comercial, al igual que en la regla de inscripción.
- La función de base de datos decide y congela importe, motivo, versión y pago previo bajo bloqueo por correo. Wompi verifica el total congelado de la orden. No se concede inscripción ni clases por un retorno del navegador sin aprobación verificada.

## Despliegue

Las migraciones `20261031172547_course_enrollment_fee.sql` y `20261031174346_course_exam_platform_fee.sql` ya se aplicaron en el proyecto Supabase canónico. La API nueva exige ambas versiones de tarifa y falla antes de abrir Wompi si falta alguna. Desplegar el código desde `main` y confirmar con una transacción Sandbox el total y la firma antes de una venta real.
