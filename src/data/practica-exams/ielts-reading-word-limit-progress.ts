import {
  MATCHING_HEADINGS_PASSAGES,
  type MatchingHeadingsTrainingPassage,
} from './ielts-reading-matching-headings-progress.ts';

export type WordLimitErrorCode =
  | 'over-limit'
  | 'duplicate-frame-word'
  | 'incomplete-span'
  | 'grammar-mismatch'
  | 'wrong-evidence'
  | 'instruction-misread';

export type WordLimitDecision = {
  id: string;
  paragraphId: string;
  instruction: string;
  maxWords: number;
  before: string;
  after: string;
  answer: string;
  evidenceQuote: string;
  explanation: string;
  trap: string;
  errorCode: WordLimitErrorCode;
};

export type WordLimitTrainingPassage = MatchingHeadingsTrainingPassage & {
  decisions: WordLimitDecision[];
};

export type WordLimitLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  decisionIds?: string[];
  masteryScore: number;
};

export const WORD_LIMIT_STORAGE_KEY = 'welearn:ielts-reading:word-limit:v2';
export const WORD_LIMIT_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:word-limit:v1';
export const WORD_LIMIT_GUIDED_PASSAGE_ID = 'cooling-city-blocks';
export const WORD_LIMIT_INDEPENDENT_PASSAGE_ID = 'mangroves-after-storms';

const oneWord = 'ONE WORD ONLY';
const twoWords = 'NO MORE THAN TWO WORDS';

const DECISIONS: Record<string, WordLimitDecision[]> = {
  'cooling-city-blocks': [
    { id: 'cooling-limit-a', paragraphId: 'cooling-a', instruction: oneWord, maxWords: 1, before: 'Buildings can slow the release of heat after', after: '.', answer: 'sunset', evidenceQuote: 'Buildings can also slow the release of heat after sunset.', explanation: 'The one-word answer completes the time phrase and is copied exactly.', trap: '“After sunset” repeats after from the frame and exceeds ONE WORD ONLY.', errorCode: 'duplicate-frame-word' },
    { id: 'cooling-limit-b', paragraphId: 'cooling-b', instruction: oneWord, maxWords: 1, before: 'Leaves provide shade for walls and', after: '.', answer: 'pavements', evidenceQuote: 'Their leaves shade walls and pavements', explanation: 'The frame already supplies walls and, so only the second object is submitted.', trap: '“Walls and pavements” repeats words already present in the frame.', errorCode: 'duplicate-frame-word' },
    { id: 'cooling-limit-c', paragraphId: 'cooling-c', instruction: twoWords, maxWords: 2, before: 'A cool roof releases', after: 'more effectively than a conventional roof.', answer: 'absorbed heat', evidenceQuote: 'releases absorbed heat more effectively than a conventional roof', explanation: 'Both words are needed: heat alone loses the specific type of heat named in the passage.', trap: '“Heat” stays within the limit but is an incomplete evidence span.', errorCode: 'incomplete-span' },
    { id: 'cooling-limit-d', paragraphId: 'cooling-d', instruction: twoWords, maxWords: 2, before: 'A', after: 'can reveal which streets lack trees.', answer: 'canopy survey', evidenceQuote: 'A canopy survey can show which streets lack trees', explanation: 'The two-word noun phrase fits after the article and names the planning tool.', trap: '“Survey” is too broad; the passage specifies the kind of survey.', errorCode: 'incomplete-span' },
    { id: 'cooling-limit-e', paragraphId: 'cooling-e', instruction: twoWords, maxWords: 2, before: 'A practical plan must consider local budget and', after: '.', answer: 'maintenance capacity', evidenceQuote: 'according to local space, budget and maintenance capacity', explanation: 'The answer is the exact final item in the passage list and fits the two-word maximum.', trap: '“Local maintenance capacity” is three words and local is already supplied by the frame.', errorCode: 'over-limit' },
  ],
  'mangroves-after-storms': [
    { id: 'mangrove-limit-a', paragraphId: 'mangrove-a', instruction: twoWords, maxWords: 2, before: 'The risk became impossible to ignore after', after: '.', answer: 'consecutive hurricanes', evidenceQuote: 'consecutive hurricanes made the risk impossible to ignore', explanation: 'The exact two-word cause follows the time connector naturally.', trap: '“After consecutive hurricanes” repeats after and uses three submitted words.', errorCode: 'duplicate-frame-word' },
    { id: 'mangrove-limit-b', paragraphId: 'mangrove-b', instruction: twoWords, maxWords: 2, before: 'Dense roots interrupt water and reduce', after: '.', answer: 'wave energy', evidenceQuote: 'Dense roots interrupt moving water and reduce wave energy', explanation: 'The two-word object names exactly what the roots reduce.', trap: '“Energy” is grammatical but loses the specific wave relationship.', errorCode: 'incomplete-span' },
    { id: 'mangrove-limit-c', paragraphId: 'mangrove-c', instruction: twoWords, maxWords: 2, before: 'Teams may start restoration by reopening', after: '.', answer: 'water routes', evidenceQuote: 'begin by reopening water routes', explanation: 'The noun phrase completes by reopening and stays within the limit.', trap: '“Damaged water routes” adds an unsupported modifier and exceeds the evidence span.', errorCode: 'wrong-evidence' },
    { id: 'mangrove-limit-d', paragraphId: 'mangrove-d', instruction: oneWord, maxWords: 1, before: 'Paid experience can create a route into', after: '.', answer: 'employment', evidenceQuote: 'becomes a route into employment', explanation: 'Only the destination noun is required after into.', trap: '“Into employment” repeats into from the frame and violates ONE WORD ONLY.', errorCode: 'duplicate-frame-word' },
    { id: 'mangrove-limit-e', paragraphId: 'mangrove-e', instruction: twoWords, maxWords: 2, before: 'Mangrove habitat can store', after: 'and support fish and birds.', answer: 'coastal carbon', evidenceQuote: 'support fish and birds, store coastal carbon', explanation: 'The exact two-word environmental benefit fits the completed sentence.', trap: '“Carbon” is shorter but removes the passage’s coastal qualifier.', errorCode: 'incomplete-span' },
  ],
  'sleep-builds-memory': [
    { id: 'sleep-limit-a', paragraphId: 'sleep-a', instruction: oneWord, maxWords: 1, before: 'Although sleep looks passive, the brain remains', after: '.', answer: 'busy', evidenceQuote: 'the sleeping brain remains busy', explanation: 'Busy is the one-word complement required after remains.', trap: '“Remains busy” repeats the verb already in the frame.', errorCode: 'duplicate-frame-word' },
    { id: 'sleep-limit-b', paragraphId: 'sleep-b', instruction: oneWord, maxWords: 1, before: 'Adequate rest supports', after: 'and the first formation of memories.', answer: 'attention', evidenceQuote: 'Adequate rest supports attention and the first formation of memories.', explanation: 'The answer is the first object in the coordinated phrase.', trap: '“Attention and” copies a connector that already follows the gap.', errorCode: 'grammar-mismatch' },
    { id: 'sleep-limit-c', paragraphId: 'sleep-c', instruction: oneWord, maxWords: 1, before: 'Newly formed memories are reactivated and', after: '.', answer: 'stabilised', evidenceQuote: 'Newly formed memories are reactivated and stabilised', explanation: 'The past participle is parallel with reactivated and fits the grammar.', trap: '“Stabilisation” changes the grammatical form required after are.', errorCode: 'grammar-mismatch' },
    { id: 'sleep-limit-d', paragraphId: 'sleep-d', instruction: oneWord, maxWords: 1, before: 'Separate activation moments could reduce', after: '.', answer: 'interference', evidenceQuote: 'This separation could reduce interference', explanation: 'The noun is the direct object of reduce.', trap: '“Memory interference” is plausible but adds a word not present in the evidence sentence.', errorCode: 'wrong-evidence' },
    { id: 'sleep-limit-e', paragraphId: 'sleep-e', instruction: oneWord, maxWords: 1, before: 'Insufficient sleep may weaken later', after: '.', answer: 'recall', evidenceQuote: 'as well as later recall', explanation: 'Recall is the exact one-word outcome named in the final paragraph.', trap: '“Memory recall” exceeds the limit and is not the exact phrase in the passage.', errorCode: 'over-limit' },
  ],
  'citizens-do-science': [
    { id: 'citizen-limit-a', paragraphId: 'citizen-a', instruction: twoWords, maxWords: 2, before: 'Citizen-science projects distribute work among many', after: '.', answer: 'volunteers', evidenceQuote: 'divide that work among many volunteers', explanation: 'The plural noun completes the prepositional phrase.', trap: '“Many volunteers” repeats many from the frame.', errorCode: 'duplicate-frame-word' },
    { id: 'citizen-limit-b', paragraphId: 'citizen-b', instruction: twoWords, maxWords: 2, before: 'One project asks people to classify', after: 'on a laptop.', answer: 'galaxy images', evidenceQuote: 'classify galaxy images on a laptop', explanation: 'The two-word object identifies what participants classify.', trap: '“Images” alone removes the subject of the classification task.', errorCode: 'incomplete-span' },
    { id: 'citizen-limit-c', paragraphId: 'citizen-c', instruction: oneWord, maxWords: 1, before: 'Projects use fixed reporting', after: 'to make observations comparable.', answer: 'categories', evidenceQuote: 'fixed reporting categories', explanation: 'The noun completes the fixed reporting phrase.', trap: '“Reporting categories” repeats reporting and breaks ONE WORD ONLY.', errorCode: 'duplicate-frame-word' },
    { id: 'citizen-limit-d', paragraphId: 'citizen-d', instruction: twoWords, maxWords: 2, before: 'Computers may fail to recognise an unexpected shape or subtle', after: '.', answer: 'visual pattern', evidenceQuote: 'an unexpected shape or subtle visual pattern', explanation: 'The adjective and noun together preserve the passage meaning.', trap: '“Pattern” is grammatical but drops the contrastive visual detail.', errorCode: 'incomplete-span' },
    { id: 'citizen-limit-e', paragraphId: 'citizen-e', instruction: twoWords, maxWords: 2, before: 'Some volunteers have become co-authors of research', after: '.', answer: 'publications', evidenceQuote: 'co-authors of research publications', explanation: 'Only publications is missing because research is already in the frame.', trap: '“Research publications” duplicates research from the frame.', errorCode: 'duplicate-frame-word' },
  ],
  'keeping-seeds-useful': [
    { id: 'seed-limit-a', paragraphId: 'seed-a', instruction: oneWord, maxWords: 1, before: 'An uncommon variety may provide a response to drought or', after: '.', answer: 'disease', evidenceQuote: 'a useful response to drought, disease or a changing climate', explanation: 'The one-word answer is the second threat in the passage list.', trap: '“Changing climate” is a different list item and does not fit after or in this shortened frame.', errorCode: 'wrong-evidence' },
    { id: 'seed-limit-b', paragraphId: 'seed-b', instruction: oneWord, maxWords: 1, before: 'A record should identify the sample and its observed', after: '.', answer: 'characteristics', evidenceQuote: 'which characteristics have been observed', explanation: 'The plural noun completes observed characteristics naturally.', trap: '“Observed characteristics” repeats observed and exceeds the limit.', errorCode: 'duplicate-frame-word' },
    { id: 'seed-limit-c', paragraphId: 'seed-c', instruction: oneWord, maxWords: 1, before: 'Storage staff control moisture and', after: '.', answer: 'temperature', evidenceQuote: 'Staff control moisture and temperature', explanation: 'The coordinated one-word noun is copied exactly.', trap: '“Cold temperature” is not the exact coordinated phrase and adds an unnecessary modifier.', errorCode: 'wrong-evidence' },
    { id: 'seed-limit-d', paragraphId: 'seed-d', instruction: oneWord, maxWords: 1, before: 'Curators collect a fresh generation of', after: '.', answer: 'seed', evidenceQuote: 'collect a fresh generation of seed', explanation: 'Seed is the exact one-word object after of.', trap: '“Fresh seed” repeats fresh from the frame and changes the phrase boundary.', errorCode: 'duplicate-frame-word' },
    { id: 'seed-limit-e', paragraphId: 'seed-e', instruction: oneWord, maxWords: 1, before: 'Researchers compare traits and develop new', after: '.', answer: 'knowledge', evidenceQuote: 'compare traits and develop new knowledge', explanation: 'Knowledge completes the coordinated action and obeys ONE WORD ONLY.', trap: '“New knowledge” repeats new from the frame.', errorCode: 'duplicate-frame-word' },
  ],
  'night-trains-cross-borders': [
    { id: 'rail-limit-a', paragraphId: 'rail-a', instruction: twoWords, maxWords: 2, before: 'European institutions selected', after: 'to test cross-border links.', answer: 'pilot services', evidenceQuote: 'selected pilot services to test new or improved cross-border links', explanation: 'The exact two-word object fits before to test.', trap: '“Ten pilot services” imports a number from the source title, not this passage.', errorCode: 'wrong-evidence' },
    { id: 'rail-limit-b', paragraphId: 'rail-b', instruction: oneWord, maxWords: 1, before: 'New sleeper coaches require modern safety systems and', after: '.', answer: 'authorisation', evidenceQuote: 'New sleeper coaches need authorisation, modern safety systems', explanation: 'Authorisation is the remaining one-word requirement named in the passage.', trap: '“Official authorisation” uses two words even though this item says ONE WORD ONLY.', errorCode: 'instruction-misread' },
    { id: 'rail-limit-c', paragraphId: 'rail-c', instruction: twoWords, maxWords: 2, before: 'Cross-border routes require cooperation among', after: '.', answer: 'infrastructure managers', evidenceQuote: 'cooperation among infrastructure managers in several countries', explanation: 'The two-word group fits after among and names the responsible actors.', trap: '“Several infrastructure managers” changes the meaning; several describes countries in the passage.', errorCode: 'wrong-evidence' },
    { id: 'rail-limit-d', paragraphId: 'rail-d', instruction: oneWord, maxWords: 1, before: 'A journey involving several operators can be difficult to purchase as one', after: '.', answer: 'itinerary', evidenceQuote: 'difficult to compare or buy as one itinerary', explanation: 'The one-word noun completes the phrase as one itinerary.', trap: '“One itinerary” repeats one from the frame.', errorCode: 'duplicate-frame-word' },
    { id: 'rail-limit-e', paragraphId: 'rail-e', instruction: twoWords, maxWords: 2, before: 'The revival depends on how several elements', after: '.', answer: 'work together', evidenceQuote: 'depend on how those elements work together', explanation: 'The two-word verb phrase completes the embedded clause.', trap: '“Elements work together” repeats elements and uses three words.', errorCode: 'over-limit' },
  ],
};

export const WORD_LIMIT_PASSAGES: WordLimitTrainingPassage[] = MATCHING_HEADINGS_PASSAGES.map((passage) => ({
  ...passage,
  decisions: DECISIONS[passage.id] ?? [],
}));

export const WORD_LIMIT_LEVELS: WordLimitLevel[] = [
  { id: 'boundaries', title: 'Remove repeated frame words', focus: 'Answer boundaries', instruction: 'Copy only the words missing from the frame; do not repeat articles, connectors or modifiers already supplied.', passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'], decisionIds: ['sleep-limit-a', 'citizen-limit-c', 'seed-limit-d', 'rail-limit-d'], masteryScore: 3 },
  { id: 'grammar', title: 'Preserve grammar and meaning', focus: 'Smallest complete span', instruction: 'Choose the shortest literal span that remains grammatically natural and semantically complete.', passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'], decisionIds: ['sleep-limit-c', 'citizen-limit-d', 'seed-limit-b', 'rail-limit-c'], masteryScore: 3 },
  { id: 'sleep', title: 'Full set · Sleep and memory', focus: 'ONE WORD ONLY', instruction: 'Complete all five gaps before feedback opens.', passageIds: ['sleep-builds-memory'], masteryScore: 4 },
  { id: 'citizen', title: 'Full set · Citizen science', focus: 'One- and two-word limits', instruction: 'Read the instruction shown for every gap and copy only the missing span.', passageIds: ['citizens-do-science'], masteryScore: 4 },
  { id: 'seed', title: 'Paced set · Seed collections', focus: 'Target: seven minutes', instruction: 'Control evidence, grammar and answer boundaries under a one-word limit.', passageIds: ['keeping-seeds-useful'], masteryScore: 4 },
  { id: 'rail', title: 'Skill check · Night trains', focus: 'Controlled transfer', instruction: 'This measures word-limit control, not an IELTS band or secure exam result.', passageIds: ['night-trains-cross-borders'], masteryScore: 4 },
];

export function getWordLimitPassage(id: string) { return WORD_LIMIT_PASSAGES.find((passage) => passage.id === id); }

export function normalizeWordLimitAnswer(value: string) {
  return value.trim().normalize('NFKC').replace(/\s+/g, ' ').replace(/[.,;:!?]+$/u, '').toLowerCase();
}

export function countWordLimitWords(value: string) {
  const cleaned = normalizeWordLimitAnswer(value);
  return cleaned ? cleaned.split(' ').length : 0;
}
