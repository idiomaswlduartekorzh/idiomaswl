'use client';

import { useEffect, useState } from 'react';
import { useSound } from '@/components/lesson/engine/useSound';
import StreakBar from '@/components/lesson/engine/StreakBar';
import AnswerButton, { type AnswerState } from '@/components/lesson/engine/AnswerButton';

interface Props { onComplete?: () => void; }

interface FlashCard {
  hangul: string;
  question: string;
  options: string[];
  correct: string;
  type: 'sound' | 'meaning';
  hint?: string;
  speakOnShow?: boolean; // auto-speak the hangul when card appears
}

const CARDS: FlashCard[] = [
  { hangul: 'ㅏ', question: '¿Cómo suena esta vocal?', options: ['a (como casa)', 'o (cerrada)', 'u (como luna)', 'e (como mesa)'], correct: 'a (como casa)', type: 'sound', speakOnShow: false },
  { hangul: 'ㅗ', question: '¿Cómo suena?', options: ['o cerrada', 'u', 'o abierta', 'a'], correct: 'o cerrada', type: 'sound', speakOnShow: false },
  { hangul: 'ㅡ', question: 'Esta vocal...', options: ['No existe en español', 'suena como u', 'suena como i', 'suena como e'], correct: 'No existe en español', type: 'sound', speakOnShow: false },
  { hangul: '어제', question: '¿Qué significa?', options: ['ayer', 'hoy', 'ahora', 'mañana'], correct: 'ayer', type: 'meaning', speakOnShow: true },
  { hangul: '오늘', question: '¿Qué significa?', options: ['hoy', 'ayer', 'mañana', 'ahora'], correct: 'hoy', type: 'meaning', speakOnShow: true },
  { hangul: 'ㄹ', question: 'Este consonante suena como...', options: ['r de "pero" en español', 'r de "perro"', 'l de "libro"', 'd de "donde"'], correct: 'r de "pero" en español', type: 'sound', hint: '¡Ventaja hispanohablante!' },
  { hangul: '글자', question: '¿Qué significa?', options: ['letras / caracteres', 'un poco', 'ayer', 'ahora'], correct: 'letras / caracteres', type: 'meaning', speakOnShow: true },
  { hangul: 'ㅂ / ㅍ / ㅃ', question: '¿Cuál es la aspirada (con aire)?', options: ['ㅍ', 'ㅂ', 'ㅃ', 'ㅎ'], correct: 'ㅍ', type: 'sound' },
  { hangul: '이제', question: '¿Qué significa?', options: ['ahora / ya', 'ayer', 'hoy', 'letras'], correct: 'ahora / ya', type: 'meaning', speakOnShow: true },
  { hangul: '조금', question: '¿Qué significa?', options: ['un poco', 'muchos', 'nada', 'todo'], correct: 'un poco', type: 'meaning', speakOnShow: true },
];

type GamePhase = 'intro' | 'playing' | 'results';

export default function ReactiveInteraction002({ onComplete }: Props) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const { correct: playCorrect, wrong: playWrong, complete: playComplete, korean } = useSound();

  const card = CARDS[idx];

  // Speak Korean word when card appears (for vocabulary cards)
  useEffect(() => {
    if (phase === 'playing' && card.speakOnShow) {
      const t = setTimeout(() => korean(card.hangul, 0.85), 400);
      return () => clearTimeout(t);
    }
  }, [idx, phase]);

  // Auto-advance after correct
  useEffect(() => {
    if (feedback === 'correct') {
      const t = setTimeout(() => advance(), 900);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  function pick(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    if (opt === card.correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setFeedback('correct');
      playCorrect();
    } else {
      setStreak(0);
      setFeedback('wrong');
      playWrong();
    }
  }

  function advance() {
    if (idx < CARDS.length - 1) {
      setIdx(i => i + 1);
      setSelected(null);
      setRevealed(false);
      setFeedback(null);
    } else {
      playComplete();
      setPhase('results');
    }
  }

  function getState(opt: string): AnswerState {
    if (!revealed) return 'idle';
    if (opt === card.correct) return feedback === 'correct' && selected === opt ? 'correct' : revealed ? 'disabled' : 'idle';
    if (selected === opt) return 'wrong';
    return 'disabled';
  }

  // Better state logic
  function getOptionState(opt: string): AnswerState {
    if (!revealed) return 'idle';
    if (opt === card.correct && feedback === 'correct') return 'correct';
    if (opt === selected && feedback === 'wrong') return 'wrong';
    if (opt === card.correct && feedback === 'wrong') return 'correct'; // show correct on wrong
    return 'disabled';
  }

  const isKoreanOpts = card.hangul === 'ㅂ / ㅍ / ㅃ';

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 520, margin: '0 auto', padding: '2.5rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: 14 }}>⚡</div>
        <h3 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>Reacción rápida</h3>
        <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>10 preguntas · Sin tiempo límite</p>
        <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          Ves un carácter Hangul — eliges la respuesta. Precisión sobre velocidad. Los vocabularios se pronuncian solos.
        </p>
        <button type="button" onClick={() => setPhase('playing')} style={{ width: '100%', maxWidth: 300, padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          Empezar →
        </button>
      </section>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (phase === 'results') {
    const pct = score / CARDS.length;
    const [emoji, msg] = pct >= 0.8
      ? ['🔥', 'Tu instinto Hangul está funcionando.']
      : pct >= 0.6
      ? ['👍', 'Buen resultado — sigue practicando.']
      : ['📚', 'Repasa las tarjetas y vuelve a intentarlo.'];

    return (
      <section style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>{emoji}</div>
        <p style={{ margin: '0 0 4px', fontSize: 52, fontWeight: 800, color: '#6c63ff', lineHeight: 1 }}>
          {score}<span style={{ fontSize: 24, color: 'var(--muted)' }}>/{CARDS.length}</span>
        </p>
        <p style={{ margin: '0 0 24px', fontSize: 15, color: 'var(--muted)', lineHeight: 1.5 }}>{msg}</p>
        {pct < 0.8 && (
          <button type="button" onClick={() => { setIdx(0); setSelected(null); setRevealed(false); setFeedback(null); setScore(0); setStreak(0); setPhase('playing'); }} style={{ display: 'block', width: '100%', marginBottom: 10, padding: '13px', background: 'var(--bg-2)', border: '1.5px solid var(--line-soft)', borderRadius: 12, color: 'var(--ink)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Intentar de nuevo
          </button>
        )}
        <button type="button" onClick={onComplete} style={{ width: '100%', padding: '14px', background: '#2d9b4e', border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          Siguiente etapa →
        </button>
      </section>
    );
  }

  // ── Playing ────────────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{idx + 1} / {CARDS.length}</span>
        <StreakBar streak={streak} />
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: card.type === 'meaning' ? 'rgba(14,165,233,0.1)' : 'rgba(108,99,255,0.08)', color: card.type === 'meaning' ? '#0ea5e9' : '#6c63ff', fontWeight: 600 }}>
          {card.type === 'meaning' ? '💬 significado' : '🔊 sonido'}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--line-soft)', borderRadius: 2, marginBottom: 18 }}>
        <div style={{ height: '100%', background: '#6c63ff', borderRadius: 2, width: `${(idx / CARDS.length) * 100}%`, transition: 'width 0.35s' }} />
      </div>

      {/* Hangul card — tap to hear */}
      <button
        type="button"
        onClick={() => korean(card.hangul, 0.85)}
        style={{ width: '100%', textAlign: 'center', padding: '28px 20px', marginBottom: 16, background: 'rgba(108,99,255,0.05)', border: '2px solid rgba(108,99,255,0.18)', borderRadius: 16, cursor: 'pointer', outline: 'none' }}
      >
        <p style={{ margin: '0 0 6px', fontSize: card.hangul.length > 2 ? 56 : 80, fontWeight: 900, color: 'var(--ink)', fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1.1 }}>
          {card.hangul}
        </p>
        <span style={{ fontSize: 11, color: 'var(--muted)', opacity: 0.7 }}>🔊 toca para escuchar</span>
        {card.hint && (
          <div style={{ marginTop: 8 }}>
            <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 100, background: 'rgba(45,155,78,0.1)', color: '#2d9b4e', fontWeight: 600 }}>{card.hint}</span>
          </div>
        )}
      </button>

      {/* Question */}
      <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 600, color: 'var(--ink)', textAlign: 'center' }}>{card.question}</p>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {card.options.map(opt => (
          <AnswerButton
            key={opt}
            label={opt}
            state={getOptionState(opt)}
            onClick={() => pick(opt)}
            isKorean={isKoreanOpts}
            size="md"
          />
        ))}
      </div>

      {/* Manual next on wrong */}
      {feedback === 'wrong' && (
        <button type="button" onClick={advance} style={{ width: '100%', padding: '12px', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, fontSize: 14, color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }}>
          Siguiente →
        </button>
      )}
    </section>
  );
}
