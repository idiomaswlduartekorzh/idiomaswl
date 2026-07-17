import type { Metadata } from 'next';

import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';

import Content from './Content';

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/graficos-lineales';

const FAQS = [
  {
    question: 'Is a line graph an official IELTS Writing Task 1 question type?',
    answer:
      'It is a common form of visual information in IELTS Academic Writing Task 1. The official task asks you to describe visual information such as graphs, tables, diagrams or processes; WeLearn practises it as a focused route because line graphs require specific decisions about trends, changes and comparisons.',
  },
  {
    question: 'What should an IELTS line graph overview include?',
    answer:
      'It should summarise the main patterns: overall trend, change in leadership, highest or lowest point, convergence, divergence or a sharp change. It should not become a list of exact figures.',
  },
  {
    question: 'How many figures should I mention in a Task 1 response?',
    answer:
      'Use only the figures needed to demonstrate important changes. A strong response usually selects relevant starting and ending points, peaks or lows, and key comparisons between series.',
  },
];

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Line Graphs | Practice and Exercises',
  description:
    'Learn how to answer IELTS Academic Writing Task 1 line graphs with original overview, trend, comparison and vocabulary practice with explained answers.',
  keywords: [
    'IELTS line graph task 1',
    'IELTS Writing Task 1 line graph practice',
    'IELTS academic writing graphs',
    'IELTS line graph overview',
    'IELTS writing task 1 practice',
  ],
  openGraph: {
    title: 'IELTS Writing Task 1 Line Graphs | Practice and Exercises',
    description:
      'Guided IELTS Academic Writing Task 1 line graph practice with an original model answer and explanation.',
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
        name="IELTS Writing Task 1 line graphs"
        url={URL}
        description="Original IELTS Academic Writing Task 1 lesson and practice for describing line graphs."
        teaches={[
          'IELTS Academic Writing Task 1',
          'line graphs',
          'overview writing',
          'trend selection',
          'data comparison',
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
          { name: 'Line graphs', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
    </>
  );
}
