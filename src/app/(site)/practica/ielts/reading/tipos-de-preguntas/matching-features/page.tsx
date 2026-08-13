import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  MatchingFeaturesGuidedPractice,
  MatchingFeaturesIndependentPractice,
  MatchingFeaturesProgressEngine,
} from '@/components/exam-practice/MatchingFeaturesPracticeLab';
import {
  MATCHING_FEATURES_GUIDED_PASSAGE_ID,
  MATCHING_FEATURES_INDEPENDENT_PASSAGE_ID,
  getMatchingFeaturesPassage,
} from '@/data/practica-exams/ielts-reading-matching-features-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'matching-features')!;
const TITLE = 'Matching Features: prove who or what owns each claim';
const DESCRIPTION = 'Learn to connect statements with people, projects, policies or processes by proving the exact actor–action–result relationship.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getMatchingFeaturesPassage(MATCHING_FEATURES_GUIDED_PASSAGE_ID)!;
const independentPassage = getMatchingFeaturesPassage(MATCHING_FEATURES_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = {
  title: 'IELTS Matching Features: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="matching-features"
      path={ROUTE.path}
      indexPath="/practica/ielts/reading/tipos-de-preguntas"
      indexName="Reading Question Types"
      lessonLabel="IELTS Academic Reading · Question type"
      name="Matching Features"
      title={TITLE}
      description={DESCRIPTION}
      directAnswer="Read the feature list first, define each person, project, policy or process, then match the statement's action, result and qualification. A nearby name or shared topic is not proof, and a feature may be used more than once when the instructions allow it."
      facts={[
        { label: 'Target', value: 'Exact attribution' },
        { label: 'Evidence', value: 'Actor + action + result' },
        { label: 'Main risk', value: 'Nearby name match' },
      ]}
      outcomes={[
        { title: 'Build a feature map', text: 'Give each option a short identity: who or what it is, what it does and what limitation or result belongs to it.' },
        { title: 'Track relationships', text: 'Match the complete action, opinion, finding, purpose or consequence—not just the repeated noun.' },
        { title: 'Control attribution traps', text: 'Reject options that appear nearby but belong to a different actor, timing relationship or outcome.' },
      ]}
      method={[
        { title: 'Read the feature list', text: 'Classify the options as people, groups, policies, projects, processes or periods before searching.' },
        { title: 'Underline the relationship', text: 'In each statement, mark the action, result, opinion, limitation, cause or timing you must attribute.' },
        { title: 'Scan names and references', text: 'Find names, labels and pronouns, then read around them rather than selecting the first match.' },
        { title: 'Prove the complete link', text: 'Confirm that the chosen feature owns every important part of the statement, including qualifiers.' },
      ]}
      weakExample="Choose the Green Roof Collective because the statement mentions farming and its name appears close to a paragraph about vegetables."
      strongExample="Choose the Riverside School Network because the statement asks for academic subjects becoming observable, and its paragraph explicitly makes biology, climate and nutrition visible in daily lessons."
      practice={<MatchingFeaturesGuidedPractice passage={guidedPassage} />}
      independentPracticeExperience={<MatchingFeaturesIndependentPractice passage={independentPassage} />}
      progressEngine={<MatchingFeaturesProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#0f766e"
          skillName="Matching Features"
          reviewedFocus={[
            'Guided, independent and Progress Engine passage pools are separated.',
            'Feature reuse remains possible when more than one statement belongs to the same actor or category.',
            'Feedback distinguishes nearby names, shared topics, wrong actors, wrong results, qualifier loss and reversed relationships.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Matching Features as matching statements with a list of options and tests recognition of relationships and connections.' },
            { label: 'WeLearn practice blueprint', note: 'Defines held-back transfer, exact attribution evidence, local persistence and the client-key security boundary.' },
          ]}
        />
      )}
      independentPractice={[
        'Write a three-part identity beside each feature: actor, action and result.',
        'For every answer, quote the exact phrase that assigns the claim to that feature.',
        'Name the nearest competing feature and explain which relationship or qualifier it lacks.',
        'Repeat only the items where your attribution evidence was incomplete.',
      ]}
      checklist={[
        'you can explain the difference between Matching Features and Matching Information',
        'you follow pronouns and references without losing the original actor',
        'you preserve action, result, cause, timing and limitation',
        'you reuse a feature only when separate statements genuinely belong to it',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Matching Features is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources provide context but do not by themselves verify every fictional scenario or establish authorship."
      nextLinks={[
        { href: '/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings', label: 'Continue to Matching Sentence Endings', primary: true },
        { href: '/practica/ielts/reading/tipos-de-preguntas/matching-information', label: 'Compare with Matching Information' },
        { href: '/practica/ielts/reading/habilidades/parafrasis', label: 'Strengthen paraphrase recognition' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
