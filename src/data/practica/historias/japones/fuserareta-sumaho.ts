// ─── 伏せられたスマホ — Historia B1 en japonés ─────────────────────────────────
// Adaptación de «The Locked Phone» al japonés. Nivel B1.
//
// ESPACIOS A PROPÓSITO: el japonés no se escribe con espacios, pero el motor
// separa las palabras por espacio para que el clic-para-traducir funcione. Se usa
// la separación por 文節 que llevan los materiales para estudiantes: se lee bien y
// hace el texto clicable. Las claves del diccionario son el trozo exacto que
// queda entre espacios, sin puntuación.
//
// Narrador en 常体 (だ・た), notas de voz en japonés hablado informal, que es como
// se manda un audio a un amigo.
//
// AUDIO PENDIENTE: /audio/historias/japones/fuserareta-sumaho/{a,b}.mp3
// a con voz de mujer (ミサキ), b con voz de hombre (リョウ).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  スマホ: 'smartphone / celular',
  スマホが: 'el celular (sujeto)',
  スマホを: 'el celular (complemento)',
  画面: 'pantalla',
  画面が: 'la pantalla (sujeto)',
  画面を: 'la pantalla (complemento)',
  通知: 'notificación',
  通知が: 'la notificación (sujeto)',
  メッセージ: 'mensaje',
  メッセージを: 'los mensajes (complemento)',
  光った: 'se iluminó / se encendió',
  光ると: 'cuando se enciende',
  伏せた: 'lo puso boca abajo',
  伏せる: 'poner boca abajo',
  伏せられた: 'puesto boca abajo',
  テーブル: 'mesa',
  テーブルの: 'de la mesa',
  夕食: 'cena',
  夕食中: 'durante la cena',
  台所: 'cocina',
  ソファ: 'sofá',
  写真: 'foto / fotos',
  犬: 'perro',
  位置情報: 'ubicación / geolocalización',
  仕事: 'trabajo',
  金曜日: 'viernes',
  土曜日: 'sábado',
  春: 'primavera',
  一緒に: 'juntos / juntas',
  気づいた: 'se dio cuenta',
  冗談: 'broma',
  半分: 'la mitad / a medias',
  聞いた: 'preguntó / escuchó',
  断った: 'se negó / rechazó',
  断る: 'negarse',
  渡す: 'entregar en mano',
  渡さない: 'no entregar',
  代わりに: 'en lugar de eso',
  答える: 'responder',
  答え: 'respuesta',
  прайваси: 'privacidad',
  プライバシー: 'privacidad',
  信用: 'confianza',
  信じろ: 'confía (imperativo brusco)',
  疑い: 'sospecha',
  疑わしい: 'sospechoso',
  証拠: 'prueba / evidencia',
  証明: 'demostración',
  隠す: 'esconder',
  隠して: 'escondiendo',
  嫉妬: 'celos',
  傷つい: 'resultar herido emocionalmente',
  安心: 'tranquilidad / alivio',
  彼女: 'ella / novia',
  彼氏: 'él / novio',
  元彼: 'exnovio',
  正直: 'sinceramente / honestamente',
  本当に: 'de verdad / realmente',
  急に: 'de repente',
  誰も: 'nadie',
  習慣: 'costumbre / hábito',
  テスト: 'prueba / test',
  ルール: 'regla',
  普通: 'normal / lo habitual',
  真実: 'verdad',
  嘘つき: 'mentiroso',
  演説: 'discurso',
  謝る: 'disculparse',
  謝らない: 'no voy a disculparme',
  線: 'línea / límite',
  越えた: 'cruzó / traspasó',
  調べられ: 'ser investigado',
  無理: 'imposible / no puede ser',
  結局: 'al final',
};

const NARRATOR_PARAGRAPHS = [
  'ミサキ と リョウ は 付き合って 二年 に なる。 去年 の 春 から 一緒に 住んで いる。',
  '金曜日 の 夕食中、 リョウ の スマホが テーブルの 上 で 光った。 リョウ は 何も 言わず に スマホを 伏せた。',
  'ミサキ は それ に 気づいた。 その 場 で は 何も 言わなかった。',
  'その 夜 遅く、 ミサキ は 半分 冗談 の ように、 スマホを 見て も いい か と 聞いた。',
  'リョウ は だめ だ と 答えた。',
  '怒って は いなかった。 スマホ は プライバシー だ から、 誰 に も 渡さない と 説明した。',
  '代わりに、 どんな 質問 に で も 答える と 言った。',
  'ミサキ は、 断る こと 自体 が 一つ の 答え だ と 言った。',
  'その 夜 二人 と も よく 眠れず、 土曜日 の 朝 に は それぞれ 別 の 人 に この 話 を して いた。',
];

const A_PARAGRAPHS = [
  'ちょっと 一回 声 に 出して 言わせて。 じゃない と 私 が おかしく なる。',
  'リョウ が スマホを どこ に で も 置く の、 知って る でしょ。 ソファ に も 台所 に も、 画面 を 上 に した まま。 今 まで 一度 も 問題 に なった こと ない の。',
  'なのに 金曜日、 夕食中 に スマホが 光った 瞬間、 それ を 伏せた の。',
  '画面 を 下 に。',
  '私 の 方 を 見 も しない で。',
  '私 は 一時間、 何 も なかった みたいな 顔 で 座って た。',
  'それ で あと で、 半分 冗談 みたい に 言った の。 「スマホ ちょっと 見せて」。',
  'そしたら 「だめ」 だって。',
  '「いい よ、 はい」 でも なく、 「なんで?」 でも なく、 ただ だめ。',
  '二年 一緒に いて、 答え が だめ?',
  'そこ から プライバシー の 話、 主義 の 話、 線 の 話 が 始まる の。',
  '線 ね。 はいはい。',
  '私 は メッセージを 読む つもり なんて なかった。 渡す ところ が 見たかった だけ。 それ が テスト だった の。',
  '隠す こと が ない なら、 なんで 見せる の が そんなに 大変 な の?',
  'しかも 説明 すれば する ほど 変 に 聞こえた。',
  '前 から 考えて ない 人 は、 プライバシー に ついて 演説 なんて 用意 しない。',
  'ずっと 言って た。 「何 でも 聞いて。 本当の こと を 言う から」。',
  'いいね。 確認 させて くれない 人 を 信用 しろ、 って こと。',
  'それ で 今 は、 私 の 方 が 悪い みたい な 態度 な の。',
  '私 が 「線 を 越えた」 らしい。',
  '私 が 線 を 越えた。',
  '正直、 普通に 渡して くれて たら、 たぶん 開き も しなかった と 思う。',
  'そこ が 一番 きつい。',
];

const B_PARAGRAPHS = [
  'これ、 どう 話して も 俺 が 悪者 に 聞こえる 気 が する んだけど。',
  '金曜日 の 夜。 夕食中。 スマホが 光った から 伏せた。',
  '俺 は ご飯 の とき、 いつも スマホを 伏せる。 十九 の とき から ずっと そう。',
  'それ が 今 は 証拠 らしい。',
  'あと で ミサキ に スマホを 見せて と 言われた。',
  'いや、 あの スマホ に は 何 も ない。 本当に 何 も。',
  '仕事 の グループ、 母親、 サッカー の 結果、 犬 の 写真 四十枚。',
  'でも そこ が 問題 じゃ ない。',
  '問題 は、 嘘つき じゃ ない と 証明 する ため に スマホを 渡さない、 って こと。',
  '一回 やったら、 それ が 普通 に なる でしょ。',
  '今月 は スマホ。 来月 は 位置情報。 その 次 は 誰 と 昼 を 食べた か。',
  '言った よ。 何 でも 聞いて、 本当に 何 でも、 答える から。',
  'でも ミサキ は 答え が ほしかった わけ じゃ ない。 スマホが ほしかった。',
  '分かる よ。 前 に 傷つい た の も 知って る し、 元彼 が 本当に ひどかった の も 知って る。',
  'でも 俺 は あいつ じゃ ない。',
  '他 の 人 が した こと で、 俺 が 調べられ て いる。',
  'それ で 今 は、 だめ と 言った から 俺 が 疑わしい 側 に なって いる。',
  'そこ が どうしても 飲み込め ない。',
  'だめ と 言う こと が 罪 に なる なら、 正しい 答え なんて 最初 から ない。',
  'まあ、 あの 場 の 言い方 は もっと うまく できた かも しれない。 かも しれない けど。',
  '線 が ある こと 自体 に ついて は、 謝らない。',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: '「スマホが テーブルの 上 で 光った」 は どういう 意味 です か。',
    opts: [
      'スマホ が 燃えた',
      '通知 が 来て 画面 が ひとりでに ついた',
      'リョウ が スマホ を 手 に 取って ロック を 解除 した',
      'その 日 は 画面 の 明るさ が 高かった',
    ],
    correct: 1,
    explanation:
      '「光る」 es intransitivo: la pantalla se enciende sola, normalmente porque acaba de llegar una notificación. Ese es el detonante de toda la historia.',
  },
  {
    type: 'Inferencia',
    q: 'ミサキ は 「半分 冗談 の ように」 聞きました。 この 言い方 は 何 を 示して います か。',
    opts: [
      'ミサキ は スマホ に 全く 興味 が なかった',
      'ミサキ は リョウ を 傷つける ため に からかった',
      '頼み は 冗談 に 包まれて いた が、 後ろ に 本気 の 意図 が あった',
      'ミサキ は その 週 に もう スマホ を 見て いた',
    ],
    correct: 2,
    explanation:
      '「半分冗談」 deja a los dos margen para leer el momento de forma distinta: ella puede decir que solo bromeaba; él puede oír una acusación seria. Esa ambigüedad es donde empieza la pelea.',
  },
  {
    type: 'Comprensión',
    q: 'リョウ は スマホ を 渡す 代わり に 何 を する と 言いました か。',
    opts: [
      'ミサキ の 前 で メッセージ を 消す',
      'どんな 質問 に で も 答える',
      '写真 だけ 見せる',
      '次 の 日 に スマホ を 渡す',
    ],
    correct: 1,
    explanation:
      'El narrador dice: 「どんな 質問 に で も 答える と 言った」. Ryo separa dos cosas que Misaki trata como una sola: dar información y dar acceso.',
  },
  {
    type: 'Pensamiento crítico',
    q: '「断る こと 自体 が 一つ の 答え だ」 と いう 言葉 の 前提 は 何 です か。',
    opts: [
      '断る 人 は たいてい 疲れて いる か 忙しい',
      '無実 なら 見せた はず だ — だから 断る こと 自体 が 証拠 に なる',
      'リョウ が スマホ を 共有 する と 約束 して いた',
      '日本語 で 断る の は いつも 失礼 だ',
    ],
    correct: 1,
    explanation:
      'Misaki trata la negativa como prueba. La suposición escondida —«el inocente acepta»— deja a Ryo sin ninguna forma posible de demostrar su inocencia, que es justo lo que él denuncia después.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'ミサキ に よる と、 スマホ を 見せて と 言った とき、 本当に ほしかった もの は 何 です か。',
    opts: [
      '二年分 の メッセージ を 読む こと',
      '夕食中 の 通知 を 送った 人 を 知る こと',
      'リョウ が 自分 から 渡す 姿 を 見る こと — 頼み は テスト だった',
      '位置情報 の 履歴 を 確認 する こと',
    ],
    correct: 2,
    explanation:
      'Lo dice sin rodeos: 「渡す ところ が 見たかった だけ。 それ が テスト だった の。」 Para ella contaba el gesto, no el contenido.',
  },
  {
    type: 'Inferencia',
    q: '「隠す こと が ない なら、 なんで 見せる の が そんなに 大変 な の?」 この 問い の 問題 点 は 何 です か。',
    opts: [
      '文法 が 間違って いる',
      '断る こと を 罪 と 同じ に して いる ので、 リョウ が どう 答えて も 晴らせ ない',
      'ミサキ が スマホ の 中身 を すでに 知って いる こと を 示す',
      'ミサキ が 関係 を 大事に して いない こと を 示す',
    ],
    correct: 1,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. La lógica está cerrada — aceptar parece prueba, negarse parece culpa. Ryo nombra la misma trampa desde su lado.',
  },
  {
    type: 'Tono',
    q: 'ミサキ の 音声 メッセージ の 口調 を 一番 よく 表して いる の は どれ です か。',
    opts: [
      '落ち着いて いて 分析的',
      '格式 ばって いて 事務的',
      '怒って いて 皮肉 っぽい が、 その 下 に 不安 と 痛み が ある',
      '最初 から 最後 まで 軽く て 楽しい',
    ],
    correct: 2,
    explanation:
      'El sarcasmo es real (「線 ね。 はいはい。」), pero mira el marco: abre con 「私 が おかしく なる」 y cierra con 「そこ が 一番 きつい」. La rabia está montada encima del dolor.',
  },
  {
    type: 'Vocabulario',
    q: '「線 ね。 はいはい。」 で ミサキ は 何 を して います か。',
    opts: [
      '関係 に 線 が 大事 だ と 丁寧 に 認めて いる',
      'リョウ の 言葉 を そのまま 返して 皮肉 に し、 言い訳 と して 退けて いる',
      'その 言葉 の 意味 を 説明 して ほしい と 頼んで いる',
      'カウンセラー の 言葉 を 引用 して いる',
    ],
    correct: 1,
    explanation:
      'Repetir la palabra del otro suelta y añadir 「はいはい」 es un recurso sarcástico habitual en japonés hablado: rechaza la palabra misma por falsa o pretenciosa.',
  },
  {
    type: 'Registro',
    q: 'ミサキ は 「私 が 「線 を 越えた」 らしい」 と 言います。 なぜ かぎ括弧 を 使う の です か。',
    opts: [
      '法律 の 文書 を 引用 して いる',
      'リョウ の 言葉 を 引用 して 距離 を 取り、 その 非難 を 受け入れない と 示す',
      '日本語 で この 表現 は 必ず かぎ括弧 が 必要 だ',
      '訳し方 が 分からない',
    ],
    correct: 1,
    explanation:
      'Son comillas de distancia. El 「らしい」 marca que la frase es de otro, y al repetirla luego en seco —「私 が 線 を 越えた。」— deja claro que la acusación es de él, no suya, y que le parece absurda.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'リョウ が 断った 理由 は 何 です か。',
    opts: [
      '見せたく ない メッセージ が ある',
      'スマホ が 会社 の もの だ',
      '隠して いる から で は なく、 一度 見せる と 確認 が 当たり前 に なる から',
      'パスワード を 忘れた',
    ],
    correct: 2,
    explanation:
      'Insiste en que el contenido es irrelevante (「何 も ない」) y construye su negativa alrededor de lo que el acto establecería hacia adelante, no de lo que revelaría.',
  },
  {
    type: 'Vocabulario',
    q: '「今月 は スマホ。 来月 は 位置情報。」 これ は どんな 論法 です か。',
    opts: [
      '滑りやすい 坂 — 小さな 譲歩 が 連鎖 の 始まり と して 示される',
      'ミサキ の 要求 の そのまま の 引用',
      '夕食 の とき の 態度 に ついて の 謝罪',
      'すでに 起きた 事実 の 説明',
    ],
    correct: 0,
    explanation:
      'La pendiente resbaladiza predice una reacción en cadena a partir de un primer paso. Convence — pero fíjate en que describe un futuro que él imagina, no hechos ocurridos.',
  },
  {
    type: 'Inferencia',
    q: '「他 の 人 が した こと で、 俺 が 調べられ て いる。」 この 文 は 何 を 示して います か。',
    opts: [
      '警察 が 本当に リョウ を 調べて いる',
      'リョウ は ミサキ の 元彼 の 行い の 代償 を 自分 が 払って いる と 感じて いる',
      'リョウ は 元彼 と 同じ こと を した',
      'リョウ は ミサキ に 元彼 と 連絡 して ほしい',
    ],
    correct: 1,
    explanation:
      'La metáfora judicial (「調べられる」「疑わしい」「証拠」) recorre todo su relato. Se retrata como acusado injustamente: pagando por una historia que no es la suya.',
  },
  {
    type: 'Pensamiento crítico',
    q: '「だめ と 言う こと が 罪 に なる なら、 正しい 答え なんて 最初 から ない。」 リョウ は 何 を 指摘 して います か。',
    opts: [
      'ミサキ が 質問 を しない こと',
      'その 頼み は 正直 に 合格 する 方法 が ない こと — どんな 反応 でも 疑い を 裏づける',
      '別れたい と 思って いる こと',
      '質問 が 理解 でき なかった こと',
    ],
    correct: 1,
    explanation:
      'Está señalando una sospecha infalsable: ninguna prueba podría refutarla. Es el espejo exacto de la pregunta retórica de Misaki — la misma lógica, vista desde el otro lado.',
  },
  {
    type: 'Tono',
    q: '「もっと うまく できた かも しれない。 かも しれない けど。」 繰り返される 「かも しれない」 は 何 を 伝えて います か。',
    opts: [
      '完全 な 責任 の 引き受け',
      '何 が 起きた か 全く 分から ない 混乱',
      '小さな 譲歩 を して すぐ 引っ込める — 謝罪 の 形 だけ の 文',
      '本当 の 後悔 と 変わる 決意',
    ],
    correct: 2,
    explanation:
      'El primer 「かも しれない」 abre una puerta; el segundo la cierra. Concede la forma, nunca la decisión — y la frase siguiente (「謝らない」) lo confirma.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: '二人 の 話 が どちら も 認めて いる 事実 は 何 です か。',
    opts: [
      'リョウ が 他 の 女性 から メッセージ を 受け取った',
      'ミサキ が 会話 の 一部 を すでに 読んだ',
      'リョウ が 夕食中 に スマホ を 伏せた',
      'リョウ が 翌朝 に 謝った',
    ],
    correct: 2,
    explanation:
      'El celular boca abajo es el único hecho objetivo que cuentan los dos. Su significado está en disputa total: para ella es una reacción, para él una costumbre que tiene desde los diecinueve.',
  },
  {
    type: 'Perspectiva',
    q: 'ミサキ は それ を 「テスト」 と 呼び、 リョウ は 「調べられ て いる」 と 言います。 この 差 は 何 を 示して います か。',
    opts: [
      'どちら か が わざと 嘘 を ついて いる',
      '同じ 行為 でも、 それ が 何 の しるし だ と 思う か で 正反対 の 意味 に なる',
      '二人 と も その 夜 を よく 覚えて いない',
      'リョウ の 方 が 難しい 語彙 を 使う',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Ella buscaba un gesto pequeño de tranquilidad; él vivió una acusación que exigía pruebas. Ninguno inventa la noche: describen experiencias distintas de la misma noche.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'この 対立 の 一番 根本 の 原因 は 何 です か。',
    opts: [
      'リョウ が スマホ に 何 か 隠して いる',
      'ミサキ が もともと 嫉妬 深い',
      '二人 の 間 で プライバシー が 何 を 意味 する か、 試される まで 一度 も 決めて いなかった',
      'ミサキ の 元彼',
    ],
    correct: 2,
    explanation:
      '¿Compartir el celular es normal en esta pareja o no? Nadie lo había decidido nunca. La regla se inventó en mitad de la discusión, y por eso los dos sienten que el otro la rompió.',
  },
  {
    type: 'Registro',
    q: 'ミサキ は 「線 を 越えた」 と 責められ、 リョウ は 「線 が ある こと」 に 謝らない と 言います。 同じ 「線」 は 何 を 示して います か。',
    opts: [
      '二人 が 同じ 映画 を 引用 して いる',
      '同じ 「線」 の イメージ で 正反対 の 立場 を 守って いる — どちら も 自分 が 線 を 守る 側 だ と 思って いる',
      '二つ の 場合 で 「線」 の 意味 が 全く 違う',
      'リョウ が ミサキ の 語彙 を まねて いる 証拠',
    ],
    correct: 1,
    explanation:
      'La misma imagen —una línea que no se cruza— hace trabajos opuestos en cada relato. En la mayoría de los conflictos de pareja, los dos creen estar defendiendo un límite, no atacándolo.',
  },
  {
    type: 'Inferencia',
    q: '「普通に 渡して くれて たら、 たぶん 開き も しなかった。」 この 文 は 何 を 明らか に します か。',
    opts: [
      'ミサキ は スマホ を 見たい と 嘘 を ついた',
      'ミサキ が ほしかった の は 情報 で は なく 安心 だった — そして それ を 与えられる の は、 リョウ が 主義 と して 断った まさに その 行為 だけ だった',
      'ミサキ は 前 に スマホ を 開いた こと が ある',
      'ミサキ は パスワード を 知らない',
    ],
    correct: 1,
    explanation:
      'Aquí está la trampa central de la historia. Ella necesitaba un gesto; él solo podía ver un precedente. No había ninguna versión de esa noche en la que los dos consiguieran lo que necesitaban.',
  },
];

const KEY_LANGUAGE = [
  { phrase: '光る', meaning: 'que la pantalla se encienda sola al llegar una notificación (intransitivo)' },
  { phrase: '伏せる', meaning: 'poner algo boca abajo — acto literal, significado simbólico' },
  { phrase: '半分冗談', meaning: 'medio en broma: deja abiertas dos lecturas del mismo acto' },
  { phrase: '〜らしい', meaning: 'cita lo que dice otro; usado así, marca distancia y rechazo' },
  { phrase: 'かも しれない…けど', meaning: 'concesión mínima que se retira enseguida: no-disculpa' },
  { phrase: 'はいはい', meaning: 'sí, sí — sarcasmo puro: rechaza lo dicho sin discutirlo' },
];

export const fuseraretaSumaho: Historia = {
  slug: 'fuserareta-sumaho',
  lang: 'japones',
  icon: '📵',
  color: '#be185d',
  level: 'B1',
  title: '伏せられたスマホ',
  tagline: 'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes.',
  metaTitle: '伏せられたスマホ — comprensión en japonés B1',
  metaDescription:
    
    
    'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes. Dos audios, transcripción y 19 preguntas en japonés B1.',
  intro:
    'Una pareja, un celular y dos versiones completamente distintas del mismo viernes por la noche. Lee al narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'El texto va separado por espacios para que puedas hacer clic en cada palabra; en japonés real no los llevaría. El narrador está en 常体 (だ・た) y las dos notas de voz en japonés hablado. Fíjate en lo poco que pasó de verdad: nadie leyó ningún mensaje.',
  },
  voices: [
    {
      key: 'a',
      name: 'ミサキ',
      role: '彼女',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/japones/fuserareta-sumaho/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Las palabras salen con su partícula pegada, como suenan.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de ミサキ.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en japonés.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'リョウ',
      role: '彼氏',
      color: '#7c3aed',
      audioSrc: '/audio/historias/japones/fuserareta-sumaho/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. リョウ repite un detalle que ミサキ también menciona: búscalo.',
      transcriptHint: 'compara la versión de リョウ con la de ミサキ: ¿qué detalles cuentan los dos? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de リョウ.',
      write1Hint: 'Esta es la otra cara de la historia. ¿Qué dice él que pasó? Escribe en español o en japonés.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de リョウ.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Ahora sabes algo que ninguno de los dos sabe: has oído las dos versiones. Estas preguntas te piden ponerlas una al lado de la otra — qué detalles sobreviven en las dos, dónde tiene razón cada uno y dónde tener razón no es lo mismo que ser justo.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: '¿Negarse es lo mismo que esconder? ¿Y puede una petición ser razonable y aun así injusta?',
    note: 'No hay una única respuesta correcta. Lo que se evalúa es defender tu posición con evidencia del texto: palabras y frases concretas de cada versión. Esa es la destreza que separa un B1 sólido de un B1 de examen.',
  },
  ui: 'es',
};

export default fuseraretaSumaho;
