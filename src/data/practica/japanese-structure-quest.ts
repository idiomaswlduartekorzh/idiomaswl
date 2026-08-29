import { createStructureQuest, type FinalRow, type StructureSeed } from './create-structure-quest.ts'

// Contenido heredado. La ruta pública usa japanese-structure-quest-config.ts y bancos editoriales auditados.

export const JAPANESE_FORMS = [
  { id: 'nonpast-affirmative', label: '非過去・肯定（ます）', group: '時制' },
  { id: 'nonpast-negative', label: '非過去・否定（ません）', group: '時制' },
  { id: 'past-affirmative', label: '過去・肯定（ました）', group: '時制' },
  { id: 'past-negative', label: '過去・否定（ませんでした）', group: '時制' },
  { id: 'progressive', label: '進行中（ています）', group: 'アスペクト' },
  { id: 'result-state', label: '結果状態（ています）', group: 'アスペクト' },
  { id: 'experience', label: '経験（たことがある）', group: 'アスペクト' },
  { id: 'plan-intention', label: '予定・意図', group: '未来表現' },
  { id: 'tara-conditional', label: '条件（たら）', group: '条件' },
  { id: 'request-prohibition', label: '依頼・禁止', group: '働きかけ' },
] as const

export type JapaneseFormId = (typeof JAPANESE_FORMS)[number]['id']

const SEEDS: StructureSeed<JapaneseFormId>[] = [
  { id: 'nonpast-affirmative', explanation: '日本語の非過去形は、現在の習慣だけでなく、予定された未来にも使います。', examples: [
    { context: '毎朝、由美さんはコーヒーを___。', answer: '飲みます', wrong: '飲みました', lemma: '飲む', cue: '現在の習慣', distractors: ['飲んでいます', '飲みません', '飲むつもりでした'] },
    { context: 'この図書館は九時に___。', answer: '開きます', wrong: '開けます', lemma: '開く', cue: '決まった時刻', distractors: ['開きました', '開いています', '開きませんでした'] },
    { context: '来週、先生に___。', answer: '会います', wrong: '会いました', lemma: '会う', cue: '決まった未来の予定', distractors: ['会っています', '会いませんでした', '会ったことがあります'] },
  ] },
  { id: 'nonpast-negative', explanation: 'ませんは、現在の習慣の否定や、文脈で未来の否定を表します。', examples: [
    { context: '私は肉を___。', answer: '食べません', wrong: '食べませんでした', lemma: '食べる', cue: '現在の習慣の否定', distractors: ['食べます', '食べています', '食べたことがあります'] },
    { context: '今日は雨なので、外へ___。', answer: '出かけません', wrong: '出かけませんでした', lemma: '出かける', cue: '今日の予定の否定', distractors: ['出かけます', '出かけています', '出かけたことがあります'] },
    { context: 'この店は日曜日には___。', answer: '営業しません', wrong: '営業しませんでした', lemma: '営業する', cue: '定期的な否定', distractors: ['営業します', '営業しています', '営業しました'] },
  ] },
  { id: 'past-affirmative', explanation: 'ましたは、丁寧体で完了した過去の出来事を表します。', examples: [
    { context: '昨日、新しい映画を___。', answer: '見ました', wrong: '見ます', lemma: '見る', cue: '昨日の完了した出来事', distractors: ['見ています', '見ませんでした', '見たことがあります'] },
    { context: '先週、京都へ___。', answer: '行きました', wrong: '行きます', lemma: '行く', cue: '過去の移動', distractors: ['行っています', '行きません', '行くつもりです'] },
    { context: 'レポートはさっき___。', answer: '終わりました', wrong: '終わります', lemma: '終わる', cue: '直前に完了したこと', distractors: ['終わっています', '終わりませんでした', '終わる予定です'] },
  ] },
  { id: 'past-negative', explanation: 'ませんでしたは、丁寧体で過去に起こらなかったことを表します。', examples: [
    { context: '昨日はコーヒーを___。', answer: '飲みませんでした', wrong: '飲みません', lemma: '飲む', cue: '過去の否定', distractors: ['飲みました', '飲んでいます', '飲んだことがあります'] },
    { context: '田中さんは先週、会社に___。', answer: '来ませんでした', wrong: '来ません', lemma: '来る', cue: '過去の不在', distractors: ['来ました', '来ています', '来る予定です'] },
    { context: '子どもの時、魚を___。', answer: '食べませんでした', wrong: '食べません', lemma: '食べる', cue: '過去の習慣の否定', distractors: ['食べました', '食べています', '食べるつもりです'] },
  ] },
  { id: 'progressive', explanation: '動作動詞のていますは、今進行している動作や一時的に続く活動を表します。', examples: [
    { context: '今、妹は本を___。', answer: '読んでいます', wrong: '読みます', lemma: '読む', cue: '今進行中の動作', distractors: ['読みました', '読んだことがあります', '読む予定です'] },
    { context: '今月、私は大阪で___。', answer: '働いています', wrong: '働きました', lemma: '働く', cue: '一時的に続く活動', distractors: ['働きます', '働きませんでした', '働くつもりです'] },
    { context: '外では雨が___。', answer: '降っています', wrong: '降りました', lemma: '降る', cue: '目の前で続く現象', distractors: ['降ります', '降りません', '降ったことがあります'] },
  ] },
  { id: 'result-state', explanation: '変化を表す動詞のていますは、動作の途中ではなく、その結果が続く状態を表すことがあります。', examples: [
    { context: '窓が___。寒いです。', answer: '開いています', wrong: '開けています', lemma: '開く', cue: '開いた後の結果状態', distractors: ['開きます', '開きました', '開く予定です'] },
    { context: '田中さんは___。', answer: '結婚しています', wrong: '結婚します', lemma: '結婚する', cue: '変化の後に続く状態', distractors: ['結婚しました', '結婚しません', '結婚するつもりです'] },
    { context: '部屋の電気が___。', answer: 'ついています', wrong: 'つけています', lemma: 'つく', cue: '点灯した結果の状態', distractors: ['つきます', 'つきました', 'つく予定です'] },
  ] },
  { id: 'experience', explanation: 'た形 + ことがあるは、人生経験を表します。経験がない場合は「V-たことがありません」を使います。', examples: [
    { context: '私は京都へ___。', answer: '行ったことがあります', accepted: ['行ったことあります'], wrong: '行くことがあります', lemma: '行く', cue: 'これまでの経験', distractors: ['行きました', '行っています', '行く予定です'] },
    { context: '納豆を___。', answer: '食べたことがありません', accepted: ['食べたことありません'], wrong: '食べることがありません', lemma: '食べる', cue: '経験がないこと', distractors: ['食べませんでした', '食べていません', '食べないつもりです'] },
    { context: '兄は富士山に___。', answer: '登ったことがあります', accepted: ['登ったことあります'], wrong: '登ることがあります', lemma: '登る', cue: '第三者の経験', distractors: ['登りました', '登っています', '登る予定です'] },
  ] },
  { id: 'plan-intention', explanation: 'つもりですは話し手の意図、予定ですは比較的具体的に決まった計画を表します。', examples: [
    { context: '来年、日本で___。', answer: '勉強するつもりです', wrong: '勉強したつもりです', lemma: '勉強する', cue: '将来の意図', distractors: ['勉強しました', '勉強しています', '勉強したことがあります'] },
    { context: '会社は来月、新しい事務所へ___。', answer: '引っ越す予定です', wrong: '引っ越した予定です', lemma: '引っ越す', cue: '具体的に決まった予定', distractors: ['引っ越しました', '引っ越しています', '引っ越しませんでした'] },
    { context: '明日は早いので、今夜は早く___。', answer: '寝るつもりです', wrong: '寝たつもりです', lemma: '寝る', cue: '話し手の決意', distractors: ['寝ました', '寝ています', '寝たことがあります'] },
  ] },
  { id: 'tara-conditional', explanation: '動詞のた形 + らは条件を作り、現実的な可能性や「〜した後で」の意味を表します。', examples: [
    { context: '雨が___、家にいます。', answer: '降ったら', wrong: '降りたら', lemma: '降る', cue: '未来の可能条件', distractors: ['降ります', '降っている', '降ったことがある'] },
    { context: '時間が___、一緒に昼ご飯を食べましょう。', answer: 'あったら', wrong: 'ありたら', lemma: 'ある', cue: '条件が満たされた場合', distractors: ['あります', 'ありました', 'あるつもりです'] },
    { context: '駅に___、電話してください。', answer: '着いたら', wrong: '着きたら', lemma: '着く', cue: '先に完了する条件', distractors: ['着きます', '着いています', '着いたことがあります'] },
  ] },
  { id: 'request-prohibition', explanation: 'てくださいは丁寧な依頼、ないでくださいは丁寧な禁止を表します。', examples: [
    { context: 'ここに名前を___。', answer: '書いてください', wrong: '書きてください', lemma: '書く', cue: '丁寧な依頼', distractors: ['書きます', '書きました', '書かないでください'] },
    { context: 'ここで写真を___。', answer: '撮らないでください', wrong: '撮りないでください', lemma: '撮る', cue: '丁寧な禁止', distractors: ['撮ってください', '撮ります', '撮りました'] },
    { context: 'もう少しゆっくり___。', answer: '話してください', wrong: '話してません', lemma: '話す', cue: '行動を求める依頼', distractors: ['話します', '話しました', '話さないでください'] },
  ] },
]

const FINAL_ROWS: FinalRow<JapaneseFormId>[] = [
  { formId: 'nonpast-affirmative', lemma: '働く', before: '由美さんは出版社で', after: '。', answer: '働きます' },
  { formId: 'nonpast-negative', lemma: '休む', before: '締め切りの日はほとんど', after: '。', answer: '休みません' },
  { formId: 'past-affirmative', lemma: '受け取る', before: '昨日、新しい原稿を', after: '。', answer: '受け取りました' },
  { formId: 'past-negative', lemma: '読む', before: 'でも、忙しくて最後まで', after: '。', answer: '読みませんでした' },
  { formId: 'progressive', lemma: '確認する', before: '今は最初の章を', after: '。', answer: '確認しています' },
  { formId: 'result-state', lemma: '開く', before: '机の上には辞書が', after: '。', answer: '開いています' },
  { formId: 'experience', lemma: '編集する', before: '由美さんは同じ作家の本を', after: '。', answer: '編集したことがあります' },
  { formId: 'plan-intention', lemma: '終える', before: '今日は六時までに仕事を', after: '。', answer: '終えるつもりです' },
  { formId: 'tara-conditional', lemma: '終わる', before: '早く', after: '、作家に連絡します。', answer: '終わったら' },
  { formId: 'request-prohibition', lemma: '待つ', before: '同僚には「返事が来るまで', after: '」と言います。', answer: '待ってください' },
]

export const JAPANESE_STRUCTURE_QUEST = createStructureQuest({
  id: 'japanese-structure-quest', storageKey: 'wl-japanese-structure-quest-v2', forms: JAPANESE_FORMS,
  presets: [
    { label: '時制', ids: JAPANESE_FORMS.filter((form) => form.group === '時制').map((form) => form.id) },
    { label: 'アスペクト', ids: JAPANESE_FORMS.filter((form) => form.group === 'アスペクト').map((form) => form.id) },
    { label: '条件・依頼', ids: JAPANESE_FORMS.filter((form) => ['条件', '働きかけ'].includes(form.group)).map((form) => form.id) },
  ], seeds: SEEDS, finalRows: FINAL_ROWS,
  copy: {
    languageName: 'Japonés', languageCode: 'ja', eyebrow: 'Quiz de tiempo, aspecto y función · A2–B1', title: '時間と場面の研究室',
    lead: 'Practica la forma cortés sin imponer categorías europeas: no-pasado, pasado, estado resultante, experiencia, condición e intención.',
    range: '10 contrastes', selectedLabel: '項目を選択', selectorTitle: '¿Qué contrastes del japonés quieres practicar?',
    selectorLead: 'Se separan los dos valores de ています: acción en progreso y estado que permanece después de un cambio.',
    configuredEyebrow: '自分の練習コース', levelsTitle: 'Seis niveles con corrección diferida',
    levelsLead: 'Las soluciones aparecen únicamente al terminar el nivel.', mapLabels: ['以前', '過去', '今', 'これから'],
    reviewLinks: [
      { href: '/practica/japones/a1/gramatica', label: 'Repasar gramática A1' },
      { href: '/practica/japones/a2/gramatica', label: 'Profundizar en A2' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  }, text: { finalTitle: '出版社の締め切り', finalExplanation: 'La secuencia combina formas corteses, experiencia, los dos valores de ています, intención, condición y petición.' },
})
