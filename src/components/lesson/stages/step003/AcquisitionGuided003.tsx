'use client';

import { useState } from 'react';
import { KR_IMG_003, KR_AUDIO_002, playAudio } from '@/lib/storage';

interface VocabItem {
  hangul: string;
  rom: string;
  es: string;
  img: string;
  audio: string;
  recycled?: boolean;
}

const VOCAB: VocabItem[] = [
  { hangul: '카페',            rom: 'ka-pe',                    es: 'cafetería',               img: KR_IMG_003.cafe,         audio: '카페' },
  { hangul: '어서 오세요',      rom: 'eo-seo o-se-yo',           es: '¡Bienvenido/a!',          img: KR_IMG_003.welcome,      audio: '어서 오세요' },
  { hangul: '안녕하세요',       rom: 'an-nyeong-ha-se-yo',       es: 'Hola (formal)',           img: KR_IMG_003.hola,         audio: '안녕하세요' },
  { hangul: '아메리카노',       rom: 'a-me-ri-ka-no',            es: 'americano (café)',        img: KR_IMG_003.vaso,         audio: '아메리카노' },
  { hangul: '주세요',           rom: 'ju-se-yo',                 es: 'por favor / deme',        img: KR_IMG_003.pedir,        audio: '주세요' },
  { hangul: '금방',             rom: 'geum-bang',                es: 'enseguida / ahora',       img: KR_IMG_003.preparar,     audio: '금방' },
  { hangul: '사이즈',           rom: 'sa-i-jeu',                 es: 'tamaño',                  img: KR_IMG_003.tamano,       audio: '사이즈' },
  { hangul: '스몰·미디엄·라지', rom: 'seu-mol · mi-di-eom · la-ji', es: 'S · M · L',          img: KR_IMG_003.sml,          audio: '스몰' },
  { hangul: '여기 있습니다',    rom: 'yeo-gi it-seum-ni-da',     es: 'aquí tiene',              img: KR_IMG_003.entregar,     audio: '여기 있습니다' },
  { hangul: '감사합니다',       rom: 'gam-sa-ham-ni-da',         es: 'gracias',                 img: KR_IMG_003.gracias,      audio: '감사합니다' },
  { hangul: '이름',             rom: 'i-reum',                   es: 'nombre',                  img: KR_IMG_003.nombre,       audio: '이름' },
  { hangul: '저는 하은이에요',  rom: 'jeo-neun ha-eu-ni-e-yo',   es: 'Soy Haeun',               img: KR_IMG_003.haeun,        audio: '저는 하은이에요' },
  { hangul: '글자',             rom: 'geul-ja',                  es: 'letras / caracteres',     img: KR_IMG_003.menu,         audio: '글자', recycled: true },
  { hangul: '작아요',           rom: 'ja-ga-yo',                 es: 'es pequeño/a',            img: KR_IMG_003.nombreenvaso, audio: '작아요' },
];

// For recycled words we need to check KR_AUDIO_002 fallback — playAudio already handles this
// We just mark them so the badge appears

interface Props {
  onComplete?: () => void;
}

export default function AcquisitionGuided003({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([0]));

  const card = VOCAB[index];
  const allSeen = seen.size === VOCAB.length;

  function goTo(next: number) {
    setSeen(prev => {
      const s = new Set(prev);
      s.add(next);
      return s;
    });
    setIndex(next);
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        ETAPA 02 DE 11 · Adquisicion guiada
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
              background: seen.has(i) ? '#6c63ff' : 'var(--line-soft)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {/* Card */}
      <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
        {/* Recycled badge */}
        {card.recycled && (
          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(45,155,78,0.12)', border: '1px solid rgba(45,155,78,0.3)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#2d9b4e', letterSpacing: '0.04em' }}>
            Ya conoces esta
          </div>
        )}

        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-2)' }}>
          <img
            src={card.img}
            alt={card.es}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 100, background: 'linear-gradient(transparent, rgba(0,0,0,0.35))' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '20px 20px 8px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 48, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1.1 }}>
            {card.hangul}
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            {card.rom}
          </p>
          <p style={{ margin: '0 0 16px', fontSize: 18, color: 'var(--ink-2)', fontWeight: 600 }}>
            {card.es}
          </p>

          {/* Audio buttons */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => playAudio(card.audio, 1)}
              style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}
            >
              &#x1F50A; Escuchar
            </button>
            <button
              type="button"
              onClick={() => playAudio(card.audio, 0.75)}
              style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}
            >
              &#x1F422; Escuchar lento
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
          style={{ background: index === 0 ? 'var(--bg-2)' : '#6c63ff', color: index === 0 ? 'var(--muted)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
        >
          ← Anterior
        </button>

        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          Tarjeta {index + 1} de {VOCAB.length}
        </span>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === VOCAB.length - 1}
          style={{ background: index === VOCAB.length - 1 ? 'var(--bg-2)' : '#6c63ff', color: index === VOCAB.length - 1 ? 'var(--muted)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: index === VOCAB.length - 1 ? 'not-allowed' : 'pointer' }}
        >
          Siguiente →
        </button>
      </div>

      {/* Complete CTA */}
      {allSeen && (
        <button
          type="button"
          onClick={() => onComplete?.()}
          style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          He visto todas las tarjetas →
        </button>
      )}
    </section>
  );
}
