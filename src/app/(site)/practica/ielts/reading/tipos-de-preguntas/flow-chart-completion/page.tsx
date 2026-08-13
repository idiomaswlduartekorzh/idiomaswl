import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  FlowChartCompletionGuidedPractice,
  FlowChartCompletionIndependentPractice,
  FlowChartCompletionProgressEngine,
} from '@/components/exam-practice/FlowChartCompletionPracticeLab';
import {
  FLOW_CHART_GUIDED_PASSAGE_ID,
  FLOW_CHART_INDEPENDENT_PASSAGE_ID,
  FLOW_CHART_OFFICIAL_FORMAT_URL as IELTS_ACADEMIC_URL,
  getFlowChartPassage,
} from '@/data/practica-exams/ielts-reading-flow-chart-completion-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'flow-chart-completion')!;
const TITLE = 'Flow-chart Completion: follow the process before the blank';
const DESCRIPTION = 'Read the complete process, classify each missing stage and use neighbouring boxes, sequence language and exact passage evidence to complete the flow within the displayed word limit.';
const guidedPassage = getFlowChartPassage(FLOW_CHART_GUIDED_PASSAGE_ID)!;
const independentPassage = getFlowChartPassage(FLOW_CHART_INDEPENDENT_PASSAGE_ID)!;

export const metadata: Metadata = {
  title: 'IELTS Flow-chart Completion: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="flow-chart-completion"
    path={ROUTE.path}
    indexPath="/practica/ielts/reading/tipos-de-preguntas"
    indexName="Reading Question Types"
    lessonLabel="IELTS Academic Reading · Question type"
    name="Flow-chart Completion"
    title={TITLE}
    description={DESCRIPTION}
    accent="#0f766e"
    directAnswer="Read the instruction and the entire flow first. Name the missing stage, connect the previous and next boxes, locate the matching passage section and copy only the exact words that keep the process logical."
    facts={[
      { label: 'Target', value: 'Process stage or result' },
      { label: 'Evidence', value: 'Sequence + neighbours + exact span' },
      { label: 'Main risk', value: 'Searching without reading the flow' },
    ]}
    outcomes={[
      { title: 'Read the process globally', text: 'Understand the start, transitions, conditions and final output before solving one gap.' },
      { title: 'Classify the stage', text: 'Predict whether each box needs an input, action, condition, result or output.' },
      { title: 'Reconnect exact evidence', text: 'Use the smallest passage span that preserves grammar, word limit and process logic.' },
    ]}
    method={[
      { title: 'Read the instruction', text: 'Confirm the answer source and record the maximum number of words.' },
      { title: 'Map the whole flow', text: 'Read every visible box and arrow; state the process from beginning to end.' },
      { title: 'Predict and locate', text: 'Use the missing stage and its two neighbours to find the correct passage zone.' },
      { title: 'Copy and reconnect', text: 'Insert the smallest exact span and reread the complete process path.' },
    ]}
    weakExample="Search the passage for one repeated noun while ignoring whether it belongs before or after the current process stage."
    strongExample="The previous box names the raw material and the next box describes the cleaned output, so locate the intervening action and copy the exact two-word phrase that preserves that transition."
    practice={<FlowChartCompletionGuidedPractice passage={guidedPassage} />}
    independentPracticeExperience={<FlowChartCompletionIndependentPractice passage={independentPassage} />}
    progressEngine={<FlowChartCompletionProgressEngine />}
    sourceReview={<SkillReviewSourceBlock
      accent="#0f766e"
      skillName="Flow-chart Completion"
      reviewedFocus={[
        'Guided, independent and Progress Engine passage pools are separated.',
        'Every response is checked against its stage type, neighbouring boxes, literal evidence, rebuilt process grammar and displayed maximum.',
        'Feedback diagnoses sequence skips, wrong stages, connector changes, grammar, answer boundaries and copied context.',
        'WeLearn publication authorization and candidate factual context remain distinct.',
      ]}
      sources={[
        { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms completion tasks using words from the text or a supplied list and that the stated word limit is binding.' },
        { label: 'WeLearn practice blueprint', note: 'Defines whole-process reading, held-back transfer, local persistence and the client-key security boundary.' },
      ]}
    />}
    independentPractice={[
      'Read the complete process and classify every missing stage before searching.',
      'Record the previous box, next box and exact evidence used for every response.',
      'Submit the full flow once, without opening hints or feedback.',
      'Repair only the stage-to-evidence links that changed sequence, grammar or scope.',
    ]}
    checklist={[
      'you can explain the full process before solving individual gaps',
      'you use neighbouring boxes and connectors to locate the right passage zone',
      'every inserted span is exact, natural and within the displayed limit',
      'you can explain why a nearby true phrase belongs to another stage',
    ]}
    faqs={ROUTE.faqs}
    officialNote="Flow-chart Completion is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources provide factual context but do not independently verify every composite claim or license WeLearn wording."
    nextLinks={[
      { href: '/practica/ielts/reading/tipos-de-preguntas/diagram-labeling', label: 'Continue to Diagram Labeling', primary: true },
      { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Strengthen word-limit control' },
      { href: '/practica/ielts/reading/habilidades/scanning', label: 'Strengthen scanning' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}
