import type {
  ChoiceChallenge,
  ErrorChallenge,
  GapChallenge,
  TenseQuestConfig,
  TimelineChallenge,
} from './tense-quest-types'
import { ENGLISH_PRESENT_SIMPLE_EDITORIAL } from './english-present-simple-editorial.ts'

export const ENGLISH_FORMS = [
  { id: 'present-simple', label: 'Present simple', group: 'Present' },
  { id: 'present-continuous', label: 'Present continuous', group: 'Present' },
  { id: 'present-perfect', label: 'Present perfect', group: 'Present' },
  { id: 'present-perfect-continuous', label: 'Present perfect continuous', group: 'Present' },
  { id: 'past-simple', label: 'Past simple', group: 'Past' },
  { id: 'past-continuous', label: 'Past continuous', group: 'Past' },
  { id: 'past-perfect', label: 'Past perfect', group: 'Past' },
  { id: 'past-perfect-continuous', label: 'Past perfect continuous', group: 'Past' },
  { id: 'future-will', label: 'Future with will', group: 'Future' },
  { id: 'future-going-to', label: 'Be going to', group: 'Future' },
  { id: 'future-continuous', label: 'Future continuous', group: 'Future' },
  { id: 'future-perfect', label: 'Future perfect', group: 'Future' },
  { id: 'future-perfect-continuous', label: 'Future perfect continuous', group: 'Future' },
  { id: 'conditional-zero', label: 'Zero conditional', group: 'Conditionals' },
  { id: 'conditional-first', label: 'First conditional', group: 'Conditionals' },
  { id: 'conditional-second', label: 'Second conditional', group: 'Conditionals' },
  { id: 'conditional-third', label: 'Third conditional', group: 'Conditionals' },
  { id: 'conditional-mixed', label: 'Mixed conditionals', group: 'Conditionals' },
  { id: 'imperative', label: 'Imperative', group: 'Instructions' },
] as const

export type EnglishFormId = (typeof ENGLISH_FORMS)[number]['id']

type Example = { context: string; answer: string; wrong: string; lemma: string; cue: string; accepted?: string[] }
type Seed = {
  id: EnglishFormId
  explanation: string
  distractors: [string, string, string]
  examples: [Example, Example, Example]
}

const SEEDS: Seed[] = [
  { id: 'present-simple', explanation: 'Use the present simple for routines, facts and fixed schedules.', distractors: ['is working', 'worked', 'will work'], examples: [
    { context: 'Every weekday Maya ___ at seven.', answer: 'starts', wrong: 'is starting', lemma: 'start', cue: 'routine' },
    { context: 'Water ___ at 100°C.', answer: 'boils', wrong: 'is boiling', lemma: 'boil', cue: 'general fact' },
    { context: 'The last train ___ at 11:30 tonight.', answer: 'leaves', wrong: 'will leave', lemma: 'leave', cue: 'fixed schedule' },
  ] },
  { id: 'present-continuous', explanation: 'Use the present continuous for actions happening now or temporary arrangements.', distractors: ['works', 'worked', 'has worked'], examples: [
    { context: 'Listen! The baby ___.', answer: 'is crying', wrong: 'cries', lemma: 'cry', cue: 'happening now' },
    { context: 'This month I ___ from my sister’s apartment.', answer: 'am working', wrong: 'work', lemma: 'work', cue: 'temporary situation' },
    { context: 'We ___ the client at three tomorrow.', answer: 'are meeting', wrong: 'meet', lemma: 'meet', cue: 'personal arrangement' },
  ] },
  { id: 'present-perfect', explanation: 'Use the present perfect for experience, recent results and unfinished time.', distractors: ['finished', 'is finishing', 'had finished'], examples: [
    { context: 'I ___ that museum three times.', answer: 'have visited', wrong: 'visited', lemma: 'visit', cue: 'life experience' },
    { context: 'Nora ___ the report, so you can read it now.', answer: 'has finished', wrong: 'finished', lemma: 'finish', cue: 'present result' },
    { context: 'We ___ any complaints this week.', answer: 'have not received', wrong: 'did not receive', lemma: 'receive', cue: 'unfinished time period' },
  ] },
  { id: 'present-perfect-continuous', explanation: 'Use this form for an activity continuing until now or explaining a present result.', distractors: ['worked', 'have worked', 'am working'], examples: [
    { context: 'I ___ on this design since nine o’clock.', answer: 'have been working', wrong: 'am working', lemma: 'work', cue: 'duration until now' },
    { context: 'Her eyes are tired because she ___.', answer: 'has been reading', wrong: 'has read', lemma: 'read', cue: 'present evidence' },
    { context: 'They ___ for the bus for forty minutes.', answer: 'have been waiting', wrong: 'wait', lemma: 'wait', cue: 'continuing activity' },
  ] },
  { id: 'past-simple', explanation: 'Use the past simple for a completed event at a finished past time.', distractors: ['has called', 'was calling', 'had called'], examples: [
    { context: 'Leo ___ me yesterday afternoon.', answer: 'called', wrong: 'has called', lemma: 'call', cue: 'finished time: yesterday' },
    { context: 'We ___ the keys two hours ago.', answer: 'found', wrong: 'have found', lemma: 'find', cue: 'finished time: ago' },
    { context: 'The store ___ early last Friday.', answer: 'closed', wrong: 'has closed', lemma: 'close', cue: 'finished time: last Friday' },
  ] },
  { id: 'past-continuous', explanation: 'Use the past continuous for an action in progress around a past moment.', distractors: ['cooked', 'has cooked', 'had cooked'], examples: [
    { context: 'At eight last night, I ___.', answer: 'was cooking', wrong: 'cooked', lemma: 'cook', cue: 'action in progress at eight' },
    { context: 'They ___ when the lights went out.', answer: 'were dancing', wrong: 'danced', lemma: 'dance', cue: 'interrupted background' },
    { context: 'While Sam was driving, Mia ___ the map.', answer: 'was checking', wrong: 'checked', lemma: 'check', cue: 'parallel past action' },
  ] },
  { id: 'past-perfect', explanation: 'Use the past perfect for an event completed before another past event.', distractors: ['left', 'has left', 'was leaving'], examples: [
    { context: 'By the time I arrived, the guests ___.', answer: 'had left', wrong: 'left', lemma: 'leave', cue: 'earlier past event' },
    { context: 'She recognized the song because she ___ it before.', answer: 'had heard', wrong: 'heard', lemma: 'hear', cue: 'experience before a past moment' },
    { context: 'After we ___ the door, we noticed the key inside.', answer: 'had locked', wrong: 'locked', lemma: 'lock', cue: 'completed before noticing' },
  ] },
  { id: 'past-perfect-continuous', explanation: 'Use this form for duration or repeated activity continuing up to a past point.', distractors: ['waited', 'were waiting', 'have been waiting'], examples: [
    { context: 'They ___ for an hour when the doctor arrived.', answer: 'had been waiting', wrong: 'were waiting', lemma: 'wait', cue: 'duration before a past event' },
    { context: 'The road was wet because it ___.', answer: 'had been raining', wrong: 'was raining', lemma: 'rain', cue: 'earlier cause and evidence' },
    { context: 'I ___ there for years before I changed jobs.', answer: 'had been working', wrong: 'worked', lemma: 'work', cue: 'activity up to a past change' },
  ] },
  { id: 'future-will', explanation: 'Use will for predictions, spontaneous decisions and promises.', distractors: ['am going to help', 'help', 'am helping'], examples: [
    { context: 'I think the plan ___.', answer: 'will work', wrong: 'works', lemma: 'work', cue: 'prediction' },
    { context: 'The phone is ringing — I ___ it.', answer: 'will answer', wrong: 'am answering', lemma: 'answer', cue: 'decision made now' },
    { context: 'Do not worry; I ___ your secret.', answer: 'will keep', wrong: 'keep', lemma: 'keep', cue: 'promise' },
  ] },
  { id: 'future-going-to', explanation: 'Use be going to for prior intentions and predictions based on present evidence.', distractors: ['will paint', 'paint', 'am painting'], examples: [
    { context: 'We bought the supplies because we ___ the kitchen.', answer: 'are going to paint', wrong: 'will paint', lemma: 'paint', cue: 'prior plan' },
    { context: 'Look at those clouds. It ___.', answer: 'is going to rain', wrong: 'will rain', lemma: 'rain', cue: 'present evidence' },
    { context: 'Mila has decided she ___ medicine.', answer: 'is going to study', wrong: 'studies', lemma: 'study', cue: 'declared intention' },
  ] },
  { id: 'future-continuous', explanation: 'Use the future continuous for an action in progress at a stated future time.', distractors: ['will travel', 'travel', 'will have traveled'], examples: [
    { context: 'This time tomorrow, we ___ across the desert.', answer: 'will be traveling', wrong: 'will travel', lemma: 'travel', cue: 'in progress tomorrow' },
    { context: 'At ten tonight, she ___ her presentation.', answer: 'will be giving', wrong: 'will give', lemma: 'give', cue: 'in progress at ten' },
    { context: 'Do not call at noon; I ___.', answer: 'will be driving', wrong: 'will drive', lemma: 'drive', cue: 'activity around a future time' },
  ] },
  { id: 'future-perfect', explanation: 'Use the future perfect for an action completed before a future deadline.', distractors: ['will finish', 'finish', 'have finished'], examples: [
    { context: 'By Friday, we ___ the migration.', answer: 'will have finished', wrong: 'will finish', lemma: 'finish', cue: 'completed by Friday' },
    { context: 'By the time you arrive, I ___ dinner.', answer: 'will have made', wrong: 'will make', lemma: 'make', cue: 'completed before arrival' },
    { context: 'At the end of this year, she ___ all twelve units.', answer: 'will have completed', wrong: 'will complete', lemma: 'complete', cue: 'completed by year end' },
  ] },
  { id: 'future-perfect-continuous', explanation: 'Use this form to measure duration up to a future point.', distractors: ['will work', 'will have worked', 'has been working'], examples: [
    { context: 'In June, I ___ here for ten years.', answer: 'will have been working', wrong: 'will have worked', lemma: 'work', cue: 'duration up to June' },
    { context: 'By noon, they ___ for six hours.', answer: 'will have been hiking', wrong: 'will be hiking', lemma: 'hike', cue: 'duration up to noon' },
    { context: 'Next month, she ___ the course for a full year.', answer: 'will have been teaching', wrong: 'will teach', lemma: 'teach', cue: 'duration up to next month' },
  ] },
  { id: 'conditional-zero', explanation: 'Use the zero conditional for general results: present simple in both clauses.', distractors: ['will melt', 'would melt', 'melted'], examples: [
    { context: 'If you heat ice, it ___.', answer: 'melts', wrong: 'will melt', lemma: 'melt', cue: 'general result' },
    { context: 'Plants die if they ___ enough water.', answer: 'do not get', wrong: 'will not get', lemma: 'get', cue: 'general condition' },
    { context: 'When the alarm rings, the doors ___.', answer: 'unlock', wrong: 'will unlock', lemma: 'unlock', cue: 'automatic result' },
  ] },
  { id: 'conditional-first', explanation: 'Use the first conditional for a real future possibility: if + present, will + base.', distractors: ['stay', 'would stay', 'stayed'], examples: [
    { context: 'If it rains tomorrow, we ___ home.', answer: 'will stay', wrong: 'would stay', lemma: 'stay', cue: 'real future possibility' },
    { context: 'You will miss the bus if you ___ now.', answer: 'do not leave', wrong: 'will not leave', lemma: 'leave', cue: 'possible future condition' },
    { context: 'If Ana finishes early, she ___ us.', answer: 'will join', wrong: 'joins', lemma: 'join', cue: 'possible future result' },
  ] },
  { id: 'conditional-second', explanation: 'Use the second conditional for an unreal or unlikely present/future situation.', distractors: ['will travel', 'traveled', 'would have traveled'], examples: [
    { context: 'If I had more vacation time, I ___ more.', answer: 'would travel', wrong: 'will travel', lemma: 'travel', cue: 'unreal present result' },
    { context: 'She would apply if the position ___ remote.', answer: 'were', wrong: 'is', lemma: 'be', cue: 'hypothetical condition' },
    { context: 'If we lived closer, we ___ you every week.', answer: 'would visit', wrong: 'will visit', lemma: 'visit', cue: 'unlikely present situation' },
  ] },
  { id: 'conditional-third', explanation: 'Use the third conditional for an unreal past: if + past perfect, would have + participle.', distractors: ['would know', 'will have known', 'knew'], examples: [
    { context: 'If you had called, I ___ about the delay.', answer: 'would have known', wrong: 'would know', lemma: 'know', cue: 'unreal past result' },
    { context: 'They would have arrived earlier if they ___ the express train.', answer: 'had taken', wrong: 'took', lemma: 'take', cue: 'unreal past condition' },
    { context: 'If we had checked the map, we ___ lost.', answer: 'would not have gotten', wrong: 'would not get', lemma: 'get', cue: 'alternative past result' },
  ] },
  { id: 'conditional-mixed', explanation: 'Mixed conditionals connect a past condition to a present result or the reverse.', distractors: ['would be', 'will be', 'would have been'], examples: [
    { context: 'If I had accepted that job, I ___ in Tokyo now.', answer: 'would be', wrong: 'would have been', lemma: 'be', cue: 'past condition, present result' },
    { context: 'If she were more organized, she ___ the deadline yesterday.', answer: 'would have met', wrong: 'would meet', lemma: 'meet', cue: 'present condition, past result' },
    { context: 'If they had trained regularly, they ___ fitter today.', answer: 'would feel', wrong: 'would have felt', lemma: 'feel', cue: 'past condition, present result' },
  ] },
  { id: 'imperative', explanation: 'Use the base form for direct instructions; add do not for a negative command.', distractors: ['turns', 'to turn', 'will turn'], examples: [
    { context: '___ left at the next corner.', answer: 'Turn', wrong: 'Turns', lemma: 'turn', cue: 'direct instruction' },
    { context: '___ that wire with wet hands.', answer: 'Do not touch', wrong: 'Not touch', lemma: 'touch', cue: 'negative command' },
    { context: 'Please ___ patient while the file loads.', answer: 'be', wrong: 'are', lemma: 'be', cue: 'polite instruction' },
  ] },
]

const NEGATIVE_CONTRACTIONS: [RegExp, string][] = [
  [/\bdo not\b/i, "don't"],
  [/\bdoes not\b/i, "doesn't"],
  [/\bdid not\b/i, "didn't"],
  [/\bis not\b/i, "isn't"],
  [/\bare not\b/i, "aren't"],
  [/\bwas not\b/i, "wasn't"],
  [/\bwere not\b/i, "weren't"],
  [/\bhas not\b/i, "hasn't"],
  [/\bhave not\b/i, "haven't"],
  [/\bhad not\b/i, "hadn't"],
  [/\bwill not\b/i, "won't"],
  [/\bwould not\b/i, "wouldn't"],
]

function acceptedAnswers(example: Example) {
  const answers = [example.answer, ...(example.accepted ?? [])]
  for (const [pattern, replacement] of NEGATIVE_CONTRACTIONS) {
    if (pattern.test(example.answer)) answers.push(example.answer.replace(pattern, replacement))
  }
  return [...new Set(answers)]
}

function split(context: string) {
  const parts = context.split('___')
  return [parts[0], parts[1]] as const
}

const CHOICE_DISTRACTORS: Record<string, [string, string, string]> = {
  'present-simple-1': ['is starting', 'started', 'will start'],
  'present-simple-2': ['is boiling', 'boiled', 'will boil'],
  'present-simple-3': ['is leaving', 'left', 'will leave'],
  'present-continuous-1': ['cries', 'cried', 'has cried'],
  'present-continuous-2': ['work', 'worked', 'have worked'],
  'present-continuous-3': ['meet', 'met', 'have met'],
  'present-perfect-1': ['visited', 'am visiting', 'had visited'],
  'present-perfect-2': ['finished', 'is finishing', 'had finished'],
  'present-perfect-3': ['did not receive', 'are not receiving', 'had not received'],
  'present-perfect-continuous-1': ['am working', 'worked', 'have worked'],
  'present-perfect-continuous-2': ['has read', 'was reading', 'reads'],
  'present-perfect-continuous-3': ['wait', 'are waiting', 'have waited'],
  'past-simple-1': ['has called', 'was calling', 'had called'],
  'past-simple-2': ['have found', 'were finding', 'had found'],
  'past-simple-3': ['has closed', 'was closing', 'had closed'],
  'past-continuous-1': ['cooked', 'have cooked', 'had cooked'],
  'past-continuous-2': ['danced', 'have danced', 'had danced'],
  'past-continuous-3': ['checked', 'has checked', 'had checked'],
  'past-perfect-1': ['left', 'has left', 'was leaving'],
  'past-perfect-2': ['heard', 'has heard', 'was hearing'],
  'past-perfect-3': ['locked', 'have locked', 'were locking'],
  'past-perfect-continuous-1': ['were waiting', 'waited', 'have been waiting'],
  'past-perfect-continuous-2': ['was raining', 'rained', 'has been raining'],
  'past-perfect-continuous-3': ['worked', 'were working', 'have worked'],
  'future-will-1': ['works', 'is working', 'is going to work'],
  'future-will-2': ['answer', 'am answering', 'have answered'],
  'future-will-3': ['keep', 'am keeping', 'have kept'],
  'future-going-to-1': ['will paint', 'paint', 'have painted'],
  'future-going-to-2': ['will rain', 'rains', 'is raining'],
  'future-going-to-3': ['studies', 'will study', 'has studied'],
  'future-continuous-1': ['will travel', 'travel', 'will have traveled'],
  'future-continuous-2': ['will give', 'gives', 'will have given'],
  'future-continuous-3': ['will drive', 'drive', 'will have driven'],
  'future-perfect-1': ['will finish', 'finish', 'have finished'],
  'future-perfect-2': ['will make', 'make', 'will be making'],
  'future-perfect-3': ['will complete', 'complete', 'will be completing'],
  'future-perfect-continuous-1': ['will have worked', 'will be working', 'has been working'],
  'future-perfect-continuous-2': ['will be hiking', 'will have hiked', 'have been hiking'],
  'future-perfect-continuous-3': ['will teach', 'will have taught', 'will be teaching'],
  'conditional-zero-1': ['will melt', 'would melt', 'melted'],
  'conditional-zero-2': ['will not get', 'did not get', 'would not get'],
  'conditional-zero-3': ['will unlock', 'would unlock', 'unlocked'],
  'conditional-first-1': ['would stay', 'stay', 'stayed'],
  'conditional-first-2': ['will not leave', 'did not leave', 'would not leave'],
  'conditional-first-3': ['joins', 'would join', 'joined'],
  'conditional-second-1': ['will travel', 'traveled', 'would have traveled'],
  'conditional-second-2': ['is', 'will be', 'had been'],
  'conditional-second-3': ['will visit', 'visited', 'would have visited'],
  'conditional-third-1': ['would know', 'will have known', 'knew'],
  'conditional-third-2': ['took', 'would take', 'have taken'],
  'conditional-third-3': ['would not get', 'did not get', 'will not get'],
  'conditional-mixed-1': ['would have been', 'will be', 'is'],
  'conditional-mixed-2': ['would meet', 'will have met', 'had met'],
  'conditional-mixed-3': ['would have felt', 'will feel', 'felt'],
  'imperative-1': ['Turns', 'To turn', 'Will turn'],
  'imperative-2': ['Not touch', 'Do not touched', 'Not to touch'],
  'imperative-3': ['are', 'to be', 'will be'],
}

function rotate<T>(items: readonly T[], offset: number): T[] {
  if (!items.length) return []
  const start = ((offset % items.length) + items.length) % items.length
  return [...items.slice(start), ...items.slice(0, start)]
}

function options(seed: Seed, example: Example, index: number, seedIndex: number) {
  const distractors = CHOICE_DISTRACTORS[`${seed.id}-${index + 1}`]
  const result = [...distractors]
  result.splice((seedIndex * seed.examples.length + index) % 4, 0, example.answer)
  return result
}

const CHOICES: ChoiceChallenge<EnglishFormId>[] = SEEDS.flatMap((seed, seedIndex) => seed.examples.map((example, index) => ({
  id: `en-choice-${seed.id}-${index + 1}`,
  tenses: [seed.id],
  focus: ENGLISH_FORMS.find((form) => form.id === seed.id)?.label ?? seed.id,
  prompt: `Choose the form for this ${example.cue}.`,
  context: example.context,
  options: options(seed, example, index, seedIndex),
  answer: example.answer,
  explanation: seed.explanation,
})))

const MICROS: GapChallenge<EnglishFormId>[] = SEEDS.flatMap((seed) => seed.examples.map((example, index) => ({
  id: `en-micro-${seed.id}-${index + 1}`,
  title: `${ENGLISH_FORMS.find((form) => form.id === seed.id)?.label} · ${index + 1}`,
  focus: example.cue,
  instruction: 'Write the complete verb form.',
  segments: [...split(example.context)],
  gaps: [{ id: `en-micro-gap-${seed.id}-${index + 1}`, tense: seed.id, verb: example.lemma, answers: acceptedAnswers(example) }],
  explanation: seed.explanation,
})))

const STORIES: GapChallenge<EnglishFormId>[] = SEEDS.flatMap((seed) => [0, 1].map((variant) => {
  const examples = variant === 0 ? seed.examples : [seed.examples[1], seed.examples[2], seed.examples[0]]
  const parts = examples.map((example) => split(example.context))
  return {
    id: `en-story-${seed.id}-${variant + 1}`,
    title: `${ENGLISH_FORMS.find((form) => form.id === seed.id)?.label} in context · ${variant + 1}`,
    focus: 'Three cumulative scenarios',
    instruction: 'Retrieve the same target form in three scenarios, now without options.',
    segments: [parts[0][0], `${parts[0][1]} ${parts[1][0]}`, `${parts[1][1]} ${parts[2][0]}`, parts[2][1]],
    gaps: examples.map((example, index) => ({ id: `en-story-gap-${seed.id}-${variant + 1}-${index + 1}`, tense: seed.id, verb: example.lemma, answers: acceptedAnswers(example) })),
    explanation: seed.explanation,
  }
}))

function errorChallenge(seed: Seed, wrongIndex: number): ErrorChallenge<EnglishFormId> {
  const parts = seed.examples.map((example) => split(example.context))
  return {
    id: `en-error-${seed.id}-${wrongIndex + 1}`,
    tense: seed.id,
    title: `${ENGLISH_FORMS.find((form) => form.id === seed.id)?.label} repair ${wrongIndex + 1}`,
    focus: seed.examples[wrongIndex].cue,
    instruction: 'Select the verb that breaks the time logic, then rewrite it correctly.',
    chunks: seed.examples.map((example, index) => ({
      before: index === 0 ? parts[index][0] : `${parts[index - 1][1]} ${parts[index][0]}`,
      id: `en-error-token-${seed.id}-${wrongIndex + 1}-${index + 1}`,
      form: index === wrongIndex ? example.wrong : example.answer,
    })),
    after: parts[2][1],
    wrongId: `en-error-token-${seed.id}-${wrongIndex + 1}-${wrongIndex + 1}`,
    answers: acceptedAnswers(seed.examples[wrongIndex]),
    explanation: seed.explanation,
  }
}

const ERRORS = SEEDS.flatMap((seed, seedIndex) => [
  errorChallenge(seed, seedIndex % seed.examples.length),
  errorChallenge(seed, (seedIndex + 1) % seed.examples.length),
])

const TIMELINES: TimelineChallenge<EnglishFormId>[] = SEEDS.map((seed, seedIndex) => ({
  id: `en-timeline-${seed.id}`,
  title: `${ENGLISH_FORMS.find((form) => form.id === seed.id)?.label} map`,
  focus: 'Context clues',
  context: 'Match each complete sentence to the clue that makes this form necessary.',
  slots: seed.examples.map((example, index) => ({
    id: `en-timeline-slot-${seed.id}-${index + 1}`,
    tense: seed.id,
    label: example.context.replace('___', example.answer),
    hint: `${example.lemma} · ${ENGLISH_FORMS.find((form) => form.id === seed.id)?.label ?? seed.id}`,
    answer: example.cue,
  })),
  options: rotate([...new Set(seed.examples.map((example) => example.cue))], seedIndex),
  explanation: seed.explanation,
}))

const FINAL_ROWS: { formId: EnglishFormId; lemma: string; before: string; after: string; answer: string }[] = [
  { formId: 'present-simple', lemma: 'lead', before: 'Every Monday Lena ', after: ' a language workshop. ', answer: 'leads' },
  { formId: 'present-continuous', lemma: 'check', before: 'Right now she ', after: ' the microphones. ', answer: 'is checking' },
  { formId: 'present-perfect', lemma: 'organize', before: 'She ', after: ' dozens of sessions so far and ', answer: 'has organized' },
  { formId: 'present-perfect-continuous', lemma: 'prepare', before: '', after: ' this one since June. ', answer: 'has been preparing' },
  { formId: 'past-simple', lemma: 'launch', before: 'Last year she ', after: ' the first edition. ', answer: 'launched' },
  { formId: 'past-continuous', lemma: 'explain', before: 'At nine yesterday she ', after: ' the schedule when the lights failed. ', answer: 'was explaining' },
  { formId: 'past-perfect', lemma: 'test', before: 'Fortunately, the team ', after: ' the backup system before the guests arrived and ', answer: 'had tested' },
  { formId: 'past-perfect-continuous', lemma: 'work', before: '', after: ' on it for weeks. ', answer: 'had been working' },
  { formId: 'future-will', lemma: 'welcome', before: 'Tomorrow Lena ', after: ' a new group. ', answer: 'will welcome' },
  { formId: 'future-going-to', lemma: 'demonstrate', before: 'She ', after: ' a pronunciation app because the tablets are ready. ', answer: 'is going to demonstrate' },
  { formId: 'future-continuous', lemma: 'answer', before: 'This time tomorrow, she ', after: ' questions live. ', answer: 'will be answering' },
  { formId: 'future-perfect', lemma: 'upload', before: 'By Friday, the team ', after: ' every recording, and by next month Lena ', answer: 'will have uploaded' },
  { formId: 'future-perfect-continuous', lemma: 'teach', before: '', after: ' the course for a full year. ', answer: 'will have been teaching' },
  { formId: 'conditional-zero', lemma: 'light up', before: 'If students press the blue key, the screen ', after: '. ', answer: 'lights up' },
  { formId: 'conditional-first', lemma: 'use', before: 'If the network fails, the group ', after: ' printed cards. ', answer: 'will use' },
  { formId: 'conditional-second', lemma: 'invite', before: 'If the room were larger, Lena ', after: ' more people. ', answer: 'would invite' },
  { formId: 'conditional-third', lemma: 'book', before: 'If she had known about the demand, she ', after: ' the auditorium. ', answer: 'would have booked' },
  { formId: 'conditional-mixed', lemma: 'have', before: 'If the school had invested earlier, it ', after: ' better equipment now. ', answer: 'would have' },
  { formId: 'imperative', lemma: 'take', before: 'Before you begin, please ', after: ' a seat and silence your phone.', answer: 'take' },
]

const LEGACY_FINAL_ROWS = FINAL_ROWS.filter((row) => row.formId !== 'present-simple')
const legacyFinalAnswers = LEGACY_FINAL_ROWS.map((row, index) => ({ id: `en-final-card-${index + 1}`, text: row.answer }))

export const ENGLISH_TENSE_QUEST: TenseQuestConfig<EnglishFormId> = {
  id: 'english-tense-quest',
  storageKey: 'wl-english-tense-quest-v3',
  forms: ENGLISH_FORMS,
  presets: [
    { label: 'Present', ids: ENGLISH_FORMS.filter((form) => form.group === 'Present').map((form) => form.id) },
    { label: 'Past', ids: ENGLISH_FORMS.filter((form) => form.group === 'Past').map((form) => form.id) },
    { label: 'Future', ids: ENGLISH_FORMS.filter((form) => form.group === 'Future').map((form) => form.id) },
    { label: 'Conditionals', ids: ENGLISH_FORMS.filter((form) => form.group === 'Conditionals').map((form) => form.id) },
  ],
  levels: [
    { number: '01', title: 'Quick choice', short: 'Multiple choice', description: 'Recognize the form that fits each context.' },
    { number: '02', title: 'Micro stories', short: 'Short production', description: 'Write the complete verb form from a precise clue.' },
    { number: '03', title: 'Cumulative retrieval', short: 'Three scenarios', description: 'Retrieve three previously practiced cases without options.' },
    { number: '04', title: 'Error lab', short: 'Detect and repair', description: 'Find the form that breaks the logic and correct it.' },
    { number: '05', title: 'Aspect map', short: 'Match functions', description: 'Match complete clauses to their temporal function.' },
    { number: '06', title: 'The workshop file', short: 'Final reconstruction', description: 'Rebuild a complete timeline from a closed word bank.' },
  ],
  choiceChallenges: [...CHOICES.filter((item) => !item.tenses.includes('present-simple')), ...ENGLISH_PRESENT_SIMPLE_EDITORIAL.choices],
  microStories: [...MICROS.filter((item) => !item.gaps.some((gap) => gap.tense === 'present-simple')), ...ENGLISH_PRESENT_SIMPLE_EDITORIAL.micro],
  longStories: [...STORIES.filter((item) => !item.gaps.some((gap) => gap.tense === 'present-simple')), ...ENGLISH_PRESENT_SIMPLE_EDITORIAL.long],
  errorChallenges: [...ERRORS.filter((item) => item.tense !== 'present-simple'), ...ENGLISH_PRESENT_SIMPLE_EDITORIAL.errors],
  timelineChallenges: [...TIMELINES.filter((item) => !item.slots.some((slot) => slot.tense === 'present-simple')), ...ENGLISH_PRESENT_SIMPLE_EDITORIAL.timelines],
  finalChallenges: [{
    id: 'en-final-workshop',
    title: 'The language workshop',
    instruction: 'Select a gap and then its card. Every card is used once.',
    segments: [LEGACY_FINAL_ROWS[0].before, ...LEGACY_FINAL_ROWS.map((row, index) => `${row.after}${LEGACY_FINAL_ROWS[index + 1]?.before ?? ''}`)],
    gaps: LEGACY_FINAL_ROWS.map((row, index) => ({ id: `en-final-gap-${index + 1}`, tenseId: row.formId, tense: ENGLISH_FORMS.find((form) => form.id === row.formId)?.label ?? row.formId, answerCardId: `en-final-card-${index + 1}` })),
    cards: [...legacyFinalAnswers.slice(7), ...legacyFinalAnswers.slice(0, 7)],
    explanation: 'The file moves from current routines through past background and future plans, then closes with conditional alternatives and an instruction.',
  }, {
    id: 'en-final-present-simple-editorial',
    title: 'Present simple field file',
    instruction: 'Open each independent scene and choose its verb form from four plausible candidates.',
    segments: new Array(ENGLISH_PRESENT_SIMPLE_EDITORIAL.finalGaps.length + 1).fill(''),
    gaps: ENGLISH_PRESENT_SIMPLE_EDITORIAL.finalGaps,
    cards: ENGLISH_PRESENT_SIMPLE_EDITORIAL.finalCards,
    explanation: 'Each scene independently tests a routine, fact, process or schedule; no answer depends on another gap.',
  }],
  copy: {
    languageName: 'Inglés', languageCode: 'en', eyebrow: 'Tense & structure quiz · A2–B2',
    title: 'The aspect control room',
    lead: 'Choose the forms you want to practice. Each level adapts to your selection and keeps every correction hidden until the end.',
    range: '19 forms', selectedLabel: 'formas seleccionadas', selectorTitle: '¿Qué formas quieres practicar?',
    selectorLead: 'Combina tiempos, aspectos y condicionales. Solo aparecerán huecos para las formas elegidas.',
    configuredEyebrow: 'Custom practice route', levelsTitle: 'Six levels, no answers between questions',
    levelsLead: 'Complete the active level first. Your score, corrections and explanations appear only when you finish it.',
    mapLabels: ['Earlier', 'Past', 'Now', 'Future'],
    reviewLinks: [
      { href: '/practica/ingles/a2/gramatica', label: 'Repasar gramática A2' },
      { href: '/practica/ingles/b1/gramatica', label: 'Profundizar en B1' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  },
}
