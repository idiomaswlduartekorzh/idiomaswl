# Centro operativo de administración

Estado: **DESPLEGADO**.

Última verificación de producción: **22 de septiembre de 2026**.

- Commit funcional en `main`: `596d9e7f` (`fix: load delegated review history safely`).
- Deployment de producción: `dpl_BKuLohJwNHKvCPbXVwiKbAkJJzkb`.
- URL del deployment: `https://idiomaswl-5r9wea4x0-idiomaswlduartekorzhs-projects.vercel.app`.
- Dominios activos: `https://www.idiomaswl.com`, `https://idiomaswl.com` y `https://idiomaswl.vercel.app`.

## Fuente de verdad

- Ruta: `/dashboard/admin`.
- Acceso: sesión confirmada y correo presente en `ALL_ADMIN_EMAILS`.
- José y Zhanna reciben la misma interfaz, las mismas acciones y los mismos datos.
- La identidad visible (nombre e iniciales) puede variar; las capacidades no.

## Datos mostrados

- **Exámenes:** `exam_submissions` con `submission_status = 'submitted'`.
- **Leads:** capturas reales de `leads` para simulacros, complementadas en la vista con entregas históricas identificadas que anteceden la captura unificada.
- **Estudiantes:** perfiles con `role = 'user'`, junto con progreso, actividad y simulacros relacionados.
- **Revisiones:** colas independientes de IELTS, TOEFL y Goethe para que el tráfico general no oculte entregas pendientes.

No se permiten grupos, clases, tareas ni nombres de alumnos escritos como demostración dentro del panel. El panel anterior de Zhanna fue retirado precisamente porque contenía esa información ficticia.

## Señales para tomar decisiones

El resumen inicial prioriza:

1. correcciones académicas todavía abiertas;
2. leads nuevos con WhatsApp capturados durante los últimos siete días;
3. estudiantes sin actividad reciente o que aún no empiezan;
4. conteos exactos de simulacros totales, semana actual y semana anterior;
5. personas identificadas que han presentado exámenes y estudiantes registrados.

Los conteos generales se consultan directamente en Supabase. Las listas operativas se mantienen acotadas para no enviar datos innecesarios al navegador.

## Verificación obligatoria

```bash
npm run test:admin-access
npm run test:exam-leads
npm run check:admin-exam-copy
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Antes de marcar este documento como desplegado deben registrarse el SHA de `main`, el deployment de Vercel en estado `READY` y el smoke de `/dashboard/admin` sin sesión (`307` hacia `/login`).

## Evidencia del despliegue

- Vercel construyó la rama `main` y dejó el deployment en estado `READY`.
- Sin sesión, `/dashboard/admin` responde `307` y redirige a `/login`.
- Con la sesión real de Zhanna, el panel muestra el saludo personalizado y la misma interfaz operativa que José.
- La página no contiene los nombres de demostración retirados.
- El smoke no registró errores de hidratación ni respuestas `500` del panel o de sus rutas administrativas.
- IELTS y TOEFL no solicitan audio automáticamente. La carga manual de audio IELTS respondió `200` desde una ruta privada, autorizada y sin caché.
- El historial de llamados delegados usa una ruta GET privada y sin caché; ya no dispara una Server Action durante el montaje.
- Esta entrega no requirió una migración nueva de Supabase: usa las tablas, buckets y políticas ya desplegados.

## Agenda de clases y registro financiero

La rama de trabajo agrega `/dashboard/admin/agenda` y amplía `/dashboard/admin/pagos`.
La migración `20261124161345_admin_agenda_and_recorded_payments.sql` se aplicó
en Supabase de producción el 24 de noviembre de 2026. Se verificó el acceso
del servicio y el bloqueo de consultas de usuarios sin privilegios. La agenda
usa la zona America/Bogota y muestra una semana de lunes a domingo. Admite clases
sueltas y hasta 16 repeticiones semanales. Cada clase se puede mover, completar o
cancelar. PostgreSQL impide que se crucen dos clases activas de un mismo tutor,
incluso si dos administradores guardan al mismo tiempo.

La agenda del panel es la fuente de las clases. Si hay configuración de Google,
al guardar se actualizan las clases de un calendario secundario del equipo. En
Google aparecen el horario, el estado y un título genérico. Los nombres, los
emails de estudiantes y los pagos se guardan en el panel. Las cancelaciones
liberan el horario en Google. Si Google no confirma el cambio, la clase queda
guardada en el panel y se puede volver a enviar con «Sincronizar semana».
Para crear una cuenta de estudiante se usa la invitación del módulo Estudiantes.

### Conectar Google Calendar

1. En Google Calendar, crear un calendario secundario privado «Clases WeLearn»
   desde la cuenta que debe conservar su propiedad.
2. En un proyecto de Google Cloud de WeLearn, habilitar Calendar API. Dar a una
   cuenta de servicio acceso de edición únicamente a «Clases WeLearn».
3. Guardar el identificador del calendario en `WELEARN_GOOGLE_CALENDAR_ID` y el
   JSON de la cuenta de servicio en `WELEARN_GOOGLE_CALENDAR_SERVICE_ACCOUNT`.
   Configurarlos del lado del servidor. Usar un calendario independiente en pruebas.
4. Desde una sesión admin, guardar y cancelar una clase de prueba. Comprobar la
   copia en Google y repetir «Sincronizar semana» para verificar que el evento
   se conserva sin duplicarse.

Con las credenciales ausentes, «Borrador en Google Calendar» permite abrir un
evento para guardarlo manualmente. Las ediciones realizadas en Google no se
importan al panel. Escribir ambas credenciales tampoco confirma por sí solo el
acceso, que se verifica al sincronizar una clase.

El 24 de noviembre de 2026 quedó creada la agenda privada «Clases WeLearn» y su
cuenta de servicio recibió permiso para editar los eventos de ese calendario.
La API de Google está activa y las dos variables quedaron cifradas para
Production en el proyecto `idiomaswl` de Vercel. Con el código de la rama se
creó, consultó, resincronizó y canceló un evento privado de prueba en Google.
La repetición no generó duplicados y el evento de prueba se retiró. Falta publicar
la agenda y comprobar el flujo completo desde una sesión de administración.

### Correo institucional

`info@idiomaswl.com` es el contacto publicado en el sitio. El 24 de noviembre
de 2026 se activó en Cloudflare Email Routing una regla exacta que reenvía esa
dirección a `welearninstitute@gmail.com`. Un mensaje de prueba enviado desde
otra cuenta apareció en la bandeja de entrada de WeLearn. Se confirmó que el
propietario tiene Google Workspace Business Standard activo con una licencia
asignada. Eligió conservar su Gmail como acceso principal y configurar el
correo institucional por separado.

Falta configurar y verificar un proveedor de envío para las respuestas desde
`info@idiomaswl.com`. Google anunció que la opción «Enviar como» para direcciones
externas en Gmail se retirará en enero de 2027. El DNS mantiene los registros
de autenticación que usa Resend para los correos transaccionales del sitio.

Pagos conserva los movimientos verificados de Wompi e incluye los informes
TOEFL cuando su tabla de órdenes está provisionada. En producción esa tabla
todavía no existe y la migración de Agenda y Pagos funciona sin ella.
Las cuentas de propietario de José pueden registrar pagos directos,
anularlos con motivo y cargar el historial. Los demás administradores tienen
acceso a los movimientos en línea. Anular un registro directo conserva su valor,
la identidad responsable y el motivo en la base. Agenda y Pagos se abren con una
navegación completa y una política de scripts propios. La descarga Excel y CSV aplica
los filtros de la tabla. Los valores quedan en COP.

«Pagos por mes y año» usa el mismo registro privado de propietario y el ambiente
seleccionado. Agrupa los pagos aprobados por el periodo original de Numbers, la
fecha de un pago directo o la fecha de aprobación en la zona America/Bogota.
Permite comparar totales anuales, consultar los meses de un año y descargar a
Excel los agregados de todos los años del origen seleccionado.

### Importación privada

El script `scripts/prepare-numbers-payment-history.py` lee el archivo original
localmente con `numbers-parser`. Ejecutarlo con la ruta a `General.numbers` y
un directorio nuevo con permisos 700 fuera del repositorio. Genera dos archivos
con permisos 600. `historial-importable.json` se carga desde Pagos con una
cuenta de propietario. El panel valida el archivo y muestra un resumen antes
de importarlo. Al repetir la carga, la referencia de hoja, mes y celda previene
duplicados.

`filas-por-revisar.json` señala las filas con fechas o valores dudosos, posibles
duplicados y bloques que requieren identificación. Faltan el extracto y los
comprobantes para resolver esas filas. El original conserva los comparativos,
notas y fórmulas que ayudan a revisarlas. La programación semanal histórica
sirvió como referencia para la pantalla de agenda.

Para comprobar este módulo en desarrollo, instalar PGlite 0.6.0 en
`.local-tools` como en las otras pruebas de pagos y ejecutar
`npm run test:admin-operations` y `npm run test:admin-google-calendar`. Para verificar el despliegue usar una cuenta
de propietario y una de administración sin permiso sobre el historial, además
de la verificación general de esta página.

### Revisión de pagos de Numbers

La bandeja `/dashboard/admin/pagos/revision-numbers` está restringida a cuentas
de propietario. Muestra la referencia de la celda, el valor original, el motivo
y el estado. La migración `20261124181510_admin_numbers_payment_review.sql` ya se
aplicó en Supabase. La conciliación de Numbers alimenta la bandeja privada.
Cada comprobante confirmado agrega un pago con la referencia
de la celda y la fecha real del recibo. Si hay posible duplicado, se solicita una
referencia de comprobante distinta. El índice único protege la referencia de la
fila y evita reutilizar un comprobante activo entre revisiones.
