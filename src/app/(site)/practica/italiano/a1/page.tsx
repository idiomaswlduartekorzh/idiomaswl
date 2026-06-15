import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Italiano A1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Italiano A1: lectura con textos cortos, gramática (artículos, essere, avere, verbos), escritura guiada, expresión oral y vocabulario temático.',
  alternates: { canonical: 'https://idiomaswl.com/practica/italiano/a1' },
};

const COLOR = '#009246';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lettura', eng: 'Lectura', desc: '5 textos A1 con vocabulario clickeable. La vita di Sofia, la famiglia, la casa, il cibo, la scuola.', count: '5 textos · 25 preguntas', href: '/practica/italiano/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammatica', eng: 'Gramática', desc: 'Artículos (il/lo/la/i/gli/le), essere e avere, verbos -are/-ere/-ire, aggettivi, c\'è/ci sono.', count: '5 temas · 40+ ejercicios', href: '/practica/italiano/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Scrittura', eng: 'Escritura', desc: '5 tareas guiadas con modelo: presentarsi, descrivere la famiglia, la casa, le attività e i gusti.', count: '5 prompts guiados', href: '/practica/italiano/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Espressione orale', eng: 'Expresión oral', desc: '12 frases de supervivencia en italiano con pronunciación detallada para hispanohablantes.', count: '12 frases esenciales', href: '/practica/italiano/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabolario', eng: 'Vocabulario', desc: '6 sets temáticos: la famiglia, i colori, il cibo, i giorni, il corpo, i numeri.', count: '6 sets · 60+ palabras', href: '/practica/italiano/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Ascolto', eng: 'Escucha', desc: '3 ejercicios de comprensión auditiva A1. Audios de voz nativa italiana en preparación.', count: '3 audios próximamente', href: '/practica/italiano/a1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#009246', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function ItalianoA1Page() {
  return (
    <>
    <CourseSchema
      name="Italiano A1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Italiano nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://idiomaswl.com/practica/italiano/a1"
      educationalLevel="A1"
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
          <span style={{ color: COLOR, fontWeight: 800 }}>A1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Italiano A1 — Principiante</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Scegli un&apos;abilità</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Sei abilità per un italiano solido da zero. Puoi praticarle in qualsiasi ordine.
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
        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,146,70,0.06)', border: '1px solid rgba(0,146,70,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consiglio:</strong> Inizia con <strong style={{ color: COLOR }}>Lettura</strong> per attivare il vocabolario, poi rafforza con <strong style={{ color: '#7c3aed' }}>Grammatica</strong>. Le flashcard di <strong style={{ color: '#e11d48' }}>Vocabolario</strong> consolidano quello che hai letto.
        </div>
      </div>
    </section>
    </>
  );
}
