import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { JapaneseFormId } from './japanese-structure-quest.ts'

export type JapaneseEditorialMicroSeed = StructureEditorialMicroSeed
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
export type JapaneseCompactFinal = [string, string, string, string, string, string]

const positionLabels = ['最初', '二番目', '最後'] as const
const asAnswers = (answer: JapaneseAnswer): [string, ...string[]] => Array.isArray(answer) ? answer : [answer]

export function createJapaneseEditorialPack(input: {
  slug: string
  form: JapaneseFormId
  focus: string
  rule: string
  micro: JapaneseCompactMicro[]
  stories: JapaneseCompactStory[]
  final: JapaneseCompactFinal[]
}) {
  const micro: JapaneseEditorialMicroSeed[] = input.micro.map(([title, cue, before, after, verb, answer, ...distractors]) => ({
    title, cue, segments:[before, after], verb, answers:asAnswers(answer), distractors:distractors as [string, string, string],
  }))
  const long: JapaneseEditorialGapSeed[] = input.stories.map(([title, segments, verbs, answers]) => ({
    title, instruction:'一つのまとまった場面になるように、三つの形を完成させてください。', segments,
    entries:[[verbs[0], asAnswers(answers[0])], [verbs[1], asAnswers(answers[1])], [verbs[2], asAnswers(answers[2])]],
  }))
  const errors: JapaneseEditorialErrorSeed[] = input.stories.map(([title, segments, , answers, wrong, wrongForm, reason]) => ({
    title, pieces:answers.map((answer, index) => [segments[index], index === wrong ? wrongForm : asAnswers(answer)[0]]) as JapaneseEditorialErrorSeed['pieces'],
    after:segments[3], wrong, answers:asAnswers(answers[wrong]), reason,
  }))
  const sequences: JapaneseEditorialSequenceSeed[] = input.stories.map(([, , , , , , , events, target]) => ({ events, target }))
  const final: JapaneseEditorialFinalSeed[] = input.final.map(([before, after, answer, ...distractors]) => ({ before, after, answer, distractors:distractors as [string, string, string] }))
  const secondHalf = new Set(['result-state','experience','plan-intention','tara-conditional','request-prohibition'])
  const choiceOffset = secondHalf.has(input.slug) ? 0 : 2
  return createStructureEditorialPack({
    namespace:'ja', slug:input.slug, form:input.form, focus:input.focus, rule:input.rule,
    micro, long, errors, sequences, final,
    choicePositions:Array.from({ length:10 }, (_, index) => (index + choiceOffset) % 4), finalOffset:choiceOffset,
    ui:{
      choose:(cue) => `${cue}を表す形を選んでください。`,
      write:(verb) => `「${verb}」を文脈に合う丁寧な形にして、必要な表現全体を書いてください。`,
      error:'一つだけ不適切な動詞表現を選び、正しい形を全部書いてください。',
      sequenceTitle:(index) => `意味の流れ · ${index}`,
      sequenceContext:([first, second, third]) => `${first}。次に、${second}。最後に、${third}。`,
      sequenceQuestion:(position) => `${positionLabels[position]}の出来事はどれですか。`,
      sequenceHint:'すべての選択肢に同じ目標形式があります。形だけでなく、場面の流れで判断してください。',
      sequenceExplanation:(answer) => `「${answer}」は、出来事の意味の流れによってこの位置に入ります。`,
      writtenSuffix:'空欄の外にある語を足す必要はありません。経験・予定・依頼などは構文全体を答えます。',
    },
  })
}
