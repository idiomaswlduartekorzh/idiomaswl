import type { RoleplayToolkit } from './types.ts'

/** Caja común para los veinte roleplays de coreano A2. No es un diálogo en orden. */
export const TOOLKIT_COREANO_A2: RoleplayToolkit = {
  language: 'coreano',
  level: 'a2',
  intro:
    '필요한 표현 하나를 골라서 자기 정보와 함께 말하세요. 모든 표현을 순서대로 읽지 마세요. 이 표는 대본이 아니라 대화를 계속하기 위한 도구예요.',
  blocks: [
    {
      number: 1,
      title: '정중하게 시작하기',
      rows: [
        { form: '안녕하세요. 잠깐 괜찮으세요?', when: '상대방에게 먼저 시간을 물을 때', register: '해요체' },
        { form: '실례합니다. 질문이 하나 있어요.', when: '모르는 사람이나 직원에게 말을 걸 때', register: '해요체' },
        { form: '… 때문에 왔어요.', when: '방문한 이유만 짧게 알릴 때', register: '해요체' },
        { form: '무엇을 도와드릴까요?', when: '직원이나 담당자가 먼저 용건을 물을 때', register: '해요체', tag: '[grants]' },
      ],
      tail: '관계와 지위가 다른 사람에게는 반말을 쓰지 않아요. 각 역할 카드의 관계 설명을 먼저 확인하세요.',
    },
    {
      number: 2,
      title: '다시 묻고 확인하기',
      tag: '[receives]',
      rows: [
        { form: '죄송하지만 다시 말씀해 주세요.', reading: '[죄송하지만 다시 말씀해 주세요]', when: '잘 듣지 못했거나 이해하지 못했을 때', register: '해요체' },
        { form: '…은/는 무슨 뜻이에요?', when: '한 단어나 표현의 뜻이 필요할 때', register: '해요체' },
        { form: '제가 이해한 게 맞아요?', when: '자기 이해가 정확한지 확인할 때', register: '해요체' },
        { form: '그러니까 …라는 말씀이세요?', reading: '[그러니까 …라는 말쓰미세요]', when: '상대방의 핵심을 자기 말로 다시 확인할 때', register: '해요체' },
      ],
    },
    {
      number: 3,
      title: '쉽게 다시 설명하기',
      tag: '[jargon]',
      note: '어려운 말을 한 사람도 대화를 고칠 책임이 있어요. 같은 문장을 더 크게 반복하지 말고 다른 말로 바꾸세요.',
      rows: [
        { form: '다시 말하면, …', when: '같은 내용을 더 쉬운 말로 바꿀 때', register: '해요체' },
        { form: '제 말은 …라는 뜻이에요.', when: '자기 의도를 정확하게 설명할 때', register: '해요체' },
        { form: '… 말고 …예요.', when: '잘못 이해한 선택지를 빼고 정확한 것을 말할 때', register: '해요체' },
        { form: '예를 들면, …', when: '짧은 예가 설명보다 쉬울 때', register: '해요체' },
      ],
    },
    {
      number: 4,
      title: '이유와 중요성 말하기',
      rows: [
        { form: '…아/어서 지금 문제가 있어요.', when: '중립적인 원인과 현재 결과를 연결할 때', register: '해요체' },
        { form: '…기 때문에 이 방법은 어려워요.', when: '객관적인 이유가 선택을 막을 때', register: '해요체' },
        { form: '…(으)니까 …해 주세요.', when: '자기 이유 뒤에 요청을 붙일 때', register: '해요체' },
        { form: '저한테 중요한 이유는 …예요.', when: '자기가 잃는 것을 분명하게 말할 때', register: '해요체' },
      ],
    },
    {
      number: 5,
      title: '한계와 거절 말하기',
      tag: '[grants]',
      rows: [
        { form: '죄송하지만 그건 어려워요.', when: '사람이 아니라 한 방법을 거절할 때', register: '해요체' },
        { form: '지금은 …할 수 없어요.', when: '현재 가능한 범위를 분명하게 말할 때', register: '해요체' },
        { form: '…까지는 괜찮지만, 그 후에는 안 돼요.', when: '시간이나 수량의 한계를 줄 때', register: '해요체' },
        { form: '그 방법은 안 될 것 같아요.', when: '이유를 이어서 설명할 수 있는 부드러운 거절', register: '해요체' },
      ],
    },
    {
      number: 6,
      title: '조건과 다른 방법 제시하기',
      rows: [
        { form: '…(으)면 …할 수 있어요.', when: '확인할 조건 뒤에 가능한 결과를 말할 때', register: '해요체' },
        { form: '다른 방법은 …예요.', when: '첫 번째 방법이 안 될 때', register: '해요체' },
        { form: '두 가지 방법이 있어요.', when: '선택지를 설명하기 전에 수만 알려 줄 때', register: '해요체' },
        { form: '… 대신 …도 가능해요.', when: '한 선택을 다른 선택으로 바꿀 때', register: '해요체' },
      ],
    },
    {
      number: 7,
      title: '시간을 벌고 다음 행동 정하기',
      rows: [
        { form: '잠시만요. 확인할게요.', when: '자료나 규칙을 먼저 볼 때', register: '해요체' },
        { form: '생각할 시간이 조금 필요해요.', when: '바로 결정할 수 없을 때', register: '해요체' },
        { form: '…까지 알려 드릴 거예요.', when: '누가 언제 연락할지 약속할 때', register: '해요체' },
        { form: '먼저 …하고, 그 후에 …할 거예요.', when: '두 행동의 순서를 정할 때', register: '해요체' },
      ],
      tail: '모르는 답을 바로 만들지 마세요. 확인 시간과 다시 연락할 시간을 따로 말하세요.',
    },
    {
      number: 8,
      title: '합의 확인하고 끝내기',
      rows: [
        { form: '그럼 …로 해요.', when: '둘이 고른 방법을 짧게 확인할 때', register: '해요체' },
        { form: '확인할게요. … 맞죠?', when: '마지막 정보를 자기 말로 반복할 때', register: '해요체' },
        { form: '누가 언제 …할 거예요?', when: '다음 행동의 사람과 시간을 정할 때', register: '해요체' },
        { form: '도와주셔서 감사합니다.', reading: '[도와주셔서 감사함니다]', when: '상대방이 시간이나 선택을 주었을 때', register: '해요체' },
      ],
      tail: '끝났다는 뜻은 “네”가 아니라 두 사람이 같은 행동, 담당자, 시간을 말할 수 있다는 뜻이에요.',
    },
  ],
}
