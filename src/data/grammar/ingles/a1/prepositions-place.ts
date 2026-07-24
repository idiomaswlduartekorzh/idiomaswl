import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prepositions-place',
  order: '14',
  color: '#b45309',
  category: 'Prepositions',
  level: 'A1',
  title: 'Prepositions of Place en Inglés A1',
  shortTitle: 'Prepositions of Place',
  metaTitle: 'Prepositions of Place en Inglés A1 — in, on, at, under, next to',
  description:
    'Las preposiciones de lugar en inglés (in, on, at, under, next to, between, behind, in front of) indican dónde está algo o alguien. A diferencia del español, en inglés no cambian según el género o número del sustantivo, y su elección depende del tipo de espacio o relación física.',
  lead: 'Aprende a decir dónde están las cosas en inglés: in, on, at, under, next to y más — sin género, sin conjugación, solo posición.',
  outcomes: ['Ubica objetos con in/on/at', 'Describe posiciones relativas', 'Construye frases con be + preposición'],

  guide: {
    goal: 'Usar las preposiciones de lugar más comunes para indicar dónde está algo o alguien.',
    model: 'The book is on the table. / She is in the kitchen. / He is next to the door.',
    formula: 'Subject + be + preposition + noun',
    decisions: [
      'in → para espacios cerrados o contenedores (room, box, country)',
      'on → para superficies (table, wall, floor)',
      'at → para puntos específicos o lugares funcionales (school, work, the bus stop)',
      'under → debajo de; above → encima de; behind → detrás de; in front of → delante de',
      'next to / beside → al lado de; between → entre (dos cosas)',
    ],
    table: [
      ['Preposición', 'Uso principal', 'Ejemplo'],
      ['in', 'Espacio cerrado / contenedor', 'The cat is in the box.'],
      ['on', 'Superficie', 'The phone is on the desk.'],
      ['at', 'Punto / lugar funcional', 'She is at school.'],
      ['under', 'Debajo de', 'The bag is under the chair.'],
      ['next to', 'Al lado de', 'He is next to the window.'],
      ['between', 'Entre (dos)', 'The park is between the bank and the café.'],
      ['behind', 'Detrás de', 'The car is behind the house.'],
      ['in front of', 'Delante de', 'There is a tree in front of the building.'],
    ],
    mistakes: [
      'No uses "in" con superficies: "on the table" no "in the table".',
      '"At" no lleva artículo con lugares funcionales: "at school" no "at the school".',
      '"In front of" son dos palabras con preposición: no confundir con "before" (tiempo).',
    ],
  },

  seo: [
    {
      heading: '¿Qué son las preposiciones de lugar en inglés?',
      paragraphs: [
        'Las preposiciones de lugar (prepositions of place) son palabras que indican la posición o ubicación de algo o alguien en el espacio. Las más esenciales para el nivel A1 son: in, on, at, under, next to, between, behind e in front of.',
        'A diferencia del español, las preposiciones en inglés no cambian según el género o número del sustantivo que las acompañan. Siempre mantienen su forma base, lo que simplifica mucho su aprendizaje.',
      ],
    },
    {
      heading: 'In, on y at: los tres más importantes',
      paragraphs: [
        '"In" se usa con espacios cerrados o que contienen algo: in the room (en el cuarto), in the bag (en la bolsa), in Spain (en España). También para barrios, ciudades y países.',
        '"On" se usa con superficies: on the table (en/sobre la mesa), on the wall (en la pared), on the floor (en el piso). También con pisos de edificios: on the second floor.',
        '"At" indica un punto específico o lugar funcional: at school, at work, at the bus stop, at home. Con "at" generalmente no se usa artículo cuando el lugar es funcional.',
      ],
      table: [
        ['Preposición', 'Espacio', 'Ejemplo'],
        ['in', 'Interior / contenedor', 'The keys are in the drawer.'],
        ['on', 'Superficie', 'The cup is on the counter.'],
        ['at', 'Punto / función', 'She is at the office.'],
      ],
    },
    {
      heading: 'Preposiciones de posición relativa',
      paragraphs: [
        '"Under" (debajo de) y "above/over" (encima de) describen relaciones verticales. "Behind" (detrás de) e "in front of" (delante de) describen relaciones de profundidad.',
        '"Next to" o "beside" (al lado de) y "between" (entre) describen relaciones horizontales. "Between" siempre va con dos referencias: between the bank and the café.',
        'Estas preposiciones van siempre seguidas de un sustantivo (objeto o lugar): next to the door, under the bed, behind the building.',
      ],
      examples: [
        ['Inglés', 'Español'],
        ['The dog is under the table.', 'El perro está debajo de la mesa.'],
        ['The supermarket is next to the pharmacy.', 'El supermercado está al lado de la farmacia.'],
        ['The school is between the park and the bank.', 'El colegio está entre el parque y el banco.'],
        ['My coat is behind the door.', 'Mi abrigo está detrás de la puerta.'],
        ['There is a sign in front of the building.', 'Hay un cartel delante del edificio.'],
      ],
    },
    {
      heading: 'Estructura: be + preposición de lugar',
      paragraphs: [
        'En inglés A1, las preposiciones de lugar funcionan con el verbo "be" (is/are/am): The book is on the table. My parents are at home. I am in the kitchen.',
        'También pueden usarse con "there is/there are": There is a cat under the chair. There are books on the shelf.',
        'La preposición siempre va antes del sustantivo que indica el lugar de referencia. No hay inversión ni cambio posicional como en otras lenguas.',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'En español usamos "en" para casi todo: en la mesa, en la caja, en el trabajo. En inglés hay que elegir entre in, on y at según el tipo de espacio, lo que requiere práctica.',
        'Otro error frecuente es traducir "al lado de" como "in the side of" — la forma correcta es "next to" o "beside".',
        '"In front of" se escribe como tres palabras, no como una. Y no debe confundirse con "before", que indica posición en tiempo, no en espacio.',
      ],
    },
    {
      heading: '¿Cuándo se usa in, on y at para lugar en inglés?',
      paragraphs: [
        '"in" para espacios cerrados o áreas (in the room, in Bogotá, in the car); "on" para superficies y líneas (on the table, on the wall, on the bus); "at" para puntos concretos y direcciones (at the door, at the bus stop, at home). El español usa "en" para las tres, de ahí la confusión.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "in" y "at" para lugares?',
      paragraphs: [
        '"in" ve el lugar como un espacio que te rodea (in the office = dentro de la oficina); "at" lo ve como un punto o una actividad (at the office = en el trabajo). "at school" (estudiando) vs "in the school" (dentro del edificio).',
      ],
    },
    {
      heading: '¿Cómo se dice "en" (lugar) en inglés?',
      paragraphs: [
        'Depende: espacio cerrado → in ("en la habitación" = in the room); superficie → on ("en la mesa" = on the table); punto concreto → at ("en la parada" = at the bus stop). El "en" español se reparte entre in, on y at según el tipo de lugar.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Preposiciones de lugar más frecuentes en contextos cotidianos del nivel A1.',
    graphicPrompt: 'Ilustración de una habitación con objetos claramente etiquetados en distintas posiciones.',
    scene: [
      ['in', 'The phone is in the bag.'],
      ['on', 'The bag is on the chair.'],
      ['at', 'She is at home.'],
      ['under', 'The cat is under the table.'],
      ['next to', 'The lamp is next to the bed.'],
      ['between', 'The café is between the bank and the pharmacy.'],
      ['behind', 'The key is behind the door.'],
      ['in front of', 'There is a car in front of the house.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['in vs on vs at', 'next to vs between', 'multi-word prepositions'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la preposición correcta para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'The book is ___ the shelf.']],
            options: ['in', 'on', 'at', 'under'],
            answer: 'on',
            explain: '"On" para superficies: the shelf (el estante) es una superficie.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'My keys are ___ my bag.']],
            options: ['on', 'in', 'at', 'next to'],
            answer: 'in',
            explain: '"In" para contenedores: la bolsa contiene las llaves.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'She is ___ school right now.']],
            options: ['in', 'on', 'at', 'behind'],
            answer: 'at',
            explain: '"At" con lugares funcionales como school, work, home.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'The cat is sleeping ___ the bed.']],
            options: ['on', 'in', 'at', 'in front of'],
            answer: 'on',
            explain: '"On" porque el gato está sobre la superficie de la cama.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'The dog is ___ the table.']],
            options: ['on', 'in', 'under', 'at'],
            answer: 'under',
            explain: '"Under" significa "debajo de": el perro está debajo de la mesa.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'The pharmacy is ___ the supermarket and the bakery.']],
            options: ['between', 'next to', 'behind', 'in front of'],
            answer: 'between',
            explain: '"Between" cuando algo está en medio de dos referencias.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'My car is parked ___ the building.']],
            options: ['in front of', 'in', 'on', 'at'],
            answer: 'in front of',
            explain: '"In front of" = delante de. Three words, not one.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'The lamp is ___ the sofa.']],
            options: ['next to', 'in', 'at', 'under'],
            answer: 'next to',
            explain: '"Next to" = al lado de. También se puede decir "beside the sofa".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa las dos partes de cada descripción de lugar.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'The pen is [[0]] the desk and the notebook is [[1]] the drawer.']],
            blanks: [
              { options: ['on', 'in', 'at', 'under'], answer: 'on', explain: '"On the desk" — superficie.' },
              { options: ['in', 'on', 'at', 'next to'], answer: 'in', explain: '"In the drawer" — contenedor.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'She is [[0]] work and her bag is [[1]] her desk.']],
            blanks: [
              { options: ['at', 'in', 'on', 'behind'], answer: 'at', explain: '"At work" — lugar funcional.' },
              { options: ['under', 'in', 'at', 'on'], answer: 'under', explain: '"Under her desk" — debajo de la superficie.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'The cat is [[0]] the box and the box is [[1]] the table.']],
            blanks: [
              { options: ['in', 'on', 'under', 'behind'], answer: 'in', explain: '"In the box" — contenedor.' },
              { options: ['on', 'in', 'at', 'next to'], answer: 'on', explain: '"On the table" — superficie.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'The bank is [[0]] the pharmacy and the café is [[1]] the bank.']],
            blanks: [
              { options: ['next to', 'between', 'behind', 'in front of'], answer: 'next to', explain: '"Next to the pharmacy" — al lado de.' },
              { options: ['behind', 'next to', 'in front of', 'between'], answer: 'behind', explain: '"Behind the bank" — detrás de.' },
            ],
          },
        ],
      },
      {
          id: 'level-3',
          title: 'Completa el texto',
          tag: 'Texto guiado',
          intro: 'Elige la preposición de lugar correcta en cada espacio del texto.',
          type: 'guidedText',
        scene: 'Elige la preposición de lugar correcta en cada espacio del texto.',
        text: 'My room is small but comfortable. My bed is [[0]] the wall, next to the window. My desk is [[1]] the bed. On the desk, there is a lamp [[2]] the books. My shoes are [[3]] the bed. There is a mirror [[4]] the door. My backpack is [[5]] the chair, not on the floor. The chair is [[6]] my desk.',
        blanks: [
          { options: ['against', 'on', 'in', 'at'], answer: 'against', explain: '"Against the wall" = pegado a la pared. En A1 también se acepta "next to" informalmente.' },
          { options: ['next to', 'in', 'at', 'under'], answer: 'next to', explain: '"Next to the bed" — al lado de la cama.' },
          { options: ['next to', 'on', 'in', 'at'], answer: 'next to', explain: '"Next to the books" — al lado de los libros.' },
          { options: ['under', 'on', 'in', 'at'], answer: 'under', explain: '"Under the bed" — debajo de la cama.' },
          { options: ['on', 'in', 'behind', 'next to'], answer: 'on', explain: '"On the door" — pegado a la puerta (superficie).' },
          { options: ['on', 'in', 'under', 'at'], answer: 'on', explain: '"On the chair" — sobre la silla (superficie).' },
          { options: ['next to', 'in', 'at', 'on'], answer: 'next to', explain: '"Next to my desk" — al lado de mi escritorio.' },
        ],
      },
      {
          id: 'level-4',
          title: 'Escribe sin ayuda',
          tag: 'Texto libre',
          intro: 'Escribe la preposición de lugar correcta en cada espacio.',
          type: 'freeText',
        scene: 'Escribe la preposición de lugar correcta en cada espacio.',
        text: 'The keys are [[0]] the table. The sofa is [[1]] the TV. My coat is [[2]] the door. The supermarket is [[3]] the bank and the pharmacy. My apartment is [[4]] the third floor.',
        blanks: [
          { answer: 'on', accepted: ['on', 'on the'], explain: '"On the table" — sobre la mesa.' },
          { answer: 'in front of', accepted: ['in front of', 'opposite'], explain: '"In front of the TV" — delante de la televisión.' },
          { answer: 'behind', accepted: ['behind', 'next to'], explain: '"Behind the door" — detrás de la puerta.' },
          { answer: 'between', accepted: ['between'], explain: '"Between the bank and the pharmacy" — entre dos referencias.' },
          { answer: 'on', accepted: ['on'], explain: '"On the third floor" — en el piso (superficie numérica de un edificio).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe frases completas describiendo dónde están estos objetos.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di dónde está tu teléfono ahora mismo. Usa "on", "in" o "next to".',
            answer: 'My phone is on the table.',
            accepted: ['my phone is on', 'my phone is in', 'my phone is next to', 'the phone is on', 'the phone is in'],
            explain: 'Ejemplo: My phone is on the desk. / My phone is in my bag. / My phone is next to the keyboard.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe dónde está la silla en tu habitación o aula. Usa "next to", "behind" o "in front of".',
            answer: 'The chair is next to the desk.',
            accepted: ['the chair is next to', 'the chair is behind', 'the chair is in front of', 'my chair is'],
            explain: 'Ejemplo: The chair is next to the window. / The chair is in front of the desk.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hay debajo de tu escritorio o tu cama.',
            answer: 'There are shoes under my bed.',
            accepted: ['there is', 'there are', 'under the', 'under my'],
            explain: 'Ejemplo: There are shoes under the bed. / There is a box under my desk.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe la ubicación de dos lugares de tu ciudad o barrio usando "between" o "next to".',
            answer: 'The pharmacy is next to the supermarket.',
            accepted: ['is next to', 'is between', 'are next to', 'are between'],
            explain: 'Ejemplo: The park is next to the school. / The café is between the bank and the pharmacy.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Misión: Un amigo te pregunta cómo es tu habitación. Describe al menos 3 objetos y sus posiciones en frases completas.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe la posición de tu cama (usa "next to", "against" o "near").',
            answer: 'My bed is next to the window.',
            accepted: ['my bed is next to', 'my bed is against', 'my bed is near', 'the bed is'],
            explain: 'Ejemplo: My bed is next to the window. / My bed is against the wall.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe dónde tienes tus libros o tu mochila (usa "on", "in" o "under").',
            answer: 'My books are on the shelf.',
            accepted: ['my books are on', 'my books are in', 'my bag is on', 'my bag is in', 'my bag is under', 'the books are', 'the bag is'],
            explain: 'Ejemplo: My books are on the desk. / My bag is under the chair.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di dónde está tu escritorio o tu closet en relación a otro mueble.',
            answer: 'My desk is next to the door.',
            accepted: ['my desk is', 'the desk is', 'my closet is', 'the closet is', 'next to', 'in front of', 'behind', 'between'],
            explain: 'Ejemplo: My desk is in front of the window. / My closet is between the door and the wall.',
          },
        ],
      },
    ],
  },
}

export default topic
