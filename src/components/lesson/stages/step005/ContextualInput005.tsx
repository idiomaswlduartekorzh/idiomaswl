'use client';

import { useEffect, useRef, useState } from 'react';
import { KR_VIDEO_005, playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

interface Word { kr: string; rom: string; es: string; note?: string }

interface Bubble {
  id: string;
  speaker: 'david' | 'cliente';
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
  videoSrc?: string;
  description: string;
  bubbles: Bubble[];
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SCENES: Scene[] = [
  {
    id: 'scene1',
    title: 'Escena 1 · Entrega del pedido',
    emoji: '☕',
    videoSrc: KR_VIDEO_005,
    description: 'David entrega el pedido al cliente. Usa el lenguaje formal de servicio.',
    bubbles: [
      {
        id: 's1b0', speaker: 'david',
        ko: '여기 있습니다.', es: 'Aquí tiene.',
        audio: '여기 있습니다',
        note: '있습니다 vs 있어요: mismo significado, diferente nivel. 있습니다 = nivel formal de servicio profesional. David usa -습니다 con clientes.',
        words: [
          { kr: '여기', rom: 'yeo-gi', es: 'aquí', note: 'pronombre de lugar' },
          { kr: '있습니다', rom: 'it-seum-ni-da', es: 'hay / aquí tiene', note: 'formal de 있어요 — nivel de servicio' },
        ],
      },
      {
        id: 's1b1', speaker: 'david',
        ko: '맛있게 드세요.', es: '¡Que lo disfrutes!',
        audio: '맛있게 드세요',
        note: '드세요 es el honorífico de 먹어요 (comer). David usa la forma de máximo respeto porque habla con el cliente. 맛있게 = deliciosamente.',
        words: [
          { kr: '맛있게', rom: 'ma-sit-ge', es: 'deliciosamente', note: 'adverbio de 맛있다 (ser delicioso)' },
          { kr: '드세요', rom: 'deu-se-yo', es: 'coma usted (honor.)', note: 'honorífico de 먹어요 — máximo respeto con el cliente' },
        ],
      },
      {
        id: 's1b2', speaker: 'cliente',
        ko: '잘 먹었습니다.', es: 'Gracias por la comida.',
        audio: '잘 먹었습니다',
        note: '잘 = bien. 잘 먹었습니다 = "comí bien" → agradece al que preparó/sirvió. Obligatorio en la cultura coreana después de comer.',
        words: [
          { kr: '잘', rom: 'jal', es: 'bien', note: 'adverbio — indica acción realizada satisfactoriamente' },
          { kr: '먹었습니다', rom: 'meo-geot-seum-ni-da', es: 'comí (formal)', note: 'pasado formal de 먹다' },
        ],
      },
    ],
  },
  {
    id: 'scene2',
    title: 'Escena 2 · El cobro',
    emoji: '💳',
    description: 'El cliente paga. David da el precio en el sistema sino-coreano.',
    bubbles: [
      {
        id: 's2b0', speaker: 'cliente',
        ko: '얼마예요?', es: '¿Cuánto es?',
        audio: '얼마예요?',
        note: '얼마 = ¿cuánto? 예요 = es. Juntos: "¿cuánto es?" — la pregunta básica de precio. Funciona en cualquier tienda.',
        words: [
          { kr: '얼마', rom: 'eol-ma', es: '¿cuánto?', note: 'pronombre interrogativo de cantidad' },
          { kr: '예요?', rom: 'ye-yo', es: 'es?', note: 'cópula con entonación de pregunta' },
        ],
      },
      {
        id: 's2b1', speaker: 'david',
        ko: '잠시만요. 칠천 원이에요.', es: 'Un momento. Son 7.000 wones.',
        audio: '칠천 원이에요',
        note: '칠 = 7 (sistema sino-coreano). Los PRECIOS siempre usan sino-coreano (일/이/삼…칠/팔/구/십). Los OBJETOS físicos usan nativo (하나/둘/셋).',
        words: [
          { kr: '잠시만요', rom: 'jam-si-man-yo', es: 'un momento', note: 'fórmula de cortesía para hacer esperar' },
          { kr: '칠천', rom: 'chil-cheon', es: '7.000', note: 'sino-coreano: 칠(7) + 천(1.000)' },
          { kr: '원이에요', rom: 'wo-ni-e-yo', es: 'wones (es)', note: '원 = won, moneda coreana' },
        ],
      },
    ],
  },
  {
    id: 'scene3',
    title: 'Escena 3 · El baño',
    emoji: '🚾',
    description: 'El cliente pregunta por el baño. David le da las instrucciones.',
    bubbles: [
      {
        id: 's3b0', speaker: 'cliente',
        ko: '실례합니다. 화장실 있어요?', es: 'Disculpe. ¿Hay un baño?',
        audio: '화장실 있어요?',
        note: '실례합니다 = reconocer que vas a interrumpir a alguien. 화장실 있어요? = "¿hay baño?" — 있어요 pregunta si algo existe.',
        words: [
          { kr: '실례합니다', rom: 'sil-lye-ham-ni-da', es: 'disculpe (interrumpir)', note: 'más formal que 저기요 — para interrumpir a alguien ocupado' },
          { kr: '화장실', rom: 'hwa-jang-sil', es: 'baño / aseos', note: 'literalmente "sala de tocador"' },
          { kr: '있어요?', rom: 'i-sseo-yo', es: '¿hay?', note: '있다 = existir / haber — con entonación de pregunta' },
        ],
      },
      {
        id: 's3b1', speaker: 'david',
        ko: '잘 모르겠어요. 안쪽 오른쪽에 있어요.', es: 'No estoy seguro. Está al fondo a la derecha.',
        audio: '안쪽 오른쪽에 있어요',
        note: '에 con 있어요 = ubicación estática ("está EN"). 오른쪽에 있어요 = "está en la derecha". Contraste: 에 con 가요 = destino ("voy A").',
        words: [
          { kr: '잘 모르겠어요', rom: 'jal mo-reu-ge-sseo-yo', es: 'no estoy seguro', note: 'expresión de incertidumbre educada' },
          { kr: '안쪽', rom: 'an-jjok', es: 'al fondo / al interior', note: 'dirección espacial' },
          { kr: '오른쪽에', rom: 'o-reun-jjo-ge', es: 'a la derecha (en)', note: 'en + la derecha — 에 indica ubicación estática' },
          { kr: '있어요', rom: 'i-sseo-yo', es: 'está / hay', note: 'localización — "se encuentra"' },
        ],
      },
    ],
  },
];

/* ─── Colors ──────────────────────────────────────────────────────────────── */
const ACCENT        = '#6c63ff';
const DAVID_BG      = 'rgba(108,99,255,0.1)';
const DAVID_BORDER  = 'rgba(108,99,255,0.3)';
const CLIENT_BG     = 'var(--secondary)';
const CLIENT_BORDER = 'var(--border)';

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function WordChip({ w }: { w: Word }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:2, padding:'8px 10px', borderRadius:10, background:'rgba(108,99,255,0.06)', border:'1px solid rgba(108,99,255,0.18)' }}>
      <span style={{ fontSize:16, fontWeight:800, fontFamily:'"Noto Sans KR",sans-serif', color:'var(--foreground)' }}>{w.kr}</span>
      <span style={{ fontSize:10, color:'var(--wl-on-panel-link, #a78bfa)', fontFamily:'var(--mono)' }}>{w.rom}</span>
      <span style={{ fontSize:12, color:'var(--muted-foreground)', fontWeight:600 }}>{w.es}</span>
      {w.note && <span style={{ fontSize:10, color:'var(--muted-foreground)', lineHeight:1.4, marginTop:2 }}>{w.note}</span>}
    </div>
  );
}

function ChatBubbleEl({ bubble, revealed, expanded, onExpand, onAudio }: {
  bubble: Bubble; revealed: boolean; expanded: boolean; onExpand: () => void; onAudio: () => void;
}) {
  const isDavid = bubble.speaker === 'david';
  if (!revealed) return null;

  return (
    <div style={{
      display:'flex', flexDirection:'column',
      alignItems: isDavid ? 'flex-end' : 'flex-start',
      animation:'ci3-bubble 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
    }}>
      <p style={{
        margin:'0 0 3px', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em',
        color: isDavid ? ACCENT : 'var(--muted-foreground)',
        paddingLeft: isDavid ? 0 : 8, paddingRight: isDavid ? 8 : 0,
      }}>
        {isDavid ? '데이비드 David' : '손님 Cliente'}
      </p>
      <div style={{
        maxWidth:'88%',
        background: isDavid ? DAVID_BG : CLIENT_BG,
        border:`1px solid ${isDavid ? DAVID_BORDER : CLIENT_BORDER}`,
        borderRadius: isDavid ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
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
          <div style={{ marginTop:12, animation:'ci3-in 0.3s ease both' }}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:10 }}>
              {bubble.words.map((w, i) => <WordChip key={i} w={w} />)}
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
export default function ContextualInput005({ onComplete }: Props) {
  const [sceneIdx,     setSceneIdx]     = useState(0);
  const [bubbleCount,  setBubbleCount]  = useState(0);
  const [expanded,     setExpanded]     = useState<string | null>(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [phase,        setPhase]        = useState<'video' | 'chat'>('video');
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
    setVideoWatched(false);
    setPhase(scene?.videoSrc ? 'video' : 'chat');
  }, [sceneIdx]);

  function revealNext() { setBubbleCount(n => Math.min(n + 1, scene.bubbles.length)); }

  function nextScene() {
    if (isLastScene) { onComplete?.(); return; }
    setSceneIdx(i => i + 1);
  }

  if (!scene) return null;

  /* ── VIDEO PHASE ─────────────────────────────────────────────────────────── */
  if (phase === 'video' && scene.videoSrc) {
    return (
      <div style={{ fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif', color:'var(--foreground)', padding:'20px 16px', display:'flex', flexDirection:'column', gap:16 }}>
        <style>{`
          @keyframes ci3-in     { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
          @keyframes ci3-bubble { from{opacity:0;transform:translateY(14px) scale(0.97)} to{opacity:1;transform:none} }
        `}</style>

        <div style={{ animation:'ci3-in 0.4s ease both' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
            <span style={{ fontSize:20 }}>{scene.emoji}</span>
            <p style={{ margin:0, fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:ACCENT }}>
              {sceneIdx + 1} de {SCENES.length}
            </p>
          </div>
          <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:800, color:'var(--foreground)' }}>{scene.title}</h2>
          <p style={{ margin:0, fontSize:13, color:'var(--muted-foreground)', lineHeight:1.6 }}>{scene.description}</p>
        </div>

        <div style={{ display:'flex', gap:5 }}>
          {SCENES.map((s, i) => (
            <div key={s.id} style={{ flex:1, height:4, borderRadius:2, background: i < sceneIdx ? ACCENT : i === sceneIdx ? 'rgba(108,99,255,0.4)' : 'var(--border)' }} />
          ))}
        </div>

        <div style={{ borderRadius:16, overflow:'hidden', background:'#000', animation:'ci3-in 0.4s 0.1s ease both' }}>
          <video
            src={scene.videoSrc}
            controls
            playsInline
            style={{ width:'100%', display:'block', maxHeight:300, objectFit:'contain' }}
            onTimeUpdate={e => { if (e.currentTarget.currentTime > 3) setVideoWatched(true); }}
            onEnded={() => setVideoWatched(true)}
          />
        </div>

        <div style={{ padding:'12px 14px', borderRadius:12, background:'rgba(108,99,255,0.06)', border:'1px solid rgba(108,99,255,0.2)', animation:'ci3-in 0.4s 0.15s ease both' }}>
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
            background: videoWatched ? 'rgba(108,99,255,0.14)' : 'var(--secondary)',
            border: videoWatched ? '1px solid rgba(108,99,255,0.4)' : '1px solid var(--border)',
            fontSize:14, fontWeight:800, color: videoWatched ? ACCENT : 'var(--muted-foreground)',
            animation:'ci3-in 0.4s 0.2s ease both',
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
        @keyframes ci3-in     { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes ci3-bubble { from{opacity:0;transform:translateY(16px) scale(0.97)} to{opacity:1;transform:none} }
      `}</style>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:18 }}>{scene.emoji}</span>
        <div>
          <p style={{ margin:'0 0 1px', fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', color:ACCENT }}>{sceneIdx + 1}/{SCENES.length}</p>
          <h3 style={{ margin:0, fontSize:16, fontWeight:800, color:'var(--foreground)' }}>{scene.title}</h3>
        </div>
        {scene.videoSrc && (
          <button
            type="button"
            onClick={() => setPhase('video')}
            style={{ marginLeft:'auto', padding:'5px 12px', borderRadius:100, fontSize:11, fontWeight:600, cursor:'pointer', color:'var(--muted-foreground)', background:'var(--secondary)', border:'1px solid var(--border)' }}
          >
            ▶ Ver video
          </button>
        )}
      </div>

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
        <div style={{ display:'flex', flexDirection:'column', gap:10, animation:'ci3-in 0.4s ease both' }}>
          <div style={{ padding:'14px 16px', borderRadius:14, background:'rgba(34,197,94,0.07)', border:'1px solid rgba(34,197,94,0.25)' }}>
            <p style={{ margin:'0 0 6px', fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.06em', color:'#22c55e' }}>✓ Escena {sceneIdx + 1} completada</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {scene.bubbles.map(b => (
                <button key={b.id} type="button" onClick={() => playAudio(b.audio)}
                  style={{ padding:'5px 12px', borderRadius:100, cursor:'pointer', fontSize:13, fontFamily:'"Noto Sans KR",sans-serif', fontWeight:700, color:'var(--wl-on-panel-ok, #16a34a)', background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)' }}>
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
