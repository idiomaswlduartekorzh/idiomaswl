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

   El ranking combina coincidencias literales, flexiones frecuentes y un conjunto controlado de paráfrasis del enunciado. Sirve para reducir búsqueda manual; todas las filas quedan `PENDING_HUMAN_REVIEW`.
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

El barrido de límites del 5 de septiembre corrigió respuestas que excedían la instrucción visible y dos huecos sin una respuesta literal defendible. Los sets 2, 5, 6, 7, 9, 10, 11, 12, 16 y 20 avanzaron a una nueva versión de contenido; las versiones anteriores siguen revisables como historial, pero no pueden recibir intentos nuevos. El inventario queda sin alertas `ANSWER_WORD_LIMIT_REVIEW` ni `lexicalFlags`. Esto no resuelve la extensión insuficiente de Reading, la falta/desalineación de audio ni la revisión académica.

Set 2 avanzó después a v3: Reading se amplió dentro de los párrafos existentes. Historia del vidrio distingue vidrio de fayenza, usa la cronología del Corning Museum, matiza las leyendas sobre Murano y fecha el proceso de vidrio flotado de Pilkington. Polinización reemplaza la afirmación engañosa de un tercio de los alimentos por las medidas delimitadas de FAO, distingue polinizadores silvestres y gestionados y matiza amenazas combinadas. Toma de decisiones presenta elección racional como referencia, corrige el experimento de la rueda manipulada y cambia Q35 de `YES` a `NO`; Q38 evalúa participación en pensiones. El MP3 ajeno sigue siendo un bloqueo crítico y debe reemplazarse y alinearse de Q1 a Q40.

Set 5 avanzó después a v3: Reading tiene 2.164 palabras distribuidas en 700/756/708 y el enunciado Q14 ya no denomina gubernamental a la asociación internacional descrita. Las ampliaciones permanecen dentro de los párrafos existentes para no alterar la estructura A–G ni crear nuevos destinos de preguntas. Los candidatos automáticos cubren las 40 preguntas sin coincidencias débiles, pero siguen pendientes adjudicación humana y alineación completa del audio.

Set 6 avanzó después a v3: sus tres pasajes se ampliaron dentro de la estructura existente y se precisaron los enunciados de emparejamiento Q15–Q19. Q15 describe el efecto indirecto sobre las condiciones del río, Q16 conserva la medición de caudal del texto, Q17–Q18 expresan las ideas culturales y de conservación que deben localizarse y Q19 identifica correctamente un objetivo de superficie. La revisión humana y la alineación completa del audio siguen pendientes.

Set 7 avanzó después a v3: Reading supera el mínimo sin añadir destinos nuevos para preguntas. Q1 ahora evalúa la afirmación respaldada sobre la publicación de 1997, Q16 identifica la estructura social `moai`, Q33 usa `NO` porque el pasaje niega una causalidad definitiva y Q38 completa gramaticalmente `lexical distinction`. La evidencia automática localiza las 40 respuestas, pero la adjudicación humana y la alineación completa del audio siguen pendientes.

Set 8 avanzó después a v2: sus tres pasajes se ampliaron dentro de los párrafos existentes. Q16 ya no presenta una región como si fuera un país, y Q26 y Q37 producen las completaciones literales y gramaticales `low-light` y `prospect theory`. La revisión humana y la alineación completa del audio siguen pendientes.

Set 9 avanzó después a v3: Reading se amplió sin cambiar la estructura de destino. Se eliminaron variantes no respaldadas por la frase correspondiente en Q8, Q10 y Q21; Q37 ahora completa literalmente `creative problem-solving`, y Q36 evalúa de forma directa la incertidumbre expresada en el pasaje. La revisión humana y la alineación completa del audio siguen pendientes.

Set 10 avanzó después a v3: Reading se amplió dentro de los párrafos existentes. Q18 ahora pide localizar la pérdida de ingresos tras una desactivación sin explicación, que es la evidencia disponible, en vez de atribuir sin base una decisión automatizada. La revisión humana y la alineación completa del audio siguen pendientes.

Set 11 avanzó después a v3: Reading se amplió dentro de los párrafos existentes sin cambiar la clave objetiva ni los destinos A–G. La evidencia automática conserva candidatos localizables para las 40 preguntas. La revisión humana y la alineación completa del audio siguen pendientes.

Set 12 avanzó después a v3: Reading se amplió dentro de los párrafos existentes. La cronología de ajedrez ahora denomina formal al campeonato de 1886 y comienza la serie de campeones apoyados por el sistema soviético con Botvinnik; Q17 identifica directamente el renacimiento moderno. La distinción regulatoria entre la ley australiana y el proyecto noruego se comprobó contra fuentes gubernamentales vigentes y quedó registrada. La revisión humana y la alineación completa del audio siguen pendientes.

Set 13 avanzó después a v2: Reading se amplió dentro de los párrafos existentes. Las fechas de migración y las categorías de desplazamiento forzado se corrigieron con datos de IOM y UNHCR; la atribución empresarial ahora distingue a inmigrantes de sus hijos. El pasaje cuántico precisa la corrección de errores, limita el significado de los benchmarks especializados y elimina una cifra de inversión no sustentada; Q18 apunta directamente al algoritmo de Shor. El MP3 todavía no existe, por lo que la producción y alineación completa del audio siguen bloqueadas.

Set 14 avanzó después a v2: Reading se amplió dentro de los párrafos existentes. La pregunta sobre GDPR ahora evalúa las salvaguardas de decisiones automatizadas descritas en el artículo 22, sin presentar como indiscutido un derecho general a explicación. La definición y el estado regulatorio de armas autónomas se contrastaron con el ICRC; la cifra de deforestación se acotó al periodo medido por FAO. El pasaje monetario diferencia los instrumentos de remesa Tang de los billetes Song y las primeras notas convertibles del Bank of England del patrón oro legal posterior. El MP3 todavía no existe, por lo que la producción y alineación completa del audio siguen bloqueadas.

Set 15 avanzó después a v2: Reading se amplió dentro de los párrafos existentes. El texto sobre sueño distingue la duración variable de los ciclos y la asociación epidemiológica de la causalidad; Q4 enuncia directamente la comparación experimental con 0,05 % de alcohol en sangre. En urbanización se eliminaron una cifra de tráfico no estable y generalizaciones sobre bienestar y reforma del hukou; Q15 ahora evalúa la variabilidad metodológica. Seguridad alimentaria usa SOFI 2026, distingue las emisiones del sistema alimentario de las agrícolas y separa pérdida antes de retail de desperdicio posterior. El MP3 todavía no existe, por lo que la producción y alineación completa del audio siguen bloqueadas.

Set 16 avanzó después a v3: Reading se amplió dentro de los párrafos existentes. Las cifras de capacidad y costes renovables se ajustaron a IRENA y la descripción del Acuerdo de París ya no le atribuye un calendario tecnológico uniforme. Desarrollo infantil distingue asociación de destino, matiza la inferencia de estudios de tiempo de mirada y explica el uso de pantallas según contenido, contexto y coste de oportunidad. Globalización Q32 y Q33 evalúan coexistencia y correlación documentadas, mientras los pasajes sobre pobreza y la curva del elefante explicitan sus límites de medición. El MP3 todavía no existe, por lo que la producción y alineación completa del audio siguen bloqueadas.

Set 17 avanzó después a v2: Reading se amplió dentro de los párrafos existentes. Acidificación oceánica usa rangos por escenario del IPCC, cifras de NOAA y FAO, y separa los efectos globales de las intervenciones locales todavía experimentales. Historia del cine corrige la afirmación falsa de que la función Lumière fue la primera exhibición pagada de imágenes en movimiento, conservando su importancia histórica. Economía conductual presenta la elección racional como modelo de referencia, limita la proporción clásica de aversión a la pérdida y distingue resultados contextuales de éxito universal de los nudges. Los enunciados afectados siguen la evidencia revisada sin cambiar sus resultados clave. El MP3 todavía no existe, por lo que la producción y alineación completa del audio siguen bloqueadas.

Set 18 avanzó después a v2: Reading se amplió dentro de los párrafos existentes. CRISPR distingue el corte dirigido de los resultados inciertos de reparación, precisa la aprobación de Casgevy en 2023 y separa los mosquitos autolimitados ya liberados de los organismos gene drive todavía sin liberación abierta a mediados de 2026. Smart Cities corrige la descripción falsa de una puntuación ciudadana nacional única en China e incorpora límites de contratación, ciberseguridad, privacidad y acceso. Adquisición del lenguaje presenta la pobreza del estímulo como argumento debatido, matiza modelos neuronales e hitos y diferencia desarrollo multilingüe de trastorno. Reading Q31 cambió de `NOT GIVEN` a `NO` porque el pasaje revisado contradice expresamente la aceptación universal. El MP3 todavía no existe, por lo que la producción y alineación completa del audio siguen bloqueadas.

Set 19 avanzó después a v2: Reading se amplió dentro de los párrafos existentes. Materia oscura distingue inferencia cosmológica de identificación de partículas y actualiza el observatorio Rubin tras el inicio de LSST en junio de 2026; Q7 cambia de `NOT GIVEN` a `FALSE` porque la idea antecede a Rubin. Comercio electrónico reemplaza una proyección global no sustentada por medidas delimitadas de UNCTAD y el censo estadounidense, y matiza efectos laborales, ambientales y comerciales. Patrimonio usa cifras vigentes de UNESCO, elimina la afirmación falsa de que la Gran Barrera de Coral integra la lista en peligro y deja de atribuir reversibilidad a la Carta de Venecia; Q35 cambia a `NO`. El MP3 todavía no existe, por lo que la producción y alineación completa del audio siguen bloqueadas.

Set 20 avanzó después a v3: Reading se amplió dentro de los párrafos existentes. Resistencia antimicrobiana separa correctamente las muertes asociadas de las atribuibles, usa las categorías prioritarias de OMS de 2024, identifica a la Asamblea Mundial de la Salud como autora de la adopción de 2015 e incorpora la meta de mortalidad acordada en la ONU; Q7 y Q11 siguen esa evidencia. Agricultura urbana incorpora el alcance y las condiciones de planificación de FAO. Transporte conserva el denominador de emisiones del IPCC y sustituye afirmaciones no sustentadas sobre paridad de precios por datos delimitados de ventas, baterías y carga de la IEA. El MP3 todavía no existe, por lo que la producción y alineación completa del audio siguen bloqueadas.

## Referencia independiente de Set 1

Las cuatro partes de Listening de Set 1 se identificaron como Cambridge IELTS 10 Academic, Test 1. El fixture `set-1-listening-cambridge10-test1-reference.json` conserva únicamente la identidad, las referencias consultadas y los 40 resultados esperados; no copia el transcript. Su hash está fijado en `check-ielts-set1-listening-reference.mjs`. El check convierte índices MCQ a letras, normaliza variantes de formato como `2020`/`2,020` y exige la misma cobertura Q1–Q40. Esto confirma la clave; la correspondencia completa del archivo de audio sigue necesitando ASR y timecodes.

Los tres pasajes de Reading de Set 1 se identificaron como Cambridge IELTS 5 Academic, Test 2. La referencia separada confirmó Q1–Q40 y detectó que Q30–Q31 admiten `technical vocabulary` y `grammatical resources` en cualquier orden. El scorer introducido en v3 aplica emparejamiento uno a uno: acepta el orden inverso y evita que repetir una sola respuesta gane dos puntos. La v4 corrige la paráfrasis del guion Listening Q40 para conservar la palabra audible `expansion`. Las versiones v1–v3 siguen disponibles para revisión histórica, pero una pestaña antigua no puede enviar bajo v4.
