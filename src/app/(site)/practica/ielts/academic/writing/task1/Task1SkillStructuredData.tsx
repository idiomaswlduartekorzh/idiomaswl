import { BreadcrumbJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const TASK1_BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1';

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
