import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Expression of Ideas del módulo `sat-set-1-m2-facil` — ítems q23 a q27.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 23-27). Claves del plan, que no se
 * negocian ítem a ítem: **B, A, B, C, A**. Dificultades 1, 2, 1, 2, 3 y temas humanidades,
 * historia, ciencia, literatura, humanidades. Todo el contenido es original (§5 del
 * blueprint); de College Board solo se reproducen los dos enunciados canónicos.
 *
 * Dos formas dentro del bloque, con reglas distintas:
 *
 * - **rhetorical-synthesis** (q23-q24). Aquí las **cuatro opciones son verdaderas según las
 *   notas**. Lo único que separa a la clave es que cumple el objetivo declarado y las otras
 *   tres contestan a otra pregunta. Es una regla distinta de la del bloque EOI del módulo 1,
 *   donde los distractores son falsos por un dato comprobable: si una opción es falsa, el
 *   ítem mide lectura de notas y deja de medir síntesis, que es lo que este módulo tiene que
 *   medir en su tramo fácil.
 *
 *   El precio de esa regla es que la clave se puede buscar por el objetivo, así que las
 *   cuatro opciones se diseñaron antes de decidir cuál lo cumplía (R8). La primera versión
 *   del bloque cumplía eso y aun así **la acertaron 10 de 10 sin ver las notas**, igual que
 *   su equivalente del módulo 1 (13 de 14). La causa está en **R12**: sin las notas se elige
 *   la frase que suena más redonda —la que enlaza dos ideas con una causal, la que menciona
 *   más elementos, la que tiene forma de conclusión—, y esa suele ser la clave porque
 *   cumplir el objetivo empuja al redactor a escribirla más completa.
 *
 *   Los dos juegos de opciones se rehicieron con un **molde único**, el mismo para las
 *   cuatro: `Because <hecho de las notas>, <consecuencia>`. Las cuatro empiezan por
 *   «Because», las cuatro llevan cláusula causal, las cuatro gastan dos elementos de las
 *   notas y las cuatro caben en la misma línea (7 caracteres de diferencia entre la más
 *   larga y la más corta en los dos ítems, poco más de una palabra). Lo único que separa a
 *   la clave es si su consecuencia contesta al objetivo del enunciado.
 *
 *   Dos fugas concretas que el molde solo no tapa, y que se taparon a mano:
 *
 *   - **q23**: el objetivo habla de un oyente que no entiende, así que si la clave fuera la
 *     única con un oyente que falla, se señalaría sola. La A también termina en un oyente
 *     que no saca nada —de un grito, no de un silbo—, y C y D terminan en un oyente que sí
 *     lo saca: dos y dos.
 *   - **q24**: el objetivo nombra la revocación de 1851, así que la clave no puede ser la
 *     única que la nombre ni la única que la ponga en la oración principal. La B también la
 *     nombra y también la lleva de sujeto —y explica lo que vino después, no lo que la
 *     causó—; el concejo y su voto aparecen en las cuatro.
 *
 *   Se conserva lo que ya estaba bien: **las cuatro opciones siguen siendo verdaderas según
 *   las notas** en los dos ítems. El defecto era de forma, no de verdad.
 *
 *   La nota 6 de q23 decía que una escuela enseña el habla silbada «tantas horas a la semana
 *   como la lengua hablada». Es falso fuera del ítem —donde esto existe es asignatura
 *   obligatoria de primaria, media hora larga a la semana— y un simulacro no puede enseñar
 *   un dato falso ni dentro de un distractor. Ahora dice «required subject, half an hour a
 *   week», que funciona igual como distractor irrelevante.
 *
 * - **transitions** (q25-q27). Los cuatro conectores pertenecen a **cuatro relaciones
 *   distintas** —ejemplo, consecuencia, contraste, simultaneidad, concesión, adición,
 *   sustitución—, nunca dos de la misma familia: dos sinónimos se cancelan y el ítem se
 *   resuelve por descarte sin leer (regla 2 del plan). q25 llevaba «In contrast» y
 *   «Nevertheless», las dos adversativas: quien diagnostica «aquí no hay contraste» se
 *   llevaba dos de un golpe y el ítem bajaba a tres opciones. «Nevertheless» pasó a
 *   «Meanwhile», que es temporal y tiene su propio camino —el texto habla de la noche y de
 *   la mañana siguiente—. El hueco precede siempre a una oración independiente completa, así
 *   que los cuatro caben sin romper la sintaxis y ninguno se poda por gramática.
 *
 * Puertas medidas sobre el bloque antes de entregarlo:
 *
 * - **7 longitud**: 113,0 · 128,3 · 100,2 · 83,0 · 125,3 palabras-SAT. Las cinco dentro de
 *   25-150.
 * - **2 longitud de la clave**: la clave no es la opción más larga en ninguno de los cinco.
 *   En q23 y q24 tampoco es la más corta: las cuatro miden lo mismo con un margen de siete
 *   caracteres.
 * - **3 solape léxico**: en q23 la clave repite 12 palabras del texto contra 13, 13 y 11 de
 *   los distractores, y en q24 repite 15 contra 11, 15 y 16: en los dos queda estrictamente
 *   por debajo del máximo y por encima del mínimo, así que ninguno cuenta para ninguna de
 *   las dos caras de la puerta. En los tres de transiciones el solape es 0 en las cuatro
 *   opciones. Las cifras se movieron al rehacer las opciones y se volvieron a medir; no se
 *   heredan de la versión anterior.
 * - **12 variedad temática**: humanidades ×2, historia, ciencia y literatura, uno cada uno.
 *
 * Lo que este bloque **no** trae: q23, q24 y q25 cambiaron después de escribirse, así que
 * por R2 vuelven enteros a la cola de auditoría —no se revisa «solo lo que cambió»— y la
 * prueba a ciegas hay que repetirla sobre estas opciones. El módulo todavía no tiene acta en
 * `docs/sat-auditorias/`, de modo que no hay ninguna huella firmada que estos cambios dejen
 * caducada.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q23',
    type: 'mcq',
    part: 1,
    stimulus:
      "While researching a topic, a student has taken the following notes:\n\n• Whistled speech carries an ordinary spoken language across a valley: the whistler whistles the words of a sentence.\n• It is not a code of its own. Whistlers reproduce the vowels and consonants of words they already speak.\n• Herders in several mountain regions arrived at the practice independently of one another.\n• A whistled phrase can be made out five kilometers away; a shout fades within a few hundred meters.\n• A listener who does not speak the underlying language hears whistling and understands none of it.\n• In one valley a school teaches whistled speech as a required subject, half an hour a week.",
    text: 'The student wants to explain why some listeners cannot understand a whistled message. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'Because a shout fades within a few hundred meters while a whistled phrase carries five kilometers, a listener at the far side of a valley makes out nothing that is shouted.',
      'Because whistlers reproduce the vowels and consonants of ordinary words instead of a code of their own, a listener who does not speak the language makes out nothing but whistling.',
      'Because a school in one valley now teaches whistled speech as a required subject, a listener schooled there makes out whistled sentences after half an hour of lessons a week.',
      'Because herders in several mountain regions arrived at whistled speech independently, a listener in one of those ranges makes out whistling that nobody brought there from outside.',
    ],
    answer: 1,
  },
  {
    id: 'q24',
    type: 'mcq',
    part: 1,
    stimulus:
      "While researching a topic, a student has taken the following notes:\n\n• Until the 1840s every town in the district set its clocks by local noon, so towns forty kilometers apart differed by several minutes.\n• The railway company printed one timetable for the whole line and kept the time of the district capital at every station.\n• Station clocks in six towns were fitted with a second minute hand so that local time and railway time could be read at once.\n• In 1848 the council of Brantwood voted to keep local time on the town's public clocks.\n• In 1851 the same council reversed the vote; its minutes record dozens of petitions from travelers who had reached the platform after their train had left.\n• The newspapers of the district stopped printing local time in 1855.",
    text: "The student wants to explain why the council of Brantwood reversed its 1848 vote. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    options: [
      "Because dozens of travelers had reached the platform with their train already gone, in 1851 the council reversed the 1848 vote that kept local time on the town's clocks.",
      "Because the district's newspapers went on printing local time until 1855, the reversal the council voted in 1851 changed the town's clocks four years before its papers did.",
      "Because the railway kept the time of the district capital at every station, the local time the council voted for in 1848 disagreed with the time on the town's own platform.",
      'Because the local time the council kept had to be read beside railway time, the station clocks of six towns in the district were fitted with a second minute hand of their own.',
    ],
    answer: 0,
  },
  {
    id: 'q25',
    type: 'mcq',
    part: 1,
    stimulus:
      'Most plants open the pores of their leaves during the day, when sunlight drives photosynthesis, and every hour those pores stay open the leaf loses water. In a desert at midday the air pulls water out of a leaf faster than the roots can replace it. Many desert plants have reversed the schedule: their pores stay shut through the heat and open after dark, when the air is cool and still. The carbon dioxide taken in at night is stored in the leaf and spent the next morning, with the pores already closed. ______ the plant can work through a whole sunlit day without opening its leaves to the dry air.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'For instance,',
      'As a result,',
      'In contrast,',
      'Meanwhile,',
    ],
    answer: 1,
  },
  {
    id: 'q26',
    type: 'mcq',
    part: 1,
    stimulus:
      'The house had stood empty for nine winters, and the track up to it had gone back to grass. Mara had come prepared for the worst of it: a roof open to the weather, floorboards lifted by frost, the kitchen given over to whatever lived in the hedge. ______ the door swung when she pushed it, the stove still held a scoop of dry coal, and on the table stood a jar of pears sealed under wax. She waited in the doorway a long while before she went in, listening to a house that somebody had been keeping.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'Accordingly,',
      'Moreover,',
      'Instead,',
      'For instance,',
    ],
    answer: 2,
  },
  {
    id: 'q27',
    type: 'mcq',
    part: 1,
    stimulus:
      'Translators often say that a translation ages faster than the book it translates. The claim is easy to state and hard to test. A novel published in 1890 goes on being read in the language it was written in, while the versions made of it elsewhere are replaced every generation or two, and the replacement is justified by saying that the old version now sounds dated. ______ the sentence a translator writes belongs to the moment of its writing in a way the original does not: it answers a question about how a foreign book should sound in this language now, and every generation asks that question again. The difficulty is that originals sound dated too, and readers forgive them for it. What ages may be less the translation than our patience with it.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'To be sure,',
      'Consequently,',
      'For instance,',
      'Likewise,',
    ],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q23',
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 1,
    tema: 'humanidades',
    razones: {
      A:
        'Cierta (nota 4) y cambia el mensaje. Explica por qué no se entiende un grito al otro lado del valle, no por qué no se entiende un silbo, que es lo que pide el enunciado: el grito se apaga en unos cientos de metros y el silbo llega a cinco kilómetros. Es el camino de quien confunde oír con entender y busca el obstáculo en la distancia, el único dato de las notas con forma de cifra. Según la nota 5, el oyente que no habla la lengua tampoco entiende al silbador que tiene al lado.',
      B:
        'Correcta: junta las dos notas que responden a la pregunta. Como el silbo no es un código aparte sino los vocales y consonantes de palabras corrientes (nota 2), entenderlo es entender la lengua de debajo; por eso el oyente que no la habla solo oye silbidos (nota 5). De las cuatro es la única que nombra lo que le falta al que no entiende —la lengua— y no la distancia, la escuela ni el origen de la práctica.',
      C:
        'Cierta (nota 6) y desviada al aula. Es lo que elige quien da por hecho que lo que no se entiende es lo que no se ha estudiado, y toma la media hora semanal de la escuela del valle por la condición de acceso. Las notas apuntan a lo contrario: debajo del silbo está la lengua que el oyente ya habla o no habla, no una asignatura que haya que cursar.',
      D:
        'Cierta (nota 3) y contesta por el origen. Que cada región llegara al silbo por su cuenta dice de dónde salió la práctica, no qué le pasa a quien la oye. Es el camino de quien lee «independently» y concluye que cada montaña silba una cosa distinta, de manera que unos silbadores no se entenderían con otros. Las notas no comparan regiones entre sí: el único oyente que se queda fuera (nota 5) es el que no habla la lengua hablada.',
    },
    fuenteHecho:
      'Hecho libre de lingüística: el habla silbada reproduce la fonética de una lengua hablada, se ha desarrollado de forma independiente en varias zonas de montaña y alcanza varios kilómetros. Donde se enseña en la escuela lo hace como asignatura obligatoria de media hora semanal, y así lo dice la nota 6: la versión anterior decía «tantas horas a la semana como la lengua hablada», que es falso, y un dato falso no se sostiene ni dentro de un distractor. Redacción original; sin nombrar ninguna lengua, valle ni comunidad reales.',
  },
  {
    id: 'q24',
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Correcta: la nota 5 pone la razón junto al cambio de voto —en 1851 el mismo concejo revoca el acuerdo y sus actas recogen decenas de peticiones de viajeros que llegaron al andén con el tren ya salido—. De las cuatro es la única cuya cláusula causal nombra algo que ocurrió entre los dos votos y que presionó al concejo; las otras tres arrancan igual, son igual de ciertas y explican otra cosa.',
      B:
        'Cierta (notas 5 y 6) y llega tarde. Los relojes del pueblo cambian en 1851 y los periódicos del distrito siguen imprimiendo la hora local hasta 1855: los cuatro años de diferencia son exactos, pero son posteriores a la votación. Es el camino de quien busca la nota más cercana en el tiempo a la revocación y toma por causa lo que vino detrás; lo que pasó en 1855 no pudo mover un voto de 1851.',
      C:
        'Cierta (notas 2 y 4) y explica el desacuerdo, no el cambio. Que el ferrocarril llevara toda la línea con la hora de la capital es lo que hizo que el reloj del pueblo y el del andén marcaran cosas distintas; eso era igual el día del primer voto y el día de la revocación, así que no puede ser lo que movió al concejo. Es el camino de quien contesta por qué había dos horas en vez de por qué se abandonó una.',
      D:
        'Cierta (nota 3) y confunde el arreglo con el motivo. La segunda aguja fue la manera de convivir con las dos horas, no la razón por la que el concejo dejó de defender una de ellas; un reloj que da las dos horas a la vez quita urgencia al cambio en lugar de provocarlo. Es lo que elige quien busca en las notas la solución técnica y la da por respuesta a una pregunta sobre una votación.',
    },
    fuenteHecho:
      'Patrón histórico libre: hora local por mediodía solar en cada población, horarios de ferrocarril impuestos desde una sola ciudad y relojes de estación con doble aguja durante la transición. Brantwood, el distrito, las fechas y las cifras son inventados.',
  },
  {
    id: 'q25',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 1,
    tema: 'ciencia',
    razones: {
      A:
        'Lee la última oración como un caso concreto de lo anterior. No lo es: no aparece ninguna planta ni ningún desierto en particular, y la oración habla del mismo sujeto general que la precede. Es el camino de quien ve un párrafo que va de lo general a lo concreto y da por supuesto que termina con un ejemplo.',
      B:
        'Correcta: las tres oraciones anteriores montan un mecanismo —poros cerrados de día, abiertos de noche, dióxido de carbono guardado hasta la mañana siguiente— y la del hueco dice qué se consigue con él: un día entero de sol trabajando sin abrir la hoja al aire seco. Es el resultado de lo que se acaba de describir, y ninguna otra relación encaja.',
      C:
        'Traslada al hueco la oposición con la que abre el texto —plantas que abren los poros de día y pierden agua— dos oraciones después de que el texto ya la haya resuelto. En el hueco no hay dos cosas enfrentadas: hay una sola planta, la del desierto, y lo que consigue gracias al horario invertido que se acaba de explicar.',
      D:
        'Lee el hueco como un segundo proceso que corre a la vez que el anterior, y el texto le da pie: el dióxido de carbono entra de noche y se gasta a la mañana siguiente, así que hay dos momentos en juego. Pero la oración del hueco no ocurre «mientras tanto»: es lo que el mecanismo consigue una vez completo, y el día de sol del que habla es el mismo en el que se gasta lo guardado. Es el camino de quien sigue el reloj del texto en vez de su argumento.',
    },
    fuenteHecho:
      'Hecho libre de fisiología vegetal: apertura estomática nocturna y fijación del CO2 hasta la mañana siguiente en plantas de zonas áridas. Sin especie, desierto ni estudio concretos.',
  },
  {
    id: 'q26',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A:
        'Hace de lo que Mara encuentra la consecuencia de los nueve inviernos vacíos. Una casa cuidada no se sigue del abandono; lo que se seguiría de él es justo lo que ella esperaba y no encontró. Es el camino de quien enlaza por causa dos hechos solo porque van seguidos en el párrafo.',
      B:
        'Es la trampa del ítem. La oración del hueco enumera tres cosas —puerta, estufa, mesa— con el mismo ritmo con que la anterior enumeraba otras tres —tejado, suelo, cocina—, y el paralelismo invita a sumar. Pero la primera lista es lo que Mara temía y la segunda lo que se encontró: la segunda no se añade a la primera, la sustituye.',
      C:
        'Correcta: la oración anterior dice para qué venía preparada Mara —tejado abierto al tiempo, suelo levantado por la helada, cocina tomada por los bichos— y la del hueco dice, punto por punto, lo que había en su lugar. «Instead» marca exactamente esa sustitución de una expectativa por un hallazgo, y el cierre lo confirma: alguien había estado cuidando la casa.',
      D:
        'Lee la segunda lista como ejemplos concretos de la primera, que es general. Para eso tendrían que ser casos de ruina, y una puerta que gira, un carbón seco y unas peras selladas bajo cera no ilustran un tejado abierto ni un suelo levantado: lo desmienten uno a uno.',
    },
    fuenteHecho:
      'Prosa narrativa original de registro literario, escrita para este ítem. Ni personaje, ni casa, ni obra de referencia: no hay fuente externa.',
  },
  {
    id: 'q27',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'Correcta: el texto ha puesto la afirmación de los traductores en cuarentena —«easy to state and hard to test»— y en el hueco la concede en su forma más fuerte para volverse contra ella dos oraciones después, con «The difficulty is that…». «To be sure» es esa concesión previa al giro. El cierre confirma la dirección: lo concedido se matiza, no se abandona.',
      B:
        'Invierte la flecha causal. Presenta la dependencia del momento de escritura como efecto de la costumbre de sustituir versiones, cuando el texto la ofrece como su razón: se sustituyen porque la frase del traductor pertenece a su momento. Es el camino de quien encadena por consecuencia dos oraciones que hablan de lo mismo sin comprobar cuál sostiene a cuál.',
      C:
        'Toma lo que sigue por un caso de lo anterior. No hay caso: la oración del hueco no nombra ninguna traducción ni ningún traductor concreto y es más general que la que la precede, porque dice qué le pasa a cualquier frase traducida. Es lo que elige quien ve una observación amplia seguida de otra y supone que la segunda ilustra a la primera.',
      D:
        'Suma la oración como una segunda observación paralela, porque también enfrenta traducción y original. El párrafo no está apilando observaciones: está concediendo terreno a la tesis que venía poniendo en duda, y en la oración siguiente le da la vuelta. Quien elige este conector no ve que el texto tiene un giro.',
    },
    fuenteHecho:
      'Lugar común real de la teoría de la traducción —las traducciones se rehacen cada generación y los originales no— discutido con argumentación propia. Ningún traductor, teórico, novela ni traducción reales; 1890 solo fecha un ejemplo inventado.',
  },
]
