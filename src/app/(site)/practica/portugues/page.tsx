import type { Metadata } from 'next';
import PortuguesHubClient from './PortuguesHubClient';

export const metadata: Metadata = {
  title: 'Práctica de Portugués A1 — Leitura, Gramática, Escrita | Idiomas WeLearn',
  description: 'Ejercicios interactivos de portugués A1: lectura con vocabulario, gramática (artigos, ser/estar, verbos -AR), escritura guiada y frases de supervivencia.',
  alternates: { canonical: 'https://idiomaswl.com/practica/portugues' },
};

export default function PortuguesPage() {
  return <PortuguesHubClient />;
}
