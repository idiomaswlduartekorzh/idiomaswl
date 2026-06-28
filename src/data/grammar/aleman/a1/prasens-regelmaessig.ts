import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prasens-regelmaessig',
  order: '05',
  color: '#7c3aed',
  category: 'Verben',
  level: 'A1',
  title: 'Präsens regelmäßiger Verben im Deutschen A1',
  shortTitle: 'Präsens regelmäßig',
  metaTitle: 'Präsens regelmäßige Verben Deutsch A1 — arbeiten, wohnen, spielen',
  description:
    'Los verbos regulares alemanes en presente siguen un patrón sistemático: se extrae el radical (Stamm) y se añaden las terminaciones -e, -st, -t, -en, -t, -en. A diferencia del francés, las terminaciones alemanas siempre se pronuncian y no son mudas.',
  lead: 'Los verbos regulares del alemán siguen un patrón fijo. Diferencia clave con el español: el verbo va SIEMPRE en segunda posición en la oración.',
  outcomes: ['Conjuga verbos regulares en presente', 'Recuerda las 6 terminaciones', 'Aplica la regla de la segunda posición'],

  guide: {
    goal: 'Conjugar verbos regulares alemanes (trabajar, vivir, jugar, etc.) en presente de indicativo.',
    model: 'Ich arbeite. / Du wohnst in Berlin. / Sie spielen Tennis.',
    formula: 'Stamm (radical) + terminación según pronombre',
    decisions: [
      'Radical: infinitivo − en: wohnen → wohn-, spielen → spiel-, arbeiten → arbeit-',
      'Terminaciones: -e, -st, -t, -en, -t, -en (ich/du/er/wir/ihr/sie)',
      'Verbos con Stamm en -t/-d: añadir -e- antes de st/t: arbeiten → du arbeitest, er arbeitet',
      'El verbo va en segunda posición: "Ich wohne in Berlin" / "In Berlin wohne ich" (no "In Berlin ich wohne")',
    ],
    table: [
      ['Pronombre', 'Terminación', 'wohnen'],
      ['ich', '-e', 'wohne'],
      ['du', '-st', 'wohnst'],
      ['er/sie/es', '-t', 'wohnt'],
      ['wir', '-en', 'wohnen'],
      ['ihr', '-t', 'wohnt'],
      ['sie/Sie', '-en', 'wohnen'],
    ],
    mistakes: [
      '"Ich wohnen" ❌ — no uses el infinitivo para "ich": "ich wohne" ✓',
      '"In Berlin ich wohne" ❌ — el verbo siempre en segunda posición: "In Berlin wohne ich" ✓',
      '"Du wohnst" no "du wohnt" — "du" toma -st, no -t',
    ],
  },

  seo: [
    {
      heading: 'Los verbos regulares del alemán: un patrón sistemático',
      paragraphs: [
        'A diferencia del francés donde muchas terminaciones son mudas, en alemán todas las terminaciones verbales se pronuncian claramente. El presente de los verbos regulares se forma: radical + terminación (-e/-st/-t/-en/-t/-en).',
        'El radical se obtiene quitando -en del infinitivo: wohnen → wohn-, spielen → spiel-, hören → hör-, lernen → lern-. Los verbos cuyo radical termina en -t o -d añaden una -e- antes de -st y -t por razones de pronunciación: arbeiten → arbeit- → du arbeitest, er arbeitet.',
      ],
    },
    {
      heading: 'Las 6 terminaciones del presente regular',
      paragraphs: [
        'Ich: -e (ich wohne), du: -st (du wohnst), er/sie/es: -t (er wohnt), wir: -en (wir wohnen), ihr: -t (ihr wohnt), sie/Sie: -en (sie wohnen).',
        'Nota: wir y sie/Sie tienen la misma terminación que el infinitivo (-en). Esto facilita la memorización: wir/sie/Sie = igual al infinitivo.',
      ],
    },
    {
      heading: 'La regla de la segunda posición (V2)',
      paragraphs: [
        'En alemán, el verbo conjugado siempre ocupa la segunda posición en la oración declarativa. "Segunda posición" no significa segunda palabra, sino segundo elemento (chunk): Ich wohne in Berlin. / In Berlin wohne ich. / Morgens lerne ich Deutsch.',
        'Esta regla de V2 (Verb-Zweit) es una de las características más importantes del alemán y diferencia radicalmente su sintaxis del español.',
      ],
    },
    {
      heading: 'Verbos regulares frecuentes en A1',
      paragraphs: [
        'Algunos verbos regulares esenciales para A1: wohnen (vivir/habitar), arbeiten (trabajar), spielen (jugar), lernen (aprender), hören (escuchar), kaufen (comprar), kochen (cocinar), machen (hacer), sagen (decir), kommen (venir — irregular en formas).',
        'También: trinken (beber — ligeramente irregular), essen (comer — irregular), schreiben (escribir — regular), lesen (leer — irregular en du/er). En A1 nos centramos en los perfectamente regulares.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Verbos regulares alemanes: terminaciones y regla V2.',
    graphicPrompt: 'Tabla de conjugación con wohnen y arbeiten como modelos.',
    scene: [
      ['ich wohne', 'Ich wohne in Madrid.'],
      ['du wohnst', 'Wo wohnst du? — ¿Dónde vives?'],
      ['er/sie wohnt', 'Er wohnt in München.'],
      ['wir wohnen', 'Wir wohnen zusammen. — Vivimos juntos.'],
      ['ihr wohnt', 'Wohnt ihr in der Stadt?'],
      ['sie wohnen', 'Sie wohnen auf dem Land. — Viven en el campo.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['wohnen', 'arbeiten', 'spielen', 'lernen', 'hören', 'kaufen', 'kochen', 'machen'],
    reviewFocus: ['terminaciones -e/-st/-t/-en', 'verbos en -t/-d: arbeit-e-st', 'V2 regla'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Wähle die richtige Verbform (elige la forma verbal correcta).',
        type: 'choice',
        items: [
          { scene: 'Hablando de dónde vives', lines: [['', 'Ich ___ in Hamburg. (wohnen)']], options: ['wohne', 'wohnst', 'wohnt', 'wohnen'], answer: 'wohne', explain: '"Ich" → terminación -e: "wohne".' },
          { scene: 'Hablando del trabajo', lines: [['', 'Du ___ sehr viel. (arbeiten)']], options: ['arbeitest', 'arbeitet', 'arbeite', 'arbeiten'], answer: 'arbeitest', explain: '"Du" + radical en -t → añadir -e-: "arbeitest".' },
          { scene: 'Hablando de aficiones', lines: [['', 'Sie (ella) ___ Gitarre. (spielen)']], options: ['spielt', 'spielst', 'spiele', 'spielen'], answer: 'spielt', explain: '"Sie" (ella) → terminación -t: "spielt".' },
          { scene: 'En clase de idiomas', lines: [['', 'Wir ___ zusammen Deutsch. (lernen)']], options: ['lernen', 'lernst', 'lerne', 'lernt'], answer: 'lernen', explain: '"Wir" → terminación -en: "lernen" (igual al infinitivo).' },
          { scene: 'En casa con amigos', lines: [['', 'Ihr ___ oft Musik. (hören)']], options: ['hört', 'hören', 'hörst', 'höre'], answer: 'hört', explain: '"Ihr" → terminación -t: "hört".' },
          { scene: 'En el supermercado', lines: [['', 'Sie (ellos) ___ im Supermarkt. (kaufen)']], options: ['kaufen', 'kauft', 'kaufst', 'kaufe'], answer: 'kaufen', explain: '"Sie" (plural) → terminación -en: "kaufen".' },
          { scene: 'En la cocina', lines: [['', '___ du gern? (kochen)']], options: ['Kochst', 'Koche', 'Kochen', 'Kocht'], answer: 'Kochst', explain: 'Pregunta con "du" → "kochst". Verbo al inicio.' },
          { scene: 'Planificando el día', lines: [['', 'Was ___ du heute? (machen)']], options: ['machst', 'macht', 'mache', 'machen'], answer: 'machst', explain: '"Du" → "machst". Pregunta con "was" al inicio, verbo en segunda posición.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Sujeto + verbo',
        tag: '2 espacios',
        intro: 'Completa el sujeto y el verbo conjugado.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] viel Sport. (ellos)']],
            blanks: [
              { options: ['Sie', 'Er', 'Wir', 'Ihr'], answer: 'Sie', explain: '"Ellos/ellas" → "sie" (minúscula).' },
              { options: ['machen', 'macht', 'machst', 'mache'], answer: 'machen', explain: '"Sie" (plural) → "machen".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] in einer Schule. (ella)']],
            blanks: [
              { options: ['Sie', 'Er', 'Du', 'Ich'], answer: 'Sie', explain: '"Ella" → "sie" (singular femenino).' },
              { options: ['arbeitet', 'arbeite', 'arbeitest', 'arbeiten'], answer: 'arbeitet', explain: '"Sie" (ella) → "arbeitet" (-et por radical en -t).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Morgens [[0]] [[1]] Kaffee. (ich)']],
            blanks: [
              { options: ['trinke', 'trinkst', 'trinkt', 'trinken'], answer: 'trinke', explain: '"Ich" → "trinke". El sujeto "ich" va después del verbo porque el adverbio "morgens" ocupa el primer lugar.' },
              { options: ['ich', 'er', 'wir', 'sie'], answer: 'ich', explain: 'Con "morgens" en posición 1: Morgens + verbo + sujeto. Verbo en posición 2.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] Fußball? (vosotros, spielen)']],
            blanks: [
              { options: ['Spielt', 'Spielst', 'Spielen', 'Spiele'], answer: 'Spielt', explain: '"Ihr" → "spielt". Pregunta: verbo al inicio.' },
              { options: ['ihr', 'du', 'wir', 'sie'], answer: 'ihr', explain: 'Pregunta a un grupo informal → "ihr".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Conjuga cada verbo en la persona indicada.',
        type: 'guidedText',
        scene: 'Conjuga cada verbo en la persona indicada.',
        text: 'Mein Alltag: Ich [[0]] (wohnen) in Köln. Morgens [[1]] ich (arbeiten) von 9 bis 17 Uhr. Meine Kollegen [[2]] (kommen) auch früh. Nach der Arbeit [[3]] ich (lernen) Spanisch. Mein Freund Pedro [[4]] (wohnen) in Madrid. Wir [[5]] (schreiben) uns oft auf Deutsch und Spanisch. Abends [[6]] wir (telefonieren) manchmal.',
        blanks: [
          { options: ['wohne', 'wohnst', 'wohnt', 'wohnen'], answer: 'wohne', explain: '"Ich" → "wohne".' },
          { options: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten'], answer: 'arbeite', explain: '"Morgens arbeite ich" — V2: verbo en 2ª posición.' },
          { options: ['kommen', 'kommt', 'kommst', 'komme'], answer: 'kommen', explain: '"Meine Kollegen" (sie, plural) → "kommen".' },
          { options: ['lerne', 'lernst', 'lernt', 'lernen'], answer: 'lerne', explain: '"Nach der Arbeit lerne ich" — V2.' },
          { options: ['wohnt', 'wohne', 'wohnst', 'wohnen'], answer: 'wohnt', explain: '"Pedro" (er) → "wohnt".' },
          { options: ['schreiben', 'schreibt', 'schreibst', 'schreibe'], answer: 'schreiben', explain: '"Wir" → "schreiben".' },
          { options: ['telefonieren', 'telefoniert', 'telefoniere', 'telefonierst'], answer: 'telefonieren', explain: '"Wir" → "telefonieren". "Abends telefonieren wir" — V2.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Conjuga los verbos en la forma correcta.',
        type: 'freeText',
        scene: 'Conjuga los verbos en la forma correcta.',
        text: 'Meine Familie [[0]] (wohnen) in Madrid. Mein Vater [[1]] (arbeiten) als Arzt. Meine Mutter [[2]] (lernen) Deutsch. Ich [[3]] (spielen) Gitarre. Wir [[4]] (hören) gern Musik zusammen.',
        blanks: [
          { answer: 'wohnt', accepted: ['wohnt'], explain: '"Meine Familie" (sie, singular) → "wohnt".' },
          { answer: 'arbeitet', accepted: ['arbeitet'], explain: '"Mein Vater" (er) → "arbeitet" (-et wegen Stamm -t).' },
          { answer: 'lernt', accepted: ['lernt'], explain: '"Meine Mutter" (sie) → "lernt".' },
          { answer: 'spiele', accepted: ['spiele'], explain: '"Ich" → "spiele".' },
          { answer: 'hören', accepted: ['hören'], explain: '"Wir" → "hören".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas usando verbos regulares alemanes.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di dónde vives (wohnen) y qué estudias (lernen).',
            answer: 'Ich wohne in Bogotá. Ich lerne Deutsch.',
            accepted: ['ich wohne', 'ich lerne'],
            explain: 'Ejemplo: Ich wohne in Berlin. Ich lerne Spanisch und Deutsch.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hace alguien que conoces (arbeiten/spielen/kochen).',
            answer: 'Mein Bruder spielt Fußball und kocht gern.',
            accepted: ['wohnt', 'arbeitet', 'spielt', 'kocht', 'lernt', 'macht', 'hört', 'kauft'],
            explain: 'Ejemplo: Meine Mutter arbeitet in einem Krankenhaus. / Mein Freund spielt Tennis.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hacen tú y tus amigos/familia (wir + verbo).',
            answer: 'Wir lernen zusammen Deutsch.',
            accepted: ['wir wohnen', 'wir arbeiten', 'wir spielen', 'wir lernen', 'wir hören', 'wir kochen'],
            explain: 'Ejemplo: Wir spielen Tennis am Wochenende. / Wir hören gern Musik zusammen.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Usa la regla V2: empieza la oración con un adverbio de tiempo (morgens/abends/oft).',
            answer: 'Morgens trinke ich Kaffee.',
            accepted: ['morgens ', 'abends ', 'oft ', 'manchmal ', 'jeden tag '],
            explain: 'V2: adverbio + verbo + sujeto. Ejemplo: Abends lerne ich Deutsch. / Oft koche ich für meine Familie.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu día a día con al menos 4 verbos distintos.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué haces por la mañana (morgens) usando V2.',
            answer: 'Morgens trinke ich Kaffee und lerne ich Deutsch.',
            accepted: ['morgens ', 'ich wohne', 'ich arbeite', 'ich lerne', 'ich trinke', 'ich spiele', 'ich höre'],
            explain: 'V2: Morgens + verbo + ich. Ejemplo: Morgens arbeite ich von 8 bis 12 Uhr.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di lo que hace otra persona en su día a día.',
            answer: 'Meine Schwester arbeitet in einer Schule und lernt abends Spanisch.',
            accepted: ['wohnt', 'arbeitet', 'spielt', 'lernt', 'kocht', 'hört', 'macht'],
            explain: 'er/sie/es → terminación -t. Ejemplo: Mein Freund spielt abends Gitarre.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hacen tú y alguien más juntos usando "wir".',
            answer: 'Wir lernen zusammen Deutsch und hören Musik.',
            accepted: ['wir wohnen', 'wir arbeiten', 'wir spielen', 'wir lernen', 'wir hören', 'wir kochen', 'wir machen'],
            explain: '"Wir" → -en. Ejemplo: Wir kochen am Wochenende zusammen.',
          },
        ],
      },
    ],
  },
}

export default topic
