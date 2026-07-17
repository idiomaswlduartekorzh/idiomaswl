import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'trennbare-verben-praeteritum-a2',
  order: '18',
  color: '#c9a900',
  category: 'Verbos',
  level: 'A2',
  title: 'Verbos separables e inseparables en Präteritum alemán A2',
  shortTitle: 'Trennbare Verben Prät.',
  metaTitle: 'Verbos separables en Präteritum alemán A2 — aufmachen, besuchen y más',
  description:
    'Los verbos separables (trennbare Verben) tienen un prefijo que se separa en el presente pero permanece unido en el Präteritum. Los verbos inseparables (untrennbare Verben) nunca separan su prefijo. Dominar esta diferencia es clave en el pasado narrativo alemán.',
  lead: 'Er rief an, sie besuchte: domina los verbos separables e inseparables en pasado.',
  outcomes: [
    'Conjugar verbos separables en Präteritum (prefijo al final)',
    'Conjugar verbos inseparables en Präteritum',
    'Distinguir prefijos separables (an-, auf-, ein-, aus-) de inseparables (be-, ver-, ge-, er-)',
    'Usar verbos comunes como anrufen, aufmachen, besuchen y verstehen en pasado',
  ],

  guide: {
    goal: 'Usar verbos separables e inseparables correctamente en el Präteritum.',
    model: 'Er rief gestern an. / Sie besuchte ihre Oma. / Wir machten die Tür auf.',
    formula: 'Verbo separable: Stamm + Präteritum-Endung + Präfix al final | Inseparable: be/ver/ge + Stamm + Endung',
    decisions: [
      'Prefijos SEPARABLES: an-, auf-, aus-, ein-, mit-, vor-, zu-, ab- — en Präteritum el prefijo va al final',
      'Prefijos INSEPARABLES: be-, ver-, ge-, er-, ent-, emp-, miss-, zer- — nunca se separan',
      'Verbos separables regulares: anmachen → machte…an | aufmachen → machte…auf',
      'Verbos separables irregulares: anrufen → rief…an | einladen → lud…ein | anfahren → fuhr…an',
      'Verbos inseparables: besuchen → besuchte | verstehen → verstand | erklären → erklärte',
    ],
    table: [
      ['Infinitiv', 'Präteritum', 'Beispiel'],
      ['anrufen (sep.)', 'rief … an', 'Er rief mich an.'],
      ['aufmachen (sep.)', 'machte … auf', 'Sie machte das Fenster auf.'],
      ['einladen (sep.)', 'lud … ein', 'Wir luden sie ein.'],
      ['besuchen (insep.)', 'besuchte', 'Er besuchte seine Eltern.'],
      ['verstehen (insep.)', 'verstand', 'Ich verstand nichts.'],
    ],
    mistakes: [
      '"Er anrief mich" ❌ → "Er rief mich an" ✓ — En Präteritum el prefijo va al FINAL.',
      '"Er besuchte seine Eltern be" ❌ → "Er besuchte seine Eltern" ✓ — Los prefijos inseparables nunca se mueven.',
      '"Er aufrief" ❌ → "Er rief … auf" (aufrufen) o "Er rief … an" (anrufen) ✓ — El Partizip II correcto.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo funcionan los verbos separables en Präteritum?',
      paragraphs: [
        'En el Präteritum, los verbos separables se conjugan como verbos normales, pero el prefijo separable va al FINAL de la cláusula, igual que en el presente. Ejemplo: "anrufen" → "Er ruft an" (presente) → "Er rief an" (Präteritum).',
        'Lo importante es memorizar qué prefijos son separables y cuáles no. Una regla práctica: los prefijos de una sílaba con significado propio suelen ser separables (an = en/hacia, auf = arriba, aus = afuera). Los prefijos que no tienen significado independiente son inseparables (be-, ver-, ge-, er-).',
      ],
    },
    {
      heading: 'Verbos inseparables: sin separación nunca',
      paragraphs: [
        'Los verbos inseparables como besuchen, verstehen, erklären, beginnen nunca separan su prefijo — ni en presente ni en pasado. Además, su Partizip II NO lleva "ge-": besucht (no *gebesucht), verstanden (no *geverstanden).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Verbos separables: prefijo al final en Präteritum. Inseparables: sin separación.',
    graphicPrompt: 'Teléfono antiguo con la frase "Er rief an" y puerta abierta con "Er machte auf".',
    scene: [
      ['Er rief mich gestern an.', 'Ayer él me llamó.'],
      ['Sie machte die Tür auf.', 'Ella abrió la puerta.'],
      ['Wir luden unsere Freunde ein.', 'Invitamos a nuestros amigos.'],
      ['Er besuchte seine Oma.', 'Él visitó a su abuela.'],
      ['Ich verstand die Frage nicht.', 'No entendí la pregunta.'],
      ['Das Konzert begann um 20 Uhr.', 'El concierto comenzó a las 20h.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['prefijo al final', 'separable vs inseparable', 'formas irregulares'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta en Präteritum',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma de Präteritum correcta del verbo separable o inseparable.',
        type: 'choice',
        items: [
          {
            scene: 'Alguien habla por teléfono ayer.',
            lines: [['', 'Er ___ mich gestern ___. (anrufen)']],
            options: ['rief / an', 'rufte / an', 'anrief / —', 'ruf / an'],
            answer: 'rief / an',
            explain: '"anrufen" → irregular: "rief" + prefijo "an" al final.',
          },
          {
            scene: 'La tienda cerró temprano.',
            lines: [['', 'Der Laden ___ um 18 Uhr ___. (zumachen)']],
            options: ['machte / zu', 'zugemachte / —', 'macht / zu', 'machte / —'],
            answer: 'machte / zu',
            explain: '"zumachen" = separable, regular: "machte" + "zu" al final.',
          },
          {
            scene: 'No entendí la explicación.',
            lines: [['', 'Ich ___ die Erklärung nicht. (verstehen)']],
            options: ['verstand', 'verstehte', 'stand ver', 'verstanden'],
            answer: 'verstand',
            explain: '"verstehen" es inseparable e irregular: Präteritum = "verstand".',
          },
          {
            scene: 'Fuimos a visitar al museo.',
            lines: [['', 'Wir ___ das Museum. (besuchen)']],
            options: ['besuchten', 'besuchten be', 'suchten be', 'besuchen'],
            answer: 'besuchten',
            explain: '"besuchen" inseparable, regular: "besuchten" (plural).',
          },
          {
            scene: 'Ella invitó a sus compañeros.',
            lines: [['', 'Sie ___ ihre Kollegen ___. (einladen)']],
            options: ['lud / ein', 'einludte / —', 'lädt / ein', 'ludete / ein'],
            answer: 'lud / ein',
            explain: '"einladen" separable e irregular: "lud" + "ein" al final.',
          },
          {
            scene: 'El avión salió a tiempo.',
            lines: [['', 'Das Flugzeug ___ pünktlich ___. (abfliegen)']],
            options: ['flog / ab', 'abflog / —', 'flogete / ab', 'abflug / —'],
            answer: 'flog / ab',
            explain: '"abfliegen" separable e irregular: "flog" + "ab" al final.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Forma y posición del prefijo',
        tag: '2 espacios',
        intro: 'Completa con la raíz verbal y el prefijo en la posición correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Ella apagó la luz.',
            lines: [['', 'Sie [[0]] das Licht [[1]]. (ausmachen)']],
            blanks: [
              { options: ['machte', 'macht', 'machten', 'gemacht'], answer: 'machte', explain: '"ausmachen" regular → "machte" en Präteritum.' },
              { options: ['aus', 'auf', 'an', 'ab'], answer: 'aus', explain: 'Prefijo separable "aus" al final.' },
            ],
          },
          {
            scene: 'El tren salió a las ocho.',
            lines: [['', 'Der Zug [[0]] um acht Uhr [[1]]. (abfahren)']],
            blanks: [
              { options: ['fuhr', 'fährt', 'fahren', 'gefahren'], answer: 'fuhr', explain: '"abfahren" separable, irregular: fahren → fuhr.' },
              { options: ['ab', 'auf', 'an', 'ein'], answer: 'ab', explain: 'Prefijo "ab" al final de la cláusula.' },
            ],
          },
          {
            scene: 'Los niños comenzaron el juego.',
            lines: [['', 'Die Kinder [[0]] das Spiel. (beginnen)']],
            blanks: [
              { options: ['begannen', 'beginnen', 'begann', 'begonnen'], answer: 'begannen', explain: '"beginnen" inseparable, irregular: beginnen → begannen (plural).' },
              { options: ['—', 'be', 'an', 'gin'], answer: '—', explain: 'Los verbos inseparables no tienen prefijo separado.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un relato en Präteritum',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta en Präteritum de cada verbo separable o inseparable.',
        type: 'guidedText',
        scene: 'Relato de lo que hizo una persona ayer.',
        text: 'Gestern [[0]] Maria früh auf. Sie [[1]] ihren Freund [[2]]. Dann [[3]] sie zusammen das Museum. Sie [[4]] viel über Kunst.',
        blanks: [
          { options: ['stand / —', 'aufstand / —', 'aufgestanden / —', 'stehte / auf'], answer: 'stand / —', explain: '"aufstehen" → "stand auf" (aber aquí como una unidad: "stand … auf").' },
          { options: ['rief', 'anrief', 'rufte', 'gerief'], answer: 'rief', explain: '"anrufen" → "rief … an". Aquí solo la raíz.' },
          { options: ['an', 'auf', 'ein', 'ab'], answer: 'an', explain: 'Prefijo "an" de "anrufen" al final.' },
          { options: ['besuchten', 'suchten be', 'besuchen', 'besuchte'], answer: 'besuchten', explain: '"besuchen" inseparable → "besuchten" (plural: Maria + Freund).' },
          { options: ['lernten', 'lernten be', 'lernen', 'erlernten'], answer: 'lernten', explain: '"lernen" regular → "lernten".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe las formas correctas',
        tag: 'Texto libre',
        intro: 'Sin opciones: conjuga el verbo entre paréntesis en Präteritum.',
        type: 'freeText',
        scene: 'Una narración de un día de trabajo.',
        text: 'Er [[0]] um 7 Uhr [[1]]. (aufstehen) | Er [[2]] die E-Mails [[3]]. (aufmachen) | Er [[4]] drei Kollegen [[5]]. (anrufen)',
        blanks: [
          { answer: 'stand', explain: '"aufstehen" irregular: stehen → stand.' },
          { answer: 'auf', explain: 'Prefijo "auf" al final de la cláusula.' },
          { answer: 'machte', explain: '"aufmachen" regular: machen → machte.' },
          { answer: 'auf', explain: 'Prefijo "auf" al final.' },
          { answer: 'rief', explain: '"anrufen" irregular: rufen → rief.' },
          { answer: 'an', explain: 'Prefijo "an" al final.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma al Präteritum',
        tag: 'Escritura guiada',
        intro: 'Pon la oración en Präteritum.',
        type: 'write',
        items: [
          {
            scene: 'Presente: "Er ruft seine Mutter an."',
            prompt: 'Er ruft seine Mutter an. (→ Präteritum)',
            answer: 'Er rief seine Mutter an.',
            accepted: [],
            explain: '"anrufen" irregular: ruft → rief. Prefijo "an" permanece al final.',
          },
          {
            scene: 'Presente: "Sie macht das Fenster auf."',
            prompt: 'Sie macht das Fenster auf. (→ Präteritum)',
            answer: 'Sie machte das Fenster auf.',
            accepted: [],
            explain: '"aufmachen" regular: macht → machte. Prefijo "auf" al final.',
          },
          {
            scene: 'Presente: "Wir besuchen unsere Freunde."',
            prompt: 'Wir besuchen unsere Freunde. (→ Präteritum)',
            answer: 'Wir besuchten unsere Freunde.',
            accepted: [],
            explain: '"besuchen" inseparable, regular: besuchen → besuchten.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe lo que hiciste ayer',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones sobre acciones pasadas usando verbos separables o inseparables.',
        type: 'write',
        items: [
          {
            scene: 'Describe lo que hiciste ayer con verbos separables.',
            prompt: 'Escribe dos oraciones en Präteritum con verbos separables (anrufen, aufmachen, einladen, ausschalten).',
            answer: 'Ich rief meinen Freund an. Ich machte das Licht aus.',
            accepted: [
              'Ich lud meine Kollegin ein. Ich stand früh auf.',
              'Er rief an. Sie machte die Tür auf.',
            ],
            explain: 'Verbos separables en Präteritum: prefijo al final de la oración.',
          },
          {
            scene: 'Describe lo que alguien más hizo.',
            prompt: 'Escribe sobre otra persona usando besuchen, verstehen, beginnen o erklären.',
            answer: 'Er besuchte seine Oma und erklärte ihr alles.',
            accepted: [
              'Sie verstand den Text nicht.',
              'Das Konzert begann um 20 Uhr.',
            ],
            explain: 'Verbos inseparables en Präteritum: sin separación del prefijo.',
          },
        ],
      },
    ],
  },
}

export default topic
