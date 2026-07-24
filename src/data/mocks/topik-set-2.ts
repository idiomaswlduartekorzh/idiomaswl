import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-2/.

const mock: MockExam = {
  id: 'set-2',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 2',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    // ── 듣기 (Listening) ──────────────────────────────────────────────
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-2/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 여자: 이거 얼마예요? 남자: (   )
2번. 남자: 지금 뭐 해요? 여자: (   )
3번. 여자: 주말에 어디 갔어요? 남자: (   )
4번. [대화] 남자: 여보세요, 민수 씨 있어요? 여자: 지금 없는데요. 남자: 그럼 나중에 다시 전화할게요.
5번. [안내 방송] 손님 여러분, 저희 백화점은 저녁 여덟 시에 문을 닫습니다. 오늘도 저희 백화점을 찾아 주셔서 감사합니다.
6번. [대화] 여자: 이번 방학에 뭐 할 거예요? 남자: 고향에 갈 거예요. 부모님을 만나고 싶어요. 여자: 좋겠네요. 잘 다녀오세요.`,
      questions: [
        { type: 'mcq', id: 'topik-s2-l01', part: 1, text: '1번. 여자: 이거 얼마예요? — 남자의 알맞은 대답은?', options: ['집에 있어요.', '오천 원이에요.', '내일 가요.', '학생이에요.'], answer: 1 },
        { type: 'mcq', id: 'topik-s2-l02', part: 1, text: '2번. 남자: 지금 뭐 해요? — 여자의 알맞은 대답은?', options: ['병원이에요.', '어제 왔어요.', '책을 읽어요.', '세 개예요.'], answer: 2 },
        { type: 'mcq', id: 'topik-s2-l03', part: 1, text: '3번. 여자: 주말에 어디 갔어요? — 남자의 알맞은 대답은?', options: ['커피를 마셔요.', '두 시예요.', '괜찮아요.', '바다에 갔어요.'], answer: 3 },
        { type: 'mcq', id: 'topik-s2-l04', part: 1, text: '4번. 대화를 듣고 이어지는 행동으로 알맞은 것은?', options: ['남자는 나중에 다시 전화할 것이다.', '여자가 민수에게 편지를 쓴다.', '남자가 지금 민수를 만난다.', '여자가 전화를 끊지 않는다.'], answer: 0 },
        { type: 'mcq', id: 'topik-s2-l05', part: 1, text: '5번. 안내 방송의 내용과 같은 것은?', options: ['백화점은 열 시에 닫는다.', '백화점은 저녁 여덟 시에 닫는다.', '백화점은 오전에 문을 연다.', '오늘은 백화점이 쉰다.'], answer: 1 },
        { type: 'mcq', id: 'topik-s2-l06', part: 1, text: '6번. 남자는 방학에 무엇을 할 거예요?', options: ['여자와 여행을 갈 것이다.', '학교에서 공부할 것이다.', '고향에 가서 부모님을 만날 것이다.', '아르바이트를 할 것이다.'], answer: 2 },
        { type: 'mcq', id: 'topik-s2-l07', part: 1, text: '7번. 여기는 어디입니까? "어떻게 오셨어요? — 머리가 아파서 왔어요."', options: ['은행', '서점', '식당', '병원'], answer: 3 },
        { type: 'mcq', id: 'topik-s2-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 매일 아침에 운동을 해요. 건강에 좋아요."', options: ['운동', '음식', '날씨', '가족'], answer: 0 },
        { type: 'mcq', id: 'topik-s2-l09', part: 1, text: '9번. 여자: 표가 있어요? 남자: 네, 두 장 있어요. 여자는 무엇을 하려고 합니까?', options: ['밥을 먹으려고 한다.', '영화를 보려고 한다.', '표를 팔려고 한다.', '집에 가려고 한다.'], answer: 1 },
        { type: 'mcq', id: 'topik-s2-l10', part: 1, text: '10번. 남자: 날씨가 추우니까 창문을 닫을까요? 여자: 네, 좀 추워요. 두 사람은 무엇을 할 거예요?', options: ['밖에 나갈 것이다.', '에어컨을 켤 것이다.', '창문을 닫을 것이다.', '창문을 열 것이다.'], answer: 2 },
      ],
    },
    // ── 읽기 (Reading) ────────────────────────────────────────────────
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오. / Elige la palabra más adecuada.',
      questions: [
        { type: 'mcq', id: 'topik-s2-r01', part: 2, text: '저는 매일 아침에 ( )을/를 마십니다.', options: ['가방', '연필', '창문', '우유'], answer: 3 },
        { type: 'mcq', id: 'topik-s2-r02', part: 2, text: '날씨가 더워서 ( )을/를 켰습니다.', options: ['에어컨', '난로', '우산', '텔레비전'], answer: 0 },
        { type: 'mcq', id: 'topik-s2-r03', part: 2, text: '도서관에서는 ( ) 이야기해야 합니다.', options: ['높이', '조용히', '빨리', '많이'], answer: 1 },
        { type: 'mcq', id: 'topik-s2-r04', part: 2, text: '저는 한국어를 배우고 ( ) 한국에 왔습니다.', options: ['만나서', '보내서', '싶어서', '먹어서'], answer: 2 },
        { type: 'mcq', id: 'topik-s2-r05', part: 2, text: '시간이 없어서 택시를 ( ).', options: ['먹었습니다', '읽었습니다', '만들었습니다', '탔습니다'], answer: 3 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s2-r06', part: 3, text: '저는 언니가 한 명 있습니다. 어머니와 아버지도 계십니다.', options: ['가족', '취미', '직업', '계절'], answer: 0 },
        { type: 'mcq', id: 'topik-s2-r07', part: 3, text: '봄에는 따뜻하고 여름에는 덥습니다. 가을에는 시원합니다.', options: ['장소', '계절', '운동', '음식'], answer: 1 },
        { type: 'mcq', id: 'topik-s2-r08', part: 3, text: '저는 사과를 좋아합니다. 바나나도 자주 먹습니다.', options: ['색깔', '시간', '과일', '옷'], answer: 2 },
        { type: 'mcq', id: 'topik-s2-r09', part: 3, text: '월요일부터 금요일까지 회사에 갑니다. 주말에는 쉽니다.', options: ['나이', '값', '위치', '일주일'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[한국어 말하기 대회]
• 날짜: 6월 15일 (토요일) 오후 2시
• 장소: 한국문화센터 3층
• 참가비: 무료
• 신청: 6월 10일까지 이메일로
※ 상품이 있습니다!`,
      passageTitle: '안내문: 말하기 대회',
      questions: [
        { type: 'mcq', id: 'topik-s2-r10', part: 4, text: '이 대회는 언제 합니까?', options: ['6월 15일 토요일 오후 2시', '6월 10일 오전', '6월 15일 오전 2시', '매주 토요일'], answer: 0 },
        { type: 'mcq', id: 'topik-s2-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['센터 1층에서 합니다.', '참가비가 없습니다.', '전화로 신청합니다.', '상품이 없습니다.'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `저는 지난 주말에 친구와 같이 산에 갔습니다. 아침 일찍 출발해서 점심때쯤 산 위에 도착했습니다. 산 위에서 본 경치가 정말 아름다웠습니다. 우리는 그곳에서 준비해 간 김밥을 먹었습니다. 조금 힘들었지만 기분이 아주 좋았습니다. 다음에는 가족과 함께 다시 오고 싶습니다.`,
      passageTitle: '지문: 주말의 등산',
      questions: [
        { type: 'mcq', id: 'topik-s2-r12', part: 5, text: '이 사람은 주말에 무엇을 했습니까?', options: ['가족과 여행을 갔습니다.', '식당에서 일했습니다.', '친구와 산에 갔습니다.', '집에서 쉬었습니다.'], answer: 2 },
        { type: 'mcq', id: 'topik-s2-r13', part: 5, text: '산 위에서 무엇을 먹었습니까?', options: ['라면', '빵', '과일', '김밥'], answer: 3 },
        { type: 'mcq', id: 'topik-s2-r14', part: 5, text: '이 사람의 기분은 어땠습니까?', options: ['기분이 아주 좋았습니다.', '많이 슬펐습니다.', '화가 났습니다.', '지루했습니다.'], answer: 0 },
        { type: 'mcq', id: 'topik-s2-r15', part: 5, text: '이 사람은 다음에 누구와 오고 싶어 합니까?', options: ['혼자', '가족', '친구', '선생님'], answer: 1 },
      ],
    },
  ],
};

export default mock;
