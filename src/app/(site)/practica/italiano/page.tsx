import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Práctica de Italiano — Elige tu nivel MCER',
  description: 'Ejercicios interactivos de italiano por nivel MCER. A1, A2, B1 y práctica integrada B2 con lectura, gramática, escucha y escritura.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano' },
};

const COLOR = '#009246';

const NIVELES = [
  {
    nivel: 'A1', name: 'Principiante',
    desc: 'Artículos, essere/avere, verbos regulares, vocabulario cotidiano y frases de supervivencia.',
    href: '/practica/italiano/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  {
    nivel: 'A2', name: 'Elementare',
    desc: 'Passato prossimo, imperfetto, futuro semplice, pronomi diretti/indiretti e comparativi.',
    href: '/practica/italiano/a2', available: true,
    count: '6 habilidades · 50+ ejercicios',
  },
  {
    nivel: 'B1', name: 'Intermedio',
    desc: 'Congiuntivo, condizionale, particelle pronominali, lettura, scrittura, ascolto e vocabolario.',
    href: '/practica/italiano/b1', available: true,
    count: '7 percorsi · 230+ esercizi',
  },
  {
    nivel: 'B2', name: 'Intermedio alto',
    desc: 'Ejercicios integrados estilo TOEFL/IELTS: lectura, escucha, comprensión y escritura argumentativa.',
    href: '/practica/italiano/b2', available: true,
    count: '1 ejercicio integrado',
  },
  { nivel: 'C1', name: 'Avanzato', desc: 'Grammatica complessa, collocazioni, scrittura avanzata e livello CILS C1.', available: false },
];

export default function ItalianoPage() {
  return (
    <>
    <CourseSchema
      name="Práctica de Italiano — Ejercicios interactivos MCER"
      description="Ejercicios de italiano por nivel MCER: A1, A2, B1 y práctica integrada B2. Vocabulario, gramática, lectura, escucha y escritura."
      url="https://www.idiomaswl.com/practica/italiano"
      educationalLevel="A1, A2, B1, B2"
      teaches="Italiano, CILS, CELI"
      inLanguage="it"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 840 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>🇮🇹 Italiano</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🇮🇹 Italiano</p>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Scegli il tuo livello</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 520, margin: '0 0 2.25rem' }}>
          Ejercicios organizados por nivel MCER. Empieza en A1, avanza por A2 y B1 con gramática guiada o salta a los integrados B2.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {NIVELES.map(n => {
            const inner = (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem',
                padding: '1.2rem 1.5rem',
                border: `1.5px solid ${n.available ? 'rgba(0,146,70,0.28)' : 'var(--line-soft)'}`,
                borderRadius: 16,
                background: n.available ? 'linear-gradient(135deg, rgba(0,146,70,0.06) 0%, transparent 100%)' : 'var(--bg)',
                opacity: n.available ? 1 : 0.55,
              }}>
                <div style={{ width: 58, height: 58, borderRadius: 14, flexShrink: 0, background: n.available ? COLOR : 'var(--line-soft)', color: n.available ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--mono)' }}>{n.nivel}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{n.nivel} — {n.name}</span>
                    {n.available
                      ? <span style={{ fontSize: '0.6rem', fontWeight: 800, background: COLOR, color: '#fff', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>DISPONIBILE</span>
                      : <span style={{ fontSize: '0.6rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PROSSIMAMENTE</span>
                    }
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{n.desc}</p>
                  {'count' in n && n.available && (
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.73rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{(n as { count: string }).count}</p>
                  )}
                </div>
                {n.available && <span style={{ fontSize: '1.2rem', color: COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>}
              </div>
            );
            return n.available && n.href
              ? <Link key={n.nivel} href={n.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>{inner}</Link>
              : <div key={n.nivel}>{inner}</div>;
          })}
        </div>

        <Link href="/practica/italiano/tiempos-verbales" style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginTop: '1.75rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1.25rem',
            padding: '1.2rem 1.5rem',
            border: `1.5px solid ${COLOR}55`,
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(0,146,70,0.1) 0%, transparent 100%)',
          }}>
            <div style={{ width: 58, height: 58, borderRadius: 14, flexShrink: 0, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>⏱️</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>Tiempos Verbales — Modo en Vivo</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 800, background: COLOR, color: '#fff', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>GUIADO EN CLASE</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>50 oraciones del español al italiano, de A1 a C2, sin pistas y contra el tiempo. Sin corrección automática — se revisa en vivo con el profesor.</p>
            </div>
            <span style={{ fontSize: '1.2rem', color: COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
          </div>
        </Link>
      </div>
    </section>
    </>
  );
}
