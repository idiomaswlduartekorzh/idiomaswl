import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'wh-questions',
  order: '16',
  color: '#0369a1',
  category: 'Questions',
  level: 'A1',
  title: 'Preguntas con WH en inglés A1',
  shortTitle: 'WH questions',
  metaTitle: 'Preguntas WH en inglés A1 | What, Where, When, Who, How',
  description:
    'Aprende a formar preguntas con What, Where, When, Who, How, How old y How much/many en inglés A1. Domina la estructura WH + auxiliar + sujeto y evita el error más común del hispanohablante: omitir el do/does.',
  lead: 'Las preguntas WH son la herramienta de conversación más poderosa del A1. Con solo 7 palabras (What, Where, When, Who, Why, How, Which) puedes preguntar casi cualquier cosa. La clave: WH word + do/does/is/are + sujeto + verbo base.',
  outcomes: [
    'Formar preguntas con What, Where, When, Who y How correctamente.',
    'Usar do/does en preguntas con present simple y is/are con to be.',
    'Combinar How con adjetivos: How old, How much, How many, How far.',
  ],
  guide: {
    goal: 'Construir preguntas de información usando la palabra WH correcta y el auxiliar adecuado.',
    model: 'Where do you live? / What is your name? / How old are you? / Who is she?',
    formula: 'WH word + do/does/is/are + subject + verb (base)?',
    decisions: [
      'Con to be: WH + am/is/are + subject? → Where are you from?',
      'Con present simple: WH + do/does + subject + verb? → Where do you live?',
      'Con can: WH + can + subject + verb? → What can you do?',
      'How + adjective: How old are you? / How much is it? / How many students?',
      'NUNCA: "Where you live?" o "What you do?" — siempre necesita auxiliar.',
    ],
    table: [
      ['WH word', 'Pregunta por', 'Ejemplo A1'],
      ['What', 'cosa / información', 'What is your name?'],
      ['Where', 'lugar', 'Where do you live?'],
      ['When', 'tiempo', 'When is your birthday?'],
      ['Who', 'persona', 'Who is your teacher?'],
      ['How', 'manera / cantidad', 'How are you? / How old are you?'],
    ],
    mistakes: [
      '"Where you live?" ❌ → Where do you live? ✓ — do es obligatorio con present simple.',
      '"What your name?" ❌ → What is your name? ✓ — to be no se puede omitir.',
      '"How many years you have?" ❌ → How old are you? ✓ — edad con How old, no "have".',
    ],
  },
  seo: [
    {
      heading: 'Qué son las WH questions y cuándo usarlas',
      paragraphs: [
        'Las WH questions (o preguntas de información) en inglés son las que empiezan con palabras como What (qué/cuál), Where (dónde), When (cuándo), Who (quién), Why (por qué), How (cómo) y Which (cuál). A diferencia de las preguntas de sí/no, estas piden información específica.',
        'En A1 las más importantes son What, Where, Who y How. Con solo estas cuatro puedes mantener una conversación básica: preguntar el nombre, la procedencia, la profesión, la dirección y el bienestar de alguien.',
      ],
    },
    {
      heading: 'La estructura: WH + auxiliar + sujeto + verbo',
      paragraphs: [
        'El error más frecuente del hispanohablante es omitir el auxiliar: "Where you live?" En español "¿Dónde vives?" no necesita auxiliar, pero en inglés sí. La estructura correcta es: WH word + do/does (present simple) o is/are (to be) + sujeto + verbo base.',
        'Con el verbo to be la estructura es más simple porque to be ya es el auxiliar: Where are you from? (no "Where do you are from?"). Con present simple: What do you study? / Where does she work? Nota que con she/he/it se usa does y el verbo va en forma base (does she work, no does she works).',
      ],
    },
    {
      heading: 'How + adjetivo: las combinaciones más útiles en A1',
      paragraphs: [
        'How solo significa "¿cómo?" pero combinado con adjetivos crea preguntas muy útiles: How old are you? (¿Cuántos años tienes?), How much is it? (¿Cuánto cuesta?), How many students are there? (¿Cuántos estudiantes hay?), How far is the school? (¿Qué tan lejos está la escuela?).',
        'En A1 la más importante es How old are you? porque la edad en inglés NO usa have (error frecuente: "How many years do you have?"). Siempre: How old are you? I am 25 years old.',
      ],
    },
  ],
  visual: {
    mode: 'question-map',
    teacherLens: 'El estudiante aprende a elegir la palabra WH correcta y a colocar el auxiliar antes del sujeto.',
    graphicPrompt: 'Mapa de WH questions: What/Who (cosa/persona), Where (lugar), When (tiempo), How (manera).',
    scene: [
      ['What + is/do/does?', 'What is your name? / What do you do?'],
      ['Where + are/do?', 'Where are you from? / Where do you work?'],
      ['Who + is/are?', 'Who is your teacher? / Who are they?'],
      ['How old + are?', 'How old are you? / How old is she?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['auxiliar obligatorio', 'do vs does', 'How old para edad', 'who vs what'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la palabra WH correcta para cada pregunta.',
        type: 'choice',
        items: [
          {
            scene: 'Conociendo a alguien',
            lines: [['David', '___ is your name?']],
            options: ['What', 'Where', 'Who', 'When'],
            answer: 'What',
            explain: '"What is your name?" — What pregunta por información/cosas.',
          },
          {
            scene: 'Preguntando la procedencia',
            lines: [['Teacher', '___ are you from?']],
            options: ['Where', 'What', 'When', 'Who'],
            answer: 'Where',
            explain: '"Where are you from?" — Where pregunta por lugar.',
          },
          {
            scene: 'Preguntando la edad',
            lines: [['Carlos', '___ old are you?']],
            options: ['How', 'What', 'Who', 'Where'],
            answer: 'How',
            explain: '"How old are you?" — edad con How old, no "What years".',
          },
          {
            scene: 'Preguntando sobre una persona',
            lines: [['Student', '___ is your English teacher?']],
            options: ['Who', 'What', 'Where', 'How'],
            answer: 'Who',
            explain: '"Who is your teacher?" — Who pregunta por personas.',
          },
          {
            scene: 'Preguntando el trabajo',
            lines: [['Lina', '___ do you work?']],
            options: ['Where', 'When', 'Who', 'What'],
            answer: 'Where',
            explain: '"Where do you work?" — lugar de trabajo con Where.',
          },
          {
            scene: 'Preguntando el precio',
            lines: [['Student', '___ much is the English course?']],
            options: ['How', 'What', 'Where', 'Who'],
            answer: 'How',
            explain: '"How much is it?" — precio con How much.',
          },
          {
            scene: 'Preguntando el horario',
            lines: [['Ana', '___ does the class start?']],
            options: ['When', 'Where', 'What', 'Who'],
            answer: 'When',
            explain: '"When does the class start?" — tiempo con When.',
          },
          {
            scene: 'Preguntando la profesión',
            lines: [['Marco', '___ do you do for work?']],
            options: ['What', 'Where', 'Who', 'How'],
            answer: 'What',
            explain: '"What do you do?" — profesión/actividad con What.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'WH word y auxiliar',
        tag: '2 espacios',
        intro: 'Elige la palabra WH y el auxiliar correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Conociendo a alguien',
            lines: [['Sofia', '[[0]] [[1]] your name?']],
            blanks: [
              { options: ['What', 'Where', 'Who'], answer: 'What', explain: 'What pregunta por información.' },
              { options: ['is', 'do', 'are'], answer: 'is', explain: 'What is your name? — to be singular.' },
            ],
          },
          {
            scene: 'Preguntando al grupo',
            lines: [['Teacher', '[[0]] [[1]] you from?']],
            blanks: [
              { options: ['Where', 'What', 'Who'], answer: 'Where', explain: 'Where pregunta por lugar.' },
              { options: ['are', 'do', 'is'], answer: 'are', explain: 'Where are you from? — to be plural.' },
            ],
          },
          {
            scene: 'Sobre la profesión',
            lines: [['Carlos', '[[0]] [[1]] David do for work?']],
            blanks: [
              { options: ['What', 'Where', 'How'], answer: 'What', explain: 'What do you do = profesión.' },
              { options: ['does', 'do', 'is'], answer: 'does', explain: 'David = he → does (3.ª persona).' },
            ],
          },
          {
            scene: 'Preguntando la edad',
            lines: [['Lina', '[[0]] old [[1]] your teacher?']],
            blanks: [
              { options: ['How', 'What', 'Who'], answer: 'How', explain: 'How old = edad.' },
              { options: ['is', 'does', 'do'], answer: 'is', explain: 'How old is your teacher? — to be sing.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige la palabra WH correcta para completar el diálogo de presentación.',
        type: 'guidedText',
        scene: 'Primera clase en WeLearn — diálogo de presentación',
        text: '— [[0]] is your name? — My name is Carlos. — [[1]] are you from? — I\'m from Medellín. — [[2]] do you do? — I\'m a student. — [[3]] old are you? — I\'m 22. — [[4]] does your English class start? — At 7 p.m. — [[5]] is your teacher? — Her name is Zhanna.',
        blanks: [
          { options: ['What', 'Where', 'Who'], answer: 'What', explain: 'What is your name? — nombre.' },
          { options: ['Where', 'What', 'When'], answer: 'Where', explain: 'Where are you from? — procedencia.' },
          { options: ['What', 'Where', 'How'], answer: 'What', explain: 'What do you do? — profesión.' },
          { options: ['How', 'What', 'When'], answer: 'How', explain: 'How old are you? — edad.' },
          { options: ['When', 'Where', 'Who'], answer: 'When', explain: 'When does it start? — tiempo.' },
          { options: ['Who', 'What', 'Where'], answer: 'Who', explain: 'Who is your teacher? — persona.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe la palabra WH correcta y el auxiliar si es necesario.',
        type: 'freeText',
        scene: 'Cuestionario de inscripción en WeLearn',
        text: '[[0]] is your full name? [[1]] are you from? [[2]] do you work? [[3]] old are you? [[4]] much is the course per month? [[5]] many students are in your class?',
        blanks: [
          { answer: 'What', accepted: ['What', 'what'], explain: 'What is your name?' },
          { answer: 'Where', accepted: ['Where', 'where'], explain: 'Where are you from?' },
          { answer: 'Where', accepted: ['Where', 'where'], explain: 'Where do you work? — lugar.' },
          { answer: 'How', accepted: ['How', 'how'], explain: 'How old are you? — edad.' },
          { answer: 'How', accepted: ['How', 'how'], explain: 'How much — precio.' },
          { answer: 'How', accepted: ['How', 'how'], explain: 'How many — cantidad contable.' },
        ],
      },
      {
        id: 'l5',
        title: 'Formando preguntas',
        tag: 'Producción',
        intro: 'Escribe la pregunta WH completa con el auxiliar correcto.',
        type: 'write',
        items: [
          {
            scene: 'Preguntando el nombre',
            prompt: 'Forma una pregunta: What / your name / is?',
            answer: 'What is your name?',
            accepted: ['what is your name', 'what is your name?'],
            explain: 'What is your name? — to be con What.',
          },
          {
            scene: 'Preguntando la procedencia',
            prompt: 'Forma una pregunta: Where / you / from / are?',
            answer: 'Where are you from?',
            accepted: ['where are you from', 'where are you from?'],
            explain: 'Where are you from? — to be plural.',
          },
          {
            scene: 'Preguntando la profesión',
            prompt: 'Forma una pregunta: What / David / does / do?',
            answer: 'What does David do?',
            accepted: ['what does david do', 'what does david do?'],
            explain: 'What does David do? — present simple, 3.ª persona.',
          },
          {
            scene: 'Preguntando la edad',
            prompt: 'Forma una pregunta: How old / she / is?',
            answer: 'How old is she?',
            accepted: ['how old is she', 'how old is she?'],
            explain: 'How old is she? — to be singular.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de conversación',
        tag: 'Reto final',
        intro: 'Escribe preguntas WH reales para conocer a alguien.',
        type: 'write',
        items: [
          {
            scene: 'Entrevista de presentación',
            prompt: 'Write 3 WH questions to meet a new classmate (name, country, age).',
            answer: 'What is your name? Where are you from? How old are you?',
            accepted: ['what is your name', 'where are you from', 'how old are you'],
            explain: 'What is your name? / Where are you from? / How old are you?',
          },
          {
            scene: 'Preguntando sobre el trabajo',
            prompt: 'Ask where someone works: ___ do you work?',
            answer: 'Where do you work?',
            accepted: ['where do you work', 'where do you work?'],
            explain: 'Where do you work? — present simple con do.',
          },
          {
            scene: 'Preguntando el precio',
            prompt: 'Ask the price of something: ___ much ___ it?',
            answer: 'How much is it?',
            accepted: ['how much is it', 'how much is it?', 'how much does it cost'],
            explain: 'How much is it? o How much does it cost?',
          },
        ],
      },
    ],
  },
}

export default topic
