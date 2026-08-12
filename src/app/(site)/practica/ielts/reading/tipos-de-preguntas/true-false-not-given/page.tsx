import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import { TfngGuidedPractice, TfngIndependentPractice, TfngProgressEngine } from '@/components/exam-practice/TfngPracticeLab';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';
import { TFNG_GUIDED_PASSAGE_ID, TFNG_INDEPENDENT_PASSAGE_ID, getTfngPassage } from '@/data/practica-exams/ielts-reading-tfng-progress';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'true-false-not-given')!;
const TITLE = 'IELTS True / False / Not Given: prove the exact evidence state';
const DESCRIPTION = 'Learn to separate confirmation, direct contradiction and genuinely missing information without guessing from topic knowledge.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getTfngPassage(TFNG_GUIDED_PASSAGE_ID)!;
const independentPassage = getTfngPassage(TFNG_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = { title: 'IELTS True / False / Not Given: Method, Practice and Progress', description: DESCRIPTION, keywords: ROUTE.keywords, alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` }, openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' } };

export default function Page() {
  return <InternationalReadingSkillLesson slug="true-false-not-given" path={ROUTE.path} indexPath="/practica/ielts/reading/tipos-de-preguntas" indexName="Reading Question Types" lessonLabel="IELTS Academic Reading · Question type" name="True / False / Not Given" title={TITLE} description={DESCRIPTION}
    directAnswer="TRUE needs the same exact claim, FALSE needs an incompatible passage claim, and NOT GIVEN means the passage leaves the exact relationship unresolved. A related topic is never enough."
    facts={[{ label: 'TRUE', value: 'Same claim' }, { label: 'FALSE', value: 'Incompatible claim' }, { label: 'NOT GIVEN', value: 'Unresolved claim' }]}
    outcomes={[{ title: 'Decompose the statement', text: 'Preserve subject, action, quantity, comparison, timing, certainty and polarity.' }, { title: 'Demand an actual opposite', text: 'Use FALSE only when passage evidence cannot coexist with the statement.' }, { title: 'Protect missing information', text: 'Choose NOT GIVEN when the exact quantity, comparison, cause or identity is absent.' }]}
    method={[{ title: 'Mark the claim boundaries', text: 'Underline the subject, verb, quantifier, comparison, time marker and absolute language.' }, { title: 'Locate the topic zone', text: 'Search by meaning and paraphrase, then read enough context to recover the full relationship.' }, { title: 'Run the three-state test', text: 'Ask: same claim, incompatible claim, or not enough passage evidence to decide?' }, { title: 'Ban outside knowledge', text: 'Do not use what seems logical, usual or scientifically plausible unless this passage states it.' }]}
    weakExample="The passage mentions viewing points, so a statement comparing their construction cost must be either True or False."
    strongExample="The passage mentions viewing points but provides no cost comparison. Nothing in the text proves or contradicts the price relationship, so the answer is Not Given."
    practice={<TfngGuidedPractice passage={guidedPassage} />} independentPracticeExperience={<TfngIndependentPractice passage={independentPassage} />} progressEngine={<TfngProgressEngine />}
    sourceReview={<SkillReviewSourceBlock accent="#0369a1" skillName="True / False / Not Given" reviewedFocus={['Guided, independent and Progress Engine passage pools are separated.', 'FALSE requires direct incompatibility; a weaker or merely different claim is not automatically the opposite.', 'NOT GIVEN items withhold the exact quantity, identity, price, date or policy instead of hiding the answer behind trivia.']} sources={[{ label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms identifying-information questions and the TRUE, FALSE and NOT GIVEN relationship defined by the task instructions.' }, { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, explicit evidence states, local progress and the client-key security boundary.' }]} />}
    independentPractice={['Write same, opposite or unresolved before choosing the official label.', 'Quote the smallest evidence span that controls the exact claim.', 'If you choose FALSE, write the incompatible passage proposition.', 'If you choose NOT GIVEN, name the precise missing relationship.']}
    checklist={['you preserve quantity, time, comparison, certainty and polarity', 'you never use FALSE without an incompatible passage claim', 'you never use outside knowledge to fill an evidence gap', 'you can explain why related information does not resolve the statement']}
    faqs={ROUTE.faqs} officialNote="True / False / Not Given is an official IELTS Academic Reading task family. This page is guided WeLearn practice; because answer keys reach the browser, it is not a secure Exam or proctored mode."
    nextLinks={[{ href: '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given', label: 'Continue to Yes / No / Not Given', primary: true }, { href: '/practica/ielts/reading/habilidades/scanning', label: 'Review evidence location' }, { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Review paraphrase control' }, { href: '/practica/ielts/reading/habilidades/inferencia', label: 'Review inference control' }, { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' }, { href: '/practica/ielts/reading', label: 'Back to Reading hub' }]} />;
}
