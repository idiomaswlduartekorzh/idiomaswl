import type { GrammarTopic } from '../types.ts'

export type JapaneseAdvancedPattern = { label: string; pattern: string; example: string; cue: string; key: string; warning: string }
export type JapaneseAdvancedCurriculumSpec = {
  slug: string; order: string; level: 'B2' | 'C1' | 'C2'; category: string; color: string; shortTitle: string
  description: string; purpose: string; register: string; formula: string; model: string
  patterns: [JapaneseAdvancedPattern, JapaneseAdvancedPattern, JapaneseAdvancedPattern]
}

const rotate = <T,>(items: T[], offset: number) => items.map((_, index) => items[(index + offset) % items.length])
function cloze(example: string, key: string, index: number) {
  const position = example.indexOf(key)
  if (position < 0) throw new Error(`キー「${key}」が例文「${example}」に含まれていません。`)
  return `${example.slice(0, position)}[[${index}]]${example.slice(position + key.length)}`
}

export function createJapaneseAdvancedCurriculumTopic(spec: JapaneseAdvancedCurriculumSpec): GrammarTopic {
  const patterns = spec.patterns
  const examples = patterns.map((item) => item.example), labels = patterns.map((item) => item.label), cues = patterns.map((item) => item.cue)
  const recognition = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length], interpret = index >= patterns.length
    return { scene: `${interpret ? '意味の読み取り' : '形式の選択'} ${index + 1}`, lines: [['', interpret ? `「${target.example}」は、この文脈で何を表していますか。` : `「${target.cue}」を最も自然に表す文を選んでください。`]] as [string, string][], options: rotate(interpret ? cues : examples, index % examples.length), answer: interpret ? target.cue : target.example, explain: `「${target.label}」は、${target.cue}ための型です。` }
  })
  const dual = patterns.map((target, index) => ({ scene: `形式と機能 ${index + 1}`, lines: [['', `「${target.example}」では、[[0]]を使って[[1]]。`]] as [string, string][], blanks: [{ options: rotate(labels, index), answer: target.label, explain: `この形は「${target.label}」に属します。` }, { options: rotate(cues, index), answer: target.cue, explain: `伝達機能は「${target.cue}」です。` }] }))
  const guidedBlanks = Array.from({ length: 6 }, (_, index) => { const target = patterns[index % patterns.length]; return { options: rotate(examples, index % examples.length), answer: target.example, explain: `${target.label}：${target.pattern}` } })
  const freeItems = [...patterns.map((target, index) => ({ text: cloze(target.example, target.key, index), answer: target.key, explain: `「${target.label}」の中心表現は「${target.key}」です。型は ${target.pattern} です。` })), ...patterns.slice(0, 2).map((target, index) => ({ text: `「${target.label}」の基本構造を書いてください：[[${index + patterns.length}]]。`, answer: target.pattern, explain: `基本構造は ${target.pattern} です。` }))]

  return {
    slug: spec.slug, order: spec.order, color: spec.color, category: spec.category, level: spec.level,
    title: `日本語${spec.level}の${spec.shortTitle}`, shortTitle: spec.shortTitle,
    metaTitle: `${spec.shortTitle} ${spec.level}｜解説・練習・PDF`, description: spec.description,
    lead: `${spec.description} このレッスンでは、形だけを暗記せず、意味・接続・談話上の効果・文体を一つの判断として結び付けます。`,
    outcomes: [`実際の文脈で「${spec.shortTitle}」の主要な使い分けを見分けられます。`, `${spec.purpose}ために最も自然な形式を選べます。`, '時制、主体、範囲、話し手の立場がずれる誤りを説明して直せます。', `${spec.register}で、正確さと自然さを両立して使えます。`],
    guide: {
      goal: `「${spec.shortTitle}」を使い、${spec.purpose}。意味と文体を保ったまま、選択理由まで説明できることが目標です。`, model: spec.model, formula: spec.formula,
      decisions: [`まず伝えたい機能を定めます：${spec.purpose}。`, '接続する品詞と活用形を確認し、形の候補を絞ります。', '時点、主体、情報源、話し手の確信度を同時に点検します。', `${spec.register}に合う丁寧さと書き言葉・話し言葉の度合いを選びます。`, '中立的な言い方と比べ、この形式が加える含意を一文で説明します。'],
      table: [['機能', '構造', '例文'], ...patterns.map((item) => [item.label, item.pattern, item.example] as [string, string, string])], mistakes: patterns.map((item) => item.warning),
    },
    seo: [
      { heading: `${spec.shortTitle}の意味と使い分け`, paragraphs: [spec.description, `中心課題は「${spec.purpose}」ことです。正しい選択は事実内容だけでなく、論理関係、視点、確信度、対人距離まで示します。`], examples: patterns.map((item) => [item.example, item.cue]) },
      { heading: '形を段階的に組み立てる', paragraphs: [`実用的な公式は「${spec.formula}」です。前の文脈から接続形を決め、時間・態度・焦点を担う形を選びます。`, `モデル文「${spec.model}」で、全体の構造が実際の文にどう入るかを確認してください。逐語訳ではなく、伝えたい意味から日本語の形を再構成します。`], table: [['判断', '構造', '例文'], ...patterns.map((item) => [item.label, item.pattern, item.example])] },
      { heading: '近い表現を意味で選び分ける', paragraphs: ['似た表現でも、前提、確信、原因、譲歩、評価の置き方が異なります。先に必要な談話効果を言葉にしてから形式を選びます。', 'よい説明は、選んだ形が適切な理由と、別の形に替えたときに何が変わるかをともに示します。'], table: [['表したい意味', '推奨する型'], ...patterns.map((item) => [item.cue, item.label])] },
      { heading: '文体・談話効果・最終確認', paragraphs: [`この文法は、とくに${spec.register}で有効です。難しく見せる飾りではなく、読み手の解釈を助けるために使います。`, '最後に、主語の回収、時間基準、助詞、文末、段落とのつながりを確認します。曖昧さが残る場合は、より明示的な表現に直します。'] },
    ],
    visual: { mode: `japanese-advanced-${spec.slug}`, teacherLens: 'この地図は、伝達意図から接続条件、意味の対比、完成文へ進み、形式と機能を一目で結び付けます。', graphicPrompt: `${spec.shortTitle}の意図、構造、対比、最終確認を示すミニマルな日本語文法インフォグラフィック。`, scene: patterns.map((item) => [item.example, item.cue]), learnerModes: ['視覚型：関係を図にする', '分析型：形式の選択を説明する', '編集型：文体と文脈を整える'], practiceVerbs: ['見分ける', '比べる', '組み立てる', '変換する', '推敲する', '産出する'], reviewFocus: ['伝達意図', '接続と活用', '意味の対比', '文体と待遇'] },
    practice: { levels: [
      { id: 'level-1', title: '文脈で見分ける', tag: '6問', intro: '示された意図と文法が一致する文を選びます。', type: 'choice', items: recognition },
      { id: 'level-2', title: '形式と機能を結ぶ', tag: '6つの判断', intro: '各例文を文法の型と伝達機能に結び付けます。', type: 'dual', items: dual },
      { id: 'level-3', title: '談話の中で選ぶ', tag: '6つの文脈判断', intro: '複数の文を通して、形式と意味の一貫性を保ちます。', type: 'guidedText', scene: '文章編集', text: [...patterns.map((item, index) => `「${item.cue}」意味に合う文を選ぶ：[[${index}]]。`), ...patterns.map((item, index) => `「${item.pattern}」の構造に合う文を選ぶ：[[${index + patterns.length}]]。`)].join(' '), blanks: guidedBlanks },
      { id: 'level-4', title: '形を自力で復元する', tag: '5項目', intro: '選択肢なしで中心となる文法要素を完成させます。', type: 'freeText', scene: '自力復元', text: freeItems.map((item) => item.text).join(' '), blanks: freeItems.map(({ answer, explain }) => ({ answer, explain })) },
      { id: 'level-5', title: '文を変換する', tag: '4つの書き換え', intro: '指定された高度な型で意味を言い換えます。', type: 'write', items: Array.from({ length: 4 }, (_, index) => { const target = patterns[index % patterns.length]; return { scene: `書き換え ${index + 1}`, prompt: `「${target.label}」を使い、${target.cue}新しい文を書いてください。`, answer: target.example, accepted: [target.key], explain: `${target.pattern}。「${target.label}」の機能が明確になる形です。` } }) },
      { id: 'level-6', title: '実際の場面で産出する', tag: '3つの発展課題', intro: '現実的な文脈で文法を自律的に使います。', type: 'write', items: patterns.map((target, index) => ({ scene: `産出課題 ${index + 1}`, prompt: `関連する二文を書いてください。「${target.label}」で${target.cue}、ニュアンスの異なる中立表現も加えます。`, answer: `${target.example} 続けて、同じ内容を中立的な形でも述べます。`, accepted: [target.key], explain: `よい答えは ${target.pattern} を正確に使い、伝達意図を明確にします。` })) },
    ] },
  }
}

export function pattern(label: string, form: string, example: string, cue: string, key: string, warning?: string): JapaneseAdvancedPattern {
  return { label, pattern: form, example, cue, key, warning: warning ?? `「${label}」では、接続、主体、文体が文脈と一致しているか確認します。` }
}
