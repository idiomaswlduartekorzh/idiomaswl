import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prasens-regelmaessig',
  order: '05',
  color: '#7c3aed',
  category: 'Verben',
  level: 'A1',
  title: 'Präsens en alemán A1: conjugación, reglas especiales y cambios vocálicos',
  shortTitle: 'Präsens: sistema completo',
  metaTitle: 'Präsens alemán A1: reglas, TDMN, sibilantes e irregulares',
  description:
    'El presente alemán parte de seis terminaciones estables, pero la pronunciación y el radical crean familias que hay que reconocer. Esta lección integra el patrón general, la vocal de apoyo con T/D/M/N, las raíces sibilantes, los verbos en -eln/-ern, los cambios a→ä, e→i y e→ie, y un puente hacia los verbos de conjugación propia.',
  lead: 'No memorices cada verbo como una isla: identifica el radical, mira cómo termina y decide si necesita una vocal de apoyo, pierde la s de -st o cambia la vocal en du y er/sie/es.',
  outcomes: [
    'Conjugas el patrón general con las seis terminaciones',
    'Sabes cuándo aparece la e de apoyo en T/D/M/N y cuándo no',
    'Reconoces sibilantes, verbos en -eln/-ern y cambios vocálicos',
    'Distingues verbos fuertes de formas propias como sein, haben y werden',
  ],

  guide: {
    goal: 'Elegir la forma correcta del Präsens a partir del sujeto, el final del radical y el tipo de verbo.',
    model: 'Ich spiele. / Du redest. / Er heißt Paul. / Sie fährt nach Köln.',
    formula: 'Infinitiv → Stamm + Endung | después comprueba: e de apoyo, sibilante o cambio vocálico',
    decisions: [
      'Radical: normalmente infinitivo − en: wohnen → wohn-, spielen → spiel-, arbeiten → arbeit-. En -eln/-ern se quita solo la -n: sammeln → sammel-, wandern → wander-.',
      'Terminaciones: -e, -st, -t, -en, -t, -en (ich/du/er/wir/ihr/sie)',
      'T/D: si el radical acaba en -t o -d, se inserta -e- antes de -st y -t: du arbeitest, er arbeitet; du redest, er redet.',
      'M/N: la -e- aparece si -m/-n cierra un grupo consonántico difícil: du atmest, er rechnet. No es automática: lernen → du lernst; wohnen → du wohnst.',
      'Sibilantes (-s, -ß, -x, -z): en du no se suma otra s; se usa solo -t: reisen → reist, heißen → heißt, tanzen → tanzt.',
      'Verbos fuertes: a→ä, e→i o e→ie solamente en du y er/sie/es: fährst/fährt, brichst/bricht, stiehlst/stiehlt.',
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
      '"Du redst" ❌ — después de -d se necesita la e de apoyo: "du redest" ✓',
      '"Du heißst" ❌ — la raíz ya termina en sibilante: "du heißt" ✓',
      '"Ihr fährt" ❌ — el cambio vocálico no llega a ihr: "ihr fahrt" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es el patrón general del Präsens alemán?',
      paragraphs: [
        'A diferencia del francés donde muchas terminaciones son mudas, en alemán todas las terminaciones verbales se pronuncian claramente. El presente de los verbos regulares se forma: radical + terminación (-e/-st/-t/-en/-t/-en).',
        'El radical se obtiene normalmente quitando -en del infinitivo: wohnen → wohn-, spielen → spiel-, hören → hör-. Antes de añadir la terminación, conviene mirar el final del radical: de ese pequeño diagnóstico salen casi todas las reglas de esta lección.',
      ],
      table: [
        ['Pronombre', 'ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'],
        ['Terminación', '-e', '-st', '-t', '-en', '-t', '-en'],
        ['spielen', 'spiele', 'spielst', 'spielt', 'spielen', 'spielt', 'spielen'],
      ],
    },
    {
      heading: 'La tabla completa: siete familias de conjugación en presente',
      paragraphs: [
        'La tabla compara el patrón general con las alteraciones que realmente aparecen en A1. Las celdas de du y er/sie/es son las que merecen más atención: allí se ve la vocal de apoyo, la simplificación tras sibilante y los cambios vocálicos.',
        'Wir y sie/Sie suelen coincidir con el infinitivo. Ihr conserva la vocal normal incluso en los verbos fuertes: ihr fahrt, ihr brecht, ihr stehlt. Esa regularidad reduce mucho la carga de memoria.',
      ],
      table: [
        ['Persona', 'General: spielen', 'T/D: reden', 'Sibilante: heißen', '-ern: wandern', 'a→ä: fahren', 'e→i: brechen', 'e→ie: stehlen'],
        ['ich', 'spiele', 'rede', 'heiße', 'wandere', 'fahre', 'breche', 'stehle'],
        ['du', 'spielst', 'redest', 'heißt', 'wanderst', 'fährst', 'brichst', 'stiehlst'],
        ['er/sie/es', 'spielt', 'redet', 'heißt', 'wandert', 'fährt', 'bricht', 'stiehlt'],
        ['wir', 'spielen', 'reden', 'heißen', 'wandern', 'fahren', 'brechen', 'stehlen'],
        ['ihr', 'spielt', 'redet', 'heißt', 'wandert', 'fahrt', 'brecht', 'stehlt'],
        ['sie/Sie', 'spielen', 'reden', 'heißen', 'wandern', 'fahren', 'brechen', 'stehlen'],
      ],
    },
    {
      heading: '¿Qué significa la regla T/D/M/N y siempre se aplica?',
      paragraphs: [
        'T/D/M/N es una ayuda de memoria, no una regla ciega. Con radicales en -t o -d, la e de apoyo se inserta de forma estable antes de -st y -t: arbeiten → du arbeitest, er arbeitet; reden → du redest, er redet. Sin esa e, los grupos *-tst* o *-dt* serían difíciles de pronunciar.',
        'Con -m y -n hay que mirar la consonante anterior. La e aparece cuando el radical termina en un grupo consonántico difícil: atmen → du atmest, er atmet; öffnen → du öffnest, er öffnet; rechnen → du rechnest, er rechnet. No se agrega después de combinaciones fáciles o de una vocal: lernen → lernst, filmen → filmst, wohnen → wohnst.',
      ],
      table: [
        ['Final del radical', 'Decisión', 'du', 'er/sie/es', 'Observación'],
        ['-t / -d', 'insertar -e-', 'arbeitest / redest', 'arbeitet / redet', 'se aplica de forma regular'],
        ['consonante + m/n', 'insertar -e- si facilita la pronunciación', 'atmest / rechnest', 'atmet / rechnet', 'grupo consonántico difícil'],
        ['vocal o l/r + m/n', 'sin e adicional', 'wohnst / lernst', 'wohnt / lernt', 'la unión ya es pronunciable'],
      ],
    },
    {
      heading: '¿Qué pasa con las raíces sibilantes y con -eln/-ern?',
      paragraphs: [
        'Si el radical termina en un sonido sibilante escrito -s, -ß, -x o -z, la forma de du no recibe -st completo. La s ya está presente en el radical y se añade solamente -t: reisen → du reist, heißen → du heißt, tanzen → du tanzt, sitzen → du sitzt. Por eso du y er/sie/es pueden coincidir.',
        'Los infinitivos en -eln y -ern terminan en -n, no en -en: se quita solo la -n. Wandern produce wander-: ich wandere, du wanderst. En -eln, la forma de ich suele contraerse: sammeln → ich sammle, mientras du sammelst y er sammelt conservan el grupo -el-.',
      ],
      table: [
        ['Familia', 'Infinitivo', 'Radical', 'ich', 'du', 'er/sie/es'],
        ['sibilante -ß', 'heißen', 'heiß-', 'heiße', 'heißt', 'heißt'],
        ['sibilante -z', 'tanzen', 'tanz-', 'tanze', 'tanzt', 'tanzt'],
        ['-ern', 'wandern', 'wander-', 'wandere', 'wanderst', 'wandert'],
        ['-eln', 'sammeln', 'sammel-', 'sammle', 'sammelst', 'sammelt'],
      ],
    },
    {
      heading: '¿Cuándo cambia la vocal del radical?',
      paragraphs: [
        'Los verbos fuertes mantienen las terminaciones normales, pero cambian la vocal del radical en du y er/sie/es. Los tres patrones centrales de A1 son a→ä (fahren → fährst/fährt), e→i (brechen → brichst/bricht) y e→ie (stehlen → stiehlst/stiehlt). También aparece au→äu: laufen → läufst/läuft.',
        'No se puede predecir con total seguridad qué verbo cambia: conviene aprender infinitivo + forma de er/sie/es, por ejemplo fahren - fährt o lesen - liest. El cambio no aparece en ich, wir, ihr ni sie/Sie.',
      ],
      table: [
        ['Patrón', 'Infinitivos frecuentes', 'du', 'er/sie/es', 'ihr'],
        ['a→ä', 'fahren, schlafen, tragen, halten', 'fährst', 'fährt', 'fahrt'],
        ['e→i', 'sprechen, essen, nehmen, geben, brechen', 'sprichst', 'spricht', 'sprecht'],
        ['e→ie', 'lesen, sehen, stehlen, empfehlen', 'liest', 'liest', 'lest'],
        ['au→äu', 'laufen', 'läufst', 'läuft', 'lauft'],
      ],
    },
    {
      heading: 'Verbos de conjugación propia: el puente hacia los irregulares',
      paragraphs: [
        'Algunos verbos de altísima frecuencia no se explican solo con un cambio vocálico. Sein, haben, werden y wissen se aprenden como paradigmas propios. Otros, como nehmen, gelten, laden y halten, combinan terminaciones normales con un radical especial en du y er/sie/es.',
        'La tabla sirve como vista previa; la lección de Präsens irregular profundiza por familias y practica estas formas. La estrategia más rentable es memorizar tres piezas: infinitivo, forma de er/sie/es y participio cuando se estudie el pasado.',
      ],
      table: [
        ['Pronombre', 'wissen', 'haben', 'sein', 'werden', 'nehmen', 'gelten', 'laden', 'halten'],
        ['ich', 'weiß', 'habe', 'bin', 'werde', 'nehme', 'gelte', 'lade', 'halte'],
        ['du', 'weißt', 'hast', 'bist', 'wirst', 'nimmst', 'giltst', 'lädst', 'hältst'],
        ['er/sie/es', 'weiß', 'hat', 'ist', 'wird', 'nimmt', 'gilt', 'lädt', 'hält'],
        ['wir', 'wissen', 'haben', 'sind', 'werden', 'nehmen', 'gelten', 'laden', 'halten'],
        ['ihr', 'wisst', 'habt', 'seid', 'werdet', 'nehmt', 'geltet', 'ladet', 'haltet'],
        ['sie/Sie', 'wissen', 'haben', 'sind', 'werden', 'nehmen', 'gelten', 'laden', 'halten'],
      ],
    },
    {
      heading: '¿Qué es la regla V2 (verbo en segunda posición) en alemán?',
      paragraphs: [
        'Conjugar bien no basta: en una oración declarativa, el verbo conjugado ocupa la segunda posición. "Segunda" significa segundo elemento, no necesariamente segunda palabra: Ich wohne in Berlin. / In Berlin wohne ich. / Am Montag arbeitet meine Schwester zu Hause.',
        'Si una expresión de tiempo o lugar ocupa el primer campo, el sujeto pasa detrás del verbo. En preguntas de sí/no el verbo va primero: Wohnst du in Berlin? En preguntas con W-Wort ocupa la segunda posición: Wo wohnst du?',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'El Präsens se decide en tres pasos: persona, final del radical y posible cambio vocálico.',
    graphicPrompt: 'Mapa comparativo del patrón general, T/D/M/N, sibilantes y cambios vocálicos.',
    scene: [
      ['General: du spielst', 'Stamm + -st'],
      ['T/D: du redest', 'e de apoyo antes de -st'],
      ['M/N: du atmest', 'solo si el grupo consonántico lo exige'],
      ['Sibilante: du heißt', 'la raíz ya contiene el sonido s'],
      ['-ern: du wanderst', 'se quita solo la -n del infinitivo'],
      ['Cambio: du fährst', 'a→ä solamente en du y er/sie/es'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['spielen', 'reden', 'arbeiten', 'atmen', 'rechnen', 'heißen', 'tanzen', 'wandern', 'sammeln', 'fahren', 'brechen', 'stehlen'],
    reviewFocus: ['terminaciones -e/-st/-t/-en', 'T/D/M/N y e de apoyo', 'sibilantes: du + -t', '-eln/-ern', 'cambio vocálico solo en du/er', 'V2'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Schreibe die richtige Verbform (escribe la forma verbal correcta).',
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
          { scene: 'Una conversación tranquila', lines: [['', 'Du ___ sehr leise. (reden)']], options: ['redest', 'redst', 'redet', 'rede'], answer: 'redest', explain: 'El radical red- termina en -d: se inserta la e de apoyo antes de -st → "redest".' },
          { scene: 'Presentando a una persona', lines: [['', 'Er ___ Paul. (heißen)']], options: ['heißt', 'heißst', 'heiße', 'heißen'], answer: 'heißt', explain: 'La raíz heiß- ya termina en sibilante: er toma -t → "heißt".' },
          { scene: 'Una excursión', lines: [['', 'Ihr ___ heute durch den Wald. (wandern)']], options: ['wandert', 'wanderet', 'wandern', 'wanderst'], answer: 'wandert', explain: 'Wandern termina en -ern: se quita solo -n y se añade la terminación de ihr, -t → "wandert".' },
          { scene: 'Un viaje en tren', lines: [['', 'Meine Schwester ___ nach Köln. (fahren)']], options: ['fährt', 'fahrt', 'fahre', 'fahren'], answer: 'fährt', explain: 'Meine Schwester = sie. Fahren cambia a→ä en du y er/sie/es → "fährt".' },
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
        text: 'Mein Alltag: Ich [[0]] (wohnen) in Köln. Morgens [[1]] ich (arbeiten) von 9 bis 17 Uhr. Meine Kollegin [[2]] (heißen) Nora und sie [[3]] sehr ruhig (reden). Nach der Arbeit [[4]] ich (lernen) Spanisch. Am Wochenende [[5]] Nora gern (wandern), aber ihr Bruder [[6]] lieber nach Bonn (fahren). Wir [[7]] uns oft (schreiben).',
        blanks: [
          { options: ['wohne', 'wohnst', 'wohnt', 'wohnen'], answer: 'wohne', explain: '"Ich" → "wohne".' },
          { options: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten'], answer: 'arbeite', explain: '"Morgens arbeite ich" — V2: verbo en 2ª posición.' },
          { options: ['heißt', 'heißst', 'heiße', 'heißen'], answer: 'heißt', explain: 'Sibilante: meine Kollegin = sie; heiß- + -t → "heißt".' },
          { options: ['redet', 'redt', 'reden', 'redest'], answer: 'redet', explain: 'Radical red- en -d: e de apoyo + terminación -t → "redet".' },
          { options: ['lerne', 'lernst', 'lernt', 'lernen'], answer: 'lerne', explain: '"Nach der Arbeit lerne ich" — V2.' },
          { options: ['wandert', 'wanderet', 'wandern', 'wanderst'], answer: 'wandert', explain: 'Nora = sie. Wandern → wander- + -t → "wandert".' },
          { options: ['fährt', 'fahrt', 'fahren', 'fahre'], answer: 'fährt', explain: 'Ihr Bruder = er. Fahren cambia a→ä en tercera persona singular → "fährt".' },
          { options: ['schreiben', 'schreibt', 'schreibst', 'schreibe'], answer: 'schreiben', explain: '"Wir" → "schreiben"; los verbos fuertes no cambian en wir.' },
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
