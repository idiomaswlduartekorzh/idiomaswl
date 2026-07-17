import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'deshou-a2',
  order: '11',
  color: '#dc2626',
  category: 'Modalidad',
  level: 'A2',
  title: '~でしょう/だろう en japonés A2: probabilidad y confirmación',
  shortTitle: '~でしょう/だろう',
  metaTitle: 'Probabilidad en japonés A2 — でしょう, だろう, supongo que/¿verdad?',
  description:
    '~でしょう (formal) y ~だろう (informal) expresan probabilidad ("probablemente"), conjetura o buscan confirmación del oyente ("¿verdad?"). Se construyen con la forma diccionario o la raíz de adjetivos y sustantivos. Con entonación ascendente ¿でしょう? actúa como tag question. Es equivalente a "será que..." o "¿no?" en español.',
  lead: '明日は雨でしょう: la forma de expresar probabilidad y buscar confirmación en japonés.',
  outcomes: [
    'Usar ~でしょう para expresar probabilidad o suposición',
    'Usar ~だろう como forma informal de でしょう',
    'Distinguir でしょう↑ (pregunta) de でしょう↓ (afirmación)',
    'Combinar でしょう con verbos, adjetivos y sustantivos',
  ],

  guide: {
    goal: 'Expresar probabilidad y buscar confirmación con ~でしょう y ~だろう.',
    model: '明日は雨でしょう。(Mañana probablemente llueva.) / 難しいでしょう？(¿Verdad que es difícil?)',
    formula: 'V dic. / い-Adj / な-Adj (だ→) / N (だ→) + でしょう | だろう (informal)',
    decisions: [
      'Probabilidad: V dic. + でしょう → "来るでしょう" (probablemente vendrá)',
      'Con い-adj: そのまま + でしょう → "高いでしょう" (probablemente sea caro)',
      'Con な-adj: だ → でしょう → "元気でしょう" (probablemente esté bien)',
      'Con sustantivo: だ → でしょう → "学生でしょう" (probablemente sea estudiante)',
      'Tag question: でしょう↑ = ¿verdad? → "知っているでしょう？" (¿Lo sabes, verdad?)',
    ],
    table: [
      ['Tipo', 'Forma', 'Ejemplo'],
      ['Verbo (dic.)', 'V + でしょう', '雨が降るでしょう'],
      ['い-adj', 'い-adj + でしょう', '寒いでしょう'],
      ['な-adj/N', 'な-adj / N + でしょう', '静かでしょう / 先生でしょう'],
    ],
    mistakes: [
      '"食べますでしょう" ❌ → "食べるでしょう" ✓ — se usa la forma diccionario, no la forma -ます.',
      '"高いですでしょう" ❌ → "高いでしょう" ✓ — los い-adj no llevan です antes de でしょう.',
      'だろう es informal; no usar en contextos formales o con superiores.',
    ],
  },

  seo: [
    {
      heading: '~でしょう: probabilidad y conjetura en japonés',
      paragraphs: [
        '~でしょう expresa que algo es probable o que el hablante supone que algo es así. Es equivalente al español "probablemente", "creo que" o "debe de ser". "明日は雨でしょう" (Mañana probablemente llueva) es la típica frase del pronóstico del tiempo japonés.',
        'Con entonación ascendente (でしょう↑), se convierte en una pregunta de confirmación, equivalente a "¿verdad?" en español: "知っているでしょう？" (Lo sabes, ¿verdad?). Esta doble función lo convierte en una de las partículas modales más versátiles del japonés A2.',
      ],
    },
    {
      heading: 'だろう: la versión informal de でしょう',
      paragraphs: [
        'だろう es la forma informal de でしょう. Se usa en conversaciones informales, en el habla masculina o en el monólogo interno. "たぶん来るだろう" (Probablemente vendrá) es equivalente a "来るでしょう" pero más casual.',
        'たぶん (probablemente) y きっと (seguramente) se usan frecuentemente con でしょう/だろう para graduar el nivel de certeza: "たぶん雨でしょう" (probablemente llueva) vs "きっと来るでしょう" (seguramente vendrá).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'でしょう/だろう: probabilidad (↓) y confirmación (↑).',
    graphicPrompt: 'Persona mirando el cielo nublado, expresando probabilidad de lluvia.',
    scene: [
      ['明日は晴れるでしょう。', 'Mañana probablemente hará sol.'],
      ['彼は来ないでしょう。', 'Él probablemente no vendrá.'],
      ['高いでしょう？', '¿Verdad que es caro?'],
      ['たぶん学生でしょう。', 'Probablemente sea estudiante.'],
      ['難しいだろうと思っていた。', 'Pensaba que sería difícil.'],
      ['きっと大丈夫でしょう。', 'Seguramente estará bien.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V dic. + でしょう', 'い-adj + でしょう', 'だろう (informal)', 'でしょう↑ (confirmación)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta con でしょう',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta para expresar probabilidad.',
        type: 'choice',
        items: [
          {
            scene: 'Probablemente mañana llueva.',
            lines: [['', '明日は雨が___.']],
            options: ['降るでしょう', '降りますでしょう', '降っているでしょう', '降るだ'],
            answer: '降るでしょう',
            explain: '"降るでしょう" = probablemente llueva. Forma diccionario + でしょう.',
          },
          {
            scene: 'Probablemente sea caro.',
            lines: [['', 'たぶん___.']],
            options: ['高いでしょう', '高いですでしょう', '高くでしょう', '高いだろうです'],
            answer: '高いでしょう',
            explain: '"高いでしょう" = probablemente sea caro. い-adj + でしょう directamente.',
          },
          {
            scene: 'Probablemente sea estudiante (forma informal).',
            lines: [['', 'きっと学生___.']],
            options: ['だろう', 'でしょう', 'でしょうか', 'だろうか'],
            answer: 'だろう',
            explain: '"学生だろう" = probablemente sea estudiante. N + だろう (informal).',
          },
          {
            scene: '¿Verdad que es difícil? (tag question)',
            lines: [['', '難しい___？']],
            options: ['でしょう↑', 'でしょう↓', 'だろう', 'でしょうか'],
            answer: 'でしょう↑',
            explain: 'でしょう con entonación ascendente = ¿verdad? (confirmación).',
          },
          {
            scene: 'Él probablemente no venga mañana.',
            lines: [['', '彼は明日来ない___.']],
            options: ['でしょう', 'ですでしょう', 'でしょうか', 'だ'],
            answer: 'でしょう',
            explain: '"来ないでしょう" = probablemente no vendrá. V neg. dic. + でしょう.',
          },
          {
            scene: 'Probablemente esté tranquilo (na-adj).',
            lines: [['', 'たぶん静か___.']],
            options: ['でしょう', 'だでしょう', 'いでしょう', 'なでしょう'],
            answer: 'でしょう',
            explain: '"静かでしょう" = probablemente esté tranquilo. な-adj (sin だ) + でしょう.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Probabilidad y confirmación',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de でしょう o だろう.',
        type: 'dual',
        items: [
          {
            scene: 'Probablemente sea japonés, ¿verdad?',
            lines: [['', '日本人[[0]]。日本人[[1]]？']],
            blanks: [
              { options: ['でしょう', 'だろう', 'ですか', 'だ'], answer: 'でしょう', explain: '"日本人でしょう" = probablemente sea japonés.' },
              { options: ['でしょう', 'だろう', 'ですか', 'か'], answer: 'でしょう', explain: 'Con entonación ascendente: "日本人でしょう？" = ¿Es japonés, verdad?' },
            ],
          },
          {
            scene: 'Probablemente sea difícil (formal) / probablemente sea difícil (informal).',
            lines: [['', '難しい[[0]]。（フォーマル） / 難しい[[1]]。（インフォーマル）']],
            blanks: [
              { options: ['でしょう', 'だろう', 'ですね', 'か'], answer: 'でしょう', explain: '"難しいでしょう" = formal, para contextos de respeto.' },
              { options: ['だろう', 'でしょう', 'ですね', 'か'], answer: 'だろう', explain: '"難しいだろう" = informal, entre amigos o en monólogo.' },
            ],
          },
          {
            scene: 'Probablemente haga buen tiempo, así que salgamos.',
            lines: [['', '天気がいい[[0]]。だから出かけ[[1]]。']],
            blanks: [
              { options: ['でしょう', 'だろう', 'でしょうか', 'ですね'], answer: 'でしょう', explain: '"いいでしょう" = probablemente haga buen tiempo.' },
              { options: ['ましょう', 'でしょう', 'だろう', 'ます'], answer: 'ましょう', explain: '"出かけましょう" = ¡salgamos! (volitivo de cortesía).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Pronóstico del tiempo',
        tag: 'Texto guiado',
        intro: 'Completa el pronóstico del tiempo usando でしょう.',
        type: 'guidedText',
        scene: '天気予報です。',
        text: '明日の天気をお伝えします。朝は曇り[[0]]。昼ごろから雨が降る[[1]]。気温は今日より低い[[1]]。風が強い[[0]]ので、傘を持って行った方がいい[[0]]。',
        blanks: [
          { options: ['でしょう', 'だろう', 'ですね', 'か'], answer: 'でしょう', explain: '"曇りでしょう" = probablemente esté nublado. N + でしょう.' },
          { options: ['でしょう', 'だろう', 'です', 'か'], answer: 'でしょう', explain: '"降るでしょう" / "低いでしょう" = probabilidad. V dic./い-adj + でしょう.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Expresa probabilidad',
        tag: 'Texto libre',
        intro: 'Sin opciones: añade でしょう o だろう según el contexto.',
        type: 'freeText',
        scene: '次の文に確率を付けてください。',
        text: '彼女は来ない___。(probablemente, formal) / この問題は難しい___。(probablemente, informal) / 彼は先生___。(¿verdad? — confirmación) / きっと大丈夫___。(seguramente, formal)',
        blanks: [
          { answer: 'でしょう', explain: '"来ないでしょう" = probablemente no venga (formal).' },
          { answer: 'だろう', explain: '"難しいだろう" = probablemente sea difícil (informal).' },
          { answer: 'でしょう', explain: '"先生でしょう？" con entonación ascendente = ¿verdad que es profesor?' },
          { answer: 'でしょう', explain: '"大丈夫でしょう" = seguramente estará bien (formal).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa conjetura',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa usando でしょう o だろう.',
        type: 'write',
        items: [
          {
            scene: 'Probablemente mañana haga calor.',
            prompt: '明日は暑い... (probabilidad, formal)',
            answer: '明日は暑いでしょう。',
            accepted: ['明日はたぶん暑いでしょう。'],
            explain: '"暑いでしょう" = い-adj + でしょう. たぶん refuerza la probabilidad.',
          },
          {
            scene: 'Él probablemente no sepa japonés (informal).',
            prompt: '彼は日本語... (不知道, informal)',
            answer: '彼は日本語を知らないだろう。',
            accepted: ['彼は日本語がわからないだろう。'],
            explain: '"知らないだろう" = V neg. dic. + だろう (informal).',
          },
          {
            scene: 'Eso es caro, ¿verdad? (tag question)',
            prompt: 'それは高い... (¿verdad?)',
            answer: 'それは高いでしょう？',
            accepted: ['高いでしょう？'],
            explain: 'でしょう↑ con entonación ascendente = ¿verdad que es caro?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe conjeturas sobre el futuro',
        tag: 'Escritura libre',
        intro: 'Escribe 3 oraciones sobre lo que probablemente pasará usando でしょう/だろう.',
        type: 'write',
        items: [
          {
            scene: 'Escribe conjeturas sobre el mañana (tiempo, planes, personas).',
            prompt: 'でしょうかだろうを使って明日について書いてください。',
            answer: '明日は晴れるでしょう。友達が来るでしょう。テストは難しくないでしょう。',
            accepted: ['明日は寒いでしょう。バスが遅れるかもしれません。先生は来るでしょう。'],
            explain: 'でしょう expresa probabilidad sobre el futuro; たぶん/きっと refuerzan el grado.',
          },
          {
            scene: 'Describe qué crees que será difícil en el futuro y por qué.',
            prompt: '将来難しいことについて書いてください。',
            answer: '日本語は難しいでしょう。でも、練習すれば上手になれるでしょう。仕事を見つけるのも大変だろうと思います。',
            accepted: ['日本語の漢字はたぶん難しいでしょう。毎日勉強すれば大丈夫でしょう。'],
            explain: '"でしょう" = probabilidad formal; "だろうと思います" = creo que probablemente.',
          },
        ],
      },
    ],
  },
}

export default topic
