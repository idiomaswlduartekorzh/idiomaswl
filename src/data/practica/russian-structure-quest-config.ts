import type { TenseQuestConfig } from './tense-quest-types.ts'
import { RUSSIAN_PRESENT_EDITORIAL } from './russian-present-editorial.ts'
import { RUSSIAN_PAST_IMPERFECTIVE_EDITORIAL } from './russian-past-imperfective-editorial.ts'
import { RUSSIAN_PAST_PERFECTIVE_EDITORIAL } from './russian-past-perfective-editorial.ts'
import { RUSSIAN_FUTURE_IMPERFECTIVE_EDITORIAL } from './russian-future-imperfective-editorial.ts'
import { RUSSIAN_FUTURE_PERFECTIVE_EDITORIAL } from './russian-future-perfective-editorial.ts'
import { RUSSIAN_CONDITIONAL_PRESENT_EDITORIAL } from './russian-conditional-present-editorial.ts'
import { RUSSIAN_CONDITIONAL_PAST_EDITORIAL } from './russian-conditional-past-editorial.ts'
import { RUSSIAN_IMPERATIVE_IMPERFECTIVE_EDITORIAL } from './russian-imperative-imperfective-editorial.ts'
import { RUSSIAN_IMPERATIVE_PERFECTIVE_EDITORIAL } from './russian-imperative-perfective-editorial.ts'
import { RUSSIAN_INFINITIVE_ASPECT_EDITORIAL } from './russian-infinitive-aspect-editorial.ts'

export const RUSSIAN_FORMS = [
  { id:'present-imperfective', label:'Настоящее время', group:'Время' },
  { id:'past-imperfective', label:'Прошедшее: процесс / фон', group:'Время и вид' },
  { id:'past-perfective', label:'Прошедшее: результат', group:'Время и вид' },
  { id:'future-imperfective', label:'Будущее: процесс', group:'Время и вид' },
  { id:'future-perfective', label:'Будущее: результат', group:'Время и вид' },
  { id:'conditional-present', label:'Условное: настоящее', group:'Условность' },
  { id:'conditional-past', label:'Условное: прошлое', group:'Условность' },
  { id:'imperative-imperfective', label:'Императив: процесс', group:'Побуждение' },
  { id:'imperative-perfective', label:'Императив: результат', group:'Побуждение' },
  { id:'infinitive-aspect', label:'Вид после фазовых глаголов', group:'Вид' },
] as const
export type RussianFormId = (typeof RUSSIAN_FORMS)[number]['id']

export const RUSSIAN_EDITORIAL_PACKS = [
  RUSSIAN_PRESENT_EDITORIAL, RUSSIAN_PAST_IMPERFECTIVE_EDITORIAL, RUSSIAN_PAST_PERFECTIVE_EDITORIAL,
  RUSSIAN_FUTURE_IMPERFECTIVE_EDITORIAL, RUSSIAN_FUTURE_PERFECTIVE_EDITORIAL,
  RUSSIAN_CONDITIONAL_PRESENT_EDITORIAL, RUSSIAN_CONDITIONAL_PAST_EDITORIAL,
  RUSSIAN_IMPERATIVE_IMPERFECTIVE_EDITORIAL, RUSSIAN_IMPERATIVE_PERFECTIVE_EDITORIAL,
  RUSSIAN_INFINITIVE_ASPECT_EDITORIAL,
]

export const RUSSIAN_STRUCTURE_QUEST: TenseQuestConfig<RussianFormId> = {
  id:'russian-structure-quest', storageKey:'wl-russian-structure-quest-v3', forms:RUSSIAN_FORMS,
  presets:[
    { label:'Время и вид', ids:RUSSIAN_FORMS.filter((form) => form.group.includes('Время')).map((form) => form.id) },
    { label:'Условность', ids:RUSSIAN_FORMS.filter((form) => form.group === 'Условность').map((form) => form.id) },
    { label:'Побуждение', ids:RUSSIAN_FORMS.filter((form) => form.group === 'Побуждение').map((form) => form.id) },
  ],
  levels:[
    { number:'01', title:'Быстрый выбор', short:'Выбрать по смыслу', description:'Определите время, вид или модальность по явной контекстной границе.' },
    { number:'02', title:'Микротексты', short:'Поставить форму', description:'Напишите всю глагольную форму или конструкцию.' },
    { number:'03', title:'Связные эпизоды', short:'Три решения', description:'Заполните три формы в одном осмысленном эпизоде.' },
    { number:'04', title:'Редакторская', short:'Найти и исправить', description:'Найдите единственную форму, нарушающую смысл эпизода.' },
    { number:'05', title:'Смысловая цепочка', short:'Восстановить порядок', description:'Определите порядок по развитию событий, а не по внешнему виду формы.' },
    { number:'06', title:'Итоговое досье', short:'Закрытые решения', description:'Решите десять автономных сцен с четырьмя правдоподобными формами.' },
  ],
  choiceChallenges:RUSSIAN_EDITORIAL_PACKS.flatMap((pack) => pack.choices),
  microStories:RUSSIAN_EDITORIAL_PACKS.flatMap((pack) => pack.micro),
  longStories:RUSSIAN_EDITORIAL_PACKS.flatMap((pack) => pack.long),
  errorChallenges:RUSSIAN_EDITORIAL_PACKS.flatMap((pack) => pack.errors),
  timelineChallenges:RUSSIAN_EDITORIAL_PACKS.flatMap((pack) => pack.timelines),
  finalChallenges:Array.from({ length:10 }, (_, index) => {
    const gaps = RUSSIAN_EDITORIAL_PACKS.map((pack) => pack.finalGaps[index])
    const candidateIds = new Set(gaps.flatMap((gap) => gap.candidateCardIds ?? []))
    return {
      id:`ru-final-editorial-${index + 1}`, title:`Контекстное досье · ${index + 1}`,
      instruction:'Откройте каждую сцену и выберите одну из четырёх форм того же глагола или видовой пары.',
      segments:new Array(gaps.length + 1).fill(''), gaps,
      cards:RUSSIAN_EDITORIAL_PACKS.flatMap((pack) => pack.finalCards.filter((card) => candidateIds.has(card.id))),
      explanation:'Каждая сцена самостоятельно показывает время, процесс, предел, условие или коммуникативную цель.',
    }
  }),
  copy:{
    languageName:'Ruso', languageCode:'ru', eyebrow:'Quiz de tiempo, aspecto y modalidad · A2–B1', title:'Мастерская вида',
    lead:'Practica la decisión central del ruso con diez contextos reales por nivel: proceso, resultado, condición y propósito comunicativo.',
    range:'10 contrastes', selectedLabel:'контрастов выбрано', selectorTitle:'¿Qué contrastes del ruso quieres practicar?',
    selectorLead:'El pasado y el futuro se separan por aspecto; la condición usa бы y depende de una referencia temporal explícita.',
    configuredEyebrow:'Личный маршрут', levelsTitle:'Seis niveles con corrección diferida', levelsLead:'Termina el nivel para ver puntaje, soluciones y explicación.',
    mapLabels:['Раньше','Прошлое','Сейчас','Будущее'],
    reviewLinks:[{ href:'/practica/ruso/a1/gramatica', label:'Repasar gramática A1' },{ href:'/practica/ruso/a2/gramatica', label:'Profundizar en A2' },{ href:'/herramientas/quizes', label:'Ver más quizes' }],
  },
}
