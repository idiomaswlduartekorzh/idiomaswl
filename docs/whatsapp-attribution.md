# Origen de contactos WhatsApp

Estado: LISTO_PARA_INTEGRAR. Rama `codex/whatsapp-attribution-admin`, base
`09d82c99` de `origin/main` tras rebase.
No desplegado. No cambia precios, pagos, horarios ni la IA nativa de WhatsApp.

## Resultado de la verificación — 4 de septiembre de 2026

- Pasan 6 pruebas de contrato, 1 prueba del handler HTTP real con transporte
  simulado, 1 prueba SQL integral con PostgreSQL embebido y las 9 pruebas existentes
  del chatbot. SQL valida RLS/permisos, cuotas, reintentos, llegada tardía, auditoría,
  atribución de conversación y agregados completos con paginación.
- TypeScript acotado al cambio y ESLint de los archivos nuevos: aprobados.
- Todos los guardianes de `prebuild`, incluido catálogo, baseline y SAT: aprobados.
- Navegador local: referencia añadida al enlace sin enviar WhatsApp real; POST de
  mismo origen 204 y de origen ajeno 403; panel renderizado en escritorio y móvil;
  confirmación manual, retirada y referencia inválida verificadas. Un usuario de
  prueba no administrador no puede ejecutar la confirmación ni recibe el informe.
- El adaptador local de Auth genera errores CSP en la barra de navegación porque
  su URL localhost no está en la lista productiva; no se debilitó la CSP del sitio.
- La prueba visual de caída de DB fue repetida y aprobada: el panel muestra una
  indisponibilidad explícita, oculta los agregados para no fingir ceros y recupera
  el resumen al volver la conexión. Se mantienen límites de 5 s para registrar
  clics y 8 s para consultas/confirmaciones/webhook.
- `npx tsc --noEmit --pretty false` global: aprobado. `npm run build`: aprobado
  sobre Next 16.2.6, con los guardianes completos y 2.515 páginas generadas.
- La migración aditiva se aplicó al proyecto Supabase canónico
  `ivqeokuxgxemhydvopdd`. La auditoría posterior confirmó RLS, funciones
  `SECURITY INVOKER`, `search_path` vacío, roles públicos sin acceso y
  `service_role` limitado a SELECT/INSERT; los asesores de seguridad y rendimiento
  mostraron 0 errores. Las tres tablas empezaron vacías.
- Vercel producción ya tiene `NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED=true`; el
  valor solo se incorpora al siguiente build de `main`. El merge, el despliegue
  y la prueba real de recepción de WhatsApp siguen pendientes.

## Uso del panel

Entrada: **Origen de contactos WhatsApp** en el panel de José, o
`/dashboard/admin/contactos`. Exige sesión y correo de la lista administrativa
validado en servidor; un perfil que se declare `admin` no obtiene acceso.

- Períodos: hoy, 7, 30 o 90 días, calendario de Colombia; búsqueda por referencia.
- Página de entrada: primer aterrizaje de la visita conservado en sessionStorage
  durante 30 minutos. Una campaña explícita nueva reinicia esa atribución.
- Página de contacto: ruta donde se activó el enlace de WhatsApp.
- Fuente/medio/campaña/contenido: UTM explícitas; en su ausencia, dominio referido.
  Se excluyen queries generales, fragmentos, emails en UTMs y parámetros publicitarios
  como gclid/fbclid. No se almacenan IPs sin procesar ni cuerpos de mensajes.
- `Directo / desconocido` no significa que sepamos que llegó directamente.
  “Buscador (inferido)” no demuestra tráfico orgánico: podría ser publicidad sin UTM.
- Clics y aperturas de menú contextual son intenciones, no mensajes enviados ni
  personas únicas. Las métricas de contacto usan la fecha de registro en servidor,
  que puede ser posterior al clic si hubo un reintento.
- Referencias confirmadas: intenciones registradas dentro del período con al menos
  un mensaje que incluye su código, o confirmación manual vigente. Las confirmaciones
  pueden ser posteriores al período del clic. No se suman manual + webhook dos veces.
- Mensajes API: IDs distintos entregados por un webhook firmado, según su fecha de
  ocurrencia. Su cohorte es independiente de la fecha del clic. No incluye la
  confirmación manual y no debe dividirse por clics como tasa de conversión.
- Los agregados se calculan sobre TODO el período en SQL. El detalle de intenciones
  pagina de 50 en 50; las fuentes y mensajes muestran sus 50 primeros resultados,
  indicándolo expresamente. Sin datos no se inventan series ni tendencias.

## Cómo se enlaza el mensaje

Los enlaces HTTPS al número `573005004253` (`wa.me`, `api.whatsapp.com/send` y
`web.whatsapp.com/send`) reciben una línea de origen y una referencia aleatoria
de 96 bits: `WL-` + 24 caracteres hexadecimales. Se conserva el mensaje previo.
La persona puede revisar/editar/eliminar ese texto antes de enviarlo.

La captura central cubre enlaces públicos presentes o añadidos dinámicamente,
clic normal, teclado, botón central y menú contextual. No intercepta enlaces
a otros números ni áreas privadas `/dashboard`, `/admin`, `/auth` o `/api`.
No llama preventDefault, no crea popups y no espera a la base para abrir WhatsApp.
El evento GTM `click_whatsapp` se conserva y el flotante evita duplicarlo.
No se modificaron contenedor GTM, etiquetas remotas, GA4 ni Meta Pixel.

La persistencia POST usa keepalive y una cola pequeña de reintentos en la pestaña
(máximo 20 registros, 24 horas). Una respuesta fallida se reintenta al navegar por
otra página pública, al volver la conexión o ante otro contacto. No es una cola
garantizada: cerrar la pestaña, bloquear JavaScript/almacenamiento o borrar datos
puede perder un clic. La línea de origen sigue siendo legible en WhatsApp.

Con el webhook actual conectado, la firma Meta se valida antes de cualquier
escritura. El ID de mensaje es único; persistimos atribución ANTES de deduplicar
la respuesta del bot. Fallos de DB producen error para reintento de Meta y no envían
la respuesta del bot. Esta rama no conecta el webhook ni activa el bot existente.
Los mensajes repetidos no duplican métricas. Si el mensaje llega antes que el POST
del navegador, el informe se enlaza cuando llega el registro del clic.

Un mensaje sin código puede heredar la última referencia anterior del mismo número:
se etiqueta **Conversación (inferido)**, no “origen comprobado de este mensaje”.
Dos referencias diferentes en un texto se consideran ambiguas. Los contactos
históricos o sin coincidencia permanecen desconocidos.

**La IA nativa de WhatsApp Business no implica recepción por Cloud API.** Mientras
no exista integración receptora verificada, José puede pegar la referencia visible
en su chat en “Confirmar un mensaje”. Esto solo registra su confirmación; no envía
WhatsApp ni asigna un teléfono. Retirarla genera otro evento de auditoría, no borra
el anterior. No hay importación retroactiva de conversaciones privadas.

## Activación (requiere autorización de producción)

1. Actualizar la rama desde `origin/main`, validar y revisar la migración
   `supabase/migrations/20260904163657_whatsapp_contact_attribution.sql` en staging.
2. Confirmar respaldo y retención con el responsable; aplicar exclusivamente esa
   migración aditiva en el proyecto canónico. **Aplicado el 4 de septiembre de
   2026** sin ejecutar migraciones históricas ni alterar pagos o conversaciones.
3. Configurar `NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED=true` antes del build.
   URL Supabase + clave service-role quedan únicamente en los servicios habituales
   del servidor. La clave service-role nunca se usa en cliente.
4. Previews/local deben usar una base de prueba, no credenciales de producción.
   No heredar el flag activo en previews conectadas al proyecto productivo.
5. Integrar mediante commit de `main`; publicar por el flujo canónico de Vercel.
6. Verificar con un contacto autorizado de prueba: clic → referencia → registro
   admin → confirmación manual, y firma/recepción real si Cloud API ya está conectada.
   No activar ni reemplazar el agente de la otra tarea para conseguir esta prueba.
7. Registrar SHA de main, deployment y humo antes de declarar DESPLEGADO.

No se han ejecutado estos pasos en producción. No hay reporte diario automático
programado en esta rama. La vista ofrece consulta de hoy; un envío diario se puede
configurar después de validar cobertura y destino del reporte.

## Seguridad, fallos y recuperación

Tres tablas nuevas privadas con RLS; `anon` y `authenticated` sin permisos. Solo
service_role tiene SELECT/INSERT y ejecución de dos funciones SECURITY INVOKER,
con search_path vacío. Las confirmaciones manuales autentican de nuevo en cada
Server Action. No se confía en roles de user_metadata.

POST público acepta solo mismo origen, JSON y hasta 4096 bytes incluso sin header
Content-Length. Valida rutas y campos, no acepta URLs de destino arbitrarias. Una
cuota transaccional de 30 referencias nuevas/minuto por HMAC diario del IP de la
plataforma funciona entre instancias; los reintentos existentes no consumen cuota.
La referencia del cliente y las UTM no son datos de confianza para pagos ni identidad.
El control limita ráfagas: no reemplaza un WAF contra botnets distribuidas.

No se guardan textos en estas tablas. `wa_id` sí es dato personal y solo lo ve
administración. Revisar política de privacidad y retención antes de activar.
No se inventó ni ejecutó una política destructiva de borrado automático.

Rollback seguro: desactivar el flag y desplegar de nuevo desde main; conservar las
tablas para no perder registros. Restaurar únicamente las tablas nuevas desde un
respaldo aprobado, nunca truncar por un fallo de despliegue ni tocar pagos.
Los errores de consulta aparecen como indisponibilidad, no como cero contactos.

## Validación reproducible

```sh
node --experimental-strip-types --no-warnings --test tests/whatsapp-attribution.test.mts
node --experimental-strip-types --no-warnings --test tests/whatsapp-attribution-api.test.mjs
npm run test:whatsapp
# Comprobación rápida del cambio; NO sustituye tsc/build globales:
npx tsc --noEmit --project tests/tsconfig.whatsapp-attribution.json
# PostgreSQL embebido de prueba, instalado fuera de las dependencias productivas:
PGLITE_MODULE=/ruta/pglite/dist/index.js node --test tests/whatsapp-attribution-db.test.mjs
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

`tests/fixtures/whatsapp-attribution-local.mjs` es un adaptador HTTP SOLO local con
PGlite y sesiones ficticias. Sirve en `127.0.0.1:54329`, no hace llamadas externas
ni se importa desde la aplicación. Para QA visual usar URL Supabase local, anon
`local-anon-only`, service key `local-attribution-service-only` y flag true; interceptar
las navegaciones a wa.me para no enviar mensajes. No usar esas credenciales en una
instalación real. Las capturas de este entorno son fixtures, no cifras del negocio.

Fuentes técnicas: [RLS de Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security),
[changelog de Supabase](https://supabase.com/changelog), documentación instalada de
Next 16.2.6 (`data-security`, `route-handlers`) y contrato existente del webhook firmado.
