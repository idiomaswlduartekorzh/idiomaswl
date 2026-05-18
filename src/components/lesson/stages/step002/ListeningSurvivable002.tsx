'use client';

import { useRef, useState } from 'react';
import { KR_VIDEO_002 } from '@/lib/storage';
import { useSound } from '@/components/lesson/engine/useSound';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    question: '¿Qué palabra ves al inicio del video?',
    options: ['어제', '오늘', '이제'],
    correct: '어제',
  },
  {
    id: 'Q2',
    question: '¿Qué significa 글자?',
    options: ['letras / caracteres', 'ayer', 'hoy'],
    correct: 'letras / caracteres',
  },
  {
    id: 'Q3',
    question: '¿Cuáles vocales Hangul aparecen flotando?',
    options: ['ㅏ ㅓ ㅗ ㅡ', 'ㅏ ㅣ ㅗ ㅜ', 'ㅏ ㅓ ㅜ ㅣ'],
    correct: 'ㅏ ㅓ ㅗ ㅡ',
  },
];

function getSceneLabel(t: number): string {
  if (t < 3) return '📅 어제 · ayer';
  if (t < 8) return '✏️ 글자 · letras';
  if (t < 22) return '🔤 Vocales en Hangul';
  return '💬 Frase final';
}

interface Props {
  onComplete?: () => void;
}

export default function ListeningSurvivable002({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'watching' | 'questions' | 'complete'>('intro');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const { correct: playCorrect, wrong: playWrong, complete: playComplete, assemble: playAssemble } = useSound();

  const videoRef = useRef<HTMLVideoElement>(null);

  const sceneLabel = getSceneLabel(currentVideoTime);
  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  function goToWatching() {
    setPhase('watching');
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 80);
  }

  function handleSelectAnswer(qId: string, opt: string) {
    if (checked) return;
    playAssemble(); // subtle click when selecting
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

  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff', fontWeight: 700 }}>
          ETAPA 4 DE 11
        </p>
        <h3 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>
          Escucha sobrevivible · El alfabeto en acción
        </h3>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
          Vas a ver un video corto de 24 segundos. No necesitas entender todo. Solo presta atención a las letras y palabras que aparecen en pantalla.
        </p>
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

  if (phase === 'watching') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '1rem 0' }}>
        <article style={{ background: '#000', borderRadius: 14, overflow: 'hidden', position: 'relative' }}>
          <video
            ref={videoRef}
            src={KR_VIDEO_002}
            controls
            playsInline
            style={{ width: '100%', display: 'block', maxHeight: 380, objectFit: 'cover' }}
            onTimeUpdate={(e) => setCurrentVideoTime(e.currentTarget.currentTime || 0)}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => {
              setIsVideoPlaying(false);
              setHasWatched(true);
            }}
          />
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: 100, padding: '4px 12px', fontSize: 12, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.03em', pointerEvents: 'none' }}>
            {sceneLabel}
          </div>
        </article>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {hasWatched && (
            <button
              type="button"
              onClick={() => { setPhase('questions'); setChecked(false); setAnswers({}); setScore(0); }}
              style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Responder preguntas →
            </button>
          )}
          {!hasWatched && (
            <button
              type="button"
              disabled
              style={{ width: '100%', padding: '13px', background: 'var(--line-soft)', border: 'none', borderRadius: 10, color: 'var(--muted)', fontSize: 13, fontWeight: 600, cursor: 'not-allowed' }}
            >
              Mira el video completo primero
            </button>
          )}
          {hasWatched && (
            <button
              type="button"
              onClick={() => { setPhase('questions'); setChecked(false); setAnswers({}); setScore(0); }}
              style={{ width: '100%', padding: '10px', background: 'none', border: '1px solid var(--line-soft)', borderRadius: 10, color: 'var(--muted)', fontSize: 12, cursor: 'pointer' }}
            >
              Ir a preguntas →
            </button>
          )}
        </div>
      </section>
    );
  }

  if (phase === 'questions') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '1rem 0' }}>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)' }}>
          3 preguntas sobre lo que viste. Sin trampa.
        </p>

        <div style={{ marginBottom: 16, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 56, height: 36, borderRadius: 6, overflow: 'hidden', background: '#000', flexShrink: 0 }}>
            <video src={KR_VIDEO_002} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

        {QUESTIONS.map((q) => (
          <article
            key={q.id}
            style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: 16, marginBottom: 12 }}
          >
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>
              {q.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {q.options.map((opt) => {
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
                      fontFamily: "'Noto Sans KR', sans-serif",
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
            <div style={{ background: score === 3 ? 'rgba(45,155,78,0.07)' : 'rgba(108,99,255,0.06)', border: `1px solid ${score === 3 ? 'rgba(45,155,78,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius: 12, padding: '14px 16px', marginBottom: 12, textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: score === 3 ? '#2d9b4e' : '#6c63ff' }}>{score}/3</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
                {score === 3 ? 'Perfecto. Lo viste todo.' : score === 2 ? 'Casi todo. Muy bien.' : 'Normal para la primera vez.'}
              </p>
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

  // phase === 'complete'
  return (
    <section style={{ maxWidth: 540, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <p style={{ margin: '0 0 8px', fontSize: 48 }}>✅</p>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
        Etapa completada
      </h3>
      <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
        Acabas de ver el Hangul en acción. Las letras empiezan a tener forma.
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
