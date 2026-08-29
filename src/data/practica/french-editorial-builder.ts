import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { FrenchFormId } from './french-structure-quest-config.ts'

export type FrenchEditorialMicroSeed = StructureEditorialMicroSeed
export type FrenchEditorialGapSeed = StructureEditorialGapSeed
export type FrenchEditorialErrorSeed = StructureEditorialErrorSeed
export type FrenchEditorialSequenceSeed = StructureEditorialSequenceSeed
export type FrenchEditorialFinalSeed = StructureEditorialFinalSeed

const positionLabels = ['ouvre', 'occupe le milieu de', 'termine'] as const

export function createFrenchEditorialPack(input: {
  slug: string
  form: FrenchFormId
  focus: string
  rule: string
  micro: FrenchEditorialMicroSeed[]
  long: FrenchEditorialGapSeed[]
  errors: FrenchEditorialErrorSeed[]
  sequences: FrenchEditorialSequenceSeed[]
  final: FrenchEditorialFinalSeed[]
}) {
  const secondHalf = new Set(['futur-proche', 'futur-simple', 'futur-anterieur', 'conditionnel-present', 'conditionnel-passe'])
  const choiceOffset = secondHalf.has(input.slug) ? 0 : 2
  return createStructureEditorialPack({
    namespace: 'fr',
    ...input,
    choicePositions: Array.from({ length: 10 }, (_, index) => (index + choiceOffset) % 4),
    finalOffset: choiceOffset,
    ui: {
      choose: (cue) => `Choisis la forme qui exprime ${cue}.`,
      write: (verb) => `Conjugue « ${verb} » et écris toute la forme verbale.`,
      error: 'Sélectionne l’unique forme verbale incorrecte, puis réécris-la correctement.',
      sequenceTitle: (index) => `Suite cohérente · ${index}`,
      sequenceContext: ([first, second, third]) => `${first}. Ensuite, ${second.charAt(0).toLocaleLowerCase('fr')}${second.slice(1)}. Enfin, ${third.charAt(0).toLocaleLowerCase('fr')}${third.slice(1)}.`,
      sequenceQuestion: (position) => `Quel événement ${positionLabels[position]} la suite ?`,
      sequenceHint: 'Toutes les options emploient la même forme cible : reconstruis le sens et l’ordre du récit.',
      sequenceExplanation: (answer) => `« ${answer} » se repère grâce à la progression du récit, pas grâce à une forme verbale isolée.`,
      writtenSuffix: 'Le contexte fournit tous les mots qui ne font pas partie du groupe verbal demandé.',
    },
  })
}
