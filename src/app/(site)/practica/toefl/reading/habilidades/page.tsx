import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Brain, Clock, ListChecks } from 'lucide-react';
import { BreadcrumbJsonLd, FaqJsonLd, JsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL, TOEFL_READING_MIXED_DRILLS, TOEFL_READING_SKILLS } from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_READING_SKILLS.find((item) => item.slug === 'habilidades')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const ETS_TEST_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';
const SKILLS = TOEFL_READING_SKILLS.filter((item) => item.slug !== 'habilidades');
const MIXED_DRILLS = TOEFL_READING_MIXED_DRILLS.slice(3);

export const metadata: Metadata = {
  title: 'TOEFL Reading habilidades: estrategia y práctica',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Reading habilidades',
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
          { name: 'Habilidades', url: URL },
        ]}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'TOEFL Reading WeLearn skills',
          itemListElement: SKILLS.map((skill, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: skill.title,
            url: `${PRACTICE_BASE_URL}${skill.path}`,
          })),
        }}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/toefl/reading" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Reading</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Habilidades</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}><span className="ink-line" />TOEFL Reading · estrategia WeLearn</p>
              <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                TOEFL Reading habilidades
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                Estas rutas no son tareas oficiales independientes. Son entrenamiento WeLearn para resolver mejor Complete the Words, Read in Daily Life y Read an Academic Passage.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <Brain size={18} />, label: 'Lógica', text: 'Causa, contraste y consecuencia para inferencia y propósito.' },
                { icon: <ListChecks size={18} />, label: 'Estructura', text: 'Función de párrafos, ejemplos y cambios de enfoque.' },
                { icon: <Clock size={18} />, label: 'Tiempo', text: 'Decidir cuándo leer profundo, escanear o avanzar.' },
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
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS organiza TOEFL Reading actual en familias de tarea. Esta sección no cambia ese formato.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos habilidades transversales para que el estudiante lea con evidencia, estructura y ritmo.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TEST_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
          </section>

          <section style={{ display: 'grid', gap: '0.9rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>Rutas de habilidades</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem' }}>
              {SKILLS.map((skill) => (
                <Link key={skill.slug} href={skill.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${ACCENT}` }}>
                    <h3 style={{ margin: '0 0 0.4rem', color: 'var(--ink)', fontSize: '1rem' }}>{skill.title.replace('TOEFL Reading ', '')}</h3>
                    <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{skill.description}</p>
                    <span style={{ color: ACCENT, fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.86rem' }}>
                      Practicar <ArrowRight size={14} />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Drills mixtos</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: 0 }}>
              Aplica habilidades dentro del formato actual
            </h2>
            <p style={{ margin: '0 0 0.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Estos drills mezclan una familia TOEFL Reading actual con una habilidad WeLearn. No inventa una cuarta tarea oficial ni cambia el formato ETS; sirven para transferir estrategia a preguntas reales.
            </p>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {MIXED_DRILLS.map((drill, index) => (
                <article key={drill.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Drill {index + 1} · {drill.taskFamily} · {drill.skill}
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
                  <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}><strong style={{ color: 'var(--ink)' }}>Evidencia:</strong> {drill.evidence}</p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {drill.trap}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
