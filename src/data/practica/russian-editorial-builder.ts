import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { RussianFormId } from './russian-structure-quest-config.ts'

export type RussianEditorialMicroSeed = StructureEditorialMicroSeed
export type RussianEditorialGapSeed = StructureEditorialGapSeed
export type RussianEditorialErrorSeed = StructureEditorialErrorSeed
export type RussianEditorialSequenceSeed = StructureEditorialSequenceSeed
export type RussianEditorialFinalSeed = StructureEditorialFinalSeed

export type RussianCompactMicro = [
  title: string, cue: string, before: string, after: string, verb: string,
  answer: string | [string, ...string[]], distractor1: string, distractor2: string, distractor3: string,
]
export type RussianCompactStory = [
  title: string,
  segments: [string, string, string, string],
  verbs: [string, string, string],
  answers: [string, string, string],
  wrong: 0 | 1 | 2,
  wrongForm: string,
  reason: string,
  events: [string, string, string],
  target: 0 | 1 | 2,
]
export type RussianCompactFinal = [before: string, after: string, answer: string, distractor1: string, distractor2: string, distractor3: string]

const positionLabels = ['открывает последовательность', 'стоит в середине последовательности', 'завершает последовательность'] as const

export function createRussianEditorialPack(input: {
  slug: string
  form: RussianFormId
  focus: string
  rule: string
  micro: RussianEditorialMicroSeed[]
  long: RussianEditorialGapSeed[]
  errors: RussianEditorialErrorSeed[]
  sequences: RussianEditorialSequenceSeed[]
  final: RussianEditorialFinalSeed[]
}) {
  const secondHalf = new Set(['conditional-present', 'conditional-past', 'imperative-imperfective', 'imperative-perfective', 'infinitive-aspect'])
  const choiceOffset = secondHalf.has(input.slug) ? 0 : 2
  return createStructureEditorialPack({
    namespace: 'ru', ...input,
    choicePositions: Array.from({ length: 10 }, (_, index) => (index + choiceOffset) % 4),
    finalOffset: choiceOffset,
    ui: {
      choose: (cue) => `Выберите форму, которая выражает ${cue}.`,
      write: (verb) => `Поставьте «${verb}» в нужную форму и напишите всю глагольную конструкцию.`,
      error: 'Найдите единственную неверную глагольную форму и полностью исправьте её.',
      sequenceTitle: (index) => `Связная последовательность · ${index}`,
      sequenceContext: ([first, second, third]) => `${first}. Затем ${second.charAt(0).toLocaleLowerCase('ru')}${second.slice(1)}. Наконец ${third.charAt(0).toLocaleLowerCase('ru')}${third.slice(1)}.`,
      sequenceQuestion: (position) => `Какое событие ${positionLabels[position]}?`,
      sequenceHint: 'Во всех вариантах используется целевой вид или конструкция. Восстановите смысл и ход событий.',
      sequenceExplanation: (answer) => `«${answer}» занимает это место благодаря смысловой последовательности, а не внешнему совпадению формы.`,
      writtenSuffix: 'Контекст содержит все слова вне требуемой глагольной конструкции; частица «бы» входит в ответ, если проверяется условность.',
    },
  })
}

export function createRussianCompactPack(input: {
  slug: string
  form: RussianFormId
  focus: string
  rule: string
  micro: RussianCompactMicro[]
  stories: RussianCompactStory[]
  final: RussianCompactFinal[]
}) {
  const micro: RussianEditorialMicroSeed[] = input.micro.map(([title, cue, before, after, verb, answer, ...distractors]) => ({
    title, cue, segments: [before, after], verb, answers: Array.isArray(answer) ? answer : [answer], distractors: distractors as [string, string, string],
  }))
  const long: RussianEditorialGapSeed[] = input.stories.map(([title, segments, verbs, answers]) => ({
    title, instruction: 'Вставьте три формы в единый связный эпизод.', segments,
    entries: [[verbs[0], [answers[0]]], [verbs[1], [answers[1]]], [verbs[2], [answers[2]]]],
  }))
  const errors: RussianEditorialErrorSeed[] = input.stories.map(([title, segments, , answers, wrong, wrongForm, reason]) => ({
    title, pieces: answers.map((answer, index) => [segments[index], index === wrong ? wrongForm : answer]) as RussianEditorialErrorSeed['pieces'],
    after: segments[3], wrong, answers: [answers[wrong]], reason,
  }))
  const sequences: RussianEditorialSequenceSeed[] = input.stories.map(([, , , , , , , events, target]) => ({ events, target }))
  const final: RussianEditorialFinalSeed[] = input.final.map(([before, after, answer, ...distractors]) => ({ before, after, answer, distractors: distractors as [string, string, string] }))
  return createRussianEditorialPack({ ...input, micro, long, errors, sequences, final })
}
