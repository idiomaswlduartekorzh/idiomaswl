import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import Content from './Content';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/graficos-de-barras';

const FAQS = [
  {
    question: '¿Un gráfico de barras es un tipo oficial separado en IELTS Writing Task 1?',
    answer:
      'No se debe presentar como una categoría oficial independiente. Oficialmente, IELTS Academic Writing Task 1 pide describir información visual como gráficos, tablas, mapas, diagramas o procesos. WeLearn separa los gráficos de barras como ruta de práctica porque suelen exigir comparar categorías, rankings y diferencias.',
  },
  {
    question: '¿Qué debe priorizar el overview en un bar chart?',
    answer:
      'Debe resumir las diferencias más grandes: categoría líder, categoría más baja, contraste entre grupos, patrón general o cambio de ranking. No debe repetir cada barra una por una.',
  },
  {
    question: '¿Cómo organizo los párrafos del cuerpo en gráficos de barras?',
    answer:
      'Agrupa categorías similares o contrastantes. En vez de describir todas las barras en orden visual, usa dos párrafos: uno para las categorías principales y otro para las secundarias o excepciones.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1: gráficos de barras con ejercicios',
  description:
    'Practica IELTS Academic Writing Task 1 bar charts: overview, rankings, comparaciones, agrupación de datos y modelo de respuesta explicado.',
  keywords: [
    'IELTS bar chart task 1',
    'IELTS writing task 1 graficos de barras',
    'IELTS academic writing bar chart',
    'IELTS bar chart overview',
    'IELTS writing task 1 comparisons',
  ],
  openGraph: {
    title: 'IELTS Writing Task 1: gráficos de barras con ejercicios',
    description:
      'Lección práctica para responder bar charts en IELTS Academic Writing Task 1 con ejercicio original, feedback y modelo explicado.',
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
        name="IELTS Writing Task 1: gráficos de barras"
        url={URL}
        description="Lección y práctica original para escribir respuestas de IELTS Academic Writing Task 1 sobre gráficos de barras."
        teaches={[
          'IELTS Academic Writing Task 1',
          'bar charts',
          'overview writing',
          'data grouping',
          'category comparison',
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
          { name: 'Gráficos de barras', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
    </>
  );
}
