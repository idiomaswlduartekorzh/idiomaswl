import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import ModelAnswersClient from './ModelAnswersClient';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/model-answers';

const FAQS = [
  {
    question: '¿Estas son respuestas oficiales de IELTS?',
    answer:
      'No. Son modelos originales de práctica creados por WeLearn para estudiar estructura, desarrollo y lenguaje. IELTS evalúa con criterios oficiales; esta página explica estrategias pedagógicas compatibles con esos criterios.',
  },
  {
    question: '¿Debo memorizar model answers para IELTS Writing Task 2?',
    answer:
      'No. Memorizar respuestas completas es riesgoso porque el prompt cambia. Usa los modelos para aprender patrones: tesis clara, párrafos con desarrollo, ejemplos relevantes y cierre que responde la pregunta.',
  },
  {
    question: '¿Qué debe tener un model answer útil?',
    answer:
      'Debe mostrar por qué funciona: cómo responde el prompt, cómo organiza ideas, qué lenguaje usa y qué errores evita. Un texto sin anotación enseña menos que una respuesta explicada.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 model answers explained',
  description:
    'Study 25 original IELTS Academic Writing Task 2 model essays with paragraph functions, weak-versus-strong comparisons and a review checklist.',
  keywords: [
    'IELTS writing task 2 model answers',
    'IELTS task 2 sample answers',
    'IELTS band 7 essay examples',
    'IELTS essay model answer explained',
    'IELTS writing task 2 checklist',
  ],
  openGraph: {
    title: 'IELTS Writing Task 2 model answers explained',
    description:
      'Original IELTS Task 2 model answers with annotations, weak-versus-strong comparisons and a practical review checklist.',
    type: 'website',
    locale: 'en_US',
    url: URL,
  },
  alternates: { canonical: URL },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Writing Task 2 model answers explained"
        url={URL}
        description="A teaching bank of original IELTS Academic Writing Task 2 model answers with annotations and a review checklist."
        teaches={[
          'IELTS Academic Writing Task 2',
          'model answers',
          'essay annotation',
          'Task 2 model essays',
          'self-review checklist',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing Task 2',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 2', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2' },
          { name: 'Model answers', url: URL },
        ]}
      />
      <ModelAnswersClient faqs={FAQS} />
    </>
  );
}
