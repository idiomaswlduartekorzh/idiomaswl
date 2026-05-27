'use client';

import { useState } from 'react';
import { KR_PODCAST_005, KR_VIDEO_005, playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }

const KEY_PHRASES = [
  { kr: '여기 있습니다',          rom: 'yeo-gi it-seum-ni-da',              es: 'Aquí tiene' },
  { kr: '맛있게 드세요',          rom: 'ma-sit-ge deu-se-yo',               es: '¡Que lo disfrutes!' },
  { kr: '잘 먹었습니다',          rom: 'jal meo-geot-seum-ni-da',           es: 'Gracias por la comida' },
  { kr: '얼마예요?',              rom: 'eol-ma-ye-yo?',                      es: '¿Cuánto es?' },
  { kr: '잠시만요',               rom: 'jam-si-man-yo',                      es: 'Un momento (formal)' },
  { kr: '칠천 원이에요',          rom: 'chil-cheon wo-ni-e-yo',              es: 'Son 7.000 wones' },
  { kr: '실례합니다',             rom: 'sil-lye-ham-ni-da',                 es: 'Disculpe la molestia' },
  { kr: '화장실 있어요?',         rom: 'hwa-jang-sil i-sseo-yo?',           es: '¿Hay un baño?' },
  { kr: '안쪽 오른쪽에 있어요',   rom: 'an-jjok o-reun-jjo-ge i-sseo-yo',  es: 'Al fondo a la derecha' },
];

export default function Activation005({ onComplete }: Props) {
  const [playing, setPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        ETAPA 01 DE 11 · Activación
      </p>
      <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>여기 있습니다 · Pago y despedida</h2>
      <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
        David entrega el pedido, el cliente paga 칠천 원 y pregunta por el baño.<br />
        Escucha el podcast del episodio para activar tu oído antes del video.
      </p>

      {/* Podcast player */}
      <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 16, padding: '20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🎙</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>Podcast · Step 005</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>여기 있습니다— Completando la transacción · ~8 min</p>
          </div>
        </div>
        <audio
          src={KR_PODCAST_005}
          controls
          style={{ width: '100%', borderRadius: 8 }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--muted)' }}>
          {playing ? '▶ Reproduciendo — escucha despacio las frases en coreano.' : '📻 Escucha el podcast antes de continuar para activar tu oído.'}
        </p>
      </div>

      {/* Video preview toggle */}
      <button
        onClick={() => setShowVideo(v => !v)}
        style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer', marginBottom: 16, textAlign: 'left' }}
      >
        🎬 {showVideo ? 'Ocultar' : 'Ver'} el video del episodio
      </button>
      {showVideo && (
        <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 16, background: '#000' }}>
          <video src={KR_VIDEO_005} controls playsInline style={{ width: '100%', display: 'block', maxHeight: 360 }} />
        </div>
      )}

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
