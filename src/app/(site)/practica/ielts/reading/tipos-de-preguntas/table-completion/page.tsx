import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  TableCompletionGuidedPractice,
  TableCompletionIndependentPractice,
  TableCompletionProgressEngine,
} from '@/components/exam-practice/TableCompletionPracticeLab';
import {
  TABLE_COMPLETION_GUIDED_PASSAGE_ID,
  TABLE_COMPLETION_INDEPENDENT_PASSAGE_ID,
  getTableCompletionPassage,
} from '@/data/practica-exams/ielts-reading-table-completion-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'table-completion')!;
const TITLE = 'Table Completion: use headers as evidence coordinates';
const DESCRIPTION = 'Read every row and column header, predict the missing information category and copy the smallest exact passage span that completes the cell within the displayed word limit.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getTableCompletionPassage(TABLE_COMPLETION_GUIDED_PASSAGE_ID)!;
const independentPassage = getTableCompletionPassage(TABLE_COMPLETION_INDEPENDENT_PASSAGE_ID)!;

export const metadata: Metadata = {
  title: 'IELTS Table Completion: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="table-completion"
    path={ROUTE.path}
    indexPath="/practica/ielts/reading/tipos-de-preguntas"
    indexName="Reading Question Types"
    lessonLabel="IELTS Academic Reading · Question type"
    name="Table Completion"
    title={TITLE}
    description={DESCRIPTION}
    accent="#7c3aed"
    directAnswer="Read the word limit and the complete table first. Treat the active row and column as coordinates, predict the missing form and copy only the exact words that satisfy both headers."
    facts={[
      { label: 'Target', value: 'Categorised detail' },
      { label: 'Evidence', value: 'Row + column + exact span' },
      { label: 'Main risk', value: 'Reading the blank without its headers' },
    ]}
    outcomes={[
      { title: 'Use both coordinates', text: 'Combine the row topic and column category before searching for one detail.' },
      { title: 'Predict the missing form', text: 'Use the complete cell to expect an action, condition, material, result or short phrase.' },
      { title: 'Control the answer span', text: 'Copy the minimum passage wording that preserves grammar and the displayed limit.' },
    ]}
    method={[
      { title: 'Read the instruction', text: 'Confirm that answers come from the passage and record the maximum number of words.' },
      { title: 'Map the table', text: 'Read every row and column header, then state what information belongs at each intersection.' },
      { title: 'Predict and locate', text: 'Use the cell grammar and both coordinates to find the matching evidence zone.' },
      { title: 'Copy and rebuild', text: 'Insert the smallest exact span, then reread the row, column and completed cell together.' },
    ]}
    weakExample="Search the passage for one repeated word while ignoring which row topic and column category own that detail."
    strongExample="The row is ‘Location’ and the column is ‘Condition or warning’, so search the design paragraph for a limiting condition and submit the exact adjective that completes the cell."
    practice={<TableCompletionGuidedPractice passage={guidedPassage} />}
    independentPracticeExperience={<TableCompletionIndependentPractice passage={independentPassage} />}
    progressEngine={<TableCompletionProgressEngine />}
    sourceReview={<SkillReviewSourceBlock
      accent="#7c3aed"
      skillName="Table Completion"
      reviewedFocus={[
        'Guided, independent and Progress Engine passage pools are separated.',
        'Every response is checked against a visible row, a visible column, a literal passage span, rebuilt cell grammar and the displayed maximum.',
        'The inherited cooling-cell ambiguity accepts prevailing winds, direction and the direction instead of hiding reasonable answers.',
        'WeLearn publication authorization and candidate factual sources remain distinct; candidate context does not certify every composite claim.',
      ]}
      sources={[
        { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms completion tasks using words from the text or a supplied list and that the stated word limit is binding.' },
        { label: 'WeLearn practice blueprint', note: 'Defines coordinate-led search, held-back transfer, local persistence and the client-key security boundary.' },
      ]}
    />}
    independentPractice={[
      'Read all row and column headers before looking at the blanks.',
      'Predict the information category and grammatical form required by every cell.',
      'Record the exact passage span used for each response.',
      'Submit the full table once, then repair only weak coordinate-to-evidence links.',
    ]}
    checklist={[
      'you can explain what belongs at each row-column intersection before you search',
      'you use both headers and the cell grammar to locate evidence',
      'every inserted span is exact, natural and within the displayed limit',
      'you can explain why a nearby true detail belongs to another coordinate',
    ]}
    faqs={ROUTE.faqs}
    officialNote="Table Completion is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. WeLearn has authorised publication of the three original Table passages; candidate sources provide factual context but do not independently verify every claim."
    nextLinks={[
      { href: '/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion', label: 'Continue to Flow-chart Completion', primary: true },
      { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Strengthen word-limit control' },
      { href: '/practica/ielts/reading/habilidades/scanning', label: 'Strengthen scanning' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}
