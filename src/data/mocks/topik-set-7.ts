import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-7/.

const mock: MockExam = {
  id: 'set-7',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 7',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-7/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 남자: 어제 뭐 했어요? 여자: (   )
2번. 여자: 생일이 언제예요? 남자: (   )
3번. 남자: 커피하고 차 중에서 뭐 마실래요? 여자: (   )
4번. [대화] 여자: 이 근처에 맛있는 식당 있어요? 남자: 네, 저 모퉁이에 한식당이 있어요. 아주 맛있어요.
5번. [안내 방송] 손님 여러분께 알려 드립니다. 잠시 후 열 시부터 지하 일 층에서 신선한 과일을 싸게 판매합니다.
6번. [대화] 남자: 방학 동안 뭐 할 거예요? 여자: 아르바이트를 할 거예요. 돈을 모아서 여행을 가고 싶어요.`,
      questions: [
        { type: 'mcq', id: 'topik-s7-l01', part: 1, text: '1번. 남자: 어제 뭐 했어요? — 여자의 알맞은 대답은?', options: ['학생이에요.', '세 시예요.', '집에서 쉬었어요.', '만 원이에요.'], answer: 2 },
        { type: 'mcq', id: 'topik-s7-l02', part: 1, text: '2번. 여자: 생일이 언제예요? — 남자의 알맞은 대답은?', options: ['커피를 마셔요.', '두 개예요.', '부산에 살아요.', '오월 십오 일이에요.'], answer: 3 },
        { type: 'mcq', id: 'topik-s7-l03', part: 1, text: '3번. 남자: 커피하고 차 중에서 뭐 마실래요? — 여자의 알맞은 대답은?', options: ['차를 마실래요.', '병원에 가요.', '내일 와요.', '학교예요.'], answer: 0 },
        { type: 'mcq', id: 'topik-s7-l04', part: 1, text: '4번. 한식당은 어디에 있습니까?', options: ['병원 옆', '모퉁이', '지하철역 안', '학교 앞'], answer: 1 },
        { type: 'mcq', id: 'topik-s7-l05', part: 1, text: '5번. 안내 방송의 내용과 같은 것은?', options: ['이미 판매가 끝났다.', '이 층에서 판매한다.', '지하 일 층에서 과일을 싸게 판다.', '옷을 판다.'], answer: 2 },
        { type: 'mcq', id: 'topik-s7-l06', part: 1, text: '6번. 여자는 방학 동안 무엇을 할 거예요?', options: ['집에서 쉴 것이다.', '학교에 갈 것이다.', '병원에 갈 것이다.', '아르바이트를 할 것이다.'], answer: 3 },
        { type: 'mcq', id: 'topik-s7-l07', part: 1, text: '7번. 여기는 어디입니까? "이 책 어디에 있어요? — 저쪽 이 층에 있습니다."', options: ['서점', '식당', '은행', '공항'], answer: 0 },
        { type: 'mcq', id: 'topik-s7-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 사진 찍는 것을 좋아해요. 카메라를 항상 가지고 다녀요."', options: ['날씨', '취미', '음식', '가족'], answer: 1 },
        { type: 'mcq', id: 'topik-s7-l09', part: 1, text: '9번. 여자: 표를 잘못 샀어요. 바꿀 수 있어요? 남자: 네, 영수증을 주세요. 여기는 어디입니까?', options: ['병원', '학교', '매표소', '식당'], answer: 2 },
        { type: 'mcq', id: 'topik-s7-l10', part: 1, text: '10번. 남자: 짐이 무거워 보여요. 제가 도와드릴까요? 여자: 네, 감사합니다. 남자는 무엇을 하려고 합니까?', options: ['짐을 사려고 한다.', '집에 가려고 한다.', '표를 사려고 한다.', '여자의 짐을 들어 주려고 한다.'], answer: 3 },
      ],
    },
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s7-r01', part: 2, text: '머리가 아파서 ( )을/를 먹었습니다.', options: ['약', '밥', '물', '빵'], answer: 0 },
        { type: 'mcq', id: 'topik-s7-r02', part: 2, text: '사진을 찍으려고 ( )을/를 샀습니다.', options: ['우산', '카메라', '냉장고', '신발'], answer: 1 },
        { type: 'mcq', id: 'topik-s7-r03', part: 2, text: '방이 어두워서 ( )을/를 켰습니다.', options: ['문', '창문', '불', '물'], answer: 2 },
        { type: 'mcq', id: 'topik-s7-r04', part: 2, text: '친구가 아파서 병원에 ( ) 갔습니다.', options: ['먹으러', '사러', '자러', '보러'], answer: 3 },
        { type: 'mcq', id: 'topik-s7-r05', part: 2, text: '날씨가 좋아서 공원을 ( ) 걸었습니다.', options: ['천천히', '늦게', '높이', '멀리만'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s7-r06', part: 3, text: '저는 여행을 좋아합니다. 작년에는 일본에 갔습니다.', options: ['나이', '취미', '음식', '값'], answer: 1 },
        { type: 'mcq', id: 'topik-s7-r07', part: 3, text: '이 티셔츠는 흰색입니다. 저 바지는 검은색입니다.', options: ['위치', '값', '색깔', '요일'], answer: 2 },
        { type: 'mcq', id: 'topik-s7-r08', part: 3, text: '저는 라면을 좋아합니다. 김밥도 자주 먹습니다.', options: ['운동', '직업', '계절', '음식'], answer: 3 },
        { type: 'mcq', id: 'topik-s7-r09', part: 3, text: '우체국은 은행 옆에 있습니다. 그 앞에 편의점이 있습니다.', options: ['위치', '시간', '나이', '색깔'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[아파트 엘리베이터 점검 안내]
• 날짜: 5월 3일 (금요일)
• 시간: 오전 10시 ~ 오후 2시
• 장소: 101동
• 이 시간에는 엘리베이터를 사용할 수 없습니다.
※ 계단을 이용해 주셔서 감사합니다.`,
      passageTitle: '안내문: 엘리베이터 점검',
      questions: [
        { type: 'mcq', id: 'topik-s7-r10', part: 4, text: '엘리베이터 점검은 언제 합니까?', options: ['오후 2시부터 밤까지', '5월 3일 오전 10시부터 오후 2시까지', '5월 3일 하루 종일', '매주 금요일'], answer: 1 },
        { type: 'mcq', id: 'topik-s7-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['102동을 점검한다.', '점검이 취소되었다.', '점검 시간에는 계단을 이용해야 한다.', '엘리베이터를 하루 종일 쓸 수 있다.'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `제 취미는 그림 그리기입니다. 어릴 때부터 그림 그리는 것을 좋아했습니다. 저는 주로 꽃과 나무를 그립니다. 시간이 있을 때마다 공원에 가서 그림을 그립니다. 지난달에는 제 그림을 학교 전시회에 냈습니다. 선생님과 친구들이 칭찬해 주어서 정말 기뻤습니다. 앞으로 더 열심히 그림을 그리고 싶습니다.`,
      passageTitle: '지문: 그림 그리기',
      questions: [
        { type: 'mcq', id: 'topik-s7-r12', part: 5, text: '이 사람의 취미는 무엇입니까?', options: ['노래하기', '운동하기', '요리하기', '그림 그리기'], answer: 3 },
        { type: 'mcq', id: 'topik-s7-r13', part: 5, text: '주로 무엇을 그립니까?', options: ['꽃과 나무', '사람', '동물', '자동차'], answer: 0 },
        { type: 'mcq', id: 'topik-s7-r14', part: 5, text: '지난달에 무엇을 했습니까?', options: ['그림 수업을 그만두었습니다.', '그림을 전시회에 냈습니다.', '그림을 팔았습니다.', '그림을 버렸습니다.'], answer: 1 },
        { type: 'mcq', id: 'topik-s7-r15', part: 5, text: '이 사람은 왜 기뻤습니까?', options: ['시험을 잘 봐서', '여행을 가서', '선생님과 친구들이 칭찬해서', '돈을 많이 벌어서'], answer: 2 },
      ],
    },
  ],
};

export default mock;
