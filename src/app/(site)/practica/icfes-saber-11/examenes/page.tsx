import type { Metadata } from 'next';
import ExamenesClient from './ExamenesClient';
import IcfesJsonLd from '../_components/IcfesJsonLd';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/examenes';

export const metadata: Metadata = {
  title: 'Cuadernillos ICFES Inglés: práctica oficial explicada',
  description:
    'Practica con muestras históricas de inglés divulgadas por el ICFES, con su extensión original y corrección inmediata. Cinco traen explicación guiada.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Cuadernillos ICFES Inglés y práctica guiada', description: 'Muestras divulgadas, modo examen y 145 preguntas explicadas en cinco recorridos guiados.', url: CANONICAL, type: 'website' },
};

export default function Page() {
  return <><IcfesJsonLd name="Simulacros ICFES Inglés" description="Cuadernillos divulgados por el ICFES en modo examen y práctica guiada." url={CANONICAL} currentLabel="Cuadernillos" /><ExamenesClient /></>;
}
