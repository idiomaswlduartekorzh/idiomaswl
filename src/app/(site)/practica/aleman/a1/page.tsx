import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Alemán A1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Alemán A1: Lesen, Grammatik (Artikel, sein, Pronomen), Schreiben, Sprechen, Vokabular und Hören.',
  alternates: { canonical: 'https://idiomaswl.com/practica/aleman/a1' },
};

const COLOR = '#dd0000';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lesen', eng: 'Lectura', desc: '5 Texte A1: Anna in Berlin, die Familie, das Haus, das Essen, die Schule. Jedes Wort klickbar.', count: '5 Texte · 25 Fragen', href: '/practica/aleman/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammatik', eng: 'Gramática', desc: 'Los 15 temas del A1: artículos (der/die/das), kein, plural, sein/haben, orden de palabras (verbo en 2), acusativo, modales, verbos separables, es gibt y más. Con explicación, tablas y contraste español→alemán.', count: '15 temas · 200+ ejercicios', href: '/practica/aleman/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Schreiben', eng: 'Escritura', desc: '5 geführte Schreibaufgaben: sich vorstellen, Familie, Wohnung, Aktivitäten, Vorlieben.', count: '5 geführte Aufgaben', href: '/practica/aleman/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Sprechen', eng: 'Expresión oral', desc: '15 Überlebensphrasen auf Deutsch mit detaillierter Aussprache für spanischsprachige Lerner.', count: '15 Grundphrasen', href: '/practica/aleman/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vokabular', eng: 'Vocabulario', desc: '6 Themensets: Familie, Farben, Essen, Wochentage, Körper, Zahlen. Lernkarten + 3 Modi.', count: '6 Sets · 60+ Wörter', href: '/practica/aleman/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Hören', eng: 'Escucha', desc: '3 Hörverstehen-Übungen A1. Audios mit nativer deutscher Stimme in Vorbereitung.', count: '3 Audios demnächst', href: '/practica/aleman/a1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#dd0000', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function AlemanA1Page() {
  return (
    <>
    <CourseSchema
      name="Alemán A1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Alemán nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://idiomaswl.com/practica/aleman/a1"
      educationalLevel="A1"
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
          <span style={{ color: COLOR, fontWeight: 800 }}>A1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Alemán A1 — Anfänger</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Sechs Fertigkeiten für ein solides Deutsch von Grund auf. Übe sie in beliebiger Reihenfolge.
        </p>
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
    </>
  );
}
