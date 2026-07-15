'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, RefreshCcw, RotateCcw, XCircle } from 'lucide-react';
import type { ParaphrasePracticeSet } from '@/data/practica-exams/seo-catalog';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function ParaphrasePracticeEngine({
  practice,
  practices,
  accent = '#0f766e',
}: {
  practice?: ParaphrasePracticeSet;
  practices?: ParaphrasePracticeSet[];
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const practiceSets = practices ?? (practice ? [practice] : []);
  const items = practiceSets.flatMap((set) => set.items);

  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () => items.filter((item) => answers[item.id] === item.answer).length,
    [answers, items]
  );

  function reset() {
    setAnswers({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica guiada</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>Banco de paráfrasis IELTS Reading</h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            Practica equivalencia de significado en varios contextos. El objetivo es conservar causa, tiempo, cantidad, certeza y contraste aunque cambien las palabras.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reiniciar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Sets', value: `${practiceSets.length}` },
          { label: 'Conserva', value: 'significado' },
          { label: 'Vigila', value: 'alcance y certeza' },
        ].map((item) => (
          <div key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <strong style={{ color: accent, lineHeight: 1.35 }}>{item.value}</strong>
          </div>
        ))}
      </div>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round((answeredCount / items.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.9rem' }}>
        {practiceSets.map((practiceSet, setIndex) => (
          <section key={practiceSet.id} style={{ display: 'grid', gap: '0.9rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, background: 'var(--bg)' }}>
              <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                Set {setIndex + 1} · {practiceSet.timeTarget}
              </p>
              <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{practiceSet.title}</h3>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                {practiceSet.instructions}
              </p>
            </article>

            {practiceSet.items.map((item, index) => {
              const selected = answers[item.id];
              const locked = selected !== undefined;
              const isCorrectSelection = selected === item.answer;

              return (
                <article key={item.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Set {setIndex + 1} · Paráfrasis {index + 1}
                </span>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  foco: {item.focus}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.65rem', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)', marginBottom: '0.75rem' }}>
                <RefreshCcw size={18} style={{ color: accent, marginTop: 2 }} />
                <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                  <strong style={{ color: 'var(--ink)' }}>Texto:</strong> {item.source}
                </p>
              </div>

              <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>
                ¿Cuál opción conserva el mismo significado?
              </h3>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {item.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === item.answer;
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
                      onClick={() => setAnswers((current) => ({ ...current, [item.id]: optionIndex }))}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 1fr',
                        gap: '0.6rem',
                        alignItems: 'start',
                        textAlign: 'left',
                        border,
                        background,
                        color,
                        borderRadius: 12,
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
                      borderRadius: 12,
                      padding: '0.7rem',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                    }}
                  >
                    {isCorrectSelection ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    <span>
                      <strong>{isCorrectSelection ? 'Correcto.' : `Respuesta correcta: ${LETTERS[item.answer]}.`}</strong>{' '}
                      {item.explanation}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gap: '0.35rem' }}>
                    {item.traps.map((trap) => (
                      <p key={trap} style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.86rem' }}>
                        <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {trap}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </article>
              );
            })}
          </section>
        ))}
      </div>

      {answeredCount === items.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>
            Resultado: {correctCount}/{items.length} equivalencias conservadas
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Si fallaste, revisa qué cambió: cantidad, certeza, causa, tiempo o dirección. En IELTS una palabra pequeña puede romper la equivalencia completa.
          </p>
        </div>
      )}
    </section>
  );
}
