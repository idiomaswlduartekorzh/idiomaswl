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

`icfes_data_subject_requests` registra únicamente usuario, tipo `EXPORT`/`DELETE`, versión contractual, estado, vencimiento y referencia de evidencia. El estado inicial es `BLOCKED_POLICY` sin fecha prometida. No se declara el flujo listo hasta implementar y probar:

1. autenticación y comprobación de ownership en una ruta de servidor;
2. exportación legible de los intentos del solicitante, sin datos de terceros;
3. borrado coordinado de intento, órdenes, entitlement, entrega y revisión cuando corresponda;
4. retención mínima de una evidencia no identificable de ejecución;
5. job de purga por `retention_expires_at`, observabilidad, reintentos y alerta.

## Privilegios

Todas las tablas nuevas están en RLS sin políticas para roles de navegador. `anon` y `authenticated` no reciben grants sobre el payload docente. `service_role` recibe operaciones por tabla y updates por columna: no puede aprobar contratos ni alterar respuestas, vencimientos o assurance. La ruta docente debe usar la función lease-bound, no consultar `icfes_attempts` ni la vista directamente; la clave privilegiada nunca debe llegar al cliente.

## Comprobación local

```bash
npm run test:icfes-privacy
# Con Supabase local levantado y migraciones aplicadas:
supabase test db supabase/tests/icfes_privacy_contract.sql
```

El test estático prueba el contrato del archivo. El test SQL comprueba catálogos, grants, RLS, columnas de la vista y que la versión draft rechaza una inserción. Ninguno sustituye aplicar la migración en Sandbox, ejecutar advisors y verificar exportación/borrado de extremo a extremo.

## Stop conditions

La compuerta de privacidad permanece `BLOCKED` mientras ocurra cualquiera de estas condiciones:

- falta una aprobación humana vinculada a versión y evidencia;
- algún plazo, propósito, base o regla de menores está vacío;
- falta el flujo real de exportación/borrado o el job de purga;
- el payload docente contiene identidad/contacto o no filtra por asignación;
- no hay prueba de migración, RLS y denegaciones en Sandbox.
