import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbes-irreguliers',
  order: '13',
  color: '#1a2ecc',
  category: 'Verbes',
  level: 'A1',
  title: 'Les Verbes Irréguliers Essentiels en Français A1',
  shortTitle: 'Verbes irréguliers',
  metaTitle: 'Verbos irregulares en francés A1 — aller, faire, vouloir, pouvoir, prendre',
  description:
    'Los cinco verbos irregulares más importantes del francés A1: aller (ir), faire (hacer), vouloir (querer), pouvoir (poder) y prendre (tomar/coger). Cada uno tiene su propio patrón de conjugación y aparece en cientos de expresiones cotidianas.',
  lead: 'En francés, los cinco verbos más usados después de être y avoir son todos irregulares. Memorizarlos es obligatorio — aparecerán en cada conversación desde el primer día.',
  outcomes: [
    'Conjuga aller, faire, vouloir, pouvoir y prendre en presente',
    'Usa estas formas en expresiones cotidianas',
    'Reconoce los patrones comunes de irregularidad',
  ],

  guide: {
    goal: 'Conjugar y usar los cinco verbos irregulares más frecuentes del francés A1.',
    model: 'Je vais à Paris. Qu\'est-ce que tu fais ? Elle veut apprendre. Vous pouvez venir. Ils prennent le bus.',
    formula: 'Memorización por verbo + patrón de alta frecuencia',
    decisions: [
      'aller: vais/vas/va/allons/allez/vont — muy irregular, pero indispensable para el futur proche (aller + inf.)',
      'faire: fais/fais/fait/faisons/faites/font — "faites" es excepción (no "faisez")',
      'vouloir: veux/veux/veut/voulons/voulez/veulent — doble vocal eu/eu/eu cambia en plural',
      'pouvoir: peux/peux/peut/pouvons/pouvez/peuvent — mismo patrón que vouloir',
      'prendre: prends/prends/prend/prenons/prenez/prennent — doble n en plural (prennent)',
    ],
    table: [
      ['Pronombre', 'aller / faire', 'vouloir / pouvoir'],
      ['je', 'vais / fais', 'veux / peux'],
      ['tu', 'vas / fais', 'veux / peux'],
      ['il/elle', 'va / fait', 'veut / peut'],
      ['nous', 'allons / faisons', 'voulons / pouvons'],
      ['vous', 'allez / faites', 'voulez / pouvez'],
      ['ils/elles', 'vont / font', 'veulent / peuvent'],
    ],
    mistakes: [
      '"Vous faisez" ❌ → "vous faites" ✓ — "faites" es una forma irregular única',
      '"Il veulent" ❌ → "ils veulent" ✓ — 3.a persona plural siempre con ils/elles',
      '"Je vai" ❌ → "je vais" ✓ — la forma de "je" es "vais" (irregular total)',
    ],
  },

  seo: [
    {
      heading: '¿Cuáles son los verbos irregulares esenciales del francés A1?',
      paragraphs: [
        'Después de "être" y "avoir", los verbos más usados en francés cotidiano son precisamente aller, faire, vouloir, pouvoir y prendre. Son tan frecuentes que en cualquier conversación básica aparecerán varios de ellos. La mala noticia es que son todos irregulares; la buena, que una vez memorizados te abren la puerta a miles de frases.',
        'Además, "aller" es la base del futur proche (je vais manger = voy a comer), "faire" aparece en decenas de expresiones (faire du sport, faire la cuisine, faire un voyage), y "pouvoir" + "vouloir" son los verbos modales más usados del francés. Esta es la conjugación completa de los cinco en presente:',
      ],
      table: [
        ['Pronombre', 'aller', 'faire', 'prendre'],
        ['je', 'vais', 'fais', 'prends'],
        ['tu', 'vas', 'fais', 'prends'],
        ['il / elle / on', 'va', 'fait', 'prend'],
        ['nous', 'allons', 'faisons', 'prenons'],
        ['vous', 'allez', 'faites', 'prenez'],
        ['ils / elles', 'vont', 'font', 'prennent'],
      ],
    },
    {
      heading: '¿Cómo se conjuga el verbo aller en francés?',
      paragraphs: [
        '"Aller" significa "ir" y es totalmente irregular — sus formas no se parecen al infinitivo: je vais, tu vas, il va, nous allons, vous allez, ils vont. Nota que "nous allons" y "vous allez" sí parecen regulares con raíz all-.',
        'Las expresiones más importantes: aller à + ciudad (je vais à Paris), aller + infinitivo para el futuro próximo (je vais manger = voy a comer), comment allez-vous ? (¿cómo está usted?), ça va ? (¿qué tal?).',
      ],
    },
    {
      heading: 'Faire: el verbo del hacer',
      paragraphs: [
        '"Faire" = hacer. Conjugación: je fais, tu fais, il fait, nous faisons, vous faites, ils font. Ojo: "vous faites" es irregular (no "faisez") y "ils font" también.',
        'Expresiones frecuentes: faire du sport (hacer deporte), faire la cuisine (cocinar), faire un voyage (hacer un viaje), faire des études (estudiar), qu\'est-ce que tu fais ? (¿qué haces?), il fait beau/chaud/froid (hace buen tiempo/calor/frío).',
      ],
    },
    {
      heading: '¿Cómo se conjugan vouloir y pouvoir en francés?',
      paragraphs: [
        '"Vouloir" (querer) y "pouvoir" (poder) comparten el mismo patrón: singular en -eux/-eux/-eut y plural en -ons/-ez con la vocal que cambia (voulons/pouvons, veulent/peuvent). Son los dos verbos modales más usados y siempre van seguidos de infinitivo: "je veux apprendre", "tu peux venir". Esta es su conjugación en paralelo:',
      ],
      table: [
        ['Pronombre', 'vouloir', 'pouvoir'],
        ['je', 'veux', 'peux'],
        ['tu', 'veux', 'peux'],
        ['il / elle / on', 'veut', 'peut'],
        ['nous', 'voulons', 'pouvons'],
        ['vous', 'voulez', 'pouvez'],
        ['ils / elles', 'veulent', 'peuvent'],
      ],
    },
    {
      heading: '¿Por qué "vous faites" y no "vous faisez"?',
      paragraphs: [
        'Porque faire es irregular en la 2ª persona del plural: la forma correcta es "vous faites", no "vous faisez". Es una de las tres formas de vous irregulares del francés (junto a "vous êtes" y "vous dites"). También son irregulares "ils font" (no "ils faisent") y "ils vont" (aller). Estas formas hay que memorizarlas porque rompen el patrón regular de -ez/-ent. "Prendre" añade otra trampa: la doble n de "ils prennent" (base de apprendre → ils apprennent, comprendre → ils comprennent).',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Los cinco verbos irregulares más frecuentes de A1: aller, faire, vouloir, pouvoir, prendre.',
    graphicPrompt: 'Tabla de conjugación de los cinco verbos con sus patrones destacados.',
    scene: [
      ['aller', 'je vais / tu vas / il va / nous allons / ils vont'],
      ['faire', 'je fais / vous faites / ils font'],
      ['vouloir', 'je veux / il veut / ils veulent'],
      ['pouvoir', 'je peux / il peut / ils peuvent'],
      ['prendre', 'je prends / il prend / ils prennent'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['vous faites (no faisez)', 'ils vont / ils font', 'veulent / peuvent / prennent'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo irregular.',
        type: 'choice',
        items: [
          {
            scene: 'Bruno planifica la semana',
            lines: [['Bruno', 'Je ___ à Bogotá lundi. (aller)']],
            options: ['vais', 'vas', 'va', 'allons'],
            answer: 'vais',
            explain: '"Je" + aller → "vais". Forma totalmente irregular.',
          },
          {
            scene: 'Sara pregunta a los estudiantes',
            lines: [['Sara', 'Qu\'est-ce que vous ___ ce week-end ? (faire)']],
            options: ['faites', 'faisez', 'font', 'faisons'],
            answer: 'faites',
            explain: '"Vous" + faire → "faites" (no "faisez" — es irregular).',
          },
          {
            scene: 'Carlos quiere aprender coreano',
            lines: [['Carlos', 'Il ___ apprendre le coréen. (vouloir)']],
            options: ['veut', 'veux', 'veulent', 'voulons'],
            answer: 'veut',
            explain: '"Il" + vouloir → "veut".',
          },
          {
            scene: 'Ana y Lina van al café',
            lines: [['Ana', 'Elles ___ au café après les cours. (aller)']],
            options: ['vont', 'vais', 'va', 'allez'],
            answer: 'vont',
            explain: '"Elles" + aller → "vont".',
          },
          {
            scene: 'Marco no puede venir',
            lines: [['Marco', 'Je ne ___ pas venir ce soir. (pouvoir)']],
            options: ['peux', 'peut', 'pouvons', 'peuvent'],
            answer: 'peux',
            explain: '"Je" + pouvoir → "peux".',
          },
          {
            scene: 'Sofia toma el metro',
            lines: [['Sofia', 'Ils ___ le métro pour aller au travail. (prendre)']],
            options: ['prennent', 'prends', 'prend', 'prenons'],
            answer: 'prennent',
            explain: '"Ils" + prendre → "prennent" (doble n en plural).',
          },
          {
            scene: 'Lina pregunta si pueden estudiar',
            lines: [['Lina', 'Est-ce que vous ___ étudier avec moi ? (pouvoir)']],
            options: ['pouvez', 'peuvent', 'peux', 'pouvons'],
            answer: 'pouvez',
            explain: '"Vous" + pouvoir → "pouvez".',
          },
          {
            scene: 'Bruno y Sara organizan clases',
            lines: [['Bruno', 'Nous ___ une réunion demain. (faire)']],
            options: ['faisons', 'faites', 'font', 'fais'],
            answer: 'faisons',
            explain: '"Nous" + faire → "faisons".',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Elige las dos formas verbales correctas en cada contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Carlos habla de sus planes',
            lines: [['Carlos', 'Je [[0]] aller à Paris — je [[1]] visiter la tour Eiffel. (aller / vouloir)']],
            blanks: [
              { options: ['vais', 'vas', 'va', 'allons'], answer: 'vais', explain: '"Je" + aller → "vais".' },
              { options: ['veux', 'veut', 'veulent', 'voulez'], answer: 'veux', explain: '"Je" + vouloir → "veux".' },
            ],
          },
          {
            scene: 'Sara organiza actividades',
            lines: [['Sara', 'Les étudiants [[0]] des exercices et ils [[1]] du sport. (faire / faire)']],
            blanks: [
              { options: ['font', 'faites', 'faisons', 'fais'], answer: 'font', explain: '"Les étudiants" (ils) + faire → "font".' },
              { options: ['font', 'faites', 'faisons', 'fais'], answer: 'font', explain: '"Ils" + faire → "font".' },
            ],
          },
          {
            scene: 'Ana y Marco discuten el transporte',
            lines: [['Ana', 'Tu [[0]] le bus ou tu [[1]] à pied ? (prendre / aller)']],
            blanks: [
              { options: ['prends', 'prend', 'prennent', 'prenons'], answer: 'prends', explain: '"Tu" + prendre → "prends".' },
              { options: ['vas', 'vais', 'vont', 'allez'], answer: 'vas', explain: '"Tu" + aller → "vas".' },
            ],
          },
          {
            scene: 'Bruno y Lina pueden o quieren',
            lines: [['Bruno', 'Nous [[0]] vous aider si vous [[1]] apprendre. (pouvoir / vouloir)']],
            blanks: [
              { options: ['pouvons', 'peuvent', 'peux', 'pouvez'], answer: 'pouvons', explain: '"Nous" + pouvoir → "pouvons".' },
              { options: ['voulez', 'veulent', 'veux', 'voulons'], answer: 'voulez', explain: '"Vous" + vouloir → "voulez".' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Un día con WeLearn',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de cada verbo irregular en este texto sobre un día de clase.',
        type: 'guidedText',
        scene: 'Un día típico con Bruno y sus estudiantes en WeLearn. Elige el verbo correcto.',
        text: 'Le matin, Bruno [[0]] (aller) à l\'académie. Les étudiants [[1]] (vouloir) commencer les cours tôt. Carlos [[2]] (prendre) le bus et Ana [[3]] (faire) du vélo. Sara leur [[4]] (demander, irrégulier — demande) : « Qu\'est-ce que vous [[5]] (vouloir) apprendre aujourd\'hui ? » Tout le monde [[6]] (pouvoir) poser des questions. À midi, ils [[7]] (faire) une pause.',
        blanks: [
          { options: ['va', 'vais', 'vas', 'vont'], answer: 'va', explain: '"Bruno" (il) + aller → "va".' },
          { options: ['veulent', 'veut', 'veux', 'voulez'], answer: 'veulent', explain: '"Les étudiants" (ils) + vouloir → "veulent".' },
          { options: ['prend', 'prends', 'prennent', 'prenons'], answer: 'prend', explain: '"Carlos" (il) + prendre → "prend".' },
          { options: ['fait', 'fais', 'font', 'faites'], answer: 'fait', explain: '"Ana" (elle) + faire → "fait".' },
          { options: ['demande', 'demandes', 'demandons', 'demandez'], answer: 'demande', explain: '"Sara" (elle) + demander → "demande" (verbe -er régulier).' },
          { options: ['voulez', 'veulent', 'veux', 'voulons'], answer: 'voulez', explain: '"Vous" + vouloir → "voulez".' },
          { options: ['peut', 'peux', 'peuvent', 'pouvons'], answer: 'peut', explain: '"Tout le monde" = il → "peut".' },
          { options: ['font', 'faites', 'faisons', 'fais'], answer: 'font', explain: '"Ils" + faire → "font".' },
        ],
      },
      {
        id: 'l4',
        title: 'Conjuga sin ayuda',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del verbo irregular entre paréntesis.',
        type: 'freeText',
        scene: 'Sofia escribe sobre sus planes. Conjuga los verbos irregulares.',
        text: 'Ce week-end, je [[0]] (aller) à Medellín. Je [[1]] (vouloir) visiter le musée. Mes amis [[2]] (prendre) le train avec moi. On [[3]] (pouvoir) visiter beaucoup d\'endroits. Et toi, qu\'est-ce que tu [[4]] (faire) ce week-end ?',
        blanks: [
          { answer: 'vais', accepted: ['vais'], explain: '"Je" + aller → "vais".' },
          { answer: 'veux', accepted: ['veux'], explain: '"Je" + vouloir → "veux".' },
          { answer: 'prennent', accepted: ['prennent'], explain: '"Mes amis" (ils) + prendre → "prennent" (double n).' },
          { answer: 'peut', accepted: ['peut'], explain: '"On" se conjuga como "il" → "peut".' },
          { answer: 'fais', accepted: ['fais'], explain: '"Tu" + faire → "fais".' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con los verbos irregulares indicados.',
        type: 'write',
        items: [
          {
            scene: 'Bruno habla de sus planes de viaje',
            prompt: 'Di que Bruno va a Corea el mes que viene y que quiere practicar coreano (aller + vouloir).',
            answer: 'Bruno va en Corée le mois prochain. Il veut pratiquer le coréen.',
            accepted: ['va en Corée', 'veut pratiquer', 'va à Séoul', 'veut apprendre'],
            explain: '"Bruno" (il) → "va" (aller) + "veut" (vouloir).',
          },
          {
            scene: 'Sara organiza actividades de clase',
            prompt: 'Di que los estudiantes hacen ejercicios y toman notas (faire + prendre, ils).',
            answer: 'Les étudiants font des exercices et prennent des notes.',
            accepted: ['font des exercices', 'prennent des notes', 'font du sport', 'prennent le bus'],
            explain: '"Ils" → "font" (faire) + "prennent" (prendre — double n).',
          },
          {
            scene: 'Carlos y Lina planean el fin de semana',
            prompt: 'Di que Carlos y Lina pueden venir y que quieren ir al cine (pouvoir + vouloir + aller).',
            answer: 'Carlos et Lina peuvent venir. Ils veulent aller au cinéma.',
            accepted: ['peuvent venir', 'veulent aller', 'peuvent aller', 'veulent venir'],
            explain: '"Ils" → "peuvent" + "veulent" + "vont" (si se usa el futur proche).',
          },
          {
            scene: 'Marco pregunta qué hacen',
            prompt: 'Pregunta a tus amigos qué hacen el sábado (qu\'est-ce que + faire + vous).',
            answer: "Qu'est-ce que vous faites samedi ?",
            accepted: ["qu'est-ce que vous faites", 'vous faites', 'faites-vous'],
            explain: '"Vous" + faire → "faites" (no "faisez" — es irregular).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: Describe tu semana',
        tag: 'Producción',
        intro: 'Misión: Describe tu semana usando al menos 3 de los 5 verbos irregulares (aller, faire, vouloir, pouvoir, prendre).',
        type: 'write',
        items: [
          {
            scene: 'Tus planes de esta semana (aller)',
            prompt: 'Di a dónde vas esta semana y con quién (aller, je/nous).',
            answer: 'Je vais à la bibliothèque lundi. Nous allons au restaurant vendredi.',
            accepted: ['je vais', 'nous allons', 'il va', 'elle va', 'ils vont'],
            explain: '"Je vais" / "nous allons" / "ils vont" — recuerda todas las formas irregulares de aller.',
          },
          {
            scene: 'Lo que haces / quieres hacer (faire / vouloir)',
            prompt: 'Di qué haces normalmente y qué quieres hacer esta semana (faire + vouloir).',
            answer: 'Je fais du sport le matin. Je veux apprendre une nouvelle langue.',
            accepted: ['je fais', 'je veux', 'nous faisons', 'nous voulons', 'il fait', 'elle veut'],
            explain: '"Je fais" (faire) + "je veux" (vouloir). Cuidado: "vous faites" (no faisez).',
          },
          {
            scene: 'Capacidades y medios de transporte (pouvoir + prendre)',
            prompt: 'Di que puedes hacer algo esta semana y cómo te desplazas (pouvoir + prendre).',
            answer: 'Je peux étudier deux heures par jour. Je prends le bus pour aller au travail.',
            accepted: ['je peux', 'je prends', 'nous pouvons', 'nous prenons', 'ils peuvent', 'ils prennent'],
            explain: '"Je peux" (pouvoir) + "je prends" (prendre). "Ils prennent" con doble n.',
          },
        ],
      },
    ],
  },
}

export default topic
