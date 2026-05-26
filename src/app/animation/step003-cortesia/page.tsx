'use client';

import { useState, useEffect, useRef, useCallback, CSSProperties } from 'react';

/* ─── Scene data ──────────────────────────────────────────────────────────── */
interface Scene {
  id: number;
  dur: number;            // seconds
  bg: string;             // CSS gradient
  tag?: string;           // top pill badge
  tagColor?: string;
  emoji?: string;
  emojiSize?: number;
  ko: string;             // main Korean text
  koSize?: number;
  rom?: string;           // romanization
  es: string;             // Spanish line
  sub?: string;           // secondary note
  subColor?: string;
  particles?: boolean;
  flash?: string;         // flash overlay color on scene entry
  rule?: { label: string; value: string }[]; // rule table rows
}

const SCENES: Scene[] = [
  {
    id:0, dur:18,
    bg:'linear-gradient(160deg,#0d0221 0%,#1a0533 50%,#0d0221 100%)',
    tag:'WeLearn Korean 🇰🇷', tagColor:'#a78bfa',
    emoji:'☕', emojiSize:90,
    ko:'카페 코리아', koSize:72,
    rom:'ka-pe ko-ri-a',
    es:'Sobrevive en cualquier café coreano',
    sub:'Step 003 — Cortesía y conversación',
    subColor:'#a78bfa',
  },
  {
    id:1, dur:12,
    bg:'linear-gradient(150deg,#1a0a00 0%,#7c2d12 60%,#1a0a00 100%)',
    tag:'El café te abre la puerta', tagColor:'#fb923c',
    emoji:'🚪', emojiSize:70,
    ko:'어서 오세요!', koSize:80,
    rom:'eo-seo o-se-yo',
    es:'¡Bienvenido! — lo dice el empleado',
    sub:'Tú respondes → 안녕하세요',
    subColor:'#fdba74',
    flash:'#fb923c44',
  },
  {
    id:2, dur:10,
    bg:'linear-gradient(160deg,#001a2c 0%,#0c4a6e 60%,#001a2c 100%)',
    tag:'Tu primera palabra', tagColor:'#38bdf8',
    emoji:'👋',
    ko:'안녕하세요',  koSize:80,
    rom:'an-nyeong-ha-se-yo',
    es:'Hola (formal) — siempre funciona',
    sub:'Úsalo al entrar, al pedir, al salir',
    subColor:'#7dd3fc',
  },
  {
    id:3, dur:14,
    bg:'linear-gradient(155deg,#0a0a1a 0%,#1e1b4b 55%,#0a0a1a 100%)',
    tag:'¿Por qué el coreano es fácil?', tagColor:'#818cf8',
    emoji:'🧠', emojiSize:68,
    ko:'패턴이 있어요!', koSize:68,
    rom:'pae-teon-i i-sseo-yo',
    es:'¡Tiene patrones! — y tú los vas a ver',
    sub:'3 patrones = 80% de conversaciones en café',
    subColor:'#c7d2fe',
  },
  {
    id:4, dur:16,
    bg:'linear-gradient(150deg,#001a0e 0%,#14532d 55%,#001a0e 100%)',
    tag:'El patrón mágico ✨', tagColor:'#4ade80',
    emoji:'✨', emojiSize:64,
    ko:'주세요', koSize:100,
    rom:'ju-se-yo',
    es:'"Por favor deme" — va SIEMPRE al final',
    sub:'[cosa] + 주세요 → orden perfecta',
    subColor:'#86efac',
    flash:'#22c55e33',
    particles:true,
  },
  {
    id:5, dur:14,
    bg:'linear-gradient(155deg,#001a0e 0%,#14532d 60%,#001a0e 100%)',
    tag:'주세요 en acción', tagColor:'#4ade80',
    emoji:'☕',
    ko:'아메리카노 한 잔 주세요', koSize:52,
    rom:'a-me-ri-ka-no han jan ju-se-yo',
    es:'Un americano, por favor',
    sub:'한 잔 = una taza  ·  주세요 = siempre al final',
    subColor:'#86efac',
  },
  {
    id:6, dur:18,
    bg:'linear-gradient(150deg,#0d0a1a 0%,#2e1065 55%,#0d0a1a 100%)',
    tag:'El secreto del coreano 🔑', tagColor:'#c084fc',
    emoji:'🔑', emojiSize:64,
    ko:'SOV', koSize:96,
    rom:'Sujeto → Objeto → Verbo',
    es:'En español: "Quiero café" → S + V + O',
    sub:'En coreano: "Café quiero" → S + O + V',
    subColor:'#e9d5ff',
    flash:'#9333ea44',
  },
  {
    id:7, dur:12,
    bg:'linear-gradient(155deg,#0d0a1a 0%,#2e1065 55%,#0d0a1a 100%)',
    tag:'SOV en el café', tagColor:'#c084fc',
    emoji:'📐',
    ko:'라지 주세요', koSize:76,
    rom:'ra-ji ju-se-yo',
    es:'Grande, por favor',
    sub:'라지 (objeto) + 주세요 (verbo) → SOV perfecto',
    subColor:'#d8b4fe',
  },
  {
    id:8, dur:12,
    bg:'linear-gradient(150deg,#1a0a00 0%,#7c2d12 55%,#1a0a00 100%)',
    tag:'Te preguntan el tamaño', tagColor:'#fb923c',
    emoji:'📏', emojiSize:64,
    ko:'사이즈 뭐로 드릴까요?', koSize:52,
    rom:'sa-i-jeu mwo-ro deu-ril-kka-yo?',
    es:'¿De qué tamaño se lo pongo?',
    sub:'Responde: 스몰/미디엄/라지 주세요',
    subColor:'#fdba74',
  },
  {
    id:9, dur:10,
    bg:'linear-gradient(155deg,#1a0a00 0%,#7c2d12 55%,#1a0a00 100%)',
    tag:'Los tamaños', tagColor:'#fb923c',
    emoji:'📊',
    ko:'스몰 · 미디엄 · 라지', koSize:52,
    rom:'seu-mol  ·  mi-di-eom  ·  ra-ji',
    es:'Small · Medium · Large',
    sub:'¡Son palabras inglesas en coreano!',
    subColor:'#fdba74',
  },
  {
    id:10, dur:12,
    bg:'linear-gradient(150deg,#001a10 0%,#065f46 55%,#001a10 100%)',
    tag:'Tu café está listo', tagColor:'#34d399',
    emoji:'⚡', emojiSize:64,
    ko:'금방 준비해 드릴게요', koSize:50,
    rom:'geum-bang jun-bi-hae deu-ril-ge-yo',
    es:'Se lo preparo enseguida',
    sub:'Escucha esto → tu pedido fue aceptado ✓',
    subColor:'#6ee7b7',
  },
  {
    id:11, dur:12,
    bg:'linear-gradient(155deg,#0a0a1a 0%,#1e1b4b 55%,#0a0a1a 100%)',
    tag:'Te preguntan tu nombre', tagColor:'#818cf8',
    emoji:'🏷️', emojiSize:64,
    ko:'이름이 뭐예요?', koSize:68,
    rom:'i-reum-i mwo-ye-yo?',
    es:'¿Cuál es tu nombre?',
    sub:'→ 저는 [nombre]이에요/예요',
    subColor:'#c7d2fe',
  },
  {
    id:12, dur:16,
    bg:'linear-gradient(150deg,#1a0533 0%,#6d28d9 55%,#1a0533 100%)',
    tag:'REGLA — consonante final', tagColor:'#e879f9',
    emoji:'🔤', emojiSize:58,
    ko:'이에요', koSize:88,
    rom:'i-e-yo',
    es:'Cuando el nombre termina en consonante',
    sub:'김 → 김이에요  ·  학생 → 학생이에요',
    subColor:'#f5d0fe',
    flash:'#9333ea55',
  },
  {
    id:13, dur:12,
    bg:'linear-gradient(155deg,#1a0533 0%,#6d28d9 55%,#1a0533 100%)',
    tag:'Ejemplo real', tagColor:'#e879f9',
    emoji:'👤',
    ko:'저는 하은이에요', koSize:64,
    rom:'jeo-neun ha-eun-i-e-yo',
    es:'Me llamo Haeun (consonante final: ㄴ)',
    sub:'저는 = yo  ·  이에요 = soy',
    subColor:'#f5d0fe',
  },
  {
    id:14, dur:16,
    bg:'linear-gradient(150deg,#001a2c 0%,#0e7490 55%,#001a2c 100%)',
    tag:'REGLA — vocal final', tagColor:'#22d3ee',
    emoji:'🔤', emojiSize:58,
    ko:'예요', koSize:96,
    rom:'ye-yo',
    es:'Cuando el nombre termina en vocal',
    sub:'마리아 → 마리아예요  ·  카페 → 카페예요',
    subColor:'#a5f3fc',
    flash:'#0891b255',
  },
  {
    id:15, dur:14,
    bg:'linear-gradient(155deg,#001a2c 0%,#0e7490 55%,#001a2c 100%)',
    tag:'Tu turno', tagColor:'#22d3ee',
    emoji:'🎤', emojiSize:68,
    ko:'저는 ___이에요 / 예요', koSize:52,
    rom:'jeo-neun ___-i-e-yo / ye-yo',
    es:'Di tu nombre ahora mismo — en voz alta',
    sub:'¿Termina en consonante o vocal?',
    subColor:'#a5f3fc',
    particles:true,
  },
  {
    id:16, dur:12,
    bg:'linear-gradient(150deg,#0a0a0a 0%,#1a1a2e 55%,#0a0a0a 100%)',
    tag:'Nivel formal', tagColor:'#94a3b8',
    emoji:'🎩', emojiSize:64,
    ko:'입니다', koSize:88,
    rom:'im-ni-da',
    es:'Soy / Es — nivel muy formal',
    sub:'Úsalo en presentaciones, entrevistas, avisos',
    subColor:'#cbd5e1',
  },
  {
    id:17, dur:12,
    bg:'linear-gradient(155deg,#001a0e 0%,#14532d 55%,#001a0e 100%)',
    tag:'Te entregan el café', tagColor:'#4ade80',
    emoji:'🤲',
    ko:'여기 있습니다', koSize:68,
    rom:'yeo-gi it-seum-ni-da',
    es:'Aquí tiene (formal)',
    sub:'Responde → 감사합니다',
    subColor:'#86efac',
  },
  {
    id:18, dur:14,
    bg:'linear-gradient(150deg,#1a0a00 0%,#92400e 55%,#1a0a00 100%)',
    tag:'La más importante', tagColor:'#fbbf24',
    emoji:'🙏', emojiSize:78,
    ko:'감사합니다', koSize:76,
    rom:'gam-sa-ham-ni-da',
    es:'Gracias (formal) — siempre funciona',
    sub:'감사해요 también es válido (menos formal)',
    subColor:'#fde68a',
    particles:true,
    flash:'#d9770644',
  },
  {
    id:19, dur:18,
    bg:'linear-gradient(150deg,#001a2c 0%,#0369a1 55%,#001a2c 100%)',
    tag:'있다 / 없다 — Superpoder', tagColor:'#38bdf8',
    emoji:'⚡', emojiSize:72,
    ko:'있어요 / 없어요', koSize:72,
    rom:'i-sseo-yo  /  eop-sseo-yo',
    es:'Hay / No hay  ·  Tengo / No tengo  ·  Está / No está',
    sub:'3 verbos españoles = 1 coreano. ¡Así de fácil!',
    subColor:'#7dd3fc',
    flash:'#0284c755',
  },
  {
    id:20, dur:12,
    bg:'linear-gradient(155deg,#001a2c 0%,#0369a1 55%,#001a2c 100%)',
    tag:'있다 de supervivencia', tagColor:'#38bdf8',
    emoji:'🚻',
    ko:'화장실이 있어요?', koSize:58,
    rom:'hwa-jang-si-ri i-sseo-yo?',
    es:'¿Hay baño? / ¿Dónde está el baño?',
    sub:'La frase más importante en cualquier idioma',
    subColor:'#7dd3fc',
  },
  {
    id:21, dur:10,
    bg:'linear-gradient(150deg,#0a0a0a 0%,#374151 55%,#0a0a0a 100%)',
    tag:'También útil', tagColor:'#9ca3af',
    emoji:'💰',
    ko:'이거 얼마예요?', koSize:62,
    rom:'i-geo eol-ma-ye-yo?',
    es:'¿Cuánto cuesta esto?',
    sub:'이거 = esto  ·  얼마 = cuánto',
    subColor:'#d1d5db',
  },
  {
    id:22, dur:12,
    bg:'linear-gradient(155deg,#001a0e 0%,#065f46 55%,#001a0e 100%)',
    tag:'Preséntate', tagColor:'#34d399',
    emoji:'🌍',
    ko:'저는 외국인이에요', koSize:58,
    rom:'jeo-neun oe-gu-gi-ni-e-yo',
    es:'Soy extranjero/a',
    sub:'외국인 termina en ㄴ → consonante → 이에요 ✓',
    subColor:'#6ee7b7',
  },
  {
    id:23, dur:16,
    bg:'linear-gradient(150deg,#1a0533 0%,#4c1d95 55%,#1a0533 100%)',
    tag:'Los 3 niveles de cortesía', tagColor:'#a78bfa',
    emoji:'📊', emojiSize:58,
    ko:'합쇼체 · 해요체 · 해체', koSize:46,
    rom:'ham-syo-che  ·  hae-yo-che  ·  hae-che',
    es:'Muy formal · Cortés · Informal',
    sub:'Para el café: 해요체 siempre es seguro',
    subColor:'#ddd6fe',
    flash:'#7c3aed44',
    rule:[
      { label:'합쇼체', value:'있습니다 / 감사합니다' },
      { label:'해요체', value:'있어요 / 감사해요' },
      { label:'해체',   value:'있어 / 고마워' },
    ],
  },
  {
    id:24, dur:12,
    bg:'linear-gradient(155deg,#001a2c 0%,#0369a1 55%,#001a2c 100%)',
    tag:'있다 en cualquier sitio', tagColor:'#38bdf8',
    emoji:'📶',
    ko:'와이파이 있어요?', koSize:70,
    rom:'wa-i-pa-i i-sseo-yo?',
    es:'¿Hay WiFi?',
    sub:'충전기 있어요? → ¿Hay cargador?',
    subColor:'#7dd3fc',
  },
  {
    id:25, dur:20,
    bg:'linear-gradient(150deg,#0d0221 0%,#1e1b4b 40%,#14532d 80%,#0d0221 100%)',
    tag:'Conversación completa', tagColor:'#f0abfc',
    emoji:'🎬', emojiSize:60,
    ko:'전체 대화', koSize:68,
    rom:'jeon-che dae-hwa',
    es:'Escucha: así suena una orden completa',
    sub:'어서오세요 → 안녕하세요, 아메리카노 라지 주세요 → 이름이 뭐예요? → 저는 [nombre]이에요 → 여기 있습니다 → 감사합니다!',
    subColor:'#e9d5ff',
    particles:true,
  },
  {
    id:26, dur:18,
    bg:'linear-gradient(150deg,#001a0e 0%,#14532d 55%,#001a0e 100%)',
    tag:'¡Ya puedes! 🏆', tagColor:'#4ade80',
    emoji:'🏆', emojiSize:80,
    ko:'할 수 있어요!', koSize:80,
    rom:'hal su i-sseo-yo!',
    es:'¡Puedes hacerlo! — y es verdad',
    sub:'Practica hoy mismo en un café real o imaginario',
    subColor:'#86efac',
    flash:'#22c55e55',
    particles:true,
  },
  {
    id:27, dur:18,
    bg:'linear-gradient(150deg,#0d0221 0%,#1a2ecc 50%,#0d0221 100%)',
    tag:'Próximo paso 🚇', tagColor:'#818cf8',
    emoji:'🚇', emojiSize:76,
    ko:'Step 004', koSize:88,
    rom:'En el metro de Seúl',
    es:'지하철 · 어떻게 가요? · 얼마예요?',
    sub:'Síguenos en WeLearn Korean para continuar tu viaje',
    subColor:'#c7d2fe',
    particles:true,
  },
];

const TOTAL_DUR = SCENES.reduce((a, s) => a + s.dur, 0); // ≈ 360s

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

/* ─── Particle system ─────────────────────────────────────────────────────── */
interface Particle { id: number; x: number; size: number; color: string; delay: number; dur: number; shape: 'circle'|'rect' }
const PCOLS = ['#a78bfa','#4ade80','#fb923c','#38bdf8','#e879f9','#fbbf24','#f87171'];
function makeParticles(): Particle[] {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 5 + Math.random() * 9,
    color: PCOLS[Math.floor(Math.random() * PCOLS.length)],
    delay: Math.random() * 1.5,
    dur: 2 + Math.random() * 1.5,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
  }));
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function Step003Animation() {
  const [playing, setPlaying]         = useState(false);
  const [countdown, setCountdown]     = useState<number|null>(null);
  const [sceneIdx, setSceneIdx]       = useState(0);
  const [elapsed, setElapsed]         = useState(0);       // total elapsed seconds
  const [sceneElapsed, setSceneElapsed] = useState(0);     // seconds into current scene
  const [flash, setFlash]             = useState(false);
  const [particles, setParticles]     = useState<Particle[]>([]);

  const playingRef    = useRef(false);
  const sceneIdxRef   = useRef(0);
  const sceneElRef    = useRef(0);
  const totalElRef    = useRef(0);
  const rafRef        = useRef<number>(0);
  const lastTRef      = useRef<number>(0);

  /* sync refs → state for render */
  const syncState = useCallback(() => {
    setSceneIdx(sceneIdxRef.current);
    setElapsed(totalElRef.current);
    setSceneElapsed(sceneElRef.current);
  }, []);

  /* advance one animation frame */
  const tick = useCallback((now: number) => {
    if (!playingRef.current) return;
    const dt = Math.min((now - lastTRef.current) / 1000, 0.1);
    lastTRef.current = now;

    sceneElRef.current  += dt;
    totalElRef.current  += dt;

    const scene = SCENES[sceneIdxRef.current];
    if (sceneElRef.current >= scene.dur) {
      const next = sceneIdxRef.current + 1;
      if (next >= SCENES.length) {
        playingRef.current = false;
        setPlaying(false);
        syncState();
        return;
      }
      sceneIdxRef.current = next;
      sceneElRef.current  = 0;
      /* trigger flash + particles */
      setFlash(true);
      setTimeout(() => setFlash(false), 350);
      if (SCENES[next].particles) setParticles(makeParticles());
      else setParticles([]);
    }

    syncState();
    rafRef.current = requestAnimationFrame(tick);
  }, [syncState]);

  const startPlaying = useCallback(() => {
    playingRef.current = true;
    lastTRef.current   = performance.now();
    rafRef.current     = requestAnimationFrame(tick);
    setPlaying(true);
  }, [tick]);

  const handlePlay = useCallback(() => {
    if (playing) {
      playingRef.current = false;
      cancelAnimationFrame(rafRef.current);
      setPlaying(false);
      return;
    }
    /* 3-2-1 countdown */
    setCountdown(3);
    let c = 3;
    const iv = setInterval(() => {
      c--;
      if (c <= 0) {
        clearInterval(iv);
        setCountdown(null);
        startPlaying();
      } else {
        setCountdown(c);
      }
    }, 1000);
  }, [playing, startPlaying]);

  const handleRestart = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    playingRef.current  = false;
    sceneIdxRef.current = 0;
    sceneElRef.current  = 0;
    totalElRef.current  = 0;
    setPlaying(false);
    setCountdown(null);
    setParticles([]);
    syncState();
  }, [syncState]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  /* ── derived values ── */
  const scene     = SCENES[sceneIdx];
  const scenePct  = scene ? Math.min(sceneElapsed / scene.dur, 1) * 100 : 0;
  const totalPct  = Math.min(elapsed / TOTAL_DUR, 1) * 100;

  const base: CSSProperties = {
    fontFamily: '"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic","Segoe UI",sans-serif',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  };

  return (
    <div style={{
      ...base,
      position:'fixed', inset:0,
      display:'flex', alignItems:'center', justifyContent:'center',
      background:'#000',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');

        @keyframes an-slideup  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:none} }
        @keyframes an-pop      { from{opacity:0;transform:scale(0.6)} 70%{transform:scale(1.08)} to{opacity:1;transform:scale(1)} }
        @keyframes an-fadein   { from{opacity:0} to{opacity:1} }
        @keyframes an-flash    { 0%{opacity:0.9} 100%{opacity:0} }
        @keyframes an-fall     { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(600deg);opacity:0} }
        @keyframes an-pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes an-cd       { from{opacity:0;transform:scale(0.3)} 40%{opacity:1;transform:scale(1.2)} 80%{opacity:1;transform:scale(0.95)} to{opacity:0;transform:scale(0.7)} }
        @keyframes an-bar      { from{width:0%} to{width:100%} }
        @keyframes an-rulepop  { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
        @keyframes an-glow     { 0%,100%{text-shadow:0 0 20px currentColor} 50%{text-shadow:0 0 60px currentColor,0 0 100px currentColor} }

        .an-btn {
          cursor:pointer; border:none; outline:none;
          border-radius:100px; font-weight:800; letter-spacing:0.04em;
          transition:transform 0.15s, filter 0.15s;
        }
        .an-btn:hover { filter:brightness(1.15); transform:scale(1.05); }
        .an-btn:active { transform:scale(0.97); }
      `}</style>

      {/* ── TikTok canvas (9:16 aspect) ── */}
      <div style={{
        position:'relative',
        width:'min(100vw, calc(100dvh * 9/16))',
        height:'min(100dvh, calc(100vw * 16/9))',
        overflow:'hidden',
        background: scene?.bg ?? '#0d0221',
        transition:'background 0.8s ease',
        borderRadius: 0,
      }}>

        {/* ── Flash overlay ── */}
        {flash && (
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none',
            background: scene?.flash ?? '#ffffff22',
            animation:'an-flash 0.35s ease forwards',
            zIndex:20,
          }} />
        )}

        {/* ── Confetti particles ── */}
        {particles.map(p => (
          <div key={p.id} style={{
            position:'absolute', top:'-24px', left:`${p.x}%`,
            width: p.shape==='rect' ? p.size*1.7 : p.size,
            height: p.size,
            borderRadius: p.shape==='circle' ? '50%' : 3,
            background: p.color,
            opacity:0,
            animation:`an-fall ${p.dur}s ${p.delay}s ease-in forwards`,
            zIndex:18, pointerEvents:'none',
          }} />
        ))}

        {/* ── Ambient radial glow ── */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          zIndex:1,
        }} />

        {/* ── Content area ── */}
        <div key={`scene-${scene?.id}`} style={{
          position:'absolute', inset:0, zIndex:10,
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          padding:'80px 28px 120px',
          gap:16,
          animation:'an-fadein 0.5s ease both',
        }}>

          {/* Top tag pill */}
          {scene?.tag && (
            <div style={{
              fontSize:12, fontWeight:800, letterSpacing:'0.07em',
              padding:'6px 18px', borderRadius:100,
              background:`${scene.tagColor ?? '#a78bfa'}22`,
              border:`1.5px solid ${scene.tagColor ?? '#a78bfa'}55`,
              color: scene.tagColor ?? '#a78bfa',
              textTransform:'uppercase',
              animation:'an-slideup 0.5s 0.05s ease both',
            }}>
              {scene.tag}
            </div>
          )}

          {/* Emoji */}
          {scene?.emoji && (
            <div style={{
              fontSize: scene.emojiSize ?? 72,
              animation:'an-pop 0.6s 0.1s cubic-bezier(0.34,1.56,0.64,1) both',
              lineHeight:1,
            }}>
              {scene.emoji}
            </div>
          )}

          {/* Main Korean text */}
          {scene?.ko && (
            <div style={{
              fontSize: scene.koSize ?? 72,
              fontWeight: 900,
              color: '#ffffff',
              textAlign:'center',
              lineHeight: 1.15,
              letterSpacing:'-0.01em',
              animation:'an-slideup 0.55s 0.15s cubic-bezier(0.22,1,0.36,1) both',
              textShadow:'0 2px 40px rgba(0,0,0,0.5)',
            }}>
              {scene.ko}
            </div>
          )}

          {/* Romanization */}
          {scene?.rom && (
            <div style={{
              fontSize:14, fontWeight:500,
              color:'rgba(255,255,255,0.55)',
              letterSpacing:'0.06em',
              textAlign:'center',
              animation:'an-fadein 0.5s 0.3s ease both',
            }}>
              {scene.rom}
            </div>
          )}

          {/* Spanish line */}
          {scene?.es && (
            <div style={{
              fontSize:20, fontWeight:700,
              color:'rgba(255,255,255,0.95)',
              textAlign:'center',
              lineHeight:1.4,
              animation:'an-slideup 0.5s 0.35s ease both',
              maxWidth:320,
            }}>
              {scene.es}
            </div>
          )}

          {/* Rule table (scene 23) */}
          {scene?.rule && (
            <div style={{
              display:'flex', flexDirection:'column', gap:6,
              background:'rgba(255,255,255,0.07)',
              border:'1px solid rgba(255,255,255,0.14)',
              borderRadius:14, padding:'12px 18px', width:'100%', maxWidth:300,
              animation:'an-rulepop 0.5s 0.4s ease both',
            }}>
              {scene.rule.map((r,i) => (
                <div key={i} style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  fontSize:13, gap:8,
                  animation:`an-rulepop 0.4s ${0.45+i*0.1}s ease both`,
                  opacity:0, animationFillMode:'forwards',
                }}>
                  <span style={{ fontWeight:800, color: scene.tagColor ?? '#a78bfa', whiteSpace:'nowrap' }}>{r.label}</span>
                  <span style={{ color:'rgba(255,255,255,0.75)', textAlign:'right', fontFamily:'"Noto Sans KR",sans-serif' }}>{r.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Sub text */}
          {scene?.sub && (
            <div style={{
              fontSize:13, fontWeight:600,
              color: scene.subColor ?? 'rgba(255,255,255,0.6)',
              textAlign:'center',
              lineHeight:1.6,
              animation:'an-fadein 0.5s 0.5s ease both',
              maxWidth:310,
              padding:'10px 14px',
              background:'rgba(0,0,0,0.25)',
              borderRadius:12,
              border:'1px solid rgba(255,255,255,0.08)',
            }}>
              {scene.sub}
            </div>
          )}
        </div>

        {/* ── Top bar ── */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:3,
          background:'rgba(255,255,255,0.12)', zIndex:30,
        }}>
          {/* per-scene bar */}
          <div style={{
            height:'100%',
            width:`${scenePct}%`,
            background:`${scene?.tagColor ?? '#a78bfa'}`,
            transition:'width 0.25s linear',
          }} />
        </div>

        {/* ── Timer top-right ── */}
        <div style={{
          position:'absolute', top:10, right:14, zIndex:30,
          fontSize:11, fontWeight:700, letterSpacing:'0.06em',
          color:'rgba(255,255,255,0.45)',
        }}>
          {fmt(elapsed)} / {fmt(TOTAL_DUR)}
        </div>

        {/* ── Scene counter top-left ── */}
        <div style={{
          position:'absolute', top:10, left:14, zIndex:30,
          fontSize:11, fontWeight:700, letterSpacing:'0.06em',
          color:'rgba(255,255,255,0.35)',
        }}>
          {sceneIdx+1} / {SCENES.length}
        </div>

        {/* ── Bottom bar (total progress) ── */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:3,
          background:'rgba(255,255,255,0.08)', zIndex:30,
        }}>
          <div style={{
            height:'100%',
            width:`${totalPct}%`,
            background:'rgba(255,255,255,0.35)',
            transition:'width 0.25s linear',
          }} />
        </div>

        {/* ── Controls overlay ── */}
        <div style={{
          position:'absolute', bottom:20, left:0, right:0, zIndex:30,
          display:'flex', alignItems:'center', justifyContent:'center', gap:12,
        }}>
          <button className="an-btn" onClick={handleRestart}
            style={{
              width:44, height:44,
              background:'rgba(255,255,255,0.12)',
              color:'#fff', fontSize:18,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
            ↺
          </button>
          <button className="an-btn" onClick={handlePlay}
            style={{
              width:60, height:60, fontSize:22,
              background: playing ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
              color: playing ? '#fff' : '#000',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 4px 24px rgba(0,0,0,0.4)',
            }}>
            {playing ? '⏸' : '▶'}
          </button>
          {/* Scene skip forward */}
          <button className="an-btn" onClick={() => {
            if (sceneIdx < SCENES.length - 1) {
              cancelAnimationFrame(rafRef.current);
              const next = sceneIdx + 1;
              sceneIdxRef.current = next;
              sceneElRef.current  = 0;
              totalElRef.current  = SCENES.slice(0,next).reduce((a,s)=>a+s.dur,0);
              if (playing) {
                lastTRef.current = performance.now();
                rafRef.current = requestAnimationFrame(tick);
              }
              setFlash(true); setTimeout(()=>setFlash(false),350);
              if (SCENES[next].particles) setParticles(makeParticles()); else setParticles([]);
              syncState();
            }
          }} style={{
            width:44, height:44,
            background:'rgba(255,255,255,0.12)',
            color:'#fff', fontSize:18,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            ⏭
          </button>
        </div>

        {/* ── Countdown overlay ── */}
        {countdown !== null && (
          <div style={{
            position:'absolute', inset:0, zIndex:50,
            display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(0,0,0,0.7)',
          }}>
            <div key={countdown} style={{
              fontSize:120, fontWeight:900, color:'#fff',
              animation:'an-cd 0.9s ease both',
              lineHeight:1,
            }}>
              {countdown}
            </div>
          </div>
        )}

        {/* ── End screen ── */}
        {!playing && elapsed >= TOTAL_DUR - 0.5 && (
          <div style={{
            position:'absolute', inset:0, zIndex:40,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            background:'rgba(0,0,0,0.8)',
            gap:16, padding:28,
            animation:'an-fadein 0.6s ease both',
          }}>
            <div style={{ fontSize:72, animation:'an-pop 0.6s ease both' }}>🎉</div>
            <div style={{ fontSize:28, fontWeight:900, color:'#fff', textAlign:'center' }}>¡Animación completa!</div>
            <div style={{ fontSize:15, color:'rgba(255,255,255,0.6)', textAlign:'center', lineHeight:1.6 }}>
              Comparte este video y sigue aprendiendo<br/>con WeLearn Korean ☕
            </div>
            <button className="an-btn" onClick={handleRestart}
              style={{
                padding:'14px 32px', fontSize:16, fontWeight:800,
                background:'linear-gradient(135deg,#6c63ff,#22c55e)',
                color:'#fff', marginTop:8,
              }}>
              Ver de nuevo ↺
            </button>
          </div>
        )}

        {/* ── Start screen (not yet played) ── */}
        {!playing && elapsed < 0.5 && countdown === null && (
          <div style={{
            position:'absolute', inset:0, zIndex:40,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            background:'rgba(0,0,0,0.65)',
            gap:14, padding:28,
          }}>
            <div style={{ fontSize:64 }}>☕</div>
            <div style={{ fontSize:26, fontWeight:900, color:'#fff', textAlign:'center', lineHeight:1.3 }}>
              Café Coreano<br/>
              <span style={{ fontSize:16, fontWeight:600, color:'rgba(255,255,255,0.6)' }}>Animación ~6 minutos</span>
            </div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', textAlign:'center', lineHeight:1.6 }}>
              27 escenas · 4 patrones · 1 café<br/>
              WeLearn Korean — Step 003
            </div>
            <button className="an-btn" onClick={handlePlay}
              style={{
                padding:'16px 40px', fontSize:18, fontWeight:900,
                background:'linear-gradient(135deg,#6c63ff 0%,#22c55e 100%)',
                color:'#fff', marginTop:8,
                boxShadow:'0 8px 32px rgba(108,99,255,0.4)',
                letterSpacing:'0.03em',
              }}>
              ▶ Comenzar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
