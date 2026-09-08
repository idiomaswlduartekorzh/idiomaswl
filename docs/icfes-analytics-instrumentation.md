# Instrumentación ICFES

## Objetivo

Medir el recorrido desde el hub orgánico hasta la práctica, el valor entregado y la conversión, sin enviar a GTM datos de contacto, texto de preguntas ni respuestas seleccionadas.

Todos los eventos incluyen `exam=icfes-saber-11`, `event_schema_version=1` y `page_path`. Los nombres y parámetros viven en `src/lib/analytics/icfes.ts`.

## Eventos conectados

| Evento | Momento real | Parámetros principales |
|---|---|---|
| `icfes_hub_view` | Se muestra `/examenes/icfes` | `resource_count`, `available_mode_count` |
| `icfes_learning_page_view` | Se muestra una ruta del clúster didáctico | `content_area` |
| `icfes_cta_click` | Se pulsa un CTA etiquetado del hub o clúster | `cta_id`, `destination`, `resource_id`, `resource_kind`, `mode`, `surface` |
| `icfes_practice_start` | Comienza una práctica por parte | `part`, `question_count`, `progress_scope` |
| `icfes_practice_complete` | Termina una práctica por parte | `part`, `question_count`, `correct_count`, `accuracy` |
| `icfes_question_answered` | Se confirma una pregunta guiada | `part`, `question_id`, `correct`, `elapsed_seconds`; nunca la opción elegida |
| `icfes_practice_restart` | Se reinicia una práctica | `part` |
| `icfes_guided_simulator_start` | Comienza un recorrido guiado | `part`, `question_count`, `progress_scope` |
| `icfes_guided_simulator_complete` | Termina un recorrido guiado | `part`, `question_count`, `correct_count`, `accuracy` |
| `icfes_mock_start` | Comienza el modo examen | `mock_id`, `question_count`, `mode` |
| `icfes_mock_complete` | Se entrega el modo examen | `mock_id`, `question_count`, `correct_count`, `accuracy`, `mode` |
| `icfes_lead_submit` | El lead del resultado quedó guardado | `mock_id`, `lead_context` |
| `icfes_report_view` | El reporte se muestra realmente | `report_type`, `mock_id` o `progress_scope` |
| `icfes_study_plan_generated` | Se crea un plan local | `weeks`, `minutes_per_day` |
| `icfes_error_review_complete` | Se marca un error como entendido | `question_id` |
| `icfes_whatsapp_click` | Se abre WhatsApp desde una ruta ICFES | `interaction`, `cta_location` |

Los enlaces de WhatsApp inline dependen del listener de atribución ya instalado (`NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED=true`). El botón flotante conserva el evento ICFES aun cuando ese listener esté desactivado.

## Contrato listo, todavía sin emisión

`icfes_paid_detail_intent`, `icfes_checkout_start` e `icfes_purchase_complete` están reservados en el contrato, pero no se emiten. No existe todavía un checkout ICFES ni un control de acceso de suscripción conectado al catálogo, por lo que simular esos eventos produciría conversiones falsas.

Cuando exista ese flujo:

1. Emitir `icfes_paid_detail_intent` al pulsar el CTA de detalle bloqueado, con `resource_id` y `offer_id`.
2. Emitir `icfes_checkout_start` solo después de crear una sesión de pago válida, con `offer_id` y `currency`; no enviar email ni teléfono.
3. Emitir `icfes_purchase_complete` únicamente desde la confirmación verificada del servidor, con `transaction_id`, `offer_id`, `currency` y `value`. Evitar emitirlo desde la página de retorno sin verificar el pago.

## Configuración de GTM y GA4

1. Crear un activador de evento personalizado por cada nombre anterior o un único activador con expresión `^icfes_`.
2. Crear variables de capa de datos para los parámetros usados en informes. Mantener `event_schema_version` para poder migrar el contrato.
3. Enviar cada evento a GA4 conservando el mismo nombre. Marcar `icfes_lead_submit` como evento clave; marcar `icfes_purchase_complete` solo cuando empiece a emitirse desde confirmación verificada.
4. Registrar como dimensiones personalizadas `resource_id`, `resource_kind`, `mode`, `surface`, `report_type` y `lead_context`. Las métricas numéricas son `question_count`, `correct_count`, `accuracy`, `resource_count`, `available_mode_count`, `weeks` y `minutes_per_day`.
5. Publicar una versión nueva del contenedor y validar en Preview/DebugView antes de usar los datos en decisiones.

## Embudo sugerido

1. Descubrimiento: `icfes_hub_view`.
2. Intención: `icfes_cta_click` filtrado por `mode` o `cta_id`.
3. Activación: `icfes_mock_start`, `icfes_practice_start` o `icfes_guided_simulator_start`.
4. Valor: el evento `*_complete` correspondiente.
5. Resultado: `icfes_report_view`.
6. Conversión: `icfes_lead_submit` o `icfes_whatsapp_click`.

No sumar `icfes_practice_complete`, `icfes_guided_simulator_complete` e `icfes_mock_complete` como si fueran el mismo tipo de sesión. Deben compararse contra su evento de inicio correspondiente.
