export type ToeflConstructedWritingKind = 'email' | 'academic-discussion';

export interface ToeflConstructedWritingTask {
  id: string;
  legacyId: string;
  kind: ToeflConstructedWritingKind;
  title: string;
  contentVersion: string;
  timeLimitSeconds: 420 | 600;
  recommendedMinimumWords?: 100;
  stimulus: string;
  prompt: string;
  rubric: Array<{ id: string; label: string; description: string }>;
}

const commonRubric = [
  { id: 'task', label: 'Task completion', description: 'The response addresses the requested purpose and remains relevant.' },
  { id: 'development', label: 'Development', description: 'Ideas are explained with enough specific information to be useful.' },
  { id: 'organization', label: 'Organization', description: 'The response is easy to follow and relationships between ideas are clear.' },
  { id: 'language', label: 'Language use', description: 'Grammar and vocabulary communicate the intended meaning accurately.' },
  { id: 'mechanics', label: 'Writing conventions', description: 'Spelling, punctuation and capitalization support readability.' },
] as const;

export const TOEFL_WRITING_CONSTRUCTED_SET1: {
  id: string;
  objectId: string;
  contentVersion: string;
  officialRegistryVersion: string;
  disclosure: string;
  tasks: ToeflConstructedWritingTask[];
} = {
  id: 'toefl-writing-constructed-set1-v2',
  objectId: 'object:toefl-writing-constructed-set1-v2',
  contentVersion: '2026-08-14.v1',
  officialRegistryVersion: 'toefl-ibt-2026@2026-08-14.t17',
  disclosure:
    'Práctica fija WeLearn. El reloj reproduce el límite oficial de la familia, pero la rúbrica es feedback local: no produce una puntuación oficial ni una estimación ETS.',
  tasks: [
    {
      id: 'item:t1-w-email-v2',
      legacyId: 't1-w-email',
      kind: 'email',
      title: 'Write an Email',
      contentVersion: '2026-08-14.v1',
      timeLimitSeconds: 420,
      stimulus: `Situation: You booked a hotel room for a weekend trip, but you now need to arrive a day earlier. You want to ask whether you can change your booking to include an extra night and how much more it will cost.\n\nWrite an email to the hotel.`,
      prompt: 'In your email, explain what you need, ask whether the booking can be changed, ask about the additional cost, and use an appropriate polite tone. Write as much as you can in complete sentences.',
      rubric: [
        ...commonRubric,
        { id: 'tone', label: 'Audience and tone', description: 'The message sounds appropriately polite for a hotel staff member.' },
      ],
    },
    {
      id: 'item:t1-w-disc-v2',
      legacyId: 't1-w-disc',
      kind: 'academic-discussion',
      title: 'Write for an Academic Discussion',
      contentVersion: '2026-08-14.v1',
      timeLimitSeconds: 600,
      recommendedMinimumWords: 100,
      stimulus: `Your professor is teaching a class on technology and daily life. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Reed: Many people now use their phones to do almost everything — banking, shopping, studying, and staying in touch. Do you think our growing reliance on smartphones is mostly positive or mostly negative? Why?\n\nStudent Hana: I think it's mostly positive. Smartphones save time, keep us connected, and put useful tools in one place. For example, I use my phone to check bus schedules, complete assignments, and video call family members in another country.\n\nStudent Diego: I'm more cautious. People spend hours staring at screens, get distracted easily, and can feel anxious without their phones. For example, I sometimes reach for my phone the moment I wake up.`,
      prompt: "Write a response of at least 100 words. State and support your position, contribute a new point in your own words, and take the other students' ideas into account.",
      rubric: [
        ...commonRubric,
        { id: 'discussion', label: 'Contribution to discussion', description: 'The response adds a relevant perspective instead of only repeating another post.' },
      ],
    },
  ],
};

export function getToeflWritingConstructedTask(kind: ToeflConstructedWritingKind) {
  return TOEFL_WRITING_CONSTRUCTED_SET1.tasks.find((task) => task.kind === kind)!;
}
