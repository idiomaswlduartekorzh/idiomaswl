import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'tara-condicional-a2',
  order: '13',
  color: '#dc2626',
  category: 'Condicional',
  level: 'A2',
  title: '~たら en japonés A2: condicional cuando/si algo ocurre',
  shortTitle: '~たら (condicional)',
  metaTitle: 'Condicional たら en japonés A2 — si/cuando algo ocurre, secuencia temporal',
  description:
    '~たら es el condicional más versátil del japonés. Expresa "si/cuando X ocurre, entonces Y". Se forma con la base たら: た-form + ら. Puede expresar condición hipotética ("si estudiases..."), condición real futura ("cuando llegues, llámame") y secuencia ("después de que terminó, descansó"). Es diferente de ~と (natural/inevitable) y ~ば (más formal/hipotético).',
  lead: '家に帰ったら、電話してください: el condicional たら que conecta dos eventos en japonés.',
  outcomes: [
    'Formar ~たら desde la forma た del verbo',
    'Expresar condición futura con ~たら',
    'Expresar condición hipotética con ~たら',
    'Distinguir たら de と y ば como condicionales',
  ],

  guide: {
    goal: 'Usar ~たら para condiciones futuras, hipotéticas y secuencias en japonés.',
    model: '家に帰ったら、電話してください。(Cuando llegues a casa, llámame.) / もし時間があったら、行きます。(Si tuviera tiempo, iría.)',
    formula: 'V-た → V-たら | い-adj → かったら | な-adj/N だったら',
    decisions: [
      'Verbo: た-form + ら → 食べた → 食べたら (si/cuando comas)',
      'い-adj: かった + ら → 安かったら (si fuera barato)',
      'な-adj/N: だったら → 元気だったら (si estuvieras bien) / 学生だったら (si fueras estudiante)',
      'Condición futura real: "着いたら連絡して" (cuando llegues, avísame)',
      'Hipótesis: "もし宝くじが当たったら..." (si me tocara la lotería...)',
    ],
    table: [
      ['Tipo', 'Formación', 'Ejemplo'],
      ['Verbo', 'V-た + ら', '行ったら / 来たら'],
      ['い-adj', 'かった + ら', '安かったら / 良かったら'],
      ['な-adj/N', 'だった + ら', '暇だったら / 雨だったら'],
    ],
    mistakes: [
      '"行きたら" ❌ → "行ったら" ✓ — se usa la base た (pasado), no -き.',
      '"食べたらは" ❌ → "食べたら" ✓ — ~たら no lleva は después.',
      'La cláusula principal de ~たら no puede llevar ～ている como intención pasada del hablante.',
    ],
  },

  seo: [
    {
      heading: '~たら: el condicional más usado en japonés A2',
      paragraphs: [
        '~たら es el condicional más frecuente en el japonés hablado. Se forma tomando la forma た del verbo y añadiendo ら: 食べた → 食べたら (si/cuando comas). Puede expresar condición futura real ("電話したら教えて" = cuando llames, avísame), condición hipotética ("もし当たったら..." = si ganara...) y secuencia temporal.',
        'La partícula もし al inicio refuerza el sentido hipotético: "もし日本語が話せたら..." (si pudiera hablar japonés...). Sin もし, たら tiende a leerse como condición más probable o real.',
      ],
    },
    {
      heading: 'たら vs と vs ば: ¿cuándo usar cada uno?',
      paragraphs: [
        '~と expresa condiciones naturales o inevitables (leyes físicas, instrucciones): "右に曲がると、駅があります" (si giras a la derecha, hay una estación). ~ば es más formal y filosófico, frecuente en escritura: "勉強すれば、合格できる" (si estudias, podrás aprobar). ~たら es el más flexible y se usa en más contextos que los otros dos.',
        'La regla práctica: usa たら cuando el resultado es algo que el hablante controla o decide hacer después de la condición. "駅に着いたら、電話して" (cuando llegues a la estación, llama) = típico たら.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'たら: condición futura, hipotética y secuencia temporal.',
    graphicPrompt: 'Flecha de dos eventos: "si A → entonces B".',
    scene: [
      ['家に帰ったら、手を洗ってください。', 'Cuando llegues a casa, lávate las manos.'],
      ['もし時間があったら、映画を見ませんか？', 'Si tuvieras tiempo, ¿vemos una película?'],
      ['安かったら、買います。', 'Si es barato, lo compro.'],
      ['春になったら、桜を見に行きましょう。', 'Cuando llegue la primavera, vamos a ver los cerezos.'],
      ['もし彼女が学生だったら、割引があります。', 'Si ella fuera estudiante, habría descuento.'],
      ['宿題が終わったら、遊んでいいよ。', 'Cuando termines los deberes, puedes jugar.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V-た + ら', 'かったら (い-adj)', 'だったら (な-adj/N)', 'もし + たら (hipótesis)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma correcta de たら',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma たら correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Si/cuando comas (食べる).',
            lines: [['', '食べ___、...']],
            options: ['たら', 'きたら', 'たなら', 'たれば'],
            answer: 'たら',
            explain: '"食べたら" = 食べた (た-form) + ら. La forma más básica.',
          },
          {
            scene: 'Si fuera barato (安い).',
            lines: [['', '安___、買います。']],
            options: ['かったら', 'いたら', 'けたら', 'くたら'],
            answer: 'かったら',
            explain: '"安かったら" = 安い → 安かった (adj. pasado) + ら.',
          },
          {
            scene: 'Cuando llegues (来る).',
            lines: [['', '___、電話して。']],
            options: ['来たら', '来るたら', '来たなら', '来ったら'],
            answer: '来たら',
            explain: '"来たら" = 来る → 来た (ta-form) + ら. 来る es verbo irregular.',
          },
          {
            scene: 'Si fuera estudiante (N: 学生).',
            lines: [['', '学生___、割引があります。']],
            options: ['だったら', 'だたら', 'なたら', 'のたら'],
            answer: 'だったら',
            explain: '"学生だったら" = 学生 + だった (pasado de だ) + ら.',
          },
          {
            scene: 'Cuando llegue la primavera (春になる).',
            lines: [['', '春に___、旅行しましょう。']],
            options: ['なったら', 'なるたら', 'なったなら', 'なりたら'],
            answer: 'なったら',
            explain: '"なったら" = なる → なった + ら. Condición futura real.',
          },
          {
            scene: 'Si el tiempo fuera bueno (天気がいい).',
            lines: [['', '天気が___、外で食べましょう。']],
            options: ['よかったら', 'いいたら', 'いいだったら', 'よいたら'],
            answer: 'よかったら',
            explain: '"よかったら" = いい → よかった (pasado irregular) + ら.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Condición y resultado',
        tag: '2 espacios',
        intro: 'Completa la condición y el resultado con ~たら.',
        type: 'dual',
        items: [
          {
            scene: 'Cuando termines los deberes, puedes ver la tele.',
            lines: [['', '宿題が[[0]]、テレビを[[1]]いいよ。']],
            blanks: [
              { options: ['終わったら', '終わるたら', '終わればたら', '終わるなら'], answer: '終わったら', explain: '"終わったら" = 終わる → 終わった + ら. Condición futura.' },
              { options: ['見ても', '見るたら', '見たら', '見なら'], answer: '見ても', explain: '"見てもいいよ" = puedes ver (permiso con ても).' },
            ],
          },
          {
            scene: 'Si fuera más barato, lo compraría.',
            lines: [['', 'もっと[[0]]、買う[[1]]。']],
            blanks: [
              { options: ['安かったら', '安いたら', '安くたら', '安くなら'], answer: '安かったら', explain: '"安かったら" = si fuera más barato. い-adj pasado + ら.' },
              { options: ['んですが', 'だろう', 'でしょう', 'ます'], answer: 'んですが', explain: '"買うんですが" = es que lo compraría (resultado con んですが = deseo condicionado).' },
            ],
          },
          {
            scene: 'Si tuvieras tiempo libre, ¿qué harías?',
            lines: [['', 'もし暇[[0]]、何を[[1]]？']],
            blanks: [
              { options: ['だったら', 'なたら', 'のたら', 'いたら'], answer: 'だったら', explain: '"暇だったら" = si tuvieras tiempo libre. な-adj + だったら.' },
              { options: ['しますか', 'するたら', 'するなら', 'したら'], answer: 'しますか', explain: '"何をしますか？" = ¿Qué harías? (resultado de la condición).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Planes con condiciones',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma たら correcta.',
        type: 'guidedText',
        scene: '週末の計画を話しています。',
        text: '明日天気が[[0]]、公園に行きたいです。もし雨が[[1]]、家で映画を見ます。友達が[[2]]、一緒に行きましょう。疲れ[[3]]、早く帰ります。',
        blanks: [
          { options: ['よかったら', 'いいたら', 'よいたら', 'よくたら'], answer: 'よかったら', explain: '"天気がよかったら" = si el tiempo fuera bueno. いい → よかった + ら.' },
          { options: ['降ったら', '降るたら', '降ったなら', '降るなら'], answer: '降ったら', explain: '"雨が降ったら" = si lloviera. 降る → 降った + ら.' },
          { options: ['来たら', '来るたら', '来たなら', '来るなら'], answer: '来たら', explain: '"友達が来たら" = cuando venga el amigo. 来る → 来た + ら.' },
          { options: ['たら', 'るたら', 'たなら', 'なら'], answer: 'たら', explain: '"疲れたら" = si me cansara. 疲れる → 疲れた + ら.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma la condición con たら',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma たら del verbo o adjetivo dado.',
        type: 'freeText',
        scene: 'たら形を作ってください。',
        text: '寒い → [[0]] (si hiciera frío) / する → [[1]] (si hicieras) / 学生だ → [[2]] (si fueras estudiante) / もっと練習する → [[3]] (si practicaras más)',
        blanks: [
          { answer: '寒かったら', explain: '"寒かったら" = 寒い → 寒かった + ら.' },
          { answer: 'したら', explain: '"したら" = する → した + ら. するは不規則動詞.' },
          { answer: '学生だったら', explain: '"学生だったら" = 学生 + だった + ら.' },
          { answer: '練習したら', explain: '"練習したら" = 練習する → 練習した + ら.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye oraciones condicionales',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración condicional completa con ~たら.',
        type: 'write',
        items: [
          {
            scene: 'Cuando llegues al aeropuerto, avísame.',
            prompt: '空港に着く → (たら) → 連絡して',
            answer: '空港に着いたら、連絡してください。',
            accepted: ['空港に着いたら、連絡してね。'],
            explain: '"着いたら" = 着く → 着いた + ら. Condición futura real.',
          },
          {
            scene: 'Si tuviera dinero, viajaría a Japón.',
            prompt: 'もし → お金がある → (たら) → 日本に行く',
            answer: 'もしお金があったら、日本に行くんですが。',
            accepted: ['もしお金があったら、日本に旅行したいです。'],
            explain: '"あったら" = ある → あった + ら. Hipótesis con もし.',
          },
          {
            scene: 'Si el examen fuera difícil, estudia más.',
            prompt: '試験が難しい → (たら) → もっと勉強して',
            answer: '試験が難しかったら、もっと勉強してください。',
            accepted: ['難しかったら、先生に聞いてね。'],
            explain: '"難しかったら" = い-adj + かったら. Consejo condicional.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe sobre hipótesis y planes',
        tag: 'Escritura libre',
        intro: 'Escribe sobre planes condicionados con ~たら usando もし para hipótesis.',
        type: 'write',
        items: [
          {
            scene: 'Describe planes para el fin de semana según las condiciones del tiempo.',
            prompt: 'もし天気がよかったら...、もし雨だったら...',
            answer: 'もし天気がよかったら、友達と公園でピクニックをします。もし雨だったら、家で映画を見ます。',
            accepted: ['天気がよかったら、海に行きたいです。雨が降ったら、買い物に行きます。'],
            explain: 'たら para condiciones futuras reales; もし + たら para hipótesis.',
          },
          {
            scene: 'Escribe qué harías si pudieras hablar japonés perfectamente.',
            prompt: 'もし日本語が完璧に話せたら...',
            answer: 'もし日本語が完璧に話せたら、日本で働きたいです。日本人の友達ともっと話せたら、うれしいです。',
            accepted: ['もし日本語がペラペラだったら、日本に引っ越したいです。'],
            explain: '"話せたら" = 話せる → 話せた + ら. たら con verbos de potencial.',
          },
        ],
      },
    ],
  },
}

export default topic
