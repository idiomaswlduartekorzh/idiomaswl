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
      'The museum shows the repair work because it holds that all four hundred of its pieces belong in use rather than in a case.',
      'The museum shows the repair work because it hopes the children who watch from the bench will take up the trade themselves.',
      'The museum shows the repair work because it takes an instrument to be a thing hands keep usable, not a thing to look at.',
      'The museum shows the repair work because a visitor who is told which tools and which wood a violin takes will look harder.',
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
      'Whether an eruption runs or bursts depends on whether gas bubbles can rise from the magma, a matter of silica and not of volume.',
      'Whether an eruption runs or bursts depends on how much gas the magma holds, since a gas-rich body breaks rock and a poor one drains.',
      'Whether an eruption runs or bursts depends on the strength of the rock above the vent, which pens the pressure in until it fails.',
      'Whether an eruption runs or bursts depends on how fast the magma climbs, since a slow rise gives the gas time to work loose.',
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
      'In the districts where the cost of a machine fell first, the households that bought first were those whose wages had lately risen.',
      'In the towns where agents worked on commission, they pressed the weekly payments harder than they pressed sales for cash.',
      'In the towns where machines sold on weekly payments, agents were soon selling furniture and clocks on the same terms.',
      'In the districts where weekly payments came before the fall in price, the households that bought first had no rise in wages.',
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
      'Bushy gray cover on the stone walls rose from 3% to 30% with distance from the highway, while flat orange cover did not.',
      'At 400 m from the highway, bushy gray cover on the stone walls stood at 22% and flat orange cover at 31% of the same walls.',
      'Flat orange cover on the stone walls rose steadily with distance from the highway, while bushy gray cover barely moved.',
      'Flat orange cover was greater than bushy gray cover at every one of the four distances the team recorded on the walls.',
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
      'He took Nadia for a guest who had lodged with him on some earlier visit.',
      'He knew the family name she gave him, but not the woman who was giving it.',
      'He had placed Nadia the moment she walked in and let it pass unremarked.',
      'He had been told beforehand by someone else in the village which room to open.',
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
      'It stayed frozen the year round, as the ground at that latitude still does today.',
      'It thawed for part of each year, which makes the site milder then than it is today.',
      'It thawed no deeper than it does today, and heavier rain is what kept the column growing.',
      'It never froze at all, not even in the season when the surface of the soil freezes today.',
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
        'Estira el cierre hasta la colección entera. El director dice qué es un instrumento y por qué se ve el taller; no dice que las cuatrocientas piezas deban estar en uso. Es la tesis demasiado amplia: quien la elige generaliza la última frase más allá de lo que afirma.',
      B:
        'Convierte una observación en un propósito. El texto cuenta que los niños se quedan más rato y que muchos vuelven, pero en ningún momento dice que la sala exista para que aprendan el oficio ni para que nadie lo herede.',
      C:
        'Correcta: es el cierre dicho con otras palabras —«an instrument is not an object to be looked at, but something kept alive by hands, and the public should see the hands»—, y las cinco oraciones anteriores no hacen otra cosa que prepararlo.',
      D:
        'Asciende el cartel, que es un recurso de la sala, a razón de ser de la sala, y le añade un fin didáctico —que el visitante mire mejor un violín si le nombran herramientas y madera— que el texto no enuncia. Atrae a quien se ancla en el único dato concreto.',
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
        'Correcta: hay que juntar la oración 3 —el volumen no decide nada— con las dos mitades del mecanismo (el gas atrapado en el magma rígido frente al gas que escapa del fluido). Ninguna oración lo dice entera.',
      B:
        'Cambia la movilidad del gas por su cantidad. El texto pone «the same gas» en los dos casos: lo que varía no es cuánto gas hay, sino si puede salir. Es el error de quien trae de fuera la idea de que más gas equivale a más explosión.',
      C:
        'Toma por causa lo que el texto presenta como último paso de una sola de las dos ramas. La roca cede porque la presión creció bajo un magma rígido; el texto no la ofrece nunca como la propiedad que decide el estilo, y con el magma fluido la roca no llega a ceder.',
      D:
        'Inventa una variable que el texto no nombra, la velocidad de ascenso. El escape continuo se atribuye a que el magma es más fluido, no a que suba despacio: «as the magma climbs» dice cuándo se escapa el gas, no a qué ritmo sube la columna.',
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
        'Va en la dirección contraria. Si los primeros compradores fueron los hogares cuyo salario acababa de subir, lo que se refuerza es la explicación por precio y se cae la observación en la que Belmonte se apoya. Es el error de quien reconoce las variables correctas y no comprueba el sentido.',
      B:
        'Habla de los incentivos del vendedor, no de a quién alcanzaba la venta. Que el agente empujara el pago semanal explica por qué se ofrecía, y deja intacta la posibilidad de que quien compró lo hiciera porque el precio ya había bajado.',
      C:
        'Versión más amplia: que el pago semanal se extendiera a muebles y relojes habla del crédito en general y no distingue entre las dos explicaciones de la máquina de coser, que es lo único que el hallazgo tiene que hacer.',
      D:
        'Correcta: separa las dos causas en el tiempo —el pago semanal llega antes de que el precio caiga— y sitúa a los primeros compradores en la población exacta que describe el texto, la de ingresos que no habían subido.',
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
        'Correcta: es la única que compara cómo cambia cada serie a lo largo de las cuatro distancias, que es lo único que puede mostrar sensibilidad. El gris multiplica por diez su cobertura al alejarse (3 % → 30 %) mientras el naranja va y viene entre el 28 % y el 33 % sin seguir la distancia, y solo ese contraste señala a una sola especie.',
      B:
        'Dos casillas leídas correctamente que no responden. El 22 % y el 31 % de los 400 m están en la tabla, pero una sola distancia no puede mostrar que una especie siga el gradiente y la otra no: para eso hacen falta al menos dos.',
      C:
        'Invierte las dos series: es el naranja el que apenas se mueve y el gris el que sube con la distancia. Es el error de quien lee las columnas cambiadas o se queda con el color que más superficie cubre.',
      D:
        'Compara niveles en lugar de tendencias, y además falla en la última fila: a 1.000 m el gris cubre el 30 % y el naranja el 29 %. Quien la elige deja de mirar la tabla cuando el patrón ya le parece claro.',
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
        'Explica la familiaridad con una confusión de identidad. No se sostiene: acertar la habitación de su infancia y el té de su abuela exige conocerla a ella, y tomarla por otro huésped no da ninguna de las dos cosas.',
      B:
        'Se queda en la única prueba explícita de conocimiento —el posadero sabe del apellido y comenta que esa familia ya no vive en el pueblo— y da el ítem por resuelto ahí. Un apellido no dice en qué habitación dormía ella de niña ni qué infusión hacía su abuela.',
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
        'Aplica la regla al revés. Si el suelo hubiera estado helado todo el año, el agua no habría atravesado la roca y la columna no habría crecido; el texto dice que creció sin interrupción durante esos 21.000 años. Sale de leer solo el «today» de la tercera oración y suponer que allí siempre fue así.',
      B:
        'Correcta: sale de cruzar la regla de la primera oración —sin agua líquida que atraviese la roca no hay depósito— con el caso de la tercera, una cueva cuyo suelo hoy no se deshiela por debajo del primer metro y que sin embargo registró depósito continuo.',
      C:
        'Busca el agua en otra parte. Con el suelo deshelándose solo en el primer metro, como hoy, la lluvia no atraviesa la roca por mucho que aumente; además el texto no menciona la precipitación en ninguna línea.',
      D:
        'Niega demasiado. Del texto se sigue que el suelo no estuvo helado todo el año, no que no se helara nunca: un invierno con la superficie helada y un deshielo estacional bastan para que el agua baje y la columna crezca.',
    },
    fuenteHecho:
      'Método real de paleoclimatología (los espeleotemas solo crecen con agua de infiltración líquida, y su crecimiento indica retroceso del permafrost); cueva, equipo y fechas inventados.',
  },
]
