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

const FAQS = [
  { question: 'Must Body 2 always present my second reason?', answer: 'No. It may add a second reason, explain the second view, propose solutions, develop the opposite side or answer the second direct question.' },
  { question: 'Should Body 2 begin with “Secondly”?', answer: 'Not necessarily. The logical relationship should be clear, but a meaningful controlling sentence is more important than a mechanical numbered connector.' },
  { question: 'Can Body 2 disagree with Body 1?', answer: 'It can contrast with Body 1 when the task requires two views or two sides. The writer’s thesis and final judgement must nevertheless remain consistent.' },
  { question: 'How long should Body 2 be?', answer: 'IELTS sets no paragraph limit. WeLearn uses roughly 80–110 words as a flexible study target inside a complete response of at least 250 words.' },
];

export default function Page() {
  return <><Task2SkillStructuredData name="IELTS Task 2 Body Paragraph 2" path={path} teaches={['essay progression', 'second controlling ideas', 'contrast and continuation', 'question-type-specific paragraph structure', 'links to position']} faqs={FAQS} /><BodyTwoClient faqs={FAQS} /></>;
}
