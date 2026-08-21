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
 *   cuatro opciones se diseñaron antes de decidir cuál lo cumplía (R8) y comparten molde:
 *   en q23 las cuatro son afirmaciones sobre lo que el silbo hace o exige, y en q24 las
 *   cuatro llevan cláusula causal o final («having received», «Because», «since», «So
 *   that»), de modo que ninguna es la única con forma de explicación (R5). En q24, además,
 *   dos opciones nombran la revocación de 1851 —la clave y su rival más cercana—, para que
 *   el objetivo no señale a una sola sin leer las notas.
 *
 * - **transitions** (q25-q27). Los cuatro conectores pertenecen a **cuatro relaciones
 *   distintas** —ejemplo, consecuencia, contraste, concesión, adición—, nunca dos de la
 *   misma familia: dos sinónimos se cancelan y el ítem se resuelve por descarte sin leer
 *   (regla 2 del plan). El hueco precede siempre a una oración independiente completa, así
 *   que los cuatro caben sin romper la sintaxis y ninguno se poda por gramática.
 *
 * Puertas medidas sobre el bloque antes de entregarlo:
 *
 * - **7 longitud**: 114,5 · 128,3 · 100,2 · 83,0 · 125,3 palabras-SAT. Las cinco dentro de
 *   25-150.
 * - **2 longitud de la clave**: la clave no es la opción más larga en ninguno de los cinco.
 * - **3 solape léxico**: en q23 la clave repite 11 palabras del texto contra 13, 9 y 9 de
 *   los distractores, y en q24 repite 13 contra 15, 11 y 11: en los dos queda estrictamente
 *   entre el máximo y el mínimo, así que ninguno cuenta para ninguna de las dos caras de la
 *   puerta. En los tres de transiciones el solape es 0 en las cuatro opciones. La clave de
 *   q24 llegó al 13 a propósito —decía «reversed the vote» y ahora «reversed its 1848 vote
 *   on local time»—: con la redacción anterior empataba en el mínimo y el ítem premiaba
 *   descartar lo que más se parece a las notas.
 * - **12 variedad temática**: humanidades ×2, historia, ciencia y literatura, uno cada uno.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q23',
    type: 'mcq',
    part: 1,
    stimulus:
      "While researching a topic, a student has taken the following notes:\n\n• Whistled speech carries an ordinary spoken language across a valley: the whistler whistles the words of a sentence.\n• It is not a code of its own. Whistlers reproduce the vowels and consonants of words they already speak.\n• Herders in several mountain regions arrived at the practice independently of one another.\n• A whistled phrase can be made out five kilometers away; a shout fades within a few hundred meters.\n• A listener who does not speak the underlying language hears whistling and understands none of it.\n• In one valley a school now teaches whistled speech for as many hours a week as the spoken language.",
    text: 'The student wants to explain why some listeners cannot understand a whistled message. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'Whistled speech reaches listeners a shout cannot reach: a whistled phrase can be made out five kilometers away, a shouted one within a few hundred meters.',
      'Whistlers reproduce the vowels and consonants of ordinary words instead of using a code of their own, so a listener must already speak the language.',
      'In one valley a school now devotes as many hours a week to whistled speech as it devotes to the spoken language the children grew up with.',
      'Herders in several mountain regions arrived at whistled speech on their own, without borrowing the practice from the herders of any other range.',
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
      'In 1851 the council reversed its 1848 vote on local time, after dozens of petitions from travelers who had reached the platform with their train already gone.',
      "Because the railway ran the whole line by the capital's time, the town's public clocks disagreed with the station's from 1848 until the vote was reversed.",
      'Until the 1840s the towns of the district differed from one another by several minutes, since each of them read its clocks off its own local noon.',
      'So that both local time and railway time could be read at once, the station clocks of six towns in the district were fitted with a second minute hand of their own.',
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
      'Nevertheless,',
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
        'Cierta (nota 4) y contesta otra pregunta. Dice hasta dónde llega el sonido, no por qué quien lo recibe se queda sin entenderlo: según la nota 5, el que no habla la lengua de debajo no entiende nada aunque esté al lado del silbador. Es el camino de quien confunde oír con entender y busca en las notas el único obstáculo con forma de cifra.',
      B:
        'Correcta: junta las dos notas que responden a la pregunta. Como el silbo no es un código aparte sino los vocales y consonantes de palabras corrientes (nota 2), entenderlo es entender la lengua; por eso el oyente que no la habla solo oye silbidos (nota 5). Es la única opción que dice qué le falta al que no entiende.',
      C:
        'Cierta (nota 6) y desviada al aula. Es lo que elige quien da por hecho que lo que no se entiende es lo que no se ha estudiado, y toma la escuela del valle por la condición de acceso. Las notas apuntan a lo contrario: debajo del silbo está la lengua que el oyente ya habla o no habla, no una asignatura que haya que cursar.',
      D:
        'Cierta (nota 3) y explica una incomprensión que las notas no registran. Es el camino de quien lee «independently» y concluye que cada montaña silba una cosa distinta, de manera que unos silbadores no se entenderían con otros. Las notas no comparan regiones entre sí: el único oyente que se queda fuera (nota 5) es el que no habla la lengua hablada.',
    },
    fuenteHecho:
      'Hecho libre de lingüística: el habla silbada reproduce la fonética de una lengua hablada, se ha desarrollado de forma independiente en varias zonas de montaña y alcanza varios kilómetros. Redacción original; sin nombrar ninguna lengua, valle ni comunidad reales.',
  },
  {
    id: 'q24',
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Correcta: la nota 5 pone la razón junto al cambio de voto —en 1851 el mismo concejo revoca el acuerdo y sus actas recogen decenas de peticiones de viajeros que llegaron al andén con el tren ya salido—. Es la única opción que enlaza la revocación con algo que la precede y que cambió entre 1848 y 1851. Las otras tres son verdaderas y explican otra cosa.',
      B:
        'Cierta y con forma de causa, pero explica el desacuerdo, no el cambio. Que el ferrocarril llevara toda la línea con la hora de la capital (nota 2) es lo que hizo que los relojes del pueblo y los de la estación marcaran cosas distintas; eso era igual el día del primer voto y el día de la revocación, así que no puede ser lo que movió al concejo. Es el camino de quien contesta por qué había dos horas en vez de por qué se abandonó una.',
      C:
        'Cierta (nota 1) y remonta demasiado atrás. Explica el origen del asunto entero —cada pueblo ponía sus relojes por su mediodía y de ahí los minutos de diferencia entre pueblos—, que es la pregunta general de la que este ítem no habla. Quien la elige contesta por qué hacía falta unificar la hora, no por qué este concejo cedió tres años después de haberse negado.',
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
        'Marca lo que sigue como algo que ocurre pese al mecanismo descrito, y para eso los poros cerrados tendrían que ser un obstáculo. El texto dice lo contrario: cerrarlos de día es justamente lo que permite trabajar sin perder agua. Es el error de quien asocia «poros cerrados» con «planta impedida» y necesita un «aun así» para lo que viene.',
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
