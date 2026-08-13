import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  MatchingSentenceEndingsGuidedPractice,
  MatchingSentenceEndingsIndependentPractice,
  MatchingSentenceEndingsProgressEngine,
} from '@/components/exam-practice/MatchingSentenceEndingsPracticeLab';
import {
  SENTENCE_ENDINGS_GUIDED_PASSAGE_ID,
  SENTENCE_ENDINGS_INDEPENDENT_PASSAGE_ID,
  getSentenceEndingPassage,
} from '@/data/practica-exams/ielts-reading-matching-sentence-endings-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'matching-sentence-endings')!;
const TITLE = 'Matching Sentence Endings: join grammar to passage evidence';
const DESCRIPTION = 'Learn to predict the relationship a sentence needs, filter endings for grammar and prove the one best completion with exact passage evidence.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getSentenceEndingPassage(SENTENCE_ENDINGS_GUIDED_PASSAGE_ID)!;
const independentPassage = getSentenceEndingPassage(SENTENCE_ENDINGS_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = {
  title: 'IELTS Matching Sentence Endings: method and practice',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="matching-sentence-endings"
      path={ROUTE.path}
      indexPath="/practica/ielts/reading/tipos-de-preguntas"
      indexName="Reading Question Types"
      lessonLabel="IELTS Academic Reading · Question type"
      name="Matching Sentence Endings"
      title={TITLE}
      description={DESCRIPTION}
      accent="#b45309"
      directAnswer="Read the sentence beginnings first and predict the relationship each one needs. Use grammar to remove impossible endings, then use passage evidence—not natural sound or repeated vocabulary—to choose the one best completion."
      facts={[
        { label: 'Target', value: 'One best completion' },
        { label: 'Evidence', value: 'Grammar + relationship + text' },
        { label: 'Main risk', value: 'Natural but unsupported ending' },
      ]}
      outcomes={[
        { title: 'Predict the relationship', text: 'Recognise whether the beginning needs a cause, result, method, condition, contrast or timing relationship.' },
        { title: 'Use grammar as a filter', text: 'Remove endings that cannot form a natural sentence without mistaking grammatical fit for proof.' },
        { title: 'Control meaning precisely', text: 'Reject endings that change polarity, timing, scope, certainty or the passage evidence zone.' },
      ]}
      method={[
        { title: 'Read the beginnings first', text: 'Underline the subject and verb, then predict the missing logical relationship before reading every ending.' },
        { title: 'Filter impossible grammar', text: 'Check connectors, verb form, reference and sentence structure. Keep every grammatically possible option.' },
        { title: 'Locate the passage idea', text: 'Find the beginning in paraphrase and read enough context to understand its exact claim.' },
        { title: 'Prove the final pair', text: 'Compare the best two endings and reject the competitor with one explicit mismatch in meaning or evidence.' },
      ]}
      weakExample="Choose the ending because the completed sentence sounds natural and repeats words from the passage."
      strongExample="Keep two grammatically possible endings, locate the claim in the passage and choose the one that preserves the stated cause and level of certainty."
      practice={<MatchingSentenceEndingsGuidedPractice passage={guidedPassage} />}
      independentPracticeExperience={<MatchingSentenceEndingsIndependentPractice passage={independentPassage} />}
      progressEngine={<MatchingSentenceEndingsProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#b45309"
          skillName="Matching Sentence Endings"
          reviewedFocus={[
            'Guided, independent and Progress Engine question pools are separated.',
            'Grammar is treated as a filter; the passage relationship makes the final decision.',
            'One ambiguous legacy item and two items that broke passage-information order are excluded from progressive practice.',
            'Feedback diagnoses grammar-only choices, relationship changes, scope inflation, polarity reversal, lexical echo and the wrong evidence zone.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Matching Sentence Endings as completing sentence beginnings with endings from a list and tests understanding of main ideas.' },
            { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, explicit competitor rejection, local persistence and the client-key security boundary.' },
          ]}
        />
      )}
      independentPractice={[
        'Predict the relationship required by every beginning before opening the ending list.',
        'Keep all endings that fit grammatically, then quote the passage evidence for the final answer.',
        'Name the closest competing ending and explain the exact relationship it changes.',
        'Repeat only the items where grammar or evidence control was incomplete.',
      ]}
      checklist={[
        'you can separate grammatical fit from passage proof',
        'you preserve cause, result, condition, timing, scope and polarity',
        'you can reject the closest ending with exact evidence',
        'you do not assume a reuse rule that the task instructions do not state',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Matching Sentence Endings is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources provide context but do not by themselves verify every composite scenario or establish authorship."
      nextLinks={[
        { href: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion', label: 'Continue to Sentence Completion', primary: true },
        { href: '/practica/ielts/reading/tipos-de-preguntas/matching-features', label: 'Compare with Matching Features' },
        { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
