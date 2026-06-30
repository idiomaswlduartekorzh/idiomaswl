import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';

export const metadata: Metadata = {
  title: 'Francés A1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Francés A1: lectura, gramática (articles, être, avoir), escritura, expresión oral, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/frances/a1' },
};

const COLOR = '#003189';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lecture', eng: 'Lectura', desc: '5 textos A1 con vocabulario clickeable. Sophie à Paris, la famille, la maison, les repas, l\'école.', count: '5 textos · 25 preguntas', href: '/practica/frances/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammaire', eng: 'Gramática', desc: 'Los 15 temas del A1: artículos, être, avoir, verbos -ER, negación, partitivos, posesivos, futuro próximo y más. Cada tema con explicación, tablas, contraste español→francés y ejercicios.', count: '15 temas · 200+ ejercicios', href: '/practica/frances/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Écriture', eng: 'Escritura', desc: '5 tareas guiadas con modelo: presentarse, describir la familia, la casa, las actividades y los gustos.', count: '5 prompts guiados', href: '/practica/frances/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expression orale', eng: 'Expresión oral', desc: '15 frases de supervivencia en francés con pronunciación detallada para hispanohablantes.', count: '15 frases esenciales', href: '/practica/frances/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulaire', eng: 'Vocabulario', desc: '6 sets temáticos: la famille, les couleurs, la nourriture, les jours, le corps, les chiffres.', count: '6 sets · 60+ palabras', href: '/practica/frances/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Compréhension orale', eng: 'Escucha', desc: '3 ejercicios de comprensión auditiva A1. Audios de voz nativa francesa en preparación.', count: '3 audios próximamente', href: '/practica/frances/a1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#003189', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function FrancesA1Page() {
  return (
    <>
    <CourseSchema
      name="Francés A1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Francés nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://www.idiomaswl.com/practica/frances/a1"
      educationalLevel="A1"
      teaches="Francés, habilidades MCER"
      inLanguage="fr"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 Francés</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Francés A1 — Débutant</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Six compétences pour un français solide depuis zéro. Tu peux les pratiquer dans n&apos;importe quel ordre.
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
        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,49,137,0.06)', border: '1px solid rgba(0,49,137,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Conseil:</strong> Commence par <strong style={{ color: COLOR }}>Lecture</strong> pour activer le vocabulaire, puis renforce avec <strong style={{ color: '#7c3aed' }}>Grammaire</strong>. Les <strong style={{ color: '#e11d48' }}>flashcards Vocabulaire</strong> consolident ce que tu as lu.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="francés"
      color="#003189"
      msg="Hola, estoy practicando francés en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
    />
    </>
  );
}
