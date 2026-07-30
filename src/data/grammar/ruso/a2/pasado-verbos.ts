import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pasado-verbos',
  order: '01',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'El pasado en ruso: concordancia de género y número',
  shortTitle: 'Pasado de verbos',
  metaTitle: 'Pasado de verbos en ruso A2 | он читал, она читала, они читали',
  description:
    'El pasado ruso no se conjuga por persona sino por género y número. Se forma añadiendo -л (masculino), -ла (femenino), -ло (neutro) o -ли (plural) a la raíz del infinitivo. Esta concordancia con el sujeto es la clave para dominar el pasado ruso.',
  lead: 'Aprende a formar el pasado ruso: он читал (él leía), она читала (ella leía), оно читало (ello leía), они читали (ellos leían) — cuatro formas simples que reemplazan todas las personas.',
  outcomes: [
    'Formar el pasado de verbos regulares en las cuatro formas',
    'Concordar el verbo en pasado con el género y número del sujeto',
    'Reconocer y aplicar el pasado de verbos irregulares frecuentes (быть, идти, мочь)',
  ],
  guide: {
    goal: 'Conjugar verbos en pasado concordando con el género y número del sujeto.',
    model: 'Raíz del infinitivo + terminación de pasado según género/número del sujeto',
    formula: 'masc: -л | fem: -ла | neut: -ло | pl: -ли',
    decisions: [
      '¿El sujeto es masculino (он, Иван, папа)? → terminación -л',
      '¿El sujeto es femenino (она, Анна, мама)? → terminación -ла',
      '¿El sujeto es neutro (оно, письмо, окно)? → terminación -ло',
      '¿El sujeto es plural (они, мы, вы, дети)? → terminación -ли',
      'Atención: мы, вы, я también toman -ли o -л/-ла según el género del hablante',
    ],
    table: [
      ['Sujeto', 'Forma pasado (читать)', 'Traducción'],
      ['он / Иван', 'читал', 'él leía / leyó'],
      ['она / Анна', 'читала', 'ella leía / leyó'],
      ['оно / письмо', 'читало', 'ello leía / leyó'],
      ['они / мы / вы', 'читали', 'ellos/nosotros leían'],
      ['я (hombre)', 'читал', 'yo leía (hombre)'],
      ['я (mujer)', 'читала', 'yo leía (mujer)'],
    ],
    mistakes: [
      'No conjugues por persona: NO «я читалю» — el pasado no tiene terminaciones personales.',
      'Concuerda siempre con el género del sujeto: она читал es incorrecto — она читала.',
      'Para мы, вы, они siempre usa -ли: мы читали, вы читали, они читали.',
      'Irregulares frecuentes: идти → он шёл, она шла, они шли. Быть → был, была, было, были.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se forma el pasado en ruso?',
      paragraphs: [
        'El pasado ruso es remarkablemente simple: no cambia por persona, solo por género y número del sujeto. Para formarlo, quita -ть del infinitivo y añade: -л (masculino), -ла (femenino), -ло (neutro), -ли (plural).',
        'Así, читать → читал / читала / читало / читали. Esta regla aplica a la gran mayoría de los verbos rusos regulares, lo que hace que el pasado sea uno de los tiempos más fáciles de aprender.',
      ],
      table: [
        ['Género/número', 'Terminación', 'Ejemplo (читать)'],
        ['Masculino singular', '-л', 'он читал'],
        ['Femenino singular', '-ла', 'она читала'],
        ['Neutro singular', '-ло', 'оно читало'],
        ['Plural (todos)', '-ли', 'они читали'],
      ],
    },
    {
      heading: '¿Por qué el pasado ruso concuerda con el género y no con la persona?',
      paragraphs: [
        'En ruso, incluso el hablante (я) debe elegir la terminación según su género biológico: un hombre dice я читал, una mujer dice я читала. Lo mismo ocurre con ты: ты читал (si es hombre) o ты читала (si es mujer).',
        'Esta característica es única entre las lenguas romances y germánicas. El contexto o la identidad del hablante determina la forma — no hay ambigüedad en el habla cotidiana.',
      ],
    },
    {
      heading: '¿Cuáles son los verbos irregulares en pasado?',
      paragraphs: [
        'Algunos verbos frecuentes tienen pasados irregulares. El más importante es идти (ir a pie): он шёл, она шла, они шли. También мочь (poder): он мог, она могла, они могли.',
        'El verbo быть (ser/estar) en pasado: он был, она была, оно было, они были. Este verbo sí aparece en el pasado, a diferencia del presente.',
      ],
    },
  ],
  visual: {
    mode: 'conjugation-table',
    teacherLens:
      'Gender-based past tense agreement is the key A2 milestone. Drilling with photos of people (он/она) helps learners internalize the system quickly.',
    graphicPrompt:
      'Four boxes showing он читал, она читала, оно читало, они читали with arrows from subject to verb ending. Color-coded by gender: blue-masculine, pink-feminine, gray-neuter, purple-plural.',
    scene: [
      ['Masculino', 'он читал / Иван работал / папа знал'],
      ['Femenino', 'она читала / Анна работала / мама знала'],
      ['Neutro', 'оно читало / письмо лежало / окно открывалось'],
      ['Plural', 'они читали / мы работали / вы знали'],
      ['Irregulares', 'идти → шёл/шла/шли | быть → был/была/были'],
    ],
    learnerModes: ['recognition', 'gap-fill', 'gender-agreement-drill', 'production'],
    practiceVerbs: ['читать', 'работать', 'говорить', 'жить', 'знать', 'идти', 'быть'],
    reviewFocus: ['terminaciones -л/-ла/-ло/-ли', 'concordancia с sujeto', 'irregulares шёл/шла'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento de formas',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del pasado según el sujeto dado.',
        type: 'choice',
        items: [
          {
            scene: 'Masculino singular',
            lines: [['', '¿Cuál es la forma correcta de читать en pasado para "он"?']],
            options: ['читал', 'читала', 'читали', 'читало'],
            answer: 'читал',
            explain: 'он → masculino singular → terminación -л: он читал.',
          },
          {
            scene: 'Femenino singular',
            lines: [['', '¿Cuál es la forma de работать en pasado para "она"?']],
            options: ['работала', 'работал', 'работали', 'работало'],
            answer: 'работала',
            explain: 'она → femenino singular → terminación -ла: она работала.',
          },
          {
            scene: 'Plural',
            lines: [['', '¿Cuál es la forma de говорить en pasado para "они"?']],
            options: ['говорили', 'говорил', 'говорила', 'говорило'],
            answer: 'говорили',
            explain: 'они → plural → terminación -ли: они говорили.',
          },
          {
            scene: 'Primera persona femenina',
            lines: [['', 'Una mujer dice "yo trabajé". ¿Cuál es la forma correcta?']],
            options: ['я работала', 'я работал', 'я работали', 'работала я'],
            answer: 'я работала',
            explain: 'Una mujer usa la terminación femenina -ла: я работала.',
          },
          {
            scene: 'Irregular — идти',
            lines: [['', '¿Cuál es el pasado irregular de идти (ir a pie) para "она"?']],
            options: ['шла', 'шёл', 'шли', 'идла'],
            answer: 'шла',
            explain: 'идти es irregular: она шла. Masculino: шёл. Plural: шли.',
          },
          {
            scene: 'Neutro',
            lines: [['', 'El sujeto es "письмо" (neutro). ¿Qué forma de лежать (estar tumbado) usas?']],
            options: ['лежало', 'лежал', 'лежала', 'лежали'],
            answer: 'лежало',
            explain: 'письмо → neutro → terminación -ло: письмо лежало.',
          },
          {
            scene: 'быть en pasado',
            lines: [['', '¿Cuál es la forma de быть (ser/estar) para "они" en pasado?']],
            options: ['были', 'был', 'была', 'было'],
            answer: 'были',
            explain: 'они → plural → быть → были. (был=masc, была=fem, было=neut)',
          },
          {
            scene: 'Identificar error',
            lines: [['', '¿Cuál oración es incorrecta?']],
            options: ['она читала', 'он читала', 'они читали', 'она работала'],
            answer: 'он читала',
            explain: 'он es masculino → debe ser он читал (terminación -л, no -ла).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Sujeto y forma de pasado',
        tag: '2 espacios',
        intro: 'Completa el sujeto y la forma de pasado correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Masculino — читать',
            lines: [['', '[[0]] вчера [[1]] книгу. (masculino, читать)']],
            blanks: [
              { options: ['он', 'она', 'они'], answer: 'он', explain: 'Sujeto masculino singular.' },
              { options: ['читал', 'читала', 'читали'], answer: 'читал', explain: 'он → pasado masculino → читал (-л).' },
            ],
          },
          {
            scene: 'Femenino — работать',
            lines: [['', '[[0]] вчера [[1]] дома. (femenino, работать)']],
            blanks: [
              { options: ['она', 'он', 'они'], answer: 'она', explain: 'Sujeto femenino singular.' },
              { options: ['работала', 'работал', 'работали'], answer: 'работала', explain: 'она → pasado femenino → работала (-ла).' },
            ],
          },
          {
            scene: 'Plural — говорить',
            lines: [['', '[[0]] вчера [[1]] по-русски. (plural, говорить)']],
            blanks: [
              { options: ['они', 'он', 'она'], answer: 'они', explain: 'Sujeto plural.' },
              { options: ['говорили', 'говорил', 'говорила'], answer: 'говорили', explain: 'они → pasado plural → говорили (-ли).' },
            ],
          },
          {
            scene: 'Irregular — идти',
            lines: [['', 'Папа [[0]] в магазин, а мама [[1]] на работу. (идти)']],
            blanks: [
              { options: ['шёл', 'шла', 'шли'], answer: 'шёл', explain: 'Папа = masculino → шёл.' },
              { options: ['шла', 'шёл', 'шли'], answer: 'шла', explain: 'мама = femenino → шла.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — pasado',
        tag: 'Opciones',
        intro: 'Completa el texto con las formas correctas del pasado.',
        type: 'guidedText',
        scene: 'Ayer en casa de los Петровы',
        text: 'Вчера Иван [[0]] книгу. Его сестра Анна [[1]] музыку. Они вместе [[2]] чай. Потом папа [[3]] домой. Мама тоже [[4]] дома.',
        blanks: [
          { options: ['читал', 'читала', 'читали'], answer: 'читал', explain: 'Иван → masculino → читал.' },
          { options: ['слушала', 'слушал', 'слушали'], answer: 'слушала', explain: 'Анна → femenino → слушала.' },
          { options: ['пили', 'пил', 'пила'], answer: 'пили', explain: 'Они (plural) → пили.' },
          { options: ['пришёл', 'пришла', 'пришли'], answer: 'пришёл', explain: 'папа → masculino → пришёл (pasado de прийти).' },
          { options: ['была', 'был', 'были'], answer: 'была', explain: 'мама → femenino → была (быть en pasado).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — pasado sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma de pasado correcta según el sujeto.',
        type: 'freeText',
        scene: 'Completar con el pasado correcto',
        text: '1. Она [[0]] в школу. (идти) 2. Он [[1]] письмо. (написать) 3. Они [[2]] фильм. (смотреть) 4. Мама [[3]] ужин. (готовить) 5. Папа [[4]] газету. (читать)',
        blanks: [
          { answer: 'шла', accepted: ['шла'], explain: 'она → идти → шла (irregular femenino).' },
          { answer: 'написал', accepted: ['написал'], explain: 'он → написать → написал (-л masculino).' },
          { answer: 'смотрели', accepted: ['смотрели'], explain: 'они → смотреть → смотрели (-ли plural).' },
          { answer: 'готовила', accepted: ['готовила'], explain: 'мама → femenino → готовила (-ла).' },
          { answer: 'читал', accepted: ['читал'], explain: 'папа → masculino → читал (-л).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando el pasado ruso.',
        type: 'write',
        items: [
          {
            scene: 'Pasado masculino',
            prompt: 'Escribe en ruso: "Él leyó un libro ayer." (он, читать, книга, вчера)',
            answer: 'Он читал книгу вчера.',
            accepted: ['он читал книгу вчера', 'вчера он читал книгу'],
            explain: 'он → masculino → читал. Вчера = ayer.',
          },
          {
            scene: 'Pasado femenino',
            prompt: 'Escribe: "Ella trabajó en casa." (она, работать, дома)',
            answer: 'Она работала дома.',
            accepted: ['она работала дома'],
            explain: 'она → femenino → работала (-ла).',
          },
          {
            scene: 'Pasado plural',
            prompt: 'Escribe: "Ellos hablaron ruso." (они, говорить, по-русски)',
            answer: 'Они говорили по-русски.',
            accepted: ['они говорили по-русски'],
            explain: 'они → plural → говорили (-ли).',
          },
          {
            scene: 'Pasado irregular',
            prompt: 'Escribe: "Mi madre fue al mercado." (мама, идти, на рынок)',
            answer: 'Мама шла на рынок.',
            accepted: ['мама шла на рынок', 'мама пошла на рынок'],
            explain: 'мама → femenino → идти → шла (irregular). Также: пошла (perfectivo).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción libre',
        intro: 'Describe lo que hiciste ayer usando el pasado ruso.',
        type: 'write',
        items: [
          {
            scene: 'Mi ayer',
            prompt: 'Escribe tres oraciones sobre lo que hiciste ayer: ¿qué hiciste, dónde fuiste, qué comiste o viste?',
            answer: 'Вчера я читал книгу. Я ходил в магазин. Я смотрел фильм.',
            accepted: ['вчера', 'читал', 'работал', 'смотрел', 'читала', 'работала', 'смотрела'],
            explain: 'Modelo (hombre): Вчера я читал книгу. Я ходил в магазин. Я смотрел фильм. (mujer: читала, ходила, смотрела)',
          },
          {
            scene: 'Sobre otra persona',
            prompt: 'Escribe dos oraciones sobre lo que hizo tu amigo/a ayer (usa он o она).',
            answer: 'Он работал весь день. Она читала книгу вечером.',
            accepted: ['он', 'она', 'работал', 'читал', 'работала', 'читала'],
            explain: 'Recuerda concordar: él → -л, ella → -ла.',
          },
          {
            scene: 'Nosotros en el pasado',
            prompt: 'Escribe una oración sobre lo que hicieron "ellos" o "nosotros" ayer.',
            answer: 'Мы вчера смотрели фильм вместе.',
            accepted: ['мы', 'они', 'смотрели', 'читали', 'говорили', 'работали'],
            explain: 'мы/они → plural → siempre -ли: мы смотрели, они говорили.',
          },
        ],
      },
    ],
  },
}

export default topic
