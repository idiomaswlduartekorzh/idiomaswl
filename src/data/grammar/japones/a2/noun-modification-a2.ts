import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'noun-modification-a2',
  order: '15',
  color: '#dc2626',
  category: 'Sintaxis',
  level: 'A2',
  title: 'Modificación nominal en japonés A2: adjetivos y relativas antes del nombre',
  shortTitle: 'Modificación nominal',
  metaTitle: 'Modificación nominal japonés A2 — い/な adjetivos y oraciones relativas antes del sustantivo',
  description:
    'En japonés, todos los modificadores van ANTES del sustantivo: adjetivos い/な, y oraciones enteras (equivalentes a cláusulas relativas). No hay pronombres relativos como "que" en español — la oración modificadora simplemente precede al sustantivo en forma de diccionario/た/ない. Este principio es fundamental para construir oraciones complejas en japonés.',
  lead: '昨日食べた寿司: cómo poner toda una oración antes del sustantivo en japonés.',
  outcomes: [
    'Colocar adjetivos い/な antes del sustantivo correctamente',
    'Usar verbos en forma dic./た/ない como modificadores del sustantivo',
    'Construir frases como "el libro que leí" o "la persona que trabaja aquí"',
    'Distinguir い-adj (directo) de な-adj (+ な) ante sustantivo',
  ],

  guide: {
    goal: 'Modificar sustantivos con adjetivos y cláusulas relativas en japonés.',
    model: '昨日読んだ本 (el libro que leí ayer) / 日本語を話せる人 (la persona que puede hablar japonés)',
    formula: 'い-adj / な-adj + な / V (dic./た/ない) + N',
    decisions: [
      'い-adj directo: 高い本 (libro caro), 古い車 (coche viejo)',
      'な-adj + な: 有名な人 (persona famosa), 静かな場所 (lugar tranquilo)',
      'V dic. + N (presente/futuro): "話す人" (persona que habla), "住んでいる町" (ciudad donde vivo)',
      'V た + N (pasado): "読んだ本" (libro que leí), "会った人" (persona que conocí)',
      'V ない + N (negativo): "食べない食べ物" (comida que no como), "来ない人" (persona que no viene)',
    ],
    table: [
      ['Modificador', 'Estructura', 'Ejemplo'],
      ['い-adj', 'い-adj + N', '高い本 / 大きい犬'],
      ['な-adj', 'な-adj + な + N', '静かな部屋 / 好きな食べ物'],
      ['Verbo (rel.)', 'V dic./た/ない + N', '読む本 / 読んだ本 / 読まない本'],
    ],
    mistakes: [
      '"有名の人" ❌ → "有名な人" ✓ — な-adj necesita な, no の, antes del sustantivo.',
      '"読む本が" (relativa incorrecta) — la relativa en japonés no tiene pronombre relativo; solo V + N.',
      '"食べたい本" ❌ → "読みたい本" ✓ — cuidado con el verbo que corresponde a la acción.',
    ],
  },

  seo: [
    {
      heading: '¿Por qué en japonés todo lo que describe va antes del sustantivo?',
      paragraphs: [
        'En japonés no existen pronombres relativos como "que", "quien" o "donde". En cambio, toda la información modificadora se coloca ANTES del sustantivo. "El libro que compré ayer" en japonés es "昨日買った本" (literalmente: ayer-compré-libro). La oración modificadora funciona como un gran adjetivo prenominal.',
        'Los verbos en la cláusula modificadora toman su forma de diccionario (presente/futuro), forma た (pasado), o forma ない (negativo). No hay que marcar el sujeto de la relativa con が — sigue siendo が, pero la partícula が a veces se puede sustituir por の dentro de la relativa: "私が読んだ本" = "私の読んだ本" (el libro que yo leí).',
      ],
    },
    {
      heading: '¿Cómo modifican al sustantivo los adjetivos い y な?',
      paragraphs: [
        'Los adjetivos い (formas en -い) van directamente antes del sustantivo: 大きい家 (casa grande), 古い車 (coche viejo). Los adjetivos な (una categoría diferente que incluye 静か、有名、好き、大切) necesitan な entre el adjetivo y el sustantivo: 静かな部屋 (habitación tranquila), 有名な歌手 (cantante famoso).',
        'Un error muy común de estudiantes de español es poner の en lugar de な con adjetivos な: "有名の人" ❌. La regla es simple: si pertenece a la clase な-adj, siempre llevas な antes del sustantivo.',
      ],
    },
    {
      heading: '¿Cómo se pone una frase entera delante de un sustantivo?',
      paragraphs: [
        'En japonés cualquier modificador —una palabra o una frase completa— va SIEMPRE delante del sustantivo, sin pronombre relativo como "que". Donde el español dice "la persona que come pan", el japonés dice literalmente "pan-come persona": パンを食べる人. El verbo de la frase modificadora va en forma PLANA: 私が撮った写真 (la foto que yo tomé), 昨日買った本 (el libro que compré ayer). Un detalle clave: dentro de esa cláusula, el sujeto suele marcarse con が (o の), no con は: 母が作った料理 (la comida que hizo mi madre). La trampa para el hispanohablante es el orden invertido y la ausencia de "que": hay que colocar toda la descripción antes del sustantivo y recordar que el verbo interno va en forma plana.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Todo el modificador va ANTES del sustantivo: adj y relativas prenominales.',
    graphicPrompt: 'Flecha apuntando hacia la izquierda antes de un sustantivo.',
    scene: [
      ['昨日食べたラーメンは美味しかった。', 'El ramen que comí ayer estaba rico.'],
      ['日本語を話せる友達がいます。', 'Tengo un amigo que puede hablar japonés.'],
      ['静かな図書館で勉強します。', 'Estudio en una biblioteca tranquila.'],
      ['これは私が読まない本です。', 'Este es un libro que no leo.'],
      ['有名な先生に会いました。', 'Conocí a un profesor famoso.'],
      ['昨日会った人は田中さんです。', 'La persona que conocí ayer es el Sr. Tanaka.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['い-adj + N', 'な-adj + な + N', 'V dic./た/ない + N (relativa)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el modificador correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta del modificador antes del sustantivo.',
        type: 'choice',
        items: [
          {
            scene: 'Persona famosa (有名 = na-adj).',
            lines: [['', '___ 人に会った。']],
            options: ['有名な', '有名の', '有名い', '有名'],
            answer: '有名な',
            explain: '"有名な人" = persona famosa. な-adj + な + N.',
          },
          {
            scene: 'Libro que leí (読む → ta-form).',
            lines: [['', '___ 本を返します。']],
            options: ['読んだ', '読む', '読んでいる', '読もう'],
            answer: '読んだ',
            explain: '"読んだ本" = libro que leí. V-た + N (pasado relativo).',
          },
          {
            scene: 'Restaurante caro (高い = i-adj).',
            lines: [['', '___ レストランに行きたくない。']],
            options: ['高い', '高な', '高の', '高く'],
            answer: '高い',
            explain: '"高いレストラン" = restaurante caro. い-adj directo + N.',
          },
          {
            scene: 'Comida que no como (食べる → negativa).',
            lines: [['', '___ 食べ物は何ですか？']],
            options: ['食べない', '食べた', '食べる', '食べて'],
            answer: '食べない',
            explain: '"食べない食べ物" = comida que no como. V ない + N (relativa negativa).',
          },
          {
            scene: 'Ciudad tranquila (静か = na-adj).',
            lines: [['', '___ 町に住みたい。']],
            options: ['静かな', '静かの', '静かい', '静か'],
            answer: '静かな',
            explain: '"静かな町" = ciudad tranquila. な-adj + な + N.',
          },
          {
            scene: 'Persona que trabaja aquí (働く = diccionario).',
            lines: [['', 'ここで___ 人は田中さんです。']],
            options: ['働いている', '働いた', '働く', '働いて'],
            answer: '働いている',
            explain: '"働いている人" = persona que trabaja (ahora/habitualmente). V-ている + N.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Construye la frase nominal',
        tag: '2 espacios',
        intro: 'Completa las frases con el modificador y el sustantivo correctos.',
        type: 'dual',
        items: [
          {
            scene: 'El libro interesante que compré ayer.',
            lines: [['', '昨日[[0]][[1]]は面白かった。']],
            blanks: [
              { options: ['買った', '買う', '買っている', '買おう'], answer: '買った', explain: '"昨日買った" = que compré ayer. V-た (pasado).' },
              { options: ['本', '人', '映画', '店'], answer: '本', explain: '"買った本" = libro que compré.' },
            ],
          },
          {
            scene: 'La persona famosa que estudia japonés.',
            lines: [['', '日本語を勉強している[[0]][[1]]は誰ですか？']],
            blanks: [
              { options: ['有名な', '有名の', '有名', '有名い'], answer: '有名な', explain: '"有名な" = famoso/a. な-adj + な.' },
              { options: ['人', '本', '店', '場所'], answer: '人', explain: '"有名な人" = persona famosa.' },
            ],
          },
          {
            scene: 'La comida que no me gusta.',
            lines: [['', '私が[[0]][[1]]は野菜です。']],
            blanks: [
              { options: ['好きじゃない', '好きな', '好きだった', '好き'], answer: '好きじゃない', explain: '"好きじゃない" = que no me gusta. Negativa de な-adj como predicado.' },
              { options: ['食べ物', '人', '本', '店'], answer: '食べ物', explain: '"好きじゃない食べ物" = comida que no me gusta.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Describir con modificadores',
        tag: 'Texto guiado',
        intro: 'Completa la descripción usando modificadores nominales.',
        type: 'guidedText',
        scene: '好きなものについて話しています。',
        text: '私は[[0]]映画が好きです。先週見た[[1]]は面白かった。好き[[2]]食べ物はラーメンです。昨日食べ[[3]]ラーメンはとても美味しかった。[[4]]な人と一緒に食べると、もっと美味しいです。',
        blanks: [
          { options: ['怖い', '怖な', '怖の', '怖く'], answer: '怖い', explain: '"怖い映画" = película de miedo. い-adj + N.' },
          { options: ['映画', '人', '本', '店'], answer: '映画', explain: '"見た映画" = película que vi.' },
          { options: ['な', 'の', 'い', 'を'], answer: 'な', explain: '"好きな食べ物" = comida favorita. 好き = な-adj + な.' },
          { options: ['た', 'る', 'て', 'ない'], answer: 'た', explain: '"食べたラーメン" = el ramen que comí. V-た + N.' },
          { options: ['好き', '好きな', '好きの', '好きい'], answer: '好き', explain: '"好きな人" = persona que me gusta. Aquí el context implica な.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Combina modificador y sustantivo',
        tag: 'Texto libre',
        intro: 'Sin opciones: crea la frase con el modificador correcto.',
        type: 'freeText',
        scene: '修飾語と名詞を組み合わせてください。',
        text: '大切 + 友達 → [[0]] 友達 (na-adj) / 昨日会う → [[1]] 人 (ta-form) / 日本語を話す → [[2]] 人 (diccionario) / おいしい + 料理 → [[3]] 料理 (i-adj)',
        blanks: [
          { answer: '大切な', explain: '"大切な友達" = amigo importante. な-adj + な.' },
          { answer: '昨日会った', explain: '"昨日会った人" = persona que conocí ayer. V-た.' },
          { answer: '日本語を話す', explain: '"日本語を話す人" = persona que habla japonés. V dic. (presente/habitual).' },
          { answer: 'おいしい', explain: '"おいしい料理" = comida deliciosa. い-adj directo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe con cláusulas relativas',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase completa con un modificador nominal.',
        type: 'write',
        items: [
          {
            scene: 'El libro que leí la semana pasada era interesante.',
            prompt: '先週読む + 本 + 面白い',
            answer: '先週読んだ本は面白かった。',
            accepted: ['先週読んだ本はとても面白かったです。'],
            explain: '"読んだ本" = libro que leí. V-た + N como sujeto de oración.',
          },
          {
            scene: 'Tengo un amigo que puede hablar japonés.',
            prompt: '日本語を話せる + 友達 + いる',
            answer: '日本語を話せる友達がいます。',
            accepted: ['日本語が話せる友達がいます。'],
            explain: '"話せる友達" = amigo que puede hablar. V potencial + N.',
          },
          {
            scene: 'La habitación tranquila donde estudio.',
            prompt: '静か + 部屋 + 勉強する',
            answer: '静かな部屋で勉強します。',
            accepted: ['静かな部屋が好きです。'],
            explain: '"静かな部屋" = habitación tranquila. な-adj + な + N.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe personas y cosas con modificadores',
        tag: 'Escritura libre',
        intro: 'Describe a una persona o cosa importante usando varios modificadores nominales.',
        type: 'write',
        items: [
          {
            scene: 'Describe a tu persona favorita usando modificadores.',
            prompt: '好きな人/有名な人について修飾語を使って書いてください。',
            answer: '私が尊敬している有名な歌手がいます。昨日見たコンサートはとても感動的でした。彼女が歌う曲は全部好きです。',
            accepted: ['私が好きな俳優は背が高い人です。彼が出た映画は全部見ました。'],
            explain: 'Combina い-adj, な-adj y V-た/V dic. como modificadores del mismo sustantivo.',
          },
          {
            scene: 'Describe tu lugar favorito usando modificadores.',
            prompt: '好きな場所を修飾語を使って描写してください。',
            answer: '私が好きな場所は静かな図書館です。本がたくさんある大きな部屋です。昨日借りた本はとても面白かった。',
            accepted: ['私がよく行く公園は緑が多い広い場所です。春に咲く花がきれいです。'],
            explain: 'Usa V-た, V-dic./ている y な-adj + な para construir descripciones ricas.',
          },
        ],
      },
    ],
  },
}

export default topic
