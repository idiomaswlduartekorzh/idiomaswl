import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { RussianFormId } from './russian-structure-quest.ts'

export type RussianEditorialMicroSeed = StructureEditorialMicroSeed
export type RussianEditorialGapSeed = StructureEditorialGapSeed
export type RussianEditorialErrorSeed = StructureEditorialErrorSeed
export type RussianEditorialSequenceSeed = StructureEditorialSequenceSeed
export type RussianEditorialFinalSeed = StructureEditorialFinalSeed

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
