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
    text: 'Which choice best states the main idea of the text?',
    options: [
      'The museum shows the repair work because it holds that an instrument carries the hands that first built it, and that those hands are what the visitors come to see.',
      'The museum shows the repair work because it holds that an instrument is the wood and the tools inside it, and that a visitor should be shown both of them.',
      'The museum shows the repair work because it holds that an instrument is a thing hands keep usable, and that the public should therefore see those hands at work.',
      'The museum shows the repair work because it holds that an instrument is a trade before it is an object, and that the young keep a trade alive by watching.',
    ],
    answer: 2,
  },
  {
    id: 'q10',
    type: 'mcq',
    part: 1,
    stimulus:
      'The same volcano can erupt in ways that look unrelated. Sometimes lava runs downhill in slow sheets for weeks; other times ash is thrown kilometers upward in a single afternoon. Neither behavior depends on how much magma is involved. Magma rich in silica is stiff, so the gas bubbles that form inside it cannot rise, and pressure grows until the rock above gives way. Magma poor in silica is runnier, and the same gas leaks out steadily as the magma climbs. Temperature and dissolved water change how stiff a magma is, which is why the output of one vent can shift from one style to the other between eruptions.',
    text: 'Which choice best states the main idea of the text?',
    options: [
      'Whether an eruption runs or bursts depends on how much silica the magma carries, since the stiffer it gets the less easily its gas bubbles rise.',
      'Whether an eruption runs or bursts depends on how much silica the rock above holds, since a stiff lid pens the gas in until the pressure breaks it.',
      'Whether an eruption runs or bursts depends on how much gas the magma carries, since the bubbles stiffen a body that would otherwise run downhill.',
      'Whether an eruption runs or bursts depends on how much magma the vent delivers, since a large body cools on the way up and stiffens before it arrives.',
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
      'Bushy gray cover rose from 3% at 20 m to 30% at 1,000 m, while flat orange cover never left the 28-33% band at any distance.',
      'Bushy gray cover rose from 3% at 20 m to 8% at 100 m, while flat orange cover rose from 28% to 33% over that same stretch.',
      'Bushy gray cover rose from 3% at 20 m to 30% at 1,000 m, while flat orange cover fell from 33% to 28% over that same stretch.',
      'Bushy gray cover rose from 3% at 20 m to 30% at 1,000 m, while flat orange cover stayed above bushy gray at all four distances.',
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
    text: 'Based on the text, what can most reasonably be inferred about the ground above the cave during the interval when the column was growing?',
    options: [
      'It stayed frozen the year round, and the water that fed the column ran in cracks below the frozen layer.',
      'It thawed below the first meter for part of each year, which makes the site milder then than it is today.',
      'It thawed no deeper than it does now, and the water came from rain heavier than any the region sees today.',
      'It thawed in scattered warm years only, which makes the interval a run of milder spells broken by frozen ones.',
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
        'Se queda con la palabra del cierre —«hands»— y le pone el dueño equivocado: las manos que el director manda mirar son las dos que están reparando ahora, no las del artesano que construyó el instrumento. Quien la elige identifica bien el término del que depende la idea central y falla en de quién es.',
      B:
        'Asciende el cartel a tesis del museo. Que la sala nombre las herramientas y la madera de la semana es un recurso suyo, y en ninguna línea dice el texto que un instrumento sea la madera y las herramientas que lleva dentro. Es el error de quien se ancla en el único dato concreto del párrafo.',
      C:
        'Correcta: es el cierre del director dicho con otras palabras y con sus dos mitades —qué es un instrumento y qué se sigue de ello para el público—: «an instrument is not an object to be looked at, but something kept alive by hands, and the public should see the hands».',
      D:
        'Convierte una observación en la razón de ser de la sala. El texto anota que los niños se quedan más rato y que muchos vuelven, pero no dice que la sala exista para que el oficio se transmita, ni llama oficio al instrumento: el oficio es de los dos reparadores, no de la pieza.',
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
        'Correcta: es la síntesis que ninguna oración da entera. El sílice endurece el magma, el magma rígido no deja subir las burbujas y la presión acaba rompiendo la roca; con poco sílice el mismo gas se escapa según el magma sube. Las dos ramas del texto caen bajo una sola propiedad, y es esta.',
      B:
        'Traslada la rigidez del magma a la roca que tiene encima. El texto solo llama rígido al magma rico en sílice, y la roca aparece como lo que cede al final de una de las dos ramas, nunca como la propiedad que decide el estilo. Es el error de quien retiene «stiff» y pierde de qué se dice.',
      C:
        'Cambia la movilidad del gas por su cantidad. El texto pone «the same gas» en los dos casos: lo que varía no es cuánto gas hay, sino si puede salir, y la rigidez que aquí se atribuye a las burbujas el texto se la atribuye al sílice. Es el error de quien trae de fuera que más gas equivale a más explosión.',
      D:
        'Cuelga del volumen un factor que el texto sí reconoce. La temperatura cambia la rigidez —lo dice la última oración—, pero el tamaño del cuerpo de magma no decide nada: «Neither behavior depends on how much magma is involved». Es el error de quien acepta media línea verdadera y no comprueba de qué la cuelga.',
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
        'Correcta: es la única lectura que recorre las cuatro distancias y encuentra una sola serie que responda. El gris multiplica por diez su cobertura al alejarse (3 % → 30 %) y el naranja no sale de la banda 28-33 % en ninguna fila; sin ese contraste completo no hay manera de señalar a una especie sola.',
      B:
        'Los cuatro números son correctos y aun así no responden: entre los 20 y los 100 m suben las dos series, de modo que ese tramo no distingue una especie de la otra. Es el error de quien se queda en las dos primeras filas y da la tabla por leída.',
      C:
        'La mitad gris es exacta y la naranja va al revés: de los 20 a los 1.000 m el naranja recorre 28, 33, 31 y 29, así que ni empieza en 33 ni termina en 28. Quien la elige toma el máximo y el mínimo de la columna y los ordena para fabricar la tendencia espejo que espera encontrar, porque da por hecho que si una serie sube la otra tiene que bajar.',
      D:
        'Empieza bien y añade una comparación que la tabla desmiente: a 1.000 m el gris cubre el 30 % y el naranja el 29 %, así que el naranja no está por encima en las cuatro distancias. Es el error de quien deja de comprobar en cuanto el patrón le parece claro y no llega a la última fila.',
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
        'Aplica la regla al revés y luego le busca una salida. Si el suelo hubiera seguido helado todo el año el proceso estaría cortado —«ground that stays frozen the year round shuts the process off»— y no habría 21.000 años de depósito seguido; la ruta por grietas bajo la capa helada no está en el texto, se añade para tapar la contradicción.',
      B:
        'Correcta: sale de cruzar la regla de la primera oración —sin agua líquida que atraviese la roca no hay depósito— con el caso de la tercera, una cueva cuyo suelo hoy no se deshiela por debajo del primer metro y que sin embargo registró depósito continuo.',
      C:
        'Deja el suelo como está hoy y busca el agua en otra parte. Con el deshielo detenido en el primer metro la lluvia no atraviesa la roca por mucho que aumente, y la precipitación no aparece en ninguna línea del texto: es el error de quien cambia la variable más fácil de imaginar.',
      D:
        'Rompe la continuidad que el texto afirma: el depósito corrió «without interruption» de hace 402.000 a 381.000 años, así que el deshielo no fue cosa de años sueltos. Atrae a quien ve «growth bands» y toma las bandas por episodios separados de crecimiento.',
    },
    fuenteHecho:
      'Método real de paleoclimatología (los espeleotemas solo crecen con agua de infiltración líquida, y su crecimiento indica retroceso del permafrost); cueva, equipo y fechas inventados.',
  },
]
