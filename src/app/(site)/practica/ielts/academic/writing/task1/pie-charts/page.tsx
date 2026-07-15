import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import Content from './Content';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/pie-charts';

const FAQS = [
  {
    question: '¿Pie chart es una tarea oficial independiente en IELTS Writing Task 1?',
    answer:
      'No conviene presentarlo como una tarea oficial separada. IELTS Academic Writing Task 1 pide describir información visual, y un pie chart es una de las formas posibles de esa información. WeLearn lo separa como ruta de práctica porque exige comparar proporciones y agrupar porcentajes.',
  },
  {
    question: '¿Qué debo mencionar primero en un pie chart?',
    answer:
      'Empieza por el overview: la porción más grande, la más pequeña y cualquier contraste dominante entre categorías. Los porcentajes exactos deben apoyar esos patrones, no reemplazarlos.',
  },
  {
    question: '¿Cómo evito repetir porcentajes en una respuesta de pie chart?',
    answer:
      'Agrupa categorías pequeñas, compara categorías relacionadas y menciona solo cifras que expliquen una diferencia clara. No describas cada segmento como una lista aislada.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1: pie charts con ejercicios',
  description:
    'Practica IELTS Academic Writing Task 1 pie charts: overview, proporciones, agrupación de porcentajes, comparaciones y modelo de respuesta explicado.',
  keywords: [
    'IELTS pie chart task 1',
    'IELTS writing task 1 pie charts',
    'IELTS pie chart overview',
    'IELTS academic writing proportions',
    'IELTS writing task 1 percentages',
  ],
  openGraph: {
    title: 'IELTS Writing Task 1: pie charts con ejercicios',
    description:
      'Lección práctica para responder pie charts en IELTS Academic Writing Task 1 con gráfico original, feedback y modelo explicado.',
    type: 'website',
    locale: 'es_CO',
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Writing Task 1: pie charts"
        url={URL}
        description="Lección y práctica original para escribir respuestas de IELTS Academic Writing Task 1 sobre pie charts."
        teaches={[
          'IELTS Academic Writing Task 1',
          'pie charts',
          'overview writing',
          'percentage grouping',
          'proportion comparison',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing Task 1',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 1', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1' },
          { name: 'Pie charts', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
    </>
  );
}
