import type { TenseQuestConfig } from './tense-quest-types.ts'
import { GERMAN_PRESENT_EDITORIAL } from './german-present-editorial.ts'
import { GERMAN_PERFECT_HABEN_EDITORIAL } from './german-perfect-haben-editorial.ts'
import { GERMAN_PERFECT_SEIN_EDITORIAL } from './german-perfect-sein-editorial.ts'
import { GERMAN_PRETERITE_EDITORIAL } from './german-preterite-editorial.ts'
import { GERMAN_PLUPERFECT_EDITORIAL } from './german-pluperfect-editorial.ts'
import { GERMAN_FUTURE_ONE_EDITORIAL } from './german-future-one-editorial.ts'
import { GERMAN_FUTURE_TWO_EDITORIAL } from './german-future-two-editorial.ts'
import { GERMAN_WOULD_EDITORIAL } from './german-would-editorial.ts'
import { GERMAN_UNREAL_PAST_EDITORIAL } from './german-unreal-past-editorial.ts'
import { GERMAN_IMPERATIVE_EDITORIAL } from './german-imperative-editorial.ts'

export const GERMAN_FORMS = [
  { id: 'praesens', label: 'Präsens', group: 'Gegenwart' },
  { id: 'perfekt-haben', label: 'Perfekt mit haben', group: 'Vergangenheit' },
  { id: 'perfekt-sein', label: 'Perfekt mit sein', group: 'Vergangenheit' },
  { id: 'praeteritum', label: 'Präteritum', group: 'Vergangenheit' },
  { id: 'plusquamperfekt', label: 'Plusquamperfekt', group: 'Vergangenheit' },
  { id: 'futur-eins', label: 'Futur I', group: 'Zukunft' },
  { id: 'futur-zwei', label: 'Futur II', group: 'Zukunft' },
  { id: 'wuerde-form', label: 'würde + Infinitiv', group: 'Hypothese' },
  { id: 'konjunktiv-vergangenheit', label: 'Irreale Vergangenheit', group: 'Hypothese' },
  { id: 'imperativ', label: 'Imperativ', group: 'Aufforderung' },
] as const
export type GermanFormId = (typeof GERMAN_FORMS)[number]['id']

export const GERMAN_EDITORIAL_PACKS = [
  GERMAN_PRESENT_EDITORIAL, GERMAN_PERFECT_HABEN_EDITORIAL, GERMAN_PERFECT_SEIN_EDITORIAL,
  GERMAN_PRETERITE_EDITORIAL, GERMAN_PLUPERFECT_EDITORIAL, GERMAN_FUTURE_ONE_EDITORIAL,
  GERMAN_FUTURE_TWO_EDITORIAL, GERMAN_WOULD_EDITORIAL, GERMAN_UNREAL_PAST_EDITORIAL,
  GERMAN_IMPERATIVE_EDITORIAL,
]

export const GERMAN_STRUCTURE_QUEST: TenseQuestConfig<GermanFormId> = {
  id: 'german-structure-quest', storageKey: 'wl-german-structure-quest-v4', forms: GERMAN_FORMS,
  presets: [
    { label: 'Vergangenheit', ids: GERMAN_FORMS.filter((form) => form.group === 'Vergangenheit').map((form) => form.id) },
    { label: 'Zukunft', ids: GERMAN_FORMS.filter((form) => form.group === 'Zukunft').map((form) => form.id) },
    { label: 'Hypothese', ids: GERMAN_FORMS.filter((form) => form.group === 'Hypothese').map((form) => form.id) },
  ],
  levels: [
    { number:'01', title:'Schnelle Wahl', short:'Richtig konjugieren', description:'Wähle die passende Konjugation; alle vier Optionen stehen in der ausgewählten Form.' },
    { number:'02', title:'Mikrotexte', short:'Form im Satz bilden', description:'Schreibe genau den fehlenden Teil. Sichtbare trennbare Zusätze bleiben an ihrer Satzposition.' },
    { number:'03', title:'Verbundene Szenen', short:'Drei Entscheidungen', description:'Ergänze drei Formen in einer zusammenhängenden Handlung.' },
    { number:'04', title:'Korrekturwerkstatt', short:'Finden und reparieren', description:'Finde die einzige falsche Verbgruppe und korrigiere sie.' },
    { number:'05', title:'Sinnvolle Abfolge', short:'Bedeutung rekonstruieren', description:'Ordne Ereignisse, obwohl alle Optionen dieselbe Zielform verwenden.' },
    { number:'06', title:'Abschlussdossier', short:'Geschlossene Entscheidungen', description:'Löse zehn eigenständige Szenen mit vier plausiblen Formen desselben Verbs.' },
  ],
  choiceChallenges: GERMAN_EDITORIAL_PACKS.flatMap((pack) => pack.choices),
  microStories: GERMAN_EDITORIAL_PACKS.flatMap((pack) => pack.micro),
  longStories: GERMAN_EDITORIAL_PACKS.flatMap((pack) => pack.long),
  errorChallenges: GERMAN_EDITORIAL_PACKS.flatMap((pack) => pack.errors),
  timelineChallenges: GERMAN_EDITORIAL_PACKS.flatMap((pack) => pack.timelines),
  finalChallenges: Array.from({ length: 10 }, (_, index) => {
    const gaps = GERMAN_EDITORIAL_PACKS.map((pack) => pack.finalGaps[index])
    const candidateIds = new Set(gaps.flatMap((gap) => gap.candidateCardIds ?? []))
    return {
      id:`de-final-editorial-${index + 1}`, title:`Kontextdossier · ${index + 1}`,
      instruction:'Öffne jede Szene und wähle eine vollständige Verbform aus vier Formen desselben Verbs.',
      segments:new Array(gaps.length + 1).fill(''), gaps,
      cards:GERMAN_EDITORIAL_PACKS.flatMap((pack) => pack.finalCards.filter((card) => candidateIds.has(card.id))),
      explanation:'Jede Szene enthält selbstständig die nötigen Hinweise auf Zeit, Abschluss, Bedingung, Hilfsverb oder Anrede.',
    }
  }),
  copy: {
    languageName:'Alemán', languageCode:'de', eyebrow:'Quiz de Zeitformen und Satzlogik · A1–B2', title:'Die Zeitwerkstatt',
    lead:'Entrena tiempo, auxiliar, unidad verbal completa, orden sintáctico e hipótesis con diez decisiones reales por nivel.',
    range:'10 estructuras', selectedLabel:'Strukturen ausgewählt', selectorTitle:'¿Qué estructuras del alemán quieres practicar?',
    selectorLead:'Perfekt con haben y sein se separan; los compuestos se escriben completos y el imperativo siempre muestra el tratamiento.',
    configuredEyebrow:'Persönlicher Lernweg', levelsTitle:'Seis niveles con corrección diferida',
    levelsLead:'Termina el nivel para ver puntaje, soluciones y explicación.', mapLabels:['Vorher','Vergangenheit','Jetzt','Zukunft'],
    reviewLinks:[
      { href:'/practica/aleman/a1/gramatica', label:'Repasar gramática A1' },
      { href:'/practica/aleman/a2/gramatica', label:'Profundizar en A2' },
      { href:'/herramientas/quizes', label:'Ver más quizes' },
    ],
  },
}
