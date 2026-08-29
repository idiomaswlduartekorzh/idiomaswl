import type { TenseQuestConfig } from './tense-quest-types.ts'
import { JAPANESE_NONPAST_AFFIRMATIVE_EDITORIAL } from './japanese-nonpast-affirmative-editorial.ts'
import { JAPANESE_NONPAST_NEGATIVE_EDITORIAL } from './japanese-nonpast-negative-editorial.ts'
import { JAPANESE_PAST_AFFIRMATIVE_EDITORIAL } from './japanese-past-affirmative-editorial.ts'
import { JAPANESE_PAST_NEGATIVE_EDITORIAL } from './japanese-past-negative-editorial.ts'
import { JAPANESE_PROGRESSIVE_EDITORIAL } from './japanese-progressive-editorial.ts'
import { JAPANESE_RESULT_STATE_EDITORIAL } from './japanese-result-state-editorial.ts'
import { JAPANESE_EXPERIENCE_EDITORIAL } from './japanese-experience-editorial.ts'
import { JAPANESE_PLAN_INTENTION_EDITORIAL } from './japanese-plan-intention-editorial.ts'
import { JAPANESE_TARA_CONDITIONAL_EDITORIAL } from './japanese-tara-conditional-editorial.ts'
import { JAPANESE_REQUEST_PROHIBITION_EDITORIAL } from './japanese-request-prohibition-editorial.ts'

export const JAPANESE_FORMS = [
  { id:'nonpast-affirmative', label:'非過去・肯定（ます）', group:'時制' },
  { id:'nonpast-negative', label:'非過去・否定（ません）', group:'時制' },
  { id:'past-affirmative', label:'過去・肯定（ました）', group:'時制' },
  { id:'past-negative', label:'過去・否定（ませんでした）', group:'時制' },
  { id:'progressive', label:'進行中（ています）', group:'アスペクト' },
  { id:'result-state', label:'結果状態（ています）', group:'アスペクト' },
  { id:'experience', label:'経験（たことがある）', group:'アスペクト' },
  { id:'plan-intention', label:'予定・意図', group:'未来表現' },
  { id:'tara-conditional', label:'条件（たら）', group:'条件' },
  { id:'request-prohibition', label:'依頼・禁止', group:'働きかけ' },
] as const
export type JapaneseFormId = (typeof JAPANESE_FORMS)[number]['id']
export const JAPANESE_EDITORIAL_PACKS = [
  JAPANESE_NONPAST_AFFIRMATIVE_EDITORIAL, JAPANESE_NONPAST_NEGATIVE_EDITORIAL,
  JAPANESE_PAST_AFFIRMATIVE_EDITORIAL, JAPANESE_PAST_NEGATIVE_EDITORIAL,
  JAPANESE_PROGRESSIVE_EDITORIAL, JAPANESE_RESULT_STATE_EDITORIAL, JAPANESE_EXPERIENCE_EDITORIAL,
  JAPANESE_PLAN_INTENTION_EDITORIAL, JAPANESE_TARA_CONDITIONAL_EDITORIAL, JAPANESE_REQUEST_PROHIBITION_EDITORIAL,
]

export const JAPANESE_STRUCTURE_QUEST: TenseQuestConfig<JapaneseFormId> = {
  id:'japanese-structure-quest', storageKey:'wl-japanese-structure-quest-v3', forms:JAPANESE_FORMS,
  presets:[
    { label:'時制', ids:JAPANESE_FORMS.filter((form) => form.group === '時制').map((form) => form.id) },
    { label:'アスペクト', ids:JAPANESE_FORMS.filter((form) => form.group === 'アスペクト').map((form) => form.id) },
    { label:'条件・依頼', ids:JAPANESE_FORMS.filter((form) => ['条件','働きかけ'].includes(form.group)).map((form) => form.id) },
  ],
  levels:[
    { number:'01', title:'文脈で選ぶ', short:'形を見分ける', description:'時・相・機能が一意になる文脈から選びます。' },
    { number:'02', title:'ミニ場面', short:'表現を作る', description:'動詞だけでなく必要な構文全体を書きます。' },
    { number:'03', title:'つながる場面', short:'三つの判断', description:'一つのまとまった場面で三つの表現を完成させます。' },
    { number:'04', title:'表現の修理', short:'誤りを直す', description:'意味を壊す一つの表現を選び、完全に直します。' },
    { number:'05', title:'意味の順序', short:'流れを戻す', description:'形の見た目ではなく場面の展開で順序を判断します。' },
    { number:'06', title:'最終ドシエ', short:'独立した判断', description:'同じ動詞の四つの形から十の独立した場面を解きます。' },
  ],
  choiceChallenges:JAPANESE_EDITORIAL_PACKS.flatMap((pack) => pack.choices),
  microStories:JAPANESE_EDITORIAL_PACKS.flatMap((pack) => pack.micro),
  longStories:JAPANESE_EDITORIAL_PACKS.flatMap((pack) => pack.long),
  errorChallenges:JAPANESE_EDITORIAL_PACKS.flatMap((pack) => pack.errors),
  timelineChallenges:JAPANESE_EDITORIAL_PACKS.flatMap((pack) => pack.timelines),
  finalChallenges:Array.from({ length:10 }, (_, index) => {
    const gaps = JAPANESE_EDITORIAL_PACKS.map((pack) => pack.finalGaps[index])
    const candidateIds = new Set(gaps.flatMap((gap) => gap.candidateCardIds ?? []))
    return { id:`ja-final-editorial-${index + 1}`, title:`文脈ドシエ · ${index + 1}`,
      instruction:'各場面を開き、同じ動詞の四つの表現から一つを選んでください。', segments:new Array(gaps.length + 1).fill(''), gaps,
      cards:JAPANESE_EDITORIAL_PACKS.flatMap((pack) => pack.finalCards.filter((card) => candidateIds.has(card.id))),
      explanation:'各場面だけで、時・進行・結果状態・経験・予定・条件・依頼を判断できます。' }
  }),
  copy:{
    languageName:'Japonés', languageCode:'ja', eyebrow:'Quiz de tiempo, aspecto y función · A2–B1', title:'時間と場面の研究室',
    lead:'Practica diez contrastes japoneses con diez decisiones reales por nivel, sin imponer categorías temporales europeas.',
    range:'10 contrastes', selectedLabel:'項目を選択', selectorTitle:'¿Qué contrastes del japonés quieres practicar?',
    selectorLead:'El no-pasado conserva su nombre; se separan acción en progreso y estado posterior al cambio.',
    configuredEyebrow:'自分の練習コース', levelsTitle:'Seis niveles con corrección diferida', levelsLead:'Termina el nivel para ver puntaje, soluciones y explicación.',
    mapLabels:['以前','過去','今','これから'], reviewLinks:[
      { href:'/practica/japones/a1/gramatica', label:'Repasar gramática A1' },{ href:'/practica/japones/a2/gramatica', label:'Profundizar en A2' },{ href:'/herramientas/quizes', label:'Ver más quizes' },
    ],
  },
}
