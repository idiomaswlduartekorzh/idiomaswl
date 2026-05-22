'use client';

import { useEffect, useRef, useState } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

interface Word { kr: string; rom: string; es: string; note?: string }

interface Bubble {
  id: string;
  speaker: 'minsu' | 'david';
  ko: string;
  es: string;
  audio: string;
  note: string;
  words: Word[];
}

interface Scene {
  id: string;
  title: string;
  emoji: string;
  description: string;
  bubbles: Bubble[];
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SCENES: Scene[] = [
  {
    id: 'scene1',
    title: 'Escena 1 · La rutina de David',
    emoji: '🎓',
    description: 'Minsu le pregunta a David cómo le va la vida en Corea. David describe su rutina universitaria.',
    bubbles: [
      {
        id: 's1b0', speaker: 'minsu',
        ko: '한국 생활 어때요?', es: '¿Qué tal la vida en Corea?',
        audio: '한국 생활 어때요?',
        note: '어때요 ya lo conoces — ahora pregunta sobre algo más grande: toda tu vida aquí.',
        words: [
          { kr: '한국', rom: 'han-guk', es: 'Corea' },
          { kr: '생활', rom: 'saeng-hwal', es: 'vida cotidiana' },
          { kr: '어때요?', rom: 'eo-ttae-yo', es: '¿qué tal? (del step004)' },
        ],
      },
      {
        id: 's1b1', speaker: 'david',
        ko: '어, 이 대학교에서 공부해요.', es: 'Eh, estudio en esta universidad.',
        audio: '이 대학교에서 공부해요',
        note: '에서 = donde ocurre la acción. No 대학교에 (destino) sino 대학교에서 (lugar de la acción).',
        words: [
          { kr: '어', rom: 'eo', es: 'eh / bueno (pausa natural)' },
          { kr: '이', rom: 'i', es: 'este/esta' },
          { kr: '대학교에서', rom: 'dae-hak-gyo-e-seo', es: 'en esta universidad' },
          { kr: '공부해요', rom: 'gong-bu-hae-yo', es: 'estudio' },
        ],
      },
      {
        id: 's1b2', speaker: 'david',
        ko: '카페에서 일해요.', es: 'Trabajo en el café.',
        audio: '카페에서 일해요',
        note: 'Mismo patrón: 에서 + verbo 해요. David tiene dos actividades, dos lugares con 에서.',
        words: [
          { kr: '카페에서', rom: 'ka-pe-e-seo', es: 'en el café' },
          { kr: '일해요', rom: 'il-hae-yo', es: 'trabajo' },
        ],
      },
      {
        id: 's1b3', speaker: 'david',
        ko: '한국 좋아해요.', es: 'Me gusta Corea.',
        audio: '한국 좋아해요',
        note: 'OJO: NO es 한국 좋아요 (Corea está bien). Es 좋아해요 — verbo de preferencia. "Me gusta Corea."',
        words: [
          { kr: '한국', rom: 'han-guk', es: 'Corea' },
          { kr: '좋아해요', rom: 'jo-a-hae-yo', es: 'me gusta (verbo)' },
        ],
      },
      {
        id: 's1b4', speaker: 'david',
        ko: '민수 씨는 뭐해요?', es: '¿Y tú, Minsu? ¿Qué haces?',
        audio: '민수 씨는 뭐해요?',
        note: '씨 se usa con el nombre propio — es respetuoso y cercano al mismo tiempo. No se usa con apellido.',
        words: [
          { kr: '민수 씨', rom: 'min-su ssi', es: 'Sr. Minsu (título honorífico)' },
          { kr: '는', rom: 'neun', es: 'partícula de tema' },
          { kr: '뭐해요?', rom: 'mwo-hae-yo', es: '¿qué haces?' },
        ],
      },
    ],
  },
  {
    id: 'scene2',
    title: 'Escena 2 · Minsu responde',
    emoji: '🤝',
    description: 'Minsu responde a David y hablan de sus actividades cotidianas.',
    bubbles: [
      {
        id: 's2b0', speaker: 'minsu',
        ko: '어, 저도 이 대학교에서 공부해요.', es: 'Eh, yo también estudio en esta universidad.',
        audio: '저도 이 대학교에서 공부해요',
        note: '저도 — Minsu usa la partícula 도 (también) que ya aprendiste en step004. ¡El reciclaje funciona!',
        words: [
          { kr: '어', rom: 'eo', es: 'eh (pausa)' },
          { kr: '저도', rom: 'jeo-do', es: 'yo también (도 = también, del step004)' },
          { kr: '이 대학교에서', rom: 'i dae-hak-gyo-e-seo', es: 'en esta universidad' },
          { kr: '공부해요', rom: 'gong-bu-hae-yo', es: 'estudio' },
        ],
      },
      {
        id: 's2b1', speaker: 'minsu',
        ko: '친구들이 많아요.', es: 'Hay muchos amigos.',
        audio: '친구들이 많아요',
        note: '들 añade plural a cualquier sustantivo. 친구 (un amigo) → 친구들 (amigos). También conoces 사람들 del step004.',
        words: [
          { kr: '친구들', rom: 'chin-gu-deul', es: 'amigos (들=plural)' },
          { kr: '이', rom: 'i', es: 'partícula de sujeto' },
          { kr: '많아요', rom: 'ma-na-yo', es: 'hay muchos (del step004)' },
        ],
      },
      {
        id: 's2b2', speaker: 'david',
        ko: '매일 카페에 가요.', es: 'Voy al café todos los días.',
        audio: '매일 카페에 가요',
        note: 'CONTRASTE CLAVE: 카페에서 일해요 (trabajo EN el café — acción) vs 카페에 가요 (voy AL café — movimiento). Mismo lugar, partícula diferente.',
        words: [
          { kr: '매일', rom: 'mae-il', es: 'todos los días' },
          { kr: '카페에', rom: 'ka-pe-e', es: 'al café (에 = destino)' },
          { kr: '가요', rom: 'ga-yo', es: 'voy / vamos' },
        ],
      },
    ],
  },
];

/* ─── Colors ──────────────────────────────────────────────────────────────── */
const ACCENT = '#6c63ff';
const MINSU_BG     = 'var(--secondary)';
const MINSU_BORDER = 'var(--border)';
const DAVID_BG     = 'rgba(108,99,255,0.1)';
const DAVID_BORDER = 'rgba(108,99,255,0.3)';

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function WordChip({ w }: { w: Word }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:2, padding:'8px 10px', borderRadius:10, background:'rgba(108,99,255,0.06)', border:'1px solid rgba(108,99,255,0.18)' }}>
      <span style={{ fontSize:16, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)' }}>{w.kr}</span>
      <span style={{ fontSize:10, color:'#a78bfa', fontFamily:'monospace' }}>{w.rom}</span>
      <span style={{ fontSize:12, color:'var(--muted-foreground)', fontWeight:600 }}>{w.es}</span>
      {w.note && <span style={{ fontSize:10, color:'var(--muted-foreground)', lineHeight:1.4, marginTop:2 }}>{w.note}</span>}
    </div>
  );
}

function ChatBubbleEl({ bubble, revealed, expanded, onExpand, onAudio }: {
  bubble: Bubble;
  revealed: boolean;
  expanded: boolean;
  onExpand: () => void;
  onAudio: () => void;
}) {
  const isMinsu = bubble.speaker === 'minsu';
  if (!revealed) return null;

  return (
    <div style={{
      display:'flex', flexDirection:'column',
      alignItems: isMinsu ? 'flex-start' : 'flex-end',
      animation:'ci5-bubble 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
    }}>
      <p style={{
        margin:'0 0 3px', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em',
        color: isMinsu ? 'var(--muted-foreground)' : ACCENT,
        paddingLeft: isMinsu ? 8 : 0, paddingRight: isMinsu ? 0 : 8,
      }}>
        {isMinsu ? '민수 Minsu' : '데이비드 David'}
      </p>

      <div style={{
        maxWidth:'88%',
        background: isMinsu ? MINSU_BG : DAVID_BG,
        border:`1px solid ${isMinsu ? MINSU_BORDER : DAVID_BORDER}`,
        borderRadius: isMinsu ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
        padding:'12px 14px',
      }}>
        <p style={{ margin:'0 0 3px', fontSize:18, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)', lineHeight:1.3 }}>
          {bubble.ko}
        </p>
        <p style={{ margin:'0 0 10px', fontSize:12, color:'var(--muted-foreground)' }}>{bubble.es}</p>

        <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
          <button type="button" onClick={onAudio}
            style={{ padding:'4px 12px', borderRadius:100, cursor:'pointer', fontSize:11, fontWeight:600, color:ACCENT, background:'rgba(108,99,255,0.1)', border:`1px solid rgba(108,99,255,0.3)`, display:'inline-flex', alignItems:'center', gap:4 }}>
            🔊 Escuchar
          </button>
          <button type="button" onClick={onExpand}
            style={{ padding:'4px 12px', borderRadius:100, cursor:'pointer', fontSize:11, fontWeight:600, color:'var(--muted-foreground)', background:'var(--secondary)', border:'1px solid var(--border)', display:'inline-flex', alignItems:'center', gap:4 }}>
            {expanded ? '▲ Cerrar' : '▼ Desglose'}
          </button>
        </div>

        {expanded && (
          <div style={{ marginTop:12, animation:'ci5-in 0.3s ease both' }}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:10 }}>
              {bubble.words.map((w, i) => (
                <WordChip key={i} w={w} />
              ))}
            </div>
            <div style={{ padding:'10px 12px', borderRadius:10, background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.25)' }}>
              <p style={{ margin:0, fontSize:12, color:'var(--foreground)', lineHeight:1.65 }}>{bubble.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ContextualInput007({ onComplete }: Props) {
  const [sceneIdx,     setSceneIdx]     = useState(0);
  const [bubbleCount,  setBubbleCount]  = useState(0);
  const [expanded,     setExpanded]     = useState<string | null>(null);
  const bottomRef                       = useRef<HTMLDivElement>(null);

  const scene       = SCENES[sceneIdx];
  const isLastScene = sceneIdx === SCENES.length - 1;
  const allRevealed = bubbleCount >= (scene?.bubbles.length ?? 0);

  useEffect(() => {
    const t = setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:'smooth', block:'end' }), 150);
    return () => clearTimeout(t);
  }, [bubbleCount]);

  useEffect(() => {
    setBubbleCount(0);
    setExpanded(null);
  }, [sceneIdx]);

  function revealNext() {
    setBubbleCount(n => Math.min(n + 1, scene.bubbles.length));
  }

  function nextScene() {
    if (isLastScene) {
      onComplete?.();
    } else {
      setSceneIdx(i => i + 1);
    }
  }

  if (!scene) return null;

  return (
    <div style={{ fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif', color:'var(--foreground)', padding:'16px', display:'flex', flexDirection:'column', gap:14 }}>
      <style>{`
        @keyframes ci5-in     { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes ci5-bubble { from{opacity:0;transform:translateY(16px) scale(0.97)} to{opacity:1;transform:none} }
      `}</style>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:18 }}>{scene.emoji}</span>
        <div>
          <p style={{ margin:'0 0 1px', fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', color:ACCENT }}>{sceneIdx + 1}/{SCENES.length}</p>
          <h3 style={{ margin:0, fontSize:16, fontWeight:800, color:'var(--foreground)' }}>{scene.title}</h3>
        </div>
      </div>

      <p style={{ margin:'0', fontSize:13, color:'var(--muted-foreground)', lineHeight:1.6 }}>{scene.description}</p>

      {/* Scene progress */}
      <div style={{ display:'flex', gap:5 }}>
        {SCENES.map((s, i) => (
          <div key={s.id} style={{ flex:1, height:4, borderRadius:2, background: i < sceneIdx ? ACCENT : i === sceneIdx ? 'rgba(108,99,255,0.4)' : 'var(--border)', transition:'background 0.3s' }} />
        ))}
      </div>

      {/* Chat bubbles */}
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {scene.bubbles.map((bubble, i) => (
          <ChatBubbleEl
            key={bubble.id}
            bubble={bubble}
            revealed={i < bubbleCount}
            expanded={expanded === bubble.id}
            onExpand={() => setExpanded(prev => prev === bubble.id ? null : bubble.id)}
            onAudio={() => playAudio(bubble.audio)}
          />
        ))}
      </div>

      {bubbleCount > 0 && (
        <p style={{ margin:'4px 0', fontSize:11, color:'var(--muted-foreground)', textAlign:'center' }}>
          {bubbleCount}/{scene.bubbles.length} líneas · Toca ▼ Desglose en cada burbuja para la explicación
        </p>
      )}

      <div ref={bottomRef} />

      {!allRevealed ? (
        <button
          type="button"
          onClick={revealNext}
          style={{ padding:'13px', borderRadius:14, cursor:'pointer', width:'100%', background:'rgba(108,99,255,0.12)', border:'1px solid rgba(108,99,255,0.35)', fontSize:14, fontWeight:800, color:ACCENT }}
        >
          {bubbleCount === 0 ? '▶ Iniciar análisis línea por línea' : `Siguiente línea (${bubbleCount + 1}/${scene.bubbles.length}) →`}
        </button>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:10, animation:'ci5-in 0.4s ease both' }}>
          <div style={{ padding:'14px 16px', borderRadius:14, background:'rgba(34,197,94,0.07)', border:'1px solid rgba(34,197,94,0.25)' }}>
            <p style={{ margin:'0 0 6px', fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.06em', color:'#22c55e' }}>✓ Escena {sceneIdx + 1} completada</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {scene.bubbles.map(b => (
                <button key={b.id} type="button" onClick={() => playAudio(b.audio)}
                  style={{ padding:'5px 12px', borderRadius:100, cursor:'pointer', fontSize:13, fontFamily:'"Noto Sans KR",sans-serif', fontWeight:700, color:'#16a34a', background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)' }}>
                  {b.ko}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={nextScene}
            style={{ padding:'14px', borderRadius:14, cursor:'pointer', width:'100%', background:ACCENT, border:'none', fontSize:14, fontWeight:800, color:'#fff' }}
          >
            {isLastScene ? '¡Entendí el contexto! →' : `Escena ${sceneIdx + 2} · ${SCENES[sceneIdx + 1].title} →`}
          </button>
        </div>
      )}
    </div>
  );
}
