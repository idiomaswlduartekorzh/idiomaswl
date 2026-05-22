'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

const ACCENT = '#6c63ff';
const GREEN  = '#22c55e';

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function MicroExplanation005({ onComplete }: Props) {
  const [cardIdx, setCardIdx] = useState(0);

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  function next() {
    if (cardIdx < 3) {
      setCardIdx(i => i + 1);
    } else {
      onComplete?.();
    }
  }

  return (
    <div style={{ ...base, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        @keyframes me5-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes me5-pop { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Header */}
      <div style={{ animation: 'me5-in 0.4s ease both' }}>
        <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
          3 reglas clave
        </p>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
          Dónde ocurre. Hacia dónde vas.
        </h2>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            width: i === cardIdx ? 24 : 8, height: 8, borderRadius: 4,
            background: i <= cardIdx ? ACCENT : 'var(--border)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* ── Card 0 — 에서 ─────────────────────────────────────────────────── */}
      {cardIdx === 0 && (
        <div key="card-0" style={{
          borderLeft: `4px solid ${ACCENT}`,
          background: 'var(--card)', border: `1px solid var(--border)`,
          borderLeftColor: ACCENT, borderLeftWidth: 4,
          borderRadius: '0 16px 16px 0', padding: '16px',
          animation: 'me5-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>📍</span>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--foreground)' }}>
              에서 — donde la acción sucede
            </p>
          </div>

          <div style={{ padding: '10px 13px', borderRadius: 12, background: `rgba(108,99,255,0.07)`, border: `1px solid rgba(108,99,255,0.2)`, marginBottom: 10 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: ACCENT, fontFamily: '"Noto Sans KR",sans-serif' }}>
              [lugar] + 에서 + [verbo de acción]
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
            {[
              { segments: ['이 대학교', '에서', '공부해요'], es: 'Estudio en esta universidad', audio: '이 대학교에서 공부해요' },
              { segments: ['카페', '에서', '일해요'], es: 'Trabajo en el café', audio: '카페에서 일해요' },
            ].map((ex, j) => (
              <div key={j} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                padding: '10px 13px', borderRadius: 12,
                background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.18)',
              }}>
                <div>
                  <p style={{ margin: '0 0 3px', fontSize: 16, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>
                    <span style={{ color: '#3b82f6' }}>{ex.segments[0]}</span>
                    <span style={{ color: ACCENT, fontWeight: 900 }}>{ex.segments[1]}</span>
                    <span> </span>
                    <span style={{ color: GREEN }}>{ex.segments[2]}</span>
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>{ex.es}</p>
                </div>
                <button type="button" onClick={() => playAudio(ex.audio)}
                  style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.35)', color: ACCENT, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  🔊
                </button>
              </div>
            ))}
          </div>

          <div style={{ padding: '9px 13px', borderRadius: 10, background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.18)' }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--foreground)', lineHeight: 1.6 }}>
              💡 에서 = la escena donde el verbo ocurre. No es dónde estás — es donde <em>haces</em> algo.
            </p>
          </div>
        </div>
      )}

      {/* ── Card 1 — 에 (destino) ─────────────────────────────────────────── */}
      {cardIdx === 1 && (
        <div key="card-1" style={{
          borderLeft: `4px solid #3b82f6`,
          background: 'var(--card)', border: `1px solid var(--border)`,
          borderLeftColor: '#3b82f6', borderLeftWidth: 4,
          borderRadius: '0 16px 16px 0', padding: '16px',
          animation: 'me5-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🚶</span>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--foreground)' }}>
              에 — hacia dónde te mueves
            </p>
          </div>

          <div style={{ padding: '10px 13px', borderRadius: 12, background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: 10 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#3b82f6', fontFamily: '"Noto Sans KR",sans-serif' }}>
              [lugar] + 에 + 가다 / 오다
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
            {[
              { ko: '카페에 가요', es: 'Voy al café', audio: '매일 카페에 가요' },
              { ko: '대학교에 가요', es: 'Voy a la universidad', audio: '대학교에 가요' },
            ].map((ex, j) => (
              <div key={j} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                padding: '10px 13px', borderRadius: 12,
                background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.18)',
              }}>
                <div>
                  <p style={{ margin: '0 0 3px', fontSize: 16, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{ex.ko}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>{ex.es}</p>
                </div>
                <button type="button" onClick={() => playAudio(ex.audio)}
                  style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.35)', color: '#3b82f6', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  🔊
                </button>
              </div>
            ))}
          </div>

          <div style={{ padding: '9px 13px', borderRadius: 10, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.18)' }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--foreground)', lineHeight: 1.6 }}>
              💡 에 con verbos de movimiento (가다, 오다). Nunca con 일하다, 공부하다.
            </p>
          </div>
        </div>
      )}

      {/* ── Card 2 — 하다 verbs ───────────────────────────────────────────── */}
      {cardIdx === 2 && (
        <div key="card-2" style={{
          borderLeft: `4px solid ${GREEN}`,
          background: 'var(--card)', border: `1px solid var(--border)`,
          borderLeftColor: GREEN, borderLeftWidth: 4,
          borderRadius: '0 16px 16px 0', padding: '16px',
          animation: 'me5-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>⚙️</span>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--foreground)' }}>
              하다 — el patrón más productivo del coreano
            </p>
          </div>

          {/* Table */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 10 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: `rgba(34,197,94,0.1)`, borderBottom: '1px solid var(--border)' }}>
              {['Sustantivo', '+ 하다', 'Presente'].map(h => (
                <div key={h} style={{ padding: '8px 10px' }}>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: GREEN }}>{h}</p>
                </div>
              ))}
            </div>
            {[
              { noun: '공부 (estudio)', hada: '공부하다', present: '공부해요' },
              { noun: '일 (trabajo)',   hada: '일하다',   present: '일해요'   },
              { noun: '좋아 (gusto)',   hada: '좋아하다', present: '좋아해요' },
              { noun: '뭐 (qué)',       hada: '뭐하다',   present: '뭐해요?'  },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ padding: '9px 10px', borderRight: '1px solid var(--border)' }}>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>{row.noun}</p>
                </div>
                <div style={{ padding: '9px 10px', borderRight: '1px solid var(--border)' }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{row.hada}</p>
                </div>
                <div style={{ padding: '9px 10px', background: i % 2 === 0 ? `rgba(34,197,94,0.04)` : 'transparent' }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: GREEN }}>{row.present}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '9px 13px', borderRadius: 10, background: `rgba(34,197,94,0.06)`, border: `1px solid rgba(34,197,94,0.18)` }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--foreground)', lineHeight: 1.6 }}>
              💡 Sufijo -해요 es siempre igual. Cambia solo lo que va delante.
            </p>
          </div>
        </div>
      )}

      {/* ── Card 3 — 좋아요 vs 좋아해요 ──────────────────────────────────── */}
      {cardIdx === 3 && (
        <div key="card-3" style={{
          borderLeft: '4px solid #ec4899',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderLeftColor: '#ec4899', borderLeftWidth: 4,
          borderRadius: '0 16px 16px 0', padding: '16px',
          animation: 'me5-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>💡</span>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--foreground)' }}>
              좋아요 ≠ 좋아해요 — la trampa más común
            </p>
          </div>

          {/* Contrast */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ padding: '12px', background: 'rgba(245,158,11,0.08)', borderRight: '1px solid var(--border)' }}>
                <p style={{ margin: '0 0 3px', fontSize: 18, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: '#f59e0b' }}>좋아요</p>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>adjetivo</p>
                <p style={{ margin: 0, fontSize: 11.5, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>está bien / qué bueno / de acuerdo</p>
              </div>
              <div style={{ padding: '12px', background: 'rgba(236,72,153,0.08)' }}>
                <p style={{ margin: '0 0 3px', fontSize: 18, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: '#ec4899' }}>좋아해요</p>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: '#be185d', textTransform: 'uppercase' }}>verbo</p>
                <p style={{ margin: 0, fontSize: 11.5, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>me gusta / le gusta [algo]</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
            {[
              { ko: '한국 좋아해요', mark: '✓', color: GREEN, bg: 'rgba(34,197,94,0.07)', border: 'rgba(34,197,94,0.25)', es: 'Me gusta Corea', audio: '한국 좋아해요' },
              { ko: '한국 좋아요', mark: '✗', color: '#ef4444', bg: 'rgba(239,68,68,0.07)', border: 'rgba(239,68,68,0.25)', es: 'no es correcto para expresar gusto', audio: null },
              { ko: '좋아요!', mark: '✓', color: GREEN, bg: 'rgba(34,197,94,0.07)', border: 'rgba(34,197,94,0.25)', es: '¡De acuerdo! / ¡Qué bien!', audio: '좋아요' },
            ].map((ex, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '9px 13px', borderRadius: 10, background: ex.bg, border: `1px solid ${ex.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: ex.color }}>{ex.mark}</span>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{ex.ko}</p>
                    <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)' }}>{ex.es}</p>
                  </div>
                </div>
                {ex.audio && (
                  <button type="button" onClick={() => playAudio(ex.audio!)}
                    style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', color: '#ec4899', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    🔊
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Button */}
      <button
        type="button"
        onClick={next}
        style={{
          padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%',
          background: `rgba(108,99,255,0.13)`, border: `1px solid rgba(108,99,255,0.38)`,
          fontSize: 14, fontWeight: 800, color: ACCENT,
          animation: 'me5-in 0.4s 0.3s ease both',
        }}
      >
        {cardIdx < 3 ? 'Siguiente →' : 'Continuar →'}
      </button>
    </div>
  );
}
