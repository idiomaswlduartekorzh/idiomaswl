import type { Metadata } from 'next';
import FrancesHubClient from './FrancesHubClient';

export const metadata: Metadata = {
  title: 'Práctica de Francés A1 — Lecture, Grammaire, Écriture | Idiomas WeLearn',
  description: 'Ejercicios interactivos de francés A1: lectura con vocabulario, gramática (artículos, être, avoir), escritura guiada y frases de supervivencia.',
  alternates: { canonical: 'https://idiomaswl.com/practica/frances' },
};

export default function FrancesPage() {
  return <FrancesHubClient />;
}
