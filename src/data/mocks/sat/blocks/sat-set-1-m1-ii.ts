import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Information and Ideas del módulo `sat-set-1-m1` — ítems q09 a q15.
 *
 * Plan: docs/sat-planes/sat-set-1-m1.md (filas 9-15). Textos: docs/sat-planes/
 * sat-set-1-m1-textos-ii.md, copiados literalmente, sin una coma cambiada.
 *
 * Las claves son las del plan y no se negocian ítem a ítem: C, A, B, D, A, C, B.
 * Cuando un ítem pedía otra letra se movió el contenido de las opciones, nunca la clave:
 * el reparto se defiende a nivel de módulo y aquí solo se ve un cuarto del examen.
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
      "The museum's most visited room holds no display case: it is a workshop set behind a glass wall.",
      'A sign on the table names the tools the repairers work with and the wood chosen for that week.',
      'The museum puts repair on view because it sees an instrument as something craft keeps usable.',
      'Children stay in the glass-walled room longer than adult visitors do, and many of them come again.',
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
      'Eruption style turns on whether gas can escape the molten rock, which composition governs rather than volume.',
      'Magma rich in silica is stiff, so its gas bubbles cannot rise and pressure grows until the rock above gives way.',
      'Temperature and the water dissolved in a magma are what make one magma stiffer than another.',
      'Because a single vent can behave in unrelated ways, eruptions cannot be foreseen from what came before.',
    ],
    answer: 0,
  },
  {
    id: 'q11',
    type: 'mcq',
    part: 1,
    stimulus:
      'My uncle Teodoro mended fishing nets on the dock, and for three summers I sat beside him and did nothing useful. He never once asked me to help. He would hold a torn section up against the light, find where the line had given way, and close it so evenly that afterward I could not say where the damage had been. At home I untied his knots with a length of cord of my own and never got a single one right. The afternoon he held out the wooden needle to me, I said the light was going, which was not true, and he put it back in the box without a word. I kept the cord.',
    text: "The narrator is pulled toward his uncle's trade and yet never tries it where his uncle can watch him. Which quotation from the text best illustrates that claim?",
    options: [
      '"My uncle Teodoro mended fishing nets on the dock, and for three summers I sat beside him and did nothing useful."',
      '"At home I untied his knots with a length of cord of my own and never got a single one right."',
      '"He would hold a torn section up against the light, find where the line had given way, and close it so evenly that afterward I could not say where the damage had been."',
      '"The afternoon he held out the wooden needle to me, I said the light was going, which was not true."',
    ],
    answer: 1,
  },
  {
    id: 'q12',
    type: 'mcq',
    part: 1,
    stimulus:
      'Sewing machines were a luxury in 1860 and an ordinary household object by 1900. The usual explanation is price: manufacturing improved, competitors entered the trade, and the cost of a machine fell by more than half. Historian Ana Belmonte argues that price alone cannot account for the change. Even at the lower figure, she notes, a machine still cost a garment worker several months of wages, and the households that bought first were not the households whose earnings had risen. What spread the machine, in her account, was the installment contract: agents sold on weekly payments and took the machine back when payments stopped, which let them reach buyers who could never have saved the full sum at once.',
    text: 'Belmonte concludes that what carried the sewing machine into ordinary homes was the installment contract and not the drop in price. Which finding, if true, would most strongly support her conclusion?',
    options: [
      'Between 1870 and 1900 the share of homes owning a sewing machine rose in every region that was surveyed.',
      'Agents who sold on weekly terms earned a larger commission than agents who sold machines for cash.',
      'By 1900 agents in the same towns were also selling furniture, clocks, and pianos on exactly the same weekly terms.',
      'Where installment selling began before the price drop, the first purchasers were families with no gain in pay.',
    ],
    answer: 3,
  },
  {
    id: 'q13',
    type: 'mcq',
    part: 1,
    stimulus:
      'Lichens have no roots: whatever they need reaches them from the air, and so does whatever the air is carrying. That is why surveyors treat them as a gauge of local pollution. To measure the effect of vehicle exhaust, a team recorded the share of stone wall covered by two lichens—a bushy gray species and a flat orange one—at four distances from a busy highway. Each figure below is the average of ten walls.\n\nDistance from highway · bushy gray cover · flat orange cover\n20 m · 3% · 34%\n100 m · 8% · 30%\n400 m · 22% · 27%\n1,000 m · 30% · 26%',
    text: 'A researcher claims that only one of the two lichens is sensitive to vehicle exhaust. Which choice best describes data from the study that support that claim?',
    options: [
      'Gray cover rose from 3% to 30% with distance, while orange cover moved by only eight points.',
      'At 1,000 m from the highway, the bushy gray species covered 30% of the stone wall.',
      'Flat orange cover rose steadily with distance from the highway while bushy gray cover barely moved.',
      'Flat orange cover was greater than bushy gray cover at each of the four distances.',
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
      'He offers every guest off the evening bus the same room and the same pot of mountain tea.',
      'He had placed Nadia the moment she walked in and chose to let it pass unremarked.',
      'Someone in the village had told him beforehand which room Nadia would want.',
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
      'It stayed frozen through the year, as the ground at that latitude still does.',
      'It cannot have been frozen all year, so the site was milder then than it is now.',
      'It stopped feeding carbonate to the column about 381,000 years ago and never fed it again.',
      'It had lost its permanent frost, and so had the whole far north of Siberia.',
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
        'Repite casi palabra por palabra la primera oración y media. Es cierto y es el gancho del texto, pero describe cómo es la sala, no por qué el museo decidió abrirla; quien elige aquí toma el detalle llamativo por la tesis.',
      B:
        'El cartel existe y dice eso, pero es un recurso de la sala: sirve a la idea del texto y no la enuncia. Atrae a quien busca «el dato» concreto en lugar de la afirmación que lo ordena todo.',
      C:
        'Correcta: es lo que dice el cierre con otras palabras —«an instrument is not an object to be looked at, but something kept alive by hands, and the public should see the hands»—, y las cinco oraciones anteriores no hacen otra cosa que prepararlo.',
      D:
        'Los niños se quedan más rato y muchos vuelven: verdadero, y además es lo único que el texto casi cuantifica del público. Pero mide un efecto de la sala, no la razón por la que existe.',
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
        'Copia la cuarta oración. Verdadera y central para una de las dos mitades, pero deja fuera el magma pobre en sílice, y sin ese contraste no hay explicación de por qué el mismo volcán cambia de estilo.',
      C:
        'Se queda en la penúltima oración. Temperatura y agua disuelta modulan la rigidez, pero el texto las presenta como lo que hace variar el mecanismo, no como el mecanismo.',
      D:
        'Amplía hasta lo impredecible. El texto va justo en la dirección contraria: nombra qué propiedad decide el estilo y por qué un mismo conducto puede cambiar de uno a otro.',
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
        'Es la oración de apertura y suena a resumen, pero en ella el narrador no intenta nada: estar sentado al lado sin hacer nada útil no es un intento oculto, y la afirmación exige que los intentos existan.',
      B:
        'Correcta: sostiene las dos mitades a la vez. Deshacer los nudos con un cordel propio es el intento —y repetido, lo que muestra la atracción—, y «At home» es lo que lo pone fuera de la vista del tío.',
      C:
        'Sostiene solo la admiración. Describe la destreza del tío, y quien elige aquí confunde el objeto de la afirmación: el elogio es del narrador, pero la conducta que hay que probar es suya, no la del tío.',
      D:
        'Sostiene solo la evitación. La mentira sobre la luz prueba que rehúye la prueba delante de él, y no dice nada de que el oficio le atraiga; con esta cita sola, el narrador podría no tener el menor interés.',
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
        'Confirma que la máquina se difundió, que es el punto en el que Belmonte y la explicación por precio están de acuerdo. Un hallazgo que las dos partes esperan no distingue entre ellas.',
      B:
        'Habla de los incentivos del vendedor, no de a quién alcanzaba la venta. Que el agente ganara más vendiendo a plazos explica por qué insistía, y deja intacta la posibilidad de que quien compró lo hiciera porque el precio ya había bajado.',
      C:
        'Versión más amplia: que el plazo se extendiera a muebles, relojes y pianos habla del crédito en general y no de la máquina de coser ni de los hogares que no podían reunir la suma de golpe.',
      D:
        'Correcta: separa las dos causas en el tiempo —el plazo llega antes de que el precio caiga— y sitúa a los primeros compradores en la población exacta que describe Belmonte, la de ingresos que no habían subido.',
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
        'Correcta: es la única opción que pone las dos series una al lado de la otra. El gris multiplica por diez su cobertura al alejarse (3 % → 30 %) mientras el naranja se mueve ocho puntos (34 % → 26 %), y solo esa diferencia señala a una especie.',
      B:
        'Dato leído correctamente que no responde. El 30 % a 1.000 m está en la tabla, pero una sola casilla no puede mostrar que una especie responda y la otra no.',
      C:
        'Invierte las dos series: el naranja es el que apenas se mueve y el gris el que sube con la distancia. Es el error de quien lee las columnas cambiadas o se queda con el color más abundante.',
      D:
        'Generaliza las tres primeras filas y falla en la cuarta: a 1.000 m el gris cubre el 30 % y el naranja el 26 %. Quien la elige deja de leer la tabla cuando el patrón ya le parece claro.',
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
        'Explica la familiaridad con una confusión de identidad. No se sostiene: para acertar la habitación de su infancia y el té de su abuela haría falta conocerla a ella, y confundirla con otro huésped no da ninguna de las dos cosas.',
      B:
        'Convierte en costumbre de la casa lo que el texto marca dos veces como excepción, con «which she had not asked for» y «she had not mentioned that either». El texto no atribuye a nadie más ese trato.',
      C:
        'Correcta: hace de desconocido —le pide el nombre deletreado, y dos veces— y a la vez acierta la habitación en la que ella dormía de niña y el té de su abuela sin que ella pida ninguna de las dos cosas. Lo único que junta ambas conductas es que la reconoció y calló.',
      D:
        'Inventa un aviso previo del que el texto no da rastro y que además choca con la escena: quien ha sido avisado de la llegada de Nadia no necesita hacerle deletrear su nombre dos veces para escribirlo.',
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
        'Aplica la regla al revés. Si el suelo hubiera estado helado todo el año, el agua no habría atravesado la roca y la columna no habría crecido; el texto dice que creció sin interrupción durante esos 21.000 años.',
      B:
        'Correcta: sale de cruzar la regla de la primera oración —sin agua líquida que atraviese la roca no hay depósito— con el caso de la tercera, una cueva cuyo suelo hoy no se deshiela por debajo del primer metro y que sin embargo registró depósito continuo.',
      C:
        'Se sigue de un solo dato y es una paráfrasis, no una inferencia: el texto ya dice que el depósito cesó. Además responde por el periodo equivocado, el posterior al crecimiento y no aquel por el que pregunta el enunciado.',
      D:
        'Extiende a todo el norte de Siberia lo que el texto solo autoriza a decir del terreno situado sobre una cueva: el equipo dató una columna en una cueva, y el texto no ofrece ningún otro punto.',
    },
    fuenteHecho:
      'Método real de paleoclimatología (los espeleotemas solo crecen con agua de infiltración líquida, y su crecimiento indica retroceso del permafrost); cueva, equipo y fechas inventados.',
  },
]
