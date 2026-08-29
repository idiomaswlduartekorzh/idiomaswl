import type {
  BankCard,
  BankGap,
  ChoiceChallenge,
  ErrorChallenge,
  GapChallenge,
  TimelineChallenge,
} from './tense-quest-types.ts'

export type StructureEditorialMicroSeed = {
  title: string
  cue: string
  segments: [string, string]
  verb: string
  answers: [string, ...string[]]
  distractors: [string, string, string]
}

export type StructureEditorialGapSeed = {
  title: string
  instruction: string
  segments: [string, string, string, string]
  entries: [
    [verb: string, answers: [string, ...string[]]],
    [verb: string, answers: [string, ...string[]]],
    [verb: string, answers: [string, ...string[]]],
  ]
}

export type StructureEditorialErrorSeed = {
  title: string
  pieces: [[before: string, shown: string], [before: string, shown: string], [before: string, shown: string]]
  after: string
  wrong: 0 | 1 | 2
  answers: [string, ...string[]]
  reason: string
}

export type StructureEditorialSequenceSeed = {
  events: [string, string, string]
  target: 0 | 1 | 2
}

export type StructureEditorialFinalSeed = {
  before: string
  after: string
  answer: string
  distractors: [string, string, string]
}

type EditorialUi = {
  choose: (cue: string) => string
  write: (verb: string) => string
  error: string
  sequenceTitle: (index: number) => string
  sequenceContext: (events: [string, string, string]) => string
  sequenceQuestion: (position: 0 | 1 | 2) => string
  sequenceHint: string
  sequenceExplanation: (answer: string) => string
  writtenSuffix: string
}

type StructureEditorialPackInput<FormId extends string> = {
  namespace: string
  slug: string
  form: FormId
  focus: string
  rule: string
  ui: EditorialUi
  micro: StructureEditorialMicroSeed[]
  long: StructureEditorialGapSeed[]
  errors: StructureEditorialErrorSeed[]
  sequences: StructureEditorialSequenceSeed[]
  final: StructureEditorialFinalSeed[]
  choicePositions?: number[]
}

function rotate<T>(items: readonly T[], offset: number): T[] {
  const start = ((offset % items.length) + items.length) % items.length
  return [...items.slice(start), ...items.slice(0, start)]
}

export function createStructureEditorialPack<FormId extends string>(input: StructureEditorialPackInput<FormId>) {
  const prefix = `${input.namespace}-${input.slug}`
  const positions = input.choicePositions ?? [0, 1, 2, 3, 1, 2, 0, 1, 2, 3]
  const choices: ChoiceChallenge<FormId>[] = input.micro.map((seed, index) => {
    const options = [...seed.distractors]
    options.splice(positions[index % positions.length], 0, seed.answers[0])
    return {
      id: `${prefix}-choice-editorial-${index + 1}`,
      tenses: [input.form],
      focus: input.focus,
      prompt: input.ui.choose(seed.cue),
      context: `${seed.segments[0]}___${seed.segments[1]}`,
      options,
      answer: seed.answers[0],
      explanation: input.rule,
    }
  })
  const micro: GapChallenge<FormId>[] = input.micro.map((seed, index) => ({
    id: `${prefix}-micro-editorial-${index + 1}`,
    title: seed.title,
    focus: input.focus,
    instruction: input.ui.write(seed.verb),
    segments: seed.segments,
    gaps: [{
      id: `${prefix}-micro-editorial-${index + 1}-gap`,
      tense: input.form,
      verb: seed.verb,
      answers: seed.answers,
    }],
    explanation: `${input.rule} ${input.ui.writtenSuffix}`,
  }))
  const long: GapChallenge<FormId>[] = input.long.map((seed, index) => ({
    id: `${prefix}-long-editorial-${index + 1}`,
    title: seed.title,
    focus: input.focus,
    instruction: seed.instruction,
    segments: seed.segments,
    gaps: seed.entries.map(([verb, answers], gapIndex) => ({
      id: `${prefix}-long-editorial-${index + 1}-gap-${gapIndex + 1}`,
      tense: input.form,
      verb,
      answers,
    })),
    explanation: `${input.rule} ${input.ui.writtenSuffix}`,
  }))
  const errors: ErrorChallenge<FormId>[] = input.errors.map((seed, index) => ({
    id: `${prefix}-error-editorial-${index + 1}`,
    tense: input.form,
    title: seed.title,
    focus: input.focus,
    instruction: input.ui.error,
    chunks: seed.pieces.map(([before, form], chunkIndex) => ({
      before,
      form,
      id: `${prefix}-error-editorial-${index + 1}-token-${chunkIndex + 1}`,
    })),
    after: seed.after,
    wrongId: `${prefix}-error-editorial-${index + 1}-token-${seed.wrong + 1}`,
    answers: seed.answers,
    explanation: `${input.rule} ${seed.reason}`,
  }))
  const timelines: TimelineChallenge<FormId>[] = input.sequences.map((seed, index) => {
    const answer = seed.events[seed.target]
    return {
      id: `${prefix}-sequence-editorial-${index + 1}`,
      title: input.ui.sequenceTitle(index + 1),
      focus: input.focus,
      context: input.ui.sequenceContext(seed.events),
      slots: [{
        id: `${prefix}-sequence-editorial-${index + 1}-slot`,
        tense: input.form,
        label: input.ui.sequenceQuestion(seed.target),
        hint: input.ui.sequenceHint,
        answer,
      }],
      options: rotate(seed.events, index + 1),
      explanation: input.ui.sequenceExplanation(answer),
    }
  })
  const finalCards: BankCard[] = input.final.flatMap((seed, index) => [seed.answer, ...seed.distractors].map((text, candidateIndex) => ({
    id: `${prefix}-final-${index + 1}-card-${candidateIndex + 1}`,
    text,
  })))
  const finalGaps: BankGap<FormId>[] = input.final.map((seed, index) => ({
    id: `${prefix}-final-gap-${index + 1}`,
    tenseId: input.form,
    tense: input.focus,
    answerCardId: `${prefix}-final-${index + 1}-card-1`,
    candidateCardIds: rotate([1, 2, 3, 4], index).map((candidate) => `${prefix}-final-${index + 1}-card-${candidate}`),
    standalone: { before: seed.before, after: seed.after },
  }))

  return { choices, micro, long, errors, timelines, finalCards, finalGaps }
}
