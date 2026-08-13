import type { Metadata } from 'next';
import Content from './Content';

export const metadata: Metadata = {
  title: 'Use of English B2 — Multiple Choice Cloze & Word Formation',
  description: 'Practica FCE Use of English: Multiple Choice Cloze y Word Formation, con textos de contexto colombiano y corrección inmediata.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b2/uso-del-idioma' },
};

export default function Page() {
  return <Content />;
}
