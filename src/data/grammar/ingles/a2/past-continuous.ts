import type { GrammarTopic } from '../../types'

/**
 * Pasado continuo — A2.
 *
 * Este tema faltaba, y lo encontró la auditoría pedagógica del vocabulario el 12 ago 2026:
 * trece ejemplos de fichas usaban gramática que A2 no enseñaba, y al abrir las fuentes
 * resultó que **dos episodios enteros de la serie del nivel** son lecciones de pasado
 * continuo —ep04 «Rainy Saturday» y ep17 «The Missing Key»— y que Cambridge y el English
 * Vocabulary Profile lo sitúan en A2. Es decir: el estudiante ya se lo encontraba escuchando,
 * y no tenía dónde estudiarlo.
 *
 * El reparto con B1 es deliberado y no un recorte. Aquí van la forma, la ortografía del -ing,
 * las tres formas de la oración y **una sola** combinación con pasado simple: la interrupción
 * con `when`, que es la que abre el ep04. `while`, la simultaneidad y el contraste fino con el
 * pasado simple viven en `past-continuous-b1`, que ya existía.
 *
 * Los ejemplos salen del local de Sam, igual que el vocabulario y la escucha del nivel: si el
 * estudiante llega aquí después del ep04, reconoce la escena.
 */
const topic: GrammarTopic = {
  slug: 'past-continuous-a2',
  order: '21',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'Past Continuous en Inglés A2',
  shortTitle: 'Past Continuous',
  metaTitle: 'Past Continuous A2 — Was/Were + -ing paso a paso',
  description:
    'El past continuous (was/were + -ing) cuenta lo que estaba pasando en un momento del pasado, no lo que pasó y se acabó. En A2 aprendes a formarlo, a escribir bien el -ing, a preguntar «What were you doing?» y a contar la acción larga que algo corto interrumpe.',
  lead:
    'Aprende a decir qué estabas haciendo: was/were + -ing, las reglas del -ing y la acción larga que se interrumpe.',
  outcomes: [
    'Forma el past continuous con was/were y el verbo en -ing',
    'Escribe bien el -ing en los tres casos que cambian: -e, CVC y -ie',
    'Pregunta y niega: «What were you doing?» / «I wasn’t listening»',
    'Cuenta la acción larga que una corta interrumpe, con when',
  ],

  guide: {
    goal:
      'Contar lo que estaba en marcha en un momento del pasado, y lo que lo interrumpió.',
    model:
      'We were painting the back wall. / What were you doing when I called? / I was carrying the chairs when it started to rain.',
    formula: 'Subject + was/were + verb-ing',
    decisions: [
      'was con I / he / she / it — were con you / we / they',
      'Acción en marcha en un momento pasado → «At six o’clock we were cleaning the shop.»',
      'Negativa: was not / were not, o wasn’t / weren’t → «Max wasn’t helping at all.»',
      'Pregunta: se adelanta was/were → «Were you painting?» / «What were you doing?»',
      'Acción larga interrumpida por una corta: la larga va en continuo, la corta en pasado simple con when → «I was holding two towels when the door opened.»',
      'Verbos de estado —know, want, like, need, have (poseer)— no se usan en continuo: «I knew it», no «I was knowing it».',
    ],
    table: [
      ['Forma', 'Estructura', 'Ejemplo'],
      ['Afirmativa', 'was/were + -ing', 'She was standing on a chair.'],
      ['Negativa', 'wasn’t/weren’t + -ing', 'He wasn’t helping at all.'],
      ['Pregunta', 'Was/Were + sujeto + -ing?', 'What were you doing?'],
    ],
    mistakes: [
      '«I was work» ❌ → «I was working» ✓ — el verbo siempre lleva -ing.',
      '«We was painting» ❌ → «We were painting» ✓ — we / you / they piden were.',
      '«I was wanting a coffee» ❌ → «I wanted a coffee» ✓ — los verbos de estado no van en continuo.',
      '«What you were doing?» ❌ → «What were you doing?» ✓ — en la pregunta, was/were va delante del sujeto.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el past continuous y en qué se diferencia del past simple?',
      paragraphs: [
        'El past continuous cuenta lo que **estaba pasando** en un momento del pasado; el past simple cuenta lo que **pasó y terminó**. «I painted the wall» dice que la pared quedó pintada. «I was painting the wall» dice que estabas en mitad de la faena, y deja la puerta abierta a que ocurriera otra cosa.',
        'Por eso el past continuous es el tiempo de las escenas: sirve para poner el escenario antes de contar lo que pasó de verdad. En español lo más parecido es «estaba pintando» o el imperfecto «pintaba», y esa cercanía ayuda — pero cuidado, porque el español usa el imperfecto en muchos más sitios que el inglés.',
      ],
      table: [
        ['Frase', 'Tiempo', 'Qué dice'],
        ['I cleaned the shop.', 'past simple', 'Lo limpié y terminé'],
        ['I was cleaning the shop.', 'past continuous', 'Estaba en ello, sin decir si acabé'],
        ['It rained on Saturday.', 'past simple', 'Llovió, hecho cerrado'],
        ['It was raining hard.', 'past continuous', 'Estaba lloviendo, escena en marcha'],
      ],
    },
    {
      heading: 'Cómo se forma: was/were + verbo en -ing',
      paragraphs: [
        'La estructura no cambia nunca: sujeto + was/were + verbo terminado en -ing. Solo hay que acertar con el auxiliar: **was** para I, he, she, it; **were** para you, we, they.',
        'I was working · You were working · He was working · She was working · It was working · We were working · They were working.',
        'Es el mismo reparto de was/were que ya conoces del past simple del verbo be, así que si dominas «I was tired / they were tired», ya tienes media batalla ganada.',
      ],
      table: [
        ['Sujeto', 'Auxiliar', 'Ejemplo'],
        ['I / he / she / it', 'was', 'She was standing on a chair.'],
        ['you / we / they', 'were', 'We were carrying the chairs inside.'],
      ],
    },
    {
      heading: 'Las tres reglas del -ing que sí cambian',
      paragraphs: [
        'La mayoría de verbos solo añaden -ing: work → working, paint → painting, carry → carrying, study → studying. Pero hay tres casos que cambian, y son los que más faltas producen.',
        'Regla 1 — Verbo terminado en -e muda: se quita la -e y se añade -ing. make → making, write → writing, dance → dancing, take → taking. Ojo: see → seeing, porque esa -ee no es muda.',
        'Regla 2 — Consonante-vocal-consonante con la sílaba acentuada al final: se duplica la consonante. run → running, sit → sitting, stop → stopping, get → getting, put → putting. No se duplica si la sílaba tónica no es la última: open → opening, listen → listening.',
        'Regla 3 — Verbo terminado en -ie: la -ie pasa a -y. lie → lying, die → dying, tie → tying. Son pocos, pero son frecuentes.',
      ],
      table: [
        ['Patrón', 'Regla', 'Ejemplos'],
        ['General', '+ ing', 'work→working, paint→painting'],
        ['Termina en -e muda', 'quita -e + ing', 'make→making, write→writing'],
        ['CVC tónica', 'duplica + ing', 'run→running, sit→sitting'],
        ['Termina en -ie', '-ie → -y + ing', 'lie→lying, die→dying'],
        ['Termina en -y', 'solo + ing', 'carry→carrying, study→studying'],
      ],
    },
    {
      heading: 'Preguntar y negar: «What were you doing?»',
      paragraphs: [
        'La pregunta se hace adelantando was/were, sin ningún «did»: «Were you painting?» / «Was she helping?». Si hay palabra interrogativa, va primero: «What were you doing?» / «Where were they going?».',
        'Este es un error muy común del hispanohablante, porque el español no mueve nada: «¿Qué estabas haciendo?» tiene el mismo orden que la afirmación. En inglés no: «What **were you** doing?», nunca «What you were doing?».',
        'La negativa es igual de simple: was not → wasn’t, were not → weren’t. «He wasn’t helping at all.» / «We weren’t listening.» En conversación casi siempre se usa la forma corta.',
      ],
    },
    {
      heading: 'La acción larga que algo interrumpe',
      paragraphs: [
        'Este es el uso que más rinde. Cuando una acción larga está en marcha y otra corta la corta por la mitad, la larga va en past continuous y la corta en past simple, unidas por **when**.',
        '«I was carrying the chairs **when** it started to rain.» — llevar las sillas venía de antes; empezar a llover es el momento puntual.',
        '«She was standing on a chair **when** the paint fell.» — el mismo reparto: escena en marcha + suceso.',
        'El truco para no equivocarse: pregúntate cuál de las dos acciones duraba más. Esa lleva el -ing. En B1 verás la otra manera de decir lo mismo, con **while**, y los casos donde las dos acciones son largas.',
      ],
    },
    {
      heading: 'Los verbos que no admiten -ing',
      paragraphs: [
        'Hay un grupo de verbos —los de estado— que no describen una acción sino una situación, y en inglés no se ponen en continuo: know, want, need, like, love, hate, understand, believe, remember, y have cuando significa «tener».',
        'Se dice «I knew the answer», no «I was knowing the answer». «She wanted a coffee», no «She was wanting a coffee». «We had a small shop», no «We were having a small shop».',
        'Excepción útil: cuando **have** no significa «tener» sino «tomar» o «pasar», sí admite continuo: «We were having lunch when he arrived» (estábamos almorzando).',
      ],
    },
    {
      heading: '¿Cuándo se usa el past continuous en inglés?',
      paragraphs: [
        'Para decir qué estaba en marcha en un momento del pasado («At six I was cleaning the shop»), para poner el escenario de una historia («It was raining hard»), y para la acción larga que una corta interrumpe («I was painting when the phone rang»). No se usa para hechos terminados: para eso está el past simple.',
      ],
    },
    {
      heading: '¿Cómo se pregunta en past continuous?',
      paragraphs: [
        'Adelantando was o were, sin «did»: «Were you working?». Con palabra interrogativa, esta va delante: «What were you doing?», «Where was she going?». El error típico del hispanohablante es no mover el auxiliar («What you were doing?»), porque en español el orden no cambia.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre «I was working» y «I worked»?',
      paragraphs: [
        '«I worked» dice que trabajaste y terminaste: es un hecho cerrado. «I was working» dice que estabas en mitad de ello, sin afirmar que acabaras, y suele preparar otra frase: «I was working when you called». En español la diferencia se parece a «trabajé» frente a «estaba trabajando».',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens:
      'Pasado continuo en A2: la forma was/were + -ing y la acción larga interrumpida, sobre las escenas del local de Sam.',
    graphicPrompt:
      'Un sábado de lluvia en una cafetería a medio montar: una persona pintando una pared, otra metiendo sillas, un gato dormido bajo la mesa.',
    scene: [
      ['What were you doing when I called?', '¿Qué estabas haciendo cuando te llamé?'],
      ['We were painting the back wall.', 'Estábamos pintando la pared del fondo.'],
      ['Leo was standing on a chair.', 'Leo estaba de pie en una silla.'],
      ['It was raining hard.', 'Estaba lloviendo fuerte.'],
      ['I was carrying the chairs inside.', 'Yo estaba metiendo las sillas.'],
      ['Max was sleeping under the table.', 'Max estaba durmiendo debajo de la mesa.'],
      ['He wasn’t helping at all.', 'No estaba ayudando nada.'],
      ['She was smiling when she came back.', 'Estaba sonriendo cuando volvió.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['paint', 'carry', 'stand', 'rain', 'sleep', 'help', 'run', 'write', 'sit', 'work'],
    reviewFocus: ['was vs were', '-ing spelling', 'when + past simple', 'stative verbs'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Was o were',
        tag: 'Opción múltiple',
        intro: 'Elige el auxiliar que pide cada sujeto.',
        type: 'choice',
        items: [
          {
            scene: 'Sábado de lluvia',
            lines: [['', 'We ___ painting the back wall.']],
            options: ['were', 'was', 'are', 'is'],
            answer: 'were',
            explain: '«We» pide **were**. Was es solo para I, he, she, it.',
          },
          {
            scene: 'Sábado de lluvia',
            lines: [['', 'Leo ___ standing on a chair.']],
            options: ['was', 'were', 'is', 'be'],
            answer: 'was',
            explain: '«Leo» es tercera persona del singular → **was**.',
          },
          {
            scene: 'En la cocina',
            lines: [['', 'It ___ raining hard.']],
            options: ['was', 'were', 'is', 'did'],
            answer: 'was',
            explain: '«It» pide **was**. Para el tiempo atmosférico se usa siempre it.',
          },
          {
            scene: 'El gato',
            lines: [['', 'Max ___ sleeping under the table.']],
            options: ['was', 'were', 'was not', 'is'],
            answer: 'was',
            explain: '«Max» es una sola persona (o un solo gato) → **was**.',
          },
          {
            scene: 'Los dos socios',
            lines: [['', 'You and I ___ carrying the chairs inside.']],
            options: ['were', 'was', 'are', 'be'],
            answer: 'were',
            explain: '«You and I» equivale a «we» → **were**.',
          },
          {
            scene: 'Los clientes',
            lines: [['', 'The first customers ___ looking around slowly.']],
            options: ['were', 'was', 'are', 'is'],
            answer: 'were',
            explain: 'Sujeto en plural («customers») → **were**.',
          },
          {
            scene: 'La entrevista',
            lines: [['', 'I ___ waiting outside the office.']],
            options: ['was', 'were', 'am', 'did'],
            answer: 'was',
            explain: '«I» pide **was**, aunque en presente lleve «am».',
          },
          {
            scene: 'La llave perdida',
            lines: [['', 'She ___ smiling and she had the key in her hand.']],
            options: ['was', 'were', 'is', 'be'],
            answer: 'was',
            explain: '«She» → **was**. Fíjate en que «had» va en pasado simple: es un estado, no una acción en marcha.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'El -ing que cambia',
        tag: 'Opción múltiple',
        intro: 'Elige la forma en -ing bien escrita.',
        type: 'choice',
        items: [
          {
            scene: 'En la pared del fondo',
            lines: [['', 'They were ___ the shop all morning.']],
            options: ['painting', 'painteing', 'paintting', 'paintng'],
            answer: 'painting',
            explain: '«Paint» es el caso general: solo se añade -ing.',
          },
          {
            scene: 'Detrás del mostrador',
            lines: [['', 'He was ___ a note for the next shift.']],
            options: ['writing', 'writeing', 'writting', 'writeng'],
            answer: 'writing',
            explain: '«Write» termina en -e muda: se quita la -e → writing.',
          },
          {
            scene: 'La cocina',
            lines: [['', 'She was ___ at the small table near the window.']],
            options: ['sitting', 'siting', 'sitteing', 'sittting'],
            answer: 'sitting',
            explain: '«Sit» es consonante-vocal-consonante tónica: se duplica la t → sitting.',
          },
          {
            scene: 'El reparto',
            lines: [['', 'The driver was ___ to the door with two boxes.']],
            options: ['running', 'runing', 'runneing', 'runnig'],
            answer: 'running',
            explain: '«Run» = CVC tónica → se duplica la n: running.',
          },
          {
            scene: 'La clase de cocina',
            lines: [['', 'We were ___ the vegetables when the teacher arrived.']],
            options: ['cutting', 'cuting', 'cutteing', 'cuted'],
            answer: 'cutting',
            explain: '«Cut» = CVC tónica → cutting. Fíjate en que en pasado simple no cambia (cut), pero en -ing sí duplica.',
          },
          {
            scene: 'El jardín',
            lines: [['', 'The cat was ___ under the table all afternoon.']],
            options: ['lying', 'lieing', 'lyeing', 'liing'],
            answer: 'lying',
            explain: '«Lie» termina en -ie: la -ie pasa a -y → lying.',
          },
          {
            scene: 'Las cajas',
            lines: [['', 'I was ___ two towels and a bucket at the same time.']],
            options: ['holding', 'holdding', 'holdeing', 'holdng'],
            answer: 'holding',
            explain: '«Hold» es caso general: solo -ing. No se duplica porque termina en dos consonantes (l+d).',
          },
          {
            scene: 'Estudiando de noche',
            lines: [['', 'She was ___ for the exam until midnight.']],
            options: ['studying', 'studing', 'studiing', 'studyng'],
            answer: 'studying',
            explain: '«Study» termina en -y: en el -ing la -y NO cambia → studying. (Sí cambia en pasado: studied.)',
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Preguntar y negar',
        tag: '2 espacios',
        intro: 'Completa la pregunta o la negativa con el auxiliar y el verbo.',
        type: 'dual',
        items: [
          {
            scene: 'Llamada del sábado',
            lines: [['', 'What [[0]] you [[1]] when I called?']],
            blanks: [
              { options: ['were', 'was', 'did', 'are'], answer: 'were', explain: '«You» pide **were**, y en la pregunta va delante del sujeto.' },
              { options: ['doing', 'do', 'did', 'done'], answer: 'doing', explain: 'El verbo principal siempre en -ing: doing.' },
            ],
          },
          {
            scene: 'El gato otra vez',
            lines: [['', 'Max [[0]] [[1]] at all.']],
            blanks: [
              { options: ['wasn’t', 'weren’t', 'didn’t', 'isn’t'], answer: 'wasn’t', explain: '«Max» → was, y la negativa se contrae en wasn’t.' },
              { options: ['helping', 'help', 'helped', 'helps'], answer: 'helping', explain: 'Tras wasn’t, el verbo va en -ing.' },
            ],
          },
          {
            scene: 'En la puerta',
            lines: [['', '[[0]] she [[1]] on a chair when you came in?']],
            blanks: [
              { options: ['Was', 'Were', 'Did', 'Is'], answer: 'Was', explain: '«She» → **Was**, y en la pregunta abre la frase.' },
              { options: ['standing', 'stand', 'stood', 'stands'], answer: 'standing', explain: 'El verbo principal en -ing: standing.' },
            ],
          },
          {
            scene: 'El turno de la mañana',
            lines: [['', 'We [[0]] [[1]] to the radio — the shop was completely quiet.']],
            blanks: [
              { options: ['weren’t', 'wasn’t', 'didn’t', 'aren’t'], answer: 'weren’t', explain: '«We» → were, negativa contraída: weren’t.' },
              { options: ['listening', 'listen', 'listened', 'listens'], answer: 'listening', explain: 'En -ing: listening. Fíjate en que «listen» no duplica la n (la sílaba tónica es la primera).' },
            ],
          },
        ],
      },
      {
        id: 'level-4',
        title: 'Aquel sábado de lluvia',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta para cada verbo entre paréntesis.',
        type: 'guidedText',
        scene: 'Elige la forma correcta para cada verbo entre paréntesis.',
        text: 'Last Saturday the shop was a disaster. At eleven we [[0]] (paint) the back wall and Leo [[1]] (stand) on a chair with the roller in one hand. Then it started to rain. It [[2]] (rain) so hard that we [[3]] (carry) the chairs inside for twenty minutes. I [[4]] (hold) two towels and a bucket at the same time, and I [[5]] (not laugh). Max [[6]] (sleep) under the table the whole time.',
        blanks: [
          { options: ['were painting', 'was painting', 'painted', 'were paint'], answer: 'were painting', explain: '«We» → were, y el verbo en -ing.' },
          { options: ['was standing', 'were standing', 'stood', 'was stand'], answer: 'was standing', explain: '«Leo» → was + standing.' },
          { options: ['was raining', 'were raining', 'rained', 'is raining'], answer: 'was raining', explain: '«It» → was + raining. La escena está en marcha.' },
          { options: ['were carrying', 'was carrying', 'carried', 'were carry'], answer: 'were carrying', explain: '«We» → were + carrying. «Carry» solo añade -ing.' },
          { options: ['was holding', 'were holding', 'held', 'was hold'], answer: 'was holding', explain: '«I» → was + holding.' },
          { options: ['was not laughing', 'were not laughing', 'did not laugh', 'was not laugh'], answer: 'was not laughing', explain: 'Negativa de «I»: was not + laughing.' },
          { options: ['was sleeping', 'were sleeping', 'slept', 'was sleep'], answer: 'was sleeping', explain: '«Max» → was + sleeping.' },
        ],
      },
      {
        id: 'level-5',
        title: 'La acción que se interrumpe',
        tag: 'Texto libre',
        intro:
          'Escribe el verbo entre paréntesis en past continuous o en past simple, según si la acción es la larga o la corta.',
        type: 'freeText',
        scene:
          'La acción larga va en past continuous; la corta que la interrumpe, en past simple.',
        text: 'I [[0]] (carry) the last chair when the door [[1]] (open). A customer [[2]] (wait) outside in the rain, so we [[3]] (let) her in. While the rain fell, she [[4]] (look) at the empty shelves and asked when we opened.',
        blanks: [
          { answer: 'was carrying', accepted: ['was carrying'], explain: 'Acción larga: was + carrying.' },
          { answer: 'opened', accepted: ['opened'], explain: 'Acción corta que interrumpe: pasado simple.' },
          { answer: 'was waiting', accepted: ['was waiting'], explain: 'Llevaba rato esperando → acción larga en continuo.' },
          { answer: 'let', accepted: ['let'], explain: '«Let» es irregular y no cambia en pasado: let. Es la acción corta.' },
          { answer: 'was looking', accepted: ['was looking', 'looked'], explain: 'Se acepta la de continuo (escena en marcha) y la de simple (hecho puntual): las dos se sostienen aquí.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones tuyas en past continuous.',
        type: 'write',
        items: [
          {
            scene: 'Ayer a las ocho',
            prompt: 'Escribe qué estabas haciendo ayer a las ocho de la tarde.',
            answer: 'At eight o’clock I was cooking dinner.',
            accepted: ['was watching', 'was cooking', 'was working', 'was studying', 'was reading', 'was talking', 'was eating', 'was sleeping', 'was listening', 'was walking'],
            explain: 'Ejemplo: At eight I was watching a series. / I was cooking dinner.',
          },
          {
            scene: 'Una interrupción',
            prompt: 'Cuenta algo largo que hacías cuando pasó algo corto. Usa «when».',
            answer: 'I was cooking when my phone rang.',
            accepted: ['when'],
            explain: 'La larga en continuo y la corta en simple: «I was walking home when it started to rain.»',
          },
          {
            scene: 'La pregunta',
            prompt: 'Escribe la pregunta «¿Qué estabas haciendo cuando te llamé?» en inglés.',
            answer: 'What were you doing when I called?',
            accepted: ['what were you doing'],
            explain: 'Recuerda mover el auxiliar: «What **were you** doing?», nunca «What you were doing?».',
          },
          {
            scene: 'Lo que no hacías',
            prompt: 'Escribe algo que NO estabas haciendo esta mañana, en negativa.',
            answer: 'I wasn’t working this morning.',
            accepted: ['wasn’t', 'was not', 'weren’t', 'were not'],
            explain: 'Ejemplo: I wasn’t sleeping. / We weren’t studying.',
          },
        ],
      },
      {
        id: 'level-7',
        title: 'Misión: cuenta tu sábado',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre un sábado tuyo, con al menos una interrupción.',
        type: 'write',
        items: [
          {
            scene: 'Tu historia',
            prompt: 'Empieza poniendo el escenario: qué estabas haciendo por la mañana.',
            answer: 'On Saturday morning I was cleaning my flat.',
            accepted: ['was ', 'were '],
            explain: 'Pon la escena en marcha: «I was cleaning…», «We were having breakfast…».',
          },
          {
            scene: 'Tu historia',
            prompt: 'Cuenta qué interrumpió esa escena. Usa «when» y un verbo en pasado simple.',
            answer: 'I was cleaning the kitchen when my neighbour knocked on the door.',
            accepted: ['when'],
            explain: 'La corta va en pasado simple: «…when the phone rang», «…when it started to rain».',
          },
          {
            scene: 'Tu historia',
            prompt: 'Cierra contando qué NO estabas haciendo, o qué estaba haciendo otra persona.',
            answer: 'My brother wasn’t helping — he was watching football.',
            accepted: ['was ', 'were ', 'wasn’t', 'weren’t', 'was not', 'were not'],
            explain: 'Ejemplo: «My sister was sleeping.» / «I wasn’t listening at all.»',
          },
        ],
      },
    ],
  },
}

export default topic
