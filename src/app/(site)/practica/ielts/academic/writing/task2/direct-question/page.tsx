import type { Metadata } from 'next';

import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { IELTS_TASK2_DIRECT_QUESTION_PROMPTS } from '@/data/practica-exams/seo-catalog';

import DirectQuestionClient from './DirectQuestionClient';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/direct-question';

const FAQS = [
  {
    question: '¿Direct-question essay es una tarea oficial separada en IELTS Writing Task 2?',
    answer:
      'No como categoría oficial independiente. IELTS Writing Task 2 pide escribir un ensayo de al menos 250 palabras. WeLearn separa direct-question o two-part question como ruta de práctica porque estos prompts hacen dos preguntas explícitas que deben responderse de forma visible.',
  },
  {
    question: '¿Qué diferencia hay entre direct-question y opinion essay?',
    answer:
      'En opinion essay normalmente defiendes una postura frente a una afirmación. En direct-question debes contestar cada pregunta del prompt; a veces una pregunta pide causa y otra pide opinión, solución o predicción.',
  },
  {
    question: '¿Cuál es el error más común en two-part questions?',
    answer:
      'Responder solo una parte o mezclar ambas sin señalización clara. Una estructura segura es usar un párrafo para la primera pregunta y otro párrafo para la segunda.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2: direct-question essays',
  description:
    'Practica IELTS Academic Writing Task 2 direct-question essays: two-part questions, estructura, respuestas explícitas y modelo Band 7 explicado.',
  keywords: [
    'IELTS direct question essay',
    'IELTS two part question essay',
    'IELTS writing task 2 direct question',
    'IELTS task 2 two questions',
    'IELTS essay answer both questions',
  ],
  openGraph: {
    title: 'IELTS Writing Task 2: direct-question essays',
    description:
      'Lección práctica para responder two-part questions de IELTS Task 2 con estructura, planificación y modelo explicado.',
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
        name="IELTS Writing Task 2: direct-question essays"
        url={URL}
        description="Lección y práctica original para escribir direct-question essays de IELTS Academic Writing Task 2."
        teaches={[
          'IELTS Academic Writing Task 2',
          'direct-question essays',
          'two-part question essays',
          'answering both questions',
          'essay planning',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing Task 2',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 2', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2' },
          { name: 'Direct question', url: URL },
        ]}
      />
      <DirectQuestionClient faqs={FAQS} />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <IeltsTask2PromptBank
              prompts={IELTS_TASK2_DIRECT_QUESTION_PROMPTS}
              eyebrow="Banco Direct Question"
              title="2 prompts originales para entrenar direct-question essays"
              intro="en esta ruta practicamos two-part questions donde cada pregunta necesita una respuesta visible, un párrafo de desarrollo propio y una conclusión que no deje media tarea sin cerrar."
            />
          </div>
        </div>
      </section>
    </>
  );
}
