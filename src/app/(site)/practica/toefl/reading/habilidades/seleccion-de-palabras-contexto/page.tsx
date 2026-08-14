import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { TOEFL_COMPLETE_WORDS_ITEMS } from '@/data/practica-exams/seo-catalog';

const ITEMS = TOEFL_COMPLETE_WORDS_ITEMS;

export const metadata: Metadata = {
  title: 'Selección de palabras por contexto — TOEFL Reading',
  description: 'Práctica complementaria WeLearn de vocabulario y selección de palabras por contexto con 16 ejercicios explicados.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <section className="wl-section">
      <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
        <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}><span className="ink-line" />TOEFL Reading · Habilidad complementaria</p>
        <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, margin: '0 0 0.85rem' }}>
          Selección de palabras por contexto
        </h1>
        <p style={{ color: 'var(--muted)', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 780 }}>
          Estos 16 ejercicios de opción múltiple entrenan categoría gramatical, pista semántica y colocación. Son una práctica complementaria creada por WeLearn; no son la interacción Complete the Words del formato actual.
        </p>

        <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem' }}>Banco conservado: completa cada oración</h2>
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {ITEMS.map((item, index) => (
              <article key={item.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                <p style={{ margin: '0 0 0.35rem', color: '#1a4fcc', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>Ítem {index + 1}</p>
                <h3 style={{ margin: '0 0 0.65rem', fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.5 }}>{item.sentence}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.options.map((option, optionIndex) => (
                    <span key={option} style={{ border: '1px solid var(--line-soft)', borderRadius: 999, padding: '0.4rem 0.65rem', color: optionIndex === item.answer ? '#047857' : 'var(--muted)', background: optionIndex === item.answer ? 'rgba(5,150,105,0.1)' : 'var(--bg)' }}>
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.6rem', alignItems: 'start', marginTop: '.7rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#047857', marginTop: 2 }} />
                  <div>
                    <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{item.explanation}</p>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {item.trap}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Link href="/practica/toefl/reading/formato-2026/complete-the-words" className="btn">Volver a Complete the Words</Link>
      </div>
    </section>
  );
}
