import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import { YnngGuidedPractice, YnngIndependentPractice, YnngProgressEngine } from '@/components/exam-practice/YnngPracticeLab';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';
import { YNNG_GUIDED_PASSAGE_ID, YNNG_INDEPENDENT_PASSAGE_ID, getYnngPassage } from '@/data/practica-exams/ielts-reading-ynng-progress';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'yes-no-not-given')!;
const TITLE = 'IELTS Yes / No / Not Given: track the writer’s exact position';
const DESCRIPTION = 'Learn to attribute a view to the writer, preserve its direction and strength, and separate genuine opposition from an unstated position.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getYnngPassage(YNNG_GUIDED_PASSAGE_ID)!;
const independentPassage = getYnngPassage(YNNG_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = { title: 'IELTS Yes / No / Not Given: Method, Practice and Progress', description: DESCRIPTION, keywords: ROUTE.keywords, alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` }, openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' } };

export default function Page() {
  return <InternationalReadingSkillLesson slug="yes-no-not-given" path={ROUTE.path} indexPath="/practica/ielts/reading/tipos-de-preguntas" indexName="Reading Question Types" lessonLabel="IELTS Academic Reading · Question type" name="Yes / No / Not Given" title={TITLE} description={DESCRIPTION}
    directAnswer="YES means the statement matches the writer’s view, NO means it opposes that view, and NOT GIVEN means the writer never reveals the exact position. First identify whose view it is; then preserve direction, strength and scope."
    facts={[{ label: 'YES', value: 'Same writer view' }, { label: 'NO', value: 'Opposing writer view' }, { label: 'NOT GIVEN', value: 'Writer view unstated' }]}
    outcomes={[{ title: 'Attribute the view', text: 'Separate the writer’s position from a critic, expert, institution or example described in the passage.' }, { title: 'Preserve stance force', text: 'Keep recommendation, preference, possibility, certainty, comparison and qualification intact.' }, { title: 'Protect genuine silence', text: 'Use NOT GIVEN when the topic appears but the writer never evaluates the exact proposal or relationship.' }]}
    method={[{ title: 'Mark the statement’s view', text: 'Underline the attributed person, stance verb, direction, degree, quantity and proposed action.' }, { title: 'Find the writer’s voice', text: 'Locate first-person judgement, evaluation, recommendation, contrast or a clearly signalled conclusion.' }, { title: 'Run the view-state test', text: 'Ask whether the writer agrees with this exact position, expresses an opposing position, or never takes a position.' }, { title: 'Ban borrowed opinions', text: 'Do not assign a critic’s claim, a general fact or your own reasonable belief to the writer.' }]}
    weakExample="The passage discusses AI risks, so the writer must oppose every AI tool in public libraries."
    strongExample="The writer discusses risks but explicitly rejects a universal ban and recommends safeguards. The writer’s position opposes the absolute statement, so the answer is No."
    practice={<YnngGuidedPractice passage={guidedPassage} />} independentPracticeExperience={<YnngIndependentPractice passage={independentPassage} />} progressEngine={<YnngProgressEngine />}
    sourceReview={<SkillReviewSourceBlock accent="#7c3aed" skillName="Yes / No / Not Given" reviewedFocus={['Guided, independent and Progress Engine passage pools are separated.', 'NO requires an opposing writer position; criticism, qualification or a lower priority is not automatically total opposition.', 'NOT GIVEN explanations identify the exact unstated preference, recommendation, comparison, frequency or policy.']} sources={[{ label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms identifying writer views or claims as a Reading task family and the YES, NO and NOT GIVEN response relationship.' }, { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, explicit writer-view attribution, local progress and the client-key security boundary.' }]} />}
    independentPractice={['Write writer agrees, writer opposes or writer view unstated before choosing the official label.', 'Quote the smallest span that proves the writer’s position and identify whose voice it contains.', 'If you choose NO, write the opposing writer proposition.', 'If you choose NOT GIVEN, name the precise preference, degree, comparison or policy the writer never states.']}
    checklist={['you identify whose view the statement attributes', 'you preserve direction, degree, recommendation and scope', 'you never use NO without an opposing writer position', 'you never convert a mentioned topic or outside belief into the writer’s view']}
    faqs={ROUTE.faqs} officialNote="Yes / No / Not Given is an official IELTS Academic Reading writer-views or claims task family. This page is guided WeLearn practice; because answer keys reach the browser, it is not a secure Exam or proctored mode."
    nextLinks={[{ href: '/practica/ielts/reading/tipos-de-preguntas/matching-headings', label: 'Continue to Matching Headings', primary: true }, { href: '/practica/ielts/reading/habilidades/inferencia', label: 'Review inference control' }, { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Review paraphrase control' }, { href: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given', label: 'Compare with TFNG' }, { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' }, { href: '/practica/ielts/reading', label: 'Back to Reading hub' }]} />;
}
