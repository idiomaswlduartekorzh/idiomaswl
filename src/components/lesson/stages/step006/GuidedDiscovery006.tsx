'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

type Phase = 'intro' | 'pattern1' | 'pattern2' | 'compare';

const GREEN  = '#22c55e';
const PURPLE = '#6c63ff';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const INTRO_CHIPS = [
  { ko: '커피 마실래요?',  audio: '커피 마실래요?' },
  { ko: '같이 마실래요?',  audio: '같이 마실래요?' },
  { ko: '대학교 어때요?', audio: '대학교 어때요?' },
  { ko: '친구 어때요?',   audio: '어때요?' },
];

const P1_CARDS = [
  { ko: '커피 마실래요?',  suffix: '마실래요',  es: '¿Tomamos café?',  audio: '커피 마실래요?' },
  { ko: '같이 마실래요?',  suffix: '마실래요',  es: '¿Bebemos juntos?', audio: '같이 마실래요?' },
  { ko: '밥 먹을래요?',    suffix: '먹을래요',  es: '¿Comemos?',        audio: '마실래요?' }, // usa TTS para 먹을래요
];

const P2_CARDS = [
  { ko: '대학교 어때요?', suffix: '어때요', es: '¿Cómo es la universidad?', audio: '대학교 어때요?' },
  { ko: '커피 어때요?',   suffix: '어때요', es: '¿Qué tal el café?',         audio: '커피 어때요?' },
  { ko: '이 카페 어때요?', suffix: '어때요', es: '¿Qué tal este café?',      audio: '이 카페 어때요?' },
];

interface SortExercise {
  ko: string;
  audio: string;
  answer: 'masillaeyo' | 'eottaeyo';
}

const SORT_EXERCISES: SortExercise[] = [
  { ko: '커피 마실래요?',   audio: '커피 마실래요?',  answer: 'masillaeyo' },
  { ko: '이 영화 어때요?',  audio: '어때요?',          answer: 'eottaeyo'   },
  { ko: '같이 가실래요?',   audio: '같이 마실래요?',  answer: 'masillaeyo' },
  { ko: '날씨 어때요?',     audio: '어때요?',          answer: 'eottaeyo'   },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function splitSuffix(full: string, suffix: string): [string, string, string] {
  const idx = full.lastIndexOf(suffix);
  if (idx === -1) return [full, '', ''];
  return [full.slice(0, idx), suffix, full.slice(idx + suffix.length)];
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function GuidedDiscovery006({ onComplete }: Props) {
  const [phase,       setPhase]       = useState<Phase>('intro');
  const [sortIdx,     setSortIdx]     = useState(0);
  const [sortPicked,  setSortPicked]  = useState<string | null>(null);
  const [streak,      setStreak]      = useState(0);
  const [sortCorrect, setSortCorrect] = useState(0);

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  const currentSort = SORT_EXERCISES[sortIdx];

  function handleSort(choice: 'masillaeyo' | 'eottaeyo') {
    if (sortPicked) return;
    setSortPicked(choice);
    if (choice === currentSort.answer) {
      setStreak(s => s + 1);
      setSortCorrect(s => s + 1);
    } else {
      setStreak(0);
    }
  }

  function nextSort() {
    setSortPicked(null);
    if (sortIdx === SORT_EXERCISES.length - 1) {
      onComplete?.();
    } else {
      setSortIdx(i => i + 1);
    }
  }

  /* ── INTRO ──────────────────────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <div style={{ ...base, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <style>{`
          @keyframes gd4-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
          @keyframes gd4-pop { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:none} }
        `}</style>

        <div style={{ animation: 'gd4-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: PURPLE }}>
            Descubrimiento guiado
          </p>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
            Viste estas frases en las escenas
          </h2>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
            ¿Qué notas? Hay dos grupos. Encuéntralos.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, animation: 'gd4-in 0.4s 0.1s ease both' }}>
          {INTRO_CHIPS.map((chip, i) => (
            <button
              key={i}
              type="button"
              onClick={() => playAudio(chip.audio)}
              style={{
                padding: '10px 16px', borderRadius: 100, cursor: 'pointer',
                background: 'var(--secondary)', border: '1px solid var(--border)',
                fontSize: 15, fontWeight: 700, color: 'var(--foreground)',
                fontFamily: '"Noto Sans KR",sans-serif',
                transition: 'all 0.18s ease',
              }}
            >
              {chip.ko}
            </button>
          ))}
        </div>

        <div style={{
          padding: '14px 16px', borderRadius: 14,
          background: `rgba(108,99,255,0.07)`, border: `1px solid rgba(108,99,255,0.2)`,
          animation: 'gd4-in 0.4s 0.15s ease both',
        }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.65 }}>
            💜 <strong>No hay nada que memorizar.</strong> Solo observa y deja que los grupos aparezcan solos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPhase('pattern1')}
          style={{
            padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: `rgba(108,99,255,0.12)`, border: `1px solid rgba(108,99,255,0.35)`,
            fontSize: 14, fontWeight: 800, color: PURPLE,
            animation: 'gd4-in 0.4s 0.2s ease both',
          }}
        >
          ¿Qué notas? Hay dos grupos. Encuéntralos →
        </button>
      </div>
    );
  }

  /* ── PATTERN 1 ──────────────────────────────────────────────────────────── */
  if (phase === 'pattern1') {
    return (
      <div style={{ ...base, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <style>{`
          @keyframes gd4-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
          @keyframes gd4-pop { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:none} }
        `}</style>

        <div style={{ animation: 'gd4-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN }}>
            Grupo 1
          </p>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
            Grupo 1 — Invitación
          </h2>
        </div>

        {/* Horizontal scroll cards */}
        <div style={{
          display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8,
          animation: 'gd4-in 0.4s 0.1s ease both',
        }}>
          {P1_CARDS.map((c, i) => {
            const [before, suf, after] = splitSuffix(c.ko, c.suffix);
            return (
              <div key={i} style={{
                flexShrink: 0, width: 180,
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '16px 14px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.3 }}>
                  {before}
                  <span style={{ color: GREEN, background: `rgba(34,197,94,0.15)`, padding: '0 3px', borderRadius: 5 }}>
                    {suf}
                  </span>
                  {after}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{c.es}</p>
                <button
                  type="button"
                  onClick={() => playAudio(c.audio)}
                  style={{
                    alignSelf: 'flex-start', padding: '5px 12px', borderRadius: 100, cursor: 'pointer',
                    background: `rgba(34,197,94,0.1)`, border: `1px solid rgba(34,197,94,0.3)`,
                    fontSize: 11, fontWeight: 600, color: GREEN,
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}
                >
                  🔊 Escuchar
                </button>
              </div>
            );
          })}
        </div>

        {/* Pattern box */}
        <div style={{
          padding: '16px 18px', borderRadius: 16,
          background: `rgba(34,197,94,0.08)`, border: `1.5px solid rgba(34,197,94,0.3)`,
          animation: 'gd4-in 0.4s 0.15s ease both',
        }}>
          <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: GREEN }}>
            Patrón extraído
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 900, color: GREEN, fontFamily: '"Noto Sans KR",sans-serif' }}>
            ___ㄹ래요? = ¿Quieres...?
          </p>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>
            Preguntas a tu amigo si quiere hacer algo juntos. Solo entre personas de confianza.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPhase('pattern2')}
          style={{
            padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: `rgba(34,197,94,0.12)`, border: `1px solid rgba(34,197,94,0.35)`,
            fontSize: 14, fontWeight: 800, color: GREEN,
          }}
        >
          ¡Lo vi! →
        </button>
      </div>
    );
  }

  /* ── PATTERN 2 ──────────────────────────────────────────────────────────── */
  if (phase === 'pattern2') {
    return (
      <div style={{ ...base, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <style>{`
          @keyframes gd4-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
          @keyframes gd4-pop { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:none} }
        `}</style>

        <div style={{ animation: 'gd4-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: PURPLE }}>
            Grupo 2
          </p>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
            Grupo 2 — Opinión
          </h2>
        </div>

        <div style={{
          display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8,
          animation: 'gd4-in 0.4s 0.1s ease both',
        }}>
          {P2_CARDS.map((c, i) => {
            const [before, suf, after] = splitSuffix(c.ko, c.suffix);
            return (
              <div key={i} style={{
                flexShrink: 0, width: 180,
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '16px 14px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.3 }}>
                  {before}
                  <span style={{ color: PURPLE, background: `rgba(108,99,255,0.15)`, padding: '0 3px', borderRadius: 5 }}>
                    {suf}
                  </span>
                  {after}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{c.es}</p>
                <button
                  type="button"
                  onClick={() => playAudio(c.audio)}
                  style={{
                    alignSelf: 'flex-start', padding: '5px 12px', borderRadius: 100, cursor: 'pointer',
                    background: `rgba(108,99,255,0.1)`, border: `1px solid rgba(108,99,255,0.3)`,
                    fontSize: 11, fontWeight: 600, color: PURPLE,
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}
                >
                  🔊 Escuchar
                </button>
              </div>
            );
          })}
        </div>

        <div style={{
          padding: '16px 18px', borderRadius: 16,
          background: `rgba(108,99,255,0.08)`, border: `1.5px solid rgba(108,99,255,0.3)`,
          animation: 'gd4-in 0.4s 0.15s ease both',
        }}>
          <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: PURPLE }}>
            Patrón extraído
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 900, color: PURPLE, fontFamily: '"Noto Sans KR",sans-serif' }}>
            ___어때요? = ¿Cómo es ___?
          </p>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>
            Para preguntar opinión o proponer suavemente. Funciona con cualquier sustantivo.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPhase('compare')}
          style={{
            padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: `rgba(108,99,255,0.12)`, border: `1px solid rgba(108,99,255,0.35)`,
            fontSize: 14, fontWeight: 800, color: PURPLE,
          }}
        >
          ¡Lo vi! →
        </button>
      </div>
    );
  }

  /* ── COMPARE ────────────────────────────────────────────────────────────── */
  const isLast = sortIdx === SORT_EXERCISES.length - 1;
  const isCorrect = sortPicked === currentSort.answer;

  return (
    <div style={{ ...base, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <style>{`
        @keyframes gd4-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes gd4-pop { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:none} }
      `}</style>

      <div style={{ animation: 'gd4-in 0.4s ease both' }}>
        <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: PURPLE }}>
          Comparación
        </p>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
          Los dos patrones juntos
        </h2>
      </div>

      {/* Side by side comparison */}
      <div style={{ display: 'flex', gap: 10, animation: 'gd4-in 0.4s 0.1s ease both' }}>
        <div style={{
          flex: 1, padding: '14px', borderRadius: 14,
          background: `rgba(34,197,94,0.08)`, border: `1.5px solid rgba(34,197,94,0.3)`,
          textAlign: 'center',
        }}>
          <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 900, color: GREEN, fontFamily: '"Noto Sans KR",sans-serif' }}>마실래요?</p>
          <p style={{ margin: 0, fontSize: 11.5, color: 'var(--foreground)', lineHeight: 1.5 }}>Invito a hacer algo</p>
        </div>
        <div style={{
          flex: 1, padding: '14px', borderRadius: 14,
          background: `rgba(108,99,255,0.08)`, border: `1.5px solid rgba(108,99,255,0.3)`,
          textAlign: 'center',
        }}>
          <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 900, color: PURPLE, fontFamily: '"Noto Sans KR",sans-serif' }}>어때요?</p>
          <p style={{ margin: 0, fontSize: 11.5, color: 'var(--foreground)', lineHeight: 1.5 }}>Pido tu opinión</p>
        </div>
      </div>

      <div style={{
        padding: '12px 16px', borderRadius: 12,
        background: 'var(--secondary)', border: '1px solid var(--border)',
        animation: 'gd4-in 0.4s 0.15s ease both',
      }}>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.65 }}>
          Los dos sirven para conectar con alguien — uno invita, el otro consulta.
        </p>
      </div>

      {/* Sort exercise */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, display: 'flex', gap: 5 }}>
          {SORT_EXERCISES.map((_, i) => (
            <div key={i} style={{
              height: 6, borderRadius: 3,
              flex: 1,
              background: i < sortIdx ? '#22c55e' : i === sortIdx ? PURPLE : 'var(--border)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
        {streak >= 2 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px',
            borderRadius: 100, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 11 }}>🔥</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#f59e0b' }}>{streak}</span>
          </div>
        )}
      </div>

      <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>
        Escucha y clasifica — ¿es invitación o consulta? ({sortIdx + 1}/{SORT_EXERCISES.length})
      </p>

      <div key={sortIdx} style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 18, padding: '20px 16px',
        textAlign: 'center', animation: 'gd4-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
      }}>
        <p style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, color: 'var(--foreground)', fontFamily: '"Noto Sans KR",sans-serif' }}>
          {currentSort.ko}
        </p>
        <button
          type="button"
          onClick={() => playAudio(currentSort.audio)}
          style={{
            padding: '7px 18px', borderRadius: 100, cursor: 'pointer',
            background: 'var(--secondary)', border: '1px solid var(--border)',
            fontSize: 12, fontWeight: 600, color: 'var(--foreground)',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}
        >
          🔊 Escuchar
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          disabled={!!sortPicked}
          onClick={() => handleSort('masillaeyo')}
          style={{
            flex: 1, padding: '13px', borderRadius: 14, cursor: sortPicked ? 'default' : 'pointer',
            background: sortPicked === 'masillaeyo'
              ? (isCorrect ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.12)')
              : `rgba(34,197,94,0.1)`,
            border: sortPicked === 'masillaeyo'
              ? (isCorrect ? '1.5px solid rgba(34,197,94,0.5)' : '1.5px solid rgba(239,68,68,0.4)')
              : `1.5px solid rgba(34,197,94,0.3)`,
            fontSize: 13, fontWeight: 800, color: GREEN, transition: 'all 0.18s ease',
          }}
        >
          마실래요 ✋
          <br />
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted-foreground)' }}>Invitación</span>
        </button>
        <button
          type="button"
          disabled={!!sortPicked}
          onClick={() => handleSort('eottaeyo')}
          style={{
            flex: 1, padding: '13px', borderRadius: 14, cursor: sortPicked ? 'default' : 'pointer',
            background: sortPicked === 'eottaeyo'
              ? (isCorrect ? 'rgba(108,99,255,0.18)' : 'rgba(239,68,68,0.12)')
              : `rgba(108,99,255,0.1)`,
            border: sortPicked === 'eottaeyo'
              ? (isCorrect ? '1.5px solid rgba(108,99,255,0.5)' : '1.5px solid rgba(239,68,68,0.4)')
              : `1.5px solid rgba(108,99,255,0.3)`,
            fontSize: 13, fontWeight: 800, color: PURPLE, transition: 'all 0.18s ease',
          }}
        >
          어때요 🤔
          <br />
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted-foreground)' }}>Opinión</span>
        </button>
      </div>

      {sortPicked && (
        <div style={{
          padding: '13px 16px', borderRadius: 12, animation: 'gd4-in 0.3s ease both',
          background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
          border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
        }}>
          <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: isCorrect ? GREEN : '#f59e0b' }}>
            {isCorrect ? '✓ ¡Correcto!' : `→ Era: ${currentSort.answer === 'masillaeyo' ? '마실래요 (invitación)' : '어때요 (opinión)'}`}
          </p>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>
            {currentSort.answer === 'masillaeyo'
              ? 'El sufijo ㄹ래요 propone hacer algo juntos — es una invitación directa.'
              : '어때요 pregunta la opinión de la otra persona sobre algo.'}
          </p>
        </div>
      )}

      {sortPicked && (
        <button
          type="button"
          onClick={nextSort}
          style={{
            padding: '13px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: `rgba(108,99,255,0.12)`, border: `1px solid rgba(108,99,255,0.35)`,
            fontSize: 14, fontWeight: 800, color: PURPLE,
          }}
        >
          {isLast ? '¡Patrón dominado! →' : 'Siguiente →'}
        </button>
      )}
    </div>
  );
}
