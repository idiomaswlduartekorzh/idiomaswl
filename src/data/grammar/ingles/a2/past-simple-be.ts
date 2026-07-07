import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'past-simple-be',
  order: '01',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'Past Simple de "to be" en Inglés A2',
  shortTitle: 'Was / Were',
  metaTitle: 'Was y Were en Inglés A2 — Past Simple de To Be',
  description:
    'El past simple del verbo "to be" en inglés se forma con was (I/he/she/it) y were (you/we/they). Es la base para hablar del pasado y la primera forma verbal que debes dominar antes de aprender el past simple de otros verbos.',
  lead: 'Domina was y were: las dos formas del pasado de "to be", con afirmativa, negativa e interrogativa.',
  outcomes: [
    'Usa was/were según el sujeto correctamente',
    'Forma oraciones negativas: wasn\'t / weren\'t',
    'Hace preguntas: Was she…? / Were they…?',
    'Habla del pasado inmediato con confianza',
  ],

  guide: {
    goal: 'Usar was y were para describir estados, ubicaciones y características en el pasado.',
    model: 'She was tired. / They weren\'t at home. / Was the movie good?',
    formula: 'Subject + was/were (+ not) + complement',
    decisions: [
      'I / he / she / it → was (singular)',
      'You / we / they → were (plural, y también "you" singular)',
      'Negativo: was not → wasn\'t; were not → weren\'t',
      'Pregunta: Was/Were + subject + complement? → Was she late? / Were they happy?',
      'Respuesta corta: Yes, I was. / No, she wasn\'t. / Yes, they were.',
    ],
    table: [
      ['Sujeto', 'Afirmativo', 'Negativo'],
      ['I', 'was', 'wasn\'t'],
      ['He / She / It', 'was', 'wasn\'t'],
      ['You / We / They', 'were', 'weren\'t'],
    ],
    mistakes: [
      '"You was" ❌ → "You were" ✓ — "you" siempre toma "were", incluso en singular.',
      '"Were I tired?" ❌ → "Was I tired?" ✓ — I siempre usa "was".',
      '"I were not" ❌ → "I wasn\'t" ✓ — recuerda la contracción correcta.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son was y were en inglés?',
      paragraphs: [
        'Was y were son las dos formas del pasado del verbo "to be" (ser/estar) en inglés. Equivalen al español "fui/era/estuve/estaba" dependiendo del contexto. Se usan para hablar de estados, características, ubicaciones o condiciones en el pasado.',
        'La clave es aprender qué pronombre va con cada forma: I, he, she e it siempre usan "was"; you, we y they siempre usan "were". Esta distinción es la base de todo el pasado simple en inglés.',
      ],
    },
    {
      heading: 'Cuándo usar was y cuándo usar were',
      paragraphs: [
        'Usa "was" con sujetos singulares de tercera persona y con I: I was happy. / He was at school. / The weather was beautiful.',
        'Usa "were" con you (singular y plural), we y they: You were right. / We were late. / They were at the concert.',
        'Atención especial: "you" en inglés puede ser singular o plural, pero siempre va con "were". Muchos hispanohablantes cometen el error de decir "you was" por analogía con "él/ella era" → "he/she was".',
      ],
      table: [
        ['Pronombre', 'Forma pasada', 'Ejemplo'],
        ['I', 'was', 'I was nervous before the exam.'],
        ['He / She / It', 'was', 'She was at the office yesterday.'],
        ['You', 'were', 'You were very kind to me.'],
        ['We / They', 'were', 'They were excited about the trip.'],
      ],
    },
    {
      heading: 'Forma negativa: wasn\'t y weren\'t',
      paragraphs: [
        'Para negar, añade "not" después de was/were. En inglés hablado se usan casi siempre las contracciones: was not → wasn\'t; were not → weren\'t.',
        'Ejemplos: The film wasn\'t very good. / We weren\'t ready. / I wasn\'t at home when you called.',
        'Nota: en inglés formal (exámenes escritos, cartas) es aceptable usar la forma completa "was not / were not", pero en conversación la contracción es la norma.',
      ],
    },
    {
      heading: 'Preguntas con was y were',
      paragraphs: [
        'Para hacer preguntas, invierte el auxiliar y el sujeto: Was/Were + sujeto + complemento? Esta es la misma estructura que en presente con "is/are".',
        'Ejemplos: Was she tired? / Were you at the party? / Was the food good? / Where were you yesterday?',
        'Respuestas cortas: Yes, she was. / No, she wasn\'t. / Yes, we were. / No, they weren\'t. En inglés no se repite el verbo principal en la respuesta corta.',
      ],
      examples: [
        ['Tipo', 'Ejemplo'],
        ['Afirmativa', 'The concert was amazing.'],
        ['Negativa', 'The concert wasn\'t amazing.'],
        ['Pregunta sí/no', 'Was the concert amazing?'],
        ['Pregunta con Wh-', 'Where was the concert?'],
      ],
    },
    {
      heading: 'Errores frecuentes de hispanohablantes',
      paragraphs: [
        'El error más común es "you was" — en inglés, "you" siempre usa "were", sin excepción. Esto incluye cuando te hablas a una sola persona: "You were great today!" (aunque solo le hablas a una persona).',
        'Otro error es olvidar la contracción: "I was not there" es correcto pero suena rígido; "I wasn\'t there" es la forma natural. Lo opuesto también ocurre: escribir "wasnt" sin apóstrofo en exámenes — siempre incluye el apóstrofo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Past de to be: was/were en contextos cotidianos A2.',
    graphicPrompt: 'Escenas del pasado: personas en situaciones ayer/la semana pasada.',
    scene: [
      ['I was really tired yesterday.', 'Estaba muy cansado/a ayer.'],
      ['She was at the library.', 'Ella estaba en la biblioteca.'],
      ['They weren\'t home.', 'Ellos no estaban en casa.'],
      ['Was the movie good?', '¿Fue buena la película?'],
      ['Yes, it was fantastic!', '¡Sí, fue fantástica!'],
      ['We were late for class.', 'Llegamos tarde a clase.'],
      ['He wasn\'t at the meeting.', 'Él no estaba en la reunión.'],
      ['Where were you last night?', '¿Dónde estabas anoche?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['you + were', 'I + was', 'wasn\'t vs weren\'t'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento: was o were',
        tag: 'Opción múltiple',
        intro: 'Elige was o were según el sujeto de cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Conversación sobre el fin de semana pasado',
            lines: [['', 'The party ___ amazing last Saturday.']],
            options: ['was', 'were', 'is', 'are'],
            answer: 'was',
            explain: '"The party" = tercera persona singular → "was".',
          },
          {
            scene: 'Hablando de ayer en clase',
            lines: [['', 'My friends ___ very excited about the trip.']],
            options: ['were', 'was', 'are', 'is'],
            answer: 'were',
            explain: '"My friends" = plural (ellos) → "were".',
          },
          {
            scene: 'Preguntando sobre alguien',
            lines: [['Teacher:', '___ you nervous before the exam?']],
            options: ['Were', 'Was', 'Are', 'Did'],
            answer: 'Were',
            explain: '"You" siempre va con "were", aunque sea singular.',
          },
          {
            scene: 'Describiendo el clima de ayer',
            lines: [['', 'It ___ really cold and rainy all day.']],
            options: ['was', 'were', 'is', 'had'],
            answer: 'was',
            explain: '"It" = tercera persona singular → "was".',
          },
          {
            scene: 'Mirando una foto antigua',
            lines: [['', 'We ___ so young in this photo!']],
            options: ['were', 'was', 'are', 'be'],
            answer: 'were',
            explain: '"We" → "were".',
          },
          {
            scene: 'Hablando del trabajo',
            lines: [['', 'The meetings yesterday ___ very long.']],
            options: ['were', 'was', 'are', 'is'],
            answer: 'were',
            explain: '"The meetings" = plural → "were".',
          },
          {
            scene: 'Recordando la infancia',
            lines: [['', 'I ___ very shy when I was a child.']],
            options: ['was', 'were', 'am', 'be'],
            answer: 'was',
            explain: '"I" siempre usa "was".',
          },
          {
            scene: 'Preguntando sobre el restaurante',
            lines: [['Friend:', 'How ___ the food at the new restaurant?']],
            options: ['was', 'were', 'is', 'did'],
            answer: 'was',
            explain: '"The food" = singular → "was".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Afirmativo y negativo',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta (afirmativa o negativa) de was/were.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando del partido de fútbol',
            lines: [['', 'The match [[0]] exciting, but the final result [[1]] what we expected.']],
            blanks: [
              { options: ['was', 'were', 'is', 'are'], answer: 'was', explain: '"The match" = singular → "was".' },
              { options: ['wasn\'t', 'weren\'t', 'isn\'t', 'aren\'t'], answer: 'wasn\'t', explain: 'Negativo singular: "wasn\'t" (was not).' },
            ],
          },
          {
            scene: 'Describiendo una clase',
            lines: [['', 'The students [[0]] really attentive, but the classroom [[1]] very comfortable.']],
            blanks: [
              { options: ['were', 'was', 'are', 'is'], answer: 'were', explain: '"The students" = plural → "were".' },
              { options: ['wasn\'t', 'weren\'t', 'isn\'t', 'aren\'t'], answer: 'wasn\'t', explain: 'Negativo singular: "wasn\'t".' },
            ],
          },
          {
            scene: 'Pregunta sobre las vacaciones',
            lines: [['', '[[0]] you satisfied with the hotel? I heard it [[1]] that clean.']],
            blanks: [
              { options: ['Were', 'Was', 'Are', 'Did'], answer: 'Were', explain: 'Pregunta con "you" → "Were you…?"' },
              { options: ['wasn\'t', 'weren\'t', 'isn\'t', 'doesn\'t'], answer: 'wasn\'t', explain: '"It" (the hotel) = singular negativo → "wasn\'t".' },
            ],
          },
          {
            scene: 'Recordando la infancia',
            lines: [['', 'My parents [[0]] very strict, but they [[1]] always fair.']],
            blanks: [
              { options: ['were', 'was', 'are', 'is'], answer: 'were', explain: '"My parents" = plural → "were".' },
              { options: ['were', 'was', 'are', 'is'], answer: 'were', explain: '"They" + "always fair" → afirmativo: "were".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día en el pasado',
        tag: 'Texto guiado',
        intro: 'Completa el relato con was, were, wasn\'t o weren\'t.',
        type: 'guidedText',
        scene: 'Completa el relato con was, were, wasn\'t o weren\'t.',
        text: 'Last Sunday [[0]] a special day for our family. My grandparents [[1]] at our house for lunch. The weather [[2]] perfect — sunny and warm. My cousins [[3]] there because they live far away, but we called them. The food [[4]] delicious: my grandmother\'s cooking [[5]] always the best. After lunch, we [[6]] all tired but very happy.',
        blanks: [
          { options: ['was', 'were', 'wasn\'t', 'weren\'t'], answer: 'was', explain: '"Last Sunday" = sujeto singular → "was".' },
          { options: ['were', 'was', 'weren\'t', 'wasn\'t'], answer: 'were', explain: '"My grandparents" = plural → "were".' },
          { options: ['was', 'were', 'wasn\'t', 'weren\'t'], answer: 'was', explain: '"The weather" = singular → "was".' },
          { options: ['weren\'t', 'wasn\'t', 'were', 'was'], answer: 'weren\'t', explain: '"My cousins" = plural negativo → "weren\'t".' },
          { options: ['was', 'were', 'wasn\'t', 'weren\'t'], answer: 'was', explain: '"The food" = singular → "was".' },
          { options: ['was', 'were', 'wasn\'t', 'weren\'t'], answer: 'was', explain: '"My grandmother\'s cooking" = singular → "was".' },
          { options: ['were', 'was', 'weren\'t', 'wasn\'t'], answer: 'were', explain: '"We" → "were".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin ayuda',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de was/were (afirmativa o negativa según el contexto).',
        type: 'freeText',
        scene: 'Escribe la forma correcta de was/were (afirmativa o negativa según el contexto).',
        text: 'I [[0]] (was/were) born in a small town. My parents [[1]] (was/were) both teachers. The school I attended [[2]] (was/were) close to our house — I [[3]] (was/were) never late. My best friends [[4]] (wasn\'t/weren\'t) from my neighborhood; they [[5]] (was/were) from another part of the city.',
        blanks: [
          { answer: 'was', accepted: ['was'], explain: '"I" → "was".' },
          { answer: 'were', accepted: ['were'], explain: '"My parents" = plural → "were".' },
          { answer: 'was', accepted: ['was'], explain: '"The school" = singular → "was".' },
          { answer: 'was', accepted: ['was'], explain: '"I" → "was".' },
          { answer: 'weren\'t', accepted: ["weren't", 'were not'], explain: 'Negativo plural → "weren\'t".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas sobre el pasado usando was/were.',
        type: 'write',
        items: [
          {
            scene: 'Reflexión personal',
            prompt: 'Describe cómo eras tú de niño/a (carácter, actitud). Usa was con un adjetivo.',
            answer: 'I was very shy when I was a child.',
            accepted: ['i was', 'i was very', 'i was quite', 'i was really', 'i was a', 'i was always'],
            explain: 'Ejemplo: I was very energetic. / I was a quiet child. / I was always curious.',
          },
          {
            scene: 'Hablando del fin de semana',
            prompt: 'Describe dónde estuviste el fin de semana pasado.',
            answer: 'I was at home all weekend.',
            accepted: ['i was at', 'i was in', 'i was with', 'i was home', 'i was there'],
            explain: 'Ejemplo: I was at my friend\'s house. / I was in the city center.',
          },
          {
            scene: 'Conversación con un amigo',
            prompt: 'Escribe una pregunta con "Were you…?" sobre el fin de semana.',
            answer: 'Were you at the party on Saturday?',
            accepted: ['were you', 'were you at', 'were you in', 'were you with', 'were you home', 'were you there', 'were you busy', 'were you tired'],
            explain: 'Ejemplo: Were you at home yesterday? / Were you with your family?',
          },
          {
            scene: 'Recordando algo',
            prompt: 'Escribe una oración negativa: algo que NO fue así en el pasado.',
            answer: 'The weather wasn\'t very good last week.',
            accepted: ["wasn't", "weren't", 'was not', 'were not'],
            explain: 'Ejemplo: The film wasn\'t very interesting. / We weren\'t ready for the test.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: El fin de semana pasado',
        tag: 'Producción libre',
        intro: 'Cuéntale a un amigo sobre tu fin de semana. Usa was/were en al menos 3 oraciones: una afirmativa, una negativa y una pregunta.',
        type: 'write',
        items: [
          {
            scene: 'Mensaje a un amigo',
            prompt: 'Escribe una oración afirmativa sobre dónde estuviste o cómo estuvo algo.',
            answer: 'The party was really fun!',
            accepted: ['was', 'were'],
            explain: 'Ejemplo: The concert was incredible. / I was at the beach all day.',
          },
          {
            scene: 'Mensaje a un amigo',
            prompt: 'Escribe una oración negativa sobre algo que no ocurrió o no fue así.',
            answer: 'The weather wasn\'t great, but we still had fun.',
            accepted: ["wasn't", "weren't", 'was not', 'were not'],
            explain: 'Ejemplo: I wasn\'t tired at all. / The restaurant wasn\'t very cheap.',
          },
          {
            scene: 'Mensaje a un amigo',
            prompt: 'Escribe una pregunta para tu amigo sobre su fin de semana.',
            answer: 'Were you at home all weekend?',
            accepted: ['were you', 'was your', 'was it', 'were they', 'was he', 'was she'],
            explain: 'Ejemplo: Was your weekend fun? / Were you with your family?',
          },
        ],
      },
    ],
  },
}

export default topic
