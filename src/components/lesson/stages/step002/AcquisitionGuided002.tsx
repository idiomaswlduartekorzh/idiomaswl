'use client';

import { useState } from 'react';
import { KR_IMG, KR_AUDIO_002, KR_IMG_002 } from '@/lib/storage';
import { useSound } from '@/components/lesson/engine/useSound';

interface VocabItem {
  hangul: string;
  romanization: string;
  translation: string;
  img: string;
  audio: string;
  isNew?: boolean;     // true = vocabulario nuevo del Día 2
  note?: string;       // nota pedagógica (sonido, patrón, etc.)
}

// Step001 (repaso) + Step002 (nuevo) mezclados en orden pedagógico
const VOCAB: VocabItem[] = [
  // ── Repaso Step001 ─────────────────────────────────────────────────────────
  { hangul: '학교', romanization: 'hak-gyo',   translation: 'escuela',          img: KR_IMG.school,      audio: '학교',  note: 'ㅏ → igual que "a" en español' },
  { hangul: '집',   romanization: 'jip',        translation: 'casa',             img: KR_IMG.home,        audio: '집' },
  { hangul: '가요', romanization: 'ga-yo',      translation: 'voy / vas / va',   img: KR_IMG.going,       audio: '가요', note: 'ㅏ → vocal que ya conoces' },
  { hangul: '저는', romanization: 'jeo-neun',   translation: 'yo (formal)',      img: KR_IMG.iFormal,     audio: '저는', note: 'ㅓ → la O abierta del Hangul' },
  // ── Vocabulario nuevo Día 2 ────────────────────────────────────────────────
  { hangul: '어제', romanization: 'eo-je',      translation: 'ayer',             img: KR_IMG_002.yesterday, audio: '어제',  isNew: true, note: 'ㅓ → O abierta · ㅔ → E del Hangul' },
  { hangul: '오늘', romanization: 'o-neul',     translation: 'hoy',              img: KR_IMG_002.today,     audio: '오늘',  isNew: true, note: 'ㅗ → O cerrada' },
  { hangul: '이제', romanization: 'i-je',       translation: 'ahora / ya',       img: KR_IMG_002.now,       audio: '이제',  isNew: true, note: 'ㅡ → la vocal difícil (apretar dientes)' },
  { hangul: '글자', romanization: 'geul-ja',    translation: 'letras / caracteres', img: KR_IMG_002.letters, audio: '글자', isNew: true, note: 'ㅡ → de nuevo la vocal difícil' },
  { hangul: '조금', romanization: 'jo-geum',    translation: 'un poco',          img: KR_IMG_002.little,    audio: '조금',  isNew: true, note: 'ㅗ + ㅡ en la misma palabra' },
  { hangul: '보여요', romanization: 'bo-yeo-yo', translation: 'se ve / puedo ver', img: KR_IMG_002.see,     audio: '보여요', isNew: true, note: 'ㅛ + ㅕ → diptongos con Y' },
  { hangul: '뭐',   romanization: 'mwo',        translation: '¿qué?',            img: KR_IMG_002.what,      audio: '뭐',    isNew: true, note: 'ㅝ → diptongo (como en "web")' },
  { hangul: '나',   romanization: 'na',         translation: 'yo (informal)',     img: KR_IMG_002.me,        audio: '나',    isNew: true, note: 'ㅏ → igual que "a" en español' },
  { hangul: '너',   romanization: 'neo',        translation: 'tú',               img: KR_IMG_002.you,       audio: '너',    isNew: true, note: 'ㅓ → O abierta — ya la conoces de 어제' },
];

function playVocab(audio: string, rate = 1) {
  const src = KR_AUDIO_002[audio] ?? null;
  if (src) {
    const a = new Audio(src);
    a.playbackRate = rate;
    a.play().catch(() => tts(audio, rate));
    return;
  }
  tts(audio, rate);
}

function tts(text: string, rate = 1) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR'; u.rate = rate;
  window.speechSynthesis.speak(u);
}

interface Props { onComplete?: () => void; }

export default function AcquisitionGuided002({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [seen, setSeen]   = useState<Set<number>>(new Set([0]));
  const [flipped, setFlipped] = useState(false);
  const { assemble: playAssemble, complete: playComplete } = useSound();

  const card    = VOCAB[index];
  const allSeen = seen.size === VOCAB.length;

  function goTo(next: number) {
    playAssemble();
    setSeen(prev => { const s = new Set(prev); s.add(next); return s; });
    setIndex(next);
    setFlipped(false);
  }

  const newCount    = VOCAB.filter(v => v.isNew).length;
  const reviewCount = VOCAB.length - newCount;

  return (
    <section style={{ maxWidth: 580, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
          ETAPA 2 DE 11 · Adquisición guiada
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: 'rgba(108,99,255,0.1)', color: '#6c63ff', fontWeight: 600 }}>
            {reviewCount} repaso
          </span>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: 'rgba(52,211,153,0.12)', color: '#059669', fontWeight: 600 }}>
            {newCount} nuevas 🆕
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
        {VOCAB.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            title={v.hangul}
            style={{
              width: 28, height: 5, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0,
              background: i === index
                ? '#6c63ff'
                : seen.has(i)
                  ? (v.isNew ? '#059669' : 'rgba(108,99,255,0.35)')
                  : 'var(--line-soft)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {/* Card */}
      <article style={{ background: 'var(--bg)', border: `2px solid ${card.isNew ? 'rgba(52,211,153,0.3)' : 'var(--line-soft)'}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
        {/* New badge */}
        {card.isNew && (
          <div style={{ background: 'rgba(52,211,153,0.12)', borderBottom: '1px solid rgba(52,211,153,0.2)', padding: '5px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🆕 Vocabulario nuevo — Día 2</span>
          </div>
        )}

        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#f1f3f5' }}>
          <img
            src={card.img}
            alt={card.translation}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 100, background: 'linear-gradient(transparent, rgba(0,0,0,0.5))' }} />
          {/* Hangul watermark on image */}
          <span style={{ position: 'absolute', bottom: 12, left: 16, fontSize: 40, fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            {card.hangul}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 20px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
            <p style={{ margin: 0, fontSize: 42, fontWeight: 700, color: card.isNew ? '#059669' : '#6c63ff', lineHeight: 1.1 }}>
              {card.hangul}
            </p>
          </div>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            {card.romanization}
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 20, color: 'var(--ink-2)', fontWeight: 600 }}>
            {card.translation}
          </p>

          {/* Pedagogical note */}
          {card.note && (
            <div style={{ background: card.isNew ? 'rgba(52,211,153,0.07)' : 'rgba(108,99,255,0.06)', border: `1px solid ${card.isNew ? 'rgba(52,211,153,0.2)' : 'rgba(108,99,255,0.15)'}`, borderRadius: 8, padding: '6px 10px', marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 11, color: card.isNew ? '#059669' : '#6c63ff' }}>
                💡 {card.note}
              </p>
            </div>
          )}

          {/* Audio buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={() => playVocab(card.audio, 1)} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
              🔊 Escuchar
            </button>
            <button type="button" onClick={() => playVocab(card.audio, 0.75)} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
              🐢 Lento
            </button>
          </div>
        </div>
      </article>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} style={{ background: index === 0 ? 'var(--bg-2)' : '#6c63ff', color: index === 0 ? 'var(--muted)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>
          ← Anterior
        </button>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          {index + 1} / {VOCAB.length}{card.isNew ? ' · 🆕' : ' · 📘 repaso'}
        </span>
        <button type="button" onClick={() => goTo(index + 1)} disabled={index === VOCAB.length - 1} style={{ background: index === VOCAB.length - 1 ? 'var(--bg-2)' : '#6c63ff', color: index === VOCAB.length - 1 ? 'var(--muted)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: index === VOCAB.length - 1 ? 'not-allowed' : 'pointer' }}>
          Siguiente →
        </button>
      </div>

      {allSeen && (
        <button type="button" onClick={() => { playComplete(); onComplete?.(); }} style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          ✅ He visto todas las tarjetas — Siguiente etapa →
        </button>
      )}
    </section>
  );
}
