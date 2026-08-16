'use client';

import { useMemo, useState } from 'react';
import { playAudio } from '@/lib/storage';

interface Block {
  korean: string;
  role: string;
  label: string;
  translation: string;
  color: string;
  audio: string;
  description: string;
}

interface BlockQuestion {
  id: string;
  prompt: string;
  highlightRole: string;
  options: string[];
  correct: string;
  explanation: string;
}

const EXPLANATION = {
  intro: 'Cuando empiezas coreano, tu cerebro intenta leerlo como español. Pero el coreano organiza la información de otra forma.',
  note: 'Primero mira el lugar: 학교. Luego busca la acción al final: 가요. No traduzcas palabra por palabra todavía.',
  korean: '저는 학교에 가요.',
  spanishNatural: 'Yo voy a la escuela.',
  spanishKoreanOrder: 'Yo a la escuela voy.',
};

const BLOCKS: Block[] = [
  {
    korean: '저는',
    role: 'ejecutor',
    label: '¿Quién?',
    translation: 'yo',
    color: 'var(--wl-on-panel-link, #6c63ff)',
    audio: '저는',
    description: 'El que realiza la acción. Siempre va primero.',
  },
  {
    korean: '학교에',
    role: 'lugar',
    label: '¿Dónde?',
    translation: 'a la escuela',
    color: '#e6930a',
    audio: '학교에',
    description: 'El destino. Va en el medio, antes de la acción.',
  },
  {
    korean: '가요',
    role: 'verbo',
    label: '¿Qué pasa?',
    translation: 'voy',
    color: 'var(--wl-on-panel-ok, #2d9b4e)',
    audio: '가요',
    description: 'La acción. Siempre al final. Siempre.',
  },
];

const BLOCK_QUESTIONS: BlockQuestion[] = [
  {
    id: 'BQ1',
    prompt: '¿Qué parte de la frase nos dice el lugar?',
    highlightRole: 'lugar',
    options: ['저는', '학교에', '가요'],
    correct: '학교에',
    explanation: 'Exacto: 학교에 nos dice "a la escuela". El lugar aparece antes de la acción.',
  },
  {
    id: 'BQ2',
    prompt: '¿Qué parte de la frase indica la acción (el verbo)?',
    highlightRole: 'verbo',
    options: ['저는', '학교에', '가요'],
    correct: '가요',
    explanation: '가요 es la acción. En coreano la acción siempre cierra la frase.',
  },
  {
    id: 'BQ3',
    prompt: '¿Qué parte indica quién realiza la acción?',
    highlightRole: 'ejecutor',
    options: ['저는', '학교에', '가요'],
    correct: '저는',
    explanation: "저는 significa 'yo' en formal. Es quien realiza la acción.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function findBlockByKorean(korean: string): Block | null {
  return BLOCKS.find((block) => block.korean === korean) ?? null;
}

function FullSentencePreview({ highlightRole }: { highlightRole: string }) {
  return (
    <div
      style={{
        background: 'var(--wl-surface-card)',
        border: '1px solid #e9ecef',
        borderRadius: 12,
        padding: 14,
        textAlign: 'center',
        marginBottom: 16,
      }}
    >
      <p style={{ margin: '0 0 8px', fontSize: 10, color: 'var(--wl-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        La frase completa
      </p>
      <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        {BLOCKS.map((block) => {
          const isActive = block.role === highlightRole;
          return (
            <span
              key={block.korean}
              style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: block.color,
                opacity: isActive ? 1 : 0.3,
                transition: 'opacity 0.2s ease',
              }}
            >
              {block.korean}
            </span>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  onComplete?: () => void;
}

export default function ContextualInput({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'reveal' | 'questions' | 'complete'>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = BLOCK_QUESTIONS[questionIndex] ?? null;

  const questionOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return shuffle(currentQuestion.options);
  }, [currentQuestion?.id]);

  function handleVerify() {
    if (!currentQuestion || !selectedOption || checked) return;
    setChecked(true);
    if (selectedOption === currentQuestion.correct) {
      setScore((previous) => previous + 1);
    }
  }

  function handleNextQuestion() {
    if (!checked) return;
    if (questionIndex >= BLOCK_QUESTIONS.length - 1) {
      setPhase('complete');
      onComplete?.();
      return;
    }
    setQuestionIndex((previous) => previous + 1);
    setSelectedOption('');
    setChecked(false);
  }

  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700 }}>
          SECCIÓN 5 DE 11
        </p>
        <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: 'var(--wl-ink)' }}>Contexto primero</h3>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--wl-ink-soft)', lineHeight: 1.7 }}>{EXPLANATION.intro}</p>

        <article style={{ background: 'var(--wl-surface-card)', border: '1px solid #e9ecef', borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <p style={{ margin: '0 0 8px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 42, fontWeight: 700, color: 'var(--wl-ink)', textAlign: 'center' }}>
            {EXPLANATION.korean}
          </p>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <button
              type="button"
              onClick={() => playAudio('학교에 가요', 1)}
              style={{ background: 'var(--wl-surface-card)', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: 'var(--wl-ink-soft)', cursor: 'pointer' }}
            >
              🔊 Escuchar frase
            </button>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--wl-ink-soft)', textAlign: 'center' }}>
            jeo-neun hak-gyo-e ga-yo
          </p>

          <div style={{ background: 'var(--wl-panel-raised, #f8f9fa)', border: '1px solid #e9ecef', borderRadius: 10, padding: 14, marginBottom: 8 }}>
            <p style={{ margin: '0 0 4px', fontSize: 10, color: 'var(--wl-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Español natural</p>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--wl-ink)' }}>{EXPLANATION.spanishNatural}</p>
          </div>

          <div style={{ background: 'var(--wl-panel-raised, #f8f9fa)', border: '1px solid #e9ecef', borderRadius: 10, padding: 14, marginBottom: 8 }}>
            <p style={{ margin: '0 0 4px', fontSize: 10, color: 'var(--wl-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Orden coreano</p>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--wl-ink)' }}>{EXPLANATION.spanishKoreanOrder}</p>
            <p style={{ margin: '6px 0 0', fontSize: 11, color: 'var(--wl-on-panel-link, #6c63ff)' }}>¿Notaste? El verbo se fue al final.</p>
          </div>

          <div style={{ background: 'var(--wl-panel-raised, #f8f9fa)', border: '1px solid #e9ecef', borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <p style={{ margin: '0 0 4px', fontSize: 10, color: 'var(--wl-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Coreano</p>
            <p style={{ margin: 0, fontSize: 18, color: 'var(--wl-on-panel-link, #6c63ff)', fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700 }}>{EXPLANATION.korean}</p>
          </div>

          <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--wl-on-panel-link, #6c63ff)', marginBottom: 16 }}>
            {EXPLANATION.note}
          </div>

          <button
            type="button"
            onClick={() => setPhase('reveal')}
            style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Analizar la frase →
          </button>
        </article>
      </section>
    );
  }

  if (phase === 'reveal') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: 'var(--wl-ink)' }}>¿Qué hace cada parte?</h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--wl-ink-soft)' }}>Toca cada bloque para escuchar y entender su rol.</p>

        {BLOCKS.map((block) => (
          <article
            key={block.korean}
            onClick={() => playAudio(block.audio, 1)}
            style={{
              background: 'var(--wl-surface-card)',
              border: `2px solid ${block.color}30`,
              borderLeft: `4px solid ${block.color}`,
              borderRadius: 12,
              padding: 16,
              marginBottom: 10,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ background: `${block.color}15`, color: block.color, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 100, padding: '2px 8px' }}>
                {block.label}
              </span>
              <p style={{ flex: 1, margin: 0, textAlign: 'center', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 28, fontWeight: 700, color: block.color }}>
                {block.korean}
              </p>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); playAudio(block.audio, 1); }}
                style={{ background: `${block.color}15`, border: `1px solid ${block.color}30`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer' }}
              >
                🔊
              </button>
            </div>
            <p style={{ margin: '6px 0 8px', fontSize: 13, color: 'var(--wl-ink-soft)', textAlign: 'center' }}>"{block.translation}"</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--wl-ink)', lineHeight: 1.6, background: `${block.color}08`, borderRadius: 8, padding: '8px 10px' }}>
              {block.description}
            </p>
          </article>
        ))}

        <article style={{ background: 'var(--wl-surface-card)', border: '1px solid #e9ecef', borderRadius: 12, padding: 16, textAlign: 'center', marginBottom: 20 }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, color: 'var(--wl-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>La frase completa</p>
          <div style={{ display: 'inline-flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {BLOCKS.map((block) => (
              <button
                key={block.korean}
                type="button"
                onClick={() => playAudio(block.audio, 1)}
                style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 24, fontWeight: 700, color: block.color, padding: '4px 10px', borderRadius: 8, background: `${block.color}10`, border: 'none', cursor: 'pointer' }}
              >
                {block.korean}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => playAudio('학교에 가요', 1)}
            style={{ marginTop: 10, background: 'var(--wl-surface-card)', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: 'var(--wl-ink-soft)', cursor: 'pointer' }}
          >
            🔊 Escuchar frase
          </button>
        </article>

        <button
          type="button"
          onClick={() => setPhase('questions')}
          style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Practicar ahora →
        </button>
      </section>
    );
  }

  if (phase === 'questions' && currentQuestion) {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
        <FullSentencePreview highlightRole={currentQuestion.highlightRole} />

        <article style={{ background: 'var(--wl-surface-card)', border: '1px solid #e9ecef', borderRadius: 12, padding: 20 }}>
          <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--wl-on-panel-link, #6c63ff)', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 100, padding: '2px 8px', fontWeight: 700 }}>
            Pregunta {questionIndex + 1} de {BLOCK_QUESTIONS.length}
          </span>

          <p style={{ margin: '14px 0 16px', fontSize: 15, fontWeight: 600, color: 'var(--wl-ink)' }}>{currentQuestion.prompt}</p>

          <div>
            {questionOptions.map((option) => {
              const selected = selectedOption === option;
              const correct = checked && option === currentQuestion.correct;
              const wrong = checked && selected && option !== currentQuestion.correct;

              return (
                <div key={option} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, marginBottom: 8 }}>
                  <button
                    type="button"
                    onClick={() => { if (checked) return; setSelectedOption(option); }}
                    style={{
                      width: '100%',
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: 20,
                      padding: '14px 20px',
                      borderRadius: 10,
                      textAlign: 'center',
                      border: `1.5px solid ${correct ? '#2d9b4e' : wrong ? '#dc3545' : selected ? '#6c63ff' : '#e9ecef'}`,
                      background: correct ? 'rgba(45,155,78,0.06)' : wrong ? 'rgba(220,53,69,0.05)' : selected ? 'rgba(108,99,255,0.06)' : '#fff',
                      color: correct ? '#2d9b4e' : wrong ? '#dc3545' : '#1a1a2e',
                      cursor: checked ? 'default' : 'pointer',
                    }}
                    disabled={checked}
                  >
                    {option}
                  </button>
                  <button
                    type="button"
                    onClick={() => playAudio(option, 1)}
                    style={{ width: 44, border: '1px solid #e9ecef', borderRadius: 10, background: 'var(--wl-surface-card)', cursor: 'pointer', fontSize: 13 }}
                  >
                    🔊
                  </button>
                </div>
              );
            })}
          </div>

          {checked ? (
            <div
              style={{
                marginTop: 10,
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 12,
                lineHeight: 1.6,
                background: selectedOption === currentQuestion.correct ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)',
                border: `1px solid ${selectedOption === currentQuestion.correct ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`,
                color: selectedOption === currentQuestion.correct ? '#2d9b4e' : '#dc3545',
              }}
            >
              {selectedOption === currentQuestion.correct
                ? `✅ ${currentQuestion.explanation}`
                : `❌ La respuesta es: ${currentQuestion.correct}. ${currentQuestion.explanation}`}
            </div>
          ) : null}

          <div style={{ marginTop: 14 }}>
            {!checked ? (
              <button
                type="button"
                onClick={handleVerify}
                disabled={!selectedOption}
                style={{ width: '100%', background: selectedOption ? '#6c63ff' : '#e9ecef', color: selectedOption ? '#fff' : '#adb5bd', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: selectedOption ? 'pointer' : 'not-allowed' }}
              >
                Verificar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Siguiente →
              </button>
            )}
          </div>
        </article>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <p style={{ margin: '0 0 4px', fontSize: 52, fontWeight: 700, color: 'var(--wl-on-panel-link, #6c63ff)', textAlign: 'center' }}>{`${score}/${BLOCK_QUESTIONS.length}`}</p>
      <p style={{ margin: '0 0 18px', fontSize: 14, color: 'var(--wl-ink-soft)', textAlign: 'center' }}>
        {score === 3
          ? 'Identificaste las 3 partes. Tu cerebro ya mapea el coreano.'
          : score === 2
            ? 'Casi perfecto. Ya distingues los bloques.'
            : 'Buen intento. Estos patrones se instalan con repetición.'}
      </p>

      <div style={{ background: 'var(--wl-surface-card)', border: '1px solid #e9ecef', borderRadius: 12, padding: 16, marginBottom: 14, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {BLOCKS.map((block) => (
            <button
              key={block.korean}
              type="button"
              onClick={() => playAudio(block.audio, 1)}
              style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 22, fontWeight: 700, color: block.color, padding: '4px 10px', borderRadius: 8, background: `${block.color}10`, border: 'none', cursor: 'pointer' }}
            >
              {block.korean}
            </button>
          ))}
        </div>
      </div>

      <article style={{ background: 'var(--wl-surface-card)', border: '1px solid #e9ecef', borderRadius: 12, overflow: 'hidden' }}>
        {BLOCKS.map((block, index) => (
          <div
            key={block.role}
            style={{ display: 'flex', borderBottom: index < BLOCKS.length - 1 ? '1px solid #e9ecef' : 'none', padding: '12px 16px', alignItems: 'center', gap: 12 }}
          >
            <span style={{ background: `${block.color}15`, color: block.color, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 100, padding: '2px 8px' }}>
              {block.role}
            </span>
            <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, color: block.color, minWidth: 70 }}>{block.korean}</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--wl-ink-soft)', flex: 1 }}>{block.translation === 'yo' ? 'yo (formal)' : block.translation}</p>
            <button
              type="button"
              onClick={() => playAudio(block.audio, 1)}
              style={{ border: 'none', background: 'none', fontSize: 14, color: block.color, cursor: 'pointer' }}
            >
              ▶
            </button>
          </div>
        ))}
      </article>
    </section>
  );
}
