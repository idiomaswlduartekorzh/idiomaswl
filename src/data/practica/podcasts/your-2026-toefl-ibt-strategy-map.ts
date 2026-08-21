import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

export const TOEFL_STRATEGY_MAP_PODCAST = {
  id: 'toefl-strategy-map',
  title: 'Your 2026 TOEFL iBT Strategy Map',
  description: 'Use this English episode as your map of the current TOEFL iBT: understand the adaptive design, learn every 2026 task type, translate the new score scale and turn one diagnostic into a targeted practice plan.',
  duration: '22:06',
  audioSrc: '/audio/toefl/strategy-map/your-2026-toefl-ibt-strategy-map.mp3',
  outcomes: [
    'explain the Reading, Listening, Writing and Speaking order, base timing and adaptive structure;',
    'recognise all 12 current task types used across the four sections;',
    'connect each task to the sub-skills that actually improve it, from contextual morphology to intelligible speech;',
    'set an institution-specific target, diagnose one precise weakness and build a current-format practice loop.',
  ],
  editorialTitle: 'Checked against the current ETS format',
  editorialBody: 'Reviewed on 20 August 2026. The counts and times in the episode are ETS base figures and can vary as the test adapts. Score targets mentioned in conversation are illustrative: every candidate must verify both overall and section requirements with each institution.',
} as const;

const sections: EpisodeSection[] = [
  {
    heading: 'The map changed on 21 January 2026',
    body: [
      'The current TOEFL iBT is built around language used in modern academic and campus settings. Preparing with a resource that teaches only the pre-2026 task set can train you for questions that are no longer on the scored test.',
      'The durable skills still transfer — comprehension, grammar, note-taking, clear writing and intelligible speech — but they now have to be practised through the current task types.',
    ],
  },
  {
    heading: 'What is adaptive, and what is not',
    body: [
      'Reading and Listening use a multistage adaptive design. You complete a module, and your performance routes you to another module at an appropriate difficulty. The test does not rewrite the next question after every single answer.',
      'Writing and Speaking are not adaptive. Different Reading or Listening routes are accounted for in scoring, so receiving a different set from another candidate does not make the results incomparable.',
    ],
  },
  {
    heading: 'Order, timing and the numbers to remember',
    body: [
      'The section order is Reading, Listening, Writing and Speaking. ETS asks candidates to allow approximately two hours for the complete experience, including directions. Because the test adapts, exact item counts and timing can vary.',
      'The official base figures are: Reading, 50 items in about 30 minutes; Listening, 47 in about 29; Writing, 12 in about 23; and Speaking, 11 in about 8. Treat those as an orientation, not a minute-by-minute promise.',
    ],
  },
  {
    heading: 'Reading: three task types, three decisions',
    body: [
      'Complete the Words asks you to reconstruct partly missing words from grammar, morphology and context. Read in Daily Life uses short practical texts such as notices or schedules, where purpose, inference and efficient scanning matter. Read an Academic Passage tests main ideas, details and relationships in a university-style text.',
      'The shared skill is controlled contextual reading: identify what the text is doing, locate the evidence and use sentence structure before reaching for a memorised definition.',
    ],
  },
  {
    heading: 'Listening: four task types and selective notes',
    body: [
      'The current tasks are Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement and Listen to an Academic Talk. The first of these tests pragmatic meaning: the best reply must fit the speaker’s intent, not merely be grammatical.',
      'For longer clips, notes should capture purpose, organisation, relationships and consequences. Trying to transcribe every word consumes attention and often hides the main point.',
    ],
  },
  {
    heading: 'Writing: build, email, discuss',
    body: [
      'Build a Sentence tests grammar and word order. Write an Email tests whether your purpose, register and content fit a real academic situation. Write for an Academic Discussion asks for a clear, concise and supported contribution.',
      'Integrated Writing belonged to the earlier scored format. It can still be useful as a synthesis exercise, but it is not one of the three tasks on the current TOEFL iBT.',
    ],
  },
  {
    heading: 'Speaking: recorded, short and practical',
    body: [
      'Speaking contains Listen and Repeat and Take an Interview. It is not a live face-to-face interview: you speak into a microphone and your responses are recorded.',
      'Train accurate processing, intelligible pronunciation and a natural pace. A particular accent is not the goal; a listener being able to understand you without strain is.',
    ],
  },
  {
    heading: 'How the 1–6 score works',
    body: [
      'Each section receives a score from 1 to 6 in half-point increments. The overall score is the average of the four section scores, rounded to the nearest half band. An average of 5.25, for example, becomes 5.5.',
      'During the two-year transition after January 2026, the official report also includes a comparable overall result on the 0–120 scale. This lets institutions continue reading requirements they have not yet rewritten.',
    ],
  },
  {
    heading: 'There is no universal passing score',
    body: [
      'ETS does not decide whether a score is enough for your application. Each institution — and sometimes an individual department — sets its own overall and section requirements.',
      'Any target mentioned in a general explanation is only illustrative. Verify the current requirement directly with every programme before choosing your goal score or booking the test.',
    ],
  },
  {
    heading: 'The practice loop',
    body: [
      'First, write down the overall and section requirements for your target programmes. Second, take a diagnostic that explicitly uses the post-January-2026 format. Third, classify every error by the specific task and sub-skill that caused it.',
    ],
    bullets: [
      'Reading: morphology, grammar, context, purpose, scanning, main idea or detail.',
      'Listening: pragmatic response, speaker intent, implied meaning, organisation or selective note-taking.',
      'Writing: sentence construction, register, prompt coverage, clarity or support.',
      'Speaking: processing, accurate repetition, intelligibility, pace or idea development.',
      'Practise the weakest sub-skill in isolation, then return to mixed and timed work to check transfer.',
    ],
  },
  {
    heading: 'The takeaway',
    body: [
      'Use one current map: know your destination score, learn the exact task set, diagnose at sub-skill level and practise the smallest failure before repeating a full test.',
      'The most useful preparation improves the same communication you will need on campus: understanding a notice, following a talk, writing an appropriate email and responding clearly under time pressure.',
    ],
  },
];

export default sections;
