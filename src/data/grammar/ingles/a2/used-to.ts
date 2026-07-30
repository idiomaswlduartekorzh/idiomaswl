import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'used-to-a2',
  order: '19',
  color: '#dc2626',
  category: 'Tiempo pasado',
  level: 'A2',
  title: 'Used to en Inglés A2: hábitos y estados del pasado',
  shortTitle: 'Used to',
  metaTitle: 'Used to en Inglés A2 — Hábitos y Estados del Pasado',
  description:
    '"Used to" describe hábitos, rutinas o estados del pasado que ya no existen. Es diferente al past simple porque subraya que algo era regular o permanente antes, pero ya cambió. Es una herramienta poderosa para contar tu historia personal.',
  lead: 'Habla de lo que hacías antes y ya no haces con "used to": el pasado que ya cambió.',
  outcomes: [
    'Usa "used to" para describir hábitos pasados que ya no existen',
    'Forma la negativa correctamente: "didn\'t use to" (sin -d)',
    'Forma preguntas: "Did you use to...?"',
    'Distingue "used to" del past simple',
  ],

  guide: {
    goal: 'Hablar de hábitos y estados del pasado que ya no ocurren usando "used to".',
    model: 'I used to play football every weekend. / She didn\'t use to like vegetables. / Did you use to live here?',
    formula: 'Sujeto + used to + verbo base / Sujeto + didn\'t use to + verbo base',
    decisions: [
      'Hábito o estado pasado que ya no existe → used to + verbo base',
      'Negativa → didn\'t use to + verbo base (sin -d en "use")',
      'Pregunta → Did + sujeto + use to + verbo base? (sin -d en "use")',
      'Respuesta corta: Yes, I did. / No, I didn\'t.',
      'Para hábitos presentes: "usually" o present simple (NO "use to" en presente)',
      'Para eventos únicos del pasado: past simple (NOT used to)',
    ],
    table: [
      ['Forma', 'Estructura', 'Ejemplo'],
      ['Afirmativa', 'sujeto + used to + verbo base', 'She used to live in Paris.'],
      ['Negativa', "sujeto + didn't use to + verbo base", "She didn't use to live here."],
      ['Interrogativa', 'Did + sujeto + use to + verbo base?', 'Did she use to live abroad?'],
      ['Respuesta corta', 'Yes, she did. / No, she didn\'t.', '—'],
    ],
    mistakes: [
      '"I didn\'t used to smoke." ❌ → "I didn\'t use to smoke." ✓ — Después de "didn\'t", "use" va sin -d.',
      '"I use to go to the gym." ❌ — "Used to" no existe en presente. Usa "I usually go to the gym."',
      '"I used to went there." ❌ → "I used to go there." ✓ — Siempre verbo en base (infinitivo sin "to").',
    ],
  },

  seo: [
    {
      heading: '¿Qué significa "used to" en inglés?',
      paragraphs: [
        '"Used to + infinitivo" describe hábitos, rutinas o estados del pasado que ya no existen en el presente. Al usarlo, se implica automáticamente un contraste con el presente: antes hacías algo, pero ahora ya no.',
        'Ejemplos: I used to play tennis. (Antes jugaba tenis → ahora ya no.) / We used to live in the countryside. (Antes vivíamos en el campo → ahora no.)',
      ],
    },
    {
      heading: 'Used to vs past simple: ¿cuándo usar cada uno?',
      paragraphs: [
        '"Used to" enfatiza que la acción era un hábito o estado repetido: I used to go to that school (lo hacía regularmente).',
        'El past simple puede ser una acción única: I went to that school in 2010 (una vez en un momento específico).',
        'Regla práctica: si puedes decir "solía hacerlo repetidamente en el pasado", usa "used to". Si fue una sola vez, usa past simple.',
      ],
      examples: [
        ['Estructura', 'Tipo de acción', 'Ejemplo'],
        ['used to', 'Hábito repetido en el pasado', 'She used to walk to school every day.'],
        ['past simple', 'Acción puntual en el pasado', 'She walked to school on Monday.'],
      ],
    },
    {
      heading: 'Negativa e interrogativa: cuidado con la -d',
      paragraphs: [
        'En afirmativa: "used to" (con -d). En negativa e interrogativa, el auxiliar "did/didn\'t" ya marca el pasado, así que se escribe "use to" sin -d.',
        '✅ I used to smoke. / ✅ I didn\'t use to smoke. / ✅ Did you use to smoke?',
        '❌ I didn\'t used to smoke. / ❌ Did you used to smoke? — Estos son errores muy frecuentes, incluso entre angloparlantes.',
      ],
    },
    {
      heading: '¿Cómo se usa "used to" en inglés?',
      paragraphs: [
        'Con "used to" + verbo en forma base, para hábitos o estados del pasado que ya no ocurren: "I used to smoke" (antes fumaba, ya no), "She used to live in Madrid". Equivale a "solía + infinitivo" o al imperfecto español ("fumaba", "vivía").',
      ],
    },
    {
      heading: '¿Cómo se hacen preguntas y negaciones con "used to"?',
      paragraphs: [
        'Con el auxiliar "did" y la forma base "use to": "Did you use to play football?", "I didn\'t use to like coffee". En negativo/pregunta se pierde la -d de "used". Otra opción de negación es "never used to".',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "used to" y el past simple?',
      paragraphs: [
        '"used to" enfatiza un hábito o estado repetido en el pasado que ya no existe ("I used to run every day"). El past simple narra un hecho puntual ("I ran yesterday"). Para acciones únicas se usa past simple, no "used to".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '"Used to" para hábitos del pasado vs presente: contraste y nostalgia.',
    graphicPrompt: 'Fotos "entonces vs ahora" mostrando cambios de hábitos: antes/ahora.',
    scene: [
      ['I used to wake up at 5 a.m.', 'Antes me despertaba a las 5 a.m.'],
      ["She didn't use to like coffee.", 'Antes no le gustaba el café.'],
      ['Did you use to play an instrument?', '¿Tocabas algún instrumento?'],
      ['We used to live in a small town.', 'Antes vivíamos en un pueblo pequeño.'],
      ['There used to be a cinema here.', 'Antes había un cine aquí.'],
      ["He didn't use to exercise at all.", 'Antes no hacía ejercicio para nada.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ["didn't use to vs didn't used to", 'used to vs past simple', 'present habits: usually'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta de "used to"',
        tag: 'Opción múltiple',
        intro: 'Selecciona la opción gramaticalmente correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de la infancia.',
            lines: [['Abuela', 'When I was young, I ___ climb trees every afternoon.']],
            options: ['used to', 'use to', 'was used to', 'am used to'],
            answer: 'used to',
            explain: 'Hábito pasado en afirmativa → "used to + base verb".',
          },
          {
            scene: 'Preguntando por hábitos pasados.',
            lines: [['Amigo', '___ you use to play video games when you were a kid?']],
            options: ['Did', 'Do', 'Were', 'Have'],
            answer: 'Did',
            explain: 'Pregunta con "used to" → "Did + sujeto + use to?"',
          },
          {
            scene: 'Hablando de cambios de vida.',
            lines: [['Carlos', "I ___ eat meat, but now I'm vegetarian."]],
            options: ['used to', 'use to', 'was used to', 'using to'],
            answer: 'used to',
            explain: 'Hábito pasado afirmativo → "used to".',
          },
          {
            scene: 'Negando un hábito pasado.',
            lines: [['María', "I ___ use to like coffee, but now I drink it every day."]],
            options: ["didn't", "don't", "wasn't", "haven't"],
            answer: "didn't",
            explain: "Negativa de 'used to' → 'didn't use to' (sin -d en 'use').",
          },
          {
            scene: 'Preguntando por hábitos.',
            lines: [['Tú', 'Did you use to ___ a lot when you lived in the mountains?']],
            options: ['hike', 'hiked', 'hiking', 'to hike'],
            answer: 'hike',
            explain: 'Después de "use to" → verbo en forma base (infinitivo sin "to").',
          },
          {
            scene: 'Contando sobre la escuela.',
            lines: [['Profesora', 'We ___ have 40 students in each class. Now we have 25.']],
            options: ['used to', 'were used to', 'use to', 'get used to'],
            answer: 'used to',
            explain: 'Estado pasado que ya cambió → "used to".',
          },
          {
            scene: 'Un error común que debes evitar.',
            lines: [['Estudiante', "I didn't ___ study English when I was in primary school."]],
            options: ['use to', 'used to', 'using to', 'to use'],
            answer: 'use to',
            explain: "Después de 'didn't', se usa 'use to' SIN -d. La -d ya está en 'didn't'.",
          },
          {
            scene: 'Describiendo un lugar que cambió.',
            lines: [['Guía', 'This street ___ be a market, but they built a shopping center here.']],
            options: ['used to', 'use to', 'was used to', 'is used to'],
            answer: 'used to',
            explain: 'Estado pasado (lo que era la calle) → "used to be".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Afirmativa, negativa e interrogativa',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de "used to" y el verbo indicado.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando de la infancia de Laura.',
            lines: [["", "Laura [[0]] use to study piano, but now she [[1]] the guitar."]],
            blanks: [
              { options: ["didn't", "don't", "wasn't", "haven't"], answer: "didn't", explain: "Negativa de 'used to': didn't + use to." },
              { options: ['plays', 'play', 'played', 'playing'], answer: 'plays', explain: "Hábito presente → present simple. 'Laura' = she → plays." },
            ],
          },
          {
            scene: 'Recordando cómo era el barrio.',
            lines: [['', 'There [[0]] to be a cinema on this street. Now there [[1]] a supermarket.']],
            blanks: [
              { options: ['used', 'use', 'was used', 'did use'], answer: 'used', explain: '"There used to be" = había/existía antes.' },
              { options: ['is', 'was', 'be', 'are'], answer: 'is', explain: 'Estado actual (presente) → "there is".' },
            ],
          },
          {
            scene: 'Preguntando sobre hábitos pasados.',
            lines: [['', '[[0]] your parents use to [[1]] you stories when you were little?']],
            blanks: [
              { options: ['Did', 'Do', 'Were', 'Have'], answer: 'Did', explain: 'Pregunta con "used to" → Did + sujeto + use to.' },
              { options: ['tell', 'told', 'telling', 'tells'], answer: 'tell', explain: 'Después de "use to" → verbo base: "tell".' },
            ],
          },
          {
            scene: 'Comparando el presente y el pasado.',
            lines: [['', 'I [[0]] to like vegetables, but I [[1]] them now.']],
            blanks: [
              { options: ["didn't use", "don't use", "wasn't used", "haven't used"], answer: "didn't use", explain: "'Didn't use to' = no hacía algo en el pasado. (sin -d en 'use')." },
              { options: ['love', 'loved', 'loving', 'to love'], answer: 'love', explain: "Actitud actual → present simple: 'I love them now'." },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Hábitos pasados de una persona',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma correcta de "used to".',
        type: 'guidedText',
        scene: 'Ramón describe cómo era su vida antes de mudarse a la ciudad.',
        text: 'When I lived in the countryside, life was very different. I [[0]] wake up at five in the morning every day. My family [[1]] have a small farm with chickens and cows. I [[2]] go to school by bicycle because there was no bus. We [[3]] spend our evenings together as a family, without mobile phones. I [[4]] watch TV much, but I read a lot of books.',
        blanks: [
          { options: ['used to', "didn't use to", 'use to', 'was used to'], answer: 'used to', explain: 'Hábito pasado afirmativo: "used to wake up".' },
          { options: ['used to', "didn't use to", 'use to', 'was used to'], answer: 'used to', explain: 'Estado pasado afirmativo: "used to have".' },
          { options: ['used to', "didn't use to", 'use to', 'was used to'], answer: 'used to', explain: 'Hábito pasado afirmativo: "used to go".' },
          { options: ['used to', "didn't use to", 'use to', 'was used to'], answer: 'used to', explain: 'Hábito pasado afirmativo: "used to spend".' },
          { options: ["didn't use to", 'used to', 'use to', 'was used to'], answer: "didn't use to", explain: "Hábito pasado negativo: 'didn't use to watch'. Note: 'much' va con negativos." },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de "used to" (afirmativa, negativa o interrogativa).',
        type: 'freeText',
        scene: 'Una entrevista sobre cómo era la vida antes de la pandemia.',
        text: "Interviewer: [[0]] you use to work from home before 2020? \nPaola: No, I [[1]] work from home at all. I [[2]] go to the office every day. \nInterviewer: And your company — [[3]] it use to have a strict schedule? \nPaola: Yes, we [[4]] start at 8 a.m. sharp, no exceptions.",
        blanks: [
          { answer: 'Did', explain: 'Pregunta con "used to" → Did + sujeto + use to.' },
          { answer: "didn't use to", explain: "Negativa: 'didn't use to' (sin -d en 'use')." },
          { answer: 'used to', explain: 'Hábito pasado afirmativo: "used to go".' },
          { answer: 'did', explain: 'Pregunta con "used to" → Did + sujeto + use to.' },
          { answer: 'used to', explain: 'Hábito pasado afirmativo: "used to start".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma al pasado con "used to"',
        tag: 'Escritura guiada',
        intro: 'Reescribe la oración usando "used to".',
        type: 'write',
        items: [
          {
            scene: 'Transforma: "When I was a child, I ate candy every day." (hábito pasado)',
            prompt: 'When I was a child, I ate candy every day.',
            answer: 'When I was a child, I used to eat candy every day.',
            accepted: ['I used to eat candy every day when I was a child.'],
            explain: '"Ate every day" es un hábito pasado → "used to eat". El contexto "when I was a child" confirma que ya no ocurre.',
          },
          {
            scene: 'Haz negativa: "She used to like classical music."',
            prompt: 'She used to like classical music.',
            answer: "She didn't use to like classical music.",
            accepted: [],
            explain: "Negativa de 'used to' → 'didn't use to' + base verb. Sin -d en 'use'.",
          },
          {
            scene: 'Haz pregunta: "He used to live in Buenos Aires."',
            prompt: 'He used to live in Buenos Aires.',
            answer: 'Did he use to live in Buenos Aires?',
            accepted: [],
            explain: 'Pregunta: Did + sujeto + use to + base verb? Sin -d en "use".',
          },
          {
            scene: 'Transforma: "There was a library on this street, but they demolished it."',
            prompt: 'There was a library on this street, but they demolished it.',
            answer: 'There used to be a library on this street.',
            accepted: ["There used to be a library on this street, but they demolished it."],
            explain: '"There used to be" = había/existía algo en el pasado que ya no está.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tu pasado con "used to"',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales sobre hábitos y estados de tu propio pasado.',
        type: 'write',
        items: [
          {
            scene: 'Escribe sobre 2 hábitos que tenías de niño y que ya no tienes.',
            prompt: 'Describe 2 hábitos de tu infancia que ya no tienes usando "used to".',
            answer: 'I used to play outside with my friends every afternoon. I also used to collect stickers when I was young.',
            accepted: ['I used to wake up very early for school. I used to have breakfast with my whole family every morning.'],
            explain: 'Cada oración: sujeto + used to + base verb. El pasado ya terminó → presente implícito de contraste.',
          },
          {
            scene: 'Escribe sobre algo que NO hacías antes pero sí haces ahora.',
            prompt: "Escribe usando 'didn't use to' sobre un hábito que no tenías y ahora sí tienes.",
            answer: "I didn't use to exercise regularly, but now I go to the gym three times a week.",
            accepted: [
              "I didn't use to eat healthy food, but now I cook my own meals.",
              "I didn't use to read books, but now I read one a month.",
            ],
            explain: "'Didn't use to' (sin -d) + base verb. Añade el contraste con el presente usando 'but now'.",
          },
          {
            scene: 'Escribe sobre cómo era un lugar que conoces y que ha cambiado mucho.',
            prompt: 'Describe cómo era ese lugar antes usando "used to" (2 o 3 oraciones).',
            answer: 'This neighborhood used to be very quiet. There used to be a lot of green spaces and parks. Now it is full of buildings and traffic.',
            accepted: ['My city used to be small and peaceful. People used to know each other. Now it is a busy metropolis.'],
            explain: 'Usa "used to be" para estados y "there used to be" para existencia. El contraste con el presente enriquece la descripción.',
          },
        ],
      },
    ],
  },
}

export default topic
