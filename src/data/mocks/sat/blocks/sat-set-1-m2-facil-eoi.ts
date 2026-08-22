import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Expression of Ideas del módulo `sat-set-1-m2-facil` — ítems q23 a q27.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 23-27). Claves vigentes, que no se
 * negocian ítem a ítem: **D, A, D, C, B** (el plan asignaba B, A, B, C, A; ver «REPARTO DE
 * LETRAS» al final de este comentario). Dificultades 1, 2, 1, 2, 3 y temas humanidades,
 * historia, ciencia, literatura, humanidades. Todo el contenido es original (§5 del
 * blueprint); de College Board solo se reproducen los dos enunciados canónicos.
 *
 * ## rhetorical-synthesis (q23-q24): tercera versión, y con la regla del revés
 *
 * Las dos primeras versiones se escribieron con esta regla: «las cuatro opciones son
 * verdaderas según las notas, y lo único que separa a la clave es que cumple el objetivo
 * declarado». Las dos las acertaron **10 de 10 solucionadores sin ver las notas**. La
 * segunda ya traía las cuatro opciones en un molde único —las cuatro empezando por
 * «Because», la misma sintaxis, siete caracteres entre la más larga y la más corta— y **no
 * movió la cifra ni un punto**. La fuga no era de forma.
 *
 * Era de sentido, y está descrita en **R13** (blueprint §4 bis). En síntesis retórica el
 * objetivo viene escrito en el enunciado: «explain why some listeners cannot understand a
 * whistled message». Si las otras tres opciones son verdaderas pero contestan a otra
 * pregunta —una hablaba de un grito, otra de una escuela, otra del origen de la práctica—,
 * esa ajenidad **se ve sin las notas**: basta el enunciado para descartarlas. Diseñar «las
 * cuatro verdaderas, una sola relevante» produce ítems que se contestan sin leer.
 *
 * El diseño está ahora invertido:
 *
 * > **Las cuatro opciones son relevantes al objetivo. Solo las notas deciden cuál está
 * > sostenida.** Tres causas plausibles de exactamente lo que el enunciado pide, que las
 * > notas contradicen, y una que las notas afirman.
 *
 * Es la parte cara del tipo de ítem: obliga a que el cuaderno contenga, además del apoyo de
 * la clave, **un hecho que mate a cada distractor**. Sin ese hecho el ítem tendría dos
 * claves, que es la avería que R13 provoca si se aplica a medias.
 *
 * - **q23** — las cuatro explican por qué un oyente no entiende un mensaje silbado. **A**:
 *   la distancia lo desgasta; la nota 2 dice que una frase silbada se distingue a cinco
 *   kilómetros cruzando un valle o una cumbre. **C**: el silbo es un código de señales que
 *   hay que haber aprendido; la nota 1 dice que lleva las vocales y consonantes de las
 *   palabras y no es un código. **B**: se adquiere de niño junto con la lengua hablada y
 *   ya no después; la nota 6 dice que los adultos que se instalan allí siguen los mensajes
 *   silbados en una temporada. Solo **D** queda en pie, y la sostienen tres notas: la 3 (muchas palabras
 *   dan el mismo silbo), la 4 (lo ambiguo se resuelve por lo que el trabajo del día hace
 *   probable) y la 5 (silbadores de toda la vida perdieron las frases sobre asuntos de los
 *   que nadie silba).
 * - **q24** — las cuatro explican por qué el concejo revocó el voto de 1848. **B**: la
 *   compañía amenazó con parar solo donde se llevara su hora; la nota 2 dice que no pedía
 *   nada a los relojes de los pueblos ni hacía depender de ellos ninguna parada. **C**:
 *   entró un concejo nuevo; la nota 4 dice que los once elegidos en 1847 siguieron sin
 *   elección hasta 1853, y la 5 que quien revoca es «el mismo concejo». **D**: el telégrafo
 *   trajo la hora de la capital; la nota 6 lo fecha en 1858, siete años tarde. Solo **A**
 *   queda en pie, con la nota 5: las peticiones de los viajeros que llegaron al andén con
 *   el tren ya salido están en las actas de la sesión que revocó el voto.
 *
 * Los tres distractores de cada ítem son ahora **falsos dentro del cuaderno**, no
 * verdaderos-pero-ajenos. Por eso las dos situaciones son inventadas y llevan nombre propio
 * —los valles Ferrin, el pueblo de Brantwood—: una afirmación falsa sobre un lugar que no
 * existe no enseña ningún hecho falso del mundo, y las tres causas descartadas son cosas
 * que en la historia real ocurrieron en otros sitios (la compañía que aprieta, el concejo
 * que cambia, el telégrafo que reparte la hora).
 *
 * El molde único de la versión 2 se conserva —las ocho opciones empiezan por «Because» y
 * gastan dos elementos del cuaderno— porque no estorba: no bastaba, pero cierra la fuga
 * formal que R12 describe.
 *
 * ## transitions (q25-q27): lo que ve el panel a ciegas son cuatro conectores
 *
 * El examen a ciegas de `scripts/sat-blind-test.mjs` imprime el enunciado y las opciones sin
 * el texto. En un ítem de transiciones eso deja al solucionador **cuatro conectores y nada
 * más**, así que lo único que puede explotar es con qué frecuencia cada conector es la
 * respuesta en un examen real. **q25 lo acertaron 6 de 10** con la clave en «As a result,»,
 * que es la apuesta por defecto de cualquiera que haya visto exámenes: no había nada roto
 * en el texto, la clave estaba en el conector más adivinable del juego.
 *
 * Ahora «As a result,» es distractor y la clave es «In fact,». El párrafo se reescribió para
 * pedirla: la oración del hueco no es la consecuencia del mecanismo —esa ya está dicha en la
 * oración anterior, «carries the plant through a whole sunlit day»— sino la misma afirmación
 * llevada al extremo, de un día de sol a semanas de sequía. Los cuatro conectores siguen
 * siendo de **cuatro relaciones distintas** (ejemplo, precisión, consecuencia,
 * simultaneidad; regla 2 del plan) y cada uno tiene su camino real en el texto: «For
 * instance,» lo abre «some of these plants», «As a result,» el mecanismo descrito justo
 * antes y «Meanwhile,» el reloj del párrafo, que va del día a la noche y a la mañana
 * siguiente. El hueco precede a una oración independiente completa, así que los cuatro caben
 * sin romper la sintaxis y ninguno se poda por gramática.
 *
 * Efecto de conjunto que esto deja, y que se asume a conciencia: en los tres ítems de
 * transiciones del bloque **la clave nunca es el conector de consecuencia** —«As a result,»,
 * «Hence,» y «Consequently,» son los tres distractores—. Con tres ítems no es un
 * patrón explotable, y la alternativa, poner de clave el conector que se adivina, es
 * exactamente lo que filtraba.
 *
 * ### q26: la misma fuga, un piso más abajo (R14)
 *
 * Con q25 arreglado, **q26 se quedó en 7 de 10 a ciegas** y el juego era «Accordingly,» ·
 * «Moreover,» · «Instead,» · «For instance,». Tres relaciones de flujo —consecuencia,
 * adición, ejemplo, las tres que llevan un párrafo expositivo hacia delante— y **una sola de
 * giro**. Un solucionador que no ve el texto no necesita saber nada del texto: un ítem de
 * transiciones suele examinar el giro, así que apuesta al único que gira. Es la fuga de
 * frecuencia de **R14**, y aquí la marca no es de estilo sino de relación: «Instead,» no
 * llamaba por rara, llamaba por ser la única sustitución entre tres conectores de flujo.
 *
 * R14 dice también cuál es el arreglo que no vale: mover la clave a un conector corriente
 * deja la arquitectura «tres contra uno» en pie y la apuesta cae sobre un distractor. Así
 * que se arregló **el juego**, no la clave, y el reparto de relaciones pasó de 3+1 a **2+2**:
 *
 * - «Hence,» — consecuencia (flujo). Camino real: quien encadena por causa dos hechos porque
 *   van seguidos, y a quien el tono formal del conector se lo pone fácil.
 * - «On the contrary,» — refutación (giro). Es ahora **la opción más vistosa del juego** y es
 *   falsa: desmiente algo afirmado, y el texto no afirma nada sobre el estado de la casa,
 *   solo dice para qué venía preparada Mara —que vino preparada es verdad y nadie lo niega—.
 * - «Instead,» — sustitución (giro). La clave del plan, que no se mueve.
 * - «What is more,» — adición (flujo). Camino real: el paralelismo de las dos listas.
 *
 * Con dos giros en el juego, «apuesta al que gira» baja de 100 % a 50 %; y como el giro
 * vistoso es el falso, «apuesta al llamativo» pasa a valer 0. Para que los dos giros no se
 * cancelen entre sí —regla 2 del plan, dos sinónimos regalan el ítem— se separan por una
 * regla enseñable, no por matiz: **«on the contrary» contradice lo dicho; «instead» sustituye
 * lo esperado.** Y el texto se reescribió para que la sustitución sea término a término y en
 * el mismo orden —puerta, estufa, mesa, primero como Mara las temía y luego como estaban—,
 * que es lo que licencia «instead» y lo que deja sin apoyo a cualquier lectura concesiva o
 * refutativa. También se comprobaron dos pistas de forma: la clave no es ni la opción más
 * larga (16 caracteres «On the contrary,») ni la más corta (6, «Hence,»), y en q25 sí era la
 * más corta, así que «elige el conector más corto» deja de valer 2 de 3 en el bloque.
 *
 * ### q27: la fuga que q26 dejó anunciada, y que llegó donde se dijo
 *
 * Al entregar q26 este comentario dejó escrito que «q27 tiene hoy la arquitectura que q26 acaba
 * de perder; si la próxima ciega deja algo por encima del umbral en transiciones, es ahí donde va
 * a estar». Estaba. El juego era «Likewise,» · «To be sure,» · «For instance,» · «Consequently,»:
 * tres conectores de lista de manual y **uno solo raro**, y el raro era la clave. Es la fuga de
 * frecuencia de **R14** en su forma más pura —el marcado es el que parece la respuesta de una
 * pregunta de examen— y venía con la de q26 encima: tres relaciones de flujo (adición, ejemplo,
 * consecuencia) y **un solo giro**, que también era la clave. Las dos apuestas que un solucionador
 * sin texto puede formular sobre cuatro conectores señalaban la misma opción.
 *
 * R14 dice cuál es el arreglo que no vale, y aquí valía doble: mover la clave a un conector
 * corriente y de flujo deja las dos arquitecturas «tres contra uno» en pie y solo cambia de dueño
 * la apuesta. Se arregló **el juego**, como en q26, y en los dos ejes a la vez:
 *
 * - «Even so,» — giro, conector de prosa y no de lista. Sustituye a «Likewise,».
 * - «To be sure,» — concesión previa al giro. La clave del plan, que no se mueve.
 * - «For instance,» — ejemplo, conector de lista.
 * - «Consequently,» — consecuencia, conector de lista.
 *
 * Los dos ejes quedan **alineados a propósito**: los dos conectores de prosa son los dos giros y
 * los dos de lista son los dos de flujo. Alineados y no cruzados, porque cruzarlos deja la clave
 * como la única casilla «rara y de giro» a la vez, y esa conjunción de dos heurísticas vuelve a
 * identificarla. Así, «elige el raro» reparte 50/50, «elige el que gira» reparte el mismo 50/50 y
 * las dos juntas no añaden nada.
 *
 * Para que los dos giros no se cancelen entre sí —regla 2 del plan— se separan por una regla
 * enseñable y no por matiz: **«to be sure» concede lo que se va a matizar después; «even so»
 * es ya el matiz, y se apoya en una oposición que tiene delante.** En este párrafo el giro existe
 * pero llega dos oraciones más tarde, con «The difficulty is that…», así que quien lo adelanta al
 * hueco elige «Even so,».
 *
 * **Lo que hubo que tocar del texto, y por qué no bastaba con las opciones.** La segunda oración
 * decía «The claim is easy to state and hard to test», y esa duda previa era una oposición
 * disponible: con ella delante, «Even so,» se podía defender como «pese a que no se puede
 * comprobar, …», y el ítem tenía dos claves. Se sustituyó por «and the practice of publishers
 * bears them out», que va en la misma dirección que el resto del párrafo. La concesión de «To be
 * sure,» no la licenciaba aquella duda sino el giro del final, que sigue en su sitio.
 *
 * Comprobaciones de forma sobre el juego nuevo: la clave (11 caracteres) no es ni la más larga
 * (13) ni la más corta (8), de modo que «elige el conector más corto» sigue valiendo 1 de 3 en el
 * bloque y no 2 de 3. Y se mantiene lo que ya decía este comentario: **la clave nunca es el
 * conector de consecuencia** en los tres ítems de transiciones —«As a result,», «Hence,» y
 * «Consequently,» son los tres distractores—.
 *
 * Puertas medidas sobre el bloque después de rehacerlo, no heredadas de la versión anterior:
 *
 * - **7 longitud**: 144,3 · 146,2 · 124,7 · 83,5 · 125,7 palabras-SAT. Las cinco dentro de
 *   25-150. q23 y q24 crecieron: cada distractor necesita ahora en el cuaderno el hecho que
 *   lo desmiente, y q27 subió de 125,3 al cambiar la segunda mitad de su primera oración.
 * - **2 longitud de la clave**: la clave no es la opción más larga en ninguno de los cinco.
 *   En q23 y q24 tampoco es la más corta (q23: 157 · 150 · 149 · 155 caracteres; q24: 165 ·
 *   168 · 163 · 167).
 * - **3 solape léxico**: en q23 la clave repite 8 palabras del texto contra 9, 5 y 5 de los
 *   distractores, y en q24 repite 11 contra 11, 10 y 12: en los dos queda estrictamente por
 *   debajo del máximo y por encima del mínimo, así que no cuenta por ninguna de las dos
 *   caras de la puerta. En los tres de transiciones el solape es 0 en las cuatro opciones.
 * - **12 variedad temática**: humanidades ×2, historia, ciencia y literatura, uno cada uno.
 *
 * Lo que este bloque **no** trae: q23, q24, q25, q26 y q27 son ítems nuevos por R2 —los cinco
 * cambiaron el texto y no solo las opciones—, así que vuelven enteros a la cola de auditoría y la prueba a
 * ciegas hay que repetirla sobre ellos. El módulo todavía no tiene acta en
 * `docs/sat-auditorias/`, de modo que no hay ninguna huella firmada que estos cambios dejen
 * caducada.
 *
 * ## REPARTO DE LETRAS POR BLOQUE (21 ago 2026) — permutación pura, sin contenido nuevo
 *
 * El auditor de sesgo de conjunto midió el módulo entero y lo encontró bien repartido
 * (A7 B7 C7 D6) y apilado dentro de cada bloque: aquí no había ni una D en cinco ítems, y
 * en el bloque de lectura ninguna en ocho. Un estudiante que cuente letras sube del 25 %
 * al 33 % sin leer, que es exactamente la avería que en otro producto dejó cinco series
 * publicadas con la clave en A el 100 % de las veces —invisible ítem a ítem, evidente
 * contando—. Se movieron de sitio tres claves de este bloque: **q23 B → D**, **q25 B → D**
 * y **q27 A → B**. Reparto resultante: **A ×1, B ×1, C ×1, D ×2**.
 *
 * Lo que se hizo en los tres es reordenar las cuatro opciones y arrastrar con cada una su
 * razón de distractor; ni una opción se reescribió, ni una razón cambió de opción. Cómo
 * quedó cada permutación y por qué esa y no otra:
 *
 * - **q23** — se intercambian B y D. La clave (155 caracteres) queda entre la más larga
 *   (157, A) y la más corta (149, C), y su solape con las notas sigue por debajo del máximo
 *   y por encima del mínimo: la permutación no toca ninguna de las dos puertas.
 * - **q25** — se intercambian B y D, así que el juego queda «For instance,» · «Meanwhile,» ·
 *   «As a result,» · «In fact,». La clave sigue siendo la opción más corta del ítem, y eso
 *   una permutación no lo arregla: es la longitud de la palabra, no su posición. Sigue
 *   valiendo lo que ya decía este comentario —«elige el conector más corto» acierta 1 de 3
 *   en el bloque, no 2 de 3—.
 * - **q27** — ciclo de tres: «Likewise,» pasa a A, la clave «To be sure,» a B y
 *   «Consequently,» a D. Se descartó el intercambio simple A↔B porque dejaba el conector de
 *   consecuencia en A en dos de los tres ítems de transiciones (con «Hence,» en q26). Así
 *   los tres consecutivos caen en posiciones distintas —q25 C, q26 A, q27 D— y las tres
 *   claves de transiciones también: **D, C, B**.
 *
 *   **Posterior a esta permutación**, y sin tocar ninguna letra: «Likewise,» dejó de ser una de
 *   las cuatro opciones —lo sustituye «Even so,» en la misma A— por la fuga de frecuencia que
 *   describe la sección «q27» de más arriba. Todo lo que este párrafo dice sobre posiciones sigue
 *   vigente; lo que caduca es la comprobación de longitud, que ahora se lee así: la clave (11
 *   caracteres) no es ni la más larga (13) ni la más corta (8).
 *
 * Aquel desajuste ya está cerrado: `docs/sat-planes/sat-set-1-m2-facil.md` decía B, A, B, C, A
 * y hoy dice **D, A, D, C, B**, que es lo que hay en este array. Se copió del código al plan y
 * no al revés, que es el orden que manda: el reparto de claves se defiende a nivel de módulo.
 * Lo que sigue en pie es la regla de siempre —si un ítem «pide» otra letra se mueve el ítem, no
 * el reparto—, y por eso la sustitución de «Likewise,» por «Even so,» en q27 no tocó ni una
 * letra: la clave siguió en B.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q23',
    type: 'mcq',
    part: 1,
    stimulus:
      "While researching a topic, a student has taken the following notes:\n\n• In the Ferrin valleys herders whistle the words of the language everyone there speaks; the whistle carries their vowels and consonants, not a code of fixed signals.\n• A whistled sentence is made out five kilometers off, across a valley or over a ridge; a shout fades in a few hundred meters.\n• Whistling keeps fewer distinctions than the voice: many words come out as the same whistle.\n• Herders settle an unclear whistle by what the day's work makes likely: a strayed animal, a change of pasture, someone coming up the track.\n• In a test there, herders who had whistled all their lives missed sentences about matters nobody whistles about, though every word was ordinary.\n• Children take whistling at school half an hour a week; adults who settle there follow whistled messages within a season.",
    text: 'The student wants to explain why some listeners cannot understand a whistled message. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'Because a whistled sentence has to cross a whole valley or a ridge to arrive, a listener five kilometers off makes nothing of a whistle worn thin on the way.',
      'Because whistling is acquired in childhood with the spoken language, a listener who came to the valleys as an adult makes nothing of what is whistled.',
      'Because a whistled message keeps the melody of a sentence and not its words, a listener makes nothing of it without having learned the signal for it.',
      "Because many words of the language sound alike once whistled, a listener makes nothing of a message about matters that the day's work does not make likely.",
    ],
    answer: 3,
  },
  {
    id: 'q24',
    type: 'mcq',
    part: 1,
    stimulus:
      "While researching a topic, a student has taken the following notes:\n\n• Until the 1840s every town set its clocks by local noon; towns forty kilometers apart differed by minutes.\n• The railway company printed one timetable for the whole line and kept the capital's time at every station; it asked nothing of the towns' clocks and made no stop depend on them.\n• Station clocks in six towns were given a second minute hand, so local and railway time could be read at once.\n• In 1848 the council of Brantwood voted to keep local time on the town's clocks; the eleven men elected in 1847 sat on with no new election until 1853.\n• In 1851 the same council reversed the vote; its minutes record dozens of petitions from travelers who had reached the platform after their train had left.\n• The telegraph reached the district in 1858; the newspapers stopped printing local time in 1855.",
    text: 'The student wants to explain why the council of Brantwood reversed its 1848 vote. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: [
      'Because travelers from the town were reaching the platform to find their train already gone, the council gave up in 1851 the local time it had voted to keep in 1848.',
      'Because the railway company had warned that its trains would stop only where its own time was kept, the council gave up in 1851 the local time it had voted for in 1848.',
      'Because the men who carried the 1848 vote lost their seats to new members at the polls, the council that sat in 1851 gave up the local time those men had defended.',
      "Because a telegraph line had begun to bring the capital's time into the district each morning, the council gave up in 1851 the local time it had voted to keep in 1848.",
    ],
    answer: 0,
  },
  {
    id: 'q25',
    type: 'mcq',
    part: 1,
    stimulus:
      'Most plants open the pores of their leaves by day, when sunlight drives photosynthesis, and every hour those pores stay open the leaf loses water. In a desert at midday the air pulls water out of a leaf faster than the roots can replace it, so many desert plants keep their pores shut through the heat and open them after dark, when the air is cool and still. The carbon dioxide taken in at night is stored in the leaf and spent the next morning behind closed pores, which carries the plant through a whole sunlit day without opening its leaves to the dry air. ______ the same machinery carries some of these plants through weeks of drought, when the roots find nothing to take up and the leaf works again and again on the carbon already inside it.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'For instance,',
      'Meanwhile,',
      'As a result,',
      'In fact,',
    ],
    answer: 3,
  },
  {
    id: 'q26',
    type: 'mcq',
    part: 1,
    stimulus:
      'The house had stood empty for nine winters, and the track up to it had gone back to grass. Mara had come prepared for the worst of it: a door swollen shut in its frame, a stove packed with nine years of cold ash, a table buried under fallen plaster. ______ the door swung when she pushed it, the stove still held a scoop of dry coal, and on the table stood a jar of pears sealed under wax. She waited in the doorway a long while before she went in, listening to a house that somebody had been keeping.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'Hence,',
      'On the contrary,',
      'Instead,',
      'What is more,',
    ],
    answer: 2,
  },
  {
    id: 'q27',
    type: 'mcq',
    part: 1,
    stimulus:
      'Translators often say that a translation ages faster than the book it translates, and the practice of publishers bears them out. A novel published in 1890 goes on being read in the language it was written in, while the versions made of it elsewhere are replaced every generation or two, and the replacement is justified by saying that the old version now sounds dated. ______ the sentence a translator writes belongs to the moment of its writing in a way the original does not: it answers a question about how a foreign book should sound in this language now, and every generation asks that question again. The difficulty is that originals sound dated too, and readers forgive them for it. What ages may be less the translation than our patience with it.',
    text: 'Which choice completes the text with the most logical transition?',
    options: [
      'Even so,',
      'To be sure,',
      'For instance,',
      'Consequently,',
    ],
    answer: 1,
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
        'Falsa por la nota 2: una frase silbada se distingue a cinco kilómetros, cruzando un valle o pasando una cumbre, y lo que se apaga en unos cientos de metros es el grito. Explica exactamente lo que pide el enunciado —por qué un oyente no saca nada de un mensaje silbado— pero apoyada en un hecho que el cuaderno niega. Es el camino de quien busca el obstáculo en la distancia, que es el único dato de las notas con forma de cifra, y confunde no oír con no entender.',
      B:
        'Falsa por la nota 6: el silbo se da en la escuela media hora a la semana, y los adultos que se instalan en los valles siguen los mensajes silbados en una temporada. Es el camino de quien traslada al silbo el período crítico de la adquisición de lenguas: suena a explicación experta, que es justo lo que la hace peligrosa, y el cuaderno la desmiente en la misma nota que habla de la escuela.',
      C:
        'Falsa por la nota 1: el silbo lleva las vocales y consonantes de las palabras y no es un código de señales fijas, de modo que no hay una señal aprendida para cada mensaje. Es la idea popular del silbo como morse de montaña, y por eso es la trampa del ítem: suena a explicación completa y no la sostiene ninguna nota. Quien la marca ha dado por supuesto justo lo que la primera nota corrige.',
      D:
        'Correcta: es la única de las cuatro causas que las notas afirman. Muchas palabras salen como el mismo silbo (nota 3), así que el oyente completa lo que falta con lo que el trabajo del día hace probable (nota 4); por eso, en la prueba de la nota 5, silbadores de toda la vida perdieron las frases sobre asuntos de los que nadie silba, aunque cada palabra fuera corriente. Las otras tres explican lo mismo por causas que el cuaderno desmiente una a una.',
    },
    fuenteHecho:
      'Hecho libre de lingüística: el habla silbada reproduce las vocales y consonantes de una lengua hablada —no es un código de señales—, se distingue a varios kilómetros y depende del contexto, porque muchas palabras dan el mismo silbo y el oyente las resuelve por lo previsible del mensaje. Donde se enseña en la escuela lo hace como asignatura obligatoria de media hora semanal. Los valles Ferrin, la prueba de la nota 5 y las cifras son inventados: así los tres distractores afirman cosas falsas sobre un lugar que no existe y ninguno enseña un hecho falso del mundo.',
  },
  {
    id: 'q24',
    domain: 'EOI',
    tipo: 'rhetorical-synthesis',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Correcta: es la única causa que el cuaderno sitúa entre los dos votos. Las actas de la sesión de 1851 recogen decenas de peticiones de viajeros que llegaron al andén con el tren ya salido (nota 5): la presión existe, es anterior a la revocación y sale del propio pueblo. Las otras tres son motivos igual de razonables para que un concejo se desdiga, y las notas los desmienten uno a uno.',
      B:
        'Falsa por la nota 2: la compañía imprimía un solo horario con la hora de la capital, no pedía nada a los relojes de los pueblos y no hacía depender de ellos ninguna parada. Es el motivo que primero se le ocurre a cualquiera —el fuerte aprieta al débil— y por eso se lleva los votos de quien razona con el mundo en lugar de con el cuaderno. En las notas no hay ninguna amenaza de la compañía.',
      C:
        'Falsa por las notas 4 y 5: los once hombres elegidos en 1847 siguieron en el cargo sin elección nueva hasta 1853, y quien revoca en 1851 es «el mismo concejo». Es el camino de quien explica un cambio de voto por un cambio de votantes, que es como se deshacen la mayoría de los acuerdos municipales. Aquí no cambió nadie: cambiaron de opinión los mismos once.',
      D:
        'Falsa por la nota 6: el telégrafo llegó al distrito en 1858, siete años después de la revocación. Es el camino de quien sabe cómo acabó la historia de la hora única —señal horaria repartida por telégrafo— y la adelanta hasta la fecha que le hace falta. Con las notas delante, para descartarla basta mirar el año, y el año la descarta solo.',
    },
    fuenteHecho:
      'Patrón histórico libre: hora local por mediodía solar en cada población, horarios de ferrocarril impuestos desde una sola ciudad, relojes de estación con doble aguja durante la transición y señal horaria por telégrafo, que en la vida real llegó más tarde. Brantwood, el distrito, las fechas y las cifras son inventados. Los tres distractores atribuyen a ese pueblo inventado motivos que en otros sitios sí se dieron —la presión de la compañía, el relevo del concejo, el telégrafo—, de modo que ninguno enseña un hecho falso.',
  },
  {
    id: 'q25',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 1,
    tema: 'ciencia',
    razones: {
      A:
        'Lee la oración del hueco como un ejemplo de la anterior, y «some of these plants» invita a ello. Pero un ejemplo tendría que ser un caso de lo que se acaba de afirmar —una planta pasando un día de sol con los poros cerrados— y lo que la oración describe va más allá: semanas sin nada que absorber y el mismo carbono aprovechado una y otra vez dentro de la hoja. Es el camino de quien ve un cuantificador y oye «por ejemplo».',
      B:
        'Sigue el reloj del texto en vez de su argumento: hay día, hay noche y hay «the next morning», y de ahí a leer el cierre como algo que ocurre a la vez hay un paso. Pero en el hueco no hay dos procesos simultáneos ni dos sujetos: son las mismas plantas y la misma maquinaria, medidas en semanas en lugar de en un día.',
      C:
        'Encadena por consecuencia dos oraciones que dicen lo mismo con distinta intensidad. Aguantar semanas de sequía no se sigue de aguantar un día de sol: es la misma capacidad enunciada en su límite. Y la consecuencia del mecanismo ya está dicha en la oración anterior —«carries the plant through a whole sunlit day»—, así que ponerla otra vez en el hueco repite el eslabón. Es lo que elige quien encuentra un mecanismo descrito y da por hecho que el final del párrafo es su efecto; es, con diferencia, la apuesta segura del que no lee.',
      D:
        'Correcta: la oración del hueco dice lo mismo que la anterior, llevado al extremo. La anterior afirma que el mecanismo saca a la planta de un día entero de sol; la del hueco, que a algunas las saca de semanas de sequía. Mismo sujeto, misma maquinaria, misma dirección y más fuerza: eso es lo que marca «In fact». El párrafo no cambia de relación al cerrar, sube la apuesta.',
    },
    fuenteHecho:
      'Hecho libre de fisiología vegetal: apertura estomática nocturna, fijación del CO2 en la hoja hasta la mañana siguiente y, en sequía prolongada, ciclo cerrado con los poros sin abrir y el carbono respirado reaprovechado dentro de la hoja. Sin especie, desierto ni estudio concretos.',
  },
  {
    id: 'q26',
    domain: 'EOI',
    tipo: 'transitions',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A:
        'Hace de lo que Mara encuentra la consecuencia de los nueve inviernos vacíos: la casa lleva tanto tiempo sola que —de ahí— la puerta gira y el carbón sigue seco. Una casa cuidada no se sigue del abandono; del abandono se seguiría justo lo que ella traía en la cabeza y no estaba. Es el camino de quien enlaza por causa dos hechos solo porque van seguidos en el párrafo, y el tono formal del conector se lo pone fácil.',
      B:
        'Es la trampa del ítem y la opción más vistosa de las cuatro: también marca un giro, de modo que quien busque «el conector que da la vuelta» tiene aquí dos donde elegir y no le sirve de nada. «On the contrary» desmiente algo que se acaba de afirmar, y pide que lo afirmado sea negativo: «la casa no estaba en ruinas; on the contrary, …». El texto no afirma nada sobre el estado de la casa; afirma que Mara vino preparada para lo peor, y eso la oración del hueco no lo desmiente, porque preparada vino. Lo que falla no es lo dicho, es lo esperado, y una expectativa no se contradice: se sustituye.',
      C:
        'Correcta: la oración anterior enumera para qué venía preparada Mara —una puerta hinchada en el marco, una estufa con nueve años de ceniza fría, una mesa sepultada bajo el yeso caído— y la del hueco pone, término a término y en el mismo orden, lo que había en su lugar: la puerta gira al empujarla, la estufa guarda una palada de carbón seco, sobre la mesa hay peras selladas bajo cera. «Instead» marca esa sustitución de lo esperado por lo encontrado, y el cierre lo confirma: alguien había estado cuidando la casa.',
      D:
        'Suma la segunda lista a la primera, y el paralelismo invita a ello: tres cosas —puerta, estufa, mesa— con el mismo ritmo y en el mismo orden que la anterior. Pero la segunda no se añade a la primera, la reemplaza objeto por objeto: no hay dos puertas ni dos estufas, hay una que Mara esperaba encontrar de un modo y encontró del contrario. Es el camino de quien sigue el ritmo del párrafo sin comprobar qué dice cada elemento y da por hecho que el inventario de la casa sigue creciendo.',
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
        'Pone el giro del párrafo una oración antes de donde está. «Even so» mantiene lo dicho **a pesar** de lo que se acaba de decir, y para eso necesita una oposición: aquí la oración del hueco no se opone a la anterior, la explica —las versiones se sustituyen porque la frase del traductor pertenece a su momento—. El giro de este texto existe, pero llega dos oraciones más tarde, con «The difficulty is that…». Es el camino de quien reconoce que el párrafo va a girar y coloca el conector adversativo en el primer hueco que encuentra, sin comprobar qué contradice a qué. Es además la trampa del ítem: comparte con la clave el ser un conector de giro y no de flujo, de modo que «elige el que da la vuelta» deja aquí dos opciones y no sirve de nada.',
      B:
        'Correcta: en el hueco el texto concede la tesis de los traductores en su forma más fuerte —la frase del traductor pertenece al momento en que se escribió como no le pasa al original— para volverse contra ella dos oraciones después, con «The difficulty is that…». «To be sure» es exactamente esa concesión previa al giro: admite el punto que se va a matizar, no lo matiza todavía. El cierre confirma la dirección: lo concedido se matiza, no se abandona.',
      C:
        'Toma lo que sigue por un caso de lo anterior. No hay caso: la oración del hueco no nombra ninguna traducción ni ningún traductor concreto y es más general que la que la precede, porque dice qué le pasa a cualquier frase traducida. Es lo que elige quien ve una observación amplia seguida de otra y supone que la segunda ilustra a la primera.',
      D:
        'Invierte la flecha causal. Presenta la dependencia del momento de escritura como efecto de la costumbre de sustituir versiones, cuando el texto la ofrece como su razón: se sustituyen porque la frase del traductor pertenece a su momento. Es el camino de quien encadena por consecuencia dos oraciones que hablan de lo mismo sin comprobar cuál sostiene a cuál.',
    },
    fuenteHecho:
      'Lugar común real de la teoría de la traducción —las traducciones se rehacen cada generación y los originales no— discutido con argumentación propia. Ningún traductor, teórico, novela ni traducción reales; 1890 solo fecha un ejemplo inventado. La segunda mitad de la primera oración —«and the practice of publishers bears them out»— sustituye a «The claim is easy to state and hard to test» y describe la misma costumbre editorial que el párrafo ya explicaba, sin atribuirla a ninguna casa ni a ningún país: no añade ningún hecho que haya que sostener con una fuente. El motivo del cambio no es de contenido sino de clave única, y está en la sección «q27» de la cabecera.',
  },
]
