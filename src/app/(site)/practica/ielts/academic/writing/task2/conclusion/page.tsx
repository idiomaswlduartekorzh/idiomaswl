import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 — Conclusión — Cierre efectivo sin nueva información',
  description: 'Aprende a escribir conclusiones del IELTS Writing Task 2: restating the thesis, resumen de puntos y posición final. Técnica Band 7 sin repetición literal.',
  keywords: ['IELTS conclusión', 'IELTS conclusion task 2', 'IELTS writing conclusión band 7', 'IELTS task 2 final paragraph'],
  openGraph: {
    title: 'IELTS Task 2: Conclusión — Cierre efectivo sin nueva información',
    description: 'Aprende a escribir conclusiones del IELTS Writing Task 2: restating the thesis, resumen de puntos y posición final. Técnica Band 7 sin repetición literal.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/conclusion' },
}

import ConclusionTask2Client from './ConclusionTask2Client';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 conclusión"
        path="/practica/ielts/academic/writing/task2/conclusion"
        teaches={['essay conclusion', 'restate thesis', 'final paragraph']}
      />
      <ConclusionTask2Client />
    </>
  );
}
