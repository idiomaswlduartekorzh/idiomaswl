'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types & Data ───────────────────────────────────────────────────────── */
interface BuildExercise {
  id: string;
  level: 1 | 2 | 3;
  levelLabel: string;
  instruction: string;
  sub?: string;
  hint?: string;
  tiles: { ko: string; role: 'subject' | 'object' | 'verb' | 'modifier' | 'filler'; audio?: string }[];
  correctOrder: string[];
  audio?: string;
  explanation: string;
}

interface ChoiceExercise {
  id: string;
  ko?: string;
  prompt: string;
  sub?: string;
  options: string[];
  correct: string;
  explanation: string;
  audio?: string;
}

type Exercise = { type: 'build'; data: BuildExercise } | { type: 'choice'; data: ChoiceExercise };

const EXERCISES: Exercise[] = [
  /* Level 1 — simple order: 사이즈 + 주세요 */
  {
    type: 'build',
    data: {
      id: 'gp1',
      level: 1,
      levelLabel: 'Nivel 1 — Construye el pedido',
      instruction: 'Pide un americano. Pon las palabras en el orden correcto.',
      hint: 'El verbo (주세요) siempre va al final',
      tiles: [
        { ko: '주세요', role: 'verb' },
        { ko: '아메리카노', role: 'object', audio: '아메리카노 한 잔 주세요' },
        { ko: '한 잔', role: 'modifier' },
      ],
      correctOrder: ['아메리카노', '한 잔', '주세요'],
      audio: '아메리카노 한 잔 주세요',
      explanation: 'SOV: objeto (아메리카노 + 한 잔) → verbo (주세요). El verbo siempre cierra, como en Step001.',
    },
  },
  /* Level 2 — longer: tamaño + producto + 주세요 */
  {
    type: 'build',
    data: {
      id: 'gp2',
      level: 2,
      levelLabel: 'Nivel 2 — Agrega el tamaño',
      instruction: 'Pide un americano grande. Hay un distractor en la lista.',
      sub: '아메리카노(americano) · 라지(grande) · 주세요(por favor) — ignora 감사합니다',
      hint: '감사합니다 es una distracción — no va en el pedido',
      tiles: [
        { ko: '주세요', role: 'verb' },
        { ko: '아메리카노', role: 'object' },
        { ko: '라지', role: 'modifier' },
        { ko: '감사합니다', role: 'filler' },
      ],
      correctOrder: ['아메리카노', '라지', '주세요'],
      audio: '아메리카노 한 잔 주세요',
      explanation: '감사합니다 = gracias, no va en el pedido. El patrón es [producto] + [tamaño] + 주세요. Siempre SOV.',
    },
  },
  /* Choice — formalidad context */
  {
    type: 'choice',
    data: {
      id: 'gp3',
      prompt: 'Tu amigo te ofrece algo de tomar en su casa. Rechazas amablemente.',
      sub: '¿Qué frase es correcta para este contexto casual?',
      options: ['괜찮아, 고마워 (casual ✓)','괜찮습니다, 감사합니다 (demasiado formal)','주세요 (estás pidiendo, no rechazando)','없어요 (afirmas que no existe)'],
      correct: '괜찮아, 고마워 (casual ✓)',
      explanation: 'Con un amigo → sin -요. Usar 합쇼체 con un amigo íntimo suena robótico y distante. La formalidad importa tanto como el vocabulario.',
    },
  },
  /* Level 3 — full sentence with 저는 */
  {
    type: 'build',
    data: {
      id: 'gp4',
      level: 3,
      levelLabel: 'Nivel 3 — Frase completa con sujeto',
      instruction: 'Construye: "Yo soy Haeun" con el sujeto explícito.',
      sub: '저는(yo) · 하은이에요(soy Haeun) — recuerda: 이에요 porque 하은 termina en consonante',
      hint: 'Sujeto (저는) siempre al inicio en coreano',
      tiles: [
        { ko: '하은이에요', role: 'verb', audio: '저는 하은이에요' },
        { ko: '저는', role: 'subject' },
      ],
      correctOrder: ['저는', '하은이에요'],
      audio: '저는 하은이에요',
      explanation: '저는(S) + 하은이에요(이다 = verbo al final). SOV + 이다: ambas reglas en una frase. El verbo siempre cierra — aunque sea 이다.',
    },
  },
  /* Choice — 이에요 vs 예요 production */
  {
    type: 'choice',
    data: {
      id: 'gp5',
      ko: '저는 의사___ .',
      prompt: '의사 (médico/a) termina en 사 (vocal). ¿Qué sufijo usas?',
      options: ['의사예요 ✓ (vocal → 예요)','의사이에요 (vocal → no necesita 이)','의사입니다 (solo si es entrevista)','의사있어요 (no es existencia)'],
      correct: '의사예요 ✓ (vocal → 예요)',
      explanation: '의사 termina en 사 (vocal ㅏ) → 예요 sin puente. 이에요 después de vocal suena torpe y es incorrecto. 입니다 sería apropiado en entrevista formal, pero no aquí.',
    },
  },
  /* Choice — complete café order integration */
  {
    type: 'choice',
    data: {
      id: 'gp6',
      prompt: 'Quieres pedir: "¿Tiene leche de avena?" La barista entendió solo 귀리 우유 (leche de avena). ¿Cómo preguntas si existe?',
      sub: '귀리 우유 = leche de avena · Usa 있다',
      options: [
        '귀리 우유 있어요? (¿hay leche de avena?)',
        '귀리 우유예요? (¿es leche de avena?)',
        '귀리 우유 없어요? (¿no hay leche?)',
        '귀리 우유 주세요 (pediste sin preguntar)',
      ],
      correct: '귀리 우유 있어요? (¿hay leche de avena?)',
      explanation: '있어요? en pregunta = ¿hay? / ¿existe? Preguntas por existencia del producto, no por su identidad (이에요). Esta frase integra: SOV implícito + 있다 de Step003 + vocabulario nuevo que puedes deducir.',
    },
  },
];

const TILE_COLORS: Record<BuildExercise['tiles'][0]['role'], { bg: string; border: string; color: string }> = {
  subject:  { bg: 'rgba(232,121,249,0.12)', border: 'rgba(232,121,249,0.4)', color: '#e879f9' },
  object:   { bg: 'rgba(108,99,255,0.12)',  border: 'rgba(108,99,255,0.4)',  color: 'var(--wl-on-panel-link, #6c63ff)' },
  verb:     { bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.4)',   color: '#22c55e' },
  modifier: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', color: '#f59e0b' },
  filler:   { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', color: 'var(--muted-foreground)' },
};

function starsForAttempts(attempts: number): number {
  if (attempts === 1) return 3;
  if (attempts === 2) return 2;
  return 1;
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */
function StarDisplay({ count, animate }: { count: number; animate?: boolean }) {
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
              ? `gp-star-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${(i - 1) * 100}ms both`
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

function BuildExerciseView({
  ex, onNext, onStarsEarned,
}: {
  ex: BuildExercise;
  onNext: () => void;
  onStarsEarned: (stars: number) => void;
}) {
  const [chosen, setChosen]         = useState<string[]>([]);
  const [state,  setState]          = useState<'building' | 'wrong' | 'correct'>('building');
  const [played, setPlayed]         = useState(false);
  const [attempts, setAttempts]     = useState(0);
  const [starsEarned, setStarsEarned] = useState<number | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintUsed, setHintUsed]     = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const remaining = ex.tiles.filter(t => !chosen.includes(t.ko));
  const isComplete = chosen.length === ex.correctOrder.length;

  function addTile(ko: string) {
    if (state !== 'building') return;
    setChosen(prev => [...prev, ko]);
  }

  function removeLast() {
    if (state !== 'building') return;
    setChosen(prev => prev.slice(0, -1));
  }

  function toggleHint() {
    if (!hintUsed) setHintUsed(true);
    setHintVisible(v => !v);
  }

  function check() {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    const correct = chosen.join('') === ex.correctOrder.join('');
    setState(correct ? 'correct' : 'wrong');
    if (correct) {
      const stars = starsForAttempts(newAttempts);
      setStarsEarned(stars);
      onStarsEarned(stars);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2200);
      if (ex.audio && !played) {
        setTimeout(() => { playAudio(ex.audio!); setPlayed(true); }, 200);
      }
    }
  }

  function retry() {
    setChosen([]);
    setState('building');
  }

  const chosenTiles = chosen.map(ko => ex.tiles.find(t => t.ko === ko)!).filter(Boolean);
  const isFirstTryCorrect = starsEarned === 3;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{
          fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
          padding: '3px 10px', borderRadius: 100,
          background: ex.level === 1 ? 'rgba(34,197,94,0.12)' : ex.level === 2 ? 'rgba(245,158,11,0.12)' : 'rgba(232,121,249,0.12)',
          border: `1px solid ${ex.level === 1 ? 'rgba(34,197,94,0.3)' : ex.level === 2 ? 'rgba(245,158,11,0.3)' : 'rgba(232,121,249,0.3)'}`,
          color: ex.level === 1 ? '#22c55e' : ex.level === 2 ? '#f59e0b' : '#e879f9',
        }}>{ex.levelLabel}</span>
      </div>

      <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', letterSpacing: '0.04em' }}>
        Toca las palabras en el orden correcto
      </p>
      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.4 }}>{ex.instruction}</p>
      {ex.sub && <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{ex.sub}</p>}

      {/* Hint button + box */}
      {ex.hint && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button
            type="button"
            onClick={toggleHint}
            style={{
              alignSelf: 'flex-start', padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.28)',
              fontSize: 11.5, fontWeight: 700, color: 'var(--wl-on-panel-warn, #d97706)',
              opacity: hintUsed && !hintVisible ? 0.55 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            💡 {hintVisible ? 'Ocultar pista' : 'Ver pista'}
          </button>
          {hintVisible && (
            <div style={{
              padding: '10px 14px', borderRadius: 12,
              background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.3)',
              animation: 'gp-in 0.25s ease both',
            }}>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--wl-on-panel-warn, #92400e)', lineHeight: 1.55 }}>
                💡 {ex.hint}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Build zone */}
      <div style={{
        minHeight: 56, padding: '12px', borderRadius: 14,
        background: state === 'correct' ? 'rgba(34,197,94,0.08)' : state === 'wrong' ? 'rgba(239,68,68,0.08)' : 'var(--secondary)',
        border: `2px dashed ${state === 'correct' ? 'rgba(34,197,94,0.4)' : state === 'wrong' ? 'rgba(239,68,68,0.4)' : 'var(--border)'}`,
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8,
        transition: 'all 0.25s ease',
        position: 'relative',
      }}>
        {chosen.length === 0 && (
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted-foreground)' }}>
            Toca las palabras de abajo para armar la frase
          </p>
        )}
        {chosenTiles.map((t, i) => {
          const tc = TILE_COLORS[t.role];
          return (
            <div key={i} style={{
              padding: '7px 14px', borderRadius: 10, fontSize: 15, fontWeight: 800,
              fontFamily: '"Noto Sans KR",sans-serif',
              background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color,
              animation: 'gp-pop 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
            }}>{t.ko}</div>
          );
        })}
      </div>

      {/* Celebration text */}
      {showCelebration && (
        <div style={{
          textAlign: 'center', fontSize: 18, fontWeight: 800,
          color: isFirstTryCorrect ? '#22c55e' : '#16a34a',
          animation: 'gp-celebrate 2.2s ease both',
        }}>
          {isFirstTryCorrect ? '¡Perfecto! 🎉' : '¡Lo tienes! ✓'}
        </div>
      )}

      {/* State feedback */}
      {state === 'wrong' && (
        <div style={{
          padding: '11px 14px', borderRadius: 12,
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)',
          animation: 'gp-in 0.3s ease both',
        }}>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--wl-on-panel-alert, #dc2626)' }}>
            ❌ Ese orden no es correcto. Revisa el patrón SOV e inténtalo de nuevo.
          </p>
        </div>
      )}
      {state === 'correct' && (
        <div style={{
          padding: '11px 14px', borderRadius: 12,
          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)',
          animation: 'gp-in 0.3s ease both',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#22c55e' }}>✓ ¡Correcto!</p>
            {starsEarned !== null && <StarDisplay count={starsEarned} animate />}
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>{ex.explanation}</p>
        </div>
      )}

      {/* Tile pool */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {ex.tiles.map(t => {
          const used = chosen.includes(t.ko);
          const tc = TILE_COLORS[t.role];
          return (
            <button key={t.ko} type="button" disabled={used || state !== 'building'}
              onClick={() => addTile(t.ko)}
              style={{
                padding: '10px 18px', borderRadius: 12,
                cursor: used || state !== 'building' ? 'default' : 'pointer',
                fontSize: 17, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif',
                background: used ? 'var(--secondary)' : tc.bg,
                border: `1.5px solid ${used ? 'var(--border)' : tc.border}`,
                color: used ? 'var(--muted-foreground)' : tc.color,
                opacity: used ? 0.4 : 1,
                transition: 'all 0.18s ease',
              }}>{t.ko}</button>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8 }}>
        {state === 'building' && chosen.length > 0 && (
          <button type="button" onClick={removeLast}
            style={{
              padding: '10px 16px', borderRadius: 12, cursor: 'pointer',
              background: 'var(--secondary)', border: '1px solid var(--border)',
              fontSize: 12, fontWeight: 600, color: 'var(--muted-foreground)', flex: '0 0 auto',
            }}>
            ← Borrar última
          </button>
        )}
        {state === 'wrong' && (
          <button type="button" onClick={retry}
            style={{
              flex: 1, padding: '12px', borderRadius: 13, cursor: 'pointer',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              fontSize: 13, fontWeight: 700, color: 'var(--wl-on-panel-alert, #dc2626)',
            }}>
            🔄 Intentar de nuevo
          </button>
        )}
        {state === 'building' && isComplete && (
          <button type="button" onClick={check}
            style={{
              flex: 1, padding: '12px', borderRadius: 13, cursor: 'pointer',
              background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.4)',
              fontSize: 13, fontWeight: 700, color: '#22c55e', transition: 'all 0.18s ease',
            }}>
            ✓ Comprobar
          </button>
        )}
        {state === 'correct' && (
          <button type="button" onClick={onNext}
            style={{
              flex: 1, padding: '12px', borderRadius: 13, cursor: 'pointer',
              background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.4)',
              fontSize: 13, fontWeight: 700, color: '#22c55e',
            }}>
            ¡Correcto! Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}

function ChoiceView({ ex, onNext }: { ex: ChoiceExercise; onNext: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const isCorrect = picked === ex.correct;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {ex.ko && (
        <div style={{
          padding: '14px 16px', borderRadius: 14, textAlign: 'center',
          background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.28)',
        }}>
          <p style={{ margin: 0, fontSize: 26, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{ex.ko}</p>
        </div>
      )}
      <p style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.4 }}>{ex.prompt}</p>
      {ex.sub && <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted-foreground)' }}>{ex.sub}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ex.options.map(opt => {
          const state = !picked ? 'idle' : opt === ex.correct ? (picked === opt ? 'correct' : 'reveal') : opt === picked ? 'wrong' : 'idle';
          return (
            <button key={opt} type="button" disabled={!!picked}
              onClick={() => { setPicked(opt); if (ex.audio) setTimeout(() => playAudio(ex.audio!), 280); }}
              style={{
                textAlign: 'left', padding: '12px 16px', borderRadius: 12, fontSize: 13,
                fontWeight: 500, lineHeight: 1.5, cursor: picked ? 'default' : 'pointer',
                background: state === 'correct' ? 'rgba(34,197,94,0.12)' : state === 'wrong' ? 'rgba(239,68,68,0.09)' : state === 'reveal' ? 'rgba(34,197,94,0.06)' : 'var(--secondary)',
                border: state === 'correct' ? '1px solid rgba(34,197,94,0.5)' : state === 'wrong' ? '1px solid rgba(239,68,68,0.45)' : state === 'reveal' ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--border)',
                color: state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : 'var(--foreground)',
                display: 'flex', alignItems: 'flex-start', gap: 10, transition: 'all 0.18s ease',
              }}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800,
                background: state === 'correct' ? 'rgba(34,197,94,0.25)' : state === 'wrong' ? 'rgba(239,68,68,0.2)' : state === 'reveal' ? 'rgba(34,197,94,0.15)' : 'var(--border)',
                color: state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : 'var(--muted-foreground)',
              }}>{state === 'correct' ? '✓' : state === 'wrong' ? '✕' : state === 'reveal' ? '✓' : ''}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {picked && (
        <>
          <div style={{
            padding: '13px 16px', borderRadius: 12, animation: 'gp-in 0.3s ease both',
            background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
            border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
          }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: isCorrect ? '#22c55e' : '#f59e0b' }}>
              {isCorrect ? '✓ Correcto' : `→ Respuesta: ${ex.correct}`}
            </p>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.65 }}>{ex.explanation}</p>
          </div>
          <button type="button" onClick={onNext}
            style={{
              padding: '12px', borderRadius: 13, cursor: 'pointer', width: '100%',
              background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.4)',
              fontSize: 13, fontWeight: 700, color: '#22c55e',
            }}>
            Siguiente →
          </button>
        </>
      )}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function GuidedProduction003({ onComplete }: Props) {
  const [exIdx,      setExIdx]      = useState(0);
  const [done,       setDone]       = useState(false);
  const [totalStars, setTotalStars] = useState(0);
  const [maxStars,   setMaxStars]   = useState(0);

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  const buildExerciseCount = EXERCISES.filter(e => e.type === 'build').length;

  function handleStarsEarned(stars: number) {
    setTotalStars(prev => prev + stars);
    setMaxStars(prev => prev + 3);
  }

  function goNext() {
    if (exIdx === EXERCISES.length - 1) { setDone(true); onComplete?.(); }
    else setExIdx(i => i + 1);
  }

  if (done) {
    const perfectRun = totalStars === maxStars && maxStars > 0;
    return (
      <div style={{ ...base, padding: '32px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <style>{`
          @keyframes gp-pop{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
          @keyframes gp-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
          @keyframes gp-star-pop{from{opacity:0;transform:scale(0.5) rotate(-15deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
          @keyframes gp-celebrate{0%{opacity:0;transform:scale(0.8) translateY(4px)}15%{opacity:1;transform:scale(1.1) translateY(0)}30%{transform:scale(1)}80%{opacity:1}100%{opacity:0;transform:translateY(-6px)}}
        `}</style>
        <p style={{ fontSize: 48, margin: 0 }}>{perfectRun ? '🏆' : '✍️'}</p>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
          {perfectRun ? '¡Producción perfecta! 🏆' : '¡Producción completada! ✍️'}
        </h3>

        {maxStars > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <StarDisplay count={Math.round((totalStars / maxStars) * 3)} animate />
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>
              {totalStars} / {maxStars} estrellas en ejercicios de construcción
            </p>
          </div>
        )}

        <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-foreground)', maxWidth: 300, lineHeight: 1.6 }}>
          Ya construyes pedidos con SOV, eliges 이에요/예요 según la palabra y usas 있다 para preguntar por existencia.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 300 }}>
          {['아메리카노 라지 주세요 ✓', '저는 의사예요 ✓', '귀리 우유 있어요? ✓'].map(s => (
            <div key={s} style={{
              padding: '10px 16px', borderRadius: 12,
              background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.25)',
              fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--wl-on-panel-ok, #16a34a)',
            }}>{s}</div>
          ))}
        </div>
      </div>
    );
  }

  const ex = EXERCISES[exIdx];

  return (
    <div style={{ ...base, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <style>{`
        @keyframes gp-pop{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
        @keyframes gp-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes gp-star-pop{from{opacity:0;transform:scale(0.5) rotate(-15deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
        @keyframes gp-celebrate{0%{opacity:0;transform:scale(0.8) translateY(4px)}15%{opacity:1;transform:scale(1.1) translateY(0)}30%{transform:scale(1)}80%{opacity:1}100%{opacity:0;transform:translateY(-6px)}}
      `}</style>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {EXERCISES.map((_, i) => (
          <div key={i} style={{
            width: i === exIdx ? 24 : 8, height: 8, borderRadius: 4,
            background: i < exIdx ? '#22c55e' : i === exIdx ? '#22c55e' : 'var(--border)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#22c55e' }}>
        ✍️ Producción guiada · {exIdx + 1} de {EXERCISES.length}
      </p>

      <div key={exIdx} style={{ animation: 'gp-in 0.38s ease both' }}>
        {ex.type === 'build'
          ? <BuildExerciseView
              key={exIdx}
              ex={ex.data as BuildExercise}
              onNext={goNext}
              onStarsEarned={handleStarsEarned}
            />
          : <ChoiceView key={exIdx} ex={ex.data as ChoiceExercise} onNext={goNext} />
        }
      </div>
    </div>
  );
}
