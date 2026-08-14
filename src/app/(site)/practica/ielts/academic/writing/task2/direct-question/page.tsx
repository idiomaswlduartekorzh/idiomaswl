import type { Metadata } from 'next';

import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { IELTS_TASK2_DIRECT_QUESTION_PROMPTS } from '@/data/practica-exams/seo-catalog';

import EssayTypePathClient from '../type-paths/EssayTypePathClient';

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
    'Practise IELTS Academic Writing Task 2 direct-question essays with two-part prompt analysis, explicit answers and explained models.',
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
      'Learn to answer both parts of an IELTS Task 2 direct-question prompt through clear planning and complete development.',
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
        name="IELTS Writing Task 2: direct-question essays"
        url={URL}
        description="Original lesson and guided practice for writing direct-question essays in IELTS Academic Writing Task 2."
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
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 2', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2' },
          { name: 'Direct question', url: URL },
        ]}
      />
      <EssayTypePathClient type="direct-questions" faqs={FAQS} />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <IeltsTask2PromptBank
              prompts={IELTS_TASK2_DIRECT_QUESTION_PROMPTS}
              eyebrow="Direct question prompt bank"
              title="Two original prompts to train direct-question essays"
              intro="this route trains two-part questions: each question needs a visible answer, a body paragraph of its own, and a conclusion that closes both — not the one you found easier."
            />
          </div>
        </div>
      </section>
    </>
  );
}
