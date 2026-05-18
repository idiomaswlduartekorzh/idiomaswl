'use client';

import { useEffect, useState } from 'react';
import { useSound } from './useSound';

// ── AnimatedBlock ──────────────────────────────────────────────────────────────
// The core visual unit of the Hangul system — a syllable block that assembles
// on screen. Consonant enters from top, vowel from right, batchim from bottom.
// Each step plays a click. Used everywhere a block appears.

interface Props {
  consonant: string;        // initial consonant
  vowel: string;            // vowel
  batchim?: string;         // optional final consonant
  result: string;           // assembled block (e.g. "나")
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  autoPlay?: boolean;       // animate on mount
  onComplete?: () => void;  // called when assembly finishes
  showResult?: boolean;     // skip animation, just show result
}

const SIZES = {
  sm: { cell: 44, result: 52, font: 22, resultFont: 28 },
  md: { cell: 60, result: 72, font: 30, resultFont: 40 },
  lg: { cell: 72, result: 88, font: 36, resultFont: 52 },
};

export default function AnimatedBlock({
  consonant, vowel, batchim, result,
  size = 'md', color = '#6c63ff',
  autoPlay = true, onComplete, showResult = false,
}: Props) {
  const s = SIZES[size];
  const { assemble } = useSound();

  // Assembly steps: 0=nothing, 1=consonant, 2=vowel, 3=batchim(if any), 4=result
  const totalSteps = batchim ? 4 : 3;
  const [step, setStep] = useState(showResult ? totalSteps : 0);

  useEffect(() => {
    if (!autoPlay || showResult) return;
    const timings = [300, 500, 700, batchim ? 900 : 700];
    const timers: ReturnType<typeof setTimeout>[] = [];

    timings.slice(0, totalSteps + 1).forEach((delay, i) => {
      timers.push(setTimeout(() => {
        setStep(i + 1);
        if (i < totalSteps - 1) assemble();
        if (i === totalSteps - 1) {
          // final step — play complete click
          setTimeout(() => assemble(), 60);
          setTimeout(() => onComplete?.(), 200);
        }
      }, delay));
    });
    return () => timers.forEach(clearTimeout);
  }, [autoPlay, showResult]);

  const visible = (n: number) => step >= n;
  const entering = (n: number) => step === n;

  const cellStyle = (n: number, offset: { x: number; y: number }, label: string, bg: string): React.CSSProperties => ({
    width: s.cell, height: s.cell,
    borderRadius: 8,
    background: visible(n) ? bg : 'transparent',
    border: visible(n) ? `2px solid ${color}` : '2px dashed var(--line-soft)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: s.font,
    fontFamily: "'Noto Sans KR', sans-serif",
    color: visible(n) ? color : 'var(--line-soft)',
    fontWeight: 700,
    transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
    transform: visible(n)
      ? 'scale(1) translate(0,0)'
      : `scale(0.6) translate(${offset.x}px,${offset.y}px)`,
    opacity: visible(n) ? 1 : 0,
    position: 'relative',
  });

  if (step >= totalSteps) {
    // Show assembled result block
    return (
      <div style={{
        width: s.result, height: s.result,
        borderRadius: 12,
        background: `${color}12`,
        border: `2px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: s.resultFont,
        fontFamily: "'Noto Sans KR', sans-serif",
        color,
        fontWeight: 800,
        animation: entering(totalSteps) ? 'wl-pop-block 0.38s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
      }}>
        <style>{`
          @keyframes wl-pop-block {
            0%{ transform: scale(0.5); opacity:0 }
            60%{ transform: scale(1.12); opacity:1 }
            100%{ transform: scale(1); opacity:1 }
          }
        `}</style>
        {result}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <style>{`
        @keyframes wl-pop-block {
          0%{ transform: scale(0.5); opacity:0 }
          60%{ transform: scale(1.12); opacity:1 }
          100%{ transform: scale(1); opacity:1 }
        }
      `}</style>

      {/* Consonant row */}
      <div style={{ display: 'flex', gap: 4 }}>
        {/* consonant cell */}
        <div style={cellStyle(1, { x: 0, y: -20 }, consonant, `${color}10`)}>
          {visible(1) ? consonant : ''}
        </div>
        {/* vowel cell — beside consonant */}
        <div style={cellStyle(2, { x: 20, y: 0 }, vowel, 'rgba(5,150,105,0.1)')}>
          {visible(2) ? <span style={{ color: '#059669' }}>{vowel}</span> : ''}
        </div>
      </div>

      {/* Batchim row */}
      {batchim && (
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ ...cellStyle(3, { x: 0, y: 20 }, batchim, 'rgba(220,38,38,0.08)'), borderColor: visible(3) ? '#dc2626' : 'var(--line-soft)' }}>
            {visible(3) ? <span style={{ color: '#dc2626' }}>{batchim}</span> : ''}
          </div>
          <div style={{ width: s.cell, height: s.cell }} /> {/* spacer */}
        </div>
      )}
    </div>
  );
}
