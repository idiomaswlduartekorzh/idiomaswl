import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  MatchingHeadingsGuidedPractice,
  MatchingHeadingsIndependentPractice,
  MatchingHeadingsProgressEngine,
} from '@/components/exam-practice/MatchingHeadingsPracticeLab';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';
import {
  MATCHING_HEADINGS_GUIDED_PASSAGE_ID,
  MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID,
  getMatchingHeadingsPassage,
} from '@/data/practica-exams/ielts-reading-matching-headings-progress';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'matching-headings')!;
const TITLE = 'IELTS Matching Headings: match the whole paragraph function';
const DESCRIPTION = 'Learn to identify a paragraph’s central purpose, reject detail-level distractors and prove one heading across the whole paragraph.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getMatchingHeadingsPassage(MATCHING_HEADINGS_GUIDED_PASSAGE_ID)!;
const independentPassage = getMatchingHeadingsPassage(MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = {
  title: 'IELTS Matching Headings: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${PRACTICE_BASE_URL}${ROUTE.path}`,
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="matching-headings"
      path={ROUTE.path}
      indexPath="/practica/ielts/reading/tipos-de-preguntas"
      indexName="Reading Question Types"
      lessonLabel="IELTS Academic Reading · Question type"
      name="Matching Headings"
      title={TITLE}
      description={DESCRIPTION}
      directAnswer="Read the paragraph before the options, name its complete job in your own words, and choose the one heading that covers the opening, development and conclusion. Each heading can be used once; two headings remain unused."
      facts={[
        { label: 'Target', value: 'Main idea + function' },
        { label: 'Evidence', value: 'Whole paragraph' },
        { label: 'Main risk', value: 'Detail-level match' },
      ]}
      outcomes={[
        { title: 'Compress the paragraph', text: 'Express the paragraph’s complete job in one short phrase before the heading bank controls your attention.' },
        { title: 'Test global coverage', text: 'Use the opening, development, contrast and final sentence to check that one heading covers the full paragraph.' },
        { title: 'Reject attractive details', text: 'Identify lexical echoes, memorable examples, claims that are too broad and headings with the wrong paragraph function.' },
      ]}
      method={[
        { title: 'Read the paragraph first', text: 'Form a short label for what the entire paragraph does before comparing all headings.' },
        { title: 'Name its function', text: 'Decide whether the paragraph defines, contrasts, explains, evaluates, sequences or solves.' },
        { title: 'Eliminate narrow options', text: 'Reject headings that cover only one example, sentence or repeated word.' },
        { title: 'Prove one-to-one coverage', text: 'Choose one unused heading that works as the title of the complete paragraph, then test the closest competitor.' },
      ]}
      weakExample="Choose the heading with the most repeated vocabulary, even if it describes only one supporting example."
      strongExample="Summarise the paragraph as ‘a useful method with context-dependent limits’, reject the universal-solution heading as too broad, and verify that the remaining heading covers both the result and its qualification."
      practice={<MatchingHeadingsGuidedPractice passage={guidedPassage} />}
      independentPracticeExperience={<MatchingHeadingsIndependentPractice passage={independentPassage} />}
      progressEngine={<MatchingHeadingsProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#0369a1"
          skillName="Matching Headings"
          reviewedFocus={[
            'Guided, independent and Progress Engine passage pools are separated.',
            'A heading cannot be reused within a passage, and every full set contains two deliberately unused headings.',
            'Distractors are classified by a concrete failure: detail instead of main idea, keyword match, wrong paragraph function, excessive breadth or unsupported claim.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Matching Headings as a Reading task family based on the main idea of a paragraph or section and the use of extra headings.' },
            { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, non-reuse, explicit distractor analysis, local progress and the client-key security boundary.' },
          ]}
        />
      )}
      independentPractice={[
        'Write a five-word paragraph label before opening the heading bank.',
        'For every choice, quote evidence from at least two parts of the paragraph.',
        'Name the closest distractor and classify why it fails.',
        'Repeat only the paragraphs where your summary or coverage proof was incomplete.',
      ]}
      checklist={[
        'you can name the paragraph’s complete function before reading the headings',
        'you can prove your choice across the whole paragraph',
        'you can reject the closest heading with a specific reason',
        'you never reuse a heading or choose by lexical overlap alone',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Matching Headings is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode."
      nextLinks={[
        { href: '/practica/ielts/reading/tipos-de-preguntas/matching-information', label: 'Continue to Matching Information', primary: true },
        { href: '/practica/ielts/reading/habilidades/skimming', label: 'Strengthen skimming' },
        { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
