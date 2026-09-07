import type {
  BankCard,
  BankGap,
  ChoiceChallenge,
  ErrorChallenge,
  GapChallenge,
  TimelineChallenge,
} from './tense-quest-types.ts'
import type { EnglishFormId } from './english-tense-quest-config.ts'
import { createSentenceProduction } from './sentence-production.ts'

export type EnglishEditorialMicroSeed = {
  title: string
  cue: string
  segments: [string, string]
  verb: string
  answers: [string, ...string[]]
  distractors: [string, string, string]
}

export type EnglishEditorialChoiceSeed = {
  cue: string
  segments: [string, string]
  answer: string
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
  productionSentence?: string
}

export type EnglishEditorialFinalSeed = {
  verb?: string
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
  choices?: EnglishEditorialChoiceSeed[]
  micro: EnglishEditorialMicroSeed[]
  long: EnglishEditorialGapSeed[]
  errors: EnglishEditorialErrorSeed[]
  sequences: EnglishEditorialSequenceSeed[]
  final: EnglishEditorialFinalSeed[]
  choicePositions?: number[]
}

function rotate<T>(items: readonly T[], offset: number): T[] {
  const start = ((offset % items.length) + items.length) % items.length
  return [...items.slice(start), ...items.slice(0, start)]
}

const TIMELINE_ANSWER_POSITIONS = [1, 0, 2, 0, 2, 1, 2, 1, 0, 1] as const
const CHOICE_ANSWER_POSITIONS = [1, 0, 3, 0, 2, 1, 3, 2, 0, 1] as const
const CHOICE_OFFSET_TWO_FORMS = new Set([
  'present-simple',
  'present-continuous',
  'present-perfect',
  'present-perfect-continuous',
  'past-simple',
  'past-continuous',
  'past-perfect',
  'past-perfect-continuous',
  'imperative',
])

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

function findSequenceProduction(
  input: EnglishEditorialPackInput,
  events: readonly string[],
  target: 0 | 1 | 2,
) {
  const verbCandidates = [
    ...input.micro.map(({ verb, answers }) => ({ verb, answers })),
    ...input.long.flatMap(({ entries }) => entries.map(([verb, answers]) => ({ verb, answers }))),
    ...input.final
      .filter((seed): seed is EnglishEditorialFinalSeed & { verb: string } => Boolean(seed.verb))
      .map(({ verb, answer }) => ({ verb, answers: [answer] as [string] })),
  ]
  const orderedEvents = [events[target], ...events.filter((_, index) => index !== target)]
  for (const event of orderedEvents) {
    const candidate = verbCandidates.find(({ answers }) => answers.some((answer) => (
      event.toLocaleLowerCase().includes(answer.toLocaleLowerCase())
    )))
    if (candidate) return createSentenceProduction(event, candidate.verb, candidate.answers)
  }
  return createSentenceProduction(events)
}

export function createEnglishEditorialPack(input: EnglishEditorialPackInput) {
  const prefix = `en-${input.slug}`
  const choiceSeeds: EnglishEditorialChoiceSeed[] = input.choices ?? input.final.map((seed) => ({
    cue: input.focus,
    segments: [seed.before, seed.after],
    answer: seed.answer,
    distractors: seed.distractors,
  }))
  const choices: ChoiceChallenge<EnglishFormId>[] = choiceSeeds.map((seed, index) => {
    const options = [...seed.distractors]
    const choiceOffset = CHOICE_OFFSET_TWO_FORMS.has(input.slug) ? 2 : 0
    const balancedPositions = CHOICE_ANSWER_POSITIONS.map((position) => (position + choiceOffset) % 4)
    options.splice(balancedPositions[index % balancedPositions.length], 0, seed.answer)
    return {
      id: `${prefix}-choice-editorial-${index + 1}`,
      tenses: [input.form],
      focus: input.focus,
      prompt: `Choose the form that expresses ${seed.cue}.`,
      context: `${seed.segments[0]}___${seed.segments[1]}`,
      options,
      answer: seed.answer,
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
      context: 'Reconstruct the sequence from preparation, action and result. The ordered narrative is intentionally hidden.',
      slots: [{
        id: `${prefix}-sequence-editorial-${index + 1}-slot`,
        tense: input.form,
        label: `Which event ${positions[seed.target]} the sequence?`,
        hint: 'Every option uses the same target form; recover meaning and order from the narrative.',
        answer,
        production: findSequenceProduction(input, seed.productionSentence ? [seed.productionSentence, seed.productionSentence, seed.productionSentence] : seed.events, seed.target),
      }],
      options: placeTimelineAnswer(seed.events, seed.target, index, input.slug),
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
  const finalStory: GapChallenge<EnglishFormId> = {
    id: `${prefix}-final-story`,
    title: `Final field file · ${input.focus}`,
    focus: input.focus,
    instruction: 'Write all ten complete verb forms. Each note supplies its own evidence for time, aspect or function.',
    segments: input.final.map((seed, index) => `${index === 0 ? 'The first field note reads: ' : ` Note ${index + 1}: `}${seed.before}`)
      .concat(input.final.at(-1)?.after ?? ''),
    gaps: input.final.map((seed, index) => ({
      id: `${prefix}-final-story-gap-${index + 1}`,
      tense: input.form,
      verb: seed.verb ?? input.focus,
      answers: [seed.answer],
    })),
    explanation: `${input.rule} Supply only the complete verb phrase requested by each gap.`,
  }
  for (let index = 0; index < input.final.length - 1; index += 1) {
    finalStory.segments[index + 1] = `${input.final[index].after}${finalStory.segments[index + 1]}`
  }

  return { choices, micro, long, errors, timelines, finalCards, finalGaps, finalStory }
}
