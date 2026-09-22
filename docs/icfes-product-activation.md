# Resultados y ofertas ICFES: operación y activación segura

## Embudo posterior al simulacro

Al finalizar un simulacro ICFES, el puntaje permanece oculto mientras se guarda un lead válido con nombre, correo, WhatsApp y autorización de contacto. Si el guardado falla, no se libera el resultado y la persona puede corregir o reintentar sin perder el intento.

Después del guardado se muestra gratuitamente únicamente `aciertos/total`. No se muestran porcentaje, desglose por parte, habilidades, respuestas correctas, explicaciones ni recomendaciones. Es un resultado pedagógico y no una predicción del puntaje oficial Saber 11.

## Escalera comercial existente

- **COP 12.900, pago único:** un simulacro propio con informe detallado, revisión pregunta por pregunta, respuesta elegida frente a la correcta, explicaciones disponibles y áreas prioritarias.
- **COP 49.900, renovación cada 30 días:** Xpress con todos los simulacros de la familia ICFES, informes detallados, corrección automática, historial, progreso y ruta de estudio.
- **COP 99.900, renovación cada 30 días:** todo Xpress más revisión personalizada de un tutor de WeLearn en el panel dentro de las 24 horas siguientes al envío.

El checkout directo del informe de COP 12.900 se limita al intento autorizado y a simulacros propios elegibles. Las dos membresías continúan por el flujo Xpress existente de cuenta, condiciones, suscripción y panel. Los cuadernillos históricos atribuidos al ICFES conservan únicamente su marcador gratuito y no venden detalle por intento.

## Estado por defecto

La calificación se realiza en servidor. Las claves se eliminan del payload público. En producción, `ICFES_ATTEMPT_SIGNING_SECRET` es obligatorio.

El cobro está apagado por defecto y necesita dos interruptores:

```dotenv
ICFES_ATTEMPT_SIGNING_SECRET=<32-o-mas-caracteres-aleatorios>
ICFES_PERSISTENCE_ENABLED=true
ICFES_PASE_ENABLED=true
ICFES_PASE_PRICE_COP=12900
ICFES_PASE_ORIGIN=https://www.idiomaswl.com
```

`ICFES_PASE_PRICE_COP` solo acepta `12900`: la UI no decide el monto. También se requieren las variables Wompi existentes (`NEXT_PUBLIC_WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_EVENTS_SECRET`) del mismo ambiente, y las credenciales Supabase existentes. En local o Preview deben ser credenciales Wompi Sandbox. No mezclar prefijos `test` y `prod`.

## Migración Supabase manual

No se aplicó ninguna migración remota en esta implementación. Antes de activar persistencia, revisar y aplicar manualmente, en este orden:

1. `supabase/migrations/20260908170000_icfes_secure_attempts_and_pass.sql`
2. `supabase/migrations/20260921160000_icfes_single_report_offer.sql`

Las tres tablas tienen RLS activo, sin políticas ni permisos para `anon`/`authenticated`; solo las rutas de servidor con `service_role` leen o escriben. La segunda migración habilita nuevas órdenes de COP 12.900, conserva órdenes históricas de COP 49.900 para conciliación y añade la versión de condiciones, privacidad y fecha de aceptación. El entitlement se crea únicamente después de un `APPROVED` verificado.

Rollback manual y destructivo, solo si no hay información que conservar:

```sql
DROP TABLE IF EXISTS public.icfes_entitlements;
DROP TABLE IF EXISTS public.icfes_pass_orders;
DROP TABLE IF EXISTS public.icfes_attempts;
```

## Secuencia de activación

1. Mantener `ICFES_PASE_ENABLED=false`; configurar el secreto de intentos y comprobar el lead obligatorio y el marcador gratuito `aciertos/total`.
2. Aplicar la migración en un proyecto Supabase de prueba. Activar solo `ICFES_PERSISTENCE_ENABLED=true` y verificar que los intentos se guardan sin exposición por Data API.
3. Configurar Wompi Sandbox y el webhook existente `/api/wompi/events`. Verificar la firma del evento y la consulta autoritativa por ID a la API de Wompi, además de monto, referencia, ambiente, reintento idempotente y estados PENDING/APPROVED/DECLINED/ERROR.
4. Activar `ICFES_PASE_ENABLED=true` solo en Preview. Realizar una compra Sandbox completa y comprobar que PENDING no abre el detalle, APPROVED crea exactamente un entitlement y el retorno no simula éxito.
5. Validar en GA4/GTM `icfes_offer_view`, `icfes_paid_detail_intent`, `icfes_checkout_start` e `icfes_purchase_complete`. Ningún evento contiene respuestas ni PII.
6. Obtener aprobación editorial, jurídica, de precio y operación. Solo entonces repetir con credenciales de producción y HTTPS.

Apagar `ICFES_PASE_ENABLED` retira el checkout de inmediato. Apagar además `ICFES_PERSISTENCE_ENABLED` deja el resultado gratuito con intento firmado y evita escrituras; los entitlements ya concedidos permanecen en la base hasta una decisión operativa explícita.
