# Operación del feedback pedagógico asistido ICFES v3

Este contrato local gobierna únicamente `exam-teacher` con `examSlug=icfes`: COP 99.900 por periodo de 30 días y **un crédito** de feedback pedagógico personalizado de WeLearn con asistencia de IA por periodo. `exam-teacher` es un identificador técnico legado y no una declaración de autoría docente. La rúbrica vigente es `icfes-teacher-rubric-2026-09-09-v1`; el objetivo operativo interno y condicional es 12 horas desde una solicitud completa y con capacidad reservada.

## Reserva y cola

1. Antes de preparar checkout, el servidor intenta una reserva de capacidad idempotente por usuario, ambiente y clave de compra.
2. Sin persona aprobadora activa y calibrada, capacidad finita o métricas saludables, la reserva se bloquea y el objetivo de 12 horas no se representa como disponible ni como garantía.
3. Un pago aprobado consume la reserva. Una membresía admite una sola fila de revisión, por lo que el crédito no puede convertirse en “ilimitado”.
4. Las revisiones pasan por `queued`, `in_review`, `needs_qa`, `completed`, `failed` o `cancelled`. Un worker necesita un lease vigente y coincidente; otro worker puede recuperar un lease vencido.
5. La cola durable genera una notificación a WeLearn, alertas idempotentes al dueño a las 6, 9 y 11 horas, y una notificación al estudiante cuando el feedback aprobado queda entregado.

## Acceso operativo minimizado

La revisión usa exclusivamente la cola `xpress_teacher_reviews`; no existe una segunda cola ICFES. Para ICFES, la fila enlaza `icfes_attempt_id`, porque `icfes_attempts.answers` es la fuente real de respuestas y `saveExamResult` no llena `exam_submissions.objective_answers`. `submission_id` queda disponible para otros exámenes, pero una restricción XOR impide mezclar ambas fuentes.

La solicitud exige que la membresía y el intento ICFES pertenezcan al mismo usuario autenticado, que el intento contenga respuestas y un snapshot versionado/hash de la pregunta, y que la reserva de capacidad haya sido consumida por esa membresía. `xpress_teacher_review_payloads` elimina identidad y contacto, conserva `exam_id`, resultado básico, respuestas y el snapshot inmutable que fijó estímulos, opciones, claves y racionales al calificar, y genera un `review_subject_ref` SHA-256 del UUID del intento. El acceso soportado es `get_xpress_teacher_review_payload(review, reviewer, lease)`, que exige asignación, lease vivo y revisor calibrado. La vista y la función no tienen grants para roles de navegador.

El claim local usa exclusivamente la cuenta obtenida por `auth.getUser()` y la capability firmada conservada en cookie HttpOnly. La RPC compara el hash de esa capability, bloquea la fila y aplica compare-and-set: un intento sin dueño se asocia una vez, el mismo dueño puede repetir y otra cuenta no puede tomarlo. La persistencia usa `INSERT` idempotente y rechaza un replay si cambian respuestas, resultado o snapshot. El helper compuesto reclama antes de encolar, así que el cliente no decide ownership.

Todo esto sigue detrás de `ICFES_PERSISTENCE_ENABLED=false`/gates existentes y las migraciones son locales, no aplicadas. La página privada muestra el control únicamente cuando el servidor confirma capability, intento propio, membresía de feedback, reserva consumida, privacidad aprobada y al menos una persona aprobadora calibrada. El navegador solo envía `attemptId` e idempotencia; identidad y `membershipId` se derivan en servidor.

El protocolo interno usa una credencial HMAC que contiene la identidad del revisor; no acepta `reviewerId` en el body. El claim entrega únicamente el payload pseudónimo y un lease generado en servidor. El heartbeat renueva el lease solo para el mismo revisor y lease aún vivo. Finalizar exige `reviewer + lease + completionKey`; `completed` además exige resultado versionado y hash, mientras `failed` queda reclamable de nuevo y `needs_qa` pasa a una etapa QA explícita. Un replay idéntico es idempotente y cualquier drift se rechaza.

El código incluye worker recuperable, cron, bandeja administrativa, handoff pseudónimo a Codex y aprobación de control de calidad por una persona autorizada, pero todavía no están desplegados ni conectados a una corrida Sandbox end-to-end. La evidencia mínima de entrega conserva el ingreso a bandeja, la notificación a WeLearn, el digest del resultado asistido, la identidad/credencial de quien aprobó, su timestamp y la versión aceptada. La salida pública siempre declara la asistencia de IA; la aprobación interna no atribuye autoría docente. Esta capa permanece bloqueada y no equivale a una conexión productiva.

Se detienen nuevas ventas del plan personalizado si falta una persona aprobadora calibrada, la capacidad no es finita, la utilización proyectada supera 80%, la solicitud más antigua llega a 9 horas, el p95 móvil supera 10 horas, la solicitud no notifica a WeLearn, la entrega puede saltarse la aprobación humana o existe una brecha abierta. Los tiers automáticos pueden continuar si sus propios gates están saludables.

## Contrato comercial alineado

El addendum ICFES vigente limita el producto a un crédito de feedback personalizado durante cada periodo de 30 días, declara expresamente la asistencia de IA y presenta las 12 horas como objetivo interno sujeto a capacidad, no como garantía. El addendum sustituye la sección **Correcciones** en el checkout ICFES para que la aceptación quede registrada de forma explícita.

La UI de checkout debe presentar literalmente “feedback pedagógico personalizado de WeLearn con asistencia de IA”, capturar la aceptación independiente del addendum y abstenerse de atribuir el contenido a un docente. El parser y el servidor exigen exactamente esa versión. El gate `teacher-ops` continúa `BLOCKED`: no se debe vender ni prometer el servicio hasta configurar un roster humano calibrado, aplicar las migraciones, desplegar y operar el worker y aportar una corrida Sandbox que pruebe bandeja, notificación a WeLearn, aprobación humana previa y métricas observadas.
