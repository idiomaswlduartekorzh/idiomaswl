import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'infinitiv-zu-a2',
  order: '12',
  color: '#c9a900',
  category: 'Verben',
  level: 'A2',
  title: 'Infinitiv mit zu',
  shortTitle: 'Infinitiv mit zu',
  metaTitle: 'Infinitivo con zu en alemán A2 — Es ist wichtig zu lernen',
  description:
    'El infinitivo con "zu" se usa en alemán con verbos como versuchen, vergessen, anfangen, aufhören, hoffen, vorhaben y con expresiones como "Es ist wichtig/schön/schwer zu...". Con verbos separables, "zu" se inserta entre el prefijo y el verbo: einzuschlafen, anzufangen.',
  lead: 'El infinitivo completivo: versuchen zu, Es ist wichtig zu, anfangen zu.',
  outcomes: [
    'Usar zu + Infinitiv tras verbos como versuchen, vergessen, anfangen, hoffen',
    'Construir expresiones con Es ist + Adjektiv + zu + Infinitiv',
    'Insertar zu entre el prefijo y el verbo en separables: ein-zu-schlafen',
    'Distinguir cuándo se usa zu y cuándo NO (verbos modales, lassen, sehen, hören)',
  ],

  guide: {
    goal: 'Usar el infinitivo con zu en contextos cotidianos correctamente.',
    model: 'Ich versuche zu schlafen. / Es ist wichtig, jeden Tag zu üben. / Ich fange an einzuschlafen.',
    formula: 'Verb + zu + Infinitiv / Es ist + Adj. + zu + Infinitiv',
    decisions: [
      'Verbos que llevan zu + Infinitiv: versuchen, vergessen, anfangen, aufhören, hoffen, vorhaben, planen, empfehlen',
      'Construcciones con Es ist: Es ist wichtig/schön/schwer/interessant/möglich/nötig + zu + Infinitiv',
      'Verbos separables: zu se inserta entre prefijo y verbo → einzuschlafen, anzufangen, aufzuhören, vorzuhaben',
      'El infinitivo SIEMPRE va al final de la frase: Ich versuche, früh aufzustehen.',
      'NO se usa zu con verbos modales: Ich muss gehen (no "zu gehen")',
      'NO se usa zu con bleiben, lassen, sehen, hören, helfen (en algunos contextos): Ich sehe ihn kommen',
    ],
    table: [
      ['Typ', 'Formel', 'Beispiel'],
      ['Verb + zu + Inf', 'versuchen + zu + Inf', 'Ich versuche zu lernen'],
      ['anfangen/aufhören', 'anfangen + zu + Inf', 'Ich fange an zu arbeiten'],
      ['Es ist + Adj', 'Es ist wichtig + zu + Inf', 'Es ist wichtig zu essen'],
      ['Separable', 'Präfix + zu + Stamm', 'Ich versuche einzuschlafen'],
      ['KEIN zu', 'Modal + Inf', 'Ich muss jetzt gehen'],
    ],
    mistakes: [
      'Colocar zu en la posición incorrecta con separables: INCORRECTO "Ich versuche zu einschlafen" → CORRECTO "Ich versuche einzuschlafen"',
      'Usar zu con verbos modales: INCORRECTO "Ich muss zu gehen" → CORRECTO "Ich muss gehen"',
      'Olvidar la coma opcional que separa las dos cláusulas: "Ich versuche(,) jeden Tag zu lernen" (la coma es opcional pero recomendada en frases largas)',
    ],
  },

  seo: [
    {
      heading: '¿Cuándo se usa el infinitivo con zu en alemán?',
      paragraphs: [
        'El infinitivo con "zu" aparece cuando el verbo principal requiere un complemento en forma de infinitivo. Los verbos más frecuentes que lo rigen son: versuchen (intentar), vergessen (olvidar), anfangen/beginnen (empezar), aufhören (parar), hoffen (esperar/tener esperanza), planen (planear), vorhaben (tener planeado), empfehlen (recomendar).',
        'También aparece en construcciones impersonales como "Es ist wichtig zu lernen", "Es ist schön, Zeit zu haben", "Es ist schwer, jeden Tag zu üben". En todos los casos, el infinitivo con zu va al final de la cláusula.',
      ],
    },
    {
      heading: '¿Cómo se coloca zu con los verbos separables en alemán?',
      paragraphs: [
        'Con verbos separables, "zu" se inserta entre el prefijo y la raíz del verbo, formando una sola palabra: aufhören → aufzuhören, einschlafen → einzuschlafen, anfangen → anzufangen, vorhaben → vorzuhaben. Nunca se escribe por separado: "zu aufhören" es incorrecto.',
      ],
    },
    {
      heading: '¿Cuándo NO se usa zu en alemán?',
      paragraphs: [
        'Los verbos modales (müssen, können, dürfen, wollen, sollen, mögen/möchten) nunca llevan "zu" con el infinitivo: "Ich muss gehen", "Er kann schwimmen". Tampoco lo llevan lassen, sehen, hören, helfen en ciertos contextos: "Ich höre ihn singen" (no "zu singen").',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Infinitiv mit zu: zu al inicio del infinitivo, o intercalado en separables.',
    graphicPrompt: 'Flecha de un verbo principal al infinitivo con zu al final de la oración.',
    scene: [
      ['Ich versuche zu schlafen', 'Intento dormir'],
      ['Es ist wichtig, täglich zu üben', 'Es importante practicar a diario'],
      ['Ich fange an einzuschlafen', 'Empiezo a quedarme dormido/a'],
      ['Vergiss nicht aufzuräumen!', '¡No olvides ordenar!'],
      ['Er hofft, bald zu kommen', 'Espera poder venir pronto'],
      ['Es ist schön, Deutsch zu sprechen', 'Es bonito hablar alemán'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['zu + Infinitiv', 'Präfix + zu + Stamm', 'kein zu mit Modalverben'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del infinitivo con zu.',
        type: 'choice',
        items: [
          {
            scene: 'Intentando dormir',
            lines: [['', 'Ich versuche ___ . (schlafen)']],
            options: ['zu schlafen', 'schlafen zu', 'zu schlafe', 'schlafen'],
            answer: 'zu schlafen',
            explain: '"schlafen" es un verbo simple. zu + Infinitiv = zu schlafen.',
          },
          {
            scene: 'Empezando a trabajar',
            lines: [['', 'Ich fange an ___ . (arbeiten)']],
            options: ['zu arbeiten', 'arbeiten zu', 'arbeiten', 'zu arbeit'],
            answer: 'zu arbeiten',
            explain: '"anfangen" rige zu + Infinitiv al final: fange an … zu arbeiten.',
          },
          {
            scene: 'Intentando quedarse dormido',
            lines: [['', 'Er versucht ___ . (einschlafen — separable)']],
            options: ['einzuschlafen', 'zu einschlafen', 'einschlafen zu', 'einschlafen'],
            answer: 'einzuschlafen',
            explain: '"einschlafen" es separable. zu se inserta: ein + zu + schlafen = einzuschlafen.',
          },
          {
            scene: 'Es importante practicar',
            lines: [['', 'Es ist wichtig, jeden Tag ___ . (üben)']],
            options: ['zu üben', 'üben zu', 'zu übt', 'üben'],
            answer: 'zu üben',
            explain: 'Construcción "Es ist + Adj + zu + Infinitiv": zu üben al final.',
          },
          {
            scene: 'Olvidando llamar',
            lines: [['', 'Ich vergesse ___ . (anrufen — separable)']],
            options: ['anzurufen', 'zu anrufen', 'anrufen zu', 'anzuruft'],
            answer: 'anzurufen',
            explain: '"anrufen" es separable. an + zu + rufen = anzurufen.',
          },
          {
            scene: 'Parando de fumar',
            lines: [['', 'Er hört auf ___ . (rauchen)']],
            options: ['zu rauchen', 'rauchen zu', 'rauchen', 'zu raucht'],
            answer: 'zu rauchen',
            explain: '"aufhören" rige zu + Infinitiv: hört auf … zu rauchen.',
          },
          {
            scene: 'Teniendo que ir (verbo modal)',
            lines: [['', 'Sie muss jetzt ___ . (gehen)']],
            options: ['gehen', 'zu gehen', 'gehen zu', 'zu geht'],
            answer: 'gehen',
            explain: 'Los verbos modales (müssen) NO llevan zu: Sie muss gehen.',
          },
          {
            scene: 'Es difícil aprender',
            lines: [['', 'Es ist schwer, eine neue Sprache ___ . (lernen)']],
            options: ['zu lernen', 'lernen zu', 'lernen', 'zu lernt'],
            answer: 'zu lernen',
            explain: '"Es ist schwer + zu + Infinitiv": zu lernen al final.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa el verbo principal y la forma con zu del infinitivo.',
        type: 'dual',
        items: [
          {
            scene: 'Intentando hablar alemán',
            lines: [['', 'Ich [[0]], immer Deutsch [[1]]. (versuchen, sprechen)']],
            blanks: [
              { options: ['versuche', 'versucht', 'versuchen', 'versuchst'], answer: 'versuche', explain: 'Ich versuche (1.ª persona singular).' },
              { options: ['zu sprechen', 'sprechen zu', 'zu spricht', 'sprechen'], answer: 'zu sprechen', explain: '"sprechen" simple → zu sprechen.' },
            ],
          },
          {
            scene: 'Empezando a correr',
            lines: [['', 'Sie [[0]] an, jeden Morgen [[1]]. (anfangen, laufen)']],
            blanks: [
              { options: ['fängt', 'fangen', 'fange', 'fängst'], answer: 'fängt', explain: 'Sie fängt an (3.ª persona singular, vocal Umlaut).' },
              { options: ['zu laufen', 'laufen zu', 'laufen', 'zu läuft'], answer: 'zu laufen', explain: '"laufen" simple → zu laufen.' },
            ],
          },
          {
            scene: 'Olvidando ordenar',
            lines: [['', 'Er vergisst immer, sein Zimmer [[0]] . Das ist nicht schön, immer alles [[1]] lassen.']],
            blanks: [
              { options: ['aufzuräumen', 'zu aufräumen', 'aufräumen zu', 'zu räumen auf'], answer: 'aufzuräumen', explain: '"aufräumen" separable → auf + zu + räumen = aufzuräumen.' },
              { options: ['liegen zu', 'zu liegen', 'liegend', 'liegt'], answer: 'zu liegen', explain: '"liegen lassen" = dejar tirado; aquí "liegen" → zu liegen.' },
            ],
          },
          {
            scene: 'Esperando ver a un amigo',
            lines: [['', 'Ich [[0]], meinen Freund bald [[1]]. (hoffen, besuchen)']],
            blanks: [
              { options: ['hoffe', 'hofft', 'hoffen', 'hoffst'], answer: 'hoffe', explain: 'Ich hoffe (1.ª persona singular).' },
              { options: ['zu besuchen', 'besuchen zu', 'zu besucht', 'besuchen'], answer: 'zu besuchen', explain: '"besuchen" simple → zu besuchen.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las formas correctas de infinitivo con zu.',
        type: 'guidedText',
        scene: 'Nina habla de sus propósitos de año nuevo.',
        text: 'Dieses Jahr habe ich vor, mehr Sport [[0]]. Ich hoffe, jeden Morgen [[1]]. Es ist wichtig, regelmäßig [[2]]. Ich versuche auch, weniger Zucker [[3]]. Es ist nicht leicht, alte Gewohnheiten [[4]].',
        blanks: [
          { options: ['zu machen', 'machen zu', 'zu macht', 'machen'], answer: 'zu machen', explain: '"vorhaben" rige zu + Infinitiv: zu machen.' },
          { options: ['zu laufen', 'laufen zu', 'laufen', 'zu läuft'], answer: 'zu laufen', explain: '"hoffen" rige zu + Infinitiv: zu laufen.' },
          { options: ['zu trainieren', 'trainieren zu', 'trainieren', 'zu trainiert'], answer: 'zu trainieren', explain: '"Es ist wichtig + zu + Infinitiv": zu trainieren.' },
          { options: ['zu essen', 'essen zu', 'essen', 'zu isst'], answer: 'zu essen', explain: '"versuchen" rige zu + Infinitiv: zu essen.' },
          { options: ['aufzugeben', 'zu aufgeben', 'aufgeben zu', 'zu aufgibt'], answer: 'aufzugeben', explain: '"aufgeben" separable → auf + zu + geben = aufzugeben.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de infinitivo con zu sin opciones.',
        type: 'freeText',
        scene: 'Marco habla de sus dificultades aprendiendo alemán.',
        text: 'Ich versuche, jeden Tag Deutsch [[0]]. Es ist manchmal schwer, neue Wörter [[1]]. Ich fange an, die Grammatik besser [[2]]. Es ist schön, auf Deutsch [[3]]. Ich hoffe, bald fließend Deutsch [[4]].',
        blanks: [
          { answer: 'zu üben', accepted: ['zu üben'], explain: '"üben" simple → zu üben.' },
          { answer: 'zu lernen', accepted: ['zu lernen'], explain: '"lernen" simple → zu lernen.' },
          { answer: 'zu verstehen', accepted: ['zu verstehen'], explain: '"verstehen" simple (no separable) → zu verstehen.' },
          { answer: 'zu sprechen', accepted: ['zu sprechen'], explain: '"sprechen" simple → zu sprechen.' },
          { answer: 'zu sprechen', accepted: ['zu sprechen', 'sprechen zu können'], explain: '"sprechen" simple → zu sprechen. (También: fließend sprechen zu können).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas usando Infinitiv mit zu.',
        type: 'write',
        items: [
          {
            scene: 'Algo que intentas hacer',
            prompt: 'Di algo que intentas hacer usando "versuchen + zu + Infinitiv".',
            answer: 'Ich versuche, jeden Tag zu lernen.',
            accepted: ['versuche zu', 'versuche, ... zu', 'Ich versuche'],
            explain: 'Ich versuche + (,) + zu + Infinitiv al final.',
          },
          {
            scene: 'Algo importante para ti',
            prompt: 'Di algo que es importante para ti (Es ist wichtig, zu...).',
            answer: 'Es ist wichtig, genug zu schlafen.',
            accepted: ['Es ist wichtig', 'ist wichtig zu', 'wichtig zu'],
            explain: '"Es ist + Adj. + , + zu + Infinitiv": Es ist wichtig, genug zu schlafen.',
          },
          {
            scene: 'Un plan con verbo separable',
            prompt: 'Di que tienes planeado levantarte temprano (vorhaben + aufstehen).',
            answer: 'Ich habe vor, morgen früh aufzustehen.',
            accepted: ['aufzustehen', 'vor, ... aufzustehen'],
            explain: '"vorhaben" rige zu + Infinitiv. "aufstehen" separable → auf + zu + stehen = aufzustehen.',
          },
          {
            scene: 'Dejar un hábito',
            prompt: 'Di que dejas de hacer algo (aufhören + zu + Infinitiv).',
            answer: 'Ich höre auf, so viel Kaffee zu trinken.',
            accepted: ['höre auf', 'aufzuhören', 'zu trinken'],
            explain: '"aufhören" + zu + Infinitiv. "aufhören" mismo es separable: auf + zu + hören = aufzuhören si es infinitivo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe sobre tus planes y propósitos usando Infinitiv mit zu.',
        type: 'write',
        items: [
          {
            scene: 'Tus propósitos',
            prompt: 'Escribe 2-3 propósitos que tienes para este año usando vorhaben, planen, hoffen.',
            answer: 'Ich habe vor, dieses Jahr mehr zu reisen. Ich plane, Deutsch zu lernen. Ich hoffe, bald einen neuen Job zu finden.',
            accepted: ['habe vor', 'plane', 'hoffe', 'zu reisen', 'zu lernen', 'zu finden'],
            explain: 'vorhaben/planen/hoffen + zu + Infinitiv al final.',
          },
          {
            scene: 'Qué intentas cambiar',
            prompt: 'Di 2-3 cosas que intentas cambiar en tu vida (versuchen, aufhören, anfangen).',
            answer: 'Ich versuche, mehr Sport zu machen. Ich höre auf, so viel zu essen. Ich fange an, früher aufzustehen.',
            accepted: ['zu machen', 'aufzustehen', 'zu essen', 'versuche', 'höre auf', 'fange an'],
            explain: 'anfangen/aufhören/versuchen + zu + Infinitiv. Separables: Präfix + zu + Stamm.',
          },
          {
            scene: 'Consejos para aprender alemán',
            prompt: 'Da 2-3 consejos para aprender alemán usando "Es ist wichtig/nötig/schön zu...".',
            answer: 'Es ist wichtig, jeden Tag zu üben. Es ist nötig, viele Texte zu lesen. Es ist schön, auf Deutsch zu denken.',
            accepted: ['Es ist wichtig', 'Es ist nötig', 'Es ist schön', 'zu üben', 'zu lesen', 'zu denken'],
            explain: '"Es ist + Adjektiv + (,) + zu + Infinitiv". El infinitivo siempre al final.',
          },
        ],
      },
    ],
  },
}

export default topic
