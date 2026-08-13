import {
  IELTS_READING_MIXED_QUESTION_TYPE_SETS,
  type IeltsReadingMixedQuestionTypeSet,
} from './seo-catalog.ts';
import {
  SHORT_ANSWER_PASSAGES,
  type ShortAnswerTrainingPassage,
} from './ielts-reading-short-answer-progress.ts';

export type MixedResponseKind = 'choice' | 'text';
export type MixedErrorCode =
  | 'wrong-format'
  | 'wrong-scope'
  | 'wrong-location'
  | 'paraphrase-miss'
  | 'word-limit'
  | 'grammar-mismatch';

export type MixedPracticeTask = {
  id: string;
  questionType: string;
  route: string;
  instruction: string;
  prompt: string;
  responseKind: MixedResponseKind;
  options?: string[];
  answer: string;
  alternatives: string[];
  maxWords?: number;
  evidenceQuote: string;
  explanation: string;
  trap: string;
  supportSkill: string;
  errorCode: MixedErrorCode;
};

export type MixedPracticePassage = {
  id: string;
  title: string;
  paragraphs: { id: string; text: string }[];
  sourceUrl: string;
  sourceNote: string;
  tasks: MixedPracticeTask[];
};

export type MixedPracticeLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  taskIds: string[];
  masteryScore: number;
};

export const MIXED_PRACTICE_STORAGE_KEY = 'welearn:ielts-reading:mixed-practice:v1';
export const MIXED_PRACTICE_GUIDED_PASSAGE_ID = 'mixed-campus-water';
export const MIXED_PRACTICE_INDEPENDENT_PASSAGE_ID = 'mixed-museum-audio';
export const IELTS_READING_OFFICIAL_FORMAT_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

export function normalizeMixedAnswer(value: string) {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/[.,;:!?]+$/gu, '')
    .replace(/\s+/gu, ' ');
}

export function countMixedAnswerWords(value: string) {
  const normalized = normalizeMixedAnswer(value);
  return normalized ? normalized.split(' ').length : 0;
}

export function isMixedTaskCorrect(task: MixedPracticeTask, value: string) {
  if (task.responseKind === 'text' && task.maxWords && countMixedAnswerWords(value) > task.maxWords) return false;
  const accepted = [task.answer, ...task.alternatives].map(normalizeMixedAnswer);
  return accepted.includes(normalizeMixedAnswer(value));
}

function legacyPassage(id: string) {
  const passage = IELTS_READING_MIXED_QUESTION_TYPE_SETS.find((item) => item.id === id);
  if (!passage) throw new Error(`Missing legacy mixed passage ${id}`);
  return passage;
}

function shortPassage(id: string) {
  const passage = SHORT_ANSWER_PASSAGES.find((item) => item.id === id);
  if (!passage) throw new Error(`Missing Short Answer source passage ${id}`);
  return passage;
}

function originalParagraphs(source: IeltsReadingMixedQuestionTypeSet) {
  return source.passage.map((paragraph) => ({ id: paragraph.id, text: paragraph.text }));
}

function dividedParagraphs(source: ShortAnswerTrainingPassage) {
  return source.passage.split(/\n\s*\n/u).map((text, index) => ({
    id: String.fromCharCode(65 + index),
    text,
  }));
}

const campus = legacyPassage('ielts-mixed-campus-water');
const museum = legacyPassage('ielts-mixed-museum-audio');
const rooftop = legacyPassage('ielts-mixed-urban-farming');
const compost = shortPassage('short-answer-community-compost');
const seeds = shortPassage('short-keeping-seeds-useful');
const citizenScience = shortPassage('short-citizens-do-science');

const originalBoundary =
  'This is an original WeLearn composite written for guided transfer practice. The official IELTS page defines the task families, but it does not verify the fictional scenario or license the WeLearn wording. WeLearn is authorised to publish this practice passage.';

export const MIXED_PRACTICE_PASSAGES: MixedPracticePassage[] = [
  {
    id: MIXED_PRACTICE_GUIDED_PASSAGE_ID,
    title: campus.passageTitle,
    paragraphs: originalParagraphs(campus),
    sourceUrl: IELTS_READING_OFFICIAL_FORMAT_URL,
    sourceNote: originalBoundary,
    tasks: [
      {
        id: 'mixed-campus-01',
        questionType: 'Short-answer Questions',
        route: '/practica/ielts/reading/tipos-de-preguntas/short-answer',
        instruction: 'NO MORE THAN FOUR WORDS',
        prompt: 'Which two buildings received the first water stations?',
        responseKind: 'text',
        answer: 'library and sports centre',
        alternatives: ['the library and sports centre'],
        maxWords: 4,
        evidenceQuote: 'The first stations were placed near the library and sports centre',
        explanation: 'The question asks for two places. Copy the smallest span that names both buildings.',
        trap: 'Lecture halls appear later as a delayed plan, not as locations that received the first stations.',
        supportSkill: 'Scan for the noun “stations”, then verify the two coordinated place names.',
        errorCode: 'wrong-location',
      },
      {
        id: 'mixed-campus-02',
        questionType: 'True/False/Not Given',
        route: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given',
        instruction: 'Choose TRUE, FALSE or NOT GIVEN.',
        prompt: 'Bottle sales fell equally in the sports centre cafe and the library.',
        responseKind: 'choice',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        answer: 'FALSE',
        alternatives: [],
        evidenceQuote: 'the effect in the library was smaller than expected',
        explanation: '“Equally” conflicts with the explicit comparison: the library effect was smaller.',
        trap: 'Both locations had an effect, but shared direction does not mean equal size.',
        supportSkill: 'Control the quantifier and compare the complete relationship.',
        errorCode: 'wrong-scope',
      },
      {
        id: 'mixed-campus-03',
        questionType: 'Matching Information',
        route: '/practica/ielts/reading/tipos-de-preguntas/matching-information',
        instruction: 'Choose the paragraph, A–C.',
        prompt: 'Which paragraph mentions postponing an expansion of the project?',
        responseKind: 'choice',
        options: ['A', 'B', 'C'],
        answer: 'C',
        alternatives: [],
        evidenceQuote: 'They also delayed plans for new stations in lecture halls',
        explanation: '“Postponing an expansion” paraphrases delaying plans for new stations.',
        trap: 'Paragraph A explains the first installation, not the postponed expansion.',
        supportSkill: 'Scan for the action, then match the paraphrase rather than one repeated noun.',
        errorCode: 'paraphrase-miss',
      },
      {
        id: 'mixed-campus-04',
        questionType: 'Summary Completion',
        route: '/practica/ielts/reading/tipos-de-preguntas/summary-completion',
        instruction: 'NO MORE THAN TWO WORDS',
        prompt: 'Before expanding, the university decided to review ___ from the first two sites.',
        responseKind: 'text',
        answer: 'usage data',
        alternatives: [],
        maxWords: 2,
        evidenceQuote: 'usage data from the first two sites could be reviewed',
        explanation: 'The completed summary is grammatical and uses the exact two-word passage span.',
        trap: 'The waste audit and foot traffic influenced the first installation, not the later review.',
        supportSkill: 'Use the summary sequence to locate the final paragraph and check grammar.',
        errorCode: 'word-limit',
      },
      {
        id: 'mixed-campus-05',
        questionType: 'Multiple Choice',
        route: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice',
        instruction: 'Choose the best answer, A–C.',
        prompt: 'Why was the library result weaker than expected?',
        responseKind: 'choice',
        options: [
          'Students often brought drinks bought off campus.',
          'The nearest refill point was difficult to find.',
          'The library had less foot traffic than lecture halls.',
        ],
        answer: 'Students often brought drinks bought off campus.',
        alternatives: [],
        evidenceQuote: 'students often arrived at the library with drinks already purchased from shops outside the campus',
        explanation: 'The answer preserves the cause given in the interviews.',
        trap: 'Signs were added later, but the passage does not say poor signage caused the weaker result.',
        supportSkill: 'Read the causal sentence around the result, not just the sentence with the outcome.',
        errorCode: 'wrong-location',
      },
      {
        id: 'mixed-campus-06',
        questionType: 'Matching Headings',
        route: '/practica/ielts/reading/tipos-de-preguntas/matching-headings',
        instruction: 'Choose the best heading for Paragraph C.',
        prompt: 'Which heading captures the whole paragraph?',
        responseKind: 'choice',
        options: [
          'Replacing every campus shop',
          'A campaign with no measurement',
          'Promoting the scheme while delaying expansion',
        ],
        answer: 'Promoting the scheme while delaying expansion',
        alternatives: [],
        evidenceQuote: 'added signs ... asked lecturers ... delayed plans for new stations',
        explanation: 'The heading covers both actions: promotion now and evidence-led expansion later.',
        trap: 'A heading about signs alone would cover only one supporting detail.',
        supportSkill: 'Name the paragraph’s job before comparing headings.',
        errorCode: 'wrong-format',
      },
    ],
  },
  {
    id: MIXED_PRACTICE_INDEPENDENT_PASSAGE_ID,
    title: museum.passageTitle,
    paragraphs: originalParagraphs(museum),
    sourceUrl: IELTS_READING_OFFICIAL_FORMAT_URL,
    sourceNote: originalBoundary,
    tasks: [
      {
        id: 'mixed-museum-01',
        questionType: 'Yes/No/Not Given',
        route: '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given',
        instruction: 'Choose YES, NO or NOT GIVEN.',
        prompt: 'The museum director believes recorded voices can make a visit feel more personal.',
        responseKind: 'choice', options: ['YES', 'NO', 'NOT GIVEN'], answer: 'YES', alternatives: [],
        evidenceQuote: 'She argued that recorded voices could make the visit more personal',
        explanation: 'The statement accurately represents the director’s stated view.',
        trap: 'Some staff held the opposite view; the question specifically attributes the claim to the director.',
        supportSkill: 'Track whose opinion the statement reports.', errorCode: 'wrong-scope',
      },
      {
        id: 'mixed-museum-02', questionType: 'Matching Features', route: '/practica/ielts/reading/tipos-de-preguntas/matching-features',
        instruction: 'Choose the group linked to the result.', prompt: 'Which group spent longer in the textile room?',
        responseKind: 'choice', options: ['International visitors', 'Families', 'Museum staff'], answer: 'Families', alternatives: [],
        evidenceQuote: 'families spent longer in the textile room', explanation: 'The named group is linked directly to the measured behaviour.',
        trap: 'International visitors are connected to vocabulary, not time in the textile room.', supportSkill: 'Scan by feature name, then verify its linked outcome.', errorCode: 'wrong-location',
      },
      {
        id: 'mixed-museum-03', questionType: 'Multiple Choice', route: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice',
        instruction: 'Choose the best answer, A–C.', prompt: 'Why were the devices less useful in crowded rooms?', responseKind: 'choice',
        options: ['Recordings were too fast.', 'Background noise made instructions hard to hear.', 'Visitors refused to borrow them.'],
        answer: 'Background noise made instructions hard to hear.', alternatives: [], evidenceQuote: 'background noise made the instructions difficult to hear',
        explanation: 'The option is a direct paraphrase of the stated cause.', trap: 'Slower recordings helped international visitors; speed was not the problem.',
        supportSkill: 'Match cause to effect across the full option.', errorCode: 'paraphrase-miss',
      },
      {
        id: 'mixed-museum-04', questionType: 'Matching Headings', route: '/practica/ielts/reading/tipos-de-preguntas/matching-headings',
        instruction: 'Choose the best heading for Paragraph B.', prompt: 'Which heading captures the paragraph’s central contrast?', responseKind: 'choice',
        options: ['The cost of museum devices', 'A concern and a different view', 'Survey results from visitors'],
        answer: 'A concern and a different view', alternatives: [], evidenceQuote: 'Some staff feared ... The director disagreed',
        explanation: 'The paragraph is organised around a concern and the director’s counter-position.', trap: 'Survey results belong to Paragraph C.',
        supportSkill: 'Compress the paragraph into one function.', errorCode: 'wrong-format',
      },
      {
        id: 'mixed-museum-05', questionType: 'Short-answer Questions', route: '/practica/ielts/reading/tipos-de-preguntas/short-answer',
        instruction: 'ONE WORD ONLY', prompt: 'Where could visitors borrow the audio guides?', responseKind: 'text', answer: 'entrance', alternatives: [], maxWords: 1,
        evidenceQuote: 'visitors could borrow at the entrance', explanation: 'The question asks for a place and the smallest exact span is one word.',
        trap: 'Curators created recordings; they are not a place where devices were borrowed.', supportSkill: 'Predict a place before scanning.', errorCode: 'wrong-format',
      },
      {
        id: 'mixed-museum-06', questionType: 'Sentence Completion', route: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion',
        instruction: 'NO MORE THAN TWO WORDS', prompt: 'Slower recordings helped some visitors understand ___.', responseKind: 'text', answer: 'technical vocabulary', alternatives: [], maxWords: 2,
        evidenceQuote: 'slower recordings helped them understand technical vocabulary', explanation: 'The exact two-word span completes the sentence naturally.',
        trap: '“International visitors” identifies the group, not what they understood.', supportSkill: 'Check both meaning and grammar at the blank.', errorCode: 'grammar-mismatch',
      },
    ],
  },
  {
    id: 'mixed-rooftop-gardens', title: rooftop.passageTitle, paragraphs: originalParagraphs(rooftop), sourceUrl: IELTS_READING_OFFICIAL_FORMAT_URL, sourceNote: originalBoundary,
    tasks: [
      { id: 'mixed-rooftop-01', questionType: 'Diagram Label Completion', route: '/practica/ielts/reading/tipos-de-preguntas/diagram-labeling', instruction: 'ONE WORD ONLY', prompt: 'Which component monitors soil moisture?', responseKind: 'text', answer: 'sensors', alternatives: [], maxWords: 1, evidenceQuote: 'sensors monitor soil moisture', explanation: 'The component and its function form an exact label relationship.', trap: 'Containers hold the plants; membranes waterproof the roof.', supportSkill: 'Map the functional description to the correct component.', errorCode: 'wrong-location' },
      { id: 'mixed-rooftop-02', questionType: 'Sentence Completion', route: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion', instruction: 'ONE WORD ONLY', prompt: 'The main value of rooftop gardens is ___.', responseKind: 'text', answer: 'educational', alternatives: [], maxWords: 1, evidenceQuote: 'Their main value is educational', explanation: 'The adjective completes the sentence and preserves the passage claim.', trap: '“Structural” describes an inspection, not the main value.', supportSkill: 'Use grammar to predict an adjective, then verify meaning.', errorCode: 'grammar-mismatch' },
      { id: 'mixed-rooftop-03', questionType: 'Flow-chart Completion', route: '/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion', instruction: 'NO MORE THAN TWO WORDS', prompt: 'Arrange containers → add compost and seedlings → create a ___.', responseKind: 'text', answer: 'maintenance rota', alternatives: [], maxWords: 2, evidenceQuote: 'The final stage is a maintenance rota', explanation: 'The final node follows the explicit sequence in Paragraph C.', trap: 'A structural survey starts the process; it is not the final stage.', supportSkill: 'Follow sequence markers before copying the final node.', errorCode: 'wrong-location' },
      { id: 'mixed-rooftop-04', questionType: 'Matching Sentence Endings', route: '/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings', instruction: 'Choose the best ending.', prompt: 'Older roofs must be inspected before…', responseKind: 'choice', options: ['containers are installed.', 'vegetables supply a neighbourhood.', 'volunteers monitor every sensor.'], answer: 'containers are installed.', alternatives: [], evidenceQuote: 'older roofs must be inspected before containers are installed', explanation: 'The ending preserves both grammar and the condition in the passage.', trap: 'A grammatically possible ending is not enough without the same relationship.', supportSkill: 'Test grammar, logic and evidence together.', errorCode: 'grammar-mismatch' },
      { id: 'mixed-rooftop-05', questionType: 'Note Completion', route: '/practica/ielts/reading/tipos-de-preguntas/note-completion', instruction: 'NO MORE THAN TWO WORDS', prompt: 'First project check: conduct a ___.', responseKind: 'text', answer: 'structural survey', alternatives: [], maxWords: 2, evidenceQuote: 'begins with a structural survey', explanation: 'The note compresses the first stage into a noun phrase.', trap: 'Membrane repairs happen only if leaks are found.', supportSkill: 'Use the note heading and order to find the correct stage.', errorCode: 'word-limit' },
      { id: 'mixed-rooftop-06', questionType: 'Table Completion', route: '/practica/ielts/reading/tipos-de-preguntas/table-completion', instruction: 'NO MORE THAN TWO WORDS', prompt: 'Component: sensors · Measurement: ___.', responseKind: 'text', answer: 'soil moisture', alternatives: [], maxWords: 2, evidenceQuote: 'sensors monitor soil moisture', explanation: 'The table cell requires the measured quantity, not the component.', trap: '“Irrigation” is the later action informed by the measurement.', supportSkill: 'Use row and column headings to predict the answer category.', errorCode: 'wrong-format' },
    ],
  },
  {
    id: 'mixed-community-compost', title: compost.title, paragraphs: dividedParagraphs(compost), sourceUrl: compost.sourceUrl, sourceNote: compost.sourceNote,
    tasks: [
      { id: 'mixed-compost-01', questionType: 'Multiple Choice', route: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice', instruction: 'Choose the best answer, A–C.', prompt: 'Why do volunteers add dry material?', responseKind: 'choice', options: ['To stop the mixture becoming too wet.', 'To attract useful animals.', 'To remove glass by hand.'], answer: 'To stop the mixture becoming too wet.', alternatives: [], evidenceQuote: 'This prevents the mixture from becoming too wet', explanation: 'The option expresses the purpose given immediately after the action.', trap: 'Glass removal occurs after contamination; it is not the purpose of dry material.', supportSkill: 'Read the whole cause-purpose pair.', errorCode: 'wrong-location' },
      { id: 'mixed-compost-02', questionType: 'True/False/Not Given', route: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given', instruction: 'Choose TRUE, FALSE or NOT GIVEN.', prompt: 'Meat is normally accepted at community compost stations.', responseKind: 'choice', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', alternatives: [], evidenceQuote: 'meat, dairy products and oily food are rejected', explanation: '“Accepted” is directly contradicted by “rejected”.', trap: 'The statement is not merely absent; the passage states the opposite.', supportSkill: 'Look for the exact policy polarity.', errorCode: 'wrong-scope' },
      { id: 'mixed-compost-03', questionType: 'Matching Information', route: '/practica/ielts/reading/tipos-de-preguntas/matching-information', instruction: 'Choose the paragraph, A–E.', prompt: 'Which paragraph explains how finished compost may be used?', responseKind: 'choice', options: ['A', 'B', 'C', 'D', 'E'], answer: 'D', alternatives: [], evidenceQuote: 'give it to residents for balcony plants, while others use it in nearby gardens', explanation: 'Paragraph D names two destinations for finished compost.', trap: 'Paragraph C explains the decomposition process, not later use.', supportSkill: 'Scan for the idea “used”, not only the repeated word “compost”.', errorCode: 'paraphrase-miss' },
      { id: 'mixed-compost-04', questionType: 'Summary Completion', route: '/practica/ielts/reading/tipos-de-preguntas/summary-completion', instruction: 'NO MORE THAN TWO WORDS', prompt: 'Residents can consult a ___ before adding waste.', responseKind: 'text', answer: 'picture guide', alternatives: [], maxWords: 2, evidenceQuote: 'display a picture guide near the lid', explanation: 'The summary changes “check quickly” into “consult” but preserves the object.', trap: 'The lid is the guide’s location, not the information resource.', supportSkill: 'Track the paraphrase and copy only the required noun phrase.', errorCode: 'paraphrase-miss' },
      { id: 'mixed-compost-05', questionType: 'Note Completion', route: '/practica/ielts/reading/tipos-de-preguntas/note-completion', instruction: 'ONE WORD ONLY', prompt: 'Turning the pile introduces: ___.', responseKind: 'text', answer: 'oxygen', alternatives: [], maxWords: 1, evidenceQuote: 'turned with a fork every few days to bring in oxygen', explanation: 'The note label asks for what is introduced by turning.', trap: 'A fork is the tool; oxygen is the substance brought into the pile.', supportSkill: 'Use the note label to distinguish tool from result.', errorCode: 'wrong-format' },
      { id: 'mixed-compost-06', questionType: 'Matching Headings', route: '/practica/ielts/reading/tipos-de-preguntas/matching-headings', instruction: 'Choose the best heading for Paragraph E.', prompt: 'Which heading captures both the benefit and its condition?', responseKind: 'choice', options: ['The commercial price of finished compost', 'Useful compost depends on clean inputs', 'Why every station needs more volunteers'], answer: 'Useful compost depends on clean inputs', alternatives: [], evidenceQuote: 'reduces waste sent to landfill, but only if people follow instructions', explanation: 'The paragraph links a benefit to the condition that contaminants stay out.', trap: 'Volunteer work is a consequence of contamination, not the whole paragraph’s main idea.', supportSkill: 'Cover the paragraph’s contrast, not one concrete detail.', errorCode: 'wrong-format' },
    ],
  },
  {
    id: 'mixed-seed-collection', title: seeds.title, paragraphs: dividedParagraphs(seeds), sourceUrl: seeds.sourceUrl, sourceNote: seeds.sourceNote,
    tasks: [
      { id: 'mixed-seeds-01', questionType: 'Short-answer Questions', route: '/practica/ielts/reading/tipos-de-preguntas/short-answer', instruction: 'ONE WORD ONLY', prompt: 'What threat could an uncommon variety respond to besides drought?', responseKind: 'text', answer: 'disease', alternatives: [], maxWords: 1, evidenceQuote: 'a useful response to drought, disease or a changing climate', explanation: 'The question asks for one other threat and the passage supplies one exact noun.', trap: 'Climate is mentioned, but the requested item sits between drought and climate.', supportSkill: 'Predict a threat noun, then scan the list.', errorCode: 'wrong-location' },
      { id: 'mixed-seeds-02', questionType: 'Yes/No/Not Given', route: '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given', instruction: 'Choose YES, NO or NOT GIVEN.', prompt: 'The writer considers seed preservation merely an exercise in nostalgia.', responseKind: 'choice', options: ['YES', 'NO', 'NOT GIVEN'], answer: 'NO', alternatives: [], evidenceQuote: 'Preserving genetic diversity is therefore not nostalgia', explanation: 'The writer explicitly rejects the view in the statement.', trap: 'This is the writer’s evaluation, so the correct label family is Yes/No/Not Given.', supportSkill: 'Identify the authorial stance and the negation.', errorCode: 'wrong-scope' },
      { id: 'mixed-seeds-03', questionType: 'Matching Information', route: '/practica/ielts/reading/tipos-de-preguntas/matching-information', instruction: 'Choose the paragraph, A–E.', prompt: 'Which paragraph explains why information about a sample matters?', responseKind: 'choice', options: ['A', 'B', 'C', 'D', 'E'], answer: 'B', alternatives: [], evidenceQuote: 'Data turns stored material into a resource that another researcher can understand', explanation: 'Paragraph B explains the function of the record attached to the seed.', trap: 'Paragraph C describes physical storage conditions, not information quality.', supportSkill: 'Match the abstract function “why information matters”.', errorCode: 'paraphrase-miss' },
      { id: 'mixed-seeds-04', questionType: 'Table Completion', route: '/practica/ielts/reading/tipos-de-preguntas/table-completion', instruction: 'ONE WORD ONLY', prompt: 'Storage control · moisture and ___.', responseKind: 'text', answer: 'temperature', alternatives: [], maxWords: 1, evidenceQuote: 'Staff control moisture and temperature', explanation: 'The table row supplies one member of an explicit pair.', trap: 'Containers are inspected, but they are not the second controlled condition.', supportSkill: 'Use the row category before copying the paired noun.', errorCode: 'wrong-format' },
      { id: 'mixed-seeds-05', questionType: 'Flow-chart Completion', route: '/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion', instruction: 'NO MORE THAN TWO WORDS', prompt: 'Low germination → plant remaining stock → collect a ___.', responseKind: 'text', answer: 'fresh generation', alternatives: [], maxWords: 2, evidenceQuote: 'collect a fresh generation of seed', explanation: 'The flow node follows the described regeneration sequence.', trap: 'The original material is what the renewed sample must represent, not what curators collect.', supportSkill: 'Follow the sequence and preserve the noun phrase.', errorCode: 'word-limit' },
      { id: 'mixed-seeds-06', questionType: 'Matching Sentence Endings', route: '/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings', instruction: 'Choose the best ending.', prompt: 'Access to a seed collection…', responseKind: 'choice', options: ['stops every form of biological change.', 'gives preservation a practical purpose.', 'removes the need for reliable records.'], answer: 'gives preservation a practical purpose.', alternatives: [], evidenceQuote: 'access gives preservation a practical purpose', explanation: 'The ending states the conclusion of the final paragraph.', trap: 'The passage explicitly rejects the idea that cold storage stops every change.', supportSkill: 'Check the completed sentence against the final claim.', errorCode: 'wrong-scope' },
    ],
  },
  {
    id: 'mixed-citizen-science', title: citizenScience.title, paragraphs: dividedParagraphs(citizenScience), sourceUrl: citizenScience.sourceUrl, sourceNote: citizenScience.sourceNote,
    tasks: [
      { id: 'mixed-citizen-01', questionType: 'Multiple Choice', route: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice', instruction: 'Choose the best answer, A–C.', prompt: 'Why can a very large group of volunteers be useful?', responseKind: 'choice', options: ['Every volunteer produces perfect observations.', 'Combined reports reveal large-scale patterns.', 'Computers cannot scan large datasets.'], answer: 'Combined reports reveal large-scale patterns.', alternatives: [], evidenceQuote: 'thousands of reports can reveal patterns across a wide area', explanation: 'The answer captures the scale benefit without exaggerating accuracy.', trap: 'The passage explicitly says projects do not pretend every observation is perfect.', supportSkill: 'Reject absolute distractors and preserve the causal claim.', errorCode: 'wrong-scope' },
      { id: 'mixed-citizen-02', questionType: 'True/False/Not Given', route: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given', instruction: 'Choose TRUE, FALSE or NOT GIVEN.', prompt: 'Every citizen-science task requires specialist knowledge.', responseKind: 'choice', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', alternatives: [], evidenceQuote: 'many are designed for beginners using devices they already own', explanation: '“Every” is contradicted by the explicit existence of many beginner tasks.', trap: 'Some tasks do need specialist knowledge, but “some” cannot support “every”.', supportSkill: 'Control the universal quantifier.', errorCode: 'wrong-scope' },
      { id: 'mixed-citizen-03', questionType: 'Matching Features', route: '/practica/ielts/reading/tipos-de-preguntas/matching-features', instruction: 'Choose the device linked to the activity.', prompt: 'Reporting rain or snow', responseKind: 'choice', options: ['A telescope', 'A phone', 'A laboratory computer'], answer: 'A phone', alternatives: [], evidenceQuote: 'another uses a phone to report rain or snow', explanation: 'The activity is linked directly to the phone in Paragraph B.', trap: 'A telescope is only an example of specialist equipment used by some tasks.', supportSkill: 'Scan for the feature, then verify its associated action.', errorCode: 'wrong-location' },
      { id: 'mixed-citizen-04', questionType: 'Sentence Completion', route: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion', instruction: 'NO MORE THAN THREE WORDS', prompt: 'Projects make observations comparable by using instructions, examples and ___.', responseKind: 'text', answer: 'fixed reporting categories', alternatives: [], maxWords: 3, evidenceQuote: 'provide instructions, examples and fixed reporting categories', explanation: 'The parallel list predicts a plural noun phrase and the exact span fits.', trap: 'Repeated checks are a later quality-control method, not the third item in this list.', supportSkill: 'Use parallel grammar to predict the missing phrase.', errorCode: 'grammar-mismatch' },
      { id: 'mixed-citizen-05', questionType: 'Summary Completion', route: '/practica/ielts/reading/tipos-de-preguntas/summary-completion', instruction: 'NO MORE THAN TWO WORDS', prompt: 'In some projects, computation and ___ perform different parts of one investigation.', responseKind: 'text', answer: 'human judgement', alternatives: [], maxWords: 2, evidenceQuote: 'human judgement and computation perform different parts', explanation: 'The summary reverses the order of the coordinated pair but preserves the relationship.', trap: '“Automated searches” are improved later; they are not the human contribution.', supportSkill: 'Track the paraphrase across a reversed coordination.', errorCode: 'paraphrase-miss' },
      { id: 'mixed-citizen-06', questionType: 'Matching Headings', route: '/practica/ielts/reading/tipos-de-preguntas/matching-headings', instruction: 'Choose the best heading for Paragraph E.', prompt: 'Which heading covers the scientific and participant outcomes?', responseKind: 'choice', options: ['Why expert review is no longer required', 'Evidence for science and learning for volunteers', 'A guarantee of publication for every participant'], answer: 'Evidence for science and learning for volunteers', alternatives: [], evidenceQuote: 'useful evidence for science ... build observation skills and a closer understanding', explanation: 'The heading covers both outcome groups in the paragraph.', trap: 'The paragraph explicitly says expert review is still needed.', supportSkill: 'Choose the heading with the right breadth and scope.', errorCode: 'wrong-format' },
    ],
  },
];

const ENGINE_PASSAGE_IDS = new Set([
  'mixed-rooftop-gardens',
  'mixed-community-compost',
  'mixed-seed-collection',
  'mixed-citizen-science',
]);

const engineTasks = MIXED_PRACTICE_PASSAGES
  .filter((passage) => ENGINE_PASSAGE_IDS.has(passage.id))
  .flatMap((passage) => passage.tasks);

function taskIds(...ids: string[]) {
  return ids;
}

export const MIXED_PRACTICE_LEVELS: MixedPracticeLevel[] = [
  {
    id: 'mixed-level-1', title: 'Name the decision', focus: 'task recognition',
    instruction: 'Switch among evidence state, location, completion and main-idea decisions. Use the instruction before the topic.',
    taskIds: taskIds('mixed-compost-02', 'mixed-compost-03', 'mixed-rooftop-02', 'mixed-citizen-06'), masteryScore: 3,
  },
  {
    id: 'mixed-level-2', title: 'Control scope', focus: 'scope and attribution',
    instruction: 'Track quantifiers, polarity and whose view is being tested before selecting a response.',
    taskIds: taskIds('mixed-seeds-02', 'mixed-citizen-01', 'mixed-citizen-02', 'mixed-seeds-06'), masteryScore: 3,
  },
  {
    id: 'mixed-level-3', title: 'Control the blank', focus: 'grammar and word limits',
    instruction: 'Use the frame to predict answer shape, then copy the smallest exact span within the displayed limit.',
    taskIds: taskIds('mixed-rooftop-03', 'mixed-rooftop-05', 'mixed-seeds-04', 'mixed-citizen-04'), masteryScore: 3,
  },
  {
    id: 'mixed-level-4', title: 'Rooftop transfer', focus: 'six-format set',
    instruction: 'Complete one full passage moving through diagram, sentence, flow-chart, sentence-ending, note and table tasks.',
    taskIds: engineTasks.filter((task) => task.id.startsWith('mixed-rooftop-')).map((task) => task.id), masteryScore: 5,
  },
  {
    id: 'mixed-level-5', title: 'Compost transfer', focus: 'six-format set',
    instruction: 'Complete the full passage without opening feedback until every response is ready.',
    taskIds: engineTasks.filter((task) => task.id.startsWith('mixed-compost-')).map((task) => task.id), masteryScore: 5,
  },
  {
    id: 'mixed-level-6', title: 'Two-passage mastery', focus: 'twelve mixed decisions',
    instruction: 'Transfer across two unfamiliar passages and six task families per passage in one held-back submission.',
    taskIds: engineTasks.filter((task) => task.id.startsWith('mixed-seeds-') || task.id.startsWith('mixed-citizen-')).map((task) => task.id), masteryScore: 10,
  },
];

export function getMixedPracticePassage(id: string) {
  return MIXED_PRACTICE_PASSAGES.find((passage) => passage.id === id);
}

export function getMixedPracticeTask(id: string) {
  for (const passage of MIXED_PRACTICE_PASSAGES) {
    const task = passage.tasks.find((item) => item.id === id);
    if (task) return { passage, task };
  }
  return undefined;
}
