import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PracticeRouteShell, { type PracticeSection } from '@/components/exam-practice/PracticeRouteShell';
import PracticeSetCatalog from '@/components/exam-practice/PracticeSetCatalog';
import { getMock } from '@/data/mocks';
import { IELTS_SECTIONAL_LISTENING_SET_IDS } from '@/data/ielts/sectional-listening-adapter';

const SKILLS = {
  reading: { label: 'Reading', detail: '3 passages · 40 questions · estimated practice band', note: 'Read and answer at your own pace. Your Reading result is an estimate for practice, not an official IELTS band.' },
  writing: { label: 'Writing', detail: 'Task 1 + Task 2 · original set prompts · word-count review', note: 'Drafts stay in your browser. The review checks completion and word count; it does not assign a Writing band.' },
  speaking: { label: 'Speaking', detail: '3 parts · record and replay your answers', note: 'Microphone recordings stay in this open session and are not submitted for teacher review or assigned a band.' },
} as const;

type Skill = keyof typeof SKILLS;
type Props = { params: Promise<{ skill: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SKILLS).map(skill => ({ skill }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { skill } = await params;
  const config = SKILLS[skill as Skill];
  if (!config) return {};
  return {
    title: `IELTS ${config.label} Practice: 20 Focused Sets`,
    description: `Practise IELTS ${config.label} independently using the 20 audited WeLearn Academic mocks, without taking the complete exam.`,
    alternates: { canonical: `https://www.idiomaswl.com/practica/ielts/${skill}/simulacros` },
  };
}

export default async function IeltsSkillSetsPage({ params }: Props) {
  const { skill } = await params;
  if (!(skill in SKILLS)) notFound();
  const selectedSkill = skill as Skill;
  const config = SKILLS[selectedSkill];
  const sets = IELTS_SECTIONAL_LISTENING_SET_IDS.map((mockId, index) => {
    const mock = getMock('ielts', mockId);
    if (!mock || mock.sections.filter(section => section.skill === selectedSkill && !section.comingSoon).length !== (selectedSkill === 'writing' ? 2 : selectedSkill === 'speaking' ? 1 : 3)) {
      throw new Error(`IELTS ${selectedSkill} practice is incomplete for ${mockId}`);
    }
    return {
      number: index + 1,
      title: mock.title,
      detail: config.detail,
      meta: 'Untimed practice',
      href: `/examenes/ielts/practica/${mockId}?mode=practice&skill=${selectedSkill}`,
    };
  });

  return <PracticeRouteShell
    section={selectedSkill as PracticeSection}
    breadcrumbs={[{ label: 'Practice', href: '/practica' }, { label: 'IELTS', href: '/practica/ielts' }, { label: config.label }]}
    backHref="/practica/ielts#destrezas"
    backLabel="Choose another IELTS skill"
  >
    <PracticeSetCatalog product="IELTS" section={selectedSkill} task={config.label} description={`Choose one of the 20 audited IELTS Academic sets and practise only ${config.label}. Navigate freely between its parts without a timer.`} sets={sets} note={config.note} />
  </PracticeRouteShell>;
}
