import { ITALIAN_DRILL_SERIES } from './italian-tense-intensive-bank.ts'
import {
  PASSATO_PROSSIMO_ERRORS,
  PASSATO_PROSSIMO_LONG,
  PASSATO_PROSSIMO_MICRO,
  PASSATO_PROSSIMO_TIMELINES,
} from './italian-passato-prossimo-editorial.ts'
import { LEVEL_META, TENSE_OPTIONS, type TenseId } from './italian-tense-quest.ts'
import type { BankChallenge, ChoiceChallenge, ErrorChallenge, GapChallenge, TenseQuestConfig, TimelineChallenge } from './tense-quest-types'

const choiceChallenges: ChoiceChallenge<TenseId>[] = []
const microStories: GapChallenge<TenseId>[] = []
const longStories: GapChallenge<TenseId>[] = []
const errorChallenges: ErrorChallenge<TenseId>[] = []
const timelineChallenges: TimelineChallenge<TenseId>[] = []

function placeCorrectAnswer(answer: string, alternatives: readonly string[], position: number) {
  const options = [...alternatives]
  options.splice(position, 0, answer)
  return options
}

function storyParts(seriesIndex: number, start: number, amount: number) {
  const series = ITALIAN_DRILL_SERIES[seriesIndex]
  return Array.from({ length: amount }, (_, offset) => series.drills[(start + offset) % series.drills.length])
}

let globalChoiceIndex = 0
let globalErrorIndex = 0

ITALIAN_DRILL_SERIES.forEach((series, seriesIndex) => {
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

    microStories.push({
      id: `it-micro-${series.id}-${number}`,
      title: `${series.label} · microtexto ${number}`,
      focus: series.label,
      instruction: `Conjuga ${drill.verb} en ${series.label.toLowerCase()}.`,
      segments: [drill.before, drill.after],
      gaps: [{ id: `it-micro-gap-${series.id}-${number}`, tense: series.id, verb: drill.verb, answers: [drill.answer] }],
      explanation: `${series.rule} La señal contextual es «${drill.cue}».`,
    })

    const longDrills = storyParts(seriesIndex, index, 3)
    longStories.push({
      id: `it-long-${series.id}-${number}`,
      title: `${series.label} · tres escenas ${number}`,
      focus: series.label,
      instruction: `Mantén ${series.label.toLowerCase()} en las tres escenas y conjuga cada verbo indicado.`,
      segments: [
        longDrills[0].before,
        `${longDrills[0].after} · ${longDrills[1].before}`,
        `${longDrills[1].after} · ${longDrills[2].before}`,
        longDrills[2].after,
      ],
      gaps: longDrills.map((item, gapIndex) => ({
        id: `it-long-gap-${series.id}-${number}-${gapIndex + 1}`,
        tense: series.id,
        verb: item.verb,
        answers: [item.answer],
      })),
      explanation: `${series.rule} Las tres escenas comprueban la misma función temporal con personas y verbos distintos.`,
    })

    const errorDrills = storyParts(seriesIndex, index, 3)
    const wrongPosition = globalErrorIndex % 3
    errorChallenges.push({
      id: `it-error-${series.id}-${number}`,
      tense: series.id,
      title: `${series.label} · edición ${number}`,
      focus: series.label,
      instruction: 'Selecciona la forma verbal defectuosa y reescríbela correctamente.',
      chunks: errorDrills.map((item, chunkIndex) => ({
        before: chunkIndex === 0 ? item.before : `${errorDrills[chunkIndex - 1].after} · ${item.before}`,
        id: `it-error-token-${series.id}-${number}-${chunkIndex + 1}`,
        form: chunkIndex === wrongPosition ? item.alternatives[0] : item.answer,
      })),
      after: errorDrills[2].after,
      wrongId: `it-error-token-${series.id}-${number}-${wrongPosition + 1}`,
      answers: [errorDrills[wrongPosition].answer],
      explanation: `${series.rule} En la escena corregida, «${errorDrills[wrongPosition].cue}» exige «${errorDrills[wrongPosition].answer}».`,
    })
    globalErrorIndex += 1

    timelineChallenges.push({
      id: `it-timeline-${series.id}-${number}`,
      title: `${series.label} · función ${number}`,
      focus: series.label,
      context: `${drill.before}${drill.answer}${drill.after}`,
      slots: [{
        id: `it-timeline-slot-${series.id}-${number}`,
        tense: series.id,
        label: drill.answer,
        hint: `Identifica la función de ${series.label.toLowerCase()} en esta oración.`,
        answer: drill.cue,
      }],
      options: Array.from({ length: 4 }, (_, offset) => series.drills[(index + offset) % series.drills.length].cue),
      explanation: `${series.rule} En este caso concreto expresa «${drill.cue}».`,
    })
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
    segments: [
      drills[0].drill.before,
      ...drills.slice(1).map(({ drill }, index) => `${drills[index].drill.after} · ${drill.before}`),
      drills.at(-1)?.drill.after ?? '',
    ],
    gaps: drills.map(({ series, drill, answerPosition }) => ({
      id: `it-final-gap-${challengeIndex + 1}-${series.id}`,
      tenseId: series.id,
      tense: series.label,
      answerCardId: `it-final-card-${challengeIndex + 1}-${series.id}-${answerPosition}`,
      candidateCardIds: [0, 1, 2, 3].map((optionIndex) => `it-final-card-${challengeIndex + 1}-${series.id}-${optionIndex}`),
      standalone: { before: drill.before, after: drill.after },
    })),
    cards,
    explanation: 'Cada decisión conserva su contexto completo y contrasta cuatro formas del mismo verbo; no se puede resolver descartando vocabulario ajeno.',
  }
})

export const ITALIAN_TENSE_QUEST: TenseQuestConfig<TenseId> = {
  id: 'italian-tense-quest',
  storageKey: 'wl-italian-tense-quest-v6',
  forms: TENSE_OPTIONS,
  presets: [
    { label: 'Pasados', ids: ['passato-prossimo', 'imperfetto', 'imperfetto-progressivo', 'passato-remoto', 'trapassato-prossimo', 'trapassato-remoto'] },
    { label: 'Progresivos', ids: ['presente-progressivo', 'imperfetto-progressivo'] },
    { label: 'Futuros', ids: ['futuro-semplice', 'futuro-anteriore'] },
    { label: 'Condicionales', ids: ['condizionale-presente', 'condizionale-passato'] },
  ],
  levels: LEVEL_META,
  choiceChallenges,
  microStories: [...microStories.filter((item) => !item.gaps.some((gap) => gap.tense === 'passato-prossimo')), ...PASSATO_PROSSIMO_MICRO],
  longStories: [...longStories.filter((item) => !item.gaps.some((gap) => gap.tense === 'passato-prossimo')), ...PASSATO_PROSSIMO_LONG],
  errorChallenges: [...errorChallenges.filter((item) => item.tense !== 'passato-prossimo'), ...PASSATO_PROSSIMO_ERRORS],
  timelineChallenges: [...timelineChallenges.filter((item) => !item.slots.some((slot) => slot.tense === 'passato-prossimo')), ...PASSATO_PROSSIMO_TIMELINES],
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
