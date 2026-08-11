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

// ═══ BLOQUE 6 · Comer fuera y restaurante ══════════════════════════════════════
//
// Segundo mejor surtido de los diez (12 de 15 candidatas sobrevivieron a abrir la frase), y
// otra vez treinta y cinco de treinta y cinco salen del material: el local que monta Maya es
// una cafetería, y encima hay un texto de lectura entero sobre una clase de cocina.
//
// Se cayeron por estar ya en A1: `menu`, `coffee`, `tea`, `bread`, `cake`, `soup`, `milk`,
// `waitress`, `order`, `price`, `cheap`, `expensive`, `food`, `cook`, `empty`. Y `wash`,
// `machine`, `bill` y `jar` se las llevó el bloque 7, que es del mismo escenario.

// ─── Unidad 1 · En la mesa ────────────────────────────────────────────────────

const b6unidad1: VocabEntry[] = [
  en('en-a2-036', 'customer', 'cliente', 'sustantivo', 'CUS-to-mer',
    [c('every customer', 'cada cliente'), c('serve a customer', 'atender a un cliente'), c('the first customers', 'los primeros clientes')],
    { target: 'I enjoy meeting people. I love listening to their stories. Every customer arrives with one.', es: 'Disfruto conociendo gente. Me encanta escuchar sus historias. Cada cliente llega con una.', episodio: 14 },
    { tipo: 'sustantivo' }),

  en('en-a2-037', 'enjoy', 'disfrutar', 'verbo', 'en-JOY',
    [c('enjoy meeting people', 'disfrutar conociendo gente'), c('enjoy the coffee', 'disfrutar del café'), c('I enjoy working here', 'disfruto trabajando aquí')],
    { target: 'I enjoy meeting people. I love listening to their stories. Every customer arrives with one.', es: 'Disfruto conociendo gente. Me encanta escuchar sus historias. Cada cliente llega con una.', episodio: 14 },
    { tipo: 'verbo' }),

  en('en-a2-038', 'serve', 'servir / atender', 'verbo', 'serve',
    [c('serve the coffee', 'servir el café'), c('serve table four', 'atender la mesa cuatro'), c('serve them quickly', 'atenderlos rápido')],
    { target: 'Who is going to serve the coffee?', es: '¿Quién va a servir el café?', episodio: 7 },
    { tipo: 'verbo' }),

  en('en-a2-039', 'cup', 'taza', 'sustantivo', 'cup',
    [c('the first cup', 'la primera taza'), c('two clean cups', 'dos tazas limpias'), c('a cup of tea', 'una taza de té')],
    { target: 'We have tested it. You just haven’t tasted the coffee. The first cup is yours tomorrow.', es: 'Sí la hemos probado. Tú es que no has catado el café. La primera taza es tuya mañana.', episodio: 9 },
    { tipo: 'sustantivo' }),

  en('en-a2-040', 'taste', 'catar / probar (sabor)', 'verbo', 'taste',
    [c('taste the coffee', 'catar el café'), c('it tastes better', 'sabe mejor'), c('taste before you serve', 'cátalo antes de servir')],
    { target: 'We have tested it. You just haven’t tasted the coffee. The first cup is yours tomorrow.', es: 'Sí la hemos probado. Tú es que no has catado el café. La primera taza es tuya mañana.', episodio: 9 },
    { tipo: 'verbo' }),

  en('en-a2-041', 'plate', 'plato', 'sustantivo', 'plate',
    [c('the empty plates', 'los platos vacíos'), c('no plates left', 'no queda ni un plato'), c('wash the plates', 'lavar los platos')],
    { target: 'Then look at the kitchen. There are no plates left. Not one came back with food.', es: 'Pues mira la cocina. No queda un solo plato. Ni uno volvió con comida.', episodio: 16 },
    { tipo: 'sustantivo' }),

  en('en-a2-042', 'break', 'romper', 'verbo', 'break',
    [c('break two cups', 'romper dos tazas'), c('break a plate', 'romper un plato'), c('nothing broke today', 'hoy no se rompió nada')],
    { target: 'Two hours? That’s not going to be enough. I’m going to break at least two cups.', es: '¿Dos horas? Eso no va a ser suficiente. Voy a romper por lo menos dos tazas.', episodio: 7 },
    { tipo: 'verbo' }),

  en('en-a2-043', 'blackboard', 'pizarra', 'sustantivo', 'BLACK-board',
    [c('write it on the blackboard', 'escribirlo en la pizarra'), c('the menu blackboard', 'la pizarra del menú'), c('clean the blackboard', 'borrar la pizarra')],
    { target: 'I’m going to write the menu on the blackboard.', es: 'Yo voy a escribir el menú en la pizarra.', episodio: 7 },
    { tipo: 'sustantivo' }),

  en('en-a2-044', 'offer', 'oferta / ofrecer', 'sustantivo', 'OF-fer',
    [c('a fair offer', 'una oferta justa'), c('accept the offer', 'aceptar la oferta'), c('offer a free coffee', 'ofrecer un café gratis')],
    { target: 'He says that’s not a fair offer, but he’s already washing.', es: 'Dice que no es una oferta justa, pero ya está lavando.', episodio: 10 },
    { tipo: 'sustantivo' }),

  en('en-a2-045', 'fair', 'justo', 'adjetivo', 'fair',
    [c('a fair price', 'un precio justo'), c('that’s not fair', 'eso no es justo'), c('a fair share', 'una parte justa')],
    { target: 'He says that’s not a fair offer, but he’s already washing.', es: 'Dice que no es una oferta justa, pero ya está lavando.', episodio: 10 },
    { tipo: 'otro' }),

  en('en-a2-046', 'drop', 'dejar caer / tirar', 'verbo', 'drop',
    [c('drop a plate', 'que se te caiga un plato'), c('don’t drop the tray', 'no dejes caer la bandeja'), c('she dropped nothing', 'no se le cayó nada')],
    { target: 'You served them quickly. You didn’t drop anything.', es: 'Los serviste rápido. No se te cayó nada.', episodio: 15 },
    { tipo: 'verbo' }),

  en('en-a2-047', 'quickly', 'rápido / deprisa', 'adverbio', 'QUICK-ly',
    [c('serve them quickly', 'atenderlos rápido'), c('answer quickly', 'contestar rápido'), c('it sold quickly', 'se vendió rápido')],
    { target: 'You served them quickly. You didn’t drop anything.', es: 'Los serviste rápido. No se te cayó nada.', episodio: 15 },
    { tipo: 'otro' }),
]

// ─── Unidad 2 · La cocina ─────────────────────────────────────────────────────

const b6unidad2: VocabEntry[] = [
  en('en-a2-048', 'apron', 'delantal', 'sustantivo', 'A-pron',
    [c('wear the apron', 'llevar el delantal'), c('a clean apron', 'un delantal limpio'), c('take off your apron', 'quítate el delantal')],
    { target: 'Do I have to wear the apron all day?', es: '¿Tengo que llevar el delantal todo el día?', episodio: 12 },
    { tipo: 'sustantivo' }),

  en('en-a2-049', 'uniform', 'uniforme', 'sustantivo', 'U-ni-form',
    [c('the kitchen uniform', 'el uniforme de cocina'), c('wear a uniform', 'llevar uniforme'), c('the uniform is grey', 'el uniforme es gris')],
    { target: 'You have to wear it in the kitchen. You should wear it outside too. The apron is also the uniform.', es: 'Tienes que llevarlo en la cocina. Fuera también deberías. El delantal es también el uniforme.', episodio: 12 },
    { tipo: 'sustantivo' }),

  en('en-a2-050', 'bowl', 'bol / cuenco', 'sustantivo', 'bowl',
    [c('a soup bowl', 'un bol de sopa'), c('two clean bowls', 'dos boles limpios'), c('fill the bowl', 'llenar el bol')],
    {
      target: 'The centre will provide bowls, knives, and all ingredients, but students should bring a clean apron and a container for leftovers.',
      es: 'El centro pone los boles, los cuchillos y todos los ingredientes, pero los alumnos deben traer un delantal limpio y un recipiente para las sobras.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-051', 'container', 'recipiente / envase', 'sustantivo', 'con-TAI-ner',
    [c('a container for leftovers', 'un recipiente para las sobras'), c('a plastic container', 'un envase de plástico'), c('close the container', 'cerrar el recipiente')],
    {
      target: 'The centre will provide bowls, knives, and all ingredients, but students should bring a clean apron and a container for leftovers.',
      es: 'El centro pone los boles, los cuchillos y todos los ingredientes, pero los alumnos deben traer un delantal limpio y un recipiente para las sobras.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-052', 'ingredient', 'ingrediente', 'sustantivo', 'in-GRE-dient',
    [c('all the ingredients', 'todos los ingredientes'), c('buy the ingredients', 'comprar los ingredientes'), c('one ingredient is missing', 'falta un ingrediente')],
    {
      target: 'One box needed baby food, while another needed ingredients for a vegetarian meal.',
      es: 'Una caja necesitaba comida de bebé, y otra ingredientes para una comida vegetariana.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-053', 'meal', 'comida (plato completo)', 'sustantivo', 'meal',
    [c('a vegetarian meal', 'una comida vegetariana'), c('cook a meal', 'preparar una comida'), c('the main meal', 'la comida principal')],
    {
      target: 'One box needed baby food, while another needed ingredients for a vegetarian meal.',
      es: 'Una caja necesitaba comida de bebé, y otra ingredientes para una comida vegetariana.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-054', 'vegetable', 'verdura', 'sustantivo', 'VEG-e-table',
    [c('vegetable soup', 'sopa de verduras'), c('fresh vegetables', 'verduras frescas'), c('cut the vegetables', 'cortar las verduras')],
    {
      target: 'This month we are learning to make vegetable dumplings and a simple dipping sauce.',
      es: 'Este mes aprendemos a hacer empanadillas de verdura y una salsa sencilla para mojar.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-055', 'sauce', 'salsa', 'sustantivo', 'sauce',
    [c('a simple sauce', 'una salsa sencilla'), c('tomato sauce', 'salsa de tomate'), c('too much sauce', 'demasiada salsa')],
    {
      target: 'This month we are learning to make vegetable dumplings and a simple dipping sauce.',
      es: 'Este mes aprendemos a hacer empanadillas de verdura y una salsa sencilla para mojar.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-056', 'tin', 'lata', 'sustantivo', 'tin',
    [c('a tin of soup', 'una lata de sopa'), c('open the tin', 'abrir la lata'), c('dates on tins', 'fechas en las latas')],
    {
      target: 'My first job was checking dates on tins.',
      es: 'Mi primera tarea fue revisar las fechas de las latas.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-057', 'date', 'fecha', 'sustantivo', 'date',
    [c('check the date', 'revisar la fecha'), c('the date on the tin', 'la fecha de la lata'), c('an old date', 'una fecha pasada')],
    {
      target: 'My first job was checking dates on tins.',
      es: 'Mi primera tarea fue revisar las fechas de las latas.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-058', 'tutor', 'monitor / profesor de taller', 'sustantivo', 'TU-tor',
    [c('tell the tutor', 'avisar al monitor'), c('the cooking tutor', 'el monitor de cocina'), c('ask your tutor', 'pregúntale a tu monitor')],
    {
      target: 'Please tell the tutor about allergies when you arrive.',
      es: 'Por favor, avisa al monitor de las alergias cuando llegues.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-059', 'allergy', 'alergia', 'sustantivo', 'AL-ler-gy',
    [c('a nut allergy', 'alergia a los frutos secos'), c('tell them about allergies', 'avisar de las alergias'), c('I have an allergy', 'tengo una alergia')],
    {
      target: 'Please tell the tutor about allergies when you arrive.',
      es: 'Por favor, avisa al monitor de las alergias cuando llegues.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · La clase de cocina y la cuenta ────────────────────────────────

const b6unidad3: VocabEntry[] = [
  en('en-a2-060', 'beginner', 'principiante', 'sustantivo', 'be-GIN-ner',
    [c('beginners are welcome', 'los principiantes son bienvenidos'), c('a beginners’ class', 'una clase para principiantes'), c('I am a beginner', 'soy principiante')],
    {
      target: 'Beginners are welcome, and the tutor demonstrates each step slowly before anyone tries it.',
      es: 'Los principiantes son bienvenidos, y el monitor enseña cada paso despacio antes de que nadie lo intente.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-061', 'step', 'paso', 'sustantivo', 'step',
    [c('each step', 'cada paso'), c('the first step', 'el primer paso'), c('follow the steps', 'seguir los pasos')],
    {
      target: 'Beginners are welcome, and the tutor demonstrates each step slowly before anyone tries it.',
      es: 'Los principiantes son bienvenidos, y el monitor enseña cada paso despacio antes de que nadie lo intente.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-062', 'cancel', 'cancelar / anular', 'verbo', 'CAN-cel',
    [c('cancel by Monday', 'cancelar antes del lunes'), c('cancel the table', 'anular la mesa'), c('they cancelled the class', 'cancelaron la clase')],
    {
      target: 'The kitchen has only eight workstations, so students who cannot attend should cancel by Monday morning.',
      es: 'La cocina solo tiene ocho puestos, así que quien no pueda asistir debe cancelar antes del lunes por la mañana.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'verbo' }),

  en('en-a2-063', 'attend', 'asistir', 'verbo', 'at-TEND',
    [c('attend the class', 'asistir a la clase'), c('I cannot attend', 'no puedo asistir'), c('twenty people attended', 'asistieron veinte personas')],
    {
      target: 'The kitchen has only eight workstations, so students who cannot attend should cancel by Monday morning.',
      es: 'La cocina solo tiene ocho puestos, así que quien no pueda asistir debe cancelar antes del lunes por la mañana.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'verbo' }),

  en('en-a2-064', 'provide', 'poner / facilitar', 'verbo', 'pro-VIDE',
    [c('the centre provides the bowls', 'el centro pone los boles'), c('provide soup and bread', 'poner sopa y pan'), c('we provide the tools', 'nosotros ponemos las herramientas')],
    {
      target: 'At midday, the café across the street will provide soup and bread.',
      es: 'A mediodía, el café de enfrente pondrá sopa y pan.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'verbo' }),

  en('en-a2-065', 'session', 'sesión', 'sustantivo', 'SES-sion',
    [c('a tasting session', 'una sesión de cata'), c('a short session', 'una sesión corta'), c('the session ends at eight', 'la sesión acaba a las ocho')],
    {
      target: 'The class ends at eight, and everyone can stay for a short tasting session.',
      es: 'La clase acaba a las ocho, y todo el mundo puede quedarse a una sesión corta de cata.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-066', 'spend', 'gastar', 'verbo', 'spend',
    [c('spend too much', 'gastar demasiado'), c('spend it on milk', 'gastarlo en leche'), c('we spent ninety dollars', 'gastamos noventa dólares')],
    { target: 'We spend too much on milk. I’ll buy less.', es: 'Gastamos demasiado en leche. Compraré menos.', episodio: 11 },
    { tipo: 'verbo' }),

  en('en-a2-067', 'dollar', 'dólar', 'sustantivo', 'DOL-lar',
    [c('ninety dollars', 'noventa dólares'), c('prices in dollars', 'precios en dólares'), c('two dollars a cup', 'dos dólares la taza')],
    { target: 'Ninety dollars. That’s not much for a whole month, and the rent takes half of it.', es: 'Noventa dólares. No es mucho para todo un mes, y el alquiler se lleva la mitad.', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a2-068', 'full', 'lleno', 'adjetivo', 'full',
    [c('a shop full of plates', 'una tienda llena de platos'), c('the room is full', 'la sala está llena'), c('a full plate', 'un plato lleno')],
    { target: 'You need fewer plates and more patience. A café is not a shop full of plates.', es: 'Necesitáis menos platos y más paciencia. Un café no es una tienda llena de platos.', episodio: 11 },
    { tipo: 'otro' }),

  en('en-a2-069', 'bake', 'hornear', 'verbo', 'bake',
    [c('bake bread', 'hornear pan'), c('start baking', 'ponerse a hornear'), c('she bakes at five', 'hornea a las cinco')],
    { target: 'Then we’ll start baking on Friday night.', es: 'Pues empezamos a hornear el viernes por la noche.', episodio: 19 },
    { tipo: 'verbo' }),

  en('en-a2-070', 'delivery', 'entrega / reparto', 'sustantivo', 'de-LIV-er-y',
    [c('a delivery arrives', 'llega un reparto'), c('the milk delivery', 'la entrega de la leche'), c('wait for the delivery', 'esperar el reparto')],
    {
      target: 'I had expected the work to be quiet, but the room became busy when a delivery arrived.',
      es: 'Esperaba un trabajo tranquilo, pero la sala se llenó de movimiento cuando llegó un reparto.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 2 · Trabajo y empleo ═══════════════════════════════════════════════
//
// Este bloque no sale de la serie: sale de **dos textos de lectura**, la entrevista de Noor y
// el turno de voluntariado. La serie cuenta un negocio propio, no un empleo, así que aporta
// lo de decidir y organizarse (ep12, ep18, ep20) y poco más.
//
// Que un bloque viva en la lectura y no en la escucha es información, no un defecto: es la
// razón por la que la regla de veto dice «escucha **o** lectura» desde el principio.

// ─── Unidad 1 · La entrevista ─────────────────────────────────────────────────

const b2unidad1: VocabEntry[] = [
  en('en-a2-071', 'interview', 'entrevista', 'sustantivo', 'IN-ter-view',
    [c('a job interview', 'una entrevista de trabajo'), c('before the interview', 'antes de la entrevista'), c('the interview went well', 'la entrevista salió bien')],
    {
      target: 'The evening before the interview, she checked the bus route and prepared two questions about the role.',
      es: 'La tarde antes de la entrevista, miró la ruta del autobús y preparó dos preguntas sobre el puesto.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-072', 'role', 'puesto / papel', 'sustantivo', 'role',
    [c('questions about the role', 'preguntas sobre el puesto'), c('a new role', 'un puesto nuevo'), c('the role suits her', 'el puesto le va bien')],
    {
      target: 'The evening before the interview, she checked the bus route and prepared two questions about the role.',
      es: 'La tarde antes de la entrevista, miró la ruta del autobús y preparó dos preguntas sobre el puesto.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-073', 'task', 'tarea', 'sustantivo', 'task',
    [c('learn a new task', 'aprender una tarea nueva'), c('the first task', 'la primera tarea'), c('finish the task', 'terminar la tarea')],
    {
      target: 'Before her first job interview, Noor wrote down examples of times when she had solved a problem, helped a customer, or learned a new task.',
      es: 'Antes de su primera entrevista de trabajo, Noor apuntó ejemplos de veces en que había resuelto un problema, ayudado a un cliente o aprendido una tarea nueva.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-074', 'problem', 'problema', 'sustantivo', 'PROB-lem',
    [c('solve a problem', 'resolver un problema'), c('a small problem', 'un problema pequeño'), c('the problem is the water', 'el problema es el agua')],
    {
      target: 'Before her first job interview, Noor wrote down examples of times when she had solved a problem, helped a customer, or learned a new task.',
      es: 'Antes de su primera entrevista de trabajo, Noor apuntó ejemplos de veces en que había resuelto un problema, ayudado a un cliente o aprendido una tarea nueva.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-075', 'manager', 'jefe / responsable', 'sustantivo', 'MAN-a-ger',
    [c('the manager asked', 'el responsable preguntó'), c('talk to the manager', 'hablar con el jefe'), c('a good manager', 'un buen jefe')],
    {
      target: 'At the office, the manager asked about teamwork and reliability.',
      es: 'En la oficina, el responsable preguntó por el trabajo en equipo y la fiabilidad.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-076', 'teamwork', 'trabajo en equipo', 'sustantivo', 'TEAM-work',
    [c('ask about teamwork', 'preguntar por el trabajo en equipo'), c('teamwork matters here', 'aquí importa el trabajo en equipo'), c('good teamwork', 'buen trabajo en equipo')],
    {
      target: 'At the office, the manager asked about teamwork and reliability.',
      es: 'En la oficina, el responsable preguntó por el trabajo en equipo y la fiabilidad.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-077', 'example', 'ejemplo', 'sustantivo', 'ex-AM-ple',
    [c('one clear example', 'un ejemplo claro'), c('give an example', 'poner un ejemplo'), c('for example', 'por ejemplo')],
    {
      target: 'Noor gave one clear example for each question and admitted when she did not know a technical word.',
      es: 'Noor dio un ejemplo claro para cada pregunta y admitió cuándo no sabía una palabra técnica.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-078', 'admit', 'admitir / reconocer', 'verbo', 'ad-MIT',
    [c('admit a mistake', 'reconocer un error'), c('she admitted it', 'lo reconoció'), c('admit you don’t know', 'reconocer que no sabes')],
    {
      target: 'Noor gave one clear example for each question and admitted when she did not know a technical word.',
      es: 'Noor dio un ejemplo claro para cada pregunta y admitió cuándo no sabía una palabra técnica.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'verbo' }),

  en('en-a2-079', 'term', 'término', 'sustantivo', 'term',
    [c('a technical term', 'un término técnico'), c('explain the term', 'explicar el término'), c('I don’t know that term', 'no conozco ese término')],
    {
      target: 'When she was unsure about one technical term, she explained how she would find the answer instead of guessing, and the manager seemed to appreciate that honesty.',
      es: 'Cuando no estaba segura de un término técnico, explicó cómo buscaría la respuesta en vez de adivinar, y al responsable pareció gustarle esa honestidad.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-080', 'honesty', 'honestidad', 'sustantivo', 'HON-es-ty',
    [c('appreciate her honesty', 'valorar su honestidad'), c('answer with honesty', 'responder con honestidad'), c('honesty helps here', 'aquí la honestidad ayuda')],
    {
      target: 'When she was unsure about one technical term, she explained how she would find the answer instead of guessing, and the manager seemed to appreciate that honesty.',
      es: 'Cuando no estaba segura de un término técnico, explicó cómo buscaría la respuesta en vez de adivinar, y al responsable pareció gustarle esa honestidad.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-081', 'result', 'resultado', 'sustantivo', 're-SULT',
    [c('know the result', 'saber el resultado'), c('wait for the result', 'esperar el resultado'), c('a good result', 'un buen resultado')],
    {
      target: 'She left without knowing the result, but she felt prepared because she had shown how she worked rather than only describing her qualities.',
      es: 'Se fue sin saber el resultado, pero se sintió preparada porque había enseñado cómo trabajaba en vez de solo describir sus cualidades.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-082', 'quality', 'cualidad / calidad', 'sustantivo', 'QUAL-i-ty',
    [c('describe your qualities', 'describir tus cualidades'), c('the quality of the bread', 'la calidad del pan'), c('her best quality', 'su mejor cualidad')],
    {
      target: 'She left without knowing the result, but she felt prepared because she had shown how she worked rather than only describing her qualities.',
      es: 'Se fue sin saber el resultado, pero se sintió preparada porque había enseñado cómo trabajaba en vez de solo describir sus cualidades.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · El turno y el equipo ──────────────────────────────────────────

const b2unidad2: VocabEntry[] = [
  en('en-a2-083', 'memorise', 'memorizar', 'verbo', 'MEM-o-rise',
    [c('memorise long answers', 'memorizar respuestas largas'), c('don’t memorise it', 'no lo memorices'), c('memorise the list', 'memorizar la lista')],
    {
      target: 'She did not memorise long answers because she wanted to sound natural.',
      es: 'No memorizó respuestas largas porque quería sonar natural.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'verbo' }),

  en('en-a2-084', 'shift', 'turno', 'sustantivo', 'shift',
    [c('a Saturday shift', 'un turno de sábado'), c('sign up for a shift', 'apuntarse a un turno'), c('the shift was tiring', 'el turno fue agotador')],
    {
      target: 'I signed up for a Saturday shift at the food bank because I wanted to understand how local support works.',
      es: 'Me apunté a un turno de sábado en el banco de alimentos porque quería entender cómo funciona la ayuda del barrio.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-085', 'support', 'ayuda / apoyo', 'sustantivo', 'sup-PORT',
    [c('local support', 'la ayuda del barrio'), c('ask for support', 'pedir apoyo'), c('support for families', 'ayuda para las familias')],
    {
      target: 'I signed up for a Saturday shift at the food bank because I wanted to understand how local support works.',
      es: 'Me apunté a un turno de sábado en el banco de alimentos porque quería entender cómo funciona la ayuda del barrio.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-086', 'coordinator', 'coordinador / coordinadora', 'sustantivo', 'co-OR-di-na-tor',
    [c('the coordinator showed us', 'la coordinadora nos enseñó'), c('ask the coordinator', 'preguntar a la coordinadora'), c('the garden coordinator', 'la coordinadora del huerto')],
    {
      target: 'At nine, the coordinator showed us the storage room and explained the labels.',
      es: 'A las nueve, la coordinadora nos enseñó el almacén y explicó las etiquetas.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-087', 'storage', 'almacén / almacenaje', 'sustantivo', 'STOR-age',
    [c('the storage room', 'el almacén'), c('storage space', 'sitio para guardar'), c('put it in storage', 'guardarlo en el almacén')],
    {
      target: 'At nine, the coordinator showed us the storage room and explained the labels.',
      es: 'A las nueve, la coordinadora nos enseñó el almacén y explicó las etiquetas.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-088', 'pack', 'empaquetar / llenar', 'verbo', 'pack',
    [c('pack boxes', 'llenar cajas'), c('pack the bags', 'preparar las bolsas'), c('we packed them together', 'las llenamos entre todos')],
    {
      target: 'Later, I helped pack boxes for families with different needs.',
      es: 'Después ayudé a llenar cajas para familias con necesidades distintas.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'verbo' }),

  en('en-a2-089', 'way', 'manera / forma', 'sustantivo', 'way',
    [c('three ways to help', 'tres maneras de ayudar'), c('a better way', 'una manera mejor'), c('the same way', 'de la misma manera')],
    {
      target: 'Before leaving, I wrote down three ways to volunteer again.',
      es: 'Antes de irme, apunté tres maneras de volver a ser voluntaria.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-090', 'organisation', 'organización', 'sustantivo', 'or-ga-ni-SA-tion',
    [c('the community’s organisation', 'la organización del barrio'), c('a small organisation', 'una organización pequeña'), c('good organisation', 'buena organización')],
    {
      target: 'The shift was tiring, yet it made the community’s organisation visible to me.',
      es: 'El turno fue agotador, pero me hizo ver la organización del barrio.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-091', 'donation', 'donación', 'sustantivo', 'do-NA-tion',
    [c('new donations', 'donaciones nuevas'), c('collect donations', 'recoger donaciones'), c('a small donation', 'una donación pequeña')],
    {
      target: 'The coordinator explained that the busiest hours were usually just after lunch, when new donations and waiting families often arrived at the same time.',
      es: 'La coordinadora explicó que las horas de más trabajo eran normalmente justo después de comer, cuando llegaban a la vez donaciones nuevas y familias esperando.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-092', 'staff', 'personal / plantilla', 'sustantivo', 'staff',
    [c('the museum staff', 'el personal del museo'), c('ask the staff', 'preguntar al personal'), c('staff can lend it', 'el personal puede prestarlo')],
    {
      target: 'Staff can also lend headphones to visitors who prefer to listen alone, and a printed version is available for anyone who finds small screens difficult.',
      es: 'El personal también presta auriculares a quien prefiera escuchar solo, y hay una versión impresa para quien tenga dificultad con las pantallas pequeñas.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-093', 'timetable', 'horario', 'sustantivo', 'TIME-ta-ble',
    [c('explain the timetable', 'explicar el horario'), c('check the timetable', 'mirar el horario'), c('a new timetable', 'un horario nuevo')],
    {
      target: 'At school, my partner, Josh, showed me the library and explained the timetable.',
      es: 'En el colegio, mi compañero Josh me enseñó la biblioteca y me explicó el horario.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-094', 'show', 'enseñar / mostrar', 'verbo', 'show',
    [c('show me the library', 'enseñarme la biblioteca'), c('show them the room', 'enseñarles la sala'), c('he showed us the labels', 'nos enseñó las etiquetas')],
    {
      target: 'At school, my partner, Josh, showed me the library and explained the timetable.',
      es: 'En el colegio, mi compañero Josh me enseñó la biblioteca y me explicó el horario.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'verbo' }),
]

// ─── Unidad 3 · Decidir, acordar y organizarse ────────────────────────────────

const b2unidad3: VocabEntry[] = [
  en('en-a2-095', 'rule', 'norma / regla', 'sustantivo', 'rule',
    [c('that rule is not negotiable', 'esa norma no se discute'), c('follow the rules', 'seguir las normas'), c('a new rule', 'una norma nueva')],
    { target: 'We must wash our hands before we make any food. That rule is not negotiable.', es: 'Tenemos que lavarnos las manos antes de preparar comida. Esa norma no se discute.', episodio: 12 },
    { tipo: 'sustantivo' }),

  en('en-a2-096', 'agree', 'acordar / estar de acuerdo', 'verbo', 'a-GREE',
    [c('we agreed on the prices', 'acordamos los precios'), c('I agree with you', 'estoy de acuerdo contigo'), c('agree on a day', 'acordar un día')],
    { target: 'You have to. And you mustn’t change them on Saturday. We agreed on those prices last night.', es: 'Sí. Y no puedes cambiarlos el sábado. Acordamos esos precios anoche.', episodio: 12 },
    { tipo: 'verbo' }),

  en('en-a2-097', 'early', 'temprano / con antelación', 'adverbio', 'EAR-ly',
    [c('five minutes early', 'cinco minutos antes'), c('open early', 'abrir temprano'), c('arrive early', 'llegar con tiempo')],
    { target: 'You should open the door five minutes early.', es: 'Deberíais abrir la puerta cinco minutos antes.', episodio: 12 },
    { tipo: 'otro' }),

  en('en-a2-098', 'decide', 'decidir', 'verbo', 'de-CIDE',
    [c('decide on the same day', 'decidir el mismo día'), c('I’ve decided to study', 'he decidido estudiar'), c('decide between two', 'decidir entre dos')],
    { target: 'I know. I’ve decided to take a business course in January. Ana found it and signed me up already.', es: 'Lo sé. He decidido hacer un curso de gestión en enero. Ana lo encontró y ya me apuntó.', episodio: 20 },
    { tipo: 'verbo' }),

  en('en-a2-099', 'business', 'gestión / negocio', 'sustantivo', 'BUSI-ness',
    [c('a business course', 'un curso de gestión'), c('start a business', 'montar un negocio'), c('the family business', 'el negocio familiar')],
    { target: 'I know. I’ve decided to take a business course in January. Ana found it and signed me up already.', es: 'Lo sé. He decidido hacer un curso de gestión en enero. Ana lo encontró y ya me apuntó.', episodio: 20 },
    { tipo: 'sustantivo' }),

  en('en-a2-100', 'manage', 'manejar / llevar', 'verbo', 'MAN-age',
    [c('manage the money', 'manejar el dinero'), c('manage a team', 'llevar un equipo'), c('she manages the shop', 'ella lleva la tienda')],
    { target: 'You still have to learn to manage the money.', es: 'Todavía tienes que aprender a manejar el dinero.', episodio: 20 },
    { tipo: 'verbo' }),

  en('en-a2-101', 'salary', 'sueldo', 'sustantivo', 'SAL-a-ry',
    [c('a fixed salary', 'un sueldo fijo'), c('a low salary', 'un sueldo bajo'), c('miss the salary', 'echar de menos el sueldo')],
    { target: 'I miss having a fixed salary. I don’t miss the noise. Some months I earn less than before.', es: 'Echo de menos tener un sueldo fijo. No echo de menos el ruido. Algunos meses gano menos que antes.', episodio: 14 },
    { tipo: 'sustantivo' }),

  en('en-a2-102', 'explain', 'explicar', 'verbo', 'ex-PLAIN',
    [c('explain the labels', 'explicar las etiquetas'), c('explain the reason', 'explicar el motivo'), c('she explained it twice', 'lo explicó dos veces')],
    {
      target: 'The coordinator explained that the busiest hours were usually just after lunch, when new donations and waiting families often arrived at the same time.',
      es: 'La coordinadora explicó que las horas de más trabajo eran normalmente justo después de comer, cuando llegaban a la vez donaciones nuevas y familias esperando.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'verbo' }),

  en('en-a2-103', 'expect', 'esperar (prever)', 'verbo', 'ex-PECT',
    [c('faster than we expected', 'más rápido de lo que esperábamos'), c('expect a busy day', 'prever un día de mucho trabajo'), c('I didn’t expect that', 'no me esperaba eso')],
    { target: 'Every customer adds one place. It grows faster than we expected. We started it with three streets and a pencil.', es: 'Cada cliente añade un sitio. Crece más rápido de lo que esperábamos. Lo empezamos con tres calles y un lápiz.', episodio: 18 },
    { tipo: 'verbo' }),

  en('en-a2-104', 'rota', 'cuadrante de turnos', 'sustantivo', 'RO-ta',
    [c('make a rota', 'hacer un cuadrante'), c('the weekend rota', 'el cuadrante del fin de semana'), c('I’m on the rota', 'estoy en el cuadrante')],
    {
      target: 'We will make a rota and send it on Monday.',
      es: 'Haremos un cuadrante y lo enviaremos el lunes.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-105', 'reason', 'motivo / razón', 'sustantivo', 'REA-son',
    [c('explain the reason', 'explicar el motivo'), c('a good reason', 'un buen motivo'), c('the reason is the rain', 'el motivo es la lluvia')],
    {
      target: 'During the trial, whenever a bag was rejected, the team left a short note explaining the reason instead of simply leaving it on the pavement.',
      es: 'Durante la prueba, cada vez que se rechazaba una bolsa, el equipo dejaba una nota corta explicando el motivo en vez de dejarla sin más en la acera.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 8 · Tecnología y comunicación ══════════════════════════════════════
//
// El nivel no tiene un episodio de tecnología, pero tiene tres cosas que valen más: la reseña
// en la web del barrio (ep16), el mapa colaborativo (ep18) y la audioguía del museo. De ahí
// sale casi todo, y por eso el bloque mira más a **comunicarse** que a los aparatos.
//
// `phone`, `message`, `check`, `text`, `photo` y `call` ya están en A1, así que aquí no vuelven.

// ─── Unidad 1 · La web y la pantalla ──────────────────────────────────────────

const b8unidad1: VocabEntry[] = [
  en('en-a2-106', 'website', 'página web / sitio web', 'sustantivo', 'WEB-site',
    [c('on a website', 'en una página web'), c('check the website', 'mirar la web'), c('the shop’s website', 'la web de la tienda')],
    { target: 'I’ve never seen my name on a website before.', es: 'Nunca había visto mi nombre en una página web.', episodio: 16 },
    { tipo: 'sustantivo' }),

  en('en-a2-107', 'page', 'página', 'sustantivo', 'page',
    [c('the neighbourhood page', 'la página del barrio'), c('open the page', 'abrir la página'), c('on the first page', 'en la primera página')],
    { target: 'It’s on the neighbourhood page. Somebody wrote it last night.', es: 'Está en la página del barrio. Alguien la escribió anoche.', episodio: 16 },
    { tipo: 'sustantivo' }),

  en('en-a2-108', 'app', 'aplicación / app', 'sustantivo', 'app',
    [c('the app on my phone', 'la aplicación de mi teléfono'), c('open the app', 'abrir la app'), c('a free app', 'una app gratis')],
    { target: 'It’s more useful than the app on my phone.', es: 'Es más útil que la aplicación de mi teléfono.', episodio: 18 },
    { tipo: 'sustantivo' }),

  en('en-a2-109', 'review', 'reseña', 'sustantivo', 're-VIEW',
    [c('read a review', 'leer una reseña'), c('a good review', 'una buena reseña'), c('write a review', 'escribir una reseña')],
    { target: 'Have you ever read a review about yourself? This one has fourteen lines and your name in the first one.', es: '¿Has leído alguna vez una reseña sobre ti? Esta tiene catorce líneas y tu nombre en la primera.', episodio: 16 },
    { tipo: 'sustantivo' }),

  en('en-a2-110', 'line', 'línea / renglón', 'sustantivo', 'line',
    [c('fourteen lines', 'catorce líneas'), c('the first line', 'la primera línea'), c('read the last line', 'leer la última línea')],
    { target: 'Have you ever read a review about yourself? This one has fourteen lines and your name in the first one.', es: '¿Has leído alguna vez una reseña sobre ti? Esta tiene catorce líneas y tu nombre en la primera.', episodio: 16 },
    { tipo: 'sustantivo' }),

  en('en-a2-111', 'map', 'mapa', 'sustantivo', 'map',
    [c('the community map', 'el mapa del barrio'), c('look at the map', 'mirar el mapa'), c('add a place to the map', 'añadir un sitio al mapa')],
    { target: 'This map is the most colourful thing on the wall. It has more colours than the menu.', es: 'Este mapa es lo más colorido de la pared. Tiene más colores que el menú.', episodio: 18 },
    { tipo: 'sustantivo' }),

  en('en-a2-112', 'audio', 'audio', 'sustantivo', 'AU-dio',
    [c('an audio guide', 'una audioguía'), c('the audio is free', 'el audio es gratis'), c('listen to the audio', 'escuchar el audio')],
    {
      target: 'The City Museum has introduced a free audio guide for visitors aged twelve and over.',
      es: 'El Museo de la Ciudad ha estrenado una audioguía gratuita para visitantes de doce años en adelante.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-113', 'guide', 'guía', 'sustantivo', 'guide',
    [c('the audio guide', 'la audioguía'), c('download the guide', 'descargar la guía'), c('the guide has twelve stops', 'la guía tiene doce paradas')],
    {
      target: 'The guide has twelve stops, but visitors do not need to follow them in order.',
      es: 'La guía tiene doce paradas, pero no hace falta seguirlas en orden.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-114', 'follow', 'seguir', 'verbo', 'FOL-low',
    [c('follow them in order', 'seguirlas en orden'), c('follow the steps', 'seguir los pasos'), c('follow me', 'sígueme')],
    {
      target: 'The guide has twelve stops, but visitors do not need to follow them in order.',
      es: 'La guía tiene doce paradas, pero no hace falta seguirlas en orden.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'verbo' }),

  en('en-a2-115', 'download', 'descargar', 'verbo', 'DOWN-load',
    [c('download the guide', 'descargar la guía'), c('download the app', 'descargar la aplicación'), c('I downloaded it yesterday', 'lo descargué ayer')],
    {
      target: 'Visitors can borrow a small player at the entrance or download the guide before arriving.',
      es: 'Los visitantes pueden coger prestado un reproductor pequeño en la entrada o descargar la guía antes de llegar.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'verbo' }),

  en('en-a2-116', 'screen', 'pantalla', 'sustantivo', 'screen',
    [c('small screens', 'pantallas pequeñas'), c('look at the screen', 'mirar la pantalla'), c('the screen is broken', 'la pantalla está rota')],
    {
      target: 'Staff can also lend headphones to visitors who prefer to listen alone, and a printed version is available for anyone who finds small screens difficult.',
      es: 'El personal también presta auriculares a quien prefiera escuchar solo, y hay una versión impresa para quien tenga dificultad con las pantallas pequeñas.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-117', 'display', 'mostrar / exhibir', 'verbo', 'dis-PLAY',
    [c('display a sign', 'poner un cartel a la vista'), c('display the prices', 'mostrar los precios'), c('it displays the route', 'muestra la ruta')],
    {
      target: 'Each driver will display a printed sign in the front window, so passengers can confirm the temporary route before they board.',
      es: 'Cada conductor pondrá un cartel impreso en la ventanilla delantera, para que los pasajeros confirmen la ruta temporal antes de subir.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'verbo' }),
]

// ─── Unidad 2 · Escribir y responder ──────────────────────────────────────────

const b8unidad2: VocabEntry[] = [
  en('en-a2-118', 'email', 'correo electrónico', 'sustantivo', 'E-mail',
    [c('reply to this email', 'responder a este correo'), c('send an email', 'mandar un correo'), c('a short email', 'un correo corto')],
    {
      target: 'To help us plan the food, reply to this email before Thursday and tell us how many people are coming.',
      es: 'Para ayudarnos a organizar la comida, responde a este correo antes del jueves y dinos cuánta gente viene.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-119', 'reply', 'responder / contestar', 'verbo', 're-PLY',
    [c('reply before Thursday', 'responder antes del jueves'), c('reply with one hour', 'contesta con una hora'), c('nobody replied', 'nadie contestó')],
    {
      target: 'To help us plan the food, reply to this email before Thursday and tell us how many people are coming.',
      es: 'Para ayudarnos a organizar la comida, responde a este correo antes del jueves y dinos cuánta gente viene.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'verbo' }),

  en('en-a2-120', 'subject', 'asunto', 'sustantivo', 'SUB-ject',
    [c('the subject of the email', 'el asunto del correo'), c('write a clear subject', 'poner un asunto claro'), c('an empty subject', 'un asunto vacío')],
    {
      target: 'Subject: Help us prepare the community garden.',
      es: 'Asunto: ayúdanos a preparar el huerto comunitario.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-121', 'send', 'enviar / mandar', 'verbo', 'send',
    [c('send it on Monday', 'enviarlo el lunes'), c('send a message', 'mandar un mensaje'), c('she sent the list', 'mandó la lista')],
    {
      target: 'We will make a rota and send it on Monday.',
      es: 'Haremos un cuadrante y lo enviaremos el lunes.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'verbo' }),

  en('en-a2-122', 'information', 'información', 'sustantivo', 'in-for-MA-tion',
    [c('local information', 'información del barrio'), c('ask for information', 'pedir información'), c('useful information', 'información útil')],
    {
      target: 'On Saturday 3 June, we will leave a small basket at each door with local information, tea, and a map.',
      es: 'El sábado 3 de junio dejaremos una cesta pequeña en cada puerta con información del barrio, té y un mapa.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-123', 'note', 'nota', 'sustantivo', 'note',
    [c('a short note', 'una nota corta'), c('leave a note', 'dejar una nota'), c('read my note', 'lee mi nota')],
    {
      target: 'During the trial, whenever a bag was rejected, the team left a short note explaining the reason instead of simply leaving it on the pavement.',
      es: 'Durante la prueba, cada vez que se rechazaba una bolsa, el equipo dejaba una nota corta explicando el motivo en vez de dejarla sin más en la acera.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-124', 'notebook', 'libreta / cuaderno', 'sustantivo', 'NOTE-book',
    [c('a small notebook', 'una libreta pequeña'), c('start a notebook', 'empezar una libreta'), c('write it in the notebook', 'apuntarlo en la libreta')],
    {
      target: 'Maya bought a small notebook to record places she wanted to visit.',
      es: 'Maya compró una libreta pequeña para anotar sitios que quería visitar.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-125', 'record', 'anotar / registrar', 'verbo', 're-CORD',
    [c('record the places', 'anotar los sitios'), c('record the prices', 'registrar los precios'), c('she recorded everything', 'lo anotó todo')],
    {
      target: 'Maya bought a small notebook to record places she wanted to visit.',
      es: 'Maya compró una libreta pequeña para anotar sitios que quería visitar.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'verbo' }),

  en('en-a2-126', 'word', 'palabra', 'sustantivo', 'word',
    [c('new words', 'palabras nuevas'), c('a technical word', 'una palabra técnica'), c('in your own words', 'con tus palabras')],
    {
      target: 'To remember new words, I started a small notebook and reviewed five of them each night before sleeping.',
      es: 'Para recordar palabras nuevas, empecé una libreta pequeña y repasaba cinco cada noche antes de dormir.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-127', 'remember', 'recordar / acordarse', 'verbo', 're-MEM-ber',
    [c('remember new words', 'recordar palabras nuevas'), c('easier to remember', 'más fácil de recordar'), c('I don’t remember', 'no me acuerdo')],
    {
      target: 'To remember new words, I started a small notebook and reviewed five of them each night before sleeping.',
      es: 'Para recordar palabras nuevas, empecé una libreta pequeña y repasaba cinco cada noche antes de dormir.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'verbo' }),

  en('en-a2-128', 'vocabulary', 'vocabulario', 'sustantivo', 'vo-CAB-u-lary',
    [c('the science vocabulary', 'el vocabulario de ciencias'), c('learn new vocabulary', 'aprender vocabulario nuevo'), c('difficult vocabulary', 'vocabulario difícil')],
    {
      target: 'I understood most lessons, although I needed extra time with the science vocabulary.',
      es: 'Entendía casi todas las clases, aunque necesitaba tiempo extra con el vocabulario de ciencias.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-129', 'lesson', 'clase / lección', 'sustantivo', 'LES-son',
    [c('most lessons', 'casi todas las clases'), c('a long lesson', 'una clase larga'), c('understand the lesson', 'entender la clase')],
    {
      target: 'I understood most lessons, although I needed extra time with the science vocabulary.',
      es: 'Entendía casi todas las clases, aunque necesitaba tiempo extra con el vocabulario de ciencias.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · Entender y hacerse entender ───────────────────────────────────

const b8unidad3: VocabEntry[] = [
  en('en-a2-130', 'language', 'idioma / lengua', 'sustantivo', 'LAN-guage',
    [c('a second language', 'un segundo idioma'), c('learn a language', 'aprender un idioma'), c('in two languages', 'en dos idiomas')],
    {
      target: 'The museum plans to add a second language to the guide later this year.',
      es: 'El museo piensa añadir un segundo idioma a la guía más adelante este año.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-131', 'later', 'más adelante / después', 'adverbio', 'LA-ter',
    [c('later this year', 'más adelante este año'), c('ten minutes later', 'diez minutos después'), c('see you later', 'hasta luego')],
    {
      target: 'The museum plans to add a second language to the guide later this year.',
      es: 'El museo piensa añadir un segundo idioma a la guía más adelante este año.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'otro' }),

  en('en-a2-132', 'translate', 'traducir', 'verbo', 'trans-LATE',
    [c('without translating', 'sin traducir'), c('translate a word', 'traducir una palabra'), c('she translates everything', 'lo traduce todo')],
    {
      target: 'By Friday, I could order lunch, ask for directions, and join conversations without translating every sentence in my head.',
      es: 'Para el viernes ya podía pedir la comida, preguntar direcciones y meterme en conversaciones sin traducir cada frase en mi cabeza.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'verbo' }),

  en('en-a2-133', 'pronunciation', 'pronunciación', 'sustantivo', 'pro-nun-ci-A-tion',
    [c('laugh at my pronunciation', 'reírse de mi pronunciación'), c('good pronunciation', 'buena pronunciación'), c('correct the pronunciation', 'corregir la pronunciación')],
    {
      target: 'Josh laughed at my pronunciation at first, but he soon began correcting me gently instead.',
      es: 'Josh se rio de mi pronunciación al principio, pero pronto empezó a corregirme con suavidad.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-134', 'correct', 'corregir', 'verbo', 'cor-RECT',
    [c('correct the map', 'corregir el mapa'), c('correct me gently', 'corrígeme con suavidad'), c('nobody corrected it', 'nadie lo corrigió')],
    { target: 'The library is smaller on the map than in real life. Nobody has offered to correct it.', es: 'La biblioteca es más pequeña en el mapa que en la realidad. Nadie se ha ofrecido a corregirlo.', episodio: 18 },
    { tipo: 'verbo' }),

  en('en-a2-135', 'detail', 'detalle', 'sustantivo', 'DE-tail',
    [c('notice details', 'fijarse en los detalles'), c('a small detail', 'un detalle pequeño'), c('explain the details', 'explicar los detalles')],
    {
      target: 'The museum says the guide is designed to help visitors notice details, not to replace the labels beside the objects.',
      es: 'El museo dice que la guía está pensada para que los visitantes se fijen en los detalles, no para sustituir las etiquetas de al lado de los objetos.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-136', 'label', 'etiqueta / cartelito', 'sustantivo', 'LA-bel',
    [c('the labels beside the objects', 'las etiquetas junto a los objetos'), c('read the label', 'leer la etiqueta'), c('clearly labelled', 'claramente etiquetado')],
    {
      target: 'The museum says the guide is designed to help visitors notice details, not to replace the labels beside the objects.',
      es: 'El museo dice que la guía está pensada para que los visitantes se fijen en los detalles, no para sustituir las etiquetas de al lado de los objetos.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-137', 'notice', 'darse cuenta / fijarse', 'verbo', 'NO-tice',
    [c('notice the details', 'fijarse en los detalles'), c('she noticed it late', 'se dio cuenta tarde'), c('nobody noticed', 'nadie se dio cuenta')],
    {
      target: 'She noticed it when the bus arrived, but she did not go back.',
      es: 'Se dio cuenta cuando llegó el autobús, pero no volvió.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'verbo' }),

  en('en-a2-138', 'system', 'sistema', 'sustantivo', 'SYS-tem',
    [c('the colour system', 'el sistema de colores'), c('a new system', 'un sistema nuevo'), c('the system is confusing', 'el sistema es confuso')],
    {
      target: 'After four weeks, fewer bags contained the wrong materials, but some residents said the colour system was confusing at night.',
      es: 'A las cuatro semanas, menos bolsas llevaban materiales equivocados, pero algunos vecinos dijeron que el sistema de colores confundía de noche.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-139', 'accident', 'descuido / accidente', 'sustantivo', 'AC-ci-dent',
    [c('by accident', 'por descuido'), c('a small accident', 'un accidente pequeño'), c('it was an accident', 'fue sin querer')],
    {
      target: 'Last Saturday, Maya left her phone at home by accident.',
      es: 'El sábado pasado, Maya se dejó el teléfono en casa por descuido.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'sustantivo' }),

  // `draw` se quedó fuera de aquí aunque el ep18 lo dice: su única frase lo dice en pasado
  // («somebody drew the park») y la caja 4 ahueca por prefijo, así que no encontraba dónde
  // abrir el hueco. Una palabra cuyo único ejemplo es irregular no puede ser el ejemplo.
  en('en-a2-140', 'confirm', 'confirmar', 'verbo', 'con-FIRM',
    [c('confirm the route', 'confirmar la ruta'), c('confirm by email', 'confirmar por correo'), c('they confirmed it yesterday', 'lo confirmaron ayer')],
    {
      target: 'Each driver will display a printed sign in the front window, so passengers can confirm the temporary route before they board.',
      es: 'Cada conductor pondrá un cartel impreso en la ventanilla delantera, para que los pasajeros confirmen la ruta temporal antes de subir.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'verbo' }),
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
    {
      id: 'comer-fuera-y-restaurante',
      nombre: 'Comer fuera y restaurante',
      icono: '🍽️',
      entradas: [...b6unidad1, ...b6unidad2, ...b6unidad3],
    },
    {
      id: 'trabajo-y-empleo',
      nombre: 'Trabajo y empleo',
      icono: '💼',
      entradas: [...b2unidad1, ...b2unidad2, ...b2unidad3],
    },
    {
      id: 'tecnologia-y-comunicacion',
      nombre: 'Tecnología y comunicación',
      icono: '💻',
      entradas: [...b8unidad1, ...b8unidad2, ...b8unidad3],
    },
  ],
}
