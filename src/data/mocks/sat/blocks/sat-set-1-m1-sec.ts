import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Standard English Conventions del módulo `sat-set-1-m1` — ítems q16 a q22.
 *
 * Plan: docs/sat-planes/sat-set-1-m1.md (filas 16-22). Textos: docs/sat-planes/
 * sat-set-1-m1-textos-sec.md, copiados literalmente, con el hueco `______` donde
 * lo dejó el redactor de textos.
 *
 * Este bloque no funciona como los otros tres. El texto no es el objeto de la pregunta
 * sino el soporte: el enunciado es siempre el mismo y lo que se examina es la norma del
 * inglés escrito estadounidense. De ahí que aquí —y solo aquí— los distractores sean
 * agramaticales o falsos contra el párrafo: la regla examinada *es* lo que los tumba.
 *
 * **El orden del array no es el orden de los ids, y es a propósito.** SEC va de fácil a
 * difícil sin agrupar por tipo (boundaries y form-structure-sense alternan), que es la
 * excepción verificada de College Board. El calibrador de dificultad (19 ago 2026,
 * bloqueante B1) midió una caída de dos puntos y de banda en la posición 5 de 7 y devolvió
 * el bloque: `q19` medía 9 y `q20`, detrás, 7. Se intercambiaron los dos **de posición, no
 * de identificador**, porque SEC es el único bloque donde reordenar es legal. El array va
 * hoy así:
 *
 *   q16 · q17 · q18 · **q20** · **q19** · q21 · q22
 *
 * y con él las claves quedan D · B · A · D · C · A · B (sin tres iguales seguidas, sin
 * chocar con q15 (B) por delante ni con q23 (C) por detrás), los temas historia ·
 * humanidades · ciencia · humanidades · historia · ciencia · historia (ninguno dos veces
 * seguidas) y las etiquetas de dificultad 1 · 1 · 2 · 2 · 2 · 3 · 3, no decrecientes, que
 * es lo que mira la puerta 9. `meta` va reordenado en paralelo por legibilidad: el
 * guardián lo empareja por `id`, no por posición, pero quien lea el archivo no.
 *
 * q16, q20 y q22 se rehicieron el 19 de agosto de 2026 por el método R8 (blueprint §4 bis).
 * Los tres se resolvían sin el texto delante —7/8, 8/8 y 7/8 solucionadores a ciegas— porque
 * su juego de opciones era el dibujo canónico de un ejercicio de manual: «; however,», los
 * dos puntos delante de una lista y el inciso entre dos comas. La clave de cada uno sigue en
 * su letra (D, D, B); lo que cambió es el mecanismo, y con él la `regla` de q16 y de q22.
 *
 * q22 se volvió a escribir el 19 de agosto de 2026 por el bloqueante B2 del mismo
 * calibrador: ningún ítem de SEC llegaba a la banda difícil (techo 10/15, media 7,57 frente
 * a 11,00 de Craft and Structure) porque q22 había perdido en la reescritura R8 la segunda
 * decisión que le encargaba la fila 22 del plan y examinaba una sola —predicado compuesto—.
 * La versión de hoy vuelve a pedir dos decisiones en la misma oración y sube por localización
 * y por complejidad del texto, **no** por el enunciado, que en SEC es fijo y no se toca.
 *
 * Esa versión duró unas horas: el auditor lingüístico la devolvió la misma tarde con **dos
 * claves**. La segunda decisión estaba bien; la primera no, porque el predicado del hueco decía
 * «opened in 1836» y eso identificaba por su cuenta —la línea vieja «had been dug in the 1790s»
 * y del segundo canal el texto decía «Digging on the second began in 1825»—, de modo que el
 * modificador comentaba y el par de comas era tan defendible como la clave. El arreglo del 19
 * de agosto por la tarde quita el identificador rival sin tocar la clave ni el tipo de discurso:
 * el predicado pasa a «carried the heavier traffic» (sin fecha, y el texto nunca dice cuál de
 * los dos llevó más tráfico) y la última oración deja de colgar del año 1836 —«Within fifteen
 * years» se quedaba sin ancla— y pasa a decir que **ninguna** de las dos compañías saldó su
 * deuda, con lo que tampoco «the tolls it collected never covered the debt» señala a uno.
 *
 * Condiciones de clave única que hay que vigilar al editar:
 *
 * - q16: la segunda oración deja de ser independiente solo porque «though» la subordina. Si
 *   alguna opción vuelve a traer un adverbio conjuntivo con punto y coma, o un punto seguido
 *   de sujeto, esa opción será también correcta y el ítem tendrá dos claves.
 * - q20: las cuatro opciones llevan a propósito las mismas palabras y lo único que cambia es
 *   el signo (el modelo es q18, que resistió la prueba a ciegas). No se puede añadir una
 *   raya: tras oración completa, la raya presenta una enumeración igual de bien que los dos
 *   puntos, y el ítem pasaría a tener dos claves.
 * - q22: sostiene dos fronteras a la vez y las cuatro opciones son la matriz completa de las
 *   dos decisiones (identifica/comenta × punto y coma/coma), con las mismas palabras en las
 *   cuatro. Lo que hace esencial al modificador son **dos** cosas, y hay que vigilar las dos,
 *   porque la segunda ya se rompió una vez:
 *   (a) que el párrafo tenga **dos** canales vivos y solo diga de dónde salió el dinero de uno.
 *   Si alguien deja un solo canal, o nombra al segundo como el de la suscripción local, el
 *   modificador pasa a comentar y el par de comas se vuelve una segunda clave.
 *   (b) que en la oración del hueco **no quede ningún otro dato que identifique**. La versión
 *   de la mañana del 19 de agosto decía «opened in 1836» y con eso bastaba para saber cuál era
 *   —la vieja se había cavado en la década de 1790—: dos claves. Por eso hoy el predicado no
 *   lleva fecha, el texto no dice cuál de los dos llevó más tráfico y la última oración dice
 *   que ninguna de las dos compañías saldó su deuda. Prueba antes de publicar cualquier cambio:
 *   tapa el modificador y lee «The canal carried the heavier traffic; the tolls it collected
 *   never covered the debt its investors had signed for». Si con el párrafo delante se puede
 *   decir cuál de los dos es, el ítem tiene dos claves otra vez.
 *   Y lo que fija el punto y coma es que detrás del hueco haya una oración con sujeto y verbo
 *   propios y sin conjunción: si se le añade un «and», la coma pasa a ser correcta y el ítem
 *   se cae.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q16',
    type: 'mcq',
    part: 1,
    stimulus:
      "Before 1840, the cost of sending a letter in Britain fell on the person who received it, and the price rose with every mile the letter had traveled. Families who could not pay turned letters away at the door. In that year the post office moved the charge to the sender and fixed one low price for any distance within the country. The change looked ______ it decided who in Britain could afford to write at all. Ten years later, the number of letters carried each year had more than doubled.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "minor; although",
      "minor. Although",
      "minor, however,",
      "minor, though",
    ],
    answer: 3,
  },
  {
    id: 'q17',
    type: 'mcq',
    part: 1,
    stimulus:
      "A dictionary is a record of how people write, not a list of permissions. In 2014 the editors of one Spanish dictionary accepted tuitear, a verb coined from the name of a social network. Several newspapers complained that the word was not proper Spanish. The editors replied that describing use is the whole point of the work. The list of terms that speakers add to a language each year ______ longer than the list the editors quietly drop, and it always has been.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "are",
      "is",
      "were",
      "have been",
    ],
    answer: 1,
  },
  {
    id: 'q18',
    type: 'mcq',
    part: 1,
    stimulus:
      "Along the northern Pacific coast, kelp grows from the seafloor toward the light in stands thick enough to shelter fish, crabs, and young seals. Sea urchins feed on the base of the kelp, and where nothing feeds on the urchins, their numbers climb until the stand is stripped to bare rock. The sea otter, an animal lighter than most adult ______ eats enough urchins in a day to hold the forest in place. Ecologists reserve the word keystone for a species of that kind: remove it, and the structure around it falls.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "humans,",
      "humans",
      "humans—",
      "humans;",
    ],
    answer: 0,
  },
  {
    id: 'q20',
    type: 'mcq',
    part: 1,
    stimulus:
      "Painters working in Europe in the 1830s are often described as heirs to a long tradition of craft, and in one narrow sense they were. A conservator who opens a paint box from any workshop of that decade finds ______ an earth or a mineral ground to powder for color, an oil pressed from seeds to bind it, and a tree resin thinned into varnish to give the dried surface its gloss. What changed after 1840 was not the recipe but who prepared it. Once color could be bought sealed in a metal tube, the apprentice who had spent his mornings at the grinding slab was no longer needed. Painters carried their work outdoors.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "the same recipe;",
      "the same recipe",
      "the same recipe,",
      "the same recipe:",
    ],
    answer: 3,
  },
  {
    id: 'q19',
    type: 'mcq',
    part: 1,
    stimulus:
      "Accounts of the Argentine wheat boom usually begin with the railway, and the emphasis is not misplaced. The line that crossed the district in 1883 cut the cost of moving a sack of grain to the port by more than half, and land that had been worth little sold within a year for six times its old price. But the farms that filled those wagons were not new. By the time the first train arrived, families in the district ______ wheat for more than thirty years, selling what they could to carts bound for the river. The railway did not create an agriculture; it found one and made it pay.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "are growing",
      "have been growing",
      "had been growing",
      "grew",
    ],
    answer: 2,
  },
  {
    id: 'q21',
    type: 'mcq',
    part: 1,
    stimulus:
      "Snow that falls on the high plateau of East Antarctica never melts. Each year's fall is buried by the next, and as the layers beneath are pressed into solid ice, the gaps between the old snowflakes close into bubbles, each holding a little of the air of that year. A drilling team brings the ice up in a column, and the column is a stack of dated samples, the oldest near the bottom. Trapped in the ice for as long as eight hundred thousand years, ______ the atmosphere of a day that no one was there to record.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "those bubbles preserve",
      "the drilling team recovers",
      "each column of samples captures",
      "studying the bubbles reveals",
    ],
    answer: 0,
  },
  {
    id: 'q22',
    type: 'mcq',
    part: 1,
    stimulus:
      "Two canals were cut through the same range of hills within forty years of each other, and what separated them in the end was not the engineering but the direction the money came from. The older line had been dug in the 1790s with money from merchants in the capital, none of whom ever saw the hills they had paid to cut through. Digging on the second began in 1825, in rock that the surveyors had called soft, and the estimate had doubled before the crews were halfway through. The two lines ended at the same river landing, and the county spent thirty years measuring the receipts of one against the receipts of the other. The ______ the tolls it collected never covered the debt its investors had signed for. A railway ran along the same valley floor before either company had cleared its debt, and both sold their works for whatever the stone was worth.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "canal, built with money raised in the valley itself, carried the heavier traffic;",
      "canal built with money raised in the valley itself carried the heavier traffic;",
      "canal built with money raised in the valley itself carried the heavier traffic,",
      "canal, built with money raised in the valley itself, carried the heavier traffic,",
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
      "Frontera entre las dos oraciones del período: la segunda solo puede unirse con una coma si un subordinante la vuelve dependiente; ni la coma sola con adverbio conjuntivo, ni el punto y coma o el punto delante de una subordinada.",
    razones: {
      A:
        "El punto y coma exige oración independiente a los dos lados, y a su derecha «although it decided who in Britain could afford to write at all» ya no lo es: «although» la subordina, y detrás no viene ninguna principal que la recoja, porque la frase termina ahí. Es el error de quien ha aprendido que el punto y coma une dos ideas largas y lo pone sin mirar con qué clase de palabra abre la segunda.",
      B:
        "Corta la oración donde el lector haría la pausa y deja «Although it decided who in Britain could afford to write at all.» sola entre punto y punto: una subordinada sin principal, es decir, un fragmento. La opción no se delata a sí misma —una oración puede empezar por «Although»—; la delata que el párrafo sigue con «Ten years later…» y no con la principal que faltaba.",
      C:
        "Empalme de comas: «The change looked minor» y «it decided who in Britain could afford to write at all» son dos oraciones independientes, y «however» es adverbio, no conjunción, así que la coma sola no puede unirlas por mucho que el adverbio suene a bisagra. Es el error de quien puntúa por el oído: donde oye pausa, pone coma.",
      D:
        "Correcta: «though» es conjunción subordinante y, antepuesta a la segunda oración, la convierte en subordinada concesiva; con una principal y una subordinada detrás, la coma es el único signo que hace falta —y el que la norma pide cuando la concesiva va pospuesta—. La concesión es además la relación que el párrafo sostiene: la reforma «looked minor» y a la vez decidió quién podía escribir.",
    },
    fuenteHecho:
      "Historia postal británica, hecho de manual (reforma de 1840: el porte pasa al remitente con tarifa única); redacción propia y sin cifras exactas.",
  },
  {
    id: 'q17',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 1,
    tema: 'humanidades',
    regla:
      "Concordancia sujeto-verbo con una frase preposicional y una relativa interpuestas entre el núcleo del sujeto y el verbo.",
    razones: {
      A:
        "Concuerda con lo más cercano: «terms», «speakers» y el verbo plural «add» quedan justo delante del hueco, pero pertenecen al bloque interpuesto, no al núcleo del sujeto.",
      B:
        "Correcta: el núcleo del sujeto es «list», singular, y lo sigue siendo aunque entre él y el verbo se cuelen «of terms» y la relativa «that speakers add to a language each year»; la coda «and it always has been» retoma ese mismo singular con «it».",
      C:
        "Añade al fallo de número un fallo de tiempo: manda al pasado un enunciado general que el texto sostiene en presente y que la coda «and it always has been» presenta como vigente.",
      D:
        "Forma plural de un tiempo compuesto: además de no concordar con «list», repite el presente perfecto que la coda «and it always has been» ya aporta, y la oración diría dos veces lo mismo.",
    },
    fuenteHecho:
      "Lexicografía del español, hecho libre: la incorporación de «tuitear» en 2014 y la polémica pública que siguió. Ni institución ni cita: el texto describe el episodio con palabras propias y lo glosa en inglés.",
  },
  {
    id: 'q18',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 2,
    tema: 'ciencia',
    regla:
      "Par de signos del elemento no esencial: un inciso se cierra con el mismo signo con que se abrió.",
    razones: {
      A:
        "Correcta: el inciso quedó abierto por la coma de «The sea otter,», que el estudiante no puede tocar, y un par se cierra con el mismo signo con que se abre; la coma devuelve además el sujeto a su verbo «eats».",
      B:
        "Deja el inciso sin cerrar: «an animal lighter than most adult humans» se pega al verbo «eats» y el lector no sabe dónde termina la información añadida ni dónde vuelve la oración principal.",
      C:
        "Mezcla los dos signos del par. La raya delimitaría bien un inciso abierto con raya, y por eso resulta atractiva; falla porque el texto lo abrió con coma. Es el error de quien sabe que el inciso va marcado y no mira con qué se marcó al empezar.",
      D:
        "Corta la oración entre el sujeto «The sea otter» y su verbo «eats» con un punto y coma, que exige oración completa a los dos lados y aquí solo encuentra un fragmento a la izquierda del verbo.",
    },
    fuenteHecho:
      "Ecología marina de manual: la nutria marina como especie clave de los bosques de kelp del Pacífico norte. Comparación de peso propia, sin cifras, sin unidades imperiales y sin nombres propios.",
  },
  {
    id: 'q20',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 2,
    tema: 'humanidades',
    regla:
      "Dos puntos tras oración completa para introducir una enumeración explicativa.",
    razones: {
      A:
        "El punto y coma pide oración independiente a los dos lados y a su derecha solo hay tres sintagmas nominales —«an earth…», «an oil…», «and a tree resin…»—, que no forman oración. Es el error de quien usa el punto y coma como una coma reforzada para anunciar una lista.",
      B:
        "Deja el complemento y su enumeración pegados sin signo: «finds the same recipe an earth or a mineral ground to powder for color» obliga a leer dos sintagmas nominales seguidos sin frontera entre lo que se anuncia y lo que se detalla. Es el error de quien da por hecho que, si el sentido se entiende, el signo sobra.",
      C:
        "La enumeración que sigue ya separa sus tres miembros con comas —«…for color, an oil…, and a tree resin…»—, así que una coma delante de «an earth» no anuncia nada: mete «the same recipe» dentro de la serie y el lector cuenta cuatro cosas donde el texto nombra una y la desglosa en tres. La coma no puede a la vez presentar la lista y separar sus miembros.",
      D:
        "Correcta: «A conservator who opens a paint box from any workshop of that decade finds the same recipe» es oración completa, que es lo único que los dos puntos exigen delante, y lo que sigue es la enumeración que desarrolla esa receta. El párrafo la retoma dos líneas después con «What changed after 1840 was not the recipe but who prepared it».",
    },
    fuenteHecho:
      "Historia material de la pintura, hecho libre: pigmento molido, aceite y resina en el taller hasta que el tubo metálico permitió comprar el color hecho. Sin taller, pintor ni patente concretos.",
  },
  {
    id: 'q19',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 2,
    tema: 'historia',
    regla:
      "Tiempo verbal fijado por el marcador temporal de la oración: acción anterior a un punto del pasado y prolongada hasta él (pluscuamperfecto).",
    razones: {
      A:
        "Presente progresivo en una oración anclada en el pasado por «By the time the first train arrived»: sitúa la siembra en el momento de la lectura, no en los años previos a la llegada del tren.",
      B:
        "Ancla el tiempo en la oración vecina y no en el marcador. El texto abre en presente —«Accounts … usually begin with the railway»— y quien se apoya en eso elige el presente perfecto, que arrastra la acción hasta hoy y no hasta 1883.",
      C:
        "Correcta: la oración trae dos marcadores que piden lo mismo. «By the time the first train arrived» fija un punto en el pasado y «for more than thirty years» mide la duración que termina en ese punto, y eso es pluscuamperfecto.",
      D:
        "Pretérito simple: presenta la siembra como un hecho cerrado y suelto, sin la anterioridad respecto de la llegada del tren que «By the time … arrived» exige de la forma verbal.",
    },
    fuenteHecho:
      "Historia económica argentina, hecho libre: las colonias del litoral ya sembraban trigo décadas antes del ferrocarril. Distrito, 1883, la caída de costo y el precio de la tierra son invención propia.",
  },
  {
    id: 'q21',
    domain: 'SEC',
    tipo: 'form-structure-sense',
    dificultad: 3,
    tema: 'ciencia',
    regla:
      "Modificador inicial no personal: el sujeto de la oración principal tiene que ser aquello de lo que habla el modificador.",
    razones: {
      A:
        "Correcta: lo único que el texto describe atrapado en el hielo son las burbujas —«the gaps between the old snowflakes close into bubbles, each holding a little of the air of that year»—, así que solo ellas pueden ser el sujeto que el modificador inicial reclama.",
      B:
        "Cuelga el modificador del equipo de perforación, que en el texto no está atrapado en el hielo: sube la columna a la superficie. La frase es gramatical una a una y falsa en la relación entre modificador y sujeto.",
      C:
        "Cuelga el modificador de la columna de muestras, que el texto presenta recién extraída y ordenada por fechas, no encerrada durante ochocientos mil años.",
      D:
        "Pone de sujeto un gerundio nominalizado, con lo que lo atrapado en el hielo pasaría a ser el acto de estudiar las burbujas, que no es algo que el hielo pueda guardar.",
    },
    fuenteHecho:
      "Glaciología, hecho publicado hasta la saciedad: el aire queda encerrado en burbujas al compactarse la nieve y los sondeos del plateau oriental antártico llegan a unos 800.000 años. Sin sondeo, base ni programa nombrados.",
  },
  {
    id: 'q22',
    domain: 'SEC',
    tipo: 'boundaries',
    dificultad: 3,
    tema: 'historia',
    regla:
      "Dos fronteras en la misma oración, y ninguna opción acierta las dos por casualidad. (1) Elemento esencial frente a no esencial: el párrafo mantiene dos canales vivos y la oración del hueco no da ningún otro dato que separe uno del otro, así que el tramo del dinero identifica, y lo que identifica no se separa con comas; entre comas solo va lo que comenta. (2) Frontera entre oraciones independientes sin conjunción coordinante: dos oraciones con sujeto y verbo propios se separan con punto y coma, nunca con coma.",
    razones: {
      A:
        "Acierta la frontera de la derecha y falla la de la izquierda. El par de comas convierte «built with money raised in the valley itself» en un comentario, y un comentario solo cabe cuando el sujeto ya está identificado sin él. Aquí no lo está: el párrafo llega con los dos canales vivos hasta la oración inmediatamente anterior —«measuring the receipts of one against the receipts of the other»— y en la oración del hueco no queda un solo dato que separe uno del otro. Hecha la prueba de supresión, «The canal carried the heavier traffic; the tolls it collected never covered the debt its investors had signed for» no se puede resolver: no hay fecha, el texto nunca dice cuál de los dos llevó más tráfico y la última línea aclara que ninguna de las dos compañías saldó su deuda. Es el error de quien encierra entre comas toda frase de participio que sigue al sujeto sin preguntarse si distingue o solo añade.",
      B:
        "Correcta: resuelve las dos fronteras. La de la izquierda, porque el modificador identifica y lo que identifica va sin comas: el texto abre con dos canales, dice de dónde salió el dinero de uno solo —«money from merchants in the capital», la línea vieja— y no ofrece ningún otro dato que distinga al sujeto de esta oración, de modo que «built with money raised in the valley itself» es lo único que señala al segundo. La de la derecha, porque detrás del hueco viene «the tolls it collected never covered the debt its investors had signed for», una oración con sujeto y verbo propios y sin conjunción que la coordine: entre dos oraciones independientes sin conjunción la norma pide punto y coma. El texto enseña el caso contrario en su última línea, donde la coma sí aparece delante de «and».",
      C:
        "Acierta la frontera de la izquierda y falla la de la derecha. Deja el modificador sin comas, que es lo que corresponde a un tramo que identifica, pero junta con una sola coma «The canal … carried the heavier traffic» y «the tolls it collected never covered the debt…», dos oraciones independientes sin nada que las coordine: empalme de comas. Es el error de quien puntúa por el oído —donde oye la pausa, pone coma— y no comprueba si lo que viene detrás se sostiene solo.",
      D:
        "Falla las dos fronteras con un mismo gesto: pone coma allí donde la oración respira. Encierra entre comas el único tramo que dice de cuál de los dos canales se habla y después pega con otra coma una segunda oración completa, de manera que la frase termina con tres comas haciendo tres trabajos distintos y sin ninguna frontera de verdad. Es la opción del estudiante que nota que ahí falta algo y reparte comas hasta que le suena bien.",
    },
    fuenteHecho:
      "Historia del transporte del siglo XIX, hecho libre: valles con un canal antiguo financiado desde fuera y otro pagado por suscripción de los propios vecinos, ambos desplazados por el ferrocarril y con peajes que no cubrieron la deuda de construcción. Los dos canales, el valle, el condado, la década de 1790, 1825, el sobrecosto de la roca y el reparto del tráfico son invención propia y no describen ningún canal concreto.",
  },
]
