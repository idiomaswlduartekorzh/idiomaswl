import type { Metadata } from 'next';
import Content from './Content';

export const metadata: Metadata = {
  title: 'Use of English B2 — Multiple Choice Cloze & Word Formation | Idiomas WeLearn',
  description: 'Practica FCE Use of English Part 1 (Multiple Choice Cloze) y Part 3 (Word Formation) con textos de contexto colombiano y académico. Ejercicios interactivos con feedback inmediato.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b2/uso-del-idioma' },
};

export default function Page() {
  return <Content />;
}
