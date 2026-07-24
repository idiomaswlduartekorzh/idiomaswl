import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-imperfectivo',
  order: '03',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'Futuro imperfectivo en ruso: буду + infinitivo',
  shortTitle: 'Futuro imperfectivo',
  metaTitle: 'Futuro imperfectivo ruso A2 | буду + infinitivo Я буду читать',
  description:
    'El futuro imperfectivo ruso se forma con el verbo auxiliar буду (conjugado) más el infinitivo del verbo principal. Este tiempo expresa acciones futuras en proceso, habituales o sin énfasis en su conclusión. Es el equivalente más cercano al "voy a + infinitivo" del español.',
  lead: 'Aprende a hablar del futuro en ruso con буду + infinitivo: Я буду читать (voy a leer / estaré leyendo), Ты будешь работать (vas a trabajar), Они будут говорить (van a hablar).',
  outcomes: [
    'Conjugar буду en todas las personas del futuro',
    'Construir oraciones de futuro imperfectivo con буду + infinitivo',
    'Distinguir el futuro imperfectivo (proceso) del perfectivo (resultado)',
  ],
  guide: {
    goal: 'Expresar acciones futuras en proceso o habituales usando буду + infinitivo.',
    model: 'буду/будешь/будет/будем/будете/будут + infinitivo del verbo',
    formula: 'быть (futuro) + infinitivo НСВ → futuro imperfectivo',
    decisions: [
      '¿La acción futura es un proceso, una rutina o sin énfasis en resultado? → буду + inf.',
      '¿Quieres decir "voy a estar haciendo" o "haré habitualmente"? → буду + inf.',
      '¿La acción futura se completará / tiene resultado específico? → futuro perfectivo (без буду)',
      'Recuerda: el infinitivo no cambia; solo буду se conjuga por persona.',
    ],
    table: [
      ['Persona', 'Futuro de быть', 'Ejemplo (читать)'],
      ['я', 'буду', 'я буду читать'],
      ['ты', 'будешь', 'ты будешь читать'],
      ['он/она/оно', 'будет', 'он/она будет читать'],
      ['мы', 'будем', 'мы будем читать'],
      ['вы', 'будете', 'вы будете читать'],
      ['они', 'будут', 'они будут читать'],
    ],
    mistakes: [
      'El infinitivo NO se conjuga: NO «я буду читаю» — debe ser «я буду читать».',
      'NO uses буду + infinitivo perfectivo: NO «я буду прочитать» — solo con imperfectivos.',
      'Recuerda que они → будут (no будете ni будут).',
      'Нe confundas «будет» (él/ella será/estará) y «буду» (yo seré/estaré).',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se expresa el futuro imperfectivo en ruso?',
      paragraphs: [
        'Para expresar acciones futuras en proceso o sin énfasis en su conclusión, el ruso usa el auxiliar буду (futuro de быть) seguido del infinitivo del verbo imperfectivo. Esta construcción es la más regular y fácil del sistema de futuro ruso.',
        'Ejemplos: Я буду работать (voy a trabajar), Она будет читать (ella va a estar leyendo), Мы будем учиться (vamos a estudiar). El infinitivo siempre permanece sin cambios.',
      ],
      table: [
        ['Pronombre', 'Auxiliar', 'Ejemplo completo'],
        ['я', 'буду', 'Я буду читать книгу'],
        ['ты', 'будешь', 'Ты будешь работать завтра'],
        ['он/она', 'будет', 'Она будет учиться весь день'],
        ['мы', 'будем', 'Мы будем говорить по-русски'],
        ['вы', 'будете', 'Вы будете отдыхать'],
        ['они', 'будут', 'Они будут смотреть фильм'],
      ],
    },
    {
      heading: 'Cuándo usar el futuro imperfectivo',
      paragraphs: [
        'El futuro imperfectivo con буду + infinitivo es adecuado cuando la acción futura es un proceso ("estaré trabajando"), una rutina futura ("voy a leer todos los días") o cuando no importa si se completa.',
        'En contraste, cuando el resultado futuro es importante ("voy a terminar el libro"), se usa el futuro perfectivo (прочитаю, сделаю). Palabras como завтра (mañana), скоро (pronto), часто (frecuentemente) suelen acompañar al futuro imperfectivo.',
      ],
    },
  ],
  visual: {
    mode: 'conjugation-table',
    teacherLens:
      'Буду + infinitive is the safest future for A2 learners. Emphasize that только буду changes; the infinitive stays fixed.',
    graphicPrompt:
      'Conjugation wheel with буду at center; six spokes show я/ты/он/мы/вы/они with their forms of быть. Arrow points to "+ infinitivo" on the right.',
    scene: [
      ['я буду', 'читать / работать / говорить / учиться'],
      ['ты будешь', 'читать / работать / говорить / учиться'],
      ['он/она будет', 'читать / работать / говорить / учиться'],
      ['мы будем', 'читать / работать / говорить / учиться'],
      ['они будут', 'читать / работать / говорить / учиться'],
    ],
    learnerModes: ['conjugation-drill', 'gap-fill', 'translation', 'production'],
    practiceVerbs: ['читать', 'работать', 'говорить', 'учиться', 'смотреть', 'жить'],
    reviewFocus: ['буду conjugado por persona', 'infinitivo fijo', 'solo con НСВ'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma correcta de буду',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de буду para cada pronombre.',
        type: 'choice',
        items: [
          {
            scene: 'Yo en futuro',
            lines: [['', '¿Qué forma de быть usas con "я" para el futuro?']],
            options: ['буду', 'будешь', 'будет', 'будем'],
            answer: 'буду',
            explain: 'я → буду. Я буду читать = voy a leer.',
          },
          {
            scene: 'Tú en futuro',
            lines: [['', 'Завтра ты _____ работать. (mañana tú ___ trabajar)']],
            options: ['будешь', 'буду', 'будет', 'будете'],
            answer: 'будешь',
            explain: 'ты → будешь. Ты будешь работать.',
          },
          {
            scene: 'Ellos en futuro',
            lines: [['', 'Они _____ смотреть фильм. (ellos ___ ver la película)']],
            options: ['будут', 'будете', 'буду', 'будем'],
            answer: 'будут',
            explain: 'они → будут. Они будут смотреть фильм.',
          },
          {
            scene: 'Ella en futuro',
            lines: [['', 'Она _____ учиться весь день. (ella ___ estudiar todo el día)']],
            options: ['будет', 'будем', 'буду', 'будешь'],
            answer: 'будет',
            explain: 'она → будет. Она будет учиться весь день.',
          },
          {
            scene: 'Nosotros en futuro',
            lines: [['', 'Мы _____ говорить по-русски. (nosotros ___ hablar ruso)']],
            options: ['будем', 'будут', 'буду', 'будет'],
            answer: 'будем',
            explain: 'мы → будем. Мы будем говорить по-русски.',
          },
          {
            scene: 'Vosotros en futuro',
            lines: [['', 'Вы _____ жить в Москве? (¿vosotros ___ vivir en Moscú?)']],
            options: ['будете', 'будут', 'будем', 'будет'],
            answer: 'будете',
            explain: 'вы → будете. Вы будете жить в Москве?',
          },
          {
            scene: 'Error común',
            lines: [['', '¿Cuál oración es INCORRECTA?']],
            options: ['Я буду читаю', 'Я буду читать', 'Она будет читать', 'Они будут читать'],
            answer: 'Я буду читаю',
            explain: 'El infinitivo no se conjuga: NO «я буду читаю». Correcto: Я буду читать.',
          },
          {
            scene: 'Reconocer futuro imperfectivo',
            lines: [['', '¿Cuál es el futuro imperfectivo de говорить para "она"?']],
            options: ['она будет говорить', 'она скажет', 'она говорила', 'она говорит'],
            answer: 'она будет говорить',
            explain: 'Futuro imperfectivo: она будет говорить. "Она скажет" es futuro perfectivo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombre y futuro imperfectivo',
        tag: '2 espacios',
        intro: 'Completa con el pronombre y la forma de буду correcta.',
        type: 'dual',
        items: [
          {
            scene: 'читать — futuro',
            lines: [['', '[[0]] [[1]] читать каждый день. (yo / futuro imp. de читать)']],
            blanks: [
              { options: ['Я', 'Он', 'Они'], answer: 'Я', explain: 'Primera persona singular.' },
              { options: ['буду', 'будет', 'будут'], answer: 'буду', explain: 'я → буду.' },
            ],
          },
          {
            scene: 'работать — futuro',
            lines: [['', 'Они [[0]] работать в офисе. [[1]] = plural de будет']],
            blanks: [
              { options: ['будут', 'будет', 'будете'], answer: 'будут', explain: 'они → будут.' },
              { options: ['будут', 'будет', 'буду'], answer: 'будут', explain: 'Confirmación: они будут.' },
            ],
          },
          {
            scene: 'учиться — futuro',
            lines: [['', 'Завтра ты дома. (mañana tú [[0]] [[1]] en casa)']],
            blanks: [
              { options: ['будешь', 'буду', 'будет'], answer: 'будешь', explain: 'ты → будешь.' },
              { options: ['учиться', 'учишься', 'учился'], answer: 'учиться', explain: 'El infinitivo permanece: учиться.' },
            ],
          },
          {
            scene: 'жить — futuro',
            lines: [['', 'Мы [[0]] жить в новом городе. [[1]] = futuro de жить para мы']],
            blanks: [
              { options: ['будем', 'будут', 'буду'], answer: 'будем', explain: 'мы → будем.' },
              { options: ['жить', 'живём', 'жили'], answer: 'жить', explain: 'Infinitivo: жить (sin cambios).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — planes para mañana',
        tag: 'Opciones',
        intro: 'Completa el texto con las formas correctas del futuro imperfectivo.',
        type: 'guidedText',
        scene: 'Planes para mañana',
        text: 'Завтра я [[0]] отдыхать дома. Моя сестра [[1]] читать книгу. Мы [[2]] смотреть фильм вечером. Ты [[3]] работать? Нет, я [[4]] гулять весь день.',
        blanks: [
          { options: ['буду', 'будет', 'будем'], answer: 'буду', explain: 'я → буду. Я буду отдыхать.' },
          { options: ['будет', 'буду', 'будешь'], answer: 'будет', explain: 'моя сестра → она → будет.' },
          { options: ['будем', 'будут', 'буду'], answer: 'будем', explain: 'мы → будем. Мы будем смотреть.' },
          { options: ['будешь', 'буду', 'будет'], answer: 'будешь', explain: 'ты → будешь. ¿Ты будешь работать?' },
          { options: ['буду', 'будешь', 'будет'], answer: 'буду', explain: 'я → буду. Я буду гулять.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — futuro sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta de буду + verbo en futuro imperfectivo.',
        type: 'freeText',
        scene: 'Mis planes futuros',
        text: '1. я / читать → [[0]] книгу. 2. она / работать → [[1]] дома. 3. они / говорить → [[2]] по-русски. 4. мы / учиться → [[3]] каждый день. 5. ты / смотреть → [[4]] фильм?',
        blanks: [
          { answer: 'Я буду читать', accepted: ['я буду читать', 'буду читать'], explain: 'я + буду + читать.' },
          { answer: 'Она будет работать', accepted: ['она будет работать', 'будет работать'], explain: 'она + будет + работать.' },
          { answer: 'Они будут говорить', accepted: ['они будут говорить', 'будут говорить'], explain: 'они + будут + говорить.' },
          { answer: 'Мы будем учиться', accepted: ['мы будем учиться', 'будем учиться'], explain: 'мы + будем + учиться.' },
          { answer: 'Ты будешь смотреть', accepted: ['ты будешь смотреть', 'будешь смотреть'], explain: 'ты + будешь + смотреть.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Traduce al ruso usando el futuro imperfectivo.',
        type: 'write',
        items: [
          {
            scene: 'Planes personales',
            prompt: 'Escribe en ruso: "Mañana voy a leer y trabajar en casa." (завтра, читать, работать, дома)',
            answer: 'Завтра я буду читать и работать дома.',
            accepted: ['буду читать', 'буду работать'],
            explain: 'Завтра я буду читать и работать дома. Ambos verbos con буду.',
          },
          {
            scene: 'Tercera persona',
            prompt: 'Escribe: "Ella va a estudiar ruso toda la semana." (она, учить, по-русски / русский язык, всю неделю)',
            answer: 'Она будет учить русский язык всю неделю.',
            accepted: ['она будет учить', 'будет учить'],
            explain: 'она → будет + учить (infinitivo). Всю неделю = toda la semana.',
          },
          {
            scene: 'Pregunta de futuro',
            prompt: 'Escribe: "¿Vas a trabajar mañana?" (ты, работать, завтра)',
            answer: 'Ты будешь работать завтра?',
            accepted: ['ты будешь работать завтра', 'будешь работать завтра'],
            explain: 'ты → будешь + работать + завтра. Entonación interrogativa.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción libre',
        intro: 'Describe tus planes para el fin de semana usando el futuro imperfectivo.',
        type: 'write',
        items: [
          {
            scene: 'Mis planes',
            prompt: 'Escribe 3 oraciones sobre qué vas a hacer este fin de semana (actividades en proceso, no resultado).',
            answer: 'В эти выходные я буду отдыхать. Я буду читать книги и смотреть фильмы. Мы будем гулять в парке.',
            accepted: ['буду', 'будем', 'будет', 'будут'],
            explain: 'Usar буду/будем + infinitivo para actividades en proceso del fin de semana.',
          },
          {
            scene: 'Planes de otra persona',
            prompt: 'Escribe 2 oraciones sobre qué va a hacer un amigo/a (используй он/она будет).',
            answer: 'Мой друг будет работать весь день. Вечером он будет смотреть сериал.',
            accepted: ['будет', 'буду', 'будем'],
            explain: 'он/она → будет + infinitivo imperfectivo.',
          },
          {
            scene: 'Contraste de aspectos en el futuro',
            prompt: 'Escribe una oración con будет + НСВ (proceso) y otra con СВ sin буду (resultado).',
            answer: 'Я буду читать всё утро. Потом я прочитаю эту главу.',
            accepted: ['буду читать', 'буду работать', 'прочитаю', 'сделаю', 'напишу'],
            explain: 'Буду + НСВ = proceso. СВ sin буду = resultado específico.',
          },
        ],
      },
    ],
  },
}

export default topic
