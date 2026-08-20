import Link from 'next/link';
import { SAT_GUIDES, SAT_GUIDE_GROUPS } from '@/data/satGuides';

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
    <section style={{ padding: '3rem 1.25rem 1rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3.4vw, 1.9rem)', fontWeight: 900, letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>
          La guía completa del SAT, en español
        </h2>
        <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--muted)', marginBottom: '2rem', maxWidth: 620 }}>
          Nueve páginas escritas para quien presenta el SAT desde Latinoamérica. Lo que casi
          todo lo demás explica en inglés: no solo qué preguntan, sino cómo se responde.
        </p>

        {SAT_GUIDE_GROUPS.map(grupo => {
          const paginas = SAT_GUIDES.filter(g => g.group === grupo.key);
          if (!paginas.length) return null;
          return (
            <div key={grupo.key} style={{ marginBottom: '2.25rem' }}>
              <h3 style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: 4 }}>
                {grupo.label}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.9rem', lineHeight: 1.5 }}>
                {grupo.note}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: '0.7rem' }}>
                {paginas.map(g => (
                  <Link
                    key={g.slug}
                    href={`/examenes/sat/guia/${g.slug}`}
                    style={{
                      display: 'block', padding: '0.95rem 1.1rem', borderRadius: 10,
                      border: '1px solid var(--line-soft)', background: 'var(--bg-2)',
                      textDecoration: 'none', borderLeft: `3px solid ${accent}`,
                    }}
                  >
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--ink)', marginBottom: 3, lineHeight: 1.3 }}>
                      {g.h1}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.45 }}>
                      {g.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
