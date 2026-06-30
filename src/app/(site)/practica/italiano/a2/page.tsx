import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';

export const metadata: Metadata = {
  title: 'Italiano A2 — Elige una habilidad | Idiomas WeLearn',
  description: 'Italiano A2: passato prossimo, imperfetto, futuro semplice, pronomi e comparativi. Lectura, gramática, vocabulario, escritura, habla y escucha.',
  alternates: { canonical: 'https://idiomaswl.com/practica/italiano/a2' },
};

const COLOR = '#009246';

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Lettura',
    desc: '5 testi A2 (80-120 palabras): viajes, trabajo, ciudad, amigos. Vocabulario clickeable, 6 domande per testo.',
    count: '5 testi · 30 domande', href: '/practica/italiano/a2/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammatica',
    desc: 'Passato prossimo (essere/avere), imperfetto, futuro semplice, pronomi diretti/indiretti e comparativi.',
    count: '5 temi · 50+ esercizi', href: '/practica/italiano/a2/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Scrittura',
    desc: '5 compiti guidati A2 con modello e checklist di revisione: email, racconto, descrizione.',
    count: '5 prompts guiados', href: '/practica/italiano/a2/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Parlato',
    desc: '20 frasi A2 con contesto situazionale, pronuncia e varianti formale/informale.',
    count: '20 frasi essenziali', href: '/practica/italiano/a2/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabolario',
    desc: '8 set tematici × 10 parole. 3 modalità: flashcard, scelta multipla e scrittura.',
    count: '8 set · 80+ parole', href: '/practica/italiano/a2/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Ascolto',
    desc: '3 dialoghi A2 completi con script. Audio in preparazione.',
    count: '3 dialoghi prossimamente', href: '/practica/italiano/a2/escucha', available: true,
  },
];

const COLORS: Record<string, string> = {
  lectura: '#009246', gramatica: '#7c3aed', escritura: '#059669',
  habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1',
};

export default function ItalianoA2Page() {
  return (
    <>
    <CourseSchema
      name="Italiano A2 — Lectura, Gramática, Vocabulario y más"
      description="Practica Italiano nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://idiomaswl.com/practica/italiano/a2"
      educationalLevel="A2"
      teaches="Italiano, habilidades MCER"
      inLanguage="it"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A2</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A2</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Italiano A2 — Elementare</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Sei abilità per consolidare l&apos;italiano elementare. Practica passato prossimo, imperfetto, futuro semplice e pronomi.
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
                transition: 'box-shadow 0.18s, border-color 0.18s',
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
                  <span style={{ fontSize: '1rem', color: c, fontWeight: 700 }}>→</span>
                </div>
              </div>
            );
            return (
              <Link key={h.id} href={h.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {card}
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,146,70,0.06)', border: '1px solid rgba(0,146,70,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consiglio:</strong> Inizia con <strong style={{ color: '#7c3aed' }}>Gramática</strong> per padroneggiare il passato prossimo, poi esercitati con <strong style={{ color: COLOR }}>Lettura</strong> usando testi autentici.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="italiano"
      color="#009246"
      msg="Hola, estoy practicando italiano A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
    />
    </>
  );
}
