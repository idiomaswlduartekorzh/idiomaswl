import type { Metadata } from 'next';
import IELTSHubClient from './IELTSHubClient';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'IELTS Practice: Listening, Reading and Writing',
  description:
    'Practise IELTS Listening with original audio, then build Reading and Writing skills across Academic and General Training routes.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts' },
};

export default function IELTSPage() {
  return (
    <>
      <CourseSchema
        name="IELTS Practice — Academic and General Training"
        description="Practise IELTS Listening with original audio, then build Reading and Writing skills across Academic and General Training routes."
        url="https://www.idiomaswl.com/practica/ielts"
        educationalLevel="B1,B2,C1"
        teaches="IELTS Listening, IELTS Academic, IELTS General Training, Reading, Writing, English"
        inLanguage="en"
      />
      <IELTSHubClient />
    </>
  );
}
