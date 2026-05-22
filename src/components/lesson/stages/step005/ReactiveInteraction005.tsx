'use client';

import { useState, useRef, useEffect, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ───────────────────────────────────────────────────────────────── */
type Phase = 'intro' | 'roleplay' | 'done';
type QualityLevel = 'spontaneous' | 'helped' | 'wrong';

interface RoleTurn {
  id: number;
  speaker: string;
  bubble: string;
  translation: string;
  audio: string | null;
  hint: string;
  accepted: string[];
  placeholder: string;
  correctExample: string;
}

interface HistoryEntry {
  turn: RoleTurn;
  userInput: string;
  quality: QualityLevel;
  score: number;
}

/* ─── Conversation turns ──────────────────────────────────────────────────── */
const TURNS: RoleTurn[] = [
  {
    id: 1,
    speaker: 'Minsu',
    bubble: '한국 생활 어때요?',
    translation: '¿Cómo es tu vida en Corea?',
    audio: '한국 생활 어때요?',
    hint: 'Menciona dónde estudias usando 에서',
    accepted: ['공부해요', '대학교에서', '대학교'],
    placeholder: '이 대학교에서...',
    correctExample: '이 대학교에서 공부해요',
  },
  {
    id: 2,
    speaker: 'Minsu',
    bubble: '아, 그래요? 어디에서 일해요?',
    translation: '¿Ah sí? ¿Dónde trabajas?',
    audio: null,
    hint: 'Di dónde trabajas con 에서',
    accepted: ['카페에서', '일해요', '카페'],
    placeholder: '카페에서...',
    correctExample: '카페에서 일해요',
  },
  {
    id: 3,
    speaker: 'Minsu',
    bubble: '한국 좋아해요?',
    translation: '¿Te gusta Corea?',
    audio: null,
    hint: 'Responde con 좋아해요 (no 좋아요)',
    accepted: ['좋아해요', '네', '한국'],
    placeholder: '네, 한국...',
    correctExample: '네, 한국 좋아해요',
  },
  {
    id: 4,
    speaker: 'Minsu',
    bubble: '친구들이 많아요?',
    translation: '¿Tienes muchos amigos?',
    audio: null,
    hint: 'Responde sobre tus amigos',
    accepted: ['친구들', '많아요', '있어요', '없어요'],
    placeholder: '네, 친구들이...',
    correctExample: '네, 친구들이 많아요',
  },
  {
    id: 5,
    speaker: 'Minsu',
    bubble: '매일 카페에 가요?',
    translation: '¿Vas al café todos los días?',
    audio: null,
    hint: 'Confirma y añade un detalle',
    accepted: ['매일', '가요', '네', '카페'],
    placeholder: '네, 매일...',
    correctExample: '네, 매일 카페에 가요',
  },
];

/* ─── Validation ──────────────────────────────────────────────────────────── */
function validate(turn: RoleTurn, input: string): QualityLevel {
  const t = input.trim().toLowerCase().replace(/\s+/g, '');
  const hasAccepted = turn.accepted.some(word =>
    t.includes(word.toLowerCase().replace(/\s+/g, ''))
  );
  if (hasAccepted) return 'spontaneous';
  if (t.length >= 2) return 'helped';
  return 'wrong';
}

/* ─── Trampa 좋아요 detection ─────────────────────────────────────────────── */
function usedJoayoInstead(turnId: number, input: string): boolean {
  if (turnId !== 3) return false;
  const t = input.trim();
  return t.includes('좋아요') && !t.includes('좋아해요');
}

/* ─── Quality config ──────────────────────────────────────────────────────── */
const QC: Record<QualityLevel, { badge: string; bg: string; border: string; text: string; label: string; score: number }> = {
  spontaneous: { badge: '⭐', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.45)',  text: '#16a34a', label: 'Espontáneo', score: 2 },
  helped:      { badge: '💛', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)',  text: '#b45309', label: 'Con ayuda',  score: 1 },
  wrong:       { badge: '✕',  bg: 'rgba(239,68,68,0.09)',  border: 'rgba(239,68,68,0.4)',   text: '#dc2626', label: 'Reintento',  score: 0 },
};

/* ─── Stars bar ───────────────────────────────────────────────────────────── */
function StarsBar({ earned, total }: { earned: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{
          fontSize: 20,
          opacity: i < earned ? 1 : 0.2,
          filter: i < earned ? 'drop-shadow(0 0 4px gold)' : 'none',
          transition: 'opacity 0.4s ease, filter 0.4s ease',
        }}>⭐</span>
      ))}
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function ReactiveInteraction005({ onComplete }: Props) {
  const [phase,     setPhase]     = useState<Phase>('intro');
  const [turnIdx,   setTurnIdx]   = useState(0);
  const [inputVal,  setInputVal]  = useState('');
  const [submitted, setSubmitted] = useState<QualityLevel | null>(null);
  const [retryUsed, setRetryUsed] = useState(false);
  const [history,   setHistory]   = useState<HistoryEntry[]>([]);
  const [score,     setScore]     = useState(0);
  const [showHint,  setShowHint]  = useState(false);
  const bottomRef                 = useRef<HTMLDivElement>(null);
  const inputRef                  = useRef<HTMLInputElement>(null);

  const turn = TURNS[turnIdx] ?? null;
  const starsEarned = history.filter(h => h.quality === 'spontaneous').length;

  /* Auto-play Minsu audio when turn changes */
  useEffect(() => {
    if (phase !== 'roleplay' || !turn || !turn.audio) return;
    const t = setTimeout(() => playAudio(turn.audio!), 500);
    return () => clearTimeout(t);
  }, [turnIdx, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Scroll to bottom after submission */
  useEffect(() => {
    const t = setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 120);
    return () => clearTimeout(t);
  }, [submitted, turnIdx]);

  function startRoleplay() {
    setPhase('roleplay');
    setTurnIdx(0);
    setInputVal('');
    setSubmitted(null);
    setRetryUsed(false);
    setHistory([]);
    setScore(0);
    setShowHint(false);
  }

  function submit() {
    if (!turn || !inputVal.trim()) return;
    const quality = validate(turn, inputVal);
    setSubmitted(quality);
  }

  function advance(quality: QualityLevel, input: string) {
    if (!turn) return;
    const pts = QC[quality].score;
    const newScore = score + pts;
    const newHistory: HistoryEntry[] = [...history, { turn, userInput: input, quality, score: pts }];
    setHistory(newHistory);
    setScore(newScore);
    setSubmitted(null);
    setRetryUsed(false);
    setInputVal('');
    setShowHint(false);
    if (turnIdx === TURNS.length - 1) {
      setPhase('done');
      onComplete?.();
    } else {
      setTurnIdx(i => i + 1);
    }
    setTimeout(() => inputRef.current?.focus(), 200);
  }

  function retry() {
    setSubmitted(null);
    setRetryUsed(true);
    setInputVal('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function replay() {
    setPhase('intro');
    setTurnIdx(0);
    setInputVal('');
    setSubmitted(null);
    setRetryUsed(false);
    setHistory([]);
    setScore(0);
    setShowHint(false);
  }

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  /* ── Intro ─────────────────────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <div style={{ ...base, padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <style>{`
          @keyframes ri5-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
          @keyframes ri5-slide-l { from{opacity:0;transform:translateX(-36px) scale(0.96)} to{opacity:1;transform:none} }
          @keyframes ri5-slide-r { from{opacity:0;transform:translateX(36px) scale(0.96)} to{opacity:1;transform:none} }
        `}</style>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800 }}>Tú eres David 🎬</h2>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.65, maxWidth: 320, marginInline: 'auto' }}>
            Minsu te pregunta sobre tu vida en Corea. Responde usando 에서, 에 y 좋아해요.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { badge: '⭐', label: 'Espontáneo', color: '#16a34a', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)' },
            { badge: '💛', label: 'Con ayuda',  color: '#b45309', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.35)' },
            { badge: '🔄', label: 'Reintento',  color: '#dc2626', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.35)' },
          ].map(({ badge, label, color, bg, border }) => (
            <span key={label} style={{ fontSize: 12, fontWeight: 700, padding: '5px 13px', borderRadius: 100, background: bg, border: `1px solid ${border}`, color }}>
              {badge} {label}
            </span>
          ))}
        </div>

        <button type="button" onClick={startRoleplay}
          style={{ padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%', background: 'rgba(108,99,255,0.14)', border: '1px solid rgba(108,99,255,0.4)', fontSize: 14, fontWeight: 700, color: '#6c63ff' }}>
          Empezar conversación →
        </button>
      </div>
    );
  }

  /* ── Done ──────────────────────────────────────────────────────────────── */
  if (phase === 'done') {
    const maxScore = TURNS.length * 2;
    const doneMsg = score >= 8
      ? '¡Conversación perfecta! 🎉 Minsu sabe todo de ti'
      : score >= 5
        ? '¡Muy bien! 💪 Ya describes tu vida en coreano'
        : '¡Sigue practicando! El idioma se aprende hablando';
    const doneColor  = score >= 8 ? '#22c55e' : score >= 5 ? '#f59e0b' : '#6c63ff';
    const doneBg     = score >= 8 ? 'rgba(34,197,94,0.1)' : score >= 5 ? 'rgba(245,158,11,0.1)' : 'rgba(108,99,255,0.1)';
    const doneBorder = score >= 8 ? 'rgba(34,197,94,0.3)' : score >= 5 ? 'rgba(245,158,11,0.3)' : 'rgba(108,99,255,0.3)';

    return (
      <div style={{ ...base, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <style>{`@keyframes ri5-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }`}</style>

        <StarsBar earned={starsEarned} total={TURNS.length} />

        <div style={{ padding: '14px 28px', borderRadius: 14, background: doneBg, border: `1px solid ${doneBorder}`, textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800, color: doneColor }}>{score}/{maxScore}</p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted-foreground)' }}>puntos</p>
        </div>

        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, textAlign: 'center' }}>{doneMsg}</h3>

        {/* History review */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {history.map((entry, i) => {
            const qc = QC[entry.quality];
            return (
              <div key={i} style={{ background: 'var(--card)', border: `1px solid ${qc.border}`, borderRadius: 14, padding: '12px 14px', animation: 'ri5-in 0.3s ease both' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{qc.badge}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: qc.text, padding: '2px 8px', borderRadius: 100, background: qc.bg, border: `1px solid ${qc.border}` }}>
                    {qc.label}
                  </span>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)', marginLeft: 'auto' }}>Turno {i + 1} · +{entry.score} pts</p>
                </div>
                <p style={{ margin: '0 0 3px', fontSize: 12, color: 'var(--muted-foreground)' }}>
                  민수: {entry.turn.bubble}
                </p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>
                  {entry.userInput}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <button type="button" onClick={onComplete}
            style={{ padding: '13px', borderRadius: 13, cursor: 'pointer', width: '100%', background: 'rgba(108,99,255,0.14)', border: '1px solid rgba(108,99,255,0.4)', fontSize: 14, fontWeight: 700, color: '#6c63ff' }}>
            Siguiente etapa →
          </button>
          <button type="button" onClick={replay}
            style={{ padding: '11px', borderRadius: 12, cursor: 'pointer', width: '100%', background: 'var(--secondary)', border: '1px solid var(--border)', fontSize: 13, fontWeight: 600, color: 'var(--muted-foreground)' }}>
            Repetir conversación ↺
          </button>
        </div>
      </div>
    );
  }

  /* ── Active roleplay ───────────────────────────────────────────────────── */
  return (
    <div style={{ ...base, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        @keyframes ri5-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes ri5-slide-l { from{opacity:0;transform:translateX(-36px) scale(0.96)} to{opacity:1;transform:none} }
        @keyframes ri5-slide-r { from{opacity:0;transform:translateX(36px) scale(0.96)} to{opacity:1;transform:none} }
      `}</style>

      {/* Stars + progress dots */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <StarsBar earned={starsEarned} total={TURNS.length} />
        <div style={{ display: 'flex', gap: 6 }}>
          {TURNS.map((_, i) => (
            <div key={i} style={{
              width: i === turnIdx ? 24 : 8, height: 8, borderRadius: 4,
              background: i < turnIdx ? '#6c63ff' : i === turnIdx ? '#6c63ff' : 'var(--border)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff' }}>
          🎭 Tu turno · {turnIdx + 1} de {TURNS.length}
        </p>
      </div>

      {/* Conversation history */}
      {history.map((entry, i) => {
        const qc = QC[entry.quality];
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ alignSelf: 'flex-start', maxWidth: '80%', animation: 'ri5-slide-l 0.4s ease both' }}>
              <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)', paddingLeft: 4 }}>민수 Minsu</p>
              <div style={{ padding: '10px 14px', borderRadius: '4px 16px 16px 16px', background: 'var(--secondary)', border: '1px solid var(--border)' }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{entry.turn.bubble}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted-foreground)' }}>{entry.turn.translation}</p>
              </div>
            </div>
            <div style={{ alignSelf: 'flex-end', maxWidth: '80%', animation: 'ri5-slide-r 0.4s ease both' }}>
              <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)', textAlign: 'right', paddingRight: 4 }}>
                Tú 🙋 <span style={{ marginLeft: 4 }}>{qc.badge}</span>
              </p>
              <div style={{ padding: '10px 14px', borderRadius: '16px 4px 16px 16px', background: qc.bg, border: `1px solid ${qc.border}` }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{entry.userInput}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Current Minsu turn */}
      {turn && (
        <div style={{ alignSelf: 'flex-start', maxWidth: '85%', animation: 'ri5-slide-l 0.45s ease both' }}>
          <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)', paddingLeft: 4 }}>민수 Minsu</p>
          <div style={{ padding: '12px 14px', borderRadius: '4px 16px 16px 16px', background: 'var(--secondary)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{turn.bubble}</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)' }}>{turn.translation}</p>
            {turn.audio && (
              <button type="button" onClick={() => playAudio(turn.audio!)}
                style={{ marginTop: 2, padding: '4px 11px', borderRadius: 100, cursor: 'pointer', alignSelf: 'flex-start', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', fontSize: 11, fontWeight: 600, color: '#6c63ff', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                🔊
              </button>
            )}
          </div>
        </div>
      )}

      {/* Input or feedback */}
      {submitted === null ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, animation: 'ri5-in 0.3s ease both' }}>
          {/* Hint toggle */}
          <div>
            <button type="button" onClick={() => setShowHint(v => !v)}
              style={{ padding: '4px 11px', borderRadius: 100, cursor: 'pointer', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.28)', fontSize: 11, fontWeight: 700, color: '#d97706' }}>
              💡 {showHint ? 'Ocultar pista' : 'Ver pista'}
            </button>
            {showHint && (
              <div style={{ marginTop: 6, padding: '8px 12px', borderRadius: 10, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#92400e' }}>💡 {turn?.hint}</p>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') submit(); }}
            placeholder={turn?.placeholder ?? 'Escribe en coreano…'}
            style={{
              padding: '12px 14px', borderRadius: 12, fontSize: 15, fontFamily: '"Noto Sans KR",system-ui,sans-serif',
              background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)',
              outline: 'none', width: '100%', boxSizing: 'border-box',
            }}
            autoFocus
          />
          <button type="button" onClick={submit} disabled={!inputVal.trim()}
            style={{
              padding: '12px', borderRadius: 12, cursor: inputVal.trim() ? 'pointer' : 'not-allowed',
              background: inputVal.trim() ? 'rgba(108,99,255,0.14)' : 'var(--secondary)',
              border: inputVal.trim() ? '1px solid rgba(108,99,255,0.4)' : '1px solid var(--border)',
              fontSize: 13, fontWeight: 700, color: inputVal.trim() ? '#6c63ff' : 'var(--muted-foreground)',
              transition: 'all 0.18s ease',
            }}>
            Enviar →
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'ri5-in 0.3s ease both' }}>
          {/* User input bubble */}
          <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
            <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 700, color: 'var(--muted-foreground)', textAlign: 'right', paddingRight: 4 }}>
              Tú 🙋 <span style={{ marginLeft: 4 }}>{QC[submitted].badge}</span>
            </p>
            <div style={{ padding: '10px 14px', borderRadius: '16px 4px 16px 16px', background: QC[submitted].bg, border: `1px solid ${QC[submitted].border}` }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{inputVal}</p>
            </div>
          </div>

          {/* Feedback */}
          <div style={{ padding: '12px 15px', borderRadius: 13, background: QC[submitted].bg, border: `1px solid ${QC[submitted].border}` }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: QC[submitted].text }}>
              {QC[submitted].badge} {QC[submitted].label}
            </p>

            {/* Special feedback for 좋아요 trap in turn 3 */}
            {turn && usedJoayoInstead(turn.id, inputVal) && (
              <p style={{ margin: '0 0 4px', fontSize: 12.5, color: '#b45309', lineHeight: 1.6 }}>
                Casi — en este contexto usa 좋아해요 para expresar que algo te gusta.
              </p>
            )}

            {submitted === 'wrong' && (
              <p style={{ margin: '0 0 4px', fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>
                Ejemplo correcto: <span style={{ fontFamily: '"Noto Sans KR",sans-serif', fontWeight: 700 }}>{turn?.correctExample}</span>
              </p>
            )}
            {submitted === 'spontaneous' && (
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>¡Respuesta natural! +2 puntos</p>
            )}
            {submitted === 'helped' && (
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>Correcto con ayuda. +1 punto</p>
            )}
          </div>

          {/* Action buttons */}
          {submitted === 'wrong' && !retryUsed ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={retry}
                style={{ flex: 1, padding: '11px', borderRadius: 12, cursor: 'pointer', background: 'rgba(239,68,68,0.09)', border: '1px solid rgba(239,68,68,0.35)', fontSize: 12, fontWeight: 700, color: '#dc2626' }}>
                🔄 Reintentar
              </button>
              <button type="button" onClick={() => advance(submitted, inputVal)}
                style={{ flex: 1, padding: '11px', borderRadius: 12, cursor: 'pointer', background: 'var(--secondary)', border: '1px solid var(--border)', fontSize: 12, fontWeight: 700, color: 'var(--muted-foreground)' }}>
                Seguir →
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => advance(submitted, inputVal)}
              style={{ padding: '12px', borderRadius: 13, cursor: 'pointer', width: '100%', background: 'rgba(108,99,255,0.14)', border: '1px solid rgba(108,99,255,0.4)', fontSize: 13, fontWeight: 700, color: '#6c63ff' }}>
              {turnIdx === TURNS.length - 1 ? '🎭 Ver resultado →' : 'Siguiente →'}
            </button>
          )}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
