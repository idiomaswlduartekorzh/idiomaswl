import type { Metadata } from 'next';

import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { IELTS_TASK2_DISCUSSION_PROMPTS } from '@/data/practica-exams/seo-catalog';

import DiscussionEssayClient from './DiscussionEssayClient';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/discussion';

const FAQS = [
  {
    question: '¿Discussion essay es un tipo oficial separado en IELTS Writing Task 2?',
    answer:
      'IELTS no lo organiza como una ruta oficial separada; oficialmente Task 2 pide escribir un ensayo en respuesta a una pregunta. WeLearn separa discussion essays como ruta de práctica porque prompts con “discuss both views and give your own opinion” requieren desarrollar dos posturas y expresar una opinión propia.',
  },
  {
    question: '¿Dónde va mi opinión en un discussion essay?',
    answer:
      'Debe aparecer al menos en la introducción o conclusión, y normalmente conviene dejarla clara en ambas. Los párrafos del cuerpo desarrollan las dos posturas, pero tu cierre debe indicar cuál te parece más convincente.',
  },
  {
    question: '¿Cuál es el error más común en un discussion essay?',
    answer:
      'El error más común es discutir ambas posturas y olvidar la opinión propia, o desarrollar una postura con mucho más detalle que la otra sin justificación.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2: discussion essay con ejercicios',
  description:
    'Practica IELTS Academic Writing Task 2 discussion essays: discuss both views, opinión propia, estructura balanceada y modelo Band 7 explicado.',
  keywords: [
    'IELTS discussion essay',
    'IELTS writing task 2 discussion',
    'discuss both views IELTS',
    'IELTS give your own opinion essay',
    'IELTS task 2 balanced essay',
  ],
  openGraph: {
    title: 'IELTS Writing Task 2: discussion essay con ejercicios',
    description:
      'Lección práctica para escribir discussion essays de IELTS Task 2 con balance, opinión propia y modelo explicado.',
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
        name="IELTS Writing Task 2: discussion essay"
        url={URL}
        description="Lección y práctica original para escribir discussion essays de IELTS Academic Writing Task 2."
        teaches={[
          'IELTS Academic Writing Task 2',
          'discussion essay',
          'discuss both views prompts',
          'balanced body paragraphs',
          'own opinion conclusion',
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
          { name: 'Discussion essay', url: URL },
        ]}
      />
      <DiscussionEssayClient faqs={FAQS} />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <IeltsTask2PromptBank
              prompts={IELTS_TASK2_DISCUSSION_PROMPTS}
              eyebrow="Banco Discussion Essay"
              title="2 prompts originales para entrenar discussion essays"
              intro="en esta ruta practicamos prompts discuss both views and give your own opinion con balance real, opinión visible, comparación de posturas y checklist antes de escribir el ensayo completo."
            />
          </div>
        </div>
      </section>
    </>
  );
}
