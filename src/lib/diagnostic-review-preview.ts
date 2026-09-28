import type { CefrLevel, DiagnosticPublicItem, DiagnosticSkill } from './diagnostic/types';

type ChoiceInput = {
  id: string;
  skill: DiagnosticSkill;
  subdomain: string;
  level: CefrLevel;
  prompt: string;
  options: readonly [string, string, string];
  title?: string;
  body?: string;
  audio?: string;
};

function choice(input: ChoiceInput): DiagnosticPublicItem {
  const optionIds = [`${input.id}-a`, `${input.id}-b`, `${input.id}-c`] as const;
  return {
    id: input.id,
    contentVersion: 'review-balanced-v1',
    language: 'en',
    skill: input.skill,
    subdomain: input.subdomain,
    levelCandidate: input.level,
    prompt: input.prompt,
    stimulus: input.audio
      ? { kind: 'audio', mediaId: `${input.id}-audio`, src: input.audio, startMs: 0, endMs: 3_600_000, maxPlays: 2 }
      : input.body
        ? { kind: 'text', stimulusId: `${input.id}-text`, ...(input.title ? { title: input.title } : {}), body: input.body }
        : { kind: 'none' },
    response: { kind: 'single-choice', optionIds },
    displayOptions: optionIds.map((id, index) => ({ id, text: input.options[index] })),
  };
}

function ordering(input: {
  id: string;
  level: CefrLevel;
  title: string;
  body: string;
  prompt: string;
  fragments: readonly [string, string, string, string];
}): DiagnosticPublicItem {
  const optionIds = [`${input.id}-a`, `${input.id}-b`, `${input.id}-c`, `${input.id}-d`] as const;
  return {
    id: input.id,
    contentVersion: 'review-balanced-v1',
    language: 'en',
    skill: 'written-discourse',
    subdomain: 'organisation-sequencing',
    levelCandidate: input.level,
    prompt: input.prompt,
    stimulus: { kind: 'text', stimulusId: `${input.id}-text`, title: input.title, body: input.body },
    response: { kind: 'ordering', optionIds },
    displayOptions: optionIds.map((id, index) => ({ id, text: input.fragments[index] })),
  };
}

const reading = [
  choice({
    id: 'review-reading-01', skill: 'reading', subdomain: 'explicit-detail', level: 'A2',
    title: 'Workshop notice', body: 'The bicycle workshop opens at 9:30 on Saturday. Arrive ten minutes early if you need to borrow tools.',
    prompt: 'When should a person who needs tools arrive?', options: ['At 9:20.', 'At 9:30.', 'At 9:40.'],
  }),
  choice({
    id: 'review-reading-02', skill: 'reading', subdomain: 'purpose', level: 'A2',
    title: 'Building message', body: 'The lift will be unavailable from 10:00 to 12:00 on Tuesday while an engineer replaces a safety sensor. Please use the stairs or ask reception for assistance.',
    prompt: 'Why was this message written?', options: ['To advertise a new lift.', 'To announce temporary maintenance.', 'To change reception hours.'],
  }),
  choice({
    id: 'review-reading-03', skill: 'reading', subdomain: 'inference', level: 'B1',
    title: 'Course email', body: 'Although the photography walk is still scheduled for Sunday, the forecast is uncertain. We will confirm the meeting point by 7:00 that morning. If the weather is severe, your payment will transfer to the next walk.',
    prompt: 'What can participants infer?', options: ['They must pay again if it rains.', 'The walk has already been cancelled.', 'They should check for an update on Sunday.'],
  }),
  choice({
    id: 'review-reading-04', skill: 'reading', subdomain: 'main-idea', level: 'B1',
    title: 'Shared workspace', body: 'A local library introduced bookable desks for remote workers. Demand was high, but some users reserved several days and attended only once. The library now releases an unused desk after fifteen minutes and limits advance bookings.',
    prompt: 'What is the paragraph mainly about?', options: ['A policy introduced to make desk access fairer.', 'A plan to replace books with office equipment.', 'A complaint about the quality of remote work.'],
  }),
  choice({
    id: 'review-reading-05', skill: 'reading', subdomain: 'reference', level: 'B1',
    title: 'Repair programme', body: 'Residents may bring broken lamps and small appliances to the monthly repair café. Volunteers inspect them before deciding whether a safe repair is possible. This prevents unnecessary waste, although not every object can be saved.',
    prompt: 'What does “This” refer to?', options: ['Holding the event every week.', 'Inspecting and repairing suitable objects.', 'Replacing all unsafe appliances.'],
  }),
  choice({
    id: 'review-reading-06', skill: 'reading', subdomain: 'author-stance', level: 'B2',
    title: 'Public transport trial', body: 'The reduced evening fare increased passenger numbers, but the trial lasted only six weeks and coincided with unusually high fuel prices. The figures are encouraging; they are not yet strong enough to justify a permanent policy.',
    prompt: 'How does the writer evaluate the trial?', options: ['Completely unsuccessful.', 'Sufficient proof for permanent change.', 'Promising but inconclusive.'],
  }),
  choice({
    id: 'review-reading-07', skill: 'reading', subdomain: 'argument-structure', level: 'B2',
    title: 'Flexible schedules', body: 'Supporters argue that flexible schedules improve retention. Critics respond that availability can become unclear. Both concerns are valid, so the strongest policies define shared contact hours while allowing employees to arrange the rest of the day.',
    prompt: 'What solution does the writer favour?', options: ['Combining flexibility with common availability.', 'Returning everyone to identical schedules.', 'Removing all expectations about contact time.'],
  }),
] as const;

const listening = [
  choice({
    id: 'review-listening-01', skill: 'listening', subdomain: 'explicit-detail', level: 'A1', audio: '/audio/reading/en-a1-birthday-party-invite.mp3',
    prompt: 'Where will Mia have the picnic if the weather is dry?', options: ['In Riverside Park.', 'At 24 King Street.', 'Beside the school.'],
  }),
  choice({
    id: 'review-listening-02', skill: 'listening', subdomain: 'instruction', level: 'A2', audio: '/audio/reading/en-a1-saturday-bus-guide.mp3',
    prompt: 'Where should passengers for the hospital leave the bus?', options: ['At Riverside Market.', 'At the city park.', 'At Central Station.'],
  }),
  choice({
    id: 'review-listening-03', skill: 'listening', subdomain: 'explicit-detail', level: 'A2', audio: '/audio/reading/en-a1-library-book-message.mp3',
    prompt: 'What must Leo bring to collect the book?', options: ['The blue box.', 'A message from Mrs Green.', 'His student card.'],
  }),
  choice({
    id: 'review-listening-04', skill: 'listening', subdomain: 'cause', level: 'A2', audio: '/audio/reading/en-a2-rainy-day-bus-change.mp3',
    prompt: 'Why is bus 18 using a different route?', options: ['Heavy rain flooded part of the road.', 'A bridge is being rebuilt.', 'The sports centre is closed.'],
  }),
  choice({
    id: 'review-listening-05', skill: 'listening', subdomain: 'speaker-strategy', level: 'B1', audio: '/audio/reading/en-a2-first-job-interview.mp3',
    prompt: 'Why did Noor avoid memorising long answers?', options: ['She had forgotten the interview date.', 'She wanted to sound natural.', 'She expected only technical questions.'],
  }),
  choice({
    id: 'review-listening-06', skill: 'listening', subdomain: 'supporting-detail', level: 'B1', audio: '/audio/reading/en-b1-four-day-work-week.mp3',
    prompt: 'How did the company handle urgent requests on Fridays?', options: ['All employees worked from home.', 'Clients left messages until Monday.', 'A manager carried an emergency phone.'],
  }),
  choice({
    id: 'review-listening-07', skill: 'listening', subdomain: 'cause-effect', level: 'B1', audio: '/audio/reading/en-b1-library-study-zones.mp3',
    prompt: 'Why did the library introduce a cancellation rule?', options: ['Students requested longer conversations.', 'Some booked rooms were left unused.', 'The main reading room had closed.'],
  }),
] as const;

const discourse = [
  choice({
    id: 'review-discourse-01', skill: 'written-discourse', subdomain: 'rhetorical-relations', level: 'A2',
    title: 'A changed plan', body: 'The outdoor concert was cancelled. ___, the musicians performed inside the town hall.',
    prompt: 'Choose the phrase that best expresses the relationship.', options: ['Instead', 'Meanwhile', 'For example'],
  }),
  ordering({
    id: 'review-discourse-02', level: 'A2', title: 'A delayed journey', body: 'The fragments describe how Maya reached work.',
    prompt: 'Order the fragments to form a coherent sequence.',
    fragments: ['She called the office to explain the delay.', 'Maya reached the bus stop at eight.', 'A taxi finally arrived.', 'The bus did not come for twenty minutes.'],
  }),
  choice({
    id: 'review-discourse-03', skill: 'written-discourse', subdomain: 'cohesion-reference', level: 'B1',
    title: 'Survey results', body: 'The survey reached twice as many people as last year. [1] Most new respondents were under twenty-five. [2] The apparent increase may therefore reflect the sample rather than a change in opinion. [3]',
    prompt: 'Where should this sentence go? “This limitation matters when the figures are compared across years.”',
    options: ['Position 1.', 'Position 2.', 'Position 3.'],
  }),
  choice({
    id: 'review-discourse-04', skill: 'written-discourse', subdomain: 'revision-coherence', level: 'B1',
    title: 'An ambiguous reference', body: 'Marta discussed the proposal with Elena after she reviewed the budget.',
    prompt: 'The intended meaning is that Marta reviewed the budget. Choose the clearest revision.',
    options: ['Marta discussed the proposal before reviewing the budget.', 'After Elena reviewed the budget, Marta discussed the proposal with her.', 'After reviewing the budget, Marta discussed the proposal with Elena.'],
  }),
  ordering({
    id: 'review-discourse-05', level: 'B1', title: 'Community garden', body: 'The paragraph explains why a neighbourhood project expanded.',
    prompt: 'Order the fragments to form a coherent paragraph.',
    fragments: ['The organisers therefore added a second weekly session.', 'At first, only six people worked in the garden.', 'Interest grew after photographs of the harvest were shared.', 'Soon, more residents wanted to volunteer.'],
  }),
  choice({
    id: 'review-discourse-06', skill: 'written-discourse', subdomain: 'audience-register', level: 'B2',
    title: 'Course office', body: 'You need to ask a course coordinator for a deadline extension because you were ill.',
    prompt: 'Which opening best suits the reader and purpose?',
    options: ['Dear Dr Patel, I am writing to request a short extension because I was unwell.', 'Hi, I need more time, so move the deadline for me.', 'To whom it may concern: deadlines should be more flexible.'],
  }),
  choice({
    id: 'review-discourse-07', skill: 'written-discourse', subdomain: 'rhetorical-relations', level: 'B2',
    title: 'Research conclusion', body: 'The sample was small and drawn from one neighbourhood. ___, the findings identify a pattern worth testing in a larger study.',
    prompt: 'Choose the phrase that best completes the argument.', options: ['Similarly', 'Nevertheless', 'In other words'],
  }),
] as const;

const grammar = [
  choice({ id: 'review-grammar-01', skill: 'grammar', subdomain: 'subject-verb-agreement', level: 'A2', prompt: 'Choose the grammatically correct sentence.', options: ['The new schedule starts on Monday.', 'The new schedule start on Monday.', 'The new schedule starting on Monday.'] }),
  choice({ id: 'review-grammar-02', skill: 'grammar', subdomain: 'past-time', level: 'A2', prompt: 'Complete the sentence: “When I arrived, the meeting ___.”', options: ['has already started', 'had already started', 'already starts'] }),
  choice({ id: 'review-grammar-03', skill: 'grammar', subdomain: 'modality', level: 'B1', prompt: 'Choose the sentence that expresses a past obligation.', options: ['We must submit the form yesterday.', 'We have submitted the form yesterday.', 'We had to submit the form yesterday.'] }),
  choice({ id: 'review-grammar-04', skill: 'grammar', subdomain: 'conditionals', level: 'B1', prompt: 'Complete the sentence: “If the weather improves, we ___ outside.”', options: ['practised', 'would practise', 'will practise'] }),
  choice({ id: 'review-grammar-05', skill: 'grammar', subdomain: 'relative-clauses', level: 'B1', prompt: 'Choose the best completion: “The colleague ___ trained me now leads the team.”', options: ['which', 'who', 'whose'] }),
  choice({ id: 'review-grammar-06', skill: 'grammar', subdomain: 'reported-speech', level: 'B2', prompt: 'Choose the accurate report: Maya said, “I cannot attend today.”', options: ['Maya said that I cannot attend today.', 'Maya said that she will not attended that day.', 'Maya said that she could not attend that day.'] }),
  choice({ id: 'review-grammar-07', skill: 'grammar', subdomain: 'inversion', level: 'B2', prompt: 'Choose the grammatically complete sentence.', options: ['Only after the review did the team changed its plan.', 'Only after the review the team changed its plan.', 'Only after the review did the team change its plan.'] }),
] as const;

const vocabulary = [
  choice({
    id: 'review-vocabulary-01', skill: 'vocabulary', subdomain: 'meaning-in-context', level: 'A2',
    title: 'Workshop equipment', body: 'You may borrow a helmet, but you must return it before leaving.',
    prompt: 'What does “borrow” mean here?', options: ['Use temporarily and return.', 'Pay to own permanently.', 'Repair after damage.'],
  }),
  choice({ id: 'review-vocabulary-02', skill: 'vocabulary', subdomain: 'collocation', level: 'A2', prompt: 'Choose the natural expression.', options: ['do a decision', 'make a decision', 'build a decision'] }),
  choice({
    id: 'review-vocabulary-03', skill: 'vocabulary', subdomain: 'meaning-in-context', level: 'B1',
    title: 'A busy week', body: 'The team postponed the launch because two essential tests were incomplete.',
    prompt: 'What does “postponed” mean?', options: ['Made permanently impossible.', 'Completed earlier than planned.', 'Moved to a later time.'],
  }),
  choice({ id: 'review-vocabulary-04', skill: 'vocabulary', subdomain: 'word-formation', level: 'B1', prompt: 'Complete the sentence: “The instructions were clear and ___.”', options: ['helpful', 'help', 'helpfully'] }),
  choice({
    id: 'review-vocabulary-05', skill: 'vocabulary', subdomain: 'near-synonyms', level: 'B1',
    title: 'Customer feedback', body: 'The update addressed the most frequent complaints.',
    prompt: 'Which word is closest in meaning to “addressed”?', options: ['mailed to', 'dealt with', 'ignored']
  }),
  choice({ id: 'review-vocabulary-06', skill: 'vocabulary', subdomain: 'register', level: 'B2', prompt: 'Choose the most suitable phrase for a formal report.', options: ['The results kind of went down.', 'The results totally fell off.', 'The results indicate a gradual decline.'] }),
  choice({
    id: 'review-vocabulary-07', skill: 'vocabulary', subdomain: 'precision', level: 'B2',
    title: 'Policy change', body: 'The committee accepted the proposal but added strict conditions before implementation.',
    prompt: 'Which verb best describes the committee’s decision?', options: ['approved', 'assumed', 'avoided']
  }),
] as const;

function take<T>(items: readonly T[], start: number, count: number): readonly T[] {
  return items.slice(start, start + count);
}

function interleave(groups: readonly (readonly DiagnosticPublicItem[])[]): readonly DiagnosticPublicItem[] {
  const result: DiagnosticPublicItem[] = [];
  const longest = Math.max(...groups.map(group => group.length));
  for (let index = 0; index < longest; index += 1) {
    for (const group of groups) if (group[index]) result.push(group[index]);
  }
  return result;
}

export const REVIEW_LOCATOR_ITEMS = interleave([
  take(reading, 0, 3), take(listening, 0, 3), take(discourse, 0, 3), take(grammar, 0, 3), take(vocabulary, 0, 3),
]);

export const REVIEW_PRECISION_ITEMS = interleave([
  take(reading, 3, 4), take(listening, 3, 4), take(discourse, 3, 4), take(grammar, 3, 4), take(vocabulary, 3, 4),
]);

export const REVIEW_PREVIEW_ITEMS = [...REVIEW_LOCATOR_ITEMS, ...REVIEW_PRECISION_ITEMS] as const;
