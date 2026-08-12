'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, LocateFixed, RotateCcw, XCircle } from 'lucide-react';
import type { SkimScanTransferSet } from '@/data/practica-exams/seo-catalog';

export default function SkimScanTransferEngine({
  practice,
  practices,
  accent = '#0369a1',
}: {
  practice?: SkimScanTransferSet;
  practices?: SkimScanTransferSet[];
  accent?: string;
}) {
  const [moves, setMoves] = useState<Record<string, 'skim' | 'scan'>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const practiceSets = practices ?? (practice ? [practice] : []);
  const tasks = practiceSets.flatMap((item) => item.tasks);

  const correctMoves = useMemo(
    () => tasks.filter((task) => moves[task.id] === task.firstMove).length,
    [moves, tasks]
  );
  const attemptedMoves = Object.keys(moves).length;
  const revealedCount = tasks.filter((task) => revealed[task.id]).length;

  function reset() {
    setMoves({});
    setRevealed({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Skimming + scanning transfer</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: 0 }}>
            From passage map to evidence
          </h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            Decide when to begin with skimming and when to begin with scanning. Every set asks you to choose, justify and reveal the evidence.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, marginBottom: '1rem', background: 'var(--bg)' }}>
        <h3 style={{ margin: '0 0 0.5rem', color: 'var(--ink)', fontSize: '1.05rem' }}>How to use this practice bank</h3>
        <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
          If the question asks about function, location or overall purpose, start with skimming. If it provides a concrete signal such as a date, figure, name or limiting phrase, start with scanning.
        </p>
      </article>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.75rem', marginBottom: '1.2rem' }}>
        {[
          { label: 'Correct decisions', value: `${correctMoves}/${tasks.length}` },
          { label: 'Questions attempted', value: `${attemptedMoves}/${tasks.length}` },
          { label: 'Evidence revealed', value: `${revealedCount}/${tasks.length}` },
        ].map((item) => (
          <div key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <strong style={{ color: accent, lineHeight: 1.35 }}>{item.value}</strong>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {practiceSets.map((practiceSet, setIndex) => (
          <section key={practiceSet.id} style={{ display: 'grid', gap: '0.85rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, background: 'var(--bg)' }}>
              <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                Set {setIndex + 1}
              </p>
              <h3 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{practiceSet.title}</h3>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                {practiceSet.instructions}
              </p>
              <p style={{ margin: '0 0 0.75rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                <strong style={{ color: 'var(--ink)' }}>Target time:</strong> {practiceSet.timeTarget}
              </p>
              <h4 style={{ margin: '0 0 0.65rem', color: 'var(--ink)', fontSize: '0.98rem' }}>{practiceSet.passageTitle}</h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {practiceSet.passage.map((paragraph) => (
                  <section key={`${practiceSet.id}-${paragraph.id}`} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.85rem', background: 'var(--bg-2)' }}>
                    <p style={{ margin: '0 0 0.35rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                      {paragraph.label} · {paragraph.function}
                    </p>
                    <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.7 }}>{paragraph.text}</p>
                  </section>
                ))}
              </div>
            </article>

            {practiceSet.tasks.map((task, index) => {
              const selectedMove = moves[task.id];
              const locked = selectedMove !== undefined;
              const isCorrect = selectedMove === task.firstMove;
              const isRevealed = Boolean(revealed[task.id]);

              return (
                <article key={task.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
                  <p style={{ margin: '0 0 0.4rem', color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Set {setIndex + 1} · Question {index + 1}
                  </p>
                  <h3 style={{ margin: '0 0 0.75rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>{task.question}</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.55rem', marginBottom: locked ? '0.75rem' : 0 }}>
                    {[
                      { key: 'skim' as const, label: 'Start with skimming', icon: <Eye size={16} /> },
                      { key: 'scan' as const, label: 'Start with scanning', icon: <LocateFixed size={16} /> },
                    ].map((option) => {
                      const selected = selectedMove === option.key;
                      let border = '1px solid var(--line-soft)';
                      let background = 'var(--bg-2)';
                      let color = 'var(--ink)';

                      if (locked && option.key === task.firstMove) {
                        border = '1px solid #059669';
                        background = 'rgba(5,150,105,0.1)';
                        color = '#047857';
                      }
                      if (locked && selected && !isCorrect) {
                        border = '1px solid #dc2626';
                        background = 'rgba(220,38,38,0.1)';
                        color = '#b91c1c';
                      }

                      return (
                        <button
                          key={option.key}
                          type="button"
                          disabled={locked}
                          onClick={() => setMoves((current) => ({ ...current, [task.id]: option.key }))}
                          style={{
                            border,
                            background,
                            color,
                            borderRadius: 12,
                            padding: '0.65rem 0.75rem',
                            font: 'inherit',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            justifyContent: 'center',
                            cursor: locked ? 'default' : 'pointer',
                          }}
                        >
                          {option.icon}
                          {option.label}
                        </button>
                      );
                    })}
                  </div>

                  {locked && (
                    <div style={{ display: 'grid', gap: '0.65rem' }}>
                      <div
                        style={{
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
                          <strong>{isCorrect ? 'Strong first move.' : `Start with ${task.firstMove}.`}</strong>{' '}
                          {task.explanation}
                        </span>
                      </div>

                      <button
                        className="btn btn-ghost btn-sm"
                        type="button"
                        onClick={() => setRevealed((current) => ({ ...current, [task.id]: true }))}
                        disabled={isRevealed}
                        style={{ justifySelf: 'start', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <LocateFixed size={15} />
                        {isRevealed ? 'Evidence revealed' : 'Reveal paragraph and signal'}
                      </button>

                      {isRevealed && (
                        <div style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.8rem', background: 'var(--bg-2)', display: 'grid', gap: '0.45rem' }}>
                          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                            <strong style={{ color: 'var(--ink)' }}>Paragraph:</strong> {task.paragraphAnswer}
                          </p>
                          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                            <strong style={{ color: 'var(--ink)' }}>Signal:</strong> {task.signalAnswer}
                          </p>
                          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                            <strong style={{ color: 'var(--ink)' }}>Evidence:</strong> “{task.evidence}”.
                          </p>
                          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                            <strong style={{ color: 'var(--ink)' }}>Trap:</strong> {task.trap}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ))}
      </div>
    </section>
  );
}
