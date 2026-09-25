import type { DiagnosticWritingPromptRecord } from '../../../lib/diagnostic/writing.ts';
import type { CefrLevel } from '../../../lib/diagnostic/types.ts';

export const ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION = 'en-writing-candidates-2026-09-24';

const specifications: Readonly<Record<CefrLevel, { minimumWords: number; maximumWords: number; recommendedMinutes: number }>> = {
  A1: { minimumWords: 40, maximumWords: 70, recommendedMinutes: 10 },
  A2: { minimumWords: 60, maximumWords: 100, recommendedMinutes: 12 },
  B1: { minimumWords: 100, maximumWords: 160, recommendedMinutes: 18 },
  B2: { minimumWords: 160, maximumWords: 240, recommendedMinutes: 25 },
  C1: { minimumWords: 220, maximumWords: 320, recommendedMinutes: 30 },
  C2: { minimumWords: 260, maximumWords: 380, recommendedMinutes: 35 },
};

type PromptSeed = {
  level: CefrLevel;
  title: string;
  situation: string;
  instructions: readonly [string, string, string];
};

const seeds: readonly PromptSeed[] = [
  {
    level: 'A1', title: 'A new classmate',
    situation: 'A new classmate sends you a short message and asks about you.',
    instructions: ['Say your name and where you live.', 'Describe one thing you like doing.', 'Ask your classmate one simple question.'],
  },
  {
    level: 'A1', title: 'A note about your day',
    situation: 'Your friend wants to know when you are free today.',
    instructions: ['Write what you do in the morning.', 'Say what time you are free.', 'Suggest one simple activity together.'],
  },
  {
    level: 'A1', title: 'Your favourite room',
    situation: 'An online language partner asks you to describe a room in your home.',
    instructions: ['Say which room you chose.', 'Describe three things in it.', 'Explain why you like or do not like it.'],
  },
  {
    level: 'A1', title: 'A simple invitation',
    situation: 'You want a friend from your language class to meet you this weekend.',
    instructions: ['Say where you want to meet.', 'Give the day and time.', 'Say what you want to do.'],
  },
  {
    level: 'A2', title: 'A weekend plan',
    situation: 'A friend is visiting your town for one day and asks for a plan.',
    instructions: ['Suggest two places or activities.', 'Explain when and where you will meet.', 'Say what your friend should bring.'],
  },
  {
    level: 'A2', title: 'Something you lost',
    situation: 'You left an important object at a community centre. Write to the reception desk.',
    instructions: ['Describe the object.', 'Explain when and where you last saw it.', 'Ask how you can collect it.'],
  },
  {
    level: 'A2', title: 'A place to recommend',
    situation: 'A language partner asks about a good place to visit near your home.',
    instructions: ['Describe the place and its location.', 'Say what people can do there.', 'Explain the best time to visit.'],
  },
  {
    level: 'A2', title: 'A recent celebration',
    situation: 'Your class blog is collecting short stories about recent celebrations.',
    instructions: ['Say what the celebration was.', 'Describe who was there and what happened.', 'Explain how you felt.'],
  },
  {
    level: 'B1', title: 'A useful community class',
    situation: 'Your local community centre wants suggestions for a new weekly class.',
    instructions: ['Propose a class and identify who it would help.', 'Explain why the class is needed.', 'Suggest how the centre could organise it.'],
  },
  {
    level: 'B1', title: 'An experience that changed a habit',
    situation: 'A student magazine is publishing personal stories about changing everyday habits.',
    instructions: ['Describe what happened.', 'Explain how your habit changed.', 'Say what other people could learn from your experience.'],
  },
  {
    level: 'B1', title: 'Studying from home',
    situation: 'Your course asks students whether one lesson each week should take place online.',
    instructions: ['State and explain your opinion.', 'Give one advantage and one disadvantage.', 'Suggest a practical arrangement for the class.'],
  },
  {
    level: 'B1', title: 'A problem in a shared space',
    situation: 'People who use a shared study room often leave it untidy and noisy.',
    instructions: ['Describe the problem and its effects.', 'Propose two realistic changes.', 'Ask the organiser to take a specific next step.'],
  },
  {
    level: 'B2', title: 'Improving public transport information',
    situation: 'Your city is redesigning the information available to bus and train passengers.',
    instructions: ['Identify the most important information problems.', 'Compare two possible improvements.', 'Recommend a solution and justify its priority.'],
  },
  {
    level: 'B2', title: 'Personal privacy online',
    situation: 'A general-interest website invites articles on how individuals can protect their privacy online.',
    instructions: ['Explain why the issue matters in daily life.', 'Evaluate common advice people receive.', 'Offer practical recommendations for different users.'],
  },
  {
    level: 'B2', title: 'Work, study and free time',
    situation: 'Your college magazine is discussing whether busy schedules reduce the quality of learning.',
    instructions: ['Present the main causes of the problem.', 'Discuss consequences for individuals and institutions.', 'Argue for a balanced response.'],
  },
  {
    level: 'B2', title: 'Using an empty public building',
    situation: 'A vacant building in your neighbourhood could become a sports centre, a library or a business hub.',
    instructions: ['Compare the three options using community needs.', 'Address one likely objection to your preferred option.', 'Make and justify a final recommendation.'],
  },
  {
    level: 'C1', title: 'Technology and meaningful learning',
    situation: 'An education journal asks whether adding more technology necessarily improves learning.',
    instructions: ['Examine assumptions behind the claim.', 'Distinguish productive uses from superficial adoption.', 'Develop a position with implications for educators.'],
  },
  {
    level: 'C1', title: 'A flexible-work policy',
    situation: 'An organisation is reviewing a policy that lets employees choose where they work.',
    instructions: ['Analyse competing needs of employees, teams and clients.', 'Propose principles rather than a single rule for every role.', 'Explain how the policy should be evaluated after launch.'],
  },
  {
    level: 'C1', title: 'Reviewing a cultural event',
    situation: 'A publication wants a critical review of a cultural event, exhibition, performance or festival you know.',
    instructions: ['Describe its aims without merely summarising it.', 'Evaluate how effectively its choices served those aims.', 'Recommend the event to a clearly defined audience, with qualifications.'],
  },
  {
    level: 'C1', title: 'Who should shape urban spaces?',
    situation: 'A city forum is debating how residents, experts and businesses should influence public-space decisions.',
    instructions: ['Analyse the legitimate interests of the groups involved.', 'Address tensions between expertise and public participation.', 'Propose a decision process and defend its safeguards.'],
  },
  {
    level: 'C2', title: 'Automated advice in public decisions',
    situation: 'A public agency is considering automated systems that recommend how limited services should be allocated.',
    instructions: ['Unpack the ethical and practical tensions without reducing them to a binary choice.', 'Propose accountability mechanisms that address uncertainty and unequal impact.', 'Anticipate how your framework could fail and explain how it should adapt.'],
  },
  {
    level: 'C2', title: 'Cultural works and contested ownership',
    situation: 'An international review invites an essay on who may preserve, display or reinterpret culturally significant works.',
    instructions: ['Distinguish legal ownership from cultural legitimacy.', 'Reconcile at least two defensible but conflicting perspectives.', 'Develop a nuanced principle and test it against a difficult exception.'],
  },
  {
    level: 'C2', title: 'Responding to a stakeholder conflict',
    situation: 'A long-term project is supported by its funders but opposed by some of the people it is intended to benefit.',
    instructions: ['Diagnose why conventional consultation may have failed.', 'Set out a response that preserves trust without promising consensus.', 'Define the evidence that would justify continuing, redesigning or ending the project.'],
  },
  {
    level: 'C2', title: 'How narratives shape public memory',
    situation: 'A serious magazine asks for a critical essay on how societies turn complex events into shared public narratives.',
    instructions: ['Analyse what simplification makes possible and what it obscures.', 'Consider the responsibilities of institutions and individual storytellers.', 'Develop a position that accommodates revision, disagreement and uncertainty.'],
  },
];

export const ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES: readonly DiagnosticWritingPromptRecord[] = seeds.map((seed, index) => {
  const levelIndex = seeds.slice(0, index).filter(candidate => candidate.level === seed.level).length + 1;
  return {
    publicPrompt: {
      id: `en-${seed.level.toLowerCase()}-writing-${String(levelIndex).padStart(2, '0')}`,
      contentVersion: 'draft-1',
      language: 'en',
      levelCandidate: seed.level,
      title: seed.title,
      situation: seed.situation,
      instructions: seed.instructions,
      ...specifications[seed.level],
    },
    status: 'reserved',
    exposure: 'reserved',
    review: { status: 'draft' },
    source: { kind: 'welearn-original', reference: ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION },
  };
});
