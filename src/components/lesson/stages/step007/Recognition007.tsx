'use client';

import { KR_IMG_007, playAudio } from '@/lib/storage';
import { useEffect, useMemo, useState } from 'react';

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type ExType = 'word_to_es' | 'audio_to_es' | 'es_to_kr';

interface Item {
  id: string;
  kr: string;
  es: string;
  audio: string;
  step: string;
  img: string | null;
}

interface Exercise extends Item {
  type: ExType;
}

/* ─── Items ─────────────────────────────────────────────────────────────────── */

const r1:  Item = { id:'r1',  kr:'안녕하세요',               es:'Hola (formal)',                            audio:'안녕하세요',               step:'001', img: null };
const r2:  Item = { id:'r2',  kr:'있어요',                   es:'hay / existe',                             audio:'있어요',                   step:'002', img: null };
const r3:  Item = { id:'r3',  kr:'없어요',                   es:'no hay / no existe',                       audio:'없어요',                   step:'002', img: null };
const r4:  Item = { id:'r4',  kr:'어때요?',                  es:'¿qué tal?',                                audio:'어때요?',                  step:'004', img: null };
const r5:  Item = { id:'r5',  kr:'많아요',                   es:'hay muchos / es mucho',                    audio:'많아요',                   step:'004', img: null };
const r6:  Item = { id:'r6',  kr:'생활',                     es:'vida cotidiana / rutina',                  audio:'생활',                     step:'007', img: KR_IMG_007.campus_routine };
const r7:  Item = { id:'r7',  kr:'공부해요',                 es:'estudio / estudia',                        audio:'공부해요',                 step:'007', img: KR_IMG_007.david_studying };
const r8:  Item = { id:'r8',  kr:'일해요',                   es:'trabajo / trabaja',                        audio:'일해요',                   step:'007', img: KR_IMG_007.david_cafe };
const r9:  Item = { id:'r9',  kr:'좋아해요',                 es:'me gusta / le gusta',                      audio:'좋아해요',                 step:'007', img: null };
const r10: Item = { id:'r10', kr:'뭐해요?',                  es:'¿qué haces?',                              audio:'뭐해요?',                  step:'007', img: KR_IMG_007.minsu_david_chat };
const r11: Item = { id:'r11', kr:'매일',                     es:'todos los días',                           audio:'매일',                     step:'007', img: null };
const r12: Item = { id:'r12', kr:'에서',                     es:'en (lugar donde ocurre la acción)',         audio:'에서',                     step:'007', img: KR_IMG_007.eseo_vs_e };
const r13: Item = { id:'r13', kr:'에',                       es:'a / hacia (destino)',                      audio:'에',                       step:'007', img: KR_IMG_007.eseo_vs_e };
const r14: Item = { id:'r14', kr:'친구들',                   es:'amigos (plural)',                          audio:'친구들',                   step:'007', img: KR_IMG_007.minsu_david_chat };
const r15: Item = { id:'r15', kr:'이 대학교에서 공부해요',   es:'Estudio en esta universidad',              audio:'이 대학교에서 공부해요',   step:'007', img: KR_IMG_007.david_studying };
const r16: Item = { id:'r16', kr:'카페에서 일해요',           es:'Trabajo en el café',                       audio:'카페에서 일해요',           step:'007', img: KR_IMG_007.david_cafe };
const r17: Item = { id:'r17', kr:'한국 좋아해요',             es:'Me gusta Corea',                           audio:'한국 좋아해요',             step:'007', img: null };
const r18: Item = { id:'r18', kr:'매일 카페에 가요',          es:'Voy al café todos los días',               audio:'매일 카페에 가요',          step:'007', img: null };
const r19: Item = { id:'r19', kr:'친구들이 많아요',           es:'Tengo muchos amigos',                      audio:'친구들이 많아요',           step:'007', img: KR_IMG_007.minsu_david_chat };
const r20: Item = { id:'r20', kr:'씨',                       es:'Sr./Sra. + nombre (tratamiento)',           audio:'씨',                       step:'007', img: null };

/* ─── Exercise list (20) ────────────────────────────────────────────────────── */

const EXERCISES: Exercise[] = [
  { ...r6,  type: 'word_to_es'  },
  { ...r1,  type: 'es_to_kr'   },
  { ...r9,  type: 'audio_to_es' },
  { ...r7,  type: 'word_to_es'  },
  { ...r2,  type: 'es_to_kr'   },
  { ...r11, type: 'audio_to_es' },
  { ...r8,  type: 'word_to_es'  },
  { ...r3,  type: 'es_to_kr'   },
  { ...r17, type: 'audio_to_es' },
  { ...r10, type: 'word_to_es'  },
  { ...r4,  type: 'es_to_kr'   },
  { ...r18, type: 'audio_to_es' },
  { ...r12, type: 'word_to_es'  },
  { ...r5,  type: 'es_to_kr'   },
  { ...r13, type: 'audio_to_es' },
  { ...r15, type: 'word_to_es'  },
  { ...r14, type: 'es_to_kr'   },
  { ...r19, type: 'audio_to_es' },
  { ...r16, type: 'word_to_es'  },
  { ...r20, type: 'es_to_kr'   },
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

const STEP_COLORS: Record<string, string> = {
  '001': '#f59e0b',
  '002': '#10b981',
  '003': '#3b82f6',
  '004': '#8b5cf6',
  '007': '#6366f1',
};

function hexToRgbStr(hex: string): string {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}

/** Stable seeded-ish shuffle using the index so useMemo stays consistent per exercise */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.abs(((seed * 9301 + 49297) % 233280) + i * 1013) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
    seed = seed * 31 + i;
  }
  return copy;
}

function buildOptions(ex: Exercise, exerciseIndex: number): string[] {
  if (ex.type === 'es_to_kr') {
    const pool = EXERCISES.map(e => e.kr).filter(k => k !== ex.kr);
    const distractors = seededShuffle(pool, exerciseIndex * 7 + 3).slice(0, 3);
    return seededShuffle([ex.kr, ...distractors], exerciseIndex * 13 + 7);
  } else {
    // word_to_es and audio_to_es: options are Spanish
    const pool = EXERCISES.map(e => e.es).filter(s => s !== ex.es);
    const distractors = seededShuffle(pool, exerciseIndex * 11 + 5).slice(0, 3);
    return seededShuffle([ex.es, ...distractors], exerciseIndex * 17 + 11);
  }
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

interface Props {
  onComplete?: () => void;
}

export default function Recognition007({ onComplete }: Props) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selected,      setSelected]      = useState<string | null>(null);
  const [correctCount,  setCorrectCount]  = useState(0);
  const [wrongCount,    setWrongCount]    = useState(0);
  const [phase,         setPhase]         = useState<'quiz' | 'results'>('quiz');

  const current = EXERCISES[exerciseIndex];
  const total   = EXERCISES.length;

  const options = useMemo(
    () => buildOptions(current, exerciseIndex),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exerciseIndex],
  );

  /* Auto-play audio for audio_to_es */
  useEffect(() => {
    if (current.type === 'audio_to_es') {
      playAudio(current.audio);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseIndex]);

  function handleSelect(opt: string) {
    if (selected !== null) return;
    setSelected(opt);
    const correct = current.type === 'es_to_kr' ? current.kr : current.es;
    if (opt === correct) setCorrectCount(c => c + 1);
    else setWrongCount(w => w + 1);
  }

  function handleNext() {
    if (exerciseIndex >= total - 1) {
      setPhase('results');
    } else {
      setExerciseIndex(i => i + 1);
      setSelected(null);
    }
  }

  /* ─── Results screen ────────────────────────────────────────────────────── */
  if (phase === 'results') {
    return (
      <section style={{ maxWidth: 520, margin: '0 auto', padding: '2.5rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>
          {correctCount === total ? '🏆' : correctCount >= total * 0.8 ? '🎯' : '📚'}
        </div>
        <h2 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 800, color: '#6366f1' }}>
          {correctCount}/{total}
        </h2>
        <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--muted-foreground)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Reconocimiento completado
        </p>
        <p style={{ margin: '0 0 28px', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
          {correctCount === total
            ? 'Perfecto. Reconociste todo el vocabulario acumulado.'
            : correctCount >= total * 0.8
            ? 'Muy bien. Tu memoria auditiva y visual ya registra el coreano.'
            : 'El reciclaje sigue funcionando. Vuelve a este paso cuando quieras.'}
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 12, padding: '14px 28px' }}>
            <p style={{ margin: '0 0 2px', fontSize: 24, fontWeight: 800, color: '#22c55e' }}>{correctCount}</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>correctas</p>
          </div>
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '14px 28px' }}>
            <p style={{ margin: '0 0 2px', fontSize: 24, fontWeight: 800, color: '#ef4444' }}>{wrongCount}</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>incorrectas</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onComplete?.()}
          style={{ width: '100%', padding: '14px', background: '#6366f1', border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
        >
          Continuar →
        </button>
      </section>
    );
  }

  /* ─── Quiz screen ───────────────────────────────────────────────────────── */

  const correctAnswer = current.type === 'es_to_kr' ? current.kr : current.es;
  const isCorrectSel  = selected === correctAnswer;
  const stepColor     = STEP_COLORS[current.step] ?? '#6366f1';
  const rgbStr        = hexToRgbStr(stepColor);

  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '1.5rem 1rem' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 700 }}>
          ETAPA 03 DE 11 · Reconocimiento
        </p>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)', fontWeight: 600 }}>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>✓ {correctCount}</span>
          {' '}
          <span style={{ color: '#ef4444', fontWeight: 700 }}>✗ {wrongCount}</span>
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, marginBottom: 10, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${(exerciseIndex / total) * 100}%`,
          background: '#6366f1',
          borderRadius: 3,
          transition: 'width 0.3s ease',
        }} />
      </div>

      <p style={{ margin: '0 0 14px', fontSize: 11, color: 'var(--muted-foreground)', textAlign: 'right', fontWeight: 600 }}>
        {exerciseIndex + 1} / {total}
      </p>

      {/* ── Exercise card ── */}
      <div
        key={`${current.id}-${current.type}`}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 18,
          padding: '24px 20px 20px',
          marginBottom: 14,
          textAlign: 'center',
        }}
      >
        {/* Step badge */}
        <div style={{ marginBottom: 12 }}>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: 100,
            background: `rgba(${rgbStr},0.12)`,
            border: `1px solid rgba(${rgbStr},0.3)`,
            fontSize: 10, fontWeight: 700, color: stepColor, letterSpacing: '0.08em',
          }}>
            STEP {current.step}
          </span>
        </div>

        {/* ── word_to_es ── */}
        {current.type === 'word_to_es' && (
          <>
            <p style={{
              margin: '0 0 12px',
              fontSize: 38,
              fontWeight: 800,
              fontFamily: "'Noto Sans KR', sans-serif",
              color: 'var(--foreground)',
              lineHeight: 1.2,
            }}>
              {current.kr}
            </p>

            {current.img && (
              <img
                src={current.img}
                alt={current.es}
                style={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  borderRadius: 10,
                  marginBottom: 12,
                  display: 'block',
                }}
              />
            )}

            <button
              type="button"
              onClick={() => playAudio(current.audio)}
              style={{
                padding: '6px 16px',
                borderRadius: 100,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                color: '#6366f1',
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.25)',
              }}
            >
              🔊 Escuchar
            </button>
          </>
        )}

        {/* ── audio_to_es ── */}
        {current.type === 'audio_to_es' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 8, animation: selected === null ? 'pulse 1.5s ease-in-out infinite' : undefined }}>
              🎧
            </div>
            <p style={{
              margin: '0 0 16px',
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--foreground)',
              letterSpacing: '0.03em',
            }}>
              Escucha y elige
            </p>

            <button
              type="button"
              onClick={() => playAudio(current.audio)}
              style={{
                padding: '6px 16px',
                borderRadius: 100,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                color: '#6366f1',
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.25)',
                marginBottom: selected !== null ? 12 : 0,
              }}
            >
              🔊 Escuchar de nuevo
            </button>

            {/* Reveal Korean after answering */}
            {selected !== null && (
              <p style={{
                margin: '12px 0 0',
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "'Noto Sans KR', sans-serif",
                color: 'var(--muted-foreground)',
              }}>
                Era: <span style={{ color: 'var(--foreground)' }}>{current.kr}</span>
              </p>
            )}
          </>
        )}

        {/* ── es_to_kr ── */}
        {current.type === 'es_to_kr' && (
          <p style={{
            margin: '0 0 4px',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--foreground)',
            lineHeight: 1.4,
          }}>
            {current.es}
          </p>
        )}
      </div>

      {/* ── Options ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {options.map((opt) => {
          const isSel    = selected === opt;
          const isOk     = opt === correctAnswer;
          const showOk   = selected !== null && isOk;
          const showErr  = isSel && selected !== correctAnswer;
          const isKorean = current.type === 'es_to_kr';

          return (
            <button
              key={opt}
              type="button"
              disabled={selected !== null}
              onClick={() => handleSelect(opt)}
              style={{
                padding: '12px 16px',
                background: showOk
                  ? 'rgba(34,197,94,0.08)'
                  : showErr
                  ? 'rgba(239,68,68,0.06)'
                  : isSel
                  ? 'rgba(99,102,241,0.07)'
                  : 'var(--secondary)',
                border: `1.5px solid ${
                  showOk
                    ? '#22c55e'
                    : showErr
                    ? '#ef4444'
                    : isSel
                    ? '#6366f1'
                    : 'var(--border)'
                }`,
                borderRadius: 10,
                fontSize: isKorean ? 18 : 14,
                fontFamily: isKorean ? "'Noto Sans KR', sans-serif" : 'inherit',
                fontWeight: isKorean ? 700 : isSel ? 600 : 400,
                textAlign: 'left',
                cursor: selected !== null ? 'default' : 'pointer',
                color: showOk ? '#16a34a' : showErr ? '#dc2626' : 'var(--foreground)',
                transition: 'all 0.12s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ opacity: selected !== null ? 1 : 0, fontSize: 14, minWidth: 14 }}>
                {showOk ? '✓' : showErr ? '✗' : isOk && selected !== null ? '✓' : ''}
              </span>
              <span style={{ flex: 1 }}>{opt}</span>
              {/* Audio button for es_to_kr options */}
              {isKorean && (
                <span
                  role="button"
                  aria-label={`Escuchar ${opt}`}
                  onClick={(e) => { e.stopPropagation(); playAudio(opt); }}
                  style={{
                    fontSize: 14,
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: 100,
                    background: 'rgba(99,102,241,0.1)',
                    color: '#6366f1',
                    userSelect: 'none',
                  }}
                >
                  🔊
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Feedback + Next ── */}
      {selected !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            padding: '10px 14px',
            borderRadius: 10,
            background: isCorrectSel
              ? 'rgba(34,197,94,0.07)'
              : 'rgba(239,68,68,0.06)',
            border: `1px solid ${isCorrectSel ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.2)'}`,
          }}>
            <p style={{
              margin: 0,
              fontSize: 13,
              color: isCorrectSel ? '#16a34a' : '#dc2626',
              fontWeight: 600,
            }}>
              {isCorrectSel
                ? '¡Correcto!'
                : `Correcto era: ${correctAnswer}`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleNext}
            style={{
              padding: '13px',
              background: '#6366f1',
              border: 'none',
              borderRadius: 10,
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {exerciseIndex >= total - 1 ? 'Ver resultados →' : 'Siguiente →'}
          </button>
        </div>
      )}

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
      `}</style>
    </section>
  );
}
