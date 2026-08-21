import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Standard English Conventions del módulo `sat-set-1-m2-facil` — ítems q16 a q22.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 16-22). Tipo, tema, dificultad y clave
 * salen de ahí y no se renegocian aquí: si un ítem «pedía» otra letra, se rehizo el ítem.
 *
 * **Este bloque se rehizo entero por R11** (`docs/sat-ingles-blueprint.md` §4 bis). La versión
 * anterior daba por bueno que aquí, y solo aquí, los distractores podían ser agramaticales
 * porque «la regla examinada es lo que los tumba». Medido: cuatro de los siete ítems los
 * acertaban 7, 10, 10 y 10 solucionadores de 10 **sin ver el texto**. Si de las cuatro
 * opciones solo una está bien formada por sí sola —`children's` frente a `childrens'`,
 * `childrens` y `children`—, la frase sobra. Lo que rige ahora:
 *
 * 1. **Las cuatro opciones son gramaticales en abstracto.** Cuatro formas verbales que
 *    existen, cuatro signos que existen. Ninguna palabra inventada, ningún posesivo mal
 *    escrito. Lo único que decide es la oración, y la oración está en el `stimulus`.
 * 2. **En los cuatro ítems de puntuación las opciones son la misma palabra con distinto
 *    signo.** Nada del dibujo de la opción delata la clave: el par de comas «equilibrado»
 *    se reconoce solo, así que no se ofrecen pares; el signo que falta hay que ir a
 *    buscarlo al texto.
 * 3. **La opción sin signo nunca es la clave.** «Cuando dudes, no pongas coma» es la apuesta
 *    segura de quien no lee, y en los cuatro ítems de fronteras esa apuesta falla:
 *    q16 coma · q18 coma · q20 punto y coma · q22 punto y coma.
 * 4. **Ni un solo periodo o punto y coma se ofrece junto a otro signo que también valdría.**
 *    Con dos oraciones independientes, punto y punto y coma son las dos correctas: por eso
 *    en q20 no aparece el punto. Es la puerta 4 (clave única) aplicada al reverso.
 * 5. **La marcación filtra, y es una tercera clase de fuga.** R13 manda medir, antes de
 *    arreglar, si un ítem se filtra por la forma (R11) o por el sentido. En la tercera vuelta
 *    q19 lo acertaban **7 de 10 sin ver el texto** y no era ninguna de las dos: sus cuatro
 *    opciones —`grows` · `has grown` · `grew` · `had grown`— eran gramaticales por separado,
 *    así que la fuga no era formal, y no había nada que «sonara mejor», así que tampoco era
 *    de sentido. Era de **frecuencia**: tres tiempos corrientes de la prosa contra uno
 *    marcado, y el marcado es el que parece la respuesta de una pregunta, porque es el que un
 *    ítem de gramática suele estar examinando.
 *
 *    El arreglo **no** es mover la clave a otro tiempo. Eso deja la arquitectura intacta
 *    —tres corrientes contra uno marcado— y solo pone la apuesta del que no lee encima de un
 *    distractor: el ítem se sigue resolviendo sin leerlo, al revés. El arreglo es **igualar el
 *    grado de marcación**: las cuatro opciones de q19 son ahora formas compuestas
 *    (`have grown` · `has grown` · `was growing` · `had grown`), ninguna es presente ni pasado
 *    simple, y tres de las cuatro son perfectos. «Elegir el perfecto» ya no señala nada, y
 *    quedarse con él sin leer el sujeto lleva a A.
 *
 *    Se mantiene el presente perfecto como clave a propósito: «since» + perfecto es el
 *    contraste que más le sirve a un hispanohablante, y renunciar a él para esquivar la fuga
 *    habría costado más de lo que arreglaba.
 *
 * **El array va en el orden del plan (q16 → q22) y eso ya cumple la puerta 9.** SEC es la
 * excepción verificada de College Board: de menos a más difícil **sin agrupar por tipo**, y
 * las etiquetas del plan salen 1 · 1 · 1 · 2 · 2 · 2 · 3, no decrecientes, con `boundaries` y
 * `form-structure-sense` alternando. No hay nada que reordenar, a diferencia del módulo 1.
 *
 * Las siete reglas, repartidas a propósito para que no salgan siete de concordancia, y
 * elegidas además para no repetir ninguna del bloque SEC del módulo 1 (que ya examina par de
 * signos, dos puntos ante enumeración, modificador inicial y pluscuamperfecto continuo):
 *
 *   q16 coma tras subordinada antepuesta · q17 concordancia pronombre-antecedente ·
 *   q18 coma ante relativa explicativa con «which» · q19 presente perfecto fijado por «since» ·
 *   q20 punto y coma ante adverbio conjuntivo · q21 concordancia con frase interpuesta ·
 *   q22 punto y coma como separador de serie con comas internas
 *
 * Condiciones de clave única que hay que vigilar al editar:
 *
 * - q16: lo que hace ilegales al punto y coma y a los dos puntos es que a su izquierda solo
 *   hay una subordinada («Because a clerk earned more…»), no una oración completa. Si alguien
 *   rehace la frase para que el hueco quede detrás de una principal, esos dos signos pasan a
 *   ser defendibles y el ítem tiene tres claves.
 * - q17: el antecedente («the seedlings») tiene que quedar en la **misma** oración del hueco y
 *   en plural, y no puede aparecer cerca ningún singular al que se le puedan atribuir raíces.
 *   El «its own small store of food» de más arriba cuelga de «Each seed» y por eso es legal:
 *   si se pluraliza esa frase, el ítem pierde el contraste que lo sostiene.
 * - q18: la relativa tiene que ser **imposible de leer como especificativa**. Lo garantizan dos
 *   cosas: el antecedente es una medida definida («forty-eight years»), que no admite que se
 *   la especifique más, y la relativa comenta el hecho entero. Si alguien pone ahí un
 *   antecedente contable e indeterminado, la opción sin coma se vuelve defendible.
 * - q19: lo que fija el presente perfecto son **dos** anclas de la misma oración, «Since the
 *   1840s» y el «it now has» del final. Quitando cualquiera de las dos, el pasado o el
 *   pluscuamperfecto pasan a ser defendibles y el ítem tiene dos claves. Desde la tercera
 *   vuelta hay dos condiciones más. Una: el núcleo del sujeto, «the shelf», tiene que seguir
 *   en singular y con su bloque interpuesto en plural —«of books for young readers…»—, porque
 *   de ahí vive A; el ítem sigue midiendo tiempo y no número, el número solo mata a A. Dos:
 *   **no se puede ofrecer ninguna forma continua en presente perfecto**: «has been growing»
 *   sería tan correcta como la clave y el ítem tendría dos. «was growing» sí cabe porque lo
 *   que la tumba no es el continuo, es el pasado.
 * - q20: a la derecha de «however» tiene que haber una oración con sujeto y verbo propios; si
 *   se queda en un complemento, el punto y coma muere. Y **no se puede ofrecer el punto**: con
 *   dos independientes, «messages. However,» es tan correcto como el punto y coma.
 * - q21: el núcleo del sujeto es «row», y lo que fija el tiempo es el verbo coordinado
 *   «and stores», que va en presente simple. Si se cambia «stores» por un compuesto, C deja de
 *   ser falsa por tiempo y solo lo es por número.
 * - q22: cada miembro de la serie tiene que llevar coma interna —las tres relativas
 *   explicativas— y el primer separador (el punto y coma entre el tesorero y el bibliotecario)
 *   tiene que seguir en el texto. Si se quitan las relativas, la serie vuelve a ser simple y
 *   la coma de A se convierte en la respuesta correcta.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q16',
    type: 'mcq',
    part: 1,
    stimulus:
      "For two centuries the accounts of the salt works were copied out by hand, and the treasury paid its clerks by the page rather than by the hour. Historians who use those ledgers now have to read them twice. Because a clerk earned more from a long entry than from a short ______ the same shipment often appears spread over three lines, with the weight, the buyer, and the date each given a line of its own. The ledgers say less about the salt trade than about the men who kept them.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "one:",
      "one;",
      "one",
      "one,",
    ],
    answer: 3,
  },
  {
    id: 'q17',
    type: 'mcq',
    part: 1,
    stimulus:
      "Mangroves grow where a river meets the sea, in mud too salty for most trees to root in at all. Their seeds do not drop to the ground and wait there for a better season. Each seed sprouts while it is still attached to the parent tree, and the young plant falls into the water already the length of a hand, green and buoyant and carrying its own small store of food. The seedlings can drift on a tide for a month or more without harm. When the seedlings finally settle in shallow water, ______ roots take hold over the following weeks, and a stand of trees begins where there had been nothing but silt.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "its",
      "it's",
      "their",
      "they're",
    ],
    answer: 2,
  },
  {
    id: 'q18',
    type: 'mcq',
    part: 1,
    stimulus:
      "A gallery can make an argument without writing one down. In one city museum the same eleven pictures have hung in the same order since 1978. Five of them were painted before the valley below was flooded for a reservoir, a photograph of the dam under construction hangs at the center, and the last five were painted after. Visitors who walk the room from left to right reach the final canvas expecting a ruin and find a lake instead. Three curators have come and gone without moving a frame, and the room has made the same argument for forty-eight ______ which is longer than any of the three curators lasted.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "years;",
      "years",
      "years:",
      "years,",
    ],
    answer: 3,
  },
  {
    id: 'q19',
    type: 'mcq',
    part: 1,
    stimulus:
      "Until the middle of the nineteenth century, most books put into the hands of the young were shortened versions of books written for adults, with the difficult passages cut and a moral fastened to the end. A printer in a provincial town began instead to commission stories for which no adult version existed, and to have them illustrated on the same page as the words rather than in a plate bound at the back. Buyers noticed, and other printers copied him. Since the 1840s the shelf of books for young readers in an ordinary American bookstore ______ steadily, and it now has its own writers, its own illustrators, and its own prices.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "have grown",
      "has grown",
      "was growing",
      "had grown",
    ],
    answer: 1,
  },
  {
    id: 'q20',
    type: 'mcq',
    part: 1,
    stimulus:
      "When the telegraph line was strung over the pass in 1868, the newspapers in the capital sold the project as an instrument of government. An order from the ministry would reach the border garrison in an hour instead of a fortnight, and the ministry paid for the wire on that promise. The traffic that kept the wire busy was another matter. Merchants used it to move prices, and the price of wool at the port could set what a shepherd was offered five hundred kilometers inland by the following morning. In its first full year the company sent fewer than two hundred official ______ however, the fees it charged wool brokers covered a third of what the concession had cost.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "messages,",
      "messages",
      "messages:",
      "messages;",
    ],
    answer: 3,
  },
  {
    id: 'q21',
    type: 'mcq',
    part: 1,
    stimulus:
      "A tide gauge is a plain instrument: a float in a sheltered well, a pen on an arm, and a paper drum turned by clockwork. Its value comes from repetition rather than from precision. One measurement of high water on one morning tells a port almost nothing. But the row of gauges that the port authority has kept along the estuary since 1892 ______ the rise and fall of the water on paper without a break and stores the rolls in a cupboard that is opened only after a storm. Sea level is nothing grander than a very long stack of those rolls.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "trace",
      "traced",
      "have traced",
      "traces",
    ],
    answer: 3,
  },
  {
    id: 'q22',
    type: 'mcq',
    part: 1,
    stimulus:
      "The oldest choir in the city has never once auditioned a singer. Anyone who turns up on three consecutive Thursdays is in, and anyone who stops turning up is out. Musicians who visit expect a congregation and hear something closer to a trained ensemble, which the director explains by arithmetic rather than by talent. Fifty Thursdays a year for eleven years come to more than five hundred rehearsals, which is more singing together than most students have done by the time they leave a conservatory. The choir's administration is three people in all: a treasurer, who has never collected a single fee; a librarian, who keeps the only key to the music ______ a director, who has never once turned anyone away. The three of them meet in a room above a bakery that now sells bread on Thursday evenings to people who come only for the singing.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "cupboard, and",
      "cupboard; and",
      "cupboard and",
      "cupboard: and",
    ],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q16',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 1,
    tema: 'historia',
    regla:
      "Coma que cierra una subordinada antepuesta: cuando la oración abre con una cláusula subordinada («Because…»), una coma la separa de la principal. Los signos que exigen oración completa a su izquierda —punto y coma y dos puntos— no pueden aparecer ahí, y suprimir la marca deja pegadas dos cláusulas.",
    razones: {
      A:
        "Los dos puntos exigen a su izquierda una oración completa, y a la izquierda del hueco solo hay «Because a clerk earned more from a long entry than from a short one», que es una subordinada. Es el error de quien lee lo que sigue como una explicación —y lo es— y da por hecho que eso basta para poner dos puntos, sin comprobar qué clase de unidad los precede.",
      B:
        "El punto y coma pide oración independiente a los dos lados y a su izquierda solo encuentra la subordinada que abre con «Because». Es el error de quien usa el punto y coma como una coma reforzada cuando la primera parte del período le resulta larga.",
      C:
        "Deja la subordinada antepuesta pegada a la principal: «…than from a short one the same shipment often appears spread over three lines» obliga a leer «one» y «the same shipment» seguidos y sin frontera, y el lector empieza la principal dos o tres palabras después de donde empieza de verdad. Es el error de quien puntúa solo donde el sentido se le rompe.",
      D:
        "Correcta: la oración abre con una cláusula subordinada introducida por «Because», y la norma pide una coma entre esa subordinada antepuesta y la principal que la sigue. La coma marca además dónde termina lo que explica y dónde empieza el sujeto de la oración, «the same shipment».",
    },
    fuenteHecho:
      "Historia administrativa, hecho libre: el pago a los escribientes por página y su efecto sobre la forma de los libros de cuentas es un lugar común de la crítica de fuentes. Las salinas, los dos siglos y el desglose en tres líneas son invención propia; no describen ningún archivo concreto.",
  },
  {
    id: 'q17',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 1,
    tema: 'ciencia',
    regla:
      "Concordancia del posesivo con su antecedente en número, y distinción entre el posesivo «its/their» y las contracciones homófonas «it's/they're» («it is», «they are»). Las cuatro son palabras corrientes del inglés: solo la oración dice cuál cabe.",
    razones: {
      A:
        "Posesivo singular con antecedente plural: el sujeto de la oración es «the seedlings», y ningún otro elemento cercano puede tener raíces. Es el error de quien arrastra el «its own small store of food» de la frase anterior sin ver que aquel colgaba de «Each seed», singular, y este no.",
      B:
        "Confunde el posesivo con la contracción: «it's» solo puede desarrollarse como «it is», de modo que la oración diría «it is roots take hold», que no es una oración. Es el error de oído más repetido del inglés escrito, y aquí llega además con el número equivocado.",
      C:
        "Correcta: el posesivo tiene que concordar con su antecedente, y el antecedente es «the seedlings», plural, dentro de la misma oración del hueco; «their» es la única forma posesiva plural de las cuatro. El texto ya había usado «its» con un antecedente singular —«Each seed… carrying its own small store of food»—, que es justo el contraste que el ítem examina.",
      D:
        "Es la contracción de «they are», no un posesivo: la oración quedaría «they are roots take hold over the following weeks». Acierta el número y falla la forma, que es el camino de quien corrige la concordancia de oído y escribe la palabra que suena, no la que funciona.",
    },
    fuenteHecho:
      "Botánica de manual: la viviparidad del mangle. La semilla no se desprende para esperar en el fango, sino que germina adherida al árbol y cae al agua ya como propágulo desarrollado; el propágulo flota y se mantiene viable durante semanas, y una vez varado en agua somera echa raíces a lo largo de varias semanas, no en un día. Sin especie, país ni cifras: la comparación con el largo de una mano es propia.",
  },
  {
    id: 'q18',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 1,
    tema: 'humanidades',
    regla:
      "Coma ante relativa explicativa con «which»: la cláusula que comenta lo ya dicho —y no lo especifica— se separa con coma. Un antecedente que es una medida definida («forty-eight years») no admite lectura especificativa, así que la coma no es opcional. Ni el punto y coma ni los dos puntos pueden preceder a una relativa: lo que va detrás no es una oración independiente ni una enumeración.",
    razones: {
      A:
        "El punto y coma pide una oración independiente a cada lado, y a su derecha solo hay una relativa —«which is longer than any of the three curators lasted»— que no se sostiene sola: quitado el resto de la frase, no es una oración. Es el error de quien mide el peso del período y no su estructura, y sube de coma a punto y coma cuando la frase se le hace larga.",
      B:
        "Sin ningún signo, «which is longer than…» queda pegado a «forty-eight years» como si sirviera para decir de qué años se habla. Una cantidad ya determinada no se puede especificar más, así que el lector arrastra la relativa dentro de la medida y solo al final descubre que era un comentario. Es la apuesta segura de quien no ha leído la frase: en la duda, ninguna coma.",
      C:
        "Los dos puntos anuncian lo que viene después de una oración completa —una enumeración, una explicación, una aposición—, pero nunca una relativa: «which» ya trae consigo el enlace con lo anterior, y los dos puntos lo duplican. Es el error de quien ha aprendido que los dos puntos «presentan» algo y los coloca ante cualquier ampliación.",
      D:
        "Correcta: la relativa no dice de qué años se habla, sino que comenta el hecho entero que se acaba de enunciar, y una relativa explicativa va precedida de coma. La prueba está en el texto: la duración es una sola y definida, la que va de 1978 a hoy, de modo que nada queda por especificar.",
    },
    fuenteHecho:
      "Museografía, hecho libre: el orden de colgado como argumento tácito de una sala. El museo, las once obras, el embalse, la fotografía de la presa y la fecha de 1978 son invención propia y no describen ninguna colección real. Los cuarenta y ocho años son la cuenta desde 1978 hasta el año en curso.",
  },
  {
    id: 'q19',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 2,
    tema: 'humanidades',
    regla:
      "Tiempo verbal fijado por el contexto: «since» con un punto de partida en el pasado y una situación que sigue vigente —el «it now has» de la misma oración— exige presente perfecto. Las cuatro opciones son formas compuestas y corrientes del verbo «grow», del mismo grado de marcación: no aparece el presente ni el pasado simple, y tres de las cuatro son perfectos, de modo que quedarse con «el tiempo que parece de examen» no lleva a la clave sino a A. Lo que descarta a cada distractor son las dos anclas temporales de la frase y, en el caso de A, el número del núcleo del sujeto.",
    razones: {
      A:
        "Acierta el tiempo y falla el número, que es justamente lo que impide resolver el ítem quedándose con «el perfecto»: el verbo concuerda con el núcleo del sujeto, «the shelf», que es singular, y no con los plurales del bloque interpuesto, «of books for young readers». El «it now has» del final de la misma oración vuelve a nombrar ese sujeto en singular. Es el error de quien busca dentro del sujeto el primer sustantivo en plural y concuerda con él.",
      B:
        "Correcta: el presente perfecto es la forma que une un comienzo situado en el pasado con un estado que sigue siendo verdad al escribir, y la oración marca las dos puntas —«Since the 1840s» al principio y «it now has its own writers» al final—. Concuerda además con el núcleo singular del sujeto, «the shelf».",
      C:
        "Pasado continuo: encierra el crecimiento dentro del pasado, y «since» no admite pasado en inglés ni el «now» del final deja cerrar nada. Es el calco del hispanohablante que traduce «desde la década de 1840 crecía de forma constante», porque en español el imperfecto sí acepta ese «desde» y en inglés hay que ir al perfecto; lo refuerza el párrafo, que viene entero en pasado.",
      D:
        "Pluscuamperfecto: sitúa el crecimiento antes de otro momento pasado, y esa referencia anterior no existe en la frase; el punto de observación es el presente, escrito con «now». Es el error de quien lee «Since the 1840s» como una fecha más del relato decimonónico y elige el tiempo que suena más «histórico» de los cuatro.",
    },
    fuenteHecho:
      "Historia editorial, hecho libre: la literatura infantil deja de ser una versión abreviada de la de adultos y se convierte en un sector propio, con ilustración integrada en la página, a lo largo del siglo XIX. El impresor y su ciudad son invención propia. «Bookstore», y no «bookshop», porque el examen mide la norma escrita estadounidense.",
  },
  {
    id: 'q20',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 2,
    tema: 'historia',
    regla:
      "Frontera entre dos oraciones independientes cuando la segunda empieza por un adverbio conjuntivo: «however» enlaza el sentido pero no une sintácticamente, de modo que hace falta un punto y coma. La coma sola produce empalme (comma splice) y la ausencia de signo, una oración seguida.",
    razones: {
      A:
        "Empalme de comas: a los dos lados del hueco hay oraciones con sujeto y verbo propios —«the company sent…» y «the fees… covered…»— y una coma no basta para separarlas. Es el error de quien trata «however» como si fuera «but»: «but» sí es conjunción coordinante y admitiría la coma, «however» no lo es.",
      B:
        "Sin ningún signo quedan dos oraciones seguidas sin frontera, y el lector arrastra «however» al final de la primera —«fewer than two hundred official messages however»— hasta que el segundo verbo lo obliga a volver atrás. Es la apuesta segura de quien no lee la frase entera: en la duda, ningún signo.",
      C:
        "Los dos puntos anuncian que lo que sigue desarrolla, ilustra o cumple lo que se acaba de decir, y aquí lo que sigue lo contradice: «however» avisa de un contraste, no de una ampliación. Es el error de quien ve dos hechos relacionados y coloca los dos puntos como si cualquier relación fuera explicación.",
      D:
        "Correcta: el punto y coma separa dos oraciones independientes que no van unidas por conjunción coordinante, que es exactamente lo que hay aquí; «however» es un adverbio conjuntivo, señala el contraste y va seguido de su propia coma, pero no puede sostener él solo la unión.",
    },
    fuenteHecho:
      "Historia de las telecomunicaciones, hecho libre: las líneas telegráficas se justificaron ante la opinión pública como instrumento de gobierno y se sostuvieron con tráfico comercial. La línea, el paso de montaña, 1868, la guarnición y el mercado de la lana son invención propia. Distancias en kilómetros, como el resto del examen: ninguna medida imperial obliga al estudiante a convertir bajo cronómetro.",
  },
  {
    id: 'q21',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 2,
    tema: 'ciencia',
    regla:
      "Concordancia sujeto-verbo con una frase preposicional y una relativa interpuestas: el verbo concuerda con el núcleo del sujeto («row»), no con el sustantivo plural más cercano. El tiempo lo fija el verbo coordinado «and stores», en presente simple.",
    razones: {
      A:
        "Concuerda con lo más cercano: «gauges» y «the port authority» quedan entre el núcleo del sujeto y el hueco, pero pertenecen al bloque interpuesto. El núcleo es «row», singular, y sigue siéndolo por larga que sea la distancia hasta el verbo.",
      B:
        "Acierta el número —el pretérito no lo marca— y falla el tiempo: el verbo coordinado «and stores» va en presente simple y describe lo que la hilera hace hoy, de modo que un pasado deja la oración con dos tiempos incompatibles unidos por «and».",
      C:
        "Falla las dos cosas a la vez: el plural no concuerda con «row» y el presente perfecto choca con «and stores». Es el camino de quien copia la forma que tiene delante, «has kept», y la pluraliza para que case con «gauges».",
      D:
        "Correcta: el núcleo del sujeto es «the row», singular, aunque entre él y el verbo se interpongan «of gauges» y la relativa «that the port authority has kept along the estuary since 1892»; y el presente simple es el tiempo que exige el verbo coordinado «and stores».",
    },
    fuenteHecho:
      "Oceanografía de manual: el mareógrafo de flotador en pozo tranquilizador, con plumilla sobre tambor de relojería, deja un trazo **continuo** sobre el papel —de ahí «without a break»— y no una lectura cada diez minutos, que es lo que hace un registrador digital. El nivel del mar es la serie larga de esos rollos. El puerto, el estuario y la fecha de 1892 son invención propia.",
  },
  {
    id: 'q22',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 3,
    tema: 'humanidades',
    regla:
      "Punto y coma como separador de serie: cuando los miembros de una enumeración llevan comas dentro —aquí, tres relativas explicativas—, los miembros se separan con punto y coma, y también el último, el que va precedido de «and». Mezclar los dos niveles de separación deja la serie sin jerarquía.",
    razones: {
      A:
        "Aplica la coma de serie corriente. La regla que el estudiante recuerda —coma antes del «and» final— vale para enumeraciones cuyos miembros no llevan puntuación interna, y aquí cada miembro trae la suya: «a treasurer, who has never collected a single fee». Con una cuarta coma, el lector cuenta cinco miembros donde hay tres.",
      B:
        "Correcta: la serie ya se separa con punto y coma entre el primer miembro y el segundo, porque cada uno arrastra su propia relativa con coma, y el último miembro se separa igual, con punto y coma delante de «and». El signo mayor marca las fronteras entre miembros y la coma queda para lo que pasa dentro de cada uno.",
      C:
        "Suprime todo signo y confía en que «and» marque por sí solo la última frontera. La serie queda entonces con punto y coma entre el primer miembro y el segundo y nada entre el segundo y el tercero, de modo que «the only key to the music cupboard and a director» se lee como si el bibliotecario guardara la llave y un director. Es la apuesta de quien da por hecho que donde hay conjunción sobra el signo.",
      D:
        "Repite los dos puntos que ya abrieron la enumeración detrás de «three people in all». Un segundo par de puntos dentro de la misma serie anuncia una lista nueva que nunca llega, y deja al lector esperando el desglose del bibliotecario. Es el error de quien asocia los dos puntos con la idea de «enumerar» y los repite en cada tramo de la lista.",
    },
    fuenteHecho:
      "Práctica coral aficionada, hecho libre: un coro sin audiciones cuya calidad se explica por horas acumuladas y no por selección. La aritmética del párrafo es correcta: un año tiene cincuenta y dos jueves, de los cuales el texto cuenta cincuenta, y cincuenta jueves por once años dan quinientos cincuenta ensayos. El coro, la ciudad, la panadería y las cifras son invención propia.",
  },
]
