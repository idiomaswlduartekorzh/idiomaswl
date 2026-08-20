'use client';

import { useState, useEffect, useRef } from 'react';
import { useSound } from '@/components/lesson/engine/useSound';
import StreakBar from '@/components/lesson/engine/StreakBar';

// ── Styles (CSS keyframes injected once) ──────────────────────────────────────

const GLOBAL_STYLES = `
  @keyframes gd-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes gd-slide-left {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes gd-slide-right {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes gd-slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes gd-pop {
    0%   { transform: scale(0.6); opacity: 0; }
    70%  { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1);   opacity: 1; }
  }
  @keyframes gd-shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
  @keyframes gd-correct-flash {
    0%   { background: #d1fae5; }
    100% { background: transparent; }
  }
  .gd-fade-in   { animation: gd-fade-in   0.4s ease both; }
  .gd-slide-l   { animation: gd-slide-left  0.45s cubic-bezier(0.25,1,0.5,1) both; }
  .gd-slide-r   { animation: gd-slide-right 0.45s cubic-bezier(0.25,1,0.5,1) both; }
  .gd-slide-up  { animation: gd-slide-up  0.4s cubic-bezier(0.25,1,0.5,1) both; }
  .gd-pop       { animation: gd-pop       0.45s cubic-bezier(0.34,1.56,0.64,1) both; }
  .gd-shake     { animation: gd-shake     0.4s ease both; }
  .gd-btn {
    border: none; cursor: pointer; border-radius: 10px;
    font-size: 14px; font-weight: 600; transition: transform 0.12s, box-shadow 0.12s;
  }
  .gd-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
  .gd-btn:active:not(:disabled) { transform: translateY(0); }
  .gd-btn:disabled { opacity: 0.45; cursor: default; }
  .gd-opt {
    border: 2px solid var(--line-soft); background: var(--bg); cursor: pointer;
    border-radius: 10px; padding: 11px 16px; font-size: 15px; font-weight: 600;
    color: var(--ink); transition: border-color 0.15s, background 0.15s, transform 0.12s;
    text-align: center;
  }
  .gd-opt:hover:not(:disabled) { border-color: #6c63ff; background: rgba(108,99,255,0.05); transform: translateY(-1px); }
  .gd-opt:disabled { cursor: default; }
  .gd-opt-correct { border-color: #059669 !important; background: rgba(5,150,105,0.08) !important; color: #059669 !important; }
  .gd-opt-wrong   { border-color: #dc2626 !important; background: rgba(220,38,38,0.07) !important; color: #dc2626 !important; }
`;

// ── Shared layout helpers ──────────────────────────────────────────────────────

function PhaseHeader({
  stage,
  title,
  subtitle,
}: {
  stage: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p
        style={{
          margin: '0 0 4px',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--wl-on-panel-link, #6c63ff)',
          fontWeight: 700,
        }}
      >
        {stage}
      </p>
      <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>{subtitle}</p>
      )}
    </div>
  );
}

function NextButton({
  label = 'Siguiente →',
  onClick,
  disabled,
}: {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="gd-btn"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '13px',
        background: '#6c63ff',
        color: '#fff',
        fontSize: 14,
        marginTop: 20,
      }}
    >
      {label}
    </button>
  );
}

// ── Korean character style ────────────────────────────────────────────────────

const KR = (size = 48, weight = 900): React.CSSProperties => ({
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: size,
  fontWeight: weight,
  lineHeight: 1.1,
});

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — "El secreto del Hangul"
// ─────────────────────────────────────────────────────────────────────────────

interface ExampleEntry {
  consonant: string;
  vowel: string;
  result: string;
  label: string;
}

const EXAMPLES: ExampleEntry[] = [
  { consonant: 'ㅂ', vowel: 'ㅏ', result: '바', label: 'ba' },
  { consonant: 'ㄴ', vowel: 'ㅏ', result: '나', label: 'na' },
  { consonant: 'ㄱ', vowel: 'ㅏ', result: '가', label: 'ga' },
  { consonant: 'ㄴ', vowel: 'ㅓ', result: '너', label: 'neo' },
];

type AssembleState = 'split' | 'assembled';

function AssemblyDemo({ entry, autoPlay }: { entry: ExampleEntry; autoPlay?: boolean }) {
  const [state, setState] = useState<AssembleState>(autoPlay ? 'split' : 'split');
  const { assemble } = useSound();

  function toggle() {
    setState(s => {
      if (s === 'split') { assemble(); return 'assembled'; }
      return 'split';
    });
  }

  // Auto-assemble on mount when autoPlay
  useEffect(() => {
    if (!autoPlay) return;
    const t = setTimeout(() => { assemble(); setState('assembled'); }, 900);
    return () => clearTimeout(t);
  }, []);

  const isAssembled = state === 'assembled';

  return (
    <button
      type="button"
      onClick={toggle}
      title="Haz clic para ver el bloque armarse"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '16px 20px',
        background: 'var(--bg-2)',
        border: '1.5px solid var(--line-soft)',
        borderRadius: 14,
        cursor: 'pointer',
        minWidth: 160,
        position: 'relative',
        transition: 'border-color 0.2s',
        borderColor: isAssembled ? '#6c63ff' : 'var(--line-soft)',
      }}
    >
      {/* Split view */}
      {!isAssembled && (
        <>
          <span key="c-split" className="gd-slide-r" style={{ ...KR(36), color: 'var(--wl-on-panel-link, #6c63ff)' }}>
            {entry.consonant}
          </span>
          <span style={{ fontSize: 22, color: 'var(--muted)', fontWeight: 300 }}>+</span>
          <span key="v-split" className="gd-slide-l" style={{ ...KR(36), color: 'var(--wl-on-panel-ok, #059669)' }}>
            {entry.vowel}
          </span>
          <span style={{ fontSize: 22, color: 'var(--muted)', fontWeight: 300 }}>=</span>
          <span style={{ ...KR(36), color: 'var(--muted)', opacity: 0.3 }}>?</span>
        </>
      )}
      {/* Assembled view */}
      {isAssembled && (
        <>
          <span style={{ ...KR(20), color: 'var(--wl-on-panel-link, #6c63ff)', opacity: 0.5 }}>{entry.consonant}</span>
          <span style={{ fontSize: 18, color: 'var(--muted)', fontWeight: 300 }}>+</span>
          <span style={{ ...KR(20), color: 'var(--wl-on-panel-ok, #059669)', opacity: 0.5 }}>{entry.vowel}</span>
          <span style={{ fontSize: 18, color: 'var(--muted)', fontWeight: 300 }}>=</span>
          <span key="result" className="gd-pop" style={{ ...KR(48), color: 'var(--ink)' }}>
            {entry.result}
          </span>
          <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 4, alignSelf: 'flex-end', paddingBottom: 4 }}>
            {entry.label}
          </span>
        </>
      )}
    </button>
  );
}

const MINI_QUIZ_OPTIONS = ['사', '하', '아', '다'];
const MINI_QUIZ_CORRECT = 0; // 사

function Phase1({ onNext }: { onNext: () => void }) {
  const [miniAnswered, setMiniAnswered] = useState<null | number>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { correct, wrong } = useSound();

  function pickOption(i: number) {
    if (miniAnswered !== null) return;
    setMiniAnswered(i);
    if (i === MINI_QUIZ_CORRECT) correct(); else wrong();
  }

  const quizPassed = miniAnswered === MINI_QUIZ_CORRECT;

  return (
    <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <PhaseHeader
        stage="ETAPA 6 DE 11 · FASE 1 DE 5"
        title="El secreto del Hangul"
        subtitle="Cada sílaba coreana es un bloque cuadrado formado por consonante + vocal."
      />

      {/* Rule box */}
      <div
        className="gd-fade-in"
        style={{
          background: 'rgba(108,99,255,0.07)',
          border: '1.5px solid rgba(108,99,255,0.25)',
          borderRadius: 14,
          padding: '14px 18px',
          marginBottom: 22,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--wl-on-panel-link, #6c63ff)' }}>
          La regla de oro
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>
          <strong>Consonante</strong> arriba o a la izquierda &nbsp;+&nbsp;
          <strong>Vocal</strong> a la derecha o abajo<br />
          <span style={{ color: 'var(--muted)' }}>Haz clic en cada bloque para verlo armarse.</span>
        </p>
      </div>

      {/* Assembly demos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        {EXAMPLES.map((ex, i) => (
          <AssemblyDemo key={ex.result} entry={ex} autoPlay={i === 0} />
        ))}
      </div>

      {/* Mini quiz */}
      {!showQuiz && (
        <button
          type="button"
          className="gd-btn"
          onClick={() => setShowQuiz(true)}
          style={{ padding: '10px 18px', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)', fontSize: 13 }}
        >
          ¿Entendiste? Mini-prueba →
        </button>
      )}

      {showQuiz && (
        <div
          className="gd-slide-up"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line-soft)',
            borderRadius: 14,
            padding: '20px',
          }}
        >
          <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
            ¿Cuál es el resultado de&nbsp;
            <span style={{ ...KR(22), color: 'var(--wl-on-panel-link, #6c63ff)' }}>ㅅ</span>
            &nbsp;+&nbsp;
            <span style={{ ...KR(22), color: 'var(--wl-on-panel-ok, #059669)' }}>ㅏ</span>
            &nbsp;=&nbsp;?
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {MINI_QUIZ_OPTIONS.map((opt, i) => {
              const isChosen = miniAnswered === i;
              const isCorrect = i === MINI_QUIZ_CORRECT;
              let cls = 'gd-opt';
              if (isChosen && isCorrect) cls += ' gd-opt-correct';
              else if (isChosen && !isCorrect) cls += ' gd-opt-wrong';
              else if (miniAnswered !== null && isCorrect) cls += ' gd-opt-correct';
              return (
                <button
                  type="button"
                  key={opt}
                  className={cls}
                  disabled={miniAnswered !== null}
                  onClick={() => pickOption(i)}
                  style={{ flex: 1, ...KR(32) }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {miniAnswered !== null && (
            <p
              className="gd-fade-in"
              style={{
                margin: '12px 0 0',
                fontSize: 13,
                color: quizPassed ? '#059669' : '#dc2626',
                fontWeight: 600,
              }}
            >
              {quizPassed
                ? '¡Correcto! ㅅ + ㅏ = 사 (sa)'
                : 'La respuesta es 사 (sa) — ㅅ + ㅏ'}
            </p>
          )}
        </div>
      )}

      <NextButton
        onClick={onNext}
        disabled={showQuiz && miniAnswered === null}
        label="Siguiente: Lee sílabas →"
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — "Lee estas sílabas"
// ─────────────────────────────────────────────────────────────────────────────

interface ReadingQ {
  syllable: string;
  options: string[];
  correct: number;
}

const READING_QS: ReadingQ[] = [
  { syllable: '가', options: ['ga', 'na', 'da', 'ba'], correct: 0 },
  { syllable: '나', options: ['na', 'ga', 'ba', 'da'], correct: 0 },
  { syllable: '보', options: ['bo', 'mo', 'po', 'go'], correct: 0 },
  { syllable: '여', options: ['yeo', 'yo', 'ya', 'yi'], correct: 0 },
  { syllable: '이', options: ['i', 'e', 'a', 'o'], correct: 0 },
  { syllable: '제', options: ['je', 'gi', 'ke', 'de'], correct: 0 },
  { syllable: '조', options: ['jo', 'go', 'do', 'bo'], correct: 0 },
  { syllable: '금', options: ['geum', 'beum', 'deum', 'reum'], correct: 0 },
];

function Phase2({
  onNext,
  onScore,
}: {
  onNext: () => void;
  onScore: (correct: number, total: number) => void;
}) {
  const [qi, setQi] = useState(0);
  const [chosen, setChosen] = useState<null | number>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const { correct: sndCorrect, wrong: sndWrong } = useSound();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = READING_QS[qi];
  const totalCorrect = results.filter(Boolean).length;

  function pick(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    const isRight = i === q.correct;
    if (isRight) sndCorrect(); else sndWrong();
    const newResults = [...results, isRight];

    timerRef.current = setTimeout(() => {
      if (qi + 1 < READING_QS.length) {
        setQi(qi + 1);
        setChosen(null);
      } else {
        setDone(true);
        onScore(newResults.filter(Boolean).length, READING_QS.length);
      }
    }, 800);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <PhaseHeader
        stage="ETAPA 6 DE 11 · FASE 2 DE 5"
        title="Lee estas sílabas"
        subtitle="Identifica cómo suena cada bloque coreano."
      />

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 24 }}>
        {READING_QS.map((_, i) => (
          <div
            key={i}
            style={{
              height: 5,
              flex: 1,
              borderRadius: 3,
              background:
                i < qi
                  ? '#059669'
                  : i === qi
                  ? '#6c63ff'
                  : 'var(--line-soft)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {!done ? (
        <div
          key={qi}
          className="gd-fade-in"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line-soft)',
            borderRadius: 16,
            padding: '32px 20px 24px',
            textAlign: 'center',
          }}
        >
          {/* Big syllable */}
          <div style={{ marginBottom: 32 }}>
            <span style={{ ...KR(80), color: 'var(--ink)' }}>{q.syllable}</span>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {q.options.map((opt, i) => {
              const isChosen = chosen === i;
              const isCorrect = i === q.correct;
              let cls = 'gd-opt';
              if (isChosen && isCorrect) cls += ' gd-opt-correct';
              else if (isChosen && !isCorrect) cls += ' gd-opt-wrong gd-shake';
              else if (chosen !== null && isCorrect) cls += ' gd-opt-correct';
              return (
                <button
                  type="button"
                  key={opt}
                  className={cls}
                  disabled={chosen !== null}
                  onClick={() => pick(i)}
                  style={{ fontSize: 16, fontWeight: 600, padding: '13px' }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <p style={{ margin: '16px 0 0', fontSize: 12, color: 'var(--muted)' }}>
            {qi + 1} / {READING_QS.length}
          </p>
        </div>
      ) : (
        <div className="gd-pop" style={{ textAlign: 'center', padding: '32px 0' }}>
          <p style={{ fontSize: 48 }}>{totalCorrect >= 6 ? '🎉' : '💪'}</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: '8px 0 4px' }}>
            {totalCorrect} / {READING_QS.length} correctas
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            {totalCorrect >= 6
              ? '¡Muy bien! Ya reconoces sílabas coreanas.'
              : 'Buen esfuerzo. Cada sílaba reconocida es un paso más.'}
          </p>
          <NextButton onClick={onNext} label="Siguiente: Forma sílabas →" />
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3 — "Forma la sílaba"
// ─────────────────────────────────────────────────────────────────────────────

interface BuildQ {
  consonant: string;
  vowel: string;
  options: string[];
  correct: number;
}

const BUILD_QS: BuildQ[] = [
  { consonant: 'ㄴ', vowel: 'ㅏ', options: ['나', '바', '다', '라'], correct: 0 },
  { consonant: 'ㄱ', vowel: 'ㅏ', options: ['가', '나', '라', '마'], correct: 0 },
  { consonant: 'ㅂ', vowel: 'ㅗ', options: ['보', '모', '포', '노'], correct: 0 },
  { consonant: 'ㄴ', vowel: 'ㅓ', options: ['너', '서', '어', '더'], correct: 0 },
  { consonant: 'ㅈ', vowel: 'ㅔ', options: ['제', '세', '게', '레'], correct: 0 },
];

function Phase3({
  onNext,
  onScore,
}: {
  onNext: () => void;
  onScore: (correct: number, total: number) => void;
}) {
  const [qi, setQi] = useState(0);
  const [chosen, setChosen] = useState<null | number>(null);
  const [streak, setStreak] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const { correct: sndCorrect, wrong: sndWrong, assemble } = useSound();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = BUILD_QS[qi];

  function pick(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    const isRight = i === q.correct;
    if (isRight) { assemble(); sndCorrect(); setStreak(s => s + 1); }
    else { sndWrong(); setStreak(0); }
    const newResults = [...results, isRight];

    timerRef.current = setTimeout(() => {
      if (qi + 1 < BUILD_QS.length) {
        setQi(qi + 1);
        setChosen(null);
      } else {
        setDone(true);
        onScore(newResults.filter(Boolean).length, BUILD_QS.length);
      }
    }, 900);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <PhaseHeader
          stage="ETAPA 6 DE 11 · FASE 3 DE 5"
          title="Forma la sílaba"
          subtitle="Elige el bloque correcto."
        />
        <StreakBar streak={streak} />
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 24 }}>
        {BUILD_QS.map((_, i) => (
          <div
            key={i}
            style={{
              height: 5, flex: 1, borderRadius: 3,
              background: i < qi ? '#059669' : i === qi ? '#6c63ff' : 'var(--line-soft)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {!done ? (
        <div
          key={qi}
          className="gd-fade-in"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line-soft)',
            borderRadius: 16,
            padding: '32px 20px 24px',
            textAlign: 'center',
          }}
        >
          {/* Component display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                padding: '12px 20px',
                background: 'rgba(108,99,255,0.08)',
                border: '2px solid rgba(108,99,255,0.3)',
                borderRadius: 12,
              }}
            >
              <span style={{ ...KR(52), color: 'var(--wl-on-panel-link, #6c63ff)' }}>{q.consonant}</span>
            </div>
            <span style={{ fontSize: 28, color: 'var(--muted)', fontWeight: 300 }}>+</span>
            <div
              style={{
                padding: '12px 20px',
                background: 'rgba(5,150,105,0.08)',
                border: '2px solid rgba(5,150,105,0.3)',
                borderRadius: 12,
              }}
            >
              <span style={{ ...KR(52), color: 'var(--wl-on-panel-ok, #059669)' }}>{q.vowel}</span>
            </div>
            <span style={{ fontSize: 28, color: 'var(--muted)', fontWeight: 300 }}>=</span>
            <span style={{ fontSize: 28, color: 'var(--muted)' }}>?</span>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {q.options.map((opt, i) => {
              const isChosen = chosen === i;
              const isCorrect = i === q.correct;
              let cls = 'gd-opt';
              if (isChosen && isCorrect) cls += ' gd-opt-correct gd-pop';
              else if (isChosen && !isCorrect) cls += ' gd-opt-wrong gd-shake';
              else if (chosen !== null && isCorrect) cls += ' gd-opt-correct';
              return (
                <button
                  type="button"
                  key={opt}
                  className={cls}
                  disabled={chosen !== null}
                  onClick={() => pick(i)}
                  style={{ ...KR(36), padding: '14px' }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="gd-pop" style={{ textAlign: 'center', padding: '32px 0' }}>
          <p style={{ fontSize: 48 }}>{results.filter(Boolean).length >= 4 ? '🧱' : '📝'}</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: '8px 0 4px' }}>
            {results.filter(Boolean).length} / {BUILD_QS.length} correctas
          </p>
          <NextButton onClick={onNext} label="Siguiente: Palabras reales →" />
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4 — "Lee palabras reales"
// ─────────────────────────────────────────────────────────────────────────────

interface WordCard {
  word: string;
  syllables: string[];
  meaning: string;
}

const WORD_CARDS: WordCard[] = [
  { word: '가요', syllables: ['가', '요'], meaning: 'va / voy' },
  { word: '학교', syllables: ['학', '교'], meaning: 'escuela' },
  { word: '나는', syllables: ['나', '는'], meaning: 'yo (tema)' },
  { word: '이제', syllables: ['이', '제'], meaning: 'ahora' },
];

const WORD_QUIZ_OPTIONS: string[][] = [
  ['va / voy', 'escuela', 'yo', 'ahora'],
  ['ahora', 'escuela', 'va / voy', 'yo'],
  ['escuela', 'yo (tema)', 'ahora', 'va'],
  ['ahora', 'escuela', 'va / voy', 'yo (tema)'],
];
const WORD_QUIZ_CORRECT = [0, 1, 1, 3];

function Phase4({
  onNext,
  onScore,
}: {
  onNext: () => void;
  onScore: (correct: number, total: number) => void;
}) {
  const [wordIdx, setWordIdx] = useState(0);
  const [allSeen, setAllSeen] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [chosen, setChosen] = useState<null | number>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [quizDone, setQuizDone] = useState(false);
  const { correct: sndCorrect, wrong: sndWrong, korean } = useSound();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // speak word on change
  useEffect(() => {
    if (!allSeen) korean(WORD_CARDS[wordIdx].word, 0.8);
  }, [wordIdx, allSeen]);

  function nextWord() {
    if (wordIdx + 1 < WORD_CARDS.length) {
      setWordIdx(i => i + 1);
    } else {
      setAllSeen(true);
    }
  }

  function pickQuiz(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    const isRight = i === WORD_QUIZ_CORRECT[quizIdx];
    if (isRight) sndCorrect(); else sndWrong();
    const newResults = [...results, isRight];

    timerRef.current = setTimeout(() => {
      if (quizIdx + 1 < WORD_CARDS.length) {
        setQuizIdx(q => q + 1);
        setChosen(null);
      } else {
        setQuizDone(true);
        onScore(newResults.filter(Boolean).length, WORD_CARDS.length);
      }
    }, 900);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const card = WORD_CARDS[wordIdx];

  if (!allSeen) {
    return (
      <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <PhaseHeader
          stage="ETAPA 6 DE 11 · FASE 4 DE 5"
          title="Lee palabras reales"
          subtitle="Cada palabra está dividida en sílabas. Escucha y observa."
        />

        {/* Word progress */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 24 }}>
          {WORD_CARDS.map((_, i) => (
            <div
              key={i}
              style={{
                height: 5, flex: 1, borderRadius: 3,
                background: i < wordIdx ? '#059669' : i === wordIdx ? '#6c63ff' : 'var(--line-soft)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        <div
          key={wordIdx}
          className="gd-fade-in"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line-soft)',
            borderRadius: 16,
            padding: '28px 24px',
          }}
        >
          {/* Full word */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <button
              type="button"
              title="Escuchar"
              onClick={() => korean(card.word, 0.8)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-block' }}
            >
              <span style={{ ...KR(72), color: 'var(--ink)' }}>{card.word}</span>
            </button>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>
              🔊 Haz clic para escuchar
            </p>
          </div>

          {/* Syllable breakdown */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
            {card.syllables.map((syl, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {i > 0 && (
                  <span style={{ fontSize: 20, color: 'var(--muted)', fontWeight: 300 }}>+</span>
                )}
                <div
                  className="gd-slide-up"
                  style={{
                    padding: '12px 18px',
                    background: 'var(--bg-2)',
                    border: '1.5px solid var(--line-soft)',
                    borderRadius: 12,
                    textAlign: 'center',
                    animationDelay: `${i * 0.12}s`,
                  }}
                >
                  <span style={{ ...KR(44), color: 'var(--ink)', display: 'block' }}>{syl}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    sílaba {i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Meaning */}
          <div
            style={{
              textAlign: 'center',
              padding: '10px 0',
              borderTop: '1px solid var(--line-soft)',
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Significado: </span>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{card.meaning}</span>
          </div>
        </div>

        <NextButton
          onClick={nextWord}
          label={wordIdx + 1 < WORD_CARDS.length ? `Siguiente palabra →` : 'Mini-prueba de vocabulario →'}
        />
      </section>
    );
  }

  // Quiz phase
  const qw = WORD_CARDS[quizIdx];
  const opts = WORD_QUIZ_OPTIONS[quizIdx];

  return (
    <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <PhaseHeader
        stage="ETAPA 6 DE 11 · FASE 4 DE 5"
        title="Mini-prueba de vocabulario"
        subtitle="¿Qué significa esta palabra?"
      />

      {!quizDone ? (
        <div
          key={quizIdx}
          className="gd-fade-in"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line-soft)',
            borderRadius: 16,
            padding: '32px 20px 24px',
            textAlign: 'center',
          }}
        >
          <span style={{ ...KR(64), color: 'var(--ink)' }}>{qw.word}</span>
          <p style={{ margin: '8px 0 24px', fontSize: 12, color: 'var(--muted)' }}>
            {quizIdx + 1} / {WORD_CARDS.length}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {opts.map((opt, i) => {
              const isChosen = chosen === i;
              const isCorrect = i === WORD_QUIZ_CORRECT[quizIdx];
              let cls = 'gd-opt';
              if (isChosen && isCorrect) cls += ' gd-opt-correct';
              else if (isChosen && !isCorrect) cls += ' gd-opt-wrong gd-shake';
              else if (chosen !== null && isCorrect) cls += ' gd-opt-correct';
              return (
                <button
                  type="button"
                  key={opt}
                  className={cls}
                  disabled={chosen !== null}
                  onClick={() => pickQuiz(i)}
                  style={{ fontSize: 14 }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="gd-pop" style={{ textAlign: 'center', padding: '32px 0' }}>
          <p style={{ fontSize: 48 }}>📖</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: '8px 0 4px' }}>
            {results.filter(Boolean).length} / {WORD_CARDS.length} correctas
          </p>
          <NextButton onClick={onNext} label="Ver resultados →" />
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 5 — Score + celebration
// ─────────────────────────────────────────────────────────────────────────────

function Phase5({
  scores,
  onFinish,
}: {
  scores: { phase: number; correct: number; total: number }[];
  onFinish: () => void;
}) {
  const { complete } = useSound();
  const totalCorrect = scores.reduce((s, e) => s + e.correct, 0);
  const totalQ = scores.reduce((s, e) => s + e.total, 0);
  const pct = Math.round((totalCorrect / totalQ) * 100);
  const passed = pct >= 80;

  useEffect(() => {
    complete();
  }, []);

  return (
    <section style={{ maxWidth: 620, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
      <style>{GLOBAL_STYLES}</style>

      <PhaseHeader stage="ETAPA 6 DE 11 · FASE 5 DE 5" title="Resultado final" />

      <div className="gd-pop" style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 64, margin: 0 }}>{passed ? '🎉' : '💪'}</p>
        <p style={{ fontSize: 36, fontWeight: 900, color: passed ? '#059669' : '#6c63ff', margin: '8px 0 4px' }}>
          {totalCorrect} / {totalQ}
        </p>
        <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>{pct}% de respuestas correctas</p>
      </div>

      <div
        style={{
          background: passed ? 'rgba(5,150,105,0.07)' : 'rgba(108,99,255,0.07)',
          border: `1.5px solid ${passed ? 'rgba(5,150,105,0.25)' : 'rgba(108,99,255,0.25)'}`,
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 24,
          textAlign: 'left',
        }}
      >
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: passed ? '#059669' : '#6c63ff' }}>
          {passed
            ? '¡Excelente! Ya puedes leer sílabas coreanas básicas.'
            : 'Sigue practicando — cada sílaba que reconoces es un paso más.'}
        </p>
        <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          {passed
            ? 'Reconociste sílabas, formaste bloques y leíste palabras reales. El Hangul empieza a tener sentido para ti.'
            : 'Repasa los bloques silábicos con calma. La clave está en conectar consonante + vocal hasta que sea automático.'}
        </p>
      </div>

      {/* Per-phase breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {scores.map(s => (
          <div
            key={s.phase}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              background: 'var(--bg-2)',
              border: '1px solid var(--line-soft)',
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--ink)' }}>
              {s.phase === 2 ? 'Lectura de sílabas' : s.phase === 3 ? 'Formar sílabas' : 'Vocabulario'}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: s.correct / s.total >= 0.8 ? '#059669' : '#dc2626',
              }}
            >
              {s.correct}/{s.total}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="gd-btn"
        onClick={onFinish}
        style={{
          width: '100%',
          padding: '14px',
          background: '#6c63ff',
          color: '#fff',
          fontSize: 15,
        }}
      >
        Finalizar
      </button>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  onComplete?: () => void;
}

export default function GuidedDiscovery002({ onComplete }: Props) {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [scores, setScores] = useState<{ phase: number; correct: number; total: number }[]>([]);

  function addScore(ph: number, correct: number, total: number) {
    setScores(prev => [...prev, { phase: ph, correct, total }]);
  }

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      {phase === 1 && (
        <Phase1 onNext={() => setPhase(2)} />
      )}

      {phase === 2 && (
        <Phase2
          onNext={() => setPhase(3)}
          onScore={(c, t) => addScore(2, c, t)}
        />
      )}

      {phase === 3 && (
        <Phase3
          onNext={() => setPhase(4)}
          onScore={(c, t) => addScore(3, c, t)}
        />
      )}

      {phase === 4 && (
        <Phase4
          onNext={() => setPhase(5)}
          onScore={(c, t) => addScore(4, c, t)}
        />
      )}

      {phase === 5 && (
        <Phase5
          scores={scores}
          onFinish={() => onComplete?.()}
        />
      )}
    </>
  );
}
