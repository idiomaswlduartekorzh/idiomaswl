import type { Metadata } from 'next';
import ExamenesClient from './ExamenesClient';
import IcfesJsonLd from '../_components/IcfesJsonLd';

const CANONICAL = 'https://www.idiomaswl.com/practica/icfes-saber-11/examenes';

export const metadata: Metadata = {
  title: 'Muestras históricas ICFES Inglés: catálogo atribuido',
  description:
    'Consulta 10 bancos históricos atribuidos a material ICFES, separados por audiencia. Cinco tienen guía; la procedencia por ítem aún debe cotejarse.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Muestras históricas ICFES Inglés por año', description: '10 bancos atribuidos y no cotejados, separados por audiencia; 145 preguntas explicadas en cinco recorridos guiados gratuitos.', url: CANONICAL, type: 'website' },
};

export default function Page() {
  return <><IcfesJsonLd name="Muestras históricas atribuidas a material ICFES" description="Banco local por audiencia, pendiente de cotejo primario por ítem, con modo examen y práctica guiada cuando el estímulo completo está disponible." url={CANONICAL} currentLabel="Muestras históricas" /><ExamenesClient /></>;
}
