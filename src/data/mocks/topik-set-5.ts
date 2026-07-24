import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-5/.

const mock: MockExam = {
  id: 'set-5',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 5',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-5/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 남자: 이 근처에 지하철역이 있어요? 여자: (   )
2번. 여자: 무슨 일을 하세요? 남자: (   )
3번. 남자: 커피 한 잔 더 드릴까요? 여자: (   )
4번. [대화] 여자: 이 신발 얼마예요? 남자: 사만 오천 원이에요. 여자: 조금 깎아 주세요. 남자: 그럼 사만 원에 드릴게요.
5번. [안내 방송] 안녕하세요. 오늘 오후 두 시부터 세일을 시작합니다. 모든 옷을 이십 퍼센트 싸게 팝니다.
6번. [대화] 남자: 이번 주말에 뭐 할 거예요? 여자: 친구 집들이에 가요. 남자: 그래요? 선물은 준비했어요? 여자: 네, 휴지를 샀어요.`,
      questions: [
        { type: 'mcq', id: 'topik-s5-l01', part: 1, text: '1번. 남자: 이 근처에 지하철역이 있어요? — 여자의 알맞은 대답은?', options: ['네, 저기 있어요.', '빵을 먹어요.', '세 시예요.', '학생이에요.'], answer: 0 },
        { type: 'mcq', id: 'topik-s5-l02', part: 1, text: '2번. 여자: 무슨 일을 하세요? — 남자의 알맞은 대답은?', options: ['내일이에요.', '회사원이에요.', '부산에 살아요.', '만 원이에요.'], answer: 1 },
        { type: 'mcq', id: 'topik-s5-l03', part: 1, text: '3번. 남자: 커피 한 잔 더 드릴까요? — 여자의 알맞은 대답은?', options: ['두 개예요.', '작년에 왔어요.', '네, 감사합니다.', '병원에 가요.'], answer: 2 },
        { type: 'mcq', id: 'topik-s5-l04', part: 1, text: '4번. 여자는 신발을 얼마에 샀습니까?', options: ['사만 오천 원', '오만 원', '삼만 원', '사만 원'], answer: 3 },
        { type: 'mcq', id: 'topik-s5-l05', part: 1, text: '5번. 안내 방송의 내용과 같은 것은?', options: ['오후 두 시부터 세일을 한다.', '음식을 싸게 판다.', '세일이 이미 끝났다.', '옷을 오십 퍼센트 싸게 판다.'], answer: 0 },
        { type: 'mcq', id: 'topik-s5-l06', part: 1, text: '6번. 여자는 주말에 무엇을 합니까?', options: ['여행을 간다.', '친구 집들이에 간다.', '회사에 간다.', '병원에 간다.'], answer: 1 },
        { type: 'mcq', id: 'topik-s5-l07', part: 1, text: '7번. 여기는 어디입니까? "표 한 장 주세요. — 어른이세요, 아이세요?"', options: ['은행', '학교', '영화관', '식당'], answer: 2 },
        { type: 'mcq', id: 'topik-s5-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 방학에 제주도에 갈 거예요. 바다를 보고 싶어요."', options: ['음식', '운동', '가족', '여행'], answer: 3 },
        { type: 'mcq', id: 'topik-s5-l09', part: 1, text: '9번. 여자: 머리를 자르고 싶어요. 남자: 어떻게 해 드릴까요? 여기는 어디입니까?', options: ['미용실', '병원', '옷 가게', '카페'], answer: 0 },
        { type: 'mcq', id: 'topik-s5-l10', part: 1, text: '10번. 남자: 내일 비가 온대요. 우산을 가져가세요. 여자: 네, 알겠어요. 여자는 무엇을 가져갑니까?', options: ['책', '우산', '가방', '지갑'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s5-r01', part: 2, text: '목이 말라서 ( )을/를 마셨습니다.', options: ['신발', '연필', '물', '밥'], answer: 2 },
        { type: 'mcq', id: 'topik-s5-r02', part: 2, text: '날씨가 추워서 ( )을/를 입었습니다.', options: ['수영복', '반바지', '슬리퍼', '코트'], answer: 3 },
        { type: 'mcq', id: 'topik-s5-r03', part: 2, text: '주말에 영화를 ( ) 극장에 갔습니다.', options: ['보러', '먹으러', '자러', '입으러'], answer: 0 },
        { type: 'mcq', id: 'topik-s5-r04', part: 2, text: '숙제가 많아서 ( ) 잤습니다.', options: ['조용히', '늦게', '일찍', '빨리'], answer: 1 },
        { type: 'mcq', id: 'topik-s5-r05', part: 2, text: '한국어를 잘 ( ) 열심히 공부합니다.', options: ['먹어서', '만나서', '하고 싶어서', '하기 싫어서'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s5-r06', part: 3, text: '저는 서울에 삽니다. 제 친구는 부산에 삽니다.', options: ['음식', '취미', '값', '장소'], answer: 3 },
        { type: 'mcq', id: 'topik-s5-r07', part: 3, text: '저는 스무 살입니다. 제 동생은 열여덟 살입니다.', options: ['나이', '색깔', '요일', '날씨'], answer: 0 },
        { type: 'mcq', id: 'topik-s5-r08', part: 3, text: '저는 빨간색을 좋아합니다. 파란색도 좋아합니다.', options: ['위치', '색깔', '운동', '직업'], answer: 1 },
        { type: 'mcq', id: 'topik-s5-r09', part: 3, text: '저는 기타를 칩니다. 노래도 부릅니다.', options: ['시간', '나라', '취미', '가족'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[여름 한국어 캠프]
• 기간: 7월 20일 ~ 7월 30일
• 대상: 외국인 학생
• 내용: 한국어 수업, 한국 문화 체험
• 비용: 500,000원 (숙박 포함)
• 신청: 7월 5일까지 홈페이지에서`,
      passageTitle: '안내문: 여름 한국어 캠프',
      questions: [
        { type: 'mcq', id: 'topik-s5-r10', part: 4, text: '이 캠프는 누구를 위한 것입니까?', options: ['한국 어린이', '회사원', '선생님', '외국인 학생'], answer: 3 },
        { type: 'mcq', id: 'topik-s5-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['비용에 숙박이 포함되어 있다.', '전화로 신청한다.', '한 달 동안 한다.', '한국 문화 체험은 없다.'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `저는 매주 토요일에 한국 요리를 배웁니다. 처음에는 김치찌개를 만들었는데 조금 매웠습니다. 지난주에는 불고기를 만들었습니다. 선생님이 아주 친절하게 가르쳐 주셔서 재미있습니다. 요리를 배운 후에는 반 친구들과 같이 먹습니다. 다음 주에는 비빔밥을 만들 거라서 벌써 기대가 됩니다.`,
      passageTitle: '지문: 한국 요리 배우기',
      questions: [
        { type: 'mcq', id: 'topik-s5-r12', part: 5, text: '이 사람은 언제 요리를 배웁니까?', options: ['월요일', '매주 토요일', '매일', '주말마다 두 번'], answer: 1 },
        { type: 'mcq', id: 'topik-s5-r13', part: 5, text: '처음에 만든 요리는 무엇입니까?', options: ['비빔밥', '라면', '김치찌개', '불고기'], answer: 2 },
        { type: 'mcq', id: 'topik-s5-r14', part: 5, text: '요리를 배운 후에 무엇을 합니까?', options: ['집에 바로 간다.', '요리를 버린다.', '선생님과 여행을 간다.', '친구들과 같이 먹는다.'], answer: 3 },
        { type: 'mcq', id: 'topik-s5-r15', part: 5, text: '다음 주에 만들 요리는 무엇입니까?', options: ['비빔밥', '김치찌개', '불고기', '떡볶이'], answer: 0 },
      ],
    },
  ],
};

export default mock;
