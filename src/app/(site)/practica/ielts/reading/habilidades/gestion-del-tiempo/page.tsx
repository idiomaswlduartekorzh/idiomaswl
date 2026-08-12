import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import { TimeManagementGuidedPractice, TimeManagementIndependentPractice, TimeManagementProgressEngine } from '@/components/exam-practice/TimeManagementPracticeLab';
import { TIME_MANAGEMENT_GUIDED_PASSAGE_ID, TIME_MANAGEMENT_INDEPENDENT_PASSAGE_ID, getTimeManagementPassage } from '@/data/practica-exams/ielts-reading-time-management-progress';
import { IELTS_READING_SKILLS, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'gestion-del-tiempo')!;
const TITLE = 'Time management: protect points instead of racing the clock';
const DESCRIPTION = 'Use a passage budget, prioritise visible evidence, mark productive uncertainty and return only when a second attempt has a clear target.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

const guidedPassage = getTimeManagementPassage(TIME_MANAGEMENT_GUIDED_PASSAGE_ID)!;
const independentPassage = getTimeManagementPassage(TIME_MANAGEMENT_INDEPENDENT_PASSAGE_ID)!;

export const metadata: Metadata = {
  title: 'IELTS Reading Time Management: 20-Minute Passage Method', description: DESCRIPTION, keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="gestion-del-tiempo" name="Time management" title={TITLE} description={DESCRIPTION}
    directAnswer="Use time as a decision rule. Solve evidence-rich items now, mark questions that already have a useful evidence zone and postpone searches that would restart from zero."
    facts={[{ label: 'Per passage', value: '≈20 min' }, { label: 'First move', value: 'Map' }, { label: 'Review', value: 'Evidence first' }]}
    outcomes={[
      { title: 'Protect the full passage', text: 'Prevent one uncertain item from consuming the time needed for several answerable questions.' },
      { title: 'Prioritise by evidence', text: 'Work first where names, numbers, local anchors or a mapped paragraph reduce search cost.' },
      { title: 'Return intelligently', text: 'Keep the evidence location and the unresolved distinction, so review is a second decision rather than a new search.' },
    ]}
    method={[
      { title: 'Budget the passage', text: 'Reserve time for mapping, first-pass points, slower reasoning and a short targeted review.' },
      { title: 'Classify the next move', text: 'Choose solve now, mark and return, or postpone based on evidence—not on anxiety.' },
      { title: 'Store useful context', text: 'When you move on, mark the paragraph and the exact uncertainty you need to resolve.' },
      { title: 'Review by expected return', text: 'Revisit items with located evidence before questions that still require a complete search.' },
    ]}
    weakExample="Spending four minutes on one Not Given decision because leaving it temporarily feels like failure."
    strongExample="Mark the evidence and the unresolved contrast, answer provisionally, secure three local-evidence items and return with the remaining review budget."
    practice={<TimeManagementGuidedPractice passage={guidedPassage} />}
    independentPracticeExperience={<TimeManagementIndependentPractice passage={independentPassage} />}
    progressEngine={<TimeManagementProgressEngine />}
    sourceReview={(
      <SkillReviewSourceBlock
        accent="#b45309"
        skillName="Time management"
        reviewedFocus={[
          'The official total section time remains separate from WeLearn passage-budget suggestions.',
          'Decisions prioritise located evidence and expected return rather than speed at any cost.',
          'The lesson makes no claim that one fixed passage split is an official IELTS rule.',
        ]}
        sources={[
          { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Used to verify the overall Reading time and separate it from flexible WeLearn pacing.' },
          { label: 'WeLearn original practice sets', note: 'Used to train solve, mark, postpone and review decisions under a transparent strategy.' },
        ]}
      />
    )}
    independentPractice={[
      'Run one complete passage with a flexible map, first-pass, comparison and review budget.',
      'When you delay an item, preserve its paragraph and unresolved distinction.',
      'Classify lost time as over-investment, restart, abandoned evidence or poor review priority.',
      'Repeat on a new text and change only one pacing rule at a time.',
    ]}
    checklist={[
      'you can leave one question without losing its evidence location',
      'you solve high-confidence local items before open-ended searches',
      'your final review begins with evidence-rich questions',
      'you finish the passage with every item answered or deliberately guessed',
    ]}
    faqs={ROUTE.faqs}
    officialNote="IELTS Academic Reading gives 60 minutes for the full section. The 20-minute passage budget is a flexible WeLearn strategy, not a separate official timing rule for every passage."
    nextLinks={[
      { href: '/practica/ielts/reading/mixed-practice', label: 'Apply all skills in Mixed Practice', primary: true },
      { href: '/practica/ielts/reading/habilidades/skimming', label: 'Review passage mapping' },
      { href: '/practica/ielts/reading/habilidades/scanning', label: 'Review evidence location' },
      { href: '/practica/ielts/reading/tipos-de-preguntas/matching-headings', label: 'Practise Matching Headings' },
      { href: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice', label: 'Practise Multiple Choice' },
      { href: '/practica/ielts/reading/tipos-de-preguntas', label: 'Browse question types' },
      { href: '/practica/ielts/reading/habilidades', label: 'Back to Reading Skills' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}

// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md
