import type { Metadata } from 'next';

import { BreadcrumbJsonLd, JsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

import EmailPromptBankClient from './EmailPromptBankClient';
import { EMAIL_PROMPT_BANK } from './prompts';

const URL = `${PRACTICE_BASE_URL}/practica/toefl/writing/write-an-email/banco-de-prompts`;

export const metadata: Metadata = {
  title: 'TOEFL Write an Email prompts: banco de práctica',
  description:
    'Banco original de prompts TOEFL Write an Email con situaciones, tonos, estrategias, checklists, frases útiles, modelos y respuestas explicadas.',
  keywords: [
    'TOEFL write an email prompts',
    'TOEFL email writing practice',
    'TOEFL writing email examples',
    'TOEFL iBT email task',
    'TOEFL email sample answers',
  ],
  openGraph: {
    title: 'TOEFL Write an Email prompts',
    description:
      'Practica Write an Email con prompts originales, filtros por tono, checklist, modelos explicados y estrategia WeLearn.',
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
        name="TOEFL Write an Email prompts"
        url={URL}
        description="Banco de prompts originales para practicar Write an Email en TOEFL Writing."
        teaches={[
          'TOEFL Write an Email',
          'TOEFL email prompts',
          'formal email tone',
          'semi-formal email tone',
          'email purpose and closing',
        ]}
        isPartOf={{ name: 'TOEFL Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` },
          { name: 'Write an Email', url: `${PRACTICE_BASE_URL}/practica/toefl/writing/write-an-email` },
          { name: 'Banco de prompts', url: URL },
        ]}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'TOEFL Write an Email prompt bank',
          url: URL,
          numberOfItems: EMAIL_PROMPT_BANK.length,
          itemListElement: EMAIL_PROMPT_BANK.map((prompt, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: prompt.topic,
            description: prompt.task,
          })),
        }}
      />
      <EmailPromptBankClient />
    </>
  );
}
