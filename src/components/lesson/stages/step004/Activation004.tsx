'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }

interface VocabCard {
  kr: string;
  es: string;
  audio: string;
  img: string;
}

const CARDS: VocabCard[] = [
  { kr: '안녕하세요', es: 'Hola (formal)',         audio: '안녕하세요',  img: '/assets/korean/step004/campus_arrival_v1.png' },
  { kr: '대학교',    es: 'universidad',             audio: '대학교',      img: '/assets/korean/step004/university_sign_v1.png' },
  { kr: '커피',      es: 'café',                    audio: '커피',        img: '/assets/korean/step003/cafe_v1.png' },
  { kr: '이름',      es: 'nombre',                  audio: '이름',        img: '/assets/korean/step004/saero_wasseoyo_v1.png' },
  { kr: '있어요',    es: 'hay / existe / tengo',    audio: '있어요',      img: '/assets/korean/step004/campus_people_v1.png' },
  { kr: '가요',      es: 'voy / vas / va',          audio: '가요',        img: '/assets/korean/step004/hallway_introduction_v1.png' },
];

const ACCENT = '#6c63ff';

export default function Activation004({ onComplete }: Props) {
  const [phase, setPhase] = useState<'cards' | 'done'>('cards');
  const [idx, setIdx] = useState(0);

  const card = CARDS[idx];

  // Auto-play audio when card appears
  useEffect(() => {
    if (phase !== 'cards') return;
    const t = setTimeout(() => playAudio(card.audio), 300);
    return () => clearTimeout(t);
  }, [idx, phase, card.audio]);

  // Auto-advance after 2.5s
  useEffect(() => {
    if (phase !== 'cards') return;
    const t = setTimeout(() => {
      if (idx < CARDS.length - 1) {
        setIdx(i => i + 1);
      } else {
        setPhase('done');
      }
    }, 2500);
    return () => clearTimeout(t);
  }, [idx, phase]);

  function handleNext() {
    if (idx < CARDS.length - 1) {
      setIdx(i => i + 1);
    } else {
      setPhase('done');
    }
  }

  if (phase === 'done') {
    return (
      <section style={{ maxWidth: 520, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
        <style>{`
          @keyframes scaleIn004 {
            from { transform: scale(0.5); opacity: 0; }
            to   { transform: scale(1);   opacity: 1; }
          }
        `}</style>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(108,99,255,0.12)',
          border: `2px solid ${ACCENT}`,
          margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
          animation: 'scaleIn004 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          ✓
        </div>
        <h2 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: 'var(--foreground)' }}>
          Todas estas palabras ya son tuyas
        </h2>
        <p style={{ margin: '0 0 32px', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.75 }}>
          Las trajiste desde los pasos anteriores. Ahora las usarás en un contexto nuevo: el campus universitario.
        </p>
        <button
          type="button"
          onClick={() => onComplete?.()}
          style={{
            width: '100%', padding: '14px',
            background: ACCENT, border: 'none',
            borderRadius: 12, color: '#fff',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}
        >
          Continuar →
        </button>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <style>{`
        @keyframes slideInCard004 {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>

      <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, fontWeight: 700 }}>
        ETAPA 01 · Activación
      </p>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--muted-foreground)' }}>
        Ya llegaste a Corea — activa tu vocabulario
      </p>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, justifyContent: 'center' }}>
        {CARDS.map((_, i) => (
          <div
            key={i}
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i <= idx ? ACCENT : 'var(--border)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Card — key={idx} forces remount for animation */}
      <article
        key={idx}
        style={{
          background: 'var(--card)',
          border: `1px solid var(--border)`,
          borderRadius: 16,
          overflow: 'hidden',
          animation: 'slideInCard004 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          marginBottom: 16,
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--secondary)', overflow: 'hidden' }}>
          <img
            src={card.img}
            alt={card.es}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 80, background: 'linear-gradient(transparent, rgba(0,0,0,0.4))' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '24px 20px 20px', textAlign: 'center' }}>
          <p style={{
            margin: '0 0 8px',
            fontSize: 52,
            fontWeight: 800,
            fontFamily: "'Noto Sans KR', sans-serif",
            color: ACCENT,
            lineHeight: 1.1,
          }}>
            {card.kr}
          </p>
          <p style={{ margin: '0 0 20px', fontSize: 18, color: 'var(--foreground)', fontWeight: 500 }}>
            {card.es}
          </p>

          <button
            type="button"
            onClick={() => playAudio(card.audio)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              background: `rgba(108,99,255,0.1)`,
              border: `1.5px solid rgba(108,99,255,0.3)`,
              borderRadius: 100,
              color: ACCENT,
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >
            🔊 Escuchar
          </button>
        </div>
      </article>

      {/* Card counter + next button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
          {idx + 1} / {CARDS.length}
        </span>
        <button
          type="button"
          onClick={handleNext}
          style={{
            padding: '10px 20px',
            background: ACCENT,
            border: 'none', borderRadius: 8,
            color: '#fff', fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {idx < CARDS.length - 1 ? 'Siguiente →' : 'Terminar →'}
        </button>
      </div>
    </section>
  );
}
