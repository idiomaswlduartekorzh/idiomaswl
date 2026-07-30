import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'first-conditional-b1',
  order: '06',
  color: '#dc2626',
  category: 'Conditionals',
  level: 'B1',
  title: 'First Conditional en Inglés B1',
  shortTitle: 'First Conditional',
  metaTitle: 'First Conditional B1 — If + Present Simple + Will para situaciones reales y posibles',
  description:
    'El first conditional (If + present simple, will + infinitivo) expresa situaciones reales y posibles en el futuro. En B1 aprendes no solo la forma básica sino también variantes con unless, when, provided that y cómo usar can, may o might en la cláusula resultado.',
  lead: 'Domina el first conditional para hablar de consecuencias reales y posibles: si esto ocurre, aquello ocurrirá.',
  outcomes: [
    'Forma correctamente: If + present simple, will + infinitivo',
    'Usa unless como alternativa a "if not" en condicionales',
    'Sustituye will por can, might y may para variar el nivel de certeza',
    'Invierte el orden de las cláusulas sin cometer errores de puntuación',
  ],

  guide: {
    goal: 'Expresar consecuencias futuras reales o muy posibles usando first conditional con variedad de estructuras.',
    model: 'If it rains tomorrow, we\'ll cancel the match. / Unless you hurry, you\'ll miss the bus.',
    formula: 'If + present simple, will/can/might + infinitive (or reverse order)',
    decisions: [
      'Cláusula IF: siempre en presente simple (presente o futuro en español). NUNCA uses "will" en la cláusula if.',
      'Cláusula resultado: will + infinitivo para consecuencia segura; might/may para posibilidad; can para permiso/habilidad.',
      'Orden invertible: "If you study, you\'ll pass." = "You\'ll pass if you study." Con orden invertido, no hay coma.',
      'UNLESS = if not: "Unless you call me, I\'ll worry." = "If you don\'t call me, I\'ll worry."',
      'Puedes usar when en lugar de if cuando la condición es más segura: "When I get there, I\'ll call you."',
      'Otras expresiones condicionales: as long as, provided (that), on condition that (más formales).',
    ],
    table: [
      ['Cláusula', 'Tiempo verbal', 'Ejemplo'],
      ['If / Unless + condición', 'Present Simple', '"If it rains / Unless it stops..."'],
      ['Resultado (seguro)', 'will + infinitivo', '"...we will cancel the trip."'],
      ['Resultado (posible)', 'might/may + inf.', '"...it might be cancelled."'],
    ],
    mistakes: [
      '"If it will rain, we will cancel" ❌ → "If it rains, we will cancel" ✓ — nunca uses will en la cláusula if.',
      '"Unless you won\'t hurry..." ❌ → "Unless you hurry..." ✓ — unless ya incluye negación, no añadas "not".',
      '"If you study hard, you pass" ❌ → "If you study hard, you will pass" ✓ — el resultado necesita will (o can/might).',
    ],
  },

  seo: [
    {
      heading: 'Qué es el first conditional y cuándo se usa',
      paragraphs: [
        'El first conditional describe situaciones reales y posibles en el futuro. La condición (if-clause) es algo que puede ocurrir, y la consecuencia (main clause) es el resultado probable o seguro si ocurre.',
        '"If you eat healthy food, you\'ll feel better." La persona puede o no comer sano — es una posibilidad real. Esto lo diferencia del second conditional (situaciones hipotéticas o poco probables).',
      ],
    },
    {
      heading: 'La regla de oro: nunca "will" en la cláusula if',
      paragraphs: [
        'El error más frecuente de hispanohablantes es usar "will" en la cláusula if: "If I will see him, I will tell him" ❌. En inglés la condición va en presente simple aunque se refiera al futuro: "If I see him, I will tell him" ✓.',
        'Esta regla aplica también a as soon as, when, until, after, before en contextos futuros: "When she arrives, we\'ll start." (no "will arrive"). El "futuro" se expresa con presente simple en estas cláusulas temporales.',
      ],
    },
    {
      heading: 'Unless: el condicional negativo',
      paragraphs: [
        '"Unless" equivale a "if not" y hace que la oración sea más elegante. "Unless you hurry, you\'ll miss the train." = "If you don\'t hurry, you\'ll miss the train." Ojo: nunca añadas "not" después de unless — "Unless you don\'t come" sería una doble negación incorrecta.',
        'Unless es más formal y directivo; if not es más coloquial. Ambas son correctas. En cartas formales y en el IELTS Writing, unless demuestra riqueza de expresión.',
      ],
    },
    {
      heading: 'Variantes del resultado: will, can, might, may',
      paragraphs: [
        'El resultado no siempre tiene que ser will. Puedes variar para expresar diferentes niveles de certeza: "If you practice daily, you will improve" (certeza). "If you practice, you might improve faster" (posibilidad). "If you pass the exam, you can join the advanced group" (permiso/habilidad).',
        'También puedes usar imperativo como resultado: "If you have any questions, ask your teacher." Esto es muy común en instrucciones, manuales y consejos.',
      ],
    },
    {
      heading: 'Aplicaciones reales del first conditional',
      paragraphs: [
        'En la vida real, el first conditional aparece en negociaciones, advertencias, promesas y consejos: "If you sign the contract today, we\'ll give you a 10% discount." / "If you don\'t take a break, you\'ll burn out."',
        'En el IELTS Speaking y Writing es importante variar entre unless, as long as y provided that para demostrar complejidad gramatical. Un buen uso del first conditional puede subir tu puntuación de gramática.',
      ],
    },
    {
      heading: '¿Cómo se forma el first conditional en inglés?',
      paragraphs: [
        'Con "if + present simple, ... will + verbo base": "If it rains, we will cancel the trip". La condición va en presente y el resultado con "will" (o can/may/imperativo). Se usa para situaciones reales y probables en el futuro.',
      ],
    },
    {
      heading: '¿Se usa "will" después de "if"?',
      paragraphs: [
        'No. Tras "if" va el present simple, nunca "will": "If you help me, I will finish sooner" (no "if you will help me"). El "will" va en la cláusula de resultado. Es el error clásico del hispanohablante.',
      ],
    },
    {
      heading: '¿Cómo se usan "unless", "as long as", "in case" en el first conditional?',
      paragraphs: [
        '"unless" = "if not" (a menos que): "I won\'t go unless you come". "as long as / provided that" = siempre que ("You can stay as long as you\'re quiet"). "in case" = por si acaso ("Take an umbrella in case it rains"). Todas van con present, no con will.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'First conditional para consecuencias reales y posibles, con unless y variantes de modal.',
    graphicPrompt: 'Diagrama causa-efecto: caja IF (presente) → flecha → caja RESULTADO (will/might).',
    scene: [
      ['If you study every day, you\'ll pass the exam.', 'Si estudias cada día, aprobarás el examen.'],
      ['Unless it stops raining, the match will be cancelled.', 'A menos que deje de llover, el partido será cancelado.'],
      ['If she applies now, she might get the job.', 'Si solicita ahora, podría conseguir el trabajo.'],
      ['You\'ll feel better if you get some sleep.', 'Te sentirás mejor si duermes un poco.'],
      ['If you need help, just call me.', 'Si necesitas ayuda, llámame.'],
      ['We\'ll miss the flight if we don\'t leave now!', '¡Perderemos el vuelo si no salimos ahora!'],
      ['If prices keep rising, people will spend less.', 'Si los precios siguen subiendo, la gente gastará menos.'],
      ['Unless you save your work, you\'ll lose it.', 'A menos que guardes tu trabajo, lo perderás.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['no will in if-clause', 'unless = if not', 'will vs might vs can in result', 'clause order'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la opción correcta para cada first conditional.',
        type: 'choice',
        items: [
          {
            scene: 'Un consejo de salud',
            lines: [['', 'If you ___ more water, you\'ll feel more energetic.']],
            options: ['drink', 'will drink', 'drank', 'are drinking'],
            answer: 'drink',
            explain: 'La cláusula if va en presente simple: "If you drink..." — NUNCA will en la cláusula if.',
          },
          {
            scene: 'Una advertencia',
            lines: [['', 'You ___ the bus if you don\'t leave now.']],
            options: ['\'ll miss', 'miss', 'missed', 'might missing'],
            answer: '\'ll miss',
            explain: '\'ll miss: resultado en la cláusula principal → will + infinitivo.',
          },
          {
            scene: 'Una alternativa con unless',
            lines: [['', '___ you book in advance, the hotel will be full.']],
            options: ['Unless', 'If', 'When', 'Until'],
            answer: 'Unless',
            explain: 'Unless = if not. "Unless you book in advance" = "If you don\'t book in advance."',
          },
          {
            scene: 'Una posibilidad',
            lines: [['', 'If the weather is good this weekend, we ___ go to the beach.']],
            options: ['might', 'will to', 'are going', 'would'],
            answer: 'might',
            explain: 'Might en el resultado expresa posibilidad (no certeza). "We might go" = puede que vayamos.',
          },
          {
            scene: 'Una condición de trabajo',
            lines: [['', 'If ___ the targets, the team will receive a bonus.']],
            options: ['we meet', 'we will meet', 'we met', 'we are meeting'],
            answer: 'we meet',
            explain: 'Cláusula if → presente simple: "if we meet (the targets)."',
          },
          {
            scene: 'Un permiso',
            lines: [['', 'If you finish early, you ___ leave before 5.']],
            options: ['can', 'will', 'might', 'are able'],
            answer: 'can',
            explain: 'Can en el resultado expresa permiso: "you can leave" = tienes permiso de irte.',
          },
          {
            scene: 'Orden inverso',
            lines: [['', 'You ___ feel cold if you ___ wear a coat.']],
            options: ['\'ll / don\'t', 'will / won\'t', 'don\'t / won\'t', '\'ll / didn\'t'],
            answer: '\'ll / don\'t',
            explain: '\'ll feel (resultado) + don\'t wear (condición en presente simple). "You\'ll feel cold if you don\'t wear a coat."',
          },
          {
            scene: 'Una promesa',
            lines: [['', 'If you come to my party, I ___ invite you to my birthday dinner too.']],
            options: ['\'ll', 'might', 'can', '\'d'],
            answer: '\'ll',
            explain: '\'ll: promesa firme → will es la forma más directa para hacer compromisos en first conditional.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Condición y consecuencia',
        tag: '2 espacios',
        intro: 'Completa la cláusula IF y la cláusula resultado correctamente.',
        type: 'dual',
        items: [
          {
            scene: 'Un plan de viaje',
            lines: [['', 'If the flights [[0]] (be) cheaper next month, we [[1]] (book) them immediately.']],
            blanks: [
              { options: ['are', 'will be', 'were', 'have been'], answer: 'are', explain: 'Cláusula if → presente simple: "If the flights are cheaper."' },
              { options: ['\'ll book', 'book', 'booked', 'might booking'], answer: '\'ll book', explain: 'Resultado → will + infinitivo: "we\'ll book."' },
            ],
          },
          {
            scene: 'Una advertencia amistosa',
            lines: [['', '[[0]] you leave soon, you [[1]] (not/get) stuck in traffic.']],
            blanks: [
              { options: ['Unless', 'If not', 'Except', 'Without'], answer: 'Unless', explain: 'Unless = if not → "Unless you leave soon" = "If you don\'t leave soon."' },
              { options: ['won\'t get', 'don\'t get', 'wouldn\'t get', 'might get'], answer: 'won\'t get', explain: 'Resultado negativo → will not = won\'t: "you won\'t get stuck."' },
            ],
          },
          {
            scene: 'Un posible trabajo',
            lines: [['', 'If she [[0]] (prepare) well for the interview, she [[1]] (might / impress) the panel.']],
            blanks: [
              { options: ['prepares', 'will prepare', 'prepared', 'has prepared'], answer: 'prepares', explain: 'If + presente simple: "If she prepares well."' },
              { options: ['might impress', 'will impress', 'can impress', 'might impresses'], answer: 'might impress', explain: 'Might en el resultado para posibilidad: "she might impress the panel."' },
            ],
          },
          {
            scene: 'Una regla de la oficina',
            lines: [['', 'Employees [[0]] (can / work) from home provided that they [[1]] (meet) their deadlines.']],
            blanks: [
              { options: ['can work', 'will work', 'might work', 'work'], answer: 'can work', explain: 'Can expresa permiso/posibilidad en el resultado: "employees can work from home."' },
              { options: ['meet', 'will meet', 'met', 'have met'], answer: 'meet', explain: 'La cláusula condicional (provided that) → presente simple: "they meet their deadlines."' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Consejos para el examen',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta para completar estos consejos sobre preparación de exámenes.',
        type: 'guidedText',
        scene: 'Elige la forma correcta en este texto de consejos.',
        text: 'Preparing for an English exam can be stressful, but it doesn\'t have to be. If you [[0]] (start) preparing early, you [[1]] (have) enough time to cover everything. Unless you [[2]] (practice) your speaking, you [[3]] (struggle) in that part of the test. If you [[4]] (feel) nervous, take three deep breaths before you begin — this [[5]] (help) you calm down. You might [[6]] (make) a few mistakes, but if you [[7]] (keep) calm, you\'ll be fine!',
        blanks: [
          { options: ['start', 'will start', 'started', 'are starting'], answer: 'start', explain: 'If + presente simple: "If you start early."' },
          { options: ['\'ll have', '\'ve had', 'have', 'had'], answer: '\'ll have', explain: 'Resultado → will + have: "you\'ll have enough time."' },
          { options: ['practice', 'will practice', 'practiced', 'are practicing'], answer: 'practice', explain: 'Unless + presente simple: "Unless you practice your speaking."' },
          { options: ['\'ll struggle', 'struggle', '\'re struggling', 'struggled'], answer: '\'ll struggle', explain: 'Resultado → will: "you\'ll struggle."' },
          { options: ['feel', 'will feel', 'felt', 'are feeling'], answer: 'feel', explain: 'If + presente simple: "If you feel nervous."' },
          { options: ['will help', 'helps', '\'ll help', 'helped'], answer: 'will help', explain: 'Resultado → will help. (Ambas "will help" y "helps" son posibles aquí; will help es más enfático).' },
          { options: ['make', 'will make', 'made', 'making'], answer: 'make', explain: 'Might + infinitivo: "you might make a few mistakes." El infinitivo sin "to" sigue a might.' },
          { options: ['keep', 'will keep', 'kept', 'are keeping'], answer: 'keep', explain: 'If + presente simple: "if you keep calm."' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los verbos correctos',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del verbo para completar estas oraciones condicionales.',
        type: 'freeText',
        scene: 'Escribe la forma correcta de cada verbo en paréntesis.',
        text: 'Here are some environmental tips: If everyone [[0]] (recycle) more, we [[1]] (reduce) a lot of waste. Unless companies [[2]] (stop) polluting, our rivers will get worse. If the government [[3]] (invest) in renewable energy, it [[4]] (create) thousands of jobs.',
        blanks: [
          { answer: 'recycles', accepted: ['recycles', 'recycle'], explain: 'If + presente simple: "If everyone recycles."' },
          { answer: '\'ll reduce', accepted: ['\'ll reduce', 'will reduce'], explain: 'Will + infinitivo en el resultado: "we\'ll reduce a lot of waste."' },
          { answer: 'stop', accepted: ['stop', 'stops'], explain: 'Unless + presente simple: "Unless companies stop polluting."' },
          { answer: 'invests', accepted: ['invests'], explain: 'If + presente simple: "If the government invests in renewable energy."' },
          { answer: '\'ll create', accepted: ['\'ll create', 'will create'], explain: 'Will + infinitivo en el resultado: "it\'ll create thousands of jobs."' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe first conditionals completos sobre situaciones reales.',
        type: 'write',
        items: [
          {
            scene: 'Un consejo de vida',
            prompt: 'Escribe un consejo usando "If you... , you will..." sobre salud, estudio o trabajo.',
            answer: 'If you sleep at least 8 hours a night, you\'ll feel much more productive.',
            accepted: ['if you', 'you\'ll', 'you will', 'you can', 'you might'],
            explain: 'Ejemplo: If you exercise regularly, you\'ll have more energy. / If you plan your day the night before, you\'ll be more organized.',
          },
          {
            scene: 'Una advertencia',
            prompt: 'Escribe una advertencia usando "Unless...". Puede ser sobre puntualidad, salud o trabajo.',
            answer: 'Unless you set an alarm, you\'ll be late for your interview.',
            accepted: ['unless', 'unless you', 'unless she', 'unless he', 'unless they', 'unless we'],
            explain: 'Ejemplo: Unless you rest, you\'ll get sick. / Unless she confirms, we won\'t reserve her seat.',
          },
          {
            scene: 'Una posibilidad',
            prompt: 'Escribe una posibilidad futura con "might" en el resultado (If... , might...).',
            answer: 'If the weather is good on Saturday, we might have a picnic.',
            accepted: ['might', 'if the', 'if i', 'if you', 'if she', 'if he', 'if they', 'if we'],
            explain: 'Ejemplo: If I have time, I might visit my grandparents. / If she applies, she might get the scholarship.',
          },
          {
            scene: 'Una promesa personal',
            prompt: 'Haz una promesa usando first conditional (If..., I\'ll...).',
            answer: 'If you help me prepare for the exam, I\'ll treat you to dinner.',
            accepted: ['if you', 'if i', 'if he', 'if she', 'if we', 'i\'ll', 'she\'ll', 'he\'ll', 'we\'ll', 'they\'ll'],
            explain: 'Ejemplo: If you come to my party, I\'ll introduce you to everyone. / If I get the promotion, I\'ll take the team out for lunch.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Consejos y consecuencias',
        tag: 'Producción libre',
        intro: 'Escribe 3 first conditionals sobre temas que te importen: trabajo, estudios, medio ambiente, etc.',
        type: 'write',
        items: [
          {
            scene: 'Tu futuro',
            prompt: 'Escribe una consecuencia positiva de algo que podrías hacer (If I..., I\'ll...).',
            answer: 'If I pass my English exam, I\'ll apply for an international job.',
            accepted: ['if i', 'if i pass', 'if i get', 'if i finish', 'if i study', 'i\'ll', 'i will'],
            explain: 'Usa: If I [acción], I\'ll [resultado]. Ej: If I save enough money, I\'ll travel to Korea next year.',
          },
          {
            scene: 'El mundo',
            prompt: 'Escribe una consecuencia sobre un problema global o social (If people..., ... will...).',
            answer: 'If people use public transport more often, air quality will improve significantly.',
            accepted: ['if people', 'if we', 'if governments', 'if companies', 'if the world', 'will improve', 'will decrease', 'will increase', 'will change'],
            explain: 'Ej: If more people vote, governments will listen to citizens. / If we reduce plastic use, oceans will be cleaner.',
          },
          {
            scene: 'Una advertencia amistosa',
            prompt: 'Escribe una advertencia para un amigo usando "unless" o "if you don\'t".',
            answer: 'Unless you back up your files regularly, you\'ll lose everything in a crash.',
            accepted: ['unless', 'if you don\'t', 'if she doesn\'t', 'if he doesn\'t', 'if they don\'t', 'if we don\'t'],
            explain: 'Usa: Unless you [acción], [consecuencia negativa]. Ej: Unless you call ahead, the restaurant might be closed.',
          },
        ],
      },
    ],
  },
}

export default topic
