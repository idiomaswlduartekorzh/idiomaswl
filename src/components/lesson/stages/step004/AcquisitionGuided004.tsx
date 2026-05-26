'use client';

import { useState } from 'react';
import { KR_IMG_004, KR_IMG_003, playAudio } from '@/lib/storage';

interface VocabItem {
  hangul: string; rom: string; es: string; img: string;
  audio: string; recycled?: boolean; tip?: string;
}
interface Props { onComplete?: () => void }

const VOCAB: VocabItem[] = [
  { hangul: '이거',             rom: 'i-geo',                 es: 'esto (cerca del hablante)',      img: KR_IMG_004.hodduk_stall,    audio: '이거 뭐예요?',            tip: 'Señalas algo que está cerca de ti' },
  { hangul: '그거',             rom: 'geu-geo',               es: 'eso (lejos del hablante)',        img: KR_IMG_004.david_ordering,  audio: '호떡' },
  { hangul: '이거 뭐예요?',     rom: 'i-geo mweo-ye-yo?',     es: '¿Qué es esto?',                  img: KR_IMG_004.hodduk_stall,    audio: '이거 뭐예요?' },
  { hangul: '호떡',             rom: 'ho-tteok',              es: 'hodduk (pastelito de plancha)',   img: KR_IMG_004.hodduk_closeup,  audio: '호떡' },
  { hangul: '맛있어요',         rom: 'ma-si-sseo-yo',         es: '¡está delicioso! (tiene sabor)',  img: KR_IMG_004.matisseoyo,      audio: '맛있어요',                tip: '맛(sabor) + 있어요(hay) = tiene sabor' },
  { hangul: '맛없어요',         rom: 'ma-deop-sseo-yo',       es: 'está feo / no tiene sabor',      img: KR_IMG_004.tteugeowoyo,     audio: '맛있어요' },
  { hangul: '하나',             rom: 'ha-na',                 es: 'uno (número nativo)',             img: KR_IMG_004.numbers_native,  audio: '하나',                    tip: 'Antes de contador: 하나→한' },
  { hangul: '둘 / 셋 / 넷',    rom: 'dul / set / net',       es: 'dos / tres / cuatro',            img: KR_IMG_004.numbers_native,  audio: '둘' },
  { hangul: '잔',               rom: 'jan',                   es: 'contador para tazas y bebidas',  img: KR_IMG_003.vaso,            audio: '한 잔',                   tip: '커피 한 잔 = una taza de café' },
  { hangul: '개',               rom: 'gae',                   es: 'contador genérico para objetos', img: KR_IMG_004.hodduk_closeup,  audio: '호떡 하나 주세요',         tip: '호떡 한 개 = un hodduk' },
  { hangul: '-도',              rom: '-do',                   es: 'también (se pega a la palabra)', img: KR_IMG_003.cafe,            audio: '커피',                    tip: '커피-도: reemplaza -를' },
  { hangul: '금방 준비해 드릴게요', rom: 'geum-bang jun-bi-hae deu-ril-ge-yo', es: 'enseguida lo preparo (formal)', img: KR_IMG_003.preparar, audio: '금방', recycled: true },
];

export default function AcquisitionGuided004({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [seen,  setSeen]  = useState<Set<number>>(new Set([0]));

  const card    = VOCAB[index];
  const allSeen = seen.size === VOCAB.length;

  function goTo(next: number) {
    setSeen(prev => { const s = new Set(prev); s.add(next); return s; });
    setIndex(next);
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        ETAPA 02 DE 11 · Adquisición guiada
      </p>

      <div style={{ display: 'flex', gap: 5, marginBottom: 16, flexWrap: 'wrap' }}>
        {VOCAB.map((_, i) => (
          <span key={i} style={{ width: 24, height: 4, borderRadius: 2, background: seen.has(i) ? '#6c63ff' : 'var(--line-soft)', transition: 'background 0.2s' }} />
        ))}
      </div>

      <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
        {card.recycled && (
          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(45,155,78,0.12)', border: '1px solid rgba(45,155,78,0.3)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#2d9b4e' }}>
            ♻️ Ya la conoces
          </div>
        )}
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-2,#f5f5f7)' }}>
          <img src={card.img} alt={card.es} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 100, background: 'linear-gradient(transparent, rgba(0,0,0,0.35))' }} />
        </div>
        <div style={{ padding: '20px 20px 8px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 40, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1.1 }}>{card.hangul}</p>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{card.rom}</p>
          <p style={{ margin: '0 0 10px', fontSize: 17, color: 'var(--ink-2,var(--foreground))', fontWeight: 600 }}>{card.es}</p>
          {card.tip && <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>💡 {card.tip}</p>}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button type="button" onClick={() => playAudio(card.audio, 1)} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>🔊 Escuchar</button>
            <button type="button" onClick={() => playAudio(card.audio, 0.75)} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>🐢 Lento</button>
          </div>
        </div>
      </article>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0}
          style={{ background: index === 0 ? 'var(--bg-2,#f5f5f7)' : '#6c63ff', color: index === 0 ? 'var(--muted)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>
          ← Anterior
        </button>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>Tarjeta {index + 1} de {VOCAB.length}</span>
        <button type="button" onClick={() => goTo(index + 1)} disabled={index === VOCAB.length - 1}
          style={{ background: index === VOCAB.length - 1 ? 'var(--bg-2,#f5f5f7)' : '#6c63ff', color: index === VOCAB.length - 1 ? 'var(--muted)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: index === VOCAB.length - 1 ? 'not-allowed' : 'pointer' }}>
          Siguiente →
        </button>
      </div>

      {allSeen && (
        <button type="button" onClick={() => onComplete?.()}
          style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          He visto todas las tarjetas →
        </button>
      )}
    </section>
  );
}
