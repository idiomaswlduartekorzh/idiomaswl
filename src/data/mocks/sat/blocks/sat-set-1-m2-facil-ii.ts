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
 *    quien trabaja de noche eligió la noche (q10B); esconder la obra a medias es de artista
 *    (q11B); el hambre explica la patata (q12A); la prueba más fuerte es el mayor contraste
 *    (q13D); a quien no ve se le reconoce por la voz (q14B); en una imprenta los textos se
 *    acortan, y las hojas de sustitución se encuadernan (q15A, q15D).
 * 2. Ninguna opción es falsa por una marca visible sin el texto (R6): no hay absolutos
 *    sueltos, ni una sola opción con conector causal, ni una sola que compare cuando las
 *    demás no comparan. Cada distractor lo tumba una línea distinta del pasaje, y ninguna
 *    línea sirve para dos —salvo en q13, donde lo que separa a las cuatro es qué fila de la
 *    tabla se leyó.
 *
 * MEDIDO SOBRE LOS SIETE (contador del guardián: caracteres, y solape de palabras de
 * contenido con el `stimulus`):
 *
 * - Puerta 7 · longitud del texto: 107, 128, 83, 98, 132, 128 y 134 palabras-SAT. Dentro
 *   de 25-150 con margen por arriba en el más largo.
 * - Puerta 2 · la clave no es la opción más larga en ninguno de los siete (0 %, máximo
 *   30 %). Tampoco es la más corta en más de dos, para que no se acierte por el otro lado.
 * - Puerta 3 · la clave no es la que más repite palabras del texto en ninguno, ni la que
 *   menos en ninguno (0 % y 0 %, máximo 40 % por cada cara). Los solapes por ítem, en orden
 *   A-D: q09 7/6/5/3, q10 6/5/2/5, q11 2/1/3/2, q12 9/5/6/5, q13 11/12/10/10, q14 5/2/6/5,
 *   q15 7/2/6/6. La clave queda siempre en el medio, nunca en un extremo.
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
 *   central. Las cuatro opciones son lecturas literarias igual de redondas y tres de ellas
 *   —el peso del secreto, la reciprocidad del pueblo, la noche elegida— son las que una
 *   historia así suele traer. La clave no es la más bonita; es la única que el cierre del
 *   texto enuncia palabra por palabra.
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
      'Its water carries more peat than the southern basin does, and a darker pond takes in more of the low February sun.',
    ],
    answer: 1,
  },
  {
    id: 'q10',
    type: 'mcq',
    part: 1,
    stimulus:
      'For nine years Irina worked the night board at the telephone exchange. She had not chosen the shift; it was the one the exchange had open the year her mother died, and she stayed on it. She learned which houses called the doctor and at what hour, whose son telephoned from the capital and whose did not, which marriages were conducted entirely in the two minutes before midnight. In the market she was a woman who counted her change and said little. The same voices that had wept into her ear at three in the morning asked her at noon whether the plums were ripe. She never repeated any of it, and after a time she stopped thinking of it as keeping a secret. It was simply the shape of her days: the town talked to her all night and did not know her at all by daylight.',
    text: 'Which choice best states the main idea of the text?',
    options: [
      "Irina's nine years at the night board left her carrying more of those voices than any one woman could set down.",
      'Irina stayed on the night board for the quiet of it, and the quiet turned out to cost her more of the market than she had meant to pay.',
      "Irina's neighbors handed her the worst of their nights and, at noon in the market, paid her back for it in small ways.",
      'Irina came to know the town far better than it knew her, and in time she took that lopsidedness for the ordinary shape of a life.',
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
      'Between 1838 and 1852 the fields around Valmar went over from wheat to potatoes. The parish records give the reason plainly: three bad harvests in a row had left the wheat land exhausted, and the potato fed more people from less ground. Historian Emile Rojas is not persuaded that exhaustion is the whole of it. The tithe in that district, he points out, was collected in grain and had been for four centuries, while a field of potatoes owed the church nothing at all. What moved the plough, in his account, was the tax, and the failing harvests only made the arithmetic easier to see.',
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
      'the two voices, which had broken a full year apart and had never sounded the same depth since.',
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
      "Forty copies survive of the 1612 quarto of The Ferryman's Daughter. In twelve of them the third act carries a scene of ninety lines; in the other twenty-eight the same scene runs to twenty. Printers of the period altered type while the sheets were still going through the press, so copies of one book can differ, and the shop that printed this quarto worked a single press. Its type had one flaw that can be dated: a lowercase e with a crooked crossbar, which entered the shop's stock in March 1612 and marks every sheet it printed afterward. The crooked e runs all through the long version of the scene and appears nowhere in the short one. In all forty copies the leaves of that gathering are folded from a single sheet, with none cut out and none pasted in. Taken together, these details indicate that…",
    text: 'Which choice most logically completes the text?',
    options: [
      'the ninety-line scene was the version the shop set up first, and that seventy of its lines were cut away partway through the run.',
      'the two versions were set up at the same time and printed side by side, and that only one of the two settings drew on the crooked e.',
      'the twenty-line scene came off the press first, and that the ninety-line version was set into the type after the run had begun.',
      'the ninety-line scene was printed after the rest of the book was finished, and that it was slipped into twelve copies already made up.',
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
        'Convierte el trabajo en un peso, y la penúltima frase dice lo contrario: «after a time she stopped thinking of it as keeping a secret». Lo que carga con ella deja de pesarle y se le vuelve rutina. Es la lectura literaria de manual —quien guarda secretos los arrastra—, y por eso la marca quien decide por lo que suele significar una historia así en vez de por lo que esta dice.',
      B:
        'Le atribuye una elección que el texto le quita en su segunda frase: «She had not chosen the shift; it was the one the exchange had open the year her mother died». No hubo preferencia por la noche, ni un cálculo que le saliera caro. Es el error de quien supone que quien trabaja de noche eligió la noche.',
      C:
        'Inventa una reciprocidad que la escena del mediodía desmiente. A las tres de la mañana le lloran al oído y a mediodía le preguntan si están maduras las ciruelas: el pueblo ni le devuelve nada ni sabe que le debe algo, porque «the town talked to her all night and did not know her at all by daylight». Lo elige quien da por hecho que en un pueblo pequeño esas deudas se pagan.',
      D:
        'Correcta: es lo que enuncia el cierre del texto. «It was simply the shape of her days: the town talked to her all night and did not know her at all by daylight» da la desigualdad, y «after a time she stopped thinking of it as keeping a secret» es lo que la vuelve ordinaria en vez de dramática.',
    },
    fuenteHecho:
      'Ficción original. La centralita manual atendida de noche por una operadora es tecnología documentada de la primera mitad del siglo XX; el pueblo, Irina y todo lo demás están inventados.',
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
        'Invierte el orden que fija la letra estropeada. La e torcida entra en la imprenta en marzo de 1612 y marca todo lo que sale de ella a partir de entonces; está en la versión larga y no aparece en ninguna corta, de modo que la larga se compuso después, no primero. Es el error de quien da por hecho que un texto impreso se acorta y nunca se alarga, que es lo corriente en una imprenta y no lo que pasó aquí.',
      B:
        'Necesita dos composiciones tirando a la vez, y el texto lo impide: «the shop that printed this quarto worked a single press». Con una sola prensa no hay dos versiones simultáneas, y además la e torcida marca «every sheet it printed» desde marzo, así que no puede faltar en la mitad de una tirada posterior a esa fecha. Es la explicación que más suena a saber de imprentas, y por eso la marca quien elige la lectura más experta de las cuatro.',
      C:
        'Correcta: es lo único que cuadra con las tres cosas que el texto da. La e torcida entra en marzo de 1612 y marca cuanto se imprime después; está en toda la versión larga y en ninguna corta, luego las veintiocho cortas salieron antes; y como el pliego está entero en los cuarenta ejemplares, la versión larga tuvo que componerse de nuevo con la tirada ya en marcha.',
      D:
        'Hace de la escena larga una hoja añadida más tarde, y la última línea lo descarta: «In all forty copies the leaves of that gathering are folded from a single sheet, with none cut out and none pasted in». Encuadernar una hoja de sustitución era práctica corriente de la época, y por eso esta explicación le suena verosímil a quien sabe algo de libros antiguos; en estos ejemplares no hay nada cortado ni pegado.',
    },
    fuenteHecho:
      'Bibliografía analítica real: las correcciones en prensa (stop-press) producen ejemplares distintos dentro de una misma edición, y un tipo dañado y fechado permite ordenar las tiradas. La obra, la imprenta, la letra concreta y los cuarenta ejemplares están inventados.',
  },
]
