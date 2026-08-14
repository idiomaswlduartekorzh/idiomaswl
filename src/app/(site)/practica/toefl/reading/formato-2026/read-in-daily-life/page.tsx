import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Mail, SearchCheck } from 'lucide-react';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import ReadingSet1Practice from '@/components/toefl/ReadingSet1Practice';
import {
  PRACTICE_BASE_URL,
  TOEFL_DAILY_LIFE_TEXTS,
  TOEFL_READING_CURRENT_FORMAT,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_READING_CURRENT_FORMAT.find((item) => item.slug === 'read-in-daily-life')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const ETS_TEST_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

const TEXTS = TOEFL_DAILY_LIFE_TEXTS;

export const metadata: Metadata = {
  title: 'TOEFL Read in Daily Life: práctica y respuestas',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Read in Daily Life',
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
          { name: 'Read in Daily Life', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/toefl/reading/formato-2026" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Formato actual</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Read in Daily Life</span>
          </div>

          <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}><span className="ink-line" />TOEFL Reading · Formato actual</p>
          <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
            Read in Daily Life: entiende avisos, emails e instrucciones
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 760 }}>
            Esta tarea evalúa lectura funcional: qué cambió, quién debe actuar, cuándo aplica la instrucción y qué detalle confirma la respuesta.
          </p>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Respuesta directa:</strong> en Read in Daily Life, identifica propósito, cambio, destinatario y acción requerida. La respuesta suele estar en una frase breve, pero debes leer alrededor para no confundir fecha, lugar o causa.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS lista Read in Daily Life como una de las familias actuales de TOEFL Reading.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> tratamos cada texto como una situación real: propósito, cambio, evidencia y acción.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TEST_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
          </section>

          <ReadingSet1Practice scope="daily-life" />

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', color: ACCENT, marginBottom: '0.45rem' }}>
              <Mail size={18} />
              <p className="eyebrow" style={{ margin: 0 }}>Texto funcional</p>
            </div>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Banco inicial de textos funcionales</h2>
            <div style={{ display: 'grid', gap: '0.9rem' }}>
              {TEXTS.map((text) => (
                <article key={text.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <h3 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '1rem' }}>{text.title}</h3>
                  <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.8 }}>{text.text}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica guiada</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Preguntas de lectura funcional</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {TEXTS.flatMap((text) =>
                text.questions.map((item, index) => (
                  <article key={item.id} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.6rem', alignItems: 'start' }}>
                    <SearchCheck size={18} style={{ color: ACCENT, marginTop: 2 }} />
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--ink)' }}>{text.title} · Pregunta {index + 1}: {item.question}</h3>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>Busca la frase exacta que responde causa, acción, lugar o tiempo.</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave de Read in Daily Life</h2>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {TEXTS.flatMap((text) =>
                text.questions.map((item, index) => (
                  <article key={item.id} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.6rem', alignItems: 'start' }}>
                    <CheckCircle2 size={18} style={{ color: '#047857', marginTop: 2 }} />
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--ink)' }}>{text.title} · Respuesta {index + 1}: {item.answer}</h3>
                      <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{item.explanation}</p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {item.trap}</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/toefl/reading/formato-2026/read-an-academic-passage" className="btn btn-sm">Practicar Academic Passage</Link>
              <Link href="/practica/toefl/reading/tipos-de-preguntas/factual-information" className="btn btn-ghost btn-sm">Refuerzo Factual Information</Link>
              <Link href="/practica/toefl/reading/formato-2026" className="btn btn-ghost btn-sm">Volver al formato actual</Link>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
