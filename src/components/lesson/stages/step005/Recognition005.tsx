'use client';

import { useMemo, useState } from 'react';
import { playAudio } from '@/lib/storage';

interface RecognitionItem {
  id: string;
  kr: string;
  es: string;
  audio: string;
  step: string;
}

const CARDS: RecognitionItem[] = [
  { id: 'r1',  kr: '안녕하세요',   es: 'Hola (formal)',         audio: '안녕하세요',   step: '001' },
  { id: 'r2',  kr: '있어요',       es: 'hay / existe',          audio: '있어요',       step: '002' },
  { id: 'r3',  kr: '없어요',       es: 'no hay',                audio: '없어요',       step: '002' },
  { id: 'r4',  kr: '이에요/예요',   es: 'soy / es',              audio: '콜롬비아 사람이에요', step: '003' },
  { id: 'r5',  kr: '어때요?',      es: '¿qué tal?',             audio: '어때요?',      step: '004' },
  { id: 'r6',  kr: '많아요',       es: 'hay muchos',            audio: '많아요',       step: '004' },
  { id: 'r7',  kr: '생활',         es: 'vida cotidiana',        audio: '생활',         step: '005' },
  { id: 'r8',  kr: '공부해요',     es: 'estudio / estudia',     audio: '공부해요',     step: '005' },
  { id: 'r9',  kr: '일해요',       es: 'trabajo / trabaja',     audio: '일해요',       step: '005' },
  { id: 'r10', kr: '좋아해요',     es: 'me gusta',              audio: '좋아해요',     step: '005' },
  { id: 'r11', kr: '매일',         es: 'todos los días',        audio: '매일',         step: '005' },
  { id: 'r12', kr: '에서',         es: 'en (lugar de acción)',  audio: '에서',         step: '005' },
];

const ALL_TRANSLATIONS = CARDS.map(c => c.es);

function getDistractors(correct: string, count = 3): string[] {
  const pool = ALL_TRANSLATIONS.filter(t => t !== correct);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const STEP_COLORS: Record<string, string> = {
  '001': '#f59e0b',
  '002': '#10b981',
  '003': '#3b82f6',
  '004': '#8b5cf6',
  '005': '#6c63ff',
};

interface Props {
  onComplete?: () => void;
}

export default function Recognition005({ onComplete }: Props) {
  const shuffledCards = useMemo(() => shuffle(CARDS), []);
  const [cardIndex, setCardIndex]       = useState(0);
  const [selected,  setSelected]        = useState<string | null>(null);
  const [correct,   setCorrect]         = useState(0);
  const [wrong,     setWrong]           = useState(0);
  const [phase,     setPhase]           = useState<'quiz' | 'results'>('quiz');

  const current = shuffledCards[cardIndex];
  const options  = useMemo(() => {
    if (!current) return [];
    return shuffle([current.es, ...getDistractors(current.es)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIndex]);

  function handleSelect(opt: string) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === current.es) setCorrect(c => c + 1);
    else setWrong(w => w + 1);
  }

  function handleNext() {
    if (cardIndex >= shuffledCards.length - 1) {
      setPhase('results');
    } else {
      setCardIndex(i => i + 1);
      setSelected(null);
    }
  }

  if (phase === 'results') {
    const total = shuffledCards.length;
    return (
      <section style={{ maxWidth: 520, margin: '0 auto', padding: '2.5rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{correct === total ? '🏆' : correct >= total * 0.8 ? '🎯' : '📚'}</div>
        <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#6c63ff' }}>{correct}/{total}</h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
          {correct === total
            ? 'Perfecto. Reconociste todo el vocabulario de los 5 steps.'
            : correct >= total * 0.8
            ? 'Muy bien. Tu memoria visual ya registra el coreano.'
            : 'Normal para la primera vez. El reciclaje sigue funcionando.'}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10, padding: '12px 24px' }}>
            <p style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 800, color: '#22c55e' }}>{correct}</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)' }}>correctas</p>
          </div>
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 24px' }}>
            <p style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 800, color: '#ef4444' }}>{wrong}</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)' }}>incorrectas</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onComplete?.()}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Continuar →
        </button>
      </section>
    );
  }

  const isCorrectSel = selected === current.es;
  const stepColor    = STEP_COLORS[current.step] ?? '#6c63ff';

  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 700 }}>
        ETAPA 03 DE 11 · Reconocimiento
      </p>

      {/* Progress bar */}
      <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((cardIndex) / shuffledCards.length) * 100}%`, background: '#6c63ff', borderRadius: 3, transition: 'width 0.3s ease' }} />
      </div>

      <p style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--muted-foreground)', textAlign: 'right' }}>
        {cardIndex + 1} / {shuffledCards.length}
      </p>

      {/* Card */}
      <div key={current.id} style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 18, padding: '28px 20px 20px', marginBottom: 16,
        textAlign: 'center',
      }}>
        {/* Step badge */}
        <div style={{ marginBottom: 12 }}>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: 100,
            background: `rgba(${hexToRgbStr(stepColor)},0.12)`,
            border: `1px solid rgba(${hexToRgbStr(stepColor)},0.3)`,
            fontSize: 10, fontWeight: 700, color: stepColor, letterSpacing: '0.08em',
          }}>
            STEP {current.step}
          </span>
        </div>

        <p style={{ margin: '0 0 16px', fontSize: 38, fontWeight: 800, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--foreground)', lineHeight: 1.2 }}>
          {current.kr}
        </p>

        <button
          type="button"
          onClick={() => playAudio(current.audio)}
          style={{ padding: '6px 16px', borderRadius: 100, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#6c63ff', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)' }}
        >
          🔊 Escuchar
        </button>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {options.map(opt => {
          const isSel = selected === opt;
          const isOk  = opt === current.es;
          const showOk  = selected !== null && isOk;
          const showErr = isSel && selected !== current.es;
          return (
            <button
              key={opt}
              type="button"
              disabled={selected !== null}
              onClick={() => handleSelect(opt)}
              style={{
                padding: '12px 16px',
                background: showOk ? 'rgba(34,197,94,0.08)' : showErr ? 'rgba(239,68,68,0.06)' : isSel ? 'rgba(108,99,255,0.07)' : 'var(--secondary)',
                border: `1.5px solid ${showOk ? '#22c55e' : showErr ? '#ef4444' : isSel ? '#6c63ff' : 'var(--border)'}`,
                borderRadius: 10, fontSize: 14, textAlign: 'left',
                cursor: selected !== null ? 'default' : 'pointer',
                color: showOk ? '#16a34a' : showErr ? '#dc2626' : 'var(--foreground)',
                fontWeight: isSel ? 600 : 400, transition: 'all 0.12s',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ opacity: selected !== null ? 1 : 0, fontSize: 14 }}>
                {showOk ? '✓' : showErr ? '✗' : isOk && selected !== null ? '✓' : ''}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {selected !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            padding: '10px 14px', borderRadius: 10,
            background: isCorrectSel ? 'rgba(34,197,94,0.07)' : 'rgba(239,68,68,0.06)',
            border: `1px solid ${isCorrectSel ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.2)'}`,
          }}>
            <p style={{ margin: 0, fontSize: 13, color: isCorrectSel ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
              {isCorrectSel ? '¡Correcto!' : `Correcto: ${current.es}`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleNext}
            style={{ padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            {cardIndex >= shuffledCards.length - 1 ? 'Ver resultados →' : 'Siguiente →'}
          </button>
        </div>
      )}
    </section>
  );
}

function hexToRgbStr(hex: string): string {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}
