'use client';

import { useState } from 'react';
import { KR_IMG_005, KR_IMG_003, KR_IMG_004, playAudio } from '@/lib/storage';

interface VocabItem {
  hangul: string; rom: string; es: string; img: string;
  audio: string; recycled?: boolean; tip?: string;
}
interface Props { onComplete?: () => void }

const VOCAB: VocabItem[] = [
  { hangul: '여기 있습니다',        rom: 'yeo-gi it-seum-ni-da',             es: 'Aquí tiene (entrega formal)',       img: KR_IMG_003.entregar,             audio: '여기 있습니다',        recycled: true, tip: '여기(aquí) + 있습니다(forma formal de 있어요)' },
  { hangul: '맛있게 드세요',        rom: 'ma-sit-ge deu-se-yo',              es: '¡Que lo disfrutes! (antes de comer)', img: KR_IMG_005.matissge_deuseyo,   audio: '맛있게 드세요',        tip: '맛있게 = deliciosamente · 드세요 = honorífico de 먹어요' },
  { hangul: '잘 먹었습니다',        rom: 'jal meo-geot-seum-ni-da',          es: 'Gracias por la comida (después)',   img: KR_IMG_005.jal_meogeossseumnida, audio: '잘 먹었습니다',       tip: '잘(bien) + 먹었습니다(comí, pasado formal)' },
  { hangul: '얼마예요?',            rom: 'eol-ma-ye-yo?',                    es: '¿Cuánto es?',                       img: KR_IMG_003.olmayo,               audio: '얼마예요?',           recycled: true, tip: '♻️ De step003 — 이거 얼마예요? → ahora solo 얼마예요?' },
  { hangul: '잠시만요',             rom: 'jam-si-man-yo',                    es: 'Un momento (formal)',               img: KR_IMG_005.cashier_pay,          audio: '잠시만요',            tip: '잠시(breve tiempo) vs 잠깐(momento casual) — David usa el formal' },
  { hangul: '칠천 원이에요',        rom: 'chil-cheon wo-ni-e-yo',            es: 'Son 7.000 wones',                   img: KR_IMG_005.chilcheon_won,        audio: '칠천 원이에요',       tip: '칠(7) + 천(1.000) = 7.000 · Sistema sino-coreano para precios' },
  { hangul: '원',                   rom: 'won',                              es: 'won — moneda coreana (₩)',          img: KR_IMG_005.sino_numbers,         audio: '원',                  tip: '사천 원=₩4.000 · 오천 원=₩5.000 · 만 원=₩10.000' },
  { hangul: '실례합니다',           rom: 'sil-lye-ham-ni-da',               es: 'Disculpe la molestia',              img: KR_IMG_005.sillye_hamnida,       audio: '실례합니다',          tip: '실(perder) + 례(etiqueta) → "voy a perder mis modales al interrumpir"' },
  { hangul: '잘 모르겠어요',        rom: 'jal mo-reu-get-sseo-yo',           es: 'No estoy seguro / no lo sé bien',  img: KR_IMG_005.jal_moreugesseoyo,    audio: '잘 모르겠어요',       tip: '잘(bien) + 모르겠어요(no sé) — amortiguador de cortesía' },
  { hangul: '화장실 있어요?',       rom: 'hwa-jang-sil i-sseo-yo?',          es: '¿Hay un baño? / ¿Tiene baño?',     img: KR_IMG_005.hwajangsil_sign,      audio: '화장실 있어요?',      tip: '화장실 + 있어요? — solo agrega el lugar a la estructura que ya sabes' },
  { hangul: '오른쪽',               rom: 'o-reun-jjok',                      es: 'derecha (dirección)',               img: KR_IMG_005.oreunjjok,            audio: '오른쪽',              tip: '오른쪽 = derecha · 왼쪽 = izquierda · -쪽 = lado/dirección' },
  { hangul: '안쪽 오른쪽에 있어요', rom: 'an-jjok o-reun-jjo-ge i-sseo-yo', es: 'Está al fondo a la derecha',        img: KR_IMG_005.direction_anjjok,     audio: '안쪽 오른쪽에 있어요', tip: '안쪽(adentro) + 오른쪽에(a la derecha) + 있어요(está)' },
];

export default function AcquisitionGuided005({ onComplete }: Props) {
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
          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(45,155,78,0.12)', border: '1px solid rgba(45,155,78,0.3)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>
            ♻️ Ya la conoces
          </div>
        )}
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-2,var(--wl-panel-raised, #f5f5f7))' }}>
          <img src={card.img} alt={card.es} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 100, background: 'linear-gradient(transparent, rgba(0,0,0,0.35))' }} />
        </div>
        <div style={{ padding: '20px 20px 8px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 36, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1.1 }}>{card.hangul}</p>
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
