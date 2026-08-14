import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

// Ni el título ni la descripción prometen una banda: la página enseña a leer la instrucción
// del enunciado, y ningún ejercicio de cinco botones puede prometer un 7.
const DESCRIPTION =
  'Identify five common IELTS Writing Task 2 teaching families from the prompt instruction, then practise with 10 corrected prompts and three misaligned essays.';

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 question types, one by one',
  description: DESCRIPTION,
  keywords: ['IELTS Task 2 question types', 'IELTS opinion essay', 'IELTS discussion essay', 'IELTS essay prompt analysis'],
  openGraph: {
    title: 'IELTS Task 2 question types — opinion, discussion and more',
    description: DESCRIPTION,
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/tipo-ensayo' },
}

import TipoEnsayoClient from './TipoEnsayoClient';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Writing Task 2 question types"
        path="/practica/ielts/academic/writing/task2/tipo-ensayo"
        teaches={['essay types', 'prompt analysis', 'task response']}
      />
      <TipoEnsayoClient />
    </>
  );
}
