import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

export const metadata: Metadata = {
  title: 'Inglés B1 — Elige una habilidad',
  description: 'Inglés B1: present perfect, past continuous, condicionales y voz pasiva. Lectura, gramática, escritura, habla, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b1' },
};

const COLOR = '#0066cc';

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Reading',
    desc: '10 lecturas B1 con audio narrado: noticias, cultura, ciencia. Present perfect y condicionales.',
    count: '10 lecturas · con audio', href: '/practica/ingles/b1/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammar',
    desc: 'Present Perfect, Past Continuous, First/Second Conditional y Passive Voice. 10 ejercicios por tema.',
    count: '5 temas · 50+ ejercicios', href: '/practica/ingles/b1/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Writing',
    desc: '5 tareas B1: ensayos de opinión, cartas formales, descripciones comparativas.',
    count: '5 prompts guiados', href: '/practica/ingles/b1/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Speaking',
    desc: '20 frases B1 con registros formal e informal, para debates y discusiones.',
    count: '20 frases esenciales', href: '/practica/ingles/b1/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulary',
    desc: '8 sets temáticos × 10 palabras. Modos: flashcard, MCQ y escribir.',
    count: '8 sets · 80+ palabras', href: '/practica/ingles/b1/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Listening',
    ...listeningCard('ingles', 'b1', '«The Door Stays Open»: el edificio del café sale a la venta y Maya tiene una semana para reunir una oferta imposible.'),
    href: '/practica/ingles/b1/escucha', available: true,
  },
  {
    id: 'conjunciones', emoji: '🎯', name: 'Quest: Conjunciones', eng: 'Conjunctions Quest',
    desc: 'Domina and/but/although/when/if/however con 6 niveles progresivos: selección, escritura libre y sprint.',
    count: '6 niveles · 48 ejercicios', href: '/practica/ingles/b1/conjunciones', available: true,
  },
];

const COLORS: Record<string, string> = {
  lectura: '#0066cc', gramatica: '#7c3aed', escritura: '#059669',
  habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1',
  conjunciones: '#0066cc',
};

export default function InglesB1Page() {
  return (
    <>
    <CourseSchema
      name="Inglés B1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Inglés nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://www.idiomaswl.com/practica/ingles/b1"
      educationalLevel="B1"
      teaches="Inglés, habilidades MCER"
      inLanguage="in"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>B1</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>B1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Inglés B1 — Intermedio</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para consolidar el inglés intermedio. Practica present perfect, condicionales y voz pasiva.
        </p>

        {/* Habilidad grid */}
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

        {/* Tip */}
        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,102,204,0.06)', border: '1px solid rgba(0,102,204,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consejo:</strong> Empieza por <strong style={{ color: 'var(--wl-on-panel-purple, #7c3aed)' }}>Gramática</strong> para dominar el Present Perfect, luego aplícalo en <strong style={{ color: COLOR }}>Lectura</strong> y <strong style={{ color: 'var(--wl-on-panel-ok, #059669)' }}>Escritura</strong>.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="inglés"
      color="#0066cc"
      msg="Hola, estoy practicando inglés B1 en WeLearn y me gustaría agendar una clase."
    />
    </>
  );
}
