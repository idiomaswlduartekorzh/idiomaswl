import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'superlativos',
  order: '12',
  color: '#1a2ecc',
  category: 'Comparación',
  level: 'A2',
  title: 'Superlativos en ruso A2: самый + adjetivo, лучший, наибольший',
  shortTitle: 'Superlativos',
  metaTitle: 'Superlativos ruso A2 — самый + adj, лучший, худший, наибольший, превосходная степень',
  description:
    'El superlativo en ruso se forma principalmente con самый + adjetivo (concuerda en género, número y caso): самый большой (el más grande), самая красивая (la más bonita). También existe la forma sintética simple (sufijo -ейший/-айший) para el habla formal. Superlativos irregulares: хороший → лучший (el mejor), плохой → худший (el peor). La construcción в + prepositivo añade el complemento: самый большой город в мире.',
  lead: 'Это самый красивый город в мире / Он лучший студент в группе: los superlativos en ruso A2.',
  outcomes: [
    'Formar superlativos con самый + adjetivo',
    'Acordar самый en género, número y caso',
    'Usar лучший y худший como superlativos irregulares',
    'Añadir el complemento con в + prepositivo',
  ],

  guide: {
    goal: 'Expresar el grado máximo usando самый + adjetivo con concordancia.',
    model: 'Это самый большой город в мире. (Esta es la ciudad más grande del mundo.) / Она самая лучшая студентка в группе. (Ella es la mejor estudiante del grupo.)',
    formula: 'самый/самая/самое/самые + adj | самый (masc.) / самая (fem.) / самое (neut.) / самые (pl.)',
    decisions: [
      'Masc.: самый + adj masc. → самый большой город, самый лучший фильм',
      'Fem.: самая + adj fem. → самая красивая улица, самая дорогая машина',
      'Neut.: самое + adj neut. → самое интересное место',
      'Pl.: самые + adj pl. → самые трудные задания',
      'Irregulares: хороший → лучший (лучший в мире) / плохой → худший',
    ],
    table: [
      ['Género', 'Forma самый', 'Ejemplo'],
      ['Masc.', 'самый + adj', 'самый популярный актёр'],
      ['Fem.', 'самая + adj', 'самая известная певица'],
      ['Neut. / Pl.', 'самое / самые + adj', 'самое вкусное блюдо / самые трудные слова'],
    ],
    mistakes: [
      '"Самый лучший" — redundante pero muy frecuente en el habla coloquial rusa. Formal: "лучший".',
      '"Самый большой в мире" ✓ — complemento con в + prepositivo (мир → мире).',
      '"Она самая красивый" ❌ → "Она самая красивая" ✓ — самая + adj. femenino.',
    ],
  },

  seo: [
    {
      heading: 'Самый + adjetivo: la forma de superlativo más usada',
      paragraphs: [
        'La forma más frecuente del superlativo en ruso es самый/самая/самое/самые + adjetivo en su forma larga. Самый concuerda con el sustantivo al que acompaña: самый (masculino), самая (femenino), самое (neutro), самые (plural). Ejemplo: самый большой город (la ciudad más grande), самая красивая девушка (la chica más bonita), самое интересное место (el lugar más interesante), самые трудные слова (las palabras más difíciles).',
        'Para añadir el complemento del superlativo (en X, de X), se usa в + prepositivo: "самый большой город в России" (la ciudad más grande de Rusia), "лучший ресторан в городе" (el mejor restaurante de la ciudad). El complemento con генитив también es posible: "лучший в мире" (el mejor del mundo).',
      ],
    },
    {
      heading: 'Superlativos irregulares: лучший, худший',
      paragraphs: [
        'Los superlativos irregulares más importantes: хороший (bueno) → лучший (el mejor), плохой (malo) → худший (el peor), большой (grande) → наибольший (formal, el mayor), маленький → наименьший (formal, el menor). En el habla cotidiana, "самый лучший" y "самый плохой" también se usan aunque técnicamente лучший ya es superlativo.',
        'Лучший, лучшая, лучшее, лучшие se declinan como adjetivos normales: лучший фильм, лучшей книги, лучшему другу. "Он лучший ученик в классе" (Él es el mejor alumno de la clase). "Это худший вариант" (Esta es la peor opción).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'самый/самая/самое/самые + adj. лучший/худший (irr.). в + предлог. падеж.',
    graphicPrompt: 'Podio de tres puestos: primero con "самый" y estrella.',
    scene: [
      ['Это самый красивый город в Европе.', 'Esta es la ciudad más bonita de Europa.'],
      ['Она самая умная студентка в группе.', 'Ella es la estudiante más inteligente del grupo.'],
      ['Это самое вкусное мороженое в мире !', '¡Este es el helado más rico del mundo!'],
      ['Сегодня самый холодный день этого года.', 'Hoy es el día más frío de este año.'],
      ['Он лучший игрок в команде.', 'Es el mejor jugador del equipo.'],
      ['Это худший фильм, который я видел.', 'Es la peor película que he visto.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['самый/самая/самое/самые', 'лучший/худший (irregulares)', 'в + предлоге (complemento)', 'concordancia de género'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta de самый',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta de самый para el superlativo.',
        type: 'choice',
        items: [
          {
            scene: 'Это ___ большой город в стране.',
            lines: [['', 'Это ___ большой город в стране.']],
            options: ['самый', 'самая', 'самое', 'самые'],
            answer: 'самый',
            explain: '"самый" — город es masculino → самый (masc.).',
          },
          {
            scene: 'Она ___ красивая актриса в мире.',
            lines: [['', 'Она ___ красивая актриса в мире.']],
            options: ['самая', 'самый', 'самое', 'самые'],
            answer: 'самая',
            explain: '"самая" — актриса es femenino → самая (fem.).',
          },
          {
            scene: 'Это ___ трудное упражнение в учебнике.',
            lines: [['', 'Это ___ трудное упражнение в учебнике.']],
            options: ['самое', 'самый', 'самая', 'самые'],
            answer: 'самое',
            explain: '"самое" — упражнение es neutro → самое (neut.).',
          },
          {
            scene: 'Они ___ умные студенты в университете.',
            lines: [['', 'Они ___ умные студенты в университете.']],
            options: ['самые', 'самый', 'самая', 'самое'],
            answer: 'самые',
            explain: '"самые" — plural → самые.',
          },
          {
            scene: 'Он ___ (хороший) ученик в классе.',
            lines: [['', 'Он ___ ученик в классе.']],
            options: ['лучший', 'самый хороший', 'самый лучший', 'хорошейший'],
            answer: 'лучший',
            explain: '"лучший" — superlativo irregular de хороший. Sin самый (técnicamente).',
          },
          {
            scene: 'Сегодня ___ холодный день зимы.',
            lines: [['', 'Сегодня ___ холодный день зимы.']],
            options: ['самый', 'самая', 'самое', 'самые'],
            answer: 'самый',
            explain: '"самый" — день es masculino → самый холодный.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Superlativo con complemento',
        tag: '2 espacios',
        intro: 'Completa el superlativo y el complemento.',
        type: 'dual',
        items: [
          {
            scene: 'La montaña más alta de Rusia.',
            lines: [['', '[[0]] высокая гора [[1]] России.']],
            blanks: [
              { options: ['Самая', 'Самый', 'Самое', 'Самые'], answer: 'Самая', explain: '"Самая" — гора es femenino → самая.' },
              { options: ['в', 'из', 'на', 'с'], answer: 'в', explain: '"в России" — complemento superlativo → в + prepositivo.' },
            ],
          },
          {
            scene: 'El mejor estudiante del grupo.',
            lines: [['', '[[0]] студент [[1]] группе.']],
            blanks: [
              { options: ['Лучший', 'Самый лучший', 'Лучшая', 'Самый хороший'], answer: 'Лучший', explain: '"Лучший" — superlativo irregular de хороший (masc.). студент es masc.' },
              { options: ['в', 'из', 'на', 'со'], answer: 'в', explain: '"в группе" — en + prepositivo (группа → группе).' },
            ],
          },
          {
            scene: 'Los ejercicios más difíciles del libro.',
            lines: [['', '[[0]] трудные задания [[1]] книге.']],
            blanks: [
              { options: ['Самые', 'Самый', 'Самая', 'Самое'], answer: 'Самые', explain: '"Самые" — задания es plural → самые.' },
              { options: ['в', 'из', 'на', 'с'], answer: 'в', explain: '"в книге" — в + prepositivo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Mi top favorito',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre las cosas favoritas.',
        type: 'guidedText',
        scene: 'Лена рассказывает о своих фаворитах.',
        text: 'Для меня Барселона — [[0]] (самый/самая) красивый город в мире. [[1]] (Лучший/Лучшая) ресторан здесь — небольшое место недалеко от моря. [[0]] (Самый/Самая) вкусное блюдо — паэлья. Но [[2]] (самый/самое) трудное — это найти там столик !',
        blanks: [
          { options: ['самый', 'самая', 'самое', 'самые'], answer: 'самый', explain: '"самый" — город es masculino; "самая" para ciudad → ciudad es femenino en esp., pero город es masc. en ruso → самый.' },
          { options: ['Лучший', 'Лучшая', 'Лучшее', 'Лучшие'], answer: 'Лучший', explain: '"Лучший" — ресторан es masculino → лучший (irr. superlativo).' },
          { options: ['самое', 'самый', 'самая', 'самые'], answer: 'самое', explain: '"самое" — трудное (neutro) → самое.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el superlativo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el superlativo correcto.',
        type: 'freeText',
        scene: 'Образуйте превосходную степень.',
        text: 'Эверест — ___ гора в мире. (alta, femenino) / Это ___ книга года. (mejor) / Сегодня ___ жаркий день лета. (el más) / Он сделал ___ ошибку. (el peor, la peor)',
        blanks: [
          { answer: 'самая высокая', explain: '"самая высокая" — гора (fem.) → самая + adj. fem.' },
          { answer: 'лучшая', explain: '"лучшая" — superlativo irr. femenino de хороший.' },
          { answer: 'самый', explain: '"самый жаркий день" — день (masc.) → самый.' },
          { answer: 'худшую', explain: '"худшую ошибку" — худший (irr. fem. acus.) = la peor. ошибка → ошибку (Acus.).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe superlativos',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase superlativa completa.',
        type: 'write',
        items: [
          {
            scene: 'El Baikal es el lago más profundo del mundo.',
            prompt: 'Usa самое/самый + глубокий (profundo). озеро = neutro.',
            answer: 'Байкал — самое глубокое озеро в мире.',
            accepted: ['Озеро Байкал — самое глубокое в мире.'],
            explain: '"самое глубокое" — озеро (neutro) → самое + adj. neut. (глубокий → глубокое).',
          },
          {
            scene: 'Ella es la mejor profesora de la universidad.',
            prompt: 'Usa лучшая + в университете.',
            answer: 'Она лучшая преподавательница в университете.',
            accepted: ['Она лучший преподаватель в университете.'],
            explain: '"лучшая/лучший" — superlativo irr. хороший. fem./masc. según sustantivo.',
          },
          {
            scene: 'Esta es la peor decisión de mi vida.',
            prompt: 'Usa худшее/худший + в моей жизни.',
            answer: 'Это худшее решение в моей жизни.',
            accepted: ['Это было худшее решение в моей жизни.'],
            explain: '"худшее решение" — решение (neutro) → худшее (neut. form of худший).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tu top personal',
        tag: 'Escritura libre',
        intro: 'Escribe sobre lo mejor y lo peor en tu opinión.',
        type: 'write',
        items: [
          {
            scene: 'Escribe tu top 3 de películas, libros o lugares.',
            prompt: 'Используй самый/самая/самое/самые и лучший/худший.',
            answer: 'Самый красивый город, который я видел, — Прага. Самая интересная книга в моей жизни — "Мастер и Маргарита". Лучший фильм прошлого года — "Паразиты".',
            accepted: ['Самое красивое место для меня — горы. Лучшая еда — пицца. Худший день в году — понедельник.'],
            explain: 'самый/самая/самое = concuerda con el sustantivo. лучший = irr. masc.',
          },
          {
            scene: 'Describe el mejor y el peor día de tu semana.',
            prompt: 'Используй самый лучший / самый плохой / худший + день.',
            answer: 'Лучший день недели для меня — пятница. Это самый весёлый и приятный день. Худший день — понедельник: самый тяжёлый и долгий.',
            accepted: ['Самый хороший день — суббота, потому что я не работаю. Самый плохой день — воскресенье вечером.'],
            explain: 'лучший (irr. masc.) | самый весёлый (маsc.) | худший (irr. masc.) | самый тяжёлый.',
          },
        ],
      },
    ],
  },
}

export default topic
