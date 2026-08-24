import {
  CHOICE_CHALLENGES,
  ERROR_CHALLENGES,
  FINAL_CHALLENGE,
  LEVEL_META,
  LONG_STORIES,
  MICRO_STORIES,
  TENSE_OPTIONS,
  TIMELINE_CHALLENGES,
  type TenseId,
} from './italian-tense-quest.ts'
import type { TenseQuestConfig } from './tense-quest-types'

const cards = FINAL_CHALLENGE.bank.map((text, index) => ({ id: `it-final-card-${index + 1}`, text }))

function balancedChoiceOptions(challenge: (typeof CHOICE_CHALLENGES)[number], index: number) {
  const distractors = challenge.options.filter((option) => option !== challenge.answer)
  distractors.splice(index % 4, 0, challenge.answer)
  return distractors
}

export const ITALIAN_TENSE_QUEST: TenseQuestConfig<TenseId> = {
  id: 'italian-tense-quest',
  storageKey: 'wl-italian-tense-quest-v4',
  forms: TENSE_OPTIONS,
  presets: [
    { label: 'Pasados', ids: ['passato-prossimo', 'imperfetto', 'passato-remoto', 'trapassato-prossimo', 'trapassato-remoto'] },
    { label: 'Futuros', ids: ['futuro-semplice', 'futuro-anteriore'] },
    { label: 'Condicionales', ids: ['condizionale-presente', 'condizionale-passato'] },
  ],
  levels: LEVEL_META,
  choiceChallenges: CHOICE_CHALLENGES.map((challenge, index) => ({
    ...challenge,
    id: `it-choice-${index + 1}`,
    options: balancedChoiceOptions(challenge, index),
  })),
  microStories: MICRO_STORIES.map((challenge, index) => ({ ...challenge, id: `it-micro-${index + 1}` })),
  longStories: LONG_STORIES.map((challenge, index) => ({ ...challenge, id: `it-long-${index + 1}` })),
  errorChallenges: ERROR_CHALLENGES.map((challenge, index) => ({ ...challenge, id: `it-error-${index + 1}` })),
  timelineChallenges: TIMELINE_CHALLENGES.map((challenge, index) => ({ ...challenge, id: `it-timeline-${index + 1}` })),
  finalChallenges: [{
    id: 'it-final-manuscript',
    title: FINAL_CHALLENGE.title,
    instruction: FINAL_CHALLENGE.instruction,
    segments: FINAL_CHALLENGE.segments,
    gaps: FINAL_CHALLENGE.gaps.map((gap) => ({
      id: gap.id,
      tenseId: gap.tenseId,
      tense: gap.tense,
      answerCardId: cards.find((card) => card.text === gap.answer)?.id ?? '',
    })),
    cards,
    explanation: FINAL_CHALLENGE.explanation,
  }],
  copy: {
    languageName: 'Italiano',
    languageCode: 'it',
    eyebrow: 'Quiz de tiempos · A2–B2',
    title: 'La macchina del tempo',
    lead: 'Elige los tiempos que quieres practicar. El quiz adapta cada nivel y guarda la corrección hasta el final.',
    range: '11 tiempos',
    selectedLabel: 'tiempos seleccionados',
    selectorTitle: '¿Qué tiempos quieres practicar?',
    selectorLead: 'Puedes combinar varios. Los textos mostrarán huecos solo para los tiempos elegidos.',
    configuredEyebrow: 'Percorso personalizzato',
    levelsTitle: 'Seis niveles, sin pistas entre preguntas',
    levelsLead: 'Responde todo el nivel primero. Verás aciertos, errores y explicaciones únicamente al terminarlo.',
    mapLabels: ['Prima del prima', 'Prima', 'Ora', 'Dopo'],
    reviewLinks: [
      { href: '/practica/italiano/a2/gramatica', label: 'Repasar gramática A2' },
      { href: '/practica/italiano/b1/gramatica', label: 'Profundizar en B1' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  },
}
