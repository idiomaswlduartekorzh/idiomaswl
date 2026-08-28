import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const TASK2_BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2';

export const TASK2_SKILL_FAQS = [
  {
    question: 'Is this page a separate official IELTS task?',
    answer:
      'No. It is a WeLearn learning resource for practising a skill or prompt type used within IELTS Academic Writing Task 2.',
  },
  {
    question: 'How should this practice be used in a complete response?',
    answer:
      'Practise the target skill, review the explanation and then transfer it to a complete Task 2 essay of at least 250 words.',
  },
];

export function Task2SkillStructuredData({
  name,
  path,
  teaches,
  faqs,
}: {
  name: string;
  path: string;
  teaches: string[];
  faqs?: { question: string; answer: string }[];
}) {
  const url = `https://www.idiomaswl.com${path}`;

  return (
    <>
      <LearningResourceJsonLd
        name={name}
        url={url}
        description={`${name}: guided IELTS Academic Writing Task 2 practice using the WeLearn method.`}
        teaches={['IELTS Academic Writing Task 2', ...teaches]}
        isPartOf={{
          name: 'IELTS Academic Writing Task 2',
          url: TASK2_BASE,
        }}
      />
      {faqs?.length ? <FaqJsonLd faqs={faqs} /> : null}
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 2', url: TASK2_BASE },
          { name, url },
        ]}
      />
    </>
  );
}
