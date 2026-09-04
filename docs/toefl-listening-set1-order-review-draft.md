# Set 1 — propuesta de orden de opciones (BORRADOR)

Estado: pendiente de aprobación de producto y académica. No aplicado en el preview. Fecha: 4 de septiembre de 2026.

## Decisión que se solicita

Aprobar únicamente tres cambios de posición para intentos nuevos del Set 1. Se conservan íntegros textos, audios, orden de preguntas, IDs y claves semánticas. Las firmas previas aprobaron explícitamente el orden anterior: no se trasladan automáticamente a este borrador. David Duarte revisa producto/ingeniería y Zhanna Korzh el alcance académico.

| Pregunta | Correcta antes | Correcta propuesta | Texto correcto, sin cambios |
| --- | --- | --- | --- |
| 4 | A | D | Of course—I'll email you the details. |
| 6 | C | D | It's across from the main library. |
| 8 | A | B | Not at all. I'll keep an eye on it. |

| Ámbito | A antes → propuesta | B | C | D |
| --- | --- | --- | --- | --- |
| Primeras 8 | 4 → 2 | 1 → 2 | 3 → 2 | 0 → 2 |
| Set completo (34) | 10 → 8 | 7 → 8 | 10 → 9 | 7 → 9 |

Secuencia propuesta de las primeras ocho: A, C, C, D, A, D, B, B. No se adopta una regla general de cuotas por bloque ni una rotación A-B-C-D. Esta distribución es una decisión editorial acotada, no evidencia de aleatoriedad ni certificación psicométrica. Las primeras cinco conservan cero B: no se pretende equilibrar artificialmente cada ventana pequeña.

## Las opciones que verá el alumno

### Pregunta 4 — item:t1-l-cr4-fixed-v1

A. The speaker asked us to arrive early.
B. The workshop covered a different topic.
C. I sent my application in last Tuesday.
D. Of course—I'll email you the details.

Clave semántica conservada: `item:t1-l-cr4-fixed-v1:option-a`. Letra visible propuesta: **D**.

### Pregunta 6 — item:t1-l-m1-cr6-v1

A. The tutoring session lasts an hour.
B. I went there to study yesterday.
C. Your tutor called this morning.
D. It's across from the main library.

Clave semántica conservada: `item:t1-l-m1-cr6-v1:option-c`. Letra visible propuesta: **D**.

### Pregunta 8 — item:t1-l-m1-cr8-v1

A. This bag has a pocket for my watch.
B. Not at all. I'll keep an eye on it.
C. I bought my bag at the station.
D. The café closes in a few minutes.

Clave semántica conservada: `item:t1-l-m1-cr8-v1:option-a`. Letra visible propuesta: **B**.

## Contrato técnico necesario antes de aplicar

1. Tratar el ID de opción como identidad estable, no como la letra visible. Por ejemplo, la opción canónica `option-a` de la pregunta 4 se mostraría en D, conservando su texto y su clave de servidor.
2. No reordenar arrays y regenerar IDs con los helpers actuales: eso reasignaría textos a IDs existentes y podría corregir mal respuestas guardadas.
3. Persistir una versión del orden al iniciar cada intento. Los intentos existentes sin esa versión conservan el orden anterior; los nuevos usan el propuesto. No vaciar localStorage, no reiniciar sesiones ni cambiar letras a mitad de un intento.
4. Usar el mismo contrato de presentación en la práctica seccional y el simulacro completo; verificar resultados/feedback y restauración con IDs, no índices o sufijos de letras.
5. Tras aprobar, reconciliar de nuevo con origin/main, implementar en un cambio acotado y repetir pruebas de scoring, restauración, rutas, catálogo y TypeScript; build completa obligatoria antes de integrar. No marcar un gate de experiencia o release aprobado por estas pruebas.

## Evidencia y límites

Candidato SHA-256: `25cb54f3f6610376520904f4eb7ed549430bfb27f7fb276135f6e2a788219f42`. Base de trabajo: `d7e8eab74198465e20babaf963a3bb6d63eaf278`.

La simulación local comprobó las 136 opciones del Set 1 con el corrector real: cambiar la posición conserva exactamente la puntuación de cada ID. Verificó los 136 pares ID/texto, enunciados y referencias de audio sin mutaciones; rechazó órdenes incompletos, duplicados y con IDs de otra pregunta. No valida todavía la integración de presentación, la persistencia versionada ni un recorrido de navegador.

Longitud: el número de correctas más largas y las probabilidades con desempate aleatorio no cambian. Sigue visible el riesgo residual de escoger la más corta por caracteres (14/34). El resultado del desempate por primera posición sí puede variar al cambiar el orden, y ambos valores constan en la evidencia. No se solucionan aquí los otros 19 sets.

Reproducir: `node --experimental-strip-types --no-warnings --experimental-loader ./tests/ts-paths-loader.mjs docs/toefl-listening-set1-order-check-draft.mjs`.

Evidencia: `toefl-listening-set1-order-evidence-draft.json`. Candidato: `toefl-listening-set1-order-candidate.json`. Son documentos internos de curaduría que incluyen claves; no se importan ni publican en la aplicación.

HR-06 sigue pendiente; C09 bloqueado, D9 sin rebajas. Origin/main tiene pendiente el commit `96e817fc` (IELTS/CSS global); este ciclo solo prepara borradores y no lo integra. No se modificaron runtime, paquete de opciones aprobado, registro de firmas, remotos ni producción. Sin instalaciones ni binarios nuevos. La rama de trabajo remota fue verificada contra la base al inicio.
