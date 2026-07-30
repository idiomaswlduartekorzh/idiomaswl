import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'quantifiers',
  order: '14',
  color: '#dc2626',
  category: 'Nouns',
  level: 'A2',
  title: 'Cuantificadores en Inglés A2',
  shortTitle: 'Cuantificadores',
  metaTitle: 'Cuantificadores en Inglés A2 — Much, Many, A Lot Of, Few, Little',
  description:
    'Los cuantificadores expresan cantidad en inglés. La distinción fundamental es entre sustantivos contables (countable: students, books) e incontables (uncountable: water, money). Much va con incontables; many con contables; a lot of con ambos. Few y little expresan "poca cantidad".',
  lead: 'Domina much, many, a lot of, few, little, some y any para hablar de cantidades en inglés.',
  outcomes: [
    'Usa much con sustantivos incontables y many con contables',
    'Aplica a lot of / lots of en afirmaciones y any en negativos/preguntas',
    'Distingue few/a few (contables) de little/a little (incontables)',
    'Usa some en afirmaciones y any en preguntas y negativos',
  ],

  guide: {
    goal: 'Usar los cuantificadores correctos según si el sustantivo es contable o incontable, y según el tipo de oración.',
    model: 'There isn\'t much time. / There are many students. / I have a lot of work to do.',
    formula: 'Much + uncountable / Many + countable plural / A lot of + both',
    decisions: [
      '"Much" → incontable, generalmente en negativos y preguntas: "There isn\'t much sugar. / How much time do we have?"',
      '"Many" → contable plural, en negativos, preguntas y afirmaciones formales: "There aren\'t many tickets. / How many students?"',
      '"A lot of / lots of" → ambos, principalmente en afirmaciones: "I have a lot of work. / There are lots of people here."',
      '"Some" → afirmaciones y ofrecimientos: "I have some questions." / "Would you like some coffee?"',
      '"Any" → negativos y preguntas: "I don\'t have any money. / Do you have any questions?"',
      '"A few" (algunos, positivo) → contable: "I have a few friends there." / "Few" (pocos, negativo) → contable: "Few students passed."',
      '"A little" (algo de, positivo) → incontable: "I have a little money left." / "Little" (poco, casi nada) → incontable',
    ],
    table: [
      ['Cuantificador', 'Tipo de sustantivo', 'Uso principal'],
      ['much', 'Incontable', 'Negativos y preguntas: not much time'],
      ['many', 'Contable plural', 'Negativos y preguntas: not many people'],
    ],
    mistakes: [
      '"I don\'t have many money" ❌ → "I don\'t have much money" ✓ — money es incontable.',
      '"There are much people" ❌ → "There are many people" ✓ — people es contable.',
      '"I have some any questions" ❌ → "I have some questions" ✓ o "Do you have any questions?" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los cuantificadores en inglés?',
      paragraphs: [
        'Los cuantificadores son palabras que indican cantidad sin dar un número exacto. En inglés, la elección del cuantificador correcto depende principalmente de si el sustantivo es contable o incontable.',
        'Sustantivos contables (countable) son los que tienen plural: student/students, book/books, idea/ideas. Sustantivos incontables (uncountable) no tienen plural en inglés: water, information, money, advice, furniture, traffic, weather, time.',
      ],
    },
    {
      heading: 'Much, many y a lot of',
      paragraphs: [
        '"Much" se usa con sustantivos incontables, principalmente en oraciones negativas y preguntas: "I don\'t have much time." / "How much money do you need?" En afirmaciones es algo formal — "a lot of" es más natural.',
        '"Many" se usa con sustantivos contables plurales: "There aren\'t many students today." / "How many people came?" En afirmaciones formales: "Many people believe that..."',
        '"A lot of" (o "lots of" en conversación) se usa con AMBOS tipos de sustantivos y es el cuantificador más versátil en afirmaciones: "I have a lot of work." / "There are a lot of people here."',
      ],
      table: [
        ['Cuantificador', 'Con contables', 'Con incontables'],
        ['much', '❌', '✓ (negativos/preguntas)'],
        ['many', '✓', '❌'],
        ['a lot of', '✓', '✓'],
        ['some', '✓', '✓'],
        ['any', '✓', '✓'],
      ],
    },
    {
      heading: 'Some y any: el par más importante',
      paragraphs: [
        '"Some" se usa en afirmaciones y en ofrecimientos o peticiones: "I have some questions." / "Would you like some water?" / "Can I have some more time?"',
        '"Any" se usa en negativos y preguntas: "I don\'t have any money." / "Are there any seats available?" / "I can\'t find any information about it."',
        'Excepción importante: "some" se usa en preguntas cuando ofrecemos algo o esperamos una respuesta afirmativa: "Would you like some coffee?" (ofrecimiento). "Any" se usa cuando la respuesta puede ser negativa: "Do you have any questions?" (genuina pregunta abierta).',
      ],
    },
    {
      heading: 'Few/a few y little/a little: la diferencia sutil',
      paragraphs: [
        '"A few" (con contables) = algunos, unos cuantos (positivo): "I have a few friends in that city." / "Let me ask you a few questions."',
        '"Few" (con contables, sin artículo) = pocos, casi ninguno (negativo/preocupante): "Few students passed the exam — only 3 out of 30."',
        '"A little" (con incontables) = algo, un poco (suficiente): "I have a little time — we can talk for 5 minutes."',
        '"Little" (con incontables, sin artículo) = poco, casi nada (negativo): "There\'s little hope of finding survivors." — solo en contextos formales/escritos.',
      ],
    },
    {
      heading: 'Sustantivos incontables que sorprenden a hispanohablantes',
      paragraphs: [
        'Varios sustantivos son incontables en inglés pero contables en español: "information" (no "informations"), "advice" (no "advices"), "furniture" (no "furnitures"), "news" (no "a news" — aunque parece plural, es incontable: "The news is good"), "research" (no "researches"), "homework" (no "homeworks"), "luggage" (no "luggages").',
        'Con estos sustantivos siempre uses "much/little/a lot of" (nunca "many/few"): "I don\'t have much information." / "He gave me a lot of advice." / "We have too much luggage."',
      ],
    },
    {
      heading: '¿Cuándo se usa "some" y cuándo "any"?',
      paragraphs: [
        '"some" en afirmativas ("I have some questions") y en ofrecimientos/peticiones ("Would you like some tea?"). "any" en negativas e interrogativas ("I don\'t have any money", "Do you have any questions?"). Ambos con incontables y plurales.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "much", "many" y "a lot of"?',
      paragraphs: [
        '"much" con incontables ("much time"), "many" con contables plurales ("many people"). Ambos se usan sobre todo en preguntas y negaciones. En afirmativas se prefiere "a lot of", que vale para los dos: "a lot of time", "a lot of friends".',
      ],
    },
    {
      heading: '¿Cómo se usan "a few" y "a little"?',
      paragraphs: [
        '"a few" con contables plurales ("a few books" = unos pocos libros); "a little" con incontables ("a little water" = un poco de agua). Sin el artículo "a", "few" y "little" tienen matiz negativo (casi ninguno / casi nada).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Much/many/a lot of/some/any/few/little en contextos cotidianos A2.',
    graphicPrompt: 'Comparaciones de cantidad con objetos contables e incontables.',
    scene: [
      ['There isn\'t much time left!', '¡No queda mucho tiempo!'],
      ['There are many students in this class.', 'Hay muchos estudiantes en esta clase.'],
      ['I have a lot of work to do today.', 'Tengo mucho trabajo que hacer hoy.'],
      ['Would you like some water?', '¿Te gustaría un poco de agua?'],
      ['I don\'t have any cash on me.', 'No llevo efectivo encima.'],
      ['A few friends came to my party.', 'Algunos amigos vinieron a mi fiesta.'],
      ['There\'s a little milk in the fridge.', 'Hay un poco de leche en el refrigerador.'],
      ['How many people are coming?', '¿Cuántas personas van a venir?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['much = uncountable', 'many = countable plural', 'a lot of = both', 'some (affirm) vs any (negative/question)', 'a few vs few / a little vs little'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el cuantificador correcto',
        tag: 'Opción múltiple',
        intro: 'Elige much, many, a lot of, some o any según el sustantivo y el tipo de oración.',
        type: 'choice',
        items: [
          {
            scene: 'En la cocina',
            lines: [['', 'I don\'t have ___ milk left. I need to buy more.']],
            options: ['much', 'many', 'a lot', 'few'],
            answer: 'much',
            explain: '"Milk" es incontable → "much" en oración negativa.',
          },
          {
            scene: 'En la clase',
            lines: [['', 'There are ___ students absent today — only three are missing.']],
            options: ['a few', 'a little', 'much', 'any'],
            answer: 'a few',
            explain: '"Students" es contable plural → "a few" (algunos, positivo).',
          },
          {
            scene: 'En el trabajo',
            lines: [['', 'She has ___ experience in project management.']],
            options: ['a lot of', 'many', 'a few', 'some of'],
            answer: 'a lot of',
            explain: '"Experience" es incontable → "a lot of" (funciona con ambos).',
          },
          {
            scene: 'Ofrecimiento',
            lines: [['', 'Would you like ___ more coffee?']],
            options: ['some', 'any', 'much', 'many'],
            answer: 'some',
            explain: '"Some" en ofrecimientos: "Would you like some...?" — se espera respuesta afirmativa.',
          },
          {
            scene: 'Pregunta sobre disponibilidad',
            lines: [['', 'Is there ___ information about the event on their website?']],
            options: ['any', 'some', 'many', 'few'],
            answer: 'any',
            explain: '"Information" es incontable; en preguntas → "any".',
          },
          {
            scene: 'Hablando de opciones',
            lines: [['', 'I don\'t have ___ choice — I have to accept the offer.']],
            options: ['any', 'some', 'many', 'much'],
            answer: 'any',
            explain: '"Choice" es contable; en negativo → "any".',
          },
          {
            scene: 'Antes del viaje',
            lines: [['', 'How ___ luggage are you taking?']],
            options: ['much', 'many', 'few', 'little'],
            answer: 'much',
            explain: '"Luggage" es incontable en inglés → "How much luggage?"',
          },
          {
            scene: 'Elogio',
            lines: [['', 'She has ___ talent — she\'s going to go far.']],
            options: ['a lot of', 'many', 'a few', 'much of'],
            answer: 'a lot of',
            explain: '"Talent" es incontable. "A lot of talent" en afirmación.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Cantidad y contexto',
        tag: '2 espacios',
        intro: 'Completa con el cuantificador correcto para cada sustantivo.',
        type: 'dual',
        items: [
          {
            scene: 'En el supermercado',
            lines: [['', 'We don\'t have [[0]] bread, but we have [[1]] eggs.']],
            blanks: [
              { options: ['much', 'many', 'a few', 'some'], answer: 'much', explain: '"Bread" es incontable → "much" en negativo.' },
              { options: ['some', 'any', 'much', 'little'], answer: 'some', explain: '"Eggs" es contable → "some" en afirmativo.' },
            ],
          },
          {
            scene: 'Preparando el viaje',
            lines: [['', 'We have [[0]] time before the flight, so let\'s get [[1]] coffee.']],
            blanks: [
              { options: ['a little', 'a few', 'much', 'many'], answer: 'a little', explain: '"Time" es incontable → "a little time" (algo de tiempo, positivo).' },
              { options: ['some', 'any', 'much', 'many'], answer: 'some', explain: '"Coffee" es incontable en afirmación → "some coffee".' },
            ],
          },
          {
            scene: 'La biblioteca',
            lines: [['', 'I found [[0]] useful books on this topic, but there isn\'t [[1]] recent research.']],
            blanks: [
              { options: ['a few', 'a little', 'much', 'many'], answer: 'a few', explain: '"Books" es contable → "a few books" (unos cuantos).' },
              { options: ['much', 'many', 'a few', 'some'], answer: 'much', explain: '"Research" es incontable → "much research" en negativo.' },
            ],
          },
          {
            scene: 'Hablando de dinero',
            lines: [['', 'I don\'t have [[0]] money this month. I only have [[1]] coins.']],
            blanks: [
              { options: ['much', 'many', 'a few', 'some'], answer: 'much', explain: '"Money" es incontable → "much" en negativo.' },
              { options: ['a few', 'a little', 'much', 'many'], answer: 'a few', explain: '"Coins" es contable → "a few coins" (algunas monedas).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una visita a la ciudad',
        tag: 'Texto guiado',
        intro: 'Elige el cuantificador correcto para completar este texto.',
        type: 'guidedText',
        scene: 'Elige el cuantificador correcto para completar este texto.',
        text: 'I visited a new city last weekend. There were [[0]] (many/much) tourists everywhere — the city was very popular. I didn\'t have [[1]] (much/many) time, only two days. But I had [[2]] (a lot of/many) fun. I took [[3]] (a few/a little) guided tours and learned [[4]] (a lot of/many) history. I didn\'t spend [[5]] (much/many) money because there were [[6]] (a lot of/much) free museums. I ate at [[7]] (some/any) great local restaurants — I\'d definitely recommend it!',
        blanks: [
          { options: ['many', 'much', 'a few', 'a little'], answer: 'many', explain: '"Tourists" es contable plural → "many".' },
          { options: ['much', 'many', 'a few', 'a little'], answer: 'much', explain: '"Time" es incontable → "much" en negativo.' },
          { options: ['a lot of', 'many', 'much', 'a few'], answer: 'a lot of', explain: '"Fun" es incontable → "a lot of fun" en afirmativo.' },
          { options: ['a few', 'a little', 'much', 'many'], answer: 'a few', explain: '"Tours" es contable → "a few tours".' },
          { options: ['a lot of', 'many', 'much', 'a few'], answer: 'a lot of', explain: '"History" es incontable → "a lot of history".' },
          { options: ['much', 'many', 'a few', 'a little'], answer: 'much', explain: '"Money" es incontable → "much money" en negativo.' },
          { options: ['a lot of', 'much', 'many of', 'a few of'], answer: 'a lot of', explain: '"Museums" es contable → "a lot of museums" (o "many").' },
          { options: ['some', 'any', 'much', 'many'], answer: 'some', explain: '"Some restaurants" en afirmación.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el cuantificador',
        tag: 'Texto libre',
        intro: 'Escribe el cuantificador correcto (much, many, a lot of, some, any, a few, a little).',
        type: 'freeText',
        scene: 'Escribe el cuantificador correcto (much, many, a lot of, some, any, a few, a little).',
        text: 'I want to improve my English. I already know [[0]] vocabulary, but I need [[1]] more grammar practice. I have [[2]] grammar books at home. Unfortunately I don\'t have [[3]] time to study every day. But I can find [[4]] time on the weekends. I don\'t have [[5]] specific questions right now, but I\'ll think of [[6]] during the week.',
        blanks: [
          { answer: 'a lot of', accepted: ['a lot of', 'lots of', 'some'], explain: '"A lot of vocabulary" — en afirmación, con incontable.' },
          { answer: 'some', accepted: ['some', 'a little'], explain: '"Some more grammar practice" — en afirmación positiva.' },
          { answer: 'a few', accepted: ['a few', 'some'], explain: '"A few grammar books" — contable, número pequeño positivo.' },
          { answer: 'much', accepted: ['much', 'a lot of'], explain: '"Much time" — incontable en negativo.' },
          { answer: 'some', accepted: ['some', 'a little'], explain: '"Some time on weekends" — afirmación positiva.' },
          { answer: 'any', accepted: ['any'], explain: '"I don\'t have any specific questions" — negativo con contable.' },
          { answer: 'some', accepted: ['some', 'a few'], explain: '"Think of some" — en afirmación.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones propias usando cuantificadores correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Sobre tu semana',
            prompt: 'Describe cuánto trabajo o estudio tienes esta semana (usa a lot of, much o a little).',
            answer: 'I have a lot of work this week — three presentations and two meetings.',
            accepted: ['a lot of', 'lots of', 'much', 'a little', 'some'],
            explain: 'Ejemplo: I have a lot of assignments due this week. / I don\'t have much free time. / I have a little time for a coffee.',
          },
          {
            scene: 'Sobre tu ciudad',
            prompt: 'Escribe algo sobre tu ciudad usando many o a few.',
            answer: 'There are many restaurants in my city, but only a few are really excellent.',
            accepted: ['many', 'a few', 'a lot of', 'some', 'not many', 'lots of'],
            explain: 'Ejemplo: My city has many parks. / There are a few cultural centers worth visiting.',
          },
          {
            scene: 'Sobre la comida',
            prompt: 'Escribe algo sobre qué hay o no hay en tu refrigerador (some, any, much, a little).',
            answer: 'I don\'t have much food at home. There\'s some rice and a little cheese.',
            accepted: ['some', 'any', 'much', 'a little', 'a few', 'a lot of'],
            explain: 'Ejemplo: There\'s some yogurt and a few apples. / I don\'t have any vegetables left.',
          },
          {
            scene: 'Ofrece algo',
            prompt: 'Escribe un ofrecimiento usando "Would you like some...?"',
            answer: 'Would you like some tea? I just made a fresh pot.',
            accepted: ['would you like some', 'can i offer you some', 'do you want some'],
            explain: 'Ejemplo: Would you like some coffee? / Can I offer you some water?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Describir tu semana',
        tag: 'Producción libre',
        intro: 'Describe cómo está siendo tu semana usando al menos 4 cuantificadores diferentes.',
        type: 'write',
        items: [
          {
            scene: 'Tu semana',
            prompt: 'Escribe qué tienes que hacer esta semana (usa a lot of o much con sustantivos incontables).',
            answer: 'I have a lot of work this week, and there isn\'t much time for anything else.',
            accepted: ['a lot of', 'lots of', 'much', 'so much'],
            explain: 'Ejemplo: I have a lot of homework. / There\'s too much traffic these days.',
          },
          {
            scene: 'Tu semana',
            prompt: 'Escribe sobre personas o cosas con sustantivos contables (usa many o a few).',
            answer: 'I have a few meetings today but not many tasks to complete.',
            accepted: ['many', 'a few', 'a lot of', 'lots of', 'not many', 'few'],
            explain: 'Ejemplo: I have many students this term. / Only a few friends live near me.',
          },
          {
            scene: 'Tu semana',
            prompt: 'Escribe algo que no tienes o que te falta (usa any o much/many en negativo).',
            answer: 'I don\'t have any free time this week, and I don\'t have much energy either.',
            accepted: ["don't have any", "don't have much", "don't have many", "haven't got any"],
            explain: 'Ejemplo: I don\'t have any vacation days left. / I haven\'t got many options.',
          },
        ],
      },
    ],
  },
}

export default topic
