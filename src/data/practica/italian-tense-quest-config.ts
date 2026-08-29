import { ITALIAN_DRILL_SERIES } from './italian-tense-intensive-bank.ts'
import {
  PASSATO_PROSSIMO_ERRORS,
  PASSATO_PROSSIMO_LONG,
  PASSATO_PROSSIMO_MICRO,
  PASSATO_PROSSIMO_TIMELINES,
} from './italian-passato-prossimo-editorial.ts'
import { ITALIAN_PRESENTE_EDITORIAL } from './italian-presente-editorial.ts'
import { ITALIAN_PRESENT_PROGRESSIVE_EDITORIAL } from './italian-present-progressive-editorial.ts'
import { ITALIAN_IMPERFECT_PROGRESSIVE_EDITORIAL } from './italian-imperfect-progressive-editorial.ts'
import { ITALIAN_IMPERFETTO_EDITORIAL } from './italian-imperfetto-editorial.ts'
import { ITALIAN_PASSATO_REMOTO_EDITORIAL } from './italian-passato-remoto-editorial.ts'
import { ITALIAN_TRAPASSATO_PROSSIMO_EDITORIAL } from './italian-trapassato-prossimo-editorial.ts'
import { ITALIAN_TRAPASSATO_REMOTO_EDITORIAL } from './italian-trapassato-remoto-editorial.ts'
import { ITALIAN_FUTURO_SEMPLICE_EDITORIAL } from './italian-futuro-semplice-editorial.ts'
import { ITALIAN_FUTURO_ANTERIORE_EDITORIAL } from './italian-futuro-anteriore-editorial.ts'
import { ITALIAN_CONDIZIONALE_PRESENTE_EDITORIAL } from './italian-condizionale-presente-editorial.ts'
import { ITALIAN_CONDIZIONALE_PASSATO_EDITORIAL } from './italian-condizionale-passato-editorial.ts'
import { ITALIAN_IMPERATIVO_EDITORIAL } from './italian-imperativo-editorial.ts'
import { ITALIAN_FINAL_EDITORIAL_CONTEXTS } from './italian-final-editorial-contexts.ts'
import { LEVEL_META, TENSE_OPTIONS, type TenseId } from './italian-tense-quest.ts'
import type { BankChallenge, ChoiceChallenge, TenseQuestConfig } from './tense-quest-types'

const choiceChallenges: ChoiceChallenge<TenseId>[] = []

export const EDITORIAL_ITALIAN_FORMS = new Set<TenseId>(['presente', 'presente-progressivo', 'passato-prossimo', 'imperfetto', 'imperfetto-progressivo', 'passato-remoto', 'trapassato-prossimo', 'trapassato-remoto', 'futuro-semplice', 'futuro-anteriore', 'condizionale-presente', 'condizionale-passato', 'imperativo'])

function placeCorrectAnswer(answer: string, alternatives: readonly string[], position: number) {
  const options = [...alternatives]
  options.splice(position, 0, answer)
  return options
}

let globalChoiceIndex = 0

ITALIAN_DRILL_SERIES.forEach((series) => {
  series.drills.forEach((drill, index) => {
    const number = index + 1
    choiceChallenges.push({
      id: `it-choice-${series.id}-${number}`,
      tenses: [series.id],
      focus: series.label,
      prompt: `Elige la forma de ${drill.verb} que corresponde a ${drill.cue}.`,
      context: `${drill.before}___${drill.after}`,
      options: placeCorrectAnswer(drill.answer, drill.alternatives, globalChoiceIndex % 4),
      answer: drill.answer,
      explanation: `${series.rule} Aquí la pista decisiva es «${drill.cue}».`,
    })
    globalChoiceIndex += 1
  })
})

const finalChallenges: BankChallenge<TenseId>[] = Array.from({ length: 10 }, (_, challengeIndex) => {
  const drills = ITALIAN_DRILL_SERIES.map((series, seriesIndex) => {
    const drill = series.drills[challengeIndex]
    const answerPosition = (challengeIndex + seriesIndex) % 4
    return { series, drill, answerPosition, options: placeCorrectAnswer(drill.answer, drill.alternatives, answerPosition) }
  })
  const cards = drills.flatMap(({ series, options }) => options.map((text, optionIndex) => ({
    id: `it-final-card-${challengeIndex + 1}-${series.id}-${optionIndex}`,
    text,
  })))
  return {
    id: `it-final-dossier-${challengeIndex + 1}`,
    title: `Dossier finale · ${challengeIndex + 1}`,
    instruction: 'Reconstruye cada escena con el banco cerrado. Se evaluarán únicamente las formas que seleccionaste.',
    segments: Array.from({ length: drills.length + 1 }, () => ''),
    gaps: drills.map(({ series, answerPosition }) => ({
      id: `it-final-gap-${challengeIndex + 1}-${series.id}`,
      tenseId: series.id,
      tense: series.label,
      answerCardId: `it-final-card-${challengeIndex + 1}-${series.id}-${answerPosition}`,
      candidateCardIds: [0, 1, 2, 3].map((optionIndex) => `it-final-card-${challengeIndex + 1}-${series.id}-${optionIndex}`),
      standalone: ITALIAN_FINAL_EDITORIAL_CONTEXTS[series.id][challengeIndex],
    })),
    cards,
    explanation: 'Cada decisión conserva su contexto completo y contrasta cuatro formas del mismo verbo; no se puede resolver descartando vocabulario ajeno.',
  }
})

export const ITALIAN_TENSE_QUEST: TenseQuestConfig<TenseId> = {
  id: 'italian-tense-quest',
  storageKey: 'wl-italian-tense-quest-v7',
  forms: TENSE_OPTIONS,
  presets: [
    { label: 'Pasados', ids: ['passato-prossimo', 'imperfetto', 'imperfetto-progressivo', 'passato-remoto', 'trapassato-prossimo', 'trapassato-remoto'] },
    { label: 'Progresivos', ids: ['presente-progressivo', 'imperfetto-progressivo'] },
    { label: 'Futuros', ids: ['futuro-semplice', 'futuro-anteriore'] },
    { label: 'Condicionales', ids: ['condizionale-presente', 'condizionale-passato'] },
  ],
  levels: LEVEL_META,
  choiceChallenges,
  microStories: [
    ...ITALIAN_PRESENTE_EDITORIAL.micro,
    ...ITALIAN_PRESENT_PROGRESSIVE_EDITORIAL.micro,
    ...ITALIAN_IMPERFECT_PROGRESSIVE_EDITORIAL.micro,
    ...ITALIAN_IMPERFETTO_EDITORIAL.micro,
    ...ITALIAN_PASSATO_REMOTO_EDITORIAL.micro,
    ...ITALIAN_TRAPASSATO_PROSSIMO_EDITORIAL.micro,
    ...ITALIAN_TRAPASSATO_REMOTO_EDITORIAL.micro,
    ...ITALIAN_FUTURO_SEMPLICE_EDITORIAL.micro,
    ...ITALIAN_FUTURO_ANTERIORE_EDITORIAL.micro,
    ...ITALIAN_CONDIZIONALE_PRESENTE_EDITORIAL.micro,
    ...ITALIAN_CONDIZIONALE_PASSATO_EDITORIAL.micro,
    ...ITALIAN_IMPERATIVO_EDITORIAL.micro,
    ...PASSATO_PROSSIMO_MICRO,
  ],
  longStories: [
    ...ITALIAN_PRESENTE_EDITORIAL.long,
    ...ITALIAN_PRESENT_PROGRESSIVE_EDITORIAL.long,
    ...ITALIAN_IMPERFECT_PROGRESSIVE_EDITORIAL.long,
    ...ITALIAN_IMPERFETTO_EDITORIAL.long,
    ...ITALIAN_PASSATO_REMOTO_EDITORIAL.long,
    ...ITALIAN_TRAPASSATO_PROSSIMO_EDITORIAL.long,
    ...ITALIAN_TRAPASSATO_REMOTO_EDITORIAL.long,
    ...ITALIAN_FUTURO_SEMPLICE_EDITORIAL.long,
    ...ITALIAN_FUTURO_ANTERIORE_EDITORIAL.long,
    ...ITALIAN_CONDIZIONALE_PRESENTE_EDITORIAL.long,
    ...ITALIAN_CONDIZIONALE_PASSATO_EDITORIAL.long,
    ...ITALIAN_IMPERATIVO_EDITORIAL.long,
    ...PASSATO_PROSSIMO_LONG,
  ],
  errorChallenges: [
    ...ITALIAN_PRESENTE_EDITORIAL.errors,
    ...ITALIAN_PRESENT_PROGRESSIVE_EDITORIAL.errors,
    ...ITALIAN_IMPERFECT_PROGRESSIVE_EDITORIAL.errors,
    ...ITALIAN_IMPERFETTO_EDITORIAL.errors,
    ...ITALIAN_PASSATO_REMOTO_EDITORIAL.errors,
    ...ITALIAN_TRAPASSATO_PROSSIMO_EDITORIAL.errors,
    ...ITALIAN_TRAPASSATO_REMOTO_EDITORIAL.errors,
    ...ITALIAN_FUTURO_SEMPLICE_EDITORIAL.errors,
    ...ITALIAN_FUTURO_ANTERIORE_EDITORIAL.errors,
    ...ITALIAN_CONDIZIONALE_PRESENTE_EDITORIAL.errors,
    ...ITALIAN_CONDIZIONALE_PASSATO_EDITORIAL.errors,
    ...ITALIAN_IMPERATIVO_EDITORIAL.errors,
    ...PASSATO_PROSSIMO_ERRORS,
  ],
  timelineChallenges: [
    ...ITALIAN_PRESENTE_EDITORIAL.timelines,
    ...ITALIAN_PRESENT_PROGRESSIVE_EDITORIAL.timelines,
    ...ITALIAN_IMPERFECT_PROGRESSIVE_EDITORIAL.timelines,
    ...ITALIAN_IMPERFETTO_EDITORIAL.timelines,
    ...ITALIAN_PASSATO_REMOTO_EDITORIAL.timelines,
    ...ITALIAN_TRAPASSATO_PROSSIMO_EDITORIAL.timelines,
    ...ITALIAN_TRAPASSATO_REMOTO_EDITORIAL.timelines,
    ...ITALIAN_FUTURO_SEMPLICE_EDITORIAL.timelines,
    ...ITALIAN_FUTURO_ANTERIORE_EDITORIAL.timelines,
    ...ITALIAN_CONDIZIONALE_PRESENTE_EDITORIAL.timelines,
    ...ITALIAN_CONDIZIONALE_PASSATO_EDITORIAL.timelines,
    ...ITALIAN_IMPERATIVO_EDITORIAL.timelines,
    ...PASSATO_PROSSIMO_TIMELINES,
  ],
  finalChallenges,
  copy: {
    languageName: 'Italiano',
    languageCode: 'it',
    eyebrow: 'Ejercicio de verbos · A2–B2',
    title: 'La macchina del tempo',
    lead: 'Elige las formas que quieres practicar. Cada nivel ofrece como mínimo diez ejercicios distintos y reserva la corrección hasta el final.',
    range: '13 formas',
    selectedLabel: 'formas seleccionadas',
    selectorTitle: '¿Qué tiempos y perífrasis quieres practicar?',
    selectorLead: 'Puedes combinar varios. “Presente progressivo” e “imperfetto progressivo” son perífrasis con stare + gerundio, no equivalentes automáticos de todos los continuos ingleses.',
    configuredEyebrow: 'Percorso personalizzato',
    levelsTitle: 'Seis niveles, diez retos como mínimo en cada uno',
    levelsLead: 'Responde todo el nivel primero. Verás aciertos, errores y explicaciones únicamente al terminarlo; el reto final genera además un informe global.',
    mapLabels: ['Prima del prima', 'Prima', 'Ora', 'Dopo'],
    reviewLinks: [
      { href: '/practica/italiano/a2/gramatica', label: 'Repasar gramática A2' },
      { href: '/practica/italiano/b1/gramatica', label: 'Profundizar en B1' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
    accent: '#16845b',
  },
}
