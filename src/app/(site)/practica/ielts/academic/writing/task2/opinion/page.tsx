import type { Metadata } from 'next';

import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { IELTS_TASK2_OPINION_PROMPTS } from '@/data/practica-exams/seo-catalog';

import OpinionEssayClient from './OpinionEssayClient';

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
    question: '¿Qué estructura funciona para un opinion essay Band 7+?',
    answer:
      'Una estructura segura es: introducción con tesis clara, cuerpo 1 con la razón principal, cuerpo 2 con una segunda razón o refutación de contraargumento, y conclusión que reafirma la postura.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2: opinion essay con ejercicios',
  description:
    'Practica IELTS Academic Writing Task 2 opinion essays: agree/disagree, tesis clara, argumentos, contraargumentos y modelo Band 7 explicado.',
  keywords: [
    'IELTS opinion essay',
    'IELTS writing task 2 opinion',
    'IELTS agree disagree essay',
    'IELTS to what extent essay',
    'IELTS task 2 thesis statement',
  ],
  openGraph: {
    title: 'IELTS Writing Task 2: opinion essay con ejercicios',
    description:
      'Lección práctica para escribir opinion essays de IELTS Task 2 con tesis, planificación, práctica y modelo explicado.',
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
        name="IELTS Writing Task 2: opinion essay"
        url={URL}
        description="Lección y práctica original para escribir opinion essays de IELTS Academic Writing Task 2."
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
          { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 2', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2' },
          { name: 'Opinion essay', url: URL },
        ]}
      />
      <OpinionEssayClient faqs={FAQS} />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <IeltsTask2PromptBank
              prompts={IELTS_TASK2_OPINION_PROMPTS}
              eyebrow="Banco Opinion Essay"
              title="2 prompts originales para entrenar opinion essays"
              intro="en esta ruta practicamos prompts agree/disagree y to what extent con tesis visible, postura sostenida, contraargumento controlado y checklist antes de escribir el ensayo completo."
            />
          </div>
        </div>
      </section>
    </>
  );
}
