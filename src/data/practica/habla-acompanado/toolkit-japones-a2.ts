import type { RoleplayToolkit } from './types.ts'

export const TOOLKIT_JAPONES_A2: RoleplayToolkit = {
  language: 'japones',
  level: 'a2',
  intro: 'この箱は会話の台本ではありません。必要な機能を選び、自分の数字・時間・理由を入れてください。漢字の下のローマ字は読み方だけで、答えの翻訳ではありません。',
  blocks: [
    {
      number: 1,
      title: '丁寧にお願いする',
      rows: [
        { form: '〜を確認してください。', reading: '... o kakunin shite kudasai.', when: '番号・時間・記録を調べてほしい時', register: 'です・ます · 丁寧', tag: '[asks]' },
        { form: '〜てもいいですか。', reading: '... te mo ii desu ka.', when: '許可が必要な時', register: 'です・ます · 丁寧' },
        { form: 'もう一度見てもらえますか。', reading: 'Mō ichido mite moraemasu ka.', when: '相手に再確認を頼む時', register: 'です・ます · 丁寧', tag: '[receives]' },
        { form: '〜をお願いできますか。', reading: '... o onegai dekimasu ka.', when: '具体的な手続きを頼む時', register: 'です・ます · 丁寧' },
      ],
      tail: 'お願いの後に、何を・いつまでに・どの番号で確認するかを自分の情報で足してください。',
    },
    {
      number: 2,
      title: '問題を受け止める',
      rows: [
        { form: 'そうなんですね。', reading: 'Sō nan desu ne.', when: '新しい事情を理解した時', register: 'です・ます · 中立', tag: '[receives]' },
        { form: 'それは困りますね。', reading: 'Sore wa komarimasu ne.', when: '相手の不便を具体的に認める時', register: 'です・ます · 丁寧' },
        { form: 'わかりました。ただ、〜。', reading: 'Wakarimashita. Tada, ...', when: '理解してから条件を加える時', register: 'です・ます · 中立' },
        { form: '〜ということですね。', reading: '... to iu koto desu ne.', when: '聞いた内容を短く確認する時', register: 'です・ます · 丁寧' },
      ],
    },
    {
      number: 3,
      title: '情報を分けて確かめる',
      tag: '[jargon]',
      note: '言葉の意味を推測せず、画面にある番号・場所・時間を一つずつ確認します。',
      rows: [
        { form: 'どの〜ですか。', reading: 'Dono ... desu ka.', when: '二つ以上の候補から特定する時', register: 'です・ます · 丁寧' },
        { form: '何時の記録ですか。', reading: 'Nanji no kiroku desu ka.', when: '記録の時刻を聞く時', register: 'です・ます · 丁寧' },
        { form: '〜と〜は同じですか。', reading: '... to ... wa onaji desu ka.', when: '二つの番号や品物を比べる時', register: 'です・ます · 丁寧' },
        { form: 'その言葉は何ですか。', reading: 'Sono kotoba wa nan desu ka.', when: '制度や表示の意味を尋ねる時', register: 'です・ます · 丁寧' },
      ],
    },
    {
      number: 4,
      title: '短い理由を説明する',
      rows: [
        { form: '〜んです。', reading: '... n desu.', when: '今の事情を背景として説明する時', register: 'です・ます · 中立' },
        { form: '〜から、今はできません。', reading: '... kara, ima wa dekimasen.', when: '理由と現在の限界を結ぶ時', register: 'です・ます · 丁寧' },
        { form: '〜ているので、確認が必要です。', reading: '... te iru node, kakunin ga hitsuyō desu.', when: '続いている状態から確認へ進む時', register: 'です・ます · 丁寧' },
        { form: '〜と思います。', reading: '... to omoimasu.', when: '断定せず自分の考えを述べる時', register: 'です・ます · 中立' },
      ],
    },
    {
      number: 5,
      title: 'できないことと境界を伝える',
      tag: '[grants]',
      rows: [
        { form: '〜ことはできません。', reading: '... koto wa dekimasen.', when: '権限や安全上できないことを言う時', register: 'です・ます · 丁寧' },
        { form: '〜てはいけません。', reading: '... te wa ikemasen.', when: '明確な禁止を説明する時', register: 'です・ます · 明確' },
        { form: '今は〜しかありません。', reading: 'Ima wa ... shika arimasen.', when: '残っている選択肢を限定する時', register: 'です・ます · 中立' },
        { form: '〜までなら大丈夫です。', reading: '... made nara daijōbu desu.', when: '受け入れられる上限や時刻を示す時', register: 'です・ます · 丁寧', tag: '[grants]' },
      ],
    },
    {
      number: 6,
      title: '条件と代案を出す',
      rows: [
        { form: 'もし〜たら、〜できます。', reading: 'Moshi ... tara, ... dekimasu.', when: '確認後に可能になる案を出す時', register: 'です・ます · 中立', tag: '[grants]' },
        { form: '〜の代わりに、〜はどうですか。', reading: '... no kawari ni, ... wa dō desu ka.', when: '不可能な案を別の案に替える時', register: 'です・ます · 丁寧' },
        { form: '先に〜て、後で〜ませんか。', reading: 'Saki ni ... te, ato de ... masen ka.', when: '二段階の解決を提案する時', register: 'です・ます · 丁寧' },
        { form: 'この条件でいいですか。', reading: 'Kono jōken de ii desu ka.', when: '代案の条件を相手に確認する時', register: 'です・ます · 丁寧', tag: '[receives]' },
      ],
    },
    {
      number: 7,
      title: '次の手順と時間を決める',
      rows: [
        { form: '〜前に確認します。', reading: '... mae ni kakunin shimasu.', when: '期限より前の確認を約束する時', register: 'です・ます · 中立' },
        { form: '〜後で連絡します。', reading: '... ato de renraku shimasu.', when: '確認後の連絡を決める時', register: 'です・ます · 丁寧' },
        { form: '〜までに返事をします。', reading: '... made ni henji o shimasu.', when: '返答の期限を決める時', register: 'です・ます · 丁寧' },
        { form: 'まず〜、それから〜。', reading: 'Mazu ..., sorekara ...', when: '二つの手順を順番に並べる時', register: 'です・ます · 中立' },
      ],
      tail: '「後で」だけで終わらず、誰が、何を、何時までにするかを決めてください。',
    },
    {
      number: 8,
      title: '合意を確認して終える',
      rows: [
        { form: 'では、〜にします。', reading: 'Dewa, ... ni shimasu.', when: '選んだ案を一つに決める時', register: 'です・ます · 中立' },
        { form: 'もう一度確認します。', reading: 'Mō ichido kakunin shimasu.', when: '最後の要点を言い直す前', register: 'です・ます · 丁寧' },
        { form: '誰が何時までにしますか。', reading: 'Dare ga nanji made ni shimasu ka.', when: '担当者と期限を確定する時', register: 'です・ます · 丁寧' },
        { form: 'これでいいですか。', reading: 'Kore de ii desu ka.', when: '相手の最終確認を取る時', register: 'です・ます · 丁寧', tag: '[receives]' },
      ],
      tail: '二人とも、番号・数量・場所・次の行動を自分の言葉で言えたら終了です。',
    },
  ],
}
