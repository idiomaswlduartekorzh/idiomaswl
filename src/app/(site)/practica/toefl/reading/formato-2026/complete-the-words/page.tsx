import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  PRACTICE_BASE_URL,
  TOEFL_READING_CURRENT_FORMAT,
} from '@/data/practica-exams/seo-catalog';
import CompleteTheWordsPractice from './CompleteTheWordsPractice';

const ROUTE = TOEFL_READING_CURRENT_FORMAT.find((item) => item.slug === 'complete-the-words')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const ETS_READING_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content/reading.html';

export const metadata: Metadata = {
  title: 'TOEFL Complete the Words: letras faltantes',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Complete the Words: práctica de letras faltantes',
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

          <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}><span className="ink-line" />TOEFL Reading · Formato desde enero de 2026</p>
          <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
            Complete the Words: escribe las letras que faltan
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 780 }}>
            Lee un texto breve y reconstruye palabras parcialmente ocultas usando sus letras visibles y el contexto. En cada espacio escribe únicamente la parte que falta, no la palabra completa.
          </p>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Cómo funciona:</strong> la primera oración queda intacta. Después aparecen palabras parciales dentro del texto. La práctica acepta mayúsculas o minúsculas y espacios exteriores, pero exige exactamente las letras faltantes.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Referencia oficial y alcance de esta práctica</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              ETS describe Complete the Words como una tarea de Reading con palabras parcialmente incompletas dentro de un texto. La interacción de abajo entrena esa mecánica, pero es una muestra fija creada por WeLearn: no reproduce la adaptación, la composición completa ni la puntuación del examen.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente revisada: <a href={ETS_READING_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS — TOEFL iBT Reading</a>.
            </p>
          </section>

          <CompleteTheWordsPractice />

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Prácticas relacionadas</p>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              El banco anterior de 16 preguntas se conserva sin cambios como práctica secundaria de selección de palabras por contexto. Entrena una habilidad útil, pero no se presenta como la interacción Complete the Words.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/toefl/reading/habilidades/seleccion-de-palabras-contexto" className="btn btn-ghost btn-sm">Selección de palabras por contexto</Link>
              <Link href="/practica/toefl/reading/formato-2026/read-in-daily-life" className="btn btn-sm">Practicar Read in Daily Life</Link>
              <Link href="/practica/toefl/reading/formato-2026" className="btn btn-ghost btn-sm">Volver al formato actual</Link>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
