import type { Metadata } from 'next';
import IELTSHubClient from './IELTSHubClient';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Práctica IELTS: Academic, General Training, Reading y Writing',
  description:
    'Practica IELTS en español con rutas Academic y General Training, Reading por tipos de pregunta, habilidades, Writing Task 1 y Task 2 con ejercicios explicados.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts' },
};

export default function IELTSPage() {
  return (
    <>
      <CourseSchema
        name="Práctica IELTS — Academic y General Training"
        description="Practica IELTS con rutas Academic y General Training, Reading por tipos de pregunta, habilidades de lectura, Writing Task 1 y Task 2 con ejercicios explicados."
        url="https://www.idiomaswl.com/practica/ielts"
        educationalLevel="B1,B2,C1"
        teaches="IELTS Academic, IELTS General Training, Reading, Writing, inglés"
        inLanguage="es-CO"
      />
      <IELTSHubClient />
    </>
  );
}
