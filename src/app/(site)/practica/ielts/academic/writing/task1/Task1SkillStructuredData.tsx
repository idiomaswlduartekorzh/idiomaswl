import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const TASK1_BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1';

const FAQS = [
  {
    question: '¿Esta página es una tarea oficial separada de IELTS?',
    answer:
      'No. Es una ruta pedagógica de WeLearn para practicar una habilidad específica dentro de IELTS Academic Writing Task 1.',
  },
  {
    question: '¿Cómo se usa esta práctica en una respuesta completa?',
    answer:
      'Entrena la habilidad, revisa la explicación y luego transfiérela a una respuesta Task 1 completa de al menos 150 palabras.',
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
        description={`${name}: práctica guiada de IELTS Academic Writing Task 1 con enfoque WeLearn.`}
        teaches={['IELTS Academic Writing Task 1', ...teaches]}
        isPartOf={{
          name: 'IELTS Academic Writing Task 1',
          url: TASK1_BASE,
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 1', url: TASK1_BASE },
          { name, url },
        ]}
      />
    </>
  );
}
