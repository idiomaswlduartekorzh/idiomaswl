# Pase ICFES: operación y activación segura

## Qué está disponible sin pagar

Al finalizar un simulacro ICFES, el estudiante ve inmediatamente aciertos, total, porcentaje, desglose por parte, desglose pedagógico por habilidad y una recomendación. Este valor aparece antes de cualquier formulario. El contacto es opcional, posterior al resultado y exige consentimiento explícito.

El porcentaje es de esta práctica: no es un puntaje oficial ni una predicción del resultado Saber 11.

## Qué se vende

La fachada comercial ICFES v1 presenta tres opciones después del resultado gratuito y del contacto opcional:

- **COP 12.000, pago único:** respuestas y análisis pregunta por pregunta de un intento propio elegible.
- **COP 49.000, acceso por 30 días:** catálogo de simulacros propios y retroalimentación automática.
- **COP 99.000, acceso por 30 días:** lo anterior más un crédito de revisión docente por periodo, con objetivo operativo de entrega dentro de 24 horas.

Las membresías se renuevan manualmente; no se autoriza débito recurrente. Tampoco se promete acceso perpetuo, subida de puntaje ni contenido oficial. Los diez cuadernillos divulgados atribuidos al ICFES conservan únicamente su resultado básico gratuito y no entran en el producto mientras falten verificación independiente por ítem y revisión jurídica.

El detalle de un intento queda ligado a la cuenta autenticada cuando existe. Para una compra anónima, el navegador recibe una capacidad HttpOnly distinta por intento, válida durante 30 días; no es un enlace público ni se comparte entre intentos.

## Estado por defecto

La calificación se realiza en servidor. Las claves se eliminan del payload público. En producción, `ICFES_ATTEMPT_SIGNING_SECRET` es obligatorio.

El cobro está apagado por defecto y necesita dos interruptores:

```dotenv
ICFES_ATTEMPT_SIGNING_SECRET=<32-o-mas-caracteres-aleatorios>
ICFES_PERSISTENCE_ENABLED=true
ICFES_PASE_ENABLED=true
ICFES_PASE_PRICE_COP=12000
ICFES_PASE_ORIGIN=https://www.idiomaswl.com
```

`ICFES_PASE_PRICE_COP` solo acepta `12000`: la UI no decide el monto del detalle por intento. Las membresías de COP 49.000 y COP 99.000 derivan sus importes del catálogo Xpress central. También se requieren las variables Wompi existentes (`NEXT_PUBLIC_WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_EVENTS_SECRET`) del mismo ambiente, y las credenciales Supabase existentes. En local o Preview deben ser credenciales Wompi Sandbox. No mezclar prefijos `test` y `prod`.

## Migración Supabase manual

No se aplicó ninguna migración remota en esta implementación. Antes de activar persistencia, revisar y aplicar manualmente:

`supabase/migrations/20260908170000_icfes_secure_attempts_and_pass.sql`

Las tres tablas tienen RLS activo, sin políticas ni permisos para `anon`/`authenticated`; solo las rutas de servidor con `service_role` leen o escriben. La migración fija COP 12.000 para el detalle por intento, mantiene respuestas y resultados privados, registra órdenes idempotentes y crea un entitlement solo después de `APPROVED` verificado.

Rollback manual y destructivo, solo si no hay información que conservar:

```sql
DROP TABLE IF EXISTS public.icfes_entitlements;
DROP TABLE IF EXISTS public.icfes_pass_orders;
DROP TABLE IF EXISTS public.icfes_attempts;
```

## Secuencia de activación

1. Mantener `ICFES_PASE_ENABLED=false`; configurar el secreto de intentos y comprobar el resultado gratuito.
2. Aplicar la migración en un proyecto Supabase de prueba. Activar solo `ICFES_PERSISTENCE_ENABLED=true` y verificar que los intentos se guardan sin exposición por Data API.
3. Configurar Wompi Sandbox y el webhook existente `/api/wompi/events`. Verificar la firma del evento y la consulta autoritativa por ID a la API de Wompi, además de monto, referencia, ambiente, reintento idempotente y estados PENDING/APPROVED/DECLINED/ERROR.
4. Activar `ICFES_PASE_ENABLED=true` solo en Preview. Realizar una compra Sandbox completa y comprobar que PENDING no abre el detalle, APPROVED crea exactamente un entitlement y el retorno no simula éxito.
5. Validar en GA4/GTM `icfes_offer_view`, `icfes_paid_detail_intent`, `icfes_checkout_start` e `icfes_purchase_complete`. Ningún evento contiene respuestas ni PII.
6. Ejecutar el arnés de lanzamiento y resolver todos sus bloqueos, incluida capacidad docente, pruebas de permisos, pruebas de pagos y línea base SEO.
7. Obtener aprobación editorial, jurídica, de precio y operación. Solo entonces repetir con credenciales de producción y HTTPS.

Apagar `ICFES_PASE_ENABLED` retira el checkout de inmediato. Apagar además `ICFES_PERSISTENCE_ENABLED` deja el resultado gratuito con intento firmado y evita escrituras; los entitlements ya concedidos permanecen en la base hasta una decisión operativa explícita.
