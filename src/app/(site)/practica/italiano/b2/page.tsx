import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Italiano B2 — Esercizi integrati | Idiomas WeLearn',
  description: 'Italiano B2: práctica integrada con lectura, escucha, preguntas de comprensión y escritura argumentativa.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/b2' },
};

const COLOR = '#009246';

const HABILIDADES = [
  {
    id: 'integrado',
    emoji: '🧩',
    name: 'Esercizio integrato',
    eng: 'Reading + Listening + Writing',
    desc: 'Simulacro integrado B2 sobre ciudadanía, juramento de fidelidad y doble nacionalidad. Lee, escucha, responde y escribe una opinión breve.',
    count: '1 simulacro · 6 preguntas + writing',
    href: '/practica/italiano/b2/integrato/oath-of-allegiance',
    available: true,
  },
  {
    id: 'lectura',
    emoji: '📖',
    name: 'Lettura',
    eng: 'Lectura',
    desc: 'Textos argumentativos B2 con inferencia, postura del autor y vocabulario institucional.',
    count: 'Próximamente',
    href: '#',
    available: false,
  },
  {
    id: 'gramatica',
    emoji: '📐',
    name: 'Grammatica',
    eng: 'Gramática',
    desc: 'Congiuntivo, periodo ipotetico, connettivi argomentativi y estilo indirecto.',
    count: 'Próximamente',
    href: '#',
    available: false,
  },
  {
    id: 'ascolto',
    emoji: '🎧',
    name: 'Ascolto',
    eng: 'Escucha',
    desc: 'Audios B2 con opiniones contrastadas, tesis, concesiones y conclusiones.',
    count: 'Próximamente',
    href: '#',
    available: false,
  },
  {
    id: 'scrittura',
    emoji: '✍️',
    name: 'Scrittura',
    eng: 'Escritura',
    desc: 'Ensayos breves con tesis, argumentos, contraargumento y conectores de nivel B2.',
    count: 'Próximamente',
    href: '#',
    available: false,
  },
];

const COLORS: Record<string, string> = {
  integrado: '#009246',
  lectura: '#0369a1',
  gramatica: '#7c3aed',
  ascolto: '#d97706',
  scrittura: '#059669',
};

export default function ItalianoB2Page() {
  return (
    <>
      <CourseSchema
        name="Italiano B2 — Ejercicios integrados"
        description="Practica Italiano B2 con lectura, escucha, comprensión y escritura argumentativa."
        url="https://www.idiomaswl.com/practica/italiano/b2"
        educationalLevel="B2"
        teaches="Italiano B2, lectura, escucha, escritura, ciudadanía"
        inLanguage="it"
      />
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/italiano" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>B2</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>B2</div>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Italiano B2 — Intermedio alto</p>
              <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Scegli un&apos;abilità</h1>
            </div>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 620, margin: '0.5rem 0 2rem' }}>
            Práctica de nivel B2 con tareas integradas: texto académico breve, audio con postura contraria, preguntas de comprensión y escritura argumentativa.
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
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
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

          <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,146,70,0.06)', border: '1px solid rgba(0,146,70,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            💡 <strong style={{ color: 'var(--ink)' }}>Consiglio:</strong> empieza por el <strong style={{ color: COLOR }}>Esercizio integrato</strong>. Es el formato más completo para entrenar comprensión, postura crítica y producción escrita en una sola sesión.
          </div>
        </div>
      </section>
    </>
  );
}

