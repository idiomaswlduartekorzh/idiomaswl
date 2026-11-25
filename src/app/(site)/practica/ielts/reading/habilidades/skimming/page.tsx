import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import SkimmingPracticeEngine from '@/components/exam-practice/SkimmingPracticeEngine';
import { SkimmingIndependentPractice, SkimmingProgressEngine } from '@/components/exam-practice/SkimmingPracticeLab';
import { IELTS_READING_SKILLS, IELTS_SKIMMING_PRACTICE, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';
import {
  SKIMMING_INDEPENDENT_PASSAGE_ID,
  getSkimmingPassage,
} from '@/data/practica-exams/ielts-reading-skimming-progress';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'skimming')!;
const TITLE = 'Skimming a passage for the first time';
const DESCRIPTION = 'Have you ever read a question and thought, “I saw that somewhere”? A few words beside each paragraph can save you a second trip through the whole passage.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const independentPassage = getSkimmingPassage(SKIMMING_INDEPENDENT_PASSAGE_ID)!;
// Scaling contract: docs/ielts-reading-practice-engine-blueprint.md

export const metadata: Metadata = {
  title: 'IELTS Reading Skimming: Method, Example and Practice',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="skimming"
      name="Skimming"
      title={TITLE}
      description={DESCRIPTION}
      directAnswer="When you skim, you read quickly enough to see what each paragraph adds to the story. Leave yourself a note such as “why the plan changed”. When a question asks about that change, you’ll know which paragraph deserves a slower read."
      facts={[{ label: 'First pass here', value: 'Try 30–60 sec' }, { label: 'In the margin', value: 'A few words' }, { label: 'With a question', value: 'Read closely' }]}
      outcomes={[
        { title: 'Let a difficult word wait', text: 'If you can follow what happened on either side of an unfamiliar word, keep going. You can come back if a question turns on its meaning.' },
        { title: 'Tell two paragraphs apart', text: 'Two paragraphs might both mention a town’s water supply. A note like “why demand grew” separates the one explaining the problem from the one describing a repair.' },
        { title: 'Find your way back', text: 'For a question about that repair, try the paragraph you marked. Once you get there, read the lines around the detail you need.' },
      ]}
      methodIntroduction={{
        title: 'How to make a note you’ll use again',
        text: 'Try this with one paragraph first. A scrappy note in your own words is fine. You’re the person who’ll need to recognise it a few minutes from now.',
      }}
      method={[
        { title: 'Start with a rough guess', text: 'Read the title and the paragraph’s opening line. What do you expect to hear more about? Hold that thought lightly. The writer may be setting up an idea they’ll question later.' },
        { title: 'Follow a change of direction', text: 'Let your eye travel down the paragraph. If you see “yet”, read the thought on either side. Some writers change direction without a signal word, so glance at the ending too.' },
        { title: 'Give the paragraph a job', text: 'Ask what you know by the end that you didn’t know at the start. Try putting that change into a few words. A verb often helps. “Demand doubled” will jog your memory better than “water”.' },
        { title: 'Use the note when a question arrives', text: 'Say a question asks why demand grew. Your note can point you to a paragraph, but “demand doubled” only tells you how much. Read on for the reason before choosing an answer.' },
      ]}
      workedPassage={{
        heading: 'What would you write beside this paragraph?',
        paragraph: 'The town installed water meters to find out which homes were using the most water. Yet at three in the morning, when most of the town was asleep, the meters showed almost as much water flowing as at midday. The engineers began checking the pipes beneath the streets.',
        firstNoteHeading: 'After the first line',
        revisedNoteHeading: 'After reading to the end',
        question: 'What did the engineers do next?',
        explanation: 'Your note takes you back to the last line. They began checking the pipes beneath the streets. If you were about to write “they found a leak”, look again at “began checking”. We leave the engineers while they’re still looking.',
      }}
      weakExample="I’d probably jot down “water meters” after the first line. Fair enough. But that note would also fit a paragraph about what meters cost. What made this paragraph worth remembering?"
      strongExample="I’d change my note to “night readings point to pipes”. The surprise is how much water is still flowing when people are asleep. Now I can remember why the engineers turned their attention from homes to the street."
      practice={<SkimmingPracticeEngine practice={IELTS_SKIMMING_PRACTICE} accent="#0369a1" />}
      independentPracticeExperience={<SkimmingIndependentPractice passage={independentPassage} />}
      progressEngine={<SkimmingProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#0369a1"
          skillName="Skimming"
          reviewedFocus={[
            'The lesson labels skimming as a transferable WeLearn strategy, not an official IELTS question type.',
            'Practice decisions require paragraph purpose rather than isolated keyword matching.',
            'Source-backed passages remain separate from official IELTS tasks and band-score claims.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Used to keep official task rules separate from the WeLearn passage-mapping method.' },
            { label: 'WeLearn practice blueprint', note: 'Defines guided action, independent transfer, progression, persistence and feedback boundaries.' },
          ]}
        />
      )}
      independentPractice={[
        'Try a fresh passage. Give yourself about 45 seconds for a first look at this short text. Allow longer if you lose the thread.',
        'Leave a few words beside each paragraph. If two notes sound alike, look at how those paragraphs end.',
        'Read a question and choose the paragraph you’d return to. Then check the line that supports your answer.',
      ]}
      checklist={[
        'you can state the passage topic in one sentence',
        'your notes help you tell apart two paragraphs about the same subject',
        'you notice contrast and result markers without translating everything',
        'your map sends you to a likely evidence zone rather than a random paragraph',
      ]}
      faqs={ROUTE.faqs}
      officialNote="IELTS Academic Reading includes tasks such as Matching Headings, where you identify a paragraph’s main idea. WeLearn suggests 30–60 seconds for a first look at the short passages in this lesson. You can adjust that pace as you practise."
      nextLinks={[
        { href: '/practica/ielts/reading/habilidades/scanning', label: 'Continue to scanning', primary: true },
        { href: '/practica/ielts/reading/tipos-de-preguntas/matching-headings', label: 'Practise Matching Headings' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
