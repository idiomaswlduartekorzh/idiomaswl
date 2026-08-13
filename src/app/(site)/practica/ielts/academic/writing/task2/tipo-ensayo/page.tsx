import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

// Ni el título ni la descripción prometen una banda: la página enseña a leer la instrucción
// del enunciado, y ningún ejercicio de cinco botones puede prometer un 7.
const DESCRIPTION =
  'Identifica los 5 tipos de ensayo del IELTS Writing Task 2 —opinión, discusión, problema-solución, ventajas-desventajas y doble pregunta— por la instrucción final del enunciado. 10 enunciados con corrección por opción y 3 ensayos que respondieron a la pregunta equivocada.';

export const metadata: Metadata = {
  title: 'Tipos de ensayo del IELTS Writing Task 2, uno por uno',
  description: DESCRIPTION,
  keywords: ['IELTS task 2 tipos', 'IELTS opinion essay', 'IELTS discussion essay', 'IELTS writing task 2 tipos de ensayo'],
  openGraph: {
    title: 'IELTS Task 2: Tipos de Ensayo — Opinion, Discussion, Problem-Solution',
    description: DESCRIPTION,
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/tipo-ensayo' },
}

import TipoEnsayoClient from './TipoEnsayoClient';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 tipos de ensayo"
        path="/practica/ielts/academic/writing/task2/tipo-ensayo"
        teaches={['essay types', 'prompt analysis', 'task response']}
      />
      <TipoEnsayoClient />
    </>
  );
}
