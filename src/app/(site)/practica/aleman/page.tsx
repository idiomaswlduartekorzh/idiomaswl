import type { Metadata } from 'next';
import AlemanHubClient from './AlemanHubClient';

export const metadata: Metadata = {
  title: 'Práctica de Alemán A1 — Lesen, Grammatik, Schreiben | Idiomas WeLearn',
  description: 'Ejercicios interactivos de alemán A1: lectura con vocabulario, gramática (Artikel, sein, Pronomen), escritura guiada y frases de supervivencia.',
  alternates: { canonical: 'https://idiomaswl.com/practica/aleman' },
};

export default function AlemanPage() {
  return <AlemanHubClient />;
}
