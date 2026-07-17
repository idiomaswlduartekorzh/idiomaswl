import Link from 'next/link';

import type { ToeflWritingScoredVariant } from '@/data/practica-exams/seo-catalog';

type Faq = {
  question: string;
  answer: string;
};

const ACCENT = '#1a4fcc';
const ETS_WRITING_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html';

const INTERNAL_LINKS = [
  { href: '/practica/toefl/writing', label: 'TOEFL Writing hub' },
  { href: '/practica/toefl/writing/build-a-sentence', label: 'Build a Sentence' },
  { href: '/practica/toefl/writing/write-an-email', label: 'Write an Email' },
  { href: '/practica/toefl/writing/academic-discussion', label: 'Academic Discussion' },
  { href: '/practica/toefl/writing/integrated-writing', label: 'Integrated Writing legacy' },
];

const TASK_ORDER = ['Build a Sentence', 'Write an Email', 'Write for an Academic Discussion'];

export default function ToeflWritingModelAnswersClient({
  faqs,
  variants,
}: {
  faqs: Faq[];
  variants: ToeflWritingScoredVariant[];
}) {
  const grouped = TASK_ORDER.map((taskType) => ({
    taskType,
    variants: variants.filter((variant) => variant.taskType === taskType),
  }));

  return (
    <main className="wl-section">
      <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 960, minWidth: 0, overflowX: 'clip' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
          <span>/</span>
          <Link href="/practica/toefl/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Model answers</span>
        </nav>

        <p className="eyebrow" style={{ margin: '0 0 0.55rem' }}>
          <span className="ink-line" />TOEFL iBT Writing
        </p>
        <h1 style={{ fontSize: '2rem', lineHeight: 1.08, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', overflowWrap: 'anywhere' }}>
          TOEFL Writing model answers explicados
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 760 }}>
          Estudia respuestas originales para Build a Sentence, Write an Email y Academic Discussion. Cada variante muestra qué hacer, qué evitar y cómo revisar tu propia respuesta.
        </p>

        <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 8, marginBottom: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
          <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS describe tres tipos actuales de TOEFL iBT Writing: Build a Sentence, Write an Email y Write for an Academic Discussion.
          </p>
          <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> estas variantes no se memorizan. Se usan para observar propósito, tono, desarrollo, precisión gramatical y checklist de revisión.
          </p>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
            Fuente oficial revisada: <a href={ETS_WRITING_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Writing Section</a>. Integrated Writing se mantiene como legacy/síntesis complementaria en WeLearn.
          </p>
        </section>

        <section aria-labelledby="model-bank-heading">
          <h2 id="model-bank-heading" style={{ fontSize: '1.3rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Banco de variantes calificadas TOEFL Writing
          </h2>
          <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
            Las puntuaciones son estimaciones pedagógicas WeLearn para practicar revisión; no son calificaciones oficiales de ETS. Abre cada variante para comparar respuesta, razón de la estimación y siguiente movimiento de mejora.
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {grouped.map((group) => (
              <section key={group.taskType} aria-labelledby={`${group.taskType}-heading`}>
                <h3 id={`${group.taskType}-heading`} style={{ margin: '0 0 0.55rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {group.taskType}
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {group.variants.map((variant, index) => (
                    <details key={variant.id} open={index === 0} className="wl-card" style={{ padding: '0.9rem 1rem', borderRadius: 8 }}>
                      <summary style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 900, lineHeight: 1.45 }}>
                        {variant.label} · {variant.scoreLabel} · Estimación WeLearn {variant.welearnScoreEstimate}/6
                      </summary>
                      <div style={{ marginTop: '0.85rem', display: 'grid', gap: '0.85rem' }}>
                        <section>
                          <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', color: ACCENT }}>Prompt</h4>
                          <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.92rem' }}>{variant.prompt}</p>
                        </section>
                        <section>
                          <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', color: ACCENT }}>Respuesta</h4>
                          <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.7, fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{variant.response}</p>
                        </section>
                        <section>
                          <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', color: ACCENT }}>Por qué recibe esta estimación</h4>
                          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.88rem' }}>
                            {variant.whyThisScore.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </section>
                        <section style={{ border: '1px solid rgba(4,120,87,0.25)', borderRadius: 8, padding: '0.85rem', background: 'rgba(4,120,87,0.06)' }}>
                          <h4 style={{ margin: '0 0 0.35rem', color: '#047857', fontSize: '0.9rem' }}>Siguiente revisión</h4>
                          <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{variant.upgradeMove}</p>
                        </section>
                        <fieldset style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.85rem', margin: 0 }}>
                          <legend style={{ padding: '0 0.35rem', color: 'var(--ink)', fontWeight: 900, fontSize: '0.9rem' }}>Checklist WeLearn</legend>
                          <div style={{ display: 'grid', gap: '0.55rem' }}>
                            {variant.checklist.map((item) => (
                              <label key={item} style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start', color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.88rem' }}>
                                <input type="checkbox" style={{ marginTop: '0.2rem' }} />
                                <span>{item}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby="all-variants-heading" style={{ marginTop: '1.5rem' }}>
          <h2 id="all-variants-heading" style={{ fontSize: '1.25rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Clave completa de variantes calificadas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            El patrón de revisión es constante: identifica la tarea, verifica si la respuesta cumple el propósito, revisa estructura y tono, y aplica un siguiente movimiento concreto antes de escribir otra versión.
          </p>
        </section>

        <section aria-labelledby="links-heading" style={{ marginTop: '1.5rem' }}>
          <h2 id="links-heading" style={{ fontSize: '1.25rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Sigue practicando TOEFL Writing
          </h2>
          <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
            {INTERNAL_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq-heading" style={{ marginTop: '1.5rem' }}>
          <h2 id="faq-heading" style={{ fontSize: '1.25rem', letterSpacing: 0, margin: '0 0 0.75rem' }}>
            Preguntas frecuentes
          </h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {faqs.map((faq) => (
              <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '0.98rem', color: 'var(--ink)' }}>{faq.question}</h3>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
