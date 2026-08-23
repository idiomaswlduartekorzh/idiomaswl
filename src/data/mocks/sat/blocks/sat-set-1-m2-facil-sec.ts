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
 *      q16 → coma · q18 → sin signo · q20 → dos puntos · q22 → punto y coma (delante de «and»)
 *
 *    Y **en qué letra vive cada uno**, porque el reparto de letras se decidió a nivel de módulo y
 *    llegó aquí como permutación: q16 → A · q18 → A · q20 → C · q22 → B. Las letras del bloque
 *    entero son `A C A B C D B`. Signo y letra son independientes a propósito: la clave sin signo
 *    y la clave con coma comparten letra (las dos en A), y las dos claves de signo fuerte están
 *    en letras distintas (C y B), de modo que ninguna apuesta de letra reproduce una apuesta de
 *    signo.
 *
 *    **Residuo conocido de q18, que ninguna permutación arregla**: su clave es la opción sin
 *    signo y por eso es un carácter más corta que las otras tres, esté en la letra que esté. No
 *    es una pista de longitud creada al reordenar —la diferencia es la regla misma— y es
 *    inseparable de tener una clave sin signo, que es lo que el punto 3 exige. Cuente como
 *    aceptado, no como pendiente.
 *
 *    **Cada una de las cuatro formas es clave exactamente una vez, y con eso el reparto queda
 *    cerrado (23 ago 2026).** Hasta la séptima vuelta no era así: la regla de q20 —punto y coma
 *    ante adverbio conjuntivo— y la de q22 —serie con comas internas— exigían las dos ese signo,
 *    el punto y coma era clave dos veces y, por pura aritmética, alguna de las cuatro formas
 *    tenía que quedarse sin serlo nunca. Fueron los dos puntos, y el auditor de lengua lo levantó
 *    con la etiqueta correcta: «en este módulo, nunca los dos puntos» es un patrón aprendible de
 *    la familia de R14, el mismo que costó dos versiones de q18 cuando el que nunca pagaba era
 *    «sin signo».
 *
 *    **La salida no era quitar la opción, era mover una regla.** Retirar los dos puntos del juego
 *    de uno de los cuatro ítems deja la eliminación en pie en los otros tres —la subida pasa de
 *    33 % a 31 %, que es cosmética—. Lo que la cierra es que el signo pague en algún sitio, y con
 *    dos ítems obligados al punto y coma no había sitio. Se rehízo **q20**, que era el más barato
 *    de los dos: regla de una sola oración, banda fácil y sin arquitectura de lista que
 *    reconstruir. Su clave son ahora los dos puntos. Lo que sale de ahí es el único reparto sin
 *    residuo:
 *
 *      «siempre coma» · «siempre sin signo» · «siempre punto y coma» · «siempre dos puntos»
 *        → **1 de 4 cada una: el azar exacto**
 *      cualquier eliminación global «nunca X» → tres ítems a 1/3 y un cero: **1,0 de 4, el azar**
 *      la peor combinación de dos eliminaciones, «nunca dos puntos» + «la coma es la trampa»
 *        → **1,0 de 4 (25 %)**, donde el mejor reparto anterior dejaba 1,5 (37,5 %)
 *
 *    Ninguna apuesta ciega sobre signos pasa del azar, y no por compensación: por construcción.
 *
 *    **Lo que costó, escrito para que nadie lo descubra creyendo que se ocultó.** El módulo deja
 *    de examinar el punto y coma ante adverbio conjuntivo —«…messages; however, the fees…»—, que
 *    es una de las fronteras más frecuentes del SAT real y que el bloque SEC del módulo 1 tampoco
 *    examina. Se ha cambiado una regla muy examinable por un reparto que ninguna apuesta ciega
 *    puede explotar. Es un intercambio, no una mejora gratis. Si alguna vez se decide al revés,
 *    lo que hay que rehacer es **q22** —su serie con comas internas es la más rara de las cuatro
 *    reglas—, y en ningún caso volver a dos claves del mismo signo.
 *
 *    **Y lo que no cambia: la clave de q18 sigue siendo la ausencia de signo.** El diagnóstico que
 *    la puso ahí sigue en pie, y la razón está medida:
 *
 *    a) «Menos signos es más seguro» no hay que aprenderla aquí: se trae de fuera, y la trae
 *       también el estudiante real. Un reparto en el que esa apuesta paga cero le regala
 *       información al que no lee, igual que se la regalaba el anterior al que apostaba por el
 *       signo marcado.
 *    b) La heurística contraria tampoco es hipotética: quien no lee un ítem de puntuación elige
 *       el signo marcado, y el signo marcado son los dos puntos. Con el reparto de hoy ese
 *       solucionador acierta uno de cuatro; con el anterior acertaba cero, que suena mejor de lo
 *       que es, porque un cero sistemático también es información explotable.
 *    c) Los dos puntos ya pagaban un módulo antes: en el bloque SEC del módulo 1 la clave de q20
 *       es «the same recipe:». Que vuelvan a pagar aquí no le enseña al estudiante nada falso;
 *       lo que se lo enseñaba era no pagar nunca. Sobre la coincidencia de signo con aquel ítem
 *       —y por qué las dos reglas no son la misma— ver la lista de las siete reglas, más abajo.
 *
 *    Lo que quede sigue siendo una metarregla, y una metarregla descarta una opción sin elegir
 *    entre las otras tres. Se midió en la cuarta vuelta metiendo en el panel a ciegas un
 *    solucionador con instrucción expresa de buscar esa clase de pista: sacó **4 de 27**, por
 *    debajo del azar.
 *
 *    **No repongas la política vieja «por coherencia».** Volver a poner un signo en la clave de
 *    q18 devuelve al bloque el patrón uniforme y con él la fuga de 7 de 10. Lo que hay que
 *    vigilar al editar no es que las cuatro claves lleven signo, sino que cada una de las cuatro
 *    formas de opción sea clave exactamente una vez.
 * 4. **Ningún signo se ofrece junto a otro que también valdría.** Con dos oraciones
 *    independientes, punto y punto y coma son las dos correctas —por eso la versión anterior de
 *    q20, la del «however», no ofrecía el punto—; y con oración completa a los dos lados, los dos
 *    puntos y el punto y coma también lo son. De ahí que en el q20 de hoy lo que sigue al hueco
 *    sea un sintagma nominal y no una oración: es justo lo que deja vivos los dos puntos y mata
 *    el punto y coma. Es la puerta 4 (clave única) aplicada al reverso.
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
 *    Lo que de aquel diagnóstico sigue en pie es el principio; lo que ya no está es la
 *    obligación que lo estrechaba. Durante seis vueltas el punto y coma fue clave **dos veces**,
 *    porque la regla de q20 (adverbio conjuntivo entre dos independientes) y la de q22 (serie con
 *    comas internas) exigían las dos ese signo y ninguna admitía otro; y esa doble obligación era
 *    la que forzaba que alguna de las cuatro formas se quedase sin ser clave nunca. El 23 ago
 *    2026 q20 cambió de regla y con él desapareció la obligación: el punto y coma es clave una
 *    sola vez, en q22, y las cuatro formas se reparten una a una. **La decisión que este punto
 *    llamaba «la única disponible» —cuál de las cuatro formas se sacrifica— ya no hay que
 *    tomarla**, y el precio de no tomarla está en el punto 3: el módulo pierde el punto y coma
 *    ante adverbio conjuntivo.
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
 *   q20 dos puntos ante el sintagma que especifica lo anunciado ·
 *   q21 concordancia con frase interpuesta ·
 *   q22 punto y coma como separador de serie con comas internas
 *
 * Ninguna de las siete se repite dentro del bloque. **Con el módulo 1 hay, desde el 23 ago 2026,
 * una coincidencia de signo, y conviene mirarla de frente**: allí la clave de q20 son unos dos
 * puntos —«the same recipe:»— y aquí la de q20 también. La regla no es la misma y la
 * discriminación tampoco. En el módulo 1 los dos puntos preceden a una **enumeración** cuyos tres
 * miembros ya llevan comas dentro, y lo que mata a la coma es que metería el anuncio dentro de la
 * serie; aquí preceden a un **sintagma nominal único**, y lo que mata a la coma es que la palabra
 * de delante es un adverbio y un adverbio no admite aposición. Quien resolviera aquel de memoria
 * —«dos puntos cuando viene una lista»— no tiene aquí ninguna lista que ver. Lo que sí se repite
 * es el requisito común a cualquier uso del signo, oración completa a la izquierda, y eso es la
 * regla examinada, no una pista sobre la clave. Lo que q18 sí toca de refilón es el q18 del módulo 1, el de la
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
 * - q20: a la izquierda del hueco tiene que cerrarse una oración completa —«Whatever kept the
 *   line solvent lay elsewhere»—, que es lo único que los dos puntos exigen delante. A la derecha
 *   tiene que quedar un sintagma nominal y **no** una oración: en cuanto tenga sujeto y verbo
 *   propios, el punto y coma es tan correcto como los dos puntos y el ítem tiene dos claves. Y dos
 *   condiciones más, que son las que sostienen falsos a los otros dos distractores: la palabra que
 *   precede al hueco no puede ser un nombre —con un nombre delante, la coma se convierte en una
 *   aposición explicativa legítima—, y el sintagma de la derecha no puede empezar por una
 *   preposición que el verbo admita, porque «lay elsewhere in the fees…» es correcto sin ningún
 *   signo y la opción sin signo pasaría a ser clave.
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
 *
 * ## TERCERA PASADA DE COMPLEJIDAD (22 ago 2026) — los seis pasajes que sostienen un signo
 *
 * Diagnóstico del calibrador, y es exacto: **seis de los siete pasajes iban a 21-25 palabras por
 * oración** —las oraciones más largas del módulo— y sostenían ítems que miden una coma o un punto
 * y coma. Esa carga de lectura no mide nada: un ítem de puntuación no necesita un pasaje trabajado,
 * necesita una frase clara alrededor del hueco. Se parten oraciones en q16, q17, q18, q20, q21 y
 * q22. El `diff` de esta pasada son **seis líneas, las seis de `stimulus`**: ni una opción, ni una
 * razón, ni una clave, ni una etiqueta.
 *
 * **Medido, palabras por oración de media (antes → después, y nº de oraciones):**
 *
 *   q16 23,0 → 15,0 (4 → 6) · q17 23,0 → 14,2 (5 → 8) · q18 21,2 → 12,5 (6 → 10)
 *   q20 24,0 → 13,6 (5 → 8) · q21 20,6 → 15,3 (5 → 7) · q22 25,2 → 16,9 (6 → 9)
 *
 * Los seis bajan de 18 con léxico frecuente y tema concreto, que son las tres condiciones que el
 * eje T exige juntas: **T pasa de 2 a 1 en los seis, y son seis puntos**.
 *
 * La longitud apenas se mueve, que es lo que se buscaba —esto es un corte de oraciones, no un
 * recorte de pasaje—. Palabras-SAT (caracteres ÷ 6, puerta 7, rango 25-150):
 *
 *   q16 80,0 → 78,7 · q17 100,0 → 99,8 · q18 112,8 → 111,8 · q20 111,5 → 100,5 ·
 *   q21 89,7 → 93,2 · q22 143,0 → 142,7
 *
 * q21 sube porque el tambor de relojería pasa a oración propia y gana artículo y verbo; q20 baja
 * once porque se le quita la relativa libre del final. Las otras puertas que leen el `stimulus`
 * se comprobaron sobre el texto nuevo: la palabra de delante del hueco no coincide con ninguna
 * opción en ninguno de los siete, y el solape léxico clave-distractores sigue siendo 0/0/0/0 en
 * los siete, porque en SEC las opciones son la misma palabra con distinto signo. Ningún pasaje gana ni
 * pierde contenido; lo único que cambia es dónde acaban las oraciones. Los cambios de palabra son
 * cuatro y ninguno toca material citado en una razón: «what the concession had cost» → «the cost»
 * en q20 (palabra rara y relativa libre), «nothing grander» → «nothing more» y «Its value» → «The
 * value of the gauge» en q21 (el posesivo se había quedado sin antecedente al partir la oración) y
 * «three consecutive Thursdays» → «three Thursdays in a row» en q22.
 *
 * **La oración del hueco no se parte en ningún ítem.** En los seis, el corte cae fuera de ella o
 * en su cola no examinada, y las condiciones de clave única de la lista de arriba se comprobaron
 * una por una **después** de cortar:
 *
 *   q16 · a la izquierda del hueco sigue habiendo solo la subordinada «Because a clerk earned more
 *         from a long entry than from a short», y la oración llega entera hasta «spread over three
 *         lines», que es lo que cita `razones.C`. Lo que sale a oración propia es el desglose.
 *   q17 · el antecedente «the seedlings» sigue en la misma oración del hueco y en plural, y lo que
 *         se separa es la cola «and a stand of trees begins…», que no decidía nada.
 *   q18 · la oración del hueco no se toca: sujeto con «were arranged» dentro, «tells» a la derecha,
 *         ninguna coma abierta antes y ninguna oración independiente cerrada a la izquierda.
 *   q20 · a la derecha de «however» sigue habiendo oración con sujeto y verbo propios —«the fees it
 *         charged wool brokers covered a third of the cost»—, que es lo que sostiene el punto y coma.
 *   q21 · el núcleo «row», la frase interpuesta y el verbo coordinado «and stores» siguen los tres
 *         dentro de la oración del hueco. Lo que sale es la relativa final del cupboard.
 *   q22 · la oración de la lista **no se ha tocado en ningún carácter**: el dos puntos tras «three
 *         people in all», las tres relativas explicativas y el primer punto y coma siguen igual.
 *
 * Un efecto lateral que conviene anotar porque **corrige** una imprecisión vieja: en q17 el
 * «carrying its own small store of food» colgaba en realidad de «the young plant» y no de «Each
 * seed», que es de quien lo hacen colgar `razones.A` y `razones.C`. Al partir la oración se ha
 * colocado bajo «Each seed», que es donde las razones ya decían que estaba. La razón no se
 * cambió: se cambió el texto para que la razón sea literalmente cierta.
 *
 * **Localización (eje L): un punto sale y el otro no está disponible.** El encargo pedía bajar L
 * en q21 y q22 llevando el dato que decide a la oración del hueco.
 *
 * - **q21 sí baja.** Los dos datos que deciden —el núcleo «row» y el verbo coordinado «and
 *   stores»— ya estaban dentro de la oración, pero la oración seguía 11 palabras más allá de
 *   «stores» con una segunda relativa («a cupboard that is opened only after a storm») que obliga
 *   a releer para volver al hueco. Esa cola sale a oración propia: la oración pasa de **43 a 34
 *   palabras**, el tramo del hueco a «stores» de **13 a 11**, y lo que queda detrás de «stores»
 *   de **11 a 5**. Lo que **no** puede bajar es el tramo de «row» al hueco (13 palabras): es la
 *   frase interpuesta, o sea la regla misma, y `razones.D` la cita entera y literal.
 * - **q22 no baja, y conviene que quede escrito antes de que alguien lo intente.** Los tres datos
 *   que deciden —el dos puntos que abre la enumeración, el primer punto y coma y las comas
 *   internas de los tres miembros— están **todos** dentro de la oración del hueco, así que no hay
 *   nada que acercar; y los tres están citados palabra por palabra en `razones.A` («a treasurer,
 *   who has never collected a single fee»), `razones.C` («the only key to the music cupboard and a
 *   director») y `razones.D` («three people in all»). Acortar esa oración es escribir en una
 *   razón. Lo que sí baja en q22 es T, de 25,2 a 16,9, y con ella el camino hasta la lista: las
 *   cuatro oraciones que la preceden iban 12 · 18 · 24 · 34 y ahora van 12 · 12 · 7 · 13 · 10 ·
 *   34, y la de 26 que venía detrás se parte en dos. Ninguna de ellas decidía nada.
 *
 * **Cuenta de puntos, con la resta hecha:** seis por T y **uno** por L, siete en total, no los
 * ocho que salen de sumar el encargo (6 + 2) ni los nueve de su titular. El punto que falta es el
 * L de q22 y su precio está dicho arriba.
 *
 * **La curva del bloque, que es lo que hay que mirar después de bajar seis ítems a la vez.** En
 * orden de lectura queda **6 · 6 · 6 · 6 · (q19) · 8 · 8**. Ninguna etiqueta se mueve: los cuatro
 * primeros siguen declarados 1 y siguen en banda fácil (≤ 7), q21 y q22 siguen declarados 2 y
 * siguen en banda media (8-11), y el bloque sigue etiquetando 1 · 1 · 1 · 1 · 2 · 2 · 2. **El
 * único punto abierto es q19**, que se lee en quinto lugar: si mide 8 —la lectura del «SEGUNDO
 * CORTE» cuando el calibrador parte de `.aud/textos-f6.md`— la curva sale 6 · 6 · 6 · 6 · 8 · 8 ·
 * 8, no decreciente y con un solo escalón, justo en la frontera de banda que la etiqueta anuncia.
 * Si mide 9, hay un bache de un punto (9 → 8) dentro de la misma banda. No es el caso que la
 * CALIBRACIÓN llamaba avería —aquello era una caída de tres puntos **y** un cambio de banda—,
 * pero hay que decidirlo con la medida de q19 delante y no aquí.
 *
 * Por R2, los seis ítems cambian de texto y vuelven a la cola de auditoría; su huella en el
 * guardián cambia con ellos. q19 es el único de los siete que esta pasada no toca.
 *
 * ## PASADA DEL AUDITOR DE LENGUA (23 ago 2026) — un pronombre roto, un signo que nunca pagaba
 *
 * El auditor certificó los siete aptos y sin dobles claves, y confirmó expresamente que el corte
 * de oraciones de la tercera pasada **no rompió ninguna condición de clave única**, que era el
 * riesgo de aquella ronda. Lo que sí encontró son cinco cosas, y ninguna se arregla con una
 * disculpa en un comentario.
 *
 * **Aviso de lectura antes de nada: todo lo que las secciones anteriores dicen de q20 con
 * «however» describe una versión retirada.** El pasaje del telégrafo sigue siendo el mismo y las
 * medidas de complejidad de aquellas pasadas siguen valiendo, pero la oración del hueco cambió de
 * regla y de opciones ese día. Lo vigente está en el punto 3, en el punto 6 y en el `fuenteHecho`
 * del ítem.
 *
 * **1 · q17 tenía un pronombre ambiguo, y es el ítem que examina pronombres.** Al partir la
 * oración de apertura en la tercera pasada, «Their seeds do not drop to the ground» se quedó sin
 * antecedente propio: el sintagma plural más cercano había pasado a ser «most trees» —los árboles
 * que **no** enraízan en ese fango—, de modo que la frase, leída al pie de la letra, atribuía las
 * semillas a quien no las tiene y además decía algo falso. No creaba segunda clave, y por eso no
 * apareció en la puerta de claves; lo que minaba era la validez, que es peor: referencia
 * pronominal rota justo donde se pregunta por referencia pronominal. → «Mangrove seeds do not
 * drop to the ground…». Ni una opción ni una razón se tocaron, y la condición de clave única del
 * ítem se comprobó después: el antecedente «the seedlings» sigue en la oración del hueco y en
 * plural, y el cambio no mete ningún singular nuevo.
 *
 * **2 · Los dos puntos se ofrecían en los cuatro ítems de fronteras y no eran la clave ni una
 * vez.** Es el hallazgo de conjunto de la pasada y la única decisión que había que tomar. Está
 * resuelto rehaciendo la regla de q20, y el porqué, la aritmética y lo que ha costado están en el
 * punto 3 y en el punto 6, que es donde alguien los va a buscar. Resumen: cada una de las cuatro
 * formas es ahora clave exactamente una vez, ninguna apuesta ciega sobre signos pasa del azar, y
 * el módulo pierde a cambio el punto y coma ante adverbio conjuntivo.
 *
 * **3 · «theatre» era el único britanismo del módulo**, que escribe «color», «gray» y
 * «kilometer» a la americana. Dos apariciones en el pasaje de q19 → «theater». No toca ninguna
 * razón: las de ese ítem citan «had worked», «sold out», «printed» y «has opened».
 *
 * **4 · Tres frases que decían algo distinto de lo que querían decir.** No son dobles claves ni
 * fugas; son el pasaje mintiendo un poco, que es lo que la puerta de veracidad persigue:
 *
 *   - q20 · «Merchants used it to move prices» significa en inglés *hacer que los precios se
 *     muevan*, o sea lo contrario de lo que el párrafo cuenta —el hilo llevaba la cotización, no
 *     la alteraba—. → «to carry prices».
 *   - q21 · «…traces the rise and fall of the water… and stores the rolls in a cupboard»: una
 *     hilera de mareógrafos no guarda rollos en un armario, eso lo hace alguien. Y «stores» es
 *     una de las dos cosas que fijan la clave —es el verbo coordinado en presente simple—, así
 *     que su sujeto tiene que ser creíble o el estudiante duda de la coordinación por donde no
 *     debe. → «…and stores the record on rolls of paper. The rolls go into a cupboard that is
 *     opened only after a storm.» El verbo citado por `razones.B`, `razones.C` y `razones.D` es
 *     «and stores» y sigue letra por letra; el núcleo «row», la frase interpuesta y el verbo
 *     coordinado siguen los tres dentro de la oración del hueco. La oración pasa de 34 a 35
 *     palabras y el pasaje de 15,3 a 16,1 de media: sigue por debajo de 18 y T sigue en 1.
 *   - q22 · «Fifty Thursdays a year for eleven years **come** to more than five hundred
 *     rehearsals» es defendible —sujeto aritmético con verbo plural—, pero es exactamente la
 *     decisión que **q21 examina** dos ítems antes, y no se deja un caso discutible del mismo
 *     asunto suelto en el mismo bloque. → «add up to», que con sujeto plural no admite discusión.
 *
 * **5 · Y una que se mira y se deja.** El auditor propuso además meter un segundo conector
 * contrastivo en q27 (bloque EOI) para que su clave no se alcance por descarte de categoría. Está
 * decidido en el `fuenteHecho` de aquel ítem y la respuesta es que no: el único contrastivo que
 * no crea segunda clave ya es distractor en q26, dentro del mismo grupo de tres transiciones, y
 * ponerlo dos veces sin que pague nunca reproduce el patrón aprendible que esta misma pasada
 * viene a quitar de los signos.
 *
 * **Ninguno de los cinco arreglos sube la dificultad.** Medido, palabras por oración: q17 14,2
 * (igual) · q19 15,3 (igual) · q20 13,6 → **12,9** · q21 15,3 → **16,1** · q22 16,9 → **17,0**.
 * Los dos que suben lo hacen por menos de una oración de diferencia y **los cinco siguen por
 * debajo de 18**, que es el umbral del eje T: ninguno cambia de escalón. La localización no se
 * mueve en ninguno —lo que decide sigue dentro de la oración del hueco en los cinco— y ninguna
 * etiqueta cambia. Por R2 vuelven a la cola de auditoría q17, q19, q20, q21 y q22 —los cinco cambian de
 * texto— y **q20 entero**, que cambia además de regla, de opciones y de razones.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q16',
    type: 'mcq',
    part: 1,
    stimulus:
      "For two centuries the accounts of the salt works were copied out by hand. The treasury paid its clerks by the page rather than by the hour. Historians who use those ledgers now have to read them twice. Because a clerk earned more from a long entry than from a short ______ the same shipment often appears spread over three lines. The weight, the buyer, and the date each take a line of their own. The ledgers say less about the salt trade than about the men who kept them.",
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
      "Mangroves grow where a river meets the sea. The mud there is too salty for most trees to root in at all. Mangrove seeds do not drop to the ground and wait there for a better season. Each seed sprouts while it is still attached to the parent tree, carrying its own small store of food. The young plant falls into the water already the length of a hand, green and buoyant. The seedlings can drift on a tide for a month or more without harm. When the seedlings finally settle in shallow water, ______ roots take hold over the following weeks. A stand of trees begins where there had been nothing but silt.",
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
      "A gallery can make an argument without writing one down. In one city museum the same eleven pictures have hung in the same order since 1978. Five of them were painted before the valley below was flooded for a reservoir. A photograph of the dam under construction hangs at the center. The last five were painted after. Visitors walk the room from left to right and reach the final canvas expecting a ruin. They find a lake instead. Three curators have come and gone without moving a frame. No one has hung a label longer than a title in nearly fifty years. The order in which the eleven pictures were ______ tells a visitor what no label in the room is long enough to say.",
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
      "The telegraph line was strung over the pass in 1868. The newspapers in the capital sold it as an instrument of government. An order from the ministry would reach the border garrison in an hour instead of two weeks. The ministry paid for the wire on that promise. The traffic that kept the wire busy was another matter. Merchants used it to carry prices. The price of wool at the port reached a shepherd five hundred kilometers inland by the next morning. In its first full year the company sent fewer than two hundred official messages. Whatever kept the line solvent lay ______ the fees it charged wool brokers, which covered a third of the cost.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "elsewhere,",
      "elsewhere",
      "elsewhere:",
      "elsewhere;",
    ],
    answer: 2,
  },
  {
    id: 'q19',
    type: 'mcq',
    part: 1,
    stimulus:
      "A theater in a river town spent its first three decades on plays translated from other languages. Its audience came to expect an evening that sounded like somewhere else. The company had worked its way through the same handful of foreign comedies year after year when, in 1893, it ______ a piece written in the speech of the market square. Its author was a schoolteacher who had never published a line. The house sold out for eleven nights. The company printed the text at its own expense. Every season since, the theater has opened its year with a play in the language its audience speaks at home.",
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
      "A tide gauge is a plain instrument: a float in a sheltered well and a pen on an arm. Clockwork turns the paper drum under the pen. The value of the gauge comes from repetition rather than from precision. One measurement of high water on one morning tells a port almost nothing. But the row of gauges that the port authority has kept along the estuary since 1892 ______ the rise and fall of the water without a break and stores the record on rolls of paper. The rolls go into a cupboard that is opened only after a storm. Sea level is nothing more than a very long stack of those rolls.",
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
      "The oldest choir in the city has never once auditioned a singer. Anyone who turns up on three Thursdays in a row is in. Anyone who stops turning up is out. Visiting musicians expect a congregation and hear something closer to a trained ensemble. The director explains this by arithmetic rather than by talent. Fifty Thursdays a year for eleven years add up to more than five hundred rehearsals, which the director says is more singing together than most students have done by the time they leave a conservatory. The choir's administration is three people in all: a treasurer, who has never collected a single fee; a librarian, who keeps the only key to the music ______ a director, who has never once turned anyone away. The three of them meet in a room above a bakery. The bakery now sells bread on Thursday evenings to people who come only for the singing.",
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
      "Historia administrativa, hecho libre: el pago a los escribientes por página y su efecto sobre la forma de los libros de cuentas es un lugar común de la crítica de fuentes. Las salinas, los dos siglos y el desglose en tres líneas son invención propia; no describen ningún archivo concreto.\n\n**Corte de complejidad (22 ago 2026), sin cambio de contenido.** Se parten dos oraciones y ninguna es la del hueco: la de apertura se separa de la del pago por página, y el desglose del envío sale de la oración examinada a oración propia —«The weight, the buyer, and the date each take a line of their own»—. De **23,0 a 15,0** palabras por oración, de cuatro oraciones a seis. La oración del hueco conserva lo que la sostiene: a la izquierda del hueco sigue habiendo solo la subordinada, y sigue llegando hasta «spread over three lines», que es lo que cita `razones.C`. Ni una opción ni una razón se tocaron.",
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
      "Botánica de manual: la viviparidad del mangle. La semilla no se desprende para esperar en el fango, sino que germina adherida al árbol y cae al agua ya como propágulo desarrollado; el propágulo flota y se mantiene viable durante semanas, y una vez varado en agua somera echa raíces a lo largo de varias semanas, no en un día. Sin especie, país ni cifras: la comparación con el largo de una mano es propia.\n\n**Corte de complejidad (22 ago 2026), sin cambio de contenido.** Se parten tres oraciones: la de apertura, la de la germinación y la del hueco por su cola. De **23,0 a 14,2** palabras por oración, de cinco oraciones a ocho. El antecedente «the seedlings» sigue dentro de la oración del hueco y en plural —lo que sale de ella es «and a stand of trees begins where there had been nothing but silt», que no decidía nada—, y ningún singular nuevo entra en el pasaje. El corte **corrige** además una imprecisión de las razones: «carrying its own small store of food» colgaba de «the young plant» y ahora cuelga de «Each seed», que es de quien `razones.A` y `razones.C` decían que colgaba. Se cambió el texto para que la razón sea literalmente cierta; la razón no se tocó.\n\n**Referencia pronominal (23 ago 2026).** El mismo corte había dejado un «Their seeds do not drop to the ground» cuyo plural más cercano era «most trees», los árboles que no enraízan en ese fango: el pronombre colgaba de quien no tiene esas semillas y la frase, así leída, era falsa. En el ítem que examina concordancia de pronombre y antecedente eso no es un descuido de estilo. → «Mangrove seeds do not drop to the ground…». El antecedente del hueco, «the seedlings», sigue en la misma oración y en plural, no entra ningún singular nuevo en el pasaje y ni una opción ni una razón se tocaron.",
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
      "Museografía, hecho libre: el orden de colgado como argumento tácito de una sala, y la cartela reducida al título como decisión de montaje. El museo, las once obras, el embalse, la fotografía de la presa y la fecha de 1978 son invención propia y no describen ninguna colección real. La cuenta desde 1978 se escribe **«in nearly fifty years» y no una cifra exacta**: «forty-eight years» era correcto solo durante 2026 y pasaba a ser falso en enero de 2027, y un banco de ítems no se revisa cada enero. Toda cifra del examen que se mida contra «hoy» tiene que estar redondeada o acotada.\n\nEl pasaje no ha cambiado; sí la oración del hueco, que es la última. Decía «The reason the room can argue without a word of explanation is ______ the order in which the eleven pictures hang» y examinaba los dos puntos; dice ahora «The order in which the eleven pictures were ______ tells a visitor what no label in the room is long enough to say» y examina que sujeto y verbo no se separan. El motivo del cambio de regla no es de contenido —la sala sigue argumentando por su orden de colgado— sino de conjunto, y está en el punto 3 de la cabecera.\n\n**Corte de complejidad (22 ago 2026), sin cambio de contenido.** Era el pasaje con más subordinación del bloque y se parte en cuatro sitios —la oración de los tres momentos del cuadro, la de los visitantes y la de los conservadores—, **ninguno de ellos la oración del hueco**, que no cambia un carácter: sigue con «were arranged» dentro del sujeto, «tells» a la derecha, ninguna coma abierta delante y ninguna oración independiente cerrada a la izquierda, que son las cuatro condiciones de arriba. De **21,2 a 12,5** palabras por oración, de seis oraciones a diez. «in nearly fifty years» se coloca al final de su oración y no al principio para que siga escribiéndose en minúscula, tal como se cita aquí. Ni una opción ni una razón se tocaron.",
  },
  {
    id: 'q20',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 1,
    tema: 'historia',
    regla:
      "Dos puntos tras oración completa para introducir el elemento que especifica lo que esa oración acaba de anunciar. A la izquierda del hueco hay una oración con sujeto y verbo propios —«Whatever kept the line solvent lay elsewhere»— que anuncia un «en otra parte» sin decir cuál; a la derecha está el sintagma nominal que lo dice, «the fees it charged wool brokers, which covered a third of the cost». Los dos puntos son el único signo que enlaza un anuncio con su especificación, y el único de los cuatro que admite a su derecha algo que no es una oración.\n\nEste es el único ítem de fronteras del bloque cuya clave son los dos puntos, y existe para eso: ver punto 3 de la cabecera antes de tocarlo.\n\nCondiciones de clave única, escritas aquí porque son lo primero que se rompe al editar la frase: (1) **a la izquierda del hueco tiene que cerrarse una oración completa**; si se queda en un sintagma o en una subordinada, los dos puntos mueren y el ítem se queda sin clave; (2) **a la derecha no puede empezar una oración independiente**: en cuanto la haya, el punto y coma pasa a ser tan correcto como los dos puntos y el ítem tiene dos claves —es la misma puerta que en el módulo 1 obliga a no ofrecer el punto junto al punto y coma—; (3) **la palabra que precede al hueco no puede ser un nombre**: con un nombre delante, la coma se convierte en una aposición explicativa legítima y vuelven las dos claves. Por eso el hueco cae detrás de «elsewhere», que es adverbio y no admite aposición; (4) **el sintagma de la derecha no puede empezar por una preposición que el verbo admita**: «lay elsewhere in the fees…» es gramatical sin ningún signo, de modo que la opción sin signo pasaría a ser correcta. La versión de trabajo llevaba ese «in» y por eso no está.",
    razones: {
      A:
        "Coma entre el anuncio y su especificación. A la izquierda hay una oración cerrada —«Whatever kept the line solvent lay elsewhere»— y lo que sigue no es un inciso suyo ni una aposición: «elsewhere» es un adverbio, no un nombre, así que «the fees it charged wool brokers» no tiene a qué aponerse y queda colgando detrás de una coma. Es la apuesta de quien puntúa por respiración —al leer en voz alta hay pausa, y la pausa se escribe— y la que trae de casa quien, en la duda, pone coma.",
      B:
        "Sin ningún signo, la frase pega el anuncio y su desarrollo: «…lay elsewhere the fees it charged wool brokers» obliga a leer un adverbio y un sintagma nominal seguidos y sin frontera, y el lector no descubre que le falta algo hasta la relativa. Es el error de quien da por hecho que, si el sentido se entiende, el signo sobra; es también la apuesta de quien ha aprendido que en este examen la opción prudente es la que no pone nada.",
      C:
        "Correcta: a la izquierda de los dos puntos hay una oración completa que anuncia sin decir el qué —«Whatever kept the line solvent lay elsewhere»— y a la derecha el sintagma que lo dice. Eso es exactamente lo que los dos puntos hacen y lo único que exigen: oración completa delante, y detrás la especificación, que no tiene por qué ser oración. El párrafo lo confirma dos líneas antes, cuando separa lo que el ministerio pagó de lo que de verdad tenía ocupado el hilo.",
      D:
        "El punto y coma exige oración independiente a los dos lados y a su derecha solo hay «the fees it charged wool brokers, which covered a third of the cost», un sintagma nominal con su relativa: no tiene verbo propio, tiene el de la relativa. Es el error de quien usa el punto y coma como una coma reforzada cuando lo que sigue le resulta largo, y aquí lo alimenta esa relativa final, que mete un verbo —«covered»— dentro de la propia frase nominal y la hace parecer una oración.",
    },
    fuenteHecho:
      "Historia de las telecomunicaciones, hecho libre: las líneas telegráficas se justificaron ante la opinión pública como instrumento de gobierno y se sostuvieron con tráfico comercial. La línea, el paso de montaña, 1868, la guarnición y el mercado de la lana son invención propia. Distancias en kilómetros, como el resto del examen: ninguna medida imperial obliga al estudiante a convertir bajo cronómetro. Por la misma razón el plazo es «two weeks» y no «fortnight»: la palabra es británica, queda fuera del currículo escolar de inglés en Colombia y en casi toda Latinoamérica, y aquí **no es adorno** —es la mitad del contraste «una hora en vez de…» que hace inteligible la promesa con la que se vendió la línea—, de modo que quien no la conociera perdía la premisa del párrafo entero.\n\n**Corte de complejidad (22 ago 2026).** Se parten tres oraciones y no la del hueco. De **24,0 a 13,6** palabras por oración, de cinco oraciones a ocho. Dos cambios de palabra, ninguno sobre material citado: «could set what a shepherd was offered» → «reached a shepherd» (relativa libre por verbo llano) y «a third of what the concession had cost» → «a third of the cost», que quita del examen «concession», palabra rara y del mismo campo semántico que la concesión administrativa que el estudiante no necesita.\n\n**La oración del hueco cambió de regla el 23 ago 2026, y el pasaje no cambió de contenido.** Hasta esa fecha el ítem examinaba el punto y coma delante de un adverbio conjuntivo —«…fewer than two hundred official ______ however, the fees it charged wool brokers covered a third of the cost»— y su clave era, con la de q22, la segunda del bloque en ese signo. El motivo del cambio no es de contenido ni de calidad del ítem, que estaba declarado apto: es de conjunto, y está en el punto 3 de la cabecera. Con el punto y coma repetido, los dos puntos no eran clave en ninguno de los cuatro ítems de fronteras y «en este módulo, nunca los dos puntos» era una eliminación aprendible que valía 37,5 % combinada con «la coma es la trampa». La última oración se parte en dos —«…fewer than two hundred official messages. Whatever kept the line solvent lay ______ the fees it charged wool brokers, which covered a third of the cost.»— y con ella el signo correcto pasa a ser los dos puntos, de modo que cada una de las cuatro formas es clave exactamente una vez.\n\n**Lo que la línea perdió y hay que saber que se perdió:** el módulo deja de examinar el punto y coma ante adverbio conjuntivo, que es una de las fronteras más frecuentes del SAT real y que el bloque SEC del módulo 1 tampoco examina. Se cambia una regla muy examinable por un reparto de signos que ninguna apuesta ciega puede explotar; si el coordinador prefiere lo contrario, lo que hay que rehacer es q22, no este.\n\n**Medido sobre el pasaje nuevo:** nueve oraciones, 116 palabras, **12,9 palabras por oración** (venía de 13,6) y la más larga 20 (venía de 26). T sigue en 1 y el ítem sigue midiendo lo mismo o menos que antes; la etiqueta no se mueve. Los tres datos que deciden —la oración completa de la izquierda, el sintagma nominal de la derecha y el adverbio que impide la aposición— están los tres dentro de la oración del hueco, así que L tampoco sube. La palabra que precede al hueco es «lay» y no coincide con ninguna opción; «elsewhere» no aparece en ninguna otra parte del pasaje, y el solape léxico clave-distractores sigue siendo 0/0/0/0, porque las cuatro opciones son la misma palabra con distinto signo.\n\nPor R2, el ítem cambia de texto, de opciones y de razones, y vuelve entero a la cola de auditoría.",
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
      "Historia del teatro, hecho libre: las compañías de provincias vivieron durante el siglo XIX de repertorio traducido y de refritos extranjeros, y el paso a obra escrita en la lengua o el habla del público fue un episodio corriente y tardío en muchas de ellas. El pueblo, la compañía, el maestro de escuela, la fecha de 1893 y las once funciones son invención propia: el pasaje no atribuye ninguna primicia a nadie ni describe ningún teatro real. Sin país, sin moneda y sin medidas, como el resto del módulo.\n\n**Este ítem sustituye al de historia editorial que ocupaba esta fila** (impresor de provincias, «In 1846», el verbo «contain»), retirado por R11 en la quinta vuelta; el porqué está en el punto 5 ter de la cabecera. Las dos correcciones de equidad y veracidad que aquel arrastraba se conservan como criterio y no como texto: no se afirma ninguna primicia histórica que no se pueda sostener —era el error de un siglo del pasaje de 1846— y no hay ninguna referencia nacional que no aporte nada al ítem, que era lo que se le quitó al «ordinary American bookstore» de aquel cierre.\n\n**El pasaje se partió por oraciones el 22 ago 2026 y no cambió de contenido.** La oración del hueco era la más larga del módulo después de la de q25 —38 palabras— y se corta detrás de «in the speech of the market square»: quien escribió la pieza pasa a oración propia, «Its author was a schoolteacher who had never published a line». El pasaje baja de 26,3 a 21,4 palabras por oración de media y de 38 a 30 la más larga. Las tres condiciones de clave única siguen cumplidas —la fecha dentro de la oración del hueco, el trasfondo en pluscuamperfecto unido por «when» y ningún hecho pasado posterior al que el estreno preceda—, y ni una opción ni una razón se tocaron. El detalle está en la sección «CALIBRACIÓN» de la cabecera.\n\n**Segundo corte, el mismo día: dos oraciones más, y ninguna de ellas es la del hueco.** Se parten la primera —«…plays translated from other languages. Its audience came to expect an evening that sounded like somewhere else.»— y la del éxito —«The house sold out for eleven nights. The company printed the text at its own expense.»—. El pasaje pasa de 21,8 a 15,3 palabras por oración y de cinco oraciones a siete; la más larga sigue siendo la del hueco, con 31, porque **esa oración no se toca en absoluto**: «in 1893», el trasfondo en pluscuamperfecto y el «when» que los une siguen exactamente donde estaban, letra por letra. Los verbos que la razón de A necesita en pasado —«sold out», «printed»— siguen los dos en el pasaje, solo que en oraciones distintas, y el «has opened / every season since» que sostiene la razón de D no se ha tocado. Ni un tipo léxico entra o sale del pasaje: el solape con las cuatro opciones era 0/0/0/0 y sigue siéndolo, porque ninguna forma de *stage* aparece en el texto. Longitud: de 101,0 a 99,7 palabras-SAT.\n\n**Ortografía (23 ago 2026): «theatre» → «theater», dos veces.** Era el único britanismo del módulo, que escribe «color», «gray» y «kilometer» a la americana, y la norma del examen es la estadounidense. No toca ninguna razón —las de este ítem citan «had worked», «sold out», «printed» y «has opened»— ni cambia una sola palabra más del pasaje.",
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
      "Oceanografía de manual: el mareógrafo de flotador en pozo tranquilizador, con plumilla sobre tambor de relojería, deja un trazo **continuo** sobre el papel —de ahí «without a break»— y no una lectura cada diez minutos, que es lo que hace un registrador digital. El nivel del mar es la serie larga de esos rollos. El puerto, el estuario y la fecha de 1892 son invención propia.\n\n**Corte de complejidad y de localización (22 ago 2026).** T: se parte la oración de apertura —el tambor de relojería pasa a oración propia— y la cola de la oración del hueco. De **20,6 a 15,3** palabras por oración, de cinco oraciones a siete. «Its value» pasa a «The value of the gauge» porque el posesivo se quedaba sin antecedente claro al cortar, y «nothing grander» a «nothing more» por frecuencia; ninguna de las dos está citada en ninguna razón. L: la oración del hueco pasa de **43 a 34** palabras, el tramo del hueco a «and stores» de **13 a 11** y lo que queda detrás de «stores» de **11 a 5**, porque la relativa final —«a cupboard that is opened only after a storm»— sale a oración propia y ya no obliga a volver atrás. Lo que **no** puede bajar es el tramo de «row» al hueco: esa frase interpuesta es la regla que el ítem mide y `razones.D` la cita entera. El núcleo, la interposición y el verbo coordinado «and stores» siguen los tres dentro de la oración del hueco. Ni una opción ni una razón se tocaron.\n\n**Verosimilitud del sujeto (23 ago 2026).** La oración decía que la hilera de mareógrafos «stores the rolls in a cupboard», y una hilera de instrumentos no guarda rollos en un armario: eso lo hace alguien. Importa más de lo que parece porque «and stores» es el verbo coordinado que fija el tiempo de la clave y lo citan tres de las cuatro razones; si su sujeto no es creíble, el estudiante duda de la coordinación por donde no debe. → «…and stores the record on rolls of paper. The rolls go into a cupboard that is opened only after a storm.» El verbo se queda donde estaba, el núcleo «row» y la frase interpuesta también, y la oración del hueco pasa de 34 a 35 palabras. El pasaje sube de 15,3 a 16,1 palabras por oración: por debajo de 18, así que T sigue en 1. Ni una opción ni una razón se tocaron.",
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
      "Práctica coral aficionada, hecho libre: un coro sin audiciones cuya calidad se explica por horas acumuladas y no por selección. La aritmética del párrafo es correcta: un año tiene cincuenta y dos jueves, de los cuales el texto cuenta cincuenta, y cincuenta jueves por once años dan quinientos cincuenta ensayos. El coro, la ciudad, la panadería y las cifras son invención propia. La comparación con el conservatorio la sostiene ahora el director —«which the director says is more singing together than…»— y no el narrador: cuánto han cantado juntos los estudiantes al salir de un conservatorio no es verificable, y el párrafo ya había presentado al director como quien explica el coro por aritmética.\n\n**Corte de complejidad (22 ago 2026); la localización de este ítem no se puede bajar.** T: se parten tres oraciones —la de los jueves consecutivos, la de los músicos visitantes y la de la panadería— y «three consecutive Thursdays» pasa a «three Thursdays in a row» por frecuencia. De **25,2 a 16,9** palabras por oración, de seis oraciones a nueve; era el pasaje más largo del bloque. **La oración de la lista no se toca en ningún carácter**: el dos puntos tras «three people in all», las tres relativas explicativas y el primer punto y coma siguen letra por letra. L: no baja, y no por descuido. Los tres datos que deciden —el dos puntos que abre la enumeración, el primer punto y coma y las comas internas de los miembros— están **todos** dentro de la oración del hueco, así que no hay nada que acercar, y los tres están citados palabra por palabra en `razones.A`, `razones.C` y `razones.D`: acortar esa oración sería escribir en una razón. Lo que se acorta es el camino hasta ella. Ni una opción ni una razón se tocaron.\n\n**Un caso discutible que no debía estar aquí (23 ago 2026).** «Fifty Thursdays a year for eleven years **come** to more than five hundred rehearsals» es defendible: sujeto aritmético con verbo plural. Pero es exactamente la decisión que examina q21, dos ítems antes, y un caso discutible del mismo asunto no se deja suelto en el mismo bloque —el estudiante que acaba de razonar la concordancia del núcleo se encuentra aquí con una que podría ir de las dos maneras—. → «add up to», que con sujeto plural no admite discusión. La oración de la lista, que es la examinada, no se toca; esta va cuatro oraciones antes. El pasaje pasa de 16,9 a 17,0 palabras por oración —una palabra más— y sigue por debajo de 18, que es lo que mantiene T en 1. Ni una opción ni una razón se tocaron.",
  },
]
