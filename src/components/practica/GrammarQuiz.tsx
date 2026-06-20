'use client';

import { useState } from 'react';
import { saveSkillCompletion } from '@/lib/progress';
import type { GQItem } from '@/data/practica/ingles-a1-gramatica';

interface Props {
  questions: GQItem[];
  lang: string;
  level: string;
  skill: string;     // 'gramatica'
  color: string;
}

export default function GrammarQuiz({ questions, lang, level, skill, color }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);

  const total = questions.length;
  const done = Object.keys(answers).length;
  const correct = questions.filter((q, i) => answers[i] === q.a).length;

  function pick(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  function reset() {
    setAnswers({});
    setRevealed({});
    setShowResult(false);
    setXpEarned(null);
  }

  function handleShowResult() {
    const score = Math.round((correct / total) * 100);
    const earned = saveSkillCompletion(lang, level, skill, score);
    setXpEarned(earned);
    setShowResult(true);
  }

  return (
    <div>
      {/* Progress */}
      {done > 0 && !showResult && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: color, borderRadius: 4, transition: 'width 0.4s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexShrink: 0 }}>{done}/{total}</span>
        </div>
      )}

      {/* Questions */}
      {!showResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {questions.map((q, qi) => {
            const ans = answers[qi];
            const isDone = ans !== undefined;
            const longOpts = q.opts.some(o => o.length > 16);
            return (
              <div key={qi} className="wl-card" style={{ padding: '1.25rem' }}>
                <p style={{ margin: '0 0 0.85rem', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.7 }}>
                  {qi + 1}. {q.s.split('___').map((part, i, arr) => (
                    <span key={i}>{part}{i < arr.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 80, borderBottom: `2px solid ${color}`, margin: '0 4px', verticalAlign: 'bottom' }}>
                        {isDone && <span style={{ fontSize: '0.88rem', fontWeight: 800, color: answers[qi] === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flexDirection: longOpts ? 'column' : 'row' }}>
                  {q.opts.map((opt, oi) => {
                    const isCorrect = oi === q.a; const isSelected = ans === oi;
                    let bg = 'var(--bg-2)'; let border = `1px solid var(--line-soft)`; let color2 = 'var(--ink)';
                    if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color2 = '#059669'; }
                    if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color2 = '#dc2626'; }
                    return (
                      <button key={oi} onClick={() => pick(qi, oi)} disabled={isDone}
                        style={{ padding: longOpts ? '0.6rem 0.9rem' : '0.5rem 1.1rem', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700, border, background: bg, color: color2, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', textAlign: longOpts ? 'left' : 'center', width: longOpts ? '100%' : 'auto' }}>
                        {longOpts && <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', opacity: 0.55, marginRight: '0.5rem' }}>{String.fromCharCode(65 + oi)}.</span>}{opt}
                      </button>
                    );
                  })}
                </div>
                {revealed[qi] && (
                  <div style={{ marginTop: '0.65rem', fontSize: '0.82rem', color: 'var(--ink-2)', padding: '0.5rem 0.75rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)' }}>
                    {ans === q.a ? '✅ ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
          {done === total && (
            <button className="btn btn-sm" onClick={handleShowResult} style={{ background: color, borderColor: color }}>
              Ver mi resultado →
            </button>
          )}
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {correct === total ? '🏆' : correct >= total * 0.7 ? '⭐' : '📖'}
          </div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{correct} / {total} correctas</h2>
          {xpEarned !== null && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', margin: '0 0 0.75rem', padding: '0.35rem 0.85rem', borderRadius: 20, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)' }}>
                +{xpEarned} XP ⚡
              </span>
            </div>
          )}
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
            {correct === total ? '¡Perfecto! Dominas este tema.' : correct >= total * 0.7 ? 'Muy bien. Repasa los errores y vuelve a intentarlo.' : 'Estudia la explicación de arriba y practica de nuevo.'}
          </p>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={reset} style={{ background: color, borderColor: color }}>Intentar de nuevo</button>
          </div>
        </div>
      )}
    </div>
  );
}
