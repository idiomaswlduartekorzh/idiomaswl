'use client';

import { useEffect, useRef, useState } from 'react';
import { KR_PODCAST_003, playAudio } from '@/lib/storage';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ConceptCard {
  from: number;
  to: number;
  kr: string;
  es: string;
}

interface Question {
  id: string;
  q: string;
  options: string[];
  correct: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CONCEPT_CARDS: ConceptCard[] = [
  { from: 0,   to: 51,  kr: '어서 오세요',              es: 'Bienvenido/a — saludo de entrada formal' },
  { from: 52,  to: 63,  kr: '어서 오세요',              es: 'Bienvenido/a — escúchala aquí' },
  { from: 64,  to: 74,  kr: '안녕하세요',               es: 'Hola — saludo formal universal' },
  { from: 75,  to: 103, kr: '7 niveles de formalidad', es: 'Formal · Educado informal (-요) · Casual' },
  { from: 104, to: 111, kr: '아메리카노 한 잔 주세요',   es: 'Un americano, por favor' },
  { from: 112, to: 124, kr: '주세요',                   es: 'La palabra mágica para pedir cualquier cosa' },
  { from: 125, to: 134, kr: '네, 금방 준비해 드릴게요', es: 'Sí, lo preparo enseguida' },
  { from: 135, to: 142, kr: '사이즈 뭐로 드릴까요',     es: '¿Qué tamaño le pongo?' },
  { from: 143, to: 156, kr: '스몰 · 미디엄 · 라지',     es: 'Pequeño · Mediano · Grande' },
  { from: 157, to: 167, kr: '글자가 조금 작아요',       es: 'Las letras son un poco pequeñas' },
  { from: 168, to: 183, kr: '이름이 뭐예요',            es: '¿Cómo te llamas?' },
  { from: 184, to: 189, kr: '여기 있습니다',            es: 'Aquí tienes — entrega formal' },
  { from: 190, to: 245, kr: '감사합니다',               es: 'Gracias — siempre con reverencia' },
  { from: 246, to: 254, kr: '여기요',                   es: 'Llama al mesero — ¡oiga!' },
  { from: 255, to: 261, kr: '이거 얼마예요',            es: '¿Cuánto cuesta esto?' },
  { from: 262, to: 282, kr: '화장실이 어디예요',        es: '¿Dónde está el baño?' },
  { from: 283, to: 324, kr: '저는 외국인이에요',        es: 'Soy extranjero/a — frase salvavidas' },
  { from: 325, to: 999, kr: '레이더',                   es: 'Cada sílaba coreana lleva información social' },
];

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: '¿Cuántos niveles de formalidad tiene el coreano?',
    options: ['3', '5', '7', '10'],
    correct: '7',
  },
  {
    id: 'Q2',
    q: '¿Qué significa 주세요?',
    options: ['gracias', 'hola', 'por favor / deme', '¿cómo?'],
    correct: 'por favor / deme',
  },
  {
    id: 'Q3',
    q: '¿Cómo se llama la barista en el podcast?',
    options: ['Mia', 'Haeun', 'Sora', 'Jiyeon'],
    correct: 'Haeun',
  },
];

function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function getActiveCardIndex(t: number): number {
  for (let i = CONCEPT_CARDS.length - 1; i >= 0; i--) {
    if (t >= CONCEPT_CARDS[i].from) return i;
  }
  return -1;
}

interface Props {
  onComplete?: () => void;
}

export default function Activation003({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'listening' | 'questions' | 'complete'>('intro');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeIdx = getActiveCardIndex(currentTime);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Enable skip after 60s
  useEffect(() => {
    if (phase !== 'listening') return;
    const timer = setTimeout(() => setCanSkip(true), 60000);
    return () => clearTimeout(timer);
  }, [phase]);

  // Auto-scroll to active card
  useEffect(() => {
    if (activeIdx >= 0 && cardRefs.current[activeIdx] && timelineRef.current) {
      cardRefs.current[activeIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeIdx]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }

  function handleSelectAnswer(qId: string, opt: string) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  }

  function handleCheckAnswers() {
    const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);
    if (!allAnswered || checked) return;
    const s = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    setScore(s);
    setChecked(true);
  }

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
          ETAPA 01 DE 11 · Activacion
        </p>
        <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>
          Cortesía — Tu primer día en Corea
        </h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 }}>
          En Corea, la cortesía no es opcional — está integrada en cada frase. Antes de pedir un café, ya sabes si la persona frente a ti merece un saludo formal o casual. Este podcast te lleva a una cafetería en Seúl para que actives ese radar social desde la primera sílaba.
        </p>

        <div style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6c63ff' }}>
            Lo que vas a escuchar
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>Los 11 frases clave del día en contexto real</li>
            <li style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>Por qué el coreano tiene 7 niveles de formalidad</li>
            <li style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>Frases de supervivencia extra para el café</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setPhase('listening')}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Escuchar →
        </button>
      </section>
    );
  }

  // ── Listening ──────────────────────────────────────────────────────────────
  if (phase === 'listening') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Audio element */}
        <audio
          ref={audioRef}
          src={KR_PODCAST_003}
          onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
          onDurationChange={e => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => { setIsPlaying(false); setPhase('questions'); }}
        />

        {/* Player card */}
        <div style={{ background: '#f8f8fc', border: '1px solid #e8e8f5', borderRadius: 14, padding: '1.25rem', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#6c63ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              PODCAST · CORTESIA
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{ height: 6, background: '#e8e8f5', borderRadius: 3, marginBottom: 14, cursor: 'pointer', position: 'relative' }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              if (audioRef.current && duration > 0) {
                audioRef.current.currentTime = ratio * duration;
              }
            }}
          >
            <div style={{ height: '100%', width: `${progress}%`, background: '#6c63ff', borderRadius: 3, transition: 'width 0.5s linear' }} />
          </div>

          {/* Play/pause */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              onClick={togglePlay}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: '#6c63ff', border: 'none', color: '#fff', cursor: 'pointer', flexShrink: 0, fontSize: 18 }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                Cortesía — Cafetería en Seúl
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                Las tarjetas se sincronizan con el audio
              </p>
            </div>
          </div>
        </div>

        {/* Skip button */}
        {canSkip && (
          <div style={{ marginBottom: 12, textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => setPhase('questions')}
              style={{ fontSize: 12, color: '#6c63ff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Ir a las preguntas →
            </button>
          </div>
        )}

        {/* Timeline cards */}
        <div
          ref={timelineRef}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 420, overflowY: 'auto', paddingRight: 4 }}
        >
          {CONCEPT_CARDS.map((card, i) => {
            const isActive = i === activeIdx;
            const isPast = activeIdx >= 0 && i < activeIdx;
            return (
              <div
                key={`${card.from}-${card.kr}`}
                ref={el => { cardRefs.current[i] = el; }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: `1.5px solid ${isActive ? '#6c63ff' : 'var(--line-soft)'}`,
                  background: isActive ? 'rgba(108,99,255,0.06)' : 'var(--bg)',
                  opacity: isPast ? 0.4 : 1,
                  transition: 'all 0.25s',
                }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: isActive ? '#6c63ff' : 'var(--muted)', minWidth: 32, textAlign: 'right' }}>
                  {fmt(card.from)}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 2px',
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    color: isActive ? '#6c63ff' : 'var(--ink)',
                    lineHeight: 1.2,
                  }}>
                    {card.kr}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: isActive ? 'var(--ink)' : 'var(--muted)', lineHeight: 1.4 }}>
                    {card.es}
                  </p>
                </div>
                {isActive && (
                  <button
                    type="button"
                    onClick={() => playAudio(card.kr)}
                    style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', color: '#6c63ff', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ♪
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // ── Questions ──────────────────────────────────────────────────────────────
  if (phase === 'questions') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6c63ff' }}>
          Comprension global
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          Tres preguntas sobre lo que escuchaste. Confía en tu oído.
        </p>

        {QUESTIONS.map(q => (
          <article
            key={q.id}
            style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: 16, marginBottom: 12 }}
          >
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>
              {q.q}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {q.options.map(opt => {
                const selected = answers[q.id] === opt;
                const isCorrect = opt === q.correct;
                const showCorrect = checked && isCorrect;
                const showWrong = checked && selected && !isCorrect;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectAnswer(q.id, opt)}
                    disabled={checked}
                    style={{
                      padding: '10px 12px',
                      background: showCorrect ? 'rgba(45,155,78,0.08)' : showWrong ? 'rgba(220,53,69,0.06)' : selected ? 'rgba(108,99,255,0.07)' : 'var(--bg)',
                      border: `1.5px solid ${showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : selected ? '#6c63ff' : 'var(--line-soft)'}`,
                      borderRadius: 9,
                      fontSize: 13,
                      textAlign: 'center',
                      cursor: checked ? 'default' : 'pointer',
                      color: showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : selected ? '#6c63ff' : 'var(--ink)',
                      fontWeight: selected ? 600 : 400,
                      transition: 'all 0.12s',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </article>
        ))}

        {allAnswered && !checked && (
          <button
            type="button"
            onClick={handleCheckAnswers}
            style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 4 }}
          >
            Verificar respuestas
          </button>
        )}

        {checked && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: score === 3 ? 'rgba(45,155,78,0.07)' : 'rgba(108,99,255,0.06)', border: `1px solid ${score === 3 ? 'rgba(45,155,78,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius: 12, padding: '16px', marginBottom: 16, textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, color: score === 3 ? '#2d9b4e' : '#6c63ff' }}>{score}/3</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                {score === 3 ? 'Perfecto. Lo escuchaste todo.' : score >= 2 ? 'Muy bien. Casi todo.' : 'Normal para la primera vez.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setPhase('complete'); onComplete?.(); }}
              style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Continuar →
            </button>
          </div>
        )}
      </section>
    );
  }

  // ── Complete ───────────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>&#x2665;</div>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
        Activacion completada
      </h3>
      <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
        Ya tienes el radar social activo. Ahora vamos a las palabras clave del café.
      </p>
      <button
        type="button"
        onClick={onComplete}
        style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
      >
        Siguiente etapa →
      </button>
    </section>
  );
}
