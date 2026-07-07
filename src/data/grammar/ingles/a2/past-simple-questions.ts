import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'past-simple-questions',
  order: '04',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'Preguntas y Negativos en Past Simple A2',
  shortTitle: 'Did / Didn\'t',
  metaTitle: 'Did y Didn\'t en Past Simple A2 — Preguntas y Negación',
  description:
    'Las preguntas y negativos del past simple usan el auxiliar "did/didn\'t" con el verbo en su forma base (infinitivo sin to). Este es uno de los errores más comunes: muchos estudiantes siguen conjugando el verbo principal cuando ya pusieron "did". Con "did", el verbo vuelve a su forma base.',
  lead: 'Domina did y didn\'t para hacer preguntas y oraciones negativas en pasado — y evita el error de conjugar doble.',
  outcomes: [
    'Forma preguntas con Did + sujeto + verbo base',
    'Niega correctamente con didn\'t + verbo base',
    'Evita el error "did she went" → "did she go"',
    'Hace preguntas con Wh- en pasado: What did you do?',
  ],

  guide: {
    goal: 'Usar did/didn\'t para hacer preguntas y negativos en past simple, sin conjugar el verbo principal.',
    model: 'Did you see the film? / She didn\'t come to class. / What did they do?',
    formula: 'Did + subject + base verb? / Subject + didn\'t + base verb.',
    decisions: [
      'Para preguntar: Did + sujeto + verbo base (¡no -ed, no irregular!)',
      'Para negar: sujeto + didn\'t + verbo base (¡no -ed, no irregular!)',
      'Con to be: NO uses "did" — usa was/were directamente → Was she late? / They weren\'t home.',
      'Respuesta corta afirmativa: Yes, I/you/he/she/we/they did.',
      'Respuesta corta negativa: No, I/you/he/she/we/they didn\'t.',
    ],
    table: [
      ['Tipo', 'Estructura', 'Ejemplo'],
      ['Pregunta', 'Did + sujeto + verbo base?', 'Did you go to the party?'],
      ['Negativo', 'Sujeto + didn\'t + verbo base', 'I didn\'t go to the party.'],
    ],
    mistakes: [
      '"Did she went?" ❌ → "Did she go?" ✓ — "did" ya marca el pasado; el verbo vuelve a base.',
      '"She didn\'t went" ❌ → "She didn\'t go" ✓ — mismo principio con la negación.',
      '"Did you were there?" ❌ → "Were you there?" ✓ — "to be" no usa "did".',
    ],
  },

  seo: [
    {
      heading: '¿Por qué se usa "did" en las preguntas y negativos del past simple?',
      paragraphs: [
        'En inglés, las preguntas y negativos necesitan un auxiliar que "lleve" el tiempo verbal. En pasado, ese auxiliar es "did" (y "didn\'t" para negaciones). Una vez que aparece "did/didn\'t", el verbo principal vuelve a su forma base sin ninguna conjugación adicional.',
        'Esto es radicalmente diferente al español, donde el verbo principal cambia: "¿Fuiste?" vs "Did you go?" En inglés, el verbo "go" no cambia — es "did" quien indica que estamos en pasado.',
      ],
    },
    {
      heading: 'Estructura de preguntas con did',
      paragraphs: [
        'La estructura es: Did + sujeto + verbo en forma base + complemento? Esta estructura es igual para todos los sujetos — no importa si es I, she, they o we.',
        'Ejemplos: Did you call me? / Did she study for the exam? / Did they enjoy the concert? / Did he go to work yesterday?',
        'Para preguntas con palabras Wh- (what, where, when, who, why, how), el orden es: Wh- + did + sujeto + verbo base? → What did you do? / Where did she go? / Why did they leave early?',
      ],
      examples: [
        ['Tipo de pregunta', 'Ejemplo'],
        ['Sí/No', 'Did you watch the game?'],
        ['What', 'What did you watch?'],
        ['Where', 'Where did she go last night?'],
        ['When', 'When did they arrive?'],
        ['Why', 'Why did he leave early?'],
      ],
    },
    {
      heading: 'Estructura de negativos con didn\'t',
      paragraphs: [
        'La forma negativa es: sujeto + didn\'t (did not) + verbo en forma base. "Didn\'t" es igual para todos los sujetos.',
        'Ejemplos: I didn\'t go to the party. / She didn\'t study enough. / They didn\'t enjoy the film. / He didn\'t call me.',
        'La forma completa "did not" se usa en contextos formales o para dar énfasis: "I did NOT say that!" En conversación normal, "didn\'t" es la norma.',
      ],
    },
    {
      heading: 'La excepción importante: verbo "to be"',
      paragraphs: [
        'El verbo "to be" (was/were) no usa "did" para preguntas y negativos. En su lugar, invierte el auxiliar con el sujeto directamente: Was she tired? (NO: Did she be tired?) / Were they at home? (NO: Did they be at home?)',
        'Negativo: She wasn\'t tired. / They weren\'t at home. Este es un error muy común — recuerda que "was/were" son sus propios auxiliares y no necesitan "did".',
      ],
    },
    {
      heading: 'El error más común: conjugar dos veces',
      paragraphs: [
        'El error número uno en A2 es usar "did" + verbo conjugado: "Did she went?" o "He didn\'t went." Este error ocurre porque el estudiante ya está pensando en pasado y "congela" el verbo en su forma pasada, sin darse cuenta de que "did" ya cumplió esa función.',
        'Manera de recordarlo: "did" es el jefe del pasado. Cuando "did" está en la oración, el verbo principal pierde su forma pasada y vuelve a ser un infinitivo simple. "Did she GO?" — "go", no "went".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Did/didn\'t para preguntas y negativos en past simple.',
    graphicPrompt: 'Diálogos de conversación con preguntas y respuestas sobre el pasado.',
    scene: [
      ['Did you call me yesterday?', '¿Me llamaste ayer?'],
      ['No, I didn\'t call you. I\'m sorry!', 'No, no te llamé. ¡Lo siento!'],
      ['Where did she go last night?', '¿Adónde fue ella anoche?'],
      ['She didn\'t tell me.', 'Ella no me dijo.'],
      ['Did they enjoy the concert?', '¿Disfrutaron el concierto?'],
      ['Yes, they did! It was amazing.', '¡Sí! Fue increíble.'],
      ['What did you do on Saturday?', '¿Qué hiciste el sábado?'],
      ['I didn\'t do much — I stayed home.', 'No hice mucho — me quedé en casa.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['did + base verb (not past)', 'didn\'t + base verb', 'to be: no did'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de did/didn\'t o la estructura completa.',
        type: 'choice',
        items: [
          {
            scene: 'Preguntando sobre el fin de semana',
            lines: [['', '___ you watch the match on Sunday?']],
            options: ['Did', 'Does', 'Were', 'Have'],
            answer: 'Did',
            explain: 'Preguntas en past simple usan "Did" para todos los sujetos (excepto to be).',
          },
          {
            scene: 'Hablando de lo que no hiciste',
            lines: [['', 'I ___ finish the report on time.']],
            options: ['didn\'t', 'don\'t', 'wasn\'t', 'haven\'t'],
            answer: 'didn\'t',
            explain: '"Didn\'t" + verbo base para negar en past simple.',
          },
          {
            scene: 'Error común — elige la correcta',
            lines: [['', '___  she ___ to the meeting?']],
            options: ['Did / go', 'Did / went', 'Was / go', 'Does / go'],
            answer: 'Did / go',
            explain: '"Did" + verbo BASE — "go", no "went". "Did" ya indica el pasado.',
          },
          {
            scene: 'Conversación sobre ayer',
            lines: [['', 'He ___ come to the party because he was sick.']],
            options: ['didn\'t', 'don\'t', 'wasn\'t', 'not'],
            answer: 'didn\'t',
            explain: 'Negativo: "didn\'t" + verbo base "come".',
          },
          {
            scene: 'Pregunta con Wh-',
            lines: [['', 'What ___ they ___ after the concert?']],
            options: ['did / do', 'did / did', 'were / do', 'does / do'],
            answer: 'did / do',
            explain: 'Wh- + did + sujeto + verbo BASE: "What did they do?"',
          },
          {
            scene: 'Respuesta corta',
            lines: [
              ['A:', 'Did you enjoy the film?'],
              ['B:', 'Yes, I ___.'],
            ],
            options: ['did', 'do', 'enjoyed', 'was'],
            answer: 'did',
            explain: 'Respuesta corta afirmativa: "Yes, I did." No se repite el verbo principal.',
          },
          {
            scene: 'La excepción de to be',
            lines: [['', '___ the hotel comfortable?']],
            options: ['Was', 'Did be', 'Did was', 'Were'],
            answer: 'Was',
            explain: '"To be" no usa "did" — "Was the hotel comfortable?" no "Did the hotel be comfortable?"',
          },
          {
            scene: 'Pregunta directa',
            lines: [['', 'Where ___ you ___ for dinner last night?']],
            options: ['did / go', 'did / went', 'were / go', 'did / gone'],
            answer: 'did / go',
            explain: 'Where + did + you + go (base)? — "went" es incorrecto con did.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pregunta y negativo juntos',
        tag: '2 espacios',
        intro: 'Forma la pregunta y la respuesta negativa correctas.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo entre amigos',
            lines: [
              ['A:', '[[0]] you see the game last night?'],
              ['B:', 'No, I [[1]] have time. I was working.'],
            ],
            blanks: [
              { options: ['Did', 'Were', 'Do', 'Have'], answer: 'Did', explain: 'Pregunta: "Did you see…?" — auxiliar past simple.' },
              { options: ['didn\'t', 'don\'t', 'wasn\'t', 'haven\'t'], answer: 'didn\'t', explain: '"Didn\'t have time" — negativo + verbo base.' },
            ],
          },
          {
            scene: 'En la oficina',
            lines: [
              ['Manager:', '[[0]] everyone attend the meeting?'],
              ['Employee:', 'No, Carlos [[1]] come — he was on a call.'],
            ],
            blanks: [
              { options: ['Did', 'Were', 'Do', 'Was'], answer: 'Did', explain: '"Did everyone attend?" — Did + sujeto + base verb.' },
              { options: ['didn\'t', 'don\'t', 'wasn\'t', 'not'], answer: 'didn\'t', explain: '"Carlos didn\'t come" — didn\'t + verbo base.' },
            ],
          },
          {
            scene: 'Recordando las vacaciones',
            lines: [
              ['A:', 'Where [[0]] you go on holiday this year?'],
              ['B:', 'We [[1]] go anywhere — we stayed home.'],
            ],
            blanks: [
              { options: ['did', 'were', 'do', 'have'], answer: 'did', explain: '"Where did you go?" — Wh- + did + sujeto + base.' },
              { options: ['didn\'t', 'don\'t', 'weren\'t', 'haven\'t'], answer: 'didn\'t', explain: '"We didn\'t go anywhere" — negativo + base.' },
            ],
          },
          {
            scene: 'Conversación sobre el restaurante',
            lines: [
              ['A:', '[[0]] you like the food?'],
              ['B:', 'Yes, I [[1]]! It was delicious.'],
            ],
            blanks: [
              { options: ['Did', 'Do', 'Were', 'Have'], answer: 'Did', explain: '"Did you like…?" — past simple question.' },
              { options: ['did', 'do', 'liked', 'was'], answer: 'did', explain: 'Respuesta corta: "Yes, I did." — no se repite "like".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conversación sobre el fin de semana',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta para completar este diálogo.',
        type: 'guidedText',
        scene: 'Elige la forma correcta para completar este diálogo.',
        text: '— Hey! [[0]] you have a good weekend? — Yes, mostly! But I [[1]] sleep well on Saturday night. The neighbors were noisy. — Oh no! [[2]] you talk to them? — No, I [[3]]. I was too tired. — What [[4]] you do during the day? — I [[5]] visit the new museum downtown. It [[6]] open — it was closed for a private event.',
        blanks: [
          { options: ['Did', 'Were', 'Do', 'Have'], answer: 'Did', explain: '"Did you have a good weekend?" — pregunta past simple.' },
          { options: ['didn\'t', 'don\'t', 'wasn\'t', 'not'], answer: 'didn\'t', explain: '"I didn\'t sleep well" — negativo + base verb.' },
          { options: ['Did', 'Were', 'Do', 'Have'], answer: 'Did', explain: '"Did you talk to them?" — otra pregunta past simple.' },
          { options: ['didn\'t', 'don\'t', 'wasn\'t', 'not'], answer: 'didn\'t', explain: 'Respuesta corta negativa: "No, I didn\'t."' },
          { options: ['did', 'were', 'do', 'have'], answer: 'did', explain: '"What did you do?" — Wh- question.' },
          { options: ['did', 'didn\'t', 'wasn\'t', 'not'], answer: 'did', explain: 'Hmm — o podría ser "didn\'t": "I did visit" (énfasis) o "I didn\'t visit". Elegimos "did" para la frase afirmativa en contexto.' },
          { options: ['wasn\'t', 'didn\'t', 'weren\'t', 'not'], answer: 'wasn\'t', explain: '"To be" negativo: "It wasn\'t open" — no "It didn\'t open" (open aquí es adjetivo).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe las preguntas y negativos',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de did/didn\'t + verbo base.',
        type: 'freeText',
        scene: 'Escribe la forma correcta de did/didn\'t + verbo base.',
        text: '— [[0]] (Did / you / go) to Maria\'s party? — No, I [[1]] (not / go). I had plans. — Oh! What [[2]] (did / you / do)? — I [[3]] (not / do) anything special. I just rested. — [[4]] (Did / you / enjoy) the rest?',
        blanks: [
          { answer: 'Did you go', accepted: ['did you go', 'Did you go'], explain: 'Did + you + verbo base "go".' },
          { answer: 'didn\'t go', accepted: ["didn't go", 'did not go'], explain: "Didn't + base verb: didn't go." },
          { answer: 'did you do', accepted: ['did you do', 'What did you do'], explain: 'What + did + you + do.' },
          { answer: 'didn\'t do', accepted: ["didn't do", 'did not do'], explain: "Didn't + do (base)." },
          { answer: 'Did you enjoy', accepted: ['Did you enjoy', 'did you enjoy'], explain: 'Did + you + enjoy (base).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe preguntas y negativos en past simple.',
        type: 'write',
        items: [
          {
            scene: 'Curiosidad sobre alguien',
            prompt: 'Escribe una pregunta con "Did...?" para hacerle a un amigo sobre su fin de semana.',
            answer: 'Did you go out on Saturday?',
            accepted: ['did you', 'did she', 'did he', 'did they', 'did we'],
            explain: 'Ejemplo: Did you go to the concert? / Did she call you? / Did they enjoy the trip?',
          },
          {
            scene: 'Algo que no hiciste',
            prompt: 'Escribe qué NO hiciste ayer que tenías planeado.',
            answer: 'I didn\'t finish the report I was supposed to send.',
            accepted: ["didn't", "did not", "didn't go", "didn't study", "didn't call", "didn't finish", "didn't eat"],
            explain: 'Ejemplo: I didn\'t exercise. / She didn\'t come to class. / We didn\'t have time.',
          },
          {
            scene: 'Pregunta de información',
            prompt: 'Escribe una pregunta con "What did you...?" o "Where did you...?"',
            answer: 'What did you do after school yesterday?',
            accepted: ['what did you', 'where did you', 'why did you', 'when did you', 'how did you', 'who did you'],
            explain: 'Ejemplo: Where did you go? / What did she say? / Why did they leave early?',
          },
          {
            scene: 'Respuesta honesta',
            prompt: 'Escribe una respuesta negativa corta a "Did you study this week?" y añade por qué.',
            answer: 'No, I didn\'t. I had too much work.',
            accepted: ["no, i didn't", "no i didn't", "i didn't study"],
            explain: 'Respuesta corta: "No, I didn\'t." + razón. Ejemplo: No, I didn\'t. I was very busy.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: El gran interrogatorio',
        tag: 'Producción libre',
        intro: 'Imagina que eres detective y debes hacer preguntas a un sospechoso sobre lo que hizo ayer. Escribe 3 preguntas usando "did".',
        type: 'write',
        items: [
          {
            scene: 'Interrogatorio — primera pregunta',
            prompt: 'Pregunta al sospechoso dónde estuvo ayer por la tarde (usa "Where did…?").',
            answer: 'Where did you go yesterday afternoon?',
            accepted: ['where did you', 'where did he', 'where did she'],
            explain: 'Ejemplo: Where did you go? / Where did you spend the afternoon?',
          },
          {
            scene: 'Interrogatorio — segunda pregunta',
            prompt: 'Pregunta con quién estuvo o qué hizo (usa "Who did you…?" o "What did you…?").',
            answer: 'Who did you meet at the restaurant?',
            accepted: ['who did you', 'what did you', 'who did he', 'what did he'],
            explain: 'Ejemplo: What did you do at 8pm? / Who did you call that night?',
          },
          {
            scene: 'Interrogatorio — negativo',
            prompt: 'El sospechoso dice que no hizo algo importante. Escribe su respuesta negativa.',
            answer: 'I didn\'t go near that place. I was at home all evening.',
            accepted: ["i didn't", "i did not", "she didn't", "he didn't"],
            explain: 'Ejemplo: I didn\'t see anyone. / I didn\'t leave the house after 6pm.',
          },
        ],
      },
    ],
  },
}

export default topic
