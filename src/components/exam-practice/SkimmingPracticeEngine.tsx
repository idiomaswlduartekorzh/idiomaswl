'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, RotateCcw, Timer, XCircle } from 'lucide-react';
import type { SkimmingPracticeSet } from '@/data/practica-exams/seo-catalog';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function SkimmingPracticeEngine({
  practice,
  accent = '#0369a1',
}: {
  practice: SkimmingPracticeSet;
  accent?: string;
}) {
  const [summaryAnswer, setSummaryAnswer] = useState<number | null>(null);
  const [summaryChecked, setSummaryChecked] = useState(false);
  const [mapAnswers, setMapAnswers] = useState<Record<string, number>>({});
  const [mapChecked, setMapChecked] = useState<Record<string, boolean>>({});
  const [showPassage, setShowPassage] = useState(true);
  const [confirmReset, setConfirmReset] = useState(false);

  const mapCorrect = useMemo(
    () => practice.paragraphMap.filter((item) => mapChecked[item.id] && mapAnswers[item.id] === item.answer).length,
    [mapAnswers, mapChecked, practice.paragraphMap]
  );
  const answeredMap = practice.paragraphMap.filter((item) => mapChecked[item.id]).length;
  const summaryCorrect = summaryAnswer === practice.summaryQuestion.answer;

  function reset() {
    if ((summaryAnswer !== null || Object.keys(mapAnswers).length > 0) && !confirmReset) {
      setConfirmReset(true);
      return;
    }
    setSummaryAnswer(null);
    setSummaryChecked(false);
    setMapAnswers({});
    setMapChecked({});
    setShowPassage(true);
    setConfirmReset(false);
  }

  return (
    <section className="wl-card" data-active-practice="true" style={{ padding: '1rem', borderRadius: 8, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Guided practice</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>{practice.title}</h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            {practice.instructions}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost btn-sm" type="button" onClick={() => setShowPassage((value) => !value)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', minHeight: 44 }}>
            <Eye size={15} />
            {showPassage ? 'Hide passage' : 'Show passage'}
          </button>
          <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', minHeight: 44 }}>
            <RotateCcw size={15} />
            {confirmReset ? 'Press again to reset' : 'Reset'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Goal', value: 'passage map' },
          { label: 'Suggested time', value: practice.timeTarget },
          { label: 'Avoid', value: 'word-for-word translation' },
        ].map((item) => (
          <div key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 6, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <strong style={{ color: accent, lineHeight: 1.35 }}>{item.value}</strong>
          </div>
        ))}
      </div>

      {showPassage && (
        <article className="wl-card" style={{ padding: '1rem', borderRadius: 6, borderLeft: `4px solid ${accent}`, marginBottom: '1rem', background: 'var(--bg)' }}>
          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', color: accent, marginBottom: '0.45rem' }}>
            <Timer size={17} />
            <p style={{ margin: 0, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
              Skim first, answer after
            </p>
          </div>
          <h3 style={{ margin: '0 0 0.6rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{practice.passageTitle}</h3>
          <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.82 }}>{practice.passage}</div>
        </article>
      )}

      <article className="wl-card" style={{ padding: '1rem', borderRadius: 6, background: 'var(--bg)', marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 0.45rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
          Step 1 · global summary
        </p>
        <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>{practice.summaryQuestion.question}</h3>
        <fieldset style={{ display: 'grid', gap: '0.5rem', padding: 0, border: 0, margin: 0 }}>
          <legend style={{ position: 'absolute', width: 1, height: 1, padding: 0, border: 0, margin: -1, clipPath: 'inset(50%)', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            Choose the best global summary
          </legend>
          {practice.summaryQuestion.options.map((option, optionIndex) => {
            const locked = summaryChecked;
            const isCorrect = optionIndex === practice.summaryQuestion.answer;
            const isSelected = summaryAnswer === optionIndex;
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
              <label
                key={option}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '20px 28px 1fr',
                  gap: '0.6rem',
                  alignItems: 'start',
                  textAlign: 'left',
                  border,
                  background,
                  color,
                  borderRadius: 6,
                  padding: '0.65rem 0.75rem',
                  font: 'inherit',
                  lineHeight: 1.45,
                  cursor: locked ? 'default' : 'pointer',
                  minHeight: 48,
                }}
              >
                <input
                  type="radio"
                  name="skimming-global-summary"
                  value={optionIndex}
                  checked={isSelected}
                  disabled={locked}
                  onChange={() => {
                    setSummaryAnswer(optionIndex);
                    setConfirmReset(false);
                  }}
                  style={{ width: 18, height: 18, margin: '0.15rem 0 0' }}
                />
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 900, color: locked && isCorrect ? '#047857' : accent }}>
                  {LETTERS[optionIndex]}.
                </span>
                <span>{option}</span>
              </label>
            );
          })}
        </fieldset>

        {!summaryChecked && (
          <button type="button" className="btn btn-primary btn-sm" disabled={summaryAnswer === null} onClick={() => setSummaryChecked(true)} style={{ marginTop: '0.75rem', minHeight: 44 }}>
            Check global summary
          </button>
        )}

        {summaryChecked && (
          <div
            style={{
              marginTop: '0.75rem',
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              gap: '0.55rem',
              alignItems: 'start',
              color: summaryCorrect ? '#047857' : '#b91c1c',
              background: summaryCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
              borderRadius: 6,
              padding: '0.7rem',
              fontSize: '0.88rem',
              lineHeight: 1.55,
            }}
          >
            {summaryCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <span>
              <strong>{summaryCorrect ? 'Correct.' : `Correct answer: ${LETTERS[practice.summaryQuestion.answer]}.`}</strong>{' '}
              {practice.summaryQuestion.explanation}
            </span>
          </div>
        )}

        {summaryChecked && !summaryCorrect && (
          <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.4rem' }}>
            {practice.summaryQuestion.traps.map((trap) => (
              <p key={trap} style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.86rem' }}>
                {trap}
              </p>
            ))}
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setSummaryAnswer(null); setSummaryChecked(false); }} style={{ justifySelf: 'start', minHeight: 44 }}>
              Try the summary again
            </button>
          </div>
        )}
      </article>

      <article className="wl-card" style={{ padding: '1rem', borderRadius: 6, background: 'var(--bg)' }}>
        <p style={{ margin: '0 0 0.45rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
          Step 2 · paragraph map
        </p>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {practice.paragraphMap.map((item) => {
            const selected = mapAnswers[item.id];
            const locked = Boolean(mapChecked[item.id]);

            return (
              <section key={item.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 6, padding: '0.85rem', background: 'var(--bg-2)' }}>
                <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '0.98rem' }}>{item.label}</h3>
                <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{item.text}</p>
                <fieldset style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.45rem', padding: 0, border: 0, margin: 0 }}>
                  <legend style={{ position: 'absolute', width: 1, height: 1, padding: 0, border: 0, margin: -1, clipPath: 'inset(50%)', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    Choose the writer action for {item.label}
                  </legend>
                  {item.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === item.answer;
                    const isSelected = selected === optionIndex;
                    let border = '1px solid var(--line-soft)';
                    let background = 'var(--bg)';
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
                      <label
                        key={option}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '20px 1fr',
                          gap: '0.5rem',
                          alignItems: 'start',
                          border,
                          background,
                          color,
                          borderRadius: 6,
                          padding: '0.55rem 0.65rem',
                          font: 'inherit',
                          textAlign: 'left',
                          cursor: locked ? 'default' : 'pointer',
                          lineHeight: 1.35,
                          minHeight: 48,
                        }}
                      >
                        <input
                          type="radio"
                          name={`skimming-map-${item.id}`}
                          value={optionIndex}
                          checked={isSelected}
                          disabled={locked}
                          onChange={() => {
                            setMapAnswers((current) => ({ ...current, [item.id]: optionIndex }));
                            setConfirmReset(false);
                          }}
                          style={{ width: 18, height: 18, margin: '0.1rem 0 0' }}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </fieldset>
                {!locked && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={selected === undefined}
                    onClick={() => setMapChecked((current) => ({ ...current, [item.id]: true }))}
                    style={{ marginTop: '0.65rem', minHeight: 44 }}
                  >
                    Check paragraph role
                  </button>
                )}
                {locked && (
                  <div role="status" style={{ marginTop: '0.65rem', color: selected === item.answer ? '#047857' : '#b91c1c', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <p style={{ margin: 0 }}>{item.explanation}</p>
                    {selected !== item.answer && (
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setMapAnswers((current) => { const next = { ...current }; delete next[item.id]; return next; }); setMapChecked((current) => ({ ...current, [item.id]: false })); }} style={{ marginTop: '0.5rem', minHeight: 44 }}>
                        Try this paragraph again
                      </button>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {answeredMap === practice.paragraphMap.length && (
          <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 6, background: `${accent}10`, border: `1px solid ${accent}30` }}>
            <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>
              Map: {mapCorrect}/{practice.paragraphMap.length} paragraph roles correct
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
              If an answer was wrong, return to each opening sentence and direction-change connector. Skimming improves when you name the paragraph’s role, not when you translate more words.
            </p>
          </div>
        )}
      </article>
      <p style={{ margin: '1rem 0 0', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
        <strong>Source boundary:</strong> This original WeLearn exercise is grounded in US EPA explanations of heat islands and vegetation.{` `}
        <a href="https://www.epa.gov/heatislands" target="_blank" rel="noopener noreferrer" style={{ color: accent, fontWeight: 800 }}>
          Review the primary source <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, border: 0, margin: -1, clipPath: 'inset(50%)', overflow: 'hidden', whiteSpace: 'nowrap' }}>(opens in a new tab)</span>
        </a>.
      </p>
    </section>
  );
}
