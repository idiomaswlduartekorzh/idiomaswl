import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  SentenceCompletionGuidedPractice,
  SentenceCompletionIndependentPractice,
  SentenceCompletionProgressEngine,
} from '@/components/exam-practice/SentenceCompletionPracticeLab';
import {
  SENTENCE_COMPLETION_GUIDED_PASSAGE_ID,
  SENTENCE_COMPLETION_INDEPENDENT_PASSAGE_ID,
  getSentenceCompletionPassage,
} from '@/data/practica-exams/ielts-reading-sentence-completion-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'sentence-completion')!;
const TITLE = 'Sentence Completion: predict, locate and copy precisely';
const DESCRIPTION = 'Learn to predict the missing grammar, locate an equivalent passage idea and copy the smallest exact answer that fits the displayed word limit.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getSentenceCompletionPassage(SENTENCE_COMPLETION_GUIDED_PASSAGE_ID)!;
const independentPassage = getSentenceCompletionPassage(SENTENCE_COMPLETION_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = {
  title: 'IELTS Sentence Completion: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="sentence-completion"
      path={ROUTE.path}
      indexPath="/practica/ielts/reading/tipos-de-preguntas"
      indexName="Reading Question Types"
      lessonLabel="IELTS Academic Reading · Question type"
      name="Sentence Completion"
      title={TITLE}
      description={DESCRIPTION}
      accent="#0369a1"
      directAnswer="Read the instruction first. Predict the missing grammatical form, locate the same idea in the passage and copy only the exact words needed to rebuild the sentence within the stated limit."
      facts={[
        { label: 'Target', value: 'Exact missing passage span' },
        { label: 'Evidence', value: 'Meaning + grammar + word limit' },
        { label: 'Main risk', value: 'True nearby words that do not fit' },
      ]}
      outcomes={[
        { title: 'Predict before searching', text: 'Use the words around the gap to predict a noun, verb, adjective, number or short phrase.' },
        { title: 'Locate equivalent meaning', text: 'Search for the paraphrased idea and control the exact evidence zone before copying.' },
        { title: 'Copy the answer boundary', text: 'Submit only the missing passage words, without repeating a frame word or exceeding the instruction.' },
      ]}
      method={[
        { title: 'Read the instruction', text: 'Record whether the task says ONE WORD ONLY, NO MORE THAN TWO WORDS or another explicit limit.' },
        { title: 'Predict grammar and meaning', text: 'Read the complete sentence frame and describe what kind of information the gap must contain.' },
        { title: 'Locate the paraphrase', text: 'Find where the passage expresses the same relationship, then read enough context to reject nearby details.' },
        { title: 'Copy and rebuild', text: 'Insert the smallest exact span, count the submitted words and reread the completed sentence for natural grammar.' },
      ]}
      weakExample="Copy a nearby phrase because it repeats one word from the sentence, even if it answers a different detail."
      strongExample="Predict a two-word noun phrase, locate the equivalent passage sentence and copy only the missing phrase after checking grammar and the displayed limit."
      practice={<SentenceCompletionGuidedPractice passage={guidedPassage} />}
      independentPracticeExperience={<SentenceCompletionIndependentPractice passage={independentPassage} />}
      progressEngine={<SentenceCompletionProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#0369a1"
          skillName="Sentence Completion"
          reviewedFocus={[
            'Guided, independent and Progress Engine passage pools are separated.',
            'Every stored answer is a literal passage span that fits its rebuilt sentence and displayed maximum.',
            'Feedback separates wrong evidence, incomplete spans, grammar mismatch, repeated frame words, excess words and instruction errors.',
            'Candidate sources are presented with limitations; they do not certify every composite claim, authorship or rights clearance.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Sentence Completion as completing sentence beginnings with words taken from the text and that the stated word limit is binding.' },
            { label: 'WeLearn practice blueprint', note: 'Defines exact-span scoring, held-back transfer, local persistence and the client-key security boundary.' },
          ]}
        />
      )}
      independentPractice={[
        'Write the word limit beside the set before searching the passage.',
        'Predict the missing grammatical form and meaning for every frame.',
        'Underline the exact passage span and the sentence words already supplied by the frame.',
        'After submission, classify each miss before retrying only the weak evidence chain.',
      ]}
      checklist={[
        'you derive the answer limit from the displayed instruction',
        'you can locate the paraphrased evidence rather than chase one repeated word',
        'the completed sentence is grammatical and preserves the passage meaning',
        'you submit only the missing words and can explain why a nearby span fails',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Sentence Completion is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources provide context but do not by themselves establish authorship, rights clearance or complete factual verification."
      nextLinks={[
        { href: '/practica/ielts/reading/tipos-de-preguntas/summary-completion', label: 'Continue to Summary Completion', primary: true },
        { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Strengthen word-limit control' },
        { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
