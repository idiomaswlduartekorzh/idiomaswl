# Configuracion de Wompi

El checkout de Idiomas WeLearn usa el Widget oficial de Wompi Colombia y empieza siempre en Sandbox. Los montos, referencias y firmas se generan en el servidor; el navegador nunca recibe secretos.

## Variables requeridas

| Variable | Uso | Visibilidad |
|---|---|---|
| `NEXT_PUBLIC_WOMPI_PUBLIC_KEY` | Widget o Checkout Web | Navegador y servidor |
| `WOMPI_PRIVATE_KEY` | Operaciones autenticadas con la API | Solo servidor |
| `WOMPI_INTEGRITY_SECRET` | Firma de referencias y montos del checkout | Solo servidor |
| `WOMPI_EVENTS_SECRET` | Validacion de eventos/webhooks | Solo servidor |

Wompi entrega un juego independiente para cada ambiente. En local y en despliegues Preview deben usarse credenciales Sandbox (`pub_test_`, `prv_test_`, `test_integrity_`, `test_events_`). Production debe usar exclusivamente credenciales de produccion (`pub_prod_`, `prv_prod_`, `prod_integrity_`, `prod_events_`).

No hace falta configurar una URL de API: el sistema la deriva de los prefijos y rechaza cualquier mezcla de ambientes.

## Configuracion local

1. En el Dashboard de Comercios Wompi, abre **Desarrollo > Programadores** y activa el modo Sandbox.
2. Agrega las cuatro variables de `.env.example` al archivo local `.env.local`. No reemplaces las variables que ya existan en ese archivo.
3. Verifica la configuracion sin imprimir ninguna credencial:

   ```bash
   npm run check:wompi-env
   ```

`.env.local` esta ignorado por Git y no debe commitearse.

## Configuracion en Vercel

En **Project Settings > Environment Variables**, crea las mismas cuatro variables con este alcance:

- **Development** y **Preview**: credenciales Sandbox.
- **Production**: credenciales de produccion.

Marca como sensibles `WOMPI_PRIVATE_KEY`, `WOMPI_INTEGRITY_SECRET` y `WOMPI_EVENTS_SECRET`. La llave `NEXT_PUBLIC_WOMPI_PUBLIC_KEY` es publica por diseno y Next.js la incorpora al bundle durante el build, por lo que cualquier cambio requiere un nuevo despliegue.

## Uso desde codigo

- Cliente/Widget: `getWompiPublicConfig()` desde `@/lib/wompi/client`.
- Route Handlers, Server Actions o Server Components: `getWompiServerConfig()` desde `@/lib/wompi/server`.

El modulo de servidor usa `server-only` para impedir que las tres credenciales privadas entren por accidente en codigo del navegador. La validacion ocurre al pedir la configuracion, de modo que el sitio puede compilar antes de cargar las llaves, pero cualquier flujo de pago falla de forma explicita si falta una variable o si los ambientes no coinciden.

## Flujo implementado

1. La pagina `/precios` envia solamente plan, idioma y periodo a `POST /api/wompi/checkout`.
2. El servidor busca el precio en `src/lib/wompi/catalog.ts`, crea una referencia unica y firma referencia + monto + COP con el secreto de integridad.
3. El Widget de Wompi recoge los datos del pagador y del medio de pago dentro de la interfaz de Wompi.
4. `/pagos/resultado?id=...` consulta el ID directamente en la API de Wompi y solo muestra transacciones cuya referencia y monto coinciden con el catalogo.
5. `POST /api/wompi/events` verifica dinamicamente las propiedades firmadas del evento y actualiza el ledger privado.

El plan mensual es una compra unica de un mes; no es una suscripcion ni genera debitos automaticos. El plan anual se cobra en un unico pago equivalente a diez mensualidades.

## Ledger de pagos

La migracion `supabase/migrations/20260821150000_wompi_transactions.sql` crea `public.wompi_transactions` con RLS habilitado y acceso exclusivo para `service_role`. No guarda correo, documento, direccion ni datos de tarjeta.

- En Sandbox, el checkout puede probarse sin Supabase en Preview; Wompi conserva la transaccion y la pagina de resultado la consulta directamente.
- En Produccion, el checkout se bloquea si el ledger no esta disponible. Antes de activar llaves reales se debe aplicar y verificar la migracion.

## URL de eventos Sandbox

Despues de desplegar el Preview, configura en el Dashboard de Wompi la URL HTTPS exacta del despliegue:

```text
https://<preview>.vercel.app/api/wompi/events
```

Sandbox y Produccion deben tener URLs de eventos independientes. No apuntes Sandbox al dominio productivo ni uses el secreto de eventos de Produccion en Preview.

## Verificacion

```bash
npm run check:wompi-env
npm run test:wompi
npx tsc --noEmit
```

Antes de pasar a dinero real:

1. Completa una transaccion aprobada, una rechazada y una pendiente en Sandbox.
2. Confirma que Wompi recibe HTTP 200 del webhook y que el estado coincide con la consulta activa.
3. Aplica y verifica la migracion del ledger en la base de Produccion.
4. Carga las cuatro credenciales de Produccion con alcance exclusivo **Production** en Vercel.
5. Configura `https://www.idiomaswl.com/api/wompi/events` como URL de eventos de Produccion.
