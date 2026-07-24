import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'quantifiers-b1',
  order: '14',
  color: '#dc2626',
  category: 'Grammar',
  level: 'B1',
  title: 'Cuantificadores en Inglés B1',
  shortTitle: 'Cuantificadores',
  metaTitle: 'Cuantificadores B1 — Few, little, many, much, enough, too, plenty en inglés',
  description:
    'Los cuantificadores expresan cantidad sin dar un número exacto. En B1 debes dominar few/a few con contables, little/a little con incontables, many/much vs a lot of, enough y too, y los cuantificadores universales both/either/neither/all/each/every. Son fundamentales en IELTS y Cambridge.',
  lead: 'Domina los cuantificadores del inglés B1 para expresar cantidades con precisión y naturalidad.',
  outcomes: [
    'Distingues few/a few (contables) de little/a little (incontables) y sus matices de significado',
    'Usas many/much para preguntas y negaciones, y a lot of/lots of en afirmativas',
    'Aplicas enough + sustantivo y enough + adjetivo/adverbio, y too + adjetivo',
    'Usas both/either/neither/all/each/every correctamente con sustantivos singulares y plurales',
  ],

  guide: {
    goal: 'Elegir el cuantificador correcto según si el sustantivo es contable o incontable, y según el contexto (positivo, negativo, pregunta).',
    model: 'I have a few friends in Seoul. / There is very little time left. / He has too much work. / Not enough students passed the exam.',
    formula: 'few/a few + countable plural / little/a little + uncountable / many/much in negatives and questions / a lot of + both',
    decisions: [
      'few (casi ninguno, negativo) vs a few (algunos, positivo): "She has few friends" (casi ninguno) vs "She has a few friends" (algunos, es positivo)',
      'little (casi nada, negativo) vs a little (un poco, positivo): "I have little money" (casi nada) vs "I have a little money" (un poco, suficiente para algo)',
      'many + contables en preguntas y negaciones: "How many students?" / "Not many people came."',
      'much + incontables en preguntas y negaciones: "How much time do we have?" / "I don\'t have much patience."',
      'a lot of / lots of: usados en afirmativas con contables e incontables: "She has a lot of experience."',
      'enough + sustantivo: "There is enough food." / adj/adv + enough: "She is old enough to vote."',
      'too + adjetivo/adverbio (exceso negativo): "The coffee is too hot." / too much + incontable / too many + contable',
    ],
    table: [
      ['Cuantificador', 'Con sustantivo', 'Ejemplo'],
      ['few / a few', 'contable plural', 'few students / a few ideas'],
      ['little / a little', 'incontable', 'little time / a little help'],
    ],
    mistakes: [
      '"I have few money." ❌ → "I have little money." ✓ — money es incontable: usa little, no few.',
      '"There are much cars." ❌ → "There are many cars." / "There is a lot of traffic." ✓ — many con contables, much con incontables.',
      '"It\'s enough hot." ❌ → "It\'s hot enough." ✓ — enough va DESPUÉS del adjetivo cuando modifica adjetivos.',
    ],
  },

  seo: [
    {
      heading: 'Few vs a few, little vs a little: la distinción clave',
      paragraphs: [
        'Few y little significan "casi ninguno / casi nada" — transmiten una idea negativa. A few y a little significan "algunos / un poco" — transmiten una idea positiva o neutra. La diferencia está en el artículo "a".',
        'Few se usa con sustantivos contables en plural: "She has few opportunities in that city" (casi ninguna, es una situación difícil). A few también con contables: "She has a few ideas to share" (algunas, es positivo). Little con incontables: "We have little time" (casi nada). A little con incontables: "Give me a little time" (un poco, es posible).',
      ],
      table: [
        ['Cuantificador', 'Tipo de sustantivo', 'Matiz', 'Ejemplo'],
        ['few', 'contable plural', 'casi ninguno (negativo)', 'Few students passed the exam.'],
        ['a few', 'contable plural', 'algunos (positivo)', 'I have a few suggestions.'],
        ['little', 'incontable', 'casi nada (negativo)', 'There is little hope.'],
        ['a little', 'incontable', 'un poco (positivo)', 'I need a little help.'],
      ],
    },
    {
      heading: 'Many, much y a lot of: cuándo usar cada uno',
      paragraphs: [
        'Many se usa con sustantivos contables en plural. Much se usa con sustantivos incontables. Ambos son más formales y aparecen principalmente en oraciones negativas y preguntas: "How many languages do you speak?" / "I don\'t have much experience." / "There aren\'t many options."',
        'En oraciones afirmativas, el inglés hablado prefiere a lot of (o lots of, más informal) tanto con contables como con incontables: "She has a lot of friends." / "We spent a lot of money." / "There are lots of opportunities in that field." En writing formal (IELTS, Cambridge) a lot of también es correcto.',
      ],
    },
    {
      heading: 'Enough y too: suficiencia y exceso',
      paragraphs: [
        'Enough expresa suficiencia. Cuando va con un sustantivo, precede al sustantivo: "There is enough food for everyone." / "Do we have enough time?" Cuando va con un adjetivo o adverbio, va DESPUÉS del adjetivo: "She is confident enough to present." / "He didn\'t work hard enough."',
        'Too expresa exceso y tiene connotación negativa. Too va antes del adjetivo o adverbio: "The water is too hot to drink." / "He drives too fast." Too much + incontable: "There is too much noise." Too many + contable plural: "There are too many people in this lift." Not enough significa "insufficient": "There aren\'t enough seats."',
      ],
    },
    {
      heading: 'Both, either, neither, all, each, every: cuantificadores universales',
      paragraphs: [
        'Both (los dos / ambos) se usa con plural: "Both students passed." / "I like both options." Either (cualquiera de los dos / o uno o el otro) en afirmativas: "You can take either road." Neither (ninguno de los dos) es la negación de both: "Neither answer is correct."',
        'All + plural (todo el grupo): "All students must attend." / "All the information is here." Each + singular (énfasis individual): "Each student has a different learning style." Every + singular (énfasis colectivo): "Every student in the class improved." La diferencia entre each y every es sutil: each enfatiza los individuos por separado; every enfatiza el grupo completo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Cuantificadores con distinción contable/incontable, few vs a few, enough/too y universales.',
    graphicPrompt: 'Diagrama de Venn: contables a la izquierda (many, few, a few), incontables a la derecha (much, little, a little), en el centro (a lot of, enough, too much/many).',
    scene: [
      ['There is very little time left before the deadline.', 'Queda muy poco tiempo antes de la fecha límite.'],
      ['I have a few friends who speak Korean — it is really helpful.', 'Tengo algunos amigos que hablan coreano — es muy útil.'],
      ['She has too much work and not enough help.', 'Tiene demasiado trabajo y no suficiente ayuda.'],
      ['Both candidates were excellent, but neither got the job.', 'Ambos candidatos eran excelentes, pero ninguno obtuvo el trabajo.'],
      ['Is there enough space in the classroom for thirty students?', '¿Hay suficiente espacio en el salón para treinta estudiantes?'],
      ['A lot of people are learning Korean because of K-pop.', 'Mucha gente está aprendiendo coreano por el K-pop.'],
      ['Each lesson at WeLearn focuses on a different grammar point.', 'Cada lección en WeLearn se enfoca en un punto gramatical diferente.'],
      ['How many languages do you speak? — Too many to count!', '¿Cuántos idiomas hablas? — ¡Demasiados para contar!'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['have', 'need', 'find', 'spend', 'use'],
    reviewFocus: ['few/a few + countable', 'little/a little + uncountable', 'many/much in questions/negatives', 'enough + noun', 'adj + enough', 'too + adj'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el cuantificador correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el cuantificador correcto para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Situación de estudio',
            lines: [['', 'I have ___ time to finish the report — maybe just an hour.']],
            options: ['a little', 'a few', 'few', 'many'],
            answer: 'a little',
            explain: '"time" es incontable → a little (un poco, suficiente para algo positivo): "a little time".',
          },
          {
            scene: 'Clase de inglés',
            lines: [['', 'Not ___ students in my class have been to an English-speaking country.']],
            options: ['many', 'much', 'little', 'few'],
            answer: 'many',
            explain: '"students" es contable plural → many en oraciones negativas: "Not many students".',
          },
          {
            scene: 'El café',
            lines: [['', 'This coffee is ___ hot for me to drink right now.']],
            options: ['too', 'enough', 'very', 'so'],
            answer: 'too',
            explain: '"too" expresa exceso negativo: the coffee is too hot (no puedo tomarlo). Va antes del adjetivo.',
          },
          {
            scene: 'Preparación para el examen',
            lines: [['', 'She is not confident ___ to speak in front of the class yet.']],
            options: ['enough', 'too', 'very', 'much'],
            answer: 'enough',
            explain: 'Adjetivo + enough: "confident enough". Enough va DESPUÉS del adjetivo.',
          },
          {
            scene: 'Preguntas de cantidad',
            lines: [['', 'How ___ money do you need for the trip?']],
            options: ['much', 'many', 'a lot', 'few'],
            answer: 'much',
            explain: '"money" es incontable → "How much money?" Much se usa en preguntas con incontables.',
          },
          {
            scene: 'Una decisión difícil',
            lines: [['', '___ options are good — you can choose whichever you prefer.']],
            options: ['Both', 'Either', 'Neither', 'Every'],
            answer: 'Both',
            explain: '"Both options are good" = las dos son buenas. Both + plural para referirse a dos cosas positivamente.',
          },
          {
            scene: 'Problema en la fiesta',
            lines: [['', 'There are ___ many people in this room. It is impossible to breathe!']],
            options: ['too', 'very', 'so', 'such'],
            answer: 'too',
            explain: '"too many people" = exceso negativo de personas contables. Too many + contable plural.',
          },
          {
            scene: 'Motivación',
            lines: [['', '___ student in our program has the potential to become fluent.']],
            options: ['Every', 'Each', 'All', 'Both'],
            answer: 'Every',
            explain: '"Every student" enfatiza el grupo completo: todos sin excepción. Every + singular.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Completa con el cuantificador correcto',
        tag: '2 espacios',
        intro: 'Completa con los cuantificadores apropiados para cada contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Recursos de estudio',
            lines: [['', 'I have [[0]] good grammar books but [[1]] time to read them all.']],
            blanks: [
              { options: ['a few', 'few', 'a little', 'little'], answer: 'a few', explain: '"books" es contable → a few (algunos, positivo): I have a few good grammar books.' },
              { options: ['little', 'a little', 'few', 'a few'], answer: 'little', explain: '"time" es incontable → little (casi nada, negativo): little time to read them.' },
            ],
          },
          {
            scene: 'Opciones de transporte',
            lines: [['', '[[0]] of the buses arrive on time — there isn\'t [[1]] we can do about it.']],
            blanks: [
              { options: ['Few', 'A few', 'Little', 'A little'], answer: 'Few', explain: '"buses" es contable → Few (casi ninguno, negativo): Few buses arrive on time.' },
              { options: ['much', 'many', 'few', 'a few'], answer: 'much', explain: '"There isn\'t much we can do" → much en negación con incontable (thing/action).' },
            ],
          },
          {
            scene: 'Planes del fin de semana',
            lines: [['', 'I have [[0]] things to do this weekend. There is [[1]] too much to finish in two days.']],
            blanks: [
              { options: ['too many', 'too much', 'many', 'a lot'], answer: 'too many', explain: '"things" es contable → too many things (exceso: demasiadas cosas).' },
              { options: ['just', 'very', 'quite', 'rather'], answer: 'just', explain: '"just too much" = simplemente demasiado. Intensifica la afirmación.' },
            ],
          },
          {
            scene: 'Decisión entre dos opciones',
            lines: [['', '[[0]] the online course and the in-person class are good, but [[1]] option fits my schedule perfectly.']],
            blanks: [
              { options: ['Both', 'Either', 'Neither', 'All'], answer: 'Both', explain: '"Both...are good" = las dos opciones son buenas. Both + plural para dos elementos.' },
              { options: ['neither', 'either', 'both', 'no'], answer: 'neither', explain: '"Neither option fits" = ninguna de las dos. Neither + singular (negativo de both).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día sin suficiente de nada',
        tag: 'Texto guiado',
        intro: 'Completa con el cuantificador correcto según el sustantivo (contable o incontable).',
        type: 'guidedText',
        scene: 'Completa el texto con el cuantificador apropiado.',
        text: 'Yesterday was a difficult day. I had [[0]] sleep the night before, so I was exhausted. I had [[1]] meetings in the morning — three in a row — and [[2]] time to eat lunch. I made [[3]] mistakes in a presentation, but luckily [[4]] of my colleagues were supportive. There was [[5]] traffic on the way home, so I arrived late. In the evening, I had [[6]] energy left to do anything. I need to find [[7]] better balance.',
        blanks: [
          { options: ['little', 'a little', 'few', 'a few'], answer: 'little', explain: '"sleep" es incontable y el contexto es negativo → little sleep (casi nada).' },
          { options: ['a few', 'few', 'a little', 'much'], answer: 'a few', explain: '"meetings" es contable y el número es pequeño → a few meetings (algunas).' },
          { options: ['little', 'a little', 'few', 'a few'], answer: 'little', explain: '"time" es incontable y es negativo → little time (casi nada).' },
          { options: ['a few', 'few', 'a little', 'little'], answer: 'a few', explain: '"mistakes" es contable → a few mistakes (algunos errores).' },
          { options: ['both', 'all', 'either', 'neither'], answer: 'both', explain: 'Para el contexto de "los dos / todos mis colegas" → both (o all si son más de dos).' },
          { options: ['a lot of', 'many', 'few', 'a few'], answer: 'a lot of', explain: '"traffic" es incontable en inglés → a lot of traffic (mucho tráfico). No "many traffic".' },
          { options: ['little', 'a little', 'few', 'a few'], answer: 'little', explain: '"energy" es incontable y el contexto es negativo → little energy.' },
          { options: ['a', 'some', 'much', 'many'], answer: 'a', explain: '"a better balance" → artículo indefinido con sustantivo contable singular.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el cuantificador correcto en cada espacio.',
        type: 'freeText',
        scene: 'Completa con el cuantificador más apropiado.',
        text: 'Learning a language requires [[0]] dedication — you cannot become fluent in a few weeks. However, with [[1]] good strategies, you can make rapid progress. [[2]] students give up too easily when they make mistakes. In reality, making mistakes is how you learn. You don\'t need [[3]] money to learn English — there are [[4]] free resources online.',
        blanks: [
          { answer: 'a lot of', accepted: ['a lot of', 'lots of', 'much'], explain: '"dedication" es incontable en afirmativa → a lot of dedication.' },
          { answer: 'a few', accepted: ['a few'], explain: '"strategies" es contable → a few good strategies (algunas, positivo).' },
          { answer: 'Many', accepted: ['Many', 'A lot of'], explain: '"students" es contable en afirmativa → Many students (o A lot of students).' },
          { answer: 'much', accepted: ['a lot of', 'much'], explain: '"money" es incontable → much money (en negativa) o a lot of money.' },
          { answer: 'a lot of', accepted: ['a lot of', 'lots of', 'many'], explain: '"resources" es contable en afirmativa → a lot of free resources (o lots of / many).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones usando los cuantificadores indicados.',
        type: 'write',
        items: [
          {
            scene: 'Tus recursos de estudio',
            prompt: 'Describe cuántos recursos de estudio tienes usando "a few" o "a lot of" con sustantivos contables.',
            answer: 'I have a lot of grammar books but only a few apps that I actually use regularly.',
            accepted: ['a few', 'a lot of', 'lots of', 'many'],
            explain: 'a few + contable plural (algunos), a lot of / many + contable plural (muchos). Ambos son correctos en afirmativas.',
          },
          {
            scene: 'Exceso y carencia',
            prompt: 'Escribe dos oraciones: una con TOO MUCH / TOO MANY y otra con NOT ENOUGH sobre tus estudios.',
            answer: 'I have too much work this week. I don\'t have enough time to study every day.',
            accepted: ['too much', 'too many', 'not enough', 'enough time', 'enough money', 'enough practice'],
            explain: 'Too much + incontable / too many + contable. Not enough + sustantivo (sin artículo): not enough time.',
          },
          {
            scene: 'Diferencia sutil',
            prompt: 'Escribe dos oraciones: una con FEW (negativo) y otra con A FEW (positivo) sobre oportunidades o amigos.',
            answer: 'Few people in my town speak English well. However, I have a few close friends who can help me practise.',
            accepted: ['few people', 'few students', 'few friends', 'a few friends', 'a few opportunities', 'a few good teachers'],
            explain: 'Few = casi ninguno (situación negativa). A few = algunos (situación positiva o neutra).',
          },
          {
            scene: 'Universales',
            prompt: 'Usa BOTH o EVERY para describir algo sobre los idiomas que estudias o te interesan.',
            answer: 'Both English and Korean have helped me connect with people from different cultures. Every lesson teaches me something new.',
            accepted: ['both', 'every', 'each', 'all'],
            explain: 'Both + two items (los dos); Every + singular noun (énfasis en el grupo completo, cada uno).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Habla de tus recursos y tu tiempo',
        tag: 'Producción libre',
        intro: 'Describe tu situación de estudio usando cuantificadores variados.',
        type: 'write',
        items: [
          {
            scene: 'Tu tiempo de estudio',
            prompt: 'Describe cuánto tiempo tienes para estudiar inglés usando few, little, a lot of, o enough.',
            answer: 'I have very little free time during the week, but I try to study a little every day. On weekends I have a lot of time to practise.',
            accepted: ['little time', 'a little time', 'a lot of time', 'enough time', 'not enough time', 'few hours', 'a few hours'],
            explain: 'little/a little para incontables (time), few/a few para contables (hours). little = negativo, a little = positivo.',
          },
          {
            scene: 'Tus materiales',
            prompt: 'Menciona qué recursos tienes y cuáles te faltan (usa a few, many, a lot of, enough, too many).',
            answer: 'I have a few good textbooks and a lot of online resources. I have too many apps on my phone but not enough focus to use them all.',
            accepted: ['a few', 'a lot of', 'many', 'too many', 'not enough', 'enough'],
            explain: 'Combina cuantificadores: a few + contable, a lot of + contable/incontable, too many + contable, enough + sustantivo.',
          },
          {
            scene: 'Comparación',
            prompt: 'Compara dos métodos de aprendizaje usando both...and, either...or, o neither...nor.',
            answer: 'Both classroom study and self-study have their advantages. Neither method is perfect on its own — you need both.',
            accepted: ['both', 'either', 'neither', 'both...and', 'neither...nor'],
            explain: 'Both = los dos son buenos. Either = cualquiera de los dos. Neither = ninguno de los dos.',
          },
        ],
      },
    ],
  },
}

export default topic
