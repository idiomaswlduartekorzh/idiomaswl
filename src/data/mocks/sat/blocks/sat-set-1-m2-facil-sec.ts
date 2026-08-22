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
 * 3. **La opción sin signo es la clave en uno de los cuatro ítems de fronteras, y ese ítem es
 *    q18.** Hasta la sexta vuelta la política era la contraria —«la opción sin signo nunca es la
 *    clave»— y nació bien motivada: «cuando dudes, no pongas coma» es la apuesta que trae de casa
 *    quien no lee, y si esa apuesta paga una vez, se juega en los cuatro ítems. Lo que pasó es lo
 *    que describe **R14**: la defensa se aplicó uniformemente a las cuatro y se convirtió ella
 *    misma en el patrón aprendible del que protegía.
 *
 *    **Lo que costaba, medido.** Con el bloque entero por debajo del azar (17,4 % a ciegas, techo
 *    35 %), q18 seguía cayendo **7 de 10 sin ver el texto**, dos vueltas seguidas y siendo el
 *    único ítem del módulo que aún filtraba. La primera vez su clave era la coma y lo tumbaba «en
 *    la duda, coma» (punto 6). Se movió la regla para que la clave fueran los dos puntos y la
 *    pista se mudó de signo con ella: con «sin signo nunca» descartando una opción y «la coma es
 *    la trampa» descartando otra, quedaba un 50/50 entre `;` y `:`; y de esos dos, los dos puntos
 *    son el **signo marcado** del juego —el que parece la respuesta de una pregunta de puntuación,
 *    exactamente como el perfecto en un juego de tiempos verbales (es lo que tumbó dos versiones
 *    de q19, punto 5)—. Los dos caminos apuntaban al mismo sitio, y el sitio
 *    era «cualquier opción menos la que no lleva signo». Dos intentos en el mismo ítem no son un
 *    defecto de redacción: son el suelo que impone la política.
 *
 *    **Por eso q18 se rehízo con una regla que exige la ausencia de signo**, no con una en la que
 *    el signo simplemente no haga falta: sujeto y verbo no se separan con nada. Ahí poner coma,
 *    punto y coma o dos puntos es un error de norma, no una opción menos elegante, así que la
 *    clave se defiende con el texto delante igual que las otras tres.
 *
 *    **Reparto de signos-clave de los cuatro ítems de fronteras**, comprobado sobre el array:
 *
 *      q16 → coma · q18 → sin signo · q20 → punto y coma · q22 → punto y coma (delante de «and»)
 *
 *    Y **en qué letra vive cada uno**, porque el reparto de letras se decidió a nivel de módulo y
 *    llegó aquí como permutación: q16 → A · q18 → A · q20 → C · q22 → B. Las letras del bloque
 *    entero son `A C A B C D B`. Signo y letra son independientes a propósito: la clave sin signo
 *    y la clave con coma comparten letra (las dos en A), y las dos claves de punto y coma están
 *    en letras distintas (C y B), de modo que ninguna apuesta de letra reproduce una apuesta de
 *    signo.
 *
 *    **Residuo conocido de q18, que ninguna permutación arregla**: su clave es la opción sin
 *    signo y por eso es un carácter más corta que las otras tres, esté en la letra que esté. No
 *    es una pista de longitud creada al reordenar —la diferencia es la regla misma— y es
 *    inseparable de tener una clave sin signo, que es lo que el punto 3 exige. Cuente como
 *    aceptado, no como pendiente.
 *
 *    Ninguna forma es clave más de dos veces. De las cuatro apuestas de un solo signo —jugar
 *    siempre la misma forma sin leer— «siempre coma» saca 1 de 4, «siempre sin signo» 1 de 4 y
 *    «siempre dos puntos» **0 de 4**; la única que pasa del azar es «siempre punto y coma», 2 de
 *    4, y es la que el punto 6 justifica y acota: los dos ítems que la pagan ofrecen ese signo
 *    con dibujos distintos —`;` a secas en q20 y `; and` en q22—, de modo que no es una sola
 *    apuesta formulable sobre los cuatro a la vez.
 *
 *    **Lo que este reparto no arregla, escrito para que nadie lo descubra creyendo que se
 *    ocultó.** Con cuatro ítems, cuatro formas de opción y dos ítems obligados al punto y coma
 *    (punto 6), alguna forma tiene que quedarse sin ser clave nunca. Antes era la ausencia de
 *    signo; ahora son los dos puntos. Para un solucionador que juegue **dos** eliminaciones
 *    globales sobre los cuatro ítems, el peor caso no baja: cambia de dueño.
 *
 *      «sin signo nunca» + «la coma es la trampa» → antes 1,5 de 4 (37,5 %) · ahora 1,0 (25 %)
 *      «dos puntos nunca» + «la coma es la trampa» → antes 1,0 de 4 (25 %) · ahora 1,5 (37,5 %)
 *
 *    El cambio se hace igual, y no por aritmética sino por qué heurística existe de verdad:
 *
 *    a) «Menos signos es más seguro» no hay que aprenderla aquí: se trae de fuera, y la trae
 *       también el estudiante real. «No elijas nunca los dos puntos» hay que inducirla de estos
 *       cuatro ítems y **contra** el prejuicio contrario, que es que el signo raro es el que se
 *       está examinando. Una sale gratis; la otra cuesta cuatro observaciones y va a
 *       contracorriente.
 *    b) La heurística contraria no es hipotética: es la que está disparando ahora. Quien no lee
 *       q18 elige los dos puntos. Con los dos puntos de distractor, ese solucionador pasa de
 *       acertar 1 de los 4 ítems de fronteras a acertar 0.
 *    c) «Los dos puntos nunca son la clave» es falsa un módulo antes: en el bloque SEC del módulo
 *       1 la clave de q20 es «the same recipe:». El estudiante que hace los dos módulos —que es la
 *       entrega real— ve pagar los dos puntos. La ausencia de signo, en cambio, no era clave en
 *       ninguno de los dos bloques, y en el módulo 1 lo más cerca que estuvo fue el q22, donde la
 *       clave es la que **no** pone comas alrededor del modificador esencial.
 *
 *    La metarregla que quede sigue siendo eso, una metarregla, y descarta una opción sin elegir
 *    entre las otras tres. Se midió en la cuarta vuelta metiendo en el panel a ciegas un
 *    solucionador con instrucción expresa de buscar esa clase de pista: sacó **4 de 27**, por
 *    debajo del azar.
 *
 *    **No repongas la política vieja «por coherencia».** Volver a poner un signo en la clave de
 *    q18 devuelve al bloque el patrón uniforme y con él la fuga de 7 de 10. Lo que hay que
 *    vigilar al editar no es que las cuatro claves lleven signo, sino que ninguna forma de opción
 *    sea clave más de dos veces.
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
 *    grado de marcación**: las opciones pasaron a ser cuatro formas compuestas
 *    (`have grown` · `has grown` · `was growing` · `had grown`), ninguna presente ni pasado
 *    simple. «Elegir el perfecto» dejó de señalar la clave.
 *
 * 5 bis. **Y aun así siguió filtrando: 7 de 10 en la cuarta medición.** Igualada la marcación,
 *    quedaba el mismo mecanismo un piso más abajo. Tres de las cuatro opciones eran perfectos
 *    y el singular es el número por defecto cuando no se ve el sujeto, así que **«singular +
 *    perfecto» seguía siendo la apuesta**, y era la clave. El residuo no se podía quitar
 *    conservando la clave: con «since» + presente perfecto, cualquier juego que contenga un
 *    solo presente perfecto lo señala, y el único juego que no lo señalaría —añadir
 *    `has been growing`— tiene dos claves. Un ítem cuya clave es **la forma que un examen de
 *    gramática examina por defecto** no se desfuga; se sustituye.
 *
 *    q19 se rehízo entero sobre la misma fila del plan (SEC · form-structure-sense ·
 *    dificultad 2 · clave B) y el mismo pasaje de historia editorial, con otra regla: el
 *    complemento de tiempo definido «In 1846», que cierra el paso al presente, y el carácter
 *    estativo de «contain», que cierra el paso a la continua. El juego de opciones es ahora un
 *    cuadro de dos por dos —`contains` · `contained` · `is containing` · `was containing`—:
 *    dos simples y dos continuas, dos en presente y dos en pasado, **ninguna perfecta y
 *    ninguna plural**. Sin perfecto no hay «forma de examen» donde caer, y como las cuatro
 *    caben con un sujeto singular, apostar por el singular tampoco descarta nada: el número
 *    sale del juego y lo único en disputa es el tiempo, que es lo que el ítem mide.
 *
 *    Lo que queda, escrito aquí porque es **el suelo de un ítem de tiempo verbal** y no un
 *    descuido: quien no lee puede descartar las dos continuas —un verbo de estado rara vez las
 *    admite— y jugarse una moneda entre las dos simples. De ahí que la clave sea el pasado y
 *    no el presente: sin texto, la forma por defecto de un verbo suelto es el presente, así que
 *    esa moneda cae más veces en A que en B. Bajar de ese suelo exigiría hacer clave una forma
 *    continua, y ninguna norma del inglés escrito obliga a un continuo: sería cambiar una fuga
 *    por un ítem sin regla, que es peor negocio.
 *
 *    Efecto lateral que conviene anotar: el ítem de tiempo verbal del módulo 1 conjuga
 *    también «grow» (`are growing` · `have been growing` · `had been growing` · `grew`). Las
 *    tres primeras versiones de este q19 conjugaban el mismo verbo, de modo que un estudiante
 *    que hiciera los dos módulos veía dos veces el mismo paradigma. Con «contain» esa
 *    coincidencia desaparece, y las dos reglas quedan además en las antípodas: allí el ancla es
 *    un punto anterior del pasado y **la clave es una forma continua**; aquí el ancla es una
 *    fecha y **la continua es justo lo imposible**. Quien resolviera aquel de memoria fallaría
 *    este.
 *
 * 5 ter. **Aquel «suelo» no era un suelo: era R11 incumplida, y por eso q19 se sustituyó otra
 *    vez.** El párrafo anterior daba por aceptado que quien no lee puede tirar `is containing` y
 *    `was containing` —un verbo de estado no admite continuas— y jugarse una moneda entre las dos
 *    simples. Eso es exactamente lo que R11 prohíbe en convenciones: **las cuatro opciones tienen
 *    que ser correctas por separado y solo la oración debe decidir**. Dos formas progresivas de un
 *    verbo estativo no se caen por lo que dice el pasaje, se caen de oído, así que el ítem de
 *    cuatro opciones era en realidad de dos y regalaba veinticinco puntos de probabilidad. El
 *    auditor de sesgo lo acertó a ciegas por ese camino y lo escribió con esas palabras: «`is
 *    containing` y `was containing` son continuas de un verbo estativo: se caen sin leer. Quedan
 *    dos, 50 %».
 *
 *    La regla de aquella versión no admitía arreglo: **su única defensa contra la continua era el
 *    carácter estativo del verbo**, que es visible en la opción y no en el texto. Con un verbo
 *    dinámico, «was …ing» pasa a ser gramatical en la frase y el ítem tiene dos claves; con uno
 *    estativo, las dos continuas están muertas antes de abrir el pasaje. No hay tercera salida, y
 *    retirar el ítem es una salida legítima: se sustituye entero, sobre la misma fila del plan
 *    (SEC · form-structure-sense · humanidades · dificultad 2 · clave B).
 *
 *    **La quinta versión no examina el aspecto, examina la secuencia.** El pasaje —una compañía de
 *    teatro de provincias, tema humanidades— deja el trasfondo en pluscuamperfecto y abre con
 *    «when, in 1893,» la oración del hueco: lo que va ahí es el hecho que interrumpe, y ese hecho
 *    va en pasado simple. Las opciones son `stages` · `staged` · `had staged` · `has staged`:
 *    cuatro formas corrientes, ninguna inventada, ninguna podable sin el texto. Cada una muere por
 *    algo que está escrito en la oración —el presente por la fecha y por los verbos vecinos, el
 *    presente perfecto porque esa fecha es un complemento de tiempo pasado definido y el presente
 *    perfecto no lo admite, y el pluscuamperfecto porque el hueco **es** el punto del pasado al
 *    que tendría que anteponerse— y no por su propio dibujo.
 *
 *    **Cómo queda el conjunto, que es lo que R14 obliga a mirar:** dos formas simples y dos
 *    perfectas, y en cada par una con marca de singular (`stages`, `has staged`) y una neutra
 *    (`staged`, `had staged`). Las dos apuestas que este ítem ya pagó dos veces dejan de pagar:
 *    «elige el perfecto» reparte 50/50 entre **dos distractores**, y «singular + perfecto» —la que
 *    tumbó la cuarta versión— cae limpiamente en D. La forma que un examen de gramática parece
 *    estar examinando, el pluscuamperfecto, es C.
 *
 *    **El residuo, escrito para que nadie lo descubra creyendo que se ocultó.** Queda una apuesta
 *    que paga: «la forma llana, el pasado simple», que es la que haría un solucionador que ya sabe
 *    que este examen castiga la opción vistosa. No es la heurística que este repositorio ha medido
 *    —lo medido dos veces es la contraria, el perfecto— y con cuatro celdas no existe ninguna
 *    posición que no responda a alguna heurística formulable; lo que sí se puede exigir, y se
 *    cumple, es que **las dos apuestas documentadas caigan sobre distractores**. La diferencia con
 *    la versión anterior no es de grado: allí dos opciones estaban muertas antes de leer, aquí las
 *    cuatro exigen el texto.
 *
 *    Y sigue valiendo lo que el punto anterior anotaba sobre el módulo 1: aquel ítem de tiempo
 *    verbal conjuga «grow» y su clave es una forma continua anclada en un punto anterior del
 *    pasado; este conjuga «stage» y su clave es el pasado simple del hecho que interrumpe un
 *    pluscuamperfecto. Ni el verbo ni la regla se repiten, y quien resolviera aquel de memoria
 *    fallaría este.
 *
 * 6. **La frecuencia también se cuenta entre ítems, no solo dentro de uno.** R14 dice que un
 *    juego de opciones no puede tener un solo miembro marcado; el reverso es que **el signo más
 *    frecuente del inglés escrito no puede ser la clave de dos ítems de fronteras del mismo
 *    bloque**. En la versión anterior q16 y q18 tenían los dos la coma de clave, y un panel que
 *    juegue «siempre coma» sin leer nada sacaba 2 de los 4 ítems de fronteras: q18 se quedó en
 *    6 de 10 a ciegas por eso, y no por la forma de sus opciones, que ya era correcta.
 *
 *    q18 se rehízo entero para que el signo correcto **no** fuera la coma: la relativa
 *    explicativa con «which» se sustituyó por una oración que anunciaba un motivo y un sintagma
 *    nominal que lo decía, de modo que la clave pasaron a ser los dos puntos. El arreglo no fue
 *    mover la letra —entonces el plan fijaba **D** para q18 y la clave se quedó en D—, fue mover
 *    la regla. La letra sí se movió después, y por otro motivo: el plan vigente fija **A** y la
 *    permutación de la última pasada la puso ahí sin tocar ni una palabra de las opciones. **Esa
 *    versión duró dos mediciones**: los dos puntos resultaron ser la otra mitad del mismo
 *    problema y q18 se volvió a rehacer, ahora con la ausencia de signo como clave. El porqué,
 *    la aritmética y el reparto vigente están en el punto 3.
 *
 *    Lo que de aquel diagnóstico sigue en pie: el punto y coma sale **dos veces** entre las
 *    cuatro claves y no se puede evitar sin romper otra cosa, porque la regla de q20 (adverbio
 *    conjuntivo entre dos independientes) y la de q22 (serie con comas internas) exigen las dos
 *    ese signo y ninguna admite otro. Lo que las separa es la forma de la opción —q20 es punto y
 *    coma a secas, q22 es punto y coma delante de «and»—, así que «siempre punto y coma» no es
 *    una apuesta que un solucionador a ciegas pueda formular sobre las cuatro a la vez. Es esa
 *    doble obligación la que fuerza que alguna de las cuatro formas se quede sin ser clave
 *    nunca, y la que convierte la elección de **cuál** en la única decisión disponible.
 *
 * 7. **Pasada de equidad y veracidad (no de calidad de ítem).** Con el bloque ya cerrado a
 *    ciegas —15,9 % frente a un azar del 25 %— se revisó otra cosa: si un estudiante puede
 *    perder un ítem por algo que no es la regla examinada, y si algún dato del pasaje es
 *    falso. Salieron cuatro cosas y ninguna tocó una clave:
 *
 *    Aviso de lectura: **las dos que hablan de q19 se aplicaron al pasaje de historia editorial
 *    que ese ítem ya no tiene** (punto 5 ter). Se conservan porque son el criterio, no el texto:
 *    ninguna primicia histórica que no se pueda sostener, y ninguna referencia nacional que no
 *    aporte nada al ítem. El pasaje de teatro que ocupa hoy la fila cumple las dos por
 *    construcción, y así está escrito en su `fuenteHecho`.
 *
 *    - **q19 (pasaje retirado), error histórico de un siglo.** El pasaje databa en 1846 el nacimiento del libro
 *      escrito para niños. Es categoría comercial establecida desde los años 1740 (Newbery,
 *      1744), y entre 1780 y 1840 el género ya lo dominaba la obra original. De las dos
 *      salidas posibles —correr la cronología un siglo o rebajar la afirmación— se eligió
 *      **rebajarla**, porque «In 1846» es el complemento de tiempo que fija el pasado del
 *      hueco: mover la fecha obligaba a rehacer el ancla de la regla; cambiar «most books
 *      were shortened versions» por «much of what was put into the hands of the young was
 *      adapted» no toca la oración examinada. Detalle en el `fuenteHecho` del ítem.
 *    - **q20, «fortnight».** Palabra británica, fuera del currículo escolar en Colombia y en
 *      casi toda Latinoamérica, y **la mitad del contraste** del párrafo: quien no la
 *      conociera perdía la premisa, no un matiz. → «two weeks». Es el mismo criterio que ya
 *      mantenía las distancias en kilómetros.
 *    - **q18, cifra que caduca.** «in forty-eight years» es correcto solo durante 2026. → «in
 *      nearly fifty years». Regla general: ninguna cifra que se mida contra «hoy» se escribe
 *      exacta.
 *    - **q19 (pasaje retirado) y q22, dos retoques de contexto.** «an ordinary American bookstore» era la única
 *      referencia a Estados Unidos de los 27 ítems del módulo y no aportaba nada al ítem →
 *      «an ordinary bookstore». Y la comparación con el conservatorio de q22 la afirmaba el
 *      narrador sin poder sostenerla → se devuelve a quien ya la sostenía en el texto,
 *      «which the director says is…».
 *
 * **El array ya no va en el orden del plan: va q16 · q17 · q18 · q20 · q19 · q21 · q22.** SEC
 * es la excepción verificada de College Board —de menos a más difícil **sin agrupar por
 * tipo**— y es esa exigencia la que obligó a mover un ítem de sitio: ver «CALIBRACIÓN» al
 * final de esta cabecera, que dice qué medía cada uno, por qué se intercambian q19 y q20 y por
 * qué eso hay que hacerlo **antes** de corregir la etiqueta de q20. `boundaries` y
 * `form-structure-sense` siguen alternando, y las etiquetas, en el orden en que se leen, salen
 * 1 · 1 · 1 · 1 · 2 · 2 · 2: no decrecientes, que es lo que mide la puerta 9.
 *
 * Las siete reglas, repartidas a propósito para que no salgan siete de concordancia, y
 * elegidas además para no repetir ninguna del bloque SEC del módulo 1 (que ya examina par de
 * signos, dos puntos ante enumeración, modificador inicial y pluscuamperfecto continuo):
 *
 *   q16 coma tras subordinada antepuesta · q17 concordancia pronombre-antecedente ·
 *   q18 ausencia de signo entre el sujeto y su verbo ·
 *   q19 pasado simple del hecho que interrumpe un trasfondo en pluscuamperfecto ·
 *   q20 punto y coma ante adverbio conjuntivo · q21 concordancia con frase interpuesta ·
 *   q22 punto y coma como separador de serie con comas internas
 *
 * Ninguna de las siete se repite dentro del bloque, y desde que q18 dejó los dos puntos **no
 * queda ninguna coincidencia de signo-clave con el bloque SEC del módulo 1** (allí la clave de
 * q20 es «the same recipe:»). Lo que q18 sí toca de refilón es el q18 del módulo 1, el de la
 * nutria, y lo toca al revés: allí la clave es una **coma justo delante del verbo**, porque el
 * sujeto venía interrumpido por un inciso que había que cerrar —«The sea otter, an animal lighter
 * than most adult humans, eats…»—; aquí la clave es **no poner nada delante del verbo**, porque
 * no hay ningún inciso abierto. La discriminación entre los dos es una sola pregunta —¿se abrió
 * una coma antes?— y un estudiante que resolviera aquel de memoria fallaría este.
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
 * - q18: el hueco tiene que quedar **entre un sujeto y su verbo, y nada más**. Una: a la
 *   izquierda no puede cerrarse una oración independiente —a la izquierda hay un sintagma
 *   nominal, «The order in which the eleven pictures were arranged»—; si alguien la convierte en
 *   oración, los dos puntos y el punto y coma pasan a ser defendibles y aparecen tres claves.
 *   Dos: a la derecha tiene que empezar el verbo de ese sujeto, «tells»; con un sintagma nominal
 *   a la derecha vuelve la aposición y con ella la coma, y con una oración independiente vuelve
 *   el punto y coma. Tres: **ninguna coma abierta antes del hueco**; si el sujeto se interrumpe
 *   con un inciso, la coma que lo cierra se vuelve obligatoria y la clave se invierte. Cuatro,
 *   que no es de clave única sino de que el ítem tenga cuatro opciones vivas: el sujeto lleva
 *   dentro un verbo finito, «were arranged», y es lo único que hace pensable el punto y coma.
 *   Y una condición de conjunto, en el punto 3: **este es el ítem que sostiene la única clave sin
 *   signo del bloque**, así que no se le puede devolver un signo sin dárselo a otro.
 * - q19: lo que fija el pasado simple son **tres** condiciones, y las tres viven en la oración
 *   del hueco o en la inmediatamente anterior. Una: la fecha «in 1893» tiene que quedar dentro de
 *   la oración del hueco; sin ella el presente perfecto pasa a ser defendible y el ítem tiene dos
 *   claves. Dos: el trasfondo tiene que seguir en pluscuamperfecto y unido por «when» —«had worked
 *   its way through… when, in 1893, it ______»—, porque es lo que convierte al hueco en el punto
 *   de la interrupción. Tres: **detrás del hueco no puede aparecer ningún otro hecho pasado al que
 *   este preceda**; en cuanto lo haya, el pluscuamperfecto se vuelve correcto y vuelven las dos
 *   claves. Y una condición de conjunto, que no es de clave única sino de fuga: **las cuatro
 *   opciones son dos simples y dos perfectas, con una forma de singular en cada par**, de modo que
 *   ni «elige el perfecto» ni «elige el singular» descartan nada y la combinación de las dos cae
 *   sobre un distractor. Este ítem se rehízo cuatro veces por esa clase de fuga —dos por el
 *   perfecto, una por el singular y la última porque sus dos continuas se caían sin leer el texto,
 *   que es R11 incumplida—; la quinta versión existe para que ninguna de esas apuestas pague y
 *   para que las cuatro opciones exijan el pasaje.
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
 *
 * ## CALIBRACIÓN (22 ago 2026) — la curva del bloque y el pasaje que nadie había tocado
 *
 * Este era **el único de los cuatro bloques del módulo que la ronda de dificultad no tocó**, y
 * traía dos averías que no se ven ítem a ítem: hay que medir el bloque entero.
 *
 * **1 · La curva iba mal.** En el orden en que se leía —q16 → q22— el bloque medía
 * `7 · 7 · 7 · 10 · 7 · 10 · 10`. Un q19 en 10 seguido de un q20 en 7 no es un escalón: es una
 * caída de tres puntos y un cambio de banda en mitad del bloque, y en SEC, que se ordena de
 * menos a más **sin agrupar por tipo**, eso rompe la puerta 9. Se arregla **intercambiando q19
 * y q20** —objetos enteros en `items` y en `meta`, cada id con su contenido, **sin
 * renumerar**—, y el orden de lectura pasa a `7 · 7 · 7 · 7 · 10 · 10 · 10`.
 *
 * Que el ítem que hoy se lee en quinto lugar siga llamándose `q19` es deliberado, y es legal
 * desde que se cambió la puerta del guardián que exigía que el número de orden coincidiera con
 * el id. Renumerar es lo caro: `q19` está en la fila del plan, en este comentario y en todas
 * las actas de auditoría, y renumerar no movería el ítem, movería **el nombre a otra
 * pregunta**.
 *
 * **2 · Las etiquetas no decían lo medido.** q20 estaba en 2 midiendo 7 y q22 en 3 midiendo
 * 10: quedan **q20 → 1** y **q22 → 2**, y el bloque etiqueta 1 · 1 · 1 · 1 · 2 · 2 · 2 en el
 * orden en que va. **El orden de las dos operaciones importa**: corregir q20 a 1 sin haber
 * intercambiado antes deja `1 · 1 · 1 · 2 · 1 · 2 · 2` y rompe la puerta 9 por la etiqueta, no
 * por la medida. Van juntas o no van.
 *
 * **3 · q19 era el segundo pasaje más denso del módulo**: **26,3 palabras por oración de
 * media y una oración de 38**, la más larga de las cinco. Se parte esa oración en dos y no se
 * toca ninguna otra: el hueco y su complemento se quedan donde estaban, y lo que sale a
 * oración aparte es quién escribió la pieza —«…it ______ a piece written in the speech of the
 * market square. Its author was a schoolteacher who had never published a line.»—. El pasaje
 * queda en **21,4 de media y 30 la más larga**, con una palabra más que antes (107).
 *
 * **Las tres condiciones de clave única de q19 siguen cumplidas después del corte**, y hay que
 * comprobarlo cada vez que se parta una oración cerca de un hueco: «in 1893» sigue dentro de
 * la oración del hueco, el trasfondo sigue en pluscuamperfecto y unido por «when», y lo que se
 * separa —«Its author was a schoolteacher who had never published a line»— **no es un hecho
 * pasado al que el estreno preceda**, sino un estado anterior a él, de modo que el
 * pluscuamperfecto de C sigue sin tener a qué anteponerse. La forma verbal del hueco no cambia
 * de razón por el corte.
 *
 * **Ni una opción ni una razón de distractor se tocaron.** La densidad del pasaje es carga de
 * lectura; la distancia entre las cuatro opciones es lo que discrimina, y es donde vive el
 * trabajo de las rondas contra la prueba a ciegas. Bajar dificultad por ahí sería deshacerlo.
 *
 * Por R2, q19 cambió de texto y vuelve a la cola de auditoría. q20 no cambió ni un carácter:
 * solo de sitio y de etiqueta.
 *
 * ## SEGUNDO CORTE DE q19 (22 ago 2026) — el punto se saca por T, porque por L está cerrado
 *
 * El encargo era bajar q19 de 10 a 9 por el eje **L (localización)**, «juntando» «in 1893» con
 * el trasfondo en pluscuamperfecto, que el calibrador ve separados. **Ese camino no está
 * disponible, y conviene que quede escrito antes de que alguien vuelva a intentarlo:**
 *
 * - Los dos indicios ya están en la MISMA oración y pegados por el borde de cláusula:
 *   «…year after year **when, in 1893,** it ______ …». Lo único que los aleja son las 17
 *   palabras del trasfondo, y ese trasfondo está citado **entero y literal** en la `regla` del
 *   ítem y a medias en `razones.B` («had worked its way through… year after year»). Acortarlo
 *   es escribir en una razón, que es justo lo prohibido esta ronda.
 * - Cualquier reordenación que pegue «in 1893» al verbo «had worked» exige quitar el «when», y
 *   `razones.B` lo cita: «"When, in 1893," fija el momento de esa interrupción».
 * - Y la reordenación que a primera vista parece elegante —trasfondo a oración propia y la del
 *   hueco abriendo con «When, in 1893, it ______ …, the house sold out for eleven nights»—
 *   **devuelve las dos claves**: deja un hecho pasado posterior dentro de la oración del hueco,
 *   y con él «had staged» vuelve a ser defendible. Es exactamente la condición 2 de la `regla`.
 *
 * Así que el punto se saca por **T (complejidad del texto)**, que sí está libre porque no vive
 * en la oración del hueco. Se parten dos oraciones, **ninguna de ellas la del hueco**: la
 * primera del pasaje y la del éxito de taquilla. **De 21,8 a 15,3 palabras por oración**, de
 * cinco oraciones a siete. La más larga sigue siendo la del hueco (31 palabras) porque esa no
 * se toca: «in 1893», el pluscuamperfecto y el «when» siguen letra por letra donde estaban, de
 * modo que las tres condiciones de clave única no es que «sigan cumplidas» —es que no han sido
 * tocadas—.
 *
 * **Medida, y con la duda dicha.** T pasa de 2 a 1: la media queda en 15,3 (< 18), el léxico es
 * frecuente —teatro, pueblo, obras, público, maestro de escuela, funciones— y el tema es una
 * sucesión concreta de hechos, que son las tres condiciones que la regla del eje exige juntas.
 * Con eso **q19 mide 9** (T 1 · L 2 · D 3 · A 2 · E 1) y la curva de lectura del bloque pasa de
 * `7 · 7 · 7 · 7 · 10 · 10 · 10` a **`7 · 7 · 7 · 7 · 9 · 10 · 10`**: se acabó el peldaño de
 * cuatro fáciles a tres medios de golpe. La etiqueta **no se mueve**: 9 sigue en banda media
 * (8-11) y q19 sigue declarado 2, así que el bloque sigue etiquetando 1 · 1 · 1 · 1 · 2 · 2 · 2
 * y la puerta 9 no se toca.
 *
 * La otra lectura, por si el calibrador venía midiendo sobre `.aud/textos-f6.md` (que es de
 * antes del primer corte y todavía lleva la oración de 38 palabras): entonces su T era 3, el
 * ítem ya medía 9 antes de esta pasada y con este corte mide 8. Da igual para lo que importa:
 * 8 y 9 están los dos en banda media, los dos tapan el agujero de la curva y ninguno de los dos
 * mueve la etiqueta. Lo que NO habría dado igual es no medir y suponer.
 *
 * Ni una opción ni una razón se tocaron, otra vez. Los dos verbos en pasado que `razones.A`
 * necesita —«sold out», «printed»— siguen en el pasaje, en oraciones distintas; el «has opened
 * / every season since» que sostiene `razones.D` está intacto; el solape léxico con las cuatro
 * opciones era 0/0/0/0 y sigue igual, porque ninguna forma de *stage* aparece en el texto. El
 * pasaje pasa de 101,0 a 99,7 palabras-SAT.
 *
 * Por R2, q19 vuelve otra vez a la cola de auditoría: es el segundo cambio de texto del mismo
 * día sobre el mismo ítem, y su huella en el guardián cambia con él.
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
      "one,",
      "one;",
      "one",
      "one:",
    ],
    answer: 0,
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
      "A gallery can make an argument without writing one down. In one city museum the same eleven pictures have hung in the same order since 1978. Five of them were painted before the valley below was flooded for a reservoir, a photograph of the dam under construction hangs at the center, and the last five were painted after. Visitors who walk the room from left to right reach the final canvas expecting a ruin and find a lake instead. Three curators have come and gone without moving a frame, and in nearly fifty years no one has hung a label longer than a title. The order in which the eleven pictures were ______ tells a visitor what no label in the room is long enough to say.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "arranged",
      "arranged:",
      "arranged;",
      "arranged,",
    ],
    answer: 0,
  },
  {
    id: 'q20',
    type: 'mcq',
    part: 1,
    stimulus:
      "When the telegraph line was strung over the pass in 1868, the newspapers in the capital sold the project as an instrument of government. An order from the ministry would reach the border garrison in an hour instead of two weeks, and the ministry paid for the wire on that promise. The traffic that kept the wire busy was another matter. Merchants used it to move prices, and the price of wool at the port could set what a shepherd was offered five hundred kilometers inland by the following morning. In its first full year the company sent fewer than two hundred official ______ however, the fees it charged wool brokers covered a third of what the concession had cost.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "messages,",
      "messages",
      "messages;",
      "messages:",
    ],
    answer: 2,
  },
  {
    id: 'q19',
    type: 'mcq',
    part: 1,
    stimulus:
      "A theatre in a river town spent its first three decades on plays translated from other languages. Its audience came to expect an evening that sounded like somewhere else. The company had worked its way through the same handful of foreign comedies year after year when, in 1893, it ______ a piece written in the speech of the market square. Its author was a schoolteacher who had never published a line. The house sold out for eleven nights. The company printed the text at its own expense. Every season since, the theatre has opened its year with a play in the language its audience speaks at home.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "stages",
      "staged",
      "had staged",
      "has staged",
    ],
    answer: 1,
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
      "The oldest choir in the city has never once auditioned a singer. Anyone who turns up on three consecutive Thursdays is in, and anyone who stops turning up is out. Musicians who visit expect a congregation and hear something closer to a trained ensemble, which the director explains by arithmetic rather than by talent. Fifty Thursdays a year for eleven years come to more than five hundred rehearsals, which the director says is more singing together than most students have done by the time they leave a conservatory. The choir's administration is three people in all: a treasurer, who has never collected a single fee; a librarian, who keeps the only key to the music ______ a director, who has never once turned anyone away. The three of them meet in a room above a bakery that now sells bread on Thursday evenings to people who come only for the singing.",
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
        "Correcta: la oración abre con una cláusula subordinada introducida por «Because», y la norma pide una coma entre esa subordinada antepuesta y la principal que la sigue. La coma marca además dónde termina lo que explica y dónde empieza el sujeto de la oración, «the same shipment».",
      B:
        "El punto y coma pide oración independiente a los dos lados y a su izquierda solo encuentra la subordinada que abre con «Because». Es el error de quien usa el punto y coma como una coma reforzada cuando la primera parte del período le resulta larga.",
      C:
        "Deja la subordinada antepuesta pegada a la principal: «…than from a short one the same shipment often appears spread over three lines» obliga a leer «one» y «the same shipment» seguidos y sin frontera, y el lector empieza la principal dos o tres palabras después de donde empieza de verdad. Es el error de quien puntúa solo donde el sentido se le rompe.",
      D:
        "Los dos puntos exigen a su izquierda una oración completa, y a la izquierda del hueco solo hay «Because a clerk earned more from a long entry than from a short one», que es una subordinada. Es el error de quien lee lo que sigue como una explicación —y lo es— y da por hecho que eso basta para poner dos puntos, sin comprobar qué clase de unidad los precede.",
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
      "Entre el sujeto y su verbo no va ningún signo. A la izquierda del hueco está el sujeto de la oración, el sintagma nominal «The order in which the eleven pictures were arranged», y a la derecha su verbo, «tells». La norma escrita estadounidense no autoriza ahí ni coma, ni punto y coma, ni dos puntos: no es que el signo no haga falta, es que **cualquiera de los tres es un error**, y por eso la respuesta correcta es la opción que no lleva ninguno. Los dos signos fuertes fallan además por una segunda vía —los dos puntos piden oración completa a su izquierda y el punto y coma a los dos lados, y aquí no hay ninguna—.\n\nEste es el único ítem de fronteras del bloque cuya clave es la ausencia de signo, y existe para eso: ver punto 3 de la cabecera antes de tocarlo.\n\nCondición de clave única, escrita aquí porque es lo primero que se rompe al editar la frase: (1) **a la izquierda del hueco no puede cerrarse una oración independiente**; en cuanto la haya, los dos puntos y el punto y coma pasan a ser defendibles y el ítem tiene tres claves; (2) **a la derecha tiene que empezar el verbo del sujeto, y nada más**: con un sintagma nominal a la derecha vuelve la aposición y con ella la coma, y con una oración independiente vuelve el punto y coma; (3) **el hueco no puede llevar delante ninguna coma abierta**: si el sujeto se interrumpe con un inciso —«The order, arranged in 1978, ______ tells…»—, la coma que cierra el par se vuelve obligatoria y la clave se invierte, que es justamente el ítem de la nutria del bloque SEC del módulo 1; (4) **el sujeto tiene que llevar dentro un verbo finito** —«were arranged», dentro de la relativa—, porque es lo que sostiene a los dos distractores fuertes: sin él nadie pondría un punto y coma ahí y el ítem se quedaría de hecho en tres opciones.",
    razones: {
      A:
        "Correcta: lo que hay a cada lado del hueco es un sujeto y su verbo, y entre un sujeto y su verbo la norma escrita estadounidense no pone nada. La ausencia de signo no es aquí la opción prudente ni la menos mala: es la única forma correcta de la frase, y las otras tres son errores de puntuación, no versiones peores de la misma oración.",
      B:
        "Los dos puntos son el signo marcado del juego, el que parece la respuesta de una pregunta de puntuación, y por eso es la elección de quien decide sin leer la frase. Lo que los tumba es lo que tienen a la izquierda: exigen una oración completa, y ahí solo hay un sintagma nominal. Es también el error de quien oye en la frase un anuncio —«el orden de los cuadros: esto es lo que hace»— y coloca los dos puntos por el tono, no por la unidad que los precede.",
      C:
        "El punto y coma exige oración independiente a los dos lados y aquí no la tiene en ninguno: a su izquierda un sintagma nominal y a su derecha un predicado sin sujeto propio, «tells a visitor what no label in the room is long enough to say». Es el error de quien toma «were arranged» por el verbo de la oración —es el de la relativa, «in which the eleven pictures were arranged»— y da por cerrada una oración que todavía no ha empezado.",
      D:
        "Coma entre el sujeto y su verbo. Es la apuesta de quien puntúa por respiración: el sujeto es largo, al leerlo en voz alta se hace una pausa donde termina, y esa pausa se escribe. El inglés escrito no la admite —el sujeto entrega el verbo sin signo por larga que sea la distancia—, y aquí la coma además parte en dos la única oración del párrafo que dice qué hace el orden de los cuadros.",
    },
    fuenteHecho:
      "Museografía, hecho libre: el orden de colgado como argumento tácito de una sala, y la cartela reducida al título como decisión de montaje. El museo, las once obras, el embalse, la fotografía de la presa y la fecha de 1978 son invención propia y no describen ninguna colección real. La cuenta desde 1978 se escribe **«in nearly fifty years» y no una cifra exacta**: «forty-eight years» era correcto solo durante 2026 y pasaba a ser falso en enero de 2027, y un banco de ítems no se revisa cada enero. Toda cifra del examen que se mida contra «hoy» tiene que estar redondeada o acotada.\n\nEl pasaje no ha cambiado; sí la oración del hueco, que es la última. Decía «The reason the room can argue without a word of explanation is ______ the order in which the eleven pictures hang» y examinaba los dos puntos; dice ahora «The order in which the eleven pictures were ______ tells a visitor what no label in the room is long enough to say» y examina que sujeto y verbo no se separan. El motivo del cambio de regla no es de contenido —la sala sigue argumentando por su orden de colgado— sino de conjunto, y está en el punto 3 de la cabecera.",
  },
  {
    id: 'q20',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 1,
    tema: 'historia',
    regla:
      "Frontera entre dos oraciones independientes cuando la segunda empieza por un adverbio conjuntivo: «however» enlaza el sentido pero no une sintácticamente, de modo que hace falta un punto y coma. La coma sola produce empalme (comma splice) y la ausencia de signo, una oración seguida.",
    razones: {
      A:
        "Empalme de comas: a los dos lados del hueco hay oraciones con sujeto y verbo propios —«the company sent…» y «the fees… covered…»— y una coma no basta para separarlas. Es el error de quien trata «however» como si fuera «but»: «but» sí es conjunción coordinante y admitiría la coma, «however» no lo es.",
      B:
        "Sin ningún signo quedan dos oraciones seguidas sin frontera, y el lector arrastra «however» al final de la primera —«fewer than two hundred official messages however»— hasta que el segundo verbo lo obliga a volver atrás. Es la apuesta segura de quien no lee la frase entera: en la duda, ningún signo.",
      C:
        "Correcta: el punto y coma separa dos oraciones independientes que no van unidas por conjunción coordinante, que es exactamente lo que hay aquí; «however» es un adverbio conjuntivo, señala el contraste y va seguido de su propia coma, pero no puede sostener él solo la unión.",
      D:
        "Los dos puntos anuncian que lo que sigue desarrolla, ilustra o cumple lo que se acaba de decir, y aquí lo que sigue lo contradice: «however» avisa de un contraste, no de una ampliación. Es el error de quien ve dos hechos relacionados y coloca los dos puntos como si cualquier relación fuera explicación.",
    },
    fuenteHecho:
      "Historia de las telecomunicaciones, hecho libre: las líneas telegráficas se justificaron ante la opinión pública como instrumento de gobierno y se sostuvieron con tráfico comercial. La línea, el paso de montaña, 1868, la guarnición y el mercado de la lana son invención propia. Distancias en kilómetros, como el resto del examen: ninguna medida imperial obliga al estudiante a convertir bajo cronómetro. Por la misma razón el plazo es «two weeks» y no «fortnight»: la palabra es británica, queda fuera del currículo escolar de inglés en Colombia y en casi toda Latinoamérica, y aquí **no es adorno** —es la mitad del contraste «una hora en vez de…» que hace inteligible la promesa con la que se vendió la línea—, de modo que quien no la conociera perdía la premisa del párrafo entero.",
  },
  {
    id: 'q19',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 2,
    tema: 'humanidades',
    regla:
      "Pasado simple para el hecho que interrumpe un estado de cosas anterior. El texto deja el trasfondo en pluscuamperfecto —«The company had worked its way through the same handful of foreign comedies year after year»— y abre con «when, in 1893,» la oración del hueco: lo que va ahí es el acontecimiento que corta ese trasfondo, y en la norma escrita estadounidense ese acontecimiento va en pasado simple.\n\nLas cuatro opciones son formas corrientes y bien formadas del verbo, y las tres falsas lo son por lo que dice la oración, no por su dibujo: (1) el presente no cabe en una oración fechada en 1893 dentro de una narración cuyos verbos vecinos —«had worked», «sold out», «printed»— van todos en pasado; (2) el presente perfecto no admite complemento de tiempo pasado definido, y «in 1893» lo es; (3) el pluscuamperfecto sitúa un hecho antes de un punto del pasado, y aquí el hecho del hueco **es** ese punto: no hay ningún momento posterior al que anteponerlo, y el trasfondo al que precedería ya está escrito en pluscuamperfecto en la oración misma.\n\nCondición de clave única, escrita aquí porque es lo primero que se rompe al editar la frase: (1) **«in 1893» tiene que quedar dentro de la oración del hueco**; sin fecha, el presente perfecto pasa a ser defendible y el ítem tiene dos claves; (2) **la oración del hueco tiene que ser el último hecho pasado de su secuencia**: si se añade detrás otro acontecimiento en pasado al que este preceda —«…before the company lost its hall»—, el pluscuamperfecto se vuelve correcto y vuelven las dos claves; (3) **el trasfondo tiene que seguir en pluscuamperfecto y unido por «when»**, porque es lo que hace del hueco el punto de la interrupción y no un hecho suelto.\n\nY una condición de conjunto, que no es de clave única sino de fuga, y que es la razón de que este ítem exista (punto 5 ter de la cabecera): **las cuatro opciones son dos simples y dos perfectas, y una de cada par lleva marca de singular**. Ni «elige el perfecto» ni «elige la forma de singular» descartan nada, y la combinación de las dos —«singular + perfecto», que es la apuesta que tumbó dos versiones anteriores de este ítem— cae sobre D. No se puede sustituir una perfecta por otra simple sin devolver al juego un solo miembro marcado.",
    razones: {
      A:
        "Presente en una oración fechada —«in 1893»— y dentro de un relato cuyos demás verbos van en pasado. Es el error de quien escribe la historia de un teatro como una cronología de programa de mano, «1893: la compañía estrena…»: el presente histórico existe, pero pide un texto entero escrito así, y este empieza en pasado y sigue en pasado dos oraciones después. Quien la marca ha leído la fecha como una entrada de catálogo y no como el momento de una oración.",
      B:
        "Correcta: el hueco es el acontecimiento que corta el trasfondo, y el trasfondo ya está en pluscuamperfecto —«had worked its way through… year after year»— precisamente para dejarle sitio. «When, in 1893,» fija el momento de esa interrupción, y un momento pasado y cerrado pide pasado simple: ni presente, que la fecha no admite, ni perfecto, que colocaría el estreno antes de un punto del pasado que aquí no existe.",
      C:
        "Pluscuamperfecto para el hecho que interrumpe. Es el error de quien copia la forma que tiene delante —«had worked», dos líneas antes— y da por hecho que todo lo que ocurrió hace mucho se cuenta igual. El pluscuamperfecto es una forma relativa: necesita un punto posterior del pasado al que anteponerse, y en este párrafo el punto posterior es justamente el estreno del hueco. Ponerlo ahí obliga a leer que la compañía estrenó la pieza **antes** de las tres décadas que la pieza vino a interrumpir.",
      D:
        "Presente perfecto con complemento de tiempo pasado definido: el inglés escrito no admite «in 1893 it has staged». Es el error de quien arrastra el «has opened» del cierre sin ver que aquel es correcto por su propio complemento —«every season since» abre un período que llega hasta hoy— y este no, porque «in 1893» cierra el suyo. Es además la opción donde se cruzan las dos apuestas de quien decide sin leer la frase: la forma perfecta, que es la que un examen de gramática parece estar examinando, y la marca de singular, que es el número por defecto cuando no se ve el sujeto. Que las dos caigan aquí y no en la clave es a propósito.",
    },
    fuenteHecho:
      "Historia del teatro, hecho libre: las compañías de provincias vivieron durante el siglo XIX de repertorio traducido y de refritos extranjeros, y el paso a obra escrita en la lengua o el habla del público fue un episodio corriente y tardío en muchas de ellas. El pueblo, la compañía, el maestro de escuela, la fecha de 1893 y las once funciones son invención propia: el pasaje no atribuye ninguna primicia a nadie ni describe ningún teatro real. Sin país, sin moneda y sin medidas, como el resto del módulo.\n\n**Este ítem sustituye al de historia editorial que ocupaba esta fila** (impresor de provincias, «In 1846», el verbo «contain»), retirado por R11 en la quinta vuelta; el porqué está en el punto 5 ter de la cabecera. Las dos correcciones de equidad y veracidad que aquel arrastraba se conservan como criterio y no como texto: no se afirma ninguna primicia histórica que no se pueda sostener —era el error de un siglo del pasaje de 1846— y no hay ninguna referencia nacional que no aporte nada al ítem, que era lo que se le quitó al «ordinary American bookstore» de aquel cierre.\n\n**El pasaje se partió por oraciones el 22 ago 2026 y no cambió de contenido.** La oración del hueco era la más larga del módulo después de la de q25 —38 palabras— y se corta detrás de «in the speech of the market square»: quien escribió la pieza pasa a oración propia, «Its author was a schoolteacher who had never published a line». El pasaje baja de 26,3 a 21,4 palabras por oración de media y de 38 a 30 la más larga. Las tres condiciones de clave única siguen cumplidas —la fecha dentro de la oración del hueco, el trasfondo en pluscuamperfecto unido por «when» y ningún hecho pasado posterior al que el estreno preceda—, y ni una opción ni una razón se tocaron. El detalle está en la sección «CALIBRACIÓN» de la cabecera.\n\n**Segundo corte, el mismo día: dos oraciones más, y ninguna de ellas es la del hueco.** Se parten la primera —«…plays translated from other languages. Its audience came to expect an evening that sounded like somewhere else.»— y la del éxito —«The house sold out for eleven nights. The company printed the text at its own expense.»—. El pasaje pasa de 21,8 a 15,3 palabras por oración y de cinco oraciones a siete; la más larga sigue siendo la del hueco, con 31, porque **esa oración no se toca en absoluto**: «in 1893», el trasfondo en pluscuamperfecto y el «when» que los une siguen exactamente donde estaban, letra por letra. Los verbos que la razón de A necesita en pasado —«sold out», «printed»— siguen los dos en el pasaje, solo que en oraciones distintas, y el «has opened / every season since» que sostiene la razón de D no se ha tocado. Ni un tipo léxico entra o sale del pasaje: el solape con las cuatro opciones era 0/0/0/0 y sigue siéndolo, porque ninguna forma de *stage* aparece en el texto. Longitud: de 101,0 a 99,7 palabras-SAT.",
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
    dificultad: 2,
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
      "Práctica coral aficionada, hecho libre: un coro sin audiciones cuya calidad se explica por horas acumuladas y no por selección. La aritmética del párrafo es correcta: un año tiene cincuenta y dos jueves, de los cuales el texto cuenta cincuenta, y cincuenta jueves por once años dan quinientos cincuenta ensayos. El coro, la ciudad, la panadería y las cifras son invención propia. La comparación con el conservatorio la sostiene ahora el director —«which the director says is more singing together than…»— y no el narrador: cuánto han cantado juntos los estudiantes al salir de un conservatorio no es verificable, y el párrafo ya había presentado al director como quien explica el coro por aritmética.",
  },
]
