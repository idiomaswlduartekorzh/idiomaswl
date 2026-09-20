# Expediente final de integración ICFES — 2026-09-12

## Alcance

Integración semántica sobre `origin/main` para el contrato ICFES de COP 12.900 / 49.900 / 99.900, embudo post-examen, DTOs mínimos, feedback automático determinista, consentimiento auditable, Xpress recurrente existente y arnés colegiado basado en hashes.

No se importaron las operaciones manuales del prototipo comercial, no se creó `mock-24`, no se modificaron los 23 bancos de preguntas, no se aplicaron migraciones remotas y no hubo deploy ni cobros.

## Fuentes

- Base canónica: `origin/main` en `1e151ba2`.
- Harness de referencia: commit `16c6469e`, usado solo para extraer requisitos y reportes; su modelo comercial anterior no se copió.
- Prototipo: commit `3965e710`, consultado semánticamente; no se copiaron eliminaciones ni regresiones frente a Xpress recurrente.
- Expediente colegiado del task fuente: informes `english-specialist`, `icfes-format-specialist` y `editorial-adjudicator` bajo `artifacts/icfes-launch-harness/board-20260912`, junto con las dos fuentes oficiales vendorizadas y verificadas por SHA-256.

## Estado editorial honesto

El estado derivado es `BLOCKED_EDITORIAL`. Los dos informes independientes cubren los 23 mocks y 1.035 ítems; la adjudicación final cubre 65/65 decisiones, confirma 48 correcciones, descarta 17 falsos positivos y deja cero casos pendientes de evidencia externa. Quedan 40 entradas bloqueantes que representan 39 defectos deduplicados. Esos informes son evidencia, no autorización de publicación.

El arnés ahora liga por separado:

- hash de cada módulo crudo;
- hash del mock efectivo después de `normalizeIcfesMock`;
- hash del bundle crudo y del bundle efectivo;
- digest del work order;
- digest del conjunto exacto de artefactos candidato.

## Compuertas operativas

Persistencia, versión de privacidad, checkout y Sandbox se verifican en servidor. El feedback personalizado solo existe para `icfes-intensive-v1`, se deriva determinísticamente de los resultados guardados y expone su propio `feedbackId` e `inputDigest`. El contenido gratuito se reduce a puntaje bruto, porcentaje y aviso no oficial.

La guía de activación y rollback está en `docs/icfes-product-activation.md`.
