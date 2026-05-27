'use client';

import { useState } from 'react';
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

export default function Activation006({ onComplete }: Props) {
  const [playing, setPlaying] = useState(false);

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

      {/* Podcast player */}
      <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 16, padding: '20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🎙</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>Podcast · Step 006</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>새로 왔어요? — Primer día en el campus · ~8 min</p>
          </div>
        </div>
        <video
          src={KR_PODCAST_006}
          controls
          playsInline
          style={{ width: '100%', borderRadius: 8, display: 'block' }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--muted)' }}>
          {playing ? '▶ Reproduciendo — escucha despacio las frases en coreano.' : '📻 Escucha el podcast antes de continuar para activar tu oído.'}
        </p>
      </div>

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
