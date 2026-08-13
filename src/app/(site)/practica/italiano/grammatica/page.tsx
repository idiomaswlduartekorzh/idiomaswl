import type { Metadata } from 'next';
import ItalianGrammarGame from './ItalianGrammarGame';

export const metadata: Metadata = {
  title: 'Gramática Italiana — Práctica intensiva',
  description:
    'Ejercicio interactivo de gramática italiana: artículos, tiempos verbales, pronombres relativos y más. Temporizador, 3 vidas y 4 niveles progresivos.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/grammatica' },
};

export default function Page() {
  return <ItalianGrammarGame />;
}
