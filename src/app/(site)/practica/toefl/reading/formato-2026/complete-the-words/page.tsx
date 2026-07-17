import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, XCircle } from 'lucide-react';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  PRACTICE_BASE_URL,
  TOEFL_COMPLETE_WORDS_ITEMS,
  TOEFL_READING_CURRENT_FORMAT,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_READING_CURRENT_FORMAT.find((item) => item.slug === 'complete-the-words')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const ETS_TEST_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

const ITEMS = TOEFL_COMPLETE_WORDS_ITEMS;

export const metadata: Metadata = {
  title: 'TOEFL Complete the Words: práctica y respuestas',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Complete the Words',
    description: ROUTE.description,
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name={ROUTE.title}
        url={URL}
        description={ROUTE.description}
        teaches={ROUTE.teaches}
        isPartOf={{ name: 'TOEFL Reading formato actual', url: `${PRACTICE_BASE_URL}/practica/toefl/reading/formato-2026` }}
      />
      <FaqJsonLd faqs={ROUTE.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/toefl/reading` },
          { name: 'Formato actual', url: `${PRACTICE_BASE_URL}/practica/toefl/reading/formato-2026` },
          { name: 'Complete the Words', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/toefl/reading/formato-2026" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Formato actual</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Complete the Words</span>
          </div>

          <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}><span className="ink-line" />TOEFL Reading · Formato actual</p>
          <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
            Complete the Words: elige la palabra que encaja en contexto
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 760 }}>
            Esta tarea mide si puedes usar pistas de contexto y forma gramatical para completar una frase. No se resuelve traduciendo una palabra aislada.
          </p>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Respuesta directa:</strong> lee toda la oración, decide qué tipo de palabra falta y elige la opción que conserva la lógica local. Si una opción suena bien pero rompe causa, contraste o colocación, descártala.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS lista Complete the Words como una de las familias actuales de TOEFL Reading.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos tres filtros: categoría gramatical, pista semántica y colocación natural.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TEST_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica guiada</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Banco inicial: completa cada oración</h2>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {ITEMS.map((item, index) => (
                <article key={item.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>Ítem {index + 1}</p>
                  <h3 style={{ margin: '0 0 0.65rem', fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.5 }}>{item.sentence}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {item.options.map((option, optionIndex) => (
                      <span key={option} style={{ border: '1px solid var(--line-soft)', borderRadius: 999, padding: '0.4rem 0.65rem', color: optionIndex === item.answer ? '#047857' : 'var(--muted)', background: optionIndex === item.answer ? 'rgba(5,150,105,0.1)' : 'var(--bg)' }}>
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave de Complete the Words</h2>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {ITEMS.map((item, index) => (
                <article key={item.id} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.6rem', alignItems: 'start' }}>
                  <CheckCircle2 size={18} style={{ color: '#047857', marginTop: 2 }} />
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--ink)' }}>Ítem {index + 1}: {String.fromCharCode(65 + item.answer)}. {item.options[item.answer]}</h3>
                    <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{item.explanation}</p>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {item.trap}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Siguiente paso</p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/toefl/reading/formato-2026/read-in-daily-life" className="btn btn-sm">Practicar Read in Daily Life</Link>
              <Link href="/practica/toefl/reading/tipos-de-preguntas/vocabulary" className="btn btn-ghost btn-sm">Refuerzo Vocabulary in Context</Link>
              <Link href="/practica/toefl/reading/formato-2026" className="btn btn-ghost btn-sm">Volver al formato actual</Link>
            </div>
          </section>

          <section style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
            <p style={{ margin: 0 }}><XCircle size={14} style={{ verticalAlign: 'text-bottom', color: 'var(--muted)' }} /> No uses traducción palabra por palabra: TOEFL evalúa función en contexto.</p>
          </section>
        </div>
      </section>
    </>
  );
}
