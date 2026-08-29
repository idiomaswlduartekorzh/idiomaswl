import type { TenseQuestConfig } from './tense-quest-types.ts'
import { FRENCH_PRESENT_EDITORIAL } from './french-present-editorial.ts'
import { FRENCH_PASSE_COMPOSE_EDITORIAL } from './french-passe-compose-editorial.ts'
import { FRENCH_IMPARFAIT_EDITORIAL } from './french-imparfait-editorial.ts'
import { FRENCH_PLUS_QUE_PARFAIT_EDITORIAL } from './french-plus-que-parfait-editorial.ts'
import { FRENCH_PASSE_SIMPLE_EDITORIAL } from './french-passe-simple-editorial.ts'
import { FRENCH_FUTUR_PROCHE_EDITORIAL } from './french-futur-proche-editorial.ts'
import { FRENCH_FUTUR_SIMPLE_EDITORIAL } from './french-futur-simple-editorial.ts'
import { FRENCH_FUTUR_ANTERIEUR_EDITORIAL } from './french-futur-anterieur-editorial.ts'
import { FRENCH_CONDITIONNEL_PRESENT_EDITORIAL } from './french-conditionnel-present-editorial.ts'
import { FRENCH_CONDITIONNEL_PASSE_EDITORIAL } from './french-conditionnel-passe-editorial.ts'

export const FRENCH_FORMS = [
  { id: 'present', label: 'Présent', group: 'Présent' },
  { id: 'passe-compose', label: 'Passé composé', group: 'Passé' },
  { id: 'imparfait', label: 'Imparfait', group: 'Passé' },
  { id: 'plus-que-parfait', label: 'Plus-que-parfait', group: 'Passé' },
  { id: 'passe-simple', label: 'Passé simple', group: 'Passé littéraire' },
  { id: 'futur-proche', label: 'Futur proche', group: 'Futur' },
  { id: 'futur-simple', label: 'Futur simple', group: 'Futur' },
  { id: 'futur-anterieur', label: 'Futur antérieur', group: 'Futur' },
  { id: 'conditionnel-present', label: 'Conditionnel présent', group: 'Conditionnel' },
  { id: 'conditionnel-passe', label: 'Conditionnel passé', group: 'Conditionnel' },
] as const

export type FrenchFormId = (typeof FRENCH_FORMS)[number]['id']

const EDITORIAL_PACKS = [
  FRENCH_PRESENT_EDITORIAL,
  FRENCH_PASSE_COMPOSE_EDITORIAL,
  FRENCH_IMPARFAIT_EDITORIAL,
  FRENCH_PLUS_QUE_PARFAIT_EDITORIAL,
  FRENCH_PASSE_SIMPLE_EDITORIAL,
  FRENCH_FUTUR_PROCHE_EDITORIAL,
  FRENCH_FUTUR_SIMPLE_EDITORIAL,
  FRENCH_FUTUR_ANTERIEUR_EDITORIAL,
  FRENCH_CONDITIONNEL_PRESENT_EDITORIAL,
  FRENCH_CONDITIONNEL_PASSE_EDITORIAL,
]

export const FRENCH_STRUCTURE_QUEST: TenseQuestConfig<FrenchFormId> = {
  id: 'french-structure-quest',
  storageKey: 'wl-french-structure-quest-v3',
  forms: FRENCH_FORMS,
  presets: [
    { label: 'Passé', ids: FRENCH_FORMS.filter((form) => form.group.startsWith('Passé')).map((form) => form.id) },
    { label: 'Futur', ids: FRENCH_FORMS.filter((form) => form.group === 'Futur').map((form) => form.id) },
    { label: 'Conditionnel', ids: FRENCH_FORMS.filter((form) => form.group === 'Conditionnel').map((form) => form.id) },
  ],
  levels: [
    { number: '01', title: 'Choix rapide', short: 'Choisir en contexte', description: 'Reconnais la forme justifiée par chaque indice.' },
    { number: '02', title: 'Microtextes', short: 'Produire la forme', description: 'Écris tout le groupe verbal à partir d’un contexte précis.' },
    { number: '03', title: 'Récits connectés', short: 'Trois décisions', description: 'Complète une seule scène cohérente avec trois formes cibles.' },
    { number: '04', title: 'Atelier de réparation', short: 'Détecter et corriger', description: 'Repère l’unique forme qui brise un texte cohérent.' },
    { number: '05', title: 'Suite sémantique', short: 'Reconstruire le sens', description: 'Retrouve l’ordre quand toutes les options emploient la même forme.' },
    { number: '06', title: 'Dossier final', short: 'Décisions fermées', description: 'Résous dix scènes autonomes avec quatre formes plausibles du même verbe.' },
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
      id: `fr-final-editorial-${index + 1}`,
      title: `Dossier de contexte · ${index + 1}`,
      instruction: 'Ouvre chaque scène et choisis une forme parmi quatre possibilités du même verbe.',
      segments: new Array(gaps.length + 1).fill(''),
      gaps,
      cards: EDITORIAL_PACKS.flatMap((pack) => pack.finalCards.filter((card) => candidateIds.has(card.id))),
      explanation: 'Chaque scène fournit seule les repères de temps, de registre et d’accord nécessaires.',
    }
  }),
  copy: {
    languageName: 'Francés',
    languageCode: 'fr',
    eyebrow: 'Quiz de temps et structures · A2–B2',
    title: 'Le laboratoire du récit',
    lead: 'Elige las formas que quieres contrastar y avanza desde el reconocimiento hasta diez decisiones finales independientes.',
    range: '10 formas',
    selectedLabel: 'formas seleccionadas',
    selectorTitle: '¿Qué formas del francés quieres practicar?',
    selectorLead: 'El passé simple aparece como forma literaria; auxiliares, acuerdos y planos temporales forman parte de la decisión.',
    configuredEyebrow: 'Parcours personnalisé',
    levelsTitle: 'Seis niveles con corrección diferida',
    levelsLead: 'La solución aparece únicamente al terminar el nivel activo.',
    mapLabels: ['Avant', 'Passé', 'Maintenant', 'Avenir'],
    reviewLinks: [
      { href: '/practica/frances/a1/gramatica', label: 'Repasar gramática A1' },
      { href: '/practica/frances/a2/gramatica', label: 'Profundizar en A2' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  },
}
