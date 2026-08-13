import type { Metadata } from 'next';
import IntegratedOathExercise from './Content';

export const metadata: Metadata = {
  title: 'Italiano B2 — Oath of Allegiance / Giuramento di fedeltà',
  description: 'Ejercicio integrado de italiano B2 con lectura, audio, preguntas de comprensión y escritura argumentativa sobre juramento de fidelidad y doble ciudadanía.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/b2/integrato/oath-of-allegiance' },
};

export default function OathOfAllegiancePage() {
  return <IntegratedOathExercise />;
}

