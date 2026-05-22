'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

/* ─── Data ───────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    border: '#6c63ff',
    icon: '🤝',
    title: '이에요 / 예요 — Seguimos siendo nosotros',
    body: 'Ya lo sabes de Steps 002 y 003. Ahora lo usas en contexto social:',
    examples: [
      { ko: '저는 데이비드예요', es: 'Soy David',        audio: '저는 데이비드예요' },
      { ko: '콜롬비아 사람이에요', es: 'Soy colombiano', audio: '콜롬비아 사람이에요' },
    ],
    note: 'Vocal final → 예요 | Consonante final → 이에요',
    chip: null,
  },
  {
    border: '#22c55e',
    icon: '☕',
    title: '마실래요? — La invitación perfecta entre amigos',
    body: 'Preguntas si alguien quiere hacer algo contigo. Solo entre personas de confianza.',
    examples: [
      { ko: '커피 마실래요?',  es: '¿Tomamos café?',    audio: '커피 마실래요?' },
      { ko: '같이 마실래요?', es: '¿Bebemos juntos?',   audio: '같이 마실래요?' },
    ],
    note: '마시다 (beber) → 마실래요? | 먹다 (comer) → 먹을래요?',
    chip: '해요체 — nivel universitario natural',
  },
  {
    border: '#e879f9',
    icon: '🎯',
    title: '어때요? — La pregunta que todo lo puede',
    body: 'Pregunta opinión, propone planes, evalúa situaciones. Funciona con cualquier sustantivo.',
    examples: [
      { ko: '대학교 어때요?', es: '¿Cómo es la universidad?', audio: '대학교 어때요?' },
      { ko: '이 카페 어때요?', es: '¿Qué tal este café?',     audio: '어때요?' },
    ],
    note: '[cualquier cosa] + 어때요? = ¿Qué tal [esa cosa]?',
    chip: null,
  },
  {
    border: '#f59e0b',
    icon: '💡',
    title: 'La diferencia clave',
    body: null,
    examples: [],
    note: 'Ambas construyen relaciones. Eso es lo que importa.',
    chip: null,
    isGolden: true,
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function MicroExplanation006({ onComplete }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  return (
    <div style={{ ...base, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        @keyframes me4-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes me4-pop { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Header */}
      <div style={{ animation: 'me4-in 0.4s ease both' }}>
        <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
          Lo que ya sabes hacer
        </p>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
          Dos frases. Mil situaciones.
        </h2>
      </div>

      {/* Cards 1–3 */}
      {CARDS.slice(0, 3).map((card, i) => {
        const isOpen = expanded === i;
        const c = card.border;
        const rgb = c === '#6c63ff' ? '108,99,255' : c === '#22c55e' ? '34,197,94' : '232,121,249';

        return (
          <div
            key={i}
            style={{
              borderLeft: `4px solid ${c}`,
              borderRadius: '0 16px 16px 0',
              background: 'var(--card)',
              border: `1px solid var(--border)`,
              borderLeftColor: c,
              borderLeftWidth: 4,
              overflow: 'hidden',
              animation: `me4-in 0.4s ${i * 0.08}s ease both`,
            }}
          >
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : i)}
              style={{
                width: '100%', textAlign: 'left', padding: '14px 16px', cursor: 'pointer',
                background: 'transparent', border: 'none',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>{card.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.3 }}>
                  {card.title}
                </p>
              </div>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.3)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: c,
                transition: 'transform 0.3s ease',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▼
              </div>
            </button>

            {isOpen && (
              <div style={{
                padding: '0 16px 16px',
                animation: 'me4-in 0.3s ease both',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  {card.body}
                </p>

                {/* Formality chip */}
                {card.chip && (
                  <span style={{
                    alignSelf: 'flex-start',
                    padding: '3px 12px', borderRadius: 100,
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.35)`,
                    color: c,
                  }}>
                    {card.chip}
                  </span>
                )}

                {/* Examples */}
                {card.examples.map((ex, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                    padding: '10px 13px', borderRadius: 12,
                    background: `rgba(${rgb},0.07)`, border: `1px solid rgba(${rgb},0.2)`,
                  }}>
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: 18, fontWeight: 700, color: 'var(--foreground)', fontFamily: '"Noto Sans KR",sans-serif' }}>
                        {ex.ko}
                      </p>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>{ex.es}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => playAudio(ex.audio)}
                      style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                        background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.35)`,
                        color: c, fontSize: 13,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      🔊
                    </button>
                  </div>
                ))}

                {/* Note */}
                <div style={{
                  padding: '9px 13px', borderRadius: 10,
                  background: `rgba(${rgb},0.06)`, border: `1px solid rgba(${rgb},0.18)`,
                }}>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--foreground)', lineHeight: 1.6 }}>
                    💡 {card.note}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Card 4 — Golden rule */}
      <div style={{
        borderLeft: '4px solid #f59e0b',
        background: 'var(--card)',
        border: '1px solid rgba(245,158,11,0.3)',
        borderLeftColor: '#f59e0b',
        borderLeftWidth: 4,
        borderRadius: '0 16px 16px 0',
        padding: '16px',
        animation: 'me4-in 0.4s 0.25s ease both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 22 }}>💡</span>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: 'var(--foreground)' }}>
            La diferencia clave
          </p>
        </div>

        {/* Comparison table */}
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '10px 12px', background: 'rgba(34,197,94,0.08)', borderRight: '1px solid var(--border)' }}>
              <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: '#22c55e', fontFamily: '"Noto Sans KR",sans-serif' }}>마실래요?</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>propone acción juntos</p>
            </div>
            <div style={{ padding: '10px 12px', background: 'rgba(108,99,255,0.08)' }}>
              <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: '#6c63ff', fontFamily: '"Noto Sans KR",sans-serif' }}>어때요?</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>pide tu opinión</p>
            </div>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.65 }}>
          Ambas construyen relaciones. Eso es lo que importa.
        </p>
      </div>

      <button
        type="button"
        onClick={() => onComplete?.()}
        style={{
          padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%',
          background: 'rgba(108,99,255,0.13)', border: '1px solid rgba(108,99,255,0.38)',
          fontSize: 14, fontWeight: 800, color: '#6c63ff',
          animation: 'me4-in 0.4s 0.3s ease both',
        }}
      >
        ¿Tienes las 3 claras? →
      </button>
    </div>
  );
}
