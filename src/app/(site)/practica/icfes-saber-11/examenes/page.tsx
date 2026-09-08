import type { Metadata } from 'next';
import ExamenesClient from './ExamenesClient';
import IcfesJsonLd from '../_components/IcfesJsonLd';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/examenes';

export const metadata: Metadata = {
  title: 'Cuadernillos ICFES Inglés divulgados: catálogo por año',
  description:
    'Consulta 10 cuadernillos de inglés divulgados por el ICFES, separados entre Saber 11 y práctica complementaria. Cinco tienen explicación guiada.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Cuadernillos ICFES Inglés divulgados por año', description: '10 materiales divulgados, separados por audiencia; 145 preguntas explicadas en cinco recorridos guiados.', url: CANONICAL, type: 'website' },
};

export default function Page() {
  return <><IcfesJsonLd name="Cuadernillos de Inglés divulgados por el ICFES" description="Catálogo histórico por audiencia, con modo examen y práctica guiada cuando el estímulo completo está disponible." url={CANONICAL} currentLabel="Cuadernillos" /><ExamenesClient /></>;
}
