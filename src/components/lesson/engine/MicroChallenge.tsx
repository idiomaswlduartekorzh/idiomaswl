'use client';

import { useState, useCallback } from 'react';
import { useSound } from './useSound';
import AnswerButton, { type AnswerState } from './AnswerButton';

// ── MicroChallenge ─────────────────────────────────────────────────────────────
// The universal challenge unit. Embeds in any stage — capsules, family reviews,
// block builders, vocab checks. One component drives the full interaction loop:
// question → options → feedback → micro-reward → onPass()

interface Option {
  label: string;
  sublabel?: string;
  isKorean?: boolean;
}

interface Props {
  question: string;
  options: Option[];
  correctIndex: number;
  explanation?: string;      // shown after correct answer
  onPass: () => void;        // called when answered correctly
  accent?: string;           // theme color
  allowRetry?: boolean;      // default true — wrong answers can retry
  autoAdvanceMs?: number;    // auto-call onPass after correct (0 = manual)
}

type Phase = 'answering' | 'correct' | 'wrong';

export default function MicroChallenge({
  question,
  options,
  correctIndex,
  explanation,
  onPass,
  accent = '#6c63ff',
  allowRetry = true,
  autoAdvanceMs = 1200,
}: Props) {
  const [phase, setPhase] = useState<Phase>('answering');
  const [selected, setSelected] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const { correct: playCorrect, wrong: playWrong } = useSound();

  const handleSelect = useCallback((idx: number) => {
    if (phase !== 'answering') return;
    setSelected(idx);

    if (idx === correctIndex) {
      setPhase('correct');
      playCorrect();
      if (autoAdvanceMs > 0) {
        setTimeout(() => onPass(), autoAdvanceMs);
      }
    } else {
      setPhase('wrong');
      setAttempts(a => a + 1);
      playWrong();
      if (allowRetry) {
        setTimeout(() => {
          setPhase('answering');
          setSelected(null);
        }, 1100);
      }
    }
  }, [phase, correctIndex, playCorrect, playWrong, allowRetry, autoAdvanceMs, onPass]);

  function getState(idx: number): AnswerState {
    if (phase === 'answering') return selected === idx ? 'selected' : 'idle';
    if (phase === 'correct')  return idx === correctIndex ? 'correct' : 'disabled';
    if (phase === 'wrong')    return idx === selected ? 'wrong' : 'idle';
    return 'idle';
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Question */}
      <p style={{
        fontSize: 15, fontWeight: 600, color: 'var(--ink)',
        margin: '0 0 14px', lineHeight: 1.4,
      }}>
        {question}
      </p>

      {/* Attempts hint */}
      {attempts > 0 && phase === 'answering' && (
        <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>
          Intento {attempts + 1} — vuelve a intentarlo
        </p>
      )}

      {/* Options grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: options.length <= 2 ? '1fr 1fr' : options.length === 3 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
        gap: 8,
        marginBottom: 14,
      }}>
        {options.map((opt, i) => (
          <AnswerButton
            key={i}
            label={opt.label}
            sublabel={opt.sublabel}
            state={getState(i)}
            onClick={() => handleSelect(i)}
            isKorean={opt.isKorean}
            accent={accent}
            size="md"
          />
        ))}
      </div>

      {/* Feedback */}
      {phase === 'correct' && (
        <div style={{
          background: 'rgba(5,150,105,0.08)',
          border: '1px solid rgba(5,150,105,0.25)',
          borderRadius: 10, padding: '12px 16px',
          animation: 'wl-fade-up 0.3s ease',
        }}>
          <style>{`
            @keyframes wl-fade-up {
              from { opacity:0; transform: translateY(6px) }
              to   { opacity:1; transform: translateY(0) }
            }
          `}</style>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--wl-on-panel-ok, #059669)', fontWeight: 700 }}>
            ✅ Correcto
          </p>
          {explanation && (
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
              {explanation}
            </p>
          )}
          {autoAdvanceMs === 0 && (
            <button
              type="button"
              onClick={onPass}
              style={{ marginTop: 12, background: '#059669', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              Continuar →
            </button>
          )}
        </div>
      )}

      {phase === 'wrong' && !allowRetry && (
        <div style={{
          background: 'rgba(220,38,38,0.06)',
          border: '1px solid rgba(220,38,38,0.2)',
          borderRadius: 10, padding: '12px 16px',
        }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--wl-on-panel-alert, #dc2626)', fontWeight: 700 }}>
            No exactamente
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>
            La respuesta correcta era: <strong>{options[correctIndex].label}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
