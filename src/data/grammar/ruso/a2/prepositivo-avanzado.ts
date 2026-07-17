import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prepositivo-avanzado',
  order: '08',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'A2',
  title: 'El prepositivo avanzado: о + prepositivo',
  shortTitle: 'Prepositivo: о + тема',
  metaTitle: 'Prepositivo avanzado ruso A2 | о + prepositivo Я думаю о тебе',
  description:
    'El prepositivo ruso tiene dos usos principales: в/на + lugar (donde estás) y о (об) + tema (de lo que hablas o piensas). Este módulo amplía el uso con о (об): hablar, pensar, escribir, preguntar sobre algo o alguien.',
  lead: 'Aprende a usar о + prepositivo para hablar de temas: Я думаю о тебе (pienso en ti), Он говорит о работе (habla del trabajo), Мы читали о России (leímos sobre Rusia).',
  outcomes: [
    'Usar о/об + prepositivo para expresar el tema de pensamientos o conversaciones',
    'Declinar sustantivos y pronombres en prepositivo con о',
    'Distinguir об (ante vocal) de о (ante consonante)',
  ],
  guide: {
    goal: 'Usar la preposición о/об + prepositivo para expresar temas de habla, pensamiento y escritura.',
    model: 'думать / говорить / читать / писать + о/об + sustantivo en prepositivo',
    formula: 'о + prepositivo: masc/neut -е | fem -е/-и | pl -ах/-ях',
    decisions: [
      '¿Hablas del tema de pensamiento, habla o escritura? → о/об + prepositivo',
      '¿La palabra siguiente empieza con vocal (а, о, э, у, и, е, ё, ю, я)? → об',
      '¿La palabra empieza con consonante? → о',
      'Pronombres: обо мне / о тебе / о нём / о ней / о нас / о вас / о них',
    ],
    table: [
      ['Sustantivo', 'Nominativo', 'Prepositivo con о'],
      ['trabajo (masc.)', 'работа', 'о работе'],
      ['Rusia (fem.)', 'Россия', 'о России'],
      ['libro (masc.)', 'книга', 'о книге'],
      ['vida (fem.)', 'жизнь', 'о жизни'],
      ['yo (pronombre)', 'я', 'обо мне'],
      ['tú (pronombre)', 'ты', 'о тебе'],
    ],
    mistakes: [
      'NO digas «о меня» — incorrecto: el prepositivo de я es обо мне.',
      'Usa об antes de vocal: об этом (no «о этом»), об Анне (no «о Анне»).',
      'El prepositivo nunca es objeto directo — не путай с acusativo.',
      'жизнь → о жизни (terminación -и para fem. en -ь), no «о жизне».',
    ],
  },
  seo: [
    {
      heading: 'О + prepositivo: hablar sobre temas en ruso',
      paragraphs: [
        'La preposición о (об) + prepositivo es la forma de expresar el tema sobre el que se habla, piensa, escribe o pregunta. Verbos frecuentes con esta estructura: думать о (pensar en), говорить о (hablar de), читать о (leer sobre), писать о (escribir sobre), спрашивать о (preguntar sobre).',
        'Ejemplos: Я думаю о тебе (pienso en ti), Мы говорим о политике (hablamos de política), Он написал о своей жизни (escribió sobre su vida). La preposición о se convierte en об antes de palabras que comienzan con vocal.',
      ],
      table: [
        ['Verbo', 'Ejemplo', 'Traducción'],
        ['думать', 'думаю о работе', 'pienso en el trabajo'],
        ['говорить', 'говоришь о нём', 'hablas de él'],
        ['читать', 'читаем о России', 'leemos sobre Rusia'],
        ['писать', 'пишет о жизни', 'escribe sobre la vida'],
        ['спрашивать', 'спрашиваете об этом', 'preguntáis sobre esto'],
      ],
    },
    {
      heading: 'О vs об: cuándo usar cada forma',
      paragraphs: [
        'La regla es simple: usa об cuando la palabra siguiente empieza con vocal (а, э, и, о, у, е, ё, ю, я). Usa о en todos los demás casos. Ejemplos: об этом (sobre esto), об Анне (sobre Ana), об уроке (sobre la clase).',
        'Los pronombres personales tienen formas especiales en prepositivo: обо мне (sobre mí), о тебе (sobre ti), о нём (sobre él), о ней (sobre ella), о нас (sobre nosotros), о вас (sobre vosotros), о них (sobre ellos).',
      ],
    },
  ],
  visual: {
    mode: 'case-table',
    teacherLens:
      'The о/об + prepositivo construction unlocks conversational depth at A2: talking about people, places, topics. Drill pronoun forms обо мне/о тебе first.',
    graphicPrompt:
      'Speech bubble diagram: person in the center, arrows pointing to bubbles labeled "о работе", "о тебе", "об этом", "о жизни". Rule box: о + consonant, об + vowel.',
    scene: [
      ['думать о', 'думаю о тебе / думает о работе / думаем о будущем'],
      ['говорить о', 'говорю о книге / говорит о жизни / говорим о политике'],
      ['Pronombres', 'обо мне / о тебе / о нём / о ней / о нас / о вас / о них'],
      ['о vs об', 'о работе (consonante) / об этом (vocal) / об Анне (vocal)'],
      ['Prepositivo fem. -и', 'жизнь → о жизни / Россия → о России / площадь → о площади'],
    ],
    learnerModes: ['recognition', 'preposition-choice', 'gap-fill', 'production'],
    practiceVerbs: ['думать', 'говорить', 'читать', 'писать', 'спрашивать', 'мечтать'],
    reviewFocus: ['о vs об', 'pronombres обо мне/о тебе', 'terminación -е/-и en prepositivo'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocer о + prepositivo',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del prepositivo con о.',
        type: 'choice',
        items: [
          {
            scene: 'о + masculino',
            lines: [['', 'Я думаю о _____. (trabajo — работа → prepositivo)']],
            options: ['работе', 'работы', 'работу', 'работой'],
            answer: 'работе',
            explain: 'работа → препозитив: о работе (-е).',
          },
          {
            scene: 'о + pronombre',
            lines: [['', 'Он говорит обо _____. (sobre mí)']],
            options: ['мне', 'меня', 'мне', 'мной'],
            answer: 'мне',
            explain: 'обо мне = sobre mí (prepositivo de "я").',
          },
          {
            scene: 'о vs об',
            lines: [['', 'Мы читали _____ этой стране. (sobre este país)']],
            options: ['об', 'о', 'обо', 'при'],
            answer: 'об',
            explain: 'Перед "этой" (empieza con vocal "э") → об.',
          },
          {
            scene: 'о + femenino en -ь',
            lines: [['', 'Она пишет о _____. (vida — жизнь → prepositivo)']],
            options: ['жизни', 'жизне', 'жизнь', 'жизнью'],
            answer: 'жизни',
            explain: 'жизнь (fem. en -ь) → препозитив: о жизни (-и).',
          },
          {
            scene: 'о + Россия',
            lines: [['', 'Мы говорим о _____. (Rusia — Россия → prepositivo)']],
            options: ['России', 'Россие', 'Россию', 'Россией'],
            answer: 'России',
            explain: 'Россия → препозитив: о России (-ии para sustantivos en -ия).',
          },
          {
            scene: 'Pronombre о ней',
            lines: [['', 'Я думаю о _____. (sobre ella)']],
            options: ['ней', 'её', 'ей', 'она'],
            answer: 'ней',
            explain: 'о ней = sobre ella (prepositivo de "она" con о).',
          },
          {
            scene: 'Verbo + о',
            lines: [['', 'Он спросил _____ моей работе. (preguntó sobre mi trabajo)']],
            options: ['о', 'об', 'обо', 'в'],
            answer: 'о',
            explain: 'Перед "моей" (empieza con consonante "м") → о.',
          },
          {
            scene: 'Identificar error',
            lines: [['', '¿Cuál es incorrecto?']],
            options: ['о меня', 'о тебе', 'обо мне', 'о нём'],
            answer: 'о меня',
            explain: 'El prepositivo de "я" con о es обо мне, no "о меня".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Verbo y forma prepositiva con о',
        tag: '2 espacios',
        intro: 'Completa con el verbo y la forma prepositiva correcta.',
        type: 'dual',
        items: [
          {
            scene: 'думать о + masc.',
            lines: [['', 'Я [[0]] о [[1]]. (pienso en el trabajo — работа)']],
            blanks: [
              { options: ['думаю', 'думаешь', 'думает'], answer: 'думаю', explain: 'я → думаю.' },
              { options: ['работе', 'работы', 'работу'], answer: 'работе', explain: 'работа → препозитив: работе.' },
            ],
          },
          {
            scene: 'говорить об + vocal',
            lines: [['', 'Она говорит [[0]] [[1]] городе. (habla sobre este ciudad)']],
            blanks: [
              { options: ['об', 'о', 'обо'], answer: 'об', explain: 'Перед "этом" (vocal) → об.' },
              { options: ['этом', 'этого', 'этому'], answer: 'этом', explain: 'этот → препозитив: этом.' },
            ],
          },
          {
            scene: 'читать о + pronombre',
            lines: [['', 'Мы читали [[0]] [[1]]. (leímos sobre él)']],
            blanks: [
              { options: ['о', 'об', 'обо'], answer: 'о', explain: 'нём empieza con "н" (consonante) → о.' },
              { options: ['нём', 'него', 'ему'], answer: 'нём', explain: 'о нём = sobre él.' },
            ],
          },
          {
            scene: 'писать о + fem. -ь',
            lines: [['', 'Он пишет о [[0]]. [[1]] = prepositivo de жизнь']],
            blanks: [
              { options: ['жизни', 'жизне', 'жизнь'], answer: 'жизни', explain: 'жизнь → препозитив: жизни.' },
              { options: ['жизни', 'жизнью', 'жизни'], answer: 'жизни', explain: 'Confirmación: жизни.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — о + prepositivo',
        tag: 'Opciones',
        intro: 'Completa el texto con las formas prepositivas correctas.',
        type: 'guidedText',
        scene: 'Una conversación sobre temas',
        text: 'Мы часто говорим о [[0]] и о [[1]]. Иногда я думаю об [[2]] и о [[3]]. Вчера она спрашивала [[4]] моей семье.',
        blanks: [
          { options: ['работе', 'работы', 'работу'], answer: 'работе', explain: 'работа → препозитив: работе.' },
          { options: ['жизни', 'жизне', 'жизнь'], answer: 'жизни', explain: 'жизнь → препозитив: жизни.' },
          { options: ['этом', 'этого', 'этому'], answer: 'этом', explain: 'этот → препозитив. Перед этом (vocal) → об.' },
          { options: ['будущем', 'будущего', 'будущему'], answer: 'будущем', explain: 'будущее → препозитив: будущем.' },
          { options: ['о', 'об', 'обо'], answer: 'о', explain: 'Перед "моей" (consonante м) → о.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — о + prepositivo sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma prepositiva correcta con о.',
        type: 'freeText',
        scene: 'Completar con о + prepositivo',
        text: '1. Я думаю [[0]] тебе. (о/об) 2. Он говорит [[0]] этой книге. (о/об) 3. Мы читали [[0]] России. (о/об) 4. Она спрашивала [[0]] моём брате. (о/об) 5. Ты думаешь [[0]] мне? (о/об)',
        blanks: [
          { answer: 'о', accepted: ['о'], explain: 'Перед "тебе" (consonante т) → о тебе.' },
          { answer: 'об', accepted: ['об'], explain: 'Перед "этой" (vocal э) → об этой книге.' },
          { answer: 'о', accepted: ['о'], explain: 'Перед "России" (consonante Р) → о России.' },
          { answer: 'о', accepted: ['о'], explain: 'Перед "моём" (consonante м) → о моём брате.' },
          { answer: 'обо', accepted: ['обо'], explain: 'обо мне (caso especial con мне).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando о/об + prepositivo.',
        type: 'write',
        items: [
          {
            scene: 'Pensar en alguien',
            prompt: 'Escribe en ruso: "Pienso en ti." (думать, о тебе)',
            answer: 'Я думаю о тебе.',
            accepted: ['я думаю о тебе', 'думаю о тебе'],
            explain: 'думать + о + prepositivo de "ты" = о тебе.',
          },
          {
            scene: 'Hablar de algo',
            prompt: 'Escribe: "Hablamos sobre la vida." (говорить, о жизни)',
            answer: 'Мы говорим о жизни.',
            accepted: ['мы говорим о жизни', 'говорим о жизни'],
            explain: 'говорить + о + препозитив: жизнь → жизни.',
          },
          {
            scene: 'Leer sobre',
            prompt: 'Escribe: "Ella leyó sobre este tema." (читать, об этой теме)',
            answer: 'Она читала об этой теме.',
            accepted: ['она читала об этой теме', 'читала об этой теме'],
            explain: 'Перед "этой" (vocal) → об. теме = препозитив de тема.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción libre',
        intro: 'Escribe sobre lo que piensas o de lo que hablas frecuentemente.',
        type: 'write',
        items: [
          {
            scene: 'Mis pensamientos',
            prompt: 'Escribe 3 oraciones sobre qué o en quién piensas frecuentemente (думаю о/об...).',
            answer: 'Я часто думаю о работе. Я думаю о своей семье. Иногда я думаю об этой проблеме.',
            accepted: ['думаю о', 'думаю об', 'о работе', 'о семье', 'об этом'],
            explain: 'думаю + о/об + препозитив (о ante consonante, об ante vocal).',
          },
          {
            scene: 'Conversaciones',
            prompt: 'Escribe 2 oraciones sobre qué temas hablas con amigos (говорю о...).',
            answer: 'С друзьями мы говорим о музыке и о кино. Мы говорим об интересных книгах.',
            accepted: ['говорим о', 'говорим об', 'о музыке', 'о кино', 'об интересных'],
            explain: 'говорить + о/об + препозитив del tema.',
          },
          {
            scene: 'Mezclar о/об',
            prompt: 'Escribe una oración con "о" y una con "об", usando diferentes temas.',
            answer: 'Я думаю о будущем. Она спрашивала об этом человеке.',
            accepted: ['о ', 'об '],
            explain: 'о + consonante. об + vocal (э, а, у, о, и...).',
          },
        ],
      },
    ],
  },
}

export default topic
