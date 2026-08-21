import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Information and Ideas del módulo `sat-set-1-m2-facil` — ítems q09 a q15.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 9-15). Las claves son las del plan y
 * no se negocian ítem a ítem: B, D, D, C, A, A, C. Cuando un ítem «pedía» otra letra se
 * movió el contenido entre opciones, nunca la clave; el reparto se defiende a nivel de
 * módulo y aquí solo se ve un cuarto del examen.
 *
 * ENUNCIADOS. Los fija el tipo, con la tabla del plan (contrastada el 20 ago 2026 con un
 * examen oficial de práctica). Aquí eso cambia dos cosas respecto del bloque equivalente
 * del módulo 1, que se escribió antes de tener la tabla:
 *
 * - Los dos `inferences` (q14 y q15) NO preguntan «what can most reasonably be inferred»,
 *   que es del SAT de papel y no aparece en el digital. El texto termina en puntos
 *   suspensivos y las cuatro opciones lo cierran, con el enunciado canónico «Which choice
 *   most logically completes the text?».
 * - El cuantitativo (q13) tampoco enuncia una afirmación que haya que sostener con datos:
 *   el texto se corta a mitad de frase y las opciones la completan con las cifras, bajo
 *   «Which choice most effectively uses data from the table to complete the text?». El
 *   motor solo pinta `stimulus`, así que la tabla va como texto plano —filas separadas por
 *   salto de línea, columnas por `·`— y va DELANTE de la prosa, que es donde el examen
 *   real pone la figura. Sus 156 caracteres cuentan para la puerta 7: si se cambia el
 *   separador, hay que volver a medir.
 *
 * CÓMO SE ESCRIBIERON LAS OPCIONES (R8, R9, R10). Primero las cuatro como objetos
 * indistinguibles —misma forma, mismo alcance, misma persona, longitudes parejas— y solo
 * después se comprobó cuál sostiene el texto. Dos consecuencias visibles:
 *
 * 1. En los siete ítems, el camino del sentido común lleva a un distractor, no a la clave.
 *    Es el error característico de este dominio, usado a propósito: la opción que es verdad
 *    en el mundo pero que el texto no sostiene. Un lago hondo se hiela más tarde (q09A);
 *    un estilo tardío es cosa del autor que envejece (q10A); esconder la obra a medias es de
 *    artista (q11B); el hambre explica la patata (q12A); la prueba más fuerte es el mayor
 *    contraste (q13D); a quien no ve se le reconoce por la voz (q14B); en una imprenta los
 *    textos se acortan (q15A y q15B) y el estado mayoritario es el que salió antes (ídem).
 * 2. Ninguna opción es falsa por una marca visible sin el texto (R6): no hay absolutos
 *    sueltos, ni una sola opción con conector causal, ni una sola que compare cuando las
 *    demás no comparan. Cada distractor lo tumba una línea distinta del pasaje, y ninguna
 *    línea sirve para dos —salvo en q13, donde lo que separa a las cuatro es qué fila de la
 *    tabla se leyó.
 *
 * MEDIDO SOBRE LOS SIETE (contador del guardián: caracteres, y solape de palabras de
 * contenido con el `stimulus`):
 *
 * - Puerta 7 · longitud del texto: 107, 122, 83, 97, 133, 128 y 133 palabras-SAT. Dentro
 *   de 25-150 con margen por arriba en los dos más largos.
 * - Puerta 2 · la clave no es la opción más larga en ninguno de los siete (0 %, máximo
 *   30 %). Tampoco es la más corta en más de dos, para que no se acierte por el otro lado.
 * - Puerta 3 · la clave no es la que más repite palabras del texto en ninguno, ni la que
 *   menos en ninguno (0 % y 0 %, máximo 40 % por cada cara). Los solapes por ítem, en orden
 *   A-D: q09 7/6/5/4, q10 6/7/4/5, q11 2/1/3/2, q12 9/5/6/5, q13 11/12/10/10, q14 5/2/6/5,
 *   q15 9/9/9/9. La clave queda siempre en el medio, nunca en un extremo; en q15 las cuatro
 *   empatan, que es el caso que el guardián trata como «no hay pista que explotar».
 *
 * DOS ÍTEMS QUE MERECEN NOTA, porque es donde el módulo 1 se cayó tres veces:
 *
 * - q13 es un 2×2 exacto y no una perturbación de la clave. Los dos factores son qué fila
 *   se toma para la cresta (Cape o North) y cuál para el valle (Elm o Pine), y las cuatro
 *   combinaciones aparecen una vez: cada pareja de cifras sale en dos opciones y contar
 *   repeticiones no delata nada. Además las cuatro sostienen igual de bien la tesis de la
 *   botánica —todas dan una cresta que salta de la sombra al sol y un valle que apenas se
 *   mueve—, así que la lógica no poda ninguna: solo la tabla decide. Y la heurística de
 *   «la prueba más fuerte» (salto de cresta más ancho, valle más plano) apunta a D.
 * - q10 es el único `central-ideas-details` de los dos que usa el enunciado de idea
 *   central, y desde la cuarta pasada es un ítem distinto (ver más abajo). Las cuatro
 *   opciones localizan el mismo giro en cuatro sitios —la frase, el asunto, la crítica, la
 *   editorial— con la misma plantilla, dos dentro del libro y dos fuera de él. La clave no
 *   es la lectura más fina: es la única que no choca con una línea del pasaje.
 *
 * SEGUNDA PASADA (21 ago 2026). El auditor de clave dio APTO a los siete y resolvió los
 * siete a ciegas coincidiendo con las claves del plan, pero el panel acertó q10 ocho veces
 * de diez SIN el texto. Lo que fallaba no era ninguna opción, sino la forma del juego: la
 * clave era la lectura más fina de las cuatro y se reconocía por el aspecto. Rehecho con
 * R12 (blueprint §4 bis), que es la regla que arregló lo mismo en el bloque de expresión:
 *
 * 1. Plantilla única. Las cuatro empiezan por las mismas tres palabras («Irina came to»),
 *    las cuatro llevan un comparativo «more/better … than» y las cuatro cierran con la
 *    misma coda literal —«and in time she took it for the ordinary shape of a life»—, que
 *    era lo que antes solo tenía la clave. La aceptación del final ya no distingue nada:
 *    lo único que separa a las cuatro es la mitad de en medio, y eso solo lo decide el
 *    texto. Longitudes 132/136/135/134 caracteres, dentro de una palabra.
 * 2. Asimetría de segundo orden reparcelada dos y dos. La clave era además la única en voz
 *    activa con Irina como sujeto que sabe; ahora A y C van en pasiva (le entregan, le
 *    devuelven) y B y D en activa (ella prefiere, ella conoce). El segundo término de la
 *    comparación tampoco delata: en dos opciones es Irina y en dos, la institución —el
 *    turno de la centralita y el pueblo—.
 * 3. Cada distractor sigue muriendo por una línea distinta: A por «stopped thinking of it
 *    as keeping a secret», B por «She had not chosen the shift», C por «did not know her
 *    at all by daylight». Ninguno es verdad a medias.
 *
 * En la misma pasada, cuatro cabos sueltos que señalaron los auditores y que se cerraron
 * sin tocar ninguna clave ni ninguna cadena de deducción:
 *
 * - q09 D decía «the low February sun» y en el texto no hay febrero: es enero y «three
 *   weeks after». Regalaba una eliminación por la razón equivocada. Ahora dice enero.
 * - q14 B tenía «never sounded the same depth since», el único absoluto del ítem y en una
 *   opción falsa: premiaba descartar por regla de examen. Suavizado a «had settled at
 *   different depths since». La opción sigue muriendo por lo mismo: Elvira los nombra
 *   «before either of them had said a word».
 * - q15 usaba `quarto`, `gathering` y `leaves`, vocabulario de bibliografía analítica que
 *   el texto no define y que en un módulo estándar cuesta tiempo y confianza. Ahora dice
 *   «the 1612 printing of» y «the pages of that section are folded from one sheet of
 *   paper». La e torcida, la prensa única y el pliego sin cortar siguen igual.
 * - q15 pedía además creer que setenta líneas cabían de más en el mismo pliego «sin cortar
 *   ni pegar nada», y una plana de cuarto lleva 35-40: eran casi dos planas. La diferencia
 *   baja a treinta líneas frente a doce —dieciocho, que se absorben recomponiendo el
 *   pliego— y los ejemplares pasan de 12/28 a 11/29 para que ningún numeral se repita con
 *   los de las líneas. La opción A dice ahora «eighteen of its lines».
 * - q12 escribía `plough`, grafía británica, en un examen que evalúa norma estadounidense
 *   y que es americano en todo lo demás: `plow`.
 *
 * TERCERA PASADA (21 ago 2026). El panel volvió a medir el bloque y devolvió dos ítems por
 * encima del umbral SIN el texto: q10 siete de diez —bajó de ocho, pero no lo bastante— y
 * q15 siete de diez, que antes no filtraba y lo empeoró la corrección anterior. Se
 * rehicieron con R13 (blueprint §4 bis), que corrige a R12: igualar la forma no cierra la
 * fuga, porque lo que filtra es el sentido.
 *
 * - q10 · la fuga era literaria. El molde único de la segunda pasada hizo lo que se le
 *   pidió —las cuatro empiezan por «Irina came to», misma coda literal, cuatro caracteres
 *   de diferencia— y el ítem siguió filtrando, porque entre cuatro afirmaciones sobre lo
 *   que le pasa a un personaje se adivina la que suena a idea central de un cuento bien
 *   hecho, y los cuentos bien hechos son predecibles. La clave daba una asimetría —el
 *   pueblo la conocía menos de lo que ella lo conocía— y las otras tres eran versiones más
 *   planas de esta misma historia; una de ellas, que le gustaba más el turno de noche, no
 *   es idea central de ningún relato, así que estaba muerta y además señalaba. Ahora cada
 *   distractor es la idea central impecable de un relato distinto: el precio de callar lo
 *   que se oye (A), la vida oída que acaba prefiriéndose a la vivida (B), el pueblo que
 *   devuelve en atenciones lo que recibe (C). Las cuatro llevan la misma asimetría
 *   comparativa y el mismo grado de generalidad, y solo el texto dice cuál de los cuatro
 *   cuentos es este: A muere en «stopped thinking of it as keeping a secret», B en «She
 *   had not chosen the shift», C en «did not know her at all by daylight».
 *
 * - q15 · la fuga era la opción sin compromisos. De las cuatro reconstrucciones, tres
 *   cargaban un dato que sin el pasaje no hay cómo comprobar —dieciocho líneas cortadas,
 *   once ejemplares con la hoja metida, un solo juego de tipos con la e— y la clave era la
 *   única limpia: una afirmación de orden y nada más. La opción que no se compromete con
 *   ningún detalle raro es la apuesta segura del que no ha leído; es la misma «opción más
 *   general» que R13 describe en estructura y función. Ahora las cuatro nombran las dos
 *   versiones y los dos recuentos, y se reparten en un 2x2: A y C son la misma frase con el
 *   orden invertido —recomponer el molde para acortar o para alargar— y B y D son las dos
 *   operaciones aparte, la segunda prensa y la hoja pegada. Cada valor de cada factor sale
 *   dos veces, así que contar no delata nada. El orden lo decide la e fechada; el
 *   mecanismo, la prensa única y el pliego sin cortar. A y C solo se distinguen por el
 *   primero, B y C solo por el segundo.
 *
 * - En el mismo ítem se invirtió el reparto de ejemplares: la escena larga está ahora en
 *   veintinueve copias y la corta en once, antes al revés. Con once largas, la versión que
 *   salió primero era también la mayoritaria, y «el estado que llevan más ejemplares es el
 *   que se imprimió antes» es una corazonada de bibliófilo que se tiene sin leer una línea
 *   y que apuntaba justo a la clave. Invertido el reparto, esa corazonada y la de que en
 *   una imprenta los textos se acortan llevan las dos a A. El razonamiento físico no
 *   cambia: la e sigue fechando el orden y las dieciocho líneas siguen cabiendo en el
 *   pliego recompuesto.
 *
 * - Lo que NO se tocó: las claves del plan (q10 D, q15 C), los dos enunciados, los tres
 *   datos de q15 —la e fechada, la prensa única, el pliego entero— y el texto de q10
 *   entero. Las puertas de conjunto siguen dentro: q10 longitudes 145/149/146/147 con la
 *   clave tercera, solapes 5/7/6/6 con la clave entre el mayor y el menor; q15 longitudes
 *   146/145/144/146 y solapes 11/9/10/7, misma posición. Los cinco ítems restantes del
 *   bloque no se tocaron.
 *
 * CUARTA PASADA (21 ago 2026). El módulo entero bajó a 21,5 % a ciegas (techo 35 %, azar
 * 25 %), pero q15 subió a 10/10 y q10 se quedó en 7/10. Los dos casos son la misma familia
 * de fuga por dos caminos distintos, y se cerraron de dos maneras distintas.
 *
 * - q15 · la misma fuga otra vez, por debajo del arreglo. El 2×2 de la pasada anterior era
 *   correcto como diseño y falso como juego de opciones: cada distractor cargaba un elemento
 *   exótico —una segunda prensa, una hoja pegada encima, un texto recortado a la mitad— y la
 *   clave era el único procedimiento de taller sin rareza. Quien no ha leído descarta las
 *   tres rarezas y acierta sin abrir el pasaje. Ahora las cuatro llevan un mecanismo igual de
 *   concreto y de corriente, y ninguna nombra nada que las otras no nombren: dos recomponen
 *   la plana en el mismo pliego («set again at N lines») y dos encuadernan una hoja compuesta
 *   aparte («a page set at N lines was bound into…»), cruzado con los dos órdenes posibles.
 *   Cada valor de cada factor sale dos veces. Lo que decide es la letra fechada —la e torcida
 *   entra en marzo de 1612, corre por la versión larga y falta en la corta, luego las once
 *   cortas son las primeras— y el pliego sin cortar, que descarta el papel añadido. La prensa
 *   única ya no mata a ninguna opción: ahora sostiene el «primero… y luego» que las cuatro
 *   comparten, porque con una sola prensa los dos estados no pudieron correr a la vez.
 * - Ninguna de las cuatro se puede descartar por sonar rara, y las dos corazonadas de
 *   imprenta que el ítem deja en pie —el texto se recorta, el estado mayoritario salió
 *   antes— apuntan las dos a A y a B, nunca a la clave.
 *
 * - q10 · retirado y sustituido, en vez de parcheado por cuarta vez. Tres versiones (la
 *   lectura fina, la plantilla única de R12, los cuatro cuentos distintos de R13) bajaron el
 *   ítem de 8/10 a 7/10 y ahí se quedó, porque la fuga no estaba en ninguna opción: estaba en
 *   el pasaje. La idea central del texto de Irina era la premisa misma del relato —conoce al
 *   pueblo entero de noche y el pueblo no la conoce de día—, y como las cuatro opciones
 *   tienen que revelar el escenario para ser relevantes (R13), revelan también el desenlace
 *   obvio de ese escenario. Ese ítem no se desfuga sin cambiar el texto, y cambiar el texto
 *   ya es escribir otro ítem (R2): se escribió otro directamente.
 * - El sustituto respeta lo que fija el plan —fila 10: `central-ideas-details`, literatura,
 *   dificultad 1, clave D— y cambia el defecto de fábrica: aquí la idea central NO es la
 *   lectura previsible del escenario. El pasaje reparte la responsabilidad de un cambio de
 *   estilo entre cuatro candidatos —la frase, el asunto, la crítica y la editorial— y los tres
 *   primeros los desmiente con una línea cada uno: los cuadernos de los años cincuenta (mata
 *   A), «the same three she had been writing about since her first book» (mata B) y la misma
 *   objeción en 1958 y en 1972 (mata C). Las cuatro opciones usan la misma plantilla, dos
 *   ponen el cambio dentro del libro y dos fuera de él, y la pareja más cercana —C y D— se
 *   distingue solo en cuál de las dos instituciones se movió, que es lo único que hay que ir
 *   a buscar al texto. El camino del sentido común lleva a A, el «estilo tardío» de manual.
 *
 * - Lo que NO se tocó en esta pasada: las claves del plan (q10 D, q15 C), los dos enunciados,
 *   el texto de q15 entero con sus tres datos, y los cinco ítems restantes del bloque. Todo
 *   lo que este comentario dice más arriba sobre Irina y la centralita es la historia de un
 *   ítem retirado, no del que está en el archivo.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q09',
    type: 'mcq',
    part: 1,
    stimulus:
      'Two lakes lie a kilometer apart in the same valley, and every winter the northern one freezes about three weeks after the southern one. Soundings put the two basins at the same depth, and both waters run the same tea color from the peat in the ground around them. The ridge that shelters the southern lake shelters the northern one as well; on a still January morning neither surface moves. What differs is where the water comes from. The southern lake fills each spring with snowmelt off the slopes. The northern one is fed from underneath, by a spring that leaves the gravel at nine degrees Celsius in July and at nine degrees in January.',
    text: 'According to the text, why does the northern lake freeze later than the southern one?',
    options: [
      "Its basin sits deeper than the southern lake, and its water takes in enough summer heat to hold the surface open three weeks into January.",
      'It is fed from below by a spring whose water leaves the gravel no colder in the middle of January than at midsummer.',
      'Its surface is kept moving all winter by the wind that funnels down the valley, and water that keeps moving freezes later.',
      'Its water carries more peat than the southern basin does, and a darker pond takes in more of the low January sun.',
    ],
    answer: 1,
  },
  {
    id: 'q10',
    type: 'mcq',
    part: 1,
    stimulus:
      'Critics have long treated the four novels Amparo Lascano published after 1970 as a late turn in her work: the short sentences, the three small towns, the endings that explain nothing. Her working notebooks, opened to readers in 2019, complicate that account. The short sentences and the unexplained endings are already in the drafts she wrote in the 1950s and put away. So are the towns, which are the same three she had been writing about since her first book. The reviews that greeted the late novels in 1972 raised just the objection the reviews of 1958 had raised. What was new after 1970 was her publisher: the editor who had demanded "a proper ending" in 1958 had sold the firm, and the editor who bought it demanded nothing.',
    text: 'Which choice best states the main idea of the text?',
    options: [
      "The turn critics date to 1970 was a change in Lascano's sentences rather than in the towns she wrote about.",
      "The turn critics date to 1970 was a change in the towns Lascano wrote about rather than in her sentences.",
      "The turn critics date to 1970 was a change in what her reviewers would accept rather than in what she wrote.",
      "The turn critics date to 1970 was a change in what her publisher would print rather than in what she wrote.",
    ],
    answer: 3,
  },
  {
    id: 'q11',
    type: 'mcq',
    part: 1,
    stimulus:
      "In an essay on the painter Ilse Marchetti, the critic Halima Rueda takes up the six sketchbooks Marchetti filled between 1948 and 1961. Museums have always hung them beside the canvases as studies for them. Rueda's claim is that they were nothing of the kind: drawing in the books was a separate occupation, carried on for its own sake, and Marchetti never expected anyone to look at it. Rueda draws her evidence from the letters Marchetti wrote to her sister, which the family made public in 2019.",
    text: "Which quotation from Marchetti's letters most effectively illustrates Rueda's claim?",
    options: [
      '"Nothing goes onto a canvas of mine that I have not drawn four or five times over in the books first, and usually a good deal more."',
      '"I asked that the unfinished canvases be turned to face the wall before any visitor at all was let up the stairs to the studio."',
      '"In the books it is always the market and the ferry; in the paintings, from first to last, there has never once been a person."',
      '"The books are not for the canvases and not for anybody; I draw in them as I walk to the river, and would if I stopped painting."',
    ],
    answer: 3,
  },
  {
    id: 'q12',
    type: 'mcq',
    part: 1,
    stimulus:
      'Between 1838 and 1852 the fields around Valmar went over from wheat to potatoes. The parish records give the reason plainly: three bad harvests in a row had left the wheat land exhausted, and the potato fed more people from less ground. Historian Emile Rojas is not persuaded that exhaustion is the whole of it. The tithe in that district, he points out, was collected in grain and had been for four centuries, while a field of potatoes owed the church nothing at all. What moved the plow, in his account, was the tax, and the failing harvests only made the arithmetic easier to see.',
    text: "Which finding, if true, would most directly support Rojas's argument?",
    options: [
      'In the parishes where the three bad harvests left the wheat land most exhausted, the ground given over to potatoes grew fastest over the decade that followed.',
      'In the parishes where the tithe was collected in grain, the families that planted potatoes came through the winter of 1846 better fed than their neighbors.',
      'In the parishes where the church began taking its tithe in potatoes too, the potato ground shrank within two seasons, though the land was as poor as ever.',
      'In the parishes where the tithe on grain was lifted altogether in 1844, the ground given over to potatoes went on growing at exactly the pace it had before.',
    ],
    answer: 2,
  },
  {
    id: 'q13',
    type: 'mcq',
    part: 1,
    stimulus:
      'Population · germinated in deep shade · germinated in full sun\nCape Ridge · 7% · 74%\nNorth Ridge · 9% · 71%\nElm Valley · 64% · 68%\nPine Valley · 57% · 60%\n\nA seed that sprouts in deep shade may spend itself before it ever reaches the light, and many plants of open ground carry a chemical switch that holds the seed dormant until light falls on it. Botanist Runa Hallden sowed two hundred seeds from each of four populations of a small annual, half in deep shade and half in full sun, and counted the share that came up within thirty days. She argues that the two ridge populations, which grow where nothing shades them, still carry the switch, and that the two valley populations, under forest for many generations, have lost it. The figures for North Ridge and Elm Valley fit her account:',
    text: 'Which choice most effectively uses data from the table to complete the text?',
    options: [
      'in deep shade only 9% of the North Ridge seeds came up, against 71% in full sun; the Elm Valley seeds went from 64% to 68%.',
      'the North Ridge seeds germinated at 7% in deep shade and at 74% in full sun; for the Elm Valley seeds the two figures were 64% and 68%.',
      '9% of the North Ridge seeds came up in deep shade and 71% in full sun, whereas Elm Valley moved only from 57% to 60%.',
      'deep shade held the North Ridge seeds down to 7%, against 74% in full sun, and the Elm Valley seeds to 57% against 60%.',
    ],
    answer: 0,
  },
  {
    id: 'q14',
    type: 'mcq',
    part: 1,
    stimulus:
      "Elvira had kept the corner shop for thirty years, and for the last eleven of them she could not have told you the color of a customer's coat. Her sight had gone slowly and then all at once. The Sarda twins were the one pair in town nobody else could sort out either; even their mother went by the haircuts. Rafael and Pablo came in at the end of the bakery shift they worked together, both of them off the same ovens, and they came in together, shoulder to shoulder, through the door with its three high steps. Pablo had broken an ankle at seven and had taken those steps one at a time ever since. From behind the curtain of the back room, before either of them had said a word, Elvira called out the two names in the order they came. She could only have been going by…",
    text: 'Which choice most logically completes the text?',
    options: [
      'the steps at the door, which Rafael went up in a bound while Pablo put a foot down on each one.',
      'the two voices, which had broken a full year apart and had settled at different depths since.',
      'the hour, since the bakery let Rafael off the ovens a good twenty minutes before it let Pablo go.',
      'the smell of the ovens, which would have hung about Rafael at the end of a shift and not about Pablo.',
    ],
    answer: 0,
  },
  {
    id: 'q15',
    type: 'mcq',
    part: 1,
    stimulus:
      "Forty copies survive of the 1612 printing of The Ferryman's Daughter. In twenty-nine of them the third act carries a scene of thirty lines; in the other eleven the same scene runs to twelve. Printers of the period altered type while the sheets were still going through the press, so copies of one book can differ, and the shop that printed it worked a single press. Its type had one flaw that can be dated: a lowercase e with a crooked crossbar, which entered the shop's stock in March 1612 and marks every sheet it printed afterward. The crooked e runs all through the long version of the scene and appears nowhere in the short one. In all forty copies the pages of that section are folded from one sheet of paper, with none cut out and none pasted in. Taken together, these details indicate that…",
    text: 'Which choice most logically completes the text?',
    options: [
      'the thirty-line scene was set first and printed for twenty-nine copies, and that its page was then set again at twelve lines for the remaining eleven.',
      'the thirty-line scene was set first and printed for twenty-nine copies, and that a page set at twelve lines was bound into the remaining eleven.',
      'the twelve-line scene was set first and printed for eleven copies, and that its page was then set again at thirty lines for the other twenty-nine.',
      'the twelve-line scene was set first and printed for eleven copies, and that a page set at thirty lines was bound into the other twenty-nine.',
    ],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q09',
    domain: 'II',
    tipo: 'central-ideas-details',
    dificultad: 1,
    tema: 'ciencia',
    razones: {
      A:
        'Da por buena la diferencia que el texto niega en su segunda línea: «Soundings put the two basins at the same depth». Que un lago hondo aguante más sin helarse es cierto fuera de este pasaje, y por eso es lo primero que se le ocurre a cualquiera que se pregunte por qué uno se hiela antes que otro; aquí no hay diferencia de fondo que explique el retraso. Es el error de quien contesta con lo que sabe de lagos en vez de con lo que se midió en estos dos.',
      B:
        'Correcta: es la única diferencia que el texto deja en pie, y la nombra él mismo. «What differs is where the water comes from»: el lago del sur se llena de deshielo, y el del norte «is fed from underneath, by a spring that leaves the gravel at nine degrees Celsius in July and at nine degrees in January». El agua que le entra en enero no llega a cero grados.',
      C:
        'Convierte una frase sobre el abrigo del viento en una diferencia de viento. El texto pone los dos lagos bajo la misma cresta —«The ridge that shelters the southern lake shelters the northern one as well»— y añade que en una mañana quieta de enero ninguna de las dos superficies se mueve. Que el agua en movimiento tarde más en helarse es verdad; lo que no hay aquí es una que se mueva y otra que no. Lo elige quien lee «shelters» y deduce que el viento separa a un lago del otro.',
      D:
        'Hace diferencia de un rasgo que el texto atribuye a los dos por igual: «both waters run the same tea color from the peat in the ground around them». Si la turba oscurece las dos aguas, no puede explicar por qué una se hiela tres semanas antes. Es el error de quien retiene el detalle más visual del pasaje y lo usa como si fuera un contraste.',
    },
    fuenteHecho:
      'Limnología de dominio público (un lago alimentado por manantial freático recibe agua a temperatura constante y se enfría más despacio que uno alimentado por deshielo); valle, lagos, distancias y cifras inventados.',
  },
  {
    id: 'q10',
    domain: 'II',
    tipo: 'central-ideas-details',
    dificultad: 1,
    tema: 'literatura',
    razones: {
      A:
        'Deja el cambio dentro de la prosa de Lascano, y los cuadernos lo desmienten: «The short sentences and the unexplained endings are already in the drafts she wrote in the 1950s and put away». Si la frase corta ya estaba veinte años antes, no puede ser lo que se movió después de 1970. Es la lectura de manual —el estilo tardío de quien se va despojando con la edad— y la marca quien reconoce la historia habitual antes de comprobar cuál cuenta esta.',
      B:
        'Mueve el cambio del cómo al qué, y el texto cierra esa puerta con la misma limpieza: los tres pueblos «are the same three she had been writing about since her first book». Después de 1970 no hay terreno nuevo. La elige quien lee la lista de la primera frase —frases cortas, pueblos pequeños, finales sin explicar— como inventario de novedades, sin ver que el pasaje la desmonta entrada por entrada.',
      C:
        'Saca el cambio de la escritora, que es el paso correcto, y lo pone en la institución equivocada. El pasaje fecha la respuesta de la crítica: «The reviews that greeted the late novels in 1972 raised just the objection the reviews of 1958 had raised». Con catorce años de por medio y la misma objeción, nadie se acostumbró a nada. Es la distractora más cercana a la clave, y la marca quien acierta el diagnóstico general y no lee las dos frases que separan a la crítica del editor.',
      D:
        'Correcta: junta las dos mitades del pasaje. Los cuadernos quitan el cambio de la escritura —frase corta, finales sin explicar y los mismos tres pueblos, todo anterior a 1970— y la última frase dice qué sí cambió: «What was new after 1970 was her publisher», con un editor que en 1958 exigía «a proper ending» y otro, tras la venta de la casa, que no exigió nada. El giro que la crítica fecha en 1970 está en lo que la editorial imprimía, no en lo que Lascano escribía. No es la lectura más fina de las cuatro: es la única que no choca con una línea del texto.',
    },
    fuenteHecho:
      'Ficción original: Amparo Lascano, sus novelas, sus cuadernos, la casa editorial y todas las fechas están inventados. El fenómeno de fondo sí es corriente en historia editorial —un cambio de estilo atribuido al autor puede deberse a un cambio en lo que su editor aceptaba imprimir—, y por eso el ítem se sostiene como lectura y no como dato. Sustituye al q10 anterior (Irina y la centralita), retirado en la cuarta pasada por fuga estructural: su idea central era la premisa misma del relato.',
  },
  {
    id: 'q11',
    domain: 'II',
    tipo: 'command-of-evidence-textual',
    dificultad: 1,
    tema: 'humanidades',
    razones: {
      A:
        'Dice justo lo contrario de la primera mitad de la afirmación. Si nada llega al lienzo sin haberse dibujado antes cuatro o cinco veces en los cuadernos, los cuadernos son preparación: exactamente la lectura de los museos que Rueda quiere desmontar. Es el error de quien busca la cita en la que aparecen las dos cosas —cuadernos y lienzos— sin comprobar en qué relación las pone.',
      B:
        'Prueba reserva, pero sobre el objeto equivocado. Lo que se vuelve contra la pared son los lienzos sin terminar; de los cuadernos no dice una palabra, y esconder la obra a medias lo hace media profesión. Es el error de quien retiene «never expected anyone to look at it» y lo engancha a la primera cita que hable de visitas.',
      C:
        'Sostiene que los cuadernos y los cuadros no tratan de lo mismo, que es una diferencia de asunto y no de función: unos apuntes del mercado pueden seguir siendo material para un cuadro sin figuras. Y no dice nada de quién podía verlos, que es la otra mitad de la afirmación. Lo elige quien toma la diferencia de motivo por diferencia de oficio.',
      D:
        'Correcta: cubre las dos mitades de la afirmación de Rueda en una frase. «Not for the canvases» niega que sean preparación, «not for anybody» niega el público, y compararlo con ir andando al río los describe como ocupación aparte, que seguiría existiendo aunque dejara de pintar.',
    },
    fuenteHecho:
      'Ficción académica original: ni la pintora, ni la crítica, ni el ensayo, ni las cartas existen. La práctica de exponer cuadernos de apuntes junto a los cuadros como estudios preparatorios sí es habitual en museos.',
  },
  {
    id: 'q12',
    domain: 'II',
    tipo: 'command-of-evidence-textual',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Apoya la explicación rival, no la de Rojas. Si donde la tierra quedó más agotada es donde antes y más deprisa se pasó a la patata, las tres malas cosechas bastan para contar el cambio y el diezmo sobra. Es el error de quien reconoce las dos variables correctas y no comprueba hacia dónde apuntan.',
      B:
        'Cambia una consecuencia por una causa. Que las familias con patatas pasaran mejor el invierno de 1846 dice qué se ganaba comiéndolas, no por qué se sembraron, y convive sin problema con que se sembraran por el agotamiento del suelo: no separa las dos explicaciones, que es lo único que el hallazgo tiene que hacer. Atrae a quien ve «tithe … collected in grain» y da por bueno cualquier hallazgo que nombre el diezmo.',
      C:
        'Correcta: quita la ventaja fiscal y deja intacta la explicación rival. Donde la iglesia empieza a cobrar el diezmo también en patatas, el sembrado retrocede en dos temporadas aunque la tierra siga igual de pobre. El agotamiento no ha cambiado y la decisión sí, así que lo que movía el arado era el impuesto, que es la tesis de Rojas.',
      D:
        'Va contra Rojas y parece ir a su favor porque habla de diezmos. Si allí donde se levantó el diezmo del grano la patata siguió ganando terreno al mismo ritmo, entonces la ventaja fiscal no era lo que la empujaba. Es el error de quien comprueba el tema del hallazgo y no su sentido.',
    },
    fuenteHecho:
      'Hecho documentado de historia agraria europea: el diezmo se cobraba en grano y en varias regiones la patata quedó fuera de él, lo que le dio una ventaja fiscal frente al trigo. Valmar, Rojas, las fechas y los cuatro hallazgos están inventados.',
  },
  {
    id: 'q13',
    domain: 'II',
    tipo: 'command-of-evidence-quantitative',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A:
        'Correcta: son las dos filas que el texto nombra, leídas cada una por su nombre. North Ridge marca 9 % a la sombra y 71 % al sol, que es la población de cresta conservando el interruptor; Elm Valley va de 64 % a 68 %, casi lo mismo con luz que sin ella, que es la población de valle habiéndolo perdido.',
      B:
        'Trae la fila de Cape Ridge, la que está justo encima: 7 % y 74 % son sus cifras, no las de North Ridge. La mitad del valle es exacta, así que la opción se sostiene hasta el punto y coma. Es el error de quien busca en la tabla la primera línea cuyo nombre acaba en «Ridge» y no comprueba cuál de las dos crestas nombra el texto.',
      C:
        'La mitad de la cresta es exacta y la del valle se va una línea más abajo: 57 % y 60 % son de Pine Valley, la fila siguiente a Elm Valley. Es el error de quien acierta la primera búsqueda, suelta la tabla y cuenta una fila de más en la segunda.',
      D:
        'Junta la primera fila de la tabla con la última: 7 % y 74 % son de Cape Ridge, y 57 % y 60 % de Pine Valley. Son además las dos filas que mejor parecen probar lo que sostiene la botánica —el salto de sombra a sol más ancho de los cuatro y el valle más plano—, así que es la opción de quien busca la prueba más fuerte en vez de la fila que el texto nombra.',
    },
    fuenteHecho:
      'Fotoblastismo real: muchas semillas de plantas de terreno abierto necesitan luz para germinar, y las poblaciones de sotobosque tienden a perder ese requisito. La botánica, las cuatro poblaciones y los ocho porcentajes están inventados; las especies van sin nombre científico.',
  },
  {
    id: 'q14',
    domain: 'II',
    tipo: 'inferences',
    dificultad: 1,
    tema: 'literatura',
    razones: {
      A:
        'Correcta: es lo único que le llega detrás de la cortina. Pablo «had broken an ankle at seven and had taken those steps one at a time ever since», y la puerta tiene tres escalones altos; Elvira los nombra «in the order they came», que es el orden en que suenan los dos modos de subir.',
      B:
        'Se apoya en algo que todavía no ha pasado: Elvira dice los dos nombres «before either of them had said a word». Reconocer por la voz es lo primero que se le ocurre a cualquiera cuando quien reconoce no ve, y por eso esta es la más votada de las tres falsas; el texto cierra esa puerta en la misma frase en la que la abre.',
      C:
        'Necesita que los gemelos lleguen separados, y llegan juntos: «they came in together, shoulder to shoulder», al final de un turno que hacen los dos. Si entran a la vez por la misma puerta, la hora no distingue a uno del otro. Es el error de quien resuelve con la rutina del pueblo en lugar de con lo que ocurre esa tarde.',
      D:
        'Reparte entre los hermanos un olor que el texto les da por igual: vienen del mismo turno y «both of them off the same ovens». El pan es el único dato sensorial del pasaje, y quien elige esta opción construye con él el mecanismo sin fijarse en que vale para los dos.',
    },
    fuenteHecho: 'Ficción original; la tienda, los gemelos y la ceguera de Elvira están inventados.',
  },
  {
    id: 'q15',
    domain: 'II',
    tipo: 'inferences',
    dificultad: 2,
    tema: 'humanidades',
    razones: {
      A:
        'Invierte el orden que fija la letra estropeada. La e torcida entra en la imprenta en marzo de 1612 y marca todo lo que sale de ella a partir de entonces; corre por toda la versión de treinta líneas y no aparece en ninguna de doce, de modo que la larga se compuso después y no primero. El mecanismo que describe es el de la clave —recomponer la plana dentro del mismo pliego— y es el correcto: esta opción falla solo en el orden, y por eso es la más cercana a C. Es además adonde llevan las dos corazonadas que el ítem deja en pie: que en una imprenta un texto se recorta para que quepa, y que el estado que llevan más ejemplares —aquí los veintinueve largos— es el que salió antes.',
      B:
        'Falla en los dos factores a la vez. Pone la versión larga primero, contra la fecha que da la e torcida, y compone el texto nuevo en una hoja aparte, contra la última línea del pasaje: en los cuarenta ejemplares esas páginas están «folded from one sheet of paper, with none cut out and none pasted in», y una hoja encuadernada sería papel distinto del pliego. La elige quien reconstruye la escena entera desde las dos corazonadas de imprenta —el texto se acorta, las hojas de sustitución se encuadernan— sin contrastar ninguna con el pasaje.',
      C:
        'Correcta: es la única que cuadra con los tres datos a la vez. La e torcida entra en marzo de 1612 y marca cuanto se imprime después; está en toda la versión de treinta líneas y en ninguna de doce, luego las once cortas salieron primero y la larga se compuso con la tirada ya en marcha. La prensa única es lo que permite hablar de un antes y un después: con una sola prensa los dos estados no pudieron correr a la vez. Y como en los cuarenta ejemplares esas páginas salen de una sola hoja «with none cut out and none pasted in», las dieciocho líneas de más tuvieron que caber recomponiendo el mismo pliego, que es lo que dice «set again at thirty lines». Se separa de A solo por el orden, que fija la letra, y de D solo por el mecanismo, que fija el pliego.',
      D:
        'Acierta el orden —la versión corta salió antes, como fecha la e torcida— y falla en el mecanismo. Encuadernar una hoja compuesta aparte era práctica corriente de la época, así que la reconstrucción se sostiene sola; lo que la descarta es la última línea del pasaje, que dice de los cuarenta ejemplares que esas páginas están «folded from one sheet of paper, with none cut out and none pasted in». Si no hay papel añadido, las dieciocho líneas de más solo caben recomponiendo el pliego. La marca quien resuelve el orden y da por bueno el primer procedimiento verosímil que se le ocurre para el resto.',
    },
    fuenteHecho:
      'Bibliografía analítica real: las correcciones en prensa (stop-press) producen ejemplares distintos dentro de una misma edición, y un tipo dañado y fechado permite ordenar las tiradas. La obra, la imprenta, la letra concreta y los cuarenta ejemplares están inventados. La diferencia entre las dos versiones se dejó en dieciocho líneas —treinta frente a doce— porque una plana de este formato lleva 35-40 y solo así el pliego admite el texto de más sin hoja añadida; el vocabulario técnico (quarto, gathering, leaf) se evitó a propósito, porque el texto no lo define. El reparto de ejemplares es 29 largos y 11 cortos, y ese sentido importa: con 11 largos, el estado mayoritario era el primero y la corazonada de que lo mayoritario salió antes apuntaba a la clave. Invertido, apunta a A. Las cuatro opciones nombran las dos versiones, los dos recuentos y un procedimiento de taller igual de corriente —recomponer la plana o encuadernar una hoja compuesta aparte—, de modo que ninguna se puede descartar por rareza.',
  },
]
