import type { Metadata } from 'next';
import InglesHubClient from './InglesHubClient';

export const metadata: Metadata = {
  title: 'Práctica de Inglés A1 — Lectura, Gramática, Escritura | Idiomas WeLearn',
  description: 'Ejercicios interactivos de inglés A1: lectura con vocabulario, gramática (artículos, verb to be, pronombres), escritura guiada y frases de supervivencia.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ingles' },
};

export default function InglesPage() {
  return <InglesHubClient />;
}
