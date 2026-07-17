import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, CheckCircle2, SearchCheck } from 'lucide-react';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { BreadcrumbJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL, TOEFL_READING_TYPES } from '@/data/practica-exams/seo-catalog';

const URL = `${PRACTICE_BASE_URL}/practica/toefl/reading/tipos-de-preguntas`;
const ACCENT = '#1a4fcc';
const ETS_TEST_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

export const metadata: Metadata = {
  title: 'TOEFL Reading habilidades compatibles | Guía y ejercicios',
  description:
    'Habilidades compatibles para TOEFL Reading: vocabulario en contexto, inferencia, evidencia textual y estrategia para pasajes académicos.',
  keywords: [
    'tipos de preguntas TOEFL Reading',
    'TOEFL Reading question types',
    'TOEFL vocabulary in context',
    'TOEFL inference questions',
  ],
  openGraph: {
    title: 'TOEFL Reading habilidades compatibles',
    description: 'Estrategias y ejercicios compatibles para TOEFL iBT Reading.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  const published = TOEFL_READING_TYPES.filter((item) => item.status === 'published');

  return (
    <>
      <CourseSchema
        name="Tipos de preguntas TOEFL Reading"
        description="Ruta de práctica compatible para TOEFL iBT Reading, con estrategia y ejercicios por microhabilidad."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="TOEFL Reading question types, vocabulary in context, inference, academic reading"
        inLanguage="es-CO"
      />
      <LearningResourceJsonLd
        name="Tipos de preguntas TOEFL Reading"
        url={URL}
        description="Índice educativo para practicar habilidades compatibles de TOEFL Reading."
        teaches={['TOEFL Reading', 'question types', 'vocabulary in context', 'inference']}
        isPartOf={{ name: 'TOEFL Reading Practice', url: `${PRACTICE_BASE_URL}/practica/toefl/reading` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/toefl/reading` },
          { name: 'Tipos de preguntas', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
            <span>/</span>
            <Link href="/practica/toefl/reading" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Reading</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Tipos de preguntas</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />TOEFL iBT Reading
              </p>
              <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                Habilidades compatibles TOEFL Reading
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>
                Esta rama no reemplaza el formato actual de ETS. Funciona como entrenamiento compatible para leer mejor: entender palabras por contexto, inferir ideas, reconocer propósito y volver al texto sin perder tiempo.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <SearchCheck size={18} />, label: 'Localiza', text: 'Encuentra la oración que contiene la pista antes de mirar todas las opciones.' },
                { icon: <Brain size={18} />, label: 'Razona', text: 'TOEFL premia relación lógica: causa, contraste, definición, ejemplo o consecuencia.' },
                { icon: <CheckCircle2 size={18} />, label: 'Sustituye', text: 'En vocabulario, reemplaza la palabra y comprueba si la frase conserva sentido.' },
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

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS lista la rama actual de Reading con Complete the Words, Read in Daily Life y Read an Academic Passage.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> conservamos estos tipos de pregunta como habilidades compatibles porque ayudan a resolver pasajes academicos, pero no son el indice principal del formato actual.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TEST_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
            <div style={{ marginTop: '0.85rem' }}>
              <Link href="/practica/toefl/reading/formato-2026" className="btn btn-sm">Ir al formato actual</Link>
            </div>
          </section>

          <section style={{ display: 'grid', gap: '0.9rem', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Ruta de habilidades compatibles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem' }}>
              {TOEFL_READING_TYPES.map((type) => {
                const available = type.status === 'published';
                const card = (
                  <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${available ? ACCENT : 'var(--line-soft)'}`, opacity: available ? 1 : 0.68 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.7rem', alignItems: 'start', marginBottom: '0.45rem' }}>
                      <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem', letterSpacing: '-0.01em' }}>{type.title.replace('TOEFL Reading ', '')}</h3>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 900, color: available ? ACCENT : 'var(--muted)' }}>
                        {available ? 'DISPONIBLE' : 'SIGUIENTE'}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{type.description}</p>
                  </article>
                );

                return available ? (
                  <Link key={type.slug} href={type.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {card}
                  </Link>
                ) : (
                  <div key={type.slug}>{card}</div>
                );
              })}
            </div>
          </section>

          {published.length > 0 && (
            <Link href={published[0].path} className="btn btn-sm">Empezar con Vocabulary in Context</Link>
          )}
        </div>
      </section>
    </>
  );
}
