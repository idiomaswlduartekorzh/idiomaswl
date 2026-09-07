import type {
  BankCard,
  BankGap,
  ChoiceChallenge,
  ErrorChallenge,
  GapChallenge,
  TimelineChallenge,
} from './tense-quest-types.ts'
import { createSentenceProduction } from './sentence-production.ts'

export type StructureEditorialMicroSeed = {
  title: string
  cue: string
  segments: [string, string]
  verb: string
  answers: [string, ...string[]]
  distractors: [string, string, string]
}

export type StructureEditorialChoiceSeed = {
  cue: string
  segments: [string, string]
  answer: string
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
  production?: {
    sentence: string
    verb: string
    answers: [string, ...string[]]
  }
}

export type StructureEditorialFinalSeed = {
  verb?: string
  before: string
  after: string
  answer: string
  answers?: [string, ...string[]]
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
  finalTitle: string
  finalInstruction: string
  finalIntro: string
  finalBridge: (index: number) => string
}

type StructureEditorialPackInput<FormId extends string> = {
  namespace: string
  slug: string
  form: FormId
  focus: string
  rule: string
  ui: EditorialUi
  choices?: StructureEditorialChoiceSeed[]
  micro: StructureEditorialMicroSeed[]
  long: StructureEditorialGapSeed[]
  errors: StructureEditorialErrorSeed[]
  sequences: StructureEditorialSequenceSeed[]
  final: StructureEditorialFinalSeed[]
  choicePositions?: number[]
  finalOffset?: number
}

function rotate<T>(items: readonly T[], offset: number): T[] {
  const start = ((offset % items.length) + items.length) % items.length
  return [...items.slice(start), ...items.slice(0, start)]
}

const TIMELINE_ANSWER_POSITIONS = [1, 0, 2, 0, 2, 1, 2, 1, 0, 1] as const
const CHOICE_ANSWER_POSITIONS = [1, 0, 3, 0, 2, 1, 3, 2, 0, 1] as const

function timelineOffset(slug: string) {
  return [...slug].reduce((sum, character) => sum + (character.codePointAt(0) ?? 0), 0) % 3
}

function placeTimelineAnswer(events: readonly [string, string, string], target: 0 | 1 | 2, index: number, slug: string) {
  const answer = events[target]
  const distractors = events.filter((_, eventIndex) => eventIndex !== target)
  const options = [...distractors]
  const position = (TIMELINE_ANSWER_POSITIONS[index % TIMELINE_ANSWER_POSITIONS.length] + timelineOffset(slug)) % 3
  options.splice(position, 0, answer)
  return options
}

export function createStructureEditorialPack<FormId extends string>(input: StructureEditorialPackInput<FormId>) {
  const prefix = `${input.namespace}-${input.slug}`
  const choiceOffset = input.finalOffset ?? timelineOffset(input.slug) % 4
  const positions = CHOICE_ANSWER_POSITIONS.map((position) => (position + choiceOffset) % 4)
  const choiceSeeds: StructureEditorialChoiceSeed[] = input.choices ?? input.final.map((seed) => ({
    cue: input.focus,
    segments: [seed.before, seed.after],
    answer: seed.answer,
    distractors: seed.distractors,
  }))
  const productionCandidates = [
    ...input.micro.map(({ verb, answers }) => ({ verb, answers })),
    ...input.long.flatMap(({ entries }) => entries.map(([verb, answers]) => ({ verb, answers }))),
    ...input.final
      .filter((seed): seed is StructureEditorialFinalSeed & { verb: string } => Boolean(seed.verb))
      .map(({ verb, answer, answers }) => ({ verb, answers: answers ?? [answer] as [string] })),
  ]
  const inferProduction = (sentence: string) => {
    const normalized = sentence.toLocaleLowerCase()
    const candidate = productionCandidates
      .flatMap(({ verb, answers }) => answers.map((answer) => ({ verb, answers, answer })))
      .filter(({ answer }) => normalized.includes(answer.toLocaleLowerCase()))
      .sort((left, right) => right.answer.length - left.answer.length)[0]
    return candidate
      ? createSentenceProduction(sentence, candidate.verb, candidate.answers)
      : createSentenceProduction(sentence)
  }
  const choices: ChoiceChallenge<FormId>[] = choiceSeeds.map((seed, index) => {
    const options = [...seed.distractors]
    options.splice(positions[index % positions.length], 0, seed.answer)
    return {
      id: `${prefix}-choice-editorial-${index + 1}`,
      tenses: [input.form],
      focus: input.focus,
      prompt: input.ui.choose(seed.cue),
      context: `${seed.segments[0]}___${seed.segments[1]}`,
      options,
      answer: seed.answer,
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
        production: seed.production
          ? createSentenceProduction(seed.production.sentence, seed.production.verb, seed.production.answers)
          : inferProduction(answer),
      }],
      options: placeTimelineAnswer(seed.events, seed.target, index, input.slug),
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
    candidateCardIds: rotate([1, 2, 3, 4], index + (input.finalOffset ?? 0)).map((candidate) => `${prefix}-final-${index + 1}-card-${candidate}`),
    standalone: { before: seed.before, after: seed.after },
  }))
  const finalStory: GapChallenge<FormId> = {
    id: `${prefix}-final-story`,
    title: input.ui.finalTitle,
    focus: input.focus,
    instruction: input.ui.finalInstruction,
    segments: input.final.map((seed, index) => `${index === 0 ? input.ui.finalIntro : input.ui.finalBridge(index)}${seed.before}`)
      .concat(input.final.at(-1)?.after ?? ''),
    gaps: input.final.map((seed, index) => ({
      id: `${prefix}-final-story-gap-${index + 1}`,
      tense: input.form,
      verb: seed.verb ?? input.focus,
      answers: seed.answers ?? [seed.answer],
    })),
    explanation: `${input.rule} ${input.ui.writtenSuffix}`,
  }

  for (let index = 0; index < input.final.length - 1; index += 1) {
    finalStory.segments[index + 1] = `${input.final[index].after}${finalStory.segments[index + 1]}`
  }

  return { choices, micro, long, errors, timelines, finalCards, finalGaps, finalStory }
}
