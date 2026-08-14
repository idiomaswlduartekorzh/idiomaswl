import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 body paragraphs with guided practice',
  description: 'Build IELTS Task 2 body paragraphs with a clear controlling idea, explanation, concrete illustration and connection to the prompt.',
  keywords: ['IELTS body paragraphs', 'IELTS paragraph development', 'IELTS TEEL structure', 'IELTS Writing Task 2 practice'],
  openGraph: {
    title: 'IELTS Writing Task 2 body paragraphs with guided practice',
    description: 'Learn paragraph development through a worked example, five guided paragraphs and a diagnostic activity.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/parrafos-cuerpo' },
}

import ParrafosCuerpoClient from './ParrafosCuerpoClient';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Writing Task 2 body paragraphs"
        path="/practica/ielts/academic/writing/task2/parrafos-cuerpo"
        teaches={['body paragraphs', 'TEEL structure', 'idea development']}
      />
      <ParrafosCuerpoClient />
    </>
  );
}
