'use client';

import { useEffect, useRef, useState } from 'react';
import { KR_PODCAST_005, playAudio } from '@/lib/storage';

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
    kr: '뭐해요?',
    title: 'La pregunta que define a las personas en Corea',
    body: 'En Corea la identidad está ligada a la actividad. La segunda pregunta que te harán después de tu nombre no es cómo estás — es qué haces. 뭐해요 carga el peso social de quién eres en términos de acción.',
    color: '#f59e0b',
    examples: [
      { kr: '뭐해요?', es: '¿Qué haces?' },
      { kr: '공부해요', es: 'Estudio' },
    ],
  },
  {
    id: 'T2', at: 28, type: 'vocab',
    kr: '생활',
    rom: 'saeng-hwal',
    title: 'Vida cotidiana — el ritmo que te define',
    body: '생활 no es solo "vida". Es la vida como actividad continua en un lugar específico. Cuando alguien pregunta 한국 생활 어때요, pregunta por el tejido de tu existencia diaria en Corea.',
    color: '#6c63ff',
    audioKey: '한국 생활 어때요?',
    breakdown: [
      { kr: '한국', es: 'Corea' },
      { kr: '생활', es: 'vida cotidiana / rutina' },
      { kr: '어때요?', es: '¿qué tal? (del step004)' },
    ],
  },
  {
    id: 'T3', at: 55, type: 'pattern',
    kr: '에서',
    rom: 'e-seo',
    title: 'Donde la acción vive — partícula 에서',
    body: '에서 marca el lugar donde ocurre una acción. No donde estás ni donde vas — donde haces algo. David estudia EN la universidad, trabaja EN el café. 에서 = la escena donde el verbo sucede.',
    color: '#8b5cf6',
    audioKey: '에서',
    breakdown: [
      { kr: '대학교에서', es: 'en la universidad (acción aquí)' },
      { kr: '카페에서', es: 'en el café (acción aquí)' },
    ],
    examples: [
      { kr: '이 대학교에서 공부해요', es: 'Estudio en esta universidad' },
      { kr: '카페에서 일해요', es: 'Trabajo en el café' },
    ],
  },
  {
    id: 'T4', at: 85, type: 'pattern',
    kr: '하다 동사',
    title: 'Un patrón que desbloquea cientos de verbos',
    body: 'Los verbos con 하다 son los más comunes del coreano. Solo cambia el sustantivo delante y tienes un verbo nuevo. 공부 (estudio) + 하다 = 공부해요. 일 (trabajo) + 하다 = 일해요. El sufijo -해요 es el mismo siempre.',
    color: '#10b981',
    audioKey: '공부해요',
    breakdown: [
      { kr: '공부하다', es: 'estudiar' },
      { kr: '일하다', es: 'trabajar' },
      { kr: '좋아하다', es: 'gustar' },
    ],
    examples: [
      { kr: '공부해요', es: 'Estudio / Estudia' },
      { kr: '일해요', es: 'Trabajo / Trabaja' },
      { kr: '뭐해요?', es: '¿Qué haces?' },
    ],
    tip: 'Regla: [sustantivo] + 해요 = verbo de acción. ¿Conoces 공부? Ya sabes decir "estudio".',
  },
  {
    id: 'T5', at: 115, type: 'pattern',
    kr: '에 vs 에서',
    title: 'El contraste que más confunde — y más importa',
    body: '에 marca el destino del movimiento. 에서 marca dónde ocurre la acción. Mismo lugar, distintas partículas según lo que el verbo necesite. 카페에 가요 (voy al café) vs 카페에서 일해요 (trabajo en el café).',
    color: '#3b82f6',
    breakdown: [
      { kr: '에', es: '→ destino / movimiento hacia' },
      { kr: '에서', es: '★ lugar donde ocurre la acción' },
    ],
    examples: [
      { kr: '카페에 가요', es: 'Voy al café (movimiento → destino)' },
      { kr: '카페에서 일해요', es: 'Trabajo en el café (acción ★ lugar)' },
    ],
    tip: 'Truco: si el verbo es 가다/오다 (ir/venir) → usa 에. Si el verbo es cualquier otra acción → usa 에서.',
  },
  {
    id: 'T6', at: 145, type: 'vocab',
    kr: '좋아요 vs 좋아해요',
    title: 'La trampa clásica para hispanohablantes',
    body: '좋아요 viene de 좋다 (ser bueno/agradable) — es un adjetivo. 좋아해요 viene de 좋아하다 (gustar) — es un verbo de acción. Parecen iguales, suenan parecido, pero funcionan distinto. David dice 한국 좋아해요 — no 한국 좋아요.',
    color: '#ec4899',
    audioKey: '좋아해요',
    breakdown: [
      { kr: '좋아요', es: 'está bien / qué bueno (adjetivo)' },
      { kr: '좋아해요', es: 'me gusta / le gusta (verbo)' },
    ],
    examples: [
      { kr: '한국 좋아해요', es: 'Me gusta Corea (verbo de preferencia)' },
      { kr: '좋아요!', es: '¡Qué bien! / ¡De acuerdo! (evaluación)' },
    ],
    tip: 'Clave: si quieres decir que algo te GUSTA → 좋아해요. Si quieres decir que algo ESTÁ BIEN → 좋아요.',
  },
];

/* ─── Comprehension questions ─────────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: '¿Qué partícula marca el lugar donde ocurre una acción?',
    options: ['에', '에서', '는', '도'],
    correct: '에서',
  },
  {
    id: 'Q2',
    q: '¿Cómo se dice "Me gusta Corea" en coreano?',
    options: ['한국 좋아요', '한국 좋아해요', '한국 있어요', '한국 어때요?'],
    correct: '한국 좋아해요',
  },
  {
    id: 'Q3',
    q: '카페에 가요 significa:',
    options: ['Trabajo en el café', 'Voy al café', 'Hay café', 'El café está bien'],
    correct: 'Voy al café',
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
  { label: 'Intro — rutina universitaria', at: 0 },
  { label: '생활 — la vida cotidiana', at: 28 },
  { label: 'en+에서 — dónde pasa la acción', at: 55 },
  { label: '하다 verbs — el patrón clave', at: 85 },
  { label: '에 vs 에서 — el contraste', at: 115 },
  { label: '좋아요 vs 좋아해요', at: 145 },
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
      animation: isLatest ? 'act5-cardIn 0.45s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
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
        <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 9, color: 'var(--muted-foreground)' }}>
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
export default function Activation005({ onComplete }: Props) {
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
          Rutina universitaria — La vida de David en Corea
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.75 }}>
          David lleva tiempo en Corea. Minsu le pregunta cómo le va. Hablan de estudios, trabajo y vida cotidiana. Escucha el podcast y observa los patrones en contexto real.
        </p>
        <div style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6c63ff' }}>Cómo funciona</p>
          <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Escucha el podcast — inmersión en la rutina universitaria',
              'Las tarjetas aparecen solas a medida que avanza el audio',
              'Cada tarjeta desglosa vocabulario, gramática y tips',
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
        <audio ref={audioRef} src={KR_PODCAST_005}
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
          @keyframes act5-cardIn { from{opacity:0;transform:translateY(18px) scale(0.97)} to{opacity:1;transform:none} }
          @keyframes act5-eq0 { from{height:6px} to{height:14px} }
          @keyframes act5-eq1 { from{height:4px} to{height:11px} }
          @keyframes act5-eq2 { from{height:8px} to{height:15px} }
          @keyframes act5-eq3 { from{height:3px} to{height:10px} }
          @keyframes act5-eq4 { from{height:6px} to{height:13px} }
        `}</style>

        <audio ref={audioRef} src={KR_PODCAST_005}
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
                    animation: isPlaying ? `act5-eq${i} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
                    transition: 'height 0.15s',
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#6c63ff', fontWeight: 700, letterSpacing: '0.12em' }}>
                PODCAST · STEP 005
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
                {score === 3 ? 'Perfecto. Las partículas ya tienen sentido.' : score >= 2 ? 'Muy bien. Casi todo absorbido.' : 'Normal. El siguiente paso refuerza todo.'}
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
        Ya activaste el vocabulario de la rutina universitaria. Ahora vamos al modo de adquisición guiada.
      </p>
      <button type="button" onClick={onComplete} style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        Siguiente etapa →
      </button>
    </section>
  );
}
