import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import { ScanningIndependentPractice, ScanningPracticeEngine, ScanningProgressEngine } from '@/components/exam-practice/ScanningPracticeLab';
import { IELTS_READING_SKILLS, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';
import { SCANNING_GUIDED_PASSAGE_ID, SCANNING_INDEPENDENT_PASSAGE_ID, getScanningPassage } from '@/data/practica-exams/ielts-reading-scanning-progress';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'scanning')!;
const TITLE = 'Scanning: locate evidence without rereading the whole passage';
const DESCRIPTION = 'Turn a question into searchable signals, find the likely evidence zone and read around the match before you commit to an answer.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getScanningPassage(SCANNING_GUIDED_PASSAGE_ID)!;
const independentPassage = getScanningPassage(SCANNING_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = {
  title: 'IELTS Reading Scanning: Evidence Method and Practice', description: DESCRIPTION, keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="scanning" name="Scanning" title={TITLE} description={DESCRIPTION}
      directAnswer="Scan only after you know what you are looking for. Search for a distinctive name, number, term or paraphrase, then read the full sentence and its immediate context."
      facts={[{ label: 'Input', value: 'Search signal' }, { label: 'Action', value: 'Locate + read' }, { label: 'Output', value: 'Exact evidence' }]}
      outcomes={[
        { title: 'Build a search signal', text: 'Reduce the question to a name, date, number, technical term, cause or scope word.' },
        { title: 'Recognise paraphrase', text: 'Expect the passage to express the same idea with different vocabulary or grammar.' },
        { title: 'Control context', text: 'Read around the match so a nearby detail does not become a false answer.' },
      ]}
      method={[
        { title: 'Underline the target', text: 'Identify what the question truly asks: person, time, reason, change, quantity or location.' },
        { title: 'Predict its form', text: 'Decide whether the evidence is likely to be a number, noun phrase, comparison or causal statement.' },
        { title: 'Move through the likely zone', text: 'Use your passage map and scan visually for the signal or a close paraphrase.' },
        { title: 'Read and verify', text: 'Read one sentence before and after the match, then test scope, polarity and word limit.' },
      ]}
      weakExample="Starting again at Paragraph A every time a question asks for one date, name or local detail."
      strongExample="Turn ‘When did the pilot expand?’ into the signals pilot + expand + date, scan the likely results paragraph, then read around the matching year."
      practice={<ScanningPracticeEngine passage={guidedPassage} />}
      independentPracticeExperience={<ScanningIndependentPractice passage={independentPassage} />}
      progressEngine={<ScanningProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#0369a1"
          skillName="Scanning"
          reviewedFocus={[
            'The lesson separates locating a signal from verifying the complete evidence window.',
            'Distractors test entity, number, scope, polarity and nearby-detail errors rather than random vocabulary.',
            'Scanning is labelled as a WeLearn reading strategy, not a standalone official IELTS task.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Used to distinguish official task families from the WeLearn evidence-location method.' },
            { label: 'WeLearn practice blueprint', note: 'Defines guided signal selection, independent transfer, progression and persistent review.' },
          ]}
        />
      )}
      independentPractice={[
        'Take six question stems and underline one high-value search signal in each.',
        'Predict the grammatical form of each answer before returning to the passage.',
        'Locate the signal or paraphrase and record the exact evidence sentence.',
        'Reject any answer you cannot support with a precise span of text.',
      ]}
      checklist={[
        'you convert a question into a concrete search signal',
        'you distinguish similar numbers or names that answer different questions',
        'you look for paraphrase when an exact word match is absent',
        'you read around the match before selecting an answer',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Scanning is a WeLearn evidence-location strategy, not a separate official IELTS task. It is especially useful for Matching Information, completion tasks, diagram labels and short answers."
      nextLinks={[
        { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Continue to paraphrase recognition', primary: true },
        { href: '/practica/ielts/reading/habilidades/skimming', label: 'Review passage mapping with Skimming' },
        { href: '/practica/ielts/reading/tipos-de-preguntas/matching-information', label: 'Practise Matching Information' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
