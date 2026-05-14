'use client';

import { useState } from 'react';
import { playAudio, KR_IMG } from '@/lib/storage';

interface VocabItem {
  hangul: string;
  romanization: string;
  translation: string;
  img: string;
  audio: string;
}

const VOCAB: VocabItem[] = [
  { hangul: '학교', romanization: 'hak-gyo', translation: 'escuela', img: KR_IMG.school, audio: '학교' },
  { hangul: '대학교', romanization: 'dae-hak-gyo', translation: 'universidad', img: KR_IMG.university, audio: '대학교' },
  { hangul: '집', romanization: 'jib', translation: 'casa', img: KR_IMG.home, audio: '집' },
  { hangul: '가요', romanization: 'ga-yo', translation: 'voy / vas / va', img: KR_IMG.going, audio: '가요' },
  { hangul: '저는', romanization: 'jeo-neun', translation: 'yo (formal)', img: KR_IMG.iFormal, audio: '저는' },
  { hangul: '어디 가요?', romanization: 'eo-di ga-yo', translation: '¿adónde vas?', img: KR_IMG.whereGoing, audio: '어디 가요?' },
];

interface Props {
  onComplete?: () => void;
}

export default function AcquisitionGuided({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([0]));

  const card = VOCAB[index];
  const allSeen = seen.size === VOCAB.length;
  const progress = `Tarjeta ${index + 1} de ${VOCAB.length}`;

  function goTo(next: number) {
    setSeen((prev) => {
      const s = new Set(prev);
      s.add(next);
      return s;
    });
    setIndex(next);
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <p
        style={{
          margin: '0 0 8px',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontWeight: 700,
        }}
      >
        SECCIÓN 2 DE 11 · Adquisición guiada
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16, justifyContent: 'center' }}>
        {VOCAB.map((_, i) => (
          <span
            key={i}
            style={{
              width: 28,
              height: 4,
              borderRadius: 2,
              background: seen.has(i) ? '#6c63ff' : 'var(--line-soft)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      <article
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--line-soft)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 16,
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <img
            src={card.img}
            alt={card.translation}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 'auto 0 0 0',
              height: 120,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.45))',
            }}
          />
        </div>

        <div style={{ padding: '20px 20px 8px' }}>
          <p
            style={{
              margin: '0 0 4px',
              fontSize: 48,
              fontWeight: 700,
              color: 'var(--ink)',
              fontFamily: "'Noto Sans KR', sans-serif",
              lineHeight: 1.1,
            }}
          >
            {card.hangul}
          </p>
          <p
            style={{
              margin: '0 0 6px',
              fontSize: 14,
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
            }}
          >
            {card.romanization}
          </p>
          <p style={{ margin: '0 0 16px', fontSize: 18, color: 'var(--ink-2)', fontWeight: 600 }}>
            {card.translation}
          </p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => playAudio(card.audio, 1)}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line-soft)',
                borderRadius: 100,
                padding: '6px 14px',
                fontSize: 13,
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              🔊 Escuchar
            </button>
            <button
              type="button"
              onClick={() => playAudio(card.audio, 0.75)}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line-soft)',
                borderRadius: 100,
                padding: '6px 14px',
                fontSize: 13,
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              🐢 Escuchar lento
            </button>
          </div>
        </div>
      </article>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          style={{
            background: index === 0 ? 'var(--bg-2)' : '#6c63ff',
            color: index === 0 ? 'var(--muted)' : '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontSize: 13,
            fontWeight: 600,
            cursor: index === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Anterior
        </button>

        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{progress}</span>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === VOCAB.length - 1}
          style={{
            background: index === VOCAB.length - 1 ? 'var(--bg-2)' : '#6c63ff',
            color: index === VOCAB.length - 1 ? 'var(--muted)' : '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontSize: 13,
            fontWeight: 600,
            cursor: index === VOCAB.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Siguiente →
        </button>
      </div>

      {allSeen && (
        <button
          type="button"
          onClick={() => onComplete?.()}
          style={{
            width: '100%',
            background: '#2d9b4e',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '14px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ✅ He visto todas las tarjetas →
        </button>
      )}
    </section>
  );
}
