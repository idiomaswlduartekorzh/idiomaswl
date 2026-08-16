'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Faq = {
  question: string;
  answer: string;
};

type FocusId = 'sentence' | 'connectors' | 'email-tone' | 'discussion';

type Exercise = {
  id: FocusId;
  label: string;
  task: string;
  rule: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  weak: string;
  stronger: string;
};

const ACCENT = '#1a4fcc';
const ETS_WRITING_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html';

const EXERCISES: Exercise[] = [
  {
    id: 'sentence',
    label: 'Complete sentence',
    task: 'Build a Sentence',
    rule:
      'Una respuesta necesita sujeto, verbo principal y una relación lógica completa. Because, although e if no pueden quedarse flotando.',
    prompt: 'Choose the strongest sentence.',
    options: [
      'Because students receive detailed feedback instead of only a grade.',
      'Students improve faster because they receive detailed feedback instead of only a grade.',
      'Students improving faster because detailed feedback instead of only a grade.',
    ],
    answer: 1,
    explanation:
      'La opción 2 tiene sujeto, verbo principal y una cláusula because completa. La opción 1 es fragmento; la opción 3 no tiene verbo principal correcto.',
    weak: 'Because students receive detailed feedback instead of only a grade.',
    stronger: 'Students improve faster because they receive detailed feedback instead of only a grade.',
  },
  {
    id: 'connectors',
    label: 'Logic connectors',
    task: 'Academic Discussion',
    rule:
      'Los conectores no son decoración. However marca contraste; therefore marca resultado; for example introduce evidencia.',
    prompt: 'Choose the sentence that uses the connector correctly.',
    options: [
      'Students can learn independently; however, online courses give them more flexibility.',
      'Students can learn independently; therefore, universities should provide optional online modules.',
      'Students can learn independently; for example, this is a strong reason.',
    ],
    answer: 1,
    explanation:
      'La opción 2 usa therefore para conectar una razón con una recomendación. La opción 1 promete contraste, pero la segunda idea no contrasta claramente. La opción 3 dice “for example” sin ejemplo real.',
    weak: 'Students can learn independently; for example, this is a strong reason.',
    stronger: 'Students can learn independently; therefore, universities should provide optional online modules.',
  },
  {
    id: 'email-tone',
    label: 'Email tone',
    task: 'Write an Email',
    rule:
      'El tono gramatical cambia con el destinatario. Para profesor u oficina, usa modales y solicitudes claras: could, would it be possible, I would appreciate.',
    prompt: 'Choose the best sentence for an email to a professor.',
    options: [
      'Send me the slides because I missed class.',
      'Could you please send me the slides from today’s class when you have time?',
      'I need the slides fast, so send them today.',
    ],
    answer: 1,
    explanation:
      'La opción 2 mantiene propósito claro y tono respetuoso. Las otras opciones pueden entenderse, pero suenan bruscas para un profesor.',
    weak: 'Send me the slides because I missed class.',
    stronger: 'Could you please send me the slides from today’s class when you have time?',
  },
  {
    id: 'discussion',
    label: 'Academic development',
    task: 'Write for an Academic Discussion',
    rule:
      'Academic Discussion necesita gramática que desarrolle ideas: relative clauses, because, although y examples ayudan a explicar, no solo a sonar avanzado.',
    prompt: 'Choose the best academic discussion sentence.',
    options: [
      'I agree with online feedback because it is good and students like good feedback.',
      'I agree with online feedback because it gives students specific comments that they can use before the next assignment.',
      'I agree with online feedback, which students, because the next assignment is better.',
    ],
    answer: 1,
    explanation:
      'La opción 2 usa because y una cláusula relativa clara: comments that they can use. La opción 1 repite “good”; la opción 3 intenta sonar compleja pero rompe la estructura.',
    weak: 'I agree with online feedback because it is good and students like good feedback.',
    stronger:
      'I agree with online feedback because it gives students specific comments that they can use before the next assignment.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/toefl/writing', label: 'TOEFL Writing hub' },
  { href: '/practica/toefl/writing/rubrica', label: 'Rúbrica' },
  { href: '/practica/toefl/writing/model-answers', label: 'Model answers' },
  { href: '/practica/toefl/writing/build-a-sentence', label: 'Build a Sentence' },
  { href: '/practica/toefl/writing/write-an-email', label: 'Write an Email' },
  { href: '/practica/toefl/writing/academic-discussion', label: 'Academic Discussion' },
  { href: '/practica/toefl/writing/integrated-writing', label: 'Integrated Writing legacy' },
];

export default function ToeflGrammarForWritingClient({ faqs }: { faqs: Faq[] }) {
  const [selectedId, setSelectedId] = useState<FocusId>('sentence');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const exercise = useMemo(
    () => EXERCISES.find((item) => item.id === selectedId) ?? EXERCISES[0],
    [selectedId],
  );

  function chooseFocus(id: FocusId) {
    setSelectedId(id);
    setSelectedOption(null);
    setRevealed(false);
  }

  return (
    <main className="wl-section">
      <div className="wrap" style={{ maxWidth: 920 }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
          <span>/</span>
          <Link href="/practica/toefl/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Grammar for Writing</span>
        </nav>

        <p className="eyebrow" style={{ margin: '0 0 0.55rem' }}>
          <span className="ink-line" />TOEFL iBT Writing
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
          TOEFL Grammar for Writing: gramática aplicada
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 780 }}>
          Practica la gramática que realmente mueve una respuesta TOEFL: oraciones completas, conectores lógicos, tono de email y desarrollo académico claro.
        </p>

        <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.25rem' }}>
          <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
          <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS indica que TOEFL Writing mide cómo organizas ideas, usas gramática y vocabulario con precisión y escribes para un propósito específico.
          </p>
          <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> no estudiamos gramática aislada. Cada regla se practica dentro de Build a Sentence, Write an Email o Academic Discussion.
          </p>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
            Fuente oficial revisada: <a href={ETS_WRITING_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Writing Section</a>. Integrated Writing se mantiene como legacy/síntesis complementaria.
          </p>
        </section>

        <section aria-labelledby="focus-heading">
          <h2 id="focus-heading" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
            Ejercicios de gramática por tarea
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {EXERCISES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === selectedId ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                onClick={() => chooseFocus(item.id)}
                style={{ fontSize: '0.82rem' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <article className="wl-card" style={{ padding: '1rem', borderRadius: 16 }}>
            <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {exercise.task}
            </p>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: 'var(--ink)' }}>{exercise.label}</h3>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Regla WeLearn:</strong> {exercise.rule}
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontWeight: 800 }}>{exercise.prompt}</p>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {exercise.options.map((option, index) => {
                const active = selectedOption === index;
                const correct = revealed && index === exercise.answer;
                const wrong = revealed && active && index !== exercise.answer;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={revealed}
                    onClick={() => setSelectedOption(index)}
                    style={{
                      textAlign: 'left',
                      borderRadius: 10,
                      border: correct
                        ? '2px solid rgba(4,120,87,0.55)'
                        : wrong
                          ? '2px solid rgba(185,28,28,0.45)'
                          : active
                            ? `2px solid ${ACCENT}`
                            : '1px solid var(--line-soft)',
                      background: correct
                        ? 'rgba(4,120,87,0.08)'
                        : wrong
                          ? 'rgba(185,28,28,0.06)'
                          : active
                            ? `${ACCENT}0f`
                            : 'var(--bg-2)',
                      color: 'var(--ink)',
                      padding: '0.85rem',
                      cursor: revealed ? 'default' : 'pointer',
                      lineHeight: 1.55,
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {!revealed ? (
              <button
                className="btn btn-sm"
                type="button"
                disabled={selectedOption === null}
                onClick={() => setRevealed(true)}
                style={{ opacity: selectedOption === null ? 0.55 : 1, marginTop: '0.85rem' }}
              >
                Revisar respuesta
              </button>
            ) : (
              <div style={{ marginTop: '0.9rem', padding: '0.9rem', borderRadius: 12, background: `${ACCENT}0d`, border: `1px solid ${ACCENT}25` }}>
                <p style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontWeight: 800 }}>
                  Respuesta correcta: opción {exercise.answer + 1}
                </p>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{exercise.explanation}</p>
              </div>
            )}
          </article>
        </section>

        <section aria-labelledby="rewrite-heading" style={{ marginTop: '1.45rem' }}>
          <h2 id="rewrite-heading" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
            Reescritura débil vs fuerte
          </h2>
          <div className="wl-card" style={{ padding: '1rem', borderRadius: 16 }}>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <div style={{ border: '1px solid rgba(185,28,28,0.22)', borderRadius: 10, padding: '0.85rem', background: 'rgba(185,28,28,0.05)' }}>
                <p style={{ margin: '0 0 0.35rem', color: 'var(--wl-on-panel-alert, #991b1b)', fontWeight: 900, fontSize: '0.78rem' }}>Débil</p>
                <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{exercise.weak}</p>
              </div>
              <div style={{ border: '1px solid rgba(4,120,87,0.25)', borderRadius: 10, padding: '0.85rem', background: 'rgba(4,120,87,0.06)' }}>
                <p style={{ margin: '0 0 0.35rem', color: 'var(--wl-on-panel-ok, #047857)', fontWeight: 900, fontSize: '0.78rem' }}>Fuerte</p>
                <p style={{ margin: 0, color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{exercise.stronger}</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="answers-heading" style={{ marginTop: '1.45rem' }}>
          <h2 id="answers-heading" style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
            Respuestas explicadas
          </h2>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {EXERCISES.map((item) => (
              <article key={item.id} className="wl-card" style={{ padding: '1rem', borderRadius: 16 }}>
                <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {item.task}
                </p>
                <h3 style={{ margin: '0 0 0.45rem', fontSize: '1rem' }}>
                  {item.label}: opción correcta {item.answer + 1}
                </h3>
                <p style={{ margin: '0 0 0.55rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                  {item.explanation}
                </p>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                  <strong style={{ color: 'var(--ink)' }}>Reescritura fuerte:</strong> {item.stronger}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="links-heading" style={{ marginTop: '1.5rem' }}>
          <h2 id="links-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
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
          <h2 id="faq-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
            Preguntas frecuentes
          </h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {faqs.map((faq) => (
              <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
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
