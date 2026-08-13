import {
  IELTS_DIAGRAM_LABELING_PASSAGES,
  type DiagramLabelingPassage,
} from './seo-catalog.ts';
import {
  TABLE_COMPLETION_PASSAGES,
  type TableCompletionTrainingPassage,
} from './ielts-reading-table-completion-progress.ts';

export type DiagramLabelingErrorCode =
  | 'visual-zone'
  | 'wrong-part'
  | 'direction-misread'
  | 'grammar-mismatch'
  | 'over-limit'
  | 'copied-context';

export type DiagramLabelingDecision = {
  id: string;
  marker: string;
  zone: string;
  landmark: string;
  before: string;
  after: string;
  answer: string;
  alternatives: string[];
  maxWords: number;
  evidenceQuote: string;
  explanation: string;
  hint: string;
  trap: string;
  errorCode: DiagramLabelingErrorCode;
};

export type DiagramLabelingTrainingPassage = {
  id: string;
  title: string;
  passage: string;
  diagramTitle: string;
  diagramType: 'cross-section' | 'mechanism' | 'layout' | 'system';
  instruction: string;
  maxWords: number;
  sourceUrl: string;
  sourceNote: string;
  decisions: DiagramLabelingDecision[];
};

export type DiagramLabelingLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const DIAGRAM_LABELING_STORAGE_KEY = 'welearn:ielts-reading:diagram-labeling:v1';
export const DIAGRAM_LABELING_GUIDED_PASSAGE_ID = 'dl-rain-garden';
export const DIAGRAM_LABELING_INDEPENDENT_PASSAGE_ID = 'dl-greenhouse-ventilation';
export const DIAGRAM_LABELING_OFFICIAL_FORMAT_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

const ERROR_ROTATION: DiagramLabelingErrorCode[] = [
  'visual-zone',
  'wrong-part',
  'direction-misread',
  'grammar-mismatch',
  'over-limit',
  'copied-context',
];

const LEGACY_SOURCES: Record<string, { url: string; note: string; diagramType: DiagramLabelingTrainingPassage['diagramType'] }> = {
  'dl-rain-garden': {
    url: 'https://www.epa.gov/green-infrastructure/types-green-infrastructure',
    note: 'WeLearn is authorised to publish this guided-practice passage. EPA guidance supplies candidate context for rain-garden components; it does not verify every simplified sentence or license the WeLearn wording.',
    diagramType: 'cross-section',
  },
  'dl-greenhouse-ventilation': {
    url: 'https://extension.psu.edu/natural-ventilation-for-freestall-barns',
    note: 'WeLearn is authorised to publish this guided-practice passage. The extension source supports the broad side-opening and ridge-vent mechanism; it does not certify this greenhouse description or its wording.',
    diagramType: 'cross-section',
  },
  'dl-hand-pump': {
    url: 'https://www.fao.org/4/ah810e/ah810e06.htm',
    note: 'WeLearn is authorised to publish this guided-practice passage. FAO diagrams support the piston, foot-valve and piston-valve mechanism; this adaptation remains a bounded teaching text rather than an official IELTS item.',
    diagramType: 'mechanism',
  },
};

const LEGACY_VISUAL_MAP: Record<string, Record<string, { zone: string; landmark: string }>> = {
  'dl-rain-garden': {
    A: { zone: 'Entry edge', landmark: 'Runoff reaches the basin from the upper street side.' },
    B: { zone: 'Impact surface', landmark: 'The first internal surface spreads fast-moving water.' },
    C: { zone: 'Upper filter layer', landmark: 'The top layer catches material before water moves lower.' },
    D: { zone: 'Growing medium', landmark: 'A mixed layer supports plants and downward movement.' },
    E: { zone: 'Root zone', landmark: 'The deepest living layer keeps channels open below the surface.' },
    F: { zone: 'Emergency outlet', landmark: 'Extra water exits when the planted basin is full.' },
  },
  'dl-greenhouse-ventilation': {
    A: { zone: 'Lower intake', landmark: 'Cooler air enters close to the base of the structure.' },
    B: { zone: 'Opening cover', landmark: 'A thin barrier covers the low entry point.' },
    C: { zone: 'Plant-level path', landmark: 'Incoming air crosses the lower occupied zone before rising.' },
    D: { zone: 'Roof exhaust', landmark: 'Warm air leaves through the highest opening.' },
    E: { zone: 'Heat-sensitive arm', landmark: 'A temperature-responsive device operates the upper exit.' },
    F: { zone: 'High extraction point', landmark: 'Mechanical support can accelerate outward air movement.' },
  },
  'dl-hand-pump': {
    A: { zone: 'User control', landmark: 'The operator moves the external lever at the top.' },
    B: { zone: 'Vertical linkage', landmark: 'A narrow connection transfers movement inside the body.' },
    C: { zone: 'Pressure chamber', landmark: 'Movement creates a lower-pressure region above the water.' },
    D: { zone: 'Lower intake valve', landmark: 'The bottom control admits water and prevents backward flow.' },
    E: { zone: 'Moving valve', landmark: 'A second control changes state during the downward stroke.' },
    F: { zone: 'Upper outlet', landmark: 'Lifted water leaves the mechanism near the top.' },
  },
};

export function normalizeDiagramLabelingAnswer(value: string) {
  return value.normalize('NFKC').trim().toLocaleLowerCase('en').replace(/[.,;:!?]+$/gu, '').replace(/\s+/gu, ' ');
}

export function countDiagramLabelingWords(value: string) {
  const clean = normalizeDiagramLabelingAnswer(value);
  return clean ? clean.split(' ').length : 0;
}

export function isDiagramLabelingCorrect(decision: DiagramLabelingDecision, value: string) {
  if (countDiagramLabelingWords(value) > decision.maxWords) return false;
  const accepted = [decision.answer, ...decision.alternatives].map(normalizeDiagramLabelingAnswer);
  return accepted.includes(normalizeDiagramLabelingAnswer(value));
}

function paragraphContaining(passage: string, answer: string) {
  const target = normalizeDiagramLabelingAnswer(answer);
  const paragraph = passage
    .split(/\n\s*\n/u)
    .find((part) => normalizeDiagramLabelingAnswer(part).includes(target));
  if (!paragraph) throw new Error(`Missing literal Diagram Labeling evidence for ${answer}`);
  return paragraph;
}

function fromLegacy(source: DiagramLabelingPassage): DiagramLabelingTrainingPassage {
  const boundary = LEGACY_SOURCES[source.id];
  if (!boundary) throw new Error(`Missing Diagram Labeling source boundary for ${source.id}`);
  const stages = new Map(source.stages.map((stage) => [stage.id, stage]));
  const visualMap = LEGACY_VISUAL_MAP[source.id];
  if (!visualMap) throw new Error(`Missing answer-free visual map for ${source.id}`);
  return {
    id: source.id,
    title: source.title,
    passage: source.passage,
    diagramTitle: source.diagramTitle,
    diagramType: boundary.diagramType,
    instruction: source.wordLimit,
    maxWords: 2,
    sourceUrl: boundary.url,
    sourceNote: boundary.note,
    decisions: source.questions.map((question, index) => {
      const stage = stages.get(question.stageId);
      if (!stage) throw new Error(`Missing visual stage ${question.stageId} for ${question.id}`);
      const visual = visualMap[question.stageId];
      if (!visual) throw new Error(`Missing answer-free visual marker ${question.stageId} for ${question.id}`);
      return {
        id: question.id,
        marker: question.stageId,
        zone: visual.zone,
        landmark: visual.landmark,
        before: question.before,
        after: question.after,
        answer: question.answer,
        alternatives: question.alternatives ?? [],
        maxWords: 2,
        evidenceQuote: paragraphContaining(source.passage, question.answer),
        explanation: question.explanation,
        hint: question.hint,
        trap: `Do not label ${visual.zone.toLowerCase()} with a true phrase that describes another position or neighbouring component.`,
        errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
      };
    }),
  };
}

type DerivedDiagram = {
  diagramTitle: string;
  diagramType: DiagramLabelingTrainingPassage['diagramType'];
  decisions: Array<Pick<DiagramLabelingDecision, 'id' | 'marker' | 'zone' | 'landmark' | 'before' | 'after' | 'answer' | 'explanation'>>;
};

const DERIVED_DIAGRAMS: Record<string, DerivedDiagram> = {
  'table-cooling-buildings': {
    diagramTitle: 'Passive-cooling building section',
    diagramType: 'cross-section',
    decisions: [
      { id: 'dl-cooling-01', marker: 'A', zone: 'Opposite openings', landmark: 'Two openings face across the occupied room.', before: 'Openings on', after: 'of the room create cross-ventilation.', answer: 'opposite sides', explanation: 'The cross-ventilation paragraph places windows or vents on opposite sides of a room.' },
      { id: 'dl-cooling-02', marker: 'B', zone: 'Wind-facing edge', landmark: 'The opening orientation follows the dominant air movement.', before: 'Opening position follows the', after: '.', answer: 'prevailing winds', explanation: 'Designers study prevailing winds before deciding where openings should go.' },
      { id: 'dl-cooling-03', marker: 'C', zone: 'Thermal core', landmark: 'Dense internal material absorbs daytime heat.', before: 'Thermal mass may use', after: ', concrete or brick.', answer: 'stone', explanation: 'Stone is the first thermal-mass material listed in the passage.' },
      { id: 'dl-cooling-04', marker: 'D', zone: 'Night release path', landmark: 'The building must release accumulated warmth after dark.', before: 'Night ventilation removes', after: '.', answer: 'stored heat', explanation: 'The passage warns that thermal mass is less useful when stored heat cannot escape after sunset.' },
      { id: 'dl-cooling-05', marker: 'E', zone: 'External window layer', landmark: 'A device blocks sunlight before it reaches the glass.', before: 'Window shade may use', after: '.', answer: 'external screens', explanation: 'External screens are listed among the features that block direct sunlight.' },
      { id: 'dl-cooling-06', marker: 'F', zone: 'Landscape edge', landmark: 'Living shade stands outside the building envelope.', before: 'Additional shade comes from', after: '.', answer: 'trees', explanation: 'Trees are the living shading element named with roof edges and screens.' },
    ],
  },
  'table-rain-gardens': {
    diagramTitle: 'School rain-garden site plan',
    diagramType: 'layout',
    decisions: [
      { id: 'dl-school-rain-01', marker: 'A', zone: 'Runoff source', landmark: 'Hard play areas send storm water toward the planted basin.', before: 'Playgrounds create', after: 'during storms.', answer: 'surface water', explanation: 'The opening paragraph identifies surface water from playgrounds and car parks.' },
      { id: 'dl-school-rain-02', marker: 'B', zone: 'Protected building edge', landmark: 'The basin is kept away from the school structure.', before: 'Keep the basin away from', after: '.', answer: 'building foundations', explanation: 'The location paragraph explicitly separates rain gardens from building foundations.' },
      { id: 'dl-school-rain-03', marker: 'C', zone: 'Planted centre', landmark: 'Deep roots tolerate changing moisture and open soil channels.', before: 'The centre uses deep-rooted', after: '.', answer: 'native plants', explanation: 'Deep-rooted native plants are recommended for wet and dry periods.' },
      { id: 'dl-school-rain-04', marker: 'D', zone: 'Absorption layer', landmark: 'Water moves into the ground beneath the plants.', before: 'Water soaks into the', after: '.', answer: 'soil', explanation: 'The passage says the basin lets water soak slowly into the soil.' },
      { id: 'dl-school-rain-05', marker: 'E', zone: 'Entry points', landmark: 'Leaves are cleared where water enters.', before: 'Clear leaves from', after: '.', answer: 'inlet points', explanation: 'The maintenance paragraph names inlet points as the places to clear.' },
      { id: 'dl-school-rain-06', marker: 'F', zone: 'Flow path', landmark: 'Waste is removed before it obstructs water movement.', before: 'Remove', after: 'before it blocks the flow.', answer: 'litter', explanation: 'The final sentence requires litter removal before it blocks water flow.' },
    ],
  },
  'table-museum-inventory': {
    diagramTitle: 'Small-museum digitisation workstation',
    diagramType: 'layout',
    decisions: [
      { id: 'dl-museum-01', marker: 'A', zone: 'Object drawer', landmark: 'An existing paper identifier sits beside the item.', before: 'An object may have a', after: '.', answer: 'handwritten label', explanation: 'The opening paragraph describes objects with little more than a handwritten label.' },
      { id: 'dl-museum-02', marker: 'B', zone: 'Research desk', landmark: 'People who gave objects can supply identification evidence.', before: 'Curators may interview', after: '.', answer: 'donors', explanation: 'Interviewing donors is one of the identification methods in paragraph two.' },
      { id: 'dl-museum-03', marker: 'C', zone: 'Photography surface', landmark: 'A neutral field sits behind the object.', before: 'Photograph the object against a', after: '.', answer: 'plain background', explanation: 'The photography paragraph requires a plain background for consistency.' },
      { id: 'dl-museum-04', marker: 'D', zone: 'Measurement reference', landmark: 'A visible object provides size information.', before: 'Add a', after: 'when size matters.', answer: 'scale marker', explanation: 'The passage names a scale marker as the size reference.' },
      { id: 'dl-museum-05', marker: 'E', zone: 'Digital storage', landmark: 'Copies protect the records from a single failure.', before: 'Keep', after: 'in more than one place.', answer: 'backups', explanation: 'The storage paragraph says backups should be kept in more than one place.' },
      { id: 'dl-museum-06', marker: 'F', zone: 'Publication gate', landmark: 'A rule controls whether sensitive material can be shared.', before: 'Agree', after: 'before sharing online.', answer: 'access permissions', explanation: 'Access permissions must be agreed before sensitive material is shared online.' },
    ],
  },
};

function fromTable(source: TableCompletionTrainingPassage): DiagramLabelingTrainingPassage {
  const diagram = DERIVED_DIAGRAMS[source.id];
  if (!diagram) throw new Error(`Missing derived Diagram Labeling map for ${source.id}`);
  return {
    id: `dl-${source.id.replace(/^table-/u, '')}`,
    title: source.title,
    passage: source.passage,
    diagramTitle: diagram.diagramTitle,
    diagramType: diagram.diagramType,
    instruction: 'NO MORE THAN TWO WORDS',
    maxWords: 2,
    sourceUrl: source.sourceUrl,
    sourceNote: `${source.sourceNote} This diagram adaptation reuses the reviewed passage and adds no claim of blanket factual verification, official endorsement or third-party rights clearance.`,
    decisions: diagram.decisions.map((decision, index) => ({
      ...decision,
      alternatives: [],
      maxWords: 2,
      evidenceQuote: paragraphContaining(source.passage, decision.answer),
      hint: `Use marker ${decision.marker}, the ${decision.zone.toLowerCase()} zone and its visual landmark before scanning the passage.`,
      trap: `A phrase may be true elsewhere in the passage but still point to the wrong visual zone or component.`,
      errorCode: ERROR_ROTATION[index % ERROR_ROTATION.length],
    })),
  };
}

const TRANSFER_IDS = new Set(['table-cooling-buildings', 'table-rain-gardens', 'table-museum-inventory']);

export const DIAGRAM_LABELING_PASSAGES: DiagramLabelingTrainingPassage[] = [
  ...IELTS_DIAGRAM_LABELING_PASSAGES.map(fromLegacy),
  ...TABLE_COMPLETION_PASSAGES.filter((passage) => TRANSFER_IDS.has(passage.id)).map(fromTable),
];

export const DIAGRAM_LABELING_LEVELS: DiagramLabelingLevel[] = [
  {
    id: 'visual-map',
    title: 'Map the visual zones',
    focus: 'Marker + zone + landmark',
    instruction: 'Name the visual zone before scanning; a repeated noun cannot replace positional reasoning.',
    passageIds: ['dl-hand-pump', 'dl-cooling-buildings', 'dl-rain-gardens', 'dl-museum-inventory'],
    decisionIds: ['dl-hand-pump-04', 'dl-cooling-05', 'dl-school-rain-03', 'dl-museum-04'],
    masteryScore: 3,
  },
  {
    id: 'part-control',
    title: 'Separate neighbouring parts',
    focus: 'Function + direction + grammar',
    instruction: 'Use what the marked part does and where it sits to reject a nearby but wrong label.',
    passageIds: ['dl-hand-pump', 'dl-cooling-buildings', 'dl-rain-gardens', 'dl-museum-inventory'],
    decisionIds: ['dl-hand-pump-05', 'dl-cooling-02', 'dl-school-rain-05', 'dl-museum-06'],
    masteryScore: 3,
  },
  { id: 'pump', title: 'Full diagram · Hand pump', focus: 'Mechanical parts and motion', instruction: 'Complete all six labels before feedback opens.', passageIds: ['dl-hand-pump'], masteryScore: 5 },
  { id: 'building', title: 'Full diagram · Passive cooling', focus: 'Building cross-section', instruction: 'Connect each visible location with exact descriptive evidence.', passageIds: ['dl-cooling-buildings'], masteryScore: 5 },
  { id: 'school-rain', title: 'Paced diagram · School rain garden', focus: 'Site plan and layers', instruction: 'Use position and function together across the complete diagram.', passageIds: ['dl-rain-gardens'], masteryScore: 5 },
  { id: 'museum', title: 'Skill check · Museum workstation', focus: 'Layout and information flow', instruction: 'This is a WeLearn micro-skill check, not an IELTS band or secure exam result.', passageIds: ['dl-museum-inventory'], masteryScore: 5 },
];

export function getDiagramLabelingPassage(id: string) {
  return DIAGRAM_LABELING_PASSAGES.find((passage) => passage.id === id);
}
