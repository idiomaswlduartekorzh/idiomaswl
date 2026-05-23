import type { Metadata } from 'next';
import PracticaClient from './PracticaClient';

export const metadata: Metadata = {
  title: 'Práctica de Coreano — Idiomas WeLearn',
  description: 'Herramientas interactivas para dominar el Hangul: lector con desglose silábico, pronunciación en tiempo real y desglosador de reglas fonéticas del batchim.',
};

export default function PracticaPage() {
  return <PracticaClient />;
}
