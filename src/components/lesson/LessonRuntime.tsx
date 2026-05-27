'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StageRail from './StageRail';
import StagePanel from './StagePanel';

const TOTAL = 11;
/** How many days exist in the system — keep in sync with generateStaticParams. */
const MAX_DAY = 20;

const STAGE_LABELS: Record<number, string> = {
  1: 'Activación', 2: 'Adquisición guiada', 3: 'Reconocimiento',
  4: 'Escucha sobrevivible', 5: 'Contexto primero', 6: 'Descubre el patrón',
  7: 'Micro explicación', 8: 'Producción guiada', 9: 'Interacción reactiva',
  10: 'Smart Review', 11: 'Cierre y siguiente paso',
};

interface LessonRuntimeProps {
  /** Display name: "Coreano", "Japonés", etc. */
  langName: string;
  /** Short visual glyph: "한", "日", etc. */
  langFlag: string;
  /** URL slug: "korean", "japanese", etc. Used in prev/next navigation links. */
  langSlug: string;
  dayNumber: number;
  title: string;
  /** Grammar topics shown as chips below the title, e.g. ["Orden SOV", "Partícula 에"] */
  topics?: string[];
  /** Key vocabulary words shown as chips, e.g. ["학교", "가요"] */
  vocab?: string[];
  /** Optional server-rendered section (GrammarDeep) appended below the lesson stages */
  grammarContent?: ReactNode;
}

export default function LessonRuntime({ langName, langFlag, langSlug, dayNumber, title, topics, vocab, grammarContent }: LessonRuntimeProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function next() { setActiveIndex(i => Math.min(i + 1, TOTAL - 1)); }
  function prev() { setActiveIndex(i => Math.max(i - 1, 0)); }

  const stageNum = activeIndex + 1;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* ── Nav ── */}
      <nav className="wl-nav" style={{ borderBottom: '1px solid var(--line-soft)' }}>
        <div className="wl-container">
          <div className="wl-nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 64, gap: '1rem' }}>
            <Link href="/home" className="wl-site-nav__brand" style={{ textDecoration: 'none' }}>
              <div className="wl-site-nav__logo-wrap">
                <Image
                  src="/images/welearn-logo.png"
                  alt="WeLearn"
                  fill
                  sizes="96px"
                  priority
                  style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
                />
              </div>
              <span className="wl-site-nav__brand-name">Idiomas WeLearn</span>
            </Link>

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
              <Link href="/leccion" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--muted)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                ← Salir
              </Link>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
                {String(stageNum).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </span>
              {/* Day navigation — use langSlug so any language navigates correctly */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {dayNumber > 1 && (
                  <Link
                    href={`/courses/${langSlug}/step/${dayNumber - 1}`}
                    style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--muted)', padding: '4px 8px', borderRadius: 6, border: '1px solid var(--line-soft)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    ← Día {dayNumber - 1}
                  </Link>
                )}
                {dayNumber < MAX_DAY && (
                  <Link
                    href={`/courses/${langSlug}/step/${dayNumber + 1}`}
                    style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--muted)', padding: '4px 8px', borderRadius: 6, border: '1px solid var(--line-soft)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    Día {dayNumber + 1} →
                  </Link>
                )}
              </div>
              <Link href="/leccion" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--muted)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                ↩ Lecciones
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

            {/* Grammar topics */}
            {topics && topics.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '10px 0 6px' }}>
                {topics.map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: 'rgba(108,99,255,0.1)', color: '#6c63ff', border: '1px solid rgba(108,99,255,0.2)' }}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Vocab chips */}
            {vocab && vocab.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {vocab.map(w => (
                  <span key={w} style={{ fontSize: 14, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' }}>
                    {w}
                  </span>
                ))}
              </div>
            )}

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

              <StagePanel stageIndex={activeIndex} dayNumber={dayNumber} onComplete={next} />
            </div>
          </div>

          {/* Grammar deep section — server-rendered, for SEO */}
          {grammarContent}

        </div>
      </section>
    </div>
  );
}
