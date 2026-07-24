import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prasens-unregelmaessig',
  order: '07',
  color: '#c9a900',
  category: 'Verben',
  level: 'A1',
  title: 'Präsens unregelmäßiger Verben im Deutschen A1',
  shortTitle: 'Präsens unregelmäßig',
  metaTitle: 'Verbos irregulares alemanes A1 — sprechen, lesen, fahren, essen',
  description:
    'Ciertos verbos alemanes de "raíz fuerte" cambian la vocal del radical en 2.ª y 3.ª persona del singular (du/er/sie/es). Los cambios más frecuentes son: e→i (sprechen→spricht), e→ie (lesen→liest) y a→ä (fahren→fährt). El resto de personas sigue la conjugación regular.',
  lead: 'Los verbos de raíz fuerte cambian su vocal solo en du y er/sie/es. El resto es regular. Tres patrones: e→i, e→ie, a→ä.',
  outcomes: [
    'Reconoces los tres patrones de cambio vocálico',
    'Conjugas sprechen, lesen y fahren correctamente',
    'Sabes que wir/ihr/sie/Sie siguen siempre el patrón regular',
  ],

  guide: {
    goal: 'Conjugar verbos de raíz fuerte en presente, aplicando el cambio vocálico solo en du y er/sie/es.',
    model: 'Ich spreche Deutsch. / Du sprichst sehr gut. / Er spricht langsam.',
    formula: 'Radical con vocal modificada + terminación normal (solo du/er/sie/es)',
    decisions: [
      'e→i: sprechen (sprichst/spricht), essen (isst/isst), nehmen (nimmst/nimmt), geben (gibst/gibt)',
      'e→ie: lesen (liest/liest), sehen (siehst/sieht), empfehlen (empfiehlst/empfiehlt)',
      'a→ä: fahren (fährst/fährt), schlafen (schläfst/schläft), tragen (trägst/trägt)',
      'ich, wir, ihr, sie/Sie — siempre forman regular, sin cambio vocálico',
    ],
    table: [
      ['Pronombre', 'sprechen (e→i)', 'lesen (e→ie)'],
      ['ich', 'spreche', 'lese'],
      ['du', 'sprichst ⚡', 'liest ⚡'],
      ['er/sie/es', 'spricht ⚡', 'liest ⚡'],
      ['wir', 'sprechen', 'lesen'],
      ['ihr', 'sprecht', 'lest'],
      ['sie/Sie', 'sprechen', 'lesen'],
    ],
    mistakes: [
      '"Ich spricht" ❌ — "ich" no cambia: "ich spreche" ✓',
      '"Wir spricht" ❌ — "wir" tampoco cambia: "wir sprechen" ✓',
      '"Du leist" ❌ — el cambio es e→ie: "du liest" ✓',
      'Essen: "er esst" ❌ — "er isst" ✓ (doble s, y la vocal cambia a i)',
    ],
  },

  seo: [
    {
      heading: 'Verbos de raíz fuerte: solo cambian en du y er/sie/es',
      paragraphs: [
        'En alemán, los verbos de raíz fuerte (starke Verben) modifican la vocal del radical únicamente en 2.ª persona singular (du) y 3.ª persona singular (er/sie/es). Ninguna otra persona sufre el cambio. Este es un punto crucial: "ich spreche" es completamente regular, pero "er spricht" cambia la e por i.',
        'Existen tres patrones principales en A1: e→i (sprechen, essen, nehmen, geben), e→ie (lesen, sehen, empfehlen) y a→ä (fahren, schlafen, tragen). Memorizar el grupo al que pertenece cada verbo facilita la conjugación.',
      ],
    },
    {
      heading: 'Patrón e→i: sprechen, essen, nehmen, geben',
      paragraphs: [
        'Sprechen (hablar): ich spreche, du sprichst, er/sie spricht, wir sprechen, ihr sprecht, sie sprechen. Essen (comer): ich esse, du isst, er isst, wir essen, ihr esst, sie essen. Nehmen (tomar/coger): ich nehme, du nimmst, er nimmt.',
        'Geben (dar): ich gebe, du gibst, er gibt. Nota: en "essen" la doble -ss en du/er se debe a la vocal breve anterior a la -ss (regla ortográfica alemana). En nehmen ocurre además una consonante geminada: nimm-.',
      ],
    },
    {
      heading: 'Patrón e→ie y a→ä',
      paragraphs: [
        'E→ie: lesen (leer) → du liest, er liest; sehen (ver) → du siehst, er sieht. La ie es un sonido largo — no confundir con i breve del patrón anterior. Empfehlen (recomendar) → du empfiehlst, er empfiehlt.',
        'A→ä: fahren (conducir/ir en vehículo) → du fährst, er fährt; schlafen (dormir) → du schläfst, er schläft; tragen (llevar/cargar) → du trägst, er trägt. La diéresis (Umlaut) sobre la a indica la vocal modificada.',
      ],
    },
    {
      heading: 'Estrategia de aprendizaje para hispanohablantes',
      paragraphs: [
        'El español también tiene verbos con cambio vocálico en el radical (e→ie: quiero/quieres; o→ue: puedo/puedes), pero el patrón alemán es diferente porque solo afecta a du y er/sie/es, no a todas las personas excepto nosotros/vosotros como en español.',
        'Consejo: al aprender un nuevo verbo alemán, memoriza la forma de "er/sie" junto al infinitivo: "sprechen — er spricht", "lesen — er liest", "fahren — er fährt". Esto ya revela el patrón completo.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Verbos de raíz fuerte: cambio vocálico solo en du/er/sie.',
    graphicPrompt: 'Tabla comparativa de los tres patrones de cambio vocálico con ejemplos.',
    scene: [
      ['e→i: sprechen', 'du sprichst, er spricht'],
      ['e→i: essen', 'du isst, er isst'],
      ['e→i: nehmen', 'du nimmst, er nimmt'],
      ['e→ie: lesen', 'du liest, er liest'],
      ['e→ie: sehen', 'du siehst, er sieht'],
      ['a→ä: fahren', 'du fährst, er fährt'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['sprechen', 'essen', 'nehmen', 'geben', 'lesen', 'sehen', 'fahren', 'schlafen'],
    reviewFocus: ['e→i: du/er', 'e→ie: du/er', 'a→ä: du/er', 'wir/sie siempre regular'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo irregular.',
        type: 'choice',
        items: [
          {
            scene: 'Tomás habla con un estudiante sobre idiomas',
            lines: [['Tomás', 'Welche Sprachen ___ du? (sprechen)']],
            options: ['sprichst', 'sprechst', 'spricht', 'spreche'],
            answer: 'sprichst',
            explain: '"Du" + sprechen (e→i): "du sprichst". La e del radical cambia a i.',
          },
          {
            scene: 'Elena habla de los hábitos de Carlos',
            lines: [['Elena', 'Carlos ___ jeden Tag Zeitung. (lesen)']],
            options: ['liest', 'lest', 'lesst', 'lese'],
            answer: 'liest',
            explain: '"Carlos" = er, lesen (e→ie): "er liest". La e larga cambia a ie.',
          },
          {
            scene: 'Ana pregunta sobre el coche de Marco',
            lines: [['Ana', '___ Marco gern Auto? (fahren)']],
            options: ['Fährt', 'Fahrt', 'Fährest', 'Fahren'],
            answer: 'Fährt',
            explain: '"Marco" = er, fahren (a→ä): "er fährt". La a cambia a ä.',
          },
          {
            scene: 'En la cafetería con Lina y Sofía',
            lines: [['Sofía', 'Was ___ du? (essen)']],
            options: ['isst', 'esst', 'esse', 'estest'],
            answer: 'isst',
            explain: '"Du" + essen (e→i): "du isst". La e cambia a i y se escribe con doble ss.',
          },
          {
            scene: 'Elena describe a una estudiante',
            lines: [['Elena', 'Sofia ___ immer die Hausaufgaben. (nehmen)']],
            options: ['nimmt', 'nehmt', 'nimmst', 'nehmen'],
            answer: 'nimmt',
            explain: '"Sofia" = sie, nehmen (e→i): "sie nimmt". Cambio e→i y doble m.',
          },
          {
            scene: 'Tomás habla en clase sobre un libro',
            lines: [['Tomás', '___ ihr das Buch? (sehen)']],
            options: ['Seht', 'Sieht', 'Siehst', 'Sehen'],
            answer: 'Seht',
            explain: '"Ihr" NO cambia la vocal: "ihr seht". Solo du/er/sie/es cambian.',
          },
          {
            scene: 'Marco habla de su hermana',
            lines: [['Marco', 'Meine Schwester ___ gern. (schlafen)']],
            options: ['schläft', 'schläfst', 'schlaft', 'schlafen'],
            answer: 'schläft',
            explain: '"Meine Schwester" = sie, schlafen (a→ä): "sie schläft".',
          },
          {
            scene: 'Sofía y Carlos planean el almuerzo',
            lines: [['', 'Wir ___ heute in der Mensa. (essen)']],
            options: ['essen', 'isst', 'esst', 'esse'],
            answer: 'essen',
            explain: '"Wir" no cambia la vocal: "wir essen". La forma es igual al infinitivo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Zwei Lücken',
        tag: '2 espacios',
        intro: 'Completa con el pronombre y la forma verbal correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Tomás habla de un compañero políglota',
            lines: [['Tomás', '[[0]] [[1]] fünf Sprachen. (er, sprechen)']],
            blanks: [
              { options: ['Er', 'Sie', 'Ihr', 'Du'], answer: 'Er', explain: '"El compañero" = er.' },
              { options: ['spricht', 'sprechst', 'spreche', 'sprechen'], answer: 'spricht', explain: 'er + sprechen (e→i) → "er spricht".' },
            ],
          },
          {
            scene: 'Ana pregunta a Carlos qué libro lee',
            lines: [['Ana', 'Was [[0]] [[1]] gerade? (du, lesen)']],
            blanks: [
              { options: ['liest', 'lese', 'lest', 'lesst'], answer: 'liest', explain: 'du + lesen (e→ie) → "du liest".' },
              { options: ['du', 'er', 'wir', 'ihr'], answer: 'du', explain: 'En la pregunta con "was": Was + verbo + sujeto.' },
            ],
          },
          {
            scene: 'Lina habla de los hábitos de Elena',
            lines: [['Lina', '[[0]] [[1]] mit dem Zug zur Arbeit. (sie, fahren)']],
            blanks: [
              { options: ['Sie', 'Er', 'Du', 'Wir'], answer: 'Sie', explain: '"Elena" = sie (singular).' },
              { options: ['fährt', 'fahrt', 'fähren', 'fahre'], answer: 'fährt', explain: 'sie + fahren (a→ä) → "sie fährt".' },
            ],
          },
          {
            scene: 'Marco habla de lo que da a sus amigos',
            lines: [['Marco', 'Ich [[0]] meinen Freunden Tipps. / Du [[1]] ihnen auch Tipps. (geben)']],
            blanks: [
              { options: ['gebe', 'gibt', 'gibst', 'geben'], answer: 'gebe', explain: 'ich + geben → "ich gebe" (sin cambio vocálico en ich).' },
              { options: ['gibst', 'gibt', 'gebe', 'geben'], answer: 'gibst', explain: 'du + geben (e→i) → "du gibst".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Conjuga los verbos irregulares en la persona indicada.',
        type: 'guidedText',
        scene: 'Un día en la academia WeLearn.',
        text: 'Morgens [[0]] Tomás Nachrichten (lesen). Er [[1]] dabei Kaffee (trinken — regular). Elena [[2]] immer früh an. Sie [[3]] die Hausaufgaben der Studenten (nehmen). Carlos [[4]] gern schnell (fahren). Ana [[5]] ein Buch in der Pause (lesen). Wir alle [[6]] zusammen Deutsch (sprechen).',
        blanks: [
          { options: ['liest', 'lese', 'lest', 'lesen'], answer: 'liest', explain: '"Tomás" = er, lesen (e→ie): "er liest".' },
          { options: ['trinkt', 'trinkst', 'trinke', 'trinken'], answer: 'trinkt', explain: '"Er" + trinken (regular): "er trinkt".' },
          { options: ['fährt', 'fahrt', 'fähren', 'fahre'], answer: 'fährt', explain: '"Elena" = sie, fahren (a→ä): "sie fährt".' },
          { options: ['nimmt', 'nehmt', 'nimmst', 'nehmen'], answer: 'nimmt', explain: '"Sie" (ella) + nehmen (e→i): "sie nimmt".' },
          { options: ['fährt', 'fahrt', 'fahren', 'fähren'], answer: 'fährt', explain: '"Carlos" = er, fahren (a→ä): "er fährt".' },
          { options: ['liest', 'lese', 'lest', 'lesen'], answer: 'liest', explain: '"Ana" = sie, lesen (e→ie): "sie liest".' },
          { options: ['sprechen', 'sprecht', 'spricht', 'spreche'], answer: 'sprechen', explain: '"Wir alle" → wir, no cambia: "wir sprechen".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma verbal correcta de memoria.',
        type: 'freeText',
        scene: 'Un mensaje de Marco a sus amigos.',
        text: 'Heute [[0]] ich mit dem Bus (fahren). Carlos [[1]] sein Handy (nehmen). Lina [[2]] im Café (essen). Ihr [[3]] zu viel Fernsehen! (sehen) Ich [[4]] auch gern Bücher (lesen).',
        blanks: [
          { answer: 'fahre', accepted: ['fahre'], explain: '"Ich" + fahren → "ich fahre" (sin cambio, solo du/er cambian).' },
          { answer: 'nimmt', accepted: ['nimmt'], explain: '"Carlos" = er, nehmen (e→i) → "er nimmt".' },
          { answer: 'isst', accepted: ['isst'], explain: '"Lina" = sie, essen (e→i) → "sie isst".' },
          { answer: 'seht', accepted: ['seht'], explain: '"Ihr" no cambia la vocal: "ihr seht".' },
          { answer: 'lese', accepted: ['lese'], explain: '"Ich" + lesen → "ich lese" (sin cambio vocálico).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas con verbos irregulares.',
        type: 'write',
        items: [
          {
            scene: 'Hablando de un amigo o familiar',
            prompt: 'Di qué hace alguien que conoces usando sprechen, lesen o fahren.',
            answer: 'Mein Vater fährt jeden Tag mit dem Auto zur Arbeit.',
            accepted: ['spricht', 'liest', 'fährt', 'isst', 'nimmt', 'gibt', 'sieht', 'schläft'],
            explain: 'Ejemplo: Meine Schwester liest gern Romane. / Mein Freund spricht Englisch und Französisch.',
          },
          {
            scene: 'Hablando de ti mismo',
            prompt: 'Di qué idiomas hablas y qué lees normalmente.',
            answer: 'Ich spreche Spanisch und lerne Deutsch. Ich lese gern Bücher.',
            accepted: ['ich spreche', 'ich lese', 'ich esse', 'ich fahre', 'ich sehe'],
            explain: 'Recuerda: "ich" no cambia la vocal. Ich spreche, ich lese, ich esse, ich fahre.',
          },
          {
            scene: 'Preguntando a Tomás',
            prompt: 'Hazle dos preguntas a Tomás: una sobre qué idiomas habla y otra sobre qué come en el descanso.',
            answer: 'Welche Sprachen sprichst du, Tomás? Und was isst du in der Pause?',
            accepted: ['sprichst du', 'isst du', 'liest du', 'fährst du'],
            explain: 'Du-Formen: sprichst, isst, liest, fährst, nimmst, gibst, siehst, schläfst.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe un día de alguien usando al menos 3 verbos irregulares.',
        type: 'write',
        items: [
          {
            scene: 'Describe el día de Elena',
            prompt: 'Describe qué hace Elena durante el día con er/sie-Formen irregulares.',
            answer: 'Elena liest morgens E-Mails. Sie fährt mit dem Fahrrad zur Akademie. Sie gibt den Studenten Aufgaben.',
            accepted: ['liest', 'fährt', 'gibt', 'nimmt', 'isst', 'sieht', 'spricht', 'schläft'],
            explain: 'Formas sie: liest, fährt, gibt, nimmt, isst, sieht, spricht, schläft.',
          },
          {
            scene: 'Describe tu propia rutina con verbos irregulares',
            prompt: 'Di qué haces tú (ich-Formen) usando al menos 2 verbos del grupo irregular.',
            answer: 'Ich esse morgens Brot und trinke Kaffee. Ich fahre mit dem Bus.',
            accepted: ['ich esse', 'ich fahre', 'ich lese', 'ich sehe', 'ich nehme', 'ich gebe', 'ich spreche'],
            explain: 'Ich-Formen no cambian la vocal: ich esse, ich fahre, ich lese, ich spreche.',
          },
          {
            scene: 'Pregunta y respuesta',
            prompt: 'Escribe una pregunta con "du" y su respuesta con "ich" para un verbo irregular.',
            answer: '— Fährst du mit dem Zug? — Nein, ich fahre mit dem Bus.',
            accepted: ['fährst du', 'isst du', 'liest du', 'sprichst du', 'ich fahre', 'ich esse', 'ich lese', 'ich spreche'],
            explain: 'Pregunta (du): fährst, isst, liest, sprichst. Respuesta (ich): fahre, esse, lese, spreche.',
          },
        ],
      },
    ],
  },
}

export default topic
