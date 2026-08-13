import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  ShortAnswerGuidedPractice,
  ShortAnswerIndependentPractice,
  ShortAnswerProgressEngine,
} from '@/components/exam-practice/ShortAnswerPracticeLab';
import {
  SHORT_ANSWER_GUIDED_PASSAGE_ID,
  SHORT_ANSWER_INDEPENDENT_PASSAGE_ID,
  SHORT_ANSWER_OFFICIAL_FORMAT_URL as IELTS_ACADEMIC_URL,
  getShortAnswerPassage,
} from '@/data/practica-exams/ielts-reading-short-answer-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'short-answer')!;
const TITLE = 'Short Answer: answer the exact factual question';
const DESCRIPTION = 'Classify what the question asks for, follow the passage evidence in order and copy the smallest exact span that answers that target within the displayed word limit.';
const guidedPassage = getShortAnswerPassage(SHORT_ANSWER_GUIDED_PASSAGE_ID)!;
const independentPassage = getShortAnswerPassage(SHORT_ANSWER_INDEPENDENT_PASSAGE_ID)!;

export const metadata: Metadata = {
  title: 'IELTS Short Answer: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="short-answer"
    path={ROUTE.path}
    indexPath="/practica/ielts/reading/tipos-de-preguntas"
    indexName="Reading Question Types"
    lessonLabel="IELTS Academic Reading · Question type"
    name="Short Answer"
    title={TITLE}
    description={DESCRIPTION}
    accent="#be123c"
    directAnswer="Read the word limit first. Classify the requested target—person, place, time, quantity, object, reason or result—then scan in question order and copy only the exact passage words that answer it."
    facts={[
      { label: 'Target', value: 'One precise factual detail' },
      { label: 'Evidence', value: 'Question focus + ordered passage span' },
      { label: 'Main risk', value: 'A nearby true detail that answers something else' },
    ]}
    outcomes={[
      { title: 'Predict the answer type', text: 'Turn the question word and grammar into a precise person, place, time, quantity, object, reason or result target.' },
      { title: 'Search in order', text: 'Use question sequence and paraphrases to narrow the next evidence zone without guessing from one keyword.' },
      { title: 'Control the final span', text: 'Copy the smallest exact wording that answers the question and remains within the displayed maximum.' },
    ]}
    method={[
      { title: 'Read the instruction', text: 'Record whether words, numbers or both are allowed and the exact maximum.' },
      { title: 'Classify the target', text: 'Name what the question asks for before you scan: who, where, when, how many, what, why or what result.' },
      { title: 'Locate the next evidence zone', text: 'Follow question order, scan for meaning and read enough context to reject nearby true details.' },
      { title: 'Copy minimally and rebuild', text: 'Insert the smallest exact passage span, then reread question plus answer for scope, grammar and word count.' },
    ]}
    weakExample="Copy a full sentence because it contains the topic words from the question."
    strongExample="The question asks where the event takes place, so reject a nearby time expression and copy only the two-word location that answers the requested target."
    practice={<ShortAnswerGuidedPractice passage={guidedPassage} />}
    independentPracticeExperience={<ShortAnswerIndependentPractice passage={independentPassage} />}
    progressEngine={<ShortAnswerProgressEngine />}
    sourceReview={<SkillReviewSourceBlock
      accent="#be123c"
      skillName="Short Answer"
      reviewedFocus={[
        'Guided, independent and Progress Engine passage pools are separated.',
        'Every response is a literal, ordered passage span that answers a named factual target within the displayed maximum.',
        'Feedback diagnoses wrong targets, wrong evidence zones, nearby details, copied context, word-limit failures and outside knowledge.',
        'Candidate factual sources and WeLearn publication authorization remain distinct from official IELTS format guidance.',
      ]}
      sources={[
        { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Short-answer Questions as answering factual details with words and/or numbers from the text, in passage order, under a binding word limit.' },
        { label: 'WeLearn practice blueprint', note: 'Defines target prediction, ordered evidence windows, held-back transfer, local persistence and the client-key security boundary.' },
      ]}
    />}
    independentPractice={[
      'Classify all six requested targets before scanning the passage.',
      'Follow the evidence in order and record the exact passage span for every answer.',
      'Submit one complete set before opening any key or explanation.',
      'Repair only responses with the wrong target, evidence zone, answer boundary or word count.',
    ]}
    checklist={[
      'you name the requested answer type before searching',
      'you use question order and paraphrase to narrow the evidence window',
      'every response is the smallest exact passage span within the displayed limit',
      'you can explain why a nearby true detail answers a different question',
    ]}
    faqs={ROUTE.faqs}
    officialNote="Short-answer Questions are an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources provide factual context but do not independently verify every composite claim or license WeLearn wording."
    nextLinks={[
      { href: '/practica/ielts/reading/mixed-practice', label: 'Continue to Mixed Practice', primary: true },
      { href: '/practica/ielts/reading/habilidades/scanning', label: 'Strengthen scanning' },
      { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Strengthen word-limit control' },
      { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}
