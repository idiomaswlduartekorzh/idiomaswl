'use client';

import { useEffect, useRef, useState } from 'react';
import { useSound } from './useSound';

// ── StreakBar ──────────────────────────────────────────────────────────────────
// Floating streak counter. Call .correct() / .wrong() from parent.
// Milestones: 3 = pulse, 5 = fire + sound, 10 = gold

interface Props {
  streak: number;
}

export default function StreakBar({ streak }: Props) {
  const [visible, setVisible] = useState(false);
  const [burst, setBurst] = useState(false);
  const { streak: playStreak } = useSound();
  const prevRef = useRef(0);

  useEffect(() => {
    setVisible(streak >= 2);

    if (streak > prevRef.current && streak >= 5 && streak % 5 === 0) {
      playStreak();
      setBurst(true);
      setTimeout(() => setBurst(false), 700);
    }
    prevRef.current = streak;
  }, [streak]);

  if (!visible) return null;

  const color = streak >= 10 ? '#f59e0b' : streak >= 5 ? '#ef4444' : '#6c63ff';
  const emoji = streak >= 10 ? '⭐' : streak >= 5 ? '🔥' : '✨';
  const label = streak >= 10 ? '¡En llamas!' : streak >= 5 ? '¡Racha!' : 'Racha';

  return (
    <>
      <style>{`
        @keyframes streak-in {
          from { opacity:0; transform: scale(0.7) translateY(-8px) }
          to   { opacity:1; transform: scale(1) translateY(0) }
        }
        @keyframes streak-burst {
          0%   { transform: scale(1) }
          30%  { transform: scale(1.3) }
          60%  { transform: scale(0.92) }
          100% { transform: scale(1) }
        }
        .streak-pill { animation: streak-in 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .streak-burst { animation: streak-burst 0.5s cubic-bezier(0.34,1.56,0.64,1); }
      `}</style>
      <div
        className={`streak-pill ${burst ? 'streak-burst' : ''}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: `${color}18`,
          border: `1.5px solid ${color}40`,
          borderRadius: 100,
          padding: '5px 14px',
          color,
          fontSize: 13,
          fontWeight: 700,
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: 16 }}>{emoji}</span>
        <span>{streak}</span>
        <span style={{ fontWeight: 400, opacity: 0.8 }}>{label}</span>
      </div>
    </>
  );
}
