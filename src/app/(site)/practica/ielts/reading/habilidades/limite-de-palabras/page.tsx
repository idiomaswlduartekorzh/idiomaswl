import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import { WordLimitGuidedPractice, WordLimitIndependentPractice, WordLimitProgressEngine } from '@/components/exam-practice/WordLimitPracticeLab';
import { WORD_LIMIT_GUIDED_PASSAGE_ID, WORD_LIMIT_INDEPENDENT_PASSAGE_ID, getWordLimitPassage } from '@/data/practica-exams/ielts-reading-word-limit-progress';
import { IELTS_READING_SKILLS, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'limite-de-palabras')!;
const TITLE = 'Word-limit control: copy the smallest answer that fits';
const DESCRIPTION = 'Parse the instruction, predict the missing grammar, locate the exact passage span and remove every unnecessary word before submitting.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getWordLimitPassage(WORD_LIMIT_GUIDED_PASSAGE_ID)!;
const independentPassage = getWordLimitPassage(WORD_LIMIT_INDEPENDENT_PASSAGE_ID)!;

export const metadata: Metadata = {
  title: 'IELTS Reading Word Limits: Rules, Examples and Practice', description: DESCRIPTION, keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="limite-de-palabras" name="Word-limit control" title={TITLE} description={DESCRIPTION}
    directAnswer="Treat the word limit as part of the question. A factually correct phrase still loses the mark if it exceeds the stated maximum or fails to complete the sentence grammatically."
    facts={[{ label: 'First', value: 'Read the limit' }, { label: 'Then', value: 'Fit the gap' }, { label: 'Finally', value: 'Count again' }]}
    outcomes={[
      { title: 'Parse the instruction', text: 'Distinguish words-only instructions from words-and/or-a-number instructions.' },
      { title: 'Predict the grammar', text: 'Use the words before and after the gap to decide whether you need a noun, phrase, number or modifier.' },
      { title: 'Copy minimally', text: 'Take the shortest exact span that preserves meaning and completes the sentence naturally.' },
    ]}
    method={[
      { title: 'Write the maximum', text: 'Record the allowed number of words before looking for an answer.' },
      { title: 'Read across the gap', text: 'Combine the frame before and after the blank to predict grammar and meaning.' },
      { title: 'Locate the exact span', text: 'Find the matching passage sentence and select only the required words.' },
      { title: 'Rebuild and count', text: 'Read the completed sentence aloud, remove duplication and count the final response.' },
    ]}
    weakExample="Frame: ‘during ___’; passage: ‘during long summer afternoons’; answer: ‘long summer afternoons’ under a two-word limit."
    strongExample="Answer ‘summer afternoons’: it keeps the required time meaning, fits after during and stays within two words."
    practice={<WordLimitGuidedPractice passage={guidedPassage} />}
    independentPracticeExperience={<WordLimitIndependentPractice passage={independentPassage} />}
    progressEngine={<WordLimitProgressEngine />}
    sourceReview={(
      <SkillReviewSourceBlock
        accent="#0f766e"
        skillName="Word-limit control"
        reviewedFocus={[
          'Every answer is checked against the displayed instruction and the completed sentence grammar.',
          'Practice distinguishes a correct evidence span from an over-limit or duplicated response.',
          'The lesson does not generalise one word-limit formula to every official task.',
        ]}
        sources={[
          { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Used to verify that task instructions and word limits are binding.' },
          { label: 'WeLearn original practice sets', note: 'Used to train minimal grammatical answers without reproducing official questions.' },
        ]}
      />
    )}
    independentPractice={[
      'Restate the instruction before reading each completion frame.',
      'Predict the missing grammar, then locate the exact passage sentence.',
      'Copy only the missing span and rebuild the complete sentence.',
      'Classify every miss as limit, boundary, grammar or evidence.',
    ]}
    checklist={[
      'you read and restate the instruction before answering',
      'your answer completes the sentence grammatically',
      'you do not repeat words already present in the frame',
      'you count the submitted response rather than the whole passage phrase',
    ]}
    faqs={ROUTE.faqs}
    officialNote="Word limits are binding in IELTS completion and short-answer tasks. This WeLearn lesson trains instruction control; always follow the exact wording shown in the task you are completing."
    nextLinks={[
      { href: '/practica/ielts/reading/habilidades/gestion-del-tiempo', label: 'Continue to time management', primary: true },
      { href: '/practica/ielts/reading/habilidades/scanning', label: 'Review evidence location' },
      { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Review paraphrase recognition' },
      { href: '/practica/ielts/reading/tipos-de-preguntas/summary-completion', label: 'Practise Summary Completion' },
      { href: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion', label: 'Practise Sentence Completion' },
      { href: '/practica/ielts/reading/tipos-de-preguntas/short-answer', label: 'Practise Short Answer' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}

// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md
