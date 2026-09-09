# Contrato comercial ICFES v1

La fachada pura `icfes-commerce-2026-09-09-v1` publica tres ofertas en COP:

| Oferta | Precio | Vigencia | Derecho principal |
| --- | ---: | --- | --- |
| `icfes-detail-attempt-v1` | $12.000 | Pago único | Respuestas y detalle de un intento |
| `exam-auto` | $49.000 | 30 días | Simulacros, detalle y retroalimentación automática |
| `exam-teacher` | $99.000 | 30 días | Lo anterior más 1 crédito docente, con SLA objetivo de 24 horas |

Los dos planes mensuales se leen y cotizan desde `src/lib/xpress-commerce/catalog.ts`; la fachada valida sus precios, duración y contrato docente al cargarse. No mantiene un segundo catálogo mensual.

## Upgrade

- De detalle a `exam-auto`: $37.000 si se compra dentro de los 7 días posteriores al detalle.
- De detalle a `exam-teacher`: $87.000 dentro de la misma ventana de 7 días.
- De `exam-auto` a `exam-teacher`: $50.000, conservando exactamente el fin del periodo activo.
- Pasados 7 días, el detalle no genera crédito. Un downgrade se agenda y no abre acceso superpuesto.

La fachada solo describe ofertas y produce cotizaciones deterministas en centavos COP. No cobra, no renueva, no concede derechos y no modifica el resultado gratuito ni la captura opcional de lead.
