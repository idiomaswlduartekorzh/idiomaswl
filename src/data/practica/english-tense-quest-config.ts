import type { TenseQuestConfig } from './tense-quest-types.ts'
import { ENGLISH_PRESENT_SIMPLE_EDITORIAL } from './english-present-simple-editorial.ts'
import { ENGLISH_PRESENT_CONTINUOUS_EDITORIAL } from './english-present-continuous-editorial.ts'
import { ENGLISH_PRESENT_PERFECT_EDITORIAL } from './english-present-perfect-editorial.ts'
import { ENGLISH_PRESENT_PERFECT_CONTINUOUS_EDITORIAL } from './english-present-perfect-continuous-editorial.ts'
import { ENGLISH_PAST_SIMPLE_EDITORIAL } from './english-past-simple-editorial.ts'
import { ENGLISH_PAST_CONTINUOUS_EDITORIAL } from './english-past-continuous-editorial.ts'
import { ENGLISH_PAST_PERFECT_EDITORIAL } from './english-past-perfect-editorial.ts'
import { ENGLISH_PAST_PERFECT_CONTINUOUS_EDITORIAL } from './english-past-perfect-continuous-editorial.ts'
import { ENGLISH_FUTURE_WILL_EDITORIAL } from './english-future-will-editorial.ts'
import { ENGLISH_FUTURE_GOING_TO_EDITORIAL } from './english-future-going-to-editorial.ts'
import { ENGLISH_FUTURE_CONTINUOUS_EDITORIAL } from './english-future-continuous-editorial.ts'
import { ENGLISH_FUTURE_PERFECT_EDITORIAL } from './english-future-perfect-editorial.ts'
import { ENGLISH_FUTURE_PERFECT_CONTINUOUS_EDITORIAL } from './english-future-perfect-continuous-editorial.ts'
import { ENGLISH_CONDITIONAL_ZERO_EDITORIAL } from './english-conditional-zero-editorial.ts'
import { ENGLISH_CONDITIONAL_FIRST_EDITORIAL } from './english-conditional-first-editorial.ts'
import { ENGLISH_CONDITIONAL_SECOND_EDITORIAL } from './english-conditional-second-editorial.ts'
import { ENGLISH_CONDITIONAL_THIRD_EDITORIAL } from './english-conditional-third-editorial.ts'
import { ENGLISH_CONDITIONAL_MIXED_EDITORIAL } from './english-conditional-mixed-editorial.ts'
import { ENGLISH_IMPERATIVE_EDITORIAL } from './english-imperative-editorial.ts'

export const ENGLISH_FORMS = [
  { id: 'present-simple', label: 'Present simple', group: 'Present' },
  { id: 'present-continuous', label: 'Present continuous', group: 'Present' },
  { id: 'present-perfect', label: 'Present perfect', group: 'Present' },
  { id: 'present-perfect-continuous', label: 'Present perfect continuous', group: 'Present' },
  { id: 'past-simple', label: 'Past simple', group: 'Past' },
  { id: 'past-continuous', label: 'Past continuous', group: 'Past' },
  { id: 'past-perfect', label: 'Past perfect', group: 'Past' },
  { id: 'past-perfect-continuous', label: 'Past perfect continuous', group: 'Past' },
  { id: 'future-will', label: 'Future with will', group: 'Future' },
  { id: 'future-going-to', label: 'Be going to', group: 'Future' },
  { id: 'future-continuous', label: 'Future continuous', group: 'Future' },
  { id: 'future-perfect', label: 'Future perfect', group: 'Future' },
  { id: 'future-perfect-continuous', label: 'Future perfect continuous', group: 'Future' },
  { id: 'conditional-zero', label: 'Zero conditional', group: 'Conditionals' },
  { id: 'conditional-first', label: 'First conditional', group: 'Conditionals' },
  { id: 'conditional-second', label: 'Second conditional', group: 'Conditionals' },
  { id: 'conditional-third', label: 'Third conditional', group: 'Conditionals' },
  { id: 'conditional-mixed', label: 'Mixed conditionals', group: 'Conditionals' },
  { id: 'imperative', label: 'Imperative', group: 'Instructions' },
] as const

export type EnglishFormId = (typeof ENGLISH_FORMS)[number]['id']

const EDITORIAL_PACKS = [
  ENGLISH_PRESENT_SIMPLE_EDITORIAL,
  ENGLISH_PRESENT_CONTINUOUS_EDITORIAL,
  ENGLISH_PRESENT_PERFECT_EDITORIAL,
  ENGLISH_PRESENT_PERFECT_CONTINUOUS_EDITORIAL,
  ENGLISH_PAST_SIMPLE_EDITORIAL,
  ENGLISH_PAST_CONTINUOUS_EDITORIAL,
  ENGLISH_PAST_PERFECT_EDITORIAL,
  ENGLISH_PAST_PERFECT_CONTINUOUS_EDITORIAL,
  ENGLISH_FUTURE_WILL_EDITORIAL,
  ENGLISH_FUTURE_GOING_TO_EDITORIAL,
  ENGLISH_FUTURE_CONTINUOUS_EDITORIAL,
  ENGLISH_FUTURE_PERFECT_EDITORIAL,
  ENGLISH_FUTURE_PERFECT_CONTINUOUS_EDITORIAL,
  ENGLISH_CONDITIONAL_ZERO_EDITORIAL,
  ENGLISH_CONDITIONAL_FIRST_EDITORIAL,
  ENGLISH_CONDITIONAL_SECOND_EDITORIAL,
  ENGLISH_CONDITIONAL_THIRD_EDITORIAL,
  ENGLISH_CONDITIONAL_MIXED_EDITORIAL,
  ENGLISH_IMPERATIVE_EDITORIAL,
]

export const ENGLISH_TENSE_QUEST: TenseQuestConfig<EnglishFormId> = {
  id: 'english-tense-quest',
  storageKey: 'wl-english-tense-quest-v4',
  forms: ENGLISH_FORMS,
  presets: [
    { label: 'Present', ids: ENGLISH_FORMS.filter((form) => form.group === 'Present').map((form) => form.id) },
    { label: 'Past', ids: ENGLISH_FORMS.filter((form) => form.group === 'Past').map((form) => form.id) },
    { label: 'Future', ids: ENGLISH_FORMS.filter((form) => form.group === 'Future').map((form) => form.id) },
    { label: 'Conditionals', ids: ENGLISH_FORMS.filter((form) => form.group === 'Conditionals').map((form) => form.id) },
  ],
  levels: [
    { number: '01', title: 'Quick choice', short: 'Multiple choice', description: 'Recognize the form that fits each context.' },
    { number: '02', title: 'Micro stories', short: 'Short production', description: 'Write the complete verb form from a precise clue.' },
    { number: '03', title: 'Cumulative retrieval', short: 'Connected narrative', description: 'Complete one coherent scene with three target forms and no options.' },
    { number: '04', title: 'Error lab', short: 'Detect and repair', description: 'Find the only form that breaks a coherent text and correct it.' },
    { number: '05', title: 'Sequence map', short: 'Recover meaning', description: 'Order events whose options all use the same target form.' },
    { number: '06', title: 'Aspect field file', short: 'Closed decisions', description: 'Solve ten independent scenes with four same-verb candidates each.' },
  ],
  choiceChallenges: EDITORIAL_PACKS.flatMap((pack) => pack.choices),
  microStories: EDITORIAL_PACKS.flatMap((pack) => pack.micro),
  longStories: EDITORIAL_PACKS.flatMap((pack) => pack.long),
  errorChallenges: EDITORIAL_PACKS.flatMap((pack) => pack.errors),
  timelineChallenges: EDITORIAL_PACKS.flatMap((pack) => pack.timelines),
  finalChallenges: Array.from({ length: 10 }, (_, index) => {
    const gaps = EDITORIAL_PACKS.map((pack) => pack.finalGaps[index])
    const candidateIds = new Set(gaps.flatMap((gap) => gap.candidateCardIds ?? []))
    return {
      id: `en-final-editorial-${index + 1}`,
      title: `Aspect field file · ${index + 1}`,
      instruction: 'Open each independent scene and choose its verb form from four plausible candidates.',
      segments: new Array(gaps.length + 1).fill(''),
      gaps,
      cards: EDITORIAL_PACKS.flatMap((pack) => pack.finalCards.filter((card) => candidateIds.has(card.id))),
      explanation: 'Each scene independently supplies the time, aspect and clause evidence needed for one closed decision.',
    }
  }),
  copy: {
    languageName: 'Inglés',
    languageCode: 'en',
    eyebrow: 'Tense & structure quiz · A2–B2',
    title: 'The aspect control room',
    lead: 'Choose the forms you want to practice. Each level adapts to your selection and keeps every correction hidden until the end.',
    range: '19 forms',
    selectedLabel: 'formas seleccionadas',
    selectorTitle: '¿Qué formas quieres practicar?',
    selectorLead: 'Combina tiempos, aspectos y condicionales. Solo aparecerán huecos para las formas elegidas.',
    configuredEyebrow: 'Custom practice route',
    levelsTitle: 'Six levels, no answers between questions',
    levelsLead: 'Complete the active level first. Your score, corrections and explanations appear only when you finish it.',
    mapLabels: ['Earlier', 'Past', 'Now', 'Future'],
    reviewLinks: [
      { href: '/practica/ingles/a2/gramatica', label: 'Repasar gramática A2' },
      { href: '/practica/ingles/b1/gramatica', label: 'Profundizar en B1' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  },
}
