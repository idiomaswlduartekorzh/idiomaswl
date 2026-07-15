import type { Metadata } from 'next';

import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { IELTS_TASK2_PROBLEM_SOLUTION_PROMPTS } from '@/data/practica-exams/seo-catalog';

import ProblemSolutionClient from './ProblemSolutionClient';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/problem-solution';

const FAQS = [
  {
    question: '¿Problem-solution essay es una tarea oficial separada en IELTS Writing Task 2?',
    answer:
      'No como ruta oficial independiente. IELTS Writing Task 2 pide escribir un ensayo de al menos 250 palabras en respuesta a una pregunta. WeLearn separa problem-solution como categoría de práctica porque muchos prompts piden explicar causas, problemas, soluciones o medidas.',
  },
  {
    question: '¿Qué debe incluir un ensayo problem-solution fuerte?',
    answer:
      'Debe identificar un problema específico, explicar por qué ocurre o por qué es importante, proponer una solución realista y conectar esa solución con el problema. No basta con nombrar medidas generales.',
  },
  {
    question: '¿Puedo escribir solo soluciones si el prompt menciona problems and solutions?',
    answer:
      'No. Si la pregunta pide both problems and solutions, debes cubrir ambos lados de forma explícita. Omitir problemas o soluciones puede afectar Task Response.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2: problem-solution essays',
  description:
    'Practica IELTS Academic Writing Task 2 problem-solution essays: problemas, causas, soluciones realistas, estructura y modelo Band 7 explicado.',
  keywords: [
    'IELTS problem solution essay',
    'IELTS writing task 2 problem solution',
    'IELTS causes solutions essay',
    'IELTS solutions essay',
    'IELTS task 2 problems and solutions',
  ],
  openGraph: {
    title: 'IELTS Writing Task 2: problem-solution essays',
    description:
      'Lección práctica para escribir problem-solution essays de IELTS Task 2 con diagnóstico, solución y modelo explicado.',
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
        name="IELTS Writing Task 2: problem-solution essays"
        url={URL}
        description="Lección y práctica original para escribir problem-solution essays de IELTS Academic Writing Task 2."
        teaches={[
          'IELTS Academic Writing Task 2',
          'problem-solution essays',
          'cause and solution prompts',
          'problem diagnosis',
          'solution development',
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
          { name: 'Problem-solution', url: URL },
        ]}
      />
      <ProblemSolutionClient faqs={FAQS} />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <IeltsTask2PromptBank
              prompts={IELTS_TASK2_PROBLEM_SOLUTION_PROMPTS}
              eyebrow="Banco Problem-Solution"
              title="2 prompts originales para entrenar problem-solution essays"
              intro="en esta ruta practicamos cómo conectar causas, problemas, consecuencias y soluciones realistas para que cada respuesta ataque exactamente lo que pregunta el prompt."
            />
          </div>
        </div>
      </section>
    </>
  );
}
