import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'countable-uncountable',
  order: '24',
  color: '#0369a1',
  category: 'Nouns',
  level: 'A1',
  title: 'Sustantivos contables e incontables en inglés A1',
  shortTitle: 'Contables e incontables',
  metaTitle: 'Contables e incontables en inglés A1 | Some, Any, Much, Many',
  description:
    'Aprende la diferencia entre sustantivos contables e incontables en inglés A1. Usa some/any y much/many correctamente para hablar de cantidades.',
  lead: 'En inglés, los sustantivos se dividen en contables (puedes contar: 1 book, 2 books) e incontables (no puedes contar: water, money, music). Esta distinción determina si usas much o many, y cómo formas el plural.',
  outcomes: [
    'Distinguir sustantivos contables (book, student) de incontables (water, money).',
    'Usar many con contables y much con incontables.',
    'Usar some (afirmativa) y any (negativa/pregunta) con ambos tipos.',
  ],
  guide: {
    goal: 'Usar some/any y much/many correctamente según si el sustantivo es contable o incontable.',
    model: 'I have some books. / I don\'t have any money. / How many students? / How much water?',
    formula: 'Contable: a/an, plural -s, many, some/any | Incontable: no artículo, no plural, much, some/any',
    decisions: [
      'Contable: puedes contarlos → a book, two books, many books, some books.',
      'Incontable: no puedes contarlos → water (no "a water"), much water, some water.',
      'some + afirmativa con ambos: some books / some water.',
      'any + negativa/pregunta con ambos: any books? / any water?',
      'NUNCA: "many water" o "much books" — many con contable, much con incontable.',
    ],
    table: [
      ['', 'Contable (book, student)', 'Incontable (water, money)'],
      ['Singular', 'a book / the book', 'water / the water'],
      ['Plural / cantidad', 'books / many books', '— / much water'],
      ['Afirmativa', 'some books', 'some water'],
      ['Negativa / pregunta', 'any books?', 'any water?'],
    ],
    mistakes: [
      '"many water" ❌ → much water ✓ — water es incontable, usa much.',
      '"much students" ❌ → many students ✓ — students es contable, usa many.',
      '"an information" ❌ → information (no artículo) ✓ — information es incontable.',
    ],
  },
  seo: [
    {
      heading: 'Contables e incontables en inglés: qué son y por qué importan',
      paragraphs: [
        'En inglés, todos los sustantivos son o contables (countable) o incontables (uncountable). Los contables son cosas que puedes contar una por una: a student, two students, three books. Los incontables son cosas que no tienen unidades individuales: water, money, music, information, advice.',
        'Esta distinción determina cómo usas los determinantes: puedes decir "a book" pero no "a water"; "many students" pero no "many money"; "much water" pero no "much books". En A1 es fundamental porque afecta a las frases más cotidianas.',
      ],
    },
    {
      heading: 'Some y any: cuándo usarlos',
      paragraphs: [
        'Some se usa en oraciones afirmativas con ambos tipos de sustantivos: I have some books. / I need some water. Any se usa en oraciones negativas y preguntas: I don\'t have any books. / Do you have any water? / I don\'t have any money.',
        'Una excepción: en preguntas donde se ofrece algo o se espera respuesta afirmativa, se puede usar some: Would you like some water? / Can I have some help? En A1, la regla general (some = afirmativa, any = negativa/pregunta) es suficiente.',
      ],
    },
    {
      heading: 'Much vs many: la regla de los cuantificadores',
      paragraphs: [
        'Many va con sustantivos contables en plural: many students, many books, many questions, many days. Much va con sustantivos incontables: much water, much money, much time, much information. En oraciones afirmativas se prefiere "a lot of" en lugar de much/many: I have a lot of books / I have a lot of money.',
        'Much y many son más frecuentes en preguntas y negativas: How much money? / How many students? / I don\'t have much time. / I don\'t have many friends. En A1 practica las preguntas con How much? y How many? — son las más útiles.',
      ],
    },
  ],
  visual: {
    mode: 'table',
    teacherLens: 'El estudiante aprende a clasificar sustantivos y a usar some/any y much/many correctamente.',
    graphicPrompt: 'Dos columnas: CONTABLE (se cuenta, tiene plural) vs INCONTABLE (no se cuenta, sin plural) con ejemplos comunes.',
    scene: [
      ['Contables: a/an, plural, many', 'a book / books / many books / some books'],
      ['Incontables: sin artículo, sin plural, much', 'water / much water / some water'],
      ['some (afirmativa)', 'I have some books. / I need some water.'],
      ['any (negativa/pregunta)', 'I don\'t have any books. / Is there any water?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['many con contables', 'much con incontables', 'some en afirmativa', 'any en negativa/pregunta'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Contable o incontable',
        tag: 'Opción múltiple',
        intro: 'Clasifica el sustantivo y elige la forma correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Preguntando por la cantidad',
            lines: [['Teacher', 'How ___ students are in your class?']],
            options: ['many', 'much', 'some', 'any'],
            answer: 'many',
            explain: 'How many students? — students es contable, usa many.',
          },
          {
            scene: 'Preguntando por el tiempo',
            lines: [['Carlos', 'I don\'t have ___ time to study today.']],
            options: ['much', 'many', 'some', 'a'],
            answer: 'much',
            explain: 'much time — time es incontable, usa much.',
          },
          {
            scene: 'Ofreciendo algo',
            lines: [['David', 'Would you like ___ water?']],
            options: ['some', 'any', 'many', 'much'],
            answer: 'some',
            explain: 'some water — oferta/afirmativa: some. Water es incontable.',
          },
          {
            scene: 'Negando una posesión',
            lines: [['Ana', 'I don\'t have ___ money this week.']],
            options: ['any', 'some', 'many', 'much'],
            answer: 'any',
            explain: 'don\'t have any money — negativa: any. Money es incontable.',
          },
          {
            scene: 'Cuántos libros',
            lines: [['Student', 'How ___ books do you have?']],
            options: ['many', 'much', 'any', 'some'],
            answer: 'many',
            explain: 'How many books? — books es contable: many.',
          },
          {
            scene: 'Cuánta agua',
            lines: [['Sofia', 'How ___ water do you drink per day?']],
            options: ['much', 'many', 'any', 'some'],
            answer: 'much',
            explain: 'How much water? — water es incontable: much.',
          },
          {
            scene: 'Tengo algo',
            lines: [['Marco', 'I have ___ questions about the homework.']],
            options: ['some', 'any', 'much', 'a much'],
            answer: 'some',
            explain: 'I have some questions — afirmativa: some. Questions es contable.',
          },
          {
            scene: 'Preguntando en negativa',
            lines: [['Carlos', 'Do you have ___ information about the exam?']],
            options: ['any', 'some', 'many', 'much'],
            answer: 'any',
            explain: 'Do you have any information? — pregunta: any. Information es incontable.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Cantidad y tipo',
        tag: '2 espacios',
        intro: 'Elige si el sustantivo es contable o incontable y el cuantificador correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Necesitas algo',
            lines: [['Ana', 'I need [[0]] [[1]] for the exam.']],
            blanks: [
              { options: ['some', 'any', 'many'], answer: 'some', explain: 'Afirmativa: some.' },
              { options: ['information', 'informations', 'an information'], answer: 'information', explain: 'information — incontable, sin plural ni artículo.' },
            ],
          },
          {
            scene: 'Cuántos estudiantes',
            lines: [['David', 'How [[0]] [[1]] are in the advanced group?']],
            blanks: [
              { options: ['many', 'much', 'some'], answer: 'many', explain: 'How many — students es contable.' },
              { options: ['students', 'student', 'a student'], answer: 'students', explain: 'How many students? — plural.' },
            ],
          },
          {
            scene: 'No tengo',
            lines: [['Carlos', 'I don\'t have [[0]] [[1]] today.']],
            blanks: [
              { options: ['any', 'some', 'many'], answer: 'any', explain: 'Negativa: any.' },
              { options: ['money', 'moneys', 'a money'], answer: 'money', explain: 'money — incontable, sin plural ni artículo.' },
            ],
          },
          {
            scene: 'Cuánto tiempo',
            lines: [['Teacher', 'How [[0]] [[1]] do you have for the exercise?']],
            blanks: [
              { options: ['much', 'many', 'some'], answer: 'much', explain: 'How much — time es incontable.' },
              { options: ['time', 'times', 'a time'], answer: 'time', explain: 'How much time? — incontable, sin plural.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'En la librería con David',
        tag: 'Opciones',
        intro: 'Elige some, any, much o many para completar el diálogo.',
        type: 'guidedText',
        scene: 'David y Carlos en la librería buscando materiales para el examen IELTS',
        text: 'Carlos: Do you have [[0]] IELTS books? David: Yes, I have [[1]] books here. How [[2]] money do you have? Carlos: I don\'t have [[3]] money today. David: It\'s okay. Do you need [[4]] advice? Carlos: Yes please! I have [[5]] questions about the speaking test.',
        blanks: [
          { options: ['any', 'some', 'much'], answer: 'any', explain: 'Pregunta → any (Do you have any?).' },
          { options: ['some', 'any', 'much'], answer: 'some', explain: 'Afirmativa → some books.' },
          { options: ['much', 'many', 'some'], answer: 'much', explain: 'How much money? — money es incontable.' },
          { options: ['any', 'some', 'many'], answer: 'any', explain: 'don\'t have any — negativa → any.' },
          { options: ['some', 'any', 'much'], answer: 'some', explain: 'Do you need some? — oferta → some.' },
          { options: ['some', 'any', 'much'], answer: 'some', explain: 'Afirmativa → some questions (contable).' },
        ],
      },
      {
        id: 'l4',
        title: 'Mi mochila para clase',
        tag: 'Sin opciones',
        intro: 'Escribe some, any, much o many según el contexto.',
        type: 'freeText',
        scene: 'Preparando la mochila para la clase de inglés',
        text: 'I have ___ notebooks in my bag. I don\'t have ___ pens — only one. How ___ books do you need? I have ___ water. I don\'t have ___ time this morning. Can I have ___ help?',
        blanks: [
          { answer: 'some', accepted: ['some'], explain: 'Afirmativa + contable → some notebooks.' },
          { answer: 'any', accepted: ['any'], explain: 'Negativa + contable → any pens.' },
          { answer: 'many', accepted: ['many'], explain: 'How many books? — contable.' },
          { answer: 'some', accepted: ['some'], explain: 'Afirmativa + incontable → some water.' },
          { answer: 'much', accepted: ['much', 'any'], explain: 'don\'t have much time — incontable en negativa.' },
          { answer: 'some', accepted: ['some', 'any'], explain: 'Can I have some help? — oferta/petición → some.' },
        ],
      },
      {
        id: 'l5',
        title: 'Construyendo frases',
        tag: 'Producción',
        intro: 'Escribe frases completas con contables e incontables.',
        type: 'write',
        items: [
          {
            scene: 'Tengo algo',
            prompt: 'Escribe: "Tengo algunos libros de inglés." (I / have / some / English books)',
            answer: 'I have some English books.',
            accepted: ['i have some english books', 'i have some english books.'],
            explain: 'I have some English books. — afirmativa + contable: some.',
          },
          {
            scene: 'No tengo',
            prompt: 'Escribe: "No tengo dinero." (I / don\'t have / any / money)',
            answer: 'I don\'t have any money.',
            accepted: ["i don't have any money", "i don't have any money.", 'i do not have any money'],
            explain: 'I don\'t have any money. — negativa + incontable: any.',
          },
          {
            scene: 'Pregunta de cantidad',
            prompt: 'Escribe: "¿Cuántos estudiantes hay?" (How many / students / are there?)',
            answer: 'How many students are there?',
            accepted: ['how many students are there', 'how many students are there?'],
            explain: 'How many students? — contable: many.',
          },
          {
            scene: 'Pregunta sobre tiempo',
            prompt: 'Escribe: "¿Cuánto tiempo tienes?" (How much / time / do you have?)',
            answer: 'How much time do you have?',
            accepted: ['how much time do you have', 'how much time do you have?'],
            explain: 'How much time? — incontable: much.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Mis recursos para estudiar',
        tag: 'Reto final',
        intro: 'Escribe sobre lo que tienes y no tienes para estudiar inglés.',
        type: 'write',
        items: [
          {
            scene: 'Lo que tienes',
            prompt: 'Write 2 sentences about what you HAVE (books, time, money): I have some ___.',
            answer: 'I have some books. I have some free time in the morning.',
            accepted: ['i have some'],
            explain: 'I have some [countable plural] or some [uncountable]: books, time, money, water, music.',
          },
          {
            scene: 'Lo que no tienes',
            prompt: 'Write 2 sentences about what you DON\'T have: I don\'t have any ___.',
            answer: 'I don\'t have any money. I don\'t have any dictionaries.',
            accepted: ["i don't have any", 'i do not have any'],
            explain: 'I don\'t have any [noun]. Any works with both countable and uncountable in negatives.',
          },
          {
            scene: 'Preguntando a un compañero',
            prompt: 'Write 2 questions: How many ___? / How much ___?',
            answer: 'How many books do you have? How much time do you need?',
            accepted: ['how many', 'how much'],
            explain: 'How many + countable plural / How much + uncountable.',
          },
        ],
      },
    ],
  },
}

export default topic
