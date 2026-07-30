import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'plural-nouns',
  order: '04',
  color: '#7c3aed',
  category: 'Nouns',
  level: 'A1',
  title: 'Plural de sustantivos en inglés A1',
  shortTitle: 'Plural nouns',
  metaTitle: 'Plural de sustantivos en inglés A1 | Reglas y práctica para hispanohablantes',
  description: 'Aprende las reglas del plural en inglés: -s, -es, -ies, irregulares y palabras invariables, con explicación pensada para hispanohablantes y práctica progresiva de 6 niveles.',
  lead: 'En español el plural parece simple porque sigues la misma lógica: añades -s o -es. En inglés la base es similar, pero hay terminaciones especiales que cambian la vocal o la consonante final, y una lista de irregulares que debes memorizar porque no siguen ninguna regla.',
  outcomes: [
    'Formar el plural regular con -s y -es según la terminación del sustantivo.',
    'Aplicar el cambio -y → -ies y -f/-fe → -ves.',
    'Reconocer y usar los plurales irregulares más frecuentes en A1.',
  ],
  guide: {
    goal: 'Producir el plural correcto de los sustantivos más comunes en A1 sin dudar.',
    model: 'Primero observa la letra final del sustantivo, luego aplica la regla. Si es irregular, memorízalo como unidad.',
    formula: 'noun → check ending → apply rule → plural',
    decisions: [
      'La mayoría: añade -s (book → books, pen → pens).',
      '-s, -sh, -ch, -x, -z al final: añade -es (bus → buses, watch → watches).',
      'Consonante + -y al final: cambia -y por -ies (city → cities).',
      '-f o -fe al final: cambia por -ves (leaf → leaves, knife → knives).',
      'Irregulares clave: man/men, woman/women, child/children, person/people, foot/feet, tooth/teeth.',
    ],
    table: [
      ['Terminación', 'Regla', 'Ejemplo'],
      ['consonante / vocal + consonante', '+ s', 'book→books, dog→dogs'],
      ['-s, -sh, -ch, -x, -z', '+ es', 'bus→buses, watch→watches'],
      ['consonante + -y', '-y → -ies', 'city→cities, baby→babies'],
      ['-f / -fe', '-f/-fe → -ves', 'leaf→leaves, knife→knives'],
      ['vocal + -y', '+ s', 'day→days, boy→boys'],
    ],
    mistakes: [
      'Añadir -es a palabras que solo necesitan -s: "boxs" → boxes.',
      'Olvidar el cambio de -y: "citys" → cities.',
      'Usar plurales regulares para irregulares: "childs" → children, "mans" → men.',
    ],
  },
  seo: [
    {
      heading: 'Por qué el plural inglés no es tan simple como parece',
      paragraphs: [
        'Para un hispanohablante el plural parece fácil porque la base es la misma: añadir -s. Libro → libros, perro → perros. En inglés: book → books, dog → dogs. Hasta aquí todo familiar. El problema aparece con las terminaciones especiales y los irregulares. Un estudiante A1 colombiano escribe "watchs" porque en español dice relojes usando la raíz, pero en inglés el proceso es diferente: watch → watches.',
        'Otro punto de confusión es -y. En español ciudad → ciudades es regular. En inglés city → cities implica un cambio que el estudiante no anticipa. Y los irregulares como child → children o woman → women no tienen paralelo sistemático en español, así que hay que aprenderlos como vocabulario.',
      ],
    },
    {
      heading: 'Las cinco reglas del plural regular',
      paragraphs: [
        'Regla 1: La mayoría de sustantivos solo necesitan -s. Book → books, pen → pens, car → cars, phone → phones. Regla 2: Si el sustantivo termina en -s, -sh, -ch, -x o -z, añade -es porque necesitas una sílaba extra para poder pronunciarlo. Bus → buses, brush → brushes, watch → watches, box → boxes, quiz → quizzes. Regla 3: Si termina en consonante + -y, la y cambia a -ies. City → cities, baby → babies, country → countries. Si la -y va después de vocal, solo añades -s: day → days, key → keys.',
        'Regla 4: Algunos sustantivos que terminan en -f o -fe cambian a -ves. Leaf → leaves, knife → knives, wife → wives, half → halves. Otros simplemente añaden -s: roof → roofs, belief → beliefs. Regla 5: Las terminaciones -o a veces añaden -es (potato → potatoes, tomato → tomatoes) y a veces solo -s (photo → photos, piano → pianos). Para A1 conviene aprender caso por caso los más comunes.',
      ],
      table: [
        ['Sustantivo', 'Plural', 'Regla'],
        ['book', 'books', '+ s'],
        ['bus', 'buses', '-s final → + es'],
        ['watch', 'watches', '-ch final → + es'],
        ['city', 'cities', 'consonante + y → ies'],
        ['day', 'days', 'vocal + y → + s'],
        ['knife', 'knives', '-fe → -ves'],
        ['photo', 'photos', '-o → + s (excepciones)'],
      ],
    },
    {
      heading: 'Plurales irregulares que debes memorizar en A1',
      paragraphs: [
        'Los irregulares más frecuentes en A1 no siguen ninguna de las reglas anteriores: man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth, mouse → mice, fish → fish (invariable), sheep → sheep (invariable). En contextos de A1 los más críticos son person/people, man/men, woman/women y child/children porque aparecen en presentaciones, descripciones de familia y conversaciones cotidianas.',
        'Un error muy frecuente es "peoples" (incorrecto) cuando se quiere decir varias personas. People ya es el plural de person, así que no lleva -s. De forma similar, "childrens" es incorrecto: children ya es plural.',
      ],
    },
    {
      heading: 'Sustantivos que no cambian en plural',
      paragraphs: [
        'Algunos sustantivos tienen la misma forma en singular y plural: fish (one fish, two fish), sheep (one sheep, many sheep), deer. Estos se conocen como zero plurals o plurales invariables. Para saber si están en plural debes mirar el contexto: There is a fish vs There are three fish.',
        'También existen sustantivos que solo se usan en plural: jeans, glasses (gafas), scissors, trousers. No se dice "a jean" o "a trouser". Se dice a pair of jeans, a pair of glasses.',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: "Three childs" → three children. Child es irregular. Error 2: "Two womans" → two women. Woman cambia internamente. Error 3: "Many peoples" → many people. People ya es plural. Error 4: "Some boxs" → some boxes. Box termina en -x: + es.',
      ],
      examples: [
        ['Incorrecto', 'I see three childs.', 'Correcto', 'I see three children.'],
        ['Incorrecto', 'There are two womans.', 'Correcto', 'There are two women.'],
        ['Incorrecto', 'I have two watchs.', 'Correcto', 'I have two watches.'],
      ],
    },
    {
      heading: '¿Cómo se forma el plural en inglés?',
      paragraphs: [
        'La mayoría añade -s (book → books, car → cars). Los sustantivos en -s, -ss, -sh, -ch, -x añaden -es (box → boxes, watch → watches). Los de consonante + y cambian a -ies (city → cities). Los en -f/-fe suelen hacer -ves (knife → knives).',
      ],
    },
    {
      heading: '¿Cuándo se añade -es en vez de -s?',
      paragraphs: [
        'Cuando el sustantivo termina en -s, -ss, -sh, -ch, -x o -o (después de consonante): bus → buses, glass → glasses, dish → dishes, box → boxes, tomato → tomatoes. En los demás casos basta con -s.',
      ],
    },
    {
      heading: '¿Cuáles son los plurales irregulares en inglés?',
      paragraphs: [
        'Algunos no siguen ninguna regla y hay que memorizarlos: man → men, woman → women, child → children, foot → feet, tooth → teeth, person → people, mouse → mice. Otros no cambian: fish → fish, sheep → sheep.',
      ],
    },
  ],
  visual: {
    mode: 'rule-sort',
    teacherLens: 'El estudiante aprende a observar la terminación del sustantivo y seleccionar la transformación correcta.',
    graphicPrompt: 'Observa la última letra/terminación y elige la regla adecuada.',
    scene: [['city → cities', '-y → -ies'], ['watch → watches', '-ch → -es'], ['child → children', 'irregular']],
    learnerModes: ['visual: tabla de terminaciones', 'analítico: regla por grupo', 'oral: lectura de listas'],
    practiceVerbs: ['Clasifica', 'Transforma', 'Completa', 'Escribe', 'Corrige', 'Aplica'],
    reviewFocus: ['-s vs -es', '-y → -ies', 'irregulares', 'invariables'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el plural correcto para completar cada frase.',
        type: 'choice',
        items: [
          {
            scene: 'En la papelería',
            lines: [['Ana', 'I need two ___ for my notes.']],
            options: ['pen', 'pens', 'penes', 'penns'],
            answer: 'pens',
            explain: 'Pen termina en consonante normal: + s → pens.',
          },
          {
            scene: 'En la cocina',
            lines: [['Chef', 'Please put the ___ on the table.']],
            options: ['knife', 'knifes', 'knives'],
            answer: 'knives',
            explain: 'Knife termina en -fe → cambia a -ves: knives.',
          },
          {
            scene: 'En la guardería',
            lines: [['Teacher', 'There are twenty ___ in my class.']],
            options: ['child', 'childs', 'childes', 'children'],
            answer: 'children',
            explain: 'Child es irregular: children.',
          },
          {
            scene: 'En el museo',
            lines: [['Guide', 'There are people from many ___ here today.']],
            options: ['country', 'countrys', 'countries', 'countres'],
            answer: 'countries',
            explain: 'Country termina en consonante + -y → -ies: countries.',
          },
          {
            scene: 'En el hospital',
            lines: [['Doctor', 'I need two ___ to help me.']],
            options: ['woman', 'womans', 'womens', 'women'],
            answer: 'women',
            explain: 'Woman es irregular: women.',
          },
          {
            scene: 'En la oficina',
            lines: [['Manager', 'We have three new ___ on the team.']],
            options: ['person', 'persons', 'peoples', 'people'],
            answer: 'people',
            explain: 'Person → people (irregular). People no lleva -s.',
          },
          {
            scene: 'En la escuela',
            lines: [['Student', 'I left my ___ at home.']],
            options: ['book', 'books', 'bookes', 'bookies'],
            answer: 'books',
            explain: 'Book termina en consonante: + s → books.',
          },
          {
            scene: 'En el mercado',
            lines: [['Vendor', 'We have fresh ___ today.']],
            options: ['tomato', 'tomatos', 'tomatoes'],
            answer: 'tomatoes',
            explain: 'Tomato es uno de los sustantivos en -o que añade -es: tomatoes.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos plurales en un diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos plurales dentro del mismo contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Haciendo la lista del mercado',
            lines: [['Mom', 'We need three [[0]] and two [[1]] for the salad.']],
            blanks: [
              { options: ['tomato', 'tomatos', 'tomatoes'], answer: 'tomatoes', explain: 'Tomato → tomatoes.' },
              { options: ['onion', 'onions', 'onioes'], answer: 'onions', explain: 'Onion termina en consonante: + s → onions.' },
            ],
          },
          {
            scene: 'Describiendo la familia',
            lines: [['Carlos', 'My family is big. I have three [[0]] and two [[1]].']],
            blanks: [
              { options: ['brother', 'brothers', 'brotheres'], answer: 'brothers', explain: 'Brother termina en consonante: + s → brothers.' },
              { options: ['sister', 'sisters', 'sisteres'], answer: 'sisters', explain: 'Sister termina en consonante: + s → sisters.' },
            ],
          },
          {
            scene: 'En el dentista',
            lines: [['Dentist', 'Children need healthy [[0]] and healthy [[1]] too.']],
            blanks: [
              { options: ['tooth', 'tooths', 'teeth'], answer: 'teeth', explain: 'Tooth es irregular: teeth.' },
              { options: ['foot', 'foots', 'feet'], answer: 'feet', explain: 'Foot es irregular: feet.' },
            ],
          },
          {
            scene: 'En la librería',
            lines: [['Librarian', 'These [[0]] are new and those [[1]] are on sale.']],
            blanks: [
              { options: ['book', 'books', 'bookes'], answer: 'books', explain: 'Book → books.' },
              { options: ['dictionary', 'dictionarys', 'dictionaries'], answer: 'dictionaries', explain: 'Dictionary termina en consonante + -y → -ies: dictionaries.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige el plural correcto para completar la descripción.',
        type: 'guidedText',
        scene: 'Descripción de una escuela de idiomas',
        text: 'WeLearn is a great school. There are twenty [[0]] in my class. We have five [[1]] every week. The teacher uses [[2]] to explain grammar. There are also three [[3]] in the building. All the [[4]] here are very friendly. I leave my [[5]] in my locker every day. The school has two big [[6]] for breaks.',
        blanks: [
          { options: ['student', 'students', 'studentes'], answer: 'students', explain: 'Student → students.' },
          { options: ['class', 'classs', 'classes'], answer: 'classes', explain: 'Class termina en -ss → + es: classes.' },
          { options: ['example', 'examples', 'exampless'], answer: 'examples', explain: 'Example → examples.' },
          { options: ['office', 'officies', 'offices'], answer: 'offices', explain: 'Office → offices.' },
          { options: ['person', 'persons', 'people'], answer: 'people', explain: 'Person → people (irregular).' },
          { options: ['book', 'books', 'bookes'], answer: 'books', explain: 'Book → books.' },
          { options: ['bench', 'benchs', 'benches'], answer: 'benches', explain: 'Bench termina en -ch → + es: benches.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe el plural correcto sin banco de ayuda.',
        type: 'freeText',
        scene: 'Descripción de una ciudad',
        text: 'Medellín has many beautiful [[0]] (park). There are good [[1]] (bus) and fast [[2]] (train). Many [[3]] (person) visit every year. The [[4]] (city) in Colombia are very different from each other.',
        blanks: [
          { answer: 'parks', explain: 'Park → parks.' },
          { answer: 'buses', explain: 'Bus termina en -s → + es: buses.' },
          { answer: 'trains', explain: 'Train → trains.' },
          { answer: 'people', explain: 'Person → people (irregular).' },
          { answer: 'cities', explain: 'City termina en consonante + -y → -ies: cities.' },
        ],
      },
      {
        id: 'l5',
        title: 'Transformación rápida',
        tag: 'Producción',
        intro: 'Escribe la frase con el sustantivo en plural.',
        type: 'write',
        items: [
          {
            scene: 'Familia numerosa',
            prompt: 'Rewrite: I have one child. (Ahora tienes tres.)',
            answer: 'I have three children.',
            accepted: ['i have three children'],
            explain: 'Child → children (irregular).',
          },
          {
            scene: 'Muchas ciudades',
            prompt: 'Rewrite: This country has one big city. (Ahora tiene many.)',
            answer: 'This country has many big cities.',
            accepted: ['this country has many big cities'],
            explain: 'City → cities (-y → -ies).',
          },
          {
            scene: 'Cubiertos de mesa',
            prompt: 'Rewrite: Put the knife on the table. (Ahora son varios.)',
            answer: 'Put the knives on the table.',
            accepted: ['put the knives on the table'],
            explain: 'Knife → knives (-fe → -ves).',
          },
          {
            scene: 'Estudiantes nuevos',
            prompt: 'Rewrite: A new person joined today. (Ahora son five new.)',
            answer: 'Five new people joined today.',
            accepted: ['five new people joined today'],
            explain: 'Person → people (irregular).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de conversación',
        tag: 'Reto final',
        intro: 'Responde con el plural correcto en contexto real.',
        type: 'write',
        items: [
          {
            scene: 'Presentando tu clase',
            prompt: 'Describe your classmates: There are 15 ___ in my class. (person)',
            answer: 'There are 15 people in my class.',
            accepted: ['there are 15 people in my class', 'there are fifteen people in my class'],
            explain: 'Person → people.',
          },
          {
            scene: 'Describiendo tu ciudad',
            prompt: 'Complete: My city has many tall ___. (building)',
            answer: 'My city has many tall buildings.',
            accepted: ['my city has many tall buildings'],
            explain: 'Building → buildings.',
          },
          {
            scene: 'En el consultorio',
            prompt: 'The dentist says: You need to brush your ___ twice a day. (tooth)',
            answer: 'You need to brush your teeth twice a day.',
            accepted: ['you need to brush your teeth twice a day'],
            explain: 'Tooth → teeth (irregular).',
          },
        ],
      },
    ],
  },
}

export default topic
