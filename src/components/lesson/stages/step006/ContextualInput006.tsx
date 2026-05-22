'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { KR_VIDEO_006, playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

interface Word { kr: string; rom: string; es: string; note?: string }

interface Bubble {
  id: string;
  speaker: 'minsu' | 'david';
  ko: string;
  es: string;
  audio: string;
  note: string;          // grammar / cultural note
  words: Word[];
}

interface Scene {
  id: string;
  title: string;
  emoji: string;
  videoSrc: string;
  description: string;
  bubbles: Bubble[];
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SCENES: Scene[] = [
  {
    id: 'scene1',
    title: 'Escena 1 · El pasillo',
    emoji: '🏫',
    videoSrc: KR_VIDEO_006.scene1,
    description: 'Minsu ve a David en el pasillo. David es nuevo en la universidad.',
    bubbles: [
      {
        id: 's1b0', speaker: 'minsu',
        ko: '새로 왔어요?', es: '¿Eres nuevo/a aquí?',
        audio: '새로 왔어요?',
        note: '🔑 왔어요 = pasado de 오다 (venir). Minsu pregunta directamente si David es recién llegado — muy natural en coreano.',
        words: [
          { kr: '새로', rom: 'sae-ro', es: 'recién / de nuevo', note: 'adverbio que indica novedad' },
          { kr: '왔어요', rom: 'wa-sseo-yo', es: 'vine / llegué', note: 'pasado de 오다 (venir) en formal-amigable' },
          { kr: '?', rom: '', es: '← pregunta con entonación ascendente', note: '' },
        ],
      },
      {
        id: 's1b1', speaker: 'david',
        ko: '안녕하세요.', es: 'Hola.',
        audio: '안녕하세요',
        note: '💬 El saludo estándar formal. Siempre correcto con alguien que no conoces.',
        words: [
          { kr: '안녕하세요', rom: 'an-nyeong-ha-se-yo', es: 'hola (formal)', note: 'el saludo más universal del coreano' },
        ],
      },
      {
        id: 's1b2', speaker: 'david',
        ko: '네, 새로 왔어요.', es: 'Sí, soy nuevo.',
        audio: '네, 새로 왔어요',
        note: '🔄 David confirma repitiendo la misma estructura de Minsu — muy natural. En coreano se hace eco del interlocutor.',
        words: [
          { kr: '네', rom: 'ne', es: 'sí', note: 'confirmación positiva universal' },
          { kr: '새로', rom: 'sae-ro', es: 'recién / nuevo', note: '' },
          { kr: '왔어요', rom: 'wa-sseo-yo', es: 'vine / llegué', note: 'pasado — equivale a "he llegado"' },
        ],
      },
      {
        id: 's1b3', speaker: 'david',
        ko: '콜롬비아 사람이에요.', es: 'Soy colombiano.',
        audio: '콜롬비아 사람이에요',
        note: '🌍 [país] + 사람이에요 = "Soy de [país]". Funciona con cualquier país: 한국 사람이에요, 미국 사람이에요…',
        words: [
          { kr: '콜롬비아', rom: 'kol-lom-bi-a', es: 'Colombia', note: 'nombre del país en coreano' },
          { kr: '사람', rom: 'sa-ram', es: 'persona', note: 'palabra clave — también significa "gente"' },
          { kr: '이에요', rom: 'i-e-yo', es: 'soy / es', note: 'cópula formal después de consonante (ㅂ)' },
        ],
      },
    ],
  },
  {
    id: 'scene2',
    title: 'Escena 2 · El café del campus',
    emoji: '☕',
    videoSrc: KR_VIDEO_006.scene2,
    description: 'David invita a Minsu a tomar un café. Se presentan formalmente.',
    bubbles: [
      {
        id: 's2b0', speaker: 'david',
        ko: '저는 데이비드예요.', es: 'Soy David.',
        audio: '저는 데이비드예요',
        note: '👤 저는 = "yo" en forma modesta/formal. 예요 se usa después de vocal (데이비드 termina en vocal d → 드).',
        words: [
          { kr: '저는', rom: 'jeo-neun', es: 'yo (modesto)', note: '저 = yo formal; 는 = marcador de tema' },
          { kr: '데이비드', rom: 'de-i-bi-deu', es: 'David', note: 'nombre propio en coreano' },
          { kr: '예요', rom: 'ye-yo', es: 'soy / es', note: 'cópula después de vocal — igual que 이에요 pero más suave' },
        ],
      },
      {
        id: 's2b1', speaker: 'david',
        ko: '커피 마실래요?', es: '¿Tomamos un café?',
        audio: '커피 마실래요?',
        note: '☕ -ㄹ래요? propone hacer algo juntos. Es una invitación directa entre personas que acaban de conocerse y están cómodas. ¡Muy poderoso!',
        words: [
          { kr: '커피', rom: 'keo-pi', es: 'café (la bebida)', note: 'préstamo del inglés "coffee"' },
          { kr: '마실래요', rom: 'ma-sil-rae-yo', es: '¿quieres beber?', note: 'de 마시다 (beber) + -ㄹ래요 (invitación/propuesta)' },
          { kr: '?', rom: '', es: '← propuesta amistosa', note: '' },
        ],
      },
      {
        id: 's2b2', speaker: 'minsu',
        ko: '저는 민수예요.', es: 'Soy Minsu.',
        audio: '저는 민수예요',
        note: '🤝 Minsu usa la misma estructura que David — eco natural. 민수 termina en vocal ↓ por eso 예요 (no 이에요).',
        words: [
          { kr: '저는', rom: 'jeo-neun', es: 'yo (modesto)', note: '' },
          { kr: '민수', rom: 'min-su', es: 'Minsu', note: 'nombre coreano, termina en vocal → 예요' },
          { kr: '예요', rom: 'ye-yo', es: 'soy', note: 'después de vocal — recuerda: vocal → 예요, consonante → 이에요' },
        ],
      },
    ],
  },
  {
    id: 'scene3',
    title: 'Escena 3 · Caminando por el campus',
    emoji: '🏛️',
    videoSrc: KR_VIDEO_006.scene3,
    description: 'Minsu pregunta cómo le va a David en la universidad. David da su opinión con detalles.',
    bubbles: [
      {
        id: 's3b0', speaker: 'minsu',
        ko: '대학교 어때요?', es: '¿Cómo es la universidad?',
        audio: '대학교 어때요?',
        note: '🤔 어때요 = ¿cómo es? / ¿qué tal? Solo añade cualquier sustantivo antes: 커피 어때요?, 날씨 어때요?… ¡funciona con todo!',
        words: [
          { kr: '대학교', rom: 'dae-hak-gyo', es: 'universidad', note: 'literalmente "gran escuela"' },
          { kr: '어때요', rom: 'eo-ttae-yo', es: '¿cómo es? / ¿qué tal?', note: 'pregunta de opinión universal — patrón clave del step006' },
        ],
      },
      {
        id: 's3b1', speaker: 'david',
        ko: '좋아요.', es: 'Está bien. / Me gusta.',
        audio: '좋아요',
        note: '✅ 좋아요 es la respuesta positiva más versátil del coreano. Significa "está bien", "me gusta", "de acuerdo". ¡Un must!',
        words: [
          { kr: '좋아요', rom: 'jo-a-yo', es: 'está bien / me gusta', note: 'de 좋다 (ser bueno/agradable) — respuesta positiva universal' },
        ],
      },
      {
        id: 's3b2', speaker: 'david',
        ko: '친절한 사람들도 많아요.', es: 'Hay mucha gente amable también.',
        audio: '친절한 사람들',
        note: '🔑 도 = también / encima. 많아요 = hay muchos. Añadir 도 suma detalles a tu respuesta — hace el coreano más rico y natural.',
        words: [
          { kr: '친절한', rom: 'chin-jeol-han', es: 'amable (adj.)', note: 'de 친절하다 → 친절한 modifica el sustantivo siguiente' },
          { kr: '사람들', rom: 'sa-ram-deul', es: 'personas, gente', note: '들 = sufijo de plural en coreano' },
          { kr: '도', rom: 'do', es: 'también / encima', note: 'partícula clave — añade información extra sin esfuerzo' },
          { kr: '많아요', rom: 'ma-na-yo', es: 'hay muchos/as', note: 'de 많다 — describe cantidad' },
        ],
      },
      {
        id: 's3b3', speaker: 'david',
        ko: '커피도 있어요.', es: 'También hay café.',
        audio: '커피도 있어요',
        note: '☕ 있어요 = hay / existe / tiene. Con 도 = "también hay". Complementa la respuesta anterior — muestra que David sabe conversar en coreano.',
        words: [
          { kr: '커피', rom: 'keo-pi', es: 'café', note: '' },
          { kr: '도', rom: 'do', es: 'también', note: 'misma partícula de antes — suma un detalle más' },
          { kr: '있어요', rom: 'i-sseo-yo', es: 'hay / existe / tiene', note: 'de 있다 — contrario de 없어요 (no hay)' },
        ],
      },
    ],
  },
];

/* ─── Colors ──────────────────────────────────────────────────────────────── */
const ACCENT = '#6c63ff';
const MINSU_BG    = 'var(--secondary)';
const MINSU_BORDER = 'var(--border)';
const DAVID_BG    = 'rgba(108,99,255,0.1)';
const DAVID_BORDER = 'rgba(108,99,255,0.3)';

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function WordChip({ w }: { w: Word }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:2, padding:'8px 10px', borderRadius:10, background:'rgba(108,99,255,0.06)', border:'1px solid rgba(108,99,255,0.18)' }}>
      <span style={{ fontSize:16, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)' }}>{w.kr}</span>
      <span style={{ fontSize:10, color:'#a78bfa', fontFamily:'var(--mono)' }}>{w.rom}</span>
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
      animation:'ci4-bubble 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
    }}>
      {/* Speaker label */}
      <p style={{
        margin:'0 0 3px', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em',
        color: isMinsu ? 'var(--muted-foreground)' : ACCENT,
        paddingLeft: isMinsu ? 8 : 0, paddingRight: isMinsu ? 0 : 8,
      }}>
        {isMinsu ? '민수 Minsu' : '데이비드 David'}
      </p>

      {/* Bubble */}
      <div style={{
        maxWidth:'88%',
        background: isMinsu ? MINSU_BG : DAVID_BG,
        border:`1px solid ${isMinsu ? MINSU_BORDER : DAVID_BORDER}`,
        borderRadius: isMinsu ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
        padding:'12px 14px',
      }}>
        {/* Korean text */}
        <p style={{ margin:'0 0 3px', fontSize:18, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)', lineHeight:1.3 }}>
          {bubble.ko}
        </p>
        {/* Spanish */}
        <p style={{ margin:'0 0 10px', fontSize:12, color:'var(--muted-foreground)' }}>{bubble.es}</p>

        {/* Action buttons */}
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

        {/* Expanded breakdown */}
        {expanded && (
          <div style={{ marginTop:12, animation:'ci4-in 0.3s ease both' }}>
            {/* Word chips */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:10 }}>
              {bubble.words.filter(w => w.kr !== '?' && w.kr !== '').map((w, i) => (
                <WordChip key={i} w={w} />
              ))}
            </div>
            {/* Grammar / cultural note */}
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
export default function ContextualInput006({ onComplete }: Props) {
  const [sceneIdx,    setSceneIdx]    = useState(0);
  const [bubbleCount, setBubbleCount] = useState(0); // how many bubbles revealed in current scene
  const [expanded,    setExpanded]    = useState<string | null>(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [phase, setPhase]             = useState<'video' | 'chat'>('video');
  const bottomRef                     = useRef<HTMLDivElement>(null);

  const scene = SCENES[sceneIdx];
  const isLastScene  = sceneIdx === SCENES.length - 1;
  const allRevealed  = bubbleCount >= (scene?.bubbles.length ?? 0);

  // Auto-scroll down when new bubble appears
  useEffect(() => {
    const t = setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:'smooth', block:'end' }), 150);
    return () => clearTimeout(t);
  }, [bubbleCount]);

  // Reset on scene change
  useEffect(() => {
    setBubbleCount(0);
    setExpanded(null);
    setVideoWatched(false);
    setPhase('video');
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

  /* ── VIDEO PHASE ─────────────────────────────────────────────────────────── */
  if (phase === 'video') {
    return (
      <div style={{ fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif', color:'var(--foreground)', padding:'20px 16px', display:'flex', flexDirection:'column', gap:16 }}>
        <style>{`
          @keyframes ci4-in     { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
          @keyframes ci4-bubble { from{opacity:0;transform:translateY(14px) scale(0.97)} to{opacity:1;transform:none} }
        `}</style>

        {/* Scene header */}
        <div style={{ animation:'ci4-in 0.4s ease both' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
            <span style={{ fontSize:20 }}>{scene.emoji}</span>
            <p style={{ margin:0, fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:ACCENT }}>
              {sceneIdx + 1} de {SCENES.length}
            </p>
          </div>
          <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:800, color:'var(--foreground)' }}>{scene.title}</h2>
          <p style={{ margin:0, fontSize:13, color:'var(--muted-foreground)', lineHeight:1.6 }}>{scene.description}</p>
        </div>

        {/* Scene progress */}
        <div style={{ display:'flex', gap:5 }}>
          {SCENES.map((s, i) => (
            <div key={s.id} style={{ flex:1, height:4, borderRadius:2, background: i < sceneIdx ? ACCENT : i === sceneIdx ? 'rgba(108,99,255,0.4)' : 'var(--border)' }} />
          ))}
        </div>

        {/* Video */}
        <div style={{ borderRadius:16, overflow:'hidden', background:'#000', animation:'ci4-in 0.4s 0.1s ease both' }}>
          <video
            src={scene.videoSrc}
            controls
            playsInline
            style={{ width:'100%', display:'block', maxHeight:300, objectFit:'contain' }}
            onPlay={() => {}}
            onTimeUpdate={e => { if (e.currentTarget.currentTime > 3) setVideoWatched(true); }}
            onEnded={() => setVideoWatched(true)}
          />
        </div>

        {/* Tip */}
        <div style={{ padding:'12px 14px', borderRadius:12, background:'rgba(108,99,255,0.06)', border:'1px solid rgba(108,99,255,0.2)', animation:'ci4-in 0.4s 0.15s ease both' }}>
          <p style={{ margin:0, fontSize:12, color:'var(--foreground)', lineHeight:1.65 }}>
            💡 Mira el video y trata de captar las frases. Luego las analizaremos <strong>línea por línea</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPhase('chat')}
          disabled={!videoWatched}
          style={{
            padding:'14px', borderRadius:14, cursor: videoWatched ? 'pointer' : 'not-allowed', width:'100%',
            background: videoWatched ? `rgba(108,99,255,0.14)` : 'var(--secondary)',
            border: videoWatched ? `1px solid rgba(108,99,255,0.4)` : '1px solid var(--border)',
            fontSize:14, fontWeight:800, color: videoWatched ? ACCENT : 'var(--muted-foreground)',
            animation:'ci4-in 0.4s 0.2s ease both',
          }}
        >
          {videoWatched ? 'Analizar línea por línea →' : 'Mira unos segundos del video…'}
        </button>
      </div>
    );
  }

  /* ── CHAT PHASE ──────────────────────────────────────────────────────────── */
  return (
    <div style={{ fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif', color:'var(--foreground)', padding:'16px', display:'flex', flexDirection:'column', gap:14 }}>
      <style>{`
        @keyframes ci4-in     { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes ci4-bubble { from{opacity:0;transform:translateY(16px) scale(0.97)} to{opacity:1;transform:none} }
      `}</style>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:18 }}>{scene.emoji}</span>
        <div>
          <p style={{ margin:'0 0 1px', fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', color:ACCENT }}>{sceneIdx + 1}/{SCENES.length}</p>
          <h3 style={{ margin:0, fontSize:16, fontWeight:800, color:'var(--foreground)' }}>{scene.title}</h3>
        </div>
        <button
          type="button"
          onClick={() => setPhase('video')}
          style={{ marginLeft:'auto', padding:'5px 12px', borderRadius:100, fontSize:11, fontWeight:600, cursor:'pointer', color:'var(--muted-foreground)', background:'var(--secondary)', border:'1px solid var(--border)' }}
        >
          ▶ Ver video
        </button>
      </div>

      {/* Scene progress dots */}
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

      {/* Bubble counter */}
      {bubbleCount > 0 && (
        <p style={{ margin:'4px 0', fontSize:11, color:'var(--muted-foreground)', textAlign:'center' }}>
          {bubbleCount}/{scene.bubbles.length} líneas · Toca ▼ Desglose en cada burbuja para la explicación
        </p>
      )}

      <div ref={bottomRef} />

      {/* CTA buttons */}
      {!allRevealed ? (
        <button
          type="button"
          onClick={revealNext}
          style={{
            padding:'13px', borderRadius:14, cursor:'pointer', width:'100%',
            background:'rgba(108,99,255,0.12)', border:'1px solid rgba(108,99,255,0.35)',
            fontSize:14, fontWeight:800, color:ACCENT,
          }}
        >
          {bubbleCount === 0 ? '▶ Iniciar análisis línea por línea' : `Siguiente línea (${bubbleCount + 1}/${scene.bubbles.length}) →`}
        </button>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:10, animation:'ci4-in 0.4s ease both' }}>
          {/* Summary of scene */}
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
            style={{
              padding:'14px', borderRadius:14, cursor:'pointer', width:'100%',
              background:ACCENT, border:'none',
              fontSize:14, fontWeight:800, color:'#fff',
            }}
          >
            {isLastScene ? '¡Entendí el contexto! →' : `Escena ${sceneIdx + 2} · ${SCENES[sceneIdx + 1].title} →`}
          </button>
        </div>
      )}
    </div>
  );
}
