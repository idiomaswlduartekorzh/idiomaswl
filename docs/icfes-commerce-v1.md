# Contrato comercial ICFES v2

La fachada pura `icfes-commerce-2026-09-12-v2` publica tres ofertas en COP:

| Oferta | Precio | Vigencia | Derecho principal |
| --- | ---: | --- | --- |
| `icfes-detail-attempt-v1` | $12.900 | Pago único | Respuestas y detalle de un intento |
| `exam-auto` | $49.900 | 30 días | Simulacros, detalle y retroalimentación automática |
| `exam-teacher` | $99.900 | 30 días | Lo anterior más 1 crédito por periodo de **feedback pedagógico personalizado de WeLearn con asistencia de IA**; objetivo operativo condicional de 12 horas |

Los dos planes mensuales se leen y cotizan desde `src/lib/xpress-commerce/catalog.ts`; la fachada valida sus precios, duración y contrato al cargarse. No mantiene un segundo catálogo mensual. `exam-teacher` es un identificador técnico legado: no autoriza a presentar el beneficio como feedback escrito por un docente.

Los planes de COP 49.900 y COP 99.900 son suscripciones con renovación automática cada 30 días, consentimiento recurrente versionado y cancelación desde el panel. La opción de COP 12.900 es un pago único y no se renueva.

En el producto de COP 99.900, la asistencia de IA debe mostrarse de forma explícita. La solicitud entra a la bandeja operativa, notifica a WeLearn y solo puede entregarse después de una aprobación humana registrada. Esa aprobación es un control de calidad y no convierte a la persona aprobadora en autora docente del feedback. Las 12 horas son un objetivo sujeto a capacidad reservada, no una garantía.

## Upgrade y separación del pase de un intento

- De `exam-auto` a `exam-teacher`: $50.000, conservando exactamente el fin del periodo activo.
- El pase de $12.900 está ligado a un intento y no genera crédito para una membresía.
- El SKU genérico `exam-single` no se ofrece para ICFES; el único producto ICFES de $12.900 se compra desde el resultado correspondiente.
- Un downgrade se agenda y no abre acceso superpuesto.

La fachada solo describe ofertas y produce cotizaciones deterministas en centavos COP. No cobra, no renueva, no concede derechos y no modifica el resultado gratuito ni la captura opcional de lead.
