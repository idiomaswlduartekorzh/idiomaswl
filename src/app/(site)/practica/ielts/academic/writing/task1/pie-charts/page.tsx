import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import Content from './Content';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/pie-charts';

const FAQS = [
  {
    question: 'Is a pie chart an independent official IELTS Writing Task 1 task?',
    answer:
      'It should not be presented as a separate official task. IELTS Academic Writing Task 1 asks you to describe visual information, and a pie chart is one possible form. WeLearn separates it as a practice route because it requires proportion comparisons and percentage grouping.',
  },
  {
    question: 'What should I mention first in a pie chart?',
    answer:
      'Start with the overview: the largest and smallest slices and any dominant contrast between categories. Exact percentages should support those patterns, not replace them.',
  },
  {
    question: 'How can I avoid repeating percentages in a pie chart response?',
    answer:
      'Group small categories, compare related categories and mention only figures that explain a clear difference. Do not describe every segment as an isolated list.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Pie Charts | Practice and Exercises',
  description:
    'Practise IELTS Academic Writing Task 1 pie charts with overview, proportions, percentage grouping, comparison and model-answer exercises.',
  keywords: [
    'IELTS pie chart task 1',
    'IELTS writing task 1 pie charts',
    'IELTS pie chart overview',
    'IELTS academic writing proportions',
    'IELTS writing task 1 percentages',
  ],
  openGraph: {
    title: 'IELTS Writing Task 1 Pie Charts | Practice and Exercises',
    description:
      'Guided IELTS Academic Writing Task 1 pie chart practice with an original visual, feedback and an explained model answer.',
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
        name="IELTS Writing Task 1: pie charts"
        url={URL}
        description="Original IELTS Academic Writing Task 1 lesson and practice for describing pie charts."
        teaches={[
          'IELTS Academic Writing Task 1',
          'pie charts',
          'overview writing',
          'percentage grouping',
          'proportion comparison',
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
          { name: 'Pie charts', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
    </>
  );
}
