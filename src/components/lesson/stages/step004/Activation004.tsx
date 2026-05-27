'use client';

import { useEffect, useRef, useState } from 'react';
import { KR_PODCAST_004, playAudio } from '@/lib/storage';

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

const TYPE_CONFIG = {
  vocab:    { label: 'VOCABULARIO',   icon: '🔤', accent: '#6c63ff' },
  pattern:  { label: 'GRAMÁTICA',     icon: '🧩', accent: '#8b5cf6' },
  culture:  { label: 'CULTURA',       icon: '🇰🇷', accent: '#f59e0b' },
  survival: { label: 'SUPERVIVENCIA', icon: '🆘', accent: '#22c55e' },
} as const;

const TIMELINE: TimelineItem[] = [
  {
    id: 'T1', at: 8, type: 'culture',
    kr: '알바생',
    title: 'David detrás del mostrador — 알바 en Corea',
    body: 'El 알바 (trabajo part-time) es parte esencial de la vida joven en Corea. Estudiantes, extranjeros y locales trabajan en cafés, tiendas y restaurantes. David tiene ese rol hoy: no es el cliente — es quien atiende.',
    color: '#f59e0b',
    examples: [
      { kr: '알바해요', es: 'Trabajo part-time' },
      { kr: '카페에서 알바해요', es: 'Trabajo part-time en un café' },
    ],
    tip: 'El 알바생 (trabajador) debe responder en tiempo real, sin preparar la frase. Ese es el desafío de hoy.',
  },
  {
    id: 'T2', at: 30, type: 'vocab',
    kr: '이거',
    rom: 'i-geo',
    title: '이거 — esto (objeto cerca de ti)',
    body: 'El cliente entra, señala algo en la vitrina y pregunta. Usa 이거 porque el objeto está cerca de él. En coreano la distancia importa: 이거 es lo que tienes casi al alcance.',
    color: '#6c63ff',
    audioKey: '이거 뭐예요?',
    breakdown: [
      { kr: '이거', es: 'esto (cerca del hablante)' },
      { kr: '뭐예요?', es: '¿qué es? (뭐 = qué, 예요 = es)' },
    ],
    examples: [
      { kr: '이거 뭐예요?', es: '¿Qué es esto?' },
      { kr: '이거 얼마예요?', es: '¿Cuánto es esto?' },
    ],
    recycled: '이거 얼마예요 viene de step003 ♻️',
  },
  {
    id: 'T3', at: 65, type: 'vocab',
    kr: '그거는 호떡이에요',
    rom: 'geu-geo-neun ho-tteok-i-e-yo',
    title: 'David responde — 그거 (eso, objeto lejos de ti)',
    body: 'David responde con 그거 porque para él el hodduk está más lejos. Mismo objeto, pronombre diferente según la perspectiva de quien habla.',
    color: '#8b5cf6',
    audioKey: '호떡',
    breakdown: [
      { kr: '그거는', es: 'eso (lejos del hablante, -는 = partícula de tema)' },
      { kr: '호떡', es: 'pastelito coreano de plancha' },
      { kr: '이에요', es: 'es (cópula — del step003 ♻️)' },
    ],
    examples: [
      { kr: '그거는 호떡이에요', es: 'Eso es hodduk' },
      { kr: '저거는 뭐예요?', es: '¿Qué es aquello? (muy lejos de ambos)' },
    ],
    tip: '이거 → 그거 → 저거: cerca · lejos · muy lejos',
  },
  {
    id: 'T4', at: 105, type: 'culture',
    kr: '호떡',
    title: '¿Qué es el 호떡?',
    body: 'El 호떡 es un pastelito coreano hecho en una plancha, relleno de azúcar morena, canela, semillas de sésamo y maní. Es comida callejera clásica de invierno. Cuando David lo presenta, el cliente lo quiere de inmediato.',
    color: '#f59e0b',
    examples: [
      { kr: '호떡 맛있어요', es: '¡Qué rico el hodduk!', lit: 'hodduk sabor-hay' },
    ],
  },
  {
    id: 'T5', at: 140, type: 'vocab',
    kr: '맛있어요 / 맛없어요',
    rom: 'ma-si-sseo-yo / ma-deop-sseo-yo',
    title: '맛있어요 — tiene sabor → está delicioso',
    body: 'Coreano analítico: 맛 (sabor) + 있어요 (hay/tiene) = "tiene sabor" = está delicioso. Si le quitas el sabor: 맛없어요 = "no tiene sabor" = está malo.',
    color: '#6c63ff',
    audioKey: '맛있어요',
    breakdown: [
      { kr: '맛', es: 'sabor / gusto' },
      { kr: '있어요', es: 'hay / tiene (del step002 ♻️)' },
      { kr: '없어요', es: 'no hay / no tiene (contraste)' },
    ],
    examples: [
      { kr: '호떡 맛있어요!', es: '¡El hodduk está delicioso!' },
      { kr: '이거 맛없어요', es: 'Esto no está rico' },
    ],
  },
  {
    id: 'T6', at: 175, type: 'pattern',
    kr: '하나 둘 셋 넷 다섯',
    rom: 'ha-na · dul · set · net · da-seot',
    title: 'Números nativos — para contar objetos físicos',
    body: 'En coreano hay dos sistemas de números. El sistema nativo (순우리말) se usa para contar objetos tangibles, personas y edad. ¡No es el mismo que usas para el dinero!',
    color: '#8b5cf6',
    breakdown: [
      { kr: '하나', es: 'uno' },
      { kr: '둘', es: 'dos' },
      { kr: '셋', es: 'tres' },
      { kr: '넷', es: 'cuatro' },
      { kr: '다섯', es: 'cinco' },
    ],
    examples: [
      { kr: '호떡 하나 주세요', es: 'Un hodduk, por favor' },
      { kr: '커피 둘 주세요', es: 'Dos cafés, por favor (informal)' },
    ],
    tip: 'Sino-coreanos (일/이/삼) = dinero, fechas, pisos. Nativos (하나/둘/셋) = objetos físicos.',
  },
  {
    id: 'T7', at: 225, type: 'pattern',
    kr: '한 잔 · 한 개',
    rom: 'han jan · han gae',
    title: 'La contracción + contadores (잔, 개)',
    body: 'Cuando el número nativo va antes de un contador, se contrae: 하나→한, 둘→두, 셋→세, 넷→네. El contador 잔 es para bebidas/tazas; 개 es genérico para objetos.',
    color: '#8b5cf6',
    breakdown: [
      { kr: '하나 → 한', es: 'uno → un (antes de contador)' },
      { kr: '잔 (jan)', es: 'contador para tazas y bebidas' },
      { kr: '개 (gae)', es: 'contador genérico para objetos' },
    ],
    examples: [
      { kr: '커피 한 잔 주세요', es: 'Un café, por favor' },
      { kr: '호떡 한 개 주세요', es: 'Un hodduk, por favor' },
      { kr: '커피 두 잔 주세요', es: 'Dos cafés, por favor' },
    ],
  },
  {
    id: 'T8', at: 280, type: 'pattern',
    kr: '커피도 주세요',
    rom: 'keo-pi-do ju-se-yo',
    title: '-도 — también (se pega a la palabra)',
    body: 'La partícula -도 significa "también" y REEMPLAZA las partículas 은/는, 이/가, 을/를. Se pega directamente a la palabra sin espacio. El cliente ya pidió el hodduk y ahora agrega el café.',
    color: '#22c55e',
    audioKey: '커피',
    breakdown: [
      { kr: '커피도', es: 'café también (-도 reemplaza -를)' },
      { kr: '저도요', es: 'yo también (-도 reemplaza -는)' },
    ],
    examples: [
      { kr: '커피도 주세요', es: 'Un café también, por favor' },
      { kr: '영수증도 주세요', es: 'El recibo también, por favor' },
      { kr: '저도요', es: 'Yo también' },
    ],
    tip: '-도 es una de las partículas más útiles del coreano.',
  },
  {
    id: 'T9', at: 345, type: 'vocab',
    kr: '네, 금방 준비해 드릴게요',
    rom: 'ne, geum-bang jun-bi-hae deu-ril-ge-yo',
    title: 'David cierra — 금방 준비해 드릴게요 ♻️',
    body: 'Esta frase ya la conocen del step003 — Haeun la le dijo a David. Ahora David la usa con su cliente. 금방 = enseguida. 드릴게요 es la forma cortés de "le daré/haré", mostrando respeto al cliente.',
    color: '#f59e0b',
    audioKey: '네, 금방 준비해 드릴게요',
    breakdown: [
      { kr: '금방', es: 'enseguida / pronto' },
      { kr: '준비해', es: 'preparo' },
      { kr: '드릴게요', es: 'le daré (formal, para cliente o mayor)' },
    ],
    examples: [
      { kr: '네, 금방 준비해 드릴게요', es: 'Sí, enseguida lo preparo' },
    ],
    recycled: 'Del step003 ♻️ — antes lo dijo Haeun, hoy lo dice David',
  },
];

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: 'El cliente señala el hodduk y dice 이거 뭐예요?. David responde usando 그거. ¿Por qué usan pronombres diferentes para el mismo objeto?',
    options: [
      'Porque la distancia es relativa al hablante — 이거 (cerca de ti), 그거 (lejos de ti)',
      'Porque 이거 es formal y 그거 es informal',
      'Porque David no conoce el hodduk',
      'No hay diferencia, son sinónimos',
    ],
    correct: 'Porque la distancia es relativa al hablante — 이거 (cerca de ti), 그거 (lejos de ti)',
  },
  {
    id: 'Q2',
    q: '¿Cuándo se usan los números nativos 하나, 둘, 셋 en lugar de 일, 이, 삼?',
    options: [
      'Para contar objetos físicos, personas y edad',
      'Para el dinero y los precios en won',
      'Para las fechas y los horarios',
      'Son exactamente lo mismo, solo suenan diferente',
    ],
    correct: 'Para contar objetos físicos, personas y edad',
  },
  {
    id: 'Q3',
    q: 'El cliente dice 커피도 주세요. ¿Qué función cumple -도 en esta frase?',
    options: [
      'Significa "también" y reemplaza la partícula -를',
      'Significa "por favor" y marca cortesía',
      'Significa "un" y actúa como contador',
      'Es la partícula de destino, como -에',
    ],
    correct: 'Significa "también" y reemplaza la partícula -를',
  },
];

const RECAP_PHRASES = [
  { kr: '이거 뭐예요?',            es: '¿Qué es esto?',               audio: '이거 뭐예요?' },
  { kr: '그거는 호떡이에요',        es: 'Eso es hodduk',               audio: '호떡' },
  { kr: '호떡 하나 주세요',         es: 'Un hodduk, por favor',        audio: '호떡 하나 주세요' },
  { kr: '커피도 주세요',            es: 'Un café también',             audio: '커피' },
  { kr: '금방 준비해 드릴게요',      es: 'Enseguida lo preparo',        audio: '금방' },
];

export default function Activation004({ onComplete }: Props) {
  const audioRef        = useRef<HTMLAudioElement>(null);
  const [playing,  setPlaying]  = useState(false);
  const [elapsed,  setElapsed]  = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [quizIdx,  setQuizIdx]  = useState<number | null>(null);
  const [picked,   setPicked]   = useState<string | null>(null);
  const [correct,  setCorrect]  = useState(0);
  const [phase,    setPhase]    = useState<'podcast' | 'quiz' | 'recap'>('podcast');

  const TOTAL_SEC = 330;
  const [rate, setRate] = useState(1);

  function fmt004(s: number) {
    if (!Number.isFinite(s) || s < 0) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }
  function setPlaybackRate(r: number) {
    setRate(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  }
  function handleProgressClick004(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current) audioRef.current.currentTime = ratio * TOTAL_SEC;
  }

  useEffect(() => {
    const active = [...TIMELINE].reverse().find(t => elapsed >= t.at);
    setActiveId(active?.id ?? null);
  }, [elapsed]);

  const activeItem = TIMELINE.find(t => t.id === activeId);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause(); else a.play().catch(() => {});
  }
  function seek(t: TimelineItem) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = t.at;
    a.play().catch(() => {});
  }

  function handleAnswer(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === QUESTIONS[quizIdx!].correct) setCorrect(c => c + 1);
  }
  function nextQuestion() {
    const next = quizIdx! + 1;
    if (next >= QUESTIONS.length) { setPhase('recap'); }
    else { setQuizIdx(next); setPicked(null); }
  }

  const progress = Math.min(elapsed / TOTAL_SEC, 1);

  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <p style={{ margin: '0 0 4px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        ETAPA 01 DE 11 · Activación
      </p>
      <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>
        El turno de David — 이거 뭐예요?
      </h2>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={KR_PODCAST_004}
        onTimeUpdate={e => setElapsed(Math.floor(e.currentTarget.currentTime))}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setPhase('quiz'); setQuizIdx(0); }}
      />
      <style>{`
        @keyframes eq0 { from { height: 6px; } to { height: 14px; } }
        @keyframes eq1 { from { height: 4px; } to { height: 11px; } }
        @keyframes eq2 { from { height: 8px; } to { height: 15px; } }
        @keyframes eq3 { from { height: 5px; } to { height: 10px; } }
        @keyframes eq4 { from { height: 7px; } to { height: 13px; } }
      `}</style>

      {phase === 'podcast' && (
        <>
          {/* Dark gradient player */}
          <div style={{
            background: 'linear-gradient(135deg, #0f0c29, #1a1a3e, #24243e)',
            borderRadius: 16, padding: '1.25rem 1.25rem 1rem',
            marginBottom: 20, position: 'sticky', top: 0, zIndex: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
                  {[1, 0.6, 0.9, 0.4, 0.75].map((h, i) => (
                    <div key={i} style={{
                      width: 3, borderRadius: 2, background: '#6c63ff',
                      height: playing ? `${6 + h * 10}px` : '4px',
                      animation: playing ? `eq${i} 0.${6 + i}s ease-in-out infinite alternate` : 'none',
                      transition: 'height 0.15s',
                    }} />
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#6c63ff', fontWeight: 700, letterSpacing: '0.12em' }}>
                  PODCAST · STEP 004
                </span>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                {fmt004(elapsed)} / {fmt004(TOTAL_SEC)}
              </span>
            </div>
            {/* Episode label */}
            <p style={{ margin: '0 0 8px', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>Episodio: </span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>El turno de David — 이거 뭐예요?</span>
            </p>
            {/* Progress bar (clickable) */}
            <div
              onClick={handleProgressClick004}
              style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 12, cursor: 'pointer', overflow: 'hidden' }}
            >
              <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg, #6c63ff, #a78bfa)', borderRadius: 3, transition: 'width 0.5s linear' }} />
            </div>
            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
                  border: 'none', color: '#fff', fontSize: 16,
                  cursor: 'pointer', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(108,99,255,0.4)',
                }}
              >
                {playing ? '⏸' : '▶'}
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
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--mono)' }}>
                {TIMELINE.filter(t => elapsed >= t.at).length}/{TIMELINE.length} tarjetas
              </span>
            </div>
          </div>

          {/* Active card */}
          {activeItem && (
            <div style={{ border: `2px solid ${TYPE_CONFIG[activeItem.type].accent}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16, background: 'var(--bg)', animation: 'fadeIn 0.3s ease' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: TYPE_CONFIG[activeItem.type].accent }}>
                  {TYPE_CONFIG[activeItem.type].icon} {TYPE_CONFIG[activeItem.type].label}
                </span>
                {activeItem.recycled && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#2d9b4e', background: 'rgba(45,155,78,0.1)', border: '1px solid rgba(45,155,78,0.3)', borderRadius: 100, padding: '2px 8px' }}>
                    ♻️ RECICLADO
                  </span>
                )}
              </div>
              <p style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif" }}>{activeItem.kr}</p>
              {activeItem.rom && <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{activeItem.rom}</p>}
              <h3 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700 }}>{activeItem.title}</h3>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--ink-2,var(--muted))', lineHeight: 1.5 }}>{activeItem.body}</p>
              {activeItem.breakdown && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {activeItem.breakdown.map(b => (
                    <span key={b.kr} style={{ background: 'var(--bg-2,#f5f5f7)', borderRadius: 8, padding: '4px 10px', fontSize: 12 }}>
                      <strong>{b.kr}</strong> = {b.es}
                    </span>
                  ))}
                </div>
              )}
              {activeItem.examples && (
                <div style={{ borderLeft: `3px solid ${TYPE_CONFIG[activeItem.type].accent}`, paddingLeft: 12, marginBottom: 8 }}>
                  {activeItem.examples.map(e => (
                    <div key={e.kr} style={{ marginBottom: 4 }}>
                      <button onClick={() => playAudio(activeItem.audioKey ?? activeItem.kr)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                        <span style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 600, fontSize: 14 }}>{e.kr}</span>
                        {e.lit && <span style={{ fontSize: 11, color: 'var(--muted)', margin: '0 6px' }}>({e.lit})</span>}
                        <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 6 }}>— {e.es}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {activeItem.tip && <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>💡 {activeItem.tip}</p>}
            </div>
          )}

          {/* Timeline dots */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {TIMELINE.map(t => (
              <button key={t.id} onClick={() => seek(t)} title={t.title}
                style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', cursor: 'pointer', background: elapsed >= t.at ? TYPE_CONFIG[t.type].accent : 'var(--line-soft)', transition: 'background 0.3s' }}
              />
            ))}
          </div>

          <button onClick={() => { setPhase('quiz'); setQuizIdx(0); }}
            style={{ width: '100%', background: 'var(--bg-2,#f5f5f7)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '12px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
            Saltar al cuestionario →
          </button>
        </>
      )}

      {phase === 'quiz' && quizIdx !== null && quizIdx < QUESTIONS.length && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: '20px 24px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--muted)' }}>Pregunta {quizIdx + 1} de {QUESTIONS.length}</p>
          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600 }}>{QUESTIONS[quizIdx].q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {QUESTIONS[quizIdx].options.map(opt => {
              const isCorrect = opt === QUESTIONS[quizIdx].correct;
              const isPicked  = picked === opt;
              const bg = !picked ? 'var(--bg-2,#f5f5f7)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg-2,#f5f5f7)';
              const border = !picked ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
              return (
                <button key={opt} onClick={() => handleAnswer(opt)}
                  style={{ background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 13, cursor: picked ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                  {isPicked && !isCorrect ? '❌ ' : isCorrect && picked ? '✅ ' : ''}{opt}
                </button>
              );
            })}
          </div>
          {picked && (
            <button onClick={nextQuestion}
              style={{ marginTop: 16, width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              {quizIdx + 1 < QUESTIONS.length ? 'Siguiente pregunta →' : 'Ver resumen →'}
            </button>
          )}
        </div>
      )}

      {phase === 'recap' && (
        <div>
          <div style={{ background: 'rgba(45,155,78,0.1)', border: '1px solid rgba(45,155,78,0.3)', borderRadius: 14, padding: '16px 20px', marginBottom: 20, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#2d9b4e' }}>
              {correct}/{QUESTIONS.length} respuestas correctas ✅
            </p>
          </div>
          <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Frases de hoy — tap para escuchar
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {RECAP_PHRASES.map(p => (
              <button key={p.kr} onClick={() => playAudio(p.audio)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-2,#f5f5f7)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '12px 16px', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 600 }}>{p.kr}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{p.es} 🔊</span>
              </button>
            ))}
          </div>
          <button onClick={() => onComplete?.()}
            style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Continuar a Adquisición guiada →
          </button>
        </div>
      )}
    </section>
  );
}
