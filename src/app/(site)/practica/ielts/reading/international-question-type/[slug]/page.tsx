import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import InternationalQuestionTypePractice from '@/components/exam-practice/InternationalQuestionTypePractice';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  MatchingHeadingsGuidedPractice,
  MatchingHeadingsIndependentPractice,
  MatchingHeadingsProgressEngine,
} from '@/components/exam-practice/MatchingHeadingsPracticeLab';
import {
  MATCHING_HEADINGS_GUIDED_PASSAGE_ID,
  MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID,
  getMatchingHeadingsPassage,
} from '@/data/practica-exams/ielts-reading-matching-headings-progress';
import {
  MatchingInformationGuidedPractice,
  MatchingInformationIndependentPractice,
  MatchingInformationProgressEngine,
} from '@/components/exam-practice/MatchingInformationPracticeLab';
import {
  MATCHING_INFORMATION_GUIDED_PASSAGE_ID,
  MATCHING_INFORMATION_INDEPENDENT_PASSAGE_ID,
  getMatchingInformationPassage,
} from '@/data/practica-exams/ielts-reading-matching-information-progress';
import {
  MultipleChoiceGuidedPractice,
  MultipleChoiceIndependentPractice,
  MultipleChoiceProgressEngine,
} from '@/components/exam-practice/MultipleChoicePracticeLab';
import {
  MULTIPLE_CHOICE_GUIDED_PASSAGE_ID,
  MULTIPLE_CHOICE_INDEPENDENT_PASSAGE_ID,
  getMultipleChoicePassage,
} from '@/data/practica-exams/ielts-reading-multiple-choice-progress';
import { TfngGuidedPractice, TfngIndependentPractice, TfngProgressEngine } from '@/components/exam-practice/TfngPracticeLab';
import { TFNG_GUIDED_PASSAGE_ID, TFNG_INDEPENDENT_PASSAGE_ID, getTfngPassage } from '@/data/practica-exams/ielts-reading-tfng-progress';
import { YnngGuidedPractice, YnngIndependentPractice, YnngProgressEngine } from '@/components/exam-practice/YnngPracticeLab';
import { YNNG_GUIDED_PASSAGE_ID, YNNG_INDEPENDENT_PASSAGE_ID, getYnngPassage } from '@/data/practica-exams/ielts-reading-ynng-progress';
import {
  IELTS_READING_TYPES,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

type Point = { title: string; text: string };
type QuestionTypeConfig = {
  name: string;
  title: string;
  description: string;
  accent: string;
  target: string;
  evidence: string;
  risk: string;
  method: Point[];
  weak: string;
  strong: string;
  next: string;
};

const TYPES = {
  'true-false-not-given': {
    name: 'True / False / Not Given', title: 'True / False / Not Given: test the exact factual claim', accent: '#0369a1',
    description: 'Decide whether the passage confirms, contradicts or does not provide enough information for the exact statement—not merely the same topic.',
    target: 'Exact factual relationship', evidence: 'Subject, quantity, comparison and polarity', risk: 'Treating related information as proof',
    method: [{ title: 'Decompose the statement', text: 'Underline subject, verb, quantity, comparison and absolute language.' }, { title: 'Locate the topic zone', text: 'Search by meaning and paraphrase rather than one repeated word.' }, { title: 'Compare the exact claim', text: 'Ask whether the passage says the same thing, the opposite or neither.' }, { title: 'Use Not Given precisely', text: 'Choose it only when the exact relationship cannot be decided from the text.' }],
    weak: 'The passage mentions the same topic, so the statement must be True.', strong: 'The passage mentions the topic but never states the quantity in the claim, so the exact answer is Not Given.', next: 'yes-no-not-given',
  },
  'yes-no-not-given': {
    name: 'Yes / No / Not Given', title: 'Yes / No / Not Given: track the writer’s position', accent: '#7c3aed',
    description: 'Compare a statement with the writer’s view or claim, preserving degree, recommendation, preference and uncertainty.',
    target: 'Writer view or claim', evidence: 'Evaluation, recommendation and stance markers', risk: 'Answering a factual question instead of a view question',
    method: [{ title: 'Mark the stance verb', text: 'Look for believes, argues, recommends, prefers or suggests.' }, { title: 'Find the writer’s evaluation', text: 'Locate the sentence where the author judges, limits or recommends.' }, { title: 'Compare direction and strength', text: 'Preserve positive or negative stance and modal force.' }, { title: 'Separate silence from disagreement', text: 'No requires an opposing view; missing stance is Not Given.' }],
    weak: 'The topic appears in the passage, so the writer agrees.', strong: 'The writer discusses the policy but never evaluates the specific proposal, so the position is Not Given.', next: 'matching-headings',
  },
  'matching-headings': {
    name: 'Matching Headings', title: 'Matching Headings: match the whole paragraph function', accent: '#0369a1',
    description: 'Choose the heading that captures the paragraph’s central purpose rather than one repeated word, example or memorable detail.',
    target: 'Main idea and paragraph function', evidence: 'Opening, development, contrast and closing', risk: 'Selecting a detail-level heading',
    method: [{ title: 'Read the paragraph first', text: 'Form your own short label before studying every heading.' }, { title: 'Identify the function', text: 'Ask whether the paragraph defines, contrasts, explains, evaluates or solves.' }, { title: 'Eliminate narrow headings', text: 'Reject options that cover only one example or sentence.' }, { title: 'Test global coverage', text: 'The chosen heading should work as a title for the entire paragraph.' }],
    weak: 'Choose the heading with the most vocabulary overlap.', strong: 'Choose “A limitation of the pilot” because the paragraph’s opening, evidence and conclusion all develop that function.', next: 'matching-information',
  },
  'multiple-choice': {
    name: 'Multiple Choice', title: 'Multiple Choice: prove one option and reject the rest', accent: '#0369a1',
    description: 'Locate the answer zone, compare each option with the same evidence and reject distortions of scope, cause, time or certainty.',
    target: 'One best supported option', evidence: 'Question-specific passage span', risk: 'Choosing the first plausible option',
    method: [{ title: 'Classify the question', text: 'Decide whether it asks for detail, purpose, inference, vocabulary or main idea.' }, { title: 'Locate evidence first', text: 'Find the passage zone before letting options control your search.' }, { title: 'Compare every option', text: 'Use the same evidence and test each proposition.' }, { title: 'Name each failure', text: 'Reject options for contradiction, invention, wrong scope or wrong relationship.' }],
    weak: 'Option B uses the same words as the passage, so it looks correct.', strong: 'Option D paraphrases the evidence accurately; B copies vocabulary but reverses the cause-and-effect relationship.', next: 'summary-completion',
  },
  'summary-completion': {
    name: 'Summary Completion', title: 'Summary Completion: rebuild a connected meaning', accent: '#0369a1',
    description: 'Use the summary’s logic and grammar to locate a paraphrased passage section, then supply the smallest answer allowed by the instruction.',
    target: 'Connected summary meaning', evidence: 'Equivalent passage section + grammatical fit', risk: 'Solving six isolated gaps without reading the summary',
    method: [{ title: 'Read the instruction', text: 'Record the source rule and maximum number of words.' }, { title: 'Read the full summary', text: 'Understand sequence, contrast and reference before filling gaps.' }, { title: 'Predict each gap', text: 'Identify required meaning and grammatical category.' }, { title: 'Locate, copy and rebuild', text: 'Find the equivalent passage zone and reread the completed summary.' }],
    weak: 'Search each blank independently and copy the nearest repeated noun.', strong: 'Use the summary’s cause-result sequence to locate the matching paragraph, then copy the two-word noun phrase that fits both meaning and grammar.', next: 'note-completion',
  },
  'note-completion': {
    name: 'Note Completion', title: 'Note Completion: use headings as a search map', accent: '#0f766e',
    description: 'Read each note group as a structured map, predict the missing category and copy the exact answer within the stated word limit.',
    target: 'Structured detail', evidence: 'Note heading, local cue and passage span', risk: 'Ignoring the relationship between note groups',
    method: [{ title: 'Read the word limit', text: 'Treat the instruction as part of the answer contract.' }, { title: 'Use group headings', text: 'Predict the passage zone and purpose of each note group.' }, { title: 'Predict grammar', text: 'Decide whether the blank needs a place, object, reason, time or short phrase.' }, { title: 'Copy minimally', text: 'Use the smallest exact span that completes the note naturally.' }],
    weak: 'Search the entire passage for a word near the blank.', strong: 'The heading says “Operational problems”, so scan the relevant paragraph for the noun phrase that names the problem and fits the two-word limit.', next: 'table-completion',
  },
  'table-completion': {
    name: 'Table Completion', title: 'Table Completion: read rows and columns before the gap', accent: '#0f766e',
    description: 'Use column categories and row relationships to predict the missing information, then confirm a precise passage span within the word limit.',
    target: 'Categorised comparison', evidence: 'Row label + column heading + passage detail', risk: 'Reading the blank without its table context',
    method: [{ title: 'Read the instruction', text: 'Confirm whether answers come from the passage and record the limit.' }, { title: 'Read table structure', text: 'Use row labels and column headings to define the missing category.' }, { title: 'Locate the matching section', text: 'Find where the passage discusses that row or category.' }, { title: 'Rebuild the cell', text: 'Check meaning, grammar and word count in the complete row.' }],
    weak: 'Choose a nearby phrase because it appears in the same paragraph.', strong: 'The row is “Design factor” and the column is “What to study”, so select the passage phrase that names the exact factor and fits the cell grammar.', next: 'flow-chart-completion',
  },
  'flow-chart-completion': {
    name: 'Flow-chart Completion', title: 'Flow-chart Completion: follow process logic', accent: '#0f766e',
    description: 'Use step order, connectors and input-output relationships to narrow the evidence zone before copying a word-limit-safe answer.',
    target: 'Process step or result', evidence: 'Sequence, condition, purpose and outcome markers', risk: 'Searching without reading the flow',
    method: [{ title: 'Read the whole flow', text: 'Understand the start, transitions and final outcome.' }, { title: 'Predict each category', text: 'Decide whether the gap needs an action, material, condition or product.' }, { title: 'Track sequence signals', text: 'Use after, before, then, because and result language.' }, { title: 'Copy and reconnect', text: 'Insert the answer and verify that the process remains logical.' }],
    weak: 'Scan for one repeated word without checking which stage it describes.', strong: 'The previous box gives an input and the arrow says “after heating”, so locate the next process result and copy the matching noun phrase.', next: 'short-answer',
  },
  'short-answer': {
    name: 'Short-answer Questions', title: 'Short-answer Questions: answer exactly what was asked', accent: '#be123c',
    description: 'Identify the requested person, place, object, reason, result or condition, then copy the minimum passage wording within the limit.',
    target: 'Direct local answer', evidence: 'Question focus + exact passage span', risk: 'Writing a true but overbroad answer',
    method: [{ title: 'Underline the limit', text: 'Know the maximum before searching.' }, { title: 'Name the requested category', text: 'Decide precisely what the question asks for.' }, { title: 'Scan for the evidence', text: 'Use keywords and paraphrases to locate the answer zone.' }, { title: 'Answer minimally', text: 'Copy only the words needed and reread question plus answer.' }],
    weak: 'Copy a complete sentence because it contains the answer.', strong: 'The question asks “Which material?”, so submit only the two-word material name within the stated limit.', next: 'sentence-completion',
  },
  'sentence-completion': {
    name: 'Sentence Completion', title: 'Sentence Completion: predict grammar, then find meaning', accent: '#0369a1',
    description: 'Use the incomplete sentence to predict grammar and meaning, locate its paraphrase in the passage and insert the smallest exact answer.',
    target: 'One completed statement', evidence: 'Sentence frame + equivalent passage sentence', risk: 'Repeating frame words or exceeding the limit',
    method: [{ title: 'Record the limit', text: 'Do this before reading the passage.' }, { title: 'Read across the gap', text: 'Predict noun, verb, adjective, number or phrase.' }, { title: 'Find the paraphrase', text: 'Locate the passage sentence that expresses the same idea.' }, { title: 'Rebuild the sentence', text: 'Check meaning, grammar, duplication and word count.' }],
    weak: 'Copy a three-word phrase even though one word is already printed before the gap.', strong: 'Remove the repeated article, submit the two-word noun phrase and reread the full completed sentence.', next: 'matching-information',
  },
  'matching-information': {
    name: 'Matching Information', title: 'Matching Information: locate the paragraph with the exact detail', accent: '#0369a1',
    description: 'Match statements to paragraph locations by scanning for paraphrased details, reasons, examples, effects or comparisons—not paragraph main ideas.',
    target: 'Location of specific information', evidence: 'Distinctive detail + surrounding context', risk: 'Matching by general topic',
    method: [{ title: 'Read statements first', text: 'Underline nouns, actions and logical relationships.' }, { title: 'Build search signals', text: 'Identify names, numbers, outcomes, reasons and technical terms.' }, { title: 'Scan for paraphrase', text: 'Expect different wording and more than one answer in a paragraph.' }, { title: 'Confirm the exact detail', text: 'Read around the match and verify the whole statement.' }],
    weak: 'Paragraph B is about the same topic, so it must contain the statement.', strong: 'Paragraph D contains the specific delayed consequence expressed in paraphrase, even though Paragraph B shares more keywords.', next: 'matching-features',
  },
  'matching-features': {
    name: 'Matching Features', title: 'Matching Features: connect each statement to the right feature', accent: '#0f766e',
    description: 'Track people, groups, projects, theories or periods and match each statement to the feature that owns the action, view, result or limitation.',
    target: 'Statement-to-feature association', evidence: 'Name, pronoun chain and attributed claim', risk: 'Choosing the nearest name',
    method: [{ title: 'Classify the features', text: 'Mark whether each option is a person, group, theory, place or period.' }, { title: 'Underline the relationship', text: 'Identify the action, opinion, result or limitation in the statement.' }, { title: 'Track attribution', text: 'Scan names and follow nearby pronouns or references.' }, { title: 'Confirm the association', text: 'Verify that the feature—not merely a nearby entity—owns the claim.' }],
    weak: 'Choose the last person named before the matching keyword.', strong: 'Follow the pronoun back to its named researcher and confirm that the attributed finding matches the statement.', next: 'matching-sentence-endings',
  },
  'matching-sentence-endings': {
    name: 'Matching Sentence Endings', title: 'Matching Sentence Endings: combine grammar with evidence', accent: '#b45309',
    description: 'Predict the logical relation each sentence beginning requires, filter endings for grammatical fit and confirm the one best meaning in the passage.',
    target: 'One best sentence completion', evidence: 'Grammar + logical relation + passage support', risk: 'Selecting a natural-sounding but unsupported ending',
    method: [{ title: 'Read beginnings first', text: 'Predict cause, result, condition, contrast or method.' }, { title: 'Filter grammar', text: 'Remove endings that cannot form a natural sentence.' }, { title: 'Locate the idea', text: 'Find the beginning’s meaning in the passage.' }, { title: 'Compare the final pair', text: 'Reject the closest competitor with explicit evidence.' }],
    weak: 'The sentence sounds grammatical, so the ending is correct.', strong: 'Two endings are grammatical, but only one preserves the condition stated in the evidence sentence.', next: 'diagram-labeling',
  },
  'diagram-labeling': {
    name: 'Diagram Labeling', title: 'Diagram Labeling: translate visual position into a search target', accent: '#0369a1',
    description: 'Use the diagram title, labels, arrows and spatial relationships to predict the missing part, then locate the exact wording in the passage.',
    target: 'Part, input, output or stage', evidence: 'Visual position + descriptive passage section', risk: 'Searching without understanding the diagram',
    method: [{ title: 'Read the diagram title', text: 'Decide whether it shows a structure, map or process.' }, { title: 'Classify each gap', text: 'Predict part, material, location, function, input or output.' }, { title: 'Follow visual order', text: 'Use arrows and neighbouring labels to narrow the passage zone.' }, { title: 'Copy precisely', text: 'Check spelling, grammar and the word limit.' }],
    weak: 'Search the passage for every noun visible in the diagram.', strong: 'The blank is an output after the filter stage, so scan the process paragraph for the result produced after filtration.', next: 'true-false-not-given',
  },
} satisfies Record<string, QuestionTypeConfig>;

type Slug = keyof typeof TYPES;
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const slugs = Object.keys(TYPES) as Slug[];
export function generateStaticParams() { return slugs.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in TYPES)) return {};
  const config = TYPES[slug as Slug];
  const path = `/practica/ielts/reading/tipos-de-preguntas/${slug}`;
  return {
    title: `${config.name} IELTS Reading: Method, Examples and Practice`, description: config.description,
    alternates: { canonical: `${PRACTICE_BASE_URL}${path}` }, robots: { index: true, follow: true },
    openGraph: { title: config.title, description: config.description, url: `${PRACTICE_BASE_URL}${path}`, type: 'website', locale: 'en_US' },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  if (!(rawSlug in TYPES)) notFound();
  const slug = rawSlug as Slug;
  const config = TYPES[slug];
  const route = IELTS_READING_TYPES.find((item) => item.slug === slug)!;
  const isMatchingHeadings = slug === 'matching-headings';
  const isMatchingInformation = slug === 'matching-information';
  const isMultipleChoice = slug === 'multiple-choice';
  const isTfng = slug === 'true-false-not-given';
  const isYnng = slug === 'yes-no-not-given';
  const guidedPassage = isMatchingHeadings ? getMatchingHeadingsPassage(MATCHING_HEADINGS_GUIDED_PASSAGE_ID) : undefined;
  const independentPassage = isMatchingHeadings ? getMatchingHeadingsPassage(MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID) : undefined;
  const matchingInformationGuided = isMatchingInformation ? getMatchingInformationPassage(MATCHING_INFORMATION_GUIDED_PASSAGE_ID) : undefined;
  const matchingInformationIndependent = isMatchingInformation ? getMatchingInformationPassage(MATCHING_INFORMATION_INDEPENDENT_PASSAGE_ID) : undefined;
  const multipleChoiceGuided = isMultipleChoice ? getMultipleChoicePassage(MULTIPLE_CHOICE_GUIDED_PASSAGE_ID) : undefined;
  const multipleChoiceIndependent = isMultipleChoice ? getMultipleChoicePassage(MULTIPLE_CHOICE_INDEPENDENT_PASSAGE_ID) : undefined;
  const tfngGuided = isTfng ? getTfngPassage(TFNG_GUIDED_PASSAGE_ID) : undefined;
  const tfngIndependent = isTfng ? getTfngPassage(TFNG_INDEPENDENT_PASSAGE_ID) : undefined;
  const ynngGuided = isYnng ? getYnngPassage(YNNG_GUIDED_PASSAGE_ID) : undefined;
  const ynngIndependent = isYnng ? getYnngPassage(YNNG_INDEPENDENT_PASSAGE_ID) : undefined;

  return <InternationalReadingSkillLesson
    slug={slug}
    path={`/practica/ielts/reading/tipos-de-preguntas/${slug}`}
    indexPath="/practica/ielts/reading/tipos-de-preguntas"
    indexName="Question Types"
    lessonLabel="IELTS Academic Reading · Question-type lesson"
    name={config.name} title={config.title} description={config.description} accent={config.accent}
    directAnswer={`${config.target}. Start from ${config.evidence.toLowerCase()}, and control the main risk: ${config.risk.toLowerCase()}.`}
    facts={[{ label: 'Target', value: config.target }, { label: 'Evidence', value: config.evidence }, { label: 'Main risk', value: config.risk }]}
    outcomes={[
      { title: 'Identify the task target', text: config.target },
      { title: 'Locate the right evidence', text: config.evidence },
      { title: 'Control the distractor', text: config.risk },
    ]}
    method={config.method}
    weakExample={config.weak}
    strongExample={config.strong}
    practice={guidedPassage
      ? <MatchingHeadingsGuidedPractice passage={guidedPassage} />
      : matchingInformationGuided
        ? <MatchingInformationGuidedPractice passage={matchingInformationGuided} />
      : multipleChoiceGuided
        ? <MultipleChoiceGuidedPractice passage={multipleChoiceGuided} />
      : tfngGuided
        ? <TfngGuidedPractice passage={tfngGuided} />
      : ynngGuided
        ? <YnngGuidedPractice passage={ynngGuided} />
      : <InternationalQuestionTypePractice name={config.name} accent={config.accent} target={config.target} evidence={config.evidence} risk={config.risk} weak={config.weak} strong={config.strong} />}
    independentPracticeExperience={independentPassage
      ? <MatchingHeadingsIndependentPractice passage={independentPassage} />
      : matchingInformationIndependent
        ? <MatchingInformationIndependentPractice passage={matchingInformationIndependent} />
      : multipleChoiceIndependent
        ? <MultipleChoiceIndependentPractice passage={multipleChoiceIndependent} />
      : tfngIndependent
        ? <TfngIndependentPractice passage={tfngIndependent} />
      : ynngIndependent
        ? <YnngIndependentPractice passage={ynngIndependent} />
        : undefined}
    progressEngine={isMatchingHeadings ? <MatchingHeadingsProgressEngine /> : isMatchingInformation ? <MatchingInformationProgressEngine /> : isMultipleChoice ? <MultipleChoiceProgressEngine /> : isTfng ? <TfngProgressEngine /> : isYnng ? <YnngProgressEngine /> : undefined}
    sourceReview={isMatchingHeadings ? (
      <SkillReviewSourceBlock
        accent={config.accent}
        skillName="Matching Headings"
        reviewedFocus={[
          'Guided, independent and Progress Engine passage pools are separated.',
          'A heading cannot be reused within a passage, and every full set contains two deliberately unused headings.',
          'Distractors are classified by detail-level match, lexical echo, wrong paragraph function, excessive breadth or unsupported claim.',
        ]}
        sources={[
          { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Matching Headings as a Reading task family based on the main idea of a paragraph or section and the use of extra headings.' },
          { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, non-reuse, explicit distractor analysis, local progress and the client-key security boundary.' },
        ]}
      />
    ) : isMatchingInformation ? (
      <SkillReviewSourceBlock
        accent={config.accent}
        skillName="Matching Information"
        reviewedFocus={[
          'Guided, independent and Progress Engine passage pools are separated.',
          'A paragraph may be reused when it genuinely supports more than one requested detail.',
          'Feedback diagnoses topic matching, entity confusion, qualifier loss, lexical echo, relationship mismatch and nearby true details.',
        ]}
        sources={[
          { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Matching Information as locating specific information in lettered paragraphs or sections and permits reuse when instructions allow it.' },
          { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, explicit evidence confirmation, local progress and the client-key security boundary.' },
        ]}
      />
    ) : isMultipleChoice ? (
      <SkillReviewSourceBlock
        accent={config.accent}
        skillName="Multiple Choice"
        reviewedFocus={[
          'Guided, independent and Progress Engine passage pools are separated.',
          'Distractors identify stem misreads, lexical echoes, partial truths, scope inflation, wrong relationships and unsupported claims.',
          'Answer positions vary mechanically and full-set feedback remains closed until submission.',
        ]}
        sources={[
          { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Multiple Choice as an official Reading task family and that the instructions determine how many answers to select.' },
          { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, explicit option comparison, local progress and the client-key security boundary.' },
        ]}
      />
    ) : isTfng ? <SkillReviewSourceBlock accent={config.accent} skillName="True / False / Not Given" reviewedFocus={['Guided, independent and Progress Engine passage pools are separated.', 'FALSE requires direct incompatibility rather than a weaker, stronger or merely different claim.', 'NOT GIVEN decisions name the exact missing quantity, identity, date, cost or policy.']} sources={[{ label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms identifying-information questions and the TRUE, FALSE and NOT GIVEN evidence relationship.' }, { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, explicit evidence states, local progress and the client-key security boundary.' }]} /> : isYnng ? <SkillReviewSourceBlock accent={config.accent} skillName="Yes / No / Not Given" reviewedFocus={['Guided, independent and Progress Engine passage pools are separated.', 'NO requires an opposing writer position rather than a merely qualified or weaker view.', 'NOT GIVEN decisions name the exact unstated preference, recommendation, comparison or policy.']} sources={[{ label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms identifying writer views or claims and the YES, NO and NOT GIVEN response relationship.' }, { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, writer-view attribution, local progress and the client-key security boundary.' }]} /> : undefined}
    independentPractice={[
      `Complete one new ${config.name} set without opening feedback.`,
      `For every item, record the exact evidence used for the decision.`,
      `Name the closest distractor and explain its specific failure.`,
      `Repeat only the items where your evidence or reasoning was incomplete.`,
    ]}
    checklist={[
      `you can state what ${config.name} is testing before you search`,
      'you can point to exact passage evidence for every answer',
      'you can explain why the closest alternative fails',
      'you preserve scope, polarity, logic and any stated word limit',
    ]}
    faqs={route.faqs}
    officialNote={isMatchingHeadings || isMatchingInformation
      ? `${config.name} is presented here as guided WeLearn practice. Answer keys reach the browser for feedback, so this is not a secure Exam or proctored mode. Candidate sources do not by themselves prove authorship or full factual verification.`
      : `${config.name} is presented here as guided WeLearn practice. The official IELTS format source defines the task family; the passages, explanations and distractors on this page are original training material.`}
    nextLinks={isMatchingHeadings ? [
      { href: '/practica/ielts/reading/tipos-de-preguntas/matching-information', label: 'Continue to Matching Information', primary: true },
      { href: '/practica/ielts/reading/habilidades/skimming', label: 'Strengthen skimming' },
      { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ] : isMatchingInformation ? [
      { href: '/practica/ielts/reading/tipos-de-preguntas/matching-features', label: 'Continue to Matching Features', primary: true },
      { href: '/practica/ielts/reading/habilidades/scanning', label: 'Strengthen scanning' },
      { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ] : [
      { href: `/practica/ielts/reading/tipos-de-preguntas/${config.next}`, label: `Continue to ${TYPES[config.next as Slug].name}`, primary: true },
      { href: '/practica/ielts/reading/habilidades', label: 'Strengthen Reading skills' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}
