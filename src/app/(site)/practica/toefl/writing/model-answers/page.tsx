import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL, TOEFL_WRITING_SCORED_VARIANTS } from '@/data/practica-exams/seo-catalog';

import ToeflWritingModelAnswersClient from './ToeflWritingModelAnswersClient';

const URL = `${PRACTICE_BASE_URL}/practica/toefl/writing/model-answers`;

const FAQS = [
  {
    question: '¿Estos model answers son respuestas oficiales de ETS?',
    answer:
      'No. Son respuestas originales de práctica creadas por WeLearn. Usamos la estructura oficial actual de TOEFL Writing como referencia, pero los textos, explicaciones y checklists son pedagógicos.',
  },
  {
    question: '¿Qué tareas cubren estos modelos?',
    answer:
      'Cubren Build a Sentence, Write an Email y Write for an Academic Discussion, que son las tres tareas actuales de TOEFL iBT Writing según la página oficial de ETS revisada para esta ruta.',
  },
  {
    question: '¿Las puntuaciones de las variantes son oficiales?',
    answer:
      'No. Son estimaciones pedagógicas WeLearn para entrenar revisión. Sirven para comparar una respuesta fuerte con una respuesta en desarrollo, pero no reemplazan una calificación oficial.',
  },
  {
    question: '¿Integrated Writing aparece aquí?',
    answer:
      'Solo como referencia legacy o práctica de síntesis. No se presenta como tarea principal actual de TOEFL Writing en esta página.',
  },
];

export const metadata: Metadata = {
  title: 'TOEFL Writing model answers y respuestas calificadas',
  description:
    'TOEFL Writing con model answers originales, variantes calificadas y explicación para Build a Sentence, Write an Email y Academic Discussion.',
  keywords: [
    'TOEFL writing model answers',
    'TOEFL writing scored responses',
    'TOEFL academic discussion sample answer',
    'TOEFL write an email sample',
    'TOEFL build a sentence examples',
    'TOEFL writing sample responses',
  ],
  openGraph: {
    title: 'TOEFL Writing model answers y scored variants',
    description:
      'Model answers originales y variantes calificadas WeLearn para TOEFL Writing actual.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="TOEFL Writing model answers"
        url={URL}
        description="Banco pedagógico de model answers originales para TOEFL Writing actual."
        teaches={[
          'TOEFL Writing',
          'Build a Sentence',
          'Write an Email',
          'Write for an Academic Discussion',
          'model answer analysis',
          'scored response revision',
        ]}
        isPartOf={{ name: 'TOEFL Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` },
          { name: 'Model answers', url: URL },
        ]}
      />
      <ToeflWritingModelAnswersClient faqs={FAQS} variants={TOEFL_WRITING_SCORED_VARIANTS} />
    </>
  );
}
