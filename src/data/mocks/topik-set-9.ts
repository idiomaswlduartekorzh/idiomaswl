import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-9/.

const mock: MockExam = {
  id: 'set-9',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 9',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-9/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 남자: 어느 나라에서 왔어요? 여자: (   )
2번. 여자: 점심에 뭐 먹었어요? 남자: (   )
3번. 남자: 주말 잘 보냈어요? 여자: (   )
4번. [대화] 여자: 다음 주에 시간 있어요? 같이 콘서트에 가요. 남자: 좋아요! 표는 제가 살게요.
5번. [안내 방송] 승객 여러분, 안전벨트를 매 주십시오. 우리 비행기는 곧 인천 공항에 도착하겠습니다.
6번. [대화] 남자: 왜 이렇게 늦었어요? 여자: 길이 많이 막혔어요. 정말 미안해요. 남자: 괜찮아요. 이제 들어가요.`,
      questions: [
        { type: 'mcq', id: 'topik-s9-l01', part: 1, text: '1번. 남자: 어느 나라에서 왔어요? — 여자의 알맞은 대답은?', options: ['일본에서 왔어요.', '세 시예요.', '만 원이에요.', '학생이에요.'], answer: 0 },
        { type: 'mcq', id: 'topik-s9-l02', part: 1, text: '2번. 여자: 점심에 뭐 먹었어요? — 남자의 알맞은 대답은?', options: ['내일 가요.', '비빔밥을 먹었어요.', '부산에 살아요.', '두 개예요.'], answer: 1 },
        { type: 'mcq', id: 'topik-s9-l03', part: 1, text: '3번. 남자: 주말 잘 보냈어요? — 여자의 알맞은 대답은?', options: ['커피예요.', '작년에 왔어요.', '네, 잘 쉬었어요.', '병원이에요.'], answer: 2 },
        { type: 'mcq', id: 'topik-s9-l04', part: 1, text: '4번. 두 사람은 다음 주에 무엇을 할 거예요?', options: ['영화를 볼 것이다.', '식당에 갈 것이다.', '공부할 것이다.', '콘서트에 갈 것이다.'], answer: 3 },
        { type: 'mcq', id: 'topik-s9-l05', part: 1, text: '5번. 안내 방송은 어디에서 들을 수 있습니까?', options: ['비행기 안', '기차 안', '지하철 안', '버스 안'], answer: 0 },
        { type: 'mcq', id: 'topik-s9-l06', part: 1, text: '6번. 여자는 왜 늦었습니까?', options: ['길을 잃어서', '길이 막혀서', '늦잠을 자서', '몸이 아파서'], answer: 1 },
        { type: 'mcq', id: 'topik-s9-l07', part: 1, text: '7번. 여기는 어디입니까? "머리를 짧게 잘라 주세요. — 네, 이렇게요?"', options: ['옷 가게', '식당', '미용실', '병원'], answer: 2 },
        { type: 'mcq', id: 'topik-s9-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 클래식 음악을 좋아해요. 피아노 소리가 아름다워요."', options: ['운동', '음식', '가족', '음악'], answer: 3 },
        { type: 'mcq', id: 'topik-s9-l09', part: 1, text: '9번. 여자: 이 컴퓨터가 고장 났어요. 남자: 언제부터 안 됐어요? 여기는 어디입니까?', options: ['수리 센터', '식당', '은행', '학교'], answer: 0 },
        { type: 'mcq', id: 'topik-s9-l10', part: 1, text: '10번. 남자: 내일 아침에 같이 운동할래요? 여자: 좋아요. 여섯 시에 공원에서 만나요. 두 사람은 언제 만납니까?', options: ['모레 아침', '내일 아침 여섯 시', '오늘 저녁', '내일 오후'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s9-r01', part: 2, text: '추워서 따뜻한 ( )을/를 마셨습니다.', options: ['주스', '우유', '차', '물'], answer: 2 },
        { type: 'mcq', id: 'topik-s9-r02', part: 2, text: '돈을 찾으려고 ( )에 갔습니다.', options: ['학교', '극장', '공원', '은행'], answer: 3 },
        { type: 'mcq', id: 'topik-s9-r03', part: 2, text: '한국 노래를 ( ) 매일 연습합니다.', options: ['부르고 싶어서', '먹고 싶어서', '자고 싶어서', '사고 싶어서'], answer: 0 },
        { type: 'mcq', id: 'topik-s9-r04', part: 2, text: '시간이 없어서 아침을 못 ( ).', options: ['읽었습니다만', '먹었습니다', '봤습니다', '탔습니다'], answer: 1 },
        { type: 'mcq', id: 'topik-s9-r05', part: 2, text: '주말에 집을 ( ) 청소했습니다.', options: ['빠르게만', '높게', '깨끗하게', '조용하게'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s9-r06', part: 3, text: '저는 매일 아침에 신문을 읽습니다. 저녁에는 책을 읽습니다.', options: ['음식', '값', '날씨', '취미'], answer: 3 },
        { type: 'mcq', id: 'topik-s9-r07', part: 3, text: '어제는 눈이 왔습니다. 오늘은 맑고 춥습니다.', options: ['날씨', '위치', '나이', '색깔'], answer: 0 },
        { type: 'mcq', id: 'topik-s9-r08', part: 3, text: '이 신발은 이십오 만 원입니다. 조금 비쌉니다.', options: ['위치', '값', '요일', '취미'], answer: 1 },
        { type: 'mcq', id: 'topik-s9-r09', part: 3, text: '우리 가족은 모두 네 명입니다. 저는 막내입니다.', options: ['운동', '계절', '가족', '직업'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[헬스장 회원 모집]
• 운영 시간: 매일 오전 6시 ~ 오후 11시
• 회비: 1개월 50,000원 / 3개월 120,000원
• 운동 기구, 샤워실 이용 가능
• 처음 오시면 3일 무료 체험!
※ 신분증을 가지고 오세요.`,
      passageTitle: '안내문: 헬스장 회원 모집',
      questions: [
        { type: 'mcq', id: 'topik-s9-r10', part: 4, text: '이 헬스장은 몇 시에 문을 엽니까?', options: ['오전 9시', '오후 6시', '오후 11시', '오전 6시'], answer: 3 },
        { type: 'mcq', id: 'topik-s9-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['처음 오면 3일 무료로 체험할 수 있다.', '샤워실은 이용할 수 없다.', '일요일에는 쉰다.', '회비가 없다.'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `저는 한국 드라마를 아주 좋아합니다. 한국어를 공부할 때 드라마가 많이 도움이 됩니다. 드라마를 보면서 새로운 단어와 표현을 배웁니다. 처음에는 자막을 보면서 봤지만 요즘은 자막 없이도 조금 이해할 수 있습니다. 제가 제일 좋아하는 드라마는 가족에 대한 이야기입니다. 재미있고 감동적이어서 여러 번 봤습니다.`,
      passageTitle: '지문: 한국 드라마',
      questions: [
        { type: 'mcq', id: 'topik-s9-r12', part: 5, text: '이 사람은 한국어를 공부할 때 무엇이 도움이 됩니까?', options: ['게임', '드라마', '음악', '신문'], answer: 1 },
        { type: 'mcq', id: 'topik-s9-r13', part: 5, text: '요즘은 드라마를 어떻게 봅니까?', options: ['소리를 끄고 본다.', '보지 않는다.', '자막 없이도 조금 이해한다.', '항상 자막이 필요하다.'], answer: 2 },
        { type: 'mcq', id: 'topik-s9-r14', part: 5, text: '제일 좋아하는 드라마는 무엇에 대한 이야기입니까?', options: ['사랑', '전쟁', '역사', '가족'], answer: 3 },
        { type: 'mcq', id: 'topik-s9-r15', part: 5, text: '이 사람은 좋아하는 드라마를 몇 번 봤습니까?', options: ['여러 번', '한 번', '두 번', '보지 않았다'], answer: 0 },
      ],
    },
  ],
};

export default mock;
