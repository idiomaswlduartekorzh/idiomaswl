import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperative',
  order: '20',
  color: '#0369a1',
  category: 'Verbs',
  level: 'A1',
  title: 'El imperativo en inglés A1',
  shortTitle: 'Imperativo',
  metaTitle: 'Imperativo en inglés A1 | Órdenes, instrucciones y prohibiciones',
  description:
    'Aprende el imperativo en inglés A1 para dar órdenes, instrucciones y prohibiciones. Domina la forma afirmativa (Listen!) y negativa (Don\'t talk!), y los casos de uso más comunes.',
  lead: 'El imperativo en inglés es el más simple de la gramática: usa el verbo en forma base, sin sujeto. "Listen!" / "Sit down!" / "Don\'t run!" Para la negativa, solo añade Don\'t antes del verbo.',
  outcomes: [
    'Formar imperativos afirmativos: Open your book. / Listen carefully.',
    'Formar imperativos negativos: Don\'t talk. / Don\'t be late.',
    'Usar el imperativo para instrucciones, órdenes y señales.',
  ],
  guide: {
    goal: 'Dar instrucciones y órdenes usando el imperativo afirmativo y negativo en inglés.',
    model: 'Open your book. / Sit down. / Don\'t run. / Don\'t be late.',
    formula: 'Afirmativa: verb (base) + ... | Negativa: Don\'t + verb (base) + ...',
    decisions: [
      'Afirmativa: solo el verbo base, sin sujeto: Listen! / Repeat! / Write your name.',
      'Negativa: Don\'t + verbo base: Don\'t talk! / Don\'t open the book yet.',
      'Con to be: Be quiet! / Be careful! / Don\'t be rude!',
      'Para suavizar: Please sit down. / Please don\'t open it yet.',
      'NUNCA: "You listen!" para dar una orden directa — el sujeto se omite: Listen!',
    ],
    table: [
      ['Tipo', 'Estructura', 'Ejemplos A1'],
      ['Afirmativo', 'verbo base', 'Listen! / Open your book! / Write!'],
      ['Negativo', 'Don\'t + verbo base', 'Don\'t talk! / Don\'t run! / Don\'t be late!'],
      ['Con please', 'Please + verbo / Don\'t + ... + please', 'Please sit down. / Don\'t talk, please.'],
    ],
    mistakes: [
      '"You listen!" ❌ → Listen! ✓ — no se pone sujeto en el imperativo.',
      '"Don\'t to talk!" ❌ → Don\'t talk! ✓ — Don\'t + verbo base (sin to).',
      '"Be don\'t late!" ❌ → Don\'t be late! ✓ — negativa de to be: Don\'t be.',
    ],
  },
  seo: [
    {
      heading: 'El imperativo en inglés: estructura y uso en A1',
      paragraphs: [
        'El imperativo en inglés es una de las formas más fáciles: se usa el verbo en forma base sin añadir sujeto. Para la afirmativa: Listen! / Open your book! / Repeat after me. Para la negativa: Don\'t talk! / Don\'t open it yet. Esta estructura es idéntica para todas las personas.',
        'El imperativo aparece constantemente en A1: instrucciones del libro, órdenes del profesor, señales en la calle (Stop! / Don\'t park here.), recetas y manuales. Reconocerlo y usarlo correctamente es fundamental desde el primer nivel.',
      ],
    },
    {
      heading: 'Imperativo afirmativo y negativo',
      paragraphs: [
        'Para el imperativo afirmativo, el verbo va en forma base sin "to" y sin sujeto: Sit down. / Write your name. / Close the door. Para la negativa, simplemente se añade "Don\'t" al inicio: Don\'t sit here. / Don\'t write yet. / Don\'t close the door.',
        'Con el verbo to be, la estructura es: Be careful! / Be quiet! / Don\'t be late! / Don\'t be rude. Este es el único caso donde se ve "be" (la forma base de to be) en imperativo, y es importante memorizarlo porque es frecuente.',
      ],
    },
    {
      heading: 'Please: cómo suavizar el imperativo',
      paragraphs: [
        'El imperativo puede sonar brusco en algunos contextos. Para suavizarlo se usa "please" al inicio o al final: Please come in. / Sit down, please. Esto es especialmente importante en contextos formales o cuando no tienes autoridad directa sobre la persona.',
        'En clase, el profesor típicamente da órdenes sin please porque tiene autoridad: Listen! / Repeat! / Write! Pero en situaciones cotidianas, un "please" marca la diferencia entre una petición educada y una orden.',
      ],
    },
  ],
  visual: {
    mode: 'table',
    teacherLens: 'El estudiante aprende a reconocer y producir imperativos en contexto de clase y vida diaria.',
    graphicPrompt: 'Tarjetas de instrucciones de clase: Open! / Close! / Listen! / Don\'t talk! / Sit down! / Stand up!',
    scene: [
      ['Instrucciones de clase', 'Listen! / Repeat! / Open your book! / Write!'],
      ['Órdenes negativas', 'Don\'t talk! / Don\'t use your phone! / Don\'t be late!'],
      ['Con please (cortesía)', 'Please sit down. / Please don\'t open it yet.'],
      ['Con to be', 'Be quiet! / Be careful! / Don\'t be rude!'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['verbo base sin sujeto', 'Don\'t + verbo base', 'Be / Don\'t be', 'please para cortesía'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento del imperativo',
        tag: 'Opción múltiple',
        intro: 'Elige la forma imperativa correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Instrucción de clase',
            lines: [['Teacher', '___ your book to page 10.']],
            options: ['Open', 'Opens', 'Opening', 'To open'],
            answer: 'Open',
            explain: 'Imperativo: verbo base sin sujeto → Open.',
          },
          {
            scene: 'Prohibición en clase',
            lines: [['Teacher', '___ your phone in class.']],
            options: ['Don\'t use', 'Not use', 'Don\'t to use', 'No use'],
            answer: 'Don\'t use',
            explain: 'Negativa: Don\'t + verbo base → Don\'t use.',
          },
          {
            scene: 'Instrucción con to be',
            lines: [['Teacher', '___ quiet, please!']],
            options: ['Be', 'Are', 'Is', 'Do be'],
            answer: 'Be',
            explain: 'Imperativo de to be: Be (forma base) → Be quiet!',
          },
          {
            scene: 'Prohibición con to be',
            lines: [['Teacher', '___ late tomorrow.']],
            options: ['Don\'t be', 'Not be', 'Don\'t are', 'Be not'],
            answer: 'Don\'t be',
            explain: 'Negativa de to be: Don\'t be → Don\'t be late.',
          },
          {
            scene: 'Ejercicio oral',
            lines: [['David', '___ the sentence: "I am a student."']],
            options: ['Repeat', 'Repeats', 'To repeat', 'Repeating'],
            answer: 'Repeat',
            explain: 'Imperativo: Repeat! — verbo base.',
          },
          {
            scene: 'Señal de tráfico',
            lines: [['Sign', '___ here! It\'s a no-parking zone.']],
            options: ['Don\'t park', 'Not park', 'No park', 'Parks not'],
            answer: 'Don\'t park',
            explain: 'Don\'t park — negativa imperativa.',
          },
          {
            scene: 'Petición educada',
            lines: [['Student', '___  sit here? (polite request)']],
            options: ['Please let me', 'Let me please', 'Please don\'t', 'Letting me'],
            answer: 'Please let me',
            explain: 'Please + imperativo → Please let me sit here.',
          },
          {
            scene: 'Instrucción de ejercicio',
            lines: [['Teacher', '___ the word in the correct column.']],
            options: ['Write', 'Writes', 'Writing', 'To write'],
            answer: 'Write',
            explain: 'Write the word — imperativo, verbo base.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Instrucción completa',
        tag: '2 espacios',
        intro: 'Elige el verbo y completa la instrucción de clase.',
        type: 'dual',
        items: [
          {
            scene: 'Inicio de lección',
            lines: [['Teacher', '[[0]] your books and [[1]] page 5.']],
            blanks: [
              { options: ['Open', 'Opens', 'Don\'t open'], answer: 'Open', explain: 'Imperativo afirmativo: Open your books.' },
              { options: ['find', 'finds', 'finding'], answer: 'find', explain: 'Open your books and find page 5.' },
            ],
          },
          {
            scene: 'Regla de clase',
            lines: [['David', '[[0]] late and [[1]] your homework.']],
            blanks: [
              { options: ['Don\'t be', 'Be not', 'Not be'], answer: 'Don\'t be', explain: 'Don\'t be late — negativa de to be.' },
              { options: ['do', 'does', 'doing'], answer: 'do', explain: 'do your homework — imperativo afirmativo.' },
            ],
          },
          {
            scene: 'Ejercicio de pronunciación',
            lines: [['Teacher', '[[0]] and [[1]] the word after me.']],
            blanks: [
              { options: ['Listen', 'Listens', 'Don\'t listen'], answer: 'Listen', explain: 'Listen — imperativo, verbo base.' },
              { options: ['repeat', 'repeats', 'repeating'], answer: 'repeat', explain: 'Listen and repeat — dos imperativos.' },
            ],
          },
          {
            scene: 'Instrucción de examen',
            lines: [['Zhanna', '[[0]] your phone and [[1]] your name.']],
            blanks: [
              { options: ['Turn off', 'Turning off', 'Turn on'], answer: 'Turn off', explain: 'Turn off your phone — imperativo.' },
              { options: ['write', 'writes', 'writing'], answer: 'write', explain: 'write your name — imperativo.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Normas de la clase WeLearn',
        tag: 'Opciones',
        intro: 'Elige la forma imperativa correcta para completar las normas de clase.',
        type: 'guidedText',
        scene: 'Normas de la clase de inglés en WeLearn — primer día',
        text: 'Welcome to WeLearn! [[0]] on time to every class. [[1]] your notebooks with you. [[2]] on your phone during class. [[3]] questions — there are no bad questions. [[4]] careful with grammar, it matters. [[5]] your homework before class.',
        blanks: [
          { options: ['Be', 'Don\'t be', 'Are'], answer: 'Be', explain: 'Be on time — imperativo de to be.' },
          { options: ['Bring', 'Don\'t bring', 'Bringing'], answer: 'Bring', explain: 'Bring your notebooks — imperativo afirmativo.' },
          { options: ['Don\'t go', 'Go', 'Be'], answer: 'Don\'t go', explain: 'Don\'t go on your phone — negativa.' },
          { options: ['Ask', 'Don\'t ask', 'Asking'], answer: 'Ask', explain: 'Ask questions — imperativo afirmativo.' },
          { options: ['Be', 'Don\'t be', 'Is'], answer: 'Be', explain: 'Be careful — Be + adjective.' },
          { options: ['Do', 'Don\'t do', 'Does'], answer: 'Do', explain: 'Do your homework — imperativo.' },
        ],
      },
      {
        id: 'l4',
        title: 'Señales e instrucciones',
        tag: 'Sin opciones',
        intro: 'Escribe el imperativo correcto: afirmativo o negativo.',
        type: 'freeText',
        scene: 'Señales y reglas en WeLearn',
        text: '___ here (sit — afirmativo). ___ in class (eat — negativo). ___ your hand if you have a question (raise — afirmativo). ___ late to the exam (be — negativo). ___ the dialogue (listen — afirmativo). ___ — this is an exam (talk — negativo).',
        blanks: [
          { answer: 'Sit', accepted: ['Sit', 'sit'], explain: 'Sit here — imperativo afirmativo.' },
          { answer: 'Don\'t eat', accepted: ["Don't eat", "don't eat", "Do not eat"], explain: 'Don\'t eat in class — negativa.' },
          { answer: 'Raise', accepted: ['Raise', 'raise'], explain: 'Raise your hand — imperativo.' },
          { answer: 'Don\'t be', accepted: ["Don't be", "don't be", "Do not be"], explain: 'Don\'t be late — Don\'t be + adj.' },
          { answer: 'Listen', accepted: ['Listen', 'listen'], explain: 'Listen to the dialogue — imperativo.' },
          { answer: 'Don\'t talk', accepted: ["Don't talk", "don't talk", "Do not talk"], explain: 'Don\'t talk — negativa imperativa.' },
        ],
      },
      {
        id: 'l5',
        title: 'Escribiendo instrucciones',
        tag: 'Producción',
        intro: 'Escribe el imperativo completo en inglés.',
        type: 'write',
        items: [
          {
            scene: 'Instrucción de clase',
            prompt: 'Escribe: "Abre tu libro." (Open / your / book)',
            answer: 'Open your book.',
            accepted: ['open your book', 'open your book.'],
            explain: 'Open your book. — imperativo afirmativo.',
          },
          {
            scene: 'Prohibición',
            prompt: 'Escribe: "No uses tu teléfono." (Don\'t / use / your phone)',
            answer: 'Don\'t use your phone.',
            accepted: ["don't use your phone", "don't use your phone.", "do not use your phone"],
            explain: 'Don\'t use your phone. — Don\'t + verbo base.',
          },
          {
            scene: 'Instrucción con to be',
            prompt: 'Escribe: "Sé puntual." (Be / punctual)',
            answer: 'Be punctual.',
            accepted: ['be punctual', 'be punctual.'],
            explain: 'Be punctual. — imperativo de to be.',
          },
          {
            scene: 'Prohibición con to be',
            prompt: 'Escribe: "No llegues tarde." (Don\'t / be / late)',
            answer: 'Don\'t be late.',
            accepted: ["don't be late", "don't be late.", "do not be late"],
            explain: 'Don\'t be late. — Don\'t be + adjective.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Reglas de mi clase ideal',
        tag: 'Reto final',
        intro: 'Escribe las reglas de tu clase de inglés ideal.',
        type: 'write',
        items: [
          {
            scene: 'Normas positivas',
            prompt: 'Write 2 affirmative rules for your English class (what students SHOULD do).',
            answer: 'Listen carefully. Ask questions.',
            accepted: ['listen', 'speak', 'repeat', 'write', 'read', 'practice', 'study', 'ask', 'bring'],
            explain: 'Use verb (base form) without subject: Listen! / Speak English! / Ask questions!',
          },
          {
            scene: 'Normas negativas',
            prompt: 'Write 2 negative rules (what students should NOT do): Don\'t ___.',
            answer: 'Don\'t use your phone. Don\'t be late.',
            accepted: ["don't"],
            explain: 'Don\'t + verb (base): Don\'t talk, Don\'t eat, Don\'t be rude.',
          },
          {
            scene: 'Instrucción de examen',
            prompt: 'Write the instructions for an exam: 1) Turn off ___, 2) Write ___.',
            answer: 'Turn off your phone. Write your name.',
            accepted: ['turn off', 'write your name'],
            explain: 'Turn off your phone. / Write your name. — imperative for exam instructions.',
          },
        ],
      },
    ],
  },
}

export default topic
