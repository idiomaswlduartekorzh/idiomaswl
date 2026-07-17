import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, FileText, SearchCheck } from 'lucide-react';
import { BreadcrumbJsonLd, FaqJsonLd, JsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL, TOEFL_READING_CURRENT_FORMAT, TOEFL_READING_MIXED_DRILLS } from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_READING_CURRENT_FORMAT.find((item) => item.slug === 'formato-2026')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const ETS_TEST_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

const TASKS = TOEFL_READING_CURRENT_FORMAT.filter((item) => item.slug !== 'formato-2026');
const MIXED_DRILLS = TOEFL_READING_MIXED_DRILLS.slice(0, 3);

export const metadata: Metadata = {
  title: 'TOEFL Reading formato actual: tareas y práctica',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Reading formato actual',
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
        isPartOf={{ name: 'TOEFL Reading', url: `${PRACTICE_BASE_URL}/practica/toefl/reading` }}
      />
      <FaqJsonLd faqs={ROUTE.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/toefl/reading` },
          { name: 'Formato actual', url: URL },
        ]}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'TOEFL Reading current task families',
          itemListElement: TASKS.map((task, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: task.title,
            url: `${PRACTICE_BASE_URL}${task.path}`,
          })),
        }}
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
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Formato actual</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />TOEFL iBT Reading
              </p>
              <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                TOEFL Reading formato actual
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                Esta ruta organiza TOEFL Reading según las familias de tarea actuales listadas por ETS: Complete the Words, Read in Daily Life y Read an Academic Passage.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <SearchCheck size={18} />, label: 'ETS', text: 'Reading incluye 50 ítems y una base aproximada de 30 minutos; el test puede adaptarse.' },
                { icon: <BookOpenCheck size={18} />, label: 'WeLearn', text: 'Separamos cada familia para practicar vocabulario, lectura funcional y lectura académica.' },
                { icon: <FileText size={18} />, label: 'Compatibles', text: 'Las rutas antiguas de vocabulario, inferencia y propósito quedan como habilidades de apoyo.' },
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

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Respuesta directa:</strong> para estudiar TOEFL Reading actual, practica primero Complete the Words, después lectura funcional de Daily Life y luego pasajes académicos. Usa las rutas de question types como apoyo compatible, no como el índice principal del formato vigente.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS lista en Reading tres familias: Complete the Words, Read in Daily Life y Read an Academic Passage. También indica 50 ítems y 30 minutos base, con variaciones posibles porque el test se adapta.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> convertimos esas familias en rutas de práctica dedicadas. Las páginas legacy/compatibles entrenan habilidades útiles, pero esta rama es la referencia del formato actual.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TEST_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
          </section>

          <section style={{ display: 'grid', gap: '0.9rem', marginBottom: '1.2rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Rutas actuales de TOEFL Reading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem' }}>
              {TASKS.map((task) => (
                <Link key={task.slug} href={task.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${ACCENT}` }}>
                    <h2 style={{ margin: '0 0 0.4rem', color: 'var(--ink)', fontSize: '1rem' }}>{task.title.replace('TOEFL Reading ', '')}</h2>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{task.description}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica mixta</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: 0 }}>
              Mezcla formato actual con habilidades WeLearn
            </h2>
            <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Estos ejercicios combinan familias actuales de Reading con habilidades transversales. No inventa una cuarta tarea oficial ni cambia el formato ETS; entrena transferencia entre contexto, texto funcional y pasaje académico.
            </p>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {MIXED_DRILLS.map((drill, index) => (
                <article key={drill.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Ítem {index + 1} · {drill.taskFamily} · {drill.skill}
                  </p>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '1rem', color: 'var(--ink)' }}>{drill.title}</h3>
                  <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65 }}>{drill.text}</p>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--ink-2)', fontWeight: 800 }}>{drill.prompt}</p>
                  <ol style={{ margin: '0 0 0.65rem', paddingLeft: '1.2rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                    {drill.options.map((option, optionIndex) => (
                      <li key={option} style={{ color: optionIndex === drill.answer ? '#047857' : 'var(--muted)', fontWeight: optionIndex === drill.answer ? 800 : 500 }}>
                        {option}
                      </li>
                    ))}
                  </ol>
                  <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}><strong style={{ color: 'var(--ink)' }}>Explicación:</strong> {drill.explanation}</p>
                  <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Evidencia:</strong> {drill.evidence}</p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {drill.trap}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Habilidades compatibles</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Usa las rutas anteriores como soporte, no como formato principal</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Vocabulary in Context, Inference, Factual Information, Rhetorical Purpose y Sentence Simplification siguen siendo útiles para entrenar microhabilidades de lectura académica.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/toefl/reading/tipos-de-preguntas" className="btn btn-ghost btn-sm">Ver habilidades compatibles</Link>
              <Link href="/practica/toefl/reading/habilidades" className="btn btn-ghost btn-sm">Entrenar habilidades WeLearn</Link>
              <Link href="/practica/toefl/reading" className="btn btn-ghost btn-sm">Volver a TOEFL Reading</Link>
              <Link href="/practica/toefl/reading/formato-2026/complete-the-words" className="btn btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                Empezar formato actual <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
