import type { ErrorChallenge, GapChallenge, TimelineChallenge } from './tense-quest-types.ts'
import type { TenseId } from './italian-tense-quest.ts'
import { createSentenceProduction } from './sentence-production.ts'

export type EditorialGapSeed = {
  title: string
  instruction: string
  segments: string[]
  entries: Array<[verb: string, answer: string]>
}

export type EditorialErrorSeed = {
  title: string
  pieces: Array<[before: string, shown: string]>
  after: string
  wrong: number
  answer: string
  reason: string
}

export type EditorialSequenceSeed = {
  events: [string, string, string]
  target: 0 | 1 | 2
  production: {
    sentence: string
    verb: string
    answers: readonly string[]
  }
}

type EditorialPackInput = {
  slug: string
  tense: TenseId
  focus: string
  rule: string
  micro: EditorialGapSeed[]
  long: EditorialGapSeed[]
  errors: EditorialErrorSeed[]
  sequences: EditorialSequenceSeed[]
}

function gaps(
  prefix: string,
  tense: TenseId,
  focus: string,
  rule: string,
  seeds: EditorialGapSeed[],
): GapChallenge<TenseId>[] {
  return seeds.map((seed, index) => ({
    id: `${prefix}-${index + 1}`,
    title: seed.title,
    focus,
    instruction: seed.instruction,
    segments: seed.segments,
    gaps: seed.entries.map(([verb, answer], gapIndex) => ({
      id: `${prefix}-${index + 1}-gap-${gapIndex + 1}`,
      tense,
      verb,
      answers: [answer],
    })),
    explanation: `${rule} El contexto identifica sujeto y función; la respuesta solo contiene la forma verbal solicitada.`,
  }))
}

export function createItalianEditorialPack(input: EditorialPackInput) {
  const prefix = `it-${input.slug}`
  const micro = gaps(`${prefix}-micro-editorial`, input.tense, input.focus, input.rule, input.micro)
  const long = gaps(`${prefix}-long-editorial`, input.tense, input.focus, input.rule, input.long)
  const errors: ErrorChallenge<TenseId>[] = input.errors.map((seed, index) => ({
    id: `${prefix}-error-editorial-${index + 1}`,
    tense: input.tense,
    title: seed.title,
    focus: input.focus,
    instruction: 'Leggi il testo, seleziona l’unica forma verbale errata e riscrivila correttamente.',
    chunks: seed.pieces.map(([before, form], chunkIndex) => ({
      before,
      form,
      id: `${prefix}-error-editorial-${index + 1}-token-${chunkIndex + 1}`,
    })),
    after: seed.after,
    wrongId: `${prefix}-error-editorial-${index + 1}-token-${seed.wrong + 1}`,
    answers: [seed.answer],
    explanation: `${input.rule} En este texto, ${seed.reason}.`,
  }))
  const timelines: TimelineChallenge<TenseId>[] = input.sequences.map((seed, index) => {
    const answer = seed.events[seed.target]
    const labels = ['apre', 'occupa il punto intermedio', 'chiude']
    const answerPositions = [1, 0, 2, 0, 2, 1, 2, 1, 0, 1]
    const positionOffset = [...input.slug].reduce((sum, character) => sum + (character.codePointAt(0) ?? 0), 0) % 3
    const distractors = seed.events.filter((_, eventIndex) => eventIndex !== seed.target)
    const options = [...distractors]
    options.splice((answerPositions[index % answerPositions.length] + positionOffset) % 3, 0, answer)
    return {
      id: `${prefix}-sequence-editorial-${index + 1}`,
      title: `Sequenza contestuale · ${index + 1}`,
      focus: input.focus,
      context: 'Ricostruisci la sequenza in base a preparazione, azione e risultato. Il racconto ordinato è volutamente nascosto.',
      slots: [{
        id: `${prefix}-sequence-editorial-${index + 1}-slot`,
        tense: input.tense,
        label: `Quale evento ${labels[seed.target]} la sequenza?`,
        hint: 'Tutte le opzioni usano la stessa forma: ricostruisci il significato e l’ordine del testo.',
        answer,
        production: createSentenceProduction(seed.production.sentence, seed.production.verb, seed.production.answers),
      }],
      options,
      explanation: `La risposta è «${answer}»: si ricava dalla progressione del racconto, non dal tempo verbale delle alternative.`,
    }
  })

  return { micro, long, errors, timelines }
}
