import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prepositions-time',
  order: '17',
  color: '#0369a1',
  category: 'Prepositions',
  level: 'A1',
  title: 'Preposiciones de tiempo en inglés A1',
  shortTitle: 'Preposiciones de tiempo',
  metaTitle: 'Preposiciones de tiempo en inglés A1 | In, On, At',
  description:
    'Aprende a usar in, on y at para expresar tiempo en inglés A1. Domina cuándo usar cada preposición con meses, días, horas y momentos del día.',
  lead: 'In, on y at son las tres preposiciones de tiempo más usadas en inglés. La regla es simple: at para horas y momentos específicos, on para días y fechas, in para meses, años y períodos.',
  outcomes: [
    'Usar at con horas: at 7 p.m., at noon, at midnight.',
    'Usar on con días y fechas: on Monday, on June 15.',
    'Usar in con meses, estaciones y años: in July, in summer, in 2024.',
  ],
  guide: {
    goal: 'Elegir la preposición de tiempo correcta (in/on/at) según el tipo de referencia temporal.',
    model: 'The class is at 7 p.m. / We meet on Monday. / She was born in July.',
    formula: 'at + hora/momento | on + día/fecha | in + mes/año/estación',
    decisions: [
      'at + horas exactas: at 8 a.m., at 3:30 p.m., at noon, at midnight.',
      'on + días de la semana: on Monday, on Friday. También on + fecha: on June 15.',
      'in + meses: in January, in March. In + años: in 2020. In + estaciones: in summer.',
      'Momentos del día: in the morning, in the afternoon, in the evening — PERO at night.',
      'NUNCA: "at Monday" o "on July" — cada tiempo tiene su preposición fija.',
    ],
    table: [
      ['Preposición', 'Usa con', 'Ejemplos A1'],
      ['at', 'horas y momentos', 'at 7 p.m. / at noon / at night'],
      ['on', 'días y fechas', 'on Monday / on June 15'],
      ['in', 'meses, años, estaciones', 'in July / in 2024 / in summer'],
    ],
    mistakes: [
      '"at Monday" ❌ → on Monday ✓ — días van con on.',
      '"on July" ❌ → in July ✓ — meses van con in.',
      '"in the night" ❌ → at night ✓ — night es excepción, usa at.',
    ],
  },
  seo: [
    {
      heading: 'In, on, at: las preposiciones de tiempo en inglés A1',
      paragraphs: [
        'Las preposiciones in, on y at son esenciales para hablar de tiempo en inglés. Cada una tiene un contexto específico: at se usa para horas exactas y momentos puntuales, on para días de la semana y fechas, e in para períodos más amplios como meses, años o estaciones.',
        'El error más frecuente del hispanohablante es mezclarlas, especialmente confundir on con at para días. En español usamos "el lunes" o "a las 7", pero en inglés la preposición es fija: on Monday, at 7 p.m.',
      ],
    },
    {
      heading: 'At para horas y momentos del día',
      paragraphs: [
        'At se usa con horas exactas (at 8 a.m., at 3:30 p.m.) y con momentos puntuales del día: at noon (al mediodía), at midnight (a medianoche), at night (de noche). Esta última es la única excepción a la regla de "momentos del día con in".',
        'Los demás momentos del día usan in: in the morning (por la mañana), in the afternoon (por la tarde), in the evening (al anochecer). Recuerda: at night es la excepción y debe memorizarse.',
      ],
    },
    {
      heading: 'On para días, at para horas, in para períodos',
      paragraphs: [
        'La lógica es de especificidad: cuanto más específico el tiempo, más "pequeña" la preposición. At para el momento más preciso (la hora), on para el día, in para el período más amplio (mes, año, estación).',
        'Esta regla te ayuda a decidir: ¿Es una hora exacta? → at. ¿Es un día? → on. ¿Es un mes, año o estación? → in. Con esta lógica evitas el 90% de los errores.',
      ],
    },
  ],
  visual: {
    mode: 'table',
    teacherLens: 'El estudiante aprende a asociar cada preposición con el tipo de referencia temporal.',
    graphicPrompt: 'Tres columnas: AT (reloj), ON (calendario día), IN (calendario mes/año).',
    scene: [
      ['at + hora', 'at 7 p.m. / at noon / at night'],
      ['on + día', 'on Monday / on Friday / on June 15'],
      ['in + mes/año', 'in July / in 2024 / in summer'],
      ['in + momento', 'in the morning / in the afternoon / in the evening'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['at vs on vs in', 'at night excepción', 'in the morning/evening', 'on + día de semana'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento de preposición',
        tag: 'Opción múltiple',
        intro: 'Elige la preposición de tiempo correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando del horario de clase',
            lines: [['David', 'The class starts ___ 7 p.m.']],
            options: ['at', 'on', 'in'],
            answer: 'at',
            explain: 'at 7 p.m. — hora exacta, siempre at.',
          },
          {
            scene: 'Planificando la semana',
            lines: [['Ana', 'We have English ___ Monday.']],
            options: ['on', 'at', 'in'],
            answer: 'on',
            explain: 'on Monday — días de la semana, siempre on.',
          },
          {
            scene: 'Hablando de vacaciones',
            lines: [['Carlos', 'I travel ___ July.']],
            options: ['in', 'on', 'at'],
            answer: 'in',
            explain: 'in July — meses, siempre in.',
          },
          {
            scene: 'Preguntando la rutina',
            lines: [['Sofia', 'Do you study ___ the morning?']],
            options: ['in', 'at', 'on'],
            answer: 'in',
            explain: 'in the morning — momentos del día (excepto night).',
          },
          {
            scene: 'Hablando de cumpleaños',
            lines: [['Lina', 'My birthday is ___ June 20.']],
            options: ['on', 'in', 'at'],
            answer: 'on',
            explain: 'on June 20 — fecha específica, on.',
          },
          {
            scene: 'Hablando del sueño',
            lines: [['Marco', 'I never study ___ night.']],
            options: ['at', 'in', 'on'],
            answer: 'at',
            explain: 'at night — excepción: night usa at, no in.',
          },
          {
            scene: 'Hablando del año',
            lines: [['Teacher', 'WeLearn started ___ 2020.']],
            options: ['in', 'at', 'on'],
            answer: 'in',
            explain: 'in 2020 — años, siempre in.',
          },
          {
            scene: 'Hablando del mediodía',
            lines: [['David', 'Let\'s meet ___ noon.']],
            options: ['at', 'in', 'on'],
            answer: 'at',
            explain: 'at noon — momento puntual del día, at.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Preposición en contexto',
        tag: '2 espacios',
        intro: 'Elige la preposición y completa la expresión de tiempo.',
        type: 'dual',
        items: [
          {
            scene: 'Horario de WeLearn',
            lines: [['David', 'My class is [[0]] [[1]].']],
            blanks: [
              { options: ['at', 'on', 'in'], answer: 'at', explain: 'Hora exacta → at.' },
              { options: ['7 p.m.', 'Monday', 'July'], answer: '7 p.m.', explain: 'at 7 p.m. — hora con at.' },
            ],
          },
          {
            scene: 'Día de práctica',
            lines: [['Ana', 'We practice speaking [[0]] [[1]].']],
            blanks: [
              { options: ['on', 'at', 'in'], answer: 'on', explain: 'Día de la semana → on.' },
              { options: ['Friday', 'noon', 'summer'], answer: 'Friday', explain: 'on Friday — día con on.' },
            ],
          },
          {
            scene: 'Planes de viaje',
            lines: [['Carlos', 'I\'m going to Canada [[0]] [[1]].']],
            blanks: [
              { options: ['in', 'on', 'at'], answer: 'in', explain: 'Mes → in.' },
              { options: ['August', 'Monday', '3 p.m.'], answer: 'August', explain: 'in August — mes con in.' },
            ],
          },
          {
            scene: 'Rutina matutina',
            lines: [['Sofia', 'I study English [[0]] the [[1]].']],
            blanks: [
              { options: ['in', 'at', 'on'], answer: 'in', explain: 'Momento del día → in (except night).' },
              { options: ['morning', 'night', 'noon'], answer: 'morning', explain: 'in the morning — mañana con in.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Horario de la semana',
        tag: 'Opciones',
        intro: 'Elige la preposición correcta para completar el horario de WeLearn.',
        type: 'guidedText',
        scene: 'Horario de clases de inglés en WeLearn',
        text: 'Our English classes are [[0]] Monday, Wednesday and Friday. The class starts [[1]] 7 p.m. and finishes [[2]] 8:30 p.m. [[3]] the morning we have homework practice. [[4]] night the teacher sends feedback. Registration opens [[5]] January.',
        blanks: [
          { options: ['on', 'at', 'in'], answer: 'on', explain: 'on Monday — días con on.' },
          { options: ['at', 'on', 'in'], answer: 'at', explain: 'at 7 p.m. — hora con at.' },
          { options: ['at', 'on', 'in'], answer: 'at', explain: 'at 8:30 p.m. — hora con at.' },
          { options: ['In', 'On', 'At'], answer: 'In', explain: 'In the morning — momento del día.' },
          { options: ['At', 'In', 'On'], answer: 'At', explain: 'At night — excepción, night con at.' },
          { options: ['in', 'on', 'at'], answer: 'in', explain: 'in January — mes con in.' },
        ],
      },
      {
        id: 'l4',
        title: 'Agenda libre',
        tag: 'Sin opciones',
        intro: 'Escribe la preposición de tiempo correcta.',
        type: 'freeText',
        scene: 'Agenda personal de un estudiante de WeLearn',
        text: 'I study English ___ Monday and Thursday. My class is ___ 6 p.m. I was born ___ 1999. I like studying ___ the afternoon. I don\'t study ___ night. My exam is ___ March.',
        blanks: [
          { answer: 'on', accepted: ['on'], explain: 'on Monday — día de la semana.' },
          { answer: 'at', accepted: ['at'], explain: 'at 6 p.m. — hora exacta.' },
          { answer: 'in', accepted: ['in'], explain: 'in 1999 — año con in.' },
          { answer: 'in', accepted: ['in'], explain: 'in the afternoon — momento del día.' },
          { answer: 'at', accepted: ['at'], explain: 'at night — excepción con at.' },
          { answer: 'in', accepted: ['in'], explain: 'in March — mes con in.' },
        ],
      },
      {
        id: 'l5',
        title: 'Construcción de frases',
        tag: 'Producción',
        intro: 'Escribe frases completas con la preposición de tiempo correcta.',
        type: 'write',
        items: [
          {
            scene: 'Día de clase',
            prompt: 'Di que tu clase de inglés es el lunes. (My class / on / Monday)',
            answer: 'My class is on Monday.',
            accepted: ['my class is on monday', 'my class is on monday.'],
            explain: 'My class is on Monday. — día con on.',
          },
          {
            scene: 'Hora de inicio',
            prompt: 'Di que la clase empieza a las 7 p.m. (The class / starts / at / 7 p.m.)',
            answer: 'The class starts at 7 p.m.',
            accepted: ['the class starts at 7 p.m', 'the class starts at 7 p.m.', 'the class starts at 7pm'],
            explain: 'The class starts at 7 p.m. — hora con at.',
          },
          {
            scene: 'Mes de examen',
            prompt: 'Di que tu examen es en junio. (My exam / is / in / June)',
            answer: 'My exam is in June.',
            accepted: ['my exam is in june', 'my exam is in june.'],
            explain: 'My exam is in June. — mes con in.',
          },
          {
            scene: 'Momento del día',
            prompt: 'Di que estudias por la mañana. (I / study / in / the morning)',
            answer: 'I study in the morning.',
            accepted: ['i study in the morning', 'i study in the morning.'],
            explain: 'I study in the morning. — momento del día con in.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Mi agenda personal',
        tag: 'Reto final',
        intro: 'Escribe sobre tu propio horario usando in, on y at.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina de estudio',
            prompt: 'Write 2 sentences about when you study English (day + time).',
            answer: 'I study English on Monday. My class is at 7 p.m.',
            accepted: ['on monday', 'on tuesday', 'on wednesday', 'on thursday', 'on friday', 'on saturday', 'on sunday'],
            explain: 'Use on + day and at + time: I study on [day]. My class is at [time].',
          },
          {
            scene: 'Tu cumpleaños',
            prompt: 'Write when your birthday is: My birthday is ___ (month + date).',
            answer: 'My birthday is in July.',
            accepted: ['my birthday is in', 'my birthday is on'],
            explain: 'Month → in (in July). Specific date → on (on July 15).',
          },
          {
            scene: 'Momento favorito',
            prompt: 'Write when you prefer to study: I prefer to study ___ (time of day).',
            answer: 'I prefer to study in the morning.',
            accepted: ['in the morning', 'in the afternoon', 'in the evening', 'at night'],
            explain: 'in the morning/afternoon/evening, BUT at night — exception!',
          },
        ],
      },
    ],
  },
}

export default topic
