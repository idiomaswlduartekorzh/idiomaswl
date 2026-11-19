# Apple Pay en compras únicas de cursos

Estado: integración en rama `codex/apple-pay-epayco-20261119`; bandera apagada. Wompi sigue disponible. No se ha cobrado ni desplegado con ePayco.

## Alcance

`/inscripcion` ofrece ePayco SmartCheckout Standard para órdenes de cursos ya creadas. ePayco muestra Apple Pay en dispositivos compatibles cuando haya habilitado ese medio para la cuenta. El checkout conserva su propia selección de métodos; nuestra UI no fuerza una billetera. No cambia las suscripciones de Xpress ni la fuente de pago recurrente de Wompi. ePayco anuncia Google Pay para su **datáfono presencial**, sin confirmar ese medio en SmartCheckout web. [PayU sí documenta Google Pay en Colombia para su WebCheckout](https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-colombia.html), sujeto a activación por el gerente de cuenta; sería una integración y contrato separados.

## Activación

1. Abrir o verificar una cuenta empresarial ePayco y solicitar la habilitación de Apple Pay para SmartCheckout Standard. Confirmar con ePayco condiciones, tarifas, elegibilidad de tarjetas y operación en COP. [Guía oficial de Apple Pay](https://docs.davipay.com/docs/habilitaci%C3%B3n-apple-pay-en-on-page).
2. Configurar en el entorno servidor `EPAYCO_PUBLIC_KEY`, `EPAYCO_PRIVATE_KEY`, `EPAYCO_CUSTOMER_ID`, `EPAYCO_P_KEY` y `EPAYCO_ENVIRONMENT=sandbox`. Nunca exponer la llave privada ni `P_KEY` como `NEXT_PUBLIC_*`. El entorno de ePayco debe coincidir con el de la orden/Wompi.
3. Hacer una compra de prueba y verificar: sesión, visualización del botón en Safari compatible, retorno `ref_payco`, confirmación firmada, abono único en `course_payment_transactions`, matrícula y coordinación. Probar también rechazo, pendiente, reintento de webhook y retorno del navegador antes del webhook.
4. Tras validar Sandbox, cargar credenciales de producción **solo** en Production y `EPAYCO_ENVIRONMENT=production`. Activar `EPAYCO_COURSE_ENABLED=true` como último paso. Para apagar nuevas sesiones de ePayco, volver a `false` y conservar las credenciales: confirmaciones y conciliación de pagos en curso siguen funcionando.

SmartCheckout Standard no requiere registrar el dominio de Apple Pay en este sitio: la guía oficial exige verificación del dominio para la variante On Page. Se eligió Standard por esa diferencia. [Implementación oficial](https://docs.davipay.com/docs/checkout-implementacion).

## Conciliación y seguridad

La URL de retorno trae una referencia no confiable. El servidor consulta a ePayco, valida su firma, comercio, ambiente, referencia de factura, moneda, monto y estado frente a la orden inmutable antes de llamar a `record_course_payment`. La confirmación también verifica la firma y vuelve a consultar a ePayco. Los IDs de ePayco se guardan como `epayco:<ref_payco>` para convivir con IDs de Wompi en la tabla y cola actuales. La recuperación periódica reconoce ese prefijo. [Respuesta y confirmación oficiales](https://docs.davipay.com/docs/checkout-respuesta-y-confirmacion).

## Pendiente para producción

- Conseguir cuenta y credenciales ePayco, y confirmar que Apple Pay esté habilitado.
- Ejecutar las pruebas de extremo a extremo en Sandbox y revisar la respuesta real de la API de validación, incluido `x_signature` y los estados de aprobación/reversión.
- Decidir si abrir una cuenta PayU para Google Pay web, pedir su activación y comparar tarifas/conciliación frente a ePayco y Wompi. Hasta integrar PayU no anunciar Google Pay en la interfaz.
- Revisar el contrato comercial y el flujo de conciliación/reembolsos de dos pasarelas antes de activar la bandera.
