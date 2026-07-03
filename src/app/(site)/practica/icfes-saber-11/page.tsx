import type { Metadata } from 'next';
import IcfesHubClient from './IcfesHubClient';

export const metadata: Metadata = {
  title: 'Práctica ICFES Inglés — Ruta inteligente + Simulacros | Idiomas WeLearn',
  description:
    'Practica el componente de inglés del ICFES Saber 11 con diagnóstico adaptativo, ruta inteligente por niveles, juego rápido y simulacros de cuadernillos oficiales.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/icfes-saber-11' },
};

export default function Page() {
  return <IcfesHubClient />;
}
