export const SPANISH_HUB = '/learn-spanish-colombia';
export const SPANISH_HUB_URL = `https://www.idiomaswl.com${SPANISH_HUB}`;

export const SPANISH_GUIDES = [
  {
    slug: 'colombian-spanish',
    eyebrow: 'Language & culture',
    title: 'Colombian Spanish: what changes from city to city?',
    description: 'A practical introduction to usted, tú, vos and everyday Colombian expressions, with context instead of accent myths.',
    question: 'Is there one Colombian accent?',
    answer: 'No. Colombia has many regional varieties. Learn broadly understood Spanish first, then listen to the people in the city where you spend time.',
  },
  {
    slug: 'spanish-for-travelers',
    eyebrow: 'First conversations',
    title: 'Spanish for travelers in Colombia',
    description: 'Useful phrases for cafés, transport and asking someone to slow down, with short explanations you can use immediately.',
    question: 'What should I learn before arriving?',
    answer: 'Start with greetings, polite requests, numbers, directions and one phrase for asking people to repeat themselves.',
  },
  {
    slug: 'four-week-study-plan',
    eyebrow: 'A realistic routine',
    title: 'A four-week Spanish study plan for Colombia',
    description: 'A flexible practice plan that combines short lessons, listening and real conversations before or during a trip.',
    question: 'Can I become fluent in four weeks?',
    answer: 'Fluency has no fixed four-week deadline. This plan gives you repeatable practice and useful first conversations; your progress depends on your starting point and time spent speaking.',
  },
] as const;

export type SpanishGuideSlug = (typeof SPANISH_GUIDES)[number]['slug'];

export const HUB_QUESTIONS = [
  {
    question: 'Is Colombian Spanish easier to understand?',
    answer: 'There is no single Colombian accent. You may find one speaker easier to understand than another, just as in any Spanish-speaking country. Choose useful listening material from several Colombian regions and ask people to repeat unfamiliar words.',
  },
  {
    question: 'Should I start learning before I travel?',
    answer: 'Yes, if you can. Even a short routine with greetings, numbers, requests and listening makes your first everyday conversations less stressful. You can keep learning while you are in Colombia.',
  },
  {
    question: 'Do I need classes, or can I learn on my own?',
    answer: 'Self-study can build vocabulary and listening. Feedback from a tutor or conversation partner helps you notice what others actually understand. Many learners combine both.',
  },
  {
    question: 'Does WeLearn have a campus in Medellín, Bogotá or Cartagena?',
    answer: 'WeLearn is based in Bucaramanga. This guide discusses other cities as places to learn and practise Spanish; it does not represent a WeLearn campus in those cities.',
  },
] as const;

export const TRAVEL_PHRASES = [
  { situation: 'Getting started', spanish: 'Buenos días. ¿Me puede ayudar?', english: 'Good morning. Can you help me?', note: 'A polite request that works in many settings.' },
  { situation: 'At a café', spanish: '¿Cuánto cuesta este café?', english: 'How much is this coffee?', note: 'Este points to something near you. Swap café for another item.' },
  { situation: 'Finding a place', spanish: '¿Dónde queda la estación?', english: 'Where is the station?', note: '¿Dónde queda…? is a natural way to ask where a place is.' },
  { situation: 'Keeping the conversation going', spanish: '¿Puede hablar más despacio, por favor?', english: 'Could you speak more slowly, please?', note: 'Useful when you understand some words but need more time.' },
] as const;
