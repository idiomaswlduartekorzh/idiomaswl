import type { Metadata } from 'next';
import IELTSHubClient from './IELTSHubClient';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Práctica IELTS — Reading True/False/Not Given | Idiomas WeLearn',
  description: 'Practica IELTS Academic Reading: True/False/Not Given con pasaje real, feedback inmediato y estrategias para Band 6–8.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts' },
};

export default function IELTSPage() {
  return (
    <>
      <CourseSchema
        name="Práctica IELTS Academic — Reading y Writing"
        description="Practica IELTS Academic: True/False/Not Given, Task 1 y Task 2. Feedback inmediato y estrategias para Band 6–8."
        url="https://www.idiomaswl.com/practica/ielts"
        educationalLevel="B1,B2,C1"
        teaches="IELTS Academic, Reading, Writing, inglés"
        inLanguage="en"
      />
      <IELTSHubClient />
    </>
  );
}
