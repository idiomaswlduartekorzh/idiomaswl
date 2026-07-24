import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'dake-shika-bakari-a2',
  order: '16',
  color: '#dc2626',
  category: 'Partículas',
  level: 'A2',
  title: 'だけ/しか～ない/ばかり en japonés A2: solo, nada más, exclusividad',
  shortTitle: 'だけ/しか/ばかり',
  metaTitle: 'だけ/しか/ばかり japonés A2 — solo, únicamente, nada más que',
  description:
    'だけ (solo/únicamente), しか～ない (solo... y nada más, con negación obligatoria) y ばかり (solo/nada más que, a menudo con matiz de exceso) son tres formas de expresar exclusividad en japonés. Son parecidos pero tienen matices distintos: だけ es neutral, しか～ない implica escasez o insuficiencia, ばかり implica que algo es excesivo o lo único.',
  lead: '水しか飲んでいません: tres formas de decir "solo" con matices distintos.',
  outcomes: [
    'Usar だけ para expresar "solo" de forma neutral',
    'Usar しか + negación para expresar "solo... y ya / insuficiencia"',
    'Usar ばかり para "no hace más que / siempre lo mismo"',
    'Distinguir los tres en contexto',
  ],

  guide: {
    goal: 'Usar だけ, しか～ない y ばかり para expresar exclusividad con matices distintos.',
    model: '水だけ飲みます。(Solo bebo agua.) / 水しか飲みません。(No bebo más que agua.) / 水ばかり飲んでいます。(No hago más que beber agua.)',
    formula: 'N + だけ (+ V) | N + しか + V neg. | N + ばかり (+ V)',
    decisions: [
      'だけ: neutral — "一つだけください" (dame solo uno)',
      'しか～ない: con negación obligatoria, implica escasez — "百円しかない" (solo tengo 100 yenes — es poco)',
      'ばかり: implica exceso o que algo domina — "肉ばかり食べる" (no hace más que comer carne)',
      'ばかり con V-て: "テレビを見てばかりいる" (no hace más que ver la tele)',
      'V-た + ばかり: acción recién ocurrida — "食べたばかり" (acabo de comer)',
    ],
    table: [
      ['Partícula', 'Construcción', 'Matiz'],
      ['だけ', 'N + だけ + V', 'Solo/únicamente (neutral)'],
      ['しか～ない', 'N + しか + V neg.', 'Solo (y es poco/insuficiente)'],
      ['ばかり', 'N/V-て + ばかり', 'No hace más que / exceso'],
    ],
    mistakes: [
      '"水しか飲みます" ❌ → "水しか飲みません" ✓ — しか SIEMPRE requiere negación del verbo.',
      '"水だけ飲みません" — posible pero inusual; だけ normalmente con afirmativo.',
      '"食べてばかり" ❌ → "食べてばかりいる" ✓ — ばかり con て-form necesita いる.',
    ],
  },

  seo: [
    {
      heading: 'だけ vs しか: dos formas de decir "solo" en japonés',
      paragraphs: [
        '水だけ飲みます y 水しか飲みません significan ambas "solo bebo agua", pero tienen matices distintos. だけ es neutral: "solo agua" sin ningún juicio. しか～ない implica que eso es todo lo que hay y que es insuficiente o restrictivo: "no bebo (nada) más que agua".',
        'La regla de oro de しか: SIEMPRE va seguido de un verbo en negativo. No se puede decir "しか飲みます" — el verbo debe estar en forma negativa: "しか飲みません", "しか食べない", "しかわからない".',
      ],
    },
    {
      heading: 'ばかり: el exceso y "acabo de"',
      paragraphs: [
        'ばかり tiene dos usos principales en A2. El primero es indicar que alguien hace lo mismo constantemente o en exceso: "ゲームばかりしている" (no hace más que jugar videojuegos). El segundo uso es con la forma た del verbo para indicar que algo acaba de ocurrir: "食べたばかりです" (acabo de comer), "着いたばかりです" (acabo de llegar).',
        'Este segundo uso (V-た + ばかり) es muy frecuente en japonés cotidiano y equivale al español "acabar de + infinitivo".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'だけ (neutral) / しか～ない (insuficiencia) / ばかり (exceso/reciente).',
    graphicPrompt: 'Tres vasos de agua: uno normal (だけ), uno casi vacío (しか), uno lleno en exceso (ばかり).',
    scene: [
      ['一つだけください。', 'Dame solo uno.'],
      ['百円しかありません。', 'Solo tengo 100 yenes (es poco).'],
      ['勉強してばかりいます。', 'No hago más que estudiar.'],
      ['日本語だけ話します。', 'Solo hablo japonés.'],
      ['日本語しか話せません。', 'No puedo hablar más que japonés.'],
      ['来たばかりです。', 'Acabo de llegar.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['N + だけ', 'N + しか + neg.', 'V-て + ばかりいる', 'V-た + ばかり (acabo de)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige だけ, しか o ばかり',
        tag: 'Opción múltiple',
        intro: 'Selecciona la partícula de exclusividad correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Solo como verduras (neutral).',
            lines: [['', '野菜___ 食べます。']],
            options: ['だけ', 'しか', 'ばかり', 'まで'],
            answer: 'だけ',
            explain: '"野菜だけ食べます" = solo como verduras (neutral, sin matiz de escasez).',
          },
          {
            scene: 'No tengo más que 500 yenes (escasez).',
            lines: [['', '500円___ ありません。']],
            options: ['しか', 'だけ', 'ばかり', 'まで'],
            answer: 'しか',
            explain: '"500円しかありません" = solo tengo 500 yenes (implica que es poco). しか + negación.',
          },
          {
            scene: 'No hace más que jugar (exceso).',
            lines: [['', '遊んで___ います。']],
            options: ['ばかり', 'だけ', 'しか', 'まで'],
            answer: 'ばかり',
            explain: '"遊んでばかりいます" = no hace más que jugar. V-て + ばかりいる (exceso).',
          },
          {
            scene: 'Acabo de llegar.',
            lines: [['', '着い___ です。']],
            options: ['たばかり', 'てばかり', 'だけ', 'しか'],
            answer: 'たばかり',
            explain: '"着いたばかりです" = acabo de llegar. V-た + ばかり = hace poco.',
          },
          {
            scene: 'Solo quiero uno (petición neutral).',
            lines: [['', '一つ___ ほしいです。']],
            options: ['だけ', 'しか', 'ばかり', 'も'],
            answer: 'だけ',
            explain: '"一つだけほしいです" = solo quiero uno. だけ neutral con deseo.',
          },
          {
            scene: 'No puedo hablar más que inglés.',
            lines: [['', '英語___ 話せません。']],
            options: ['しか', 'だけ', 'ばかり', 'も'],
            answer: 'しか',
            explain: '"英語しか話せません" = no puedo hablar más que inglés. しか + negativo = limitación.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'だけ y しか: contraste',
        tag: '2 espacios',
        intro: 'Completa con だけ (neutral) y しか (escasez con negativo).',
        type: 'dual',
        items: [
          {
            scene: 'Solo como sushi (neutral) / Solo puedo comer sushi (con limitación).',
            lines: [['', '寿司[[0]]食べます。 / 寿司[[1]]食べられません。']],
            blanks: [
              { options: ['だけ', 'しか', 'ばかり', 'も'], answer: 'だけ', explain: '"寿司だけ食べます" = solo como sushi (neutral, no hay matiz negativo).' },
              { options: ['しか', 'だけ', 'ばかり', 'も'], answer: 'しか', explain: '"寿司しか食べられません" = no puedo comer más que sushi (limitación + negación).' },
            ],
          },
          {
            scene: 'Acabo de comer y no hace más que comer.',
            lines: [['', '食べ[[0]]です。 / 食べて[[1]]います。']],
            blanks: [
              { options: ['たばかり', 'てばかり', 'だけ', 'しか'], answer: 'たばかり', explain: '"食べたばかりです" = acabo de comer. V-た + ばかり.' },
              { options: ['ばかり', 'だけ', 'しか', 'たばかり'], answer: 'ばかり', explain: '"食べてばかりいます" = no hace más que comer. V-て + ばかり.' },
            ],
          },
          {
            scene: 'Solo una persona vino / No vino más que una persona.',
            lines: [['', '一人[[0]]来ました。 / 一人[[1]]来ませんでした (nadie más)。']],
            blanks: [
              { options: ['だけ', 'しか', 'ばかり', 'まで'], answer: 'だけ', explain: '"一人だけ来ました" = solo vino una persona (neutral).' },
              { options: ['しか', 'だけ', 'ばかり', 'まで'], answer: 'しか', explain: '"一人しか来ませんでした" = no vino más que una persona (decepción).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Diálogo con exclusividad',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo con だけ, しか o ばかり.',
        type: 'guidedText',
        scene: '友達と話しています。',
        text: 'A: 最近、ゲームして[[0]]いるね。B: そうかな？でも、一日1時間[[1]]やっていないよ。A: それ[[2]]？じゃあ、少ないね。B: 昨日日本語を勉強し[[3]]。A: えっ、日本語[[4]]勉強しているの？',
        blanks: [
          { options: ['ばかり', 'だけ', 'しか', 'まで'], answer: 'ばかり', explain: '"ゲームしてばかりいる" = no hace más que jugar videojuegos (exceso percibido).' },
          { options: ['しか', 'だけ', 'ばかり', 'まで'], answer: 'しか', explain: '"1時間しかやっていない" = solo juego una hora (y es poco). しか + negativo.' },
          { options: ['たばかり', 'てばかり', 'だけ', 'しか'], answer: 'たばかり', explain: '"勉強したばかり" = acabo de estudiar. V-た + ばかり = hace poco.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con la partícula correcta',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe だけ, しか o ばかり según el contexto.',
        type: 'freeText',
        scene: '空欄に正しい語を入れてください。',
        text: '時間が10分[[0]] ありません。(insuficiencia) / コーヒー[[1]] 飲みます。(neutral) / 休んで[[2]] います。(exceso) / 日本に来た[[3]]です。(acabo de)',
        blanks: [
          { answer: 'しか', explain: '"10分しかありません" = solo tengo 10 minutos (es poco). しか + negación.' },
          { answer: 'だけ', explain: '"コーヒーだけ飲みます" = solo bebo café (neutral).' },
          { answer: 'ばかり', explain: '"休んでばかりいます" = no hace más que descansar. V-て + ばかり.' },
          { answer: 'たばかり', explain: '"来たばかりです" = acabo de llegar. V-た + ばかり.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye oraciones de exclusividad',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con だけ, しか o ばかり.',
        type: 'write',
        items: [
          {
            scene: 'Solo tengo 200 yenes (limitación con escasez).',
            prompt: '200円 + ある (solo y es poco)',
            answer: '200円しかありません。',
            accepted: ['200円しかないです。'],
            explain: '"200円しかありません" = no tengo más que 200 yenes. しか + negativo.',
          },
          {
            scene: 'Acabo de llegar a Japón.',
            prompt: '日本に来る + (acabo de)',
            answer: '日本に来たばかりです。',
            accepted: ['日本に来たばかりなんです。'],
            explain: '"来たばかりです" = acabo de llegar. V-た + ばかり.',
          },
          {
            scene: 'Quiero solo una taza de café (neutral).',
            prompt: 'コーヒー + 一杯 + ほしい (neutral)',
            answer: 'コーヒーを一杯だけほしいです。',
            accepted: ['コーヒーだけ一杯ください。'],
            explain: '"一杯だけ" = solo una taza. だけ = exclusividad neutral.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe limitaciones y excesos',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones sobre tus limitaciones o hábitos excesivos usando だけ/しか/ばかり.',
        type: 'write',
        items: [
          {
            scene: 'Describe qué idiomas puedes hablar y qué limitaciones tienes.',
            prompt: 'しかとだけを使って言語の能力について書いてください。',
            answer: '日本語しか話せません。英語はほんの少しだけわかります。中国語は全然わかりません。',
            accepted: ['英語しか話せませんが、日本語も少しだけ勉強しています。'],
            explain: 'しか (limitación) vs だけ (exclusividad neutral) en el mismo contexto.',
          },
          {
            scene: 'Describe un hábito excesivo tuyo usando ばかり.',
            prompt: 'ばかりを使って自分の習慣について書いてください。',
            answer: '最近、コーヒーばかり飲んでいます。仕事のことばかり考えています。休んでばかりいたら、体が動かなくなりました。',
            accepted: ['スマホばかり見ています。SNSばかり使っています。'],
            explain: '"V-てばかりいる" = no hacer más que esa acción (exceso/hábito dominante).',
          },
        ],
      },
    ],
  },
}

export default topic
