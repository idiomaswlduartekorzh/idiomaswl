'use client';

import { useEffect, useRef, useState } from 'react';
import { KR_PODCAST_006, playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

interface Breakdown { kr: string; es: string }
interface Example   { kr: string; es: string; lit?: string }

interface TimelineItem {
  id: string; at: number;
  type: 'vocab' | 'pattern' | 'culture' | 'survival';
  kr: string; rom?: string; title: string; body: string; color: string;
  audioKey?: string;
  breakdown?: Breakdown[];
  examples?: Example[];
  tip?: string;
  recycled?: string;
}
interface Question { id: string; q: string; options: string[]; correct: string }

/* ─── Card type config ───────────────────────────────────────────────────── */
const TYPE_CONFIG = {
  vocab:    { label: 'VOCABULARIO',    icon: '🔤', accent: '#6c63ff' },
  pattern:  { label: 'GRAMÁTICA',      icon: '🧩', accent: '#8b5cf6' },
  culture:  { label: 'CULTURA',        icon: '🇰🇷', accent: '#f59e0b' },
  survival: { label: 'SUPERVIVENCIA',  icon: '🆘', accent: '#22c55e' },
} as const;

/* ─── Timeline ────────────────────────────────────────────────────────────── */
const TIMELINE: TimelineItem[] = [
  {
    id: 'T1', at: 8, type: 'culture',
    kr: '대학교 캠퍼스',
    title: 'El campus coreano — primer día',
    body: 'En Corea, el primer día en un lugar nuevo es un momento social cargado. La gente te observa, te ubica. La primera pregunta que te harán no es "¿cómo te llamas?" — es "¿eres nuevo/a aquí?". Minsu hace exactamente eso con David.',
    color: '#f59e0b',
    examples: [
      { kr: '새로 왔어요?', es: '¿Eres nuevo/a aquí?', lit: '새로 = recién, 왔어요 = llegaste' },
      { kr: '네, 새로 왔어요', es: 'Sí, soy nuevo/a aquí' },
    ],
    tip: 'Esta pregunta abre el radar social coreano. La respuesta correcta determina el tono de toda la conversación.',
  },
  {
    id: 'T2', at: 35, type: 'vocab',
    kr: '새로 왔어요?',
    rom: 'sae-ro wa-sseo-yo',
    title: '¿Eres nuevo/a aquí? — la pregunta de apertura',
    body: 'Primera frase de la historia. Minsu la usa para romper el hielo con David. 새로 (recién/nuevo) + 왔어요 (llegaste, pasado de 오다). Simple, directa, y abre la puerta a presentaciones.',
    color: '#6c63ff',
    audioKey: '새로 왔어요?',
    breakdown: [
      { kr: '새로', es: 'recién / nuevo' },
      { kr: '왔어요', es: 'llegaste (pasado de 오다 = venir)' },
    ],
    examples: [
      { kr: '네, 새로 왔어요', es: 'Sí, soy nuevo/a aquí' },
      { kr: '아니에요, 작년에 왔어요', es: 'No, llegué el año pasado' },
    ],
    tip: 'Respuesta automática: 네, 새로 왔어요 + sonrisa. Funciona en cualquier situación social coreana.',
  },
  {
    id: 'T3', at: 60, type: 'vocab',
    kr: '사람이에요',
    rom: 'sa-ram-i-e-yo',
    title: 'Soy de... — la fórmula de nacionalidad',
    body: 'David dice "콜롬비아 사람이에요" — textualmente "soy persona de Colombia". 사람 = persona, 이에요 = es/soy. Esta fórmula es universal: pega cualquier país delante y tienes tu presentación lista.',
    color: '#10b981',
    audioKey: '콜롬비아 사람이에요',
    recycled: 'Step 003 (이에요)',
    breakdown: [
      { kr: '콜롬비아', es: 'Colombia' },
      { kr: '사람', es: 'persona' },
      { kr: '이에요', es: 'soy / es (cópula — del step 003 ✓)' },
    ],
    examples: [
      { kr: '미국 사람이에요', es: 'Soy de Estados Unidos' },
      { kr: '한국 사람이에요', es: 'Soy coreano/a' },
      { kr: '스페인 사람이에요', es: 'Soy español/a' },
    ],
  },
  {
    id: 'T4', at: 85, type: 'pattern',
    kr: '-ㄹ래요?',
    title: 'Invitar a hacer algo — el patrón social más útil',
    body: 'David invita: "커피 마실래요?" — ¿Tomamos café? El sufijo -ㄹ래요 convierte cualquier verbo en una invitación suave entre iguales. No es imperativo — es propuesta. El tono hace toda la diferencia.',
    color: '#8b5cf6',
    audioKey: '커피 마실래요?',
    breakdown: [
      { kr: '커피', es: 'café' },
      { kr: '마시다', es: 'beber' },
      { kr: '마실래요?', es: '¿quieres beber? (invitación)' },
    ],
    examples: [
      { kr: '커피 마실래요?', es: '¿Tomamos un café?' },
      { kr: '같이 갈래요?', es: '¿Vamos juntos?' },
      { kr: '밥 먹을래요?', es: '¿Comemos?' },
    ],
    tip: 'Regla de oro: -ㄹ래요 + tono amable = invitación perfecta entre conocidos. Solo con personas de confianza.',
  },
  {
    id: 'T5', at: 110, type: 'pattern',
    kr: '어때요?',
    rom: 'eo-ttae-yo',
    title: '¿Qué tal? — pide opinión sobre cualquier cosa',
    body: 'Minsu pregunta "대학교 어때요?" — ¿Cómo es la universidad? Pega cualquier sustantivo antes de 어때요 y tienes una pregunta de opinión. David responde con una reacción completa: 좋아요 + detalle con 도.',
    color: '#3b82f6',
    audioKey: '대학교 어때요?',
    breakdown: [
      { kr: '대학교', es: 'universidad' },
      { kr: '어때요?', es: '¿qué tal? / ¿cómo es?' },
    ],
    examples: [
      { kr: '대학교 어때요?', es: '¿Cómo es la universidad?' },
      { kr: '날씨 어때요?', es: '¿Qué tal el tiempo?' },
      { kr: '한국 어때요?', es: '¿Qué te parece Corea?' },
    ],
    tip: 'Patrón clave: [cualquier sustantivo] + 어때요 = pregunta de opinión. Funciona siempre.',
  },
  {
    id: 'T6', at: 135, type: 'vocab',
    kr: '도 (también)',
    rom: 'do',
    title: 'La partícula que suma — 도',
    body: 'David dice "커피도 있어요" — también hay café. La partícula 도 adjunta a un sustantivo añade "también" o "además". Es una de las partículas más frecuentes del coreano cotidiano y marca un discurso natural.',
    color: '#ec4899',
    audioKey: '커피도 있어요',
    recycled: 'Step 002 (있어요)',
    breakdown: [
      { kr: '커피', es: 'café' },
      { kr: '도', es: 'también / además (partícula)' },
      { kr: '있어요', es: 'hay / existe (del step 002 ✓)' },
    ],
    examples: [
      { kr: '커피도 있어요', es: 'También hay café' },
      { kr: '사람들도 많아요', es: 'También hay mucha gente' },
      { kr: '저도 알아요', es: 'Yo también lo sé' },
    ],
    tip: 'Sin 도: 커피 있어요 (hay café). Con 도: 커피도 있어요 (además hay café). Un carácter, gran diferencia.',
  },
];

/* ─── Comprehension questions ─────────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: '¿Cómo pregunta Minsu si David es nuevo en el campus?',
    options: ['커피 마실래요?', '새로 왔어요?', '어때요?', '이름이 뭐예요?'],
    correct: '새로 왔어요?',
  },
  {
    id: 'Q2',
    q: '¿Qué fórmula usa David para invitar a tomar café?',
    options: ['커피 어때요?', '커피 있어요?', '커피 마실래요?', '커피 주세요'],
    correct: '커피 마실래요?',
  },
  {
    id: 'Q3',
    q: '¿Qué partícula añade "también" a un sustantivo?',
    options: ['는', '도', '가', '를'],
    correct: '도',
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}
function hexToRgb(hex: string) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}

/* ─── Segment map ─────────────────────────────────────────────────────────── */
const SEGMENTS = [
  { label: 'Intro — campus', at: 0 },
  { label: '새로 왔어요?', at: 35 },
  { label: 'Presentación', at: 60 },
  { label: 'Invitación — 마실래요', at: 85 },
  { label: 'Opinión — 어때요', at: 110 },
  { label: 'Partícula 도', at: 135 },
];
function activeSegment(t: number) {
  let i = 0;
  for (let j = 0; j < SEGMENTS.length; j++) { if (t >= SEGMENTS[j].at) i = j; else break; }
  return SEGMENTS[i].label;
}

/* ─── TimelineCard sub-component ─────────────────────────────────────────── */
function TimelineCard({ item, isLatest, onAudio }: {
  item: TimelineItem; isLatest: boolean; onAudio: (key: string) => void;
}) {
  const cfg = TYPE_CONFIG[item.type];
  const rgb = hexToRgb(item.color);
  return (
    <div style={{
      borderRadius: 14,
      border: `2px solid ${isLatest ? item.color : 'var(--border)'}`,
      background: isLatest ? `rgba(${rgb},0.06)` : 'var(--card)',
      opacity: isLatest ? 1 : 0.45,
      transition: 'opacity 0.3s, border-color 0.3s',
      animation: isLatest ? 'act4-cardIn 0.45s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
      boxShadow: isLatest ? `0 4px 24px rgba(${rgb},0.14)` : 'none',
      overflow: 'hidden',
    }}>
      {/* Header strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px',
        background: isLatest ? `rgba(${rgb},0.10)` : 'var(--secondary)',
        borderBottom: `1px solid rgba(${rgb},0.15)`,
      }}>
        <span style={{ fontSize: 13 }}>{cfg.icon}</span>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: isLatest ? item.color : 'var(--muted-foreground)' }}>
          {cfg.label}
        </span>
        {item.recycled && isLatest && (
          <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a', borderRadius: 100, padding: '2px 8px' }}>
            ♻ reciclado · {item.recycled}
          </span>
        )}
        <span style={{ marginLeft: (item.recycled && isLatest) ? 0 : 'auto', fontFamily: 'monospace', fontSize: 9, color: 'var(--muted-foreground)' }}>
          {fmt(item.at)}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: isLatest ? '16px 16px 14px' : '12px 16px' }}>
        <p style={{ margin: '0 0 2px', fontSize: isLatest ? 26 : 18, fontWeight: 800, fontFamily: "'Noto Sans KR', sans-serif", color: isLatest ? item.color : 'var(--foreground)', lineHeight: 1.2, transition: 'font-size 0.3s' }}>
          {item.kr}
        </p>
        {item.rom && <p style={{ margin: '0 0 6px', fontFamily: 'monospace', fontSize: 10, color: isLatest ? item.color : 'var(--muted-foreground)', opacity: 0.7 }}>{item.rom}</p>}
        <p style={{ margin: '0 0 8px', fontSize: isLatest ? 14 : 12, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.3 }}>{item.title}</p>

        {isLatest && (
          <>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.7 }}>{item.body}</p>

            {/* Breakdown */}
            {item.breakdown && (
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted-foreground)' }}>Desglose</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {item.breakdown.map((part, i) => (
                    <div key={i} style={{ background: `rgba(${rgb},0.08)`, border: `1px solid rgba(${rgb},0.2)`, borderRadius: 8, padding: '5px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: item.color, fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1 }}>{part.kr}</span>
                      <span style={{ fontSize: 9, color: 'var(--muted-foreground)', textAlign: 'center', lineHeight: 1.3, maxWidth: 100 }}>{part.es}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examples */}
            {item.examples && (
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: '0 0 6px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted-foreground)' }}>Ejemplos</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {item.examples.map((ex, i) => (
                    <div key={i} style={{ background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.15)`, borderRadius: 8, padding: '7px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: item.color, fontFamily: "'Noto Sans KR', sans-serif" }}>{ex.kr}</span>
                      <span style={{ fontSize: 11, color: 'var(--foreground)' }}>{ex.es}{ex.lit && <span style={{ color: 'var(--muted-foreground)', marginLeft: 6, fontSize: 10 }}>{ex.lit}</span>}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tip */}
            {item.tip && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '8px 10px', background: `rgba(${rgb},0.06)`, borderRadius: 8, marginBottom: 10, borderLeft: `3px solid ${item.color}` }}>
                <span style={{ fontSize: 13, flexShrink: 0 }}>💡</span>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--foreground)', lineHeight: 1.6 }}>{item.tip}</p>
              </div>
            )}

            {/* Audio button */}
            {item.audioKey && (
              <button type="button" onClick={() => onAudio(item.audioKey!)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: `rgba(${rgb},0.1)`, border: `1.5px solid rgba(${rgb},0.3)`, borderRadius: 100, color: item.color, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                🔊 Escuchar de nuevo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function Activation006({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'listening' | 'questions' | 'complete'>('intro');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(180);
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [rate,        setRate]        = useState(1);
  const [canSkip,     setCanSkip]     = useState(false);
  const [answers,     setAnswers]     = useState<Record<string, string>>({});
  const [checked,     setChecked]     = useState(false);
  const [score,       setScore]       = useState(0);
  const [newPulse,    setNewPulse]    = useState(false);

  const audioRef      = useRef<HTMLAudioElement>(null);
  const bottomRef     = useRef<HTMLDivElement>(null);
  const autoPlayedRef = useRef(new Set<string>());
  const pulseTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleItems = TIMELINE.filter(item => currentTime >= item.at);

  // Habilitar saltar después de 60s
  useEffect(() => {
    if (phase !== 'listening') return;
    const t = setTimeout(() => setCanSkip(true), 60_000);
    return () => clearTimeout(t);
  }, [phase]);

  // Auto-play audio de tarjetas
  useEffect(() => {
    if (phase !== 'listening') return;
    const latest = visibleItems[visibleItems.length - 1];
    if (!latest?.audioKey || autoPlayedRef.current.has(latest.id)) return;
    autoPlayedRef.current.add(latest.id);
    setNewPulse(true);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setNewPulse(false), 2000);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
    const t = setTimeout(() => playAudio(latest.audioKey!), 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.length, phase]);

  // Auto-scroll para tarjetas sin audio
  useEffect(() => {
    if (phase !== 'listening') return;
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.length]);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.pause(); else a.play().catch(() => {});
  }
  function setPlaybackRate(r: number) {
    setRate(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  }
  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current && duration > 0) audioRef.current.currentTime = ratio * duration;
  }
  function handleSelectAnswer(qId: string, opt: string) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  }
  function handleCheckAnswers() {
    if (!QUESTIONS.every(q => answers[q.id]) || checked) return;
    const s = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    setScore(s); setChecked(true);
  }

  const allAnswered = QUESTIONS.every(q => answers[q.id]);
  const progress    = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* ── INTRO ─────────────────────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
          ETAPA 01 DE 11 · Activación
        </p>
        <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.2 }}>
          Campus — Primer día en Corea
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.75 }}>
          David llega a la universidad. Minsu lo aborda, hay presentaciones, café y opiniones. Escucha el podcast y observa cómo el coreano funciona en contexto real.
        </p>
        <div style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6c63ff' }}>Cómo funciona</p>
          <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Escucha el podcast — inmersión en la historia de David y Minsu',
              'Las tarjetas aparecen solas a medida que avanza el audio',
              'Cada tarjeta desglose vocabulario, gramática y tips',
              'Al terminar, 3 preguntas rápidas de comprensión',
            ].map(text => (
              <li key={text} style={{ fontSize: 13, color: 'var(--foreground)', lineHeight: 1.5 }}>{text}</li>
            ))}
          </ol>
        </div>
        <button
          type="button"
          onClick={() => { setPhase('listening'); setTimeout(() => { audioRef.current?.play().catch(() => {}); }, 100); }}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Escuchar el podcast →
        </button>
        {/* Hidden audio preload */}
        <audio ref={audioRef} src={KR_PODCAST_006}
          onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
          onDurationChange={e => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); setPhase('questions'); }}
        />
      </section>
    );
  }

  /* ── LISTENING ──────────────────────────────────────────────────────────── */
  if (phase === 'listening') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <style>{`
          @keyframes act4-cardIn { from{opacity:0;transform:translateY(18px) scale(0.97)} to{opacity:1;transform:none} }
          @keyframes act4-eq0 { from{height:6px} to{height:14px} }
          @keyframes act4-eq1 { from{height:4px} to{height:11px} }
          @keyframes act4-eq2 { from{height:8px} to{height:15px} }
          @keyframes act4-eq3 { from{height:3px} to{height:10px} }
          @keyframes act4-eq4 { from{height:6px} to{height:13px} }
        `}</style>

        <audio ref={audioRef} src={KR_PODCAST_006}
          onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
          onDurationChange={e => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); setPhase('questions'); }}
        />

        {/* Premium player */}
        <div style={{
          background: 'linear-gradient(135deg, #0f0c29, #1a1a3e, #24243e)',
          borderRadius: 16, padding: '1.25rem 1.25rem 1rem',
          marginBottom: 20, position: 'sticky', top: 0, zIndex: 10,
          boxShadow: newPulse
            ? '0 8px 40px rgba(108,99,255,0.5), 0 0 0 2px rgba(108,99,255,0.4)'
            : '0 8px 32px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.4s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
                {[1, 0.6, 0.9, 0.4, 0.75].map((h, i) => (
                  <div key={i} style={{
                    width: 3, borderRadius: 2, background: '#6c63ff',
                    height: isPlaying ? `${6 + h * 10}px` : '4px',
                    animation: isPlaying ? `act4-eq${i} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
                    transition: 'height 0.15s',
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#6c63ff', fontWeight: 700, letterSpacing: '0.12em' }}>
                PODCAST · STEP 006
              </span>
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>

          <p style={{ margin: '0 0 8px', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Segmento: </span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{activeSegment(currentTime)}</span>
          </p>

          {/* Timestamps rápidos */}
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
            {SEGMENTS.map(seg => (
              <button key={seg.label} type="button"
                onClick={() => { if (audioRef.current) audioRef.current.currentTime = seg.at; }}
                style={{
                  padding: '2px 8px', borderRadius: 6, cursor: 'pointer',
                  border: '1px solid rgba(108,99,255,0.4)',
                  background: currentTime >= seg.at ? 'rgba(108,99,255,0.25)' : 'transparent',
                  color: currentTime >= seg.at ? '#a78bfa' : 'rgba(255,255,255,0.3)',
                  fontSize: 9, fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                {fmt(seg.at)} {seg.label}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div onClick={handleProgressClick} style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 12, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6c63ff, #a78bfa)', borderRadius: 3, transition: 'width 0.5s linear' }} />
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button type="button" onClick={togglePlay} style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(108,99,255,0.4)',
            }}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0.75, 1, 1.25, 1.5].map(r => (
                <button key={r} type="button" onClick={() => setPlaybackRate(r)} style={{
                  padding: '3px 8px', borderRadius: 6,
                  border: `1px solid ${rate === r ? '#6c63ff' : 'rgba(255,255,255,0.1)'}`,
                  background: rate === r ? 'rgba(108,99,255,0.3)' : 'transparent',
                  color: rate === r ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                  fontSize: 10, fontWeight: rate === r ? 700 : 400, cursor: 'pointer',
                }}>
                  {r}×
                </button>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
              {visibleItems.length}/{TIMELINE.length} tarjetas
            </span>
            {canSkip && (
              <button type="button" onClick={() => setPhase('questions')} style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                Saltar →
              </button>
            )}
          </div>
        </div>

        {/* Card feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-foreground)' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🎧</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>Reproduce el audio — las tarjetas aparecen y suenan solas</p>
            </div>
          )}
          {visibleItems.map((item, i) => (
            <TimelineCard key={item.id} item={item} isLatest={i === visibleItems.length - 1} onAudio={playAudio} />
          ))}
          <div ref={bottomRef} style={{ height: 1 }} />
        </div>
      </section>
    );
  }

  /* ── QUESTIONS ──────────────────────────────────────────────────────────── */
  if (phase === 'questions') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6c63ff' }}>
          Comprensión global
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          Tres preguntas rápidas. Confía en lo que escuchaste.
        </p>
        {QUESTIONS.map(q => (
          <article key={q.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.5 }}>{q.q}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {q.options.map(opt => {
                const sel = answers[q.id] === opt;
                const showOk  = checked && opt === q.correct;
                const showErr = checked && sel && opt !== q.correct;
                return (
                  <button key={opt} type="button" onClick={() => handleSelectAnswer(q.id, opt)} disabled={checked} style={{
                    padding: '10px 12px',
                    background: showOk ? 'rgba(34,197,94,0.08)' : showErr ? 'rgba(239,68,68,0.06)' : sel ? 'rgba(108,99,255,0.07)' : 'var(--secondary)',
                    border: `1.5px solid ${showOk ? '#22c55e' : showErr ? '#ef4444' : sel ? '#6c63ff' : 'var(--border)'}`,
                    borderRadius: 9, fontSize: 13, fontFamily: '"Noto Sans KR",sans-serif', textAlign: 'center',
                    cursor: checked ? 'default' : 'pointer',
                    color: showOk ? '#16a34a' : showErr ? '#dc2626' : sel ? '#6c63ff' : 'var(--foreground)',
                    fontWeight: sel ? 600 : 400, transition: 'all 0.12s',
                  }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
        {allAnswered && !checked && (
          <button type="button" onClick={handleCheckAnswers} style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 4 }}>
            Verificar respuestas
          </button>
        )}
        {checked && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: score === 3 ? 'rgba(34,197,94,0.07)' : 'rgba(108,99,255,0.06)', border: `1px solid ${score === 3 ? 'rgba(34,197,94,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius: 12, padding: '16px', marginBottom: 16, textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, color: score === 3 ? '#22c55e' : '#6c63ff' }}>{score}/3</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted-foreground)' }}>
                {score === 3 ? 'Perfecto. Tu oído coreano ya está activo.' : score >= 2 ? 'Muy bien. Casi todo absorbido.' : 'Normal. El siguiente paso refuerza todo.'}
              </p>
            </div>
            <button type="button" onClick={() => { setPhase('complete'); onComplete?.(); }} style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Continuar →
            </button>
          </div>
        )}
      </section>
    );
  }

  /* ── COMPLETE ───────────────────────────────────────────────────────────── */
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(108,99,255,0.1)', border: '2px solid #6c63ff', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>✓</div>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--foreground)' }}>Activación completada</h3>
      <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.75 }}>
        Ya activaste el vocabulario del campus. Ahora vamos al modo de adquisición guiada.
      </p>
      <button type="button" onClick={onComplete} style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        Siguiente etapa →
      </button>
    </section>
  );
}
