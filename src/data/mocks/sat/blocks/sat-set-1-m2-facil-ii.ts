import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Information and Ideas del módulo `sat-set-1-m2-facil` — ítems q09 a q15.
 *
 * Plan: docs/sat-planes/sat-set-1-m2-facil.md (filas 9-15). Las claves son las del plan y
 * no se negocian ítem a ítem: B, B, D, C, A, A, C. Cuando un ítem «pedía» otra letra se
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
 *    un estilo tardío es cosa del autor que envejece (q10A); callar el precio de compra es de
 *    comerciante (q11B); el hambre explica la patata (q12A); la prueba más fuerte es el mayor
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
 * - Puerta 7 · longitud del texto: 99,7, 125, 90, 97, 133, 128 y 146,5 palabras-SAT. Dentro
 *   de 25-150. El único ajustado es q15, que se lleva 3,5 palabras de margen desde que se
 *   glosó `set`: cualquier frase que se le añada exige quitar otra.
 * - Puerta 2 · la clave no es la opción más larga en ninguno de los siete (0 %, máximo
 *   30 %), y desde la sexta pasada tampoco es la más corta en ninguno (0 %), para que no se
 *   acierte por el otro lado. Longitudes por ítem, en orden A-D: q09 149/152/155/153,
 *   q10 107/107/108/105, q11 153/149/149/151, q12 146/156/154/150, q13 123/135/117/119,
 *   q14 95/93/97/101, q15 150/144/146/140.
 * - Puerta 3 · la clave no es la que más repite palabras del texto en ninguno, ni la que
 *   menos en ninguno (0 % y 0 %, máximo 40 % por cada cara). Los solapes por ítem, en orden
 *   A-D: q09 3/5/6/6, q10 6/5/4/7, q11 4/2/2/3, q12 11/4/7/6, q13 11/12/10/10, q14 5/2/6/5,
 *   q15 12/12/12/12. La clave queda siempre en el medio, nunca en un extremo; en q15 las
 *   cuatro empatan, que es el caso que el guardián trata como «no hay pista que explotar».
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
 *   opciones localizan el mismo giro en cuatro sitios —en orden: la frase, la editorial, la
 *   crítica, el asunto— con la misma plantilla, dos dentro del libro y dos fuera de él. La clave no
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
 *   A), «the same three she had been writing about since her first book» (mata D) y la misma
 *   objeción en 1958 y en 1972 (mata C). Las cuatro opciones usan la misma plantilla, dos
 *   ponen el cambio dentro del libro y dos fuera de él, y la pareja más cercana —B y C— se
 *   distingue solo en cuál de las dos instituciones se movió, que es lo único que hay que ir
 *   a buscar al texto. El camino del sentido común lleva a A, el «estilo tardío» de manual.
 *
 * - Lo que NO se tocó en esta pasada: las claves del plan (q10 D, q15 C), los dos enunciados,
 *   el texto de q15 entero con sus tres datos, y los cinco ítems restantes del bloque. Todo
 *   lo que este comentario dice más arriba sobre Irina y la centralita es la historia de un
 *   ítem retirado, no del que está en el archivo.
 *
 * QUINTA PASADA (21 ago 2026) — EQUIDAD Y HECHOS, no calidad de ítem. El auditor de clave
 * dio APTO a los siete y resolvió los siete a ciegas coincidiendo con el plan, y el panel
 * bajó a 15,9 % (azar 25 %). Lo que quedaba lo vio la revisión hecha pensando en un
 * estudiante colombiano: dos bloqueantes de equidad y dos cargas gratuitas.
 *
 * - q09 · la clave exigía saber en qué hemisferio pasa la escena. Decía «no colder in the
 *   middle of January than at midsummer», o sea que traducía a «midsummer» el «July» del
 *   texto. En el Cono Sur pleno verano es enero, así que para un lector del sur la clave
 *   era falsa; para uno del trópico, sin estaciones marcadas, era una inferencia cultural
 *   que el pasaje no pide. Y era además la única opción con comparativo negativo («no
 *   colder … than»): toda la densidad sintáctica del ítem estaba dentro de la respuesta
 *   correcta, lo que mide paciencia con el inglés y no comprensión. Ahora dice «at the same
 *   temperature in January as it does in July»: las mismas dos cifras del texto, ninguna
 *   estación, ningún comparativo negativo. Solape sin cambio (6, ni el mayor ni el menor);
 *   la clave pasa a ser la más corta de las cuatro por tres caracteres, y con q12 son dos de
 *   siete, el tope que este bloque se puso por esa cara.
 *
 * - q15 · el ítem se decidía con un verbo que el pasaje no introducía. Todo se juega entre
 *   «set again» (recomponer los tipos) y «bound into» (encuadernar una hoja aparte), y
 *   `set` en su acepción tipográfica solo aparecía en las opciones: el texto explicaba
 *   `type` y `press` y se quedaba a medio camino. Glosado dentro del pasaje, en el sitio
 *   donde empieza la mecánica de imprenta: «A page had to be set, its letters assembled one
 *   by one, before it could be printed». Es glosa, no pista: define el verbo igual para las
 *   cuatro opciones y no toca ninguno de los tres datos que resuelven el ítem.
 *
 * - q15 · el título tenía dueño, dos veces. «The Ferryman's Daughter» son dos novelas
 *   publicadas (Juliet Greenwood, 2020; Yasmin Angoe, 2026). Los títulos no tienen derecho
 *   de autor, pero la norma del proyecto es que ningún nombre del examen sea de alguien.
 *   Renombrada a «A Wager at Marlbeck», comprobado en buscador ANTES de fijarlo: sin
 *   resultados como título de obra, y «Marlbeck» solo aparece como casa de huéspedes y como
 *   mina en Inglaterra, nunca como obra. Quien lo vuelva a cambiar, que repita la búsqueda.
 *
 * - q11 · la clave llevaba «and would if I stopped painting»: elipsis verbal más condicional
 *   contrafáctico, y era la única opción con el verbo elidido. Carga gratuita en la respuesta
 *   correcta. Ahora dice «and would go on doing it if I stopped painting». Eso la alargaba
 *   quince caracteres y la dejaba como la más larga del ítem —la pista que este bloque tenía
 *   a cero—, así que se igualaron las cuatro con una coleta cada una: 142/138/142/142, tres
 *   empatadas arriba y ninguna máxima en solitario. Los solapes no se movieron (2/1/3/2) y
 *   las tres razones de distractor siguen siendo las mismas líneas del pasaje.
 *
 * - q13 · «a small annual» usaba *annual* como sustantivo (planta de ciclo anual) sin
 *   definirlo. Ahora «a small annual plant».
 *
 * - q10 · los cuadernos se catalogan en 1996 y los abre una biblioteca universitaria, no la
 *   familia en 2019. q10 y q11 son consecutivos y compartían armazón —creadora, papeles
 *   privados abiertos en 2019, lectura revisionista—: dos ítems seguidos así se leen como uno
 *   repetido. Cambia la fecha y quién abre el archivo; no cambia nada de la deducción, que
 *   depende de que los cuadernos sean de los años cincuenta.
 *
 * - Lo que NO se tocó: las claves del plan, los siete enunciados, los tres datos de q15 —la e
 *   fechada, la prensa única, el pliego entero—, el 2×2 de q13 y las cadenas de deducción de
 *   los siete. Condición de mantenimiento que pide el auditor de clave: la clave de q11 gana
 *   a su distractor C porque conserva las TRES piezas (no son estudios / ocupación aparte /
 *   sin público). No se recorta ninguna.
 *
 * REPARTO DE LETRAS POR BLOQUE (21 ago 2026) — permutación pura, sin contenido nuevo.
 *
 * El auditor de sesgo de conjunto midió el módulo entero: bien repartido en total
 * (A7 B7 C7 D6) y apilado por bloque. Aquí la clave era D en tres de siete y A en dos, y en
 * el bloque de gramática D en cuatro de siete sin una sola A. Quien cuente letras sube del
 * 25 % al 33 % sin leer nada; es la avería que en otro producto dejó cinco series publicadas
 * con la clave en A el 100 % de las veces, invisible revisando ítem a ítem y evidente
 * contando. En este bloque se movió **una sola clave: q10 D → B**. Reparto resultante:
 * **B B D C A A C** — A ×2, B ×2, C ×2, D ×1.
 *
 * - q10 · se intercambian las opciones B y D, y cada razón de distractor viaja con su
 *   opción: la editorial (clave) pasa de D a B y los pueblos, de B a D. Ni una opción se
 *   reescribió. Las dos parejas quedan contiguas —A y D son el par espejo frase/pueblos, B y
 *   C son las dos instituciones con la misma coleta «rather than in what she wrote»—, así que
 *   la clave no se distingue por forma de su vecina, que es la que hay que ir a descartar al
 *   texto. Longitudes 107/107/108/105 con la clave empatada en el medio (ni la más larga ni
 *   la más corta) y solapes 6/5/4/7 con la clave entre el mayor y el menor: las dos puertas
 *   de conjunto siguen dentro. El camino del sentido común —el «estilo tardío»— sigue
 *   llevando a A.
 * - Efecto que esto deja y que se asume: los dos `central-ideas-details` del bloque (q09 y
 *   q10) tienen ahora la clave en B. Con dos ítems no hay patrón explotable, y el reparto de
 *   letras se defiende a nivel de módulo, no de tipo de ítem.
 *
 * La fila 10 de `docs/sat-planes/sat-set-1-m2-facil.md` ya dice clave B, así que plan y
 * archivo vuelven a coincidir. Las pasadas que se cuentan más arriba siguen hablando de
 * «q10 D» porque cuentan lo que era verdad entonces; lo vigente es esta línea.
 *
 * SEXTA PASADA (21 ago 2026) — TRES DEFECTOS DE CONJUNTO. El auditor de sesgo resolvió el
 * bloque a ciegas y devolvió, por escrito, cómo había acertado tres ítems sin leer un solo
 * pasaje. Ninguno de los tres se veía revisando el ítem por separado: dos son parejas y el
 * tercero es la forma del juego de opciones.
 *
 * - q11 · escenario cambiado entero. Con q10 formaba pareja y los dos van seguidos: creadora,
 *   papeles privados, fecha en que se abre el archivo, crítica que da la vuelta al relato
 *   recibido, los dos del mismo dominio y los dos fáciles. La quinta pasada solo había movido
 *   la fecha y el custodio de q10 (1996, biblioteca universitaria, en vez de 2019 y la
 *   familia) y no bastó, porque el armazón seguía entero en los dos. Además q11 compartía
 *   racimo léxico con q08 del bloque CS —`painter`, `canvases`, `studio`, `unfinished`—, que
 *   va también de lienzos mal catalogados. Se quitaron las tres piezas de la pareja a la vez:
 *   ahora los hablantes son un gremio y no una creadora, la prueba es habla y no papel, y no
 *   hay archivo ni fecha de apertura. De las cuatro palabras del racimo no queda ninguna.
 * - Lo que se conservó de q11, pieza por pieza, porque es lo que lo hacía funcionar: tipo,
 *   dominio, tema, dificultad y clave (D); el enunciado de cita; la tesis de TRES piezas; la
 *   clave como única opción que cubre las tres; y los tres caminos de error, uno por
 *   distractor —afirmar lo contrario de la primera pieza (A), probar reserva sobre el objeto
 *   equivocado (B), tomar una circunstancia por la finalidad (C)—. La condición de
 *   mantenimiento que pidió el auditor de clave sigue escrita en `razones.D`, ya con las
 *   piezas nuevas y con cuál de las tres es la frágil.
 * - Escenario urbano a propósito. q12 va justo detrás y es rural (parroquias, trigo, patatas,
 *   diezmo), así que un q11 de campo —muros de piedra, pastores, cuadrillas— habría cambiado
 *   la pareja q10/q11 por una pareja q11/q12. Se descartó también cualquier escenario de
 *   música: q07, en el bloque CS, ya va de práctica interpretativa barroca.
 *
 * - q09 · el auditor lo acertó a ciegas y escribió por qué: la clave era «la única opción que
 *   nombra una fuente de calor permanente», y las otras tres anexaban una ley general que las
 *   delataba como razonamiento de distractor. Eran dos pistas, no una, y las dos estaban en la
 *   forma. Ahora las cuatro proponen una causa que dura todo el invierno y las cuatro cierran
 *   con una ley general: agua de fondo a temperatura fija todo el año (A), manantial a la
 *   misma temperatura en enero que en julio (B, la clave), superficie en movimiento (C) y
 *   punto de congelación rebajado por la turba (D). Las cuatro leyes son ciertas fuera del
 *   pasaje, así que ninguna se descarta por sonar inventada. A es ahora el espejo de la clave
 *   —también una reserva permanente, también desde abajo, también «los mismos grados en enero
 *   que en julio»— y solo la mata la línea de las sondas: «Soundings put the two basins at the
 *   same depth». El camino del sentido común (lago hondo, hielo tardío) sigue llevando a A.
 * - OJO: este arreglo NO cerró la fuga —el ítem volvió a filtrar nueve de diez— y lo que
 *   describe este párrafo (el viento del valle, la turba, la mañana de enero) es un juego de
 *   opciones retirado. Lo vigente es la séptima pasada, al final de esta cabecera.
 *
 * - q12 · el auditor lo acertó a ciegas contando: tres de las cuatro opciones nombraban el
 *   diezmo, luego el argumento iba del diezmo; de esas tres, una era la explicación rival y
 *   otra tenía forma de refutación de manual —se levantó el diezmo y no pasó nada—, así que
 *   solo quedaba una con forma canónica de prueba de apoyo. Se corrigieron las dos cosas.
 *   Ahora las CUATRO nombran el diezmo, las cuatro abren con la misma fórmula —«In the
 *   parishes where the church …»— y ninguna es un resultado nulo: el antiguo D se sustituyó
 *   por un hallazgo positivo que apunta al revés (la iglesia dobla el diezmo del grano y el
 *   sembrado de patata se reduce a la mitad), que va contra Rojas por el signo y no por la
 *   forma. C y D quedan como gemelas: misma intervención sobre el diezmo, mismo desenlace
 *   medido, mismo control sobre el estado de la tierra, y se separan solo en si el cambio
 *   quitó o aumentó la ventaja fiscal de la patata. B repite la intervención de la clave y
 *   cambia el desenlace que mide, de modo que «prefiere la opción que interviene sobre la
 *   variable causal» tampoco decide nada: esa heurística deja tres opciones en pie, no una.
 * - Lo que queda a ciegas en q12, medido y asumido: con dos descartes razonados —el hallazgo
 *   tiene que hablar de un cambio en el diezmo, y tiene que medir superficie sembrada y no
 *   alimentación— se llega a C y D, y ahí se acaba. Elegir entre las dos exige saber en qué
 *   dirección empuja la tesis de Rojas, y eso solo está en el pasaje. Techo a ciegas: 50 %.
 *   Antes era 100 % en un vistazo, que es lo que el auditor documentó.
 *
 * - Lo que NO se tocó en esta pasada: las siete claves del plan, los siete enunciados, los
 *   textos de q09, q10, q12, q13, q14 y q15 —ni una palabra—, el 2×2 de q13, los tres datos de
 *   q15 y las cadenas de deducción de los siete. Solo se reescribieron opciones y razones de
 *   q09 y q12, y el ítem q11 entero.
 *
 * SÉPTIMA PASADA (22 ago 2026) — q09, TERCER INTENTO, Y EL PRIMERO QUE TOCA EL PASAJE. La
 * sexta pasada igualó la FORMA de las cuatro opciones —causa que dura todo el invierno, ley
 * general al final, ninguna estacional— y el ítem siguió filtrando nueve de diez a ciegas,
 * exactamente igual que antes. Es R13 en su enunciado literal: lo que filtra es el sentido,
 * no la forma. Con las cuatro leyes ciertas pero de fuerza desigual, quien sabe algo de
 * física elige sin leer, porque de los cuatro mecanismos había uno que explicaba de verdad
 * un retraso de tres semanas —un aporte continuo de agua templada— y tres que como física
 * general son ciertos y como explicación de ESTE efecto son flojos: el agua del fondo de un
 * lago hondo no tiene nada que ver con cuándo se hiela la superficie, el viento del valle es
 * marginal y la turba baja el punto de congelación una cantidad despreciable. La clave era
 * la única causa suficiente. Igualar la forma no podía arreglar eso.
 *
 * El arreglo es de contenido y cambia el pasaje, que es lo que las dos pasadas anteriores
 * no se habían permitido. Las cuatro opciones son ahora los cuatro términos del balance de
 * calor invernal de un lago, y los cuatro explican retrasos de congelación medidos en la
 * literatura real:
 *
 * - A · calor almacenado según la profundidad. Es el primer predictor de la fecha de hielo
 *   en cualquier estudio de fenología lacustre, y el camino del sentido común sigue aquí.
 * - B · aporte freático continuo a temperatura constante. LA CLAVE, y a propósito la menos
 *   famosa de las cuatro: es la que un lector que ordene los mecanismos por potencia deja
 *   para el final, no la que marca sin leer.
 * - C · corriente de un caudal que atraviesa el vaso. El hecho más conocido de los cuatro
 *   —el agua que corre no se hiela—, puesto en un distractor.
 * - D · radiación solar de invierno. Un lago a la sombra de una loma se hiela antes.
 *
 * Dos ejes cruzados dos y dos, para que ninguno aísle a la clave. Por CLASE: dos hablan del
 * agua que le llega al lago (B y C) y dos, del vaso y su emplazamiento (A y D). Ese eje era
 * la fuga de fondo de la versión anterior, donde la clave era la ÚNICA opción sobre el
 * origen del agua frente a tres sobre el lago mismo, y la premisa —dos lagos a un kilómetro
 * en el mismo valle— hace poco creíble que difieran en el emplazamiento: sin leer una línea,
 * el origen del agua ya era la apuesta. Por NOTORIEDAD: dos son el primer reflejo de
 * cualquiera (A hondo, C corriente) y dos hay que pensarlas (B manantial, D sol). La clave
 * comparte clase con C y notoriedad con D, y no queda sola en ninguno de los dos.
 *
 * El pasaje pasa de tres líneas que igualan a tres que igualan otras cosas, una por
 * distractor y ninguna sirve para dos: las sondas dan la misma profundidad (mata A), «Neither
 * lake has a stream running into it or out of it the year round» (mata C) y «neither shore
 * loses an hour of the low winter sun to it» (mata D). Las dos primeras niegan; la tercera
 * iguala, que es una forma distinta de matar y la más difícil de ver. Se cayó la línea de la
 * turba y el color a té, que ya no hace falta, y se cayó «on a still January morning», con lo
 * que en el pasaje no queda un solo mes atado a una estación: enero y julio solo aparecen
 * como las dos temperaturas del manantial, y el ítem se lee igual en los dos hemisferios.
 * Eso completa por el lado del texto lo que la quinta pasada había arreglado solo en la
 * opción.
 *
 * Medido de nuevo: puerta 7, el texto baja de 107 a 99,7 palabras-SAT (dentro de 25-150).
 * Puerta 2, longitudes 149/152/155/153, cinco caracteres entre la mayor y la menor y la
 * clave ni la más larga ni la más corta —desde la quinta pasada era la más corta, así que
 * el bloque baja de dos a uno de siete por esa cara, el que queda es q12—. Puerta 3, solapes
 * 3/5/6/6: la clave estrictamente entre el máximo y el mínimo, y a un punto del mejor
 * distractor (el fallo duro salta a partir de tres).
 *
 * Lo que queda a ciegas, medido y asumido, en la línea de q12: la premisa —dos lagos a un
 * kilómetro en el mismo valle— sigue haciendo algo más creíble que la diferencia esté en el
 * agua que llega y no en el emplazamiento, y eso deja en pie a B y a C. Ahí se acaba: elegir
 * entre las dos exige saber si este lago tiene un caudal que lo atraviesa, y eso solo está en
 * el pasaje. Techo a ciegas 50 %, y de las dos que quedan la famosa es C, no la clave.
 *
 * Lo que NO se tocó: la clave del plan (q09 B), el enunciado, la fila del plan entera —II,
 * `central-ideas-details`, ciencia, dificultad 1— y los otros seis ítems del bloque. La
 * dificultad de esa fila la corrige la octava pasada, aquí abajo.
 *
 * OCTAVA PASADA (22 ago 2026) — BAJAR EL PRECIO, NO CERRAR OTRA FUGA. Es la primera pasada
 * de este bloque que no viene de un auditor de sesgo, sino del calibrador, y lo que trae es
 * la factura de las siete anteriores.
 *
 * EL DIAGNÓSTICO, que es lo importante y no cabe en un ítem. La rama estándar del módulo 2
 * mide 10,48 de media y el módulo 1 mide 10,07: quien NO llega al corte recibe un módulo más
 * difícil que el que acaba de fallar, así que la adaptación empuja al revés. El plan pedía
 * 13 fáciles / 11 medios / 3 difíciles y lo medido fue 6 / 8 / 13, con UN solo ítem de
 * lectura en banda fácil de los veinte que hay. La causa no es un descuido: es exactamente
 * lo que llevamos siete pasadas haciendo. Cada arreglo contra la prueba a ciegas acerca las
 * cuatro opciones entre sí, y «distancia entre opciones» es uno de los cinco ejes del
 * calibrador. Subimos ese eje siete veces y nadie midió el precio.
 *
 * DE DÓNDE SE SACA LA REBAJA. La distancia entre opciones NO se toca: ahí vive todo el
 * trabajo contra la fuga, y devolverla resucita las siete pasadas. Quedan los otros dos ejes
 * que este bloque puede mover sin tocar una sola cadena de deducción: **T**, complejidad del
 * pasaje, y **L**, cuántas partes hay que cruzar. Los dos son del texto, no de las opciones.
 *
 * - q09 · pasaje intacto; las cuatro opciones recortadas sin quitarles nada. Medían
 *   149/152/155/153 y miden 132/128/132/121: 609 caracteres de opción bajan a 513, un 16 %
 *   menos de lectura por ítem. Sobrevive entero el diseño de la séptima pasada —los cuatro
 *   términos del balance de calor, el cruce dos y dos por clase (agua que llega: B y C) y por
 *   notoriedad (primer reflejo: A y C), y la ley general al final de las cuatro—. Lo que se
 *   fue son perífrasis: «a great deal more» → «far more», «water that keeps traveling» →
 *   «water traveling», «the way water standing in one does» → «as standing water does»,
 *   «a lake that goes on taking sun in through the winter» → «a lake taking in sun all
 *   winter». Solapes 3/5/6/6 → 4/5/6/7, con la clave estrictamente entre el mayor y el menor,
 *   y la clave sigue sin ser la más larga ni la más corta.
 * - OJO al recortar más este ítem: la clave NO puede volver a la elipsis. Un borrador de esta
 *   misma pasada dejó «and water that warm keeps the ice away» —cuatro caracteres menos— y eso
 *   es exactamente la carga sintáctica gratuita en la respuesta correcta que quitó la quinta
 *   pasada. Vale «water arriving that warm», con el participio puesto. Lo mismo con la
 *   longitud: quitar esos cuatro caracteres dejaba a la clave como la más corta en solitario.
 *
 * - q11 · igual, y con un encargo extra del calibrador: la clave repetía palabra por palabra
 *   las dos negaciones del pasaje («settling prices», «shut anybody out»), que roza la puerta
 *   de solape léxico. Una de las dos está ahora parafraseada: «not for shutting anyone out» →
 *   «it locks nobody out». Las opciones bajan de 153/149/149/151 a 144/130/134/137, un 9,5 %.
 *   El recorte es menor que en q09 y el motivo es estructural, no descuido: la clave tiene que
 *   cargar TRES piezas y las otras tres opciones tienen que quedarse a su lado para que no sea
 *   la más larga, así que el suelo del ítem son unos 130 caracteres por opción. Las tres piezas
 *   siguen enteras y el verbo del final sigue sin elidir —la condición de mantenimiento que
 *   escribió el auditor de clave se respeta y está anotada en `razones.D`—. Solapes 4/2/2/3 →
 *   4/1/2/3, clave interior.
 *
 * - q10 · el pasaje. Llevaba CINCO fechas (1970, 1996, los años cincuenta, 1958, 1972) y
 *   obligaba a sostener cuatro sitios a la vez, y de esas cinco solo dos entran en alguna
 *   deducción. Se caen tres. «Catalogued by a university library in 1996» era un resto del
 *   primer intento de deshacer la pareja con q11 —pareja que ya no existe desde que la sexta
 *   pasada cambió q11 entero—, así que sobraba: los cuadernos entran ahora sin fecha ni
 *   custodio. Y la línea que mata a C exigía además aritmética: «the reviews … in 1972 raised
 *   just the objection the reviews of 1958 had raised» pedía colocar dos años a un lado y a
 *   otro de 1970 para ver que la crítica no se había movido. Ahora lo dice con palabras —«The
 *   reviews of the late novels raised the very objection her earliest reviews had raised»—, que
 *   es el mismo hecho sin cuentas. Pasaje 124,7 → 113,0 palabras-SAT.
 * - Lo que NO se hizo en q10, y es la tentación obvia: fundir en una sola línea las dos que
 *   matan a A y a D. Habría quitado un salto más, pero rompe la propiedad de que cada
 *   distractor muere por una línea distinta, que es lo que impide que un descarte valga por
 *   dos. Se prefirió pagar el salto. Las cuatro opciones no se tocaron: siguen 107/107/108/105
 *   y los solapes salen idénticos, 6/5/4/7.
 *
 * - q15 · el pasaje más caro del módulo entero y el que estaba a 3,5 palabras del tope de la
 *   puerta 7. Baja de 146,5 a 129,5 palabras-SAT (879 → 777 caracteres) y, sobre todo, baja de
 *   registro. Se cae la frase de bibliografía material —«printers of the period altered type
 *   while the sheets were still going through the press, so copies of one book can differ»—,
 *   que era la más subordinada del pasaje y que ya no hace falta: las dos primeras frases dan
 *   el hecho (veintinueve ejemplares dicen una cosa y once dicen otra) y la prensa única da la
 *   secuencia. Se cae «the third act», que no lo usa ninguna opción. La glosa de *set* se
 *   reescribe más llana: «To print a page, a worker first had to set it: put its letters in
 *   place one at a time». «Crooked» pasa a «bent» y «entered the shop's stock» a «arrived»,
 *   que es el mismo dato en palabras corrientes. Y «long version / short one» pasa a
 *   «thirty-line scene / twelve-line one», que ahorra al lector tener que recordar cuál era
 *   cuál.
 * - En q15 se ACLARÓ algo a propósito, que es lo contrario de recortar: la prensa única
 *   dice ahora en el texto lo que hasta hoy solo estaba en `razones.C` —«so it could not print
 *   two versions of a page at the same time; one had to come first»—. Es gratis en términos de
 *   adivinanza: el «primero… y luego» lo comparten las CUATRO opciones, así que explicitarlo
 *   no separa a ninguna de ninguna. Solo ahorra el paso de deducirlo. Los dos datos que sí
 *   deciden —la e fechada (orden) y el pliego sin cortar (mecanismo)— siguen dichos y sin
 *   comentar, y la frase que citan tres razones sigue literal: «folded from one sheet of paper,
 *   with none cut out and none pasted in». Las cuatro opciones, intactas; sus solapes siguen
 *   empatados entre sí, que es el caso que el guardián lee como «no hay pista que explotar».
 *
 * REETIQUETADO. La dificultad declarada era la del plan y no la medida. Queda: q09 2, q10 2,
 * q11 2, q12 3, q13 2, q14 3, q15 3. De esas, cinco son la medición del calibrador tal cual;
 * dos las remido aquí porque el pasaje ha cambiado debajo:
 *
 * - q10 · medía 12 (difícil). Con el pasaje nuevo bajan dos ejes —complejidad del texto y
 *   número de partes que cruzar— y lo mido en 10: **medio**, no difícil. No baja a fácil, y no
 *   puede: para eso habría que acercar la clave a los distractores, que es justo lo prohibido.
 * - q15 · medía 14, el más alto del bloque. Bajo T y lo mido en 13: sigue **difícil**. Que el
 *   pasaje se lea más fácil no cambia que haya que cruzar tres datos y cerrar una inferencia;
 *   ese ítem no sale de la banda 3 sin tocar sus opciones. Queda dicho para que nadie lo
 *   reetiquete a la baja sin haberlo rehecho.
 *
 * El calibrador dio sumas, no el desglose por eje; el desglose de estos dos párrafos es mío y
 * se puede discutir eje por eje, que es para lo que está la tabla del blueprint.
 *
 * EFECTO EN EL MÓDULO, dicho sin adornos: la mezcla declarada pasa de 12/10/5 a 8/11/8. Va a
 * peor sobre el papel, y es lo correcto: antes decía 12 fáciles porque nadie había medido.
 * Tres de los ocho difíciles están en este bloque (q12, q14, q15) y el plan pedía tres en el
 * módulo ENTERO. Esto no se arregla reetiquetando ni recortando más aquí: hace falta que los
 * otros tres bloques bajen, o ítems fáciles nuevos. Es una decisión de módulo, no de bloque.
 *
 * Lo que NO se tocó en esta pasada: las siete claves del plan, los siete enunciados, las
 * opciones de q10, q12, q13, q14 y q15 —ni un carácter—, la lógica y el reparto de las
 * veintiocho opciones del bloque, las razones de distractor de los siete (solo se actualizaron
 * las citas que el texto movió, y en q11 la paráfrasis pedida), el 2×2 de q13, el 2×2 de q15,
 * los tres datos de q15 y las cadenas de deducción de los siete.
 *
 * PENDIENTE, y bloquea el APTO: q09, q10, q11 y q15 han cambiado, así que el módulo necesita
 * volver a pasar por el auditor de clave y por la prueba a ciegas antes de firmar acta. La
 * huella del guardián cubre enunciado, opciones, clave y `stimulus`: un acta firmada antes de
 * hoy ya no describe este archivo.
 *
 * NOVENA PASADA (22 ago 2026) — q09: UNA COMA, Y LO QUE NO SE HIZO PARA GANARLA. Un solo
 * cambio en el bloque, más una etiqueta. La octava pasada bajó T (complejidad del pasaje) y
 * el calibrador confirmó las dos cosas que importaban: el texto bajó y la distancia entre
 * opciones no se movió ni una décima. La prueba a ciegas se quedó en 19,8 % (techo 35, azar
 * 25). Queda el otro eje del texto, **L**: cuántas partes del pasaje hay que cruzar.
 *
 * q09 medía 9 y el calibrador dijo por qué: niega tres causas rivales en tres oraciones
 * separadas. Ahora dos de esas tres van en la misma oración —«Soundings put the two basins at
 * the same depth, and neither lake has a stream running into it or out of it the year round»—
 * y el pasaje pasa de cuatro paradas (profundidad · sol · caudal · manantial) a tres. **Lo
 * mido en 8**: L baja un punto, T no se toca (no se ha quitado ni añadido una idea; la única
 * palabra nueva del pasaje es «and») y la distancia entre opciones no se toca en absoluto.
 *
 * LA TENSIÓN, resuelta y dicha: ¿comparten asesino ahora dos distractores? No, y la línea
 * que separo es entre PROPOSICIÓN y ORACIÓN. Lo que protege al ítem es que ninguna
 * proposición mate a dos opciones: quien tiene el dato de la profundidad puede descartar A y
 * nada más; quien tiene el del caudal descarta C y nada más. Ninguno de los dos implica al
 * otro, así que ningún descarte vale por dos. Lo que se ahorra es un salto de vista, no un
 * paso de razonamiento. La prueba de que esa es la lectura buena está dentro del propio
 * ítem: D muere por una oración que ya lleva dos cláusulas coordinadas («The same ridge
 * stands over both, and neither shore loses an hour of the low winter sun to it») y nunca se
 * ha contado como una cláusula matando dos cosas.
 *
 * Lo que por eso mismo NO se hizo, y es donde la tensión sí muerde:
 *
 * - **No se fundieron A y D**, que era la pareja de oraciones contiguas más fácil de juntar.
 *   Las dos son «los dos lagos son iguales en X» —misma profundidad, mismo sol—, y una junto
 *   a la otra dentro de una oración se leen como una sola afirmación («son idénticos»)
 *   aunque no lo diga ninguna palabra. Ahí sí un descarte valdría por dos. A (una medida que
 *   sale igual) y C (un rasgo que no tiene ninguno de los dos) tienen forma distinta y
 *   coordinan sin fundirse.
 * - **No se escribió ninguna fórmula que generalice**: nada de «the two basins are alike in
 *   depth and in exposure» ni «the lakes differ in nothing but the water». Eso es una sola
 *   proposición cubriendo dos o tres opciones, y es exactamente el atajo que la octava pasada
 *   se negó a tomar en q10.
 * - **El orden de las tres primeras oraciones no es libre.** `razones.A` dice «la diferencia
 *   que el texto niega en la segunda línea», así que el dato de la profundidad tiene que
 *   seguir en la segunda oración. Por eso la que se mueve al tercer puesto es la del sol, no
 *   la de las sondas. Quien reordene esto sin leer las razones rompe una cita.
 *
 * DIVERGENCIA DE UNA LETRA, a propósito y anotada. Esta ronda prohíbe tocar las opciones y
 * sus razones, y `razones.C` cita «Neither lake has a stream running into it or out of it the
 * year round» con la N mayúscula que tenía cuando era oración entera. En el texto esa cláusula
 * ya no abre oración y va en minúscula. La cita no se ha modificado porque no se podía: es una
 * diferencia de un carácter, el resto es literal y localiza igual. Que la arregle la primera
 * pasada que tenga permiso para escribir en las razones.
 *
 * BANDA, sin adornar: 8 NO es fácil en la escala de este proyecto. Los reetiquetados del
 * bloque CS fijaron el corte —q02 midió 7 y quedó en 1; q01 midió 8 y quedó en 2—, así que
 * **q09 sigue declarado 2**, ahora en el suelo de la banda media. Lo que baja es el suelo del
 * bloque, de 9 a 8. El módulo sigue con **cero ítems de lectura en banda fácil**, y este
 * cambio no lo arregla: para eso hace falta un ítem de lectura nuevo o bajar alguno acercando
 * sus opciones, que es lo que sigue prohibido. Queda dicho para que nadie lea esta pasada
 * como el cierre de ese número.
 *
 * ETIQUETA: **q14 pasa de 3 a 2**. Mide 11 y estaba declarado 3; 11 es banda media por el
 * mismo corte de arriba. El ítem no se toca —ni pasaje, ni enunciado, ni opciones, ni
 * razones—: solo se corrige lo declarado. Puerta 9: el grupo `inferences` queda q14 2 → q15 3,
 * que sigue siendo creciente. Mezcla declarada del módulo: de 8/11/8 a 8/12/7.
 *
 * MEDIDO tras el cambio: puerta 7, el pasaje de q09 pasa de 99,7 a 100,3 palabras-SAT (602
 * caracteres, dentro de 25-150). Puerta 3, solapes idénticos —4/5/6/7, clave interior—: era
 * lo esperado, porque «and» es palabra vacía para el guardián y no entra ni sale ninguna otra
 * palabra del pasaje. Puerta 2, longitudes intactas: 132/128/132/121, clave ni la más larga ni
 * la más corta. La prueba a ciegas no puede haberse movido por construcción: el extractor
 * manda enunciado y opciones y NO manda el `stimulus`, que es lo único que ha cambiado hoy.
 *
 * Lo que NO se tocó: las siete claves, los siete enunciados, las veintiocho opciones, las
 * veintiocho razones, los pasajes de q10 a q15 —ni un carácter—, y las cadenas de deducción
 * de los siete.
 *
 * PENDIENTE, y sigue bloqueando el APTO: el `stimulus` de q09 ha vuelto a cambiar, así que la
 * huella del guardián sobre ese ítem cambia con él y el acta pendiente desde la octava pasada
 * sigue pendiente. El auditor de clave tiene que volver a resolver q09 sobre este texto.
 *
 * DÉCIMA PASADA (22 ago 2026) — q13: SE PARTE EL PASAJE MÁS DENSO DEL MÓDULO, Y LA ETIQUETA
 * DEJA DE MENTIR. Un solo ítem, y de ese ítem solo el `stimulus`.
 *
 * Medido antes sobre los veintisiete pasajes del módulo: q13 encabezaba la lista con **28,5
 * palabras por oración** (27,8 en la medición del calibrador; la diferencia es de contador, no
 * de texto), cuatro oraciones, tres de ellas de 36, 36 y 31. El segundo era q20 del bloque SEC,
 * con 24,0. No era un pasaje denso más: era el único fuera de la banda 17-24 en la que cabe el
 * resto del módulo.
 *
 * **Partirlo es gratis aquí y no lo sería en otro ítem**, y conviene decir por qué antes de que
 * alguien copie la operación: q13 es cuantitativo, el pasaje es andamio y no objeto —lo que
 * decide son las cifras de la tabla—, y las cuatro razones no citan del pasaje más que los dos
 * nombres de fila y sus números. No hay ninguna cita del texto que un corte pueda romper. En
 * q09, q12 o q15 no vale el mismo argumento: ahí las razones citan cláusulas enteras.
 *
 * Queda en **16,6 de media y 26 la más larga**, siete oraciones. Con eso **T (complejidad del
 * texto) baja de 3 a 2 y el ítem pasa de 13 a 12**. Sigue en banda difícil (12-15), así que
 * **q13 pasa de declarado 2 a declarado 3**: la etiqueta era falsa antes del corte —13 contra
 * 2— y lo seguiría siendo después. El desglose, para que se pueda discutir eje por eje:
 * T 2 · L 3 · D 3 · A 2 · E 2.
 *
 * DÓNDE ESTÁ LA DUDA, dicha entera: la regla del eje T da 1 «si la media < 18 **y** el léxico es
 * frecuente **y** el tema concreto». La media ahora es 16,6, y las otras dos condiciones no se
 * cumplen —«dormant», «germinated», «populations», «chemical switch», «annual plant» no son
 * léxico frecuente, y lo que el pasaje explica es un mecanismo de latencia, no una escena—, así
 * que lo mido en 2 y no en 1. Si un calibrador lo lee como T=1, el ítem cae a 11 y con él la
 * etiqueta a 2; queda escrito para que esa discusión se tenga sobre la regla y no sobre el
 * número. Lo que no cambia en ninguna de las dos lecturas: declarar 2 con el texto viejo era
 * falso, y hoy lo declarado se corresponde con lo medido.
 *
 * Puerta 9: q13 es el único `command-of-evidence-quantitative` del bloque, así que subir su
 * etiqueta no puede romper ninguna curva de grupo (`central-ideas-details` q09 2 → q10 2;
 * `command-of-evidence-textual` q11 2 → q12 3; `inferences` q14 2 → q15 3). Mezcla declarada
 * del módulo: de 8/12/7 a 8/11/8.
 *
 * LO QUE EL CORTE NO TOCA, y es lo único que hace difícil este ítem: **el 2×2 de la tabla**
 * —dos crestas y dos valles, cada uno con sus dos cifras— sigue intacto, y con él la única
 * razón por la que q13 no se puede resolver sin mirar la tabla. Tampoco se tocan las cuatro
 * opciones ni las cuatro razones, ni las dos filas que el pasaje nombra: North Ridge y Elm
 * Valley siguen nombradas en la última oración y en ninguna otra, que es lo que sostiene las
 * razones de B, C y D.
 *
 * ATRIBUCIÓN, que es lo que un corte mal hecho se lleva por delante: la tesis iba en una sola
 * oración («She argues that… and that…») y ahora va en dos, así que la segunda mitad lleva su
 * propia marca —«The two valley populations, **she argues**, have lost it…»—. Sin ella, la
 * pérdida del interruptor en los valles pasaría a afirmarla el texto, y la razón de D —quien
 * elige las dos filas que mejor **parecen probar lo que sostiene la botánica**— se quedaría sin
 * sujeto a quien atribuir nada.
 *
 * MEDIDO tras el cambio, con el contador del guardián: puerta 3, el solape léxico de las cuatro
 * opciones sigue en **11/12/10/10** —ni un tipo léxico entra ni sale del pasaje; lo que se va
 * son tres «and» y lo que entra son «She», «of each half», «she» y «after», más un «argues»
 * repetido: todas vacías para el guardián, y «argues» y «half» ya estaban—. Puerta 7, el pasaje pasa de 132,7 a 134,8 palabras-SAT, dentro de 25-150.
 * Puerta 2, longitudes de opción intactas: 123/135/117/119. La prueba a ciegas no puede haberse
 * movido: el extractor manda enunciado y opciones, y no manda el `stimulus`.
 *
 * PENDIENTE: por R2, q13 ha cambiado de texto y vuelve a la cola de auditoría; su huella en el
 * guardián cambia con él. Se suma al acta pendiente por q09.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q09',
    type: 'mcq',
    part: 1,
    stimulus:
      'Two lakes lie a kilometer apart in the same valley, and every winter the northern one freezes about three weeks after the southern one. Soundings put the two basins at the same depth, and neither lake has a stream running into it or out of it the year round. The same ridge stands over both, and neither shore loses an hour of the low winter sun to it. What differs is where the water comes from. The southern lake fills in the thaw with snowmelt off the slopes. The northern one is fed from underneath, by a spring that leaves the gravel at nine degrees Celsius in July and at nine degrees in January.',
    text: 'According to the text, why does the northern lake freeze later than the southern one?',
    options: [
      "Its basin goes down to a greater depth, and the water in a deep lake has far more of the summer's heat to give up before it freezes.",
      'It is fed from below by a spring at the same temperature in January as in July, and water arriving that warm keeps the ice away.',
      'It has a stream running through it the year round, and water traveling through a basin will not set into ice as standing water does.',
      'It lies open to the low winter sun, and a lake taking in sun all winter has more heat to lose before its surface freezes.',
    ],
    answer: 1,
  },
  {
    id: 'q10',
    type: 'mcq',
    part: 1,
    stimulus:
      'Critics have long treated the four novels Amparo Lascano published after 1970 as a late turn in her work: the short sentences, the three small towns, the endings that explain nothing. Her working notebooks complicate that account. The short sentences and the unexplained endings are already in the drafts she wrote in the 1950s and put away. So are the towns, which are the same three she had been writing about since her first book. The reviews of the late novels raised the very objection her earliest reviews had raised. What was new after 1970 was her publisher: the editor who had demanded "a proper ending" had sold the firm, and the editor who bought it demanded nothing.',
    text: 'Which choice best states the main idea of the text?',
    options: [
      "The turn critics date to 1970 was a change in Lascano's sentences rather than in the towns she wrote about.",
      "The turn critics date to 1970 was a change in what her publisher would print rather than in what she wrote.",
      "The turn critics date to 1970 was a change in what her reviewers would accept rather than in what she wrote.",
      "The turn critics date to 1970 was a change in the towns Lascano wrote about rather than in her sentences.",
    ],
    answer: 1,
  },
  {
    id: 'q11',
    type: 'mcq',
    part: 1,
    stimulus:
      'The porters of the Trestona market speak among themselves a jargon of some four hundred words, and it has always been explained the same way: a code for settling prices where the customer cannot follow. The linguist Nieves Barcala, who spent two years working the barrows, says it does nothing of the kind. Buyers pick the jargon up in a season, she points out; speaking it is an occupation of its own, kept up for its own sake, and the porters do not use it to shut anybody out. Barcala takes her evidence from what the porters told her.',
    text: "Which quotation from the porters most effectively illustrates Barcala's claim?",
    options: [
      '"We settle all the prices of the day in it, and we settle them with the customer right there; that is the use of the thing and always has been."',
      '"What we pay the growers stays inside this hall; no porter from the north side has ever been told the figure, and none ever will."',
      '"Nobody is paid a cent for it and nobody sits down to teach it; a boy has it off the barrows in his first winter, the way we all did."',
      '"It is not for the prices and it locks nobody out; we talk it on the bus home, and would go on talking it if the market closed tomorrow."',
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
      'In the parishes where the church left the grain tithe alone, the potato ground grew fastest on the wheat land the bad harvests had worn out worst.',
      'In the parishes where the church began tithing potatoes too, the families who grew potatoes came through the winter of 1846 better fed than their neighbors.',
      'In the parishes where the church began tithing potatoes too, the potato ground shrank within two seasons on land no less worn out than it had been before.',
      'In the parishes where the church doubled the tithe it took in grain, the potato ground shrank by half within ten years, with the land as poor as ever.',
    ],
    answer: 2,
  },
  {
    id: 'q13',
    type: 'mcq',
    part: 1,
    stimulus:
      'Population · germinated in deep shade · germinated in full sun\nCape Ridge · 7% · 74%\nNorth Ridge · 9% · 71%\nElm Valley · 64% · 68%\nPine Valley · 57% · 60%\n\nA seed that sprouts in deep shade may spend itself before it ever reaches the light. Many plants of open ground carry a chemical switch that holds the seed dormant until light falls on it. Botanist Runa Hallden sowed two hundred seeds from each of four populations of a small annual plant, half in deep shade and half in full sun. She counted the share of each half that came up within thirty days. She argues that the two ridge populations, which grow where nothing shades them, still carry the switch. The two valley populations, she argues, have lost it after many generations under forest. The figures for North Ridge and Elm Valley fit her account:',
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
      "Forty copies survive of the 1612 printing of A Wager at Marlbeck. In twenty-nine of them one scene runs to thirty lines; in the other eleven the same scene runs to twelve. To print a page, a worker first had to set it: put its letters in place one at a time. The shop had a single press, so it could not print two versions of a page at the same time; one had to come first. Its type had one flaw that can be dated: a lowercase e with a bent crossbar, which arrived in March 1612 and marks every sheet printed after that. The bent e runs all through the thirty-line scene and appears nowhere in the twelve-line one. In all forty copies the pages of that scene are folded from one sheet of paper, with none cut out and none pasted in. Taken together, these details indicate that…",
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
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A:
        'Da por buena la diferencia que el texto niega en la segunda línea: «Soundings put the two basins at the same depth». El mecanismo que invoca es el más fuerte de los cuatro fuera del pasaje —el calor que un lago guarda es proporcional al agua que tiene, y la profundidad es el primer predictor de la fecha de congelación en cualquier estudio de hielo lacustre—, así que esta opción no se descarta por flojo: se descarta porque las sondas dan la misma profundidad. Es además el camino del sentido común: «lago hondo, se hiela más tarde» es lo primero que se le ocurre a cualquiera, y por eso el ítem lo pone aquí y no en la clave.',
      B:
        'Correcta: es la única de las cuatro causas que el pasaje deja en pie, y él mismo señala dónde mirar. «What differs is where the water comes from»: el lago del sur se llena solo en el deshielo, con nieve derretida, y el del norte «is fed from underneath, by a spring that leaves the gravel at nine degrees Celsius in July and at nine degrees in January». Un aporte continuo a nueve grados hay que enfriarlo antes de que la superficie llegue a cero. La opción no nombra ninguna estación —dice enero y julio, las dos cifras del texto— para que no dependa del hemisferio del lector. No es la causa más convincente de las cuatro: es la única que el pasaje no desmiente.',
      C:
        'Propone la causa más famosa de las cuatro —el agua que corre no se hiela— y el texto la cierra de una línea: «Neither lake has a stream running into it or out of it the year round». Sin corriente que atraviese el vaso, no hay nada que distinga a un lago del otro por ahí. La ley es cierta y el mecanismo está documentado (las entradas y salidas de los lagos son lo último que se hiela), así que la opción no se cae sola: hay que ir a buscar la frase que la niega. La elige quien reconoce el hecho de manual y no comprueba si este lago lo tiene.',
      D:
        'Invoca una propiedad que el texto atribuye a los dos por igual: «The same ridge stands over both, and neither shore loses an hour of the low winter sun to it». El sol de invierno es un término real del balance de calor de un lago —el que pasa el invierno a la sombra de una loma se hiela antes—, y la opción es verdad del lago del norte; lo que no es, es una diferencia. Es el error de tomar por contraste un rasgo que el pasaje reparte entre los dos, y el más difícil de ver de los tres, porque la línea que lo mata no niega nada: iguala.',
    },
    fuenteHecho:
      'Limnología de dominio público. Las CUATRO opciones son términos reales del balance de calor invernal de un lago y las cuatro explican retrasos de congelación medidos en la literatura: el calor almacenado según la profundidad (A), el aporte continuo de agua freática a temperatura constante (B), la corriente de un caudal que atraviesa el vaso (C) y la radiación solar que entra cada día de invierno (D). Valle, lagos, distancia, cresta y cifras inventados. Que los cuatro mecanismos sean de primera fila es el arreglo de la séptima pasada y no un adorno: ver la cabecera.',
  },
  {
    id: 'q10',
    domain: 'II',
    tipo: 'central-ideas-details',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A:
        'Deja el cambio dentro de la prosa de Lascano, y los cuadernos lo desmienten: «The short sentences and the unexplained endings are already in the drafts she wrote in the 1950s and put away». Si la frase corta ya estaba veinte años antes, no puede ser lo que se movió después de 1970. Es la lectura de manual —el estilo tardío de quien se va despojando con la edad— y la marca quien reconoce la historia habitual antes de comprobar cuál cuenta esta.',
      B:
        'Correcta: junta las dos mitades del pasaje. Los cuadernos quitan el cambio de la escritura —frase corta, finales sin explicar y los mismos tres pueblos, todo anterior a 1970— y la última frase dice qué sí cambió: «What was new after 1970 was her publisher», con un editor que exigía «a proper ending» y otro, tras la venta de la casa, que no exigió nada. El giro que la crítica fecha en 1970 está en lo que la editorial imprimía, no en lo que Lascano escribía. No es la lectura más fina de las cuatro: es la única que no choca con una línea del texto.',
      C:
        'Saca el cambio de la escritora, que es el paso correcto, y lo pone en la institución equivocada. El pasaje cierra esa puerta en una línea: «The reviews of the late novels raised the very objection her earliest reviews had raised». Si la objeción de los últimos libros es la misma que la de los primeros, la crítica no llegó a aceptar nada que antes rechazara. Es la distractora más cercana a la clave, y la marca quien acierta el diagnóstico general y no lee las dos frases que separan a la crítica del editor.',
      D:
        'Mueve el cambio del cómo al qué, y el texto cierra esa puerta con la misma limpieza: los tres pueblos «are the same three she had been writing about since her first book». Después de 1970 no hay terreno nuevo. La elige quien lee la lista de la primera frase —frases cortas, pueblos pequeños, finales sin explicar— como inventario de novedades, sin ver que el pasaje la desmonta entrada por entrada.',
    },
    fuenteHecho:
      'Ficción original: Amparo Lascano, sus novelas, sus cuadernos, la casa editorial y todas las fechas están inventados. El fenómeno de fondo sí es corriente en historia editorial —un cambio de estilo atribuido al autor puede deberse a un cambio en lo que su editor aceptaba imprimir—, y por eso el ítem se sostiene como lectura y no como dato. Sustituye al q10 anterior (Irina y la centralita), retirado en la cuarta pasada por fuga estructural: su idea central era la premisa misma del relato. Los cuadernos ya no llevan fecha de catalogación ni custodio: en la octava pasada se cayó «catalogued by a university library in 1996», que era un dato más que sostener y que no entra en ninguna deducción. Esa fecha y esa biblioteca venían del primer intento de deshacer la pareja con q11, que va justo detrás y llevaba el mismo armazón —creadora, papeles privados, fecha de apertura del archivo, lectura que da la vuelta al relato recibido—; no bastó, y en la sexta pasada se cambió el escenario de q11 entero, así que ya no hay pareja que romper y la fecha sobraba. La deducción no depende de ninguna fecha de archivo: depende de que los cuadernos son de los años cincuenta.',
  },
  {
    id: 'q11',
    domain: 'II',
    tipo: 'command-of-evidence-textual',
    dificultad: 2,
    tema: 'humanidades',
    razones: {
      A:
        'Dice justo lo contrario de la primera pieza de la afirmación. Si en la jerga se cierran todos los precios del día, y además delante del cliente, la jerga es el código de precios que el mercado siempre creyó: exactamente la lectura que Barcala quiere desmontar. Es el error de quien busca la cita donde aparecen las dos cosas —la jerga y los precios— sin comprobar en qué relación las pone.',
      B:
        'Prueba reserva, pero sobre el objeto equivocado. Lo que se guarda es lo que se paga al productor; de la jerga no dice una palabra, y callar el precio de compra lo hace media profesión. Es el error de quien retiene «do not use it to shut anybody out» y lo engancha a la primera cita que hable de secreto.',
      C:
        'Describe cómo se transmite la jerga —sin paga y sin maestro, aprendida en las carretillas el primer invierno—, y eso es una cuestión de aprendizaje, no de finalidad: media docena de destrezas del oficio se aprenden así y siguen sirviendo para trabajar. Una jerga que nadie cobra ni enseña puede seguir tapándole el precio al cliente. Y no dice nada de a quién se dejaba fuera, que es la tercera pieza de la afirmación. Es la distractora más cercana a la clave, porque «nadie cobra por ello» suena a «por su propio gusto»: la elige quien toma el modo de aprenderse por el motivo de hacerse.',
      D:
        'Correcta: cubre las tres piezas de la afirmación de Barcala en una frase. «Not for the prices» niega el código de precios, «it locks nobody out» niega que sirva para dejar fuera a nadie, y hablarla en el autobús de vuelta a casa, con el verbo entero al final —«would go on talking it if the market closed tomorrow»—, la describe como ocupación aparte que seguiría existiendo aunque se acabara el oficio. MANTENIMIENTO: la ventaja sobre C está en tener las TRES piezas —no es código de precios, ocupación aparte por sí misma, no sirve para dejar fuera a nadie—. La más frágil es la tercera: si una corrección futura quita el «would go on talking it», C se queda como la única que roza «por su propio gusto» y el ítem pasa a tener dos claves. No se recorta ninguna. En la octava pasada la opción bajó de 151 a 137 caracteres y la segunda negación se parafraseó —«not for shutting anyone out» → «it locks nobody out»—, porque repetía palabra por palabra el «shut anybody out» del pasaje; las tres piezas siguen enteras y el verbo del final, sin elidir.',
    },
    fuenteHecho:
      'Ficción original: ni el mercado de Trestona, ni los porteadores, ni la lingüista, ni el estudio existen. El fenómeno de fondo sí está documentado en sociolingüística: las jergas de oficio se explican casi siempre como códigos crípticos frente al cliente, y el trabajo de campo suele encontrar que la función críptica es débil y que la variedad se mantiene por identidad y por gusto. Sustituye al q11 anterior (la pintora Ilse Marchetti y sus cuadernos), retirado en la sexta pasada por dos defectos de conjunto y no por nada del propio ítem: (1) con q10 formaba pareja —creadora, papeles privados, fecha de apertura del archivo, lectura que da la vuelta al relato recibido— y los dos ítems van seguidos; (2) compartía racimo léxico con q08 del bloque CS (`painter`, `canvases`, `studio`, `unfinished`), que además va de lienzos mal catalogados. Aquí no hay creadora individual, no hay papeles, no hay archivo ni fecha de apertura, y no queda una sola de esas cuatro palabras. La estructura lógica se conservó entera: tesis de tres piezas, clave que las cubre las tres, distractor C que roza una sola y por el motivo equivocado. Escenario urbano a propósito: q12 va justo detrás y es rural (parroquias, trigo, patatas), así que un q11 de campo habría cambiado una pareja por otra. Nombres comprobados en buscador antes de fijarlos: «Trestona» no aparece como localidad ni como mercado y «Nieves Barcala» no corresponde a ninguna persona. Quien los cambie, que repita la búsqueda.',
  },
  {
    id: 'q12',
    domain: 'II',
    tipo: 'command-of-evidence-textual',
    dificultad: 3,
    tema: 'historia',
    razones: {
      A:
        'Apoya la explicación rival, no la de Rojas. El diezmo se queda como estaba —la iglesia no toca nada— y aun así la patata avanza más deprisa justo donde las tres malas cosechas hicieron más daño: con el impuesto constante, lo que explica la diferencia es el agotamiento. Es el error de quien reconoce las dos variables correctas y no comprueba hacia dónde apuntan.',
      B:
        'Cambia una consecuencia por una causa. Es el mismo cambio que la clave —la iglesia empieza a diezmar también la patata—, pero mira el desenlace equivocado: que las familias patateras siguieran comiendo mejor en 1846 dice qué se ganaba con la patata, no por qué se sembró, y convive sin problema con que se sembrara por el agotamiento del suelo. No separa las dos explicaciones, que es lo único que el hallazgo tiene que hacer. La elige quien reconoce la intervención correcta y no comprueba sobre qué se mide el efecto.',
      C:
        'Correcta: quita la ventaja fiscal y deja intacta la explicación rival. Donde la iglesia empieza a diezmar también la patata, el sembrado retrocede en dos temporadas sobre una tierra «no less worn out than it had been before». El agotamiento no ha cambiado y la decisión sí, así que lo que movía el arado era el impuesto, que es la tesis de Rojas. Es lo único que hace el hallazgo y que ningún otro hace: separar las dos explicaciones moviendo una sola de ellas.',
      D:
        'Acierta la variable y se equivoca de signo. Si la iglesia dobla lo que cobra sobre el grano, la ventaja fiscal de la patata crece, y con la tesis de Rojas el sembrado tendría que ensancharse; el hallazgo dice que se redujo a la mitad. Es la distractora gemela de la clave —misma intervención de la iglesia sobre el diezmo, mismo desenlace medido, mismo control sobre el estado de la tierra— y solo se separa de ella en si el cambio quitó o aumentó la ventaja de la patata. La marca quien comprueba de qué habla el hallazgo y no en qué dirección empuja.',
    },
    fuenteHecho:
      'Hecho documentado de historia agraria europea: el diezmo se cobraba en grano y en varias regiones la patata quedó fuera de él, lo que le dio una ventaja fiscal frente al trigo. Valmar, Rojas, las fechas y los cuatro hallazgos están inventados. Los cuatro hallazgos se rehicieron en la sexta pasada: los cuatro nombran ahora el diezmo, los cuatro abren igual («In the parishes where the church…»), los cuatro miden un desenlace positivo y ninguno es un resultado nulo. El anterior D —levantado el diezmo, la patata siguió creciendo igual— tenía forma de refutación de manual («se quitó la causa y no pasó nada») y se reconocía como distractor sin leer el pasaje. Lo que queda a ciegas, medido y asumido: dos descartes razonados —el hallazgo tiene que hablar de un cambio en el diezmo (cae A) y tiene que medir superficie sembrada y no alimentación (cae B)— dejan a C y D en pie, y separarlas exige saber en qué dirección empuja la tesis de Rojas, que solo está en el pasaje. El techo a ciegas del ítem es 50 %, no 100 %.',
  },
  {
    id: 'q13',
    domain: 'II',
    tipo: 'command-of-evidence-quantitative',
    dificultad: 3,
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
      'Fotoblastismo real: muchas semillas de plantas de terreno abierto necesitan luz para germinar, y las poblaciones de sotobosque tienden a perder ese requisito. La botánica, las cuatro poblaciones y los ocho porcentajes están inventados; las especies van sin nombre científico. El texto dice «a small annual plant» y no «a small annual» a secas: *annual* como sustantivo (planta de ciclo anual) es vocabulario de jardinería que el pasaje no define, y sin el sustantivo detrás se lee como adjetivo suelto.\n\n**El pasaje se partió por oraciones el 22 ago 2026 y no cambió de contenido.** Era el más denso del módulo —27,8 palabras por oración según el calibrador, 28,5 con el contador de este repositorio, y tres oraciones de 36, 36 y 31— y queda en 16,6 de media y 26 la más larga, con siete oraciones en vez de cuatro. Los tres cortes: la premisa se separa del mecanismo («…before it ever reaches the light. Many plants of open ground carry a chemical switch…»), el sembrado se separa del recuento («…half in full sun. She counted the share of each half that came up within thirty days.») y las dos mitades de la tesis van una por oración («…still carry the switch. The two valley populations, she argues, have lost it after many generations under forest.»). LO QUE NO CAMBIA, y es lo único que hace este ítem: la tabla, entera, con su 2×2 de fila y factor; las cuatro opciones, ni un carácter; las cuatro razones; y las dos filas que el pasaje nombra —North Ridge y Elm Valley—, que siguen nombradas en la última oración y en ninguna otra. Las dos mitades de la tesis siguen atribuidas a la botánica («She argues that…», «…, she argues, …»): sin atribución, la razón de D —quien busca la prueba más fuerte en vez de la fila que el texto nombra— se queda sin sujeto. Contado sobre el texto: ni un tipo léxico entra ni sale, así que el solape con las cuatro opciones sigue en 11/12/10/10 y la puerta 3 no se mueve; el pasaje pasa de 132,7 a 134,8 palabras-SAT, dentro de 25-150.',
  },
  {
    id: 'q14',
    domain: 'II',
    tipo: 'inferences',
    dificultad: 2,
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
    dificultad: 3,
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
      'Bibliografía analítica real: las correcciones en prensa (stop-press) producen ejemplares distintos dentro de una misma edición, y un tipo dañado y fechado permite ordenar las tiradas. La obra, la imprenta, la letra concreta y los cuarenta ejemplares están inventados. La diferencia entre las dos versiones se dejó en dieciocho líneas —treinta frente a doce— porque una plana de este formato lleva 35-40 y solo así el pliego admite el texto de más sin hoja añadida; el vocabulario técnico (quarto, gathering, leaf) se evitó a propósito, porque el texto no lo define. El reparto de ejemplares es 29 largos y 11 cortos, y ese sentido importa: con 11 largos, el estado mayoritario era el primero y la corazonada de que lo mayoritario salió antes apuntaba a la clave. Invertido, apunta a A. Las cuatro opciones nombran las dos versiones, los dos recuentos y un procedimiento de taller igual de corriente —recomponer la plana o encuadernar una hoja compuesta aparte—, de modo que ninguna se puede descartar por rareza. TÍTULO: la obra se llamaba «The Ferryman’s Daughter» y se renombró a «A Wager at Marlbeck» en la quinta pasada. El anterior es el título de dos novelas publicadas —Juliet Greenwood (2020) y Yasmin Angoe (2026)—: los títulos no tienen derecho de autor, pero la norma del proyecto es que ningún nombre del examen tenga dueño. El nuevo se comprobó en buscador antes de fijarlo (sin resultados como título de obra, ni el título entero ni «Marlbeck» asociado a una obra) y hay que volver a comprobarlo si alguien lo cambia. VOCABULARIO: la frase «To print a page, a worker first had to set it: put its letters in place one at a time» está en el pasaje porque las cuatro opciones se deciden con *set* en su acepción tipográfica, y ese verbo solo aparecía en las opciones: el texto explicaba *type* y *press* y se quedaba a medio camino. En la octava pasada se reescribió más corta y más llana —«put its letters in place one at a time» en vez de «its letters assembled one by one»—, sin tocar lo que define.',
  },
]
