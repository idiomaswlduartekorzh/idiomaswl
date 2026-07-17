import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL, TOEFL_WRITING_REVISION_DRILLS } from '@/data/practica-exams/seo-catalog';

import ToeflWritingRubricaClient from './ToeflWritingRubricaClient';

const URL = `${PRACTICE_BASE_URL}/practica/toefl/writing/rubrica`;

const FAQS = [
  {
    question: '¿Esta es la rúbrica oficial de ETS?',
    answer:
      'No. Es una rúbrica pedagógica de WeLearn basada en las habilidades que ETS declara para TOEFL Writing: comunicación clara, organización de ideas, precisión gramatical y vocabulario, propósito y desarrollo. No reemplaza criterios oficiales ni promete puntajes.',
  },
  {
    question: '¿Qué tareas actuales cubre esta rúbrica?',
    answer:
      'Cubre Build a Sentence, Write an Email y Write for an Academic Discussion. Integrated Writing se mantiene separado como recurso legacy de síntesis académica.',
  },
  {
    question: '¿Cómo uso esta página para estudiar?',
    answer:
      'Elige la tarea, revisa los criterios, marca tu autoevaluación y vuelve a escribir una versión mejorada. La meta no es adivinar una nota exacta, sino detectar qué parte de tu respuesta está limitando la claridad.',
  },
];

export const metadata: Metadata = {
  title: 'TOEFL Writing rúbrica, checklist y revision drills | Idiomas WeLearn',
  description:
    'Rúbrica pedagógica TOEFL Writing para Build a Sentence, Write an Email y Academic Discussion: criterios, checklist, revision drills y autoevaluación.',
  keywords: [
    'TOEFL writing rubric',
    'TOEFL writing scoring',
    'TOEFL academic discussion rubric',
    'TOEFL write an email rubric',
    'TOEFL build a sentence evaluation',
    'TOEFL writing revision drills',
  ],
  openGraph: {
    title: 'TOEFL Writing rúbrica, checklist y revision drills | Idiomas WeLearn',
    description:
      'Evalúa tus respuestas TOEFL Writing con rúbrica pedagógica y revision drills para las tareas actuales.',
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
        name="TOEFL Writing rúbrica y checklist de evaluación"
        url={URL}
        description="Rúbrica pedagógica y autoevaluación para TOEFL Writing actual."
        teaches={[
          'TOEFL Writing',
          'writing evaluation',
          'Build a Sentence',
          'Write an Email',
          'Write for an Academic Discussion',
          'revision drills',
        ]}
        isPartOf={{ name: 'TOEFL Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` },
          { name: 'Rúbrica', url: URL },
        ]}
      />
      <ToeflWritingRubricaClient faqs={FAQS} revisionDrills={TOEFL_WRITING_REVISION_DRILLS} />
    </>
  );
}
