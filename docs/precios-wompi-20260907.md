# Candidato de precios, reglamento y Wompi

Worktree exclusivo `precios-wompi-20260907`, rama `codex/precios-wompi-20260907`, base `6fc6cd14ad06fbd43c22f4302aecc1174d8cf675`. Sin integración, push, migración remota ni despliegue.

## Alcance implementado

Cinco planes de cuatro semanas y ocho idiomas, paleta azul/rojo y cápsulas diagonales del logo. Vista local en puerto 3106. Catálogo anterior conservado por defecto; el nuevo se activa con `COURSE_PRICING_ENABLED=true` o preview local.

Inscripción guardada antes del checkout; precio calculado en servidor; orden inmutable; firma con caducidad; referencia reutilizable para reintentos; historial disponible cuando la compra queda vinculada a la cuenta. El checkout solo retorna a `https://www.idiomaswl.com` en producción, con validación del Origin y Host.

El flujo actualizado permite preparar el pago sin una cuenta previa. El navegador recibe una credencial temporal `HttpOnly`, derivada con un secreto del servidor, para consultar únicamente esa orden. Cuando Wompi confirma `APPROVED`, se crean trabajos durables e idempotentes para: crear o vincular la cuenta del estudiante, enviar la invitación/bienvenida, avisar al propietario por correo y dejar pendiente la coordinación. La cuenta empieza con el acceso básico `autodidacta`; la compra de clases no concede automáticamente un plan digital distinto. Las acciones externas usan arrendamientos cortos y reintentos; los correos de Resend llevan claves de idempotencia.

El webhook reconoce referencias `WC-` tras comprobar la firma y consulta Wompi para obtener importe/moneda/estado. El registro del evento, la proyección y el crédito se realizan en una transacción de PostgreSQL. Una aprobación duplicada no duplica sesiones. Dos transacciones aprobadas generan revisión financiera. Un estado tardío PENDING no revierte APPROVED/VOIDED. Los cambios previos del webhook para catálogo anterior y TOEFL permanecen.

El reglamento es un borrador visible antes del formulario. Sus reglas se presentan en tarjetas con los puntos cruciales destacados; una confirmación obligatoria desbloquea los datos del estudiante y las autorizaciones separadas. El servidor valida versiones y guarda texto/hash en la orden. La persona puede consultar después la versión aceptada en su inscripción.

El texto contractual quedó versionado como `course-20260907-v1`. El servidor sigue exigiendo además `COURSE_SALES_ENABLED=true`; en Vercel permanece en `false` mientras se completan la migración y la prueba integral.

## Verificación local

- Prebuild completo del repositorio: aprobado, incluyendo baseline, catálogos y pagos TOEFL.
- Compilación webpack final: aprobada, incluyendo 2520 páginas y los cambios de origen/condiciones. Se necesitó acceso de red para Google Fonts; el intento aislado falló por DNS.
- TypeScript global aprobado. ESLint de los archivos cambiados y `git diff --check` sin errores.
- Nueve pruebas de Wompi existente, cuatro del catálogo y cinco nuevas (entrada/origen y transacción de base de datos): aprobadas.
- Base local PGlite: roles/RLS, órdenes repetidas, idempotencia, montos/entornos incorrectos, duplicados, regresión de estados y protección de registros inmutables.
- Navegador: colores y cápsulas, paso de selección, casillas vacías, apertura del reglamento, vista de 390 px sin desbordamiento horizontal; sin errores de consola observados.
- API local: un POST del origen propio devuelve 503 antes de escribir o preparar un cobro cuando el reglamento no está listo. Una solicitud con origen no coincidente devuelve 403.

Pruebas puras: `node --experimental-strip-types --no-warnings --test tests/course-pricing.test.mts tests/course-payments.test.mts`.

Prueba de base: instalar `@electric-sql/pglite@0.3.14` en `.local-tools` sin scripts y ejecutar `node --test tests/course-payments-database.test.mjs`. Este directorio no se publica ni es dependencia de producción. La migración se generó con el CLI oficial Supabase 2.117.0 y se aplicó únicamente a PGlite.

## Pendiente para venta real

1. Cerrar los puntos restantes del documento `reglamento-revision-20260907.md`: domicilio contractual, responsable de datos, coordinación de horario, privacidad y menores.
2. Wompi ya funciona y está configurado en Vercel. Se comprobó, sin leer valores, que sus cuatro variables existen en Production y Preview. Esta implementación reutiliza esas variables y el verificador central. Falta aplicar la migración en una base de pruebas y validar cuenta real de prueba, checkout, retorno, webhook, consulta y fallos de red. No se ha probado una transacción real del proveedor desde esta rama.
3. Supabase ya tiene clave de servidor en Production y Preview. Configurar o comprobar su SMTP para la activación de cuenta, verificar el dominio de envío en Resend y cargar `RESEND_API_KEY`, `COURSE_FROM_EMAIL` y un `COURSE_ORDER_ACCESS_SECRET` aleatorio. `RESEND_API_KEY` no aparece actualmente en Vercel. El correo del propietario ya tiene el valor predeterminado entregado por David y puede reemplazarse con `COURSE_OWNER_NOTIFICATION_EMAIL`. Probar entrega, rebote y que una repetición del webhook no duplique correos.
4. Completar operación: los trabajos de coordinación/revisión están registrados, pero aún no existe una bandeja para que los profesores los gestionen. Implementar reconciliación programada e inventario de transacciones que quedaron sin webhook; hoy existen procesamiento durante el webhook/retorno y reintento HTTP 503.
5. Habilitar atención con radicado y un procedimiento de devolución probado. No existe todavía una devolución automática de estos pedidos.
6. Verificar datos fiscales/facturación, responsable de tratamiento, retención de datos y la autorización específica para menores. La casilla actual no sustituye una verificación de representación.
7. Integrar el candidato con el main vigente, aplicar migración autorizada y configurar flags/credenciales solo después de las comprobaciones. Vercel conectado no devolvió proyectos en esta sesión; no se concluye que el proyecto no exista.

No considerar esta etapa un lanzamiento terminado: el cobro está deliberadamente cerrado por los datos pendientes, y la operación posterior al pago todavía necesita implementación y prueba.
