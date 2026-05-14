'use client';

import { useState } from 'react';
import Link from 'next/link';
import StageRail from './StageRail';
import StagePanel from './StagePanel';

const TOTAL = 11;

const STAGE_LABELS: Record<number, string> = {
  1: 'Activación', 2: 'Adquisición guiada', 3: 'Reconocimiento',
  4: 'Escucha sobrevivible', 5: 'Contexto primero', 6: 'Descubre el patrón',
  7: 'Micro explicación', 8: 'Producción guiada', 9: 'Interacción reactiva',
  10: 'Smart Review', 11: 'Cierre y siguiente paso',
};

interface LessonRuntimeProps {
  langName: string;
  langFlag: string;
  dayNumber: number;
  title: string;
}

export default function LessonRuntime({ langName, langFlag, dayNumber, title }: LessonRuntimeProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function next() { setActiveIndex(i => Math.min(i + 1, TOTAL - 1)); }
  function prev() { setActiveIndex(i => Math.max(i - 1, 0)); }

  const stageNum = activeIndex + 1;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <nav style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-soft)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="brand">
          <div className="brand-mark"><span>W</span></div>
          We<em>Learn</em>
        </div>

        {/* Progress bar */}
        <div style={{ flex: 1, maxWidth: 400, display: 'flex', gap: 3, alignItems: 'center' }}>
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              style={{ flex: 1, height: 4, borderRadius: 2, border: 'none', cursor: 'pointer', background: i < activeIndex ? 'var(--ink)' : i === activeIndex ? 'var(--ink)' : 'var(--line-soft)', opacity: i === activeIndex ? 0.6 : 1, transition: 'background 0.2s, opacity 0.2s' }}
              title={STAGE_LABELS[i + 1]}
            />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            {String(stageNum).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          </span>
          <Link href="/" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--muted)' }}>
            ← Catálogo
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-soft)', padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 32, height: 32, background: 'var(--ink)', color: 'var(--accent-ink)', borderRadius: 6, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
          {langFlag}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            {langName} · Día {dayNumber}
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', marginTop: 2 }}>
            {title}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>
          {STAGE_LABELS[stageNum]}
        </div>
      </div>

      {/* Layout */}
      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px 24px', maxWidth: 1400, width: '100%', margin: '0 auto', alignItems: 'flex-start' }}>
        <StageRail activeIndex={activeIndex} onSelect={setActiveIndex} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          <StagePanel stageIndex={activeIndex} onComplete={next} />

          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
            <button
              type="button"
              onClick={prev}
              disabled={activeIndex === 0}
              className="btn btn-ghost btn-sm"
              style={{ opacity: activeIndex === 0 ? 0.4 : 1 }}
            >
              ← Etapa anterior
            </button>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              {stageNum} de {TOTAL}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={activeIndex === TOTAL - 1}
              className="btn btn-sm"
              style={{ opacity: activeIndex === TOTAL - 1 ? 0.4 : 1 }}
            >
              Siguiente etapa →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
