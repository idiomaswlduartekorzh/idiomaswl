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

const FAQS = [
  { question: 'How many words should Body 1 contain?', answer: 'IELTS sets no paragraph word count. WeLearn uses roughly 80–110 words as a study target, then adjusts it to the prompt and the complete 250+ word response.' },
  { question: 'Must Body 1 always present my first reason?', answer: 'No. It presents the first reason in an opinion essay, but may explain the first view, analyse requested problems or answer the first direct question in other prompts.' },
  { question: 'Does every paragraph need a real-world statistic?', answer: 'No. A clear, plausible example can illustrate reasoning. Do not invent a named study, authority or exact statistic.' },
  { question: 'Can one sentence perform two blocks?', answer: 'Yes. The labels make logic visible during practice; fluent writing may combine a main idea with explanation or an example with its link.' },
];

export default function Page() {
  return <><Task2SkillStructuredData name="IELTS Task 2 Body Paragraph 1" path={path} teaches={['topic sentences', 'idea development', 'examples and evidence', 'paragraph cohesion', 'question-type-specific paragraph structure']} faqs={FAQS} /><BodyOneClient faqs={FAQS} /></>;
}
