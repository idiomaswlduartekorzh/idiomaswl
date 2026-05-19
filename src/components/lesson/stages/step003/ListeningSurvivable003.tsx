'use client';

import { useRef, useState } from 'react';
import { KR_VIDEO_003, playAudio } from '@/lib/storage';
import { useSound } from '@/components/lesson/engine/useSound';

interface Question {
  id: string;
  q: string;
  options: string[];
  correct: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: '¿Qué pide el cliente en la cafetería?',
    options: ['Un americano', 'Un café con leche', 'Un té', 'Un cappuccino'],
    correct: 'Un americano',
  },
  {
    id: 'Q2',
    q: '¿Qué pregunta la barista después de tomar el pedido?',
    options: ['El nombre', 'El tamaño', 'Si quiere azúcar', 'El número de mesa'],
    correct: 'El tamaño',
  },
  {
    id: 'Q3',
    q: '¿Cómo se llama la cliente que pide el café?',
    options: ['Haeun', 'Mia', 'Sora', 'Jiyeon'],
    correct: 'Haeun',
  },
];

const RECAP_PHRASES = [
  { kr: '아메리카노 한 잔 주세요', es: 'Un americano, por favor', audio: '아메리카노 한 잔 주세요' },
  { kr: '감사합니다',             es: 'Gracias',               audio: '감사합니다' },
  { kr: '저는 하은이에요',        es: 'Me llamo Haeun',         audio: '저는 하은이에요' },
];

function getSceneLabel(t: number): string {
  if (t < 15) return '카페 · entrada';
  if (t < 35) return '주문 · el pedido';
  if (t < 55) return '사이즈 · el tamaño';
  if (t < 75) return '이름 · el nombre';
  return '감사합니다 · el cierre';
}

interface Props {
  onComplete?: () => void;
}

export default function ListeningSurvivable003({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'watching' | 'questions' | 'complete'>('intro');
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const { correct: playCorrect, wrong: playWrong, complete: playComplete } = useSound();

  const videoRef = useRef<HTMLVideoElement>(null);

  const sceneLabel = getSceneLabel(currentVideoTime);
  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);

  function goToWatching() {
    setPhase('watching');
    setTimeout(() => { videoRef.current?.play().catch(() => {}); }, 80);
  }

  function handleSelectAnswer(qId: string, opt: string) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  }

  function handleCheckAnswers() {
    if (!allAnswered || checked) return;
    const s = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    setScore(s);
    setChecked(true);
    if (s === QUESTIONS.length) {
      playCorrect();
    } else {
      playWrong();
    }
  }

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
          ETAPA 04 DE 11
        </p>
        <h3 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>
          Escucha sobrevivible · El video del café
        </h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
          Vas a ver una conversación real en una cafetería coreana. No necesitas entender todo — céntrate en las frases que ya conoces.
        </p>

        {/* Mission briefing */}
        <div style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.18)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6c63ff' }}>
            Tu misión: mientras escuchas, identifica...
          </p>
          <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {QUESTIONS.map(q => (
              <li key={q.id} style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                {q.q}
              </li>
            ))}
          </ol>
        </div>

        <button
          type="button"
          onClick={goToWatching}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Ver el video →
        </button>
      </section>
    );
  }

  // ── Watching ───────────────────────────────────────────────────────────────
  if (phase === 'watching') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '1rem 0' }}>
        <article style={{ background: '#000', borderRadius: 14, overflow: 'hidden', position: 'relative' }}>
          <video
            ref={videoRef}
            src={KR_VIDEO_003}
            controls
            playsInline
            style={{ width: '100%', display: 'block', maxHeight: 380, objectFit: 'cover' }}
            onTimeUpdate={e => setCurrentVideoTime(e.currentTarget.currentTime || 0)}
            onEnded={() => setHasWatched(true)}
          />
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.03em', pointerEvents: 'none' }}>
            {sceneLabel}
          </div>
        </article>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {hasWatched ? (
            <button
              type="button"
              onClick={() => { setPhase('questions'); setChecked(false); setAnswers({}); setScore(0); }}
              style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Responder preguntas →
            </button>
          ) : (
            <button
              type="button"
              disabled
              style={{ width: '100%', padding: '13px', background: 'var(--line-soft)', border: 'none', borderRadius: 10, color: 'var(--muted)', fontSize: 13, fontWeight: 600, cursor: 'not-allowed' }}
            >
              Mira el video completo primero
            </button>
          )}
        </div>
      </section>
    );
  }

  // ── Questions ──────────────────────────────────────────────────────────────
  if (phase === 'questions') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '1rem 0' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6c63ff' }}>
          Tu misión
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)' }}>
          Responde basándote en lo que escuchaste. Sin trampa.
        </p>

        {/* Rewatch strip */}
        <div style={{ marginBottom: 16, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 56, height: 36, borderRadius: 6, overflow: 'hidden', background: '#000', flexShrink: 0 }}>
            <video src={KR_VIDEO_003} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', flex: 1 }}>¿Quieres verlo otra vez?</p>
          <button
            type="button"
            onClick={() => setPhase('watching')}
            style={{ fontSize: 12, color: '#6c63ff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Ver de nuevo
          </button>
        </div>

        {QUESTIONS.map(q => (
          <article key={q.id} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>
              {q.q}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
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
                      padding: '10px 14px',
                      background: showCorrect ? 'rgba(45,155,78,0.06)' : showWrong ? 'rgba(220,53,69,0.05)' : selected ? 'rgba(108,99,255,0.06)' : 'var(--bg)',
                      border: `1.5px solid ${showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : selected ? '#6c63ff' : 'var(--line-soft)'}`,
                      borderRadius: 9,
                      fontSize: 14,
                      textAlign: 'left',
                      cursor: checked ? 'default' : 'pointer',
                      color: showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : 'var(--ink)',
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
            style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Verificar respuestas
          </button>
        )}

        {checked && (
          <div style={{ marginTop: 16 }}>
            {/* Score */}
            <div style={{ background: score === 3 ? 'rgba(45,155,78,0.07)' : 'rgba(108,99,255,0.06)', border: `1px solid ${score === 3 ? 'rgba(45,155,78,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius: 12, padding: '14px 16px', marginBottom: 16, textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: score === 3 ? '#2d9b4e' : '#6c63ff' }}>{score}/3</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                {score === 3 ? 'Perfecto. Lo escuchaste todo.' : score === 2 ? 'Casi todo. Muy bien.' : 'Normal para la primera vez.'}
              </p>
            </div>

            {/* Recap phrases */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>
                Frases que escuchaste
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {RECAP_PHRASES.map(phrase => (
                  <div key={phrase.kr} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '10px 14px' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 2px', fontSize: 16, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--ink)' }}>
                        {phrase.kr}
                      </p>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>
                        {phrase.es}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => playAudio(phrase.audio)}
                      style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', color: '#6c63ff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      &#x1F50A;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => { playComplete(); setPhase('complete'); onComplete?.(); }}
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
    <section style={{ maxWidth: 540, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
        Etapa completada
      </h3>
      <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
        Acabas de escuchar el coreano de cortesía en acción. Las frases del café ya tienen sonido y contexto real.
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
