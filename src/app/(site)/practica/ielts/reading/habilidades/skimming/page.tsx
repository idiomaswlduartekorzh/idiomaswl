import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkimmingPracticeEngine from '@/components/exam-practice/SkimmingPracticeEngine';
import { IELTS_READING_SKILLS, IELTS_SKIMMING_PRACTICE, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'skimming')!;
const TITLE = 'Skimming: build a passage map before you hunt for answers';
const DESCRIPTION = 'Learn to identify topic, paragraph purpose and changes of direction in 30–60 seconds, then use that map to return to the right evidence.';
const practice = { ...IELTS_SKIMMING_PRACTICE, timeTarget: '5 decisions · 6 minutes' };

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
      directAnswer="Skim once at the start of a passage. Read the title, opening sentences, repeated ideas and contrast markers. Your output is a short map, not an answer."
      facts={[{ label: 'Orientation', value: '30–60 sec' }, { label: 'Output', value: 'Passage map' }, { label: 'Next move', value: 'Locate evidence' }]}
      outcomes={[
        { title: 'Recognise the topic', text: 'Understand what the passage is broadly about before details and unfamiliar vocabulary compete for attention.' },
        { title: 'Label paragraph purpose', text: 'Compress each paragraph into a role such as problem, evidence, contrast, limitation or response.' },
        { title: 'Choose where to return', text: 'Use the map to select the most likely paragraph before scanning or reading closely.' },
      ]}
      method={[
        { title: 'Read the title', text: 'Predict the topic and likely purpose. Do not decide any answers yet.' },
        { title: 'Read paragraph openings', text: 'Use each first sentence to form a provisional one-line label.' },
        { title: 'Notice direction signals', text: 'Mark however, therefore, in contrast, for example and repeated content words.' },
        { title: 'Compress the map', text: 'Write three to five words per paragraph so the map stays useful under time pressure.' },
      ]}
      weakExample="Reading every word, translating mentally and stopping at difficult vocabulary before you know what the paragraph is doing."
      strongExample="Label Paragraph A ‘initial problem’, Paragraph B ‘pilot solution’ and Paragraph C ‘result + limitation’, then return only when the question points to that function."
      practice={<SkimmingPracticeEngine practice={practice} accent="#0369a1" />}
      independentPractice={[
        'Choose a new Academic Reading passage and give yourself 45 seconds.',
        'Write one short function label for every paragraph without answering questions.',
        'Compare your labels with each paragraph’s opening and closing sentence.',
        'Use the map to predict where three different question stems belong.',
      ]}
      checklist={[
        'you can state the passage topic in one sentence',
        'every paragraph has a distinct functional label',
        'you notice contrast and result markers without translating everything',
        'your map sends you to a likely evidence zone rather than a random paragraph',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Skimming is a WeLearn reading strategy, not an official IELTS question type. Use it to support question types that require paragraph purpose, main ideas and rapid evidence location."
      nextLinks={[
        { href: '/practica/ielts/reading/habilidades/scanning', label: 'Continue to scanning', primary: true },
        { href: '/practica/ielts/reading/tipos-de-preguntas/matching-headings', label: 'Practise Matching Headings' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
