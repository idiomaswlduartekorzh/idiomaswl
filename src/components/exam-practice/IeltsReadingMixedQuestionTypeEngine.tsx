'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CheckCircle2, ExternalLink, RotateCcw, XCircle } from 'lucide-react';
import type { IeltsReadingMixedQuestionTypeSet } from '@/data/practica-exams/seo-catalog';

const LETTERS = ['A', 'B', 'C'];

export default function IeltsReadingMixedQuestionTypeEngine({
  sets,
  accent = '#0369a1',
}: {
  sets: IeltsReadingMixedQuestionTypeSet[];
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const tasks = useMemo(() => sets.flatMap((set) => set.tasks), [sets]);
  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () => tasks.filter((task) => answers[task.id] === task.answer).length,
    [answers, tasks]
  );

  function reset() {
    setAnswers({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 8, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica mixta</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>
            Banco mixto de tipos IELTS Reading
          </h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            Decide primero qué formato oficial estás viendo; luego responde con evidencia. Este banco entrena transferencia entre tipos, no reemplaza la página dedicada de cada formato.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reiniciar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Sets', value: String(sets.length), sub: 'pasajes cortos originales' },
          { label: 'Tareas', value: String(tasks.length), sub: 'formatos IELTS mezclados' },
          { label: 'Meta', value: 'tipo + evidencia', sub: 'no solo respuesta final' },
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
            width: `${Math.round((answeredCount / tasks.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {sets.map((set, setIndex) => (
          <section key={set.id} style={{ display: 'grid', gap: '0.85rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg)', borderLeft: `4px solid ${accent}` }}>
              <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                Set {setIndex + 1} · {set.timeTarget}
              </p>
              <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{set.title}</h3>
              <p style={{ margin: '0 0 0.7rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                {set.instructions}
              </p>
              <h4 style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontSize: '0.98rem' }}>{set.passageTitle}</h4>
              <div style={{ display: 'grid', gap: '0.65rem' }}>
                {set.passage.map((paragraph) => (
                  <section key={paragraph.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.8rem', background: 'var(--bg-2)' }}>
                    <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>
                      {paragraph.label} · {paragraph.function}
                    </p>
                    <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.68, fontSize: '0.92rem' }}>{paragraph.text}</p>
                  </section>
                ))}
              </div>
            </article>

            {set.tasks.map((task, taskIndex) => {
              const selected = answers[task.id];
              const locked = selected !== undefined;
              const isCorrectSelection = selected === task.answer;

              return (
                <article key={task.id} className="wl-card" style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                    <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                      Set {setIndex + 1} · Pregunta {taskIndex + 1}
                    </span>
                    <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                      {task.questionType}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Prompt:</strong> {task.prompt}
                  </p>
                  <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>{task.question}</h3>

                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {task.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === task.answer;
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
                          onClick={() => setAnswers((current) => ({ ...current, [task.id]: optionIndex }))}
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
                          <strong>{isCorrectSelection ? 'Correcto.' : `Mejor opción: ${LETTERS[task.answer]}.`}</strong>{' '}
                          {task.explanation}
                        </span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Evidencia:</strong> “{task.evidence}”.
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {task.trap}
                      </p>
                      <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Habilidad de apoyo:</strong> {task.linkedSkill}
                      </p>
                      <Link className="btn btn-ghost btn-sm" href={task.route} style={{ justifySelf: 'start', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        Practicar {task.questionType}
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ))}
      </div>

      {answeredCount === tasks.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>
            Resultado: {correctCount}/{tasks.length} decisiones correctas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Si fallaste al reconocer el formato, vuelve a la ruta dedicada del tipo de pregunta. Si reconociste el formato pero fallaste la respuesta, entrena evidencia, paráfrasis o límite de palabras.
          </p>
        </div>
      )}
    </section>
  );
}
