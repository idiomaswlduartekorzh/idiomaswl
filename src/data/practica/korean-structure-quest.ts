import { createStructureQuest, type FinalRow, type StructureSeed } from './create-structure-quest.ts'

export const KOREAN_FORMS = [
  { id: 'present-polite', label: '해요체 현재', group: '시제와 높임' },
  { id: 'present-formal', label: '합니다체 현재', group: '시제와 높임' },
  { id: 'past-polite', label: '해요체 과거', group: '시제와 높임' },
  { id: 'future-intention', label: '미래·예정 -(으)ㄹ 거예요', group: '미래 표현' },
  { id: 'progressive', label: '진행 -고 있어요', group: '상' },
  { id: 'result-state', label: '결과 상태 -아/어 있어요', group: '상' },
  { id: 'experience', label: '경험 -(으)ㄴ 적이 있어요', group: '상' },
  { id: 'conditional', label: '조건 -(으)면', group: '조건' },
  { id: 'purpose-intention', label: '의도 -(으)려고 해요', group: '의도' },
  { id: 'request-prohibition', label: '요청·금지', group: '상대방 행동' },
] as const

export type KoreanFormId = (typeof KOREAN_FORMS)[number]['id']

const SEEDS: StructureSeed<KoreanFormId>[] = [
  { id: 'present-polite', explanation: '해요체 현재형은 일상 대화에서 습관, 현재 상태, 정해진 일정을 공손하게 말합니다.', examples: [
    { context: '저는 매일 아침 커피를 ___.', answer: '마셔요', wrong: '마시어요', lemma: '마시다', cue: '일상적인 습관', distractors: ['마셨어요', '마시고 있어요', '마실 거예요'] },
    { context: '해요체로 말해요: 저는 지금 서울에 ___.', answer: '살아요', wrong: '살으요', lemma: '살다', cue: '해요체의 현재 상태', distractors: ['살았어요', '삽니다', '살 거예요'] },
    { context: '수업은 아홉 시에 ___.', answer: '시작해요', wrong: '시작하요', lemma: '시작하다', cue: '정해진 일정', distractors: ['시작했어요', '시작하고 있어요', '시작할 거예요'] },
  ] },
  { id: 'present-formal', explanation: '합니다체는 발표, 안내, 업무 상황에서 현재 사실과 일정을 격식 있게 전달합니다.', examples: [
    { context: '회의는 오전 열 시에 ___.', answer: '시작합니다', wrong: '시작해습니다', lemma: '시작하다', cue: '격식 있는 일정 안내', distractors: ['시작했습니다', '시작하고 있습니다', '시작할 겁니다'] },
    { context: '저는 국제부에서 ___.', answer: '근무합니다', wrong: '근무하습니다', lemma: '근무하다', cue: '격식 있는 자기소개', distractors: ['근무했습니다', '근무하고 있습니다', '근무할 겁니다'] },
    { context: '이 열차는 부산에 ___.', answer: '도착합니다', wrong: '도착합니요', lemma: '도착하다', cue: '공식 안내', distractors: ['도착했습니다', '도착하고 있습니다', '도착할 겁니다'] },
  ] },
  { id: 'past-polite', explanation: '-았/었어요는 해요체에서 완료된 과거 사건을 나타내며, 하다는 했어요로 줄어듭니다.', examples: [
    { context: '어제 새 영화를 ___.', answer: '봤어요', wrong: '보았으요', lemma: '보다', cue: '어제 끝난 사건', distractors: ['봐요', '보고 있어요', '볼 거예요'] },
    { context: '지난주에 부산에 ___.', answer: '갔어요', wrong: '가었어요', lemma: '가다', cue: '과거의 이동', distractors: ['가요', '가고 있어요', '갈 거예요'] },
    { context: '숙제를 방금 ___.', answer: '끝냈어요', wrong: '끝내았어요', lemma: '끝내다', cue: '방금 완료한 일', distractors: ['끝내요', '끝내고 있어요', '끝낼 거예요'] },
  ] },
  { id: 'future-intention', explanation: '-(으)ㄹ 거예요는 예상, 계획, 미래 의도를 폭넓게 표현합니다. 받침 유무에 따라 을/ㄹ이 달라집니다.', examples: [
    { context: '내일 친구를 ___.', answer: '만날 거예요', wrong: '만나을 거예요', lemma: '만나다', cue: '미래 계획', distractors: ['만나요', '만났어요', '만나고 있어요'] },
    { context: '저 구름을 보세요. 곧 비가 ___.', answer: '올 거예요', wrong: '오을 거예요', lemma: '오다', cue: '근거가 있는 예상', distractors: ['와요', '왔어요', '오고 있어요'] },
    { context: '다음 달에 새집으로 ___.', answer: '이사할 거예요', wrong: '이사했을 거예요', lemma: '이사하다', cue: '정해진 미래 계획', distractors: ['이사해요', '이사했어요', '이사하고 있어요'] },
  ] },
  { id: 'progressive', explanation: '-고 있어요는 말하는 순간 진행 중이거나 일정 기간 계속되는 동작을 보여 줍니다.', examples: [
    { context: '지금 동생은 책을 ___.', answer: '읽고 있어요', wrong: '읽어 있어요', lemma: '읽다', cue: '지금 진행 중인 동작', distractors: ['읽어요', '읽었어요', '읽을 거예요'] },
    { context: '이번 달에는 집에서 ___.', answer: '일하고 있어요', wrong: '일해 있어요', lemma: '일하다', cue: '일시적으로 계속되는 활동', distractors: ['일해요', '일했어요', '일할 거예요'] },
    { context: '밖에 비가 ___.', answer: '오고 있어요', wrong: '와 있어요', lemma: '오다', cue: '눈앞에서 진행되는 현상', distractors: ['와요', '왔어요', '올 거예요'] },
  ] },
  { id: 'result-state', explanation: '-아/어 있어요는 자동사의 변화가 끝난 뒤 그 결과 상태가 유지됨을 나타냅니다.', examples: [
    { context: '문이 ___.', answer: '열려 있어요', wrong: '열고 있어요', lemma: '열리다', cue: '문이 열린 결과 상태', distractors: ['열려요', '열렸어요', '열릴 거예요'] },
    { context: '방에 불이 ___.', answer: '켜져 있어요', wrong: '켜고 있어요', lemma: '켜지다', cue: '불이 켜진 결과 상태', distractors: ['켜져요', '켜졌어요', '켜질 거예요'] },
    { context: '벽에 사진이 ___.', answer: '걸려 있어요', wrong: '걸고 있어요', lemma: '걸리다', cue: '사진이 걸린 결과 상태', distractors: ['걸려요', '걸렸어요', '걸릴 거예요'] },
  ] },
  { id: 'experience', explanation: '-아/어 보다의 과거 관형형 + 적이 있어요는 해 본 경험을, 없어요는 경험이 없음을 말합니다.', examples: [
    { context: '제주도에 ___.', answer: '가 본 적이 있어요', wrong: '가 볼 적이 있어요', lemma: '가다', cue: '살면서 해 본 경험', distractors: ['갔어요', '가고 있어요', '갈 거예요'] },
    { context: '저는 김치를 직접 ___.', answer: '만들어 본 적이 없어요', wrong: '만들어 볼 적이 없어요', lemma: '만들다', cue: '경험이 없음', distractors: ['만들었어요', '만들고 있어요', '만들 거예요'] },
    { context: '민수 씨는 그 작가를 ___.', answer: '만난 적이 있어요', wrong: '만날 적이 있어요', lemma: '만나다', cue: '과거 경험의 유무', distractors: ['만났어요', '만나고 있어요', '만날 거예요'] },
  ] },
  { id: 'conditional', explanation: '-(으)면은 조건을 만듭니다. 받침이 있으면 으면, 없거나 ㄹ 받침이면 면을 씁니다.', examples: [
    { context: '비가 ___ 집에 있을 거예요.', answer: '오면', wrong: '오으면', lemma: '오다', cue: '미래의 가능 조건', distractors: ['와요', '왔어요', '오고 있어요'] },
    { context: '시간이 ___ 같이 점심을 먹어요.', answer: '있으면', wrong: '있면', lemma: '있다', cue: '조건이 충족될 때', distractors: ['있어요', '있었어요', '있을 거예요'] },
    { context: '역에 ___ 전화해 주세요.', answer: '도착하면', wrong: '도착해면', lemma: '도착하다', cue: '먼저 완료될 조건', distractors: ['도착해요', '도착했어요', '도착하고 있어요'] },
  ] },
  { id: 'purpose-intention', explanation: '-(으)려고 해요는 가까운 의도나 준비 중인 계획을 나타냅니다.', examples: [
    { context: '내년부터 한국어를 더 열심히 ___.', answer: '공부하려고 해요', wrong: '공부하으려고 해요', lemma: '공부하다', cue: '앞으로의 의도', distractors: ['공부해요', '공부했어요', '공부하고 있어요'] },
    { context: '내일 일찍 일어나야 해서 곧 ___.', answer: '자려고 해요', wrong: '자으려고 해요', lemma: '자다', cue: '곧 실행할 의도', distractors: ['자요', '잤어요', '자고 있어요'] },
    { context: '주말에 새 운동화를 ___.', answer: '사려고 해요', wrong: '사으려고 해요', lemma: '사다', cue: '준비 중인 계획', distractors: ['사요', '샀어요', '사고 있어요'] },
  ] },
  { id: 'request-prohibition', explanation: '-(으)세요는 공손한 요청이나 지시, -지 마세요는 공손한 금지를 표현합니다.', examples: [
    { context: '여기에 ___.', answer: '앉으세요', wrong: '앉세요', lemma: '앉다', cue: '받침 있는 동사의 공손한 요청', distractors: ['앉아요', '앉았어요', '앉을 거예요'] },
    { context: '여기에서 사진을 ___.', answer: '찍지 마세요', wrong: '안 찍으세요', lemma: '찍다', cue: '공손한 금지', distractors: ['찍으세요', '찍어요', '찍었어요'] },
    { context: '조금 더 천천히 ___.', answer: '말씀하세요', wrong: '말씀하으세요', lemma: '말씀하다', cue: '높임말을 쓴 요청', distractors: ['말씀해요', '말씀했어요', '말씀할 거예요'] },
  ] },
]

const FINAL_ROWS: FinalRow<KoreanFormId>[] = [
  { formId: 'present-polite', lemma: '운영하다', before: '지수 씨는 작은 카페를 ', after: '. ', answer: '운영해요' },
  { formId: 'present-formal', lemma: '열다', before: '카페는 매일 아홉 시에 ', after: '. ', answer: '엽니다' },
  { formId: 'past-polite', lemma: '받다', before: '어제 단체 주문을 ', after: '. ', answer: '받았어요' },
  { formId: 'future-intention', lemma: '준비하다', before: '내일 아침에 샌드위치 쉰 개를 ', after: '. ', answer: '준비할 거예요' },
  { formId: 'progressive', lemma: '확인하다', before: '지금은 재료 목록을 ', after: '. ', answer: '확인하고 있어요' },
  { formId: 'result-state', lemma: '열리다', before: '창고 문이 ', after: '. ', answer: '열려 있어요' },
  { formId: 'experience', lemma: '만들다', before: '지수 씨는 이렇게 많은 샌드위치를 ', after: '. ', answer: '만들어 본 적이 있어요' },
  { formId: 'conditional', lemma: '부족하다', before: '빵이 ', after: ' 아침에 더 살 거예요. ', answer: '부족하면' },
  { formId: 'purpose-intention', lemma: '출근하다', before: '그래서 평소보다 일찍 ', after: '. ', answer: '출근하려고 해요' },
  { formId: 'request-prohibition', lemma: '조심하다', before: '직원에게는 “오븐이 뜨거우니 ', after: '”라고 말해요.', answer: '조심하세요' },
]

export const KOREAN_STRUCTURE_QUEST = createStructureQuest({
  id: 'korean-structure-quest', storageKey: 'wl-korean-structure-quest-v1', forms: KOREAN_FORMS,
  presets: [
    { label: '시제와 높임', ids: KOREAN_FORMS.filter((form) => form.group === '시제와 높임').map((form) => form.id) },
    { label: '상', ids: KOREAN_FORMS.filter((form) => form.group === '상').map((form) => form.id) },
    { label: '조건·의도', ids: KOREAN_FORMS.filter((form) => ['조건', '의도'].includes(form.group)).map((form) => form.id) },
  ], seeds: SEEDS, finalRows: FINAL_ROWS,
  copy: {
    languageName: 'Coreano', languageCode: 'ko', eyebrow: 'Quiz de tiempo, aspecto y registro · A2–B1', title: '시간과 높임말 실험실',
    lead: 'Practica cuándo ocurre la acción, cómo se desarrolla y qué nivel de habla exige la situación.',
    range: '10 contrastes', selectedLabel: '항목 선택', selectorTitle: '¿Qué contrastes del coreano quieres practicar?',
    selectorLead: '해요체 y 합니다체 se separan; -고 있어요 no se confunde con el estado resultante -아/어 있어요.',
    configuredEyebrow: '나만의 연습 코스', levelsTitle: 'Seis niveles con corrección diferida',
    levelsLead: 'Termina el nivel antes de ver respuestas y explicaciones.', mapLabels: ['이전', '과거', '지금', '미래'],
    reviewLinks: [
      { href: '/practica/coreano/a1/gramatica', label: 'Repasar gramática A1' },
      { href: '/practica/coreano/a2/gramatica', label: 'Profundizar en A2' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  }, text: { finalTitle: '카페의 큰 주문', finalExplanation: 'La historia integra registro, pasado, futuro, progresión, estado resultante, experiencia, condición, intención y petición.' },
})
