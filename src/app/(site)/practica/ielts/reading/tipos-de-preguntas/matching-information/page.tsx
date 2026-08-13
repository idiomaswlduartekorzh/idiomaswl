import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
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
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'matching-information')!;
const TITLE = 'Matching Information: locate the paragraph with the exact detail';
const DESCRIPTION = 'Learn to build distinctive search signals, scan for paraphrase and confirm the complete detail before matching a statement to a paragraph.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getMatchingInformationPassage(MATCHING_INFORMATION_GUIDED_PASSAGE_ID)!;
const independentPassage = getMatchingInformationPassage(MATCHING_INFORMATION_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = {
  title: 'IELTS Matching Information: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="matching-information"
      path={ROUTE.path}
      indexPath="/practica/ielts/reading/tipos-de-preguntas"
      indexName="Reading Question Types"
      lessonLabel="IELTS Academic Reading · Question type"
      name="Matching Information"
      title={TITLE}
      description={DESCRIPTION}
      directAnswer="Read the statements first, build a distinctive search signal, scan every paragraph for a paraphrase and confirm the complete entity, action and relationship. The same paragraph may answer more than one statement."
      facts={[
        { label: 'Target', value: 'Specific information' },
        { label: 'Evidence', value: 'Exact detail + context' },
        { label: 'Main risk', value: 'General topic match' },
      ]}
      outcomes={[
        { title: 'Build useful search signals', text: 'Convert each statement into a distinctive entity, action, outcome, reason, comparison or qualification.' },
        { title: 'Scan for paraphrase', text: 'Locate equivalent meaning rather than waiting for identical wording.' },
        { title: 'Control nearby traps', text: 'Reject paragraphs that share the topic but change the entity, relationship, scope or required detail.' },
      ]}
      method={[
        { title: 'Read statements first', text: 'Underline the entity, action and logical relationship before reading every paragraph closely.' },
        { title: 'Build a search signal', text: 'Choose the least repeatable detail: a reason, unusual result, comparison, technical process or qualification.' },
        { title: 'Scan the passage map', text: 'Move quickly by meaning and paraphrase; a paragraph may be used more than once.' },
        { title: 'Confirm both sides', text: 'Read around the candidate sentence and verify that entity, action and relationship all match the statement.' },
      ]}
      weakExample="Choose Paragraph B because it discusses the same broad topic and repeats one word from the statement."
      strongExample="Choose Paragraph D because it contains the delayed consequence and the affected group expressed in paraphrase; reject B because it mentions the topic but describes a different result."
      practice={<MatchingInformationGuidedPractice passage={guidedPassage} />}
      independentPracticeExperience={<MatchingInformationIndependentPractice passage={independentPassage} />}
      progressEngine={<MatchingInformationProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#0369a1"
          skillName="Matching Information"
          reviewedFocus={[
            'Guided, independent and Progress Engine passage pools are separated.',
            'A paragraph may be reused when it contains more than one requested detail.',
            'Feedback names topic matches, entity confusion, qualifier loss, lexical echoes, relationship mismatches and nearby true details.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Matching Information as locating specific information in lettered paragraphs or sections and permits paragraph reuse when instructions state it.' },
            { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, explicit evidence confirmation, local progress and the client-key security boundary.' },
          ]}
        />
      )}
      independentPractice={[
        'Write one distinctive search signal beside each statement before scanning.',
        'For every location, quote the precise sentence that proves the complete detail.',
        'Name the closest topic-match paragraph and explain what relationship or qualifier it lacks.',
        'Repeat only the items where your signal or context check was incomplete.',
      ]}
      checklist={[
        'you can distinguish a paragraph topic from a requested specific detail',
        'you scan for paraphrase rather than identical vocabulary',
        'you preserve entity, action, scope, time and cause',
        'you reuse a paragraph only when separate statements are genuinely supported there',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Matching Information is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources do not by themselves prove authorship or full factual verification."
      nextLinks={[
        { href: '/practica/ielts/reading/tipos-de-preguntas/matching-features', label: 'Continue to Matching Features', primary: true },
        { href: '/practica/ielts/reading/habilidades/scanning', label: 'Strengthen scanning' },
        { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
