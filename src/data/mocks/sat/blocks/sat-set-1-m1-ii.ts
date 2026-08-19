import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Information and Ideas del módulo `sat-set-1-m1` — ítems q09 a q15.
 *
 * Plan: docs/sat-planes/sat-set-1-m1.md (filas 9-15). Textos: docs/sat-planes/
 * sat-set-1-m1-textos-ii.md.
 *
 * Las claves son las del plan y no se negocian ítem a ítem: C, A, B, D, A, C, B.
 * Cuando un ítem pedía otra letra se movió el contenido de las opciones, nunca la clave:
 * el reparto se defiende a nivel de módulo y aquí solo se ve un cuarto del examen.
 *
 * QUINTA VERSIÓN, solo de q09, q13 y q15 (19 ago 2026). Remedido el examen con dieciséis
 * jueces en vez de ocho, tres ítems de este bloque seguían acertándose a ciegas —q09 15/16,
 * q13 13/16, q15 16/16— mientras q10 y q12 caían a 1/16 y q11 a 4/16. En los tres, la forma
 * y el registro ya estaban igualados, así que lo que quedaba no era una pista superficial:
 * la respuesta se DEDUCÍA razonando con lo visible (R10). Textos y claves siguen intactos;
 * cambian `text` y `options` de los tres, y sus `razones`.
 *
 * - q09: preguntaba por la idea central, y la idea central de este texto es la práctica
 *   museística que cualquiera reconoce —el taller de restauración a la vista del público—,
 *   de modo que la clave era la única opción que la describía y se marcaba sin leer. Ahora
 *   pregunta qué distingue a la sala más visitada, y las cuatro opciones son prácticas de
 *   museo igual de reales: tocar las piezas, dejarlas manipular, repararlas a la vista y
 *   construir una nueva delante del público. El sentido común, si se usa, apunta a la sala
 *   donde suenan los instrumentos, que es un distractor; reparar y construir a la vista son
 *   imagen especular y solo «mend the museum's violins and guitars» decide entre las dos.
 * - q13: los cuatro juegos de cifras se resolvían por triangulación. Cada distractor salía
 *   de perturbar un número de la clave, así que los valores de la clave aparecían en dos o
 *   tres opciones y los falsos en una: el 30 % y la banda 28-33 se votaban solos, sin mirar
 *   la tabla. Ahora las opciones son un 2×2 exacto —extremo gris 30 % o 22 %, suelo naranja
 *   28 % o 29 %—, cada valor aparece dos veces y no hay mayoría que desempate. Además las
 *   heurísticas se cruzan: el mayor contraste del gris apunta a la clave, pero la banda
 *   naranja más estrecha —29-33, la que parece mejor prueba de que esa especie no
 *   responde— apunta a un distractor.
 * - q15: el enunciado señalaba un intervalo y solo una opción decía «más cálido que hoy»,
 *   que es la inferencia paleoclimática de manual; las otras tres eran variantes
 *   contrarias y se podaban por raras. Ahora las cuatro afirman un clima más templado y se
 *   reparten en 2×2 los dos hechos que solo el texto da: la profundidad del deshielo (por
 *   debajo del primer metro o no) y su continuidad (en todos esos milenios o a tramos). El
 *   enunciado ya no habla de «the site» ni del suelo sobre la cueva, sino del suelo a esa
 *   latitud, para no regalar el mecanismo —el agua que tiene que atravesar la roca— que es
 *   justo lo que permite deducir que lo que importa es la profundidad y no la estación.
 *
 * Tercera divergencia con el plan, además de las dos que ya se anotan más abajo. El plan
 * pedía en q09 una idea central enunciada en el cierre del texto, con distractores que
 * fueran detalles verdaderos pero secundarios. Esa idea central —el instrumento como cosa
 * que unas manos mantienen viva, y por eso el taller a la vista— es exactamente la práctica
 * museística que el lector culto ya conoce, así que la clave se deducía del mundo y no del
 * texto: 15 de 16 jueces la marcaron a ciegas. El ítem pregunta ahora por el rasgo de la
 * sala —sigue dentro de `central-ideas-details`, por el lado de los detalles— y la idea
 * central del cierre pasa a ser lo que hay que leer para descartar las otras tres salas.
 *
 * Medido sobre los tres reescritos: la clave no es la opción más larga en solitario en
 * ninguno (q09 122/116/112/116, q13 cuatro opciones de 130 caracteres, q15 114/113/120/115)
 * y en solape léxico con el texto no es ni la que más repite ni la que menos (q09 6/5/6/7
 * con la clave en 6; q15 4/6/7/6 con la clave en 6; en q13 las cuatro empatan en 9, así que
 * no hay coincidencias que contar y la puerta no ve nada que explotar).
 *
 * CUARTA VERSIÓN, solo de q09, q10, q13 y q15 (19 ago 2026). Tras R8 el panel de ocho
 * solucionadores los seguía acertando a ciegas —6, 7, 7 y 7 de 8—, mientras q11, q12 y q14
 * de este mismo bloque caían a 2, 2 y 5. La forma ya estaba igualada en los cuatro: lo que
 * quedaba delatando la clave era el REGISTRO (R9) y, en dos de ellos, el enunciado. Textos
 * y claves siguen intactos; cambian `options`, `razones` y, en q10 y q15, el enunciado.
 *
 * - q09: solo la clave llevaba conector inferencial («therefore») y solo ella era una
 *   redefinición general del instrumento; las otras tres eran un detalle (la madera y las
 *   herramientas del cartel) y una observación (los niños). Ahora las cuatro redefinen el
 *   instrumento con un giro del mismo calibre —obra de las manos que lo hicieron, mueble
 *   hasta que suena, cosa que unas manos mantienen usable, oficio antes que objeto— y A y C
 *   son imagen especular: las mismas manos, construyendo o manteniendo.
 * - q10: se resolvía con conocimiento previo y no con el texto. «Sílice» es la respuesta de
 *   manual a qué decide el estilo eruptivo, y era la única opción que lo nombraba en el
 *   magma. El enunciado pregunta ahora por qué un mismo conducto cambia de estilo —lo que el
 *   texto contesta en su última oración— y las cuatro opciones son factores que cualquiera
 *   con nociones de volcanología encuentra igual de creíbles: rigidez variable, sílice
 *   variable, gas acumulado en el reposo, roca de encima debilitada. Saber volcanología ya
 *   no separa la clave; separa solo haber leído la última oración.
 * - q13: el enunciado da la afirmación («solo una de las dos especies es sensible») y antes
 *   solo la clave describía una serie que se mueve junto a otra plana, de modo que la lógica
 *   de la afirmación bastaba sin mirar la tabla. Ahora las cuatro describen ese mismo patrón
 *   y difieren únicamente en los números: banda naranja 28-33 o 28-31, columnas
 *   intercambiadas, y el 22 % puesto en la fila que no es.
 * - q15: la clave era la única que afirmaba un cambio respecto de hoy, y una inferencia
 *   paleoclimática se adivina por ahí. Ahora las cuatro afirman un cambio —más cálido, más
 *   húmedo, cálido a rachas, una vía abierta y luego cerrada— y se reparten dos a dos la
 *   misma premisa sobre la profundidad del deshielo. El enunciado ya no dice «cuando la
 *   columna estaba creciendo»: da las fechas y deja que sea el lector quien las una con el
 *   depósito.
 *
 * Dos divergencias con la nota del plan, deliberadas y para que el auditor no las tome por
 * descuido. En q10 el plan pedía una idea central que hubiera que sintetizar; sintetizada,
 * la clave era «el sílice decide el estilo eruptivo», que es la respuesta de manual y se
 * marca sin leer, así que el ítem pregunta ahora por el detalle de la última oración —sigue
 * dentro de `central-ideas-details`—. En q13 el plan pedía un distractor con datos bien
 * leídos que no respondieran a la pregunta; ese distractor describe por fuerza las dos
 * series moviéndose, lo que contradice a simple vista la afirmación del enunciado y se poda
 * sin mirar la tabla: era una de las tres podas que dejaban la clave sola. Se sustituye por
 * tres lecturas que sí sostienen la afirmación y solo la tabla desmiente.
 *
 * Medido tras esta cuarta versión sobre los siete ítems del bloque: la clave no es la opción
 * más larga en ninguno (puerta 2), no es la que más repite palabras del texto en ninguno y
 * es la que menos solo en q12, por empate (puerta 3, 14,3 %, máximo 40 %). En q13 las cuatro
 * opciones empatan en solape y quedan a un carácter de longitud entre sí.
 *
 * TERCERA VERSIÓN de las opciones (19 ago 2026). La segunda no bastó: extraído el examen
 * sin los textos, ocho solucionadores respondieron a ciegas y este bloque se cayó entero
 * —q09, q12 y q13 acertados 8 de 8; q13 y q15, 6 y 7 de 8—, contra el techo del 35 % de la
 * puerta 6. Textos y claves quedan intactos: solo cambian `options` y `razones` de q09,
 * q10, q12, q13, q14 y q15. q11 resistió la prueba a ciegas y no se toca; es el modelo.
 *
 * Se aplicó R8 en el orden que manda: primero la FORMA de la clave (número de palabras,
 * esqueleto sintáctico, alcance, conector, persona), después tres frases más con esa misma
 * forma, y solo al final se comprobó cuál sostiene el texto. Lo que delataba a la clave y
 * ya no está:
 *
 * - q09: la clave era la única tesis definitoria; las otras tres eran propósitos o
 *   detalles. Ahora las cuatro son «el museo sostiene que un instrumento es X, y que por
 *   eso el público debe ver Y», y solo el cierre del director decide cuál.
 * - q10: la clave era la única que nombraba un mecanismo y descartaba un rival («a matter
 *   of silica and not of volume»). Ahora las cuatro dicen «depends on how much X, since
 *   <mecanismo de rigidez>», y dos nombran el sílice —una en el magma, otra en la roca de
 *   encima—, de modo que saber volcanología no separa la clave.
 * - q12: la clave era la única que juntaba las dos mitades del argumento. Ahora las cuatro
 *   son «In the districts where <condición>, the households that bought first <perfil>», y
 *   A y D son imágenes especulares: sin el pasaje no se sabe cuál apoya a Belmonte.
 * - q13: la clave era la única con cifras y la única que comparaba tendencias, y además la
 *   única compatible con lo que se sabe de los líquenes fruticosos. Ahora las cuatro
 *   arrancan con «Bushy gray cover rose from 3% at 20 m…» y solo se separan por los
 *   números: sin la tabla no hay nada que elegir.
 * - q14: la clave era la única que atribuía ocultación deliberada. Ahora las cuatro
 *   terminan en «sin decirlo», y lo que cambia es qué sabía el posadero y desde cuándo.
 * - q15: la clave era la única no absoluta y la única sin elemento extraño; A decía
 *   «stayed frozen» (que se poda solo), C metía la lluvia y D decía «never … at all».
 *   Ahora las cuatro admiten agua y difieren en la profundidad y el ritmo del deshielo.
 *
 * Medido con el contador del guardián sobre los siete ítems tras la reescritura: la clave
 * no es la más larga en ninguno (puerta 2: 0 %), no es la que más repite el texto en
 * ninguno (puerta 3 por arriba: 0 %) y es la que menos repite solo en q12 (14,3 %, máximo
 * 40 %). Los `stimulus` no se tocaron: 89-118 palabras SAT, dentro del rango.
 *
 * SEGUNDA VERSIÓN — reescrita entera tras la auditoría que devolvió el bloque (71 % a
 * ciegas contra un techo del 35 %, y la clave como opción que menos repite el texto en
 * 4 de 7). Lo que cambió y por qué, en una línea por regla:
 *
 * - R5 (forma): en los siete ítems las cuatro opciones comparten ahora la forma
 *   definitoria de la clave —el mismo esqueleto sintáctico, el mismo alcance, la misma
 *   persona gramatical y el mismo periodo temporal—, de modo que tapando el texto no se
 *   puede podar ninguna. Antes se podaban por forma: la única tesis (q09), la única
 *   síntesis no absoluta (q10), la única cita en tercera persona (q11), la única opción
 *   que separaba dos causas (q12), la única que no era absurda (q14), la única que
 *   respondía por el periodo preguntado (q15).
 * - R4 (solape léxico por la cara inversa): la clave ya no es sistemáticamente la que
 *   menos vocabulario del texto repite. Medido con el contador del guardián sobre los
 *   siete ítems: la clave no es la que menos repite en ninguno (antes, en 4 de 7) ni la
 *   que más en ninguno, porque en q09, q10, q11, q14 y q15 empata con algún distractor;
 *   en q11 y q13 se queda a un punto del máximo. Ningún ítem se acerca a los +3 puntos
 *   que hacen saltar la puerta 3 por arriba.
 * - q11 llevaba un error de contenido en el texto —«untied his knots with a length of
 *   cord of my own», que no significa nada— y decía *untied* donde tenía que decir
 *   *tied*. Corregido aquí y en el documento de textos, para que no diverjan.
 * - q12 entregaba la conclusión entera en el enunciado, con su explicación rival dentro:
 *   el pasaje sobraba. El enunciado ahora solo nombra a la autora.
 * - q13 tenía la serie naranja monótona (34-30-27-26), que es un gradiente y por tanto
 *   contradice el «only one is sensitive» del enunciado. Los cuatro datos naranjas se
 *   sustituyeron por una serie sin tendencia (28-33-31-29) y el número de caracteres del
 *   `stimulus` no cambia.
 *
 * q13 es el ítem cuantitativo. En el examen real llevaría tabla o barras; el motor solo
 * pinta `stimulus`, así que los datos van dentro del texto como tabla de texto plano
 * (filas separadas por salto de línea, columnas por `·`). No se menciona ninguna imagen.
 * Sus 131 caracteres cuentan para la puerta 7: si se cambia el separador, hay que volver
 * a medir.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q09',
    type: 'mcq',
    part: 1,
    stimulus:
      "The Ferreira Museum owns four hundred stringed instruments, but its most visited room holds no display case. It is a workshop behind a glass wall. Inside, two repairers mend the museum's violins and guitars while visitors watch from a bench. A sign names the tools on the table and the wood being used that week. Children stay longest, and many come back a second time. The director explains the room in one line: an instrument is not an object to be looked at, but something kept alive by hands, and the public should see the hands.",
    text: "According to the text, what sets the museum's busiest room apart from the rest of the museum?",
    options: [
      'It is the room where the violins and guitars are played aloud, and visitors listen from a bench instead of reading a sign.',
      'It is the room where the violins and guitars are put into the hands of children, who may try the strings themselves.',
      'It is the room where the violins and guitars are mended, and visitors sit on a bench to watch the work close up.',
      'It is the room where a new instrument is built from raw wood, and visitors watch the tools on the table as it grows.',
    ],
    answer: 2,
  },
  {
    id: 'q10',
    type: 'mcq',
    part: 1,
    stimulus:
      'The same volcano can erupt in ways that look unrelated. Sometimes lava runs downhill in slow sheets for weeks; other times ash is thrown kilometers upward in a single afternoon. Neither behavior depends on how much magma is involved. Magma rich in silica is stiff, so the gas bubbles that form inside it cannot rise, and pressure grows until the rock above gives way. Magma poor in silica is runnier, and the same gas leaks out steadily as the magma climbs. Temperature and dissolved water change how stiff a magma is, which is why the output of one vent can shift from one style to the other between eruptions.',
    text: 'According to the text, why can a single vent erupt in both styles?',
    options: [
      'The magma reaching it is not equally stiff each time: heat and dissolved water leave one batch runnier than the one before.',
      'The magma reaching it does not carry equal silica each time: one batch comes up rich in it and stiff, the next poor in it and runnier.',
      'The magma reaching it does not give up its gas at one rate: gas gathers while the vent rests and then leaves all at once.',
      'The rock above it is not equally sound each time: every eruption cracks it further, and the next one meets a weaker lid.',
    ],
    answer: 0,
  },
  {
    id: 'q11',
    type: 'mcq',
    part: 1,
    stimulus:
      'My uncle Teodoro mended fishing nets on the dock, and for three summers I sat beside him and did nothing useful. He never once asked me to help. He would hold a torn section up against the light, find where the line had given way, and close it so evenly that afterward I could not say where the damage had been. At home I tied his knots with a length of cord of my own and never got a single one right. The afternoon he held out the wooden needle to me, I said the light was going, which was not true, and he put it back in the box without a word. I kept the cord.',
    text: "The narrator keeps trying his uncle's craft when he is alone, but he never lets his uncle see him attempt it. Which quotation from the text best illustrates that claim?",
    options: [
      '"for three summers I sat beside him and did nothing useful. He never once asked me to help."',
      '"At home I tied his knots with a length of cord of my own and never got a single one right"',
      '"close it so evenly that afterward I could not say where the damage had been"',
      '"The afternoon he held out the wooden needle to me, I said the light was going, which was not true"',
    ],
    answer: 1,
  },
  {
    id: 'q12',
    type: 'mcq',
    part: 1,
    stimulus:
      'Sewing machines were a luxury in 1860 and an ordinary household object by 1900. The usual explanation is price: manufacturing improved, competitors entered the trade, and the cost of a machine fell by more than half. Historian Ana Belmonte argues that price alone cannot account for the change. Even at the lower figure, she notes, a machine still cost a garment worker several months of wages, and the households that bought first were not the households whose earnings had risen. What spread the machine, in her account, was the installment contract: agents sold on weekly payments and took the machine back when payments stopped, which let them reach buyers who could never have saved the full sum at once.',
    text: "Which finding, if true, would most strongly support Belmonte's argument?",
    options: [
      'In the districts where the price of a machine fell earliest, the households that bought first were those whose weekly wages had lately risen.',
      'In the districts where agents first sold on weekly payments, the households that bought first were those that cleared the whole sum within a month.',
      'In the districts where machines sold on weekly payments, the households that bought first were already buying their furniture and their clocks on the same terms.',
      'In the districts where weekly payments came years ahead of any cut in cost, the households that bought first were those whose earnings had not moved.',
    ],
    answer: 3,
  },
  {
    id: 'q13',
    type: 'mcq',
    part: 1,
    stimulus:
      'Lichens have no roots: whatever they need reaches them from the air, and so does whatever the air is carrying. That is why surveyors treat them as a gauge of local pollution. To measure the effect of vehicle exhaust, a team recorded the share of stone wall covered by two lichens—a bushy gray species and a flat orange one—at four distances from a busy highway. Each figure below is the average of ten walls.\n\nDistance from highway · bushy gray cover · flat orange cover\n20 m · 3% · 28%\n100 m · 8% · 33%\n400 m · 22% · 31%\n1,000 m · 30% · 29%',
    text: 'A researcher claims that only one of the two lichens is sensitive to vehicle exhaust. Which choice best describes data from the study that support that claim?',
    options: [
      'Bushy gray cover rose from 3% at 20 m to 30% at 1,000 m, while flat orange cover stayed between 28% and 33% at all four distances.',
      'Bushy gray cover rose from 3% at 20 m to 30% at 1,000 m, while flat orange cover stayed between 29% and 33% at all four distances.',
      'Bushy gray cover rose from 3% at 20 m to 22% at 1,000 m, while flat orange cover stayed between 28% and 33% at all four distances.',
      'Bushy gray cover rose from 3% at 20 m to 22% at 1,000 m, while flat orange cover stayed between 29% and 33% at all four distances.',
    ],
    answer: 0,
  },
  {
    id: 'q14',
    type: 'mcq',
    part: 1,
    stimulus:
      'Nadia had been away for eleven years, and the innkeeper looked at her the way he would have looked at any traveler off the evening bus. He asked her to spell her name, and then asked again while he wrote it in the register. He remarked that no family by that name had lived in the village for a long time. Then he carried her bag up to the room she had slept in as a girl, which she had not asked for. When she came down at six, a pot of the bitter mountain tea her grandmother used to make was waiting on the table, and she had not mentioned that either.',
    text: 'Based on the text, what can most reasonably be inferred about the innkeeper?',
    options: [
      "He had taken her for a traveler who had stayed there years before, and gave her that traveler's room and that traveler's tea without saying so.",
      'He had placed her only when she came down at six, and the tea he made then was all he ever said about it.',
      'He had placed her the moment she stepped off the bus, and gave no sign of it while he wrote her name in the register.',
      'He had been told of her coming by a family in the village, and had the room open and the bitter tea waiting without letting on that he knew.',
    ],
    answer: 2,
  },
  {
    id: 'q15',
    type: 'mcq',
    part: 1,
    stimulus:
      'A stalagmite grows only while water moves through the rock above it, dissolving carbonate on the way down and leaving a thin film of it behind at every drip; ground that stays frozen the year round shuts the process off, and the column stops. Caves in the far north of Siberia therefore hold an unusual archive. In one of them, at a latitude where the soil today never thaws below the first meter, a team dated the growth bands of a single column and found that deposition ran without interruption from about 402,000 to 381,000 years ago, and then ceased for the hundred thousand years that followed.',
    text: "Based on the text, what can most reasonably be inferred about the soil at the cave's latitude from about 402,000 to 381,000 years ago?",
    options: [
      'It thawed below the first meter in some of those millennia and stayed frozen that deep for long spells in between.',
      'It thawed below the first meter in every one of those millennia and never stayed frozen that deep in any of them.',
      'It thawed earlier in the year than it does now in every one of those millennia, but never below the first meter of soil.',
      'It thawed earlier in the year than it does now in some of those millennia, but never below the first meter of soil.',
    ],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q09',
    domain: 'II',
    tipo: 'central-ideas-details',
    dificultad: 1,
    tema: 'humanidades',
    razones: {
      A:
        'Convierte la sala en un auditorio. En ella no suena nada: los dos que están dentro cosen los violines y las guitarras, y del público el texto dice que mira desde un banco. La demostración con instrumentos tocados es una práctica de museo corriente, y por eso esta opción es la que primero se le ocurre a quien busca por qué una sala sería la más visitada; lo que no tiene es una sola línea del texto detrás.',
      B:
        'Le cambia el dueño a las manos. Las que el director manda ver son las de los dos reparadores —«something kept alive by hands, and the public should see the hands»—, y al público el texto lo sienta en un banco al otro lado de un cristal, sin darle nada que tocar. Es la sala de manipulación que muchos museos tienen, traída aquí por quien lee «hands» y supone que son las suyas.',
      C:
        "Correcta: es lo que el texto describe línea por línea. «Its most visited room holds no display case. It is a workshop behind a glass wall. Inside, two repairers mend the museum's violins and guitars while visitors watch from a bench.»",
      D:
        "Cambia remendar por construir. Dentro se arreglan piezas que el museo ya tiene —«mend the museum's violins and guitars»— y la madera que el cartel nombra es la que se está usando esa semana para arreglarlas, no la de un instrumento nuevo. El taller de luthier a la vista del público existe en otros museos, y quien elige esta opción retiene «tools» y «wood» y monta con ellos el taller que conoce.",
    },
    fuenteHecho:
      'Práctica museística real y de dominio general (talleres de restauración a la vista del público); museo, colección y cita del director inventados.',
  },
  {
    id: 'q10',
    domain: 'II',
    tipo: 'central-ideas-details',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A:
        'Correcta: es lo que contesta la última oración, y es la única que responde a la pregunta que se hace. La rigidez no es un rasgo fijo del magma de un conducto —la temperatura y el agua disuelta la cambian—, «which is why the output of one vent can shift from one style to the other between eruptions».',
      B:
        'Contesta con el mecanismo general del pasaje a la única pregunta que el pasaje contesta de otro modo, y por eso es el gemelo de la clave: dice lo mismo sobre la rigidez y le pone otra causa. El sílice explica por qué un magma es rígido y otro no, pero el texto no dice en ninguna línea que la carga de sílice de un mismo conducto varíe de una erupción a otra: lo que atribuye a esa variación son la temperatura y el agua disuelta. Es el error de quien reconoce la explicación principal y no comprueba de qué es explicación.',
      C:
        'Cambia la movilidad del gas por su acumulación. El texto pone «the same gas» en las dos ramas: lo que decide es si puede salir del magma, no cuánto se haya juntado mientras el conducto estaba callado, y el reposo entre erupciones no aparece en el texto. Es el error de quien trae de fuera que cuanto más espera un volcán, peor sale.',
      D:
        'Traslada la explicación a la roca de encima. Esa roca sale una sola vez y como lo que cede al final de una de las dos ramas, nunca como la propiedad que decide el estilo, y el texto no dice que se debilite de una erupción a la siguiente. Es el error de quien retiene el último eslabón del mecanismo y lo toma por la causa.',
    },
    fuenteHecho:
      'Volcanología básica de dominio público (la viscosidad del magma, gobernada por el contenido de sílice, decide el estilo eruptivo); sin volcán, fecha ni serie concretos.',
  },
  {
    id: 'q11',
    domain: 'II',
    tipo: 'command-of-evidence-textual',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A:
        'Las dos oraciones son ausencia de acción: el narrador está al lado y no hace nada, y el tío tampoco le pide nada. Sentarse tres veranos no es intentar el oficio, y la afirmación exige que los intentos existan; quien la elige toma la compañía por práctica.',
      B:
        'Correcta: sostiene las dos mitades a la vez. Hacer sus nudos con un cordel propio es el intento —repetido y siempre fallido, lo que muestra la insistencia—, y «At home» es lo que lo pone fuera de la vista del tío.',
      C:
        'Sostiene solo la admiración por la destreza del tío. Quien la elige cambia el sujeto de la afirmación: el elogio es del narrador, pero la conducta que hay que probar es la suya, no la del tío.',
      D:
        'Sostiene solo la evitación. La mentira sobre la luz prueba que rehúye la prueba delante de él y no dice nada de que practique por su cuenta; con esta cita sola, el narrador podría no tener el menor interés en el oficio.',
    },
    fuenteHecho: 'Ficción original; el vocabulario marinero queda explicado dentro del propio texto.',
  },
  {
    id: 'q12',
    domain: 'II',
    tipo: 'command-of-evidence-textual',
    dificultad: 3,
    tema: 'historia',
    razones: {
      A:
        'Va en la dirección contraria. Si los primeros compradores fueron los hogares cuyo salario acababa de subir, la caída del precio basta para contar el cambio y se cae la observación en la que Belmonte se apoya. Es el error de quien reconoce las dos variables correctas y no comprueba el sentido.',
      B:
        'Le quita a la venta a plazos lo único que la haría decisiva: su alcance. Quien liquida la máquina en un mes tenía el dinero y habría comprado igual al contado, así que el plazo no llegó a ningún comprador nuevo. Atrae a quien ve «weekly payments» y da por bueno todo lo que las nombre.',
      C:
        'Habla del crédito en general, no de la máquina. Que las mismas casas compraran muebles y relojes a plazos dice que la forma de venta se extendía, y eso convive con que la máquina se vendiera porque el precio ya había bajado: no separa las dos explicaciones, que es lo único que el hallazgo tiene que hacer.',
      D:
        'Correcta: separa las dos causas en el tiempo —el pago semanal llega años antes de que el precio caiga— y sitúa a los primeros compradores en la población exacta que describe Belmonte, la de los hogares cuyos ingresos no habían subido.',
    },
    fuenteHecho:
      'Hecho documentado de historia económica del XIX (venta a plazos con reserva de dominio); la historiadora, las cifras y los porcentajes son inventados.',
  },
  {
    id: 'q13',
    domain: 'II',
    tipo: 'command-of-evidence-quantitative',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A:
        'Correcta: es la única lectura que sobrevive a recorrer las dos columnas enteras. El gris va de 3 % a los 20 m a 30 % a los 1.000 —la última fila, no la penúltima— y el naranja, fila por fila, da 28, 33, 31 y 29, de modo que cabe entero en 28-33 % y no se mueve con la distancia. Una serie que se multiplica por diez junto a otra que se queda quieta es el contraste que señala a una sola especie.',
      B:
        'Sube el suelo de la banda naranja una fila. A los 20 m el naranja está en 28 %, justo la distancia donde el efecto tendría que verse, y sin esa cifra la especie plana parece todavía más plana: por eso esta opción se lee como la evidencia más fuerte de las cuatro y es la más tentadora. Es el error de quien gasta la primera fila en la mitad gris y empieza a leer la columna naranja en la segunda.',
      C:
        'El 22 % existe, pero es la fila de los 400 m; a los 1.000 m el gris llega al 30 %. Todo lo demás de la opción es exacto, así que solo la descarta quien baja la columna gris hasta la última línea en vez de pararse en la penúltima, donde el salto de 8 % a 22 % ya parece contar la historia entera.',
      D:
        'Hace los dos recortes a la vez. Lee la columna gris de arriba abajo y se detiene cuando la subida ya se ve (22 % a los 400 m), y la naranja de abajo arriba y se detiene también antes de tiempo (29, 31, 33): se le escapan las dos filas que deciden, la de los 1.000 m y la de los 20 m. Ninguna de las dos columnas se lee entera y las dos mitades salen mal.',
    },
    fuenteHecho:
      'Uso real de los líquenes como bioindicadores de calidad del aire; distancias, número de muros y los ocho porcentajes son inventados, y las especies van sin nombre científico.',
  },
  {
    id: 'q14',
    domain: 'II',
    tipo: 'inferences',
    dificultad: 2,
    tema: 'literatura',
    razones: {
      A:
        'Explica el acierto con una confusión de identidad, y la confusión no da lo que hay que explicar: la habitación es la que Nadia ocupó de niña y la infusión es la que hacía su abuela. Ningún huésped anterior deja esas dos costumbres. Quien la elige busca una causa que no obligue a que el posadero la conozca.',
      B:
        'Invierte el orden de la escena. A las seis el té ya estaba servido y la maleta llevaba rato en la habitación de su infancia: lo que el posadero sabía, lo sabía antes de que ella bajara. Atrae a quien lee la última imagen como el momento en que él la reconoce.',
      C:
        'Correcta: hace de desconocido —le pide el nombre deletreado, y dos veces— y a la vez acierta la habitación en la que ella dormía de niña y el té de su abuela sin que ella pida ninguna de las dos cosas. Lo único que junta ambas conductas es que la reconoció y calló.',
      D:
        'Traslada el conocimiento a un tercero para no atribuírselo al posadero. El texto no da rastro de ningún aviso previo, y la escena lo desmiente: a quien le han anunciado la llegada de Nadia no necesita hacerle deletrear su nombre dos veces para escribirlo.',
    },
    fuenteHecho: 'Ficción original; la infusión de montaña queda explicada por su función en la escena.',
  },
  {
    id: 'q15',
    domain: 'II',
    tipo: 'inferences',
    dificultad: 3,
    tema: 'ciencia',
    razones: {
      A:
        'Rompe la continuidad que el texto afirma. El depósito corrió «without interruption» durante los veintiún mil años, y un tramo con el suelo helado a esa profundidad lo habría cortado y habría dejado un hueco entre las bandas. Es el error de quien ve «growth bands» y toma las bandas por episodios sueltos de crecimiento, que es además la imagen que uno tiene de un clima glacial: encendido y apagado.',
      B:
        'Correcta: hay que cruzar tres cosas y ninguna basta sola. La regla —«a stalagmite grows only while water moves through the rock above it»—, el suelo de hoy, que «never thaws below the first meter», y el hecho de que el depósito corriera «without interruption» entre las dos fechas. Para que el agua bajara, el deshielo tuvo que pasar de ese primer metro; para que no se interrumpiera, tuvo que hacerlo en todos esos milenios.',
      C:
        'Paga el cambio de clima con la estación en vez de con la profundidad. Un deshielo que empieza antes pero se detiene en el primer metro deja el terreno de debajo helado todo el año, y eso «shuts the process off»: con esa descripción no se habría depositado nada, y hubo depósito seguido durante veintiún mil años. Es el error de quien retiene «más templado que hoy» y mueve la variable que no abre el paso al agua.',
      D:
        'Junta los dos fallos anteriores: mantiene el metro de hoy como techo del deshielo y además reparte el calor en tramos. Cualquiera de las dos mitades por separado ya impediría que la columna creciera —o no crece nunca, o deja de crecer en los tramos helados—, y el texto dice que creció sin interrupción entre las dos fechas. Es el error de quien imagina el pasado remoto como el presente con algunos veranos mejores.',
    },
    fuenteHecho:
      'Método real de paleoclimatología (los espeleotemas solo crecen con agua de infiltración líquida, y su crecimiento indica retroceso del permafrost); cueva, equipo y fechas inventados.',
  },
]
