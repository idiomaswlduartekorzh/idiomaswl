'use client';

import { useState } from 'react';
import { KR_PODCAST_007, playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }

const KEY_PHRASES = [
  { kr: '한국 생활 어때요?',        rom: 'han-guk saeng-hwal eo-ttae-yo?',    es: '¿Qué tal la vida en Corea?' },
  { kr: '공부해요',                  rom: 'gong-bu-hae-yo',                    es: 'Estudio / Estudia' },
  { kr: '일해요',                    rom: 'il-hae-yo',                          es: 'Trabajo / Trabaja' },
  { kr: '뭐해요?',                   rom: 'mwo-hae-yo?',                        es: '¿Qué haces?' },
  { kr: '에서',                      rom: 'e-seo',                              es: 'en (lugar de acción)' },
  { kr: '이 대학교에서 공부해요',     rom: 'i dae-hak-gyo-e-seo gong-bu-hae-yo', es: 'Estudio en esta universidad' },
  { kr: '카페에서 일해요',            rom: 'ka-pe-e-seo il-hae-yo',              es: 'Trabajo en el café' },
  { kr: '좋아해요',                  rom: 'jo-a-hae-yo',                        es: 'Me gusta (verbo)' },
  { kr: '매일 카페에 가요',           rom: 'mae-il ka-pe-e ga-yo',               es: 'Voy al café todos los días' },
];

export default function Activation007({ onComplete }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        ETAPA 01 DE 11 · Activación
      </p>
      <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>생활 · Rutina universitaria de David</h2>
      <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
        David estudia en la universidad y trabaja en el café. Minsu le pregunta cómo le va.<br />
        Escucha el podcast del episodio para activar tu oído antes de las tarjetas.
      </p>

      {/* Podcast player */}
      <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 16, padding: '20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🎙</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>Podcast · Step 007</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>생활 — Rutina universitaria en Corea · ~8 min</p>
          </div>
        </div>
        <video
          src={KR_PODCAST_007}
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
