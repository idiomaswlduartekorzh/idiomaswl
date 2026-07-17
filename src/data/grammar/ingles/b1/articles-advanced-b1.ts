import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'articles-advanced-b1',
  order: '15',
  color: '#dc2626',
  category: 'Grammar',
  level: 'B1',
  title: 'Artículos en Inglés B1 (Nivel Avanzado)',
  shortTitle: 'Artículos Avanzados',
  metaTitle: 'Artículos en Inglés B1 — A, an, the y artículo cero: reglas avanzadas',
  description:
    'En B1 los artículos van más allá de "a" para primera mención y "the" para menciones siguientes. Debes dominar el artículo cero con generalizaciones, nombres propios y expresiones fijas, y el uso de "the" con geografía, superlativos y referencias únicas. Clave para IELTS y Cambridge.',
  lead: 'Domina las reglas avanzadas de a/an, the y artículo cero para escribir y hablar con precisión en inglés B1.',
  outcomes: [
    'Usas artículo cero para generalizaciones con sustantivos incontables y contables en plural',
    'Conoces las reglas de "the" con geografía: océanos/ríos sí, países/ciudades/montañas generalmente no',
    'Evitas errores frecuentes: the + idiomas, the + meals, the + sports',
    'Aplicas a/an para primera mención y the para referencia específica o única',
  ],

  guide: {
    goal: 'Elegir entre a/an, the y artículo cero según la especificidad, unicidad y tipo de sustantivo.',
    model: 'I love music. / The music at the party was amazing. / I go to school by bus. / The school near my house is excellent.',
    formula: 'Zero article: generalizations, meals, sports, languages / The: specific, unique, second mention / A/an: first mention, one of many',
    decisions: [
      'Artículo cero + generalización (plural o incontable): "Dogs are loyal animals." / "Knowledge is power." / "I like music."',
      'A/an: primera mención, sustantivo singular contable, "uno entre varios": "I saw a dog in the park."',
      'The: referencia específica, segunda mención, única en el contexto: "The dog was brown." / "The sun is hot."',
      'The + geografía: océanos (the Pacific), ríos (the Amazon), mares (the Mediterranean), cordilleras (the Andes); NO the con países (Colombia, France), ciudades (Bogotá, Paris), montañas individuales (Mount Everest)',
      'Artículo cero con: idiomas (speak English, not the English), comidas (have breakfast, not the breakfast), deportes (play football, not the football), materias escolares (study mathematics)',
      'The + superlativos: the best, the most interesting / The + ordinales: the first, the second',
    ],
    table: [
      ['Artículo', 'Uso principal', 'Ejemplo'],
      ['a / an', 'Primera mención / uno entre varios', 'I bought a new phone.'],
      ['the', 'Referencia específica / única / segunda mención', 'The phone I bought is great.'],
    ],
    mistakes: [
      '"I speak the English." ❌ → "I speak English." ✓ — artículo cero con idiomas.',
      '"She went to the school." ❌ (si se refiere a ir a estudiar) → "She went to school." ✓ — expresiones fijas sin artículo.',
      '"The Colombia is beautiful." ❌ → "Colombia is beautiful." ✓ — artículo cero con nombres de países.',
    ],
  },

  seo: [
    {
      heading: 'El artículo cero: cuando no se usa ningún artículo',
      paragraphs: [
        'El artículo cero (zero article) ocurre cuando no se pone ningún artículo. Se usa con: (1) generalizaciones con sustantivos contables en plural: "Cats are independent animals." (los gatos en general); (2) sustantivos incontables en general: "Water is essential for life." / "I love music."; (3) nombres propios: nombres de personas, países (Colombia, France), ciudades, continentes.',
        'También artículo cero con: idiomas (I speak Spanish, not I speak the Spanish), comidas cuando se habla del hábito (I have breakfast at 7 am, not I have the breakfast), deportes y actividades (she plays basketball, he goes swimming), materias académicas (study history, learn mathematics).',
      ],
      table: [
        ['Categoría', 'Artículo cero (✓)', 'Con artículo (✗)'],
        ['Idiomas', 'speak English', 'speak the English'],
        ['Comidas (hábito)', 'have lunch', 'have the lunch'],
        ['Deportes', 'play tennis', 'play the tennis'],
        ['Países', 'visit Colombia', 'visit the Colombia'],
      ],
    },
    {
      heading: 'The con geografía: las reglas de los mapas',
      paragraphs: [
        'El artículo "the" se usa con: océanos y mares (the Atlantic, the Pacific, the Mediterranean), ríos (the Amazon, the Thames, the Nile), cordilleras y cadenas de montañas (the Andes, the Alps, the Himalayas), grupos de islas (the Canary Islands), desiertos (the Sahara), países con "republic", "kingdom", "states" en su nombre (the United States, the United Kingdom, the Dominican Republic).',
        'NO se usa "the" con: países en general (Colombia, France, Japan — excepto los mencionados arriba), ciudades (Bogotá, Paris, Tokyo), montañas individuales (Mount Everest, Mount Kilimanjaro), lagos individuales (Lake Titicaca, Lake Superior), continentes (South America, Europe, Asia).',
      ],
    },
    {
      heading: 'A/an para primera mención, the para referencia conocida',
      paragraphs: [
        'La regla base de los artículos: usa a/an la primera vez que mencionas algo (porque el oyente no sabe a cuál te refieres). Usa the cuando el oyente ya sabe de qué hablas — por haber sido mencionado antes, por ser único en el contexto, o por ser la única cosa de su tipo.',
        'Ejemplo clásico: "I saw a man in the street. The man was wearing a red coat. The coat looked very expensive." Primera mención: a man, a red coat. Segunda mención (ya conocido): the man, the coat. Único en el mundo: the sun, the moon, the internet, the government.',
      ],
    },
    {
      heading: 'Expresiones fijas sin artículo y con artículo',
      paragraphs: [
        'Algunas expresiones tienen artículo cero aunque podrían parecer necesitar artículo: go to school/university/hospital/church/prison (la función, no el edificio). "She went to hospital" (fue al hospital como paciente) vs "She went to the hospital" (fue al edificio del hospital, quizás a visitar a alguien).',
        'Con "the": play + instrumento (she plays the piano, he plays the guitar — a diferencia de sports). The + superlativo: the best, the most interesting, the tallest. The + ordinales: the first chapter, the second floor, the last bus.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Artículos a/an, the y cero con generalizaciones, geografía, y expresiones fijas.',
    graphicPrompt: 'Tres cajas etiquetadas: A/AN, THE, ZERO — con ejemplos de sustantivos en cada categoría.',
    scene: [
      ['She plays the piano and speaks English fluently.', 'Ella toca el piano y habla inglés con fluidez.'],
      ['The Amazon is the longest river in South America.', 'El Amazonas es el río más largo de América del Sur.'],
      ['I usually have breakfast at home before going to university.', 'Generalmente desayuno en casa antes de ir a la universidad.'],
      ['He saw a documentary about the Andes last night.', 'Vio un documental sobre los Andes anoche.'],
      ['Tigers are endangered animals that live in Asia.', 'Los tigres son animales en peligro de extinción que viven en Asia.'],
      ['The best way to learn a language is to use it every day.', 'La mejor manera de aprender un idioma es usarlo todos los días.'],
      ['Colombia is located in the north of South America.', 'Colombia está ubicada en el norte de América del Sur.'],
      ['I went to hospital last week — I am much better now.', 'Fui al hospital la semana pasada — ahora estoy mucho mejor.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['zero article + generalizations', 'the + unique/specific', 'a/an + first mention', 'the + geography rules', 'fixed expressions'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el artículo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo correcto (a, an, the, o --  para artículo cero).',
        type: 'choice',
        items: [
          {
            scene: 'Idioma favorito',
            lines: [['', 'I have been studying ___ Korean for two years now.']],
            options: ['--', 'the', 'a', 'an'],
            answer: '--',
            explain: 'Artículo cero con idiomas: "I study Korean" (no "the Korean"). Regla fija.',
          },
          {
            scene: 'Geografía',
            lines: [['', '___ Pacific Ocean is the largest ocean in the world.']],
            options: ['The', 'A', '--', 'An'],
            answer: 'The',
            explain: 'Océanos siempre llevan "the": the Pacific Ocean, the Atlantic, the Mediterranean.',
          },
          {
            scene: 'Un descubrimiento',
            lines: [['', 'She found ___ interesting article about language learning.']],
            options: ['an', 'the', 'a', '--'],
            answer: 'an',
            explain: 'Primera mención de un artículo (no específico) → a/an. "an" porque "interesting" empieza con vocal.',
          },
          {
            scene: 'Cotidianidad',
            lines: [['', 'Most people in Colombia have ___ lunch between 12 and 2 pm.']],
            options: ['--', 'the', 'a', 'an'],
            answer: '--',
            explain: 'Artículo cero con comidas cuando se habla del hábito/costumbre: have lunch, have dinner.',
          },
          {
            scene: 'El mejor',
            lines: [['', 'What is ___ best way to prepare for the IELTS exam?']],
            options: ['the', 'a', 'an', '--'],
            answer: 'the',
            explain: 'The + superlativo: "the best way". Los superlativos siempre llevan "the".',
          },
          {
            scene: 'Una ciudad',
            lines: [['', '___ Bogotá is the capital of Colombia.']],
            options: ['--', 'The', 'A', 'An'],
            answer: '--',
            explain: 'Artículo cero con nombres de ciudades: Bogotá (no "the Bogotá").',
          },
          {
            scene: 'Instrumento musical',
            lines: [['', 'David learned to play ___ guitar when he was twelve.']],
            options: ['the', 'a', 'an', '--'],
            answer: 'the',
            explain: 'Con instrumentos musicales se usa "the": play the guitar, play the piano, play the drums.',
          },
          {
            scene: 'Segunda mención',
            lines: [['', 'I ordered a coffee and a sandwich. ___ sandwich was delicious but ___ coffee was cold.']],
            options: ['The / the', 'A / a', 'The / a', 'A / the'],
            answer: 'The / the',
            explain: 'Segunda mención → the. Ya mencionamos "a sandwich" y "a coffee", ahora son conocidos: the sandwich, the coffee.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Completa con el artículo correcto',
        tag: '2 espacios',
        intro: 'Completa con a, an, the o -- (artículo cero).',
        type: 'dual',
        items: [
          {
            scene: 'Hábitos culturales',
            lines: [['', '___ football is very popular in Colombia. It is ___ sport that unites the country.']],
            blanks: [
              { options: ['--', 'The', 'A', 'An'], answer: '--', explain: 'Artículo cero con deportes en general: "Football is popular" (el deporte como concepto).' },
              { options: ['a', 'the', '--', 'an'], answer: 'a', explain: 'Primera mención de "sport" con adjetivo descriptivo → a sport (uno entre los deportes).' },
            ],
          },
          {
            scene: 'Geografía de Colombia',
            lines: [['', '___ Andes cross through Colombia from south to north. ___ Amazon rainforest covers much of the east.']],
            blanks: [
              { options: ['The', 'A', '--', 'An'], answer: 'The', explain: 'Cordilleras llevan "the": the Andes. Son una cadena de montañas, no una montaña individual.' },
              { options: ['The', 'A', '--', 'An'], answer: 'The', explain: 'Ríos y regiones geográficas conocidas llevan "the": the Amazon rainforest.' },
            ],
          },
          {
            scene: 'Una experiencia en el hospital',
            lines: [['', 'My father went to ___ hospital yesterday. ___ hospital is only five minutes from our house.']],
            blanks: [
              { options: ['--', 'the', 'a', 'an'], answer: '--', explain: 'go to hospital (sin artículo) = ir como paciente. La función importa más que el lugar.' },
              { options: ['The', 'A', '--', 'An'], answer: 'The', explain: 'Segunda mención, ya especificado: "The hospital" (el que está cerca de casa).' },
            ],
          },
          {
            scene: 'Generalización y especificación',
            lines: [['', '___ music has the power to change your mood. Have you heard ___ new album by that band?']],
            blanks: [
              { options: ['--', 'The', 'A', 'An'], answer: '--', explain: 'Artículo cero con incontables en generalización: "Music has the power..." (la música en general).' },
              { options: ['the', 'a', 'an', '--'], answer: 'the', explain: '"The new album" = específico, conocido del contexto. Hay uno específico que se está mencionando.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un blog de viajes',
        tag: 'Texto guiado',
        intro: 'Completa el extracto de blog con el artículo correcto.',
        type: 'guidedText',
        scene: 'Completa con a, an, the, o -- (artículo cero).',
        text: 'Last year I visited [[0]] Colombia for the first time. It was [[1]] incredible experience. I flew into [[2]] Bogotá, which is located on [[3]] high plateau in [[4]] Andes. [[5]] city was vibrant and full of energy. I visited [[6]] famous Gold Museum and learned about [[7]] history of the Muisca civilization.',
        blanks: [
          { options: ['--', 'the', 'a', 'an'], answer: '--', explain: 'Artículo cero con nombres de países: "visited Colombia" (no "the Colombia").' },
          { options: ['an', 'a', 'the', '--'], answer: 'an', explain: 'Primera mención de "experience" (contable, sin especificar) → an (vocal "i").' },
          { options: ['--', 'the', 'a', 'an'], answer: '--', explain: 'Artículo cero con ciudades: "flew into Bogotá" (no "the Bogotá").' },
          { options: ['a', 'the', 'an', '--'], answer: 'a', explain: 'Primera mención de "high plateau" (contable, uno entre varios) → a.' },
          { options: ['the', 'a', 'an', '--'], answer: 'the', explain: 'Cordilleras llevan "the": the Andes.' },
          { options: ['The', 'A', 'An', '--'], answer: 'The', explain: 'Segunda mención (Bogotá fue mencionada): The city = Bogotá.' },
          { options: ['the', 'a', 'an', '--'], answer: 'the', explain: '"The famous Gold Museum" = específico, único en Bogotá. The con referencias únicas.' },
          { options: ['the', 'a', 'an', '--'], answer: 'the', explain: '"The history" = historia específica de esa civilización. Referencia única y conocida.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el artículo correcto (a, an, the) o deja el espacio en blanco si no se necesita artículo.',
        type: 'freeText',
        scene: 'Escribe a, an, the, o deja en blanco para artículo cero.',
        text: 'I have always wanted to learn [[0]] Japanese. It seems like [[1]] fascinating language. Last year I bought [[2]] textbook and started studying grammar. [[3]] textbook was very helpful. I practise every morning after [[4]] breakfast.',
        blanks: [
          { answer: '--', accepted: ['', '--', 'zero'], explain: 'Artículo cero con idiomas: "learn Japanese" (no "the Japanese").' },
          { answer: 'a', accepted: ['a'], explain: 'Primera mención de "language" → a. "a fascinating language" (uno entre los idiomas).' },
          { answer: 'a', accepted: ['a'], explain: 'Primera mención de "textbook" → a. (Contable singular, primera vez que se menciona).' },
          { answer: 'The', accepted: ['The', 'the'], explain: 'Segunda mención de "textbook" → The. Ya lo mencionamos: "The textbook was helpful."' },
          { answer: '--', accepted: ['', '--'], explain: 'Artículo cero con comidas cuando se habla del hábito: "after breakfast".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Corrige los errores',
        tag: 'Producción',
        intro: 'Identifica y corrige el error de artículo en cada oración.',
        type: 'write',
        items: [
          {
            scene: 'Error con idiomas',
            prompt: 'Corrige la oración: "She has been studying the French for three years and the Spanish for one."',
            answer: 'She has been studying French for three years and Spanish for one.',
            accepted: ['studying french for', 'studying spanish for', 'french for three', 'spanish for one'],
            explain: 'Artículo cero con idiomas: studying French (no "the French"), studying Spanish (no "the Spanish").',
          },
          {
            scene: 'Error con geografía',
            prompt: 'Corrige la oración: "The Brazil is the largest country in South America. It borders the Colombia in the north."',
            answer: 'Brazil is the largest country in South America. It borders Colombia in the north.',
            accepted: ['brazil is the largest', 'borders colombia', 'brazil is', 'colombia in the north'],
            explain: 'Artículo cero con países: Brazil (no "the Brazil"), Colombia (no "the Colombia"). Excepción: países con "republic/kingdom/states".',
          },
          {
            scene: 'Error con expresiones fijas',
            prompt: 'Corrige la oración: "After the school, she goes to a home and has the dinner with her family."',
            answer: 'After school, she goes home and has dinner with her family.',
            accepted: ['after school', 'goes home', 'has dinner'],
            explain: 'Expresiones fijas: after school (no "the school"), goes home (no "a home"), has dinner (no "the dinner").',
          },
          {
            scene: 'Primera y segunda mención',
            prompt: 'Corrige la oración: "I met a interesting professor at the conference. A professor was from the Japan."',
            answer: 'I met an interesting professor at the conference. The professor was from Japan.',
            accepted: ['met an interesting', 'the professor was', 'was from japan'],
            explain: 'an (no a) antes de vocal (interesting). Segunda mención: the professor. Artículo cero con países: Japan.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Describe tu país o ciudad',
        tag: 'Producción libre',
        intro: 'Escribe sobre tu país o ciudad usando artículos correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Tu país',
            prompt: 'Escribe 2-3 oraciones describiendo tu país o Colombia usando artículo cero con el nombre del país y "the" con ríos o cordilleras si los mencionas.',
            answer: 'Colombia is a beautiful country in South America. The Andes cross through the country from south to north. The Amazon river flows through the south of Colombia.',
            accepted: ['colombia is', 'the andes', 'the amazon', 'the pacific', 'the caribbean'],
            explain: 'Artículo cero con el nombre del país. The + ríos, océanos y cordilleras. The + referencia específica.',
          },
          {
            scene: 'Una generalización',
            prompt: 'Escribe una generalización sobre los idiomas o la música usando artículo cero.',
            answer: 'Music is a universal language. People all over the world use music to express emotions.',
            accepted: ['music is', 'languages are', 'english is', 'learning languages', 'music connects'],
            explain: 'Artículo cero con incontables en generalización (music, knowledge) y con plurales genéricos (languages, people).',
          },
          {
            scene: 'Una experiencia específica',
            prompt: 'Cuéntame sobre una visita a un lugar usando a/an para primera mención y the para segunda mención.',
            answer: 'I visited a beautiful museum in Medellín last year. The museum had an amazing collection of gold artifacts. The artifacts were from pre-Columbian civilizations.',
            accepted: ['a beautiful', 'a great', 'an amazing', 'the museum', 'the collection', 'the artifacts'],
            explain: 'Primera mención (desconocido): a museum, an amazing collection. Segunda mención (conocido): the museum, the collection.',
          },
        ],
      },
    ],
  },
}

export default topic
