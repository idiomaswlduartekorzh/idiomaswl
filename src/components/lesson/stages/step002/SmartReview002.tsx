'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSound } from '@/components/lesson/engine/useSound';
import StreakBar from '@/components/lesson/engine/StreakBar';

interface Props { onComplete?: () => void }

interface Card {
  id: number;
  korean: string;
  romanization: string;
  translation: string;
  isNew: boolean;
}

const ALL_CARDS: Card[] = [
  // Step 001 repaso
  { id: 1, korean: '학교', romanization: 'hak-gyo', translation: 'escuela', isNew: false },
  { id: 2, korean: '가요', romanization: 'ga-yo', translation: 'voy / vas / va', isNew: false },
  { id: 3, korean: '어디', romanization: 'eo-di', translation: '¿dónde?', isNew: false },
  // Step 002 nuevo
  { id: 4, korean: '어제', romanization: 'eo-je', translation: 'ayer', isNew: true },
  { id: 5, korean: '오늘', romanization: 'o-neul', translation: 'hoy', isNew: true },
  { id: 6, korean: '이제', romanization: 'i-je', translation: 'ahora / ya', isNew: true },
  { id: 7, korean: '글자', romanization: 'geul-ja', translation: 'letras / caracteres', isNew: true },
  { id: 8, korean: '조금', romanization: 'jo-geum', translation: 'un poco', isNew: true },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function scoreMessage(score: number): string {
  if (score === 8) return 'Memoria perfecta';
  if (score >= 6) return 'Muy bien — casi todas consolidadas';
  if (score >= 4) return 'Buen progreso — el repaso espaciado las afianzará';
  return 'Normal al inicio — el siguiente repaso será más fácil';
}

export default function SmartReview002({ onComplete }: Props) {
  const cards = useMemo(() => shuffle(ALL_CARDS), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Record<number, 'knew' | 'missed'>>({});
  const [streak, setStreak] = useState(0);
  const { correct: playCorrect, wrong: playWrong, complete: playComplete, korean } = useSound();

  const total = cards.length;
  const isDone = Object.keys(results).length === total;

  // Speak Korean word when card flips to reveal answer
  useEffect(() => {
    if (flipped && cards[currentIndex]) {
      const t = setTimeout(() => korean(cards[currentIndex].korean, 0.85), 180);
      return () => clearTimeout(t);
    }
  }, [flipped, currentIndex]);

  // Play complete sound when all cards done
  useEffect(() => {
    if (isDone) playComplete();
  }, [isDone]);

  function rate(cardId: number, result: 'knew' | 'missed') {
    if (result === 'knew') {
      playCorrect();
      setStreak(s => s + 1);
    } else {
      playWrong();
      setStreak(0);
    }
    setResults(prev => ({ ...prev, [cardId]: result }));
    setFlipped(false);
    setTimeout(() => setCurrentIndex(i => i + 1), 200);
  }

  if (isDone) {
    const knewCards = cards.filter(c => results[c.id] === 'knew');
    const missedCards = cards.filter(c => results[c.id] === 'missed');
    const score = knewCards.length;

    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 4px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>REPASO ESPACIADO · Resultados</p>
        <h3 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>
          {score}/{total} palabras
        </h3>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
          {scoreMessage(score)}
        </p>

        {knewCards.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: '#2d9b4e' }}>Palabras que recuerdas:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {knewCards.map(c => (
                <span key={c.id} style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(45,155,78,0.08)', border: '1px solid rgba(45,155,78,0.2)', fontSize: 14, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, color: '#2d9b4e' }}>
                  {c.korean}
                </span>
              ))}
            </div>
          </div>
        )}

        {missedCards.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: '#e07b00' }}>Para seguir practicando:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {missedCards.map(c => (
                <span key={c.id} style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(224,123,0,0.08)', border: '1px solid rgba(224,123,0,0.2)', fontSize: 14, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, color: '#e07b00' }}>
                  {c.korean}
                </span>
              ))}
            </div>
          </div>
        )}

        <button type="button" onClick={onComplete}
          style={{ width: '100%', padding: '14px', background: '#2d9b4e', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Continuar →
        </button>
      </section>
    );
  }

  const card = cards[currentIndex];
  const cardNum = currentIndex + 1;

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
            REPASO ESPACIADO · Card {cardNum} de {total}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StreakBar streak={streak} />
          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: card.isNew ? 'rgba(108,99,255,0.1)' : 'rgba(14,165,233,0.1)', color: card.isNew ? '#6c63ff' : '#0ea5e9', fontWeight: 700, border: `1px solid ${card.isNew ? 'rgba(108,99,255,0.2)' : 'rgba(14,165,233,0.2)'}` }}>
            {card.isNew ? 'nuevo' : 'repaso'}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--line-soft)', borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(cardNum - 1) / total * 100}%`, background: '#6c63ff', borderRadius: 2, transition: 'width 0.3s' }} />
      </div>

      {/* Card */}
      <div style={{ perspective: 1000, marginBottom: 20 }}>
        <div style={{
          position: 'relative',
          minHeight: 220,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>
          {/* Front */}
          <div style={{
            position: flipped ? 'absolute' : 'relative',
            top: 0, left: 0, right: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'var(--bg)',
            border: '1.5px solid var(--line-soft)',
            borderRadius: 16,
            padding: '40px 24px',
            textAlign: 'center',
          }}>
            <p style={{ margin: '0 0 4px', fontSize: 64, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 900, color: 'var(--ink)', lineHeight: 1.1 }}>
              {card.korean}
            </p>
            <p style={{ margin: '20px 0 0', fontSize: 12, color: 'var(--muted)' }}>¿Recuerdas esta palabra?</p>
          </div>

          {/* Back */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'var(--bg)',
            border: '1.5px solid var(--line-soft)',
            borderRadius: 16,
            padding: '32px 24px',
            textAlign: 'center',
          }}>
            <p style={{ margin: '0 0 6px', fontSize: 48, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 900, color: 'var(--ink)', lineHeight: 1.1 }}>
              {card.korean}
            </p>
            <p style={{ margin: '0 0 8px', fontSize: 14, fontFamily: 'var(--mono)', color: 'var(--muted)', letterSpacing: '0.05em' }}>
              [{card.romanization}]
            </p>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: 'var(--ink)' }}>
              {card.translation}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {!flipped ? (
        <button type="button" onClick={() => setFlipped(true)}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Revelar →
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" onClick={() => rate(card.id, 'knew')}
            style={{ flex: 1, padding: '14px', background: 'rgba(45,155,78,0.08)', border: '1.5px solid rgba(45,155,78,0.3)', borderRadius: 12, color: '#2d9b4e', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Lo recordé
          </button>
          <button type="button" onClick={() => rate(card.id, 'missed')}
            style={{ flex: 1, padding: '14px', background: 'rgba(224,123,0,0.06)', border: '1.5px solid rgba(224,123,0,0.25)', borderRadius: 12, color: '#e07b00', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            No lo recordé
          </button>
        </div>
      )}
    </section>
  );
}
