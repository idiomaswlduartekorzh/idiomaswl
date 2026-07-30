import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'preposiciones-lugar-v-na',
  order: '11',
  color: '#1a2ecc',
  category: 'Preposiciones',
  level: 'A1',
  title: 'Preposiciones В y НА para ubicación en ruso (caso prepositivo)',
  shortTitle: 'В y НА — ubicación',
  metaTitle: 'Preposiciones В y НА en ruso A1 | в школе, на работе — caso prepositivo',
  description:
    'В (v) y НА (na) con caso prepositivo expresan UBICACIÓN en ruso. В = en el interior (в школе — en la escuela, en la habitación). НА = en la superficie o en eventos (на столе — sobre la mesa, на работе — en el trabajo, на уроке — en la clase). Prepositivo: masculino/neutro añaden -е, femenino -е o -и. Pregunta: Где? (¿Dónde?).',
  lead: 'Aprende a decir dónde están las cosas en ruso usando В para interiores y НА para superficies y eventos, con el caso prepositivo.',
  outcomes: [
    'Usar В + prepositivo para lugares interiores (в школе, в городе)',
    'Usar НА + prepositivo para superficies y eventos (на столе, на работе)',
    'Formar el caso prepositivo de sustantivos masculinos, femeninos y neutros',
  ],
  guide: {
    goal: 'Expresar ubicación usando В o НА + caso prepositivo, respondiendo a Где? (¿Dónde?).',
    model: 'Где + [sujeto] + находится? → В/НА + [sustantivo en prepositivo]',
    formula: 'В [masc/ntr: raíz+е] | НА [masc/ntr: raíz+е] | В/НА [fem -а→е | -ия→-и]',
    decisions: [
      '¿El lugar es un interior cerrado? → В (в школе, в доме, в городе)',
      '¿El lugar es una superficie o evento? → НА (на столе, на концерте)',
      '¿Es trabajo, calle, estadio o clase? → siempre НА (на работе, на улице, на стадионе, на уроке)',
      '¿El sustantivo termina en consonante (masc) o -о/-е (ntr)? → añadir -е',
      '¿El sustantivo femenino termina en -а? → -а → -е (школа → школе)',
      '¿El sustantivo termina en -ия/-ий/-ие? → -и en lugar de -е (Россия → России)',
    ],
    table: [
      ['Prepositivo', 'Masculino / Neutro', 'Femenino'],
      ['Terminación', 'cons. +е | -о→-е', '-а→-е | -ия→-и'],
      ['В (interior)', 'в городе (en la ciudad)', 'в школе (en la escuela)'],
      ['НА (superficie)', 'на столе (sobre la mesa)', 'на работе (en el trabajo)'],
      ['НА (evento)', 'на концерте (en el concierto)', 'на уроке (en la clase)'],
      ['Excep. -ия', 'в здании (en el edificio)', 'в России (en Rusia)'],
    ],
    mistakes: [
      'Работа, улица, стадион, урок, концерт siempre piden НА aunque sean lugares "interiores": на работе, на улице — excepciones que hay que memorizar.',
      'Prepositivo de sustantivos en -ий/-ия/-ие termina en -и: в России, на станции, в здании.',
      'В доме (adentro de la casa) vs на доме (sobre/encima de la casa física) — con personas normalmente В.',
      'El prepositivo solo aparece con preposiciones (В, НА, О/ОБ). Nunca funciona como sujeto u objeto.',
    ],
  },
  seo: [
    {
      heading: '¿Cuándo usar В y cuándo usar НА para decir "en" en ruso?',
      paragraphs: [
        'En ruso, "en" se traduce con В o НА según el tipo de lugar. В (v) se usa para lugares considerados interiores o contenedores: в школе (en la escuela), в городе (en la ciudad), в России (en Rusia). НА (na) se usa para superficies y para un grupo fijo de lugares y eventos: на работе (en el trabajo), на уроке (en la clase), на стадионе (en el estadio).',
        'La regla general: si puedes "estar dentro de" algo, usa В. Si es una superficie o un evento de lista fija, usa НА. Con el tiempo los hispanohablantes memorizan las excepciones НА más frecuentes.',
      ],
      table: [
        ['В (interior)', 'НА (superficie/evento)', 'Ejemplo'],
        ['в школе (escuela)', 'на работе (trabajo)', 'Я в школе / Она на работе'],
        ['в доме (casa)', 'на улице (calle)', 'Дети в доме / Кот на улице'],
        ['в городе (ciudad)', 'на стадионе (estadio)', 'Я в городе / Он на стадионе'],
        ['в комнате (habitación)', 'на столе (mesa)', 'Книга в комнате / Книга на столе'],
      ],
    },
    {
      heading: '¿Cómo cambian los sustantivos en el caso prepositivo?',
      paragraphs: [
        'Con В o НА para ubicación, el sustantivo cambia al caso prepositivo (предложный падеж). Regla básica: sustantivos masculinos y neutros añaden -е (стол → на столе, город → в городе). Sustantivos femeninos en -а cambian -а por -е (школа → в школе, работа → на работе).',
        'Excepción importante: sustantivos en -ия (Россия, станция) o -ий/-ие (здание) forman el prepositivo en -и: в России, на станции, в здании. Esta es la excepción más frecuente del A1.',
      ],
    },
    {
      heading: '¿Qué palabras exigen на en vez de в para decir "en"?',
      paragraphs: [
        'Aunque в es lo habitual para "dentro de" (в доме = en la casa, в городе = en la ciudad), un grupo de sustantivos exige на por convención y hay que memorizarlos. Van con на: eventos y actividades (на работе = en el trabajo, на уроке = en clase, на концерте = en el concierto), superficies abiertas (на столе = en la mesa, на улице = en la calle) y ciertas zonas geográficas (на почте = en correos, на вокзале = en la estación, на юге = en el sur).',
        'La trampa para el hispanohablante es que no hay una regla lógica perfecta: "en el trabajo" es на работе pero "en la oficina" es в офисе. Conviene aprender de memoria la lista de palabras con на, porque en todos los demás casos "en un lugar" se dice con в + prepositivo.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'В vs НА is one of the most common student errors. The key insight is that НА covers a fixed list of places (work, class, street, stadium) — drilling the exceptions is more effective than the rule alone.',
    graphicPrompt:
      'Split illustration: left side "В" with building cross-section (в школе, в доме, в городе). Right side "НА" with surface icons (на столе, на улице, на работе). Blue theme, clean.',
    scene: [
      ['В школе', 'v shkólye — en la escuela (interior)'],
      ['В городе', 'v górodye — en la ciudad (interior)'],
      ['На столе', 'na stolé — sobre la mesa (superficie)'],
      ['На работе', 'na rabótye — en el trabajo (excepción НА)'],
      ['На улице', 'na úlitsye — en la calle (excepción НА)'],
      ['На уроке', 'na urókye — en la clase (excepción НА)'],
      ['В России', 'v Rossíi — en Rusia (excep. -ия → -и)'],
      ['На концерте', 'na kontsértye — en el concierto (evento НА)'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['В=interior vs НА=superficie/evento', 'prepositivo -е/-и', 'excepciones НА: работа/улица/стадион/урок'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'В o НА: ¿cuál usar?',
        tag: 'Opción múltiple',
        intro: 'Elige la preposición correcta para cada lugar.',
        type: 'choice',
        items: [
          { scene: 'Interior cerrado', lines: [['', '"___ школе" — Carlos está dentro del colegio.']], options: ['На', 'В', 'Из', 'К'], answer: 'В', explain: 'В школе (v shkólye) — la escuela es un interior cerrado. Usamos В.' },
          { scene: 'Excepción НА — trabajo', lines: [['', '"___ работе" — Nico está en el trabajo. (работа = trabajo)']], options: ['В', 'На', 'Из', 'О'], answer: 'На', explain: 'На работе — "trabajo" es excepción fija de НА. No в работе.' },
          { scene: 'Superficie', lines: [['', '"Книга ___ столе" — El libro está sobre la mesa.']], options: ['В', 'С', 'На', 'К'], answer: 'На', explain: 'На столе — sobre la mesa (superficie). НА para superficies.' },
          { scene: 'Excepción НА — calle', lines: [['', '"Дети играют ___ улице" — Los niños juegan en la calle.']], options: ['В', 'На', 'Из', 'По'], answer: 'На', explain: 'На улице — "calle" es excepción НА. Aunque estés "en la calle", se usa НА.' },
          { scene: 'Interior — ciudad', lines: [['', '"Я живу ___ Букараманге" — Vivo en Bucaramanga.']], options: ['На', 'В', 'Из', 'До'], answer: 'В', explain: 'В Букараманге — las ciudades usan В (interior). В Колумбии, в Москве, в городе.' },
          { scene: 'Evento — concierto', lines: [['', '"Мы ___ концерте" — Estamos en el concierto.']], options: ['В', 'Из', 'На', 'К'], answer: 'На', explain: 'На концерте — los eventos (concierto, clase, partido) usan НА.' },
          { scene: 'Interior — habitación', lines: [['', '"Кошка ___ комнате" — El gato está en la habitación.']], options: ['На', 'В', 'Из', 'За'], answer: 'В', explain: 'В комнате — interior cerrado. El gato está dentro de la habitación.' },
          { scene: 'Excepción НА — clase', lines: [['', '"Мы ___ уроке" — Estamos en la clase.']], options: ['В', 'На', 'Из', 'С'], answer: 'На', explain: 'На уроке — "clase/lección" siempre pide НА. Una de las excepciones más frecuentes.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Preposición + forma prepositiva',
        tag: '2 espacios',
        intro: 'Elige la preposición y la forma prepositiva correcta del sustantivo.',
        type: 'dual',
        items: [
          { scene: 'В + prepositivo femenino', lines: [['', 'Clara está en la escuela: [[0]] , forma correcta de школа: ']], blanks: [{ options: ['В', 'На', 'Из', 'К'], answer: 'В', explain: 'Escuela = interior → В.' }, { options: ['школе', 'школу', 'школа', 'школы'], answer: 'школе', explain: 'школа (fem -а) → школе en prepositivo. -а → -е.' }] },
          { scene: 'НА + prepositivo femenino', lines: [['', 'Carlos trabaja: [[0]] , forma correcta de работа: ']], blanks: [{ options: ['На', 'В', 'Из', 'С'], answer: 'На', explain: 'Trabajo = excepción НА.' }, { options: ['работе', 'работу', 'работа', 'работы'], answer: 'работе', explain: 'работа (fem -а) → работе en prepositivo.' }] },
          { scene: 'В + ciudad', lines: [['', 'Lina vive en Moscú: [[0]] , forma de Москва: ']], blanks: [{ options: ['В', 'На', 'К', 'Из'], answer: 'В', explain: 'Ciudades → В. В Москве.' }, { options: ['Москве', 'Москву', 'Москвы', 'Москва'], answer: 'Москве', explain: 'Москва (fem -а) → Москве en prepositivo.' }] },
          { scene: 'НА + superficie', lines: [['', 'El libro está sobre la mesa: [[0]] , forma de стол: ']], blanks: [{ options: ['На', 'В', 'С', 'К'], answer: 'На', explain: 'Mesa = superficie → НА.' }, { options: ['столе', 'стол', 'стола', 'столу'], answer: 'столе', explain: 'стол (masc, consonante) → столе. Añadir -е en prepositivo.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — В y НА en contexto',
        tag: 'Opciones',
        intro: 'Elige la expresión correcta (preposición + prepositivo) para cada espacio.',
        type: 'guidedText',
        scene: 'Un día en la vida de los estudiantes de WeLearn',
        text: 'Давид работает [[0]]. (Nico trabaja en la academia.) Книга лежит [[1]]. (El libro está sobre la mesa.) Студенты сидят [[2]]. (Los estudiantes están en clase.) Кот спит [[3]]. (El gato duerme en la habitación.) Анна живёт [[4]]. (Ana vive en Bogotá.) Марко играет [[5]]. (Marco juega en el estadio.)',
        blanks: [
          { options: ['в академии', 'на академии', 'в академию', 'на академию'], answer: 'в академии', explain: 'В академии — academia es un interior. академия (-ия) → -и en prepositivo: в академии.' },
          { options: ['на столе', 'в столе', 'на стол', 'в стол'], answer: 'на столе', explain: 'На столе — sobre la mesa (superficie). стол → столе (+е).' },
          { options: ['в уроке', 'на урок', 'на уроке', 'в урок'], answer: 'на уроке', explain: 'На уроке — clase/lección siempre НА. урок → уроке (+е).' },
          { options: ['в комнате', 'на комнате', 'в комнату', 'на комнату'], answer: 'в комнате', explain: 'В комнате — habitación es interior. комната (fem -а) → комнате.' },
          { options: ['на Боготе', 'в Боготе', 'в Богота', 'на Богота'], answer: 'в Боготе', explain: 'В Боготе — ciudades → В. Богота (fem -а) → Боготе en prepositivo.' },
          { options: ['в стадионе', 'на стадионе', 'в стадион', 'на стадион'], answer: 'на стадионе', explain: 'На стадионе — estadio es excepción НА. стадион → стадионе (+е).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — escribiendo ubicaciones',
        tag: 'Sin opciones',
        intro: 'Escribe la preposición y la forma prepositiva correctas.',
        type: 'freeText',
        scene: 'Describiendo dónde están las cosas y personas',
        text: '1. Sofia está en casa (дом — masc): [[0]] 2. Los libros están en la mochila (сумка — fem -а): [[1]] 3. Nico está en la clase (урок — excepción НА): [[2]] 4. El gato está sobre la silla (стул — masc): [[3]] 5. Lina vive en Colombia (Колумбия — fem -ия): [[4]]',
        blanks: [
          { answer: 'в доме', accepted: ['в доме', 'В доме'], explain: 'В доме — interior. дом (masc cons) → доме (+е).' },
          { answer: 'в сумке', accepted: ['в сумке', 'В сумке'], explain: 'В сумке — interior de la mochila. сумка (fem -а) → сумке.' },
          { answer: 'на уроке', accepted: ['на уроке', 'На уроке'], explain: 'На уроке — clase siempre НА. урок → уроке (+е).' },
          { answer: 'на стуле', accepted: ['на стуле', 'На стуле'], explain: 'На стуле — sobre la silla (superficie). стул (masc) → стуле (+е).' },
          { answer: 'в Колумбии', accepted: ['в Колумбии', 'В Колумбии'], explain: 'В Колумбии — países → В. Колумбия (-ия) → Колумбии (excepción -и).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Construye oraciones completas con В o НА + prepositivo.',
        type: 'write',
        items: [
          { scene: 'Ubicación persona', prompt: 'Traduce al ruso: "Carlos está en el trabajo ahora." (сейчас — ahora, работа — trabajo)', answer: 'Карлос сейчас на работе', accepted: ['карлос сейчас на работе', 'карлос на работе сейчас'], explain: 'На работе — trabajo es excepción НА. работа → работе. Сейчас puede ir antes o después del sujeto.' },
          { scene: 'Ubicación objeto', prompt: 'Traduce al ruso: "El teléfono está sobre la mesa." (телефон — teléfono, лежит — está/yace, стол — mesa)', answer: 'Телефон лежит на столе', accepted: ['телефон лежит на столе', 'телефон на столе'], explain: 'На столе — sobre la mesa (superficie). стол (masc) → столе (+е).' },
          { scene: 'País / ciudad', prompt: 'Traduce al ruso: "Clara vive en Rusia." (жить — vivir, Россия — Rusia)', answer: 'Жанна живёт в России', accepted: ['жанна живёт в России', 'жанна живёт в россие', 'жанна в России'], explain: 'В России — Rusia usa В. Россия (-ия) → России (excepción -и). живёт = 3.ª sg de жить.' },
          { scene: 'Dos ubicaciones', prompt: 'Traduce al ruso: "Los niños están en la escuela y los padres están en el trabajo." (дети — niños, родители — padres)', answer: 'Дети в школе, родители на работе', accepted: ['дети в школе', 'родители на работе'], explain: 'В школе (interior) vs на работе (excepción НА). школа → школе, работа → работе.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Describe dónde están personas y cosas usando В y НА.',
        type: 'write',
        items: [
          { scene: 'Tu rutina de lugar', prompt: 'Describe dónde estás en diferentes momentos del día. Escribe 3 oraciones usando: в школе/в университете, на работе, дома (en casa, forma invariable).', answer: 'Утром я в школе. Днём я на работе. Вечером я дома.', accepted: ['в школе', 'на работе', 'дома'], explain: 'Утром (mañana) — в школе. Днём (tarde) — на работе. Вечером (noche) — дома. Дома es forma especial invariable.' },
          { scene: 'Describiendo tu habitación', prompt: 'Describe dónde están 3 objetos en tu cuarto. Usa: на столе, в сумке, на кровати (en la cama). Escribe 3 oraciones.', answer: 'Ноутбук на столе. Книга в сумке. Телефон на кровати.', accepted: ['на столе', 'в сумке', 'на кровати'], explain: 'На столе (sobre la mesa), в сумке (en la mochila — interior), на кровати (sobre la cama — superficie).' },
          { scene: 'Señalando lugares', prompt: 'Ana le explica a Marco dónde están los lugares en la academia WeLearn. Escribe 2 oraciones con В y 1 con НА.', answer: 'Библиотека в здании. Класс в коридоре. Книги на полке.', accepted: ['в здании', 'в коридоре', 'на полке', 'в классе', 'на уроке'], explain: 'В здании (en el edificio), в классе (en el salón), на полке (en el estante — superficie).' },
        ],
      },
    ],
  },
}

export default topic
