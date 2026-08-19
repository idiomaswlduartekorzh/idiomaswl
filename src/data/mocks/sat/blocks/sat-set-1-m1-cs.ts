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
      'Salt marshes look bare from a distance, but few habitats produce more life. Twice a day the tide floods the grass with seawater and leaves behind mud full of decaying plants. That mud feeds crabs, worms, and snails, which in turn feed fish and wading birds. A single hectare of marsh supports thousands of these animals, far more than the same area of open, sandy coast. In one plot no larger than a classroom, biologists counted sixty species.',
    text: 'As used in the text, what does the word "supports" most nearly mean?',
    options: [
      'Bolsters',
      'Nourishes',
      'Endorses',
      'Withstands',
    ],
    answer: 1,
  },
  {
    id: 'q02',
    type: 'mcq',
    part: 1,
    stimulus:
      'The bakery stood at the top of the hill. From its door Rosalía could see the whole town. Each morning at six she rang the brass bell above the counter, though the bell was not really needed. Then she leaned out and called that the first loaves were ready. Her voice carried farther than the bell did. Families in the lanes below could not see the bakery, but they heard her, and one by one they started up the hill.',
    text: 'As used in the text, what does the word "stood" most nearly mean?',
    options: [
      'Towered',
      'Ranked',
      'Remained',
      'Perched',
    ],
    answer: 3,
  },
  {
    id: 'q03',
    type: 'mcq',
    part: 1,
    stimulus:
      "When the council of the river port of Elmsford met in 1889 to consider a filtration plant, the three engineers it had hired did not simply approve the design. They agreed that beds of sand would remove most of what made the river water cloudy, but they warned that those beds would clog within a year unless the town also built a settling basin upstream, and they declined to sign until the basin appeared in the budget. Historians who read the engineers' report as an endorsement therefore miss its tone. Their support was qualified, and the council knew it.",
    text: 'As used in the text, what does the word "qualified" most nearly mean?',
    options: [
      'Conditional',
      'Credentialed',
      'Enthusiastic',
      'Unanimous',
    ],
    answer: 0,
  },
  {
    id: 'q04',
    type: 'mcq',
    part: 1,
    stimulus:
      "Critics who praise the economy of Hanne Lindqvist's late woodcuts often mistake what they are praising. Her final prints contain a fraction of the lines of the crowded harbor scenes that made her name: a gull, a mast, and the edge of a wave may be all that remains, and yet the scene reads at once. This was not a matter of working faster. Her notebooks record that one late print occupied her for four months, most of that time spent deciding which of thirty marks to cut away. She would not state what the eye could be trusted to supply.",
    text: 'As used in the text, what does the word "economy" most nearly mean?',
    options: [
      'Dispatch',
      'Proportion',
      'Restraint',
      'Commerce',
    ],
    answer: 2,
  },
  {
    id: 'q05',
    type: 'mcq',
    part: 1,
    stimulus:
      'Amara had planned the walk to the lighthouse the way she planned everything, on paper and well in advance. She knew the distance, the hours of the tide, and the time the keeper unlocked the door for visitors. She had even packed a second pair of socks. Then the path ended at a stream that no map of hers showed. For a long minute she stood on the bank with the tide table in her hand, and the paper told her nothing at all. She put it away and looked, for the first time that morning, at the land itself.',
    text: 'Which choice best states the function of the sentence "Then the path ended at a stream that no map of hers showed." in the text as a whole?',
    options: [
      'It marks the point where everything Amara planned on paper stops being of use.',
      "It marks the point where Amara's walk to the lighthouse comes to an end.",
      'It explains why Amara had packed a second pair of socks before setting out.',
      'It reveals the mistake Amara made in reading the tide table she carried in her hand.',
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
      'It describes a flooded forest, names the animals that live there, and explains what they do.',
      'It reports a pattern no one had explained, proposes a cause, and describes how it was tested.',
      'It sets out the fieldwork the botanists did, counts the seeds they planted, and questions the result.',
      'It reviews an accepted explanation, presents the evidence against it, and offers a replacement.',
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
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1 that the higher pitch of urban song is an adaptation?',
    options: [
      'By accepting the pattern but crediting the higher pitch to selection acting on loudness.',
      'By accepting the pattern but crediting the higher pitch to young birds copying loud neighbors.',
      'By accepting the pattern but crediting the higher pitch to louder singing in noise.',
      'By accepting the pattern but crediting the higher pitch to bias in which songs were recorded.',
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
        'Lee support por su sinónimo más frecuente de tesauro, el de reforzar lo que ya se sostiene: bolster apuntala una moneda, un argumento o una población que flaquea, y da por supuesto un antes y un después que aquí no existe. La marisma no refuerza a esos animales: es de donde salen.',
      B:
        'Correcta: las dos oraciones previas encadenan «That mud feeds crabs, worms, and snails, which in turn feed fish and wading birds», de modo que lo que la hectárea pone es comida y por eso sostiene «far more than the same area of open, sandy coast».',
      C:
        'Acepción de respaldar una opinión o una propuesta. Pide como complemento algo suscribible —un plan, una candidatura—, y en el pasaje no hay nadie que opine ni nada que aprobar: solo marea, barro y una cadena alimentaria.',
      D:
        'Aplica la acepción de aguantar o resistir, support como bear: la marisma soportaría a esos animales como quien soporta una carga. Invierte la dirección del pasaje, donde los animales no pesan sobre la marisma sino que viven de lo que ella produce.',
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
        'Lee stood como «alzarse»: la panadería descollaría sobre el pueblo. Es la acepción física más vistosa del verbo, y el texto no la sostiene —no da al edificio ni una línea de altura ni de tamaño—: lo alto es el cerro, y lo único que se levanta por encima del pueblo es su voz, que «carried farther than the bell did».',
      B:
        'Procesa la colocación «stood at the top of», la de las clasificaciones —«she stood at the top of her class»—, y lee un puesto donde hay un sitio. Detrás de la preposición va «the hill», un lugar que el pasaje mide en distancia y en cuesta: las familias quedan «below» y suben, no figuran por debajo en una lista.',
      C:
        'Acepción de seguir en pie, la de «the offer still stands», y en español la que empuja «la panadería seguía en pie»: el verbo hablaría de permanencia. Para eso el texto tendría que medir tiempo, y su único reloj es una rutina de un día —«Each morning at six»—; nadie dice cuánto lleva el local ahí ni que algo lo amenace.',
      D:
        'Correcta: stood aquí sitúa, y el pasaje entero depende de dónde está la panadería —desde su puerta se ve «the whole town», las familias de «the lanes below» no la ven, y para llegar «they started up the hill»—. El verbo dice que ocupaba ese punto en lo alto del cerro, nada más.',
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
        'Correcta: los ingenieros pusieron una condición —la balsa de decantación— y «declined to sign until the basin appeared in the budget»; el apoyo iba con reservas.',
      B:
        'Acepción de diccionario más frecuente, titulado o competente, que además encaja en la frase; pero describiría a los ingenieros, y el sujeto de la oración es su apoyo.',
      C:
        'Se queda con la primera mitad del párrafo, donde los filtros de arena sí funcionan, e ignora la advertencia y el aviso de que leerlo como respaldo pierde el tono.',
      D:
        'La proposición es verdadera: el texto sostiene que los tres coincidieron —«They agreed… they warned… they declined»—, y quien la elige la reconoce en el pasaje. Falla como glosa de la palabra: «qualified» dice de qué clase era el apoyo, no cuántos lo suscribían.',
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
        'Lee economy como la prontitud con que se ejecuta la obra, la acepción de economía de esfuerzo; el texto la desmiente con todas las letras —«This was not a matter of working faster»— y añade los cuatro meses que le ocupó una sola estampa.',
      B:
        'Acepción crítica real de economy, la disposición y el equilibrio de las partes de una obra, y la refuerza la lista «a gull, a mast, and the edge of a wave»; pero el texto cuenta cuántas de las treinta marcas retira, no dónde reparte las que deja.',
      C:
        'Correcta: de treinta marcas retira las que el ojo puede suplir y la escena aún «reads at once»; «She would not state what the eye could be trusted to supply» nombra exactamente eso, lo que la artista se niega a poner.',
      D:
        'Toma la acepción más frecuente del sustantivo suelto —la economía como comercio, el mercado de las estampas—, que además es la primera que ofrece el español «economía». En el pasaje no hay precios ni compradores: solo marcas sobre la plancha y la decisión de retirarlas.',
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
        'Correcta: es el giro. Antes, tres oraciones de preparación —la distancia, las horas de la marea, los calcetines de repuesto—; a partir de esta, «the paper told her nothing at all» y Amara mira «the land itself».',
      B:
        'Toma «the path ended» al pie de la letra y da por terminada la caminata. Lo que se acaba es el sendero, no el paseo: Amara guarda el papel y se pone a mirar el terreno, que es lo que hace quien sigue buscando por dónde pasar.',
      C:
        'Confunde función con causa, y además la busca hacia atrás. Los calcetines de repuesto están en el texto, pero se empacaron antes y esta oración no explica por qué: la pregunta es qué hace la oración, no qué motivó lo anterior.',
      D:
        'Traslada el fallo a Amara: habría leído mal la tabla de mareas. No hay ningún error de lectura —lo que falta es el arroyo en el mapa—, y por eso el papel, correcto y todo, deja de servirle.',
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
        'Se queda en la primera oración, la del bosque inundado, y toma el escenario por el asunto. El texto no cataloga fauna: el único animal que aparece son los peces, y aparecen como transportistas de semillas, no como habitantes que se enumeren.',
      B:
        'Correcta: plántulas donde ninguna corriente llega y una fruta a la deriva que no explica nada, hipótesis de los peces, y comprobación con redes, cuatrocientos estómagos y un cuarto de las semillas germinadas. En ese orden.',
      C:
        'Describe con exactitud las dos últimas oraciones —redes, estómagos, siembra— y las presenta como el texto entero, dejando fuera el enigma y la hipótesis que las provocaron; y nadie pone en duda el resultado: las semillas germinaron y ahí acaba.',
      D:
        'Infla un inciso —la fruta a la deriva no explicaba el patrón— hasta volverlo una explicación asentada con partidarios. Nadie defiende esa idea en el texto, no se aporta prueba en contra y no hay a quién refutar.',
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
        'Conserva la selección natural y solo le cambia el rasgo: actuaría sobre el volumen en vez de sobre el tono. El texto 2 cierra negando toda evolución —«Nothing needs to evolve to produce a change a bird can make within an afternoon»—, sea cual sea el rasgo.',
      B:
        'Sustituye el mecanismo por aprendizaje cultural —los jóvenes copiarían a los vecinos más ruidosos—, que es la explicación que el estudiante trae de fuera. El texto 2 no habla de imitación sino de anatomía: «pitch and loudness come from the same set of muscles».',
      C:
        'Correcta: concede el hecho —«That city birds sing higher is not in doubt»— y lo atribuye a que en el ruido las aves cantan más fuerte; como tono y volumen salen de la misma musculatura, el tono sube con el volumen, y el aumento medido «is about what that mechanical link predicts».',
      D:
        'Se agarra a «The urban songs on record» y convierte las grabaciones en un sesgo de muestreo. El texto 2 las usa como prueba a favor de su propia explicación —son las más fuertes y su tono es el que predice el vínculo mecánico—, no como un artefacto que invalide la medición.',
    },
    fuenteHecho:
      'Debate científico real: canto agudo urbano como adaptación frente al efecto Lombard; treinta años de seguimiento y redacción originales.',
  },
]
