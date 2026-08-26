import Link from 'next/link';
import type { CSSProperties } from 'react';
import { SAT_GUIDES, SAT_GUIDE_GROUPS } from '@/data/satGuides';
import { SAT_MARCA } from '@/data/sat-marca';

/**
 * El índice del superhub, en el hub.
 *
 * Por qué existe. Las nueve páginas de `/examenes/sat/guia/` estaban en el sitemap y
 * enlazadas entre ellas, pero desde `/examenes/sat` solo se llegaba a una — la madre—
 * y como una tarjeta más entre enlaces a otros exámenes. Un clúster al que solo se
 * entra por el sitemap es una lista de URLs, no un hub: ni el lector lo recorre ni el
 * rastreador reparte autoridad por él.
 *
 * Se pinta agrupado y no como una lista de nueve porque nueve tarjetas seguidas se
 * leen como enlaces sueltos; agrupadas se leen como un temario, que es lo que son.
 */
export default function ExamCluster({ accent }: { accent: string }) {
  return (
    <section className="wl-exam-cluster" style={{ '--cluster-accent': accent } as CSSProperties}>
      <div className="wrap wl-hub-panel">
        <header className="wl-hub-heading">
          <p className="eyebrow"><span className="ink-line" aria-hidden="true" />Ruta de preparación</p>
          <h2>La guía completa del SAT, en español</h2>
          <p>Diez páginas para quien presenta el SAT desde Latinoamérica: no solo qué preguntan, sino cómo se responde.</p>
        </header>

        <div className="wl-exam-cluster__stats">
          {[
            ['10', 'guías en español'],
            ['54', 'preguntas adaptativas'],
            ['64 min', 'tiempo de práctica'],
            ['4', 'dominios explicados'],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {SAT_GUIDE_GROUPS.map(grupo => {
          const paginas = SAT_GUIDES.filter(g => g.group === grupo.key);
          if (!paginas.length) return null;
          return (
            <section key={grupo.key} className="wl-exam-cluster__group">
              <h3>{grupo.label}</h3>
              <p>{grupo.note}</p>
              <div>
                {paginas.map(g => (
                  <Link key={g.slug} href={`/examenes/sat/guia/${g.slug}`}>
                    <strong>{g.h1}</strong>
                    <span>{g.description}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <p className="wl-exam-cluster__mark">{SAT_MARCA}</p>
      </div>
    </section>
  );
}
