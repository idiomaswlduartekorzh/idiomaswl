import type { Colocacion, FalsoAmigo, VocabEntry, VocabLevel } from './schema'

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

/**
 * Lo que cada ficha declara aparte del acento y las colocaciones.
 *
 * `falsoAmigo` va aquí y no en cada rama porque no depende de la clase de palabra: engañan
 * sustantivos («library»), verbos («attend») y adjetivos («large») por igual. Es opcional a
 * propósito — marcar como trampa lo que no lo es enseña a desconfiar de todo.
 */
type Tipo = ({ tipo: 'sustantivo' } | { tipo: 'verbo'; phrasal?: string[] } | { tipo: 'otro' }) & {
  falsoAmigo?: FalsoAmigo
}
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

  en('en-a2-026', 'anyone', 'alguien (en preguntas y negativas)', 'pronombre', 'AN-y-one',
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
    { tipo: 'verbo', falsoAmigo: {
      pareceEspanol: 'atender',
      significaEnRealidad: 'asistir a, ir a',
      seDiceAsi: 'serve',
    } }),

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
      target: 'The room became busy when a delivery arrived.',
      es: 'La sala se llenó de movimiento cuando llegó un reparto.',
      motivo: 'El turno de voluntariado cuenta la llegada del reparto dentro de una frase que ' +
        'arranca hablando de lo que la voluntaria esperaba encontrar. Se queda solo la escena: la ' +
        'sala llenándose de golpe.',
    },
    { tipo: 'sustantivo' }),
]

// ─── Nota de la auditoría 5.2, 12 ago 2026 ────────────────────────────────────
//
// Nueve fichas de este archivo pasaron de `lectura` a `redactado` porque su frase usaba
// gramática que A2 no enseña: pasado perfecto en `delivery`, `task`, `problem`, `result` y
// `quality`; pasiva en `reason`, `note`, `detail` y `label`. B1 tiene `past-perfect-b1` y
// `passive-voice-b1` como temas propios, así que no es opinable.
//
// El razonamiento gramatical vive aquí y no en los `motivo`: ese texto sale en el tooltip de
// la etiqueta «✎ redactado» y lo lee el estudiante, que no necesita saber en qué banda cae
// una estructura. Los motivos hablan de la historia, como los demás.
//
// El pasado continuo NO entró en esta corrección, aunque también sea B1 en el módulo: lo
// enseñan dos episodios enteros del propio nivel —ep04 y ep17— y está en A2 en Cambridge y en
// el EVP. Lo que falta ahí es el tema de gramática de A2, no otra frase.

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
      target: 'Noor learned a new task on her first day.',
      es: 'Noor aprendió una tarea nueva en su primer día.',
      motivo: 'La entrevista de Noor enumera de un tirón tres cosas que había hecho —resolver, ' +
        'ayudar, aprender— en una sola frase. Aquí se cuenta una, la de la tarea, en su primer día.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-074', 'problem', 'problema', 'sustantivo', 'PROB-lem',
    [c('solve a problem', 'resolver un problema'), c('a small problem', 'un problema pequeño'), c('the problem is the water', 'el problema es el agua')],
    {
      target: 'Noor solved a problem for a customer last week.',
      es: 'Noor resolvió un problema de un cliente la semana pasada.',
      motivo: 'Sale de la misma enumeración que «task», y se separa a propósito: dos fichas con ' +
        'la misma frase se acaban contestando de memoria.',
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
      target: 'She did not know the result until Friday.',
      es: 'No supo el resultado hasta el viernes.',
      motivo: 'Noor sale de la entrevista sin saber el resultado, pero la lectura lo cuenta en ' +
        'una frase que resume toda la entrevista de golpe. Aquí se queda la espera, que es lo que ' +
        'enseña la palabra.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-082', 'quality', 'cualidad / calidad', 'sustantivo', 'QUAL-i-ty',
    [c('describe your qualities', 'describir tus cualidades'), c('the quality of the bread', 'la calidad del pan'), c('her best quality', 'su mejor cualidad')],
    {
      target: 'The manager asked about her best quality.',
      es: 'El responsable preguntó por su mejor cualidad.',
      motivo: 'Comparte frase con «result» en la lectura. Aquí se escribe la pregunta del ' +
        'responsable, que es donde una cualidad se nombra de verdad — y en la acepción de ' +
        '«cualidad», no en la de «calidad».',
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
    { tipo: 'sustantivo', falsoAmigo: {
      pareceEspanol: 'soportar, aguantar',
      significaEnRealidad: 'apoyar, respaldar',
      seDiceAsi: 'put up with',
    } }),

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
      target: 'The team left a short note to explain the reason.',
      es: 'El equipo dejó una nota corta para explicar el motivo.',
      motivo: 'El plan de reciclaje cuenta que el equipo dejaba una nota explicando el motivo, ' +
        'dentro de una frase larga sobre cómo fue la prueba. Se queda la nota y el motivo, que es ' +
        'la escena.',
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

  en('en-a2-107', 'page', 'página (de un sitio o de un libro)', 'sustantivo', 'page',
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

  en('en-a2-112', 'audio', 'audio / grabación', 'sustantivo', 'AU-dio',
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
      target: 'She left a short note on the kitchen table.',
      es: 'Dejó una nota corta en la mesa de la cocina.',
      motivo: 'Comparte escena con «reason» en el plan de reciclaje, y se separa a propósito. ' +
        'Esta se lleva a la mesa de la cocina, que también es del nivel.',
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
    { tipo: 'verbo', falsoAmigo: {
      pareceEspanol: 'recordar',
      significaEnRealidad: 'grabar, dejar por escrito',
      seDiceAsi: 'remember',
    } }),

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
      target: 'The guide helps visitors notice small details.',
      es: 'La guía ayuda a los visitantes a fijarse en los detalles pequeños.',
      motivo: 'La audioguía del museo dice que sirve para fijarse en los detalles, pero en una ' +
        'frase que además habla de las etiquetas. Se queda solo lo de los detalles.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-136', 'label', 'etiqueta / cartelito', 'sustantivo', 'LA-bel',
    [c('the labels beside the objects', 'las etiquetas junto a los objetos'), c('read the label', 'leer la etiqueta'), c('clearly labelled', 'claramente etiquetado')],
    {
      target: 'Every box in the storage room has a label.',
      es: 'Cada caja del almacén tiene una etiqueta.',
      motivo: 'Las dos frases del material con «label» están ocupadas: la del museo enseña los ' +
        'detalles y la del almacén ya enseña «coordinator» y «storage». Se escribe con ese mismo ' +
        'almacén del banco de alimentos.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-137', 'notice', 'darse cuenta / fijarse', 'verbo', 'NO-tice',
    [c('notice the details', 'fijarse en los detalles'), c('she noticed it late', 'se dio cuenta tarde'), c('nobody noticed', 'nadie se dio cuenta')],
    {
      target: 'She noticed it when the bus arrived, but she did not go back.',
      es: 'Se dio cuenta cuando llegó el autobús, pero no volvió.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'verbo', falsoAmigo: {
      pareceEspanol: 'noticia',
      significaEnRealidad: 'darse cuenta, fijarse',
      seDiceAsi: 'news',
    } }),

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

// ═══ BLOQUE 9 · Ocio, planes y tiempo libre ════════════════════════════════════
//
// El sábado de artistas (ep19), el préstamo de libros de la biblioteca (ep08) y la audioguía
// del museo dan el bloque casi entero. La tercera unidad se va a lo que uno **dice** de un
// plan —pensar, esperar, la idea, la gente— porque un nivel A2 planea hablando, no listando.

// ─── Unidad 1 · Planes y quedadas ─────────────────────────────────────────────

const b9unidad1: VocabEntry[] = [
  en('en-a2-141', 'plan', 'plan / proyecto', 'sustantivo', 'plan',
    [c('keep the plan', 'mantener el plan'), c('a clearer plan', 'un plan más claro'), c('change the plan', 'cambiar el plan')],
    {
      target: 'The council will add brighter signs before deciding whether to keep the plan.',
      es: 'El ayuntamiento pondrá carteles más visibles antes de decidir si mantiene el plan.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-142', 'invite', 'invitar', 'verbo', 'in-VITE',
    [c('invite three artists', 'invitar a tres artistas'), c('invite the neighbours', 'invitar a los vecinos'), c('they invited me', 'me invitaron')],
    { target: 'Next Saturday we’re going to invite three artists. Two of them teach at the school and one paints walls.', es: 'El sábado que viene vamos a invitar a tres artistas. Dos dan clase en el colegio y uno pinta paredes.', episodio: 19 },
    { tipo: 'verbo' }),

  en('en-a2-143', 'artist', 'artista', 'sustantivo', 'AR-tist',
    [c('three artists', 'tres artistas'), c('a local artist', 'un artista del barrio'), c('the artist paints walls', 'el artista pinta paredes')],
    { target: 'Next Saturday we’re going to invite three artists. Two of them teach at the school and one paints walls.', es: 'El sábado que viene vamos a invitar a tres artistas. Dos dan clase en el colegio y uno pinta paredes.', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a2-144', 'event', 'evento', 'sustantivo', 'e-VENT',
    [c('books for the event', 'libros para el evento'), c('organise an event', 'organizar un evento'), c('a free event', 'un evento gratis')],
    { target: 'The library will lend you twenty more books for the event.', es: 'La biblioteca os prestará veinte libros más para el evento.', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a2-145', 'playlist', 'lista de canciones', 'sustantivo', 'PLAY-list',
    [c('make a playlist', 'preparar una lista de canciones'), c('a quiet playlist', 'una lista tranquila'), c('the afternoon playlist', 'la lista de la tarde')],
    { target: 'I’m going to make a playlist for the afternoon. Nothing louder than a conversation.', es: 'Voy a preparar una lista de canciones para la tarde. Nada más alto que una conversación.', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a2-146', 'conversation', 'conversación', 'sustantivo', 'con-ver-SA-tion',
    [c('louder than a conversation', 'más alto que una conversación'), c('join a conversation', 'meterse en una conversación'), c('a long conversation', 'una conversación larga')],
    { target: 'I’m going to make a playlist for the afternoon. Nothing louder than a conversation.', es: 'Voy a preparar una lista de canciones para la tarde. Nada más alto que una conversación.', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a2-147', 'place', 'sitio / lugar', 'sustantivo', 'place',
    [c('open this place', 'abrir este sitio'), c('a quiet place', 'un sitio tranquilo'), c('our usual meeting place', 'donde quedamos siempre')],
    { target: 'Why did you decide to open this place?', es: '¿Por qué decidiste abrir este sitio?', episodio: 14 },
    { tipo: 'sustantivo' }),

  en('en-a2-148', 'spot', 'punto / rincón', 'sustantivo', 'spot',
    [c('the best spot', 'el mejor punto'), c('a good spot for photos', 'un buen sitio para fotos'), c('find a spot', 'encontrar un rincón')],
    { target: 'The taxi driver added the best spot for the sunset.', es: 'El taxista añadió el mejor sitio para ver el atardecer.', episodio: 18 },
    { tipo: 'sustantivo' }),

  en('en-a2-149', 'centre', 'centro (cívico)', 'sustantivo', 'CEN-tre',
    [c('the community centre', 'el centro cívico'), c('the sports centre', 'el polideportivo'), c('the centre provides the tools', 'el centro pone las herramientas')],
    {
      target: 'The community centre cooking class starts next Tuesday at six thirty.',
      es: 'La clase de cocina del centro cívico empieza el martes que viene a las seis y media.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-150', 'bike', 'bici', 'sustantivo', 'bike',
    [c('come by bike', 'venir en bici'), c('wait with his bike', 'esperar con la bici'), c('a new bike', 'una bici nueva')],
    { target: 'My brother wants some cake. He asked twice. He’s waiting outside with his bike.', es: 'Mi hermano quiere pastel. Lo ha pedido dos veces. Está esperando fuera con la bici.', episodio: 10 },
    { tipo: 'sustantivo' }),

  en('en-a2-151', 'twice', 'dos veces', 'adverbio', 'twice',
    [c('he asked twice', 'lo pidió dos veces'), c('twice a week', 'dos veces por semana'), c('I wrote it twice', 'lo escribí dos veces')],
    { target: 'My brother wants some cake. He asked twice. He’s waiting outside with his bike.', es: 'Mi hermano quiere pastel. Lo ha pedido dos veces. Está esperando fuera con la bici.', episodio: 10 },
    { tipo: 'otro' }),

  en('en-a2-152', 'sports', 'deportes / deportivo', 'adjetivo', 'sports',
    [c('the sports centre', 'el polideportivo'), c('a sports club', 'un club deportivo'), c('sports clothes', 'ropa de deporte')],
    {
      target: 'From two until six, it will stop at Oak Street and the sports centre, but it will not stop at Hill Farm or the old bridge.',
      es: 'De dos a seis parará en Oak Street y en el polideportivo, pero no parará en Hill Farm ni en el puente viejo.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'otro' }),
]

// ─── Unidad 2 · Museo, teatro y biblioteca ────────────────────────────────────

const b9unidad2: VocabEntry[] = [
  en('en-a2-153', 'visitor', 'visitante', 'sustantivo', 'VIS-i-tor',
    [c('a guide for visitors', 'una guía para visitantes'), c('visitors can borrow it', 'los visitantes pueden cogerlo prestado'), c('the first visitors', 'los primeros visitantes')],
    {
      target: 'The City Museum has introduced a free audio guide for visitors aged twelve and over.',
      es: 'El Museo de la Ciudad ha estrenado una audioguía gratuita para visitantes de doce años en adelante.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-154', 'companion', 'acompañante', 'sustantivo', 'com-PAN-ion',
    [c('discuss it with a companion', 'comentarlo con un acompañante'), c('a good companion', 'buena compañía'), c('bring a companion', 'venir acompañado')],
    {
      target: 'Each stop lasts between three and five minutes and includes one question to discuss with a companion.',
      es: 'Cada parada dura entre tres y cinco minutos e incluye una pregunta para comentar con un acompañante.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-155', 'discuss', 'comentar / debatir', 'verbo', 'dis-CUSS',
    [c('discuss one question', 'comentar una pregunta'), c('discuss the plan', 'debatir el plan'), c('we discussed it yesterday', 'lo comentamos ayer')],
    {
      target: 'Each stop lasts between three and five minutes and includes one question to discuss with a companion.',
      es: 'Cada parada dura entre tres y cinco minutos e incluye una pregunta para comentar con un acompañante.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'verbo', falsoAmigo: {
      pareceEspanol: 'discutir, pelear',
      significaEnRealidad: 'hablar de algo entre varios',
      seDiceAsi: 'argue',
    } }),

  en('en-a2-156', 'picture', 'imagen / dibujo', 'sustantivo', 'PIC-ture',
    [c('the picture trail', 'el recorrido de imágenes'), c('draw a picture', 'hacer un dibujo'), c('pictures of the bakery', 'imágenes de la panadería')],
    {
      target: 'Families with younger children can use the picture trail instead.',
      es: 'Las familias con niños pequeños pueden usar el recorrido de imágenes en su lugar.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-157', 'trail', 'recorrido / ruta señalizada', 'sustantivo', 'trail',
    [c('the picture trail', 'el recorrido de imágenes'), c('follow the trail', 'seguir el recorrido'), c('a short trail', 'un recorrido corto')],
    {
      target: 'Families with younger children can use the picture trail instead.',
      es: 'Las familias con niños pequeños pueden usar el recorrido de imágenes en su lugar.',
      lectura: 'en-a2-museum-audio-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-158', 'theatre', 'teatro', 'sustantivo', 'THEA-tre',
    [c('a local theatre', 'un teatro del barrio'), c('go to the theatre', 'ir al teatro'), c('visit a theatre', 'visitar un teatro')],
    {
      target: 'On Wednesday, our class visited a local theatre.',
      es: 'El miércoles, nuestra clase visitó un teatro del barrio.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-159', 'exchange', 'intercambio', 'sustantivo', 'ex-CHANGE',
    [c('a school exchange', 'un intercambio escolar'), c('go on an exchange', 'irse de intercambio'), c('the exchange lasts a month', 'el intercambio dura un mes')],
    {
      target: 'When I arrived in Leeds for the school exchange, I expected to feel lonely.',
      es: 'Cuando llegué a Leeds para el intercambio escolar, esperaba sentirme sola.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-160', 'football', 'fútbol', 'sustantivo', 'FOOT-ball',
    [c('a football match', 'un partido de fútbol'), c('play football', 'jugar al fútbol'), c('watch the football', 'ver el fútbol')],
    {
      target: 'Instead, my host family invited me to a neighbourhood football match on the first evening.',
      es: 'En cambio, mi familia de acogida me invitó a un partido de fútbol del barrio la primera tarde.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-161', 'match', 'partido', 'sustantivo', 'match',
    [c('a football match', 'un partido de fútbol'), c('win the match', 'ganar el partido'), c('the match starts at six', 'el partido empieza a las seis')],
    {
      target: 'Instead, my host family invited me to a neighbourhood football match on the first evening.',
      es: 'En cambio, mi familia de acogida me invitó a un partido de fútbol del barrio la primera tarde.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-162', 'title', 'título', 'sustantivo', 'TI-tle',
    [c('read the titles', 'leer los títulos'), c('the title of the book', 'el título del libro'), c('a long title', 'un título largo')],
    { target: 'I will put a small list of books on every table, so people can read the titles before they sit down.', es: 'Pondré una lista pequeña de libros en cada mesa, para que la gente lea los títulos antes de sentarse.', episodio: 8 },
    { tipo: 'sustantivo' }),

  en('en-a2-163', 'choose', 'elegir', 'verbo', 'choose',
    [c('which books people choose', 'qué libros elige la gente'), c('choose between two', 'elegir entre dos'), c('she chose it in a market', 'la eligió en un mercado')],
    { target: 'And I’ll bring the list to the library every month. I’ll tell you which books people choose.', es: 'Y traeré la lista a la biblioteca cada mes. Te diré qué libros elige la gente.', episodio: 8 },
    { tipo: 'verbo' }),

  en('en-a2-164', 'replace', 'reponer / sustituir', 'verbo', 're-PLACE',
    [c('I’ll replace it', 'lo repongo'), c('replace the labels', 'sustituir las etiquetas'), c('replace a broken cup', 'reponer una taza rota')],
    { target: 'They’ll read here. If somebody takes one, I’ll replace it.', es: 'Leerán aquí. Si alguien se lleva uno, lo repongo.', episodio: 8 },
    { tipo: 'verbo' }),
]

// ─── Unidad 3 · Lo que uno dice del plan ──────────────────────────────────────

const b9unidad3: VocabEntry[] = [
  en('en-a2-165', 'steal', 'robar', 'verbo', 'steal',
    [c('steal a book', 'robar un libro'), c('nobody will steal it', 'nadie lo va a robar'), c('somebody stole the key', 'alguien robó la llave')],
    { target: 'I think this will work. Nobody in this street will steal a book.', es: 'Creo que esto funcionará. Nadie en esta calle robará un libro.', episodio: 8 },
    { tipo: 'verbo' }),

  en('en-a2-166', 'hope', 'esperar (desear)', 'verbo', 'hope',
    [c('I hope nobody fixes it', 'espero que nadie lo arregle'), c('I hope so', 'eso espero'), c('hope for good weather', 'esperar que haga bueno')],
    { target: 'And much more beautiful. I hope nobody ever fixes the scale.', es: 'Y mucho más bonito. Espero que nadie arregle nunca la escala.', episodio: 18 },
    { tipo: 'verbo' }),

  en('en-a2-167', 'ever', 'alguna vez / nunca', 'adverbio', 'EV-er',
    [c('nobody ever fixes it', 'nadie lo arregla nunca'), c('have you ever been there?', '¿has estado alguna vez?'), c('the best I’ve ever had', 'el mejor que he tenido')],
    { target: 'And much more beautiful. I hope nobody ever fixes the scale.', es: 'Y mucho más bonito. Espero que nadie arregle nunca la escala.', episodio: 18 },
    { tipo: 'otro' }),

  en('en-a2-168', 'usually', 'normalmente / suele', 'adverbio', 'U-su-al-ly',
    // Nada de «the best things usually are»: es el ejemplo entero y deja la caja 5 sin salida.
    [c('I usually walk', 'normalmente voy andando'), c('usually after lunch', 'normalmente después de comer'), c('what we usually do', 'lo que solemos hacer')],
    { target: 'The best things usually are.', es: 'Las mejores cosas suelen serlo.', episodio: 6 },
    { tipo: 'otro' }),

  en('en-a2-169', 'midday', 'mediodía', 'sustantivo', 'mid-DAY',
    [c('at midday', 'a mediodía'), c('before midday', 'antes de mediodía'), c('the midday soup', 'la sopa del mediodía')],
    {
      target: 'At midday, the café across the street will provide soup and bread.',
      es: 'A mediodía, el café de enfrente pondrá sopa y pan.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-170', 'person', 'persona', 'sustantivo', 'PER-son',
    [c('one person asked', 'una persona preguntó'), c('a nice person', 'una persona agradable'), c('two people came', 'vinieron dos personas')],
    { target: 'Nobody has. One person has asked for more chairs. They came on Saturday, they say.', es: 'Nadie. Una persona ha pedido más sillas. Vinieron el sábado, dicen.', episodio: 16 },
    { tipo: 'sustantivo' }),

  // Aquí iba `anyone`, y el bloque 7 ya se había llevado toda la familia —`somebody`,
  // `everyone`, `nobody`, `anyone`—. Una palabra vive en un solo sitio, también dentro del
  // mismo nivel.
  en('en-a2-171', 'bad', 'malo', 'adjetivo', 'bad',
    [c('say something bad', 'decir algo malo'), c('the bad news', 'la mala noticia'), c('a bad review', 'una reseña mala')],
    { target: 'Has anyone said anything bad?', es: '¿Alguien ha dicho algo malo?', episodio: 16 },
    { tipo: 'otro' }),

  en('en-a2-172', 'think', 'pensar / creer', 'verbo', 'think',
    [c('people will think that', 'la gente pensará eso'), c('I think it will work', 'creo que funcionará'), c('think about it', 'piénsalo')],
    { target: 'It’s also stranger. People will think we sell tiles.', es: 'También es más raro. La gente pensará que vendemos baldosas.', episodio: 5 },
    { tipo: 'verbo' }),

  en('en-a2-173', 'idea', 'idea / ocurrencia', 'sustantivo', 'i-DE-a',
    [c('a lot of ideas', 'muchas ideas'), c('a good idea', 'una buena idea'), c('better than my idea', 'mejor que mi idea')],
    { target: 'That’s better than my idea.', es: 'Eso es mejor que mi idea.', episodio: 5 },
    { tipo: 'sustantivo' }),

  en('en-a2-174', 'grow', 'crecer', 'verbo', 'grow',
    [c('it grows faster', 'crece más rápido'), c('the list grows every week', 'la lista crece cada semana'), c('grow herbs', 'cultivar hierbas')],
    { target: 'Every customer adds one place. It grows faster than we expected. We started it with three streets and a pencil.', es: 'Cada cliente añade un sitio. Crece más rápido de lo que esperábamos. Lo empezamos con tres calles y un lápiz.', episodio: 18 },
    { tipo: 'verbo' }),

  en('en-a2-175', 'life', 'vida / realidad', 'sustantivo', 'life',
    [c('in real life', 'en la vida real'), c('my life here', 'mi vida aquí'), c('life in the neighbourhood', 'la vida del barrio')],
    { target: 'The library is smaller on the map than in real life. Nobody has offered to correct it.', es: 'La biblioteca es más pequeña en el mapa que en la realidad. Nadie se ha ofrecido a corregirlo.', episodio: 18 },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 5 · Describir personas y carácter ══════════════════════════════════
//
// La medición previa daba **3 de 15** y anunciaba un bloque casi entero de redactados. Estaba
// mal, y conviene decir por qué: las quince candidatas eran las de siempre —alto, bajo,
// simpático, amable, tímido— y ninguna está en la serie. Pero la serie **sí** describe a la
// gente; lo que pasa es que lo hace con otras palabras.
//
// El nivel tiene un episodio entero de comparativos (ep05, ep06, ep18) y otro entero de
// adverbios de modo (ep15). De ahí sale el bloque completo, sin una sola frase inventada: no
// cómo es alguien de cara, sino cómo es de carácter y **cómo hace las cosas**.
//
// La lección para los otros veintitrés niveles: medir con la lista de candidatas equivocada
// dice que el tema no está cuando lo que no está es esa lista.

// ─── Unidad 1 · Cómo es alguien ───────────────────────────────────────────────

const b5unidad1: VocabEntry[] = [
  en('en-a2-176', 'honest', 'honesto / sincero', 'adjetivo', 'HON-est',
    [c('the most honest map', 'el mapa más honesto'), c('an honest answer', 'una respuesta sincera'), c('be honest with me', 'sé sincero conmigo')],
    { target: 'That’s the most honest map in this city.', es: 'Ese es el mapa más honesto de esta ciudad.', episodio: 18 },
    { tipo: 'otro' }),

  en('en-a2-177', 'natural', 'natural / espontáneo', 'adjetivo', 'NAT-u-ral',
    [c('sound natural', 'sonar natural'), c('a natural answer', 'una respuesta espontánea'), c('it feels natural', 'suena natural')],
    {
      target: 'She did not memorise long answers because she wanted to sound natural.',
      es: 'No memorizó respuestas largas porque quería sonar natural.',
      lectura: 'en-a2-first-job-interview',
    },
    { tipo: 'otro' }),

  en('en-a2-178', 'patience', 'paciencia', 'sustantivo', 'PA-tience',
    [c('more patience', 'más paciencia'), c('have patience', 'tener paciencia'), c('lose patience', 'perder la paciencia')],
    { target: 'You need fewer plates and more patience. A café is not a shop full of plates.', es: 'Necesitáis menos platos y más paciencia. Un café no es una tienda llena de platos.', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a2-179', 'trust', 'fiarse de / confiar', 'verbo', 'trust',
    [c('trust the empty plates', 'fiarse de los platos vacíos'), c('I trust her', 'confío en ella'), c('never trusted reviews', 'nunca se fio de las reseñas')],
    { target: 'I have never trusted reviews. I trust the empty plates.', es: 'Yo nunca me he fiado de las reseñas. Me fío de los platos vacíos.', episodio: 16 },
    { tipo: 'verbo' }),

  en('en-a2-180', 'busy', 'ocupado / liado', 'adjetivo', 'BU-sy',
    [c('we were busy', 'estábamos liados'), c('a busy morning', 'una mañana de mucho trabajo'), c('the busiest hours', 'las horas de más trabajo')],
    { target: 'So somebody took it while we were busy.', es: 'O sea que alguien la cogió mientras estábamos liados.', episodio: 17 },
    { tipo: 'otro' }),

  en('en-a2-181', 'tiring', 'agotador', 'adjetivo', 'TIR-ing',
    [c('a tiring shift', 'un turno agotador'), c('the work is tiring', 'el trabajo es agotador'), c('less tiring than before', 'menos agotador que antes')],
    {
      target: 'The shift was tiring, yet it made the community’s organisation visible to me.',
      es: 'El turno fue agotador, pero me hizo ver la organización del barrio.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'otro' }),

  en('en-a2-182', 'lonely', 'solo (de soledad)', 'adjetivo', 'LONE-ly',
    [c('feel lonely', 'sentirse solo'), c('a lonely evening', 'una tarde de soledad'), c('less lonely than I expected', 'menos solo de lo que esperaba')],
    {
      target: 'When I arrived in Leeds for the school exchange, I expected to feel lonely.',
      es: 'Cuando llegué a Leeds para el intercambio escolar, esperaba sentirme sola.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'otro' }),

  en('en-a2-183', 'nervous', 'nervioso', 'adjetivo', 'NER-vous',
    [c('feel nervous', 'estar nervioso'), c('nervous before the interview', 'nervioso antes de la entrevista'), c('a bit nervous', 'un poco nervioso')],
    {
      target: 'At first, she felt nervous because she could not check the map or message her friend Sam.',
      es: 'Al principio se puso nerviosa porque no podía mirar el mapa ni escribir a su amigo Sam.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'otro' }),

  en('en-a2-184', 'calm', 'tranquilo / sereno', 'adjetivo', 'calm',
    [c('longer and calmer', 'más largo y más tranquilo'), c('stay calm', 'mantener la calma'), c('a calm morning', 'una mañana tranquila')],
    {
      target: 'On the bus home, she realised that the day had felt longer and calmer.',
      es: 'En el autobús de vuelta se dio cuenta de que el día se le había hecho más largo y más tranquilo.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'otro' }),

  en('en-a2-185', 'strange', 'raro / extraño', 'adjetivo', 'strange',
    [c('it’s also stranger', 'también es más raro'), c('a strange name', 'un nombre raro'), c('stranger than the others', 'más raro que los demás')],
    { target: 'It’s also stranger. People will think we sell tiles.', es: 'También es más raro. La gente pensará que vendemos baldosas.', episodio: 5 },
    { tipo: 'otro' }),

  en('en-a2-186', 'interesting', 'interesante', 'adjetivo', 'IN-ter-est-ing',
    [c('more interesting than both', 'más interesante que los dos'), c('an interesting story', 'una historia interesante'), c('the most interesting part', 'la parte más interesante')],
    { target: '“The Old Tiles” is more interesting than both.', es: '«The Old Tiles» es más interesante que los dos.', episodio: 5 },
    { tipo: 'otro' }),

  en('en-a2-187', 'difficult', 'difícil', 'adjetivo', 'DIF-fi-cult',
    [c('the most difficult to clean', 'lo más difícil de limpiar'), c('a difficult word', 'una palabra difícil'), c('difficult for beginners', 'difícil para principiantes')],
    { target: 'And the most difficult to clean.', es: 'Y la más difícil de limpiar.', episodio: 6 },
    { tipo: 'otro' }),
]

// ─── Unidad 2 · Cómo se siente y cómo reacciona ───────────────────────────────

const b5unidad2: VocabEntry[] = [
  en('en-a2-188', 'smile', 'sonreír', 'verbo', 'smile',
    [c('she was smiling', 'venía sonriendo'), c('smile at the customers', 'sonreír a los clientes'), c('a big smile', 'una gran sonrisa')],
    { target: 'A customer came back at four. She was smiling and she had the key in her hand.', es: 'Una clienta volvió a las cuatro. Venía sonriendo y traía la llave en la mano.', episodio: 17 },
    { tipo: 'verbo' }),

  en('en-a2-189', 'laugh', 'reírse', 'verbo', 'laugh',
    [c('I was not laughing', 'no me estaba riendo'), c('laugh at a joke', 'reírse de un chiste'), c('he laughed at first', 'se rio al principio')],
    { target: 'I was holding two towels and a bucket at the same time, and I was not laughing.', es: 'Yo sostenía dos toallas y un cubo a la vez, y no me estaba riendo.', episodio: 4 },
    { tipo: 'verbo' }),

  en('en-a2-190', 'behave', 'portarse / comportarse', 'verbo', 'be-HAVE',
    [c('behave perfectly', 'portarse perfectamente'), c('behave well', 'portarse bien'), c('the dog behaved all morning', 'el perro se portó toda la mañana')],
    { target: 'And Max behaved perfectly all morning.', es: 'Y Max se portó perfectamente toda la mañana.', episodio: 15 },
    { tipo: 'verbo' }),

  en('en-a2-191', 'regret', 'arrepentirse de', 'verbo', 're-GRET',
    [c('regret leaving the job', 'arrepentirse de dejar el trabajo'), c('I don’t regret it', 'no me arrepiento'), c('she regrets nothing', 'no se arrepiente de nada')],
    { target: 'Do you regret leaving your old job?', es: '¿Te arrepientes de haber dejado tu antiguo trabajo?', episodio: 14 },
    { tipo: 'verbo' }),

  en('en-a2-192', 'realise', 'darse cuenta', 'verbo', 'RE-a-lise',
    [c('she realised it later', 'se dio cuenta después'), c('realise the day was calmer', 'darse cuenta de que el día fue más tranquilo'), c('I didn’t realise', 'no me di cuenta')],
    {
      target: 'On the bus home, she realised that the day had felt longer and calmer.',
      es: 'En el autobús de vuelta se dio cuenta de que el día se le había hecho más largo y más tranquilo.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'verbo', falsoAmigo: {
      pareceEspanol: 'realizar, llevar a cabo',
      significaEnRealidad: 'darse cuenta',
      seDiceAsi: 'carry out',
    } }),

  en('en-a2-193', 'hurry', 'meter prisa / darse prisa', 'verbo', 'HUR-ry',
    [c('you can’t hurry bread', 'al pan no se le mete prisa'), c('hurry up', 'date prisa'), c('don’t hurry the tutor', 'no metas prisa al monitor')],
    { target: 'I’ve learned to wait. Bread taught me that. You can’t hurry bread.', es: 'He aprendido a esperar. Eso me lo enseñó el pan. Al pan no se le mete prisa.', episodio: 14 },
    { tipo: 'verbo' }),

  en('en-a2-194', 'careful', 'cuidadoso / con cuidado', 'adjetivo', 'CARE-ful',
    [c('be careful with the boxes', 'ten cuidado con las cajas'), c('a careful answer', 'una respuesta cuidada'), c('careful with the paint', 'cuidado con la pintura')],
    { target: 'The paint was still wet, so we were all very careful with the boxes near the door.', es: 'La pintura seguía mojada, así que íbamos todos con mucho cuidado con las cajas de la puerta.', episodio: 4 },
    { tipo: 'otro' }),

  en('en-a2-195', 'gently', 'con suavidad / con tacto', 'adverbio', 'GEN-tly',
    [c('correct me gently', 'corrígeme con tacto'), c('speak gently', 'hablar con suavidad'), c('close the door gently', 'cerrar la puerta con cuidado')],
    {
      target: 'Josh laughed at my pronunciation at first, but he soon began correcting me gently instead.',
      es: 'Josh se rio de mi pronunciación al principio, pero pronto empezó a corregirme con suavidad.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'otro' }),

  en('en-a2-196', 'safe', 'a salvo / seguro', 'adjetivo', 'safe',
    [c('keep them safe', 'cuidarlos'), c('a safe place', 'un sitio seguro'), c('the key is safe', 'la llave está a salvo')],
    { target: 'The library will lend you twenty books. They are old, but nobody reads them here. Will you keep them safe?', es: 'La biblioteca te prestará veinte libros. Son antiguos, pero aquí no los lee nadie. ¿Los cuidarás?', episodio: 8 },
    { tipo: 'otro' }),

  en('en-a2-197', 'different', 'distinto / diferente', 'adjetivo', 'DIF-fer-ent',
    [c('different needs', 'necesidades distintas'), c('a different route', 'otra ruta'), c('that’s different', 'eso es otra cosa')],
    {
      target: 'Later, I helped pack boxes for families with different needs.',
      es: 'Después ayudé a llenar cajas para familias con necesidades distintas.',
      lectura: 'en-a2-weekend-volunteer-shift',
    },
    { tipo: 'otro' }),

  en('en-a2-198', 'clear', 'claro', 'adjetivo', 'clear',
    [c('a clearer plan', 'un plan más claro'), c('a clear example', 'un ejemplo claro'), c('make it clear', 'dejarlo claro')],
    {
      target: 'Last month, the council tested a clearer plan.',
      es: 'El mes pasado, el ayuntamiento probó un plan más claro.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'otro' }),

  en('en-a2-199', 'bright', 'llamativo / luminoso', 'adjetivo', 'bright',
    [c('brighter signs', 'carteles más llamativos'), c('the brightest corner', 'el rincón más luminoso'), c('a bright colour', 'un color llamativo')],
    {
      target: 'The council will add brighter signs before deciding whether to keep the plan.',
      es: 'El ayuntamiento pondrá carteles más visibles antes de decidir si mantiene el plan.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'otro' }),
]

// ─── Unidad 3 · Cómo se hace algo ─────────────────────────────────────────────

const b5unidad3: VocabEntry[] = [
  en('en-a2-200', 'carefully', 'con cuidado', 'adverbio', 'CARE-ful-ly',
    [c('I moved carefully', 'me moví con cuidado'), c('read it carefully', 'leerlo con cuidado'), c('look carefully', 'mirar con atención')],
    { target: 'I moved carefully. That’s not the same as fast.', es: 'Me moví con cuidado. Eso no es lo mismo que rápido.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a2-201', 'fast', 'rápido', 'adjetivo', 'fast',
    [c('the same as fast', 'lo mismo que rápido'), c('a fast answer', 'una respuesta rápida'), c('it grows fast', 'crece rápido')],
    { target: 'I moved carefully. That’s not the same as fast.', es: 'Me moví con cuidado. Eso no es lo mismo que rápido.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a2-202', 'quietly', 'en silencio', 'adverbio', 'QUI-et-ly',
    [c('come in quietly', 'entrar en silencio'), c('work quietly', 'trabajar en silencio'), c('close it quietly', 'cerrarlo sin ruido')],
    { target: 'The first customers came in quietly and looked around slowly. Nobody said a word for five minutes.', es: 'Los primeros clientes entraron en silencio y miraron despacio. Nadie dijo una palabra en cinco minutos.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a2-203', 'slowly', 'despacio', 'adverbio', 'SLOW-ly',
    [c('look around slowly', 'mirar despacio'), c('speak slowly', 'hablar despacio'), c('each step slowly', 'cada paso despacio')],
    { target: 'The first customers came in quietly and looked around slowly. Nobody said a word for five minutes.', es: 'Los primeros clientes entraron en silencio y miraron despacio. Nadie dijo una palabra en cinco minutos.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a2-204', 'softly', 'bajito / con suavidad', 'adverbio', 'SOFT-ly',
    [c('people spoke softly', 'la gente hablaba bajito'), c('play the music softly', 'poner la música bajita'), c('say it softly', 'decirlo bajito')],
    { target: 'The room worked well. People spoke softly, like in a library. Even the coffee machine sounded quieter.', es: 'La sala funcionó bien. La gente hablaba bajito, como en una biblioteca. Hasta la máquina de café sonaba más suave.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a2-205', 'perfectly', 'perfectamente', 'adverbio', 'PER-fect-ly',
    [c('behave perfectly', 'portarse perfectamente'), c('it works perfectly', 'funciona perfectamente'), c('he slept perfectly', 'durmió perfectamente')],
    { target: 'And Max behaved perfectly all morning.', es: 'Y Max se portó perfectamente toda la mañana.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a2-206', 'easily', 'con facilidad', 'adverbio', 'EAS-i-ly',
    [c('the bread sold easily', 'el pan se vendió fácil'), c('learn it easily', 'aprenderlo con facilidad'), c('it breaks easily', 'se rompe con facilidad')],
    { target: 'The bread sold easily. It always did.', es: 'El pan se vendió fácil. Siempre fue así.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a2-207', 'beautiful', 'bonito / precioso', 'adjetivo', 'BEAU-ti-ful',
    [c('the most beautiful part', 'la parte más bonita'), c('a beautiful map', 'un mapa precioso'), c('much more beautiful', 'mucho más bonito')],
    { target: 'This is the most beautiful part of the room now. The wood looks different in the morning light.', es: 'Ahora esta es la parte más bonita de la sala. La madera se ve distinta con la luz de la mañana.', episodio: 6 },
    { tipo: 'otro' }),

  en('en-a2-208', 'colourful', 'colorido', 'adjetivo', 'COL-our-ful',
    [c('the most colourful thing', 'lo más colorido'), c('a colourful map', 'un mapa colorido'), c('less colourful than the menu', 'menos colorido que el menú')],
    { target: 'This map is the most colourful thing on the wall. It has more colours than the menu.', es: 'Este mapa es lo más colorido de la pared. Tiene más colores que el menú.', episodio: 18 },
    { tipo: 'otro' }),

  en('en-a2-209', 'useful', 'útil', 'adjetivo', 'USE-ful',
    [c('more useful than the app', 'más útil que la aplicación'), c('useful information', 'información útil'), c('a useful word', 'una palabra útil')],
    { target: 'It’s more useful than the app on my phone.', es: 'Es más útil que la aplicación de mi teléfono.', episodio: 18 },
    { tipo: 'otro' }),

  en('en-a2-210', 'heavy', 'pesado', 'adjetivo', 'HEAV-y',
    [c('the heaviest thing', 'lo más pesado'), c('heavy bags', 'bolsas pesadas'), c('heavy rain', 'lluvia fuerte')],
    { target: 'It’s the heaviest thing in the room too.', es: 'También es lo más pesado de la sala.', episodio: 6 },
    { tipo: 'otro' }),
]

// ═══ BLOQUE 3 · Compras, dinero y trámites ═════════════════════════════════════
//
// **Primer bloque de A2 con frases redactadas: diez de treinta y cinco.** Y el motivo es
// concreto, no general: en los veinte episodios y los diez textos **nadie paga nunca**. Se
// habla del alquiler, del bote y de los noventa dólares, pero no hay una sola escena de caja
// —ni efectivo, ni vuelta, ni recibo, ni cola—, así que las palabras del acto de comprar hay
// que escribirlas.
//
// Lo que sí da el material es la otra mitad del tema: el papeleo del barrio (el ayuntamiento,
// el recordatorio, la recogida) y los números y las cantidades, que en A2 son los que
// permiten discutir un precio.
//
// Los diez redactados se encuentran con:
//
//   grep -n "motivo:" src/data/practica/vocabulario/ingles-a2.ts

// ─── Unidad 1 · En la tienda y el mercado ─────────────────────────────────────

const b3unidad1: VocabEntry[] = [
  en('en-a2-211', 'market', 'mercado', 'sustantivo', 'MAR-ket',
    [c('at the market', 'en el mercado'), c('buy it in a market', 'comprarlo en un mercado'), c('the Sunday market', 'el mercado del domingo')],
    { target: 'This is the oldest table in the family. Your grandmother chose it in a market in 1968.', es: 'Esta es la mesa más antigua de la familia. La eligió tu abuela en un mercado en 1968.', episodio: 6 },
    { tipo: 'sustantivo' }),

  en('en-a2-212', 'stall', 'puesto (de mercado)', 'sustantivo', 'stall',
    [c('look at the stalls', 'mirar los puestos'), c('a fruit stall', 'un puesto de fruta'), c('the stall opens at eight', 'el puesto abre a las ocho')],
    {
      target: 'Without their phones, they looked carefully at the stalls, talked to the sellers, and tried a new fruit drink.',
      es: 'Sin sus teléfonos, miraron los puestos con calma, hablaron con los vendedores y probaron una bebida de fruta nueva.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-213', 'seller', 'vendedor / vendedora', 'sustantivo', 'SELL-er',
    [c('talk to the sellers', 'hablar con los vendedores'), c('ask the seller', 'preguntar al vendedor'), c('a friendly seller', 'un vendedor amable')],
    {
      target: 'Without their phones, they looked carefully at the stalls, talked to the sellers, and tried a new fruit drink.',
      es: 'Sin sus teléfonos, miraron los puestos con calma, hablaron con los vendedores y probaron una bebida de fruta nueva.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-214', 'list', 'lista', 'sustantivo', 'list',
    [c('the book list', 'la lista de libros'), c('make a shopping list', 'hacer la lista de la compra'), c('a waiting list', 'una lista de espera')],
    { target: 'Two students walked straight to the book list and read it carefully. They asked if they could take one to the table.', es: 'Dos estudiantes fueron directos a la lista de libros y la leyeron con cuidado. Preguntaron si podían llevar uno a la mesa.', episodio: 15 },
    { tipo: 'sustantivo' }),

  en('en-a2-215', 'basket', 'cesta', 'sustantivo', 'BAS-ket',
    [c('a small basket', 'una cesta pequeña'), c('leave a basket at the door', 'dejar una cesta en la puerta'), c('fill the basket', 'llenar la cesta')],
    {
      target: 'On Saturday 3 June, we will leave a small basket at each door with local information, tea, and a map.',
      es: 'El sábado 3 de junio dejaremos una cesta pequeña en cada puerta con información del barrio, té y un mapa.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-216', 'spare', 'de sobra / de repuesto', 'adjetivo', 'spare',
    [c('spare boxes', 'cajas de sobra'), c('a spare key', 'una llave de repuesto'), c('spare parts', 'piezas de repuesto')],
    {
      target: 'Anyone with spare boxes or garden pots can leave them, clearly labelled, in the hall.',
      es: 'Quien tenga cajas o macetas de sobra puede dejarlas, bien etiquetadas, en el portal.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'otro' }),

  en('en-a2-217', 'cash', 'efectivo', 'sustantivo', 'cash',
    [c('pay in cash', 'pagar en efectivo'), c('I have no cash', 'no llevo efectivo'), c('cash or card', 'efectivo o tarjeta')],
    {
      target: 'We pay the rent in cash because the machine is broken.',
      es: 'Pagamos el alquiler en efectivo porque la máquina está estropeada.',
      motivo:
        'En los veinte episodios y los diez textos nadie paga: se habla del alquiler y del bote, ' +
        'pero no hay una sola escena de caja. La frase se escribe con el alquiler y la máquina, ' +
        'que sí son del nivel, para que suene a la misma historia.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-218', 'receipt', 'recibo', 'sustantivo', 're-CEIPT',
    [c('ask for a receipt', 'pedir un recibo'), c('keep the receipt', 'guardar el recibo'), c('the receipt is in the bag', 'el recibo está en la bolsa')],
    {
      target: 'Keep the receipt if you want to return it.',
      es: 'Guarda el recibo si quieres devolverlo.',
      motivo: 'Mismo motivo que «cash»: sin escena de caja no hay recibo en ningún sitio del nivel.',
    },
    { tipo: 'sustantivo' }),

  // Aquí iba «change» con el sentido de «la vuelta», y no puede ser: el bloque 7 ya enseña
  // «change» como verbo, y una palabra vive en un solo sitio aunque cambie de acepción. Se
  // resuelve con «coin», que es lo que de verdad se cuenta en el bote del ep11.
  en('en-a2-219', 'coin', 'moneda', 'sustantivo', 'coin',
    [c('count the coins', 'contar las monedas'), c('a coin in the jar', 'una moneda en el bote'), c('I have no coins', 'no llevo monedas')],
    {
      target: 'She gave me two coins and a small paper bag.',
      es: 'Me dio dos monedas y una bolsa de papel pequeña.',
      motivo:
        'El bote del ep11 se cuenta en dólares, nunca en monedas, y en todo el nivel no hay una ' +
        'sola escena de caja. La frase se escribe con la bolsa de papel para que suene a mercado.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-220', 'discount', 'descuento', 'sustantivo', 'DIS-count',
    [c('ask for a discount', 'pedir un descuento'), c('a ten per cent discount', 'un descuento del diez por ciento'), c('with a student discount', 'con descuento de estudiante')],
    {
      target: 'The seller gave us a discount because we bought two.',
      es: 'El vendedor nos hizo un descuento porque compramos dos.',
      motivo: 'Nadie negocia un precio en el nivel; lo más cerca es que el dueño baja el alquiler, y eso ya lo enseña «lower».',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-221', 'sale', 'rebajas / oferta', 'sustantivo', 'sale',
    [c('in the sales', 'en rebajas'), c('a summer sale', 'unas rebajas de verano'), c('it was on sale', 'estaba de oferta')],
    {
      target: 'I bought this jacket in the January sales.',
      es: 'Compré esta chaqueta en las rebajas de enero.',
      motivo: 'La serie vende pan y café a precio fijo; no hay rebajas ni ofertas en ninguna escena.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-222', 'queue', 'cola / fila', 'sustantivo', 'queue',
    [c('wait in the queue', 'esperar en la cola'), c('a long queue', 'una cola larga'), c('join the queue', 'ponerse a la cola')],
    {
      target: 'There was a long queue outside the bakery on Saturday.',
      es: 'El sábado había una cola larga fuera de la panadería.',
      motivo:
        'En el nivel la gente espera fuera —«somebody is always waiting outside»— pero nunca se ' +
        'la llama cola. La frase usa esa misma escena para que el estudiante la reconozca.',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · Dinero, cuentas y cantidades ──────────────────────────────────

const b3unidad2: VocabEntry[] = [
  en('en-a2-223', 'accounting', 'contabilidad', 'sustantivo', 'ac-COUNT-ing',
    [c('the only accounting we have', 'toda nuestra contabilidad'), c('do the accounting', 'llevar la contabilidad'), c('simple accounting', 'contabilidad sencilla')],
    { target: 'We have a lot of ideas and very little money. The jar is the only accounting we have.', es: 'Tenemos muchas ideas y muy poco dinero. El bote es toda nuestra contabilidad.', episodio: 11 },
    { tipo: 'sustantivo' }),

  // «fewer» quería la frase de «You need fewer plates…», y esa ya enseñaba dos —«full» en el
  // bloque 6 y «patience» en el 5—. Se resuelve con la otra frase del mismo episodio, que dice
  // «a few cups»: la palabra que el A2 necesita de verdad no es el comparativo, es «a few».
  en('en-a2-224', 'few', 'unos cuantos / pocos', 'adjetivo', 'few',
    [c('a few cups', 'unas cuantas tazas'), c('a few minutes', 'unos minutos'), c('only a few people', 'solo unas pocas personas')],
    { target: 'We have a few cups, but we don’t have many plates.', es: 'Tenemos unas cuantas tazas, pero no tenemos muchos platos.', episodio: 11 },
    { tipo: 'otro' }),

  en('en-a2-225', 'whole', 'entero / todo un', 'adjetivo', 'whole',
    [c('a whole month', 'todo un mes'), c('the whole street', 'la calle entera'), c('the whole shop', 'todo el local')],
    { target: 'Ninety dollars. That’s not much for a whole month, and the rent takes half of it.', es: 'Noventa dólares. No es mucho para todo un mes, y el alquiler se lleva la mitad.', episodio: 11 },
    { tipo: 'otro' }),

  en('en-a2-226', 'lower', 'bajar (un precio)', 'verbo', 'LOW-er',
    [c('he lowered the rent', 'bajó el alquiler'), c('lower the price', 'bajar el precio'), c('they lowered it again', 'lo bajaron otra vez')],
    { target: 'It’s low. Nobody rented it for two years, so we talked and he lowered it.', es: 'Es bajo. Nadie lo alquiló en dos años, así que hablamos y lo bajó.', episodio: 1 },
    { tipo: 'verbo' }),

  en('en-a2-227', 'twelve', 'doce', 'numero', 'TWELVE',
    [c('twelve chairs', 'doce sillas'), c('twelve minutes', 'doce minutos'), c('twelve stops', 'doce paradas')],
    { target: 'We’ve never had more than twelve chairs. Twelve is what fits between the tables.', es: 'Nunca hemos tenido más de doce sillas. Doce es lo que cabe entre las mesas.', episodio: 16 },
    { tipo: 'otro' }),

  en('en-a2-228', 'sixty', 'sesenta', 'numero', 'SIX-ty',
    [c('sixty loaves', 'sesenta hogazas'), c('sixty dollars', 'sesenta dólares'), c('sixty minutes', 'sesenta minutos')],
    { target: 'Monthly? That’s going to be a lot of bread. Sixty loaves, maybe more.', es: '¿Mensual? Eso va a ser mucho pan. Sesenta hogazas, quizá más.', episodio: 19 },
    { tipo: 'otro' }),

  en('en-a2-229', 'monthly', 'mensual', 'adjetivo', 'MONTH-ly',
    [c('a monthly event', 'un evento mensual'), c('a monthly bill', 'una factura mensual'), c('monthly or weekly', 'mensual o semanal')],
    { target: 'Monthly? That’s going to be a lot of bread. Sixty loaves, maybe more.', es: '¿Mensual? Eso va a ser mucho pan. Sesenta hogazas, quizá más.', episodio: 19 },
    { tipo: 'otro' }),

  en('en-a2-230', 'second', 'segundo', 'adjetivo', 'SEC-ond',
    [c('a second group', 'un segundo grupo'), c('the second time', 'la segunda vez'), c('a second language', 'un segundo idioma')],
    {
      target: 'Because places are limited, the centre keeps a short waiting list and opens a second group on Thursday whenever enough people ask.',
      es: 'Como las plazas son limitadas, el centro tiene una lista de espera corta y abre un segundo grupo el jueves cuando lo pide bastante gente.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'otro' }),

  en('en-a2-231', 'limited', 'limitado', 'adjetivo', 'LIM-it-ed',
    [c('places are limited', 'las plazas son limitadas'), c('a limited offer', 'una oferta limitada'), c('limited to twenty people', 'limitado a veinte personas')],
    {
      target: 'Because places are limited, the centre keeps a short waiting list and opens a second group on Thursday whenever enough people ask.',
      es: 'Como las plazas son limitadas, el centro tiene una lista de espera corta y abre un segundo grupo el jueves cuando lo pide bastante gente.',
      lectura: 'en-a2-cooking-class-reminder',
    },
    { tipo: 'otro' }),

  en('en-a2-232', 'part', 'pieza / parte', 'sustantivo', 'part',
    [c('the right part', 'la pieza que hace falta'), c('a spare part', 'una pieza de repuesto'), c('the best part', 'la mejor parte')],
    { target: 'He fixed two pipes, but he didn’t finish the third one, because he didn’t have the right part.', es: 'Arregló dos tuberías, pero no terminó la tercera, porque no tenía la pieza.', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a2-233', 'third', 'tercero', 'adjetivo', 'third',
    [c('the third one', 'la tercera'), c('the third day', 'el tercer día'), c('a third of the money', 'un tercio del dinero')],
    { target: 'He fixed two pipes, but he didn’t finish the third one, because he didn’t have the right part.', es: 'Arregló dos tuberías, pero no terminó la tercera, porque no tenía la pieza.', episodio: 3 },
    { tipo: 'otro' }),

  en('en-a2-234', 'add', 'añadir', 'verbo', 'add',
    [c('add one place', 'añadir un sitio'), c('add a second language', 'añadir un segundo idioma'), c('the driver added it', 'lo añadió el taxista')],
    { target: 'The taxi driver added the best spot for the sunset.', es: 'El taxista añadió el mejor sitio para ver el atardecer.', episodio: 18 },
    { tipo: 'verbo' }),
]

// ─── Unidad 3 · Papeles y trámites ────────────────────────────────────────────

const b3unidad3: VocabEntry[] = [
  en('en-a2-235', 'council', 'ayuntamiento', 'sustantivo', 'COUN-cil',
    [c('the council tested it', 'el ayuntamiento lo probó'), c('write to the council', 'escribir al ayuntamiento'), c('a council plan', 'un plan del ayuntamiento')],
    {
      target: 'Last month, the council tested a clearer plan.',
      es: 'El mes pasado, el ayuntamiento probó un plan más claro.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-236', 'reminder', 'recordatorio / aviso', 'sustantivo', 're-MIND-er',
    [c('a reminder card', 'una tarjeta de aviso'), c('send a reminder', 'mandar un recordatorio'), c('a friendly reminder', 'un aviso amable')],
    {
      target: 'A reminder card explained what could not go in the bags.',
      es: 'Una tarjeta de aviso explicaba qué no podía ir en las bolsas.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-237', 'receive', 'recibir', 'verbo', 're-CEIVE',
    [c('each street received a colour', 'cada calle recibió un color'), c('receive an email', 'recibir un correo'), c('I received it yesterday', 'lo recibí ayer')],
    {
      target: 'Each street received a colour and a collection day.',
      es: 'Cada calle recibió un color y un día de recogida.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'verbo' }),

  en('en-a2-238', 'collection', 'recogida', 'sustantivo', 'col-LEC-tion',
    [c('a collection day', 'un día de recogida'), c('the collection team', 'el equipo de recogida'), c('miss the collection', 'perder la recogida')],
    {
      target: 'Each street received a colour and a collection day.',
      es: 'Cada calle recibió un color y un día de recogida.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-239', 'paper', 'papel / documento', 'sustantivo', 'PA-per',
    [c('sign the papers', 'firmar los papeles'), c('a paper ticket', 'un billete de papel'), c('paper and cardboard', 'papel y cartón')],
    { target: 'I signed the papers yesterday. The owner wanted a fast answer, so I decided on the same day.', es: 'Firmé los papeles ayer. El dueño quería una respuesta rápida, así que decidí el mismo día.', episodio: 1 },
    { tipo: 'sustantivo' }),

  en('en-a2-240', 'yesterday', 'ayer', 'adverbio', 'YES-ter-day',
    [c('I signed it yesterday', 'lo firmé ayer'), c('yesterday morning', 'ayer por la mañana'), c('the day before yesterday', 'anteayer')],
    { target: 'I signed the papers yesterday. The owner wanted a fast answer, so I decided on the same day.', es: 'Firmé los papeles ayer. El dueño quería una respuesta rápida, así que decidí el mismo día.', episodio: 1 },
    { tipo: 'otro' }),

  en('en-a2-241', 'already', 'ya', 'adverbio', 'al-READ-y',
    [c('he has already put it', 'ya lo ha puesto'), c('they’ve already told us', 'ya nos lo han dicho'), c('already washing', 'ya está lavando')],
    { target: 'Grandpa has already put his key on the wall.', es: 'El abuelo ya ha puesto su llave en la pared.', episodio: 9 },
    { tipo: 'otro' }),

  en('en-a2-242', 'form', 'formulario', 'sustantivo', 'form',
    [c('fill in a form', 'rellenar un formulario'), c('sign the form', 'firmar el formulario'), c('a short form', 'un formulario corto')],
    {
      target: 'You have to fill in a form before you can use the room.',
      es: 'Tienes que rellenar un formulario antes de poder usar la sala.',
      motivo:
        'El nivel firma papeles (ep01) pero nunca rellena nada. La frase se escribe con la sala ' +
        'del centro cívico, que sí es del material, y con «have to», que el ep12 ya enseña.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-243', 'document', 'documento', 'sustantivo', 'DOC-u-ment',
    [c('bring your documents', 'trae tus documentos'), c('an important document', 'un documento importante'), c('read the document', 'leer el documento')],
    {
      target: 'Bring your documents if you want to open an account.',
      es: 'Trae tus documentos si quieres abrir una cuenta.',
      motivo: 'Ningún personaje hace una gestión oficial en todo el nivel; lo más cerca son los papeles de la panadería, que ya enseña «paper».',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-244', 'appointment', 'cita', 'sustantivo', 'ap-POINT-ment',
    [c('make an appointment', 'pedir cita'), c('an appointment on Monday', 'una cita el lunes'), c('cancel the appointment', 'anular la cita')],
    {
      target: 'I made an appointment for Monday morning.',
      es: 'Pedí cita para el lunes por la mañana.',
      motivo: 'En el nivel la gente queda de palabra —«their usual meeting place»— y nadie pide cita en ninguna parte.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-245', 'refund', 'devolución del dinero', 'sustantivo', 'RE-fund',
    [c('ask for a refund', 'pedir la devolución'), c('a full refund', 'la devolución completa'), c('they gave me a refund', 'me devolvieron el dinero')],
    {
      target: 'They gave us a refund because the machine did not work.',
      es: 'Nos devolvieron el dinero porque la máquina no funcionaba.',
      motivo: 'Sin escena de caja tampoco hay devoluciones. La frase reutiliza la máquina de café del ep09.',
    },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 1 · Viajes y transporte ════════════════════════════════════════════
//
// **El bloque con más redactados del nivel: diecinueve de treinta y cinco.** El motivo se ve
// de un vistazo: *Sam’s Corner* transcurre entero en una manzana. Hay un autobús que cambia de
// ruta por la lluvia, un taxista que añade un sitio al mapa y una biblioteca a la vuelta de la
// esquina — y nada más. Nadie coge un avión, nadie duerme en un hotel, nadie factura una
// maleta, y por eso el aeropuerto, el vuelo, el equipaje y el retraso hay que escribirlos.
//
// Es el mismo hallazgo que dejó el bloque 5 de A1 con el cuerpo humano, y conviene anotarlo
// otra vez: **una ficción cuenta lo que sus personajes hacen**. Si el temario necesita un
// aeropuerto, el corpus tiene que tener un episodio de aeropuerto.
//
// Lo que el material sí da es la primera unidad entera: moverse por el barrio, la ruta del
// autobús que cambia, el puente cortado, el taxi. Eso sale sin inventar nada.

// ─── Unidad 1 · Moverse por el barrio ─────────────────────────────────────────

const b1unidad1: VocabEntry[] = [
  en('en-a2-246', 'route', 'ruta / recorrido', 'sustantivo', 'route',
    [c('a different route', 'otra ruta'), c('the normal route', 'la ruta de siempre'), c('check the bus route', 'mirar la ruta del autobús')],
    {
      target: 'Because heavy rain has flooded the road beside Hill Farm, bus 18 will use a different route this afternoon.',
      es: 'Como la lluvia fuerte ha inundado la carretera de al lado de Hill Farm, el autobús 18 usará otra ruta esta tarde.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-247', 'road', 'carretera', 'sustantivo', 'road',
    [c('the road beside the farm', 'la carretera de al lado de la granja'), c('cross the road', 'cruzar la carretera'), c('the road is closed', 'la carretera está cortada')],
    {
      target: 'Because heavy rain has flooded the road beside Hill Farm, bus 18 will use a different route this afternoon.',
      es: 'Como la lluvia fuerte ha inundado la carretera de al lado de Hill Farm, el autobús 18 usará otra ruta esta tarde.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-248', 'bridge', 'puente', 'sustantivo', 'bridge',
    [c('the old bridge', 'el puente viejo'), c('cross the bridge', 'cruzar el puente'), c('the bridge is closed', 'el puente está cortado')],
    {
      target: 'From two until six, it will stop at Oak Street and the sports centre, but it will not stop at Hill Farm or the old bridge.',
      es: 'De dos a seis parará en Oak Street y en el polideportivo, pero no parará en Hill Farm ni en el puente viejo.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-249', 'farm', 'granja', 'sustantivo', 'farm',
    [c('going to the farm', 'que van a la granja'), c('the road beside the farm', 'la carretera de al lado de la granja'), c('work on a farm', 'trabajar en una granja')],
    {
      target: 'Passengers going to the farm should leave the bus at Oak Street and walk for about twelve minutes.',
      es: 'Los pasajeros que vayan a la granja deben bajarse en Oak Street y andar unos doce minutos.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-250', 'transport', 'transporte', 'sustantivo', 'TRANS-port',
    [c('the transport office', 'la oficina de transporte'), c('public transport', 'el transporte público'), c('call the transport office', 'llamar a la oficina de transporte')],
    {
      target: 'The transport office expects the normal route to return tomorrow morning, if the water level falls.',
      es: 'La oficina de transporte espera que la ruta de siempre vuelva mañana por la mañana, si baja el nivel del agua.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-251', 'return', 'volver / regresar', 'verbo', 're-TURN',
    [c('the route will return', 'la ruta volverá'), c('return tomorrow morning', 'volver mañana por la mañana'), c('return the key', 'devolver la llave')],
    {
      target: 'The transport office expects the normal route to return tomorrow morning, if the water level falls.',
      es: 'La oficina de transporte espera que la ruta de siempre vuelva mañana por la mañana, si baja el nivel del agua.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'verbo' }),

  en('en-a2-252', 'taxi', 'taxi (el coche)', 'sustantivo', 'TAX-i',
    [c('a taxi link', 'un enlace en taxi'), c('take a taxi', 'coger un taxi'), c('the taxi driver', 'el taxista')],
    {
      target: 'Anyone with heavy bags or reduced mobility can call the transport office and ask about a short taxi link from Oak Street.',
      es: 'Quien lleve bolsas pesadas o tenga movilidad reducida puede llamar a la oficina de transporte y preguntar por un enlace corto en taxi desde Oak Street.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-253', 'mobility', 'movilidad', 'sustantivo', 'mo-BIL-i-ty',
    [c('reduced mobility', 'movilidad reducida'), c('mobility problems', 'problemas de movilidad'), c('people with reduced mobility', 'personas con movilidad reducida')],
    {
      target: 'Anyone with heavy bags or reduced mobility can call the transport office and ask about a short taxi link from Oak Street.',
      es: 'Quien lleve bolsas pesadas o tenga movilidad reducida puede llamar a la oficina de transporte y preguntar por un enlace corto en taxi desde Oak Street.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-254', 'travel', 'viajar', 'verbo', 'TRAV-el',
    [c('before travelling', 'antes de viajar'), c('travel by bus', 'viajar en autobús'), c('she travels every month', 'viaja todos los meses')],
    {
      target: 'Check the website before travelling because another change is possible.',
      es: 'Mira la web antes de viajar porque puede haber otro cambio.',
      lectura: 'en-a2-rainy-day-bus-change',
    },
    { tipo: 'verbo' }),

  en('en-a2-255', 'gate', 'puerta (de acceso)', 'sustantivo', 'gate',
    [c('the main gate', 'la puerta principal'), c('meet at the gate', 'quedar en la puerta'), c('the gate is open', 'la puerta está abierta')],
    {
      target: 'We will meet at the main gate at nine thirty and finish around one.',
      es: 'Quedamos en la puerta principal a las nueve y media y terminamos sobre la una.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-256', 'main', 'principal', 'adjetivo', 'main',
    [c('the main gate', 'la puerta principal'), c('the main street', 'la calle principal'), c('the main problem', 'el problema principal')],
    {
      target: 'We will meet at the main gate at nine thirty and finish around one.',
      es: 'Quedamos en la puerta principal a las nueve y media y terminamos sobre la una.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'otro' }),

  en('en-a2-257', 'direction', 'dirección / indicaciones', 'sustantivo', 'di-REC-tion',
    [c('ask for directions', 'preguntar cómo se llega'), c('in the other direction', 'en la otra dirección'), c('give me directions', 'dime cómo llegar')],
    {
      target: 'By Friday, I could order lunch, ask for directions, and join conversations without translating every sentence in my head.',
      es: 'Para el viernes ya podía pedir la comida, preguntar direcciones y meterme en conversaciones sin traducir cada frase en mi cabeza.',
      lectura: 'en-a2-school-exchange-diary',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · Aparcar, cargar y salir ───────────────────────────────────────

const b1unidad2: VocabEntry[] = [
  en('en-a2-258', 'van', 'furgoneta', 'sustantivo', 'van',
    [c('the removal vans', 'las furgonetas de la mudanza'), c('a small van', 'una furgoneta pequeña'), c('the van is outside', 'la furgoneta está fuera')],
    {
      target: 'The group also asks everyone to keep the two visitor parking spaces free during that weekend, so the removal vans have room to unload.',
      es: 'El grupo también pide a todo el mundo que deje libres las dos plazas de visitantes ese fin de semana, para que las furgonetas de la mudanza tengan sitio para descargar.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-259', 'parking', 'aparcamiento', 'sustantivo', 'PARK-ing',
    [c('two parking spaces', 'dos plazas de aparcamiento'), c('free parking', 'aparcamiento gratis'), c('look for parking', 'buscar aparcamiento')],
    {
      target: 'The group also asks everyone to keep the two visitor parking spaces free during that weekend, so the removal vans have room to unload.',
      es: 'El grupo también pide a todo el mundo que deje libres las dos plazas de visitantes ese fin de semana, para que las furgonetas de la mudanza tengan sitio para descargar.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-260', 'past', 'por delante de', 'preposicion', 'past',
    [c('walk past the door', 'pasar por delante de la puerta'), c('past the bridge', 'pasado el puente'), c('drive past the farm', 'pasar en coche por la granja')],
    { target: 'I walked past this door for twenty years. I never looked inside. I always crossed the street before the corner.', es: 'Pasé por esta puerta durante veinte años. Nunca miré adentro. Siempre cruzaba la calle antes de la esquina.', episodio: 1 },
    { tipo: 'otro' }),

  en('en-a2-261', 'stay', 'quedarse / alojarse', 'verbo', 'stay',
    [c('the table stays here', 'la mesa se queda aquí'), c('stay at a hotel', 'alojarse en un hotel'), c('we stayed two nights', 'nos quedamos dos noches')],
    { target: 'If it rains, we’ll move the small tables inside. The big table stays where it is.', es: 'Si llueve, metemos las mesas pequeñas dentro. La mesa grande se queda donde está.', episodio: 13 },
    { tipo: 'verbo' }),

  en('en-a2-262', 'trip', 'viaje (corto)', 'sustantivo', 'trip',
    [c('a day trip', 'una excursión de un día'), c('go on a trip', 'irse de viaje'), c('a short trip', 'un viaje corto')],
    {
      target: 'We are going on a school trip next month.',
      es: 'Nos vamos de viaje escolar el mes que viene.',
      motivo: 'La serie no sale de la manzana: no hay ningún viaje en veinte episodios. Sin «trip» el bloque no puede nombrar su propio tema.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-263', 'journey', 'trayecto', 'sustantivo', 'JOUR-ney',
    [c('a long journey', 'un trayecto largo'), c('the journey home', 'el trayecto de vuelta'), c('the journey takes an hour', 'el trayecto dura una hora')],
    {
      target: 'The journey to the airport takes forty minutes by bus.',
      es: 'El trayecto al aeropuerto se hace en cuarenta minutos en autobús.',
      motivo: 'El único trayecto del nivel son doce minutos andando desde Oak Street, y ahí la palabra no aparece.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-264', 'airport', 'aeropuerto', 'sustantivo', 'AIR-port',
    [c('go to the airport', 'ir al aeropuerto'), c('at the airport', 'en el aeropuerto'), c('the airport bus', 'el autobús del aeropuerto')],
    {
      target: 'We arrived at the airport two hours early.',
      es: 'Llegamos al aeropuerto dos horas antes.',
      motivo: 'Nadie coge un avión en todo el nivel. El aeropuerto, el vuelo y la maleta son el hueco que deja una historia de barrio.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-265', 'flight', 'vuelo', 'sustantivo', 'flight',
    [c('a cheap flight', 'un vuelo barato'), c('book a flight', 'reservar un vuelo'), c('the flight is late', 'el vuelo va con retraso')],
    {
      target: 'Our flight leaves at six in the morning.',
      es: 'Nuestro vuelo sale a las seis de la mañana.',
      motivo: 'Mismo hueco que «airport»: la serie transcurre entera en una manzana.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-266', 'plane', 'avión', 'sustantivo', 'plane',
    [c('take a plane', 'coger un avión'), c('by plane', 'en avión'), c('the plane was full', 'el avión iba lleno')],
    {
      target: 'The plane was full, but we found two seats together.',
      es: 'El avión iba lleno, pero encontramos dos asientos juntos.',
      motivo:
        'Mismo hueco que «airport» y «flight»: en los veinte episodios el transporte más lejano ' +
        'es el autobús 18, y en los diez textos no aparece ningún avión. La frase se escribe con ' +
        '«full», que sí sale del ep11 y del ep13.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-267', 'luggage', 'equipaje', 'sustantivo', 'LUG-gage',
    [c('hand luggage', 'equipaje de mano'), c('collect your luggage', 'recoger el equipaje'), c('too much luggage', 'demasiado equipaje')],
    {
      target: 'You can take one bag as hand luggage.',
      es: 'Puedes llevar una bolsa como equipaje de mano.',
      motivo: 'Lo más parecido en el material son «heavy bags» en el autobús 18, y ahí la palabra que se usa es «bags», que ya está en A1.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-268', 'suitcase', 'maleta', 'sustantivo', 'SUIT-case',
    [c('pack a suitcase', 'hacer la maleta'), c('a heavy suitcase', 'una maleta pesada'), c('my suitcase is blue', 'mi maleta es azul')],
    {
      target: 'I packed my suitcase the night before.',
      es: 'Hice la maleta la noche antes.',
      motivo: 'Nadie hace una maleta en el nivel. Se escribe con «pack», que sí sale del turno de voluntariado.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-269', 'hotel', 'hotel / alojamiento', 'sustantivo', 'ho-TEL',
    [c('stay at a hotel', 'alojarse en un hotel'), c('book a hotel', 'reservar un hotel'), c('a cheap hotel', 'un hotel barato')],
    {
      target: 'We stayed at a small hotel near the station.',
      es: 'Nos alojamos en un hotel pequeño cerca de la estación.',
      motivo: 'Todo el mundo duerme en su casa en los veinte episodios; el único alojamiento del nivel es la familia de acogida del intercambio.',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · Reservar, esperar y llegar ────────────────────────────────────

const b1unidad3: VocabEntry[] = [
  en('en-a2-270', 'booking', 'reserva', 'sustantivo', 'BOOK-ing',
    [c('make a booking', 'hacer una reserva'), c('change the booking', 'cambiar la reserva'), c('the booking is for two', 'la reserva es para dos')],
    {
      target: 'I made the booking online last week.',
      es: 'Hice la reserva por internet la semana pasada.',
      motivo: 'En el nivel nadie reserva nada: la clase de cocina se cancela, no se reserva.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-271', 'seat', 'asiento / plaza', 'sustantivo', 'seat',
    [c('two seats together', 'dos asientos juntos'), c('a window seat', 'un asiento de ventanilla'), c('there are no seats left', 'no quedan asientos')],
    {
      target: 'There were no seats left on the last bus.',
      es: 'No quedaban asientos en el último autobús.',
      motivo: 'El nivel cuenta sillas —doce, las que caben entre las mesas— pero nunca asientos de un transporte.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-272', 'delay', 'retraso', 'sustantivo', 'de-LAY',
    [c('a long delay', 'un retraso largo'), c('without delay', 'sin retraso'), c('the delay was two hours', 'el retraso fue de dos horas')],
    {
      target: 'There was a delay because of the heavy rain.',
      es: 'Hubo un retraso por la lluvia fuerte.',
      motivo: 'El autobús 18 cambia de ruta por la lluvia, pero el texto no la llama retraso. Se escribe con esa misma lluvia.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-273', 'traffic', 'tráfico', 'sustantivo', 'TRAF-fic',
    [c('heavy traffic', 'mucho tráfico'), c('stuck in traffic', 'atascado en el tráfico'), c('the traffic is bad today', 'hay mal tráfico hoy')],
    {
      target: 'There is a lot of traffic on the main road today.',
      es: 'Hay mucho tráfico en la carretera principal hoy.',
      motivo: 'La calle del local está siempre tranquila; no hay una sola escena de tráfico en el nivel.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-274', 'abroad', 'al extranjero / en el extranjero', 'adverbio', 'a-BROAD',
    [c('travel abroad', 'viajar al extranjero'), c('live abroad', 'vivir en el extranjero'), c('study abroad', 'estudiar fuera')],
    {
      target: 'My sister is going to study abroad next year.',
      es: 'Mi hermana va a estudiar fuera el año que viene.',
      motivo: 'El intercambio escolar del texto es lo más lejos que llega alguien, y ni siquiera ahí se usa la palabra.',
    },
    { tipo: 'otro' }),

  en('en-a2-275', 'arrival', 'llegada', 'sustantivo', 'ar-RIV-al',
    [c('the arrival time', 'la hora de llegada'), c('on arrival', 'a la llegada'), c('check the arrivals', 'mirar las llegadas')],
    {
      target: 'The arrival time is on the ticket.',
      es: 'La hora de llegada está en el billete.',
      motivo: 'El verbo «arrive» ya está en A1; el sustantivo, que es lo que se lee en un panel, no aparece en ningún sitio del A2.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-276', 'departure', 'salida', 'sustantivo', 'de-PAR-ture',
    [c('the departure time', 'la hora de salida'), c('the departure board', 'el panel de salidas'), c('before departure', 'antes de la salida')],
    {
      target: 'We looked at the departure board twice.',
      es: 'Miramos el panel de salidas dos veces.',
      motivo: 'Mismo hueco que «arrival»: el nivel no tiene ninguna estación ni panel de salidas.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-277', 'motorway', 'autopista', 'sustantivo', 'MO-tor-way',
    [c('on the motorway', 'en la autopista'), c('leave the motorway', 'salir de la autopista'), c('the motorway is closed', 'la autopista está cortada')],
    {
      // Decía «The motorway was closed», que un A2 lee como pasiva aunque aquí fuera un
      // estado, y la pasiva es B1 (auditoría 5.2, 12 ago 2026).
      target: 'The bus left the motorway and took a smaller road.',
      es: 'El autobús salió de la autopista y tomó una carretera más pequeña.',
      motivo: 'La única vía del nivel es una carretera de campo junto a Hill Farm. Se escribe ' +
        'reutilizando el cambio de ruta del autobús 18.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-278', 'tour', 'visita guiada / tour', 'sustantivo', 'tour',
    [c('a guided tour', 'una visita guiada'), c('go on a tour', 'hacer una visita guiada'), c('the tour lasts an hour', 'la visita dura una hora')],
    {
      target: 'The guided tour starts at the main entrance.',
      es: 'La visita guiada empieza en la entrada principal.',
      motivo: 'El museo del texto tiene audioguía, no visita guiada; la palabra no llega a decirse.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-279', 'passport', 'pasaporte', 'sustantivo', 'PASS-port',
    [c('show your passport', 'enseñar el pasaporte'), c('a new passport', 'un pasaporte nuevo'), c('my passport is in the bag', 'mi pasaporte está en la bolsa')],
    {
      target: 'You have to show your passport at the airport.',
      es: 'Tienes que enseñar el pasaporte en el aeropuerto.',
      motivo: 'Nadie cruza una frontera en el nivel. Se escribe con «have to», que el ep12 ya enseña.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-280', 'guest', 'huésped / invitado', 'sustantivo', 'guest',
    [c('a hotel guest', 'un huésped del hotel'), c('welcome the guests', 'recibir a los invitados'), c('we had ten guests', 'tuvimos diez invitados')],
    {
      target: 'The hotel gives every guest a small map of the city.',
      es: 'El hotel da a cada huésped un mapa pequeño de la ciudad.',
      motivo: 'El nivel tiene clientes, vecinos y visitantes, pero ningún huésped, porque no hay alojamiento en ninguna escena.',
    },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 10 · Clima, naturaleza y entorno ═══════════════════════════════════
//
// Diecisiete redactados de treinta y cinco, y el reparto dice exactamente qué tiene el nivel y
// qué no. Del material sale **el entorno de barrio**: el huerto comunitario con sus hojas
// secas, sus hierbas, sus macetas y sus guantes, y el plan de reciclaje con el vidrio, el
// metal y los materiales. Eso son dieciocho palabras sin inventar nada.
//
// Lo que no hay es **el paisaje y el cielo**. En veinte episodios nadie sale del barrio, así
// que no hay ni un árbol, ni un río, ni una montaña, ni una nube. El A1 ya se llevó `rain`,
// `snow`, `windy`, `sunny`, `hot`, `cold`, `warm`, `weather`, `winter`, `sea` y `garden`, que
// era lo poco de cielo que el corpus daba.

// ─── Unidad 1 · El tiempo que hace ────────────────────────────────────────────

const b10unidad1: VocabEntry[] = [
  en('en-a2-281', 'forecast', 'pronóstico', 'sustantivo', 'FORE-cast',
    [c('the weather forecast', 'el pronóstico del tiempo'), c('the forecast says rain', 'el pronóstico da lluvia'), c('check the forecast', 'mirar el pronóstico')],
    { target: 'If it rains on Saturday, what will we do? The forecast says rain all weekend.', es: 'Si llueve el sábado, ¿qué hacemos? El pronóstico da lluvia todo el fin de semana.', episodio: 13 },
    { tipo: 'sustantivo' }),

  en('en-a2-282', 'storm', 'tormenta', 'sustantivo', 'storm',
    [c('unless there is a storm', 'a no ser que haya tormenta'), c('a big storm', 'una tormenta fuerte'), c('the storm is coming', 'viene la tormenta')],
    {
      target: 'The weather forecast says there may be light rain, so we will work unless there is a storm.',
      es: 'El pronóstico dice que puede caer lluvia floja, así que trabajaremos a no ser que haya tormenta.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-283', 'unless', 'a no ser que / salvo que', 'conector', 'un-LESS',
    [c('unless there is a storm', 'a no ser que haya tormenta'), c('unless they invite you', 'salvo que te inviten'), c('unless it rains', 'a no ser que llueva')],
    {
      target: 'The weather forecast says there may be light rain, so we will work unless there is a storm.',
      es: 'El pronóstico dice que puede caer lluvia floja, así que trabajaremos a no ser que haya tormenta.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'otro' }),

  en('en-a2-284', 'wet', 'mojado', 'adjetivo', 'wet',
    [c('the paint was wet', 'la pintura estaba mojada'), c('wet clothes', 'ropa mojada'), c('wet shoes', 'zapatos mojados')],
    { target: 'The paint was still wet, so we were all very careful with the boxes near the door.', es: 'La pintura seguía mojada, así que íbamos todos con mucho cuidado con las cajas de la puerta.', episodio: 4 },
    { tipo: 'otro' }),

  en('en-a2-285', 'dry', 'seco', 'adjetivo', 'dry',
    [c('dry leaves', 'hojas secas'), c('a dry morning', 'una mañana seca'), c('the paint is dry', 'la pintura está seca')],
    {
      target: 'First, we are going to remove dry leaves and prepare four planting areas.',
      es: 'Primero vamos a quitar las hojas secas y preparar cuatro zonas de plantación.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'otro' }),

  en('en-a2-286', 'sky', 'cielo', 'sustantivo', 'sky',
    [c('a grey sky', 'un cielo gris'), c('look at the sky', 'mirar al cielo'), c('the sky is clear', 'el cielo está despejado')],
    {
      target: 'The sky was grey all morning, but it did not rain.',
      es: 'El cielo estuvo gris toda la mañana, pero no llovió.',
      motivo:
        'En veinte episodios nadie mira al cielo: la serie transcurre dentro de un local. El A1 ya ' +
        'se llevó «rain», «snow», «windy» y «sunny», que era lo poco de tiempo atmosférico que el ' +
        'corpus daba. La frase usa «grey», que sí está en A1.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-287', 'cloud', 'nube', 'sustantivo', 'cloud',
    [c('grey clouds', 'nubes grises'), c('there are no clouds', 'no hay nubes'), c('a cloud of dust', 'una nube de polvo')],
    {
      target: 'There were big grey clouds over the street.',
      es: 'Había nubes grises grandes sobre la calle.',
      motivo: 'Mismo hueco que «sky»: el nivel habla de lluvia y de tormenta, pero nunca describe el cielo.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-288', 'sun', 'sol', 'sustantivo', 'sun',
    [c('in the sun', 'al sol'), c('the sun comes out', 'sale el sol'), c('sit in the sun', 'sentarse al sol')],
    {
      target: 'We put two tables outside when the sun comes out.',
      es: 'Sacamos dos mesas fuera cuando sale el sol.',
      motivo:
        'A1 se llevó «sunny» y el A2 no vuelve a nombrar el sol. La frase se escribe con las mesas ' +
        'de fuera, que sí son del ep13.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-289', 'wind', 'viento', 'sustantivo', 'wind',
    [c('a strong wind', 'un viento fuerte'), c('the wind is cold', 'el viento es frío'), c('wind and rain', 'viento y lluvia')],
    {
      target: 'The wind was very strong on Saturday morning.',
      es: 'El viento fue muy fuerte el sábado por la mañana.',
      motivo: 'A1 enseña «windy» como adjetivo; el sustantivo no aparece en ninguna frase del A2.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-290', 'fog', 'niebla', 'sustantivo', 'fog',
    [c('thick fog', 'niebla espesa'), c('there is fog', 'hay niebla'), c('fog in the morning', 'niebla por la mañana')],
    {
      target: 'There was fog on the road beside the farm.',
      es: 'Había niebla en la carretera de al lado de la granja.',
      motivo: 'El único fenómeno del nivel es la lluvia. Se escribe con la carretera de Hill Farm, que sí es del texto del autobús.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-291', 'ice', 'hielo', 'sustantivo', 'ice',
    [c('ice on the road', 'hielo en la carretera'), c('ice in the drink', 'hielo en la bebida'), c('the ice is thin', 'el hielo es fino')],
    {
      target: 'There was ice on the street early in the morning.',
      es: 'Había hielo en la calle temprano por la mañana.',
      motivo: 'A1 tiene «snow» y «cold», pero el hielo no aparece en ninguno de los dos niveles.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-292', 'temperature', 'temperatura', 'sustantivo', 'TEM-per-a-ture',
    [c('the temperature falls', 'baja la temperatura'), c('a low temperature', 'una temperatura baja'), c('check the temperature', 'mirar la temperatura')],
    {
      target: 'The temperature falls a lot at night in winter.',
      es: 'La temperatura baja mucho por la noche en invierno.',
      motivo:
        'El nivel dice «warmest corner» y «the water level falls», pero nunca mide nada. La frase ' +
        'reutiliza «falls» y «winter», que sí salen del material.',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · Plantas y paisaje ─────────────────────────────────────────────

const b10unidad2: VocabEntry[] = [
  en('en-a2-293', 'leaf', 'hoja', 'sustantivo', 'leaf',
    [c('dry leaves', 'hojas secas'), c('remove the leaves', 'quitar las hojas'), c('green leaves', 'hojas verdes')],
    {
      target: 'First, we are going to remove dry leaves and prepare four planting areas.',
      es: 'Primero vamos a quitar las hojas secas y preparar cuatro zonas de plantación.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-294', 'plant', 'plantar / planta', 'verbo', 'plant',
    [c('planting herbs', 'plantar hierbas'), c('plant a tree', 'plantar un árbol'), c('four planting areas', 'cuatro zonas de plantación')],
    {
      target: 'After that, volunteers can choose between painting the wooden signs and planting herbs.',
      es: 'Después, los voluntarios pueden elegir entre pintar los carteles de madera y plantar hierbas.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'verbo' }),

  en('en-a2-295', 'herb', 'hierba aromática', 'sustantivo', 'herb',
    [c('plant herbs', 'plantar hierbas'), c('fresh herbs', 'hierbas frescas'), c('herbs for the soup', 'hierbas para la sopa')],
    {
      target: 'After that, volunteers can choose between painting the wooden signs and planting herbs.',
      es: 'Después, los voluntarios pueden elegir entre pintar los carteles de madera y plantar hierbas.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-296', 'flower', 'flor', 'sustantivo', 'FLOW-er',
    [c('the flower shop', 'la floristería'), c('buy flowers', 'comprar flores'), c('the flowers are open', 'las flores están abiertas')],
    {
      target: 'At the market, Maya waited beside the flower shop, their usual meeting place.',
      es: 'En el mercado, Maya esperó al lado de la floristería, donde siempre quedaban.',
      lectura: 'en-a2-weekend-without-my-phone',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-297', 'pot', 'maceta / tiesto', 'sustantivo', 'pot',
    [c('garden pots', 'macetas del jardín'), c('a clay pot', 'una maceta de barro'), c('plant it in a pot', 'plantarlo en una maceta')],
    {
      target: 'Anyone with spare boxes or garden pots can leave them, clearly labelled, in the hall.',
      es: 'Quien tenga cajas o macetas de sobra puede dejarlas, bien etiquetadas, en el portal.',
      lectura: 'en-a2-new-neighbour-welcome',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-298', 'wood', 'madera', 'sustantivo', 'wood',
    [c('the wood looks different', 'la madera se ve distinta'), c('a wood table', 'una mesa de madera'), c('paint the wood', 'pintar la madera')],
    { target: 'This is the most beautiful part of the room now. The wood looks different in the morning light.', es: 'Ahora esta es la parte más bonita de la sala. La madera se ve distinta con la luz de la mañana.', episodio: 6 },
    { tipo: 'sustantivo' }),

  en('en-a2-299', 'tree', 'árbol', 'sustantivo', 'tree',
    [c('under a tree', 'debajo de un árbol'), c('plant a tree', 'plantar un árbol'), c('the trees in the park', 'los árboles del parque')],
    {
      target: 'There are two old trees in the community garden.',
      es: 'Hay dos árboles viejos en el huerto comunitario.',
      motivo:
        'El huerto del texto tiene hojas, hierbas y macetas, pero ni un árbol. Es lo que pasa con ' +
        'una serie que no sale de una manzana: la naturaleza que cuenta es la que cabe en un patio.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-300', 'grass', 'césped', 'sustantivo', 'grass',
    [c('sit on the grass', 'sentarse en la hierba'), c('cut the grass', 'cortar el césped'), c('the grass is wet', 'la hierba está mojada')],
    {
      target: 'The children played on the grass all afternoon.',
      es: 'Los niños jugaron en la hierba toda la tarde.',
      motivo: 'Mismo hueco que «tree»: el nivel tiene huerto, no campo.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-301', 'river', 'río', 'sustantivo', 'RIV-er',
    [c('beside the river', 'al lado del río'), c('walk along the river', 'pasear por el río'), c('the river is high', 'el río va crecido')],
    {
      target: 'We walked beside the river for an hour.',
      es: 'Paseamos al lado del río durante una hora.',
      motivo:
        'Lo más parecido en el material es el agua que inunda la carretera junto a Hill Farm, y ahí ' +
        'no se nombra ningún río. La frase usa «beside», que sí está en el bloque 7.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-302', 'mountain', 'montaña', 'sustantivo', 'MOUN-tain',
    [c('in the mountains', 'en la montaña'), c('climb a mountain', 'subir una montaña'), c('the mountain is high', 'la montaña es alta')],
    {
      target: 'In winter we go to the mountains for two days.',
      es: 'En invierno vamos a la montaña dos días.',
      motivo: 'Nadie sale de la ciudad en todo el nivel. Sin montaña, río ni playa el bloque no puede describir un paisaje.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-303', 'beach', 'playa', 'sustantivo', 'beach',
    [c('go to the beach', 'ir a la playa'), c('on the beach', 'en la playa'), c('a quiet beach', 'una playa tranquila')],
    {
      target: 'The beach is quieter in October than in July.',
      es: 'La playa está más tranquila en octubre que en julio.',
      motivo:
        'A1 tiene «sea» pero no playa, y el A2 no vuelve a acercarse al mar. La frase se escribe con ' +
        'un comparativo, que es lo que el ep05 y el ep06 enseñan.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-304', 'forest', 'bosque', 'sustantivo', 'FOR-est',
    [c('walk in the forest', 'pasear por el bosque'), c('a big forest', 'un bosque grande'), c('the forest is quiet', 'el bosque está en silencio')],
    {
      target: 'The forest is very quiet early in the morning.',
      es: 'El bosque está muy silencioso temprano por la mañana.',
      motivo: 'Mismo hueco que «mountain» y «beach»: la historia no sale del barrio.',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · El entorno y lo que se recicla ────────────────────────────────

const b10unidad3: VocabEntry[] = [
  en('en-a2-305', 'recycling', 'reciclaje', 'sustantivo', 're-CY-cling',
    [c('recycling bags', 'bolsas de reciclaje'), c('the recycling room', 'el cuarto de reciclaje'), c('put out the recycling', 'sacar el reciclaje')],
    {
      target: 'The residents of Brookfield used to put recycling bags outside on different days, and the collection team often missed some streets.',
      es: 'Los vecinos de Brookfield sacaban las bolsas de reciclaje en días distintos, y el equipo de recogida se saltaba calles a menudo.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-306', 'glass', 'vidrio', 'sustantivo', 'glass',
    [c('glass and metal', 'vidrio y metal'), c('a glass bottle', 'una botella de vidrio'), c('put the glass outside', 'sacar el vidrio')],
    {
      target: 'Blue streets put paper and cardboard outside on Monday, while green streets put glass and metal outside on Tuesday.',
      es: 'Las calles azules sacan papel y cartón el lunes, mientras que las verdes sacan vidrio y metal el martes.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-307', 'metal', 'metal (hierro, aluminio…)', 'sustantivo', 'MET-al',
    [c('glass and metal', 'vidrio y metal'), c('a metal box', 'una caja de metal'), c('metal and plastic', 'metal y plástico')],
    {
      target: 'Blue streets put paper and cardboard outside on Monday, while green streets put glass and metal outside on Tuesday.',
      es: 'Las calles azules sacan papel y cartón el lunes, mientras que las verdes sacan vidrio y metal el martes.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-308', 'material', 'material / de qué está hecho', 'sustantivo', 'ma-TE-ri-al',
    [c('the wrong materials', 'los materiales equivocados'), c('separate the materials', 'separar los materiales'), c('a soft material', 'un material blando')],
    {
      target: 'After four weeks, fewer bags contained the wrong materials, but some residents said the colour system was confusing at night.',
      es: 'A las cuatro semanas, menos bolsas llevaban materiales equivocados, pero algunos vecinos dijeron que el sistema de colores confundía de noche.',
      lectura: 'en-a2-recycling-collection-plan',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-309', 'tool', 'herramienta', 'sustantivo', 'tool',
    [c('lend tools', 'prestar herramientas'), c('the right tool', 'la herramienta adecuada'), c('bring your own tools', 'traer tus herramientas')],
    {
      target: 'Bring gardening gloves if you have them, but we can lend tools and gloves to twenty people.',
      es: 'Trae guantes de jardinería si tienes, pero podemos prestar herramientas y guantes a veinte personas.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-310', 'glove', 'guante', 'sustantivo', 'glove',
    [c('gardening gloves', 'guantes de jardinería'), c('wear gloves', 'llevar guantes'), c('a pair of gloves', 'un par de guantes')],
    {
      target: 'Bring gardening gloves if you have them, but we can lend tools and gloves to twenty people.',
      es: 'Trae guantes de jardinería si tienes, pero podemos prestar herramientas y guantes a veinte personas.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-311', 'prepare', 'preparar', 'verbo', 'pre-PARE',
    [c('prepare the garden', 'preparar el huerto'), c('prepare four areas', 'preparar cuatro zonas'), c('she prepared two questions', 'preparó dos preguntas')],
    {
      target: 'Subject: Help us prepare the community garden.',
      es: 'Asunto: ayúdanos a preparar el huerto comunitario.',
      lectura: 'en-a2-community-garden-email',
    },
    { tipo: 'verbo' }),

  en('en-a2-312', 'rubbish', 'basura', 'sustantivo', 'RUB-bish',
    [c('take out the rubbish', 'sacar la basura'), c('a rubbish bag', 'una bolsa de basura'), c('too much rubbish', 'demasiada basura')],
    {
      target: 'We take the rubbish out before eight in the morning.',
      es: 'Sacamos la basura antes de las ocho de la mañana.',
      motivo:
        'El texto del reciclaje habla de bolsas y de materiales, pero nunca dice «rubbish». Sin ella ' +
        'el bloque enseña a separar y no a tirar.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-313', 'environment', 'medio ambiente', 'sustantivo', 'en-VI-ron-ment',
    [c('good for the environment', 'bueno para el medio ambiente'), c('protect the environment', 'cuidar el medio ambiente'), c('the local environment', 'el entorno del barrio')],
    {
      target: 'Recycling is better for the environment.',
      es: 'Reciclar es mejor para el medio ambiente.',
      motivo: 'El nivel recicla por orden del ayuntamiento, no por el medio ambiente: la palabra no llega a decirse nunca.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-314', 'pollution', 'contaminación', 'sustantivo', 'pol-LU-tion',
    [c('air pollution', 'contaminación del aire'), c('reduce pollution', 'reducir la contaminación'), c('pollution in the city', 'contaminación en la ciudad')],
    {
      target: 'There is more pollution in the city than in the mountains.',
      es: 'Hay más contaminación en la ciudad que en la montaña.',
      motivo: 'Mismo hueco que «environment»: el nivel no tiene ninguna conversación sobre el clima o la ciudad.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-315', 'energy', 'energía', 'sustantivo', 'EN-er-gy',
    [c('save energy', 'ahorrar energía'), c('clean energy', 'energía limpia'), c('the energy bill', 'la factura de la luz')],
    {
      target: 'We turn off the lights to save energy.',
      es: 'Apagamos las luces para ahorrar energía.',
      motivo:
        'El nivel tiene la factura del agua (ep03) y la luz de la ventana (ep06), pero la energía ' +
        'como tema no aparece. La frase reutiliza «light», que sí es del bloque 7.',
    },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 4 · Salud y consulta médica ════════════════════════════════════════
//
// **Treinta y cinco de treinta y cinco redactadas. Es el único bloque del proyecto sin una
// sola frase del material, y hay que decirlo con el número delante.**
//
// La medición previa daba 1 de 15, y al abrir las frases no quedó ni esa. Lo único que el
// nivel roza es «wash our hands» del ep12 —y `hand` ya está en A1— y las alergias de la clase
// de cocina, que se llevó el bloque 6. En veinte episodios nadie se pone enfermo, nadie va al
// médico y nadie se toma nada.
//
// Es **la segunda vez que pasa lo mismo con el mismo tema**: el bloque 5 de A1 («Cuerpo, salud
// y sensaciones») salió con 8 de 30. Dos niveles seguidos, dos series de ficción distintas, y
// el hueco en el mismo sitio. Ya no es casualidad: **una historia no enferma a sus personajes
// salvo que la enfermedad sea la trama.** Si el temario necesita una consulta médica, el
// corpus tiene que tener un episodio de consulta médica, y eso se decide al grabar.
//
// Se escribe igual, con la decisión que el usuario tomó el 9 ago 2026 para el bloque 5 de A1:
// las frases se redactan con su motivo escrito y se vuelven a enlazar cuando el material
// exista. Las condiciones son las mismas:
//
//  1. Gramática que el nivel ya enseña: presente, pasado simple, `have to` / `should` / `must`
//     (ep12), `going to` (ep07), `will` (ep08), condicional de tipo 1 (ep13), comparativos
//     (ep05-06) y presente perfecto (ep09, ep16). Nada más.
//  2. Cuando se puede, la frase se apoya en algo que sí existe en la historia —el local, los
//     vecinos, la biblioteca, el turno de voluntariado— para que no suene a otro mundo.
//  3. Se localizan todas con:
//
//     grep -n "motivo:" src/data/practica/vocabulario/ingles-a2.ts
//
// A1 ya enseñó `doctor`, `nurse`, `hospital`, `sick`, `hurt`, `tired`, `rest`, `feel` y las
// trece partes del cuerpo de fuera. Este bloque va a lo de dentro, a los síntomas y al
// tratamiento, que es lo que A2 añade.

// ─── Unidad 1 · El cuerpo por dentro ──────────────────────────────────────────

const b4unidad1: VocabEntry[] = [
  en('en-a2-316', 'health', 'salud', 'sustantivo', 'health',
    [c('in good health', 'con buena salud'), c('bad for your health', 'malo para la salud'), c('a health problem', 'un problema de salud')],
    {
      target: 'Walking to work every day is good for your health.',
      es: 'Ir andando al trabajo todos los días es bueno para la salud.',
      motivo: 'La palabra «health» no aparece ni una vez en los veinte episodios ni en los diez textos: nadie habla de salud en todo el nivel.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-317', 'healthy', 'sano / saludable', 'adjetivo', 'HEALTH-y',
    [c('a healthy meal', 'una comida sana'), c('stay healthy', 'mantenerse sano'), c('healthier than bread', 'más sano que el pan')],
    {
      target: 'Vegetable soup is healthier than a sandwich.',
      es: 'La sopa de verduras es más sana que un sándwich.',
      motivo: 'El nivel habla mucho de comida —pan, sopa, pastel— pero nunca de si es sana. Se escribe con un comparativo, que es lo que enseñan el ep05 y el ep06.',
    },
    { tipo: 'otro' }),

  en('en-a2-318', 'ill', 'enfermo', 'adjetivo', 'ill',
    [c('feel ill', 'sentirse enfermo'), c('be ill for a week', 'estar enfermo una semana'), c('she was ill on Monday', 'estuvo enferma el lunes')],
    {
      target: 'Leo was ill last week, so we opened late.',
      es: 'Leo estuvo enfermo la semana pasada, así que abrimos tarde.',
      motivo: 'Ningún personaje se pone enfermo en toda la serie. La frase usa a Leo y la hora de abrir, que sí son del material, para que suene a la misma historia.',
    },
    { tipo: 'otro' }),

  en('en-a2-319', 'pain', 'dolor', 'sustantivo', 'pain',
    [c('a bad pain', 'un dolor fuerte'), c('pain in my back', 'dolor de espalda'), c('the pain is better today', 'el dolor está mejor hoy')],
    {
      target: 'I had a bad pain in my back all morning.',
      es: 'Tuve un dolor fuerte de espalda toda la mañana.',
      motivo: 'A1 enseña «hurt» como verbo, pero el sustantivo «pain» no está en ninguno de los dos corpus. En A1 daba positivo y era «paint».',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-320', 'cut', 'corte / cortarse', 'sustantivo', 'cut',
    [c('a small cut', 'un corte pequeño'), c('cut your finger', 'cortarse el dedo'), c('clean the cut', 'limpiar el corte')],
    {
      target: 'She has a small cut on her finger.',
      es: 'Tiene un corte pequeño en el dedo.',
      motivo: 'La clase de cocina del texto reparte cuchillos, pero nadie se corta y la palabra no aparece nunca.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-321', 'stomach', 'estómago / barriga', 'sustantivo', 'STOM-ach',
    [c('a stomach ache', 'dolor de estómago'), c('my stomach hurts', 'me duele el estómago'), c('on an empty stomach', 'en ayunas')],
    {
      target: 'My stomach hurts when I eat too fast.',
      es: 'Me duele el estómago cuando como muy rápido.',
      motivo: 'A1 enseñó trece partes del cuerpo, todas de fuera. El estómago no está en ninguno de los dos niveles.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-322', 'throat', 'garganta', 'sustantivo', 'throat',
    [c('a sore throat', 'dolor de garganta'), c('my throat hurts', 'me duele la garganta'), c('clear your throat', 'aclararse la garganta')],
    {
      target: 'I have a sore throat and I can’t speak much.',
      es: 'Tengo dolor de garganta y no puedo hablar mucho.',
      motivo: 'Mismo hueco que «stomach»: A1 se quedó en las partes de fuera y el A2 no vuelve a nombrar el cuerpo.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-323', 'knee', 'rodilla', 'sustantivo', 'knee',
    [c('hurt your knee', 'hacerse daño en la rodilla'), c('my left knee', 'mi rodilla izquierda'), c('the knee is better', 'la rodilla está mejor')],
    {
      target: 'He hurt his knee when he was carrying the boxes.',
      es: 'Se hizo daño en la rodilla mientras llevaba las cajas.',
      motivo: 'Mismo hueco que «stomach». La frase usa el pasado continuo del ep04 y las cajas de la mudanza, que sí son del nivel.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-324', 'shoulder', 'hombro', 'sustantivo', 'SHOUL-der',
    [c('a sore shoulder', 'el hombro dolorido'), c('carry it on your shoulder', 'llevarlo al hombro'), c('my shoulder hurts', 'me duele el hombro')],
    {
      target: 'My shoulder hurts after two hours of painting.',
      es: 'Me duele el hombro después de dos horas pintando.',
      motivo: 'Mismo hueco que «stomach». La frase se apoya en el sábado de pintar del ep04.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-325', 'finger', 'dedo (de la mano)', 'sustantivo', 'FIN-ger',
    [c('cut your finger', 'cortarse el dedo'), c('point with a finger', 'señalar con el dedo'), c('ten fingers', 'diez dedos')],
    {
      target: 'He cut his finger with the bread knife.',
      es: 'Se cortó el dedo con el cuchillo del pan.',
      motivo: 'A1 dejó «finger» fuera porque tampoco estaba en su corpus, y en A2 sigue sin aparecer. Se escribe con el pan y el cuchillo del nivel.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-326', 'heart', 'corazón', 'sustantivo', 'heart',
    [c('a strong heart', 'un corazón fuerte'), c('my heart is fast', 'el corazón me va rápido'), c('good for the heart', 'bueno para el corazón')],
    {
      // Decía «Walking every day is good for the heart», que es la frase de «health» con otra
      // palabra al final: dos fichas del mismo bloque con el mismo molde (auditoría 5.3,
      // 12 ago 2026). Se reescribe con «doctor», que sí está en A1.
      target: 'The doctor listened to my heart for a minute.',
      es: 'El médico me escuchó el corazón un minuto.',
      motivo: 'A1 lo dejó fuera por no estar en su corpus y en A2 tampoco aparece. Es la palabra ' +
        'que más se echa de menos de un cuerpo por dentro.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-327', 'blood', 'sangre', 'sustantivo', 'blood',
    [c('a blood test', 'un análisis de sangre'), c('give blood', 'donar sangre'), c('there was a little blood', 'había un poco de sangre')],
    {
      target: 'The nurse took a blood test on Tuesday.',
      es: 'La enfermera me hizo un análisis de sangre el martes.',
      motivo: 'Nadie se hace ninguna prueba en el nivel. Se escribe con «nurse», que sí está en A1, para enlazar los dos niveles.',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · Síntomas y la consulta ────────────────────────────────────────

const b4unidad2: VocabEntry[] = [
  en('en-a2-328', 'fever', 'fiebre', 'sustantivo', 'FE-ver',
    [c('have a fever', 'tener fiebre'), c('a high fever', 'fiebre alta'), c('the fever is going down', 'la fiebre está bajando')],
    {
      target: 'The baby had a fever all night.',
      es: 'El bebé tuvo fiebre toda la noche.',
      motivo: 'Ningún personaje enferma en la serie, así que no hay fiebre en ninguna frase. El bebé sale del turno de voluntariado, que sí es del material.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-329', 'cough', 'tos / toser', 'sustantivo', 'cough',
    [c('a bad cough', 'una tos fuerte'), c('cough all night', 'toser toda la noche'), c('medicine for a cough', 'jarabe para la tos')],
    {
      target: 'I have had a bad cough since Sunday.',
      es: 'Tengo una tos fuerte desde el domingo.',
      motivo: 'Mismo hueco que «fever»: sin escena de enfermedad no hay síntomas. La frase usa el presente perfecto del ep09 y del ep16.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-330', 'flu', 'gripe', 'sustantivo', 'flu',
    [c('have the flu', 'tener gripe'), c('the flu lasts a week', 'la gripe dura una semana'), c('stay at home with the flu', 'quedarse en casa con gripe')],
    {
      target: 'Two students have the flu, so the class is smaller today.',
      es: 'Dos estudiantes tienen gripe, así que hoy la clase es más pequeña.',
      motivo: 'Mismo hueco que «fever». La frase reutiliza los estudiantes de la clase de cocina y un comparativo del ep05.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-331', 'headache', 'dolor de cabeza', 'sustantivo', 'HEAD-ache',
    [c('have a headache', 'tener dolor de cabeza'), c('a bad headache', 'un dolor de cabeza fuerte'), c('the headache is gone', 'se me fue el dolor de cabeza')],
    {
      target: 'I have a headache because of the noise.',
      es: 'Me duele la cabeza por el ruido.',
      motivo: 'A1 enseña «head» y A2 enseña «noise» en el bloque 7, pero el dolor de cabeza no se nombra nunca. Se escriben juntos a propósito.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-332', 'sore', 'dolorido / irritado', 'adjetivo', 'sore',
    [c('a sore throat', 'dolor de garganta'), c('sore legs', 'las piernas doloridas'), c('my hands are sore', 'me duelen las manos')],
    {
      target: 'My hands were sore after the volunteer shift.',
      es: 'Me dolían las manos después del turno de voluntariado.',
      motivo: 'El turno de voluntariado del texto termina «tiring», nunca «sore». La frase se apoya en ese mismo turno.',
    },
    { tipo: 'otro' }),

  en('en-a2-333', 'symptom', 'síntoma', 'sustantivo', 'SYMP-tom',
    [c('the first symptoms', 'los primeros síntomas'), c('describe your symptoms', 'describir los síntomas'), c('no symptoms today', 'hoy sin síntomas')],
    {
      target: 'The doctor asked about my symptoms twice.',
      es: 'El médico preguntó por mis síntomas dos veces.',
      motivo: 'Ninguna consulta médica ocurre en el nivel. Se escribe con «doctor», que sí está en A1, y con «twice», que está en el bloque 9.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-334', 'patient', 'paciente', 'sustantivo', 'PA-tient',
    [c('the next patient', 'el siguiente paciente'), c('a young patient', 'un paciente joven'), c('the patient is waiting', 'el paciente está esperando')],
    {
      target: 'The next patient waited beside the door.',
      es: 'El siguiente paciente esperaba al lado de la puerta.',
      motivo: 'El nivel tiene clientes, vecinos y visitantes, pero ningún paciente, porque no hay ni una consulta.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-335', 'clinic', 'clínica / centro de salud', 'sustantivo', 'CLIN-ic',
    [c('go to the clinic', 'ir al centro de salud'), c('the clinic opens at eight', 'el centro de salud abre a las ocho'), c('a small clinic', 'una clínica pequeña')],
    {
      target: 'The clinic opens at eight in the morning.',
      es: 'El centro de salud abre a las ocho de la mañana.',
      motivo: 'A1 tiene «hospital», que sale del ep07 de su serie, pero el centro de salud del día a día no está en ninguno de los dos niveles.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-336', 'dentist', 'dentista', 'sustantivo', 'DEN-tist',
    [c('go to the dentist', 'ir al dentista'), c('the dentist says', 'el dentista dice'), c('an appointment with the dentist', 'una cita con el dentista')],
    {
      target: 'I have to go to the dentist on Thursday.',
      es: 'Tengo que ir al dentista el jueves.',
      motivo: 'A1 enseña «tooth» y «doctor», pero el dentista no aparece en ninguno de los dos corpus. Se escribe con «have to», que el ep12 ya enseña.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-337', 'pharmacy', 'farmacia', 'sustantivo', 'PHAR-ma-cy',
    [c('go to the pharmacy', 'ir a la farmacia'), c('the pharmacy on the corner', 'la farmacia de la esquina'), c('the pharmacy is closed', 'la farmacia está cerrada')],
    {
      target: 'The pharmacy on the corner is open until nine.',
      es: 'La farmacia de la esquina está abierta hasta las nueve.',
      motivo: 'La calle del local tiene panadería, floristería y biblioteca, pero ninguna farmacia. La frase usa esa misma esquina.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-338', 'emergency', 'urgencia / emergencia', 'sustantivo', 'e-MER-gen-cy',
    [c('an emergency number', 'un número de urgencias'), c('in an emergency', 'en caso de emergencia'), c('go to emergency', 'ir a urgencias')],
    {
      target: 'Call this number if there is an emergency.',
      es: 'Llama a este número si hay una emergencia.',
      motivo: 'El problema más grave del nivel es una tubería rota, y se resuelve llamando al fontanero. No hay ninguna urgencia en veinte episodios.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-339', 'ambulance', 'ambulancia', 'sustantivo', 'AM-bu-lance',
    [c('call an ambulance', 'llamar a una ambulancia'), c('the ambulance arrived', 'llegó la ambulancia'), c('wait for the ambulance', 'esperar la ambulancia')],
    {
      target: 'Somebody called an ambulance for the old man.',
      es: 'Alguien llamó a una ambulancia para el señor mayor.',
      motivo: 'Mismo hueco que «emergency». Se escribe con «somebody», que sí es del bloque 7.',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · El tratamiento y cuidarse ─────────────────────────────────────

const b4unidad3: VocabEntry[] = [
  en('en-a2-340', 'medicine', 'medicamento / medicina', 'sustantivo', 'MED-i-cine',
    [c('take your medicine', 'tomarse la medicina'), c('medicine for a cough', 'jarabe para la tos'), c('the medicine is in the bag', 'la medicina está en la bolsa')],
    {
      target: 'You have to take this medicine twice a day.',
      es: 'Tienes que tomar esta medicina dos veces al día.',
      motivo: 'Nadie se toma nada en el nivel. La frase usa «have to» del ep12 y «twice» del bloque 9.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-341', 'pill', 'pastilla', 'sustantivo', 'pill',
    [c('take a pill', 'tomarse una pastilla'), c('two pills a day', 'dos pastillas al día'), c('a small white pill', 'una pastilla blanca pequeña')],
    {
      target: 'She takes two pills after breakfast.',
      es: 'Se toma dos pastillas después del desayuno.',
      motivo: 'Mismo hueco que «medicine». La frase se apoya en «breakfast», que sí está en A1.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-342', 'prescription', 'receta médica', 'sustantivo', 'pre-SCRIP-tion',
    [c('write a prescription', 'hacer una receta'), c('a prescription for the pharmacy', 'una receta para la farmacia'), c('bring your prescription', 'trae tu receta')],
    {
      target: 'The doctor wrote a prescription for the pharmacy.',
      es: 'El médico hizo una receta para la farmacia.',
      motivo: 'El nivel escribe menús, listas y cuadrantes, pero ninguna receta médica, porque no hay ninguna consulta.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-343', 'bandage', 'venda', 'sustantivo', 'BAND-age',
    [c('put on a bandage', 'poner una venda'), c('change the bandage', 'cambiar la venda'), c('a clean bandage', 'una venda limpia')],
    {
      target: 'The nurse put a clean bandage on his hand.',
      es: 'La enfermera le puso una venda limpia en la mano.',
      motivo: 'Nadie se cura una herida en el nivel. Se escribe con «nurse» y «hand», que sí están en A1.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-344', 'injury', 'lesión', 'sustantivo', 'IN-ju-ry',
    [c('a small injury', 'una lesión pequeña'), c('an old injury', 'una lesión antigua'), c('the injury is better', 'la lesión va mejor')],
    {
      target: 'He could not play because of an old injury.',
      es: 'No pudo jugar por una lesión antigua.',
      motivo: 'El partido de fútbol del intercambio es lo único deportivo del nivel, y nadie se lesiona. La frase se apoya en ese partido.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-345', 'treatment', 'tratamiento', 'sustantivo', 'TREAT-ment',
    [c('start a treatment', 'empezar un tratamiento'), c('a long treatment', 'un tratamiento largo'), c('the treatment is working', 'el tratamiento está funcionando')],
    {
      target: 'The treatment is working, but it is very slow.',
      es: 'El tratamiento está funcionando, pero va muy despacio.',
      motivo: 'Sin enfermedad no hay tratamiento en ninguna frase del nivel.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-346', 'recover', 'recuperarse', 'verbo', 're-COV-er',
    [c('recover from the flu', 'recuperarse de la gripe'), c('recover slowly', 'recuperarse despacio'), c('she has recovered well', 'se ha recuperado bien')],
    {
      target: 'She recovered slowly after two weeks at home.',
      es: 'Se recuperó despacio después de dos semanas en casa.',
      motivo: 'Mismo hueco que «treatment». La frase usa «slowly», que sí sale del ep15.',
    },
    { tipo: 'verbo' }),

  en('en-a2-347', 'exercise', 'ejercicio', 'sustantivo', 'EX-er-cise',
    [c('do exercise', 'hacer ejercicio'), c('gentle exercise', 'ejercicio suave'), c('exercise every morning', 'ejercicio cada mañana')],
    {
      target: 'The doctor said I should do gentle exercise.',
      es: 'El médico dijo que debería hacer ejercicio suave.',
      motivo: 'El nivel anda y pasea, pero nunca llama a eso ejercicio. La frase usa «should», que el ep12 ya enseña.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-348', 'diet', 'dieta / alimentación', 'sustantivo', 'DI-et',
    [c('a healthy diet', 'una alimentación sana'), c('go on a diet', 'ponerse a dieta'), c('change your diet', 'cambiar la alimentación')],
    {
      target: 'A healthy diet is cheaper than people think.',
      es: 'Una alimentación sana es más barata de lo que la gente cree.',
      motivo: 'El nivel habla de comida todo el rato y de alimentación nunca. Se escribe con un comparativo y con «think», que sí son del material.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-349', 'stress', 'estrés', 'sustantivo', 'stress',
    [c('a lot of stress', 'mucho estrés'), c('stress at work', 'estrés en el trabajo'), c('less stress than before', 'menos estrés que antes')],
    {
      target: 'Maya has less stress than in her old job.',
      es: 'Maya tiene menos estrés que en su antiguo trabajo.',
      motivo: 'El ep14 cuenta justo eso —que dejó un trabajo con ruido y un sueldo fijo— pero nunca lo llama estrés. La frase dice lo que la escena da a entender.',
    },
    { tipo: 'sustantivo' }),

  en('en-a2-350', 'breathe', 'respirar', 'verbo', 'breathe',
    [c('breathe slowly', 'respirar despacio'), c('hard to breathe', 'cuesta respirar'), c('breathe through your nose', 'respirar por la nariz')],
    {
      target: 'Breathe slowly and count to ten.',
      es: 'Respira despacio y cuenta hasta diez.',
      motivo: 'El verbo no aparece en ninguno de los dos niveles. Es la última entrada del núcleo de A2 y cierra el bloque con el imperativo, que el nivel ya usa en los avisos del barrio.',
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
      'sustituyeron por otras del mismo tema que el corpus también dice. ' +
      // ── Cruce completo, 12 ago 2026 ─────────────────────────────────────────
      'CRUCE COMPLETO contra el Oxford 3000 por banda CEFR, 12 ago 2026, sobre las 350 entradas: ' +
      '105 en banda A2 (30 %), 150 en banda A1 (43 %), 50 una o dos bandas por encima (14 %) y ' +
      '45 fuera de la lista en cualquier forma (13 %). Hasta el nivel, 255 de 350 — el 73 %. ' +
      'Dos advertencias para leer esos números. La primera: el guardián cuenta 104 en banda y no ' +
      '105 porque se queda con la PRIMERA banda de cada palabra, y la lista sitúa muchas en dos ' +
      '—«key» es A1 como sustantivo y B1 como adjetivo—; manda la banda más baja, que es la ' +
      'acepción que enseña un nivel inicial. La segunda: la lista trae lemas de diccionario, así ' +
      'que «gently», «seller», «booking», «realise» u «organisation» salen como ausencias y no lo ' +
      'son —están «gentle», «sell», «book», «realize» y «organization»—. Veinte de las supuestas ' +
      '65 ausencias eran esto. ' +
      'A1 tiene el 92 % en banda y A2 el 30 %, y la diferencia no es un defecto: A1 se lleva el ' +
      'núcleo cotidiano casi entero, y el trabajo de A2 son las transacciones, que traen palabras ' +
      'que una lista de frecuencia coloca en B1 —«receipt», «appointment», «queue», «arrival», ' +
      '«departure»—. Ninguna de las 350 repite lema de A1: las 150 de banda A1 son palabras ' +
      'nuevas, no repaso. ' +
      'DOS BLOQUES SE SALEN DEL RESTO. El 4 (salud y consulta médica) tiene el 57 % hasta nivel, ' +
      'el peor de los diez, con nueve palabras fuera de la lista —«fever», «cough», «sore», ' +
      '«clinic», «pharmacy», «ambulance», «pill», «prescription», «bandage»— y seis por encima. ' +
      'Es el tercer instrumento que señala el mismo sitio: ya era el único bloque con 35 de 35 ' +
      'ejemplos redactados. No es un problema de vocabulario sino del corpus, y es el mismo ' +
      'agujero que dejó el bloque del cuerpo en A1: una serie de ficción no enferma a sus ' +
      'personajes salvo que la enfermedad sea la trama. Se arregla grabando, no reescribiendo. ' +
      'El 3 (compras, dinero y trámites) tiene el 60 % y diez palabras por encima de banda, y ' +
      'aquí sí hay algo que mirar: «accounting», «council», «collection», «limited» y «reminder» ' +
      'no son de comprar, son de administrar. El bloque se fue del mostrador a la oficina. ' +
      'Candidatas a sustituir cuando el usuario revise el nivel. ' +
      'Las 45 ausencias restantes son casi todas sustantivos concretos que el Oxford 3000 no ' +
      'recoge porque es una lista de frecuencia y alcance, no un temario: «pharmacy», «luggage», ' +
      '«suitcase», «motorway», «fog», «herb», «apron», «jar», «tile», «plumber». Están en ' +
      'cualquier programa de A2 y se mantienen. ' +
      'La lista NO vive en el repo —tiene derechos— y se cruza pasándola con --lista.',
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
    {
      id: 'ocio-planes-y-tiempo-libre',
      nombre: 'Ocio, planes y tiempo libre',
      icono: '🎭',
      entradas: [...b9unidad1, ...b9unidad2, ...b9unidad3],
    },
    {
      id: 'describir-personas-y-caracter',
      nombre: 'Describir personas y carácter',
      icono: '🙂',
      entradas: [...b5unidad1, ...b5unidad2, ...b5unidad3],
    },
    {
      id: 'compras-dinero-y-tramites',
      nombre: 'Compras, dinero y trámites',
      icono: '🧾',
      entradas: [...b3unidad1, ...b3unidad2, ...b3unidad3],
    },
    {
      id: 'viajes-y-transporte',
      nombre: 'Viajes y transporte',
      icono: '🚌',
      entradas: [...b1unidad1, ...b1unidad2, ...b1unidad3],
    },
    {
      id: 'clima-naturaleza-y-entorno',
      nombre: 'Clima, naturaleza y entorno',
      icono: '🌦️',
      entradas: [...b10unidad1, ...b10unidad2, ...b10unidad3],
    },
    {
      id: 'salud-y-consulta-medica',
      nombre: 'Salud y consulta médica',
      icono: '🩺',
      entradas: [...b4unidad1, ...b4unidad2, ...b4unidad3],
    },
  ],
}
