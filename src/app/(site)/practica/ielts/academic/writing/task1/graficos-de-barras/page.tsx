import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import Content from './Content';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/graficos-de-barras';

const FAQS = [
  {
    question: 'Is a bar chart a separate official IELTS Writing Task 1 type?',
    answer:
      'It should not be presented as an independent official category. IELTS Academic Writing Task 1 asks you to describe visual information such as graphs, tables, maps, diagrams or processes. WeLearn separates bar charts as a practice route because they often require category, ranking and difference comparisons.',
  },
  {
    question: 'What should the overview prioritise in a bar chart?',
    answer:
      'It should summarise the largest differences: the leading and lowest categories, group contrasts, an overall pattern or a change in ranking. It should not repeat every bar one by one.',
  },
  {
    question: 'How should I organise bar chart body paragraphs?',
    answer:
      'Group similar or contrasting categories. Instead of describing every bar in visual order, use two paragraphs: one for the main categories and another for secondary groups or exceptions.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Bar Charts | Practice and Exercises',
  description:
    'Practise IELTS Academic Writing Task 1 bar charts with overview, ranking, comparison, data-grouping and model-answer exercises.',
  keywords: [
    'IELTS bar chart task 1',
    'IELTS Writing Task 1 bar chart practice',
    'IELTS academic writing bar chart',
    'IELTS bar chart overview',
    'IELTS writing task 1 comparisons',
  ],
  openGraph: {
    title: 'IELTS Writing Task 1 Bar Charts | Practice and Exercises',
    description:
      'Guided IELTS Academic Writing Task 1 bar chart practice with original exercises, feedback and an explained model answer.',
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
        name="IELTS Writing Task 1 bar charts"
        url={URL}
        description="Original IELTS Academic Writing Task 1 lesson and practice for describing bar charts."
        teaches={[
          'IELTS Academic Writing Task 1',
          'bar charts',
          'overview writing',
          'data grouping',
          'category comparison',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing Task 1',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 1', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1' },
          { name: 'Bar charts', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
    </>
  );
}
