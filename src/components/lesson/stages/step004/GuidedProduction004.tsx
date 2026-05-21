'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

interface Tile {
  ko: string;
  role: 'subject' | 'object' | 'verb';
}

interface BuildEx {
  type: 'build';
  hint: string;
  tiles: Tile[];
  correctOrder: string[];
  audio: string;
}

interface ChoiceEx {
  type: 'choice';
  prompt: string;
  options: string[];
  correct: string;
  feedbackCorrect: string;
}

type Exercise = BuildEx | ChoiceEx;

/* ─── Data ───────────────────────────────────────────────────────────────── */
const TILE_COLORS: Record<Tile['role'], { bg: string; border: string; color: string }> = {
  subject: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.4)',  color: '#3b82f6' },
  object:  { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)',  color: '#d97706' },
  verb:    { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.4)',   color: '#22c55e' },
};

const EXERCISES: Exercise[] = [
  {
    type: 'build',
    hint: 'Me llamo... soy de Colombia',
    tiles: [
      { ko: '저는',         role: 'subject' },
      { ko: '콜롬비아',     role: 'object'  },
      { ko: '사람이에요',   role: 'verb'    },
    ],
    correctOrder: ['저는', '콜롬비아', '사람이에요'],
    audio: '콜롬비아 사람이에요',
  },
  {
    type: 'build',
    hint: '¿Cómo es la universidad?',
    tiles: [
      { ko: '대학교',  role: 'object' },
      { ko: '어때요?', role: 'verb'   },
    ],
    correctOrder: ['대학교', '어때요?'],
    audio: '대학교 어때요?',
  },
  {
    type: 'build',
    hint: 'Invita a alguien a tomar café',
    tiles: [
      { ko: '커피',      role: 'object' },
      { ko: '마실래요?', role: 'verb'   },
    ],
    correctOrder: ['커피', '마실래요?'],
    audio: '커피 마실래요?',
  },
  {
    type: 'choice',
    prompt: 'Minsu te pregunta "어떻게 지내요?" (¿cómo estás?). Respondes:',
    options: ['좋아요!', '주세요', '없어요'],
    correct: '좋아요!',
    feedbackCorrect: '¡Perfecto! 좋아요 es la respuesta natural',
  },
  {
    type: 'choice',
    prompt: 'Quieres invitar a tu amigo a estudiar juntos. Dices:',
    options: ['공부 어때요?', '같이 공부할래요?', '공부 있어요?'],
    correct: '같이 공부할래요?',
    feedbackCorrect: '¡Exacto! ㄹ래요 es para invitaciones de acción',
  },
  {
    type: 'choice',
    prompt: 'Tu amigo pregunta "이 카페 어때요?" Respondes:',
    options: ['아니에요, 없어요', '좋아요! 커피도 있어요', '네, 주세요'],
    correct: '좋아요! 커피도 있어요',
    feedbackCorrect: '¡Muy bien! Respondes con opinión y añades un detalle con 도',
  },
];

const ACCENT = '#6c63ff';

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function starsForAttempts(attempts: number): number {
  if (attempts === 1) return 3;
  if (attempts === 2) return 2;
  return 1;
}

function StarRow({ count, animate }: { count: number; animate?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
      {[1, 2, 3].map(i => (
        <span
          key={i}
          style={{
            fontSize: 22,
            opacity: i <= count ? 1 : 0.18,
            filter: i <= count ? 'drop-shadow(0 0 4px rgba(245,158,11,0.7))' : 'none',
            animation: animate && i <= count
              ? `gp4-star-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${(i - 1) * 90}ms both`
              : 'none',
            display: 'inline-block',
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

/* ─── Build exercise sub-component ──────────────────────────────────────── */
function BuildView({
  ex,
  onNext,
  onStars,
}: {
  ex: BuildEx;
  onNext: () => void;
  onStars: (n: number) => void;
}) {
  const [chosen,       setChosen]       = useState<string[]>([]);
  const [status,       setStatus]       = useState<'building' | 'wrong' | 'correct'>('building');
  const [attempts,     setAttempts]     = useState(0);
  const [stars,        setStars]        = useState<number | null>(null);
  const [showHint,     setShowHint]     = useState(false);
  // Tiles shuffled once on mount so el orden no es obvio
  const [shuffledPool] = useState<Tile[]>(() => shuffle(ex.tiles));

  const complete = chosen.length === ex.correctOrder.length;

  function addTile(ko: string) {
    if (status !== 'building') return;
    setChosen(prev => [...prev, ko]);
  }

  function check() {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    const ok = chosen.join('') === ex.correctOrder.join('');
    setStatus(ok ? 'correct' : 'wrong');
    if (ok) {
      const s = starsForAttempts(newAttempts);
      setStars(s);
      onStars(s);
      setTimeout(() => playAudio(ex.audio), 300);
    }
  }

  function retry() {
    setChosen([]);
    setStatus('building');
  }

  const chosenTiles = chosen.map(ko => ex.tiles.find(t => t.ko === ko)!).filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Hint */}
      <div>
        <button
          type="button"
          onClick={() => setShowHint(v => !v)}
          style={{
            padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.28)',
            fontSize: 11.5, fontWeight: 700, color: '#d97706',
          }}
        >
          💡 {showHint ? 'Ocultar pista' : 'Ver pista'}
        </button>
        {showHint && (
          <div style={{ marginTop: 6, padding: '9px 13px', borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.28)' }}>
            <p style={{ margin: 0, fontSize: 12.5, color: '#92400e' }}>💡 {ex.hint}</p>
          </div>
        )}
      </div>

      {/* Build zone */}
      <div style={{
        minHeight: 54, padding: '12px', borderRadius: 14,
        background: status === 'correct' ? 'rgba(34,197,94,0.08)' : status === 'wrong' ? 'rgba(239,68,68,0.07)' : 'var(--secondary)',
        border: `2px dashed ${status === 'correct' ? 'rgba(34,197,94,0.4)' : status === 'wrong' ? 'rgba(239,68,68,0.35)' : 'var(--border)'}`,
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8,
        transition: 'all 0.25s ease',
      }}>
        {chosen.length === 0 && (
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted-foreground)' }}>Toca las palabras en orden</p>
        )}
        {chosenTiles.map((t, i) => {
          const tc = TILE_COLORS[t.role];
          return (
            <div key={i} style={{
              padding: '7px 14px', borderRadius: 10,
              fontSize: 16, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif',
              background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color,
              animation: 'gp4-pop 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
            }}>
              {t.ko}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {status === 'wrong' && (
        <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.28)', animation: 'gp4-in 0.3s ease both' }}>
          <p style={{ margin: 0, fontSize: 12.5, color: '#dc2626' }}>❌ Orden incorrecto. Inténtalo de nuevo.</p>
        </div>
      )}
      {status === 'correct' && stars !== null && (
        <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', animation: 'gp4-in 0.3s ease both', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#22c55e' }}>✓ ¡Correcto!</p>
            <StarRow count={stars} animate />
          </div>
        </div>
      )}

      {/* Tile pool — orden shuffled al montar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {shuffledPool.map(t => {
          const used = chosen.includes(t.ko);
          const tc = TILE_COLORS[t.role];
          return (
            <button
              key={t.ko}
              type="button"
              disabled={used || status !== 'building'}
              onClick={() => addTile(t.ko)}
              style={{
                padding: '10px 18px', borderRadius: 12, cursor: used || status !== 'building' ? 'default' : 'pointer',
                fontSize: 17, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif',
                background: used ? 'var(--secondary)' : tc.bg,
                border: `1.5px solid ${used ? 'var(--border)' : tc.border}`,
                color: used ? 'var(--muted-foreground)' : tc.color,
                opacity: used ? 0.35 : 1,
                transition: 'all 0.18s ease',
              }}
            >
              {t.ko}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8 }}>
        {status === 'building' && chosen.length > 0 && (
          <button
            type="button"
            onClick={() => setChosen(prev => prev.slice(0, -1))}
            style={{
              padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
              background: 'var(--secondary)', border: '1px solid var(--border)',
              fontSize: 12, fontWeight: 600, color: 'var(--muted-foreground)', flex: '0 0 auto',
            }}
          >
            ← Borrar última
          </button>
        )}
        {status === 'wrong' && (
          <button
            type="button"
            onClick={retry}
            style={{
              flex: 1, padding: '11px', borderRadius: 12, cursor: 'pointer',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.28)',
              fontSize: 13, fontWeight: 700, color: '#dc2626',
            }}
          >
            🔄 Intentar de nuevo
          </button>
        )}
        {status === 'building' && complete && (
          <button
            type="button"
            onClick={check}
            style={{
              flex: 1, padding: '11px', borderRadius: 12, cursor: 'pointer',
              background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.38)',
              fontSize: 13, fontWeight: 700, color: '#22c55e',
            }}
          >
            ✓ Comprobar
          </button>
        )}
        {status === 'correct' && (
          <button
            type="button"
            onClick={onNext}
            style={{
              flex: 1, padding: '11px', borderRadius: 12, cursor: 'pointer',
              background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.38)',
              fontSize: 13, fontWeight: 700, color: '#22c55e',
            }}
          >
            ¡Correcto! Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Choice exercise sub-component ─────────────────────────────────────── */
function ChoiceView({ ex, onNext, onStars }: { ex: ChoiceEx; onNext: () => void; onStars: (n: number) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const isCorrect = picked === ex.correct;

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    onStars(opt === ex.correct ? 3 : 1);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.4 }}>
        {ex.prompt}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ex.options.map(opt => {
          const state = !picked ? 'idle' : opt === ex.correct ? (picked === opt ? 'correct' : 'reveal') : opt === picked ? 'wrong' : 'idle';
          return (
            <button
              key={opt}
              type="button"
              disabled={!!picked}
              onClick={() => pick(opt)}
              style={{
                textAlign: 'left', padding: '12px 16px', borderRadius: 12,
                fontSize: 14, fontWeight: 600, fontFamily: '"Noto Sans KR",sans-serif',
                lineHeight: 1.45, cursor: picked ? 'default' : 'pointer',
                background: state === 'correct' ? 'rgba(34,197,94,0.12)' : state === 'wrong' ? 'rgba(239,68,68,0.09)' : state === 'reveal' ? 'rgba(34,197,94,0.06)' : 'var(--secondary)',
                border: state === 'correct' ? '1px solid rgba(34,197,94,0.5)' : state === 'wrong' ? '1px solid rgba(239,68,68,0.4)' : state === 'reveal' ? '1px solid rgba(34,197,94,0.28)' : '1px solid var(--border)',
                color: state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : 'var(--foreground)',
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'all 0.18s ease',
              }}
            >
              <span style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800,
                background: state === 'correct' ? 'rgba(34,197,94,0.25)' : state === 'wrong' ? 'rgba(239,68,68,0.2)' : state === 'reveal' ? 'rgba(34,197,94,0.15)' : 'var(--border)',
                color: state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : 'var(--muted-foreground)',
              }}>
                {state === 'correct' ? '✓' : state === 'wrong' ? '✕' : state === 'reveal' ? '✓' : ''}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {picked && (
        <>
          <div style={{
            padding: '12px 15px', borderRadius: 12, animation: 'gp4-in 0.3s ease both',
            background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
            border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
          }}>
            {isCorrect
              ? <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#22c55e' }}>✓ {ex.feedbackCorrect}</p>
              : <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>→ La respuesta correcta es: <strong style={{ color: '#22c55e' }}>{ex.correct}</strong></p>
            }
          </div>
          <button
            type="button"
            onClick={onNext}
            style={{
              padding: '12px', borderRadius: 12, cursor: 'pointer', width: '100%',
              background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.35)',
              fontSize: 13, fontWeight: 700, color: '#22c55e',
            }}
          >
            Siguiente →
          </button>
        </>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function GuidedProduction004({ onComplete }: Props) {
  const [exIdx,      setExIdx]      = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [done,       setDone]       = useState(false);

  const MAX_STARS = 18; // 6 exercises × 3 stars

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  function handleStars(n: number) {
    setTotalStars(s => s + n);
  }

  function goNext() {
    if (exIdx >= EXERCISES.length - 1) {
      setDone(true);
      onComplete?.();
    } else {
      setExIdx(i => i + 1);
    }
  }

  /* ── DONE ─────────────────────────────────────────────────────────────── */
  if (done) {
    const msg =
      totalStars >= 15
        ? '¡Producción perfecta! 🏆 David orgulloso de ti'
        : totalStars >= 10
        ? '¡Muy bien producido! ⭐ Ya suenas coreano'
        : '¡Buen intento! 💪 La práctica hace al maestro';

    return (
      <div style={{ ...base, padding: '32px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <style>{`
          @keyframes gp4-star-pop { from{opacity:0;transform:scale(0)} 70%{transform:scale(1.3)} to{opacity:1;transform:scale(1)} }
          @keyframes gp4-in  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
          @keyframes gp4-pop { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
        `}</style>

        <p style={{ fontSize: 48, margin: 0 }}>
          {totalStars >= 15 ? '🏆' : totalStars >= 10 ? '⭐' : '💪'}
        </p>

        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
          {msg}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <StarRow count={Math.round((totalStars / MAX_STARS) * 3)} animate />
          <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>
            {totalStars} / {MAX_STARS} estrellas
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320 }}>
          {[
            '콜롬비아 사람이에요 ✓',
            '대학교 어때요? ✓',
            '커피 마실래요? ✓',
          ].map(s => (
            <div key={s} style={{
              padding: '10px 16px', borderRadius: 12,
              background: 'rgba(108,99,255,0.09)', border: '1px solid rgba(108,99,255,0.25)',
              fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif',
              color: ACCENT,
            }}>
              {s}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onComplete?.()}
          style={{
            padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%', maxWidth: 320,
            background: `rgba(108,99,255,0.14)`, border: `1px solid rgba(108,99,255,0.4)`,
            fontSize: 14, fontWeight: 800, color: ACCENT,
          }}
        >
          Siguiente etapa →
        </button>
      </div>
    );
  }

  /* ── EXERCISE ─────────────────────────────────────────────────────────── */
  const ex = EXERCISES[exIdx];

  return (
    <div style={{ ...base, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <style>{`
        @keyframes gp4-star-pop { from{opacity:0;transform:scale(0)} 70%{transform:scale(1.3)} to{opacity:1;transform:scale(1)} }
        @keyframes gp4-in  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes gp4-pop { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Header */}
      <div>
        <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>
          ✍️ Tú eres David
        </p>
        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted-foreground)' }}>
          Ejercicio {exIdx + 1} de {EXERCISES.length}
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 5 }}>
        {EXERCISES.map((_, i) => (
          <div key={i} style={{
            height: 6, flex: 1, borderRadius: 3,
            background: i < exIdx ? '#22c55e' : i === exIdx ? ACCENT : 'var(--border)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Exercise card */}
      <div
        key={exIdx}
        style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 18, padding: '18px 16px',
          animation: 'gp4-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        {ex.type === 'build' ? (
          <BuildView key={exIdx} ex={ex as BuildEx} onNext={goNext} onStars={handleStars} />
        ) : (
          <ChoiceView key={exIdx} ex={ex as ChoiceEx} onNext={goNext} onStars={handleStars} />
        )}
      </div>
    </div>
  );
}
