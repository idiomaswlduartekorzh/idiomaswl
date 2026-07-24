import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'have-got',
  order: '19',
  color: '#0369a1',
  category: 'Verbs',
  level: 'A1',
  title: 'Have got en inglés A1',
  shortTitle: 'Have got',
  metaTitle: 'Have got en inglés A1 | I\'ve got, She\'s got, Have you got?',
  description:
    'Aprende a usar have got en inglés A1 para expresar posesión. Domina las formas afirmativa (I\'ve got), negativa (I haven\'t got) e interrogativa (Have you got?).',
  lead: 'Have got es una forma muy común en inglés para expresar posesión. Funciona igual que have pero se usa mucho en inglés británico y conversacional. I have a car = I\'ve got a car. ¿Tienes? = Have you got?',
  outcomes: [
    'Usar have got en afirmativa: I\'ve got, she\'s got, we\'ve got.',
    'Formar negativas: I haven\'t got, he hasn\'t got.',
    'Hacer preguntas: Have you got? / Has she got?',
  ],
  guide: {
    goal: 'Expresar posesión usando have got en sus tres formas: afirmativa, negativa e interrogativa.',
    model: 'I\'ve got a dictionary. / She hasn\'t got a phone. / Have you got a pen?',
    formula: 'I/You/We/They have got | He/She/It has got | Questions: Have + subject + got?',
    decisions: [
      'Afirmativa: I have got → I\'ve got. She has got → She\'s got. They have got → They\'ve got.',
      'Negativa: I have not got → I haven\'t got. He has not got → He hasn\'t got.',
      'Interrogativa: Have you got a book? / Has she got a dictionary?',
      'Have got y have son intercambiables para posesión: I have a car = I\'ve got a car.',
      'NUNCA: "I\'ve got have a car" o "Has she has got?" — solo one auxiliary.',
    ],
    table: [
      ['Persona', 'Afirmativa (contracción)', 'Negativa (contracción)'],
      ['I / You / We / They', 'I\'ve got / You\'ve got', 'I haven\'t got / You haven\'t got'],
      ['He / She / It', 'He\'s got / She\'s got', 'He hasn\'t got / She hasn\'t got'],
      ['Pregunta (you)', 'Have you got a pen?', 'Haven\'t you got a pen?'],
    ],
    mistakes: [
      '"I have got have a car" ❌ → I\'ve got a car ✓ — no doble auxiliar.',
      '"She have got" ❌ → She has got / She\'s got ✓ — 3.ª persona: has got.',
      '"Has you got?" ❌ → Have you got? ✓ — you siempre con have.',
    ],
  },
  seo: [
    {
      heading: 'Qué es have got y cuándo usarlo',
      paragraphs: [
        'Have got es una expresión muy común en inglés, especialmente en inglés británico y coloquial, para expresar posesión. Significa lo mismo que have cuando hablamos de cosas que tenemos: I have a book = I\'ve got a book. La diferencia es de registro y variedad: have got suena más natural en conversación.',
        'En A1 es importante conocer have got porque aparece constantemente en textos, audios y conversaciones. Los estudiantes latinoamericanos a veces lo confunden con el present perfect (have + past participle), pero have got para posesión es una estructura completamente distinta.',
      ],
    },
    {
      heading: 'Conjugación: have got vs has got',
      paragraphs: [
        'La conjugación de have got sigue la misma lógica que have: para I, you, we y they se usa have got; para he, she e it se usa has got. En las contracciones: I\'ve got, you\'ve got, we\'ve got, they\'ve got; he\'s got, she\'s got, it\'s got.',
        'El error más común es usar have con he/she/it: "she have got" es incorrecto. Siempre: She has got / She\'s got. Para preguntas: Have you got? / Has she got? — el auxiliar (have/has) va al inicio.',
      ],
    },
    {
      heading: 'Have got para descripción personal en A1',
      paragraphs: [
        'Have got es especialmente útil en A1 para describirse a uno mismo y describir a otros: I\'ve got brown eyes. / She\'s got long hair. / He hasn\'t got a car. Estas frases aparecen en descripciones físicas, presentaciones y conversaciones cotidianas.',
        'También se usa para hablar de posesiones materiales (I\'ve got a laptop) y familia (I\'ve got two brothers). En WeLearn lo practicamos desde A1 porque permite hablar de uno mismo de forma muy natural.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "have" y "have got"?',
      paragraphs: [
        'Significan lo mismo (tener/poseer). "have got" es más común en inglés británico y hablado ("I have got a car" / "I\'ve got a car"); "have" es más neutro y universal ("I have a car"). En preguntas y negaciones cambian: "Have you got…?" vs "Do you have…?".',
      ],
    },
    {
      heading: '¿Cómo se usa "have got" en inglés?',
      paragraphs: [
        'have/has got + sustantivo, normalmente contraído: "I\'ve got two brothers", "She\'s got a dog". Se usa para posesión, relaciones y características. Con he/she/it se usa "has got": "He has got blue eyes".',
      ],
    },
    {
      heading: '¿Cómo se hacen preguntas y negaciones con "have got"?',
      paragraphs: [
        'Pregunta: se invierte have/has ("Have you got a pen?", "Has she got time?"), sin do/does. Negación: "haven\'t got / hasn\'t got" ("I haven\'t got money", "He hasn\'t got a car"). Es distinto de "have", que en pregunta/negación usa do/does.',
      ],
    },
  ],
  visual: {
    mode: 'table',
    teacherLens: 'El estudiante aprende a conjugar have got y a usarlo en las tres formas básicas.',
    graphicPrompt: 'Tabla de have got: I\'ve got / She\'s got / Have you got? con ejemplos de posesión.',
    scene: [
      ['I\'ve got / I haven\'t got', 'I\'ve got a dictionary. / I haven\'t got a car.'],
      ['She\'s got / She hasn\'t got', 'She\'s got blue eyes. / She hasn\'t got a phone.'],
      ['Have you got? / Has he got?', 'Have you got a pen? / Has he got siblings?'],
      ['They\'ve got / We\'ve got', 'They\'ve got a great teacher. / We\'ve got homework.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['have vs has got', 'contracciones \'ve got / \'s got', 'preguntas Have/Has...got?', 'negativa haven\'t/hasn\'t got'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento de formas',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de have got.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de posesiones propias',
            lines: [['Carlos', 'I ___ a new English dictionary.']],
            options: ['\'ve got', '\'s got', 'have gets', 'has got'],
            answer: '\'ve got',
            explain: 'I\'ve got = I have got — 1.ª persona singular.',
          },
          {
            scene: 'Describiendo a la profesora',
            lines: [['Student', 'Lía ___ a lot of patience with students.']],
            options: ['has got', 'have got', '\'ve got', 'haven\'t got'],
            answer: 'has got',
            explain: 'She/Lía has got — 3.ª persona singular: has got.',
          },
          {
            scene: 'Preguntando a un compañero',
            lines: [['Nico', '___ you got a pen?']],
            options: ['Have', 'Has', 'Haven\'t', 'Got'],
            answer: 'Have',
            explain: 'Have you got? — pregunta con you: Have.',
          },
          {
            scene: 'Negando una posesión',
            lines: [['Ana', 'I ___ a car — I take the bus.']],
            options: ['haven\'t got', 'hasn\'t got', 'have got', 'has got'],
            answer: 'haven\'t got',
            explain: 'I haven\'t got = I don\'t have — negativa 1.ª persona.',
          },
          {
            scene: 'Preguntando sobre él',
            lines: [['Lina', '___ Nico got a WhatsApp group for students?']],
            options: ['Has', 'Have', 'Is', 'Does'],
            answer: 'Has',
            explain: 'Has Nico got? — 3.ª persona: Has.',
          },
          {
            scene: 'Describiendo el grupo',
            lines: [['Teacher', 'We ___ fifteen students in this class.']],
            options: ['\'ve got', '\'s got', 'hasn\'t got', 'has got'],
            answer: '\'ve got',
            explain: 'We\'ve got = We have got — 1.ª persona plural.',
          },
          {
            scene: 'Negando sobre él',
            lines: [['Sofia', 'He ___ time to study this week — he\'s very busy.']],
            options: ['hasn\'t got', 'haven\'t got', 'has got', '\'ve got'],
            answer: 'hasn\'t got',
            explain: 'He hasn\'t got — negativa 3.ª persona: hasn\'t got.',
          },
          {
            scene: 'Hablando de los estudiantes',
            lines: [['Nico', 'They ___ great pronunciation already!']],
            options: ['\'ve got', '\'s got', 'hasn\'t got', 'hasn\'t'],
            answer: '\'ve got',
            explain: 'They\'ve got — 3.ª persona plural: have got.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Forma y contexto',
        tag: '2 espacios',
        intro: 'Elige el auxiliar correcto y completa la estructura.',
        type: 'dual',
        items: [
          {
            scene: 'Descripción física',
            lines: [['Carlos', 'She [[0]] [[1]] long brown hair.']],
            blanks: [
              { options: ['has', 'have', 'haven\'t'], answer: 'has', explain: '3.ª persona: has got.' },
              { options: ['got', 'get', 'gets'], answer: 'got', explain: 'She has got — got es parte fija.' },
            ],
          },
          {
            scene: 'Pregunta de presentación',
            lines: [['Teacher', '[[0]] you [[1]] a notebook?']],
            blanks: [
              { options: ['Have', 'Has', 'Is'], answer: 'Have', explain: 'Pregunta con you: Have you...?' },
              { options: ['got', 'get', 'gets'], answer: 'got', explain: 'Have you got? — got invariable.' },
            ],
          },
          {
            scene: 'Negativa personal',
            lines: [['Ana', 'I [[0]] [[1]] a car. I use public transport.']],
            blanks: [
              { options: ['haven\'t', 'hasn\'t', 'have'], answer: 'haven\'t', explain: 'Negativa I: haven\'t got.' },
              { options: ['got', 'get', 'have'], answer: 'got', explain: 'I haven\'t got — negativa con got.' },
            ],
          },
          {
            scene: 'Información del grupo',
            lines: [['Nico', 'Our class [[0]] [[1]] twelve students this month.']],
            blanks: [
              { options: ['has', 'have', 'haven\'t'], answer: 'has', explain: '"Our class" = it → has got.' },
              { options: ['got', 'get', 'gets'], answer: 'got', explain: 'Our class has got — 3.ª persona.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Registro en WeLearn',
        tag: 'Opciones',
        intro: 'Elige la forma correcta de have got para completar el diálogo.',
        type: 'guidedText',
        scene: 'Primer día de clase en WeLearn — preguntas de registro',
        text: '— [[0]] you got a student ID? — Yes, I [[1]] got one. — [[2]] you got a notebook? — No, I [[3]] got one, but I have my phone. — Has your friend [[4]] the course book? — Yes, she [[5]] got it.',
        blanks: [
          { options: ['Have', 'Has', 'Is'], answer: 'Have', explain: 'Pregunta con you → Have you got?' },
          { options: ['\'ve', '\'s', 'haven\'t'], answer: '\'ve', explain: 'Yes → I\'ve got (afirmativa).' },
          { options: ['Have', 'Has', 'Do'], answer: 'Have', explain: 'Segunda pregunta con you → Have you got?' },
          { options: ['haven\'t', 'hasn\'t', '\'ve'], answer: 'haven\'t', explain: 'No → I haven\'t got.' },
          { options: ['got', 'get', 'have'], answer: 'got', explain: 'Has your friend got — got siempre al final.' },
          { options: ['\'s', '\'ve', 'hasn\'t'], answer: '\'s', explain: 'Yes, she\'s got it — 3.ª persona afirmativa.' },
        ],
      },
      {
        id: 'l4',
        title: 'Posesiones en primera persona',
        tag: 'Sin opciones',
        intro: 'Completa con la forma correcta de have got.',
        type: 'freeText',
        scene: 'Cuestionario de perfil del estudiante en WeLearn',
        text: 'I [[0]] (have got, I) a smartphone. My teacher [[1]] (has got, she) a lot of experience. We [[2]] (have got, we) class on Mondays. [[3]] (question: Have) you got a quiet place to study? My friend [[4]] (hasn\'t got) a dictionary. [[5]] (question: Has) the school got an app?',
        blanks: [
          { answer: '\'ve got', accepted: ['\'ve got', 'have got', "i've got", "i have got"], explain: 'I\'ve got — 1.ª persona afirmativa.' },
          { answer: '\'s got', accepted: ['\'s got', 'has got', "she's got", "she has got"], explain: 'She\'s got — 3.ª persona afirmativa.' },
          { answer: '\'ve got', accepted: ['\'ve got', 'have got', "we've got", "we have got"], explain: 'We\'ve got — 1.ª persona plural.' },
          { answer: 'Have', accepted: ['Have', 'have'], explain: 'Have you got? — pregunta con you.' },
          { answer: 'hasn\'t got', accepted: ["hasn't got", "has not got"], explain: 'He/she hasn\'t got — negativa 3.ª persona.' },
          { answer: 'Has', accepted: ['Has', 'has'], explain: 'Has...got? — pregunta 3.ª persona.' },
        ],
      },
      {
        id: 'l5',
        title: 'Construyendo frases',
        tag: 'Producción',
        intro: 'Escribe frases completas con have got.',
        type: 'write',
        items: [
          {
            scene: 'Posesión personal',
            prompt: 'Escribe: "Tengo un cuaderno nuevo." (I / have got / a new notebook)',
            answer: 'I\'ve got a new notebook.',
            accepted: ['i\'ve got a new notebook', 'i have got a new notebook', 'i\'ve got a new notebook.'],
            explain: 'I\'ve got a new notebook. — contracción I\'ve got.',
          },
          {
            scene: 'Descripción de otro',
            prompt: 'Escribe: "Ella tiene ojos marrones." (She / has got / brown eyes)',
            answer: 'She\'s got brown eyes.',
            accepted: ['she\'s got brown eyes', 'she has got brown eyes', 'she\'s got brown eyes.'],
            explain: 'She\'s got brown eyes. — 3.ª persona: \'s got.',
          },
          {
            scene: 'Pregunta a un compañero',
            prompt: 'Escribe: "¿Tienes un diccionario?" (Have / you / got / a dictionary?)',
            answer: 'Have you got a dictionary?',
            accepted: ['have you got a dictionary', 'have you got a dictionary?'],
            explain: 'Have you got a dictionary? — auxiliar al inicio.',
          },
          {
            scene: 'Negativa',
            prompt: 'Escribe: "Él no tiene coche." (He / hasn\'t got / a car)',
            answer: 'He hasn\'t got a car.',
            accepted: ['he hasn\'t got a car', 'he has not got a car', 'he hasn\'t got a car.'],
            explain: 'He hasn\'t got a car. — negativa 3.ª persona.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Mi perfil en WeLearn',
        tag: 'Reto final',
        intro: 'Escribe sobre tus posesiones y las de alguien que conoces.',
        type: 'write',
        items: [
          {
            scene: 'Tus posesiones',
            prompt: 'Write 2 sentences about what you have got (phone, notebook, etc.).',
            answer: 'I\'ve got a smartphone. I\'ve got an English notebook.',
            accepted: ['i\'ve got', 'i have got'],
            explain: 'I\'ve got [thing]. Use contractions: I\'ve got, not I have got (both correct but contractions are more natural).',
          },
          {
            scene: 'Descripción de un amigo',
            prompt: 'Write what your friend has got: My friend ___ got ___.',
            answer: 'My friend\'s got a great memory.',
            accepted: ['my friend\'s got', 'my friend has got'],
            explain: 'My friend\'s got = My friend has got — 3.ª persona, contracción \'s got.',
          },
          {
            scene: 'Pregunta a tu compañero',
            prompt: 'Write a question to your classmate: Have you got ___?',
            answer: 'Have you got a pen?',
            accepted: ['have you got'],
            explain: 'Have you got [something]? — pregunta directa con have you got.',
          },
        ],
      },
    ],
  },
}

export default topic
