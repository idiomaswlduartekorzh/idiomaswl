import type { Metadata } from 'next';
import { Task2SkillStructuredData } from '../Task2SkillStructuredData';
import PromptAnalysisClient from './PromptAnalysisClient';

const PATH = '/practica/ielts/academic/writing/task2/analisis-pregunta';

const FAQS = [
  { question: 'Are these five families official task names?', answer: 'No. They are WeLearn teaching categories used to notice recurring instruction patterns. The exact wording of the prompt remains the authority.' },
  { question: 'How long should prompt analysis take?', answer: 'WeLearn uses five minutes as a planning target inside the recommended 40 minutes. It is a strategy, not an official time limit.' },
  { question: 'Must every essay have four paragraphs?', answer: 'No. Four paragraphs are a reliable study default, while a third body paragraph remains optional.' },
  { question: 'What makes a plan complete?', answer: 'Every instruction and scope limit has a visible home in the thesis, Body 1, Body 2 or conclusion.' },
];

export const metadata: Metadata = {
  title: 'IELTS Task 2 Prompt Analysis: Question Types and Essay Plan',
  description: 'Analyse IELTS Writing Task 2 prompts by topic, instruction, scope, position and body route with 25 guided examples and eight progressive practice levels.',
  keywords: ['IELTS Task 2 prompt analysis', 'IELTS Task 2 question types', 'IELTS essay planning', 'how to identify IELTS Task 2 question type'],
  robots: { index: true, follow: true },
  alternates: { canonical: `https://www.idiomaswl.com${PATH}` },
  openGraph: { title: 'IELTS Task 2 Prompt Analysis and Essay Planning', description: 'Decode the prompt and build an aligned IELTS Task 2 essay plan.', type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <><Task2SkillStructuredData name="IELTS Task 2 prompt analysis practice" path={PATH} teaches={['prompt analysis', 'question types', 'essay planning', 'scope control', 'body paragraph route']} faqs={FAQS} /><PromptAnalysisClient /></>;
}
