import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialChoiceSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { RussianFormId } from './russian-structure-quest-config.ts'

export type RussianEditorialMicroSeed = StructureEditorialMicroSeed
export type RussianEditorialChoiceSeed = StructureEditorialChoiceSeed
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
  production?: {
    verb?: string
    answers?: [string, ...string[]]
  },
]
export type RussianCompactFinal = [before: string, after: string, answer: string, distractor1: string, distractor2: string, distractor3: string, verb?: string]

const positionLabels = ['открывает последовательность', 'стоит в середине последовательности', 'завершает последовательность'] as const
let compactPackIndex = 0

export function createRussianEditorialPack(input: {
  slug: string
  form: RussianFormId
  focus: string
  rule: string
  choices?: RussianEditorialChoiceSeed[]
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
      sequenceContext: () => 'Восстановите последовательность по подготовке, действию и результату. Готовый порядок намеренно не показан.',
      sequenceQuestion: (position) => `Какое событие ${positionLabels[position]}?`,
      sequenceHint: 'Во всех вариантах используется целевой вид или конструкция. Восстановите смысл и ход событий.',
      sequenceExplanation: (answer) => `«${answer}» занимает это место благодаря смысловой последовательности, а не внешнему совпадению формы.`,
      writtenSuffix: 'Контекст содержит все слова вне требуемой глагольной конструкции; частица «бы» входит в ответ, если проверяется условность.',
      finalTitle: `Итоговое досье · ${input.focus}`,
      finalInstruction: 'Напишите десять полных глагольных форм. В каждой записи есть собственная временная, видовая или функциональная опора.',
      finalIntro: 'Первая запись полевого досье сообщает: ',
      finalBridge: (index) => ` Запись ${index + 1}: `,
    },
  })
}

export function createRussianCompactPack(input: {
  slug: string
  form: RussianFormId
  focus: string
  rule: string
  choices?: RussianEditorialChoiceSeed[]
  micro: RussianCompactMicro[]
  stories: RussianCompactStory[]
  final: RussianCompactFinal[]
}) {
  const errorOffset = compactPackIndex % 3
  compactPackIndex += 1
  const micro: RussianEditorialMicroSeed[] = input.micro.map(([title, cue, before, after, verb, answer, ...distractors]) => ({
    title, cue, segments: [before, after], verb, answers: Array.isArray(answer) ? answer : [answer], distractors: distractors as [string, string, string],
  }))
  const long: RussianEditorialGapSeed[] = input.stories.map(([title, segments, verbs, answers]) => ({
    title, instruction: 'Вставьте три формы в единый связный эпизод.', segments,
    entries: [[verbs[0], [answers[0]]], [verbs[1], [answers[1]]], [verbs[2], [answers[2]]]],
  }))
  const errors: RussianEditorialErrorSeed[] = input.final.map((_, index) => {
    const selected = [input.final[index], input.final[(index + 3) % input.final.length], input.final[(index + 6) % input.final.length]]
    const wrong = ((index + errorOffset) % 3) as 0 | 1 | 2
    return {
      title: `Редакторское досье · ${index + 1}`,
      pieces: selected.map((entry, position) => [
        `${position === 0 ? '' : `${selected[position - 1][1]} `}${entry[0]}`,
        position === wrong ? entry[3 + (index % 3)] : entry[2],
      ]) as RussianEditorialErrorSeed['pieces'],
      after: selected[2][1], wrong, answers: [selected[wrong][2]],
      reason: 'только исправленная форма согласуется с временными и видовыми опорами этой записи',
    }
  })
  const sequences: RussianEditorialSequenceSeed[] = input.stories.map(([, , verbs, answers, , , , events, target, production]) => ({
    events,
    target,
    production: { sentence: events[target], verb: production?.verb ?? verbs[target], answers: [answers[target]] },
  }))
  const final: RussianEditorialFinalSeed[] = input.final.map(([before, after, answer, distractor1, distractor2, distractor3, verb]) => ({
    before, after, answer, verb, distractors: [distractor1, distractor2, distractor3],
  }))
  const pack = createRussianEditorialPack({ ...input, choices: input.choices, micro, long, errors, sequences, final })
  input.stories.forEach((story, index) => {
    const acceptedAnswers = story[9]?.answers
    const production = pack.timelines[index]?.slots[0]?.production
    if (acceptedAnswers && production) production.answers = acceptedAnswers
  })
  return pack
}
