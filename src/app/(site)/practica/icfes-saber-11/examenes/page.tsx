import type { Metadata } from 'next';
import ExamenesClient from './ExamenesClient';

export const metadata: Metadata = {
  title: 'Simulacros ICFES Inglés — Exámenes oficiales | Idiomas WeLearn',
  description:
    'Practica con cuadernillos oficiales ICFES Saber 11 de inglés (2019, 2022, 2023). Mismo formato del examen real, corrección inmediata y análisis de errores.',
  alternates: { canonical: 'https://idiomaswl.com/practica/icfes-saber-11/examenes' },
};

export default function Page() {
  return <ExamenesClient />;
}
