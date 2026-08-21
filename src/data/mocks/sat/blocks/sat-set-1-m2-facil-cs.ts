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
      'When Mr. Ferreira came in from the yard, my grandmother did not ask him where he had been. She set a bowl in front of him and another in front of me, and asked me about the arithmetic I had been given at school. Her questions were ______ that evening: she asked one, heard half the answer, and started the next before I had finished, and twice she came back to a question I had already answered. All the while her eyes went to the window, where the last light was going off the yard.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'hurried',
      'well meant',
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
      'Every translator of the Persian ghazal runs into the same knot. The form turns on a refrain: one word closes every couplet, and each time it lands it means something a little different — a door, a decision, a departure. English has no word that carries all three, so the translator picks one and repeats it. The result ______ the refrain: it comes back at the end of every couplet, on time and in the place the form requires, but each time it comes back saying exactly what it said before.',
    text: 'Which choice completes the text with the most logical and precise word or phrase?',
    options: [
      'restores',
      'buries',
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
      "The ledgers of a subscription library are one of the few places where the reading of ordinary people leaves any trace at all. The clerk wrote down the title, the date, and the subscriber's number, and nothing else. What the ledgers ______ is the reading itself: a book carried home on a Tuesday and returned the next may have been read twice, opened on the first night and abandoned, or left on a shelf while the subscription ran quietly on. The clerk had no way of knowing which, and the ledger does not pretend to say.",
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
      'For most of the twentieth century the temperature of the deep ocean was measured from ships, which meant it was measured where ships go, in the seasons when the weather lets them. Since 2000 most of the work has been done by drifting floats. A float sinks to about two kilometers, drifts there for ten days, then rises to the surface taking readings on the way up and radios them to a satellite before sinking again. Several thousand are now at sea, and they report from stretches of the Southern Ocean that no research vessel visits in winter. The record they have built is not longer than the old one. It is more evenly spread.',
    text: 'Which choice best describes the overall structure of the text?',
    options: [
      'It reports a limitation of an older method, describes the device that replaced it, and closes by comparing how much of the ocean each has measured.',
      'It reports a limitation of an older method, describes the device that replaced it, and closes by saying what the record has and has not changed.',
      'It reports a limitation of an older method, describes the device that replaced it, and closes by warning that the same limitation remains in place.',
      'It reports a limitation of an older method, describes the device that replaced it, and closes by predicting what a longer record will eventually show.',
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
      'It excuses a mistake the narrator considers too early in life to be held against Sofía.',
      'It fixes the distance in years between Sofía and the tenant she has been watching.',
      'It gives the source of the method by which Sofía reached her conclusion.',
      'It marks the point at which Sofía begins to distrust what she has decided.',
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
      'To question what a body of evidence can settle about the practice it prescribes.',
      'To document a shift in how a body of music has been performed and recorded.',
      'To defend a performance tradition against the standard by which it is now judged.',
      'To explain how performers recover practices for which no recordings survive.',
    ],
    answer: 0,
  },
  {
    id: 'q08',
    type: 'mcq',
    part: 1,
    stimulus:
      "Text 1\n\nThe three late canvases left in Aurelio Vasco's studio are filed as unfinished, and they are the best evidence we have of how he worked. The under-drawing shows through; the sky is laid in and the figures are not; whole passages stop at the outline. Read side by side they show a painter building a picture from the back forward, and they let us watch a method the finished works, sealed under varnish, hide completely.\n\nText 2\n\nVasco exhibited two of the three in his lifetime, priced them, and sold one. He varnished all three himself. Whatever we are looking at, it is not work interrupted: a painter who prices, varnishes and sells a canvas has declared it done. The bare outlines in the lower half are not a stage on the way to something else.",
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
        'Se queda con la velocidad: la abuela «started the next before I had finished». Pero apresurado es quien tiene prisa por llegar a la respuesta, y aquí no hay prisa ninguna —es una cena, y ella se queda— ni interés por lo que se contesta: oye media respuesta y vuelve sobre una pregunta ya contestada. Repetir no es ir deprisa.',
      B:
        'Lee la escena por lo que la abuela hace con las manos —pone los dos platos, pregunta por la escuela— y traslada a las preguntas la intención amable del gesto. El texto separa las dos cosas: preguntar por la aritmética es lo que se pregunta todos los días, y esa noche las preguntas se sostienen solas mientras ella mira a la ventana.',
      C:
        'Correcta: las tres cosas que el texto pone justo después del hueco describen preguntas que salen sin nadie detrás —«heard half the answer», «started the next before I had finished» y «twice she came back to a question I had already answered»— y la última frase dice dónde está ella de verdad: «her eyes went to the window». La forma de preguntar sigue funcionando; la atención no.',
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
        'Se queda con la mitad complaciente de la frase —el estribillo vuelve «on time and in the place the form requires»— y concluye que la traducción devuelve intacto lo que había. Es leer hasta el «but»: lo que vuelve ya no es lo mismo, porque vuelve «saying exactly what it said before», y restaurar exige que vuelva entero.',
      B:
        'Entiende la pérdida como desaparición: si el inglés no tiene esa palabra, el estribillo se pierde. El texto dice lo contrario en la misma oración del hueco, «it comes back at the end of every couplet»: el estribillo está entero, audible y en su sitio. Lo que se pierde no es el estribillo, son sus tres sentidos.',
      C:
        'Correcta: el texto opone lo que se conserva a lo que se pierde. Se conserva el relieve —vuelve en cada pareado, puntual y en el lugar que pide la forma— y se pierde el espesor, porque la palabra elegida solo significa una de las tres cosas y «each time it comes back saying exactly what it said before». Superficie intacta y fondo perdido es exactamente lo que aplana.',
      D:
        'Toma la reducción por una ganancia: una sola palabra repetida golpearía más fuerte que una que cambia de sentido. Sería una lectura defendible de otro poema, no de este. El texto ha dicho antes en qué consiste aquí el estribillo —«each time it lands it means something a little different»—, así que fijarlo en un sentido le quita el trabajo, no se lo afila.',
    },
    fuenteHecho:
      'Hecho real de métrica persa: el gazal cierra cada pareado con una palabra o sintagma fijo, y su polisemia es un problema conocido de traducción. La forma se explica dentro del texto; sentidos, ejemplo y redacción son originales.',
  },
  {
    id: 'q04',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Correcta: el texto enumera lo que el registro contiene —«the title, the date, and the subscriber\'s number, and nothing else»— y a continuación enumera lo que no distingue: leído dos veces, abandonado la primera noche o nunca abierto. La frase final lo remata, «The clerk had no way of knowing which, and the ledger does not pretend to say». Lo que falta en el libro de préstamos es la lectura.',
      B:
        'Cae quien lee el cierre como una denuncia de cifras infladas: si prestar no es leer, el registro estaría hinchando la lectura. Para exagerar algo hay que afirmarlo, y el texto dice que el libro «does not pretend to say» nada sobre eso. Quien infla, si acaso, es el historiador que suma préstamos; el registro calla.',
      C:
        'Es la trampa para quien empareja palabras: «the date» aparece literalmente dos líneas antes, en la lista de lo que anotaba el empleado. Pero lo que ese apunte fecha es el préstamo —el martes en que el libro sale y el martes en que vuelve—, y el resto del párrafo se dedica a decir que entre esas dos fechas puede no haber ocurrido ninguna lectura.',
      D:
        'Se apoya en la primera oración, «one of the few places where the reading of ordinary people leaves any trace at all», y confunde el rastro con la cosa. Esa frase introduce un registro escaso, no completo: lo que se conserva son títulos, fechas y números de socio, que es la huella que la lectura dejó y no la lectura.',
    },
    fuenteHecho:
      'Hecho libre de historia del libro: los registros de préstamo de las bibliotecas por suscripción como fuente para la historia de la lectura, y la distancia entre prestar y leer. Biblioteca, empleado y casos inventados.',
  },
  {
    id: 'q05',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 1,
    tema: 'ciencia',
    razones: {
      A:
        'Lee las dos últimas líneas como una comparación de cantidad: cuál de los dos métodos ha medido más. El texto no compara volúmenes, compara reparto —«not longer than the old one», y después «It is more evenly spread»—. La única magnitud que se compara es la duración de la serie, y se compara para decir que no ha cambiado.',
      B:
        'Correcta: el texto va en tres movimientos. Primero el límite del método antiguo, que se medía «where ships go, in the seasons when the weather lets them». Después el aparato que lo sustituyó, descrito paso a paso: baja a dos kilómetros, deriva diez días, sube midiendo y transmite por satélite. Y cierra separando lo que no cambió de lo que sí: la serie no es más larga, está mejor repartida.',
      C:
        'Cae quien ve «no research vessel visits in winter» y lo lee como un hueco que sigue abierto. La frase dice lo contrario de lo que parece suelta: los flotadores «report from stretches of the Southern Ocean that no research vessel visits in winter», o sea que informan justo de donde el barco no llegaba. El límite se nombra ahí para decir que ya no lo es.',
      D:
        'Convierte «not longer than the old one» en una promesa de futuro: cuando la serie acumule años, dirá tal cosa. El texto usa esa frase en presente y para conceder algo, no para anunciar nada, y en todo el párrafo no hay ninguna predicción, ningún resultado esperado ni ninguna fecha por delante.',
    },
    fuenteHecho:
      'Hecho real y público: la red internacional de flotadores perfiladores funciona desde 2000 con ciclos de unos diez días, deriva próxima a los 2.000 m y transmisión por satélite, y son varios miles. El programa no se nombra; la redacción es original.',
  },
  {
    id: 'q06',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 1,
    tema: 'literatura',
    razones: {
      A:
        'Lee la edad como atenuante: a los diecisiete se perdona equivocarse. Pero el narrador no absuelve a nadie; pone la edad al lado de las novelas, y es la segunda mitad de la frase la que hace el trabajo. Además el final no trata el error como falta —Sofía queda «less embarrassed than disappointed»—, así que no hay nada que excusar.',
      B:
        'Es la lectura de quien empareja datos: «about fifty» arriba, «seventeen» abajo, luego la frase estará ahí para dar la diferencia de edad. Esa diferencia no se usa en ninguna otra parte del texto, mientras que las novelas explican todo lo anterior: la conclusión del viudo, las tres pruebas que la sostienen y hasta la decepción del final.',
      C:
        'Correcta: la frase llega justo después de la conclusión y de las tres pruebas con que Sofía la sostiene —la bolsa de red, la hora fija, las buenas noches a un cuarto que ella cree vacío— y dice con qué la construyó. Haber leído «a great many novels» es el método: convertir tres detalles en una historia. Por eso el final la deja «less embarrassed than disappointed»: lo que se estropea en marzo es el relato.',
      D:
        'Toma el inciso del narrador por una duda de la propia Sofía. En el texto Sofía no duda en ningún momento: decide en una semana, reúne pruebas y sigue instalada en su conclusión hasta que la mujer llega en marzo. Quien pone distancia es el narrador que cuenta esto después, no la chica de la escena.',
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
        'Correcta: el texto tiene un solo movimiento y es este. Nombra la prueba en que se apoya la interpretación «auténtica» —los tratados de la época— y muestra por qué esa prueba no puede establecer lo que se le pide: «the treatises were written to correct players, not to describe them», y un manual que manda llevar el tempo estricto demuestra que no se llevaba. La última oración saca la consecuencia.',
      B:
        'Confunde el arranque con el asunto. Las grabaciones de 1955 y de 1995 aparecen en la primera línea para situar de dónde sale la palabra «authentic», y el texto no vuelve a ocuparse de cómo cambió la interpretación: se va a los tratados y se queda allí. Un texto que documentara ese cambio contaría qué pasó en medio, y aquí no hay nada en medio.',
      C:
        'Lee la crítica como una toma de partido por el bando contrario: si el autor desconfía de lo «auténtico», estará defendiendo las grabaciones antiguas. En ninguna línea se elogia lo de 1955; la única frase que las menciona dice solo que no suenan igual. Poner en duda un criterio no es defender a quien ese criterio deja mal.',
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
        'Correcta: el texto 2 concede lo que se ve —«The bare outlines in the lower half»— y le cambia el estatuto con hechos del propio cuadro: Vasco expuso dos, les puso precio, vendió uno y barnizó los tres. «A painter who prices, varnishes and sells a canvas has declared it done», así que esos contornos «are not a stage on the way to something else». Un lienzo dado por terminado no registra el proceso: registra hasta dónde quiso llegar.',
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
