import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Standard English Conventions del módulo `sat-set-1-m2-facil` — ítems q16 a q22.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 16-22). Tipo, tema, dificultad y clave
 * salen de ahí y no se renegocian aquí: si un ítem «pedía» otra letra, se rehizo el ítem.
 *
 * Este bloque no funciona como los otros tres del módulo. El texto no es el objeto de la
 * pregunta sino el soporte: el enunciado es el mismo en los siete —«Which choice completes
 * the text so that it conforms to the conventions of Standard English?»— y lo que se examina
 * es la norma del inglés escrito **estadounidense**. De ahí que aquí, y solo aquí, los
 * distractores puedan ser agramaticales: la regla examinada *es* lo que los tumba. Lo que no
 * vale es que se caigan por otra cosa (longitud, registro, un tiempo verbal que nadie
 * preguntó), y por eso las cuatro opciones de cada ítem son la misma frase con distinta
 * puntuación o el mismo verbo en cuatro formas.
 *
 * **El array va en el orden del plan (q16 → q22) y eso ya cumple la puerta 9.** SEC es la
 * excepción verificada de College Board: de menos a más difícil **sin agrupar por tipo**, y
 * las etiquetas del plan salen 1 · 1 · 1 · 2 · 2 · 2 · 3, no decrecientes, con `boundaries` y
 * `form-structure-sense` alternando. No hay nada que reordenar, a diferencia del módulo 1.
 *
 * Las siete reglas, repartidas a propósito para que no salgan siete de concordancia:
 *
 *   q16 coma tras subordinada antepuesta · q17 concordancia pronombre-antecedente ·
 *   q18 coma que separa sujeto de verbo · q19 posesivo de plural irregular ·
 *   q20 predicado compuesto · q21 concordancia con frase interpuesta ·
 *   q22 delimitación completa del elemento no esencial
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
 * - q18: la relativa «who chose the order» tiene que ser **esencial**, y lo es porque el texto
 *   dice antes que por el museo han pasado tres conservadores. Si se quita esa línea, la
 *   relativa pasa a comentar, pediría un par de comas —que ninguna opción ofrece— y el ítem
 *   se queda sin respuesta correcta.
 * - q20: el segundo verbo («collected») no puede recibir sujeto propio. En cuanto alguien
 *   escriba «and it collected», la coma de A se vuelve correcta y el ítem tiene dos claves.
 * - q21: el núcleo del sujeto es «row», y lo que fija el tiempo es el verbo coordinado
 *   «and prints», que va en presente simple. Si se cambia «prints» por un compuesto, C deja de
 *   ser falsa por tiempo y solo lo es por número.
 * - q22: el aposito es «a company of forty singers drawn from six streets of the same
 *   neighborhood», una sola unidad: el participio «drawn…» modifica a «singers» y no se puede
 *   dejar fuera del par de comas. Si se acorta el aposito hasta «a company of forty singers»,
 *   la opción A se vuelve correcta y el ítem se cae.
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
      "Mangroves grow where a river meets the sea, in mud too salty for most trees to root in at all. Their seeds do not wait on the branch for a current to carry them off. Each seed sprouts while it is still attached to the parent tree, and the young plant drops into the water already the length of a hand, green and buoyant and carrying its own small store of food. The seedlings can drift on a tide for weeks without harm. When the seedlings finally settle in shallow water, ______ roots take hold within a day, and a stand of trees begins where there had been nothing but silt.",
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
      "A gallery can make an argument without writing one down. In one city museum the same eleven landscapes have hung in the same order since 1978: five painted before the valley was flooded for a reservoir, then a photograph of the dam under construction, then five painted after. Visitors who walk the room from left to right reach the last canvas expecting a ruin and find a lake instead. Three curators have come and gone since the paintings went up. The ______ the sequence was settled by the size of the frames and nothing else, but no one on the staff repeats that anymore.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "curator who chose the order, still insists that",
      "curator who chose the order still insists, that",
      "curator, who chose the order still insists that",
      "curator who chose the order still insists that",
    ],
    answer: 3,
  },
  {
    id: 'q19',
    type: 'mcq',
    part: 1,
    stimulus:
      "Until the middle of the nineteenth century, most books put into the hands of the young were shortened versions of books written for adults, with the difficult passages cut and a moral fastened to the end. A printer in a provincial town began instead to commission stories for which no adult version existed, and to have them illustrated on the same page as the words rather than in a plate bound at the back. Buyers noticed, and other printers copied him. Within twenty years the ______ shelf in a bookshop had stopped being an annex of the adult one: it had its own writers, its own illustrators, and its own prices.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "childrens'",
      "children's",
      "childrens",
      "children",
    ],
    answer: 1,
  },
  {
    id: 'q20',
    type: 'mcq',
    part: 1,
    stimulus:
      "When the telegraph line was strung over the pass in 1868, the newspapers in the capital sold the project as an instrument of government: an order from the ministry would reach the border garrison in an hour instead of a fortnight. The traffic that paid for the wire was another matter. Merchants used it to move prices, and the price of wool at the port could set what a shepherd was offered three hundred miles inland by the following morning. In its first full year the company carried fewer than two hundred official ______ collected more from wool brokers in fees than the ministry had paid for the whole concession.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "messages, and",
      "messages; and",
      "messages. And",
      "messages and",
    ],
    answer: 3,
  },
  {
    id: 'q21',
    type: 'mcq',
    part: 1,
    stimulus:
      "A tide gauge is a plain instrument: a float in a sheltered well, a pen on an arm, and a paper drum turned by clockwork. Its value comes from repetition rather than from precision. One measurement of high water on one morning tells a port almost nothing. But the row of gauges that the port authority has kept along the estuary since 1892 ______ the height of the water every ten minutes and prints it on a strip that no one reads until a storm sends someone looking for it. A sea level is nothing grander than a very long stack of those strips.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "record",
      "recorded",
      "have recorded",
      "records",
    ],
    answer: 3,
  },
  {
    id: 'q22',
    type: 'mcq',
    part: 1,
    stimulus:
      "The oldest choir in the city has never once auditioned a singer. Anyone who turns up on three consecutive Thursdays is in, and anyone who stops turning up is out; the director keeps no list and calls no rehearsal apart from the meeting itself. Musicians who visit expect the sound of a congregation and hear something closer to a trained ensemble, which the director explains by arithmetic rather than by talent: a hundred Thursdays a year for eleven years is more time under a conductor than most conservatory students ever get. The ______ in a room above a bakery, and the bakery now sells bread on Thursday evenings to people who come only for the singing.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "choir, a company of forty singers, drawn from six streets of the same neighborhood meets",
      "choir, a company of forty singers drawn from six streets of the same neighborhood, meets",
      "choir a company of forty singers drawn from six streets of the same neighborhood, meets",
      "choir, a company of forty singers drawn from six streets of the same neighborhood meets",
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
      "Concordancia del posesivo con su antecedente en número, y distinción entre el posesivo «its/their» y las contracciones homófonas «it's/they're» («it is», «they are»).",
    razones: {
      A:
        "Posesivo singular con antecedente plural: el sujeto de la oración es «the seedlings», y ningún otro elemento cercano puede tener raíces. Es el error de quien arrastra el «its own small store of food» de la frase anterior sin ver que aquel colgaba de «Each seed», singular, y este no.",
      B:
        "Confunde el posesivo con la contracción: «it's» solo puede desarrollarse como «it is», de modo que la oración diría «it is roots take hold», que no es una oración. Es el error de oído más repetido del inglés escrito, y aquí llega además con el número equivocado.",
      C:
        "Correcta: el posesivo tiene que concordar con su antecedente, y el antecedente es «the seedlings», plural, dentro de la misma oración del hueco; «their» es la única forma posesiva plural de las cuatro. El texto ya había usado «its» con un antecedente singular —«Each seed… carrying its own small store of food»—, que es justo el contraste que el ítem examina.",
      D:
        "Es la contracción de «they are», no un posesivo: la oración quedaría «they are roots take hold within a day». Acierta el número y falla la forma, que es el camino de quien corrige la concordancia de oído y escribe la palabra que suena, no la que funciona.",
    },
    fuenteHecho:
      "Botánica de manual: la viviparidad del mangle —la semilla germina adherida al árbol y el propágulo cae al agua ya desarrollado— y su enraizamiento rápido en fango somero. Sin especie, país ni cifras: la comparación con el largo de una mano es propia.",
  },
  {
    id: 'q18',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 1,
    tema: 'humanidades',
    regla:
      "Ninguna coma suelta puede separar el sujeto de su verbo, ni el verbo de su complemento, ni abrir un inciso que no se cierra. La relativa «who chose the order» es esencial —el texto dice que por el museo han pasado tres conservadores— y por eso no se marca con comas.",
    razones: {
      A:
        "Coma entre el sujeto y su verbo: «The curator who chose the order» es el sujeto entero y «still insists» su verbo, y nada puede meterse solo entre los dos. Es el error de quien puntúa por el oído: el sujeto es largo, el lector respira antes del verbo y ahí cae la coma.",
      B:
        "Coma entre el verbo y su complemento: la subordinada «that the sequence was settled by the size of the frames» es lo que el conservador insiste, y no se separa del verbo que la rige. Es el error de quien trata toda cláusula con «that» como si fuera una cita y le abre paso con coma.",
      C:
        "Abre un inciso que nunca se cierra. Con la coma detrás de «curator», «who chose the order» pasaría a ser información añadida y tendría que cerrarse con otra coma antes de «still insists»; sin ese cierre, el lector no sabe dónde vuelve la oración principal. Y el texto no admite ese inciso: si la relativa comentara, el sujeto sería «el conservador» sin más, y por el museo han pasado tres.",
      D:
        "Correcta: la oración no lleva ninguna coma porque no hay nada que separar. La relativa «who chose the order» identifica de cuál de los tres conservadores se habla, así que es esencial y va sin comas; y entre el sujeto y su verbo, y entre el verbo y su subordinada, la norma no admite una coma suelta.",
    },
    fuenteHecho:
      "Museografía, hecho libre: el orden de colgado como argumento tácito de una sala. El museo, las once obras, el embalse, la fotografía de la presa y la fecha de 1978 son invención propia y no describen ninguna colección real.",
  },
  {
    id: 'q19',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 2,
    tema: 'humanidades',
    regla:
      "Posesivo de un plural irregular: «children» ya es plural sin -s, de modo que su posesivo se forma añadiendo apóstrofo y s («children's»), como el de un singular, y no colocando el apóstrofo detrás de una -s que la palabra no tiene.",
    razones: {
      A:
        "Aplica al plural irregular la regla del plural regular: el apóstrofo detrás de la -s solo tiene sentido cuando el plural termina en -s, y para llegar a «childrens'» hay que inventarse antes un plural «childrens» que no existe. Es el error de quien ha automatizado «plural, luego apóstrofo al final».",
      B:
        "Correcta: «children» es un plural irregular, sin -s, y el posesivo de un plural que no termina en -s se forma con apóstrofo más s, «children's». La frase nombra el estante de los jóvenes lectores del párrafo, así que el posesivo es obligatorio.",
      C:
        "Duplica el plural y suprime el posesivo: «childrens» no existe como palabra, y aun existiendo diría de qué está hecho el estante, no de quién es. Es el error de quien resuelve por analogía con «books» o «printers», plurales regulares del mismo párrafo.",
      D:
        "Deja el sustantivo sin marca de posesivo y lo usa como modificador, «the children shelf», que el inglés estándar no admite: para expresar esa relación el nombre tiene que ir en posesivo. Es el error del estudiante hispanohablante que traduce «el estante infantil» y no ve dónde estaba el posesivo.",
    },
    fuenteHecho:
      "Historia editorial, hecho libre: la literatura infantil deja de ser una versión abreviada de la de adultos y se convierte en un sector propio, con ilustración integrada en la página, a lo largo del siglo XIX. El impresor y su ciudad son invención propia.",
  },
  {
    id: 'q20',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 2,
    tema: 'historia',
    regla:
      "Predicado compuesto: dos verbos que comparten un solo sujeto —«the company carried… and collected…»— se unen con la conjunción y sin ningún signo. Los signos de frontera entre oraciones (coma antes de la conjunción, punto y coma, punto) exigen que detrás haya una oración con sujeto propio, y aquí no lo hay.",
    razones: {
      A:
        "Coma delante de la conjunción en un predicado compuesto. La regla que el estudiante recuerda —coma antes de «and» cuando une dos oraciones— pide que la segunda tenga sujeto propio, y «collected more from wool brokers in fees…» no lo tiene: comparte «the company» con el primer verbo. No hay aquí riesgo de mala lectura que justifique la coma.",
      B:
        "El punto y coma exige oración independiente a los dos lados, y a su derecha solo hay un segundo predicado sin sujeto, además encabezado por una conjunción coordinante que el punto y coma vuelve redundante. Es el error de quien mide el peso de la frase en vez de mirar su estructura.",
      C:
        "Corta la oración en dos y deja «And collected more from wool brokers in fees than the ministry had paid for the whole concession.» sin sujeto: un fragmento. Es el error de quien cree que un contraste fuerte pide frase aparte, y no comprueba si lo que queda detrás del punto se sostiene solo.",
      D:
        "Correcta: «the company» es el único sujeto y rige los dos verbos, «carried» y «collected». Un predicado compuesto se une con la conjunción sola: ni coma, ni punto y coma, ni punto, porque no hay dos oraciones que separar.",
    },
    fuenteHecho:
      "Historia de las telecomunicaciones, hecho libre: las líneas telegráficas se justificaron ante la opinión pública como instrumento de gobierno y se sostuvieron con tráfico comercial. La línea, el paso de montaña, 1868, la guarnición y el mercado de la lana son invención propia.",
  },
  {
    id: 'q21',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 2,
    tema: 'ciencia',
    regla:
      "Concordancia sujeto-verbo con una frase preposicional y una relativa interpuestas: el verbo concuerda con el núcleo del sujeto («row»), no con el sustantivo plural más cercano. El tiempo lo fija el verbo coordinado «and prints», en presente simple.",
    razones: {
      A:
        "Concuerda con lo más cercano: «gauges» y «the port authority» quedan entre el núcleo del sujeto y el hueco, pero pertenecen al bloque interpuesto. El núcleo es «row», singular, y sigue siéndolo por larga que sea la distancia hasta el verbo.",
      B:
        "Acierta el número —el pretérito no lo marca— y falla el tiempo: el verbo coordinado «and prints» va en presente simple y describe lo que la hilera hace cada diez minutos, de modo que un pasado deja la oración con dos tiempos incompatibles unidos por «and».",
      C:
        "Falla las dos cosas a la vez: el plural no concuerda con «row» y el presente perfecto choca con «and prints». Es el camino de quien copia la forma que tiene delante, «has kept», y la pluraliza para que case con «gauges».",
      D:
        "Correcta: el núcleo del sujeto es «the row», singular, aunque entre él y el verbo se interpongan «of gauges» y la relativa «that the port authority has kept along the estuary since 1892»; y el presente simple es el tiempo que exige el verbo coordinado «and prints».",
    },
    fuenteHecho:
      "Oceanografía de manual: el mareógrafo de flotador en pozo tranquilizador con registro sobre tambor de papel, y el nivel del mar como serie larga de esos registros. El puerto, el estuario y la fecha de 1892 son invención propia.",
  },
  {
    id: 'q22',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 3,
    tema: 'humanidades',
    regla:
      "Delimitación completa del elemento no esencial: un aposito se encierra entre dos comas y el par tiene que abarcar la unidad entera —aquí «a company of forty singers drawn from six streets of the same neighborhood», con el participio incluido, porque «drawn…» modifica a «singers»—. Ni se abre sin cerrar, ni se cierra sin abrir, ni se corta por la mitad; y ninguna coma suelta puede quedar entre el sujeto y su verbo.",
    razones: {
      A:
        "Cierra el aposito demasiado pronto. «Drawn from six streets of the same neighborhood» no es un añadido nuevo: modifica a «singers» y forma con él una sola unidad, así que la coma detrás de «singers» parte el inciso por la mitad y deja el participio suelto, pegado al verbo, en «…neighborhood meets in a room above a bakery». Es el error de quien encierra entre comas lo primero que le suena a aclaración y no comprueba dónde termina de verdad.",
      B:
        "Correcta: las dos comas encierran el aposito entero —«a company of forty singers drawn from six streets of the same neighborhood»— y devuelven el sujeto «The choir» a su verbo «meets». Un elemento no esencial se marca a los dos lados y abarca la unidad completa; suprimido el inciso, la oración sigue siendo la misma: «The choir meets in a room above a bakery».",
      C:
        "Deja el par desparejado por el lado de la apertura: el aposito entra sin ninguna marca, pegado a «choir», y en cambio aparece una coma delante de «meets» que, sin inciso abierto, no separa nada más que el sujeto de su verbo. Es el error de quien puntúa donde respira: la coma cae justo antes del verbo porque el sujeto se ha hecho largo.",
      D:
        "Abre el inciso y no lo cierra. La coma detrás de «choir» anuncia información añadida, pero sin la segunda coma el lector no sabe dónde vuelve la oración principal y llega a «…of the same neighborhood meets» leyendo el verbo como si perteneciera al aposito. Es el error de quien marca el comienzo de la aclaración y da la frontera por hecha.",
    },
    fuenteHecho:
      "Práctica coral aficionada, hecho libre: un coro sin audiciones cuya calidad se explica por horas acumuladas y no por selección. El coro, la ciudad, los jueves, la panadería y las cifras son invención propia.",
  },
]
