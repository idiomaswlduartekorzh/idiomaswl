import type { Metadata } from 'next';

import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { IELTS_TASK2_OPINION_PROMPTS } from '@/data/practica-exams/seo-catalog';

import EssayTypePathClient from '../type-paths/EssayTypePathClient';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/opinion';

const FAQS = [
  {
    question: '¿Opinion essay es un tipo oficial separado en IELTS Writing Task 2?',
    answer:
      'IELTS no lo presenta como una ruta oficial separada dentro del examen; oficialmente Task 2 pide escribir un ensayo en respuesta a una pregunta. WeLearn separa opinion essays como ruta de práctica porque las instrucciones agree/disagree y to what extent requieren una tesis clara y sostenida.',
  },
  {
    question: '¿Debo discutir ambos lados en un IELTS opinion essay?',
    answer:
      'Puedes mencionar un contraargumento, pero no debes tratar ambos lados como si fuera un discussion essay. La prioridad es tomar una posición clara y defenderla en todo el ensayo.',
  },
  {
    question: '¿Qué estructura funciona para un opinion essay?',
    answer:
      'Introducción con una tesis que responda la pregunta, cuerpo 1 con la razón principal, cuerpo 2 con una segunda razón o con el contraargumento refutado, y conclusión que reafirma la misma postura. Ninguna estructura garantiza una banda: lo que se puntúa es si respondiste la pregunta que te hicieron.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 opinion essays with practice',
  description:
    'Practise IELTS Academic Writing Task 2 opinion essays with agree-disagree prompts, clear positions, counterarguments and explained models.',
  keywords: [
    'IELTS opinion essay',
    'IELTS writing task 2 opinion',
    'IELTS agree disagree essay',
    'IELTS to what extent essay',
    'IELTS task 2 thesis statement',
  ],
  openGraph: {
    title: 'IELTS Writing Task 2 opinion essays with practice',
    description:
      'Learn to build a clear position, plan supporting reasons and write a complete IELTS Task 2 opinion essay.',
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
        name="IELTS Writing Task 2: opinion essay"
        url={URL}
        description="Original lesson and guided practice for writing opinion essays in IELTS Academic Writing Task 2."
        teaches={[
          'IELTS Academic Writing Task 2',
          'opinion essay',
          'agree disagree prompts',
          'thesis statements',
          'argument planning',
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
          { name: 'Opinion essay', url: URL },
        ]}
      />
      <EssayTypePathClient type="opinion" faqs={FAQS} />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <IeltsTask2PromptBank
              prompts={IELTS_TASK2_OPINION_PROMPTS}
              eyebrow="Opinion essay prompt bank"
              title="Two original prompts to train opinion essays"
              intro="this route trains agree/disagree and to what extent prompts: a visible thesis, a position held to the end, one objection conceded and answered, and a checklist to run before writing the full essay."
            />
          </div>
        </div>
      </section>
    </>
  );
}
