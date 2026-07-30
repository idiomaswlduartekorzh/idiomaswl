import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'trennbare-verben',
  order: '15',
  color: '#c9a900',
  category: 'Verben',
  level: 'A1',
  title: 'Trennbare Verben im Deutschen A1',
  shortTitle: 'Trennbare Verben',
  metaTitle: 'Verbos separables alemán A1 — aufmachen, anrufen, anfangen, aufstehen',
  description:
    'Los verbos separables (trennbare Verben) tienen un prefijo que se separa y va al FINAL de la frase en las oraciones simples. Aufmachen → Ich mache die Tür auf. El prefijo y el verbo se separan como si fueran dos piezas de un rompecabezas. Con modales, el verbo se queda junto porque va en infinitivo.',
  lead: 'Los verbos separables se parten en dos: el verbo va en segunda posición, el prefijo salta al final. auf+machen → Ich mache auf. El español no tiene nada parecido.',
  outcomes: [
    'Reconoces los prefijos separables más frecuentes (auf-, an-, ab-, aus-, ein-, mit-, los-, zu-, vor-, nach-)',
    'Separas correctamente el prefijo y lo colocas al final de la frase',
    'Usas verbos separables con modales (prefijo no se separa en infinitivo)',
  ],

  guide: {
    goal: 'Usar verbos separables en frases simples y con verbos modales.',
    model: 'Ich mache die Tür auf. / Er ruft seinen Freund an. / Wann fängst du an?',
    formula: 'Verbo (pos. 2, sin prefijo) + ... + Prefijo (AL FINAL)',
    decisions: [
      'auf- : aufmachen → Ich mache das Fenster auf. (abrir)',
      'an- : anrufen → Er ruft mich an. (llamar por teléfono)',
      'ab- : abfahren → Der Zug fährt um 8 ab. (partir, salir)',
      'aus- : ausgehen → Wir gehen heute Abend aus. (salir de noche)',
      'ein- : einkaufen → Ich kaufe im Supermarkt ein. (hacer la compra)',
      'mit- : mitkommen → Kommst du mit? (venir/acompañar)',
      'los- : losgehen → Wann gehen wir los? (ponerse en marcha)',
      'Con modal: infinitivo queda completo al final: Ich kann das Fenster aufmachen. (NO: Ich kann das Fenster auf machen)',
    ],
    table: [
      ['Verb', 'Präsens (getrennt)', 'Mit Modal'],
      ['aufmachen', 'Ich mache auf.', 'Ich kann aufmachen.'],
      ['anrufen', 'Er ruft an.', 'Er muss anrufen.'],
      ['anfangen', 'Wann fängst du an?', 'Wann kannst du anfangen?'],
      ['aufstehen', 'Ich stehe früh auf.', 'Ich muss früh aufstehen.'],
      ['ausgehen', 'Wir gehen aus.', 'Wir wollen ausgehen.'],
      ['einkaufen', 'Sie kauft ein.', 'Sie möchte einkaufen.'],
    ],
    mistakes: [
      '"Ich aufmache die Tür" ❌ — el verbo va en 2ª posición sin prefijo: "Ich mache die Tür auf" ✓',
      '"Ich kann die Tür auf machen" ❌ — con modal el infinitivo queda JUNTO: "Ich kann die Tür aufmachen" ✓',
      '"Er anruft mich" ❌ — el prefijo va siempre al FINAL: "Er ruft mich an" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los verbos separables en alemán?',
      paragraphs: [
        'Los verbos separables son una de las características más llamativas del alemán para hispanohablantes. Un verbo como "aufmachen" (abrir) se parte en dos partes en la frase: el verbo "macht" va en segunda posición y el prefijo "auf" salta al final: Ich mache die Tür auf.',
        'Los prefijos separables más frecuentes en A1 son: auf- (aufmachen, aufstehen, aufhören), an- (anrufen, anfangen, ankommen), ab- (abfahren, abholen), aus- (ausgehen, aussteigen), ein- (einkaufen, einschlafen), mit- (mitkommen, mitnehmen), zu- (zumachen, zuhören).',
      ],
    },
    {
      heading: '¿Cómo se usan los verbos separables con modales en alemán?',
      paragraphs: [
        'Cuando un verbo separable se combina con un verbo modal (können, müssen, wollen, etc.), el verbo separable aparece en infinitivo AL FINAL y NO se separa: Ich muss früh aufstehen. / Kannst du mich anrufen? / Wir wollen heute einkaufen.',
        'Esta es la diferencia clave: en una frase simple el prefijo se separa (Ich stehe auf), pero con modal el infinitivo queda completo al final (Ich muss aufstehen). El prefijo solo se separa cuando el verbo está conjugado y en segunda posición.',
      ],
    },
    {
      heading: '¿Cómo se reconoce un verbo separable en alemán?',
      paragraphs: [
        'No todos los prefijos son separables. Los prefijos SIEMPRE separables son: ab-, an-, auf-, aus-, bei-, ein-, los-, mit-, nach-, vor-, weg-, zu-, zurück-. Los prefijos NUNCA separables son: be-, emp-, ent-, er-, ge-, miss-, ver-, zer-. Por eso "besuchen" (visitar) no se separa: Ich besuche dich.',
        'Una pista práctica: si el acento recae en el prefijo al pronunciar el infinitivo, el verbo es separable: AUFmachen, ANrufen, EINkaufen (acento en el prefijo). Si el acento recae en la raíz, no es separable: beSUCHen, verSTEHen.',
      ],
    },
    {
      heading: 'Verbos separables frecuentes en el día a día',
      paragraphs: [
        'Estos verbos separables aparecen en casi todas las conversaciones A1: aufstehen (levantarse — Ich stehe um 7 auf), anfangen (empezar — Der Kurs fängt um 9 an), aufhören (terminar/parar — Es hört um 17 Uhr auf), einkaufen (hacer la compra — Ich kaufe im Supermarkt ein), anrufen (llamar — Ruf mich an!).',
        'También muy útiles: mitkommen (acompañar — Kommst du mit?), ausgehen (salir de noche — Wir gehen aus), einschlafen (dormirse — Ich schlafe um 22 Uhr ein), abfahren (partir, dicho de transporte — Der Bus fährt um 8 ab).',
      ],
    },
  ],

  visual: {
    mode: 'split',
    teacherLens: 'Verbos separables: prefijo al final en frase simple, junto en infinitivo.',
    graphicPrompt: 'Diagrama visual mostrando cómo el prefijo "viaja" al final de la frase, con flechas.',
    scene: [
      ['aufmachen', 'Ich mache die Tür auf. — Abro la puerta.'],
      ['anrufen', 'Er ruft mich an. — Él me llama.'],
      ['anfangen', 'Wann fängst du an? — ¿Cuándo empiezas?'],
      ['aufstehen', 'Ich stehe um 7 auf. — Me levanto a las 7.'],
      ['einkaufen', 'Wir kaufen im Supermarkt ein. — Compramos en el supermercado.'],
      ['mitkommen', 'Kommst du mit? — ¿Vienes con nosotros?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['prefijo al final en frase simple', 'infinitivo junto con modal', 'prefijos separables: auf-, an-, ein-, mit-'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo separable.',
        type: 'choice',
        items: [
          {
            scene: 'Ana abre la ventana de la clase',
            lines: [['Ana', 'Ich ___ das Fenster ___.']],
            options: ['mache … auf', 'aufmache … —', 'machen … auf', 'auf … mache'],
            answer: 'mache … auf',
            explain: '"Aufmachen": verbo "mache" en 2ª posición, prefijo "auf" al final.',
          },
          {
            scene: 'Carlos llama a su madre por teléfono',
            lines: [['Carlos', 'Ich ___ meine Mutter ___.']],
            options: ['rufe … an', 'anrufe … —', 'rufen … an', 'an … rufe'],
            answer: 'rufe … an',
            explain: '"Anrufen": "rufe" conjugado en 2ª posición, "an" al final.',
          },
          {
            scene: 'La clase empieza puntual',
            lines: [['Elena', 'Der Kurs ___ um 9 Uhr ___.']],
            options: ['fängt … an', 'anfängt … —', 'fangen … an', 'an … fängt'],
            answer: 'fängt … an',
            explain: '"Anfangen": "fängt" (er/sie/es, irregular) en 2ª posición, "an" al final.',
          },
          {
            scene: 'Lina quiere saber si Marco va a salir',
            lines: [['Lina', '___ du heute Abend ___?']],
            options: ['Gehst … aus', 'Ausgehst … —', 'Gehen … aus', 'Aus … gehst'],
            answer: 'Gehst … aus',
            explain: '"Ausgehen": en pregunta Ja/Nein el verbo va al inicio: "Gehst", prefijo "aus" al final.',
          },
          {
            scene: 'Sofia hace la compra los sábados',
            lines: [['Sofia', 'Samstags ___ ich im Markt ___.']],
            options: ['kaufe … ein', 'einkaufe … —', 'kaufen … ein', 'ein … kaufe'],
            answer: 'kaufe … ein',
            explain: '"Einkaufen": "kaufe" en 2ª posición (el adverbio "samstags" ocupa posición 1), "ein" al final.',
          },
          {
            scene: 'Marco invita a Enzo a venir',
            lines: [['Marco', 'Enzo, ___ du ___?']],
            options: ['kommst … mit', 'mitkommst … —', 'kommen … mit', 'mit … kommst'],
            answer: 'kommst … mit',
            explain: '"Mitkommen": "kommst" en 2ª posición (pregunta Ja/Nein: verbo al inicio), "mit" al final.',
          },
          {
            scene: 'Enzo tiene que levantarse temprano',
            lines: [['Enzo', 'Ich muss früh ___.']],
            options: ['aufstehen', 'stehe auf', 'stehen auf', 'auf stehen'],
            answer: 'aufstehen',
            explain: 'Con modal (muss), el infinitivo va completo al final SIN separar: "aufstehen".',
          },
          {
            scene: 'Elena quiere llamar a un estudiante',
            lines: [['Elena', 'Ich möchte Carlos ___.']],
            options: ['anrufen', 'rufe an', 'an rufen', 'rufen an'],
            answer: 'anrufen',
            explain: 'Con modal (möchte), el infinitivo "anrufen" va completo al final, sin separar.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Verbo + prefijo',
        tag: '2 espacios',
        intro: 'Escribe la forma conjugada del verbo y el prefijo en su posición correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Describiendo la mañana de Carlos',
            lines: [['', 'Carlos [[0]] jeden Morgen um 6 Uhr [[1]]. (aufstehen)']],
            blanks: [
              { options: ['steht', 'stehe', 'stehst', 'stehen'], answer: 'steht', explain: '"Carlos" (er) + aufstehen → "steht" (sin prefijo en posición 2).' },
              { options: ['auf', 'aus', 'an', 'ein'], answer: 'auf', explain: 'El prefijo "auf" de "aufstehen" va al final.' },
            ],
          },
          {
            scene: 'Ana hace la compra',
            lines: [['', 'Ana [[0]] jeden Freitag [[1]]. (einkaufen)']],
            blanks: [
              { options: ['kauft', 'kaufe', 'kaufst', 'kaufen'], answer: 'kauft', explain: '"Ana" (sie) + einkaufen → "kauft" en posición 2.' },
              { options: ['ein', 'aus', 'an', 'auf'], answer: 'ein', explain: 'El prefijo "ein" de "einkaufen" va al final.' },
            ],
          },
          {
            scene: 'Preguntando si Marco va a venir también',
            lines: [['', '[[0]] Marco auch [[1]]? (mitkommen)']],
            blanks: [
              { options: ['Kommt', 'Kommen', 'Kommst', 'Komme'], answer: 'Kommt', explain: 'Pregunta Ja/Nein: verbo al inicio. "Marco" (er) + mitkommen → "kommt".' },
              { options: ['mit', 'an', 'aus', 'auf'], answer: 'mit', explain: 'El prefijo "mit" de "mitkommen" va al final.' },
            ],
          },
          {
            scene: 'La clase de alemán termina a las 5',
            lines: [['', 'Der Kurs [[0]] um 17 Uhr [[1]]. (aufhören)']],
            blanks: [
              { options: ['hört', 'höre', 'hörst', 'hören'], answer: 'hört', explain: '"Der Kurs" (er) + aufhören → "hört" en posición 2.' },
              { options: ['auf', 'an', 'aus', 'mit'], answer: 'auf', explain: 'El prefijo "auf" de "aufhören" va al final.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta del verbo separable en cada hueco.',
        type: 'guidedText',
        scene: 'Enzo describe su rutina diaria.',
        text: 'Mein Alltag: Ich [[0]] um 6 Uhr auf. (aufstehen) Dann [[1]] ich einen Kaffee. (aufmachen — la nevera) Ich [[2]] die E-Mails. (aufmachen) Um 9 Uhr [[3]] der Unterricht an. (anfangen) Nach der Arbeit [[4]] ich oft im Supermarkt. (einkaufen) Abends [[5]] ich manchmal Freunde. (anrufen) Und um 22 Uhr [[6]] ich ein. (einschlafen)',
        blanks: [
          { options: ['stehe', 'stehst', 'steht', 'stehen'], answer: 'stehe', explain: '"Ich" + aufstehen → "stehe" (posición 2), "auf" ya está al final en el texto.' },
          { options: ['mache', 'macht', 'machst', 'machen'], answer: 'mache', explain: '"Ich" + aufmachen → "mache" en posición 2, "auf" al final.' },
          { options: ['mache', 'macht', 'machst', 'machen'], answer: 'mache', explain: '"Ich" + aufmachen → "mache" otra vez para abrir emails.' },
          { options: ['fängt', 'fange', 'fängst', 'fangen'], answer: 'fängt', explain: '"Der Unterricht" (er) + anfangen → "fängt" (irregular: a→ä), "an" al final.' },
          { options: ['kaufe', 'kauft', 'kaufst', 'kaufen'], answer: 'kaufe', explain: '"Ich" + einkaufen → "kaufe", "ein" al final.' },
          { options: ['rufe', 'ruft', 'rufst', 'rufen'], answer: 'rufe', explain: '"Ich" + anrufen → "rufe", "an" al final.' },
          { options: ['schlafe', 'schläft', 'schläfst', 'schlafen'], answer: 'schlafe', explain: '"Ich" + einschlafen → "schlafe", "ein" al final.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del verbo separable de memoria.',
        type: 'freeText',
        scene: 'Diálogo entre Lina y Sofia.',
        text: 'Lina: "Wann [[0]] du morgen [[1]]?" (aufstehen) Sofia: "Ich [[2]] um 7 auf." Lina: "Wir [[3]] um 9 an." (anfangen) Sofia: "Ok! Ich [[4]] dich um 8 an." (anrufen)',
        blanks: [
          { answer: 'stehst', accepted: ['stehst'], explain: '"Du" + aufstehen → "stehst" (posición 2 en pregunta W).' },
          { answer: 'auf', accepted: ['auf'], explain: 'El prefijo "auf" de aufstehen va al final.' },
          { answer: 'stehe', accepted: ['stehe'], explain: '"Ich" + aufstehen → "stehe".' },
          { answer: 'fangen', accepted: ['fangen'], explain: '"Wir" + anfangen → "fangen", "an" ya está en el texto.' },
          { answer: 'rufe', accepted: ['rufe'], explain: '"Ich" + anrufen → "rufe", "an" ya está en el texto.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas con verbos separables.',
        type: 'write',
        items: [
          {
            scene: 'Hablando de tu rutina matutina',
            prompt: 'Di a qué hora te levantas (aufstehen) y cuándo empieza tu día (anfangen).',
            answer: 'Ich stehe um 7 Uhr auf. Mein Tag fängt um 8 an.',
            accepted: ['stehe … auf', 'steh … auf', 'fängt … an', 'fange … an'],
            explain: 'Aufstehen: Ich stehe um … auf. Anfangen: Mein Tag fängt um … an. Prefijo siempre al final.',
          },
          {
            scene: 'Planes para esta tarde',
            prompt: 'Di qué quieres hacer esta tarde usando 2 verbos separables con modal.',
            answer: 'Ich möchte heute Abend ausgehen. Ich will auch einkaufen.',
            accepted: ['aufstehen', 'anrufen', 'anfangen', 'aufhören', 'einschlafen', 'mitkommen', 'ausgehen', 'einkaufen'],
            explain: 'Con modal: infinitivo completo al final. Ich möchte ausgehen. / Ich will einkaufen. / Ich kann mitkommen.',
          },
          {
            scene: 'Describiendo el horario de una persona',
            prompt: 'Describe la rutina de Carlos: a qué hora empieza el trabajo y a qué hora termina.',
            answer: 'Carlos fängt um 9 Uhr an. Er hört um 18 Uhr auf.',
            accepted: ['fängt … an', 'hört … auf', 'beginnt', 'aufstehen', 'ankommen'],
            explain: 'Anfangen: fängt … an. Aufhören: hört … auf. Recuerda el prefijo al final para er/sie/es también.',
          },
          {
            scene: 'Preguntando a un amigo',
            prompt: 'Haz dos preguntas con verbos separables: ¿a qué hora se levanta? y ¿va a venir?',
            answer: 'Wann stehst du auf? Kommst du mit?',
            accepted: ['stehst … auf', 'kommst … mit', 'fängst … an', 'rufst … an', 'gehst … aus'],
            explain: 'En preguntas: W + verbo (sin prefijo) + sujeto + … + prefijo al final. Kommst du mit? (Ja/Nein)',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu día usando 4 verbos separables distintos.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina completa del día',
            prompt: 'Describe tu rutina usando aufstehen, anfangen, einkaufen y einschlafen.',
            answer: 'Ich stehe um 7 auf. Mein Tag fängt um 8 an. Nachmittags kaufe ich ein. Ich schlafe um 23 Uhr ein.',
            accepted: ['stehe … auf', 'fängt … an', 'fange … an', 'kaufe … ein', 'schlafe … ein'],
            explain: 'Cada verbo separable: forma conjugada en 2ª posición, prefijo al final. Aufstehen→stehe auf. Anfangen→fängt/fange an.',
          },
          {
            scene: 'Organizando una salida con amigos',
            prompt: 'Escribe 3 oraciones sobre planes para salir: ¿cuándo empieza? ¿vienes? ¿qué hora termina?',
            answer: 'Wir gehen um 20 Uhr aus. Kommst du mit? Es hört um Mitternacht auf.',
            accepted: ['gehen … aus', 'kommst … mit', 'hört … auf', 'fängt … an', 'fange … an'],
            explain: 'Ausgehen: gehen aus. Mitkommen: kommst mit? Aufhören: hört auf. Prefijo siempre al final.',
          },
          {
            scene: 'Describiendo los planes de un amigo',
            prompt: 'Di qué quiere hacer tu amigo Marco esta semana usando 3 verbos separables con wollen.',
            answer: 'Marco will morgen früh aufstehen. Er will einkaufen. Er will abends ausgehen.',
            accepted: ['aufstehen', 'einkaufen', 'ausgehen', 'anrufen', 'mitkommen', 'anfangen'],
            explain: 'Con wollen: infinitivo completo al final, sin separar. Er will aufstehen (no: er will stehen auf).',
          },
        ],
      },
    ],
  },
}

export default topic
