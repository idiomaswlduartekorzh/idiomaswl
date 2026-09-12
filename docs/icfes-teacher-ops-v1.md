# Operación docente ICFES v1

Este contrato local gobierna únicamente `exam-teacher` con `examSlug=icfes`: COP 99.000, 30 días y **un crédito** de revisión docente. La rúbrica vigente es `icfes-teacher-rubric-2026-09-09-v1` y el objetivo operativo es 24 horas desde una solicitud completa.

## Reserva y cola

1. Antes de preparar checkout, el servidor intenta una reserva de capacidad idempotente por usuario, ambiente y clave de compra.
2. Sin revisor activo y calibrado, capacidad finita o métricas saludables, la reserva se bloquea y el objetivo de 24 horas no se representa como disponible.
3. Un pago aprobado consume la reserva. Una membresía admite una sola fila de revisión, por lo que el crédito no puede convertirse en “ilimitado”.
4. Las revisiones pasan por `queued`, `in_review`, `needs_qa`, `completed`, `failed` o `cancelled`. Un worker necesita un lease vigente y coincidente; otro worker puede recuperar un lease vencido.
5. La cola genera alertas idempotentes a las 12, 18 y 22 horas.

## Acceso docente minimizado

La revisión usa exclusivamente la cola `xpress_teacher_reviews`; no existe una segunda cola ICFES. Para ICFES, la fila enlaza `icfes_attempt_id`, porque `icfes_attempts.answers` es la fuente real de respuestas y `saveExamResult` no llena `exam_submissions.objective_answers`. `submission_id` queda disponible para otros exámenes, pero una restricción XOR impide mezclar ambas fuentes.

La solicitud exige que la membresía y el intento ICFES pertenezcan al mismo usuario autenticado, que el intento contenga respuestas y un snapshot versionado/hash de la pregunta, y que la reserva de capacidad haya sido consumida por esa membresía. `xpress_teacher_review_payloads` elimina identidad y contacto, conserva `exam_id`, resultado básico, respuestas y el snapshot inmutable que fijó estímulos, opciones, claves y racionales al calificar, y genera un `review_subject_ref` SHA-256 del UUID del intento. El acceso soportado es `get_xpress_teacher_review_payload(review, reviewer, lease)`, que exige asignación, lease vivo y revisor calibrado. La vista y la función no tienen grants para roles de navegador.

El claim local usa exclusivamente la cuenta obtenida por `auth.getUser()` y la capability firmada conservada en cookie HttpOnly. La RPC compara el hash de esa capability, bloquea la fila y aplica compare-and-set: un intento sin dueño se asocia una vez, el mismo dueño puede repetir y otra cuenta no puede tomarlo. La persistencia usa `INSERT` idempotente y rechaza un replay si cambian respuestas, resultado o snapshot. El helper compuesto reclama antes de encolar, así que el cliente no decide ownership.

Todo esto sigue detrás de `ICFES_PERSISTENCE_ENABLED=false`/gates existentes y las migraciones son locales, no aplicadas. La página privada muestra el control únicamente cuando el servidor confirma capability, intento propio, membresía docente, reserva consumida, privacidad aprobada y al menos un revisor calibrado. El navegador solo envía `attemptId` e idempotencia; identidad y `membershipId` se derivan en servidor.

El protocolo interno usa una credencial HMAC que contiene la identidad del revisor; no acepta `reviewerId` en el body. El claim entrega únicamente el payload pseudónimo y un lease generado en servidor. El heartbeat renueva el lease solo para el mismo revisor y lease aún vivo. Finalizar exige `reviewer + lease + completionKey`; `completed` además exige resultado versionado y hash, mientras `failed` queda reclamable de nuevo y `needs_qa` pasa a una etapa QA explícita. Un replay idéntico es idempotente y cualquier drift se rechaza.

No existe aún un worker desplegado, scheduler, roster humano real ni corrida Sandbox end-to-end. Por eso esta capa permanece bloqueada y no equivale a una conexión productiva.

Se detienen nuevas ventas humanas si falta un revisor calibrado, la capacidad no es finita, la utilización proyectada supera 80%, la revisión más antigua llega a 18 horas, el p95 móvil supera 20 horas o existe una brecha abierta. Los tiers sin intervención docente pueden continuar si sus propios gates están saludables.

## Divergencia contractual

`src/lib/xpress-commerce/terms.ts` dice actualmente que el plan docente añade revisión “a cada entrega”. Eso contradice el único crédito ICFES. El addendum `icfes-teacher-addendum-2026-09-09-v1` limita y sustituye la sección **Correcciones** solo para ICFES, sin cambiar las condiciones globales de Xpress.

La UI de checkout ya presenta y captura la aceptación independiente del addendum ICFES; el parser y el servidor exigen exactamente esa versión. El gate `teacher-ops` continúa `BLOCKED`: no se debe vender ni prometer el servicio hasta configurar un roster humano calibrado, aplicar las migraciones, desplegar y operar el worker y aportar una corrida Sandbox con métricas observadas.
