import Link from 'next/link';
import { CheckCircle2, ListChecks, SearchCheck } from 'lucide-react';
import { BreadcrumbJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  PRACTICE_BASE_URL,
  TOEFL_READING_CURRENT_FORMAT,
  TOEFL_READING_SKILL_PRACTICE,
  TOEFL_READING_SKILLS,
} from '@/data/practica-exams/seo-catalog';

const ACCENT = '#1a4fcc';
const ETS_TEST_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

export function SkillPracticePage({ slug }: { slug: string }) {
  const route = TOEFL_READING_SKILLS.find((item) => item.slug === slug)!;
  const practice = TOEFL_READING_SKILL_PRACTICE.find((item) => item.slug === slug)!;
  const url = `${PRACTICE_BASE_URL}${route.path}`;
  const currentTasks = TOEFL_READING_CURRENT_FORMAT.filter((item) => item.slug !== 'formato-2026');

  return (
    <>
      <LearningResourceJsonLd
        name={route.title}
        url={url}
        description={route.description}
        teaches={route.teaches}
        isPartOf={{ name: 'TOEFL Reading habilidades', url: `${PRACTICE_BASE_URL}/practica/toefl/reading/habilidades` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/toefl/reading` },
          { name: 'Habilidades', url: `${PRACTICE_BASE_URL}/practica/toefl/reading/habilidades` },
          { name: route.title.replace('TOEFL Reading ', ''), url },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/toefl/reading/habilidades" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Habilidades</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>{route.title.replace('TOEFL Reading ', '')}</span>
          </div>

          <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}><span className="ink-line" />TOEFL Reading · estrategia WeLearn</p>
          <h1 className="exam-practice-hero-title" style={{ color: 'var(--ink)', fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', maxWidth: '100%', overflowWrap: 'anywhere' }}>
            {route.title}: práctica con evidencia
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 760 }}>
            {route.description}
          </p>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Respuesta directa:</strong> {practice.directAnswer}
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS lista las familias actuales de TOEFL Reading como Complete the Words, Read in Daily Life y Read an Academic Passage.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> esta pagina entrena una habilidad transversal. No es una tarea oficial independiente; sirve para mejorar precision dentro del formato actual.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TEST_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '0.9rem', marginBottom: '1.2rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 16 }}>
              <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', color: ACCENT, marginBottom: '0.45rem' }}>
                <SearchCheck size={18} />
                <h2 style={{ margin: 0, fontSize: '1rem' }}>Cuándo usarla</h2>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                {practice.whenToUse.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 16 }}>
              <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', color: ACCENT, marginBottom: '0.45rem' }}>
                <ListChecks size={18} />
                <h2 style={{ margin: 0, fontSize: '1rem' }}>Método WeLearn</h2>
              </div>
              <ol style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                {practice.method.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </article>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Texto original</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: 0 }}>{practice.textTitle}</h2>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.8 }}>{practice.text}</p>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica guiada</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: 0 }}>Responde y justifica</h2>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {practice.questions.map((question, index) => (
                <article key={question.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>Ítem {index + 1}</p>
                  <h3 style={{ margin: '0 0 0.65rem', fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.5 }}>{question.prompt}</h3>
                  <ol style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                    {question.options.map((option, optionIndex) => (
                      <li key={option} style={{ color: optionIndex === question.answer ? '#047857' : 'var(--muted)', fontWeight: optionIndex === question.answer ? 800 : 500 }}>
                        {option}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: 0 }}>Clave con evidencia</h2>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {practice.questions.map((question, index) => (
                <article key={question.id} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.6rem', alignItems: 'start' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--wl-on-panel-ok, #047857)', marginTop: 2 }} />
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--ink)' }}>
                      Ítem {index + 1}: {String.fromCharCode(65 + question.answer)}
                    </h3>
                    <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{question.explanation}</p>
                    <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Evidencia:</strong> {question.evidence}</p>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}><strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {question.trap}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Siguiente paso</p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/toefl/reading/habilidades" className="btn btn-ghost btn-sm">Volver a habilidades</Link>
              <Link href="/practica/toefl/reading/formato-2026/read-an-academic-passage" className="btn btn-sm">Aplicar en Academic Passage</Link>
              {currentTasks.map((task) => (
                <Link key={task.slug} href={task.path} className="btn btn-ghost btn-sm">{task.title.replace('TOEFL Reading ', '')}</Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
