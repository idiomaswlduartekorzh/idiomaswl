import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'relative-clauses-a2',
  order: '16',
  color: '#dc2626',
  category: 'Sintaxis',
  level: 'A2',
  title: 'Cláusulas de relativo en Inglés A2: who, which, that',
  shortTitle: 'Who / Which / That',
  metaTitle: 'Cláusulas de Relativo en Inglés A2 — Who, Which y That',
  description:
    'Las cláusulas de relativo permiten dar información adicional sobre personas o cosas sin repetir el sustantivo. Aprende cuándo usar who (personas), which (cosas) y that (ambos) para conectar oraciones con precisión.',
  lead: 'Conecta oraciones con quien, which y that: el sistema que hace tu inglés más rico y fluido.',
  outcomes: [
    'Usa who para referirte a personas en cláusulas de relativo',
    'Usa which para cosas y animales',
    'Usa that como alternativa informal para personas y cosas',
    'Omite el pronombre relativo cuando es el objeto de la cláusula',
  ],

  guide: {
    goal: 'Conectar oraciones usando who, which y that para dar información adicional sobre sustantivos.',
    model: 'The teacher who explains clearly is great. / I love the book that you recommended.',
    formula: 'Sustantivo + who/which/that + verbo (+ complemento)',
    decisions: [
      'Persona como sujeto o objeto → who (formal) o that (informal)',
      'Cosa o animal → which (formal) o that (informal)',
      'Después de coma (cláusula no restrictiva) → solo who o which, NUNCA that',
      'Si el pronombre relativo es el objeto (no el sujeto) → se puede omitir',
      'La cláusula va SIEMPRE inmediatamente después del sustantivo al que se refiere',
    ],
    table: [
      ['Pronombre', 'Usado para', 'Ejemplo'],
      ['who', 'Personas (sujeto u objeto)', 'The man who works here is kind.'],
      ['which', 'Cosas y animales (formal)', 'The car which I rented was red.'],
      ['that', 'Personas, cosas, animales (informal)', 'The bag that I lost was expensive.'],
    ],
    mistakes: [
      '"The woman that, lives next door…" ❌ — No se usa coma antes de "that" en cláusulas restrictivas.',
      '"My sister, that lives in London…" ❌ → "My sister, who lives in London…" ✓ — Después de coma solo who/which.',
      '"The person she called was…" ❌ → "The person who called was…" ✓ — Si el pronombre es sujeto, no se omite.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son las cláusulas de relativo en inglés?',
      paragraphs: [
        'Una cláusula de relativo es una frase que da información adicional sobre un sustantivo. Empieza con un pronombre relativo (who, which, that) y va inmediatamente después del sustantivo al que se refiere.',
        'Son fundamentales en inglés A2 porque permiten combinar ideas sin repetir palabras. En lugar de decir "I have a friend. She speaks five languages." puedes decir "I have a friend who speaks five languages."',
      ],
    },
    {
      heading: 'Who, which o that: cómo elegir',
      paragraphs: [
        '"Who" se usa exclusivamente para personas: The teacher who explained the lesson was very clear.',
        '"Which" se usa para cosas y animales: The book which I read last week was amazing.',
        '"That" puede reemplazar a who o which en la mayoría de los casos en inglés informal: The person that called / The car that broke down.',
        'Excepción importante: después de coma solo se usa who o which, nunca that. My brother, who lives in London, is a chef.',
      ],
      examples: [
        ['Sustantivo', 'Pronombre relativo', 'Ejemplo'],
        ['Persona', 'who / that', 'The girl who sits next to me is from Brazil.'],
        ['Cosa', 'which / that', 'I love the movie which we saw yesterday.'],
        ['Animal', 'which / that', 'She has a dog that barks all night.'],
      ],
    },
    {
      heading: 'Cuándo se puede omitir el pronombre relativo',
      paragraphs: [
        'Cuando el pronombre relativo es el objeto de la cláusula (no el sujeto), se puede omitir, especialmente en inglés hablado.',
        'Ejemplo: The book (that) I read was amazing. → "I" es el sujeto de "read", "that" es el objeto → se puede omitir.',
        'Cuando el pronombre relativo ES el sujeto, NO se puede omitir: The woman who called me (no se puede quitar "who").',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Cláusulas de relativo: who/which/that en conversación cotidiana A2.',
    graphicPrompt: 'Personas describiendo otras personas y objetos con cláusulas de relativo.',
    scene: [
      ['That\'s the teacher who helped me.', 'Esa es la profesora que me ayudó.'],
      ['I lost the keys that were on the table.', 'Perdí las llaves que estaban en la mesa.'],
      ['The man who called is my boss.', 'El hombre que llamó es mi jefe.'],
      ['Is this the bag which you wanted?', '¿Es esta la bolsa que querías?'],
      ['She\'s the friend that I told you about.', 'Ella es la amiga de la que te hablé.'],
      ['The movie that we saw was great.', 'La película que vimos fue genial.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['who vs that', 'which vs that', 'omisión del pronombre'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pronombre relativo correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona who, which o that según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'En clase de inglés, practicando pronombres relativos.',
            lines: [['Profe', 'Completa: "The student ___ passed the exam was very happy."']],
            options: ['who', 'which', 'of', 'where'],
            answer: 'who',
            explain: '"Student" es una persona → usamos "who".',
          },
          {
            scene: 'Hablando de objetos perdidos.',
            lines: [['Ana', 'Have you seen the bag ___ I left here?']],
            options: ['which', 'who', 'where', 'when'],
            answer: 'which',
            explain: '"Bag" es una cosa → "which". También sería válido "that".',
          },
          {
            scene: 'Describiendo a un amigo.',
            lines: [['Carlos', 'He is the friend ___ helped me move to this city.']],
            options: ['that', 'which', 'where', 'when'],
            answer: 'that',
            explain: '"Friend" es persona y la frase es informal → "that" o "who" son correctos.',
          },
          {
            scene: 'Hablando de una película.',
            lines: [['Laura', 'Did you see the movie ___ won the Oscar this year?']],
            options: ['that', 'who', 'whom', 'where'],
            answer: 'that',
            explain: '"Movie" es una cosa → "that" o "which". Solo "that" está disponible.',
          },
          {
            scene: 'Describiendo el vecindario.',
            lines: [['Vecino', 'The house ___ is on the corner belongs to my grandmother.']],
            options: ['which', 'who', 'whose', 'what'],
            answer: 'which',
            explain: '"House" es una cosa → "which" o "that".',
          },
          {
            scene: 'Contando sobre el trabajo.',
            lines: [['Pedro', 'My boss is a woman ___ speaks three languages.']],
            options: ['who', 'which', 'that she', 'where'],
            answer: 'who',
            explain: '"Woman" es persona → "who". No se repite el pronombre.',
          },
          {
            scene: 'Recomendando un restaurante.',
            lines: [['Sofia', 'I know a restaurant ___ serves amazing Colombian food.']],
            options: ['that', 'who', 'which it', 'whose'],
            answer: 'that',
            explain: '"Restaurant" es una cosa → "that" o "which".',
          },
          {
            scene: 'En una tienda, describiendo ropa.',
            lines: [['Vendedor', 'The jacket ___ you tried on yesterday is on sale now.']],
            options: ['that', 'who', 'what', 'where'],
            answer: 'that',
            explain: '"Jacket" es cosa; "that" es el objeto de "tried on" → se puede usar o incluso omitir.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Construye cláusulas de relativo',
        tag: '2 espacios',
        intro: 'Completa las oraciones con el pronombre relativo y la forma correcta del verbo.',
        type: 'dual',
        items: [
          {
            scene: 'Describiendo personas y cosas en la ciudad.',
            lines: [['', 'The man [[0]] sells newspapers is always [[1]] happy.']],
            blanks: [
              { options: ['who', 'which', 'where', 'what'], answer: 'who', explain: 'Persona → who.' },
              { options: ['very', 'much', 'a', 'so much'], answer: 'very', explain: '"Very happy" — se usa "very" con adjetivos.' },
            ],
          },
          {
            scene: 'Hablando de tecnología.',
            lines: [['', 'This is the app [[0]] I use [[1]] day to practice English.']],
            blanks: [
              { options: ['that', 'who', 'whose', 'whom'], answer: 'that', explain: '"App" es cosa → "that" o "which". Puede omitirse porque es objeto.' },
              { options: ['every', 'each one', 'all', 'always'], answer: 'every', explain: '"Every day" = todos los días.' },
            ],
          },
          {
            scene: 'Contando sobre familia.',
            lines: [['', 'My sister, [[0]] lives in Medellín, [[1]] us every Christmas.']],
            blanks: [
              { options: ['who', 'that', 'which', 'whose'], answer: 'who', explain: 'Después de coma + persona → who (nunca "that" después de coma).' },
              { options: ['visits', 'visit', 'visited', 'is visiting'], answer: 'visits', explain: 'Hábito en presente → present simple. "My sister" = she → visits.' },
            ],
          },
          {
            scene: 'Hablando de un libro.',
            lines: [['', 'The novel [[0]] I [[1]] last month was written by a Colombian author.']],
            blanks: [
              { options: ['that', 'who', 'whose', 'where'], answer: 'that', explain: '"Novel" es cosa → "that" (objeto → puede omitirse).' },
              { options: ['read', 'reads', 'reading', 'have read'], answer: 'read', explain: '"Last month" indica pasado → past simple. "Read" irregular.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conecta oraciones con cláusulas de relativo',
        tag: 'Texto guiado',
        intro: 'Completa el texto combinando oraciones con who, which o that.',
        type: 'guidedText',
        scene: 'Una estudiante describe a las personas y cosas importantes en su vida.',
        text: 'My best friend is a girl [[0]] I met in primary school. She has a brother [[1]] is a musician. He plays a guitar [[2]] belonged to their grandfather. They live in an apartment [[3]] is near the city center. My friend works in a café [[4]] serves the best hot chocolate in town.',
        blanks: [
          { options: ['that', 'who', 'which', 'whose'], answer: 'that', explain: '"Girl" es persona y es objeto → "that" o "who". "That" es más común en inglés informal.' },
          { options: ['who', 'that', 'which', 'whose'], answer: 'who', explain: '"Brother" es persona y es el sujeto de "is" → "who" o "that".' },
          { options: ['that', 'who', 'which', 'whose'], answer: 'that', explain: '"Guitar" es cosa → "that" o "which".' },
          { options: ['that', 'who', 'which', 'whose'], answer: 'that', explain: '"Apartment" es cosa → "that" o "which".' },
          { options: ['that', 'who', 'which', 'whose'], answer: 'that', explain: '"Café" es cosa → "that" o "which".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los pronombres relativos',
        tag: 'Texto libre',
        intro: 'Sin opciones. Escribe who, which o that en cada espacio.',
        type: 'freeText',
        scene: 'Un guía turístico describe los lugares y personas de su ciudad.',
        text: 'Welcome to our city! The cathedral [[0]] you can see from here was built in 1750. The artist [[1]] painted the murals on the walls was from this neighborhood. The market [[2]] opens every Saturday sells fresh fruit and vegetables. The people [[3]] live here are very friendly and helpful. The river [[4]] crosses the city is the most important one in the region.',
        blanks: [
          { answer: 'that', explain: '"Cathedral" → cosa → that/which.' },
          { answer: 'who', explain: '"Artist" → persona → who/that.' },
          { answer: 'that', explain: '"Market" → cosa → that/which.' },
          { answer: 'who', explain: '"People" → personas → who/that.' },
          { answer: 'that', explain: '"River" → cosa → that/which.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Combina dos oraciones',
        tag: 'Escritura guiada',
        intro: 'Une las dos oraciones usando un pronombre relativo.',
        type: 'write',
        items: [
          {
            scene: 'Combina: "I have a neighbor. She grows vegetables." Usa "who".',
            prompt: 'I have a neighbor. She grows vegetables.',
            answer: 'I have a neighbor who grows vegetables.',
            accepted: ['I have a neighbour who grows vegetables.', 'I have a neighbor that grows vegetables.'],
            explain: '"Neighbor" es persona → who/that. Se elimina "She" y se reemplaza por "who".',
          },
          {
            scene: 'Combina: "She bought a dress. It costs $200." Usa "that".',
            prompt: 'She bought a dress. It costs $200.',
            answer: 'She bought a dress that costs $200.',
            accepted: ['She bought a dress which costs $200.', 'She bought a dress that cost $200.'],
            explain: '"Dress" es cosa → that/which. Se elimina "It".',
          },
          {
            scene: 'Combina: "He is a doctor. He works at the city hospital." Usa "who".',
            prompt: 'He is a doctor. He works at the city hospital.',
            answer: 'He is a doctor who works at the city hospital.',
            accepted: ['He is a doctor that works at the city hospital.'],
            explain: '"Doctor" es persona → who/that. Se elimina el segundo "He".',
          },
          {
            scene: 'Combina: "They live in a house. It has a big garden." Usa "which".',
            prompt: 'They live in a house. It has a big garden.',
            answer: 'They live in a house which has a big garden.',
            accepted: ['They live in a house that has a big garden.'],
            explain: '"House" es cosa → which/that. Se elimina "It".',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe con cláusulas de relativo',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales con cláusulas de relativo.',
        type: 'write',
        items: [
          {
            scene: 'Describe a alguien importante en tu vida usando "who".',
            prompt: 'Escribe una oración sobre una persona usando "who".',
            answer: 'I have a friend who speaks English and Korean.',
            accepted: [
              'My mother is a woman who works very hard.',
              'I know a teacher who explains grammar very well.',
              'She has a brother who lives in Spain.',
            ],
            explain: 'Persona + who + verbo. La cláusula va inmediatamente después del sustantivo.',
          },
          {
            scene: 'Describe un objeto usando "that" o "which".',
            prompt: 'Escribe una oración sobre un objeto usando "that" o "which".',
            answer: 'I bought a laptop that is very fast.',
            accepted: [
              'I use an app which helps me learn English.',
              'She has a car that is really old.',
              'This is a book that changed my life.',
            ],
            explain: 'Cosa + that/which + verbo. Ambos son correctos para objetos.',
          },
          {
            scene: 'Combina ideas usando dos cláusulas de relativo.',
            prompt: 'Escribe una oración con dos cláusulas de relativo (persona + cosa).',
            answer: 'The teacher who taught me English works in a school that has 500 students.',
            accepted: [
              'My friend who studied medicine works in a hospital that is very modern.',
              'The man who called me works in a company that sells technology.',
            ],
            explain: 'Dos cláusulas: "who..." para persona + "that/which..." para cosa. Cada cláusula va justo después de su sustantivo.',
          },
        ],
      },
    ],
  },
}

export default topic
