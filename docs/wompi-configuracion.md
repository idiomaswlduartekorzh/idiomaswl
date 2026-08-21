# Configuracion de Wompi

Esta base deja listas las credenciales para integrar Wompi Colombia sin activar aun cobros ni webhooks.

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

## Siguiente fase

Despues de cargar y validar las credenciales se puede implementar el checkout, la firma de integridad y el endpoint de eventos. Hasta entonces no se procesa dinero ni se registra una URL de webhook.
