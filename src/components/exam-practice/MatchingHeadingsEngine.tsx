'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, RotateCcw, XCircle } from 'lucide-react';
import type { MatchingHeadingsPassage } from '@/data/practica-exams/seo-catalog';

export default function MatchingHeadingsEngine({
  passage,
  accent = '#0369a1',
}: {
  passage: MatchingHeadingsPassage;
  accent?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const answered = Object.keys(answers).filter((key) => answers[key]).length;
  const correct = useMemo(
    () => passage.paragraphs.filter((paragraph) => answers[paragraph.id] === paragraph.answer).length,
    [answers, passage.paragraphs]
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

      <div className="wl-card" style={{ padding: '0.9rem', borderRadius: 14, background: 'var(--bg-2)', marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontWeight: 900 }}>Headings</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.45rem' }}>
          {passage.headingOptions.map((heading) => (
            <div key={heading.id} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: '0.5rem', alignItems: 'start', color: 'var(--ink-2)', fontSize: '0.88rem', lineHeight: 1.45 }}>
              <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900 }}>{heading.id}</span>
              <span>{heading.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round((answered / passage.paragraphs.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.9rem' }}>
        {passage.paragraphs.map((paragraph) => {
          const selected = answers[paragraph.id] ?? '';
          const locked = Boolean(selected);
          const isCorrect = selected === paragraph.answer;
          const correctHeading = passage.headingOptions.find((heading) => heading.id === paragraph.answer);
          const selectedHeading = passage.headingOptions.find((heading) => heading.id === selected);

          return (
            <article key={paragraph.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem' }}>{paragraph.label}</h3>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  {locked ? (isCorrect ? 'correcto' : 'revisar') : 'sin responder'}
                </span>
              </div>

              <p style={{ margin: '0 0 0.9rem', color: 'var(--ink-2)', lineHeight: 1.72 }}>{paragraph.text}</p>

              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  Elige heading
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
                    <span style={{ fontFamily: 'var(--mono)', marginRight: '0.35rem' }}>{selectedHeading?.id}.</span>
                    {selectedHeading?.text}
                  </div>
                ) : (
                  <select
                    value={selected}
                    onChange={(event) => setAnswers((current) => ({ ...current, [paragraph.id]: event.target.value }))}
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
                    {passage.headingOptions.map((heading) => (
                      <option key={heading.id} value={heading.id}>
                        {heading.id}. {heading.text}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowHints((current) => ({ ...current, [paragraph.id]: !current[paragraph.id] }))}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Lightbulb size={15} />
                  Ver trampa
                </button>
              </div>

              {showHints[paragraph.id] && (
                <p style={{ margin: '0.65rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                  {paragraph.trap}
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
                    <strong>{isCorrect ? 'Correcto.' : `Mejor heading: ${paragraph.answer}. ${correctHeading?.text ?? ''}.`}</strong>{' '}
                    {paragraph.explanation}
                  </span>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {answered === passage.paragraphs.length && !showResult && (
        <button className="btn btn-sm" type="button" onClick={() => setShowResult(true)} style={{ marginTop: '1rem' }}>
          Ver resultado
        </button>
      )}

      {showResult && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem' }}>
            {correct}/{passage.paragraphs.length} headings correctos
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Si elegiste headings por palabras repetidas, vuelve a leer la primera y última oración de cada párrafo. La respuesta debe resumir la función completa del párrafo.
          </p>
        </div>
      )}
    </section>
  );
}
