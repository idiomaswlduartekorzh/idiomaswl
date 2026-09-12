# Candidato de precios, reglamento y Wompi

Worktree exclusivo `precios-wompi-20260907`, rama `codex/precios-wompi-20260907`, integrada en `main`. La venta fue autorizada y liberada el 8 de septiembre de 2026 mediante un estado versionado en Git; `COURSE_SALES_EMERGENCY_DISABLED=true` funciona como cierre de emergencia.

## Alcance implementado

Cinco planes de cuatro semanas y ocho idiomas, paleta azul/rojo y cápsulas diagonales del logo. Vista local en puerto 3106. Catálogo anterior conservado por defecto; el nuevo se activa con `COURSE_PRICING_ENABLED=true` o preview local.

Inscripción guardada antes del checkout; precio calculado en servidor; orden inmutable; firma con caducidad; referencia reutilizable para reintentos; historial disponible cuando la compra queda vinculada a la cuenta. El checkout solo retorna a `https://www.idiomaswl.com` en producción, con validación del Origin y Host.

El flujo actualizado permite preparar el pago sin una cuenta previa. El navegador recibe una credencial temporal `HttpOnly`, derivada con un secreto del servidor, para consultar únicamente esa orden. Cuando Wompi confirma `APPROVED`, se crean trabajos durables e idempotentes para: crear o vincular la cuenta del estudiante, enviar por Resend una bienvenida con su enlace de activación o acceso, avisar al propietario por correo y dejar pendiente la coordinación. La cuenta empieza con el acceso básico `autodidacta`; la compra de clases no concede automáticamente un plan digital distinto. Las acciones externas usan arrendamientos cortos y reintentos; los correos de Resend llevan claves de idempotencia. Supabase genera el enlace firmado, pero no necesita enviar un segundo correo.

El webhook reconoce referencias `WC-` tras comprobar la firma y consulta Wompi para obtener importe/moneda/estado. El registro del evento, la proyección y el crédito se realizan en una transacción de PostgreSQL. Una aprobación duplicada no duplica sesiones. Dos transacciones aprobadas generan revisión financiera. Un estado tardío PENDING no revierte APPROVED/VOIDED. Los cambios previos del webhook para catálogo anterior y TOEFL permanecen.

El reglamento final es visible antes del formulario. Sus reglas se presentan en tarjetas con los puntos cruciales destacados; una confirmación obligatoria desbloquea los datos del estudiante y las autorizaciones separadas. El servidor valida versiones y guarda texto/hash en la orden. La persona puede consultar después la versión aceptada en su inscripción.

El texto contractual vigente quedó versionado como `course-20260912-v2`; las órdenes nuevas guardan la firma electrónica escrita, la fecha del servidor, el texto aceptado y su huella. El servidor admite que las órdenes pendientes con `course-20260907-v1` terminen su pago. También exige que la liberación versionada esté activa y que `COURSE_SALES_EMERGENCY_DISABLED` no sea `true`.

## Verificación local

- Prebuild completo del repositorio: aprobado, incluyendo baseline, catálogos y pagos TOEFL.
- Compilación webpack final: aprobada, incluyendo 2520 páginas y los cambios de origen/condiciones. Se necesitó acceso de red para Google Fonts; el intento aislado falló por DNS.
- TypeScript global aprobado. ESLint de los archivos cambiados y `git diff --check` sin errores.
- Nueve pruebas de Wompi existente, cuatro del catálogo y cinco nuevas (entrada/origen y transacción de base de datos): aprobadas.
- Base local PGlite: roles/RLS, órdenes repetidas, idempotencia, montos/entornos incorrectos, duplicados, regresión de estados y protección de registros inmutables.
- Navegador: colores y cápsulas, paso de selección, casillas vacías, apertura del reglamento, vista de 390 px sin desbordamiento horizontal; sin errores de consola observados.
- API local: un POST del origen propio devuelve 503 antes de escribir o preparar un cobro cuando el reglamento no está listo. Una solicitud con origen no coincidente devuelve 403.

Pruebas puras: `node --experimental-strip-types --no-warnings --test tests/course-pricing.test.mts tests/course-payments.test.mts`.

Prueba de base: instalar `@electric-sql/pglite@0.3.14` en `.local-tools` sin scripts y ejecutar `node --test tests/course-payments-database.test.mjs`. Este directorio no se publica ni es dependencia de producción. La migración se generó con el CLI oficial Supabase 2.117.0, se probó primero en PGlite y luego se aplicó al proyecto Supabase canónico. La comprobación remota confirmó las cinco tablas, RLS habilitado, escritura para `service_role`, ausencia de lectura para `anon`, ejecución de la función transaccional y tablas inicialmente vacías.

## Pendiente para venta real

1. Validar una cuenta de prueba, checkout, retorno, webhook, consulta y fallos de red. La migración ya está aplicada; no se ha probado una transacción real del proveedor desde esta rama.
2. Wompi ya funciona y está configurado en Vercel. Se comprobó, sin leer valores, que sus cuatro variables existen en Production y Preview. Esta implementación reutiliza esas variables y el verificador central.
3. Supabase ya tiene clave de servidor en Production y Preview. Resend quedó vinculado mediante una clave con permiso exclusivo de envío, cargada como secreto en ambos entornos de Vercel. El dominio `idiomaswl.com` está verificado en Resend y Cloudflare con DKIM y SPF. Falta probar la entrega integral, el rebote y que una repetición del webhook no duplique correos. `COURSE_FROM_EMAIL`, `COURSE_OWNER_NOTIFICATION_EMAIL` y `COURSE_ORDER_ACCESS_SECRET` ya están configuradas.
4. Completar operación: los trabajos de coordinación/revisión están registrados, pero aún no existe una bandeja para que los profesores los gestionen. Implementar reconciliación programada e inventario de transacciones que quedaron sin webhook; hoy existen procesamiento durante el webhook/retorno y reintento HTTP 503.
5. Habilitar atención con radicado y un procedimiento de devolución probado. No existe todavía una devolución automática de estos pedidos.
6. Verificar el procedimiento fiscal/facturación, la retención de datos y la autorización específica para menores. La casilla actual no sustituye una verificación de representación.
7. Integrar la rama mediante revisión a `main` y liberar ventas solo después de las comprobaciones y la autorización expresa del propietario. Completado el 8 de septiembre de 2026.

El lanzamiento de cobros está habilitado. La coordinación de horarios y cualquier devolución excepcional siguen requiriendo gestión manual y trazable por los prestadores.
