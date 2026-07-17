import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'superlatives',
  order: '06',
  color: '#dc2626',
  category: 'Adjectives',
  level: 'A2',
  title: 'Superlativos en Inglés A2',
  shortTitle: 'Superlativos',
  metaTitle: 'Superlativos en Inglés A2 — the -est y the most',
  description:
    'Los superlativos en inglés expresan el grado máximo de una cualidad dentro de un grupo. Se forman con "the" + adjetivo + -est (adjetivos cortos) o "the most" + adjetivo (adjetivos largos). Siempre llevan "the" delante — sin excepción.',
  lead: 'Expresa el máximo grado de una cualidad: the biggest, the most beautiful, the best — siempre con "the".',
  outcomes: [
    'Forma superlativos con -est o the most según el adjetivo',
    'Usa siempre "the" delante del superlativo',
    'Maneja las formas irregulares: good→best, bad→worst',
    'Distingue comparativo de superlativo en contexto',
  ],

  guide: {
    goal: 'Usar the + adjetivo + -est o the most + adjetivo para expresar el grado máximo dentro de un grupo.',
    model: 'This is the tallest building in the city. / She\'s the most intelligent student in the class.',
    formula: 'the + adjective + -est / the most + adjective (+ in/of)',
    decisions: [
      'Adjetivos de 1 sílaba → the + -est: tall→the tallest, fast→the fastest, cold→the coldest',
      'CVC tónica → duplica + the + -est: big→the biggest, hot→the hottest',
      'Adjetivos en -y → the + -iest: happy→the happiest, easy→the easiest',
      'Adjetivos de 2+ sílabas → the most + adjetivo: the most interesting, the most expensive',
      'Irregulares: good→the best, bad→the worst, far→the farthest/furthest',
    ],
    table: [
      ['Tipo de adjetivo', 'Superlativo', 'Ejemplo'],
      ['1 sílaba', 'the + -est', 'tall → the tallest'],
      ['2+ sílabas', 'the most + adj', 'interesting → the most interesting'],
    ],
    mistakes: [
      '"The most tallest" ❌ → "the tallest" ✓ — nunca combines "most" + -est.',
      '"She is most intelligent" ❌ → "She is the most intelligent" ✓ — siempre con "the".',
      '"The goodest" ❌ → "the best" ✓ — "good" tiene superlativo irregular.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forman los superlativos en inglés?',
      paragraphs: [
        'Los superlativos indican el grado máximo de una cualidad en un grupo: el más alto, la más inteligente, los más caros. En inglés se forman con "the" más la forma superlativa del adjetivo.',
        'La regla básica es la misma que en los comparativos: adjetivos cortos (1 sílaba) usan -est, adjetivos largos (3+ sílabas) usan "the most". La diferencia clave con el comparativo es que el superlativo SIEMPRE lleva "the" — es obligatorio.',
      ],
    },
    {
      heading: 'Reglas de formación del superlativo',
      paragraphs: [
        'Adjetivos de 1 sílaba: the + adjetivo + -est. Si termina en CVC: duplica la consonante. Ejemplos: tall→the tallest, cold→the coldest, big→the biggest, hot→the hottest, thin→the thinnest.',
        'Adjetivos terminados en -y: cambia -y por -iest. Ejemplos: happy→the happiest, easy→the easiest, heavy→the heaviest, funny→the funniest.',
        'Adjetivos de 2+ sílabas: the most + adjetivo. Ejemplos: the most comfortable, the most interesting, the most expensive, the most beautiful.',
      ],
      table: [
        ['Adjetivo', 'Comparativo', 'Superlativo'],
        ['tall', 'taller (than)', 'the tallest'],
        ['big', 'bigger (than)', 'the biggest'],
        ['happy', 'happier (than)', 'the happiest'],
        ['expensive', 'more expensive (than)', 'the most expensive'],
        ['interesting', 'more interesting (than)', 'the most interesting'],
        ['good', 'better (than)', 'the best'],
        ['bad', 'worse (than)', 'the worst'],
      ],
    },
    {
      heading: 'Preposiciones después del superlativo',
      paragraphs: [
        'Después del superlativo, generalmente se usa "in" con lugares y grupos: "the tallest building in the world", "the best student in the class", "the most popular restaurant in the city".',
        'Se usa "of" con períodos de tiempo o conjuntos: "the worst day of my life", "the best film of the year", "the most exciting moment of the trip".',
      ],
    },
    {
      heading: 'Diferencia entre comparativo y superlativo',
      paragraphs: [
        'Comparativo: compara DOS elementos → "London is bigger than Rome." Se usa "than".',
        'Superlativo: indica el MÁXIMO en un grupo de 3 o más → "London is the biggest city in the UK." Se usa "the" y normalmente "in" o "of".',
        'Tip de contexto: si hay dos elementos → comparativo. Si hay un grupo y estás eligiendo el extremo → superlativo.',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más común es olvidar "the": "She is most beautiful girl" es incorrecto. La forma correcta siempre lleva el artículo: "She is the most beautiful girl".',
        'Otro error es combinar "most" con -est: "the most tallest" o "the most biggest" son incorrectos — usa solo uno de los dos: "the tallest" o "the biggest".',
        'Con "good" y "bad", muchos intentan añadir -est: "the goodest" o "the baddest" son incorrectos. Las formas correctas son "the best" y "the worst".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Superlativos the -est / the most en contextos A2 de comparación dentro de grupos.',
    graphicPrompt: 'Escenas de ranking: el más rápido, el más caro, el más difícil.',
    scene: [
      ['This is the tallest building in the country.', 'Este es el edificio más alto del país.'],
      ['She\'s the best student in the class.', 'Ella es la mejor estudiante de la clase.'],
      ['That was the worst film I\'ve ever seen.', 'Esa fue la peor película que he visto.'],
      ['It\'s the most expensive restaurant in town.', 'Es el restaurante más caro de la ciudad.'],
      ['He runs the fastest on the team.', 'Él corre más rápido en el equipo.'],
      ['This is the most interesting book I\'ve read.', 'Este es el libro más interesante que he leído.'],
      ['Summer is the hottest season.', 'El verano es la estación más calurosa.'],
      ['What\'s the easiest way to get there?', '¿Cuál es la forma más fácil de llegar?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['the + -est', 'the most + adj', 'good→best, bad→worst', 'in vs of after superlative'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el superlativo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el superlativo correcto para completar cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de geografía',
            lines: [['', 'The Amazon is ___ river in the world.']],
            options: ['the longest', 'the most long', 'longer', 'most long'],
            answer: 'the longest',
            explain: '"Long" = 1 sílaba → the longest. Siempre con "the".',
          },
          {
            scene: 'En el restaurante',
            lines: [['', 'This dish is ___ on the menu.']],
            options: ['the most delicious', 'the deliciousest', 'most delicious', 'deliciouser'],
            answer: 'the most delicious',
            explain: '"Delicious" = 4 sílabas → the most delicious.',
          },
          {
            scene: 'Sobre el equipo',
            lines: [['', 'She is ___ player on the team.']],
            options: ['the best', 'the most good', 'the goodest', 'most good'],
            answer: 'the best',
            explain: '"Good" → irregular: the best.',
          },
          {
            scene: 'Hablando del tráfico',
            lines: [['', 'Monday morning is ___ time to travel in this city.']],
            options: ['the worst', 'the most bad', 'the baddest', 'most bad'],
            answer: 'the worst',
            explain: '"Bad" → irregular: the worst.',
          },
          {
            scene: 'Comprando tecnología',
            lines: [['', 'This is ___ laptop we have in stock.']],
            options: ['the most powerful', 'the powerfulest', 'most powerful', 'powerfullest'],
            answer: 'the most powerful',
            explain: '"Powerful" = 3 sílabas → the most powerful.',
          },
          {
            scene: 'Hablando del tiempo',
            lines: [['', 'August is usually ___ month of the year here.']],
            options: ['the hottest', 'the most hot', 'hotter', 'most hot'],
            answer: 'the hottest',
            explain: '"Hot" = CVC → duplica t + the -est: the hottest.',
          },
          {
            scene: 'En clase de idiomas',
            lines: [['', 'That exam was ___ one I\'ve ever taken.']],
            options: ['the most difficult', 'the difficultest', 'most difficult', 'difficultness'],
            answer: 'the most difficult',
            explain: '"Difficult" = 3 sílabas → the most difficult.',
          },
          {
            scene: 'Hablando de amigos',
            lines: [['', 'She\'s ___ person I know — she always makes me laugh.']],
            options: ['the funniest', 'the most funny', 'funniest', 'most funniest'],
            answer: 'the funniest',
            explain: '"Funny" termina en -y → the funniest.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Superlativo y preposición',
        tag: '2 espacios',
        intro: 'Completa con el superlativo correcto y la preposición (in/of).',
        type: 'dual',
        items: [
          {
            scene: 'Geografía del mundo',
            lines: [['', 'Mount Everest is [[0]] mountain [[1]] the world.']],
            blanks: [
              { options: ['the highest', 'the most high', 'highest', 'the tallest'], answer: 'the highest', explain: '"High" → the highest. (Se usa "highest" para montañas/altitud).' },
              { options: ['in', 'of', 'at', 'on'], answer: 'in', explain: '"In the world" — se usa "in" con lugares.' },
            ],
          },
          {
            scene: 'Reflexión personal',
            lines: [['', 'That trip to Colombia was [[0]] experience [[1]] my life.']],
            blanks: [
              { options: ['the most memorable', 'the memorablest', 'most memorable', 'memorabler'], answer: 'the most memorable', explain: '"Memorable" = 4 sílabas → the most memorable.' },
              { options: ['of', 'in', 'at', 'for'], answer: 'of', explain: '"Of my life" — se usa "of" con períodos/conjuntos.' },
            ],
          },
          {
            scene: 'Hablando de una película',
            lines: [['', 'It was [[0]] film I\'ve ever seen — [[1]] cast, [[1]] story!']],
            blanks: [
              { options: ['the best', 'the most good', 'the goodest', 'better'], answer: 'the best', explain: '"Good" → the best.' },
              { options: ['the best', 'better', 'good', 'the most good'], answer: 'the best', explain: 'Superlativo de "good": the best.' },
            ],
          },
          {
            scene: 'Opinión sobre la clase',
            lines: [['', 'Grammar is [[0]] subject [[1]] the course for me.']],
            blanks: [
              { options: ['the most interesting', 'the interestingest', 'most interesting', 'interestingst'], answer: 'the most interesting', explain: '"Interesting" = 4 sílabas → the most interesting.' },
              { options: ['in', 'of', 'at', 'on'], answer: 'in', explain: '"In the course" — lugar/grupo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El viaje soñado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los superlativos correctos.',
        type: 'guidedText',
        scene: 'Completa el texto con los superlativos correctos.',
        text: 'My trip to Japan was [[0]] (amazing) experience of my life. Tokyo is [[1]] (big) city I\'ve ever visited — it\'s [[2]] (busy) place I\'ve ever seen! The food was [[3]] (delicious) in the world, without a doubt. The people were [[4]] (kind) and patient. The prices in some areas were [[5]] (high) I expected, but the experience was [[6]] (good) I could imagine.',
        blanks: [
          { options: ['the most amazing', 'the amazingest', 'most amazing', 'amazingest'], answer: 'the most amazing', explain: '"Amazing" = 3 sílabas → the most amazing.' },
          { options: ['the biggest', 'the most big', 'biggest', 'most big'], answer: 'the biggest', explain: '"Big" → CVC → the biggest.' },
          { options: ['the busiest', 'the most busy', 'busiest', 'most busy'], answer: 'the busiest', explain: '"Busy" → -iest: the busiest.' },
          { options: ['the most delicious', 'the deliciousest', 'most delicious', 'deliciousest'], answer: 'the most delicious', explain: '"Delicious" → the most delicious.' },
          { options: ['the kindest', 'the most kind', 'kindest', 'kinder'], answer: 'the kindest', explain: '"Kind" = 1 sílaba → the kindest.' },
          { options: ['higher than', 'the highest', 'most high', 'higher'], answer: 'higher than', explain: 'Aquí hay una comparación con "than" → comparativo "higher than", no superlativo.' },
          { options: ['the best', 'the goodest', 'most good', 'the most good'], answer: 'the best', explain: '"Good" → irregular superlativo: the best.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el superlativo',
        tag: 'Texto libre',
        intro: 'Escribe el superlativo del adjetivo entre paréntesis.',
        type: 'freeText',
        scene: 'Escribe el superlativo del adjetivo entre paréntesis.',
        text: 'In my opinion, English is [[0]] (important) language to learn today. It\'s not [[1]] (difficult) language — Chinese or Arabic are probably harder. But it\'s [[2]] (useful) for international communication. Grammar can be tricky, but vocabulary is [[3]] (easy) part. With consistent practice, I think [[4]] (good) method is to use the language every day.',
        blanks: [
          { answer: 'the most important', accepted: ['the most important'], explain: '"Important" → the most important.' },
          { answer: 'the most difficult', accepted: ['the most difficult'], explain: '"Difficult" → the most difficult.' },
          { answer: 'the most useful', accepted: ['the most useful'], explain: '"Useful" = 2 sílabas → the most useful.' },
          { answer: 'the easiest', accepted: ['the easiest'], explain: '"Easy" → the easiest.' },
          { answer: 'the best', accepted: ['the best'], explain: '"Good" → the best (irregular).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones superlativas sobre tu mundo y experiencias.',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad o país',
            prompt: 'Escribe algo sobre tu ciudad usando un superlativo (the most... / the -est).',
            answer: 'The old city center is the most beautiful area in my city.',
            accepted: ['the most', 'the biggest', 'the best', 'the oldest', 'the tallest', 'the busiest', 'the most popular', 'the most beautiful', 'the loudest'],
            explain: 'Ejemplo: My city has the best food in the country. / It\'s the most crowded city I know.',
          },
          {
            scene: 'Tu favorito',
            prompt: 'Describe tu mejor experiencia usando "the best... I\'ve ever..."',
            answer: 'That concert was the best night I\'ve ever had.',
            accepted: ['the best', 'the most amazing', 'the most exciting', 'the most unforgettable', 'the most incredible'],
            explain: 'Ejemplo: It was the best trip I\'ve ever taken. / That was the most delicious meal I\'ve ever eaten.',
          },
          {
            scene: 'Lo peor',
            prompt: 'Describe algo negativo usando "the worst" o "the most boring/difficult".',
            answer: 'That was the worst film I\'ve seen this year.',
            accepted: ['the worst', 'the most boring', 'the most difficult', 'the hardest', 'the most stressful', 'the least interesting'],
            explain: 'Ejemplo: Monday mornings are the worst! / That exam was the most difficult I\'ve taken.',
          },
          {
            scene: 'Una persona que admiras',
            prompt: 'Describe a alguien que conoces con un superlativo (persona más generosa, divertida, inteligente...).',
            answer: 'My grandmother is the most generous person I know.',
            accepted: ['the most generous', 'the funniest', 'the smartest', 'the most intelligent', 'the kindest', 'the most creative', 'the best', 'the most hardworking'],
            explain: 'Ejemplo: She\'s the kindest person I\'ve ever met. / He\'s the funniest person in our group.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Los récords de tu vida',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre tus "récords personales" usando superlativos.',
        type: 'write',
        items: [
          {
            scene: 'Tu récord personal',
            prompt: 'Escribe "the best + sustantivo + I\'ve ever + verbo" para tu mejor experiencia.',
            answer: 'The best meal I\'ve ever eaten was at my aunt\'s house last Christmas.',
            accepted: ['the best', 'the most amazing', 'the most exciting', 'the most incredible', 'the most unforgettable'],
            explain: 'Ejemplo: The best book I\'ve ever read is… / The best trip I\'ve ever taken was to…',
          },
          {
            scene: 'Tu récord personal',
            prompt: 'Escribe sobre la persona más interesante o impresionante que hayas conocido.',
            answer: 'The most interesting person I\'ve ever met was a professor who spoke 7 languages.',
            accepted: ['the most interesting', 'the most impressive', 'the most inspiring', 'the kindest', 'the funniest', 'the most intelligent', 'the most talented'],
            explain: 'Ejemplo: The most inspiring person I know is… / The funniest person I\'ve ever met…',
          },
          {
            scene: 'Tu récord personal',
            prompt: 'Escribe sobre el lugar más memorable que hayas visitado.',
            answer: 'The most beautiful place I\'ve ever visited is the Caribbean coast.',
            accepted: ['the most beautiful', 'the most amazing', 'the most crowded', 'the most peaceful', 'the biggest', 'the strangest', 'the most exciting', 'the most relaxing'],
            explain: 'Ejemplo: The most memorable place I\'ve visited is… / The strangest city I\'ve been to was…',
          },
        ],
      },
    ],
  },
}

export default topic
