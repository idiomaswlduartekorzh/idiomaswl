# Contrato de privacidad ICFES

**Versión técnica:** `icfes-privacy-2026-09-draft`
**Estado:** `DRAFT_BLOCKED`
**Efecto actual:** la persistencia de intentos debe permanecer apagada. El SQL rechaza intentos mientras no exista una versión `APPROVED` con decisiones humanas completas.

Este documento describe controles técnicos; no constituye aprobación jurídica ni fija por sí solo un plazo de conservación.

## Datos mínimos y propósito

| Dato | Uso técnico | Exclusión explícita |
|---|---|---|
| `exam_id`, respuestas y resultado básico | calificación, detalle comprado y feedback | el resultado básico no puede contener claves, explicaciones ni preguntas |
| `user_id` nullable | recuperar compras/intentos de una cuenta | la vista docente no lo expone |
| hash de capability | acceso anónimo temporal al intento | no se guarda la capability en claro |
| `age_assurance` | aplicar la decisión para menores | no se pide fecha de nacimiento ni documento |
| versión del contrato y vencimiento | trazabilidad y borrado por retención | el vencimiento lo calcula la base, no el cliente |

La vista `xpress_teacher_review_payloads` se construye sobre la cola real `xpress_teacher_reviews` y, para ICFES, enlaza el `icfes_attempts` que pertenece al mismo usuario de la revisión. Esa es la fuente real de las respuestas; no depende de `exam_submissions.objective_answers`. Usa un SHA-256 del UUID aleatorio del intento como `review_subject_ref` y solo proyecta `exam_id`, resultado básico, respuestas, versión de rúbrica y tiempos. Excluye el `user_id` del estudiante, email, teléfono, nombre y el `rubric_snapshot` interno. La vista es `security_invoker`, no tiene grants para `anon` ni `authenticated`, y solo puede leerse desde el backend privilegiado. El acceso soportado es `get_xpress_teacher_review_payload`: exige review, revisor asignado, lease vigente y calibración vigente.

## Decisiones humanas obligatorias

Una versión no puede pasar a `APPROVED` sin completar todos estos campos:

- `attempt_retention_days`: plazo de conservación del intento;
- `export_response_days` y `deletion_response_days`: plazos operativos de solicitudes;
- `minor_handling`: `ADULT_ONLY`, `GUARDIAN_ATTESTATION` o `BLOCK_ALL_MINORS`;
- `processing_purpose` y `legal_basis`;
- `approved_by`, `approved_at` y `approval_evidence_ref`.

No se incluyen valores de ejemplo para evitar que un despliegue confunda una propuesta con una decisión jurídica. Una versión aprobada queda inmutable; solo puede retirarse. Cualquier cambio sustantivo exige una versión nueva y una migración revisada.

## Menores

`UNKNOWN` y `MINOR_UNATTESTED` bloquean la persistencia. `MINOR_GUARDIAN_ATTESTED` solo puede persistirse si la versión aprobada adopta `GUARDIAN_ATTESTATION` y existe timestamp de la atestación. El contrato guarda la categoría y el momento, no identidad ni documento del tutor.

Antes de activar flags aún faltan el copy y mecanismo de age assurance, consentimiento verificable cuando aplique y una decisión humana sobre si el producto admite menores. Hasta entonces, el bloqueo es deliberado.

## Exportación y borrado

La implementación local añade rutas `POST /api/icfes/privacy/export` y `DELETE /api/icfes/privacy/delete`. Ambas exigen `Origin` propio, un header `Idempotency-Key` UUID y un usuario comprobado en servidor mediante `auth.getUser()`; no aceptan `user_id` del cuerpo. El borrado exige además `X-Confirm-Data-Deletion: DELETE-ICFES-DATA`. El helper privilegiado envía a la base exclusivamente ese usuario autenticado.

Las RPC `export_icfes_user_data` y `delete_icfes_user_data` requieren exactamente un contrato `APPROVED` con el plazo correspondiente. Con el único contrato actual en `DRAFT_BLOCKED`, ambas fallan antes de crear solicitudes o leer/borrar intentos. Además, `ICFES_PRIVACY_OPERATIONS_ENABLED` debe permanecer distinto de `true` hasta aprobar el contrato y completar Sandbox.

La exportación limita cada colección por el usuario autenticado o por un intento que le pertenece. Incluye intentos, compras únicas, entitlements, membresías ICFES, solicitudes de privacidad y el estado pedagógico de sus revisiones; excluye hashes de acceso, eventos crudos de pago, identidad del docente y `rubric_snapshot`. La solicitud en curso se excluye de su propio snapshot para que la transición `PROCESSING → COMPLETED` no altere el hash. Un replay recalcula el snapshot y solo lo devuelve si coincide exactamente con el `evidenceRef` original; si los datos cambiaron, responde conflicto y exige una nueva clave idempotente.

El borrado cubre `icfes_attempts` y sus derivados de detalle/revisión. Primero elimina alertas y revisiones docentes; después elimina el intento, y las FK cascan compras únicas y entitlements. La evidencia de solicitudes queda pseudónima mediante SHA-256 y conserva solo conteos. Los ledgers financieros Xpress y su retención quedan deliberadamente fuera: borrarlos o anonimizarlos requiere una decisión jurídica separada y sigue siendo un blocker.

## Purga por retención

`purge_expired_icfes_attempts` procesa como máximo 500 intentos cuyo `retention_expires_at <= now()`, usa `FOR UPDATE SKIP LOCKED`, elimina alertas/revisiones antes del intento y registra conteos sin identidad. Cada ejecución tiene una clave idempotente y un replay devuelve el mismo resumen. La ruta interna `POST /api/internal/icfes/privacy/purge` requiere `CRON_SECRET` y una clave idempotente.

No se crea ningún `cron.schedule`: frecuencia, ventana operativa, alertas y activación requieren aprobación humana y evidencia Sandbox. Aunque la selección usa `SKIP LOCKED` y las dependencias se eliminan en una transacción, la concurrencia real entre dos workers de purga sigue bloqueada hasta probarse en Sandbox.

## Privilegios

Todas las tablas nuevas están en RLS sin políticas para roles de navegador. `anon` y `authenticated` no reciben grants sobre el payload docente. `service_role` recibe operaciones por tabla y updates por columna: no puede aprobar contratos ni alterar respuestas, vencimientos o assurance. La ruta docente debe usar la función lease-bound, no consultar `icfes_attempts` ni la vista directamente; la clave privilegiada nunca debe llegar al cliente.

## Comprobación local

```bash
npm run test:icfes-privacy
# Prueba enfocada de las operaciones nuevas:
node --experimental-strip-types --no-warnings --test tests/icfes-privacy-operations.test.mjs
# Con Supabase local levantado y migraciones aplicadas:
supabase test db supabase/tests/icfes_privacy_contract.sql
```

Los tests estáticos y puros comprueban ownership, límites de payload, idempotencia, orden de borrado, autorización interna y ausencia de agenda. El test SQL comprueba catálogos, grants, RLS y que el draft rechaza inserción, exportación, borrado y purga. Ninguno sustituye aplicar las migraciones en Sandbox, ejecutar advisors y verificar denegaciones y operaciones de extremo a extremo.

## Stop conditions

La compuerta de privacidad permanece `BLOCKED` mientras ocurra cualquiera de estas condiciones:

- falta una aprobación humana vinculada a versión y evidencia;
- algún plazo, propósito, base o regla de menores está vacío;
- falta aplicar y probar en Sandbox exportación, borrado y purga, además de su observabilidad;
- no existe una decisión jurídica sobre la retención o anonimización del ledger financiero Xpress;
- la agenda y frecuencia del job de purga no han sido aprobadas;
- el payload docente contiene identidad/contacto o no filtra por asignación;
- no hay prueba de migración, RLS y denegaciones en Sandbox.
