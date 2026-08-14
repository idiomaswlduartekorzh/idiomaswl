import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, FileText, SearchCheck } from 'lucide-react';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import ReadingSet1Practice from '@/components/toefl/ReadingSet1Practice';
import {
  PRACTICE_BASE_URL,
  TOEFL_ACADEMIC_PASSAGES,
  TOEFL_READING_CURRENT_FORMAT,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_READING_CURRENT_FORMAT.find((item) => item.slug === 'read-an-academic-passage')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const ETS_TEST_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

const PASSAGES = TOEFL_ACADEMIC_PASSAGES;

export const metadata: Metadata = {
  title: 'TOEFL Read an Academic Passage: práctica y respuestas',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Read an Academic Passage',
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
          { name: 'Read an Academic Passage', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/toefl/reading/formato-2026" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Formato actual</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Read an Academic Passage</span>
          </div>

          <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}><span className="ink-line" />TOEFL Reading · Formato actual</p>
          <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
            Read an Academic Passage: practica lectura universitaria con evidencia
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 760 }}>
            Esta tarea entrena lectura academica: idea principal, inferencia, proposito retorico y regreso al texto para justificar cada respuesta.
          </p>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Respuesta directa:</strong> primero identifica la tesis del pasaje, luego separa evidencia textual de inferencias razonables. Si una opcion usa palabras del texto pero cambia la relacion logica, no es correcta.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS lista Read an Academic Passage como una de las familias actuales de TOEFL Reading.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> practicamos pasajes cortos con preguntas explicadas antes de pasar a lecturas largas y control de tiempo.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TEST_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
          </section>

          <ReadingSet1Practice scope="academic" />

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Pasaje original</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Banco inicial de pasajes académicos</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {PASSAGES.map((passage) => (
                <article key={passage.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <h3 style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontSize: '1rem' }}>{passage.title}</h3>
                  <div style={{ display: 'grid', gap: '0.8rem' }}>
                    {passage.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 34)} style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.75 }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica guiada</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Responde con evidencia</h2>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {PASSAGES.flatMap((passage) =>
                passage.questions.map((question, index) => (
                  <article key={question.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                    <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                      {passage.title} · Ítem {index + 1} · {question.type}
                    </p>
                    <h3 style={{ margin: '0 0 0.65rem', fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.5 }}>{question.prompt}</h3>
                    <ol style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                      {question.options.map((option, optionIndex) => (
                        <li key={option} style={{ color: optionIndex === question.answer ? '#047857' : 'var(--muted)', fontWeight: optionIndex === question.answer ? 800 : 500 }}>
                          {option}
                        </li>
                      ))}
                    </ol>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave del pasaje academico</h2>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {PASSAGES.flatMap((passage) =>
                passage.questions.map((question, index) => (
                  <article key={question.id} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.6rem', alignItems: 'start' }}>
                    <CheckCircle2 size={18} style={{ color: '#047857', marginTop: 2 }} />
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--ink)' }}>
                        {passage.title} · Ítem {index + 1}: {String.fromCharCode(65 + question.answer)}
                      </h3>
                      <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{question.explanation}</p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {question.trap}</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Siguiente paso</p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/toefl/reading/formato-2026" className="btn btn-sm">Volver al formato actual</Link>
              <Link href="/practica/toefl/reading/tipos-de-preguntas/inference" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <SearchCheck size={15} /> Refuerzo de inferencia
              </Link>
              <Link href="/practica/toefl/reading/tipos-de-preguntas/rhetorical-purpose" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileText size={15} /> Refuerzo de proposito
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
