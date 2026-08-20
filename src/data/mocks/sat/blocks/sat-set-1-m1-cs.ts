import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/**
 * Bloque Craft and Structure del módulo `sat-set-1-m1` — ítems q01 a q08.
 *
 * Plan: docs/sat-planes/sat-set-1-m1.md (filas 1-8). Textos: docs/sat-planes/
 * sat-set-1-m1-textos-cs.md, copiados literalmente, sin una coma cambiada.
 *
 * Las claves son las del plan y no se negocian ítem a ítem: B, D, A, C, A, B, D, C.
 * El reparto de letras se defiende a nivel de módulo, así que mover una sola aquí
 * rompe la puerta 1 en el otro extremo del examen, donde ya nadie la va a mirar.
 */

export const items: MCQQuestion[] = [
  {
    id: 'q01',
    type: 'mcq',
    part: 1,
    stimulus:
      'Salt marshes look bare from a distance, but few habitats produce more life. Twice a day the tide floods the grass with seawater and leaves behind mud full of decaying plants. That mud feeds crabs, worms, and snails, which in turn feed fish and wading birds. A single hectare of marsh ______ thousands of these animals, far more than the same area of open, sandy coast. In one plot no larger than a classroom, biologists counted sixty species.',
    text: 'Which choice completes the text with the most logical and precise word?',
    options: [
      'shelters',
      'sustains',
      'attracts',
      'tolerates',
    ],
    answer: 1,
  },
  {
    id: 'q02',
    type: 'mcq',
    part: 1,
    stimulus:
      'The bakery ______ at the top of the hill. From its door Rosalía could see the whole town. Each morning at six she rang the brass bell above the counter, though the bell was not really needed. Then she leaned out and called that the first loaves were ready. Her voice carried farther than the bell did. Families in the lanes below could not see the bakery, but they heard her, and one by one they started up the hill.',
    text: 'Which choice completes the text with the most logical and precise word?',
    options: [
      'loomed',
      'sprawled',
      'huddled',
      'perched',
    ],
    answer: 3,
  },
  {
    id: 'q03',
    type: 'mcq',
    part: 1,
    stimulus:
      "When the council of the river port of Elmsford met in 1889 to consider a filtration plant, the three engineers it had hired did not simply approve the design. They agreed that beds of sand would remove most of what made the river water ______, but they warned that those beds would clog within a year unless the town also built a settling basin upstream, and they declined to sign until the basin appeared in the budget. Historians who read the engineers' report as an endorsement therefore miss its tone. Their support was qualified, and the council knew it.",
    text: 'Which choice completes the text with the most logical and precise word?',
    options: [
      'murky',
      'brackish',
      'tepid',
      'overcast',
    ],
    answer: 0,
  },
  {
    id: 'q04',
    type: 'mcq',
    part: 1,
    stimulus:
      "Critics who praise the economy of Hanne Lindqvist's late woodcuts often mistake what they are praising. Her final prints contain a fraction of the lines of the crowded harbor scenes that made her name: a gull, a mast, and the edge of a wave may be all that remains, and yet the scene reads at once. This was not a matter of working faster. Her notebooks record that one late print occupied her for four months, most of that time spent deciding which of thirty marks to cut away. She would not state what the eye could be trusted to supply.",
    text: 'As used in the text, what does the word "state" most nearly mean?',
    options: [
      'Declare',
      'Concede',
      'Render',
      'Report',
    ],
    answer: 2,
  },
  {
    id: 'q05',
    type: 'mcq',
    part: 1,
    stimulus:
      'Amara had planned the walk to the lighthouse the way she planned everything, on paper and well in advance. She knew the distance, the hours of the tide, and the time the keeper unlocked the door for visitors. She had even packed a second pair of socks. Then the path ended at a stream that no map of hers showed. For a long minute she stood on the bank with the tide table in her hand, and the paper told her nothing at all. She put it away and looked, for the first time that morning, at the land itself.',
    text: 'Which choice best states the function of the sentence "She had even packed a second pair of socks." in the text?',
    options: [
      "It adds to Amara's preparations one she packed rather than looked up.",
      'It shows Amara providing in advance for the crossing that lay ahead.',
      'It admits a first note of doubt into a morning Amara had settled in advance.',
      "It turns Amara's planning from the hours of the day to the weather.",
    ],
    answer: 0,
  },
  {
    id: 'q06',
    type: 'mcq',
    part: 1,
    stimulus:
      'For part of each year, rain turns wide stretches of the Amazon lowlands into flooded forest, and the water stands deep enough for fish to swim among the trunks. Botanists working there noticed that seedlings of one palm were rising far from any adult tree, on ground that no current could have reached. Drifting fruit could not explain the pattern, so the team proposed that fish were eating the fruit and depositing the seeds elsewhere. To test the idea, they netted fish during the flood, examined the stomachs of more than four hundred, and planted every intact seed they recovered. Roughly a quarter of those seeds sprouted.',
    text: 'Which choice best describes the overall structure of the text?',
    options: [
      'It describes a habitat, reports a pattern found there, sets out two causes for it, and ends with the one the evidence favors.',
      'It describes a habitat, reports a pattern found there, sets out a cause proposed for it, and ends with a test of that cause.',
      'It describes a habitat, reports a pattern found there, sets out the fieldwork that followed, and ends with the cause it points to.',
      'It describes a habitat, reports a pattern found there, sets out the fieldwork that followed, and ends with how often the pattern occurs.',
    ],
    answer: 1,
  },
  {
    id: 'q07',
    type: 'mcq',
    part: 1,
    stimulus:
      'The spread of reading in the northern provinces during the eighteenth century has usually been credited to the schools: parish records show that the number of village schoolmasters tripled between 1720 and 1790, and literacy, measured by signatures on marriage contracts, rose along with it. A second group of historians has questioned the direction of that relationship. The villages that gained schools, they note, were also the villages where merchants began keeping written accounts and where paper first became cheap; the schools may therefore record a demand for reading rather than create it. The objection is a fair one, but narrower than its authors allow: it fits the market towns their evidence comes from, and it says little about the upland parishes, where schools arrived long before commerce did.',
    text: 'Which choice best describes the function of the final sentence of the text?',
    options: [
      'It accepts the objection as sound and extends it to the upland parishes its authors left out.',
      'It accepts the objection as sound and drops the schools explanation it was aimed at.',
      'It doubts the evidence behind the objection and restores the village schools account of literacy.',
      'It accepts the objection as sound and limits it to the market towns its authors studied.',
    ],
    answer: 3,
  },
  {
    id: 'q08',
    type: 'mcq',
    part: 1,
    stimulus:
      'Text 1\n\nSongbirds in cities sing at a higher pitch than members of the same species in nearby woodland. Traffic noise sits at low frequencies, so a song pitched above it carries through the din unmasked. Having tracked one urban population for thirty years, researchers argue that the shift is an adaptation: males whose songs rise clear of the traffic are the ones that attract mates, and the population has changed accordingly.\n\nText 2\n\nThat city birds sing higher is not in doubt; the explanation is. Birds raise their volume in noise, and in songbirds pitch and loudness come from the same set of muscles, so lifting one lifts the other. The urban songs on record are also the loudest, and their added pitch is about what that mechanical link predicts. Nothing needs to evolve to produce a change a bird can make within an afternoon.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the explanation offered in Text 1 for the higher pitch of urban song?',
    options: [
      'By accepting the pattern but crediting the higher pitch to birds lifting their songs clear of the traffic.',
      'By accepting the pattern but crediting the higher pitch to young birds copying the loudest singers nearby.',
      'By accepting the pattern but crediting the higher pitch to the extra volume that noise draws from them.',
      'By accepting the pattern but crediting the higher pitch to the loudest songs being the ones on record.',
    ],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  {
    id: 'q01',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 1,
    tema: 'ciencia',
    razones: {
      A:
        'Es la opción que más se parece a lo que hace una marisma en la cabeza de cualquiera: dar cobijo. El texto, sin embargo, no menciona ni una vez refugio, escondite ni protección. Todo lo que describe es una cadena de comida —el barro «full of decaying plants» alimenta a cangrejos, gusanos y caracoles, y estos a peces y aves—, y es esa cadena la que sostiene la comparación con la costa arenosa.',
      B:
        'Correcta: las dos oraciones previas encadenan «That mud feeds crabs, worms, and snails, which in turn feed fish and wading birds», de modo que lo que la hectárea pone es comida. Sustain nombra exactamente eso —mantener con alimento a lo que ya vive allí— y es lo único que explica por qué la marisma da «far more than the same area of open, sandy coast».',
      C:
        'Atraer supone que los animales vienen de otro sitio, y el pasaje nunca los mueve: los cuenta donde están. Además la comparación es de densidad —una hectárea de marisma frente a una de arena—, no de atractivo; en una parcela «no larger than a classroom» los biólogos «counted sixty species», que es censo, no llamada.',
      D:
        'Tolerar convierte a los animales en una carga que la marisma aguanta, y eso invierte la dirección del párrafo: aquí la marisma no soporta nada a su pesar, produce el barro del que todo lo demás come. La mera tolerancia tampoco explicaría la cifra, porque la costa arenosa también los toleraría y sostiene muchos menos.',
    },
    fuenteHecho:
      'Hecho libre de ecología general (productividad de las marismas salobres); cifras y redacción originales.',
  },
  {
    id: 'q02',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 1,
    tema: 'literatura',
    razones: {
      A:
        'Loom es aparecer grande y amenazante ante quien mira, y el texto cierra esa puerta en la última línea: «Families in the lanes below could not see the bakery». Lo que no se ve no puede cernerse sobre nadie. Es la opción de quien lee «at the top of the hill», se imagina la escena desde abajo y no comprueba qué ve el de abajo.',
      B:
        'Sprawl pide extensión: algo que se desparrama por el terreno. La panadería del pasaje es un local de una puerta y un mostrador con una campana de latón encima, y ocupa un punto —«at the top»—, no una superficie. Nada en el texto le da tamaño; lo único que se extiende es la voz de Rosalía, que «carried farther than the bell did».',
      C:
        'Huddle es apretarse junto a otros, y el texto coloca a la panadería sola y por encima de todo lo demás: desde su puerta se ve «the whole town», y el pueblo queda «below», en unas callejuelas por las que hay que subir. Un edificio arracimado con otros no tendría esa vista ni obligaría a nadie a empezar la cuesta.',
      D:
        'Correcta: perch nombra algo pequeño asentado en una altura, y es lo único que sostiene a la vez las tres cosas que dice el texto —que desde su puerta se ve el pueblo entero, que el pueblo queda «below», y que desde abajo no se la ve—. La altura es del cerro y la panadería está encima: eso es estar encaramada.',
    },
    fuenteHecho:
      'Ficción original; ningún hecho real implicado.',
  },
  {
    id: 'q03',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 2,
    tema: 'historia',
    razones: {
      A:
        'Correcta: lo que hay que quitar del agua se retira con «beds of sand», y esos lechos «would clog within a year». Lo que atasca un lecho de arena es materia sólida en suspensión, y agua con materia en suspensión es agua turbia. Por eso mismo los ingenieros exigen «a settling basin upstream»: primero se decanta lo que enturbia, y luego se filtra lo que queda.',
      B:
        'Brackish es salobre, y la sal no es sólido en suspensión: atraviesa un lecho de arena sin dejar nada y sin atascarlo, así que no explicaría la advertencia del párrafo. El texto además sitúa el puerto en un río, y no menciona mar, marea ni estuario en ninguna línea.',
      C:
        'Tepid es una temperatura. Ningún lecho de arena calienta ni enfría el agua que lo cruza, de modo que la opción no encaja con el único mecanismo que el párrafo describe. Es la elección de quien busca un adjetivo que suene a agua sin comprobar qué hace con él la máquina que el texto está discutiendo.',
      D:
        'Overcast describe un cielo, no un líquido, y llega aquí por el camino más corto: es la traducción de manual de «nublado». El adjetivo del hueco cuelga de «the river water», y en todo el pasaje no hay tiempo atmosférico de ninguna clase — hay un concejo, tres ingenieros, un presupuesto y un río.',
    },
    fuenteHecho:
      'Hecho libre de historia de la ingeniería sanitaria (filtros lentos de arena, siglo XIX); ciudad, fecha e informe inventados.',
  },
  {
    id: 'q04',
    domain: 'CS',
    tipo: 'words-in-context',
    dificultad: 3,
    tema: 'humanidades',
    razones: {
      A:
        'Aplica la acepción de diccionario, la de anunciar o afirmar en voz alta. Pide una proposición detrás del verbo, y lo que va detrás es «what the eye could be trusted to supply», las marcas que la artista retira: en el pasaje nadie declara nada, se decide «which of thirty marks to cut away».',
      B:
        'Trae el pleito de la primera oración —los críticos que «mistake what they are praising»— y convierte la negativa en una postura de debate: no les daría la razón. Conceder exige disputa e interlocutor, y esta oración no mira a los críticos, mira la plancha.',
      C:
        'Correcta: state nombra aquí el acto de ponerlo en la estampa. De treinta marcas retira las que «the eye could be trusted to supply», y con «a gull, a mast, and the edge of a wave» la escena todavía «reads at once»: lo que se niega a hacer es representar eso que el ojo pone solo.',
      D:
        'Le pasa al verbo el trabajo que en el pasaje hacen los cuadernos —«Her notebooks record that…»—, el de dar cuenta de un hecho. Report supone destinatario y noticia que transmitir; aquí no hay dato que comunicar, sino un trazo que se talla o se deja fuera.',
    },
    fuenteHecho:
      'Ficción original; la grabadora Hanne Lindqvist es inventada y el vocabulario de la xilografía se explica dentro del texto.',
  },
  {
    id: 'q05',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 1,
    tema: 'literatura',
    razones: {
      A:
        'Correcta: la oración cierra el inventario de lo que Amara había dispuesto y le añade algo de otra especie. Lo anterior lo sabe —«She knew the distance, the hours of the tide, and the time the keeper unlocked the door for visitors»—; los calcetines no se saben, se empacan, y con ellos la previsión pasa del dato al equipaje.',
      B:
        'Lee la oración hacia adelante y la vuelve anuncio del arroyo: los calcetines serían para el vadeo. El texto lo impide dos veces: el arroyo no salía en ningún mapa suyo, así que no pudo preverlo, y nadie cruza nada —guarda el papel y se pone a mirar el terreno—.',
      C:
        'Toma el «even» por una grieta en la seguridad de Amara y le atribuye una duda. Hasta el arroyo el texto la muestra fiándose del papel sin reservas, «on paper and well in advance»; la única vacilación llega después, «for a long minute», ya en la orilla.',
      D:
        'Salta de los calcetines al clima, como si la previsión cambiara de asunto. En el pasaje no hay tiempo atmosférico de ninguna clase: lo que se enumera antes son la distancia, las horas de la marea y la hora en que el farero abre la puerta.',
    },
    fuenteHecho:
      'Ficción original; la tabla de mareas queda explicada dentro del texto.',
  },
  {
    id: 'q06',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 2,
    tema: 'ciencia',
    razones: {
      A:
        'Toma el inciso de la fruta a la deriva —«Drifting fruit could not explain the pattern»— por la primera de dos causas sopesadas, y el trabajo de campo por el árbitro entre las dos. El texto descarta esa idea antes de recoger un solo dato y por un argumento, no por una prueba: las plántulas salían «on ground that no current could have reached». Las redes, los cuatrocientos estómagos y la siembra examinan solo la hipótesis de los peces, así que nunca hay dos causas compareciendo ante la misma evidencia.',
      B:
        'Correcta: el texto va del bosque inundado a lo que los botánicos observan allí —plántulas «far from any adult tree»—, de ahí a la causa que el equipo propone —«the team proposed that fish were eating the fruit and depositing the seeds elsewhere»— y acaba en la comprobación que esa causa pide: «To test the idea, they netted fish during the flood…», con los estómagos examinados y el cuarto de semillas germinadas.',
      C:
        'Invierte los dos últimos movimientos y coloca el trabajo de campo antes que la hipótesis, como si la idea de los peces fuese la conclusión que dejaron las redes. El texto la sitúa antes y convierte el campo en su prueba: «so the team proposed…» y después «To test the idea». Además el texto no termina en una causa, sino en un dato —«Roughly a quarter of those seeds sprouted»—.',
      D:
        'Lee el «roughly a quarter» como una medida de con qué frecuencia ocurre el fenómeno, y de paso adelanta el trabajo de campo al puesto de la hipótesis. Esa cuarta parte no cuenta cuántas veces los peces dispersan semillas: es la proporción de las semillas recuperadas de los estómagos que germinó una vez sembrada, el resultado de la prueba y no un censo del patrón.',
    },
    fuenteHecho:
      'Hecho libre y documentado: ictiocoria en la llanura amazónica inundable; palmera, equipo y cifras inventados.',
  },
  {
    id: 'q07',
    domain: 'CS',
    tipo: 'text-structure-purpose',
    dificultad: 3,
    tema: 'historia',
    razones: {
      A:
        'Recoge la concesión —«The objection is a fair one»— y luego invierte la dirección de «narrower than its authors allow»: entiende que el autor la lleva más lejos que sus propios autores. El texto hace justo lo contrario, y las parroquias de montaña son donde la objeción no alcanza.',
      B:
        'Lee «a fair one» como una rendición completa y se detiene ahí. Si el autor abandonara la explicación de las escuelas, no tendría por qué recordar que en las tierras altas «schools arrived long before commerce did».',
      C:
        'Confunde «narrower» con «weaker» y entiende que lo que el autor discute es la calidad de las pruebas. No las discute: las da por buenas —«the market towns their evidence comes from»— y solo dice hasta dónde alcanzan, que es cosa distinta.',
      D:
        'Correcta: concede —«The objection is a fair one»— y acto seguido recorta el terreno: vale para «the market towns their evidence comes from» y no para las parroquias de montaña, donde las escuelas llegaron antes que el comercio.',
    },
    fuenteHecho:
      'Método real de historia social (alfabetización medida por firmas en registros parroquiales) y debate historiográfico genuino; región, fechas y serie inventadas.',
  },
  {
    id: 'q08',
    domain: 'CS',
    tipo: 'cross-text-connections',
    dificultad: 3,
    tema: 'ciencia',
    razones: {
      A:
        'Se queda con la lógica del texto 1 —un canto por encima del tráfico «carries through the din unmasked»— y la convierte en un ajuste deliberado del ave: subiría el tono para librarse del ruido. El texto 2 no dice que apunte más alto, dice que sube el volumen y que el tono va detrás, «so lifting one lifts the other»: el tono no se busca, se arrastra.',
      B:
        'Sustituye el mecanismo por aprendizaje: los jóvenes copiarían a los vecinos más ruidosos. Es la explicación cultural que el estudiante trae de fuera; el texto 2 se apoya en anatomía —«pitch and loudness come from the same set of muscles»— y no menciona imitación ni modelo del que aprender.',
      C:
        'Correcta: concede el hecho —«That city birds sing higher is not in doubt»— y lo carga al volumen. En el ruido las aves cantan más fuerte, y como tono y volumen salen de la misma musculatura el tono sube con él; por eso «the urban songs on record are also the loudest» y el tono añadido «is about what that mechanical link predicts».',
      D:
        'Convierte en sesgo de muestreo lo que el texto 2 usa como prueba a favor: las grabaciones urbanas le sirven precisamente porque son las más fuertes y su tono es el que predice el vínculo mecánico. Si fueran un artefacto de la muestra, se quedaría sin el dato que sostiene su explicación.',
    },
    fuenteHecho:
      'Debate científico real: canto agudo urbano como adaptación frente al efecto Lombard; treinta años de seguimiento y redacción originales.',
  },
]
