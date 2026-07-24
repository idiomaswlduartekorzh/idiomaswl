import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-10/.

const mock: MockExam = {
  id: 'set-10',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 10',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-10/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 여자: 취미가 뭐예요? 남자: (   )
2번. 남자: 학교가 여기에서 멀어요? 여자: (   )
3번. 여자: 어제 왜 학교에 안 왔어요? 남자: (   )
4번. [대화] 남자: 저기요, 이 사전 얼마예요? 여자: 만 이천 원입니다. 남자: 이거 주세요.
5번. [안내 방송] 학생 여러분, 내일은 학교 축제입니다. 오전 아홉 시부터 운동장에서 여러 가지 행사가 열립니다.
6번. [대화] 여자: 어디 아파요? 얼굴이 안 좋아 보여요. 남자: 어제부터 열이 나요. 여자: 병원에 꼭 가 보세요.`,
      questions: [
        { type: 'mcq', id: 'topik-s10-l01', part: 1, text: '1번. 여자: 취미가 뭐예요? — 남자의 알맞은 대답은?', options: ['등산이에요.', '세 시예요.', '만 원이에요.', '부산에 살아요.'], answer: 0 },
        { type: 'mcq', id: 'topik-s10-l02', part: 1, text: '2번. 남자: 학교가 여기에서 멀어요? — 여자의 알맞은 대답은?', options: ['학생이에요.', '아니요, 가까워요.', '빵을 먹어요.', '두 개예요.'], answer: 1 },
        { type: 'mcq', id: 'topik-s10-l03', part: 1, text: '3번. 여자: 어제 왜 학교에 안 왔어요? — 남자의 알맞은 대답은?', options: ['내일 가요.', '병원이에요.', '감기에 걸려서요.', '커피를 마셔요.'], answer: 2 },
        { type: 'mcq', id: 'topik-s10-l04', part: 1, text: '4번. 남자는 무엇을 샀습니까?', options: ['공책', '연필', '가방', '사전'], answer: 3 },
        { type: 'mcq', id: 'topik-s10-l05', part: 1, text: '5번. 안내 방송의 내용과 같은 것은?', options: ['내일 학교 축제가 열린다.', '축제가 취소되었다.', '축제는 오후에 시작한다.', '축제는 교실에서 한다.'], answer: 0 },
        { type: 'mcq', id: 'topik-s10-l06', part: 1, text: '6번. 여자는 남자에게 무엇을 하라고 했습니까?', options: ['약을 사지 말라고 했다.', '병원에 가 보라고 했다.', '학교에 가라고 했다.', '운동을 하라고 했다.'], answer: 1 },
        { type: 'mcq', id: 'topik-s10-l07', part: 1, text: '7번. 여기는 어디입니까? "이 소포를 부산에 보내고 싶어요. — 네, 무게를 재 볼게요."', options: ['학교', '병원', '우체국', '은행'], answer: 2 },
        { type: 'mcq', id: 'topik-s10-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 채소를 많이 먹어요. 고기는 가끔 먹어요."', options: ['운동', '취미', '직업', '음식'], answer: 3 },
        { type: 'mcq', id: 'topik-s10-l09', part: 1, text: '9번. 여자: 내일 아침 비행기예요. 몇 시까지 공항에 가야 해요? 남자: 두 시간 전까지 오세요. 여기는 어디입니까?', options: ['공항', '기차역', '버스 터미널', '병원'], answer: 0 },
        { type: 'mcq', id: 'topik-s10-l10', part: 1, text: '10번. 남자: 이번 주말에 부모님 댁에 갈 거예요. 여자: 그래요? 오랜만에 뵙겠네요. 남자는 주말에 무엇을 할 거예요?', options: ['회사에 갈 것이다.', '부모님을 만나러 갈 것이다.', '여행을 갈 것이다.', '집에서 쉴 것이다.'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s10-r01', part: 2, text: '배가 고파서 ( )을/를 만들었습니다.', options: ['노래', '청소', '음식', '숙제'], answer: 2 },
        { type: 'mcq', id: 'topik-s10-r02', part: 2, text: '날씨가 좋아서 ( )을/를 하러 나갔습니다.', options: ['숙제', '설거지', '공부만', '산책'], answer: 3 },
        { type: 'mcq', id: 'topik-s10-r03', part: 2, text: '한국 친구를 ( ) 한국어를 배웁니다.', options: ['사귀려고', '먹으려고', '입으려고', '자려고'], answer: 0 },
        { type: 'mcq', id: 'topik-s10-r04', part: 2, text: '비가 와서 우산을 ( ) 나갔습니다.', options: ['입고', '쓰고', '먹고', '타고'], answer: 1 },
        { type: 'mcq', id: 'topik-s10-r05', part: 2, text: '늦잠을 자서 학교에 ( ) 갔습니다.', options: ['빨리만', '조용히', '늦게', '일찍'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s10-r06', part: 3, text: '저는 커피를 좋아합니다. 하루에 두 잔 마십니다.', options: ['운동', '값', '위치', '음료'], answer: 3 },
        { type: 'mcq', id: 'topik-s10-r07', part: 3, text: '제 생일은 삼월입니다. 동생 생일은 시월입니다.', options: ['날짜', '색깔', '직업', '취미'], answer: 0 },
        { type: 'mcq', id: 'topik-s10-r08', part: 3, text: '저는 태권도를 배웁니다. 아주 재미있습니다.', options: ['계절', '운동', '음식', '가족'], answer: 1 },
        { type: 'mcq', id: 'topik-s10-r09', part: 3, text: '학교 앞에 서점이 있습니다. 그 옆에 카페가 있습니다.', options: ['요일', '값', '위치', '나이'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[한국 문화 체험 행사]
• 날짜: 10월 9일 (한글날)
• 장소: 시청 앞 광장
• 내용: 한복 입어 보기, 전통 놀이, 음식 만들기
• 시간: 오전 10시 ~ 오후 5시
• 참가비: 무료 (음식 재료비만 5,000원)`,
      passageTitle: '안내문: 한국 문화 체험',
      questions: [
        { type: 'mcq', id: 'topik-s10-r10', part: 4, text: '이 행사는 언제 합니까?', options: ['10월 5일', '매주 일요일', '9월 9일', '10월 9일'], answer: 3 },
        { type: 'mcq', id: 'topik-s10-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['음식을 만들려면 재료비를 내야 한다.', '한복은 입어 볼 수 없다.', '밤에 한다.', '참가비가 만 원이다.'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `저는 한 달 전에 새 아르바이트를 시작했습니다. 집 근처 카페에서 커피를 만드는 일입니다. 처음에는 손님이 많을 때 조금 힘들었습니다. 하지만 지금은 일이 익숙해져서 재미있습니다. 사장님도 친절하시고 같이 일하는 사람들도 좋습니다. 이 아르바이트를 하면서 돈도 벌고 한국어 말하기 연습도 많이 합니다.`,
      passageTitle: '지문: 카페 아르바이트',
      questions: [
        { type: 'mcq', id: 'topik-s10-r12', part: 5, text: '이 사람은 어디에서 아르바이트를 합니까?', options: ['서점', '카페', '식당', '편의점'], answer: 1 },
        { type: 'mcq', id: 'topik-s10-r13', part: 5, text: '처음에는 언제 힘들었습니까?', options: ['비가 올 때', '아침에', '손님이 많을 때', '사장님이 없을 때'], answer: 2 },
        { type: 'mcq', id: 'topik-s10-r14', part: 5, text: '지금 이 일은 어떻습니까?', options: ['아직도 아주 힘듭니다.', '너무 지루합니다.', '그만두고 싶습니다.', '익숙해져서 재미있습니다.'], answer: 3 },
        { type: 'mcq', id: 'topik-s10-r15', part: 5, text: '이 아르바이트를 하면서 무엇을 합니까?', options: ['돈도 벌고 한국어 연습도 한다.', '공부만 한다.', '잠만 잔다.', '여행만 한다.'], answer: 0 },
      ],
    },
  ],
};

export default mock;
