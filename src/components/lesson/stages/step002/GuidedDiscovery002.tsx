'use client';

import { useState, useEffect } from 'react';
import { useSound } from '@/components/lesson/engine/useSound';
import MicroChallenge from '@/components/lesson/engine/MicroChallenge';
import StreakBar from '@/components/lesson/engine/StreakBar';
import AnimatedBlock from '@/components/lesson/engine/AnimatedBlock';

// ── Data ───────────────────────────────────────────────────────────────────────

interface AnimatedSyllable {
  consonant: string;
  vowel: string;
  batchim?: string;
  result: string;
}

interface WordEntry {
  word: string;
  translation: string;
  syllables: AnimatedSyllable[];
}

const WORDS: WordEntry[] = [
  {
    word: '어제',
    translation: 'ayer',
    syllables: [
      { consonant: 'ㅇ', vowel: 'ㅓ', result: '어' },
      { consonant: 'ㅈ', vowel: 'ㅔ', result: '제' },
    ],
  },
  {
    word: '오늘',
    translation: 'hoy',
    syllables: [
      { consonant: 'ㅇ', vowel: 'ㅗ', result: '오' },
      { consonant: 'ㄴ', vowel: 'ㅡ', batchim: 'ㄹ', result: '늘' },
    ],
  },
  {
    word: '이제',
    translation: 'ahora',
    syllables: [
      { consonant: 'ㅇ', vowel: 'ㅣ', result: '이' },
      { consonant: 'ㅈ', vowel: 'ㅔ', result: '제' },
    ],
  },
  {
    word: '글자',
    translation: 'letras / caracteres',
    syllables: [
      { consonant: 'ㄱ', vowel: 'ㅡ', batchim: 'ㄹ', result: '글' },
      { consonant: 'ㅈ', vowel: 'ㅏ', result: '자' },
    ],
  },
];

// ── Observe phase: one word at a time, AnimatedBlocks per syllable ─────────────

function ObserveWord({
  entry,
  onNext,
  isLast,
}: {
  entry: WordEntry;
  onNext: () => void;
  isLast: boolean;
}) {
  // Track how many syllable animations have completed
  const [completedSyllables, setCompletedSyllables] = useState(0);
  // Active syllable being animated (index into entry.syllables)
  const [activeSyllable, setActiveSyllable] = useState(0);
  // Whether the "Next" button is ready to show
  const allDone = completedSyllables >= entry.syllables.length;

  // When a syllable animation completes, advance to the next one
  function handleSyllableComplete(idx: number) {
    setCompletedSyllables(c => c + 1);
    if (idx + 1 < entry.syllables.length) {
      setActiveSyllable(idx + 1);
    }
  }

  return (
    <div>
      {/* Big word display */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: 'var(--ink)',
            letterSpacing: 4,
          }}
        >
          {entry.word}
        </span>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>{entry.translation}</p>
      </div>

      <p style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
        Se construye con:
      </p>

      {/* Syllable decompositions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
        {entry.syllables.map((syl, idx) => {
          const isActive = idx === activeSyllable && !allDone;
          const isDone = completedSyllables > idx;
          return (
            <div
              key={`${syl.result}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 16px',
                background: 'var(--bg-2)',
                border: '1px solid var(--line-soft)',
                borderRadius: 12,
                flexWrap: 'wrap',
              }}
            >
              <AnimatedBlock
                consonant={syl.consonant}
                vowel={syl.vowel}
                batchim={syl.batchim}
                result={syl.result}
                size="sm"
                color="#6c63ff"
                autoPlay={isActive}
                showResult={isDone && !isActive}
                onComplete={() => handleSyllableComplete(idx)}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16, color: 'var(--muted)' }}>→</span>
                <span
                  style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 40,
                    fontWeight: 900,
                    color: 'var(--ink)',
                    lineHeight: 1,
                    opacity: isDone || isActive ? 1 : 0.25,
                    transition: 'opacity 0.3s',
                  }}
                >
                  {syl.result}
                </span>
                {idx === 1 && syl.batchim && isDone && (
                  <span
                    style={{
                      fontSize: 11,
                      color: '#dc2626',
                      background: 'rgba(220,38,38,0.08)',
                      borderRadius: 6,
                      padding: '2px 7px',
                      fontWeight: 600,
                    }}
                  >
                    받침 abajo
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {allDone && (
        <button
          type="button"
          onClick={onNext}
          style={{
            width: '100%',
            padding: '13px',
            background: '#6c63ff',
            border: 'none',
            borderRadius: 10,
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {isLast ? 'Descubrir el patrón →' : 'Siguiente →'}
        </button>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  onComplete?: () => void;
}

export default function GuidedDiscovery002({ onComplete }: Props) {
  const { korean } = useSound();

  const [phase, setPhase] = useState<'observe' | 'pattern' | 'build'>('observe');
  const [wordStep, setWordStep] = useState(0);

  // streak across build challenges
  const [streak, setStreak] = useState(0);
  // which build question we're on (0 or 1)
  const [buildStep, setBuildStep] = useState(0);

  const currentWord = WORDS[wordStep];

  // Auto-speak the current word when observe step changes
  useEffect(() => {
    if (phase === 'observe') {
      korean(currentWord.word);
    }
  }, [wordStep, phase]);

  function advanceWord() {
    if (wordStep < WORDS.length - 1) {
      setWordStep(s => s + 1);
    } else {
      setPhase('pattern');
    }
  }

  // ── Phase: Observe ────────────────────────────────────────────────────────────
  if (phase === 'observe') {
    return (
      <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <p
          style={{
            margin: '0 0 4px',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#6c63ff',
            fontWeight: 700,
          }}
        >
          ETAPA 6 DE 11
        </p>
        <h3 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>
          Descubre el patrón
        </h3>
        <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--muted)' }}>
          Paso {wordStep + 1} de {WORDS.length} — observa cómo se construye cada sílaba
        </p>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 20 }}>
          {WORDS.map((w, i) => (
            <div
              key={w.word}
              style={{
                height: 3,
                flex: 1,
                borderRadius: 2,
                background: i <= wordStep ? '#6c63ff' : 'var(--line-soft)',
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>

        <article
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line-soft)',
            borderRadius: 16,
            padding: '24px 20px',
            marginBottom: 16,
          }}
        >
          <ObserveWord
            key={wordStep}
            entry={currentWord}
            onNext={advanceWord}
            isLast={wordStep === WORDS.length - 1}
          />
        </article>

        {wordStep > 0 && (
          <button
            type="button"
            onClick={() => setWordStep(s => s - 1)}
            style={{
              padding: '10px 18px',
              background: 'var(--bg)',
              border: '1px solid var(--line-soft)',
              borderRadius: 10,
              fontSize: 13,
              color: 'var(--muted)',
              cursor: 'pointer',
            }}
          >
            ← Anterior
          </button>
        )}
      </section>
    );
  }

  // ── Phase: Pattern ────────────────────────────────────────────────────────────
  if (phase === 'pattern') {
    return (
      <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
          Descubre el patrón
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--muted)' }}>
          Viste 4 palabras. ¿Qué tienen en común sus sílabas?
        </p>

        {/* Word recap strip */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {WORDS.map(w => (
            <div
              key={w.word}
              style={{
                textAlign: 'center',
                padding: '10px 16px',
                background: 'var(--bg-2)',
                border: '1px solid var(--line-soft)',
                borderRadius: 10,
                cursor: 'pointer',
              }}
              onClick={() => korean(w.word)}
            >
              <span
                style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: 'var(--ink)',
                  display: 'block',
                }}
              >
                {w.word}
              </span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{w.translation}</span>
            </div>
          ))}
        </div>

        <article
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line-soft)',
            borderRadius: 14,
            padding: 20,
          }}
        >
          <MicroChallenge
            question="¿Cómo se organiza la escritura coreana?"
            options={[
              { label: 'Letras en línea, como en español' },
              { label: 'Bloques silábicos cuadrados', sublabel: 'cada sílaba = un cuadrado' },
              { label: 'Un símbolo por palabra' },
            ]}
            correctIndex={1}
            explanation="¡Exacto! Cada sílaba coreana forma un bloque cuadrado visual. Consonantes y vocales se apilan para crear la sílaba — eso es lo que hace al Hangul elegante y sistemático."
            accent="#6c63ff"
            autoAdvanceMs={0}
            onPass={() => setPhase('build')}
          />
        </article>
      </section>
    );
  }

  // ── Phase: Build ──────────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header with streak */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
          Construye tú
        </h3>
        <StreakBar streak={streak} />
      </div>
      <p style={{ margin: '0 0 22px', fontSize: 13, color: 'var(--muted)' }}>
        Aplica la regla que descubriste.
      </p>

      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--line-soft)',
          borderRadius: 14,
          padding: 20,
        }}
      >
        {buildStep === 0 && (
          <MicroChallenge
            question="¿Cómo se escribe la sílaba 'a' (vocal pura)?"
            options={[
              { label: '아', isKorean: true, sublabel: 'ㅇ+ㅏ' },
              { label: '오', isKorean: true, sublabel: 'ㅇ+ㅗ' },
              { label: '우', isKorean: true, sublabel: 'ㅇ+ㅜ' },
            ]}
            correctIndex={0}
            explanation="아 = ㅇ (mudo) + ㅏ. El ㅇ inicial es siempre silencioso cuando inicia con vocal."
            accent="#059669"
            autoAdvanceMs={800}
            onPass={() => {
              setStreak(s => s + 1);
              setBuildStep(1);
            }}
          />
        )}

        {buildStep === 1 && (
          <MicroChallenge
            question="¿Y cómo se escribe 'o'?"
            options={[
              { label: '아', isKorean: true },
              { label: '오', isKorean: true, sublabel: 'ㅇ+ㅗ' },
              { label: '으', isKorean: true },
            ]}
            correctIndex={1}
            explanation="오 = ㅇ (mudo) + ㅗ. ¡Ya puedes leer dos sílabas en Hangul!"
            accent="#059669"
            autoAdvanceMs={0}
            onPass={() => {
              setStreak(s => s + 1);
              onComplete?.();
            }}
          />
        )}
      </div>
    </section>
  );
}
