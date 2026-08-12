import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import TimeManagementPracticeEngine from '@/components/exam-practice/TimeManagementPracticeEngine';
import { IELTS_READING_SKILLS, IELTS_TIME_MANAGEMENT_PRACTICE_SETS, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'gestion-del-tiempo')!;
const TITLE = 'Time management: protect points instead of racing the clock';
const DESCRIPTION = 'Use a passage budget, prioritise visible evidence, mark productive uncertainty and return only when a second attempt has a clear target.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

const practices = [{
  id: 'time-management-international-triage',
  title: 'Decision triage: a renovated library',
  instructions: 'Choose the most efficient next move. The goal is not speed at any cost; it is protecting points across the full passage.',
  timeTarget: '6 decisions · 6 minutes',
  passageTitle: 'A city library reopens after renovation',
  passageMap: [
    { label: 'Minute 0–2', purpose: 'Skim title, paragraph openings and changes of direction.', timeBudget: 'Build the map' },
    { label: 'Minute 2–11', purpose: 'Answer questions with visible names, numbers and local evidence.', timeBudget: 'Secure fast points' },
    { label: 'Minute 11–17', purpose: 'Work on main ideas, inference and close paraphrase decisions.', timeBudget: 'Spend with evidence' },
    { label: 'Minute 17–20', purpose: 'Return to marked questions that already have an evidence zone.', timeBudget: 'Targeted review' },
  ],
  decisions: [
    { id: 'time-intl-01', questionType: 'Matching Information', prompt: 'The question asks where a donation of equipment is mentioned. Your passage map says Paragraph C covers funding and purchases.', signal: 'likely paragraph already located', options: ['Read Paragraph C closely now.', 'Restart from Paragraph A.', 'Skip without marking an evidence zone.'], answer: 0, explanation: 'A mapped evidence zone makes this a productive immediate task. Read locally and verify the detail.', trap: 'Restarting feels safe but spends time on text you already mapped.' },
    { id: 'time-intl-02', questionType: 'True / False / Not Given', prompt: 'You have spent 70 seconds on one statement. You found the relevant paragraph but cannot yet decide between contradiction and missing information.', signal: 'evidence located, decision blocked', options: ['Stay until you are completely certain.', 'Mark the evidence, choose provisionally and return later.', 'Leave the item blank and erase the location.'], answer: 1, explanation: 'Preserve the useful evidence location and move on. A later comparison is cheaper than searching again.', trap: 'Unlimited certainty on one item can cost several easier points.' },
    { id: 'time-intl-03', questionType: 'Sentence Completion', prompt: 'The instruction says NO MORE THAN TWO WORDS. A unique keyword in the frame appears literally in Paragraph B.', signal: 'unique anchor + clear word limit', options: ['Solve it now using the smallest fitting span.', 'Postpone because every completion item is slow.', 'Read all other question types first.'], answer: 0, explanation: 'A unique anchor and explicit limit usually create a fast, controllable point.', trap: 'Treating every completion item as difficult ignores the evidence available.' },
    { id: 'time-intl-04', questionType: 'Matching Headings', prompt: 'Two headings look possible. One repeats an attractive example; the other summarises the paragraph’s central change.', signal: 'detail versus main function', options: ['Choose the heading with the most repeated words.', 'Compare the opening, direction change and closing sentence.', 'Skip all headings until the end of the full test.'], answer: 1, explanation: 'Spend a controlled amount of time on paragraph function, not raw word overlap.', trap: 'A memorable example is often a distractor rather than the main idea.' },
    { id: 'time-intl-05', questionType: 'Multiple Choice', prompt: 'One option sounds correct from general knowledge, but you have not found a supporting passage sentence.', signal: 'plausible answer without evidence', options: ['Select it because it is generally true.', 'Search one likely zone; if support does not appear, mark and move on.', 'Use outside knowledge to strengthen the option.'], answer: 1, explanation: 'IELTS Reading rewards passage evidence. Limit an unproductive search and preserve the item for review.', trap: 'Topic knowledge can make unsupported options feel comfortable.' },
    { id: 'time-intl-06', questionType: 'Final review', prompt: 'Three minutes remain. One unanswered question has marked evidence; another was never located.', signal: 'limited final time', options: ['Return first to the item with marked evidence.', 'Begin a completely new search.', 'Reread the full passage.'], answer: 0, explanation: 'A nearly solved item has a better expected return than a search from zero.', trap: 'The urge to rescue the lost item can sacrifice the answer that is already close.' },
  ],
}] satisfies typeof IELTS_TIME_MANAGEMENT_PRACTICE_SETS;

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
    practice={<TimeManagementPracticeEngine practices={practices} accent="#b45309" />}
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
      'Complete one passage with four visible checkpoints: 2, 11, 17 and 20 minutes.',
      'Label every delayed item with its evidence paragraph and unresolved decision.',
      'Record where you lost time: searching, interpreting, comparing or counting words.',
      'Repeat the passage strategy on a new text and change only one timing rule.',
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
