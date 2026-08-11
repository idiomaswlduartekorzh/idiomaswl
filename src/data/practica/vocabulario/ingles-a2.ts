import type { Colocacion, VocabEntry, VocabLevel } from './schema'

/**
 * Inglés A2 · núcleo productivo.
 *
 * Fase 2 del loop. El material se midió ANTES de escribir —la lección que dejó A1— y el
 * resultado está en docs/vocabulario-loop.md §3: 159 turnos de escucha más 87 frases de
 * lectura, 246 para 350 palabras. Da menos por palabra que A1, así que habrá redactados; pero
 * no en todos los bloques, y este es la prueba.
 *
 * La serie del nivel es **Sam's Corner**: Maya alquila el local vacío de su abuelo y lo monta
 * como cafetería. Eso decide qué temas se surten solos y cuáles no. Casa, barrio y convivencia
 * es el mejor servido de los diez —14 de 15 candidatas sobrevivieron a abrir la frase— porque
 * la historia trata literalmente de eso: el alquiler, la llave, las tuberías, los vecinos.
 *
 * Regla que manda sobre todas las demás en A2: **una palabra vive en un solo nivel**. Doce
 * candidatas obvias se cayeron por estar ya en A1 —`flat`, `wall`, `floor`, `window`, `door`,
 * `kitchen`, `shelf`, `clean`, `paint`, `quiet`, `sign`, `owner`— y se sustituyeron por otras
 * del mismo tema que el corpus también dice.
 *
 * Comprobable palabra por palabra:
 *
 *   node scripts/vocab-corpus-index.mjs --lang ingles --level a2 --find "plumber"
 */

const SERIE = 'Sam’s Corner'

const c = (chunk: string, es: string): Colocacion => ({ chunk, es })

type Tipo = { tipo: 'sustantivo' } | { tipo: 'verbo'; phrasal?: string[] } | { tipo: 'otro' }
type FuenteCorta =
  | { target: string; es: string; episodio: number }
  | { target: string; es: string; lectura: string }
  | { target: string; es: string; motivo: string }

const en = (
  id: string,
  lemma: string,
  es: string,
  pos: VocabEntry['pos'],
  acento: string,
  colocaciones: Colocacion[],
  ejemplo: FuenteCorta,
  extra: Tipo,
  registro: 'neutro' | 'formal' | 'informal' = 'neutro',
): VocabEntry => ({
  id,
  lemma,
  es,
  pos,
  ejemplo: {
    target: ejemplo.target,
    es: ejemplo.es,
    fuente:
      'episodio' in ejemplo
        ? { tipo: 'corpus', serie: SERIE, episodio: ejemplo.episodio }
        : 'lectura' in ejemplo
          ? { tipo: 'lectura', ejercicio: ejemplo.lectura }
          : { tipo: 'redactado', motivo: ejemplo.motivo },
  },
  extra: { lang: 'ingles', acento, registro, colocaciones, ...extra },
})

// ═══ BLOQUE 7 · Casa, barrio y convivencia ════════════════════════════════════
//
// Primer bloque de A2, y va antes que el 1 a propósito: es el mejor surtido de los diez, y
// abrir la fase por el que más se apoya en el material deja el motor probado antes de llegar
// a los que van a costar.
//
// **Treinta y cinco de treinta y cinco salen del material. Ni un redactado.** Es el segundo
// bloque de todo el proyecto que lo consigue, después del de rutina en A1, y por la misma
// razón: el tema es exactamente lo que la historia cuenta.
//
// Ningún episodio aporta más de cuatro entradas (11 %), muy por debajo del techo del 34 %.

// ─── Unidad 1 · El local y sus cosas ──────────────────────────────────────────

const b7unidad1: VocabEntry[] = [
  en('en-a2-001', 'rent', 'alquiler', 'sustantivo', 'rent',
    // Nada de «how much is the rent?»: es el ejemplo entero y deja la caja 5 sin salida.
    [c('pay the rent', 'pagar el alquiler'), c('the rent is low', 'el alquiler es bajo'), c('the rent takes half', 'el alquiler se lleva la mitad')],
    { target: 'How much is the rent?', es: '¿Cuánto es el alquiler?', episodio: 1 },
    { tipo: 'sustantivo' }),

  en('en-a2-002', 'key', 'llave', 'sustantivo', 'key',
    [c('the bakery key', 'la llave de la panadería'), c('lose the key', 'perder la llave'), c('keep the key', 'guardar la llave')],
    { target: 'A key? Is this the bakery key?', es: '¿Una llave? ¿Es la llave de la panadería?', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a2-003', 'lock', 'cerradura', 'sustantivo', 'lock',
    [c('the lock is new', 'la cerradura es nueva'), c('change the lock', 'cambiar la cerradura'), c('a broken lock', 'una cerradura rota')],
    { target: 'Did it work on this lock?', es: '¿Servía para esta cerradura?', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a2-004', 'pipe', 'tubería', 'sustantivo', 'pipe',
    [c('fix the pipes', 'arreglar las tuberías'), c('a broken pipe', 'una tubería rota'), c('the water pipes', 'las tuberías del agua')],
    { target: 'Did he fix the pipes?', es: '¿Arregló las tuberías?', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a2-005', 'fix', 'arreglar', 'verbo', 'fix',
    [c('fix the pipes', 'arreglar las tuberías'), c('fix it tomorrow', 'arreglarlo mañana'), c('nobody fixes it', 'nadie lo arregla')],
    { target: 'Did he fix the pipes?', es: '¿Arregló las tuberías?', episodio: 3 },
    { tipo: 'verbo' }),

  en('en-a2-006', 'plumber', 'fontanero / plomero', 'sustantivo', 'PLUM-ber',
    [c('call the plumber', 'llamar al fontanero'), c('the plumber comes back', 'el fontanero vuelve'), c('a good plumber', 'un buen fontanero')],
    { target: 'Did you call the plumber last night?', es: '¿Llamaste al fontanero anoche?', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a2-007', 'tile', 'baldosa / azulejo', 'sustantivo', 'tile',
    [c('clean every tile', 'limpiar cada baldosa'), c('the old tiles', 'las baldosas viejas'), c('sell tiles', 'vender baldosas')],
    { target: 'And the tiles?', es: '¿Y las baldosas?', episodio: 1 },
    { tipo: 'sustantivo' }),

  en('en-a2-008', 'machine', 'máquina', 'sustantivo', 'ma-CHINE',
    [c('the coffee machine', 'la máquina de café'), c('the machine works', 'la máquina funciona'), c('a washing machine', 'una lavadora')],
    { target: 'We haven’t tested the coffee machine yet.', es: 'Todavía no hemos probado la máquina de café.', episodio: 9 },
    { tipo: 'sustantivo' }),

  en('en-a2-009', 'test', 'probar', 'verbo', 'test',
    [c('test the machine', 'probar la máquina'), c('we have tested it', 'ya la hemos probado'), c('test a new plan', 'probar un plan nuevo')],
    { target: 'We haven’t tested the coffee machine yet.', es: 'Todavía no hemos probado la máquina de café.', episodio: 9 },
    { tipo: 'verbo' }),
]

// ─── Unidad 2 · Arreglar y mantener ───────────────────────────────────────────

const b7unidad2: VocabEntry[] = [
  en('en-a2-010', 'jar', 'bote / frasco', 'sustantivo', 'jar',
    [c('the money jar', 'el bote del dinero'), c('put it in the jar', 'meterlo en el bote'), c('an empty jar', 'un bote vacío')],
    { target: 'How much is in the jar?', es: '¿Cuánto hay en el bote?', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a2-011', 'towel', 'toalla', 'sustantivo', 'TOW-el',
    [c('two towels', 'dos toallas'), c('a clean towel', 'una toalla limpia'), c('bring a towel', 'trae una toalla')],
    { target: 'I was holding two towels and a bucket at the same time, and I was not laughing.', es: 'Yo sostenía dos toallas y un cubo a la vez, y no me estaba riendo.', episodio: 4 },
    { tipo: 'sustantivo' }),

  en('en-a2-012', 'wash', 'lavar', 'verbo', 'wash',
    [c('wash the cups', 'lavar las tazas'), c('wash your hands', 'lavarse las manos'), c('wash them before eight', 'lavarlas antes de las ocho')],
    { target: 'There are some plates, but there aren’t any clean cups. Somebody has to wash them before eight.', es: 'Hay platos, pero no hay tazas limpias. Alguien tiene que lavarlas antes de las ocho.', episodio: 10 },
    { tipo: 'verbo' }),

  en('en-a2-013', 'somebody', 'alguien', 'pronombre', 'SOME-bo-dy',
    [c('somebody has to wash them', 'alguien tiene que lavarlas'), c('somebody is waiting', 'hay alguien esperando'), c('somebody took it', 'alguien se lo llevó')],
    { target: 'There are some plates, but there aren’t any clean cups. Somebody has to wash them before eight.', es: 'Hay platos, pero no hay tazas limpias. Alguien tiene que lavarlas antes de las ocho.', episodio: 10 },
    { tipo: 'otro' }),

  en('en-a2-014', 'bill', 'factura', 'sustantivo', 'bill',
    [c('the water bill', 'la factura del agua'), c('pay the bill', 'pagar la factura'), c('a high bill', 'una factura alta')],
    { target: 'Less than the water bill. The bad news is that he comes back on Thursday morning.', es: 'Menos que la factura del agua. La mala noticia es que vuelve el jueves por la mañana.', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a2-015', 'light', 'luz', 'sustantivo', 'light',
    [c('the best light', 'la mejor luz'), c('the morning light', 'la luz de la mañana'), c('turn on the light', 'encender la luz')],
    { target: 'Near the window. That’s the best light in the whole shop, and the warmest corner in winter.', es: 'Junto a la ventana. Es la mejor luz de todo el local, y el rincón más cálido en invierno.', episodio: 6 },
    { tipo: 'sustantivo' }),

  en('en-a2-016', 'put', 'poner', 'verbo', 'put',
    [c('put it on the wall', 'ponerlo en la pared'), c('put the bags outside', 'sacar las bolsas'), c('put a list on the table', 'poner una lista en la mesa')],
    { target: 'Then we can put the story on the wall.', es: 'Entonces podemos poner la historia en la pared.', episodio: 2 },
    { tipo: 'verbo' }),

  en('en-a2-017', 'change', 'cambiar', 'verbo', 'change',
    [c('change the room', 'cambiar la sala'), c('change the prices', 'cambiar los precios'), c('another change is possible', 'puede haber otro cambio')],
    { target: 'Thank you. This will change the room.', es: 'Gracias. Esto va a cambiar la sala.', episodio: 8 },
    { tipo: 'verbo' }),

  en('en-a2-018', 'use', 'usar', 'verbo', 'use',
    [c('use the back room', 'usar la sala de atrás'), c('use a different route', 'usar otra ruta'), c('you can use it', 'puedes usarlo')],
    { target: 'And if it rains, we’ll use the back room.', es: 'Y si llueve, usamos la sala de atrás.', episodio: 19 },
    { tipo: 'verbo' }),
]

// ─── Unidad 3 · Los vecinos ───────────────────────────────────────────────────

const b7unidad3: VocabEntry[] = [
  en('en-a2-019', 'neighbour', 'vecino / vecina', 'sustantivo', 'NEIGH-bour',
    [c('hello neighbours', 'hola, vecinos'), c('a new neighbour', 'un vecino nuevo'), c('ask the neighbours', 'preguntar a los vecinos')],
    {
      target: 'Hello neighbours, we are getting the community garden ready for spring on Sunday, 14 April.',
      es: 'Hola, vecinos: el domingo 14 de abril preparamos el huerto comunitario para la primavera.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-020', 'community', 'comunidad / vecindario', 'sustantivo', 'com-MU-ni-ty',
    [c('the community garden', 'el huerto comunitario'), c('the community centre', 'el centro cívico'), c('local community support', 'el apoyo del barrio')],
    {
      target: 'Hello neighbours, we are getting the community garden ready for spring on Sunday, 14 April.',
      es: 'Hola, vecinos: el domingo 14 de abril preparamos el huerto comunitario para la primavera.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-021', 'resident', 'residente / vecino', 'sustantivo', 'RES-i-dent',
    [c('the residents’ group', 'la asociación de vecinos'), c('some residents said', 'algunos vecinos dijeron'), c('the residents of the street', 'los vecinos de la calle')],
    {
      target: 'The residents’ group would like to welcome them without making the first week too busy.',
      es: 'La asociación de vecinos quiere darles la bienvenida sin llenarles la primera semana.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-022', 'group', 'grupo', 'sustantivo', 'group',
    [c('the residents’ group', 'la asociación de vecinos'), c('a second group', 'un segundo grupo'), c('the group asks', 'el grupo pide')],
    {
      target: 'The residents’ group would like to welcome them without making the first week too busy.',
      es: 'La asociación de vecinos quiere darles la bienvenida sin llenarles la primera semana.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-023', 'volunteer', 'voluntario', 'sustantivo', 'vol-un-TEER',
    [c('four volunteers', 'cuatro voluntarios'), c('volunteers can choose', 'los voluntarios pueden elegir'), c('volunteer again', 'volver a ser voluntario')],
    { target: 'And we’ve found four volunteers for the weekends.', es: 'Y hemos encontrado cuatro voluntarios para los fines de semana.', episodio: 20 },
    { tipo: 'sustantivo' }),

  en('en-a2-024', 'everyone', 'todos / todo el mundo', 'pronombre', 'EV-ery-one',
    [c('hello everyone', 'hola a todos'), c('everyone can stay', 'todos pueden quedarse'), c('the group asks everyone', 'el grupo pide a todos')],
    {
      target: 'The class ends at eight, and everyone can stay for a short tasting session.',
      es: 'La clase termina a las ocho y todos pueden quedarse a una cata corta.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'otro' }),

  en('en-a2-025', 'nobody', 'nadie', 'pronombre', 'NO-bo-dy',
    [c('nobody comes', 'no viene nadie'), c('nobody rented it', 'nadie lo alquiló'), c('nobody said a word', 'nadie dijo una palabra')],
    { target: 'If nobody comes, we’ll still open on Sunday.', es: 'Si no viene nadie, abrimos igual el domingo.', episodio: 13 },
    { tipo: 'otro' }),

  en('en-a2-026', 'anyone', 'alguien / nadie', 'pronombre', 'AN-y-one',
    [c('has anyone said anything?', '¿alguien ha dicho algo?'), c('anyone with heavy bags', 'quien lleve bolsas pesadas'), c('before anyone tries it', 'antes de que nadie lo intente')],
    { target: 'Has anyone said anything bad?', es: '¿Alguien ha dicho algo malo?', episodio: 16 },
    { tipo: 'otro' }),

  en('en-a2-027', 'move', 'mudarse / mover', 'verbo', 'move',
    [c('move into a flat', 'mudarse a un piso'), c('move the tables inside', 'meter las mesas dentro'), c('he didn’t move', 'no se movió')],
    {
      target: 'Hello everyone, two families will move into Maple Court next month.',
      es: 'Hola a todos: el mes que viene se mudan dos familias a Maple Court.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'verbo' }),
]

// ─── Unidad 4 · Convivir ──────────────────────────────────────────────────────

const b7unidad4: VocabEntry[] = [
  en('en-a2-028', 'share', 'compartir', 'verbo', 'share',
    [c('the shared garden', 'el jardín compartido'), c('share a table', 'compartir mesa'), c('share the work', 'repartirse el trabajo')],
    {
      target: 'In the afternoon, volunteers can show the families the recycling room, the bus stop, and the shared garden.',
      es: 'Por la tarde, los voluntarios pueden enseñarles el cuarto del reciclaje, la parada del autobús y el jardín compartido.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'verbo' }),

  en('en-a2-029', 'lend', 'prestar', 'verbo', 'lend',
    [c('lend you twenty books', 'prestarte veinte libros'), c('lend tools', 'prestar herramientas'), c('can you lend me…?', '¿me prestas…?')],
    { target: 'The library will lend you twenty more books for the event.', es: 'La biblioteca os prestará veinte libros más para el evento.', episodio: 19 },
    { tipo: 'verbo' }),

  en('en-a2-030', 'borrow', 'pedir prestado', 'verbo', 'BOR-row',
    [c('borrow a player', 'coger prestado un reproductor'), c('borrow a book', 'sacar un libro'), c('can I borrow it?', '¿me lo prestas?')],
    {
      target: 'Visitors can borrow a small player at the entrance or download the guide before arriving.',
      es: 'Los visitantes pueden coger prestado un reproductor pequeño en la entrada o descargar la guía antes de llegar.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'verbo' }),

  en('en-a2-031', 'noise', 'ruido', 'sustantivo', 'noise',
    [c('I don’t miss the noise', 'no echo de menos el ruido'), c('too much noise', 'demasiado ruido'), c('the noise outside', 'el ruido de fuera')],
    { target: 'I miss having a fixed salary. I don’t miss the noise. Some months I earn less than before.', es: 'Echo de menos tener un sueldo fijo. No echo de menos el ruido. Algunos meses gano menos que antes.', episodio: 14 },
    { tipo: 'sustantivo' }),

  en('en-a2-032', 'outside', 'fuera', 'adverbio', 'out-SIDE',
    [c('waiting outside', 'esperando fuera'), c('put the bags outside', 'sacar las bolsas'), c('they’ll paint outside', 'pintarán fuera')],
    { target: 'Because somebody is always waiting outside. Somebody always was. I opened five minutes early for thirty years.', es: 'Porque siempre hay alguien esperando fuera. Siempre lo hubo. Yo abrí cinco minutos antes durante treinta años.', episodio: 12 },
    { tipo: 'otro' }),

  en('en-a2-033', 'beside', 'al lado de', 'preposicion', 'be-SIDE',
    [c('beside the flower shop', 'al lado de la floristería'), c('the road beside the farm', 'la carretera de al lado de la granja'), c('beside the objects', 'junto a los objetos')],
    {
      target: 'At the market, Maya waited beside the flower shop, their usual meeting place.',
      es: 'En el mercado, Maya esperó al lado de la floristería, donde siempre quedaban.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'otro' }),

  en('en-a2-034', 'between', 'entre', 'preposicion', 'be-TWEEN',
    [c('between the tables', 'entre las mesas'), c('choose between two things', 'elegir entre dos cosas'), c('between three and five minutes', 'entre tres y cinco minutos')],
    { target: 'We’ve never had more than twelve chairs. Twelve is what fits between the tables.', es: 'Nunca hemos tenido más de doce sillas. Doce es lo que cabe entre las mesas.', episodio: 16 },
    { tipo: 'otro' }),

  en('en-a2-035', 'local', 'del barrio / local', 'adjetivo', 'LO-cal',
    [c('a local theatre', 'un teatro del barrio'), c('local information', 'información del barrio'), c('how local support works', 'cómo funciona la ayuda del barrio')],
    {
      target: 'On Wednesday, our class visited a local theatre.',
      es: 'El miércoles, nuestra clase visitó un teatro del barrio.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'otro' }),
]

export const INGLES_A2: VocabLevel = {
  lang: 'ingles',
  nivel: 'a2',
  eje: 'Situaciones — transacciones y relatos cotidianos',
  listaBase: {
    fuente: 'Oxford 3000 por nivel CEFR, contrastado con el English Vocabulary Profile',
    url: 'https://www.oxfordlearnersdictionaries.com/about/wordlists/oxford3000-5000',
    cupoOficial: undefined,
    nota:
      'Fase 2, abierta el 11 ago 2026 con el material medido antes de escribir: 159 turnos de ' +
      'escucha y 87 frases de lectura, 246 para 350 palabras (0,70 por palabra) frente a las ' +
      '221 para 300 de A1. Da menos margen, así que habrá redactados — pero no en todos los ' +
      'bloques. Bloque 7 (casa, barrio y convivencia): 35 de 35 salen del material, ninguna ' +
      'redactada, porque la serie del nivel trata literalmente de alquilar y montar un local. ' +
      'Doce candidatas obvias se cayeron por estar ya en A1 —«flat», «wall», «floor», ' +
      '«window», «door», «kitchen», «shelf», «clean», «paint», «quiet», «sign» y «owner»— y se ' +
      'sustituyeron por otras del mismo tema que el corpus también dice. El cruce contra el ' +
      'Oxford 3000 queda pendiente hasta cerrar la fase.',
  },
  bloques: [
    {
      id: 'casa-barrio-y-convivencia',
      nombre: 'Casa, barrio y convivencia',
      icono: '🏘️',
      entradas: [...b7unidad1, ...b7unidad2, ...b7unidad3, ...b7unidad4],
    },
  ],
}
