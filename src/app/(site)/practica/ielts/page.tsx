import type { Metadata } from 'next';
import IELTSHubClient from './IELTSHubClient';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'IELTS Practice: Listening, Reading and Writing',
  description:
    'Practise IELTS Listening with 20 replayable sets and PDFs, plus Reading question types and explained Writing Task 1 and Task 2 exercises.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts' },
};

export default function IELTSPage() {
  return (
    <>
      <CourseSchema
        name="IELTS Practice — Academic and General Training"
        description="Practise IELTS with 20 replayable Listening sets, printable worksheets, Reading question types, and explained Writing Task 1 and Task 2 exercises."
        url="https://www.idiomaswl.com/practica/ielts"
        educationalLevel="B1,B2,C1"
        teaches="IELTS Academic, IELTS General Training, Listening, Reading, Writing, English"
        inLanguage="en"
      />
      <IELTSHubClient />
    </>
  );
}
