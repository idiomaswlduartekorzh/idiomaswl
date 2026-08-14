// ─── 祖父の帳簿 — Historia B1 en japonés ───────────────────────────────────────
// Adaptación de «The Grandfather's Ledger» al japonés. Nivel B1. Quien reclama
// los regalos es el ABUELO (健三) en las tres capas: narrador, transcripciones y
// preguntas.
//
// ESPACIOS A PROPÓSITO: el texto va separado por 文節 para que el
// clic-para-traducir funcione. Las claves del diccionario son el trozo exacto
// entre espacios, sin puntuación.
//
// AUDIO: /audio/historias/japones/sofu-no-choubo/{a,b}.mp3
// a con voz de mujer (あゆみ), b con voz de hombre mayor (健三).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  祖父: 'abuelo (de uno mismo, formal)',
  祖母: 'abuela',
  おじいちゃん: 'abuelito',
  義父: 'suegro',
  義理: 'parentesco político',
  嫁: 'nuera / esposa',
  孫: 'nieto/a',
  孫が: 'el nieto (sujeto)',
  娘: 'hija',
  息子: 'hijo',
  帳簿: 'libro de cuentas',
  帳簿を: 'el libro de cuentas (complemento)',
  リスト: 'lista',
  リストを: 'la lista (complemento)',
  表: 'tabla / cuadro',
  領収書: 'recibo / factura',
  領収書を: 'los recibos (complemento)',
  ベビーカー: 'cochecito de bebé',
  子供部屋: 'cuarto de los niños',
  ベビーベッド: 'cuna',
  たんす: 'cómoda',
  家具: 'muebles',
  おもちゃ: 'juguetes',
  学資: 'fondo para los estudios',
  貯金: 'ahorros',
  妊娠: 'embarazo',
  妊娠した: 'quedó embarazada',
  財産: 'patrimonio / bienes',
  投資: 'inversión',
  投資した: 'invirtió',
  大金: 'una fortuna / mucho dinero',
  気前: 'generosidad',
  けち: 'tacaño',
  欲張り: 'codicioso / avaro',
  悪者: 'el malo de la historia / villano',
  怪物: 'monstruo',
  棚卸し: 'inventario / recuento de existencias',
  倉庫: 'almacén / bodega',
  在庫: 'existencias / stock',
  整理: 'orden / organización',
  書類: 'documentos / papeleo',
  態度: 'actitud',
  感謝: 'gratitud',
  受け継ぐ: 'heredar / recibir de la generación anterior',
  受け継いで: 'heredando / pasando a otro',
  代々: 'de generación en generación',
  世代: 'generación',
  断った: 'se negó / rechazó',
  断られ: 'ser rechazado',
  驚いて: 'sorprendido',
  本気で: 'en serio / de verdad',
  身構えた: 'se puso a la defensiva',
  対立: 'conflicto / enfrentamiento',
  意図: 'intención',
  計画: 'plan',
  証拠: 'prueba / evidencia',
  期待: 'expectativa',
  条件: 'condición',
  贈り物: 'regalo',
  プレゼント: 'regalo',
  貸した: 'prestó',
  当たり前: 'natural / que se da por hecho',
  公平: 'justo / equitativo',
  公平だ: 'es justo',
  ありえない: 'imposible / inconcebible',
  犯罪: 'delito / crimen',
  言い訳: 'excusa',
  皮肉: 'sarcasmo / ironía',
  急に: 'de repente',
  正直: 'sinceramente / honestamente',
  経済的に: 'económicamente',
  現れた: 'apareció / se presentó',
  笑われ: 'ser objeto de burla',
  本当に: 'de verdad / realmente',
};

const NARRATOR_PARAGRAPHS = [
  '三年前、 そうた が 生まれた とき、 家族 の 中 で 一番 お金 を 使った の は 祖父 の 健三 だった。',
  'ほとんど 全部 を 買った。 高い ベビーカー、 子供部屋 の 家具 一式、 高い おもちゃ、 それ に 学資 の 貯金 まで 始めた。',
  'みんな、 ただ 気前 が いい 人 だ と 思って いた。',
  'その あと、 健三 の 娘 の なつみ が 妊娠した と 知らせた。',
  '急に 健三 は、 そうた の 物 の 一部 を 新しい 赤ちゃん と 「分けて も いい の で は」 と 言い 出した。',
  '数週間 後、 健三 は 息子 と 嫁 の 家 に 現れた。 手 に は、 今 まで 買った 高い 贈り物 が 全部 書かれた リストを 持って いた。',
  '何十万円 分 も の 物 を 返して ほしい と 言った。',
  '嫁 は 断った。',
  '今、 二人 は その 日 の こと に ついて まったく 違う 話 を して いる。',
];

const A_PARAGRAPHS = [
  'ねえ、 まだ 手 が 震えて る。',
  'そうた が 生まれた とき、 夫 の お父さん が 全部 買って くれた でしょ。 ベビーカー、 子供部屋 の 家具、 どうしても 買う って 言って た あの 高い プレゼント 全部。',
  'なのに 昨日、 あの 人 が うち に 来た の。 印刷 した リストを 持って。',
  'リスト を よ。',
  '冗談 じゃ ない の。',
  'うち の 台所 の テーブル に 座って、 一つ ずつ 確認 し 始めた の。 倉庫 で 棚卸し でも して る みたい に。',
  'ベビーカー。 ベビーベッド。 たんす。 そうた の 学資 に 入れて くれた お金 まで。',
  'それ で、 すごく 真剣 に 言う の。 「この うち の いくつ か は なつみ の 赤ちゃん に 行く の が 公平だ と 思う」。',
  '私 は そこ に 座って 考えて た... 誰 に とって 公平 な の?',
  'そうた が 今 使って る 物 な の に。 毎日。',
  '倉庫 に 積んで ある 箱 じゃ ない。 あの 子 の 物 な の。',
  'そこ から、 大金 を 投資した とか、 家 の 財産 は 家 に 残る べき だ とか 言い 始める の。',
  '家 の 財産?',
  'お義父さん、 それ お義父さん の 孫 です よ。 不動産 じゃ ない です。',
  'それ で、 領収書を 出して きた の。',
  '領収書 を。',
  '三年前 の。',
  'いつか 返して もらう つもり が ない 人 が、 赤ちゃん の 贈り物 の 領収書 を 取って おく と 思う?',
  'もう 全部 ありえない 感じ だった。',
  '一番 きつかった の は、 私 が 断った とき、 本気で 驚いて た こと。',
  'もう 一人 孫 が できる から って、 私 が 自分 の 子 の 物 を 渡す と 本当に 思って た の。',
  '「そうた が もう 使わない 物 ある?」 って 普通に 聞いて くれて たら、 喜んで 出した のに。',
  'でも 書類 を 持って 家 に 来る の は?',
  'それ は 違う でしょ。',
];

const B_PARAGRAPHS = [
  '何 が あった の か、 誰 か に 話さ ないと やって られない。 どうやら 今 は 私 が 悪者 らしい から。',
  '三年前、 そうた が 生まれた とき、 あの 子 たち の ため に 大金 を 使った。',
  '本当に 大金 を。',
  '誰 か に 言われた から じゃ ない。 孫 に 全部 持たせて やりたかった から だ。',
  '子供部屋 の 家具 だけ で、 私 の 最初 の 車 より 高かった。',
  '文句 を 言った か? 言って ない。',
  '感謝 を 求めた こと が ある か? 一度 も ない。',
  '今、 娘 の なつみ が 初めて の 子 を 待って いて、 経済的に かなり 苦しい と いう。',
  'だから、 もう ほとんど 使って いない 高い 物 の いくつ か を 受け継いで も いい の で は と 思った んだ。',
  '昔 から どこ の 家 でも そう して きた だろう。',
  'それ なのに あゆみ さん は、 私 が 銀行 でも 襲う みたい な 反応 を した。',
  '全部 返せ と 言った こと は 一度 も ない。',
  '大きい 物 を いくつ か 分ける 話 を して みない か と 言った だけ だ。',
  'でも ベビーカー の 話 を 出した 瞬間 に 身構えた。',
  '正直 に 言う と?',
  '私 が つらかった の は 物 じゃ ない。',
  '態度 だ。',
  '感謝 が まったく ない こと だ。',
  '三年 の 間、 私 が 払った 物 を 使う の を 見て きた。 それ が、 もう 一人 の 孫 を 助けよう と 言った 途端 に、 急に 私 が 欲張り な 年寄り に なる。',
  'それ に、 みんな 私 の リスト を 笑う。',
  '整理 して おく の が、 そんなに いけない こと か。',
  '何千万 の 話 を して いる のに、 書いて おく の が 世界 で 一番 おかしい こと でも ない だろう。',
  '私 は そうた から 何 か を 取ろう と した わけ じゃ ない。',
  'なつみ を 助けよう と した んだ。',
  'でも この 家 で は、 それ が どうやら 犯罪 らしい。',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: '「みんな、 ただ 気前 が いい 人 だ と 思って いた」 の 「気前 が いい」 は どういう 意味 です か。',
    opts: [
      '安くて 実用的 な 物 ばかり 選ぶ',
      'お金 を 惜しま ず に たくさん 使う',
      '中古 の 物 を 好んで 買う',
      'セール の とき だけ まとめて 買う',
    ],
    correct: 1,
    explanation:
      '「気前がいい」 es «ser espléndido, no escatimar». La lista sube de escalón en escalón —cochecito, muebles, juguetes, fondo para los estudios— y eso prepara todo lo que viene después.',
  },
  {
    type: 'Inferencia',
    q: '語り手 は 健三 の 態度 が 「急に」 変わった と 言います。 これ は 何 を 意味 します か。',
    opts: [
      '変化 は ゆっくり で、 前 から 予想 されて いた',
      '健三 は 最初 から 物 を 取り戻す つもり で 買った',
      '変化 は ある 出来事 の 直後 に 来た — 娘 の 妊娠',
      'なつみ が 自分 から 物 を 分けて ほしい と 頼んだ',
    ],
    correct: 2,
    explanation:
      '「急に」 contrasta con tres años de generosidad e implica que la motivación cambió justo cuando su propia hija quedó embarazada — no poco a poco.',
  },
  {
    type: 'Comprensión',
    q: '健三 が 持って きた リスト に は 何 が 書かれて いました か。',
    opts: [
      '新しい 赤ちゃん の ため に これ から 買う 物',
      '今 まで 買った 高い 贈り物 の 全部',
      '家 の 一か月 の 予算',
      '息子 と 交わした 契約',
    ],
    correct: 1,
    explanation:
      'El narrador dice: 「今 まで 買った 高い 贈り物 が 全部 書かれた リスト」.',
  },
  {
    type: 'Pensamiento crítico',
    q: '「みんな、 ただ 気前 が いい 人 だ と 思って いた」 の 「ただ」 は 何 を ほのめかします か。',
    opts: [
      '健三 は 下心 なく 確か に 気前 が よかった だけ で、 そこ に 別 の 意味 は 何 も ない',
      'その 気前 の よさ の 裏 に、 当時 見えて いなかった 何 か が あった かも しれない',
      '家族 は 最初 から その 贈り物 に 何 か 条件 が 付いて いる と 知って いた',
      '健三 は 最初 から 公然と 家族 を お金 で 支配 しよう と して いた',
    ],
    correct: 1,
    explanation:
      '「ただ」 sugiere que las apariencias engañaban: deja abierta la posibilidad de que aquella generosidad llevara condiciones que nadie vio hasta ahora.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'あゆみ は 義父 の 訪問 を 「倉庫 で 棚卸し でも して る みたい」 と 言います。 この たとえ は 何 を して います か。',
    opts: [
      '義父 が 家 の 中 の 家具 を 一つ ずつ 動かして、 傷 が ない か 確かめた と いう 意味',
      '義父 を 冷たく 事務的 に 描く — 贈り物 を 取り戻せる 在庫 の よう に 扱って いる',
      '聞いて いる 人 を 笑わせる ため の、 少し 大げさ な 言い方',
      '冷たい リスト に 人間 らしさ を 与えて、 義父 の 気持ち を 分かろう と して いる',
    ],
    correct: 1,
    explanation:
      'La comparación le quita a la visita todo el calor familiar. Equipararla a un recuento de almacén muestra que あゆみ vivió la escena como una transacción, no como una conversación entre familia.',
  },
  {
    type: 'Inferencia',
    q: '「返して もらう つもり が ない 人 が、 領収書 を 取って おく と 思う?」 この 問い は 何 を ほのめかします か。',
    opts: [
      '家族 の 間 でも 領収書 は 取って おく べき だ と 教えて いる',
      '義父 は ただ 整理 好き な だけ で、 領収書 を 捨てられ ない 人 な の だ',
      '領収書 は、 義父 が 最初 から 返して もらう つもり だった 証拠 だ',
      'あゆみ が 自分 の 買った 物 の 領収書 を なくして しまった',
    ],
    correct: 2,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. あゆみ la usa para convertir los recibos en prueba de premeditación, no en simple orden.',
  },
  {
    type: 'Tono',
    q: 'あゆみ の 音声 メッセージ の 口調 を 一番 よく 表して いる の は どれ です か。',
    opts: [
      '落ち着いて いて 分析的 で、 順序 よく 話して いる',
      '感情 が 高ぶり、 憤って いて、 信じられない と いう 気持ち',
      '悲しくて、 自分 の 言い方 を 後悔 して いる',
      '格式 ばって いて 事務的 で、 報告書 の よう な 話し方',
    ],
    correct: 1,
    explanation:
      '«Todavía me tiemblan las manos», las frases de una sola palabra (「リスト を よ。」「領収書 を。」) y el sarcasmo (「不動産 じゃ ない です」) marcan indignación emocional, no análisis.',
  },
  {
    type: 'Comprensión',
    q: 'あゆみ に よる と、 義父 が どう 言って いたら よかった の です か。',
    opts: [
      '贈り物 全部 の 詳しい リスト を 持って くる',
      'ベビーカー と ベビーベッド を すぐ 返せ と 言う',
      'そうた が もう 使わない 物 が ある か 聞く',
      '正式 な 手紙 を 送る',
    ],
    correct: 2,
    explanation:
      'Ella lo dice: 「そうた が もう 使わない 物 ある? って 普通に 聞いて くれて たら、 喜んで 出した のに。」 El CÓMO pesó tanto como el QUÉ.',
  },
  {
    type: 'Registro',
    q: '「お義父さん、 それ お義父さん の 孫 です よ。 不動産 じゃ ない です。」 あゆみ は 何 を して います か。',
    opts: [
      '義父 が 昔 やって いた 不動産 の 仕事 に ついて、 真面目 に 話 を して いる',
      '丁寧語 の まま 皮肉 を 言い、 家族 を 投資 の よう に 扱う 態度 を 突いて いる',
      '義父 の 考え に 丁寧 に 同意 して、 これ 以上 話 を 荒立て ない よう に して いる',
      '義父 が 持って きた リスト の 言葉 を そのまま 引用 して いる',
    ],
    correct: 1,
    explanation:
      'Es sarcasmo dentro de la cortesía: mantiene el 「お義父さん」 y el です/ます impecables mientras el contenido lo acusa de tratar a su nieto como una cartera de inversión. En japonés esa combinación golpea más que levantar la voz.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: '健三 は 物 を 「受け継いで も いい の で は」 と 言います。 この 言葉 は どんな 習慣 を 指します か。',
    opts: [
      '店 に 返品 して、 払った お金 を 返して もらう こと',
      '家 の 中 で 世代 から 世代 へ 物 を 渡して いく 習慣',
      '亡く なった 後 に 財産 を 分ける 法的 な 手続き',
      '要ら なく なった 物 を 慈善 団体 に 寄付 する',
    ],
    correct: 1,
    explanation:
      '「受け継ぐ」 invoca una costumbre familiar, no una devolución. 健三 presenta su petición como práctica cultural, no como exigencia económica.',
  },
  {
    type: 'Comprensión',
    q: '健三 に よる と、 彼 が 実際 に 求めた の は 何 です か。',
    opts: [
      'リスト の 物 を すべて すぐ に 返して もらう こと',
      'そうた の 学資 に 入れた お金 の 分 だけ',
      '大きい 物 を いくつ か 分ける 話 を して みる こと',
      'あゆみ から の きちんと した 謝罪 の 言葉',
    ],
    correct: 2,
    explanation:
      '健三 dice: 「全部 返せ と 言った こと は 一度 も ない。 大きい 物 を いくつ か 分ける 話 を して みない か と 言った だけ だ。」 Contradice directamente el relato de あゆみ.',
  },
  {
    type: 'Inferencia',
    q: '「私 が つらかった の は 物 じゃ ない。 態度 だ。」 この 言葉 は 何 を 示して います か。',
    opts: [
      '本当 は 物 が 惜しい のに、 興味 が ない ふり を して いる だけ',
      '長年 与えて きた のに、 気持ち の 上 で ないがしろ に された と 感じて いる',
      'これ を きっかけ に、 あゆみ を 家族 の 集まり から 外して しまいたい と 思って いる',
      'あの とき 贈り物 を 買った こと 自体 を、 今 に なって 後悔 して いる',
    ],
    correct: 1,
    explanation:
      'Al separar 「物」 de 「態度」, 健三 deja claro que la herida emocional —sentirse desechado tras años de dar— le pesa más que el dinero.',
  },
  {
    type: 'Tono',
    q: '「整理 して おく の が、 そんなに いけない こと か。」 この 文 の 口調 は 何 です か。',
    opts: [
      'これ まで の 自分 の やり方 を 本当に 後悔 して、 反省 して いる',
      '皮肉 混じり の 自己 弁護 — 自分 は 悪く ない と 思って いる',
      'なぜ みんな が 急に 怒り 出した の か 分から ない と いう 困惑',
      '学術 的 で 格式 ばった、 きちんと 整理 された 言い方',
    ],
    correct: 1,
    explanation:
      'Es una no-disculpa con forma de pregunta: defiende su acto mientras insinúa que criticarle la lista es ridículo. El 「〜か」 finge duda donde no la hay.',
  },
  {
    type: 'Vocabulario',
    q: '「どうやら 今 は 私 が 悪者 らしい」 の 「悪者」 は 何 を 表して います か。',
    opts: [
      '自分 の 行い が 間違い だった と 完全 に 認めて、 家族 に 謝ろう と して いる',
      '他人 が 語る 物語 の 中 で、 不当 に 悪 の 役 を 与えられた と 感じて いる',
      '裁判 で 使う ような 法律 の 専門 用語 を そのまま 使って いる',
      '自分 を ほめる 言い方 を して、 聞く 人 の 同情 を 買おう と して いる',
    ],
    correct: 1,
    explanation:
      '「悪者」 es vocabulario de ficción, no de vida real. 健三 lo usa para decir que le han asignado un papel narrativo injusto: es un personaje en la historia que cuentan otros. El 「らしい」 refuerza que la etiqueta es ajena.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'あゆみ と 健三 の どちら も 認めて いる 事実 は 何 です か。',
    opts: [
      '健三 は すべて を 永久 に 取り戻そう と した',
      'あゆみ は 自分 から 分ける と 申し出て いた',
      '健三 は リスト を 持って 来た',
      'なつみ が 自分 で 物 を 頼んだ',
    ],
    correct: 2,
    explanation:
      'La lista es el único dato objetivo que confirman las dos versiones. Todo lo demás —intención, tono, alcance— está en disputa.',
  },
  {
    type: 'Perspectiva',
    q: '語り手 は 健三 が 「何十万円 分 の 物 を 返して ほしい と 言った」 と し、 健三 は 「分ける 話 を して みない か と 言った だけ」 と 言います。 この 差 は 何 を 示します か。',
    opts: [
      '語り手 が 最初 から 健三 に 敵意 を 持って いて、 わざと 悪く 見える よう に 書いて いる',
      '健三 の 意図 と、 その 言葉 が 実際 に 与えた 印象 の 間 に 大きな 差 が ある',
      'あゆみ が 話 の ほとんど を 自分 の 都合 の いい よう に 作り直して 伝えた',
      '語り手 が 金額 や 言葉 を 取り違えて、 事実 を 間違えて 伝えた',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. 健三 creía estar abriendo una conversación; あゆみ (y el narrador) lo vivieron como una exigencia. Esa distancia es el motor de todo el conflicto.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'この 対立 の 一番 根本 の 原因 は 何 です か。',
    opts: [
      '年 を 取って から 急に 出て きた 健三 の 欲',
      '三年 の 間 一度 も 見せ なかった あゆみ の 感謝 の なさ',
      '贈り物 を した とき、 どんな 期待 が ある の か を 一度 も 話さ なかった こと',
      'なつみ が この 時期 に 子 を 持つ と 決めて、 家 の お金 が 足り なく なった こと',
    ],
    correct: 2,
    explanation:
      '¿Eran regalos o préstamos con condiciones? Que nadie fijara ese límite en su momento —y no la avaricia ni la ingratitud por separado— es la causa estructural de la disputa.',
  },
  {
    type: 'Inferencia',
    q: 'あゆみ は 義父 が 断られた とき 「本気で 驚いて た」 と 言います。 この 反応 は 何 を 示します か。',
    opts: [
      '断られる の を 見越して、 作戦 と して 驚いた ふり を して みせた',
      '自分 の 頼み が 無理 だ と 思われる 可能性 を、 本当に 考えて いなかった',
      '断られる と 分かって いた のに、 あえて 頼んで 反応 を 試した',
      '今 まで の 人生 で 一度 も 人 に 断られた こと が なく、 慣れて いなかった',
    ],
    correct: 1,
    explanation:
      'El asombro genuino revela que 健三 opera con un conjunto de supuestos completamente distinto: no esperaba una negativa porque, dentro de su marco, su petición era razonable.',
  },
  {
    type: 'Registro',
    q: '健三 は 息子 と 嫁 を 「あの 子 たち」 と 呼びます。 この 言い方 は 何 を ほのめかします か。',
    opts: [
      '息子 と あゆみ が 実際 に まだ 子供 で、 一人前 で は ない と いう 意味 だ',
      '自分 を 助ける 側 の 大人 と 見て、 二人 を まだ 未熟 な 人 と 見て いる',
      '二人 の 名前 が 急に 出て こ なく なった だけ の こと だ',
      '日本語 で は とても 格式 の 高い、 相手 を 立てる 言い方 に なる',
    ],
    correct: 1,
    explanation:
      'Llamarlos 「あの 子 たち」 los infantiliza: los coloca como receptores de su dinero y su criterio, no como iguales. Refuerza en voz baja su sensación de autoridad.',
  },
];

const KEY_LANGUAGE = [
  { phrase: '棚卸し', meaning: 'recuento de existencias — aquí, aplicado a una familia' },
  { phrase: '受け継ぐ', meaning: 'heredar dentro de la familia, de generación en generación' },
  { phrase: '〜と 思う? (反語)', meaning: 'pregunta retórica: no espera respuesta, dicta un veredicto' },
  { phrase: '〜そんなに いけない こと か', meaning: 'pregunta que finge duda para defenderse: no-disculpa' },
  { phrase: '丁寧語 で の 皮肉', meaning: 'sarcasmo dentro de la cortesía — golpea más que levantar la voz' },
];

export const sofuNoChoubo: Historia = {
  slug: 'sofu-no-choubo',
  lang: 'japones',
  icon: '🎙️',
  color: '#059669',
  level: 'B1',
  title: '祖父の帳簿',
  tagline: 'Lo pagó todo cuando nació el nieto. Tres años después llegó con la lista impresa.',
  metaTitle: '祖父の帳簿 — comprensión en japonés B1',
  metaDescription:
    
    
    'Lo pagó todo cuando nació el nieto. Tres años después llegó con la lista impresa. Dos audios, transcripción y 19 preguntas en japonés B1.',
  intro:
    'Un conflicto de familia. Dos versiones. Tú decides quién tiene razón. Lee al narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en el 敬語: la nuera nunca deja de tratar con respeto a su suegro, y aun así lo está acusando. En japonés la cortesía no significa acuerdo — y ahí está medio ejercicio.',
  },
  voices: [
    {
      key: 'a',
      name: 'あゆみ',
      role: '嫁',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/japones/sofu-no-choubo/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Las palabras salen con su partícula pegada, como suenan.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de あゆみ.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en japonés.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: '健三',
      role: '義父',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/japones/sofu-no-choubo/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Esta es la otra mitad del conflicto.',
      transcriptHint: 'compara la versión de 健三 con la de あゆみ: ¿en qué coinciden? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de 健三.',
      write1Hint: '¿Qué dice él que pasó de verdad? Escribe en español o en japonés.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de 健三.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Estas preguntas te piden sostener las dos versiones a la vez y pensar con calma qué pasó, por qué, y cómo el idioma que elige cada uno moldea lo que creemos que pasó.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Después de oír a los dos: ¿quién tiene el argumento más fuerte, y por qué?',
    note: 'No hay una única respuesta correcta. Lo que importa es sostener tu posición con evidencia del texto: palabras y frases concretas. Esa es la destreza que separa un B1 sólido de un B1 de examen.',
  },
  ui: 'es',
};

export default sofuNoChoubo;
