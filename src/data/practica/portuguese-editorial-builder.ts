import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialChoiceSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { PortugueseFormId } from './portuguese-structure-quest-config.ts'

export type PortugueseEditorialMicroSeed = StructureEditorialMicroSeed
export type PortugueseEditorialChoiceSeed = StructureEditorialChoiceSeed
export type PortugueseEditorialGapSeed = StructureEditorialGapSeed
export type PortugueseEditorialErrorSeed = StructureEditorialErrorSeed
export type PortugueseEditorialSequenceSeed = StructureEditorialSequenceSeed
export type PortugueseEditorialFinalSeed = StructureEditorialFinalSeed

const positionLabels = ['abre', 'ocupa o meio de', 'fecha'] as const
const secondHalf = new Set(['futuro-proximo', 'futuro-presente', 'futuro-composto', 'futuro-preterito', 'condicional-passado'])

export function createPortugueseEditorialPack(input: {
  slug: string
  form: PortugueseFormId
  focus: string
  rule: string
  choices?: PortugueseEditorialChoiceSeed[]
  micro: PortugueseEditorialMicroSeed[]
  long: PortugueseEditorialGapSeed[]
  errors: PortugueseEditorialErrorSeed[]
  sequences: PortugueseEditorialSequenceSeed[]
  final: PortugueseEditorialFinalSeed[]
}) {
  const choiceOffset = secondHalf.has(input.slug) ? 0 : 2
  return createStructureEditorialPack({
    namespace: 'ptbr',
    ...input,
    choicePositions: Array.from({ length: 10 }, (_, index) => (index + choiceOffset) % 4),
    finalOffset: choiceOffset,
    ui: {
      choose: (cue) => `Escolha a forma que expressa ${cue}.`,
      write: (verb) => `Conjugue “${verb}” e escreva toda a forma verbal.`,
      error: 'Selecione a única forma verbal incorreta e depois reescreva-a corretamente.',
      sequenceTitle: (index) => `Sequência coerente · ${index}`,
      sequenceContext: () => 'Reconstrua a sequência pela preparação, pela ação e pelo resultado. A narrativa ordenada está ocultada de propósito.',
      sequenceQuestion: (position) => `Qual evento ${positionLabels[position]} a sequência?`,
      sequenceHint: 'Todas as opções usam a mesma forma-alvo: recupere o sentido e a ordem do texto.',
      sequenceExplanation: (answer) => `“${answer}” é identificado pela progressão do texto, não por uma forma verbal isolada.`,
      writtenSuffix: 'O contexto fornece todas as palavras que não pertencem ao grupo verbal solicitado.',
      finalTitle: `Dossiê final · ${input.focus}`,
      finalInstruction: 'Escreva os dez grupos verbais completos. Cada nota contém sua própria pista de tempo, aspecto ou registro.',
      finalIntro: 'No dossiê de campo, a primeira nota registra: ',
      finalBridge: (index) => ` Nota ${index + 1}: `,
    },
  })
}
