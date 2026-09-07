import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialChoiceSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { FrenchFormId } from './french-structure-quest-config.ts'

export type FrenchEditorialMicroSeed = StructureEditorialMicroSeed
export type FrenchEditorialChoiceSeed = StructureEditorialChoiceSeed
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
  choices?: FrenchEditorialChoiceSeed[]
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
      sequenceContext: () => 'Reconstitue la suite à partir de la préparation, de l’action et du résultat. Le récit ordonné est volontairement masqué.',
      sequenceQuestion: (position) => `Quel événement ${positionLabels[position]} la suite ?`,
      sequenceHint: 'Toutes les options emploient la même forme cible : reconstruis le sens et l’ordre du récit.',
      sequenceExplanation: (answer) => `« ${answer} » se repère grâce à la progression du récit, pas grâce à une forme verbale isolée.`,
      writtenSuffix: 'Le contexte fournit tous les mots qui ne font pas partie du groupe verbal demandé.',
      finalTitle: `Dossier final · ${input.focus}`,
      finalInstruction: 'Écris les dix groupes verbaux complets. Chaque note fournit son propre repère de temps, d’aspect ou de registre.',
      finalIntro: 'Dans le dossier de terrain, la première note indique : ',
      finalBridge: (index) => ` Note ${index + 1} : `,
    },
  })
}
