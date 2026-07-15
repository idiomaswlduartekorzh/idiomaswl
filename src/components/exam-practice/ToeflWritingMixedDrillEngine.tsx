'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import type { ToeflWritingMixedDrill } from '@/data/practica-exams/seo-catalog';

const LETTERS = ['A', 'B', 'C'];

export default function ToeflWritingMixedDrillEngine({
  drills,
  accent = '#1a4fcc',
}: {
  drills: ToeflWritingMixedDrill[];
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () => drills.filter((drill) => answers[drill.id] === drill.answer).length,
    [answers, drills]
  );

  function reset() {
    setAnswers({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 8, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica mixta</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>TOEFL Writing mixed drills</h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            Decide si una respuesta pertenece a Build a Sentence, Write an Email o Academic Discussion. Integrated Writing queda fuera del flujo principal y se trata como síntesis/legacy.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reiniciar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Drills', value: String(drills.length), sub: 'tareas actuales' },
          { label: 'Decisión', value: 'task fit', sub: 'formato + intención' },
          { label: 'Evitar', value: 'legacy mix', sub: 'Integrated como síntesis' },
        ].map((item) => (
          <article key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: accent, fontFamily: 'var(--mono)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <h3 style={{ margin: '0 0 0.3rem', color: 'var(--ink)', fontSize: '0.92rem' }}>{item.value}</h3>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.84rem' }}>{item.sub}</p>
          </article>
        ))}
      </div>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round((answeredCount / drills.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.9rem' }}>
        {drills.map((drill, index) => {
          const selected = answers[drill.id];
          const locked = selected !== undefined;
          const isCorrectSelection = selected === drill.answer;

          return (
            <article key={drill.id} className="wl-card" style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Drill {index + 1}
                </span>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  {drill.taskType}
                </span>
              </div>

              <h3 style={{ margin: '0 0 0.4rem', color: 'var(--ink)', fontSize: '1.05rem', lineHeight: 1.4 }}>{drill.title}</h3>
              <p style={{ margin: '0 0 0.55rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{drill.situation}</p>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{drill.prompt}</p>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {drill.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === drill.answer;
                  const isSelected = selected === optionIndex;
                  let border = '1px solid var(--line-soft)';
                  let background = 'var(--bg-2)';
                  let color = 'var(--ink)';

                  if (locked && isCorrect) {
                    border = '1px solid #059669';
                    background = 'rgba(5,150,105,0.1)';
                    color = '#047857';
                  }

                  if (locked && isSelected && !isCorrect) {
                    border = '1px solid #dc2626';
                    background = 'rgba(220,38,38,0.1)';
                    color = '#b91c1c';
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={locked}
                      onClick={() => setAnswers((current) => ({ ...current, [drill.id]: optionIndex }))}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 1fr',
                        gap: '0.6rem',
                        alignItems: 'start',
                        textAlign: 'left',
                        border,
                        background,
                        color,
                        borderRadius: 8,
                        padding: '0.65rem 0.75rem',
                        font: 'inherit',
                        lineHeight: 1.45,
                        cursor: locked ? 'default' : 'pointer',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--mono)', fontWeight: 900, color: locked && isCorrect ? '#047857' : accent }}>
                        {LETTERS[optionIndex]}.
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {locked && (
                <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.65rem' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '24px 1fr',
                      gap: '0.55rem',
                      alignItems: 'start',
                      color: isCorrectSelection ? '#047857' : '#b91c1c',
                      background: isCorrectSelection ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                      borderRadius: 8,
                      padding: '0.7rem',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                    }}
                  >
                    {isCorrectSelection ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    <span>
                      <strong>{isCorrectSelection ? 'Correcto.' : `Mejor opción: ${LETTERS[drill.answer]}.`}</strong>{' '}
                      {drill.explanation}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Estructura:</strong> {drill.structureCue}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {drill.trap}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Siguiente paso:</strong> {drill.nextStep}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {answeredCount === drills.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>
            Resultado: {correctCount}/{drills.length} decisiones correctas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            El objetivo es reconocer la intención antes de escribir: oración, email o discusión académica. Esa decisión evita respuestas que suenan bien pero pertenecen a otra tarea.
          </p>
        </div>
      )}
    </section>
  );
}
