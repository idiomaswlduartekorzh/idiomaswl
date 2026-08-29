import type {
  BankCard,
  BankGap,
  ChoiceChallenge,
  ErrorChallenge,
  GapChallenge,
  TimelineChallenge,
} from './tense-quest-types.ts'
import type { EnglishFormId } from './english-tense-quest.ts'

export type EnglishEditorialMicroSeed = {
  title: string
  cue: string
  segments: [string, string]
  verb: string
  answers: [string, ...string[]]
  distractors: [string, string, string]
}

export type EnglishEditorialGapSeed = {
  title: string
  instruction: string
  segments: string[]
  entries: Array<[verb: string, answers: [string, ...string[]]]>
}

export type EnglishEditorialErrorSeed = {
  title: string
  pieces: Array<[before: string, shown: string]>
  after: string
  wrong: number
  answers: [string, ...string[]]
  reason: string
}

export type EnglishEditorialSequenceSeed = {
  events: [string, string, string]
  target: 0 | 1 | 2
}

export type EnglishEditorialFinalSeed = {
  before: string
  after: string
  answer: string
  distractors: [string, string, string]
}

type EnglishEditorialPackInput = {
  slug: string
  form: EnglishFormId
  focus: string
  rule: string
  micro: EnglishEditorialMicroSeed[]
  long: EnglishEditorialGapSeed[]
  errors: EnglishEditorialErrorSeed[]
  sequences: EnglishEditorialSequenceSeed[]
  final: EnglishEditorialFinalSeed[]
}

function rotate<T>(items: readonly T[], offset: number): T[] {
  const start = ((offset % items.length) + items.length) % items.length
  return [...items.slice(start), ...items.slice(0, start)]
}

export function createEnglishEditorialPack(input: EnglishEditorialPackInput) {
  const prefix = `en-${input.slug}`
  const choices: ChoiceChallenge<EnglishFormId>[] = input.micro.map((seed, index) => {
    const options = [...seed.distractors]
    const balancedPositions = [0, 1, 2, 3, 1, 2, 0, 1, 2, 3]
    options.splice(balancedPositions[index % balancedPositions.length], 0, seed.answers[0])
    return {
      id: `${prefix}-choice-editorial-${index + 1}`,
      tenses: [input.form],
      focus: input.focus,
      prompt: `Choose the form that expresses ${seed.cue}.`,
      context: `${seed.segments[0]}___${seed.segments[1]}`,
      options,
      answer: seed.answers[0],
      explanation: input.rule,
    }
  })
  const micro: GapChallenge<EnglishFormId>[] = input.micro.map((seed, index) => ({
    id: `${prefix}-micro-editorial-${index + 1}`,
    title: seed.title,
    focus: input.focus,
    instruction: `Write the complete form of “${seed.verb}”.`,
    segments: seed.segments,
    gaps: [{
      id: `${prefix}-micro-editorial-${index + 1}-gap`,
      tense: input.form,
      verb: seed.verb,
      answers: seed.answers,
    }],
    explanation: `${input.rule} The context supplies every word outside the verb phrase.`,
  }))
  const long: GapChallenge<EnglishFormId>[] = input.long.map((seed, index) => ({
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
    explanation: `${input.rule} All three gaps belong to one connected scene.`,
  }))
  const errors: ErrorChallenge<EnglishFormId>[] = input.errors.map((seed, index) => ({
    id: `${prefix}-error-editorial-${index + 1}`,
    tense: input.form,
    title: seed.title,
    focus: input.focus,
    instruction: 'Select the only verb form that breaks the text, then rewrite it correctly.',
    chunks: seed.pieces.map(([before, form], chunkIndex) => ({
      before,
      form,
      id: `${prefix}-error-editorial-${index + 1}-token-${chunkIndex + 1}`,
    })),
    after: seed.after,
    wrongId: `${prefix}-error-editorial-${index + 1}-token-${seed.wrong + 1}`,
    answers: seed.answers,
    explanation: `${input.rule} Here, ${seed.reason}.`,
  }))
  const timelines: TimelineChallenge<EnglishFormId>[] = input.sequences.map((seed, index) => {
    const answer = seed.events[seed.target]
    const positions = ['opens', 'occupies the middle of', 'closes']
    return {
      id: `${prefix}-sequence-editorial-${index + 1}`,
      title: `Connected sequence · ${index + 1}`,
      focus: input.focus,
      context: `${seed.events[0]}. Then ${seed.events[1].charAt(0).toLowerCase()}${seed.events[1].slice(1)}. Finally ${seed.events[2].charAt(0).toLowerCase()}${seed.events[2].slice(1)}.`,
      slots: [{
        id: `${prefix}-sequence-editorial-${index + 1}-slot`,
        tense: input.form,
        label: `Which event ${positions[seed.target]} the sequence?`,
        hint: 'Every option uses the same target form; recover meaning and order from the narrative.',
        answer,
      }],
      options: rotate(seed.events, index + 1),
      explanation: `“${answer}” is identified by the sequence, not by a unique verb form among the options.`,
    }
  })
  const finalCards: BankCard[] = input.final.flatMap((seed, index) => [seed.answer, ...seed.distractors].map((text, candidateIndex) => ({
    id: `${prefix}-final-${index + 1}-card-${candidateIndex + 1}`,
    text,
  })))
  const finalGaps: BankGap<EnglishFormId>[] = input.final.map((seed, index) => ({
    id: `${prefix}-final-gap-${index + 1}`,
    tenseId: input.form,
    tense: input.focus,
    answerCardId: `${prefix}-final-${index + 1}-card-1`,
    candidateCardIds: rotate([1, 2, 3, 4], index).map((candidate) => `${prefix}-final-${index + 1}-card-${candidate}`),
    standalone: { before: seed.before, after: seed.after },
  }))

  return { choices, micro, long, errors, timelines, finalCards, finalGaps }
}
