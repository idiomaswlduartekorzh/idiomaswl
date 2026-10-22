# IELTS guiado: Sets 1–20

## Alcance

La capa guiada reutiliza los veinte mocks IELTS Academic que ya están registrados en
`src/data/mocks/`. No crea claves nuevas ni modifica las respuestas publicadas.

Cada set debe ofrecer:

- Listening: 4 partes, divididas en 2 bloques de práctica por parte, con 40 preguntas y
  corrección posterior ligada al intervalo de audio aprobado para cada respuesta.
- Academic Reading: 3 pasajes, divididos en 2 bloques por pasaje, con 40 preguntas y la
  evidencia textual revisada para cada respuesta.
- Writing: dos referencias pedagógicas para Task 2, una aproximada a banda 5.5 y otra a
  banda 9, acompañadas por una lectura de los cuatro criterios públicos. Las referencias
  creadas para esta ampliación corresponden a los Sets 2–20; Set 1 conserva material
  heredado y no se presenta como original.
- Speaking: dos referencias pedagógicas para Part 2, una aproximada a banda 5.5 y otra a
  banda 9, con los guiones preparados para Chatterbox. La misma distinción de procedencia
  entre Set 1 y los Sets 2–20 aplica a estos materiales.

Las bandas de las referencias son perfiles pedagógicos, no calificaciones oficiales ni
predicciones de la banda de un estudiante. La pronunciación solo puede evaluarse sobre la
voz real del candidato.

## Especificación congelada

`spec_version`: `ielts-public-2026-10-20`

La comprobación del 20 de octubre de 2026 confirmó la estructura pública utilizada por la
capa guiada:

- Listening: 4 partes, 10 preguntas por parte, 40 en total y una sola reproducción.
- Academic Reading: 3 pasajes, 40 preguntas y 60 minutos.
- Academic Writing: 2 tareas; mínimos de 150 y 250 palabras; Task 2 pesa el doble.
- Speaking: 3 partes y 11–14 minutos; fluidez/coherencia, recurso léxico, rango y precisión
  gramatical, y pronunciación tienen el mismo peso.

Fuentes públicas:

- <https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening>
- <https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading>
- <https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing>
- <https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking>

## Fuentes internas y fail-closed

- Preguntas y claves: `src/data/mocks/ielts-set-{1..20}.ts` y el registro de mocks.
- Evidencia académica: `config/ielts-harness/evidence/set-{1..20}.json`.
- Tiempos audibles: `config/ielts-harness/listening-evidence/`.
- Visuales de Writing: `config/ielts-harness/writing-task1-visual-review.json`.
- Revisión de Speaking: `config/ielts-harness/speaking-semantic-review.json`.

La construcción debe fallar si un set no entrega 40 preguntas de Listening, 40 de Reading,
sus bindings de evidencia o las dos referencias de Writing y Speaking. Una evidencia
contextual nunca debe presentarse como coincidencia literal.

## Producción de Speaking

La síntesis está deliberadamente separada de la aprobación de los guiones. No se debe
generar audio hasta tener una muestra inglesa limpia y autorización para usar esa voz.
Cada set se activa únicamente cuando sus dos WAV (5.5 y 9.0) pasan las comprobaciones de
duración, señal, hash y correspondencia con el guion. Nunca se publica una pareja incompleta.

La orden de producción y la revisión manual están documentadas en
`docs/ielts-guided-speaking-audio.md`.

## Estado editorial

Los veinte mocks base conservan sus revisiones y huellas existentes. Las explicaciones y
referencias nuevas de la capa guiada requieren revisión independiente y solo pueden avanzar
hasta `READY_FOR_HUMAN_REVIEW`. Ningún agente puede otorgar la aprobación humana final.

Set 1 mantiene referencias heredadas que el registro interno vincula con materiales de
Cambridge. No debe describirse como contenido original ni reutilizarse fuera del alcance ya
autorizado sin resolver primero su procedencia y derechos.
