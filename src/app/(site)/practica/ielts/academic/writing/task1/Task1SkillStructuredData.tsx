import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const TASK1_BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1';

const FAQS = [
  {
    question: 'Is this page a separate official IELTS task?',
    answer:
      'No. This is a WeLearn teaching route for practising one specific skill within IELTS Academic Writing Task 1.',
  },
  {
    question: 'How can this practice be used in a complete response?',
    answer:
      'Train the skill, review the explanation and then transfer it to a complete Task 1 response of at least 150 words.',
  },
];

export function Task1SkillStructuredData({
  name,
  path,
  teaches,
}: {
  name: string;
  path: string;
  teaches: string[];
}) {
  const url = `https://www.idiomaswl.com${path}`;

  return (
    <>
      <LearningResourceJsonLd
        name={name}
        url={url}
        description={`${name}: guided IELTS Academic Writing Task 1 practice with a WeLearn teaching approach.`}
        teaches={['IELTS Academic Writing Task 1', ...teaches]}
        isPartOf={{
          name: 'IELTS Academic Writing Task 1',
          url: TASK1_BASE,
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 1', url: TASK1_BASE },
          { name, url },
        ]}
      />
    </>
  );
}
