import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'comparison-adjectives-adverbs-b1',
  order: '13',
  color: '#dc2626',
  category: 'Grammar',
  level: 'B1',
  title: 'Comparativos y Superlativos en Inglés B1',
  shortTitle: 'Comparativos y Superlativos',
  metaTitle: 'Comparativos y Superlativos B1 — Comparar adjetivos y adverbios en inglés',
  description:
    'En B1 debes comparar personas, lugares, ideas y acciones con precisión: más alto que, el más interesante, tan rápido como. Aprende las formas comparativas y superlativas regulares e irregulares, y las estructuras especiales para escribir y hablar con fluidez.',
  lead: 'Aprende a comparar con precisión usando comparativos y superlativos en inglés B1.',
  outcomes: [
    'Formas comparativos con -er + than y more + adjetivo + than correctamente',
    'Formas superlativos con -est y most + adjetivo con the',
    'Usas formas irregulares: good/better/best, bad/worse/worst, far/further/furthest',
    'Aplicas as...as, not as...as, y la doble comparativa (the more...the more)',
  ],

  guide: {
    goal: 'Comparar personas, objetos y acciones usando la forma comparativa o superlativa adecuada.',
    model: 'Spanish is easier than Russian. / English is the most widely spoken language. / The more you practise, the better you get.',
    formula: 'short adj + -er + than / more + long adj + than / the + adj + -est / the most + adj',
    decisions: [
      'Adjetivos cortos (1 sílaba): add -er/-est → tall → taller → tallest; fast → faster → fastest',
      'Adjetivos terminados en -y: y → ier/-iest → happy → happier → happiest',
      'Adjetivos largos (2+ sílabas): more/most → interesting → more interesting → most interesting',
      'Irregulares: good → better → best; bad → worse → worst; far → further → furthest; little → less → least',
      'as + adj/adv + as = igual que: "Spanish is as beautiful as Italian."',
      'not as + adj + as = menos que: "English is not as difficult as Chinese."',
      'the + comparative, the + comparative = doble comparativa: "The more you read, the more you learn."',
    ],
    table: [
      ['Tipo', 'Comparativo', 'Superlativo'],
      ['Corto (1 sílaba)', 'tall → taller than', 'the tallest'],
      ['Largo (2+ sílabas)', 'interesting → more interesting', 'the most interesting'],
    ],
    mistakes: [
      '"more taller" ❌ → "taller" ✓ — nunca uses more con adjetivos cortos que ya tienen -er.',
      '"the most good" ❌ → "the best" ✓ — good es irregular: good/better/best.',
      '"She is more tall than him." ❌ → "She is taller than him." ✓ — tall es adjetivo corto: usa -er.',
    ],
  },

  seo: [
    {
      heading: 'Comparativos en inglés: reglas esenciales para B1',
      paragraphs: [
        'Para comparar dos cosas en inglés B1, la forma del comparativo depende del número de sílabas del adjetivo. Adjetivos de una sílaba: añade -er + than (tall → taller than, fast → faster than, old → older than). Adjetivos de dos o más sílabas: usa more + adjetivo + than (interesting → more interesting than, expensive → more expensive than).',
        'Excepción importante: adjetivos de dos sílabas terminados en -y cambian la y por ier: happy → happier, funny → funnier, busy → busier. Los adjetivos de dos sílabas como quiet, clever, simple también pueden usar -er aunque también aceptan more.',
      ],
      table: [
        ['Adjetivo', 'Comparativo', 'Ejemplo'],
        ['tall', 'taller than', 'Gael is taller than his brother.'],
        ['happy', 'happier than', 'She is happier than before.'],
        ['expensive', 'more expensive than', 'Seoul is more expensive than Bucaramanga.'],
        ['interesting', 'more interesting than', 'Korean is more interesting than I expected.'],
      ],
    },
    {
      heading: 'Superlativos en inglés: el mejor, el más grande',
      paragraphs: [
        'El superlativo expresa el grado más alto dentro de un grupo y siempre va precedido de the. Adjetivos cortos: the + adjetivo + -est (the tallest, the fastest, the oldest). Adjetivos largos: the most + adjetivo (the most interesting, the most expensive, the most difficult).',
        'El superlativo suele ir seguido de in + lugar o grupo (the best student in the class, the most visited city in Colombia) o de of + grupo (the worst day of the year, the most important lesson of all).',
      ],
    },
    {
      heading: 'Formas irregulares: las más importantes',
      paragraphs: [
        'Estos adjetivos y adverbios son completamente irregulares: good (adjetivo) / well (adverbio) → better → the best. Bad / badly → worse → the worst. Far → further / farther → the furthest / farthest. Little → less → the least. Much/many → more → the most.',
        'Ejemplos: "My English is getting better every week." / "This is the worst traffic I have ever seen." / "The furthest I have ever travelled is Japan." / "We need to use less plastic." / "He has the most experience in the team."',
      ],
    },
    {
      heading: 'As...as, not as...as y la doble comparativa',
      paragraphs: [
        'Para expresar igualdad usa as + adjetivo/adverbio + as: "French is as romantic as Italian." / "He speaks as fluently as a native." Para expresar que algo es menos que otra cosa: not as + adjetivo + as: "My city is not as big as Bogotá." Esta estructura es más natural que "less + adjective + than" en inglés conversacional.',
        'La doble comparativa expresa que dos cosas cambian juntas: the + comparativo, the + comparativo. "The more you practise, the better you get." / "The harder you study, the faster you progress." / "The more time you invest in speaking, the more confident you become." Es una estructura muy valorada en IELTS Writing.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Comparativos y superlativos regulares e irregulares con estructuras as...as y doble comparativa.',
    graphicPrompt: 'Tres columnas: forma base, comparativo y superlativo, con ejemplos visuales de altura/tamaño.',
    scene: [
      ['Korean is harder than French, but it is more rewarding.', 'El coreano es más difícil que el francés, pero más gratificante.'],
      ['The IELTS is the most important exam for studying abroad.', 'El IELTS es el examen más importante para estudiar en el extranjero.'],
      ['Bogotá is bigger than Bucaramanga, but not as big as Sao Paulo.', 'Bogotá es más grande que Bucaramanga, pero no tan grande como Sao Paulo.'],
      ['My English is getting better and better every month.', 'Mi inglés está mejorando cada vez más cada mes.'],
      ['The more you speak, the more confident you become.', 'Cuanto más hablas, más confianza ganas.'],
      ['This year was worse than the last one for the economy.', 'Este año fue peor que el anterior para la economía.'],
      ['She works harder than anyone else in the office.', 'Ella trabaja más duro que cualquier otra persona en la oficina.'],
      ['Spanish grammar is not as complex as Russian grammar.', 'La gramática española no es tan compleja como la rusa.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['compare', 'describe', 'rank', 'evaluate'],
    reviewFocus: ['comparative with -er/more', 'superlative with -est/most', 'irregular forms', 'as...as', 'double comparative'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona el comparativo o superlativo correcto para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Comparando ciudades',
            lines: [['', 'Seoul is ___ than Bucaramanga.']],
            options: ['more expensive', 'expensiver', 'the most expensive', 'most expensive'],
            answer: 'more expensive',
            explain: '"expensive" tiene 3 sílabas → comparativo con more: more expensive than.',
          },
          {
            scene: 'El mejor estudiante',
            lines: [['', 'She is ___ student in the entire school.']],
            options: ['the best', 'the most good', 'better', 'the goodest'],
            answer: 'the best',
            explain: '"good" es irregular: good → better → the best. Nunca "most good" ni "goodest".',
          },
          {
            scene: 'Dos idiomas',
            lines: [['', 'Chinese is ___ Korean for Spanish speakers.']],
            options: ['harder than', 'more hard than', 'hardest than', 'the hardest than'],
            answer: 'harder than',
            explain: '"hard" tiene 1 sílaba → comparativo con -er: harder than. No uses "more hard".',
          },
          {
            scene: 'Igualdad',
            lines: [['', 'Portuguese is ___ beautiful ___ Spanish.']],
            options: ['as / as', 'more / than', 'so / as', 'the most / of'],
            answer: 'as / as',
            explain: 'Para igualdad entre dos cosas: as + adjetivo + as: "as beautiful as".',
          },
          {
            scene: 'El peor día',
            lines: [['', 'That was ___ day of my entire trip!']],
            options: ['the worst', 'the most bad', 'the worse', 'the most badly'],
            answer: 'the worst',
            explain: '"bad" es irregular: bad → worse → the worst. El superlativo es "the worst".',
          },
          {
            scene: 'Progreso',
            lines: [['', '___ you practise, ___ you improve.']],
            options: ['The more / the more', 'More / more', 'The most / the most', 'More / the more'],
            answer: 'The more / the more',
            explain: 'Doble comparativa: the + comparativo, the + comparativo. "The more...the more."',
          },
          {
            scene: 'Comparando métodos',
            lines: [['', 'Watching series in English is ___ than reading textbooks.']],
            options: ['more enjoyable', 'enjoyabler', 'more enjoyably', 'the most enjoyable'],
            answer: 'more enjoyable',
            explain: '"enjoyable" tiene 4 sílabas → comparativo con more. Es adjetivo, no adverbio.',
          },
          {
            scene: 'La distancia',
            lines: [['', 'The airport is ___ from here than I thought.']],
            options: ['further', 'farther', 'more far', 'farer'],
            answer: 'further',
            explain: '"far" es irregular: far → further/farther → furthest/farthest. Both further/farther are accepted.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Completa la comparación',
        tag: '2 espacios',
        intro: 'Completa con la forma comparativa o superlativa correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Comparando idiomas',
            lines: [['', 'Japanese is [[0]] (difficult) than Korean, but Korean is [[1]] (complex) language I have studied.']],
            blanks: [
              { options: ['more difficult', 'difficulter', 'the most difficult', 'most difficult'], answer: 'more difficult', explain: '"difficult" (3 sílabas) → comparativo: more difficult than.' },
              { options: ['the most complex', 'more complex', 'complexer', 'the more complex'], answer: 'the most complex', explain: 'Superlativo con the: "the most complex language I have studied".' },
            ],
          },
          {
            scene: 'Estilo de vida',
            lines: [['', 'Living in the countryside is [[0]] (peaceful) than the city, but the city has [[1]] (good) job opportunities.']],
            blanks: [
              { options: ['more peaceful', 'peacefuler', 'the most peaceful', 'peaceafuller'], answer: 'more peaceful', explain: '"peaceful" (3 sílabas) → more peaceful than.' },
              { options: ['the best', 'the most good', 'better', 'the goodest'], answer: 'the best', explain: '"good" irregular: the best job opportunities. Superlativo de "good".' },
            ],
          },
          {
            scene: 'En la tienda',
            lines: [['', 'This jacket is [[0]] (expensive) one in the store, but the [[1]] (cheap) one is also good quality.']],
            blanks: [
              { options: ['the most expensive', 'more expensive', 'expensivest', 'most expensive'], answer: 'the most expensive', explain: 'Superlativo: the most expensive (3 sílabas). Necesita "the".' },
              { options: ['cheapest', 'most cheap', 'cheaper', 'more cheap'], answer: 'cheapest', explain: '"cheap" (1 sílaba) → superlativo: the cheapest. Sin "most".' },
            ],
          },
          {
            scene: 'Motivación para estudiar',
            lines: [['', 'The [[0]] (hard) you study, the [[1]] (fast) you will reach your goal.']],
            blanks: [
              { options: ['harder', 'hardest', 'more hard', 'the harder'], answer: 'harder', explain: 'Doble comparativa: the + comparativo → the harder. (No "the hardest" aquí).' },
              { options: ['faster', 'fastest', 'more fast', 'the fastest'], answer: 'faster', explain: 'Doble comparativa: the + comparativo → the faster you will reach.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Comparando ciudades colombianas',
        tag: 'Texto guiado',
        intro: 'Completa el texto comparando ciudades de Colombia y el mundo.',
        type: 'guidedText',
        scene: 'Completa con la forma comparativa o superlativa correcta.',
        text: 'Colombia is one of [[0]] (biodiverse) countries in the world. Bogotá is [[1]] (large) city in Colombia, with a population of over eight million. Medellín is [[2]] (small) than Bogotá, but many people say it is [[3]] (innovative) city in Latin America. The weather in Cali is [[4]] (warm) than in Bogotá, which is much [[5]] (cold) because of its altitude. As cities grow [[6]] (fast), the demand for public transport becomes [[7]] (high).',
        blanks: [
          { options: ['the most biodiverse', 'more biodiverse', 'the biodiverse', 'most biodiverse'], answer: 'the most biodiverse', explain: 'Superlativo: the most biodiverse (4 sílabas). Con "one of the most...".' },
          { options: ['the largest', 'larger', 'the most large', 'most large'], answer: 'the largest', explain: '"large" (1 sílaba) → superlativo: the largest. Con "the" obligatoriamente.' },
          { options: ['smaller', 'more small', 'the smallest', 'smallest'], answer: 'smaller', explain: '"small" (1 sílaba) → comparativo: smaller than.' },
          { options: ['the most innovative', 'the innovativest', 'more innovative', 'most innovative'], answer: 'the most innovative', explain: '"innovative" (4 sílabas) → superlativo: the most innovative.' },
          { options: ['warmer', 'more warm', 'warmest', 'the warmest'], answer: 'warmer', explain: '"warm" (1 sílaba) → comparativo: warmer than.' },
          { options: ['colder', 'more cold', 'coldest', 'more colder'], answer: 'colder', explain: '"cold" (1 sílaba) → comparativo: colder (than Medellín).' },
          { options: ['faster', 'more fast', 'fastest', 'the fastest'], answer: 'faster', explain: 'Doble comparativa: the faster...the higher → "as cities grow faster".' },
          { options: ['higher', 'more high', 'highest', 'the highest'], answer: 'higher', explain: '"high" (1 sílaba) → comparativo: higher. Doble comparativa implícita.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma correcta',
        tag: 'Texto libre',
        intro: 'Escribe la forma comparativa o superlativa del adjetivo entre paréntesis.',
        type: 'freeText',
        scene: 'Completa el texto con la forma correcta del adjetivo.',
        text: 'In my opinion, learning English is [[0]] (important) skill you can develop today. It is [[1]] (easy) to find work internationally if you speak English. However, many people find it [[2]] (difficult) than they expected. The [[3]] (good) way to improve is to practise every day. Online courses are often [[4]] (affordable) than private tutoring.',
        blanks: [
          { answer: 'the most important', accepted: ['the most important'], explain: 'Superlativo: the most important skill (5 sílabas, más más). Con "the".' },
          { answer: 'easier', accepted: ['easier'], explain: '"easy" (2 sílabas, -y) → comparativo: easier (y→ier).' },
          { answer: 'more difficult', accepted: ['more difficult'], explain: '"difficult" (3 sílabas) → comparativo: more difficult than.' },
          { answer: 'best', accepted: ['the best', 'best'], explain: '"good" irregular → superlativo: the best way.' },
          { answer: 'more affordable', accepted: ['more affordable'], explain: '"affordable" (3 sílabas) → comparativo: more affordable than.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones comparativas o superlativas sobre los temas indicados.',
        type: 'write',
        items: [
          {
            scene: 'Dos idiomas',
            prompt: 'Compara dos idiomas que conoces usando un comparativo (... is more/less ... than ... / ... is -er than ...).',
            answer: 'English is easier than Chinese for Spanish speakers.',
            accepted: ['is easier than', 'is harder than', 'is more difficult than', 'is more interesting than', 'is less complex than', 'is more similar to'],
            explain: 'Usa: [Idioma A] is [comparativo] than [Idioma B]. Ejemplo: Korean is more challenging than French.',
          },
          {
            scene: 'La mejor experiencia',
            prompt: 'Describe la experiencia más emocionante de tu vida con un superlativo (... was the most/the -est ...).',
            answer: 'Visiting Cartagena was the most exciting trip of my life.',
            accepted: ['the most exciting', 'the best', 'the most amazing', 'the most memorable', 'the most incredible', 'the most important', 'the funniest'],
            explain: 'Usa: [experiencia] was the most [adjetivo] / the [superlativo] of my life.',
          },
          {
            scene: 'Igual que',
            prompt: 'Escribe una oración de igualdad usando as...as comparando dos personas, ciudades o cosas.',
            answer: 'My city is not as expensive as Bogotá, but it is as beautiful.',
            accepted: ['as beautiful as', 'as expensive as', 'as interesting as', 'as good as', 'as fast as', 'as important as', 'as difficult as'],
            explain: 'Estructura de igualdad: as + adjetivo + as. Negación: not as + adjetivo + as.',
          },
          {
            scene: 'Motivación',
            prompt: 'Escribe una frase de motivación para estudiantes de idiomas usando la doble comparativa (the more...the more).',
            answer: 'The more you practise speaking, the more confident you become.',
            accepted: ['the more you practise', 'the more you study', 'the more you read', 'the more you listen', 'the harder you work', 'the more effort you make'],
            explain: 'Doble comparativa: the + comparativo, the + comparativo. Expresa relación proporcional.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Describe tu idioma favorito',
        tag: 'Producción libre',
        intro: 'Escribe sobre tus idiomas usando comparativos y superlativos.',
        type: 'write',
        items: [
          {
            scene: 'Tu idioma favorito',
            prompt: 'Compara el inglés con otro idioma que conoces o que te interesa aprender (usa 2 comparativos).',
            answer: 'English is easier to pronounce than French, but French has a more elegant sound.',
            accepted: ['easier than', 'harder than', 'more interesting than', 'more useful than', 'more difficult than', 'more similar to spanish than'],
            explain: 'Usa dos comparativos diferentes para hacer la comparación más rica.',
          },
          {
            scene: 'El mejor recurso',
            prompt: 'Describe el mejor recurso o método que has usado para aprender inglés (superlativo).',
            answer: 'The most effective method for me has been watching series in English with subtitles.',
            accepted: ['the most effective', 'the best', 'the most useful', 'the most enjoyable', 'the most helpful', 'the easiest', 'the most interesting'],
            explain: 'Usa un superlativo para describir el mejor/más método que conoces.',
          },
          {
            scene: 'Una verdad de aprendizaje',
            prompt: 'Escribe una frase motivadora sobre el aprendizaje de idiomas usando the more...the more/better.',
            answer: 'The more mistakes you make, the faster you learn.',
            accepted: ['the more', 'the better', 'the faster', 'the easier', 'the harder', 'the more confident'],
            explain: 'Doble comparativa: the + comparativo, the + comparativo. Muestra causa y efecto.',
          },
        ],
      },
    ],
  },
}

export default topic
