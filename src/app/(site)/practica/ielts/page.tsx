import type { Metadata } from 'next';
import IELTSHubClient from './IELTSHubClient';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'IELTS Practice: 4 Skills and 20 Sets',
  description:
    'Practise IELTS Listening, Reading, Writing and Speaking independently with 20 audited sets, or take a complete mock.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts' },
};

export default function IELTSPage() {
  return (
    <>
      <CourseSchema
        name="IELTS Practice — Academic and General Training"
        description="Practise the four IELTS skills independently with 20 audited Academic sets, or take a complete mock."
        url="https://www.idiomaswl.com/practica/ielts"
        educationalLevel="B1,B2,C1"
        teaches="IELTS Academic, IELTS General Training, Listening, Reading, Writing, Speaking, English"
        inLanguage="en"
      />
      <IELTSHubClient />
    </>
  );
}
