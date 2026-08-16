'use client';

import { useCallback, useRef, useState } from 'react';
import { useSound } from './useSound';

// ── AnswerButton ───────────────────────────────────────────────────────────────
// The universal interaction atom. Every question in every stage uses this.
// States: idle → selected (pending) → correct | wrong
// Handles: audio, animation, visual feedback — all in one place.

export type AnswerState = 'idle' | 'selected' | 'correct' | 'wrong' | 'disabled';

interface Props {
  label: string;
  sublabel?: string;
  state?: AnswerState;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  accent?: string;  // override color for themed contexts
  isKorean?: boolean;
}

const SIZE = {
  sm: { padding: '10px 16px', fontSize: 13, minHeight: 44 },
  md: { padding: '14px 20px', fontSize: 15, minHeight: 54 },
  lg: { padding: '18px 24px', fontSize: 18, minHeight: 64 },
};

export default function AnswerButton({
  label,
  sublabel,
  state = 'idle',
  onClick,
  size = 'md',
  accent,
  isKorean = false,
}: Props) {
  const [pressing, setPressing] = useState(false);
  const { correct: playCorrect, wrong: playWrong } = useSound();
  const pressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDisabled = state === 'disabled' || state === 'correct' || state === 'wrong';

  const handleClick = useCallback(() => {
    if (isDisabled || !onClick) return;
    onClick();
  }, [isDisabled, onClick]);

  const handlePointerDown = () => {
    if (isDisabled) return;
    setPressing(true);
    pressRef.current = setTimeout(() => setPressing(false), 120);
  };

  const handlePointerUp = () => {
    setPressing(false);
    if (pressRef.current) clearTimeout(pressRef.current);
  };

  // ── Derive visual style from state ──────────────────────────────────────────
  const styles: Record<AnswerState, React.CSSProperties> = {
    idle: {
      background: 'var(--bg-2)',
      border: '1.5px solid var(--line-soft)',
      color: 'var(--ink)',
    },
    selected: {
      background: accent ? `${accent}12` : 'rgba(108,99,255,0.1)',
      border: `1.5px solid ${accent ?? '#6c63ff'}`,
      color: accent ?? '#6c63ff',
    },
    correct: {
      background: 'rgba(5,150,105,0.12)',
      border: '1.5px solid #059669',
      color: 'var(--wl-on-panel-ok, #059669)',
    },
    wrong: {
      background: 'rgba(220,38,38,0.08)',
      border: '1.5px solid #dc2626',
      color: 'var(--wl-on-panel-alert, #dc2626)',
    },
    disabled: {
      background: 'var(--bg-2)',
      border: '1.5px solid var(--line-soft)',
      color: 'var(--muted)',
      opacity: 0.4,
    },
  };

  const icon: Record<AnswerState, string> = {
    idle: '',
    selected: '',
    correct: ' ✓',
    wrong: ' ✗',
    disabled: '',
  };

  const animClass =
    state === 'wrong'
      ? 'wl-shake'
      : state === 'correct'
      ? 'wl-pop'
      : pressing
      ? 'wl-press'
      : '';

  return (
    <>
      <style>{`
        @keyframes wl-shake {
          0%,100%{ transform: translateX(0) }
          20%{ transform: translateX(-6px) }
          40%{ transform: translateX(6px) }
          60%{ transform: translateX(-4px) }
          80%{ transform: translateX(4px) }
        }
        @keyframes wl-pop {
          0%{ transform: scale(1) }
          40%{ transform: scale(1.06) }
          70%{ transform: scale(0.97) }
          100%{ transform: scale(1) }
        }
        @keyframes wl-press {
          0%{ transform: scale(1) }
          100%{ transform: scale(0.97) }
        }
        .wl-shake { animation: wl-shake 0.38s ease; }
        .wl-pop   { animation: wl-pop   0.32s ease; }
        .wl-press { animation: wl-press 0.12s ease forwards; }
        .wl-answer-btn {
          transition: box-shadow 0.15s, opacity 0.15s;
        }
        .wl-answer-btn:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(108,99,255,0.18);
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        disabled={isDisabled}
        className={`wl-answer-btn ${animClass}`}
        style={{
          ...SIZE[size],
          ...styles[state],
          borderRadius: 12,
          cursor: isDisabled ? 'default' : 'pointer',
          fontWeight: 600,
          fontFamily: isKorean ? "'Noto Sans KR', sans-serif" : 'inherit',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          width: '100%',
          outline: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.18s, border-color 0.18s, color 0.18s, box-shadow 0.15s',
        }}
      >
        <span style={{ fontSize: SIZE[size].fontSize, lineHeight: 1.2 }}>
          {label}{icon[state]}
        </span>
        {sublabel && (
          <span style={{ fontSize: SIZE[size].fontSize * 0.72, color: state === 'idle' ? 'var(--muted)' : 'inherit', opacity: 0.8, fontFamily: 'inherit' }}>
            {sublabel}
          </span>
        )}
      </button>
    </>
  );
}
