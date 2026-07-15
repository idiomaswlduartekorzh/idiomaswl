'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Clock3, RotateCcw, XCircle } from 'lucide-react';
import type { TimeManagementPracticeSet } from '@/data/practica-exams/seo-catalog';

const LETTERS = ['A', 'B', 'C'];

export default function TimeManagementPracticeEngine({
  practice,
  practices,
  accent = '#7c3aed',
}: {
  practice?: TimeManagementPracticeSet;
  practices?: TimeManagementPracticeSet[];
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const practiceSets = practices ?? (practice ? [practice] : []);
  const decisions = practiceSets.flatMap((set) => set.decisions);
  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () => decisions.filter((decision) => answers[decision.id] === decision.answer).length,
    [answers, decisions]
  );

  function reset() {
    setAnswers({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica guiada</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>Banco de gestión del tiempo IELTS Reading</h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            Decide cuándo resolver, marcar o saltar. La meta es proteger puntos, no sentir que cada pregunta recibe el mismo tiempo.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reiniciar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Sets', value: String(practiceSets.length), sub: 'escenarios' },
          { label: 'Decisiones', value: String(decisions.length), sub: 'resolver · marcar · saltar' },
          { label: 'Regla', value: 'retorno', sub: 'evidencia antes de orgullo' },
        ].map((item) => (
          <article key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
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
            width: `${Math.round((answeredCount / decisions.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {practiceSets.map((practiceSet, setIndex) => (
          <section key={practiceSet.id} style={{ display: 'grid', gap: '0.9rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, background: 'var(--bg)' }}>
              <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 900 }}>
                Set {setIndex + 1} · {practiceSet.timeTarget}
              </p>
              <h3 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{practiceSet.title}</h3>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                {practiceSet.instructions}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: '0.65rem' }}>
                {practiceSet.passageMap.map((item) => (
                  <article key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
                    <p style={{ margin: '0 0 0.25rem', color: accent, fontFamily: 'var(--mono)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
                    <h4 style={{ margin: '0 0 0.3rem', color: 'var(--ink)', fontSize: '0.9rem' }}>{item.timeBudget}</h4>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.82rem' }}>{item.purpose}</p>
                  </article>
                ))}
              </div>
            </article>

            {practiceSet.decisions.map((decision, index) => {
          const selected = answers[decision.id];
          const locked = selected !== undefined;
          const isCorrectSelection = selected === decision.answer;

          return (
            <article key={decision.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Set {setIndex + 1} · Decisión {index + 1}
                </span>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  {decision.questionType}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.65rem', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)', marginBottom: '0.75rem' }}>
                <Clock3 size={18} style={{ color: accent, marginTop: 2 }} />
                <div>
                  <p style={{ margin: '0 0 0.35rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>
                    {decision.prompt}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>
                    Señal: {decision.signal}
                  </p>
                </div>
              </div>

              <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>
                ¿Qué decisión protege mejor tu puntaje?
              </h3>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {decision.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === decision.answer;
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
                      onClick={() => setAnswers((current) => ({ ...current, [decision.id]: optionIndex }))}
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
                      <strong>{isCorrectSelection ? 'Correcto.' : `Mejor decisión: ${LETTERS[decision.answer]}.`}</strong>{' '}
                      {decision.explanation}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {decision.trap}
                  </p>
                </div>
              )}
            </article>
          );
            })}
          </section>
        ))}
      </div>

      {answeredCount === decisions.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>
            Resultado: {correctCount}/{decisions.length} decisiones eficientes
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            En IELTS Reading, el tiempo no se ahorra leyendo menos; se ahorra decidiendo mejor cuándo leer profundo, cuándo marcar y cuándo avanzar.
          </p>
        </div>
      )}
    </section>
  );
}
