import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-perfect-ever-never',
  order: '12',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'Present Perfect con Ever, Never, Already y Yet',
  shortTitle: 'Ever / Never / Already / Yet',
  metaTitle: 'Present Perfect con Ever, Never, Already y Yet en Inglés A2',
  description:
    'Ever, never, already y yet son los cuatro adverbios más usados con el present perfect en inglés. Ever (¿alguna vez?) va en preguntas; never (nunca) en afirmaciones negativas; already (ya) en afirmaciones; yet (todavía/aún) en negativos y preguntas. Su posición en la oración es fija.',
  lead: 'Domina ever, never, already y yet — los cuatro adverbios clave del present perfect en inglés.',
  outcomes: [
    'Usa ever en preguntas de experiencia',
    'Usa never en afirmaciones negativas de experiencia',
    'Coloca already y yet en la posición correcta',
    'Entiende la diferencia de posición entre adverbios',
  ],

  guide: {
    goal: 'Usar ever, never, already y yet con el present perfect en la posición correcta según el tipo de oración.',
    model: 'Have you ever tried paella? / I\'ve never skied. / I\'ve already done it. / She hasn\'t called yet.',
    formula: 'Have/has + (never/already/just) + participle / Have + subject + (ever) + participle + (yet)?',
    decisions: [
      '"Ever" → en PREGUNTAS, entre el sujeto y el participio: "Have you ever been to Japan?"',
      '"Never" → en AFIRMACIONES, entre have/has y el participio: "I\'ve never eaten sushi."',
      '"Already" → en AFIRMACIONES, entre have/has y el participio: "I\'ve already seen that film."',
      '"Yet" → en NEGATIVOS (entre haven\'t y participio o al final) y PREGUNTAS (al final): "I haven\'t called yet." / "Have you called yet?"',
      '"Just" → en AFIRMACIONES, entre have/has y el participio: "She\'s just arrived."',
    ],
    table: [
      ['Adverbio', 'Posición', 'Ejemplo'],
      ['ever', 'Preguntas: after subject', 'Have you ever eaten Thai food?'],
      ['never', 'Afirmaciones: after have/has', 'I\'ve never tried bungee jumping.'],
    ],
    mistakes: [
      '"Have you tried ever?" ❌ → "Have you ever tried?" ✓ — ever va entre el sujeto y el participio.',
      '"I already haven\'t done it" ❌ → "I haven\'t done it yet" ✓ — yet va en negativos, already en afirmativos.',
      '"I\'ve yet called" ❌ → "I haven\'t called yet" ✓ — yet en negativo, al final.',
    ],
  },

  seo: [
    {
      heading: 'Ever: preguntar por experiencias de vida',
      paragraphs: [
        '"Ever" se usa en preguntas con present perfect para preguntar si alguien ha tenido una experiencia en algún momento de su vida. Se coloca entre el sujeto y el participio pasado.',
        'Ejemplos: "Have you ever eaten insects?" / "Has she ever lived abroad?" / "Have they ever won a championship?" La respuesta afirmativa usa "Yes, I have." / "Yes, once." La negativa usa "No, never." / "No, I haven\'t."',
      ],
    },
    {
      heading: 'Never: experiencias que nunca has tenido',
      paragraphs: [
        '"Never" se usa en afirmaciones y significa que algo no ha ocurrido nunca en la vida de alguien. Va entre have/has y el participio pasado. "I\'ve never smoked." / "She\'s never been to Asia." / "We\'ve never missed a flight."',
        'Importante: "never" ya hace la oración negativa en significado, por eso el auxiliar va en forma AFIRMATIVA: "I have never" (no "I haven\'t never" — doble negación incorrecta).',
      ],
    },
    {
      heading: 'Already: algo que ya ha pasado',
      paragraphs: [
        '"Already" expresa que algo ocurrió antes de lo esperado o antes de que se pregunte. Se usa en afirmaciones y va entre have/has y el participio. "I\'ve already eaten — I\'m not hungry." / "She\'s already finished the report."',
        'También puede ir al final para dar énfasis: "I\'ve done it already!" En preguntas de sorpresa: "Have you already finished? That was fast!"',
      ],
    },
    {
      heading: 'Yet: todavía no o ¿ya?',
      paragraphs: [
        '"Yet" se usa en negativos y preguntas. En negativos significa "todavía no" y va generalmente al final: "I haven\'t finished the book yet." / "She hasn\'t replied yet." / "We haven\'t decided yet."',
        'En preguntas, "yet" significa "¿ya?" y también va al final: "Have you eaten yet?" / "Has he called yet?" / "Have they arrived yet?" La respuesta puede ser: "Yes, already." o "No, not yet."',
      ],
      examples: [
        ['Adverbio', 'Tipo de oración', 'Ejemplo'],
        ['ever', 'Pregunta', 'Have you ever tried surfing?'],
        ['never', 'Afirmación', 'I\'ve never surfed.'],
        ['already', 'Afirmación', 'I\'ve already tried it.'],
        ['yet', 'Negativo', 'I haven\'t tried it yet.'],
        ['yet', 'Pregunta', 'Have you tried it yet?'],
        ['just', 'Afirmación', 'I\'ve just tried it for the first time!'],
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más común con "ever" es su posición: "Have you tried ever sushi?" — incorrecto. Debe ir justo después del sujeto: "Have you ever tried sushi?"',
        'Con "never": muchos estudiantes lo usan con el auxiliar negativo: "I haven\'t never been there." — doble negación incorrecta. Con "never", el auxiliar va en afirmativo: "I\'ve never been there."',
        'Confundir "already" y "yet": "I haven\'t eaten already" — incorrecto. "Already" va en afirmativo; "yet" en negativo. La forma correcta es: "I haven\'t eaten yet."',
      ],
    },
    {
      heading: '¿Cómo se usan "ever" y "never" con el present perfect?',
      paragraphs: [
        '"ever" (alguna vez) en preguntas: "Have you ever been to Japan?". "never" (nunca) en frases afirmativas con sentido negativo: "I have never eaten sushi". Ambos van entre have/has y el participio. "never" ya es negativo, así que no se combina con "not".',
      ],
    },
    {
      heading: '¿Cómo se pregunta si alguien ha hecho algo alguna vez en inglés?',
      paragraphs: [
        'Con "Have/Has + sujeto + ever + participio": "Have you ever tried Thai food?", "Has she ever been abroad?". La respuesta suele usar el present perfect ("Yes, I have" / "No, I never have") o pasar al past simple para dar detalles ("Yes, I went last year").',
      ],
    },
    {
      heading: '¿Dónde se coloca "ever" en la frase?',
      paragraphs: [
        'Entre el sujeto y el participio, después de have/has: "Have you ever seen it?". No va al final ni antes del sujeto. "never" ocupa la misma posición en afirmativas: "I have never seen it".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Ever, never, already, yet con present perfect en posición correcta.',
    graphicPrompt: 'Conversaciones sobre experiencias, tareas hechas y pendientes.',
    scene: [
      ['Have you ever been to New York?', '¿Has estado alguna vez en Nueva York?'],
      ['Yes! I\'ve been there twice.', '¡Sí! He estado allí dos veces.'],
      ['I\'ve never tried skiing.', 'Nunca he probado el esquí.'],
      ['I\'ve already done my homework.', 'Ya he hecho mis deberes.'],
      ['Have you called her yet?', '¿Ya la has llamado?'],
      ['No, not yet. I\'ll call now.', 'No, todavía no. La llamo ahora.'],
      ['She\'s just arrived at the airport.', 'Ella acaba de llegar al aeropuerto.'],
      ['Have you ever eaten raw fish?', '¿Has comido alguna vez pescado crudo?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['ever in questions', 'never in affirmatives (no double negative)', 'already in affirmatives', 'yet at end of negatives/questions'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el adverbio correcto',
        tag: 'Opción múltiple',
        intro: 'Elige ever, never, already o yet según el tipo de oración.',
        type: 'choice',
        items: [
          {
            scene: 'Pregunta a un amigo',
            lines: [['', 'Have you ___ tried Vietnamese food?']],
            options: ['ever', 'never', 'already', 'yet'],
            answer: 'ever',
            explain: '"Ever" en preguntas: "Have you ever tried...?" — pregunta por experiencia de vida.',
          },
          {
            scene: 'Hablando de experiencias',
            lines: [['', 'I\'ve ___ been skydiving — I\'m afraid of heights.']],
            options: ['never', 'ever', 'already', 'yet'],
            answer: 'never',
            explain: '"Never" en afirmaciones: "I\'ve never been..." — nunca ha ocurrido.',
          },
          {
            scene: 'Pregunta sobre una tarea',
            lines: [['', 'Have you finished the presentation ___?']],
            options: ['yet', 'ever', 'never', 'already'],
            answer: 'yet',
            explain: '"Yet" al final de preguntas: "Have you finished yet?" = ¿ya lo hiciste?',
          },
          {
            scene: 'Contando que ya está hecho',
            lines: [['', 'Don\'t worry — I\'ve ___ sent the email.']],
            options: ['already', 'yet', 'never', 'ever'],
            answer: 'already',
            explain: '"Already" en afirmaciones: ya está hecho. Va entre have/has y el participio.',
          },
          {
            scene: 'Algo pendiente',
            lines: [['', 'I haven\'t packed my suitcase ___.']],
            options: ['yet', 'ever', 'already', 'never'],
            answer: 'yet',
            explain: '"Yet" en negativos: "haven\'t...yet" = todavía no.',
          },
          {
            scene: 'Error de doble negación',
            lines: [['', 'She ___ eaten in that restaurant. (It\'s her first time.)']],
            options: ['has never', 'hasn\'t never', 'have never', 'hasn\'t ever'],
            answer: 'has never',
            explain: '"She has never eaten" — "never" ya niega, el auxiliar va en AFIRMATIVO. "Hasn\'t never" es doble negación incorrecta.',
          },
          {
            scene: 'Pregunta de sorpresa',
            lines: [['', 'Have you ___ met a celebrity?']],
            options: ['ever', 'yet', 'already', 'never'],
            answer: 'ever',
            explain: '"Have you ever...?" — pregunta por si tuvo la experiencia alguna vez.',
          },
          {
            scene: 'Hecho reciente',
            lines: [['', 'She\'s ___ arrived. She called from the taxi.']],
            options: ['just', 'ever', 'yet', 'never'],
            answer: 'just',
            explain: '"Just" = hace un momento, muy recientemente. Va entre has y el participio.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Estructura completa',
        tag: '2 espacios',
        intro: 'Completa con el adverbio correcto y la posición correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Conversación sobre comida',
            lines: [
 ['A:', '[[0]] you [[1]] eaten frog legs?'],
 ['B:', 'Never! That\'s something I\'d rather not try.'],
 ],
            blanks: [
              { options: ['Have', 'Has', 'Did', 'Do'], answer: 'Have', explain: 'Pregunta con "you" → "Have you ever...?"' },
              { options: ['ever', 'never', 'already', 'yet'], answer: 'ever', explain: '"Ever" en preguntas, después del sujeto.' },
            ],
          },
          {
            scene: 'Terminando tareas',
            lines: [
 ['A:', 'Have you done the dishes yet?'],
 ['B:', 'Yes, I\'ve [[0]] done them. I did them right after dinner. I [[1]] do things late.'],
 ],
            blanks: [
              { options: ['already', 'yet', 'never', 'ever'], answer: 'already', explain: '"Already" en afirmaciones: ya está hecho.' },
              { options: ['never', 'ever', 'already', 'yet'], answer: 'never', explain: '"I never do things late" — nunca hago las cosas tarde (hábito).' },
            ],
          },
          {
            scene: 'Antes del viaje',
            lines: [['', 'I\'ve [[0]] packed my bags. But I haven\'t booked the taxi [[1]].']],
            blanks: [
              { options: ['already', 'yet', 'never', 'ever'], answer: 'already', explain: '"I\'ve already packed" — ya está hecho.' },
              { options: ['yet', 'already', 'ever', 'never'], answer: 'yet', explain: '"Haven\'t booked yet" — todavía no.' },
            ],
          },
          {
            scene: 'Sobre actividades extremas',
            lines: [
 ['A:', 'Have you [[0]] done a bungee jump?'],
 ['B:', 'No, I\'ve [[1]] done anything that extreme — and I don\'t plan to!'],
 ],
            blanks: [
              { options: ['ever', 'yet', 'never', 'already'], answer: 'ever', explain: '"Have you ever done...?" — pregunta por experiencia.' },
              { options: ['never', 'ever', 'already', 'yet'], answer: 'never', explain: '"I\'ve never done anything that extreme" — nunca, auxiliar en afirmativo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Antes del viaje',
        tag: 'Texto guiado',
        intro: 'Elige ever, never, already o yet para completar esta conversación.',
        type: 'guidedText',
        scene: 'Elige ever, never, already o yet para completar esta conversación.',
        text: '"Have you [[0]] been on a long-haul flight?" — "Yes, I\'ve [[1]] flown to Australia — it took 24 hours!" — "Wow! I\'ve [[2]] done that. The longest flight I\'ve taken was 6 hours. Have you [[3]] visited South America [[4]]?" — "No, not [[5]]. It\'s on my list though. Have you [[6]] decided where you\'re going next?" — "I\'ve [[7]] booked tickets to Japan!"',
        blanks: [
          { options: ['ever', 'never', 'already', 'yet'], answer: 'ever', explain: '"Have you ever been...?" — pregunta por experiencia.' },
          { options: ['already', 'yet', 'never', 'ever'], answer: 'already', explain: '"I\'ve already flown to Australia" — experiencia que ya tuvo.' },
          { options: ['never', 'ever', 'already', 'yet'], answer: 'never', explain: '"I\'ve never done that" — nunca tuve esa experiencia.' },
          { options: ['ever', 'yet', 'already', 'never'], answer: 'ever', explain: '"Have you ever visited South America?" — pregunta por experiencia de vida.' },
          { options: ['yet', 'ever', 'already', 'never'], answer: 'yet', explain: '"Not yet" = todavía no. Respuesta a pregunta con "yet".' },
          { options: ['already', 'ever', 'yet', 'never'], answer: 'already', explain: '"Have you already decided?" — pregunta si ya tomó esa decisión.' },
          { options: ['already', 'yet', 'never', 'ever'], answer: 'already', explain: '"I\'ve already booked!" — ya lo hizo, antes de que se esperara.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el adverbio correcto',
        tag: 'Texto libre',
        intro: 'Escribe ever, never, already o yet según el contexto.',
        type: 'freeText',
        scene: 'Escribe ever, never, already o yet según el contexto.',
        text: 'My friend is checking on my progress: "Have you [[0]] read that book I recommended?" — "No, I haven\'t [[1]] read it — I\'ve been busy. But I\'ve [[2]] ordered it online!" — "Oh good. Have you [[3]] read anything by that author before?" — "No, I\'ve [[4]] read her work. You\'re the first person to recommend it."',
        blanks: [
          { answer: 'ever', accepted: ['ever'], explain: '"Have you ever read...?" — pregunta por experiencia de vida.' },
          { answer: 'yet', accepted: ['yet'], explain: '"Haven\'t read yet" — todavía no.' },
          { answer: 'already', accepted: ['already'], explain: '"I\'ve already ordered it" — ya lo hice.' },
          { answer: 'ever', accepted: ['ever'], explain: '"Have you ever read anything by...?" — experiencia.' },
          { answer: 'never', accepted: ['never'], explain: '"I\'ve never read her work" — nunca, auxiliar afirmativo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando ever, never, already y yet.',
        type: 'write',
        items: [
          {
            scene: 'Pregunta a un amigo',
            prompt: 'Escribe una pregunta con "Have you ever...?" sobre una experiencia inusual o interesante.',
            answer: 'Have you ever slept under the stars in the middle of the countryside?',
            accepted: ['have you ever', 'has she ever', 'has he ever', 'have they ever'],
            explain: 'Ejemplo: Have you ever eaten insects? / Have you ever run a marathon? / Have you ever met someone famous?',
          },
          {
            scene: 'Tu propia experiencia',
            prompt: 'Escribe una cosa que nunca has hecho en tu vida (I\'ve never...).',
            answer: 'I\'ve never tried snowboarding — I\'ve always been more of a beach person.',
            accepted: ["i've never", "i have never", "she's never", "he's never", "we've never"],
            explain: 'Ejemplo: I\'ve never eaten oysters. / She\'s never been on a plane.',
          },
          {
            scene: 'Tarea completada',
            prompt: 'Escribe algo que ya has hecho hoy o esta semana (I\'ve already...).',
            answer: 'I\'ve already finished two chapters of my grammar book this week.',
            accepted: ["i've already", "i have already", "she's already", "he's already", "we've already"],
            explain: 'Ejemplo: I\'ve already called my parents. / She\'s already submitted the assignment.',
          },
          {
            scene: 'Algo pendiente',
            prompt: 'Escribe algo que todavía no has hecho pero deberías hacer (I haven\'t... yet).',
            answer: 'I haven\'t responded to that important email yet — I keep forgetting.',
            accepted: ["i haven't", "i have not", "she hasn't", "he hasn't", "we haven't"],
            explain: 'Ejemplo: I haven\'t booked the flights yet. / He hasn\'t apologized yet.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu lista de pendientes',
        tag: 'Producción libre',
        intro: 'Escribe sobre cosas que ya has hecho este mes y cosas que todavía no has hecho.',
        type: 'write',
        items: [
          {
            scene: 'Este mes',
            prompt: 'Escribe dos cosas que ya has completado este mes (I\'ve already...).',
            answer: 'I\'ve already finished a great book and started a new online course.',
            accepted: ["i've already", "i have already", "we've already"],
            explain: 'Ejemplo: I\'ve already exercised four times this week. / I\'ve already paid all my bills.',
          },
          {
            scene: 'Este mes',
            prompt: 'Escribe una cosa que todavía no has hecho pero quieres hacer (I haven\'t... yet, but...).',
            answer: 'I haven\'t signed up for the language exchange yet, but I\'m planning to do it this weekend.',
            accepted: ["haven't", "have not", "hasn't", "has not"],
            explain: 'Ejemplo: I haven\'t called my old friend yet — I must do that. / She hasn\'t tried the new recipe yet.',
          },
          {
            scene: 'Este mes',
            prompt: 'Escribe una pregunta con "Have you... yet?" para hacerle a un amigo sobre algo que debería hacer.',
            answer: 'Have you registered for the conference yet? The deadline is tomorrow!',
            accepted: ['have you', 'has she', 'has he', 'have they'],
            explain: 'Ejemplo: Have you bought the tickets yet? / Have you spoken to the manager yet?',
          },
        ],
      },
    ],
  },
}

export default topic
