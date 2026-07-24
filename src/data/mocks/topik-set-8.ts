import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-8/.

const mock: MockExam = {
  id: 'set-8',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 8',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-8/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 여자: 이거 누구 거예요? 남자: (   )
2번. 남자: 지금 몇 시예요? 여자: (   )
3번. 여자: 어떤 색을 좋아해요? 남자: (   )
4번. [대화] 남자: 여기에서 사진을 찍어도 돼요? 여자: 죄송하지만 여기에서는 사진을 찍으면 안 됩니다.
5번. [안내 방송] 이번 주 토요일에 도서관에서 어린이를 위한 책 읽기 행사가 있습니다. 오후 두 시에 시작합니다.
6번. [대화] 여자: 이사한 집은 어때요? 남자: 아주 좋아요. 넓고 조용해요. 지하철역도 가까워요.`,
      questions: [
        { type: 'mcq', id: 'topik-s8-l01', part: 1, text: '1번. 여자: 이거 누구 거예요? — 남자의 알맞은 대답은?', options: ['세 시예요.', '빵을 먹어요.', '병원이에요.', '제 거예요.'], answer: 3 },
        { type: 'mcq', id: 'topik-s8-l02', part: 1, text: '2번. 남자: 지금 몇 시예요? — 여자의 알맞은 대답은?', options: ['네 시 반이에요.', '학생이에요.', '커피예요.', '부산에 살아요.'], answer: 0 },
        { type: 'mcq', id: 'topik-s8-l03', part: 1, text: '3번. 여자: 어떤 색을 좋아해요? — 남자의 알맞은 대답은?', options: ['두 개예요.', '파란색을 좋아해요.', '만 원이에요.', '내일 가요.'], answer: 1 },
        { type: 'mcq', id: 'topik-s8-l04', part: 1, text: '4번. 여자는 남자에게 무엇을 하지 말라고 했습니까?', options: ['들어오지 말라고 했다.', '음식을 먹지 말라고 했다.', '사진을 찍지 말라고 했다.', '떠들지 말라고 했다.'], answer: 2 },
        { type: 'mcq', id: 'topik-s8-l05', part: 1, text: '5번. 안내 방송의 내용과 같은 것은?', options: ['행사가 취소되었다.', '어른을 위한 행사이다.', '오전에 시작한다.', '토요일 오후 두 시에 책 읽기 행사가 있다.'], answer: 3 },
        { type: 'mcq', id: 'topik-s8-l06', part: 1, text: '6번. 남자의 새 집은 어떻습니까?', options: ['넓고 조용하고 역이 가깝다.', '좁고 시끄럽다.', '역에서 멀다.', '오래되고 더럽다.'], answer: 0 },
        { type: 'mcq', id: 'topik-s8-l07', part: 1, text: '7번. 여기는 어디입니까? "어떤 영화를 볼까요? — 저는 이 액션 영화가 보고 싶어요."', options: ['학교', '영화관', '식당', '은행'], answer: 1 },
        { type: 'mcq', id: 'topik-s8-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 매일 여덟 시간을 자요. 잠을 충분히 자야 건강해요."', options: ['직업', '여행', '건강', '음식'], answer: 2 },
        { type: 'mcq', id: 'topik-s8-l09', part: 1, text: '9번. 여자: 이 옷을 세탁해 주세요. 남자: 네, 내일 오후에 오세요. 여기는 어디입니까?', options: ['옷 가게', '병원', '식당', '세탁소'], answer: 3 },
        { type: 'mcq', id: 'topik-s8-l10', part: 1, text: '10번. 남자: 우리 이번 주말에 박물관에 갈까요? 여자: 좋아요. 저도 가고 싶었어요. 두 사람은 무엇을 할 거예요?', options: ['박물관에 갈 것이다.', '영화를 볼 것이다.', '집에서 쉴 것이다.', '쇼핑할 것이다.'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s8-r01', part: 2, text: '더워서 ( )을/를 마셨습니다.', options: ['빵', '주스', '커피만', '밥'], answer: 1 },
        { type: 'mcq', id: 'topik-s8-r02', part: 2, text: '학교에 ( ) 버스를 탑니다.', options: ['자려고', '입으려고', '가려고', '먹으려고'], answer: 2 },
        { type: 'mcq', id: 'topik-s8-r03', part: 2, text: '시험이 어려워서 점수가 ( ).', options: ['좋았습니다', '많았습니다', '쉬웠습니다만', '나빴습니다'], answer: 3 },
        { type: 'mcq', id: 'topik-s8-r04', part: 2, text: '방이 추워서 ( )을/를 켰습니다.', options: ['난로', '에어컨', '선풍기', '창문'], answer: 0 },
        { type: 'mcq', id: 'topik-s8-r05', part: 2, text: '친구를 오래 못 봐서 정말 ( ) 싶습니다.', options: ['자고', '보고', '먹고', '사고'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s8-r06', part: 3, text: '아버지는 은행에서 일합니다. 어머니는 학교에서 일합니다.', options: ['나이', '값', '직업', '취미'], answer: 2 },
        { type: 'mcq', id: 'topik-s8-r07', part: 3, text: '여름은 덥고 겨울은 춥습니다. 저는 봄이 제일 좋습니다.', options: ['음식', '색깔', '위치', '계절'], answer: 3 },
        { type: 'mcq', id: 'topik-s8-r08', part: 3, text: '이 사과는 한 개에 천 원입니다. 다섯 개에 사천 원입니다.', options: ['값', '요일', '나이', '색깔'], answer: 0 },
        { type: 'mcq', id: 'topik-s8-r09', part: 3, text: '저는 수영을 배웁니다. 일주일에 세 번 수영장에 갑니다.', options: ['날씨', '운동', '음식', '직업'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[벼룩시장 안내]
• 날짜: 4월 20일 (일요일) 오전 10시 ~ 오후 4시
• 장소: 중앙 공원
• 안 쓰는 물건을 싸게 사고팔 수 있습니다.
• 참가 신청: 필요 없음 (누구나 참여)
※ 비가 오면 다음 주로 미뤄집니다.`,
      passageTitle: '안내문: 벼룩시장',
      questions: [
        { type: 'mcq', id: 'topik-s8-r10', part: 4, text: '이 벼룩시장은 어디에서 합니까?', options: ['백화점', '지하철역', '중앙 공원', '학교 운동장'], answer: 2 },
        { type: 'mcq', id: 'topik-s8-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['참가 신청을 꼭 해야 한다.', '새 물건만 판다.', '토요일에 한다.', '비가 오면 다음 주로 미뤄진다.'], answer: 3 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `저는 지난 방학에 한국어를 가르치는 봉사 활동을 했습니다. 일주일에 두 번, 외국인 친구들에게 한국어를 가르쳤습니다. 처음에는 가르치는 것이 어려웠지만 점점 익숙해졌습니다. 친구들이 한국어로 이야기할 수 있게 되어서 저도 정말 기뻤습니다. 이 봉사 활동을 통해 저도 많은 것을 배웠습니다. 다음 방학에도 또 하고 싶습니다.`,
      passageTitle: '지문: 봉사 활동',
      questions: [
        { type: 'mcq', id: 'topik-s8-r12', part: 5, text: '이 사람은 방학에 무슨 봉사 활동을 했습니까?', options: ['한국어를 가르쳤습니다.', '병원에서 일했습니다.', '청소를 했습니다.', '음식을 만들었습니다.'], answer: 0 },
        { type: 'mcq', id: 'topik-s8-r13', part: 5, text: '일주일에 몇 번 가르쳤습니까?', options: ['매일', '두 번', '한 번', '세 번'], answer: 1 },
        { type: 'mcq', id: 'topik-s8-r14', part: 5, text: '이 사람은 왜 기뻤습니까?', options: ['시험을 잘 봐서', '여행을 가서', '친구들이 한국어로 이야기할 수 있게 되어서', '돈을 많이 벌어서'], answer: 2 },
        { type: 'mcq', id: 'topik-s8-r15', part: 5, text: '이 사람은 다음 방학에 무엇을 하고 싶어 합니까?', options: ['여행을 가고 싶다.', '집에서 쉬고 싶다.', '아르바이트를 하고 싶다.', '또 봉사 활동을 하고 싶다.'], answer: 3 },
      ],
    },
  ],
};

export default mock;
