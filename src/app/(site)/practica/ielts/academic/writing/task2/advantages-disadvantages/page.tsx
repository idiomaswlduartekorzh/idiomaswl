import type { Metadata } from 'next';

import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { IELTS_TASK2_ADVANTAGES_DISADVANTAGES_PROMPTS } from '@/data/practica-exams/seo-catalog';

import EssayTypePathClient from '../type-paths/EssayTypePathClient';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/advantages-disadvantages';

const FAQS = [
  {
    question: '¿Advantages-disadvantages essay es un tipo oficial separado en IELTS Writing Task 2?',
    answer:
      'IELTS no lo presenta como una ruta oficial separada; oficialmente Task 2 pide escribir un ensayo en respuesta a una pregunta. WeLearn separa advantages-disadvantages como ruta de práctica porque estos prompts requieren comparar beneficios y problemas, y a veces decidir si uno pesa más que el otro.',
  },
  {
    question: '¿Qué diferencia hay entre “advantages and disadvantages” y “outweigh”?',
    answer:
      'Si la pregunta solo pide ventajas y desventajas, debes desarrollar ambos lados. Si pregunta whether the advantages outweigh the disadvantages, también debes tomar una posición clara sobre cuál lado pesa más.',
  },
  {
    question: '¿Cuál es una estructura segura para este tipo de ensayo?',
    answer:
      'Una estructura segura es: introducción con respuesta directa, cuerpo 1 con ventajas, cuerpo 2 con desventajas o evaluación de peso, y conclusión que responda exactamente la instrucción.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2: advantages and disadvantages',
  description:
    'Practise IELTS Academic Writing Task 2 advantages-and-disadvantages essays, including outweigh prompts, evaluation and explained models.',
  keywords: [
    'IELTS advantages disadvantages essay',
    'IELTS writing task 2 advantages disadvantages',
    'IELTS outweigh essay',
    'IELTS advantages outweigh disadvantages',
    'IELTS task 2 pros and cons essay',
  ],
  openGraph: {
    title: 'IELTS Writing Task 2: advantages and disadvantages',
    description:
      'Learn to balance, evaluate and answer IELTS Task 2 advantages-and-disadvantages and outweigh prompts.',
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
        name="IELTS Writing Task 2: advantages and disadvantages"
        url={URL}
        description="Original lesson and guided practice for writing advantages-and-disadvantages essays in IELTS Academic Writing Task 2."
        teaches={[
          'IELTS Academic Writing Task 2',
          'advantages and disadvantages essay',
          'outweigh prompts',
          'balanced evaluation',
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
          { name: 'Advantages and disadvantages', url: URL },
        ]}
      />
      <EssayTypePathClient type="advantages-disadvantages" faqs={FAQS} />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <IeltsTask2PromptBank
              prompts={IELTS_TASK2_ADVANTAGES_DISADVANTAGES_PROMPTS}
              eyebrow="Advantages and disadvantages prompt bank"
              title="Two original prompts to train advantages-and-disadvantages essays"
              intro="this route trains the difference between a prompt that asks for both sides and a prompt that asks which side is heavier. One word — outweigh — decides whether a verdict is compulsory."
            />
          </div>
        </div>
      </section>
    </>
  );
}
