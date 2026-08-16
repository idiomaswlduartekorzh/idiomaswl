'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, LocateFixed, RotateCcw } from 'lucide-react';
import type { ScanningPracticeSet } from '@/data/practica-exams/seo-catalog';

export default function ScanningPracticeEngine({
  practice,
  accent = '#0369a1',
}: {
  practice: ScanningPracticeSet;
  accent?: string;
}) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const revealedCount = useMemo(
    () => practice.targets.filter((target) => revealed[target.id]).length,
    [practice.targets, revealed]
  );

  function reset() {
    setRevealed({});
  }

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Guided practice</p>
          <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>{practice.title}</h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
            {practice.instructions}
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { label: 'Target', value: practice.timeTarget },
          { label: 'Action', value: 'locate evidence' },
          { label: 'Rule', value: 'read one sentence around it' },
        ].map((item) => (
          <div key={item.label} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
            <p style={{ margin: '0 0 0.25rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 900 }}>{item.label}</p>
            <strong style={{ color: accent, lineHeight: 1.35 }}>{item.value}</strong>
          </div>
        ))}
      </div>

      <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: `4px solid ${accent}`, marginBottom: '1rem', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', color: accent, marginBottom: '0.45rem' }}>
          <LocateFixed size={17} />
          <p style={{ margin: 0, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
            Scan for signals
          </p>
        </div>
        <h3 style={{ margin: '0 0 0.6rem', color: 'var(--ink)', fontSize: '1.05rem' }}>{practice.passageTitle}</h3>
        <div style={{ whiteSpace: 'pre-line', color: 'var(--ink-2)', lineHeight: 1.82 }}>{practice.passage}</div>
      </article>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round((revealedCount / practice.targets.length) * 100)}%`,
            background: accent,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {practice.targets.map((target, index) => {
          const isRevealed = Boolean(revealed[target.id]);

          return (
            <article key={target.id} className="wl-card" style={{ padding: '1rem', borderRadius: 14, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
                <span style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Target {index + 1}
                </span>
                <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem' }}>
                  scan for: {target.scanFor}
                </span>
              </div>

              <h3 style={{ margin: '0 0 0.7rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>{target.question}</h3>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setRevealed((current) => ({ ...current, [target.id]: true }))}
                disabled={isRevealed}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <LocateFixed size={15} />
                {isRevealed ? 'Evidence revealed' : 'Reveal evidence'}
              </button>

              {isRevealed && (
                <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.65rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.55rem', alignItems: 'start', color: 'var(--wl-on-panel-ok, #047857)', background: 'rgba(5,150,105,0.08)', borderRadius: 12, padding: '0.7rem', fontSize: '0.88rem', lineHeight: 1.55 }}>
                    <CheckCircle2 size={18} />
                    <span>
                      <strong>Answer: {target.answer}.</strong> Evidence: “{target.evidence}”.
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                    {target.explanation}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trap:</strong> {target.trap}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {revealedCount === practice.targets.length && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 14, background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.18rem' }}>Routine complete</h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
            Repeat the passage without revealing answers: read the target, locate the signal, inspect one sentence around it and confirm that your answer matches the exact question.
          </p>
        </div>
      )}
    </section>
  );
}
