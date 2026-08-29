import type { TenseQuestConfig } from './tense-quest-types.ts'
import { PORTUGUESE_PRESENT_EDITORIAL } from './portuguese-present-editorial.ts'
import { PORTUGUESE_PROGRESSIVE_EDITORIAL } from './portuguese-progressive-editorial.ts'
import { PORTUGUESE_PRETERITE_PERFECT_EDITORIAL } from './portuguese-preterite-perfect-editorial.ts'
import { PORTUGUESE_PRETERITE_IMPERFECT_EDITORIAL } from './portuguese-preterite-imperfect-editorial.ts'
import { PORTUGUESE_PLUPERFECT_EDITORIAL } from './portuguese-pluperfect-editorial.ts'
import { PORTUGUESE_NEAR_FUTURE_EDITORIAL } from './portuguese-near-future-editorial.ts'
import { PORTUGUESE_FORMAL_FUTURE_EDITORIAL } from './portuguese-formal-future-editorial.ts'
import { PORTUGUESE_FUTURE_PERFECT_EDITORIAL } from './portuguese-future-perfect-editorial.ts'
import { PORTUGUESE_FUTURE_IN_PAST_EDITORIAL } from './portuguese-future-in-past-editorial.ts'
import { PORTUGUESE_PAST_CONDITIONAL_EDITORIAL } from './portuguese-past-conditional-editorial.ts'

export const PORTUGUESE_FORMS = [
  { id: 'presente', label: 'Presente', group: 'Presente' },
  { id: 'progressivo', label: 'Estar + gerúndio', group: 'Presente' },
  { id: 'preterito-perfeito', label: 'Pretérito perfeito', group: 'Passado' },
  { id: 'preterito-imperfeito', label: 'Pretérito imperfeito', group: 'Passado' },
  { id: 'mais-que-perfeito', label: 'Mais-que-perfeito composto', group: 'Passado' },
  { id: 'futuro-proximo', label: 'Ir + infinitivo', group: 'Futuro' },
  { id: 'futuro-presente', label: 'Futuro do presente', group: 'Futuro' },
  { id: 'futuro-composto', label: 'Futuro composto', group: 'Futuro' },
  { id: 'futuro-preterito', label: 'Futuro do pretérito', group: 'Hipótese' },
  { id: 'condicional-passado', label: 'Condicional passado', group: 'Hipótese' },
] as const

export type PortugueseFormId = (typeof PORTUGUESE_FORMS)[number]['id']

const EDITORIAL_PACKS = [
  PORTUGUESE_PRESENT_EDITORIAL,
  PORTUGUESE_PROGRESSIVE_EDITORIAL,
  PORTUGUESE_PRETERITE_PERFECT_EDITORIAL,
  PORTUGUESE_PRETERITE_IMPERFECT_EDITORIAL,
  PORTUGUESE_PLUPERFECT_EDITORIAL,
  PORTUGUESE_NEAR_FUTURE_EDITORIAL,
  PORTUGUESE_FORMAL_FUTURE_EDITORIAL,
  PORTUGUESE_FUTURE_PERFECT_EDITORIAL,
  PORTUGUESE_FUTURE_IN_PAST_EDITORIAL,
  PORTUGUESE_PAST_CONDITIONAL_EDITORIAL,
]

export const PORTUGUESE_STRUCTURE_QUEST: TenseQuestConfig<PortugueseFormId> = {
  id: 'portuguese-structure-quest',
  storageKey: 'wl-portuguese-structure-quest-v3',
  forms: PORTUGUESE_FORMS,
  presets: [
    { label: 'Passado', ids: PORTUGUESE_FORMS.filter((form) => form.group === 'Passado').map((form) => form.id) },
    { label: 'Futuro', ids: PORTUGUESE_FORMS.filter((form) => form.group === 'Futuro').map((form) => form.id) },
    { label: 'Hipótese', ids: PORTUGUESE_FORMS.filter((form) => form.group === 'Hipótese').map((form) => form.id) },
  ],
  levels: [
    { number: '01', title: 'Escolha rápida', short: 'Escolher no contexto', description: 'Reconheça a forma justificada por cada pista.' },
    { number: '02', title: 'Microtextos', short: 'Produzir a forma', description: 'Escreva todo o grupo verbal a partir de um contexto preciso.' },
    { number: '03', title: 'Histórias conectadas', short: 'Três decisões', description: 'Complete uma única cena coerente com três formas-alvo.' },
    { number: '04', title: 'Oficina de correção', short: 'Detectar e corrigir', description: 'Encontre a única forma que rompe um texto coerente.' },
    { number: '05', title: 'Sequência semântica', short: 'Recuperar o sentido', description: 'Reconstrua a ordem quando todas as opções usam a mesma forma.' },
    { number: '06', title: 'Dossiê final', short: 'Decisões fechadas', description: 'Resolva dez cenas autônomas com quatro formas plausíveis do mesmo verbo.' },
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
      id: `ptbr-final-editorial-${index + 1}`,
      title: `Dossiê de contexto · ${index + 1}`,
      instruction: 'Abra cada cena e escolha uma forma entre quatro possibilidades do mesmo verbo.',
      segments: new Array(gaps.length + 1).fill(''),
      gaps,
      cards: EDITORIAL_PACKS.flatMap((pack) => pack.finalCards.filter((card) => candidateIds.has(card.id))),
      explanation: 'Cada cena fornece sozinha as pistas de tempo, aspecto, registro e hipótese necessárias.',
    }
  }),
  copy: {
    languageName: 'Portugués', languageCode: 'pt-BR', eyebrow: 'Quiz de tempo e estrutura · A2–B2', title: 'A central da narrativa',
    lead: 'Practica portugués brasileño con diez decisiones reales por nivel, desde el reconocimiento hasta escenas finales independientes.',
    range: '10 formas', selectedLabel: 'formas selecionadas', selectorTitle: '¿Qué formas del portugués quieres practicar?',
    selectorLead: 'El estándar es portugués brasileño; el futuro sintético se marca por registro y no reemplaza artificialmente ir + infinitivo.',
    configuredEyebrow: 'Percurso personalizado', levelsTitle: 'Seis niveles con corrección diferida',
    levelsLead: 'Termina el nivel para ver puntaje, soluciones y explicación.', mapLabels: ['Antes', 'Passado', 'Agora', 'Futuro'],
    reviewLinks: [
      { href: '/practica/portugues/a1/gramatica', label: 'Repasar gramática A1' },
      { href: '/practica/portugues/a2/gramatica', label: 'Profundizar en A2' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  },
}
