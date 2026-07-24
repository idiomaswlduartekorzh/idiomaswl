import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-4/.

const mock: MockExam = {
  id: 'set-4',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 4',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-4/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 여자: 무슨 운동을 좋아해요? 남자: (   )
2번. 남자: 가족이 몇 명이에요? 여자: (   )
3번. 여자: 언제 한국에 왔어요? 남자: (   )
4번. [대화] 남자: 여기 커피 두 잔 주세요. 여자: 네, 잠시만 기다리세요. 곧 갖다드리겠습니다.
5번. [안내 방송] 안녕하십니까. 잠시 후 세 시부터 삼 층에서 무료 영화를 상영합니다. 많은 관심 부탁드립니다.
6번. [대화] 여자: 감기에 걸린 것 같아요. 남자: 그럼 약을 먹고 푹 쉬세요. 여자: 네, 고마워요.`,
      questions: [
        { type: 'mcq', id: 'topik-s4-l01', part: 1, text: '1번. 여자: 무슨 운동을 좋아해요? — 남자의 알맞은 대답은?', options: ['오천 원이에요.', '학생이에요.', '내일 가요.', '수영을 좋아해요.'], answer: 3 },
        { type: 'mcq', id: 'topik-s4-l02', part: 1, text: '2번. 남자: 가족이 몇 명이에요? — 여자의 알맞은 대답은?', options: ['네 명이에요.', '서울에 살아요.', '아홉 시예요.', '커피예요.'], answer: 0 },
        { type: 'mcq', id: 'topik-s4-l03', part: 1, text: '3번. 여자: 언제 한국에 왔어요? — 남자의 알맞은 대답은?', options: ['병원이에요.', '작년에 왔어요.', '빵을 먹어요.', '두 개예요.'], answer: 1 },
        { type: 'mcq', id: 'topik-s4-l04', part: 1, text: '4번. 남자는 무엇을 주문했습니까?', options: ['물 세 잔', '주스 두 잔', '커피 두 잔', '차 한 잔'], answer: 2 },
        { type: 'mcq', id: 'topik-s4-l05', part: 1, text: '5번. 안내 방송의 내용과 같은 것은?', options: ['영화는 유료이다.', '이 층에서 영화를 한다.', '영화가 이미 끝났다.', '세 시부터 무료 영화를 상영한다.'], answer: 3 },
        { type: 'mcq', id: 'topik-s4-l06', part: 1, text: '6번. 남자는 여자에게 무엇을 하라고 했습니까?', options: ['약을 먹고 쉬라고 했다.', '병원에 가지 말라고 했다.', '운동을 하라고 했다.', '커피를 마시라고 했다.'], answer: 0 },
        { type: 'mcq', id: 'topik-s4-l07', part: 1, text: '7번. 여기는 어디입니까? "이 편지를 미국에 보내고 싶어요. — 네, 여기에 주소를 써 주세요."', options: ['시장', '우체국', '은행', '학교'], answer: 1 },
        { type: 'mcq', id: 'topik-s4-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 한국 음식을 좋아해요. 특히 불고기가 맛있어요."', options: ['여행', '직업', '음식', '운동'], answer: 2 },
        { type: 'mcq', id: 'topik-s4-l09', part: 1, text: '9번. 남자: 이 바지 좀 작아요. 더 큰 것 있어요? 여자: 네, 잠깐만요. 여기는 어디입니까?', options: ['식당', '병원', '도서관', '옷 가게'], answer: 3 },
        { type: 'mcq', id: 'topik-s4-l10', part: 1, text: '10번. 여자: 주말에 같이 등산 갈래요? 남자: 좋아요. 몇 시에 만날까요? 두 사람은 무엇을 할 거예요?', options: ['같이 등산을 갈 것이다.', '영화를 볼 것이다.', '집에서 쉴 것이다.', '쇼핑을 할 것이다.'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s4-r01', part: 2, text: '저는 밤에 ( )에서 잡니다.', options: ['자동차', '침대', '식탁', '칠판'], answer: 1 },
        { type: 'mcq', id: 'topik-s4-r02', part: 2, text: '눈이 나빠서 ( )을/를 씁니다.', options: ['장갑', '시계', '안경', '모자'], answer: 2 },
        { type: 'mcq', id: 'topik-s4-r03', part: 2, text: '친구를 ( ) 카페에서 기다립니다.', options: ['먹으려고', '입으려고', '보내려고', '만나려고'], answer: 3 },
        { type: 'mcq', id: 'topik-s4-r04', part: 2, text: '날씨가 좋아서 밖에서 ( ) 먹었습니다.', options: ['점심을', '텔레비전을', '지하철을', '학교를'], answer: 0 },
        { type: 'mcq', id: 'topik-s4-r05', part: 2, text: '길이 막혀서 회사에 ( ) 도착했습니다.', options: ['많이', '늦게', '빨리', '조용히'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s4-r06', part: 3, text: '저는 아홉 시에 자고 여섯 시에 일어납니다.', options: ['색깔', '나라', '시간', '값'], answer: 2 },
        { type: 'mcq', id: 'topik-s4-r07', part: 3, text: '제 방에는 책상과 의자가 있습니다. 침대도 있습니다.', options: ['음식', '운동', '가족', '방'], answer: 3 },
        { type: 'mcq', id: 'topik-s4-r08', part: 3, text: '저는 커피를 좋아합니다. 아침마다 한 잔 마십니다.', options: ['음료', '옷', '위치', '요일'], answer: 0 },
        { type: 'mcq', id: 'topik-s4-r09', part: 3, text: '우리 집은 학교에서 가깝습니다. 걸어서 십 분 걸립니다.', options: ['색깔', '거리', '값', '나이'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[도서관 이용 안내]
• 운영 시간: 오전 9시 ~ 오후 6시
• 휴관일: 매주 월요일
• 대출: 한 사람당 3권, 2주일
• 연체하면 하루에 100원을 냅니다.
※ 학생증이 필요합니다.`,
      passageTitle: '안내문: 도서관 이용',
      questions: [
        { type: 'mcq', id: 'topik-s4-r10', part: 4, text: '도서관은 언제 쉽니까?', options: ['매일', '일요일', '매주 월요일', '매주 토요일'], answer: 2 },
        { type: 'mcq', id: 'topik-s4-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['책을 한 달 동안 빌린다.', '학생증이 필요 없다.', '연체료가 없다.', '책은 한 사람당 세 권까지 빌릴 수 있다.'], answer: 3 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `우리 회사는 지난주에 체육 대회를 했습니다. 아침부터 모든 직원이 공원에 모였습니다. 우리는 축구, 달리기, 줄다리기를 했습니다. 저는 달리기에서 일등을 해서 선물도 받았습니다. 점심에는 다 같이 김밥과 과일을 먹었습니다. 오랜만에 동료들과 즐거운 시간을 보내서 아주 좋았습니다.`,
      passageTitle: '지문: 회사 체육 대회',
      questions: [
        { type: 'mcq', id: 'topik-s4-r12', part: 5, text: '이 사람의 회사는 지난주에 무엇을 했습니까?', options: ['체육 대회', '회의', '여행', '시험'], answer: 0 },
        { type: 'mcq', id: 'topik-s4-r13', part: 5, text: '이 사람은 무슨 경기에서 일등을 했습니까?', options: ['수영', '달리기', '축구', '줄다리기'], answer: 1 },
        { type: 'mcq', id: 'topik-s4-r14', part: 5, text: '점심에 무엇을 먹었습니까?', options: ['라면', '빵과 우유', '김밥과 과일', '불고기'], answer: 2 },
        { type: 'mcq', id: 'topik-s4-r15', part: 5, text: '이 사람의 기분은 어땠습니까?', options: ['화가 났습니다.', '슬펐습니다.', '심심했습니다.', '아주 좋았습니다.'], answer: 3 },
      ],
    },
  ],
};

export default mock;
