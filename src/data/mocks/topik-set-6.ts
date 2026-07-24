import type { MockExam } from './types';

// TOPIK I (NIIED) — simulacro completo 듣기 + 읽기. Contenido ORIGINAL WeLearn. Audio: /audio/topik/set-6/.

const mock: MockExam = {
  id: 'set-6',
  examSlug: 'topik',
  title: 'TOPIK I — Simulacro 6',
  subtitle: '듣기 (Escucha) · 읽기 (Lectura) · Formato oficial NIIED',
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: '듣기 — 대화 완성 · 대답 고르기',
      audioUrl: '/audio/topik/set-6/du_gi.mp3',
      instructions: '다음을 듣고 알맞은 것을 고르십시오. / Escucha y elige la respuesta correcta.',
      transcript: `1번. 여자: 몇 층에 살아요? 남자: (   )
2번. 남자: 오늘 기분이 어때요? 여자: (   )
3번. 여자: 이 음식 매워요? 남자: (   )
4번. [대화] 남자: 실례지만 이 버스가 시청에 가요? 여자: 아니요, 저 앞에서 302번을 타세요. 남자: 감사합니다.
5번. [안내 방송] 잠시 안내 말씀드립니다. 오늘은 비가 와서 야외 행사가 취소되었습니다. 실내 강당에서 진행됩니다.
6번. [대화] 여자: 이번 시험 잘 봤어요? 남자: 아니요, 공부를 많이 못 했어요. 여자: 다음에 잘하면 돼요.`,
      questions: [
        { type: 'mcq', id: 'topik-s6-l01', part: 1, text: '1번. 여자: 몇 층에 살아요? — 남자의 알맞은 대답은?', options: ['내일 가요.', '오 층에 살아요.', '빵을 먹어요.', '학생이에요.'], answer: 1 },
        { type: 'mcq', id: 'topik-s6-l02', part: 1, text: '2번. 남자: 오늘 기분이 어때요? — 여자의 알맞은 대답은?', options: ['세 개예요.', '병원이에요.', '아주 좋아요.', '만 원이에요.'], answer: 2 },
        { type: 'mcq', id: 'topik-s6-l03', part: 1, text: '3번. 여자: 이 음식 매워요? — 남자의 알맞은 대답은?', options: ['작년에 왔어요.', '두 시예요.', '부산에 살아요.', '네, 조금 매워요.'], answer: 3 },
        { type: 'mcq', id: 'topik-s6-l04', part: 1, text: '4번. 남자는 시청에 가려면 몇 번 버스를 타야 합니까?', options: ['302번', '이 버스', '시청 버스', '아무 버스'], answer: 0 },
        { type: 'mcq', id: 'topik-s6-l05', part: 1, text: '5번. 안내 방송의 내용과 같은 것은?', options: ['행사가 내일로 미뤄졌다.', '야외 행사가 취소되고 실내에서 한다.', '행사가 완전히 취소되었다.', '날씨가 맑다.'], answer: 1 },
        { type: 'mcq', id: 'topik-s6-l06', part: 1, text: '6번. 남자는 왜 시험을 잘 못 봤습니까?', options: ['늦게 와서', '시험이 어려워서', '공부를 많이 못 해서', '몸이 아파서'], answer: 2 },
        { type: 'mcq', id: 'topik-s6-l07', part: 1, text: '7번. 여기는 어디입니까? "계좌를 만들고 싶어요. — 여기 신분증 주세요."', options: ['병원', '학교', '식당', '은행'], answer: 3 },
        { type: 'mcq', id: 'topik-s6-l08', part: 1, text: '8번. 무엇에 대해 이야기합니까? "저는 개를 키워요. 이름은 초코예요. 아주 귀여워요."', options: ['애완동물', '음식', '직업', '날씨'], answer: 0 },
        { type: 'mcq', id: 'topik-s6-l09', part: 1, text: '9번. 남자: 창문 좀 열어 주세요. 너무 더워요. 여자: 네, 알겠어요. 남자는 왜 창문을 열어 달라고 했습니까?', options: ['어두워서', '더워서', '추워서', '시끄러워서'], answer: 1 },
        { type: 'mcq', id: 'topik-s6-l10', part: 1, text: '10번. 여자: 저녁에 같이 밥 먹을래요? 남자: 좋아요. 어디에서 만날까요? 두 사람은 무엇을 할 거예요?', options: ['공부할 것이다.', '집에 갈 것이다.', '같이 저녁을 먹을 것이다.', '영화를 볼 것이다.'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: '읽기 Parte 1 — 빈칸 채우기',
      instructions: '빈칸에 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s6-r01', part: 2, text: '편지를 보내려고 ( )에 갔습니다.', options: ['병원', '극장', '시장', '우체국'], answer: 3 },
        { type: 'mcq', id: 'topik-s6-r02', part: 2, text: '손을 씻으려고 ( )을/를 틀었습니다.', options: ['물', '불', '텔레비전', '라디오'], answer: 0 },
        { type: 'mcq', id: 'topik-s6-r03', part: 2, text: '기차 시간이 다 되어서 ( ) 뛰었습니다.', options: ['늦게', '빨리', '천천히', '조용히'], answer: 1 },
        { type: 'mcq', id: 'topik-s6-r04', part: 2, text: '옷을 ( ) 백화점에 갔습니다.', options: ['자러', '만나러만', '사러', '먹으러'], answer: 2 },
        { type: 'mcq', id: 'topik-s6-r05', part: 2, text: '배가 아파서 병원에 ( ).', options: ['먹었습니다', '읽었습니다', '탔습니다만', '갔습니다'], answer: 3 },
      ],
    },
    {
      part: 3, skill: 'reading', title: '읽기 Parte 2 — 화제 고르기',
      instructions: '무엇에 대한 내용입니까? 알맞은 것을 고르십시오.',
      questions: [
        { type: 'mcq', id: 'topik-s6-r06', part: 3, text: '저는 봄을 좋아합니다. 꽃이 많이 피기 때문입니다.', options: ['계절', '음식', '운동', '값'], answer: 0 },
        { type: 'mcq', id: 'topik-s6-r07', part: 3, text: '이 우유는 이천 원이고 저 빵은 삼천 원입니다.', options: ['요일', '값', '색깔', '나이'], answer: 1 },
        { type: 'mcq', id: 'topik-s6-r08', part: 3, text: '저는 선생님입니다. 학교에서 학생들을 가르칩니다.', options: ['가족', '날씨', '직업', '취미'], answer: 2 },
        { type: 'mcq', id: 'topik-s6-r09', part: 3, text: '오늘은 화요일입니다. 내일은 수요일입니다.', options: ['위치', '나이', '색깔', '요일'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'reading', title: '읽기 Parte 3 — 안내문 / 실용문',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `[병원 진료 안내]
• 진료 시간: 평일 오전 9시 ~ 오후 5시
• 점심시간: 오후 12시 30분 ~ 1시 30분
• 토요일: 오전만 진료
• 일요일, 공휴일: 휴진
※ 예약은 전화로 하세요. (02-123-4567)`,
      passageTitle: '안내문: 병원 진료',
      questions: [
        { type: 'mcq', id: 'topik-s6-r10', part: 4, text: '이 병원은 일요일에 진료를 합니까?', options: ['하지 않습니다.', '오전만 합니다.', '오후만 합니다.', '하루 종일 합니다.'], answer: 0 },
        { type: 'mcq', id: 'topik-s6-r11', part: 4, text: '위 안내문의 내용과 같은 것은?', options: ['공휴일에 진료한다.', '예약은 전화로 한다.', '토요일에는 오후에 진료한다.', '점심시간에도 진료한다.'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'reading', title: '읽기 Parte 4 — 지문 이해',
      instructions: '다음을 읽고 물음에 답하십시오.',
      passage: `저는 자전거를 아주 좋아합니다. 그래서 주말마다 한강에 가서 자전거를 탑니다. 자전거를 타면 바람도 시원하고 경치도 좋습니다. 지난 주말에는 친구와 같이 두 시간 동안 탔습니다. 조금 힘들었지만 아주 재미있었습니다. 자전거를 타면 건강에도 좋고 기분도 좋아집니다.`,
      passageTitle: '지문: 자전거 타기',
      questions: [
        { type: 'mcq', id: 'topik-s6-r12', part: 5, text: '이 사람은 주말마다 무엇을 합니까?', options: ['영화를 봅니다.', '요리를 합니다.', '한강에서 자전거를 탑니다.', '집에서 쉽니다.'], answer: 2 },
        { type: 'mcq', id: 'topik-s6-r13', part: 5, text: '지난 주말에 누구와 자전거를 탔습니까?', options: ['가족', '혼자', '동료', '친구'], answer: 3 },
        { type: 'mcq', id: 'topik-s6-r14', part: 5, text: '얼마 동안 자전거를 탔습니까?', options: ['두 시간', '한 시간', '세 시간', '삼십 분'], answer: 0 },
        { type: 'mcq', id: 'topik-s6-r15', part: 5, text: '자전거를 타면 무엇이 좋습니까?', options: ['잠을 못 잔다.', '건강에 좋고 기분도 좋아진다.', '돈을 많이 번다.', '공부를 잘한다.'], answer: 1 },
      ],
    },
  ],
};

export default mock;
