import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inglés B2 — Elige una habilidad | Idiomas WeLearn',
  description: 'Inglés B2: Use of English (Multiple Choice Cloze + Word Formation), Reading, Writing y más. Preparación FCE Cambridge y ICFES Saber 11.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b2' },
};

const COLOR = '#0066cc';

const HABILIDADES = [
  {
    id: 'uso-del-idioma', emoji: '🔤', name: 'Use of English', eng: 'Grammar & Vocab',
    desc: 'Multiple Choice Cloze (FCE Part 1 / ICFES) + Word Formation (FCE Part 3). 3 textos de cloze + 2 pasajes de formación de palabras.',
    count: '5 textos · 40 ejercicios', href: '/practica/ingles/b2/uso-del-idioma', available: true,
  },
  {
    id: 'reading', emoji: '📖', name: 'Reading', eng: 'Comprensión lectora',
    desc: 'Textos B2 con preguntas de comprensión, inferencia y vocabulario en contexto. Próximamente.',
    count: 'Próximamente', href: '#', available: false,
  },
  {
    id: 'writing', emoji: '✍️', name: 'Writing', eng: 'Escritura',
    desc: 'Essays, reports y formal letters al estilo FCE con criterios de evaluación y modelo. Próximamente.',
    count: 'Próximamente', href: '#', available: false,
  },
  {
    id: 'listening', emoji: '🎧', name: 'Listening', eng: 'Comprensión auditiva',
    desc: 'Multiple matching, sentence completion y multiple choice al estilo FCE. Próximamente.',
    count: 'Próximamente', href: '#', available: false,
  },
  {
    id: 'conectores', emoji: '🎯', name: 'Quest: Conectores', eng: 'Advanced Connectors',
    desc: 'Domina moreover, nevertheless, consequently, provided that, despite y más con 6 niveles progresivos.',
    count: '6 niveles · 48 ejercicios', href: '/practica/ingles/b2/conectores', available: true,
  },
];

const COLORS: Record<string, string> = {
  'uso-del-idioma': '#0369a1', reading: '#7c3aed', writing: '#059669', listening: '#d97706', conectores: '#cf142b',
};

export default function InglesB2Page() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>B2</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>B2</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Inglés B2 — Intermedio alto</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2rem' }}>
          Preparación para FCE Cambridge (B2) e ICFES Saber 11. Ejercicios enfocados en las secciones donde más se necesita práctica.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {HABILIDADES.map(h => {
            const c = COLORS[h.id] ?? COLOR;
            const card = (
              <div style={{
                padding: '1.4rem 1.5rem',
                border: `1.5px solid ${h.available ? `${c}33` : 'var(--line-soft)'}`,
                borderRadius: 18,
                background: h.available ? `linear-gradient(135deg, ${c}0a 0%, transparent 100%)` : 'var(--bg)',
                borderTop: h.available ? `3px solid ${c}` : undefined,
                height: '100%', boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                opacity: h.available ? 1 : 0.55,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{h.emoji}</span>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>{h.name}</div>
                    <div style={{ fontSize: '0.72rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.eng}</div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55, flex: 1 }}>{h.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.7rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700 }}>{h.count}</span>
                  {h.available && <span style={{ fontSize: '1rem', color: c, fontWeight: 700 }}>→</span>}
                </div>
              </div>
            );
            return h.available
              ? <Link key={h.id} href={h.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>{card}</Link>
              : <div key={h.id}>{card}</div>;
          })}
        </div>

        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(3,105,161,0.06)', border: '1px solid rgba(3,105,161,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consejo:</strong> Empieza por <strong style={{ color: '#0369a1' }}>Use of English</strong> — es la sección donde más estudiantes pierden puntos en el FCE y en el ICFES. Los errores en cloze y formación de palabras son los más sistemáticos y los más fáciles de corregir con práctica dirigida.
        </div>
      </div>
    </section>
  );
}
