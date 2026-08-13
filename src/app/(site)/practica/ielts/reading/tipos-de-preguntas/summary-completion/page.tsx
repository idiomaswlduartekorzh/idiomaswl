import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  SummaryCompletionGuidedPractice,
  SummaryCompletionIndependentPractice,
  SummaryCompletionProgressEngine,
} from '@/components/exam-practice/SummaryCompletionPracticeLab';
import {
  SUMMARY_COMPLETION_GUIDED_PASSAGE_ID,
  SUMMARY_COMPLETION_INDEPENDENT_PASSAGE_ID,
  getSummaryCompletionPassage,
} from '@/data/practica-exams/ielts-reading-summary-completion-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'summary-completion')!;
const TITLE = 'Summary Completion: rebuild connected meaning';
const DESCRIPTION = 'Read the complete summary, map its logical sequence, locate the equivalent passage section and copy the smallest exact answer that fits grammar and the stated limit.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getSummaryCompletionPassage(SUMMARY_COMPLETION_GUIDED_PASSAGE_ID)!;
const independentPassage = getSummaryCompletionPassage(SUMMARY_COMPLETION_INDEPENDENT_PASSAGE_ID)!;

export const metadata: Metadata = {
  title: 'IELTS Summary Completion: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="summary-completion"
      path={ROUTE.path}
      indexPath="/practica/ielts/reading/tipos-de-preguntas"
      indexName="Reading Question Types"
      lessonLabel="IELTS Academic Reading · Question type"
      name="Summary Completion"
      title={TITLE}
      description={DESCRIPTION}
      accent="#0369a1"
      directAnswer="Read the full summary before any gap. Use its sequence, reference words and grammar to locate one passage section, then copy only the missing words within the displayed limit."
      facts={[
        { label: 'Target', value: 'Connected summary meaning' },
        { label: 'Evidence', value: 'Summary logic + equivalent passage section' },
        { label: 'Main risk', value: 'Solving six isolated gaps' },
      ]}
      outcomes={[
        { title: 'Map the summary first', text: 'Identify cause, contrast, sequence and reference before searching for individual answers.' },
        { title: 'Follow one evidence zone', text: 'Track how the summary compresses and paraphrases a connected passage section.' },
        { title: 'Rebuild every sentence', text: 'Check literal wording, grammar, duplication and the displayed word limit.' },
      ]}
      method={[
        { title: 'Read the instruction', text: 'Record whether answers come from the passage or a list and copy the maximum word count.' },
        { title: 'Read the whole summary', text: 'Mark logical connectors, pronouns and the topic progression before touching a blank.' },
        { title: 'Predict and locate', text: 'Name the required grammar and meaning, then find the passage section with the same idea sequence.' },
        { title: 'Copy and reconnect', text: 'Insert the smallest exact span and reread the complete summary for cohesion and grammar.' },
      ]}
      weakExample="Search each blank independently and copy the nearest repeated noun, even when it belongs to another stage of the summary."
      strongExample="Use the summary’s cause-result sequence to locate the matching paragraph, then copy the two-word noun phrase that preserves both grammar and connected meaning."
      practice={<SummaryCompletionGuidedPractice passage={guidedPassage} />}
      independentPracticeExperience={<SummaryCompletionIndependentPractice passage={independentPassage} />}
      progressEngine={<SummaryCompletionProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#0369a1"
          skillName="Summary Completion"
          reviewedFocus={[
            'Guided, independent and Progress Engine passage pools are separated.',
            'All accepted responses are literal passage spans within the displayed maximum.',
            'Feedback distinguishes cohesion, evidence-zone, grammar, answer-boundary and instruction errors.',
            'The inherited “the roof” alternative is excluded because it produces the ungrammatical frame “the the roof”.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Summary Completion as completing a summary with words from the text or a supplied list and that a stated word limit is binding.' },
            { label: 'WeLearn practice blueprint', note: 'Defines connected-summary reading, held-back transfer, local persistence and the client-key security boundary.' },
          ]}
        />
      )}
      independentPractice={[
        'Read the entire summary and mark its logical sequence before searching.',
        'Predict the grammar and meaning required by every gap.',
        'Locate the connected passage section and record an exact evidence span.',
        'Submit the full set once, then repair only weak cohesion or evidence chains.',
      ]}
      checklist={[
        'you can explain the summary’s sequence before filling a gap',
        'you locate one connected passage zone instead of chasing isolated keywords',
        'every inserted span is grammatical and within the displayed limit',
        'you can explain why a nearby true detail belongs to a different summary position',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Summary Completion is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources provide context but do not by themselves establish authorship, rights clearance or complete factual verification."
      nextLinks={[
        { href: '/practica/ielts/reading/tipos-de-preguntas/note-completion', label: 'Continue to Note Completion', primary: true },
        { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Strengthen word-limit control' },
        { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
