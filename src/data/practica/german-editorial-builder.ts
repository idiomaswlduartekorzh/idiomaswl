import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { GermanFormId } from './german-structure-quest.ts'

export type GermanEditorialMicroSeed = StructureEditorialMicroSeed
export type GermanEditorialGapSeed = StructureEditorialGapSeed
export type GermanEditorialErrorSeed = StructureEditorialErrorSeed
export type GermanEditorialSequenceSeed = StructureEditorialSequenceSeed
export type GermanEditorialFinalSeed = StructureEditorialFinalSeed

export type GermanCompactMicro = [
  title: string, cue: string, before: string, after: string, verb: string,
  answer: string, distractor1: string, distractor2: string, distractor3: string,
]
export type GermanCompactStory = [
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
export type GermanCompactFinal = [before: string, after: string, answer: string, distractor1: string, distractor2: string, distractor3: string]

const positionLabels = ['die Folge eröffnet', 'in der Mitte der Folge steht', 'die Folge abschließt'] as const

export function createGermanEditorialPack(input: {
  slug: string
  form: GermanFormId
  focus: string
  rule: string
  micro: GermanEditorialMicroSeed[]
  long: GermanEditorialGapSeed[]
  errors: GermanEditorialErrorSeed[]
  sequences: GermanEditorialSequenceSeed[]
  final: GermanEditorialFinalSeed[]
}) {
  const secondHalf = new Set(['futur-eins', 'futur-zwei', 'wuerde-form', 'konjunktiv-vergangenheit', 'imperativ'])
  const choiceOffset = secondHalf.has(input.slug) ? 0 : 2
  return createStructureEditorialPack({
    namespace: 'de',
    ...input,
    choicePositions: Array.from({ length: 10 }, (_, index) => (index + choiceOffset) % 4),
    finalOffset: choiceOffset,
    ui: {
      choose: (cue) => `Wähle die vollständige Verbform für ${cue}.`,
      write: (verb) => `Konjugiere „${verb}“ und schreibe die vollständige Verbgruppe.`,
      error: 'Wähle die einzige falsche Verbgruppe und schreibe sie vollständig richtig.',
      sequenceTitle: (index) => `Logische Abfolge · ${index}`,
      sequenceContext: ([first, second, third]) => `${first}. Danach: ${second}. Zum Schluss: ${third}.`,
      sequenceQuestion: (position) => `Welches Ereignis ${positionLabels[position]}?`,
      sequenceHint: 'Alle Optionen verwenden die Zielform. Entscheide nach Bedeutung und Ablauf, nicht nach einem einzelnen Hilfsverb.',
      sequenceExplanation: (answer) => `„${answer}“ passt an diese Stelle wegen des vollständigen Handlungsablaufs.`,
      writtenSuffix: 'Der Kontext liefert alle Wörter außerhalb der verlangten Verbgruppe; trennbare Teile und Hilfsverben gehören zur Antwort, wenn sie Teil der Verbform sind.',
    },
  })
}

export function createGermanCompactPack(input: {
  slug: string
  form: GermanFormId
  focus: string
  rule: string
  micro: GermanCompactMicro[]
  stories: GermanCompactStory[]
  final: GermanCompactFinal[]
}) {
  const micro: GermanEditorialMicroSeed[] = input.micro.map(([title, cue, before, after, verb, answer, ...distractors]) => ({
    title, cue, segments: [before, after], verb, answers: [answer],
    distractors: distractors as [string, string, string],
  }))
  const long: GermanEditorialGapSeed[] = input.stories.map(([title, segments, verbs, answers]) => ({
    title,
    instruction: 'Ergänze die drei vollständigen Verbgruppen in dieser zusammenhängenden Szene.',
    segments,
    entries: [
      [verbs[0], [answers[0]]],
      [verbs[1], [answers[1]]],
      [verbs[2], [answers[2]]],
    ],
  }))
  const errors: GermanEditorialErrorSeed[] = input.stories.map(([title, segments, , answers, wrong, wrongForm, reason]) => ({
    title,
    pieces: answers.map((answer, index) => [segments[index], index === wrong ? wrongForm : answer]) as GermanEditorialErrorSeed['pieces'],
    after: segments[3], wrong, answers: [answers[wrong]], reason,
  }))
  const sequences: GermanEditorialSequenceSeed[] = input.stories.map(([, , , , , , , events, target]) => ({ events, target }))
  const final: GermanEditorialFinalSeed[] = input.final.map(([before, after, answer, ...distractors]) => ({
    before, after, answer, distractors: distractors as [string, string, string],
  }))
  return createGermanEditorialPack({ ...input, micro, long, errors, sequences, final })
}
