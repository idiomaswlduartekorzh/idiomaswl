import { createPronounQuest } from './create-pronoun-quest.ts'
import { authorPronounSeed } from './pronoun-quest-authoring.ts'
import type { PronounPreset, PronounTopicOption } from './pronoun-quest-types'

export type JapanesePronounTopic = 'first_person' | 'address' | 'person_reference' | 'kosoa_pronouns' | 'kosoa_determiners' | 'possession_no' | 'reflexive_jibun'

const TOPICS: readonly PronounTopicOption<JapanesePronounTopic>[] = [
  { id: 'first_person', label: 'Primera persona y registro', group: 'Persona', level: 'A1–A2' },
  { id: 'address', label: 'Formas de dirigirse a alguien', group: 'Uso social', level: 'A1–A2' },
  { id: 'person_reference', label: 'Referencia a terceras personas', group: 'Uso social', level: 'A1–A2' },
  { id: 'kosoa_pronouns', label: 'Demostrativos これ・それ・あれ', group: 'Referencia', level: 'A1' },
  { id: 'kosoa_determiners', label: 'Serie この・その・あの', group: 'Referencia', level: 'A1' },
  { id: 'possession_no', label: 'Posesión con の', group: 'Posesión', level: 'A1' },
  { id: 'reflexive_jibun', label: '自分 y referencia reflexiva', group: 'Referencia', level: 'A2' },
]

const PRESETS: readonly PronounPreset<JapanesePronounTopic>[] = [
  { label: 'Base A1', ids: ['first_person', 'kosoa_pronouns', 'kosoa_determiners', 'possession_no'] },
  { label: 'Uso social', ids: ['address', 'person_reference'] },
  { label: 'Referencia A2', ids: ['reflexive_jibun'] },
  { label: 'Todo', ids: TOPICS.map((topic) => topic.id) },
]

const SEEDS = [
  authorPronounSeed({ id: 'first_person', explanation: 'En contexto neutro o formal se usa 私（わたし）. 僕 es informal y típicamente masculino; 俺 es más rudo e íntimo. El sujeto suele omitirse cuando ya está claro.', functionAnswer: 'expresión de primera persona adecuada al registro', functionDistractors: ['forma de segunda persona', 'demostrativo', 'referencia a tercera persona'], examples: [
    { context: 'はじめまして。___はマリアです。', answer: '私', distractors: ['あなた', '彼女', 'これ'], cue: 'Una presentación neutra pide la forma estándar de primera persona.', wrong: 'あなた', transform: ['Evita repetir 私 cuando el sujeto ya está claro.', '私はコロンビア人です。日本語を勉強しています。', ['私はコロンビア人です。私は日本語を勉強しています私。', 'あなたはコロンビア人です。日本語を勉強しています。', '私をコロンビア人です。日本語を勉強しています。']] },
    { context: '友だち同士で、男性が「___も行くよ」と言った。', answer: '僕', distractors: ['私たち', 'あなた', '彼'], cue: 'Entre amigos, un hablante masculino elige una forma informal no agresiva.', wrong: '私たち', transform: ['Cambia a una reunión formal.', '私も参加します。', ['俺も参加します。', '僕らも参加します私。', 'あなたも参加します。']] },
    { context: '社内メールでは、___が確認いたします。', answer: '私', distractors: ['俺', '僕', '君'], cue: 'Un correo profesional exige una primera persona neutral/formal.', wrong: '俺', transform: ['Expresa “nosotros” de forma neutral.', '私たちは準備できました。', ['私たちが準備できました私。', '僕は準備できましたたち。', 'あなたたちは準備できました。']] },
  ], final: { before: '受付では、', after: '参加者名簿を確認します。', answer: '私が' } }),
  authorPronounSeed({ id: 'address', explanation: 'En japonés se evita repetir あなた cuando se conoce el nombre o cargo. Nombre + さん y títulos como 先生 suelen ser la opción natural y respetuosa.', functionAnswer: 'forma de tratamiento adecuada a la relación', functionDistractors: ['primera persona', 'objeto demostrativo', 'posesivo'], examples: [
    { context: '田中先生、___は何時に来ますか。', answer: '先生', distractors: ['あなた', '彼', '私'], cue: 'Se habla directamente con un profesor cuyo título ya está claro.', wrong: 'あなた', transform: ['Pregunta a la señora Suzuki usando su nombre.', '鈴木さんはコーヒーを飲みますか。', ['あなたさんはコーヒーを飲みますか。', '彼女さんはコーヒーを飲みますか。', '鈴木はコーヒーを飲みますさんか。']] },
    { context: '山田さん、これは___の傘ですか。', answer: '山田さん', distractors: ['あなた', '彼女', 'だれか'], cue: 'El nombre con さん evita una segunda persona demasiado directa.', wrong: 'あなた', transform: ['Dirígete al gerente por el cargo.', '部長はこの資料をご覧になりましたか。', ['あなたはこの資料をご覧になりましたか。', '彼はこの資料をご覧になりました部長か。', '部長さんあなたはこの資料を見たか。']] },
    { context: '初対面の客に「___のお名前は？」より「お名前は？」が自然だ。', answer: 'あなた', distractors: ['私', 'これ', '先生'], cue: 'La palabra que conviene omitir es el pronombre explícito de segunda persona.', wrong: '先生', transform: ['Haz natural la pregunta sin pronombre.', 'お名前は何ですか。', ['あなたのお名前は何ですかあなた。', '私のお名前は何ですか。', 'お名前をあなたですか。']] },
  ], final: { before: '佐藤先生には、「', after: 'どちらに座りますか」と確認します。', answer: '先生は' } }),
  authorPronounSeed({ id: 'person_reference', explanation: 'Para terceras personas es común repetir nombre + さん, cargo o あの人／その方. 彼・彼女 existen, pero no sustituyen nombres con la frecuencia del español.', functionAnswer: 'referencia contextual a una tercera persona', functionDistractors: ['segunda persona directa', 'objeto cercano', 'posesivo'], examples: [
    { context: 'あそこにいる人は木村さんです。___は通訳です。', answer: '木村さん', distractors: ['あなた', 'これ', '木村さんの'], cue: 'Repetir nombre + さん mantiene una referencia natural y respetuosa.', wrong: 'あなた', transform: ['Usa una forma respetuosa para “esa persona”.', 'その方は受付の担当者です。', ['その人これ受付の担当者です。', 'あなたは受付の担当者です。', 'その方の受付の担当者です。']] },
    { context: '入口に男の人がいます。___は新しいスタッフです。', answer: 'その人', distractors: ['それ', 'その', 'あなた'], cue: 'Se retoma a una persona ya introducida.', wrong: 'それ', transform: ['Señala respetuosamente a una persona lejana.', 'あの方は校長先生です。', ['あれは校長先生です人。', 'あのは校長先生です。', 'あなた方は校長先生です。']] },
    { context: '「山本さんは？」「___は会議室にいます。」', answer: '山本さん', distractors: ['彼女たち', 'あなた', 'これ'], cue: 'El nombre ya conocido evita imponer género y resulta natural.', wrong: 'あなた', transform: ['Omite el referente cuando ya es inequívoco.', '山本さんは来ました。今、会議室にいます。', ['山本さんは来ました。山本さんを今、会議室にいます。', '山本さんは来ました。あなたは会議室にいます。', '山本さんが来ました彼は。会議室にいます。']] },
  ], final: { before: '通訳の木村さんが到着しました。', after: '入口で待っています。', answer: '木村さんは' } }),
  authorPronounSeed({ id: 'kosoa_pronouns', explanation: 'これ señala algo cerca del hablante, それ cerca del interlocutor o ya mencionado y あれ algo lejos de ambos. Son pronombres y no llevan un nombre después.', functionAnswer: 'pronombre demostrativo こ・そ・あ', functionDistractors: ['determinante ante un nombre', 'pronombre personal', 'marcador posesivo'], examples: [
    { context: '___は、私が持っている参加証です。', answer: 'これ', distractors: ['それ', 'あれ', 'この'], cue: 'El objeto está en manos del hablante y no aparece un nombre después.', wrong: 'この', transform: ['Señala algo junto al interlocutor.', 'それはあなたの荷物ですか。', ['そのはあなたの荷物ですか。', 'これはあなたの荷物ですかそこ。', 'それのあなたの荷物ですか。']] },
    { context: '窓の向こうの建物が見えますか。___が図書館です。', answer: 'あれ', distractors: ['これ', 'それ', 'あの'], cue: 'El edificio está lejos de ambos y se sustituye el nombre.', wrong: 'あの', transform: ['Retoma una idea que acaba de decir el interlocutor.', 'それはいい考えですね。', ['これはいい考えですね、あなたの近く。', 'そのはいい考えですね。', 'それのいい考えですね。']] },
    { context: '受付の横にカードがあります。___を取ってください。', answer: 'それ', distractors: ['その', 'これ', 'あの'], cue: 'Se retoma un objeto ya localizado junto al interlocutor.', wrong: 'その', transform: ['Pregunta por un objeto cercano sin nombrarlo.', 'これは何ですか。', ['このは何ですか。', 'これの何ですか。', 'この何ですか。']] },
  ], final: { before: '机の上に名札があります。', after: '入口に持って行ってください。', answer: 'それを' } }),
  authorPronounSeed({ id: 'kosoa_determiners', explanation: 'この・その・あの siempre acompañan a un nombre. Mantienen el mismo contraste de distancia que これ・それ・あれ.', functionAnswer: 'determinante demostrativo ante un nombre', functionDistractors: ['pronombre demostrativo independiente', 'posesivo', 'pronombre personal'], examples: [
    { context: '___資料を今から説明します。', answer: 'この', distractors: ['これ', 'その', 'あれ'], cue: '資料 aparece después y está cerca del hablante.', wrong: 'これ', transform: ['Señala una silla lejos de ambos.', 'あの椅子は空いています。', ['あれ椅子は空いています。', 'その椅子は遠くにここあります。', 'あのは椅子が空いています。']] },
    { context: 'あなたの前にある___箱を開けてください。', answer: 'その', distractors: ['それ', 'この', 'あの'], cue: '箱 está junto al interlocutor y requiere una forma ante nombre.', wrong: 'それ', transform: ['Usa この ante un nombre cercano.', 'このペンを使ってください。', ['これペンを使ってください。', 'このをペン使ってください。', 'これのペンを使ってください。']] },
    { context: '遠くに見える___山は富士山です。', answer: 'あの', distractors: ['あれ', 'その', 'これ'], cue: '山 está lejos y aparece inmediatamente después.', wrong: 'あれ', transform: ['Retoma un asunto mencionado.', 'その話はあとで聞きます。', ['それ話はあとで聞きます。', 'そのは話をあとで聞きます。', 'それの話はあとで聞きます。']] },
  ], final: { before: '入口の近くに二つの箱があります。', after: '青い箱を開けてください。', answer: 'その' } }),
  authorPronounSeed({ id: 'possession_no', explanation: 'La partícula の conecta poseedor y objeto: 私の本. Si el objeto ya está claro, の puede sustituirlo: 私の. Los nombres suelen ser preferibles a pronombres ambiguos.', functionAnswer: 'posesión o sustitución nominal con の', functionDistractors: ['objeto directo con を', 'sujeto con が', 'demostrativo independiente'], examples: [
    { context: 'これは___名札です。', answer: '私の', distractors: ['私を', '私が', '私'], cue: 'La tarjeta pertenece a quien habla y 名札 aparece después.', wrong: '私を', transform: ['Evita repetir 傘.', '赤い傘は田中さんのです。', ['赤い傘は田中さんです。', '赤い傘は田中さんをです。', '赤い傘は田中さんの傘のです。']] },
    { context: '受付にあるかばんは___です。', answer: '木村さんの', distractors: ['木村さんを', '木村さんが', '木村さん'], cue: 'El objeto ya se conoce y の sustituye “el bolso de Kimura”.', wrong: '木村さん', transform: ['Expresa “nuestro salón”.', '私たちの会場は二階です。', ['私たちを会場は二階です。', '私たち会場のは二階です。', '私たちがの会場は二階です。']] },
    { context: 'そのペンはあなたのですか、___ですか。', answer: '佐藤さんの', distractors: ['佐藤さん', '佐藤さんを', '佐藤さんが'], cue: 'Se contrasta el poseedor sin repetir ペン.', wrong: '佐藤さん', transform: ['Expresa “el horario de la escuela”.', '学校の予定を確認します。', ['学校を予定の確認します。', '学校予定をの確認します。', '学校がの予定を確認します。']] },
  ], final: { before: '赤いファイルは私のです。青いファイルは', after: 'です。', answer: '田中さんの' } }),
  authorPronounSeed({ id: 'reflexive_jibun', explanation: '自分 puede remitir al sujeto o al centro de perspectiva. 自分自身 enfatiza “uno mismo”. Su interpretación depende del contexto y no equivale mecánicamente a todos los reflexivos del español.', functionAnswer: 'referencia reflexiva o enfática con 自分', functionDistractors: ['segunda persona', 'demostrativo', 'posesivo de otro referente'], examples: [
    { context: '田中さんは___の写真を見ました。', answer: '自分', distractors: ['あなた', 'これ', '田中さんを'], cue: 'La lectura buscada es que Tanaka mira una foto de sí mismo.', wrong: 'あなた', transform: ['Haz explícito el énfasis “por mí mismo”.', '私は自分自身で確認しました。', ['私は私を自身で確認しました。', '私はあなた自身で確認しました。', '自分は私自身を確認しました。']] },
    { context: '子どもたちは___で部屋を片づけました。', answer: '自分たち', distractors: ['自分', '彼', 'あなたたちを'], cue: 'El sujeto es plural y hizo la tarea por su cuenta.', wrong: '自分', transform: ['Usa 自分の para una pertenencia ligada al sujeto.', '彼は自分のかばんを持っています。', ['彼は彼をかばん持っています。', '彼は自分をかばんの持っています。', '彼の自分はかばんを持っています。']] },
    { context: 'まず___で答えを考えてください。', answer: '自分', distractors: ['あなたを', 'これ', '自分の'], cue: 'La instrucción pide pensar por cuenta propia.', wrong: '自分の', transform: ['Expresa énfasis reflexivo con 自分自身.', '彼女は自分自身を紹介しました。', ['彼女は自分自身が紹介しました彼女を。', '彼女はあなた自身を紹介しました。', '自分自身は彼女を紹介しました。']] },
  ], final: { before: '最後に、担当者は', after: '全項目を確認します。', answer: '自分で' } }),
] as const

export const JAPANESE_PRONOUN_QUEST = createPronounQuest({
  id: 'japanese-pronoun-quest', storageKey: 'wl-japanese-pronoun-quest-v1', languageName: 'Japonés', languageCode: 'ja', title: 'ことばの指示ルート', finalTitle: '七つの自然な指示表現',
  finalExplanation: '日本語では、代名詞を毎回置くより、名前・役職・省略・こそあ表現を文脈に合わせて選ぶことが大切です。',
  reviewLinks: [{ href: '/practica/japones/a1/gramatica/particula-no-posesivo', label: 'Repasar posesión con の' }, { href: '/practica/japones/a1/gramatica', label: 'Repasar gramática A1' }],
  topics: TOPICS, presets: PRESETS, seeds: SEEDS, finalDistractors: ['あなた', 'これ', '彼女'],
})
