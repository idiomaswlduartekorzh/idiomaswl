import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Craft and Structure del módulo `sat-set-1-m2-facil` — ítems q01 a q08.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 1-8). Textos originales de WeLearn;
 * ni un pasaje ni una pregunta salen de material de College Board (blueprint §5).
 *
 * Las claves son las del plan y no se negocian ítem a ítem: B, C, C, A, B, C, A, A.
 * El reparto de letras se defiende a nivel de módulo: mover una sola aquí rompe la
 * puerta 1 en el otro extremo del examen, donde ya nadie la va a mirar.
 *
 * Los cuatro `words-in-context` llevan el enunciado del SAT digital —«Which choice
 * completes the text with the most logical and precise word or phrase?»— con el hueco
 * marcado en el texto. «As used in the text… most nearly mean?» es del SAT de papel y
 * aquí no aparece (plan, tabla de enunciados).
 *
 * ── Segunda versión, después de medir con panel ─────────────────────────────
 *
 * El panel de diez solucionadores sin los textos dejó el módulo en 44 % con el techo en
 * 35 %. De este bloque, **q05 y q06 los acertaron 9 de 10 sin leer**: los dos de
 * estructura y propósito. La causa es **R9/R12**: sin el texto gana la opción que suena
 * más completa o más «de examen», y esa era la clave en los dos.
 *
 * - **q05** ya compartía el arranque en las cuatro opciones; lo que las separaba era el
 *   cierre, y solo la clave tenía la forma matizada «lo que sí y lo que no». Se igualó la
 *   forma: las cuatro en «closes by saying X and Y», dentro de ocho caracteres.
 * - **q06** iba en cuatro moldes distintos («It excuses…», «It fixes…», «It gives…»,
 *   «It marks…»), y solo el de la clave nombraba un método. Se igualó también, a
 *   «It points to Sofía's <mitad de la frase> as the <papel> …», y se repartió dos y dos
 *   la mitad de la frase citada para que las novelas no señalaran solas a la clave.
 *
 * **q03** volvió del auditor de clave por gemelo de q01: los dos eran «X ______ Y: sigue
 * ahí / vuelve en su sitio, **pero**…» y los dos se contestaban con «conserva la forma,
 * pierde la sustancia», de modo que quien resolvía q01 contestaba q03 sin leer. Encima
 * `buries` repetía la metáfora de ocultar de la clave de q01, `masks`. Rehecho: toda la
 * evidencia va **antes** del hueco y la oración del hueco —«Whatever else such a version
 * gets right, it ______ the refrain»— no lleva ningún andamio que copiar; hay que volver
 * arriba. `buries` sale y entra `displaces`, que niega algo que el texto afirma dos
 * líneas más arriba (el estribillo vuelve en su sitio) y no comparte metáfora con q01.
 *
 * Correcciones menores de la misma ronda: q02 dejó de sostener `hurried` con el texto
 * («started the next before I had finished» → «asked the next as if I had finished») y
 * `well meant`, única opción de dos palabras, pasó a `considerate`; q03 define `couplet`
 * como `two-line couplet`; q04 explica la institución en vez de nombrarla y fecha la
 * devolución («returned the following Tuesday», que antes era `returned the next` y se
 * leía «al día siguiente»); q05 corrige un **dato falso** sobre el ciclo del flotador
 * (ver `fuenteHecho` de q05); q07 simplifica la sintaxis de la clave sin cambiar lo que
 * dice; y q08 iguala la coma de Oxford al resto del examen.
 *
 * Por **R2**, los siete ítems tocados vuelven enteros a la cola de auditoría y la prueba
 * a ciegas hay que repetirla sobre estas opciones.
 *
 * ── Tercera versión: q05 y q06, otra vez ───────────────────────────────────
 *
 * Igualar la forma no solo no arregló estos dos: los **empeoró**. El panel a ciegas pasó
 * de 9/10 a **10 de 10 en los dos**. Es el caso que motivó **R13** (blueprint §4 bis): en
 * estructura y función la fuga no es la forma, es el sentido.
 *
 * - **q05.** Con las cuatro opciones en el mismo molde, la clave era la **más general**:
 *   «qué cambia el registro nuevo y qué no» encaja en casi cualquier texto con esa forma,
 *   mientras que las otras tres nombraban contenidos concretos que podían estar o no. Lo
 *   genérico es la apuesta segura de quien no ha leído. Encima C decía casi lo mismo que
 *   B con otras palabras, y dos opciones que se solapan se cancelan entre ellas.
 * - **q06.** La misma fuga por el otro lado: de las cuatro funciones ofrecidas, la clave
 *   era la única que describía un texto **bien hecho**. Las otras tres —una excusa del
 *   narrador, una distancia de edades que no se usa, una duda que el personaje no tiene—
 *   eran funciones que ningún escritor competente le daría a esa frase. Los textos bien
 *   hechos son predecibles, así que se adivinan.
 *
 * Rehechos según R13: **las cuatro opciones al mismo grado de concreción, y cada
 * distractora es la descripción impecable de un texto ligeramente distinto**, no una
 * descripción torpe del texto que hay.
 *
 * - **q05** conserva el arranque común —el límite del barco y el ciclo del flotador, que
 *   el texto sostiene— y cambia los cuatro cierres. Los cuatro son ahora igual de
 *   concretos, los cuatro nombran dos miembros y tres de los cuatro son concesivos
 *   («granting», «admitting», «conceding»), para que la forma de concesión deje de marcar
 *   a la clave. Cada uno es un final creíble para un texto sobre este mismo tema:
 *   comparar cantidades de lecturas, conceder que la serie no es más larga, reconocer una
 *   laguna todavía abierta, pedir más años. Solo el pasaje dice cuál ocurre.
 * - **q06** deja de partir la frase en mitades: las cuatro opciones arrancan en «It pauses
 *   on Sofía's age and her reading to …», de modo que la pista de segundo orden —qué
 *   mitad se cita— desaparece del todo. Las cuatro funciones son de las que un buen
 *   escritor querría para un inciso así: presentar al personaje antes de que juzgue,
 *   apartarse por una vez de su punto de vista, explicar de dónde sale su interpretación
 *   y enfrentar dos edades. Tres se caen con el texto delante, y por un hecho comprobable
 *   cada una: el orden de las frases, un punto de vista que nunca estuvo dentro y un
 *   contraste que no vuelve a usarse.
 *
 * Longitudes medidas, no estimadas: q05 va de 221 a 229 caracteres (clave, 224) y q06 de
 * 128 a 133 (clave, 130). En ninguno de los dos la clave es la opción más larga.
 *
 * Las claves siguen siendo las del plan —q05 → B, q06 → C— y por **R2** los dos vuelven
 * enteros a la cola de auditoría: la prueba a ciegas hay que repetirla sobre estas
 * opciones, no sobre las anteriores.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q01',
    type: 'mcq',
    part: 1,
    stimulus:
      "A planet crossing in front of its star blocks a sliver of the star's light, and a telescope watching for years can catch the dip. The dip is small — for a planet the size of Earth, about one part in ten thousand — and the star itself is not steady. Cooler patches on its surface turn into view and out again, dimming it by as much or more, on a schedule of their own. That wandering ______ the transit: the dip is still there in the record, unchanged in depth and still arriving on its own fixed cycle, but it no longer stands out from everything else the star is doing.",
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'reverses',
      'masks',
      'explains',
      'amplifies',
    ],
    answer: 1,
  },
  {
    id: 'q02',
    type: 'mcq',
    part: 1,
    stimulus:
      'When Mr. Ferreira came in from the yard, my grandmother did not ask him where he had been. She set a bowl in front of him and another in front of me, and asked me about the arithmetic I had been given at school. Her questions were ______ that evening: she asked one, heard half the answer, and asked the next as if I had finished, and twice she came back to a question I had already answered. All the while her eyes went to the window, where the last light was going off the yard.',
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
      "Every translator of the Persian ghazal meets the same knot. The form turns on a refrain: one word closes every two-line couplet, and in the Persian that word moves as the poem goes — a door at the end of one couplet, a decision at the end of another, a departure at the end of the last. Much of the poem's motion comes from those turns. No single English word holds all three senses, so the translator settles on one and repeats it at the close of every couplet, on time and in the place the form requires, saying each time exactly what it said before. Whatever else such a version gets right, it ______ the refrain.",
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'restores',
      'displaces',
      'flattens',
      'sharpens',
    ],
    answer: 2,
  },
  {
    id: 'q04',
    type: 'mcq',
    part: 1,
    stimulus:
      "The ledgers of a library that readers paid a yearly fee to borrow from are one of the few places where the reading of ordinary people leaves any trace at all. The clerk wrote down the title, the date, and the borrower's number, and nothing else. What the ledgers ______ is the reading itself: a book carried home on a Tuesday and returned the following Tuesday may have been read twice, opened on the first night and abandoned, or never opened at all. The clerk had no way of knowing which, and the ledger does not pretend to say.",
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'omit',
      'exaggerate',
      'date',
      'preserve',
    ],
    answer: 0,
  },
  {
    id: 'q05',
    type: 'mcq',
    part: 1,
    stimulus:
      'For most of the twentieth century the temperature of the ocean below the surface was measured from ships, which meant it was measured where ships go, in the seasons when the weather lets them. Since 2000 most of the work has been done by drifting floats. A float sinks to about a kilometer and drifts there for nine days; on the tenth it sinks to two kilometers and then rises to the surface, taking readings on the way up, and radios them to a satellite before sinking again. Several thousand are now at sea, and they report from stretches of the Southern Ocean that no research vessel visits in winter. The record they have built is not longer than the old one. It is more evenly spread.',
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
    id: 'q06',
    type: 'mcq',
    part: 1,
    stimulus:
      "The new tenant across the landing was a man of about fifty who wore the same gray coat every day that winter. Within a week Sofía had decided he was a widower. He carried his groceries up in a net bag and never brought more than a day's worth; he came home at the same hour; and once, through the door, she heard him say good night to a room she was fairly sure was empty. She was seventeen and had read a great many novels. When the man's wife arrived in March with two suitcases and a cold, Sofía was less embarrassed than disappointed.",
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
    id: 'q07',
    type: 'mcq',
    part: 1,
    stimulus:
      'Recordings of a Baroque concerto made in 1955 and in 1995 hardly sound like the same piece, and the later ones are usually called more authentic: gut strings, smaller groups, little vibrato, tempos taken from treatises written at the time. What that word hides is that the treatises were written to correct players, not to describe them. A manual that tells organists to keep strict time is evidence that organists were not keeping strict time. A performance built on such advice may be reproducing what one irritated writer wished he heard, and not what anyone in 1720 actually played.',
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
    id: 'q08',
    type: 'mcq',
    part: 1,
    stimulus:
      "Text 1\n\nThe three late canvases left in Aurelio Vasco's studio are filed as unfinished, and they are the best evidence we have of how he worked. The under-drawing shows through; the sky is laid in and the figures are not; whole passages stop at the outline. Read side by side they show a painter building a picture from the back forward, and they let us watch a method the finished works, sealed under varnish, hide completely.\n\nText 2\n\nVasco exhibited two of the three in his lifetime, priced them, and sold one. He varnished all three himself. Whatever we are looking at, it is not work interrupted: a painter who prices, varnishes, and sells a canvas has declared it done. The bare outlines in the lower half are not a stage on the way to something else.",
    text: "Based on the texts, how would the author of Text 2 most likely respond to Text 1's account of the three late canvases?",
    options: [
      'By granting that the canvases are bare in places but arguing that Vasco let them go in that state on purpose.',
      'By granting that the canvases are bare in places but arguing that a later cleaning, not Vasco, stripped them.',
      'By granting that the canvases are bare in places but arguing that the varnished works show the same sequence.',
      'By granting that the canvases are bare in places but arguing that Vasco worked that way only in those years.',
    ],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q01',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 1,
    tema: 'ciencia',
    razones: {
      A:
        'El estudiante que elige esta lee «dimming it by as much or more» y entiende que la variación de la estrella le da la vuelta al bache: si las manchas oscurecen tanto o más, la señal quedaría anulada o invertida. El texto lo desmiente dentro de la misma oración del hueco, donde el bache sigue «unchanged in depth». Lo que cambia no es el tránsito, es lo que hay alrededor.',
      B:
        'Correcta: la oración del hueco lo dice por partes. El bache «is still there in the record, unchanged in depth and still arriving on its own fixed cycle» —nada lo altera ni lo suprime— «but it no longer stands out from everything else the star is doing». Una señal que se conserva entera y deja de distinguirse del fondo está enmascarada, no tocada.',
      C:
        'Toma las manchas por una explicación alternativa del bache: si la estrella se apaga sola, el planeta sobra. El camino existe —las manchas imitan tránsitos de verdad—, pero el texto mantiene las dos cosas separadas y con relojes distintos: las manchas van «on a schedule of their own» y el tránsito sigue llegando «on its own fixed cycle». Ninguna da cuenta de la otra.',
      D:
        'Suma las dos caídas de brillo: si el planeta quita luz y las manchas también, el bache se haría más hondo. El texto cierra esa puerta con dos palabras, «unchanged in depth». Y hay una segunda razón: un bache amplificado se vería mejor, no peor, justo al revés de lo que dice el final de la oración.',
    },
    fuenteHecho:
      'Hecho libre de astronomía de exoplanetas: la actividad estelar como ruido en la fotometría de tránsitos, y la profundidad de ~1 parte en 10.000 para un planeta del tamaño de la Tierra. Estrella, ejemplo y redacción originales.',
  },
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
    fuenteHecho: 'Ficción original; ningún hecho real implicado.',
  },
  {
    id: 'q03',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'humanidades',
    razones: {
      A:
        'Se queda en la mitad complaciente de lo que el texto acaba de decir —el traductor repite su palabra «at the close of every couplet, on time and in the place the form requires»— y concluye que la versión inglesa devuelve intacto lo que había. La misma oración sigue, y sigue por el otro lado: vuelve «saying each time exactly what it said before». Devolver una de las tres cosas no es devolverlas.',
      B:
        'Da por supuesto que un molde persa no cabe en inglés y que, si algo se pierde, será el sitio del estribillo: llegará tarde, o en mitad del pareado, o donde se pueda. El texto lo desmiente antes del hueco y con detalle —«at the close of every couplet, on time and in the place the form requires»—. La posición se conserva entera; lo que cambia es lo que se dice desde ella.',
      C:
        'Correcta: las dos piezas de la respuesta están arriba, no en la oración del hueco. Se conserva el retorno —cada pareado, puntual, en el lugar que la forma pide— y se pierde el movimiento: la palabra persa «moves as the poem goes» y de esos giros sale «much of the poem\'s motion», mientras que la inglesa vuelve «saying each time exactly what it said before». Un relieve que se repite sin variar queda aplanado: el dibujo sigue, el desnivel no.',
      D:
        'Toma la reducción por una ganancia: una sola palabra repetida golpearía más fuerte que una que cambia de sentido en cada pareado. Sería una lectura defendible de otro poema, no de este. El texto ha dicho antes de dónde viene aquí el trabajo del estribillo —de que la palabra se mueva mientras el poema avanza—, así que fijarla en un sentido le quita la función, no se la afila.',
    },
    fuenteHecho:
      'Hecho real de métrica persa: el gazal cierra cada pareado con una palabra o sintagma fijo, y su polisemia es un problema conocido de traducción. La forma se explica dentro del texto —«two-line couplet», porque «couplet» no es cognado del español—; sentidos, ejemplo y redacción son originales.',
  },
  {
    id: 'q04',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Correcta: el texto enumera lo que el registro contiene —«the title, the date, and the borrower\'s number, and nothing else»— y a continuación enumera lo que no distingue: leído dos veces, abandonado la primera noche o «never opened at all». La frase final lo remata, «The clerk had no way of knowing which, and the ledger does not pretend to say». Lo que falta en el libro de préstamos es la lectura.',
      B:
        'Cae quien lee el cierre como una denuncia de cifras infladas: si prestar no es leer, el registro estaría hinchando la lectura. Para exagerar algo hay que afirmarlo, y el texto dice que el libro «does not pretend to say» nada sobre eso. Quien infla, si acaso, es el historiador que suma préstamos; el registro calla.',
      C:
        'Es la trampa para quien empareja palabras: «the date» aparece literalmente dos líneas antes, en la lista de lo que anotaba el empleado. Pero lo que ese apunte fecha es el préstamo —el martes en que el libro sale y el martes siguiente en que vuelve—, y el resto del párrafo se dedica a decir que entre esas dos fechas puede no haber ocurrido ninguna lectura.',
      D:
        'Se apoya en la primera oración, «one of the few places where the reading of ordinary people leaves any trace at all», y confunde el rastro con la cosa. Esa frase introduce un registro escaso, no completo: lo que se conserva son títulos, fechas y números de lector, que es la huella que la lectura dejó y no la lectura.',
    },
    fuenteHecho:
      'Hecho libre de historia del libro: los registros de préstamo de las bibliotecas de suscripción como fuente para la historia de la lectura, y la distancia entre prestar y leer. Biblioteca, empleado y casos inventados. La institución no se nombra con un término que haya que saberse: el texto la describe —«a library that readers paid a yearly fee to borrow from»— porque «subscription library» daba por sabido lo que el ítem no examina.',
  },
  {
    id: 'q05',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 1,
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
    id: 'q06',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 1,
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
    id: 'q07',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 2,
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
    id: 'q08',
    domain: 'CS',
    tipo: 'cross-text-connections',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'Correcta: el texto 2 concede lo que se ve —«The bare outlines in the lower half»— y le cambia el estatuto con hechos del propio cuadro: Vasco expuso dos, les puso precio, vendió uno y barnizó los tres. «A painter who prices, varnishes, and sells a canvas has declared it done», así que esos contornos «are not a stage on the way to something else». Un lienzo dado por terminado no registra el proceso: registra hasta dónde quiso llegar.',
      B:
        'Trae de fuera una historia de restauración que el texto 2 no cuenta: el único tratamiento de superficie que menciona lo hizo el pintor, «He varnished all three himself». Y esa hipótesis le costaría el argumento, porque su objeción vive precisamente en que las decisiones sobre esos lienzos son de Vasco y de nadie más.',
      C:
        'Le atribuye al texto 2 una afirmación sobre las obras acabadas, que es de lo que habla el texto 1 cuando dice que están «sealed under varnish». El texto 2 no dice nada de lo que se ve o se deja de ver bajo el barniz de las demás; su discusión no es si los tres lienzos aportan poco, sino qué clase de cosa son.',
      D:
        'Es el movimiento de conceder el hallazgo y recortarle el alcance: el método sería real, pero solo de esos años. Exige aceptar antes que los lienzos muestran un método, y eso es justo lo que el texto 2 niega, porque para él no hay «work interrupted» que mirar. Además el texto 2 no hace ninguna afirmación cronológica: sus datos son de exposición, precio, venta y barniz.',
    },
    fuenteHecho:
      'Ficción original: Aurelio Vasco no existe. El argumento —firmar, barnizar y vender como declaración de obra acabada— está construido para el ítem sobre una discusión corriente en historia del arte, sin seguir ningún caso concreto.',
  },
]
