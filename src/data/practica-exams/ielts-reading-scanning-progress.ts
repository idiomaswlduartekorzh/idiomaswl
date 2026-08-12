import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type ScanningErrorCode =
  | 'signal-too-common'
  | 'wrong-entity'
  | 'wrong-number'
  | 'context-too-narrow'
  | 'scope-or-polarity-missed';

export type ScanningTarget = {
  id: string;
  paragraphId: string;
  question: string;
  answer: string;
  bestSignal: string;
  signalOptions: string[];
  evidence: string;
  evidenceExplanation: string;
  trap: string;
  errorCode: ScanningErrorCode;
};

export type ScanningTrainingPassage = MatchingHeadingsTrainingPassage & {
  targets: ScanningTarget[];
};

export type ScanningLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  targetIds?: string[];
  mode: 'signal' | 'evidence';
  masteryScore: number;
};

export const SCANNING_STORAGE_KEY = 'welearn:ielts-reading:scanning:v2';
export const SCANNING_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:scanning:v1';
export const SCANNING_GUIDED_PASSAGE_ID = 'cooling-city-blocks';
export const SCANNING_INDEPENDENT_PASSAGE_ID = 'mangroves-after-storms';

const TARGETS: Record<string, ScanningTarget[]> = {
  'cooling-city-blocks': [
    { id: 'cooling-scan-a', paragraphId: 'cooling-a', question: 'Which surfaces absorb and retain more solar energy?', answer: 'dark roofs, roads and other developed surfaces', bestSignal: 'absorb + solar energy', signalOptions: ['absorb + solar energy', 'city + result', 'rural + buildings', 'temperature + countryside'], evidence: 'Dark roofs, roads and other developed surfaces absorb and hold more solar energy', evidenceExplanation: 'The verb–object pair leads to the list immediately before the verb.', trap: 'Buildings slow heat release, but they are not the complete list attached to “absorb”.', errorCode: 'wrong-entity' },
    { id: 'cooling-scan-b', paragraphId: 'cooling-b', question: 'What two processes produce the cooling benefit?', answer: 'shade and evaporation', bestSignal: 'two ways + benefit', signalOptions: ['two ways + benefit', 'streets + walls', 'water + air', 'greenery + decoration'], evidence: 'The benefit therefore comes from both shade and evaporation', evidenceExplanation: 'The paired marker “both … and” confirms a two-part answer.', trap: 'Evapotranspiration is one mechanism; the question requires both.', errorCode: 'context-too-narrow' },
    { id: 'cooling-scan-c', paragraphId: 'cooling-c', question: 'What can an owner change when planting space is limited?', answer: 'the roof surface', bestSignal: 'planting space + owner', signalOptions: ['planting space + owner', 'indoor + climate', 'sunlight + heat', 'property + result'], evidence: 'Where planting space is scarce, a building owner can change the roof surface', evidenceExplanation: 'The condition and actor occur together only once.', trap: 'Insulation affects results but is not what the owner is told to change.', errorCode: 'wrong-entity' },
    { id: 'cooling-scan-d', paragraphId: 'cooling-d', question: 'What can identify streets without trees?', answer: 'a canopy survey', bestSignal: 'streets + lack trees', signalOptions: ['streets + lack trees', 'money + effect', 'roof + data', 'average + needs'], evidence: 'A canopy survey can show which streets lack trees', evidenceExplanation: 'The distinctive phrase “lack trees” identifies the tool directly before it.', trap: 'Surface and building data identify roof-programme potential, not streets lacking trees.', errorCode: 'wrong-entity' },
    { id: 'cooling-scan-e', paragraphId: 'cooling-e', question: 'Which three local constraints should determine the mix of cooling methods?', answer: 'space, budget and maintenance capacity', bestSignal: 'combines + according to', signalOptions: ['combines + according to', 'young trees + water', 'roofs + climates', 'neighbourhoods + benefit'], evidence: 'combines methods according to local space, budget and maintenance capacity', evidenceExplanation: 'The phrase after “according to” supplies the three decision constraints.', trap: 'Water and installation cost are individual limitations, not the requested three-part planning rule.', errorCode: 'context-too-narrow' },
  ],
  'mangroves-after-storms': [
    { id: 'mangrove-scan-a', paragraphId: 'mangrove-a', question: 'What transformed gradual decline into an urgent programme?', answer: 'consecutive hurricanes', bestSignal: 'transformed + urgent', signalOptions: ['transformed + urgent', 'decline + concern', 'communities + habitat', 'problem + programme'], evidence: 'consecutive hurricanes made the risk impossible to ignore', evidenceExplanation: 'The cause is introduced before the later paraphrase “transformed”.', trap: 'Decline was already present; the hurricanes changed its urgency.', errorCode: 'scope-or-polarity-missed' },
    { id: 'mangrove-scan-b', paragraphId: 'mangrove-b', question: 'Which part of a mangrove interrupts moving water?', answer: 'dense roots', bestSignal: 'interrupt + moving water', signalOptions: ['interrupt + moving water', 'force + wind', 'lessen + erosion', 'natural + barrier'], evidence: 'Dense roots interrupt moving water and reduce wave energy', evidenceExplanation: 'The exact action identifies the plant part immediately before the verb.', trap: 'Branches and leaves break wind; they do not interrupt moving water.', errorCode: 'wrong-entity' },
    { id: 'mangrove-scan-c', paragraphId: 'mangrove-c', question: 'What may restoration teams reopen before planting?', answer: 'water routes', bestSignal: 'before planting + reopen', signalOptions: ['before planting + reopen', 'seedlings + first', 'damaged ground + tides', 'new trees + chance'], evidence: 'Restoration teams can begin by reopening water routes', evidenceExplanation: '“Begin by” marks the step that precedes planting.', trap: 'Site conditions are improved too, but the question asks what is reopened.', errorCode: 'wrong-entity' },
    { id: 'mangrove-scan-d', paragraphId: 'mangrove-d', question: 'What can environmental work become for trained young participants?', answer: 'a route into employment', bestSignal: 'young + paid experience', signalOptions: ['young + paid experience', 'local + volunteers', 'clear + monitor', 'people + coast'], evidence: 'environmental work becomes a route into employment', evidenceExplanation: 'The result appears after the training and paid-experience condition.', trap: 'Rebuilding the coast is the environmental outcome, not the participant outcome requested.', errorCode: 'wrong-entity' },
    { id: 'mangrove-scan-e', paragraphId: 'mangrove-e', question: 'Which coastal benefit is stored rather than supported?', answer: 'carbon', bestSignal: 'store + coastal', signalOptions: ['store + coastal', 'support + fish', 'contribute + tourism', 'examine + outcomes'], evidence: 'store coastal carbon', evidenceExplanation: 'The verb “store” distinguishes carbon from the neighbouring benefits.', trap: 'Fish and birds are supported; recreation and tourism are contributed to.', errorCode: 'wrong-entity' },
  ],
  'sleep-builds-memory': [
    { id: 'sleep-scan-a', paragraphId: 'sleep-a', question: 'When does the brain continue processing information?', answer: 'while a person is asleep', bestSignal: 'continues + process', signalOptions: ['continues + process', 'passive + outside', 'different + states', 'periods + study'], evidence: 'continues to process information gathered while a person was awake', evidenceExplanation: 'The surrounding sentence contrasts sleeping state with information gathered while awake.', trap: 'The information was gathered while awake; the processing continues during sleep.', errorCode: 'scope-or-polarity-missed' },
    { id: 'sleep-scan-b', paragraphId: 'sleep-b', question: 'Which ability is weakened in an exhausted brain before learning?', answer: 'encoding new material', bestSignal: 'exhausted + before lesson', signalOptions: ['exhausted + before lesson', 'adequate + attention', 'formation + memories', 'previous + night'], evidence: 'an exhausted brain is less ready to encode new material', evidenceExplanation: 'The comparative phrase “less ready to” identifies the weakened ability.', trap: 'Attention is supported by rest, but the question asks for the encoded material relationship.', errorCode: 'context-too-narrow' },
    { id: 'sleep-scan-c', paragraphId: 'sleep-c', question: 'What happens to newly formed memories during sleep?', answer: 'they are reactivated and stabilised', bestSignal: 'newly formed memories', signalOptions: ['newly formed memories', 'different job', 'older knowledge', 'adding notes'], evidence: 'Newly formed memories are reactivated and stabilised', evidenceExplanation: 'The exact entity is followed by a two-part passive process.', trap: 'Linking to older knowledge is an additional possibility, not the complete first process.', errorCode: 'context-too-narrow' },
    { id: 'sleep-scan-d', paragraphId: 'sleep-d', question: 'What may reduce interference between old and new memories?', answer: 'reactivation at separate moments', bestSignal: 'reduce + interference', signalOptions: ['reduce + interference', 'protect + old', 'different + sleep', 'today + yesterday'], evidence: 'reactivate newer and older information at separate moments', evidenceExplanation: 'The causal explanation appears immediately before “This separation could reduce interference”.', trap: 'Different sleep patterns are the context; temporal separation is the proposed mechanism.', errorCode: 'context-too-narrow' },
    { id: 'sleep-scan-e', paragraphId: 'sleep-e', question: 'Besides recall, which three abilities can insufficient sleep weaken?', answer: 'attention, judgement and information processing', bestSignal: 'as well as recall', signalOptions: ['as well as recall', 'perfect + bedtime', 'substitute + practice', 'learning + plan'], evidence: 'weaken attention, judgement and the ability to process information as well as later recall', evidenceExplanation: '“As well as” separates the requested abilities from recall.', trap: 'The paragraph rejects a universal bedtime and sleep as a substitute; neither answers the ability question.', errorCode: 'scope-or-polarity-missed' },
  ],
  'citizens-do-science': [
    { id: 'citizen-scan-a', paragraphId: 'citizen-a', question: 'What can reveal patterns across a wide area?', answer: 'thousands of reports', bestSignal: 'reveal + wide area', signalOptions: ['reveal + wide area', 'small + team', 'single + modest', 'image + archive'], evidence: 'thousands of reports can reveal patterns across a wide area', evidenceExplanation: 'The quantity and result occur in the same clause.', trap: 'One report is described as modest; the scale comes from thousands.', errorCode: 'wrong-number' },
    { id: 'citizen-scan-b', paragraphId: 'citizen-b', question: 'Which device can volunteers use to report rain or snow?', answer: 'a phone', bestSignal: 'report + rain or snow', signalOptions: ['report + rain or snow', 'classify + galaxy', 'specialist + knowledge', 'beginners + own'], evidence: 'another uses a phone to report rain or snow', evidenceExplanation: 'The weather-reporting verb phrase points back to the device.', trap: 'A laptop is used for galaxy images, not precipitation reports.', errorCode: 'wrong-entity' },
    { id: 'citizen-scan-c', paragraphId: 'citizen-c', question: 'What do projects provide so observations can be compared?', answer: 'instructions, examples and fixed reporting categories', bestSignal: 'observations + compared', signalOptions: ['observations + compared', 'large + useful', 'repeat + checks', 'variation + perfect'], evidence: 'provide instructions, examples and fixed reporting categories', evidenceExplanation: '“Therefore provide” introduces the three-part response to comparability.', trap: 'Repeat checks are a later quality-control method, not the three things provided.', errorCode: 'context-too-narrow' },
    { id: 'citizen-scan-d', paragraphId: 'citizen-d', question: 'What can volunteers do with an algorithm’s suggestions?', answer: 'verify them', bestSignal: 'algorithm + suggestions', signalOptions: ['algorithm + suggestions', 'large + datasets', 'unexpected + shape', 'human + computation'], evidence: 'Volunteers can verify an algorithm’s suggestions', evidenceExplanation: 'The actor, action and object appear together in one short clause.', trap: 'Labelling examples improves later searches; it is the second volunteer action.', errorCode: 'context-too-narrow' },
    { id: 'citizen-scan-e', paragraphId: 'citizen-e', question: 'Which publication role have some volunteers achieved?', answer: 'co-authors', bestSignal: 'research + publications', signalOptions: ['research + publications', 'useful + evidence', 'observation + skills', 'expert + review'], evidence: 'volunteers have even become co-authors of research publications', evidenceExplanation: 'The publication noun leads directly to the role.', trap: 'Expert review remains necessary; it is not the role achieved by volunteers.', errorCode: 'wrong-entity' },
  ],
  'keeping-seeds-useful': [
    { id: 'seed-scan-a', paragraphId: 'seed-a', question: 'Which future pressures may an uncommon variety help address?', answer: 'drought, disease or a changing climate', bestSignal: 'uncommon + useful response', signalOptions: ['uncommon + useful response', 'collection + options', 'genetic + diversity', 'future + research'], evidence: 'a useful response to drought, disease or a changing climate', evidenceExplanation: 'The phrase after “response to” gives the complete three-part list.', trap: 'Research and crop improvement are uses of the collection, not the pressures.', errorCode: 'context-too-narrow' },
    { id: 'seed-scan-b', paragraphId: 'seed-b', question: 'Which three details should a useful seed record identify?', answer: 'identity, origin and observed characteristics', bestSignal: 'useful record + identifies', signalOptions: ['useful record + identifies', 'seed + enough', 'packets + confused', 'trait + invisible'], evidence: 'identifies what the sample is, where it came from and which characteristics have been observed', evidenceExplanation: 'The three parallel clauses define identity, origin and characteristics.', trap: 'Confusion and invisible traits are consequences of missing information.', errorCode: 'context-too-narrow' },
    { id: 'seed-scan-c', paragraphId: 'seed-c', question: 'When do staff test stored samples?', answer: 'at planned intervals', bestSignal: 'staff + test samples', signalOptions: ['staff + test samples', 'cold + room', 'control + moisture', 'different + conditions'], evidence: 'test samples at planned intervals', evidenceExplanation: 'The frequency phrase follows the testing action.', trap: 'Temperature is controlled, but it does not state when testing occurs.', errorCode: 'wrong-entity' },
    { id: 'seed-scan-d', paragraphId: 'seed-d', question: 'What do curators collect after controlled growing?', answer: 'a fresh generation of seed', bestSignal: 'controlled + collect', signalOptions: ['controlled + collect', 'too few + grow', 'remaining + stock', 'original + material'], evidence: 'collect a fresh generation of seed', evidenceExplanation: 'The verb “collect” has one direct object in the paragraph.', trap: 'Remaining stock is what is planted, not what is collected afterward.', errorCode: 'scope-or-polarity-missed' },
    { id: 'seed-scan-e', paragraphId: 'seed-e', question: 'Who can request material from a documented collection?', answer: 'plant breeders and researchers', bestSignal: 'request + material', signalOptions: ['request + material', 'public + value', 'clear + catalogues', 'develop + knowledge'], evidence: 'allow plant breeders and researchers to request material', evidenceExplanation: 'The infinitive “to request” follows the two named groups.', trap: 'The public value is broader, but the passage names two requesting groups.', errorCode: 'wrong-entity' },
  ],
  'night-trains-cross-borders': [
    { id: 'rail-scan-a', paragraphId: 'rail-a', question: 'What did European institutions select to test cross-border links?', answer: 'pilot services', bestSignal: 'selected + test', signalOptions: ['selected + test', 'interest + revived', 'alternatives + flights', 'routes + evaluate'], evidence: 'selected pilot services to test new or improved cross-border links', evidenceExplanation: 'The selected object appears immediately before the purpose clause.', trap: 'Operators evaluate routes later; the institutions selected services.', errorCode: 'wrong-entity' },
    { id: 'rail-scan-b', paragraphId: 'rail-b', question: 'Which three requirements apply to new sleeper coaches?', answer: 'authorisation, modern safety systems and compatible equipment', bestSignal: 'new sleeper coaches + need', signalOptions: ['new sleeper coaches + need', 'service + expand', 'arrival + generation', 'rolling stock + solve'], evidence: 'need authorisation, modern safety systems and equipment that works across the intended network', evidenceExplanation: 'The modal “need” introduces the complete requirement list.', trap: 'Timetabling and ticketing are problems rolling stock cannot solve, not coach requirements.', errorCode: 'context-too-narrow' },
    { id: 'rail-scan-c', paragraphId: 'rail-c', question: 'Who must cooperate across several countries?', answer: 'infrastructure managers', bestSignal: 'cooperation + countries', signalOptions: ['cooperation + countries', 'different + rules', 'route + paths', 'passengers + border'], evidence: 'cooperation among infrastructure managers in several countries', evidenceExplanation: 'The group name sits between the cooperation and location signals.', trap: 'Passengers experience the outcome but do not coordinate the infrastructure.', errorCode: 'wrong-entity' },
    { id: 'rail-scan-d', paragraphId: 'rail-d', question: 'What may complicate passenger protection during disruption?', answer: 'separate tickets', bestSignal: 'protection + disruption', signalOptions: ['protection + disruption', 'tracks + connect', 'compare + buy', 'booking + project'], evidence: 'separate tickets may complicate information and passenger protection when disruption occurs', evidenceExplanation: 'The requested consequence follows the subject “separate tickets”.', trap: 'Several operators make purchase difficult, but the protection problem is tied specifically to separate tickets.', errorCode: 'context-too-narrow' },
    { id: 'rail-scan-e', paragraphId: 'rail-e', question: 'Which four conditions still constrain a promising route?', answer: 'vehicles, departure times, connections and demand', bestSignal: 'promise + conditional', signalOptions: ['promise + conditional', 'sleeping + time', 'alternative + flight', 'revival + appeal'], evidence: 'needs suitable vehicles, usable departure times, reliable connections and enough demand', evidenceExplanation: 'The colon after “conditional” leads to a four-part requirement list.', trap: 'Strong rail links frame the example but do not replace the four explicit conditions.', errorCode: 'scope-or-polarity-missed' },
  ],
};

export const SCANNING_PASSAGES: ScanningTrainingPassage[] = MATCHING_HEADINGS_PASSAGES.map((passage) => ({
  ...passage,
  targets: TARGETS[passage.id] ?? [],
}));

export const SCANNING_LEVELS: ScanningLevel[] = [
  { id: 'signals', title: 'Build a distinctive signal', focus: 'Question → search plan', instruction: 'Choose the smallest signal pair that is distinctive enough to locate the requested relationship.', passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'], targetIds: ['sleep-scan-c', 'citizen-scan-b', 'seed-scan-c', 'rail-scan-d'], mode: 'signal', masteryScore: 3 },
  { id: 'context', title: 'Verify the evidence zone', focus: 'Signal → exact proof', instruction: 'Reject the nearby true detail and choose the sentence that answers the exact entity, number, scope or polarity.', passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'], targetIds: ['sleep-scan-e', 'citizen-scan-a', 'seed-scan-d', 'rail-scan-b'], mode: 'evidence', masteryScore: 3 },
  { id: 'sleep-evidence', title: 'Full set · Sleep and memory', focus: 'Cross-skill transfer', instruction: 'Use a passage map only to choose a zone; every final decision must be supported by an exact evidence span.', passageIds: ['sleep-builds-memory'], mode: 'evidence', masteryScore: 4 },
  { id: 'citizen-evidence', title: 'Full set · Citizen science', focus: 'Independent transfer', instruction: 'Locate all five answers before submission. Feedback remains closed until the complete set is sent.', passageIds: ['citizens-do-science'], mode: 'evidence', masteryScore: 4 },
  { id: 'seed-evidence', title: 'Paced set · Seed collections', focus: 'Target: seven minutes', instruction: 'Scan for relationship pairs rather than isolated nouns, then read one sentence around each candidate.', passageIds: ['keeping-seeds-useful'], mode: 'evidence', masteryScore: 4 },
  { id: 'rail-evidence', title: 'Skill check · Night trains', focus: 'Controlled transfer', instruction: 'Complete five evidence decisions independently. The result measures this WeLearn micro-skill, not an IELTS band.', passageIds: ['night-trains-cross-borders'], mode: 'evidence', masteryScore: 4 },
];

export function getScanningPassage(id: string) {
  return SCANNING_PASSAGES.find((passage) => passage.id === id);
}

function hashSeed(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shuffled<T>(items: T[], seedValue: string) {
  let seed = hashSeed(seedValue);
  const result = items.slice();
  for (let index = result.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const target = seed % (index + 1);
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function getSignalOptions(target: ScanningTarget, attemptSeed: number) {
  return shuffled(target.signalOptions, `signal-v2:${target.id}:${Math.max(0, Math.trunc(attemptSeed))}`);
}

export function getEvidenceOptions(passage: ScanningTrainingPassage, target: ScanningTarget, attemptSeed: number) {
  const distractors = passage.targets.filter((item) => item.id !== target.id).slice(0, 3).map((item) => item.evidence);
  return shuffled([target.evidence, ...distractors], `${target.id}:evidence:${Math.max(0, Math.trunc(attemptSeed))}`);
}
