import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adverbs-manner',
  order: '15',
  color: '#dc2626',
  category: 'Adverbs',
  level: 'A2',
  title: 'Adverbios de Modo en Inglés A2',
  shortTitle: 'Adverbios de Modo',
  metaTitle: 'Adverbios de Modo en Inglés A2 — Cómo se forma el -ly',
  description:
    'Los adverbios de modo describen cómo se realiza una acción: She speaks clearly. He drives carefully. En inglés la mayoría se forman añadiendo -ly al adjetivo. Van generalmente después del verbo o al final de la oración. Hay formas irregulares clave: good→well, fast→fast, hard→hard.',
  lead: 'Aprende a describir cómo se hacen las cosas: adjetivo + -ly, posición en la oración y las formas irregulares más importantes.',
  outcomes: [
    'Forma adverbios de modo añadiendo -ly al adjetivo',
    'Coloca el adverbio en la posición correcta de la oración',
    'Usa las formas irregulares: good→well, hard→hard, fast→fast',
    'Distingue adjetivos de adverbios en contexto',
  ],

  guide: {
    goal: 'Formar y usar adverbios de modo para describir cómo se realiza una acción.',
    model: 'She sings beautifully. / He explained it clearly. / They work hard. / She speaks English well.',
    formula: 'Adjective + -ly (placed after verb or at end of sentence)',
    decisions: [
      'General: adjetivo + -ly → quick→quickly, slow→slowly, careful→carefully, beautiful→beautifully',
      'Adjetivo en -y → cambia -y por -ily: happy→happily, easy→easily, heavy→heavily, angry→angrily',
      'Adjetivo en -le → cambia -e por -y: simple→simply, gentle→gently, possible→possibly',
      'Adjetivo en -ic → añade -ally: automatic→automatically, dramatic→dramatically',
      'Irregulares importantes: good→well (NO goodly), fast→fast (NO fastly), hard→hard (NO hardly = casi nunca), late→late (NO lately = últimamente)',
    ],
    table: [
      ['Adjetivo', 'Adverbio', 'Ejemplo'],
      ['quick', 'quickly', 'She answered quickly.'],
      ['good', 'well', 'He plays guitar well.'],
    ],
    mistakes: [
      '"She sings good" ❌ → "She sings well" ✓ — "good" es adjetivo; "well" es el adverbio.',
      '"He drives fastly" ❌ → "He drives fast" ✓ — "fast" es igual como adjetivo y adverbio.',
      '"She worked hardly" ❌ → "She worked hard" ✓ — "hardly" significa "casi nunca", no "con esfuerzo".',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forman los adverbios de modo en inglés?',
      paragraphs: [
        'Los adverbios de modo indican cómo se realiza una acción. La mayoría se forman añadiendo -ly al adjetivo: slow → slowly, careful → carefully, beautiful → beautifully.',
        'Hay que prestar atención a las reglas ortográficas: si el adjetivo termina en -y, cambia a -ily (happy→happily, easy→easily). Si termina en -le, cambia a -ly eliminando la -e (gentle→gently, simple→simply).',
      ],
    },
    {
      heading: 'Irregulares imprescindibles: well, fast, hard, late',
      paragraphs: [
        '"Well" es el adverbio de "good": "She is a good singer" (adjetivo) → "She sings well" (adverbio). Nunca se dice "She sings good" en inglés estándar.',
        '"Fast" funciona igual como adjetivo y adverbio: "He\'s a fast runner." (adjetivo) → "He runs fast." (adverbio). "Fastly" no existe.',
        '"Hard" funciona igual como adjetivo y adverbio: "It\'s a hard exam." → "I studied hard." "Hardly" existe pero significa "casi no": "I hardly slept last night" = dormí muy poco.',
        '"Late" igual como adj. y adv.: "the late bus" → "She arrived late." "Lately" significa "últimamente": "I haven\'t seen him lately."',
      ],
      table: [
        ['Adjetivo', 'Adverbio regular', 'Notas'],
        ['slow', 'slowly', '"Drive slowly" — no "drive slow" (informal)'],
        ['careful', 'carefully', '"Walk carefully" — dos sílabas en -ful → + -ly'],
        ['good', 'well', 'Irregular — "play well", never "play good"'],
        ['fast', 'fast', '"Run fast" — fastly no existe'],
        ['hard', 'hard', '"Study hard" — hardly = casi no'],
        ['late', 'late', '"Arrive late" — lately = últimamente'],
        ['happy', 'happily', '"She smiled happily" — y→ily'],
        ['easy', 'easily', '"I understood it easily" — y→ily'],
      ],
    },
    {
      heading: 'Posición de los adverbios de modo',
      paragraphs: [
        'Los adverbios de modo van normalmente DESPUÉS del verbo o al final de la oración: "She speaks English fluently." / "He explained the situation clearly." / "They worked together successfully."',
        'No van entre el verbo y su objeto directo: "She speaks fluently English" → incorrecto. Debe ser: "She speaks English fluently" o "She fluently speaks English" (más formal).',
        'Los adverbios de modo pueden ir al inicio de la oración para dar énfasis o en estilo literario: "Slowly, she opened the envelope." / "Nervously, he walked into the room."',
      ],
    },
    {
      heading: 'Diferencia entre adjetivo y adverbio: el error más común',
      paragraphs: [
        'El adjetivo modifica un sustantivo: "a quick response" / "a beautiful voice" / "a good student". El adverbio modifica un verbo: "She responded quickly." / "She sings beautifully." / "He studies well."',
        'Después de verbos copulativos (be, seem, look, sound, feel, taste, smell, appear), se usa ADJETIVO, no adverbio: "She looks tired" (no "tiredly") / "The soup tastes good" (no "well") / "He seems nervous" (no "nervously").',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más común es usar "good" como adverbio: "She dances good" → incorrecto. La forma correcta es "She dances well". En español usamos "bien" (que equivale a "well", no a "good").',
        'Otro error frecuente es crear formas que no existen: "fastly", "hardly" (con el significado de "hard"), "goodly". Estos tres adverbios son irregulares — fast, hard y well.',
        'También es común colocar el adverbio entre el verbo y el objeto: "She reads quickly the book" — incorrecto. El adverbio va después del objeto: "She reads the book quickly."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Adverbios de modo -ly, irregulares y posición en la oración A2.',
    graphicPrompt: 'Acciones descritas con adverbios de modo en situaciones cotidianas.',
    scene: [
      ['She speaks English very fluently.', 'Ella habla inglés con mucha fluidez.'],
      ['He works hard every day.', 'Él trabaja duro todos los días.'],
      ['The teacher explained it clearly.', 'La profesora lo explicó claramente.'],
      ['She plays the piano beautifully.', 'Ella toca el piano maravillosamente.'],
      ['They finished the project quickly.', 'Terminaron el proyecto rápidamente.'],
      ['He drives carefully in the rain.', 'Él maneja con cuidado en la lluvia.'],
      ['She smiled happily when she heard the news.', 'Ella sonrió felizmente cuando escuchó la noticia.'],
      ['He answered incorrectly.', 'Él respondió incorrectamente.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['good→well (not goodly)', 'fast→fast (not fastly)', 'hard→hard (hardly = almost never)', 'adverb after verb/object'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el adverbio correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el adverbio de modo correcto para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de idiomas',
            lines: [['', 'She speaks French ___.']],
            options: ['fluently', 'fluent', 'fluentedly', 'fluence'],
            answer: 'fluently',
            explain: '"Fluent" (adjetivo) + -ly → "fluently". Modifica el verbo "speaks".',
          },
          {
            scene: 'Describiendo a alguien',
            lines: [['', 'He plays the guitar ___ — he\'s been practicing for years.']],
            options: ['well', 'good', 'goodly', 'nicely'],
            answer: 'well',
            explain: '"Good" → adverbio irregular "well". "She plays well" — nunca "plays good".',
          },
          {
            scene: 'En la carretera',
            lines: [['', 'The car was going too ___ — the driver was speeding.']],
            options: ['fast', 'fastly', 'quickly', 'rapid'],
            answer: 'fast',
            explain: '"Fast" es igual como adjetivo y adverbio. "Fastly" no existe en inglés.',
          },
          {
            scene: 'Estudiando',
            lines: [['', 'You need to study ___ if you want to pass the exam.']],
            options: ['hard', 'hardly', 'hardily', 'hard-ly'],
            answer: 'hard',
            explain: '"Hard" (con esfuerzo) es igual como adj. y adv. "Hardly" significa "casi no" — significado diferente.',
          },
          {
            scene: 'Instrucción',
            lines: [['', 'Please walk ___ — the floor is wet.']],
            options: ['carefully', 'careful', 'caringly', 'care'],
            answer: 'carefully',
            explain: '"Careful" + -ly → "carefully". La forma adjetiva "careful" sería incorrecta después del verbo.',
          },
          {
            scene: 'Hablando de alguien tímido',
            lines: [['', 'She answered the question ___ — she wasn\'t sure if she was right.']],
            options: ['nervously', 'nervous', 'nervously', 'nerveously'],
            answer: 'nervously',
            explain: '"Nervous" (adj) + -ly → "nervously".',
          },
          {
            scene: 'Noticia inesperada',
            lines: [['', 'He accepted the job offer ___ — he didn\'t even think about it.']],
            options: ['quickly', 'quick', 'fastly', 'speed'],
            answer: 'quickly',
            explain: '"Quick" + -ly → "quickly". "Quickly" y "fast" pueden usarse de forma similar, pero "quickly" es más formal.',
          },
          {
            scene: 'Habilidad en la cocina',
            lines: [['', 'She prepared the whole meal ___ — she\'s a natural.']],
            options: ['easily', 'easy', 'easely', 'easyly'],
            answer: 'easily',
            explain: '"Easy" termina en -y → cambia a -ily: "easily".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Adjetivo y adverbio juntos',
        tag: '2 espacios',
        intro: 'Completa con el adjetivo o adverbio correcto según el contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Descripción de un músico',
            lines: [['', 'He\'s a [[0]] musician. He plays every instrument [[1]].']],
            blanks: [
              { options: ['talented', 'talentedly', 'talent', 'talenting'], answer: 'talented', explain: '"A talented musician" — adjetivo modifica sustantivo.' },
              { options: ['well', 'good', 'goodly', 'nicely'], answer: 'well', explain: '"He plays well" — adverbio. "Good" es el adjetivo de "well".' },
            ],
          },
          {
            scene: 'Instrucciones de seguridad',
            lines: [['', 'Drive [[0]] on this road — it\'s dangerous. And always brake [[1]] at the intersections.']],
            blanks: [
              { options: ['carefully', 'careful', 'caringly', 'care'], answer: 'carefully', explain: '"Drive carefully" — adverbio (modifica verbo "drive").' },
              { options: ['slowly', 'slow', 'slowy', 'slowedly'], answer: 'slowly', explain: '"Brake slowly" — adverbio.' },
            ],
          },
          {
            scene: 'En el trabajo',
            lines: [['', 'She is a [[0]] worker. She always arrives [[1]] and stays until the job is done.']],
            blanks: [
              { options: ['hard', 'hardly', 'hardworking', 'hardily'], answer: 'hardworking', explain: '"A hardworking worker" — adjetivo compuesto para describir el sustantivo.' },
              { options: ['early', 'earlier', 'earlly', 'earlyly'], answer: 'early', explain: '"Arrives early" — "early" es igual como adjetivo y adverbio.' },
            ],
          },
          {
            scene: 'Hablando de habilidades de idiomas',
            lines: [['', 'Her English is [[0]]. She speaks it [[1]] for someone who only started two years ago.']],
            blanks: [
              { options: ['excellent', 'excellently', 'excellence', 'excelling'], answer: 'excellent', explain: '"Her English is excellent" — adjetivo después de verbo copulativo "is".' },
              { options: ['fluently', 'fluent', 'fluentedly', 'fluence'], answer: 'fluently', explain: '"She speaks it fluently" — adverbio después del verbo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un talento especial',
        tag: 'Texto guiado',
        intro: 'Elige el adverbio correcto para describir las habilidades de esta persona.',
        type: 'guidedText',
        scene: 'Elige el adverbio correcto para describir las habilidades de esta persona.',
        text: 'My colleague Ana is incredibly talented. She speaks three languages [[0]] (fluent/fluently). She types [[1]] (quick/quickly) — I\'ve timed her at 90 words per minute. She listens [[2]] (careful/carefully) during meetings and remembers every detail. She explains complex ideas [[3]] (clear/clearly) and everyone understands her immediately. She treats her colleagues [[4]] (kind/kindly). And despite all her talents, she works [[5]] (hard/hardly) and never expects special treatment. I think she does her job better than [[6]] (good/well) — she does it brilliantly!',
        blanks: [
          { options: ['fluently', 'fluent', 'fluentedly', 'fluence'], answer: 'fluently', explain: '"Speaks fluently" — adverbio después del verbo.' },
          { options: ['quickly', 'quick', 'quickedy', 'quickness'], answer: 'quickly', explain: '"Types quickly" — adverbio.' },
          { options: ['carefully', 'careful', 'caringly', 'care'], answer: 'carefully', explain: '"Listens carefully" — adverbio.' },
          { options: ['clearly', 'clear', 'clearedly', 'clarity'], answer: 'clearly', explain: '"Explains clearly" — adverbio.' },
          { options: ['kindly', 'kind', 'kindedly', 'kindness'], answer: 'kindly', explain: '"Treats kindly" — adverbio.' },
          { options: ['hard', 'hardly', 'hardily', 'hardness'], answer: 'hard', explain: '"Works hard" — irregular. "Hardly" significaría "casi no trabaja".' },
          { options: ['well', 'good', 'goodly', 'better'], answer: 'well', explain: '"Does it well" — adverbio de "good". El adverbio correcto es "well".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el adverbio',
        tag: 'Texto libre',
        intro: 'Escribe el adverbio de modo del adjetivo entre paréntesis.',
        type: 'freeText',
        scene: 'Escribe el adverbio de modo del adjetivo entre paréntesis.',
        text: 'My morning routine: I wake up [[0]] (quiet) to not disturb my roommates. I get dressed [[1]] (quick) and eat [[2]] (happy) while listening to music. I walk to the bus stop [[3]] (slow) to enjoy the morning. I read on the bus — something I do [[4]] (easy) even in a moving vehicle. At work I try to respond to emails [[5]] (prompt) — it\'s a habit I\'ve developed over the years.',
        blanks: [
          { answer: 'quietly', accepted: ['quietly'], explain: '"Quiet" + -ly → "quietly".' },
          { answer: 'quickly', accepted: ['quickly'], explain: '"Quick" + -ly → "quickly".' },
          { answer: 'happily', accepted: ['happily'], explain: '"Happy" → -ily: "happily".' },
          { answer: 'slowly', accepted: ['slowly'], explain: '"Slow" + -ly → "slowly".' },
          { answer: 'easily', accepted: ['easily'], explain: '"Easy" → -ily: "easily".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando adverbios de modo para describir cómo haces las cosas.',
        type: 'write',
        items: [
          {
            scene: 'Tu habilidad',
            prompt: 'Describe algo que haces muy bien (usa well, fluently, easily, quickly u otro adverbio).',
            answer: 'I think I communicate well in writing — I express my ideas clearly and concisely.',
            accepted: ['well', 'fluently', 'easily', 'quickly', 'clearly', 'accurately', 'confidently', 'naturally'],
            explain: 'Ejemplo: I cook well. / I play football fairly well. / I can explain ideas clearly.',
          },
          {
            scene: 'Tu forma de trabajar',
            prompt: 'Describe cómo trabajas o estudias (usa hard, carefully, quickly, etc.).',
            answer: 'I work hard but I also take breaks regularly to stay focused.',
            accepted: ['work hard', 'study hard', 'work carefully', 'work slowly', 'study carefully', 'work quickly'],
            explain: 'Ejemplo: I study carefully and review everything twice. / I work quickly under pressure.',
          },
          {
            scene: 'Describiendo a alguien',
            prompt: 'Describe cómo hace algo una persona que admiras (usa un adverbio de modo).',
            answer: 'My mother speaks to everyone kindly and listens patiently.',
            accepted: ['kindly', 'patiently', 'confidently', 'brilliantly', 'naturally', 'elegantly', 'tirelessly', 'honestly'],
            explain: 'Ejemplo: My coach explains techniques clearly. / My friend sings beautifully.',
          },
          {
            scene: 'Error vs. corrección',
            prompt: 'Corrige esta oración y escribe la correcta: "She drives very good but parks very bad."',
            answer: 'She drives very well but parks very badly.',
            accepted: ['she drives well', 'drives well', 'parks badly'],
            explain: '"Good" → well (adverbio); "bad" → badly (adverbio).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu perfil profesional',
        tag: 'Producción libre',
        intro: 'Describe tus habilidades profesionales o personales usando 3 adverbios de modo diferentes.',
        type: 'write',
        items: [
          {
            scene: 'Tu perfil',
            prompt: 'Escribe una habilidad que tienes usando "I [verb] + adverb" (e.g., I communicate clearly).',
            answer: 'I communicate clearly both in writing and in presentations.',
            accepted: ['communicate clearly', 'work independently', 'learn quickly', 'speak fluently', 'analyze data carefully', 'solve problems creatively', 'listen actively', 'collaborate well', 'write professionally'],
            explain: 'Ejemplo: I work independently. / I learn new software quickly. / I handle pressure calmly.',
          },
          {
            scene: 'Tu perfil',
            prompt: 'Escribe algo que haces con esfuerzo o dedicación (usa hard, carefully, diligently).',
            answer: 'I work hard to meet all my deadlines and I review my work carefully before submitting.',
            accepted: ['work hard', 'study hard', 'work carefully', 'prepare diligently', 'train hard', 'practice consistently'],
            explain: 'Ejemplo: I prepare presentations carefully. / I work hard to improve every day.',
          },
          {
            scene: 'Tu perfil',
            prompt: 'Escribe algo negativo de manera positiva: algo que no haces bien todavía pero trabajas para mejorar.',
            answer: 'I don\'t speak publicly as confidently as I\'d like yet, but I practice regularly.',
            accepted: ['as well', 'as confidently', 'as clearly', 'as quickly', 'as fluently', 'as effectively'],
            explain: 'Ejemplo: I don\'t delegate tasks as easily as I should, but I\'m improving. / I don\'t always explain things as clearly as I\'d like.',
          },
        ],
      },
    ],
  },
}

export default topic
