import { createPronounQuest } from './create-pronoun-quest.ts'
import { authorPronounSeed } from './pronoun-quest-authoring.ts'
import type { PronounPreset, PronounTopicOption } from './pronoun-quest-types'

export type KoreanPronounTopic = 'first_person' | 'address' | 'person_reference' | 'demonstrative_pronouns' | 'demonstrative_modifiers' | 'possession' | 'reflexive'

const TOPICS: readonly PronounTopicOption<KoreanPronounTopic>[] = [
  { id: 'first_person', label: 'Primera persona y registro', group: 'Persona', level: 'A1' },
  { id: 'address', label: 'Tratamientos y segunda persona', group: 'Uso social', level: 'A1–A2' },
  { id: 'person_reference', label: 'Referencia a terceras personas', group: 'Uso social', level: 'A1–A2' },
  { id: 'demonstrative_pronouns', label: '이것・그것・저것', group: 'Referencia', level: 'A1' },
  { id: 'demonstrative_modifiers', label: '이・그・저 + nombre', group: 'Referencia', level: 'A1' },
  { id: 'possession', label: 'Posesión con 의', group: 'Posesión', level: 'A1' },
  { id: 'reflexive', label: '자기・자신', group: 'Referencia', level: 'A2' },
]

const PRESETS: readonly PronounPreset<KoreanPronounTopic>[] = [
  { label: 'Base A1', ids: ['first_person', 'demonstrative_pronouns', 'demonstrative_modifiers', 'possession'] },
  { label: 'Uso social', ids: ['address', 'person_reference'] },
  { label: 'Referencia A2', ids: ['reflexive'] },
  { label: 'Todo', ids: TOPICS.map((topic) => topic.id) },
]

const SEEDS = [
  authorPronounSeed({ id: 'first_person', explanation: '저 es la primera persona humilde usada con habla cortés; 나 es neutral o informal entre personas cercanas. 제 y 내 son sus posesivos contraídos.', functionAnswer: 'primera persona adecuada al registro', functionDistractors: ['segunda persona', 'tercera persona', 'demostrativo'], examples: [
    { context: '처음 뵙겠습니다. ___는 마리아입니다.', answer: '저', distractors: ['나', '너', '그녀'], cue: 'Una presentación cortés pide la forma humilde de primera persona.', wrong: '나', transform: ['Cambia a una conversación íntima entre amigos.', '나는 먼저 갈게.', ['저는 먼저 갈게요, 친구야만.', '너는 먼저 갈게.', '나를 먼저 갈게.']] },
    { context: '친한 친구에게 “___도 같이 갈래”라고 말했다.', answer: '나', distractors: ['저', '당신', '그'], cue: 'Entre amigos de confianza corresponde la forma informal.', wrong: '당신', transform: ['Haz cortés la presentación.', '저는 콜롬비아에서 왔습니다.', ['나는 콜롬비아에서 왔습니다, 선생님에게 반말로.', '저를 콜롬비아에서 왔습니다.', '당신은 콜롬비아에서 왔습니다.']] },
    { context: '회의에서 질문을 받으면 ___ 답변드리겠습니다.', answer: '제가', distractors: ['내가', '저를', '너가'], cue: 'El hablante se ofrece a responder en un entorno formal; 저 + 가 se contrae en 제가.', wrong: '내가', transform: ['Usa 나 + 가 en registro informal.', '내가 확인할게.', ['나가 확인할게.', '제가 확인할게, 반말 상황에서만.', '나를 확인할게.']] },
  ], final: { before: '접수대에서는 ', after: ' 명단을 확인하겠습니다. ', answer: '제가' } }),
  authorPronounSeed({ id: 'address', explanation: 'En coreano se prefieren nombre + 씨, parentescos sociales y cargos. 당신 tiene usos limitados (pareja, textos, confrontación) y no es un “usted” neutro universal.', functionAnswer: 'tratamiento adecuado a la relación social', functionDistractors: ['primera persona', 'demostrativo', 'tercera persona distante'], examples: [
    { context: '김 선생님, ___은 몇 시에 오세요?', answer: '선생님', distractors: ['당신', '너', '그'], cue: 'Se habla directamente con un profesor usando su título.', wrong: '당신', transform: ['Pregunta al señor 민수 usando nombre + 씨.', '민수 씨는 커피 드세요?', ['당신 씨는 커피 드세요?', '그 씨는 커피 드세요?', '민수는 씨 커피 드세요?']] },
    { context: '회사에서 팀장에게 “___, 이 자료를 보셨습니까?”라고 한다.', answer: '팀장님', distractors: ['당신', '너', '그녀'], cue: 'El cargo con 님 marca respeto profesional.', wrong: '당신', transform: ['Omite la segunda persona cuando está clara.', '성함이 어떻게 되세요?', ['당신의 성함이 어떻게 되세요, 매번?', '너의 성함은 무엇입니까요?', '성함을 당신이 되세요?']] },
    { context: '처음 만난 손님에게 ___이라고 부르는 것은 보통 자연스럽지 않다.', answer: '당신', distractors: ['선생님', '손님', '민수 씨'], cue: 'Se identifica la forma que no funciona como “usted” neutro ante un desconocido.', wrong: '손님', transform: ['Sustituye 당신 por un cargo.', '과장님은 어디에 앉으세요?', ['당신은 어디에 앉으세요, 과장님을 빼고?', '그는 어디에 앉으세요?', '과장님을 어디에 앉으세요?']] },
  ], final: { before: '박 선생님께는 “', after: ' 어디에 앉으세요?”라고 여쭙습니다. ', answer: '선생님은' } }),
  authorPronounSeed({ id: 'person_reference', explanation: 'Para terceras personas es natural repetir nombre/cargo u omitirlo. 그 y 그녀 aparecen más en escritura o traducción; 그분 es una referencia respetuosa.', functionAnswer: 'referencia contextual a tercera persona', functionDistractors: ['segunda persona directa', 'objeto demostrativo', 'posesivo'], examples: [
    { context: '저기 계신 분은 김 교수님입니다. ___은 언어학자입니다.', answer: '그분', distractors: ['당신', '그것', '그녀'], cue: 'Se retoma respetuosamente a una persona ya señalada.', wrong: '그것', transform: ['Repite nombre + 씨 de forma natural.', '지수 씨가 왔어요. 지수 씨는 회의실에 있어요.', ['지수 씨가 왔어요. 당신은 회의실에 있어요.', '지수 씨가 왔어요. 그것은 회의실에 있어요.', '지수 씨를 왔어요. 그녀가 회의실을 있어요.']] },
    { context: '“민수 씨는 어디 있어요?” “___ 입구에 있어요.”', answer: '민수 씨는', distractors: ['당신은', '그것은', '저것은'], cue: 'Repetir el nombre con la partícula correcta evita un pronombre innecesario.', wrong: '당신은', transform: ['Omite el sujeto ya conocido.', '수진 씨는 도착했어요. 지금 안에서 기다려요.', ['수진 씨는 도착했어요. 그녀를 지금 안에서 기다려요.', '수진 씨는 도착했어요. 당신은 지금 안에서 기다려요.', '수진 씨가 도착했어요 그를. 안에서 기다려요.']] },
    { context: '안내해 주신 분이 밖에 계세요. ___께 감사드립시다.', answer: '그분', distractors: ['그것', '당신', '그 사람을께'], cue: 'La persona merece tratamiento respetuoso y 께 marca el destinatario.', wrong: '그것', transform: ['Usa el cargo como referente.', '통역사님은 입구에서 기다리세요.', ['그녀는 입구에서 기다리세요, 항상.', '통역사님을 입구에서 기다리세요.', '당신 통역사는 입구를 기다리세요.']] },
  ], final: { before: '통역사 김지수 씨가 도착했습니다. ', after: ' 입구에서 기다립니다. ', answer: '김지수 씨는' } }),
  authorPronounSeed({ id: 'demonstrative_pronouns', explanation: '이것/이거 está cerca del hablante; 그것/그거 cerca del interlocutor o ya mencionado; 저것/저거 lejos de ambos. No llevan un sustantivo detrás.', functionAnswer: 'pronombre demostrativo 이・그・저', functionDistractors: ['modificador ante nombre', 'pronombre personal', 'posesivo'], examples: [
    { context: '제가 들고 있는 ___은 출입증입니다.', answer: '이것', distractors: ['그것', '저것', '이'], cue: 'El objeto está junto al hablante y se usa como pronombre.', wrong: '이', transform: ['Señala coloquialmente algo junto al interlocutor.', '그거 누구 가방이에요?', ['그 누구 가방이에요?', '이거 거기 누구 가방이에요?', '그것의 누구 가방이에요?']] },
    { context: '창밖 멀리 보이는 건물이 있죠? ___이 도서관이에요.', answer: '저것', distractors: ['이것', '그것', '저'], cue: 'El referente está lejos de hablante e interlocutor.', wrong: '저', transform: ['Retoma una idea recién mencionada.', '그것은 좋은 생각이에요.', ['그는 좋은 생각이에요.', '그 좋은 생각이에요 것을.', '이것은 방금 네가 말한 저기 생각이에요.']] },
    { context: '책상 위에 카드가 있어요. ___을 가져오세요.', answer: '그것', distractors: ['그', '이것', '저'], cue: 'El objeto ya fue localizado y se sustituye el nombre.', wrong: '그', transform: ['Pregunta por algo cercano.', '이거 뭐예요?', ['이 뭐예요?', '이것의 뭐예요?', '이거를 뭐가 예요?']] },
  ], final: { before: '책상 위에 이름표가 있습니다. ', after: ' 입구로 가져가세요. ', answer: '그것을' } }),
  authorPronounSeed({ id: 'demonstrative_modifiers', explanation: '이, 그 y 저 van obligatoriamente delante de un nombre. Conservan el contraste de cercanía, referencia previa y distancia.', functionAnswer: 'modificador demostrativo ante un nombre', functionDistractors: ['pronombre demostrativo independiente', 'pronombre personal', 'partícula posesiva'], examples: [
    { context: '___ 자료를 지금 설명하겠습니다.', answer: '이', distractors: ['이것', '그것', '저것'], cue: '자료 aparece después y está cerca del hablante.', wrong: '이것', transform: ['Señala una silla lejana.', '저 의자는 비어 있어요.', ['저것 의자는 비어 있어요.', '그 의자는 저기 멀리 이것 있어요.', '저는 의자가 비어 있어요.']] },
    { context: '손님 앞에 있는 ___ 상자를 열어 주세요.', answer: '그', distractors: ['그것', '이', '저것'], cue: '상자 está junto al interlocutor y requiere modificador.', wrong: '그것', transform: ['Usa 이 ante un nombre cercano.', '이 펜을 쓰세요.', ['이것 펜을 쓰세요.', '이것을 펜 쓰세요.', '이의 펜을 쓰세요.']] },
    { context: '멀리 보이는 ___ 산이 한라산입니다.', answer: '저', distractors: ['저것', '그것', '이것'], cue: '산 está lejos y aparece después del demostrativo.', wrong: '저것', transform: ['Retoma un asunto mencionado.', '그 이야기는 나중에 들을게요.', ['그것 이야기는 나중에 들을게요.', '그것의 이야기를 나중에 들을게요.', '그는 이야기를 나중에 들을게요.']] },
  ], final: { before: '입구 옆에 상자가 두 개 있습니다. ', after: ' 파란 상자를 여세요. ', answer: '그' } }),
  authorPronounSeed({ id: 'possession', explanation: '의 marca posesión, aunque a menudo se omite en relaciones obvias. 나의/저의 se contraen normalmente en 내/제; repetir nombre o cargo evita ambigüedad.', functionAnswer: 'expresión posesiva con 의 o forma contraída', functionDistractors: ['objeto con 을/를', 'sujeto con 이/가', 'demostrativo'], examples: [
    { context: '이것은 ___ 명함입니다.', answer: '제', distractors: ['저를', '제가', '저'], cue: 'La tarjeta pertenece al hablante en registro cortés; 저의 se contrae en 제.', wrong: '제가', transform: ['Cambia a registro informal.', '이건 내 가방이야.', ['이건 나를 가방이야.', '이건 내가 가방이야.', '이건 나 가방을이야.']] },
    { context: '접수대에 있는 우산은 ___이에요.', answer: '민수 씨 것', distractors: ['민수 씨를', '민수 씨가', '민수 씨'], cue: '것 permite sustituir el objeto poseído: “el de Minsu”.', wrong: '민수 씨', transform: ['Expresa “el horario de la escuela”.', '학교 일정표를 확인해요.', ['학교를 일정표의 확인해요.', '학교가의 일정표를 확인해요.', '학교 것 일정표를 확인해요.']] },
    { context: '이 파일은 제 것이고, 저 파일은 ___이에요.', answer: '지수 씨 것', distractors: ['지수 씨를', '지수 씨가', '지수 씨의 파일의'], cue: 'El sustantivo archivo ya está claro; 것 sustituye lo poseído.', wrong: '지수 씨를', transform: ['Usa 우리 para una pertenencia compartida natural.', '우리 교실은 이 층에 있어요.', ['우리의가 교실은 이 층에 있어요.', '우리를 교실은 이 층에 있어요.', '우리 것 교실을 이 층에 있어요.']] },
  ], final: { before: '빨간 파일은 제 것입니다. 파란 파일은 ', after: '입니다. ', answer: '민수 씨 것' } }),
  authorPronounSeed({ id: 'reflexive', explanation: '자기 suele remitir al sujeto, especialmente en tercera persona; 자신 y 자기 자신 añaden énfasis. En estilo cortés, el contexto debe dejar inequívoco el referente.', functionAnswer: 'referencia reflexiva ligada al sujeto', functionDistractors: ['segunda persona', 'demostrativo', 'posesión de otro referente'], examples: [
    { context: '민수는 ___ 사진을 보고 있어요.', answer: '자기', distractors: ['당신', '그것', '민수에게'], cue: 'La lectura buscada es que Minsu mira su propia foto.', wrong: '당신', transform: ['Haz enfático “ella misma”.', '지수는 자기 자신을 소개했어요.', ['지수는 당신 자신을 소개했어요.', '지수는 자기가 소개했어요 자신을을.', '자기 자신은 지수를 소개했어요.']] },
    { context: '아이들은 ___끼리 방을 정리했어요.', answer: '자기들', distractors: ['자기', '그', '당신들'], cue: 'El sujeto plural actuó dentro de su propio grupo; 들 explicita pluralidad.', wrong: '자기', transform: ['Expresa “por uno mismo” con 스스로.', '저는 스스로 확인했어요.', ['저는 저를 스스로가 확인했어요.', '저는 당신 스스로 확인했어요.', '스스로는 저를 확인했어요.']] },
    { context: '그 사람은 ___만 생각해요.', answer: '자기', distractors: ['그것', '당신', '저'], cue: 'El referente del objeto de pensar coincide con el sujeto.', wrong: '당신', transform: ['Usa 자신 con una partícula de objeto.', '그는 자신을 믿어요.', ['그는 자신이 믿어요 그를.', '그는 당신을 믿어요 자기로.', '자신은 그를 믿어요.']] },
  ], final: { before: '행사 전에 담당자는 모든 항목을 ', after: ' 확인합니다. ', answer: '스스로' } }),
] as const

export const KOREAN_PRONOUN_QUEST = createPronounQuest({
  id: 'korean-pronoun-quest', storageKey: 'wl-korean-pronoun-quest-v1', languageName: 'Coreano', languageCode: 'ko', title: '대명사와 지시 표현 길', finalTitle: '일곱 가지 자연스러운 지시 표현',
  finalExplanation: '한국어에서는 대명사를 반복하기보다 이름, 직함, 생략, 지시 표현을 관계와 문맥에 맞게 고르는 것이 중요합니다.',
  reviewLinks: [{ href: '/practica/coreano/a1/gramatica', label: 'Repasar gramática A1' }, { href: '/practica/coreano/a2/gramatica', label: 'Repasar gramática A2' }],
  topics: TOPICS, presets: PRESETS, seeds: SEEDS, finalDistractors: ['당신', '그녀', '이것'],
})
