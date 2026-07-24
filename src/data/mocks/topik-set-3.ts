import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-3/.

const mock: MockExam = {
  id: 'set-3',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 3',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-3/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 남자: 어디에 살아요? 여자: (   )
2번. 여자: 몇 시에 일어나요? 남자: (   )
3번. 남자: 이 옷이 어때요? 여자: (   )
4번. [대화] 여자: 실례합니다. 은행이 어디에 있어요? 남자: 저기 편의점 옆에 있어요. 여자: 감사합니다.
5번. [안내 방송] 승객 여러분, 이번 역은 서울역입니다. 내리실 문은 왼쪽입니다. 다음 역은 시청역입니다.
6번. [대화] 남자: 생일 축하해요! 이거 선물이에요. 여자: 와, 고마워요. 열어 봐도 돼요? 남자: 네, 열어 보세요.`,
      questions: [
        { type: 'mcq', id: 'topik-s3-l01', part: 1, text: '1번. 남자: 어디에 살아요? — 여자의 알맞은 대답은?', options: ['세 시예요.', '친구예요.', '부산에 살아요.', '빵을 먹어요.'], answer: 2 },
        { type: 'mcq', id: 'topik-s3-l02', part: 1, text: '2번. 여자: 몇 시에 일어나요? — 남자의 알맞은 대답은?', options: ['학교에 가요.', '만 원이에요.', '동생이에요.', '일곱 시에 일어나요.'], answer: 3 },
        { type: 'mcq', id: 'topik-s3-l03', part: 1, text: '3번. 남자: 이 옷이 어때요? — 여자의 알맞은 대답은?', options: ['아주 예뻐요.', '병원에 가요.', '두 개예요.', '내일이에요.'], answer: 0 },
        { type: 'mcq', id: 'topik-s3-l04', part: 1, text: '4번. 은행은 어디에 있습니까?', options: ['병원 뒤', '편의점 옆', '학교 앞', '지하철 안'], answer: 1 },
        { type: 'mcq', id: 'topik-s3-l05', part: 1, text: '5번. 안내 방송의 내용과 같은 것은?', options: ['내리실 문은 오른쪽이다.', '이 열차는 부산으로 간다.', '이번 역은 서울역이다.', '다음 역은 서울역이다.'], answer: 2 },
        { type: 'mcq', id: 'topik-s3-l06', part: 1, text: '6번. 여자는 무엇을 받았습니까?', options: ['편지', '꽃', '돈', '생일 선물'], answer: 3 },
        { type: 'mcq', id: 'topik-s3-l07', part: 1, text: '7번. 여기는 어디입니까? "메뉴 좀 주세요. — 네, 여기 있습니다."', options: ['식당', '도서관', '우체국', '공항'], answer: 0 },
        { type: 'mcq', id: 'topik-s3-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 주말에 영화를 자주 봐요. 재미있어요."', options: ['가격', '취미', '직업', '나라'], answer: 1 },
        { type: 'mcq', id: 'topik-s3-l09', part: 1, text: '9번. 여자: 여보세요, 내일 몇 시에 만날까요? 남자: 오후 세 시에 만나요. 두 사람은 언제 만납니까?', options: ['내일 아침', '모레 낮', '내일 오후 세 시', '오늘 저녁'], answer: 2 },
        { type: 'mcq', id: 'topik-s3-l10', part: 1, text: '10번. 남자: 이 책을 빌리고 싶어요. 여자: 학생증을 주세요. 여기는 어디입니까?', options: ['서점', '문구점', '교실', '도서관'], answer: 3 },
      ],
    },
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s3-r01', part: 2, text: '저는 저녁에 ( )에서 운동을 합니다.', options: ['공원', '냉장고', '연필', '신문'], answer: 0 },
        { type: 'mcq', id: 'topik-s3-r02', part: 2, text: '방이 더러워서 ( )을/를 했습니다.', options: ['노래', '청소', '요리', '숙제'], answer: 1 },
        { type: 'mcq', id: 'topik-s3-r03', part: 2, text: '한국 음식이 맛있어서 ( ) 먹었습니다.', options: ['천천히만', '높게', '많이', '조용히'], answer: 2 },
        { type: 'mcq', id: 'topik-s3-r04', part: 2, text: '비행기 표가 비싸서 기차를 ( ).', options: ['봤습니다', '샀습니다만', '만났습니다', '탔습니다'], answer: 3 },
        { type: 'mcq', id: 'topik-s3-r05', part: 2, text: '내일 시험이 ( ) 오늘 공부를 많이 했습니다.', options: ['있어서', '없어서', '가서', '와서'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s3-r06', part: 3, text: '저는 축구를 좋아합니다. 농구도 자주 합니다.', options: ['날씨', '운동', '음악', '음식'], answer: 1 },
        { type: 'mcq', id: 'topik-s3-r07', part: 3, text: '이 가방은 삼만 원입니다. 저 신발은 오만 원입니다.', options: ['요일', '위치', '값', '색깔'], answer: 2 },
        { type: 'mcq', id: 'topik-s3-r08', part: 3, text: '저는 의사입니다. 병원에서 일합니다.', options: ['취미', '가족', '계절', '직업'], answer: 3 },
        { type: 'mcq', id: 'topik-s3-r09', part: 3, text: '오늘은 비가 옵니다. 그리고 바람도 많이 붑니다.', options: ['날씨', '시간', '나이', '교통'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[요리 교실 안내]
• 요일: 매주 수요일 저녁 7시
• 장소: 시민회관 2층 요리실
• 준비물: 앞치마
• 수강료: 한 달 30,000원
※ 처음 오시는 분은 무료로 한 번 체험할 수 있습니다.`,
      passageTitle: '안내문: 요리 교실',
      questions: [
        { type: 'mcq', id: 'topik-s3-r10', part: 4, text: '이 요리 교실은 언제 합니까?', options: ['매주 월요일', '매주 수요일 저녁 7시', '매일 오전', '토요일 오후'], answer: 1 },
        { type: 'mcq', id: 'topik-s3-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['앞치마를 주지 않아도 된다.', '시민회관 1층에서 한다.', '처음 오는 사람은 한 번 무료로 체험할 수 있다.', '수강료가 없다.'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `저는 한국에 온 지 육 개월이 되었습니다. 처음에는 한국말을 하나도 몰라서 많이 힘들었습니다. 그래서 매일 학원에 가서 한국어를 배웠습니다. 지금은 시장에서 물건도 살 수 있고 친구들과 이야기도 할 수 있습니다. 한국 생활이 점점 재미있어집니다. 앞으로 한국 대학교에 들어가고 싶습니다.`,
      passageTitle: '지문: 한국 생활',
      questions: [
        { type: 'mcq', id: 'topik-s3-r12', part: 5, text: '이 사람은 한국에 온 지 얼마나 되었습니까?', options: ['일 년', '한 달', '삼 년', '육 개월'], answer: 3 },
        { type: 'mcq', id: 'topik-s3-r13', part: 5, text: '처음에 무엇이 힘들었습니까?', options: ['한국말을 몰라서', '돈이 없어서', '친구가 많아서', '날씨가 추워서'], answer: 0 },
        { type: 'mcq', id: 'topik-s3-r14', part: 5, text: '지금은 무엇을 할 수 있습니까?', options: ['고향에 돌아갔다.', '시장에서 물건을 살 수 있다.', '한국어를 전혀 못 한다.', '학원에 안 간다.'], answer: 1 },
        { type: 'mcq', id: 'topik-s3-r15', part: 5, text: '이 사람은 앞으로 무엇을 하고 싶어 합니까?', options: ['회사를 그만두고 싶다.', '한국어를 그만 배우고 싶다.', '한국 대학교에 들어가고 싶다.', '고향에 돌아가고 싶다.'], answer: 2 },
      ],
    },
  ],
};

export default mock;
