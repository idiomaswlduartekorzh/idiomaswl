import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  MultipleChoiceGuidedPractice,
  MultipleChoiceIndependentPractice,
  MultipleChoiceProgressEngine,
} from '@/components/exam-practice/MultipleChoicePracticeLab';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';
import {
  MULTIPLE_CHOICE_GUIDED_PASSAGE_ID,
  MULTIPLE_CHOICE_INDEPENDENT_PASSAGE_ID,
  getMultipleChoicePassage,
} from '@/data/practica-exams/ielts-reading-multiple-choice-progress';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'multiple-choice')!;
const TITLE = 'IELTS Reading Multiple Choice: prove the one best answer';
const DESCRIPTION = 'Learn to read the exact stem, locate the evidence zone and reject lexical echoes, partial truths and overconfident distractors.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getMultipleChoicePassage(MULTIPLE_CHOICE_GUIDED_PASSAGE_ID)!;
const independentPassage = getMultipleChoicePassage(MULTIPLE_CHOICE_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = {
  title: 'IELTS Reading Multiple Choice: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="multiple-choice"
    path={ROUTE.path}
    indexPath="/practica/ielts/reading/tipos-de-preguntas"
    indexName="Reading Question Types"
    lessonLabel="IELTS Academic Reading · Question type"
    name="Multiple Choice"
    title={TITLE}
    description={DESCRIPTION}
    directAnswer="A strong Multiple Choice decision answers the exact question, matches a precise evidence zone and survives comparison with the closest distractor—not merely the option with familiar words."
    facts={[{ label: 'First', value: 'Read the stem' }, { label: 'Then', value: 'Locate evidence' }, { label: 'Finish', value: 'Compare scope' }]}
    outcomes={[
      { title: 'Control the stem', text: 'Distinguish a detail question from purpose, inference, main idea or vocabulary in context before evaluating options.' },
      { title: 'Reject attractive fragments', text: 'Notice when an option contains a true detail but fails to answer the complete question.' },
      { title: 'Prove one best answer', text: 'Compare the final two options against evidence, scope, certainty and the writer’s relationship.' },
    ]}
    method={[
      { title: 'Name the question job', text: 'Underline the operative words in the stem: according to, mainly, imply, purpose or refers to.' },
      { title: 'Locate before choosing', text: 'Find the paragraph or sentence that controls the answer before following vocabulary in the options.' },
      { title: 'Test every option', text: 'Label each option supported, contradicted, not given or only partially true.' },
      { title: 'Defeat the closest rival', text: 'Choose the only option whose scope and relationship match the whole evidence zone.' },
    ]}
    weakExample="The option repeats ‘sleep’ and ‘memory’, so it must be correct."
    strongExample="The stem asks for paragraph purpose. Option B captures the old-view/new-view contrast; the other options reuse details but describe neither the paragraph’s job nor its whole meaning."
    practice={<MultipleChoiceGuidedPractice passage={guidedPassage} />}
    independentPracticeExperience={<MultipleChoiceIndependentPractice passage={independentPassage} />}
    progressEngine={<MultipleChoiceProgressEngine />}
    sourceReview={(
      <SkillReviewSourceBlock
        accent="#0369a1"
        skillName="Multiple Choice"
        reviewedFocus={[
          'Guided, independent and Progress Engine passage pools are separated.',
          'Distractors are classified by stem misread, lexical echo, partial truth, scope, relationship or unsupported claim.',
          'Answer positions vary mechanically and full-set feedback remains closed until submission.',
        ]}
        sources={[
          { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Multiple Choice as an official Reading task family and the possibility of selecting one or more answers according to the instructions.' },
          { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, explicit option comparison, local progress and the client-key security boundary.' },
        ]}
      />
    )}
    independentPractice={[
      'Write the question job beside every stem before opening the options.',
      'Mark the exact evidence zone and paraphrase it in your own words.',
      'Explain why the closest distractor fails by scope or relationship.',
      'Retry with reshuffled options instead of memorising a letter position.',
    ]}
    checklist={[
      'you answer the stem rather than the general topic',
      'you can quote evidence for the chosen option',
      'you can name the precise defect in the closest distractor',
      'your decision survives when option order changes',
    ]}
    faqs={ROUTE.faqs}
    officialNote="Multiple Choice is an official IELTS Academic Reading task family. This page is guided WeLearn practice; because answer keys reach the browser, it is not a secure Exam or proctored mode."
    nextLinks={[
      { href: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given', label: 'Continue to True / False / Not Given', primary: true },
      { href: '/practica/ielts/reading/habilidades/scanning', label: 'Review evidence location' },
      { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Review paraphrase control' },
      { href: '/practica/ielts/reading/habilidades/inferencia', label: 'Review inference control' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}
