import type { Metadata } from 'next';
import BodyOneClient from './BodyOneClient';
import { Task2SkillStructuredData } from '../Task2SkillStructuredData';

const path = '/practica/ielts/academic/writing/task2/body-1';

export const metadata: Metadata = {
  title: 'IELTS Task 2 Body Paragraph 1: Structure and Practice',
  description: 'Build IELTS Writing Task 2 Body Paragraph 1 with question-type-specific models, sentence Lego blocks, guided writing and eight progressive practice levels.',
  keywords: ['IELTS Task 2 body paragraph 1', 'IELTS body paragraph structure', 'IELTS topic sentence examples', 'how to explain an idea in IELTS'],
  alternates: { canonical: `https://www.idiomaswl.com${path}` },
  robots: { index: true, follow: true },
  openGraph: { title: 'IELTS Task 2 Body Paragraph 1', description: 'Learn how Body 1 changes across five IELTS Task 2 question families.', url: `https://www.idiomaswl.com${path}`, type: 'article', locale: 'en_US' },
};

const faqs = [
  { question: 'How many words should IELTS Task 2 Body Paragraph 1 contain?', answer: 'IELTS sets no paragraph word count. WeLearn uses roughly 80–110 words as a flexible study target within a complete response of at least 250 words.' },
  { question: 'Must Body 1 always present the writer\'s first reason?', answer: 'No. Its function changes with the prompt: it may support a position, explain the first view, analyse a requested cause or problem, develop an advantage, or answer the first direct question.' },
  { question: 'Does every IELTS body paragraph need a statistic?', answer: 'No. A clear plausible illustration can develop the reasoning. Writers should not invent a named study, authority or exact statistic.' },
  { question: 'Can one sentence perform more than one paragraph function?', answer: 'Yes. The WeLearn labels make logic visible during practice, but fluent sentences may combine adjacent functions such as main idea and explanation.' },
];

export default function Page() {
  return <><Task2SkillStructuredData name="IELTS Task 2 Body Paragraph 1" path={path} teaches={['topic sentences', 'idea development', 'examples and evidence', 'paragraph cohesion', 'question-type-specific paragraph structure']} faqs={faqs} /><BodyOneClient /></>;
}
