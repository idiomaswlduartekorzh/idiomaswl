import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

import ToeflGrammarForWritingClient from './ToeflGrammarForWritingClient';

const URL = `${PRACTICE_BASE_URL}/practica/toefl/writing/grammar-for-writing`;

const FAQS = [
  {
    question: '¿Esta página cubre toda la gramática de TOEFL?',
    answer:
      'No. Cubre gramática de alto impacto para TOEFL Writing: oraciones completas, conectores, cláusulas, tono de email y precisión en Academic Discussion. Es una ruta práctica, no una gramática general completa.',
  },
  {
    question: '¿Por qué trabajar gramática dentro de Writing?',
    answer:
      'Porque ETS describe que Writing evalúa comunicación clara, organización, gramática, vocabulario y propósito. En WeLearn entrenamos gramática como herramienta para comunicar mejor, no como lista abstracta de reglas.',
  },
  {
    question: '¿Integrated Writing entra en esta ruta?',
    answer:
      'No como tarea principal actual. Integrated Writing se mantiene como práctica legacy de síntesis. Los ejercicios principales se orientan a Build a Sentence, Write an Email y Academic Discussion.',
  },
];

export const metadata: Metadata = {
  title: 'TOEFL Grammar for Writing: gramática aplicada | Idiomas WeLearn',
  description:
    'Practica gramática aplicada a TOEFL Writing: sentence building, conectores, tono de email, cláusulas y precisión para Academic Discussion.',
  keywords: [
    'TOEFL grammar for writing',
    'TOEFL writing grammar',
    'TOEFL sentence building grammar',
    'TOEFL academic discussion grammar',
    'TOEFL email grammar',
  ],
  openGraph: {
    title: 'TOEFL Grammar for Writing | Idiomas WeLearn',
    description:
      'Gramática aplicada a TOEFL Writing con ejercicios originales, respuestas explicadas y checklist por tarea.',
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
        name="TOEFL Grammar for Writing"
        url={URL}
        description="Lección práctica de gramática aplicada para TOEFL Writing actual."
        teaches={[
          'TOEFL Writing',
          'grammar accuracy',
          'sentence building',
          'email tone',
          'academic discussion grammar',
        ]}
        isPartOf={{ name: 'TOEFL Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` },
          { name: 'Grammar for Writing', url: URL },
        ]}
      />
      <ToeflGrammarForWritingClient faqs={FAQS} />
    </>
  );
}
