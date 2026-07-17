import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, JsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

import AcademicDiscussionPromptBankClient from './AcademicDiscussionPromptBankClient';
import { ACADEMIC_DISCUSSION_PROMPTS } from './prompts';

const URL = `${PRACTICE_BASE_URL}/practica/toefl/writing/academic-discussion/banco-de-prompts`;

const FAQS = [
  {
    question: '¿Estos prompts de TOEFL Academic Discussion son oficiales?',
    answer:
      'No. Son prompts originales de práctica creados por WeLearn. Usan el formato oficial actual de Academic Discussion como referencia, pero no son material oficial de ETS.',
  },
  {
    question: '¿Cuántas palabras debo escribir en Academic Discussion?',
    answer:
      'Como práctica, apunta a una respuesta clara de unas 100 a 150 palabras: postura, conexión con la discusión, razón desarrollada y ejemplo. La prioridad no es escribir más, sino comunicar mejor.',
  },
  {
    question: '¿Integrated Writing forma parte de este banco?',
    answer:
      'No. Este banco se enfoca en Write for an Academic Discussion, una tarea actual de TOEFL iBT Writing. Integrated Writing permanece como ruta legacy/síntesis complementaria.',
  },
];

export const metadata: Metadata = {
  title: 'TOEFL Academic Discussion prompts: banco de práctica',
  description:
    'Banco original de prompts TOEFL Academic Discussion con temas, estrategias, checklists, frases útiles, modelos y respuestas explicadas.',
  keywords: [
    'TOEFL academic discussion prompts',
    'TOEFL writing prompts',
    'TOEFL academic discussion practice',
    'write for an academic discussion prompts',
    'TOEFL discussion sample answers',
  ],
  openGraph: {
    title: 'TOEFL Academic Discussion prompts',
    description:
      'Practica Academic Discussion con prompts originales, checklist, modelos explicados y estrategia WeLearn.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="TOEFL Academic Discussion prompts"
        url={URL}
        description="Banco de prompts originales para practicar Write for an Academic Discussion en TOEFL Writing."
        teaches={[
          'TOEFL Academic Discussion',
          'TOEFL Writing prompts',
          'academic tone',
          'opinion development',
          'responding to viewpoints',
        ]}
        isPartOf={{ name: 'TOEFL Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` },
          { name: 'Academic Discussion', url: `${PRACTICE_BASE_URL}/practica/toefl/writing/academic-discussion` },
          { name: 'Banco de prompts', url: URL },
        ]}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'TOEFL Academic Discussion prompt bank',
          url: URL,
          numberOfItems: ACADEMIC_DISCUSSION_PROMPTS.length,
          itemListElement: ACADEMIC_DISCUSSION_PROMPTS.map((prompt, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: prompt.topic,
            description: prompt.question,
          })),
        }}
      />
      <AcademicDiscussionPromptBankClient />
    </>
  );
}
