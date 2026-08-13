import {
  IELTS_FLOW_CHART_COMPLETION_PASSAGES,
  type FlowChartCompletionPassage,
} from './seo-catalog.ts';
import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type FlowChartErrorCode =
  | 'sequence-skip'
  | 'wrong-stage'
  | 'connector-misread'
  | 'grammar-mismatch'
  | 'over-limit'
  | 'copied-context';

export type FlowChartStageType = 'input' | 'action' | 'condition' | 'result' | 'output';

export type FlowChartDecision = {
  id: string;
  label: string;
  stageType: FlowChartStageType;
  before: string;
  after: string;
  answer: string;
  alternatives: string[];
  instruction: string;
  maxWords: number;
  evidenceQuote: string;
  explanation: string;
  hint: string;
  trap: string;
  errorCode: FlowChartErrorCode;
};

export type FlowChartTrainingPassage = {
  id: string;
  title: string;
  passage: string;
  flowTitle: string;
  instruction: string;
  maxWords: number;
  sourceUrl: string;
  sourceNote: string;
  decisions: FlowChartDecision[];
};

export type FlowChartLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const FLOW_CHART_STORAGE_KEY = 'welearn:ielts-reading:flow-chart-completion:v1';
export const FLOW_CHART_GUIDED_PASSAGE_ID = 'flow-recycling-textiles';
export const FLOW_CHART_INDEPENDENT_PASSAGE_ID = 'flow-community-pottery';
export const FLOW_CHART_OFFICIAL_FORMAT_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

const ERROR_ROTATION: FlowChartErrorCode[] = [
  'sequence-skip',
  'wrong-stage',
  'connector-misread',
  'grammar-mismatch',
  'over-limit',
  'copied-context',
];

const STAGE_ROTATION: FlowChartStageType[] = ['input', 'action', 'condition', 'result', 'output'];

const SOURCE_BOUNDARIES: Record<string, { url: string; note: string }> = {
  'flow-recycling-textiles': {
    url: 'https://op.europa.eu/en/publication-detail/-/publication/739a1cca-6145-11ec-9c6c-01aa75ed71a1',
    note: 'WeLearn is authorized to publish this guided-practice passage. The European Commission study is candidate context for textile sorting and recycling technologies; it does not verify every simplified process detail or license the WeLearn wording.',
  },
  'flow-community-pottery': {
    url: 'https://www.bates.edu/news/2023/11/29/qa-on-the-job-with-alex-provasnik-25-chemistry-in-the-bates-ceramic-studio/',
    note: 'WeLearn is authorized to publish this guided-practice passage. The university studio account supports selected reclaiming, plaster-drying and wedging steps, not the complete composite workflow or third-party rights.',
  },
  'flow-noise-mapping': {
    url: 'https://www.gov.uk/government/publications/method-implementation-document-mid-for-bs-4142/method-implementation-document-mid-for-bs-4142',
    note: 'WeLearn is authorized to publish this guided-practice passage. The government method supports representative locations, sound-level meters and weather controls; it does not certify this complete planning scenario.',
  },
};

export function normalizeFlowChartAnswer(value: string) {
  return value.normalize('NFKC').trim().toLocaleLowerCase('en').replace(/[.,;:!?]+$/gu, '').replace(/\s+/gu, ' ');
}

export function countFlowChartWords(value: string) {
  const clean = normalizeFlowChartAnswer(value);
  return clean ? clean.split(' ').length : 0;
}

export function isFlowChartCorrect(decision: FlowChartDecision, value: string) {
  if (countFlowChartWords(value) > decision.maxWords) return false;
  const accepted = [decision.answer, ...decision.alternatives].map(normalizeFlowChartAnswer);
  return accepted.includes(normalizeFlowChartAnswer(value));
}

function paragraphContaining(passage: string, answer: string) {
  const normalizedAnswer = normalizeFlowChartAnswer(answer);
  const paragraph = passage
    .split(/\n\s*\n/u)
    .find((part) => normalizeFlowChartAnswer(part).includes(normalizedAnswer));
  if (!paragraph) throw new Error(`Missing literal Flow-chart evidence for ${answer}`);
  return paragraph;
}

function fromLegacy(source: FlowChartCompletionPassage): FlowChartTrainingPassage {
  const boundary = SOURCE_BOUNDARIES[source.id];
  if (!boundary) throw new Error(`Missing Flow-chart source boundary for ${source.id}`);
  return {
    id: source.id,
    title: source.title,
    passage: source.passage,
    flowTitle: source.flowTitle,
    instruction: source.wordLimit,
    maxWords: source.maxWords,
    sourceUrl: boundary.url,
    sourceNote: boundary.note,
    decisions: source.steps.map((step, index) => ({
      id: step.id,
      label: step.label,
      stageType: STAGE_ROTATION[index % STAGE_ROTATION.length],
      before: step.before,
      after: step.after,
      answer: step.answer,
      alternatives: step.alternatives ?? [],
      instruction: source.wordLimit,
      maxWords: source.maxWords,
      evidenceQuote: paragraphContaining(source.passage, step.answer),
      explanation: step.explanation,
      hint: step.hint,
      trap: `Read the previous and next boxes together. A true phrase from another process stage cannot complete ${step.label.toLowerCase()}.`,
      errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
    })),
  };
}

type DerivedDecision = Pick<FlowChartDecision, 'id' | 'label' | 'stageType' | 'before' | 'after' | 'answer' | 'explanation'>;

const DERIVED_DECISIONS: Record<string, DerivedDecision[]> = {
  'keeping-seeds-useful': [
    { id: 'flow-seeds-01', label: 'Purpose', stageType: 'input', before: 'Protect genetic diversity for future research and crop ', after: '.', answer: 'improvement', explanation: 'The opening paragraph connects preserved diversity with future research and crop improvement.' },
    { id: 'flow-seeds-02', label: 'Documentation', stageType: 'action', before: 'Record sample identity, origin and observed ', after: '.', answer: 'characteristics', explanation: 'The record paragraph identifies observed characteristics as essential information.' },
    { id: 'flow-seeds-03', label: 'Storage', stageType: 'condition', before: 'Control moisture and ', after: ', then inspect and test samples.', answer: 'temperature', explanation: 'The storage paragraph pairs moisture and temperature as controlled conditions.' },
    { id: 'flow-seeds-04', label: 'Regeneration', stageType: 'result', before: 'If viability falls, grow stock and collect a fresh generation of ', after: '.', answer: 'seed', explanation: 'Low viability triggers controlled growing and collection of fresh seed.' },
    { id: 'flow-seeds-05', label: 'Access', stageType: 'output', before: 'Use clear catalogues and responsible ', after: ' so researchers can request material.', answer: 'distribution', explanation: 'The final paragraph pairs clear catalogues with responsible distribution.' },
  ],
  'citizens-do-science': [
    { id: 'flow-citizen-01', label: 'Scale', stageType: 'input', before: 'Divide a large research task among many ', after: '.', answer: 'volunteers', explanation: 'The first paragraph explains how distributed volunteer work creates scale.' },
    { id: 'flow-citizen-02', label: 'Participation', stageType: 'action', before: 'Ask participants to classify ', after: ' or report local weather.', answer: 'galaxy images', explanation: 'The participation paragraph gives galaxy-image classification as one task.' },
    { id: 'flow-citizen-03', label: 'Quality control', stageType: 'condition', before: 'Provide examples and fixed reporting ', after: ' so observations can be compared.', answer: 'categories', explanation: 'Fixed reporting categories reduce variation between observations.' },
    { id: 'flow-citizen-04', label: 'Human-software link', stageType: 'result', before: 'Volunteers verify an algorithm or label examples for later automated ', after: '.', answer: 'searches', explanation: 'The fourth paragraph says labelled examples improve later automated searches.' },
    { id: 'flow-citizen-05', label: 'Wider outcome', stageType: 'output', before: 'Some volunteers become co-authors of research ', after: '.', answer: 'publications', explanation: 'The final paragraph names co-authorship of research publications as an outcome.' },
  ],
  'night-trains-cross-borders': [
    { id: 'flow-rail-01', label: 'Trial', stageType: 'input', before: 'European institutions select ', after: ' to test cross-border links.', answer: 'pilot services', explanation: 'The opening paragraph moves from renewed interest to selected pilot services.' },
    { id: 'flow-rail-02', label: 'Rolling stock', stageType: 'condition', before: 'New sleeper coaches need authorisation and modern ', after: '.', answer: 'safety systems', explanation: 'The rolling-stock paragraph lists authorisation and modern safety systems.' },
    { id: 'flow-rail-03', label: 'Network coordination', stageType: 'action', before: 'Coordinate train paths and cooperation among ', after: '.', answer: 'infrastructure managers', explanation: 'Cross-border operation requires infrastructure managers in several countries to cooperate.' },
    { id: 'flow-rail-04', label: 'Passenger purchase', stageType: 'result', before: 'Make a journey with several operators purchasable as one ', after: '.', answer: 'itinerary', explanation: 'The ticketing paragraph identifies one itinerary as the desired passenger outcome.' },
    { id: 'flow-rail-05', label: 'Viable service', stageType: 'output', before: 'Ensure vehicles, paths, tickets and demand ', after: '.', answer: 'work together', explanation: 'The conclusion says revival depends on how these elements work together.' },
  ],
};

function fromSourcePassage(sourceId: string): FlowChartTrainingPassage {
  const source = MATCHING_HEADINGS_PASSAGES.find((item: MatchingHeadingsTrainingPassage) => item.id === sourceId);
  if (!source) throw new Error(`Missing source-backed Flow-chart passage ${sourceId}`);
  const passage = source.paragraphs.map((paragraph) => paragraph.text).join('\n\n');
  const decisions = DERIVED_DECISIONS[sourceId];
  if (!decisions) throw new Error(`Missing Flow-chart decisions for ${sourceId}`);
  return {
    id: `flow-${source.id}`,
    title: source.title,
    passage,
    flowTitle: `${source.title}: process map`,
    instruction: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    sourceUrl: source.sourceUrl,
    sourceNote: `${source.sourceNote} Reused here as bounded WeLearn Flow-chart practice; the cited source is candidate context rather than blanket factual verification, authorship proof or rights clearance.`,
    decisions: decisions.map((decision, index) => ({
      ...decision,
      alternatives: [],
      instruction: 'NO MORE THAN TWO WORDS',
      maxWords: 2,
      evidenceQuote: paragraphContaining(passage, decision.answer),
      hint: `Use the ${decision.label.toLowerCase()} box and its neighbouring stage to locate the exact passage span.`,
      trap: `A plausible phrase from another paragraph does not preserve the ${decision.label.toLowerCase()} stage or its connection to the next box.`,
      errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
    })),
  };
}

export const FLOW_CHART_PASSAGES: FlowChartTrainingPassage[] = [
  ...IELTS_FLOW_CHART_COMPLETION_PASSAGES.map(fromLegacy),
  ...Object.keys(DERIVED_DECISIONS).map(fromSourcePassage),
];

export const FLOW_CHART_LEVELS: FlowChartLevel[] = [
  {
    id: 'stage-logic',
    title: 'Follow stage logic',
    focus: 'Previous box → active stage → next box',
    instruction: 'Name the active stage and use both neighbouring boxes before searching for the exact span.',
    passageIds: ['flow-noise-mapping', 'flow-keeping-seeds-useful', 'flow-citizens-do-science', 'flow-night-trains-cross-borders'],
    decisionIds: ['flow-noise-mapping-02', 'flow-seeds-03', 'flow-citizen-03', 'flow-rail-03'],
    masteryScore: 3,
  },
  {
    id: 'connector-output',
    title: 'Control connectors and outputs',
    focus: 'Sequence + grammar + result',
    instruction: 'Use the connector and destination box to distinguish an input, condition, result or final output.',
    passageIds: ['flow-noise-mapping', 'flow-keeping-seeds-useful', 'flow-citizens-do-science', 'flow-night-trains-cross-borders'],
    decisionIds: ['flow-noise-mapping-05', 'flow-seeds-05', 'flow-citizen-05', 'flow-rail-05'],
    masteryScore: 3,
  },
  { id: 'noise', title: 'Full flow · Urban noise mapping', focus: 'Measurement to recommendation', instruction: 'Complete all six connected stages before feedback opens.', passageIds: ['flow-noise-mapping'], masteryScore: 5 },
  { id: 'seeds', title: 'Full flow · Seed collections', focus: 'Preservation to access', instruction: 'Track the five-stage process without opening explanations.', passageIds: ['flow-keeping-seeds-useful'], masteryScore: 4 },
  { id: 'citizen', title: 'Paced flow · Citizen science', focus: 'Distributed work to outcomes', instruction: 'Complete the full process map with exact passage spans.', passageIds: ['flow-citizens-do-science'], masteryScore: 4 },
  { id: 'rail', title: 'Skill check · Cross-border rail', focus: 'Interdependent conditions', instruction: 'This is a WeLearn micro-skill check, not an IELTS band or secure exam result.', passageIds: ['flow-night-trains-cross-borders'], masteryScore: 4 },
];

export function getFlowChartPassage(id: string) {
  return FLOW_CHART_PASSAGES.find((passage) => passage.id === id);
}
