import type { Metadata } from 'next';
import ExamenesClient from './ExamenesClient';
import IcfesJsonLd from '../_components/IcfesJsonLd';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/examenes';

export const metadata: Metadata = {
  title: 'Simulacros ICFES Inglés — Exámenes oficiales | Idiomas WeLearn',
  description:
    'Practica con cuadernillos oficiales ICFES Saber 11 de inglés (2019, 2022, 2023). Mismo formato del examen real, corrección inmediata y análisis de errores.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Simulacros ICFES Inglés y cuadernillo guiado', description: 'Cuadernillos divulgados, modo examen y un recorrido de 25 preguntas completamente explicado.', url: CANONICAL, type: 'website' },
};

export default function Page() {
  return <><IcfesJsonLd name="Simulacros ICFES Inglés" description="Cuadernillos divulgados por el ICFES en modo examen y práctica guiada." url={CANONICAL} currentLabel="Cuadernillos" /><ExamenesClient /></>;
}
