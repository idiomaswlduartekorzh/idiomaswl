import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'preposiciones-direccion',
  order: '12',
  color: '#1a2ecc',
  category: 'Preposiciones',
  level: 'A1',
  title: 'Preposiciones В y НА para dirección en ruso (caso acusativo)',
  shortTitle: 'В y НА — dirección',
  metaTitle: 'Preposiciones В y НА para dirección en ruso A1 | в школу, на работу — acusativo',
  description:
    'В (v) y НА (na) con caso acusativo expresan DIRECCIÓN en ruso: responden a Куда? (¿A dónde?). В школу (v shkolu — a la escuela), на работу (na rabotu — al trabajo). Femeninos: -у/-ю; masculinos inanimados y neutros: sin cambio. Contraste clave: в школе (ubicación, prepositivo) vs в школу (dirección, acusativo). Para el regreso: ИЗ (iz — de interior) vs С (s — de superficie).',
  lead: 'Domina la diferencia entre ubicación (в школе) y dirección (в школу) — el contraste prepositivo/acusativo que estructura el espacio en ruso.',
  outcomes: [
    'Usar В/НА + acusativo para expresar dirección (Куда?)',
    'Contrastar в школе (ubicación) vs в школу (dirección)',
    'Usar ИЗ y С para expresar el punto de origen (de dónde vengo)',
  ],
  guide: {
    goal: 'Expresar hacia dónde se va usando В/НА + acusativo, respondiendo a Куда? (¿A dónde?).',
    model: 'Я иду + В/НА + [sustantivo acusativo] | Я иду ИЗ/С + [genitivo]',
    formula: 'В школу (fem: -а→-у) | на работу | в центр (masc: sin cambio)',
    decisions: [
      '¿Preguntas adónde? (Куда?) → В/НА + acusativo',
      '¿El destino es un interior? → В + acusativo (в школу, в город)',
      '¿El destino es superficie/evento de lista НА? → НА + acusativo (на работу, на урок)',
      '¿El sustantivo femenino termina en -а? → -а → -у (школа → в школу)',
      '¿El sustantivo femenino termina en -я? → -я → -ю (деревня → в деревню)',
      '¿El sustantivo es masculino inanimado o neutro? → sin cambio (в центр, на стол)',
    ],
    table: [
      ['Preposición', 'Caso', 'Ejemplo'],
      ['В (a interior)', 'Acusativo', 'в школу (v shkolu — a la escuela)'],
      ['НА (a superficie/evento)', 'Acusativo', 'на работу (na rabotu — al trabajo)'],
      ['ИЗ (de interior)', 'Genitivo', 'из школы (iz shkoly — de la escuela)'],
      ['С (de superficie/evento)', 'Genitivo', 'с работы (s raboty — del trabajo)'],
      ['Contrast. ubicación', 'Prepositivo', 'в школе (v shkole — en la escuela)'],
    ],
    mistakes: [
      'Confundir в школе (prepositivo — ubicación, dónde estoy) con в школу (acusativo — dirección, adónde voy). Este par es el más frecuente del A1.',
      'Masculinos inanimados NO cambian en acusativo con preposición: иду в магазин (voy a la tienda — магазин no cambia).',
      'ИЗ es el opuesto de В: В школу (voy a la escuela) → ИЗ школы (vengo de la escuela). С es opuesto de НА: на работу → с работы.',
      'Los nombres propios de ciudades siguen las mismas reglas: еду в Москву (fem -а → -у) / еду в Лондон (masc — sin cambio).',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se usa В/НА + acusativo para decir adónde vas?',
      paragraphs: [
        'Para expresar dirección en ruso — adónde te diriges — se usa В o НА seguido del caso acusativo. La elección entre В y НА sigue la misma lógica que en la ubicación: В para interiores (в школу — a la escuela, в город — a la ciudad) y НА para superficies o eventos de lista fija (на работу — al trabajo, на урок — a clase).',
        'El contraste fundamental es: ubicación usa caso prepositivo (в школе — estoy en la escuela) y dirección usa acusativo (в школу — voy a la escuela). Solo cambia el caso; la preposición es la misma.',
      ],
      table: [
        ['Situación', 'Prepositivo (Где?)', 'Acusativo (Куда?)'],
        ['Escuela', 'в школе (estoy en la escuela)', 'в школу (voy a la escuela)'],
        ['Trabajo', 'на работе (estoy en el trabajo)', 'на работу (voy al trabajo)'],
        ['Clase', 'на уроке (estoy en clase)', 'на урок (voy a clase)'],
        ['Ciudad', 'в городе (estoy en la ciudad)', 'в город (voy a la ciudad)'],
      ],
    },
    {
      heading: '¿Cómo se usan ИЗ y С para indicar el punto de origen?',
      paragraphs: [
        'Para expresar el origen — de dónde vengo — el ruso usa ИЗ (para lugares interiores, par de В) y С (para superficies o eventos, par de НА). ИЗ/С van siempre con genitivo. Иду из школы (vengo de la escuela) — ИЗ porque В es para la escuela. Иду с работы (vengo del trabajo) — С porque НА es para работа.',
        'Estos pares simétricos son una elegancia del ruso: cada preposición de dirección (В/НА → destino) tiene su inverso de origen (ИЗ/С → punto de partida). Aprender los pares juntos facilita la memorización.',
      ],
    },
    {
      heading: '¿Cómo se emparejan в/на (destino) con из/с (origen)?',
      paragraphs: [
        'El ruso empareja la preposición de destino con la de origen: lo que entra con в sale con из, y lo que entra con на sale con с. Si vas a la escuela con в (в школу), vuelves de la escuela con из (из школы). Si vas a un concierto con на (на концерт), vuelves con с (с концерта). Es un sistema simétrico: в↔из, на↔с.',
        'La trampa para el hispanohablante es que en español "a" y "de" valen para todo, mientras que en ruso hay que recordar qué sustantivos van con на (eventos, superficies, algunas zonas: на работу→с работы) frente a в (lugares cerrados, países, ciudades: в Россию→из России). Además, el destino pide acusativo (в школу) y el origen pide genitivo (из школы).',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The prepositivo/acusativo contrast for location vs direction is a key cognitive milestone. Students who master "в школе vs в школу" have internalized how Russian encodes spatial relationships through case.',
    graphicPrompt:
      'Arrow diagram: location box (в школе, на работе) with stay icon vs direction arrows (в школу, на работу) pointing away. ИЗ/С arrows pointing back. Blue theme.',
    scene: [
      ['Я иду в школу', 'ya idu v shkolu — voy a la escuela (dirección, acusativo)'],
      ['Я в школе', 'ya v shkole — estoy en la escuela (ubicación, prepositivo)'],
      ['Иду на работу', 'idu na rabotu — voy al trabajo (НА + acусativo)'],
      ['Я на работе', 'ya na rabote — estoy en el trabajo (НА + prepositivo)'],
      ['Иду из школы', 'idu iz shkoly — vengo de la escuela (ИЗ + genitivo)'],
      ['Иду с работы', 'idu s raboty — vengo del trabajo (С + genitivo)'],
      ['Еду в Москву', 'yedu v Moskvu — voy a Moscú (fem -а→-у)'],
      ['Еду в Лондон', 'yedu v London — voy a Londres (masc, sin cambio)'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['в школе(prepositivo) vs в школу(acusativo)', 'fem -а→-у dirección', 'ИЗ vs С (origen)'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Ubicación vs dirección',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta según si expresas ubicación o dirección.',
        type: 'choice',
        items: [
          { scene: 'Dirección femenino', lines: [['', 'Lina VA a la escuela ahora: Лина идёт ___']], options: ['в школе', 'в школу', 'из школы', 'в школа'], answer: 'в школу', explain: 'Dirección (Куда?) → В + acusativo. школа (fem -а) → школу.' },
          { scene: 'Ubicación', lines: [['', 'Carlos ESTÁ en la escuela ahora: Карлос ___']], options: ['в школу', 'из школы', 'в школе', 'в школа'], answer: 'в школе', explain: 'Ubicación (Где?) → В + prepositivo. школа → школе.' },
          { scene: 'Dirección НА', lines: [['', 'Dario VA al trabajo: Давид идёт ___']], options: ['на работе', 'на работу', 'с работы', 'на работа'], answer: 'на работу', explain: 'Dirección НА + acusativo. работа (fem -а) → работу.' },
          { scene: 'Origen ИЗ', lines: [['', 'Ana VIENE de la escuela: Анна идёт ___']], options: ['в школу', 'в школе', 'из школы', 'со школы'], answer: 'из школы', explain: 'Origen de interior → ИЗ + genitivo. школа → школы (gen fem).' },
          { scene: 'Masculino inanimado — dirección', lines: [['', 'Marco VA al centro: Марко идёт ___']], options: ['в центре', 'в центра', 'в центр', 'из центра'], answer: 'в центр', explain: 'Dirección В + acusativo. центр (masc inanimado) → центр sin cambio.' },
          { scene: 'Origen С', lines: [['', 'Sara VIENE del trabajo: Жанна идёт ___']], options: ['на работе', 'на работу', 'из работы', 'с работы'], answer: 'с работы', explain: 'Origen de НА → С + genitivo. работа → работы (gen fem). С es par inverso de НА.' },
          { scene: 'Ciudad — dirección', lines: [['', 'Sofia VIAJA a Moscú (Москва — fem): Соня едет ___']], options: ['в Москве', 'из Москвы', 'в Москву', 'в Москва'], answer: 'в Москву', explain: 'Dirección В + acusativo. Москва (fem -а) → Москву.' },
          { scene: 'Contrast. В/НА dirección', lines: [['', '"Voy a clase" en ruso: Я иду ___']], options: ['в уроке', 'в урок', 'на урок', 'на уроке'], answer: 'на урок', explain: 'Урок/clase siempre НА. Dirección НА + acusativo. урок (masc) → урок sin cambio.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Dirección y origen: В/НА vs ИЗ/С',
        tag: '2 espacios',
        intro: 'Completa con la forma de dirección y la de origen correspondiente.',
        type: 'dual',
        items: [
          { scene: 'Escuela — ir y venir', lines: [['', 'IR a la escuela: [[0]] / VENIR de la escuela: [[1]]']], blanks: [{ options: ['в школу', 'в школе', 'из школы', 'на школу'], answer: 'в школу', explain: 'Dirección В + acusativo. школа → школу (fem -а→-у).' }, { options: ['из школы', 'в школу', 'со школы', 'из школе'], answer: 'из школы', explain: 'Origen ИЗ + genitivo. школа → школы.' }] },
          { scene: 'Trabajo — ir y venir', lines: [['', 'IR al trabajo: [[0]] / VENIR del trabajo: [[1]]']], blanks: [{ options: ['на работу', 'на работе', 'с работы', 'в работу'], answer: 'на работу', explain: 'Dirección НА + acusativo. работа → работу (fem -а→-у).' }, { options: ['с работы', 'на работы', 'из работы', 'со работы'], answer: 'с работы', explain: 'Origen С + genitivo. работа → работы.' }] },
          { scene: 'Ciudad — ir', lines: [['', 'IR a Moscú: [[0]]. Forma acusativa de Москва: [[1]]']], blanks: [{ options: ['в Москву', 'в Москве', 'из Москвы', 'в Москва'], answer: 'в Москву', explain: 'Dirección В + acusativo. Москва (fem -а) → Москву.' }, { options: ['Москву', 'Москве', 'Москвы', 'Москва'], answer: 'Москву', explain: 'Acusativo femenino -а → -у. Москва → Москву.' }] },
          { scene: 'Clase', lines: [['', 'IR a clase: [[0]] / ESTAR en clase: [[1]]']], blanks: [{ options: ['на урок', 'на уроке', 'с урока', 'в урок'], answer: 'на урок', explain: 'Dirección НА + acusativo. урок (masc) → урок (sin cambio).' }, { options: ['на уроке', 'на урок', 'с урока', 'в уроке'], answer: 'на уроке', explain: 'Ubicación НА + prepositivo. урок → уроке.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — dirección en situaciones',
        tag: 'Opciones',
        intro: 'Elige la forma correcta de dirección u origen para cada espacio.',
        type: 'guidedText',
        scene: 'Un día de Carlos en la ciudad',
        text: 'Утром Карлос идёт [[0]]. (Por la mañana Carlos va a la escuela.) После урока он идёт [[1]]. (Después de clase va a la biblioteca.) Потом он едет [[2]]. (Luego viaja a Moscú.) Вечером он идёт [[3]]. (Por la noche va a casa.) Завтра он идёт [[4]]. (Mañana va al trabajo.) Он идёт [[5]]. (Viene de la escuela.)',
        blanks: [
          { options: ['в школу', 'в школе', 'из школы', 'в школа'], answer: 'в школу', explain: 'Dirección В + acusativo. школа → школу.' },
          { options: ['в библиотеку', 'в библиотеке', 'из библиотеки', 'на библиотеку'], answer: 'в библиотеку', explain: 'Dirección В + acusativo. библиотека (fem -а) → библиотеку.' },
          { options: ['в Москве', 'в Москву', 'из Москвы', 'на Москву'], answer: 'в Москву', explain: 'Dirección В + acusativo. Москва (fem -а) → Москву.' },
          { options: ['домой', 'дома', 'из дома', 'в дом'], answer: 'домой', explain: 'Домой (domoy) = a casa — forma especial de dirección. Más natural que "в дом".' },
          { options: ['на работу', 'на работе', 'с работы', 'в работу'], answer: 'на работу', explain: 'Dirección НА + acusativo. работа → работу.' },
          { options: ['в школу', 'в школе', 'из школы', 'со школы'], answer: 'из школы', explain: 'Origen ИЗ + genitivo. школа → школы. Viene DE la escuela.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — escribiendo direcciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta de dirección sin opciones de ayuda.',
        type: 'freeText',
        scene: 'Describiendo adónde van las personas',
        text: '1. Sara va al trabajo (работа — fem): Жанна идёт [[0]]. 2. Sofia va a clase (урок — masc, НА): София идёт [[1]]. 3. Marco va a la tienda (магазин — masc inanimado): Марко идёт [[2]]. 4. Ana viene de la escuela (ИЗ + gen): Анна идёт [[3]]. 5. Dario viaja a Bogotá (Богота — fem -а): Давид едет [[4]].',
        blanks: [
          { answer: 'на работу', accepted: ['на работу', 'На работу'], explain: 'Dirección НА + acusativo. работа (fem -а) → работу.' },
          { answer: 'на урок', accepted: ['на урок', 'На урок'], explain: 'Урок (masc) en dirección НА + acusativo → урок sin cambio.' },
          { answer: 'в магазин', accepted: ['в магазин', 'В магазин'], explain: 'Dirección В + acusativo. магазин (masc inanimado) → магазин sin cambio.' },
          { answer: 'из школы', accepted: ['из школы', 'Из школы'], explain: 'Origen ИЗ + genitivo. школа → школы (gen fem).' },
          { answer: 'в Боготу', accepted: ['в Боготу', 'В Боготу'], explain: 'Dirección В + acusativo. Богота (fem -а) → Боготу.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Construye oraciones completas con dirección y origen.',
        type: 'write',
        items: [
          { scene: 'Dirección femenino', prompt: 'Traduce al ruso: "Lina va a la escuela a las 8." (в 8 часов — a las 8, идти — ir)', answer: 'Лина идёт в школу в 8 часов', accepted: ['лина идёт в школу', 'лина в школу в 8'], explain: 'В школу — dirección, acusativo. школа → школу (fem -а→-у).' },
          { scene: 'Contraste ubicación/dirección', prompt: 'Traduce DOS frases: "Estoy en la escuela" (ubicación) y "Voy a la escuela" (dirección).', answer: 'Я в школе. Я иду в школу.', accepted: ['я в школе', 'я иду в школу', 'в школе', 'в школу'], explain: 'В школе = ubicación (prepositivo). В школу = dirección (acusativo). La preposición es igual, el caso cambia.' },
          { scene: 'Origen С', prompt: 'Traduce al ruso: "Carlos viene del trabajo." (идти — ir, с + genitivo)', answer: 'Карлос идёт с работы', accepted: ['карлос идёт с работы', 'карлос с работы'], explain: 'С работы — origen de НА. работа → работы (gen fem). С es par inverso de НА.' },
          { scene: 'Ciudad destino', prompt: 'Traduce al ruso: "Sara viaja a Moscú." (ехать — viajar en transporte)', answer: 'Жанна едет в Москву', accepted: ['жанна едет в москву', 'жанна едет в Москву'], explain: 'В Москву — dirección, acusativo. Москва (fem -а) → Москву.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Describe tu rutina de desplazamientos usando dirección y origen.',
        type: 'write',
        items: [
          { scene: 'Rutina de movimiento', prompt: 'Describe un día típico con 3 desplazamientos. Usa: иду/еду + в/на + acusativo. Por ejemplo: ir a la escuela, al trabajo, a casa.', answer: 'Я иду в школу. Потом я еду на работу. Вечером я иду домой.', accepted: ['в школу', 'на работу', 'домой', 'в университет', 'на урок'], explain: 'В школу (dirección interior), на работу (dirección НА), домой (a casa — especial).' },
          { scene: 'Ir y volver', prompt: 'Ana describe su ida y vuelta a la escuela. Escribe 2 oraciones: una de ida (в школу) y una de regreso (из школы).', answer: 'Утром я иду в школу. Вечером я иду из школы.', accepted: ['иду в школу', 'иду из школы', 'из школы домой'], explain: 'В школу (dirección) vs из школы (origen). Contraste В→ИЗ para ir/venir del interior.' },
          { scene: 'Viaje imaginario', prompt: 'Marco planea un viaje. Escribe: adónde va (В + ciudad en acusativo) y de dónde viene (ИЗ + ciudad en genitivo). Usa Москва o Богота.', answer: 'Я еду в Москву. Я приезжаю из Боготы.', accepted: ['в Москву', 'из Москвы', 'в Боготу', 'из Боготы'], explain: 'В Москву (dirección, fem -а→-у). Из Москвы (origen, gen fem -ы). Или: в Боготу / из Боготы.' },
        ],
      },
    ],
  },
}

export default topic
