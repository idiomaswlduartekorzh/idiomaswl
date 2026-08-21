# Chatbot de WhatsApp de WeLearn

## Alcance de esta primera version

El endpoint `GET|POST /api/whatsapp/webhook` integra la aplicacion con la API oficial
de WhatsApp Cloud de Meta. El bot:

- identifica idioma, objetivo y nivel del contacto;
- conserva el estado de la conversacion en Supabase;
- responde preguntas frecuentes de precios, horarios, metodo y examenes;
- marca la conversacion como `handoff_requested` cuando el contacto escribe `ASESOR`;
- evita respuestas duplicadas usando el `message.id` de Meta;
- valida `X-Hub-Signature-256` antes de procesar cualquier webhook.

No envia campanas, plantillas ni mensajes iniciados por la academia. Todas las
respuestas de esta version nacen de un mensaje entrante del contacto.

## Variables de entorno del servidor

Configurar estas variables en Vercel. Ninguna debe llevar el prefijo
`NEXT_PUBLIC_`:

| Variable | Uso |
|---|---|
| `WHATSAPP_VERIFY_TOKEN` | Secreto elegido por WeLearn para verificar el webhook. Debe ser largo y aleatorio. |
| `WHATSAPP_APP_SECRET` | App Secret de la aplicacion en Meta; valida la firma de cada POST. |
| `WHATSAPP_ACCESS_TOKEN` | Token permanente de sistema con permiso para enviar mensajes. |
| `WHATSAPP_PHONE_NUMBER_ID` | ID numerico del numero registrado en WhatsApp Cloud API. |
| `WHATSAPP_API_VERSION` | Version activa de Graph API en formato `vNN.N`; usar la que indique Meta al configurar la app. |

El servidor tambien necesita las variables ya usadas por el proyecto:
`NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.

## Activacion

1. Aplicar `supabase/migrations/20260821190000_whatsapp_chatbot.sql` en el proyecto
   de Supabase correspondiente. La migracion crea `whatsapp_conversations` y
   `whatsapp_messages`; ambas quedan cerradas para `anon` y `authenticated`.
2. Crear o abrir la aplicacion empresarial en Meta y agregar el producto WhatsApp.
3. Configurar como callback:
   `https://www.idiomaswl.com/api/whatsapp/webhook`.
4. Pegar en Meta el mismo valor definido como `WHATSAPP_VERIFY_TOKEN`.
5. Suscribir la cuenta de WhatsApp Business al campo `messages`.
6. Configurar las cinco variables de WhatsApp en Vercel y desplegar desde un commit
   de `main`, siguiendo `docs/OPERACION-REPOSITORIO.md`.
7. Enviar `Hola` desde un numero de prueba. El bot debe presentar el menu de idiomas.

La coleccion oficial de Meta muestra el contrato del endpoint de envio
`/{Phone-Number-ID}/messages` y los webhooks de WhatsApp:

- https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api
- https://www.postman.com/meta/whatsapp-business-platform/folder/lboq68h/webhooks

## Pruebas y observacion

Ejecutar la prueba de dominio y contratos:

```bash
npm run test:whatsapp
```

Consultas operativas utiles en Supabase:

```sql
select *
from public.whatsapp_conversations
where status = 'handoff_requested'
order by last_message_at desc;
```

```sql
select direction, message_type, body, created_at
from public.whatsapp_messages
where wa_id = '573001234567'
order by created_at;
```

Antes de abrirlo a trafico real, WeLearn debe definir quien monitorea las solicitudes
de asesor, el tiempo objetivo de respuesta y la politica de retencion de los cuerpos
de mensaje almacenados.

## Comportamiento ante fallos

- Firma ausente o incorrecta: `401`, sin leer el JSON.
- Token de verificacion incorrecto: `403`.
- Payload mayor de 1 MB: `413`.
- Mensaje repetido por Meta: se reconoce por ID y no se responde otra vez.
- Fallo al enviar a Meta: se libera el ID entrante para que un reintento pueda procesarlo.
- Respuesta aceptada por Meta pero fallo posterior de persistencia: no se libera el ID,
  porque volver a enviarla seria peor que conservar un estado desactualizado.
