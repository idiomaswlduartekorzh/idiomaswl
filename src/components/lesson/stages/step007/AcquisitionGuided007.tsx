'use client';

import { useEffect, useState } from 'react'; // useEffect kept for audio auto-play
import { KR_IMG_007, playAudio } from '@/lib/storage';

interface VocabItem {
  kr: string;
  rom: string;
  es: string;
  audio: string;
  img: string;
  note: string;
}

const VOCAB: VocabItem[] = [
  { kr: '생활',    rom: 'saeng-hwal',       es: 'vida cotidiana / rutina',  audio: '생활',    img: KR_IMG_007.campus_routine,   note: '한국 생활 = vida en Corea' },
  { kr: '공부해요', rom: 'gong-bu-hae-yo',  es: 'estudio / estudia',         audio: '공부해요', img: KR_IMG_007.david_studying,   note: '공부하다 → 공부해요' },
  { kr: '일해요',  rom: 'il-hae-yo',        es: 'trabajo / trabaja',          audio: '일해요',  img: KR_IMG_007.david_cafe,       note: '일하다 → 일해요' },
  { kr: '좋아해요', rom: 'jo-a-hae-yo',     es: 'me gusta / le gusta',        audio: '좋아해요', img: KR_IMG_007.campus_routine,   note: '좋아하다 → 좋아해요 (verbo)' },
  { kr: '뭐해요?', rom: 'mwo-hae-yo',       es: '¿qué haces?',                audio: '뭐해요?', img: KR_IMG_007.minsu_david_chat, note: '뭐(qué) + 하다(hacer)' },
  { kr: '매일',    rom: 'mae-il',           es: 'todos los días',             audio: '매일',    img: KR_IMG_007.campus_routine,   note: '매일 카페에 가요' },
  { kr: '에서',    rom: 'e-seo',            es: 'en (lugar de acción)',        audio: '에서',    img: KR_IMG_007.eseo_vs_e,        note: '카페에서 일해요' },
  { kr: '에',      rom: 'e',               es: 'a / hacia (destino)',          audio: '에',      img: KR_IMG_007.eseo_vs_e,        note: '카페에 가요' },
  { kr: '친구들',  rom: 'chin-gu-deul',     es: 'amigos (plural)',             audio: '친구들',  img: KR_IMG_007.minsu_david_chat, note: '친구 + 들(plural)' },
  { kr: '씨',      rom: 'ssi',             es: 'Sr./Sra. + nombre',            audio: '씨',      img: KR_IMG_007.minsu_david_chat, note: '민수 씨 = Sr. Minsu' },
];

interface Props {
  onComplete?: () => void;
}

export default function AcquisitionGuided007({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [seen, setSeen]   = useState<Set<number>>(new Set([0]));
  const card    = VOCAB[index];
  const allSeen = seen.size === VOCAB.length;

  // Auto-play audio on card mount
  useEffect(() => {
    const t = setTimeout(() => playAudio(card.audio, 1), 300);
    return () => clearTimeout(t);
  }, [index, card.audio]);

  function goTo(next: number) {
    setSeen(prev => {
      const s = new Set(prev);
      s.add(next);
      return s;
    });
    setIndex(next);
  }

  if (allSeen && index === VOCAB.length - 1 && seen.size === VOCAB.length) {
    // show complete state after seeing all
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 700 }}>
        ETAPA 02 DE 11 · Adquisición guiada
      </p>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 16, flexWrap: 'wrap' }}>
        {VOCAB.map((_, i) => (
          <span
            key={i}
            style={{
              width: 24,
              height: 4,
              borderRadius: 2,
              background: seen.has(i) ? '#6c63ff' : 'var(--border)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {/* Card */}
      <article style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--secondary)' }}>
          <img
            src={card.img}
            alt={card.es}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 100, background: 'linear-gradient(transparent, rgba(0,0,0,0.35))' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '20px 20px 16px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 48, fontWeight: 700, color: '#6c63ff', fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1.1 }}>
            {card.kr}
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--muted-foreground)', fontFamily: 'monospace' }}>
            {card.rom}
          </p>
          <p style={{ margin: '0 0 8px', fontSize: 18, color: 'var(--foreground)', fontWeight: 600 }}>
            {card.es}
          </p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--muted-foreground)', fontStyle: 'italic', lineHeight: 1.5 }}>
            {card.note}
          </p>

          {/* Audio buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => playAudio(card.audio, 1)}
              style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: '#6c63ff', cursor: 'pointer', fontWeight: 600 }}
            >
              🔊 Escuchar
            </button>
            <button
              type="button"
              onClick={() => playAudio(card.audio, 0.75)}
              style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: 'var(--muted-foreground)', cursor: 'pointer' }}
            >
              🐢 Escuchar lento
            </button>
          </div>
        </div>
      </article>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          style={{ background: index === 0 ? 'var(--secondary)' : '#6c63ff', color: index === 0 ? 'var(--muted-foreground)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
        >
          ← Anterior
        </button>

        <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
          Tarjeta {index + 1} de {VOCAB.length}
        </span>

        <button
          type="button"
          onClick={() => goTo(Math.min(index + 1, VOCAB.length - 1))}
          disabled={index === VOCAB.length - 1}
          style={{ background: index === VOCAB.length - 1 ? 'var(--secondary)' : '#6c63ff', color: index === VOCAB.length - 1 ? 'var(--muted-foreground)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: index === VOCAB.length - 1 ? 'not-allowed' : 'pointer' }}
        >
          Siguiente →
        </button>
      </div>

      {/* Complete CTA */}
      {allSeen && (
        <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 14, padding: '20px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800, color: '#6c63ff' }}>¡Vocabulario activado!</p>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--muted-foreground)' }}>
            Has visto las {VOCAB.length} tarjetas del step007.
          </p>
          <button
            type="button"
            onClick={() => onComplete?.()}
            style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Continuar →
          </button>
        </div>
      )}
    </section>
  );
}
