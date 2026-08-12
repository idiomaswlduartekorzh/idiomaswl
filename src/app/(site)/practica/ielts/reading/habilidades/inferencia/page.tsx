import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import InferencePracticeEngine from '@/components/exam-practice/InferencePracticeEngine';
import { IELTS_INFERENCE_PRACTICE_SETS, IELTS_READING_SKILLS, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'inferencia')!;
const TITLE = 'Inference: reach the safest conclusion the evidence allows';
const DESCRIPTION = 'Combine explicit clues without importing outside knowledge, exaggerating certainty or turning a possible conclusion into a stated fact.';
const practices = IELTS_INFERENCE_PRACTICE_SETS.map((set) => ({ ...set, timeTarget: '5 questions · 7 minutes' }));

export const metadata: Metadata = {
  title: 'IELTS Reading Inference: Evidence Method and Practice', description: DESCRIPTION, keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="inferencia" name="Inference" title={TITLE} description={DESCRIPTION}
    directAnswer="A sound inference is not a guess. It is the smallest conclusion that connects two or more explicit clues without adding a new cause, rule, attitude or degree of certainty."
    facts={[{ label: 'Start with', value: 'Explicit clues' }, { label: 'Choose', value: 'Safest claim' }, { label: 'Avoid', value: 'Outside knowledge' }]}
    outcomes={[
      { title: 'Separate text from assumption', text: 'Notice when an option sounds reasonable in the real world but has no support in the passage.' },
      { title: 'Control certainty', text: 'Prefer may, likely or suggests when the evidence does not justify always, proves or must.' },
      { title: 'Connect clues carefully', text: 'Use relationships already present in the text instead of inventing an explanation.' },
    ]}
    method={[
      { title: 'Locate the evidence zone', text: 'Find the sentence or paragraph the question points to before considering options.' },
      { title: 'State only what is explicit', text: 'Paraphrase the facts you can quote directly from the passage.' },
      { title: 'Form the minimum bridge', text: 'Connect those facts with the least additional assumption possible.' },
      { title: 'Stress-test every option', text: 'Reject options with invented causes, extreme language or a conclusion wider than the evidence.' },
    ]}
    weakExample="The passage says visits rose after a renovation, so the renovation must have made every resident happier."
    strongExample="Visits rose while workshop attendance grew and novel borrowing stayed flat, so the new use probably came from services beyond traditional borrowing."
    practice={<InferencePracticeEngine practices={practices} accent="#7c3aed" />}
    independentPractice={[
      'Choose three paragraphs and write two facts from each.',
      'Write one cautious conclusion that links each pair of facts.',
      'Add one overconfident version and identify the unsupported word.',
      'Check whether your inference survives without topic knowledge from outside the passage.',
    ]}
    checklist={[
      'you can quote the clues behind your conclusion',
      'your conclusion is no stronger than the evidence',
      'you reject plausible options that rely on outside knowledge',
      'you can name the exact assumption in a distractor',
    ]}
    faqs={ROUTE.faqs}
    officialNote="Inference is a WeLearn reasoning skill rather than a standalone official question label. It strengthens Multiple Choice, writer-view tasks and any item that asks what the passage suggests."
    nextLinks={[
      { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Continue to word-limit control', primary: true },
      { href: '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given', label: 'Practise writer views' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}
