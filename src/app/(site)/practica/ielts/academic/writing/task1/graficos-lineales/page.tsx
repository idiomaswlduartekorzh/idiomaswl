import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import Content from './Content';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/graficos-lineales';

const FAQS = [
  {
    question: '¿Un gráfico lineal en IELTS Writing Task 1 es un tipo oficial de pregunta?',
    answer:
      'Es una forma frecuente de la información visual de IELTS Academic Writing Task 1. Oficialmente, la tarea pide describir información visual como gráficos, tablas, diagramas o procesos; WeLearn la practica como subruta porque los gráficos lineales requieren decisiones específicas sobre tendencias, cambios y comparaciones.',
  },
  {
    question: '¿Qué debe incluir el overview de un line graph?',
    answer:
      'Debe resumir los patrones principales: tendencia general, cambio de liderazgo, punto más alto o bajo, convergencia, divergencia o cambio brusco. No debe convertirse en una lista de números exactos.',
  },
  {
    question: '¿Cuántas cifras debo mencionar en una respuesta de Task 1?',
    answer:
      'Usa solo las cifras necesarias para demostrar los cambios importantes. Una respuesta sólida suele seleccionar puntos de inicio y final, picos o mínimos relevantes y comparaciones clave entre series.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1: gráficos lineales con ejercicios',
  description:
    'Aprende a responder IELTS Academic Writing Task 1 line graphs: overview, tendencias, comparaciones, vocabulario y práctica original con respuestas explicadas.',
  keywords: [
    'IELTS line graph task 1',
    'IELTS writing task 1 graficos lineales',
    'IELTS academic writing graphs',
    'IELTS line graph overview',
    'IELTS writing task 1 practice',
  ],
  openGraph: {
    title: 'IELTS Writing Task 1: gráficos lineales con ejercicios',
    description:
      'Práctica guiada para describir gráficos lineales en IELTS Academic Writing Task 1 con modelo de respuesta y explicación.',
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
        name="IELTS Writing Task 1: gráficos lineales"
        url={URL}
        description="Lección y práctica original para escribir respuestas de IELTS Academic Writing Task 1 sobre gráficos lineales."
        teaches={[
          'IELTS Academic Writing Task 1',
          'line graphs',
          'overview writing',
          'trend selection',
          'data comparison',
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
          { name: 'Gráficos lineales', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
    </>
  );
}
