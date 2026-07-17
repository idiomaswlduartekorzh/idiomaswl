import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenCheck, Clock, SearchCheck } from 'lucide-react';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { BreadcrumbJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL, TOEFL_READING_CURRENT_FORMAT, TOEFL_READING_TYPES } from '@/data/practica-exams/seo-catalog';

const URL = `${PRACTICE_BASE_URL}/practica/toefl/reading`;
const ACCENT = '#1a4fcc';
const ETS_TEST_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

export const metadata: Metadata = {
  title: 'TOEFL Reading: formato actual, práctica y habilidades',
  description:
    'Ruta TOEFL Reading con formato actual, ejercicios de Complete the Words, Read in Daily Life, Read an Academic Passage y habilidades compatibles.',
  keywords: ['TOEFL Reading practice', 'TOEFL Reading ejercicios', 'TOEFL reading 2026', 'TOEFL complete the words'],
  openGraph: {
    title: 'TOEFL Reading: formato actual y práctica',
    description: 'Ejercicios TOEFL Reading por formato actual y habilidades compatibles.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  const published = TOEFL_READING_TYPES.filter((item) => item.status === 'published');
  const currentTasks = TOEFL_READING_CURRENT_FORMAT.filter((item) => item.slug !== 'formato-2026');

  return (
    <>
      <CourseSchema
        name="TOEFL Reading Practice"
        description="Ruta de práctica para TOEFL Reading con formato actual y ejercicios dedicados por habilidad compatible."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="TOEFL Reading, vocabulary in context, inference, academic reading"
        inLanguage="es-CO"
      />
      <LearningResourceJsonLd
        name="TOEFL Reading Practice"
        url={URL}
        description="Índice de práctica TOEFL Reading con formato actual, habilidades compatibles y ejercicios interactivos."
        teaches={['TOEFL Reading', 'academic reading', 'current TOEFL format']}
        isPartOf={{ name: 'Práctica TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Reading', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Reading</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />TOEFL iBT Reading
              </p>
              <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                TOEFL Reading Practice
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 740 }}>
                TOEFL Reading se estudia mejor en dos capas: primero el formato actual listado por ETS, y luego las habilidades compatibles que te ayudan a resolver vocabulario, inferencia, propósito, detalle y organización.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <SearchCheck size={18} />, label: 'Formato actual', text: 'La rama principal sigue Complete the Words, Read in Daily Life y Read an Academic Passage.' },
                { icon: <BookOpenCheck size={18} />, label: 'Compatibles', text: 'Las rutas de tipos de pregunta entrenan microhabilidades que siguen sirviendo.' },
                { icon: <Clock size={18} />, label: 'Transferencia', text: 'Practica por tarea primero; después mezcla habilidades en pasajes completos.' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.65rem', alignItems: 'start' }}>
                  <span style={{ color: ACCENT }}>{item.icon}</span>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>{item.label}:</strong> {item.text}
                  </p>
                </div>
              ))}
            </aside>
          </div>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Ruta recomendada</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Empieza por el formato actual de TOEFL Reading
            </h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              ETS presenta Reading con tres familias actuales: Complete the Words, Read in Daily Life y Read an Academic Passage. En WeLearn usamos esas tareas como columna principal y dejamos los tipos de pregunta como entrenamiento compatible.
            </p>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
              Fuente oficial revisada: <a href={ETS_TEST_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/toefl/reading/formato-2026" className="btn btn-sm">Ver formato actual</Link>
              <Link href="/practica/toefl/reading/habilidades" className="btn btn-ghost btn-sm">Entrenar habilidades WeLearn</Link>
              <Link href="/practica/toefl/reading/tipos-de-preguntas" className="btn btn-ghost btn-sm">Ver habilidades compatibles</Link>
            </div>
          </section>

          <section style={{ display: 'grid', gap: '0.9rem', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Tareas actuales TOEFL Reading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem' }}>
              {currentTasks.map((item) => (
                <Link key={item.slug} href={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${ACCENT}` }}>
                    <h2 style={{ margin: '0 0 0.4rem', color: 'var(--ink)', fontSize: '1rem' }}>{item.title.replace('TOEFL Reading ', '')}</h2>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{item.description}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {published.length > 0 && (
            <section style={{ display: 'grid', gap: '0.9rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Habilidades compatibles</h2>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65 }}>
                Para estrategia transversal de lógica, estructura y tiempo, usa el hub de <Link href="/practica/toefl/reading/habilidades" style={{ color: ACCENT, fontWeight: 800 }}>habilidades WeLearn</Link>. Para tipos compatibles heredados, sigue con las tarjetas de abajo.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem' }}>
              {published.map((item) => (
                <Link key={item.slug} href={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${ACCENT}` }}>
                    <h2 style={{ margin: '0 0 0.4rem', color: 'var(--ink)', fontSize: '1rem' }}>{item.title.replace('TOEFL Reading ', '')}</h2>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{item.description}</p>
                  </article>
                </Link>
              ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
