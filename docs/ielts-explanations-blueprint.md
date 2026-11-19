# Blueprint editorial de explicaciones IELTS Academic

**Estado:** inventario y contrato de contenido, 19 de noviembre de 2026.

**Ámbito:** `/practica/ielts` y las rutas de práctica que enlaza.
**Objetivo:** que una persona pueda entender qué le pide cada habilidad, cómo tomar una decisión y cómo aprender de un error, sin sustituir las lecciones que ya existen. El contenido público de las rutas IELTS está en inglés; este documento de trabajo está en español.

## 1. Qué existe y cuál es la fuente de verdad

| Área | Ya disponible | Fuente que se conserva | Mejora concreta |
| --- | --- | --- | --- |
| Entrada IELTS y Academic | Cuatro habilidades, práctica por habilidad y mocks completos; 40 sets ensamblados | `src/app/(site)/practica/ielts/IELTSHubClient.tsx`, `academic/Content.tsx`, catálogo de sets | Una misma portada visual, cifras y enlaces consistentes; explicar la diferencia entre aprender y medir. |
| Reading | Hub, 14 rutas de formatos, seis rutas de habilidades, Mixed Practice, 40 sets por habilidad | `reading/Content.tsx`, `reading/tipos-de-preguntas`, `reading/habilidades`, `reading/mixed-practice` | Añadir en el hub una explicación narrativa de cómo leer; mejorar la devolución de cada respuesta guiada. No copiar las 20 lecciones al hub. |
| Writing | Task 1 con mapa de 14 rutas, Task 2 con tipos de ensayo, estructura, habilidades, tarea completa y 25 ensayos modelo; rúbrica | `academic/writing/task1`, `academic/writing/task2`, `academic/writing/rubrica` | Dar una entrada clara desde `/writing`; hacer que cada devolución señale el efecto de una decisión en el texto completo. No rehacer los cursos. |
| Listening | 40 sets con audio y hoja PDF; primeros 20 también tienen clips de evidencia en el modo guiado | `listening/simulacros`, `src/data/ielts/guided-mock.ts` | Explicar los cuatro contextos, anticipación, distractores, formatos y revisión del audio. Convertir las justificaciones genéricas en explicaciones específicas. |
| Speaking | 40 sets con prompts de las tres partes y grabación local; en los primeros 20 hay dos respuestas escritas de referencia para Part 2 | `speaking`, `src/data/ielts/guided-mock.ts` | Explicar cómo desarrollar una respuesta, los cuatro criterios y una rutina de autoescucha. Los audios de modelos están generados pero **no aprobados ni listos**: no ofrecer reproducción ni sugerir que se puede evaluar pronunciación por texto. |
| Mock completo guiado | Sets 1–20 con respuesta y fragmento autorizado para las 40 preguntas de Listening y las 40 de Reading de cada set | `src/data/ielts/guided-mock.ts`, `src/data/ielts/guided-evidence.ts`, ruta `guiado` | Mejorar la explicación asociada a la evidencia y el distractor concreto. Los sets 21–40 no tienen ruta guiada: nunca mostrarles ese CTA. |
| General Training | Introducción separada a Reading y Writing de cartas | `general-training` | Mantener la frontera Academic/GT visible. Este blueprint no promete 40 mocks GT. |

**Regla de conservación:** una ruta específica sigue siendo la fuente para su técnica. El hub orienta, enlaza y muestra un ejemplo de decisión; no reproduce lecciones enteras. Cuando una explicación necesite corrección, se corrige en el dato o componente canónico y se comprueba el enlace desde el hub.

## 2. Contrato visual único

El sistema ya existe en `src/styles/practica-ui.css`, con los tokens semánticos `--wl-*`, la escala `--wlp-*` y los acentos de `src/data/practica/skill-accents.ts`. IELTS usa ese sistema. La estructura común es una miga de navegación, un hero con promesa concreta, una franja breve de hechos, secciones con eyebrow/título/introducción, prosa de máximo 78 caracteres por línea aproximadamente, ejemplo trabajado y una acción hacia la siguiente práctica. Las tarjetas son superficies planas con borde y radio de 6 px; el ancho máximo es 1180 px. El acento de la tarjeta de una habilidad debe ser el mismo que se ve al abrir su ruta, incluso en modo oscuro.

El color identifica la habilidad, pero no es la única señal. Un resultado debe decir con palabras qué ocurrió, mostrar la evidencia y permitir volver a la pregunta. Reading puede usar un panel inverso para su mapa; ese panel sigue usando `--wl-inverse` y `--wl-on-inverse` para conservar contraste. El resto de las portadas no necesita fondos decorativos, grandes sombras ni tarjetas con radios propios. En móvil, la pregunta, el fragmento y el control de respuesta deben conservar una columna legible; el usuario no debe tener que desplazarse horizontalmente para entender por qué falló.

Este contrato amplía `docs/ielts-product-ui-blueprint.md` a Listening y Speaking. Las lecciones internas de Task 1, Task 2 y Reading mantienen sus interacciones especializadas; se unifica la entrada, el ritmo editorial, las superficies y la navegación antes de intervenir motores de ejercicios ya funcionales.

## 3. Cómo debe sonar una explicación humana

Una explicación útil se escribe para alguien que acaba de tomar una decisión, no para rellenar una casilla de feedback. Primero reconoce qué pedía la pregunta; después señala un momento localizable del texto, audio o prompt; luego compara la respuesta correcta con una alternativa realmente tentadora; por último deja una acción transferible para la siguiente pregunta. No hace falta repetir cuatro subtítulos rígidos en pantalla si la prosa fluye naturalmente, pero esas cuatro funciones tienen que estar presentes.

Ejemplo de tono para una pregunta de Listening: “Es comprensible que anotaras *Tuesday*: es el primer día que dice la persona y aparece junto al nombre de la reunión. Pero después corrige el plan: la sala solo está libre el jueves. La pregunta pide el día acordado, así que aquí importa la última decisión, no la primera mención. En la próxima pregunta con dos fechas, espera una señal como *but*, *actually* o *instead* antes de cerrar la respuesta.” Esto enseña algo verificable; “escucha con atención” no.

Evitar “la respuesta correcta es X porque el audio dice X”, “lee cuidadosamente”, “usa vocabulario variado” y cierres idénticos en cientos de preguntas. También evitar la voz de evaluador omnisciente: una muestra escrita de Speaking no demuestra pronunciación y un borrador de Writing no recibe una banda automática por parecerse a un modelo. Usar un ejemplo pequeño y plausible, seguido de la razón, suele funcionar mejor que una lista de consejos sin escena.

**Contrato de datos para feedback objetivo:** `questionId`, tipo de operación, evidencia aprobada (párrafo/frase o clip y marcas de tiempo), respuesta aceptada, distractor o error plausible específico, explicación de por qué ese distractor falla y siguiente movimiento. La clave aprobada y la evidencia se conservan. El editor no inventa una cita ni mueve un clip para que encaje con una explicación nueva. Si la evidencia está pendiente de revisión independiente, la explicación permanece cerrada.

## 4. Reading: leer antes de decidir

### 4.1 La secuencia que debe entender el estudiante

Una persona abre un pasaje desconocido y quizá intenta leerlo todo con la misma intensidad. Eso produce la falsa sensación de estar “estudiando” mientras el tiempo se consume en detalles que ninguna pregunta necesita. La primera lectura es una orientación: título, comienzo y función de cada párrafo. Se puede escribir un mapa de cuatro palabras —problema, método, resultado, objeción—. Eso es skimming. No autoriza a contestar desde la memoria vaga del texto; solo indica dónde puede vivir la evidencia.

La segunda lectura empieza en la pregunta. Hay que reconocer el trabajo que exige: una idea central, un detalle localizado, la postura del autor, una relación entre personas y hallazgos, o las palabras exactas que completan una frase. Scanning ayuda a encontrar un ancla como un nombre, una cifra o una idea reformulada. Cuando aparece, se lee alrededor: la frase anterior puede limitar la afirmación y la siguiente puede corregirla. Buscar una palabra repetida es un inicio de búsqueda, no una justificación.

Después viene la comparación de significado. Si el texto dice “a minority of residents” y la opción dice “all residents”, la coincidencia temática no salva el cambio de alcance. Si un investigador propone algo y el autor después lo rechaza, hay que distinguir quién sostiene cada idea. “Not Given” se elige cuando el texto no permite resolver la afirmación; no significa que el lector no haya encontrado aún la frase. En las preguntas de completar, el último control es formal: instrucción de palabras, plural, ortografía y encaje gramatical. En un atasco, se marca la pregunta y se avanza con una pista más clara, luego se vuelve.

La explicación pública del hub presenta esta secuencia con un pasaje imaginado y enlaces a las seis lecciones existentes. Cada lección contiene su ejercicio guiado e independiente; el hub no sustituye esa práctica. La guía oficial establece el formato del test; “Map → Locate → Compare → Control” es una estrategia de WeLearn.

### 4.2 Seis habilidades existentes y cuándo usarlas

| Habilidad | Decisión que enseña | Error que debe revelar la devolución |
| --- | --- | --- |
| Skimming | Dar a un párrafo una función sin memorizar cada detalle. | Elegir un heading por una palabra llamativa que solo ocupa una línea. |
| Scanning | Encontrar una ventana de evidencia y ampliarla lo suficiente. | Parar en la primera coincidencia de nombre o número. |
| Paraphrase recognition | Comparar ideas expresadas con palabras distintas. | Confundir eco léxico con equivalencia de significado. |
| Inference | Concluir solo lo que las premisas permiten. | Convertir una posibilidad o un caso en una afirmación universal. |
| Word-limit control | Extraer la respuesta mínima que completa la frase dentro del límite. | Escribir una idea correcta con palabras de más o gramática rota. |
| Time management | Salir de un atasco y volver con una hipótesis concreta. | Releer todo el pasaje por una sola pregunta sin nueva pista. |

### 4.3 Catorce rutas de formatos existentes

IELTS enumera 11 categorías numeradas de Academic Reading; WeLearn presenta 14 rutas porque separa Summary, Note, Table y Flow-chart Completion dentro de la categoría oficial de completion. Estas rutas ya están publicadas bajo `reading/tipos-de-preguntas`; cada una necesita su propio ejemplo y su propia explicación de error, no una definición copiada del índice.

| Familia | Rutas | Qué debe explicar el ejemplo trabajado |
| --- | --- | --- |
| Evidencia y postura | True / False / Not Given; Yes / No / Not Given | Diferencia entre hecho textual y opinión del autor; apoyo, contradicción y ausencia de información. |
| Selección | Multiple Choice; Short-answer Questions | La pregunta exacta, por qué una opción parcialmente verdadera no responde; extracción mínima en short answer. |
| Organización | Matching Headings; Matching Information | Idea principal de un párrafo frente a un detalle que aparece dentro de él. |
| Relaciones | Matching Features; Matching Sentence Endings | Quién o qué corresponde a una característica y si el final produce una afirmación apoyada. |
| Completar | Sentence, Summary, Note, Table y Flow-chart Completion | Fuente exacta de las palabras, orden lógico, gramática y límite de palabras. |
| Representación | Diagram Labeling | Cómo localizar en el pasaje el componente representado, sin adivinar por la posición del dibujo. |

Para cada formato, la devolución debería localizar el párrafo, citar solo el segmento necesario, nombrar la operación y explicar una trampa específica. En Mixed Practice, debe decir por qué se cambió de operación entre dos preguntas del mismo pasaje. La prueba de transferencia es un pasaje nuevo; repetir una clave recordada no demuestra aprendizaje.

## 5. Writing: dos tareas con trabajos distintos

### 5.1 Task 1, explicar una selección

En Task 1 Academic la persona no está escribiendo una opinión sobre el gráfico. Está convirtiendo información visual en un informe selectivo. La primera decisión es leer ejes, unidades, periodo y categorías; la segunda es elegir el patrón mayor y las comparaciones que lo sostienen. Por ejemplo, ante dos líneas que suben pero a velocidades distintas, el overview debe contar esa diferencia antes de enumerar valores. Una respuesta puede tener vocabulario elegante y, aun así, fallar si da todos los números sin decir qué cambió de forma importante. En mapas hay que distinguir estado inicial y final; en procesos, la secuencia y sus fases, sin atribuir causas que la imagen no muestra.

El curso de Task 1 ya enseña overview, párrafos, comparaciones, tendencias, vocabulario, gráficos lineales y de barras, tablas, pie charts, mapas, procesos y tarea completa. El hub `/writing` debe enviar allí. Las explicaciones de ejercicio deben mostrar por qué se eligió un rasgo y se dejó otro fuera, qué cifra sustenta el overview y cuándo una paráfrasis altera los datos. Las metas de párrafo o de tiempo que usa WeLearn son andamios de estudio; el requisito oficial de extensión y los criterios del test se identifican por separado.

### 5.2 Task 2, explicar el razonamiento

En Task 2 el primer error costoso suele ocurrir antes de escribir: tratar una pregunta de “discuss both views and give your opinion” como si pidiera solo ventajas, o responder a un problema sin proponer la solución solicitada. Se debe convertir la instrucción en una lista breve de obligaciones y escoger una postura que el ensayo pueda sostener. Luego cada párrafo necesita un trabajo propio: afirmación, explicación de por qué ocurre, ejemplo pertinente y relación con la pregunta. Un ejemplo inventado con estadísticas improbables no sustituye un mecanismo claro.

La revisión se hace en orden de impacto. ¿Respondí todas las partes? ¿Se puede seguir la progresión entre introducción, cuerpo y conclusión? ¿Las palabras dicen exactamente lo que quise decir? ¿Los errores de gramática interrumpen el sentido? El curso existente ya incluye cinco familias de preguntas, análisis del prompt, cuerpo 1 y 2, conclusión, revisión, habilidades transferibles, tarea completa y 25 modelos. La portada no necesita otro curso de ensayos. Sí necesita orientar a una persona hacia el tipo de problema que tiene y mostrar cómo usar un modelo: comparar decisiones de estructura y desarrollo, no memorizar frases.

La rúbrica de WeLearn traduce cuatro criterios oficiales de Writing a observaciones concretas. El resultado de práctica centrada muestra borradores y conteos de palabras; no calcula una banda de Writing. Al comparar un borrador con un modelo, una explicación debe señalar una mejora verificable (“tu segundo párrafo introduce otra razón, pero no explica cómo produce el resultado”) antes de sugerir vocabulario.

## 6. Listening: escuchar la decisión completa

Las cuatro partes cambian de escenario: conversación práctica, exposición de una persona, discusión académica y charla o clase académica. En todas, la tarea es seguir una secuencia oral que no espera al lector. Antes del audio, el estudiante lee la instrucción y predice la forma de la respuesta: nombre, número, lugar, sustantivo, razón o elección. Esa predicción dirige la atención; no es una respuesta anticipada. Durante la escucha, se sigue el orden de preguntas y se esperan correcciones, contraste y conclusión. Si se pierde una palabra, se marca el hueco y se pasa al siguiente, porque quedarse intentando recordar el sonido anterior puede costar varias respuestas.

En completion se comprueba la forma de la frase y el límite impreso. En multiple choice se distingue “mencionado” de “elegido”; algunas opciones aparecen literalmente en el audio antes de que un hablante las descarte. En matching se identifica quién sostiene una idea y si cambió de opinión. En mapas y planos se establece punto de partida, orientación y siguiente referencia antes de seguir derecha o izquierda. Una explicación para estas tareas tiene que anclar la respuesta a un fragmento temporal, no solo repetir el texto transcrito.

El primer intento puede hacerse de una vez para simular el hecho de que el test reproduce la grabación una sola vez. En la práctica de WeLearn se puede pausar y repetir para investigar. La devolución ideal pregunta: “¿oí la información equivocada, oí la correcta pero la escribí mal, o elegí la primera opción antes de la corrección?” Son problemas diferentes. Los primeros 20 sets tienen clips guiados; las justificaciones actuales reutilizan demasiado texto genérico y conviene editarlas a partir de cada clip aprobado. El resultado numérico es una estimación de estudio: los umbrales de banda pueden variar ligeramente entre versiones oficiales.

## 7. Speaking: hablar para alguien que escucha

Part 1 pide respuestas personales breves con una razón o detalle; Part 2 da un minuto de preparación y un turno largo de hasta dos minutos; Part 3 lleva el tema hacia razones, cambios, comparaciones o consecuencias más generales. Una respuesta desarrollada no significa una respuesta más larga a toda costa. Si la pregunta pide un hábito, basta con un ejemplo concreto y por qué ocurre. Si pide una tendencia social, hay que explicar un mecanismo, no recitar una anécdota personal como si bastara para todos los casos.

El ejemplo de enseñanza debe sonar pronunciable. “I learned cooking and it was interesting” puede crecer mostrando cuándo la persona lo necesitó, qué salió mal al principio y qué cambió. La mejora se ve en la escena y en la secuencia, no en sustituir palabras sencillas por sinónimos rebuscados. En Part 2 las notas son anclas de secuencia, no un guion; en Part 3 es legítimo matizar un argumento sin fingir datos expertos.

Los cuatro criterios oficiales son fluidez y coherencia, vocabulario, rango y precisión gramatical, y pronunciación. Una autoescucha puede observar si la idea progresa, si una palabra vaga se repite, si un tiempo verbal cambia el sentido o si una terminación suele perderse. La pronunciación requiere escuchar la voz; una transcripción no la demuestra. La rutina práctica es grabar una primera versión, escuchar buscando un único momento concreto, anotar una mejora y grabar otra. Las grabaciones de práctica centrada viven solo en la sesión abierta y no reciben banda automática.

Los modelos escritos de Part 2 en sets guiados sirven para comparar desarrollo de ideas y están rotulados como perfiles pedagógicos aproximados. Sus audios generados no han pasado aprobación humana, por lo que la interfaz no debe reproducirlos todavía. Su eventual publicación requeriría revisión de naturalidad, claridad, duración, pronunciación y coherencia con el texto, además de comprobar que nadie los interprete como muestra oficial de una banda.

## 8. Prioridades sin rehacer lo construido

1. **Hecho en esta intervención:** portadas IELTS, Academic, Listening, Speaking y Writing alineadas con tokens y ancho compartidos; entrada detallada a Listening/Speaking; síntesis narrativa de Reading; enlaces y cifras de 40 sets corregidos; CTA guiado limitado a sets 1–20.
2. **Siguiente mejora editorial:** auditar las devoluciones de los 1.600 ítems objetivos guiados (800 Listening y 800 Reading). Empezar por preguntas con más errores o distractores complejos. Mantener clave y evidencia aprobadas, añadir una razón específica y una trampa real. Un revisor de contenido comprueba cada pareja pregunta/evidencia/explicación antes de publicarla.
3. **Siguiente mejora de producto:** hacer visible, desde el resultado de práctica por habilidad, la ruta de aprendizaje que responde al error. Por ejemplo, después de un fallo por word limit, enlazar esa lección; después de confundir un heading con un detalle, enlazar Matching Headings. No asignar una banda de Writing o Speaking a partir de un conteo o una grabación sin evaluación.
4. **Auditoría visual posterior:** llevar progresivamente los interiores heredados de Reading, Task 1 y Task 2 al mismo contrato de superficies, foco, espaciado y móvil. La migración se hace ruta por ruta con una captura antes/después; no se sustituye el motor de ejercicios para conseguir paridad estética.

### Criterios para dar una explicación por terminada

- Se entiende qué pedía la pregunta sin releer toda la instrucción.
- La evidencia aparece en el mismo flujo y puede localizarse en el texto, el audio o el prompt.
- La explicación compara la decisión acertada con una alternativa plausible y específica.
- El consejo final se puede aplicar a una pregunta nueva.
- La voz es de tutor: precisa, natural, con un ejemplo concreto y sin párrafos intercambiables.
- El contenido distingue formato oficial, estrategia WeLearn y estimación de práctica.
- La ruta funciona con teclado, lector de pantalla, móvil de 320/390 px y modos claro/oscuro.

## Fuentes oficiales para las afirmaciones de formato

- [IELTS Academic Reading](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading)
- [IELTS Academic Listening](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening)
- [IELTS Academic Writing](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing)
- [IELTS Speaking](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking)
- [IELTS scoring in detail](https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail)
