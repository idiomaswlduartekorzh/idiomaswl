import type { Metadata } from 'next';
import ImprovisaClient from './ImprovisaClient';

export const metadata: Metadata = {
  title: 'Improvisa en inglés B1: cinco retos orales | WeLearn',
  description: 'Cinco ejercicios de speaking B1 con preguntas, una línea de tiempo y seis palabras sorpresa en cada historia.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b1/habla/solo/improvisa' },
};

export default function ImprovisaPage() {
  return <ImprovisaClient />;
}
