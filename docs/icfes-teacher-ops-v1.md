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

La solicitud exige que la membresía y el intento ICFES pertenezcan al mismo usuario autenticado, que el intento contenga respuestas y que la reserva de capacidad haya sido consumida por esa membresía. `xpress_teacher_review_payloads` elimina identidad y contacto, conserva `exam_id`, resultado básico y respuestas, y genera un `review_subject_ref` SHA-256 del UUID del intento. El acceso soportado es `get_xpress_teacher_review_payload(review, reviewer, lease)`, que exige asignación, lease vivo y revisor calibrado. La vista y la función no tienen grants para roles de navegador.

El helper servidor ya prepara la solicitud y lectura del payload, pero no existe una ruta/worker ni un flujo visible que reclame un intento anónimo para la cuenta compradora. Tampoco se conserva todavía un snapshot versionado de las preguntas que acompañaron al intento. Esta capa permanece bloqueada y no equivale a una conexión productiva o probada en Sandbox.

Se detienen nuevas ventas humanas si falta un revisor calibrado, la capacidad no es finita, la utilización proyectada supera 80%, la revisión más antigua llega a 18 horas, el p95 móvil supera 20 horas o existe una brecha abierta. Los tiers sin intervención docente pueden continuar si sus propios gates están saludables.

## Divergencia contractual

`src/lib/xpress-commerce/terms.ts` dice actualmente que el plan docente añade revisión “a cada entrega”. Eso contradice el único crédito ICFES. El addendum `icfes-teacher-addendum-2026-09-09-v1` limita y sustituye la sección **Correcciones** solo para ICFES, sin cambiar las condiciones globales de Xpress.

El addendum todavía no tiene captura de aceptación independiente en el checkout. Por tanto, aunque el arnés y la reserva sean verificables localmente, el gate `teacher-ops` continúa `BLOCKED`: no se debe vender ni prometer el servicio hasta registrar aceptación del addendum, configurar un roster humano calibrado y aportar métricas observadas.
