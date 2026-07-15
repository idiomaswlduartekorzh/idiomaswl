'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, RotateCcw, XCircle } from 'lucide-react';
import type { MatchingFeaturesPassage } from '@/data/practica-exams/seo-catalog';

export default function MatchingFeaturesEngine({
  passage,
  accent = '#0369a1',
}: {
  passage: MatchingFeaturesPassage;
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const answered = Object.keys(answers).filter((key) => answers[key]).length;
  const correct = useMemo(
    () => passage.questions.filter((question) => answers[question.id] === question.answer).length,
    [answers, passage.questions]
  );

  function reset() {
    setAnswers({});
    setShowHints({});
    setShowResult(false);
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Práctica guiada</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>{passage.title}</h2>
          <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.92rem' }}>{passage.instructions}</p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reiniciar
        </button>
      </div>

      <div className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg-2)', marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontWeight: 900 }}>Features</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: '0.6rem' }}>
          {passage.features.map((feature) => (
            <div key={feature.id} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: '0.55rem', alignItems: 'start', color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.45 }}>
              <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900 }}>{feature.id}</span>
              <span>
                <strong style={{ display: 'block', color: 'var(--ink)', fontSize: '0.92rem' }}>{feature.label}</strong>
                <span style={{ color: 'var(--muted)', fontSize: '0.84rem' }}>{feature.description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)', marginBottom: '1rem', borderLeft: `4px solid ${accent}` }}>
        <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Reading passage</p>
        <h2 style={{ margin: '0 0 0.7rem', color: 'var(--ink)', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>{passage.passageTitle}</h2>
        <div style={{ color: 'var(--ink-2)', lineHeight: 1.82, whiteSpace: 'pre-line' }}>{passage.passage}</div>
      </section>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round((answered / passage.questions.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {passage.questions.map((question, index) => {
          const selected = answers[question.id] ?? '';
          const locked = Boolean(selected);
          const isCorrect = selected === question.answer;
          const correctFeature = passage.features.find((feature) => feature.id === question.answer);
          const selectedFeature = passage.features.find((feature) => feature.id === selected);

          return (
            <article key={question.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Statement {index + 1}
                </span>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  {locked ? (isCorrect ? 'correcto' : 'revisar') : 'sin responder'}
                </span>
              </div>

              <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.5 }}>
                {question.statement}
              </h3>

              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  Elige feature
                </span>
                {locked ? (
                  <div
                    style={{
                      width: '100%',
                      border: `1px solid ${isCorrect ? '#059669' : '#dc2626'}`,
                      borderRadius: 10,
                      padding: '0.65rem 0.75rem',
                      background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                      color: isCorrect ? '#047857' : '#b91c1c',
                      lineHeight: 1.45,
                      fontWeight: 800,
                    }}
                  >
                    <span style={{ fontFamily: 'var(--mono)', marginRight: '0.35rem' }}>{selectedFeature?.id}.</span>
                    {selectedFeature?.label}
                  </div>
                ) : (
                  <select
                    value={selected}
                    onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                    style={{
                      width: '100%',
                      border: '1px solid var(--line-soft)',
                      borderRadius: 10,
                      padding: '0.65rem 0.75rem',
                      background: 'var(--bg-2)',
                      color: 'var(--ink)',
                      font: 'inherit',
                    }}
                  >
                    <option value="">Selecciona una opción</option>
                    {passage.features.map((feature) => (
                      <option key={feature.id} value={feature.id}>
                        {feature.id}. {feature.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowHints((current) => ({ ...current, [question.id]: !current[question.id] }))}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Lightbulb size={15} />
                  Ver trampa
                </button>
              </div>

              {showHints[question.id] && (
                <p style={{ margin: '0.65rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                  {question.trap}
                </p>
              )}

              {locked && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    display: 'grid',
                    gridTemplateColumns: '24px 1fr',
                    gap: '0.55rem',
                    alignItems: 'start',
                    color: isCorrect ? '#047857' : '#b91c1c',
                    background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                    borderRadius: 12,
                    padding: '0.7rem',
                    fontSize: '0.88rem',
                    lineHeight: 1.55,
                  }}
                >
                  {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  <span>
                    <strong>{isCorrect ? 'Correcto.' : `Respuesta correcta: ${question.answer}. ${correctFeature?.label ?? ''}.`}</strong>{' '}
                    {question.explanation}
                  </span>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {answered === passage.questions.length && !showResult && (
        <button className="btn btn-sm" type="button" onClick={() => setShowResult(true)} style={{ marginTop: '1rem' }}>
          Ver resultado
        </button>
      )}

      {showResult && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem' }}>
            {correct}/{passage.questions.length} matches correctos
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Si fallaste, revisa si elegiste la feature por cercanía de palabras. En Matching Features, la respuesta depende de qué acción, claim o resultado se asocia con cada persona o grupo.
          </p>
        </div>
      )}
    </section>
  );
}
