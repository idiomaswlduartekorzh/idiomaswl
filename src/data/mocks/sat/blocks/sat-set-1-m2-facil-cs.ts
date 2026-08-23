import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Craft and Structure del módulo `sat-set-1-m2-facil` — ocho ítems, q01 a q08.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 1-8). Textos originales de WeLearn;
 * ni un pasaje ni una pregunta salen de material de College Board (blueprint §5).
 *
 * ⚠️ **El array NO va en orden de id.** El orden de pantalla es
 * `q02 · q03 · q04 · q01 · q07 · q06 · q05 · q08`, y **cada id viaja con su contenido**: el
 * ítem llamado `q01` es el cuarto que ve el estudiante. El id es un nombre, no una posición
 * —el guardián lo admite así desde que su puerta `ids` pasó a comprobar formato y unicidad
 * en vez de «id == posición»—, y ese nombre está en el plan, en el acta y en once informes
 * de auditoría: renumerar movería cada nombre a otra pregunta, que es justo el daño que la
 * puerta existía para evitar.
 *
 * **Claves, las del plan, y no se negocian ítem a ítem:** q01 B · q02 C · q03 D · q04 A ·
 * q05 B · q06 C · q07 A · q08 D. En pantalla salen **C · D · A · B · A · C · B · D**:
 * reparto A×2 B×2 C×2 D×2, sin tres letras iguales seguidas ni dentro del bloque ni en la
 * costura con el bloque siguiente, que abre en B. Mover una sola clave aquí rompe la puerta
 * 1 en el otro extremo del examen, donde ya nadie la va a mirar.
 *
 * **Dificultad declarada**, medida con los cinco ejes del calibrador y no puesta a ojo:
 * **1 · 1 · 1 · 1 | 3 · 3 · 3 | 3** en el orden de pantalla, no decreciente dentro de cada
 * grupo de tipo, que es lo que mira la puerta 9 (compara con `<`: el empate pasa). Las
 * etiquetas de `q02`, `q03` y `q01` dejan de ser una declaración y pasan a ser la medida:
 * los tres suman **7** en los cinco ejes, banda fácil (5-7). Ver «DUODÉCIMA PASADA» al
 * final de esta cabecera.
 *
 * Los cuatro `words-in-context` llevan el enunciado del SAT digital —«Which choice completes
 * the text with the most logical and precise word or phrase?»— con el hueco marcado en el
 * texto. «As used in the text… most nearly mean?» es del SAT de papel y aquí no aparece
 * (plan, tabla de enunciados).
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * LO QUE NO SE PUEDE TOCAR
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * Cada línea de aquí abajo es una frase, un molde o un cruce de opciones que sostiene la
 * clave única de un ítem o el trabajo contra la prueba a ciegas. Todas parecen relleno de
 * estilo y ninguna lo es: quien recorte una, deja el ítem con dos respuestas o lo devuelve a
 * ser adivinable sin leer. **Quien tenga que acortar un texto, que empiece por otra frase.**
 *
 * **Regla que gobierna cualquier bajada de nivel.** El margen está en **T** (complejidad del
 * pasaje) y en **L** (cuántas partes del texto hay que cruzar): partir oraciones largas,
 * hacer explícitos los referentes, glosar el término opaco de la entrada. **Las opciones y
 * sus razones no se tocan:** ahí vive lo que costó siete vueltas de panel, y aflojarlas
 * reabre las fugas. Corolario que dejó la undécima versión: **un ítem fácil se escribe fácil
 * desde el pasaje**; ablandar uno ya endurecido no funciona, y aflojarle las opciones
 * deshace el trabajo.
 *
 * **q01 · los tránsitos (clave B, `obscures`).**
 * - «unchanged in depth» — sin ella, `reverses` y `amplifies` se defienden.
 * - «dimming it by as much or more» (razones A y D) y «on a schedule of their own» (razón C).
 * - **La oración del hueco no se parte**, por larga que sea (36 palabras): la razón de la
 *   clave está escrita como «lo dice por partes» y cita sus dos mitades.
 * - Longitudes 8 · 8 · 8 · 9 con la clave en 8: ni la más larga ni la más corta en solitario.
 *   `masks`, de 5, fue el caso que obligó a añadir la cara corta a la puerta 2.
 * - «That crossing is called a transit» — glosa del único término opaco del pasaje, que
 *   antes solo aparecía dentro de la oración del hueco. Es el eje T del ítem; quitarla se lo
 *   devuelve.
 *
 * **q02 · la abuela (clave C, `automatic`).**
 * - Las tres conductas van **en una sola oración, la inmediatamente posterior al hueco**, y
 *   la razón de la clave las cita literales: «heard half the answer», «asked the next as if
 *   I had finished» y «twice she came back to a question I had already answered». No se
 *   reparten en dos oraciones: ahí vive el eje L y es lo que bajó el ítem a 7.
 * - El cierre «All the while her eyes went to the window» tiene que ser **la última frase**
 *   del pasaje, porque así lo describe la razón de C.
 * - El texto ya **no** sostiene `hurried` —«started the next before I had finished» se
 *   cambió a propósito—. Quien lo reponga, resucita una segunda clave.
 *
 * **q03 · la capilla de Aldrec (clave D, `equipment`).**
 * - **La oración del hueco decide sola**: «For them, a white wall repainted every spring to
 *   steer by is a piece of ______» lleva dentro el mantenimiento periódico y el uso
 *   declarado, que son las dos cosas que definen la clave. Es el eje L del ítem: quien la
 *   devuelva a «For them it is a piece of ______» le sube un punto.
 * - Las **tres** oraciones que cita la razón de D son las tres inmediatamente anteriores al
 *   hueco, y en ese orden: «Two fishermen repaint the seaward wall every spring» / «Coming
 *   home, a boat lines that wall up with the pier and steers in on that line» / «The men who
 *   fish here keep the paint fresh for that line». Nada se intercala entre ellas y el hueco.
 * - «for that line» — ata el mantenimiento al uso. Sin ella, la pintura anual vuelve a
 *   leerse como aseo o como cuidado de lo propio y `scenery` y `property` se defienden.
 * - Un anclaje por distractora: `history` ← la viuda de 1712, y cae por «None of them could
 *   tell you the widow's name», que va pegada a ella; `property` ← quién lo cuida;
 *   `scenery` ← «the white shows up far out».
 *
 * **q04 · el monte de la abadía (clave A, `license`).**
 * - «for the right to cut» — impide leer el cobro como multa o como precio de la madera, que
 *   es lo único que separa la clave de una segunda lectura.
 * - Anclajes: `prohibit` ← «cutting a standing tree was theft»; `register` ← «counted them,
 *   wrote down the number»; `ignore` ← «went to no court». La clave la cierran «four coins a
 *   year» y «collected with the rent, like any other due»: periódico y ordinario.
 *
 * **q05 · los flotadores (clave B).**
 * - **Las cuatro opciones comparten dos tercios —221-229 caracteres— y solo se distinguen
 *   por el cierre: ese molde ES el arreglo que cerró su fuga.** No se acorta, no se iguala
 *   más y no se reparte de otro modo.
 * - El ciclo tiene que seguir siendo el real —nueve días a un kilómetro, al décimo día a
 *   dos, perfil tomado en el ascenso—: la primera versión enseñaba un dato falso, y un
 *   simulacro no puede enseñar un dato falso ni de paso.
 * - «report from stretches of the Southern Ocean that no research vessel visits in winter»
 *   (razón C) y el cierre entero: «not longer than the old one» / «It is more evenly spread».
 *
 * **q06 · Sofía y el vecino (clave C).**
 * - Las cuatro opciones arrancan igual, «It pauses on Sofía's age and her reading to …»: el
 *   molde común es el arreglo que cerró su fuga de sentido; partir la frase en mitades
 *   devuelve la pista de segundo orden —qué mitad se cita—.
 * - Sostienen las razones: «Within a week Sofía had decided he was a widower» (A, el juicio
 *   ya está dado antes), la narración externa de principio a fin (B), las tres pruebas de
 *   Sofía (C) y que la edad del vecino no vuelve a cruzarse con la suya (D).
 * - «across the hall», no «landing»: arreglo de equidad, y está en la puerta del texto.
 * - Candidato barato para quien siga bajando T: la oración de 44 palabras con las tres
 *   pruebas es la más larga del bloque, y partirla no roza ninguna razón.
 *
 * **q07 · el concierto barroco (clave A).**
 * - «strings of gut instead of steel» (equidad), «the treatises were written to correct
 *   players, not to describe them» (razones A y D), la primera línea con 1955 y 1995 y sin
 *   un elogio a lo antiguo (razón C) y **las dos últimas oraciones enteras**, que son la
 *   objeción y que la razón D nombra como tales.
 * - «authentic» cierra la serie de rasgos justo delante de «What that word hides…»: el
 *   referente de «that word» tiene que quedar pegado.
 * - Ninguna palabra del pasaje entra en la clave, que dice «written rules», «practice» y
 *   «fix».
 *
 * **q08 · el pozo de Cwm Brys (clave D).**
 * - Las cuatro opciones contestan con la misma forma —«each band is …»— y **las cuatro
 *   niegan la lectura ritual**, de modo que ninguna es «la respuesta de examen».
 * - Una cláusula por distractora y ninguna compartida: «wider at the top than any of the
 *   pots» (A), «rounded and worn … before burial» (B), «the lowest band would hold the
 *   oldest; instead every band holds the same two hundred years» (C).
 * - La clave se sostiene sobre dos hechos y no sobre un paso de razonamiento: «Parts of one
 *   jar came out of the lowest band and the highest» y el mismo abanico de dos siglos dentro
 *   de cada banda, más el cierre «did it four times over».
 *
 * **Molde compartido en q05, q06 y q08 — aviso, no defecto.** Tres de ocho llevan la misma
 * premisa en las cuatro opciones y solo la cola en disputa, y eso enseña a leer solo el
 * final. Se deja porque en los tres el molde **es** el arreglo que cerró su fuga. Cambiar la
 * redacción de la premisa sin cambiar su contenido es cosmético: la cola sigue siendo lo
 * único que decide.
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * CÓMO SE LLEGÓ AQUÍ, en un párrafo
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * Once versiones contra el mismo enemigo: **lo que se acierta sin leer el texto**. Arreglar
 * los ítems de uno en uno apenas movió la aguja; lo que la movió fue cambiar el método
 * —diseñar las cuatro opciones antes de decidir la clave (R8), igualar el registro
 * intelectual de las cuatro (R9) y quitar lo que se deduce sin el pasaje (R10)— y después
 * distinguir las tres fugas antes de tocar nada: la formal (R11), la de sentido (R13) y la
 * de frecuencia (R14). Por el camino se retiró entero el ítem de los tres lienzos de Vasco,
 * que filtraba 9 de 10 en tres mediciones seguidas, y entró el pozo; y se rompió tres veces
 * la **familia** que se había formado entre los `words-in-context`, que se contestaban con
 * la misma receta sin mirar el tema. Con la ciega ya en 15,9 % apareció la factura que nadie
 * había medido: cerrar fugas sube la distancia entre las opciones, y esa distancia es
 * dificultad, así que la rama «fácil» salió **más dura que el módulo 1**. Las versiones
 * novena y décima bajaron T y L sin tocar una sola opción —partir oraciones, referentes
 * explícitos, glosar la palabra opaca de la entrada—, con lo que el módulo dejó de
 * perjudicar pero seguía sin ayudar: de veinte ítems de lectura, uno solo en banda fácil. La
 * undécima cambió de herramienta: **q03 y q04 se reescribieron enteros, diseñados fáciles
 * desde el pasaje** —60-80 palabras, ninguna oración de más de veinte, la evidencia pegada
 * al hueco— y con el abanico igual de exigente que siempre; `q01` pasó al final de su grupo
 * para que la curva volviera a subir. El diario completo está en el historial de git y en
 * `docs/sat-auditorias/`; lo que había que conservar de él está arriba, en forma de
 * invariantes.
 *
 * **R2, que sigue vigente:** tocar un ítem lo devuelve entero a la cola de auditoría, y si
 * lo tocado son sus opciones o sus razones, la prueba a ciegas se repite sobre las nuevas.
 * La de **q03 y q04 está pendiente**: no queda una palabra de sus abanicos anteriores.
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * DUODÉCIMA PASADA (22 ago 2026) — tres puntos, todos en L salvo uno, y cero opciones
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * De veinte ítems de lectura del módulo, **ninguno estaba en banda fácil** (5-7 en los cinco
 * ejes), contra dos del módulo 1. Y no faltaba mucho: `q02` y `q03` medían **8**, es decir al
 * ras del suelo de la banda media, y `q01` medía **8** con la etiqueta 2. Los tres puntos que
 * faltaban estaban donde el calibrador los señaló, y no en las opciones:
 *
 * - **q02 · L de 2 a 1.** Las tres conductas que deciden `automatic` estaban repartidas en
 *   dos oraciones —«She asked one, heard half the answer, and asked the next as if I had
 *   finished.» / «And twice she came back to a question…»— y ahora van coordinadas dentro de
 *   **una sola oración pegada al hueco**, con las tres citas literales de la razón de C
 *   intactas y en el mismo orden. Se cae «The last light was going off the yard», la única
 *   oración que no cita ninguna razón, con lo que «All the while her eyes went to the window»
 *   pasa a ser de verdad la última frase, que es como la llama esa misma razón; y se parte la
 *   primera oración en dos para pagar en T lo que la fusión cuesta. 95 → 85 palabras, media
 *   11,9 → 12,1, la más larga 18 → 27. **8 → 7.**
 * - **q03 · L de 2 a 1.** La oración del hueco no decidía nada por sí sola —«For them it is a
 *   piece of ______»— y ahora lleva dentro las dos cosas que definen la clave: «For them, a
 *   white wall repainted every spring to steer by is a piece of ______». Además, las tres
 *   oraciones que la razón de D dice citar pasan a ser de verdad las tres anteriores al
 *   hueco: «None of them could tell you the widow's name» sube a pegarse a la viuda de 1712
 *   —las dos citas de la razón de A quedan juntas— con un antecedente plural nuevo,
 *   «Fishermen have gone out from the point ever since», y se cae «The door is unlocked one
 *   day a year», que anclaba a `refuge` en el abanico anterior y a nada en este. 90 → 99
 *   palabras, media 11,3 → 12,4, la más larga 17. **8 → 7.**
 * - **q01 · T de 2 a 1.** El pasaje era el único del grupo con tema técnico y un cociente que
 *   ninguna razón usa. Se glosa el término opaco —«That crossing is called a transit», que
 *   antes solo aparecía dentro de la oración del hueco— y «The dip is small: for a planet the
 *   size of Earth, about one part in ten thousand» pasa a «The dip is very small». 110 → 106
 *   palabras, media 15,7 → 13,3, y la oración del hueco intacta con sus 36. **8 → 7**, y la
 *   etiqueta del `meta` baja de **2 a 1** con la medida delante, no a ojo.
 *
 * Puerta 9 intacta: `words-in-context` va **1 · 1 · 1 · 1** en el orden de pantalla y la
 * puerta compara con `<`, de modo que el empate pasa. Puerta 7: los tres siguen dentro de
 * 25-150 palabras-SAT (71,8 · 83,8 · 93,8). Puertas 2 y 3 sin movimiento posible: **ninguna
 * opción se tocó**, y en los tres ítems las cuatro opciones repiten cero palabras del texto,
 * así que no hay variación que explotar ni por arriba ni por abajo.
 *
 * **Las razones tampoco se tocaron, y eso condicionó el diseño**: en `q02` la fusión tenía
 * que dejar las tres citas literales con su misma minúscula, y en `q03` la razón de D dice
 * «las tres oraciones anteriores al hueco», así que la evidencia no se podía comprimir en una
 * —lo que se hizo fue meterla en la oración del hueco, que es la otra vía a L=1 que da la
 * escala—. Por R2 los tres vuelven a la cola de auditoría; la prueba a ciegas **no** hay que
 * repetirla, porque lo que la ciega ve son enunciado y opciones y ninguno de los dos cambió.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q02',
    type: 'mcq',
    part: 1,
    stimulus:
      'Mr. Ferreira came in from the yard. My grandmother did not ask him where he had been. She set a bowl in front of him and another in front of me. Then she asked me about the arithmetic I had been given at school. Her questions were ______ that evening. She asked one, heard half the answer, asked the next as if I had finished, and twice she came back to a question I had already answered. All the while her eyes went to the window.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'hurried',
      'considerate',
      'automatic',
      'pointed',
    ],
    answer: 2,
  },
  {
    id: 'q03',
    type: 'mcq',
    part: 1,
    stimulus:
      "The chapel at Aldrec stands white on the point. A widow built it in 1712, after the sea took her sons. Fishermen have gone out from the point ever since. None of them could tell you the widow's name. Two fishermen repaint the seaward wall every spring, and the white shows up far out. Coming home, a boat lines that wall up with the pier and steers in on that line. The men who fish here keep the paint fresh for that line. For them, a white wall repainted every spring to steer by is a piece of ______.",
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'history',
      'property',
      'scenery',
      'equipment',
    ],
    answer: 3,
  },
  {
    id: 'q04',
    type: 'mcq',
    part: 1,
    stimulus:
      'The woods above the village belonged to the abbey. Tenants could gather fallen branches, but cutting a standing tree was theft. By 1690 there were fresh stumps on every slope. The steward counted them, wrote down the number, and went to no court. He set a price instead: four coins a year for the right to cut. The four coins were collected with the rent, like any other due. What the steward had done, in effect, was to ______ the cutting.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'license',
      'prohibit',
      'register',
      'ignore',
    ],
    answer: 0,
  },
  {
    id: 'q01',
    type: 'mcq',
    part: 1,
    stimulus:
      "A planet crossing in front of its star blocks a sliver of the star's light. That crossing is called a transit. A telescope watching for years can catch the dip in brightness. The dip is very small. The star itself is not steady. Cooler patches on its surface turn into view and out again, dimming it by as much or more. They do this on a schedule of their own. That wandering ______ the transit: the dip is still there in the record, unchanged in depth and still arriving on its own fixed cycle, but it no longer stands out from everything else the star is doing.",
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'reverses',
      'obscures',
      'explains',
      'amplifies',
    ],
    answer: 1,
  },
  {
    id: 'q07',
    type: 'mcq',
    part: 1,
    stimulus:
      'Recordings of a Baroque concerto made in 1955 and in 1995 hardly sound like the same piece. In the later ones the players use strings of gut instead of steel. They work in smaller groups and use little vibrato. Their tempos come from treatises written at the time. That is why the newer recordings are usually called more authentic. What that word hides is that the treatises were written to correct players, not to describe them. A manual that tells organists to keep strict time is evidence that organists were not keeping strict time. A performance built on such advice may be reproducing what one irritated writer wished he heard, and not what anyone in 1720 actually played.',
    text: 'Which choice best states the main purpose of the text?',
    options: [
      'To question what written rules can prove about the practice they were meant to fix.',
      'To document a shift in the way a body of music has been performed and recorded.',
      'To defend a performance tradition against the treatises now being used to judge it.',
      'To explain how performers recover practices for which no recordings survive at all.',
    ],
    answer: 0,
  },
  {
    id: 'q06',
    type: 'mcq',
    part: 1,
    stimulus:
      "The new tenant across the hall was a man of about fifty who wore the same gray coat every day that winter. Within a week Sofía had decided he was a widower. He carried his groceries up in a net bag and never brought more than a day's worth; he came home at the same hour; and once, through the door, she heard him say good night to a room she was fairly sure was empty. She was seventeen and had read a great many novels. When the man's wife arrived in March with two suitcases and a cold, Sofía was less embarrassed than disappointed.",
    text: 'Which choice best describes the function of the sentence "She was seventeen and had read a great many novels." in the text as a whole?',
    options: [
      "It pauses on Sofía's age and her reading to introduce her to the reader before the conclusion she draws about the tenant is reported.",
      "It pauses on Sofía's age and her reading to step outside her own account of that winter for the only moment the story allows it.",
      "It pauses on Sofía's age and her reading to explain where the story she has spent the winter building about the tenant comes from.",
      "It pauses on Sofía's age and her reading to set her against the tenant, the contrast on which the last sentence of the text turns.",
    ],
    answer: 2,
  },
  {
    id: 'q05',
    type: 'mcq',
    part: 1,
    stimulus:
      'For most of the twentieth century the temperature of the ocean below the surface was measured from ships. That meant it was measured where ships go, in the seasons when the weather lets them. Since 2000 most of the work has been done by drifting floats. A float sinks to about a kilometer and drifts there for nine days. On the tenth day it sinks to two kilometers. Then it rises to the surface, taking readings on the way up, and radios them to a satellite before sinking again. Several thousand are now at sea. They report from stretches of the Southern Ocean that no research vessel visits in winter. The record they have built is not longer than the old one. It is more evenly spread.',
    text: 'Which choice best describes the overall structure of the text?',
    options: [
      'It gives the reason ships measured only some waters in some seasons, follows one float through a ten-day cycle, and closes by comparing how many readings each of the two methods has produced and how deep each one reached.',
      'It gives the reason ships measured only some waters in some seasons, follows one float through a ten-day cycle, and closes by granting that the float record covers no more years than the old one and calling it better spread.',
      'It gives the reason ships measured only some waters in some seasons, follows one float through a ten-day cycle, and closes by admitting that both methods leave the same waters unmeasured and that winter is when the gap widens.',
      'It gives the reason ships measured only some waters in some seasons, follows one float through a ten-day cycle, and closes by conceding that the float record is still too short to show a trend and saying how much longer it needs.',
    ],
    answer: 1,
  },
  {
    id: 'q08',
    type: 'mcq',
    part: 1,
    stimulus:
      'Text 1\n\nPit 12 at Cwm Brys held the pieces of about forty pots, lying in four bands with pale clean soil between them. Not one pot was whole. This is not a rubbish hole. The vessels were smashed and set down in stages. The pale soil between the bands is the time that passed between one visit and the next. The pit records the closing of a settlement.\n\nText 2\n\nThe pit is a broad bowl, wider at the top than any of the pots: nothing had to be broken to go in. The broken edges are rounded and worn, the way pieces go when they are walked on for years before burial. Parts of one jar came out of the lowest band and the highest. Had the pots gone in as they broke, the lowest band would hold the oldest; instead every band holds the same two hundred years of styles. Someone emptied an old heap of household waste into a disused hole, and did it four times over.',
    text: "Based on the texts, how would the author of Text 2 most likely respond to Text 1's account of Pit 12?",
    options: [
      'By granting that the pit holds four bands of broken pottery but arguing that each band is a batch of pots smashed at the mouth so that they would go down it.',
      'By granting that the pit holds four bands of broken pottery but arguing that each band is a layer in which pots left whole were crushed by the weight above.',
      "By granting that the pit holds four bands of broken pottery but arguing that each band is a few years' worth of pots dropped in singly as they broke in use.",
      'By granting that the pit holds four bands of broken pottery but arguing that each band is one cartload out of a single long-standing pile of household waste.',
    ],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q02',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 1,
    tema: 'literatura',
    razones: {
      A:
        'Es la lectura de quien oye impaciencia en la ristra de preguntas: una detrás de otra y ninguna respuesta escuchada entera. El texto no da ni un signo de prisa —es una cena, la abuela se queda, nadie tiene que irse a ninguna parte— y quien va con prisa no vuelve dos veces sobre una pregunta ya contestada: repetir alarga la conversación, no la acorta. La versión anterior de este ítem sí sostenía «hurried» con el texto («started the next before I had finished»); esa frase se cambió.',
      B:
        'Lee la escena por lo que la abuela hace con las manos —pone los dos platos, pregunta por la escuela— y traslada a las preguntas la atención que hay en el gesto. El texto separa las dos cosas: ser considerado con quien contesta es escuchar lo que contesta, y aquí las respuestas se oyen a medias, se dan por dadas y se vuelven a pedir mientras ella mira a la ventana.',
      C:
        'Correcta: las tres cosas que el texto pone justo después del hueco describen preguntas que salen sin nadie detrás —«heard half the answer», «asked the next as if I had finished» y «twice she came back to a question I had already answered»— y la última frase dice dónde está ella de verdad: «her eyes went to the window». La forma de preguntar sigue funcionando; la atención no.',
      D:
        'Cae quien recuerda la primera línea —«did not ask him where he had been»— y lee el interrogatorio a la nieta como el rodeo de quien va detrás de algo. Para ir detrás de algo hay que escuchar lo que contestan, y el texto dice que oye media respuesta y que repite una que ya le habían respondido: no hay blanco al que apuntar.',
    },
    fuenteHecho:
      'Ficción original; ningún hecho real implicado. El 22 ago 2026 se bajó el eje L y solo ese eje: las tres conductas que deciden la clave —«heard half the answer», «asked the next as if I had finished» y «twice she came back to a question I had already answered»— estaban repartidas en dos oraciones y ahora van en **una sola, la inmediatamente posterior al hueco**, con las tres citas literales intactas y en el mismo orden. La sexta oración ya no tiene que empezar por «And» para conservar la minúscula de la tercera cita: al ir coordinada dentro de la misma oración, la minúscula es la natural. Se cae «The last light was going off the yard», la única oración que no cita ninguna razón, con lo que «All the while her eyes went to the window» pasa a ser de verdad la última frase del pasaje, que es como la describe la razón de C. Y se parte la primera oración en dos para compensar en T lo que la fusión añade: 95 a 85 palabras, media de 11,9 a 12,1 —igual de lejos del umbral de 18— y la más larga de 18 a 27. Ninguna opción y ninguna razón se tocaron.',
  },
  {
    id: 'q03',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 1,
    tema: 'humanidades',
    razones: {
      A:
        'El estudiante que elige esta es el que se queda con la segunda oración —«A widow built it in 1712, after the sea took her sons»— y toma la edad del edificio y la desgracia que hay detrás por lo que el edificio es para quien pesca. El camino es de los buenos: tres siglos y un naufragio detrás son justo lo que convierte un edificio en un pedazo de historia. El texto lo cierra en una línea y sin discutirlo: «None of them could tell you the widow\'s name». De la viuda no les queda el nombre; lo que sí saben es para qué sirve la pared blanca. Un edificio del que se conserva el uso y no la memoria de quien lo levantó no es, para esa gente, un pedazo de historia.',
      B:
        'El estudiante que elige esta lee quién lo cuida —«Two fishermen repaint the seaward wall every spring» y «The men who fish here keep the paint fresh»— y da el paso que se da todos los días fuera del examen: lo que uno mantiene, uno lo tiene. En el texto no hay título de nadie: no se dice que sea del pueblo, ni de los dos pintores, ni de la iglesia, y la única persona de la que consta que hizo algo con él como suyo es la viuda de 1712. Y el motivo del mantenimiento está escrito, y no es la posesión: «keep the paint fresh for that line». Se cuida lo que se usa; usarlo no es tenerlo.',
      C:
        'El estudiante que elige esta se queda con la estampa: un edificio blanco en la punta y una pared que se vuelve a pintar de blanco cada primavera. El camino es real —lo primero que hace el texto es poner el color en el paisaje— y la pintura anual parece cuidado de lo bonito. Lo que el texto hace con esa blancura es lo contrario de mirarla: «the white shows up far out», y lo que se hace con ella se hace a millas y desde el agua, alineándola con el muelle para entrar. En todo el pasaje nadie se para delante del edificio ni dice que sea hermoso. El blanco no está puesto para ser visto de cerca, sino para ser reconocido de lejos.',
      D:
        'Correcta: las tres oraciones anteriores al hueco describen un objeto de trabajo y no otra cosa. Se le da servicio en fecha fija —«Two fishermen repaint the seaward wall every spring»—, se le da servicio por un motivo declarado —«The men who fish here keep the paint fresh for that line»— y ese motivo es una maniobra concreta: «Coming home, a boat lines that wall up with the pier and steers in on that line». Algo que se revisa cada temporada para que siga sirviendo a una faena es, para quien lo revisa, un pedazo de su equipo, aunque esté hecho de piedra y tenga altar dentro. El estudiante que elige esta ha leído las tres oraciones anteriores al hueco y no ha necesitado ninguna otra. Frase que no se puede recortar: «for that line», que es la que ata el mantenimiento al uso; sin ella, la pintura anual vuelve a poder leerse como aseo o como cuidado de lo propio y `scenery` y `property` se defienden.',
    },
    fuenteHecho:
      'Ficción original sobre un hecho libre y corriente de la navegación costera: una construcción blanqueada en tierra sirve de marca de día, y alinear dos marcas da la línea con la que se entra a un puerto. Aldrec, la viuda, la fecha de 1712, los dos pintores y el muelle son inventados; no describen ningún pueblo ni ninguna capilla reales, y no se nombra ningún país ni ninguna costa. Nombre comprobado en buscador antes de fijarlo: «Aldrec» no aparece como topónimo. Quien lo cambie, que repita la búsqueda. El 22 ago 2026 se bajó el eje L y solo ese eje, en dos movimientos. Primero, **la oración del hueco pasa a decidir sola**: era «For them it is a piece of ______» —que no decide nada sin las tres anteriores— y es «For them, a white wall repainted every spring to steer by is a piece of ______», que lleva dentro las dos cosas que definen la clave, el mantenimiento periódico y el uso declarado. Segundo, las **tres** oraciones que la razón de D cita pasan a ser de verdad las tres inmediatamente anteriores al hueco: antes se colaba entre ellas y el hueco «None of them could tell you the widow\'s name», que ahora sube junto a la viuda de 1712 —las dos citas de la razón de A quedan pegadas— y estrena antecedente plural, «Fishermen have gone out from the point ever since». Se cae «The door is unlocked one day a year», que anclaba a `refuge` en el abanico anterior y a nada en este: ninguna de las cuatro razones vigentes la cita. 90 a 99 palabras, media por oración de 11,3 a 12,4 —el texto sigue muy por debajo del umbral de 18— y la más larga sin cambio en 17. Ninguna opción y ninguna razón se tocaron, y «for that line», la frase que no se puede recortar, sigue en su sitio.',
  },
  {
    id: 'q04',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 1,
    tema: 'historia',
    razones: {
      A:
        'Correcta: las dos oraciones anteriores al hueco describen el acto entero y en llano. «He set a price instead: four coins a year for the right to cut» —lo que se pone en venta es el derecho a hacerlo, no la madera ni el perdón de lo ya hecho— y «The four coins were collected with the rent, like any other due», es decir, todos los años y por la vía ordinaria. Cobrar una cantidad fija y periódica a cambio del permiso para hacer algo que estaba prohibido es darle licencia. El estudiante que elige esta es el que ha leído esas dos oraciones y no ha tenido que volver más arriba. Frase que no se puede recortar: «for the right to cut», que es la que impide leer el cobro como una multa o como el precio de la madera.',
      B:
        'El estudiante que elige esta es el que lee la segunda oración —«cutting a standing tree was theft»— y los tocones de la tercera, y espera lo que suele venir después: que la regla se repita más alto. El texto va en la dirección contraria y lo dice en dos sitios, «went to no court» y «four coins a year for the right to cut». Prohibir es quitar el derecho; aquí el derecho se pone en venta y se cobra con la renta un año tras otro. Después de 1690 el texto no vuelve a llamar robo a nada.',
      C:
        'El estudiante que elige esta es el que se queda con lo primero que hace el mayordomo —«counted them, wrote down the number»— y toma la cuenta por la respuesta. El camino tiene apoyo: anotar el número es exactamente lo que hace quien va a llevar un registro. Pero esa cuenta es de tocones ya hechos, se hace una sola vez y sirve para poner el precio que llega en la oración siguiente. De registro no hay nada más en el pasaje: ni lista de quién corta, ni de cuántos árboles, ni revisión. Lo que se repite todos los años es el cobro, no el papel.',
      D:
        'El estudiante que elige esta es el que lee «went to no court» y entiende que el mayordomo decidió no darse por enterado. La mitad del camino es buena —pleito no hubo—, y la otra mitad la desmienten la misma oración y las dos siguientes: contó los tocones, anotó el número, puso precio y cobró cuatro monedas al año con la renta. Mirar para otro lado no da trabajo ni produce ingresos, y esto dio las dos cosas. Ha leído lo que el mayordomo no hizo y no lo que hizo.',
    },
    fuenteHecho:
      'Hecho libre de historia rural: los aprovechamientos de monte de un señorío se defendían por la vía penal, y también, muy a menudo, convirtiendo la infracción en un derecho de pago anual que terminaba cobrándose junto con las demás rentas —la multa que se vuelve canon—. La abadía, el mayordomo, los tocones, la fecha de 1690 y las cuatro monedas son inventados; no se nombra ningún lugar, ningún monasterio ni ningún pleito reales, y el pasaje no atribuye a nadie la primera vez que esto se hizo. Sin país, sin moneda con nombre y sin medidas, como el resto del módulo.',
  },
  {
    id: 'q01',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A:
        'El estudiante que elige esta lee «dimming it by as much or more» y entiende que la variación de la estrella le da la vuelta al bache: si las manchas oscurecen tanto o más, la señal quedaría anulada o invertida. El texto lo desmiente dentro de la misma oración del hueco, donde el bache sigue «unchanged in depth». Lo que cambia no es el tránsito, es lo que hay alrededor.',
      B:
        'Correcta: la oración del hueco lo dice por partes. El bache «is still there in the record, unchanged in depth and still arriving on its own fixed cycle» —nada lo altera ni lo suprime— «but it no longer stands out from everything else the star is doing». Una señal que se conserva entera y deja de distinguirse del fondo queda oscurecida —tapada por lo que la estrella hace por su cuenta—, no alterada: el verbo describe lo que le pasa a la vista del bache, no al bache.',
      C:
        'Toma las manchas por una explicación alternativa del bache: si la estrella se apaga sola, el planeta sobra. El camino existe —las manchas imitan tránsitos de verdad—, pero el texto mantiene las dos cosas separadas y con relojes distintos: las manchas van «on a schedule of their own» y el tránsito sigue llegando «on its own fixed cycle». Ninguna da cuenta de la otra.',
      D:
        'Suma las dos caídas de brillo: si el planeta quita luz y las manchas también, el bache se haría más hondo. El texto cierra esa puerta con dos palabras, «unchanged in depth». Y hay una segunda razón: un bache amplificado se vería mejor, no peor, justo al revés de lo que dice el final de la oración.',
    },
    fuenteHecho:
      'Hecho libre de astronomía de exoplanetas: la actividad estelar como ruido en la fotometría de tránsitos. Estrella, ejemplo y redacción originales. El 22 ago 2026 se bajó el eje T del pasaje y solo ese eje: se glosa el término opaco de la entrada —«That crossing is called a transit», que antes solo aparecía dentro de la oración del hueco— y se sustituye «The dip is small: for a planet the size of Earth, about one part in ten thousand» por «The dip is very small», que dice lo mismo sin el cociente que ninguna razón usa. El dato real (~1 parte en 10.000 para un planeta del tamaño de la Tierra) sale del pasaje pero no se contradice en ninguna línea. Media por oración de 15,7 a 13,3 y 110 a 106 palabras; la oración del hueco no se parte y sigue con sus 36, y las tres frases intocables —«dimming it by as much or more», «on a schedule of their own» y «unchanged in depth»— están donde estaban. Ninguna opción y ninguna razón se tocaron.',
  },
  {
    id: 'q07',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'Correcta: el texto tiene un solo movimiento y es este. Nombra la prueba en que se apoya la interpretación «auténtica» —los tratados de la época, que son reglas escritas— y muestra por qué esa prueba no puede demostrar lo que se le pide: «the treatises were written to correct players, not to describe them», y un manual que manda llevar el tempo estricto demuestra que no se llevaba. La última oración saca la consecuencia: lo reproducido puede ser el deseo de un autor irritado.',
      B:
        'Confunde el arranque con el asunto. Las grabaciones de 1955 y de 1995 aparecen en la primera línea para situar de dónde sale la palabra «authentic», y el texto no vuelve a ocuparse de cómo cambió la interpretación: se va a los tratados y se queda allí. Un texto que documentara ese cambio contaría qué pasó en medio, y aquí no hay nada en medio.',
      C:
        'Lee la crítica como una toma de partido por el bando contrario: si el autor desconfía de lo «auténtico», estará defendiendo las grabaciones antiguas frente a los tratados con que hoy se las juzga. En ninguna línea se elogia lo de 1955; la única frase que las menciona dice solo que no suenan igual que las de 1995. Poner en duda un criterio no es defender a quien ese criterio deja mal.',
      D:
        'Se queda con el procedimiento —cómo se reconstruye un sonido del que no hay grabaciones— y lo toma por el propósito. El texto describe ese procedimiento, pero solo lo justo para atacarlo: la oración que lo resume termina en «not to describe them», y las dos últimas frases son objeción, no exposición.',
    },
    fuenteHecho:
      'Debate real de la interpretación históricamente informada: los tratados del siglo XVIII son prescriptivos y por eso mal testigo de la práctica corriente. Grabaciones, fechas y el ejemplo del organista son inventados.',
  },
  {
    id: 'q06',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'literatura',
    razones: {
      A:
        'La función es de las que se usan a menudo y bien —presentar a quien va a juzgar antes de que juzgue—, pero pide una frase colocada en otro sitio. Aquí el juicio ya está dado cuatro líneas antes, en la segunda oración del texto: «Within a week Sofía had decided he was a widower». La frase examinada llega después de esa conclusión y después de las tres pruebas con que se sostiene, así que no presenta a nadie a tiempo de nada: llega cuando el lector ya sabe qué decidió Sofía y necesita saber por qué.',
      B:
        'Sería exacta en un relato contado desde dentro de Sofía, donde este inciso fuera la única vez que la voz se aparta y la mira desde fuera. Este no lo es en ninguna línea. La narración va por fuera desde el principio —«Sofía had decided», «a room she was fairly sure was empty»— y sigue por fuera después, hasta el juicio final sobre lo que sintió. Si el punto de vista nunca estuvo dentro, esta frase no puede ser la salida.',
      C:
        'Correcta: la frase llega justo después de la conclusión y de las tres pruebas con que Sofía la sostiene —la bolsa de red, la hora fija, las buenas noches a un cuarto que ella cree vacío— y dice de dónde salió el procedimiento. Tener diecisiete años y haber leído «a great many novels» es lo que convierte tres detalles sueltos en la historia de un viudo. Por eso lo que se rompe en marzo es un relato y no una cuenta: Sofía queda «less embarrassed than disappointed».',
      D:
        'Ese contraste se monta así en muchos textos: dos edades enfrentadas y un final que descansa en la distancia entre ellas. Para que fuera este, la diferencia tendría que volver a usarse, y no vuelve. Los cincuenta años y el abrigo gris del vecino no se cruzan con los diecisiete de Sofía en ninguna línea posterior, y la última frase no gira sobre la edad de nadie: gira sobre lo que le pasa a su historia cuando la mujer llega en marzo con dos maletas.',
    },
    fuenteHecho: 'Ficción original; ningún hecho real implicado.',
  },
  {
    id: 'q05',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'ciencia',
    razones: {
      A:
        'Es un cierre perfectamente posible —echar cuentas: tantas mediciones de un método, tantas del otro, y hasta dónde llegó cada uno— pero no es el de este texto. Aquí no hay una sola cifra de mediciones: «several thousand» cuenta flotadores en el mar, no lecturas tomadas. Y la única profundidad que aparece es la del flotador, un kilómetro y dos kilómetros; del barco no se dice cuánto medía hacia abajo, de modo que no hay dos profundidades que comparar. Las dos frases finales comparan otra cosa: cuántos años cubre cada registro y cómo se reparten.',
      B:
        'Correcta: el texto va en tres movimientos y el tercero está en las dos últimas frases. Primero por qué el barco solo medía en parte del mar y en parte del año —«where ships go, in the seasons when the weather lets them»—. Después un flotador entero, paso a paso: nueve días a un kilómetro, al décimo baja a dos, sube midiendo y transmite por satélite. Y cierra concediendo la comparación que pierde —«The record they have built is not longer than the old one»— para quedarse con la que gana: «It is more evenly spread».',
      C:
        'Es un cierre impecable para otro texto —el que termina reconociendo que la laguna sigue abierta para los dos métodos y que en invierno se ensancha— y este texto lo dice justo al revés. La frase que lo tienta está entera dos líneas antes: los flotadores «report from stretches of the Southern Ocean that no research vessel visits in winter», es decir, informan justo de donde el barco no iba. El invierno se nombra como el hueco que se cerró, no como uno compartido, y en el cierre no vuelve a aparecer ninguna agua sin medir.',
      D:
        'Un texto que cerrara diciendo que la serie es todavía corta y cuántos años le faltan estaría bien cerrado; este no cierra así. «The record they have built is not longer than the old one» no denuncia una carencia: concede algo para poder afirmar lo siguiente, «It is more evenly spread», que es la frase con la que el párrafo se queda. En todo el texto no hay un solo plazo, umbral ni tiempo verbal de futuro.',
    },
    fuenteHecho:
      'Hecho real y público: la red internacional de flotadores perfiladores funciona desde 2000 con ciclos de unos diez días —deriva a unos 1.000 m durante nueve días, descenso a 2.000 m y perfil tomado durante el ascenso—, transmite por satélite y son varios miles. La primera versión de este texto decía que el flotador «sinks to about two kilometers, drifts there for ten days» y que lo medido era «the deep ocean»: las dos cosas son falsas —la cobertura es la de los 2.000 m superiores— y un simulacro no puede enseñar un dato falso ni de paso. El programa no se nombra; la redacción es original.',
  },
  {
    id: 'q08',
    domain: 'CS',
    tipo: 'cross-text-connections',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'El estudiante que elige esta conserva del texto 1 lo que el texto 1 da por supuesto —que alguien rompió las vasijas a propósito— y solo le cambia el motivo: no una ceremonia, sino la boca del pozo. Es un camino corriente y bien fundado: si algo entra roto en un agujero, lo primero que se piensa es que no cabía entero. La primera línea del texto 2 lo cierra midiendo el agujero: «The pit is a broad bowl, wider at the top than any of the pots: nothing had to be broken to go in». No hubo cuello que salvar, así que la rotura no la explica la entrada.',
      B:
        'El estudiante que elige esta explica lo roto por lo que le pasó al pozo después de cerrarse: metros de tierra encima aplastan lo que haya debajo, y las vasijas habrían entrado enteras. Es el reflejo de quien piensa en el peso y no en el uso. Lo que lo deshace es el estado de las aristas: «The broken edges are rounded and worn, the way pieces go when they are walked on for years before burial». Una vasija reventada bajo tierra deja filos frescos y las piezas juntas; estas están gastadas de pisarlas, de modo que se rompieron al aire libre y mucho antes de entrar.',
      C:
        'El estudiante que elige esta ya ha visto que el texto 2 lee desechos donde el texto 1 lee ceremonia, y se queda con la versión lenta de esa lectura: se tira lo que se rompe, pieza a pieza, y el pozo se llena solo a lo largo de la vida del poblado. La opción existe porque esa es la manera normal en que se llena un hoyo de basura. El texto 2 la descarta con la única prueba que separa lo lento de lo repentino: «Had the pots gone in as they broke, the lowest band would hold the oldest; instead every band holds the same two hundred years of styles». Un relleno gradual ordena las fechas de abajo arriba, y aquí no están ordenadas.',
      D:
        'Correcta: el texto 2 no discute las cuatro bandas, discute qué son. Dos hechos las explican sin ceremonia de por medio. El primero, que la mezcla es anterior a la entrada: «Parts of one jar came out of the lowest band and the highest», cosa imposible si cada banda fuera una visita distinta. El segundo, que cada banda repite el mismo abanico de doscientos años de estilos, que es lo que contiene un montón viejo de desechos y no lo que deja una secuencia de actos separados en el tiempo. El cierre lo nombra: «Someone emptied an old heap of household waste into a disused hole, and did it four times over». Cuatro descargas, no cuatro visitas: las bandas cuentan las veces que se vació la carretilla.',
    },
    fuenteHecho:
      'Debate real de la arqueología prehistórica europea: los depósitos de cerámica rota leídos como acto ritual —la llamada «deposición estructurada»— frente a su lectura como vertido corriente de desechos, con el desgaste de las aristas, las uniones de fragmentos entre capas y el reparto de fechas dentro de cada capa como pruebas que se usan de un lado y de otro. El yacimiento de Cwm Brys, el pozo 12, las cuarenta vasijas y las cuatro bandas son inventados; no se sigue ningún caso concreto ni se cita ninguna excavación real.',
  },
]
