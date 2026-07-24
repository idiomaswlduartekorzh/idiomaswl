import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'first-conditional',
  order: '08',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'El Primer Condicional en Inglés A2',
  shortTitle: '1er Condicional',
  metaTitle: 'Primer Condicional en Inglés A2 — If + Present, Will',
  description:
    'El primer condicional expresa situaciones reales o posibles en el futuro: "If it rains, I\'ll take an umbrella." La cláusula con "if" usa el presente simple (nunca "will"), y la cláusula resultado usa "will". Es el condicional de la vida real — situaciones que son genuinamente posibles.',
  lead: 'Expresa situaciones futuras posibles: si pasa X, entonces Y. If + presente → will + verbo base.',
  outcomes: [
    'Forma oraciones condicionales con if + presente → will',
    'Evita el error de usar "will" en la cláusula con "if"',
    'Invierte el orden de las cláusulas con y sin coma',
    'Usa unless para expresar "si no"',
  ],

  guide: {
    goal: 'Expresar condiciones futuras posibles usando if + presente simple en la condición y will + verbo base en el resultado.',
    model: 'If it rains, we won\'t go to the beach. / You\'ll be late if you don\'t hurry.',
    formula: 'If + present simple, will + base verb. / Will + base verb + if + present simple.',
    decisions: [
      'Cláusula "if" → SIEMPRE presente simple, nunca will: "If you study..." (NO "If you will study")',
      'Cláusula resultado → will/won\'t + verbo base: "...you\'ll pass the exam"',
      'El orden puede invertirse: con "if" al inicio → coma; con "if" al final → sin coma',
      '"Unless" = "if... not": "Unless you hurry..." = "If you don\'t hurry..."',
      'En la cláusula "if" también se pueden usar can, must, have to además de will: "If you can come, please let me know."',
    ],
    table: [
      ['Cláusula', 'Estructura', 'Ejemplo'],
      ['Condición (if)', 'If + presente simple', 'If it rains...'],
      ['Resultado', 'will/won\'t + base verb', '...I\'ll stay home.'],
    ],
    mistakes: [
      '"If you will come, I will be happy" ❌ → "If you come, I\'ll be happy" ✓ — sin "will" en la cláusula "if".',
      '"If it will rain" ❌ → "If it rains" ✓ — presente simple en la condición.',
      '"If you study, you pass" ❌ (en este contexto) → "If you study, you\'ll pass" ✓ — resultado futuro lleva will.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el primer condicional en inglés?',
      paragraphs: [
        'El primer condicional (First Conditional) expresa situaciones futuras que son reales y posibles — hay una probabilidad genuina de que ocurran. Se diferencia del segundo condicional (hipotético) en que aquí la condición es creíble: "If it rains tomorrow, we\'ll cancel the picnic" — es perfectamente posible que llueva.',
        'La estructura tiene dos partes: la cláusula de condición (con "if" + presente simple) y la cláusula de resultado (con "will" + verbo base). La regla más importante: NUNCA uses "will" en la cláusula que empieza con "if".',
      ],
    },
    {
      heading: 'Estructura del primer condicional',
      paragraphs: [
        'Estructura 1 — If al inicio: If + presente simple, will + verbo base. La coma es obligatoria cuando "if" va al principio.',
        'Estructura 2 — If al final: Will + verbo base + if + presente simple. Sin coma.',
        'Ejemplos: "If you study hard, you\'ll pass the exam." = "You\'ll pass the exam if you study hard." El significado es idéntico — solo cambia el orden.',
      ],
      examples: [
        ['Estructura', 'Ejemplo'],
        ['If al inicio', 'If she calls, I\'ll answer immediately.'],
        ['If al final', 'I\'ll answer immediately if she calls.'],
        ['Negativo en "if"', 'If you don\'t eat, you\'ll be hungry.'],
        ['Negativo en resultado', 'If you come early, we won\'t wait for you.'],
        ['Unless', 'Unless you hurry, you\'ll miss the bus.'],
      ],
    },
    {
      heading: 'La regla de oro: nunca "will" después de "if"',
      paragraphs: [
        'El error más común en el primer condicional es poner "will" en la cláusula "if": "If you will come" — INCORRECTO. En inglés, la palabra "if" en las condicionales "activa" el presente simple como marcador de futuro.',
        'Compara con el español: en español también usamos presente después de "si" cuando hablamos del futuro: "Si llueve, me quedo en casa" (no "Si lloverá"). La lógica es la misma en inglés: "If it rains, I\'ll stay home."',
      ],
    },
    {
      heading: 'Unless: "si no" en inglés',
      paragraphs: [
        '"Unless" equivale a "si no" o "a menos que". "Unless you hurry" = "If you don\'t hurry". Se usa con la misma estructura que "if" + presente simple.',
        'Ejemplos: "Unless it rains, we\'ll have the party outside." (= "If it doesn\'t rain...") / "I\'ll help you unless you prefer to work alone." (= "...if you don\'t prefer to work alone.")',
      ],
    },
    {
      heading: 'Primer vs. segundo condicional',
      paragraphs: [
        'El primer condicional habla de situaciones POSIBLES en la realidad: "If I get the job, I\'ll be very happy" (es posible que consiga el trabajo).',
        'El segundo condicional habla de situaciones HIPOTÉTICAS o improbables: "If I got the job, I would be very happy" (me imagino en esa situación, pero no es algo que espere realmente). El segundo condicional se aprende en B1.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Primer condicional: if + presente → will para situaciones futuras posibles.',
    graphicPrompt: 'Escenas de causa y efecto posibles: lluvia y sombrilla, estudio y examen.',
    scene: [
      ['If it rains, we\'ll stay inside.', 'Si llueve, nos quedaremos adentro.'],
      ['You\'ll feel better if you sleep early.', 'Te sentirás mejor si duermes temprano.'],
      ['If she doesn\'t call, I\'ll text her.', 'Si no llama, le escribiré un mensaje.'],
      ['We\'ll miss the train if we don\'t hurry!', '¡Perderemos el tren si no nos apuramos!'],
      ['If you study every day, you\'ll improve fast.', 'Si estudias todos los días, mejorarás rápido.'],
      ['I won\'t come unless you invite me.', 'No vendré a menos que me invites.'],
      ['If you need help, I\'ll be here.', 'Si necesitas ayuda, estaré aquí.'],
      ['Will you come if we have the party on Friday?', '¿Vendrás si hacemos la fiesta el viernes?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['if + present (no will)', 'result clause + will', 'unless = if not', 'comma when if is first'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica la estructura correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la opción correcta para completar las oraciones condicionales.',
        type: 'choice',
        items: [
          {
            scene: 'Planes para el fin de semana',
            lines: [['', 'If it ___ sunny, we\'ll go to the park.']],
            options: ['is', 'will be', 'was', 'be'],
            answer: 'is',
            explain: 'En la cláusula "if" → presente simple: "If it is sunny..." Nunca "will be".',
          },
          {
            scene: 'Consejo a un amigo',
            lines: [['', 'You ___ feel much better if you drink more water.']],
            options: ['\'ll', 'would', 'do', 'are'],
            answer: '\'ll',
            explain: 'Resultado → will + verbo base: "You\'ll feel better".',
          },
          {
            scene: 'Advertencia',
            lines: [['', 'If you ___ study, you won\'t pass the exam.']],
            options: ['don\'t', 'won\'t', 'didn\'t', 'aren\'t'],
            answer: 'don\'t',
            explain: 'Cláusula "if" negativa → don\'t + verbo base (presente simple).',
          },
          {
            scene: 'Invitación con condición',
            lines: [['', '___ you come if we change the date to Saturday?']],
            options: ['Will', 'Would', 'Do', 'Are'],
            answer: 'Will',
            explain: 'Pregunta en primer condicional: "Will you come if...?" — Will al inicio.',
          },
          {
            scene: 'Consecuencia negativa',
            lines: [['', 'We ___ miss the last bus if we don\'t leave now.']],
            options: ['\'ll', 'would', 'do', 'are going'],
            answer: '\'ll',
            explain: '"We\'ll miss the bus" — resultado en will.',
          },
          {
            scene: 'Condición con unless',
            lines: [['', '___ it stops raining, the match will be cancelled.']],
            options: ['Unless', 'If', 'When', 'Although'],
            answer: 'Unless',
            explain: '"Unless it stops raining" = "If it doesn\'t stop raining" — expresa una condición negativa.',
          },
          {
            scene: 'Error a detectar',
            lines: [['', 'If she ___ call, I\'ll know she\'s okay.']],
            options: ['calls', 'will call', 'called', 'is calling'],
            answer: 'calls',
            explain: 'Después de "if" → presente simple: "if she calls", nunca "if she will call".',
          },
          {
            scene: 'Promesa condicional',
            lines: [['', 'I won\'t tell anyone if you ___ me the truth.']],
            options: ['tell', 'will tell', 'told', 'tells'],
            answer: 'tell',
            explain: '"If you tell me" — presente simple en la cláusula "if".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos partes del condicional',
        tag: '2 espacios',
        intro: 'Completa la condición (if + presente) y el resultado (will).',
        type: 'dual',
        items: [
          {
            scene: 'Decidiendo si salir',
            lines: [['', 'If it [[0]] raining by noon, we [[1]] for a walk.']],
            blanks: [
              { options: ['stops', 'will stop', 'stopped', 'stop'], answer: 'stops', explain: '"If it stops raining" — presente simple en cláusula "if".' },
              { options: ['\'ll go', 'would go', 'go', 'went'], answer: '\'ll go', explain: '"We\'ll go" — will + base verb en el resultado.' },
            ],
          },
          {
            scene: 'Estudiando para el examen',
            lines: [['', 'If you [[0]] your notes, you [[1]] everything for the exam.']],
            blanks: [
              { options: ['review', 'will review', 'reviewed', 'reviews'], answer: 'review', explain: '"If you review" — presente simple.' },
              { options: ['\'ll remember', 'would remember', 'remember', 'remembered'], answer: '\'ll remember', explain: '"You\'ll remember" — will + base verb.' },
            ],
          },
          {
            scene: 'Invitación condicionada',
            lines: [
 ['A:', 'Will you come to my graduation?'],
 ['B:', 'Of course! If they [[0]] me the day off, I [[1]] there.'],
 ],
            blanks: [
              { options: ['give', 'will give', 'gave', 'gives'], answer: 'give', explain: '"If they give me the day off" — presente simple.' },
              { options: ['\'ll be', 'would be', 'am', 'was'], answer: '\'ll be', explain: '"I\'ll be there" — will + base.' },
            ],
          },
          {
            scene: 'Advertencia de salud',
            lines: [['', 'You [[0]] better quickly if you [[1]] plenty of rest.']],
            blanks: [
              { options: ['\'ll feel', 'would feel', 'feel', 'felt'], answer: '\'ll feel', explain: '"You\'ll feel" — resultado en will.' },
              { options: ['get', 'will get', 'got', 'gets'], answer: 'get', explain: '"If you get plenty of rest" — presente simple.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Consejos de viaje',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta del verbo para completar estos consejos de viaje.',
        type: 'guidedText',
        scene: 'Elige la forma correcta del verbo para completar estos consejos de viaje.',
        text: 'Planning a trip? Here are some tips. If you [[0]] (book) your flights early, you [[1]] (save) a lot of money. You [[2]] (have) more options if you [[3]] (travel) in the low season. If you [[4]] (not / speak) the local language, a translation app [[5]] (help) you a lot. Unless you [[6]] (pack) light, you [[7]] (pay) extra for luggage. Have a great trip!',
        blanks: [
          { options: ['book', 'will book', 'booked', 'books'], answer: 'book', explain: 'Cláusula "if" → presente simple: "if you book".' },
          { options: ['\'ll save', 'would save', 'save', 'saved'], answer: '\'ll save', explain: 'Resultado → will: "you\'ll save money".' },
          { options: ['\'ll have', 'would have', 'have', 'had'], answer: '\'ll have', explain: 'Resultado antes del "if" → will: "You\'ll have more options".' },
          { options: ['travel', 'will travel', 'traveled', 'travels'], answer: 'travel', explain: '"If you travel in the low season" → presente simple.' },
          { options: ['don\'t speak', 'won\'t speak', 'didn\'t speak', 'not speak'], answer: 'don\'t speak', explain: '"If you don\'t speak" → presente simple negativo.' },
          { options: ['\'ll help', 'would help', 'helps', 'helped'], answer: '\'ll help', explain: '"A translation app will help" → resultado en will.' },
          { options: ['pack', 'will pack', 'packed', 'packs'], answer: 'pack', explain: '"Unless you pack light" → presente simple (unless + presente).' },
          { options: ['\'ll pay', 'would pay', 'pay', 'paid'], answer: '\'ll pay', explain: '"You\'ll pay extra" → resultado en will.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa los condicionales',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del verbo (if + presente o resultado + will).',
        type: 'freeText',
        scene: 'Escribe la forma correcta del verbo (if + presente o resultado + will).',
        text: 'My resolutions: If I [[0]] (wake up) early every day, I [[1]] (have) more time to exercise. I [[2]] (feel) healthier if I [[3]] (eat) more vegetables. If I [[4]] (study) English for 30 minutes daily, my level [[5]] (improve) significantly by the end of the year.',
        blanks: [
          { answer: 'wake up', accepted: ['wake up'], explain: '"If I wake up" → presente simple en cláusula if.' },
          { answer: '\'ll have', accepted: ["'ll have", 'will have'], explain: '"I\'ll have more time" → resultado con will.' },
          { answer: '\'ll feel', accepted: ["'ll feel", 'will feel'], explain: '"I\'ll feel healthier" → resultado con will.' },
          { answer: 'eat', accepted: ['eat'], explain: '"If I eat" → presente simple.' },
          { answer: 'study', accepted: ['study'], explain: '"If I study" → presente simple.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones condicionales reales sobre tu vida.',
        type: 'write',
        items: [
          {
            scene: 'Motivación personal',
            prompt: 'Escribe una consecuencia positiva de estudiar inglés (If I practice... I\'ll...).',
            answer: 'If I practice English every day, I\'ll be fluent in two years.',
            accepted: ['if i', 'if i practice', 'if i study', 'if i use', 'if i speak'],
            explain: 'Ejemplo: If I learn more vocabulary, I\'ll communicate better. / If I watch films in English, I\'ll improve my listening.',
          },
          {
            scene: 'Plan para el fin de semana',
            prompt: 'Escribe un plan condicionado por el tiempo (if the weather is...).',
            answer: 'If the weather is good, I\'ll go for a long hike in the mountains.',
            accepted: ['if the weather', 'if it is', 'if it\'s', 'if the sun', 'if it rains'],
            explain: 'Ejemplo: If it\'s sunny, I\'ll go to the park. / If it rains, I\'ll stay home and read.',
          },
          {
            scene: 'Advertencia amistosa',
            prompt: 'Escribe una advertencia con "If you don\'t..." o "Unless..."',
            answer: 'If you don\'t get enough sleep, you\'ll feel terrible tomorrow.',
            accepted: ["if you don't", 'unless you', "if she doesn't", "if he doesn't", "if they don't"],
            explain: 'Ejemplo: If you don\'t eat, you\'ll be hungry. / Unless you call me, I won\'t know where you are.',
          },
          {
            scene: 'Decisión con condición',
            prompt: 'Escribe una decisión condicionada a algo (uso profesional o personal).',
            answer: 'If they offer me the job, I\'ll definitely accept it.',
            accepted: ['if they', 'if he', 'if she', 'if it', 'if we', 'if you'],
            explain: 'Ejemplo: If the price drops, I\'ll buy the tickets. / If the presentation goes well, we\'ll celebrate.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu plan de acción',
        tag: 'Producción libre',
        intro: 'Crea un plan de acción personal con 3 oraciones condicionales (if + presente → will).',
        type: 'write',
        items: [
          {
            scene: 'Tu plan',
            prompt: 'Escribe una condición relacionada con tu trabajo o estudios y su resultado positivo.',
            answer: 'If I finish this project on time, my team will be really pleased.',
            accepted: ['if i finish', 'if i complete', 'if i pass', 'if i get', 'if i study', 'if i work'],
            explain: 'Ejemplo: If I get a promotion this year, I\'ll save more money. / If I pass the exam, I\'ll apply for the university.',
          },
          {
            scene: 'Tu plan',
            prompt: 'Escribe una condición sobre tu salud o bienestar y lo que harás.',
            answer: 'If I exercise three times a week, I\'ll have more energy every day.',
            accepted: ['if i exercise', 'if i sleep', 'if i eat', 'if i drink', 'if i rest', 'if i stop'],
            explain: 'Ejemplo: If I drink more water, I\'ll feel better. / If I sleep 8 hours, I\'ll be more productive.',
          },
          {
            scene: 'Tu plan',
            prompt: 'Escribe una consecuencia negativa de algo que NO debes hacer (If I don\'t... / Unless...).',
            answer: 'Unless I start saving money now, I won\'t be able to travel next year.',
            accepted: ["if i don't", 'unless i', "if i don't study", "if i don't save", "if i don't practice"],
            explain: 'Ejemplo: If I don\'t review my notes, I won\'t pass the exam. / Unless I improve my diet, I\'ll keep feeling tired.',
          },
        ],
      },
    ],
  },
}

export default topic
