import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import ParaphrasePracticeEngine from '@/components/exam-practice/ParaphrasePracticeEngine';
import { IELTS_PARAPHRASE_PRACTICE_SETS, IELTS_READING_SKILLS, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'parafrasis')!;
const TITLE = 'Paraphrase recognition: compare meaning, not matching words';
const DESCRIPTION = 'Learn to recognise equivalent meaning while controlling scope, cause, time, comparison, certainty and grammatical change.';
const practices = IELTS_PARAPHRASE_PRACTICE_SETS.map((set) => ({ ...set, timeTarget: '6 items · 8 minutes' }));

export const metadata: Metadata = {
  title: 'IELTS Reading Paraphrase Recognition: Lesson and Practice', description: DESCRIPTION, keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="parafrasis" name="Paraphrase recognition" title={TITLE} description={DESCRIPTION}
    directAnswer="A valid paraphrase can change vocabulary and grammar, but it must preserve who, what, when, why, how much and how certain the original statement is."
    facts={[{ label: 'Compare', value: 'Meaning' }, { label: 'Control', value: 'Scope + logic' }, { label: 'Reject', value: 'Distortion' }]}
    outcomes={[
      { title: 'See beyond word matching', text: 'Recognise that reduce waiting times and shorten queues can express the same result.' },
      { title: 'Protect logical detail', text: 'Keep cause, contrast, sequence, probability and quantity unchanged.' },
      { title: 'Spot attractive distortions', text: 'Reject options that preserve vocabulary but change all to some, may to will or before to after.' },
    ]}
    method={[
      { title: 'Underline the claim core', text: 'Identify the subject, action and result before comparing individual words.' },
      { title: 'Mark logic words', text: 'Circle quantifiers, negatives, modal verbs, comparisons and time relationships.' },
      { title: 'Compare propositions', text: 'Ask whether both sentences make the same claim under the same conditions.' },
      { title: 'Run a distortion check', text: 'Reject any option that strengthens, weakens, reverses or invents information.' },
    ]}
    weakExample="Choosing an option because it repeats the nouns from the passage, even though it changes ‘some residents’ to ‘all residents’."
    strongExample="Accept ‘The trial may continue if demand remains high’ as equivalent to ‘Officials could extend the trial provided that demand stays strong’, because modality and condition are preserved."
    practice={<ParaphrasePracticeEngine practices={practices} accent="#7c3aed" />}
    independentPractice={[
      'Copy five evidence sentences from a new passage.',
      'Rewrite each sentence with different vocabulary and grammar.',
      'Annotate scope, polarity, cause, time and certainty in both versions.',
      'Create one tempting distortion for each sentence and explain exactly what changed.',
    ]}
    checklist={[
      'you compare complete claims rather than isolated words',
      'you preserve quantifiers and modal strength',
      'you notice reversed cause, sequence or comparison',
      'you can explain why a distractor changes meaning',
    ]}
    faqs={ROUTE.faqs}
    officialNote="Paraphrase recognition is a cross-task WeLearn skill. It supports almost every official IELTS Reading question type because questions and options rarely repeat the passage verbatim."
    nextLinks={[
      { href: '/practica/ielts/reading/habilidades/inferencia', label: 'Continue to inference', primary: true },
      { href: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice', label: 'Practise Multiple Choice' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}
