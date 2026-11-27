# Harness de consolidación de mocks IELTS

La producción y conservación de audio se controlan por separado en [Producción fiable de audio IELTS](./ielts-audio-production.md). Ese pipeline debe completar sus gates antes de que la evidencia Listening pueda contar para release.

El harness convierte el inventario de los 20 sets en un proceso de release reproducible. Separa las comprobaciones automáticas de la aprobación académica: un archivo existente, una coincidencia léxica o una clave que coincide consigo misma nunca hacen que un set quede listo.

## Recorrido con cuenta de alumno del 26 de noviembre de 2026

Una cuenta gratuita con correo confirmado completó el Set 2 y el Set 4 en escritorio y en móvil emulado. El control comprobó las 85 respuestas de cada entrega, la recuperación del borrador y del cronómetro al recargar, y la reproducción y el guardado de las tres grabaciones. Con las respuestas de prueba, el Set 2 dio 46/80 y el Set 4 dio 34/80. Cada puntaje se cotejó con el recibo, las filas de la base y las dos pantallas que ve el alumno al entregar y al volver a «Mis intentos». Writing y Speaking quedan pendientes de evaluación. [Capturas del alumno](./previews/ielts-academico/recorrido-alumno/README.md) · [Evidencia por set y tamaño de pantalla](../config/ielts-harness/ux-runtime-sets-2-4-2026-11-26.json).

El inventario reconoce 17 expedientes con aprobación humana registrada y tres con la evidencia técnica completa para revisión humana, los sets 1, 2 y 4. Los 20 audios públicos coinciden con sus recibos. La pregunta 8 de Listening del Set 1 se detalla a continuación.

La primera pregunta de Reading del Set 4 conserva en inglés el grupo que nombra el segundo párrafo, *subsistence farmers*. La explicación muestra por qué *more hours* contradice *fewer hours*. Se verificó la decisión de forma independiente. La versión 7 del Set 4 distingue los intentos nuevos de quienes recibieron el enunciado anterior. [Revisión específica de Reading 1](../config/ielts-harness/academic-reviews/set-4-reading-1-2026-11-26.json).

## Revisión del Set 1 para el titular

El Set 1 alcanza el estado técnico `READY_FOR_HUMAN_REVIEW`. La pregunta 8 de Listening aún requiere una decisión editorial. El alumno ve una casilla bajo «Includes» y oye tanto *accommodation* como *flight*. Las dos palabras responden a la tabla, pero la clave admite solo *flight*. Conviene corregir la casilla antes de firmar el expediente. [Simulacro, audio y pauta de revisión del Set 1](./ielts-set-1-revision-del-titular.md).

## Revisión del 25 de noviembre de 2026

El inventario de los 20 simulacros guiados reconoce 17 expedientes con aprobación humana final. Los tres expedientes abiertos tienen estas condiciones de cierre.

| Set | Estado del harness | Evidencia pendiente |
| --- | --- | --- |
| 1 | `READY_FOR_HUMAN_REVIEW` | Una persona independiente debe revisar la versión actual y firmar el recibo de publicación. Listening tiene evidencia Q1–Q40 y las tres partes de Speaking cuentan con una revisión académica vinculada a las consignas. |
| 2 y 4 | `NEEDS_FULL_EVIDENCE` | Falta recorrer el examen con una cuenta de alumno habilitada para comprobar el cronómetro, la restauración del borrador y el flujo de entrega. La entrada y la pantalla de acceso se comprobaron en escritorio y móvil. Después corresponde la revisión humana final. |

Los 20 MP3 se verificaron contra sus recibos de publicación. El control general reconocía la denominación inicial de la evidencia audible y omitía la ampliación que documenta revisión académica independiente en los sets 1 y 4. Para estos dos expedientes ahora ejecuta el mismo cotejo específico del audio, el guion, los tiempos, el paquete académico y sus preguntas. La revisión académica de agente queda atribuida a su autor. En concreto, ese es el origen registrado de las preguntas 11 y 12 del Set 1 y de las preguntas 28 a 30 del Set 4. [Verificación de audio](../scripts/lib/ielts-listening-audible-evidence.mjs) · [Revisión de Speaking del Set 1](../config/ielts-harness/academic-reviews/set-1-speaking-review.json) · [Recorrido de los sets 2 y 4](../config/ielts-harness/ux-runtime-sets-2-4-2026-11-25.json).

Al regenerar el registro, se conservan las revisiones válidas junto a su autor y su fecha. Si falta un paquete de escucha revisado, queda identificado el set que necesita recuperar su evidencia. Los demás expedientes se pueden seguir comprobando. La regeneración utiliza el recibo humano que corresponde a la huella actual.

Las 40 prácticas de la biblioteca Academic y los 20 expedientes evaluados por este harness tienen alcances distintos. Para las explicaciones públicas, la prueba en navegador recorre las cuatro habilidades y los controles de contenido comprueban también la tutoría de 800 decisiones de Reading y 800 de Listening. [Blueprint pedagógico](./ielts-explanations-blueprint.md) · [Comparación visual](./previews/ielts-academico/README.md).

En septiembre de 2026 se documentó una versión previa de los 20 sets. Los estados anteriores describen aquel corte y las huellas que se revisaron entonces.

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

3. Completar Listening Q1–Q40 con tiempos, frase audible, resultado ASR y el expediente de la revisión independiente identificado en el registro. Completar Reading Q1–Q40 con pasaje, párrafo, extracto y justificación. Revisar ambas tareas de Writing, fijar una clave independiente y ejecutar QA móvil/escritorio.

   Cuando exista una salida Whisper JSON con segmentos y tiempos, convertirla en evidencia automática con:

   ```bash
   npm run audit:ielts-asr -- --set=1 --asr-json=/ruta/whisper.json --output=/ruta/set-1-asr-report.json --engine=whisper-small
   ```

   Este control calcula WER, busca respuestas de completación en orden y propone timecodes. Siempre deja `releaseAuthorized: false`. El gate vuelve a calcular el hash del reporte y exige que sus hashes de audio/guion, WER y cobertura coincidan con el registro; copiar un `PASS` al registro no basta.

   Para Reading, generar candidatos de párrafo y extracto antes de la adjudicación:

   ```bash
   npm run scaffold:ielts-reading-evidence -- --set=1 --output=/ruta/set-1-reading-candidates.json
   ```

   El ranking combina coincidencias literales, flexiones frecuentes y un conjunto controlado de paráfrasis del enunciado. Sirve para reducir búsqueda manual; todas las filas quedan `PENDING_HUMAN_REVIEW`.
4. Incorporar la evidencia revisada al registro `config/ielts-harness/evidence-registry.json` sin copiar respuestas desde el mock para aprobarlas.
5. Ejecutar el gate estricto:

   ```bash
   npm run check:ielts-release -- --set=1 --media=true
   ```

El modo `inventory` termina correctamente aunque existan bloqueos y genera la cola de reparación. El modo `release` devuelve error mientras el set no sea `RELEASE_READY`; por eso no forma parte del `prebuild` general durante la reconstrucción gradual.

`check:ielts-harness` sí forma parte del guardián IELTS previo al build. Ejecuta las pruebas del estado, ASR y ranking de Reading, además de un inventario sin medios pesados. Protege la infraestructura sin fingir que los sets bloqueados ya están listos.

## Criterio mínimo de evidencia

- Listening exige una fila por pregunta, tiempos, frase audible y origen de la revisión. La verificación técnica y el cotejo automático de voz se vinculan a las huellas del MP3 y del guion. La firma de publicación humana se comprueba en su propio expediente.
- Reading: un solo registro por Q1–Q40 con ubicación y razonamiento ligados al hash del pasaje y de la clave.
- Writing: Task 1 compara visual, título, unidades, fechas, leyenda y legibilidad con la consigna; Task 2 revisa integridad y modalidad de respuesta.
- Clave: fixture externo al código operativo, hash fijo y revisor humano identificado.
- Producto: al menos dos viewports, flujo de respuestas, persistencia, resultado y reporte ligados a la versión actual.
- Sesgos: la presentación equilibra las posiciones correctas por set y cantidad de opciones, conserva el significado de la clave y bloquea pistas sistemáticas por longitud.
- Reporte: el lead se guarda antes de exponer el resultado; Listening y Reading aparecen de inmediato, Writing y Speaking quedan pendientes de revisión humana, y Overall solo se calcula cuando existen las cuatro bandas.
- Release: aprobación final humana sobre la huella que agrupa código, textos, audio e imágenes.

Las observaciones históricas del registro describen el riesgo conocido. No son aprobaciones y no pueden promover por sí solas ningún set.

## Cierre académico y de producto del lote 1–20

El barrido editorial corrigió límites de respuesta, vacíos de evidencia, extensión de
Reading y distractores que podían delatar la solución por longitud. Cada corrección
actualizó la versión de contenido y volvió a ligar la revisión académica a los hashes
vigentes. La presentación final distribuye de forma determinista las respuestas
correctas sin alterar textos, opciones ni claves.

La auditoría estricta registra 20 sets en `PASS`, con 20 claves independientes
aprobadas y cero hallazgos P0, P1 o P2. Listening cubre 800 puntos con evidencia
ligada a audio, guion, ASR y timecodes; Writing cubre 20 visuales ligados por hash;
Speaking cubre Parts 1–3 en todos los sets. El recibo de aprobación final está en
`config/ielts-harness/final-release-approval.json`.

Los audios sustituidos se conservan fuera del árbol de producción para reutilización
futura. No se vuelven a publicar ni se eliminan durante la expansión.

## Referencia independiente de Set 1

Las cuatro partes de Listening de Set 1 se identificaron como Cambridge IELTS 10 Academic, Test 1. El fixture `set-1-listening-cambridge10-test1-reference.json` conserva únicamente la identidad, las referencias consultadas y los 40 resultados esperados; no copia el transcript. Su hash está fijado en `check-ielts-set1-listening-reference.mjs`. El check convierte índices MCQ a letras, normaliza variantes de formato como `2020`/`2,020` y exige la misma cobertura Q1–Q40. Esto confirma la clave; la correspondencia completa del archivo de audio sigue necesitando ASR y timecodes.

Los tres pasajes de Reading de Set 1 se identificaron como Cambridge IELTS 5 Academic, Test 2. La referencia separada confirmó Q1–Q40 y detectó que Q30–Q31 admiten `technical vocabulary` y `grammatical resources` en cualquier orden. El scorer introducido en v3 aplica emparejamiento uno a uno: acepta el orden inverso y evita que repetir una sola respuesta gane dos puntos. La v4 corrige la paráfrasis del guion Listening Q40 para conservar la palabra audible `expansion`. Las versiones v1–v3 siguen disponibles para revisión histórica, pero una pestaña antigua no puede enviar bajo v4.
