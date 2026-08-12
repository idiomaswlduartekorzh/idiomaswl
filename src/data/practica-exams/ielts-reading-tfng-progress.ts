import { IELTS_TFNG_PRACTICE_SETS } from './seo-catalog.ts';
import { MATCHING_HEADINGS_PASSAGES } from './ielts-reading-matching-headings-progress.ts';

export type TfngAnswer = 'TRUE' | 'FALSE' | 'NOT GIVEN';
export type TfngErrorCode = 'paraphrase-missed' | 'opposite-not-proved' | 'silence-misclassified' | 'quantifier-shift' | 'time-or-degree-shift' | 'outside-knowledge';
export type TfngDecision = { id: string; statement: string; answer: TfngAnswer; evidence: string; explanation: string; trap: string; errorCode: TfngErrorCode };
export type TfngTrainingPassage = { id: string; title: string; paragraphs: Array<{ id: string; label: string; text: string }>; sourceUrl: string; sourceNote: string; decisions: TfngDecision[] };
export type TfngLevel = { id: string; title: string; focus: string; instruction: string; passageIds: string[]; decisionIds?: string[]; masteryScore: number };

export const TFNG_STORAGE_KEY = 'welearn:ielts-reading:true-false-not-given:v2';
export const TFNG_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:true-false-not-given:v1';
export const TFNG_GUIDED_PASSAGE_ID = 'tfng-urban-trees';
export const TFNG_INDEPENDENT_PASSAGE_ID = 'tfng-school-libraries';
export const TFNG_OPTIONS: TfngAnswer[] = ['TRUE', 'FALSE', 'NOT GIVEN'];

function splitParagraphs(id: string, passage: string) { return passage.split(/\n\n+/).map((text, index) => ({ id: `${id}-p${index + 1}`, label: `Paragraph ${String.fromCharCode(65 + index)}`, text })); }

const sourceMeta: Record<string, { sourceUrl: string; sourceNote: string }> = {
  'tfng-set-urban-trees': { sourceUrl: 'https://www.epa.gov/heatislands/using-trees-and-vegetation-reduce-heat-islands', sourceNote: 'WeLearn training passage grounded in EPA explanations of trees, shade, evapotranspiration and urban heat. The source supports the topic; it does not certify the questions.' },
  'tfng-set-school-libraries': { sourceUrl: 'https://www.imls.gov/our-work/libraries', sourceNote: 'WeLearn composite training passage about extended library access. It is not a report about one named school or an official IELTS item.' },
  'tfng-set-coastal-paths': { sourceUrl: 'https://coast.noaa.gov/states/fast-facts/natural-infrastructure.html', sourceNote: 'WeLearn composite training passage grounded in public coastal-resilience guidance. The named town and programme are teaching constructs.' },
};

const evidence: Record<string, string> = {
  'tfng-urban-trees-01': 'For many years, urban planners treated city trees mainly as decoration.',
  'tfng-urban-trees-02': 'Trees can lower surface temperatures by providing shade and by releasing moisture through transpiration.',
  'tfng-urban-trees-04': 'lower-income areas may have fewer trees and more exposed concrete',
  'tfng-urban-trees-07': 'the wrong species can damage sidewalks or require too much water',
  'tfng-urban-trees-08': 'Successful urban forestry programs usually combine tree planting with maintenance budgets, community participation and careful species selection.',
  'tfng-libraries-01': 'The decision was not only intended to help students borrow books.',
  'tfng-libraries-02': 'some pupils needed a quiet place to complete assignments before travelling home, especially those who shared bedrooms with younger siblings',
  'tfng-libraries-03': 'In the second term, trained volunteers and senior students helped with basic supervision, while teachers remained available only on two afternoons each week.',
  'tfng-libraries-05': 'No final decision about Saturdays had been made by the end of the year.',
  'tfng-libraries-06': 'the library should not be judged only by the number of books borrowed',
  'tfng-coastal-01': 'Instead of rebuilding the path in the same place, engineers moved the most exposed section farther inland.',
  'tfng-coastal-02': 'This decision made the route slightly longer',
  'tfng-coastal-04': 'They asked the council to keep visitors off the most fragile areas',
  'tfng-coastal-05': 'the notices would be tested for one summer before becoming permanent',
  'tfng-coastal-cost': 'The passage names clearer signs and two viewing points, but it gives no exact construction cost for them.',
};

const selectedLegacyIds: Record<string, string[]> = {
  'tfng-set-urban-trees': ['tfng-urban-trees-01', 'tfng-urban-trees-02', 'tfng-urban-trees-04', 'tfng-urban-trees-07', 'tfng-urban-trees-08'],
  'tfng-set-school-libraries': ['tfng-libraries-01', 'tfng-libraries-02', 'tfng-libraries-03', 'tfng-libraries-05', 'tfng-libraries-06'],
  'tfng-set-coastal-paths': ['tfng-coastal-01', 'tfng-coastal-02', 'tfng-coastal-04', 'tfng-coastal-05'],
};
const legacyErrorCodes: Record<string, TfngErrorCode> = {
  'tfng-urban-trees-01': 'quantifier-shift', 'tfng-urban-trees-02': 'paraphrase-missed', 'tfng-urban-trees-04': 'paraphrase-missed', 'tfng-urban-trees-07': 'silence-misclassified', 'tfng-urban-trees-08': 'paraphrase-missed',
  'tfng-libraries-01': 'opposite-not-proved', 'tfng-libraries-02': 'paraphrase-missed', 'tfng-libraries-03': 'time-or-degree-shift', 'tfng-libraries-05': 'silence-misclassified', 'tfng-libraries-06': 'opposite-not-proved',
  'tfng-coastal-01': 'opposite-not-proved', 'tfng-coastal-02': 'paraphrase-missed', 'tfng-coastal-04': 'paraphrase-missed', 'tfng-coastal-05': 'time-or-degree-shift',
};

const legacyPassages: TfngTrainingPassage[] = IELTS_TFNG_PRACTICE_SETS.map((set) => {
  const decisions: TfngDecision[] = set.questions.filter((question) => selectedLegacyIds[set.id].includes(question.id)).map((question) => ({ id: question.id, statement: question.statement, answer: question.answer as TfngAnswer, evidence: evidence[question.id], explanation: question.explanation, trap: question.trap, errorCode: legacyErrorCodes[question.id] }));
  if (set.id === 'tfng-set-coastal-paths') decisions.push({ id: 'tfng-coastal-cost', statement: 'The two new viewing points cost more than the path relocation.', answer: 'NOT GIVEN', evidence: evidence['tfng-coastal-cost'], explanation: 'The passage mentions two new viewing points but never compares their cost with the path relocation.', trap: 'A named project detail is not evidence for an unstated price comparison.', errorCode: 'outside-knowledge' });
  const id = set.id.replace('-set-', '-');
  return { id, title: set.passageTitle, paragraphs: splitParagraphs(id, set.passage), ...sourceMeta[set.id], decisions };
});

function fromSource(id: string, decisions: TfngDecision[]): TfngTrainingPassage {
  const passage = MATCHING_HEADINGS_PASSAGES.find((item) => item.id === id);
  if (!passage) throw new Error(`Missing source-backed passage: ${id}`);
  return { id: `tfng-${id}`, title: passage.title, sourceUrl: passage.sourceUrl, sourceNote: passage.sourceNote, paragraphs: passage.paragraphs.map(({ id: paragraphId, label, text }) => ({ id: paragraphId, label, text })), decisions };
}

const citizenScience = fromSource('citizens-do-science', [
  { id: 'tfng-citizen-01', statement: 'A single volunteer report can reveal a reliable pattern across a wide area by itself.', answer: 'FALSE', evidence: 'A single report may be modest, but thousands of reports can reveal patterns across a wide area.', explanation: 'The passage contrasts one modest report with the pattern revealed by thousands.', trap: 'The topic is correct, but “by itself” reverses the scale relationship.', errorCode: 'time-or-degree-shift' },
  { id: 'tfng-citizen-02', statement: 'Many citizen-science tasks are designed for beginners using devices they already own.', answer: 'TRUE', evidence: 'many are designed for beginners using devices they already own', explanation: 'The statement preserves both the quantity and the beginner-access claim.', trap: 'Do not turn “many” into “all”; this statement keeps the original scope.', errorCode: 'paraphrase-missed' },
  { id: 'tfng-citizen-03', statement: 'Projects may compare several classifications as part of quality control.', answer: 'TRUE', evidence: 'Researchers may repeat checks, compare several classifications or flag unusual entries for review.', explanation: 'The statement is a direct paraphrase of one quality-control method.', trap: '“May” describes a possible method, not a universal rule.', errorCode: 'paraphrase-missed' },
  { id: 'tfng-citizen-04', statement: 'All volunteers receive payment for every observation they submit.', answer: 'NOT GIVEN', evidence: 'The passage describes volunteer tasks and outcomes but never states a payment policy.', explanation: 'No sentence confirms or contradicts a universal payment arrangement.', trap: 'Outside knowledge about volunteering cannot replace passage evidence.', errorCode: 'outside-knowledge' },
  { id: 'tfng-citizen-05', statement: 'The passage gives the exact number of publications co-authored by volunteers.', answer: 'NOT GIVEN', evidence: 'volunteers have even become co-authors of research publications', explanation: 'Co-authorship is mentioned, but no number of publications is supplied.', trap: 'A related fact does not answer the exact quantity claim.', errorCode: 'silence-misclassified' },
]);

const seedCollection = fromSource('keeping-seeds-useful', [
  { id: 'tfng-seed-01', statement: 'A variety that is uncommon now may still help future crop improvement.', answer: 'TRUE', evidence: 'A variety that is uncommon today could contain a useful response to drought, disease or a changing climate.', explanation: 'The statement accurately paraphrases the future value of an uncommon variety.', trap: '“May” and “could” preserve the same cautious degree.', errorCode: 'paraphrase-missed' },
  { id: 'tfng-seed-02', statement: 'Every plant species should be stored under identical conditions.', answer: 'FALSE', evidence: 'Different species may also require different conditions.', explanation: 'Different requirements directly contradict identical conditions for every species.', trap: 'Cold storage is the topic, but the universal storage rule is the opposite of the text.', errorCode: 'quantifier-shift' },
  { id: 'tfng-seed-03', statement: 'Curators may grow part of a sample when tests show that too few seeds remain viable.', answer: 'TRUE', evidence: 'Tests sometimes show that too few seeds in a sample will still grow. Curators then plant part of the remaining stock', explanation: 'The sequence and reason are both preserved.', trap: 'The growing step follows the viability test; it is not routine for every sample.', errorCode: 'time-or-degree-shift' },
  { id: 'tfng-seed-04', statement: 'The collection described has operated continuously since 1970.', answer: 'NOT GIVEN', evidence: 'The passage gives no founding year or operating history for a particular collection.', explanation: 'No date appears, so the statement cannot be decided from the text.', trap: 'Do not supply a plausible institutional history from outside knowledge.', errorCode: 'outside-knowledge' },
  { id: 'tfng-seed-05', statement: 'Researchers must pay a fixed fee whenever they request material.', answer: 'NOT GIVEN', evidence: 'Clear catalogues and responsible distribution allow plant breeders and researchers to request material', explanation: 'Access is mentioned, but price and payment rules are absent.', trap: 'Requesting material does not prove that access is free or paid.', errorCode: 'silence-misclassified' },
]);

const nightRail = fromSource('night-trains-cross-borders', [
  { id: 'tfng-rail-01', statement: 'Pilot services allow operators to evaluate proposed links in practice.', answer: 'TRUE', evidence: 'The trials turn broad demand into routes that operators can evaluate in practice.', explanation: 'Pilot services and trials express the same practical-testing relationship.', trap: 'A pilot evaluates a route; it does not prove profitability.', errorCode: 'paraphrase-missed' },
  { id: 'tfng-rail-02', statement: 'Authorised sleeper coaches solve ticketing and timetable problems by themselves.', answer: 'FALSE', evidence: 'rolling stock by itself cannot solve timetabling, ticketing or infrastructure problems', explanation: 'The passage explicitly states the opposite of the claim.', trap: 'Suitable trains are necessary, but “by themselves” makes the statement false.', errorCode: 'opposite-not-proved' },
  { id: 'tfng-rail-03', statement: 'The passage identifies the operator with the best cross-border booking system.', answer: 'NOT GIVEN', evidence: 'The passage discusses fragmented booking but names no operator and ranks no system.', explanation: 'The booking problem is discussed, but the requested identity and ranking are absent.', trap: 'Same topic is not enough for True or False.', errorCode: 'silence-misclassified' },
  { id: 'tfng-rail-04', statement: 'Most travellers prefer night trains to early flights.', answer: 'NOT GIVEN', evidence: 'A night train can offer an alternative to an early flight where rail links are strong.', explanation: 'An available alternative does not establish a majority preference.', trap: 'A plausible preference needs evidence about travellers and quantity.', errorCode: 'outside-knowledge' },
  { id: 'tfng-rail-05', statement: 'The success of night rail depends on more than the appeal of overnight travel.', answer: 'TRUE', evidence: 'The revival will depend on how those elements work together, not on the appeal of overnight travel alone.', explanation: 'The statement preserves the passage’s conditional conclusion.', trap: 'Do not ignore the vehicles, departure times, connections and demand named before the conclusion.', errorCode: 'paraphrase-missed' },
]);

export const TFNG_PASSAGES: TfngTrainingPassage[] = [...legacyPassages, citizenScience, seedCollection, nightRail];
const progressPassages = TFNG_PASSAGES.slice(2);
export const TFNG_LEVELS: TfngLevel[] = [
  { id: 'three-states', title: 'Separate the three evidence states', focus: 'Same · opposite · unresolved', instruction: 'Require direct support for True, an incompatible claim for False and genuine silence for Not Given.', passageIds: progressPassages.map((passage) => passage.id), decisionIds: progressPassages.flatMap((passage) => passage.decisions.slice(0, 2).map((decision) => decision.id)).slice(0, 4), masteryScore: 3 },
  { id: 'scope', title: 'Control quantity, time and degree', focus: 'Exact claim boundaries', instruction: 'Preserve quantifiers, comparisons, time limits and certainty before choosing a label.', passageIds: progressPassages.map((passage) => passage.id), decisionIds: progressPassages.flatMap((passage) => passage.decisions.slice(2, 4).map((decision) => decision.id)).slice(0, 4), masteryScore: 3 },
  { id: 'coastal-set', title: 'Full set · Coastal paths', focus: 'Contradiction and missing comparison', instruction: 'Submit all five statements before feedback opens.', passageIds: ['tfng-coastal-paths'], masteryScore: 4 },
  { id: 'citizen-set', title: 'Full set · Citizen science', focus: 'Related topic versus exact claim', instruction: 'Use passage evidence only; do not infer payment or quantities.', passageIds: ['tfng-citizens-do-science'], masteryScore: 4 },
  { id: 'seed-set', title: 'Full set · Seed collections', focus: 'Quantifiers and absent policy', instruction: 'Distinguish a direct opposite from an unstated date or fee.', passageIds: ['tfng-keeping-seeds-useful'], masteryScore: 4 },
  { id: 'rail-set', title: 'Transfer set · Night rail', focus: 'Conditions and unsupported preference', instruction: 'Complete the unseen set and justify each label with the exact relationship.', passageIds: ['tfng-night-trains-cross-borders'], masteryScore: 4 },
];
export function getTfngPassage(id: string) { return TFNG_PASSAGES.find((passage) => passage.id === id); }
