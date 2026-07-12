import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';

export const metadata: Metadata = {
  title: 'Alemán B1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Alemán B1: Konjunktiv II, Relativsätze, Passiv, temporale Konjunktionen e Indirekte Rede. 6 habilidades interactivas.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/b1' },
};

const COLOR = '#dd0000';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lesen', eng: 'Lectura', desc: '5 Texte B1 (120-150 Wörter): Alltag, Kultur, Umwelt. Konjunktiv II y Passiv en contexto.', count: '5 Texte · 30 Fragen', href: '/practica/aleman/b1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammatik', eng: 'Gramática', desc: 'Konjunktiv II, Passiv, Relativsätze, Partizip, Reflexivverben, Wortbildung y más.', count: '20 Themen · 120+ Übungen', href: '/practica/aleman/b1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Schreiben', eng: 'Escritura', desc: '5 Aufgaben B1: formelle Briefe, Meinungsaufsätze, Vergleiche.', count: '5 geleitete Aufgaben', href: '/practica/aleman/b1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Sprechen', eng: 'Expresión oral', desc: '20 Ausdrücke B1 für Diskussionen, Meinungen y formelle Gespräche.', count: '20 wesentliche Ausdrücke', href: '/practica/aleman/b1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vokabular', eng: 'Vocabulario', desc: '8 Themenbereiche × 10 Wörter. Lernkarten, MCQ y Schreiben.', count: '8 Sets · 80+ Wörter', href: '/practica/aleman/b1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Hören', eng: 'Escucha', desc: '3 Dialoge B1 mit Skripten. Audio in Vorbereitung.', count: '3 Dialoge bald verfügbar', href: '/practica/aleman/b1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#dd0000', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function AlemanB1Page() {
  return (
    <>
    <CourseSchema
      name="Alemán B1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Alemán nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://idiomaswl.com/practica/aleman/b1"
      educationalLevel="B1"
      teaches="Alemán, habilidades MCER"
      inLanguage="al"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Alemán</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>B1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>B1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Alemán B1 — Mittelstufe</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 1rem' }}>
          Seis habilidades para el alemán intermedio. Practica Konjunktiv II, Relativsätze y Passiv.
        </p>
        <div style={{ padding: '0.75rem 1rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          💡 Empieza con <strong style={{ color: 'var(--ink)' }}>Grammatik</strong> para dominar el Konjunktiv II, luego practica en <strong style={{ color: 'var(--ink)' }}>Lesen</strong> y <strong style={{ color: 'var(--ink)' }}>Schreiben</strong>.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {HABILIDADES.map(h => {
            const c = COLORS[h.id] ?? COLOR;
            return (
              <Link key={h.id} href={h.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ padding: '1.4rem 1.5rem', border: `1.5px solid ${c}33`, borderRadius: 18, background: `linear-gradient(135deg, ${c}0a 0%, transparent 100%)`, borderTop: `3px solid ${c}`, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{h.emoji}</span>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>{h.name}</div>
                      <div style={{ fontSize: '0.72rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.eng}</div>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55, flex: 1 }}>{h.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700 }}>{h.count}</span>
                    <span style={{ fontSize: '1rem', color: c, fontWeight: 700 }}>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="alemán"
      color="#dd0000"
      msg="Hola, estoy practicando alemán B1 en WeLearn y me gustaría agendar una clase."
    />
    </>
  );
}
