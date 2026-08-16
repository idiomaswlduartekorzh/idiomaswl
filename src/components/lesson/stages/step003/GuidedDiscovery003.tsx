'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface SentenceCard {
  hangul: string;
  rom: string;
  es: string;
  highlight: string;
  highlightLabel: string;
  endSound: 'vowel' | 'consonant' | 'formal';
  audio?: string;
  memoryHook: string;  // simple 1-line memory anchor
  context: string;
}

interface QuizItem {
  prompt: string;
  hint: string;
  ko?: string;
  options: string[];
  correct: string;
  explanation: string;
  celebration: string;  // message shown on correct
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SENTENCES: SentenceCard[] = [
  {
    hangul: '저는 하은이에요',
    rom: 'jeo-neun ha-eu-ni-e-yo',
    es: 'Me llamo Haeun',
    highlight: '이에요',
    highlightLabel: 'consonante → 이에요',
    endSound: 'consonant',
    audio: '저는 하은이에요',
    context: '하은 termina en ㄴ (consonante). El sufijo necesita la vocal puente 이 para que suene bien: 이에요.',
    memoryHook: '¿Termina en consonante? Necesita puente → 이에요',
  },
  {
    hangul: '이것은 아메리카노예요',
    rom: 'i-geo-seun a-me-ri-ka-no-ye-yo',
    es: 'Esto es un americano',
    highlight: '예요',
    highlightLabel: 'vocal → 예요',
    endSound: 'vowel',
    context: '아메리카노 termina en 노 (vocal ㅗ). La vocal ya está — no hace falta puente. Solo 예요.',
    memoryHook: '¿Termina en vocal? Se conecta solo → 예요',
  },
  {
    hangul: '저는 학생입니다',
    rom: 'jeo-neun hak-saeng-im-ni-da',
    es: 'Soy estudiante',
    highlight: '입니다',
    highlightLabel: 'formal = 입니다',
    endSound: 'formal',
    context: 'Contexto formal (entrevista, discurso). 입니다 no depende de vocal o consonante — siempre igual.',
    memoryHook: '¿Contexto formal? Siempre 입니다 — sin excepción',
  },
  {
    hangul: '저는 외국인이에요',
    rom: 'jeo-neun oe-gug-in-i-e-yo',
    es: 'Soy extranjero/a',
    highlight: '이에요',
    highlightLabel: 'consonante → 이에요',
    endSound: 'consonant',
    audio: '저는 외국인이에요',
    context: '외국인 termina en ㄴ (consonante) → 이에요. Frase real: úsala en Corea para pedir ayuda.',
    memoryHook: 'Frase de supervivencia: 저는 외국인이에요 ✓',
  },
];

const QUIZ: QuizItem[] = [
  {
    prompt: 'Acabas de ver 4 frases. ¿Cuándo aparece 이에요?',
    hint: '💡 Fíjate en la última letra de la palabra antes del sufijo',
    options: ['Cuando la palabra termina en consonante','Cuando la palabra termina en vocal','En contextos formales siempre','Solo con nombres propios'],
    correct: 'Cuando la palabra termina en consonante',
    explanation: 'Correcto. 이에요 lleva la vocal puente 이 porque la consonante final no puede unirse directamente al sufijo. Ej: 하은(ㄴ) + 이에요, 학생(ㅇ) + 이에요.',
    celebration: '¡Exacto! Acabas de descubrir la regla que usan millones de coreanos cada día.',
  },
  {
    prompt: 'Ahora aplica: 아메리카노___ (termina en vocal)',
    hint: '💡 Vocal final = se conecta directamente, sin puente',
    ko: '아메리카노___',
    options: ['예요 ✓','이에요','입니다','있어요'],
    correct: '예요 ✓',
    explanation: '아메리카노 termina en 노 (vocal ㅗ) → 예요. Sin 이 intermedio. Pruébalo: "아메리카노이에요" suena extraño; "아메리카노예요" fluye.',
    celebration: '¡Bien! Tu oído ya lo detecta — eso es más valioso que memorizar la regla.',
  },
  {
    prompt: '¿Cuándo usas 입니다 en lugar de 이에요/예요?',
    hint: '💡 Piensa en el contexto, no en la palabra',
    options: ['Entrevistas, discursos, documentos formales','Con cualquier consonante final','Con palabras largas','Con extranjeros siempre'],
    correct: 'Entrevistas, discursos, documentos formales',
    explanation: '입니다 es nivel 합쇼체 (máxima formalidad). No depende de vocal/consonante — siempre igual. Úsalo para causar la mejor impresión en situaciones importantes.',
    celebration: '¡Perfecto! Ya dominas los 3 contextos: consonante → 이에요 · vocal → 예요 · formal → 입니다.',
  },
  {
    prompt: 'Última integración: 카페 termina en vocal (페). Dices "esto es un café" de forma educada.',
    hint: '💡 Educado = 해요체. Vocal final = ¿cuál sufijo?',
    ko: '이것은 카페___.',
    options: ['이것은 카페예요 ✓','이것은 카페이에요','이것은 카페입니다 (sería formal)','이것은 카페있어요'],
    correct: '이것은 카페예요 ✓',
    explanation: '카페 → vocal ㅔ → 예요. 입니다 también sería correcto gramaticalmente, pero en una conversación normal 해요체 (예요) es lo más natural. ¡Ya puedes presentar cualquier cosa en coreano!',
    celebration: '🎯 ¡Completaste el patrón completo de 이다! Esto funciona con CUALQUIER sustantivo del coreano.',
  },
];

const COLOR = {
  consonant: '#6c63ff',
  vowel:     '#22c55e',
  formal:    '#f59e0b',
} as const;

const LABEL: Record<SentenceCard['endSound'], string> = {
  consonant: 'Consonante final',
  vowel:     'Vocal final',
  formal:    'Nivel formal',
};

/* ─── Component ──────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function GuidedDiscovery003({ onComplete }: Props) {
  const [phase,       setPhase]       = useState<'intro' | 'discover' | 'quiz'>('intro');
  const [cardIdx,     setCardIdx]     = useState(0);
  const [revealed,    setRevealed]    = useState(false);
  const [quizIdx,     setQuizIdx]     = useState(0);
  const [picked,      setPicked]      = useState<string | null>(null);
  const [streak,      setStreak]      = useState(0);
  const [bestStreak,  setBestStreak]  = useState(0);
  const [score,       setScore]       = useState(0);
  const [showBurst,   setShowBurst]   = useState(false);
  const [done,        setDone]        = useState(false);

  const card   = SENTENCES[cardIdx];
  const quiz   = QUIZ[quizIdx];
  const isLast = cardIdx === SENTENCES.length - 1;
  const color  = COLOR[card?.endSound ?? 'consonant'];

  function splitHangul(full: string, hl: string): [string, string, string] {
    const idx = full.lastIndexOf(hl);
    if (idx === -1) return [full, '', ''];
    return [full.slice(0, idx), hl, full.slice(idx + hl.length)];
  }

  function nextCard() {
    setRevealed(false);
    if (isLast) setPhase('quiz');
    else setCardIdx(i => i + 1);
  }

  function pickAnswer(opt: string) {
    if (picked) return;
    setPicked(opt);
    const correct = opt === quiz.correct;
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(b => Math.max(b, newStreak));
      setScore(s => s + 1);
      if (newStreak >= 2) { setShowBurst(true); setTimeout(() => setShowBurst(false), 2000); }
    } else {
      setStreak(0);
    }
  }

  function nextQuiz() {
    setPicked(null);
    if (quizIdx === QUIZ.length - 1) { setDone(true); onComplete?.(); }
    else setQuizIdx(i => i + 1);
  }

  const isCorrect = picked === quiz?.correct;
  const [before, hl, after] = card ? splitHangul(card.hangul, card.highlight) : ['', '', ''];

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  /* ── INTRO ────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <div style={{ ...base, padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <style>{`
          @keyframes gd-pop  { from{opacity:0;transform:scale(0.88) translateY(18px)} to{opacity:1;transform:none} }
          @keyframes gd-in   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
          @keyframes gd-burst{ 0%{opacity:1;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} 100%{opacity:0;transform:scale(0.8)} }
          .gd-btn:hover { filter:brightness(1.07); transform:translateY(-1px); transition: all 0.18s ease; }
        `}</style>

        <div style={{ textAlign: 'center', animation: 'gd-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <p style={{ fontSize: 52, margin: '0 0 12px' }}>🔍</p>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: 'var(--foreground)' }}>
            Descubre el patrón
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.65, maxWidth: 320, marginInline: 'auto' }}>
            En el café escuchaste <strong style={{ color: 'var(--wl-on-panel-link, #6c63ff)', fontFamily: '"Noto Sans KR",sans-serif' }}>이에요</strong> y <strong style={{ color: '#22c55e', fontFamily: '"Noto Sans KR",sans-serif' }}>예요</strong> varias veces. Hay una sola regla detrás de cuándo se usa cada uno — y la vas a descubrir tú mismo.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'gd-in 0.4s 0.15s ease both' }}>
          {[
            ['🃏', '4 frases del café — observa el sufijo que brilla'],
            ['💡', 'Toca para revelar la regla detrás de cada frase'],
            ['✍️', '4 preguntas para confirmar que lo tienes'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: 'var(--secondary)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.5 }}>{text}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)', animation: 'gd-in 0.4s 0.25s ease both' }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.6 }}>
            💜 <strong>No hay nada que memorizar todavía.</strong> Solo observa y deja que el patrón aparezca solo.
          </p>
        </div>

        <button type="button" className="gd-btn" onClick={() => setPhase('discover')}
          style={{ padding: '15px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: 'rgba(108,99,255,0.14)', border: '1px solid rgba(108,99,255,0.4)',
            fontSize: 14, fontWeight: 800, color: 'var(--wl-on-panel-link, #6c63ff)', animation: 'gd-in 0.4s 0.3s ease both' }}>
          Empezar a descubrir →
        </button>
      </div>
    );
  }

  /* ── DISCOVER ─────────────────────────────────────────── */
  if (phase === 'discover') {
    return (
      <div style={{ ...base, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {SENTENCES.map((_, i) => (
            <div key={i} style={{
              width: i === cardIdx ? 24 : 8, height: 8, borderRadius: 4,
              background: i < cardIdx ? '#22c55e' : i === cardIdx ? color : 'var(--border)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
            Frase {cardIdx + 1} de {SENTENCES.length}
          </p>
          <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
            Observa la parte que brilla. ¿Ves algún patrón con las anteriores?
          </p>
        </div>

        {/* Card */}
        <div key={cardIdx} style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 20, padding: '26px 20px', textAlign: 'center',
          position: 'relative', animation: 'gd-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          <div style={{ position: 'absolute', top: 14, right: 14, padding: '3px 10px', borderRadius: 100,
            fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
            background: `${color}18`, border: `1px solid ${color}40`, color }}>
            {LABEL[card.endSound]}
          </div>

          <p style={{ margin: '0 0 8px', fontSize: 34, fontWeight: 800, lineHeight: 1.2, fontFamily: '"Noto Sans KR","Apple SD Gothic Neo",sans-serif' }}>
            {before}
            <span style={{ color, background: `${color}18`, padding: '0 4px', borderRadius: 6,
              boxShadow: revealed ? `0 0 0 2px ${color}55` : 'none', transition: 'box-shadow 0.3s ease' }}>
              {hl}
            </span>
            {after}
          </p>
          <p style={{ margin: '0 0 3px', fontSize: 12, color: 'var(--muted-foreground)', fontFamily: 'monospace' }}>{card.rom}</p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--foreground)' }}>{card.es}</p>

          {card.audio && (
            <button type="button" onClick={() => playAudio(card.audio!)}
              style={{ marginTop: 14, padding: '7px 18px', borderRadius: 100, cursor: 'pointer',
                background: 'var(--secondary)', border: '1px solid var(--border)',
                fontSize: 12, fontWeight: 600, color: 'var(--foreground)',
                display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              🔊 Escuchar pronunciación
            </button>
          )}
        </div>

        {/* Reveal / revealed */}
        {!revealed ? (
          <button type="button" className="gd-btn" onClick={() => setRevealed(true)}
            style={{ padding: '13px', borderRadius: 14, width: '100%', cursor: 'pointer',
              background: `${color}15`, border: `1px solid ${color}45`,
              fontSize: 13.5, fontWeight: 700, color }}>
            💡 ¿Por qué <span style={{ fontFamily: '"Noto Sans KR",sans-serif' }}>{card.highlight}</span>? — Revelar
          </button>
        ) : (
          <div style={{ background: `${color}0e`, border: `1px solid ${color}35`, borderRadius: 16, padding: '18px 20px', animation: 'gd-in 0.3s ease both' }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color }}>{card.highlightLabel}</p>
            <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'var(--foreground)', lineHeight: 1.65 }}>{card.context}</p>
            {/* Memory hook */}
            <div style={{ padding: '10px 14px', borderRadius: 10, background: `${color}12`, border: `1px solid ${color}30`, marginBottom: 14 }}>
              <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: 'var(--foreground)' }}>
                🧠 Para recordar: <span style={{ color }}>{card.memoryHook}</span>
              </p>
            </div>
            <button type="button" className="gd-btn" onClick={nextCard}
              style={{ padding: '11px 24px', borderRadius: 12, width: '100%', cursor: 'pointer',
                background: color, border: 'none', fontSize: 13, fontWeight: 800, color: 'white' }}>
              {isLast ? 'Tengo el patrón — practicar →' : 'Vista. Siguiente →'}
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ── QUIZ ──────────────────────────────────────────────── */
  if (!done) {
    return (
      <div style={{ ...base, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Streak burst */}
        {showBurst && (
          <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 999,
            fontSize: 40, animation: 'gd-burst 1.8s ease forwards', pointerEvents: 'none', textAlign: 'center' }}>
            🔥<br /><span style={{ fontSize: 20, fontWeight: 800, color: '#f59e0b' }}>¡Racha!</span>
          </div>
        )}

        {/* Progress + streak */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 5, flex: 1 }}>
            {QUIZ.map((_, i) => (
              <div key={i} style={{ width: i === quizIdx ? 28 : 10, height: 8, borderRadius: 4,
                background: i < quizIdx ? '#22c55e' : i === quizIdx ? '#6c63ff' : 'var(--border)',
                transition: 'all 0.3s ease', flex: i === quizIdx ? '0 0 28px' : '0 0 10px' }} />
            ))}
          </div>
          {streak >= 2 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 100,
              background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', flexShrink: 0 }}>
              <span style={{ fontSize: 12 }}>🔥</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#f59e0b' }}>{streak} seguidas</span>
            </div>
          )}
        </div>

        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)' }}>
            Aplica lo que descubriste · {quizIdx + 1} de {QUIZ.length}
          </p>
        </div>

        <div key={quizIdx} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: '22px 18px', animation: 'gd-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>

          {quiz.ko && (
            <div style={{ padding: '14px', borderRadius: 12, marginBottom: 14, textAlign: 'center',
              background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)' }}>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{quiz.ko}</p>
            </div>
          )}

          <p style={{ margin: '0 0 6px', fontSize: 15.5, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.4 }}>{quiz.prompt}</p>
          {!picked && <p style={{ margin: '0 0 16px', fontSize: 12.5, color: 'var(--muted-foreground)' }}>{quiz.hint}</p>}
          {picked && <div style={{ height: 16 }} />}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {quiz.options.map(opt => {
              const state = !picked ? 'idle' : opt === quiz.correct ? (picked === opt ? 'correct' : 'reveal') : opt === picked ? 'wrong' : 'idle';
              return (
                <button key={opt} type="button" disabled={!!picked} onClick={() => pickAnswer(opt)}
                  style={{
                    textAlign: 'left', padding: '12px 16px', borderRadius: 12,
                    fontSize: 13, fontWeight: 500, lineHeight: 1.5, cursor: picked ? 'default' : 'pointer',
                    background: state === 'correct' ? 'rgba(34,197,94,0.12)' : state === 'wrong' ? 'rgba(239,68,68,0.09)' : state === 'reveal' ? 'rgba(34,197,94,0.06)' : 'var(--secondary)',
                    border: state === 'correct' ? '1px solid rgba(34,197,94,0.5)' : state === 'wrong' ? '1px solid rgba(239,68,68,0.45)' : state === 'reveal' ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--border)',
                    color: state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : 'var(--foreground)',
                    display: 'flex', alignItems: 'flex-start', gap: 10, transition: 'all 0.18s ease',
                  }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800,
                    background: state === 'correct' ? 'rgba(34,197,94,0.25)' : state === 'wrong' ? 'rgba(239,68,68,0.2)' : state === 'reveal' ? 'rgba(34,197,94,0.15)' : 'var(--border)',
                    color: state === 'correct' ? '#16a34a' : state === 'wrong' ? '#dc2626' : state === 'reveal' ? '#15803d' : 'var(--muted-foreground)',
                  }}>{state === 'correct' ? '✓' : state === 'wrong' ? '✕' : state === 'reveal' ? '✓' : ''}</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {picked && (
            <div style={{ marginTop: 14, padding: '14px 16px', borderRadius: 12, animation: 'gd-in 0.3s ease both',
              background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
              border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
              {isCorrect && <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 800, color: '#22c55e' }}>{quiz.celebration}</p>}
              {!isCorrect && <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f59e0b' }}>→ La respuesta correcta es: {quiz.correct}</p>}
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.65 }}>{quiz.explanation}</p>
            </div>
          )}
        </div>

        {picked && (
          <button type="button" className="gd-btn" onClick={nextQuiz}
            style={{ padding: '13px', borderRadius: 14, width: '100%', cursor: 'pointer',
              background: 'rgba(108,99,255,0.14)', border: '1px solid rgba(108,99,255,0.4)',
              fontSize: 13, fontWeight: 800, color: 'var(--wl-on-panel-link, #6c63ff)' }}>
            {quizIdx === QUIZ.length - 1 ? '🎯 ¡Lo tengo! Ver resumen →' : 'Siguiente pregunta →'}
          </button>
        )}
      </div>
    );
  }

  /* ── DONE ─────────────────────────────────────────────── */
  const perfect = score === QUIZ.length;
  return (
    <div style={{ ...base, padding: '28px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <p style={{ fontSize: 52, margin: 0 }}>{perfect ? '🏆' : '🎯'}</p>
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--foreground)' }}>
        {perfect ? '¡Patrón dominado al 100%!' : 'Patrón descubierto'}
      </h3>
      <div style={{ padding: '10px 20px', borderRadius: 100, background: perfect ? 'rgba(34,197,94,0.1)' : 'rgba(108,99,255,0.1)',
        border: `1px solid ${perfect ? 'rgba(34,197,94,0.3)' : 'rgba(108,99,255,0.3)'}` }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: perfect ? '#22c55e' : '#6c63ff' }}>
          {score}/{QUIZ.length} correctas {bestStreak >= 3 ? `· 🔥 Mejor racha: ${bestStreak}` : ''}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--muted-foreground)', maxWidth: 300, lineHeight: 1.65 }}>
        Esta regla aplica con <strong>cualquier</strong> sustantivo del coreano. Ya tienes el superpoder.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 300 }}>
        {[['Consonante →', '이에요', '#6c63ff'], ['Vocal →', '예요', '#22c55e'], ['Formal →', '입니다', '#f59e0b']].map(([label, form, c]) => (
          <div key={form} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderRadius: 12, background: `${c}10`, border: `1px solid ${c}28` }}>
            <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>{label}</span>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: c }}>{form}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
