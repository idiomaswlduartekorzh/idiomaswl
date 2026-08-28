import type { Metadata } from 'next';
import { Task2SkillStructuredData } from '../Task2SkillStructuredData';
import FinalReviewClient from './FinalReviewClient';

export const metadata: Metadata = {
  title: 'IELTS Task 2 Final Review Checklist and Practice',
  description: 'Review an IELTS Academic Writing Task 2 essay with a question-sensitive checklist, guided diagnosis and progressive practice without automated band claims.',
  keywords: ['IELTS task 2 final review', 'IELTS writing task 2 checklist', 'IELTS essay proofreading', 'IELTS task response review'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/revision-final' },
  openGraph: { title: 'IELTS Task 2 Final Review Checklist and Practice', description: 'Check Task Response, essay logic, position, cohesion and language before submitting a Task 2 response.', type: 'website', locale: 'en_US' },
};

const FAQS = [
  { question: 'What should I review first?', answer: 'Start with the prompt and every instruction. A missing answer cannot be repaired by better vocabulary or punctuation.' },
  { question: 'Does this checklist predict my band?', answer: 'No. It helps you find visible revision priorities. Writing and scoring still require expert evaluation of the complete response.' },
  { question: 'Should I rewrite whole paragraphs?', answer: 'Usually not during a final timed review. Correct the highest-impact issue that can be fixed safely without creating new contradictions.' },
  { question: 'What if I am under 250 words?', answer: 'Task 2 requires at least 250 words. Do not add filler: identify the least-developed required idea and extend its reasoning purposefully.' },
];

export default function Page() {
  return <><Task2SkillStructuredData name="IELTS Task 2 Final Review" path="/practica/ielts/academic/writing/task2/revision-final" teaches={['Task Response review', 'essay logic review', 'position consistency', 'cohesion review', 'language editing']} faqs={FAQS} /><FinalReviewClient faqs={FAQS} /></>;
}
