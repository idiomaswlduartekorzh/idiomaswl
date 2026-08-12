import { IELTS_MULTIPLE_CHOICE_PASSAGES } from './seo-catalog.ts';
import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type MultipleChoiceErrorCode =
  | 'stem-misread'
  | 'lexical-echo'
  | 'partial-truth'
  | 'scope-inflation'
  | 'wrong-relationship'
  | 'unsupported-claim';

export type MultipleChoiceDecision = {
  id: string;
  question: string;
  skill: string;
  evidence: string;
  answer: string;
  distractors: [string, string, string];
  explanation: string;
  trap: string;
  errorCode: MultipleChoiceErrorCode;
};

export type MultipleChoiceTrainingPassage = {
  id: string;
  title: string;
  paragraphs: Array<{ id: string; label: string; text: string }>;
  sourceUrl: string;
  sourceNote: string;
  decisions: MultipleChoiceDecision[];
};

export type MultipleChoiceLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const MULTIPLE_CHOICE_STORAGE_KEY = 'welearn:ielts-reading:multiple-choice:v2';
export const MULTIPLE_CHOICE_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:multiple-choice:v1';
export const MULTIPLE_CHOICE_GUIDED_PASSAGE_ID = 'mc-sleep-learning';
export const MULTIPLE_CHOICE_INDEPENDENT_PASSAGE_ID = 'mc-river-restoration';

const SOURCE_META: Record<string, { sourceUrl: string; sourceNote: string }> = {
  'mc-sleep-learning': {
    sourceUrl: 'https://www.nimh.nih.gov/health/publications/brain-basics-understanding-sleep',
    sourceNote: 'WeLearn training passage grounded in NIMH explanations of sleep, memory and learning. The source supports the topic; it does not certify these questions.',
  },
  'mc-river-restoration': {
    sourceUrl: 'https://www.epa.gov/green-infrastructure',
    sourceNote: 'WeLearn training passage grounded in public EPA guidance on green infrastructure and urban water. Millgate is a composite teaching example.',
  },
  'mc-digital-notes': {
    sourceUrl: 'https://doi.org/10.1177/0956797614524581',
    sourceNote: 'WeLearn training passage grounded in published research on note-taking and conceptual processing. Claims are simplified for guided practice.',
  },
};

const EVIDENCE: Record<string, string> = {
  'mc-sleep-01': 'Researchers now argue that sleep is an active state in which the brain reorganizes information gathered during the day.',
  'mc-sleep-02': 'The group that slept remembered more pairs the next morning, especially when their sleep included longer periods of slow-wave activity.',
  'mc-sleep-03': 'Students often stay awake late before an exam, believing that additional review will compensate for fatigue.',
  'mc-sleep-04': 'The practical lesson is more modest: learners should treat sleep as part of the learning process rather than as time stolen from it.',
  'mc-sleep-05': 'learners should treat sleep as part of the learning process rather than as time stolen from it',
  'mc-river-01': 'In recent years, some councils have begun to restore urban rivers, arguing that a visible waterway can improve public space as well as wildlife habitat.',
  'mc-river-02': 'The aim is often more practical: to soften hard banks, create shallow planted edges and give floodwater somewhere safer to spread during storms.',
  'mc-river-03': 'Yet the project also required regular maintenance.',
  'mc-river-04': 'the strongest schemes involve local firms early rather than treating them as obstacles',
  'mc-river-05': 'engineers, residents and businesses can share the same narrow strip of land',
  'mc-notes-01': 'These advantages are real, but they do not guarantee better learning.',
  'mc-notes-02': 'When students type quickly, they may copy a lecturer\'s words almost exactly.',
  'mc-notes-03': 'The tool matters less than the thinking it encourages.',
  'mc-notes-04': 'However, a searchable archive is not the same as revision.',
  'mc-notes-05': 'The most sensible approach is not to choose a permanent winner between paper and screens.',
};

function splitParagraphs(id: string, passage: string) {
  return passage.split(/\n\n+/).map((text, index) => ({ id: `${id}-p${index + 1}`, label: `Paragraph ${String.fromCharCode(65 + index)}`, text }));
}

function classifyLegacy(skill: string, trap: string): MultipleChoiceErrorCode {
  if (/vocabulary/i.test(skill)) return 'lexical-echo';
  if (/inference/i.test(skill) || /always|all|universal|only/i.test(trap)) return 'scope-inflation';
  if (/rhetorical/i.test(skill)) return 'wrong-relationship';
  if (/purpose|main idea/i.test(skill)) return 'partial-truth';
  if (/detail/i.test(skill)) return 'unsupported-claim';
  return 'wrong-relationship';
}

const legacyPassages: MultipleChoiceTrainingPassage[] = IELTS_MULTIPLE_CHOICE_PASSAGES.map((passage) => ({
  id: passage.id,
  title: passage.title,
  paragraphs: splitParagraphs(passage.id, passage.passage),
  ...SOURCE_META[passage.id],
  decisions: passage.questions.slice(0, 5).map((question) => ({
    id: question.id,
    question: question.question,
    skill: question.skill,
    evidence: EVIDENCE[question.id],
    answer: question.options[question.answer],
    distractors: question.options.filter((_, index) => index !== question.answer) as [string, string, string],
    explanation: question.explanation,
    trap: question.trap,
    errorCode: classifyLegacy(question.skill, question.trap),
  })),
}));

const HEADING_ERROR_MAP: Record<string, MultipleChoiceErrorCode> = {
  'detail-not-main-idea': 'partial-truth',
  'keyword-match': 'lexical-echo',
  'wrong-paragraph-function': 'wrong-relationship',
  'too-broad': 'scope-inflation',
  'unsupported-claim': 'unsupported-claim',
};

const STEMS = [
  'Which option best states the main purpose of this paragraph?',
  'Which option best captures the complete meaning of this paragraph?',
  'What does this paragraph mainly explain?',
  'Why does the writer include this paragraph?',
  'Which option best reflects the paragraph’s conclusion?',
];

function fromHeadingPassage(passage: MatchingHeadingsTrainingPassage): MultipleChoiceTrainingPassage {
  return {
    id: `mc-${passage.id}`,
    title: passage.title,
    sourceUrl: passage.sourceUrl,
    sourceNote: passage.sourceNote,
    paragraphs: passage.paragraphs.map(({ id, label, text }) => ({ id, label, text })),
    decisions: passage.paragraphs.map((paragraph, index) => {
      const answer = passage.headings.find((heading) => heading.id === paragraph.answerHeadingId)!.text;
      const closest = passage.headings.find((heading) => heading.id === paragraph.closestDistractorId)!.text;
      const remaining = passage.headings.map((heading) => heading.text).filter((text) => text !== answer && text !== closest).slice((index * 2) % 3, ((index * 2) % 3) + 2);
      const fillers = remaining.length === 2 ? remaining : passage.headings.map((heading) => heading.text).filter((text) => text !== answer && text !== closest).slice(0, 2);
      return {
        id: `mc-${paragraph.id}`,
        question: `${paragraph.label}: ${STEMS[index]}`,
        skill: index === 0 ? 'purpose' : index === 4 ? 'main idea' : index === 2 ? 'writer purpose' : 'one-best answer',
        evidence: paragraph.evidence,
        answer,
        distractors: [closest, fillers[0], fillers[1]],
        explanation: `${paragraph.functionLabel}. ${paragraph.evidence}`,
        trap: paragraph.distractorFailure,
        errorCode: index === 0 ? 'stem-misread' : HEADING_ERROR_MAP[paragraph.errorCode],
      };
    }),
  };
}

const heldBackPassages = MATCHING_HEADINGS_PASSAGES.slice(3).map(fromHeadingPassage);

export const MULTIPLE_CHOICE_PASSAGES: MultipleChoiceTrainingPassage[] = [...legacyPassages, ...heldBackPassages];

export const MULTIPLE_CHOICE_LEVELS: MultipleChoiceLevel[] = [
  { id: 'stem-control', title: 'Read the exact question', focus: 'Stem control', instruction: 'Name what the question asks before comparing options.', passageIds: heldBackPassages.map((passage) => passage.id), decisionIds: heldBackPassages.flatMap((passage) => passage.decisions.slice(0, 2).map((decision) => decision.id)).slice(0, 4), masteryScore: 3 },
  { id: 'closest-distractor', title: 'Defeat the closest distractor', focus: 'One-best answer', instruction: 'Compare scope, relationship and whole-paragraph coverage.', passageIds: heldBackPassages.map((passage) => passage.id), decisionIds: heldBackPassages.flatMap((passage) => passage.decisions.slice(1, 3).map((decision) => decision.id)).slice(0, 4), masteryScore: 3 },
  { id: 'notes-passage', title: 'Full set · Digital notes', focus: 'Mixed question skills', instruction: 'Complete all five questions before feedback opens.', passageIds: ['mc-digital-notes'], masteryScore: 4 },
  { id: 'citizen-passage', title: 'Full set · Citizen science', focus: 'Purpose and coverage', instruction: 'Reject options that repeat words but miss the paragraph’s job.', passageIds: ['mc-citizens-do-science'], masteryScore: 4 },
  { id: 'seed-passage', title: 'Full set · Seed collections', focus: 'Scope control', instruction: 'Choose the option supported by the complete paragraph.', passageIds: ['mc-keeping-seeds-useful'], masteryScore: 4 },
  { id: 'rail-passage', title: 'Transfer set · Night trains', focus: 'Unseen one-best answers', instruction: 'Submit the complete set using evidence, not option position.', passageIds: ['mc-night-trains-cross-borders'], masteryScore: 4 },
];

export function getMultipleChoicePassage(id: string) {
  return MULTIPLE_CHOICE_PASSAGES.find((passage) => passage.id === id);
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) { hash ^= value.charCodeAt(index); hash = Math.imul(hash, 16777619); }
  return hash >>> 0;
}

export function getMultipleChoiceOptions(decision: MultipleChoiceDecision, attemptSeed = 0) {
  const options = [decision.answer, ...decision.distractors];
  let state = hashString(`${decision.id}:${attemptSeed}`) || 1;
  for (let index = options.length - 1; index > 0; index -= 1) {
    state ^= state << 13; state ^= state >>> 17; state ^= state << 5;
    const target = (state >>> 0) % (index + 1);
    [options[index], options[target]] = [options[target], options[index]];
  }
  return options;
}
