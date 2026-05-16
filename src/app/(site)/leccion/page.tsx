import type { Metadata } from 'next';
import LeccionClient from './LeccionClient';

export const metadata: Metadata = {
  title: 'Cómo funciona — Idiomas WeLearn',
  description: 'Once pasos diarios que imitan la forma en que el cerebro interioriza un idioma. Preview interactivo del método WeLearn.',
};

export default function LeccionPage() {
  return <LeccionClient />;
}
