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
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* ── Nav ── */}
      <nav className="wl-nav" style={{ borderBottom: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
        <div className="wl-container">
          <div className="wl-nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 64, gap: '1rem' }}>
            <div className="brand">
              <div className="brand-mark"><span>W</span></div>
              We<em>Learn</em>
            </div>

            {/* Progress bar — 11 segments */}
            <div style={{ flex: 1, maxWidth: 360, display: 'flex', gap: 3 }}>
              {Array.from({ length: TOTAL }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  title={STAGE_LABELS[i + 1]}
                  style={{
                    flex: 1, height: 4, borderRadius: 2, border: 'none', cursor: 'pointer',
                    background: i < activeIndex ? 'var(--ink)' : i === activeIndex ? 'var(--ink)' : 'var(--line-soft)',
                    opacity: i === activeIndex ? 0.55 : 1,
                    transition: 'background 0.2s, opacity 0.2s',
                    padding: 0,
                  }}
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
          </div>
        </div>
      </nav>

      {/* ── Runtime page ── */}
      <section className="wl-section wl-korean-runtime-page">
        <div className="wl-container">

          {/* Header card */}
          <header className="wl-korean-runtime-header wl-card">
            <p className="wl-eyebrow-runtime">{langName} · Día {dayNumber}</p>
            <h1>{title}</h1>
            <p className="wl-korean-runtime-header__progress">
              Etapa actual: {stageNum}/{TOTAL} · {STAGE_LABELS[stageNum]}
            </p>
          </header>

          {/* Layout */}
          <div className="wl-korean-runtime-layout">
            <StageRail activeIndex={activeIndex} onSelect={setActiveIndex} />

            <div>
              {/* Prev / Next */}
              <div className="wl-korean-runtime-main__actions">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={prev}
                  disabled={activeIndex === 0}
                >
                  ← Etapa anterior
                </button>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={next}
                  disabled={activeIndex === TOTAL - 1}
                >
                  Siguiente etapa →
                </button>
              </div>

              <StagePanel stageIndex={activeIndex} onComplete={next} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
