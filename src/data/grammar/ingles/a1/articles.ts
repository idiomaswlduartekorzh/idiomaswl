import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'articles',
  order: '03',
  color: '#b45309',
  category: 'Nouns',
  level: 'A1',
  title: 'Artículos a, an y the en inglés A1',
  shortTitle: 'Articles: a, an, the',
  metaTitle: 'Artículos en inglés A1: a, an, the | Guía para hispanohablantes',
  description: 'Aprende cuándo usar a, an o the con explicación orientada al hispanohablante, reglas para sonidos vocálicos y casos sin artículo, y práctica progresiva de 6 niveles.',
  lead: 'En español los artículos tienen género y número: el, la, los, las, un, una. En inglés son solo tres: a, an y the. Pero elegir cuál usar es una de las fuentes de error más frecuentes porque la lógica no es la misma que en español.',
  outcomes: [
    'Distinguir cuándo usar a o an según el sonido inicial de la siguiente palabra.',
    'Aplicar the cuando el oyente ya sabe a qué objeto se refiere el hablante.',
    'Reconocer los contextos donde no se usa artículo en inglés.',
  ],
  guide: {
    goal: 'Elegir a, an, the o ningún artículo con lógica clara, no por inercia del español.',
    model: 'Pregunta: ¿hablo de algo por primera vez o indefinido? → a/an. ¿Ya sé de qué hablo o es único? → the. ¿Hablo en general o de nombre propio? → sin artículo.',
    formula: 'a/an + noun (indefinite, first mention) | the + noun (definite, shared reference)',
    decisions: [
      'a → antes de sonido consonántico: a book, a university (u suena /ju/).',
      'an → antes de sonido vocálico: an apple, an hour (h muda).',
      'the → cuando el oyente sabe exactamente qué cosa: the teacher, the moon.',
      'Sin artículo → nombres propios, idiomas, materias, deportes en general.',
    ],
    table: [
      ['a', 'sonido consonántico', 'a cat, a dog, a university'],
      ['an', 'sonido vocálico', 'an egg, an hour, an umbrella'],
      ['the', 'referencia compartida o única', 'the sun, the teacher, the book I mentioned'],
      ['—', 'general / nombre propio', 'I study English. She lives in Bogotá.'],
    ],
    mistakes: [
      'Usar "the" con nombre propio: "the Colombia" → Colombia.',
      'Usar "a" antes de sonido vocálico: "a apple" → an apple.',
      'Olvidar el artículo donde el español lo exige pero el inglés no: "the music is beautiful" (en general) → Music is beautiful.',
    ],
  },
  seo: [
    {
      heading: 'Por qué los artículos en inglés confunden al hispanohablante',
      paragraphs: [
        'En español los artículos concuerdan con el género y número del sustantivo: el libro, la mesa, los niños, las casas, un perro, una silla. Esta automatización de género es tan fuerte que cuando aprendes inglés el cerebro busca ese género y no lo encuentra. En inglés no existe concordancia de género: es siempre a, an o the, sin importar si el objeto es masculino o femenino en español.',
        'Además, el inglés no usa artículo en contextos donde el español sí lo exige. Decimos La música es bonita pero en inglés general la frase es Music is beautiful, sin artículo. Por el contrario, el inglés usa artículo donde el español no lo pone: I am going to the store (voy a la tienda funciona igual). La diferencia definitiva/indefinida es la lógica que organiza el sistema inglés.',
      ],
    },
    {
      heading: 'a vs an: la regla del sonido, no de la letra',
      paragraphs: [
        'La regla es sencilla pero el error ocurre porque se aprende como regla de letra en vez de regla de sonido. a va antes de una palabra que empieza con sonido consonántico. an va antes de una palabra que empieza con sonido vocálico. El truco está en que la letra y el sonido no siempre coinciden.',
        'University empieza con la letra u, que es vocal. Pero se pronuncia /juːnɪvɜːsɪti/, que empieza con sonido /j/ (consonante). Por eso se dice a university. Hour empieza con la letra h, que es consonante. Pero en inglés la h es muda en esta palabra: se pronuncia /aʊər/, que empieza con sonido /a/ (vocal). Por eso se dice an hour. El consejo práctico: dila en voz alta antes de elegir.',
      ],
      examples: [
        ['Incorrecto', 'a apple', 'Correcto', 'an apple'],
        ['Incorrecto', 'an university', 'Correcto', 'a university'],
        ['Incorrecto', 'a hour', 'Correcto', 'an hour'],
      ],
    },
    {
      heading: 'the: cuándo el hablante y el oyente comparten la misma referencia',
      paragraphs: [
        'Se usa the cuando tanto el hablante como el oyente saben exactamente de qué objeto o persona se habla. Esto ocurre en tres situaciones principales. Primera: ya se mencionó antes. I saw a cat. The cat was black. Segunda: hay solo uno en el contexto. The teacher is in the classroom (sabemos cuál porque es la de nuestra clase). Tercera: es único en el mundo o en el contexto. The sun, the moon, the internet.',
        'Un patrón útil para A1: primera mención = a/an, segunda mención = the. I need a pen. Can you pass me the pen? La primera vez el lápiz es desconocido; la segunda vez ambos saben de cuál hablan.',
      ],
    },
    {
      heading: 'Cuándo no se usa artículo en inglés',
      paragraphs: [
        'Los contextos sin artículo más comunes en A1 son: nombres propios de personas y la mayoría de países y ciudades (David, Colombia, Bogotá, pero the United States porque "States" necesita artículo por ser plural de un nombre común), idiomas (I study English, She speaks French), materias y deportes en sentido general (I like music, He plays football), y sustantivos incontables o plurales cuando hablas en general (Water is important, Books are expensive).',
        'Una señal de alerta: si en español usas el/la/los/las con sentido general (me gusta la música, los gatos son inteligentes), en inglés probablemente no se usa artículo (I like music, Cats are smart).',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: I study the English → I study English. Los idiomas no llevan artículo. Error 2: She is a best student → She is the best student. Los superlativos van con the. Error 3: The life is short → Life is short. Cuando hablas de un concepto en general, no va the.',
        'La práctica más efectiva es leer textos cortos en inglés y subrayar cada artículo preguntándote por qué aparece ahí. Con el tiempo el oído empieza a sentir qué suena natural.',
      ],
      examples: [
        ['Incorrecto', 'She speaks the English.', 'Correcto', 'She speaks English.'],
        ['Incorrecto', 'I have a umbrella.', 'Correcto', 'I have an umbrella.'],
        ['Incorrecto', 'The sun is a star. A sun is very hot.', 'Correcto', 'The sun is a star. The sun is very hot.'],
      ],
    },
  ],
  visual: {
    mode: 'decision-tree',
    teacherLens: 'El estudiante aprende a hacer dos preguntas: ¿nueva o conocida? y ¿cuál es el sonido inicial?',
    graphicPrompt: 'Decide si la referencia es nueva, conocida o general antes de elegir el artículo.',
    scene: [['a book', 'first mention'], ['the book', 'already known'], ['books', 'in general']],
    learnerModes: ['visual: primera vs segunda mención', 'analítico: definido/indefinido', 'oral: lectura en voz alta'],
    practiceVerbs: ['Identifica', 'Clasifica', 'Completa', 'Elige', 'Corrige', 'Aplica'],
    reviewFocus: ['a vs an (sonido)', 'the (referencia compartida)', 'sin artículo (general)'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo correcto para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'En la papelería',
            lines: [['Carlos', 'I need ___ pen for my English class.']],
            options: ['a', 'an', 'the', '—'],
            answer: 'a',
            explain: 'Primera mención indefinida; pen empieza con sonido /p/ (consonante): a pen.',
          },
          {
            scene: 'Mostrando algo',
            lines: [['Ana', 'Look! I found ___ old English book in my bag.']],
            options: ['a', 'an', 'the', '—'],
            answer: 'an',
            explain: 'Old empieza con sonido /ɒ/ (vocal): an old book.',
          },
          {
            scene: 'En clase de geografía',
            lines: [['Teacher', '___ Amazon river is the longest river in South America.']],
            options: ['A', 'An', 'The', '—'],
            answer: 'The',
            explain: 'El Amazonas es único y conocido: the Amazon river.',
          },
          {
            scene: 'Hablando de idiomas',
            lines: [['Student', 'I study ___ English at WeLearn.']],
            options: ['a', 'an', 'the', '—'],
            answer: '—',
            explain: 'Los nombres de idiomas no llevan artículo en inglés.',
          },
          {
            scene: 'Segunda mención',
            lines: [['Lina', 'I have a cat.'], ['Pedro', 'What color is ___ cat?']],
            options: ['a', 'an', 'the', '—'],
            answer: 'the',
            explain: 'Ya mencionaron el gato antes; ambos saben cuál: the cat.',
          },
          {
            scene: 'Describiendo al profesor',
            lines: [['Student', 'Our teacher is ___ excellent professor.']],
            options: ['a', 'an', 'the', '—'],
            answer: 'an',
            explain: 'Excellent empieza con sonido /e/ (vocal): an excellent professor.',
          },
          {
            scene: 'Hablando en general',
            lines: [['David', '___ music makes me happy.']],
            options: ['A', 'An', 'The', '—'],
            answer: '—',
            explain: 'Música en sentido general no lleva artículo: Music makes me happy.',
          },
          {
            scene: 'En el hospital',
            lines: [['Nurse', 'There is ___ doctor waiting for you.']],
            options: ['a', 'an', 'the', '—'],
            answer: 'a',
            explain: 'Primera mención, doctor desconocido: a doctor.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos artículos en un diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos artículos en la misma situación.',
        type: 'dual',
        items: [
          {
            scene: 'Comprando en el mercado',
            lines: [['Buyer', 'I want [[0]] apple and [[1]] orange, please.']],
            blanks: [
              { options: ['a', 'an', 'the'], answer: 'an', explain: 'Apple empieza con sonido /æ/ (vocal): an apple.' },
              { options: ['a', 'an', 'the'], answer: 'an', explain: 'Orange empieza con sonido /ɒ/ (vocal): an orange.' },
            ],
          },
          {
            scene: 'Describiendo la ciudad',
            lines: [['Tourist', 'I saw [[0]] beautiful museum yesterday.'], ['Local', 'Oh, was it [[1]] history museum on the main street?']],
            blanks: [
              { options: ['a', 'an', 'the'], answer: 'a', explain: 'Primera mención; beautiful empieza con /b/ (consonante): a beautiful museum.' },
              { options: ['a', 'an', 'the'], answer: 'the', explain: 'El turista ya mencionó el museo; ambos saben cuál: the history museum.' },
            ],
          },
          {
            scene: 'En clase de inglés',
            lines: [['Teacher', 'Open [[0]] book on page ten.'], ['Student', 'Is it [[1]] exercise about verbs?']],
            blanks: [
              { options: ['a', 'an', 'the'], answer: 'the', explain: 'Todos en la clase tienen el mismo libro; referencia compartida: the book.' },
              { options: ['a', 'an', 'the'], answer: 'an', explain: 'Exercise empieza con sonido /e/ (vocal); primera mención: an exercise.' },
            ],
          },
          {
            scene: 'En la oficina',
            lines: [['Manager', 'We need [[0]] new computer.'], ['Assistant', 'I can order [[1]] one today.']],
            blanks: [
              { options: ['a', 'an', 'the'], answer: 'a', explain: 'Primera mención indefinida; new empieza con /n/ (consonante): a new computer.' },
              { options: ['a', 'an', 'the'], answer: 'the', explain: 'Already specified which one: the one (the computer mentioned).' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa el texto eligiendo a, an, the o el espacio vacío (—).',
        type: 'guidedText',
        scene: 'Día típico de un estudiante',
        text: 'Every morning I take [[0]] bus to [[1]] English school. I have [[2]] excellent teacher. [[3]] teacher is from Canada. In class we use [[4]] computer to practise. After class I go to [[5]] café near my house. I usually read [[6]] book there.',
        blanks: [
          { options: ['a', 'an', 'the', '—'], answer: 'the', explain: 'Es el autobús específico que toma cada mañana: the bus.' },
          { options: ['a', 'an', 'the', '—'], answer: 'an', explain: 'English school, primera mención; English empieza con /e/ (vocal): an English school.' },
          { options: ['a', 'an', 'the', '—'], answer: 'an', explain: 'Primera mención; excellent empieza con /e/ (vocal): an excellent teacher.' },
          { options: ['a', 'an', 'the', '—'], answer: 'The', explain: 'Segunda mención; ya sabemos cuál es el profesor: The teacher.' },
          { options: ['a', 'an', 'the', '—'], answer: 'a', explain: 'Primera mención; computer empieza con /k/ (consonante): a computer.' },
          { options: ['a', 'an', 'the', '—'], answer: 'a', explain: 'Primera mención; café empieza con /k/ (consonante): a café.' },
          { options: ['a', 'an', 'the', '—'], answer: 'a', explain: 'Primera mención genérica; book empieza con /b/ (consonante): a book.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe el artículo correcto (a, an, the o nada) sin ayuda.',
        type: 'freeText',
        scene: 'Descripción de un nuevo compañero',
        text: 'David is [[0]] new student in my class. He has [[1]] English dictionary and [[2]] notebook. [[3]] dictionary is very big. David speaks [[4]] Spanish and a little English.',
        blanks: [
          { answer: 'a', explain: 'Primera mención; new empieza con /n/ (consonante): a new student.' },
          { answer: 'an', explain: 'English empieza con /e/ (vocal): an English dictionary.' },
          { answer: 'a', explain: 'Primera mención; notebook empieza con /n/ (consonante): a notebook.' },
          { answer: 'The', accepted: ['the'], explain: 'Segunda mención; ya sabemos cuál es el diccionario: The dictionary.' },
          { answer: '—', accepted: [''], explain: 'Los idiomas no llevan artículo: Spanish.' },
        ],
      },
      {
        id: 'l5',
        title: 'Corrección de errores',
        tag: 'Producción',
        intro: 'Corrige la frase reemplazando el artículo incorrecto.',
        type: 'write',
        items: [
          {
            scene: 'Corrigiendo artículo',
            prompt: 'Corrige la frase: She is a excellent student.',
            answer: 'She is an excellent student.',
            accepted: ['she is an excellent student'],
            explain: 'Excellent empieza con sonido /e/ (vocal): an excellent.',
          },
          {
            scene: 'Quitando artículo incorrecto',
            prompt: 'Corrige la frase: I study the English every day.',
            answer: 'I study English every day.',
            accepted: ['i study english every day'],
            explain: 'Los idiomas no llevan artículo: English (sin artículo).',
          },
          {
            scene: 'Cambiando a the',
            prompt: 'Corrige la frase: I bought a book. A book is very interesting.',
            answer: 'I bought a book. The book is very interesting.',
            accepted: ['i bought a book the book is very interesting', 'i bought a book. the book is very interesting.'],
            explain: 'Segunda mención: ya sabemos cuál libro es → the book.',
          },
          {
            scene: 'Quitando artículo innecesario',
            prompt: 'Corrige la frase: The music is my passion. (Hablas de música en general.)',
            answer: 'Music is my passion.',
            accepted: ['music is my passion'],
            explain: 'En general sin artículo específico: Music (sin the).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de conversación',
        tag: 'Reto final',
        intro: 'Responde las preguntas usando el artículo apropiado.',
        type: 'write',
        items: [
          {
            scene: 'Hablando de tu trabajo',
            prompt: 'Answer: I am ___ English teacher. (Primera vez que lo mencionas.)',
            answer: 'I am an English teacher.',
            accepted: ['i am an english teacher', 'I\'m an English teacher', 'i\'m an english teacher'],
            explain: 'Primera mención; English empieza con /e/ (vocal): an English teacher.',
          },
          {
            scene: 'Identificando un objeto único',
            prompt: 'Complete: ___ Earth is our planet.',
            answer: 'The Earth is our planet.',
            accepted: ['the earth is our planet'],
            explain: 'Hay solo una Tierra; referencia única: The Earth.',
          },
          {
            scene: 'Mencionando algo por primera vez y luego de nuevo',
            prompt: 'Write both sentences: I have a dog. ___ dog is very friendly.',
            answer: 'I have a dog. The dog is very friendly.',
            accepted: ['i have a dog the dog is very friendly', 'i have a dog. the dog is very friendly.'],
            explain: 'Primera mención: a dog. Segunda mención: the dog.',
          },
        ],
      },
    ],
  },
}

export default topic
