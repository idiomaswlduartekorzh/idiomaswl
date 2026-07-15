import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import Content from './Content';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/tablas';

const FAQS = [
  {
    question: '¿Las tablas son una tarea oficial separada en IELTS Writing Task 1?',
    answer:
      'No deben presentarse como una tarea oficial independiente. IELTS Academic Writing Task 1 pide describir información visual como gráficos, tablas, mapas, diagramas o procesos. WeLearn separa las tablas como ruta de práctica porque requieren seleccionar datos, agrupar filas y evitar copiar cada celda.',
  },
  {
    question: '¿Qué debe ir en el overview de una tabla?',
    answer:
      'El overview debe resumir los patrones principales: categoría más alta o más baja, diferencias amplias, similitudes fuertes o un cambio general entre columnas. No debe repetir todas las cifras.',
  },
  {
    question: '¿Cómo escribo sobre tablas sin sonar mecánico?',
    answer:
      'Agrupa filas o columnas por patrón, usa comparaciones selectivas y menciona cifras solo cuando prueban una idea. Una buena respuesta no describe la tabla celda por celda.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1: tablas con ejercicios',
  description:
    'Practica IELTS Academic Writing Task 1 tables: overview, selección de datos, agrupación por patrón, comparaciones y modelo de respuesta explicado.',
  keywords: [
    'IELTS table task 1',
    'IELTS writing task 1 tablas',
    'IELTS academic writing table',
    'IELTS table overview',
    'IELTS writing task 1 data selection',
  ],
  openGraph: {
    title: 'IELTS Writing Task 1: tablas con ejercicios',
    description:
      'Lección práctica para responder tablas en IELTS Academic Writing Task 1 con ejercicio original, feedback y modelo explicado.',
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
        name="IELTS Writing Task 1: tablas"
        url={URL}
        description="Lección y práctica original para escribir respuestas de IELTS Academic Writing Task 1 sobre tablas."
        teaches={[
          'IELTS Academic Writing Task 1',
          'tables',
          'overview writing',
          'data selection',
          'row and column comparison',
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
          { name: 'Tablas', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
    </>
  );
}
