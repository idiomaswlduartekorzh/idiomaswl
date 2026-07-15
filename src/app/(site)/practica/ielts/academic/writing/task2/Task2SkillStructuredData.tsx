import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

const TASK2_BASE = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2';

const FAQS = [
  {
    question: '¿Esta página es una tarea oficial separada de IELTS?',
    answer:
      'No. Es una ruta pedagógica de WeLearn para practicar una habilidad o tipo de prompt dentro de IELTS Academic Writing Task 2.',
  },
  {
    question: '¿Cómo se usa esta práctica en una respuesta completa?',
    answer:
      'Practica la habilidad, revisa la explicación y luego transfiérela a un ensayo Task 2 completo de al menos 250 palabras.',
  },
];

export function Task2SkillStructuredData({
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
        description={`${name}: práctica guiada de IELTS Academic Writing Task 2 con enfoque WeLearn.`}
        teaches={['IELTS Academic Writing Task 2', ...teaches]}
        isPartOf={{
          name: 'IELTS Academic Writing Task 2',
          url: TASK2_BASE,
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 2', url: TASK2_BASE },
          { name, url },
        ]}
      />
    </>
  );
}
