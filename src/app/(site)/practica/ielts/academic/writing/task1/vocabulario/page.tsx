import type { Metadata } from 'next';
import { Task1SkillStructuredData } from '../Task1SkillStructuredData';
import VocabularioDatosContent from './Content';

export const metadata: Metadata = {
  title: 'IELTS Writing Task 1 Data Vocabulary and Cohesion Practice',
  description: 'Practise IELTS Writing Task 1 data vocabulary, cohesion, comparisons, approximation and controlled sentence building with visual-based exercises.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task1/vocabulario' },
};

export default function VocabularioPage() {
  return (
    <>
      <Task1SkillStructuredData
        name="IELTS Task 1 data vocabulary and cohesion"
        path="/practica/ielts/academic/writing/task1/vocabulario"
        teaches={['data vocabulary', 'cohesion', 'comparative language', 'precision']}
      />
      <VocabularioDatosContent />
    </>
  );
}
