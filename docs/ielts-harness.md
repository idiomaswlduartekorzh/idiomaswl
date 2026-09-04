# Harness de consolidación de mocks IELTS

El harness convierte el inventario de los 20 sets en un proceso de release reproducible. Separa las comprobaciones automáticas de la aprobación académica: un archivo existente, una coincidencia léxica o una clave que coincide consigo misma nunca hacen que un set quede listo.

## Estados

| Estado | Significado |
|---|---|
| `BLOCKED_ASSET` | Falta un MP3 o una imagen requerida. |
| `BLOCKED_ALIGNMENT` | Hay evidencia de que el MP3 corresponde a otro examen. |
| `BLOCKED_CONTENT` | Fallan estructura, extensión, límites de palabras o integridad del contenido. |
| `NEEDS_FULL_EVIDENCE` | El material automático pasa, pero faltan evidencias Q1–Q40, Writing, clave o UX. |
| `READY_FOR_HUMAN_REVIEW` | Todo está cubierto y ligado a las huellas actuales; falta la decisión final. |
| `RELEASE_READY` | Una persona independiente aprobó la huella consolidada actual. |

Todo cambio en contenido, clave, audio o visual produce una huella nueva. Las aprobaciones que apuntan a la huella anterior dejan de ser válidas sin que nadie tenga que recordar invalidarlas manualmente.

## Flujo por set

1. Ejecutar el inventario y conservar JSON y Markdown:

   ```bash
   npm run audit:ielts-harness -- --media=true --output-json=/ruta/estado.json --output-md=/ruta/estado.md
   ```

2. Crear la plantilla ligada al estado actual:

   ```bash
   npm run scaffold:ielts-evidence -- --set=1 --output-json=/ruta/set-1-evidence.json
   ```

3. Completar Listening Q1–Q40 con timecodes, frase audible, resultado ASR y revisión humana. Completar Reading Q1–Q40 con pasaje, párrafo, extracto y justificación. Revisar ambas tareas de Writing, fijar una clave independiente y ejecutar QA móvil/escritorio.

   Cuando exista una salida Whisper JSON con segmentos y tiempos, convertirla en evidencia automática con:

   ```bash
   npm run audit:ielts-asr -- --set=1 --asr-json=/ruta/whisper.json --output=/ruta/set-1-asr-report.json --engine=whisper-small
   ```

   Este control calcula WER, busca respuestas de completación en orden y propone timecodes. Siempre deja `releaseAuthorized: false`. El gate vuelve a calcular el hash del reporte y exige que sus hashes de audio/guion, WER y cobertura coincidan con el registro; copiar un `PASS` al registro no basta.

   Para Reading, generar candidatos de párrafo y extracto antes de la adjudicación:

   ```bash
   npm run scaffold:ielts-reading-evidence -- --set=1 --output=/ruta/set-1-reading-candidates.json
   ```

   El ranking combina coincidencias literales y términos del enunciado. Sirve para reducir búsqueda manual; todas las filas quedan `PENDING_HUMAN_REVIEW`.
4. Incorporar la evidencia revisada al registro `config/ielts-harness/evidence-registry.json` sin copiar respuestas desde el mock para aprobarlas.
5. Ejecutar el gate estricto:

   ```bash
   npm run check:ielts-release -- --set=1 --media=true
   ```

El modo `inventory` termina correctamente aunque existan bloqueos y genera la cola de reparación. El modo `release` devuelve error mientras el set no sea `RELEASE_READY`; por eso no forma parte del `prebuild` general durante la reconstrucción gradual.

`check:ielts-harness` sí forma parte del guardián IELTS previo al build. Ejecuta las pruebas del estado, ASR y ranking de Reading, además de un inventario sin medios pesados. Protege la infraestructura sin fingir que los sets bloqueados ya están listos.

## Criterio mínimo de evidencia

- Listening: un solo registro por Q1–Q40, timecodes, frase audible y decisión humana; además, alineación automática ASR ligada al hash del MP3 y del guion.
- Reading: un solo registro por Q1–Q40 con ubicación y razonamiento ligados al hash del pasaje y de la clave.
- Writing: Task 1 compara visual, título, unidades, fechas, leyenda y legibilidad con la consigna; Task 2 revisa integridad y modalidad de respuesta.
- Clave: fixture externo al código operativo, hash fijo y revisor humano identificado.
- Producto: al menos dos viewports, flujo de respuestas, persistencia, resultado y reporte ligados a la versión actual.
- Release: aprobación final humana sobre la huella que agrupa código, textos, audio e imágenes.

Las observaciones históricas del registro describen el riesgo conocido. No son aprobaciones y no pueden promover por sí solas ningún set.

## Referencia independiente de Set 1

Las cuatro partes de Listening de Set 1 se identificaron como Cambridge IELTS 10 Academic, Test 1. El fixture `set-1-listening-cambridge10-test1-reference.json` conserva únicamente la identidad, las referencias consultadas y los 40 resultados esperados; no copia el transcript. Su hash está fijado en `check-ielts-set1-listening-reference.mjs`. El check convierte índices MCQ a letras, normaliza variantes de formato como `2020`/`2,020` y exige la misma cobertura Q1–Q40. Esto confirma la clave; la correspondencia completa del archivo de audio sigue necesitando ASR y timecodes.

Los tres pasajes de Reading de Set 1 se identificaron como Cambridge IELTS 5 Academic, Test 2. La referencia separada confirmó Q1–Q40 y detectó que Q30–Q31 admiten `technical vocabulary` y `grammatical resources` en cualquier orden. El scorer v3 aplica emparejamiento uno a uno: acepta el orden inverso y evita que repetir una sola respuesta gane dos puntos. Las versiones v1 y v2 siguen disponibles para revisión histórica, pero una pestaña antigua no puede enviar bajo v3.
