import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'telling-time',
  order: '25',
  color: '#0369a1',
  category: 'Expressions',
  level: 'A1',
  title: 'Decir la hora en inglés A1',
  shortTitle: 'La hora en inglés',
  metaTitle: 'Cómo decir la hora en inglés A1 | O\'clock, Quarter, Half past',
  description:
    'Aprende a decir y preguntar la hora en inglés A1. Domina o\'clock, quarter past/to, half past, y las expresiones a.m./p.m. para situaciones cotidianas.',
  lead: 'Para preguntar la hora: What time is it? / What\'s the time? Para responder: It\'s three o\'clock. / It\'s quarter past six. / It\'s half past nine. / It\'s ten to four. La hora en inglés tiene su propio sistema y es distinto al español.',
  outcomes: [
    'Preguntar la hora: What time is it?',
    'Decir la hora: o\'clock, half past, quarter past, quarter to.',
    'Usar a.m. y p.m. en contextos cotidianos.',
  ],
  guide: {
    goal: 'Preguntar y decir la hora en inglés usando las expresiones estándar del A1.',
    model: 'What time is it? — It\'s three o\'clock. / It\'s quarter past two. / It\'s half past nine. / It\'s five to four.',
    formula: 'It\'s + [hora] + o\'clock | It\'s + [minutos] + past/to + [hora]',
    decisions: [
      'Horas exactas: It\'s one o\'clock. / It\'s seven o\'clock. → [hora] + o\'clock.',
      'Minutos del 1-30 (pasado): It\'s ten past three. / It\'s twenty past six.',
      'Minutos del 31-59 (para): It\'s ten to five. / It\'s twenty to eight.',
      'Quarter past / quarter to / half past: It\'s quarter past two (2:15) / half past nine (9:30) / quarter to four (3:45).',
      'Alternativa digital: It\'s three fifteen / It\'s nine thirty / It\'s three forty-five.',
    ],
    table: [
      ['Hora', 'Expresión estándar', 'Alternativa digital'],
      ['3:00', 'three o\'clock', 'three hundred / three'],
      ['3:15', 'quarter past three', 'three fifteen'],
      ['3:30', 'half past three', 'three thirty'],
      ['3:45', 'quarter to four', 'three forty-five'],
    ],
    mistakes: [
      '"It\'s three and quarter" ❌ → It\'s quarter past three ✓ — quarter past, no "and quarter".',
      '"It\'s half three" ❌ (ambiguous) → It\'s half past three ✓ — siempre "half past".',
      '"What time are it?" ❌ → What time is it? ✓ — siempre "is", nunca "are".',
    ],
  },
  seo: [
    {
      heading: 'Cómo decir la hora en inglés: el sistema básico',
      paragraphs: [
        'Decir la hora en inglés sigue un sistema diferente al español. Para las horas exactas se dice: It\'s one o\'clock, two o\'clock, etc. Para los 15 minutos pasados: quarter past (It\'s quarter past three = 3:15). Para las medias: half past (It\'s half past three = 3:30). Para los 15 minutos para: quarter to (It\'s quarter to four = 3:45).',
        'Para preguntar la hora se usa: What time is it? o What\'s the time? La respuesta siempre empieza con It\'s: It\'s five o\'clock. / It\'s quarter past two. En contextos cotidianos también se acepta la forma digital: It\'s three fifteen, three thirty, three forty-five.',
      ],
    },
    {
      heading: 'Past y to: los dos sistemas para minutos',
      paragraphs: [
        'El inglés divide la hora en dos mitades. De :01 a :30, se usa past (pasado): five past three (3:05), ten past three (3:10), twenty past three (3:20). De :31 a :59, se usa to (para llegar a la siguiente hora): twenty to four (3:40), ten to four (3:50), five to four (3:55).',
        'La referencia cambia de una hora a la siguiente cuando pasas de :30. Por eso 3:45 se dice "quarter to FOUR" — ya apuntas hacia las 4, no hacia las 3. Este cambio de referencia confunde a muchos hispanohablantes, pero es sistemático.',
      ],
    },
    {
      heading: 'A.m. y p.m., mañana y noche',
      paragraphs: [
        'En inglés se usa a.m. (antes del mediodía, de 0:00 a 11:59) y p.m. (después del mediodía, de 12:00 a 23:59). En conversación cotidiana se puede añadir la parte del día: It\'s 7 in the morning / It\'s 3 in the afternoon / It\'s 9 at night.',
        'Noon significa mediodía (12:00 p.m.) y midnight significa medianoche (12:00 a.m.). Estas dos palabras son muy frecuentes y es importante memorizarlas para A1.',
      ],
    },
  ],
  visual: {
    mode: 'question-map',
    teacherLens: 'El estudiante aprende a preguntar y decir la hora usando las expresiones o\'clock, quarter, half past y to.',
    graphicPrompt: 'Reloj con las 4 posiciones: 12:00 (o\'clock), :15 (quarter past), :30 (half past), :45 (quarter to).',
    scene: [
      ['Horas exactas: o\'clock', '3:00 = three o\'clock / 7:00 = seven o\'clock'],
      ['Cuarto pasado: quarter past', '3:15 = quarter past three / 9:15 = quarter past nine'],
      ['Media: half past', '3:30 = half past three / 6:30 = half past six'],
      ['Cuarto para: quarter to', '3:45 = quarter to four / 9:45 = quarter to ten'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['past vs to', 'quarter past/to', 'half past', 'What time is it?'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconociendo la hora',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de decir la hora.',
        type: 'choice',
        items: [
          {
            scene: 'Son las 7:00',
            lines: [['Teacher', 'The class starts at ___.']],
            options: ['seven o\'clock', 'seven hours', 'the seven', 'o\'clock seven'],
            answer: 'seven o\'clock',
            explain: 'seven o\'clock = 7:00 — hora exacta: [hora] + o\'clock.',
          },
          {
            scene: 'Son las 3:15',
            lines: [['Carlos', 'It\'s ___ — we have a break now.']],
            options: ['quarter past three', 'three and quarter', 'quarter to three', 'three fifteen past'],
            answer: 'quarter past three',
            explain: 'quarter past three = 3:15 — 15 minutos pasados.',
          },
          {
            scene: 'Son las 9:30',
            lines: [['Ana', 'Zhanna\'s class starts at ___.']],
            options: ['half past nine', 'half nine', 'nine and half', 'half to nine'],
            answer: 'half past nine',
            explain: 'half past nine = 9:30 — siempre "half past".',
          },
          {
            scene: 'Son las 4:45',
            lines: [['David', 'The homework deadline is at ___.']],
            options: ['quarter to five', 'quarter past four', 'quarter to four', 'four forty to'],
            answer: 'quarter to five',
            explain: 'quarter to five = 4:45 — 15 minutos PARA las 5.',
          },
          {
            scene: 'Preguntando la hora',
            lines: [['Student', '___ is it?']],
            options: ['What time', 'What hour', 'Which time', 'What o\'clock'],
            answer: 'What time',
            explain: 'What time is it? — la pregunta estándar para la hora.',
          },
          {
            scene: 'Son las 6:20',
            lines: [['Sofia', 'The train leaves at ___.']],
            options: ['twenty past six', 'six and twenty', 'twenty to six', 'six twenty past'],
            answer: 'twenty past six',
            explain: 'twenty past six = 6:20 — 20 minutos pasados.',
          },
          {
            scene: 'Son las 8:50',
            lines: [['Marco', 'Hurry! It\'s ___ and class starts at nine!']],
            options: ['ten to nine', 'ten past nine', 'ten past eight', 'nine to ten'],
            answer: 'ten to nine',
            explain: 'ten to nine = 8:50 — 10 minutos PARA las 9.',
          },
          {
            scene: 'Mediodía',
            lines: [['Carlos', 'Let\'s eat — it\'s ___.']],
            options: ['noon', 'twelve o\'clock a.m.', 'midday o\'clock', 'twelve noon\'s'],
            answer: 'noon',
            explain: 'noon = 12:00 del mediodía. También: twelve o\'clock.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Pregunta y respuesta',
        tag: '2 espacios',
        intro: 'Completa la pregunta y la respuesta sobre la hora.',
        type: 'dual',
        items: [
          {
            scene: '¿Qué hora es? — 3:00',
            lines: [['Student', '[[0]] time is it? — It\'s [[1]] o\'clock.']],
            blanks: [
              { options: ['What', 'Which', 'How'], answer: 'What', explain: 'What time is it? — siempre What.' },
              { options: ['three', 'third', 'the three'], answer: 'three', explain: 'It\'s three o\'clock = 3:00.' },
            ],
          },
          {
            scene: '¿A qué hora empieza? — 7:15',
            lines: [['Carlos', 'What time does class start? — It\'s [[0]] past [[1]].']],
            blanks: [
              { options: ['quarter', 'half', 'twenty'], answer: 'quarter', explain: '7:15 = quarter past seven.' },
              { options: ['seven', 'eight', 'six'], answer: 'seven', explain: 'quarter past seven = 7:15.' },
            ],
          },
          {
            scene: '¿A qué hora es el recreo? — 9:30',
            lines: [['Ana', 'The break is at half [[0]] [[1]].']],
            blanks: [
              { options: ['past', 'to', 'after'], answer: 'past', explain: '9:30 = half past nine.' },
              { options: ['nine', 'ten', 'eight'], answer: 'nine', explain: 'half past nine = 9:30.' },
            ],
          },
          {
            scene: '¿A qué hora termina? — 8:45',
            lines: [['Teacher', 'Class ends at quarter [[0]] [[1]].']],
            blanks: [
              { options: ['to', 'past', 'after'], answer: 'to', explain: '8:45 = quarter TO nine.' },
              { options: ['nine', 'eight', 'ten'], answer: 'nine', explain: 'quarter to nine = 8:45.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'El horario de WeLearn',
        tag: 'Opciones',
        intro: 'Elige cómo se dice la hora para completar el horario de clases.',
        type: 'guidedText',
        scene: 'Horario semanal de clases de inglés en WeLearn',
        text: 'English classes start at [[0]] (7:00). The first break is at [[1]] (7:30). The second part starts at [[2]] (7:45). Classes end at [[3]] (9:00). The IELTS workshop is at [[4]] (9:15). The last class of the day finishes at [[5]] (10:30).',
        blanks: [
          { options: ['seven o\'clock', 'seven hours', 'the seven'], answer: 'seven o\'clock', explain: '7:00 = seven o\'clock.' },
          { options: ['half past seven', 'half seven', 'seven and half'], answer: 'half past seven', explain: '7:30 = half past seven.' },
          { options: ['quarter to eight', 'quarter past seven', 'seven forty-five'], answer: 'quarter to eight', explain: '7:45 = quarter to eight.' },
          { options: ['nine o\'clock', 'nine hours', 'o\'clock nine'], answer: 'nine o\'clock', explain: '9:00 = nine o\'clock.' },
          { options: ['quarter past nine', 'quarter to nine', 'nine fifteen past'], answer: 'quarter past nine', explain: '9:15 = quarter past nine.' },
          { options: ['half past ten', 'half ten', 'ten and half'], answer: 'half past ten', explain: '10:30 = half past ten.' },
        ],
      },
      {
        id: 'l4',
        title: 'Las horas del día',
        tag: 'Sin opciones',
        intro: 'Escribe cómo se dice cada hora en inglés.',
        type: 'freeText',
        scene: 'Rutina diaria de un estudiante de WeLearn',
        text: 'I wake up at ___ (6:00). I eat breakfast at ___ (7:15). I go to class at ___ (6:30 p.m.). The class ends at ___ (8:45 p.m.). I study at home until ___ (10:00). I go to sleep at ___ (11:30).',
        blanks: [
          { answer: 'six o\'clock', accepted: ["six o'clock", 'six oclock', '6 oclock', "6 o'clock"], explain: '6:00 = six o\'clock.' },
          { answer: 'quarter past seven', accepted: ['quarter past seven', 'seven fifteen'], explain: '7:15 = quarter past seven.' },
          { answer: 'half past six', accepted: ['half past six', 'six thirty'], explain: '6:30 = half past six.' },
          { answer: 'quarter to nine', accepted: ['quarter to nine', 'eight forty-five', 'eight forty five'], explain: '8:45 = quarter to nine.' },
          { answer: 'ten o\'clock', accepted: ["ten o'clock", 'ten oclock'], explain: '10:00 = ten o\'clock.' },
          { answer: 'half past eleven', accepted: ['half past eleven', 'eleven thirty'], explain: '11:30 = half past eleven.' },
        ],
      },
      {
        id: 'l5',
        title: 'Diciendo la hora',
        tag: 'Producción',
        intro: 'Escribe cómo decir la hora completa en inglés.',
        type: 'write',
        items: [
          {
            scene: 'Hora exacta',
            prompt: 'Escribe la hora: 5:00 → "It\'s ___"',
            answer: 'It\'s five o\'clock.',
            accepted: ["it's five o'clock", "it's five o'clock.", 'its five oclock'],
            explain: 'It\'s five o\'clock. = 5:00.',
          },
          {
            scene: 'Y cuarto',
            prompt: 'Escribe la hora: 2:15 → "It\'s ___"',
            answer: 'It\'s quarter past two.',
            accepted: ["it's quarter past two", "it's quarter past two.", "it's two fifteen"],
            explain: 'It\'s quarter past two. = 2:15.',
          },
          {
            scene: 'Y media',
            prompt: 'Escribe la hora: 8:30 → "It\'s ___"',
            answer: 'It\'s half past eight.',
            accepted: ["it's half past eight", "it's half past eight.", "it's eight thirty"],
            explain: 'It\'s half past eight. = 8:30.',
          },
          {
            scene: 'Cuarto para',
            prompt: 'Escribe la hora: 11:45 → "It\'s ___"',
            answer: 'It\'s quarter to twelve.',
            accepted: ["it's quarter to twelve", "it's quarter to twelve.", "it's eleven forty-five"],
            explain: 'It\'s quarter to twelve. = 11:45.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Tu horario diario',
        tag: 'Reto final',
        intro: 'Escribe tu propio horario usando las horas en inglés.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina de mañana',
            prompt: 'Write what time you wake up and eat breakfast: I wake up at ___ and eat at ___.',
            answer: 'I wake up at seven o\'clock and eat at half past seven.',
            accepted: ["o'clock", 'past', 'to', 'thirty', 'fifteen', 'forty'],
            explain: 'Use: [hour] o\'clock / quarter past [hour] / half past [hour] / quarter to [hour].',
          },
          {
            scene: 'Tu clase de inglés',
            prompt: 'Write when your English class starts and ends: My class starts at ___ and ends at ___.',
            answer: 'My class starts at seven o\'clock and ends at half past eight.',
            accepted: ['starts at', 'ends at'],
            explain: 'My class starts at [time] and ends at [time]. Use correct time expressions.',
          },
          {
            scene: 'Preguntando la hora',
            prompt: 'Write the question to ask someone what time it is, and a sample answer.',
            answer: 'What time is it? It\'s half past six.',
            accepted: ['what time is it', "what's the time"],
            explain: 'What time is it? / What\'s the time? — both correct. Answer: It\'s [time].',
          },
        ],
      },
    ],
  },
}

export default topic
