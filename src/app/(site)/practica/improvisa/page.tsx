import type { Metadata } from 'next';
import ImprovisaClient from './ImprovisaClient';

export const metadata: Metadata = {
  title: 'Improvisa — Historias con palabras sorpresa | WeLearn',
  description: 'Cuenta una historia mientras incorporas seis palabras sorpresa. Tres niveles de expresión oral con pistas, ritmo y retos progresivos.',
};

export default function ImprovisaPage() {
  return <ImprovisaClient />;
}
