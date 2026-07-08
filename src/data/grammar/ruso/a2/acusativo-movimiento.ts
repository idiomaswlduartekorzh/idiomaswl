import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'acusativo-movimiento',
  order: '09',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'A2',
  title: 'Acusativo de movimiento en ruso A2: в/на + acusativo',
  shortTitle: 'Acusativo movimiento',
  metaTitle: 'Acusativo de movimiento ruso A2 — в + acusativo, на + acusativo, dirección',
  description:
    'El caso acusativo en ruso expresa el destino o dirección del movimiento con las preposiciones в (hacia dentro de un lugar cerrado) y на (hacia la superficie o eventos). Los sustantivos masculinos inanimados no cambian; los femeninos en -а/-я cambian a -у/-ю; los neutros no cambian. В + acusativo (в школу, в город) frente a на + acusativo (на работу, на концерт). Con verbos de movimiento: идти/ехать/лететь.',
  lead: 'Я иду в школу / Он едет на работу: el acusativo de dirección en ruso A2.',
  outcomes: [
    'Usar в + acusativo para destinos cerrados',
    'Usar на + acusativo para superficies y eventos',
    'Declinar sustantivos en acusativo singular',
    'Distinguir в/на con acusativo (movimiento) vs prepositivo (lugar)',
  ],

  guide: {
    goal: 'Expresar destinos y dirección usando в/на + acusativo con verbos de movimiento.',
    model: 'Я иду в магазин. (Voy a la tienda.) / Она едет на работу. (Ella va al trabajo.) / Мы летим в Москву. (Volamos a Moscú.)',
    formula: 'в/на + Acusativo (dirección) | Masc. inan. = Nom. | Fem. -а/-я → -у/-ю | Neutro = Nom.',
    decisions: [
      'Masc. inanimado: магазин → в магазин (sin cambio)',
      'Fem. -а/-я: школа → в школу | Москва → в Москву',
      'Fem. -ь: площадь → на площадь (sin cambio con -ь)',
      'Neutro: море → на море (sin cambio)',
      'в = lugares cerrados (zdania) | на = superficies, islas, trabajos, eventos',
    ],
    table: [
      ['Género', 'Cambio acusativo', 'Ejemplo dirección'],
      ['Masc. inanım.', 'sin cambio', 'в город, в банк, в парк'],
      ['Fem. -а/-я', '-а→-у / -я→-ю', 'в школу, в Россию, на работу'],
      ['Neutro', 'sin cambio', 'в море, на озеро'],
    ],
    mistakes: [
      '"Я в школе" (prepositivo = en la escuela) ≠ "Я иду в школу" (acusativo = voy a la escuela).',
      '"Он едет в работу" ❌ → "Он едет на работу" ✓ — работа exige на, no в.',
      '"В Москве" (estoy en Moscú) vs "в Москву" (voy a Moscú) — la preposición es la misma, cambia el caso.',
    ],
  },

  seo: [
    {
      heading: 'В vs на con acusativo: la distinción esencial',
      paragraphs: [
        'En ruso, los verbos de movimiento (идти, ехать, лететь, бежать...) exigen un destino en acusativo. La elección entre в (en/a) y на (en/a) depende del sustantivo: в se usa para lugares cerrados o delimitados donde se entra (в магазин, в школу, в город, в Россию), mientras que на se usa para superficies, lugares abiertos, trabajos, eventos y algunas palabras convencionales (на работу, на концерт, на улицу, на море, на Украину).',
        'Regla práctica: si en la pregunta "¿Dónde estás?" se usaría в + prepositivo → la dirección es в + acusativo. Si se usaría на + prepositivo → la dirección es на + acusativo. "Я в школе" (estoy en la escuela) → "Я иду в школу" (voy a la escuela).',
      ],
    },
    {
      heading: 'Declinación de sustantivos en acusativo singular',
      paragraphs: [
        'En acusativo singular, solo los sustantivos femeninos en -а/-я cambian terminación: -а → -у (школа → школу, Москва → Москву) y -я → -ю (Россия → Россию, деревня → деревню). Los sustantivos masculinos inanimados y los neutros mantienen la forma del nominativo: банк → в банк, море → на море. Los masculinos animados cambian como los genitivos (al estudiante — к студенту en dativo, pero en acusativo: студента).',
        'Los adjetivos en acusativo con sustantivos inanimados: masc. adj. = nominativo (в красивый парк), fem. adj.: -ую/-юю (в красивую школу). Con femeninos: el adjetivo también cambia: новую → новую школу.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'в + Acus. (edificios) | на + Acus. (superficies/eventos). Fem. -а→-у/-я→-ю.',
    graphicPrompt: 'Flechas de movimiento hacia edificios (в) y hacia superficies/eventos (на).',
    scene: [
      ['Я иду в школу каждый день.', 'Voy a la escuela todos los días.'],
      ['Она едет на работу на метро.', 'Ella va al trabajo en metro.'],
      ['Мы идём в магазин за продуктами.', 'Vamos a la tienda a comprar comida.'],
      ['Дети бегут на улицу играть.', 'Los niños corren a la calle a jugar.'],
      ['Мы летим в Москву завтра.', 'Volamos a Moscú mañana.'],
      ['Он едет на концерт вечером.', 'Él va al concierto esta noche.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['в + Acus. (edificios, ciudades)', 'на + Acus. (trabajo, eventos, superficie)', 'Fem. -а→-у, -я→-ю', 'vs prepositivo (lugar)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige в o на',
        tag: 'Opción múltiple',
        intro: 'Selecciona la preposición correcta de movimiento.',
        type: 'choice',
        items: [
          {
            scene: 'Я иду ___ школу.',
            lines: [['', 'Я иду ___ школу.']],
            options: ['в', 'на', 'из', 'с'],
            answer: 'в',
            explain: '"в школу" — школа es un edificio cerrado → в + acusativo.',
          },
          {
            scene: 'Он едет ___ работу.',
            lines: [['', 'Он едет ___ работу.']],
            options: ['на', 'в', 'из', 'от'],
            answer: 'на',
            explain: '"на работу" — работа es convencional → на + acusativo.',
          },
          {
            scene: 'Мы летим ___ Москву.',
            lines: [['', 'Мы летим ___ Москву.']],
            options: ['в', 'на', 'из', 'по'],
            answer: 'в',
            explain: '"в Москву" — ciudad → в + acusativo (Москва → Москву).',
          },
          {
            scene: 'Дети идут ___ площадь.',
            lines: [['', 'Дети идут ___ площадь.']],
            options: ['на', 'в', 'к', 'из'],
            answer: 'на',
            explain: '"на площадь" — plaza es superficie abierta → на + acusativo.',
          },
          {
            scene: 'Она едет ___ концерт.',
            lines: [['', 'Она едет ___ концерт.']],
            options: ['на', 'в', 'из', 'к'],
            answer: 'на',
            explain: '"на концерт" — evento → на + acusativo.',
          },
          {
            scene: 'Мы идём ___ аптеку.',
            lines: [['', 'Мы идём ___ аптеку.']],
            options: ['в', 'на', 'из', 'по'],
            answer: 'в',
            explain: '"в аптеку" — farmacia es edificio cerrado → в + acusativo (аптека → аптеку).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dirección y lugar',
        tag: '2 espacios',
        intro: 'Completa con el acusativo de movimiento y la preposición correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Voy a la universidad (movimiento) / Estudio en la universidad (lugar).',
            lines: [['', 'Я иду [[0]] (в/на + университет). Я учусь [[1]] (в/на + университет).']],
            blanks: [
              { options: ['в университет', 'на университет', 'в университете', 'на университете'], answer: 'в университет', explain: '"в университет" — acusativo de dirección (университет masc. inan. = sin cambio).' },
              { options: ['в университете', 'на университете', 'в университет', 'на университет'], answer: 'в университете', explain: '"в университете" — prepositivo de lugar.' },
            ],
          },
          {
            scene: 'Vamos al trabajo / Estamos en el trabajo.',
            lines: [['', 'Мы едем [[0]] (на + работа). Мы [[1]] (на + работа).']],
            blanks: [
              { options: ['на работу', 'на работе', 'в работу', 'на работа'], answer: 'на работу', explain: '"на работу" — acusativo: работа → работу (-а→-у).' },
              { options: ['на работе', 'на работу', 'в работе', 'на работа'], answer: 'на работе', explain: '"на работе" — prepositivo de lugar (estamos en el trabajo).' },
            ],
          },
          {
            scene: 'Ella vuela a Rusia / Vive en Rusia.',
            lines: [['', 'Она летит [[0]] (в + Россия). Она живёт [[1]] (в + Россия).']],
            blanks: [
              { options: ['в Россию', 'в России', 'на Россию', 'в Россия'], answer: 'в Россию', explain: '"в Россию" — acusativo: Россия → Россию (-я→-ю).' },
              { options: ['в России', 'в Россию', 'на России', 'в Россия'], answer: 'в России', explain: '"в России" — prepositivo de lugar.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día activo',
        tag: 'Texto guiado',
        intro: 'Completa el texto con в/на + acusativo.',
        type: 'guidedText',
        scene: 'Антон рассказывает о своём дне.',
        text: 'Утром я иду [[0]] (в/на + школа). После школы я еду [[1]] (в/на + библиотека). Там я занимаюсь. Вечером мы идём [[0]] (в/на + кино). А в субботу я еду [[1]] (в/на + стадион) смотреть футбол.',
        blanks: [
          { options: ['в школу', 'на школу', 'в школе', 'на школе'], answer: 'в школу', explain: '"в школу / в кино" — edificios cerrados → в + acusativo. Fem. школа→школу; neutro кино→кино (sin cambio).' },
          { options: ['в библиотеку', 'на стадион', 'в библиотеке', 'на стадионе'], answer: 'в библиотеку', explain: '"в библиотеку / на стадион" — biblioteca: edificio → в; estadio: superficie → на.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el destino',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe в/на + acusativo del sustantivo dado.',
        type: 'freeText',
        scene: 'Напишите предлог и форму винительного падежа.',
        text: 'Я иду ___ (аптека). / Мы едем ___ (Москва). / Она идёт ___ (работа). / Дети бегут ___ (улица).',
        blanks: [
          { answer: 'в аптеку', explain: '"в аптеку" — аптека (fem.) → аптеку (-а→-у). Edificio → в.' },
          { answer: 'в Москву', explain: '"в Москву" — Москва (fem.) → Москву (-а→-у). Ciudad → в.' },
          { answer: 'на работу', explain: '"на работу" — работа (fem.) → работу (-а→-у). Trabajo → на.' },
          { answer: 'на улицу', explain: '"на улицу" — улица (fem.) → улицу (-а→-у). Calle/exterior → на.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe tus movimientos',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con el verbo de movimiento y destino.',
        type: 'write',
        items: [
          {
            scene: 'Каждое утро я иду... (escuela/work — elige uno).',
            prompt: 'Usa идти/ехать + в/на + acusativo.',
            answer: 'Каждое утро я иду в школу.',
            accepted: ['Каждое утро я еду на работу.'],
            explain: '"в школу" (fem. -а→-у, edificio) / "на работу" (fem. -а→-у, trabajo → на).',
          },
          {
            scene: 'На выходных мы едем... (concert/cinema/stadium).',
            prompt: 'Usa на/в + acusativo para un destino de ocio.',
            answer: 'На выходных мы едем на концерт.',
            accepted: ['На выходных мы идём в кино.', 'На выходных мы едем на стадион.'],
            explain: '"на концерт" (evento → на, masc. inan. sin cambio) / "в кино" (neutro, sin cambio).',
          },
          {
            scene: '¿Adónde vas mañana?',
            prompt: 'Responde con "Завтра я иду/еду..." + destino.',
            answer: 'Завтра я иду в больницу.',
            accepted: ['Завтра я еду в Москву.', 'Завтра я иду на рынок.'],
            explain: '"в больницу" (fem. больница→больницу) / "в Москву" / "на рынок" (masc. inan., sin cambio).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu semana',
        tag: 'Escritura libre',
        intro: 'Escribe sobre adónde vas durante la semana usando verbos de movimiento.',
        type: 'write',
        items: [
          {
            scene: 'Describe adónde vas de lunes a viernes.',
            prompt: 'Используй в/на + акусатив с глаголами идти, ехать, ходить.',
            answer: 'В понедельник я иду в университет. Во вторник я еду на работу. В среду я хожу в спортзал. В четверг я еду на рынок. В пятницу мы идём в кино.',
            accepted: ['По утрам я хожу в школу. Во вторник я еду на работу в центр. В пятницу мы идём на концерт.'],
            explain: 'в + Acus. (edificios) | на + Acus. (eventos, trabajo). Fem. -а→-у; masc. inan. sin cambio.',
          },
          {
            scene: 'Describe los desplazamientos de tu familia.',
            prompt: 'Escribe sobre adónde van las personas de tu familia usando в/на + acusativo.',
            answer: 'Мой брат ходит в университет каждый день. Мама едет на работу на метро. Папа идёт в магазин по субботам. Сестра ходит на танцы во вторник.',
            accepted: ['Моя мама ходит на работу пешком. Папа едет в офис на машине. Брат ходит в школу рядом с домом.'],
            explain: 'в/на + Acus. según la convención del sustantivo. Femeninos: -а→-у, -я→-ю.',
          },
        ],
      },
    ],
  },
}

export default topic
