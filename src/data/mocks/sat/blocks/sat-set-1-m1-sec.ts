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
 * agramaticales: la regla examinada *es* lo que los tumba.
 *
 * Claves del plan, que no se negocian ítem a ítem: D, B, A, C, D, A, B. El orden va de
 * fácil a difícil sin agrupar por tipo (boundaries y form-structure-sense alternan), que
 * es la excepción verificada de College Board y está escrita así en el plan.
 *
 * q16, q20 y q22 se rehicieron el 19 de agosto de 2026 por el método R8 (blueprint §4 bis).
 * Los tres se resolvían sin el texto delante —7/8, 8/8 y 7/8 solucionadores a ciegas— porque
 * su juego de opciones era el dibujo canónico de un ejercicio de manual: «; however,», los
 * dos puntos delante de una lista y el inciso entre dos comas. La clave de cada uno sigue en
 * su letra (D, D, B); lo que cambió es el mecanismo, y con él la `regla` de q16 y de q22.
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
 * - q22: la clave es la opción sin ningún signo, y lo es porque «filled» es verbo conjugado y
 *   comparte sujeto con «opened». Si el tramo del hueco deja de tener verbo conjugado, el par
 *   de comas del inciso vuelve a ser correcto.
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
      "The case for the canal had been made in the language of freight since the 1790s: one barge could move in a single trip what forty carts moved in a day, and the mills of the upper valley could then sell flour beyond the county line. Digging began in 1825, in rock that the surveyors had promised would be soft. The finished ______ opened in the spring of 1836 to a crowd the county paper counted at four thousand. Within fifteen years a railway ran along the same valley floor, and the tolls the canal collected never covered the debt its investors had signed for.",
    text:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "canal, filled with water that winter, and",
      "canal filled with water that winter and",
      "canal filled with water that winter; and",
      "canal filled with water that winter, and",
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
      "Predicado compuesto: dos verbos conjugados que comparten sujeto no se separan con coma ni con punto y coma delante de la conjunción, y el primero tampoco puede aislarse entre comas como si fuera un inciso.",
    razones: {
      A:
        "Encierra «filled with water that winter» entre comas, o sea lo lee como inciso prescindible. Al hacerlo degrada a participio el único verbo conjugado que hay antes de «and», y la oración se queda sin verbo principal: «The finished canal, filled with water that winter, and opened in the spring of 1836…» ya no tiene con qué coordinar ese «and». Por dentro la opción es impecable —un par de comas que abre y cierra—; la tumba el párrafo, que no le da a «The finished canal» ningún otro verbo.",
      B:
        "Correcta: «filled» y «opened» son dos verbos conjugados que comparten un mismo sujeto, «The finished canal», y un predicado compuesto no lleva ningún signo delante de la conjunción. El propio texto enseña el contraste en su última oración, donde la coma delante de «and» sí aparece —«a railway ran along the same valley floor, and the tolls the canal collected never covered the debt»— porque allí lo que se une son dos oraciones con sujeto propio cada una.",
      C:
        "El punto y coma exige oración independiente a los dos lados y a su derecha solo hay «and opened in the spring of 1836 to a crowd…», la segunda mitad de un predicado, sin sujeto propio. Es el error de quien recurre al punto y coma cuando la frase se le hace larga, como si fuera una pausa mayor y no una frontera entre oraciones.",
      D:
        "Traslada al predicado compuesto la regla de la coma delante de «and», que solo rige cuando detrás viene una oración con su propio sujeto. Aquí «opened» no lo tiene: lo comparte con «filled», y la coma acaba separando al sujeto de su segundo verbo.",
    },
    fuenteHecho:
      "Historia del transporte del siglo XIX, hecho libre: canales justificados por el flete y desplazados por el ferrocarril, con peajes que no cubrieron la deuda. Valle, condado, 1825, 1836, el periódico, los cuatro mil y los cuarenta carros son invención propia.",
  },
]
