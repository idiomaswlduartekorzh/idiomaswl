import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'hikaku-a2',
  order: '20',
  color: '#dc2626',
  category: 'Comparación',
  level: 'A2',
  title: 'Comparación en japonés A2: より, ほど, 同じくらい',
  shortTitle: 'Comparación (より/ほど)',
  metaTitle: 'Comparar en japonés A2 — より (más que), ほど～ない (no tanto como), 同じくらい',
  description:
    'En japonés, la comparación usa より (más que), ほど～ない (no tan... como), 同じくらい (igual de), y la pregunta どちらの方が (cuál de los dos más). A diferencia del español, en japonés el estándar de comparación va marcado con より (más que A). No hay formas comparativas especiales de adjetivos — se usa el adjetivo normal con より.',
  lead: '東京は大阪より大きい: cómo comparar en japonés sin formas especiales de adjetivos.',
  outcomes: [
    'Usar AはBより + adj para "A es más... que B"',
    'Usar AはBほど～ない para "A no es tan... como B"',
    'Preguntar "cuál de los dos" con AとBとどちらの方が',
    'Expresar igualdad con 同じくらい',
  ],

  guide: {
    goal: 'Comparar objetos y personas en japonés usando より, ほど y 同じくらい.',
    model: '東京は大阪より大きいです。(Tokio es más grande que Osaka.) / 英語は日本語ほど難しくないです。(El inglés no es tan difícil como el japonés.)',
    formula: 'A は B より + Adj | A は B ほど + Adj neg. | A と B とどちらの方が + Adj ですか',
    decisions: [
      'Más que: "AはBより + adj" → "コーヒーは紅茶より苦い" (el café es más amargo que el té)',
      'No tan... como: "AはBほど + adj neg." → "英語は日本語ほど難しくない" (el inglés no es tan difícil como el japonés)',
      'Preguntar cuál: "AとBとどちらの方が + adj？" → "犬と猫とどちらの方が好きですか？" (¿Te gustan más los perros o los gatos?)',
      'Igualdad: "AはBと同じくらい + adj" → "この本はあの本と同じくらい面白い" (este libro es igual de interesante que ese)',
      'Superlativo: "〜の中で一番 + adj" → "クラスで一番背が高い" (el más alto de la clase)',
    ],
    table: [
      ['Comparación', 'Estructura', 'Ejemplo'],
      ['Superioridad', 'A は B より adj', '東京は大阪より大きい'],
      ['Inferioridad', 'A は B ほど adj neg.', '英語は日本語ほど難しくない'],
      ['Igualdad', 'A は B と同じくらい adj', '兄と同じくらい背が高い'],
    ],
    mistakes: [
      '"東京は大阪よりも大きい" ✓ — よりも (con も) también es posible y frecuente.',
      '"英語は日本語ほど難しいです" ❌ — ほど necesita NEGACIÓN: "難しくないです".',
      '"どちらがもっと？" ❌ → "どちらの方が + adj ですか" ✓ — estructura fija para preguntar.',
    ],
  },

  seo: [
    {
      heading: 'より: el marcador de comparación en japonés',
      paragraphs: [
        'En japonés no hay formas comparativas de adjetivos (no existe "más grande/mayor" como forma especial). En cambio, el estándar se marca con より: "東京は大阪より大きいです" (Tokio es más grande que Osaka). Literalmente: "Tokio, comparado con Osaka, es grande".',
        'より siempre va DESPUÉS del elemento de comparación (B): "B より [adj]". Para preguntar cuál de dos opciones, se usa "A と B とどちらの方が + adj ですか？": "東京と大阪とどちらの方が大きいですか？" (¿Cuál es más grande, Tokio u Osaka?).',
      ],
    },
    {
      heading: 'ほど～ない: "no tan... como"',
      paragraphs: [
        'ほど～ない expresa que A no alcanza el nivel de B: "A は B ほど + adj neg". "この映画はあの映画ほど面白くない" (esta película no es tan interesante como aquella). La regla clave: ほど SIEMPRE lleva negación en el predicado.',
        '"一番 + adj" (el más / el superlativo): "日本で一番高い山は富士山です" (la montaña más alta de Japón es el Fuji). Con grupos: "クラスの中で一番 + adj" = el más/la más de la clase.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'より (más que), ほど～ない (no tan como), 同じくらい (igual de), 一番 (el más).',
    graphicPrompt: 'Balanza comparando dos objetos con より y ほど.',
    scene: [
      ['東京は大阪より大きいです。', 'Tokio es más grande que Osaka.'],
      ['英語は日本語ほど難しくないです。', 'El inglés no es tan difícil como el japonés.'],
      ['犬と猫とどちらの方が好きですか？', '¿Te gustan más los perros o los gatos?'],
      ['私の部屋は妹の部屋と同じくらい広いです。', 'Mi habitación es igual de amplia que la de mi hermana.'],
      ['日本で一番高い山は富士山です。', 'La montaña más alta de Japón es el Fuji.'],
      ['コーヒーの方がお茶より好きです。', 'Prefiero el café al té.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['A は B より adj', 'A は B ほど adj neg.', 'どちらの方が', '一番 + adj'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la comparación correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma de comparación correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Tokio es más grande que Osaka.',
            lines: [['', '東京は大阪___ 大きいです。']],
            options: ['より', 'ほど', 'の方が', 'くらい'],
            answer: 'より',
            explain: '"大阪より大きい" = más grande que Osaka. B + より + adj.',
          },
          {
            scene: 'El inglés no es tan difícil como el japonés.',
            lines: [['', '英語は日本語___ 難しくないです。']],
            options: ['ほど', 'より', 'くらい', 'の方が'],
            answer: 'ほど',
            explain: '"日本語ほど難しくない" = no tan difícil como el japonés. B + ほど + adj neg.',
          },
          {
            scene: '¿Cuál prefieres, el café o el té?',
            lines: [['', 'コーヒーとお茶と___ 好きですか？']],
            options: ['どちらの方が', 'どちらより', 'どちらほど', 'どちらくらい'],
            answer: 'どちらの方が',
            explain: '"どちらの方が" = ¿cuál de los dos más? Estructura fija para elegir entre dos.',
          },
          {
            scene: 'Esta habitación es igual de grande que aquella.',
            lines: [['', 'この部屋はあの部屋___ 広いです。']],
            options: ['と同じくらい', 'より', 'ほど', 'の方が'],
            answer: 'と同じくらい',
            explain: '"あの部屋と同じくらい広い" = igual de amplia que aquella. B + と同じくらい + adj.',
          },
          {
            scene: 'La montaña más alta de Japón.',
            lines: [['', '日本で___ 高い山']],
            options: ['一番', 'より', 'ほど', 'もっと'],
            answer: '一番',
            explain: '"一番高い山" = la montaña más alta. 一番 + adj = superlativo.',
          },
          {
            scene: 'Prefiero el invierno al verano.',
            lines: [['', '夏より冬___ 好きです。']],
            options: ['の方が', 'より', 'ほど', 'くらい'],
            answer: 'の方が',
            explain: '"冬の方が好き" = prefiero el invierno (literalmente: el lado del invierno me gusta más).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Compara dos cosas',
        tag: '2 espacios',
        intro: 'Completa la comparación usando より y ほど.',
        type: 'dual',
        items: [
          {
            scene: 'El japonés es más difícil que el inglés / el inglés no es tan difícil como el japonés.',
            lines: [['', '日本語は英語[[0]]難しいです。/ 英語は日本語[[1]]難しくないです。']],
            blanks: [
              { options: ['より', 'ほど', 'くらい', 'の方が'], answer: 'より', explain: '"英語より難しい" = más difícil que el inglés. B + より + adj.' },
              { options: ['ほど', 'より', 'くらい', 'の方が'], answer: 'ほど', explain: '"日本語ほど難しくない" = no tan difícil como el japonés. B + ほど + neg.' },
            ],
          },
          {
            scene: 'Me gustan más los gatos que los perros / Preguntar cuál prefiere.',
            lines: [['', '猫[[0]]好きです。/ 犬と猫と[[1]]好きですか？']],
            blanks: [
              { options: ['の方が', 'より', 'ほど', 'くらい'], answer: 'の方が', explain: '"猫の方が好き" = me gustan más los gatos. N + の方が + adj.' },
              { options: ['どちらの方が', 'どちらより', 'どちらほど', 'どちらくらい'], answer: 'どちらの方が', explain: '"どちらの方が好きですか？" = ¿cuál te gusta más?' },
            ],
          },
          {
            scene: 'Esta película no es tan larga como aquella / Esta es igual de interesante.',
            lines: [['', 'この映画はあの映画[[0]]長くないです。/ でも[[1]]面白いです。']],
            blanks: [
              { options: ['ほど', 'より', 'くらい', 'の方が'], answer: 'ほど', explain: '"あの映画ほど長くない" = no tan larga como aquella. ほど + neg.' },
              { options: ['同じくらい', 'より', 'ほど', 'の方が'], answer: '同じくらい', explain: '"同じくらい面白い" = igual de interesante.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Comparando ciudades',
        tag: 'Texto guiado',
        intro: 'Completa la comparación de ciudades con より, ほど y 一番.',
        type: 'guidedText',
        scene: '日本の都市を比較しています。',
        text: '東京は大阪[[0]]大きいです。でも大阪は東京[[1]]物価が高くないです。京都は東京[[0]]古い街です。日本で[[2]]有名な山は富士山です。大阪と京都と[[3]]行きたいですか？',
        blanks: [
          { options: ['より', 'ほど', 'くらい', 'の方が'], answer: 'より', explain: '"大阪より大きい" = más grande que Osaka. B + より + adj.' },
          { options: ['ほど', 'より', 'くらい', 'の方が'], answer: 'ほど', explain: '"東京ほど高くない" = no tan caro como Tokio. B + ほど + neg.' },
          { options: ['一番', 'より', 'ほど', 'もっと'], answer: '一番', explain: '"一番有名な山" = la montaña más famosa. 一番 + adj.' },
          { options: ['どちらの方が', 'どちらより', 'どちらほど', 'どちら'], answer: 'どちらの方が', explain: '"どちらの方が行きたいですか？" = ¿a cuál de las dos prefieres ir?' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa la comparación',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma de comparación correcta.',
        type: 'freeText',
        scene: '比較の文を完成させてください。',
        text: '東京は大阪___ 大きい。(más grande que) / バスは電車___ 速くない。(no tan rápido como) / クラスで___ 背が高い。(el más alto) / コーヒー___ お茶___ 好きですか？(¿cuál prefieres?)',
        blanks: [
          { answer: 'より', explain: '"大阪より大きい" = más grande que Osaka.' },
          { answer: 'ほど', explain: '"電車ほど速くない" = no tan rápido como el tren. ほど + neg.' },
          { answer: '一番', explain: '"クラスで一番背が高い" = el más alto de la clase.' },
          { answer: 'とどちらの方が', explain: '"コーヒーとお茶とどちらの方が好きですか？" = ¿cuál prefieres?' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye comparaciones',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración comparativa completa.',
        type: 'write',
        items: [
          {
            scene: 'El verano es más caluroso que la primavera.',
            prompt: '夏 / 春 / 暑い (superioridad)',
            answer: '夏は春より暑いです。',
            accepted: ['夏の方が春より暑いです。'],
            explain: '"春より暑い" = más caluroso que la primavera. B + より + adj.',
          },
          {
            scene: 'El chino no es tan fácil como el inglés.',
            prompt: '中国語 / 英語 / 簡単 (inferioridad)',
            answer: '中国語は英語ほど簡単じゃないです。',
            accepted: ['中国語は英語ほど簡単ではありません。'],
            explain: '"英語ほど簡単じゃない" = no tan fácil como el inglés. B + ほど + neg.',
          },
          {
            scene: '¿Cuál te gusta más, el japonés o el coreano?',
            prompt: '日本語 / 韓国語 / 好き (pregunta)',
            answer: '日本語と韓国語とどちらの方が好きですか？',
            accepted: ['日本語と韓国語、どちらの方が好きですか？'],
            explain: '"どちらの方が好きですか？" = ¿cuál de los dos prefieres? Estructura fija.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Compara libremente',
        tag: 'Escritura libre',
        intro: 'Compara dos cosas usando より, ほど y 一番 con tus propias opiniones.',
        type: 'write',
        items: [
          {
            scene: 'Compara dos idiomas que estudias o conoces.',
            prompt: '勉強している言語を比べてください。',
            answer: '日本語はスペイン語より難しいと思います。でも、スペイン語は日本語ほど漢字が多くないので、読むのが簡単です。私は日本語の方が好きです。',
            accepted: ['英語は日本語ほど文法が複雑じゃないと思います。でも日本語の方が面白いです。'],
            explain: 'より (superioridad), ほど + neg. (inferioridad), の方が (preferencia).',
          },
          {
            scene: 'Compara dos lugares que conoces bien.',
            prompt: '知っている2つの場所を比べてください。',
            answer: '東京は私の町より大きくて、人が多いです。でも私の町は東京ほど物価が高くないです。住むなら私の町の方が好きです。',
            accepted: ['ソウルは東京と同じくらい大きいと思います。でも東京の方が交通が便利かもしれません。'],
            explain: 'Combina より, ほど～ない y の方が para una comparación completa.',
          },
        ],
      },
    ],
  },
}

export default topic
