import type { Metadata } from 'next';
import IcfesAdaptiveGame from './IcfesAdaptiveGame';

export const metadata: Metadata = {
  title: 'Práctica ICFES Inglés — Juego adaptativo | Idiomas WeLearn',
  description:
    'Practica el componente de inglés del ICFES Saber 11 con un juego adaptativo de 4 niveles. El sistema detecta tus puntos débiles y te da más práctica donde más la necesitas.',
  alternates: { canonical: 'https://idiomaswl.com/practica/icfes-saber-11' },
};

export default function Page() {
  return <IcfesAdaptiveGame />;
}
