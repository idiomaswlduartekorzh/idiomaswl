import type { Metadata } from 'next';
import Link from 'next/link';
import IcfesAdaptiveGame from './IcfesAdaptiveGame';

export const metadata: Metadata = {
  title: 'Práctica ICFES Inglés — Juego adaptativo + Simulacros | Idiomas WeLearn',
  description:
    'Practica el componente de inglés del ICFES Saber 11 con un juego adaptativo de 4 niveles o con simulacros de cuadernillos oficiales (2019, 2022, 2023).',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/icfes-saber-11' },
};

export default function Page() {
  return (
    <>
      {/* Simulacros banner */}
      <div style={{ background: 'rgba(220,38,38,0.06)', borderBottom: '1px solid rgba(220,38,38,0.15)', padding: '0.65rem 1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.83rem', color: 'var(--ink)' }}>
          ¿Quieres practicar con el examen real? →{' '}
        </span>
        <Link
          href="/practica/icfes-saber-11/examenes"
          style={{ fontSize: '0.83rem', fontWeight: 700, color: '#dc2626', textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          Simulacros con cuadernillos oficiales ICFES (2019, 2022, 2023)
        </Link>
      </div>
      <IcfesAdaptiveGame />
    </>
  );
}
