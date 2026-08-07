import type { Metadata } from 'next';
import BodyTwoClient from './BodyTwoClient';
import { Task2SkillStructuredData } from '../Task2SkillStructuredData';

const path = '/practica/ielts/academic/writing/task2/body-2';

export const metadata: Metadata = {
  title: 'IELTS Task 2 Body Paragraph 2: Structure and Practice',
  description: 'Build IELTS Writing Task 2 Body Paragraph 2 with question-type-specific models, sentence Lego blocks, guided writing and eight progressive practice levels.',
  keywords: ['IELTS Task 2 body paragraph 2', 'IELTS second body paragraph', 'IELTS essay progression', 'IELTS contrast paragraph examples'],
  alternates: { canonical: `https://www.idiomaswl.com${path}` },
  robots: { index: true, follow: true },
  openGraph: { title: 'IELTS Task 2 Body Paragraph 2', description: 'Learn how Body 2 changes across five IELTS Task 2 question families.', url: `https://www.idiomaswl.com${path}`, type: 'article', locale: 'en_US' },
};

const faqs = [
  { question: 'Must IELTS Task 2 Body Paragraph 2 always present a second reason?', answer: 'No. It may add a reason, explain the second view, propose solutions, develop the opposite side or answer the second direct question.' },
  { question: 'Should Body 2 begin with Secondly?', answer: 'Not necessarily. Clear logical progression and a meaningful controlling sentence matter more than a mechanical numbered connector.' },
  { question: 'Can Body 2 contrast with Body 1?', answer: 'Yes, when the task requires two views or sides. The thesis and overall judgement must remain consistent.' },
  { question: 'How many words should IELTS Body 2 contain?', answer: 'IELTS sets no paragraph word count. WeLearn uses roughly 80–110 words as a flexible study target within a complete response of at least 250 words.' },
];

export default function Page() {
  return <><Task2SkillStructuredData name="IELTS Task 2 Body Paragraph 2" path={path} teaches={['essay progression', 'second controlling ideas', 'contrast and continuation', 'question-type-specific paragraph structure', 'links to position']} faqs={faqs} /><BodyTwoClient /></>;
}
