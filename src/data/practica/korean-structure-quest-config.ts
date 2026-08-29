import type { TenseQuestConfig } from './tense-quest-types.ts'
import { KOREAN_PRESENT_POLITE_EDITORIAL } from './korean-present-polite-editorial.ts'
import { KOREAN_PRESENT_FORMAL_EDITORIAL } from './korean-present-formal-editorial.ts'
import { KOREAN_PAST_POLITE_EDITORIAL } from './korean-past-polite-editorial.ts'
import { KOREAN_FUTURE_INTENTION_EDITORIAL } from './korean-future-intention-editorial.ts'
import { KOREAN_PROGRESSIVE_EDITORIAL } from './korean-progressive-editorial.ts'
import { KOREAN_RESULT_STATE_EDITORIAL } from './korean-result-state-editorial.ts'
import { KOREAN_EXPERIENCE_EDITORIAL } from './korean-experience-editorial.ts'
import { KOREAN_CONDITIONAL_EDITORIAL } from './korean-conditional-editorial.ts'
import { KOREAN_PURPOSE_INTENTION_EDITORIAL } from './korean-purpose-intention-editorial.ts'
import { KOREAN_REQUEST_PROHIBITION_EDITORIAL } from './korean-request-prohibition-editorial.ts'

export const KOREAN_FORMS = [
  { id:'present-polite', label:'해요체 현재', group:'시제와 높임' },
  { id:'present-formal', label:'합니다체 현재', group:'시제와 높임' },
  { id:'past-polite', label:'해요체 과거', group:'시제와 높임' },
  { id:'future-intention', label:'미래·예정 -(으)ㄹ 거예요', group:'미래 표현' },
  { id:'progressive', label:'진행 -고 있어요', group:'상' },
  { id:'result-state', label:'결과 상태 -아/어 있어요', group:'상' },
  { id:'experience', label:'경험 -(으)ㄴ 적이 있어요', group:'상' },
  { id:'conditional', label:'조건 -(으)면', group:'조건' },
  { id:'purpose-intention', label:'의도 -(으)려고 해요', group:'의도' },
  { id:'request-prohibition', label:'요청·금지', group:'상대방 행동' },
] as const
export type KoreanFormId = (typeof KOREAN_FORMS)[number]['id']

export const KOREAN_EDITORIAL_PACKS = [
  KOREAN_PRESENT_POLITE_EDITORIAL, KOREAN_PRESENT_FORMAL_EDITORIAL, KOREAN_PAST_POLITE_EDITORIAL,
  KOREAN_FUTURE_INTENTION_EDITORIAL, KOREAN_PROGRESSIVE_EDITORIAL, KOREAN_RESULT_STATE_EDITORIAL,
  KOREAN_EXPERIENCE_EDITORIAL, KOREAN_CONDITIONAL_EDITORIAL, KOREAN_PURPOSE_INTENTION_EDITORIAL,
  KOREAN_REQUEST_PROHIBITION_EDITORIAL,
]

export const KOREAN_STRUCTURE_QUEST: TenseQuestConfig<KoreanFormId> = {
  id:'korean-structure-quest', storageKey:'wl-korean-structure-quest-v3', forms:KOREAN_FORMS,
  presets:[
    { label:'시제와 높임', ids:KOREAN_FORMS.filter((form) => form.group === '시제와 높임').map((form) => form.id) },
    { label:'상', ids:KOREAN_FORMS.filter((form) => form.group === '상').map((form) => form.id) },
    { label:'조건·의도', ids:KOREAN_FORMS.filter((form) => ['조건','의도'].includes(form.group)).map((form) => form.id) },
  ],
  levels:[
    { number:'01', title:'문맥으로 고르기', short:'형태 구별', description:'시간·상·높임이 하나로 결정되는 문맥에서 고릅니다.' },
    { number:'02', title:'짧은 장면', short:'전체 표현 쓰기', description:'동사뿐 아니라 필요한 문법 구성을 끝까지 씁니다.' },
    { number:'03', title:'연결된 장면', short:'세 번 판단하기', description:'하나의 자연스러운 장면에서 세 표현을 완성합니다.' },
    { number:'04', title:'표현 수리', short:'오류 고치기', description:'시제·상·높임을 깨뜨리는 표현을 찾아 완전히 고칩니다.' },
    { number:'05', title:'의미의 순서', short:'흐름 복원', description:'형태가 아니라 사건과 의미의 흐름으로 순서를 판단합니다.' },
    { number:'06', title:'최종 도전', short:'독립 문맥 판단', description:'같은 동사의 네 표현 중 독립된 열 장면에 맞는 답을 고릅니다.' },
  ],
  choiceChallenges:KOREAN_EDITORIAL_PACKS.flatMap((pack) => pack.choices),
  microStories:KOREAN_EDITORIAL_PACKS.flatMap((pack) => pack.micro),
  longStories:KOREAN_EDITORIAL_PACKS.flatMap((pack) => pack.long),
  errorChallenges:KOREAN_EDITORIAL_PACKS.flatMap((pack) => pack.errors),
  timelineChallenges:KOREAN_EDITORIAL_PACKS.flatMap((pack) => pack.timelines),
  finalChallenges:Array.from({ length:10 }, (_, index) => {
    const gaps = KOREAN_EDITORIAL_PACKS.map((pack) => pack.finalGaps[index])
    const candidateIds = new Set(gaps.flatMap((gap) => gap.candidateCardIds ?? []))
    return { id:`ko-final-editorial-${index + 1}`, title:`문맥 도전 · ${index + 1}`,
      instruction:'각 장면을 열고 같은 동사의 네 표현 중 문맥에 맞는 하나를 고르세요.', segments:new Array(gaps.length + 1).fill(''), gaps,
      cards:KOREAN_EDITORIAL_PACKS.flatMap((pack) => pack.finalCards.filter((card) => candidateIds.has(card.id))),
      explanation:'각 장면만으로 시제, 높임, 진행, 결과 상태, 경험, 조건, 의도, 요청을 판단할 수 있습니다.' }
  }),
  copy:{
    languageName:'Coreano', languageCode:'ko', eyebrow:'Quiz de tiempo, aspecto y registro · A2–B1', title:'시간과 높임말 실험실',
    lead:'Practica diez contrastes coreanos con diez decisiones reales por nivel y expresiones completas.',
    range:'10 contrastes', selectedLabel:'항목 선택', selectorTitle:'¿Qué contrastes del coreano quieres practicar?',
    selectorLead:'Separamos 해요체 y 합니다체, acción en progreso y estado resultante, además de experiencia, condición, intención y función interpersonal.',
    configuredEyebrow:'나만의 연습 코스', levelsTitle:'Seis niveles con corrección diferida', levelsLead:'Termina el nivel para ver puntaje, soluciones y explicación.',
    mapLabels:['이전','과거','지금','미래'], reviewLinks:[
      { href:'/practica/coreano/a1/gramatica', label:'Repasar gramática A1' },{ href:'/practica/coreano/a2/gramatica', label:'Profundizar en A2' },{ href:'/herramientas/quizes', label:'Ver más quizes' },
    ],
  },
}
