# Blueprint editorial de explicaciones IELTS Academic

Revisión editorial del 25 de noviembre de 2026. [Ver las capturas de las cuatro habilidades](./previews/ielts-academico/README.md).

**Ámbito:** `/practica/ielts` y las rutas de práctica que enlaza.
**Objetivo:** que una persona pueda entender qué le pide cada habilidad, cómo tomar una decisión y cómo aprender de un error, sin sustituir las lecciones que ya existen. Las guías principales y las consignas de examen usan inglés. La rúbrica y la tutoría de las respuestas guiadas acompañan al alumno en español.

## 1. Qué existe y cuál es la fuente de verdad

| Área | Material de partida | Qué encuentra el estudiante en la rama de revisión |
| --- | --- | --- |
| Entrada IELTS y Academic | Índices y biblioteca de 40 sets ensamblados | Una entrada visual común para aprender una habilidad, practicarla en otro set o hacer el simulacro completo. |
| Reading | Seis habilidades, 14 formatos, práctica mixta y ejercicios guiados e independientes | Un pasaje trabajado en cada recorrido, la pista que decide la respuesta, un error plausible y una ocasión para volver a probar el método. |
| Writing | Curso Task 1 de 14 rutas, curso Task 2, 25 ensayos y rúbrica | Siete familias visuales con informes completos, cinco familias de consignas con argumentos comentados y revisión del mismo borrador frente al ejemplo. |
| Listening | 40 sets con audio y prácticas guiadas para los primeros 20 | Una pregunta de escucha para cada parte, seis familias de tarea y devolución posterior al intento. Los cuatro fragmentos del taller proceden del MP3 existente del Set 2. |
| Speaking | Biblioteca de 40 sets, consignas en tres partes, grabador local y referencias escritas | Tres preguntas del Set 1 para practicar la entrevista, el turno largo y la discusión. Se pueden grabar dos versiones de cada respuesta o practicar en voz alta sin micrófono. |
| Simulacro guiado | 20 sets con 40 decisiones de Reading y 40 de Listening por set | Después del intento se puede revisar la decisión en español, volver al pasaje o a la grabación completa y seguir a la lección correspondiente. |
| General Training | Introducción con Reading y Writing de cartas | Itinerario independiente. El alcance de esta revisión es Academic. |

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

IELTS enumera 11 categorías numeradas de Academic Reading; WeLearn presenta 14 rutas porque separa Summary, Note, Table y Flow-chart Completion dentro de la categoría oficial de completion. Estas rutas ya están publicadas bajo `reading/tipos-de-preguntas`; cada una desarrolla un ejemplo propio y explica un error que podría cometer una persona al resolverlo.

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

El primer intento puede hacerse de una vez para simular el hecho de que el test reproduce la grabación una sola vez. En la práctica de WeLearn se puede pausar y repetir para investigar. La devolución ideal pregunta: “¿oí la información equivocada, oí la correcta pero la escribí mal, o elegí la primera opción antes de la corrección?” Son problemas diferentes. En los primeros 20 sets, la corrección relaciona la consigna, el intento y la frase registrada. Algunos recortes acaban justo antes de una confirmación. En esos casos el tutor señala el límite del fragmento y el alumno puede continuar en el audio completo. El resultado numérico es una estimación de estudio: los umbrales de banda pueden variar ligeramente entre versiones oficiales.

## 7. Speaking: hablar para alguien que escucha

Part 1 pide respuestas personales breves con una razón o detalle; Part 2 da un minuto de preparación y un turno largo de hasta dos minutos; Part 3 lleva el tema hacia razones, cambios, comparaciones o consecuencias más generales. Una respuesta desarrollada no significa una respuesta más larga a toda costa. Si la pregunta pide un hábito, basta con un ejemplo concreto y por qué ocurre. Si pide una tendencia social, hay que explicar un mecanismo, no recitar una anécdota personal como si bastara para todos los casos.

El ejemplo de enseñanza debe sonar pronunciable. “I learned cooking and it was interesting” puede crecer mostrando cuándo la persona lo necesitó, qué salió mal al principio y qué cambió. La mejora se ve en la escena y en la secuencia, no en sustituir palabras sencillas por sinónimos rebuscados. En Part 2 las notas son anclas de secuencia, no un guion; en Part 3 es legítimo matizar un argumento sin fingir datos expertos.

Los cuatro criterios oficiales son fluidez y coherencia, vocabulario, rango y precisión gramatical, y pronunciación. Una autoescucha puede observar si la idea progresa, si una palabra vaga se repite, si un tiempo verbal cambia el sentido o si una terminación suele perderse. La pronunciación requiere escuchar la voz; una transcripción no la demuestra. La rutina práctica es grabar una primera versión, escuchar buscando un único momento concreto, anotar una mejora y grabar otra. Las grabaciones de práctica centrada viven solo en la sesión abierta y no reciben banda automática.

Los modelos escritos de Part 2 en sets guiados sirven para comparar desarrollo de ideas y están rotulados como perfiles pedagógicos aproximados. Sus audios generados no han pasado aprobación humana, por lo que la interfaz no debe reproducirlos todavía. Su eventual publicación requeriría revisión de naturalidad, claridad, duración, pronunciación y coherencia con el texto, además de comprobar que nadie los interprete como muestra oficial de una banda.

## 8. Cómo revisar una explicación con el alumno delante

En la muestra de *skimming*, una lectora escribe «water meters» en el margen. Es una nota comprensible si acaba de empezar el párrafo. Al llegar a la lectura de madrugada descubre qué quieren averiguar los ingenieros y revisa su nota. Una pregunta posterior le da un motivo para volver a «began checking». Ese recorrido es el modelo de voz. Conviene dejar visible el instante en que un detalle cambia lo que pensábamos. [Antes y después del piloto](./previews/ielts-skimming/README.md).

En una tabla de Reading, el pasaje menciona dos refugios y varios materiales. Si el alumno recuerda «slate», se le puede pedir que mantenga un dedo sobre el nombre del refugio y que baje desde el encabezado del techo. Ya puede explicar dónde vio el material y comprobar si pertenece a esa casilla. En un juicio *Not Given* hace falta otro tipo de ayuda. ¿Qué dato tendría que añadir el autor para que la afirmación pudiera decidirse? Las 93 respuestas *False* o *No* del banco guiado explican el punto de contradicción. En las 29 respuestas *Not Given*, la tutoría identifica la comparación, causa, fecha u otra relación que el texto deja abierta.

En Writing resulta más fácil escuchar un consejo si se puede probar en una frase propia. Cuando el borrador afirma que Finlandia «spent the most», el alumno puede mirar el eje del gráfico, decidir si tiene un importe o un porcentaje y cambiar una sola frase. En Task 2 puede releer el segundo párrafo del ensayo sobre transporte tapando la introducción. Si el ejemplo también justificaría ensanchar la carretera, falta explicar por qué el tren resolvería mejor el problema en ese caso. Los siete informes completos de Task 1 y los 25 ensayos de Task 2 tienen controles permanentes de extensión. La rúbrica propone una revisión concreta para el mismo borrador.

En Listening hace falta oír qué relación guardan dos intervenciones. Cuando la recepcionista ofrece un descuento, el cliente muestra interés en hacerse socio. La tarifa ofrecida, el interés del cliente y una inscripción confirmada son tres momentos diferentes. El taller permite escuchar, contestar, revisar las palabras exactas y repetir la pregunta. En Speaking el propio estudiante aporta la evidencia con su voz. En la segunda toma puede conservar la pregunta sobre el sueldo y precisar para quién sería decisivo un aumento. Solo después tiene sentido cambiar de pregunta para ver si puede trasladar esa manera de explicar.

### Qué verifica la revisión

- El recorrido de navegador parte del índice, abre las 21 rutas de Reading y prueba una decisión guiada de búsqueda y evidencia. En Writing comprueba que las siete figuras y las cinco familias de ensayo conducen a práctica. En Listening reproduce los cuatro audios y comprueba la corrección y el reintento. En Speaking comprueba los dos audios privados, el cambio de parte y la alternativa cuando el micrófono está bloqueado.
- La batería de simulacros recorre los 800 ítems de cada habilidad objetiva. Verifica la procedencia de la evidencia, la ausencia de corrección si falta un intento, los grupos de respuestas en cualquier orden y los destinos de práctica. Las notas concretas de casos difíciles y las reglas por familia conviven en esta tutoría. Una comprobación automática de todos los ítems mide cobertura funcional.
- El inventario de publicación examina por separado las huellas de los activos y la documentación académica de cada set. Sus estados y los expedientes que siguen abiertos figuran en el informe del harness. [Harness de los primeros 20 sets](./ielts-harness.md).
- Con la aplicación en marcha, ejecutar `npm run check:ielts-learning -- --base=http://127.0.0.1:3000`. Para los datos, ejecutar `npm run test:ielts-guided`, `npm run check:ielts-task1` y `npm run check:ielts-task2`. La galería permite evaluar el tono y el resultado visual directamente. [Abrir las capturas](./previews/ielts-academico/README.md).

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
