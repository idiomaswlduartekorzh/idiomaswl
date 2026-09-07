import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialChoiceSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { JapaneseFormId } from './japanese-structure-quest-config.ts'

export type JapaneseEditorialMicroSeed = StructureEditorialMicroSeed
export type JapaneseEditorialChoiceSeed = StructureEditorialChoiceSeed
export type JapaneseEditorialGapSeed = StructureEditorialGapSeed
export type JapaneseEditorialErrorSeed = StructureEditorialErrorSeed
export type JapaneseEditorialSequenceSeed = StructureEditorialSequenceSeed
export type JapaneseEditorialFinalSeed = StructureEditorialFinalSeed
type JapaneseAnswer = string | [string, ...string[]]
export type JapaneseCompactMicro = [string, string, string, string, string, JapaneseAnswer, string, string, string]
export type JapaneseCompactStory = [
  string, [string, string, string, string], [string, string, string], [JapaneseAnswer, JapaneseAnswer, JapaneseAnswer],
  0 | 1 | 2, string, string, [string, string, string], 0 | 1 | 2,
]
export type JapaneseCompactFinal = [string, string, JapaneseAnswer, string, string, string, string?]

const positionLabels = ['最初', '二番目', '最後'] as const
const asAnswers = (answer: JapaneseAnswer): [string, ...string[]] => Array.isArray(answer) ? answer : [answer]
let compactPackIndex = 0

export function createJapaneseEditorialPack(input: {
  slug: string
  form: JapaneseFormId
  focus: string
  rule: string
  choices?: JapaneseEditorialChoiceSeed[]
  micro: JapaneseCompactMicro[]
  stories: JapaneseCompactStory[]
  final: JapaneseCompactFinal[]
}) {
  const errorOffset = compactPackIndex % 3
  compactPackIndex += 1
  const micro: JapaneseEditorialMicroSeed[] = input.micro.map(([title, cue, before, after, verb, answer, ...distractors]) => ({
    title, cue, segments:[before, after], verb, answers:asAnswers(answer), distractors:distractors as [string, string, string],
  }))
  const long: JapaneseEditorialGapSeed[] = input.stories.map(([title, segments, verbs, answers]) => ({
    title, instruction:'一つのまとまった場面になるように、三つの形を完成させてください。', segments,
    entries:[[verbs[0], asAnswers(answers[0])], [verbs[1], asAnswers(answers[1])], [verbs[2], asAnswers(answers[2])]],
  }))
  const errors: JapaneseEditorialErrorSeed[] = input.final.map((_, index) => {
    const selected = [input.final[index], input.final[(index + 3) % input.final.length], input.final[(index + 6) % input.final.length]]
    const wrong = ((index + errorOffset) % 3) as 0 | 1 | 2
    return {
      title:`編集ドシエ・${index + 1}`,
      pieces:selected.map((entry, position) => [
        `${position === 0 ? '' : `${selected[position - 1][1]} `}${entry[0]}`,
        position === wrong ? entry[3 + (index % 3)] : asAnswers(entry[2])[0],
      ]) as JapaneseEditorialErrorSeed['pieces'],
      after:selected[2][1], wrong, answers:asAnswers(selected[wrong][2]),
      reason:'この記録の時・相・機能の手がかりに合うのは修正後の形だけです。',
    }
  })
  const sequences: JapaneseEditorialSequenceSeed[] = input.stories.map(([, , verbs, answers, , , , events, target]) => ({
    events,
    target,
    production: { sentence: events[target], verb: verbs[target], answers: asAnswers(answers[target]) },
  }))
  const final: JapaneseEditorialFinalSeed[] = input.final.map(([before, after, answer, distractor1, distractor2, distractor3, verb]) => ({
    before, after, answer:asAnswers(answer)[0], answers:asAnswers(answer), verb, distractors:[distractor1,distractor2,distractor3],
  }))
  const secondHalf = new Set(['result-state','experience','plan-intention','tara-conditional','request-prohibition'])
  const choiceOffset = secondHalf.has(input.slug) ? 0 : 2
  return createStructureEditorialPack({
    namespace:'ja', slug:input.slug, form:input.form, focus:input.focus, rule:input.rule,
    choices:input.choices, micro, long, errors, sequences, final,
    choicePositions:Array.from({ length:10 }, (_, index) => (index + choiceOffset) % 4), finalOffset:choiceOffset,
    ui:{
      choose:(cue) => `${cue}を表す形を選んでください。`,
      write:(verb) => `「${verb}」を文脈に合う丁寧な形にして、必要な表現全体を書いてください。`,
      error:'一つだけ不適切な動詞表現を選び、正しい形を全部書いてください。',
      sequenceTitle:(index) => `意味の流れ · ${index}`,
      sequenceContext:() => '準備・行動・結果の関係から順序を復元してください。完成した順序は意図的に表示していません。',
      sequenceQuestion:(position) => `${positionLabels[position]}の出来事はどれですか。`,
      sequenceHint:'すべての選択肢に同じ目標形式があります。形だけでなく、場面の流れで判断してください。',
      sequenceExplanation:(answer) => `「${answer}」は、出来事の意味の流れによってこの位置に入ります。`,
      writtenSuffix:'空欄の外にある語を足す必要はありません。経験・予定・依頼などは構文全体を答えます。',
      finalTitle:`最終ドシエ・${input.focus}`,
      finalInstruction:'十か所の動詞表現をすべて書いてください。それぞれの記録に時・相・機能の手がかりがあります。',
      finalIntro:'調査ドシエの最初の記録です。',
      finalBridge:(index) => ` 記録${index + 1}：`,
    },
  })
}
