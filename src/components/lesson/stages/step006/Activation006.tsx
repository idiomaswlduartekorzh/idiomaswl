'use client';

import { useRef, useState } from 'react';
import { KR_PODCAST_006, playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }

const KEY_PHRASES = [
  { kr: '새로 왔어요?',          rom: 'sae-ro wa-sseo-yo?',            es: '¿Eres nuevo/a?' },
  { kr: '반갑습니다',             rom: 'ban-gap-seum-ni-da',            es: 'Encantado/a de conocerte' },
  { kr: '콜롬비아 사람이에요',    rom: 'kol-lom-bi-a sa-ra-mi-e-yo',   es: 'Soy colombiano/a' },
  { kr: '커피 마실래요?',         rom: 'keo-pi ma-sil-rae-yo?',         es: '¿Tomamos un café?' },
  { kr: '대학교 어때요?',         rom: 'dae-hak-gyo eo-ttae-yo?',       es: '¿Cómo es la universidad?' },
  { kr: '좋아요',                 rom: 'jo-a-yo',                        es: 'Está bien / Me gusta' },
  { kr: '커피도 있어요',          rom: 'keo-pi-do i-sseo-yo',            es: 'También hay café' },
  { kr: '많아요',                 rom: 'ma-na-yo',                       es: 'Hay muchos/as' },
  { kr: '저는 민수예요',          rom: 'jeo-neun min-su-ye-yo',          es: 'Soy Minsu' },
];

function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

export default function Activation006({ onComplete }: Props) {
  const audioRef    = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]   = useState(0);
  const [rate, setRate]           = useState(1);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.pause(); else a.play().catch(() => {});
  }

  function setPlaybackRate(r: number) {
    setRate(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current && duration > 0) audioRef.current.currentTime = ratio * duration;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        ETAPA 01 DE 11 · Activación
      </p>
      <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>새로 왔어요? · Campus — Primer día</h2>
      <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
        David llega a la universidad. Minsu lo aborda, se presentan y acaban tomando café.<br />
        Escucha el podcast del episodio para activar tu oído antes de las tarjetas.
      </p>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={KR_PODCAST_006}
        onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={e => setDuration(e.currentTarget.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Dark gradient podcast player */}
      <div style={{
        background: 'linear-gradient(135deg, #0f0c29, #1a1a3e, #24243e)',
        borderRadius: 16, padding: '1.25rem 1.25rem 1rem',
        marginBottom: 20,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
              {[1, 0.6, 0.9, 0.4, 0.75].map((h, i) => (
                <div key={i} style={{
                  width: 3, borderRadius: 2, background: '#6c63ff',
                  height: isPlaying ? `${6 + h * 10}px` : '4px',
                  animation: isPlaying ? `eq${i} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
                  transition: 'height 0.15s',
                }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#6c63ff', fontWeight: 700, letterSpacing: '0.12em' }}>
              PODCAST · STEP 006
            </span>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            {fmt(currentTime)} / {fmt(duration)}
          </span>
        </div>

        {/* Episode label */}
        <p style={{ margin: '0 0 8px', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>Episodio: </span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>새로 왔어요? — Primer día en el campus</span>
        </p>

        {/* Progress bar (clickable) */}
        <div
          onClick={handleProgressClick}
          style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 12, cursor: 'pointer', overflow: 'hidden' }}
        >
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6c63ff, #a78bfa)', borderRadius: 3, transition: 'width 0.5s linear' }} />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            onClick={togglePlay}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              border: 'none', color: '#fff', fontSize: 16,
              cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(108,99,255,0.4)',
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0.75, 1, 1.25, 1.5].map(r => (
              <button key={r} type="button" onClick={() => setPlaybackRate(r)} style={{
                padding: '3px 8px', borderRadius: 6,
                border: `1px solid ${rate === r ? '#6c63ff' : 'rgba(255,255,255,0.1)'}`,
                background: rate === r ? 'rgba(108,99,255,0.3)' : 'transparent',
                color: rate === r ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                fontSize: 10, fontWeight: rate === r ? 700 : 400, cursor: 'pointer',
              }}>
                {r}×
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes eq0 { from { height: 6px; } to { height: 14px; } }
        @keyframes eq1 { from { height: 4px; } to { height: 11px; } }
        @keyframes eq2 { from { height: 8px; } to { height: 15px; } }
        @keyframes eq3 { from { height: 5px; } to { height: 10px; } }
        @keyframes eq4 { from { height: 7px; } to { height: 13px; } }
      `}</style>

      {/* Key phrases grid */}
      <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        Frases del episodio · toca para escuchar
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 24 }}>
        {KEY_PHRASES.map(p => (
          <button
            key={p.kr}
            onClick={() => playAudio(p.kr)}
            style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '10px 12px', textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.2s' }}
          >
            <p style={{ margin: '0 0 2px', fontSize: 15, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, color: 'var(--ink)' }}>{p.kr}</p>
            <p style={{ margin: '0 0 2px', fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{p.rom}</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-2, var(--foreground))' }}>{p.es}</p>
          </button>
        ))}
      </div>

      <button onClick={() => onComplete?.()}
        style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
        Empezar las tarjetas →
      </button>
    </section>
  );
}
