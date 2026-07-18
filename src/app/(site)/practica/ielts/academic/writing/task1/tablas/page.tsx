import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import Content from './Content';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/tablas';

const FAQS = [
  {
    question: 'Are tables a separate official IELTS Writing Task 1 task?',
    answer:
      'They should not be presented as an independent official task. IELTS Academic Writing Task 1 asks you to describe visual information such as graphs, tables, maps, diagrams or processes. WeLearn separates tables as a practice route because they require data selection, row grouping and careful avoidance of cell-by-cell copying.',
  },
  {
    question: 'What belongs in a table overview?',
    answer:
      'The overview should summarise the main patterns: the highest or lowest category, large differences, strong similarities or a general change between columns. It should not repeat every figure.',
  },
  {
    question: 'How can I write about tables without sounding mechanical?',
    answer:
      'Group rows or columns by pattern, use selective comparisons and mention figures only when they prove an idea. A strong response does not describe the table cell by cell.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Tables | Practice and Exercises',
  description:
    'Practise IELTS Academic Writing Task 1 tables with overview, data-selection, pattern-grouping, comparison and model-answer exercises.',
  keywords: [
    'IELTS table task 1',
    'IELTS Writing Task 1 table practice',
    'IELTS academic writing table',
    'IELTS table overview',
    'IELTS writing task 1 data selection',
  ],
  openGraph: {
    title: 'IELTS Writing Task 1 Tables | Practice and Exercises',
    description:
      'Guided IELTS Academic Writing Task 1 table practice with original exercises, feedback and an explained model answer.',
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
        name="IELTS Writing Task 1: tables"
        url={URL}
        description="Original IELTS Academic Writing Task 1 lesson and practice for describing tables."
        teaches={[
          'IELTS Academic Writing Task 1',
          'tables',
          'overview writing',
          'data selection',
          'row and column comparison',
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
          { name: 'Tables', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
    </>
  );
}
