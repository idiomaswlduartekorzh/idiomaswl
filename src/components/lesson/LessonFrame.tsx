'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Idioma, VocabWord, Paso } from '@/lib/data';

interface LessonFrameProps {
  idioma: Idioma;
  vocab: VocabWord[];
  pasos: Paso[];
  stepId: number;
}

export default function LessonFrame({ idioma, vocab, pasos, stepId }: LessonFrameProps) {
  const [showPaywall, setShowPaywall] = useState(false);
  const currentPaso = pasos[stepId - 1] ?? pasos[0];
  const totalPasos = pasos.length; // 11

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top nav */}
      <nav
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line-soft)',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="brand">
          <div className="brand-mark">
            <span>W</span>
          </div>
          We<em>Learn</em>
        </div>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            letterSpacing: '0.06em',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ← Volver al catálogo
        </Link>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, padding: '40px 32px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div className="lesson-frame">
          {/* HEADER */}
          <div className="lesson-header">
            {/* Left: flag + language info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: 'var(--ink)',
                  color: 'var(--accent-ink)',
                  borderRadius: 6,
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  flexShrink: 0,
                }}
              >
                {idioma.flag}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Día 1 · {idioma.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 16,
                    marginTop: 2,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--ink)',
                  }}
                >
                  Vocabulario fundamental
                </div>
              </div>
            </div>

            {/* Center: progress bar */}
            <div className="lesson-bar">
              {Array.from({ length: totalPasos }).map((_, i) => (
                <div
                  key={i}
                  className={
                    i < stepId - 1 ? 'done' : i === stepId - 1 ? 'curr' : ''
                  }
                />
              ))}
            </div>

            {/* Right: counter */}
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--muted)',
                letterSpacing: '0.06em',
              }}
            >
              {String(stepId).padStart(2, '0')} / {String(totalPasos).padStart(2, '0')}
            </div>
          </div>

          {/* BODY */}
          <div className="lesson-body">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr',
                gap: 48,
              }}
            >
              {/* Left column */}
              <div>
                <div className="lesson-step-num">
                  Paso {currentPaso.n} · {currentPaso.name} · {currentPaso.time}
                </div>
                <div className="lesson-step-title serif">
                  Conoce las primeras<br />seis palabras.
                </div>
                <div className="lesson-step-desc">
                  Mira la palabra, escucha cómo se pronuncia y asóciala con su imagen.
                  No tienes que memorizar — la repetición vendrá después.
                </div>

                {/* Vocab grid */}
                <div className="lesson-vocab-grid">
                  {vocab.map((v, i) => (
                    <div className="v-card" key={i}>
                      <div className="v-img">
                        <span style={{ fontSize: 22, fontFamily: 'var(--mono)' }}>{v.emoji}</span>
                      </div>
                      <div className="v-glyph">{v.glyph}</div>
                      <div className="v-roman">{v.roman}</div>
                      <div className="v-mean">{v.mean}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  Los {totalPasos} pasos del día
                </div>
                <ul className="lesson-step-list">
                  {pasos.map((p, i) => (
                    <li className={'lstep' + (i === stepId - 1 ? ' active' : '')} key={p.n}>
                      <span className="lstep-n">{p.n}</span>
                      <span>{p.name}</span>
                      {i === stepId - 1 ? (
                        <span className="lock">en curso</span>
                      ) : i < stepId - 1 ? (
                        <span className="lock" style={{ color: 'var(--ink)' }}>✓</span>
                      ) : (
                        <span className="lock">⌐ bloqueado</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="lesson-nav">
            <button
              className="btn btn-ghost btn-sm"
              disabled
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            >
              ← Paso anterior
            </button>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  letterSpacing: '0.06em',
                }}
              >
                Has visto {vocab.length}/{vocab.length} palabras
              </span>
              <button
                className="btn btn-sm"
                onClick={() => setShowPaywall(true)}
              >
                Continuar al paso {String(stepId + 1).padStart(2, '0')}
                <span className="arrow">→</span>
              </button>
            </div>
          </div>

          {/* PAYWALL OVERLAY */}
          {showPaywall && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(14, 14, 14, 0.45)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'grid',
                placeItems: 'center',
                padding: 24,
              }}
            >
              <div className="paywall-inner reveal in" style={{ margin: 0 }}>
                <span className="eyebrow">
                  <span className="ink-line" />
                  Paso {String(stepId).padStart(2, '0')} completado
                </span>
                <h4 className="serif">
                  Sigamos los otros<br />diez pasos.
                </h4>
                <p>
                  El primer paso siempre es gratis. Continúa con Adquisición, Reconocimiento,
                  Escucha sobrevivible y todo lo demás con una cuenta.
                </p>
                <button className="btn btn-primary">
                  Desbloquear día 1 completo
                  <span className="arrow">→</span>
                </button>
                <div className="paywall-note">$19 / mes · cancela cuando quieras</div>
                <button
                  onClick={() => setShowPaywall(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    fontSize: 12,
                    marginTop: 14,
                    textDecoration: 'underline',
                    display: 'block',
                    margin: '14px auto 0',
                  }}
                >
                  Volver al paso {String(stepId).padStart(2, '0')}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
